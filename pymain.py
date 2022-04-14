import itertools
import json
import re
import string
import sys
from collections import OrderedDict, namedtuple
from pprint import pprint

import en_core_web_sm
import nltk
import numpy as np
import PyPDF2 as p2
import requests
import spacy
import torch
from sense2vec import Sense2Vec
from sentence_transformers import SentenceTransformer
from similarity.normalized_levenshtein import NormalizedLevenshtein
from sklearn.metrics.pairwise import cosine_similarity
from torch.nn.functional import softmax
from tqdm import tqdm
from transformers import T5Config, T5ForConditionalGeneration, T5Tokenizer

nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')
import traceback

import pke
from flashtext import KeywordProcessor
from nltk.corpus import stopwords, wordnet
from nltk.tokenize import sent_tokenize


def get_summary(text):
    preprocess_text = text.strip().replace("\n", "")

    tokenized_text = summary_tokenizer.encode(preprocess_text, add_special_tokens=False, return_tensors="pt")

    while len(tokenized_text[0]) > 509:
        tokenized_chunk, tokenized_text = tokenized_text[0][:509], tokenized_text[0][509:]

        tokenized_chunk = torch.stack(
            [torch.cat([torch.Tensor([21603]), torch.Tensor([10]), tokenized_chunk, torch.Tensor([1])
                        ]).long()])

        summary_id = summary_model.generate(tokenized_chunk,
                                            num_beams=5,
                                            no_repeat_ngram_size=2,
                                            min_length=100,
                                            max_length=512)

        tokenized_text = torch.stack([torch.cat([summary_id[0], tokenized_text])])

    output = summary_tokenizer.decode(tokenized_text[0], skip_special_tokens=True)

    return output


def mmr(doc_embedding, word_embeddings, words, top_n, diversity):
    # Extract similarity within words, and between words and the document
    word_doc_similarity = cosine_similarity(word_embeddings, doc_embedding)
    word_similarity = cosine_similarity(word_embeddings)

    # Initialize candidates and already choose best keyword/keyphras
    keywords_idx = [np.argmax(word_doc_similarity)]
    candidates_idx = [i for i in range(len(words)) if i != keywords_idx[0]]

    for _ in range(top_n - 1):
        # Extract similarities within candidates and
        # between candidates and selected keywords/phrases
        candidate_similarities = word_doc_similarity[candidates_idx, :]
        # print(candidate_similarities)
        target_similarities = np.max(word_similarity[candidates_idx][:, keywords_idx], axis=1)
        # print(target_similarities)

        # Calculate MMR
        mmr = (1 - diversity) * candidate_similarities - diversity * target_similarities.reshape(-1, 1)
        mmr_idx = candidates_idx[np.argmax(mmr)]

        # Update keywords & candidates
        keywords_idx.append(mmr_idx)
        candidates_idx.remove(mmr_idx)

    return [words[idx] for idx in keywords_idx]


def get_questions(keywords, summary):
    t5_input_list = []
    for ans in keywords:
        input_text = "context: " + summary + " " + "answer: " + ans + " </s>"
        t5_input_list.append(input_text)

    answer_insrt = keywords[:]
    answer_insrt.reverse()

    qa_list = list()

    for i in range(len(t5_input_list)):
        encoding = q_tokenizer.encode_plus(t5_input_list[i], max_length=512, padding=True, return_tensors="pt")
        input_ids, attention_mask = encoding["input_ids"], encoding["attention_mask"]

        q_model.eval()
        beam_outputs = q_model.generate(
            input_ids=input_ids, attention_mask=attention_mask,
            max_length=72,
            early_stopping=True,
            num_beams=5,
            num_return_sequences=1
        )

        for beam_output in beam_outputs:
            sent = q_tokenizer.decode(beam_output, skip_special_tokens=True, clean_up_tokenization_spaces=True)
            qa_list.append([sent[10:], None, None])

    for item in qa_list:
        q_answer = answer_insrt.pop()
        item[1] = q_answer
        item[2] = q_answer

    key_dist_dict = dict()
    for item in qa_list:
        key = item[1]
        key_dist_dict[key] = sense2vec_get_words(key, s2v)

    for key, dist in key_dist_dict.items():
        try:
            key_embedding = ext_model.encode([key])
            candidate_embeddings = ext_model.encode(dist)
            distractor_list = mmr(key_embedding, candidate_embeddings, dist, 3, 0.6)
            key_dist_dict[key] = distractor_list
        except:
            continue

    for item in qa_list:
        ans = item[1]
        if key_dist_dict[ans] is not None:
            item[1] = [ans] + key_dist_dict[ans]

    return qa_list


def sense2vec_get_words(word, s2v):
    normalized_levenshtein = NormalizedLevenshtein()
    output = []
    word = word.lower()
    word = word.replace(" ", "_")

    sense = s2v.get_best_sense(word)
    if sense is None:
        return None
    most_similar = s2v.most_similar(sense, n=30)

    # print ("most_similar ",most_similar)

    for each_word in most_similar:
        append_word = each_word[0].split("|")[0].replace("_", " ").lower()
        if append_word.lower() != word:
            output.append(append_word.title())

    out = list(OrderedDict.fromkeys(output))

    threshold = 0.7
    new_out = [x for x in out if normalized_levenshtein.distance(x.lower(), word.lower()) > threshold]
    if len(new_out) < 3:
        return None
    return new_out


def tokenize_sentences(text):
    sentences = sent_tokenize(text)
    sentences = [sentence.strip() for sentence in sentences]
    return sentences


def get_noun_adj_verb(text):
    out = []
    try:
        extractor = pke.unsupervised.MultipartiteRank()
        extractor.load_document(input=text)
        #    not contain punctuation marks or stopwords as candidates.
        pos = {'NOUN'}
        stoplist = list(string.punctuation)
        stoplist += ['-lrb-', '-rrb-', '-lcb-', '-rcb-', '-lsb-', '-rsb-']
        stoplist += stopwords.words('english')
        extractor.candidate_selection(pos=pos, stoplist=stoplist)
        # 4. build the Multipartite graph and rank candidates using random walk,
        #    alpha controls the weight adjustment mechanism, see TopicRank for
        #    threshold/method parameters.
        extractor.candidate_weighting(alpha=1.1,
                                      threshold=0.75,
                                      method='average')
        keyphrases = extractor.get_n_best(n=3)

        for val in keyphrases:
            out.append(val[0])
    except:
        out = []
        traceback.print_exc()

    return out


def get_sentences_for_keyword(keywords, sentences):
    keyword_processor = KeywordProcessor()
    keyword_sentences = {}
    for word in keywords:
        keyword_sentences[word] = []
        keyword_processor.add_keyword(word)
    for sentence in sentences:
        keywords_found = keyword_processor.extract_keywords(sentence)
        for key in keywords_found:
            keyword_sentences[key].append(sentence)

    for key in keyword_sentences.keys():
        values = keyword_sentences[key]
        values = sorted(values, key=len, reverse=True)
        keyword_sentences[key] = values
    return keyword_sentences


def get_fill_in_the_blanks(sentence_mapping):
    out = dict()
    blank_sentences = []
    processed = []
    keys = []
    for key in sentence_mapping:
        if len(sentence_mapping[key]) > 0:
            sent = sentence_mapping[key][0]
            # Compile a regular expression pattern into a regular expression object, which can be used for matching and other methods
            insensitive_sent = re.compile(re.escape(key), re.IGNORECASE)
            no_of_replacements = len(re.findall(re.escape(key), sent, re.IGNORECASE))
            line = insensitive_sent.sub(' _________ ', sent)
            if (sentence_mapping[key][0] not in processed) and no_of_replacements < 2:
                blank_sentences.append(line)
                processed.append(sentence_mapping[key][0])
                keys.append(key)
    for num in range(len(blank_sentences)):
        out[blank_sentences[num]] = keys[num]
    return out


# PDF content Extraction and making a list of pages
PDFfile = open(sys.argv[1], "rb")
pdfRead = p2.PdfFileReader(PDFfile)

url_text = "http://localhost:5000/api/flip/text"
url_content = "http://localhost:5000/api/flip/content"

bookname = sys.argv[2]

collectionName = sys.argv[3]

pdf_content_lst = []

for i in range(pdfRead.getNumPages()):
    pageInfo = pdfRead.getPage(i)
    content = pageInfo.extractText()
    content = content.strip().replace("\n", "")
    edited_content = re.sub(r"/\s+/g", " ", content)

    pdf_content_lst.append(edited_content)

    payload = {
        "collectionName": collectionName,
        "bookName": bookname,
        "id": i + 1,
        "content": content
    }
    r = requests.put(url_text, json=payload)
    #print(r.json())

# Page list for loop and Getting the summary, Fill in the blanks, MCQ
summary_model = T5ForConditionalGeneration.from_pretrained('t5-base')
summary_tokenizer = T5Tokenizer.from_pretrained('t5-base')

trained_model_path = 't5/model_final/'
trained_tokenizer = 't5/tokenizer_final/'

q_model = T5ForConditionalGeneration.from_pretrained(trained_model_path)
q_tokenizer = T5Tokenizer.from_pretrained(trained_tokenizer)

nlp = en_core_web_sm.load()
ext_model = SentenceTransformer('distilbert-base-nli-mean-tokens')

sense2Vec_path = 's2v_old'
s2v = Sense2Vec().from_disk(sense2Vec_path)

page_num = 1
for page in pdf_content_lst:
    summary = get_summary(page)

    doc = nlp(summary)
    ent_list = list(set([X.text for X in doc.ents if X.label_ != 'CARDINAL' and X.label_ != 'ORDINAL']))

    doc_embedding = ext_model.encode([summary])
    candidate_embeddings = ext_model.encode(ent_list)

    if len(ent_list) > 5 :
      keywords = mmr(doc_embedding, candidate_embeddings, ent_list, 5, 0.5)
    else: 
      keywords = ent_list

    qa_list = get_questions(keywords, summary)

    mcq_list = []
    oneW_list = []

    for ques, opt, ans in qa_list:
        if type(opt) is list:
            mcq_list.append([ques, opt, ans])
        else:
            oneW_list.append([ques, ans])

    sentences = tokenize_sentences(page)
    noun_verbs_adj = get_noun_adj_verb(summary)
    keyword_sentence_mapping_noun_verbs_adj = get_sentences_for_keyword(noun_verbs_adj, sentences)
    keywords_sent_map = dict()
    for key in keyword_sentence_mapping_noun_verbs_adj:
        if keyword_sentence_mapping_noun_verbs_adj[key] != []:
            keywords_sent_map[key] = keyword_sentence_mapping_noun_verbs_adj[key][0]

    fill_in_the_blanks = get_fill_in_the_blanks(keyword_sentence_mapping_noun_verbs_adj)

    mcqs = []
    i = 1
    for ques, opt, ans in mcq_list:
        item = dict()
        item["id"] = i
        item["question"] = ques
        item["options"] = opt
        item["answer"] = ans
        mcqs.append(item)
        i += 1

    oneWs = []
    i = 1
    for ques, ans in oneW_list:
        item = dict()
        item["id"] = i
        item["question"] = ques
        item["answer"] = ans
        oneWs.append(item)
        i += 1

    fib_lst = []
    i = 1
    for ques, ans in fill_in_the_blanks.items():
        item = dict()
        item["id"] = i
        item["question"] = ques
        item["answer"] = ans
        fib_lst.append(item)
        i += 1

    payload = {
        "collectionName": collectionName,
        "bookName": bookname,
        "id": page_num,
        "summary": summary,
        "mcq": mcqs,
        "oneW": oneWs,
        "fib": fib_lst
    }
    page_num += 1

    r = requests.put(url_content, json=payload)
    #print(r.json())


print("uploading data done...")



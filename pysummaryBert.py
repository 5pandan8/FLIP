import sys
import torch
from transformers import BartTokenizer, BartForConditionalGeneration

trained_model_path = 'DistilBART/summary_model/'
trained_tokenizer = 'DistilBART/summary_tokenizer/'
  
model = BartForConditionalGeneration.from_pretrained(trained_model_path)
tokenizer = BartTokenizer.from_pretrained(trained_tokenizer)

content = sys.argv[1]

def get_summary(text):
    preprocess_text = text.strip().replace("\n", "")

    input_tokenized_text = tokenizer(ARTICLE, add_special_tokens=False, return_tensors='pt')['input_ids']
    og_len = len(input_tokenized_text[0])

   while len(input_tokenized_text[0]) > 1022:
        input_tokenized_chunk, input_tokenized_text = input_tokenized_text[0][:1022], input_tokenized_text[0][1022:]
        input_tokenized_chunk = torch.stack([torch.cat([torch.Tensor([0]), input_tokenized_chunk, torch.Tensor([2])
        ]).long()])

        summary_ids = model.generate(input_tokenized_chunk, num_beams=5, no_repeat_ngram_size=2, max_length=1024, early_stopping=True)

        input_tokenized_text = torch.stack([torch.cat([summary_ids[0], input_tokenized_text])])

    if(len(input_tokenized_text[0]) == og_len): 
        input_tokenized_text = model.generate(input_tokenized_text, num_beams=5, no_repeat_ngram_size=2, max_length=1024, early_stopping=True)

    output = tokenizer.decode(input_tokenized_text[0], skip_special_tokens=True, clean_up_tokenization_spaces=False)

    return output


summary = get_summary(content)

print(summary)
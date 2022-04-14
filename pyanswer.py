import sys
import torch
from transformers import T5ForConditionalGeneration,T5Tokenizer

trained_model_path = 't5/model_Qa/'
trained_tokenizer = 't5/tokenizer_Qa/'

model = T5ForConditionalGeneration.from_pretrained(trained_model_path)
tokenizer = T5Tokenizer.from_pretrained(trained_tokenizer)

context = sys.argv[1]
question = sys.argv[2]

preprocess_text = context.strip().replace("\n","")

text = "context: "+ preprocess_text + " " + "question: " + question + " </s>"

encoding = tokenizer.encode_plus(text, padding=True, return_tensors="pt")
input_ids,attention_mask  = encoding["input_ids"], encoding["attention_mask"]

model.eval()
beam_outputs = model.generate(
    input_ids=input_ids,attention_mask=attention_mask,
    max_length=72,
    early_stopping=True,
    num_beams=5,
    num_return_sequences=3

)

ans_lst = []
for beam_output in beam_outputs:
    sent = tokenizer.decode(beam_output, skip_special_tokens=True,clean_up_tokenization_spaces=True)
    ans_lst.append(sent)

print(ans_lst[0][8:])
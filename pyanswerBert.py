import sys
import torch

from transformers import DistilBertTokenizer, DistilBertForQuestionAnswering
import torch

trained_model_path = 'DistilBert/model_Qa/'
trained_tokenizer = 'DistilBert/tokenizer_Qa/'

tokenizer = DistilBertTokenizer.from_pretrained(trained_model_path)
model = DistilBertForQuestionAnswering.from_pretrained(trained_tokenizer)

context = sys.argv[1]
question = sys.argv[2]

inputs = tokenizer(question, context, add_special_tokens=True, return_tensors="pt")
outputs = model(**inputs)
answer_start_scores = outputs.start_logits
answer_end_scores = outputs.end_logits
answer_start = torch.argmax(answer_start_scores)
answer_end = torch.argmax(answer_end_scores) + 1
answer = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(input_ids[answer_start:answer_end]))

print(answer)
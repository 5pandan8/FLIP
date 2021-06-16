import sys
import torch
from transformers import T5ForConditionalGeneration,T5Tokenizer

summary_model = T5ForConditionalGeneration.from_pretrained('t5-base')
summary_tokenizer = T5Tokenizer.from_pretrained('t5-base')

content = sys.argv[1]

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


summary = get_summary(content)

print(summary)
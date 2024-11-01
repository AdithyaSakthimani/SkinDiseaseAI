from datasets import load_dataset
from transformers import AutoTokenizer, AutoModel
import torch
from sklearn.metrics.pairwise import cosine_similarity

dataset = load_dataset("Mostafijur/Skin_disease_classify_data")

model_name = 'sentence-transformers/paraphrase-MiniLM-L6-v2'
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

def embed_text(text, tokenizer, model):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    embeddings = outputs.last_hidden_state.mean(dim=1)
    return embeddings

queries = []
diseases = []
embeddings = []

for example in dataset['train']:
    query = example['Skin_disease_classification']['query']
    disease = example['Skin_disease_classification']['disease']
    queries.append(query)
    diseases.append(disease)

    query_embedding = embed_text(query, tokenizer, model)
    embeddings.append(query_embedding)

def find_similar_disease(input_query, queries, embeddings, tokenizer, model):
    input_embedding = embed_text(input_query, tokenizer, model)
    similarities = [cosine_similarity(input_embedding.detach().numpy(), emb.detach().numpy())[0][0] for emb in embeddings]
    most_similar_idx = similarities.index(max(similarities))
    return diseases[most_similar_idx]

input_query = input(" enter your symptoms: ")
similar_disease = find_similar_disease(input_query, queries, embeddings, tokenizer, model)
print(f"The most similar disease is: {similar_disease}")
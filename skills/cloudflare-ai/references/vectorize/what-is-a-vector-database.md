---
source: https://developers.cloudflare.com/vectorize/reference/what-is-a-vector-database/
---

# Vector databases

Concepts behind vector search, embeddings, dimensions, distance metrics, and Retrieval Augmented Generation (RAG) with Vectorize.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/vectorize/reference/what-is-a-vector-database/

Illustration only: `<764 dimensions here>` is the source's placeholder for the omitted values, so this is not valid JSON.

```text
[-0.019273685291409492,-0.01913292706012726,<764 dimensions here>,0.0007094172760844231,0.043409910053014755]
```

### Vector search workflow

1. Convert the dataset (documentation, images, logs stored in R2) into vector embeddings with a model trained for that data type.
2. Insert the embeddings into a Vectorize index.
3. Pass the search query through the same model to get a query embedding.
4. Query Vectorize with that embedding to get the most similar vectors.
5. Use the returned IDs/metadata to retrieve the original objects from storage (R2, KV, D1).

### RAG workflow

1. Generate embeddings from the corpus and store them in a Vectorize index.
2. At prompt time, embed the user prompt with the same model.
3. Query the index with that embedding.
4. Look up the content for the returned vectors (unless embedded as metadata).
5. Provide that content as context alongside the user prompt to the LLM.

## Notes

- Use cases: semantic search, classification, recommendation engines, anomaly detection, RAG.
- In Vectorize, a database and an index are the same concept; each index is independent of the others.
- Embeddings are a one-way representation of the input.
- Dimensions come from the embedding model; more dimensions may give more accuracy at the cost of compute, memory, and latency.
- Per the source, `cosine` suits text, sentence similarity, and document search, while `euclidean` can suit image or speech recognition.
- Always embed queries with the same model used for the stored data.

## Related

- [Create indexes](./create-indexes.md)
- [Distance metrics](./distance-metrics.md)
- [Query vectors](./query-vectors.md)

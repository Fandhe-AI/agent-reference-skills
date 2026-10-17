# embeddings-batch

| Name | Description | Path |
|------|-------------|------|
| batch | Batches submit multiple independent requests for asynchronous processing. The provider processes the batch in the background, so the application does not keep a request open while the model generates results. Useful for classification, summarization, and content generation that do not need an immediate response. Supports text generation (`type: 'text'`) and image generation (`type: 'image'`). | [batch.md](./batch.md) |
| cancelBatch | Requests cancellation of an asynchronous batch. A successful call means that the provider accepted the cancellation request, not that cancellation has finished. | [cancel-batch.md](./cancel-batch.md) |
| cosineSimilarity | Calculates the cosine similarity between two vectors. A high value (close to 1) indicates that the vectors are very similar, while a low value (close to -1) indicates that they are different. | [cosine-similarity.md](./cosine-similarity.md) |
| experimental_decide | Decides answers to a nonempty map of `choice`, `score`, and `boolean` questions against one state. | [decide.md](./decide.md) |
| Decisions | `experimental_decide` decides answers to named questions (Choice, Score, Boolean) against one shared state using a decision model. State can be a string, JSON object, or an array of ordered text, file, and JSON parts. | [decisions.md](./decisions.md) |
| embed | Generate an embedding for a single value using an embedding model. Ideal for embedding a single value to retrieve similar items or to use in a downstream task. | [embed.md](./embed.md) |
| embedMany | Embed several values using an embedding model. | [embed-many.md](./embed-many.md) |
| Embeddings | Embeddings represent words, phrases, or images as vectors in a high-dimensional space; similar values are close to each other, and distance measures similarity. The AI SDK provides `embed`, `embedMany`, and `cosineSimilarity`. | [embeddings.md](./embeddings.md) |
| File Uploads | `uploadFile` uploads a file to a provider and returns a `ProviderReference` that can be used in subsequent API calls. A `ProviderReference` is a `Record<string, string>` mapping provider names to provider-specific identifiers; the same concept is used for other provider-specific asset references, such as uploaded skills. | [file-uploads.md](./file-uploads.md) |
| experimental_getBatchResults | Returns an async iterable of terminal results for the requests in an asynchronous batch. | [get-batch-results.md](./get-batch-results.md) |
| experimental_getBatchStatus | Retrieves the latest status of an asynchronous batch. | [get-batch-status.md](./get-batch-status.md) |
| experimental_listBatches | Lists a page of asynchronous batches and their latest normalized statuses. | [list-batches.md](./list-batches.md) |
| rerank | Rerank a set of documents based on their relevance to a query using a reranking model. Ideal for improving search relevance by reordering documents, emails, or other content based on semantic understanding of the query and documents. | [rerank.md](./rerank.md) |
| Reranking | Reranking improves search relevance by reordering a set of documents based on their relevance to a query. Unlike embedding-based similarity search, reranking models are trained to understand the relationship between queries and documents, often producing more accurate relevance scores. | [reranking.md](./reranking.md) |
| Skill Uploads | `uploadSkill` uploads custom skills to a provider and returns a `ProviderReference` that can be passed to subsequent inference calls. A skill is a bundle of files (e.g. a `SKILL.md` describing the skill's behavior) that providers can load, e.g. in sandboxed container environments. | [skill-uploads.md](./skill-uploads.md) |
| experimental_startBatch | Starts an asynchronous batch of text or image generation requests. | [start-batch.md](./start-batch.md) |
| uploadFile | Uploads a file to a provider and returns a result whose `providerReference` (a `ProviderReference`) can be used in subsequent API calls, such as in message content parts passed to `generateText` or `streamText`. | [upload-file.md](./upload-file.md) |
| uploadSkill | Uploads a skill (a bundle of files) to a provider and returns a result whose `providerReference` (a `ProviderReference`) can be used in subsequent inference calls. | [upload-skill.md](./upload-skill.md) |

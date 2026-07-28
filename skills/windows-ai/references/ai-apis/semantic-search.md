# Semantic Search and embeddings

`LanguageModel` can produce vector embeddings for text and generate responses grounded in a set of embedding vectors, enabling on-device semantic search and Retrieval-Augmented Generation (RAG) over local data.

## Signature / Usage

```csharp
using Microsoft.Windows.AI.Text;

using LanguageModel languageModel = await LanguageModel.CreateAsync();

// Produce an embedding vector for a piece of text
LanguageModelEmbeddingVectorResult vectorResult = languageModel.GenerateEmbeddingVectors(documentText);

// Generate a response grounded in a set of embedding vectors retrieved from your own vector store
var result = await languageModel.GenerateResponseFromEmbeddingsAsync(retrievedVectors);
Console.WriteLine(result.Text);
```

## Options / Props

| Member | Description |
|------|-------------|
| `LanguageModel.GenerateEmbeddingVectors(String[, ContentFilterOptions])` | Returns a `LanguageModelEmbeddingVectorResult` representing the embedding vector of the prompt/text. |
| `LanguageModel.GenerateResponseFromEmbeddingsAsync(IIterable<EmbeddingVector>[, LanguageModelOptions])` | Generates a response grounded in one or more embedding vectors, optionally scoped by a `LanguageModelContext`. |
| `LanguageModel.GetVectorSpaceId()` | Returns the unique identifier of the embedding vector space, used to verify vectors are comparable across sessions. |
| `LanguageModelEmbeddingVectorResult` | Represents the result of an embedding vector generation, including the produced `EmbeddingVector`. |

## Notes

- Namespace: `Microsoft.Windows.AI.Text` (`LanguageModelEmbeddingVectorResult`); the underlying `EmbeddingVector` type lives in `Microsoft.Windows.AI.Foundation`.
- As of this writing, Semantic Search shipped as a **private preview** feature (sign-up required); check current Windows App SDK release notes before shipping.
- Typical pattern: chunk documents, call `GenerateEmbeddingVectors` per chunk, store vectors in your own local vector store, retrieve the nearest vectors for a query, then call `GenerateResponseFromEmbeddingsAsync` to ground the model's response (RAG).
- Compare `GetVectorSpaceId()` across sessions/model versions before reusing previously stored vectors, since embeddings from different vector spaces are not comparable.

## Related

- [LanguageModel](./language-model.md)
- [LanguageModelContext](./language-model-context.md)

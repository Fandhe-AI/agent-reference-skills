---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/cosine-similarity
---

# cosineSimilarity

Calculates the cosine similarity between two vectors. A high value (close to 1) indicates that the vectors are very similar, while a low value (close to -1) indicates that they are different.

## Signature / Usage

```ts
import { cosineSimilarity, embedMany } from 'ai';

const { embeddings } = await embedMany({
  model: 'openai/text-embedding-3-small',
  values: ['sunny day at the beach', 'rainy afternoon in the city'],
});

console.log(
  `cosine similarity: ${cosineSimilarity(embeddings[0], embeddings[1])}`,
);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `vector1` | number[] | — | The first vector to compare |
| `vector2` | number[] | — | The second vector to compare |

Returns a number between -1 and 1 representing the cosine similarity between the two vectors.

## Related

- [embedMany](./embed-many.md)
- [Embeddings](./embeddings.md)

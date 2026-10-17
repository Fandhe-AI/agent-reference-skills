---
source: https://ai-sdk.dev/cookbook/node/embed-text
---

# Embed Text (Single and Batch)

Convert text to an embedding vector with `embed`, or several texts at once with `embedMany`.

```ts
// embed one value
import { embed } from 'ai';
import 'dotenv/config';

async function main() {
  const { embedding, usage } = await embed({
    model: 'openai/text-embedding-3-small',
    value: 'sunny day at the beach',
  });

  console.log(embedding);
  console.log(usage);
}

main().catch(console.error);
```

```ts
// embed several values in one call
import { embedMany } from 'ai';
import 'dotenv/config';

async function main() {
  const { embeddings, usage } = await embedMany({
    model: 'openai/text-embedding-3-small',
    values: [
      'sunny day at the beach',
      'rainy afternoon in the city',
      'snowy night in the mountains',
    ],
  });

  console.log(embeddings);
  console.log(usage);
}

main().catch(console.error);
```

## Notes

- Merges the official "Embed Text" and "Embed Text in Batch" cookbook pages (the second block is from `https://ai-sdk.dev/cookbook/node/embed-text-batch`). Batch embedding reduces API calls when processing many documents or messages.
- Embeddings are vectors for semantic search, similarity and recommendation; storing and querying them is outside the AI SDK (see upstash and fandhe-db skills for vector stores). `references/embeddings-batch/embeddings.md` covers the concepts; the retrieval example is `rag-in-memory-embeddings.md`.

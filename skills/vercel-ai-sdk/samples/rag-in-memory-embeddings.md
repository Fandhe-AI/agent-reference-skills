---
source: https://ai-sdk.dev/cookbook/node/retrieval-augmented-generation
---

# Retrieval Augmented Generation (In-Memory)

Chunk a text file, embed with `embedMany`, retrieve top matches by `cosineSimilarity`, and answer with `generateText`.

```ts
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { cosineSimilarity, embed, embedMany, generateText } from 'ai';

dotenv.config();

async function main() {
  const db: { embedding: number[]; value: string }[] = [];

  const essay = fs.readFileSync(path.join(__dirname, 'essay.txt'), 'utf8');
  const chunks = essay
    .split('.')
    .map(chunk => chunk.trim())
    .filter(chunk => chunk.length > 0 && chunk !== '\n');

  const { embeddings } = await embedMany({
    model: 'openai/text-embedding-3-small',
    values: chunks,
  });
  embeddings.forEach((e, i) => {
    db.push({
      embedding: e,
      value: chunks[i],
    });
  });

  const input =
    'What were the two main things the author worked on before college?';

  const { embedding } = await embed({
    model: 'openai/text-embedding-3-small',
    value: input,
  });
  const context = db
    .map(item => ({
      document: item,
      similarity: cosineSimilarity(embedding, item.embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3)
    .map(r => r.document.value)
    .join('\n');

  const { text } = await generateText({
    model: 'openai/gpt-6-astra',
    prompt: `Answer the following question based only on the provided context:
             ${context}

             Question: ${input}`,
  });
  console.log(text);
}

main().catch(console.error);
```

## Notes

- The page uses a Paul Graham essay saved as `essay.txt` and a simple in-memory array as the "vector database"; replace it with a real vector store for anything beyond a demo (vector stores are out of scope for the AI SDK; see upstash / fandhe-db skills).
- `embedMany` embeds all chunks in one call, `embed` the query; `cosineSimilarity` ranks them. API details: `references/embeddings-batch/embed.md`, `embed-many.md`, `cosine-similarity.md`.
- Larger guided version: `rag-chatbot-nextjs-drizzle.md`; agent-style retrieval with tools: `knowledge-base-agent-upstash-search.md`.

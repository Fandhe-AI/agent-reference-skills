---
source: https://ai-sdk.dev/cookbook/node/knowledge-base-agent
---

# Knowledge Base Agent with Upstash Search

A `generateText` agent with add / search / delete tools backed by an Upstash Search index.

```bash
pnpm i ai zod @ai-sdk/openai @upstash/search dotenv
pnpm i -D tsx
curl -o essay.txt https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt
```

```bash
UPSTASH_SEARCH_REST_URL="***"
UPSTASH_SEARCH_REST_TOKEN="***"
```

```ts
// setup.ts
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import { Search } from '@upstash/search';

type KnowledgeContent = {
  text: string;
  section: string;
  title?: string;
};

// Initialize Upstash Search client
const search = new Search({
  url: process.env.UPSTASH_SEARCH_REST_URL!,
  token: process.env.UPSTASH_SEARCH_REST_TOKEN!,
});

const index = search.index<KnowledgeContent>('knowledge-base');

async function setupKnowledgeBase() {
  // Read and process the source file
  const content = fs.readFileSync(path.join(__dirname, 'essay.txt'), 'utf8');

  // Split content into meaningful chunks
  const chunks = content
    .split(/\n\s*\n/) // Split by double line breaks (paragraphs)
    .map(chunk => chunk.trim())
    .filter(chunk => chunk.length > 50); // Only keep substantial chunks

  // Upload chunks to Upstash Search in batches of 100
  const batchSize = 100;
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize).map((chunk, j) => ({
      id: `chunk-${i + j}`,
      content: {
        text: chunk,
        section: `section-${Math.floor((i + j) / 10)}`,
        title: chunk.split('\n')[0] || `Chunk ${i + j + 1}`,
      },
    }));
    await index.upsert(batch);
    console.log(
      `Upserted ${Math.min(i + batch.length, chunks.length)} chunks out of ${chunks.length} chunks`,
    );
  }
}

// Run setup
setupKnowledgeBase().catch(console.error);
```

```ts
// agent.ts
import { tool, isStepCount, generateText, generateId } from 'ai';
import { z } from 'zod';
import { Search } from '@upstash/search';

import 'dotenv/config';

const search = new Search({
  url: process.env.UPSTASH_SEARCH_REST_URL!,
  token: process.env.UPSTASH_SEARCH_REST_TOKEN!,
});

type KnowledgeContent = {
  text: string;
  section: string;
  title?: string;
};

const index = search.index<KnowledgeContent>('knowledge-base');

async function main(prompt: string) {
  const { text } = await generateText({
    model: 'openai/gpt-6-astra',
    prompt,
    stopWhen: isStepCount(5),
    tools: {
      addResource: tool({
        description:
          'Add a new resource or piece of information to the knowledge base',
        inputSchema: z.object({
          resource: z
            .string()
            .describe('The content or resource to add to the knowledge base'),
          title: z
            .string()
            .optional()
            .describe('Optional title for the resource'),
        }),
        execute: async ({ resource, title }) => {
          const id = generateId();
          await index.upsert({
            id,
            content: {
              text: resource,
              section: 'user-added',
              title: title || `Resource ${id.slice(0, 8)}`,
            },
          });
          return `Successfully added resource "${title || 'Untitled'}" to knowledge base with ID: ${id}`;
        },
      }),
      searchKnowledge: tool({
        description:
          'Search the knowledge base to find relevant information for answering questions',
        inputSchema: z.object({
          query: z
            .string()
            .describe('The search query to find relevant information'),
          limit: z
            .number()
            .optional()
            .describe('Maximum number of results to return (default: 3)'),
        }),
        execute: async ({ query, limit = 3 }) => {
          const results = await index.search({
            query,
            limit,
            reranking: true,
          });

          if (results.length === 0) {
            return 'No relevant information found in the knowledge base.';
          }

          return results.map((hit, i) => ({
            resourceId: hit.id,
            rank: i + 1,
            title: hit.content.title || 'Untitled',
            content: hit.content.text || '',
            section: hit.content.section || 'unknown',
            score: hit.score,
          }));
        },
      }),
      deleteResource: tool({
        description: 'Delete a resource from the knowledge base',
        inputSchema: z.object({
          resourceId: z.string().describe('The ID of the resource to delete'),
        }),
        execute: async ({ resourceId }) => {
          try {
            await index.delete({ ids: [resourceId] });
            return `Successfully deleted resource with ID: ${resourceId}`;
          } catch (error) {
            console.error('deleteResource failed', error);
            return 'Failed to delete resource.';
          }
        },
      }),
    },
    // log out intermediate steps
    onStepEnd: ({ toolResults }) => {
      if (toolResults.length > 0) {
        console.log('Tool results:');
        console.dir(toolResults, { depth: null });
      }
    },
  });

  return text;
}

const question =
  'What are the two main things I worked on before college? (utilize knowledge base)';

main(question).then(console.log).catch(console.error);
```

```bash
pnpm tsx setup.ts
pnpm tsx agent.ts
```

## Notes

- Upstash Search provides its own embedding service and reranking, so no separate embedding provider is needed; create the database in the Upstash Console to obtain the REST URL and token. Upstash client details belong to the upstash skill.
- The "agent" here is plain `generateText` with tools and `stopWhen: isStepCount(5)`, not `ToolLoopAgent`; compare `references/agents/tool-loop-agent.md`.
- The official example returns error.message in the deleteResource tool result, which can leak provider internals to the model; here the error is logged server-side and a fixed message is returned.
- A delete tool is exposed to the model; in production gate such tools (see `chatbot-tool-execution-approval.md`).

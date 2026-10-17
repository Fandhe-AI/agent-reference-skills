---
source: https://ai-sdk.dev/docs/agents/memory
---

# Memory

Memory lets your agent save information and recall it later. Without memory, every conversation starts fresh. With memory, your agent builds context over time, recalls previous interactions, and adapts to the user.

## Signature / Usage

Anthropic Memory Tool (provider-defined tool; you provide `execute`):

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { ToolLoopAgent } from 'ai';

const memory = anthropic.tools.memory_20250818({
  execute: async action => {
    // `action` contains `command`, `path`, and other fields
    // depending on the command (view, create, str_replace,
    // insert, delete, rename).
    // Implement your storage backend here.
    // Return the result as a string.
  },
});

const agent = new ToolLoopAgent({
  model: 'anthropic/claude-haiku-5.5',
  tools: { memory },
});

const result = await agent.generate({
  prompt: 'Remember that my favorite editor is Neovim',
});
```

## Three Approaches

| Approach | Effort | Flexibility | Provider Lock-in |
| --- | --- | --- | --- |
| Provider-Defined Tools | Low | Medium | Yes |
| Memory Providers | Low | Low | Depends on memory provider |
| Custom Tool | High | High | No |

### Provider-Defined Tools

Provider-defined tools are tools where the provider specifies the tool's `inputSchema` and `description`, but you provide the `execute` function. The model has been trained to use these tools, which can result in better performance compared to custom tools.

The Anthropic Memory Tool gives Claude a structured interface for managing a `/memories` directory. The tool receives structured commands (`view`, `create`, `str_replace`, `insert`, `delete`, `rename`), each with a `path` scoped to `/memories`. Your `execute` function maps these to your storage backend. Use it when you want memory with minimal implementation effort and are already using Anthropic models; the tradeoff is provider lock-in.

### Memory Providers

Providers that wrap an external memory service and expose it through the AI SDK's standard interface. Memory storage, retrieval, and injection happen transparently.

| Provider | Package | Notes |
| --- | --- | --- |
| Letta | `@letta-ai/vercel-ai-sdk-provider` | Persistent long-term memory; agent created on Letta's platform (cloud or self-hosted). `lettaCloud()` model, `providerOptions.letta.agent.id`, built-in tools via `lettaCloud.tool('core_memory_append')` etc. |
| Mem0 | `@mem0/vercel-ai-provider` | Memory layer over any supported LLM provider. `createMem0({ provider, mem0ApiKey, apiKey })`; explicit `addMemories` / `retrieveMemories`. |
| Supermemory | `@supermemory/tools` | `supermemoryTools(apiKey)` from `@supermemory/tools/ai-sdk`; gives the model `addMemory` and `searchMemories`. Works with any AI SDK provider. |
| Hindsight | `@vectorize-io/hindsight-ai-sdk`, `@vectorize-io/hindsight-client` | Five tools: `retain`, `recall`, `reflect`, `getMentalModel`, `getDocument`. `createHindsightTools({ client, bankId })`. Self-hosted with Docker or cloud. |
| MongoDB | `@mongodb-developer/vercel-ai-memory` | MongoDB Atlas-backed memory with five tiers: Session, Semantic, Procedural, Episodic, Scratchpad. `createMongoDBMemory({ uri, embedder })`. |

```ts
import { createMem0 } from '@mem0/vercel-ai-provider';
import { ToolLoopAgent } from 'ai';

const mem0 = createMem0({
  provider: 'openai',
  mem0ApiKey: process.env.MEM0_API_KEY,
  apiKey: process.env.OPENAI_API_KEY,
});

const agent = new ToolLoopAgent({
  model: mem0('gpt-6-astra', { user_id: 'user-123' }),
});

const { text } = await agent.generate({
  prompt: 'Remember that my favorite editor is Neovim',
});
```

```ts
import { createMongoDBMemory } from '@mongodb-developer/vercel-ai-memory';
import { openai } from '@ai-sdk/openai';
import { ToolLoopAgent, isLoopFinished } from 'ai';

// Create the memory instance once at module/server level
const mongodbMemory = createMongoDBMemory({
  uri: process.env.MONGODB_URI!,
  embedder: openai.embedding('text-embedding-3-small'),
});

// Scope to a user and session per request
const agent = new ToolLoopAgent({
  model: openai('gpt-6-astra'),
  tools: mongodbMemory({ userId: 'alice', sessionId: 'sess-001' }),
  stopWhen: isLoopFinished(),
});
```

### Custom Tool

Building your own memory tool from scratch is the most flexible approach: you control the storage format, the interface, and the retrieval logic, with no provider lock-in and no external dependencies. Two common patterns:

- **Structured actions**: you define explicit operations (`view`, `create`, `update`, `search`) and handle structured input yourself. Safe by design since you control every operation.
- **Bash-backed**: you give the model a sandboxed bash environment to compose shell commands (`cat`, `grep`, `sed`, `echo`) for flexible memory access. More powerful but requires command validation for safety.

## Notes

- Memory providers: the provider controls memory behavior, so you have less visibility into what gets stored and how it is retrieved, and you take on a dependency on an external service.
- The MongoDB integration targets AI SDK v6 (peer dependency `ai: ^6.0.0`) because it relies on v6 APIs such as `ModelMessage`, `ToolLoopAgent`, and `isLoopFinished()`. Session memory supports tool-driven and hook-driven (`prepareCall` + `onEnd`, recommended for production) modes.
- Memory service packages above are third-party / community packages; their APIs are documented only at the level shown on the official page.
- For the full custom memory tool walkthrough, see the official cookbook recipe "Build a Custom Memory Tool" (`/cookbook/guides/custom-memory-tool`).
- Distinct from other skills: provider-defined memory tool details of the raw Anthropic API are covered by anthropic-api-tools-mcp.

## Related

- [ToolLoopAgent](./tool-loop-agent.md)
- [Building Agents](./building-agents.md)

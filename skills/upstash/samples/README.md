# samples

| Name | Description | Path |
| --- | --- | --- |
| Redis Session Cache | Cache session data in Next.js API routes using Upstash Redis with TTL-based expiry | [redis-session-cache.md](./redis-session-cache.md) |
| Rate Limiting on Edge Runtime | Protect API routes from abuse using `@upstash/ratelimit` with sliding window algorithm on Edge Runtime | [ratelimit-edge.md](./ratelimit-edge.md) |
| QStash Background Job | Offload long-running tasks to a background worker by publishing a message with QStash and processing it in a verified API route | [qstash-background-job.md](./qstash-background-job.md) |
| Vector Semantic Search | Upsert text documents into Upstash Vector with a built-in embedding model and perform semantic similarity search without manual vectorization | [vector-semantic-search.md](./vector-semantic-search.md) |
| Workflow Multi-Step Processing | Define a durable multi-step function with Upstash Workflow; each step is retried independently on failure | [workflow-multistep.md](./workflow-multistep.md) |
| Full-Text Search with Filters | Upsert documents into an Upstash Search index and query them with a full-text search combined with typesafe content/metadata filters | [search-filtered-query.md](./search-filtered-query.md) |
| Running an AI Coding Agent in a Box | Create an isolated Upstash Box, run a Claude Code agent task inside it, execute a shell command, and clean up | [box-agent-sandbox.md](./box-agent-sandbox.md) |
| Sandboxed Inline Code Execution | Run inline JavaScript, TypeScript, and Python snippets inside an Upstash Box without an agent, including error handling for a failing script | [box-code-execution.md](./box-code-execution.md) |

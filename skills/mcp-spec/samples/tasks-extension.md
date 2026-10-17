---
source: https://modelcontextprotocol.io/extensions/tasks/overview#implementation-guide
---

# Tasks Extension

Client and server declare the `io.modelcontextprotocol/tasks` extension; the server then answers long-running requests with a task handle.

Client declares support in each request's `_meta`:

```jsonc
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "...",
  "params": {
    // Other fields...
    "_meta": {
      // Other fields...
      "io.modelcontextprotocol/clientCapabilities": {
        "extensions": {
          "io.modelcontextprotocol/tasks": {},
        },
      },
    },
  },
}
```

Server advertises support in its `server/discover` result:

```jsonc
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    // Other fields...
    "capabilities": {
      "extensions": {
        "io.modelcontextprotocol/tasks": {},
      },
    },
  },
}
```

Flow (from the overview):

```text
tools/call (with tasks capability)  ->  CreateTaskResult (resultType: "task", taskId, status: working)
tasks/get (taskId)                  ->  Task (status: working | input_required | completed | failed | cancelled)
tasks/update (taskId, inputResponses) -> ack      (when status is input_required)
tasks/cancel (taskId)               ->  ack       (cooperative)
```

## Notes

- Source: tag `2026-07-28` raw `docs/extensions/tasks/overview.mdx`, retrieved 2026-10-16 (the site path is unversioned). The overview shows only the two capability JSON snippets; the flow block above condenses its sequence diagram and is not a wire-format example. Full message schemas live in the experimental-ext-tasks repository, which the overview names as the specification.
- Servers MUST NOT return a task to a client that did not declare the extension; `completed`, `failed` and `cancelled` are terminal.
- Moved in 2026-07-28: tasks left the core protocol and became an extension.
- The MCP Tasks extension is unrelated to job queues such as inngest and bullmq, and to Claude Code scheduled tasks (anthropic-claude-code-extend).

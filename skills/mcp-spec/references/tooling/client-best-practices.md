---
source: https://modelcontextprotocol.io/docs/2026-07-28/develop/clients/client-best-practices
---

# Client Best Practices

Patterns for scaling MCP host applications across many servers and tools: progressive tool discovery (controls when tool definitions enter context) and programmatic tool calling (controls how tools are invoked).

## Signature / Usage

Progressive discovery: the host fetches definitions via `tools/list` but defers injecting them into the model's context, provides a lightweight `search_tools` meta-tool, and loads full definitions only as needed. Three layers (catalog, inspect, execute):

```typescript
// The model calls a lightweight search tool
search_tools({ query: "update salesforce record" })

// Returns concise matches: names and one-line descriptions only
→ [
    { name: "salesforce_updateRecord", description: "Update fields on a Salesforce object" },
    { name: "salesforce_upsertRecord", description: "Insert or update based on external ID" }
  ]

// The model inspects only the tool it needs
get_tool_details({ name: "salesforce_updateRecord" });
```

Programmatic tool calling ("code mode"): the host converts MCP tool schemas into a typed API inside a sandbox; the model writes code that calls tools; function calls are intercepted and dispatched as `tools/call` requests; only the final result returns to the model.

```typescript
function ticketing_createIssue(input: {
  title: string;
  body?: string;
  priority: "low" | "medium" | "high";
}): Promise<{ issueId: string }> {
  return mcp.callTool<{ issueId: string }>("ticketing_createIssue", input);
}
```

## Options / Props

Discovery strategies:

| Strategy | Description |
| --- | --- |
| Keyword-based | Keyword matching (BM25, regex) |
| Embedding-based | Vector-similarity retrieval over tool descriptions |
| Subagent-based | A secondary, small and fast model selects tools; often works very well but can be more costly |
| Hybrid | Combine approaches |

Implementation guidelines:

| Guideline | Rationale |
| --- | --- |
| Offer multiple detail levels | Name-only, name-and-description, or full-schema responses |
| Cache tool definitions | Memoize host-side so re-injecting does not need another `tools/list` round trip |
| Refresh on `list_changed` | Re-index the catalog on `notifications/tools/list_changed` |
| Group tools by server | Present tools organized by source server |

Example sandbox runtimes (listed in the source, not endorsements): Deno / `isolated-vm` (JavaScript), Monty (Python, experimental), pctx (TypeScript, early-stage), Wasmtime (any language via Wasm).

## Notes

- Switch to progressive discovery when tool definitions take a significant part of the context window; the source suggests a threshold as a percentage of the context window, for example 1%-5%.
- Dynamic server management: keep a registry of servers, connect on demand (`server/discover`, then `tools/list`), disconnect when no longer relevant.
- Caching: each list result, `server/discover` result, and `resources/read` result carries `ttlMs` and `cacheScope` hints; follow the specification's caching utility. Treat a cached list as stale once a `list_changed` notification arrives, even before its TTL expires.
- Prompt caching: adding or removing tool definitions mid-conversation invalidates the cached prefix. Append new definitions after the cache breakpoint, or route calls through a single stable `call_tool({name, args})` meta-tool; treat server disconnection as a conversation-boundary operation.
- Security: apply the same human-in-the-loop confirmation policy to sandbox-originated calls as to direct calls; approving a script does not grant blanket approval for each runtime call. Tool results from one server are untrusted input to another. Sandbox should have no direct network access; credentials stay with the host; set timeouts and memory limits; validate and truncate console output.
- Error handling: tool errors arrive as a successful response with `isError: true`; generated wrappers should convert this to a thrown exception.
- When `outputSchema` is absent, use a generic type, or extract a typed result with a fast model via a host-brokered helper and validate the result.
- Some model providers offer built-in tool search (the page links OpenAI and Anthropic docs); the source says to prefer it when available unless specialized retrieval is needed.

## Related

- [Build with Agent Skills](./build-with-agent-skills.md)
- [Debugging](./debugging.md)

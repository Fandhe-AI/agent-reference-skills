# Tools

OpenAI API built-in tools (hosted tools of the Responses API) and function-tool definition. Not `hermes-agent` MCP tool wrappers, not `playwright` browser automation — these are OpenAI-hosted or OpenAI-orchestrated tool types (`web_search`, `file_search`, `code_interpreter`, `computer`, `image_generation`, `shell`, `local_shell`, `apply_patch`, `function`, `custom`, `tool_search`, `programmatic_tool_calling`) invoked via the `tools` array of a Responses API request.

| Name | Description | Path |
|------|-------------|------|
| Using Tools (overview) | Tool categories overview: built-in tools, function calling, tool search, remote MCP | [tools-overview.md](./tools-overview.md) |
| Web Search | `web_search` hosted tool: search context size, domain filters, user location, citations | [web-search.md](./web-search.md) |
| File Search | `file_search` hosted tool: vector store IDs, `max_num_results`, metadata filters | [file-search.md](./file-search.md) |
| Vector Stores (Retrieval API) | Creating vector stores, uploading files, chunking strategy, file attributes | [vector-stores.md](./vector-stores.md) |
| Code Interpreter | `code_interpreter` hosted tool: containers, memory tiers, file citations | [code-interpreter.md](./code-interpreter.md) |
| Computer Use | `computer` hosted tool: screenshot/action loop, harness options, security | [computer-use.md](./computer-use.md) |
| Image Generation | `image_generation` hosted tool: size/quality/format options, streaming, multi-turn edits | [image-generation.md](./image-generation.md) |
| Shell | `shell` hosted/local tool: containerized command execution, network allowlists, domain secrets | [shell.md](./shell.md) |
| Local Shell | `local_shell` tool (outdated, superseded by `shell`): Codex CLI command loop | [local-shell.md](./local-shell.md) |
| Apply Patch | `apply_patch` tool: structured file diffs (create/update/delete), V4A diff format | [apply-patch.md](./apply-patch.md) |
| Function Tools | `function` / `custom` tool definition: JSON schema, `strict` mode, `tool_choice`, parallel calls, CFG-constrained custom tools | [function-tools.md](./function-tools.md) |
| Tool Search | `tool_search` hosted tool: deferred tool loading, namespaces, hosted vs client-executed search | [tool-search.md](./tool-search.md) |
| Programmatic Tool Calling | `programmatic_tool_calling` hosted tool: sandboxed JS orchestration of other tools, `allowed_callers` | [programmatic-tool-calling.md](./programmatic-tool-calling.md) |

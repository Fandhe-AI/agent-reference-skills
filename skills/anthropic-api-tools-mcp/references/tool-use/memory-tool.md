<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool / last verified: 2026-08-07 -->

# Memory tool

Client tool: Claude stores and retrieves information across conversations as files under `/memories` that your application persists via `view`, `create`, `str_replace`, `insert`, `delete`, `rename`.

## Signature / Usage

```json
{"type": "memory_20250818", "name": "memory"}
```

```json
{"command": "view", "path": "/memories", "view_range": [1, 10]}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| command: view | — | `path`, optional `view_range: [start, end]` (files only); directories list up to 2 levels deep with sizes |
| command: create | — | `path`, `file_text`; reference behavior errors if file exists (overwrite is a valid alternative implementation) |
| command: str_replace | — | `path`, `old_str`, optional `new_str` (omitted = delete `old_str`) |
| command: insert | — | `path`, `insert_line` (0 = start), `insert_text` |
| command: delete | — | `path`; recursive for directories; must reject deleting `/memories` itself |
| command: rename | — | `old_path`, `new_path`; must reject renaming `/memories` itself, errors if destination exists |

## Notes

- Client-side/schema-less tool (no `input_schema`); GA, no beta header, available on all Claude 4+ models. Your application maps `/memories` to real storage (per-user directory, DB keys, etc.) and must restrict every operation to that prefix.
- The API auto-injects a memory protocol system-prompt instruction whenever the tool is present: Claude is told to always `view` `/memories` before starting work and to keep memory updated in case of context reset — you don't need to send this yourself.
- Path traversal is a first-class risk: validate every path starts with `/memories`, resolve to canonical form and verify containment, reject `../`/`..\\`/URL-encoded traversal sequences.
- Four SDKs (Python, TypeScript, C#, Java) ship helper base classes/handlers (`BetaAbstractMemoryTool`, `betaMemoryTool`, `BetaMemoryToolHandler`) plus a ready-made `BetaLocalFilesystemMemoryTool` (Python/TypeScript); Go/Ruby run the tool-use loop manually; PHP wraps a closure in `BetaRunnableTool`.
- Errors: return `is_error: true` with a message string in the `tool_result` content, same pattern as text editor tool (e.g. `"Error: The path {path} does not exist"`, `"No replacement was performed, old_str ... did not appear verbatim in {path}"`).
- Pairs with context editing (client-side trimming of stale tool results) and compaction (server-side conversation summarization) — memory is what should survive summarization in long-running agents.
- Recommended multisession pattern: an initializer session sets up a progress log, feature checklist, and startup-script reference before work begins; later sessions read those files first; each session updates the progress log before ending; mark features complete only after end-to-end verification.

## Related

- [bash-tool](./bash-tool.md)
- [manage-tool-context](./manage-tool-context.md)
- [handle-tool-calls](./handle-tool-calls.md)

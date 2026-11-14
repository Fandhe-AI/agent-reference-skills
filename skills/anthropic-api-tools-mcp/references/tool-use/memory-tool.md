<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool / last verified: 2026-11-14 -->

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
| command: view | — | `path`, optional `view_range: [start, end]` (text files only; `[start, -1]` = to end of file); directories list up to 2 levels deep with human-readable sizes, excluding hidden items and `node_modules` |
| command: create | — | `path`, `file_text`; reference behavior errors if file exists (overwrite is a valid alternative implementation) |
| command: str_replace | — | `path`, `old_str`, optional `new_str` (omitted = delete `old_str`) |
| command: insert | — | `path`, `insert_line` (0 = start), `insert_text` |
| command: delete | — | `path`; recursive for directories; must reject deleting `/memories` itself |
| command: rename | — | `old_path`, `new_path`; must reject renaming `/memories` itself, errors if destination exists |

## Notes

- Client-side/schema-less tool (no `input_schema`; the `name` must be `memory`); GA, no beta header, available on all Claude 4+ models (listed through `claude-fable-5-2`, `claude-mythos-5-2`, `claude-opus-5-5`, `claude-sonnet-5-5`, `claude-haiku-5-5`) and on Claude API, Bedrock, Claude Platform on AWS, Google Cloud (both managed variants) and Microsoft Foundry. Eligible for zero data retention (excludes Covered Models) and HIPAA readiness. A later conversation continues from the same memory when it sends the same `tools` entry and your handler serves the same store. Your application maps `/memories` to real storage (per-user directory, DB keys, etc.) and must restrict every operation to that prefix.
- The API auto-injects a memory protocol system-prompt instruction whenever the tool is present: Claude is told to always `view` `/memories` before starting work and to keep memory updated in case of context reset — you don't need to send this yourself.
- Path traversal is a first-class risk: validate every path starts with `/memories`, resolve to canonical form and verify containment, reject `../`/`..\\`/URL-encoded traversal sequences.
- Four SDKs (Python, TypeScript, C#, Java) ship helper base classes/handlers (`BetaAbstractMemoryTool`, `betaMemoryTool`, `BetaMemoryToolHandler`) plus a ready-made `BetaLocalFilesystemMemoryTool` (Python/TypeScript); Go/Ruby run the tool-use loop manually; PHP wraps a closure in `BetaRunnableTool`.
- Return strings are recommendations: Claude reads whatever text your result contains. Reference strings: view dir header `Here're the files and directories up to 2 levels deep in {path}, excluding hidden items and node_modules:` then `{size}\t{path}` lines; view file header `Here's the content of {path} with line numbers:` with 6-char right-aligned 1-indexed numbers, tab, content; files over 999,999 lines return an error; create `File created successfully at: {path}`; str_replace `The memory file has been edited.` plus snippet; insert `The file {path} has been edited.`; delete `Successfully deleted {path}`; rename `Successfully renamed {old_path} to {new_path}`.
- Claude's tool description says `view` displays `.jpg` / `.jpeg` / `.png` images and truncates text views of files longer than 16,000 characters, and that `create` "creates or overwrites" (expect `create` on existing paths; error or overwrite are both valid). The first `view` of `/memories` on an empty store is not an error. `str_replace`/`insert`/`delete`/`rename` on a directory path: `str_replace` and `insert` return a "file does not exist" error; `delete` removes recursively; `rename` renames the directory.
- Errors: return `is_error: true` with a message string in the `tool_result` content, same pattern as text editor tool (e.g. `"Error: The path {path} does not exist"`, `"No replacement was performed, old_str ... did not appear verbatim in {path}."`; duplicate `old_str` returns `"No replacement was performed. Multiple occurrences of old_str ... in lines: {line_numbers}. Please ensure it is unique"`; invalid `insert_line` errors with the valid range `[0, {n_lines}]`; rename onto an existing destination returns `"Error: The destination {new_path} already exists"`).
- Security: also strip sensitive data before writing (Claude usually refuses but not guaranteed), cap file sizes and the characters `view` returns (page via `view_range`), and expire stale files. Optional prompt reinforcement if memory gets cluttered: "keep its content up-to-date, coherent and organized ... Do not create new files unless necessary."
- Pairs with context editing (client-side trimming of stale tool results) and compaction (server-side conversation summarization) — memory is what should survive summarization in long-running agents.
- Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool (fetched 2026-11-14)
- Recommended multisession pattern: an initializer session sets up a progress log, feature checklist, and startup-script reference before work begins; later sessions read those files first; each session updates the progress log before ending; mark features complete only after end-to-end verification.

## Related

- [bash-tool](./bash-tool.md)
- [manage-tool-context](./manage-tool-context.md)
- [handle-tool-calls](./handle-tool-calls.md)

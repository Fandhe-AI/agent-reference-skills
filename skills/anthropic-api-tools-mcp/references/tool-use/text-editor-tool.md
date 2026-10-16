<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/text-editor-tool / last verified: 2026-08-07 -->

# Text editor tool

Client tool named `str_replace_based_edit_tool`: Claude views and edits text files via `view`, `str_replace`, `create`, and `insert` commands that your application executes.

## Signature / Usage

```json
{"type": "text_editor_20250728", "name": "str_replace_based_edit_tool", "max_characters": 10000}
```

```json
{"command": "str_replace", "path": "primes.py", "old_str": "for num in range(2, limit + 1)", "new_str": "for num in range(2, limit + 1):"}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| command: view | — | `path` (file or directory), optional `view_range: [start, end]` (1-indexed, `-1` = to end; files only) |
| command: str_replace | — | `path`, `old_str` (must match exactly incl. whitespace), `new_str` |
| command: create | — | `path`, `file_text` |
| command: insert | — | `path`, `insert_line` (0 = beginning of file), `insert_text` |
| max_characters | integer (optional) | `text_editor_20250728`+ only; controls truncation when viewing large files |

## Notes

- Tool `type` is `text_editor_20250728` (current, Claude 4+, adds `max_characters`) or `text_editor_20250124` (earlier models); older `text_editor_20250429`/`text_editor_20241022` are legacy. The `undo_edit` command was removed in `text_editor_20250429` and does not exist in current versions.
- Schema-less like other Anthropic-schema client tools: no `input_schema` to define, name is fixed per version.
- Pricing: additional input tokens beyond base token pricing for `text_editor_20250728`: 974 tokens on Claude 4.7 and later models and Claude Mythos Preview; 745 tokens on Claude 4.6 and earlier models.
- Change log: `text_editor_20250728` (2025-07-28) adds optional `max_characters`, otherwise identical to `_20250429`; `text_editor_20250429` (2025-04-29) is the Claude 4 version and removes `undo_edit`; `text_editor_20250124` (2025-03-13) is optimized for Claude Sonnet 3.7; `text_editor_20241022` (2024-10-22) is the initial release with Claude Sonnet 3.5 (retired) and includes `undo_edit`.
- When combining with other tools (bash, computer use), match the tool version to the model and account for each tool's separate token overhead.

## Related

- [bash-tool](./bash-tool.md)
- [handle-tool-calls](./handle-tool-calls.md)
- [tool-combinations](./tool-combinations.md)

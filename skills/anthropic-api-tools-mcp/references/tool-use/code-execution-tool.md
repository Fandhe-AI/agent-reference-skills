<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool / last verified: 2026-08-07 -->

# Code execution tool

Server tool: Claude runs Python/Bash and edits files in a secure sandboxed container, gaining two sub-tools (`bash_code_execution`, `text_editor_code_execution`).

## Signature / Usage

```json
{"type": "code_execution_20260521", "name": "code_execution"}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| type | string | `code_execution_20260521` (latest, discloses per-cell time limit) / `code_execution_20260120` (adds programmatic tool calling) / `code_execution_20250825` (adds Bash + file ops) / `code_execution_20250522` (legacy, Python only) |
| container (request) | string (optional) | Reuse a prior container ID to persist files (and, on `_20260120`+, interpreter state) across requests |
| container (response) | object | `{id, expires_at}` returned when Claude runs code |

## Notes

- Container: Python 3.11, Linux x86_64, 5 GiB RAM, 5 GiB disk, 1 CPU, no internet access (no package installs at runtime beyond pre-installed libraries — pandas/numpy/scipy/scikit-learn/matplotlib/seaborn/pillow/pypdf/sympy etc., plus CLI tools unzip/7zip/rg/fd/sqlite). Fully isolated sandbox scoped to the API key's workspace.
- Containers checkpoint after ~5 min idle and can be restored by sending the same `container` ID within 30 days of creation; expired containers can't be reused (omit `container` to get a fresh one). The response's `expires_at` is a shorter rolling value, not the 30-day cap.
- Response blocks: `bash_code_execution_tool_result` (`stdout`, `stderr`, `return_code`, `content` list of created-file references with `file_id` for the Files API) and `text_editor_code_execution_tool_result` (view/create/str_replace variants with their own fields, e.g. diff `lines` for str_replace).
- Error codes: `unavailable`, `execution_time_exceeded`, `invalid_tool_input`, `too_many_requests` (all tools); `output_file_too_large` (bash); `file_not_found` (text_editor).
- Pricing: **free when combined with `web_search_20260209`+/`web_fetch_20260209`+** in the same request (covers dynamic-filtering code execution and direct code execution) beyond standard token costs. Standalone: billed by execution time, 5-minute minimum, 1,550 free org-hours/month, then $0.05/hour/container; files included in the request bill execution time even if the tool isn't called (preloaded onto the container).
- A response may end with `stop_reason: "pause_turn"` on a long-running turn — resend as-is to continue, same as other server tools.
- Powers dynamic filtering in web search/fetch `_20260209`+ automatically (no need to add `code_execution` yourself for that).
- Messages API general mechanics: see anthropic-api-core skill.

## Related

- [programmatic-tool-calling](./programmatic-tool-calling.md)
- [bash-tool](./bash-tool.md)
- [server-tools](./server-tools.md)

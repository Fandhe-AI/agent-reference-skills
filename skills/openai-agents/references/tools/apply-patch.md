# Apply Patch

`apply_patch` tool: with the Responses API the model proposes file creations, updates, and deletions as structured diffs; your application applies each operation and returns its result. For automated multi-file code editing.

## Signature / Usage

```python
response = client.responses.create(
    model="gpt-6-astra",
    input=RESPONSE_INPUT,
    tools=[{"type": "apply_patch"}],
)
```

V4A diff format, from the `apply_patch_call` object (`update_file` example):

```json
{
  "id": "apc_08f3d96c87a585390069118b594f7481a088b16cda7d9415fe",
  "type": "apply_patch_call",
  "status": "completed",
  "call_id": "call_Rjsqzz96C5xzPb0jUWJFRTNW",
  "operation": {
    "type": "update_file",
    "path": "lib/fib.py",
    "diff": "@@\n-def fib(n):\n+def fibonacci(n):\n    if n <= 1:\n        return n\n-    return fib(n-1) + fib(n-2)\n+    return fibonacci(n-1) + fibonacci(n-2)\n"
  }
}
```

Report results back with one `apply_patch_call_output` per `call_id` (via `previous_response_id` or by passing conversation items in `input`), keeping `tools=[{"type": "apply_patch"}]`:

```python
results.append(
    {
        "type": "apply_patch_call_output",
        "call_id": call["call_id"],
        "status": "completed" if success else "failed",
        "output": log_output,
    }
)
```

If a patch fails (for example, file not found), set `status: "failed"` and include a helpful `output` string so the model can recover:

```json
{
  "type": "apply_patch_call_output",
  "call_id": "call_cNWm41dB3RyQcLNOVTIPBWZU",
  "status": "failed",
  "output": "Could not apply patch to lib/foo.py — file not found on disk"
}
```

Workflow:

1. Call the Responses API with the `apply_patch` tool enabled (give the model file context in `input` or tools to explore the file system).
2. The output includes one or more `apply_patch_call` objects, each describing a single create / update / delete.
3. Your harness applies each operation and records success or failure.
4. Send `apply_patch_call_output` events back; the model continues editing or explains its changes.

## Options / Props

| Operation Type | Purpose | Payload |
|------|------|-------------|
| `create_file` | Create a new file at `path` | `diff` is a V4A diff representing the full file contents |
| `update_file` | Modify an existing file at `path` | `diff` is a V4A diff with additions, deletions, or replacements |
| `delete_file` | Remove a file at `path` | No `diff`; delete the file entirely |

`apply_patch_call_output` fields: `call_id`, `status` (`completed` \| `failed`), optional `output` string.

## Notes

- Use cases: multi-file refactors, bug fixes (diagnose and emit patches), tests and docs generation, migrations and mechanical edits.
- No input schema is provided for the tool; the model constructs `operation` objects. The harness parses `apply_patch_call` items, applies V4A diffs, and emits exactly one `apply_patch_call_output` per `call_id`. Reference diff implementations: Python Agents SDK `apply_diff.py` and TypeScript Agents SDK `applyDiff.ts` (see Source).
- Safety: validate paths (prevent directory traversal, restrict to allowed directories); consider backups or a scratch copy; always return `failed` with an informative `output` when a patch cannot be applied; decide between all-or-nothing and per-file semantics.
- Agents SDK: `applyPatchTool({ editor, needsApproval, onApproval })` (TypeScript) and `ApplyPatchTool(editor=..., needs_approval=...)` (Python) wrap the tool; you still implement the editor (create / update / delete) and can use `applyDiff` / `apply_diff` for diff processing.
- Source: https://developers.openai.com/api/docs/guides/tools-apply-patch (fetched 2026-11-14).

## Related

- [Shell](./shell.md)

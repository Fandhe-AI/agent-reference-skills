# Apply Patch

`apply_patch` tool: lets the model create, modify, and remove files through structured diff operations, for automated multi-file code editing.

## Signature / Usage

```python
response = client.responses.create(
    model="gpt-5.6",
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

Workflow:

1. Call the API with the `apply_patch` tool enabled.
2. The model returns one or more patch operation objects.
3. Your harness applies the patches to the filesystem.
4. Report success/failure results back to the model.
5. The model continues editing or explains its changes.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `create_file` | operation | New file using V4A diff format for full content |
| `update_file` | operation | Modify an existing file using a V4A diff |
| `delete_file` | operation | Remove a file entirely |

## Notes

- Use cases: large-scale refactoring (rename symbols, extract helpers, reorganize modules across many files), diagnostic bug repair, generating tests/docs alongside code changes, repetitive structured updates (API migrations, type annotations).
- Your harness must parse operations from API responses, apply V4A diffs to the filesystem, validate paths, enforce security restrictions, and return status updates with clear error messages.
- Always return a `failed` status with an informative `output` string when a patch cannot be applied.

## Related

- [Shell](./shell.md)

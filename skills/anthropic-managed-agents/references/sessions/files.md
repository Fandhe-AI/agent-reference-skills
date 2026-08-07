<!-- source: https://platform.claude.com/docs/en/managed-agents/files / last verified: 2026-08-07 -->

# Adding files

Upload files via the Files API and mount them in a session's sandbox for the agent to read and process.

## Signature / Usage

```python
file = client.beta.files.upload(file=Path("data.csv"))
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
    resources=[{"type": "file", "file_id": file.id, "mount_path": "/data.csv"}],
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `resources[].type` | string | `"file"` |
| `resources[].file_id` | string | ID returned by `files.upload` |
| `resources[].mount_path` | string | Optional; rooted under the session's uploads directory (`/data.csv` → `/mnt/session/uploads/data.csv`); if omitted, mounted at `/mnt/session/uploads/<file_id>` |

## Notes

- Max 500 files per session. Mounted files are read-only copies; the agent writes modified versions to new sandbox paths.
- A new `file_id` is created per session-mounted instance and does not count against storage limits.
- Add/remove files on a running session via `sessions.resources.add` / `.list` / `.delete` (each resource has its own `id`, e.g. `sesrsc_...`).
- List/download session-scoped files via the Files API with `scope_id=<session_id>`.
- Supported file types: source code, data files, documents, archives (agent extracts via bash), and binary files.

## Related

- [Accessing GitHub](./github.md)
- [Using agent memory](./memory.md)

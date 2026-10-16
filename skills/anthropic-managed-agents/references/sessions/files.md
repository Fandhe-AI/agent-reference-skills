<!-- source: https://platform.claude.com/docs/en/managed-agents/files / last verified: 2026-10-17 -->

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
- Supported file types: the agent can work with any file type, including source code (`.py`, `.js`, `.ts`, `.go`, `.rs`, and others), data files (`.csv`, `.json`, `.xml`, `.yaml`), documents (`.txt`, `.md`), archives (`.zip`, `.tar.gz`; the agent extracts them using bash), and binary files (processed with appropriate tools).
- File paths: the path you specify is rooted under the session's uploads directory (`mount_path` `/data.csv` places the file at `/mnt/session/uploads/data.csv`); if omitted, the file is placed at `/mnt/session/uploads/<file_id>`. Parent directories are created automatically and paths should be absolute (start with `/`). Files the agent writes to `/mnt/session/outputs/` become available through the Files API, scoped to the session; they appear in the list shortly after the agent finishes writing, sometimes a few seconds after the session goes idle (list again after a short delay if one is missing).
- Filtering the Files API by `scope_id` requires the `managed-agents-2026-04-01` beta header on the `GET /v1/files` call.
- Managing files on a running session: add or remove files after creation through the session resources API; each resource has an `id` returned when it is added (or listed), used for deletes.

## Related

- [Accessing GitHub](./github.md)
- [Using agent memory](./memory.md)

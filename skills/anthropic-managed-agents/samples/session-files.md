<!-- source: https://platform.claude.com/docs/en/managed-agents/files / last verified: 2026-08-07 -->

# Mount Files into a Session and Retrieve Artifacts

Upload a file via the Files API, mount it in a session's sandbox at session creation, then list and download the files a session produced.

```python
from pathlib import Path
from anthropic import Anthropic

client = Anthropic()

file = client.beta.files.upload(file=Path("data.csv"))
print(f"File ID: {file.id}")

session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
    resources=[
        {
            "type": "file",
            "file_id": file.id,
            "mount_path": "/data.csv",
        },
    ],
)
```

List and download the files associated with a session (its own outputs, scoped via `scope_id`):

```python
# List files associated with a session
files = client.beta.files.list(
    scope_id=session.id,
    betas=["managed-agents-2026-04-01"],
)
for listed_file in files:
    print(listed_file.id, listed_file.filename)

# Download a file
content = client.beta.files.download(files.data[0].id)
content.write_to_file("output.txt")
```

## Notes

- `mount_path` is optional and rooted under the session's uploads directory (`/data.csv` → `/mnt/session/uploads/data.csv`); if omitted, the file mounts at `/mnt/session/uploads/<file_id>`.
- Max 500 files per session. Mounted files are read-only copies; the agent writes modified versions to new sandbox paths.
- Add/remove files on a running session via `sessions.resources.add` / `.list` / `.delete` (each resource has its own `id`, e.g. `sesrsc_...`).
- A new `file_id` is created per session-mounted instance and does not count against storage limits.
- Example from the Claude API (platform.claude.com) `managed-agents/files` page.

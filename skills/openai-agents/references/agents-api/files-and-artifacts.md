# Files and Artifacts

Files live in the agent's environment. An artifact is a published copy of a file from an OpenAI-hosted environment that stays downloadable after the environment expires.

## Signature / Usage

Find and download an artifact:

```python
# Pass the saved session ID, completed turn ID, artifact path, and local destination.
def download_artifact(client, session_id, turn_id, path, destination):
    for artifact in client.beta.agents.sessions.artifacts.list(session_id):
        if artifact.turn_id != turn_id or artifact.path != path:
            continue
        with client.beta.agents.sessions.artifacts.with_streaming_response.content(
            artifact.id, session_id=session_id
        ) as response:
            response.stream_to_file(destination)
        return
    raise FileNotFoundError(f"No artifact for {path!r} in turn {turn_id}")
```

Upload error example (destination outside `/workspace`, HTTP 400):

```json
{
  "error": {
    "type": "invalid_request_error",
    "code": "invalid_request_error",
    "message": "path must be an absolute POSIX path inside /workspace",
    "param": "path"
  }
}
```

## Options / Props

| Environment | How to retrieve files |
|-------------|-----------------------|
| `self_hosted` | Your provider's file API or mounted filesystem |
| `openai_hosted` | Session Artifacts API for files under `/workspace/outputs` |
| `none` | No filesystem; read output from session items |

| File operation | Limit |
|----------------|-------|
| Files included when creating a session | 50 files per request |
| Inline upload | 5 MiB per file (before base64) |
| Inline uploads in one creation request | 10 MiB total (before base64) |
| File copied from the Files API | 50 MiB per file |
| Published artifact | 200 MiB per file |
| Outputs published together | 500 MiB total |

| Request | Example `error.param` |
|---------|-----------------------|
| Add one environment file | `path`, `data`, or `file_id` |
| Create a session or prewarm an environment | `environment.files[i].data` |
| Create or update an environment template | `files[i].data` |

## Notes

- Upload: supply `environment.files` at session creation with `type: "file_id"` (Files API ID) or `type: "inline"` (base64 `data`); both require a `path` under `/workspace`. Add files after connect via the environment Files API.
- Errors: HTTP 429 `files_api_rate_limit_exceeded`; HTTP 400 use `error.param` / `error.message`. Use valid base64 and file IDs and an absolute path under `/workspace`. Destinations traversing a symlink, already existing, or with an overlong path component return 400. Unexpected install errors return 500; check whether the destination was created before retrying.
- Self-hosted files are not published through the Artifacts API, including `/workspace/outputs`; save them to your storage before the environment expires.
- Hosted: ask the agent to save under `/workspace/outputs` (e.g. `/workspace/outputs/report.pdf`); outputs are published as immutable artifacts when the turn completes.
- One artifact per download request; no batch endpoint. For one download, ask the agent to bundle results into a ZIP under `/workspace/outputs`.
- Artifacts cannot be uploaded or edited through this API; to publish a new version, have the agent update the file in another turn and distinguish versions by turn ID and path. Deleting an artifact leaves the environment file intact. Download needed files before deleting the session.
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/files (fetched 2026-10).

## Related

- [OpenAI-hosted Sandboxes](./openai-hosted-sandboxes.md)
- [Pre-warm Sandboxes](./prewarmed-sandboxes.md)
- [Errors and Recovery](./errors.md)

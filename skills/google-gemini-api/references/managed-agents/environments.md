---
source: https://ai.google.dev/gemini-api/docs/agent-environment
---

# Environments in managed agents

Environments are managed Linux sandboxes where agents execute code and persist files. They are decoupled from interaction context, so the same environment can be reused across interactions or replaced at any time.

## Signature / Usage

Create an interaction with a fresh remote environment and read its ID:

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Install pandas and matplotlib, verify the imports, and print the versions.",
    environment="remote",
)

print(f"Environment ID: {interaction.environment_id}")
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
    agent: "antigravity-preview-09-2026",
    input: "Install pandas and matplotlib, verify the imports, and print the versions.",
    environment: "remote",
});

console.log(`Environment ID: ${interaction.environment_id}`);
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
-H "Content-Type: application/json" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-d '{
    "agent": "antigravity-preview-09-2026",
    "input": "Install pandas and matplotlib, verify the imports, and print the versions.",
    "environment": "remote"
}'
```

Config object with sources, network, and env:

```python
interaction_3 = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="List all files and summarize the project.",
    environment={
        "type": "remote",
        "sources": [
            {
                "type": "repository",
                "source": "https://github.com/octocat/Spoon-Knife",
                "target": "/workspace/spoon-knife",
            }
        ],
    },
)
```

Mixed source types (REST):

```json
{
    "type": "remote",
    "sources": [
        {"type": "repository", "source": "https://github.com/octocat/Spoon-Knife", "target": "/workspace/spoon-knife"},
        {"type": "gcs", "source": "gs://cloud-samples-data/bigquery/us-states/", "target": "/workspace/gcs-data"},
        {"type": "inline", "content": "# Project Notes\n\n- Analyze state population data\n- Create visualizations\n", "target": "/workspace/notes/readme.md"}
    ]
}
```

Network allowlist with a stored credential, or disabled network:

```python
environment={
    "type": "remote",
    "network": {
        "allowlist": [
            {"domain": "api.github.com", "credential": "github-production"},
            {"domain": "*"},
        ]
    },
}

environment={
    "type": "remote",
    "network": "disabled",
}
```

Environment variables (`env`):

```python
interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Build the project and run the test suite.",
    environment={
        "type": "remote",
        "env": {
            "NODE_ENV": "production",
            "LOG_LEVEL": "debug",
            "API_TOKEN": {"credential": "my-api-token"},
        },
    },
)
```

Environments API:

```bash
curl -X GET "https://generativelanguage.googleapis.com/v1beta/environments?pageSize=10" \
-H "x-goog-api-key: $GEMINI_API_KEY"

curl -X GET "https://generativelanguage.googleapis.com/v1beta/environments/YOUR_ENVIRONMENT_ID" \
-H "x-goog-api-key: $GEMINI_API_KEY"

curl -X DELETE "https://generativelanguage.googleapis.com/v1beta/environments/YOUR_ENVIRONMENT_ID" \
-H "x-goog-api-key: $GEMINI_API_KEY"
```

Files in the environment (Python SDK):

```python
response = client.environments.files.list(
    environment="YOUR_ENVIRONMENT_ID",
    path="src",
    recursive=True,
)
for file in response.files:
    print(f"{file.name} ({file.type}) - {file.path}")

with open("local_file.txt", "rb") as f:
    result = client.environments.files.upload(
        environment="YOUR_ENVIRONMENT_ID",
        path="workspace/data/file.txt",
        file=f,
        mime_type="text/plain",
        overwrite=True,
    )
```

```bash
# Download a directory as tar
curl -L -X GET "https://generativelanguage.googleapis.com/v1beta/environments/$ENV_ID/files/config?alt=media&recursive=true" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -o config.tar

# Upload and extract an archive
curl -X PUT "https://generativelanguage.googleapis.com/upload/v1beta/environments/$ENV_ID/files/workspace/src/?extract=true" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/x-tar" \
  --data-binary @source.tar.gz
```

## Options / Props

`environment` parameter forms:

| Form | Example | When to use |
|------|---------|-------------|
| `"remote"` | `environment="remote"` | Provision a fresh sandbox |
| Environment ID | `environment="env_abc123"` | Reuse an existing sandbox with all its files and packages |
| Config object | `environment={...}` | Provision a new sandbox with sources, network rules, environment variables, or a combination |

Source types (`sources` array):

| Source type | `type` value | Description | Limit |
|-------------|--------------|-------------|-------|
| Git repository | `repository` | Clones a repository from a URL into the sandbox at `target` | 500 MB |
| Cloud Storage | `gcs` | Copies a file or directory from Cloud Storage into the sandbox at `target` | 2 GB |
| Inline content | `inline` | Writes raw text content to a file in the sandbox at `target` | 1 MB per file, 2 MB total |

Network allowlist rule fields:

| Field | Type | Description |
|-------|------|-------------|
| `domain` | string | Domain to match. Exact hostname or `*` for all domains |
| `credential` | string | ID of a stored credential. The egress proxy resolves it and injects the auth header at request time |
| `transform` | object | Flat key-value pairs of headers to inject into matching requests, e.g. `{"Authorization": "Bearer ..."}` |

`env` field: `object`, map of variable name to a literal `string` or a credential reference `{"credential": "credential-id"}`.

Pre-installed software (Ubuntu):

| Category | Pre-installed packages |
|----------|------------------------|
| UNIX tools | `curl`, `wget`, `git`, `rsync`, `unzip`, `ripgrep`, `fd-find`, `gawk`, `bc`, `tree`, `which`, `lsof`, `htop`, `jq`, `iproute2`, `procps`, `gcloud CLI` |
| Python 3.12 | `numpy`, `pandas`, `requests`, `google-genai`, `beautifulsoup4`, `pyyaml`, `ast-grep-cli` |
| Node.js 22 | `create-next-app`, `create-vite`, `typescript` |

Lifecycle:

| State | Behavior |
|-------|----------|
| Created | Provisioned when an interaction specifies `environment: "remote"` or a config object |
| Active | Running while an interaction is in progress |
| Idle | Auto-snapshot and stopped after 15 minutes of inactivity |
| Offline | Retained for 7 days since last active. Can be resumed by passing its ID |
| Deleted | Removed automatically after the 7-day TTL expires or upon manual deletion |

Resources: CPU 4 cores, Memory 16 GB (fixed per environment).

File endpoints behavior matrix:

| Request | `alt` | `recursive` | `extract` | `overwrite` | Response |
|---------|-------|-------------|-----------|-------------|----------|
| `GET /files` | (none) | (none) | - | - | JSON listing of root directory |
| `GET /files/{path}` (file) | (none) | - | - | - | JSON metadata for the file |
| `GET /files/{path}` (dir) | (none) | `false` | - | - | JSON listing of immediate children |
| `GET /files/{path}` (dir) | (none) | `true` | - | - | JSON listing of all descendants |
| `GET /files/{path}?alt=media` (file) | `media` | - | - | - | Raw file content |
| `GET /files/{path}?alt=media` (dir) | `media` | `false` | - | - | Tar archive of immediate files in directory |
| `GET /files/{path}?alt=media` (dir) | `media` | `true` | - | - | Tar archive of all files recursively |
| `GET /files?alt=media` | `media` | `false` | - | - | Tar archive of root-level files only |
| `PUT /files/{path}` (file) | - | - | `false` | `false` | Writes the file. Returns `409 Conflict` if it already exists |
| `PUT /files/{path}?overwrite=true` | - | - | `false` | `true` | Writes or overwrites the file |
| `PUT /files/{path}?extract=true` | - | - | `true` | `false` | Unpacks archive into destination directory. `409 Conflict` if any target file exists |
| `PUT /files/{path}?extract=true&overwrite=true` | - | - | `true` | `true` | Unpacks archive, replacing existing files |

File entry fields: `name`, `path` (relative to environment root), `type` (`FILE` or `DIRECTORY`), `size_bytes` (string, files only), `mime_type` (files only), `created`, `modified` (ISO 8601). List query parameter: `recursive` (boolean, default `false`).

## Notes

- Mounting: you can't set root (`/`) as target for a custom source; always specify a sub-directory. You can combine declarative sources with follow-up interactions that install packages or run setup scripts.
- Private sources: authenticate the source domain in `network`, via a stored credential (`{"domain": "github.com", "credential": "github-production"}`) or an inline `transform`. For private Git repositories use `Basic` authentication with a GitHub PAT, base64-encoding `x-oauth-basic:<PAT>`; for private Cloud Storage buckets use an OAuth 2.0 Bearer token (`gcloud auth print-access-token`).
- When an allowlist is set, only explicitly listed domains are permitted. A wildcard such as `*.example.com` does not match the root `example.com`, which must be added separately. Add `{"domain": "*"}` as a catch-all for unlisted domains (no injected headers). Setting `network` to `"disabled"` blocks all outbound access. Default (no `network`): unrestricted outbound access.
- `credential` and `transform` on the same rule: credential applied first, `transform` merges on top; an explicit `transform` header wins on key conflict.
- Refresh inline credentials by passing the existing `environment_id` with a new `network` configuration (`"environment": {"type": "remote", "environment_id": "<ID>", "network": {...}}`); the new rules fully replace the previous ones while the file system state is preserved. With a stored credential no refresh is needed (rotate via `PATCH`).
- Literal `env` values are written into the container as plaintext and readable by the agent; secrets belong in credentials (placeholder substitution by the egress proxy).
- Packages installed during an interaction persist when you reuse the same `environment_id`.
- REST uploads use the `/upload/` path prefix (`.../upload/v1beta/environments/{environment_id}/files/{path}`); a `PUT` without it returns `400`. Python and JavaScript clients add it. Archive format (`.tar` / `.tar.gz`) is detected from the payload. Resumable sessions: initiate with `?uploadType=resumable` plus `X-Upload-Content-Type` / `X-Upload-Content-Length`; chunk with `Content-Range`; non-final chunks return `308 Resume Incomplete`; set `extract` / `overwrite` on the initiating request.
- Overwrite defaults to `false`; existing destination returns `409 Conflict` (`"code": "aborted"`).
- Deprecated: the legacy `/files/environment-{id}:download` endpoint. Replace with `client.environments.files.download(environment=..., path="workspace")` (Python), `client.environments.files.download({...})` (JavaScript), or `GET /v1beta/environments/$ENV_ID/files?alt=media` (REST). The quickstart page still shows the legacy endpoint.
- Limitations: preview (features and schemas may change); provisioning takes up to ~5 seconds; expired or invalid environment ID returns `404 Not Found`; the agent reads text and image files only (binary support not yet available). Environment compute is not billed during preview.
- Hooks configuration (`.agents/hooks.json`) can be mounted as a source; see `hooks.md`.
- API surface: managed agents via the Interactions API, REST `v1beta/environments`. Java and Go tabs exist on the official page for the interaction examples.
- Distinct from other skills: anthropic-managed-agents has its own environments resource; this page is the Gemini API only. See also anthropic-agent-sdk, openai-agents, hermes-agent for other agent runtimes.
- Docs fetched 2026-10-16.

## Related

- [Credentials in managed agents](./credentials.md)
- [Hooks (managed agents)](./hooks.md)
- [Building managed agents](./custom-agents.md)
- [Managed agents quickstart](./quickstart.md)
- [Antigravity agent](./antigravity-agent.md)

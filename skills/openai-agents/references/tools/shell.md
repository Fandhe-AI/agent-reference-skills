# Shell

Hosted/local `shell` tool: runs terminal commands either in an OpenAI-hosted container managed by OpenAI or in a local runtime you host and execute yourself, via the Responses API. Successor to the retired `local_shell` tool.

## Signature / Usage

```bash
curl -L 'https://api.openai.com/v1/responses' \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-6-astra",
    "tools": [
      { "type": "shell", "environment": { "type": "container_auto" } }
    ],
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": [
          { "type": "input_text", "text": "Execute: ls -lah /mnt/data && python --version && node --version" }
        ]
      }
    ],
    "tool_choice": "auto"
  }'
```

Local shell mode: set the environment type to `local`, then execute each `shell_call` yourself and send `shell_call_output` back.

```bash
curl -L 'https://api.openai.com/v1/responses' \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-6-astra",
    "instructions": "The local bash shell environment is on Mac.",
    "input": "find me the largest pdf file in ~/Documents",
    "tools": [{ "type": "shell", "environment": { "type": "local" } }]
  }'
```

Shell runs are represented by paired output items (hosted and local use the same types): `shell_call` (commands requested by the model) and `shell_call_output` (command output and exit outcomes).

```json
{
  "type": "shell_call",
  "call_id": "call_9d14ac6f2b73485e91c0f4da6e1b27c8",
  "action": {
    "commands": ["ls -l"],
    "timeout_ms": 120000,
    "max_output_length": 4096
  },
  "status": "in_progress"
}
```

Reuse a container across requests: create it, then reference it with `container_reference`.

```bash
curl -L 'https://api.openai.com/v1/containers' \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "name": "analysis-container",
    "memory_limit": "1g",
    "expires_after": { "anchor": "last_active_at", "minutes": 20 }
  }'
```

```bash
curl -L 'https://api.openai.com/v1/responses' \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-6-astra",
    "tools": [
      {
        "type": "shell",
        "environment": {
          "type": "container_reference",
          "container_id": "cntr_08f3d96c87a585390069118b594f7481a088b16cda7d9415fe"
        }
      }
    ],
    "input": "List files in the container and show disk usage."
  }'
```

Attach skills to a container:

```bash
curl -L 'https://api.openai.com/v1/containers' \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "name": "skill-container",
    "skills": [
      { "type": "skill_reference", "skill_id": "skill_4db6f1a2c9e73508b41f9da06e2c7b5f" },
      { "type": "skill_reference", "skill_id": "openai-spreadsheets", "version": "latest" }
    ]
  }'
```

Enable network access with an allowlist:

```bash
curl -L 'https://api.openai.com/v1/responses' \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6-astra",
    "tool_choice": "required",
    "tools": [
      {
        "type": "shell",
        "environment": {
          "type": "container_auto",
          "network_policy": {
            "type": "allowlist",
            "allowed_domains": ["pypi.org", "files.pythonhosted.org", "github.com"]
          }
        }
      }
    ],
    "input": [
      {
        "role": "user",
        "content": "In the container, pip install httpx beautifulsoup4, fetch release pages, and write /mnt/data/release_digest.md."
      }
    ]
  }'
```

Delete a container when done:

```bash
curl -L -X DELETE 'https://api.openai.com/v1/containers/container_id' \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `environment.type` | `"container_auto"` \| `"container_reference"` \| `"local"` | `container_auto`: OpenAI provisions and manages a container for the request. `container_reference`: reuse an existing container (with `container_id`). `local`: your own runtime; you handle `shell_call_output` |
| `environment.container_id` | string | Container to reuse (with `container_reference`) |
| `environment.network_policy` | `{ "type": "allowlist", "allowed_domains": string[], "domain_secrets"?: [...] }` | Enables outbound network access for a hosted container |
| `domain_secrets[]` | `{ domain, name, value }` | Credential injected for an allowlisted domain; model and runtime see a placeholder name such as `$API_KEY` |
| Containers API `memory_limit` | string (e.g. `"1g"`) | Container memory limit |
| Containers API `expires_after` | `{ "anchor": "last_active_at", "minutes": number }` | Inactivity expiration |
| Containers API `skills[]` | `skill_reference` (`skill_id`, optional `version`) or `inline` (`name`, `description`, `source`: base64 zip) | Skills mounted into the container |
| `action.commands` | `string[]` | Commands to run |
| `action.timeout_ms` | `number` | Timeout hint |
| `action.max_output_length` | `number` | Output truncation length; include it in `shell_call_output` when present |
| `shell_call_output.output[].outcome` | `{ "type": "exit", "exit_code": number }` \| `{ "type": "timeout" }` | Command outcome |

## Notes

- Shell is available through the Responses API only (not Chat Completions). Always sandbox execution, allow or block specific commands where possible, and log tool activity for auditing.
- Hosted runtime: currently based on `Debian 12` (may change); default working directory `/mnt/data`, the supported path for user-downloadable artifacts; no interactive TTY sessions; commands don't run with `sudo`; services can run inside the container. Preinstalled: Python `3.11`, Node.js `22.16`, Java `17.0`, PHP `8.2`, Ruby `3.1`, Go `1.23`.
- Network access is off by default. An admin must configure the org allow list in the dashboard, and the request must also set `network_policy`. Precedence: the org allow list defines the full set of `allowed_domains`; the request-level `network_policy` further restricts access; requests fail if `allowed_domains` includes domains outside the org allow list. Allowlisting introduces risks such as prompt-injection-driven data exfiltration.
- `domain_secrets`: the auth-translation sidecar applies raw secret values only for approved destinations; raw values don't persist on API servers and don't appear in model-visible context.
- Multi-turn: reuse the container and pass `previous_response_id`.
- Skills are reusable, versioned bundles; the model decides at execution time whether to invoke them. See [Skills](./skills.md). To keep content ephemeral you can inline files in the request and mount inline skills.
- Data lifecycle: hosted containers (Hosted Shell and Code Interpreter) may write temporary state to ephemeral block storage; data is deleted when the container expires or is explicitly deleted. Artifacts under `/mnt/data` are retrieved with the same container/files APIs as code interpreter.
- Local mode: if migrating from the retired `local_shell` tool, update your request and handle `shell_call` and `shell_call_output` in your execution loop. With the Agents SDK you can pass your own shell executor implementation to the shell tool helper (`shellTool`).
- Errors: on timeout return a timeout outcome with partial captured output; preserve non-zero exit outputs; shell execution should be non-interactive.
- Risks: untrusted network content may carry prompt injection; allow only trusted, maintained domains; review commands and output in the response; verify residency and retention for third-party endpoints.
- Source: https://developers.openai.com/api/docs/guides/tools-shell (fetched 2026-11-14).

## Related

- [Local Shell](./local-shell.md)
- [Apply Patch](./apply-patch.md)
- [Skills](./skills.md)
- [Code Interpreter](./code-interpreter.md)

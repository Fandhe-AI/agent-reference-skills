<!-- source: https://code.claude.com/docs/en/devcontainer.md / last verified: 2026-08-07 -->

# Development containers

Run Claude Code inside a Dev Containers spec environment (VS Code, GitHub Codespaces, JetBrains) via the Claude Code Dev Container Feature, with persisted auth, organization-policy enforcement, egress restriction, and unattended (`--dangerously-skip-permissions`) operation.

## Signature / Usage

```json
// .devcontainer/devcontainer.json
{
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/anthropics/devcontainer-features/claude-code:1.0": {}
  },
  "mounts": ["source=claude-code-config,target=/home/node/.claude,type=volume"],
  "containerEnv": {
    "CLAUDE_CONFIG_DIR": "/home/node/.claude",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "DISABLE_AUTOUPDATER": "1"
  }
}
```

```dockerfile
# Organization managed-settings.json (highest-precedence, overrides ~/.claude and .claude/)
RUN mkdir -p /etc/claude-code
COPY managed-settings.json /etc/claude-code/managed-settings.json
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `ghcr.io/anthropics/devcontainer-features/claude-code` | dev container feature | Installs the `claude` CLI (and VS Code extension, in VS Code/Codespaces) |
| `mounts` + `CLAUDE_CONFIG_DIR` | devcontainer.json | Persists `~/.claude` (auth token, settings, session history) and `~/.claude.json` across rebuilds via a named volume |
| `/etc/claude-code/managed-settings.json` | Linux file | Highest-precedence settings tier; deliver via Dockerfile `COPY` for org policy engineers can't easily bypass by editing the repo |
| `containerEnv` | devcontainer.json | Sets env vars (e.g. telemetry opt-out, autoupdate disable) for every session in the container |
| `--dangerously-skip-permissions` | CLI flag | Rejected when launched as root; requires a non-root `remoteUser` |
| `init-firewall.sh` (reference container) | script | Blocks outbound traffic except required domains; needs `NET_ADMIN`/`NET_RAW` `runArgs` capabilities |

## Notes

- Under `--dangerously-skip-permissions`, a malicious project can exfiltrate anything reachable inside the container, including credentials in `~/.claude`; avoid mounting host secrets like `~/.ssh` or cloud credential files.
- Cloud-provider auth (Bedrock/Vertex/Foundry) uses env vars/workload identity passed via `containerEnv` rather than mounted host credential files.
- The Dev Container Feature always installs the latest Claude Code; to pin a version, install via `npm install -g @anthropic-ai/claude-code@X.Y.Z` in the Dockerfile and set `DISABLE_AUTOUPDATER`.
- A maintained reference container (CLI + firewall + persistent volumes) lives at `anthropics/claude-code/.devcontainer` as a working example, not a maintained base image.

## Related

- [headless.md](./headless.md)
- [cloud-environments.md](./cloud-environments.md)

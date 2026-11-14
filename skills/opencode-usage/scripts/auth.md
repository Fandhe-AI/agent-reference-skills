---
source: https://opencode.ai/docs/cli/providers/
---

# Auth

Manage provider credentials with `opencode auth` and connect through server environment variables.

## Signature / Usage

### List accounts

```bash
opencode auth list
```

```bash
opencode auth list --format json
```

### Log in

With no provider argument, the command opens an interactive provider picker.

```bash
opencode auth login
```

Select API-key entry explicitly.

```bash
opencode auth login anthropic --method key
```

Run without `--method` to see the available methods when a provider has more than one.

```bash
opencode auth login openai
```

### Switch / log out

```bash
opencode auth switch anthropic work
```

```bash
opencode auth logout anthropic work
```

### Export / import credentials

The file contains secrets.

Adapted (not in the official docs): the export runs under `umask 077` so the credentials file is readable only by you.

```bash
(umask 077; opencode auth export anthropic > credentials.json)
opencode auth import credentials.json
```

### Environment connection

For a one-off private server:

```bash
ANTHROPIC_API_KEY=sk-ant-... opencode --standalone
```

For the shared background server (stops a running service; the next OpenCode command starts it with the new value):

```bash
opencode service set env ANTHROPIC_API_KEY sk-ant-...
opencode auth list
```

Disconnect an environment connection:

```bash
opencode service unset env ANTHROPIC_API_KEY
```

### Ambient credential chains

```bash
gcloud auth application-default login
GOOGLE_CLOUD_PROJECT=my-project opencode
```

### Claude Agent

Source: https://opencode.ai/docs/claude-agent/

```bash
claude auth login
```

```bash
opencode service set env OPENCODE_CLAUDE_PATH /opt/claude/bin/claude
```

### Database path

```bash
opencode debug paths db
```

## Notes

- Adapted from the official docs: the export runs under `umask 077` so the credentials file is created with owner-only permissions.
- `opencode auth export` writes secrets in plain text to `credentials.json`; keep it out of version control and delete it after import.
- `opencode service set env ... sk-ant-...` places a secret on the command line (shell history). Use a placeholder or a secret manager in shared environments.
- API-key entry and provider forms require an interactive terminal. OAuth methods that ask you to paste an authorization code also require one.
- Environment connections appear in `auth list` with type `environment`; `auth logout` cannot remove them, so unset the variable to disconnect.
- Do not edit the SQLite database to manage credentials; use `/connect` or the `auth` commands.
- Claude Agent runs Claude Code on your machine; Claude Code itself is covered by the anthropic-claude-code skill.

## Related

- cli.md
- server.md
- https://opencode.ai/docs/cli/providers/

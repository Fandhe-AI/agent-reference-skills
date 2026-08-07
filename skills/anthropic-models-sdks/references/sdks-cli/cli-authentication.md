<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/cli/authentication / last verified: 2026-08-07 -->

# CLI authentication options

Authenticate the `ant` CLI with interactive login, API keys, named profiles, and Workload Identity Federation.

## Signature / Usage

```bash
# Interactive OAuth login
ant auth login

# Remote host without a browser
ant auth login --no-browser

# Bind to a specific workspace and skip the picker
ant auth login --workspace-id wrkspc_01...

# Named profile
ant auth login --profile <profile-name>

# Admin scope
ant auth login --profile admin --scope "org:admin"
ant auth print-credentials --profile admin --access-token

# API key via environment variable
export ANTHROPIC_API_KEY=sk-ant-api03-...

# Check status
ant auth status

# Switch workspaces
ant profile activate other-ws
ant --profile other-ws models list
ANTHROPIC_PROFILE=other-ws ant models list

# Manage profiles
ant profile list
ant profile get --profile other-ws
ant profile set workspace_id wrkspc_01... --profile other-ws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--no-browser` | flag | Print the authorize URL and paste the returned code back into the terminal |
| `--workspace-id` | string | Bind the login directly to a workspace, skipping the browser picker |
| `--profile` | string | Named profile to create/use; if it doesn't exist, a new one is created |
| `--scope` | string | Request a specific OAuth scope, e.g. `org:admin` |
| `--access-token` | flag | Print a bearer token for `Authorization` headers (used with `print-credentials`) |

`ant profile set` writable keys: `workspace_id`, `base_url`, `organization_id`, `scope`, `client_id`, `console_url`.

## Notes

- Login writes credentials to `credentials/<profile>.json`; the first login for a profile also creates `configs/<profile>.json` and sets it active. `ant auth logout` removes stored credentials (`--all` clears every profile).
- `org:admin` scope is granted only to organization members with admin, owner, or primary owner role, and grants organization-wide access ignoring any workspace binding.
- An interactive-login token is bound to a single workspace; use named profiles to work across multiple workspaces.
- If `ANTHROPIC_API_KEY` is set, it overrides every profile for `ant` commands.
- This is the CLI for the Claude API (platform.claude.com). It is a different product from the Claude Code CLI (see anthropic-claude-code).

## Related

- [CLI quickstart](./cli-quickstart.md)
- [Using the CLI](./cli-using.md)
- [CLI scripting and automation](./cli-scripting.md)

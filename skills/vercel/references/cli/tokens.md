# vercel tokens

Manage personal Vercel authentication tokens: list, create, and revoke access tokens for the Vercel API and CLI.

## Signature / Usage

```bash
vercel tokens [subcommand]
```

```bash
vercel tokens list --json
vercel tokens create "CI deploy"
vercel tokens create "Preview deploy bot" --project prj_abc123
vercel tokens revoke tok_abc123
```

## Options / Props

| Name | Description |
|------|-------------|
| `list` (default) `--json / --limit <NUMBER> / --next <CURSOR>` | List personal tokens. `--limit` default 20, range 1-100; `--next` shows the next page (with `--json` the cursor is in `pagination.next`) |
| `create <name> --json --project <PROJECT_ID>` | Create a token; plaintext value is printed once (with `--json` read `bearerToken`). `--project` scopes it to one project ID (forwarded to the API as-is; names are not resolved) |
| `revoke <id> --json -y, --yes` | Revoke a token by ID. In a terminal asks to confirm; `--yes` skips the prompt; with `--json` it revokes without asking |

## Notes

- Tokens are scoped to the user account, optionally to a single project. Treat them as secrets: store in a secret manager or env var, never commit.
- Creating tokens requires a classic personal access token; OAuth sessions from `vercel login` and project-scoped tokens (some `vcp_...` values) are rejected. Set `VERCEL_TOKEN` (or pass `--token`) to a classic token.
- Full-account token (no `--project`): authenticate with a token with the Full Account scope (a team-scoped token is rejected). Project-scoped token (`--project`): authenticate with a token scoped to the team that owns the project (a Full Account token is rejected).
- Earlier docs used `ls` / `add` / `rm` and `--format json`; the current official page documents `list` / `create` / `revoke` and `--json` (old aliases not confirmed).
- Source: https://vercel.com/docs/cli/tokens (fetched 2026-11-14)

## Related

- [global-options.md](./global-options.md)
- [login.md](./login.md)

# vercel teams

Manage teams: list, create, invite members, switch scope, inspect SAML/SSO, list or remove members, and check join-request status. `vercel switch` is a top-level alias for `vercel teams switch`.

## Signature / Usage

```bash
vercel teams list
vercel teams list --next 1584722256178
vercel teams create --slug acme --name "Acme Corp"
vercel teams invite abc@vercel.com xyz@vercel.com
vercel teams switch acme
vercel teams members --json
vercel teams members remove user@example.com
vercel teams sso --json
vercel teams request
vercel teams request user_abc123
```

## Options / Props

### list

| Name | Description |
|------|-------------|
| `--next` | Show the next page of results; pass the cursor the previous page prints |
| `--limit` | Teams per page (default 20, maximum 100) |
| `--json` | Output the result as JSON |

### create

| Name | Description |
|------|-------------|
| `--slug` | Team URL slug (e.g. `acme` for `vercel.com/acme`); required in non-interactive mode |
| `--name` | Team display name; required in non-interactive mode |

### members

| Name | Description |
|------|-------------|
| `--next` | Show the next page of results; pass the cursor the previous page prints |
| `--limit` | Members per page (default 20, maximum 100) |
| `--json` | Output the result as JSON |

### sso / request

| Name | Description |
|------|-------------|
| `--json` | Output the result as JSON |

## Notes

- Subcommands: `list`, `create`, `invite [email...]`, `switch [slug]`, `request [userId]`, `sso`, `members` (including `members remove <member>`). In non-interactive mode `invite` needs at least one email.
- `members remove <member>` takes an email, username, or user ID, then asks for confirmation; no option skips the prompt, so run it in an interactive terminal. If the team's invoices go to that member, you are first asked for a new invoice recipient.
- `switch` does not accept the global `--token` flag; use `--scope` to override scope for a single command.
- Earlier docs used `add`, `--format json`, and `-N`; the current official page documents `create`, `--json`, and `--next` (aliases not confirmed).
- Source: https://vercel.com/docs/cli/teams (fetched 2026-11-14)

## Related

- [switch.md](./switch.md)
- [whoami.md](./whoami.md)

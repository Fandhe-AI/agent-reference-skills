# vercel teams

Manage teams: list, create, invite members, switch scope, inspect SAML/SSO, list members, and check join-request status. Aliases: `vercel team`, `vercel switch`.

## Signature / Usage

```bash
vercel teams list
vercel teams add --slug acme --name "Acme Corp"
vercel teams invite abc@vercel.com xyz@vercel.com
vercel teams switch acme
vercel teams members --format json
vercel teams sso
vercel teams request
```

## Options / Props

### list

| Name | Description |
|------|-------------|
| `-N, --next` | Next page cursor (ms since UNIX epoch) |
| `--format` | `json` output |

### add

| Name | Description |
|------|-------------|
| `--slug` | Team URL slug; required in non-interactive mode |
| `--name` | Team display name; required in non-interactive mode |

### members

| Name | Description |
|------|-------------|
| `-N, --next` | Next page cursor |
| `--format` | `json` output |

### sso / request

| Name | Description |
|------|-------------|
| `--format` | `json` output |

## Notes

- Subcommands: `list` / `ls`, `add` / `create`, `invite`, `switch` / `change`, `request` / `access-request`, `sso`, `members` / `member`
- `vercel switch [team-name]` is a top-level alias for `vercel teams switch`

## Related

- [switch.md](./switch.md)
- [whoami.md](./whoami.md)

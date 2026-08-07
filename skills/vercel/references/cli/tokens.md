# vercel tokens

Manage personal Vercel authentication tokens: list, create, and remove access tokens for the Vercel API and CLI.

## Signature / Usage

```bash
vercel tokens ls --format json
vercel tokens add "CI deploy"
vercel tokens add "Preview deploy bot" --project prj_abc123
vercel tokens rm tok_abc123
```

## Options / Props

| Name | Description |
|------|-------------|
| `list` (alias `ls`, default) `-F, --format / --limit` | List personal tokens (default limit 20, range 1-100) |
| `add <name> --project` (alias `create`) | Create a token; plaintext value is printed once. Optionally scope to a single project ID |
| `remove <id>` (alias `rm`, `delete`) | Revoke a token by ID |

## Notes

- Tokens are scoped to the user account, optionally to a single project
- Creating tokens requires a classic personal access token with account-level scope; OAuth sessions from `vercel login` and team/project-only tokens cannot mint new tokens

## Related

- [global-options.md](./global-options.md)
- [login.md](./login.md)

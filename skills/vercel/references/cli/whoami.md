# vercel whoami

Display the username of the currently logged-in Vercel user.

## Signature / Usage

```bash
vercel whoami
vercel whoami --json
vercel whoami --cached
```

## Options / Props

| Name | Description |
|------|-------------|
| `--json` | Output account details as JSON: `username`, `email`, `name`, and `team` (the active team with `id`, `slug`, `name`, `plan`) |
| `--cached` | Print the username saved at the last lookup without contacting Vercel; no active team shown. Falls back to asking Vercel if none is saved. Available in Vercel CLI 65.0.0 and later |

## Notes

- In a terminal the command also shows the active team and its plan. When output is piped or redirected, only the username is printed. If not logged in, it exits with code `1`.
- The `--cached` username can be out of date; run `vercel whoami` without it to confirm the login still works.
- Source: https://vercel.com/docs/cli/whoami (fetched 2026-11-14)

## Related

- [login.md](./login.md)
- [logout.md](./logout.md)
- [teams.md](./teams.md)

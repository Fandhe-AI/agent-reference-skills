# vercel signup

Create a new Vercel account through Vercel CLI. After sign-up completes, you are signed in to the CLI with the new account.

## Signature / Usage

```bash
vercel signup
vercel signup --email user@example.com
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--email` | String | Email address for the new account, so the command does not ask for it. Required when the CLI cannot prompt (e.g. a coding agent runs the command) |

## Notes

- If you already have a Vercel account, use `vercel login` instead.
- The command asks for your email address, then opens the sign-up page in your browser, where you create the account with that email.
- Run `vercel whoami` to confirm the account you are signed in as.
- Source: https://vercel.com/docs/cli/signup (fetched 2026-11-14)

## Related

- [login.md](./login.md)
- [logout.md](./logout.md)
- [whoami.md](./whoami.md)
- [global-options.md](./global-options.md)

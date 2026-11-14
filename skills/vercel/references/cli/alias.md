# vercel alias

Apply custom domain aliases to Vercel deployments.

## Signature / Usage

```bash
vercel alias set [deployment-url] [custom-domain]
vercel alias rm [custom-domain]
vercel alias ls
vercel alias ls --limit 100
vercel alias list --next 1234567890123
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--yes` | | Skip confirmation prompt when removing an alias |
| `--limit` | | Max aliases returned by `ls` (default: 20, max: 100) |
| `--next` | | Show the next page of aliases for `ls`; the output prints the command with the value to pass |

## Notes

- Do NOT include `https://` in the `[custom-domain]` argument
- For production promotion, prefer `vercel promote` or `vercel rollback` instead
- Use `vercel --prod --skip-domain` to create a staged production deployment without domain assignment

### Troubleshooting alias conflicts

- Errors such as `The chosen alias <xyz>.vercel.app is already in use.` or `To move the domain, remove existing aliases associated with <domain>.` mean the alias is owned elsewhere. Check which team owns it by listing aliases per team (`vercel switch` or an explicit scope):

```bash
vercel alias list --scope your_team_slug --limit 100
```

- The default limit is 20, so a missing alias in the list is not proof it is available; use `--next` to page. If you own the conflicting alias, remove it in its owning scope and review the confirmation prompt:

```bash
vercel alias remove your-project.vercel.app --scope your_team_slug
```

- Removing an alias stops that hostname serving its deployment; the deployment need not be deleted. For a domain owned by an inaccessible account see "claiming domain ownership" in the Vercel docs; a team's `vercel.app` alias cannot be claimed via DNS verification
- Branch-specific domains need a deployment associated with the Git branch; for CLI deployments check the Git metadata, especially in CI or detached checkouts
- Source: https://vercel.com/docs/cli/alias (fetched 2026-11-14)

## Related

- [deploy.md](./deploy.md)
- [promote.md](./promote.md)
- [rollback.md](./rollback.md)
- [domains.md](./domains.md)

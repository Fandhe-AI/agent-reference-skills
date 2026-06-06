# vercel alias

Apply custom domain aliases to Vercel deployments.

## Signature / Usage

```bash
vercel alias set [deployment-url] [custom-domain]
vercel alias rm [custom-domain]
vercel alias ls
vercel alias ls --limit 100
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--yes` | | Skip confirmation prompt when removing an alias |
| `--limit` | | Max aliases returned by `ls` (default: 20, max: 100) |

## Notes

- Do NOT include `https://` in the `[custom-domain]` argument
- For production promotion, prefer `vercel promote` or `vercel rollback` instead
- Use `vercel --prod --skip-domain` to create a staged production deployment without domain assignment

## Related

- [deploy.md](./deploy.md)
- [promote.md](./promote.md)
- [rollback.md](./rollback.md)
- [domains.md](./domains.md)

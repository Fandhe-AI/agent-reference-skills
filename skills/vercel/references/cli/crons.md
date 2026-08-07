# vercel crons

Manage Cron Jobs from the Vercel CLI: add cron entries to `vercel.json`, list them, and trigger them on demand. Beta command (alias `vercel cron`).

## Signature / Usage

```bash
vercel crons add --path /api/cron --schedule "0 10 * * *"
vercel crons ls --format json
vercel crons run /api/cron
```

## Options / Props

| Name | Description |
|------|-------------|
| `add --path / --schedule` | Add a cron job to `vercel.json` (prompts interactively without flags) |
| `list` (alias `ls`) `-F, --format json` | List configured cron jobs; default subcommand |
| `run [path]` | Trigger a deployed cron job immediately by API path |

## Notes

- `vercel crons` with no subcommand runs `list`
- `run` reads cron definitions from the deployed project, not local `vercel.json`; deploy first with `vercel deploy --prod`

## Related

- [deploy.md](./deploy.md)

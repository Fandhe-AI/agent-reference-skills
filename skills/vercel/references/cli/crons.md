# vercel crons

Manage Cron Jobs from the Vercel CLI: add cron entries to `vercel.json`, list them, and trigger them on demand. Beta command.

## Signature / Usage

```bash
vercel crons add --path /api/cron --schedule "0 10 * * *"
vercel crons list --json
vercel crons run /api/cron
```

## Options / Props

| Name | Description |
|------|-------------|
| `add --path <PATH> / --schedule <EXPRESSION>` | Add a cron job to `vercel.json` (prompts interactively without flags); `--path` must start with `/` |
| `list --json / -p, --project <NAME_OR_ID>` | List configured cron jobs; default subcommand. `--json` for machine-readable output; `--project` defaults to the linked project |
| `run [path] -p, --project <NAME_OR_ID>` | Trigger a deployed cron job immediately by API path (interactive selection when omitted); `--project` defaults to the linked project |

## Notes

- `vercel crons` with no subcommand runs `list`
- `run` reads cron definitions from the deployed project, not local `vercel.json`; deploy first with `vercel deploy --prod`
- The official page marks Cron Jobs as a legacy feature that will be migrated to Schedules, and states `vercel crons` is in beta (tagged `[beta]` in `vercel --help`)
- Not confirmed in the current official page: the `ls` alias, the `vercel cron` alias, and `-F, --format json` (the page documents `--json`)
- Source: https://vercel.com/docs/cli/crons (fetched 2026-11-14)

## Related

- [deploy.md](./deploy.md)

# vercel rolling-release

Manage rolling releases to gradually roll out new deployments to a fraction of users. Alias: `vercel rr`.

## Signature / Usage

```bash
vercel rolling-release update --enable --advancement-type=automatic --stage=10,5m
vercel rolling-release update --enable --advancement-type=manual-approval --stage=10 --stage=50
vercel rolling-release update --no-enable
vercel rolling-release start --deployment=dpl_123abc456def
vercel rolling-release approve --deployment=dpl_abc --currentStageIndex=0
vercel rolling-release abort --deployment=dpl_previous
vercel rolling-release complete --deployment=dpl_abc
vercel rolling-release inspect --project my-app
```

## Options / Props

### update

| Name | Description |
|------|-------------|
| `--enable` | Enable rolling releases for the project |
| `--no-enable` | Disable rolling releases for the project |
| `--advancement-type` | How stages advance: `automatic` or `manual-approval`; required with `--enable` |
| `--stage` | Rollout stage as `PERCENTAGE[,DURATION]` (repeatable; e.g. `10,5m`); 1–99% per stage; `DURATION` is required with `automatic` and not allowed with `manual-approval`; 100% added automatically |
| `--cfg` | Raw JSON configuration (advanced/legacy; takes priority over other flags); legacy `--cfg='disable'` also disables |

### start / approve / abort / complete

| Name | Description |
|------|-------------|
| `--deployment` | Deployment ID or URL to target (required for `start`, `approve`, `abort`, `complete`) |
| `--yes` | Skip confirmation prompt (documented for `start`) |
| `--currentStageIndex` | Current stage index to approve (required for `approve`) |

### All subcommands

| Name | Description |
|------|-------------|
| `--project` | Project name or ID to manage; defaults to the project linked to the current directory |

## Notes

- Rolling Releases are offered on Pro and Enterprise; Pro teams can use them for one project
- `abort` rolls back to the deployment passed to `--deployment`: pass the previous production deployment, not the one being rolled out
- `start` and `complete` call `POST /v1/projects/{idOrName}/rolling-release/start` and `.../complete`; `start` is idempotent

- Subcommands: `update`, `start`, `approve`, `abort`, `complete`, `inspect` (`fetch` is a deprecated alias)
- `inspect` shows details about the current rolling release; `fetch` remains a supported alias but prints a deprecation warning (use `inspect` for new commands)
- `automatic` advancement uses time-based stages; `manual-approval` requires explicit approval between stages
- Final 100% stage is added automatically
- The earlier `configure`, `--dpl`, and `--disable` names are not in the current official page; it documents `update`, `--deployment`, and `--no-enable`
- Source: https://vercel.com/docs/cli/rolling-release (fetched 2026-11-14)

## Related

- [deploy.md](./deploy.md)
- [promote.md](./promote.md)

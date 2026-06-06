# vercel rolling-release

Manage rolling releases to gradually roll out new deployments to a fraction of users. Alias: `vercel rr`.

## Signature / Usage

```bash
vercel rolling-release configure --enable --advancement-type=automatic --stage=10,5m
vercel rolling-release configure --enable --advancement-type=manual-approval --stage=10 --stage=50
vercel rolling-release configure --disable
vercel rr start --dpl=dpl_123abc456def
vercel rr approve --dpl=dpl_abc --currentStageIndex=0
vercel rr abort --dpl=dpl_abc
vercel rr complete --dpl=dpl_abc
vercel rr fetch
```

## Options / Props

### configure

| Name | Description |
|------|-------------|
| `--enable` | Enable rolling releases for the project |
| `--disable` | Disable rolling releases for the project |
| `--advancement-type` | How stages advance: `automatic` or `manual-approval`; required with `--enable` |
| `--stage` | Rollout stage as `PERCENTAGE[,DURATION]` (repeatable; e.g. `10,5m`); 1–99% per stage; 100% added automatically |
| `--cfg` | Raw JSON configuration (advanced/legacy; takes priority over other flags) |

### start / approve / abort / complete

| Name | Description |
|------|-------------|
| `--dpl` | Deployment ID or URL to target (required for `start`, `approve`, `abort`, `complete`) |
| `--yes` | Skip confirmation prompt |
| `--currentStageIndex` | Current stage index to approve (required for `approve`) |

## Notes

- Subcommands: `configure`, `start`, `approve`, `abort`, `complete`, `fetch`
- `automatic` advancement uses time-based stages; `manual-approval` requires explicit approval between stages
- Final 100% stage is added automatically

## Related

- [deploy.md](./deploy.md)
- [promote.md](./promote.md)

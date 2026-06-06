# Rolling Release Deployment

Step-by-step guide for performing a rolling release deployment using the Vercel CLI: configure stages, deploy, start the release, monitor, advance or abort, and complete.

> Requires a linked Vercel project (`vercel link`) and Pro or Enterprise plan.

## Signature / Usage

```bash
# Full command sequence (quick reference)
vercel rolling-release configure --cfg '{"enabled":true,"advancementType":"automatic","stages":[{"targetPercentage":10,"duration":5},{"targetPercentage":50,"duration":10},{"targetPercentage":100}]}'
vercel deploy --prod
vercel rolling-release start --dpl <deployment-url>
vercel rolling-release fetch
vercel rolling-release approve --dpl <deployment-url> --currentStageIndex 0
vercel rolling-release complete --dpl <deployment-url>
# On errors:
vercel rolling-release abort --dpl <deployment-url>
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `vercel rolling-release configure --cfg '<json>'` | Set or update rolling release stage configuration |
| `vercel rolling-release configure --cfg 'disable'` | Disable rolling releases for the project |
| `vercel rolling-release start --dpl <url>` | Start the rolling release for a deployment |
| `vercel rolling-release fetch` | Get current rolling release status and traffic split |
| `vercel rolling-release approve --dpl <url> --currentStageIndex <n>` | Advance to next stage (manual approval mode; stage index starts at 0) |
| `vercel rolling-release complete --dpl <url>` | Promote canary to 100% and end rolling release |
| `vercel rolling-release abort --dpl <url>` | Abort rolling release; revert all traffic to base deployment |
| `vercel logs --environment production --level error --since 5m` | Monitor production error logs during rollout |

## Workflow Steps

| Step | Action |
|------|--------|
| 1 | Configure stages with `vercel rolling-release configure` |
| 2 | Deploy to production with `vercel deploy --prod` |
| 3 | Start the release with `vercel rolling-release start --dpl <url>` |
| 4 | Monitor traffic and errors with `vercel rolling-release fetch` + `vercel logs` |
| 5 | Advance stages (auto or `vercel rolling-release approve`) |
| 6 | Complete with `vercel rolling-release complete --dpl <url>` |
| On error | Abort with `vercel rolling-release abort --dpl <url>` |

## Notes

- After aborting, investigate logs before attempting another rollout: `vercel logs --environment production --level error --since 30m --expand`.
- `--currentStageIndex` starts at `0`; increment by 1 for each subsequent manual approval.
- Automatic stages advance based on `duration` (in minutes); manual stages require explicit `approve` calls.

## Related

- [rolling-releases.md](./rolling-releases.md)
- [instant-rollback.md](./instant-rollback.md)

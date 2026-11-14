# Rolling Release Deployment

Step-by-step guide for performing a rolling release deployment using the Vercel CLI: configure stages, deploy, start the release, monitor, advance or abort, and complete.

> Requires a linked Vercel project (`vercel link`) and Pro or Enterprise plan.

## Signature / Usage

```bash
# Full command sequence (quick reference)
# 1. Configure rolling release stages
vercel rolling-release update --cfg '{"enabled":true,"advancementType":"automatic","stages":[{"targetPercentage":10,"duration":5},{"targetPercentage":50,"duration":10},{"targetPercentage":100}]}'

# 2. Deploy to production (starts the rolling release automatically if the project auto-assigns custom domains)
vercel deploy --prod

# 3. Start the rolling release (idempotent if step 2 already started it)
vercel rolling-release start --deployment <deployment-url>

# 4. Monitor the release
vercel rolling-release inspect
vercel logs --environment production --query 'level:error' --since 5m

# 5. Advance to the next stage (if manual approval is configured)
vercel rolling-release approve --deployment <deployment-url> --currentStageIndex 0

# IF errors spike during the release (pass the previous production deployment, not the new one).
# The first command in step 4 lists that deployment as currentDeployment:
vercel rolling-release abort --deployment <previous-production-deployment-url>

# 6. Complete the release (100% traffic)
vercel rolling-release complete --deployment <deployment-url>
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `vercel rolling-release update --cfg '<json>'` | Set or update rolling release stage configuration |
| `vercel rolling-release update --no-enable` | Disable rolling releases for the project |
| `vercel rolling-release start --deployment <url>` | Start the rolling release for a deployment (idempotent) |
| `vercel rolling-release inspect` | Get current rolling release status and traffic split (`fetch` is a deprecated alias) |
| `vercel rolling-release approve --deployment <url> --currentStageIndex <n>` | Advance to next stage (manual approval mode; stage index starts at 0) |
| `vercel rolling-release complete --deployment <url>` | Promote canary to 100% and end rolling release |
| `vercel rolling-release abort --deployment <previous-production-url>` | Abort rolling release; revert all traffic to the previous production deployment |
| `vercel logs --environment production --query 'level:error' --since 5m` | Monitor production error logs during rollout |

## Workflow Steps

| Step | Action |
|------|--------|
| 1 | Configure stages with `vercel rolling-release update` |
| 2 | Deploy to production with `vercel deploy --prod` and save the deployment URL |
| 3 | Start the release with `vercel rolling-release start --deployment <url>` |
| 4 | Monitor traffic and errors with `vercel rolling-release inspect` + `vercel logs` |
| 5 | Advance stages (auto or `vercel rolling-release approve`) |
| 6 | Complete with `vercel rolling-release complete --deployment <url>` |
| On error | Abort with `vercel rolling-release abort --deployment <previous-production-url>` |

## Notes

- The first stage in the example configuration sends 10% of traffic for five minutes, then 50% for 10 minutes, then 100%.
- Abort reverts traffic to the previous production deployment, so the abort command takes that deployment, not the new deployment saved in step 2. Run `vercel rolling-release inspect` again: the output lists the previous production deployment as `currentDeployment` and the new one as `canaryDeployment`; copy the `url` of `currentDeployment`.
- After aborting, investigate logs before attempting another rollout: `vercel logs --environment production --query 'level:error' --since 30m`. To filter for specific patterns: `--query 'level:error AND TypeError'`.
- `--currentStageIndex` starts at `0`; increment by 1 for each subsequent manual approval.
- Automatic stages advance based on `duration` (in minutes); manual stages require explicit `approve` calls.
- To send 100% of traffic to the canary, run `vercel rolling-release complete`; do not use `vercel promote` for start or complete steps in automation (see [rolling-releases.md](./rolling-releases.md)).
- Superseded forms: older versions of this page used `vercel rolling-release configure`, `--dpl`, `fetch`, and `vercel logs --level error --expand`; the current official page uses `update`, `--deployment`, `inspect`, and `--query`. Whether the old forms still work is not confirmed in official docs.
- Source: https://vercel.com/docs/rolling-releases/rolling-release-deployment (fetched 2026-11-14)

## Related

- [rolling-releases.md](./rolling-releases.md)
- [instant-rollback.md](./instant-rollback.md)

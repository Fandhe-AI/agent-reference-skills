# Instant Rollback

Instant Rollback reverts your production domain(s) to a previous deployment without rebuilding. It is designed for swift recovery from production incidents like breaking changes or bugs.

## Signature / Usage

```bash
# Undo a rollback / promote a different deployment (CLI)
vercel promote [deployment-id-or-url]
```

## How to Perform an Instant Rollback (Dashboard)

1. On the **Project Overview** page, click **Instant Rollback** on the Production Deployment tile.
2. Select the deployment to roll back to. (Pro/Enterprise: click **Choose another deployment** for all eligible deployments.)
3. Verify rollback details: affected domains, environment variable state, and external service implications.
4. Click **Confirm Rollback**.

Alternatively: **Deployments** sidebar → find deployment → ellipsis (⋮) → **Instant Rollback**.

## Eligible Deployments

| Plan | Eligibility |
|------|-------------|
| Hobby | Previous deployment only |
| Pro | Any deployment previously aliased to a production domain |
| Enterprise | Any deployment previously aliased to a production domain |

Preview deployments that were never aliased to production are not eligible.

## Plan Access

| Plan | Who Can Roll Back |
|------|------------------|
| Hobby | Team owner |
| Pro | Owners and Members |
| Enterprise | Owners and Members |

## Behavior During Rollback

| Aspect | Behavior |
|--------|----------|
| Domain assignment | Instantly pointed to the rolled-back deployment |
| Environment variables | Reverted to the state of the rolled-back deployment (not updated by current settings) |
| Cron jobs | Reverted to the state of the rolled-back deployment |
| Auto-assignment of production domains | Disabled after rollback (new pushes to production branch do not go live automatically) |
| Custom aliases | Not included unless they were set on the previous production deployment |

## Undo a Rollback

**Dashboard:** Project Overview → **Undo Rollback** button → select deployment → **Confirm**.

**CLI:**
```bash
vercel promote [deployment-id-or-url]
```

Undoing restores auto-assignment of production domains so new pushes go live again.

## Notes

- Rollback happens instantaneously — no rebuild is performed.
- After rollback, the rolled-back deployment is shown as the current production deployment with canceled/rolled-back commits highlighted.
- Configuration used by the rolled-back deployment may be stale relative to current project settings.
- Deleting an eligible deployment removes it from the rollback candidates list.
- Rollback, investigate, redeploy-fix flow (docs guide "Rolling back a production deployment", last_updated 2026-09-11): confirm the problem with `vercel logs`; roll back with `vercel rollback <previous-deployment-url-or-id>` and verify with `vercel rollback status`; identify the bad deployment with `vercel list --prod` and `vercel inspect <url>` (`--logs` for build logs); compare error logs between good and bad deployments; if the cause spans several deployments, binary-search with `vercel bisect --good <url> --bad <url>` (optionally `--run ./test.sh`; exit 0 = good, non-zero = bad, 125 = skip); fix and deploy a preview (`vercel deploy`, check with `vercel curl /route --deployment <preview-url>`); ship with `vercel deploy --prod`. Alternative to redeploying: `vercel promote <deployment-url>` and `vercel promote status`.
- Note: the guide's example `vercel logs` flags (`--status-code`, `--level`, `--expand`) are the pre-v64 forms; in Vercel CLI v64+ use `--query` (see [../cli/logs.md](../cli/logs.md))

## Related

- [promoting-deployments.md](./promoting-deployments.md)
- [rolling-releases.md](./rolling-releases.md)
- [managing-deployments.md](./managing-deployments.md)

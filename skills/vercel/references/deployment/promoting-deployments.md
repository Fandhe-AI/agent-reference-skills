# Promoting Deployments

Promoting a deployment means assigning your production domain(s) to a different deployment. Vercel supports three promotion approaches: Instant Rollback, promote preview to production, and staged production promotion.

## Signature / Usage

```bash
# Promote a deployment via CLI
vercel promote [deployment-id-or-url]
```

## Promotion Methods

| Method | When to Use | Triggers Rebuild | Environment Variables |
|--------|-------------|-----------------|----------------------|
| Instant Rollback | Revert to a previous production deployment quickly | No | Reverted to old state |
| Promote preview to production | Promote a preview build to production | Yes (rebuild with production env vars) | Switches to production vars |
| Staged production promotion | Promote a production build that was never auto-assigned | No | Already production vars |

## Production Deployment States

| State | Description |
|-------|-------------|
| Staged | Commit pushed to production branch, but domain not auto-assigned |
| Promoted | Manually promoted from staging (cannot be promoted again; use rollback to revert) |
| Current | Aliased to production domain; currently served to users |

## Promoting Preview to Production (Dashboard)

1. Go to **Project → Deployments** in the sidebar.
2. Click the ellipsis (…) next to the preview deployment.
3. Select **Promote to Production**.
4. Review the domains that will be linked, then confirm.

## Staged Production Workflow (Dashboard)

1. **Project Settings → Environments → Production → Branch Tracking**.
2. Disable **Auto-assign Custom Production Domains**.
3. Deploy as normal (commits go to Staged state).
4. When ready, Deployments → ellipsis (…) → **Promote** → confirm.

## Notes

- If preview and production environment variables differ, promoting from preview to production switches to production vars; preview vars cannot be used in production.
- After an Instant Rollback, auto-assignment of production domains is disabled. Undo with the **Manage** button on the production deployment tile (dashboard) or `vercel promote`.
- A deployment that was previously promoted cannot be promoted again; roll back to it instead.
- Staged promotion does not trigger a rebuild; it instantly points the domain to the existing build. For the CLI workflow see the staged production build section of the Vercel CLI deploying guide.
- Promotions and rollbacks run one at a time: promoting or rolling back reassigns production domains in a background job, and only one such job runs per project at a time. A new promotion supersedes one still in progress, a new rollback is rejected until the current job finishes, and a job not finished within 3 minutes is treated as stale (details in [instant-rollback.md](./instant-rollback.md)).
- Source: https://vercel.com/docs/deployments/promoting-a-deployment (fetched 2026-11-14)

## Related

- [instant-rollback.md](./instant-rollback.md)
- [managing-deployments.md](./managing-deployments.md)
- [environments.md](./environments.md)

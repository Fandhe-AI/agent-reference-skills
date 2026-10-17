# Deployment Retention

Configured policies that determine how long each type of deployment is kept before automatic deletion. Available on all plans.

## Signature / Usage

```bash
vercel list [project-name] [--policy errored=6m]
```

Configure in the dashboard: project **Settings** > **Security** > **Deployment Retention Policy**, pick the duration, save.

## Default retention periods

Unless a team or project uses a custom policy:

| Plan | Canceled | Errored | Pre-Production | Production |
| --- | --- | --- | --- | --- |
| Hobby | 30 days | 30 days | 30 days | 30 days |
| Pro and Enterprise | 30 days | 90 days | 180 days | 1 year |

Configurable states: canceled, errored, preview, production.

## Exceptions to the retention policy

Plan-dependent recent-deployment exceptions:

| Exception | Hobby | Pro and Enterprise |
| --- | --- | --- |
| Last deployments created in the project | Last 3 | Last 10 |
| Production deployments in state Ready | Last 3 | Last 20 |
| Non-production deployments in state Ready | Not applied | Last 20 |

Exceptions on every plan:

- The deployment has a production alias assigned.
- The deployment is the target of a branch alias for a custom environment.
- The deployment is non-production and has any custom alias assigned.
- The deployment is the latest preview deployment of a Git branch that is still active (branch not deleted, PR not merged or closed).

## Restoring a deleted deployment

Project **Settings** > **Security** > **Recently Deleted** > dropdown **Restore** on the deployment, then complete the modal.

## Notes

- A team policy can replace the defaults for new projects or all existing projects; a project policy applies only to that project and replaces the team default.
- After the retention limit, a background job typically marks the deployment for deletion within 48 hours. Deployments protected by an exception when first evaluated are re-evaluated after the exception ends, which can take up to 30 days.
- Expired deployments enter a recovery period and return HTTP 410. Recovery is 30 days for successfully built deployments; unsuccessful deployments may be garbage collected sooner.
- Retained deployment output counts toward Deployment Storage.
- The "Pro and Enterprise" row above reflects the docs table (last updated 2026-09-16), i.e. the defaults before 2026-10-09.
- Changelog 2026-10-09 (newer than this docs table): new Pro teams default to a 30-day deployment retention period (a longer period can be chosen in team settings); for existing Pro teams the retention window also changes to 30 days, and deployments older than 30 days are deleted starting October 23 unless you opt out in retention settings (settings already at 30 days or shorter are unchanged). The changelog does not mention Enterprise. Sources: https://vercel.com/changelog/new-pro-teams-now-default-to-30-day-deployment-retention , https://vercel.com/changelog/deployment-storage-pricing-expands-to-existing-teams
- Error reference: https://vercel.com/docs/errors/deployment_deleted
- Source: https://vercel.com/docs/deployment-retention

## Related

- [deployment-storage.md](./deployment-storage.md)
- [deployment-policy.md](./deployment-policy.md)
- [managing-deployments.md](./managing-deployments.md)
- [instant-rollback.md](./instant-rollback.md)

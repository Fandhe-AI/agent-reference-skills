# Deployment Retention

Configured policies that determine how long each type of deployment is kept before automatic deletion. Available on all plans.

## Signature / Usage

```bash
vercel list [project-name] [--policy errored=6m]
```

Configure in the dashboard: project **Settings** > **Build and Deployment** > **Deployment Retention Policy**, pick the duration, save. Team policy: team **Settings** > **Build and Deployment** > **Deployment Retention Policy** (apply to new projects or all existing projects).

## Default retention periods

Unless a team or project uses a custom policy:

| Plan | Canceled | Errored | Pre-Production | Production |
| --- | --- | --- | --- | --- |
| Hobby and Pro | 30 days | 30 days | 30 days | 30 days |
| Enterprise | 30 days | 90 days | 180 days | 1 year |

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
- The deployment is the latest deployment in state Ready for a Git branch that has a domain assigned to it.
- The deployment is non-production and has any custom alias assigned.
- The deployment is the latest preview deployment of a Git branch that is still active (branch not deleted and it has an open pull request; a branch that never had a PR, or whose PR was merged or closed, is not active).

## Restoring a deleted deployment

Project **Settings** > **Security** > **Recently Deleted Deployments** > dropdown **Restore** on the deployment, then complete the modal.

## Notes

- A team policy can replace the defaults for new projects or all existing projects; a project policy applies only to that project and replaces the team default.
- After the retention limit, a background job typically marks the deployment for deletion within 48 hours. Deployments protected by an exception when first evaluated are re-evaluated after the exception ends, which can take up to 30 days.
- Expired deployments enter a recovery period and return HTTP 410; restoring is possible until the recovery period ends, after which resources are permanently removed. Recovery is 30 days from deletion for deployments deleted at 30 days of age or older. For deployments deleted before reaching 30 days of age the period is shorter: a retention policy under 30 days gives a recovery period equal to the policy (7-day policy gives 7 days), and a manual deletion gives a period based on the deployment's age, with a minimum of 1 day. These periods apply to successfully built deployments; unsuccessful deployments may be garbage collected sooner.
- Retained deployment output counts toward Deployment Storage.
- The defaults table follows the docs page fetched 2026-11-14 (Hobby and Pro: 30 days for every state; Enterprise: 30 / 90 / 180 days / 1 year). This supersedes the earlier "Pro and Enterprise" row; the changelog of 2026-10-09 (https://vercel.com/changelog/new-pro-teams-now-default-to-30-day-deployment-retention) describes the Pro change to 30 days.
- Error reference: https://vercel.com/docs/errors/deployment_deleted
- Source: https://vercel.com/docs/deployment-retention (fetched 2026-11-14)

## Related

- [deployment-storage.md](./deployment-storage.md)
- [deployment-policy.md](./deployment-policy.md)
- [managing-deployments.md](./managing-deployments.md)
- [instant-rollback.md](./instant-rollback.md)

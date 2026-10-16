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
- Error reference: `/docs/errors/deployment_deleted`.

## Related

- [deployment-storage.md](./deployment-storage.md)
- [deployment-policy.md](./deployment-policy.md)
- [managing-deployments.md](./managing-deployments.md)
- [instant-rollback.md](./instant-rollback.md)

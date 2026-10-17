# Managing Deployments

All current and past deployments are accessible from the Vercel Dashboard regardless of environment, status, or branch. Vercel CLI and the REST API provide programmatic alternatives.

## Signature / Usage

```bash
# Delete a deployment via REST API
curl --request DELETE \
  --url https://api.vercel.com/v13/deployments/<deployment-id> \
  --header "Authorization: Bearer $VERCEL_TOKEN"
```

```ts
// Delete via SDK
import { Vercel } from '@vercel/sdk';
const vercel = new Vercel({ bearerToken: '<TOKEN>' });
await vercel.deployments.deleteDeployment({ id: 'deployment-id' });
```

## Dashboard Actions

| Action | Steps |
|--------|-------|
| Filter | Deployments sidebar → filter by Branch, Date Range, Environment, Status |
| Redeploy | Deployments → ellipsis (…) → Redeploy → choose whether to use build cache |
| Delete | Deployments → select deployment → (…) → Delete |
| Promote to Production | Deployments → ellipsis (…) → Promote to Production |
| Instant Rollback | Project Overview → Production Deployment tile → Instant Rollback |
| Assign Custom Domain | From deployment details |

## REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| DELETE | `/v13/deployments/<id>` | Delete a specific deployment |
| POST | `/v13/deployments` | Create a new deployment |
| GET | `/v13/deployments` | List deployments |

## When to Redeploy

| Scenario | Action |
|----------|--------|
| Bad cached data causing issues | Redeploy without build cache |
| Enabling Analytics | Redeploy |
| Changing Environment Variables | Redeploy |
| Outage Resiliency | Redeploy |
| Build & Development Settings changes | Redeploy |
| Redirect or Rewrite changes from subdomain to subpath | Redeploy |

## Notes

- Deleting a deployment prevents using Instant Rollback on it and may break links in Git provider PR comments.
- A deployment retention policy can be configured to automatically delete deployments after a set period (see [deployment-retention.md](./deployment-retention.md) and [deployment-storage.md](./deployment-storage.md)). A deployment marked for deletion (by the retention policy or manually) can be restored from project Settings > Security > Recently Deleted within the recovery period (30 days for successfully built deployments; unsuccessful deployments may be garbage collected sooner); once it is permanently removed it cannot be restored or used for rollback.
- Retention defaults (changelogs): new Pro teams default to a 30-day deployment retention period (2026-10-09); you can choose a longer period in team settings. Deployment Storage and Functions Storage billing is $0.10 per GB-month for Pro teams, and also begins for existing Pro teams (2026-10-09): their retention window changes to 30 days, and deployments older than 30 days are deleted starting October 23 unless you opt out in retention settings (settings already at 30 days or shorter are unchanged)
- Hobby (changelog 2026-09-16): Hobby teams get 10 GB of Deployment Storage and retain fewer deployments past the 30-day window. Each Hobby project keeps its 3 most recent production deployments plus its 3 most recent deployments of any type regardless of age; preview deployments no longer get their own protection; the current production deployment is never deleted, and aliased and active-branch deployments stay protected. If the team is over 10 GB, deployments outside the exceptions are deleted immediately instead of after 30 days
- Billable duration and CPU minutes (changelog 2026-09-21): deployments show them in the dashboard, `vc inspect` (Vercel CLI 59.23.1 or later) and the REST API. Billable duration is build plus post-build time combined, rounded up to the next whole minute; CPU minutes are that figure multiplied by the machine's vCPUs (e.g. `270 minutes (9m x 30vCPU)`)
- Deployment protection (Vercel Authentication, Trusted IPs, Password Protection) can restrict access to deployments.
- Trusted IPs and Password Protection require Enterprise; Password Protection is also available as a paid Pro add-on.

## Related

- [overview.md](./overview.md)
- [promoting-deployments.md](./promoting-deployments.md)
- [instant-rollback.md](./instant-rollback.md)

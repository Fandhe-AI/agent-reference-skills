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
- A deployment retention policy can be configured to automatically delete deployments after a set period.
- Deployment protection (Vercel Authentication, Trusted IPs, Password Protection) can restrict access to deployments.
- Trusted IPs and Password Protection require Enterprise; Password Protection is also available as a paid Pro add-on.

## Related

- [overview.md](./overview.md)
- [promoting-deployments.md](./promoting-deployments.md)
- [instant-rollback.md](./instant-rollback.md)

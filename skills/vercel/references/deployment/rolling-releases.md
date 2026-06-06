# Rolling Releases

Rolling Releases allow you to gradually shift traffic from your current production deployment to a new release candidate, monitoring metrics between stages before full promotion.

> Requires Pro or Enterprise plan.

## Signature / Usage

```bash
# Configure rolling release stages
vercel rolling-release configure --cfg '{"enabled":true,"advancementType":"automatic","stages":[{"targetPercentage":10,"duration":5},{"targetPercentage":50,"duration":10},{"targetPercentage":100}]}'

# Deploy to production (triggers rolling release)
vercel deploy --prod

# Start the rolling release
vercel rolling-release start --dpl <deployment-url>

# Check status
vercel rolling-release fetch

# Advance to next stage (manual approval mode)
vercel rolling-release approve --dpl <deployment-url> --currentStageIndex 0

# Complete rollout (100% traffic)
vercel rolling-release complete --dpl <deployment-url>

# Abort and revert to previous deployment
vercel rolling-release abort --dpl <deployment-url>

# Disable rolling releases
vercel rolling-release configure --cfg 'disable'
```

## Stage Configuration

| Field | Description |
|-------|-------------|
| `targetPercentage` | Percentage of traffic routed to the release candidate at this stage |
| `duration` | Time in minutes to remain at this stage before auto-advancing (omit for manual approval) |
| `advancementType` | `"automatic"` (time-based) or `"manual"` (explicit approval required) |

- Stages must be in ascending order of `targetPercentage`.
- The final stage must always be `100`.
- A stage at `0%` serves no traffic to the canary by default, but can be forced via the `vcrrForceCanary=true` query parameter.

## REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/projects/{idOrName}/rolling-release/config` | Get rolling release configuration |
| PATCH | `/v1/projects/{idOrName}/rolling-release/config` | Update configuration |
| DELETE | `/v1/projects/{idOrName}/rolling-release/config` | Delete configuration |
| GET | `/v1/projects/{idOrName}/rolling-release/billing` | Get billing info |
| GET | `/v1/projects/{idOrName}/rolling-release` | Get active rolling release status |
| POST | `/v1/projects/{idOrName}/rolling-release/approve-stage` | Advance to next stage |
| POST | `/v1/projects/{idOrName}/rolling-release/complete` | Complete rollout (promote to 100%) |
| POST | `/v1/projects/{projectId}/rollback/{deploymentId}` | Abort by rolling back |

## Traffic Cookie

| Query Parameter | Effect |
|-----------------|--------|
| `vcrrForceCanary=true` | Forces the client cookie to target the canary (release candidate) |
| `vcrrForceStable=true` | Forces the client cookie to target the base (stable) deployment |

Cookie name: `_vcrr_<hash>` where `<hash>` is derived from the project ID.

## How Traffic Routing Works

1. When a user visits a production URL during an active rolling release, Vercel assigns them to a random bucket stored in a cookie (using client IP for consistency across incognito).
2. The bucket determines whether the user sees the base deployment or the release candidate.
3. When a stage advances, some buckets are reassigned; affected users see the new deployment on their next page load.

## Notes

- Strongly recommended to enable **Skew Protection** alongside Rolling Releases to ensure backend API requests from a given page are served by the matching deployment's backend.
- Disabling Rolling Releases via the API while a rollout is in progress does not stop the active rollout — you must still call `complete` or `rollback`.
- Each new rolling release clones the project's current configuration; editing the configuration does not affect in-progress rollouts.
- An in-progress rolling release must be resolved (completed or aborted) before a new one can start.

## Related

- [instant-rollback.md](./instant-rollback.md)
- [rolling-release-deployment.md](./rolling-release-deployment.md)
- [promoting-deployments.md](./promoting-deployments.md)

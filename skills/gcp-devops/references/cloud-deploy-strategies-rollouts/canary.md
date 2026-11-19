---
source: https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary
---

# Canary deployment strategy

A canary deployment is a progressive rollout that splits traffic between the already-deployed version and the new version, rolling out to a subset of users before rolling out fully. It is configured in a delivery pipeline stage under `strategy.canary`. A rollout gets one phase per canary increment plus a final `stable` phase for 100%.

## Signature / Usage

### Automated canary (GKE service networking)

Replace `SERVICE_NAME` with the name of the Kubernetes Service and `DEPLOYMENT_NAME` with the name of the Kubernetes Deployment, both defined in your manifest. `LABEL` is the pod selector label that must match the label selector in the Service (optional, default `app`). `PERCENTAGES` is a comma-separated list of canary increments, for example `[5, 25, 50]`, without `100`.

```text
serialPipeline:
  stages:
  - targetId: prod
    profiles: []
    strategy:
      canary:
        runtimeConfig:
          kubernetes:
            serviceNetworking:
              service: "SERVICE_NAME"
              deployment: "DEPLOYMENT_NAME"
              podSelectorLabel: "LABEL"
        canaryDeployment:
          percentages: [PERCENTAGES]
          verify:
            tasks: []
          predeploy:
            tasks: []
          postdeploy:
            tasks: []
```

### Phases

With canary increments 25%, 50% and 75%, the rollout phases are `canary-25`, `canary-50`, `canary-75` and `stable`.

### Parallel canary

Use a `strategy.canary` stanza in the stage, a multi-target, and the child targets it references. Creating a release creates a controller rollout and child rollouts; each has its own phases for every canary percentage plus `stable`.

## Options / Props

### Supported target types

| Target type | Canary support |
|---|---|
| GKE and GKE attached clusters | Service networking, or Gateway API |
| Cloud Run | Services and worker pools, not jobs |
| Multi-targets | Supported (parallel canary) |
| Custom canary | All target types |

### Types of canary

| Type | You provide | Cloud Deploy provides |
|---|---|---|
| Automated | A series of percentages | Traffic apportioning between old and new versions |
| Custom-automated | Phase name, percentage goal, Skaffold profile per phase, whether to include a verify job, whether to include predeploy / postdeploy jobs | The traffic-balancing resources (no traffic-balancing configuration from you) |
| Custom | The same per-phase items as custom-automated, plus all of the traffic-balancing configuration | Nothing beyond running the phases |

### Percentages

| Runtime | 100% in `percentages` |
|---|---|
| GKE with Gateway API | Allowed (a 100% deployment from canary before switching to `stable`) |
| GKE service-based canary | Not allowed |
| GKE attached clusters | Not allowed |
| Cloud Run | Not allowed |

### Parallel canary: what you can do per rollout

| Action | Controller rollout | Child rollout |
|---|---|---|
| Advance | Yes (advancing it advances the child rollouts) | No |
| Retry failed jobs | No | Yes |
| Ignore failed jobs | No | Yes |
| Cancel | Yes | No |
| Terminate job runs | No | Yes |

### Controller rollout state when a child rollout fails

| Child rollouts | Controller rollout state |
|---|---|
| One or more failed, at least one still `IN_PROGRESS` | `IN_PROGRESS` |
| One or more failed, at least one succeeded, more phases remain | `HALTED` |
| One or more failed, at least one succeeded, current phase is `stable` | `FAILED` |
| Controller is `HALTED` because of a failed child and you ignore the failed job in that child | Reverts to `IN_PROGRESS` |

## Notes

- A parallel canary on GKE targets needs a Kubernetes Deployment configuration and a Kubernetes Service configuration in the manifest, as with a single-target canary.
- `HALTED` lets you ignore or retry the failed jobs in the failed child rollout, or cancel the controller rollout, which prevents further actions on the child rollouts.
- Deploy analysis can be used with some or all phases except `stable` to decide when to advance, by including an `analysis` stanza in each phase's configuration. It can use metrics from Google Cloud Observability or another metrics provider, and can be combined with an `advanceRolloutRule` automation so the rollout advances automatically.
- The source also links to a custom canary page for the fully custom form; it is outside this category.
- Cloud Deploy is Google Cloud's continuous delivery service for GKE / Cloud Run; it is not Vercel or Cloudflare deployment (`vercel`, `cloudflare-wrangler`).
- Snippet taken from https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary/gke/service-networking (the source page has no code).
- Source: https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [deployment-strategies.md](./deployment-strategies.md)
- [cloud-run.md](./cloud-run.md)
- [service-networking.md](./service-networking.md)
- [gateway-api.md](./gateway-api.md)
- [manage-rollout.md](./manage-rollout.md)

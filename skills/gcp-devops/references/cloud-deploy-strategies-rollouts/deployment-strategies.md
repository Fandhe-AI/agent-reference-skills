---
source: https://docs.cloud.google.com/deploy/docs/deployment-strategies
---

# Cloud Deploy deployment strategies

Cloud Deploy supports two deployment strategies, standard and canary. A deployment strategy is a technique for deploying changes to an application while minimizing the impact on users. Both strategies support all of the runtime environments (target types) that Cloud Deploy supports.

## Signature / Usage

### Standard strategy

A standard deployment simply deploys the application to one or more target runtimes. It is not progressive and there is no split between the old and new versions. With a standard deployment you can roll back a release, verify the deployment, and deploy to more than one target at the same time. A standard rollout has one phase, `stable`.

### Canary strategy

A canary is a progressive deployment, configured with a `strategy.canary` stanza inside a pipeline stage. This is the automated Cloud Run form (a fragment of a `DeliveryPipeline` resource):

Replace `PERCENTAGES` with a comma-separated list of canary increments, for example `[25, 50, 75]` (not including `100`), and each `TASKS` with a list of tasks (an empty list `[]` if none).

```text
serialPipeline:
  stages:
  - targetId: prod
    profiles: []
    strategy:
      canary:
        runtimeConfig:
          cloudRun:
            automaticTrafficControl: true
        canaryDeployment:
          percentages: [PERCENTAGES]
          verify:
            tasks: [TASKS]
          predeploy:
            tasks: [TASKS]
          postdeploy:
            tasks: [TASKS]
```

## Options / Props

| Strategy | Behavior | Rollback | Verification | Parallel (multi-target) deployment |
|---|---|---|---|---|
| Standard | Deploys to the target runtime(s); no traffic split between old and new versions | Supported | Supported | Supported |
| Canary | Progressive; deploys to a portion of the infrastructure first, with any progression of percentages except partial percentages such as 20.5% | Supported | Supported | Supported |

### Phases skipped on first deployment

| Situation | Result |
|---|---|
| Canary, and no version of the application is deployed yet to that target that Cloud Deploy can recognize | The canary phase or phases are skipped and the `stable` phase runs after you click **Advance Rollout** (the click acknowledges the skipped canary phases) |
| Later canary to the same target | Canary phases run against the now-deployed version |

## Notes

- All deployment strategies support rolling back, canceling rollouts, and deploying to more than one target at the same time (parallel deployment).
- Canary on Cloud Run is described as splitting traffic 50% / 50% between the new and old revisions at a 50% step, then advancing to 100%.
- The `stable` phase is the 100% phase. Percentages in a canary configuration do not include 100.
- Cloud Deploy is Google Cloud's continuous delivery service for GKE / Cloud Run; it is not Vercel or Cloudflare deployment (`vercel`, `cloudflare-wrangler`).
- The standard deployment page the source links (https://docs.cloud.google.com/deploy/docs/deploying-application) is outside this category.
- Snippet taken from https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary/cloud-run (the source page has no code).
- Source: https://docs.cloud.google.com/deploy/docs/deployment-strategies (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [canary.md](./canary.md)
- [manage-rollout.md](./manage-rollout.md)
- [roll-back.md](./roll-back.md)

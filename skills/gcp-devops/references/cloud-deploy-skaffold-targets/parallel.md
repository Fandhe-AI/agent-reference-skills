---
source: https://docs.cloud.google.com/deploy/docs/parallel
---

# Parallel deployment (multi-targets)

A multi-target is a target, used as a stage in a delivery pipeline, that references child targets; Cloud Deploy deploys to the children concurrently. It works with any supported target type and any pipeline stage, for example `dev -> staging -> prod [prod1, prod2, prod3, prod4, ...]`.

## Signature / Usage

### Multi-target

```yaml
apiVersion: deploy.cloud.google.com/v1
kind: Target
metadata:
 name: TARGET_NAME
description: TARGET_DESCRIPTION
multiTarget:
 targetIds: [ CHILD_TARGET1, CHILD_TARGET2, CHILD_TARGETn ]
```

### Child target: GKE

```yaml
apiVersion: deploy.cloud.google.com/v1
kind: Target
metadata:
 name: CHILD_TARGET1
description: TARGET_DESCRIPTION
gke:
 cluster: projects/PROJECT_ID/locations/REGION/clusters/CLUSTER_NAME
```

### Child target: Cloud Run

```yaml
apiVersion: deploy.cloud.google.com/v1
kind: Target
metadata:
 name: CHILD_TARGET1
description: TARGET_DESCRIPTION
run:
 location: projects/PROJECT_ID/locations/REGION
```

### Child target: GKE attached clusters

```yaml
apiVersion: deploy.cloud.google.com/v1
kind: Target
metadata:
 name: CHILD_TARGET1
description: TARGET_DESCRIPTION
anthosCluster:
 membership: projects/PROJECT_ID/locations/global/memberships/MEMBERSHIP_NAME
```

### Child target: custom target

```yaml
apiVersion: deploy.cloud.google.com/v1
kind: Target
metadata:
 name: CHILD_TARGET1
description: TARGET_DESCRIPTION
customTarget:
  customTargetType: CUSTOM_TARGET_TYPE_NAME
```

## Options / Props

### Resources

| Resource | Description |
|----------|-------------|
| Multi-target | Target with top-level `multiTarget`; lists children in `multiTarget.targetIds`; cannot have `gke`, `run` or `anthosCluster` |
| Child target | Any target referenced in `multiTarget.targetIds`; has no `multiTarget` property; cannot have `requireApproval: true` |
| Controller rollout | Rollout corresponding to the multi-target |
| Child rollout | One per child target |

### Limitations

| Limit | Value |
|-------|-------|
| Child targets per multi-target | No more than 100 |
| Child runtime | All children of one multi-target must have the same runtime (all GKE or all Cloud Run, for example) |
| Parents | Within a pipeline a child target can have only one parent multi-target |
| Multi-target rules | Cannot be childless; cannot reference itself or another multi-target |
| Reuse | A child target cannot be used more than once within a pipeline; it can be reused in different pipelines |
| Custom targets | All children must reference the same `CustomTargetType` |
| Concurrency | Default pools have concurrency limits; private pools do not (see Notes) |

### Execution environment inheritance

| Multi-target | Child | Result |
|--------------|-------|--------|
| Non-default | Default | Child inherits the multi-target's |
| Default | Non-default | Child uses its own |

## Notes

- Approval can be configured only on the multi-target; approval or rejection affects all children together. Rollback is done on the multi-target (see the roll-back page).
- Deploy parameters can differentiate children (for example replicas): put parameter values in the pipeline progression and labels on the child targets to match.
- Concurrency: all child rollouts deploy at the same time up to the Cloud Build concurrency limit; with more children than the limit, some deploy jobs wait, so deployment is not simultaneous, and verify jobs of some children may start before all children are deployed. To go beyond the limit, request a Cloud Build quota increase or set up a private pool and configure targets to use it.
- Create the pipeline and targets and then a release as usual; at the multi-target stage Cloud Deploy creates a controller rollout and one child rollout per child. Pub/Sub messages distinguish controller and child rollouts.
- In the console, the pipeline's target list shows the multi-target but not children; release details show controller and child rollouts, and the release inspector can diff rendered manifests for child rollouts.
- Parallel deployment can be combined with the canary strategy (see the canary page).
- The source shows the child target forms as tabs (GKE, Cloud Run, GKE attached clusters, Custom Target); all are kept above.
- Source: https://docs.cloud.google.com/deploy/docs/parallel (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [gke-targets.md](./gke-targets.md)
- [run-targets.md](./run-targets.md)
- [anthos-targets.md](./anthos-targets.md)
- [custom-targets.md](./custom-targets.md)

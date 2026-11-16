---
source: https://docs.cloud.google.com/kubernetes-engine/upgrades
---

# About GKE cluster upgrades

Overview of how Google Kubernetes Engine (GKE) upgrades the control plane and nodes of a cluster, which controls you have over timing and scope, and what GKE upgrades regardless of those controls.

## Signature / Usage

### Query upgrade events in Cloud Logging

GKE logs control plane and node pool upgrade events to Cloud Logging by default. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cluster-upgrades (control plane upgrade logs; see [cluster-upgrades.md](./cluster-upgrades.md)).

```
resource.type="gke_cluster"
protoPayload.metadata.operationType=~"(UPDATE_CLUSTER|UPGRADE_MASTER)"
resource.labels.cluster_name="CLUSTER_NAME"
```

## Options / Props

### Upgrade types

| Type | Behavior |
| --- | --- |
| Patch version upgrades | Automatic, as often as every week, depending on the release channel. |
| Minor version upgrades | Approximately three times a year. For Extended channel clusters, only when the minor version nears the end of extended support. |
| Clusters not enrolled in a release channel (deprecated) | Control plane and nodes are still upgraded automatically; auto-upgrade targets follow the "Upgrade timing" row of the enrolled vs. not-enrolled comparison table. |

### Controls over upgrades

| Capability | Purpose |
| --- | --- |
| Release channels | Pick versions with a chosen balance of feature availability and stability. |
| Maintenance windows | Recurring window of time when certain maintenance, such as upgrades, can occur. |
| Maintenance exclusions | Prevent maintenance for a specific time period. |
| Cluster disruption budgets | Customize the minimum time interval between specific types of cluster upgrades (patch or minor). |
| Node upgrade strategies | Standard node pools only: surge, blue-green, or autoscaled blue-green (Preview). Also choose how many node pools GKE upgrades concurrently. |
| Rollout sequencing | Qualify upgrades in a pre-production environment before production clusters. |
| Manual upgrades | Upgrade yourself; cancel, resume, roll back, or complete in-progress upgrades. |

### Control plane upgrades

| Aspect | Detail |
| --- | --- |
| Patch upgrades | One-step upgrade directly to a later version. |
| Minor upgrades to GKE 1.33 or later | Two-step upgrade: validate the new minor version during soak time and roll back if needed. |
| Disabling | Control plane upgrades can't be disabled. Maintenance exclusions can prevent all control plane upgrades (minor and patch) for up to 90 days. For clusters in a release channel, minor upgrades can be prevented until the minor version reaches the end of support. |

### Node upgrades

| Cluster / pool type | Behavior |
| --- | --- |
| Autopilot clusters | Nodes are always upgraded automatically to the control plane version. |
| Standard node pools | Auto-upgraded by default to the auto-upgrade target; can be disabled with maintenance exclusions; can be upgraded manually. |
| Autopilot-managed node pools (Standard clusters) | Upgraded automatically to the control plane version over time; can also be upgraded manually. |

Constraints to respect when postponing node auto-upgrades:

- Nodes can't be more than two minor versions behind the control plane version.
- Nodes can't run a version newer than the cluster's current control plane version.
- Nodes can't run a minor version that has reached the end of support (end of standard support, or end of extended support for the Extended channel).

### Upgrades GKE performs despite blockers

GKE might upgrade a cluster even with maintenance windows or exclusions (or disabled node auto-upgrades on a cluster not in a release channel) when: the control plane runs an end of support version; nodes run end of support versions; or the cluster is state-looping (running to degraded, repairing, or suspended and back to running).

## Notes

- Terminology: "cluster upgrades" or "upgrades" means updating the Kubernetes version of the control plane, the nodes, or both; "cluster updates" is the broader term for any control plane or node change.
- Scheduled cluster upgrade notifications are Preview; use cluster notifications through Cloud Logging or Pub/Sub.
- Use insights and recommendations for: using release channels, setting maintenance windows, upgrading to supported versions, maintaining supported version skew, and ensuring workloads are disruption-ready.
- Across the fleet, automatic upgrades are typically performed in stages over multiple weeks.
- Source: https://docs.cloud.google.com/kubernetes-engine/upgrades (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-upgrades.md](./cluster-upgrades.md)
- [release-channels.md](./release-channels.md)
- [maintenance-windows-and-exclusions.md](./maintenance-windows-and-exclusions.md)
- [node-pool-upgrade-strategies.md](./node-pool-upgrade-strategies.md)

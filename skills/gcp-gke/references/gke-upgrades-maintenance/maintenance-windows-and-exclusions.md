---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/maintenance-windows-and-exclusions
---

# Maintenance windows and exclusions

GKE maintenance policies control when certain automatic maintenance, such as auto-upgrades, can and can't occur. A maintenance window is a repeating window when maintenance is permitted; a maintenance exclusion is a non-repeating window when it is forbidden. Per cluster: one recurring window and multiple exclusions.

## Signature / Usage

### Apply node changes that respect maintenance policies

Some manual changes (control plane IP or credential rotation, shielded nodes, network policies, intranode visibility, NodeLocal DNSCache, GKE Sandbox) recreate nodes and wait for an open window and no active exclusion. To apply them manually, call `gcloud container clusters upgrade` and pass `--cluster-version` with the version the node pool already runs (see the [gcloud reference](https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/upgrade)).

The source gives an overlapping-exclusion example (end-of-year holiday season): "No minor upgrades: September 30 - January 15", "No upgrades: November 19 - December 4", "No upgrades: December 15 - January 5". The source shows no command for it; this is the gcloud help example for adding an exclusion (snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/update):

```bash
gcloud container clusters update example-cluster   \
    --add-maintenance-exclusion-name=holidays-2000   \
    --add-maintenance-exclusion-start=2000-11-20T00:00:00   \
    --add-maintenance-exclusion-end=2000-12-31T23:59:59   \
    --add-maintenance-exclusion-scope=no_upgrades
```

## Options / Props

### Cluster maintenance exclusion scopes

| Scope | CP minor | CP patch | Node minor | Node patch | Maximum length |
| --- | --- | --- | --- | --- | --- |
| No upgrades (default) | Not allowed | Not allowed | Not allowed | Not allowed | Cannot exceed 90 days; recommended under 30 days |
| No minor upgrades | Not allowed | Allowed | Not allowed | Allowed | Fixed end time up to end of support (end of standard support for Rapid/Regular/Stable; end of extended support for Extended), or track the end of support; recommended under six months |
| No minor or node upgrades | Not allowed | Allowed | Not allowed | Not allowed | Same as "No minor upgrades" |

### Node pool maintenance exclusion

| Node minor | Node patch | Maximum length |
| --- | --- | --- |
| Not allowed | Not allowed | End time tracks the end of support of the cluster's minor version |

Ways to use it: create a node pool with the exclusion; add it to an existing node pool; or set `nodePoolConfig.maintenanceExclusion` in a custom ComputeClass (GKE adds the exclusion when creating new Standard node pools, or groups of nodes in Autopilot mode).

### Limitations

- Cluster exclusion scopes other than "No upgrades" require a cluster enrolled in a release channel; clusters not enrolled (deprecated) can only use "No upgrades".
- At most three "No upgrades" exclusions, configured to leave at least 48 hours of maintenance availability in a 92-day rolling window.
- At most 20 cluster maintenance exclusions per cluster; default scope is "no upgrades".
- An exclusion can't include or exceed the end of support date of the cluster's minor version (except as a temporary emergency "No upgrades" exclusion of up to 90 days after the end of support).
- Node pool exclusions: cluster must be in a release channel; one per node pool; start immediately (no future start); not usable with Autopilot clusters; they prevent only node version upgrades, not other node updates.

### Time zones

| Context | Behavior |
| --- | --- |
| Stored | Always UTC |
| `--maintenance-window` flag, gcloud / API | UTC; no time zone can be specified. Console shows local time. |
| Granular flags such as `--maintenance-window-start` | Time zone may be part of the value; if omitted, local time zone is used |
| Viewing | Console: local time; gcloud: UTC; `RRULE` is always UTC (days of week are UTC days) |

## Notes

- Windows and exclusions don't affect maintenance of Compute Engine host events (GPU/TPU VMs can't live migrate), control plane repairs (can't be disabled), Spanner-based cluster state database maintenance, or critical security vulnerability patching, which GKE reserves the right to override. Node auto-repair can be disabled for Standard clusters.
- Manual upgrades begin immediately and ignore windows and exclusions. Exclusions don't prevent creating newer-version node pools or node auto-provisioning from creating nodes at the control plane version.
- If tasks run beyond a window GKE tries to pause and resumes in the next window. GKE may roll out unplanned emergency or mandatory upgrades outside windows.
- When an exclusion and a window overlap, the exclusion wins. If any active exclusion blocks an upgrade, it is postponed.
- Exclusions have no recurrence; create each instance separately. For known high-impact events, start an exclusion one week before the event.
- An exclusion that tracks the end of support is temporarily inactive at the end of support date until GKE performs the required upgrade or you upgrade manually, then reactivates for the new minor version. If multiple minor upgrades were missed, GKE schedules approximately one minor upgrade per month.
- Using exclusions to prevent node auto-upgrades makes you responsible for manual upgrades so the cluster keeps to the version skew policy and supported versions; GKE upgrades at the end of support.
- With rollout sequencing, GKE applies the more restrictive of the sequence scope and the exclusion scope.
- Corrected from the official docs: the source's end-of-support example prints `2026-04-0500:00:00Z`; the RFC 3339 form is `2026-04-05T00:00:00Z` (the `T` is missing in the source).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/update (the source page itself has no code).
- Emergency delay of end-of-support upgrades is not recommended: unsupported versions get no security patches or bug fixes.
- The source also describes Console steps and cluster disruption budgets (see the how-to pages).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/maintenance-windows-and-exclusions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [upgrades.md](./upgrades.md)
- [cluster-upgrades.md](./cluster-upgrades.md)
- [release-channels.md](./release-channels.md)
- [node-pool-upgrade-strategies.md](./node-pool-upgrade-strategies.md)

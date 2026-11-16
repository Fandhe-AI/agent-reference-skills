---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/release-channels
---

# Release channels

Release channels (Rapid, Regular, Stable, Extended) let GKE pick cluster versions with a chosen balance between feature availability and stability. Enrollment is recommended; not enrolling ("No channel") is deprecated.

## Signature / Usage

### Run a patch version from a newer channel

The source example: with Rapid offering 1.23.2-gke.700 and 1.22.4-gke.1500 and Regular offering 1.21.4-gke.400 and 1.22.1-gke.400, a Regular-channel cluster on 1.22.1-gke.400 could manually upgrade to 1.22.4-gke.1500 (same minor version) but not to 1.23.2-gke.700. This works with the gcloud CLI or the GKE API. The source shows no command; this is the gcloud help example for a manual control plane upgrade (snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/upgrade). Set `--cluster-version` to an available patch of the same minor version (for example `1.22.4-gke.1500` in the scenario above); list the allowed versions with `gcloud container get-server-config`.

Adapted (not in the official docs): `--cluster-version=TARGET_PATCH_VERSION` and `--location=CONTROL_PLANE_LOCATION` are added so the upgrade targets the chosen patch instead of the default cluster version.

```bash
gcloud container clusters upgrade sample-cluster --master \
    --cluster-version=TARGET_PATCH_VERSION \
    --location=CONTROL_PLANE_LOCATION
```

## Options / Props

### Channels

| Channel | Minor version availability | Set as auto-upgrade target | When to use |
| --- | --- | --- | --- |
| Rapid | 1-2 weeks after upstream open source GA. Alpha patch versions (alpha clusters only) up to four months earlier. | 1-2 months after release to Rapid | Newest Kubernetes release and GKE features the moment they go GA. Recommended for pre-production testing and alpha clusters. Excluded from the GKE SLA; may contain issues without known workarounds. |
| Regular (default) | Approximately 2 months after release to Rapid | Approximately 3 months after release to Regular | Balance of feature availability and stability; recommended for most users. |
| Stable | 3-4 months after release to Regular | Approximately 2 months after release to Stable | Stability over new features; receives changes last. |
| Extended | Aligned with Regular | Aligned with Regular | Long-term support: stay on a minor version for up to 24 months (14-month standard support plus approximately 10 months of extended support with security patches). |
| No channel (deprecated) | Aligned with Regular | Aligned with Stable | Deprecated; will be removed on June 14, 2027, after which GKE enrolls remaining clusters in the Stable channel. Only allowed for existing customers. |

### Availability timing within a channel

| Item | Minimum time |
| --- | --- |
| New patch version, before it becomes an auto-upgrade target in that channel | At least one week |
| New patch version, after being available in the prior channel | At least two weeks |
| New minor version, before auto-upgrade target in Rapid | At least four weeks |
| New minor version, before auto-upgrade target in Regular and Stable | At least eight weeks |

### Enrolled vs. not enrolled in a release channel

| Feature | Enrolled | Not enrolled (deprecated) |
| --- | --- | --- |
| Upgrade timing | Aligned with the channel | Minor auto-upgrade start same as Stable; available minors, patch auto-upgrade versions and default version same as Regular |
| Accelerated patch auto-upgrades | Available | Not available |
| Maintenance exclusion scopes | "No upgrades" (up to 90 days), "No minor upgrades", "No minor or node upgrades" (until end of support), node pool exclusion | "No upgrades" only (up to 90 days) |
| Maintenance windows | Available | Available |
| Rollout sequencing | Available | Not available |
| Long-term support | Extended channel only | Not available |
| Autopilot | Available | Not available |

### Extended channel limitations

- You can't enroll a cluster that uses: Autopilot mode, alpha clusters, explicitly-enabled Kubernetes beta APIs, Windows Server node pools, Config Connector, or the multi-cluster features Managed Cloud Service Mesh, Service Directory for GKE, Config Sync, Policy Controller, Multi-cluster Gateway, Multi Cluster Ingress, Multi-cluster Services.
- Gateway is supported in the Extended channel only with GKE version 1.30 or later.
- The extended support period doesn't extend cluster credential expiry; rotate credentials before they expire.
- During extended support GKE updates the Container-Optimized OS milestone when it reaches end of support, pausing patch node auto-upgrades and sending a cluster notification.
- Pay-per-use extended support pricing applies once the minor version enters the extended support period.
- Automatic upgrades: standard period follows Regular cadence; about 2 months before the end of extended support GKE begins upgrading to the next minor version (unless deprecated features or APIs are in use; exclusions can prevent this); at the end of extended support all remaining clusters are upgraded regardless of blockers.

## Notes

- All channels offer supported GA GKE releases; Kubernetes releases include both GA and beta Kubernetes APIs. Critical security patches reach all channels; in rare emergencies GKE might upgrade a cluster to a version not yet in its channel.
- Autopilot clusters can only be enrolled in a release channel.
- If you create a cluster in a channel with a patch version that has a newer eligible auto-upgrade target, GKE might upgrade it automatically; configure a maintenance exclusion before selecting the new channel to prevent this.
- If 10 days have passed since a new auto-upgrade target and upgrades haven't started, causes include: outside a maintenance window or inside an exclusion, paused upgrades due to deprecated Kubernetes features removed in the next minor version, a patch auto-upgrade less than 24 hours ago, a minor auto-upgrade less than 30 days ago (when the target is a new minor), or GKE pausing the rollout (technical issues, production freeze such as Black Friday).
- Recommended auto-upgrade target: GKE moves a cluster progressively closer to it over multiple auto-upgrades.
- Accelerated patch auto-upgrades (enrolled clusters only) apply new patch versions as soon as they are available and skip a qualification step; they affect all patch versions, not only security patches, don't affect minor upgrades, and still honor maintenance windows, exclusions and rollout sequencing.
- To run a patch from a newer channel the control plane must already run a patch of the same minor version; GKE keeps it until a newer auto-upgrade target is available in the enrolled channel.
- Enroll alpha clusters in the Rapid channel to access alpha patch versions; alpha clusters can also be in Regular or Stable but then can't access them.
- Per-channel release notes exist for Rapid, Regular and Stable (HTML and Atom feeds).
- Extended channel scenarios: temporarily staying on a minor version and manually upgrading minor versions 1-2 times a year are supported; doing nothing and receiving minor upgrades with the same frequency (every 4 months on average) is not.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/upgrade (the source page itself has no code).
- No dates in the schedule tables are fixed; they depend on the open source schedule and are subject to change.
- Source inconsistency: this page says "Enroll alpha clusters in the Rapid channel to access alpha patch versions; alpha clusters can also be in Regular or Stable but then can't access them" (and, in the enrollment limits, "You can't enroll a cluster that uses: ... alpha clusters"), while configuration-overview.md says alpha clusters "cannot be upgraded or added to release channels" and cluster-upgrades.md says "alpha clusters can't be enrolled in release channels". The source does not reconcile the statements; this page is the one dedicated to release channels and has a section "Choose the Rapid channel for alpha clusters".
- Adapted from the official docs: the gcloud help example `gcloud container clusters upgrade sample-cluster --master` omits `--cluster-version`; without it "master upgrades default to the default cluster version, which can be found in the server config", which may not be the newer-channel patch this section describes (`gcloud container clusters upgrade --help`, gcloud 593.0.0, retrieved 2026-11-14).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/release-channels (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [upgrades.md](./upgrades.md)
- [cluster-upgrades.md](./cluster-upgrades.md)
- [maintenance-windows-and-exclusions.md](./maintenance-windows-and-exclusions.md)

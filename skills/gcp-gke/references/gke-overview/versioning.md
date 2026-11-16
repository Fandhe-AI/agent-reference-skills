---
source: https://docs.cloud.google.com/kubernetes-engine/versioning
---

# GKE versioning and support

Explains GKE versioning (`X.Y.Z-gke.N`), minor and patch version support, the minor version lifecycle (alpha, Rapid-only, standard, extended support), automatic upgrades at the end of support, the control plane 90-day patch policy and the version skew policy. See the GKE release schedule for current dates.

## Signature / Usage

### Check available versions per release channel

`RELEASE_CHANNEL` is `RAPID`, `REGULAR`, `STABLE` or `EXTENDED`; `COMPUTE_LOCATION` is the Compute Engine location to check.

```bash
gcloud container get-server-config \
    --flatten="channels" \
    --filter="channels.channel=RELEASE_CHANNEL" \
    --format="yaml(channels.channel,channels.validVersions)" \
    --location=COMPUTE_LOCATION
```

### Check the default version

```bash
gcloud container get-server-config \
    --flatten="channels" \
    --filter="channels.channel=RELEASE_CHANNEL" \
    --format="yaml(channels.channel,channels.defaultVersion)" \
    --location=COMPUTE_LOCATION
```

### Check alpha patch versions (Rapid channel)

```bash
gcloud container get-server-config \
    --flatten="channels" \
    --filter="channels.channel=RAPID" \
    --format="yaml(channels.channel,channels.previewVersions)" \
    --location=COMPUTE_LOCATION
```

### Clusters with no channel (deprecated)

```bash
gcloud container get-server-config \
    --format="value(defaultClusterVersion)" \
    --location=COMPUTE_LOCATION
```

```bash
gcloud container get-server-config \
  --format="yaml(validMasterVersions)" \
  --location=COMPUTE_LOCATION
```

```bash
gcloud container get-server-config \
  --format="yaml(validNodeVersions)" \
  --location=COMPUTE_LOCATION
```

## Options / Props

### Periods of availability

| Period | Approx. timespan from Regular availability | Support |
| --- | --- | --- |
| Alpha version availability | Month -5 through Month -1 | Alpha patch versions in Rapid, alpha clusters only; no technical support or SLA; likely to contain issues. |
| Rapid-only availability | Month -1 through Month 0 | Available to all Rapid clusters; excluded from the GKE SLA; may contain issues without known workarounds. Typically 1-2 months. |
| Standard support | Month 1 through Month 14 | Patches with new features, security fixes, bug fixes. Channels: Rapid, Regular, Stable, Extended, No Channel (deprecated). |
| Extended support | Month 15 through Month 24 | Security fixes only (medium, high, critical). Extended channel only (additional fee per cluster). |

### `--cluster-version` values

| Value | Meaning |
| --- | --- |
| `1.30.2-gke.1500` (example) | An available version |
| `upgrade-target` (Preview) | Target version of the cluster's rollout sequence stage, else the channel's auto-upgrade target. Cluster creation only. |
| `latest` | Highest supported version in the zone/region; does not keep the cluster on latest over time |
| `1.X` | Highest valid patch release in that minor version |
| `1.X.Y` | Highest valid `gke.N` patch in that patch release |
| `-` | Default Kubernetes version for control planes |

`latest`, `1.X`, `1.X.Y` and `-` work for creation and upgrades.

### Version policies

| Policy | Rule |
| --- | --- |
| Support length | At least 14 months standard, up to 24 months total with extended support. |
| Version skew | Nodes may match the control plane or be up to two minor versions older; never newer. Example: control plane 1.31 allows nodes 1.31, 1.30, 1.29. |
| Skipping minor versions | Control plane: not allowed (patch versions can be skipped). Nodes can skip minor versions (for example 1.32 to 1.34). |
| Control plane 90-day patch policy | Control plane must be upgraded to a new patch or minor version at least every 90 days; otherwise GKE upgrades it regardless of configured policies. |
| Patch deprecation | A deprecated patch is still usable for the control plane for 90 days or until minor end of standard support (end of extended support for Extended channel). |
| Emergency delay | Maintenance exclusion with default "No upgrades" scope can delay end-of-support auto-upgrade for up to 90 days after end of support; not recommended. |
| Alpha clusters | Cannot be upgraded; expire 30 days after creation; no retroactive CVE fixes. |

## Notes

- Example output blocks in the source (for example `1.36.2-gke.2064000`, `1.37.0-gke.2064000+preview`) are illustrative and not reproduced here; see the source page.
- Nodes running unsupported minor versions are typically upgraded within one month of end of support; nodes on Extended channel are only automatically upgraded to patches of the same minor until the end of extended support.
- Container-Optimized OS: when a milestone reaches end of support during extended support, GKE upgrades the control plane to the next patch but does not auto-upgrade nodes to a patch that changes the milestone; you must upgrade manually or accept no node security patches. GKE sends a cluster notification.
- Recommender subtypes: `CLUSTER_VERSION_END_OF_LIFE` (control plane past end of standard support, not on Extended) and `CLUSTER_VERSION_SKEW_UNSUPPORTED`.
- The source also shows Console steps for checking versions.
- Source: https://docs.cloud.google.com/kubernetes-engine/versioning (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [autopilot-overview.md](./autopilot-overview.md)
- [shared-responsibility.md](./shared-responsibility.md)
- [kubernetes-engine-overview.md](./kubernetes-engine-overview.md)

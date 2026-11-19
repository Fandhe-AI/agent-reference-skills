---
source: https://docs.cloud.google.com/config-connector/docs/concepts/installation-types
---

# Choosing an installation type

Config Connector can be installed manually with the Kubernetes operator, through Config Controller, or as the GKE Config Connector add-on.

## Signature / Usage

The `ConfigConnector` resource selects the mode of a manual installation (`namespaced` is recommended for most use cases; `cluster` is the alternative):

```yaml
apiVersion: core.cnrm.cloud.google.com/v1beta1
kind: ConfigConnector
metadata:
  # the name is restricted to ensure that there is only ConfigConnector resource installed in your cluster
  name: configconnector.core.cnrm.cloud.google.com
spec:
  mode: namespaced
  stateIntoSpec: Absent
```

## Options / Props

| Installation method | Advantages | Disadvantages |
|---|---|---|
| Manual installation (recommended) | More customization, namespaced mode (recommended) or cluster mode; flexible version update schedule; can run with any custom workload in the same cluster | Operational cost |
| Config Controller | No installation required; automatic version upgrades; includes Config Sync; managed and supported by Google Cloud | Restriction on custom workloads; managed by Google and may not be the absolute latest version compared to manual installation |
| GKE Config Connector add-on | — | Significant lag behind the latest Config Connector version |

## Notes

- Manual installation: use the Kubernetes operator; you control the exact version and when you upgrade.
- Config Controller: hosted service that includes Config Connector; Google manages and regularly updates the version as versions qualify.
- GKE add-on: lets you install during cluster creation; available on only GKE Standard clusters, not Autopilot. The installed version is often behind by up to 12 months or more.
- Authentication on GKE: use Workload Identity Federation for GKE, which lets a Kubernetes ServiceAccount impersonate an IAM service account. Config Connector can only create resources with the roles granted to the IAM service account.
- On other deployment options (on-premises, multi-cloud) use Cloud Identity to create an account, then use IAM to create a service account key and import its credentials as a Secret. Service account keys are a security risk if not managed correctly; choose a more secure alternative whenever possible. If you must use a key you are responsible for its security (see the best practices for managing service account keys). Key creation might be disabled for your organization. Validate keys acquired from an external source before use.
- Manual installation chooses between a single cluster-wide service account (cluster mode) or one service account per namespace (namespaced mode); namespaced mode is recommended for most use cases because it provides better permission isolation.
- Config Connector manages Google Cloud resources as Kubernetes objects; the GKE cluster itself and Config Sync are in `gcp-gke`.
- Snippet taken from https://docs.cloud.google.com/config-connector/docs/how-to/install-manually (the source page has no code).
- Source: https://docs.cloud.google.com/config-connector/docs/concepts/installation-types (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [install-manually.md](./install-manually.md)
- [install-upgrade-uninstall.md](./install-upgrade-uninstall.md)
- [config-connector-overview.md](./config-connector-overview.md)

---
source: https://docs.cloud.google.com/deploy/docs/anthos-targets
---

# Deploy to GKE attached clusters (anthosCluster targets)

Cloud Deploy deploys container workloads to GKE attached clusters (AWS, Azure and on-premises clusters) that you can reach through Connect gateway. The target uses an `anthosCluster` stanza with a fleet membership.

## Signature / Usage

### Target configuration

Resource identifier format (placeholders in brackets in the source):

```text
anthosCluster:
 membership: projects/[project_name]/locations/global/memberships/[membership_name]
```

Example target:

```yaml
apiVersion: deploy.cloud.google.com/v1
kind: Target
metadata:
 name: qsdev
description: development cluster
anthosCluster:
 membership: projects/my-app/locations/global/memberships/my-app-dev-cluster
```

## Options / Props

| Item | Description |
|------|-------------|
| `project_name` | Project in which the cluster is running; need not be the delivery pipeline's project |
| `membership_name` | Name chosen when the cluster was registered to a fleet. Clusters created as GKE attached clusters get memberships automatically |
| location | Always `global` for cluster memberships |

### Setup steps

| Step | Requirement |
|------|-------------|
| 1 | Have a user cluster (created as a GKE attached cluster, or an existing Kubernetes cluster registered to a fleet) |
| 2 | gcloud CLI 407.0.0 or newer: include `--install-connect-agent` on `gcloud container fleet memberships register` when registering a GKE cluster (the Connect agent is no longer installed by default) |
| 3 | Set up Connect gateway using the same service account used as the Cloud Deploy execution service account; enable Workload Identity on GKE clusters to set up Connect gateway |
| 4 | Grant the execution service account the roles it needs to use the gateway (default Cloud Deploy service account or a custom one) |
| 5 | Set up RBAC for the execution service account on the underlying Kubernetes cluster |
| 6 | Optional: if the cluster is not GKE, configure an `imagePullSecret` so it can pull from Artifact Registry |

## Notes

- Targets can be in the delivery pipeline YAML or a separate file; multiple targets in one file need separate `kind: Target` stanzas.
- The `[project_name]` / `[membership_name]` placeholders are shown in a `text` fence because the bracketed form is a resource-name pattern.
- If the execution service account is not the one used to set up Connect gateway, it lacks the permissions needed to deploy to the cluster.
- Fleet and Connect gateway belong to `gcp-gke`; Artifact Registry pull secrets to this skill's Artifact Registry references.
- Source: https://docs.cloud.google.com/deploy/docs/anthos-targets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [gke-targets.md](./gke-targets.md)
- [parallel.md](./parallel.md)

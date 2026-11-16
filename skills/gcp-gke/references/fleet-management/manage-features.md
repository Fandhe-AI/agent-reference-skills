---
source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/manage-features
---

# Manage fleet-level features

Overview of enabling, configuring, viewing and disabling fleet-level features (enterprise features that are managed across all fleet clusters), including fleet-level defaults and the Feature Authorizer.

## Signature / Usage

### Enable a feature with fleet-level defaults

Create a YAML file specifying the fleet defaults for the feature, then run the feature's `enable` command in the fleet host project. For example, Cloud Service Mesh with defaults in `mesh.yaml`:

```bash
gcloud container fleet mesh enable --fleet-default-member-config mesh.yaml
```

### Enable a feature on individual clusters

Each fleet-level feature has its own `enable` command, run in the fleet host project. For example:

```bash
gcloud container fleet identity-service enable
```

### View and disable

```bash
gcloud container fleet features list
```

```bash
gcloud container fleet mesh disable
```

### Audit Feature Authorizer activity

Run in Logs Explorer. Replace `CLUSTER_NAME`, `CLUSTER_LOCATION` and `PROJECT_NUMBER` (the project number of the project that owns the cluster).

```text
resource.type="k8s_cluster"
resource.labels.cluster_name="CLUSTER_NAME"
resource.labels.location="CLUSTER_LOCATION"
protoPayload.authenticationInfo.principalEmail="system:serviceaccount:gke-connect:connect-agent-sa"
protoPayload.authenticationInfo.authoritySelector="service-PROJECT_NUMBER@gcp-sa-gkehub.iam.gserviceaccount.com"
```

## Options / Props

Features that can be managed at fleet level:

| Feature | Notes |
|---|---|
| Managed Cloud Service Mesh | Fleet defaults supported |
| Security posture | Fleet defaults supported |
| Config Sync | Fleet defaults supported |
| Policy Controller | Fleet defaults supported |
| GKE Identity Service | Fleet defaults: command line only |
| Multi Cluster Ingress | Setup per feature guide |
| Multi-cluster Services | GKE clusters only |
| Continuous validation for Binary Authorization | Fleet defaults: preview, command line only |

## Notes

- The list is not exhaustive: fleet Workload Identity Federation needs fleet membership but no fleet-level configuration, and Cloud Service Mesh requires fleet membership for all control plane and setup options.
- Fleet defaults apply to GKE clusters registered during cluster creation; they are not applied automatically to existing member clusters (you can sync existing clusters from the Console Feature Manager page). Not every feature supports defaults through every tool: Console, gcloud, or Terraform (`google_gke_hub_feature` with `fleet_default_member_config`). Some features accept defaults through `fleet create` / `fleet update` parameters.
- Only features listed under "Manage other enterprise-ready features" in the Console can be disabled there. After disabling, configuration often remains on the cluster but can no longer be managed centrally. Disabling a fleet feature (for example mesh) is disruptive; try it on a disposable fleet first.
- Feature Authorizer: when you register a cluster, the applied manifest contains a `ClusterRoleBinding` that gives Feature Authorizer the `cluster-admin` role, attached to the service account `service-PROJECT_NUMBER@gcp-sa-gkehub.iam.gserviceaccount.com`. This is a broad grant limited to that Google-managed identity; restrict who can administer the fleet accordingly. When you disable a feature, Feature Authorizer deletes the feature's `ClusterRole` and `ClusterRoleBinding`. For non-GKE clusters, find where Kubernetes audit logs are stored and run a similar query.
- The source also shows Console (Feature Manager) steps, omitted here.
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/manage-features (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [fleet-features.md](./fleet-features.md)
- [fleet-creation.md](./fleet-creation.md)
- [secure.md](./secure.md)

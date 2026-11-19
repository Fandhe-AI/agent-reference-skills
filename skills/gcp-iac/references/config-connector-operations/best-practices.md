---
source: https://docs.cloud.google.com/config-connector/docs/best-practices
---

# Best practices for Config Connector

Two practices: manage Google Cloud API quota consumption (too many resources of one kind under one quota project can exceed API quotas because of the reconciliation strategy), and manage GKE node pools with `ContainerNodePool` instead of `ContainerCluster.nodeConfig` (which is immutable).

## Signature / Usage

### Manage API quota limits

If quota errors come from GET requests against managed Google Cloud resources, besides requesting a quota increase you can:

1. Increase the reconciliation interval. The recommendation is 1 hour (see the reconciliation page for the `cnrm.cloud.google.com/reconcile-interval-in-seconds` annotation).
2. Split resources into multiple projects.
3. Switch Config Connector to namespaced mode.

Splitting existing resources across projects:

1. Decide which resources to move.
2. Delete the Config Connector resources; make sure `cnrm.cloud.google.com/deletion-policy` is not set to `abandon`.
3. Update `spec.projectRef` or the `cnrm.cloud.google.com/project-id` annotation to the new projects.
4. Grant the IAM service account used by Config Connector proper permissions on the new projects.
5. Apply the updated YAML to create the resources.

Switching to namespaced mode (moving resources between namespaces):

1. Configure namespaced mode; create IAM service accounts in different projects and bind them to different namespaces.
2. Grant the new service accounts proper permissions on the project that contains the resources.
3. Decide which resources move to different namespaces.
4. Set the `cnrm.cloud.google.com/deletion-policy` annotation to `abandon` in their YAML.
5. Apply the YAML to update the deletion policy.
6. Abandon the resources.
7. Update `metadata.namespace` in their YAML.
8. Apply the YAML to acquire the abandoned resources.

### Manage node pools in GKE clusters

Set `remove-default-node-pool` on the cluster and define node settings in `ContainerNodePool`; set `state-into-spec: absent` on both resources:

```yaml
apiVersion: container.cnrm.cloud.google.com/v1beta1
kind: ContainerCluster
metadata:
  name: containercluster-sample
  annotations:
    cnrm.cloud.google.com/remove-default-node-pool: "true"
    cnrm.cloud.google.com/state-into-spec: absent
spec:
  description: A sample cluster.
  location: us-west1
  initialNodeCount: 1
```

```yaml
apiVersion: container.cnrm.cloud.google.com/v1beta1
kind: ContainerNodePool
metadata:
  labels:
    label-one: "value-one"
  name: containernodepool-sample
  annotations:
    cnrm.cloud.google.com/state-into-spec: absent
spec:
  location: us-west1
  autoscaling:
    minNodeCount: 1
    maxNodeCount: 3
  nodeConfig:
    machineType: n1-standard-1
    preemptible: false
    oauthScopes:
      - "https://www.googleapis.com/auth/logging.write"
      - "https://www.googleapis.com/auth/monitoring"
  clusterRef:
    name: containercluster-sample
```

## Options / Props

| Annotation | Value | Description |
|------------|-------|-------------|
| `cnrm.cloud.google.com/remove-default-node-pool` | `"true"` | Required on `ContainerCluster` to manage node pools with `ContainerNodePool`; removes the default node pool created with the cluster. |
| `cnrm.cloud.google.com/state-into-spec` | `absent` | Set on both `ContainerCluster` and `ContainerNodePool` to avoid reconciliation errors between the controller and the underlying APIs. |
| `cnrm.cloud.google.com/deletion-policy` | `abandon` | Keeps the Google Cloud resource when the Kubernetes object is deleted. |

## Notes

- Splitting existing resources across projects is risky: you delete and recreate resources, which can cause data loss for types such as `SpannerInstance` or `BigtableTable`. Back up data first and try it on a disposable project.
- In namespaced mode, to mitigate quota limits you can specify a different quota project as the `billingProject` and `requestProjectPolicy` for each `ConfigConnectorContext`, which avoids managing service accounts from different projects.
- Why `ContainerNodePool`: `nodeConfig`, `nodeConfig.labels` and `nodeConfig.taint` are immutable on the underlying Google Cloud API for the cluster, so updating them via `ContainerCluster` errors.
- Config Connector manages Google Cloud resources as Kubernetes objects; the GKE cluster itself and Config Sync are in `gcp-gke`.
- Source: https://docs.cloud.google.com/config-connector/docs/best-practices (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [reconciliation.md](./reconciliation.md)
- [managing-fields-externally.md](./managing-fields-externally.md)
- [troubleshooting.md](./troubleshooting.md)

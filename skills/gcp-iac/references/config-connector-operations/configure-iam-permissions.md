---
source: https://docs.cloud.google.com/config-connector/docs/how-to/configure-iam-permissions
---

# Access control with IAM for Config Connector

Config Connector authenticates through an IAM service account bound to a Kubernetes service account with Workload Identity Federation for GKE. Limiting that service account's permissions limits which resources Config Connector can create. You can use a single service account (cluster mode) or multiple (namespaced mode).

## Signature / Usage

Binding one IAM service account only to the Config Connector Kubernetes service account of one namespace (namespaced mode).

```bash
gcloud iam service-accounts add-iam-policy-binding \
    GSA_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --member="serviceAccount:PROJECT_ID.svc.id.goog[cnrm-system/cnrm-controller-manager-CC_NAMESPACE]" \
    --role="roles/iam.workloadIdentityUser"
```

## Options / Props

| Mode | Set in | Service accounts | When to choose |
|------|--------|------------------|----------------|
| Cluster mode | `ConfigConnector` CustomResource (GKE add-on or manual install) | One IAM service account for all projects and namespaces | Single service account managing multiple projects |
| Namespaced mode | `ConfigConnector` CustomResource | One IAM service account per namespace, each with a dedicated `cnrm-controller-manager` pod that impersonates it | Isolate IAM permissions per Kubernetes namespace; manage many resources across many projects on one cluster |

## Notes

- Caution from the source: a single service account across projects or namespaces is a shared privilege boundary; any user or workload that can create Config Connector resources in any namespace can act with the cluster-wide service account's permissions. For multi-tenant environments use namespaced mode.
- In namespaced mode, each IAM service account is bound to a namespace by default and Config Connector uses it for resources created in that namespace. Example: one IAM service account per project, resources of each project in one namespace.
- Your organization administrator might disable service account creation (Organization Policy); coordinate before installing.
- To configure namespaced mode, see "Installing Config Connector using a namespaced mode"; next step: organize resources by folder, project or organization.
- Source: https://docs.cloud.google.com/config-connector/docs/how-to/configure-iam-permissions (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/config-connector/docs/how-to/securing-access-to-resources (retrieved 2026-11-19).

## Related

- [securing-access-to-resources.md](./securing-access-to-resources.md)

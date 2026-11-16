---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/iam
---

# Create IAM allow policies

How to use Identity and Access Management (IAM) allow policies to authorize actions on GKE clusters. IAM works at project and organization level alongside Kubernetes RBAC, which controls granular access inside a cluster or namespace.

## Signature / Usage

### View the permissions granted by a role

```bash
gcloud iam roles describe roles/ROLE
```

Replace `ROLE` with any IAM role. GKE roles are prefixed with `roles/container`, such as `gcloud iam roles describe roles/container.admin`.

### Prerequisites

- Enable the Google Kubernetes Engine API.
- Install and initialize the gcloud CLI (`gcloud components update` for the latest version). Set the `compute/region` property (or `compute/zone` for zonal clusters) to avoid `One of [--zone, --region] must be supplied: Please specify location`.

## Options / Props

### Predefined GKE roles

| Role | Description |
|---|---|
| Kubernetes Engine Admin (`roles/container.admin`) | Full management of clusters and their Kubernetes API objects. To set a service account on nodes you also need `roles/iam.serviceAccountUser` on the user-managed service account the nodes use. Lowest-level resource: Project |
| Kubernetes Engine Cluster Admin (`roles/container.clusterAdmin`) | Management of clusters (`container.clusters.connect/create/delete/get/list/update`, `container.operations.*`, among others). Also needs `roles/iam.serviceAccountUser` to set a node service account. Lowest-level resource: Project |
| Kubernetes Engine Cluster Viewer (`roles/container.clusterViewer`) | Get and list GKE clusters |
| Kubernetes Engine Developer (`roles/container.developer`) | Access to Kubernetes API objects inside clusters. Lowest-level resource: Project |
| Kubernetes Engine Editor (`roles/container.editor`) | Editor role for container resources |
| Kubernetes Engine Viewer (`roles/container.viewer`) | Read-only access to resources within GKE clusters (nodes, pods, GKE API objects). Lowest-level resource: Project |
| Kubernetes Engine KMS Crypto Key User (`roles/container.cloudKmsKeyUser`) | Lets the Kubernetes Engine service agent in the cluster project call KMS with user-provided crypto keys to sign payloads |
| Kubernetes Engine Default Node Service Account (`roles/container.defaultNodeServiceAccount`) | Least-privilege role for the default service account of GKE nodes |
| Kubernetes Engine Host Service Agent User (`roles/container.hostServiceAgentUser`) | Lets the Kubernetes Engine service account in the host project configure shared network resources; also inspect firewall rules in the host project |

### Service agent roles

Grant these only to [service agents](https://docs.cloud.google.com/iam/docs/service-agents), never to other principals.

| Role | Description |
|---|---|
| Kubernetes Engine Default Node Service Agent (`roles/container.defaultNodeServiceAgent`) | Minimal permissions a GKE node needs for standard capabilities such as logging and monitoring; replaces `container.nodeServiceAgent` with a reduced permission set |
| \[Deprecated\] Kubernetes Engine Node Service Agent (`roles/container.nodeServiceAgent`) | Logging and monitoring export and image pulls |
| Kubernetes Engine Service Agent (`roles/container.serviceAgent`) | Lets the Kubernetes Engine account manage cluster resources, including access to service accounts |

### Other role types

| Type | Notes |
|---|---|
| Basic roles | Global, project-level access to all Google Cloud resources; use predefined roles whenever possible |
| Custom roles | Create when predefined roles don't fit; see https://docs.cloud.google.com/iam/docs/creating-custom-roles |

## Notes

- Role permission lists in the source are very long (hundreds of permissions per role); the full lists are in the IAM reference https://docs.cloud.google.com/iam/docs/roles-permissions/container and are omitted here. The source also shows Console steps.
- IAM works at project level, RBAC at cluster and namespace level. Connecting to a cluster needs the IAM permission `container.clusters.get`; an operation on Kubernetes resources inside the cluster is allowed when either RBAC or IAM grants it (GKE checks RBAC first, then IAM). See the source inconsistency below.
- Source inconsistency: this page says "IAM and RBAC can work together. An entity must have sufficient RBAC and IAM permissions to work with resources in your cluster", while the GKE RBAC page says users are authorized if they have sufficient permissions under either RBAC or IAM (see role-based-access-control.md and access-control.md). This page follows the RBAC page.
- Example use cases from the source: Compute Viewer for read-only node access; Kubernetes Engine Cluster Admin for `container.clusters.update`; Kubernetes Engine Viewer to run `kubectl get pods`; Service Account User on `PROJECT_NUMBER-compute@developer.gserviceaccount.com` so a user can create a cluster that attaches the Compute Engine default service account to nodes (see https://docs.cloud.google.com/kubernetes-engine/docs/how-to/hardening-your-cluster#use_least_privilege_sa for the least-privilege node service account guidance).
- Workload Identity Federation for GKE principals are granted roles with the principal identifier format covered in [workload-identity-concepts.md](./workload-identity-concepts.md).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/iam (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [role-based-access-control.md](./role-based-access-control.md)
- [workload-identity-concepts.md](./workload-identity-concepts.md)

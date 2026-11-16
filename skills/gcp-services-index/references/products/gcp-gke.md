---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-gke

## Signature / Usage

Owner skill: `gcp-gke` (status: 収録済み). gcloud groups: `anthos`, `container`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| Anthos | — | — | `anthos` | `anthos.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/anthos | 収録済み |
| Anthos Audit API | — | — | — | `anthosaudit.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/anthosaudit | 収録済み |
| Anthos Support | — | — | — | `anthossupport.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/anthossupport | 収録済み |
| Backup for GKE | `gkebackup.googleapis.com` (v1) | Backup for GKE is a managed Kubernetes workload backup and restore service for GKE clusters. | — | `gkebackup.` | 9 | — | — | https://cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke | 収録済み |
| Cloud Service Mesh | — | — | — | `anthosservicemesh.`, `meshconfig.`, `meshdataplane.`, `trafficdirector.` | 8 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/anthosservicemesh | 収録済み |
| Cloud Service Mesh control plane | — | — | — | `meshcontrolplane.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/meshcontrolplane | 収録済み |
| Config Management | — | — | — | `anthosconfigmanagement.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/anthosconfigmanagement | 収録済み |
| Container Security | — | — | — | `containersecurity.` | 2 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/containersecurity | 収録済み |
| Container Threat Detection | — | — | — | `containerthreatdetection.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/containerthreatdetection | 収録済み |
| GKE Dataplane Management | — | — | — | `gkedataplanemanagement.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/gkedataplanemanagement | 収録済み |
| GKE Hub | `gkehub.googleapis.com` (v1, v1alpha, v1beta, v1beta1, v2, v2alpha, v2beta) | — | — | `gkehub.` | 14 | — | — | https://cloud.google.com/anthos/multicluster-management/connect/registering-a-cluster | 収録済み |
| GKE Identity Service | — | — | — | `anthosidentityservice.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/anthosidentityservice | 収録済み |
| GKE Multi-Cloud | — | — | — | `gkemulticloud.` | 8 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/gkemulticloud | 収録済み |
| Google Distributed Cloud | `gkeonprem.googleapis.com` (v1) | — | — | `gkeonprem.` | 4 | — | — | https://cloud.google.com/anthos/clusters/docs/on-prem/ | 収録済み |
| Google Kubernetes Engine | `container.googleapis.com` (v1, v1beta1) | Builds and manages container-based applications, powered by the open source Kubernetes technology. | `container` | `container.` | 12 | — | — | https://cloud.google.com/kubernetes-engine/docs/ | 収録済み |
| Knative serving | — | — | — | `kuberun.` | 2 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/kuberun | 収録済み |
| KRM API Hosting | — | — | — | `krmapihosting.` | 5 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/krmapihosting | 収録済み |
| Kubernetes Metadata API | — | — | — | `kubernetesmetadata.` | 3 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/kubernetesmetadata | 収録済み |
| Multi-Cluster Ingress | — | — | — | `multiclusteringress.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/multiclusteringress | 収録済み |
| Multi-Cluster Metering | — | — | — | `multiclustermetering.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/multiclustermetering | 収録済み |
| Multi-Cluster Service Discovery | — | — | — | `multiclusterservicediscovery.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/multiclusterservicediscovery | 収録済み |
| Policy Controller | — | — | — | `anthospolicycontroller.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/anthospolicycontroller | 収録済み |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Lifecycle information covers only products confirmed against official pages as of 2026-11-14 (see `../lifecycle/shutdown-and-deprecated.md`); a product without a Lifecycle entry is not confirmed to be available. Check the official product page before use.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)

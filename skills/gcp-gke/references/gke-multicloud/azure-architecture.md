---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/concepts/architecture
---

# GKE on Azure architecture

GKE on Azure is a managed service that helps you provision, operate, and scale Kubernetes clusters in your Azure account. It uses Azure APIs to create the VMs, managed disks, virtual machine scale set, network security groups and load balancers a cluster needs. The page is for admins, architects and operators.

## Signature / Usage

### Create, describe and delete clusters

Use the Google Cloud CLI (`gcloud container azure`, https://docs.cloud.google.com/sdk/gcloud/reference/container/azure) or the GKE Multi-Cloud API (https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/reference/rest).

### Cluster components

GKE on Azure provisions clusters using private subnets inside your Azure Virtual Network.

| Component | Description |
| --- | --- |
| Control plane | High-availability, three replicas. Each replica runs `kube-apiserver`, `kube-controller-manager`, `kube-scheduler` and `etcd`. Each `etcd` instance stores data in an Azure Disk volume and uses a network interface to talk to other `etcd` instances. A standard load balancer balances traffic to `kube-apiserver`. You can create the control plane in multiple zones or in a single zone. |
| Node pools | Group of worker nodes with the same configuration (instance type, disk configuration, instance profile). All nodes in a pool run on the same subnet; for high availability provision multiple node pools across different subnets in the same Azure region. |

### Fleet membership

Each cluster is registered with a Fleet when created; the Fleet membership name equals the cluster name. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/connect-to-cluster:

```bash
gcloud container fleet memberships get-credentials CLUSTER_NAME
```

## Options / Props

| Item | Value |
| --- | --- |
| Authentication to Azure | Azure AD application and service principal with the required permissions, plus a client certificate the GKE Multi-Cloud API uses to authenticate as the service principal |
| Control plane replicas | 3 |
| Google Cloud resources | A Google Cloud project stores cluster configuration |

## Notes

- Warning kept from the source: soon after you delete a Google Cloud project, any cluster resources in Azure are permanently deleted. Use project liens (https://docs.cloud.google.com/resource-manager/docs/project-liens). This is destructive; try on a disposable project first.
- GKE on Azure support ends March 17, 2027 (see [azure-deprecation-announcement.md](./azure-deprecation-announcement.md)).
- Authentication overview: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/concepts/authentication
- Source (support end date): https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/concepts/architecture (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/connect-to-cluster (the source page itself has no code).

## Related

- [azure-docs.md](./azure-docs.md)
- [aws-architecture.md](./aws-architecture.md)
- [azure-deprecation-announcement.md](./azure-deprecation-announcement.md)

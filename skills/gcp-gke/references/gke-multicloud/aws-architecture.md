---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/concepts/architecture
---

# GKE on AWS architecture

GKE on AWS is a managed service that helps you provision, operate, and scale Kubernetes clusters in your AWS account. It uses AWS APIs to create the VMs, managed disks, Auto Scaling group, security groups and load balancers a cluster needs. The page is for admins, architects and operators.

## Signature / Usage

### Create, describe and delete clusters

Use the Google Cloud CLI (`gcloud container aws`, https://docs.cloud.google.com/sdk/gcloud/reference/container/aws) or the GKE Multi-Cloud API (https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/reference/rest).

### Cluster components

GKE on AWS provisions clusters using private subnets inside your AWS Virtual Private Cloud.

| Component | Description |
| --- | --- |
| Control plane | High-availability, three replicas. Each replica runs `kube-apiserver`, `kube-controller-manager`, `kube-scheduler` and `etcd`. Each `etcd` instance stores data in an EBS volume and uses a network interface to talk to other `etcd` instances. A standard load balancer balances traffic to `kube-apiserver`. |
| Node pools | Group of worker nodes with the same configuration (instance type, disk configuration, instance profile). All nodes in a pool run on the same subnet; for high availability provision multiple node pools across different subnets in the same AWS region. |

### Fleet membership

Each cluster is registered with a Fleet when created; the Fleet membership name equals the cluster name. Config Management and Cloud Service Mesh can be enabled within the Fleet. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/connect-to-cluster:

```bash
gcloud container fleet memberships get-credentials CLUSTER_NAME
```

## Options / Props

| Item | Value |
| --- | --- |
| Authentication to AWS | AWS IAM role in your AWS account with the required permissions, plus a service account in your Google Cloud project to establish trust for AWS IAM identity federation |
| Control plane replicas | 3 |
| Google Cloud resources | A Google Cloud project stores cluster configuration |

## Notes

- Warning kept from the source: soon after you delete a Google Cloud project, any cluster resources in AWS are permanently deleted. Use project liens (https://docs.cloud.google.com/resource-manager/docs/project-liens) to guard against accidental deletion. This is destructive; try on a disposable project first.
- GKE on AWS support ends March 17, 2027 (see [aws-deprecation-announcement.md](./aws-deprecation-announcement.md)).
- The page also shows a sample VPC diagram (NAT gateway, load balancer) and links to the "Create an AWS VPC" and Quickstart guides, and "Authentication overview" (https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/concepts/authentication).
- Source (support end date): https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/concepts/architecture (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/connect-to-cluster (the source page itself has no code).

## Related

- [aws-docs.md](./aws-docs.md)
- [azure-architecture.md](./azure-architecture.md)
- [aws-deprecation-announcement.md](./aws-deprecation-announcement.md)

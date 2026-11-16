---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs
---

# GKE Multi-Cloud documentation

GKE Multi-Cloud lets you create and manage Kubernetes clusters on AWS and Azure, and attach other CNCF-conformant clusters. GKE clusters integrate with cloud-provider resources such as load balancers and persistent storage, and you manage them from the Google Cloud console with a unified management, signaling and configuration control plane.

## Signature / Usage

### Entry points

- GKE on AWS: guides for clusters running on AWS infrastructure (see [aws-docs.md](./aws-docs.md)).
- GKE on Azure: guides for clusters running on Azure infrastructure (see [azure-docs.md](./azure-docs.md)).
- GKE attached clusters (any CNCF-conformant cluster): see [attached-docs.md](./attached-docs.md).
- Reference: Multi-Cloud API reference at https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/reference/rest

### Connect to a cluster in any cloud

With Connect gateway you connect to clusters in any cloud with your Google Cloud identity for authentication. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/connect-to-cluster:

```bash
gcloud container fleet memberships get-credentials CLUSTER_NAME
```

Replace `CLUSTER_NAME` with the name of the cluster whose connection credentials you want.

## Notes

- GKE on AWS and GKE on Azure support ends on March 17, 2027; see [aws-deprecation-announcement.md](./aws-deprecation-announcement.md) and [azure-deprecation-announcement.md](./azure-deprecation-announcement.md). GKE attached clusters is the path for continuing to use Google Cloud features.
- Source (support end date): https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement (retrieved 2026-11-16)
- Source (support end date): https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement (retrieved 2026-11-16)
- Former product naming: Anthos clusters (multi-cloud) is now GKE Multi-Cloud; the page images still say Anthos.
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/connect-to-cluster (the source page itself has no code).
- Other GKE cluster environments: https://docs.cloud.google.com/anthos/clusters/docs

## Related

- [aws-docs.md](./aws-docs.md)
- [azure-docs.md](./azure-docs.md)
- [attached-docs.md](./attached-docs.md)
- [connect-to-cluster.md](./connect-to-cluster.md)

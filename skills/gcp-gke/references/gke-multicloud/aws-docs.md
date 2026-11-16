---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/aws
---

# GKE on AWS documentation

GKE on AWS lets you manage GKE clusters running on AWS infrastructure through the GKE Multi-Cloud API. Combined with Connect, you manage GKE clusters on both Google Cloud and AWS from the Google Cloud console. When you create a cluster, Google creates the AWS resources you need and brings up the cluster on your behalf; you then deploy workloads with `gcloud` and `kubectl`.

## Signature / Usage

### Documentation map

| Section | Pages |
| --- | --- |
| Guides | Architecture ([aws-architecture.md](./aws-architecture.md)), Quickstart: Deploy an application, Prerequisites, Create a cluster, Create a cluster with Terraform, Create AWS IAM roles |
| Reference | Supported AWS instance types, Supported AWS regions, gcloud commands, AWS IAM role list |
| Resources | Troubleshooting, Get support, Release notes, Quotas and limits, Pricing (contact sales) |

All pages are under `https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/`. The gcloud command group is documented at https://docs.cloud.google.com/sdk/gcloud/reference/container/aws

### Registering an EKS cluster instead

GKE on AWS is deprecated (see Notes). To keep using Google Cloud features on an EKS cluster, attach it. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/eks/how-to/attach-cluster:

```bash
gcloud container attached clusters register CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --fleet-project=PROJECT_NUMBER \
  --platform-version=PLATFORM_VERSION \
  --distribution=eks \
  --issuer-url=ISSUER_URL \
  --context=KUBECONFIG_CONTEXT \
  --kubeconfig=KUBECONFIG_PATH
```

## Notes

- Deprecated: GKE on AWS support ends March 17, 2027 (maintenance mode since March 17, 2025). See [aws-deprecation-announcement.md](./aws-deprecation-announcement.md).
- Source (support end date): https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/aws (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/eks/how-to/attach-cluster (the source page itself has no code).

## Related

- [aws-architecture.md](./aws-architecture.md)
- [aws-deprecation-announcement.md](./aws-deprecation-announcement.md)
- [attach-cluster-eks.md](./attach-cluster-eks.md)

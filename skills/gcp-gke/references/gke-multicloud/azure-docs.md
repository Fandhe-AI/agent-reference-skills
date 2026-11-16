---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/azure
---

# GKE on Azure documentation

GKE on Azure lets you manage GKE clusters running on Azure infrastructure through the GKE Multi-Cloud API. Combined with Connect, you manage GKE clusters on both Google Cloud and Azure from the Google Cloud console. When you create a cluster, Google creates the Azure resources you need and brings up the cluster on your behalf; you then deploy workloads with `gcloud` and `kubectl`.

## Signature / Usage

### Documentation map

| Section | Pages |
| --- | --- |
| Guides | Quickstart: Deploy an application on GKE on Azure, Prerequisites, Create a cluster |
| Reference | Architecture ([azure-architecture.md](./azure-architecture.md)), Supported VM sizes, Supported regions, gcloud container azure commands |
| Resources | Get support, Release notes, Quotas and limits, Pricing |

All pages are under `https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/`. The gcloud command group is documented at https://docs.cloud.google.com/sdk/gcloud/reference/container/azure

### Registering an AKS cluster instead

GKE on Azure is deprecated (see Notes). To keep using Google Cloud features on an AKS cluster, attach it. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/aks/how-to/attach-cluster (private OIDC issuer):

```bash
gcloud container attached clusters register CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --fleet-project=PROJECT_NUMBER \
  --platform-version=PLATFORM_VERSION \
  --distribution=aks \
  --context=KUBECONFIG_CONTEXT \
  --has-private-issuer \
  --kubeconfig=KUBECONFIG_PATH
```

## Notes

- Deprecated: GKE on Azure support ends March 17, 2027 (maintenance mode since March 17, 2025). See [azure-deprecation-announcement.md](./azure-deprecation-announcement.md).
- Source (support end date): https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/azure (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/aks/how-to/attach-cluster (the source page itself has no code).

## Related

- [azure-architecture.md](./azure-architecture.md)
- [azure-deprecation-announcement.md](./azure-deprecation-announcement.md)
- [attach-cluster-aks.md](./attach-cluster-aks.md)

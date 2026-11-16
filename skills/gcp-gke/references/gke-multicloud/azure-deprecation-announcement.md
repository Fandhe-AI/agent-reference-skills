---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
---

# GKE on Azure deprecation announcement

GKE on Azure will no longer be supported on March 17, 2027. Google ceases maintenance and contracted support from that date, and APIs will be disabled.

## Signature / Usage

### Migrate to another Kubernetes distribution

1. Deploy new Kubernetes clusters with the same configuration as your GKE on Azure clusters; Config Sync or another GitOps solution keeps old and new identical.
2. Identify the workloads to migrate.
3. Deploy a single workload on the new cluster and update DNS so the old cluster points to the same workload on the new cluster.
4. Test the new workload.
5. Repeat the two preceding steps for all workloads.
6. After all workloads are migrated and tested, delete your GKE on Azure clusters (https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/how-to/delete-cluster).

To keep using Google Cloud features, use GKE attached clusters. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/aks/how-to/attach-cluster (private OIDC issuer):

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

## Options / Props

| Date | Phase |
| --- | --- |
| March 17, 2025 | Maintenance mode starts: bug and CVE fixes continue, support contracts continue, no new functionality except bug fixes |
| March 17, 2027 | Product no longer supported: no further upgrades or bug fixes, APIs disabled |

## Notes

- Deleting clusters is destructive; try the migration on a disposable cluster first.
- Contact: your lead customer engineer, a support case in the Google Cloud console, or Cloud Customer Care.
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/aks/how-to/attach-cluster (the source page itself has no code).

## Related

- [azure-docs.md](./azure-docs.md)
- [attach-cluster-aks.md](./attach-cluster-aks.md)
- [aws-deprecation-announcement.md](./aws-deprecation-announcement.md)

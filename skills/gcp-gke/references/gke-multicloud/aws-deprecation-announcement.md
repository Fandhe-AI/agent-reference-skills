---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement
---

# GKE on AWS deprecation announcement

GKE on AWS will no longer be supported on March 17, 2027. Google ceases maintenance and contracted support from that date, and APIs will be disabled.

## Signature / Usage

### Migrate to another Kubernetes distribution

1. Deploy new Kubernetes clusters with the same configuration as your GKE on AWS clusters; Config Sync or another GitOps solution keeps old and new identical.
2. Identify the workloads to migrate.
3. Deploy a single workload on the new cluster and update DNS so the old cluster points to the same workload on the new cluster.
4. Test the new workload.
5. Repeat the two preceding steps for all workloads.
6. After all workloads are migrated and tested, delete your GKE on AWS clusters (https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/how-to/delete-cluster).

To keep using Google Cloud features, use GKE attached clusters. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/eks/how-to/attach-cluster:

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

## Options / Props

| Date | Phase |
| --- | --- |
| March 17, 2025 | Maintenance mode starts: bug and CVE fixes continue, support contracts continue, no new functionality except bug fixes |
| March 17, 2027 | Product no longer supported: no further upgrades or bug fixes, APIs disabled |

## Notes

- Deleting clusters is destructive; try the migration on a disposable cluster first.
- Contact: your lead customer engineer, a support case in the Google Cloud console, or Cloud Customer Care.
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/eks/how-to/attach-cluster (the source page itself has no code).

## Related

- [aws-docs.md](./aws-docs.md)
- [attach-cluster-eks.md](./attach-cluster-eks.md)
- [azure-deprecation-announcement.md](./azure-deprecation-announcement.md)

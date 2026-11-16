---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/support
---

# Get support for attached clusters

Support options and the shared responsibility model for running production workloads on GKE attached clusters. Google Cloud offers support packages (24/7 coverage, phone support, technical support manager); see Cloud Customer Care at https://docs.cloud.google.com/support.

## Signature / Usage

### Upgrade sequentially

GKE supports sequential upgrades only (1.2 → 1.3 → 1.4, not 1.2 → 1.4). Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/update-cluster:

```sh
gcloud container attached clusters update CLUSTER_NAME \
  --location GOOGLE_CLOUD_REGION
```

## Options / Props

| Party | Responsibilities |
| --- | --- |
| Google | Provide the list of supported Kubernetes distributions and versions; notify users of available upgrades and produce upgrade instructions for the previous version; provide Google Cloud integrations for Connect and Google Cloud Observability; troubleshoot, provide workarounds and fix root causes of issues in Google-provided components |
| Customer | Provide a modern Kubernetes platform meeting Google's specifications (hardware, OS, Kubernetes API server, VPC configuration and more); maintain workloads (application code, build files, container images, data, RBAC/IAM allow policy, containers and pods); operate, maintain and patch infrastructure (networks, servers, storage, connectivity to Google Cloud) and anything needed to run the cluster; maintain third-party support contracts (networking, container orchestration, compute, storage vendors); upgrade Kubernetes to a supported version regularly; monitor clusters and applications and respond to incidents; keep clusters connected to Google services; provide environmental details (such as network configuration) for troubleshooting |

## Notes

- Supported versions: https://docs.cloud.google.com/kubernetes-engine/enterprise/docs/setup/attach-kubernetes-clusters#prerequisites
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/support (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/update-cluster (the source page itself has no code).

## Related

- [update-cluster.md](./update-cluster.md)
- [attached-concepts-overview.md](./attached-concepts-overview.md)

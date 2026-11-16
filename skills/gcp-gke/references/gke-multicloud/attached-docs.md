---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached
---

# GKE attached clusters documentation

GKE attached clusters manage any standard, CNCF-conformant Kubernetes installation, including clusters already in production, and add GKE features to standardize and secure clusters across clouds and Kubernetes vendors.

## Signature / Usage

### Capabilities

| Goal | Feature |
| --- | --- |
| Standardize | Automatically install Config Sync and Policy Controller so the platform team keeps configuration and security policy consistent; app teams keep their own continuous delivery tool. |
| Secure | Policy Controller and Cloud Service Mesh apply security and network configuration across clusters and enable intra-cluster telemetry. |
| Manage | Connect gateway reaches clusters across environments without proxies, inbound firewall rules, or bastion hosts. |

### Guide map

- EKS (AWS): attach ([attach-cluster-eks.md](./attach-cluster-eks.md)), connect, Config Management, Cloud Service Mesh, logging, monitoring, Binary Authorization.
- AKS (Azure): attach ([attach-cluster-aks.md](./attach-cluster-aks.md)), connect, Config Management, Cloud Service Mesh, logging, monitoring, Binary Authorization.
- Other distributions: attach ([attach-cluster-generic.md](./attach-cluster-generic.md)), connect ([connect-to-cluster.md](./connect-to-cluster.md)), logging ([install-cloud-logging.md](./install-cloud-logging.md)), monitoring ([install-cloud-monitoring.md](./install-cloud-monitoring.md)), support ([support.md](./support.md)).

### Register a generic cluster

Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/attach-cluster (private OIDC issuer):

```bash
gcloud container attached clusters register CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --fleet-project=PROJECT_NUMBER \
  --platform-version=PLATFORM_VERSION \
  --distribution=generic \
  --context=KUBECONFIG_CONTEXT \
  --has-private-issuer \
  --kubeconfig=KUBECONFIG_PATH
```

## Notes

- Policy Controller (referenced as a feature here) has support ending 2027-12-31; Config Sync, Policy Controller and Cloud Service Mesh installation guides live under `https://docs.cloud.google.com/anthos-config-management/docs/how-to/installing-config-sync` and `https://docs.cloud.google.com/service-mesh/docs/unified-install/install-anthos-service-mesh` (outside this category).
- Former names: Anthos Config Management is now Config Sync / Policy Controller; Anthos Service Mesh is now Cloud Service Mesh.
- The docs index also links "Impact of temporary disconnection from Google Cloud" (https://docs.cloud.google.com/anthos/docs/concepts/anthos-connectivity) and Pricing (https://cloud.google.com/contact).
- Source (Policy Controller end of support on December 31, 2027): https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/attach-cluster (the source page itself has no code).

## Related

- [attached-concepts-overview.md](./attached-concepts-overview.md)
- [attach-cluster-generic.md](./attach-cluster-generic.md)
- [multi-cloud-docs.md](./multi-cloud-docs.md)

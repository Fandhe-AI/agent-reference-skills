---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/multi-cluster-services
---

# Multi-cluster Services

Multi-cluster Services (MCS) is a cross-cluster Service discovery and invocation mechanism for GKE that builds on the existing Service object. Exported Services are reachable across fleet clusters through a virtual IP, like a ClusterIP Service, and MCS follows community multi-cluster Services APIs.

## Signature / Usage

To export a Service, create a `ServiceExport` with the same namespace and name as the Service (this manifest is from the how-to page):

```yaml
# export.yaml
kind: ServiceExport
apiVersion: net.gke.io/v1
metadata:
 namespace: NAMESPACE
 name: SERVICE_EXPORT_NAME
```

MCS then imports the Service into every cluster in the fleet, creating a `ServiceImport` (same namespace and name) and an Endpoints object (same namespace, random name).

## Options / Props

| Benefit | Description |
| --- | --- |
| High availability | Same Service across regions; requests fail over to other clusters |
| Stateful and stateless Services | Separate clusters for each |
| Shared Services | Shared Services (for example Prometheus, Vault) in one cluster used by all |
| Migration | Same Service in two clusters; traffic can shift between them |

## Notes

- MCS is a GKE feature that configures Cloud DNS zones and records for each exported Service in your fleet clusters. Exported Services always have one Cloud DNS record; exported Headless Services also have a record for each backend Pod with a hostname (including StatefulSet Pods). Cloud DNS incurs additional charges.
- Distinct from the Multi Cluster Ingress / Gateway load balancing products, which use MCS for endpoint discovery.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/multi-cluster-services (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/multi-cluster-services (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/how-to/multi-cluster-services (the source page has no code).

## Related

- [multi-cluster-services.md](./multi-cluster-services.md)
- [multi-cluster-ingress.md](./multi-cluster-ingress.md)
- [choose-mc-lb-api.md](./choose-mc-lb-api.md)

---
source: https://docs.cloud.google.com/service-mesh/docs/managed-control-plane-overview
---

# Managed control plane

Explains the architectural differences between the deprecated `ISTIOD` control plane implementation and the `TRAFFIC_DIRECTOR` implementation, and the next steps if your clusters still use a deprecated control plane.

## Signature / Usage

### Identify the implementation

Snippet taken from https://docs.cloud.google.com/service-mesh/docs/onboarding/provision-control-plane. The `implementation` field shows `ISTIOD` or `TRAFFIC_DIRECTOR`.

```bash
gcloud container fleet mesh describe --project FLEET_PROJECT_ID
```

## Options / Props

### Next steps by control plane

| Control plane | Status | Action |
|---|---|---|
| Managed, `TRAFFIC_DIRECTOR` | Current (Istio APIs, Gateway API or Google Cloud APIs) | None |
| Managed, `ISTIOD` | Deprecated | Inspect the fleet for compatibility blockers, update configuration, and complete managed control plane modernization, or uninstall managed Cloud Service Mesh |
| In-cluster control plane on GKE | Deprecated | Cannot be modernized in place; migrate to the managed control plane on a new cluster, or uninstall Cloud Service Mesh |

### Timeline

| Date | Event |
|---|---|
| May 23, 2024 | Anthos Service Mesh and Traffic Director converged into Cloud Service Mesh; `TRAFFIC_DIRECTOR` implementation introduced for Istio APIs |
| July 1, 2024 | New fleets began receiving `TRAFFIC_DIRECTOR` by default |
| September 8, 2024 | Provisioning of `ISTIOD` for new fleets ended for general availability (temporary exceptions for allowlisted organizations) |
| September 28, 2026 | Formal deprecation of managed `ISTIOD` and the in-cluster control plane on GKE |

## Notes

- Managed `ISTIOD` runs a single-cluster dedicated control plane; in-cluster `ISTIOD` runs customer-managed components in the cluster; both are deprecated.
- `TRAFFIC_DIRECTOR` uses Google Cloud's managed networking infrastructure instead of per-cluster control plane instances. Istio CRDs and the xDS sent to Envoy stay compatible.
- Operational characteristics: initial policy and service configuration propagation takes longer than with in-cluster or `ISTIOD` control planes (validated and propagated across Google Cloud systems first). Pod scaling and endpoint updates propagate directly without that latency. Multi-cluster endpoints are shared through Google Cloud rather than point-to-point between clusters.
- All managed `ISTIOD` fleets must complete modernization before the end-of-support deadline. Two paths: customer-triggered modernization (recommended for per-cluster control and staged traffic shifting) or Google-driven modernization (automated rollouts for eligible fleets).
- Uninstalling Cloud Service Mesh is destructive for mesh behavior; try it on a disposable cluster first.
- Source inconsistency: the next-steps table says `TRAFFIC_DIRECTOR` is "Current (Istio APIs, Gateway API or Google Cloud APIs)", while supported-features-managed.md lists "Kubernetes Gateway API | No | No" for both managed implementations. The source does not reconcile the two.
- Source: https://docs.cloud.google.com/service-mesh/docs/managed-control-plane-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/service-mesh/docs/onboarding/provision-control-plane (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [deprecations.md](./deprecations.md)
- [supported-features-managed.md](./supported-features-managed.md)
- [provision-control-plane.md](./provision-control-plane.md)

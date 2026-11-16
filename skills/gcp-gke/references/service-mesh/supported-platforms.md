---
source: https://docs.cloud.google.com/service-mesh/docs/supported-platforms
---

# Supported platforms

Describes the APIs and infrastructure options for Cloud Service Mesh across GKE/Kubernetes, Compute Engine, on-premises and other clouds, plus the platform versions supported by in-cluster Cloud Service Mesh 1.29 to 1.31.

## Signature / Usage

### Check the control plane of a fleet

Snippet taken from https://docs.cloud.google.com/service-mesh/docs/onboarding/provision-control-plane.

```bash
gcloud container fleet mesh describe --project FLEET_PROJECT_ID
```

## Options / Props

### API choice by infrastructure

| Workloads | Use |
|---|---|
| Exclusively on GKE | Istio APIs; install with the fleet API; choose MeshCA or CAS (all fleet clusters use the same CA); Service Mesh UI enabled automatically |
| VMs plus GKE, or proxyless gRPC | Service routing APIs (`Mesh`, `Gateway`, `Route`) |
| Off Google Cloud (Google Distributed Cloud software only for VMware or bare metal) | In-cluster control plane installed with `asmcli`; Istio APIs |

### In-cluster Cloud Service Mesh 1.31.x

| Platform | Version |
|---|---|
| GKE on Google Cloud | GKE 1.33-1.36; Standard clusters only (Autopilot is not supported by the in-cluster control plane; use managed Cloud Service Mesh); enroll in a release channel, preferably Regular |
| Google Distributed Cloud (software only) for bare metal 1.34-1.36 | Kubernetes 1.34-1.36 |
| Google Distributed Cloud (software only) for VMware 1.34-1.36 | Kubernetes 1.34-1.36 |

### In-cluster Cloud Service Mesh 1.30.x and 1.29.x

| Platform | Version |
|---|---|
| GKE on Google Cloud | GKE 1.33-1.36; Standard only |
| Google Distributed Cloud (software only) for VMware 1.34-1.36 | Kubernetes 1.34-1.36 |
| Google Distributed Cloud (software only) for bare metal 1.34-1.36 (deprecated) | Kubernetes 1.34-1.36 |
| GKE on AWS (deprecated) | Kubernetes 1.33-1.35 |
| GKE on Azure (deprecated) | Kubernetes 1.33-1.35 |
| GKE attached clusters (deprecated) | Amazon EKS on Kubernetes 1.33-1.35; Microsoft AKS on Kubernetes 1.34-1.35 |

## Notes

- New fleets use the global, managed control plane. Clusters added to an existing fleet use the same managed control plane implementation as the existing clusters.
- An unmanaged, in-cluster control plane on GKE on Google Cloud is deprecated. Do not use it for new deployments; migrate existing ones to managed Cloud Service Mesh.
- GKE on AWS and GKE on Azure will be shut down on March 17, 2027. Cloud Service Mesh support for EKS and AKS clusters ends on March 17, 2027.
- Other environments are unsupported for in-cluster 1.29 to 1.31. Managed Cloud Service Mesh environments are listed in the managed supported-features page.
- Former names: Google Distributed Cloud (software only) = Anthos clusters on VMware / bare metal.
- Source: https://docs.cloud.google.com/service-mesh/docs/supported-platforms (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/service-mesh/docs/onboarding/provision-control-plane (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [supported-features-managed.md](./supported-features-managed.md)
- [deprecations.md](./deprecations.md)

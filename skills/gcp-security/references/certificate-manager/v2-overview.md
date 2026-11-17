---
source: https://docs.cloud.google.com/certificate-manager/docs/v2/overview
---

# Certificate Manager (2nd gen) overview

Certificate Manager (2nd gen) centralizes management, deployment, and automation of SSL/TLS certificates across Google Cloud services, custom workloads, and on-premises environments. This page also covers the comparison with first-generation Certificate Manager (merged from the "Compare Certificate Manager versions" page).

Preview: the product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms; Pre-GA features are available "as is" and might have limited support.

## Signature / Usage

### Create an issuance configuration (CA Service CA pool)

```bash
gcloud certificate-manager issuance-configs create my-cic \
    --ca-pool=my-ca-pool
```

## Options / Props

### Features

| Feature | Description |
|---|---|
| Monitor certificates | Console Overview page: active certificates per service, certificates nearing expiration, distribution of cryptographic algorithms |
| Search and discover | Certificates page lists all certificates, including those not issued by Certificate Manager; filter by resource type, expiration status, management status |
| Automate lifecycles | Issuance configurations define certificate lifetime, key algorithm, and rotation window for auto-managed rotation |
| Secure workload communication | Trust configurations define and distribute trust anchors (root and intermediate CA certificates) |

### Supported Google Cloud services

| Model | Services |
|---|---|
| Certificate Manager (2nd gen) auto-manages | GKE and Compute Engine (managed workload identity-enabled environments); Cloud Load Balancing (TLS provisioning and renewal via issuance configurations, including mTLS between Application Load Balancers and backends) |
| CA Service auto-manages; 2nd gen observes | Vertex AI Agent Engine and Gemini Enterprise (Agent Identity-enabled environments); Cloud SQL; Secure Web Proxy; Cloud Service Mesh; GKE control plane authority |

### API namespaces

| Namespace | Resources |
|---|---|
| `v2` | Observed Certificates API (`v2/projects.locations.observedCertificates`) |
| `v1` | Certificate (`certificates`), Certificate Map (`certificateMaps`), Certificate Issuance Config (`certificateIssuanceConfigs`), Trust Config (`trustConfigs`) |

### 2nd gen vs first generation

| Feature | Certificate Manager (2nd gen) | Certificate Manager |
|---|---|---|
| Primary goal | Enterprise-wide certificate observability and lifecycle management | Secure load balancers |
| Centralized observability | Yes, all detected certificates | Limited; certificates configured for load balancers |
| Multi-service support | Yes: GKE, Compute Engine, Vertex AI Agent Engine, load balancers | No; only load balancers |
| Views | Advanced summary dashboard (expiration, algorithms, health) | List views only |

## Notes

- Second-generation features are fully supported and manageable in the Google Cloud console. Existing first-generation APIs aren't deprecated; the gcloud CLI, Terraform, and direct HTTP API calls continue to work for first-generation features.
- If your goal is strictly to secure load balancer certificates, you can continue using Certificate Manager; you can switch between versions.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/certificate-manager/issuance-configs/create (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/certificate-manager/docs/v2/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/certificate-manager/docs/v2/comparison (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [core-components.md](./core-components.md)

---
source: https://docs.cloud.google.com/service-mesh/docs/security/security-overview
---

# Cloud Service Mesh security overview

Cloud Service Mesh with Istio APIs (not Google Cloud APIs) encrypts, mutually authenticates and authorizes communication between workloads, giving service-aware and request-aware network security independent of the underlying network, in line with Zero Trust principles, through declarative policies and no application changes.

## Signature / Usage

### Label a namespace so workloads get sidecars (and mTLS)

Snippet taken from https://docs.cloud.google.com/service-mesh/docs/onboarding/provision-control-plane.

```bash
kubectl label namespace NAMESPACE \
    istio.io/rev- istio-injection=enabled --overwrite
```

## Options / Props

| Feature | Detail |
|---|---|
| mTLS peer authentication | Auto mTLS is on by default: a client sidecar sends mTLS to workloads with sidecars and plain text otherwise. Services still accept both plain text and mTLS; migrate services to accept only mTLS to secure the mesh |
| Certificate and key rotation | Automatic, without disrupting communications; shorter refresh intervals configurable |
| Cloud Service Mesh certificate authority | Managed multi-regional private CA; single root of trust across clusters; workload identity pools give coarse-grained isolation (authentication fails by default across pools); certificates carry project ID, GKE namespace and GKE service account name |
| Certificate Authority Service | Alternative: different CAs per cluster, managed HSM-backed keys, regulated industries, chaining to a custom enterprise root; billed separately with an explicit SLA; all mesh workloads get `privateca.workloadCertificateRequester` and `privateca.auditor` |
| Identity-aware access control | Policies by mTLS identity rather than IP; only communications across clusters in the same Google Cloud project are supported |
| Request-claims-aware access control | Allow by JWT claims in HTTP or gRPC requests |
| User authentication with IAP | For services exposed on an ingress gateway; short-lived JWT or RCToken |
| User authentication with an existing IdP | Browser-based end-user authentication and access control |
| Access logging and monitoring | Logs and metrics in Google Cloud Observability, with a dashboard |
| FIPS | Data plane uses FIPS 140-3 validated encryption modules |

## Notes

- Limitation: IAP user authentication requires the service to be published to the internet. For services exposed only inside the network, configure a custom policy engine for user authentication and token issuance.
- Certificates from the mesh CA must only be used for service-to-service communication within the mesh; do not use them outside it.
- Security benefits: mTLS certificates are bound to the TLS channel (no replay without private keys), encryption in transit for TCP, only authorized identities or namespaces reach sensitive services, and access logs capture the client mTLS identity.
- Next pages named by the source: security best practices, configure transport security, update authorization policies.
- Source: https://docs.cloud.google.com/service-mesh/docs/security/security-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/service-mesh/docs/onboarding/provision-control-plane (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [provision-control-plane.md](./provision-control-plane.md)
- [supported-features-managed.md](./supported-features-managed.md)
- [overview.md](./overview.md)

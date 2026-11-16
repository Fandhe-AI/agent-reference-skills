---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/gateway-security
---

# Gateway security

Methods for securing GKE Gateways: TLS termination at the Gateway (with optional BackendTLSPolicy re-encryption) or TLS passthrough to backend Pods with TLSRoute. Covers certificate management options (Kubernetes Secrets, SSL certificates, Certificate Manager) and per-GatewayClass TLS support.

## Signature / Usage

The page has no manifests. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/how-to/configure-gateway-resources: attach an SSL policy (client-to-load-balancer TLS) to a Gateway with a GCPGatewayPolicy. Create the SSL policy first; for a regional Gateway use a regional SSL policy.

```yaml
apiVersion: networking.gke.io/v1
kind: GCPGatewayPolicy
metadata:
  name: my-gateway-policy
  namespace: team1
spec:
  default:
    sslPolicy: gke-gateway-ssl-policy
  targetRef:
    group: gateway.networking.k8s.io
    kind: Gateway
    name: my-gateway
```

## Options / Props

### TLS termination vs TLS passthrough

| Aspect | TLS termination | TLS passthrough |
| --- | --- | --- |
| Listener | `protocol: HTTPS`, `tls.mode: Terminate` | `protocol: TLS`, `tls.mode: Passthrough` |
| Certificates | Attached to the Gateway (Secrets, SSL certificates, Certificate Manager) | None on the Gateway; backend app terminates TLS |
| Layer | Layer 7; HTTPRoute | Layer 4; TLSRoute routes by SNI hostname |
| Edge services | Cloud Armor, WAF rules, Cloud CDN | Not available (no Layer 7 inspection) |
| Backend encryption | Optional BackendTLSPolicy | End-to-end by the backend |

### Certificate limits

| Method | Limit |
| --- | --- |
| Kubernetes Secrets or Compute Engine `SslCertificate` | At most 15 certificates per Gateway |
| Certificate Manager | Up to 10,000,000 certificates per load balancer (with a quota increase request) |

### SSL certificate scope per GatewayClass

| GatewayClass | Scope | Location |
| --- | --- | --- |
| `gke-l7-global-external-managed`, `-mc`, `gke-l7-gxlb`, `-mc` | Global SSL certificate | Global |
| `gke-l7-regional-external-managed`, `-mc`, `gke-l7-rilb`, `gke-l7-cross-regional-internal-managed-mc` | Regional SSL certificate | Same region as the Gateway |

### TLS support per GatewayClass

| Capability | Global classes (`gke-l7-global-external-managed`, `-mc`, `gke-l7-gxlb`, `-mc`) | Regional classes (`gke-l7-regional-external-managed`, `-mc`, `gke-l7-rilb`, `-mc`) | `gke-l7-cross-regional-internal-managed-mc` |
| --- | --- | --- | --- |
| TLS passthrough (TLSRoute) | Not supported | Supported | Supported |
| Self-managed certificates with Kubernetes Secrets | Supported | Supported | Not supported |
| Self-managed Compute Engine SSL certificates | Supported | Supported | Not supported |
| Google-managed Compute Engine SSL certificates | Supported | Not supported | Not supported |
| Self-managed SSL certificates with Certificate Manager | Supported | Supported | Supported |
| Google-managed SSL certificates with Certificate Manager | Supported | Supported | Supported |

## Notes

- Kubernetes Secret requirements: listener `port` 443 and `protocol` `HTTPS`, `listener.tls.mode: Terminate`, and the credentials referenced in the `listeners.tls` block (`spec.listeners[].tls.certificateRefs[]`; the source writes `Gateway.spec.tls.certificateRef`, see the correction below). Limitations: only HTTPS listeners terminate with the Secrets; multiple HTTPS listeners on one Gateway need unique hostnames; only one hostname may be omitted or `*` per port and protocol pair; one default certificate per Gateway.
- The scope and location of an SSL certificate must match the Gateway (a global certificate cannot be used by a regional Gateway). Google-managed SSL certificates are not compatible with regional Gateways; use Certificate Manager.
- Certificate Manager lets a Gateway reference a `CertificateMap`, improves propagation times and supports Cloud Monitoring for expired certificates.
- The source table has no value for `gke-l7-rilb-mc` in the certificate scope table (cell is empty); the TLS support table groups it with the regional classes.
- Authorization (Preview, subject to Pre-GA Offerings Terms): GCPAuthzPolicy defines `ALLOW` or `DENY` rules for north-south traffic; GCPAuthzExtension enables inline callouts to external authorization engines such as Identity-Aware Proxy.
- Platform admins control domains, certificates and whether HTTPRoute owners may set their own hostnames; application developers control the hostname that generates a certificate if the Gateway permits it.
- TLS passthrough suits compliance cases where private keys cannot be shared with cloud infrastructure, or non-HTTP TLS protocols.
- These are Kubernetes Gateway API resources on GKE, not an HTTP framework router (`hono`, `fastify`) and not Cloud Load Balancing configured directly (planned `gcp-networking`).
- TLSRoute on the multi-cluster classes: multi-cluster-gateways.md (fleet-multi-cluster) lists TLSRoute as supported on `gke-l7-regional-external-managed-mc`, `gke-l7-rilb-mc` and `gke-l7-cross-regional-internal-managed-mc`, consistent with the table above; see choose-mc-lb-api.md for the comparison page and its Source inconsistency note.
- Corrected from the official docs: the source names the field `Gateway.spec.tls.certificateRef`. Gateway manifests in the GKE how-to set Secrets per listener as `spec.listeners[].tls.certificateRefs[]` (a list, for example `certificateRefs: - name: store-example-com` under a listener with `tls.mode: Terminate`); use that path.
- Source (`listeners[].tls.certificateRefs`): https://docs.cloud.google.com/kubernetes-engine/docs/how-to/deploying-gateways (retrieved 2026-11-16)
- Source (multi-cluster Gateway GatewayClasses and TLSRoute): https://docs.cloud.google.com/kubernetes-engine/docs/concepts/multi-cluster-gateways (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/gateway-security (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/configure-gateway-resources (snippet; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [gateway-api.md](./gateway-api.md)
- [configure-gateway-resources.md](./configure-gateway-resources.md)

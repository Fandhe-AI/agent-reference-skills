---
source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/secure
---

# Secure your fleet

Overview of fleet security: authenticating to fleet clusters (Google identity through Connect gateway, third-party providers through GKE Identity Service, bearer tokens), monitoring security posture, and enforcing cluster policies.

## Signature / Usage

Discover registered clusters and fetch Connect gateway credentials with a Google identity:

```bash
gcloud container fleet memberships list
```

```bash
gcloud container fleet memberships get-credentials membership-name
```

## Options / Props

| Need | Option |
|---|---|
| Authenticate with Google Cloud | All GKE clusters on Google Cloud accept Google Cloud user and service account identities by default; Connect gateway lets users and service accounts authenticate to any registered cluster with their Google Cloud ID |
| Authenticate with third-party providers | GKE Identity Service: all OpenID Connect (OIDC) providers (for example Okta, Microsoft AD FS), preview LDAP support in some environments; per-cluster or one fleet-wide configuration where supported |
| Authenticate with a bearer token | Kubernetes service account bearer token, when the Google-provided options do not fit |
| Fine-grained access | Kubernetes RBAC after authentication is set up |
| Fleet security features | Binary Authorization (trusted images only), Kubernetes network policies, Cloud Service Mesh service access control, GKE security posture dashboard (configuration auditing; some features manageable at fleet level) |
| Cluster policies | Policy Controller: programmable guardrails that block Kubernetes API changes that violate security, operational or compliance controls |

## Notes

- The security posture dashboard shows concerns for all clusters in the selected fleet and for standalone GKE clusters in the selected project.
- Policy Controller support ends 2027-12-31 per the current Google Cloud deprecation schedule; the source page itself does not state this, so check the Policy Controller documentation before relying on it.
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/enterprise/multicluster-management/gateway (the source page has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller (retrieved 2026-11-16; states Policy Controller end of support on December 31, 2027)
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/secure (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/enterprise/multicluster-management/gateway (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-gateway.md](./connect-gateway.md)
- [gke-identity-service.md](./gke-identity-service.md)
- [manage-features.md](./manage-features.md)

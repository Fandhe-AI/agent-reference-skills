---
source: https://docs.cloud.google.com/iam/docs/google-identities
---

# Identity Management for Google Cloud (User, Workload, Agent Identities)

Methods for configuring identities that Google Cloud recognizes.

## Signature / Usage

Choosing a workload identity method by location:

```text
On Google Cloud:
  - Workload Identity Federation for GKE (Kubernetes service accounts, no impersonation needed)
  - Attached service accounts (default identity of the resource)
  - Short-lived service account credentials (OAuth 2.0 access tokens, OIDC ID tokens)
Outside Google Cloud:
  - Workload Identity Federation (credentials from an external IdP -> short-lived credentials)
  - Service account keys (last resort)
```

## Options / Props

| Category | Method | Summary |
|---|---|---|
| User | Cloud Identity / Google Workspace accounts | Managed user accounts |
| User | Federation via Cloud Identity or Workspace | External identities synced (for example with GCDS); users need two accounts |
| User | Workforce Identity Federation | External IdP sign-in; one account |
| Workload | Workload Identity Federation | IdP-provided identity (AWS, Azure, GitHub, GKE) |
| Workload | Service accounts | Grant access to the service account, workload uses it |
| Workload | Managed workload identities | Attested identities for Compute Engine mTLS; cannot authenticate to Google Cloud APIs |
| Agent | Agent identities | SPIFFE-based identity tied to an agent's lifecycle and hosting resource URI |

## Notes

- Granting a role to a Workspace email alias grants it to the primary email and reveals the primary email; you cannot grant to only the alias.
- Service account keys are a security risk; choose more secure alternatives, and validate externally sourced keys before use.
- Source: https://docs.cloud.google.com/iam/docs/google-identities
- Retrieved 2026-11-14. Content CC BY 4.0.

## Related

- [groups-best-practices.md](./groups-best-practices.md)
- [../workload-and-workforce-federation/workload-identity-federation-pools.md](../workload-and-workforce-federation/workload-identity-federation-pools.md)
- [../workload-and-workforce-federation/managed-workload-identity.md](../workload-and-workforce-federation/managed-workload-identity.md)

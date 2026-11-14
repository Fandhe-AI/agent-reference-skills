---
source: https://docs.cloud.google.com/iam/docs/managed-workload-identity
---

# Managed Workload Identities (SPIFFE)

Managed workload identities bind strongly attested identities to GKE and Compute Engine workloads (and agent identities). Google Cloud provisions X.509 credentials and trust anchors from Certificate Authority Service for mTLS between workloads.

## Signature / Usage

SPIFFE ID formats:

```text
Compute Engine: spiffe://POOL_ID.global.PROJECT_NUMBER.workload.id.goog/ns/NAMESPACE_ID/sa/MANAGED_IDENTITY_ID
GKE:            spiffe://PROJECT_ID.svc.id.goog/ns/KUBERNETES_NAMESPACE/sa/KUBERNETES_SERVICE_ACCOUNT
Agent identity: spiffe://agents.global.org-ORGANIZATION_ID.system.id.goog/resources/aiplatform/projects/PROJECT_NUMBER/locations/LOCATION/reasoningEngines/AGENT_NAME
```

## Options / Props

| Concept | Description |
|---|---|
| Workload identity pool | Trust boundary and SPIFFE trust domain; create one per environment (dev, staging, prod) |
| Namespace | Administrative boundary within a pool for organizing and granting access to related identities |
| Attestation policy | Defines which workloads can get a credential based on verifiable attributes (project ID, resource name). Required for Compute Engine; managed automatically for GKE |
| Features | Managed workload identities for GKE (Preview), for Compute Engine, and agent identities |

## Notes

- Based on SPIFFE for interoperability across heterogeneous environments.
- Setup guides are separate pages (Compute Engine, GKE); agent identity is documented with the Agent Platform runtime.
- Distinct from Workload Identity Federation for external workloads and from service account keys.
- Source: https://docs.cloud.google.com/iam/docs/managed-workload-identity
- Retrieved 2026-11-14. Content CC BY 4.0.

## Related

- [workload-identity-federation-pools.md](./workload-identity-federation-pools.md)
- [workforce-identity-federation-pools.md](./workforce-identity-federation-pools.md)

---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/concepts/workload-identity
---

# Workload Identity Federation for GKE attached clusters

Workload Identity Federation for GKE (WIF) lets workloads in a cluster access external cloud resources with Kubernetes service accounts (KSAs) and short-lived tokens. It is the recommended way for applications in GKE attached clusters to access Google Cloud services. Registering the cluster creates all the infrastructure required, for clusters with either public or private OIDC issuers. All GKE components that connect back to Google Cloud (Connect, telemetry agents) use it.

## Signature / Usage

### KSA principal identifier

Registration adds the cluster's OIDC service to the default workload identity pool of your project, named `PROJECT_ID.svc.id.goog`. KSA principals have this format:

```text
principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/WORKLOAD_IDENTITY_POOL_NAME/subject/ns/KSA_NAMESPACE/sa/KSA_NAME
```

### Grant a role to a KSA

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/subject/ns/KSA_NAMESPACE/sa/KSA_NAME" \
  --role=IAM_ROLE
```

## Options / Props

| Placeholder | Description |
| --- | --- |
| `PROJECT_ID` | Google Cloud project ID associated with the attached cluster |
| `PROJECT_NUMBER` | Google Cloud project number (not the ID) |
| `KSA_NAMESPACE` | Cluster namespace the service account resides in |
| `KSA_NAME` | Name of the Kubernetes service account to grant permissions to |
| `IAM_ROLE` | IAM role to grant to the KSA |

## Notes

- Workload Identity Federation for GKE on attached clusters is distinct from Workload Identity Federation for external workloads (AWS / Azure / OIDC), which is covered by the `gcp-foundation` skill.
- `PROJECT_NUMBER` goes in the `projects/` segment and `PROJECT_ID` forms the pool name `PROJECT_ID.svc.id.goog`; mixing them breaks the binding. Grant least-privilege roles, not `roles/owner` or `roles/editor`.
- The source shows the principal format as an indented (non-fenced) block; it is fenced here with the same text.
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/concepts/workload-identity (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [attached-concepts-overview.md](./attached-concepts-overview.md)
- [attach-cluster-generic.md](./attach-cluster-generic.md)

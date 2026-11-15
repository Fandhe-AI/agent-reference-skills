---
source: https://docs.cloud.google.com/iam/docs/workload-identities
---

# Workload identity types

Overview of the identity types for workloads on Google Cloud and external workloads, and which to choose depending on where the workload runs.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/iam/docs/workload-download-cred-and-grant-access (grant a federated identity direct access to a resource):

```
gcloud storage buckets add-iam-policy-binding BUCKET_ID \
    --role=roles/storage.objectViewer \
    --member="principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT"
```

## Options / Props

| Identity type | Where | Description |
|---------------|-------|-------------|
| Workload Identity Federation | External workloads (AWS, Azure, GitHub, GitLab, Active Directory) and Google Cloud | Federated identities authenticated by an external IdP; short-lived credentials; direct resource access or service account impersonation. Preferred for external workloads. |
| Workload Identity Federation for GKE | GKE only | Grants IAM roles to Kubernetes service accounts directly, or via IAM service account impersonation. |
| Attached service accounts | Google Cloud resources | A user-managed service account used as the resource's default identity; usually set at resource creation and not changeable afterwards (Compute Engine instances are the exception). |
| Managed workload identities | Compute Engine and GKE | Strongly attested identities, for example for mTLS between workloads. |
| Agent identities | Agentic workloads | Google-managed, attested identities tied to the agent lifecycle; safer than service accounts for agents. |
| Service account keys | Google Cloud or external | Key-based authentication as a service account; a security risk if not managed correctly. |

## Notes

- On Google Cloud choose among: attached service accounts, Workload Identity Federation for GKE (GKE only), managed workload identities (Compute Engine and GKE only), service account keys. External workloads: Workload Identity Federation (preferred) or service account keys.
- Prefer a more secure alternative to service account keys whenever possible; if you must use one, you are responsible for protecting it, and externally sourced keys must be validated before use. Key creation may be disabled by the organization's secure-by-default policy.
- Most Google Cloud APIs support direct resource access for federated identities; some methods have limitations (see supported products and limitations).
- Local development uses user credentials or a service account through application default credentials.
- Source: https://docs.cloud.google.com/iam/docs/workload-identities (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [Grant access and download credential config](./wif-grant-access-and-download-config.md)
- [Other clouds and Kubernetes](./wif-other-clouds-and-kubernetes.md)

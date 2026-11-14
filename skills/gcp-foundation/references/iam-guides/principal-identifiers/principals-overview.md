---
source: https://docs.cloud.google.com/iam/docs/principals-overview
---

# IAM Principals Overview

A principal represents one or more identities that have authenticated to Google Cloud. To use one in a policy: configure identities Google Cloud recognizes (users or workloads), determine the identifier format for the principal and policy type, and include the identifier in the policy.

## Signature / Usage

Examples from the page for a single principal across policy types.

Adapted (not in the official docs): in the GKE example the pool name and cluster path use the project ID (`example-project`) instead of the project number, since the GKE workload pool is `PROJECT_ID.svc.id.goog`; only the `projects/` segment before `locations/global/workloadIdentityPools` is the project number.

```text
Allow policies:  user:alex@example.com
Deny policies:   principal://goog/subject/alex@example.com

Allow policies:  serviceAccount:my-service-account@my-project.iam.gserviceaccount.com
Deny policies:   principal://iam.googleapis.com/projects/-/serviceAccounts/my-service-account@my-project.iam.gserviceaccount.com

Allow policies:  group:my-group@example.com
Deny policies:   principalSet://goog/group/my-group@example.com

Allow policies:  domain:example.com
Deny policies:   principalSet://goog/cloudIdentityCustomerId/C01Abc35
PAB policies:    //iam.googleapis.com/locations/global/workspace/C01Abc35

All GKE Pods in a cluster (allow policy):
principalSet://iam.googleapis.com/projects/123456789012/locations/global/workloadIdentityPools/example-project.svc.id.goog/kubernetes.cluster/https://container.googleapis.com/v1/projects/example-project/locations/global/clusters/example-gke-cluster

Project principal set (PAB policy):
//cloudresourcemanager.googleapis.com/projects/example-project
```

## Options / Props

Principal types and policy support:

| Principal type | Single / set | Managed by | Allow | Deny | PAB |
|---|---|---|---|---|---|
| Google Account | Single | Google | Yes | Yes | No |
| Service account | Single | Google | Yes | Yes | No |
| Set of service accounts (project/folder/org) | Set | Google | Yes | Yes | No |
| Set of service agents | Set | Google | No | Yes | No |
| Google group | Set | Google | Yes | Yes | No |
| Domain | Set | Google | Yes | Yes | Yes |
| `allAuthenticatedUsers` | Set | Google | Some resources | No | No |
| `allUsers` | Set | Both | Some resources | Yes | No |
| Workforce pool, single | Single | Federated | Yes | Yes | No |
| Workforce pool, set | Set | Federated | Yes | Yes | Yes |
| Workload pool, single | Single | Federated | Yes | Yes | No |
| Workload pool, set | Set | Federated | Yes | Yes | Yes |
| GKE Pods | Set | Federated | Yes | No | No |
| Agent identity | Single | Google | Yes | Yes | No |
| Set of agent identities | Set | Google | Yes | No | Yes (project only) |
| Resource Manager principal sets | Set | Both | No | No | Yes |

## Notes

- Corrected from the official docs: the GKE example used the project number in the workload pool name and cluster path; the pool is `PROJECT_ID.svc.id.goog` and the cluster path uses the project ID (see `principal-identifier-formats.md`).
- Email aliases of a Google Account are replaced with the primary email in policies.
- Google groups and domains have no credentials and cannot establish identity for a request.
- Domains are tracked by customer ID, so primary and secondary domains cannot be managed separately; a secondary domain name in an allow policy is replaced by the primary one.
- Organizations created on or after May 3, 2024 do not allow granting roles to `allUsers` / `allAuthenticatedUsers` by default (default of the `iam.managed.allowedPolicyMembers` constraint). `allAuthenticatedUsers` excludes federated identities; use `allUsers` or the pool's all-identities identifier instead.
- Resource Manager principal sets: project (service accounts and workload pools in the project), folder (same, for any project in the folder), organization (all domains of the customer ID, workforce pools, and service accounts and workload pools in any project).
- Agent identities are Preview (Pre-GA terms). Grant `allUsers` only for intentionally public resources.
- Source: https://docs.cloud.google.com/iam/docs/principals-overview
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [principal-identifier-formats.md](./principal-identifier-formats.md)
- [user-identities.md](./user-identities.md)

---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-devops

## Signature / Usage

Owner skill: `gcp-devops` (status: 収録済み). gcloud groups: `app-lifecycle-manager`, `app-optimize`, `apphub`, `artifacts`, `builds`, `deploy`, `design-center`, `developer-connect`, `software-delivery-trust`, `source`, `source-manager`, `workload-manager`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| App Hub | `apphub.googleapis.com` (v1, v1alpha) | App Hub lets you build, operate, and manage applications on Google Cloud. | `apphub` | `apphub.` | 4 | — | — | https://cloud.google.com/app-hub/docs/ | 収録済み |
| Application Design Center | — | — | — | `designcenter.` | 8 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/designcenter | 収録済み |
| Artifact Registry | `artifactregistry.googleapis.com` (v1, v1beta1, v1beta2) | Store and manage build artifacts in a scalable and integrated service built on Google infrastructure. | `artifacts` | `artifactregistry.` | 12 | — | — | https://cloud.google.com/artifacts/docs/ | 収録済み |
| Cloud Build | `cloudbuild.googleapis.com` (v1, v2) | Creates and manages builds on Google Cloud Platform. | `builds` | `cloudbuild.` | 20 | — | — | https://cloud.google.com/cloud-build/docs/ | 収録済み |
| Cloud Deploy | `clouddeploy.googleapis.com` (v1) | — | `deploy` | `clouddeploy.` | 12 | — | — | https://cloud.google.com/deploy/ | 収録済み |
| Cloud Source Repositories | — | — | `source` | `source.`, `sourcerepo.` | 6 | — | Deprecated | https://docs.cloud.google.com/iam/docs/roles-permissions/source | 収録済み |
| Container Registry | — | — | — | `containerregistry.` | 1 | — | Shut down | https://docs.cloud.google.com/iam/docs/roles-permissions/containerregistry | 収録済み |
| Developer Connect | `developerconnect.googleapis.com` (v1) | Connect third-party source code management to Google | `developer-connect` | `developerconnect.` | 14 | — | — | http://cloud.google.com/developer-connect/docs/overview | 収録済み |
| Progressive Rollout | — | — | — | `progressiverollout.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/progressiverollout | 収録済み |
| Remote Build Execution | — | — | — | `remotebuildexecution.` | 13 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/remotebuildexecution | 収録済み |
| SaaS Service Management | `saasservicemgmt.googleapis.com` (v1, v1beta1) | Model, deploy, and operate your SaaS at scale. | — | `saasservicemgmt.` | 3 | — | — | https://docs.cloud.google.com/app-lifecycle-manager | 収録済み |
| Secure Source Manager | `securesourcemanager.googleapis.com` (v1) | Regionally deployed, single-tenant managed source code repository hosted on Google Cloud. | `source-manager` | `securesourcemanager.` | 15 | — | — | https://cloud.google.com/secure-source-manager | 収録済み |
| Workload Manager | `workloadmanager.googleapis.com` (v1) | Workload Manager is a service that provides tooling for enterprise workloads to automate the deployment and validation of your workloads against best practices and recommendations. | `workload-manager` | `workloadmanager.` | 10 | — | — | https://cloud.google.com/workload-manager/docs | 収録済み |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Lifecycle (Cloud Source Repositories): Deprecated. Dates: End of Sale: unavailable to new customers effective June 17, 2024; shutdown date to be communicated at least one year in advance (not yet announced). Successor: Alternatives listed in migration guide (e.g. GitHub, GitLab, Secure Source Manager). Source: https://docs.cloud.google.com/source-repositories/docs/migration-guides.md.txt (retrieved 2026-11-14).
- Lifecycle (Container Registry): Shut down. Dates: deprecated May 15, 2023; shut down March 18, 2025 (GKE read of images stopped June 03, 2025). Successor: Artifact Registry. Source: https://docs.cloud.google.com/artifact-registry/docs/transition/transition-from-gcr.md.txt (retrieved 2026-11-14).
- Lifecycle information covers only products confirmed against official pages as of 2026-11-14 (see `../lifecycle/shutdown-and-deprecated.md`); a product without a Lifecycle entry is not confirmed to be available. Check the official product page before use.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)

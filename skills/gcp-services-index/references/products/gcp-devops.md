---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-devops

## Signature / Usage

Owner skill: `gcp-devops` (status: 未収録（予定）). gcloud groups: `app-lifecycle-manager`, `app-optimize`, `apphub`, `artifacts`, `builds`, `deploy`, `design-center`, `developer-connect`, `software-delivery-trust`, `source`, `source-manager`, `workload-manager`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Docs | Status |
|---|---|---|---|---|---|---|---|---|
| App Hub | `apphub.googleapis.com` (v1, v1alpha) | App Hub lets you build, operate, and manage applications on Google Cloud. | `apphub` | `apphub.` | 4 | — | https://cloud.google.com/app-hub/docs/ | 未収録（予定） |
| Application Design Center | — | — | — | `designcenter.` | 8 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/designcenter | 未収録（予定） |
| Artifact Registry | `artifactregistry.googleapis.com` (v1, v1beta1, v1beta2) | Store and manage build artifacts in a scalable and integrated service built on Google infrastructure. | — | `artifactregistry.` | 12 | — | https://cloud.google.com/artifacts/docs/ | 未収録（予定） |
| Cloud Build | `cloudbuild.googleapis.com` (v1, v2) | Creates and manages builds on Google Cloud Platform. | — | `cloudbuild.` | 20 | — | https://cloud.google.com/cloud-build/docs/ | 未収録（予定） |
| Cloud Deploy | `clouddeploy.googleapis.com` (v1) | — | `deploy` | `clouddeploy.` | 12 | — | https://cloud.google.com/deploy/ | 未収録（予定） |
| Cloud Source Repositories | — | — | `source` | `source.`, `sourcerepo.` | 6 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/source | 未収録（予定） |
| Cloud Tool Results | — | — | — | — | 0 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudtoolresults | 未収録（予定） |
| Container Registry | — | — | — | `containerregistry.` | 1 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/containerregistry | 未収録（予定） |
| Developer Connect | `developerconnect.googleapis.com` (v1) | Connect third-party source code management to Google | — | `developerconnect.` | 14 | — | http://cloud.google.com/developer-connect/docs/overview | 未収録（予定） |
| Device Streaming API | — | — | — | `devicestreaming.` | 2 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/devicestreaming | 未収録（予定） |
| Firebase Test Lab | — | — | — | `cloudtestservice.` | 6 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudtestservice | 未収録（予定） |
| Progressive Rollout | — | — | — | `progressiverollout.` | 1 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/progressiverollout | 未収録（予定） |
| Remote Build Execution | — | — | — | `remotebuildexecution.` | 13 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/remotebuildexecution | 未収録（予定） |
| Workload Manager | `workloadmanager.googleapis.com` (v1) | Workload Manager is a service that provides tooling for enterprise workloads to automate the deployment and validation of your workloads against best practices and recommendations. | — | `workloadmanager.` | 10 | — | https://cloud.google.com/workload-manager/docs | 未収録（予定） |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)

---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-run

## Signature / Usage

Owner skill: `gcp-run` (status: 未収録（予定）). gcloud groups: `app`, `functions`, `run`, `scheduler`, `tasks`, `workstations`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Docs | Status |
|---|---|---|---|---|---|---|---|---|
| App Development Experience | — | — | — | `appdevelopmentexperience.` | 1 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/appdevelopmentexperience | 未収録（予定） |
| App Engine | `appengine.googleapis.com` (v1, v1alpha, v1beta) | Provisions and manages developers' App Engine applications. | `app` | `appengine.` | 12 | — | https://cloud.google.com/appengine/docs/admin-api/ | 未収録（予定） |
| App Engine flexible environment | — | — | — | `appengineflex.` | 1 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/appengineflex | 未収録（予定） |
| Cloud Run | `run.googleapis.com` (v1, v2) | Deploy and manage user provided container images that scale automatically based on incoming requests. The Cloud Run Admin API v1 follows the Knative Serving API specification, while v2 is aligned with Google Cloud AIP-based API standards, as described in https://google.aip.dev/. | `run` | `run.` | 14 | — | https://cloud.google.com/run/ | 未収録（予定） |
| Cloud Run functions | `cloudfunctions.googleapis.com` (v1, v2, v2alpha, v2beta) | Manages lightweight user-provided functions executed in response to events. | `functions` | `cloudfunctions.` | 7 | Cloud Functions | https://cloud.google.com/functions | 未収録（予定） |
| Cloud Scheduler | `cloudscheduler.googleapis.com` (v1, v1beta1) | Creates and manages jobs run on a regular recurring schedule. | `scheduler` | `cloudscheduler.` | 4 | — | https://cloud.google.com/scheduler/ | 未収録（予定） |
| Cloud Tasks | `cloudtasks.googleapis.com` (v2, v2beta2, v2beta3) | Manages the execution of large numbers of distributed requests. | `tasks` | `cloudtasks.` | 8 | — | https://cloud.google.com/tasks/ | 未収録（予定） |
| Cloud Workstations | `workstations.googleapis.com` (v1, v1beta) | Allows administrators to create managed developer environments in the cloud. | `workstations` | `workstations.` | 9 | — | https://cloud.google.com/workstations | 未収録（予定） |
| Serverless Integrations | — | — | — | `runapps.` | 5 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/runapps | 未収録（予定） |

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

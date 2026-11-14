---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-api-management

## Signature / Usage

Owner skill: `gcp-api-management` (status: 未収録（予定）). gcloud groups: `api-gateway`, `api-registry`, `apigee`, `apihub`, `endpoints`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Docs | Status |
|---|---|---|---|---|---|---|---|---|
| API Gateway | `apigateway.googleapis.com` (v1, v1beta) | — | — | `apigateway.`, `apigateway_management.` | 5 | — | https://cloud.google.com/api-gateway/docs | 未収録（予定） |
| API Hub | `apihub.googleapis.com` (v1) | — | `apihub` | `apihub.` | 10 | — | https://cloud.google.com/apigee/docs/api-hub/what-is-api-hub | 未収録（予定） |
| Apigee | `apigee.googleapis.com` (v1) | Use the Apigee API to programmatically develop and manage APIs with a set of RESTful operations. Develop and secure API proxies, deploy and undeploy API proxy revisions, monitor APIs, configure environments, manage users, and more. Note: This product is available as a free trial for a time period of 60 days. | `apigee` | `apigee.` | 24 | — | https://cloud.google.com/apigee-api-management/ | 未収録（予定） |
| Apigee Connect | — | — | — | `apigeeconnect.` | 3 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/apigeeconnect | 未収録（予定） |
| Apigee Registry | — | — | — | `apigeeregistry.` | 4 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/apigeeregistry | 未収録（予定） |
| Cloud Endpoints | — | — | `endpoints` | `endpoints.` | 1 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/endpoints | 未収録（予定） |
| Cloud Endpoints Portal | — | — | — | `endpointsportal.` | 1 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/endpointsportal | 未収録（予定） |
| Open Service Broker for Google Cloud | — | — | — | `servicebroker.` | 2 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/servicebroker | 未収録（予定） |

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

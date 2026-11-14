---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-iac

## Signature / Usage

Owner skill: `gcp-iac` (status: 未収録（予定）). gcloud groups: `deployment-manager`, `infra-manager`, `runtime-config`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| Cloud Deployment Manager | `deploymentmanager.googleapis.com` (alpha, v2, v2beta) | The Google Cloud Deployment Manager v2 API provides services for configuring, deploying, and viewing Google Cloud services and APIs via templates which specify deployments of Cloud resources. | `deployment-manager` | `clouddeploymentmanager.`, `deploymentmanager.` | 6 | — | Deprecated | https://cloud.google.com/deployment-manager | 未収録（予定） |
| Cloud Runtime Configuration API | `runtimeconfig.googleapis.com` (v1, v1beta1) | The Runtime Configurator allows you to dynamically configure and expose variables through Google Cloud Platform. In addition, you can also set Watchers and Waiters that will watch for changes to your data and return based on certain conditions. | — | `runtimeconfig.` | 3 | — | — | https://cloud.google.com/deployment-manager/runtime-configurator/ | 未収録（予定） |
| Config Delivery | — | — | — | `configdelivery.` | 6 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/configdelivery | 未収録（予定） |
| Infrastructure Manager | `config.googleapis.com` (v1) | Creates and manages Google Cloud Platform resources and infrastructure. | `infra-manager` | `config.` | 4 | — | — | https://cloud.google.com/infrastructure-manager/docs | 未収録（予定） |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Deprecation (Cloud Deployment Manager): Deployment Manager is being retired: support ended 2026-04-01, new users cannot use it from 2026-06-30, and the service shuts down on or after 2027-06-30 (extended support ends at the latest 2027-03-31). The successor is Infrastructure Manager (`infra-manager`, `config.googleapis.com`). Source: https://docs.cloud.google.com/deployment-manager/docs/deprecations (retrieved 2026-11-14).
- Lifecycle information covers only products confirmed against official pages as of 2026-11-14 (see `../lifecycle/shutdown-and-deprecated.md`); a product without a Lifecycle entry is not confirmed to be available. Check the official product page before use.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)

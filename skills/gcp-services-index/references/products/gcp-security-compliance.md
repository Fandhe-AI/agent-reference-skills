---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-security-compliance

## Signature / Usage

Owner skill: `gcp-security-compliance` (status: 収録済み). gcloud groups: `access-approval`, `assured`, `audit-manager`, `compliance-manager`, `model-armor`, `scc`, `web-security-scanner`, `workspace-key-access`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| Access Approval | `accessapproval.googleapis.com` (v1) | An API for controlling access to data by Google personnel. | `access-approval` | `accessapproval.` | 6 | — | — | https://cloud.google.com/assured-workloads/access-approval/docs | 収録済み |
| Access Transparency | — | — | — | `axt.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/axt | 収録済み |
| Assured Workloads | `assuredworkloads.googleapis.com` (v1, v1beta1) | — | — | `assuredworkloads.` | 6 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/assuredworkloads | 収録済み |
| Audit Manager | `auditmanager.googleapis.com` (v1) | The Audit Manager API allows customers to manage compliance audits. | — | `auditmanager.` | 6 | — | — | https://cloud.google.com/assured-workloads/docs/audit-manager | 収録済み |
| Cloud Controls Partner API | `cloudcontrolspartner.googleapis.com` (v1, v1beta) | Provides insights about your customers and their Assured Workloads based on your Sovereign Controls by Partners offering. | — | `cloudcontrolspartner.` | 10 | — | — | https://cloud.google.com/sovereign-controls-by-partners/docs/sovereign-partners/reference/rest | 収録済み |
| Cloud Infrastructure Entitlement Management (CIEM) | — | — | — | `ciem.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/ciem | 収録済み |
| Cloud Notifications | — | — | — | — | 0 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudnotifications | 収録済み |
| Cloud Security Compliance | — | — | — | `cloudsecuritycompliance.` | 3 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudsecuritycompliance | 収録済み |
| Compliance Scanning | — | — | — | `compliancescanning.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/compliancescanning | 収録済み |
| Cyber Insurance Hub | — | — | — | `riskmanager.` | 5 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/riskmanager | 収録済み |
| Data Security Posture Management | — | — | — | `dspm.` | 3 | — | Deprecated | https://docs.cloud.google.com/iam/docs/roles-permissions/dspm | 収録済み |
| Mandiant | — | — | — | `mandiant.` | 12 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/mandiant | 収録済み |
| Model Armor | — | — | — | `modelarmor.` | 8 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/modelarmor | 収録済み |
| RISC Configuration Service | — | — | — | `riscconfigs.` | 2 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/riscconfigurationservice | 収録済み |
| Secured Landing Zone | — | — | — | `securedlandingzone.` | 8 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/securedlandingzone | 収録済み |
| Security Center Management API | — | — | — | `securitycentermanagement.` | 13 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/securitycentermanagement | 収録済み |
| Security Command Center | `securitycenter.googleapis.com` (v1, v1beta1, v1beta2) | Security Command Center API provides access to temporal views of assets and findings within an organization. | `scc` | `securitycenter.` | 45 | — | — | https://cloud.google.com/security-command-center | 収録済み |
| Security Posture API | `securityposture.googleapis.com` (v1) | Defines, assesses, and monitors the overall status of your security in Google Cloud. You can use security postures to evaluate your current cloud security against defined benchmarks and help maintain the level of security that your organization requires. | — | `securityposture.` | 7 | — | — | https://cloud.google.com/security-command-center | 収録済み |
| Service Security Insights | — | — | — | `servicesecurityinsights.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/servicesecurityinsights | 収録済み |
| Web Security Scanner | — | — | — | `cloudsecurityscanner.`, `websecurityscanner.` | 5 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudsecurityscanner | 収録済み |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Lifecycle (Data Security Posture Management): Deprecated. Dates: deprecated September 14, 2026; shutdown on or after February 1, 2027. Source: https://docs.cloud.google.com/security-command-center/docs/deprecations.md.txt (retrieved 2026-11-14).
- Lifecycle information covers only products confirmed against official pages as of 2026-11-14 (see `../lifecycle/shutdown-and-deprecated.md`); a product without a Lifecycle entry is not confirmed to be available. Check the official product page before use.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)

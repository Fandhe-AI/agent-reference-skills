---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-security

## Signature / Usage

Owner skill: `gcp-security` (status: 未収録（予定）). gcloud groups: `access-approval`, `access-context-manager`, `assured`, `audit-manager`, `beyondcorp`, `certificate-manager`, `compliance-manager`, `fault-testing`, `iap`, `kms`, `model-armor`, `pam`, `parametermanager`, `privateca`, `publicca`, `scc`, `secrets`, `web-security-scanner`, `workspace-key-access`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| Access Approval | `accessapproval.googleapis.com` (v1) | An API for controlling access to data by Google personnel. | `access-approval` | `accessapproval.` | 6 | — | — | https://cloud.google.com/assured-workloads/access-approval/docs | 未収録（予定） |
| Access Context Manager | `accesscontextmanager.googleapis.com` (v1) | An API for setting attribute based access control to requests to Google Cloud services. *Warning:* Do not mix *v1alpha* and *v1* API usage in the same access policy. The v1alpha API supports new Access Context Manager features, which may have different attributes or behaviors that are not supported by v1. The practice of mixed API usage within a policy may result in the inability to update that policy, including any access levels or service perimeters belonging to it. It is not recommended to use both v1 and v1alpha for modifying policies with critical service perimeters. Modifications using v1alpha should be limited to policies with non-production/non-critical service perimeters. | `access-context-manager` | `accesscontextmanager.` | 9 | — | — | https://cloud.google.com/access-context-manager/docs/reference/rest/ | 未収録（予定） |
| Artifact Analysis | `containeranalysis.googleapis.com` (v1, v1alpha1, v1beta1) | This API is a prerequisite for leveraging Artifact Analysis scanning capabilities in Artifact Registry. In addition, the Container Analysis API is an implementation of the Grafeas API, which enables storing, querying, and retrieval of critical metadata about all of your software artifacts. | — | `containeranalysis.` | 10 | — | — | https://cloud.google.com/container-analysis/api/reference/rest/ | 未収録（予定） |
| Assured Open Source Software | — | — | — | `assuredoss.` | 6 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/assuredoss | 未収録（予定） |
| Assured Workloads | `assuredworkloads.googleapis.com` (v1, v1beta1) | — | — | `assuredworkloads.` | 6 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/assuredworkloads | 未収録（予定） |
| Audit Manager | `auditmanager.googleapis.com` (v1) | The Audit Manager API allows customers to manage compliance audits. | — | `auditmanager.` | 6 | — | — | https://cloud.google.com/assured-workloads/docs/audit-manager | 未収録（予定） |
| Binary Authorization | `binaryauthorization.googleapis.com` (v1, v1beta1) | The management interface for Binary Authorization, a service that provides policy-based deployment validation and control for images deployed to Google Kubernetes Engine (GKE), Anthos Service Mesh, Anthos Clusters, and Cloud Run. | — | `binaryauthorization.` | 12 | — | — | https://cloud.google.com/binary-authorization/ | 未収録（予定） |
| Certificate Authority Service | `privateca.googleapis.com` (v1, v1beta1) | The Certificate Authority Service API is a highly-available, scalable service that enables you to simplify and automate the management of private certificate authorities (CAs) while staying in control of your private keys. | `privateca` | `privateca.` | 10 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/privateca | 未収録（予定） |
| Certificate Manager | `certificatemanager.googleapis.com` (v1) | — | `certificate-manager` | `certificatemanager.` | 5 | — | — | https://docs.cloud.google.com/certificate-manager/docs/overview | 未収録（予定） |
| Chrome Enterprise Premium | `beyondcorp.googleapis.com` (v1, v1alpha) | Chrome Enterprise Premium is a secure enterprise browsing solution that provides secure access to applications and resources, and offers integrated threat and data protection. It adds an extra layer of security to safeguard your Chrome browser environment, including Data Loss Prevention (DLP), real-time URL and file scanning, and Context-Aware Access for SaaS and web apps. | `beyondcorp` | `beyondcorp.` | 8 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/beyondcorp | 未収録（予定） |
| Cloud Controls Partner API | `cloudcontrolspartner.googleapis.com` (v1, v1beta) | Provides insights about your customers and their Assured Workloads based on your Sovereign Controls by Partners offering. | — | `cloudcontrolspartner.` | 10 | — | — | https://cloud.google.com/sovereign-controls-by-partners/docs/sovereign-partners/reference/rest | 未収録（予定） |
| Cloud Infrastructure Entitlement Management (CIEM) | — | — | — | `ciem.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/ciem | 未収録（予定） |
| Cloud Key Management Service | `cloudkms.googleapis.com` (v1) | Manages keys and performs cryptographic operations in a central cloud service, for direct use by other cloud resources and applications. | `kms` | `cloudkms.`, `cloudkmskacls.` | 33 | — | — | https://cloud.google.com/kms/ | 未収録（予定） |
| Cloud Notifications | — | — | — | — | 0 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudnotifications | 未収録（予定） |
| Cloud Security Compliance | — | — | — | `cloudsecuritycompliance.` | 3 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudsecuritycompliance | 未収録（予定） |
| Compliance Scanning | — | — | — | `compliancescanning.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/compliancescanning | 未収録（予定） |
| Container Scanning | — | — | — | `containerscanning.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/containerscanning | 未収録（予定） |
| Cyber Insurance Hub | — | — | — | `riskmanager.` | 5 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/riskmanager | 未収録（予定） |
| Data Security Posture Management | — | — | — | `dspm.` | 3 | — | Deprecated | https://docs.cloud.google.com/iam/docs/roles-permissions/dspm | 未収録（予定） |
| Identity-Aware Proxy | `iap.googleapis.com` (v1, v1beta1) | Controls access to cloud applications running on Google Cloud Platform. | `iap` | `iap.` | 10 | — | — | https://cloud.google.com/iap | 未収録（予定） |
| Mandiant | — | — | — | `mandiant.` | 12 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/mandiant | 未収録（予定） |
| Model Armor | — | — | — | `modelarmor.` | 8 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/modelarmor | 未収録（予定） |
| On-Demand Scanning API | `ondemandscanning.googleapis.com` (v1, v1beta1) | A service to scan container images for vulnerabilities. | — | `ondemandscanning.` | 2 | — | — | https://cloud.google.com/container-analysis/docs/on-demand-scanning/ | 未収録（予定） |
| Parameter Manager | `parametermanager.googleapis.com` (v1) | Parameter Manager is a single source of truth to store, access and manage the lifecycle of your workload parameters. Parameter Manager aims to make management of sensitive application parameters effortless for customers without diminishing focus on security. | `parametermanager` | `parametermanager.` | 10 | — | — | https://cloud.google.com/secret-manager/parameter-manager/docs/overview | 未収録（予定） |
| Privileged Access Manager | — | — | `pam` | `privilegedaccessmanager.` | 9 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/privilegedaccessmanager | 未収録（予定） |
| Public Certificate Authority | `publicca.googleapis.com` (v1, v1alpha1, v1beta1) | The Public Certificate Authority API may be used to create and manage ACME external account binding keys associated with Google Trust Services' publicly trusted certificate authority. | `publicca` | `publicca.` | 2 | — | — | https://cloud.google.com/public-certificate-authority/docs | 未収録（予定） |
| RISC Configuration Service | — | — | — | `riscconfigs.` | 2 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/riscconfigurationservice | 未収録（予定） |
| Secret Manager | `secretmanager.googleapis.com` (v1, v1beta1, v1beta2) | Stores sensitive data such as API keys, passwords, and certificates. Provides convenience while improving security. | `secrets` | `secretmanager.` | 6 | — | — | https://cloud.google.com/secret-manager/ | 未収録（予定） |
| Secured Landing Zone | — | — | — | `securedlandingzone.` | 8 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/securedlandingzone | 未収録（予定） |
| Security Center Management API | — | — | — | `securitycentermanagement.` | 13 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/securitycentermanagement | 未収録（予定） |
| Security Command Center | `securitycenter.googleapis.com` (v1, v1beta1, v1beta2) | Security Command Center API provides access to temporal views of assets and findings within an organization. | `scc` | `securitycenter.` | 45 | — | — | https://cloud.google.com/security-command-center | 未収録（予定） |
| Security Posture API | `securityposture.googleapis.com` (v1) | Defines, assesses, and monitors the overall status of your security in Google Cloud. You can use security postures to evaluate your current cloud security against defined benchmarks and help maintain the level of security that your organization requires. | — | `securityposture.` | 7 | — | — | https://cloud.google.com/security-command-center | 未収録（予定） |
| Service Security Insights | — | — | — | `servicesecurityinsights.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/servicesecurityinsights | 未収録（予定） |
| Web Security Scanner | — | — | — | `cloudsecurityscanner.`, `websecurityscanner.` | 5 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudsecurityscanner | 未収録（予定） |

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

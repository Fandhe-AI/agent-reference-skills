---
source: https://docs.cloud.google.com/security-command-center/docs/activate-premium-tier
---

# Activate Security Command Center Premium tier for an organization

Premium service tier, requires organization-level activation. Activating in the Google Cloud console turns on a suite of built-in detection services across supported cloud resources in the organization. First full scan completes within 24 hours.

## Signature / Usage

### Check Security Health Analytics after activation

Security Health Analytics is one of the services enabled with Premium; this shows its enablement state for the organization.

```bash
gcloud scc manage services describe sha --organization=123
```

### Activate in the console (summary)

1. Open the Security Command Center welcome page. For data residency, open the jurisdictional console URL for your location instead.
2. Select the organization, click **Select**, then **Start a Premium free trial**.
3. Optional: **Show more** to confirm data residency or edit data encryption (Cloud KMS key from any project, including other organizations; only compatible-location keys are listed).
4. Click **Activate**.

## Options / Props

### Required roles (on the organization)

| Role | ID |
|---|---|
| Security Center Admin | `roles/securitycenter.admin` |
| Organization Administrator | `roles/resourcemanager.organizationAdmin` |

### Prerequisites

| Item | Detail |
|---|---|
| Security Center Management API | Optional; enable `securitycentermanagement.googleapis.com`. Needs `serviceusage.services.enable` (Owner or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`). |
| Domain-restricted sharing | Sign in with an account in an allowed domain; service accounts in an allowed domain or in a group within your domain. |
| Resource usage restriction | Allow `cloudsecuritycompliance.googleapis.com`, `securitycenter.googleapis.com`, `securitycentermanagement.googleapis.com`. |
| Data residency / CMEK | Decide the location and complete the CMEK tasks before activating. |

### Services enabled with Premium

| Service | Condition |
|---|---|
| AI Protection | |
| Compliance Manager | |
| Container Threat Detection | GKE clusters must be on a supported GKE version and configured correctly. |
| Event Threat Detection | Relies on Google Cloud logs; enable logs for the organization, folders, and projects. Some logs are always on; most data access audit logs must be activated. |
| Security Health Analytics | |
| Security posture | |
| Virtual Machine Threat Detection | |
| Vulnerability Assessment | |
| Web Security Scanner | |

### Service agents created

| Service agent | Used for |
|---|---|
| Cloud Security Command Center Service Agent | Event Threat Detection, Security Health Analytics, Virtual Machine Threat Detection, Vulnerability Assessment |
| Cloud Security Compliance Service Agent | AI Protection, Compliance Manager |
| Container Threat Detection Service Agent | Container Threat Detection |

## Notes

- The Premium free trial lasts 30 days. When it ends the organization automatically transitions to Premium pay-as-you-go and the billing account is charged. To cancel and avoid charges, downgrade to the Standard tier before the trial ends (possible at any time during the trial); for a Premium subscription see the Security Command Center pricing page.
- Security Command Center doesn't validate the data residency location against `gcp.resourceLocations` organization policies; choose a consistent location. Activation with data residency and later changes need the jurisdictional console.
- During activation with a Cloud KMS key, Security Command Center grants `roles/cloudkms.cryptoKeyEncrypterDecrypter` to the Cloud Security Command Center Service Agent on the key. Disabling or destroying that key makes the encrypted data inaccessible; try CMEK on a disposable setup first.
- If you use VPC Service Controls service perimeters, configure ingress and egress policies for the service agents; see the service-specific pages for Compliance Manager (https://docs.cloud.google.com/security-command-center/docs/compliance-manager-configure-vpc-sc), Container Threat Detection (https://docs.cloud.google.com/security-command-center/docs/how-to-use-container-threat-detection#service-perimeter), Security Health Analytics (https://docs.cloud.google.com/security-command-center/docs/how-to-use-security-health-analytics#service-perimeter), and Vulnerability Assessment (https://docs.cloud.google.com/security-command-center/docs/vulnerability-assessment-google-cloud-vpcsc#create-ingress-egress-rules). Perimeter changes can block production traffic; use dry-run mode first.
- After a service agent is created, Security Command Center automatically grants the required IAM roles to it. Service agent names and roles are in [access-control-org.md](./access-control-org.md).
- Only the console activation flow is documented; it is summarized above. Tier management: https://docs.cloud.google.com/security-command-center/docs/modify-premium-tier.
- Source: https://docs.cloud.google.com/security-command-center/docs/activate-premium-tier (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/services/describe (gcloud 593.0.0 help). `sha` is the abbreviated service name of `security-health-analytics`.

## Related

- [activate-standard-tier.md](./activate-standard-tier.md)
- [activate-scc-overview.md](./activate-scc-overview.md)
- [activate-scc-for-a-project.md](./activate-scc-for-a-project.md)
- [access-control-org.md](./access-control-org.md)

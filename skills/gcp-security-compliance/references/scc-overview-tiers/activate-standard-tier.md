---
source: https://docs.cloud.google.com/security-command-center/docs/activate-standard-tier
---

# Activate Security Command Center Standard tier for an organization

Standard service tier, requires organization-level activation. Activating in the Google Cloud console gives centralized visibility into vulnerabilities and risks and baseline security posture and compliance features; specific vulnerability assessment capabilities require configuration. First full scan completes within 24 hours.

## Signature / Usage

### Verify enabled services after activation

```bash
gcloud scc manage services list --organization=organizations/123
```

### Activate in the console (summary)

1. Open the Security Command Center welcome page. For data residency, open the jurisdictional console URL for your location instead.
2. Select the organization and click **Get Standard**, then **Select** on the welcome page.
3. Optional: **Show more** to confirm data residency or edit data encryption (select **Cloud KMS key**, a project, and a key from any project, including other organizations; only keys in compatible locations are shown).
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
| Security Center Management API | Optional; enable `securitycentermanagement.googleapis.com` in the project where you call it. Needs `serviceusage.services.enable` (Owner `roles/owner` or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`). |
| Domain-restricted sharing | Sign in with an account in an allowed domain; service accounts must be in an allowed domain or in a group within your domain (allows `@*.gserviceaccount.com` services). |
| Resource usage restriction | Allow `securitycenter.googleapis.com` and `securitycentermanagement.googleapis.com`. |
| Data residency | Review planning for data residency and decide the location first. |
| CMEK | Complete the CMEK tasks for Security Command Center first. |

### Services enabled with Standard

| Service |
|---|
| Compliance Manager |
| Sensitive Actions Service |

## Notes

- Security Command Center doesn't validate the data residency location against organization policies that enforce the `gcp.resourceLocations` constraint; choose a location consistent with your organization policies.
- You must use the jurisdictional Google Cloud console to activate with data residency controls and to modify the data residency configuration afterwards. Data residency and encryption can be changed after activation via the modify data residency or data encryption configuration page.
- During activation with a Cloud KMS key, Security Command Center grants `roles/cloudkms.cryptoKeyEncrypterDecrypter` to the Cloud Security Command Center Service Agent on the key. Disabling or destroying that key makes the encrypted Security Command Center data inaccessible; try CMEK on a disposable setup first.
- Organization policies that restrict CMEK might limit you to CMEK or specific keys.
- Upgrading from Standard to Premium shows charts of scan progress and updates existing charts with Premium detector results.
- New Standard activations differ from Standard-legacy; see https://docs.cloud.google.com/security-command-center/docs/migrate-standard-legacy#feature-differences. Other tiers: Premium, Enterprise, or project-level activation pages.
- Only the console activation flow is documented; it is summarized above. Tier management: https://docs.cloud.google.com/security-command-center/docs/modify-standard-tier.
- Source: https://docs.cloud.google.com/security-command-center/docs/activate-standard-tier (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/services/list (gcloud 593.0.0 help).

## Related

- [activate-premium-tier.md](./activate-premium-tier.md)
- [activate-scc-overview.md](./activate-scc-overview.md)
- [activate-scc-for-a-project.md](./activate-scc-for-a-project.md)
- [data-residency-support.md](./data-residency-support.md)
- [access-control-org.md](./access-control-org.md)

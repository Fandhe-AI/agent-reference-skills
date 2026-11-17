---
source: https://docs.cloud.google.com/risk-manager/docs/configuring-risk-manager
---

# Configuring Cyber Insurance Hub

First-time organization setup for Cyber Insurance Hub (Preview): grant the Risk Manager Service Agent its role, enroll the organization, and grant users access. These steps are prerequisites for most Cyber Insurance Hub tasks.

## Signature / Usage

### Grant a Cyber Insurance Hub role to a user

```bash
gcloud organizations add-iam-policy-binding ORGANIZATION_ID \
  --member=user:USERNAME --role=roles/ROLE
```

`ORGANIZATION_ID` is the numeric ID of the organization enrolled in Cyber Insurance Hub; `USERNAME` is the principal (a member of your organization, for example `test-user@example.com`); `ROLE` is a Cyber Insurance Hub role name, for example `riskmanager.reviewer`.

### Console steps

On the Cyber Insurance Hub setup page for your organization, click **Grant Roles** (it becomes **Roles Granted**), then **Enroll** (it becomes **Enrolled**).

## Options / Props

| Item | Value |
|---|---|
| Setup roles on the organization | `roles/riskmanager.admin` (Risk Manager Admin), `roles/resourcemanager.organizationAdmin` (Organization Administrator) |
| Setup permissions | `riskmanager.serviceAccount.create`, `resourcemanager.organizations.getIamPolicy`, `resourcemanager.organizations.setIamPolicy` |
| Service agent role | `roles/riskmanager.serviceAgent` (Risk Manager Service Agent role); the service agent is created with no permissions when setup begins and needs this role to read security findings and build reports |
| Enrollment prerequisite | SCC enabled for the organization with the Security Health Analytics service enabled |
| First scan | Initial scans can take up to 24 hours to complete |
| User roles | Include `roles/riskmanager.reviewer` (Risk Manager Report Reviewer); full list in "Access control with IAM" |

## Notes

- Preview: this product is subject to the "Pre-GA Offerings Terms"; features are available "as is" and might have limited support.
- Always grant the minimum set of permissions required for a task. If the Cyber Insurance Hub roles are not visible in the Google Cloud console, use the gcloud CLI.
- Enrolling enables regular scans of the organization's Google Cloud resources that generate the report data.
- The source presents the gcloud command as an indented block (no fence); it is fenced here with the same text. The source also shows Console steps for granting roles; only the setup page clicks are summarized above.
- Source: https://docs.cloud.google.com/risk-manager/docs/configuring-risk-manager (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [risk-manager-overview.md](./risk-manager-overview.md)
- [managing-reports.md](./managing-reports.md)

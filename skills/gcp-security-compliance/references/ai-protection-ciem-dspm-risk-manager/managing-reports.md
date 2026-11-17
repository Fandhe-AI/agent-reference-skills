---
source: https://docs.cloud.google.com/risk-manager/docs/managing-reports
---

# Managing reports

Create, download, approve and send Cyber Insurance Hub (Preview) reports. Prerequisites: complete onboarding for the organization and configure Cyber Insurance Hub. Reports aggregate Cloud Asset Inventory and Security Command Center data, aligned to the CIS Google Cloud Platform Foundation Benchmark v1.2.0; automatic generation is also available.

## Signature / Usage

Grant the approval or send role to the people who need it (`ROLE` such as `riskmanager.reviewer`; `USERNAME` is a member of your organization).

```bash
gcloud organizations add-iam-policy-binding ORGANIZATION_ID \
  --member=user:USERNAME --role=roles/ROLE
```

### Report workflow (Console)

Create with **Create manual report** on the **Cyber Insurance Hub** page, download with **Download** on the report page, set **Status** to **Approved to share** to approve, then **Send report to insurance partners**: enter your email, organization details, broker and partners, acknowledge the consent and disclosure language, click **Agree**, type your organization name in the **Confirmation** dialog and click **Send**.

## Options / Props

### Roles

| Task | Required role |
|---|---|
| Approve a report | `roles/riskmanager.admin` (Risk Manager Admin) or `roles/riskmanager.reviewer` (Risk Manager Report Reviewer) |
| Send a report | `roles/riskmanager.admin` (Risk Manager Admin) |

### Report status

| Status | Effect |
|---|---|
| Approved to share | Report can be sent to insurers. |
| Unreviewed | The system warns when a user tries to send it to insurers. |
| Do not share | The report cannot be sent to insurers. |

### Insurance brokers (any broker may be used)

| Broker | Contact |
|---|---|
| Aon | `GCRiskManager@aon.com` |
| Alliant | `AlliantCyber@Alliant.com` |
| Epic | `cyberinsure@epicbrokers.com` |
| Lockton | `GoogleRPP@lockton.com` |
| Marsh | `CyberRPP@marsh.com` |
| McGill and Partners | `cyber.it@mcgillpartners.com` |
| NFP | `nfpcyberpanel@nfp.com` |
| Willis Towers Watson | `CPP@wtwco.com` |

## Notes

- Preview: this product is subject to the "Pre-GA Offerings Terms"; features are available "as is" and might have limited support.
- Sending a report is a disclosure: after you send it, the selected partners have access to the report, your **Organization ID** and the information you provided. The source describes no way to recall it; approve the report first and send only with the authority to do so. Partners are Beazley, Chubb and Munich Re.
- After the report is sent, your broker coordinates next steps with you and the insurance carriers and leads the rest of the insurance process. Approval often lies with the treasury team in larger organizations.
- Snippet taken from https://docs.cloud.google.com/risk-manager/docs/configuring-risk-manager (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0).
- The source page gives Console steps only for creating, downloading, approving and sending reports.
- The source gives each broker a pre-filled email template (mailto link); omitted here.
- Source: https://docs.cloud.google.com/risk-manager/docs/managing-reports (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuring-risk-manager.md](./configuring-risk-manager.md)
- [remediate-findings.md](./remediate-findings.md)
- [risk-manager-overview.md](./risk-manager-overview.md)

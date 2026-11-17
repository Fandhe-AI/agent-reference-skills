---
source: https://docs.cloud.google.com/risk-manager/docs/overview
---

# Cyber Insurance Hub conceptual overview

Cyber Insurance Hub (Risk Manager) is a Preview Google Cloud security tool and a component of the Risk Protection Program (RPP). It profiles organization-level technical risk posture in reports and lets you send approved reports to cyber insurance partners. It integrates with Security Command Center (SCC) for remediation.

## Signature / Usage

Grants a Cyber Insurance Hub role on the organization that is enrolled; see that page for the role names.

```bash
gcloud organizations add-iam-policy-binding ORGANIZATION_ID \
  --member=user:USERNAME --role=roles/ROLE
```

## Options / Props

| Concept | Detail |
|---|---|
| Report | Organization-level object aggregating Cloud Asset Inventory and SCC data into an aggregate view of risk; aligned to CIS Google Cloud Platform Foundation Benchmark v1.2.0. |
| Creation | Manual reports on an ad hoc basis, or scheduled automatic reports (daily, weekly or monthly). |
| Review and approval | Invite other organization members to review and approve reports before sharing. |
| Sending | Data is sent only when you explicitly send a report; sending prompts the insurance partners to generate a quote. |
| Insurance partners | Beazley (Full Spectrum Cyber for Google Cloud), Chubb (Google Cloud Risk Protection Endorsement), Munich Re (Cloud Protection+). |

## Notes

- Preview: this product is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms; Pre-GA products are available "as is" and might have limited support.
- Sending a report shares organization data with the selected insurance partners; the source describes no way to recall a sent report, so review and approve first (see the managing-reports page).
- Engage your insurance broker to continue the insurance conversation after sending.
- Snippet taken from https://docs.cloud.google.com/risk-manager/docs/configuring-risk-manager (the overview page has no code).
- Source: https://docs.cloud.google.com/risk-manager/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuring-risk-manager.md](./configuring-risk-manager.md)
- [managing-reports.md](./managing-reports.md)
- [remediate-findings.md](./remediate-findings.md)

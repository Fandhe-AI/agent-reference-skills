---
source: https://docs.cloud.google.com/assured-workloads/access-transparency/docs/enable
---

# Enabling Access Transparency

Access Transparency is a default security control for every Google Cloud organization; this page shows how to verify that it is enabled.

## Signature / Usage

Access Transparency logs appear under this log name once the control is enabled.

```text
logName="projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Faccess_transparency"
```

### Verify in the console

Either: with the Access Approval Viewer (`roles/accessapproval.viewer`) or Access Transparency Admin (`roles/axt.admin`) role, go to **Security** > **Access Approval** and confirm Access Transparency is enabled on the **Home** tab.

Or: on the **Identity and Access Management** page, confirm `roles/axt.admin` is listed for your principal under the organization, select an organization or project, go to **IAM** > **Settings**, and verify that Access Transparency is enabled.

## Options / Props

### Roles

| Role | Use |
|---|---|
| Access Approval Viewer (`roles/accessapproval.viewer`) | Verify Access Transparency on the Access Approval **Home** tab. |
| Access Transparency Admin (`roles/axt.admin`) | Verify Access Transparency on the Access Approval **Home** tab, or in **IAM** > **Settings** (the role must be listed for your principal under the organization). |

## Notes

- If Access Transparency is disabled, the Access Approval UI may be inaccessible until it is re-enabled. Access Transparency must be enabled before enabling Access Approval.
- Pricing is on `https://cloud.google.com/assured-workloads/access-transparency/pricing`.
- The source shows Console steps only.
- Snippet taken from https://docs.cloud.google.com/assured-workloads/access-transparency/docs/reading-logs (the Logging filter for Access Transparency logs).
- Source: https://docs.cloud.google.com/assured-workloads/access-transparency/docs/enable (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/assured-workloads/access-approval/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0) — the Access Approval prerequisite.

## Related

- [access-transparency-overview.md](./access-transparency-overview.md)
- [reading-logs.md](./reading-logs.md)
- [access-approval-overview.md](./access-approval-overview.md)

---
source: https://docs.cloud.google.com/support/docs/customer-care-procedures
---

# Create and Manage Support Cases

Create, update, reopen, close, link, share, prioritize, and escalate Cloud Customer Care support cases in the Google Cloud console.

## Signature / Usage

Required roles on the project, folder, or organization where the case is managed:

```
roles/cloudsupport.techSupportViewer   # view cases
roles/cloudsupport.techSupportEditor   # view, create, update, escalate, close cases
roles/cloudsupport.admin               # enable case sharing (organization level)
```

Create a case (cases can only be created for organizations or projects):

1. Console: **Support** > **Cases**; select the organization or project in the resource selector.
2. Click **Get help**; choose the product; describe the issue; enter any observed error message; select a priority; click **Next**.
3. Review suggested resources; pick a category (routes the case to the right team).
4. Choose **Live chat** (English only; transcript emailed) or **Email** (language selectable, attachments allowed, optional browser trace).
5. Chat: **Start chat**. Email: **Submit**; you land on **Cases** to comment or attach files.

Alternative: **Create case with Gemini** opens the Cloud Assist panel (Preview); the case form is pre-filled from the chat; **More actions** > **Create support case manually** skips Gemini. Gemini Cloud Assist must be set up by an administrator for the folder or project.

Manage a case: open **Support** > **Cases**, pick the resource, optionally filter, click the case, then add comments, upload attachments, edit attributes, or escalate (updates only on open cases). **Reopen case** (enter a reason) works only within 15 days of closing; **Close case** is in the **General Information** section. Link a case to a known issue under the **Known issues** tab with **Create linked case**.

Enable case sharing: **Support** > **Overview**, select the organization, **Settings**, toggle **Enable case sharing** (requires `roles/cloudsupport.admin`).

## Options / Props

Case status:

| Status | Meaning |
|--------|---------|
| New | Not assigned yet |
| Assigned | Assigned to a specialist; response within the target time for the priority |
| In progress Cloud Customer Care | Customer Care specialists are working on it |
| In progress Google engineering | Product engineers are investigating; turnaround varies |
| In progress Google other | Another Google team is investigating |
| Waiting on customer response | More information needed from you |
| Waiting on customer action | An action by you is needed |
| Solution offered | Solution offered; reopen if insufficient |
| Closed | Resolved; reopen within 15 days by replying, otherwise create a new case |

Priority:

| Priority | Definition |
|----------|------------|
| P1 Critical Impact | Service unusable in production; critical business impact; no quick workaround (under 30 minutes); GA component |
| P2 High Impact | Service use severely impaired; degraded production; moderate impact; quick workaround exists; GA component |
| P3 Medium Impact | Limited scope or severity; no user-visible impact; low business impact |
| P4 Low Impact | Little to no impact; consultative tickets |

Enhanced and Premium extras: change case priority, escalate a case, request follow-the-sun service.

Escalation reasons: timezone change for working hours (specify timezone), request an update within an hour, request a Google Meet call, recommended fix does not work, response too slow, issue not handled per business impact, other. Request via console **Escalate**, the Google Cloud Support Portal (**Escalate case** appears 30 minutes after creation), contacting Customer Care, or your TAM for Premium.

## Notes

- Case sharing is disabled by default, not retroactive, and lets users with `cloudsupport.techCases.update` add recipients, including addresses outside your organization; enable it deliberately.
- A reopened case is assigned to the last working specialist; initial response times do not apply, so set P1 for urgent reopened cases.
- Escalation flags process breaks and does not generally speed up high-impact issues; raise the priority (for example to P1) instead. Escalated cases go to an Escalation Manager and you are notified within an hour. Escalating shortly after a priority change might slow resolution.
- P1 cases follow the sun by default; Premium can request it for P2. Follow-the-sun cases may require you to supply information at all hours.
- All users can contact Customer Care about Cloud Billing; **Support** > **Overview** offers Billing support (live chat), Phone support, and Community support. Check known issues in the **Known issues** tab or the Google Cloud Service Health dashboard before filing.
- Attach non-proprietary formats such as PNG, TXT, or PDF. Do not include secrets or sensitive data in cases.
- Source: https://docs.cloud.google.com/support/docs/customer-care-procedures (retrieved 2026-11-14; CC BY 4.0)

## Related

- [access-control-audit.md](./access-control-audit.md)
- [best-practices.md](./best-practices.md)
- [../support-plans/customer-care-plans.md](../support-plans/customer-care-plans.md)
- [../support-plans/language-working-hours.md](../support-plans/language-working-hours.md)

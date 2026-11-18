---
source: https://docs.cloud.google.com/service-health/docs/view-events
---

# View events in the Service Health dashboard

How to open the Service Health dashboard in the Google Cloud console (or the Google Cloud mobile app) and read the incident list and incident details for the selected project.

## Signature / Usage

### Enable the Service Health API

```bash
gcloud services enable servicehealth.googleapis.com
```

### Open the dashboard

1. Console: select a project, open the navigation menu, go to **Tools** and select **Service Health**.
2. Mobile: install the Google Cloud mobile application, open the **Operations** tab and select **Personalized Service Health**.

If you see "You do not have sufficient permissions to view this page", set the permissions described in `manage-access.md`.

## Options / Props

### Required role

| Role | Where | Purpose |
|---|---|---|
| Personalized Service Health Viewer (`roles/servicehealth.viewer`) | The project you want to view events for | Access the Service Health dashboard |
| Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) or Owner (`roles/owner`) | The project | Provides `serviceusage.services.enable` to enable the API |

### Incident list fields

| Field | Description |
|---|---|
| Event State | Active or Closed, with the detailed state in parentheses (Emerging, Confirmed, Merged, Resolved, False positive, Auto-closed). |
| Title | Brief description of the incident. |
| Relevance | Impacted (available for some products only, including Compute Engine and Persistent Disk), Related, Partially Related, Not Impacted, Unknown. Can change as the incident progresses. |
| Impacted products | Products known to be affected; each has a granular status chip, Affected or Resolved. Newly added products of an active incident appear as Affected. |
| Impacted locations | Locations known to be affected; each has a granular status chip, Affected or Resolved. |
| Incident start time | When Personalized Service Health detected the incident. |
| Last update | Latest update from Google Cloud Support. |

### Incident details, Overview tab

| Field | Description |
|---|---|
| Event State | Overall state of the event. |
| Title | Brief description. |
| Event timeline | Detailed timeline so far; not specific to your project. |
| Impacted products and locations | All products and locations known to be affected, including ones you might not use, with Relevance, granular disruption status, and start time and recovery timestamp per product / location pair. |
| Most recent update | Latest update from Google Cloud Support. |
| Diagnosis | The cause of the incident. |
| Workaround | Steps to mitigate the impact on your project. |

## Notes

- Only events within the selected project scope appear. Filtering: use the filter bar (title, impacted products, date ranges) or a date-range button. Personalized Service Health lets you query information within the past year. If you delete a project, information about it is no longer available in Personalized Service Health.
- The **Full Incident History** tab lists all updates from Google Cloud Support. The **Incident Report** tab, if available, summarizes contributing factors and the steps planned to prevent recurrence.
- Google might determine an earlier reported incident did not affect your project; Personalized Service Health then sets relevance to **Not Impacted**.
- Alerts configured in Cloud Logging apply to overall event revisions and state changes, not to isolated granular status transitions.
- If Personalized Service Health itself has an issue, use https://status.cloud.google.com/ for status.
- Billing must be enabled for the project. The source also shows console links for enabling the API.
- Snippet taken from https://docs.cloud.google.com/service-health/docs/list-events
- Source: https://docs.cloud.google.com/service-health/docs/view-events (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [concepts.md](./concepts.md)
- [manage-access.md](./manage-access.md)
- [list-events.md](./list-events.md)

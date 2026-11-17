---
source: https://docs.cloud.google.com/security-command-center/docs/how-to-export-data
---

# Overview of exporting Security Command Center data

Two console methods for exporting Security Command Center data: one-time exports of findings and assets (Cloud Storage as JSON / JSONL / CSV, or CSV download) and continuous exports that send new findings to Pub/Sub. Findings can also go to BigQuery or Cloud Logging.

## Signature / Usage

Exports are configured in the Google Cloud console. The finding query that selects what to export is edited in the query editor, for example:

Adapted (not in the official docs): the source wraps the `category` string across two lines (`"Persistence:` / `IAM Anomalous Grant"`), which would put a line break inside the quoted value; those two lines are joined.

```text
severity="LOW" OR severity="MEDIUM" AND category="Persistence: IAM Anomalous Grant" AND resource.project_display_name="prod-project"
AND -resource.type:"compute"
```

To test a continuous export, show active and inactive findings (everything except muted), then toggle a finding Inactive then Active; a notification is sent for the newly active finding:

```text
NOT mute="MUTED"
```

### One-time export workflow

1. Findings page, select project / folder / organization, apply filters.
2. Export, under One-time choose Cloud storage (or CSV for up to 1,000 findings).
3. Set project, export path (bucket + filename), group results by, format (JSON, JSONL, CSV), time range; Export.
4. Assets: Assets page, Export > Download CSV.

### Continuous export workflow

1. Findings page, build the findings query, Refresh matching findings.
2. Export, under Continuous choose Pub/Sub; set name, description, project, topic.
3. Optionally select Receive retention deletion notifications; Save; create a subscription on the topic.
4. Manage under Settings > Continuous exports (view related findings, edit, delete).

## Options / Props

### Required roles: one-time exports (on the project, folder, or organization)

| Role | Purpose |
|------|---------|
| Security Center Admin Viewer (`roles/securitycenter.adminViewer`) | One-time exports |
| Storage Admin (`roles/storage.admin`) | Export findings to a Cloud Storage bucket |

### Required roles: continuous exports

| Role | Purpose |
|------|---------|
| Security Center Admin Viewer (`roles/securitycenter.adminViewer`) | View continuous exports |
| Security Center Admin Editor (`roles/securitycenter.adminEditor`) | View, create, and manage continuous exports |

| Permission | Purpose |
|------------|---------|
| `pubsub.topics.publish`, `pubsub.topics.list` | View or publish Pub/Sub topics |
| `securitycenter.notificationconfig.get`, `securitycenter.notificationconfig.list` | View the continuous exports page |
| `securitycenter.notificationconfig.create`, `.update`, `.delete` | Manage continuous exports |

### Limits and formats

| Item | Value |
|------|-------|
| Continuous exports per organization | 500 maximum |
| CSV download direct to workstation (findings) | Up to 1,000 findings; over 1,000 you must refine the query or export to Cloud Storage |
| One-time findings export formats (Cloud Storage) | JSON, JSONL, CSV |
| Assets export format | CSV (download to workstation) |
| API list calls | Up to 1,000 findings per call, paginated; not recommended for programmatic bulk export |

## Notes

- Required roles: one-time exports (on the project, folder, or organization): Permissions: `securitycenter.assets.group`, `securitycenter.assets.list`, `securitycenter.findings.group`, `securitycenter.findings.list`, `securitycenter.sources.get`, `securitycenter.sources.list`, `securitycenter.userinterfacemetadata.get`; `resourcemanager.organizations.get` for organization-level activations; `resourcemanager.projects.get` for project-level activations.
- Source: https://docs.cloud.google.com/security-command-center/docs/how-to-export-data (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Applies to the Standard-legacy, Standard, Premium, and Enterprise (Deprecated) service tiers. The Enterprise service tier will shut down on May 21, 2027; organizations on Enterprise move automatically to Premium on or after May 21, 2027.
- For enterprise-scale environments with millions of findings (compliance reporting, trend analysis, dashboards) use bulk export to BigQuery rather than API list calls.
- Adapted from the official docs: the first query's `category="Persistence:` / `IAM Anomalous Grant"` string was split across two lines in the source; those two lines are joined so the quoted value has no line break.
- Source inconsistency: the page introduces that query, in the continuous-export steps, as one that "mutes" low-severity and medium-severity findings; the query itself only selects findings and is kept as written.
- One-time exports: data subject to data residency control cannot be in the filter of a Cloud Storage export (an error is returned). You cannot export to a bucket that has a retention policy. Selecting an existing file prompts an overwrite confirmation; confirming overwrites it. The CSV uses a default column set that does not follow console column visibility or page size.
- Continuous exports: with data residency enabled, `notificationConfig` resources are stored only in the SCC location where they are created, must match the findings' location, cannot be viewed or edited elsewhere, and their location cannot be changed (delete and recreate). You cannot rename an export or change its filter; create a new export instead. Changing the retention-deletion option applies only to future deletion events.
- Pub/Sub topics whose message storage policy has `enforceInTransit` enabled are incompatible with continuous exports and may not receive notifications.
- The service account `service-org-ORGANIZATION_ID@gcp-sa-scc-notification.iam.gserviceaccount.com` is created and automatically granted `roles/securitycenter.notificationServiceAgent` at the organization level; it is required for notifications to work.
- Deleting a continuous export (**Delete**, then confirm in the dialog) deletes it and stops its notifications; try it on a test export first.
- Exported findings can contain sensitive resource data; restrict access to the destination bucket or topic.
- The same function through the API is described in [how-to-notifications.md](./how-to-notifications.md). Console click paths are summarized above; see the source page for the full steps.

## Related

- [how-to-notifications.md](./how-to-notifications.md)
- [how-to-api-list-findings.md](./how-to-api-list-findings.md)
- BigQuery streaming: https://docs.cloud.google.com/security-command-center/docs/how-to-analyze-findings-in-big-query
- BigQuery bulk export: https://docs.cloud.google.com/security-command-center/docs/bulk-exports-to-big-query
- Export logs to Logging: https://docs.cloud.google.com/security-command-center/docs/export-cloud-logging

---
source: https://docs.cloud.google.com/error-reporting/docs/viewing-errors
---

# View, filter and manage error groups

View, sort and filter error groups on the **Error Reporting** page, change resolution status, link groups to issue trackers, configure notifications, and delete stored error events. This page merges the "View and filter error groups" and "Manage error groups" pages.

## Signature / Usage

### Delete all error events of a project

Deletes all error events stored for the project and resets error-event counts to zero. This is irreversible; try it on a disposable project first.

Adapted (not in the official docs): added `--project=PROJECT_ID` so the destructive command names the project it deletes from instead of the active gcloud configuration's project.

```bash
gcloud beta error-reporting events delete --project=PROJECT_ID
```

The REST equivalent is the `projects.deleteEvents` method (https://docs.cloud.google.com/error-reporting/reference/rest/v1beta1/projects/deleteEvents).

## Options / Props

### Required roles

| Task | Role |
|---|---|
| View and filter errors | Error Reporting Viewer (`roles/errorreporting.viewer`) on the project |
| Manage errors (status, links, delete) | Error Reporting User (`roles/errorreporting.user`) on the project |

### Resolution status values

| Status | Meaning |
|---|---|
| Open | Default initial state of all error groups; you can revert a group to Open at any time |
| Acknowledged | State for triaging error groups |
| Resolved | Fixed and no longer expected to occur; if a Resolved group reoccurs, Error Reporting changes its status to Open |
| Muted | Hides the group from your list; an error event in a muted group isn't recorded and you aren't notified |

### Filters

| Filter | Detail |
|---|---|
| Resource (**All Resources** menu) | Some resources allow further filtering by error group labels (for example service, then version for Kubernetes Container Services); **Apply** saves, **Reset** then **Apply** clears |
| Text (**Filter errors** field) | Matches error information, HTTP response code, exception stack, request URL, report location, HTTP method |
| Status, region | Toolbar filters for status and the region of the log buckets that store the entries |

## Notes

- If the page shows "Set up Error Reporting", the project has no error groups to display.
- Error group details show the history of error events, resolution status, number of occurrences and a timestamped list of events, each with a link to relevant logs and, when available, a stack trace. If Gemini is enabled in the project, troubleshooting suggestions are available.
- **View Logs** (in the **Recent samples** pane) opens the Logs Explorer with the query-editor field specifying the error group ID, such as `errorGroups.id="ERROR_GROUP_ID"`. Only log entries stored in a log bucket can include the `errorGroups` field; it is populated by the log-bucket destination, and log data sent to your project or routed by log sinks doesn't contain an error group field.
- Error Reporting retains up to 1,000 sample events per group and extrapolates the remaining data; inspect all individual occurrences through the associated log entries in the Logs Explorer.
- Deleting events removes stored data and resets counts. If you subscribe to notifications and delete events for a Resolved group, its status returns to Open and Error Reporting sends a notification on a new event; for Open or Acknowledged groups no notification is sent for new events after deletion.
- `gcloud beta error-reporting events delete` takes no flags other than gcloud-wide flags; the `error-reporting` group is beta-only in gcloud 593.0.0 ("This command is currently in beta and might change without notice").
- Console click paths (status menu, issue-tracker link dialog) are summarized above and not reproduced. Notifications are configured at https://docs.cloud.google.com/error-reporting/docs/notifications; service error groups at https://docs.cloud.google.com/error-reporting/docs/service-errors.
- Adapted from the official docs: the source runs `gcloud beta error-reporting events delete` with no target, which deletes from whatever project the active configuration points to; `--project` is a gcloud-wide flag listed in the command's gcloud 593.0.0 help.
- Source: https://docs.cloud.google.com/error-reporting/docs/viewing-errors (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/error-reporting/docs/managing-errors (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [grouping-errors.md](./grouping-errors.md)
- [setup.md](./setup.md)
- [troubleshooting.md](./troubleshooting.md)

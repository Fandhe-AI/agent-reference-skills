---
source: https://docs.cloud.google.com/logging/docs/write-query-log-entries-gcloud
---

# Write and query log entries with the gcloud CLI

Quickstart: write and list structured and unstructured log entries with the gcloud CLI, list entries with the Cloud Logging API (APIs Explorer), and view and query them in the Logs Explorer. Requires a Google Cloud project with billing enabled.

## Signature / Usage

### Write log entries

```bash
gcloud logging write my-test-log "A simple entry."
```

After the command completes you see `Created log entry`.

```bash
gcloud logging write --payload-type=json my-test-log '{ "message": "My second entry", "weather": "partly cloudy"}'
```

Structured data requires `--payload-type=json`; otherwise the payload is interpreted as unstructured. If `my-test-log` doesn't exist, Logging creates the log when the entry is received.

### List log entries

```bash
gcloud logging read "resource.type=global"
```

```text
---
insertId: jpj9zjf73t1mn
jsonPayload:
  message: My second entry
  weather: partly cloudy
logName: projects/myloggingproject/logs/my-test-log
receiveTimestamp: '2018-11-01T18:39:31.114507977Z'
resource:
  labels:
    project_id: myloggingproject
  type: global
timestamp: '2018-11-01T18:39:31.114507977Z'
---
insertId: vd4m1if7h7u1a
logName: projects/myloggingproject/logs/my-test-log
receiveTimestamp: '2018-11-01T18:39:19.718100792Z'
resource:
  labels:
    project_id: myloggingproject
  type: global
textPayload: A simple entry
timestamp: '2018-11-01T18:39:19.718100792Z'
```

### List with the `entries.list` method (APIs Explorer request body)

Replace `PROJECT_ID` before pasting into the Request body field.

```text
"resourceNames": [
"projects/PROJECT_ID"
],
"filter": "resource.type=global",
"orderBy": "timestamp desc"
```

### Query in the Logs Explorer

With `resource.type="global"` in the query editor, a structured-field query:

```text
jsonPayload.weather:partly
```

### Clean up

```bash
gcloud logging logs delete my-test-log
```

## Options / Props

### Roles

| Role | Grants |
|---|---|
| Logging Admin (`roles/logging.admin`) | Create, list, and delete log entries (and all other Logging actions) |
| Logs Writer (`roles/logging.logWriter`) | Create log entries |
| Logs Viewer (`roles/logging.viewer`) | List log entries |

### Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `INVALID_ARGUMENT: Field not found: 'resourcetype'` | Typo or unknown field name (missing period in `resource.type`). |
| `PERMISSION_DENIED: Request had insufficient authentication scopes.` | VM with default API settings; stop the VM and set the Cloud Logging API access scope to Full. |
| APIs Explorer 200 with no entries and a `nextPageToken` | Search did not finish; add a `pageToken` equal to `nextPageToken` and retry. |
| APIs Explorer 400 | Invalid query value (for example `Unsupported resource type: gloobal`). |
| APIs Explorer 404 | Invalid project ID. |

## Notes

- `gcloud logging logs delete` deletes all entries of the log. It removes data permanently; try it on a disposable project first. If you don't delete the entries they expire per the retention settings.
- When `message` is a key of a structured entry, the Logs Explorer uses it as the summary of the unexpanded entry.
- Entries can take a few minutes to appear in the Logs Explorer.
- `gcloud logging write` is for simple testing; do not write credentials into test entries.
- The source also shows Console steps for the Logs Explorer and VM access-scope edits.
- Source: https://docs.cloud.google.com/logging/docs/write-query-log-entries-gcloud (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [setup.md](./setup.md)
- [log-entry-data-model.md](./log-entry-data-model.md)
- [access-control.md](./access-control.md)

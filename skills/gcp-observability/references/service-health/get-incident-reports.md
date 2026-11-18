---
source: https://docs.cloud.google.com/service-health/docs/get-incident-reports
---

# Get incident reports

Preview. How to get the incident report (an artifact) for a Google Cloud incident with the Service Health API `v1beta`, and how to list incident reports.

## Signature / Usage

### Find the artifact ID of the incident report

Get the incident details (see `list-events.md` and https://docs.cloud.google.com/service-health/docs/project-events#get_incident_details) and look for this line in the JSON response:

```text
"artifact": "projects/PROJECT_ID/locations/global/artifacts/ARTIFACT_ID",
```

### Get the content of the incident report

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://servicehealth.googleapis.com/v1beta/projects/PROJECT_ID/locations/global/artifacts/ARTIFACT_ID"
```

Response sample (kept as written; trailing commas, so not strict JSON):

```text
{
  "name": "projects/PROJECT_ID/locations/global/artifacts/ARTIFACT_ID",
  "content": {
      "markdown": "Content of the incident report.",
    },
  "category": "ARTIFACT_CATEGORY_INCIDENT_REPORT",
  "createTime": "2022-10-18T18:00:05.690761Z",
  "updateTime": "2022-10-18T17:41:20.112287Z",
}
```

### Retrieve a list of incident reports (`ListArtifacts`)

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://servicehealth.googleapis.com/v1beta/projects/PROJECT_ID/locations/global/artifacts"
```

```text
{
  "artifacts": [
    {
      "name": "projects/PROJECT_ID/locations/global/artifacts/b2a4600f-33fb-4d33-a3ad-f43c8b8f2a3a",
      "content": {
          "markdown": "Content of the incident report.",
        },
      "category": "ARTIFACT_CATEGORY_INCIDENT_REPORT",
      "createTime": "2022-10-18T17:41:20.112287Z",
      "updateTime": "2022-10-18T18:00:05.690761Z",
    }
  ],
  "nextPageToken": "ABCREGI=",
  "unreachable": []
}
```

## Options / Props

### Availability conditions for an incident report

| Condition |
|---|
| The incident has global impact or is affecting a significant percentage of customer projects across one or more regions. |
| One or more products are unavailable or severely degraded. |
| Twenty four hours before the start of the incident, you have enabled the Service Health API. |

### Artifact fields in the response

| Field | Description |
|---|---|
| `name` | `projects/PROJECT_ID/locations/global/artifacts/ARTIFACT_ID` |
| `content.markdown` | Content of the incident report. |
| `category` | `ARTIFACT_CATEGORY_INCIDENT_REPORT` |
| `createTime`, `updateTime` | Timestamps. |
| `nextPageToken`, `unreachable` | List response fields. |

## Notes

- Preview ("Pre-GA Offerings Terms"; available "as is" and might have limited support). The methods are on `v1beta`; the gcloud 593.0.0 help has `gcloud beta service-health artifacts list|describe`, which the twin does not use (it shows REST only).
- Before you begin: set the permissions to access the Service Health API (see `manage-access.md`) and get the event ID of the incident; you can list closed incidents (see `list-events.md`). A missing permission returns `PERMISSION_DENIED` naming `servicehealth.artifacts.get` on the artifact resource.
- The source also shows PowerShell and the `PERMISSION_DENIED` body.
- Source: https://docs.cloud.google.com/service-health/docs/get-incident-reports (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts.md](./concepts.md)
- [list-events.md](./list-events.md)
- [incident-lifecycle.md](./incident-lifecycle.md)
- [manage-access.md](./manage-access.md)

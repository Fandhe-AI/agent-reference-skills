---
source: https://docs.cloud.google.com/service-health/docs/list-events
---

# List Service Health events and impacts

How to list Personalized Service Health events for a project or organization, the projects of an organization that may be affected by an event, and (Preview, v1beta) the impacted resources in a project, using the `servicehealth.googleapis.com` REST API or `gcloud`.

## Signature / Usage

Enable the API first with `gcloud services enable servicehealth.googleapis.com` (see `manage-access.md`).

### List all active incidents for a project

Replace `API_VERSION` with `v1` or `v1beta` and `PROJECT_ID` with the project ID.

Adapted (not in the official docs): removed the literal `&page_token={page_token}` (the first request has no page token; add `page_token` only with a `nextPageToken` value from a previous response).

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://servicehealth.googleapis.com/API_VERSION/projects/PROJECT_ID/locations/global/events?filter=state=ACTIVE%20category=INCIDENT&page_size=2"
```

### List all active incidents for an organization

`PROJECT_ID` is the project used for quota and billing (sent as `x-goog-user-project`).

Adapted (not in the official docs): removed the literal `&page_token={page_token}` (see above).

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: PROJECT_ID" \
     "https://servicehealth.googleapis.com/API_VERSION/organizations/ORGANIZATION_ID/locations/global/organizationEvents?filter=state=ACTIVE%20category=INCIDENT&page_size=2"
```

### List projects under an organization that may be affected by an event

Adapted (not in the official docs): removed the literal `&page_token={page_token}` (see above), and added the missing `organizationEvents` segment to the event name in the filter (`...%2Fglobal%2ForganizationEvents%2FEVENT_ID`).

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: PROJECT_ID" \
     "https://servicehealth.googleapis.com/API_VERSION/organizations/ORGANIZATION_ID/locations/global/organizationImpacts?filter=events:organizations%2FORGANIZATION_ID%2Flocations%2Fglobal%2ForganizationEvents%2FEVENT_ID&page_size=2"
```

### List impacted resources in a project (Preview, v1beta)

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json; charset=utf-8" \
  "https://servicehealth.googleapis.com/v1beta/projects/PROJECT_ID/locations/global/impacts"
```

```bash
gcloud beta service-health impacts list \
    --project=PROJECT_ID \
    --location=global
```

Only the resources impacted by one event:

```bash
gcloud beta service-health impacts list \
    --project=PROJECT_ID \
    --location=global \
    --filter="events:projects/PROJECT_ID/locations/global/events/EVENT_ID"
```

### Get one impacted resource (Preview, v1beta)

```bash
gcloud beta service-health impacts describe IMPACT_ID \
    --project=PROJECT_ID \
    --location=global
```

## Options / Props

### Required roles

| Role | Where |
|---|---|
| Personalized Service Health Viewer (`roles/servicehealth.viewer`) | The project or organization you want to list events for. A role on an organization applies to the organization and all projects, folders and resources within it. |

### Event fields in the sample response

| Field | Sample value |
|---|---|
| `name` | `projects/PROJECT_ID/locations/global/events/event-123` |
| `category` | `INCIDENT` |
| `detailedCategory` | `CONFIRMED_INCIDENT` |
| `state` | `ACTIVE` |
| `detailedState` | `CONFIRMED` |
| `eventImpacts[].product` | `productName`, `id` (for example `hV87iK5DcEXKgWU2kDri`) |
| `eventImpacts[].location` | `locationName` (for example `asia-east2`) |
| `relevance` | `RELATED` (project events only; organization events have no `relevance`) |
| `updateTime`, `startTime`, `nextUpdateTime` | RFC 3339 timestamps |
| `nextPageToken` | Present when more results exist |

### Impacts list parameters (v1beta)

| Parameter | Value | Description |
|---|---|---|
| `parent` | `projects/PROJECT_ID/locations/global` | Required. Project ID or project number. |
| `pageSize` | 1 to 100 | Optional. Maximum impacts per page; defaults to 10 when unspecified. |
| `pageToken` | string | Optional. Token from a previous `ListImpactsResponse`. |
| `filter` | string | Optional. For example `events:projects/PROJECT_ID/locations/global/events/EVENT_ID`. |

### Impact filter examples

| Goal | Filter |
|---|---|
| Resources impacted by a specific event | `events:projects/PROJECT_ID/locations/global/events/EVENT_ID` |
| Resources of one type (for example Cloud SQL instances) | `asset.assetType="sqladmin.googleapis.com/Instance"` |
| Updated after a timestamp | `updateTime>"2026-10-08T00:00:00Z"` |

### Permissions named in `PERMISSION_DENIED` errors

| Call | Permission |
|---|---|
| Project events list | `servicehealth.events.list` |
| Organization events list | `servicehealth.organizationEvents.list` |
| Organization impacts list | `servicehealth.organizationImpacts.list` |
| Project impacts list | `servicehealth.impacts.list` (included in `roles/servicehealth.viewer`) |

## Notes

- Use `v1` or `v1beta` for events, organization events and organization impacts. Impacts (resources) exist in `v1beta` only, and are Preview ("Pre-GA Offerings Terms"; "as is", might have limited support).
- If the response is large, the example lists only some incidents; a non-empty `nextPageToken` is returned and passed in the next request as the `page_token` query parameter.
- Set product and location values from https://docs.cloud.google.com/service-health/docs/supported-products-locations (and its locations section).
- Listing impacted resources requires the Service Health API (`servicehealth.googleapis.com`) to be enabled on the project at least 24 hours before the event starts.
- gcloud 593.0.0 help: `gcloud service-health events list` (GA, flags `--location`, `--view` with `event-view-basic` or `event-view-full`, and the list flags) and the `organization-events` / `organization-impacts` groups exist on GA; `gcloud beta service-health impacts list|describe` and `artifacts` are beta only, as in the source. The help says to use location `global` for incident events. `--filter` on `gcloud` is the gcloud list-filter flag (see `gcloud topic filters`), not the REST `filter` query parameter.
- The `gcloud service-health` commands are not shown in the twin for events; the REST examples are.
- Adapted from the official docs: the request URLs ended with `&page_token={page_token}`; the literal `{page_token}` placeholder was removed from the three list requests.
- Corrected from the official docs: the organization-impacts filter read `events:organizations%2FORGANIZATION_ID%2Flocations%2Fglobal%2FEVENT_ID`, which drops the `organizationEvents` collection; the same page's response lists each impact's `events` as `organizations/ORGANIZATION_ID/locations/global/organizationEvents/EVENT_ID` (the project filter `events:projects/PROJECT_ID/locations/global/events/EVENT_ID` likewise uses the full event name), so the filter uses `...%2Fglobal%2ForganizationEvents%2FEVENT_ID`.
- The source also shows PowerShell forms, the `PERMISSION_DENIED` response bodies, all response samples (with trailing commas in the source; the event fields are in the table above), and the single-impact curl and response. Organization events: see `organization-events.md`.
- Source inconsistency: this page and `manage-access.md` say `servicehealth.impacts.list` and `servicehealth.impacts.get` are in `roles/servicehealth.viewer`, but the IAM roles and permissions reference for `servicehealth` (https://docs.cloud.google.com/iam/docs/roles-permissions/servicehealth, retrieved 2026-11-14) lists no `servicehealth.impacts.*` permission in that role or any other. The Preview statement of the twin is kept; check the role with `gcloud iam roles describe roles/servicehealth.viewer` before relying on it.
- Source: https://docs.cloud.google.com/service-health/docs/list-events (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [organization-events.md](./organization-events.md)
- [concepts.md](./concepts.md)
- [manage-access.md](./manage-access.md)
- [get-incident-reports.md](./get-incident-reports.md)

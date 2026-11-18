---
source: https://docs.cloud.google.com/service-health/docs/organization-events
---

# Organization events and impacts (Service Health API)

The `OrganizationEvents` and `OrganizationImpacts` API resources return Service Health events that may affect one or more projects in an organization and the list of projects that may be or are impacted by an event.

## Signature / Usage

### Grant access on the organization

Adapted (not in the official docs): `$ORGANIZATION_ID` is quoted and the `{USER|GROUP|SERVICE_ACCOUNT}` placeholder is replaced by `MEMBER`, a type-prefixed principal such as `user:EMAIL`, `group:EMAIL` or `serviceAccount:EMAIL`.

```bash
gcloud organizations add-iam-policy-binding "${ORGANIZATION_ID}" \
  --member MEMBER \
  --role roles/servicehealth.viewer
```

### Get details for an event affecting an organization

Adapted (not in the official docs): the source writes `API VERSION` with a space in the URL; changed to `API_VERSION` (`v1` or `v1beta`). `PROJECT_ID` is the project used for quota and billing.

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: PROJECT_ID" \
     "https://servicehealth.googleapis.com/API_VERSION/organizations/ORGANIZATION_ID/locations/global/organizationEvents/EVENT_ID"
```

Response sample (kept as written; it has trailing commas, so it is not strict JSON):

```text
{
  "name": "organizations/ORGANIZATION_ID/locations/global/organizationEvents/EVENT_ID",
     "title": "We are experiencing a connectivity issue affecting Google Cloud SQL in us-east1, australia-southeast2.",
      "description": "The issue with Google Cloud SQL has been resolved for all affected projects as of Tuesday, 2022-10-18 11:00 US/Pacific. We thank you for your patience while we worked on resolving the issue.",
      "category": "INCIDENT",
      "detailedCategory": "CONFIRMED_INCIDENT",
      "state": "CLOSED",
      "detailedState": "RESOLVED",
      "eventImpacts": [
        {
          "product": {
            "productName": "Google Cloud SQL",
            "id": "hV87iK5DcEXKgWU2kDri",
          },
          "location": {
            "locationName": "us-central1",
          }
        }
      ],
   "updates": [
    {
      "updateTime": "2022-10-18T17:41:20.112287Z",
              "title": "We are experiencing a connectivity issue affecting Google Cloud SQL in us-east1, australia-southeast2.",
      "description": "We are experiencing an intermittent issue with Google Cloud SQL. Our engineering team continues to investigate the issue.",
      "symptom": "None at this time.",
      "workaround": "None at this time."
    },
    {
      "updateTime": "2022-10-18T18:00:05.690761Z",
      "title": "We are experiencing a connectivity issue affecting Google Cloud SQL in us-east1, australia-southeast2.",
      "description": "The issue with Google Cloud SQL has been resolved for all affected projects as of Tuesday, 2022-10-18 11:00 US/Pacific.\n\nWe thank you for your patience while we worked on resolving the issue.",
      "symptom": "None at this time.",
      "workaround": "None at this time."
    }
  ],
  "updateTime": "2022-10-18T18:00:05.690761Z",
  "startTime": "2022-10-18T17:41:20.112287Z",
  "endTime":  "2022-10-18T18:00:05.690761Z",
}
```

## Options / Props

### Permissions named in `PERMISSION_DENIED` errors

| Call | Permission |
|---|---|
| Get organization event | `servicehealth.organizationEvents.get` |
| List organization events | `servicehealth.organizationEvents.list` |
| List organization impacts | `servicehealth.organizationImpacts.list` |

## Notes

- Prerequisites: enable the Service Health API for at least one project under the organization (OrganizationEvents and OrganizationImpacts return information only for projects that have the Service Health API enabled), verify that billing is enabled, set the permissions from `manage-access.md`, and grant `roles/servicehealth.viewer` on the organization (above).
- The role on the organization is inherited by all projects in the organization, which lets you access organization and project event APIs across the organization. It is broader than a project-level grant.
- In the API response, each entry in the `impact` list includes the granular disruption `state` (`AFFECTED` or `RESOLVED`), `startTime`, and `endTime` (when resolved) for each impacted product and location. Set product and location values from https://docs.cloud.google.com/service-health/docs/supported-products-locations.
- For a given event, the event ID is the same in your project and organization events. An `OrganizationImpact` contains an `EVENT_ID` and a `PROJECT_NUMBER` which you can use to get details of the project event (`state` and `relevance`). `PROJECT_NUMBER` is interchangeable with `PROJECT_ID`, which the Get API returns.
- Listing active incidents for an organization and listing projects that may be affected by an event are in `list-events.md`. The console view is described at https://docs.cloud.google.com/service-health/docs/organization-views.
- Corrected from the official docs: the get-event URL read `https://servicehealth.googleapis.com/API VERSION/organizations/...`; the grant command used `$ORGANIZATION_ID` unquoted and `--member {USER|GROUP|SERVICE_ACCOUNT}`.
- The source also shows PowerShell and the `PERMISSION_DENIED` body for the get call.
- Source: https://docs.cloud.google.com/service-health/docs/organization-events (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [list-events.md](./list-events.md)
- [concepts.md](./concepts.md)
- [manage-access.md](./manage-access.md)

---
source: https://policyanalyzer.googleapis.com/$discovery/rest?version=v1
---

# Policy Analyzer API REST API (policyanalyzer)

## Signature / Usage

Base URL: `https://policyanalyzer.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `policyanalyzer.folders.locations.activityTypes.activities.query`

- Versions: v1, v1beta1
- `GET https://policyanalyzer.googleapis.com/v1/{+parent}/activities:query`
- Queries policy activities on Google Cloud resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicyanalyzerV1QueryActivityResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The container resource on which to execute the request. Acceptable formats: `projects/[PROJECT_ID\|PROJECT_NUMBER]/locations/[LOCATION]/activityTypes/[ACTIVITY_TYPE]` LOCATION here refers to Google Cloud Locations: https://cloud.google.com/about/locations/ |
| `filter` | query | string | no | Optional. Filter expression to restrict the activities returned. For serviceAccountLastAuthentication activities, supported filters are: - `activities.full_resource_name {=} [STRING]` - `activities.fullResourceName {=} [STRING]` where `[STRING]` is the full resource name of the service account. For serviceAccountKeyLastAuthentication activities, supported filters are: - `activities.full_resource_name {=} [STRING]` - `activities.fullResourceName {=} [STRING]` where `[STRING]` is the full resource name of the service account key. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Max limit is 1000. Non-positive values are ignored. The presence of `nextPageToken` in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. `pageToken` must be the value of `nextPageToken` from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `policyanalyzer.organizations.locations.activityTypes.activities.query`

- Versions: v1, v1beta1
- `GET https://policyanalyzer.googleapis.com/v1/{+parent}/activities:query`
- Queries policy activities on Google Cloud resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicyanalyzerV1QueryActivityResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The container resource on which to execute the request. Acceptable formats: `projects/[PROJECT_ID\|PROJECT_NUMBER]/locations/[LOCATION]/activityTypes/[ACTIVITY_TYPE]` LOCATION here refers to Google Cloud Locations: https://cloud.google.com/about/locations/ |
| `filter` | query | string | no | Optional. Filter expression to restrict the activities returned. For serviceAccountLastAuthentication activities, supported filters are: - `activities.full_resource_name {=} [STRING]` - `activities.fullResourceName {=} [STRING]` where `[STRING]` is the full resource name of the service account. For serviceAccountKeyLastAuthentication activities, supported filters are: - `activities.full_resource_name {=} [STRING]` - `activities.fullResourceName {=} [STRING]` where `[STRING]` is the full resource name of the service account key. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Max limit is 1000. Non-positive values are ignored. The presence of `nextPageToken` in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. `pageToken` must be the value of `nextPageToken` from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `policyanalyzer.projects.locations.activityTypes.activities.query`

- Versions: v1, v1beta1
- `GET https://policyanalyzer.googleapis.com/v1/{+parent}/activities:query`
- Queries policy activities on Google Cloud resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudPolicyanalyzerV1QueryActivityResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The container resource on which to execute the request. Acceptable formats: `projects/[PROJECT_ID\|PROJECT_NUMBER]/locations/[LOCATION]/activityTypes/[ACTIVITY_TYPE]` LOCATION here refers to Google Cloud Locations: https://cloud.google.com/about/locations/ |
| `filter` | query | string | no | Optional. Filter expression to restrict the activities returned. For serviceAccountLastAuthentication activities, supported filters are: - `activities.full_resource_name {=} [STRING]` - `activities.fullResourceName {=} [STRING]` where `[STRING]` is the full resource name of the service account. For serviceAccountKeyLastAuthentication activities, supported filters are: - `activities.full_resource_name {=} [STRING]` - `activities.fullResourceName {=} [STRING]` where `[STRING]` is the full resource name of the service account key. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Max limit is 1000. Non-positive values are ignored. The presence of `nextPageToken` in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. `pageToken` must be the value of `nextPageToken` from the previous response. The values of other method parameters should be identical to those in the previous call. |

### Example request skeleton

Generated from the Discovery entry of `policyanalyzer.folders.locations.activityTypes.activities.query` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://policyanalyzer.googleapis.com/v1/{+parent}/activities:query"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `policyanalyzer` (retrieved 2026-11-14). Resources on this page: folders, organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/policyanalyzer/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://policyanalyzer.googleapis.com/$discovery/rest?version=v1, https://policyanalyzer.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

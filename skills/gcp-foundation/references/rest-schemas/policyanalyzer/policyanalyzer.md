---
source: https://policyanalyzer.googleapis.com/$discovery/rest?version=v1
---

# Policy Analyzer API message schemas (policyanalyzer)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/policyanalyzer/`.

### `GoogleCloudPolicyanalyzerV1Activity`

- Represents Activity on a GCP resource over specific observation period.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activity` | object | A struct of custom fields to explain the activity. |
| `activityType` | string | The type of the activity. |
| `fullResourceName` | string | The full resource name that identifies the resource. For examples of full resource names for Google Cloud services, see https://cloud.google.com/iam/help/troubleshooter/full-resource-names. |
| `observationPeriod` | GoogleCloudPolicyanalyzerV1ObservationPeriod | The data observation period to build the activity. |

### `GoogleCloudPolicyanalyzerV1ObservationPeriod`

- Represents data observation period.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The observation end time. The time in this timestamp is always `07:00:00Z`. |
| `startTime` | string (google-datetime) | The observation start time. The time in this timestamp is always `07:00:00Z`. |

### `GoogleCloudPolicyanalyzerV1QueryActivityResponse`

- Response to the `QueryActivity` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activities` | array<GoogleCloudPolicyanalyzerV1Activity> | The set of activities that match the filter included in the request. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `nextPageToken` is included. To get the next set of results, call this method again using the value of `nextPageToken` as `pageToken`. |

### `GoogleCloudPolicyanalyzerV1beta1Activity`

- Represents Activity on a GCP resource over specific observation period.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `activity` | object | A struct of custom fields to explain the activity. |
| `activityType` | string | The type of the activity. |
| `fullResourceName` | string | The full resource name that identifies the resource. For examples of full resource names for Google Cloud services, see https://cloud.google.com/iam/help/troubleshooter/full-resource-names. |
| `observationPeriod` | GoogleCloudPolicyanalyzerV1beta1ObservationPeriod | The data observation period to build the activity. |

### `GoogleCloudPolicyanalyzerV1beta1ObservationPeriod`

- Represents data observation period.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The observation end time. |
| `startTime` | string (google-datetime) | The observation start time. |

### `GoogleCloudPolicyanalyzerV1beta1QueryActivityResponse`

- Response to the `QueryActivity` method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `activities` | array<GoogleCloudPolicyanalyzerV1beta1Activity> | The set of activities that match the filter included in the request. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `nextPageToken` is included. To get the next set of results, call this method again using the value of `nextPageToken` as `pageToken`. |

### Shape of `GoogleCloudPolicyanalyzerV1Activity`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "activity": "object",
  "activityType": "string",
  "fullResourceName": "string",
  "observationPeriod": "GoogleCloudPolicyanalyzerV1ObservationPeriod"
}
```

## Notes

- Generated from the Discovery document(s) of `policyanalyzer` (retrieved 2026-11-14); a type shared by several versions shows the preferred version.
- Source: https://policyanalyzer.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

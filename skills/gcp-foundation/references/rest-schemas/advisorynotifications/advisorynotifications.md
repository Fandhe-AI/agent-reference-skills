---
source: https://advisorynotifications.googleapis.com/$discovery/rest?version=v1
---

# Advisory Notifications API message schemas (advisorynotifications)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/advisorynotifications/`.

### `GoogleCloudAdvisorynotificationsV1Attachment`

- Attachment with specific information about the issue.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `csv` | GoogleCloudAdvisorynotificationsV1Csv | A CSV file attachment. Max size is 10 MB. |
| `displayName` | string | The title of the attachment. |

### `GoogleCloudAdvisorynotificationsV1Csv`

- A representation of a CSV file attachment, as a list of column headers and a list of data rows.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataRows` | array<GoogleCloudAdvisorynotificationsV1CsvCsvRow> | The list of data rows in a CSV file, as string arrays rather than as a single comma-separated string. |
| `headers` | array<string> | The list of headers for data columns in a CSV file. |

### `GoogleCloudAdvisorynotificationsV1CsvCsvRow`

- A representation of a single data row in a CSV file.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entries` | array<string> | The data entries in a CSV file row, as a string array rather than a single comma-separated string. |

### `GoogleCloudAdvisorynotificationsV1ListNotificationsResponse`

- Response of ListNotifications endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `notifications` | array<GoogleCloudAdvisorynotificationsV1Notification> | List of notifications under a given parent. |
| `totalSize` | integer (int32) | Estimation of a total number of notifications. |

### `GoogleCloudAdvisorynotificationsV1Message`

- A message which contains notification details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachments` | array<GoogleCloudAdvisorynotificationsV1Attachment> | The attachments to download. |
| `body` | GoogleCloudAdvisorynotificationsV1MessageBody | The message content. |
| `createTime` | string (google-datetime) | The Message creation timestamp. |
| `localizationTime` | string (google-datetime) | Time when Message was localized |

### `GoogleCloudAdvisorynotificationsV1MessageBody`

- A message body containing text.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `text` | GoogleCloudAdvisorynotificationsV1Text | The text content of the message body. |

### `GoogleCloudAdvisorynotificationsV1Notification`

- A notification object for notifying customers about security and privacy issues.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Time the notification was created. |
| `messages` | array<GoogleCloudAdvisorynotificationsV1Message> | A list of messages in the notification. |
| `name` | string | The resource name of the notification. Format: organizations/{organization}/locations/{location}/notifications/{notification} or projects/{project}/locations/{location}/notifications/{notification}. |
| `notificationType` | string enum | Type of notification |
| `subject` | GoogleCloudAdvisorynotificationsV1Subject | The subject line of the notification. |

### `GoogleCloudAdvisorynotificationsV1NotificationSettings`

- Settings for each NotificationType.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the associated NotificationType is enabled. |

### `GoogleCloudAdvisorynotificationsV1Settings`

- Settings for Advisory Notifications.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Required. Fingerprint for optimistic concurrency returned in Get requests. Must be provided for Update requests. If the value provided does not match the value known to the server, ABORTED will be thrown, and the client should retry the read-modify-write cycle. |
| `name` | string | Identifier. The resource name of the settings to retrieve. Format: organizations/{organization}/locations/{location}/settings or projects/{projects}/locations/{location}/settings. |
| `notificationSettings` | object | Required. Map of each notification type and its settings to get/set all settings at once. The server will validate the value for each notification type. |

### `GoogleCloudAdvisorynotificationsV1Subject`

- A subject line of a notification.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `text` | GoogleCloudAdvisorynotificationsV1Text | The text content. |

### `GoogleCloudAdvisorynotificationsV1Text`

- A text object containing the English text and its localized copies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enText` | string | The English copy. |
| `localizationState` | string enum | Status of the localization. |
| `localizedText` | string | The requested localized copy (if applicable). |

### Shape of `GoogleCloudAdvisorynotificationsV1Attachment`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "csv": "GoogleCloudAdvisorynotificationsV1Csv",
  "displayName": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `advisorynotifications` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://advisorynotifications.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

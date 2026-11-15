---
source: https://essentialcontacts.googleapis.com/$discovery/rest?version=v1
---

# Essential Contacts API message schemas (essentialcontacts)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/essentialcontacts/`.

### `GoogleCloudEssentialcontactsV1ComputeContactsResponse`

- Response message for the ComputeContacts method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contacts` | array<GoogleCloudEssentialcontactsV1Contact> | All contacts for the resource that are subscribed to the specified notification categories, including contacts inherited from any parent resources. |
| `nextPageToken` | string | If there are more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token` and the rest of the parameters the same as the original request. |

### `GoogleCloudEssentialcontactsV1Contact`

- A contact that will receive notifications from Google Cloud.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | Required. The email address to send notifications to. The email address does not need to be a Google Account. |
| `languageTag` | string | Required. The preferred language for notifications, as a ISO 639-1 language code. See Supported languages (https://cloud.google.com/resource-manager/docs/managing-notification-contacts#supported-languages) for a list of supported languages. |
| `name` | string | Output only. The identifier for the contact. Format: {resource_type}/{resource_id}/contacts/{contact_id} |
| `notificationCategorySubscriptions` | array<string> | Required. The categories of notifications that the contact will receive communications for. Values: `NOTIFICATION_CATEGORY_UNSPECIFIED`, `ALL`, `SUSPENSION`, `SECURITY`, `TECHNICAL`, `BILLING`, `LEGAL`, `PRODUCT_UPDATES`, `TECHNICAL_INCIDENTS`. |
| `validateTime` | string (google-datetime) | Output only. The last time the validation_state was updated, either manually or automatically. A contact is considered stale if its validation state was updated more than 1 year ago. |
| `validationState` | string enum | Output only. The validity of the contact. A contact is considered valid if it is the correct recipient for notifications for a particular resource. Values: `VALIDATION_STATE_UNSPECIFIED`, `VALID`, `INVALID`. |

### `GoogleCloudEssentialcontactsV1ListContactsResponse`

- Response message for the ListContacts method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contacts` | array<GoogleCloudEssentialcontactsV1Contact> | The contacts for the specified resource. |
| `nextPageToken` | string | If there are more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token` and the rest of the parameters the same as the original request. |

### `GoogleCloudEssentialcontactsV1SendTestMessageRequest`

- Request message for the SendTestMessage method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contacts` | array<string> | Required. The list of names of the contacts to send a test message to. Format: organizations/{organization}/contacts/{contact}, folders/{folder}/contacts/{contact} or projects/{project}/contacts/{contact} (where {project} is the project number) |
| `notificationCategory` | string enum | Required. The notification category to send the test message for. All contacts must be subscribed to this category. Values: `NOTIFICATION_CATEGORY_UNSPECIFIED`, `ALL`, `SUSPENSION`, `SECURITY`, `TECHNICAL`, `BILLING`, `LEGAL`, `PRODUCT_UPDATES`, `TECHNICAL_INCIDENTS`. |

### `GoogleProtobufEmpty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### Shape of `GoogleCloudEssentialcontactsV1ComputeContactsResponse`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "contacts": "array<GoogleCloudEssentialcontactsV1Contact>",
  "nextPageToken": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `essentialcontacts` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://essentialcontacts.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

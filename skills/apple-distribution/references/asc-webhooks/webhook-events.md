# Understanding Webhook Events

The event payloads that App Store Connect sends to your webhook listener, describing the change and a relationship to the affected resource.

## Signature / Usage

```json
{
  "data": {
    "type": "appStoreVersionAppVersionStateUpdated",
    "id": "7c813492-9516-4c79-903e-224effdd57ac",
    "version": 1,
    "attributes": {
      "newValue": "READY_FOR_REVIEW",
      "oldValue": "PREPARE_FOR_SUBMISSION",
      "timestamp": "2025-04-16T05:00:52.745Z"
    },
    "relationships": {
      "instance": {
        "data": { "type": "appStoreVersions", "id": "ad7e6298-2570-4ca6-b3cc-f81788e40bdc" }
      }
    }
  }
}
```

## Options / Props

### `WebhookEventType` values

| Category | Event Type |
|----------|------------|
| App status changes | `APP_STORE_VERSION_APP_VERSION_STATE_UPDATED` |
| Build beta state changes | `BUILD_BETA_DETAIL_EXTERNAL_BUILD_STATE_UPDATED` |
| Build status changes | `BUILD_UPLOAD_STATE_UPDATED` |
| Beta feedback | `BETA_FEEDBACK_SCREENSHOT_SUBMISSION_CREATED` |
| Beta feedback | `BETA_FEEDBACK_CRASH_SUBMISSION_CREATED` |
| Background Asset processing | `BACKGROUND_ASSET_VERSION_STATE_UPDATED` |
| Background Asset internal beta | `BACKGROUND_ASSET_VERSION_INTERNAL_BETA_RELEASE_CREATED` |
| Background Asset internal beta | `BACKGROUND_ASSET_VERSION_EXTERNAL_BETA_RELEASE_STATE_UPDATED` |
| Background Asset App Store release | `BACKGROUND_ASSET_VERSION_APP_STORE_RELEASE_STATE_UPDATED` |
| Alternative marketplace | `ALTERNATIVE_DISTRIBUTION_PACKAGE_VERSION_CREATED` |
| Alternative marketplace | `ALTERNATIVE_DISTRIBUTION_PACKAGE_AVAILABLE_UPDATED` |
| Alternative marketplace | `ALTERNATIVE_DISTRIBUTION_TERRITORY_AVAILABILITY_UPDATED` |

## Notes

- Every event payload includes `data.type` (a specific schema per event, e.g. `buildUploadStateUpdated`), `data.id`, and `data.relationships.instance` pointing to the affected resource (e.g. `appStoreVersions`, `buildUploads`, `betaFeedbackCrashSubmissions`).
- State-transition events (`*_STATE_UPDATED`) carry `newValue`/`oldValue` or `newState`/`oldState` attributes plus a `timestamp`.
- Alternative-marketplace events additionally include `appId` and, for availability changes, a `territories` array of ISO 3166-1 alpha-3 codes.
- Enable specific event types per webhook via the `eventTypes` attribute when creating or modifying a webhook.

## Related

- [Configuring and Parsing Webhook Notifications](./configuring-webhook-notifications.md)
- [Webhooks](./webhooks.md)
- [App Store Versions](../asc-api-core/app-store-versions.md)
- [Builds](../asc-api-core/builds.md)

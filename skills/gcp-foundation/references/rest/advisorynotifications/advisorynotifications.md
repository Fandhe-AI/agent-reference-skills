---
source: https://advisorynotifications.googleapis.com/$discovery/rest?version=v1
---

# Advisory Notifications API REST API (advisorynotifications)

## Signature / Usage

Base URL: `https://advisorynotifications.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `advisorynotifications.organizations.locations.getSettings`

- Versions: v1
- `GET https://advisorynotifications.googleapis.com/v1/{+name}`
- Get notification settings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAdvisorynotificationsV1Settings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the settings to retrieve. Format: organizations/{organization}/locations/{location}/settings or projects/{projects}/locations/{location}/settings. |

### `advisorynotifications.organizations.locations.notifications.get`

- Versions: v1
- `GET https://advisorynotifications.googleapis.com/v1/{+name}`
- Gets a notification.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAdvisorynotificationsV1Notification`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the notification to retrieve. Format: organizations/{organization}/locations/{location}/notifications/{notification} or projects/{projects}/locations/{location}/notifications/{notification}. |
| `languageCode` | query | string | no | ISO code for requested localization language. If unset, will be interpereted as "en". If the requested language is valid, but not supported for this notification, English will be returned with an "Not applicable" LocalizationState. If the ISO code is invalid (i.e. not a real language), this RPC will throw an error. |

### `advisorynotifications.organizations.locations.notifications.list`

- Versions: v1
- `GET https://advisorynotifications.googleapis.com/v1/{+parent}/notifications`
- Lists notifications under a given parent.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAdvisorynotificationsV1ListNotificationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of notifications. Must be of the form "organizations/{organization}/locations/{location}" or "projects/{project}/locations/{location}". |
| `languageCode` | query | string | no | ISO code for requested localization language. If unset, will be interpereted as "en". If the requested language is valid, but not supported for this notification, English will be returned with an "Not applicable" LocalizationState. If the ISO code is invalid (i.e. not a real language), this RPC will throw an error. |
| `pageSize` | query | integer (int32) | no | The maximum number of notifications to return. The service may return fewer than this value. If unspecified or equal to 0, at most 50 notifications will be returned. The maximum value is 50; values above 50 will be coerced to 50. |
| `pageToken` | query | string | no | A page token returned from a previous request. When paginating, all other parameters provided in the request must match the call that returned the page token. |
| `view` | query | string enum | no | Specifies which parts of the notification resource should be returned in the response. Values: `NOTIFICATION_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `advisorynotifications.organizations.locations.updateSettings`

- Versions: v1
- `PATCH https://advisorynotifications.googleapis.com/v1/{+name}`
- Update notification settings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudAdvisorynotificationsV1Settings`; Response: `GoogleCloudAdvisorynotificationsV1Settings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the settings to retrieve. Format: organizations/{organization}/locations/{location}/settings or projects/{projects}/locations/{location}/settings. |

### `advisorynotifications.projects.locations.getSettings`

- Versions: v1
- `GET https://advisorynotifications.googleapis.com/v1/{+name}`
- Get notification settings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAdvisorynotificationsV1Settings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the settings to retrieve. Format: organizations/{organization}/locations/{location}/settings or projects/{projects}/locations/{location}/settings. |

### `advisorynotifications.projects.locations.notifications.get`

- Versions: v1
- `GET https://advisorynotifications.googleapis.com/v1/{+name}`
- Gets a notification.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAdvisorynotificationsV1Notification`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the notification to retrieve. Format: organizations/{organization}/locations/{location}/notifications/{notification} or projects/{projects}/locations/{location}/notifications/{notification}. |
| `languageCode` | query | string | no | ISO code for requested localization language. If unset, will be interpereted as "en". If the requested language is valid, but not supported for this notification, English will be returned with an "Not applicable" LocalizationState. If the ISO code is invalid (i.e. not a real language), this RPC will throw an error. |

### `advisorynotifications.projects.locations.notifications.list`

- Versions: v1
- `GET https://advisorynotifications.googleapis.com/v1/{+parent}/notifications`
- Lists notifications under a given parent.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAdvisorynotificationsV1ListNotificationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of notifications. Must be of the form "organizations/{organization}/locations/{location}" or "projects/{project}/locations/{location}". |
| `languageCode` | query | string | no | ISO code for requested localization language. If unset, will be interpereted as "en". If the requested language is valid, but not supported for this notification, English will be returned with an "Not applicable" LocalizationState. If the ISO code is invalid (i.e. not a real language), this RPC will throw an error. |
| `pageSize` | query | integer (int32) | no | The maximum number of notifications to return. The service may return fewer than this value. If unspecified or equal to 0, at most 50 notifications will be returned. The maximum value is 50; values above 50 will be coerced to 50. |
| `pageToken` | query | string | no | A page token returned from a previous request. When paginating, all other parameters provided in the request must match the call that returned the page token. |
| `view` | query | string enum | no | Specifies which parts of the notification resource should be returned in the response. Values: `NOTIFICATION_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `advisorynotifications.projects.locations.updateSettings`

- Versions: v1
- `PATCH https://advisorynotifications.googleapis.com/v1/{+name}`
- Update notification settings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudAdvisorynotificationsV1Settings`; Response: `GoogleCloudAdvisorynotificationsV1Settings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the settings to retrieve. Format: organizations/{organization}/locations/{location}/settings or projects/{projects}/locations/{location}/settings. |

### Example request skeleton

Generated from the Discovery entry of `advisorynotifications.organizations.locations.getSettings` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://advisorynotifications.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `advisorynotifications` (retrieved 2026-11-14). Resources on this page: organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof, or when a path variable is described as optional (the method then also accepts the URL without that segment, as its description says).
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/advisorynotifications/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://advisorynotifications.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

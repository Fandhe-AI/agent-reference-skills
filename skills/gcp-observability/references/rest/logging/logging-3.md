---
source: https://logging.googleapis.com/$discovery/rest?version=v2
---

# Cloud Logging API REST API (logging) (part 3/3)

## Signature / Usage

Base URL: `https://logging.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `logging.getSettings`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}/settings`
- Gets the settings for the given resource.Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts.See View default resource settings for Logging (https://docs.cloud.google.com/logging/docs/default-settings#view-org-settings) for more information.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `Settings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource for which to retrieve settings. "projects/\[PROJECT_ID\]/settings" "organizations/\[ORGANIZATION_ID\]/settings" "billingAccounts/\[BILLING_ACCOUNT_ID\]/settings" "folders/\[FOLDER_ID\]/settings" For example:"organizations/12345/settings"Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts. |

### `logging.updateCmekSettings`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}/cmekSettings`
- Updates the Log Router CMEK settings for the given resource.Note: CMEK for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization.UpdateCmekSettings fails when any of the following are true: The value of kms_key_name is invalid. The associated service account doesn't have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key. Access to the key is disabled.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `CmekSettings`; Response: `CmekSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for the CMEK settings to update. "projects/\[PROJECT_ID\]/cmekSettings" "organizations/\[ORGANIZATION_ID\]/cmekSettings" "billingAccounts/\[BILLING_ACCOUNT_ID\]/cmekSettings" "folders/\[FOLDER_ID\]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask identifying which fields from cmek_settings should be updated. A field will be overwritten if and only if it is in the update mask. Output only fields cannot be updated.See FieldMask for more information.For example: "updateMask=kmsKeyName" |

### `logging.updateSettings`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}/settings`
- Updates the settings for the given resource. This method applies to all feature configurations for organization and folders.UpdateSettings fails when any of the following are true: The value of storage_location either isn't supported by Logging or violates the location OrgPolicy. The default_sink_config field is set, but it has an unspecified filter write mode. The value of kms_key_name is invalid. The associated service account doesn't have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key. Access to the key is disabled.See Configure default settings for organizations and folders (https://docs.cloud.google.com/logging/docs/default-settings) for more information.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `Settings`; Response: `Settings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for the settings to update. "organizations/\[ORGANIZATION_ID\]/settings" "folders/\[FOLDER_ID\]/settings" For example:"organizations/12345/settings" |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask identifying which fields from settings should be updated. A field will be overwritten if and only if it is in the update mask. Output only fields cannot be updated.See FieldMask for more information.For example: "updateMask=kmsKeyName" |

### Example request skeleton

Generated from the Discovery entry of `logging.getSettings` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://logging.googleapis.com/v2/{+name}/settings"
```

## Notes

- Generated from the Discovery document(s) v2 of `logging` (retrieved 2026-11-14). Resources on this page: v2.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`logging` v2, revision 20260911) also lists 50 endpoints of the form `https://logging.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `ca`, `ch`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-north3`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `in`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `sa`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://logging.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://logging.africa-south1.rep.googleapis.com/`) and keep the path.
- Corrected from the official docs (the Discovery text above is verbatim): the `name` descriptions of `getCmekSettings` / `updateCmekSettings` and `getSettings` / `updateSettings` give the value with a trailing `/cmekSettings` or `/settings` (for example `"organizations/12345/cmekSettings"`), but the HTTP paths are `v2/{+name}/cmekSettings` and `v2/{+name}/settings` and the path patterns of `name` end at the parent resource (for example `^organizations/[^/]+$`). Pass the parent resource as `name` (`organizations/12345`); the path appends `/cmekSettings` or `/settings`.
- Source: https://logging.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

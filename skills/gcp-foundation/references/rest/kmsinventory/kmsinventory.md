---
source: https://kmsinventory.googleapis.com/$discovery/rest?version=v1
---

# KMS Inventory API REST API (kmsinventory)

## Signature / Usage

Base URL: `https://kmsinventory.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `kmsinventory.organizations.protectedResources.search`

- Versions: v1
- `GET https://kmsinventory.googleapis.com/v1/{+scope}/protectedResources:search`
- Returns metadata about the resources protected by the given Cloud KMS CryptoKey in the given Cloud organization/project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudKmsInventoryV1SearchProtectedResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. A scope can be an organization or a project. Resources protected by the crypto key in provided scope will be returned. The following values are allowed: \* organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/12345678") \* projects/{PROJECT_ID} (e.g., "projects/foo-bar") \* projects/{PROJECT_NUMBER} (e.g., "projects/12345678") |
| `cryptoKey` | query | string | yes | Required. The resource name of the CryptoKey. |
| `pageSize` | query | integer (int32) | no | The maximum number of resources to return. The service may return fewer than this value. If unspecified, at most 500 resources will be returned. The maximum value is 500; values above 500 will be coerced to 500. |
| `pageToken` | query | string | no | A page token, received from a previous KeyTrackingService.SearchProtectedResources call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to KeyTrackingService.SearchProtectedResources must match the call that provided the page token. |
| `resourceTypes` | query | repeated string | no | Optional. A list of resource types that this request searches for. If empty, it will search all the trackable resource types (https://cloud.google.com/kms/docs/view-key-usage#tracked-resource-types). Regular expressions are also supported. For example: \* `compute.googleapis.com.*` snapshots resources whose type starts with `compute.googleapis.com`. \* `.*Image` snapshots resources whose type ends with `Image`. \* `.*Image.*` snapshots resources whose type contains `Image`. See RE2 (https://github.com/google/re2/wiki/Syntax) for all supported regular expression syntax. If the regular expression does not match any supported resource type, an INVALID_ARGUMENT error will be returned. |

### `kmsinventory.projects.cryptoKeys.list`

- Versions: v1
- `GET https://kmsinventory.googleapis.com/v1/{+parent}/cryptoKeys`
- Returns cryptographic keys managed by Cloud KMS in a given Cloud project. Note that this data is sourced from snapshots, meaning it may not completely reflect the actual state of key metadata at call time.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudKmsInventoryV1ListCryptoKeysResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Google Cloud project for which to retrieve key metadata, in the format `projects/*` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of keys to return. The service may return fewer than this value. If unspecified, at most 1000 keys will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Pass this into a subsequent request in order to receive the next page of results. |

### `kmsinventory.projects.locations.keyRings.cryptoKeys.getProtectedResourcesSummary`

- Versions: v1
- `GET https://kmsinventory.googleapis.com/v1/{+name}/protectedResourcesSummary`
- Returns aggregate information about the resources protected by the given Cloud KMS CryptoKey. By default, summary of resources within the same Cloud organization as the key will be returned, which requires the KMS organization service account to be configured(refer https://docs.cloud.google.com/kms/docs/view-key-usage#required-roles). If the KMS organization service account is not configured or key's project is not part of an organization, set fallback_scope to `FALLBACK_SCOPE_PROJECT` to retrieve a summary of protected resources within the key's project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudKmsInventoryV1ProtectedResourcesSummary`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CryptoKey. |
| `fallbackScope` | query | string enum | no | Optional. The scope to use if the kms organization service account is not configured. Values: `FALLBACK_SCOPE_UNSPECIFIED`, `FALLBACK_SCOPE_PROJECT`. |

### `kmsinventory.projects.protectedResources.search`

- Versions: v1
- `GET https://kmsinventory.googleapis.com/v1/{+scope}/protectedResources:search`
- Returns metadata about the resources protected by the given Cloud KMS CryptoKey in the given Cloud organization/project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudKmsInventoryV1SearchProtectedResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. A scope can be an organization or a project. Resources protected by the crypto key in provided scope will be returned. The following values are allowed: \* organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/12345678") \* projects/{PROJECT_ID} (e.g., "projects/foo-bar") \* projects/{PROJECT_NUMBER} (e.g., "projects/12345678") |
| `cryptoKey` | query | string | yes | Required. The resource name of the CryptoKey. |
| `pageSize` | query | integer (int32) | no | The maximum number of resources to return. The service may return fewer than this value. If unspecified, at most 500 resources will be returned. The maximum value is 500; values above 500 will be coerced to 500. |
| `pageToken` | query | string | no | A page token, received from a previous KeyTrackingService.SearchProtectedResources call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to KeyTrackingService.SearchProtectedResources must match the call that provided the page token. |
| `resourceTypes` | query | repeated string | no | Optional. A list of resource types that this request searches for. If empty, it will search all the trackable resource types (https://cloud.google.com/kms/docs/view-key-usage#tracked-resource-types). Regular expressions are also supported. For example: \* `compute.googleapis.com.*` snapshots resources whose type starts with `compute.googleapis.com`. \* `.*Image` snapshots resources whose type ends with `Image`. \* `.*Image.*` snapshots resources whose type contains `Image`. See RE2 (https://github.com/google/re2/wiki/Syntax) for all supported regular expression syntax. If the regular expression does not match any supported resource type, an INVALID_ARGUMENT error will be returned. |

### Example request skeleton

Generated from the Discovery entry of `kmsinventory.organizations.protectedResources.search` (not in the official docs); replace the `{...}` path variables and required query parameters (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://kmsinventory.googleapis.com/v1/{+scope}/protectedResources:search?cryptoKey={cryptoKey}"
```

## Notes

- Generated from the Discovery document(s) v1 of `kmsinventory` (retrieved 2026-11-14). Resources on this page: organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/kmsinventory/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://kmsinventory.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

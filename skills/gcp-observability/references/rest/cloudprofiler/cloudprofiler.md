---
source: https://cloudprofiler.googleapis.com/$discovery/rest?version=v2
---

# Cloud Profiler API REST API (cloudprofiler)

## Signature / Usage

Base URL: `https://cloudprofiler.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `cloudprofiler.projects.profiles.create`

- Versions: v2
- `POST https://cloudprofiler.googleapis.com/v2/{+parent}/profiles`
- CreateProfile creates a new profile resource in the online mode. \_Direct use of this API is discouraged, please use a supported profiler agent (https://cloud.google.com/profiler/docs/about-profiler#profiling_agent) instead for profile collection.\_ The server ensures that the new profiles are created at a constant rate per deployment, so the creation request may hang for some time until the next profile session is available. The request may fail with ABORTED error if the creation is not available within ~1m, the response will indicate the duration of the backoff the client should take before attempting creating a profile again. The backoff duration is returned in google.rpc.RetryInfo extension on the response status. To a gRPC client, the extension will be return as a binary-serialized proto in the trailing metadata item named "google.rpc.retryinfo-bin".
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.write`
- Request: `CreateProfileRequest`; Response: `Profile`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Parent project to create the profile in. |

### `cloudprofiler.projects.profiles.createOffline`

- Versions: v2
- `POST https://cloudprofiler.googleapis.com/v2/{+parent}/profiles:createOffline`
- CreateOfflineProfile creates a new profile resource in the offline mode. The client provides the profile to create along with the profile bytes, the server records it. \_Direct use of this API is discouraged, please use a supported profiler agent (https://cloud.google.com/profiler/docs/about-profiler#profiling_agent) instead for profile collection.\_
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.write`
- Request: `Profile`; Response: `Profile`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Parent project to create the profile in. |

### `cloudprofiler.projects.profiles.list`

- Versions: v2
- `GET https://cloudprofiler.googleapis.com/v2/{+parent}/profiles`
- Lists profiles which have been collected so far and for which the caller has permission to view.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.write`
- Request: —; Response: `ListProfilesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of profiles. Format: projects/{user_project_id} |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. Default page_size is 1000. Max limit is 1000. |
| `pageToken` | query | string | no | Optional. The token to continue pagination and get profiles from a particular page. When paginating, all other parameters provided to `ListProfiles` must match the call that provided the page token. |

### `cloudprofiler.projects.profiles.patch`

- Versions: v2
- `PATCH https://cloudprofiler.googleapis.com/v2/{+name}`
- UpdateProfile updates the profile bytes and labels on the profile resource created in the online mode. Updating the bytes for profiles created in the offline mode is currently not supported: the profile content must be provided at the time of the profile creation. \_Direct use of this API is discouraged, please use a supported profiler agent (https://cloud.google.com/profiler/docs/about-profiler#profiling_agent) instead for profile collection.\_
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.write`
- Request: `Profile`; Response: `Profile`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Opaque, server-assigned, unique ID for this profile. |
| `updateMask` | query | string (google-fieldmask) | no | Field mask used to specify the fields to be overwritten. Currently only profile_bytes and labels fields are supported by UpdateProfile, so only those fields can be specified in the mask. When no mask is provided, all fields are overwritten. |

### Example request skeleton

Generated from the Discovery entry of `cloudprofiler.projects.profiles.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudprofiler.googleapis.com/v2/{+parent}/profiles"
```

## Notes

- Generated from the Discovery document(s) v2 of `cloudprofiler` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Source: https://cloudprofiler.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

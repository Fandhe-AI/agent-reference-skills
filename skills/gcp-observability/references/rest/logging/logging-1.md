---
source: https://logging.googleapis.com/$discovery/rest?version=v2
---

# Cloud Logging API REST API (logging) (part 1/3)

## Signature / Usage

Base URL: `https://logging.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `logging.billingAccounts.exclusions.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/exclusions`
- Creates a new exclusion in the \_Default sink in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogExclusion`; Response: `LogExclusion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource in which to create the exclusion: "projects/\[PROJECT_ID\]" "organizations/\[ORGANIZATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]" "folders/\[FOLDER_ID\]" For examples:"projects/my-logging-project" "organizations/123456789" |

### `logging.billingAccounts.exclusions.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes an exclusion in the \_Default sink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of an existing exclusion to delete: "projects/\[PROJECT_ID\]/exclusions/\[EXCLUSION_ID\]" "organizations/\[ORGANIZATION_ID\]/exclusions/\[EXCLUSION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/exclusions/\[EXCLUSION_ID\]" "folders/\[FOLDER_ID\]/exclusions/\[EXCLUSION_ID\]" For example:"projects/my-project/exclusions/my-exclusion" |

### `logging.billingAccounts.exclusions.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets the description of an exclusion in the \_Default sink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `LogExclusion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of an existing exclusion: "projects/\[PROJECT_ID\]/exclusions/\[EXCLUSION_ID\]" "organizations/\[ORGANIZATION_ID\]/exclusions/\[EXCLUSION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/exclusions/\[EXCLUSION_ID\]" "folders/\[FOLDER_ID\]/exclusions/\[EXCLUSION_ID\]" For example:"projects/my-project/exclusions/my-exclusion" |

### `logging.billingAccounts.exclusions.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/exclusions`
- Lists all the exclusions on the \_Default sink in a parent resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListExclusionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose exclusions are to be listed. "projects/\[PROJECT_ID\]" "organizations/\[ORGANIZATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]" "folders/\[FOLDER_ID\]" |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.billingAccounts.exclusions.patch`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}`
- Changes one or more properties of an existing exclusion in the \_Default sink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogExclusion`; Response: `LogExclusion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the exclusion to update: "projects/\[PROJECT_ID\]/exclusions/\[EXCLUSION_ID\]" "organizations/\[ORGANIZATION_ID\]/exclusions/\[EXCLUSION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/exclusions/\[EXCLUSION_ID\]" "folders/\[FOLDER_ID\]/exclusions/\[EXCLUSION_ID\]" For example:"projects/my-project/exclusions/my-exclusion" |
| `updateMask` | query | string (google-fieldmask) | yes | Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description". |

### `logging.billingAccounts.getCmekSettings`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}/cmekSettings`
- Gets the Logging CMEK settings for the given resource.Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `CmekSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource for which to retrieve CMEK settings. "projects/\[PROJECT_ID\]/cmekSettings" "organizations/\[ORGANIZATION_ID\]/cmekSettings" "billingAccounts/\[BILLING_ACCOUNT_ID\]/cmekSettings" "folders/\[FOLDER_ID\]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization. |

### `logging.billingAccounts.getSettings`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}/settings`
- Gets the settings for the given resource.Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts.See View default resource settings for Logging (https://docs.cloud.google.com/logging/docs/default-settings#view-org-settings) for more information.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `Settings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource for which to retrieve settings. "projects/\[PROJECT_ID\]/settings" "organizations/\[ORGANIZATION_ID\]/settings" "billingAccounts/\[BILLING_ACCOUNT_ID\]/settings" "folders/\[FOLDER_ID\]/settings" For example:"organizations/12345/settings"Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts. |

### `logging.billingAccounts.locations.buckets.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/buckets`
- Creates a log bucket that can be used to store log entries. After a bucket has been created, the bucket's location cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogBucket`; Response: `LogBucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource in which to create the log bucket: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" For example:"projects/my-project/locations/global" |
| `bucketId` | query | string | yes | Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. |

### `logging.billingAccounts.locations.buckets.createAsync`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/buckets:createAsync`
- Creates a log bucket asynchronously that can be used to store log entries.After a bucket has been created, the bucket's location cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogBucket`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource in which to create the log bucket: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" For example:"projects/my-project/locations/global" |
| `bucketId` | query | string | yes | Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. |

### `logging.billingAccounts.locations.buckets.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes a log bucket.Changes the bucket's lifecycle_state to the DELETE_REQUESTED state. After 7 days, the bucket will be purged and all log entries in the bucket will be permanently deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the bucket to delete. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |

### `logging.billingAccounts.locations.buckets.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets a log bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `LogBucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the bucket: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |

### `logging.billingAccounts.locations.buckets.links.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/links`
- Asynchronously creates a linked dataset in BigQuery which makes it possible to use BigQuery to read the logs stored in the log bucket. A log bucket may currently only contain one link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `Link`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The full resource name of the bucket to create a link for. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" |
| `linkId` | query | string | yes | Required. The ID to use for the link. The link_id can have up to 100 characters. A valid link_id must only have alphanumeric characters and underscores within it. |

### `logging.billingAccounts.locations.buckets.links.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes a link. This will also delete the corresponding BigQuery linked dataset.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the link to delete. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" |

### `logging.billingAccounts.locations.buckets.links.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets a link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `Link`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the link: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" |

### `logging.billingAccounts.locations.buckets.links.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/links`
- Lists links.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListLinksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose links are to be listed: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. |

### `logging.billingAccounts.locations.buckets.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/buckets`
- Lists log buckets.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListBucketsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose buckets are to be listed: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.billingAccounts.locations.buckets.patch`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}`
- Updates a log bucket.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogBucket`; Response: `LogBucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the bucket to update. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days |

### `logging.billingAccounts.locations.buckets.undelete`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+name}:undelete`
- Undeletes a log bucket. A bucket that has been deleted can be undeleted within the grace period of 7 days.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `UndeleteBucketRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the bucket to undelete. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |

### `logging.billingAccounts.locations.buckets.updateAsync`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+name}:updateAsync`
- Updates a log bucket asynchronously.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogBucket`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the bucket to update. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days |

### `logging.billingAccounts.locations.buckets.views.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/views`
- Creates a view over log entries in a log bucket. A bucket may contain a maximum of 30 views.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogView`; Response: `LogView`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The bucket in which to create the view `"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"` For example:"projects/my-project/locations/global/buckets/my-bucket" |
| `viewId` | query | string | yes | Required. A client-assigned identifier such as "my-view". Identifiers are limited to 100 characters and can include only letters, digits, underscores, and hyphens. |

### `logging.billingAccounts.locations.buckets.views.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes a view on a log bucket. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can delete the view. If this occurs, please try again in a few minutes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the view to delete: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" |

### `logging.billingAccounts.locations.buckets.views.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets a view on a log bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `LogView`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the policy: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" |

### `logging.billingAccounts.locations.buckets.views.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/views`
- Lists views on a log bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListViewsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The bucket whose views are to be listed: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.billingAccounts.locations.buckets.views.logs.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/logs`
- Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListLogsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name to list logs for: projects/\[PROJECT_ID\] organizations/\[ORGANIZATION_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\] folders/\[FOLDER_ID\] |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |
| `resourceNames` | query | repeated string | no | Optional. List of resource names to list logs for: projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]To support legacy queries, it could also be: projects/\[PROJECT_ID\] organizations/\[ORGANIZATION_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\] folders/\[FOLDER_ID\]The resource name in the parent field is added to this list. |

### `logging.billingAccounts.locations.buckets.views.patch`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}`
- Updates a view on a log bucket. This method replaces the value of the filter field from the existing view with the corresponding value from the new view. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can update the view. If this occurs, please try again in a few minutes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogView`; Response: `LogView`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the view to update "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask that specifies the fields in view that need an update. A field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter |

### `logging.billingAccounts.locations.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `logging.billingAccounts.locations.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}/locations`
- Lists information about the supported locations for this service.This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: Global locations: If name is empty, the method lists the public locations available to all projects. Project-specific locations: If name follows the format projects/{project}, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project.For gRPC and client library implementations, the resource name is passed as the name field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. |

### `logging.billingAccounts.locations.operations.cancel`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `logging.billingAccounts.locations.operations.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `logging.billingAccounts.locations.operations.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. |

### `logging.billingAccounts.locations.recentQueries.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/recentQueries`
- Lists the RecentQueries that were created by the user making the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListRecentQueriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource to which the listed queries belong. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]" For example:projects/my-project/locations/us-central1Note: The location portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all recent queries. |
| `filter` | query | string | no | Optional. Specifies the type ("Logging" or "OpsAnalytics") of the recent queries to list. The only valid value for this field is one of the two allowable type function calls, which are the following: type("Logging") type("OpsAnalytics") |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.billingAccounts.locations.savedQueries.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/savedQueries`
- Creates a new SavedQuery for the user making the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `SavedQuery`; Response: `SavedQuery`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource in which to create the saved query: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]" For example: "projects/my-project/locations/global" "organizations/123456789/locations/us-central1" |
| `savedQueryId` | query | string | no | Optional. The ID to use for the saved query, which will become the final component of the saved query's resource name.If the saved_query_id is not provided, the system will generate an alphanumeric ID.The saved_query_id is limited to 100 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, periods.First character has to be alphanumeric. |

### `logging.billingAccounts.locations.savedQueries.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes an existing SavedQuery that was created by the user making the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the saved query to delete. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" For example: "projects/my-project/locations/global/savedQueries/my-saved-query" |

### `logging.billingAccounts.locations.savedQueries.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Returns all data associated with the requested query.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `SavedQuery`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the saved query. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" For example: "projects/my-project/locations/global/savedQueries/my-saved-query" |

### `logging.billingAccounts.locations.savedQueries.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/savedQueries`
- Lists the SavedQueries that were created by the user making the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListSavedQueriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource to which the listed queries belong. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]" For example: "projects/my-project/locations/us-central1" Note: The locations portion of the resource must be specified. To get a list of all saved queries, a wildcard character - can be used for LOCATION_ID, for example: "projects/my-project/locations/-" |
| `filter` | query | string | no | Optional. Specifies the type ("Logging" or "OpsAnalytics") and the visibility (PRIVATE or SHARED) of the saved queries to list. If provided, the filter must contain either the type function or a visibility token, or both. If both are chosen, they can be placed in any order, but they must be joined by the AND operator or the empty character.The two supported type function calls are: type("Logging") type("OpsAnalytics")The two supported visibility tokens are: visibility = PRIVATE visibility = SHAREDFor example:type("Logging") AND visibility = PRIVATE visibility=SHARED type("OpsAnalytics") type("OpsAnalytics)" visibility = PRIVATE visibility = SHARED |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.billingAccounts.locations.savedQueries.patch`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}`
- Updates an existing SavedQuery.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `SavedQuery`; Response: `SavedQuery`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Resource name of the saved query.In the format: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" For a list of supported locations, see Supported Regions (https://docs.cloud.google.com/logging/docs/region-support#bucket-regions)After the saved query is created, the location cannot be changed.If the user doesn't provide a QUERY_ID, the system will generate an alphanumeric ID. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. A non-empty list of fields to change in the existing saved query. Fields are relative to the saved_query and new values for the fields are taken from the corresponding fields in the SavedQuery included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.To update all mutable fields, specify an update_mask of \*.For example, to change the description and query filter text of a saved query, specify an update_mask of "description, query.filter". |

### `logging.billingAccounts.logs.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+logName}`
- Deletes all the log entries in a log for the global \_Default Log Bucket. The log reappears if it receives new entries. Log entries written shortly before the delete operation might not be deleted. Entries received after the delete operation with a timestamp before the operation will be deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `logName` | path | string | yes | Required. The resource name of the log to delete: projects/\[PROJECT_ID\]/logs/\[LOG_ID\] organizations/\[ORGANIZATION_ID\]/logs/\[LOG_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\]/logs/\[LOG_ID\] folders/\[FOLDER_ID\]/logs/\[LOG_ID\]\[LOG_ID\] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/123/logs/cloudaudit.googleapis.com%2Factivity".For more information about log names, see LogEntry. |

### `logging.billingAccounts.logs.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/logs`
- Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListLogsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name to list logs for: projects/\[PROJECT_ID\] organizations/\[ORGANIZATION_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\] folders/\[FOLDER_ID\] |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |
| `resourceNames` | query | repeated string | no | Optional. List of resource names to list logs for: projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]To support legacy queries, it could also be: projects/\[PROJECT_ID\] organizations/\[ORGANIZATION_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\] folders/\[FOLDER_ID\]The resource name in the parent field is added to this list. |

### `logging.billingAccounts.sinks.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/sinks`
- Creates a sink that exports specified log entries to a destination. The export begins upon ingress, unless the sink's writer_identity is not permitted to write to the destination. A sink can export log entries only from the resource owning the sink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogSink`; Response: `LogSink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource in which to create the sink: "projects/\[PROJECT_ID\]" "organizations/\[ORGANIZATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]" "folders/\[FOLDER_ID\]" For examples:"projects/my-project" "organizations/123456789" |
| `customWriterIdentity` | query | string | no | Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. |
| `uniqueWriterIdentity` | query | boolean | no | Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Cloud Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) used by the sinks with the same parent. For more information, see writer_identity in LogSink. |

### `logging.billingAccounts.sinks.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+sinkName}`
- Deletes a sink. If the sink has a unique writer_identity, then that service account is also deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `sinkName` | path | string | yes | Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/\[PROJECT_ID\]/sinks/\[SINK_ID\]" "organizations/\[ORGANIZATION_ID\]/sinks/\[SINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/sinks/\[SINK_ID\]" "folders/\[FOLDER_ID\]/sinks/\[SINK_ID\]" For example:"projects/my-project/sinks/my-sink" |

### `logging.billingAccounts.sinks.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+sinkName}`
- Gets a sink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `LogSink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `sinkName` | path | string | yes | Required. The resource name of the sink: "projects/\[PROJECT_ID\]/sinks/\[SINK_ID\]" "organizations/\[ORGANIZATION_ID\]/sinks/\[SINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/sinks/\[SINK_ID\]" "folders/\[FOLDER_ID\]/sinks/\[SINK_ID\]" For example:"projects/my-project/sinks/my-sink" |

### `logging.billingAccounts.sinks.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/sinks`
- Lists sinks.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListSinksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose sinks are to be listed: "projects/\[PROJECT_ID\]" "organizations/\[ORGANIZATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]" "folders/\[FOLDER_ID\]" |
| `filter` | query | string | no | Optional. A filter expression to constrain the sinks returned. Today, this only supports the following strings: '' 'in_scope("ALL")', 'in_scope("ANCESTOR")', 'in_scope("DEFAULT")'.Description of scopes below. ALL: Includes all of the sinks which can be returned in any other scope. ANCESTOR: Includes intercepting sinks owned by ancestor resources. DEFAULT: Includes sinks owned by parent.When the empty string is provided, then the filter 'in_scope("DEFAULT")' is applied. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.billingAccounts.sinks.patch`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+sinkName}`
- Updates a sink. This method replaces the values of the destination and filter fields of the existing sink with the corresponding values from the new sink.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogSink`; Response: `LogSink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `sinkName` | path | string | yes | Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/\[PROJECT_ID\]/sinks/\[SINK_ID\]" "organizations/\[ORGANIZATION_ID\]/sinks/\[SINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/sinks/\[SINK_ID\]" "folders/\[FOLDER_ID\]/sinks/\[SINK_ID\]" For example:"projects/my-project/sinks/my-sink" |
| `customWriterIdentity` | query | string | no | Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. |
| `uniqueWriterIdentity` | query | boolean | no | Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) owned by Cloud Logging. It is an error if the old value is true and the new value is set to false or defaulted to false. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:destination,filter,includeChildrenAt some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter |

### `logging.billingAccounts.sinks.update`

- Versions: v2
- `PUT https://logging.googleapis.com/v2/{+sinkName}`
- Updates a sink. This method replaces the values of the destination and filter fields of the existing sink with the corresponding values from the new sink.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogSink`; Response: `LogSink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `sinkName` | path | string | yes | Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/\[PROJECT_ID\]/sinks/\[SINK_ID\]" "organizations/\[ORGANIZATION_ID\]/sinks/\[SINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/sinks/\[SINK_ID\]" "folders/\[FOLDER_ID\]/sinks/\[SINK_ID\]" For example:"projects/my-project/sinks/my-sink" |
| `customWriterIdentity` | query | string | no | Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. |
| `uniqueWriterIdentity` | query | boolean | no | Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) owned by Cloud Logging. It is an error if the old value is true and the new value is set to false or defaulted to false. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:destination,filter,includeChildrenAt some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter |

### `logging.entries.copy`

- Versions: v2
- `POST https://logging.googleapis.com/v2/entries:copy`
- Copies a set of log entries from a log bucket to a Cloud Storage bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `CopyLogEntriesRequest`; Response: `Operation`

### `logging.entries.list`

- Versions: v2
- `POST https://logging.googleapis.com/v2/entries:list`
- Lists log entries. Use this method to retrieve log entries that originated from a project/folder/organization/billing account. For ways to export log entries, see Routing overview (https://docs.cloud.google.com/logging/docs/routing/overview).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: `ListLogEntriesRequest`; Response: `ListLogEntriesResponse`

### `logging.entries.tail`

- Versions: v2
- `POST https://logging.googleapis.com/v2/entries:tail`
- Streaming read of log entries as they are received. Until the stream is terminated, it will continue reading logs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: `TailLogEntriesRequest`; Response: `TailLogEntriesResponse`

### `logging.entries.write`

- Versions: v2
- `POST https://logging.googleapis.com/v2/entries:write`
- Writes log entries to Logging. This API method is the only way to send log entries to Logging. This method is used, directly or indirectly, by the Logging agent (fluentd) and all logging libraries configured to use Logging. A single request may contain log entries for a maximum of 1000 different resource names (projects, organizations, billing accounts or folders), where the resource name for a log entry is determined from its logName field.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.write`
- Request: `WriteLogEntriesRequest`; Response: `WriteLogEntriesResponse`

### `logging.exclusions.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/exclusions`
- Creates a new exclusion in the \_Default sink in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogExclusion`; Response: `LogExclusion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource in which to create the exclusion: "projects/\[PROJECT_ID\]" "organizations/\[ORGANIZATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]" "folders/\[FOLDER_ID\]" For examples:"projects/my-logging-project" "organizations/123456789" |

### `logging.exclusions.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes an exclusion in the \_Default sink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of an existing exclusion to delete: "projects/\[PROJECT_ID\]/exclusions/\[EXCLUSION_ID\]" "organizations/\[ORGANIZATION_ID\]/exclusions/\[EXCLUSION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/exclusions/\[EXCLUSION_ID\]" "folders/\[FOLDER_ID\]/exclusions/\[EXCLUSION_ID\]" For example:"projects/my-project/exclusions/my-exclusion" |

### `logging.exclusions.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets the description of an exclusion in the \_Default sink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `LogExclusion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of an existing exclusion: "projects/\[PROJECT_ID\]/exclusions/\[EXCLUSION_ID\]" "organizations/\[ORGANIZATION_ID\]/exclusions/\[EXCLUSION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/exclusions/\[EXCLUSION_ID\]" "folders/\[FOLDER_ID\]/exclusions/\[EXCLUSION_ID\]" For example:"projects/my-project/exclusions/my-exclusion" |

### `logging.exclusions.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/exclusions`
- Lists all the exclusions on the \_Default sink in a parent resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListExclusionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose exclusions are to be listed. "projects/\[PROJECT_ID\]" "organizations/\[ORGANIZATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]" "folders/\[FOLDER_ID\]" |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.exclusions.patch`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}`
- Changes one or more properties of an existing exclusion in the \_Default sink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogExclusion`; Response: `LogExclusion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the exclusion to update: "projects/\[PROJECT_ID\]/exclusions/\[EXCLUSION_ID\]" "organizations/\[ORGANIZATION_ID\]/exclusions/\[EXCLUSION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/exclusions/\[EXCLUSION_ID\]" "folders/\[FOLDER_ID\]/exclusions/\[EXCLUSION_ID\]" For example:"projects/my-project/exclusions/my-exclusion" |
| `updateMask` | query | string (google-fieldmask) | yes | Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description". |

### `logging.folders.exclusions.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/exclusions`
- Creates a new exclusion in the \_Default sink in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogExclusion`; Response: `LogExclusion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource in which to create the exclusion: "projects/\[PROJECT_ID\]" "organizations/\[ORGANIZATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]" "folders/\[FOLDER_ID\]" For examples:"projects/my-logging-project" "organizations/123456789" |

### `logging.folders.exclusions.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes an exclusion in the \_Default sink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of an existing exclusion to delete: "projects/\[PROJECT_ID\]/exclusions/\[EXCLUSION_ID\]" "organizations/\[ORGANIZATION_ID\]/exclusions/\[EXCLUSION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/exclusions/\[EXCLUSION_ID\]" "folders/\[FOLDER_ID\]/exclusions/\[EXCLUSION_ID\]" For example:"projects/my-project/exclusions/my-exclusion" |

### `logging.folders.exclusions.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets the description of an exclusion in the \_Default sink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `LogExclusion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of an existing exclusion: "projects/\[PROJECT_ID\]/exclusions/\[EXCLUSION_ID\]" "organizations/\[ORGANIZATION_ID\]/exclusions/\[EXCLUSION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/exclusions/\[EXCLUSION_ID\]" "folders/\[FOLDER_ID\]/exclusions/\[EXCLUSION_ID\]" For example:"projects/my-project/exclusions/my-exclusion" |

### `logging.folders.exclusions.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/exclusions`
- Lists all the exclusions on the \_Default sink in a parent resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListExclusionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose exclusions are to be listed. "projects/\[PROJECT_ID\]" "organizations/\[ORGANIZATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]" "folders/\[FOLDER_ID\]" |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.folders.exclusions.patch`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}`
- Changes one or more properties of an existing exclusion in the \_Default sink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogExclusion`; Response: `LogExclusion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the exclusion to update: "projects/\[PROJECT_ID\]/exclusions/\[EXCLUSION_ID\]" "organizations/\[ORGANIZATION_ID\]/exclusions/\[EXCLUSION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/exclusions/\[EXCLUSION_ID\]" "folders/\[FOLDER_ID\]/exclusions/\[EXCLUSION_ID\]" For example:"projects/my-project/exclusions/my-exclusion" |
| `updateMask` | query | string (google-fieldmask) | yes | Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description". |

### `logging.folders.getCmekSettings`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}/cmekSettings`
- Gets the Logging CMEK settings for the given resource.Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `CmekSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource for which to retrieve CMEK settings. "projects/\[PROJECT_ID\]/cmekSettings" "organizations/\[ORGANIZATION_ID\]/cmekSettings" "billingAccounts/\[BILLING_ACCOUNT_ID\]/cmekSettings" "folders/\[FOLDER_ID\]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization. |

### `logging.folders.getSettings`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}/settings`
- Gets the settings for the given resource.Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts.See View default resource settings for Logging (https://docs.cloud.google.com/logging/docs/default-settings#view-org-settings) for more information.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `Settings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource for which to retrieve settings. "projects/\[PROJECT_ID\]/settings" "organizations/\[ORGANIZATION_ID\]/settings" "billingAccounts/\[BILLING_ACCOUNT_ID\]/settings" "folders/\[FOLDER_ID\]/settings" For example:"organizations/12345/settings"Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts. |

### `logging.folders.locations.buckets.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/buckets`
- Creates a log bucket that can be used to store log entries. After a bucket has been created, the bucket's location cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogBucket`; Response: `LogBucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource in which to create the log bucket: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" For example:"projects/my-project/locations/global" |
| `bucketId` | query | string | yes | Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. |

### `logging.folders.locations.buckets.createAsync`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/buckets:createAsync`
- Creates a log bucket asynchronously that can be used to store log entries.After a bucket has been created, the bucket's location cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogBucket`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource in which to create the log bucket: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" For example:"projects/my-project/locations/global" |
| `bucketId` | query | string | yes | Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. |

### `logging.folders.locations.buckets.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes a log bucket.Changes the bucket's lifecycle_state to the DELETE_REQUESTED state. After 7 days, the bucket will be purged and all log entries in the bucket will be permanently deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the bucket to delete. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |

### `logging.folders.locations.buckets.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets a log bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `LogBucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the bucket: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |

### `logging.folders.locations.buckets.links.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/links`
- Asynchronously creates a linked dataset in BigQuery which makes it possible to use BigQuery to read the logs stored in the log bucket. A log bucket may currently only contain one link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `Link`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The full resource name of the bucket to create a link for. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" |
| `linkId` | query | string | yes | Required. The ID to use for the link. The link_id can have up to 100 characters. A valid link_id must only have alphanumeric characters and underscores within it. |

### `logging.folders.locations.buckets.links.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes a link. This will also delete the corresponding BigQuery linked dataset.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the link to delete. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" |

### `logging.folders.locations.buckets.links.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets a link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `Link`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the link: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" |

### `logging.folders.locations.buckets.links.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/links`
- Lists links.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListLinksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose links are to be listed: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. |

### `logging.folders.locations.buckets.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/buckets`
- Lists log buckets.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListBucketsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose buckets are to be listed: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.folders.locations.buckets.patch`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}`
- Updates a log bucket.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogBucket`; Response: `LogBucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the bucket to update. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days |

### `logging.folders.locations.buckets.undelete`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+name}:undelete`
- Undeletes a log bucket. A bucket that has been deleted can be undeleted within the grace period of 7 days.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `UndeleteBucketRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the bucket to undelete. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |

### `logging.folders.locations.buckets.updateAsync`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+name}:updateAsync`
- Updates a log bucket asynchronously.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogBucket`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the bucket to update. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days |

### `logging.folders.locations.buckets.views.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/views`
- Creates a view over log entries in a log bucket. A bucket may contain a maximum of 30 views.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogView`; Response: `LogView`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The bucket in which to create the view `"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"` For example:"projects/my-project/locations/global/buckets/my-bucket" |
| `viewId` | query | string | yes | Required. A client-assigned identifier such as "my-view". Identifiers are limited to 100 characters and can include only letters, digits, underscores, and hyphens. |

### `logging.folders.locations.buckets.views.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes a view on a log bucket. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can delete the view. If this occurs, please try again in a few minutes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the view to delete: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" |

### `logging.folders.locations.buckets.views.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets a view on a log bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `LogView`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the policy: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" |

### `logging.folders.locations.buckets.views.getIamPolicy`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `logging.folders.locations.buckets.views.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/views`
- Lists views on a log bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListViewsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The bucket whose views are to be listed: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.folders.locations.buckets.views.logs.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/logs`
- Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListLogsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name to list logs for: projects/\[PROJECT_ID\] organizations/\[ORGANIZATION_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\] folders/\[FOLDER_ID\] |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |
| `resourceNames` | query | repeated string | no | Optional. List of resource names to list logs for: projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]To support legacy queries, it could also be: projects/\[PROJECT_ID\] organizations/\[ORGANIZATION_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\] folders/\[FOLDER_ID\]The resource name in the parent field is added to this list. |

### `logging.folders.locations.buckets.views.patch`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}`
- Updates a view on a log bucket. This method replaces the value of the filter field from the existing view with the corresponding value from the new view. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can update the view. If this occurs, please try again in a few minutes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogView`; Response: `LogView`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the view to update "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask that specifies the fields in view that need an update. A field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter |

### `logging.folders.locations.buckets.views.setIamPolicy`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `logging.folders.locations.buckets.views.testIamPermissions`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `logging.folders.locations.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `logging.folders.locations.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}/locations`
- Lists information about the supported locations for this service.This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: Global locations: If name is empty, the method lists the public locations available to all projects. Project-specific locations: If name follows the format projects/{project}, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project.For gRPC and client library implementations, the resource name is passed as the name field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. |

### `logging.folders.locations.logScopes.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/logScopes`
- Creates a log scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogScope`; Response: `LogScope`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource in which to create the log scope: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]" For example:"projects/my-project/locations/global" |
| `logScopeId` | query | string | yes | Required. A client-assigned identifier such as "log-scope". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. First character has to be alphanumeric. |

### `logging.folders.locations.logScopes.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes a log scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the log scope to delete: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]" For example:"projects/my-project/locations/global/logScopes/my-log-scope" |

### `logging.folders.locations.logScopes.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets a log scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `LogScope`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the log scope: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]" For example:"projects/my-project/locations/global/logScopes/my-log-scope" |

### `logging.folders.locations.logScopes.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/logScopes`
- Lists log scopes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListLogScopesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose log scopes are to be listed: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.folders.locations.logScopes.patch`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}`
- Updates a log scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogScope`; Response: `LogScope`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the log scope.Log scopes are only available in the global location. For example:projects/my-project/locations/global/logScopes/my-log-scope |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask that specifies the fields in log_scope that need an update. A field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=description |

### `logging.folders.locations.operations.cancel`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `logging.folders.locations.operations.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `logging.folders.locations.operations.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. |

### `logging.folders.locations.recentQueries.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/recentQueries`
- Lists the RecentQueries that were created by the user making the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListRecentQueriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource to which the listed queries belong. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]" For example:projects/my-project/locations/us-central1Note: The location portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all recent queries. |
| `filter` | query | string | no | Optional. Specifies the type ("Logging" or "OpsAnalytics") of the recent queries to list. The only valid value for this field is one of the two allowable type function calls, which are the following: type("Logging") type("OpsAnalytics") |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.folders.locations.savedQueries.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/savedQueries`
- Creates a new SavedQuery for the user making the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `SavedQuery`; Response: `SavedQuery`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource in which to create the saved query: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]" For example: "projects/my-project/locations/global" "organizations/123456789/locations/us-central1" |
| `savedQueryId` | query | string | no | Optional. The ID to use for the saved query, which will become the final component of the saved query's resource name.If the saved_query_id is not provided, the system will generate an alphanumeric ID.The saved_query_id is limited to 100 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, periods.First character has to be alphanumeric. |

### `logging.folders.locations.savedQueries.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes an existing SavedQuery that was created by the user making the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the saved query to delete. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" For example: "projects/my-project/locations/global/savedQueries/my-saved-query" |

### `logging.folders.locations.savedQueries.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Returns all data associated with the requested query.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `SavedQuery`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the saved query. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" For example: "projects/my-project/locations/global/savedQueries/my-saved-query" |

### `logging.folders.locations.savedQueries.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/savedQueries`
- Lists the SavedQueries that were created by the user making the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListSavedQueriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource to which the listed queries belong. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]" For example: "projects/my-project/locations/us-central1" Note: The locations portion of the resource must be specified. To get a list of all saved queries, a wildcard character - can be used for LOCATION_ID, for example: "projects/my-project/locations/-" |
| `filter` | query | string | no | Optional. Specifies the type ("Logging" or "OpsAnalytics") and the visibility (PRIVATE or SHARED) of the saved queries to list. If provided, the filter must contain either the type function or a visibility token, or both. If both are chosen, they can be placed in any order, but they must be joined by the AND operator or the empty character.The two supported type function calls are: type("Logging") type("OpsAnalytics")The two supported visibility tokens are: visibility = PRIVATE visibility = SHAREDFor example:type("Logging") AND visibility = PRIVATE visibility=SHARED type("OpsAnalytics") type("OpsAnalytics)" visibility = PRIVATE visibility = SHARED |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.folders.locations.savedQueries.patch`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}`
- Updates an existing SavedQuery.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `SavedQuery`; Response: `SavedQuery`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Resource name of the saved query.In the format: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" For a list of supported locations, see Supported Regions (https://docs.cloud.google.com/logging/docs/region-support#bucket-regions)After the saved query is created, the location cannot be changed.If the user doesn't provide a QUERY_ID, the system will generate an alphanumeric ID. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. A non-empty list of fields to change in the existing saved query. Fields are relative to the saved_query and new values for the fields are taken from the corresponding fields in the SavedQuery included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.To update all mutable fields, specify an update_mask of \*.For example, to change the description and query filter text of a saved query, specify an update_mask of "description, query.filter". |

### `logging.folders.logs.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+logName}`
- Deletes all the log entries in a log for the global \_Default Log Bucket. The log reappears if it receives new entries. Log entries written shortly before the delete operation might not be deleted. Entries received after the delete operation with a timestamp before the operation will be deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `logName` | path | string | yes | Required. The resource name of the log to delete: projects/\[PROJECT_ID\]/logs/\[LOG_ID\] organizations/\[ORGANIZATION_ID\]/logs/\[LOG_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\]/logs/\[LOG_ID\] folders/\[FOLDER_ID\]/logs/\[LOG_ID\]\[LOG_ID\] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/123/logs/cloudaudit.googleapis.com%2Factivity".For more information about log names, see LogEntry. |

### `logging.folders.logs.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/logs`
- Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListLogsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name to list logs for: projects/\[PROJECT_ID\] organizations/\[ORGANIZATION_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\] folders/\[FOLDER_ID\] |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |
| `resourceNames` | query | repeated string | no | Optional. List of resource names to list logs for: projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]To support legacy queries, it could also be: projects/\[PROJECT_ID\] organizations/\[ORGANIZATION_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\] folders/\[FOLDER_ID\]The resource name in the parent field is added to this list. |

### `logging.folders.sinks.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/sinks`
- Creates a sink that exports specified log entries to a destination. The export begins upon ingress, unless the sink's writer_identity is not permitted to write to the destination. A sink can export log entries only from the resource owning the sink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogSink`; Response: `LogSink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource in which to create the sink: "projects/\[PROJECT_ID\]" "organizations/\[ORGANIZATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]" "folders/\[FOLDER_ID\]" For examples:"projects/my-project" "organizations/123456789" |
| `customWriterIdentity` | query | string | no | Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. |
| `uniqueWriterIdentity` | query | boolean | no | Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Cloud Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) used by the sinks with the same parent. For more information, see writer_identity in LogSink. |

### `logging.folders.sinks.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+sinkName}`
- Deletes a sink. If the sink has a unique writer_identity, then that service account is also deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `sinkName` | path | string | yes | Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/\[PROJECT_ID\]/sinks/\[SINK_ID\]" "organizations/\[ORGANIZATION_ID\]/sinks/\[SINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/sinks/\[SINK_ID\]" "folders/\[FOLDER_ID\]/sinks/\[SINK_ID\]" For example:"projects/my-project/sinks/my-sink" |

### `logging.folders.sinks.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+sinkName}`
- Gets a sink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `LogSink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `sinkName` | path | string | yes | Required. The resource name of the sink: "projects/\[PROJECT_ID\]/sinks/\[SINK_ID\]" "organizations/\[ORGANIZATION_ID\]/sinks/\[SINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/sinks/\[SINK_ID\]" "folders/\[FOLDER_ID\]/sinks/\[SINK_ID\]" For example:"projects/my-project/sinks/my-sink" |

### `logging.folders.sinks.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/sinks`
- Lists sinks.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListSinksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose sinks are to be listed: "projects/\[PROJECT_ID\]" "organizations/\[ORGANIZATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]" "folders/\[FOLDER_ID\]" |
| `filter` | query | string | no | Optional. A filter expression to constrain the sinks returned. Today, this only supports the following strings: '' 'in_scope("ALL")', 'in_scope("ANCESTOR")', 'in_scope("DEFAULT")'.Description of scopes below. ALL: Includes all of the sinks which can be returned in any other scope. ANCESTOR: Includes intercepting sinks owned by ancestor resources. DEFAULT: Includes sinks owned by parent.When the empty string is provided, then the filter 'in_scope("DEFAULT")' is applied. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.folders.sinks.patch`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+sinkName}`
- Updates a sink. This method replaces the values of the destination and filter fields of the existing sink with the corresponding values from the new sink.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogSink`; Response: `LogSink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `sinkName` | path | string | yes | Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/\[PROJECT_ID\]/sinks/\[SINK_ID\]" "organizations/\[ORGANIZATION_ID\]/sinks/\[SINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/sinks/\[SINK_ID\]" "folders/\[FOLDER_ID\]/sinks/\[SINK_ID\]" For example:"projects/my-project/sinks/my-sink" |
| `customWriterIdentity` | query | string | no | Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. |
| `uniqueWriterIdentity` | query | boolean | no | Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) owned by Cloud Logging. It is an error if the old value is true and the new value is set to false or defaulted to false. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:destination,filter,includeChildrenAt some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter |

### `logging.folders.sinks.update`

- Versions: v2
- `PUT https://logging.googleapis.com/v2/{+sinkName}`
- Updates a sink. This method replaces the values of the destination and filter fields of the existing sink with the corresponding values from the new sink.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogSink`; Response: `LogSink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `sinkName` | path | string | yes | Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/\[PROJECT_ID\]/sinks/\[SINK_ID\]" "organizations/\[ORGANIZATION_ID\]/sinks/\[SINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/sinks/\[SINK_ID\]" "folders/\[FOLDER_ID\]/sinks/\[SINK_ID\]" For example:"projects/my-project/sinks/my-sink" |
| `customWriterIdentity` | query | string | no | Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated. |
| `uniqueWriterIdentity` | query | boolean | no | Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) owned by Cloud Logging. It is an error if the old value is true and the new value is set to false or defaulted to false. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:destination,filter,includeChildrenAt some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter |

### `logging.folders.updateSettings`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}/settings`
- Updates the settings for the given resource. This method applies to all feature configurations for organization and folders.UpdateSettings fails when any of the following are true: The value of storage_location either isn't supported by Logging or violates the location OrgPolicy. The default_sink_config field is set, but it has an unspecified filter write mode. The value of kms_key_name is invalid. The associated service account doesn't have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key. Access to the key is disabled.See Configure default settings for organizations and folders (https://docs.cloud.google.com/logging/docs/default-settings) for more information.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `Settings`; Response: `Settings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for the settings to update. "organizations/\[ORGANIZATION_ID\]/settings" "folders/\[FOLDER_ID\]/settings" For example:"organizations/12345/settings" |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask identifying which fields from settings should be updated. A field will be overwritten if and only if it is in the update mask. Output only fields cannot be updated.See FieldMask for more information.For example: "updateMask=kmsKeyName" |

### `logging.locations.buckets.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/buckets`
- Creates a log bucket that can be used to store log entries. After a bucket has been created, the bucket's location cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogBucket`; Response: `LogBucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource in which to create the log bucket: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" For example:"projects/my-project/locations/global" |
| `bucketId` | query | string | yes | Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. |

### `logging.locations.buckets.createAsync`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/buckets:createAsync`
- Creates a log bucket asynchronously that can be used to store log entries.After a bucket has been created, the bucket's location cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogBucket`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource in which to create the log bucket: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" For example:"projects/my-project/locations/global" |
| `bucketId` | query | string | yes | Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. |

### `logging.locations.buckets.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes a log bucket.Changes the bucket's lifecycle_state to the DELETE_REQUESTED state. After 7 days, the bucket will be purged and all log entries in the bucket will be permanently deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the bucket to delete. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |

### `logging.locations.buckets.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets a log bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `LogBucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the bucket: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |

### `logging.locations.buckets.links.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/links`
- Asynchronously creates a linked dataset in BigQuery which makes it possible to use BigQuery to read the logs stored in the log bucket. A log bucket may currently only contain one link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `Link`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The full resource name of the bucket to create a link for. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" |
| `linkId` | query | string | yes | Required. The ID to use for the link. The link_id can have up to 100 characters. A valid link_id must only have alphanumeric characters and underscores within it. |

### `logging.locations.buckets.links.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes a link. This will also delete the corresponding BigQuery linked dataset.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the link to delete. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" |

### `logging.locations.buckets.links.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets a link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `Link`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the link: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" |

### `logging.locations.buckets.links.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/links`
- Lists links.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListLinksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose links are to be listed: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. |

### `logging.locations.buckets.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/buckets`
- Lists log buckets.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListBucketsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose buckets are to be listed: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.locations.buckets.patch`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}`
- Updates a log bucket.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogBucket`; Response: `LogBucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the bucket to update. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days |

### `logging.locations.buckets.undelete`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+name}:undelete`
- Undeletes a log bucket. A bucket that has been deleted can be undeleted within the grace period of 7 days.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `UndeleteBucketRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the bucket to undelete. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |

### `logging.locations.buckets.updateAsync`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+name}:updateAsync`
- Updates a log bucket asynchronously.If the bucket has a lifecycle_state of DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket has been created, the bucket's location cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogBucket`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the bucket to update. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days |

### `logging.locations.buckets.views.create`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+parent}/views`
- Creates a view over log entries in a log bucket. A bucket may contain a maximum of 30 views.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogView`; Response: `LogView`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The bucket in which to create the view `"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"` For example:"projects/my-project/locations/global/buckets/my-bucket" |
| `viewId` | query | string | yes | Required. A client-assigned identifier such as "my-view". Identifiers are limited to 100 characters and can include only letters, digits, underscores, and hyphens. |

### `logging.locations.buckets.views.delete`

- Versions: v2
- `DELETE https://logging.googleapis.com/v2/{+name}`
- Deletes a view on a log bucket. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can delete the view. If this occurs, please try again in a few minutes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the view to delete: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" |

### `logging.locations.buckets.views.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets a view on a log bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `LogView`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the policy: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" |

### `logging.locations.buckets.views.getIamPolicy`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `logging.locations.buckets.views.list`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+parent}/views`
- Lists views on a log bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `ListViewsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The bucket whose views are to be listed: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `logging.locations.buckets.views.patch`

- Versions: v2
- `PATCH https://logging.googleapis.com/v2/{+name}`
- Updates a view on a log bucket. This method replaces the value of the filter field from the existing view with the corresponding value from the new view. If an UNAVAILABLE error is returned, this indicates that system is not in a state where it can update the view. If this occurs, please try again in a few minutes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `LogView`; Response: `LogView`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the view to update "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view" |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask that specifies the fields in view that need an update. A field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=filter |

### `logging.locations.buckets.views.setIamPolicy`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/logging.admin`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `logging.locations.buckets.views.testIamPermissions`

- Versions: v2
- `POST https://logging.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `logging.locations.get`

- Versions: v2
- `GET https://logging.googleapis.com/v2/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/logging.admin`, `https://www.googleapis.com/auth/logging.read`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### Example request skeleton

Generated from the Discovery entry of `logging.billingAccounts.exclusions.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://logging.googleapis.com/v2/{+name}"
```

## Notes

- Generated from the Discovery document(s) v2 of `logging` (retrieved 2026-11-14). Resources on this page: billingAccounts, entries, exclusions, folders, locations.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/logging/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`logging` v2, revision 20260911) also lists 50 endpoints of the form `https://logging.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `ca`, `ch`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-north3`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `in`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `sa`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://logging.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://logging.africa-south1.rep.googleapis.com/`) and keep the path.
- Corrected from the official docs (the Discovery text above is verbatim): the `name` descriptions of `getCmekSettings` / `updateCmekSettings` and `getSettings` / `updateSettings` give the value with a trailing `/cmekSettings` or `/settings` (for example `"organizations/12345/cmekSettings"`), but the HTTP paths are `v2/{+name}/cmekSettings` and `v2/{+name}/settings` and the path patterns of `name` end at the parent resource (for example `^organizations/[^/]+$`). Pass the parent resource as `name` (`organizations/12345`); the path appends `/cmekSettings` or `/settings`.
- Source: https://logging.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

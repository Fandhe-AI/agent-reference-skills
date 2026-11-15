---
source: https://storage.googleapis.com/$discovery/rest?version=v1
---

# Cloud Storage JSON API REST API (storage)

## Signature / Usage

Base URL: `https://storage.googleapis.com/storage/v1`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `storage.anywhereCaches.disable`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/anywhereCaches/{anywhereCacheId}/disable`
- Disables an Anywhere Cache instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `AnywhereCache`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the parent bucket. |
| `anywhereCacheId` | path | string | yes | The ID of requested Anywhere Cache instance. |

### `storage.anywhereCaches.get`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/anywhereCaches/{anywhereCacheId}`
- Returns the metadata of an Anywhere Cache instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `AnywhereCache`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the parent bucket. |
| `anywhereCacheId` | path | string | yes | The ID of requested Anywhere Cache instance. |

### `storage.anywhereCaches.insert`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/anywhereCaches`
- Creates an Anywhere Cache instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `AnywhereCache`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the parent bucket. |

### `storage.anywhereCaches.list`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/anywhereCaches`
- Returns a list of Anywhere Cache instances of the bucket matching the criteria.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `AnywhereCaches`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the parent bucket. |
| `pageSize` | query | integer (int32) | no | Maximum number of items to return in a single page of responses. Maximum 1000. |
| `pageToken` | query | string | no | A previously-returned page token representing part of the larger set of results to view. |

### `storage.anywhereCaches.pause`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/anywhereCaches/{anywhereCacheId}/pause`
- Pauses an Anywhere Cache instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `AnywhereCache`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the parent bucket. |
| `anywhereCacheId` | path | string | yes | The ID of requested Anywhere Cache instance. |

### `storage.anywhereCaches.resume`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/anywhereCaches/{anywhereCacheId}/resume`
- Resumes a paused or disabled Anywhere Cache instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `AnywhereCache`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the parent bucket. |
| `anywhereCacheId` | path | string | yes | The ID of requested Anywhere Cache instance. |

### `storage.anywhereCaches.update`

- Versions: v1
- `PATCH https://storage.googleapis.com/storage/v1/b/{bucket}/anywhereCaches/{anywhereCacheId}`
- Updates the config of an Anywhere Cache instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `AnywhereCache`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the parent bucket. |
| `anywhereCacheId` | path | string | yes | The ID of requested Anywhere Cache instance. |

### `storage.bucketAccessControls.delete`

- Versions: v1
- `DELETE https://storage.googleapis.com/storage/v1/b/{bucket}/acl/{entity}`
- Permanently deletes the ACL entry for the specified entity on the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `entity` | path | string | yes | The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.bucketAccessControls.get`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/acl/{entity}`
- Returns the ACL entry for the specified entity on the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: —; Response: `BucketAccessControl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `entity` | path | string | yes | The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.bucketAccessControls.insert`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/acl`
- Creates a new ACL entry on the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `BucketAccessControl`; Response: `BucketAccessControl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.bucketAccessControls.list`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/acl`
- Retrieves ACL entries on the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: —; Response: `BucketAccessControls`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.bucketAccessControls.patch`

- Versions: v1
- `PATCH https://storage.googleapis.com/storage/v1/b/{bucket}/acl/{entity}`
- Patches an ACL entry on the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `BucketAccessControl`; Response: `BucketAccessControl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `entity` | path | string | yes | The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.bucketAccessControls.update`

- Versions: v1
- `PUT https://storage.googleapis.com/storage/v1/b/{bucket}/acl/{entity}`
- Updates an ACL entry on the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `BucketAccessControl`; Response: `BucketAccessControl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `entity` | path | string | yes | The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.buckets.delete`

- Versions: v1
- `DELETE https://storage.googleapis.com/storage/v1/b/{bucket}`
- Deletes an empty bucket. Deletions are permanent unless soft delete is enabled on the bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `ifMetagenerationMatch` | query | string (int64) | no | If set, only deletes the bucket if its metageneration matches this value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | If set, only deletes the bucket if its metageneration does not match this value. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.buckets.get`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}`
- Returns metadata for the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `Bucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `generation` | query | string (int64) | no | If present, specifies the generation of the bucket. This is required if softDeleted is true. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to noAcl. Values: `full`, `noAcl`. |
| `softDeleted` | query | boolean | no | If true, return the soft-deleted version of this bucket. The default is false. For more information, see Soft Delete (https://cloud.google.com/storage/docs/soft-delete). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.buckets.getIamPolicy`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/iam`
- Returns an IAM policy for the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `optionsRequestedPolicyVersion` | query | integer (int32) | no | The IAM policy format version to be returned. If the optionsRequestedPolicyVersion is for an older version that doesn't support part of the requested IAM policy, the request fails. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.buckets.getStorageLayout`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/storageLayout`
- Returns the storage layout configuration for the specified bucket. Note that this operation requires storage.objects.list permission.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `BucketStorageLayout`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `prefix` | query | string | no | An optional prefix used for permission check. It is useful when the caller only has storage.objects.list permission under a specific prefix. |

### `storage.buckets.insert`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b`
- Creates a new bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `Bucket`; Response: `Bucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | query | string | yes | A valid API project identifier. |
| `enableObjectRetention` | query | boolean | no | When set to true, object retention is enabled for this bucket. |
| `predefinedAcl` | query | string enum | no | Apply a predefined set of access controls to this bucket. Values: `authenticatedRead`, `private`, `projectPrivate`, `publicRead`, `publicReadWrite`. |
| `predefinedDefaultObjectAcl` | query | string enum | no | Apply a predefined set of default object access controls to this bucket. Values: `authenticatedRead`, `bucketOwnerFullControl`, `bucketOwnerRead`, `private`, `projectPrivate`, `publicRead`. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to noAcl, unless the bucket resource specifies acl or defaultObjectAcl properties, when it defaults to full. Values: `full`, `noAcl`. |
| `userProject` | query | string | no | The project to be billed for this request. |

### `storage.buckets.list`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b`
- Retrieves a list of buckets for a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `Buckets`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | query | string | yes | A valid API project identifier. |
| `maxResults` | query | integer (uint32) | no | Maximum number of buckets to return in a single response. The service will use this parameter or 1,000 items, whichever is smaller. |
| `pageToken` | query | string | no | A previously-returned page token representing part of the larger set of results to view. |
| `prefix` | query | string | no | Filter results to buckets whose names begin with this prefix. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to noAcl. Values: `full`, `noAcl`. |
| `returnPartialSuccess` | query | boolean | no | If true, return a list of bucket resource names for buckets that are in unreachable locations. |
| `softDeleted` | query | boolean | no | If true, only soft-deleted bucket versions will be returned. The default is false. For more information, see Soft Delete (https://cloud.google.com/storage/docs/soft-delete). |
| `userProject` | query | string | no | The project to be billed for this request. |

### `storage.buckets.lockRetentionPolicy`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/lockRetentionPolicy`
- Locks retention policy on a bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `Bucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `ifMetagenerationMatch` | query | string (int64) | yes | Makes the operation conditional on whether bucket's current metageneration matches the given value. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.buckets.patch`

- Versions: v1
- `PATCH https://storage.googleapis.com/storage/v1/b/{bucket}`
- Patches a bucket. Changes to the bucket will be readable immediately after writing, but configuration changes may take time to propagate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `Bucket`; Response: `Bucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value. |
| `predefinedAcl` | query | string enum | no | Apply a predefined set of access controls to this bucket. Values: `authenticatedRead`, `private`, `projectPrivate`, `publicRead`, `publicReadWrite`. |
| `predefinedDefaultObjectAcl` | query | string enum | no | Apply a predefined set of default object access controls to this bucket. Values: `authenticatedRead`, `bucketOwnerFullControl`, `bucketOwnerRead`, `private`, `projectPrivate`, `publicRead`. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to full. Values: `full`, `noAcl`. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.buckets.relocate`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/relocate`
- Initiates a long-running Relocate Bucket operation on the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `RelocateBucketRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket to be moved. |

### `storage.buckets.restore`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/restore`
- Restores a soft-deleted bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `Bucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `generation` | query | string (int64) | yes | Generation of a bucket. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to full. Values: `full`, `noAcl`. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.buckets.setIamPolicy`

- Versions: v1
- `PUT https://storage.googleapis.com/storage/v1/b/{bucket}/iam`
- Updates an IAM policy for the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `Policy`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.buckets.testIamPermissions`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/iam/testPermissions`
- Tests a set of permissions on the given bucket to see which, if any, are held by the caller.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `permissions` | query | repeated string | yes | Permissions to test. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.buckets.update`

- Versions: v1
- `PUT https://storage.googleapis.com/storage/v1/b/{bucket}`
- Updates a bucket. Changes to the bucket will be readable immediately after writing, but configuration changes may take time to propagate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `Bucket`; Response: `Bucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value. |
| `predefinedAcl` | query | string enum | no | Apply a predefined set of access controls to this bucket. Values: `authenticatedRead`, `private`, `projectPrivate`, `publicRead`, `publicReadWrite`. |
| `predefinedDefaultObjectAcl` | query | string enum | no | Apply a predefined set of default object access controls to this bucket. Values: `authenticatedRead`, `bucketOwnerFullControl`, `bucketOwnerRead`, `private`, `projectPrivate`, `publicRead`. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to full. Values: `full`, `noAcl`. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.defaultObjectAccessControls.delete`

- Versions: v1
- `DELETE https://storage.googleapis.com/storage/v1/b/{bucket}/defaultObjectAcl/{entity}`
- Permanently deletes the default object ACL entry for the specified entity on the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `entity` | path | string | yes | The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.defaultObjectAccessControls.get`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/defaultObjectAcl/{entity}`
- Returns the default object ACL entry for the specified entity on the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: —; Response: `ObjectAccessControl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `entity` | path | string | yes | The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.defaultObjectAccessControls.insert`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/defaultObjectAcl`
- Creates a new default object ACL entry on the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `ObjectAccessControl`; Response: `ObjectAccessControl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.defaultObjectAccessControls.list`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/defaultObjectAcl`
- Retrieves default object ACL entries on the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: —; Response: `ObjectAccessControls`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `ifMetagenerationMatch` | query | string (int64) | no | If present, only return default ACL listing if the bucket's current metageneration matches this value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | If present, only return default ACL listing if the bucket's current metageneration does not match the given value. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.defaultObjectAccessControls.patch`

- Versions: v1
- `PATCH https://storage.googleapis.com/storage/v1/b/{bucket}/defaultObjectAcl/{entity}`
- Patches a default object ACL entry on the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `ObjectAccessControl`; Response: `ObjectAccessControl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `entity` | path | string | yes | The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.defaultObjectAccessControls.update`

- Versions: v1
- `PUT https://storage.googleapis.com/storage/v1/b/{bucket}/defaultObjectAcl/{entity}`
- Updates a default object ACL entry on the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `ObjectAccessControl`; Response: `ObjectAccessControl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `entity` | path | string | yes | The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.folders.delete`

- Versions: v1
- `DELETE https://storage.googleapis.com/storage/v1/b/{bucket}/folders/{folder}`
- Permanently deletes a folder. Only applicable to buckets with hierarchical namespace enabled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the folder resides. |
| `folder` | path | string | yes | Name of a folder. |
| `ifMetagenerationMatch` | query | string (int64) | no | If set, only deletes the folder if its metageneration matches this value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | If set, only deletes the folder if its metageneration does not match this value. |

### `storage.folders.deleteRecursive`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/folders/{folder}/deleteRecursive`
- Deletes a folder recursively. Only applicable to buckets with hierarchical namespace enabled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the folder resides. |
| `folder` | path | string | yes | Name of a folder. |
| `ifMetagenerationMatch` | query | string (int64) | no | If set, only deletes the folder if its metageneration matches this value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | If set, only deletes the folder if its metageneration does not match this value. |

### `storage.folders.get`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/folders/{folder}`
- Returns metadata for the specified folder. Only applicable to buckets with hierarchical namespace enabled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `Folder`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the folder resides. |
| `folder` | path | string | yes | Name of a folder. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the return of the folder metadata conditional on whether the folder's current metageneration matches the given value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the return of the folder metadata conditional on whether the folder's current metageneration does not match the given value. |

### `storage.folders.insert`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/folders`
- Creates a new folder. Only applicable to buckets with hierarchical namespace enabled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `Folder`; Response: `Folder`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the folder resides. |
| `recursive` | query | boolean | no | If true, any parent folder which doesn't exist will be created automatically. |

### `storage.folders.list`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/folders`
- Retrieves a list of folders matching the criteria. Only applicable to buckets with hierarchical namespace enabled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `Folders`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which to look for folders. |
| `delimiter` | query | string | no | Returns results in a directory-like mode. The only supported value is '/'. If set, items will only contain folders that either exactly match the prefix, or are one level below the prefix. |
| `endOffset` | query | string | no | Filter results to folders whose names are lexicographically before endOffset. If startOffset is also set, the folders listed will have names between startOffset (inclusive) and endOffset (exclusive). |
| `pageSize` | query | integer (int32) | no | Maximum number of items to return in a single page of responses. |
| `pageToken` | query | string | no | A previously-returned page token representing part of the larger set of results to view. |
| `prefix` | query | string | no | Filter results to folders whose paths begin with this prefix. If set, the value must either be an empty string or end with a '/'. |
| `startOffset` | query | string | no | Filter results to folders whose names are lexicographically equal to or after startOffset. If endOffset is also set, the folders listed will have names between startOffset (inclusive) and endOffset (exclusive). |

### `storage.folders.rename`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/folders/{sourceFolder}/renameTo/folders/{destinationFolder}`
- Renames a source folder to a destination folder. Only applicable to buckets with hierarchical namespace enabled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the folders are in. |
| `sourceFolder` | path | string | yes | Name of the source folder. |
| `destinationFolder` | path | string | yes | Name of the destination folder. |
| `ifSourceMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the source object's current metageneration matches the given value. |
| `ifSourceMetagenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the source object's current metageneration does not match the given value. |

### `storage.managedFolders.delete`

- Versions: v1
- `DELETE https://storage.googleapis.com/storage/v1/b/{bucket}/managedFolders/{managedFolder}`
- Permanently deletes a managed folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket containing the managed folder. |
| `managedFolder` | path | string | yes | The managed folder name/path. |
| `allowNonEmpty` | query | boolean | no | Allows the deletion of a managed folder even if it is not empty. A managed folder is empty if there are no objects or managed folders that it applies to. Callers must have storage.managedFolders.setIamPolicy permission. |
| `ifMetagenerationMatch` | query | string (int64) | no | If set, only deletes the managed folder if its metageneration matches this value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | If set, only deletes the managed folder if its metageneration does not match this value. |

### `storage.managedFolders.get`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/managedFolders/{managedFolder}`
- Returns metadata of the specified managed folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `ManagedFolder`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket containing the managed folder. |
| `managedFolder` | path | string | yes | The managed folder name/path. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the return of the managed folder metadata conditional on whether the managed folder's current metageneration matches the given value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the return of the managed folder metadata conditional on whether the managed folder's current metageneration does not match the given value. |

### `storage.managedFolders.getIamPolicy`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/managedFolders/{managedFolder}/iam`
- Returns an IAM policy for the specified managed folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket containing the managed folder. |
| `managedFolder` | path | string | yes | The managed folder name/path. |
| `optionsRequestedPolicyVersion` | query | integer (int32) | no | The IAM policy format version to be returned. If the optionsRequestedPolicyVersion is for an older version that doesn't support part of the requested IAM policy, the request fails. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.managedFolders.insert`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/managedFolders`
- Creates a new managed folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `ManagedFolder`; Response: `ManagedFolder`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket containing the managed folder. |

### `storage.managedFolders.list`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/managedFolders`
- Lists managed folders in the given bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `ManagedFolders`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket containing the managed folder. |
| `pageSize` | query | integer (int32) | no | Maximum number of items to return in a single page of responses. |
| `pageToken` | query | string | no | A previously-returned page token representing part of the larger set of results to view. |
| `prefix` | query | string | no | The managed folder name/path prefix to filter the output list of results. |

### `storage.managedFolders.setIamPolicy`

- Versions: v1
- `PUT https://storage.googleapis.com/storage/v1/b/{bucket}/managedFolders/{managedFolder}/iam`
- Updates an IAM policy for the specified managed folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `Policy`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket containing the managed folder. |
| `managedFolder` | path | string | yes | The managed folder name/path. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.managedFolders.testIamPermissions`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/managedFolders/{managedFolder}/iam/testPermissions`
- Tests a set of permissions on the given managed folder to see which, if any, are held by the caller.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket containing the managed folder. |
| `managedFolder` | path | string | yes | The managed folder name/path. |
| `permissions` | query | repeated string | yes | Permissions to test. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.managedFolders.update`

- Versions: v1
- `PATCH https://storage.googleapis.com/storage/v1/b/{bucket}/managedFolders/{managedFolder}`
- Updates a managed folder using patch semantics.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `ManagedFolder`; Response: `ManagedFolder`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | The name of the bucket containing the managed folder. |
| `managedFolder` | path | string | yes | The name of the managed folder. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the metageneration of the managed folder matches the specified value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the metageneration of the managed folder doesn't match the specified value. |

### `storage.notifications.delete`

- Versions: v1
- `DELETE https://storage.googleapis.com/storage/v1/b/{bucket}/notificationConfigs/{notification}`
- Permanently deletes a notification subscription.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | The parent bucket of the notification. |
| `notification` | path | string | yes | ID of the notification to delete. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.notifications.get`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/notificationConfigs/{notification}`
- View a notification configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `Notification`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | The parent bucket of the notification. |
| `notification` | path | string | yes | Notification ID |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.notifications.insert`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/notificationConfigs`
- Creates a notification subscription for a given bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `Notification`; Response: `Notification`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | The parent bucket of the notification. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.notifications.list`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/notificationConfigs`
- Retrieves a list of notification subscriptions for a given bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `Notifications`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a Google Cloud Storage bucket. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objectAccessControls.delete`

- Versions: v1
- `DELETE https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}/acl/{entity}`
- Permanently deletes the ACL entry for the specified entity on the specified object.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `entity` | path | string | yes | The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. |
| `generation` | query | string (int64) | no | If present, selects a specific revision of this object (as opposed to the latest version, the default). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objectAccessControls.get`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}/acl/{entity}`
- Returns the ACL entry for the specified entity on the specified object.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: —; Response: `ObjectAccessControl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `entity` | path | string | yes | The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. |
| `generation` | query | string (int64) | no | If present, selects a specific revision of this object (as opposed to the latest version, the default). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objectAccessControls.insert`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}/acl`
- Creates a new ACL entry on the specified object.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `ObjectAccessControl`; Response: `ObjectAccessControl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `generation` | query | string (int64) | no | If present, selects a specific revision of this object (as opposed to the latest version, the default). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objectAccessControls.list`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}/acl`
- Retrieves ACL entries on the specified object.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: —; Response: `ObjectAccessControls`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `generation` | query | string (int64) | no | If present, selects a specific revision of this object (as opposed to the latest version, the default). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objectAccessControls.patch`

- Versions: v1
- `PATCH https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}/acl/{entity}`
- Patches an ACL entry on the specified object.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `ObjectAccessControl`; Response: `ObjectAccessControl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `entity` | path | string | yes | The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. |
| `generation` | query | string (int64) | no | If present, selects a specific revision of this object (as opposed to the latest version, the default). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objectAccessControls.update`

- Versions: v1
- `PUT https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}/acl/{entity}`
- Updates an ACL entry on the specified object.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `ObjectAccessControl`; Response: `ObjectAccessControl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of a bucket. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `entity` | path | string | yes | The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. |
| `generation` | query | string (int64) | no | If present, selects a specific revision of this object (as opposed to the latest version, the default). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objects.bulkRestore`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/o/bulkRestore`
- Initiates a long-running bulk restore operation on the specified bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `BulkRestoreObjectsRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the object resides. |

### `storage.objects.compose`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{destinationBucket}/o/{destinationObject}/compose`
- Concatenates a list of existing objects into a new object in the same bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `ComposeRequest`; Response: `Object`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `destinationBucket` | path | string | yes | Name of the bucket containing the source objects. The destination object is stored in this bucket. |
| `destinationObject` | path | string | yes | Name of the new object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `destinationPredefinedAcl` | query | string enum | no | Apply a predefined set of access controls to the destination object. Values: `authenticatedRead`, `bucketOwnerFullControl`, `bucketOwnerRead`, `private`, `projectPrivate`, `publicRead`. |
| `dropContextGroups` | query | repeated string | no | Specifies which object context groups to drop from the source object(s) during a compose operation. The accepted value is 'custom'. Destination contexts behave as follows: - When request body contexts are provided, they override all source contexts. - When no request body contexts are provided, source contexts are preserved unless 'dropContextGroups' contains 'custom', in which case all contexts are dropped. |
| `ifGenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current metageneration matches the given value. |
| `kmsKeyName` | query | string | no | Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objects.copy`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{sourceBucket}/o/{sourceObject}/copyTo/b/{destinationBucket}/o/{destinationObject}`
- Copies a source object to a destination object. Optionally overrides metadata.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `Object`; Response: `Object`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `sourceBucket` | path | string | yes | Name of the bucket in which to find the source object. |
| `sourceObject` | path | string | yes | Name of the source object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `destinationBucket` | path | string | yes | Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `destinationObject` | path | string | yes | Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. |
| `destinationKmsKeyName` | query | string | no | Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any. |
| `destinationPredefinedAcl` | query | string enum | no | Apply a predefined set of access controls to the destination object. Values: `authenticatedRead`, `bucketOwnerFullControl`, `bucketOwnerRead`, `private`, `projectPrivate`, `publicRead`. |
| `ifGenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the destination object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. |
| `ifGenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the destination object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the destination object's current metageneration matches the given value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the destination object's current metageneration does not match the given value. |
| `ifSourceGenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the source object's current generation matches the given value. |
| `ifSourceGenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the source object's current generation does not match the given value. |
| `ifSourceMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the source object's current metageneration matches the given value. |
| `ifSourceMetagenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the source object's current metageneration does not match the given value. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full. Values: `full`, `noAcl`. |
| `sourceGeneration` | query | string (int64) | no | If present, selects a specific revision of the source object (as opposed to the latest version, the default). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objects.delete`

- Versions: v1
- `DELETE https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}`
- Deletes an object and its metadata. Deletions are permanent if versioning is not enabled for the bucket, or if the generation parameter is used.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the object resides. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `generation` | query | string (int64) | no | If present, permanently deletes a specific revision of this object (as opposed to the latest version, the default). |
| `ifGenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. |
| `ifGenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current metageneration matches the given value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current metageneration does not match the given value. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objects.get`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}`
- Retrieves an object or its metadata.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `Object`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the object resides. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `generation` | query | string (int64) | no | If present, selects a specific revision of this object (as opposed to the latest version, the default). |
| `ifGenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. |
| `ifGenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current metageneration matches the given value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current metageneration does not match the given value. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to noAcl. Values: `full`, `noAcl`. |
| `restoreToken` | query | string | no | Restore token used to differentiate soft-deleted objects with the same name and generation. Only applicable for hierarchical namespace buckets and if softDeleted is set to true. This parameter is optional, and is only required in the rare case when there are multiple soft-deleted objects with the same name and generation. |
| `softDeleted` | query | boolean | no | If true, only soft-deleted object versions will be listed. The default is false. For more information, see Soft Delete (https://cloud.google.com/storage/docs/soft-delete). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objects.getIamPolicy`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}/iam`
- Returns an IAM policy for the specified object.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the object resides. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `generation` | query | string (int64) | no | If present, selects a specific revision of this object (as opposed to the latest version, the default). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objects.insert`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/o`
- Stores a new object and metadata.
- Media upload (resumable): `POST https://storage.googleapis.com/upload/storage/v1/b/{bucket}/o` with `uploadType=resumable` (starts a resumable upload session; send the content to the session URI that the response returns); the Discovery document also lists the path `/resumable/upload/storage/v1/b/{bucket}/o` for this protocol
- Media upload (simple): `POST https://storage.googleapis.com/upload/storage/v1/b/{bucket}/o` with `uploadType=media` (the body is the file content only) or `uploadType=multipart` (a `multipart/related` body with the JSON metadata part followed by the content part)
- Media upload limits: accepted media types: `*/*`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `Object`; Response: `Object`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any. |
| `contentEncoding` | query | string | no | If set, sets the contentEncoding property of the final object to this value. Setting this parameter is equivalent to setting the contentEncoding metadata property. This can be useful when uploading an object with uploadType=media to indicate the encoding of the content being uploaded. |
| `ifGenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. |
| `ifGenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current metageneration matches the given value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current metageneration does not match the given value. |
| `kmsKeyName` | query | string | no | Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any. |
| `name` | query | string | conditional | Name of the object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `predefinedAcl` | query | string enum | no | Apply a predefined set of access controls to this object. Values: `authenticatedRead`, `bucketOwnerFullControl`, `bucketOwnerRead`, `private`, `projectPrivate`, `publicRead`. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full. Values: `full`, `noAcl`. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objects.list`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/o`
- Retrieves a list of objects matching the criteria.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `Objects`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which to look for objects. |
| `delimiter` | query | string | no | Returns results in a directory-like mode. items will contain only objects whose names, aside from the prefix, do not contain delimiter. Objects whose names, aside from the prefix, contain delimiter will have their name, truncated after the delimiter, returned in prefixes. Duplicate prefixes are omitted. |
| `endOffset` | query | string | no | Filter results to objects whose names are lexicographically before endOffset. If startOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive). |
| `filter` | query | string | no | Filter the returned objects. Currently only supported for the contexts field. If delimiter is set, the returned prefixes are exempt from this filter. |
| `includeFoldersAsPrefixes` | query | boolean | no | Only applicable if delimiter is set to '/'. If true, will also include folders and managed folders (besides objects) in the returned prefixes. |
| `includeTrailingDelimiter` | query | boolean | no | If true, objects that end in exactly one instance of delimiter will have their metadata included in items in addition to prefixes. |
| `matchGlob` | query | string | no | Filter results to objects and prefixes that match this glob pattern. |
| `maxResults` | query | integer (uint32) | no | Maximum number of items plus prefixes to return in a single page of responses. As duplicate prefixes are omitted, fewer total results may be returned than requested. The service will use this parameter or 1,000 items, whichever is smaller. |
| `pageToken` | query | string | no | A previously-returned page token representing part of the larger set of results to view. |
| `prefix` | query | string | no | Filter results to objects whose names begin with this prefix. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to noAcl. Values: `full`, `noAcl`. |
| `softDeleted` | query | boolean | no | If true, only soft-deleted object versions will be listed. The default is false. For more information, see Soft Delete (https://cloud.google.com/storage/docs/soft-delete). |
| `startOffset` | query | string | no | Filter results to objects whose names are lexicographically equal to or after startOffset. If endOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |
| `versions` | query | boolean | no | If true, lists all versions of an object as distinct results. The default is false. For more information, see Object Versioning (https://cloud.google.com/storage/docs/object-versioning). |

### `storage.objects.move`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/o/{sourceObject}/moveTo/o/{destinationObject}`
- Moves the source object to the destination object in the same bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `Object`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the object resides. |
| `sourceObject` | path | string | yes | Name of the source object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `destinationObject` | path | string | yes | Name of the destination object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `ifGenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the destination object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. `ifGenerationMatch` and `ifGenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. |
| `ifGenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the destination object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.`ifGenerationMatch` and `ifGenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the destination object's current metageneration matches the given value. `ifMetagenerationMatch` and `ifMetagenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the destination object's current metageneration does not match the given value. `ifMetagenerationMatch` and `ifMetagenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. |
| `ifSourceGenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the source object's current generation matches the given value. `ifSourceGenerationMatch` and `ifSourceGenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. |
| `ifSourceGenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the source object's current generation does not match the given value. `ifSourceGenerationMatch` and `ifSourceGenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. |
| `ifSourceMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the source object's current metageneration matches the given value. `ifSourceMetagenerationMatch` and `ifSourceMetagenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. |
| `ifSourceMetagenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the source object's current metageneration does not match the given value. `ifSourceMetagenerationMatch` and `ifSourceMetagenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to noAcl. Values: `full`, `noAcl`. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objects.patch`

- Versions: v1
- `PATCH https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}`
- Patches an object's metadata.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `Object`; Response: `Object`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the object resides. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `generation` | query | string (int64) | no | If present, selects a specific revision of this object (as opposed to the latest version, the default). |
| `ifGenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. |
| `ifGenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current metageneration matches the given value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current metageneration does not match the given value. |
| `overrideUnlockedRetention` | query | boolean | no | Must be true to remove the retention configuration, reduce its unlocked retention period, or change its mode from unlocked to locked. |
| `predefinedAcl` | query | string enum | no | Apply a predefined set of access controls to this object. Values: `authenticatedRead`, `bucketOwnerFullControl`, `bucketOwnerRead`, `private`, `projectPrivate`, `publicRead`. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to full. Values: `full`, `noAcl`. |
| `userProject` | query | string | no | The project to be billed for this request, for Requester Pays buckets. |

### `storage.objects.restore`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}/restore`
- Restores a soft-deleted object.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: —; Response: `Object`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the object resides. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `generation` | query | string (int64) | yes | Selects a specific revision of this object. |
| `copySourceAcl` | query | boolean | no | If true, copies the source object's ACL; otherwise, uses the bucket's default object ACL. The default is false. |
| `ifGenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's one live generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. |
| `ifGenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether none of the object's live generations match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's one live metageneration matches the given value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether none of the object's live metagenerations match the given value. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to full. Values: `full`, `noAcl`. |
| `restoreToken` | query | string | no | Restore token used to differentiate sof-deleted objects with the same name and generation. Only applicable for hierarchical namespace buckets. This parameter is optional, and is only required in the rare case when there are multiple soft-deleted objects with the same name and generation. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objects.rewrite`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{sourceBucket}/o/{sourceObject}/rewriteTo/b/{destinationBucket}/o/{destinationObject}`
- Rewrites a source object to a destination object. Optionally overrides metadata.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `Object`; Response: `RewriteResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `sourceBucket` | path | string | yes | Name of the bucket in which to find the source object. |
| `sourceObject` | path | string | yes | Name of the source object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `destinationBucket` | path | string | yes | Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any. |
| `destinationObject` | path | string | yes | Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `destinationKmsKeyName` | query | string | no | Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any. |
| `destinationPredefinedAcl` | query | string enum | no | Apply a predefined set of access controls to the destination object. Values: `authenticatedRead`, `bucketOwnerFullControl`, `bucketOwnerRead`, `private`, `projectPrivate`, `publicRead`. |
| `dropContextGroups` | query | repeated string | no | Specifies which object context groups to drop from the source object during a copy operation. The accepted value is 'custom'. Destination contexts behave as follows: - When request body contexts are provided, they override all source contexts. - When no request body contexts are provided, source contexts are preserved unless 'dropContextGroups' contains 'custom', in which case all contexts are dropped. |
| `ifGenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. |
| `ifGenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the destination object's current metageneration matches the given value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the destination object's current metageneration does not match the given value. |
| `ifSourceGenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the source object's current generation matches the given value. |
| `ifSourceGenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the source object's current generation does not match the given value. |
| `ifSourceMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the source object's current metageneration matches the given value. |
| `ifSourceMetagenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the source object's current metageneration does not match the given value. |
| `maxBytesRewrittenPerCall` | query | string (int64) | no | The maximum number of bytes that will be rewritten per rewrite request. Most callers shouldn't need to specify this parameter - it is primarily in place to support testing. If specified the value must be an integral multiple of 1 MiB (1048576). Also, this only applies to requests where the source and destination span locations and/or storage classes. Finally, this value must not change across rewrite calls else you'll get an error that the rewriteToken is invalid. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full. Values: `full`, `noAcl`. |
| `rewriteToken` | query | string | no | Include this field (from the previous rewrite response) on each rewrite request after the first one, until the rewrite response 'done' flag is true. Calls that provide a rewriteToken can omit all other request fields, but if included those fields must match the values provided in the first rewrite request. |
| `sourceGeneration` | query | string (int64) | no | If present, selects a specific revision of the source object (as opposed to the latest version, the default). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objects.setIamPolicy`

- Versions: v1
- `PUT https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}/iam`
- Updates an IAM policy for the specified object.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `Policy`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the object resides. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `generation` | query | string (int64) | no | If present, selects a specific revision of this object (as opposed to the latest version, the default). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objects.testIamPermissions`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}/iam/testPermissions`
- Tests a set of permissions on the given object to see which, if any, are held by the caller.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the object resides. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `permissions` | query | repeated string | yes | Permissions to test. |
| `generation` | query | string (int64) | no | If present, selects a specific revision of this object (as opposed to the latest version, the default). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objects.update`

- Versions: v1
- `PUT https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}`
- Updates an object's metadata.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `Object`; Response: `Object`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the object resides. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `generation` | query | string (int64) | no | If present, selects a specific revision of this object (as opposed to the latest version, the default). |
| `ifGenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. |
| `ifGenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. |
| `ifMetagenerationMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current metageneration matches the given value. |
| `ifMetagenerationNotMatch` | query | string (int64) | no | Makes the operation conditional on whether the object's current metageneration does not match the given value. |
| `overrideUnlockedRetention` | query | boolean | no | Must be true to remove the retention configuration, reduce its unlocked retention period, or change its mode from unlocked to locked. |
| `predefinedAcl` | query | string enum | no | Apply a predefined set of access controls to this object. Values: `authenticatedRead`, `bucketOwnerFullControl`, `bucketOwnerRead`, `private`, `projectPrivate`, `publicRead`. |
| `projection` | query | string enum | no | Set of properties to return. Defaults to full. Values: `full`, `noAcl`. |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.objects.viewFullContext`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/o/{object}/viewFullContext`
- Retrieves a specific object context with its extended data for a given object.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `ObjectFullContext`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which the object resides. |
| `object` | path | string | yes | Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts (https://cloud.google.com/storage/docs/request-endpoints#encoding). |
| `contextKey` | query | string | yes | Key identifying the object context to retrieve. |
| `generation` | query | string (int64) | no | If present, selects a specific revision of this object (as opposed to the latest version, the default). |
| `userProject` | query | string | conditional | The project to be billed for this request. Required for Requester Pays buckets. |

### `storage.buckets.operations.advanceRelocateBucket`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/operations/{operationId}/advanceRelocateBucket`
- Starts asynchronous advancement of the relocate bucket operation in the case of required write downtime, to allow it to lock the bucket at the source location, and proceed with the bucket location swap. The server makes a best effort to advance the relocate bucket operation, but success is not guaranteed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `AdvanceRelocateBucketOperationRequest`; Response: —

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket to advance the relocate for. |
| `operationId` | path | string | yes | ID of the operation resource. |

### `storage.buckets.operations.cancel`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/operations/{operationId}/cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | The parent bucket of the operation resource. |
| `operationId` | path | string | yes | The ID of the operation resource. |

### `storage.buckets.operations.get`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/operations/{operationId}`
- Gets the latest state of a long-running operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | The parent bucket of the operation resource. |
| `operationId` | path | string | yes | The ID of the operation resource. |

### `storage.buckets.operations.list`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/operations`
- Lists operations that match the specified filter in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the bucket in which to look for operations. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | Maximum number of items to return in a single page of responses. Fewer total results may be returned than requested. The service uses this parameter or 100 items, whichever is smaller. |
| `pageToken` | query | string | no | A previously-returned page token representing part of the larger set of results to view. |

### `storage.projects.hmacKeys.create`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/projects/{projectId}/hmacKeys`
- Creates a new HMAC key for the specified service account.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: —; Response: `HmacKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Project ID owning the service account. |
| `serviceAccountEmail` | query | string | yes | Email address of the service account. |
| `userProject` | query | string | no | The project to be billed for this request. |

### `storage.projects.hmacKeys.delete`

- Versions: v1
- `DELETE https://storage.googleapis.com/storage/v1/projects/{projectId}/hmacKeys/{accessId}`
- Deletes an HMAC key.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Project ID owning the requested key |
| `accessId` | path | string | yes | Name of the HMAC key to be deleted. |
| `userProject` | query | string | no | The project to be billed for this request. |

### `storage.projects.hmacKeys.get`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/projects/{projectId}/hmacKeys/{accessId}`
- Retrieves an HMAC key's metadata
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`
- Request: —; Response: `HmacKeyMetadata`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Project ID owning the service account of the requested key. |
| `accessId` | path | string | yes | Name of the HMAC key. |
| `userProject` | query | string | no | The project to be billed for this request. |

### `storage.projects.hmacKeys.list`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/projects/{projectId}/hmacKeys`
- Retrieves a list of HMAC keys matching the criteria.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`
- Request: —; Response: `HmacKeysMetadata`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Name of the project in which to look for HMAC keys. |
| `maxResults` | query | integer (uint32) | no | Maximum number of items to return in a single page of responses. The service uses this parameter or 250 items, whichever is smaller. The max number of items per page will also be limited by the number of distinct service accounts in the response. If the number of service accounts in a single response is too high, the page will truncated and a next page token will be returned. |
| `pageToken` | query | string | no | A previously-returned page token representing part of the larger set of results to view. |
| `serviceAccountEmail` | query | string | no | If present, only keys for the given service account are returned. |
| `showDeletedKeys` | query | boolean | no | Whether or not to show keys in the DELETED state. |
| `userProject` | query | string | no | The project to be billed for this request. |

### `storage.projects.hmacKeys.update`

- Versions: v1
- `PUT https://storage.googleapis.com/storage/v1/projects/{projectId}/hmacKeys/{accessId}`
- Updates the state of an HMAC key. See the HMAC Key resource descriptor (https://cloud.google.com/storage/docs/json_api/v1/projects/hmacKeys/update#request-body) for valid states.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`
- Request: `HmacKeyMetadata`; Response: `HmacKeyMetadata`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Project ID owning the service account of the updated key. |
| `accessId` | path | string | yes | Name of the HMAC key being updated. |
| `userProject` | query | string | no | The project to be billed for this request. |

### `storage.projects.serviceAccount.get`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/projects/{projectId}/serviceAccount`
- Get the email address of this project's Google Cloud Storage service account.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `ServiceAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Project ID |
| `userProject` | query | string | no | The project to be billed for this request. |

### `storage.rapidCaches.disable`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/rapidCaches/{rapidCacheId}/disable`
- Disables a Rapid Cache instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the parent bucket. |
| `rapidCacheId` | path | string | yes | The ID of the requested Rapid Cache instance. |

### `storage.rapidCaches.get`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/rapidCaches/{rapidCacheId}`
- Returns the metadata of a Rapid Cache instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `RapidCache`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the parent bucket. |
| `rapidCacheId` | path | string | yes | The ID of the requested Rapid Cache instance. |

### `storage.rapidCaches.insert`

- Versions: v1
- `POST https://storage.googleapis.com/storage/v1/b/{bucket}/rapidCaches`
- Creates a Rapid Cache instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `RapidCache`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the parent bucket. |

### `storage.rapidCaches.list`

- Versions: v1
- `GET https://storage.googleapis.com/storage/v1/b/{bucket}/rapidCaches`
- Returns a list of Rapid Cache instances of the bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_only`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: —; Response: `RapidCaches`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the parent bucket. |
| `pageSize` | query | integer (int32) | no | Maximum number of items to return in a single page of responses. |
| `pageToken` | query | string | no | A previously-returned page token representing part of the larger set of results to view. |

### `storage.rapidCaches.update`

- Versions: v1
- `PATCH https://storage.googleapis.com/storage/v1/b/{bucket}/rapidCaches/{rapidCacheId}`
- Updates the configuration of a Rapid Cache instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/devstorage.full_control`, `https://www.googleapis.com/auth/devstorage.read_write`
- Request: `RapidCache`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `bucket` | path | string | yes | Name of the parent bucket. |
| `rapidCacheId` | path | string | yes | The ID of the requested Rapid Cache instance. |

### Example request skeleton

Generated from the Discovery entry of `storage.anywhereCaches.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://storage.googleapis.com/storage/v1/b/{bucket}/anywhereCaches/{anywhereCacheId}"
```

## Notes

- Generated from the Discovery document(s) v1 of `storage` (retrieved 2026-11-14). Resources on this page: anywhereCaches, bucketAccessControls, buckets, defaultObjectAccessControls, folders, managedFolders, notifications, objectAccessControls, objects, operations, projects, rapidCaches.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof, or when a path variable is described as optional (the method then also accepts the URL without that segment, as its description says).
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/storage/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://storage.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

---
source: https://storage.googleapis.com/$discovery/rest?version=v1
---

# Cloud Storage JSON API message schemas (storage)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/storage/`.

### `AdvanceRelocateBucketOperationRequest`

- An AdvanceRelocateBucketOperation request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (date-time) | Specifies the time when the relocation will revert to the sync stage if the relocation hasn't succeeded. |
| `ttl` | string (google-duration) | Specifies the duration after which the relocation will revert to the sync stage if the relocation hasn't succeeded. Optional, if not supplied, a default value of 12h will be used. |

### `AnywhereCache`

- An Anywhere Cache instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `admissionPolicy` | string | The cache-level entry admission policy. |
| `anywhereCacheId` | string | The ID of the Anywhere cache instance. |
| `bucket` | string | The name of the bucket containing this cache instance. |
| `createTime` | string (date-time) | The creation time of the cache instance in RFC 3339 format. |
| `id` | string | The ID of the resource, including the project number, bucket name and anywhere cache ID. |
| `ingestOnWrite` | boolean | Specifies whether objects are ingested into the cache upon write. |
| `kind` | string | The kind of item this is. For Anywhere Cache, this is always storage#anywhereCache. |
| `pendingUpdate` | boolean | True if the cache instance has an active Update long-running operation. |
| `selfLink` | string | The link to this cache instance. |
| `state` | string | The current state of the cache instance. |
| `ttl` | string (google-duration) | The TTL of all cache entries in whole seconds. e.g., "7200s". |
| `updateTime` | string (date-time) | The modification time of the cache instance metadata in RFC 3339 format. |
| `zone` | string | The zone in which the cache instance is running. For example, us-central1-a. |

### `AnywhereCaches`

- A list of Anywhere Caches.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<AnywhereCache> | The list of items. |
| `kind` | string | The kind of item this is. For lists of Anywhere Caches, this is always storage#anywhereCaches. |
| `nextPageToken` | string | The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. |

### `Bucket`

- A bucket.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acl` | array<BucketAccessControl> | Access controls on the bucket. |
| `autoclass` | object | The bucket's Autoclass configuration. |
| `billing` | object | The bucket's billing configuration. |
| `cors` | array<object> | The bucket's Cross-Origin Resource Sharing (CORS) configuration. |
| `customPlacementConfig` | object | The bucket's custom placement configuration for Custom Dual Regions. |
| `defaultEventBasedHold` | boolean | The default value for event-based hold on newly created objects in this bucket. Event-based hold is a way to retain objects indefinitely until an event occurs, signified by the hold's release. After being released, such objects will be subject to bucket-level retention (if any). One sample use case of this flag is for banks to hold loan documents for at least 3 years after loan is paid in full. Here, bucket-level retention is 3 years and the event is loan being paid in full. In this example, these objects will be held intact for any number of years until the event has occurred (event-based hold on the object is released) and then 3 more years after that. That means retention duration of the objects begins from the moment event-based hold transitioned from true to false. Objects under event-based hold cannot be deleted, overwritten or archived until the hold is removed. |
| `defaultObjectAcl` | array<ObjectAccessControl> | Default access controls to apply to new objects when no ACL is provided. |
| `encryption` | object | Encryption configuration for a bucket. |
| `etag` | string | HTTP 1.1 Entity tag for the bucket. |
| `generation` | string (int64) | The generation of this bucket. |
| `hardDeleteTime` | string (date-time) | The hard delete time of the bucket in RFC 3339 format. |
| `hierarchicalNamespace` | object | The bucket's hierarchical namespace configuration. |
| `iamConfiguration` | object | The bucket's IAM configuration. |
| `id` | string | The ID of the bucket. For buckets, the id and name properties are the same. |
| `ipFilter` | object | The bucket's IP filter configuration. Specifies the network sources that are allowed to access the operations on the bucket, as well as its underlying objects. Only enforced when the mode is set to 'Enabled'. |
| `kind` | string | The kind of item this is. For buckets, this is always storage#bucket. |
| `labels` | object | User-provided labels, in key/value pairs. |
| `lifecycle` | object | The bucket's lifecycle configuration. See Lifecycle Management (https://cloud.google.com/storage/docs/lifecycle) for more information. |
| `location` | string | The location of the bucket. Object data for objects in the bucket resides in physical storage within this region. Defaults to US. See the Developer's Guide (https://cloud.google.com/storage/docs/locations) for the authoritative list. |
| `locationType` | string | The type of the bucket location. |
| `logging` | object | The bucket's logging configuration, which defines the destination bucket and optional name prefix for the current bucket's logs. |
| `metageneration` | string (int64) | The metadata generation of this bucket. |
| `name` | string | The name of the bucket. |
| `objectRetention` | object | The bucket's object retention config. |
| `owner` | object | The owner of the bucket. This is always the project team's owner group. |
| `projectNumber` | string (uint64) | The project number of the project the bucket belongs to. |
| `retentionPolicy` | object | The bucket's retention policy. The retention policy enforces a minimum retention time for all objects contained in the bucket, based on their creation time. Any attempt to overwrite or delete objects younger than the retention period will result in a PERMISSION_DENIED error. An unlocked retention policy can be modified or removed from the bucket via a storage.buckets.update operation. A locked retention policy cannot be removed or shortened in duration for the lifetime of the bucket. Attempting to remove or decrease period of a locked retention policy will result in a PERMISSION_DENIED error. |
| `rpo` | string | The Recovery Point Objective (RPO) of this bucket. Set to ASYNC_TURBO to turn on Turbo Replication on a bucket. |
| `satisfiesPZI` | boolean | Reserved for future use. |
| `satisfiesPZS` | boolean | Reserved for future use. |
| `selfLink` | string | The URI of this bucket. |
| `softDeletePolicy` | object | The bucket's soft delete policy, which defines the period of time that soft-deleted objects will be retained, and cannot be permanently deleted. |
| `softDeleteTime` | string (date-time) | The soft delete time of the bucket in RFC 3339 format. |
| `storageClass` | string | The bucket's default storage class, used whenever no storageClass is specified for a newly-created object. This defines how objects in the bucket are stored and determines the SLA and the cost of storage. Values include MULTI_REGIONAL, REGIONAL, STANDARD, NEARLINE, COLDLINE, ARCHIVE, and DURABLE_REDUCED_AVAILABILITY. If this value is not specified when the bucket is created, it will default to STANDARD. For more information, see Storage Classes (https://cloud.google.com/storage/docs/storage-classes). |
| `timeCreated` | string (date-time) | The creation time of the bucket in RFC 3339 format. |
| `updated` | string (date-time) | The modification time of the bucket in RFC 3339 format. |
| `versioning` | object | The bucket's versioning configuration. |
| `website` | object | The bucket's website configuration, controlling how the service behaves when accessing bucket contents as a web site. See the Static Website Examples (https://cloud.google.com/storage/docs/static-website) for more information. |

### `BucketAccessControl`

- An access-control entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | The name of the bucket. |
| `domain` | string | The domain associated with the entity, if any. |
| `email` | string | The email address associated with the entity, if any. |
| `entity` | string | The entity holding the permission, in one of the following forms: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The user liz@example.com would be user-liz@example.com. - The group example@googlegroups.com would be group-example@googlegroups.com. - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com. |
| `entityId` | string | The ID for the entity, if any. |
| `etag` | string | HTTP 1.1 Entity tag for the access-control entry. |
| `id` | string | The ID of the access-control entry. |
| `kind` | string | The kind of item this is. For bucket access control entries, this is always storage#bucketAccessControl. |
| `projectTeam` | object | The project team associated with the entity, if any. |
| `role` | string | The access permission for the entity. |
| `selfLink` | string | The link to this access-control entry. |

### `BucketAccessControls`

- An access-control list.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<BucketAccessControl> | The list of items. |
| `kind` | string | The kind of item this is. For lists of bucket access control entries, this is always storage#bucketAccessControls. |

### `BucketStorageLayout`

- The storage layout configuration of a bucket.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | The name of the bucket. |
| `customPlacementConfig` | object | The bucket's custom placement configuration for Custom Dual Regions. |
| `hierarchicalNamespace` | object | The bucket's hierarchical namespace configuration. |
| `kind` | string | The kind of item this is. For storage layout, this is always storage#storageLayout. |
| `location` | string | The location of the bucket. |
| `locationType` | string | The type of the bucket location. |

### `Buckets`

- A list of buckets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<Bucket> | The list of items. |
| `kind` | string | The kind of item this is. For lists of buckets, this is always storage#buckets. |
| `nextPageToken` | string | The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. |
| `unreachable` | array<string> | The list of bucket resource names that could not be reached during the listing operation. |

### `BulkRestoreObjectsRequest`

- A bulk restore objects request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowOverwrite` | boolean | If false (default), the restore will not overwrite live objects with the same name at the destination. This means some deleted objects may be skipped. If true, live objects will be overwritten resulting in a noncurrent object (if versioning is enabled). If versioning is not enabled, overwriting the object will result in a soft-deleted object. In either case, if a noncurrent object already exists with the same name, a live version can be written without issue. |
| `copySourceAcl` | boolean | If true, copies the source object's ACL; otherwise, uses the bucket's default object ACL. The default is false. |
| `createdAfterTime` | string (date-time) | Restores only the objects that were created after this time. |
| `createdBeforeTime` | string (date-time) | Restores only the objects that were created before this time. |
| `matchGlobs` | array<string> | Restores only the objects matching any of the specified glob(s). If this parameter is not specified, all objects will be restored within the specified time range. |
| `softDeletedAfterTime` | string (date-time) | Restores only the objects that were soft-deleted after this time. |
| `softDeletedBeforeTime` | string (date-time) | Restores only the objects that were soft-deleted before this time. |

### `ComposeRequest`

- A Compose request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deleteSourceObjects` | boolean | If true, the source objects will be deleted. |
| `destination` | Object | Properties of the resulting object. |
| `kind` | string | The kind of item this is. |
| `sourceObjects` | array<object> | The list of source objects that will be concatenated into a single object. |

### `Expr`

- Represents an expression text. Example: title: "User account presence" description: "Determines whether the request has a user account" expression: "size(request.user) > 0"
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | An optional description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. The application context of the containing message determines which well-known feature set of CEL is supported. |
| `location` | string | An optional string indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | An optional title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `Folder`

- A folder. Only available in buckets with hierarchical namespace enabled.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | The name of the bucket containing this folder. |
| `createTime` | string (date-time) | The creation time of the folder in RFC 3339 format. |
| `id` | string | The ID of the folder, including the bucket name, folder name. |
| `kind` | string | The kind of item this is. For folders, this is always storage#folder. |
| `metageneration` | string (int64) | The version of the metadata for this folder. Used for preconditions and for detecting changes in metadata. |
| `name` | string | The name of the folder. Required if not specified by URL parameter. |
| `pendingRenameInfo` | object | Only present if the folder is part of an ongoing rename folder operation. Contains information which can be used to query the operation status. |
| `selfLink` | string | The link to this folder. |
| `updateTime` | string (date-time) | The modification time of the folder metadata in RFC 3339 format. |

### `Folders`

- A list of folders.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<Folder> | The list of items. |
| `kind` | string | The kind of item this is. For lists of folders, this is always storage#folders. |
| `nextPageToken` | string | The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. |

### `GoogleLongrunningListOperationsResponse`

- The response message for storage.buckets.operations.list.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | The kind of item this is. For lists of operations, this is always storage#operations. |
| `nextPageToken` | string | The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. |
| `operations` | array<GoogleLongrunningOperation> | A list of operations that matches the specified filter in the request. |

### `GoogleLongrunningOperation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is "false", it means the operation is still in progress. If "true", the operation is completed, and either "error" or "response" is available. |
| `error` | GoogleRpcStatus | The error result of the operation in case of failure or cancellation. |
| `kind` | string | The kind of item this is. For operations, this is always storage#operation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the "name" should be a resource name ending with "operations/{operationId}". |
| `response` | object | The normal response of the operation in case of success. If the original method returns no data on success, such as "Delete", the response is google.protobuf.Empty. If the original method is standard Get/Create/Update, the response should be the resource. For other methods, the response should have the type "XxxResponse", where "Xxx" is the original method name. For example, if the original method name is "TakeSnapshot()", the inferred response type is "TakeSnapshotResponse". |
| `selfLink` | string | The link to this long running operation. |

### `GoogleRpcStatus`

- The "Status" type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each "Status" message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. |

### `HmacKey`

- JSON template to produce a JSON-style HMAC Key resource for Create responses.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | The kind of item this is. For HMAC keys, this is always storage#hmacKey. |
| `metadata` | HmacKeyMetadata | Key metadata. |
| `secret` | string | HMAC secret key material. |

### `HmacKeyMetadata`

- JSON template to produce a JSON-style HMAC Key metadata resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessId` | string | The ID of the HMAC Key. |
| `etag` | string | HTTP 1.1 Entity tag for the HMAC key. |
| `id` | string | The ID of the HMAC key, including the Project ID and the Access ID. |
| `kind` | string | The kind of item this is. For HMAC Key metadata, this is always storage#hmacKeyMetadata. |
| `projectId` | string | Project ID owning the service account to which the key authenticates. |
| `selfLink` | string | The link to this resource. |
| `serviceAccountEmail` | string | The email address of the key's associated service account. |
| `state` | string | The state of the key. Can be one of ACTIVE, INACTIVE, or DELETED. |
| `timeCreated` | string (date-time) | The creation time of the HMAC key in RFC 3339 format. |
| `updated` | string (date-time) | The last modification time of the HMAC key metadata in RFC 3339 format. |

### `HmacKeysMetadata`

- A list of hmacKeys.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<HmacKeyMetadata> | The list of items. |
| `kind` | string | The kind of item this is. For lists of hmacKeys, this is always storage#hmacKeysMetadata. |
| `nextPageToken` | string | The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. |

### `ManagedFolder`

- A managed folder.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | The name of the bucket containing this managed folder. |
| `createTime` | string (date-time) | The creation time of the managed folder in RFC 3339 format. |
| `id` | string | The ID of the managed folder, including the bucket name and managed folder name. |
| `kind` | string | The kind of item this is. For managed folders, this is always storage#managedFolder. |
| `metageneration` | string (int64) | The version of the metadata for this managed folder. Used for preconditions and for detecting changes in metadata. |
| `name` | string | The name of the managed folder. Required if not specified by URL parameter. |
| `rapidCacheConfig` | RapidCacheConfig | The rapid cache configuration for the managed folder. |
| `selfLink` | string | The link to this managed folder. |
| `updateTime` | string (date-time) | The last update time of the managed folder metadata in RFC 3339 format. |

### `ManagedFolders`

- A list of managed folders.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<ManagedFolder> | The list of items. |
| `kind` | string | The kind of item this is. For lists of managed folders, this is always storage#managedFolders. |
| `nextPageToken` | string | The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. |

### `Notification`

- A subscription to receive Google PubSub notifications.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `custom_attributes` | object | An optional list of additional attributes to attach to each Cloud PubSub message published for this notification subscription. |
| `etag` | string | HTTP 1.1 Entity tag for this subscription notification. |
| `event_types` | array<string> | If present, only send notifications about listed event types. If empty, sent notifications for all event types. |
| `id` | string | The ID of the notification. |
| `kind` | string | The kind of item this is. For notifications, this is always storage#notification. |
| `object_name_prefix` | string | If present, only apply this notification configuration to object names that begin with this prefix. |
| `payload_format` | string | The desired content of the Payload. |
| `selfLink` | string | The canonical URL of this notification. |
| `topic` | string | The Cloud PubSub topic to which this subscription publishes. Formatted as: '//pubsub.googleapis.com/projects/{project-identifier}/topics/{my-topic}' |

### `Notifications`

- A list of notification subscriptions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<Notification> | The list of items. |
| `kind` | string | The kind of item this is. For lists of notifications, this is always storage#notifications. |

### `Object`

- An object.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acl` | array<ObjectAccessControl> | Access controls on the object. |
| `bucket` | string | The name of the bucket containing this object. |
| `cacheControl` | string | Cache-Control directive for the object data. If omitted, and the object is accessible to all anonymous users, the default will be public, max-age=3600. |
| `componentCount` | integer (int32) | Number of underlying components that make up this object. Components are accumulated by compose operations. |
| `contentDisposition` | string | Content-Disposition of the object data. |
| `contentEncoding` | string | Content-Encoding of the object data. |
| `contentLanguage` | string | Content-Language of the object data. |
| `contentType` | string | Content-Type of the object data. If an object is stored without a Content-Type, it is served as application/octet-stream. |
| `contexts` | object | User-defined or system-defined object contexts. Each object context is a key-payload pair, where the key provides the identification and the payload holds the associated value and additional metadata. |
| `crc32c` | string | CRC32c checksum, as described in RFC 4960, Appendix B; encoded using base64 in big-endian byte order. For more information about using the CRC32c checksum, see Data Validation and Change Detection (https://cloud.google.com/storage/docs/data-validation). |
| `customTime` | string (date-time) | A timestamp in RFC 3339 format specified by the user for an object. |
| `customerEncryption` | object | Metadata of customer-supplied encryption key, if the object is encrypted by such a key. |
| `etag` | string | HTTP 1.1 Entity tag for the object. |
| `eventBasedHold` | boolean | Whether an object is under event-based hold. Event-based hold is a way to retain objects until an event occurs, which is signified by the hold's release (i.e. this value is set to false). After being released (set to false), such objects will be subject to bucket-level retention (if any). One sample use case of this flag is for banks to hold loan documents for at least 3 years after loan is paid in full. Here, bucket-level retention is 3 years and the event is the loan being paid in full. In this example, these objects will be held intact for any number of years until the event has occurred (event-based hold on the object is released) and then 3 more years after that. That means retention duration of the objects begins from the moment event-based hold transitioned from true to false. |
| `generation` | string (int64) | The content generation of this object. Used for object versioning. |
| `hardDeleteTime` | string (date-time) | This is the time (in the future) when the soft-deleted object will no longer be restorable. It is equal to the soft delete time plus the current soft delete retention duration of the bucket. |
| `id` | string | The ID of the object, including the bucket name, object name, and generation number. |
| `kind` | string | The kind of item this is. For objects, this is always storage#object. |
| `kmsKeyName` | string | Not currently supported. Specifying the parameter causes the request to fail with status code 400 - Bad Request. |
| `md5Hash` | string | MD5 hash of the data; encoded using base64. For more information about using the MD5 hash, see Data Validation and Change Detection (https://cloud.google.com/storage/docs/data-validation). |
| `mediaLink` | string | Media download link. |
| `metadata` | object | User-provided metadata, in key/value pairs. |
| `metageneration` | string (int64) | The version of the metadata for this object at this generation. Used for preconditions and for detecting changes in metadata. A metageneration number is only meaningful in the context of a particular generation of a particular object. |
| `name` | string | The name of the object. Required if not specified by URL parameter. |
| `owner` | object | The owner of the object. This will always be the uploader of the object. |
| `restoreToken` | string | Restore token used to differentiate deleted objects with the same name and generation. This field is only returned for deleted objects in hierarchical namespace buckets. |
| `retention` | object | A collection of object level retention parameters. |
| `retentionExpirationTime` | string (date-time) | A server-determined value that specifies the earliest time that the object's retention period expires. This value is in RFC 3339 format. Note 1: This field is not provided for objects with an active event-based hold, since retention expiration is unknown until the hold is removed. Note 2: This value can be provided even when temporary hold is set (so that the user can reason about policy without having to first unset the temporary hold). |
| `selfLink` | string | The link to this object. |
| `size` | string (uint64) | Content-Length of the data in bytes. |
| `softDeleteTime` | string (date-time) | The time at which the object became soft-deleted in RFC 3339 format. |
| `storageClass` | string | Storage class of the object. |
| `temporaryHold` | boolean | Whether an object is under temporary hold. While this flag is set to true, the object is protected against deletion and overwrites. A common use case of this flag is regulatory investigations where objects need to be retained while the investigation is ongoing. Note that unlike event-based hold, temporary hold does not impact retention expiration time of an object. |
| `timeCreated` | string (date-time) | The creation time of the object in RFC 3339 format. |
| `timeDeleted` | string (date-time) | The time at which the object became noncurrent in RFC 3339 format. Will be returned if and only if this version of the object has been deleted. |
| `timeFinalized` | string (date-time) | The time when the object was finalized. |
| `timeStorageClassUpdated` | string (date-time) | The time at which the object's storage class was last changed. When the object is initially created, it will be set to timeCreated. |
| `updated` | string (date-time) | The modification time of the object metadata in RFC 3339 format. Set initially to object creation time and then updated whenever any metadata of the object changes. This includes changes made by a requester, such as modifying custom metadata, as well as changes made by Cloud Storage on behalf of a requester, such as changing the storage class based on an Object Lifecycle Configuration. |

### `ObjectAccessControl`

- An access-control entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | The name of the bucket. |
| `domain` | string | The domain associated with the entity, if any. |
| `email` | string | The email address associated with the entity, if any. |
| `entity` | string | The entity holding the permission, in one of the following forms: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The user liz@example.com would be user-liz@example.com. - The group example@googlegroups.com would be group-example@googlegroups.com. - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com. |
| `entityId` | string | The ID for the entity, if any. |
| `etag` | string | HTTP 1.1 Entity tag for the access-control entry. |
| `generation` | string (int64) | The content generation of the object, if applied to an object. |
| `id` | string | The ID of the access-control entry. |
| `kind` | string | The kind of item this is. For object access control entries, this is always storage#objectAccessControl. |
| `object` | string | The name of the object, if applied to an object. |
| `projectTeam` | object | The project team associated with the entity, if any. |
| `role` | string | The access permission for the entity. |
| `selfLink` | string | The link to this access-control entry. |

### `ObjectAccessControls`

- An access-control list.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<ObjectAccessControl> | The list of items. |
| `kind` | string | The kind of item this is. For lists of object access control entries, this is always storage#objectAccessControls. |

### `ObjectCustomContextPayload`

- The payload of a single user-defined object context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (date-time) | The time at which the object context was created in RFC 3339 format. |
| `extendedDataTypeUrl` | string | The type URL of the object context's extended data. |
| `updateTime` | string (date-time) | The time at which the object context was last updated in RFC 3339 format. |
| `value` | string | The value of the object context. |

### `ObjectFullContext`

- A full representation of an object context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (date-time) | The time at which the object context was created. This value is in RFC 3339 format. |
| `extendedData` | object | The extended data of the object context. |
| `key` | string | The key of the object context. |
| `kind` | string | The kind of item this is. For ObjectFullContext, this is always storage#objectFullContext. |
| `type` | string enum | The type of the object context. Values: `CUSTOM`. |
| `updateTime` | string (date-time) | The time at which the object context was last updated. This value is in RFC 3339 format. |
| `value` | string | The value of the object context. |

### `Objects`

- A list of objects.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<Object> | The list of items. |
| `kind` | string | The kind of item this is. For lists of objects, this is always storage#objects. |
| `nextPageToken` | string | The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. |
| `prefixes` | array<string> | The list of prefixes of objects matching-but-not-listed up to and including the requested delimiter. |

### `Policy`

- A bucket/object/managedFolder IAM policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindings` | array<object> | An association between a role, which comes with a set of permissions, and members who may assume that role. |
| `etag` | string (byte) | HTTP 1.1 Entity tag for the policy. |
| `kind` | string | The kind of item this is. For policies, this is always storage#policy. This field is ignored on input. |
| `resourceId` | string | The ID of the resource to which this policy belongs. Will be of the form projects/\_/buckets/bucket for buckets, projects/\_/buckets/bucket/objects/object for objects, and projects/\_/buckets/bucket/managedFolders/managedFolder. A specific generation may be specified by appending #generationNumber to the end of the object name, e.g. projects/\_/buckets/my-bucket/objects/data.txt#17. The current generation can be denoted with #0. This field is ignored on input. |
| `version` | integer (int32) | The IAM policy format version. |

### `RapidCache`

- A Rapid Cache instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `admissionPolicy` | string | The cache-level entry admission policy. |
| `bucket` | string | The name of the bucket containing this cache instance. |
| `cacheType` | string | The type of Rapid Cache this represents. Valid values include: "rapid-cache" and "rapid-cache-ultra". |
| `createTime` | string (date-time) | The creation time of the cache instance in RFC 3339 format. |
| `id` | string | The ID of the resource, including the project number, bucket name and rapid cache ID. |
| `ingestOnWrite` | boolean | Specifies whether objects are ingested into the cache upon write. |
| `kind` | string | The kind of item this is. For Rapid Cache, this is always storage#rapidCache. |
| `pendingUpdate` | boolean | True if the cache instance has an active Update long-running operation. |
| `rapidCacheId` | string | The ID of the Rapid cache instance. |
| `selfLink` | string | The link to this cache instance. |
| `state` | string | The current state of the cache instance. |
| `ttl` | string (google-duration) | The TTL of all cache entries in whole seconds. e.g., "7200s". |
| `updateTime` | string (date-time) | The modification time of the cache instance metadata in RFC 3339 format. |
| `zone` | string | The zone in which the cache instance is running. For example, us-central1-a. |

### `RapidCacheConfig`

- Configuration options for the rapid cache of a managed folder.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policies` | object | A map of rapid cache IDs to the corresponding `RapidCachePolicy` configurations for a managed folder. |

### `RapidCachePolicy`

- The rapid cache policy configuration for a managed folder.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ingestOnWrite` | string enum | The ingest-on-write policy for objects in the managed folder. When set to `enabled`, objects are automatically ingested into the cache when they are written to the managed folder. Values: `enabled`, `unspecified`. |
| `rapidCacheId` | string | The unique identifier of the rapid cache. |

### `RapidCaches`

- A list of Rapid Caches.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<RapidCache> | The list of items. |
| `kind` | string | The kind of item this is. For lists of Rapid Caches, this is always storage#rapidCaches. |
| `nextPageToken` | string | The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. |

### `RelocateBucketRequest`

- A Relocate Bucket request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationCustomPlacementConfig` | object | The bucket's new custom placement configuration if relocating to a Custom Dual Region. |
| `destinationKmsKeyName` | string | Resource name of a Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key. If set, is used to encrypt all objects in the destination bucket. |
| `destinationLocation` | string | The new location the bucket will be relocated to. |
| `validateOnly` | boolean | If true, validate the operation, but do not actually relocate the bucket. |

### `RewriteResponse`

- A rewrite response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | true if the copy is finished; otherwise, false if the copy is in progress. This property is always present in the response. |
| `kind` | string | The kind of item this is. |
| `objectSize` | string (int64) | The total size of the object being copied in bytes. This property is always present in the response. |
| `resource` | Object | A resource containing the metadata for the copied-to object. This property is present in the response only when copying completes. |
| `rewriteToken` | string | A token to use in subsequent requests to continue copying data. This token is present in the response only when there is more data to copy. |
| `totalBytesRewritten` | string (int64) | The total bytes written so far, which can be used to provide a waiting user with a progress indicator. This property is always present in the response. |

### `ServiceAccount`

- A subscription to receive Google PubSub notifications.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email_address` | string | The ID of the notification. |
| `kind` | string | The kind of item this is. For notifications, this is always storage#notification. |

### `TestIamPermissionsResponse`

- A storage.(buckets|objects|managedFolders).testIamPermissions response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | The kind of item this is. |
| `permissions` | array<string> | The permissions held by the caller. Permissions are always of the format storage.resource.capability, where resource is one of buckets, objects, or managedFolders. The supported permissions are as follows: - storage.buckets.delete - Delete bucket. - storage.buckets.get - Read bucket metadata. - storage.buckets.getIamPolicy - Read bucket IAM policy. - storage.buckets.create - Create bucket. - storage.buckets.list - List buckets. - storage.buckets.setIamPolicy - Update bucket IAM policy. - storage.buckets.update - Update bucket metadata. - storage.objects.delete - Delete object. - storage.objects.get - Read object data and metadata. - storage.objects.getIamPolicy - Read object IAM policy. - storage.objects.create - Create object. - storage.objects.list - List objects. - storage.objects.setIamPolicy - Update object IAM policy. - storage.objects.update - Update object metadata. - storage.managedFolders.delete - Delete managed folder. - storage.managedFolders.get - Read managed folder metadata. - storage.managedFolders.getIamPolicy - Read managed folder IAM policy. - storage.managedFolders.create - Create managed folder. - storage.managedFolders.list - List managed folders. - storage.managedFolders.setIamPolicy - Update managed folder IAM policy. |

### Shape of `AdvanceRelocateBucketOperationRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "expireTime": "string (date-time)",
  "ttl": "string (google-duration)"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `storage` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): the `ServiceAccount` type is described as "A subscription to receive Google PubSub notifications", its `email_address` as "The ID of the notification" and its `kind` as `storage#notification`; these texts are copied from `Notification`. `ServiceAccount` is the response of `storage.projects.serviceAccount.get` ("Get the email address of this project's Google Cloud Storage service account"): `email_address` is that service account's email address, and `kind` is `storage#serviceAccount` (the field default in Discovery).
- Source: https://storage.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

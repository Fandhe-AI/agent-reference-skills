---
source: https://biglake.googleapis.com/$discovery/rest?version=v1
---

# Lakehouse API message schemas (biglake)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/biglake/`.

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v1

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

### `Catalog`

- Catalog is the container of databases.
- Version: v1

### `Database`

- Database is the container of tables.
- Version: v1

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

### `HiveDatabaseOptions`

- Options of a Hive database.
- Version: v1

### `HiveTableOptions`

- Options of a Hive table.
- Version: v1

### `ListCatalogsResponse`

- Response message for the ListCatalogs method.
- Version: v1

### `ListDatabasesResponse`

- Response message for the ListDatabases method.
- Version: v1

### `ListTablesResponse`

- Response message for the ListTables method.
- Version: v1

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

### `RenameTableRequest`

- Request message for the RenameTable method in MetastoreService
- Version: v1

### `SerDeInfo`

- Serializer and deserializer information.
- Version: v1

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

### `StorageDescriptor`

- Stores physical storage information of the data.
- Version: v1

### `Table`

- Represents a table.
- Version: v1

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

### Shape of `AuditConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "auditLogConfigs": "array<AuditLogConfig>",
  "service": "string"
}
```

## Options / Props

### `AuditConfig` fields

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | `array<AuditLogConfig>` | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig` fields

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | `array<string>` | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `Binding` fields

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | `array<string>` | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `Catalog` fields

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The creation time of the catalog. |
| `deleteTime` | string (google-datetime) | Output only. The deletion time of the catalog. Only set after the catalog is deleted. |
| `expireTime` | string (google-datetime) | Output only. The time when this catalog is considered expired. Only set after the catalog is deleted. |
| `name` | string | Output only. The resource name. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id} |
| `updateTime` | string (google-datetime) | Output only. The last modification time of the catalog. |

### `Database` fields

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The creation time of the database. |
| `deleteTime` | string (google-datetime) | Output only. The deletion time of the database. Only set after the database is deleted. |
| `expireTime` | string (google-datetime) | Output only. The time when this database is considered expired. Only set after the database is deleted. |
| `hiveOptions` | HiveDatabaseOptions | Options of a Hive database. |
| `name` | string | Output only. The resource name. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id} |
| `type` | string enum | The database type. Values: `TYPE_UNSPECIFIED`, `HIVE`. |
| `updateTime` | string (google-datetime) | Output only. The last modification time of the database. |

### `Expr` fields

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `HiveDatabaseOptions` fields

| Field | Type | Description |
|---|---|---|
| `locationUri` | string | Cloud Storage folder URI where the database data is stored, starting with "gs://". |
| `parameters` | object | Stores user supplied Hive database parameters. |

### `HiveTableOptions` fields

| Field | Type | Description |
|---|---|---|
| `parameters` | object | Stores user supplied Hive table parameters. |
| `storageDescriptor` | StorageDescriptor | Stores physical storage information of the data. |
| `tableType` | string | Hive table type. For example, MANAGED_TABLE, EXTERNAL_TABLE. |

### `ListCatalogsResponse` fields

| Field | Type | Description |
|---|---|---|
| `catalogs` | `array<Catalog>` | The catalogs from the specified project. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListDatabasesResponse` fields

| Field | Type | Description |
|---|---|---|
| `databases` | `array<Database>` | The databases from the specified catalog. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListTablesResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `tables` | `array<Table>` | The tables from the specified database. |

### `Policy` fields

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | `array<AuditConfig>` | Specifies cloud audit logging configuration for this policy. |
| `bindings` | `array<Binding>` | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `RenameTableRequest` fields

| Field | Type | Description |
|---|---|---|
| `newName` | string | Required. The new `name` for the specified table, must be in the same database. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id}/tables/{table_id} |

### `SerDeInfo` fields

| Field | Type | Description |
|---|---|---|
| `serializationLib` | string | The fully qualified Java class name of the serialization library. |

### `SetIamPolicyRequest` fields

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `StorageDescriptor` fields

| Field | Type | Description |
|---|---|---|
| `inputFormat` | string | The fully qualified Java class name of the input format. |
| `locationUri` | string | Cloud Storage folder URI where the table data is stored, starting with "gs://". |
| `outputFormat` | string | The fully qualified Java class name of the output format. |
| `serdeInfo` | SerDeInfo | Serializer and deserializer information. |

### `Table` fields

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The creation time of the table. |
| `deleteTime` | string (google-datetime) | Output only. The deletion time of the table. Only set after the table is deleted. |
| `etag` | string | The checksum of a table object computed by the server based on the value of other fields. It may be sent on update requests to ensure the client has an up-to-date value before proceeding. It is only checked for update table operations. |
| `expireTime` | string (google-datetime) | Output only. The time when this table is considered expired. Only set after the table is deleted. |
| `hiveOptions` | HiveTableOptions | Options of a Hive table. |
| `name` | string | Output only. The resource name. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id}/tables/{table_id} |
| `type` | string enum | The table type. Values: `TYPE_UNSPECIFIED`, `HIVE`. |
| `updateTime` | string (google-datetime) | Output only. The last modification time of the table. |

### `TestIamPermissionsRequest` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | `array<string>` | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | `array<string>` | A subset of `TestIamPermissionsRequest.permissions` that the caller is allowed (request type name corrected; see Notes). |

## Notes

- Generated from the Discovery document(s) v1 of `biglake` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the Discovery document: the `TestIamPermissionsResponse.permissions` description reads "A subset of `TestPermissionsRequest.permissions` that the caller is allowed."; the same text is in the `google.iam.v1` proto, where the request message of `TestIamPermissions` is `TestIamPermissionsRequest` (`google/iam/v1/iam_policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/iam/v1/iam_policy.proto, commit `5ce0245`, retrieved 2026-11-21).
- Source: https://biglake.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

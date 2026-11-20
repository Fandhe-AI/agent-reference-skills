---
source: https://biglake.googleapis.com/$discovery/rest?version=v1
---

# Lakehouse API REST API (biglake)

## Signature / Usage

Base URL: `https://biglake.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `biglake.projects.catalogs.getIamPolicy`

- Versions: v1
- `GET https://biglake.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the IAM policy for the specified Catalog.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `biglake.projects.catalogs.namespaces.getIamPolicy`

- Versions: v1
- `GET https://biglake.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the IAM policy for the specified Catalog.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `biglake.projects.catalogs.namespaces.setIamPolicy`

- Versions: v1
- `POST https://biglake.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the IAM policy for the specified catalog.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `biglake.projects.catalogs.namespaces.tables.getIamPolicy`

- Versions: v1
- `GET https://biglake.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the IAM policy for the specified Catalog.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `biglake.projects.catalogs.namespaces.tables.setIamPolicy`

- Versions: v1
- `POST https://biglake.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the IAM policy for the specified catalog.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `biglake.projects.catalogs.namespaces.tables.testIamPermissions`

- Versions: v1
- `POST https://biglake.googleapis.com/v1/{+resource}:testIamPermissions`
- Tests the IAM permissions for the specified table.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `biglake.projects.catalogs.namespaces.testIamPermissions`

- Versions: v1
- `POST https://biglake.googleapis.com/v1/{+resource}:testIamPermissions`
- Tests the IAM permissions for the specified namespace.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `biglake.projects.catalogs.namespaces.views.getIamPolicy`

- Versions: v1
- `GET https://biglake.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the IAM policy for the specified View.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `biglake.projects.catalogs.namespaces.views.setIamPolicy`

- Versions: v1
- `POST https://biglake.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the IAM policy for the specified view.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `biglake.projects.catalogs.namespaces.views.testIamPermissions`

- Versions: v1
- `POST https://biglake.googleapis.com/v1/{+resource}:testIamPermissions`
- Tests the IAM permissions for the specified view.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `biglake.projects.catalogs.setIamPolicy`

- Versions: v1
- `POST https://biglake.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the IAM policy for the specified catalog.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `biglake.projects.catalogs.testIamPermissions`

- Versions: v1
- `POST https://biglake.googleapis.com/v1/{+resource}:testIamPermissions`
- Tests the IAM permissions for the specified catalog.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `biglake.projects.locations.catalogs.create`

- Versions: v1
- `POST https://biglake.googleapis.com/v1/{+parent}/catalogs`
- Creates a new catalog.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Catalog`; Response: `Catalog`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this catalog will be created. Format: projects/{project_id_or_number}/locations/{location_id} |
| `catalogId` | query | string | yes | Required. The ID to use for the catalog, which will become the final component of the catalog's resource name. |

### `biglake.projects.locations.catalogs.databases.create`

- Versions: v1
- `POST https://biglake.googleapis.com/v1/{+parent}/databases`
- Creates a new database.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Database`; Response: `Database`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this database will be created. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id} |
| `databaseId` | query | string | yes | Required. The ID to use for the database, which will become the final component of the database's resource name. |

### `biglake.projects.locations.catalogs.databases.delete`

- Versions: v1
- `DELETE https://biglake.googleapis.com/v1/{+name}`
- Deletes an existing database specified by the database ID.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Database`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the database to delete. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id} |

### `biglake.projects.locations.catalogs.databases.get`

- Versions: v1
- `GET https://biglake.googleapis.com/v1/{+name}`
- Gets the database specified by the resource name.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Database`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the database to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id} |

### `biglake.projects.locations.catalogs.databases.list`

- Versions: v1
- `GET https://biglake.googleapis.com/v1/{+parent}/databases`
- List all databases in a specified catalog.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDatabasesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of databases. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id} |
| `pageSize` | query | integer (int32) | no | The maximum number of databases to return. The service may return fewer than this value. If unspecified, at most 50 databases will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListDatabases` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDatabases` must match the call that provided the page token. |

### `biglake.projects.locations.catalogs.databases.patch`

- Versions: v1
- `PATCH https://biglake.googleapis.com/v1/{+name}`
- Updates an existing database specified by the database ID.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Database`; Response: `Database`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id} |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to update. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask If not set, defaults to all of the fields that are allowed to update. |

### `biglake.projects.locations.catalogs.databases.tables.create`

- Versions: v1
- `POST https://biglake.googleapis.com/v1/{+parent}/tables`
- Creates a new table.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Table`; Response: `Table`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this table will be created. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id} |
| `tableId` | query | string | yes | Required. The ID to use for the table, which will become the final component of the table's resource name. |

### `biglake.projects.locations.catalogs.databases.tables.delete`

- Versions: v1
- `DELETE https://biglake.googleapis.com/v1/{+name}`
- Deletes an existing table specified by the table ID.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Table`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the table to delete. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id}/tables/{table_id} |

### `biglake.projects.locations.catalogs.databases.tables.get`

- Versions: v1
- `GET https://biglake.googleapis.com/v1/{+name}`
- Gets the table specified by the resource name.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Table`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the table to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id}/tables/{table_id} |

### `biglake.projects.locations.catalogs.databases.tables.list`

- Versions: v1
- `GET https://biglake.googleapis.com/v1/{+parent}/tables`
- List all tables in a specified database.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTablesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of tables. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id} |
| `pageSize` | query | integer (int32) | no | The maximum number of tables to return. The service may return fewer than this value. If unspecified, at most 50 tables will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListTables` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTables` must match the call that provided the page token. |
| `view` | query | string enum | no | The view for the returned tables. Values: `TABLE_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `biglake.projects.locations.catalogs.databases.tables.patch`

- Versions: v1
- `PATCH https://biglake.googleapis.com/v1/{+name}`
- Updates an existing table specified by the table ID.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Table`; Response: `Table`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id}/tables/{table_id} |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to update. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask If not set, defaults to all of the fields that are allowed to update. |

### `biglake.projects.locations.catalogs.databases.tables.rename`

- Versions: v1
- `POST https://biglake.googleapis.com/v1/{+name}:rename`
- Renames an existing table specified by the table ID.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RenameTableRequest`; Response: `Table`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The table's `name` field is used to identify the table to rename. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id}/tables/{table_id} |

### `biglake.projects.locations.catalogs.delete`

- Versions: v1
- `DELETE https://biglake.googleapis.com/v1/{+name}`
- Deletes an existing catalog specified by the catalog ID.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Catalog`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the catalog to delete. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id} |

### `biglake.projects.locations.catalogs.get`

- Versions: v1
- `GET https://biglake.googleapis.com/v1/{+name}`
- Gets the catalog specified by the resource name.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Catalog`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the catalog to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id} |

### `biglake.projects.locations.catalogs.list`

- Versions: v1
- `GET https://biglake.googleapis.com/v1/{+parent}/catalogs`
- List all catalogs in a specified project.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCatalogsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of catalogs. Format: projects/{project_id_or_number}/locations/{location_id} |
| `pageSize` | query | integer (int32) | no | The maximum number of catalogs to return. The service may return fewer than this value. If unspecified, at most 50 catalogs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListCatalogs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCatalogs` must match the call that provided the page token. |

### Example request skeleton

Generated from the Discovery entry of `biglake.projects.catalogs.getIamPolicy` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://biglake.googleapis.com/v1/{+resource}:getIamPolicy"
```

## Notes

- Generated from the Discovery document(s) v1 of `biglake` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`biglake` v1, revision 20261007) also lists 24 endpoints of the form `https://biglake.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `asia-south1`, `asia-south2`, `europe-west1`, `europe-west10`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central2`, `northamerica-northeast1`, `northamerica-northeast2`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://biglake.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://biglake.asia-south1.rep.googleapis.com/`) and keep the path.
- Source: https://biglake.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

---
source: https://datacatalog.googleapis.com/$discovery/rest?version=v1
---

# Google Cloud Data Catalog API REST API (datacatalog)

## Signature / Usage

Base URL: `https://datacatalog.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1). The URL, parameters and request / response types shown for a method come from the first version on its `Versions` line; for another version, see the Discovery document of that version under Source in Notes.

### `datacatalog.catalog.search`

- Versions: v1, v1beta1
- `POST https://datacatalog.googleapis.com/v1/catalog:search`
- Searches Data Catalog for multiple resources like entries and tags that match a query. This is a \[Custom Method\] (https://cloud.google.com/apis/design/custom_methods) that doesn't return all information on a resource, only its ID and high level fields. To get more information, you can subsequently call specific get methods. Note: Data Catalog search queries don't guarantee full recall. Results that match your query might not be returned, even in subsequent result pages. Additionally, returned (and not returned) results can vary if you repeat search queries. For more information, see \[Data Catalog search syntax\] (https://cloud.google.com/data-catalog/docs/how-to/search-reference).
- Deprecated: `deprecated: true` in the Discovery document
- Shut down: Data Catalog metadata search has the shutdown date June 1, 2026 on the Data Catalog deprecations page (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19; quoted in Notes), which has passed; for metadata search, the page points to Knowledge Catalog (formerly Dataplex Universal Catalog): https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogV1SearchCatalogRequest`; Response: `GoogleCloudDatacatalogV1SearchCatalogResponse`

### `datacatalog.organizations.locations.retrieveConfig`

- Versions: v1
- `GET https://datacatalog.googleapis.com/v1/{+name}:retrieveConfig`
- Retrieves the configuration related to the migration from Data Catalog to Dataplex Universal Catalog for a specific organization, including all the projects under it which have a separate configuration set.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogV1OrganizationConfig`

### `datacatalog.organizations.locations.retrieveEffectiveConfig`

- Versions: v1
- `GET https://datacatalog.googleapis.com/v1/{+name}:retrieveEffectiveConfig`
- Retrieves the effective configuration related to the migration from Data Catalog to Dataplex Universal Catalog for the organization that `name` names (`organizations/{organization}/locations/{location}`, from the path pattern); for a project, use `datacatalog.projects.locations.retrieveEffectiveConfig`. If there is no specific configuration set for the resource, the setting is checked hierarchically through the ancestors of the resource, starting from the resource itself. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogV1MigrationConfig`

### `datacatalog.organizations.locations.setConfig`

- Versions: v1
- `POST https://datacatalog.googleapis.com/v1/{+name}:setConfig`
- Sets the configuration related to the migration to Dataplex Universal Catalog for the organization that `name` names (`organizations/{organization}/locations/{location}`, from the path pattern); for a project, use `datacatalog.projects.locations.setConfig`. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogV1SetConfigRequest`; Response: `GoogleCloudDatacatalogV1MigrationConfig`

### `datacatalog.projects.locations.operations.cancel`

- Versions: v1
- `POST https://datacatalog.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `datacatalog.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://datacatalog.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `datacatalog.projects.locations.operations.get`

- Versions: v1
- `GET https://datacatalog.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

### `datacatalog.projects.locations.operations.list`

- Versions: v1
- `GET https://datacatalog.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

### `datacatalog.projects.locations.retrieveEffectiveConfig`

- Versions: v1
- `GET https://datacatalog.googleapis.com/v1/{+name}:retrieveEffectiveConfig`
- Retrieves the effective configuration related to the migration from Data Catalog to Dataplex Universal Catalog for the project that `name` names (`projects/{project}/locations/{location}`, from the path pattern); for an organization, use `datacatalog.organizations.locations.retrieveEffectiveConfig`. If there is no specific configuration set for the resource, the setting is checked hierarchically through the ancestors of the resource, starting from the resource itself. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogV1MigrationConfig`

### `datacatalog.projects.locations.setConfig`

- Versions: v1
- `POST https://datacatalog.googleapis.com/v1/{+name}:setConfig`
- Sets the configuration related to the migration to Dataplex Universal Catalog for the project that `name` names (`projects/{project}/locations/{location}`, from the path pattern); for an organization, use `datacatalog.organizations.locations.setConfig`. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogV1SetConfigRequest`; Response: `GoogleCloudDatacatalogV1MigrationConfig`

### `datacatalog.projects.locations.taxonomies.create`

- Versions: v1, v1beta1
- `POST https://datacatalog.googleapis.com/v1/{+parent}/taxonomies`
- Creates a taxonomy in the parent `projects/{projectsId}/locations/{locationsId}`. The taxonomy is initially empty, that is, it doesn't contain policy tags. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogV1Taxonomy`; Response: `GoogleCloudDatacatalogV1Taxonomy`

### `datacatalog.projects.locations.taxonomies.delete`

- Versions: v1, v1beta1
- `DELETE https://datacatalog.googleapis.com/v1/{+name}`
- Deletes a taxonomy, including all policy tags in this taxonomy, their associated policies, and the policy tags references from BigQuery columns.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `datacatalog.projects.locations.taxonomies.export`

- Versions: v1, v1beta1
- `GET https://datacatalog.googleapis.com/v1/{+parent}/taxonomies:export`
- Exports taxonomies in the requested type and returns them, including their policy tags. The requested taxonomies must belong to the same project. This method generates `SerializedTaxonomy` protocol buffers with nested policy tags that can be used as input for `ImportTaxonomies` calls.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogV1ExportTaxonomiesResponse`

### `datacatalog.projects.locations.taxonomies.get`

- Versions: v1, v1beta1
- `GET https://datacatalog.googleapis.com/v1/{+name}`
- Gets a taxonomy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogV1Taxonomy`

### `datacatalog.projects.locations.taxonomies.getIamPolicy`

- Versions: v1, v1beta1
- `POST https://datacatalog.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the IAM policy for a policy tag or a taxonomy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

### `datacatalog.projects.locations.taxonomies.import`

- Versions: v1, v1beta1
- `POST https://datacatalog.googleapis.com/v1/{+parent}/taxonomies:import`
- Creates new taxonomies (including their policy tags) in a given project by importing from inlined or cross-regional sources. For a cross-regional source, new taxonomies are created by copying from a source in another region. For an inlined source, taxonomies and policy tags are created in bulk using nested protocol buffer structures.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogV1ImportTaxonomiesRequest`; Response: `GoogleCloudDatacatalogV1ImportTaxonomiesResponse`

### `datacatalog.projects.locations.taxonomies.list`

- Versions: v1, v1beta1
- `GET https://datacatalog.googleapis.com/v1/{+parent}/taxonomies`
- Lists all taxonomies in a project in a particular location that you have a permission to view.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogV1ListTaxonomiesResponse`

### `datacatalog.projects.locations.taxonomies.patch`

- Versions: v1, v1beta1
- `PATCH https://datacatalog.googleapis.com/v1/{+name}`
- Updates a taxonomy, including its display name, description, and activated policy types.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogV1Taxonomy`; Response: `GoogleCloudDatacatalogV1Taxonomy`

### `datacatalog.projects.locations.taxonomies.policyTags.create`

- Versions: v1, v1beta1
- `POST https://datacatalog.googleapis.com/v1/{+parent}/policyTags`
- Creates a policy tag in a taxonomy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogV1PolicyTag`; Response: `GoogleCloudDatacatalogV1PolicyTag`

### `datacatalog.projects.locations.taxonomies.policyTags.delete`

- Versions: v1, v1beta1
- `DELETE https://datacatalog.googleapis.com/v1/{+name}`
- Deletes a policy tag together with the following: \* All of its descendant policy tags, if any \* Policies associated with the policy tag and its descendants \* References from BigQuery table schema of the policy tag and its descendants
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `datacatalog.projects.locations.taxonomies.policyTags.get`

- Versions: v1, v1beta1
- `GET https://datacatalog.googleapis.com/v1/{+name}`
- Gets a policy tag.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogV1PolicyTag`

### `datacatalog.projects.locations.taxonomies.policyTags.getIamPolicy`

- Versions: v1, v1beta1
- `POST https://datacatalog.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the IAM policy for a policy tag or a taxonomy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

### `datacatalog.projects.locations.taxonomies.policyTags.list`

- Versions: v1, v1beta1
- `GET https://datacatalog.googleapis.com/v1/{+parent}/policyTags`
- Lists all policy tags in a taxonomy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogV1ListPolicyTagsResponse`

### `datacatalog.projects.locations.taxonomies.policyTags.patch`

- Versions: v1, v1beta1
- `PATCH https://datacatalog.googleapis.com/v1/{+name}`
- Updates a policy tag, including its display name, description, and parent policy tag.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogV1PolicyTag`; Response: `GoogleCloudDatacatalogV1PolicyTag`

### `datacatalog.projects.locations.taxonomies.policyTags.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://datacatalog.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the IAM policy for a policy tag or a taxonomy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

### `datacatalog.projects.locations.taxonomies.policyTags.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://datacatalog.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns your permissions on a specified policy tag or taxonomy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

### `datacatalog.projects.locations.taxonomies.replace`

- Versions: v1
- `POST https://datacatalog.googleapis.com/v1/{+name}:replace`
- Replaces (updates) a taxonomy and all its policy tags. The taxonomy and its entire hierarchy of policy tags must be represented literally by `SerializedTaxonomy` and the nested `SerializedPolicyTag` messages. This operation automatically does the following: - Deletes the existing policy tags that are missing from the `SerializedPolicyTag`. - Creates policy tags that don't have resource names. They are considered new. - Updates policy tags with valid resources names accordingly.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogV1ReplaceTaxonomyRequest`; Response: `GoogleCloudDatacatalogV1Taxonomy`

### `datacatalog.projects.locations.taxonomies.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://datacatalog.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the IAM policy for a policy tag or a taxonomy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

### `datacatalog.projects.locations.taxonomies.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://datacatalog.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns your permissions on a specified policy tag or taxonomy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

### Example request line

Generated from the Discovery entry of `datacatalog.projects.locations.operations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values). The request needs an OAuth 2.0 access token in an `Authorization: Bearer` header; the Google Cloud client libraries (the gcp-client-libraries skill) obtain and send it:

```http
GET https://datacatalog.googleapis.com/v1/{+name}
```

## Options / Props

### `datacatalog.organizations.locations.retrieveConfig` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The organization whose config is being retrieved. Format for this method (from its `flatPath`): `organizations/{organizationsId}/locations/{locationsId}`. |

### `datacatalog.organizations.locations.retrieveEffectiveConfig` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The organization whose effective config is being retrieved (`organizations/{organization}/locations/{location}`, from the path pattern). (Corrected from the Discovery document; the original description is quoted in Notes.) |

### `datacatalog.organizations.locations.setConfig` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The organization whose config is being specified (`organizations/{organization}/locations/{location}`, from the path pattern). (Corrected from the Discovery document; the original description is quoted in Notes.) |

### `datacatalog.projects.locations.operations.cancel` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/operations/{operationsId}`. |

### `datacatalog.projects.locations.operations.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/operations/{operationsId}`. |

### `datacatalog.projects.locations.operations.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/operations/{operationsId}`. |

### `datacatalog.projects.locations.operations.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}`. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `name` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. (Corrected from the Discovery document: the text says `parent`; the path variable of this method is `name`.) |

### `datacatalog.projects.locations.retrieveEffectiveConfig` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project whose effective config is being retrieved (`projects/{project}/locations/{location}`, from the path pattern). (Corrected from the Discovery document; the original description is quoted in Notes.) |

### `datacatalog.projects.locations.setConfig` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project whose config is being specified (`projects/{project}/locations/{location}`, from the path pattern). (Corrected from the Discovery document; the original description is quoted in Notes.) |

### `datacatalog.projects.locations.taxonomies.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the project that the taxonomy will belong to. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}`. |

### `datacatalog.projects.locations.taxonomies.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the taxonomy to delete. Note: All policy tags in this taxonomy are also deleted. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}`. |

### `datacatalog.projects.locations.taxonomies.export` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the project that the exported taxonomies belong to. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}`. |
| `serializedTaxonomies` | query | boolean | no | Serialized export taxonomies that contain all the policy tags as nested protocol buffers. |
| `taxonomies` | query | repeated string | yes | Required. Resource names of the taxonomies to export. |

### `datacatalog.projects.locations.taxonomies.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the taxonomy to get. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}`. |

### `datacatalog.projects.locations.taxonomies.getIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}`. |

### `datacatalog.projects.locations.taxonomies.import` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of project that the imported taxonomies will belong to. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}`. |

### `datacatalog.projects.locations.taxonomies.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the project to list the taxonomies of. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}`. |
| `filter` | query | string | no | Supported field for filter is 'service' and value is 'dataplex'. Eg: service=dataplex. |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. Must be a value between 1 and 1000 inclusively. If not set, defaults to 50. |
| `pageToken` | query | string | no | The pagination token of the next results page. If not set, the first page is returned. The token is returned in the response to a previous list request. |

### `datacatalog.projects.locations.taxonomies.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name of this taxonomy in URL format. Note: Policy tag manager generates unique taxonomy IDs. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}`. |
| `updateMask` | query | string (google-fieldmask) | no | Specifies fields to update. If not set, defaults to all fields you can update. For more information, see \[FieldMask\] (https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask). |

### `datacatalog.projects.locations.taxonomies.policyTags.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the taxonomy that the policy tag will belong to. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}`. |

### `datacatalog.projects.locations.taxonomies.policyTags.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the policy tag to delete. Note: All of its descendant policy tags are also deleted. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}/policyTags/{policyTagsId}`. |

### `datacatalog.projects.locations.taxonomies.policyTags.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the policy tag. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}/policyTags/{policyTagsId}`. |

### `datacatalog.projects.locations.taxonomies.policyTags.getIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}/policyTags/{policyTagsId}`. |

### `datacatalog.projects.locations.taxonomies.policyTags.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the taxonomy to list the policy tags of. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}`. |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. Must be a value between 1 and 1000 inclusively. If not set, defaults to 50. |
| `pageToken` | query | string | no | The pagination token of the next results page. If not set, returns the first page. The token is returned in the response to a previous list request. |

### `datacatalog.projects.locations.taxonomies.policyTags.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name of this policy tag in the URL format. The policy tag manager generates unique taxonomy IDs and policy tag IDs. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}/policyTags/{policyTagsId}`. |
| `updateMask` | query | string (google-fieldmask) | no | Specifies the fields to update. You can update only display name, description, and parent policy tag. If not set, defaults to all updatable fields. For more information, see \[FieldMask\] (https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask). |

### `datacatalog.projects.locations.taxonomies.policyTags.setIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}/policyTags/{policyTagsId}`. |

### `datacatalog.projects.locations.taxonomies.policyTags.testIamPermissions` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}/policyTags/{policyTagsId}`. |

### `datacatalog.projects.locations.taxonomies.replace` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the taxonomy to update. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}`. |

### `datacatalog.projects.locations.taxonomies.setIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}`. |

### `datacatalog.projects.locations.taxonomies.testIamPermissions` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/taxonomies/{taxonomiesId}`. |

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `datacatalog` (retrieved 2026-11-14). Resources on this page: catalog, organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof, or when the description says that some requests must specify it (for example, `options.requestedPolicyVersion` must be 3 to get a policy with conditional role bindings). Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Deprecated methods (`deprecated: true` in Discovery): `datacatalog.catalog.search`, `datacatalog.organizations.locations.retrieveConfig`, `datacatalog.organizations.locations.retrieveEffectiveConfig`, `datacatalog.organizations.locations.setConfig`, `datacatalog.projects.locations.retrieveEffectiveConfig`, `datacatalog.projects.locations.setConfig`. Avoid them in new code.
- Corrected from the Discovery document: the description of `datacatalog.projects.locations.taxonomies.create` is "Creates a taxonomy in a specified project. The taxonomy is initially empty, that is, it doesn't contain policy tags.", but the path pattern of `parent` is `^projects/[^/]+/locations/[^/]+$`, so a call covers only that parent; the summary of this method on this page names that parent.
- Deprecated (partly): the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19). The Discovery documents used here (`datacatalog` v1 and v1beta1, retrieved 2026-11-14) contain `catalog.search`, the organization and project config methods, the v1 long-running operations and the Policy Tag Manager methods (taxonomies, policy tags); they contain no entry group, entry, tag or tag template methods, so this skill does not list those (they belong to the shut-down cataloging features).
- Corrected from the Discovery document: the organization and project routes of `retrieveEffectiveConfig` and `setConfig` share the descriptions "Retrieves the effective configuration related to the migration from Data Catalog to Dataplex Universal Catalog for a specific organization or project. If there is no specific configuration set for the resource, the setting is checked hierarchicahlly through the ancestors of the resource, starting from the resource itself." and "Sets the configuration related to the migration to Dataplex Universal Catalog for an organization or project.", and the `name` descriptions "Required. The resource whose effective config is being retrieved." and "Required. The organization or project whose config is being specified."; each route takes only the resource of its path pattern (`^organizations/[^/]+/locations/[^/]+$` or `^projects/[^/]+/locations/[^/]+$`), so the summaries and tables name that resource and point to the other route.
- Source: https://datacatalog.googleapis.com/$discovery/rest?version=v1, https://datacatalog.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

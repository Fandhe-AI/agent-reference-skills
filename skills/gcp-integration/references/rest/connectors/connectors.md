---
source: https://connectors.googleapis.com/$discovery/rest?version=v2
---

# Connectors API REST API (connectors)

## Signature / Usage

Base URL: `https://connectors.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `connectors.projects.locations.connections.actions.execute`

- Versions: v2
- `POST https://connectors.googleapis.com/v2/{+name}:execute`
- Executes an action with the name specified in the request. The input parameters for executing the action are passed through the body of the ExecuteAction request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExecuteActionRequest`; Response: `ExecuteActionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Action. Format: projects/{project}/locations/{location}/connections/{connection}/actions/{action} |

### `connectors.projects.locations.connections.actions.get`

- Versions: v2
- `GET https://connectors.googleapis.com/v2/{+name}`
- Gets the schema of the given action.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Action`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Action. Format: projects/{project}/locations/{location}/connections/{connection}/actions/{action} |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |
| `view` | query | string enum | no | Specified view of the action schema. Values: `ACTION_SCHEMA_VIEW_UNSPECIFIED`, `ACTION_SCHEMA_VIEW_BASIC`, `ACTION_SCHEMA_VIEW_ENRICHED`. |

### `connectors.projects.locations.connections.actions.list`

- Versions: v2
- `GET https://connectors.googleapis.com/v2/{+parent}/actions`
- Gets the schema of all the actions supported by the connector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListActionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource name of the Action. Format: projects/{project}/locations/{location}/connections/{connection} |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |
| `pageSize` | query | integer (int32) | no | Number of Actions to return. Defaults to 25. |
| `pageToken` | query | string | no | Page token, return from a previous ListActions call, that can be used retrieve the next page of content. If unspecified, the request returns the first page of actions. |
| `view` | query | string enum | no | Specifies which fields of the Action are returned in the response. Values: `ACTION_VIEW_UNSPECIFIED`, `ACTION_VIEW_BASIC`, `ACTION_VIEW_FULL`. |

### `connectors.projects.locations.connections.checkReadiness`

- Versions: v2
- `GET https://connectors.googleapis.com/v2/{+name}:checkReadiness`
- Reports readiness status of the connector. Similar logic to GetStatus but modified for kubernetes health check to understand.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CheckReadinessResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `connectors.projects.locations.connections.checkStatus`

- Versions: v2
- `GET https://connectors.googleapis.com/v2/{+name}:checkStatus`
- Reports the status of the connection. Note that when the connection is in a state that is not ACTIVE, the implementation of this RPC method must return a Status with the corresponding State instead of returning a gRPC status code that is not "OK", which indicates that ConnectionStatus itself, not the connection, failed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CheckStatusResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |

### `connectors.projects.locations.connections.connectionSchemaMetadata.getAction`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}:getAction`
- Get action.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name format: projects/{project}/locations/{location}/connections/{connection}/connectionSchemaMetadata |
| `actionId` | query | string | yes | Required. Id of the action. |

### `connectors.projects.locations.connections.connectionSchemaMetadata.getEntityType`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}:getEntityType`
- Get entity type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name format: projects/{project}/locations/{location}/connections/{connection}/connectionSchemaMetadata |
| `entityId` | query | string | yes | Required. Id of the entity type. |

### `connectors.projects.locations.connections.connectionSchemaMetadata.listActions`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}:listActions`
- List actions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListActionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name format. projects/{project}/locations/{location}/connections/{connection}/connectionSchemaMetadata |
| `filter` | query | string | yes | Required. Filter Wildcards are not supported in the filter currently. |
| `pageSize` | query | integer (int32) | no | Page size. If unspecified, at most 50 actions will be returned. |
| `pageToken` | query | string | no | Page token. |
| `view` | query | string enum | no | Specifies which fields are returned in response. Defaults to BASIC view. Values: `VIEW_UNSPECIFIED`, `BASIC`. |

### `connectors.projects.locations.connections.connectionSchemaMetadata.listEntityTypes`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}:listEntityTypes`
- List entity types.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEntityTypesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name format: projects/{project}/locations/{location}/connections/{connection}/connectionSchemaMetadata |
| `filter` | query | string | yes | Required. Filter Wildcards are not supported in the filter currently. |
| `pageSize` | query | integer (int32) | no | Page size. If unspecified, at most 50 entity types will be returned. |
| `pageToken` | query | string | no | Page token. |
| `view` | query | string enum | no | Specifies which fields are returned in response. Defaults to BASIC view. Values: `VIEW_UNSPECIFIED`, `BASIC`. |

### `connectors.projects.locations.connections.connectionSchemaMetadata.refresh`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+name}:refresh`
- Refresh runtime schema of a connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RefreshConnectionSchemaMetadataRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name. Format: projects/{project}/locations/{location}/connections/{connection}/connectionSchemaMetadata |

### `connectors.projects.locations.connections.create`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+parent}/connections`
- Creates a new Connection in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Connection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the Connection, of the form: `projects/*/locations/*` |
| `connectionId` | query | string | yes | Required. Identifier to assign to the Connection. Must be unique within scope of the parent resource. |

### `connectors.projects.locations.connections.delete`

- Versions: v1
- `DELETE https://connectors.googleapis.com/v1/{+name}`
- Deletes a single Connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/connections/*` |
| `force` | query | boolean | no | Optional. If set to true, any child EndUserAuthentication/EventSubscription resources will also be deleted. Otherwise, the request will fail if the connection has any children. Followed the best practice from https://aip.dev/135#cascading-delete |

### `connectors.projects.locations.connections.endUserAuthentications.create`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+parent}/endUserAuthentications`
- Creates a new EndUserAuthentication in a given project,location and connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EndUserAuthentication`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the EndUserAuthentication, of the form: `projects/*/locations/*/connections/*` |
| `endUserAuthenticationId` | query | string | yes | Required. Identifier to assign to the EndUserAuthentication. Must be unique within scope of the parent resource. |

### `connectors.projects.locations.connections.endUserAuthentications.delete`

- Versions: v1
- `DELETE https://connectors.googleapis.com/v1/{+name}`
- Deletes a single EndUserAuthentication.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/connections/*/endUserAuthentication/*` |

### `connectors.projects.locations.connections.endUserAuthentications.get`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets details of a single EndUserAuthentication.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `EndUserAuthentication`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/connections/*/EndUserAuthentications/*` |
| `view` | query | string enum | no | Optional. View of the EndUserAuthentication to return. Values: `END_USER_AUTHENTICATION_VIEW_UNSPECIFIED`, `BASIC_VIEW`, `FULL_VIEW`. |

### `connectors.projects.locations.connections.endUserAuthentications.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+parent}/endUserAuthentications`
- List EndUserAuthentications in a given project,location and connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEndUserAuthenticationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the EndUserAuthentication, of the form: `projects/*/locations/*/connections/*` |
| `filter` | query | string | no | Filter. |
| `orderBy` | query | string | no | Order by parameters. |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |

### `connectors.projects.locations.connections.endUserAuthentications.patch`

- Versions: v1
- `PATCH https://connectors.googleapis.com/v1/{+name}`
- Updates the parameters of a single EndUserAuthentication.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EndUserAuthentication`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. Resource name of the EndUserAuthentication. Format: projects/{project}/locations/{location}/connections/{connection}/endUserAuthentications/{end_user_authentication} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. A field will be overwritten if it is in the mask. You can modify only the fields listed below. To update the EndUserAuthentication details: \* `notify_endpoint_destination` |

### `connectors.projects.locations.connections.entityTypes.entities.create`

- Versions: v2
- `POST https://connectors.googleapis.com/v2/{+parent}/entities`
- Creates a new entity row of the specified entity type in the external system. The field values for creating the row are contained in the body of the request. The response message contains a `Entity` message object returned as a response by the external system.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Entity`; Response: `Entity`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type} |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |

### `connectors.projects.locations.connections.entityTypes.entities.delete`

- Versions: v2
- `DELETE https://connectors.googleapis.com/v2/{+name}`
- Deletes an existing entity row matching the entity type and entity id specified in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}/entities/{id} |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |

### `connectors.projects.locations.connections.entityTypes.entities.deleteEntitiesWithConditions`

- Versions: v2
- `POST https://connectors.googleapis.com/v2/{+entityType}/entities:deleteEntitiesWithConditions`
- Deletes entities based on conditions specified in the request and not on entity id.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `entityType` | path | string | yes | Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type} |
| `conditions` | query | string | yes | Required. Conditions to be used when deleting entities. From a proto standpoint, There are no restrictions on what can be passed using this field. The connector documentation should have information about what format of filters/conditions are supported. Note: If this conditions field is left empty, an exception is thrown. We don't want to consider 'empty conditions' to be a match-all case. Connector developers can determine and document what a match-all case constraint would be. |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |

### `connectors.projects.locations.connections.entityTypes.entities.get`

- Versions: v2
- `GET https://connectors.googleapis.com/v2/{+name}`
- Gets a single entity row matching the entity type and entity id specified in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Entity`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}/entities/{id} |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |

### `connectors.projects.locations.connections.entityTypes.entities.list`

- Versions: v2
- `GET https://connectors.googleapis.com/v2/{+parent}/entities`
- Lists entity rows of a particular entity type contained in the request. Note: 1. Currently, only max of one 'sort_by' column is supported. 2. If no 'sort_by' column is provided, the primary key of the table is used. If zero or more than one primary key is available, we default to the unpaginated list entities logic which only returns the first page. 3. The values of the 'sort_by' columns must uniquely identify an entity row, otherwise undefined behaviors may be observed during pagination. 4. Since transactions are not supported, any updates, inserts or deletes during pagination can lead to stale data being returned or other unexpected behaviors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEntitiesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type} |
| `conditions` | query | string | no | Conditions to be used when listing entities. From a proto standpoint, There are no restrictions on what can be passed using this field. The connector documentation should have information about what format of filters/conditions are supported. |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |
| `pageSize` | query | integer (int32) | no | Number of entity rows to return. Defaults page size = 25. Max page size = 200. |
| `pageToken` | query | string | no | Page token value if available from a previous request. |
| `sortBy` | query | repeated string | no | List of 'sort_by' columns to use when returning the results. |
| `sortOrder` | query | repeated string | no | List of 'sort_order' columns to use when returning the results. |

### `connectors.projects.locations.connections.entityTypes.entities.patch`

- Versions: v2
- `PATCH https://connectors.googleapis.com/v2/{+name}`
- Updates an existing entity row matching the entity type and entity id specified in the request. The fields in the entity row that need to be modified are contained in the body of the request. All unspecified fields are left unchanged. The response message contains a `Entity` message object returned as a response by the external system.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Entity`; Response: `Entity`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Resource name of the Entity. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}/entities/{id} |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |

### `connectors.projects.locations.connections.entityTypes.entities.updateEntitiesWithConditions`

- Versions: v2
- `POST https://connectors.googleapis.com/v2/{+entityType}/entities:updateEntitiesWithConditions`
- Updates entities based on conditions specified in the request and not on entity id.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Entity`; Response: `UpdateEntitiesWithConditionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `entityType` | path | string | yes | Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type} |
| `conditions` | query | string | yes | Required. Conditions to be used when updating entities. From a proto standpoint, There are no restrictions on what can be passed using this field. The connector documentation should have information about what format of filters/conditions are supported. Note: If this conditions field is left empty, an exception is thrown. We don't want to consider 'empty conditions' to be a match-all case. Connector developers can determine and document what a match-all case constraint would be. |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |

### `connectors.projects.locations.connections.entityTypes.get`

- Versions: v2
- `GET https://connectors.googleapis.com/v2/{+name}`
- Gets metadata of given entity type
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `EntityType`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{entityType} |
| `contextMetadata` | query | string | no | Context metadata for request could be used to fetch customization of entity type schema. |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |
| `view` | query | string enum | no | Specifies view for entity type schema. Values: `ENTITY_TYPE_SCHEMA_VIEW_UNSPECIFIED`, `ENTITY_TYPE_SCHEMA_VIEW_BASIC`, `ENTITY_TYPE_SCHEMA_VIEW_ENRICHED`. |

### `connectors.projects.locations.connections.entityTypes.list`

- Versions: v2
- `GET https://connectors.googleapis.com/v2/{+parent}/entityTypes`
- Lists metadata related to all entity types present in the external system.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEntityTypesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection} |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |
| `pageSize` | query | integer (int32) | no | Number of entity types to return. Defaults to 25. |
| `pageToken` | query | string | no | Page token, return from a previous ListEntityTypes call, that can be used retrieve the next page of content. If unspecified, the request returns the first page of entity types. |
| `view` | query | string enum | no | Specifies which fields of the Entity Type are returned in the response. Values: `ENTITY_TYPE_VIEW_UNSPECIFIED`, `ENTITY_TYPE_VIEW_BASIC`, `ENTITY_TYPE_VIEW_FULL`. |

### `connectors.projects.locations.connections.eventSubscriptions.create`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+parent}/eventSubscriptions`
- Creates a new EventSubscription in a given project,location and connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EventSubscription`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the EventSubscription, of the form: `projects/*/locations/*/connections/*` |
| `eventSubscriptionId` | query | string | yes | Required. Identifier to assign to the Event Subscription. Must be unique within scope of the parent resource. |

### `connectors.projects.locations.connections.eventSubscriptions.delete`

- Versions: v1
- `DELETE https://connectors.googleapis.com/v1/{+name}`
- Deletes a single EventSubscription.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/connections/*/eventsubscriptions/*` |

### `connectors.projects.locations.connections.eventSubscriptions.get`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets details of a single EventSubscription.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `EventSubscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/connections/*/eventSubscriptions/*` |

### `connectors.projects.locations.connections.eventSubscriptions.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+parent}/eventSubscriptions`
- List EventSubscriptions in a given project,location and connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEventSubscriptionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the EventSubscription, of the form: `projects/*/locations/*/connections/*` |
| `filter` | query | string | no | Filter. |
| `orderBy` | query | string | no | Order by parameters. |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |

### `connectors.projects.locations.connections.eventSubscriptions.patch`

- Versions: v1
- `PATCH https://connectors.googleapis.com/v1/{+name}`
- Updates the parameters of a single EventSubscription.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EventSubscription`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. Resource name of the EventSubscription. Format: projects/{project}/locations/{location}/connections/{connection}/eventSubscriptions/{event_subscription} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. Fields are specified relative to the Subscription. A field will be overwritten if it is in the mask. You can modify only the fields listed below. To update the EventSubscription details: \* `serviceAccount` |

### `connectors.projects.locations.connections.eventSubscriptions.retry`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+name}:retry`
- RetryEventSubscription retries the registration of Subscription.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RetryEventSubscriptionRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/connections/*/eventSubscriptions/*` |

### `connectors.projects.locations.connections.exchangeAuthCode`

- Versions: v2
- `POST https://connectors.googleapis.com/v2/{+name}:exchangeAuthCode`
- ExchangeAuthCode exchanges the OAuth authorization code (and other necessary data) for an access token (and associated credentials).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExchangeAuthCodeRequest`; Response: `ExchangeAuthCodeResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `connectors.projects.locations.connections.executeHttpRequest`

- Versions: v2
- `POST https://connectors.googleapis.com/v2/{+name}:executeHttpRequest`
- Executes a generic HTTP request. This supports all payload formats including REST/JSON, GraphQL, XML, SOAP, and Multipart by passing the rendered payload as raw bytes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExecuteHttpRequestRequest`; Response: `ExecuteHttpRequestResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} |

### `connectors.projects.locations.connections.executeSqlQuery`

- Versions: v2
- `POST https://connectors.googleapis.com/v2/{+connection}:executeSqlQuery`
- Executes a SQL statement specified in the body of the request. An example of this SQL statement in the case of Salesforce connector would be 'select \* from Account a, Order o where a.Id = o.AccountId'.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExecuteSqlQueryRequest`; Response: `ExecuteSqlQueryResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `connection` | path | string | yes | Required. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} |

### `connectors.projects.locations.connections.fetchToolspecOverride`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+name}:fetchToolspecOverride`
- Fetches Toolspec Override for a connection for the given list of tools. Returns results from the db if the tool is already present.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FetchConnectionToolspecOverrideRequest`; Response: `FetchConnectionToolspecOverrideResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name format: projects/{project}/locations/{location}/connections/{connection} |

### `connectors.projects.locations.connections.generateConnectionToolspecOverride`

- Versions: v2
- `POST https://connectors.googleapis.com/v2/{+name}:generateConnectionToolspecOverride`
- Generate toolspec override for the given list of toolNames.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateCustomToolspecRequest`; Response: `GenerateCustomToolspecResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} |

### `connectors.projects.locations.connections.generateToolspecOverride`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+name}:generateToolspecOverride`
- Generates Toolspec Override for a connection for the given list of entityTypes and operations. Returns results from the db if the entityType and operation are already present.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateConnectionToolspecOverrideRequest`; Response: `GenerateConnectionToolspecOverrideResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name format: projects/{project}/locations/{location}/connections/{connection} |

### `connectors.projects.locations.connections.get`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets details of a single Connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Connection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/connections/*` |
| `view` | query | string enum | no | Specifies which fields of the Connection are returned in the response. Defaults to `BASIC` view. Values: `CONNECTION_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `connectors.projects.locations.connections.getConnectionSchemaMetadata`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets schema metadata of a connection. SchemaMetadata is a singleton resource for each connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ConnectionSchemaMetadata`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Connection name Format: projects/{project}/locations/{location}/connections/{connection}/connectionSchemaMetadata |

### `connectors.projects.locations.connections.getIamPolicy`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `connectors.projects.locations.connections.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+parent}/connections`
- Lists Connections in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the Connection, of the form: `projects/*/locations/*` |
| `filter` | query | string | no | Filter. |
| `orderBy` | query | string | no | Order by parameters. |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |
| `view` | query | string enum | no | Specifies which fields of the Connection are returned in the response. Defaults to `BASIC` view. Values: `CONNECTION_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `connectors.projects.locations.connections.listCustomToolNames`

- Versions: v2
- `GET https://connectors.googleapis.com/v2/{+name}:listCustomToolNames`
- Lists custom tool names.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCustomToolNamesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} |

### `connectors.projects.locations.connections.listenEvent`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+resourcePath}:listenEvent`
- ListenEvent listens to the event.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ListenEventRequest`; Response: `ListenEventResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resourcePath` | path | string | yes | Required. Resource path for request. |

### `connectors.projects.locations.connections.modifyToolspecOverride`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+name}:modifyToolspecOverride`
- Updates Toolspec Override for a connection with the admin provided descriptions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ModifyConnectionToolspecOverrideRequest`; Response: `ModifyConnectionToolspecOverrideResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name format: projects/{project}/locations/{location}/connections/{connection} |

### `connectors.projects.locations.connections.patch`

- Versions: v1
- `PATCH https://connectors.googleapis.com/v1/{+name}`
- Updates the parameters of a single Connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Connection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. Fields are specified relative to the connection. A field will be overwritten if it is in the mask. The field mask must not be empty, and it must not contain fields that are immutable or only set by the server. You can modify only the fields listed below. To lock/unlock a connection: \* `lock_config` To suspend/resume a connection: \* `suspended` To update the connection details: \* `description` \* `labels` \* `connector_version` \* `config_variables` \* `auth_config` \* `destination_configs` \* `node_config` \* `log_config` \* `ssl_config` \* `eventing_enablement_type` \* `eventing_config` \* `auth_override_enabled` \* `async_operations_enabled` |

### `connectors.projects.locations.connections.refreshAccessToken`

- Versions: v2
- `POST https://connectors.googleapis.com/v2/{+name}:refreshAccessToken`
- RefreshAccessToken exchanges the OAuth refresh token (and other necessary data) for a new access token (and new associated credentials).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RefreshAccessTokenRequest`; Response: `RefreshAccessTokenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |

### `connectors.projects.locations.connections.removeToolspecOverride`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+name}:removeToolspecOverride`
- Deletes all Toolspec Override for a connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RemoveConnectionToolspecOverrideRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name format: projects/{project}/locations/{location}/connections/{connection} |

### `connectors.projects.locations.connections.repairEventing`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+name}:repairEventing`
- RepaiEventing tries to repair eventing related event subscriptions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RepairEventingRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/connections/*` |

### `connectors.projects.locations.connections.resources.get`

- Versions: v2
- `GET https://connectors.googleapis.com/v2/{+name}`
- Gets a specific resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GetResourceResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Resource. Format: projects/{project}/locations/{location}/connections/{connection}/resources/{resource} |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |

### `connectors.projects.locations.connections.resources.getResourcePost`

- Versions: v2
- `POST https://connectors.googleapis.com/v2/{+name}`
- Gets a specific resource with POST.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetResourcePostRequest`; Response: `GetResourceResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Resource. Format: projects/{project}/locations/{location}/connections/{connection}/resources/{resource} |

### `connectors.projects.locations.connections.resources.list`

- Versions: v2
- `GET https://connectors.googleapis.com/v2/{+parent}/resources`
- Lists all available resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the connection. Format: projects/{project}/locations/{location}/connections/{connection} |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |
| `pageSize` | query | integer (int32) | no | Optional. Page size for the request. |
| `pageToken` | query | string | no | Optional. Page token for the request. |

### `connectors.projects.locations.connections.runtimeActionSchemas.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+parent}/runtimeActionSchemas`
- List schema of a runtime actions filtered by action name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRuntimeActionSchemasResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of RuntimeActionSchema Format: projects/{project}/locations/{location}/connections/{connection} |
| `filter` | query | string | yes | Required. Filter Format: action="{actionId}" Only action field is supported with literal equality operator. Accepted filter example: action="CancelOrder" Wildcards are not supported in the filter currently. |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |
| `schemaAsString` | query | boolean | no | Optional. Flag to indicate if schema should be returned as string or not |

### `connectors.projects.locations.connections.runtimeEntitySchemas.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+parent}/runtimeEntitySchemas`
- List schema of a runtime entities filtered by entity name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRuntimeEntitySchemasResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of RuntimeEntitySchema Format: projects/{project}/locations/{location}/connections/{connection} |
| `filter` | query | string | yes | Required. Filter Format: entity="{entityId}" Only entity field is supported with literal equality operator. Accepted filter example: entity="Order" Wildcards are not supported in the filter currently. |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |

### `connectors.projects.locations.connections.search`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}:search`
- Returns Top matching Connections for a given query.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Parent resource of the Connection, of the form: `projects/*/locations/*/connections` |
| `pageSize` | query | integer (int32) | no | Optional. The number of top matching connectors to return |
| `pageToken` | query | string | no | Optional. page_token |
| `query` | query | string | yes | Required. The query against which the search needs to be done. |

### `connectors.projects.locations.connections.setIamPolicy`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `connectors.projects.locations.connections.testIamPermissions`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `connectors.projects.locations.connections.tools`

- Versions: v2
- `POST https://connectors.googleapis.com/v2/{+parent}/tools`
- Lists all available tools with POST.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ListToolsPostRequest`; Response: `ListToolsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} |

### `connectors.projects.locations.connections.tools.execute`

- Versions: v2
- `POST https://connectors.googleapis.com/v2/{+name}:execute`
- Executes a specific tool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExecuteToolRequest`; Response: `ExecuteToolResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Tool. Format: projects/{project}/locations/{location}/connections/{connection}/tools/{tool} |

### `connectors.projects.locations.connections.tools.list`

- Versions: v2
- `GET https://connectors.googleapis.com/v2/{+parent}/tools`
- Lists all available tools.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListToolsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} |
| `executionConfig.headers` | query | string | no | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |
| `toolNames` | query | repeated string | no | List of tool names for selective tool fetching. |

### `connectors.projects.locations.customConnectors.customConnectorVersions.delete`

- Versions: v1
- `DELETE https://connectors.googleapis.com/v1/{+name}`
- Deletes a single CustomConnectorVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/{project}/locations/{location}/customConnectors/{custom_connector}/customConnectorVersions/{custom_connector_version}` |

### `connectors.projects.locations.customConnectors.customConnectorVersions.deprecate`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+name}:deprecate`
- Deprecates a single CustomConnectorVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeprecateCustomConnectorVersionRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/{project}/locations/{location}/customConnectors/{custom_connector}/customConnectorVersions/{custom_connector_version}` |

### `connectors.projects.locations.customConnectors.customConnectorVersions.publish`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+name}:publish`
- Publish request for the CustomConnectorVersion. Once approved, the CustomConnectorVersion will be published as PartnerConnector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PublishCustomConnectorVersionRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/{project}/locations/{location}/customConnectors/{custom_connector}/customConnectorVersions/{custom_connector_version}` |

### `connectors.projects.locations.customConnectors.customConnectorVersions.withdraw`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+name}:withdraw`
- Withdraw the publish request for the CustomConnectorVersion. This can only be used before the CustomConnectorVersion is published.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `WithdrawCustomConnectorVersionRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/{project}/locations/{location}/customConnectors/{custom_connector}/customConnectorVersions/{custom_connector_version}` |

### `connectors.projects.locations.customConnectors.validateCustomConnectorSpec`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+parent}/customConnectors:validateCustomConnectorSpec`
- Validates a Custom Connector Spec.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ValidateCustomConnectorSpecRequest`; Response: `ValidateCustomConnectorSpecResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Location at which the custom connector is being created. |

### `connectors.projects.locations.endpointAttachments.create`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+parent}/endpointAttachments`
- Creates a new EndpointAttachment in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EndpointAttachment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the EndpointAttachment, of the form: `projects/*/locations/*` |
| `endpointAttachmentId` | query | string | yes | Required. Identifier to assign to the EndpointAttachment. Must be unique within scope of the parent resource. The regex is: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. |

### `connectors.projects.locations.endpointAttachments.delete`

- Versions: v1
- `DELETE https://connectors.googleapis.com/v1/{+name}`
- Deletes a single EndpointAttachment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/endpointAttachments/*` |

### `connectors.projects.locations.endpointAttachments.get`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets details of a single EndpointAttachment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `EndpointAttachment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/endpointAttachments/*` |
| `view` | query | string enum | no | Optional. Specifies which fields of the EndpointAttachment are returned in the response. Defaults to `ENDPOINT_ATTACHMENT_VIEW_BASIC` view. Values: `ENDPOINT_ATTACHMENT_VIEW_UNSPECIFIED`, `ENDPOINT_ATTACHMENT_VIEW_BASIC`, `ENDPOINT_ATTACHMENT_VIEW_FULL`. |

### `connectors.projects.locations.endpointAttachments.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+parent}/endpointAttachments`
- List EndpointAttachments in a given project
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEndpointAttachmentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource od the EndpointAttachment, of the form: `projects/*/locations/*` |
| `filter` | query | string | no | Filter. |
| `orderBy` | query | string | no | Order by parameters. |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |
| `view` | query | string enum | no | Optional. Specifies which fields of the EndpointAttachment are returned in the response. Defaults to `ENDPOINT_ATTACHMENT_VIEW_BASIC` view. Values: `ENDPOINT_ATTACHMENT_VIEW_UNSPECIFIED`, `ENDPOINT_ATTACHMENT_VIEW_BASIC`, `ENDPOINT_ATTACHMENT_VIEW_FULL`. |

### `connectors.projects.locations.endpointAttachments.patch`

- Versions: v1
- `PATCH https://connectors.googleapis.com/v1/{+name}`
- Updates the parameters of a single EndpointAttachment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EndpointAttachment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Resource name of the Endpoint Attachment. Format: projects/{project}/locations/{location}/endpointAttachments/{endpoint_attachment} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. Fields are specified relative to the endpointAttachment. A field will be overwritten if it is in the mask. You can modify only the fields listed below. To update the endpointAttachment details: \* `description` \* `labels` |

### `connectors.projects.locations.get`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `connectors.projects.locations.getRegionalSettings`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- GetRegionalSettings gets settings of a region. RegionalSettings is a singleton resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RegionalSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Regional Settings. |

### `connectors.projects.locations.getRuntimeConfig`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets the runtimeConfig of a location. RuntimeConfig is a singleton resource for each location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RuntimeConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/runtimeConfig` |

### `connectors.projects.locations.global.customConnectors.create`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+parent}/customConnectors`
- Creates a new CustomConnector in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CustomConnector`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the CreateCustomConnector, of the form: `projects/{project}/locations/*` |
| `customConnectorId` | query | string | yes | Required. Identifier to assign to the CreateCustomConnector. Must be unique within scope of the parent resource. |

### `connectors.projects.locations.global.customConnectors.customConnectorVersions.create`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+parent}/customConnectorVersions`
- Creates a new CustomConnectorVersion in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CustomConnectorVersion`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the CreateCustomConnector, of the form: `projects/{project}/locations/{location}/customConnectors/{custom_connector}` |
| `customConnectorVersionId` | query | string | yes | Required. Identifier to assign to the CreateCustomConnectorVersion. Must be unique within scope of the parent resource. |

### `connectors.projects.locations.global.customConnectors.customConnectorVersions.get`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets details of a single CustomConnectorVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CustomConnectorVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/{location}/customConnectors/*/customConnectorVersions/*` |

### `connectors.projects.locations.global.customConnectors.customConnectorVersions.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+parent}/customConnectorVersions`
- List CustomConnectorVersions in a given project
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCustomConnectorVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the connectors, of the form: `projects/*/locations/{location}/customConnectors/*/customConnectorVersions/*` |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |

### `connectors.projects.locations.global.customConnectors.delete`

- Versions: v1
- `DELETE https://connectors.googleapis.com/v1/{+name}`
- Deletes a single CustomConnector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/{project}/locations/{location}/customConnectors/{connector}` |
| `force` | query | boolean | no | Optional. If set to true, any customConnectorVersion which is a child resource will also be deleted. https://aip.dev/135#cascading-delete |

### `connectors.projects.locations.global.customConnectors.get`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets details of a single CustomConnector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CustomConnector`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/customConnectors/*` |

### `connectors.projects.locations.global.customConnectors.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+parent}/customConnectors`
- List CustomConnectorVersions in a given project
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCustomConnectorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the custom connectors, of the form: `projects/*/locations/*` Only global location is supported for CustomConnector resource. |
| `filter` | query | string | no | Filter string. |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |

### `connectors.projects.locations.global.customConnectors.patch`

- Versions: v1
- `PATCH https://connectors.googleapis.com/v1/{+name}`
- Updates the parameters of a CustomConnector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CustomConnector`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name of the CustomConnector. Format: projects/{project}/locations/{location}/customConnectors/{connector} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the Connector resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. Set the mask as "\*" for full replacement, which means all fields will be overwritten. |

### `connectors.projects.locations.global.getSettings`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- GetGlobalSettings gets settings of a project. GlobalSettings is a singleton resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Settings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Settings. |

### `connectors.projects.locations.global.managedZones.create`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+parent}/managedZones`
- Creates a new ManagedZone in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ManagedZone`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the ManagedZone, of the form: `projects/*/locations/global` |
| `managedZoneId` | query | string | yes | Required. Identifier to assign to the ManagedZone. Must be unique within scope of the parent resource. |

### `connectors.projects.locations.global.managedZones.delete`

- Versions: v1
- `DELETE https://connectors.googleapis.com/v1/{+name}`
- Deletes a single ManagedZone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/global/managedZones/*` |

### `connectors.projects.locations.global.managedZones.get`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets details of a single ManagedZone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ManagedZone`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/global/managedZones/*` |

### `connectors.projects.locations.global.managedZones.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+parent}/managedZones`
- List ManagedZones in a given project
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListManagedZonesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the Managed Zone, of the form: `projects/*/locations/global` |
| `filter` | query | string | no | Filter. |
| `orderBy` | query | string | no | Order by parameters. |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |
| `returnPartialSuccess` | query | boolean | no | Optional. If true, allow partial responses for multi-regional Aggregated List requests. |

### `connectors.projects.locations.global.managedZones.patch`

- Versions: v1
- `PATCH https://connectors.googleapis.com/v1/{+name}`
- Updates the parameters of a single ManagedZone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ManagedZone`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Resource name of the Managed Zone. Format: projects/{project}/locations/global/managedZones/{managed_zone} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. Fields are specified relative to the managedZone. A field will be overwritten if it is in the mask. You can modify only the fields listed below. To update the managedZone details: \* `description` \* `labels` \* `target_project` \* `target_network` |

### `connectors.projects.locations.global.updateSettings`

- Versions: v1
- `PATCH https://connectors.googleapis.com/v1/{+name}`
- Update the global settings of a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Settings`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Resource name of the Connection. Format: projects/{project}/locations/global/settings} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. |

### `connectors.projects.locations.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `connectors.projects.locations.operations.cancel`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `connectors.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://connectors.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `connectors.projects.locations.operations.get`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `connectors.projects.locations.operations.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `connectors.projects.locations.providers.connectors.get`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets details of a single Connector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Connector`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/providers/*/connectors/*` Only global location is supported for Connector resource. |

### `connectors.projects.locations.providers.connectors.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+parent}/connectors`
- Lists Connectors in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConnectorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the connectors, of the form: `projects/*/locations/*/providers/*` Only global location is supported for Connector resource. |
| `filter` | query | string | no | Filter string. |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |

### `connectors.projects.locations.providers.connectors.versions.eventtypes.get`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets details of a single event type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `EventType`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/providers/*/connectors/*/versions/*/eventtypes/*` Only global location is supported for EventType resource. |

### `connectors.projects.locations.providers.connectors.versions.eventtypes.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+parent}/eventtypes`
- Lists Event Types in a given Connector Version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEventTypesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the connectors, of the form: `projects/*/locations/*/providers/*/connectors/*/versions/*` Only global location is supported for EventType resource. |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |

### `connectors.projects.locations.providers.connectors.versions.fetchAuthSchema`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}:fetchAuthSchema`
- fetch and return the list of auth config variables required to override the connection backend auth.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchAuthSchemaResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Parent resource of the Connector Version, of the form: `projects/*/locations/*/providers/*/connectors/*/versions/*` |
| `view` | query | string enum | no | Optional. View of the AuthSchema. The default value is BASIC. Values: `AUTH_SCHEMA_VIEW_UNSPECIFIED`, `BASIC`, `JSON_SCHEMA`, `EUA_SCHEMA`. |

### `connectors.projects.locations.providers.connectors.versions.get`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets details of a single connector version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ConnectorVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/providers/*/connectors/*/versions/*` Only global location is supported for ConnectorVersion resource. |
| `view` | query | string enum | no | Specifies which fields of the ConnectorVersion are returned in the response. Defaults to `CUSTOMER` view. Values: `CONNECTOR_VERSION_VIEW_UNSPECIFIED`, `CONNECTOR_VERSION_VIEW_BASIC`, `CONNECTOR_VERSION_VIEW_FULL`. |

### `connectors.projects.locations.providers.connectors.versions.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+parent}/versions`
- Lists Connector Versions in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConnectorVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |
| `view` | query | string enum | no | Specifies which fields of the ConnectorVersion are returned in the response. Defaults to `BASIC` view. Values: `CONNECTOR_VERSION_VIEW_UNSPECIFIED`, `CONNECTOR_VERSION_VIEW_BASIC`, `CONNECTOR_VERSION_VIEW_FULL`. |

### `connectors.projects.locations.providers.get`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+name}`
- Gets details of a provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Provider`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the form: `projects/*/locations/*/providers/*` Only global location is supported for Provider resource. |

### `connectors.projects.locations.providers.getIamPolicy`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `connectors.projects.locations.providers.list`

- Versions: v1
- `GET https://connectors.googleapis.com/v1/{+parent}/providers`
- Lists Providers in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListProvidersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource of the API, of the form: `projects/*/locations/*` Only global location is supported for Provider resource. |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |

### `connectors.projects.locations.providers.setIamPolicy`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `connectors.projects.locations.providers.testIamPermissions`

- Versions: v1
- `POST https://connectors.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `connectors.projects.locations.updateRegionalSettings`

- Versions: v1
- `PATCH https://connectors.googleapis.com/v1/{+name}`
- Update the settings of a region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RegionalSettings`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Resource name of the Connection. Format: projects/{project}/locations/{location}/regionalSettings |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. |

### Example request skeleton

Generated from the Discovery entry of `connectors.projects.locations.connections.actions.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://connectors.googleapis.com/v2/{+name}"
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `connectors` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Methods whose description mentions deprecation (this can be about the method itself or about the deprecation status of the resources it handles, such as deprecated images; these methods are not marked `deprecated: true` in Discovery): `connectors.projects.locations.customConnectors.customConnectorVersions.deprecate`; read the method description above to see which applies and whether it names a replacement.
- Regional endpoints: the Discovery document (`connectors` v2, revision 20260617) also lists 9 endpoints of the form `https://connectors.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://connectors.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://connectors.us-central1.rep.googleapis.com/`) and keep the path.
- Source: https://connectors.googleapis.com/$discovery/rest?version=v2, https://connectors.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

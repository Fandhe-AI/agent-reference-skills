---
source: https://managedkafka.googleapis.com/$discovery/rest?version=v1
---

# Managed Service for Apache Kafka API REST API (managedkafka)

## Signature / Usage

Base URL: `https://managedkafka.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `managedkafka.projects.locations.clusters.acls.addAclEntry`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+acl}:addAclEntry`
- Incremental update: Adds an acl entry to an acl. Creates the acl if it does not exist yet.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AclEntry`; Response: `AddAclEntryResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `acl` | path | string | yes | Required. The name of the acl to add the acl entry to. Structured like: `projects/{project}/locations/{location}/clusters/{cluster}/acls/{acl_id}`. The structure of `acl_id` defines the Resource Pattern (resource_type, resource_name, pattern_type) of the acl. See `Acl.name` for details. |

### `managedkafka.projects.locations.clusters.acls.create`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+parent}/acls`
- Creates a new acl in the given project, location, and cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Acl`; Response: `Acl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent cluster in which to create the acl. Structured like `projects/{project}/locations/{location}/clusters/{cluster}`. |
| `aclId` | query | string | yes | Required. The ID to use for the acl, which will become the final component of the acl's name. The structure of `acl_id` defines the Resource Pattern (resource_type, resource_name, pattern_type) of the acl. `acl_id` is structured like one of the following: For acls on the cluster: `cluster` For acls on a single resource within the cluster: `topic/{resource_name}` `consumerGroup/{resource_name}` `transactionalId/{resource_name}` For acls on all resources that match a prefix: `topicPrefixed/{resource_name}` `consumerGroupPrefixed/{resource_name}` `transactionalIdPrefixed/{resource_name}` For acls on all resources of a given type (i.e. the wildcard literal "\*"): `allTopics` (represents `topic/*`) `allConsumerGroups` (represents `consumerGroup/*`) `allTransactionalIds` (represents `transactionalId/*`) |

### `managedkafka.projects.locations.clusters.acls.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Deletes an acl.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the acl to delete. Structured like: `projects/{project}/locations/{location}/clusters/{cluster}/acls/{acl_id}`. The structure of `acl_id` defines the Resource Pattern (resource_type, resource_name, pattern_type) of the acl. See `Acl.name` for details. |

### `managedkafka.projects.locations.clusters.acls.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Returns the properties of a single acl.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Acl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the acl to return. Structured like: `projects/{project}/locations/{location}/clusters/{cluster}/acls/{acl_id}`. The structure of `acl_id` defines the Resource Pattern (resource_type, resource_name, pattern_type) of the acl. See `Acl.name` for details. |

### `managedkafka.projects.locations.clusters.acls.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/acls`
- Lists the acls in a given cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAclsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent cluster whose acls are to be listed. Structured like `projects/{project}/locations/{location}/clusters/{cluster}`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of acls to return. The service may return fewer than this value. If unset or zero, all acls for the parent is returned. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListAcls` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAcls` must match the call that provided the page token. |

### `managedkafka.projects.locations.clusters.acls.patch`

- Versions: v1
- `PATCH https://managedkafka.googleapis.com/v1/{+name}`
- Updates the properties of a single acl.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Acl`; Response: `Acl`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name for the acl. Represents a single Resource Pattern. Structured like: projects/{project}/locations/{location}/clusters/{cluster}/acls/{acl_id} The structure of `acl_id` defines the Resource Pattern (resource_type, resource_name, pattern_type) of the acl. `acl_id` is structured like one of the following: For acls on the cluster: `cluster` For acls on a single resource within the cluster: `topic/{resource_name}` `consumerGroup/{resource_name}` `transactionalId/{resource_name}` For acls on all resources that match a prefix: `topicPrefixed/{resource_name}` `consumerGroupPrefixed/{resource_name}` `transactionalIdPrefixed/{resource_name}` For acls on all resources of a given type (i.e. the wildcard literal "\*"): `allTopics` (represents `topic/*`) `allConsumerGroups` (represents `consumerGroup/*`) `allTransactionalIds` (represents `transactionalId/*`) |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Acl resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. |

### `managedkafka.projects.locations.clusters.acls.removeAclEntry`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+acl}:removeAclEntry`
- Incremental update: Removes an acl entry from an acl. Deletes the acl if its acl entries become empty (i.e. if the removed entry was the last one in the acl).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AclEntry`; Response: `RemoveAclEntryResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `acl` | path | string | yes | Required. The name of the acl to remove the acl entry from. Structured like: `projects/{project}/locations/{location}/clusters/{cluster}/acls/{acl_id}`. The structure of `acl_id` defines the Resource Pattern (resource_type, resource_name, pattern_type) of the acl. See `Acl.name` for details. |

### `managedkafka.projects.locations.clusters.consumerGroups.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Deletes a single consumer group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the consumer group to delete. `projects/{project}/locations/{location}/clusters/{cluster}/consumerGroups/{consumerGroup}`. |

### `managedkafka.projects.locations.clusters.consumerGroups.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Returns the properties of a single consumer group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ConsumerGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the consumer group whose configuration to return. `projects/{project}/locations/{location}/clusters/{cluster}/consumerGroups/{consumerGroup}`. |

### `managedkafka.projects.locations.clusters.consumerGroups.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/consumerGroups`
- Lists the consumer groups in a given cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConsumerGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent cluster whose consumer groups are to be listed. Structured like `projects/{project}/locations/{location}/clusters/{cluster}`. |
| `filter` | query | string | no | Optional. Filter expression for the result. Only supports filtering by topic name as a key in the `topics` map. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of consumer groups to return. The service may return fewer than this value. If unset or zero, all consumer groups for the parent is returned. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListConsumerGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListConsumerGroups` must match the call that provided the page token. |
| `view` | query | string enum | no | Optional. Specifies the view (BASIC or FULL) of the ConsumerGroup resource to be returned in the response. Defaults to FULL view. Values: `CONSUMER_GROUP_VIEW_UNSPECIFIED`, `CONSUMER_GROUP_VIEW_BASIC`, `CONSUMER_GROUP_VIEW_FULL`. |

### `managedkafka.projects.locations.clusters.consumerGroups.patch`

- Versions: v1
- `PATCH https://managedkafka.googleapis.com/v1/{+name}`
- Updates the properties of a single consumer group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConsumerGroup`; Response: `ConsumerGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the consumer group. The `consumer_group` segment is used when connecting directly to the cluster. Structured like: projects/{project}/locations/{location}/clusters/{cluster}/consumerGroups/{consumer_group} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the ConsumerGroup resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The mask is required and a value of \* will update all fields. |

### `managedkafka.projects.locations.clusters.create`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+parent}/clusters`
- Creates a new cluster in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Cluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent region in which to create the cluster. Structured like `projects/{project}/locations/{location}`. |
| `clusterId` | query | string | yes | Required. The ID to use for the cluster, which will become the final component of the cluster's name. The ID must be 1-63 characters long, and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` to comply with RFC 1035. This value is structured like: `my-cluster-id`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID to avoid duplication of requests. If a request times out or fails, retrying with the same ID allows the server to recognize the previous attempt. For at least 60 minutes, the server ignores duplicate requests bearing the same ID. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID within 60 minutes of the last request, the server checks if an original operation with the same request ID was received. If so, the server ignores the second request. The request ID must be a valid UUID. A zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `managedkafka.projects.locations.clusters.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Deletes a single cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the cluster to delete. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID to avoid duplication of requests. If a request times out or fails, retrying with the same ID allows the server to recognize the previous attempt. For at least 60 minutes, the server ignores duplicate requests bearing the same ID. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID within 60 minutes of the last request, the server checks if an original operation with the same request ID was received. If so, the server ignores the second request. The request ID must be a valid UUID. A zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `managedkafka.projects.locations.clusters.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Returns the properties of a single cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Cluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the cluster whose configuration to return. |
| `view` | query | string enum | no | Optional. Specifies the view of the Cluster resource to be returned. Defaults to CLUSTER_VIEW_BASIC. See the ClusterView enum for possible values. Values: `CLUSTER_VIEW_UNSPECIFIED`, `CLUSTER_VIEW_BASIC`, `CLUSTER_VIEW_FULL`. |

### `managedkafka.projects.locations.clusters.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/clusters`
- Lists the clusters in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent location whose clusters are to be listed. Structured like `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filter expression for the result. |
| `orderBy` | query | string | no | Optional. Order by fields for the result. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of clusters to return. The service may return fewer than this value. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListClusters` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListClusters` must match the call that provided the page token. |

### `managedkafka.projects.locations.clusters.patch`

- Versions: v1
- `PATCH https://managedkafka.googleapis.com/v1/{+name}`
- Updates the properties of a single cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Cluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the cluster. Structured like: projects/{project_number}/locations/{location}/clusters/{cluster_id} |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID to avoid duplication of requests. If a request times out or fails, retrying with the same ID allows the server to recognize the previous attempt. For at least 60 minutes, the server ignores duplicate requests bearing the same ID. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID within 60 minutes of the last request, the server checks if an original operation with the same request ID was received. If so, the server ignores the second request. The request ID must be a valid UUID. A zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the cluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The mask is required and a value of \* will update all fields. |

### `managedkafka.projects.locations.clusters.topics.create`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+parent}/topics`
- Creates a new topic in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Topic`; Response: `Topic`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent cluster in which to create the topic. Structured like `projects/{project}/locations/{location}/clusters/{cluster}`. |
| `topicId` | query | string | yes | Required. The ID to use for the topic, which will become the final component of the topic's name. This value is structured like: `my-topic-name`. |

### `managedkafka.projects.locations.clusters.topics.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Deletes a single topic.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the topic to delete. `projects/{project}/locations/{location}/clusters/{cluster}/topics/{topic}`. |

### `managedkafka.projects.locations.clusters.topics.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Returns the properties of a single topic.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Topic`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the topic whose configuration to return. Structured like: projects/{project}/locations/{location}/clusters/{cluster}/topics/{topic}. |

### `managedkafka.projects.locations.clusters.topics.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/topics`
- Lists the topics in a given cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTopicsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent cluster whose topics are to be listed. Structured like `projects/{project}/locations/{location}/clusters/{cluster}`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of topics to return. The service may return fewer than this value. If unset or zero, all topics for the parent is returned. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListTopics` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTopics` must match the call that provided the page token. |

### `managedkafka.projects.locations.clusters.topics.patch`

- Versions: v1
- `PATCH https://managedkafka.googleapis.com/v1/{+name}`
- Updates the properties of a single topic.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Topic`; Response: `Topic`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the topic. The `topic` segment is used when connecting directly to the cluster. Structured like: projects/{project}/locations/{location}/clusters/{cluster}/topics/{topic} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the Topic resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The mask is required and a value of \* will update all fields. |

### `managedkafka.projects.locations.connectClusters.connectors.create`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+parent}/connectors`
- Creates a new connector in a given Connect cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Connector`; Response: `Connector`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent Connect cluster in which to create the connector. Structured like `projects/{project}/locations/{location}/connectClusters/{connect_cluster_id}`. |
| `connectorId` | query | string | yes | Required. The ID to use for the connector, which will become the final component of the connector's name. The ID must be 1-63 characters long, and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` to comply with RFC 1035. This value is structured like: `my-connector-id`. |

### `managedkafka.projects.locations.connectClusters.connectors.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Deletes a connector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the connector to delete. Structured like: projects/{project}/locations/{location}/connectClusters/{connectCluster}/connectors/{connector} |

### `managedkafka.projects.locations.connectClusters.connectors.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Returns the properties of a single connector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Connector`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the connector whose configuration to return. Structured like: projects/{project}/locations/{location}/connectClusters/{connectCluster}/connectors/{connector} |

### `managedkafka.projects.locations.connectClusters.connectors.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/connectors`
- Lists the connectors in a given Connect cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConnectorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent Connect cluster whose connectors are to be listed. Structured like `projects/{project}/locations/{location}/connectClusters/{connect_cluster_id}`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of connectors to return. The service may return fewer than this value. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListConnectors` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListConnectors` must match the call that provided the page token. |

### `managedkafka.projects.locations.connectClusters.connectors.patch`

- Versions: v1
- `PATCH https://managedkafka.googleapis.com/v1/{+name}`
- Updates the properties of a connector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Connector`; Response: `Connector`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the connector. Structured like: projects/{project}/locations/{location}/connectClusters/{connect_cluster}/connectors/{connector} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the cluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The mask is required and a value of \* will update all fields. |

### `managedkafka.projects.locations.connectClusters.connectors.pause`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+name}:pause`
- Pauses the connector and its tasks.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PauseConnectorRequest`; Response: `PauseConnectorResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the connector to pause. Structured like: projects/{project}/locations/{location}/connectClusters/{connectCluster}/connectors/{connector} |

### `managedkafka.projects.locations.connectClusters.connectors.restart`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+name}:restart`
- Restarts the connector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestartConnectorRequest`; Response: `RestartConnectorResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the connector to restart. Structured like: projects/{project}/locations/{location}/connectClusters/{connectCluster}/connectors/{connector} |

### `managedkafka.projects.locations.connectClusters.connectors.resume`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+name}:resume`
- Resumes the connector and its tasks.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResumeConnectorRequest`; Response: `ResumeConnectorResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the connector to pause. Structured like: projects/{project}/locations/{location}/connectClusters/{connectCluster}/connectors/{connector} |

### `managedkafka.projects.locations.connectClusters.connectors.stop`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+name}:stop`
- Stops the connector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StopConnectorRequest`; Response: `StopConnectorResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the connector to stop. Structured like: projects/{project}/locations/{location}/connectClusters/{connectCluster}/connectors/{connector} |

### `managedkafka.projects.locations.connectClusters.create`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+parent}/connectClusters`
- Creates a new Kafka Connect cluster in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConnectCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent project/location in which to create the Kafka Connect cluster. Structured like `projects/{project}/locations/{location}/`. |
| `connectClusterId` | query | string | yes | Required. The ID to use for the Connect cluster, which will become the final component of the cluster's name. The ID must be 1-63 characters long, and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` to comply with RFC 1035. This value is structured like: `my-cluster-id`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID to avoid duplication of requests. If a request times out or fails, retrying with the same ID allows the server to recognize the previous attempt. For at least 60 minutes, the server ignores duplicate requests bearing the same ID. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID within 60 minutes of the last request, the server checks if an original operation with the same request ID was received. If so, the server ignores the second request. The request ID must be a valid UUID. A zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `managedkafka.projects.locations.connectClusters.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Deletes a single Connect cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Kafka Connect cluster to delete. Structured like `projects/{project}/locations/{location}/connectClusters/{connect_cluster_id}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID to avoid duplication of requests. If a request times out or fails, retrying with the same ID allows the server to recognize the previous attempt. For at least 60 minutes, the server ignores duplicate requests bearing the same ID. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID within 60 minutes of the last request, the server checks if an original operation with the same request ID was received. If so, the server ignores the second request. The request ID must be a valid UUID. A zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `managedkafka.projects.locations.connectClusters.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Returns the properties of a single Kafka Connect cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ConnectCluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Kafka Connect cluster whose configuration to return. Structured like `projects/{project}/locations/{location}/connectClusters/{connect_cluster_id}`. |

### `managedkafka.projects.locations.connectClusters.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/connectClusters`
- Lists the Kafka Connect clusters in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConnectClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent project/location whose Connect clusters are to be listed. Structured like `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filter expression for the result. |
| `orderBy` | query | string | no | Optional. Order by fields for the result. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of Connect clusters to return. The service may return fewer than this value. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListConnectClusters` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListConnectClusters` must match the call that provided the page token. |

### `managedkafka.projects.locations.connectClusters.patch`

- Versions: v1
- `PATCH https://managedkafka.googleapis.com/v1/{+name}`
- Updates the properties of a single Kafka Connect cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConnectCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the Kafka Connect cluster. Structured like: projects/{project_number}/locations/{location}/connectClusters/{connect_cluster_id} |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID to avoid duplication of requests. If a request times out or fails, retrying with the same ID allows the server to recognize the previous attempt. For at least 60 minutes, the server ignores duplicate requests bearing the same ID. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID within 60 minutes of the last request, the server checks if an original operation with the same request ID was received. If so, the server ignores the second request. The request ID must be a valid UUID. A zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the cluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The mask is required and a value of \* will update all fields. |

### `managedkafka.projects.locations.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `managedkafka.projects.locations.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}/locations`
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

### `managedkafka.projects.locations.operations.cancel`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `managedkafka.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `managedkafka.projects.locations.operations.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `managedkafka.projects.locations.operations.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}/operations`
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

### `managedkafka.projects.locations.schemaRegistries.compatibility.checkCompatibility`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+name}`
- Check compatibility of a schema with all versions or a specific version of a subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CheckCompatibilityRequest`; Response: `CheckCompatibilityResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource to check compatibility for. The format is either of following: \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/compatibility/subjects/\*/versions: Check compatibility with one or more versions of the specified subject. \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/compatibility/subjects/{subject}/versions/{version}: Check compatibility with a specific version of the subject. |

### `managedkafka.projects.locations.schemaRegistries.config.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Delete schema config for a subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SchemaConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of subject to delete the config for. The format is \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config/{subject} |

### `managedkafka.projects.locations.schemaRegistries.config.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Get schema config at global level or for a subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SchemaConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name to get the config for. It can be either of following: \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config: Get config at global level. \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config/{subject}: Get config for a specific subject. |
| `defaultToGlobal` | query | boolean | no | Optional. If true, the config will fall back to the config at the global level if no subject level config is found. |

### `managedkafka.projects.locations.schemaRegistries.config.update`

- Versions: v1
- `PUT https://managedkafka.googleapis.com/v1/{+name}`
- Update config at global level or for a subject. Creates a SchemaSubject-level SchemaConfig if it does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UpdateSchemaConfigRequest`; Response: `SchemaConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name to update the config for. It can be either of following: \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config: Update config at global level. \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config/{subject}: Update config for a specific subject. |

### `managedkafka.projects.locations.schemaRegistries.contexts.compatibility.checkCompatibility`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+name}`
- Check compatibility of a schema with all versions or a specific version of a subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CheckCompatibilityRequest`; Response: `CheckCompatibilityResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource to check compatibility for. The format is either of following: \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/compatibility/subjects/\*/versions: Check compatibility with one or more versions of the specified subject. \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/compatibility/subjects/{subject}/versions/{version}: Check compatibility with a specific version of the subject. |

### `managedkafka.projects.locations.schemaRegistries.contexts.config.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Delete schema config for a subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SchemaConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of subject to delete the config for. The format is \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config/{subject} |

### `managedkafka.projects.locations.schemaRegistries.contexts.config.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Get schema config at global level or for a subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SchemaConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name to get the config for. It can be either of following: \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config: Get config at global level. \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config/{subject}: Get config for a specific subject. |
| `defaultToGlobal` | query | boolean | no | Optional. If true, the config will fall back to the config at the global level if no subject level config is found. |

### `managedkafka.projects.locations.schemaRegistries.contexts.config.update`

- Versions: v1
- `PUT https://managedkafka.googleapis.com/v1/{+name}`
- Update config at global level or for a subject. Creates a SchemaSubject-level SchemaConfig if it does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UpdateSchemaConfigRequest`; Response: `SchemaConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name to update the config for. It can be either of following: \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config: Update config at global level. \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config/{subject}: Update config for a specific subject. |

### `managedkafka.projects.locations.schemaRegistries.contexts.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Get the context.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Context`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the context to return. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}` |

### `managedkafka.projects.locations.schemaRegistries.contexts.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/contexts`
- List contexts for a schema registry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the contexts. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` |

### `managedkafka.projects.locations.schemaRegistries.contexts.mode.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Delete schema mode for a subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SchemaMode`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of subject to delete the mode for. The format is \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/mode/{subject} \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/mode/{subject} |

### `managedkafka.projects.locations.schemaRegistries.contexts.mode.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Get mode at global level or for a subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SchemaMode`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the mode. The format is \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/mode/{subject}: mode for a schema registry, or \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/mode/{subject}: mode for a specific subject in a specific context |

### `managedkafka.projects.locations.schemaRegistries.contexts.mode.update`

- Versions: v1
- `PUT https://managedkafka.googleapis.com/v1/{+name}`
- Update mode at global level or for a subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UpdateSchemaModeRequest`; Response: `SchemaMode`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the mode. The format is \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/mode/{subject}: mode for a schema registry, or \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/mode/{subject}: mode for a specific subject in a specific context |

### `managedkafka.projects.locations.schemaRegistries.contexts.schemas.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Get the schema for the given schema id.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Schema`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the schema to return. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` |
| `subject` | query | string | no | Optional. Used to limit the search for the schema ID to a specific subject, otherwise the schema ID will be searched for in all subjects in the given specified context. |

### `managedkafka.projects.locations.schemaRegistries.contexts.schemas.getSchema`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}/schema`
- Get the schema string for the given schema id. The response will be the schema string.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the schema to return. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` |
| `subject` | query | string | no | Optional. Used to limit the search for the schema ID to a specific subject, otherwise the schema ID will be searched for in all subjects in the given specified context. |

### `managedkafka.projects.locations.schemaRegistries.contexts.schemas.subjects.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/subjects`
- List subjects which reference a particular schema id. The response will be an array of subject names.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The schema resource whose associated subjects are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/schemas/ids/{schema}` |
| `deleted` | query | boolean | no | Optional. If true, the response will include soft-deleted subjects. The default is false. |
| `subject` | query | string | no | Optional. The subject to filter the subjects by. |

### `managedkafka.projects.locations.schemaRegistries.contexts.schemas.types.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/schemas/types`
- List the supported schema types. The response will be an array of schema types.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent schema registry whose schema types are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` |

### `managedkafka.projects.locations.schemaRegistries.contexts.schemas.versions.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/versions`
- List the schema versions for the given schema id. The response will be an array of subject-version pairs as: \[{"subject":"subject1", "version":1}, {"subject":"subject2", "version":2}\].
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The schema whose schema versions are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/schemas/ids/{schema}` |
| `deleted` | query | boolean | no | Optional. If true, the response will include soft-deleted versions of the schema, even if the subject is soft-deleted. The default is false. |
| `subject` | query | string | no | Optional. The subject to filter the subjects by. |

### `managedkafka.projects.locations.schemaRegistries.contexts.subjects.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Delete a subject. The response will be an array of versions of the deleted subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the subject to delete. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` |
| `permanent` | query | boolean | no | Optional. If true, the subject and all associated metadata including the schema ID will be deleted permanently. Otherwise, only the subject is soft-deleted. The default is false. Soft-deleted subjects can still be searched in ListSubjects API call with deleted=true query parameter. A soft-delete of a subject must be performed before a hard-delete. |

### `managedkafka.projects.locations.schemaRegistries.contexts.subjects.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/subjects`
- List subjects in the schema registry. The response will be an array of subject names.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent schema registry/context whose subjects are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}` |
| `deleted` | query | boolean | no | Optional. If true, the response will include soft-deleted subjects. The default is false. |
| `subjectPrefix` | query | string | no | Optional. The context to filter the subjects by, in the format of `:.{context}:`. If unset, all subjects in the registry are returned. Set to empty string or add as '?subjectPrefix=' at the end of this request to list subjects in the default context. |

### `managedkafka.projects.locations.schemaRegistries.contexts.subjects.lookupVersion`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+parent}`
- Lookup a schema under the specified subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LookupVersionRequest`; Response: `SchemaVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The subject to lookup the schema in. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` |

### `managedkafka.projects.locations.schemaRegistries.contexts.subjects.versions.create`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+parent}/versions`
- Register a new version under a given subject with the given schema.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CreateVersionRequest`; Response: `CreateVersionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The subject to create the version for. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` |

### `managedkafka.projects.locations.schemaRegistries.contexts.subjects.versions.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Delete a version of a subject. The response will be the deleted version id.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the subject version to delete. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` |
| `permanent` | query | boolean | no | Optional. If true, both the version and the referenced schema ID will be permanently deleted. The default is false. If false, the version will be deleted but the schema ID will be retained. Soft-deleted versions can still be searched in ListVersions API call with deleted=true query parameter. A soft-delete of a version must be performed before a hard-delete. |

### `managedkafka.projects.locations.schemaRegistries.contexts.subjects.versions.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Get a versioned schema (schema with subject/version) of a subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SchemaVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the subject to return versions. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` |
| `deleted` | query | boolean | no | Optional. If true, no matter if the subject/version is soft-deleted or not, it returns the version details. If false, it returns NOT_FOUND error if the subject/version is soft-deleted. The default is false. |

### `managedkafka.projects.locations.schemaRegistries.contexts.subjects.versions.getSchema`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}/schema`
- Get the schema string only for a version of a subject. The response will be the schema string.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the subject to return versions. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` |
| `deleted` | query | boolean | no | Optional. If true, no matter if the subject/version is soft-deleted or not, it returns the version details. If false, it returns NOT_FOUND error if the subject/version is soft-deleted. The default is false. |

### `managedkafka.projects.locations.schemaRegistries.contexts.subjects.versions.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/versions`
- Get all versions of a subject. The response will be an array of versions of the subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The subject whose versions are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` |
| `deleted` | query | boolean | no | Optional. If true, the response will include soft-deleted versions of an active or soft-deleted subject. The default is false. |

### `managedkafka.projects.locations.schemaRegistries.contexts.subjects.versions.referencedby.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/referencedby`
- Get a list of IDs of schemas that reference the schema with the given subject and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The version to list referenced by. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` |

### `managedkafka.projects.locations.schemaRegistries.create`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+parent}/schemaRegistries`
- Create a schema registry instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CreateSchemaRegistryRequest`; Response: `SchemaRegistry`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent whose schema registry instance is to be created. Structured like: `projects/{project}/locations/{location}` |

### `managedkafka.projects.locations.schemaRegistries.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Delete a schema registry instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the schema registry instance to delete. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` |

### `managedkafka.projects.locations.schemaRegistries.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Get the schema registry instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SchemaRegistry`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the schema registry instance to return. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` |

### `managedkafka.projects.locations.schemaRegistries.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/schemaRegistries`
- List schema registries.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSchemaRegistriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent whose schema registry instances are to be listed. Structured like: `projects/{project}/locations/{location}` |
| `view` | query | string enum | no | Optional. Specifies the view to return for the schema registry instances. If not specified, the default view is SCHEMA_REGISTRY_VIEW_BASIC. Values: `SCHEMA_REGISTRY_VIEW_UNSPECIFIED`, `SCHEMA_REGISTRY_VIEW_BASIC`, `SCHEMA_REGISTRY_VIEW_FULL`. |

### `managedkafka.projects.locations.schemaRegistries.mode.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Delete schema mode for a subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SchemaMode`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of subject to delete the mode for. The format is \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/mode/{subject} \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/mode/{subject} |

### `managedkafka.projects.locations.schemaRegistries.mode.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Get mode at global level or for a subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SchemaMode`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the mode. The format is \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/mode/{subject}: mode for a schema registry, or \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/mode/{subject}: mode for a specific subject in a specific context |

### `managedkafka.projects.locations.schemaRegistries.mode.update`

- Versions: v1
- `PUT https://managedkafka.googleapis.com/v1/{+name}`
- Update mode at global level or for a subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UpdateSchemaModeRequest`; Response: `SchemaMode`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the mode. The format is \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/mode/{subject}: mode for a schema registry, or \* projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/mode/{subject}: mode for a specific subject in a specific context |

### `managedkafka.projects.locations.schemaRegistries.schemas.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Get the schema for the given schema id.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Schema`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the schema to return. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` |
| `subject` | query | string | no | Optional. Used to limit the search for the schema ID to a specific subject, otherwise the schema ID will be searched for in all subjects in the given specified context. |

### `managedkafka.projects.locations.schemaRegistries.schemas.getSchema`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}/schema`
- Get the schema string for the given schema id. The response will be the schema string.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the schema to return. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` |
| `subject` | query | string | no | Optional. Used to limit the search for the schema ID to a specific subject, otherwise the schema ID will be searched for in all subjects in the given specified context. |

### `managedkafka.projects.locations.schemaRegistries.schemas.subjects.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/subjects`
- List subjects which reference a particular schema id. The response will be an array of subject names.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The schema resource whose associated subjects are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/schemas/ids/{schema}` |
| `deleted` | query | boolean | no | Optional. If true, the response will include soft-deleted subjects. The default is false. |
| `subject` | query | string | no | Optional. The subject to filter the subjects by. |

### `managedkafka.projects.locations.schemaRegistries.schemas.types.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/schemas/types`
- List the supported schema types. The response will be an array of schema types.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent schema registry whose schema types are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` |

### `managedkafka.projects.locations.schemaRegistries.schemas.versions.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/versions`
- List the schema versions for the given schema id. The response will be an array of subject-version pairs as: \[{"subject":"subject1", "version":1}, {"subject":"subject2", "version":2}\].
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The schema whose schema versions are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/schemas/ids/{schema}` |
| `deleted` | query | boolean | no | Optional. If true, the response will include soft-deleted versions of the schema, even if the subject is soft-deleted. The default is false. |
| `subject` | query | string | no | Optional. The subject to filter the subjects by. |

### `managedkafka.projects.locations.schemaRegistries.subjects.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Delete a subject. The response will be an array of versions of the deleted subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the subject to delete. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` |
| `permanent` | query | boolean | no | Optional. If true, the subject and all associated metadata including the schema ID will be deleted permanently. Otherwise, only the subject is soft-deleted. The default is false. Soft-deleted subjects can still be searched in ListSubjects API call with deleted=true query parameter. A soft-delete of a subject must be performed before a hard-delete. |

### `managedkafka.projects.locations.schemaRegistries.subjects.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/subjects`
- List subjects in the schema registry. The response will be an array of subject names.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent schema registry/context whose subjects are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}` |
| `deleted` | query | boolean | no | Optional. If true, the response will include soft-deleted subjects. The default is false. |
| `subjectPrefix` | query | string | no | Optional. The context to filter the subjects by, in the format of `:.{context}:`. If unset, all subjects in the registry are returned. Set to empty string or add as '?subjectPrefix=' at the end of this request to list subjects in the default context. |

### `managedkafka.projects.locations.schemaRegistries.subjects.lookupVersion`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+parent}`
- Lookup a schema under the specified subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LookupVersionRequest`; Response: `SchemaVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The subject to lookup the schema in. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` |

### `managedkafka.projects.locations.schemaRegistries.subjects.versions.create`

- Versions: v1
- `POST https://managedkafka.googleapis.com/v1/{+parent}/versions`
- Register a new version under a given subject with the given schema.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CreateVersionRequest`; Response: `CreateVersionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The subject to create the version for. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` |

### `managedkafka.projects.locations.schemaRegistries.subjects.versions.delete`

- Versions: v1
- `DELETE https://managedkafka.googleapis.com/v1/{+name}`
- Delete a version of a subject. The response will be the deleted version id.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the subject version to delete. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` |
| `permanent` | query | boolean | no | Optional. If true, both the version and the referenced schema ID will be permanently deleted. The default is false. If false, the version will be deleted but the schema ID will be retained. Soft-deleted versions can still be searched in ListVersions API call with deleted=true query parameter. A soft-delete of a version must be performed before a hard-delete. |

### `managedkafka.projects.locations.schemaRegistries.subjects.versions.get`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}`
- Get a versioned schema (schema with subject/version) of a subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SchemaVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the subject to return versions. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` |
| `deleted` | query | boolean | no | Optional. If true, no matter if the subject/version is soft-deleted or not, it returns the version details. If false, it returns NOT_FOUND error if the subject/version is soft-deleted. The default is false. |

### `managedkafka.projects.locations.schemaRegistries.subjects.versions.getSchema`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+name}/schema`
- Get the schema string only for a version of a subject. The response will be the schema string.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the subject to return versions. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` |
| `deleted` | query | boolean | no | Optional. If true, no matter if the subject/version is soft-deleted or not, it returns the version details. If false, it returns NOT_FOUND error if the subject/version is soft-deleted. The default is false. |

### `managedkafka.projects.locations.schemaRegistries.subjects.versions.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/versions`
- Get all versions of a subject. The response will be an array of versions of the subject.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The subject whose versions are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` |
| `deleted` | query | boolean | no | Optional. If true, the response will include soft-deleted versions of an active or soft-deleted subject. The default is false. |

### `managedkafka.projects.locations.schemaRegistries.subjects.versions.referencedby.list`

- Versions: v1
- `GET https://managedkafka.googleapis.com/v1/{+parent}/referencedby`
- Get a list of IDs of schemas that reference the schema with the given subject and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The version to list referenced by. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` |

### Example request skeleton

Generated from the Discovery entry of `managedkafka.projects.locations.clusters.acls.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://managedkafka.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `managedkafka` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/managedkafka/`; they are the `schemas` section of the Discovery documents in Source.
- Corrected from the Discovery document: the description of `name` in `managedkafka.projects.locations.schemaRegistries.contexts.config.delete` gives the resource name format `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config/{subject}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/schemaRegistries/[^/]+/contexts/[^/]+/config/.*$`; a value must match the pattern to reach the route.
- Regional endpoints: the Discovery document (`managedkafka` v1, revision 20261029) also lists 42 endpoints of the form `https://managedkafka.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://managedkafka.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://managedkafka.africa-south1.rep.googleapis.com/`) and keep the path.
- Source: https://managedkafka.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

---
source: https://pubsub.googleapis.com/$discovery/rest?version=v1
---

# Cloud Pub/Sub API REST API (pubsub)

## Signature / Usage

Base URL: `https://pubsub.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `pubsub.projects.schemas.commit`

- Versions: v1
- `POST https://pubsub.googleapis.com/v1/{+name}:commit`
- Commits a new schema revision to an existing schema.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `CommitSchemaRequest`; Response: `Schema`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the schema we are revising. Format is `projects/{project}/schemas/{schema}`. |

### `pubsub.projects.schemas.create`

- Versions: v1
- `POST https://pubsub.googleapis.com/v1/{+parent}/schemas`
- Creates a schema.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `Schema`; Response: `Schema`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project in which to create the schema. Format is `projects/{project-id}`. |
| `schemaId` | query | string | no | The ID to use for the schema, which will become the final component of the schema's resource name. See https://cloud.google.com/pubsub/docs/pubsub-basics#resource_names for resource name constraints. |

### `pubsub.projects.schemas.delete`

- Versions: v1
- `DELETE https://pubsub.googleapis.com/v1/{+name}`
- Deletes a schema.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the schema to delete. Format is `projects/{project}/schemas/{schema}`. |

### `pubsub.projects.schemas.deleteRevision`

- Versions: v1
- `DELETE https://pubsub.googleapis.com/v1/{+name}:deleteRevision`
- Deletes a specific schema revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Schema`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the schema revision to be deleted, with a revision ID explicitly included. Example: `projects/123/schemas/my-schema@c7cfa2a8` |
| `revisionId` | query | string | no | Optional. This field is deprecated and should not be used for specifying the revision ID. The revision ID should be specified via the `name` parameter. |

### `pubsub.projects.schemas.get`

- Versions: v1
- `GET https://pubsub.googleapis.com/v1/{+name}`
- Gets a schema.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Schema`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the schema to get. Format is `projects/{project}/schemas/{schema}`. |
| `view` | query | string enum | no | The set of fields to return in the response. If not set, returns a Schema with all fields filled out. Set to `BASIC` to omit the `definition`. Values: `SCHEMA_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `pubsub.projects.schemas.getIamPolicy`

- Versions: v1
- `GET https://pubsub.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `pubsub.projects.schemas.list`

- Versions: v1
- `GET https://pubsub.googleapis.com/v1/{+parent}/schemas`
- Lists schemas in a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `ListSchemasResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project in which to list schemas. Format is `projects/{project-id}`. |
| `pageSize` | query | integer (int32) | no | Maximum number of schemas to return. |
| `pageToken` | query | string | no | The value returned by the last `ListSchemasResponse`; indicates that this is a continuation of a prior `ListSchemas` call, and that the system should return the next page of data. |
| `view` | query | string enum | no | The set of Schema fields to return in the response. If not set, returns Schemas with `name` and `type`, but not `definition`. Set to `FULL` to retrieve all fields. Values: `SCHEMA_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `pubsub.projects.schemas.listRevisions`

- Versions: v1
- `GET https://pubsub.googleapis.com/v1/{+name}:listRevisions`
- Lists all schema revisions for the named schema.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `ListSchemaRevisionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the schema to list revisions for. |
| `pageSize` | query | integer (int32) | no | The maximum number of revisions to return per page. |
| `pageToken` | query | string | no | The page token, received from a previous ListSchemaRevisions call. Provide this to retrieve the subsequent page. |
| `view` | query | string enum | no | The set of Schema fields to return in the response. If not set, returns Schemas with `name` and `type`, but not `definition`. Set to `FULL` to retrieve all fields. Values: `SCHEMA_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `pubsub.projects.schemas.rollback`

- Versions: v1
- `POST https://pubsub.googleapis.com/v1/{+name}:rollback`
- Creates a new schema revision that is a copy of the provided revision_id.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `RollbackSchemaRequest`; Response: `Schema`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The schema being rolled back with revision id. |

### `pubsub.projects.schemas.setIamPolicy`

- Versions: v1
- `POST https://pubsub.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `pubsub.projects.schemas.testIamPermissions`

- Versions: v1
- `POST https://pubsub.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `pubsub.projects.schemas.validate`

- Versions: v1
- `POST https://pubsub.googleapis.com/v1/{+parent}/schemas:validate`
- Validates a schema.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `ValidateSchemaRequest`; Response: `ValidateSchemaResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project in which to validate schemas. Format is `projects/{project-id}`. |

### `pubsub.projects.schemas.validateMessage`

- Versions: v1
- `POST https://pubsub.googleapis.com/v1/{+parent}/schemas:validateMessage`
- Validates a message against a schema.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `ValidateMessageRequest`; Response: `ValidateMessageResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project in which to validate schemas. Format is `projects/{project-id}`. |

### `pubsub.projects.snapshots.create`

- Versions: v1
- `PUT https://pubsub.googleapis.com/v1/{+name}`
- Creates a snapshot from the requested subscription. Snapshots are used in Seek (https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot. If the snapshot already exists, returns `ALREADY_EXISTS`. If the requested subscription doesn't exist, returns `NOT_FOUND`. If the backlog in the subscription is too old -- and the resulting snapshot would expire in less than 1 hour -- then `FAILED_PRECONDITION` is returned. See also the `Snapshot.expire_time` field. If the name is not provided in the request, the server will assign a random name for this snapshot on the same project as the subscription, conforming to the \[resource name format\]( https://cloud.google.com/pubsub/docs/pubsub-basics#resource_names). The generated name is populated in the returned Snapshot object. Note that for REST API requests, you must specify a name in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `CreateSnapshotRequest`; Response: `Snapshot`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. User-provided name for this snapshot. If the name is not provided in the request, the server will assign a random name for this snapshot on the same project as the subscription. Note that for REST API requests, you must specify a name. See the resource name rules (https://cloud.google.com/pubsub/docs/pubsub-basics#resource_names). Format is `projects/{project}/snapshots/{snap}`. |

### `pubsub.projects.snapshots.delete`

- Versions: v1
- `DELETE https://pubsub.googleapis.com/v1/{+snapshot}`
- Removes an existing snapshot. Snapshots are used in \[Seek\]( https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot. When the snapshot is deleted, all messages retained in the snapshot are immediately dropped. After a snapshot is deleted, a new one may be created with the same name, but the new one has no association with the old snapshot or its subscription, unless the same subscription is specified.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `snapshot` | path | string | yes | Required. The name of the snapshot to delete. Format is `projects/{project}/snapshots/{snap}`. |

### `pubsub.projects.snapshots.get`

- Versions: v1
- `GET https://pubsub.googleapis.com/v1/{+snapshot}`
- Gets the configuration details of a snapshot. Snapshots are used in Seek (https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Snapshot`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `snapshot` | path | string | yes | Required. The name of the snapshot to get. Format is `projects/{project}/snapshots/{snap}`. |

### `pubsub.projects.snapshots.getIamPolicy`

- Versions: v1
- `GET https://pubsub.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `pubsub.projects.snapshots.list`

- Versions: v1
- `GET https://pubsub.googleapis.com/v1/{+project}/snapshots`
- Lists the existing snapshots. Snapshots are used in \[Seek\]( https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `ListSnapshotsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. The name of the project in which to list snapshots. Format is `projects/{project-id}`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of snapshots to return. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListSnapshotsResponse`; indicates that this is a continuation of a prior `ListSnapshots` call, and that the system should return the next page of data. |

### `pubsub.projects.snapshots.patch`

- Versions: v1
- `PATCH https://pubsub.googleapis.com/v1/{+name}`
- Updates an existing snapshot by updating the fields specified in the update mask. Snapshots are used in Seek (https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `UpdateSnapshotRequest`; Response: `Snapshot`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Optional. The name of the snapshot. |

### `pubsub.projects.snapshots.setIamPolicy`

- Versions: v1
- `POST https://pubsub.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `pubsub.projects.snapshots.testIamPermissions`

- Versions: v1
- `POST https://pubsub.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `pubsub.projects.subscriptions.acknowledge`

- Versions: v1, v1beta2
- `POST https://pubsub.googleapis.com/v1/{+subscription}:acknowledge`
- Acknowledges the messages associated with the `ack_ids` in the `AcknowledgeRequest`. The Pub/Sub system can remove the relevant messages from the subscription. Acknowledging a message whose ack deadline has expired may succeed, but such a message may be redelivered later. Acknowledging a message more than once will not result in an error.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `AcknowledgeRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `subscription` | path | string | yes | Required. The subscription whose message is being acknowledged. Format is `projects/{project}/subscriptions/{sub}`. |

### `pubsub.projects.subscriptions.create`

- Versions: v1, v1beta2
- `PUT https://pubsub.googleapis.com/v1/{+name}`
- Creates a subscription to a given topic. See the \[resource name rules\]( https://cloud.google.com/pubsub/docs/pubsub-basics#resource_names). If the subscription already exists, returns `ALREADY_EXISTS`. If the corresponding topic doesn't exist, returns `NOT_FOUND`. If the name is not provided in the request, the server will assign a random name for this subscription on the same project as the topic, conforming to the \[resource name format\]( https://cloud.google.com/pubsub/docs/pubsub-basics#resource_names). The generated name is populated in the returned Subscription object. Note that for REST API requests, you must specify a name in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `Subscription`; Response: `Subscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. The name of the subscription. It must have the format `"projects/{project}/subscriptions/{subscription}"`. `{subscription}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. |

### `pubsub.projects.subscriptions.delete`

- Versions: v1, v1beta2
- `DELETE https://pubsub.googleapis.com/v1/{+subscription}`
- Deletes an existing subscription. All messages retained in the subscription are immediately dropped. Calls to `Pull` after deletion will return `NOT_FOUND`. After a subscription is deleted, a new one may be created with the same name, but the new one has no association with the old subscription or its topic unless the same topic is specified.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `subscription` | path | string | yes | Required. The subscription to delete. Format is `projects/{project}/subscriptions/{sub}`. |

### `pubsub.projects.subscriptions.detach`

- Versions: v1
- `POST https://pubsub.googleapis.com/v1/{+subscription}:detach`
- Detaches a subscription from this topic. All messages retained in the subscription are dropped. Subsequent `Pull` and `StreamingPull` requests will return FAILED_PRECONDITION. If the subscription is a push subscription, pushes to the endpoint will stop.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `DetachSubscriptionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `subscription` | path | string | yes | Required. The subscription to detach. Format is `projects/{project}/subscriptions/{subscription}`. |

### `pubsub.projects.subscriptions.get`

- Versions: v1, v1beta2
- `GET https://pubsub.googleapis.com/v1/{+subscription}`
- Gets the configuration details of a subscription.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Subscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `subscription` | path | string | yes | Required. The name of the subscription to get. Format is `projects/{project}/subscriptions/{sub}`. |

### `pubsub.projects.subscriptions.getIamPolicy`

- Versions: v1, v1beta2
- `GET https://pubsub.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `pubsub.projects.subscriptions.list`

- Versions: v1, v1beta2
- `GET https://pubsub.googleapis.com/v1/{+project}/subscriptions`
- Lists matching subscriptions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `ListSubscriptionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. The name of the project in which to list subscriptions. Format is `projects/{project-id}`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of subscriptions to return. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListSubscriptionsResponse`; indicates that this is a continuation of a prior `ListSubscriptions` call, and that the system should return the next page of data. |

### `pubsub.projects.subscriptions.modifyAckDeadline`

- Versions: v1, v1beta2
- `POST https://pubsub.googleapis.com/v1/{+subscription}:modifyAckDeadline`
- Modifies the ack deadline for a specific message. This method is useful to indicate that more time is needed to process a message by the subscriber, or to make the message available for redelivery if the processing was interrupted. Note that this does not modify the subscription-level `ackDeadlineSeconds` used for subsequent messages.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `ModifyAckDeadlineRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `subscription` | path | string | yes | Required. The name of the subscription. Format is `projects/{project}/subscriptions/{sub}`. |

### `pubsub.projects.subscriptions.modifyPushConfig`

- Versions: v1, v1beta2
- `POST https://pubsub.googleapis.com/v1/{+subscription}:modifyPushConfig`
- Modifies the `PushConfig` for a specified subscription. This may be used to change a push subscription to a pull one (signified by an empty `PushConfig`) or vice versa, or change the endpoint URL and other attributes of a push subscription. Messages will accumulate for delivery continuously through the call regardless of changes to the `PushConfig`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `ModifyPushConfigRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `subscription` | path | string | yes | Required. The name of the subscription. Format is `projects/{project}/subscriptions/{sub}`. |

### `pubsub.projects.subscriptions.patch`

- Versions: v1
- `PATCH https://pubsub.googleapis.com/v1/{+name}`
- Updates an existing subscription by updating the fields specified in the update mask. Note that certain properties of a subscription, such as its topic, are not modifiable.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `UpdateSubscriptionRequest`; Response: `Subscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. The name of the subscription. It must have the format `"projects/{project}/subscriptions/{subscription}"`. `{subscription}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. |

### `pubsub.projects.subscriptions.pull`

- Versions: v1, v1beta2
- `POST https://pubsub.googleapis.com/v1/{+subscription}:pull`
- Pulls messages from the server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `PullRequest`; Response: `PullResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `subscription` | path | string | yes | Required. The subscription from which messages should be pulled. Format is `projects/{project}/subscriptions/{sub}`. |

### `pubsub.projects.subscriptions.seek`

- Versions: v1
- `POST https://pubsub.googleapis.com/v1/{+subscription}:seek`
- Seeks an existing subscription to a point in time or to a given snapshot, whichever is provided in the request. Snapshots are used in \[Seek\]( https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot. Note that both the subscription and the snapshot must be on the same topic.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `SeekRequest`; Response: `SeekResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `subscription` | path | string | yes | Required. The subscription to affect. |

### `pubsub.projects.subscriptions.setIamPolicy`

- Versions: v1, v1beta2
- `POST https://pubsub.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `pubsub.projects.subscriptions.testIamPermissions`

- Versions: v1, v1beta2
- `POST https://pubsub.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `pubsub.projects.topics.create`

- Versions: v1, v1beta2
- `PUT https://pubsub.googleapis.com/v1/{+name}`
- Creates the given topic with the given name. See the \[resource name rules\]( https://cloud.google.com/pubsub/docs/pubsub-basics#resource_names).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `Topic`; Response: `Topic`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. The name of the topic. It must have the format `"projects/{project}/topics/{topic}"`. `{topic}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. |

### `pubsub.projects.topics.delete`

- Versions: v1, v1beta2
- `DELETE https://pubsub.googleapis.com/v1/{+topic}`
- Deletes the topic with the given name. Returns `NOT_FOUND` if the topic does not exist. After a topic is deleted, a new topic may be created with the same name; this is an entirely new topic with none of the old configuration or subscriptions. Existing subscriptions to this topic are not deleted, but their `topic` field is set to `_deleted-topic_`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `topic` | path | string | yes | Required. Name of the topic to delete. Format is `projects/{project}/topics/{topic}`. |

### `pubsub.projects.topics.get`

- Versions: v1, v1beta2
- `GET https://pubsub.googleapis.com/v1/{+topic}`
- Gets the configuration of a topic.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Topic`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `topic` | path | string | yes | Required. The name of the topic to get. Format is `projects/{project}/topics/{topic}`. |

### `pubsub.projects.topics.getIamPolicy`

- Versions: v1, v1beta2
- `GET https://pubsub.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `pubsub.projects.topics.list`

- Versions: v1, v1beta2
- `GET https://pubsub.googleapis.com/v1/{+project}/topics`
- Lists matching topics.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `ListTopicsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. The name of the project in which to list topics. Format is `projects/{project-id}`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of topics to return. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListTopicsResponse`; indicates that this is a continuation of a prior `ListTopics` call, and that the system should return the next page of data. |

### `pubsub.projects.topics.patch`

- Versions: v1
- `PATCH https://pubsub.googleapis.com/v1/{+name}`
- Updates an existing topic by updating the fields specified in the update mask. Note that certain properties of a topic are not modifiable.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `UpdateTopicRequest`; Response: `Topic`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. The name of the topic. It must have the format `"projects/{project}/topics/{topic}"`. `{topic}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. |

### `pubsub.projects.topics.publish`

- Versions: v1, v1beta2
- `POST https://pubsub.googleapis.com/v1/{+topic}:publish`
- Adds one or more messages to the topic. Returns `NOT_FOUND` if the topic does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `PublishRequest`; Response: `PublishResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `topic` | path | string | yes | Required. The messages in the request will be published on this topic. Format is `projects/{project}/topics/{topic}`. |

### `pubsub.projects.topics.setIamPolicy`

- Versions: v1, v1beta2
- `POST https://pubsub.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `pubsub.projects.topics.snapshots.list`

- Versions: v1
- `GET https://pubsub.googleapis.com/v1/{+topic}/snapshots`
- Lists the names of the snapshots on this topic. Snapshots are used in Seek (https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `ListTopicSnapshotsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `topic` | path | string | yes | Required. The name of the topic that snapshots are attached to. Format is `projects/{project}/topics/{topic}`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of snapshot names to return. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListTopicSnapshotsResponse`; indicates that this is a continuation of a prior `ListTopicSnapshots` call, and that the system should return the next page of data. |

### `pubsub.projects.topics.subscriptions.list`

- Versions: v1, v1beta2
- `GET https://pubsub.googleapis.com/v1/{+topic}/subscriptions`
- Lists the names of the attached subscriptions on this topic.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `ListTopicSubscriptionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `topic` | path | string | yes | Required. The name of the topic that subscriptions are attached to. Format is `projects/{project}/topics/{topic}`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of subscription names to return. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListTopicSubscriptionsResponse`; indicates that this is a continuation of a prior `ListTopicSubscriptions` call, and that the system should return the next page of data. |

### `pubsub.projects.topics.testIamPermissions`

- Versions: v1, v1beta2
- `POST https://pubsub.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `pubsub.subscriptions.acknowledge`

- Versions: v1beta1a
- `POST https://pubsub.googleapis.com/v1beta1a/subscriptions/acknowledge`
- Acknowledges a particular received message: the Pub/Sub system can remove the given message from the subscription. Acknowledging a message whose Ack deadline has expired may succeed, but the message could have been already redelivered. Acknowledging a message more than once will not result in an error. This is only used for messages received via pull.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `AcknowledgeRequest`; Response: `Empty`

### `pubsub.subscriptions.create`

- Versions: v1beta1a
- `POST https://pubsub.googleapis.com/v1beta1a/subscriptions`
- Creates a subscription on a given topic for a given subscriber. If the subscription already exists, returns ALREADY_EXISTS. If the corresponding topic doesn't exist, returns NOT_FOUND. If the name is not provided in the request, the server will assign a random name for this subscription on the same project as the topic.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `Subscription`; Response: `Subscription`

### `pubsub.subscriptions.delete`

- Versions: v1beta1a
- `DELETE https://pubsub.googleapis.com/v1beta1a/subscriptions/{+subscription}`
- Deletes an existing subscription. All pending messages in the subscription are immediately dropped. Calls to Pull after deletion will return NOT_FOUND.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `subscription` | path | string | yes | The subscription to delete. |

### `pubsub.subscriptions.get`

- Versions: v1beta1a
- `GET https://pubsub.googleapis.com/v1beta1a/subscriptions/{+subscription}`
- Gets the configuration details of a subscription.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Subscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `subscription` | path | string | yes | The name of the subscription to get. |

### `pubsub.subscriptions.list`

- Versions: v1beta1a
- `GET https://pubsub.googleapis.com/v1beta1a/subscriptions`
- Lists matching subscriptions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `ListSubscriptionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `maxResults` | query | integer (int32) | no | Maximum number of subscriptions to return. |
| `pageToken` | query | string | no | The value obtained in the last ListSubscriptionsResponse for continuation. |
| `query` | query | string | no | A valid label query expression. |

### `pubsub.subscriptions.modifyAckDeadline`

- Versions: v1beta1a
- `POST https://pubsub.googleapis.com/v1beta1a/subscriptions/modifyAckDeadline`
- Modifies the Ack deadline for a message received from a pull request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `ModifyAckDeadlineRequest`; Response: `Empty`

### `pubsub.subscriptions.modifyPushConfig`

- Versions: v1beta1a
- `POST https://pubsub.googleapis.com/v1beta1a/subscriptions/modifyPushConfig`
- Modifies the PushConfig for a specified subscription. This method can be used to suspend the flow of messages to an endpoint by clearing the PushConfig field in the request. Messages will be accumulated for delivery even if no push configuration is defined or while the configuration is modified.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `ModifyPushConfigRequest`; Response: `Empty`

### `pubsub.subscriptions.pull`

- Versions: v1beta1a
- `POST https://pubsub.googleapis.com/v1beta1a/subscriptions/pull`
- Pulls a single message from the server. If return_immediately is true, and no messages are available in the subscription, this method returns FAILED_PRECONDITION. The system is free to return an UNAVAILABLE error if no messages are available in a reasonable amount of time (to reduce system load).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `PullRequest`; Response: `PullResponse`

### `pubsub.subscriptions.pullBatch`

- Versions: v1beta1a
- `POST https://pubsub.googleapis.com/v1beta1a/subscriptions/pullBatch`
- Pulls messages from the server. Returns an empty list if there are no messages available in the backlog. The system is free to return UNAVAILABLE if there are too many pull requests outstanding for the given subscription.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `PullBatchRequest`; Response: `PullBatchResponse`

### `pubsub.topics.create`

- Versions: v1beta1a
- `POST https://pubsub.googleapis.com/v1beta1a/topics`
- Creates the given topic with the given name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `Topic`; Response: `Topic`

### `pubsub.topics.delete`

- Versions: v1beta1a
- `DELETE https://pubsub.googleapis.com/v1beta1a/topics/{+topic}`
- Deletes the topic with the given name. Returns NOT_FOUND if the topic does not exist. After a topic is deleted, a new topic may be created with the same name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `topic` | path | string | yes | Name of the topic to delete. |

### `pubsub.topics.get`

- Versions: v1beta1a
- `GET https://pubsub.googleapis.com/v1beta1a/topics/{+topic}`
- Gets the configuration of a topic. Since the topic only has the name attribute, this method is only useful to check the existence of a topic. If other attributes are added in the future, they will be returned here.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `Topic`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `topic` | path | string | yes | The name of the topic to get. |

### `pubsub.topics.list`

- Versions: v1beta1a
- `GET https://pubsub.googleapis.com/v1beta1a/topics`
- Lists matching topics.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: —; Response: `ListTopicsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `maxResults` | query | integer (int32) | no | Maximum number of topics to return. |
| `pageToken` | query | string | no | The value obtained in the last ListTopicsResponse for continuation. |
| `query` | query | string | no | A valid label query expression. |

### `pubsub.topics.publish`

- Versions: v1beta1a
- `POST https://pubsub.googleapis.com/v1beta1a/topics/publish`
- Adds a message to the topic. Returns NOT_FOUND if the topic does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `PublishRequest`; Response: `Empty`

### `pubsub.topics.publishBatch`

- Versions: v1beta1a
- `POST https://pubsub.googleapis.com/v1beta1a/topics/publishBatch`
- Adds one or more messages to the topic. Returns NOT_FOUND if the topic does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/pubsub`
- Request: `PublishBatchRequest`; Response: `PublishBatchResponse`

### Example request skeleton

Generated from the Discovery entry of `pubsub.projects.schemas.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://pubsub.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta2, v1beta1a of `pubsub` (retrieved 2026-11-14). Resources on this page: projects, subscriptions, topics.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Path variables described as "Optional" in the Discovery document are still required by the route shown, so they are `yes` in the Required column: `name` in `pubsub.projects.snapshots.patch`. The description refers to the field in the request message; the Discovery document defines no URL without that segment. Where a sibling method covers an alternative parent (another resource's method listed separately), call that method's route instead.
- Regional endpoints: the Discovery document (`pubsub` v1, revision 20261027) also lists 47 endpoints of the form `https://pubsub.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west15`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://pubsub.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://pubsub.africa-south1.rep.googleapis.com/`) and keep the path.
- Source: https://pubsub.googleapis.com/$discovery/rest?version=v1, https://pubsub.googleapis.com/$discovery/rest?version=v1beta2, https://pubsub.googleapis.com/$discovery/rest?version=v1beta1a (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

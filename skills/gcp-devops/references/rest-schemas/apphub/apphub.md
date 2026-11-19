---
source: https://apphub.googleapis.com/$discovery/rest?version=v1
---

# App Hub API message schemas (apphub)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/apphub/`.

### `Application`

- Application defines the governance boundary for App Hub entities that perform a logical end-to-end business function. App Hub supports application level IAM permission to align with governance requirements.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applicationProperties` | ApplicationProperties | Output only. Properties of an underlying cloud resource that can comprise an Application. |
| `applicationType` | ApplicationType | Output only. Application type. |
| `attributes` | Attributes | Optional. Consumer provided attributes. |
| `createTime` | string (google-datetime) | Output only. Create time. |
| `description` | string | Optional. User-defined description of an Application. Can have a maximum length of 2048 characters. |
| `displayName` | string | Optional. User-defined name for the Application. Can have a maximum length of 63 characters. |
| `name` | string | Identifier. The resource name of an Application. Format: `"projects/{host-project-id}/locations/{location}/applications/{application-id}"` |
| `scope` | Scope | Required. Immutable. Defines what data can be included into this Application. Limits which Services and Workloads can be registered. |
| `state` | string enum | Output only. Application state. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`. |
| `uid` | string | Output only. A universally unique identifier (in UUID4 format) for the `Application`. |
| `updateTime` | string (google-datetime) | Output only. Update time. |

### `ApplicationProperties`

- Additional system properties of an Application.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `extendedMetadata` | object | Output only. Additional metadata specific to the App Hub application. The key is a string that identifies the type of metadata and the value is the metadata contents specific to that type. Key format: `apphub.googleapis.com/{metadataType}` |

### `ApplicationType`

- Application type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | The type of the application. Values: `TYPE_UNSPECIFIED`, `AI_APPLICATION`. |

### `Attributes`

- Consumer provided attributes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `businessOwners` | array<ContactInfo> | Optional. Business team that ensures user needs are met and value is delivered |
| `criticality` | Criticality | Optional. User-defined criticality information. |
| `developerOwners` | array<ContactInfo> | Optional. Developer team that owns development and coding. |
| `environment` | Environment | Optional. User-defined environment information. |
| `operatorOwners` | array<ContactInfo> | Optional. Operator team that ensures runtime and operations. |

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `Boundary`

- Application management boundary.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create time. |
| `crmNode` | string | Optional. The resource name of the CRM node being attached to the boundary. Format: `projects/{project-number}` or `projects/{project-id}` |
| `name` | string | Identifier. The resource name of the boundary. Format: "projects/{project}/locations/{location}/boundary" |
| `type` | string enum | Output only. Boundary type. Values: `TYPE_UNSPECIFIED`, `AUTOMATIC`, `MANUAL`, `MANAGED_AUTOMATIC`. |
| `updateTime` | string (google-datetime) | Output only. Update time. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `Channel`

- Separate message to accommodate custom formats across IRC and Slack.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `uri` | string | Required. URI of the channel. |

### `ContactInfo`

- Contact information of stakeholders.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Optional. Contact's name. Can have a maximum length of 63 characters. |
| `email` | string | Required. Email address of the contacts. |

### `ContactInfo` (v1alpha)

- Contact information of stakeholders.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `channel` | Channel | Optional. Communication channel of the contacts. |
| `displayName` | string | Optional. Contact's name. Can have a maximum length of 63 characters. |
| `email` | string | Required. Email address of the contacts. |

### `Criticality`

- Criticality of the Application, Service, or Workload
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Required. Criticality Type. Values: `TYPE_UNSPECIFIED`, `MISSION_CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |

### `Criticality` (v1alpha)

- Criticality of the Application, Service, or Workload
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `level` | string | Optional. Criticality level. Can contain only lowercase letters, numeric characters, underscores, and dashes. Can have a maximum length of 63 characters. Deprecated: Please refer to type instead. |
| `missionCritical` | boolean | Optional. Indicates mission-critical Application, Service, or Workload. Deprecated: Please refer to type instead. |
| `type` | string enum | Required. Criticality Type. Values: `TYPE_UNSPECIFIED`, `MISSION_CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |

### `DetachServiceProjectAttachmentRequest`

- Request for DetachServiceProjectAttachment.
- Version: v1

### `DetachServiceProjectAttachmentResponse`

- Response for DetachServiceProjectAttachment.
- Version: v1

### `DiscoveredService`

- DiscoveredService is a network or API interface that exposes some functionality to clients for consumption over the network. A discovered service can be registered to a App Hub service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The resource name of the discovered service. Format: `"projects/{host-project-id}/locations/{location}/discoveredServices/{uuid}"` |
| `serviceProperties` | ServiceProperties | Output only. Properties of an underlying compute resource that can comprise a Service. These are immutable. |
| `serviceReference` | ServiceReference | Output only. Reference to an underlying networking resource that can comprise a Service. These are immutable. |

### `DiscoveredWorkload`

- DiscoveredWorkload is a binary deployment (such as managed instance groups (MIGs) and GKE deployments) that performs the smallest logical subset of business functionality. A discovered workload can be registered to an App Hub Workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The resource name of the discovered workload. Format: `"projects/{host-project-id}/locations/{location}/discoveredWorkloads/{uuid}"` |
| `workloadProperties` | WorkloadProperties | Output only. Properties of an underlying compute resource represented by the Workload. These are immutable. |
| `workloadReference` | WorkloadReference | Output only. Reference of an underlying compute resource represented by the Workload. These are immutable. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Environment`

- Environment of the Application, Service, or Workload
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Required. Environment Type. Values: `TYPE_UNSPECIFIED`, `PRODUCTION`, `STAGING`, `TEST`, `DEVELOPMENT`. |

### `Environment` (v1alpha)

- Environment of the Application, Service, or Workload
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `environment` | string | Optional. Environment name. Can contain only lowercase letters, numeric characters, underscores, and dashes. Can have a maximum length of 63 characters. Deprecated: Please refer to type instead. |
| `type` | string enum | Required. Environment Type. Values: `TYPE_UNSPECIFIED`, `PRODUCTION`, `STAGING`, `TEST`, `DEVELOPMENT`. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `ExtendedMetadata`

- Additional metadata for a Service or Workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metadataStruct` | object | Output only. The metadata contents. |

### `ExtendedMetadataSchema`

- ExtendedMetadataSchema represents a schema for extended metadata of a service or workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jsonSchema` | string | Output only. The JSON schema as a string. |
| `name` | string | Identifier. Resource name of the schema. Format: projects//locations//extendedMetadataSchemas/ |
| `schemaVersion` | string (int64) | Output only. The version of the schema. New versions are required to be backwards compatible. |

### `FindUnregisteredServicesResponse`

- Response for FindUnregisteredServices.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `discoveredServices` | array<DiscoveredService> | List of Discovered Services. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `FindUnregisteredWorkloadsResponse`

- Response for FindUnregisteredWorkloads.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `discoveredWorkloads` | array<DiscoveredWorkload> | List of Discovered Workloads. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `FunctionalType`

- The functional type of a service or workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Output only. The functional type of a service or workload. Values: `TYPE_UNSPECIFIED`, `AGENT`, `MCP_SERVER`, `ENDPOINT`. |

### `Identity`

- The identity associated with a service or workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `principal` | string | Output only. The principal of the identity. Supported formats: \* `sa://my-sa@PROJECT_ID.iam.gserviceaccount.com` for GCP Service Account \* `principal://POOL_ID.global.PROJECT_NUMBER.workload.id.goog/ns/NAMESPACE_ID/sa/MANAGED_IDENTITY_ID` for Managed Workload Identity |

### `ListApplicationsResponse`

- Response for ListApplications.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applications` | array<Application> | List of Applications. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListDiscoveredServicesResponse`

- Response for ListDiscoveredServices.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `discoveredServices` | array<DiscoveredService> | List of Discovered Services. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListDiscoveredWorkloadsResponse`

- Response for ListDiscoveredWorkloads.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `discoveredWorkloads` | array<DiscoveredWorkload> | List of Discovered Workloads. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListExtendedMetadataSchemasResponse`

- Response for ListExtendedMetadataSchemas.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `extendedMetadataSchemas` | array<ExtendedMetadataSchema> | List of Extended Metadata Schemas. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListServiceProjectAttachmentsResponse`

- Response for ListServiceProjectAttachments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `serviceProjectAttachments` | array<ServiceProjectAttachment> | List of service project attachments. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListServicesResponse`

- Response for ListServices.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `services` | array<Service> | List of Services. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListWorkloadsResponse`

- Response for ListWorkloads.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |
| `workloads` | array<Workload> | List of Workloads. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `LookupDiscoveredServiceResponse`

- Response for LookupDiscoveredService.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `discoveredService` | DiscoveredService | Discovered Service if exists, empty otherwise. |

### `LookupDiscoveredWorkloadResponse`

- Response for LookupDiscoveredWorkload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `discoveredWorkload` | DiscoveredWorkload | Discovered Workload if exists, empty otherwise. |

### `LookupServiceProjectAttachmentResponse`

- Response for LookupServiceProjectAttachment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceProjectAttachment` | ServiceProjectAttachment | Service project attachment for a project if exists, empty otherwise. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `ReconciliationOperationMetadata`

- Operation metadata returned by the CLH during resource state reconciliation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deleteResource` | boolean | DEPRECATED. Use exclusive_action instead. |
| `exclusiveAction` | string enum | Excluisive action returned by the CLH. Values: `UNKNOWN_REPAIR_ACTION`, `DELETE`, `RETRY`. |

### `RegistrationType`

- The registration type of a service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Output only. The registration type of a service. Values: `TYPE_UNSPECIFIED`, `EXCLUSIVE`, `SHARED`. |

### `Scope`

- Scope of an application.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Required. Scope Type. Values: `TYPE_UNSPECIFIED`, `REGIONAL`, `GLOBAL`. |

### `Service`

- Service is an App Hub data model that contains a discovered service, which represents a network or API interface that exposes some functionality to clients for consumption over the network.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | Attributes | Optional. Consumer provided attributes. |
| `createTime` | string (google-datetime) | Output only. Create time. |
| `description` | string | Optional. User-defined description of a Service. Can have a maximum length of 2048 characters. |
| `discoveredService` | string | Required. Immutable. The resource name of the original discovered service. |
| `displayName` | string | Optional. User-defined name for the Service. Can have a maximum length of 63 characters. |
| `name` | string | Identifier. The resource name of a Service. Format: `"projects/{host-project-id}/locations/{location}/applications/{application-id}/services/{service-id}"` |
| `serviceProperties` | ServiceProperties | Output only. Properties of an underlying compute resource that can comprise a Service. These are immutable. |
| `serviceReference` | ServiceReference | Output only. Reference to an underlying networking resource that can comprise a Service. These are immutable. |
| `state` | string enum | Output only. Service state. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `DETACHED`. |
| `uid` | string | Output only. A universally unique identifier (UUID) for the `Service` in the UUID4 format. |
| `updateTime` | string (google-datetime) | Output only. Update time. |

### `ServiceProjectAttachment`

- ServiceProjectAttachment represents an attachment from a service project to a host project. Service projects contain the underlying cloud infrastructure resources, and expose these resources to the host project through a ServiceProjectAttachment. With the attachments, the host project can provide an aggregated view of resources across all service projects.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create time. |
| `name` | string | Identifier. The resource name of a ServiceProjectAttachment. Format: `"projects/{host-project-id}/locations/global/serviceProjectAttachments/{service-project-id}."` |
| `serviceProject` | string | Required. Immutable. Service project name in the format: `"projects/abc"` or `"projects/123"`. As input, project name with either project id or number are accepted. As output, this field will contain project number. |
| `state` | string enum | Output only. ServiceProjectAttachment state. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`. |
| `uid` | string | Output only. A globally unique identifier (in UUID4 format) for the `ServiceProjectAttachment`. |

### `ServiceProperties`

- Properties of an underlying cloud resource that can comprise a Service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `extendedMetadata` | object | Output only. Additional metadata specific to the resource type. The key is a string that identifies the type of metadata and the value is the metadata contents specific to that type. Key format: `apphub.googleapis.com/{metadataType}` |
| `functionalType` | FunctionalType | Output only. The type of the service. |
| `gcpProject` | string | Output only. The service project identifier that the underlying cloud resource resides in. |
| `identity` | Identity | Output only. The identity associated with the service. |
| `location` | string | Output only. The location that the underlying resource resides in, for example, us-west1. |
| `registrationType` | RegistrationType | Output only. The registration type of the service. |
| `zone` | string | Output only. The location that the underlying resource resides in if it is zonal, for example, us-west1-a). |

### `ServiceReference`

- Reference to an underlying networking resource that can comprise a Service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | Output only. The underlying resource URI. For example, URI of Forwarding Rule, URL Map, and Backend Service. |

### `ServiceReference` (v1alpha)

- Reference to an underlying networking resource that can comprise a Service.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `path` | string | Output only. Additional path under the resource URI (demultiplexing one resource URI into multiple entries). Smallest unit a policy can be attached to. Examples: URL Map path entry. |
| `uri` | string | Output only. The underlying resource URI. For example, URI of Forwarding Rule, URL Map, and Backend Service. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `Workload`

- Workload is an App Hub data model that contains a discovered workload, which represents a binary deployment (such as managed instance groups (MIGs) and GKE deployments) that performs the smallest logical subset of business functionality.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | Attributes | Optional. Consumer provided attributes. |
| `createTime` | string (google-datetime) | Output only. Create time. |
| `description` | string | Optional. User-defined description of a Workload. Can have a maximum length of 2048 characters. |
| `discoveredWorkload` | string | Required. Immutable. The resource name of the original discovered workload. |
| `displayName` | string | Optional. User-defined name for the Workload. Can have a maximum length of 63 characters. |
| `name` | string | Identifier. The resource name of the Workload. Format: `"projects/{host-project-id}/locations/{location}/applications/{application-id}/workloads/{workload-id}"` |
| `state` | string enum | Output only. Workload state. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `DETACHED`. |
| `uid` | string | Output only. A universally unique identifier (UUID) for the `Workload` in the UUID4 format. |
| `updateTime` | string (google-datetime) | Output only. Update time. |
| `workloadProperties` | WorkloadProperties | Output only. Properties of an underlying compute resource represented by the Workload. These are immutable. |
| `workloadReference` | WorkloadReference | Output only. Reference of an underlying compute resource represented by the Workload. These are immutable. |

### `WorkloadProperties`

- Properties of an underlying compute resource represented by the Workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `extendedMetadata` | object | Output only. Additional metadata specific to the resource type. The key is a string that identifies the type of metadata and the value is the metadata contents specific to that type. Key format: `apphub.googleapis.com/{metadataType}` |
| `functionalType` | FunctionalType | Output only. The type of the workload. |
| `gcpProject` | string | Output only. The service project identifier that the underlying cloud resource resides in. Empty for non-cloud resources. |
| `identity` | Identity | Output only. The identity associated with the workload. |
| `location` | string | Output only. The location that the underlying compute resource resides in (for example, us-west1). |
| `zone` | string | Output only. The location that the underlying compute resource resides in if it is zonal (for example, us-west1-a). |

### `WorkloadReference`

- Reference of an underlying compute resource represented by the Workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | Output only. The underlying compute resource uri. |

### Shape of `Application`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "applicationProperties": "ApplicationProperties",
  "applicationType": "ApplicationType",
  "attributes": "Attributes",
  "createTime": "string (google-datetime)",
  "description": "string",
  "displayName": "string",
  "name": "string",
  "scope": "Scope",
  "state": "string enum",
  "uid": "string",
  "updateTime": "string (google-datetime)"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1alpha of `apphub` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://apphub.googleapis.com/$discovery/rest?version=v1, https://apphub.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

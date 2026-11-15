---
source: https://cloudfunctions.googleapis.com/$discovery/rest?version=v2
---

# Cloud Functions API message schemas (cloudfunctions)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudfunctions/`.

### `AbortFunctionUpgradeRequest`

- Request for the `AbortFunctionUpgrade` method.
- Version: v2

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `AutomaticUpdatePolicy`

- Security patches are applied automatically to the runtime without requiring the function to be redeployed.
- Version: v2

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `BuildConfig`

- Describes the Build step of the function that builds a container from the given source.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `automaticUpdatePolicy` | AutomaticUpdatePolicy | — |
| `build` | string | Output only. The Cloud Build name of the latest successful deployment of the function. |
| `dockerRegistry` | string enum | Docker Registry to use for this deployment. This configuration is only applicable to 1st Gen functions, 2nd Gen functions can only use Artifact Registry. Deprecated: as of March 2025, `CONTAINER_REGISTRY` option is no longer available in response to Container Registry's deprecation: https://cloud.google.com/artifact-registry/docs/transition/transition-from-gcr Please use Artifact Registry instead, which is the default choice. If unspecified, it defaults to `ARTIFACT_REGISTRY`. If `docker_repository` field is specified, this field should either be left unspecified or set to `ARTIFACT_REGISTRY`. Values: `DOCKER_REGISTRY_UNSPECIFIED`, `CONTAINER_REGISTRY`, `ARTIFACT_REGISTRY`. |
| `dockerRepository` | string | Repository in Artifact Registry to which the function docker image will be pushed after it is built by Cloud Build. If specified by user, it is created and managed by user with a customer managed encryption key. Otherwise, GCF will create and use a repository named 'gcf-artifacts' for every deployed region. It must match the pattern `projects/{project}/locations/{location}/repositories/{repository}`. Repository format must be 'DOCKER'. |
| `entryPoint` | string | The name of the function (as defined in source code) that will be executed. Defaults to the resource name suffix, if not specified. For backward compatibility, if function with given name is not found, then the system will try to use function named "function". For Node.js this is name of a function exported by the module specified in `source_location`. |
| `environmentVariables` | object | User-provided build-time environment variables for the function |
| `onDeployUpdatePolicy` | OnDeployUpdatePolicy | — |
| `runtime` | string | The runtime in which to run the function. Required when deploying a new function, optional when updating an existing function. For a complete list of possible choices, see the `gcloud` command reference (https://cloud.google.com/sdk/gcloud/reference/functions/deploy#--runtime). |
| `serviceAccount` | string | Service account to be used for building the container. The format of this field is `projects/{projectId}/serviceAccounts/{serviceAccountEmail}`. |
| `source` | Source | The location of the function source code. |
| `sourceProvenance` | SourceProvenance | Output only. A permanent fixed identifier for source. |
| `sourceToken` | string | An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments. |
| `workerPool` | string | Name of the Cloud Build private pool that should be used to build the function. The format of this field is `projects/{project}/locations/{region}/workerPools/{workerPool}` where {project} and {region} are the project id and region respectively where the worker pool is defined and {workerPool} is the short name of the worker pool. If the project id is not the same as the function, then the Cloud Functions Service Agent (service-@gcf-admin-robot.iam.gserviceaccount.com) must be granted the role Cloud Build Custom Workers Builder (roles/cloudbuild.customworkers.builder) in the project. |

### `BuildConfigOverrides`

- Contains overrides related to the function's build configuration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `runtime` | string | Optional. Specifies the desired runtime for the new Cloud Run function. (e.g., `"nodejs20"`, `"python312"`). Constraints: 1. This field CANNOT be used to change the runtime language (e.g., from `NODEJS` to `PYTHON`). The backend will enforce this. 2. This field can ONLY be used to upgrade the runtime version (e.g., `nodejs18` to `nodejs20`). Downgrading the version is not permitted. The backend will validate the version change. If provided and valid, this overrides the runtime of the Gen1 function. |

### `CallFunctionRequest`

- Request for the `CallFunction` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | string | Required. Input to be passed to the function. |

### `CallFunctionResponse`

- Response of `CallFunction` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | string | Either system or user-function generated error. Set if execution was not successful. |
| `executionId` | string | Execution id of function invocation. |
| `result` | string | Result populated for successful execution of synchronous function. Will not be populated if function does not return a result through context. |

### `CloudFunction`

- Describes a Cloud Function that contains user computation executed in response to an event. It encapsulate function and triggers configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automaticUpdatePolicy` | AutomaticUpdatePolicy | — |
| `availableMemoryMb` | integer (int32) | The amount of memory in MB available for a function. Defaults to 256MB. |
| `buildEnvironmentVariables` | object | Build environment variables that shall be available during build time. |
| `buildId` | string | Output only. The Cloud Build ID of the latest successful deployment of the function. |
| `buildName` | string | Output only. The Cloud Build Name of the function deployment. `projects//locations//builds/`. |
| `buildServiceAccount` | string | A service account the user provides for use with Cloud Build. The format of this field is `projects/{projectId}/serviceAccounts/{serviceAccountEmail}`. |
| `buildWorkerPool` | string | Name of the Cloud Build private pool that should be used to build the function. The format of this field is `projects/{project}/locations/{region}/workerPools/{workerPool}` where `{project}` and `{region}` are the project id and region respectively where the worker pool is defined and `{workerPool}` is the short name of the worker pool. If the project id is not the same as the function, then the Cloud Functions Service Agent (`service-@gcf-admin-robot.iam.gserviceaccount.com`) must be granted the role Cloud Build Custom Workers Builder (`roles/cloudbuild.customworkers.builder`) in the project. |
| `description` | string | User-provided description of a function. |
| `dockerRegistry` | string enum | Docker Registry to use for this deployment. Deprecated: as of March 2025, `CONTAINER_REGISTRY` option is no longer available in response to Container Registry's deprecation: https://cloud.google.com/artifact-registry/docs/transition/transition-from-gcr Please use Artifact Registry instead, which is the default choice. If unspecified, it defaults to `ARTIFACT_REGISTRY`. If `docker_repository` field is specified, this field should either be left unspecified or set to `ARTIFACT_REGISTRY`. Values: `DOCKER_REGISTRY_UNSPECIFIED`, `CONTAINER_REGISTRY`, `ARTIFACT_REGISTRY`. |
| `dockerRepository` | string | User-managed repository created in Artifact Registry to which the function's Docker image will be pushed after it is built by Cloud Build. May optionally be encrypted with a customer-managed encryption key (CMEK). If unspecified and `docker_registry` is not explicitly set to `CONTAINER_REGISTRY`, GCF will create and use a default Artifact Registry repository named 'gcf-artifacts' in the region. It must match the pattern `projects/{project}/locations/{location}/repositories/{repository}`. Cross-project repositories are not supported. Cross-location repositories are not supported. Repository format must be 'DOCKER'. |
| `entryPoint` | string | The name of the function (as defined in source code) that will be executed. Defaults to the resource name suffix (ID of the function), if not specified. |
| `environmentVariables` | object | Environment variables that shall be available during function execution. |
| `eventTrigger` | EventTrigger | A source that fires events in response to a condition in another service. |
| `httpsTrigger` | HttpsTrigger | An HTTPS endpoint type of source that can be triggered via URL. |
| `ingressSettings` | string enum | The ingress settings for the function, controlling what traffic can reach it. Values: `INGRESS_SETTINGS_UNSPECIFIED`, `ALLOW_ALL`, `ALLOW_INTERNAL_ONLY`, `ALLOW_INTERNAL_AND_GCLB`. |
| `kmsKeyName` | string | Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt function resources. It must match the pattern `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. If specified, you must also provide an artifact registry repository using the `docker_repository` field that was created with the same KMS crypto key. The following service accounts need to be granted the role 'Cloud KMS CryptoKey Encrypter/Decrypter (roles/cloudkms.cryptoKeyEncrypterDecrypter)' on the Key/KeyRing/Project/Organization (least access preferred). 1. Google Cloud Functions service account (service-{project_number}@gcf-admin-robot.iam.gserviceaccount.com) - Required to protect the function's image. 2. Google Storage service account (service-{project_number}@gs-project-accounts.iam.gserviceaccount.com) - Required to protect the function's source code. If this service account does not exist, deploying a function without a KMS key or retrieving the service agent name provisions it. For more information, see https://cloud.google.com/storage/docs/projects#service-agents and https://cloud.google.com/storage/docs/getting-service-agent#gsutil. Google Cloud Functions delegates access to service agents to protect function resources in internal projects that are not accessible by the end user. |
| `labels` | object | Labels associated with this Cloud Function. |
| `maxInstances` | integer (int32) | The limit on the maximum number of function instances that may coexist at a given time. In some cases, such as rapid traffic surges, Cloud Functions may, for a short period of time, create more instances than the specified max instances limit. If your function cannot tolerate this temporary behavior, you may want to factor in a safety margin and set a lower max instances value than your function can tolerate. See the Max Instances (https://cloud.google.com/functions/docs/max-instances) Guide for more details. |
| `minInstances` | integer (int32) | A lower bound for the number function instances that may coexist at a given time. |
| `name` | string | A user-defined name of the function. Function names must be unique globally and match pattern `projects/*/locations/*/functions/*` |
| `network` | string | Deprecated: use vpc_connector |
| `onDeployUpdatePolicy` | OnDeployUpdatePolicy | — |
| `runtime` | string | The runtime in which to run the function. Required when deploying a new function, optional when updating an existing function. For a complete list of possible choices, see the `gcloud` command reference (https://cloud.google.com/sdk/gcloud/reference/functions/deploy#--runtime). |
| `satisfiesPzi` | boolean | Output only. |
| `satisfiesPzs` | boolean | Output only. |
| `secretEnvironmentVariables` | array<SecretEnvVar> | Secret environment variables configuration. |
| `secretVolumes` | array<SecretVolume> | Secret volumes configuration. |
| `serviceAccountEmail` | string | The email of the function's service account. If empty, defaults to `{project_id}@appspot.gserviceaccount.com`. |
| `sourceArchiveUrl` | string | The Google Cloud Storage URL, starting with `gs://`, pointing to the zip archive which contains the function. |
| `sourceRepository` | SourceRepository | \*\*Beta Feature\*\* The source repository where a function is hosted. |
| `sourceToken` | string | Input only. An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments. |
| `sourceUploadUrl` | string | The Google Cloud Storage signed URL used for source uploading, generated by calling \[google.cloud.functions.v1.GenerateUploadUrl\]. The signature is validated on write methods (Create, Update) The signature is stripped from the Function object on read methods (Get, List) |
| `status` | string enum | Output only. Status of the function deployment. Values: `CLOUD_FUNCTION_STATUS_UNSPECIFIED`, `ACTIVE`, `OFFLINE`, `DEPLOY_IN_PROGRESS`, `DELETE_IN_PROGRESS`, `UNKNOWN`. |
| `timeout` | string (google-duration) | The function execution timeout. Execution is considered failed and can be terminated if the function is not completed at the end of the timeout period. Defaults to 60 seconds. |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of a Cloud Function. |
| `versionId` | string (int64) | Output only. The version identifier of the Cloud Function. Each deployment attempt results in a new version of a function being created. |
| `vpcConnector` | string | The VPC Network Connector that this cloud function can connect to. It can be either the fully-qualified URI, or the short name of the network connector resource. The format of this field is `projects/*/locations/*/connectors/*` This field is mutually exclusive with `network` field and will eventually replace it. See the VPC documentation (https://cloud.google.com/compute/docs/vpc) for more information on connecting Cloud projects. |
| `vpcConnectorEgressSettings` | string enum | The egress settings for the connector, controlling what traffic is diverted through it. Values: `VPC_CONNECTOR_EGRESS_SETTINGS_UNSPECIFIED`, `PRIVATE_RANGES_ONLY`, `ALL_TRAFFIC`. |

### `CommitFunctionUpgradeAsGen2Request`

- Request for the `CommitFunctionUpgradeAsGen2` method.
- Version: v2

### `CommitFunctionUpgradeRequest`

- Request for the `CommitFunctionUpgrade` method.
- Version: v2

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v2

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `DetachFunctionRequest`

- Request for the `DetachFunction` method.
- Version: v2

### `DirectVpcNetworkInterface`

- The Direct VPC network interface. This is mutually exclusive with VPC Connector.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `network` | string | Optional. The name of the VPC network to which the function will be connected. Specify either a VPC network or a subnet, or both. If you specify only a network, the subnet uses the same name as the network. |
| `subnetwork` | string | Optional. The name of the VPC subnetwork that the Cloud Function resource will get IPs from. Specify either a VPC network or a subnet, or both. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If subnetwork is not specified, the subnetwork with the same name with the network will be used. |
| `tags` | array<string> | Optional. Network tags applied to this Cloud Function resource. |

### `EventFilter`

- Filters events based on exact matches on the CloudEvents attributes.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `attribute` | string | Required. The name of a CloudEvents attribute. |
| `operator` | string | Optional. The operator used for matching the events with the value of the filter. If not specified, only events that have an exact key-value pair specified in the filter are matched. The only allowed value is `match-path-pattern`. |
| `value` | string | Required. The value for the attribute. |

### `EventTrigger`

- Describes EventTrigger, used to request events to be sent from another service.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `channel` | string | Optional. The name of the channel associated with the trigger in `projects/{project}/locations/{location}/channels/{channel}` format. You must provide a channel to receive events from Eventarc SaaS partners. |
| `eventFilters` | array<EventFilter> | Criteria used to filter events. |
| `eventType` | string | Required. The type of event to observe. For example: `google.cloud.audit.log.v1.written` or `google.cloud.pubsub.topic.v1.messagePublished`. |
| `pubsubTopic` | string | Optional. The name of a Pub/Sub topic in the same project that will be used as the transport topic for the event delivery. Format: `projects/{project}/topics/{topic}`. This is only valid for events of type `google.cloud.pubsub.topic.v1.messagePublished`. The topic provided here will not be deleted at function deletion. |
| `retryPolicy` | string enum | Optional. If unset, then defaults to ignoring failures (i.e. not retrying them). Values: `RETRY_POLICY_UNSPECIFIED`, `RETRY_POLICY_DO_NOT_RETRY`, `RETRY_POLICY_RETRY`. |
| `service` | string | Optional. The hostname of the service that 1st Gen function should be observed. If no string is provided, the default service implementing the API will be used. For example, `storage.googleapis.com` is the default for all event types in the `google.storage` namespace. The field is only applicable to 1st Gen functions. |
| `serviceAccountEmail` | string | Optional. The email of the trigger's service account. The service account must have permission to invoke Cloud Run services, the permission is `run.routes.invoke`. If empty, defaults to the Compute Engine default service account: `{project_number}-compute@developer.gserviceaccount.com`. |
| `trigger` | string | Output only. The resource name of the Eventarc trigger. The format of this field is `projects/{project}/locations/{region}/triggers/{trigger}`. |
| `triggerRegion` | string | The region that the trigger will be in. The trigger will only receive events originating in this region. It can be the same region as the function, a different region or multi-region, or the global region. If not provided, defaults to the same region as the function. |

### `EventTrigger` (v1)

- Describes EventTrigger, used to request events be sent from another service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventType` | string | Required. The type of event to observe. For example: `providers/cloud.storage/eventTypes/object.change` and `providers/cloud.pubsub/eventTypes/topic.publish`. Event types match pattern `providers/*/eventTypes/*.*`. The pattern contains: 1. namespace: For example, `cloud.storage` and `google.firebase.analytics`. 2. resource type: The type of resource on which event occurs. For example, the Google Cloud Storage API includes the type `object`. 3. action: The action that generates the event. For example, action for a Google Cloud Storage Object is 'change'. These parts are lower case. |
| `failurePolicy` | FailurePolicy | Specifies policy for failed executions. |
| `resource` | string | Required. The resource(s) from which to observe events, for example, `projects/_/buckets/myBucket`. Not all syntactically correct values are accepted by all services. For example: 1. The authorization model must support it. Google Cloud Functions only allows EventTriggers to be deployed that observe resources in the same project as the `CloudFunction`. 2. The resource type must match the pattern expected for an `event_type`. For example, an `EventTrigger` that has an `event_type` of "google.pubsub.topic.publish" should have a resource that matches Google Cloud Pub/Sub topics. Additionally, some services may support short names when creating an `EventTrigger`. These will always be returned in the normalized "long" format. See each \*service's\* documentation for supported formats. |
| `service` | string | The hostname of the service that should be observed. If no string is provided, the default service implementing the API will be used. For example, `storage.googleapis.com` is the default for all event types in the `google.storage` namespace. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `FailurePolicy`

- Describes the policy in case of function's execution failure. If empty, then defaults to ignoring failures (i.e. not retrying them).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `retry` | Retry | If specified, then the function will be retried in case of a failure. |

### `Function`

- Describes a Cloud Function that contains user computation executed in response to an event. It encapsulates function and trigger configurations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `buildConfig` | BuildConfig | Describes the Build step of the function that builds a container from the given source. |
| `createTime` | string (google-datetime) | Output only. The create timestamp of a Cloud Function. This is only applicable to 2nd Gen functions. |
| `description` | string | User-provided description of a function. |
| `environment` | string enum | Describe whether the function is 1st Gen or 2nd Gen. Values: `ENVIRONMENT_UNSPECIFIED`, `GEN_1`, `GEN_2`. |
| `eventTrigger` | EventTrigger | An Eventarc trigger managed by Google Cloud Functions that fires events in response to a condition in another service. |
| `kmsKeyName` | string | Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt function resources. It must match the pattern `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. |
| `labels` | object | Labels associated with this Cloud Function. |
| `name` | string | A user-defined name of the function. Function names must be unique globally and match pattern `projects/*/locations/*/functions/*` |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `serviceConfig` | ServiceConfig | Describes the Service being deployed. Currently deploys services to Cloud Run (fully managed). |
| `state` | string enum | Output only. State of the function. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `FAILED`, `DEPLOYING`, `DELETING`, `UNKNOWN`, `DETACHING`, `DETACH_FAILED`. |
| `stateMessages` | array<GoogleCloudFunctionsV2StateMessage> | Output only. State Messages for this Cloud Function. |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of a Cloud Function. |
| `upgradeInfo` | UpgradeInfo | Output only. UpgradeInfo for this Cloud Function |
| `url` | string | Output only. The deployed url for the function. |

### `Function` (v2alpha)

- Describes a Cloud Function that contains user computation executed in response to an event. It encapsulates function and trigger configurations.
- Version: v2alpha

| Field | Type | Description |
|---|---|---|
| `buildConfig` | BuildConfig | Describes the Build step of the function that builds a container from the given source. |
| `createTime` | string (google-datetime) | Output only. The create timestamp of a Cloud Function. This is only applicable to 2nd Gen functions. |
| `description` | string | User-provided description of a function. |
| `environment` | string enum | Describe whether the function is 1st Gen or 2nd Gen. Values: `ENVIRONMENT_UNSPECIFIED`, `GEN_1`, `GEN_2`. |
| `eventTrigger` | EventTrigger | An Eventarc trigger managed by Google Cloud Functions that fires events in response to a condition in another service. |
| `kmsKeyName` | string | Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt function resources. It must match the pattern `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. |
| `labels` | object | Labels associated with this Cloud Function. |
| `name` | string | A user-defined name of the function. Function names must be unique globally and match pattern `projects/*/locations/*/functions/*` |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `serviceConfig` | ServiceConfig | Describes the Service being deployed. Currently deploys services to Cloud Run (fully managed). |
| `state` | string enum | Output only. State of the function. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `FAILED`, `DEPLOYING`, `DELETING`, `UNKNOWN`, `DETACHING`, `DETACH_FAILED`. |
| `stateMessages` | array<GoogleCloudFunctionsV2alphaStateMessage> | Output only. State Messages for this Cloud Function. |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of a Cloud Function. |
| `upgradeInfo` | UpgradeInfo | Output only. UpgradeInfo for this Cloud Function |
| `url` | string | Output only. The deployed url for the function. |

### `Function` (v2beta)

- Describes a Cloud Function that contains user computation executed in response to an event. It encapsulates function and trigger configurations.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `buildConfig` | BuildConfig | Describes the Build step of the function that builds a container from the given source. |
| `createTime` | string (google-datetime) | Output only. The create timestamp of a Cloud Function. This is only applicable to 2nd Gen functions. |
| `description` | string | User-provided description of a function. |
| `environment` | string enum | Describe whether the function is 1st Gen or 2nd Gen. Values: `ENVIRONMENT_UNSPECIFIED`, `GEN_1`, `GEN_2`. |
| `eventTrigger` | EventTrigger | An Eventarc trigger managed by Google Cloud Functions that fires events in response to a condition in another service. |
| `kmsKeyName` | string | Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt function resources. It must match the pattern `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. |
| `labels` | object | Labels associated with this Cloud Function. |
| `name` | string | A user-defined name of the function. Function names must be unique globally and match pattern `projects/*/locations/*/functions/*` |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `serviceConfig` | ServiceConfig | Describes the Service being deployed. Currently deploys services to Cloud Run (fully managed). |
| `state` | string enum | Output only. State of the function. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `FAILED`, `DEPLOYING`, `DELETING`, `UNKNOWN`, `DETACHING`, `DETACH_FAILED`. |
| `stateMessages` | array<GoogleCloudFunctionsV2betaStateMessage> | Output only. State Messages for this Cloud Function. |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of a Cloud Function. |
| `upgradeInfo` | UpgradeInfo | Output only. UpgradeInfo for this Cloud Function |
| `url` | string | Output only. The deployed url for the function. |

### `GenerateDownloadUrlRequest`

- Request of `GenerateDownloadUrl` method.
- Version: v2

### `GenerateDownloadUrlRequest` (v1)

- Request of `GenerateDownloadUrl` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `versionId` | string (uint64) | The optional version of function. If not set, default, current version is used. |

### `GenerateDownloadUrlResponse`

- Response of `GenerateDownloadUrl` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `downloadUrl` | string | The generated Google Cloud Storage signed URL that should be used for function source code download. |

### `GenerateUploadUrlRequest`

- Request of `GenerateSourceUploadUrl` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `environment` | string enum | The function environment the generated upload url will be used for. The upload url for 2nd Gen functions can also be used for 1st gen functions, but not vice versa. If not specified, 2nd generation-style upload URLs are generated. Values: `ENVIRONMENT_UNSPECIFIED`, `GEN_1`, `GEN_2`. |
| `kmsKeyName` | string | Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt function source code objects in intermediate Cloud Storage buckets. When you generate an upload url and upload your source code, it gets copied to an intermediate Cloud Storage bucket. The source code is then copied to a versioned directory in the sources bucket in the consumer project during the function deployment. It must match the pattern `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. The Google Cloud Functions service account (service-{project_number}@gcf-admin-robot.iam.gserviceaccount.com) must be granted the role 'Cloud KMS CryptoKey Encrypter/Decrypter (roles/cloudkms.cryptoKeyEncrypterDecrypter)' on the Key/KeyRing/Project/Organization (least access preferred). |

### `GenerateUploadUrlRequest` (v1)

- Request of `GenerateSourceUploadUrl` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt function source code objects in intermediate Cloud Storage buckets. When you generate an upload url and upload your source code, it gets copied to an intermediate Cloud Storage bucket. The source code is then copied to a versioned directory in the sources bucket in the consumer project during the function deployment. It must match the pattern `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. The Google Cloud Functions service account (service-{project_number}@gcf-admin-robot.iam.gserviceaccount.com) must be granted the role 'Cloud KMS CryptoKey Encrypter/Decrypter (roles/cloudkms.cryptoKeyEncrypterDecrypter)' on the Key/KeyRing/Project/Organization (least access preferred). GCF will delegate access to the Google Storage service account in the internal project. |

### `GenerateUploadUrlResponse`

- Response of `GenerateSourceUploadUrl` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `storageSource` | StorageSource | The location of the source code in the upload bucket. Once the archive is uploaded using the `upload_url` use this field to set the `function.build_config.source.storage_source` during CreateFunction and UpdateFunction. Generation defaults to 0, as Cloud Storage provides a new generation only upon uploading a new object or version of an object. |
| `uploadUrl` | string | The generated Google Cloud Storage signed URL that should be used for a function source code upload. The uploaded file should be a zip archive which contains a function. |

### `GenerateUploadUrlResponse` (v1)

- Response of `GenerateSourceUploadUrl` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uploadUrl` | string | The generated Google Cloud Storage signed URL that should be used for a function source code upload. The uploaded file should be a zip archive which contains a function. |

### `GoogleCloudFunctionsV2LocationMetadata`

- Extra GCF specific location information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `environments` | array<string> | The Cloud Function environments this location supports. Values: `ENVIRONMENT_UNSPECIFIED`, `GEN_1`, `GEN_2`. |

### `GoogleCloudFunctionsV2OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | API version used to start the operation. |
| `buildName` | string | The build name of the function for create and update operations. |
| `cancelRequested` | boolean | Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | The time the operation was created. |
| `customIamRoleDetected` | boolean | Output only. Whether a custom IAM role binding was detected during the upgrade. |
| `endTime` | string (google-datetime) | The time the operation finished running. |
| `operationType` | string enum | The operation type. Values: `OPERATIONTYPE_UNSPECIFIED`, `CREATE_FUNCTION`, `UPDATE_FUNCTION`, `DELETE_FUNCTION`, `REDIRECT_FUNCTION_UPGRADE_TRAFFIC`, `ROLLBACK_FUNCTION_UPGRADE_TRAFFIC`, `SETUP_FUNCTION_UPGRADE_CONFIG`, `ABORT_FUNCTION_UPGRADE`, `COMMIT_FUNCTION_UPGRADE`, `DETACH_FUNCTION`, `COMMIT_FUNCTION_UPGRADE_AS_GEN2`. |
| `requestResource` | object | The original request that started the operation. |
| `sourceToken` | string | An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments. |
| `stages` | array<GoogleCloudFunctionsV2Stage> | Mechanism for reporting in-progress stages |
| `statusDetail` | string | Human-readable status of the operation, if any. |
| `target` | string | Server-defined resource path for the target of the operation. |
| `verb` | string | Name of the verb executed by the operation. |

### `GoogleCloudFunctionsV2Stage`

- Each Stage of the deployment process
- Version: v2

| Field | Type | Description |
|---|---|---|
| `message` | string | Message describing the Stage |
| `name` | string enum | Name of the Stage. This will be unique for each Stage. Values: `NAME_UNSPECIFIED`, `ARTIFACT_REGISTRY`, `BUILD`, `SERVICE`, `TRIGGER`, `SERVICE_ROLLBACK`, `TRIGGER_ROLLBACK`. |
| `resource` | string | Resource of the Stage |
| `resourceUri` | string | Link to the current Stage resource |
| `state` | string enum | Current state of the Stage Values: `STATE_UNSPECIFIED`, `NOT_STARTED`, `IN_PROGRESS`, `COMPLETE`. |
| `stateMessages` | array<GoogleCloudFunctionsV2StateMessage> | State messages from the current Stage. |

### `GoogleCloudFunctionsV2StateMessage`

- Informational messages about the state of the Cloud Function or Operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `message` | string | The message. |
| `severity` | string enum | Severity of the state message. Values: `SEVERITY_UNSPECIFIED`, `ERROR`, `WARNING`, `INFO`. |
| `type` | string | One-word CamelCase type of the state message. |

### `GoogleCloudFunctionsV2alphaLocationMetadata`

- Extra GCF specific location information.
- Version: v2alpha

| Field | Type | Description |
|---|---|---|
| `environments` | array<string> | The Cloud Function environments this location supports. Values: `ENVIRONMENT_UNSPECIFIED`, `GEN_1`, `GEN_2`. |

### `GoogleCloudFunctionsV2alphaOperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v2alpha

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | API version used to start the operation. |
| `buildName` | string | The build name of the function for create and update operations. |
| `cancelRequested` | boolean | Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | The time the operation was created. |
| `customIamRoleDetected` | boolean | Output only. Whether a custom IAM role binding was detected during the upgrade. |
| `endTime` | string (google-datetime) | The time the operation finished running. |
| `operationType` | string enum | The operation type. Values: `OPERATIONTYPE_UNSPECIFIED`, `CREATE_FUNCTION`, `UPDATE_FUNCTION`, `DELETE_FUNCTION`, `REDIRECT_FUNCTION_UPGRADE_TRAFFIC`, `ROLLBACK_FUNCTION_UPGRADE_TRAFFIC`, `SETUP_FUNCTION_UPGRADE_CONFIG`, `ABORT_FUNCTION_UPGRADE`, `COMMIT_FUNCTION_UPGRADE`, `DETACH_FUNCTION`, `COMMIT_FUNCTION_UPGRADE_AS_GEN2`. |
| `requestResource` | object | The original request that started the operation. |
| `sourceToken` | string | An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments. |
| `stages` | array<GoogleCloudFunctionsV2alphaStage> | Mechanism for reporting in-progress stages |
| `statusDetail` | string | Human-readable status of the operation, if any. |
| `target` | string | Server-defined resource path for the target of the operation. |
| `verb` | string | Name of the verb executed by the operation. |

### `GoogleCloudFunctionsV2alphaStage`

- Each Stage of the deployment process
- Version: v2alpha

| Field | Type | Description |
|---|---|---|
| `message` | string | Message describing the Stage |
| `name` | string enum | Name of the Stage. This will be unique for each Stage. Values: `NAME_UNSPECIFIED`, `ARTIFACT_REGISTRY`, `BUILD`, `SERVICE`, `TRIGGER`, `SERVICE_ROLLBACK`, `TRIGGER_ROLLBACK`. |
| `resource` | string | Resource of the Stage |
| `resourceUri` | string | Link to the current Stage resource |
| `state` | string enum | Current state of the Stage Values: `STATE_UNSPECIFIED`, `NOT_STARTED`, `IN_PROGRESS`, `COMPLETE`. |
| `stateMessages` | array<GoogleCloudFunctionsV2alphaStateMessage> | State messages from the current Stage. |

### `GoogleCloudFunctionsV2alphaStateMessage`

- Informational messages about the state of the Cloud Function or Operation.
- Version: v2alpha

| Field | Type | Description |
|---|---|---|
| `message` | string | The message. |
| `severity` | string enum | Severity of the state message. Values: `SEVERITY_UNSPECIFIED`, `ERROR`, `WARNING`, `INFO`. |
| `type` | string | One-word CamelCase type of the state message. |

### `GoogleCloudFunctionsV2betaLocationMetadata`

- Extra GCF specific location information.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `environments` | array<string> | The Cloud Function environments this location supports. Values: `ENVIRONMENT_UNSPECIFIED`, `GEN_1`, `GEN_2`. |

### `GoogleCloudFunctionsV2betaOperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | API version used to start the operation. |
| `buildName` | string | The build name of the function for create and update operations. |
| `cancelRequested` | boolean | Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | The time the operation was created. |
| `customIamRoleDetected` | boolean | Output only. Whether a custom IAM role binding was detected during the upgrade. |
| `endTime` | string (google-datetime) | The time the operation finished running. |
| `operationType` | string enum | The operation type. Values: `OPERATIONTYPE_UNSPECIFIED`, `CREATE_FUNCTION`, `UPDATE_FUNCTION`, `DELETE_FUNCTION`, `REDIRECT_FUNCTION_UPGRADE_TRAFFIC`, `ROLLBACK_FUNCTION_UPGRADE_TRAFFIC`, `SETUP_FUNCTION_UPGRADE_CONFIG`, `ABORT_FUNCTION_UPGRADE`, `COMMIT_FUNCTION_UPGRADE`, `DETACH_FUNCTION`, `COMMIT_FUNCTION_UPGRADE_AS_GEN2`. |
| `requestResource` | object | The original request that started the operation. |
| `sourceToken` | string | An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments. |
| `stages` | array<GoogleCloudFunctionsV2betaStage> | Mechanism for reporting in-progress stages |
| `statusDetail` | string | Human-readable status of the operation, if any. |
| `target` | string | Server-defined resource path for the target of the operation. |
| `verb` | string | Name of the verb executed by the operation. |

### `GoogleCloudFunctionsV2betaStage`

- Each Stage of the deployment process
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `message` | string | Message describing the Stage |
| `name` | string enum | Name of the Stage. This will be unique for each Stage. Values: `NAME_UNSPECIFIED`, `ARTIFACT_REGISTRY`, `BUILD`, `SERVICE`, `TRIGGER`, `SERVICE_ROLLBACK`, `TRIGGER_ROLLBACK`. |
| `resource` | string | Resource of the Stage |
| `resourceUri` | string | Link to the current Stage resource |
| `state` | string enum | Current state of the Stage Values: `STATE_UNSPECIFIED`, `NOT_STARTED`, `IN_PROGRESS`, `COMPLETE`. |
| `stateMessages` | array<GoogleCloudFunctionsV2betaStateMessage> | State messages from the current Stage. |

### `GoogleCloudFunctionsV2betaStateMessage`

- Informational messages about the state of the Cloud Function or Operation.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `message` | string | The message. |
| `severity` | string enum | Severity of the state message. Values: `SEVERITY_UNSPECIFIED`, `ERROR`, `WARNING`, `INFO`. |
| `type` | string | One-word CamelCase type of the state message. |

### `HttpsTrigger`

- Describes HttpsTrigger, could be used to connect web hooks to function.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `securityLevel` | string enum | The security level for the function. Values: `SECURITY_LEVEL_UNSPECIFIED`, `SECURE_ALWAYS`, `SECURE_OPTIONAL`. |
| `url` | string | Output only. The deployed url for the function. |

### `ListFunctionsResponse`

- Response for the `ListFunctions` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functions` | array<Function> | The functions that match the request. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. The response does not include any functions from these locations. |

### `ListFunctionsResponse` (v1)

- Response for the `ListFunctions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `functions` | array<CloudFunction> | The functions that match the request. |
| `nextPageToken` | string | If not empty, indicates that there may be more functions that match the request; this value should be passed in a new google.cloud.functions.v1.ListFunctionsRequest to get more functions. |
| `unreachable` | array<string> | Locations that could not be reached. The response does not include any functions from these locations. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListRuntimesResponse`

- Response for the `ListRuntimes` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `runtimes` | array<Runtime> | The runtimes that match the request. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `OnDeployUpdatePolicy`

- Security patches are only applied when a function is redeployed.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `runtimeVersion` | string | Output only. contains the runtime version which was used during latest function deployment. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadataV1`

- Metadata describing an Operation
- Version: v2

| Field | Type | Description |
|---|---|---|
| `buildId` | string | The Cloud Build ID of the function created or updated by an API call. This field is only populated for Create and Update operations. |
| `buildName` | string | The Cloud Build Name of the function deployment. This field is only populated for Create and Update operations. `projects//locations//builds/`. |
| `request` | object | The original request that started the operation. |
| `sourceToken` | string | An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments. |
| `target` | string | Target of the operation - for example `projects/project-1/locations/region-1/functions/function-1` |
| `type` | string enum | Type of operation. Values: `OPERATION_UNSPECIFIED`, `CREATE_FUNCTION`, `UPDATE_FUNCTION`, `DELETE_FUNCTION`. |
| `updateTime` | string (google-datetime) | The last update timestamp of the operation. |
| `versionId` | string (int64) | Version id of the function created or updated by an API call. This field is only populated for Create and Update operations. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `RedirectFunctionUpgradeTrafficRequest`

- Request for the `RedirectFunctionUpgradeTraffic` method.
- Version: v2

### `RepoSource`

- Location of the source in a Google Cloud Source Repository.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `branchName` | string | Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax |
| `commitSha` | string | Explicit commit SHA to build. |
| `dir` | string | Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. eg. helloworld (no leading slash allowed) |
| `projectId` | string | ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed. |
| `repoName` | string | Name of the Cloud Source Repository. |
| `tagName` | string | Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax |

### `Retry`

- Describes the retry policy in case of function's execution failure. A function execution will be retried on any failure. A failed execution will be retried up to 7 days with an exponential backoff (capped at 10 seconds). Retried execution is charged as any other execution.
- Version: v1

### `RollbackFunctionUpgradeTrafficRequest`

- Request for the `RollbackFunctionUpgradeTraffic` method.
- Version: v2

### `Runtime`

- Describes a runtime and any special information (e.g., deprecation status) related to it.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `decommissionDate` | Date | Decommission date for the runtime. |
| `deprecationDate` | Date | Deprecation date for the runtime. |
| `displayName` | string | The user facing name, eg 'Go 1.13', 'Node.js 12', etc. |
| `environment` | string enum | The environment for the runtime. Values: `ENVIRONMENT_UNSPECIFIED`, `GEN_1`, `GEN_2`. |
| `name` | string | The name of the runtime, e.g., 'go113', 'nodejs12', etc. |
| `stage` | string enum | The stage of life this runtime is in, e.g., BETA, GA, etc. Values: `RUNTIME_STAGE_UNSPECIFIED`, `DEVELOPMENT`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`, `DECOMMISSIONED`. |
| `warnings` | array<string> | Warning messages, e.g., a deprecation warning. |

### `SecretEnvVar`

- Configuration for a secret environment variable. It has the information necessary to fetch the secret value from secret manager and expose it as an environment variable.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `key` | string | Name of the environment variable. |
| `projectId` | string | Project identifier (preferably project number but can also be the project ID) of the project that contains the secret. If not set, it is assumed that the secret is in the same project as the function. |
| `secret` | string | Name of the secret in secret manager (not the full resource name). |
| `version` | string | Version of the secret (version number or the string 'latest'). It is recommended to use a numeric version for secret environment variables as any updates to the secret value is not reflected until new instances start. |

### `SecretVersion`

- Configuration for a single version.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `path` | string | Relative path of the file under the mount path where the secret value for this version will be fetched and made available. For example, setting the mount_path as '/etc/secrets' and path as `secret_foo` would mount the secret value file at `/etc/secrets/secret_foo`. |
| `version` | string | Version of the secret (version number or the string 'latest'). It is preferable to use `latest` version with secret volumes as secret value changes are reflected immediately. |

### `SecretVolume`

- Configuration for a secret volume. It has the information necessary to fetch the secret value from secret manager and make it available as files mounted at the requested paths within the application container.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `mountPath` | string | The path within the container to mount the secret volume. For example, setting the mount_path as `/etc/secrets` would mount the secret value files under the `/etc/secrets` directory. This directory will also be completely shadowed and unavailable to mount any other secrets. Recommended mount path: /etc/secrets |
| `projectId` | string | Project identifier (preferably project number but can also be the project ID) of the project that contains the secret. If not set, it is assumed that the secret is in the same project as the function. |
| `secret` | string | Name of the secret in secret manager (not the full resource name). |
| `versions` | array<SecretVersion> | List of secret versions to mount for this secret. If empty, the `latest` version of the secret will be made available in a file named after the secret under the mount point. |

### `ServiceConfig`

- Describes the Service being deployed. Currently Supported : Cloud Run (fully managed).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allTrafficOnLatestRevision` | boolean | Whether 100% of traffic is routed to the latest revision. On CreateFunction and UpdateFunction, when set to true, the revision being deployed will serve 100% of traffic, ignoring any traffic split settings, if any. On GetFunction, true will be returned if the latest revision is serving 100% of traffic. |
| `availableCpu` | string | The number of CPUs used in a single container instance. Default value is calculated from available memory. Supports the same values as Cloud Run, see https://cloud.google.com/run/docs/reference/rest/v1/Container#resourcerequirements Example: "1" indicates 1 vCPU |
| `availableMemory` | string | The amount of memory available for a function. Defaults to 256M. Supported units are k, M, G, Mi, Gi. If no unit is supplied the value is interpreted as bytes. See https://github.com/kubernetes/kubernetes/blob/master/staging/src/k8s.io/apimachinery/pkg/api/resource/quantity.go a full description. |
| `binaryAuthorizationPolicy` | string | Optional. The binary authorization policy to be checked when deploying the Cloud Run service. |
| `directVpcEgress` | string enum | Optional. Egress settings for direct VPC. If not provided, it defaults to VPC_EGRESS_PRIVATE_RANGES_ONLY. Values: `DIRECT_VPC_EGRESS_UNSPECIFIED`, `VPC_EGRESS_PRIVATE_RANGES_ONLY`, `VPC_EGRESS_ALL_TRAFFIC`. |
| `directVpcNetworkInterface` | array<DirectVpcNetworkInterface> | Optional. The Direct VPC network interface for the Cloud Function. Currently only a single Direct VPC is supported. |
| `environmentVariables` | object | Environment variables that shall be available during function execution. |
| `ingressSettings` | string enum | The ingress settings for the function, controlling what traffic can reach it. Values: `INGRESS_SETTINGS_UNSPECIFIED`, `ALLOW_ALL`, `ALLOW_INTERNAL_ONLY`, `ALLOW_INTERNAL_AND_GCLB`. |
| `maxInstanceCount` | integer (int32) | The limit on the maximum number of function instances that may coexist at a given time. In some cases, such as rapid traffic surges, Cloud Functions may, for a short period of time, create more instances than the specified max instances limit. If your function cannot tolerate this temporary behavior, you may want to factor in a safety margin and set a lower max instances value than your function can tolerate. See the Max Instances (https://cloud.google.com/functions/docs/max-instances) Guide for more details. |
| `maxInstanceRequestConcurrency` | integer (int32) | Sets the maximum number of concurrent requests that each instance can receive. Defaults to 1. |
| `minInstanceCount` | integer (int32) | The limit on the minimum number of function instances that may coexist at a given time. Function instances are kept in idle state for a short period after they finished executing the request to reduce cold start time for subsequent requests. Setting a minimum instance count will ensure that the given number of instances are kept running in idle state always. This can help with cold start times when jump in incoming request count occurs after the idle instance would have been stopped in the default case. |
| `revision` | string | Output only. The name of service revision. |
| `secretEnvironmentVariables` | array<SecretEnvVar> | Secret environment variables configuration. |
| `secretVolumes` | array<SecretVolume> | Secret volumes configuration. |
| `securityLevel` | string enum | Security level configure whether the function only accepts https. This configuration is only applicable to 1st Gen functions with Http trigger. By default https is optional for 1st Gen functions; 2nd Gen functions are https ONLY. Values: `SECURITY_LEVEL_UNSPECIFIED`, `SECURE_ALWAYS`, `SECURE_OPTIONAL`. |
| `service` | string | Output only. Name of the service associated with a Function. The format of this field is `projects/{project}/locations/{region}/services/{service}` |
| `serviceAccountEmail` | string | The email of the service's service account. If empty, defaults to `{project_number}-compute@developer.gserviceaccount.com`. |
| `timeoutSeconds` | integer (int32) | The function execution timeout. Execution is considered failed and can be terminated if the function is not completed at the end of the timeout period. Defaults to 60 seconds. |
| `uri` | string | Output only. URI of the Service deployed. |
| `vpcConnector` | string | The Serverless VPC Access connector that this cloud function can connect to. The format of this field is `projects/*/locations/*/connectors/*`. |
| `vpcConnectorEgressSettings` | string enum | The egress settings for the connector, controlling what traffic is diverted through it. Values: `VPC_CONNECTOR_EGRESS_SETTINGS_UNSPECIFIED`, `PRIVATE_RANGES_ONLY`, `ALL_TRAFFIC`. |

### `ServiceConfigOverrides`

- Contains overrides related to the function's service configuration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `maxInstanceCount` | integer (int32) | Optional. Specifies the maximum number of instances for the new Cloud Run function. If provided, this overrides the max_instance_count setting of the Gen1 function. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `SetupFunctionUpgradeConfigRequest`

- Request for the `SetupFunctionUpgradeConfig` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `buildConfigOverrides` | BuildConfigOverrides | Optional. Specifies overrides for the build process. |
| `serviceConfigOverrides` | ServiceConfigOverrides | Optional. Specifies overrides for the service configuration. |
| `triggerServiceAccount` | string | Optional. The trigger's service account. The service account must have permission to invoke Cloud Run services, the permission is `run.routes.invoke`. If empty, defaults to the Compute Engine default service account: `{project_number}-compute@developer.gserviceaccount.com`. |

### `Source`

- The location of the function source code.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `gitUri` | string | If provided, get the source from GitHub repository. This option is valid only for GCF 1st Gen function. Example: https://github.com///blob// |
| `repoSource` | RepoSource | If provided, get the source from this location in a Cloud Source Repository. |
| `storageSource` | StorageSource | If provided, get the source from this location in Google Cloud Storage. |

### `SourceProvenance`

- Provenance of the source. Ways to find the original source, or verify that some source was used for this build.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `gitUri` | string | A copy of the build's `source.git_uri`, if exists, with any commits resolved. |
| `resolvedRepoSource` | RepoSource | A copy of the build's `source.repo_source`, if exists, with any revisions resolved. |
| `resolvedStorageSource` | StorageSource | A copy of the build's `source.storage_source`, if exists, with any generations resolved. |

### `SourceRepository`

- Describes SourceRepository, used to represent parameters related to source repository where a function is hosted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deployedUrl` | string | Output only. The URL pointing to the hosted repository where the function were defined at the time of deployment. It always points to a specific commit in the format described above. |
| `url` | string | The URL pointing to the hosted repository where the function is defined. There are supported Cloud Source Repository URLs in the following formats: To refer to a specific commit: `https://source.developers.google.com/projects/*/repos/*/revisions/*/paths/*` To refer to a moveable alias (branch): `https://source.developers.google.com/projects/*/repos/*/moveable-aliases/*/paths/*` In particular, to refer to HEAD use `master` moveable alias. To refer to a specific fixed alias (tag): `https://source.developers.google.com/projects/*/repos/*/fixed-aliases/*/paths/*` You may omit `paths/*` if you want to use the main directory. The function response may add an empty `/paths/` to the URL. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StorageSource`

- Location of the source in an archive file in Google Cloud Storage.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Google Cloud Storage bucket containing the source (see Bucket Name Requirements (https://cloud.google.com/storage/docs/bucket-naming#requirements)). |
| `generation` | string (int64) | Google Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. |
| `object` | string | Google Cloud Storage object containing the source. This object must be a gzipped archive file (`.tar.gz`) containing source to build. |
| `sourceUploadUrl` | string | When the specified storage bucket is a 1st gen function uploard url bucket, this field should be set as the generated upload url for 1st gen deployment. |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `UpgradeInfo`

- Information related to: \* A function's eligibility for 1st Gen to 2nd Gen migration. \* Current state of migration for function undergoing migration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `buildConfig` | BuildConfig | Describes the Build step of the function that builds a container to prepare for 2nd gen upgrade. |
| `eventTrigger` | EventTrigger | Describes the Event trigger which has been setup to prepare for 2nd gen upgrade. |
| `serviceConfig` | ServiceConfig | Describes the Cloud Run service which has been setup to prepare for 2nd gen upgrade. |
| `upgradeState` | string enum | UpgradeState of the function Values: `UPGRADE_STATE_UNSPECIFIED`, `ELIGIBLE_FOR_2ND_GEN_UPGRADE`, `INELIGIBLE_FOR_UPGRADE_UNTIL_REDEPLOYMENT`, `UPGRADE_OPERATION_IN_PROGRESS`, `SETUP_FUNCTION_UPGRADE_CONFIG_SUCCESSFUL`, `SETUP_FUNCTION_UPGRADE_CONFIG_ERROR`, `ABORT_FUNCTION_UPGRADE_ERROR`, `REDIRECT_FUNCTION_UPGRADE_TRAFFIC_SUCCESSFUL`, `REDIRECT_FUNCTION_UPGRADE_TRAFFIC_ERROR`, `ROLLBACK_FUNCTION_UPGRADE_TRAFFIC_ERROR`, `COMMIT_FUNCTION_UPGRADE_ERROR`, `COMMIT_FUNCTION_UPGRADE_ERROR_ROLLBACK_SAFE`, `COMMIT_FUNCTION_UPGRADE_AS_GEN2_SUCCESSFUL`, `COMMIT_FUNCTION_UPGRADE_AS_GEN2_ERROR`. |

### Shape of `AuditConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "auditLogConfigs": "array<AuditLogConfig>",
  "service": "string"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1, v2beta, v2alpha of `cloudfunctions` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://cloudfunctions.googleapis.com/$discovery/rest?version=v2, https://cloudfunctions.googleapis.com/$discovery/rest?version=v1, https://cloudfunctions.googleapis.com/$discovery/rest?version=v2beta, https://cloudfunctions.googleapis.com/$discovery/rest?version=v2alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

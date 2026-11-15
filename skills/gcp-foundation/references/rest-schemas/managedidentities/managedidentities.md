---
source: https://managedidentities.googleapis.com/$discovery/rest?version=v1
---

# Managed Service for Microsoft Active Directory API message schemas (managedidentities)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/managedidentities/`.

### `AttachTrustRequest`

- Request message for AttachTrust
- Version: v1

| Field | Type | Description |
|---|---|---|
| `trust` | Trust | Required. The domain trust resource. |

### `Backup`

- Represents a Managed Microsoft Identities backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the backups was created. |
| `labels` | object | Optional. Resource labels to represent user provided metadata. |
| `name` | string | Output only. The unique name of the Backup in the form of `projects/{project_id}/locations/global/domains/{domain_name}/backups/{name}` |
| `state` | string enum | Output only. The current state of the backup. |
| `statusMessage` | string | Output only. Additional information about the current status of this backup, if available. |
| `type` | string enum | Output only. Indicates whether it’s an on-demand backup or scheduled. |
| `updateTime` | string (google-datetime) | Output only. Last update time. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `Certificate`

- Certificate used to configure LDAPS.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | The certificate expire time. |
| `issuingCertificate` | Certificate | The issuer of this certificate. |
| `subject` | string | The certificate subject. |
| `subjectAlternativeName` | array<string> | The additional hostnames for the domain. |
| `thumbprint` | string | The certificate thumbprint which uniquely identifies the certificate. |

### `CheckMigrationPermissionRequest`

- CheckMigrationPermissionRequest is the request message for CheckMigrationPermission method.
- Version: v1

### `CheckMigrationPermissionResponse`

- CheckMigrationPermissionResponse is the response message for CheckMigrationPermission method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `onpremDomains` | array<OnPremDomainSIDDetails> | The state of SID filtering of all the domains which has trust established. |
| `state` | string enum | The state of DomainMigration. |

### `DailyCycle`

- Time window specified for daily operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | Output only. Duration of the time window, set by service producer. |
| `startTime` | TimeOfDay | Time within the day to start the operations. |

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `DenyMaintenancePeriod`

- DenyMaintenancePeriod definition. Maintenance is forbidden within the deny period. The start_date must be less than the end_date.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endDate` | Date | Deny period end date. This can be: \* A full date, with non-zero year, month and day values. \* A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be before the end. |
| `startDate` | Date | Deny period start date. This can be: \* A full date, with non-zero year, month and day values. \* A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be the same or after the start. |
| `time` | TimeOfDay | Time in UTC when the Blackout period starts on start_date and ends on end_date. This can be: \* Full time. \* All zeros for 00:00:00 UTC |

### `DetachTrustRequest`

- Request message for DetachTrust
- Version: v1

| Field | Type | Description |
|---|---|---|
| `trust` | Trust | Required. The domain trust resource to removed. |

### `DisableMigrationRequest`

- DisableMigrationRequest is the request message for DisableMigration method.
- Version: v1

### `Domain`

- Represents a managed Microsoft Active Directory domain. If the domain is being changed, it will be placed into the UPDATING state, which indicates that the resource is being reconciled. At this point, Get will reflect an intermediate state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `admin` | string | Optional. The name of delegated administrator account used to perform Active Directory operations. If not specified, `setupadmin` will be used. |
| `auditLogsEnabled` | boolean | Optional. Configuration for audit logs. True if audit logs are enabled, else false. Default is audit logs disabled. |
| `authorizedNetworks` | array<string> | Optional. The full names of the Google Compute Engine networks the domain instance is connected to. Networks can be added using UpdateDomain. The domain is only available on networks listed in `authorized_networks`. If CIDR subnets overlap between networks, domain creation will fail. |
| `createTime` | string (google-datetime) | Output only. The time the instance was created. |
| `fqdn` | string | Output only. The fully-qualified domain name of the exposed domain used by clients to connect to the service. Similar to what would be chosen for an Active Directory set up on an internal network. |
| `labels` | object | Optional. Resource labels that can contain user-provided metadata. |
| `locations` | array<string> | Required. Locations where domain needs to be provisioned. The locations can be specified according to https://cloud.google.com/compute/docs/regions-zones, such as `us-west1` or `us-east4`. Each domain supports up to 4 locations, separated by commas. Each location will use a /26 block. |
| `name` | string | Required. The unique name of the domain using the form: `projects/{project_id}/locations/global/domains/{domain_name}`. |
| `reservedIpRange` | string | Required. The CIDR range of internal addresses that are reserved for this domain. Reserved networks must be /24 or larger. Ranges must be unique and non-overlapping with existing subnets in \[Domain\].\[authorized_networks\]. |
| `state` | string enum | Output only. The current state of this domain. |
| `statusMessage` | string | Output only. Additional information about the current status of this domain, if available. |
| `trusts` | array<Trust> | Output only. The current trusts associated with the domain. |
| `updateTime` | string (google-datetime) | Output only. The last update time. |

### `DomainJoinMachineRequest`

- DomainJoinMachineRequest is the request message for DomainJoinMachine method
- Version: v1

| Field | Type | Description |
|---|---|---|
| `force` | boolean | Optional. force if True, forces domain join even if the computer account already exists. |
| `ouName` | string | Optional. OU name where the VM needs to be domain joined |
| `vmIdToken` | string | Required. Full instance id token of compute engine VM to verify instance identity. More about this: https://cloud.google.com/compute/docs/instances/verifying-instance-identity#request_signature |

### `DomainJoinMachineResponse`

- DomainJoinMachineResponse is the response message for DomainJoinMachine method
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domainJoinBlob` | string | Offline domain join blob as the response |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EnableMigrationRequest`

- EnableMigrationRequest is the request message for EnableMigration method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `migratingDomains` | array<OnPremDomainDetails> | Required. List of the on-prem domains to be migrated. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `ExtendSchemaRequest`

- ExtendSchemaRequest is the request message for ExtendSchema method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Required. Description for Schema Change. |
| `fileContents` | string (byte) | File uploaded as a byte stream input. |
| `gcsPath` | string | File stored in Cloud Storage bucket and represented in the form projects/{project_id}/buckets/{bucket_name}/objects/{object_name} File should be in the same project as the domain. |

### `GoogleCloudManagedidentitiesV1OpMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleCloudManagedidentitiesV1alpha1OpMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleCloudManagedidentitiesV1beta1OpMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleCloudSaasacceleratorManagementProvidersV1Instance`

- Instance represents the interface for SLM services to actuate the state of control plane resources. Example Instance in JSON, where consumer-project-number=123456, producer-project-id=cloud-sql: Instance: { "name": "projects/123456/locations/us-east1/instances/prod-instance", "create_time": { "seconds": 1526406431, }, "labels": { "env": "prod", "foo": "bar" }, "state": READY, "software_versions": { "software_update": "cloud-sql-09-28-2018", }, "maintenance_policy_names": { "UpdatePolicy": "projects/123456/locations/us-east1/maintenancePolicies/prod-update-policy", } "tenant_project_id": "cloud-sql-test-tenant", "producer_metadata": { "cloud-sql-tier": "basic", "cloud-sql-instance-size": "1G", }, "provisioned_resources": \[ { "resource-type": "compute-instance", "resource-url": "https://www.googleapis.com/compute/v1/projects/cloud-sql/zones/us-east1-b/instances/vm-1", } \], "maintenance_schedules": { "csa_rollout": { "start_time": { "seconds": 1526406431, }, "end_time": { "seconds": 1535406431, }, }, "ncsa_rollout": { "start_time": { "seconds": 1526406431, }, "end_time": { "seconds": 1535406431, }, } }, "consumer_defined_name": "my-sql-instance1", } LINT.IfChange
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerDefinedName` | string | consumer_defined_name is the name of the instance set by the service consumers. Generally this is different from the `name` field which reperesents the system-assigned id of the instance which the service consumers do not recognize. This is a required field for tenants onboarding to Maintenance Window notifications ((internal link)#prerequisites). |
| `consumerProjectNumber` | string | Optional. The consumer_project_number associated with this Apigee instance. This field is added specifically to support Apigee integration with SLM Rollout and UMM. It represents the numerical project ID of the GCP project that consumes this Apigee instance. It is used for SLM rollout notifications and UMM integration, enabling proper mapping to customer projects and log delivery for Apigee instances. This field complements consumer_project_id and may be used for specific Apigee scenarios where the numerical ID is required. |
| `createTime` | string (google-datetime) | Output only. Timestamp when the resource was created. |
| `instanceType` | string | Optional. The instance_type of this instance of format: projects/{project_number}/locations/{location_id}/instanceTypes/{instance_type_id}. Instance Type represents a high-level tier or SKU of the service that this instance belong to. When enabled(eg: Maintenance Rollout), Rollout uses 'instance_type' along with 'software_versions' to determine whether instance needs an update or not. |
| `labels` | object | Optional. Resource labels to represent user provided metadata. Each label is a key-value pair, where both the key and the value are arbitrary strings provided by the user. |
| `maintenancePolicyNames` | object | Optional. The MaintenancePolicies that have been attached to the instance. The key must be of the type name of the oneof policy name defined in MaintenancePolicy, and the referenced policy must define the same policy type. For details, please refer to (internal link). Should not be set if maintenance_settings.maintenance_policies is set. |
| `maintenanceSchedules` | object | The MaintenanceSchedule contains the scheduling information of published maintenance schedule with same key as software_versions. |
| `maintenanceSettings` | GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings | Optional. The MaintenanceSettings associated with instance. |
| `name` | string | Unique name of the resource. It uses the form: `projects/{project_number}/locations/{location_id}/instances/{instance_id}` Note: This name is passed, stored and logged across the rollout system. So use of consumer project_id or any other consumer PII in the name is strongly discouraged for wipeout ((internal link)) compliance. See (internal link)#storage-guidance for more details. |
| `notificationParameters` | object | Optional. notification_parameter are information that service producers may like to include that is not relevant to Rollout. This parameter will only be passed to Gamma and Cloud Logging for notification/logging purpose. |
| `producerMetadata` | object | Output only. Custom string attributes used primarily to expose producer-specific information in monitoring dashboards. See (internal link). |
| `provisionedResources` | array<GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource> | Output only. The list of data plane resources provisioned for this instance, e.g. compute VMs. See (internal link). |
| `slmInstanceTemplate` | string | Link to the SLM instance template. Only populated when updating SLM instances via SSA's Actuation service adaptor. Service producers with custom control plane (e.g. Cloud SQL) doesn't need to populate this field. Instead they should use software_versions. |
| `sloMetadata` | GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata | Output only. SLO metadata for instance classification in the Standardized dataplane SLO platform. See (internal link) for feature description. |
| `softwareVersions` | object | Software versions that are used to deploy this instance. This can be mutated by rollout services. |
| `state` | string enum | Output only. Current lifecycle state of the resource (e.g. if it's being created or ready to use). |
| `tenantProjectId` | string | Output only. ID of the associated GCP tenant project. See (internal link). |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the resource was last modified. |

### `GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule`

- Maintenance schedule which is exposed to customer and potentially end user, indicating published upcoming future maintenance schedule
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canReschedule` | boolean | This field is deprecated, and will be always set to true since reschedule can happen multiple times now. This field should not be removed until all service producers remove this for their customers. |
| `endTime` | string (google-datetime) | The scheduled end time for the maintenance. |
| `rolloutManagementPolicy` | string | The rollout management policy this maintenance schedule is associated with. When doing reschedule update request, the reschedule should be against this given policy. |
| `scheduleDeadlineTime` | string (google-datetime) | schedule_deadline_time is the time deadline any schedule start time cannot go beyond, including reschedule. It's normally the initial schedule start time plus maintenance window length (1 day or 1 week). Maintenance cannot be scheduled to start beyond this deadline. |
| `startTime` | string (google-datetime) | The scheduled start time for the maintenance. |

### `GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings`

- Maintenance settings associated with instance. Allows service producers and end users to assign settings that controls maintenance on this instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exclude` | boolean | Optional. Exclude instance from maintenance. When true, rollout service will not attempt maintenance on the instance. Rollout service will include the instance in reported rollout progress as not attempted. |
| `isRollback` | boolean | Optional. If the update call is triggered from rollback, set the value as true. |
| `maintenancePolicies` | object | Optional. The MaintenancePolicies that have been attached to the instance. The key must be of the type name of the oneof policy name defined in MaintenancePolicy, and the embedded policy must define the same policy type. For details, please refer to (internal link). Should not be set if maintenance_policy_names is set. If only the name is needed, then only populate MaintenancePolicy.name. |

### `GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata`

- Node information for custom per-node SLO implementations. SSA does not support per-node SLO, but producers can populate per-node information in SloMetadata for custom precomputations. SSA Eligibility Exporter will emit per-node metric based on this information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | The location of the node, if different from instance location. |
| `nodeId` | string | The id of the node. This should be equal to SaasInstanceNode.node_id. |
| `perSliEligibility` | GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility | If present, this will override eligibility for the node coming from instance or exclusions for specified SLIs. |

### `GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter`

- Contains notification related data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `values` | array<string> | Optional. Array of string values. e.g. instance's replica information. |

### `GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility`

- PerSliSloEligibility is a mapping from an SLI name to eligibility.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eligibilities` | object | An entry in the eligibilities map specifies an eligibility for a particular SLI for the given instance. The SLI key in the name must be a valid SLI name specified in the Eligibility Exporter binary flags otherwise an error will be emitted by Eligibility Exporter and the oncaller will be alerted. If an SLI has been defined in the binary flags but the eligibilities map does not contain it, the corresponding SLI time series will not be emitted by the Eligibility Exporter. This ensures a smooth rollout and compatibility between the data produced by different versions of the Eligibility Exporters. If eligibilities map contains a key for an SLI which has not been declared in the binary flags, there will be an error message emitted in the Eligibility Exporter log and the metric for the SLI in question will not be emitted. |

### `GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource`

- Describes provisioned dataplane resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceType` | string | Type of the resource. This can be either a GCP resource or a custom one (e.g. another cloud provider's VM). For GCP compute resources use singular form of the names listed in GCP compute API documentation (https://cloud.google.com/compute/docs/reference/rest/v1/), prefixed with 'compute-', for example: 'compute-instance', 'compute-disk', 'compute-autoscaler'. |
| `resourceUrl` | string | URL identifying the resource, e.g. "https://www.googleapis.com/compute/v1/projects/...)". |

### `GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility`

- SloEligibility is a tuple containing eligibility value: true if an instance is eligible for SLO calculation or false if it should be excluded from all SLO-related calculations along with a user-defined reason.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eligible` | boolean | Whether an instance is eligible or ineligible. |
| `reason` | string | User-defined reason for the current value of instance eligibility. Usually, this can be directly mapped to the internal state. An empty reason is allowed. |

### `GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata`

- SloMetadata contains resources required for proper SLO classification of the instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodes` | array<GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata> | Optional. List of nodes. Some producers need to use per-node metadata to calculate SLO. This field allows such producers to publish per-node SLO meta data, which will be consumed by SSA Eligibility Exporter and published in the form of per node metric to Monarch. |
| `perSliEligibility` | GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility | Optional. Multiple per-instance SLI eligibilities which apply for individual SLIs. |
| `tier` | string | Name of the SLO tier the Instance belongs to. This name will be expected to match the tiers specified in the service SLO configuration. Field is mandatory and must not be empty. |

### `LDAPSSettings`

- LDAPSSettings represents the ldaps settings for domain resource. LDAP is the Lightweight Directory Access Protocol, defined in https://tools.ietf.org/html/rfc4511. The settings object configures LDAP over SSL/TLS, whether it is over port 636 or the StartTLS operation. If LDAPSSettings is being changed, it will be placed into the UPDATING state, which indicates that the resource is being reconciled. At this point, Get will reflect an intermediate state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificate` | Certificate | Output only. The certificate used to configure LDAPS. Certificates can be chained with a maximum length of 15. |
| `certificatePassword` | string | Input only. The password used to encrypt the uploaded PFX certificate. |
| `certificatePfx` | string (byte) | Input only. The uploaded PKCS12-formatted certificate to configure LDAPS with. It will enable the domain controllers in this domain to accept LDAPS connections (either LDAP over SSL/TLS or the StartTLS operation). A valid certificate chain must form a valid x.509 certificate chain (or be comprised of a single self-signed certificate. It must be encrypted with either: 1) PBES2 + PBKDF2 + AES256 encryption and SHA256 PRF; or 2) pbeWithSHA1And3-KeyTripleDES-CBC Private key must be included for the leaf / single self-signed certificate. Note: For a fqdn your-example-domain.com, the wildcard fqdn is \*.your-example-domain.com. Specifically the leaf certificate must have: - Either a blank subject or a subject with CN matching the wildcard fqdn. - Exactly two SANs - the fqdn and wildcard fqdn. - Encipherment and digital key signature key usages. - Server authentication extended key usage (OID=1.3.6.1.5.5.7.3.1) - Private key must be in one of the following formats: RSA, ECDSA, ED25519. - Private key must have appropriate key length: 2048 for RSA, 256 for ECDSA - Signature algorithm of the leaf certificate cannot be MD2, MD5 or SHA1. |
| `name` | string | The resource name of the LDAPS settings. Uses the form: `projects/{project}/locations/{location}/domains/{domain}`. |
| `state` | string enum | Output only. The current state of this LDAPS settings. |
| `updateTime` | string (google-datetime) | Output only. Last update time. |

### `ListBackupsResponse`

- ListBackupsResponse is the response message for ListBackups method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backups` | array<Backup> | A list of Cloud AD backups in the domain. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListDomainsResponse`

- Response message for ListDomains
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domains` | array<Domain> | A list of Managed Identities Service domains in the project. |
| `nextPageToken` | string | A token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | A list of locations that could not be reached. |

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

### `ListPeeringsResponse`

- ListPeeringsResponse is the response message for ListPeerings method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `peerings` | array<Peering> | A list of Managed Identities Service Peerings in the project. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListSQLIntegrationsResponse`

- ListSQLIntegrationsResponse is the response message for ListSQLIntegrations method.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `sqlIntegrations` | array<SQLIntegration> | A list of SQLIntegrations of a domain. |
| `unreachable` | array<string> | A list of locations that could not be reached. |

### `ListSqlIntegrationsResponse`

- ListSqlIntegrationsResponse is the response message for ListSqlIntegrations method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `sqlIntegrations` | array<SqlIntegration> | A list of SQLIntegrations of a domain. |
| `unreachable` | array<string> | A list of locations that could not be reached. |

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

### `MaintenancePolicy`

- Defines policies to service maintenance events.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the resource was created. |
| `description` | string | Optional. Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512. |
| `labels` | object | Optional. Resource labels to represent user provided metadata. Each label is a key-value pair, where both the key and the value are arbitrary strings provided by the user. |
| `name` | string | Required. MaintenancePolicy name using the form: `projects/{project_id}/locations/{location_id}/maintenancePolicies/{maintenance_policy_id}` where {project_id} refers to a GCP consumer project ID, {location_id} refers to a GCP region/zone, {maintenance_policy_id} must be 1-63 characters long and match the regular expression `[a-z0-9]([-a-z0-9]*[a-z0-9])?`. |
| `state` | string enum | Optional. The state of the policy. |
| `updatePolicy` | UpdatePolicy | Maintenance policy applicable to instance update. |
| `updateTime` | string (google-datetime) | Output only. The time when the resource was updated. |

### `MaintenanceWindow`

- MaintenanceWindow definition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dailyCycle` | DailyCycle | Daily cycle. |
| `weeklyCycle` | WeeklyCycle | Weekly cycle. |

### `OnPremDomainDetails`

- OnPremDomainDetails is the message which contains details of on-prem domain which is trusted and needs to be migrated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disableSidFiltering` | boolean | Optional. Option to disable SID filtering. |
| `domainName` | string | Required. FQDN of the on-prem domain being migrated. |

### `OnPremDomainSIDDetails`

- OnPremDomainDetails is the message which contains details of on-prem domain which is trusted and needs to be migrated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | FQDN of the on-prem domain being migrated. |
| `sidFilteringState` | string enum | Current SID filtering state. |

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
| `cancelRequested` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `statusDetail` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Peering`

- Represents a Managed Service for Microsoft Active Directory Peering.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizedNetwork` | string | Required. The full names of the Google Compute Engine networks to which the instance is connected. Caller needs to make sure that CIDR subnets do not overlap between networks, else peering creation will fail. |
| `createTime` | string (google-datetime) | Output only. The time the instance was created. |
| `domainResource` | string | Required. Full domain resource path for the Managed AD Domain involved in peering. The resource path should be in the form: `projects/{project_id}/locations/global/domains/{domain_name}` |
| `labels` | object | Optional. Resource labels to represent user-provided metadata. |
| `name` | string | Output only. Unique name of the peering in this scope including projects and location using the form: `projects/{project_id}/locations/global/peerings/{peering_id}`. |
| `state` | string enum | Output only. The current state of this Peering. |
| `statusMessage` | string | Output only. Additional information about the current status of this peering, if available. |
| `updateTime` | string (google-datetime) | Output only. Last update time. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `ReconfigureTrustRequest`

- Request message for ReconfigureTrust
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetDnsIpAddresses` | array<string> | Required. The target DNS server IP addresses to resolve the remote domain involved in the trust. |
| `targetDomainName` | string | Required. The fully-qualified target domain name which will be in trust with current domain. |

### `ResetAdminPasswordRequest`

- Request message for ResetAdminPassword
- Version: v1

### `ResetAdminPasswordResponse`

- Response message for ResetAdminPassword
- Version: v1

| Field | Type | Description |
|---|---|---|
| `password` | string | A random password. See admin for more information. |

### `RestoreDomainRequest`

- RestoreDomainRequest is the request received by RestoreDomain rpc
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupId` | string | Required. ID of the backup to be restored |

### `SQLIntegration`

- Represents the SQL instance integrated with AD.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the instance was created. |
| `name` | string | The unique name of the sql integration in the form of `projects/{project_id}/locations/global/domains/{domain_name}/sqlIntegrations/{sql_integration}` |
| `sqlInstance` | string | The full resource name of an integrated sql instance |
| `state` | string enum | Output only. The current state of the managed OU. |
| `updateTime` | string (google-datetime) | Output only. Last update time for this SQL instance. |

### `Schedule`

- Configure the schedule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | string enum | Allows to define schedule that runs specified day of the week. |
| `duration` | string (google-duration) | Output only. Duration of the time window, set by service producer. |
| `startTime` | TimeOfDay | Time within the window to start the operations. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |

### `SqlIntegration`

- Represents the SQL instance integrated with Managed AD.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the SQL integration was created. |
| `name` | string | The unique name of the SQL integration in the form of `projects/{project_id}/locations/global/domains/{domain_name}/sqlIntegrations/{sql_integration}` |
| `sqlInstance` | string | The full resource name of an integrated SQL instance |
| `state` | string enum | Output only. The current state of the SQL integration. |
| `updateTime` | string (google-datetime) | Output only. The time the SQL integration was updated. |

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

### `TimeOfDay`

- Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hours` | integer (int32) | Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | integer (int32) | Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. |
| `nanos` | integer (int32) | Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. |
| `seconds` | integer (int32) | Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. |

### `Trust`

- Represents a relationship between two domains. This allows a controller in one domain to authenticate a user in another domain. If the trust is being changed, it will be placed into the UPDATING state, which indicates that the resource is being reconciled. At this point, Get will reflect an intermediate state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the instance was created. |
| `lastTrustHeartbeatTime` | string (google-datetime) | Output only. The last heartbeat time when the trust was known to be connected. |
| `selectiveAuthentication` | boolean | Optional. The trust authentication type, which decides whether the trusted side has forest/domain wide access or selective access to an approved set of resources. |
| `state` | string enum | Output only. The current state of the trust. |
| `stateDescription` | string | Output only. Additional information about the current state of the trust, if available. |
| `targetDnsIpAddresses` | array<string> | Required. The target DNS server IP addresses which can resolve the remote domain involved in the trust. |
| `targetDomainName` | string | Required. The fully qualified target domain name which will be in trust with the current domain. |
| `trustDirection` | string enum | Required. The trust direction, which decides if the current domain is trusted, trusting, or both. |
| `trustHandshakeSecret` | string | Required. The trust secret used for the handshake with the target domain. This will not be stored. |
| `trustType` | string enum | Required. The type of trust represented by the trust resource. |
| `updateTime` | string (google-datetime) | Output only. The last update time. |

### `UpdatePolicy`

- Maintenance policy applicable to instance updates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `channel` | string enum | Optional. Relative scheduling channel applied to resource. |
| `denyMaintenancePeriods` | array<DenyMaintenancePeriod> | Deny Maintenance Period that is applied to resource to indicate when maintenance is forbidden. The protocol supports zero-to-many such periods, but the current SLM Rollout implementation only supports zero-to-one. |
| `window` | MaintenanceWindow | Optional. Maintenance window that is applied to resources covered by this policy. |

### `ValidateTrustRequest`

- Request message for ValidateTrust
- Version: v1

| Field | Type | Description |
|---|---|---|
| `trust` | Trust | Required. The domain trust to validate trust state for. |

### `WeeklyCycle`

- Time window specified for weekly operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `schedule` | array<Schedule> | User can specify multiple windows in a week. Minimum of 1 window. |

### Shape of `AttachTrustRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "trust": "Trust"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1alpha1 of `managedidentities` (retrieved 2026-11-14); a type shared by several versions shows the preferred version, and each type's `Version` line names the document it was taken from.
- Google-internal `go/` short links in the Discovery descriptions are replaced with `(internal link)`; they are not reachable outside Google.
- Source: https://managedidentities.googleapis.com/$discovery/rest?version=v1, https://managedidentities.googleapis.com/$discovery/rest?version=v1alpha1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

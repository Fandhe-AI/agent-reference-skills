---
source: https://workstations.googleapis.com/$discovery/rest?version=v1
---

# Cloud Workstations API message schemas (workstations)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/workstations/`.

### `Accelerator`

- An accelerator card attached to the instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | integer (int32) | Optional. Number of accelerator cards exposed to the instance. |
| `type` | string | Optional. Type of accelerator resource to attach to the instance, for example, `"nvidia-tesla-p100"`. |

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

### `BoostConfig`

- A boost configuration is a set of resources that a workstation can use to increase its performance. If you specify a boost configuration, upon startup, workstation users can choose to use a VM provisioned under the boost config by passing the boost config ID in the start request. If the workstation user does not provide a boost config ID in the start request, the system will choose a VM from the pool provisioned under the default config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accelerators` | array<Accelerator> | Optional. A list of the type and count of accelerator cards attached to the boost instance. Defaults to `none`. |
| `bootDiskSizeGb` | integer (int32) | Optional. The size of the boot disk for the VM in gigabytes (GB). The minimum boot disk size is `30` GB. Defaults to `50` GB. |
| `enableNestedVirtualization` | boolean | Optional. Whether to enable nested virtualization on boosted Cloud Workstations VMs running using this boost configuration. Defaults to false. Nested virtualization lets you run virtual machine (VM) instances inside your workstation. Before enabling nested virtualization, consider the following important considerations. Cloud Workstations instances are subject to the same restrictions as Compute Engine instances (https://cloud.google.com/compute/docs/instances/nested-virtualization/overview#restrictions): \* \*\*Organization policy\*\*: projects, folders, or organizations may be restricted from creating nested VMs if the \*\*Disable VM nested virtualization\*\* constraint is enforced in the organization policy. For more information, see the Compute Engine section, Checking whether nested virtualization is allowed (https://cloud.google.com/compute/docs/instances/nested-virtualization/managing-constraint#checking_whether_nested_virtualization_is_allowed). \* \*\*Performance\*\*: nested VMs might experience a 10% or greater decrease in performance for workloads that are CPU-bound and possibly greater than a 10% decrease for workloads that are input/output bound. \* \*\*Machine Type\*\*: nested virtualization can only be enabled on boost configurations that specify a machine_type in the N1 or N2 machine series. |
| `id` | string | Required. The ID to be used for the boost configuration. |
| `machineType` | string | Optional. The type of machine that boosted VM instances will use—for example, `e2-standard-4`. For more information about machine types that Cloud Workstations supports, see the list of available machine types (https://cloud.google.com/workstations/docs/available-machine-types). Defaults to `e2-standard-4`. |
| `poolSize` | integer (int32) | Optional. The number of boost VMs that the system should keep idle so that workstations can be boosted quickly. Defaults to `0`. |

### `BoostConfig` (v1beta)

- A boost configuration is a set of resources that a workstation can use to increase its performance. If you specify a boost configuration, upon startup, workstation users can choose to use a VM provisioned under the boost config by passing the boost config ID in the start request. If the workstation user does not provide a boost config ID in the start request, the system will choose a VM from the pool provisioned under the default config.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `accelerators` | array<Accelerator> | Optional. A list of the type and count of accelerator cards attached to the boost instance. Defaults to `none`. |
| `bootDiskSizeGb` | integer (int32) | Optional. The size of the boot disk for the VM in gigabytes (GB). The minimum boot disk size is `30` GB. Defaults to `50` GB. |
| `enableAutomaticFailover` | boolean | Optional. Indicates if this boost config is eligible for automatic failover when the service cannot provision the default VM type. Defaults to `false`. |
| `enableNestedVirtualization` | boolean | Optional. Whether to enable nested virtualization on boosted Cloud Workstations VMs running using this boost configuration. Defaults to false. Nested virtualization lets you run virtual machine (VM) instances inside your workstation. Before enabling nested virtualization, consider the following important considerations. Cloud Workstations instances are subject to the same restrictions as Compute Engine instances (https://cloud.google.com/compute/docs/instances/nested-virtualization/overview#restrictions): \* \*\*Organization policy\*\*: projects, folders, or organizations may be restricted from creating nested VMs if the \*\*Disable VM nested virtualization\*\* constraint is enforced in the organization policy. For more information, see the Compute Engine section, Checking whether nested virtualization is allowed (https://cloud.google.com/compute/docs/instances/nested-virtualization/managing-constraint#checking_whether_nested_virtualization_is_allowed). \* \*\*Performance\*\*: nested VMs might experience a 10% or greater decrease in performance for workloads that are CPU-bound and possibly greater than a 10% decrease for workloads that are input/output bound. \* \*\*Machine Type\*\*: nested virtualization can only be enabled on boost configurations that specify a machine_type in the N1 or N2 machine series. |
| `id` | string | Required. The ID to be used for the boost configuration. |
| `machineType` | string | Optional. The type of machine that boosted VM instances will use—for example, `e2-standard-4`. For more information about machine types that Cloud Workstations supports, see the list of available machine types (https://cloud.google.com/workstations/docs/available-machine-types). Defaults to `e2-standard-4`. |
| `poolSize` | integer (int32) | Optional. The number of boost VMs that the system should keep idle so that workstations can be boosted quickly. Defaults to `0`. |
| `reservationAffinity` | ReservationAffinity | Optional. ReservationAffinity (https://cloud.google.com/compute/docs/instances/reserving-zonal-resources) specifies a reservation that can be consumed to create boost VM instances. If SPECIFIC_RESERVATION is specified, Cloud Workstations will only create VMs in the zone where the reservation is located. This would affect availability since the service will no longer be resilient to zonal outages. If ANY_RESERVATION is specified, creating reservations in both zones that the config creates VMs in will ensure higher availability. \*\*Important Considerations for Reservation Affinity:\*\* \* This feature is intended for advanced users and requires familiarity with Google Compute Engine reservations. \* Using reservations incurs charges, regardless of utilization. \* The resources in the pool will consume the specified reservation. Take this into account when setting the pool size. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `Container`

- A Docker container.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | Optional. Arguments passed to the entrypoint. |
| `command` | array<string> | Optional. If set, overrides the default ENTRYPOINT specified by the image. |
| `env` | object | Optional. Environment variables passed to the container's entrypoint. |
| `image` | string | Optional. A Docker container image that defines a custom environment. Cloud Workstations provides a number of preconfigured images (https://cloud.google.com/workstations/docs/preconfigured-base-images), but you can create your own custom container images (https://cloud.google.com/workstations/docs/custom-container-images). If using a private image, the `host.gceInstance.serviceAccount` field must be specified in the workstation configuration. If using a custom container image, the service account must have Artifact Registry Reader (https://cloud.google.com/artifact-registry/docs/access-control#roles) permission to pull the specified image. Otherwise, the image must be publicly accessible. |
| `runAsUser` | integer (int32) | Optional. If set, overrides the USER specified in the image with the given uid. |
| `workingDir` | string | Optional. If set, overrides the default DIR specified by the image. |

### `CustomerEncryptionKey`

- A customer-managed encryption key (CMEK) for the Compute Engine resources of the associated workstation configuration. Specify the name of your Cloud KMS encryption key and the default service account. We recommend that you use a separate service account and follow Cloud KMS best practices (https://cloud.google.com/kms/docs/separation-of-duties).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKey` | string | Immutable. The name of the Google Cloud KMS encryption key. For example, `"projects/PROJECT_ID/locations/REGION/keyRings/KEY_RING/cryptoKeys/KEY_NAME"`. The key must be in the same region as the workstation configuration. |
| `kmsKeyServiceAccount` | string | Immutable. The service account to use with the specified KMS key. We recommend that you use a separate service account and follow KMS best practices. For more information, see Separation of duties (https://cloud.google.com/kms/docs/separation-of-duties) and `gcloud kms keys add-iam-policy-binding` `--member` (https://cloud.google.com/sdk/gcloud/reference/kms/keys/add-iam-policy-binding#--member). |

### `DomainConfig`

- Configuration options for a custom domain.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domain` | string | Immutable. Domain used by Workstations for HTTP ingress. |

### `EphemeralDirectory`

- An ephemeral directory which won't persist across workstation sessions. It is freshly created on every workstation start operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcePd` | GcePersistentDisk | An EphemeralDirectory backed by a Compute Engine persistent disk. |
| `mountPath` | string | Required. Location of this directory in the running workstation. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `GatewayConfig`

- Configuration options for Cluster HTTP Gateway.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `http2Enabled` | boolean | Optional. Whether HTTP/2 is enabled for this workstation cluster. Defaults to false. |

### `GatewayConfig` (v1beta)

- Configuration options for Cluster HTTP Gateway.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `directAccessPorts` | array<integer> | Optional. Specifies VM ports that can be accessed using the standard `$HOSTNAME:$PORT` format in addition to the service's default `$PORT-$HOSTNAME` format. See \[Access HTTP Servers Running on Workstations\] (https://docs.cloud.google.com/workstations/docs/access-http-servers-running-on-workstations). Note: This only controls the routing URL format. Network-level access is still controlled by `allowed_ports` on WorkstationConfig. All `allowed_ports` remain accessible via the default `$PORT-$HOSTNAME` format. |
| `http2Enabled` | boolean | Optional. Whether HTTP/2 is enabled for this workstation cluster. Defaults to false. |

### `GceConfidentialInstanceConfig`

- A set of Compute Engine Confidential VM instance options.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableConfidentialCompute` | boolean | Optional. Whether the instance has confidential compute enabled. |

### `GceHyperdiskBalancedHighAvailability`

- A Persistent Directory backed by a Compute Engine Hyperdisk Balanced High Availability Disk (https://cloud.google.com/compute/docs/disks/hd-types/hyperdisk-balanced-ha). This is a high-availability block storage solution that offers a balance between performance and cost for most general-purpose workloads.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `archiveTimeout` | string (google-duration) | Optional. Number of seconds to wait after initially creating or subsequently shutting down the workstation before converting its disk into a snapshot. This generally saves costs at the expense of greater startup time on next workstation start, as the service will need to create a disk from the archival snapshot. A value of `"0s"` indicates that the disk will never be archived. |
| `maxSizeGb` | integer (int32) | Optional. Maximum size in GB to which this persistent directory can be resized. Defaults to `0`, which indicates no maximum limit is enforced by this configuration. Resizing is still subject to the quotas and limits of the underlying disk type. |
| `reclaimPolicy` | string enum | Optional. Whether the persistent disk should be deleted when the workstation is deleted. Valid values are `DELETE` and `RETAIN`. Defaults to `DELETE`. Values: `RECLAIM_POLICY_UNSPECIFIED`, `DELETE`, `RETAIN`. |
| `sizeGb` | integer (int32) | Optional. The GB capacity of a persistent home directory for each workstation created with this configuration. Must be empty if source_snapshot is set. Valid values are `10`, `50`, `100`, `200`, `500`, or `1000`. Defaults to `200`. |
| `sourceSnapshot` | string | Optional. Name of the snapshot to use as the source for the disk. If set, size_gb must be empty. Must be formatted as ext4 file system with no partitions. |

### `GceHyperdiskBalancedHighAvailability` (v1beta)

- A Persistent Directory backed by a Compute Engine Hyperdisk Balanced High Availability Disk (https://cloud.google.com/compute/docs/disks/hd-types/hyperdisk-balanced-ha). This is a high-availability block storage solution that offers a balance between performance and cost for most general-purpose workloads.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `archiveTimeout` | string (google-duration) | Optional. Number of seconds to wait after initially creating or subsequently shutting down the workstation before converting its disk into a snapshot. This generally saves costs at the expense of greater startup time on next workstation start, as the service will need to create a disk from the archival snapshot. A value of `"0s"` indicates that the disk will never be archived. |
| `maxSizeGb` | integer (int32) | Optional. Maximum size in GB to which this persistent directory can be resized. Defaults to `0`, which indicates no maximum limit is enforced by this configuration. Resizing is still subject to the quotas and limits of the underlying disk type. |
| `provisionedIops` | string (int64) | Optional. Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 3,000 and 100,000. |
| `provisionedThroughput` | string (int64) | Optional. Indicates how much throughput to provision for the disk. This sets the number of throughput MB per second that the disk can handle. Values must be between 1 and 2,400. |
| `reclaimPolicy` | string enum | Optional. Whether the persistent disk should be deleted when the workstation is deleted. Valid values are `DELETE` and `RETAIN`. Defaults to `DELETE`. Values: `RECLAIM_POLICY_UNSPECIFIED`, `DELETE`, `RETAIN`. |
| `sizeGb` | integer (int32) | Optional. The GB capacity of a persistent home directory for each workstation created with this configuration. Must be empty if source_snapshot is set. Valid values are `10`, `50`, `100`, `200`, `500`, or `1000`. Defaults to `200`. |
| `sourceSnapshot` | string | Optional. Name of the snapshot to use as the source for the disk. If set, size_gb must be empty. Must be formatted as ext4 file system with no partitions. |

### `GceInstance`

- A runtime using a Compute Engine instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accelerators` | array<Accelerator> | Optional. A list of the type and count of accelerator cards attached to the instance. |
| `boostConfigs` | array<BoostConfig> | Optional. A list of the boost configurations that workstations created using this workstation configuration are allowed to use. If specified, users will have the option to choose from the list of boost configs when starting a workstation. |
| `bootDiskSizeGb` | integer (int32) | Optional. The size of the boot disk for the VM in gigabytes (GB). The minimum boot disk size is `30` GB. Defaults to `50` GB. |
| `confidentialInstanceConfig` | GceConfidentialInstanceConfig | Optional. A set of Compute Engine Confidential VM instance options. |
| `disablePublicIpAddresses` | boolean | Optional. When set to true, disables public IP addresses for VMs. If you disable public IP addresses, you must set up Private Google Access or Cloud NAT on your network. If you use Private Google Access and you use `private.googleapis.com` or `restricted.googleapis.com` for Container Registry and Artifact Registry, make sure that you set up DNS records for domains `*.gcr.io` and `*.pkg.dev`. Defaults to false (VMs have public IP addresses). |
| `disableSsh` | boolean | Optional. Whether to disable SSH access to the VM. |
| `enableNestedVirtualization` | boolean | Optional. Whether to enable nested virtualization on Cloud Workstations VMs created using this workstation configuration. Defaults to false. Nested virtualization lets you run virtual machine (VM) instances inside your workstation. Before enabling nested virtualization, consider the following important considerations. Cloud Workstations instances are subject to the same restrictions as Compute Engine instances (https://cloud.google.com/compute/docs/instances/nested-virtualization/overview#restrictions): \* \*\*Organization policy\*\*: projects, folders, or organizations may be restricted from creating nested VMs if the \*\*Disable VM nested virtualization\*\* constraint is enforced in the organization policy. For more information, see the Compute Engine section, Checking whether nested virtualization is allowed (https://cloud.google.com/compute/docs/instances/nested-virtualization/managing-constraint#checking_whether_nested_virtualization_is_allowed). \* \*\*Performance\*\*: nested VMs might experience a 10% or greater decrease in performance for workloads that are CPU-bound and possibly greater than a 10% decrease for workloads that are input/output bound. \* \*\*Machine Type\*\*: nested virtualization can only be enabled on workstation configurations that specify a machine_type in the N1 or N2 machine series. |
| `instanceMetadata` | object | Optional. Custom metadata to apply to Compute Engine instances. |
| `machineType` | string | Optional. The type of machine to use for VM instances—for example, `"e2-standard-4"`. For more information about machine types that Cloud Workstations supports, see the list of available machine types (https://cloud.google.com/workstations/docs/available-machine-types). |
| `poolSize` | integer (int32) | Optional. The number of VMs that the system should keep idle so that new workstations can be started quickly for new users. Defaults to `0` in the API. |
| `pooledInstances` | integer (int32) | Output only. Number of instances currently available in the pool for faster workstation startup. |
| `serviceAccount` | string | Optional. The email address of the service account for Cloud Workstations VMs created with this configuration. When specified, be sure that the service account has `logging.logEntries.create` and `monitoring.timeSeries.create` permissions on the project so it can write logs out to Cloud Logging. If using a custom container image, the service account must have Artifact Registry Reader (https://cloud.google.com/artifact-registry/docs/access-control#roles) permission to pull the specified image. If you as the administrator want to be able to `ssh` into the underlying VM, you need to set this value to a service account for which you have the `iam.serviceAccounts.actAs` permission. Conversely, if you don't want anyone to be able to `ssh` into the underlying VM, use a service account where no one has that permission. If not set, VMs run with a service account provided by the Cloud Workstations service, and the image must be publicly accessible. |
| `serviceAccountScopes` | array<string> | Optional. Scopes to grant to the service_account. When specified, users of workstations under this configuration must have `iam.serviceAccounts.actAs` on the service account. |
| `shieldedInstanceConfig` | GceShieldedInstanceConfig | Optional. A set of Compute Engine Shielded instance options. |
| `startupScriptUri` | string | Optional. Link to the startup script stored in Cloud Storage. This script will be run on the host workstation VM when the VM is created. The URI must be of the form gs://{bucket-name}/{object-name}. If specifying a startup script, the service account must have Permission to access the bucket and script file in Cloud Storage (https://cloud.google.com/storage/docs/access-control/iam-permissions). Otherwise, the script must be publicly accessible. Note that the service regularly updates the OS version of the host VM, and it is the responsibility of the user to ensure the script stays compatible with the OS version. |
| `tags` | array<string> | Optional. Network tags to add to the Compute Engine VMs backing the workstations. This option applies network tags (https://cloud.google.com/vpc/docs/add-remove-network-tags) to VMs created with this configuration. These network tags enable the creation of firewall rules (https://cloud.google.com/workstations/docs/configure-firewall-rules). |
| `vmTags` | object | Optional. Resource manager tags to be bound to this instance. Tag keys and values have the same definition as resource manager tags (https://cloud.google.com/resource-manager/docs/tags/tags-overview). Keys must be in the format `tagKeys/{tag_key_id}`, and values are in the format `tagValues/456`. |

### `GceInstance` (v1beta)

- A runtime using a Compute Engine instance.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `accelerators` | array<Accelerator> | Optional. A list of the type and count of accelerator cards attached to the instance. |
| `boostConfigs` | array<BoostConfig> | Optional. A list of the boost configurations that workstations created using this workstation configuration are allowed to use. If specified, users will have the option to choose from the list of boost configs when starting a workstation. |
| `bootDiskSizeGb` | integer (int32) | Optional. The size of the boot disk for the VM in gigabytes (GB). The minimum boot disk size is `30` GB. Defaults to `50` GB. |
| `confidentialInstanceConfig` | GceConfidentialInstanceConfig | Optional. A set of Compute Engine Confidential VM instance options. |
| `disablePublicIpAddresses` | boolean | Optional. When set to true, disables public IP addresses for VMs. If you disable public IP addresses, you must set up Private Google Access or Cloud NAT on your network. If you use Private Google Access and you use `private.googleapis.com` or `restricted.googleapis.com` for Container Registry and Artifact Registry, make sure that you set up DNS records for domains `*.gcr.io` and `*.pkg.dev`. Defaults to false (VMs have public IP addresses). |
| `disableSsh` | boolean | Optional. Whether to disable SSH access to the VM. |
| `enableNestedVirtualization` | boolean | Optional. Whether to enable nested virtualization on Cloud Workstations VMs created using this workstation configuration. Defaults to false. Nested virtualization lets you run virtual machine (VM) instances inside your workstation. Before enabling nested virtualization, consider the following important considerations. Cloud Workstations instances are subject to the same restrictions as Compute Engine instances (https://cloud.google.com/compute/docs/instances/nested-virtualization/overview#restrictions): \* \*\*Organization policy\*\*: projects, folders, or organizations may be restricted from creating nested VMs if the \*\*Disable VM nested virtualization\*\* constraint is enforced in the organization policy. For more information, see the Compute Engine section, Checking whether nested virtualization is allowed (https://cloud.google.com/compute/docs/instances/nested-virtualization/managing-constraint#checking_whether_nested_virtualization_is_allowed). \* \*\*Performance\*\*: nested VMs might experience a 10% or greater decrease in performance for workloads that are CPU-bound and possibly greater than a 10% decrease for workloads that are input/output bound. \* \*\*Machine Type\*\*: nested virtualization can only be enabled on workstation configurations that specify a machine_type in the N1 or N2 machine series. |
| `instanceMetadata` | object | Optional. Custom metadata to apply to Compute Engine instances. |
| `machineType` | string | Optional. The type of machine to use for VM instances—for example, `"e2-standard-4"`. For more information about machine types that Cloud Workstations supports, see the list of available machine types (https://cloud.google.com/workstations/docs/available-machine-types). |
| `poolSize` | integer (int32) | Optional. The number of VMs that the system should keep idle so that new workstations can be started quickly for new users. Defaults to `0` in the API. |
| `pooledInstances` | integer (int32) | Output only. Number of instances currently available in the pool for faster workstation startup. |
| `reservationAffinity` | ReservationAffinity | Optional. ReservationAffinity (https://cloud.google.com/compute/docs/instances/reserving-zonal-resources) specifies a reservation that can be consumed to create VM instances. If SPECIFIC_RESERVATION is specified, Cloud Workstations will only create VMs in the zone where the reservation is located. This would affect availability since the service will no longer be resilient to zonal outages. If ANY_RESERVATION is specified, creating reservations in both zones that the config creates VMs in will ensure higher availability. \*\*Important Considerations for Reservation Affinity:\*\* \* This feature is intended for advanced users and requires familiarity with Google Compute Engine reservations. \* Using reservations incurs charges, regardless of utilization. \* The resources in the pool will consume the specified reservation. Take this into account when setting the pool size. |
| `serviceAccount` | string | Optional. The email address of the service account for Cloud Workstations VMs created with this configuration. When specified, be sure that the service account has `logging.logEntries.create` and `monitoring.timeSeries.create` permissions on the project so it can write logs out to Cloud Logging. If using a custom container image, the service account must have Artifact Registry Reader (https://cloud.google.com/artifact-registry/docs/access-control#roles) permission to pull the specified image. If you as the administrator want to be able to `ssh` into the underlying VM, you need to set this value to a service account for which you have the `iam.serviceAccounts.actAs` permission. Conversely, if you don't want anyone to be able to `ssh` into the underlying VM, use a service account where no one has that permission. If not set, VMs run with a service account provided by the Cloud Workstations service, and the image must be publicly accessible. |
| `serviceAccountScopes` | array<string> | Optional. Scopes to grant to the service_account. When specified, users of workstations under this configuration must have `iam.serviceAccounts.actAs` on the service account. |
| `shieldedInstanceConfig` | GceShieldedInstanceConfig | Optional. A set of Compute Engine Shielded instance options. |
| `startupScriptUri` | string | Optional. Link to the startup script stored in Cloud Storage. This script will be run on the host workstation VM when the VM is created. The URI must be of the form gs://{bucket-name}/{object-name}. If specifying a startup script, the service account must have Permission to access the bucket and script file in Cloud Storage (https://cloud.google.com/storage/docs/access-control/iam-permissions). Otherwise, the script must be publicly accessible. Note that the service regularly updates the OS version of the host VM, and it is the responsibility of the user to ensure the script stays compatible with the OS version. |
| `tags` | array<string> | Optional. Network tags to add to the Compute Engine VMs backing the workstations. This option applies network tags (https://cloud.google.com/vpc/docs/add-remove-network-tags) to VMs created with this configuration. These network tags enable the creation of firewall rules (https://cloud.google.com/workstations/docs/configure-firewall-rules). |
| `vmTags` | object | Optional. Resource manager tags to be bound to this instance. Tag keys and values have the same definition as resource manager tags (https://cloud.google.com/resource-manager/docs/tags/tags-overview). Keys must be in the format `tagKeys/{tag_key_id}`, and values are in the format `tagValues/456`. |

### `GceInstanceHost`

- The Compute Engine instance host.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Optional. Output only. The ID of the Compute Engine instance. |
| `name` | string | Optional. Output only. The name of the Compute Engine instance. |
| `zone` | string | Optional. Output only. The zone of the Compute Engine instance. |

### `GcePersistentDisk`

- An EphemeralDirectory is backed by a Compute Engine persistent disk.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskType` | string | Optional. Type of the disk to use. Defaults to `"pd-standard"`. |
| `readOnly` | boolean | Optional. Whether the disk is read only. If true, the disk may be shared by multiple VMs and source_snapshot must be set. |
| `sourceImage` | string | Optional. Name of the disk image to use as the source for the disk. Must be empty if source_snapshot is set. Updating source_image will update content in the ephemeral directory after the workstation is restarted. Only file systems supported by Container-Optimized OS (COS) are explicitly supported. For a list of supported file systems, please refer to the COS documentation (https://cloud.google.com/container-optimized-os/docs/concepts/supported-filesystems). This field is mutable. |
| `sourceSnapshot` | string | Optional. Name of the snapshot to use as the source for the disk. Must be empty if source_image is set. Must be empty if read_only is false. Updating source_snapshot will update content in the ephemeral directory after the workstation is restarted. Only file systems supported by Container-Optimized OS (COS) are explicitly supported. For a list of supported file systems, see the filesystems available in Container-Optimized OS (https://cloud.google.com/container-optimized-os/docs/concepts/supported-filesystems). This field is mutable. |

### `GceRegionalPersistentDisk`

- A Persistent Directory backed by a Compute Engine regional persistent disk. The persistent_directories field is repeated, but it may contain only one entry. It creates a persistent disk (https://cloud.google.com/compute/docs/disks/persistent-disks) that mounts to the workstation VM at `/home` when the session starts and detaches when the session ends. If this field is empty, workstations created with this configuration do not have a persistent home directory.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `archiveTimeout` | string (google-duration) | Optional. Number of seconds to wait after initially creating or subsequently shutting down the workstation before converting its disk into a snapshot. This generally saves costs at the expense of greater startup time on next workstation start, as the service will need to create a disk from the archival snapshot. A value of `"0s"` indicates that the disk will never be archived. |
| `diskType` | string | Optional. The type of the persistent disk (https://cloud.google.com/compute/docs/disks#disk-types) for the home directory. Defaults to `"pd-standard"`. |
| `fsType` | string | Optional. Type of file system that the disk should be formatted with. The workstation image must support this file system type. Must be empty if source_snapshot is set. Defaults to `"ext4"`. |
| `maxSizeGb` | integer (int32) | Optional. Maximum size in GB to which this persistent directory can be resized. Defaults to `0`, which indicates no maximum limit is enforced by this configuration. Resizing is still subject to the quotas and limits of the underlying disk type. |
| `reclaimPolicy` | string enum | Optional. Whether the persistent disk should be deleted when the workstation is deleted. Valid values are `DELETE` and `RETAIN`. Defaults to `DELETE`. Values: `RECLAIM_POLICY_UNSPECIFIED`, `DELETE`, `RETAIN`. |
| `sizeGb` | integer (int32) | Optional. The GB capacity of a persistent home directory for each workstation created with this configuration. Must be empty if source_snapshot is set. Valid values are `10`, `50`, `100`, `200`, `500`, or `1000`. Defaults to `200`. If less than `200` GB, the disk_type must be `"pd-balanced"` or `"pd-ssd"`. |
| `sourceSnapshot` | string | Optional. Name of the snapshot to use as the source for the disk. If set, size_gb and fs_type must be empty. Must be formatted as ext4 file system with no partitions. |

### `GceShieldedInstanceConfig`

- A set of Compute Engine Shielded instance options.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableIntegrityMonitoring` | boolean | Optional. Whether the instance has integrity monitoring enabled. |
| `enableSecureBoot` | boolean | Optional. Whether the instance has Secure Boot enabled. |
| `enableVtpm` | boolean | Optional. Whether the instance has the vTPM enabled. |

### `GenerateAccessTokenRequest`

- Request message for GenerateAccessToken.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | Desired expiration time of the access token. This value must be at most 24 hours in the future. If a value is not specified, the token's expiration time will be set to a default value of 1 hour in the future. |
| `port` | integer (int32) | Optional. Port for which the access token should be generated. If specified, the generated access token grants access only to the specified port of the workstation. If specified, values must be within the range \[1 - 65535\]. If not specified, the generated access token grants access to all ports of the workstation. |
| `ttl` | string (google-duration) | Desired lifetime duration of the access token. This value must be at most 24 hours. If a value is not specified, the token's lifetime will be set to a default value of 1 hour. |

### `GenerateAccessTokenResponse`

- Response message for GenerateAccessToken.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessToken` | string | The generated bearer access token. To use this token, include it in an Authorization header of an HTTP request sent to the associated workstation's hostname—for example, `Authorization: Bearer `. |
| `expireTime` | string (google-datetime) | Time at which the generated token will expire. |

### `GoogleProtobufEmpty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Host`

- Runtime host for a workstation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gceInstance` | GceInstance | Specifies a Compute Engine instance as the host. |

### `HttpOptions`

- HTTP options for the running workstations.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `allowedUnauthenticatedCorsPreflightRequests` | boolean | Optional. By default, the workstations service makes sure that all requests to the workstation are authenticated. CORS preflight requests do not include cookies or custom headers, and so are considered unauthenticated and blocked by the workstations service. Enabling this option allows these unauthenticated CORS preflight requests through to the workstation, where it becomes the responsibility of the destination server in the workstation to validate the request. |
| `disableLocalhostReplacement` | boolean | Optional. By default, the workstations service replaces references to localhost, 127.0.0.1, and 0.0.0.0 with the workstation's hostname in http responses from the workstation so that applications under development run properly on the workstation. This may intefere with some applications, and so this option allows that behavior to be disabled. |

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

### `ListUsableWorkstationConfigsResponse`

- Response message for ListUsableWorkstationConfigs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Unreachable resources. |
| `workstationConfigs` | array<WorkstationConfig> | The requested configs. |

### `ListUsableWorkstationsResponse`

- Response message for ListUsableWorkstations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Unreachable resources. |
| `workstations` | array<Workstation> | The requested workstations. |

### `ListWorkstationClustersResponse`

- Response message for ListWorkstationClusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Unreachable resources. |
| `workstationClusters` | array<WorkstationCluster> | The requested workstation clusters. |

### `ListWorkstationConfigsResponse`

- Response message for ListWorkstationConfigs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Unreachable resources. |
| `workstationConfigs` | array<WorkstationConfig> | The requested configs. |

### `ListWorkstationsResponse`

- Response message for ListWorkstations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Optional. Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Optional. Unreachable resources. |
| `workstations` | array<Workstation> | The requested workstations. |

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

### `OAuthToken`

- Represents an OAuth 2.0 access token and its associated metadata.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `accessToken` | string | Required. The OAuth 2.0 access token value. |
| `email` | string | Optional. The email address associated with the OAuth 2.0 access token. |
| `expireTime` | string (google-datetime) | Optional. The time the OAuth access token will expire. This should be the time the access token was generated plus the expires_in offset returned from the Access Token Response. Only one of `expire_time` or `expires_in` should be specified. |
| `expiresIn` | string (google-duration) | Optional. The lifetime duration of the access token. Only one of `expire_time` or `expires_in` should be specified. |
| `scopes` | string | Optional. The scopes associated with the OAuth 2.0 access token. See https://developers.google.com/identity/protocols/oauth2/scopes for more information. |

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

- Metadata for long-running operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. Time that the operation was created. |
| `endTime` | string (google-datetime) | Output only. Time that the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `PersistentDirectory`

- A directory to persist across workstation sessions. Updates to this field will not update existing workstations and will only take effect on new workstations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gceHd` | GceHyperdiskBalancedHighAvailability | A PersistentDirectory backed by a Compute Engine hyperdisk high availability disk. |
| `gcePd` | GceRegionalPersistentDisk | A PersistentDirectory backed by a Compute Engine persistent disk. |
| `mountPath` | string | Optional. Location of this directory in the running workstation. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PortRange`

- A PortRange defines a range of ports. Both first and last are inclusive. To specify a single port, both first and last should be the same.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `first` | integer (int32) | Required. Starting port number for the current range of ports. Valid ports are 22, 80, and ports within the range 1024-65535. |
| `last` | integer (int32) | Required. Ending port number for the current range of ports. Valid ports are 22, 80, and ports within the range 1024-65535. |

### `PrivateClusterConfig`

- Configuration options for private workstation clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedProjects` | array<string> | Optional. Additional projects that are allowed to attach to the workstation cluster's service attachment. By default, the workstation cluster's project and the VPC host project (if different) are allowed. |
| `clusterHostname` | string | Output only. Hostname for the workstation cluster. This field will be populated only when private endpoint is enabled. To access workstations in the workstation cluster, create a new DNS zone mapping this domain name to an internal IP address and a forwarding rule mapping that address to the service attachment. |
| `enablePrivateEndpoint` | boolean | Immutable. Whether Workstations endpoint is private. |
| `serviceAttachmentUri` | string | Output only. Service attachment URI for the workstation cluster. The service attachment is created when private endpoint is enabled. To access workstations in the workstation cluster, configure access to the managed service using Private Service Connect (https://cloud.google.com/vpc/docs/configure-private-service-connect-services). |

### `PushCredentialsRequest`

- Request message for PushCredentials.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `applicationDefaultCredentials` | OAuthToken | Optional. Credentials used by Cloud Client Libraries, Google API Client Libraries, and other tooling within the user container. For more information, see https://cloud.google.com/docs/authentication/application-default-credentials |

### `ReadinessCheck`

- A readiness check to be performed on a workstation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | Optional. Path to which the request should be sent. |
| `port` | integer (int32) | Optional. Port to which the request should be sent. |

### `ReservationAffinity`

- ReservationAffinity is the configuration of the desired reservation from which instances can consume resources.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `consumeReservationType` | string enum | Optional. Corresponds to the type of reservation consumption. Values: `TYPE_UNSPECIFIED`, `NO_RESERVATION`, `ANY_RESERVATION`, `SPECIFIC_RESERVATION`. |
| `key` | string | Optional. Corresponds to the label key of reservation resource. |
| `values` | array<string> | Optional. Corresponds to the label values of reservation resources. Valid values are either the name of a reservation in the same project or "projects/{project}/reservations/{reservation}" to target a shared reservation in the same zone but in a different project. |

### `RuntimeHost`

- Runtime host for the workstation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gceInstanceHost` | GceInstanceHost | Specifies a Compute Engine instance as the host. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `StartWorkstationRequest`

- Request message for StartWorkstation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `boostConfig` | string | Optional. If set, the workstation starts using the boost configuration with the specified ID. |
| `etag` | string | Optional. If set, the request will be rejected if the latest version of the workstation on the server does not have this ETag. |
| `validateOnly` | boolean | Optional. If set, validate the request and preview the result, but do not actually apply it. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StopWorkstationRequest`

- Request message for StopWorkstation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. If set, the request will be rejected if the latest version of the workstation on the server does not have this ETag. |
| `validateOnly` | boolean | Optional. If set, validate the request and preview the result, but do not actually apply it. |

### `SuspendWorkstationRequest`

- Request message for SuspendWorkstation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. If set, the request will be rejected if the latest version of the workstation on the server does not have this ETag. |
| `validateOnly` | boolean | Optional. If set, validate the request and preview the result, but do not actually apply it. |

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

### `Workstation`

- A single instance of a developer workstation with its own persistent storage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Client-specified annotations. |
| `createTime` | string (google-datetime) | Output only. Time when this workstation was created. |
| `deleteTime` | string (google-datetime) | Output only. Time when this workstation was soft-deleted. |
| `displayName` | string | Optional. Human-readable name for this workstation. |
| `env` | object | Optional. Environment variables passed to the workstation container's entrypoint. |
| `etag` | string | Optional. Checksum computed by the server. May be sent on update and delete requests to make sure that the client has an up-to-date value before proceeding. |
| `host` | string | Output only. Host to which clients can send HTTPS traffic that will be received by the workstation. Authorized traffic will be received to the workstation as HTTP on port 80. To send traffic to a different port, clients may prefix the host with the destination port in the format `{port}-{host}`. |
| `kmsKey` | string | Output only. The name of the Google Cloud KMS encryption key used to encrypt this workstation. The KMS key can only be configured in the WorkstationConfig. The expected format is `projects/*/locations/*/keyRings/*/cryptoKeys/*`. |
| `labels` | object | Optional. Labels (https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation and that are also propagated to the underlying Compute Engine resources. |
| `name` | string | Identifier. Full name of this workstation. |
| `persistentDirectories` | array<WorkstationPersistentDirectory> | Optional. Directories to persist across workstation sessions. |
| `reconciling` | boolean | Output only. Indicates whether this workstation is currently being updated to match its intended state. |
| `runtimeHost` | RuntimeHost | Optional. Output only. Runtime host for the workstation when in STATE_RUNNING. |
| `sourceWorkstation` | string | Optional. The source workstation from which this workstation's persistent directories were cloned on creation. |
| `startTime` | string (google-datetime) | Output only. Time when this workstation was most recently successfully started, regardless of the workstation's initial state. |
| `state` | string enum | Output only. Current state of the workstation. Values: `STATE_UNSPECIFIED`, `STATE_STARTING`, `STATE_RUNNING`, `STATE_STOPPING`, `STATE_STOPPED`, `STATE_SUSPENDING`, `STATE_SUSPENDED`. |
| `uid` | string | Output only. A system-assigned unique identifier for this workstation. |
| `updateTime` | string (google-datetime) | Output only. Time when this workstation was most recently updated. |

### `Workstation` (v1beta)

- A single instance of a developer workstation with its own persistent storage.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Client-specified annotations. |
| `boostConfigs` | array<WorkstationBoostConfig> | Output only. List of available boost configuration IDs that this workstation can be boosted up to. |
| `conditions` | array<Status> | Output only. Status conditions describing the workstation's current state. |
| `createTime` | string (google-datetime) | Output only. Time when this workstation was created. |
| `degraded` | boolean | Output only. Whether this workstation is in degraded mode, in which case it may require user action to restore full functionality. The conditions field contains detailed information about the status of the workstation. |
| `deleteTime` | string (google-datetime) | Output only. Time when this workstation was soft-deleted. |
| `displayName` | string | Optional. Human-readable name for this workstation. |
| `env` | object | Optional. Environment variables passed to the workstation container's entrypoint. |
| `etag` | string | Optional. Checksum computed by the server. May be sent on update and delete requests to make sure that the client has an up-to-date value before proceeding. |
| `host` | string | Output only. Host to which clients can send HTTPS traffic that will be received by the workstation. Authorized traffic will be received to the workstation as HTTP on port 80. To send traffic to a different port, clients may prefix the host with the destination port in the format `{port}-{host}`. |
| `kmsKey` | string | Output only. The name of the Google Cloud KMS encryption key used to encrypt this workstation. The KMS key can only be configured in the WorkstationConfig. The expected format is `projects/*/locations/*/keyRings/*/cryptoKeys/*`. |
| `labels` | object | Optional. Labels (https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation and that are also propagated to the underlying Compute Engine resources. |
| `name` | string | Identifier. Full name of this workstation. |
| `persistentDirectories` | array<WorkstationPersistentDirectory> | Optional. Directories to persist across workstation sessions. |
| `reconciling` | boolean | Output only. Indicates whether this workstation is currently being updated to match its intended state. |
| `runtimeHost` | RuntimeHost | Optional. Output only. Runtime host for the workstation when in STATE_RUNNING. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `sourceWorkstation` | string | Optional. The source workstation from which this workstation's persistent directories were cloned on creation. |
| `startTime` | string (google-datetime) | Output only. Time when this workstation was most recently successfully started, regardless of the workstation's initial state. |
| `state` | string enum | Output only. Current state of the workstation. Values: `STATE_UNSPECIFIED`, `STATE_STARTING`, `STATE_RUNNING`, `STATE_STOPPING`, `STATE_STOPPED`, `STATE_SUSPENDING`, `STATE_SUSPENDED`. |
| `uid` | string | Output only. A system-assigned unique identifier for this workstation. |
| `updateTime` | string (google-datetime) | Output only. Time when this workstation was most recently updated. |

### `WorkstationBoostConfig`

- Boost configuration for this workstation. This object is populated from the parent workstation configuration.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. Boost configuration ID. |
| `running` | boolean | Output only. Whether or not the current workstation is actively boosted with this id. |

### `WorkstationCluster`

- A workstation cluster resource in the Cloud Workstations API. Defines a group of workstations in a particular region and the VPC network they're attached to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Client-specified annotations. |
| `conditions` | array<Status> | Output only. Status conditions describing the workstation cluster's current state. |
| `controlPlaneIp` | string | Output only. The private IP address of the control plane for this workstation cluster. Workstation VMs need access to this IP address to work with the service, so make sure that your firewall rules allow egress from the workstation VMs to this address. |
| `createTime` | string (google-datetime) | Output only. Time when this workstation cluster was created. |
| `degraded` | boolean | Output only. Whether this workstation cluster is in degraded mode, in which case it may require user action to restore full functionality. The conditions field contains detailed information about the status of the cluster. |
| `deleteTime` | string (google-datetime) | Output only. Time when this workstation cluster was soft-deleted. |
| `displayName` | string | Optional. Human-readable name for this workstation cluster. |
| `domainConfig` | DomainConfig | Optional. Configuration options for a custom domain. |
| `etag` | string | Optional. Checksum computed by the server. May be sent on update and delete requests to make sure that the client has an up-to-date value before proceeding. |
| `gatewayConfig` | GatewayConfig | Optional. Configuration options for Cluster HTTP Gateway. |
| `labels` | object | Optional. Labels (https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation cluster and that are also propagated to the underlying Compute Engine resources. |
| `name` | string | Identifier. Full name of this workstation cluster. |
| `network` | string | Immutable. Name of the Compute Engine network in which instances associated with this workstation cluster will be created. |
| `privateClusterConfig` | PrivateClusterConfig | Optional. Configuration for private workstation cluster. |
| `reconciling` | boolean | Output only. Indicates whether this workstation cluster is currently being updated to match its intended state. |
| `subnetwork` | string | Immutable. Name of the Compute Engine subnetwork in which instances associated with this workstation cluster will be created. Must be part of the subnetwork specified for this workstation cluster. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `uid` | string | Output only. A system-assigned unique identifier for this workstation cluster. |
| `updateTime` | string (google-datetime) | Output only. Time when this workstation cluster was most recently updated. |
| `workstationAuthorizationUrl` | string | Optional. Specifies the redirect URL for unauthorized requests received by workstation VMs in this cluster. Redirects to this endpoint will send a base64 encoded `state` query param containing the target workstation name and original request hostname. The endpoint is responsible for retrieving a token using `GenerateAccessToken` and redirecting back to the original hostname with the token. |
| `workstationLaunchUrl` | string | Optional. Specifies the launch URL for workstations in this cluster. Requests sent to unstarted workstations will be redirected to this URL. Requests redirected to the launch endpoint will be sent with a `workstation` and `project` query parameter containing the full workstation resource name and project ID, respectively. The launch endpoint is responsible for starting the workstation, polling it until it reaches `STATE_RUNNING`, and then issuing a redirect to the workstation's host URL. |

### `WorkstationCluster` (v1beta)

- A workstation cluster resource in the Cloud Workstations API. Defines a group of workstations in a particular region and the VPC network they're attached to.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Client-specified annotations. |
| `conditions` | array<Status> | Output only. Status conditions describing the workstation cluster's current state. |
| `consoleBaseUrl` | string | Optional. Specifies a custom base URL for the Google Cloud Console. This field is intended to be user-configurable to support data residency for Cloud Workstations users. This will be used generally for user journeys where users need to go to the Cloud Console from Code OSS. When the Auth and Launch URLs are unset, this will be used as the base URL for those endpoints if set. |
| `controlPlaneIp` | string | Output only. The private IP address of the control plane for this workstation cluster. Workstation VMs need access to this IP address to work with the service, so make sure that your firewall rules allow egress from the workstation VMs to this address. |
| `createTime` | string (google-datetime) | Output only. Time when this workstation cluster was created. |
| `degraded` | boolean | Output only. Whether this workstation cluster is in degraded mode, in which case it may require user action to restore full functionality. The conditions field contains detailed information about the status of the cluster. |
| `deleteTime` | string (google-datetime) | Output only. Time when this workstation cluster was soft-deleted. |
| `displayName` | string | Optional. Human-readable name for this workstation cluster. |
| `domainConfig` | DomainConfig | Optional. Configuration options for a custom domain. |
| `etag` | string | Optional. Checksum computed by the server. May be sent on update and delete requests to make sure that the client has an up-to-date value before proceeding. |
| `gatewayConfig` | GatewayConfig | Optional. Configuration options for Cluster HTTP Gateway. |
| `labels` | object | Optional. Labels (https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation cluster and that are also propagated to the underlying Compute Engine resources. |
| `name` | string | Identifier. Full name of this workstation cluster. |
| `network` | string | Immutable. Name of the Compute Engine network in which instances associated with this workstation cluster will be created. |
| `privateClusterConfig` | PrivateClusterConfig | Optional. Configuration for private workstation cluster. |
| `reconciling` | boolean | Output only. Indicates whether this workstation cluster is currently being updated to match its intended state. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `subnetwork` | string | Immutable. Name of the Compute Engine subnetwork in which instances associated with this workstation cluster will be created. Must be part of the subnetwork specified for this workstation cluster. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `uid` | string | Output only. A system-assigned unique identifier for this workstation cluster. |
| `updateTime` | string (google-datetime) | Output only. Time when this workstation cluster was most recently updated. |
| `workstationAuthorizationUrl` | string | Optional. Specifies the redirect URL for unauthorized requests received by workstation VMs in this cluster. Redirects to this endpoint will send a base64 encoded `state` query param containing the target workstation name and original request hostname. The endpoint is responsible for retrieving a token using `GenerateAccessToken` and redirecting back to the original hostname with the token. |
| `workstationLaunchUrl` | string | Optional. Specifies the launch URL for workstations in this cluster. Requests sent to unstarted workstations will be redirected to this URL. Requests redirected to the launch endpoint will be sent with a `workstation` and `project` query parameter containing the full workstation resource name and project ID, respectively. The launch endpoint is responsible for starting the workstation, polling it until it reaches `STATE_RUNNING`, and then issuing a redirect to the workstation's host URL. |

### `WorkstationConfig`

- A workstation configuration resource in the Cloud Workstations API. Workstation configurations act as templates for workstations. The workstation configuration defines details such as the workstation virtual machine (VM) instance type, persistent storage, container image defining environment, which IDE or Code Editor to use, and more. Administrators and platform teams can also use Identity and Access Management (IAM) (https://cloud.google.com/iam/docs/overview) rules to grant access to teams or to individual developers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedPorts` | array<PortRange> | Optional. A list of PortRanges specifying single ports or ranges of ports that are externally accessible in the workstation. Allowed ports must be one of 22, 80, or within range 1024-65535. If not specified defaults to ports 22, 80, and ports 1024-65535. |
| `annotations` | object | Optional. Client-specified annotations. |
| `conditions` | array<Status> | Output only. Status conditions describing the workstation configuration's current state. |
| `container` | Container | Optional. Container that runs upon startup for each workstation using this workstation configuration. |
| `createTime` | string (google-datetime) | Output only. Time when this workstation configuration was created. |
| `degraded` | boolean | Output only. Whether this workstation configuration is in degraded mode, in which case it may require user action to restore full functionality. The conditions field contains detailed information about the status of the configuration. |
| `deleteTime` | string (google-datetime) | Output only. Time when this workstation configuration was soft-deleted. |
| `disableTcpConnections` | boolean | Optional. Disables support for plain TCP connections in the workstation. By default the service supports TCP connections through a websocket relay. Setting this option to true disables that relay, which prevents the usage of services that require plain TCP connections, such as SSH. When enabled, all communication must occur over HTTPS or WSS. |
| `displayName` | string | Optional. Human-readable name for this workstation configuration. |
| `enableAuditAgent` | boolean | Optional. Whether to enable Linux `auditd` logging on the workstation. When enabled, a service_account must also be specified that has `roles/logging.logWriter` and `roles/monitoring.metricWriter` on the project. Operating system audit logging is distinct from Cloud Audit Logs (https://cloud.google.com/workstations/docs/audit-logging) and Container output logging (https://cloud.google.com/workstations/docs/container-output-logging#overview). Operating system audit logs are available in the Cloud Logging (https://cloud.google.com/logging/docs) console by querying: resource.type="gce_instance" log_name:"/logs/linux-auditd" |
| `encryptionKey` | CustomerEncryptionKey | Immutable. Encrypts resources of this workstation configuration using a customer-managed encryption key (CMEK). If specified, the boot disk of the Compute Engine instance and the persistent disk are encrypted using this encryption key. If this field is not set, the disks are encrypted using a generated key. Customer-managed encryption keys do not protect disk metadata. If the customer-managed encryption key is rotated, when the workstation instance is stopped, the system attempts to recreate the persistent disk with the new version of the key. Be sure to keep older versions of the key until the persistent disk is recreated. Otherwise, data on the persistent disk might be lost. If the encryption key is revoked, the workstation session automatically stops within 7 hours. Immutable after the workstation configuration is created. |
| `ephemeralDirectories` | array<EphemeralDirectory> | Optional. Ephemeral directories which won't persist across workstation sessions. |
| `etag` | string | Optional. Checksum computed by the server. May be sent on update and delete requests to make sure that the client has an up-to-date value before proceeding. |
| `grantWorkstationAdminRoleOnCreate` | boolean | Optional. Grant creator of a workstation `roles/workstations.policyAdmin` role along with `roles/workstations.user` role on the workstation created by them. This allows workstation users to share access to either their entire workstation, or individual ports. Defaults to false. |
| `host` | Host | Optional. Runtime host for the workstation. |
| `idleAction` | string enum | Optional. The action to take when the workstation has been idle for the duration specified in idle_timeout. Defaults to STOP. Values: `IDLE_ACTION_UNSPECIFIED`, `STOP`, `SUSPEND`. |
| `idleTimeout` | string (google-duration) | Optional. Number of seconds to wait before automatically stopping or suspending a workstation after it last received user traffic. See idle_action to configure whether to stop or suspend idle workstations. A value of `"0s"` indicates that Cloud Workstations VMs created with this configuration should never time out due to idleness. Provide duration (https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#duration) terminated by `s` for seconds—for example, `"7200s"` (2 hours). The default is `"1200s"` (20 minutes). |
| `labels` | object | Optional. Labels (https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation configuration and that are also propagated to the underlying Compute Engine resources. |
| `maxUsableWorkstations` | integer (int32) | Optional. Maximum number of workstations under this configuration a user can have `workstations.workstation.use` permission on. Only enforced on CreateWorkstation API calls on the user issuing the API request. Can be overridden by: - granting a user workstations.workstationConfigs.exemptMaxUsableWorkstationLimit permission, or - having a user with that permission create a workstation and granting another user `workstations.workstation.use` permission on that workstation. If not specified, defaults to `0`, which indicates unlimited. |
| `name` | string | Identifier. Full name of this workstation configuration. |
| `persistentDirectories` | array<PersistentDirectory> | Optional. Directories to persist across workstation sessions. |
| `readinessChecks` | array<ReadinessCheck> | Optional. Readiness checks to perform when starting a workstation using this workstation configuration. Mark a workstation as running only after all specified readiness checks return 200 status codes. |
| `reconciling` | boolean | Output only. Indicates whether this workstation configuration is currently being updated to match its intended state. |
| `replicaZones` | array<string> | Optional. Immutable. Specifies the zones used to replicate the VM and disk resources within the region. If set, exactly two zones within the workstation cluster's region must be specified—for example, `['us-central1-a', 'us-central1-f']`. If this field is empty, two default zones within the region are used. Immutable after the workstation configuration is created. |
| `runningTimeout` | string (google-duration) | Optional. Number of seconds to wait before automatically stopping a workstation. We recommend that workstations be stopped daily so that security updates can be applied upon restart. The idle_timeout and running_timeout fields are independent of each other. Note that the running_timeout field stops workstations after the specified time, regardless of whether or not the workstations are idle. Note: This timeout applies to workstations in the following states: - STATE_RUNNING - STATE_SUSPENDED Suspending a workstation does not reset this timeout. Provide duration terminated by `s` for seconds—for example, `"54000s"` (15 hours). Defaults to `"43200s"` (12 hours). A value of `"0s"` indicates that workstations using this configuration should never time out. If encryption_key is set, it must be greater than `"0s"` and less than `"86400s"` (24 hours). Warning: A value of `"0s"` indicates that Cloud Workstations VMs created with this configuration have no maximum running time. This is strongly discouraged because you incur costs and will not pick up security updates. |
| `uid` | string | Output only. A system-assigned unique identifier for this workstation configuration. |
| `updateTime` | string (google-datetime) | Output only. Time when this workstation configuration was most recently updated. |

### `WorkstationConfig` (v1beta)

- A workstation configuration resource in the Cloud Workstations API. Workstation configurations act as templates for workstations. The workstation configuration defines details such as the workstation virtual machine (VM) instance type, persistent storage, container image defining environment, which IDE or Code Editor to use, and more. Administrators and platform teams can also use Identity and Access Management (IAM) (https://cloud.google.com/iam/docs/overview) rules to grant access to teams or to individual developers.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `allowedPorts` | array<PortRange> | Optional. A list of PortRanges specifying single ports or ranges of ports that are externally accessible in the workstation. Allowed ports must be one of 22, 80, or within range 1024-65535. If not specified defaults to ports 22, 80, and ports 1024-65535. |
| `annotations` | object | Optional. Client-specified annotations. |
| `conditions` | array<Status> | Output only. Status conditions describing the workstation configuration's current state. |
| `container` | Container | Optional. Container that runs upon startup for each workstation using this workstation configuration. |
| `createTime` | string (google-datetime) | Output only. Time when this workstation configuration was created. |
| `degraded` | boolean | Output only. Whether this workstation configuration is in degraded mode, in which case it may require user action to restore full functionality. The conditions field contains detailed information about the status of the configuration. |
| `deleteTime` | string (google-datetime) | Output only. Time when this workstation configuration was soft-deleted. |
| `disableTcpConnections` | boolean | Optional. Disables support for plain TCP connections in the workstation. By default the service supports TCP connections through a websocket relay. Setting this option to true disables that relay, which prevents the usage of services that require plain TCP connections, such as SSH. When enabled, all communication must occur over HTTPS or WSS. |
| `displayName` | string | Optional. Human-readable name for this workstation configuration. |
| `enableAuditAgent` | boolean | Optional. Whether to enable Linux `auditd` logging on the workstation. When enabled, a service_account must also be specified that has `roles/logging.logWriter` and `roles/monitoring.metricWriter` on the project. Operating system audit logging is distinct from Cloud Audit Logs (https://cloud.google.com/workstations/docs/audit-logging) and Container output logging (https://cloud.google.com/workstations/docs/container-output-logging#overview). Operating system audit logs are available in the Cloud Logging (https://cloud.google.com/logging/docs) console by querying: resource.type="gce_instance" log_name:"/logs/linux-auditd" |
| `enablePushingCredentials` | boolean | Optional. Enables pushing user provided credentials to Workstations by calling workstations.pushCredentials. If application_default_credentials are supplied to pushCredentials, the provided token is returned when tools and applications running in the user container make a request for Default Application Credentials. Please note that any credentials supplied are made available to all users with access to the workstation. |
| `encryptionKey` | CustomerEncryptionKey | Immutable. Encrypts resources of this workstation configuration using a customer-managed encryption key (CMEK). If specified, the boot disk of the Compute Engine instance and the persistent disk are encrypted using this encryption key. If this field is not set, the disks are encrypted using a generated key. Customer-managed encryption keys do not protect disk metadata. If the customer-managed encryption key is rotated, when the workstation instance is stopped, the system attempts to recreate the persistent disk with the new version of the key. Be sure to keep older versions of the key until the persistent disk is recreated. Otherwise, data on the persistent disk might be lost. If the encryption key is revoked, the workstation session automatically stops within 7 hours. Immutable after the workstation configuration is created. |
| `ephemeralDirectories` | array<EphemeralDirectory> | Optional. Ephemeral directories which won't persist across workstation sessions. |
| `etag` | string | Optional. Checksum computed by the server. May be sent on update and delete requests to make sure that the client has an up-to-date value before proceeding. |
| `grantWorkstationAdminRoleOnCreate` | boolean | Optional. Grant creator of a workstation `roles/workstations.policyAdmin` role along with `roles/workstations.user` role on the workstation created by them. This allows workstation users to share access to either their entire workstation, or individual ports. Defaults to false. |
| `host` | Host | Optional. Runtime host for the workstation. |
| `httpOptions` | HttpOptions | Optional. HTTP options that customize the behavior of the workstation service's HTTP proxy. |
| `idleAction` | string enum | Optional. The action to take when the workstation has been idle for the duration specified in idle_timeout. Defaults to STOP. Values: `IDLE_ACTION_UNSPECIFIED`, `STOP`, `SUSPEND`. |
| `idleTimeout` | string (google-duration) | Optional. Number of seconds to wait before automatically stopping or suspending a workstation after it last received user traffic. See idle_action to configure whether to stop or suspend idle workstations. A value of `"0s"` indicates that Cloud Workstations VMs created with this configuration should never time out due to idleness. Provide duration (https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#duration) terminated by `s` for seconds—for example, `"7200s"` (2 hours). The default is `"1200s"` (20 minutes). |
| `labels` | object | Optional. Labels (https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation configuration and that are also propagated to the underlying Compute Engine resources. |
| `maxUsableWorkstations` | integer (int32) | Optional. Maximum number of workstations under this configuration a user can have `workstations.workstation.use` permission on. Only enforced on CreateWorkstation API calls on the user issuing the API request. Can be overridden by: - granting a user workstations.workstationConfigs.exemptMaxUsableWorkstationLimit permission, or - having a user with that permission create a workstation and granting another user `workstations.workstation.use` permission on that workstation. If not specified, defaults to `0`, which indicates unlimited. |
| `name` | string | Identifier. Full name of this workstation configuration. |
| `persistentDirectories` | array<PersistentDirectory> | Optional. Directories to persist across workstation sessions. |
| `readinessChecks` | array<ReadinessCheck> | Optional. Readiness checks to perform when starting a workstation using this workstation configuration. Mark a workstation as running only after all specified readiness checks return 200 status codes. |
| `reconciling` | boolean | Output only. Indicates whether this workstation configuration is currently being updated to match its intended state. |
| `replicaZones` | array<string> | Optional. Immutable. Specifies the zones used to replicate the VM and disk resources within the region. If set, exactly two zones within the workstation cluster's region must be specified—for example, `['us-central1-a', 'us-central1-f']`. If this field is empty, two default zones within the region are used. Immutable after the workstation configuration is created. |
| `runningTimeout` | string (google-duration) | Optional. Number of seconds to wait before automatically stopping a workstation. We recommend that workstations be stopped daily so that security updates can be applied upon restart. The idle_timeout and running_timeout fields are independent of each other. Note that the running_timeout field stops workstations after the specified time, regardless of whether or not the workstations are idle. Note: This timeout applies to workstations in the following states: - STATE_RUNNING - STATE_SUSPENDED Suspending a workstation does not reset this timeout. Provide duration terminated by `s` for seconds—for example, `"54000s"` (15 hours). Defaults to `"43200s"` (12 hours). A value of `"0s"` indicates that workstations using this configuration should never time out. If encryption_key is set, it must be greater than `"0s"` and less than `"86400s"` (24 hours). Warning: A value of `"0s"` indicates that Cloud Workstations VMs created with this configuration have no maximum running time. This is strongly discouraged because you incur costs and will not pick up security updates. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `uid` | string | Output only. A system-assigned unique identifier for this workstation configuration. |
| `updateTime` | string (google-datetime) | Output only. Time when this workstation configuration was most recently updated. |

### `WorkstationPersistentDirectory`

- A directory to persist across workstation sessions. Updates to this field will only take effect on this workstation after it is restarted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mountPath` | string | Optional. The mount path of the persistent directory. |
| `sizeGb` | integer (int32) | Optional. Size of the persistent directory in GB. If specified in an update request, this is the desired size of the directory. |

### Shape of `Accelerator`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "count": "integer (int32)",
  "type": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `workstations` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://workstations.googleapis.com/$discovery/rest?version=v1, https://workstations.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

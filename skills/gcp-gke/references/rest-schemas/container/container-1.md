---
source: https://container.googleapis.com/$discovery/rest?version=v1
---

# Kubernetes Engine API message schemas (container) (part 1/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/container/`.

### `AcceleratorConfig`

- AcceleratorConfig represents a Hardware Accelerator request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorCount` | string (int64) | The number of the accelerator cards exposed to an instance. |
| `acceleratorType` | string | The accelerator type resource name. List of supported accelerators here (https://cloud.google.com/compute/docs/gpus) |
| `gpuDriverInstallationConfig` | GPUDriverInstallationConfig | The configuration for auto installation of GPU driver. |
| `gpuPartitionSize` | string | Size of partitions to create on the GPU. Valid values are described in the NVIDIA mig user guide (https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning). |
| `gpuSharingConfig` | GPUSharingConfig | The configuration for GPU sharing options. |

### `AcceleratorConfig` (v1beta1)

- AcceleratorConfig represents a Hardware Accelerator request.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `acceleratorCount` | string (int64) | The number of the accelerator cards exposed to an instance. |
| `acceleratorType` | string | The accelerator type resource name. List of supported accelerators here (https://cloud.google.com/compute/docs/gpus) |
| `gpuDriverInstallationConfig` | GPUDriverInstallationConfig | The configuration for auto installation of GPU driver. |
| `gpuPartitionSize` | string | Size of partitions to create on the GPU. Valid values are described in the NVIDIA mig user guide (https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning). |
| `gpuSharingConfig` | GPUSharingConfig | The configuration for GPU sharing options. |
| `maxTimeSharedClientsPerGpu` | string (int64) | The number of time-shared GPU resources to expose for each physical GPU. |

### `AccurateTimeConfig`

- AccurateTimeConfig contains configuration for the accurate time synchronization feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enablePtpKvmTimeSync` | boolean | Enables enhanced time synchronization using PTP-KVM. |

### `AdditionalIPRangesConfig`

- AdditionalIPRangesConfig is the configuration for individual additional subnetwork attached to the cluster
- Version: v1

| Field | Type | Description |
|---|---|---|
| `podIpv4RangeNames` | array<string> | List of secondary ranges names within this subnetwork that can be used for pod IPs. Example1: gke-pod-range1 Example2: gke-pod-range1,gke-pod-range2 |
| `status` | string enum | Draining status of the additional subnet. Values: `STATUS_UNSPECIFIED`, `ACTIVE`, `DRAINING`. |
| `subnetwork` | string | Name of the subnetwork. This can be the full path of the subnetwork or just the name. Example1: my-subnet Example2: projects/gke-project/regions/us-central1/subnetworks/my-subnet |

### `AdditionalNodeNetworkConfig`

- AdditionalNodeNetworkConfig is the configuration for additional node networks within the NodeNetworkConfig message
- Version: v1

| Field | Type | Description |
|---|---|---|
| `network` | string | Name of the VPC where the additional interface belongs |
| `subnetwork` | string | Name of the subnetwork where the additional interface belongs |

### `AdditionalNodeNetworkConfig` (v1beta1)

- AdditionalNodeNetworkConfig is the configuration for additional node networks within the NodeNetworkConfig message
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `network` | string | Name of the VPC where the additional interface belongs |
| `stackType` | string enum | Optional. Additional NIC stack type, configured by the client. Values: `STACK_TYPE_UNSPECIFIED`, `IPV4`, `IPV4_IPV6`, `IPV6`. |
| `subnetwork` | string | Name of the subnetwork where the additional interface belongs |

### `AdditionalPodNetworkConfig`

- AdditionalPodNetworkConfig is the configuration for additional pod networks within the NodeNetworkConfig message
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxPodsPerNode` | MaxPodsConstraint | The maximum number of pods per node which use this pod network. |
| `networkAttachment` | string | The name of the network attachment for pods to communicate to; cannot be specified along with subnetwork or secondary_pod_range. |
| `secondaryPodRange` | string | The name of the secondary range on the subnet which provides IP address for this pod range. |
| `subnetwork` | string | Name of the subnetwork where the additional pod network belongs. |

### `AdditionalPodRangesConfig`

- AdditionalPodRangesConfig is the configuration for additional pod secondary ranges supporting the ClusterUpdate message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `podRangeInfo` | array<RangeInfo> | Output only. Information for additional pod range. |
| `podRangeNames` | array<string> | Name for pod secondary ipv4 range which has the actual range defined ahead. |

### `AddonsConfig`

- Configuration for the addons that can be automatically spun up in the cluster, enabling additional functionality.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentSandboxConfig` | AgentSandboxConfig | Optional. Configuration for the AgentSandbox addon. |
| `cloudRunConfig` | CloudRunConfig | Configuration for the Cloud Run addon, which allows the user to use a managed Knative service. |
| `configConnectorConfig` | ConfigConnectorConfig | Configuration for the ConfigConnector add-on, a Kubernetes extension to manage hosted Google Cloud services through the Kubernetes API. |
| `dnsCacheConfig` | DnsCacheConfig | Configuration for NodeLocalDNS, a dns cache running on cluster nodes |
| `gcePersistentDiskCsiDriverConfig` | GcePersistentDiskCsiDriverConfig | Configuration for the Compute Engine Persistent Disk CSI driver. |
| `gcpFilestoreCsiDriverConfig` | GcpFilestoreCsiDriverConfig | Configuration for the Filestore CSI driver. |
| `gcsFuseCsiDriverConfig` | GcsFuseCsiDriverConfig | Configuration for the Cloud Storage Fuse CSI driver. |
| `gkeBackupAgentConfig` | GkeBackupAgentConfig | Configuration for the Backup for GKE agent addon. |
| `highScaleCheckpointingConfig` | HighScaleCheckpointingConfig | Configuration for the High Scale Checkpointing add-on. |
| `horizontalPodAutoscaling` | HorizontalPodAutoscaling | Configuration for the horizontal pod autoscaling feature, which increases or decreases the number of replica pods a replication controller has based on the resource usage of the existing pods. |
| `httpLoadBalancing` | HttpLoadBalancing | Configuration for the HTTP (L7) load balancing controller addon, which makes it easy to set up HTTP load balancers for services in a cluster. |
| `kubernetesDashboard` | KubernetesDashboard | Configuration for the Kubernetes Dashboard. This addon is deprecated, and will be disabled in 1.15. It is recommended to use the Cloud Console to manage and monitor your Kubernetes clusters, workloads and applications. For more information, see: https://cloud.google.com/kubernetes-engine/docs/concepts/dashboards |
| `lustreCsiDriverConfig` | LustreCsiDriverConfig | Configuration for the Lustre CSI driver. |
| `networkPolicyConfig` | NetworkPolicyConfig | Configuration for NetworkPolicy. This only tracks whether the addon is enabled or not on the Master, it does not track whether network policy is enabled for the nodes. |
| `nodeReadinessConfig` | NodeReadinessConfig | Optional. Configuration for NodeReadinessController add-on. |
| `parallelstoreCsiDriverConfig` | ParallelstoreCsiDriverConfig | Deprecated: The Parallelstore CSI driver is no longer supported. Configuration for the Cloud Storage Parallelstore CSI driver. |
| `podSnapshotConfig` | PodSnapshotConfig | Optional. Configuration for the Pod Snapshot feature. |
| `rayOperatorConfig` | RayOperatorConfig | Optional. Configuration for Ray Operator addon. |
| `sliceControllerConfig` | SliceControllerConfig | Optional. Configuration for the slice controller add-on. |
| `slurmOperatorConfig` | SlurmOperatorConfig | Configuration for the Slurm Operator. |
| `statefulHaConfig` | StatefulHAConfig | Optional. Configuration for the StatefulHA add-on. |
| `wizSensorConfig` | WizSensorConfig | Optional. Configuration for the Wiz Sensor add-on. |

### `AddonsConfig` (v1beta1)

- Configuration for the addons that can be automatically spun up in the cluster, enabling additional functionality.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `agentSandboxConfig` | AgentSandboxConfig | Optional. Configuration for the AgentSandbox addon. |
| `cloudRunConfig` | CloudRunConfig | Configuration for the Cloud Run addon. The `IstioConfig` addon must be enabled in order to enable Cloud Run addon. This option can only be enabled at cluster creation time. |
| `configConnectorConfig` | ConfigConnectorConfig | Configuration for the ConfigConnector add-on, a Kubernetes extension to manage hosted Google Cloud services through the Kubernetes API. |
| `dnsCacheConfig` | DnsCacheConfig | Configuration for NodeLocalDNS, a dns cache running on cluster nodes |
| `gcePersistentDiskCsiDriverConfig` | GcePersistentDiskCsiDriverConfig | Configuration for the Compute Engine Persistent Disk CSI driver. |
| `gcpFilestoreCsiDriverConfig` | GcpFilestoreCsiDriverConfig | Configuration for the Filestore CSI driver. |
| `gcsFuseCsiDriverConfig` | GcsFuseCsiDriverConfig | Configuration for the Cloud Storage Fuse CSI driver. |
| `gkeBackupAgentConfig` | GkeBackupAgentConfig | Configuration for the Backup for GKE agent addon. |
| `highScaleCheckpointingConfig` | HighScaleCheckpointingConfig | Configuration for the High Scale Checkpointing add-on. |
| `horizontalPodAutoscaling` | HorizontalPodAutoscaling | Configuration for the horizontal pod autoscaling feature, which increases or decreases the number of replica pods a replication controller has based on the resource usage of the existing pods. |
| `httpLoadBalancing` | HttpLoadBalancing | Configuration for the HTTP (L7) load balancing controller addon, which makes it easy to set up HTTP load balancers for services in a cluster. |
| `istioConfig` | IstioConfig | Configuration for Istio, an open platform to connect, manage, and secure microservices. |
| `kalmConfig` | KalmConfig | Configuration for the KALM addon, which manages the lifecycle of k8s applications. |
| `kubernetesDashboard` | KubernetesDashboard | Configuration for the Kubernetes Dashboard. This addon is deprecated, and will be disabled in 1.15. It is recommended to use the Cloud Console to manage and monitor your Kubernetes clusters, workloads and applications. For more information, see: https://cloud.google.com/kubernetes-engine/docs/concepts/dashboards |
| `lustreCsiDriverConfig` | LustreCsiDriverConfig | Configuration for the Lustre CSI driver. |
| `networkPolicyConfig` | NetworkPolicyConfig | Configuration for NetworkPolicy. This only tracks whether the addon is enabled or not on the Master, it does not track whether network policy is enabled for the nodes. |
| `nodeReadinessConfig` | NodeReadinessConfig | Optional. Configuration for NodeReadinessController add-on. |
| `parallelstoreCsiDriverConfig` | ParallelstoreCsiDriverConfig | Deprecated: The Parallelstore CSI driver is no longer supported. Configuration for the Cloud Storage Parallelstore CSI driver. |
| `podSnapshotConfig` | PodSnapshotConfig | Configuration for the Pod Snapshot feature. |
| `rayOperatorConfig` | RayOperatorConfig | Optional. Configuration for Ray Operator addon. |
| `sliceControllerConfig` | SliceControllerConfig | Optional. Configuration for the slice controller add-on. |
| `slurmOperatorConfig` | SlurmOperatorConfig | Configuration for the Slurm Operator. |
| `statefulHaConfig` | StatefulHAConfig | Optional. Configuration for the StatefulHA add-on. |
| `wizSensorConfig` | WizSensorConfig | Optional. Configuration for the Wiz Sensor add-on. |

### `AdvancedDatapathObservabilityConfig`

- AdvancedDatapathObservabilityConfig specifies configuration of observability features of advanced datapath.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableMetrics` | boolean | Expose flow metrics on nodes |
| `enableRelay` | boolean | Enable Relay component |
| `relayMode` | string enum | Method used to make Relay available Values: `RELAY_MODE_UNSPECIFIED`, `DISABLED`, `INTERNAL_VPC_LB`, `EXTERNAL_LB`. |

### `AdvancedMachineFeatures`

- Specifies options for controlling advanced machine features.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableNestedVirtualization` | boolean | Whether or not to enable nested virtualization (defaults to false). |
| `performanceMonitoringUnit` | string enum | Type of Performance Monitoring Unit (PMU) requested on node pool instances. If unset, PMU will not be available to the node. Values: `PERFORMANCE_MONITORING_UNIT_UNSPECIFIED`, `ARCHITECTURAL`, `STANDARD`, `ENHANCED`. |
| `threadsPerCore` | string (int64) | The number of threads per physical core. To disable simultaneous multithreading (SMT) set this to 1. If unset, the maximum number of threads supported per core by the underlying processor is assumed. |

### `AgentSandboxConfig`

- Configuration for the AgentSandbox addon.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Whether AgentSandbox is enabled for this cluster. |

### `AmbientNetworkingConfig`

- AmbientNetworkingConfig contains the desired config of Ambient Networking on this cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. If true, enable ambient networking for this cluster. |

### `AnonymousAuthenticationConfig`

- AnonymousAuthenticationConfig defines the settings needed to limit endpoints that allow anonymous authentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | Defines the mode of limiting anonymous access in the cluster. Values: `MODE_UNSPECIFIED`, `ENABLED`, `LIMITED`. |

### `AuthenticatorGroupsConfig`

- Configuration for returning group information from authenticators.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether this cluster should return group membership lookups during authentication using a group of security groups. |
| `securityGroup` | string | The name of the security group-of-groups to be used. Only relevant if enabled = true. |

### `AutoIpamConfig`

- AutoIpamConfig contains all information related to Auto IPAM
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | The flag that enables Auto IPAM on this cluster |

### `AutoMonitoringConfig`

- AutoMonitoringConfig defines the configuration for GKE Workload Auto-Monitoring.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scope` | string enum | Scope for GKE Workload Auto-Monitoring. Values: `SCOPE_UNSPECIFIED`, `ALL`, `NONE`. |

### `AutoUpgradeOptions`

- AutoUpgradeOptions defines the set of options for the user to control how the Auto Upgrades will proceed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoUpgradeStartTime` | string | Output only. This field is set when upgrades are about to commence with the approximate start time for the upgrades, in RFC3339 (https://www.ietf.org/rfc/rfc3339.txt) text format. |
| `description` | string | Output only. This field is set when upgrades are about to commence with the description of the upgrade. |

### `Autopilot`

- Autopilot is the configuration for Autopilot settings on the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterPolicyConfig` | ClusterPolicyConfig | ClusterPolicyConfig denotes cluster level policies that are enforced for the cluster. |
| `enabled` | boolean | Enable Autopilot |
| `privilegedAdmissionConfig` | PrivilegedAdmissionConfig | PrivilegedAdmissionConfig is the configuration related to privileged admission control. |
| `workloadPolicyConfig` | WorkloadPolicyConfig | WorkloadPolicyConfig is the configuration related to GCW workload policy |

### `Autopilot` (v1beta1)

- Autopilot is the configuration for Autopilot settings on the cluster.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `clusterPolicyConfig` | ClusterPolicyConfig | ClusterPolicyConfig denotes cluster level policies that are enforced for the cluster. |
| `conversionStatus` | AutopilotConversionStatus | Output only. ConversionStatus shows conversion status. |
| `enabled` | boolean | Enable Autopilot |
| `privilegedAdmissionConfig` | PrivilegedAdmissionConfig | PrivilegedAdmissionConfig is the configuration related to privileged admission control. |
| `workloadPolicyConfig` | WorkloadPolicyConfig | WorkloadPolicyConfig is the configuration related to GCW workload policy |

### `AutopilotCompatibilityIssue`

- AutopilotCompatibilityIssue contains information about a specific compatibility issue with Autopilot mode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `constraintType` | string | The constraint type of the issue. |
| `description` | string | The description of the issue. |
| `documentationUrl` | string | A URL to a public documentation, which addresses resolving this issue. |
| `incompatibilityType` | string enum | The incompatibility type of this issue. Values: `UNSPECIFIED`, `INCOMPATIBILITY`, `ADDITIONAL_CONFIG_REQUIRED`, `PASSED_WITH_OPTIONAL_CONFIG`. |
| `lastObservation` | string (google-datetime) | The last time when this issue was observed. |
| `subjects` | array<string> | The name of the resources which are subject to this issue. |

### `AutopilotConfig`

- AutopilotConfig contains configuration of autopilot feature for this node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Denotes that nodes belonging to this node pool are Autopilot nodes. |

### `AutopilotConversionStatus`

- AutopilotConversionStatus represents conversion status.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | Output only. The current state of the conversion. Values: `STATE_UNSPECIFIED`, `DONE`. |

### `AutoprovisioningNodePoolDefaults`

- AutoprovisioningNodePoolDefaults contains defaults for a node pool created by NAP.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bootDiskKmsKey` | string | The Customer Managed Encryption Key used to encrypt the boot disk attached to each node in the node pool. This should be of the form projects/\[KEY_PROJECT_ID\]/locations/\[LOCATION\]/keyRings/\[RING_NAME\]/cryptoKeys/\[KEY_NAME\]. For more information about protecting resources with Cloud KMS Keys please see: https://cloud.google.com/compute/docs/disks/customer-managed-encryption |
| `diskSizeGb` | integer (int32) | Size of the disk attached to each node, specified in GB. The smallest allowed disk size is 10GB. If unspecified, the default disk size is 100GB. |
| `diskType` | string | Type of the disk attached to each node (e.g. 'pd-standard', 'pd-ssd' or 'pd-balanced') If unspecified, the default disk type is 'pd-standard' |
| `imageType` | string | The image type to use for NAP created node. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types. |
| `insecureKubeletReadonlyPortEnabled` | boolean | DEPRECATED. Use NodePoolAutoConfig.NodeKubeletConfig instead. |
| `management` | NodeManagement | Specifies the node management options for NAP created node-pools. |
| `minCpuPlatform` | string | Deprecated. Minimum CPU platform to be used for NAP created node pools. The instance may be scheduled on the specified or newer CPU platform. Applicable values are the friendly names of CPU platforms, such as minCpuPlatform: Intel Haswell or minCpuPlatform: Intel Sandy Bridge. For more information, read how to specify min CPU platform (https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform). This field is deprecated, min_cpu_platform should be specified using `cloud.google.com/requested-min-cpu-platform` label selector on the pod. To unset the min cpu platform field pass "automatic" as field value. |
| `oauthScopes` | array<string> | Scopes that are used by NAP when creating node pools. |
| `serviceAccount` | string | The Google Cloud Platform Service Account to be used by the node VMs. |
| `shieldedInstanceConfig` | ShieldedInstanceConfig | Shielded Instance options. |
| `upgradeSettings` | UpgradeSettings | Specifies the upgrade settings for NAP created node pools |

### `AutoprovisioningRestrictionConfig`

- AutoprovisioningRestrictionConfig configures restrictions related to autoprovisioning settings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizedServiceAccounts` | array<string> | Optional. Contains the list of service accounts allowed for autoprovisioned node pools / Custom ComputeClasses. |
| `serviceAccountPermissionCheck` | string enum | Optional. Controls whether service account validation checks are enforced for autoprovisioning. Values: `PERMISSION_CHECK_MODE_UNSPECIFIED`, `DISABLED`, `ENABLED`. |

### `AutoscaledRolloutPolicy`

- Autoscaled rollout policy utilizes the cluster autoscaler during blue-green upgrade to scale both the blue and green pools.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `waitForDrainDuration` | string (google-duration) | Optional. Time to wait after cordoning the blue pool before draining the nodes. Defaults to 3 days. The value can be set between 0 and 7 days, inclusive. |

### `AvailableVersion`

- Deprecated.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `reason` | string | Reason for availability. |
| `version` | string | Kubernetes version. |

### `BestEffortProvisioning`

- Best effort provisioning.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | When this is enabled, cluster/node pool creations will ignore non-fatal errors like stockout to best provision as many nodes as possible right now and eventually bring up all target number of nodes |
| `minProvisionNodes` | integer (int32) | Minimum number of nodes to be provisioned to be considered as succeeded, and the rest of nodes will be provisioned gradually and eventually when stockout issue has been resolved. |

### `BigQueryDestination`

- Parameters for using BigQuery as the destination of resource usage export.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `datasetId` | string | The ID of a BigQuery Dataset. |

### `BinaryAuthorization`

- Configuration for Binary Authorization.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | This field is deprecated. Leave this unset and instead configure BinaryAuthorization using evaluation_mode. If evaluation_mode is set to anything other than EVALUATION_MODE_UNSPECIFIED, this field is ignored. |
| `evaluationMode` | string enum | Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED. Values: `EVALUATION_MODE_UNSPECIFIED`, `DISABLED`, `PROJECT_SINGLETON_POLICY_ENFORCE`. |

### `BinaryAuthorization` (v1beta1)

- Configuration for Binary Authorization.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | This field is deprecated. Leave this unset and instead configure BinaryAuthorization using evaluation_mode. If evaluation_mode is set to anything other than EVALUATION_MODE_UNSPECIFIED, this field is ignored. |
| `evaluationMode` | string enum | Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED. Values: `EVALUATION_MODE_UNSPECIFIED`, `DISABLED`, `PROJECT_SINGLETON_POLICY_ENFORCE`, `POLICY_BINDINGS`, `POLICY_BINDINGS_AND_PROJECT_SINGLETON_POLICY_ENFORCE`. |
| `policyBindings` | array<PolicyBinding> | Optional. Binauthz policies that apply to this cluster. |

### `BlueGreenInfo`

- Information relevant to blue-green upgrade.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `blueInstanceGroupUrls` | array<string> | The resource URLs of the \[managed instance groups\] (/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with blue pool. |
| `bluePoolDeletionStartTime` | string | Time to start deleting blue pool to complete blue-green upgrade, in RFC3339 (https://www.ietf.org/rfc/rfc3339.txt) text format. |
| `greenInstanceGroupUrls` | array<string> | The resource URLs of the \[managed instance groups\] (/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with green pool. |
| `greenPoolVersion` | string | Version of green pool. |
| `phase` | string enum | Current blue-green upgrade phase. Values: `PHASE_UNSPECIFIED`, `UPDATE_STARTED`, `CREATING_GREEN_POOL`, `CORDONING_BLUE_POOL`, `DRAINING_BLUE_POOL`, `NODE_POOL_SOAKING`, `DELETING_BLUE_POOL`, `ROLLBACK_STARTED`. |

### `BlueGreenSettings`

- Settings for blue-green upgrade.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoscaledRolloutPolicy` | AutoscaledRolloutPolicy | Autoscaled policy for cluster autoscaler enabled blue-green upgrade. |
| `nodePoolSoakDuration` | string (google-duration) | Time needed after draining entire blue pool. After this period, blue pool will be cleaned up. |
| `standardRolloutPolicy` | StandardRolloutPolicy | Standard policy for the blue-green upgrade. |

### `BootDisk`

- BootDisk specifies the boot disk configuration for node pools.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskType` | string | Disk type of the boot disk. (i.e. Hyperdisk-Balanced, PD-Balanced, etc.) |
| `provisionedIops` | string (int64) | For Hyperdisk-Balanced only, the provisioned IOPS config value. |
| `provisionedThroughput` | string (int64) | For Hyperdisk-Balanced only, the provisioned throughput config value. |
| `sizeGb` | string (int64) | Disk size in GB. Replaces NodeConfig.disk_size_gb |

### `BootDiskProfile`

- Swap on the node's boot disk.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `swapSizeGib` | string (int64) | Specifies the size of the swap space in gibibytes (GiB). |
| `swapSizePercent` | integer (int32) | Specifies the size of the swap space as a percentage of the boot disk size. |

### `CancelOperationRequest`

- CancelOperationRequest cancels a single operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The name (project, location, operation id) of the operation to cancel. Specified in the format `projects/*/locations/*/operations/*`. |
| `operationId` | string | Deprecated. The server-assigned `name` of the operation. This field has been deprecated and replaced by the name field. |
| `projectId` | string | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | string | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the operation resides. This field has been deprecated and replaced by the name field. |

### `CertificateAuthorityDomainConfig`

- CertificateAuthorityDomainConfig configures one or more fully qualified domain names (FQDN) to a specific certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fqdns` | array<string> | List of fully qualified domain names (FQDN). Specifying port is supported. Wildcards are NOT supported. Examples: - `my.customdomain.com` - `10.0.1.2:5000` |
| `gcpSecretManagerCertificateConfig` | GCPSecretManagerCertificateConfig | Secret Manager certificate configuration. |

### `CertificateConfig`

- CertificateConfig configures certificate for the registry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcpSecretManagerSecretUri` | string | The URI configures a secret from Secret Manager (https://cloud.google.com/secret-manager) in the format "projects/$PROJECT_ID/secrets/$SECRET_NAME/versions/$VERSION" for global secret or "projects/$PROJECT_ID/locations/$REGION/secrets/$SECRET_NAME/versions/$VERSION" for regional secret. Version can be fixed (e.g. "2") or "latest" |

### `CertificateConfigPair`

- CertificateConfigPair configures pairs of certificates, which is used for client certificate and key pairs under a registry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cert` | CertificateConfig | Cert configures the client certificate. |
| `key` | CertificateConfig | Key configures the client private key. Optional. |

### `CheckAutopilotCompatibilityResponse`

- CheckAutopilotCompatibilityResponse has a list of compatibility issues.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `issues` | array<AutopilotCompatibilityIssue> | The list of issues for the given operation. |
| `summary` | string | The summary of the autopilot compatibility response. |

### `CidrBlock`

- CidrBlock contains an optional name and one CIDR block.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cidrBlock` | string | cidr_block must be specified in CIDR notation. |
| `displayName` | string | display_name is an optional field for users to identify CIDR blocks. |

### `ClientCertificateConfig`

- Configuration for client certificates on the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `issueClientCertificate` | boolean | Issue a client certificate. |

### `CloudRunConfig`

- Configuration options for the Cloud Run feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disabled` | boolean | Whether Cloud Run addon is enabled for this cluster. |
| `loadBalancerType` | string enum | Which load balancer type is installed for Cloud Run. Values: `LOAD_BALANCER_TYPE_UNSPECIFIED`, `LOAD_BALANCER_TYPE_EXTERNAL`, `LOAD_BALANCER_TYPE_INTERNAL`. |

### `Cluster`

- A Google Kubernetes Engine cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addonsConfig` | AddonsConfig | Configurations for the various addons available to run in the cluster. |
| `alphaClusterFeatureGates` | array<string> | The list of user specified Kubernetes feature gates. Each string represents the activation status of a feature gate (e.g. "featureX=true" or "featureX=false") |
| `anonymousAuthenticationConfig` | AnonymousAuthenticationConfig | Configuration for limiting anonymous access to all endpoints except the health checks. |
| `authenticatorGroupsConfig` | AuthenticatorGroupsConfig | Configuration controlling RBAC group membership information. |
| `autopilot` | Autopilot | Autopilot configuration for the cluster. |
| `autoscaling` | ClusterAutoscaling | Cluster-level autoscaling configuration. |
| `binaryAuthorization` | BinaryAuthorization | Configuration for Binary Authorization. |
| `clusterIpv4Cidr` | string | The IP address range of the container pods in this cluster, in CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`). Leave blank to have one automatically chosen or specify a `/14` block in `10.0.0.0/8`. |
| `compliancePostureConfig` | CompliancePostureConfig | Optional. Deprecated: Compliance Posture is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. Enable/Disable Compliance Posture features for the cluster. |
| `conditions` | array<StatusCondition> | Which conditions caused the current cluster state. |
| `confidentialNodes` | ConfidentialNodes | Configuration of Confidential Nodes. All the nodes in the cluster will be Confidential VM once enabled. |
| `controlPlaneEgress` | ControlPlaneEgress | Configuration for control plane egress control. |
| `controlPlaneEndpointsConfig` | ControlPlaneEndpointsConfig | Configuration for all cluster's control plane endpoints. |
| `costManagementConfig` | CostManagementConfig | Configuration for the fine-grained cost allocation feature. |
| `createTime` | string | Output only. The time the cluster was created, in RFC3339 (https://www.ietf.org/rfc/rfc3339.txt) text format. |
| `currentEmulatedVersion` | string | Output only. The current emulated version of the master endpoint. The version is in minor version format, e.g. 1.30. No value or empty string means the cluster has no emulated version. |
| `currentMasterVersion` | string | Output only. The current software version of the master endpoint. |
| `currentNodeCount` | integer (int32) | Output only. The number of nodes currently in the cluster. Deprecated. Call Kubernetes API directly to retrieve node information. |
| `currentNodeVersion` | string | Output only. Deprecated, use NodePools.version (https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools) instead. The current version of the node software components. If they are currently at multiple versions because they're in the process of being upgraded, this reflects the minimum version of all nodes. |
| `databaseEncryption` | DatabaseEncryption | Configuration of etcd encryption. |
| `defaultMaxPodsConstraint` | MaxPodsConstraint | The default constraint on the maximum number of pods that can be run simultaneously on a node in the node pool of this cluster. Only honored if cluster created with IP Alias support. |
| `description` | string | An optional description of this cluster. |
| `enableK8sBetaApis` | K8sBetaAPIConfig | Beta APIs Config |
| `enableKubernetesAlpha` | boolean | Kubernetes alpha features are enabled on this cluster. This includes alpha API groups (e.g. v1alpha1) and features that may not be production ready in the kubernetes version of the master and nodes. The cluster has no SLA for uptime and master/node upgrades are disabled. Alpha enabled clusters are automatically deleted thirty days after creation. |
| `enableTpu` | boolean | Enable the ability to use Cloud TPUs in this cluster. This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25. |
| `endpoint` | string | Output only. The IP address of this cluster's master endpoint. The endpoint can be accessed from the internet at `https://username:password@endpoint/`. See the `masterAuth` property of this resource for username and password information. |
| `enterpriseConfig` | EnterpriseConfig | GKE Enterprise Configuration. Deprecated: GKE Enterprise features are now available without an Enterprise tier. |
| `etag` | string | This checksum is computed by the server based on the value of cluster fields, and may be sent on update requests to ensure the client has an up-to-date value before proceeding. |
| `expireTime` | string | Output only. The time the cluster will be automatically deleted in RFC3339 (https://www.ietf.org/rfc/rfc3339.txt) text format. |
| `fleet` | Fleet | Fleet information for the cluster. |
| `gkeAutoUpgradeConfig` | GkeAutoUpgradeConfig | Configuration for GKE auto upgrades. |
| `id` | string | Output only. Unique id for the cluster. |
| `identityServiceConfig` | IdentityServiceConfig | Configuration for Identity Service component. |
| `initialClusterVersion` | string | The initial Kubernetes version for this cluster. Valid versions are those found in validMasterVersions returned by getServerConfig. The version can be upgraded over time; such upgrades are reflected in currentMasterVersion and currentNodeVersion. Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "","-": picks the default Kubernetes version |
| `initialNodeCount` | integer (int32) | The number of nodes to create in this cluster. You must ensure that your Compute Engine resource quota (https://cloud.google.com/compute/quotas) is sufficient for this number of instances. You must also have available firewall and routes quota. For requests, this field should only be used in lieu of a "node_pool" object, since this configuration (along with the "node_config") will be used to create a "NodePool" object with an auto-generated name. Do not use this and a node_pool at the same time. This field is deprecated, use node_pool.initial_node_count instead. |
| `instanceGroupUrls` | array<string> | Output only. Deprecated. Use node_pools.instance_group_urls. |
| `ipAllocationPolicy` | IPAllocationPolicy | Configuration for cluster IP allocation. |
| `labelFingerprint` | string | The fingerprint of the set of labels for this cluster. |
| `legacyAbac` | LegacyAbac | Configuration for the legacy ABAC authorization mode. |
| `location` | string | Output only. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones#available) or region (https://cloud.google.com/compute/docs/regions-zones/regions-zones#available) in which the cluster resides. |
| `locations` | array<string> | The list of Google Compute Engine zones (https://cloud.google.com/compute/docs/zones#available) in which the cluster's nodes should be located. This field provides a default value if NodePool.Locations (https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools#NodePool.FIELDS.locations) are not specified during node pool creation. Warning: changing cluster locations will update the NodePool.Locations (https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools#NodePool.FIELDS.locations) of all node pools and will result in nodes being added and/or removed. |
| `loggingConfig` | LoggingConfig | Logging configuration for the cluster. |
| `loggingService` | string | The logging service the cluster should use to write logs. Currently available options: \* `logging.googleapis.com/kubernetes` - The Cloud Logging service with a Kubernetes-native resource model \* `logging.googleapis.com` - The legacy Cloud Logging service (no longer available as of GKE 1.15). \* `none` - no logs will be exported from the cluster. If left as an empty string,`logging.googleapis.com/kubernetes` will be used for GKE 1.14+ or `logging.googleapis.com` for earlier versions. |
| `maintenancePolicy` | MaintenancePolicy | Configure the maintenance policy for this cluster. |
| `managedMachineLearningDiagnosticsConfig` | ManagedMachineLearningDiagnosticsConfig | Configuration for Managed Machine Learning Diagnostics. |
| `managedOpentelemetryConfig` | ManagedOpenTelemetryConfig | Configuration for Managed OpenTelemetry pipeline. |
| `masterAuth` | MasterAuth | The authentication information for accessing the master endpoint. If unspecified, the defaults are used: For clusters before v1.12, if master_auth is unspecified, `username` will be set to "admin", a random password will be generated, and a client certificate will be issued. |
| `masterAuthorizedNetworksConfig` | MasterAuthorizedNetworksConfig | The configuration options for master authorized networks feature. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.authorized_networks_config instead. |
| `meshCertificates` | MeshCertificates | Configuration for issuance of mTLS keys and certificates to Kubernetes pods. |
| `monitoringConfig` | MonitoringConfig | Monitoring configuration for the cluster. |
| `monitoringService` | string | The monitoring service the cluster should use to write metrics. Currently available options: \* `monitoring.googleapis.com/kubernetes` - The Cloud Monitoring service with a Kubernetes-native resource model \* `monitoring.googleapis.com` - The legacy Cloud Monitoring service (no longer available as of GKE 1.15). \* `none` - No metrics will be exported from the cluster. If left as an empty string,`monitoring.googleapis.com/kubernetes` will be used for GKE 1.14+ or `monitoring.googleapis.com` for earlier versions. |
| `name` | string | The name of this cluster. The name must be unique within this project and location (e.g. zone or region), and can be up to 40 characters with the following restrictions: \* Lowercase letters, numbers, and hyphens only. \* Must start with a letter. \* Must end with a number or a letter. |
| `network` | string | The name of the Google Compute Engine network (https://cloud.google.com/compute/docs/networks-and-firewalls#networks) to which the cluster is connected. If left unspecified, the `default` network will be used. |
| `networkConfig` | NetworkConfig | Configuration for cluster networking. |
| `networkPolicy` | NetworkPolicy | Configuration options for the NetworkPolicy feature. |
| `nodeConfig` | NodeConfig | Parameters used in creating the cluster's nodes. For requests, this field should only be used in lieu of a "node_pool" object, since this configuration (along with the "initial_node_count") will be used to create a "NodePool" object with an auto-generated name. Do not use this and a node_pool at the same time. For responses, this field will be populated with the node configuration of the first node pool. (For configuration of each node pool, see `node_pool.config`) If unspecified, the defaults are used. This field is deprecated, use node_pool.config instead. |
| `nodeCreationConfig` | NodeCreationConfig | Optional. Configuration for Node Creation Mode. |
| `nodeIpv4CidrSize` | integer (int32) | Output only. The size of the address space on each node for hosting containers. This is provisioned from within the `container_ipv4_cidr` range. This field will only be set when cluster is in route-based network mode. |
| `nodePoolAutoConfig` | NodePoolAutoConfig | Node pool configs that apply to all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. |
| `nodePoolDefaults` | NodePoolDefaults | Default NodePool settings for the entire cluster. These settings are overridden if specified on the specific NodePool object. |
| `nodePools` | array<NodePool> | The node pools associated with this cluster. This field should not be set if "node_config" or "initial_node_count" are specified. |
| `notificationConfig` | NotificationConfig | Notification configuration of the cluster. |
| `parentProductConfig` | ParentProductConfig | The configuration of the parent product of the cluster. This field is used by Google internal products that are built on top of the GKE cluster and take the ownership of the cluster. |
| `podAutoscaling` | PodAutoscaling | The config for pod autoscaling. |
| `privateClusterConfig` | PrivateClusterConfig | Configuration for private cluster. |
| `rbacBindingConfig` | RBACBindingConfig | RBACBindingConfig allows user to restrict ClusterRoleBindings an RoleBindings that can be created. |
| `releaseChannel` | ReleaseChannel | Release channel configuration. If left unspecified on cluster creation and a version is specified, the cluster is enrolled in the most mature release channel where the version is available (first checking STABLE, then REGULAR, and finally RAPID). Otherwise, if no release channel configuration and no version is specified, the cluster is enrolled in the REGULAR channel with its default version. |
| `resourceLabels` | object | The resource labels for the cluster to use to annotate any related Google Compute Engine resources. |
| `resourceUsageExportConfig` | ResourceUsageExportConfig | Configuration for exporting resource usages. Resource usage export is disabled when this config is unspecified. |
| `rollbackSafeUpgrade` | RollbackSafeUpgrade | Optional. The rollback safe upgrade information of the cluster. This field is used when user manually triggers a rollback safe upgrade. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `scheduleUpgradeConfig` | ScheduleUpgradeConfig | Optional. Configuration for scheduled upgrades. |
| `secretManagerConfig` | SecretManagerConfig | Secret CSI driver configuration. |
| `secretSyncConfig` | SecretSyncConfig | Configuration for sync Secret Manager secrets as k8s secrets. |
| `securityPostureConfig` | SecurityPostureConfig | Optional. Enable/Disable Security Posture API features for the cluster. |
| `selfLink` | string | Output only. Server-defined URL for the resource. |
| `servicesIpv4Cidr` | string | Output only. The IP address range of the Kubernetes services in this cluster, in CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `1.2.3.4/29`). Service addresses are typically put in the last `/16` from the container CIDR. |
| `shieldedNodes` | ShieldedNodes | Shielded Nodes configuration. |
| `status` | string enum | Output only. The current status of this cluster. Values: `STATUS_UNSPECIFIED`, `PROVISIONING`, `RUNNING`, `RECONCILING`, `STOPPING`, `ERROR`, `DEGRADED`. |
| `statusMessage` | string | Output only. Deprecated. Use conditions instead. Additional information about the current status of this cluster, if available. |
| `subnetwork` | string | The name of the Google Compute Engine subnetwork (https://cloud.google.com/compute/docs/subnetworks) to which the cluster is connected. |
| `tpuIpv4CidrBlock` | string | Output only. The IP address range of the Cloud TPUs in this cluster, in CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `1.2.3.4/29`). This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25. |
| `userManagedKeysConfig` | UserManagedKeysConfig | The Custom keys configuration for the cluster. |
| `verticalPodAutoscaling` | VerticalPodAutoscaling | Cluster-level Vertical Pod Autoscaling configuration. |
| `workloadIdentityConfig` | WorkloadIdentityConfig | Configuration for the use of Kubernetes Service Accounts in IAM policies. |
| `zone` | string | Output only. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field is deprecated, use location instead. |

### `Cluster` (v1beta1)

- A Google Kubernetes Engine cluster.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `addonsConfig` | AddonsConfig | Configurations for the various addons available to run in the cluster. |
| `alphaClusterFeatureGates` | array<string> | The list of user specified Kubernetes feature gates. Each string represents the activation status of a feature gate (e.g. "featureX=true" or "featureX=false") |
| `anonymousAuthenticationConfig` | AnonymousAuthenticationConfig | Configuration for limiting anonymous access to all endpoints except the health checks. |
| `authenticatorGroupsConfig` | AuthenticatorGroupsConfig | Configuration controlling RBAC group membership information. |
| `autopilot` | Autopilot | Autopilot configuration for the cluster. |
| `autoscaling` | ClusterAutoscaling | Cluster-level autoscaling configuration. |
| `binaryAuthorization` | BinaryAuthorization | Configuration for Binary Authorization. |
| `clusterIpv4Cidr` | string | The IP address range of the container pods in this cluster, in CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`). Leave blank to have one automatically chosen or specify a `/14` block in `10.0.0.0/8`. |
| `clusterTelemetry` | ClusterTelemetry | Telemetry integration for the cluster. |
| `compliancePostureConfig` | CompliancePostureConfig | Optional. Deprecated: Compliance Posture is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. Enable/Disable Compliance Posture features for the cluster. |
| `conditions` | array<StatusCondition> | Which conditions caused the current cluster state. |
| `confidentialNodes` | ConfidentialNodes | Configuration of Confidential Nodes. All the nodes in the cluster will be Confidential VM once enabled. |
| `controlPlaneEgress` | ControlPlaneEgress | Configuration for control plane egress control. |
| `controlPlaneEndpointsConfig` | ControlPlaneEndpointsConfig | Configuration for all cluster's control plane endpoints. |
| `costManagementConfig` | CostManagementConfig | Configuration for the fine-grained cost allocation feature. |
| `createTime` | string | Output only. The time the cluster was created, in RFC3339 (https://www.ietf.org/rfc/rfc3339.txt) text format. |
| `currentEmulatedVersion` | string | Output only. The current emulated version of the master endpoint. The version is in minor version format, e.g. 1.30. No value or empty string means the cluster has no emulated version. |
| `currentMasterVersion` | string | Output only. The current software version of the master endpoint. |
| `currentNodeCount` | integer (int32) | Output only. The number of nodes currently in the cluster. Deprecated. Call Kubernetes API directly to retrieve node information. |
| `currentNodeVersion` | string | Output only. Deprecated, use NodePool.version (https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1beta1/projects.locations.clusters.nodePools) instead. The current version of the node software components. If they are currently at multiple versions because they're in the process of being upgraded, this reflects the minimum version of all nodes. |
| `databaseEncryption` | DatabaseEncryption | Configuration of etcd encryption. |
| `defaultMaxPodsConstraint` | MaxPodsConstraint | The default constraint on the maximum number of pods that can be run simultaneously on a node in the node pool of this cluster. Only honored if cluster created with IP Alias support. |
| `description` | string | An optional description of this cluster. |
| `enableK8sBetaApis` | K8sBetaAPIConfig | Kubernetes open source beta apis enabled on the cluster. Only beta apis. |
| `enableKubernetesAlpha` | boolean | Kubernetes alpha features are enabled on this cluster. This includes alpha API groups (e.g. v1beta1) and features that may not be production ready in the kubernetes version of the master and nodes. The cluster has no SLA for uptime and master/node upgrades are disabled. Alpha enabled clusters are automatically deleted thirty days after creation. |
| `enableTpu` | boolean | Enable the ability to use Cloud TPUs in this cluster. This field is deprecated, use tpu_config.enabled instead. This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25. |
| `endpoint` | string | Output only. The IP address of this cluster's master endpoint. The endpoint can be accessed from the internet at `https://username:password@endpoint/`. See the `masterAuth` property of this resource for username and password information. |
| `enterpriseConfig` | EnterpriseConfig | GKE Enterprise Configuration. Deprecated: GKE Enterprise features are now available without an Enterprise tier. |
| `etag` | string | This checksum is computed by the server based on the value of cluster fields, and may be sent on update requests to ensure the client has an up-to-date value before proceeding. |
| `expireTime` | string | Output only. The time the cluster will be automatically deleted in RFC3339 (https://www.ietf.org/rfc/rfc3339.txt) text format. |
| `fleet` | Fleet | Fleet information for the cluster. |
| `gkeAutoUpgradeConfig` | GkeAutoUpgradeConfig | Configuration for GKE auto upgrades. |
| `id` | string | Output only. Unique id for the cluster. |
| `identityServiceConfig` | IdentityServiceConfig | Configuration for Identity Service component. |
| `initialClusterVersion` | string | The initial Kubernetes version for this cluster. Valid versions are those found in validMasterVersions returned by getServerConfig. The version can be upgraded over time; such upgrades are reflected in currentMasterVersion and currentNodeVersion. Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "","-": picks the default Kubernetes version |
| `initialNodeCount` | integer (int32) | The number of nodes to create in this cluster. You must ensure that your Compute Engine resource quota (https://cloud.google.com/compute/quotas) is sufficient for this number of instances. You must also have available firewall and routes quota. For requests, this field should only be used in lieu of a "node_pool" object, since this configuration (along with the "node_config") will be used to create a "NodePool" object with an auto-generated name. Do not use this and a node_pool at the same time. This field is deprecated, use node_pool.initial_node_count instead. |
| `instanceGroupUrls` | array<string> | Output only. Deprecated. Use node_pools.instance_group_urls. |
| `ipAllocationPolicy` | IPAllocationPolicy | Configuration for cluster IP allocation. |
| `labelFingerprint` | string | The fingerprint of the set of labels for this cluster. |
| `legacyAbac` | LegacyAbac | Configuration for the legacy ABAC authorization mode. |
| `location` | string | Output only. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones#available) or region (https://cloud.google.com/compute/docs/regions-zones/regions-zones#available) in which the cluster resides. |
| `locations` | array<string> | The list of Google Compute Engine zones (https://cloud.google.com/compute/docs/zones#available) in which the cluster's nodes should be located. This field provides a default value if NodePool.Locations (https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools#NodePool.FIELDS.locations) are not specified during node pool creation. Warning: changing cluster locations will update the NodePool.Locations (https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools#NodePool.FIELDS.locations) of all node pools and will result in nodes being added and/or removed. |
| `loggingConfig` | LoggingConfig | Logging configuration for the cluster. |
| `loggingService` | string | The logging service the cluster should use to write logs. Currently available options: \* `logging.googleapis.com/kubernetes` - The Cloud Logging service with a Kubernetes-native resource model \* `logging.googleapis.com` - The legacy Cloud Logging service (no longer available as of GKE 1.15). \* `none` - no logs will be exported from the cluster. If left as an empty string,`logging.googleapis.com/kubernetes` will be used for GKE 1.14+ or `logging.googleapis.com` for earlier versions. |
| `maintenancePolicy` | MaintenancePolicy | Configure the maintenance policy for this cluster. |
| `managedMachineLearningDiagnosticsConfig` | ManagedMachineLearningDiagnosticsConfig | Configuration for managed machine learning diagnostics. |
| `managedOpentelemetryConfig` | ManagedOpenTelemetryConfig | Configuration for Managed OpenTelemetry pipeline. |
| `master` | Master | Configuration for master components. |
| `masterAuth` | MasterAuth | The authentication information for accessing the master endpoint. If unspecified, the defaults are used: For clusters before v1.12, if master_auth is unspecified, `username` will be set to "admin", a random password will be generated, and a client certificate will be issued. |
| `masterAuthorizedNetworksConfig` | MasterAuthorizedNetworksConfig | The configuration options for master authorized networks feature. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.authorized_networks_config instead. |
| `masterIpv4CidrBlock` | string | The IP prefix in CIDR notation to use for the hosted master network. This prefix will be used for assigning private IP addresses to the master or set of masters, as well as the ILB VIP. This field is deprecated, use private_cluster_config.master_ipv4_cidr_block instead. |
| `meshCertificates` | MeshCertificates | Configuration for issuance of mTLS keys and certificates to Kubernetes pods. |
| `monitoringConfig` | MonitoringConfig | Monitoring configuration for the cluster. |
| `monitoringService` | string | The monitoring service the cluster should use to write metrics. Currently available options: \* `monitoring.googleapis.com/kubernetes` - The Cloud Monitoring service with a Kubernetes-native resource model \* `monitoring.googleapis.com` - The legacy Cloud Monitoring service (no longer available as of GKE 1.15). \* `none` - No metrics will be exported from the cluster. If left as an empty string,`monitoring.googleapis.com/kubernetes` will be used for GKE 1.14+ or `monitoring.googleapis.com` for earlier versions. |
| `name` | string | The name of this cluster. The name must be unique within this project and location (e.g. zone or region), and can be up to 40 characters with the following restrictions: \* Lowercase letters, numbers, and hyphens only. \* Must start with a letter. \* Must end with a number or a letter. |
| `network` | string | The name of the Google Compute Engine network (https://cloud.google.com/compute/docs/networks-and-firewalls#networks) to which the cluster is connected. If left unspecified, the `default` network will be used. On output this shows the network ID instead of the name. |
| `networkConfig` | NetworkConfig | Configuration for cluster networking. |
| `networkPolicy` | NetworkPolicy | Configuration options for the NetworkPolicy feature. |
| `nodeConfig` | NodeConfig | Parameters used in creating the cluster's nodes. For requests, this field should only be used in lieu of a "node_pool" object, since this configuration (along with the "initial_node_count") will be used to create a "NodePool" object with an auto-generated name. Do not use this and a node_pool at the same time. For responses, this field will be populated with the node configuration of the first node pool. (For configuration of each node pool, see `node_pool.config`) If unspecified, the defaults are used. This field is deprecated, use node_pool.config instead. |
| `nodeCreationConfig` | NodeCreationConfig | Optional. Configuration for Node Creation Mode. |
| `nodeIpv4CidrSize` | integer (int32) | Output only. The size of the address space on each node for hosting containers. This is provisioned from within the `container_ipv4_cidr` range. This field will only be set when cluster is in route-based network mode. |
| `nodePoolAutoConfig` | NodePoolAutoConfig | Node pool configs that apply to all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. |
| `nodePoolDefaults` | NodePoolDefaults | Default NodePool settings for the entire cluster. These settings are overridden if specified on the specific NodePool object. |
| `nodePoolUpgradeConcurrencyConfig` | NodePoolUpgradeConcurrencyConfig | The node pool upgrade concurrency config of the cluster. This field is used for auto upgrade. |
| `nodePools` | array<NodePool> | The node pools associated with this cluster. This field should not be set if "node_config" or "initial_node_count" are specified. |
| `notificationConfig` | NotificationConfig | Notification configuration of the cluster. |
| `parentProductConfig` | ParentProductConfig | The configuration of the parent product of the cluster. This field is used by Google internal products that are built on top of the GKE cluster and take the ownership of the cluster. |
| `podAutoscaling` | PodAutoscaling | The config for pod autoscaling. |
| `podSecurityPolicyConfig` | PodSecurityPolicyConfig | Configuration for the PodSecurityPolicy feature. |
| `privateCluster` | boolean | If this is a private cluster setup. Private clusters are clusters that, by default have no external IP addresses on the nodes and where nodes and the master communicate over private IP addresses. This field is deprecated, use private_cluster_config.enable_private_nodes instead. |
| `privateClusterConfig` | PrivateClusterConfig | Configuration for private cluster. |
| `protectConfig` | ProtectConfig | Deprecated: Use SecurityPostureConfig instead. Enable/Disable Protect API features for the cluster. |
| `rbacBindingConfig` | RBACBindingConfig | RBACBindingConfig allows user to restrict ClusterRoleBindings an RoleBindings that can be created. |
| `releaseChannel` | ReleaseChannel | Release channel configuration. If left unspecified on cluster creation and a version is specified, the cluster is enrolled in the most mature release channel where the version is available (first checking STABLE, then REGULAR, and finally RAPID). Otherwise, if no release channel configuration and no version is specified, the cluster is enrolled in the REGULAR channel with its default version. |
| `resourceLabels` | object | The resource labels for the cluster to use to annotate any related Google Compute Engine resources. |
| `resourceUsageExportConfig` | ResourceUsageExportConfig | Configuration for exporting resource usages. Resource usage export is disabled when this config unspecified. |
| `rollbackSafeUpgrade` | RollbackSafeUpgrade | The rollback safe upgrade information of the cluster. This field is used when user manually triggers a rollback safe upgrade. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `scheduleUpgradeConfig` | ScheduleUpgradeConfig | Optional. Configuration for scheduled upgrades. |
| `secretManagerConfig` | SecretManagerConfig | Secret CSI driver configuration. |
| `secretSyncConfig` | SecretSyncConfig | Configuration for sync Secret Manager secrets as k8s secrets. |
| `securityPostureConfig` | SecurityPostureConfig | Optional. Enable/Disable Security Posture API features for the cluster. |
| `selfLink` | string | Output only. Server-defined URL for the resource. |
| `servicesIpv4Cidr` | string | Output only. The IP address range of the Kubernetes services in this cluster, in CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `1.2.3.4/29`). Service addresses are typically put in the last `/16` from the container CIDR. |
| `shieldedNodes` | ShieldedNodes | Shielded Nodes configuration. |
| `status` | string enum | Output only. The current status of this cluster. Values: `STATUS_UNSPECIFIED`, `PROVISIONING`, `RUNNING`, `RECONCILING`, `STOPPING`, `ERROR`, `DEGRADED`. |
| `statusMessage` | string | Output only. Deprecated. Use conditions instead. Additional information about the current status of this cluster, if available. |
| `subnetwork` | string | The name of the Google Compute Engine subnetwork (https://cloud.google.com/compute/docs/subnetworks) to which the cluster is connected. On output this shows the subnetwork ID instead of the name. |
| `targetNodeVersion` | string | Optional. The cluster-level default node version to be used for newly created node pools where the node version is not explicitly specified. The node version is also used to reconcile existing node pools to this version. |
| `tpuConfig` | TpuConfig | Configuration for Cloud TPU support; This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25. |
| `tpuIpv4CidrBlock` | string | Output only. The IP address range of the Cloud TPUs in this cluster, in CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `1.2.3.4/29`). This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25. |
| `userManagedKeysConfig` | UserManagedKeysConfig | The Custom keys configuration for the cluster. |
| `verticalPodAutoscaling` | VerticalPodAutoscaling | Cluster-level Vertical Pod Autoscaling configuration. |
| `workloadAltsConfig` | WorkloadALTSConfig | Configuration for direct-path (via ALTS) with workload identity. This feature is not officially supported for external customers in Kubernetes Engine when using Workload Identity. |
| `workloadCertificates` | WorkloadCertificates | Configuration for issuance of mTLS keys and certificates to Kubernetes pods. |
| `workloadIdentityConfig` | WorkloadIdentityConfig | Configuration for the use of Kubernetes Service Accounts in IAM policies. |
| `zone` | string | Output only. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field is deprecated, use location instead. |

### `ClusterAutoscaling`

- ClusterAutoscaling contains global, per-cluster information required by Cluster Autoscaler to automatically adjust the size of the cluster and create/delete node pools based on the current needs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autopilotGeneralProfile` | string enum | Autopilot general profile for the cluster, which defines the configuration for the cluster. Values: `AUTOPILOT_GENERAL_PROFILE_UNSPECIFIED`, `NO_PERFORMANCE`, `NONE`. |
| `autoprovisioningLocations` | array<string> | The list of Google Compute Engine zones (https://cloud.google.com/compute/docs/zones#available) in which the NodePool's nodes can be created by NAP. |
| `autoprovisioningNodePoolDefaults` | AutoprovisioningNodePoolDefaults | AutoprovisioningNodePoolDefaults contains defaults for a node pool created by NAP. |
| `autoprovisioningRestrictionConfig` | AutoprovisioningRestrictionConfig | Optional. Configures restrictions related to autoprovisioning settings. |
| `autoscalingProfile` | string enum | Defines autoscaling behaviour. Values: `PROFILE_UNSPECIFIED`, `OPTIMIZE_UTILIZATION`, `BALANCED`. |
| `defaultComputeClassConfig` | DefaultComputeClassConfig | Default compute class is a configuration for default compute class. |
| `enableNodeAutoprovisioning` | boolean | Enables automatic node pool creation and deletion. |
| `resourceLimits` | array<ResourceLimit> | Contains global constraints regarding minimum and maximum amount of resources in the cluster. |

### `ClusterNetworkPerformanceConfig`

- Configuration of network bandwidth tiers
- Version: v1

| Field | Type | Description |
|---|---|---|
| `totalEgressBandwidthTier` | string enum | Specifies the total network bandwidth tier for NodePools in the cluster. Values: `TIER_UNSPECIFIED`, `TIER_1`. |

### `ClusterPolicyConfig`

- ClusterPolicyConfig stores the configuration for cluster wide policies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `noStandardNodePools` | boolean | Denotes preventing standard node pools and requiring only autopilot node pools. |
| `noSystemImpersonation` | boolean | Denotes preventing impersonation and CSRs for GKE System users. |
| `noSystemMutation` | boolean | Denotes that preventing creation and mutation of resources in GKE managed namespaces and cluster-scoped GKE managed resources . |
| `noUnsafeWebhooks` | boolean | Denotes preventing unsafe webhooks. |

### `ClusterTelemetry`

- Telemetry integration for the cluster.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Type of the integration. Values: `UNSPECIFIED`, `DISABLED`, `ENABLED`, `SYSTEM_ONLY`. |

### `ClusterUpdate`

- ClusterUpdate describes an update to the cluster. Exactly one update can be applied to a cluster with each request, so at most one field can be provided.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalPodRangesConfig` | AdditionalPodRangesConfig | The additional pod ranges to be added to the cluster. These pod ranges can be used by node pools to allocate pod IPs. |
| `desiredAdditionalIpRangesConfig` | DesiredAdditionalIPRangesConfig | The desired config for additional subnetworks attached to the cluster. |
| `desiredAddonsConfig` | AddonsConfig | Configurations for the various addons available to run in the cluster. |
| `desiredAmbientNetworkingConfig` | AmbientNetworkingConfig | Optional. The desired ambient networking configuration. |
| `desiredAnonymousAuthenticationConfig` | AnonymousAuthenticationConfig | Configuration for limiting anonymous access to all endpoints except the health checks. |
| `desiredAuthenticatorGroupsConfig` | AuthenticatorGroupsConfig | The desired authenticator groups config for the cluster. |
| `desiredAutoIpamConfig` | AutoIpamConfig | AutoIpamConfig contains all information related to Auto IPAM |
| `desiredAutopilotClusterPolicyConfig` | ClusterPolicyConfig | The desired autopilot cluster policies that to be enforced in the cluster. |
| `desiredAutopilotWorkloadPolicyConfig` | WorkloadPolicyConfig | WorkloadPolicyConfig is the configuration related to GCW workload policy |
| `desiredBinaryAuthorization` | BinaryAuthorization | The desired configuration options for the Binary Authorization feature. |
| `desiredClusterAutoscaling` | ClusterAutoscaling | Cluster-level autoscaling configuration. |
| `desiredCompliancePostureConfig` | CompliancePostureConfig | Deprecated: Compliance Posture is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. Enable/Disable Compliance Posture features for the cluster. |
| `desiredContainerdConfig` | ContainerdConfig | The desired containerd config for the cluster. |
| `desiredControlPlaneEgress` | ControlPlaneEgress | The desired control plane egress control config for the cluster. |
| `desiredControlPlaneEndpointsConfig` | ControlPlaneEndpointsConfig | Control plane endpoints configuration. |
| `desiredCostManagementConfig` | CostManagementConfig | The desired configuration for the fine-grained cost allocation feature. |
| `desiredDatabaseEncryption` | DatabaseEncryption | Configuration of etcd encryption. |
| `desiredDatapathProvider` | string enum | The desired datapath provider for the cluster. Values: `DATAPATH_PROVIDER_UNSPECIFIED`, `LEGACY_DATAPATH`, `ADVANCED_DATAPATH`, `MIGRATE_TO_ADVANCED_DATAPATH`, `MIGRATE_TO_LEGACY_DATAPATH`. |
| `desiredDefaultEnablePrivateNodes` | boolean | Override the default setting of whether future created nodes have private IP addresses only, namely NetworkConfig.default_enable_private_nodes |
| `desiredDefaultSnatStatus` | DefaultSnatStatus | The desired status of whether to disable default sNAT for this cluster. |
| `desiredDisableL4LbFirewallReconciliation` | boolean | Enable/Disable L4 LB VPC firewall reconciliation for the cluster. |
| `desiredDnsConfig` | DNSConfig | DNSConfig contains clusterDNS config for this cluster. |
| `desiredEmulatedVersion` | string | Optional. The desired emulated version for the cluster. |
| `desiredEnableCiliumClusterwideNetworkPolicy` | boolean | Enable/Disable Cilium Clusterwide Network Policy for the cluster. |
| `desiredEnableFqdnNetworkPolicy` | boolean | Enable/Disable FQDN Network Policy for the cluster. |
| `desiredEnableMultiNetworking` | boolean | Enable/Disable Multi-Networking for the cluster |
| `desiredEnablePrivateEndpoint` | boolean | Enable/Disable private endpoint for the cluster's master. Deprecated: Use desired_control_plane_endpoints_config.ip_endpoints_config.enable_public_endpoint instead. Note that the value of enable_public_endpoint is reversed: if enable_private_endpoint is false, then enable_public_endpoint will be true. |
| `desiredEnterpriseConfig` | DesiredEnterpriseConfig | The desired enterprise configuration for the cluster. Deprecated: GKE Enterprise features are now available without an Enterprise tier. |
| `desiredFleet` | Fleet | The desired fleet configuration for the cluster. |
| `desiredGatewayApiConfig` | GatewayAPIConfig | The desired config of Gateway API on this cluster. |
| `desiredGcfsConfig` | GcfsConfig | The desired GCFS config for the cluster |
| `desiredIdentityServiceConfig` | IdentityServiceConfig | The desired Identity Service component configuration. |
| `desiredImage` | string | The desired name of the image to use for this node. This is used to create clusters using a custom image. NOTE: Set the "desired_node_pool" field as well. |
| `desiredImageProject` | string | The project containing the desired image to use for this node. This is used to create clusters using a custom image. NOTE: Set the "desired_node_pool" field as well. |
| `desiredImageType` | string | The desired image type for the node pool. NOTE: Set the "desired_node_pool" field as well. |
| `desiredInTransitEncryptionConfig` | string enum | Specify the details of in-transit encryption. Values: `IN_TRANSIT_ENCRYPTION_CONFIG_UNSPECIFIED`, `IN_TRANSIT_ENCRYPTION_DISABLED`, `IN_TRANSIT_ENCRYPTION_INTER_NODE_TRANSPARENT`. |
| `desiredIntraNodeVisibilityConfig` | IntraNodeVisibilityConfig | The desired config of Intra-node visibility. |
| `desiredK8sBetaApis` | K8sBetaAPIConfig | Desired Beta APIs to be enabled for cluster. |
| `desiredL4ilbSubsettingConfig` | ILBSubsettingConfig | The desired L4 Internal Load Balancer Subsetting configuration. |
| `desiredLocations` | array<string> | The desired list of Google Compute Engine zones (https://cloud.google.com/compute/docs/zones#available) in which the cluster's nodes should be located. This list must always include the cluster's primary zone. Warning: changing cluster locations will update the locations of all node pools and will result in nodes being added and/or removed. |
| `desiredLoggingConfig` | LoggingConfig | The desired logging configuration. |
| `desiredLoggingService` | string | The logging service the cluster should use to write logs. Currently available options: \* `logging.googleapis.com/kubernetes` - The Cloud Logging service with a Kubernetes-native resource model \* `logging.googleapis.com` - The legacy Cloud Logging service (no longer available as of GKE 1.15). \* `none` - no logs will be exported from the cluster. If left as an empty string,`logging.googleapis.com/kubernetes` will be used for GKE 1.14+ or `logging.googleapis.com` for earlier versions. |
| `desiredManagedMachineLearningDiagnosticsConfig` | ManagedMachineLearningDiagnosticsConfig | The desired managed machine learning diagnostics configuration. |
| `desiredManagedOpentelemetryConfig` | ManagedOpenTelemetryConfig | The desired managed open telemetry configuration. |
| `desiredMasterAuthorizedNetworksConfig` | MasterAuthorizedNetworksConfig | The desired configuration options for master authorized networks feature. Deprecated: Use desired_control_plane_endpoints_config.ip_endpoints_config.authorized_networks_config instead. |
| `desiredMasterVersion` | string | The Kubernetes version to change the master to. Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the default Kubernetes version |
| `desiredMeshCertificates` | MeshCertificates | Configuration for issuance of mTLS keys and certificates to Kubernetes pods. |
| `desiredMonitoringConfig` | MonitoringConfig | The desired monitoring configuration. |
| `desiredMonitoringService` | string | The monitoring service the cluster should use to write metrics. Currently available options: \* `monitoring.googleapis.com/kubernetes` - The Cloud Monitoring service with a Kubernetes-native resource model \* `monitoring.googleapis.com` - The legacy Cloud Monitoring service (no longer available as of GKE 1.15). \* `none` - No metrics will be exported from the cluster. If left as an empty string,`monitoring.googleapis.com/kubernetes` will be used for GKE 1.14+ or `monitoring.googleapis.com` for earlier versions. |
| `desiredNetworkPerformanceConfig` | ClusterNetworkPerformanceConfig | The desired network performance config. |
| `desiredNetworkTierConfig` | NetworkTierConfig | The desired network tier configuration for the cluster. |
| `desiredNodeCreationConfig` | NodeCreationConfig | Optional. The desired NodeCreationConfig for the cluster. |
| `desiredNodeKubeletConfig` | NodeKubeletConfig | The desired node kubelet config for the cluster. |
| `desiredNodePoolAutoConfigKubeletConfig` | NodeKubeletConfig | The desired node kubelet config for all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. |
| `desiredNodePoolAutoConfigLinuxNodeConfig` | LinuxNodeConfig | The desired Linux node config for all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. Currently only `cgroup_mode` can be set here. |
| `desiredNodePoolAutoConfigNetworkTags` | NetworkTags | The desired network tags that apply to all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. |
| `desiredNodePoolAutoConfigResourceManagerTags` | ResourceManagerTags | The desired resource manager tags that apply to all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. |
| `desiredNodePoolAutoscaling` | NodePoolAutoscaling | Autoscaler configuration for the node pool specified in desired_node_pool_id. If there is only one pool in the cluster and desired_node_pool_id is not provided then the change applies to that single node pool. |
| `desiredNodePoolId` | string | The node pool to be upgraded. This field is mandatory if "desired_node_version", "desired_image_family" or "desired_node_pool_autoscaling" is specified and there is more than one node pool on the cluster. |
| `desiredNodePoolLoggingConfig` | NodePoolLoggingConfig | The desired node pool logging configuration defaults for the cluster. |
| `desiredNodeVersion` | string | The Kubernetes version to change the nodes to (typically an upgrade). Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the Kubernetes master version |
| `desiredNotificationConfig` | NotificationConfig | The desired notification configuration. |
| `desiredParentProductConfig` | ParentProductConfig | The desired parent product config for the cluster. |
| `desiredPodAutoscaling` | PodAutoscaling | The desired config for pod autoscaling. |
| `desiredPrivateClusterConfig` | PrivateClusterConfig | The desired private cluster configuration. master_global_access_config is the only field that can be changed via this field. See also ClusterUpdate.desired_enable_private_endpoint for modifying other fields within PrivateClusterConfig. Deprecated: Use desired_control_plane_endpoints_config.ip_endpoints_config.global_access instead. |
| `desiredPrivateIpv6GoogleAccess` | string enum | The desired state of IPv6 connectivity to Google Services. Values: `PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED`, `PRIVATE_IPV6_GOOGLE_ACCESS_DISABLED`, `PRIVATE_IPV6_GOOGLE_ACCESS_TO_GOOGLE`, `PRIVATE_IPV6_GOOGLE_ACCESS_BIDIRECTIONAL`. |
| `desiredPrivilegedAdmissionConfig` | PrivilegedAdmissionConfig | The desired privileged admission config for the cluster. |
| `desiredRbacBindingConfig` | RBACBindingConfig | RBACBindingConfig allows user to restrict ClusterRoleBindings an RoleBindings that can be created. |
| `desiredReleaseChannel` | ReleaseChannel | The desired release channel configuration. |
| `desiredResourceUsageExportConfig` | ResourceUsageExportConfig | The desired configuration for exporting resource usage. |
| `desiredRollbackSafeUpgrade` | RollbackSafeUpgrade | Optional. The desired rollback safe upgrade configuration. |
| `desiredSecretManagerConfig` | SecretManagerConfig | Enable/Disable Secret Manager Config. |
| `desiredSecretSyncConfig` | SecretSyncConfig | Configuration for sync Secret Manager secrets as k8s secrets. |
| `desiredSecurityPostureConfig` | SecurityPostureConfig | Enable/Disable Security Posture API features for the cluster. |
| `desiredServiceExternalIpsConfig` | ServiceExternalIPsConfig | ServiceExternalIPsConfig specifies the config for the use of Services with ExternalIPs field. |
| `desiredShieldedNodes` | ShieldedNodes | Configuration for Shielded Nodes. |
| `desiredStackType` | string enum | The desired stack type of the cluster. If a stack type is provided and does not match the current stack type of the cluster, update will attempt to change the stack type to the new type. Values: `STACK_TYPE_UNSPECIFIED`, `IPV4`, `IPV4_IPV6`. |
| `desiredUserManagedKeysConfig` | UserManagedKeysConfig | The desired user managed keys config for the cluster. |
| `desiredVerticalPodAutoscaling` | VerticalPodAutoscaling | Cluster-level Vertical Pod Autoscaling configuration. |
| `desiredWorkloadIdentityConfig` | WorkloadIdentityConfig | Configuration for Workload Identity. |
| `enableK8sBetaApis` | K8sBetaAPIConfig | Kubernetes open source beta apis enabled on the cluster. Only beta apis |
| `etag` | string | The current etag of the cluster. If an etag is provided and does not match the current etag of the cluster, update will be blocked and an ABORTED error will be returned. |
| `gkeAutoUpgradeConfig` | GkeAutoUpgradeConfig | Configuration for GKE auto upgrade. |
| `removedAdditionalPodRangesConfig` | AdditionalPodRangesConfig | The additional pod ranges that are to be removed from the cluster. The pod ranges specified here must have been specified earlier in the 'additional_pod_ranges_config' argument. |
| `userManagedKeysConfig` | UserManagedKeysConfig | The Custom keys configuration for the cluster. This field is deprecated. Use ClusterUpdate.desired_user_managed_keys_config instead. |

### `ClusterUpdate` (v1beta1)

- ClusterUpdate describes an update to the cluster. Exactly one update can be applied to a cluster with each request, so at most one field can be provided.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `additionalPodRangesConfig` | AdditionalPodRangesConfig | The additional pod ranges to be added to the cluster. These pod ranges can be used by node pools to allocate pod IPs. |
| `desiredAdditionalIpRangesConfig` | DesiredAdditionalIPRangesConfig | The desired config for additional subnetworks attached to the cluster. |
| `desiredAddonsConfig` | AddonsConfig | Configurations for the various addons available to run in the cluster. |
| `desiredAmbientNetworkingConfig` | AmbientNetworkingConfig | Optional. The desired ambient networking configuration. |
| `desiredAnonymousAuthenticationConfig` | AnonymousAuthenticationConfig | Configuration for limiting anonymous access to all endpoints except the health checks. |
| `desiredAuthenticatorGroupsConfig` | AuthenticatorGroupsConfig | AuthenticatorGroupsConfig specifies the config for the cluster security groups settings. |
| `desiredAutoIpamConfig` | AutoIpamConfig | AutoIpamConfig contains all information related to Auto IPAM |
| `desiredAutopilotClusterPolicyConfig` | ClusterPolicyConfig | The desired autopilot cluster policies that to be enforced in the cluster. |
| `desiredAutopilotWorkloadPolicyConfig` | WorkloadPolicyConfig | WorkloadPolicyConfig is the configuration related to GCW workload policy |
| `desiredBinaryAuthorization` | BinaryAuthorization | The desired configuration options for the Binary Authorization feature. |
| `desiredClusterAutoscaling` | ClusterAutoscaling | Cluster-level autoscaling configuration. |
| `desiredClusterTelemetry` | ClusterTelemetry | The desired telemetry integration for the cluster. |
| `desiredCompliancePostureConfig` | CompliancePostureConfig | Deprecated: Compliance Posture is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. Enable/Disable Compliance Posture features for the cluster. |
| `desiredContainerdConfig` | ContainerdConfig | The desired containerd config for the cluster. |
| `desiredControlPlaneEgress` | ControlPlaneEgress | The desired control plane egress control config for the cluster. |
| `desiredControlPlaneEndpointsConfig` | ControlPlaneEndpointsConfig | Control plane endpoints configuration. |
| `desiredCostManagementConfig` | CostManagementConfig | The desired configuration for the fine-grained cost allocation feature. |
| `desiredDatabaseEncryption` | DatabaseEncryption | Configuration of etcd encryption. |
| `desiredDatapathProvider` | string enum | The desired datapath provider for the cluster. Values: `DATAPATH_PROVIDER_UNSPECIFIED`, `LEGACY_DATAPATH`, `ADVANCED_DATAPATH`, `MIGRATE_TO_ADVANCED_DATAPATH`, `MIGRATE_TO_LEGACY_DATAPATH`. |
| `desiredDefaultEnablePrivateNodes` | boolean | Override the default setting of whether future created nodes have private IP addresses only, namely NetworkConfig.default_enable_private_nodes |
| `desiredDefaultSnatStatus` | DefaultSnatStatus | The desired status of whether to disable default sNAT for this cluster. |
| `desiredDisableL4LbFirewallReconciliation` | boolean | Enable/Disable L4 LB VPC firewall reconciliation for the cluster. |
| `desiredDnsConfig` | DNSConfig | DNSConfig contains clusterDNS config for this cluster. |
| `desiredEmulatedVersion` | string | Optional. The desired emulated version for the cluster. |
| `desiredEnableCiliumClusterwideNetworkPolicy` | boolean | Enable/Disable Cilium Clusterwide Network Policy for the cluster. |
| `desiredEnableFqdnNetworkPolicy` | boolean | Enable/Disable FQDN Network Policy for the cluster. |
| `desiredEnableMultiNetworking` | boolean | Enable/Disable Multi-Networking for the cluster |
| `desiredEnablePrivateEndpoint` | boolean | Enable/Disable private endpoint for the cluster's master. Deprecated: Use desired_control_plane_endpoints_config.ip_endpoints_config.enable_public_endpoint instead. Note that the value of enable_public_endpoint is reversed: if enable_private_endpoint is false, then enable_public_endpoint will be true. |
| `desiredEnterpriseConfig` | DesiredEnterpriseConfig | The desired enterprise configuration for the cluster. Deprecated: GKE Enterprise features are now available without an Enterprise tier. |
| `desiredFleet` | Fleet | The desired fleet configuration for the cluster. |
| `desiredGatewayApiConfig` | GatewayAPIConfig | The desired config of Gateway API on this cluster. |
| `desiredGcfsConfig` | GcfsConfig | The desired GCFS config for the cluster. |
| `desiredHostMaintenancePolicy` | HostMaintenancePolicy | HostMaintenancePolicy contains the desired maintenance policy for the Google Compute Engine hosts. |
| `desiredIdentityServiceConfig` | IdentityServiceConfig | The desired Identity Service component configuration. |
| `desiredImage` | string | The desired name of the image to use for this node. This is used to create clusters using a custom image. |
| `desiredImageProject` | string | The project containing the desired image to use for this node. This is used to create clusters using a custom image. |
| `desiredImageType` | string | The desired image type for the node pool. NOTE: Set the "desired_node_pool" field as well. |
| `desiredInTransitEncryptionConfig` | string enum | Specify the details of in-transit encryption. Now named inter-node transparent encryption. Values: `IN_TRANSIT_ENCRYPTION_CONFIG_UNSPECIFIED`, `IN_TRANSIT_ENCRYPTION_DISABLED`, `IN_TRANSIT_ENCRYPTION_INTER_NODE_TRANSPARENT`. |
| `desiredIntraNodeVisibilityConfig` | IntraNodeVisibilityConfig | The desired config of Intra-node visibility. |
| `desiredK8sBetaApis` | K8sBetaAPIConfig | Beta APIs enabled for cluster. |
| `desiredL4ilbSubsettingConfig` | ILBSubsettingConfig | The desired L4 Internal Load Balancer Subsetting configuration. |
| `desiredLocations` | array<string> | The desired list of Google Compute Engine zones (https://cloud.google.com/compute/docs/zones#available) in which the cluster's nodes should be located. This list must always include the cluster's primary zone. Warning: changing cluster locations will update the locations of all node pools and will result in nodes being added and/or removed. |
| `desiredLoggingConfig` | LoggingConfig | The desired logging configuration. |
| `desiredLoggingService` | string | The logging service the cluster should use to write logs. Currently available options: \* `logging.googleapis.com/kubernetes` - The Cloud Logging service with a Kubernetes-native resource model \* `logging.googleapis.com` - The legacy Cloud Logging service (no longer available as of GKE 1.15). \* `none` - no logs will be exported from the cluster. If left as an empty string,`logging.googleapis.com/kubernetes` will be used for GKE 1.14+ or `logging.googleapis.com` for earlier versions. |
| `desiredManagedMachineLearningDiagnosticsConfig` | ManagedMachineLearningDiagnosticsConfig | The desired managed machine learning diagnostics configuration. |
| `desiredManagedOpentelemetryConfig` | ManagedOpenTelemetryConfig | The desired managed open telemetry configuration. |
| `desiredMaster` | Master | Configuration for master components. |
| `desiredMasterAuthorizedNetworksConfig` | MasterAuthorizedNetworksConfig | The desired configuration options for master authorized networks feature. Deprecated: Use desired_control_plane_endpoints_config.ip_endpoints_config.authorized_networks_config instead. |
| `desiredMasterVersion` | string | The Kubernetes version to change the master to. The only valid value is the latest supported version. Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the default Kubernetes version |
| `desiredMeshCertificates` | MeshCertificates | Configuration for issuance of mTLS keys and certificates to Kubernetes pods. |
| `desiredMonitoringConfig` | MonitoringConfig | The desired monitoring configuration. |
| `desiredMonitoringService` | string | The monitoring service the cluster should use to write metrics. Currently available options: \* `monitoring.googleapis.com/kubernetes` - The Cloud Monitoring service with a Kubernetes-native resource model \* `monitoring.googleapis.com` - The legacy Cloud Monitoring service (no longer available as of GKE 1.15). \* `none` - No metrics will be exported from the cluster. If left as an empty string,`monitoring.googleapis.com/kubernetes` will be used for GKE 1.14+ or `monitoring.googleapis.com` for earlier versions. |
| `desiredNetworkPerformanceConfig` | ClusterNetworkPerformanceConfig | The desired network performance config. |
| `desiredNetworkTierConfig` | NetworkTierConfig | The desired network tier configuration for the cluster. |
| `desiredNodeCreationConfig` | NodeCreationConfig | Optional. The desired NodeCreationConfig for the cluster. |
| `desiredNodeKubeletConfig` | NodeKubeletConfig | The desired node kubelet config for the cluster. |
| `desiredNodePoolAutoConfigKubeletConfig` | NodeKubeletConfig | The desired node kubelet config for all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. |
| `desiredNodePoolAutoConfigLinuxNodeConfig` | LinuxNodeConfig | The desired Linux node config for all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. Currently only `cgroup_mode` can be set here. |
| `desiredNodePoolAutoConfigNetworkTags` | NetworkTags | The desired network tags that apply to all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. |
| `desiredNodePoolAutoConfigResourceManagerTags` | ResourceManagerTags | The desired resource manager tags that apply to all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. |
| `desiredNodePoolAutoscaling` | NodePoolAutoscaling | Autoscaler configuration for the node pool specified in desired_node_pool_id. If there is only one pool in the cluster and desired_node_pool_id is not provided then the change applies to that single node pool. |
| `desiredNodePoolId` | string | The node pool to be upgraded. This field is mandatory if "desired_node_version", "desired_image_family", "desired_node_pool_autoscaling", or "desired_workload_metadata_config" is specified and there is more than one node pool on the cluster. |
| `desiredNodePoolLoggingConfig` | NodePoolLoggingConfig | The desired node pool logging configuration defaults for the cluster. |
| `desiredNodePoolUpgradeConcurrencyConfig` | NodePoolUpgradeConcurrencyConfig | The desired node pool upgrade concurrency configuration. |
| `desiredNodeVersion` | string | The Kubernetes version to change the nodes to (typically an upgrade). Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the Kubernetes master version |
| `desiredNotificationConfig` | NotificationConfig | The desired notification configuration. |
| `desiredParentProductConfig` | ParentProductConfig | The desired parent product config for the cluster. |
| `desiredPodAutoscaling` | PodAutoscaling | The desired config for pod autoscaling. |
| `desiredPodSecurityPolicyConfig` | PodSecurityPolicyConfig | The desired configuration options for the PodSecurityPolicy feature. |
| `desiredPrivateClusterConfig` | PrivateClusterConfig | The desired private cluster configuration. master_global_access_config is the only field that can be changed via this field. See also ClusterUpdate.desired_enable_private_endpoint for modifying other fields within PrivateClusterConfig. Deprecated: Use desired_control_plane_endpoints_config.ip_endpoints_config.global_access instead. |
| `desiredPrivateIpv6GoogleAccess` | string enum | The desired state of IPv6 connectivity to Google Services. Values: `PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED`, `PRIVATE_IPV6_GOOGLE_ACCESS_DISABLED`, `PRIVATE_IPV6_GOOGLE_ACCESS_TO_GOOGLE`, `PRIVATE_IPV6_GOOGLE_ACCESS_BIDIRECTIONAL`. |
| `desiredPrivilegedAdmissionConfig` | PrivilegedAdmissionConfig | The desired privileged admission config for the cluster. |
| `desiredProtectConfig` | ProtectConfig | Deprecated: Use DesiredSecurityPostureConfig instead. Enable/Disable Protect API features for the cluster. |
| `desiredRbacBindingConfig` | RBACBindingConfig | RBACBindingConfig allows user to restrict ClusterRoleBindings an RoleBindings that can be created. |
| `desiredReleaseChannel` | ReleaseChannel | The desired release channel configuration. |
| `desiredResourceUsageExportConfig` | ResourceUsageExportConfig | The desired configuration for exporting resource usage. |
| `desiredRollbackSafeUpgrade` | RollbackSafeUpgrade | The desired rollback safe upgrade configuration. |
| `desiredScheduleUpgradeConfig` | ScheduleUpgradeConfig | Optional. The desired scheduled upgrades configuration for the cluster. |
| `desiredSecretManagerConfig` | SecretManagerConfig | Enable/Disable Secret Manager Config. |
| `desiredSecretSyncConfig` | SecretSyncConfig | Configuration for sync Secret Manager secrets as k8s secrets. |
| `desiredSecurityPostureConfig` | SecurityPostureConfig | Enable/Disable Security Posture API features for the cluster. |
| `desiredServiceExternalIpsConfig` | ServiceExternalIPsConfig | ServiceExternalIPsConfig specifies the config for the use of Services with ExternalIPs field. |
| `desiredShieldedNodes` | ShieldedNodes | Configuration for Shielded Nodes. |
| `desiredStackType` | string enum | The desired stack type of the cluster. If a stack type is provided and does not match the current stack type of the cluster, update will attempt to change the stack type to the new type. Values: `STACK_TYPE_UNSPECIFIED`, `IPV4`, `IPV4_IPV6`. |
| `desiredTpuConfig` | TpuConfig | The desired Cloud TPU configuration. This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25. |
| `desiredUserManagedKeysConfig` | UserManagedKeysConfig | The desired user managed keys config for the cluster. |
| `desiredVerticalPodAutoscaling` | VerticalPodAutoscaling | Cluster-level Vertical Pod Autoscaling configuration. |
| `desiredWorkloadAltsConfig` | WorkloadALTSConfig | Configuration for direct-path (via ALTS) with workload identity. This feature is not officially supported for external customers in Kubernetes Engine when using Workload Identity. |
| `desiredWorkloadCertificates` | WorkloadCertificates | Configuration for issuance of mTLS keys and certificates to Kubernetes pods. |
| `desiredWorkloadIdentityConfig` | WorkloadIdentityConfig | Configuration for Workload Identity. |
| `enableK8sBetaApis` | K8sBetaAPIConfig | Kubernetes open source beta apis enabled on the cluster. Only beta apis |
| `etag` | string | The current etag of the cluster. If an etag is provided and does not match the current etag of the cluster, update will be blocked and an ABORTED error will be returned. |
| `gkeAutoUpgradeConfig` | GkeAutoUpgradeConfig | Configuration for GKE auto upgrade. |
| `privateClusterConfig` | PrivateClusterConfig | The desired private cluster configuration. Has no effect. Use desired_private_cluster_config instead. |
| `removedAdditionalPodRangesConfig` | AdditionalPodRangesConfig | The additional pod ranges that are to be removed from the cluster. The pod ranges specified here must have been specified earlier in the 'additional_pod_ranges_config' argument. |
| `userManagedKeysConfig` | UserManagedKeysConfig | The Custom keys configuration for the cluster. This field is deprecated. Use ClusterUpdate.desired_user_managed_keys_config instead. |

### `ClusterUpgradeInfo`

- ClusterUpgradeInfo contains the upgrade information of a cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoUpgradeStatus` | array<string> | The auto upgrade status. Values: `UNKNOWN`, `ACTIVE`, `MINOR_UPGRADE_PAUSED`, `UPGRADE_PAUSED`. |
| `endOfExtendedSupportTimestamp` | string | The cluster's current minor version's end of extended support timestamp. |
| `endOfStandardSupportTimestamp` | string | The cluster's current minor version's end of standard support timestamp. |
| `minorTargetVersion` | string | minor_target_version indicates the target version for minor upgrade. |
| `patchTargetVersion` | string | patch_target_version indicates the target version for patch upgrade. |
| `pausedReason` | array<string> | The auto upgrade paused reason. Values: `AUTO_UPGRADE_PAUSED_REASON_UNSPECIFIED`, `MAINTENANCE_WINDOW`, `MAINTENANCE_EXCLUSION_NO_UPGRADES`, `MAINTENANCE_EXCLUSION_NO_MINOR_UPGRADES`, `CLUSTER_DISRUPTION_BUDGET`, `CLUSTER_DISRUPTION_BUDGET_MINOR_UPGRADE`, `SYSTEM_CONFIG`. |
| `rollbackSafeUpgradeStatus` | RollbackSafeUpgradeStatus | Output only. The cluster's rollback-safe upgrade status. |
| `upgradeDetails` | array<UpgradeDetails> | The list of past auto upgrades. |

### `CompatibilityStatus`

- CompatibilityStatus is the status regarding the control plane's compatibility.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `downgradableVersion` | string | Output only. The GKE version that the cluster can be safely downgraded to if the cluster is emulating the previous minor version. It is usually the cluster's previous version before a minor version upgrade. |
| `emulatedVersionTime` | string (google-datetime) | Output only. Last time the control plane became available after a minor version binary upgrade with emulated version set. It indicates the last time the cluster entered the rollback safe mode. |

### `CompleteControlPlaneUpgradeRequest`

- CompleteControlPlaneUpgradeRequest sets the name of target cluster to complete upgrade.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `version` | string | Optional. API request version that initiates this operation. |

### `CompleteIPRotationRequest`

- CompleteIPRotationRequest moves the cluster master back into single-IP mode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterId` | string | Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. |
| `name` | string | The name (project, location, cluster name) of the cluster to complete IP rotation. Specified in the format `projects/*/locations/*/clusters/*`. |
| `projectId` | string | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `zone` | string | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |

### `CompleteNodePoolUpgradeRequest`

- CompleteNodePoolUpgradeRequest sets the name of target node pool to complete upgrade.
- Version: v1

### `CompliancePostureConfig`

- Deprecated: Compliance Posture is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. CompliancePostureConfig defines the settings needed to enable/disable features for the Compliance Posture.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `complianceStandards` | array<ComplianceStandard> | List of enabled compliance standards. |
| `mode` | string enum | Defines the enablement mode for Compliance Posture. Values: `MODE_UNSPECIFIED`, `DISABLED`, `ENABLED`. |

### `ComplianceStandard`

- Defines the details of a compliance standard.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `standard` | string | Name of the compliance standard. |

### `ConfidentialNodes`

- ConfidentialNodes is configuration for the confidential nodes feature, which makes nodes run on confidential VMs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `confidentialInstanceType` | string enum | Defines the type of technology used by the confidential node. Values: `CONFIDENTIAL_INSTANCE_TYPE_UNSPECIFIED`, `SEV`, `SEV_SNP`, `TDX`. |
| `enabled` | boolean | Whether Confidential Nodes feature is enabled. |

### `ConfigConnectorConfig`

- Configuration options for the Config Connector add-on.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether Cloud Connector is enabled for this cluster. |

### `ConsumptionMeteringConfig`

- Parameters for controlling consumption metering.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether to enable consumption metering for this cluster. If enabled, a second BigQuery table will be created to hold resource consumption records. |

### `ContainerdConfig`

- ContainerdConfig contains configuration to customize containerd.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `privateRegistryAccessConfig` | PrivateRegistryAccessConfig | PrivateRegistryAccessConfig is used to configure access configuration for private container registries. |
| `registryHosts` | array<RegistryHostConfig> | RegistryHostConfig configures containerd registry host configuration. Each registry_hosts represents a hosts.toml file. At most 25 registry_hosts are allowed. |
| `writableCgroups` | WritableCgroups | Optional. WritableCgroups defines writable cgroups configuration for the node pool. |

### `ControlPlaneEgress`

- ControlPlaneEgress defines the settings needed to enable control plane egress control.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | Defines the mode of control plane egress. Values: `MODE_UNSPECIFIED`, `VIA_CONTROL_PLANE`, `NONE`. |

### `ControlPlaneEndpointsConfig`

- Configuration for all of the cluster's control plane endpoints.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsEndpointConfig` | DNSEndpointConfig | DNS endpoint configuration. |
| `ipEndpointsConfig` | IPEndpointsConfig | IP endpoints configuration. |

### `CostManagementConfig`

- Configuration for fine-grained cost allocation feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the feature is enabled or not. |

### `CrashLoopBackOffConfig`

- Contains config to modify node-level parameters for container restart behavior.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxContainerRestartPeriod` | string | Optional. The maximum duration the backoff delay can accrue to for container restarts, minimum 1 second, maximum 300 seconds. If not set, defaults to the internal crashloopbackoff maximum. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". See https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#configurable-container-restart-delay for more details. |

### `CreateClusterRequest`

- CreateClusterRequest creates a cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cluster` | Cluster | Required. A cluster resource (https://cloud.google.com/container-engine/reference/rest/v1/projects.locations.clusters) |
| `parent` | string | The parent (project and location) where the cluster will be created. Specified in the format `projects/*/locations/*`. |
| `projectId` | string | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. |
| `zone` | string | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field. |

### `CreateNodePoolRequest`

- CreateNodePoolRequest creates a node pool for a cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterId` | string | Deprecated. The name of the cluster. This field has been deprecated and replaced by the parent field. |
| `nodePool` | NodePool | Required. The node pool to create. |
| `parent` | string | The parent (project, location, cluster name) where the node pool will be created. Specified in the format `projects/*/locations/*/clusters/*`. |
| `projectId` | string | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. |
| `zone` | string | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field. |

### `CustomImageConfig`

- CustomImageConfig contains the information r
- Version: v1

| Field | Type | Description |
|---|---|---|
| `image` | string | The name of the image to use for this node. |
| `imageProject` | string | The project containing the image to use for this node. |

### `CustomImageInfo`

- Contains the custom image info for a node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `upgradeMessage` | string | Output only. The human-readable upgrade message for the custom image. |

### `CustomNodeInit`

- Support for running custom init code while bootstrapping nodes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `initScript` | InitScript | Optional. The init script to be executed on the node. |

### `DNSConfig`

- DNSConfig contains the desired set of options for configuring clusterDNS.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additiveVpcScopeDnsDomain` | string | Optional. The domain used in Additive VPC scope. |
| `clusterDns` | string enum | cluster_dns indicates which in-cluster DNS provider should be used. Values: `PROVIDER_UNSPECIFIED`, `PLATFORM_DEFAULT`, `CLOUD_DNS`, `KUBE_DNS`. |
| `clusterDnsDomain` | string | cluster_dns_domain is the suffix used for all cluster service records. |
| `clusterDnsScope` | string enum | cluster_dns_scope indicates the scope of access to cluster DNS records. Values: `DNS_SCOPE_UNSPECIFIED`, `CLUSTER_SCOPE`, `VPC_SCOPE`. |

### `DNSEndpointConfig`

- Describes the configuration of a DNS endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowExternalTraffic` | boolean | Controls whether user traffic is allowed over this endpoint. Note that Google-managed services may still use the endpoint even if this is false. |
| `enableK8sCertsViaDns` | boolean | Controls whether the k8s certs auth is allowed via DNS. |
| `enableK8sTokensViaDns` | boolean | Controls whether the k8s token auth is allowed via DNS. |
| `endpoint` | string | Output only. The cluster's DNS endpoint configuration. A DNS format address. This is accessible from the public internet. Ex: uid.us-central1.gke.goog. Always present, but the behavior may change according to the value of DNSEndpointConfig.allow_external_traffic. |

### `DailyMaintenanceWindow`

- Time window specified for daily maintenance operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | string | Output only. Duration of the time window, automatically chosen to be smallest possible in the given scenario. Duration will be in RFC3339 (https://www.ietf.org/rfc/rfc3339.txt) format "PTnHnMnS". |
| `startTime` | string | Time within the maintenance window to start the maintenance operations. Time format should be in RFC3339 (https://www.ietf.org/rfc/rfc3339.txt) format "HH:MM", where HH : \[00-23\] and MM : \[00-59\] GMT. |

### `DatabaseEncryption`

- Configuration of etcd encryption.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentState` | string enum | Output only. The current state of etcd encryption. Values: `CURRENT_STATE_UNSPECIFIED`, `CURRENT_STATE_ENCRYPTED`, `CURRENT_STATE_DECRYPTED`, `CURRENT_STATE_ENCRYPTION_PENDING`, `CURRENT_STATE_ENCRYPTION_ERROR`, `CURRENT_STATE_DECRYPTION_PENDING`, `CURRENT_STATE_DECRYPTION_ERROR`, `CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_ENABLED`, `CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_PENDING`, `CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_ERROR`. |
| `decryptionKeys` | array<string> | Output only. Keys in use by the cluster for decrypting existing objects, in addition to the key in `key_name`. Each item is a CloudKMS key resource. |
| `keyName` | string | Name of CloudKMS key to use for the encryption of secrets in etcd. Ex. projects/my-project/locations/global/keyRings/my-ring/cryptoKeys/my-key |
| `lastOperationErrors` | array<OperationError> | Output only. Records errors seen during DatabaseEncryption update operations. |
| `state` | string enum | The desired state of etcd encryption. Values: `UNKNOWN`, `ENCRYPTED`, `DECRYPTED`, `ALL_OBJECTS_ENCRYPTION_ENABLED`. |

### `DataplaneV2Config`

- DataplaneV2Config is the configuration for DPv2.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scalabilityMode` | string enum | Optional. Scalability mode for the cluster. Values: `SCALABILITY_MODE_UNSPECIFIED`, `DISABLED`, `SCALE_OPTIMIZED`. |

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `DedicatedLocalSsdProfile`

- Provisions a new, separate local NVMe SSD exclusively for swap.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskCount` | string (int64) | The number of physical local NVMe SSD disks to attach. |

### `DefaultComputeClassConfig`

- DefaultComputeClassConfig defines default compute class configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Enables default compute class. |

### `DefaultSnatStatus`

- DefaultSnatStatus contains the desired state of whether default sNAT should be disabled on the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disabled` | boolean | Disables cluster default sNAT rules. |

### `DesiredAdditionalIPRangesConfig`

- DesiredAdditionalIPRangesConfig is a wrapper used for cluster update operation and contains multiple AdditionalIPRangesConfigs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalIpRangesConfigs` | array<AdditionalIPRangesConfig> | List of additional IP ranges configs where each AdditionalIPRangesConfig corresponds to one subnetwork's IP ranges |

### `DesiredEnterpriseConfig`

- DesiredEnterpriseConfig is a wrapper used for updating enterprise_config. Deprecated: GKE Enterprise features are now available without an Enterprise tier.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `desiredTier` | string enum | desired_tier specifies the desired tier of the cluster. Values: `CLUSTER_TIER_UNSPECIFIED`, `STANDARD`, `ENTERPRISE`. |

### `DiskIoScheduler`

- DiskIoScheduler contains the configuration for the disk IO scheduler.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodeAttachedDiskIoScheduler` | string | Optional. Configures the IO scheduler for the attached disks. Supported values are `mq-deadline`, `bfq`, `kyber`, `none`. |
| `nodeSystemIoScheduler` | string | Optional. Configures the IO scheduler for the boot disk or ephemeral lssd that runs node system workloads. Supported values are `mq-deadline`, `bfq`, `kyber`, `none`. |

### `DisruptionBudget`

- DisruptionBudget defines the upgrade disruption budget for the cluster control plane.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastDisruptionTime` | string (google-datetime) | Output only. The last time a disruption was performed on the control plane. |
| `lastMinorVersionDisruptionTime` | string (google-datetime) | Output only. The last time a minor version upgrade was performed on the control plane. |
| `minorVersionDisruptionInterval` | string (google-duration) | Optional. The minimum duration between two minor version upgrades of the control plane. |
| `patchVersionDisruptionInterval` | string (google-duration) | Optional. The minimum duration between two patch version upgrades of the control plane. |

### `DisruptionEvent`

- DisruptionEvent is a notification sent to customers about the disruption event of a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disruptionType` | string enum | The type of the disruption event. Values: `DISRUPTION_TYPE_UNSPECIFIED`, `POD_NOT_ENOUGH_PDB`, `POD_PDB_VIOLATION`. |
| `pdbBlockedNode` | string | The node whose drain is blocked by PDB. This field is set for both POD_PDB_VIOLATION and POD_NOT_ENOUGH_PDB event. |
| `pdbBlockedPod` | array<PdbBlockedPod> | The pods whose evictions are blocked by PDB. This field is set for both POD_PDB_VIOLATION and POD_NOT_ENOUGH_PDB event. |
| `pdbViolationTimeout` | string (google-duration) | The timeout in seconds for which the node drain is blocked by PDB. After this timeout, pods are forcefully evicted. This field is only populated when event_type is POD_PDB_VIOLATION. |

### `DnsCacheConfig`

- Configuration for NodeLocal DNSCache
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether NodeLocal DNSCache is enabled for this cluster. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EncryptionConfig`

- Defines encryption settings for the swap space.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disabled` | boolean | Optional. If true, swap space will not be encrypted. Defaults to false (encrypted). |

### `EnterpriseConfig`

- EnterpriseConfig is the cluster enterprise configuration. Deprecated: GKE Enterprise features are now available without an Enterprise tier.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterTier` | string enum | Output only. cluster_tier indicates the effective tier of the cluster. Values: `CLUSTER_TIER_UNSPECIFIED`, `STANDARD`, `ENTERPRISE`. |
| `desiredTier` | string enum | desired_tier specifies the desired tier of the cluster. Values: `CLUSTER_TIER_UNSPECIFIED`, `STANDARD`, `ENTERPRISE`. |

### `EphemeralLocalSsdProfile`

- Swap on the local SSD shared with pod ephemeral storage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `swapSizeGib` | string (int64) | Specifies the size of the swap space in gibibytes (GiB). |
| `swapSizePercent` | integer (int32) | Specifies the size of the swap space as a percentage of the ephemeral local SSD capacity. |

### `EphemeralStorageConfig`

- EphemeralStorageConfig contains configuration for the ephemeral storage filesystem.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `localSsdCount` | integer (int32) | Number of local SSDs to use to back ephemeral storage. Uses NVMe interfaces. The limit for this value is dependent upon the maximum number of disk available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. A zero (or unset) value has different meanings depending on machine type being used: 1. For pre-Gen3 machines, which support flexible numbers of local ssds, zero (or unset) means to disable using local SSDs as ephemeral storage. 2. For Gen3 machines which dictate a specific number of local ssds, zero (or unset) means to use the default number of local ssds that goes with that machine type. For example, for a c3-standard-8-lssd machine, 2 local ssds would be provisioned. For c3-standard-8 (which doesn't support local ssds), 0 will be provisioned. See https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds for more info. |

### `EphemeralStorageLocalSsdConfig`

- EphemeralStorageLocalSsdConfig contains configuration for the node ephemeral storage using Local SSDs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataCacheCount` | integer (int32) | Number of local SSDs to use for GKE Data Cache. |
| `ephemeralCapacityGb` | string (int64) | Capacity set aside for Ephemeral Storage if using mixed Local SSD modes. The remaining capacity is Raw Block. |
| `localSsdCount` | integer (int32) | Number of local SSDs to use to back ephemeral storage. Uses NVMe interfaces. A zero (or unset) value has different meanings depending on machine type being used: 1. For pre-Gen3 machines, which support flexible numbers of local ssds, zero (or unset) means to disable using local SSDs as ephemeral storage. The limit for this value is dependent upon the maximum number of disk available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. 2. For Gen3 machines which dictate a specific number of local ssds, zero (or unset) means to use the default number of local ssds that goes with that machine type. For example, for a c3-standard-8-lssd machine, 2 local ssds would be provisioned. For c3-standard-8 (which doesn't support local ssds), 0 will be provisioned. See https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds for more info. |

### `EtcHostsEntry`

- Additional entries to be added to /etc/hosts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `host` | string | The hostname of the host. |
| `ip` | string | The IPv4 or IPv6 address of the host. |

### `EvictionGracePeriod`

- Eviction grace periods are grace periods for each eviction signal.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `imagefsAvailable` | string | Optional. Grace period for eviction due to imagefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `imagefsInodesFree` | string | Optional. Grace period for eviction due to imagefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `memoryAvailable` | string | Optional. Grace period for eviction due to memory available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `nodefsAvailable` | string | Optional. Grace period for eviction due to nodefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `nodefsInodesFree` | string | Optional. Grace period for eviction due to nodefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `pidAvailable` | string | Optional. Grace period for eviction due to pid available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |

### `EvictionMinimumReclaim`

- Eviction minimum reclaims are the resource amounts of minimum reclaims for each eviction signal.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `imagefsAvailable` | string | Optional. Minimum reclaim for eviction due to imagefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `imagefsInodesFree` | string | Optional. Minimum reclaim for eviction due to imagefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `memoryAvailable` | string | Optional. Minimum reclaim for eviction due to memory available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `nodefsAvailable` | string | Optional. Minimum reclaim for eviction due to nodefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `nodefsInodesFree` | string | Optional. Minimum reclaim for eviction due to nodefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `pidAvailable` | string | Optional. Minimum reclaim for eviction due to pid available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |

### `EvictionSignals`

- Eviction signals are the current state of a particular resource at a specific point in time. The kubelet uses eviction signals to make eviction decisions by comparing the signals to eviction thresholds, which are the minimum amount of the resource that should be available on the node.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `imagefsAvailable` | string | Optional. Amount of storage available on filesystem that container runtime uses for storing images layers. If the container filesystem and image filesystem are not separate, then imagefs can store both image layers and writeable layers. Defines the amount of "imagefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 15% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `imagefsInodesFree` | string | Optional. Amount of inodes available on filesystem that container runtime uses for storing images layers. Defines the amount of "imagefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `memoryAvailable` | string | Optional. Memory available (i.e. capacity - workingSet), in bytes. Defines the amount of "memory.available" signal in kubelet. Default is unset, if not specified in the kubelet config. Format: positive number + unit, e.g. 100Ki, 10Mi, 5Gi. Valid units are Ki, Mi, Gi. Must be >= 100Mi and <= 50% of the node's memory. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `nodefsAvailable` | string | Optional. Amount of storage available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 10% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `nodefsInodesFree` | string | Optional. Amount of inodes available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |
| `pidAvailable` | string | Optional. Amount of PID available for pod allocation. Defines the amount of "pid.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 10% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals |

### `ExclusionUntilEndOfSupport`

- Defines the maintenance exclusion for the node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Indicates whether the exclusion is enabled. |
| `endTime` | string (google-datetime) | Output only. The end time of the maintenance exclusion. It is output only. It is the cluster control plane version's end of support time, or end of extended support time when the cluster is on extended support channel. |
| `startTime` | string (google-datetime) | Output only. The start time of the maintenance exclusion. It is output only. It is the exclusion creation time. |

### `FastSocket`

- Configuration of Fast Socket feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether Fast Socket features are enabled in the node pool. |

### `Filter`

- Allows filtering to one or more specific event types. If event types are present, those and only those event types will be transmitted to the cluster. Other types will be skipped. If no filter is specified, or no event types are present, all event types will be sent
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventType` | array<string> | Event types to allowlist. Values: `EVENT_TYPE_UNSPECIFIED`, `UPGRADE_AVAILABLE_EVENT`, `UPGRADE_EVENT`, `SECURITY_BULLETIN_EVENT`, `UPGRADE_INFO_EVENT`. |

### `Fleet`

- Fleet is the fleet configuration for the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `membership` | string | Output only. The full resource name of the registered fleet membership of the cluster, in the format `//gkehub.googleapis.com/projects/*/locations/*/memberships/*`. |
| `membershipType` | string enum | The type of the cluster's fleet membership. Values: `MEMBERSHIP_TYPE_UNSPECIFIED`, `LIGHTWEIGHT`. |
| `preRegistered` | boolean | Output only. Whether the cluster has been registered through the fleet API. |
| `project` | string | The Fleet host project(project ID or project number) where this cluster will be registered to. This field cannot be changed after the cluster has been registered. |

### `GCPSecretManagerCertificateConfig`

- GCPSecretManagerCertificateConfig configures a secret from Secret Manager (https://cloud.google.com/secret-manager).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `secretUri` | string | Secret URI, in the form "projects/$PROJECT_ID/secrets/$SECRET_NAME/versions/$VERSION". Version can be fixed (e.g. "2") or "latest" |

### `GPUDirectConfig`

- GPUDirectConfig specifies the GPU direct strategy on the node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gpuDirectStrategy` | string enum | The type of GPU direct strategy to enable on the node pool. Values: `GPU_DIRECT_STRATEGY_UNSPECIFIED`, `RDMA`. |

### `GPUDriverInstallationConfig`

- GPUDriverInstallationConfig specifies the version of GPU driver to be auto installed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gpuDriverVersion` | string enum | Mode for how the GPU driver is installed. Values: `GPU_DRIVER_VERSION_UNSPECIFIED`, `INSTALLATION_DISABLED`, `DEFAULT`, `LATEST`, `SPECIFIC`. |
| `specificVersion` | string | Optional. The specific version of the GPU driver to install. Use this field only with gpu_driver_version set to SPECIFIC. Otherwise, an error will be returned. |

### `GPUSharingConfig`

- GPUSharingConfig represents the GPU sharing configuration for Hardware Accelerators.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gpuSharingStrategy` | string enum | The type of GPU sharing strategy to enable on the GPU node. Values: `GPU_SHARING_STRATEGY_UNSPECIFIED`, `TIME_SHARING`, `MPS`. |
| `maxSharedClientsPerGpu` | string (int64) | The max number of containers that can share a physical GPU. |

### `GatewayAPIConfig`

- GatewayAPIConfig contains the desired config of Gateway API on this cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `channel` | string enum | The Gateway API release channel to use for Gateway API. Values: `CHANNEL_UNSPECIFIED`, `CHANNEL_DISABLED`, `CHANNEL_EXPERIMENTAL`, `CHANNEL_STANDARD`. |

### `GcePersistentDiskCsiDriverConfig`

- Configuration for the Compute Engine PD CSI driver.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the Compute Engine PD CSI driver is enabled for this cluster. |

### `GcfsConfig`

- GcfsConfig contains configurations of Google Container File System (image streaming).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether to use GCFS. |

### `GcpFilestoreCsiDriverConfig`

- Configuration for the Filestore CSI driver.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the Filestore CSI driver is enabled for this cluster. |

### `GcsFuseCsiDriverConfig`

- Configuration for the Cloud Storage Fuse CSI driver.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the Cloud Storage Fuse CSI driver is enabled for this cluster. |

### `GetJSONWebKeysResponse`

- GetJSONWebKeysResponse is a valid JSON Web Key Set as specified in rfc 7517
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cacheHeader` | HttpCacheControlResponseHeader | For HTTP requests, this field is automatically extracted into the Cache-Control HTTP header. |
| `keys` | array<Jwk> | The public component of the keys used by the cluster to sign token requests. |

### `GetOpenIDConfigResponse`

- GetOpenIDConfigResponse is an OIDC discovery document for the cluster. See the OpenID Connect Discovery 1.0 specification for details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cacheHeader` | HttpCacheControlResponseHeader | For HTTP requests, this field is automatically extracted into the Cache-Control HTTP header. |
| `claims_supported` | array<string> | Supported claims. |
| `grant_types` | array<string> | Supported grant types. |
| `id_token_signing_alg_values_supported` | array<string> | supported ID Token signing Algorithms. |
| `issuer` | string | OIDC Issuer. |
| `jwks_uri` | string | JSON Web Key uri. |
| `response_types_supported` | array<string> | Supported response types. |
| `subject_types_supported` | array<string> | Supported subject types. |

### `GkeAutoUpgradeConfig`

- GkeAutoUpgradeConfig is the configuration for GKE auto upgrades.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `patchMode` | string enum | PatchMode specifies how auto upgrade patch builds should be selected. Values: `PATCH_MODE_UNSPECIFIED`, `ACCELERATED`. |

### `GkeBackupAgentConfig`

- Configuration for the Backup for GKE Agent.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the Backup for GKE agent is enabled for this cluster. |

### `HighScaleCheckpointingConfig`

- Configuration for the High Scale Checkpointing.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the High Scale Checkpointing is enabled for this cluster. |

### `HorizontalPodAutoscaling`

- Configuration options for the horizontal pod autoscaling feature, which increases or decreases the number of replica pods a replication controller has based on the resource usage of the existing pods.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disabled` | boolean | Whether the Horizontal Pod Autoscaling feature is enabled in the cluster. When enabled, it ensures that metrics are collected into Stackdriver Monitoring. |

### `HostConfig`

- HostConfig configures the registry host under a given Server.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ca` | array<CertificateConfig> | CA configures the registry host certificate. |
| `capabilities` | array<string> | Capabilities represent the capabilities of the registry host, specifying what operations a host is capable of performing. If not set, containerd enables all capabilities by default. Values: `HOST_CAPABILITY_UNSPECIFIED`, `HOST_CAPABILITY_PULL`, `HOST_CAPABILITY_RESOLVE`, `HOST_CAPABILITY_PUSH`. |
| `client` | array<CertificateConfigPair> | Client configures the registry host client certificate and key. |
| `dialTimeout` | string (google-duration) | Specifies the maximum duration allowed for a connection attempt to complete. A shorter timeout helps reduce delays when falling back to the original registry if the mirror is unreachable. Maximum allowed value is 180s. If not set, containerd sets default 30s. The value should be a decimal number of seconds with an `s` suffix. |
| `header` | array<RegistryHeader> | Header configures the registry host headers. |
| `host` | string | Host configures the registry host/mirror. It supports fully qualified domain names (FQDNs) and IP addresses. Specifying scheme, port or path is supported. Scheme can only be http or https. Wildcards are NOT supported. Examples: - `my.customdomain.com` - `https://my.customdomain.com/path` - `10.0.1.2:5000` |
| `overridePath` | boolean | OverridePath is used to indicate the host's API root endpoint is defined in the URL path rather than by the API specification. This may be used with non-compliant OCI registries which are missing the /v2 prefix. If not set, containerd sets default false. |

### Shape of `AcceleratorConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "acceleratorCount": "string (int64)",
  "acceleratorType": "string",
  "gpuDriverInstallationConfig": "GPUDriverInstallationConfig",
  "gpuPartitionSize": "string",
  "gpuSharingConfig": "GPUSharingConfig"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `container` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://container.googleapis.com/$discovery/rest?version=v1, https://container.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

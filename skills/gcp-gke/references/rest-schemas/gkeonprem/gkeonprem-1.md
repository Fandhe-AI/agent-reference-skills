---
source: https://gkeonprem.googleapis.com/$discovery/rest?version=v1
---

# GKE On-Prem API message schemas (gkeonprem) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/gkeonprem/`.

### `Authorization`

- Authorization defines the On-Prem cluster authorization configuration to bootstrap onto the admin cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminUsers` | array<ClusterUser> | For VMware and bare metal user clusters, users will be granted the cluster-admin role on the cluster, which provides full administrative access to the cluster. For bare metal admin clusters, users will be granted the cluster-view role, which limits users to read-only access. |

### `BareMetalAdminApiServerArgument`

- BareMetalAdminApiServerArgument represents an arg name->value pair. Only a subset of customized flags are supported. Please refer to the API server documentation below to know the exact format: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `argument` | string | Required. The argument name as it appears on the API Server command line please make sure to remove the leading dashes. |
| `value` | string | Required. The value of the arg as it will be passed to the API Server command line. |

### `BareMetalAdminBgpLbConfig`

- BareMetalAdminBgpLbConfig represents configuration parameters for a Border Gateway Protocol (BGP) load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addressPools` | array<BareMetalAdminLoadBalancerAddressPool> | Required. AddressPools is a list of non-overlapping IP pools used by load balancer typed services. All addresses must be routable to load balancer nodes. IngressVIP must be included in the pools. |
| `asn` | string (int64) | Required. BGP autonomous system number (ASN) of the cluster. This field can be updated after cluster creation. |
| `bgpPeerConfigs` | array<BareMetalAdminBgpPeerConfig> | Required. The list of BGP peers that the cluster will connect to. At least one peer must be configured for each control plane node. Control plane nodes will connect to these peers to advertise the control plane VIP. The Services load balancer also uses these peers by default. This field can be updated after cluster creation. |
| `loadBalancerNodePoolConfig` | BareMetalAdminLoadBalancerNodePoolConfig | Specifies the node pool running data plane load balancing. L2 connectivity is required among nodes in this pool. If missing, the control plane node pool is used for data plane load balancing. |

### `BareMetalAdminBgpPeerConfig`

- BareMetalAdminBgpPeerConfig represents configuration parameters for a Border Gateway Protocol (BGP) peer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asn` | string (int64) | Required. BGP autonomous system number (ASN) for the network that contains the external peer device. |
| `controlPlaneNodes` | array<string> | The IP address of the control plane node that connects to the external peer. If you don't specify any control plane nodes, all control plane nodes can connect to the external peer. If you specify one or more IP addresses, only the nodes specified participate in peering sessions. |
| `ipAddress` | string | Required. The IP address of the external peer device. |

### `BareMetalAdminCluster`

- Resource that represents a bare metal admin cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Annotations on the bare metal admin cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (\_), dots (.), and alphanumerics between. |
| `bareMetalVersion` | string | The Anthos clusters on bare metal version for the bare metal admin cluster. |
| `binaryAuthorization` | BinaryAuthorization | Binary Authorization related configurations. |
| `clusterOperations` | BareMetalAdminClusterOperationsConfig | Cluster operations configuration. |
| `controlPlane` | BareMetalAdminControlPlaneConfig | Control plane configuration. |
| `createTime` | string (google-datetime) | Output only. The time at which this bare metal admin cluster was created. |
| `deleteTime` | string (google-datetime) | Output only. The time at which this bare metal admin cluster was deleted. If the resource is not deleted, this must be empty |
| `description` | string | A human readable description of this bare metal admin cluster. |
| `endpoint` | string | Output only. The IP address name of bare metal admin cluster's API server. |
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. Allows clients to perform consistent read-modify-writes through optimistic concurrency control. |
| `fleet` | Fleet | Output only. Fleet configuration for the cluster. |
| `loadBalancer` | BareMetalAdminLoadBalancerConfig | Load balancer configuration. |
| `localName` | string | Output only. The object name of the bare metal cluster custom resource. This field is used to support conflicting names when enrolling existing clusters to the API. When used as a part of cluster enrollment, this field will differ from the ID in the resource name. For new clusters, this field will match the user provided cluster name and be visible in the last component of the resource name. It is not modifiable. All users should use this name to access their cluster using gkectl or kubectl and should expect to see the local name when viewing admin cluster controller logs. |
| `maintenanceConfig` | BareMetalAdminMaintenanceConfig | Maintenance configuration. |
| `maintenanceStatus` | BareMetalAdminMaintenanceStatus | Output only. MaintenanceStatus representing state of maintenance. |
| `name` | string | Immutable. The bare metal admin cluster resource name. |
| `networkConfig` | BareMetalAdminNetworkConfig | Network configuration. |
| `nodeAccessConfig` | BareMetalAdminNodeAccessConfig | Node access related configurations. |
| `nodeConfig` | BareMetalAdminWorkloadNodeConfig | Workload node configuration. |
| `osEnvironmentConfig` | BareMetalAdminOsEnvironmentConfig | OS environment related configurations. |
| `proxy` | BareMetalAdminProxyConfig | Proxy configuration. |
| `reconciling` | boolean | Output only. If set, there are currently changes in flight to the bare metal Admin Cluster. |
| `securityConfig` | BareMetalAdminSecurityConfig | Security related configuration. |
| `state` | string enum | Output only. The current state of the bare metal admin cluster. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `RUNNING`, `RECONCILING`, `STOPPING`, `ERROR`, `DEGRADED`. |
| `status` | ResourceStatus | Output only. ResourceStatus representing detailed cluster status. |
| `storage` | BareMetalAdminStorageConfig | Storage configuration. |
| `uid` | string | Output only. The unique identifier of the bare metal admin cluster. |
| `updateTime` | string (google-datetime) | Output only. The time at which this bare metal admin cluster was last updated. |
| `validationCheck` | ValidationCheck | Output only. ValidationCheck representing the result of the preflight check. |

### `BareMetalAdminClusterOperationsConfig`

- BareMetalAdminClusterOperationsConfig specifies the admin cluster's observability infrastructure.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableApplicationLogs` | boolean | Whether collection of application logs/metrics should be enabled (in addition to system logs/metrics). |

### `BareMetalAdminControlPlaneConfig`

- BareMetalAdminControlPlaneConfig specifies the control plane configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiServerArgs` | array<BareMetalAdminApiServerArgument> | Customizes the default API server args. Only a subset of customized flags are supported. Please refer to the API server documentation below to know the exact format: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/ |
| `controlPlaneNodePoolConfig` | BareMetalAdminControlPlaneNodePoolConfig | Required. Configures the node pool running the control plane. If specified the corresponding NodePool will be created for the cluster's control plane. The NodePool will have the same name and namespace as the cluster. |

### `BareMetalAdminControlPlaneNodePoolConfig`

- BareMetalAdminControlPlaneNodePoolConfig specifies the control plane node pool configuration. We have a control plane specific node pool config so that we can flexible about supporting control plane specific fields in the future.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodePoolConfig` | BareMetalNodePoolConfig | Required. The generic configuration for a node pool running the control plane. |

### `BareMetalAdminDrainedMachine`

- BareMetalAdminDrainedMachine represents the machines that are drained.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodeIp` | string | Drained machine IP address. |

### `BareMetalAdminDrainingMachine`

- BareMetalAdminDrainingMachine represents the machines that are currently draining.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodeIp` | string | Draining machine IP address. |
| `podCount` | integer (int32) | The count of pods yet to drain. |

### `BareMetalAdminIslandModeCidrConfig`

- BareMetalAdminIslandModeCidrConfig specifies the cluster CIDR configuration while running in island mode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `podAddressCidrBlocks` | array<string> | Required. All pods in the cluster are assigned an RFC1918 IPv4 address from these ranges. This field cannot be changed after creation. |
| `serviceAddressCidrBlocks` | array<string> | Required. All services in the cluster are assigned an RFC1918 IPv4 address from these ranges. This field cannot be changed after creation. |

### `BareMetalAdminLoadBalancerAddressPool`

- Represents an IP pool used by the load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addresses` | array<string> | Required. The addresses that are part of this pool. Each address must be either in the CIDR form (1.2.3.0/24) or range form (1.2.3.1-1.2.3.5). |
| `avoidBuggyIps` | boolean | If true, avoid using IPs ending in .0 or .255. This avoids buggy consumer devices mistakenly dropping IPv4 traffic for those special IP addresses. |
| `manualAssign` | boolean | If true, prevent IP addresses from being automatically assigned. |
| `pool` | string | Required. The name of the address pool. |

### `BareMetalAdminLoadBalancerConfig`

- BareMetalAdminLoadBalancerConfig specifies the load balancer configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bgpLbConfig` | BareMetalAdminBgpLbConfig | Configuration for BGP typed load balancers. |
| `manualLbConfig` | BareMetalAdminManualLbConfig | Manually configured load balancers. |
| `portConfig` | BareMetalAdminPortConfig | Configures the ports that the load balancer will listen on. |
| `vipConfig` | BareMetalAdminVipConfig | The VIPs used by the load balancer. |

### `BareMetalAdminLoadBalancerNodePoolConfig`

- Specifies the load balancer's node pool configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodePoolConfig` | BareMetalNodePoolConfig | The generic configuration for a node pool running a load balancer. |

### `BareMetalAdminMachineDrainStatus`

- BareMetalAdminMachineDrainStatus represents the status of bare metal node machines that are undergoing drain operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `drainedMachines` | array<BareMetalAdminDrainedMachine> | The list of drained machines. |
| `drainingMachines` | array<BareMetalAdminDrainingMachine> | The list of draning machines. |

### `BareMetalAdminMaintenanceConfig`

- BareMetalAdminMaintenanceConfig specifies configurations to put bare metal Admin cluster CRs nodes in and out of maintenance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maintenanceAddressCidrBlocks` | array<string> | Required. All IPv4 address from these ranges will be placed into maintenance mode. Nodes in maintenance mode will be cordoned and drained. When both of these are true, the "baremetal.cluster.gke.io/maintenance" annotation will be set on the node resource. |

### `BareMetalAdminMaintenanceStatus`

- BareMetalAdminMaintenanceStatus represents the maintenance status for bare metal Admin cluster CR's nodes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `machineDrainStatus` | BareMetalAdminMachineDrainStatus | Represents the status of draining and drained machine nodes. This is used to show the progress of cluster upgrade. |

### `BareMetalAdminManualLbConfig`

- BareMetalAdminManualLbConfig represents configuration parameters for a manual load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether manual load balancing is enabled. |

### `BareMetalAdminMultipleNetworkInterfacesConfig`

- Specifies the multiple networking interfaces cluster configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether to enable multiple network interfaces for your pods. When set network_config.advanced_networking is automatically set to true. |

### `BareMetalAdminNetworkConfig`

- BareMetalAdminNetworkConfig specifies the cluster network configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advancedNetworking` | boolean | Enables the use of advanced Anthos networking features, such as Bundled Load Balancing with BGP or the egress NAT gateway. Setting configuration for advanced networking features will automatically set this flag. |
| `islandModeCidr` | BareMetalAdminIslandModeCidrConfig | Configuration for Island mode CIDR. |
| `multipleNetworkInterfacesConfig` | BareMetalAdminMultipleNetworkInterfacesConfig | Configuration for multiple network interfaces. |

### `BareMetalAdminNodeAccessConfig`

- Specifies the node access related settings for the bare metal admin cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `loginUser` | string | Required. LoginUser is the user name used to access node machines. It defaults to "root" if not set. |

### `BareMetalAdminOsEnvironmentConfig`

- Specifies operating system operation settings for cluster provisioning.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `packageRepoExcluded` | boolean | Whether the package repo should be added when initializing bare metal machines. |

### `BareMetalAdminPortConfig`

- BareMetalAdminPortConfig is the specification of load balancer ports.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlPlaneLoadBalancerPort` | integer (int32) | The port that control plane hosted load balancers will listen on. |

### `BareMetalAdminProxyConfig`

- BareMetalAdminProxyConfig specifies the cluster proxy configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `noProxy` | array<string> | A list of IPs, hostnames, and domains that should skip the proxy. Examples: \["127.0.0.1", "example.com", ".corp", "localhost"\]. |
| `uri` | string | Required. Specifies the address of your proxy server. Examples: `http://domain` WARNING: Do not provide credentials in the format `http://(username:password@)domain` these will be rejected by the server. |

### `BareMetalAdminSecurityConfig`

- Specifies the security related settings for the bare metal admin cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorization` | Authorization | Configures user access to the admin cluster. |

### `BareMetalAdminStorageConfig`

- BareMetalAdminStorageConfig specifies the cluster storage configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lvpNodeMountsConfig` | BareMetalLvpConfig | Required. Specifies the config for local PersistentVolumes backed by mounted node disks. These disks need to be formatted and mounted by the user, which can be done before or after cluster creation. |
| `lvpShareConfig` | BareMetalLvpShareConfig | Required. Specifies the config for local PersistentVolumes backed by subdirectories in a shared filesystem. These subdirectores are automatically created during cluster creation. |

### `BareMetalAdminVipConfig`

- BareMetalAdminVipConfig for bare metal load balancer configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlPlaneVip` | string | The VIP which you previously set aside for the Kubernetes API of this bare metal admin cluster. |

### `BareMetalAdminWorkloadNodeConfig`

- BareMetalAdminWorkloadNodeConfig specifies the workload node configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxPodsPerNode` | string (int64) | The maximum number of pods a node can run. The size of the CIDR range assigned to the node will be derived from this parameter. By default 110 Pods are created per Node. Upper bound is 250 for both HA and non-HA admin cluster. Lower bound is 64 for non-HA admin cluster and 32 for HA admin cluster. |

### `BareMetalApiServerArgument`

- Represents an arg name->value pair. Only a subset of customized flags are supported. For the exact format, refer to the API server documentation (https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `argument` | string | Required. The argument name as it appears on the API Server command line, make sure to remove the leading dashes. |
| `value` | string | Required. The value of the arg as it will be passed to the API Server command line. |

### `BareMetalBgpLbConfig`

- BareMetalBgpLbConfig represents configuration parameters for a Border Gateway Protocol (BGP) load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addressPools` | array<BareMetalLoadBalancerAddressPool> | Required. AddressPools is a list of non-overlapping IP pools used by load balancer typed services. All addresses must be routable to load balancer nodes. IngressVIP must be included in the pools. |
| `asn` | string (int64) | Required. BGP autonomous system number (ASN) of the cluster. This field can be updated after cluster creation. |
| `bgpPeerConfigs` | array<BareMetalBgpPeerConfig> | Required. The list of BGP peers that the cluster will connect to. At least one peer must be configured for each control plane node. Control plane nodes will connect to these peers to advertise the control plane VIP. The Services load balancer also uses these peers by default. This field can be updated after cluster creation. |
| `loadBalancerNodePoolConfig` | BareMetalLoadBalancerNodePoolConfig | Specifies the node pool running data plane load balancing. L2 connectivity is required among nodes in this pool. If missing, the control plane node pool is used for data plane load balancing. |

### `BareMetalBgpPeerConfig`

- BareMetalBgpPeerConfig represents configuration parameters for a Border Gateway Protocol (BGP) peer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asn` | string (int64) | Required. BGP autonomous system number (ASN) for the network that contains the external peer device. |
| `controlPlaneNodes` | array<string> | The IP address of the control plane node that connects to the external peer. If you don't specify any control plane nodes, all control plane nodes can connect to the external peer. If you specify one or more IP addresses, only the nodes specified participate in peering sessions. |
| `ipAddress` | string | Required. The IP address of the external peer device. |

### `BareMetalCluster`

- Resource that represents a bare metal user cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminClusterMembership` | string | Required. The admin cluster this bare metal user cluster belongs to. This is the full resource name of the admin cluster's fleet membership. |
| `adminClusterName` | string | Output only. The resource name of the bare metal admin cluster managing this user cluster. |
| `annotations` | object | Annotations on the bare metal user cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (\_), dots (.), and alphanumerics between. |
| `bareMetalVersion` | string | Required. The Anthos clusters on bare metal version for your user cluster. |
| `binaryAuthorization` | BinaryAuthorization | Binary Authorization related configurations. |
| `clusterOperations` | BareMetalClusterOperationsConfig | Cluster operations configuration. |
| `controlPlane` | BareMetalControlPlaneConfig | Required. Control plane configuration. |
| `createTime` | string (google-datetime) | Output only. The time when the bare metal user cluster was created. |
| `deleteTime` | string (google-datetime) | Output only. The time when the bare metal user cluster was deleted. If the resource is not deleted, this must be empty |
| `description` | string | A human readable description of this bare metal user cluster. |
| `endpoint` | string | Output only. The IP address of the bare metal user cluster's API server. |
| `etag` | string | Output only. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. Allows clients to perform consistent read-modify-writes through optimistic concurrency control. |
| `fleet` | Fleet | Output only. Fleet configuration for the cluster. |
| `loadBalancer` | BareMetalLoadBalancerConfig | Required. Load balancer configuration. |
| `localName` | string | Output only. The object name of the bare metal user cluster custom resource on the associated admin cluster. This field is used to support conflicting names when enrolling existing clusters to the API. When used as a part of cluster enrollment, this field will differ from the name in the resource name. For new clusters, this field will match the user provided cluster name and be visible in the last component of the resource name. It is not modifiable. When the local name and cluster name differ, the local name is used in the admin cluster controller logs. You use the cluster name when accessing the cluster using bmctl and kubectl. |
| `localNamespace` | string | Output only. The namespace of the cluster. |
| `maintenanceConfig` | BareMetalMaintenanceConfig | Maintenance configuration. |
| `maintenanceStatus` | BareMetalMaintenanceStatus | Output only. Status of on-going maintenance tasks. |
| `name` | string | Immutable. The bare metal user cluster resource name. |
| `networkConfig` | BareMetalNetworkConfig | Required. Network configuration. |
| `nodeAccessConfig` | BareMetalNodeAccessConfig | Node access related configurations. |
| `nodeConfig` | BareMetalWorkloadNodeConfig | Workload node configuration. |
| `osEnvironmentConfig` | BareMetalOsEnvironmentConfig | OS environment related configurations. |
| `proxy` | BareMetalProxyConfig | Proxy configuration. |
| `reconciling` | boolean | Output only. If set, there are currently changes in flight to the bare metal user cluster. |
| `securityConfig` | BareMetalSecurityConfig | Security related setting configuration. |
| `state` | string enum | Output only. The current state of the bare metal user cluster. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `RUNNING`, `RECONCILING`, `STOPPING`, `ERROR`, `DEGRADED`. |
| `status` | ResourceStatus | Output only. Detailed cluster status. |
| `storage` | BareMetalStorageConfig | Required. Storage configuration. |
| `uid` | string | Output only. The unique identifier of the bare metal user cluster. |
| `updateTime` | string (google-datetime) | Output only. The time when the bare metal user cluster was last updated. |
| `upgradePolicy` | BareMetalClusterUpgradePolicy | The cluster upgrade policy. |
| `validationCheck` | ValidationCheck | Output only. The result of the preflight check. |

### `BareMetalClusterOperationsConfig`

- Specifies the bare metal user cluster's observability infrastructure.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableApplicationLogs` | boolean | Whether collection of application logs/metrics should be enabled (in addition to system logs/metrics). |

### `BareMetalClusterUpgradePolicy`

- BareMetalClusterUpgradePolicy defines the cluster upgrade policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pause` | boolean | Output only. Pause is used to show the upgrade pause status. It's view only for now. |
| `policy` | string enum | Specifies which upgrade policy to use. Values: `NODE_POOL_POLICY_UNSPECIFIED`, `SERIAL`, `CONCURRENT`. |

### `BareMetalControlPlaneConfig`

- Specifies the control plane configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiServerArgs` | array<BareMetalApiServerArgument> | Customizes the default API server args. Only a subset of customized flags are supported. For the exact format, refer to the API server documentation (https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/). |
| `controlPlaneNodePoolConfig` | BareMetalControlPlaneNodePoolConfig | Required. Configures the node pool running the control plane. |

### `BareMetalControlPlaneNodePoolConfig`

- Specifies the control plane node pool configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodePoolConfig` | BareMetalNodePoolConfig | Required. The generic configuration for a node pool running the control plane. |

### `BareMetalDrainedMachine`

- Represents a machine that is currently drained.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodeIp` | string | Drained machine IP address. |

### `BareMetalDrainingMachine`

- Represents a machine that is currently draining.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodeIp` | string | Draining machine IP address. |
| `podCount` | integer (int32) | The count of pods yet to drain. |

### `BareMetalIslandModeCidrConfig`

- Specifies the cluster CIDR configuration while running in island mode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `podAddressCidrBlocks` | array<string> | Required. All pods in the cluster are assigned an RFC1918 IPv4 address from these ranges. This field cannot be changed after creation. |
| `serviceAddressCidrBlocks` | array<string> | Required. All services in the cluster are assigned an RFC1918 IPv4 address from these ranges. This field is mutable after creation starting with version 1.15. |

### `BareMetalKubeletConfig`

- KubeletConfig defines the modifiable kubelet configurations for bare metal machines. Note: this list includes fields supported in GKE (see https://cloud.google.com/kubernetes-engine/docs/how-to/node-system-config#kubelet-options).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `registryBurst` | integer (int32) | The maximum size of bursty pulls, temporarily allows pulls to burst to this number, while still not exceeding registry_pull_qps. The value must not be a negative number. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 10. |
| `registryPullQps` | integer (int32) | The limit of registry pulls per second. Setting this value to 0 means no limit. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 5. |
| `serializeImagePullsDisabled` | boolean | Prevents the Kubelet from pulling multiple images at a time. We recommend \*not\* changing the default value on nodes that run docker daemon with version < 1.9 or an Another Union File System (Aufs) storage backend. Issue https://github.com/kubernetes/kubernetes/issues/10959 has more details. |

### `BareMetalLoadBalancerAddressPool`

- Represents an IP pool used by the load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addresses` | array<string> | Required. The addresses that are part of this pool. Each address must be either in the CIDR form (1.2.3.0/24) or range form (1.2.3.1-1.2.3.5). |
| `avoidBuggyIps` | boolean | If true, avoid using IPs ending in .0 or .255. This avoids buggy consumer devices mistakenly dropping IPv4 traffic for those special IP addresses. |
| `manualAssign` | boolean | If true, prevent IP addresses from being automatically assigned. |
| `pool` | string | Required. The name of the address pool. |

### `BareMetalLoadBalancerConfig`

- Specifies the load balancer configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bgpLbConfig` | BareMetalBgpLbConfig | Configuration for BGP typed load balancers. When set network_config.advanced_networking is automatically set to true. |
| `manualLbConfig` | BareMetalManualLbConfig | Manually configured load balancers. |
| `metalLbConfig` | BareMetalMetalLbConfig | Configuration for MetalLB load balancers. |
| `portConfig` | BareMetalPortConfig | Configures the ports that the load balancer will listen on. |
| `vipConfig` | BareMetalVipConfig | The VIPs used by the load balancer. |

### `BareMetalLoadBalancerNodePoolConfig`

- Specifies the load balancer's node pool configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodePoolConfig` | BareMetalNodePoolConfig | The generic configuration for a node pool running a load balancer. |

### `BareMetalLvpConfig`

- Specifies the configs for local persistent volumes (PVs).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | Required. The host machine path. |
| `storageClass` | string | Required. The StorageClass name that PVs will be created with. |

### `BareMetalLvpShareConfig`

- Specifies the configs for local persistent volumes under a shared file system.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lvpConfig` | BareMetalLvpConfig | Required. Defines the machine path and storage class for the LVP Share. |
| `sharedPathPvCount` | integer (int32) | The number of subdirectories to create under path. |

### `BareMetalMachineDrainStatus`

- Represents the status of node machines that are undergoing drain operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `drainedMachines` | array<BareMetalDrainedMachine> | The list of drained machines. |
| `drainingMachines` | array<BareMetalDrainingMachine> | The list of draning machines. |

### `BareMetalMaintenanceConfig`

- Specifies configurations to put bare metal nodes in and out of maintenance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maintenanceAddressCidrBlocks` | array<string> | Required. All IPv4 address from these ranges will be placed into maintenance mode. Nodes in maintenance mode will be cordoned and drained. When both of these are true, the "baremetal.cluster.gke.io/maintenance" annotation will be set on the node resource. |

### `BareMetalMaintenanceStatus`

- Represents the maintenance status of the bare metal user cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `machineDrainStatus` | BareMetalMachineDrainStatus | The maintenance status of node machines. |

### `BareMetalManualLbConfig`

- Represents configuration parameters for a manual load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether manual load balancing is enabled. |

### `BareMetalMetalLbConfig`

- Represents configuration parameters for a MetalLB load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addressPools` | array<BareMetalLoadBalancerAddressPool> | Required. AddressPools is a list of non-overlapping IP pools used by load balancer typed services. All addresses must be routable to load balancer nodes. IngressVIP must be included in the pools. |
| `loadBalancerNodePoolConfig` | BareMetalLoadBalancerNodePoolConfig | Specifies the node pool running the load balancer. L2 connectivity is required among nodes in this pool. If missing, the control plane node pool is used as the load balancer pool. |

### `BareMetalMultipleNetworkInterfacesConfig`

- Specifies the multiple networking interfaces cluster configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether to enable multiple network interfaces for your pods. When set network_config.advanced_networking is automatically set to true. |

### `BareMetalNetworkConfig`

- Specifies the cluster network configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advancedNetworking` | boolean | Enables the use of advanced Anthos networking features, such as Bundled Load Balancing with BGP or the egress NAT gateway. Setting configuration for advanced networking features will automatically set this flag. |
| `islandModeCidr` | BareMetalIslandModeCidrConfig | Configuration for island mode CIDR. In an island-mode network, nodes have unique IP addresses, but pods don't have unique addresses across clusters. This doesn't cause problems because pods in one cluster never directly communicate with pods in another cluster. Instead, there are gateways that mediate between a pod in one cluster and a pod in another cluster. |
| `multipleNetworkInterfacesConfig` | BareMetalMultipleNetworkInterfacesConfig | Configuration for multiple network interfaces. |
| `srIovConfig` | BareMetalSrIovConfig | Configuration for SR-IOV. |

### `BareMetalNodeAccessConfig`

- Specifies the node access related settings for the bare metal user cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `loginUser` | string | LoginUser is the user name used to access node machines. It defaults to "root" if not set. |

### `BareMetalNodeConfig`

- BareMetalNodeConfig lists machine addresses to access Nodes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labels` | object | The labels assigned to this node. An object containing a list of key/value pairs. The labels here, unioned with the labels set on BareMetalNodePoolConfig are the set of labels that will be applied to the node. If there are any conflicts, the BareMetalNodeConfig labels take precedence. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }. |
| `nodeIp` | string | The default IPv4 address for SSH access and Kubernetes node. Example: 192.168.0.1 |

### `BareMetalNodePool`

- Resource that represents a bare metal node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Annotations on the bare metal node pool. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (\_), dots (.), and alphanumerics between. |
| `createTime` | string (google-datetime) | Output only. The time at which this bare metal node pool was created. |
| `deleteTime` | string (google-datetime) | Output only. The time at which this bare metal node pool was deleted. If the resource is not deleted, this must be empty |
| `displayName` | string | The display name for the bare metal node pool. |
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. Allows clients to perform consistent read-modify-writes through optimistic concurrency control. |
| `name` | string | Immutable. The bare metal node pool resource name. |
| `nodePoolConfig` | BareMetalNodePoolConfig | Required. Node pool configuration. |
| `reconciling` | boolean | Output only. If set, there are currently changes in flight to the bare metal node pool. |
| `state` | string enum | Output only. The current state of the bare metal node pool. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `RUNNING`, `RECONCILING`, `STOPPING`, `ERROR`, `DEGRADED`. |
| `status` | ResourceStatus | Output only. ResourceStatus representing the detailed node pool status. |
| `uid` | string | Output only. The unique identifier of the bare metal node pool. |
| `updateTime` | string (google-datetime) | Output only. The time at which this bare metal node pool was last updated. |
| `upgradePolicy` | BareMetalNodePoolUpgradePolicy | The worker node pool upgrade policy. |

### `BareMetalNodePoolConfig`

- BareMetalNodePoolConfig describes the configuration of all nodes within a given bare metal node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kubeletConfig` | BareMetalKubeletConfig | The modifiable kubelet configurations for the bare metal machines. |
| `labels` | object | The labels assigned to nodes of this node pool. An object containing a list of key/value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }. |
| `nodeConfigs` | array<BareMetalNodeConfig> | Required. The list of machine addresses in the bare metal node pool. |
| `operatingSystem` | string enum | Specifies the nodes operating system (default: LINUX). Values: `OPERATING_SYSTEM_UNSPECIFIED`, `LINUX`. |
| `taints` | array<NodeTaint> | The initial taints assigned to nodes of this node pool. |

### `BareMetalNodePoolUpgradePolicy`

- BareMetalNodePoolUpgradePolicy defines the node pool upgrade policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parallelUpgradeConfig` | BareMetalParallelUpgradeConfig | The parallel upgrade settings for worker node pools. |

### `BareMetalOsEnvironmentConfig`

- Specifies operating system settings for cluster provisioning.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `packageRepoExcluded` | boolean | Whether the package repo should not be included when initializing bare metal machines. |

### `BareMetalParallelUpgradeConfig`

- BareMetalParallelUpgradeConfig defines the parallel upgrade settings for worker node pools.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `concurrentNodes` | integer (int32) | The maximum number of nodes that can be upgraded at once. |
| `minimumAvailableNodes` | integer (int32) | The minimum number of nodes that should be healthy and available during an upgrade. If set to the default value of 0, it is possible that none of the nodes will be available during an upgrade. |

### `BareMetalPortConfig`

- Specifies load balancer ports for the bare metal user cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlPlaneLoadBalancerPort` | integer (int32) | The port that control plane hosted load balancers will listen on. |

### `BareMetalProxyConfig`

- Specifies the cluster proxy configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `noProxy` | array<string> | A list of IPs, hostnames, and domains that should skip the proxy. Examples: \["127.0.0.1", "example.com", ".corp", "localhost"\]. |
| `uri` | string | Required. Specifies the address of your proxy server. Examples: `http://domain` Do not provide credentials in the format `http://(username:password@)domain` these will be rejected by the server. |

### `BareMetalSecurityConfig`

- Specifies the security related settings for the bare metal user cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorization` | Authorization | Configures user access to the user cluster. |

### `BareMetalSrIovConfig`

- Specifies the SR-IOV networking operator config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether to install the SR-IOV operator. |

### `BareMetalStorageConfig`

- BareMetalStorageConfig specifies the cluster storage configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lvpNodeMountsConfig` | BareMetalLvpConfig | Required. Specifies the config for local PersistentVolumes backed by mounted node disks. These disks need to be formatted and mounted by the user, which can be done before or after cluster creation. |
| `lvpShareConfig` | BareMetalLvpShareConfig | Required. Specifies the config for local PersistentVolumes backed by subdirectories in a shared filesystem. These subdirectores are automatically created during cluster creation. |

### `BareMetalVersionInfo`

- Contains information about a specific Anthos on bare metal version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dependencies` | array<UpgradeDependency> | The list of upgrade dependencies for this version. |
| `hasDependencies` | boolean | If set, the cluster dependencies (e.g. the admin cluster, other user clusters managed by the same admin cluster, version skew policy, etc) must be upgraded before this version can be installed or upgraded to. |
| `version` | string | Version number e.g. 1.13.1. |

### `BareMetalVipConfig`

- Specifies the VIP config for the bare metal load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlPlaneVip` | string | The VIP which you previously set aside for the Kubernetes API of this bare metal user cluster. |
| `ingressVip` | string | The VIP which you previously set aside for ingress traffic into this bare metal user cluster. |

### `BareMetalWorkloadNodeConfig`

- Specifies the workload node configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `containerRuntime` | string enum | Specifies which container runtime will be used. Values: `CONTAINER_RUNTIME_UNSPECIFIED`, `CONTAINERD`. |
| `maxPodsPerNode` | string (int64) | The maximum number of pods a node can run. The size of the CIDR range assigned to the node will be derived from this parameter. |

### `BinaryAuthorization`

- Configuration for Binary Authorization.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `evaluationMode` | string enum | Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED. Values: `EVALUATION_MODE_UNSPECIFIED`, `DISABLED`, `PROJECT_SINGLETON_POLICY_ENFORCE`. |

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

### `ClusterUser`

- ClusterUser configures user principals for an RBAC policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `username` | string | Required. The name of the user, e.g. `my-gcp-id@gmail.com`. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EnrollBareMetalAdminClusterRequest`

- Message for enrolling an existing bare metal admin cluster to the GKE on-prem API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bareMetalAdminClusterId` | string | User provided OnePlatform identifier that is used as part of the resource name. This must be unique among all GKE on-prem clusters within a project and location and will return a 409 if the cluster already exists. (https://tools.ietf.org/html/rfc1123) format. |
| `membership` | string | Required. This is the full resource name of this admin cluster's fleet membership. |

### `EnrollBareMetalClusterRequest`

- Message for enrolling an existing bare metal cluster to the Anthos On-Prem API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminClusterMembership` | string | Required. The admin cluster this bare metal user cluster belongs to. This is the full resource name of the admin cluster's fleet membership. In the future, references to other resource types might be allowed if admin clusters are modeled as their own resources. |
| `bareMetalClusterId` | string | User provided OnePlatform identifier that is used as part of the resource name. This must be unique among all bare metal clusters within a project and location and will return a 409 if the cluster already exists. (https://tools.ietf.org/html/rfc1123) format. |
| `localName` | string | Optional. The object name of the bare metal cluster custom resource on the associated admin cluster. This field is used to support conflicting resource names when enrolling existing clusters to the API. When not provided, this field will resolve to the bare_metal_cluster_id. Otherwise, it must match the object name of the bare metal cluster custom resource. It is not modifiable outside / beyond the enrollment operation. |
| `localNamespace` | string | Optional. The namespace of the cluster. |

### `EnrollBareMetalNodePoolRequest`

- Message for enrolling an existing bare metal node pool to the GKE on-prem API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bareMetalNodePoolId` | string | User provided OnePlatform identifier that is used as part of the resource name. (https://tools.ietf.org/html/rfc1123) format. |
| `validateOnly` | boolean | If set, only validate the request, but do not actually enroll the node pool. |

### `EnrollVmwareAdminClusterRequest`

- Message for enrolling an existing VMware admin cluster to the GKE on-prem API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `membership` | string | Required. This is the full resource name of this admin cluster's fleet membership. |
| `vmwareAdminClusterId` | string | User provided OnePlatform identifier that is used as part of the resource name. This must be unique among all GKE on-prem clusters within a project and location and will return a 409 if the cluster already exists. (https://tools.ietf.org/html/rfc1123) format. |

### `EnrollVmwareClusterRequest`

- Message for enrolling an existing VMware cluster to the Anthos On-Prem API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminClusterMembership` | string | Required. The admin cluster this VMware user cluster belongs to. This is the full resource name of the admin cluster's fleet membership. In the future, references to other resource types might be allowed if admin clusters are modeled as their own resources. |
| `localName` | string | Optional. The object name of the VMware OnPremUserCluster custom resource on the associated admin cluster. This field is used to support conflicting resource names when enrolling existing clusters to the API. When not provided, this field will resolve to the vmware_cluster_id. Otherwise, it must match the object name of the VMware OnPremUserCluster custom resource. It is not modifiable outside / beyond the enrollment operation. |
| `validateOnly` | boolean | Validate the request without actually doing any updates. |
| `vmwareClusterId` | string | User provided OnePlatform identifier that is used as part of the resource name. This must be unique among all GKE on-prem clusters within a project and location and will return a 409 if the cluster already exists. (https://tools.ietf.org/html/rfc1123) format. |

### `EnrollVmwareNodePoolRequest`

- Message for enrolling a VMware node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `vmwareNodePoolId` | string | The target node pool id to be enrolled. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `Fleet`

- Fleet related configuration. Fleets are a Google Cloud concept for logically organizing clusters, letting you use and manage multi-cluster capabilities and apply consistent policies across your systems. See \[Anthos Fleets\](`https://cloud.google.com/anthos/multicluster-management/fleets`) for more details on Anthos multi-cluster capabilities using Fleets. ##
- Version: v1

| Field | Type | Description |
|---|---|---|
| `membership` | string | Output only. The name of the managed fleet Membership resource associated to this cluster. Membership names are formatted as `projects//locations//memberships/`. |

### `ListBareMetalAdminClustersResponse`

- Response message for listing bare metal admin clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bareMetalAdminClusters` | array<BareMetalAdminCluster> | The list of bare metal admin cluster. |
| `nextPageToken` | string | A token identifying a page of results the server should return. If the token is not empty this means that more results are available and should be retrieved by repeating the request with the provided page token. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBareMetalClustersResponse`

- Response message for listing bare metal Clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bareMetalClusters` | array<BareMetalCluster> | The list of bare metal Clusters. |
| `nextPageToken` | string | A token identifying a page of results the server should return. If the token is not empty this means that more results are available and should be retrieved by repeating the request with the provided page token. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListBareMetalNodePoolsResponse`

- Response message for listing bare metal node pools.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bareMetalNodePools` | array<BareMetalNodePool> | The node pools from the specified parent resource. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

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

### `ListVmwareAdminClustersResponse`

- Response message for listing VMware admin clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. If the token is not empty this means that more results are available and should be retrieved by repeating the request with the provided page token. |
| `unreachable` | array<string> | Locations that could not be reached. |
| `vmwareAdminClusters` | array<VmwareAdminCluster> | The list of VMware admin cluster. |

### `ListVmwareClustersResponse`

- Response message for listing VMware Clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. If the token is not empty this means that more results are available and should be retrieved by repeating the request with the provided page token. |
| `unreachable` | array<string> | Locations that could not be reached. |
| `vmwareClusters` | array<VmwareCluster> | The list of VMware Cluster. |

### `ListVmwareNodePoolsResponse`

- Response message for listing VMware node pools.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |
| `vmwareNodePools` | array<VmwareNodePool> | The node pools from the specified parent resource. |

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

### `Metric`

- Progress metric is (string, int|float|string) pair.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `doubleValue` | number (double) | For metrics with floating point value. |
| `intValue` | string (int64) | For metrics with integer value. |
| `metric` | string enum | Required. The metric name. Values: `METRIC_ID_UNSPECIFIED`, `NODES_TOTAL`, `NODES_DRAINING`, `NODES_UPGRADING`, `NODES_PENDING_UPGRADE`, `NODES_UPGRADED`, `NODES_FAILED`, `NODES_HEALTHY`, `NODES_RECONCILING`, `NODES_IN_MAINTENANCE`, `PREFLIGHTS_COMPLETED`, `PREFLIGHTS_RUNNING`, `PREFLIGHTS_FAILED`, `PREFLIGHTS_TOTAL`. |
| `stringValue` | string | For metrics with custom values (ratios, visual progress, etc.). |

### `NodeTaint`

- NodeTaint applied to every Kubernetes node in a node pool. Kubernetes taints can be used together with tolerations to control how workloads are scheduled to your nodes. Node taints are permanent.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `effect` | string enum | The taint effect. Values: `EFFECT_UNSPECIFIED`, `NO_SCHEDULE`, `PREFER_NO_SCHEDULE`, `NO_EXECUTE`. |
| `key` | string | Key associated with the effect. |
| `value` | string | Value associated with the effect. |

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
| `controlPlaneDisconnected` | boolean | Output only. Denotes if the local managing cluster's control plane is currently disconnected. This is expected to occur temporarily during self-managed cluster upgrades. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `progress` | OperationProgress | Output only. Detailed progress information for the operation. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have \[Operation.error\] value with a \[google.rpc.Status.code\] of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `type` | string enum | Output only. Type of operation being executed. Values: `OPERATION_TYPE_UNSPECIFIED`, `CREATE`, `DELETE`, `UPDATE`, `UPGRADE`, `PLATFORM_UPGRADE`. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `OperationProgress`

- Information about operation progress.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `stages` | array<OperationStage> | The stages of the operation. |

### `OperationStage`

- Information about a particular stage of an operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Time the stage ended. |
| `metrics` | array<Metric> | Progress metric bundle. |
| `stage` | string enum | The high-level stage of the operation. Values: `STAGE_UNSPECIFIED`, `PREFLIGHT_CHECK`, `CONFIGURE`, `DEPLOY`, `HEALTH_CHECK`, `UPDATE`. |
| `startTime` | string (google-datetime) | Time the stage started. |
| `state` | string enum | Output only. State of the stage. Values: `STATE_UNSPECIFIED`, `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `QueryBareMetalAdminVersionConfigResponse`

- Response message for querying bare metal admin cluster version config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `versions` | array<BareMetalVersionInfo> | List of available versions to install or to upgrade to. |

### `QueryBareMetalVersionConfigResponse`

- Response message for querying bare metal admin cluster version config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `versions` | array<BareMetalVersionInfo> | List of available versions to install or to upgrade to. |

### `QueryVmwareVersionConfigResponse`

- Response message for querying VMware user cluster version config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `versions` | array<VmwareVersionInfo> | List of available versions to install or to upgrade to. |

### `ResourceCondition`

- ResourceCondition provides a standard mechanism for higher-level status reporting from controller.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastTransitionTime` | string (google-datetime) | Last time the condition transit from one status to another. |
| `message` | string | Human-readable message indicating details about last transition. |
| `reason` | string | Machine-readable message indicating details about last transition. |
| `state` | string enum | state of the condition. Values: `STATE_UNSPECIFIED`, `STATE_TRUE`, `STATE_FALSE`, `STATE_UNKNOWN`. |
| `type` | string | Type of the condition. (e.g., ClusterRunning, NodePoolRunning or ServerSidePreflightReady) |

### `ResourceStatus`

- ResourceStatus describes why a cluster or node pool has a certain status. (e.g., ERROR or DEGRADED).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conditions` | array<ResourceCondition> | ResourceCondition provide a standard mechanism for higher-level status reporting from controller. |
| `errorMessage` | string | Human-friendly representation of the error message from controller. The error message can be temporary as the controller controller creates a cluster or node pool. If the error message persists for a longer period of time, it can be used to surface error message to indicate real problems requiring user intervention. |
| `version` | string | Reflect current version of the resource. |
| `versions` | Versions | Shows the mapping of a given version to the number of machines under this version. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |

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

### `UpgradeDependency`

- UpgradeDependency represents a dependency when upgrading a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentVersion` | string | Current version of the dependency e.g. 1.15.0. |
| `membership` | string | Membership names are formatted as `projects//locations//memberships/`. |
| `resourceName` | string | Resource name of the dependency. |
| `targetVersion` | string | Target version of the dependency e.g. 1.16.1. This is the version the dependency needs to be upgraded to before a resource can be upgraded. |

### `ValidationCheck`

- ValidationCheck represents the result of preflight check.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `option` | string enum | Options used for the validation check Values: `OPTIONS_UNSPECIFIED`, `SKIP_VALIDATION_CHECK_BLOCKING`, `SKIP_VALIDATION_ALL`. |
| `scenario` | string enum | Output only. The scenario when the preflight checks were run. Values: `SCENARIO_UNSPECIFIED`, `CREATE`, `UPDATE`. |
| `status` | ValidationCheckStatus | Output only. The detailed validation check status. |

### `ValidationCheckResult`

- ValidationCheckResult defines the details about the validation check.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `category` | string | The category of the validation. |
| `description` | string | The description of the validation check. |
| `details` | string | Detailed failure information, which might be unformatted. |
| `reason` | string | A human-readable message of the check failure. |
| `state` | string enum | The validation check state. Values: `STATE_UNKNOWN`, `STATE_FAILURE`, `STATE_SKIPPED`, `STATE_FATAL`, `STATE_WARNING`. |

### `ValidationCheckStatus`

- ValidationCheckStatus defines the detailed validation check status.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `result` | array<ValidationCheckResult> | Individual checks which failed as part of the Preflight check execution. |

### `Version`

- Version describes the number of nodes at a given version under a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | Number of machines under the above version. |
| `version` | string | Resource version. |

### `Versions`

- Versions describes the mapping of a given version to the number of machines under this version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `versions` | array<Version> | Shows the mapping of a given version to the number of machines under this version. |

### `VmwareAAGConfig`

- Specifies anti affinity group config for the VMware user cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aagConfigDisabled` | boolean | Spread nodes across at least three physical hosts (requires at least three hosts). Enabled by default. |

### `VmwareAddressPool`

- Represents an IP pool used by the load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addresses` | array<string> | Required. The addresses that are part of this pool. Each address must be either in the CIDR form (1.2.3.0/24) or range form (1.2.3.1-1.2.3.5). |
| `avoidBuggyIps` | boolean | If true, avoid using IPs ending in .0 or .255. This avoids buggy consumer devices mistakenly dropping IPv4 traffic for those special IP addresses. |
| `manualAssign` | boolean | If true, prevent IP addresses from being automatically assigned. |
| `pool` | string | Required. The name of the address pool. |

### `VmwareAdminAddonNodeConfig`

- VmwareAdminAddonNodeConfig contains add-on node configurations for VMware admin cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoResizeConfig` | VmwareAutoResizeConfig | VmwareAutoResizeConfig config specifies auto resize config. |

### `VmwareAdminAuthorizationConfig`

- VmwareAdminAuthorizationConfig represents configuration for admin cluster authorization.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `viewerUsers` | array<ClusterUser> | For VMware admin clusters, users will be granted the cluster-viewer role on the cluster. |

### `VmwareAdminCluster`

- Resource that represents a VMware admin cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addonNode` | VmwareAdminAddonNodeConfig | The VMware admin cluster addon node configuration. |
| `annotations` | object | Annotations on the VMware admin cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (\_), dots (.), and alphanumerics between. |
| `antiAffinityGroups` | VmwareAAGConfig | The VMware admin cluster anti affinity group configuration. |
| `authorization` | VmwareAdminAuthorizationConfig | The VMware admin cluster authorization configuration. |
| `autoRepairConfig` | VmwareAutoRepairConfig | The VMware admin cluster auto repair configuration. |
| `bootstrapClusterMembership` | string | The bootstrap cluster this VMware admin cluster belongs to. |
| `controlPlaneNode` | VmwareAdminControlPlaneNodeConfig | The VMware admin cluster control plane node configuration. |
| `createTime` | string (google-datetime) | Output only. The time at which VMware admin cluster was created. |
| `description` | string | A human readable description of this VMware admin cluster. |
| `enableAdvancedCluster` | boolean | Enable advanced cluster. |
| `endpoint` | string | Output only. The DNS name of VMware admin cluster's API server. |
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. Allows clients to perform consistent read-modify-writes through optimistic concurrency control. |
| `fleet` | Fleet | Output only. Fleet configuration for the cluster. |
| `imageType` | string | The OS image type for the VMware admin cluster. |
| `loadBalancer` | VmwareAdminLoadBalancerConfig | The VMware admin cluster load balancer configuration. |
| `localName` | string | Output only. The object name of the VMware OnPremAdminCluster custom resource. This field is used to support conflicting names when enrolling existing clusters to the API. When used as a part of cluster enrollment, this field will differ from the ID in the resource name. For new clusters, this field will match the user provided cluster name and be visible in the last component of the resource name. It is not modifiable. All users should use this name to access their cluster using gkectl or kubectl and should expect to see the local name when viewing admin cluster controller logs. |
| `name` | string | Immutable. The VMware admin cluster resource name. |
| `networkConfig` | VmwareAdminNetworkConfig | The VMware admin cluster network configuration. |
| `onPremVersion` | string | The Anthos clusters on the VMware version for the admin cluster. |
| `platformConfig` | VmwarePlatformConfig | The VMware platform configuration. |
| `preparedSecrets` | VmwareAdminPreparedSecretsConfig | Output only. The VMware admin cluster prepared secrets configuration. It should always be enabled by the Central API, instead of letting users set it. |
| `privateRegistryConfig` | VmwareAdminPrivateRegistryConfig | Configuration for registry. |
| `proxy` | VmwareAdminProxy | Configuration for proxy. |
| `reconciling` | boolean | Output only. If set, there are currently changes in flight to the VMware admin cluster. |
| `state` | string enum | Output only. The current state of VMware admin cluster. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `RUNNING`, `RECONCILING`, `STOPPING`, `ERROR`, `DEGRADED`. |
| `status` | ResourceStatus | Output only. ResourceStatus representing detailed cluster state. |
| `uid` | string | Output only. The unique identifier of the VMware admin cluster. |
| `updateTime` | string (google-datetime) | Output only. The time at which VMware admin cluster was last updated. |
| `validationCheck` | ValidationCheck | Output only. ValidationCheck represents the result of the preflight check job. |
| `vcenter` | VmwareAdminVCenterConfig | The VMware admin cluster VCenter configuration. |

### `VmwareAdminControlPlaneNodeConfig`

- VmwareAdminControlPlaneNodeConfig contains control plane node configuration for VMware admin cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpus` | string (int64) | The number of vCPUs for the control-plane node of the admin cluster. |
| `memory` | string (int64) | The number of mebibytes of memory for the control-plane node of the admin cluster. |
| `replicas` | string (int64) | The number of control plane nodes for this VMware admin cluster. (default: 1 replica). |

### `VmwareAdminF5BigIpConfig`

- VmwareAdminF5BigIpConfig represents configuration parameters for an F5 BIG-IP load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | The load balancer's IP address. |
| `partition` | string | The preexisting partition to be used by the load balancer. This partition is usually created for the admin cluster for example: 'my-f5-admin-partition'. |
| `snatPool` | string | The pool name. Only necessary, if using SNAT. |

### `VmwareAdminHAControlPlaneConfig`

- Specifies HA admin control plane config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlPlaneIpBlock` | VmwareIpBlock | Static IP addresses for the admin control plane nodes. |

### `VmwareAdminLoadBalancerConfig`

- VmwareAdminLoadBalancerConfig contains load balancer configuration for VMware admin cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `f5Config` | VmwareAdminF5BigIpConfig | Configuration for F5 Big IP typed load balancers. |
| `manualLbConfig` | VmwareAdminManualLbConfig | Manually configured load balancers. |
| `metalLbConfig` | VmwareAdminMetalLbConfig | MetalLB load balancers. |
| `seesawConfig` | VmwareAdminSeesawConfig | Output only. Configuration for Seesaw typed load balancers. |
| `vipConfig` | VmwareAdminVipConfig | The VIPs used by the load balancer. |

### `VmwareAdminManualLbConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addonsNodePort` | integer (int32) | NodePort for add-ons server in the admin cluster. |
| `controlPlaneNodePort` | integer (int32) | NodePort for control plane service. The Kubernetes API server in the admin cluster is implemented as a Service of type NodePort (ex. 30968). |
| `ingressHttpNodePort` | integer (int32) | NodePort for ingress service's http. The ingress service in the admin cluster is implemented as a Service of type NodePort (ex. 32527). |
| `ingressHttpsNodePort` | integer (int32) | NodePort for ingress service's https. The ingress service in the admin cluster is implemented as a Service of type NodePort (ex. 30139). |
| `konnectivityServerNodePort` | integer (int32) | NodePort for konnectivity server service running as a sidecar in each kube-apiserver pod (ex. 30564). |

### `VmwareAdminMetalLbConfig`

- VmwareAdminMetalLbConfig represents configuration parameters for a MetalLB load balancer. For admin clusters, currently no configurations is needed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether MetalLB is enabled. |

### `VmwareAdminNetworkConfig`

- VmwareAdminNetworkConfig contains network configuration for VMware admin cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dhcpIpConfig` | VmwareDhcpIpConfig | Configuration settings for a DHCP IP configuration. |
| `haControlPlaneConfig` | VmwareAdminHAControlPlaneConfig | Configuration for HA admin cluster control plane. |
| `hostConfig` | VmwareHostConfig | Represents common network settings irrespective of the host's IP address. |
| `podAddressCidrBlocks` | array<string> | Required. All pods in the cluster are assigned an RFC1918 IPv4 address from these ranges. Only a single range is supported. This field cannot be changed after creation. |
| `serviceAddressCidrBlocks` | array<string> | Required. All services in the cluster are assigned an RFC1918 IPv4 address from these ranges. Only a single range is supported. This field cannot be changed after creation. |
| `staticIpConfig` | VmwareStaticIpConfig | Configuration settings for a static IP configuration. |
| `vcenterNetwork` | string | vcenter_network specifies vCenter network name. |

### `VmwareAdminPreparedSecretsConfig`

- VmwareAdminPreparedSecretsConfig represents configuration for admin cluster prepared secrets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether prepared secrets is enabled. |

### `VmwareAdminPrivateRegistryConfig`

- VmwareAdminPrivateRegistryConfig represents configuration for admin cluster registry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | The registry address. |
| `caCert` | string | When the container runtime pulls an image from private registry, the registry must prove its identity by presenting a certificate. The registry's certificate is signed by a certificate authority (CA). The container runtime uses the CA's certificate to validate the registry's certificate. |

### `VmwareAdminProxy`

- VmwareAdminProxy represents configuration for admin cluster proxy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `noProxy` | string | A comma-separated list of IP addresses, IP address ranges, host names, and domain names that should not go through the proxy server. When Google Distributed Cloud sends a request to one of these addresses, hosts, or domains, the request is sent directly. |
| `url` | string | The HTTP address of proxy server. |

### `VmwareAdminSeesawConfig`

- VmwareSeesawConfig represents configuration parameters for an already existing Seesaw load balancer. IMPORTANT: Please note that the Anthos On-Prem API will not generate or update Seesaw configurations it can only bind a pre-existing configuration to a new user cluster. IMPORTANT: When attempting to create a user cluster with a pre-existing Seesaw load balancer you will need to follow some preparation steps before calling the 'CreateVmwareCluster' API method. First you will need to create the user cluster's namespace via kubectl. The namespace will need to use the following naming convention : -gke-onprem-mgmt or -gke-onprem-mgmt depending on whether you used the 'VmwareCluster.local_name' to disambiguate collisions; for more context see the documentation of 'VmwareCluster.local_name'. Once the namespace is created you will need to create a secret resource via kubectl. This secret will contain copies of your Seesaw credentials. The Secret must be called 'user-cluster-creds' and contain Seesaw's SSH and Cert credentials. The credentials must be keyed with the following names: 'seesaw-ssh-private-key', 'seesaw-ssh-public-key', 'seesaw-ssh-ca-key', 'seesaw-ssh-ca-cert'.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableHa` | boolean | Enable two load balancer VMs to achieve a highly-available Seesaw load balancer. |
| `group` | string | In general the following format should be used for the Seesaw group name: seesaw-for-\[cluster_name\]. |
| `ipBlocks` | array<VmwareIpBlock> | The IP Blocks to be used by the Seesaw load balancer |
| `masterIp` | string | MasterIP is the IP announced by the master of Seesaw group. |
| `stackdriverName` | string | Name to be used by Stackdriver. |
| `vms` | array<string> | Names of the VMs created for this Seesaw group. |

### `VmwareAdminVCenterConfig`

- VmwareAdminVCenterConfig contains VCenter configuration for VMware admin cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | The vCenter IP address. |
| `caCertData` | string | Contains the vCenter CA certificate public key for SSL verification. |
| `cluster` | string | The name of the vCenter cluster for the admin cluster. |
| `dataDisk` | string | The name of the virtual machine disk (VMDK) for the admin cluster. |
| `datacenter` | string | The name of the vCenter datacenter for the admin cluster. |
| `datastore` | string | The name of the vCenter datastore for the admin cluster. |
| `folder` | string | The name of the vCenter folder for the admin cluster. |
| `resourcePool` | string | The name of the vCenter resource pool for the admin cluster. |
| `storagePolicyName` | string | The name of the vCenter storage policy for the user cluster. |

### `VmwareAdminVipConfig`

- VmwareAdminVipConfig for VMware load balancer configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addonsVip` | string | The VIP to configure the load balancer for add-ons. |
| `controlPlaneVip` | string | The VIP which you previously set aside for the Kubernetes API of the admin cluster. |

### `VmwareAutoRepairConfig`

- Specifies config to enable/disable auto repair. The cluster-health-controller is deployed only if Enabled is true.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether auto repair is enabled. |

### `VmwareAutoResizeConfig`

- Represents auto resizing configurations for the VMware user cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether to enable controle plane node auto resizing. |

### `VmwareBundleConfig`

- VmwareBundleConfig represents configuration for the bundle.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `status` | ResourceStatus | Output only. Resource status for the bundle. |
| `version` | string | The version of the bundle. |

### `VmwareCluster`

- Resource that represents a VMware user cluster. ##
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminClusterMembership` | string | Required. The admin cluster this VMware user cluster belongs to. This is the full resource name of the admin cluster's fleet membership. In the future, references to other resource types might be allowed if admin clusters are modeled as their own resources. |
| `adminClusterName` | string | Output only. The resource name of the VMware admin cluster hosting this user cluster. |
| `annotations` | object | Annotations on the VMware user cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (\_), dots (.), and alphanumerics between. |
| `antiAffinityGroups` | VmwareAAGConfig | AAGConfig specifies whether to spread VMware user cluster nodes across at least three physical hosts in the datacenter. |
| `authorization` | Authorization | RBAC policy that will be applied and managed by the Anthos On-Prem API. |
| `autoRepairConfig` | VmwareAutoRepairConfig | Configuration for auto repairing. |
| `binaryAuthorization` | BinaryAuthorization | Binary Authorization related configurations. |
| `controlPlaneNode` | VmwareControlPlaneNodeConfig | VMware user cluster control plane nodes must have either 1 or 3 replicas. |
| `createTime` | string (google-datetime) | Output only. The time at which VMware user cluster was created. |
| `dataplaneV2` | VmwareDataplaneV2Config | VmwareDataplaneV2Config specifies configuration for Dataplane V2. |
| `deleteTime` | string (google-datetime) | Output only. The time at which VMware user cluster was deleted. |
| `description` | string | A human readable description of this VMware user cluster. |
| `disableBundledIngress` | boolean | Disable bundled ingress. |
| `enableAdvancedCluster` | boolean | Enable advanced cluster. |
| `enableControlPlaneV2` | boolean | Enable control plane V2. Default to false. |
| `endpoint` | string | Output only. The DNS name of VMware user cluster's API server. |
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. Allows clients to perform consistent read-modify-writes through optimistic concurrency control. |
| `fleet` | Fleet | Output only. Fleet configuration for the cluster. |
| `loadBalancer` | VmwareLoadBalancerConfig | Load balancer configuration. |
| `localName` | string | Output only. The object name of the VMware OnPremUserCluster custom resource on the associated admin cluster. This field is used to support conflicting names when enrolling existing clusters to the API. When used as a part of cluster enrollment, this field will differ from the ID in the resource name. For new clusters, this field will match the user provided cluster name and be visible in the last component of the resource name. It is not modifiable. All users should use this name to access their cluster using gkectl or kubectl and should expect to see the local name when viewing admin cluster controller logs. |
| `name` | string | Immutable. The VMware user cluster resource name. |
| `networkConfig` | VmwareNetworkConfig | The VMware user cluster network configuration. |
| `onPremVersion` | string | Required. The Anthos clusters on the VMware version for your user cluster. |
| `reconciling` | boolean | Output only. If set, there are currently changes in flight to the VMware user cluster. |
| `state` | string enum | Output only. The current state of VMware user cluster. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `RUNNING`, `RECONCILING`, `STOPPING`, `ERROR`, `DEGRADED`. |
| `status` | ResourceStatus | Output only. ResourceStatus representing detailed cluster state. |
| `storage` | VmwareStorageConfig | Storage configuration. |
| `uid` | string | Output only. The unique identifier of the VMware user cluster. |
| `updateTime` | string (google-datetime) | Output only. The time at which VMware user cluster was last updated. |
| `upgradePolicy` | VmwareClusterUpgradePolicy | Specifies upgrade policy for the cluster. |
| `validationCheck` | ValidationCheck | Output only. ValidationCheck represents the result of the preflight check job. |
| `vcenter` | VmwareVCenterConfig | VmwareVCenterConfig specifies vCenter config for the user cluster. If unspecified, it is inherited from the admin cluster. |
| `vmTrackingEnabled` | boolean | Enable VM tracking. |

### `VmwareClusterUpgradePolicy`

- VmwareClusterUpgradePolicy defines the cluster upgrade policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlPlaneOnly` | boolean | Controls whether the upgrade applies to the control plane only. |

### `VmwareControlPlaneNodeConfig`

- Specifies control plane node config for the VMware user cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoResizeConfig` | VmwareAutoResizeConfig | AutoResizeConfig provides auto resizing configurations. |
| `cpus` | string (int64) | The number of CPUs for each admin cluster node that serve as control planes for this VMware user cluster. (default: 4 CPUs) |
| `memory` | string (int64) | The megabytes of memory for each admin cluster node that serves as a control plane for this VMware user cluster (default: 8192 MB memory). |
| `replicas` | string (int64) | The number of control plane nodes for this VMware user cluster. (default: 1 replica). |
| `vsphereConfig` | VmwareControlPlaneVsphereConfig | Vsphere-specific config. |

### `VmwareControlPlaneV2Config`

- Specifies control plane V2 config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlPlaneIpBlock` | VmwareIpBlock | Static IP addresses for the control plane nodes. |

### `VmwareControlPlaneVsphereConfig`

- Specifies control plane node config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `datastore` | string | The Vsphere datastore used by the control plane Node. |
| `storagePolicyName` | string | The Vsphere storage policy used by the control plane Node. |

### `VmwareDataplaneV2Config`

- Contains configurations for Dataplane V2, which is optimized dataplane for Kubernetes networking. For more information, see: https://cloud.google.com/kubernetes-engine/docs/concepts/dataplane-v2
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advancedNetworking` | boolean | Enable advanced networking which requires dataplane_v2_enabled to be set true. |
| `dataplaneV2Enabled` | boolean | Enables Dataplane V2. |
| `forwardMode` | string | Configure ForwardMode for Dataplane v2. |
| `windowsDataplaneV2Enabled` | boolean | Enable Dataplane V2 for clusters with Windows nodes. |

### `VmwareDhcpIpConfig`

- Represents the network configuration required for the VMware user clusters with DHCP IP configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | enabled is a flag to mark if DHCP IP allocation is used for VMware user clusters. |

### `VmwareF5BigIpConfig`

- Represents configuration parameters for an F5 BIG-IP load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | The load balancer's IP address. |
| `partition` | string | The preexisting partition to be used by the load balancer. This partition is usually created for the admin cluster for example: 'my-f5-admin-partition'. |
| `snatPool` | string | The pool name. Only necessary, if using SNAT. |

### `VmwareHostConfig`

- Represents the common parameters for all the hosts irrespective of their IP address.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsSearchDomains` | array<string> | DNS search domains. |
| `dnsServers` | array<string> | DNS servers. |
| `ntpServers` | array<string> | NTP servers. |

### `VmwareHostIp`

- Represents VMware user cluster node's network configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hostname` | string | Hostname of the machine. VM's name will be used if this field is empty. |
| `ip` | string | IP could be an IP address (like 1.2.3.4) or a CIDR (like 1.2.3.0/24). |

### `VmwareIpBlock`

- Represents a collection of IP addresses to assign to nodes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gateway` | string | The network gateway used by the VMware user cluster. |
| `ips` | array<VmwareHostIp> | The node's network configurations used by the VMware user cluster. |
| `netmask` | string | The netmask used by the VMware user cluster. |

### `VmwareLoadBalancerConfig`

- Specifies the locad balancer config for the VMware user cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `f5Config` | VmwareF5BigIpConfig | Configuration for F5 Big IP typed load balancers. |
| `manualLbConfig` | VmwareManualLbConfig | Manually configured load balancers. |
| `metalLbConfig` | VmwareMetalLbConfig | Configuration for MetalLB typed load balancers. |
| `seesawConfig` | VmwareSeesawConfig | Output only. Configuration for Seesaw typed load balancers. |
| `vipConfig` | VmwareVipConfig | The VIPs used by the load balancer. |

### `VmwareManualLbConfig`

- Represents configuration parameters for an already existing manual load balancer. Given the nature of manual load balancers it is expected that said load balancer will be fully managed by users. IMPORTANT: Please note that the Anthos On-Prem API will not generate or update ManualLB configurations it can only bind a pre-existing configuration to a new VMware user cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlPlaneNodePort` | integer (int32) | NodePort for control plane service. The Kubernetes API server in the admin cluster is implemented as a Service of type NodePort (ex. 30968). |
| `ingressHttpNodePort` | integer (int32) | NodePort for ingress service's http. The ingress service in the admin cluster is implemented as a Service of type NodePort (ex. 32527). |
| `ingressHttpsNodePort` | integer (int32) | NodePort for ingress service's https. The ingress service in the admin cluster is implemented as a Service of type NodePort (ex. 30139). |
| `konnectivityServerNodePort` | integer (int32) | NodePort for konnectivity server service running as a sidecar in each kube-apiserver pod (ex. 30564). |

### `VmwareMetalLbConfig`

- Represents configuration parameters for the MetalLB load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addressPools` | array<VmwareAddressPool> | Required. AddressPools is a list of non-overlapping IP pools used by load balancer typed services. All addresses must be routable to load balancer nodes. IngressVIP must be included in the pools. |

### Shape of `Authorization`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "adminUsers": "array<ClusterUser>"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `gkeonprem` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://gkeonprem.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

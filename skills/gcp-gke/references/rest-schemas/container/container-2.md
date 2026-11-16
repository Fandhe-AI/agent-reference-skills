---
source: https://container.googleapis.com/$discovery/rest?version=v1
---

# Kubernetes Engine API message schemas (container) (part 2/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/container/`.

### `HostMaintenancePolicy`

- HostMaintenancePolicy contains the maintenance policy for the hosts on which the GKE VMs run on.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `maintenanceInterval` | string enum | Specifies the frequency of planned maintenance events. Values: `MAINTENANCE_INTERVAL_UNSPECIFIED`, `AS_NEEDED`, `PERIODIC`. |
| `opportunisticMaintenanceStrategy` | OpportunisticMaintenanceStrategy | Strategy that will trigger maintenance on behalf of the customer. |

### `HttpCacheControlResponseHeader`

- RFC-2616: cache control support
- Version: v1

| Field | Type | Description |
|---|---|---|
| `age` | string (int64) | 14.6 response cache age, in seconds since the response is generated |
| `directive` | string | 14.9 request and response directives |
| `expires` | string | 14.21 response cache expires, in RFC 1123 date format |

### `HttpLoadBalancing`

- Configuration options for the HTTP (L7) load balancing controller addon, which makes it easy to set up HTTP load balancers for services in a cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disabled` | boolean | Whether the HTTP Load Balancing controller is enabled in the cluster. When enabled, it runs a small pod in the cluster that manages the load balancers. |

### `HugepagesConfig`

- Hugepages amount in both 2m and 1g size
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hugepageSize1g` | integer (int32) | Optional. Amount of 1G hugepages |
| `hugepageSize2m` | integer (int32) | Optional. Amount of 2M hugepages |

### `ILBSubsettingConfig`

- ILBSubsettingConfig contains the desired config of L4 Internal LoadBalancer subsetting on this cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Enables l4 ILB subsetting for this cluster. |

### `IPAllocationPolicy`

- Configuration for controlling how IPs are allocated in the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalIpRangesConfigs` | array<AdditionalIPRangesConfig> | Output only. The additional IP ranges that are added to the cluster. These IP ranges can be used by new node pools to allocate node and pod IPs automatically. Each AdditionalIPRangesConfig corresponds to a single subnetwork. Once a range is removed it will not show up in IPAllocationPolicy. |
| `additionalPodRangesConfig` | AdditionalPodRangesConfig | Output only. The additional pod ranges that are added to the cluster. These pod ranges can be used by new node pools to allocate pod IPs automatically. Once the range is removed it will not show up in IPAllocationPolicy. |
| `autoIpamConfig` | AutoIpamConfig | Optional. AutoIpamConfig contains all information related to Auto IPAM |
| `clusterIpv4Cidr` | string | This field is deprecated, use cluster_ipv4_cidr_block. |
| `clusterIpv4CidrBlock` | string | The IP address range for the cluster pod IPs. If this field is set, then `cluster.cluster_ipv4_cidr` must be left blank. This field is only applicable when `use_ip_aliases` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. |
| `clusterSecondaryRangeName` | string | The name of the secondary range to be used for the cluster CIDR block. The secondary range will be used for pod IP addresses. This must be an existing secondary range associated with the cluster subnetwork. This field is only applicable with use_ip_aliases is true and create_subnetwork is false. |
| `createSubnetwork` | boolean | Whether a new subnetwork will be created automatically for the cluster. This field is only applicable when `use_ip_aliases` is true. |
| `defaultPodIpv4RangeUtilization` | number (double) | Output only. The utilization of the cluster default IPv4 range for the pod. The ratio is Usage/\[Total number of IPs in the secondary range\], Usage=numNodes\*numZones\*podIPsPerNode. |
| `ipv6AccessType` | string enum | The ipv6 access type (internal or external) when create_subnetwork is true Values: `IPV6_ACCESS_TYPE_UNSPECIFIED`, `INTERNAL`, `EXTERNAL`. |
| `networkTierConfig` | NetworkTierConfig | Cluster-level network tier configuration is used to determine the default network tier for external IP addresses on cluster resources, such as node pools and load balancers. |
| `nodeIpv4Cidr` | string | This field is deprecated, use node_ipv4_cidr_block. |
| `nodeIpv4CidrBlock` | string | The IP address range of the instance IPs in this cluster. This is applicable only if `create_subnetwork` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. |
| `podCidrOverprovisionConfig` | PodCIDROverprovisionConfig | \[PRIVATE FIELD\] Pod CIDR size overprovisioning config for the cluster. Pod CIDR size per node depends on max_pods_per_node. By default, the value of max_pods_per_node is doubled and then rounded off to next power of 2 to get the size of pod CIDR block per node. Example: max_pods_per_node of 30 would result in 64 IPs (/26). This config can disable the doubling of IPs (we still round off to next power of 2) Example: max_pods_per_node of 30 will result in 32 IPs (/27) when overprovisioning is disabled. |
| `servicesIpv4Cidr` | string | This field is deprecated, use services_ipv4_cidr_block. |
| `servicesIpv4CidrBlock` | string | The IP address range of the services IPs in this cluster. If blank, a range will be automatically chosen with the default size. This field is only applicable when `use_ip_aliases` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. |
| `servicesIpv6CidrBlock` | string | Output only. The services IPv6 CIDR block for the cluster. |
| `servicesSecondaryRangeName` | string | The name of the secondary range to be used as for the services CIDR block. The secondary range will be used for service ClusterIPs. This must be an existing secondary range associated with the cluster subnetwork. This field is only applicable with use_ip_aliases is true and create_subnetwork is false. |
| `stackType` | string enum | The IP stack type of the cluster Values: `STACK_TYPE_UNSPECIFIED`, `IPV4`, `IPV4_IPV6`. |
| `subnetIpv6CidrBlock` | string | Output only. The subnet's IPv6 CIDR block used by nodes and pods. |
| `subnetworkName` | string | A custom subnetwork name to be used if `create_subnetwork` is true. If this field is empty, then an automatic name will be chosen for the new subnetwork. |
| `tpuIpv4CidrBlock` | string | The IP address range of the Cloud TPUs in this cluster. If unspecified, a range will be automatically chosen with the default size. This field is only applicable when `use_ip_aliases` is true. If unspecified, the range will use the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25. |
| `useIpAliases` | boolean | Whether alias IPs will be used for pod IPs in the cluster. This is used in conjunction with use_routes. It cannot be true if use_routes is true. If both use_ip_aliases and use_routes are false, then the server picks the default IP allocation mode |
| `useRoutes` | boolean | Whether routes will be used for pod IPs in the cluster. This is used in conjunction with use_ip_aliases. It cannot be true if use_ip_aliases is true. If both use_ip_aliases and use_routes are false, then the server picks the default IP allocation mode |

### `IPAllocationPolicy` (v1beta1)

- Configuration for controlling how IPs are allocated in the cluster.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `additionalIpRangesConfigs` | array<AdditionalIPRangesConfig> | Output only. The additional IP ranges that are added to the cluster. These IP ranges can be used by new node pools to allocate node and pod IPs automatically. Each AdditionalIPRangesConfig corresponds to a single subnetwork. Once a range is removed it will not show up in IPAllocationPolicy. |
| `additionalPodRangesConfig` | AdditionalPodRangesConfig | Output only. The additional pod ranges that are added to the cluster. These pod ranges can be used by new node pools to allocate pod IPs automatically. Once the range is removed it will not show up in IPAllocationPolicy. |
| `allowRouteOverlap` | boolean | If true, allow allocation of cluster CIDR ranges that overlap with certain kinds of network routes. By default we do not allow cluster CIDR ranges to intersect with any user declared routes. With allow_route_overlap == true, we allow overlapping with CIDR ranges that are larger than the cluster CIDR range. If this field is set to true, then cluster and services CIDRs must be fully-specified (e.g. `10.96.0.0/14`, but not `/14`), which means: 1) When `use_ip_aliases` is true, `cluster_ipv4_cidr_block` and `services_ipv4_cidr_block` must be fully-specified. 2) When `use_ip_aliases` is false, `cluster.cluster_ipv4_cidr` muse be fully-specified. |
| `autoIpamConfig` | AutoIpamConfig | Optional. AutoIpamConfig contains all information related to Auto IPAM |
| `clusterIpv4Cidr` | string | This field is deprecated, use cluster_ipv4_cidr_block. |
| `clusterIpv4CidrBlock` | string | The IP address range for the cluster pod IPs. If this field is set, then `cluster.cluster_ipv4_cidr` must be left blank. This field is only applicable when `use_ip_aliases` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. |
| `clusterSecondaryRangeName` | string | The name of the secondary range to be used for the cluster CIDR block. The secondary range will be used for pod IP addresses. This must be an existing secondary range associated with the cluster subnetwork. This field is only applicable with use_ip_aliases and create_subnetwork is false. |
| `createSubnetwork` | boolean | Whether a new subnetwork will be created automatically for the cluster. This field is only applicable when `use_ip_aliases` is true. |
| `defaultPodIpv4RangeUtilization` | number (double) | Output only. The utilization of the cluster default IPv4 range for the pod. The ratio is Usage/\[Total number of IPs in the secondary range\], Usage=numNodes\*numZones\*podIPsPerNode. |
| `ipv6AccessType` | string enum | The ipv6 access type (internal or external) when create_subnetwork is true Values: `IPV6_ACCESS_TYPE_UNSPECIFIED`, `INTERNAL`, `EXTERNAL`. |
| `networkTierConfig` | NetworkTierConfig | Cluster-level network tier configuration is used to determine the default network tier for external IP addresses on cluster resources, such as node pools and load balancers. |
| `nodeIpv4Cidr` | string | This field is deprecated, use node_ipv4_cidr_block. |
| `nodeIpv4CidrBlock` | string | The IP address range of the instance IPs in this cluster. This is applicable only if `create_subnetwork` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. |
| `podCidrOverprovisionConfig` | PodCIDROverprovisionConfig | \[PRIVATE FIELD\] Pod CIDR size overprovisioning config for the cluster. Pod CIDR size per node depends on max_pods_per_node. By default, the value of max_pods_per_node is doubled and then rounded off to next power of 2 to get the size of pod CIDR block per node. Example: max_pods_per_node of 30 would result in 64 IPs (/26). This config can disable the doubling of IPs (we still round off to next power of 2) Example: max_pods_per_node of 30 will result in 32 IPs (/27) when overprovisioning is disabled. |
| `servicesIpv4Cidr` | string | This field is deprecated, use services_ipv4_cidr_block. |
| `servicesIpv4CidrBlock` | string | The IP address range of the services IPs in this cluster. If blank, a range will be automatically chosen with the default size. This field is only applicable when `use_ip_aliases` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. |
| `servicesIpv6CidrBlock` | string | Output only. The services IPv6 CIDR block for the cluster. |
| `servicesSecondaryRangeName` | string | The name of the secondary range to be used as for the services CIDR block. The secondary range will be used for service ClusterIPs. This must be an existing secondary range associated with the cluster subnetwork. This field is only applicable with use_ip_aliases and create_subnetwork is false. |
| `stackType` | string enum | IP stack type Values: `STACK_TYPE_UNSPECIFIED`, `IPV4`, `IPV4_IPV6`. |
| `subnetIpv6CidrBlock` | string | Output only. The subnet's IPv6 CIDR block used by nodes and pods. |
| `subnetworkName` | string | A custom subnetwork name to be used if `create_subnetwork` is true. If this field is empty, then an automatic name will be chosen for the new subnetwork. |
| `tpuIpv4CidrBlock` | string | The IP address range of the Cloud TPUs in this cluster. If unspecified, a range will be automatically chosen with the default size. This field is only applicable when `use_ip_aliases` is true. If unspecified, the range will use the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. This field is deprecated, use cluster.tpu_config.ipv4_cidr_block instead. |
| `useIpAliases` | boolean | Whether alias IPs will be used for pod IPs in the cluster. This is used in conjunction with use_routes. It cannot be true if use_routes is true. If both use_ip_aliases and use_routes are false, then the server picks the default IP allocation mode |
| `useRoutes` | boolean | Whether routes will be used for pod IPs in the cluster. This is used in conjunction with use_ip_aliases. It cannot be true if use_ip_aliases is true. If both use_ip_aliases and use_routes are false, then the server picks the default IP allocation mode |

### `IPEndpointsConfig`

- IP endpoints configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizedNetworksConfig` | MasterAuthorizedNetworksConfig | Configuration of authorized networks. If enabled, restricts access to the control plane based on source IP. It is invalid to specify both Cluster.masterAuthorizedNetworksConfig and this field at the same time. |
| `enablePublicEndpoint` | boolean | Controls whether the control plane allows access through a public IP. It is invalid to specify both PrivateClusterConfig.enablePrivateEndpoint and this field at the same time. |
| `enabled` | boolean | Controls whether to allow direct IP access. |
| `globalAccess` | boolean | Controls whether the control plane's private endpoint is accessible from sources in other regions. It is invalid to specify both PrivateClusterMasterGlobalAccessConfig.enabled and this field at the same time. |
| `privateEndpoint` | string | Output only. The internal IP address of this cluster's control plane. Only populated if enabled. |
| `privateEndpointSubnetwork` | string | Subnet to provision the master's private endpoint during cluster creation. Specified in projects/\*/regions/\*/subnetworks/\* format. It is invalid to specify both PrivateClusterConfig.privateEndpointSubnetwork and this field at the same time. |
| `publicEndpoint` | string | Output only. The external IP address of this cluster's control plane. Only populated if enabled. |

### `IdentityServiceConfig`

- IdentityServiceConfig is configuration for Identity Service which allows customers to use external identity providers with the K8S API
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether to enable the Identity Service component |

### `InitScript`

- InitScript provide a simply bash script to be executed on the node.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | Optional. The optional arguments line to be passed to the init script. |
| `gcpSecretManagerSecretUri` | string | The resource name of the secret manager secret hosting the init script. Both global and regional secrets are supported with format below: Global secret: projects/{project}/secrets/{secret}/versions/{version} Regional secret: projects/{project}/locations/{location}/secrets/{secret}/versions/{version} Example: projects/1234567890/secrets/script_1/versions/1. Accept version number only, not support version alias. User can't configure both gcp_secret_manager_secret_uri and gcs_uri. |
| `gcsGeneration` | string (int64) | The generation of the init script stored in Gloud Storage. This is the required field to identify the version of the init script. User can get the genetaion from `gcloud storage objects describe gs://BUCKET_NAME/OBJECT_NAME --format="value(generation)"` or from the "Version history" tab of the object in the Cloud Console UI. |
| `gcsUri` | string | The Cloud Storage URI for storing the init script. Format: gs://BUCKET_NAME/OBJECT_NAME The service account on the node pool must have read access to the object. User can't configure both gcs_uri and gcp_secret_manager_secret_uri. |

### `IntraNodeVisibilityConfig`

- IntraNodeVisibilityConfig contains the desired config of the intra-node visibility on this cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Enables intra node visibility for this cluster. |

### `IstioConfig`

- Configuration options for Istio addon.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `auth` | string enum | The specified Istio auth mode, either none, or mutual TLS. Values: `AUTH_NONE`, `AUTH_MUTUAL_TLS`. |
| `disabled` | boolean | Whether Istio is enabled for this cluster. |

### `Jwk`

- Jwk is a JSON Web Key as specified in RFC 7517
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alg` | string | Algorithm. |
| `crv` | string | Used for ECDSA keys. |
| `e` | string | Used for RSA keys. |
| `kid` | string | Key ID. |
| `kty` | string | Key Type. |
| `n` | string | Used for RSA keys. |
| `use` | string | Permitted uses for the public keys. |
| `x` | string | Used for ECDSA keys. |
| `y` | string | Used for ECDSA keys. |

### `K8sBetaAPIConfig`

- K8sBetaAPIConfig , configuration for beta APIs
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabledApis` | array<string> | Enabled k8s beta APIs. |

### `KalmConfig`

- Configuration options for the KALM addon.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether KALM is enabled for this cluster. |

### `KernelCommandlineOverrides`

- Definition of possible additional kernel command line arguments to be configured to the kernel.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `initOnAlloc` | string enum | Optional. Defines the change of init_on_alloc. Values: `INIT_ON_ALLOC_UNSPECIFIED`, `INIT_ON_ALLOC_OFF`. |
| `specRstackOverflow` | string enum | Optional. Defines the change of spec_rstack_overflow. Values: `SPEC_RSTACK_OVERFLOW_UNSPECIFIED`, `SPEC_RSTACK_OVERFLOW_OFF`. |

### `KernelOverrides`

- Parameters that can be configured on the kernel.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kernelCommandlineOverrides` | KernelCommandlineOverrides | Optional. Allow setting for optional kernel command line arguments overrides. |
| `lruGen` | LRUGen | Optional. lrugen (Multi-Gen LRU) options |

### `KubeletCertInfo`

- Contains expiry information about the kubelet certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nonTpmBootstrapCertExpireTime` | string (google-datetime) | Output only. |
| `tpmBootstrapCertExpireTime` | string (google-datetime) | Output only. |

### `KubernetesDashboard`

- Configuration for the Kubernetes Dashboard.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disabled` | boolean | Whether the Kubernetes Dashboard is enabled for this cluster. |

### `LRUGen`

- lrugen (Multi-Gen LRU) options See https://docs.kernel.org/admin-guide/mm/multigen_lru.html
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Enable lrugen. |
| `minTtlMs` | integer (int32) | Optional. Users can write N to min_ttl_ms to prevent the working set of N milliseconds from getting evicted. |

### `LegacyAbac`

- Configuration for the legacy Attribute Based Access Control authorization mode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the ABAC authorizer is enabled for this cluster. When enabled, identities in the system, including service accounts, nodes, and controllers, will have statically granted permissions beyond those provided by the RBAC configuration or IAM. |

### `LinuxNodeConfig`

- Parameters that can be configured on Linux nodes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accurateTimeConfig` | AccurateTimeConfig | Optional. The accurate time configuration for the node pool. |
| `additionalEtcHosts` | array<EtcHostsEntry> | Optional. Additional entries to be added to /etc/hosts. |
| `additionalEtcResolvConf` | array<ResolvedConfEntry> | Optional. Additional entries to be added to /etc/resolv.conf. |
| `additionalEtcSystemdResolvedConf` | array<ResolvedConfEntry> | Optional. Additional entries to be added to /etc/systemd/resolved.conf. |
| `cgroupMode` | string enum | cgroup_mode specifies the cgroup mode to be used on the node. Values: `CGROUP_MODE_UNSPECIFIED`, `CGROUP_MODE_V1`, `CGROUP_MODE_V2`. |
| `customNodeInit` | CustomNodeInit | Optional. Allow users to run arbitrary bash script or container on the node. |
| `diskIoScheduler` | DiskIoScheduler | Optional. Controls the configuration for the disk IO scheduler. |
| `hugepages` | HugepagesConfig | Optional. Amounts for 2M and 1G hugepages |
| `kernelOverrides` | KernelOverrides | Optional. Defines the kernel overrides to be applied to the nodes. Note: sysctl changes are defined separately in the sysctls fields. |
| `nodeKernelModuleLoading` | NodeKernelModuleLoading | Optional. Configuration for kernel module loading on nodes. When enabled, the node pool will be provisioned with a Container-Optimized OS image that enforces kernel module signature verification. |
| `nodeVfioConfig` | NodeVfioConfig | Optional. Contains VFIO-related configurations for this node. |
| `swapConfig` | SwapConfig | Optional. Enables and configures swap space on nodes. If omitted, swap is disabled. |
| `sysctls` | object | The Linux kernel parameters to be applied to the nodes and all pods running on the nodes. The following parameters are supported. net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog net.core.rmem_max net.core.rmem_default net.core.wmem_default net.core.wmem_max net.core.optmem_max net.core.somaxconn net.ipv4.neigh.default.gc_thresh1 net.ipv4.neigh.default.gc_thresh2 net.ipv4.neigh.default.gc_thresh3 net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.ipv4.tcp_tw_reuse net.ipv4.tcp_mtu_probing net.ipv4.tcp_max_orphans net.ipv4.tcp_max_tw_buckets net.ipv4.tcp_syn_retries net.ipv4.tcp_ecn net.ipv4.tcp_congestion_control net.netfilter.nf_conntrack_max net.netfilter.nf_conntrack_buckets net.netfilter.nf_conntrack_tcp_timeout_close_wait net.netfilter.nf_conntrack_tcp_timeout_time_wait net.netfilter.nf_conntrack_tcp_timeout_established net.netfilter.nf_conntrack_acct kernel.keys.maxkeys kernel.keys.maxbytes kernel.shmmni kernel.shmmax kernel.shmall kernel.core_pattern kernel.perf_event_paranoid kernel.sched_rt_runtime_us kernel.softlockup_panic kernel.yama.ptrace_scope kernel.kptr_restrict kernel.dmesg_restrict kernel.sysrq fs.aio-max-nr fs.file-max fs.inotify.max_user_instances fs.inotify.max_user_watches fs.nr_open vm.dirty_background_ratio vm.dirty_background_bytes vm.dirty_expire_centisecs vm.dirty_ratio vm.dirty_bytes vm.dirty_writeback_centisecs vm.max_map_count vm.overcommit_memory vm.overcommit_ratio vm.vfs_cache_pressure vm.swappiness vm.watermark_scale_factor vm.min_free_kbytes |
| `timeZone` | string | Optional. Configures the timezone of the node. |
| `transparentHugepageDefrag` | string enum | Optional. Defines the transparent hugepage defrag configuration on the node. VM hugepage allocation can be managed by either limiting defragmentation for delayed allocation or skipping it entirely for immediate allocation only. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details. Values: `TRANSPARENT_HUGEPAGE_DEFRAG_UNSPECIFIED`, `TRANSPARENT_HUGEPAGE_DEFRAG_ALWAYS`, `TRANSPARENT_HUGEPAGE_DEFRAG_DEFER`, `TRANSPARENT_HUGEPAGE_DEFRAG_DEFER_WITH_MADVISE`, `TRANSPARENT_HUGEPAGE_DEFRAG_MADVISE`, `TRANSPARENT_HUGEPAGE_DEFRAG_NEVER`. |
| `transparentHugepageEnabled` | string enum | Optional. Transparent hugepage support for anonymous memory can be entirely disabled (mostly for debugging purposes) or only enabled inside MADV_HUGEPAGE regions (to avoid the risk of consuming more memory resources) or enabled system wide. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details. Values: `TRANSPARENT_HUGEPAGE_ENABLED_UNSPECIFIED`, `TRANSPARENT_HUGEPAGE_ENABLED_ALWAYS`, `TRANSPARENT_HUGEPAGE_ENABLED_MADVISE`, `TRANSPARENT_HUGEPAGE_ENABLED_NEVER`. |

### `ListClustersResponse`

- ListClustersResponse is the result of ListClustersRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusters` | array<Cluster> | A list of clusters in the project in the specified zone, or across all ones. |
| `missingZones` | array<string> | If any zones are listed here, the list of clusters returned may be missing those zones. |

### `ListLocationsResponse`

- ListLocationsResponse returns the list of all GKE locations and their recommendation state.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A full list of GKE locations. |
| `nextPageToken` | string | Only return ListLocationsResponse that occur after the page_token. This value should be populated from the ListLocationsResponse.next_page_token if that response token was set (which happens when listing more Locations than fit in a single ListLocationsResponse). |

### `ListNodePoolsResponse`

- ListNodePoolsResponse is the result of ListNodePoolsRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodePools` | array<NodePool> | A list of node pools for a cluster. |

### `ListOperationsResponse`

- ListOperationsResponse is the result of ListOperationsRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `missingZones` | array<string> | If any zones are listed here, the list of operations returned may be missing the operations from those zones. |
| `operations` | array<Operation> | A list of operations in the project in the specified zone. |

### `ListUsableSubnetworksResponse`

- ListUsableSubnetworksResponse is the response of ListUsableSubnetworksRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | This token allows you to get the next page of results for list requests. If the number of results is larger than `page_size`, use the `next_page_token` as a value for the query parameter `page_token` in the next request. The value will become empty when there are no more pages. |
| `subnetworks` | array<UsableSubnetwork> | A list of usable subnetworks in the specified network project. |

### `LocalNvmeSsdBlockConfig`

- LocalNvmeSsdBlockConfig contains configuration for using raw-block local NVMe SSDs
- Version: v1

| Field | Type | Description |
|---|---|---|
| `localSsdCount` | integer (int32) | Number of local NVMe SSDs to use. The limit for this value is dependent upon the maximum number of disk available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. A zero (or unset) value has different meanings depending on machine type being used: 1. For pre-Gen3 machines, which support flexible numbers of local ssds, zero (or unset) means to disable using local SSDs as ephemeral storage. 2. For Gen3 machines which dictate a specific number of local ssds, zero (or unset) means to use the default number of local ssds that goes with that machine type. For example, for a c3-standard-8-lssd machine, 2 local ssds would be provisioned. For c3-standard-8 (which doesn't support local ssds), 0 will be provisioned. See https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds for more info. |

### `Location`

- Location returns the location name, and if the location is recommended for GKE cluster scheduling.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `name` | string | Contains the name of the resource requested. Specified in the format `projects/*/locations/*`. |
| `recommended` | boolean | Whether the location is recommended for GKE cluster scheduling. |
| `type` | string enum | Contains the type of location this Location is for. Regional or Zonal. Values: `LOCATION_TYPE_UNSPECIFIED`, `ZONE`, `REGION`. |

### `LoggingComponentConfig`

- LoggingComponentConfig is cluster logging component configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableComponents` | array<string> | Select components to collect logs. An empty set would disable all logging. Values: `COMPONENT_UNSPECIFIED`, `SYSTEM_COMPONENTS`, `WORKLOADS`, `APISERVER`, `SCHEDULER`, `CONTROLLER_MANAGER`, `KCP_SSHD`, `KCP_CONNECTION`, `KCP_HPA`, `KCP_VPA`. |

### `LoggingConfig`

- LoggingConfig is cluster logging configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `componentConfig` | LoggingComponentConfig | Logging components configuration |

### `LoggingVariantConfig`

- LoggingVariantConfig specifies the behaviour of the logging component.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `variant` | string enum | Logging variant deployed on nodes. Values: `VARIANT_UNSPECIFIED`, `DEFAULT`, `MAX_THROUGHPUT`. |

### `LustreCsiDriverConfig`

- Configuration for the Lustre CSI driver.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disableMultiNic` | boolean | When set to true, this disables multi-NIC support for the Lustre CSI driver. By default, GKE enables multi-NIC support, which allows the Lustre CSI driver to automatically detect and configure all suitable network interfaces on a node to maximize I/O performance for demanding workloads. |
| `enableLegacyLustrePort` | boolean | If set to true, the Lustre CSI driver will install Lustre kernel modules using port 6988. This serves as a workaround for a port conflict with the gke-metadata-server. This field is required ONLY under the following conditions: 1. The GKE node version is older than 1.33.2-gke.4655000. 2. You're connecting to a Lustre instance that has the 'gke-support-enabled' flag. Deprecated: This flag is no longer required as of GKE node version 1.33.2-gke.4655000, unless you are connecting to a Lustre instance that has the `gke-support-enabled` flag. |
| `enabled` | boolean | Whether the Lustre CSI driver is enabled for this cluster. |

### `MaintenanceExclusionOptions`

- Represents the Maintenance exclusion option.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTimeBehavior` | string enum | EndTimeBehavior specifies the behavior of the exclusion end time. Values: `END_TIME_BEHAVIOR_UNSPECIFIED`, `UNTIL_END_OF_SUPPORT`. |
| `scope` | string enum | Scope specifies the upgrade scope which upgrades are blocked by the exclusion. Values: `NO_UPGRADES`, `NO_MINOR_UPGRADES`, `NO_MINOR_OR_NODE_UPGRADES`. |

### `MaintenancePolicy`

- MaintenancePolicy defines the maintenance policy to be used for the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disruptionBudget` | DisruptionBudget | Optional. The upgrade disruption budget for the cluster control plane. |
| `resourceVersion` | string | A hash identifying the version of this policy, so that updates to fields of the policy won't accidentally undo intermediate changes (and so that users of the API unaware of some fields won't accidentally remove other fields). Make a `get()` request to the cluster to get the current resource version and include it with requests to set the policy. |
| `window` | MaintenanceWindow | Specifies the maintenance window in which maintenance may be performed. |

### `MaintenanceWindow`

- MaintenanceWindow defines the maintenance window to be used for the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dailyMaintenanceWindow` | DailyMaintenanceWindow | DailyMaintenanceWindow specifies a daily maintenance operation window. |
| `maintenanceExclusions` | object | Exceptions to maintenance window. Non-emergency maintenance should not occur in these windows. |
| `recurringMaintenanceWindow` | RecurringMaintenanceWindow | RecurringMaintenanceWindow specifies some number of recurring time periods for maintenance to occur. The time windows may be overlapping. If no maintenance windows are set, maintenance can occur at any time. Alternative to RecurringWindow, with renamed fields. |
| `recurringWindow` | RecurringTimeWindow | RecurringWindow specifies some number of recurring time periods for maintenance to occur. The time windows may be overlapping. If no maintenance windows are set, maintenance can occur at any time. |

### `ManagedMachineLearningDiagnosticsConfig`

- ManagedMachineLearningDiagnosticsConfig is the configuration for the GKE Managed Machine Learning Diagnostics pipeline.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Enable/Disable Managed Machine Learning Diagnostics. |

### `ManagedOpenTelemetryConfig`

- ManagedOpenTelemetryConfig is the configuration for the GKE Managed OpenTelemetry pipeline.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scope` | string enum | Scope of the Managed OpenTelemetry pipeline. Values: `SCOPE_UNSPECIFIED`, `NONE`, `COLLECTION_AND_INSTRUMENTATION_COMPONENTS`. |

### `ManagedPrometheusConfig`

- ManagedPrometheusConfig defines the configuration for Google Cloud Managed Service for Prometheus.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoMonitoringConfig` | AutoMonitoringConfig | GKE Workload Auto-Monitoring Configuration. |
| `enabled` | boolean | Enable Managed Collection. |

### `Master`

- Master is the configuration for components on master.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `compatibilityStatus` | CompatibilityStatus | Output only. The compatibility status of the control plane. It should be empty if the cluster does not have emulated version. |

### `MasterAuth`

- The authentication information for accessing the master endpoint. Authentication can be done using HTTP basic auth or using client certificates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientCertificate` | string | Output only. Base64-encoded public certificate used by clients to authenticate to the cluster endpoint. Issued only if client_certificate_config is set. |
| `clientCertificateConfig` | ClientCertificateConfig | Configuration for client certificate authentication on the cluster. For clusters before v1.12, if no configuration is specified, a client certificate is issued. |
| `clientKey` | string | Output only. Base64-encoded private key used by clients to authenticate to the cluster endpoint. |
| `clusterCaCertificate` | string | Output only. Base64-encoded public certificate that is the root of trust for the cluster. |
| `password` | string | The password to use for HTTP basic authentication to the master endpoint. Because the master endpoint is open to the Internet, you should create a strong password. If a password is provided for cluster creation, username must be non-empty. Warning: basic authentication is deprecated, and will be removed in GKE control plane versions 1.19 and newer. For a list of recommended authentication methods, see: https://cloud.google.com/kubernetes-engine/docs/how-to/api-server-authentication |
| `username` | string | The username to use for HTTP basic authentication to the master endpoint. For clusters v1.6.0 and later, basic authentication can be disabled by leaving username unspecified (or setting it to the empty string). Warning: basic authentication is deprecated, and will be removed in GKE control plane versions 1.19 and newer. For a list of recommended authentication methods, see: https://cloud.google.com/kubernetes-engine/docs/how-to/api-server-authentication |

### `MasterAuthorizedNetworksConfig`

- Configuration options for the master authorized networks feature. Enabled master authorized networks will disallow all external traffic to access Kubernetes master through HTTPS except traffic from the given CIDR blocks, Google Compute Engine Public IPs and Google Prod IPs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cidrBlocks` | array<CidrBlock> | cidr_blocks define up to 50 external networks that could access Kubernetes master through HTTPS. |
| `enabled` | boolean | Whether or not master authorized networks is enabled. |
| `gcpPublicCidrsAccessEnabled` | boolean | Whether master is accessible via Google Compute Engine Public IP addresses. |
| `privateEndpointEnforcementEnabled` | boolean | Whether master authorized networks is enforced on private endpoint or not. |

### `MaxPodsConstraint`

- Constraints applied to pods.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxPodsPerNode` | string (int64) | Constraint enforced on the max num of pods per node. |

### `MemoryManager`

- The option enables the Kubernetes NUMA-aware Memory Manager feature. Detailed description about the feature can be found here (https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | string | Controls the memory management policy on the Node. See https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/#policies The following values are allowed. \* "none" \* "static" The default value is 'none' if unspecified. |

### `MeshCertificates`

- Configuration for issuance of mTLS keys and certificates to Kubernetes pods.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableCertificates` | boolean | enable_certificates controls issuance of workload mTLS certificates. If set, the GKE Workload Identity Certificates controller and node agent will be deployed in the cluster, which can then be configured by creating a WorkloadCertificateConfig Custom Resource. Requires Workload Identity (workload_pool must be non-empty). |

### `Metric`

- Progress metric is (string, int|float|string) pair.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `doubleValue` | number (double) | For metrics with floating point value. |
| `intValue` | string (int64) | For metrics with integer value. |
| `name` | string | Required. Metric name, e.g., "nodes total", "percent done". |
| `stringValue` | string | For metrics with custom values (ratios, visual progress, etc.). |

### `MonitoringComponentConfig`

- MonitoringComponentConfig is cluster monitoring component configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableComponents` | array<string> | Select components to collect metrics. An empty set would disable all monitoring. Values: `COMPONENT_UNSPECIFIED`, `SYSTEM_COMPONENTS`, `APISERVER`, `SCHEDULER`, `CONTROLLER_MANAGER`, `STORAGE`, `HPA`, `POD`, `DAEMONSET`, `DEPLOYMENT`, `STATEFULSET`, `CADVISOR`, `KUBELET`, `DCGM`, `JOBSET`. |

### `MonitoringConfig`

- MonitoringConfig is cluster monitoring configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advancedDatapathObservabilityConfig` | AdvancedDatapathObservabilityConfig | Configuration of Advanced Datapath Observability features. |
| `componentConfig` | MonitoringComponentConfig | Monitoring components configuration |
| `managedPrometheusConfig` | ManagedPrometheusConfig | Enable Google Cloud Managed Service for Prometheus in the cluster. |

### `NetworkConfig`

- NetworkConfig reports the relative names of network & subnetwork.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ambientNetworkingConfig` | AmbientNetworkingConfig | Optional. Contains the desired config of Ambient Networking mode on this cluster. |
| `datapathProvider` | string enum | The desired datapath provider for this cluster. By default, uses the IPTables-based kube-proxy implementation. Values: `DATAPATH_PROVIDER_UNSPECIFIED`, `LEGACY_DATAPATH`, `ADVANCED_DATAPATH`, `MIGRATE_TO_ADVANCED_DATAPATH`, `MIGRATE_TO_LEGACY_DATAPATH`. |
| `dataplaneV2Config` | DataplaneV2Config | Optional. DataplaneV2Config specifies the DPv2 configuration. |
| `defaultEnablePrivateNodes` | boolean | Controls whether by default nodes have private IP addresses only. It is invalid to specify both PrivateClusterConfig.enablePrivateNodes and this field at the same time. To update the default setting, use ClusterUpdate.desired_default_enable_private_nodes |
| `defaultSnatStatus` | DefaultSnatStatus | Whether the cluster disables default in-node sNAT rules. In-node sNAT rules will be disabled when default_snat_status is disabled. When disabled is set to false, default IP masquerade rules will be applied to the nodes to prevent sNAT on cluster internal traffic. |
| `disableL4LbFirewallReconciliation` | boolean | Disable L4 load balancer VPC firewalls to enable firewall policies. |
| `dnsConfig` | DNSConfig | DNSConfig contains clusterDNS config for this cluster. |
| `enableCiliumClusterwideNetworkPolicy` | boolean | Whether CiliumClusterwideNetworkPolicy is enabled on this cluster. |
| `enableFqdnNetworkPolicy` | boolean | Whether FQDN Network Policy is enabled on this cluster. |
| `enableIntraNodeVisibility` | boolean | Whether Intra-node visibility is enabled for this cluster. This makes same node pod to pod traffic visible for VPC network. |
| `enableL4ilbSubsetting` | boolean | Whether L4ILB Subsetting is enabled for this cluster. |
| `enableMultiNetworking` | boolean | Whether multi-networking is enabled for this cluster. |
| `gatewayApiConfig` | GatewayAPIConfig | GatewayAPIConfig contains the desired config of Gateway API on this cluster. |
| `inTransitEncryptionConfig` | string enum | Specify the details of in-transit encryption. Now named inter-node transparent encryption. Values: `IN_TRANSIT_ENCRYPTION_CONFIG_UNSPECIFIED`, `IN_TRANSIT_ENCRYPTION_DISABLED`, `IN_TRANSIT_ENCRYPTION_INTER_NODE_TRANSPARENT`. |
| `network` | string | Output only. The relative name of the Google Compute Engine network (https://cloud.google.com/compute/docs/networks-and-firewalls#networks) to which the cluster is connected. Example: projects/my-project/global/networks/my-network |
| `networkPerformanceConfig` | ClusterNetworkPerformanceConfig | Network bandwidth tier configuration. |
| `privateIpv6GoogleAccess` | string enum | The desired state of IPv6 connectivity to Google Services. By default, no private IPv6 access to or from Google Services (all access will be via IPv4) Values: `PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED`, `PRIVATE_IPV6_GOOGLE_ACCESS_DISABLED`, `PRIVATE_IPV6_GOOGLE_ACCESS_TO_GOOGLE`, `PRIVATE_IPV6_GOOGLE_ACCESS_BIDIRECTIONAL`. |
| `serviceExternalIpsConfig` | ServiceExternalIPsConfig | ServiceExternalIPsConfig specifies if services with externalIPs field are blocked or not. |
| `subnetwork` | string | Output only. The relative name of the Google Compute Engine subnetwork (https://cloud.google.com/compute/docs/vpc) to which the cluster is connected. Example: projects/my-project/regions/us-central1/subnetworks/my-subnet |

### `NetworkPerformanceConfig`

- Configuration of all network bandwidth tiers
- Version: v1

| Field | Type | Description |
|---|---|---|
| `totalEgressBandwidthTier` | string enum | Specifies the total network bandwidth tier for the NodePool. Values: `TIER_UNSPECIFIED`, `TIER_1`. |

### `NetworkPerformanceConfig` (v1beta1)

- Configuration of all network bandwidth tiers
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `externalIpEgressBandwidthTier` | string enum | Specifies the network bandwidth tier for the NodePool for traffic to external/public IP addresses. Values: `TIER_UNSPECIFIED`, `TIER_1`. |
| `totalEgressBandwidthTier` | string enum | Specifies the total network bandwidth tier for the NodePool. Values: `TIER_UNSPECIFIED`, `TIER_1`. |

### `NetworkPolicy`

- Configuration options for the NetworkPolicy feature. https://kubernetes.io/docs/concepts/services-networking/networkpolicies/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether network policy is enabled on the cluster. |
| `provider` | string enum | The selected network policy provider. Values: `PROVIDER_UNSPECIFIED`, `CALICO`. |

### `NetworkPolicyConfig`

- Configuration for NetworkPolicy. This only tracks whether the addon is enabled or not on the Master, it does not track whether network policy is enabled for the nodes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disabled` | boolean | Whether NetworkPolicy is enabled for this cluster. |

### `NetworkTags`

- Collection of Compute Engine network tags that can be applied to a node's underlying VM instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tags` | array<string> | List of network tags. |

### `NetworkTierConfig`

- NetworkTierConfig contains network tier information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkTier` | string enum | Network tier configuration. Values: `NETWORK_TIER_UNSPECIFIED`, `NETWORK_TIER_DEFAULT`, `NETWORK_TIER_PREMIUM`, `NETWORK_TIER_STANDARD`. |

### `NodeAffinity`

- Specifies the NodeAffinity key, values, and affinity operator according to shared sole tenant node group affinities (https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes#node_affinity_and_anti-affinity).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Key for NodeAffinity. |
| `operator` | string enum | Operator for NodeAffinity. Values: `OPERATOR_UNSPECIFIED`, `IN`, `NOT_IN`. |
| `values` | array<string> | Values for NodeAffinity. |

### `NodeConfig`

- Parameters that describe the nodes in a cluster. GKE Autopilot clusters do not recognize parameters in `NodeConfig`. Use AutoprovisioningNodePoolDefaults instead.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accelerators` | array<AcceleratorConfig> | A list of hardware accelerators to be attached to each node. See https://cloud.google.com/compute/docs/gpus for more information about support for GPUs. |
| `advancedMachineFeatures` | AdvancedMachineFeatures | Advanced features for the Compute Engine VM. |
| `bootDisk` | BootDisk | The boot disk configuration for the node pool. |
| `bootDiskKmsKey` | string | The Customer Managed Encryption Key used to encrypt the boot disk attached to each node in the node pool. This should be of the form projects/\[KEY_PROJECT_ID\]/locations/\[LOCATION\]/keyRings/\[RING_NAME\]/cryptoKeys/\[KEY_NAME\]. For more information about protecting resources with Cloud KMS Keys please see: https://cloud.google.com/compute/docs/disks/customer-managed-encryption |
| `confidentialNodes` | ConfidentialNodes | Confidential nodes config. All the nodes in the node pool will be Confidential VM once enabled. |
| `consolidationDelay` | string (google-duration) | Consolidation delay defines duration after which the Cluster Autoscaler can scale down underutilized nodes. If not set, nodes are scaled down by default behavior, i.e. according to the chosen autoscaling profile. |
| `containerdConfig` | ContainerdConfig | Parameters for containerd customization. |
| `diskSizeGb` | integer (int32) | Size of the disk attached to each node, specified in GB. The smallest allowed disk size is 15 GB for node pools running GKE versions 1.36.3-gke.1480000 or later. Or, for earlier versions, the smallest allowed disk size is 12 GB. If unspecified, the default disk size is 100GB. |
| `diskType` | string | Type of the disk attached to each node (e.g. 'pd-standard', 'pd-ssd' or 'pd-balanced') If unspecified, the default disk type is 'pd-standard' |
| `effectiveCgroupMode` | string enum | Output only. effective_cgroup_mode is the cgroup mode actually used by the node pool. It is determined by the cgroup mode specified in the LinuxNodeConfig or the default cgroup mode based on the cluster creation version. Values: `EFFECTIVE_CGROUP_MODE_UNSPECIFIED`, `EFFECTIVE_CGROUP_MODE_V1`, `EFFECTIVE_CGROUP_MODE_V2`. |
| `enableConfidentialStorage` | boolean | Optional. Reserved for future use. |
| `ephemeralStorageLocalSsdConfig` | EphemeralStorageLocalSsdConfig | Parameters for the node ephemeral storage using Local SSDs. If unspecified, ephemeral storage is backed by the boot disk. |
| `fastSocket` | FastSocket | Enable or disable NCCL fast socket for the node pool. |
| `flexStart` | boolean | Flex Start flag for enabling Flex Start VM. |
| `gcfsConfig` | GcfsConfig | Google Container File System (image streaming) configs. |
| `gpuDirectConfig` | GPUDirectConfig | The configuration for GPU Direct |
| `gvnic` | VirtualNIC | Enable or disable gvnic in the node pool. |
| `imageType` | string | The image type to use for this node. Note that for a given image type, the latest version of it will be used. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types. |
| `kubeletConfig` | NodeKubeletConfig | Node kubelet configs. |
| `labels` | object | The Kubernetes labels (key/value pairs) to apply to each node. The values in this field are added to the set of default labels Kubernetes applies to nodes. This field has the following restrictions: \* Labels must use a valid Kubernetes syntax and character set, as defined in https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set. \* This field supports up to 1,024 total characters in a single request. Depending on the Kubernetes version, keys in this field might conflict with the keys of the default labels, which might change which of your labels are applied to the nodes. Assume that the behavior is unpredictable and avoid label key conflicts. For more information about the default labels, see: https://kubernetes.io/docs/reference/labels-annotations-taints/ |
| `linuxNodeConfig` | LinuxNodeConfig | Parameters that can be configured on Linux nodes. |
| `localNvmeSsdBlockConfig` | LocalNvmeSsdBlockConfig | Parameters for using raw-block Local NVMe SSDs. |
| `localSsdCount` | integer (int32) | The number of local SSD disks to be attached to the node. The limit for this value is dependent upon the maximum number of disks available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. |
| `localSsdEncryptionMode` | string enum | Specifies which method should be used for encrypting the Local SSDs attached to the node. Values: `LOCAL_SSD_ENCRYPTION_MODE_UNSPECIFIED`, `STANDARD_ENCRYPTION`, `EPHEMERAL_KEY_ENCRYPTION`. |
| `loggingConfig` | NodePoolLoggingConfig | Logging configuration. |
| `machineType` | string | The name of a Google Compute Engine machine type (https://cloud.google.com/compute/docs/machine-types) If unspecified, the default machine type is `e2-medium`. |
| `maxRunDuration` | string (google-duration) | The maximum duration for the nodes to exist. If unspecified, the nodes can exist indefinitely. |
| `metadata` | object | The metadata key/value pairs assigned to instances in the cluster. Keys must conform to the regexp `[a-zA-Z0-9-_]+` and be less than 128 bytes in length. These are reflected as part of a URL in the metadata server. Additionally, to avoid ambiguity, keys must not conflict with any other metadata keys for the project or be one of the reserved keys: - "cluster-location" - "cluster-name" - "cluster-uid" - "configure-sh" - "containerd-configure-sh" - "enable-os-login" - "gci-ensure-gke-docker" - "gci-metrics-enabled" - "gci-update-strategy" - "instance-template" - "kube-env" - "startup-script" - "user-data" - "disable-address-manager" - "windows-startup-script-ps1" - "common-psm1" - "k8s-node-setup-psm1" - "install-ssh-psm1" - "user-profile-psm1" Values are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on them is that each value's size must be less than or equal to 32 KB. The total size of all keys and values must be less than 512 KB. |
| `minCpuPlatform` | string | Minimum CPU platform to be used by this instance. The instance may be scheduled on the specified or newer CPU platform. Applicable values are the friendly names of CPU platforms, such as `minCpuPlatform: "Intel Haswell"` or `minCpuPlatform: "Intel Sandy Bridge"`. For more information, read how to specify min CPU platform (https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform) |
| `nodeGroup` | string | Setting this field will assign instances of this pool to run on the specified node group. This is useful for running workloads on sole tenant nodes (https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes). |
| `nodeImageConfig` | CustomImageConfig | The node image configuration to use for this node pool. Note that this is only applicable for node pools using image_type=CUSTOM. |
| `oauthScopes` | array<string> | The set of Google API scopes to be made available on all of the node VMs under the "default" service account. The following scopes are recommended, but not required, and by default are not included: \* `https://www.googleapis.com/auth/compute` is required for mounting persistent storage on your nodes. \* `https://www.googleapis.com/auth/devstorage.read_only` is required for communicating with \*\*gcr.io\*\* (the Artifact Registry (https://cloud.google.com/artifact-registry/)). If unspecified, no scopes are added, unless Cloud Logging or Cloud Monitoring are enabled, in which case their required scopes will be added. |
| `preemptible` | boolean | Whether the nodes are created as preemptible VM instances. See: https://cloud.google.com/compute/docs/instances/preemptible for more information about preemptible VM instances. |
| `reservationAffinity` | ReservationAffinity | The optional reservation affinity. Setting this field will apply the specified Zonal Compute Reservation (https://cloud.google.com/compute/docs/instances/reserving-zonal-resources) to this node pool. |
| `resourceLabels` | object | The resource labels for the node pool to use to annotate any related Google Compute Engine resources. |
| `resourceManagerTags` | ResourceManagerTags | A map of resource manager tag keys and values to be attached to the nodes. |
| `sandboxConfig` | SandboxConfig | Sandbox configuration for this node. |
| `secondaryBootDiskUpdateStrategy` | SecondaryBootDiskUpdateStrategy | Secondary boot disk update strategy. |
| `secondaryBootDisks` | array<SecondaryBootDisk> | List of secondary boot disks attached to the nodes. |
| `serviceAccount` | string | The Google Cloud Platform Service Account to be used by the node VMs. Specify the email address of the Service Account; otherwise, if no Service Account is specified, the "default" service account is used. |
| `shieldedInstanceConfig` | ShieldedInstanceConfig | Shielded Instance options. |
| `soleTenantConfig` | SoleTenantConfig | Parameters for node pools to be backed by shared sole tenant node groups. |
| `spot` | boolean | Spot flag for enabling Spot VM, which is a rebrand of the existing preemptible flag. |
| `storagePools` | array<string> | List of Storage Pools where boot disks are provisioned. |
| `tags` | array<string> | The list of instance tags applied to all nodes. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during cluster or node pool creation. Each tag within the list must comply with RFC1035. |
| `taintConfig` | TaintConfig | Optional. The taint configuration for the node pool. |
| `taints` | array<NodeTaint> | List of kubernetes taints to be applied to each node. For more information, including usage and the valid values, see: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/ |
| `windowsNodeConfig` | WindowsNodeConfig | Parameters that can be configured on Windows nodes. |
| `workloadMetadataConfig` | WorkloadMetadataConfig | The workload metadata configuration for this node. |

### `NodeConfig` (v1beta1)

- Parameters that describe the nodes in a cluster. GKE Autopilot clusters do not recognize parameters in `NodeConfig`. Use AutoprovisioningNodePoolDefaults instead.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `accelerators` | array<AcceleratorConfig> | A list of hardware accelerators to be attached to each node. See https://cloud.google.com/compute/docs/gpus for more information about support for GPUs. |
| `advancedMachineFeatures` | AdvancedMachineFeatures | Advanced features for the Compute Engine VM. |
| `bootDisk` | BootDisk | Boot disk configuration for the node pool. |
| `bootDiskKmsKey` | string | The Customer Managed Encryption Key used to encrypt the boot disk attached to each node in the node pool. This should be of the form projects/\[KEY_PROJECT_ID\]/locations/\[LOCATION\]/keyRings/\[RING_NAME\]/cryptoKeys/\[KEY_NAME\]. For more information about protecting resources with Cloud KMS Keys please see: https://cloud.google.com/compute/docs/disks/customer-managed-encryption |
| `confidentialNodes` | ConfidentialNodes | Confidential nodes config. All the nodes in the node pool will be Confidential VM once enabled. |
| `consolidationDelay` | string (google-duration) | Consolidation delay defines duration after which the Cluster Autoscaler can scale down underutilized nodes. If not set, nodes are scaled down by default behavior, i.e. according to the chosen autoscaling profile. |
| `containerdConfig` | ContainerdConfig | Parameters for containerd customization. |
| `diskSizeGb` | integer (int32) | Size of the disk attached to each node, specified in GB. The smallest allowed disk size is 15 GB for node pools running GKE versions 1.36.2-gke.2933000 or later. Or, for earlier versions, the smallest allowed disk size is 12 GB. If unspecified, the default disk size is 100GB. |
| `diskType` | string | Type of the disk attached to each node (e.g. 'pd-standard', 'pd-ssd' or 'pd-balanced') If unspecified, the default disk type is 'pd-standard' |
| `effectiveCgroupMode` | string enum | Output only. effective_cgroup_mode is the cgroup mode actually used by the node pool. It is determined by the cgroup mode specified in the LinuxNodeConfig or the default cgroup mode based on the cluster creation version. Values: `EFFECTIVE_CGROUP_MODE_UNSPECIFIED`, `EFFECTIVE_CGROUP_MODE_V1`, `EFFECTIVE_CGROUP_MODE_V2`. |
| `enableConfidentialStorage` | boolean | Optional. Reserved for future use. |
| `ephemeralStorageConfig` | EphemeralStorageConfig | Parameters for the ephemeral storage filesystem. If unspecified, ephemeral storage is backed by the boot disk. |
| `ephemeralStorageLocalSsdConfig` | EphemeralStorageLocalSsdConfig | Parameters for the node ephemeral storage using Local SSDs. If unspecified, ephemeral storage is backed by the boot disk. This field is functionally equivalent to the ephemeral_storage_config |
| `fastSocket` | FastSocket | Enable or disable NCCL fast socket for the node pool. |
| `flexStart` | boolean | Flex Start flag for enabling Flex Start VM. |
| `gcfsConfig` | GcfsConfig | GCFS (Google Container File System) configs. |
| `gpuDirectConfig` | GPUDirectConfig | The configuration for GPU Direct |
| `gvnic` | VirtualNIC | Enable or disable gvnic on the node pool. |
| `hostMaintenancePolicy` | HostMaintenancePolicy | HostMaintenancePolicy contains the desired maintenance policy for the Google Compute Engine hosts. |
| `imageType` | string | The image type to use for this node. Note that for a given image type, the latest version of it will be used. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types. |
| `kubeletConfig` | NodeKubeletConfig | Node kubelet configs. |
| `labels` | object | The Kubernetes labels (key/value pairs) to apply to each node. The values in this field are added to the set of default labels Kubernetes applies to nodes. This field has the following restrictions: \* Labels must use a valid Kubernetes syntax and character set, as defined in https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set. \* This field supports up to 1,024 total characters in a single request. Depending on the Kubernetes version, keys in this field might conflict with the keys of the default labels, which might change which of your labels are applied to the nodes. Assume that the behavior is unpredictable and avoid label key conflicts. For more information about the default labels, see: https://kubernetes.io/docs/reference/labels-annotations-taints/ |
| `linuxNodeConfig` | LinuxNodeConfig | Parameters that can be configured on Linux nodes. |
| `localNvmeSsdBlockConfig` | LocalNvmeSsdBlockConfig | Parameters for using raw-block Local NVMe SSDs. |
| `localSsdCount` | integer (int32) | The number of local SSD disks to be attached to the node. The limit for this value is dependent upon the maximum number of disks available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. |
| `localSsdEncryptionMode` | string enum | Specifies which method should be used for encrypting the Local SSDs attached to the node. Values: `LOCAL_SSD_ENCRYPTION_MODE_UNSPECIFIED`, `STANDARD_ENCRYPTION`, `EPHEMERAL_KEY_ENCRYPTION`. |
| `loggingConfig` | NodePoolLoggingConfig | Logging configuration. |
| `machineType` | string | The name of a Google Compute Engine machine type (https://cloud.google.com/compute/docs/machine-types). If unspecified, the default machine type is `e2-medium`. |
| `maxRunDuration` | string (google-duration) | The maximum duration for the nodes to exist. If unspecified, the nodes can exist indefinitely. |
| `metadata` | object | The metadata key/value pairs assigned to instances in the cluster. Keys must conform to the regexp `[a-zA-Z0-9-_]+` and be less than 128 bytes in length. These are reflected as part of a URL in the metadata server. Additionally, to avoid ambiguity, keys must not conflict with any other metadata keys for the project or be one of the reserved keys: - "cluster-location" - "cluster-name" - "cluster-uid" - "configure-sh" - "containerd-configure-sh" - "enable-oslogin" - "gci-ensure-gke-docker" - "gci-metrics-enabled" - "gci-update-strategy" - "instance-template" - "kube-env" - "startup-script" - "user-data" - "disable-address-manager" - "windows-startup-script-ps1" - "common-psm1" - "k8s-node-setup-psm1" - "install-ssh-psm1" - "user-profile-psm1" Values are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on them is that each value's size must be less than or equal to 32 KB. The total size of all keys and values must be less than 512 KB. |
| `minCpuPlatform` | string | Minimum CPU platform to be used by this instance. The instance may be scheduled on the specified or newer CPU platform. Applicable values are the friendly names of CPU platforms, such as `minCpuPlatform: "Intel Haswell"` or `minCpuPlatform: "Intel Sandy Bridge"`. For more information, read how to specify min CPU platform (https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform). |
| `nodeGroup` | string | Setting this field will assign instances of this pool to run on the specified node group. This is useful for running workloads on sole tenant nodes (https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes). |
| `nodeImageConfig` | CustomImageConfig | The node image configuration to use for this node pool. Note that this is only applicable for node pools using image_type=CUSTOM. |
| `oauthScopes` | array<string> | The set of Google API scopes to be made available on all of the node VMs under the "default" service account. The following scopes are recommended, but not required, and by default are not included: \* `https://www.googleapis.com/auth/compute` is required for mounting persistent storage on your nodes. \* `https://www.googleapis.com/auth/devstorage.read_only` is required for communicating with \*\*gcr.io\*\* (the Artifact Registry (https://cloud.google.com/artifact-registry/)). If unspecified, no scopes are added, unless Cloud Logging or Cloud Monitoring are enabled, in which case their required scopes will be added. |
| `preemptible` | boolean | Whether the nodes are created as preemptible VM instances. See: https://cloud.google.com/compute/docs/instances/preemptible for more information about preemptible VM instances. |
| `reservationAffinity` | ReservationAffinity | The optional reservation affinity. Setting this field will apply the specified Zonal Compute Reservation (https://cloud.google.com/compute/docs/instances/reserving-zonal-resources) to this node pool. |
| `resourceLabels` | object | The resource labels for the node pool to use to annotate any related Google Compute Engine resources. |
| `resourceManagerTags` | ResourceManagerTags | A map of resource manager tag keys and values to be attached to the nodes. |
| `sandboxConfig` | SandboxConfig | Sandbox configuration for this node. |
| `secondaryBootDiskUpdateStrategy` | SecondaryBootDiskUpdateStrategy | Secondary boot disk update strategy. |
| `secondaryBootDisks` | array<SecondaryBootDisk> | List of secondary boot disks attached to the nodes. |
| `serviceAccount` | string | The Google Cloud Platform Service Account to be used by the node VMs. Specify the email address of the Service Account; otherwise, if no Service Account is specified, the "default" service account is used. |
| `shieldedInstanceConfig` | ShieldedInstanceConfig | Shielded Instance options. |
| `soleTenantConfig` | SoleTenantConfig | Parameters for node pools to be backed by shared sole tenant node groups. |
| `spot` | boolean | Spot flag for enabling Spot VM, which is a rebrand of the existing preemptible flag. |
| `storagePools` | array<string> | List of Storage Pools where boot disks are provisioned. |
| `tags` | array<string> | The list of instance tags applied to all nodes. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during cluster or node pool creation. Each tag within the list must comply with RFC1035. |
| `taintConfig` | TaintConfig | Optional. The taint configuration for the node pool. |
| `taints` | array<NodeTaint> | List of kubernetes taints to be applied to each node. For more information, including usage and the valid values, see: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/ |
| `windowsNodeConfig` | WindowsNodeConfig | Parameters that can be configured on Windows nodes. |
| `workloadMetadataConfig` | WorkloadMetadataConfig | The workload metadata configuration for this node. |

### `NodeConfigDefaults`

- Subset of NodeConfig message that has defaults.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `containerdConfig` | ContainerdConfig | Parameters for containerd customization. |
| `gcfsConfig` | GcfsConfig | GCFS (Google Container File System, also known as Riptide) options. |
| `loggingConfig` | NodePoolLoggingConfig | Logging configuration for node pools. |
| `nodeKubeletConfig` | NodeKubeletConfig | NodeKubeletConfig controls the defaults for new node-pools. Currently only `insecure_kubelet_readonly_port_enabled` can be set here. |

### `NodeConfigDefaults` (v1beta1)

- Subset of NodeConfig message that has defaults.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `containerdConfig` | ContainerdConfig | Parameters for containerd customization. |
| `gcfsConfig` | GcfsConfig | GCFS (Google Container File System, also known as Riptide) options. |
| `hostMaintenancePolicy` | HostMaintenancePolicy | HostMaintenancePolicy contains the desired maintenance policy for the Google Compute Engine hosts. |
| `loggingConfig` | NodePoolLoggingConfig | Logging configuration for node pools. |
| `nodeKubeletConfig` | NodeKubeletConfig | NodeKubeletConfig controls the defaults for new node-pools. Currently only `insecure_kubelet_readonly_port_enabled` can be set here. |

### `NodeCreationConfig`

- NodeCreationConfig defines the settings of node creation mode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodeCreationMode` | string enum | The mode of node creation. Values: `MODE_UNSPECIFIED`, `VIA_KUBELET`, `VIA_CONTROL_PLANE`. |

### `NodeDrainConfig`

- NodeDrainConfig contains the node drain related configurations for this node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `graceTerminationDuration` | string (google-duration) | The duration of the grace termination period for node drain. |
| `pdbTimeoutDuration` | string (google-duration) | The duration of the PDB timeout period for node drain. |
| `respectPdbDuringNodePoolDeletion` | boolean | Whether to respect PDB during node pool deletion. |

### `NodeKernelModuleLoading`

- Configuration for kernel module loading on nodes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | string enum | Set the node module loading policy for nodes in the node pool. Values: `POLICY_UNSPECIFIED`, `ENFORCE_SIGNED_MODULES`, `DO_NOT_ENFORCE_SIGNED_MODULES`. |

### `NodeKubeletConfig`

- Node kubelet configs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedUnsafeSysctls` | array<string> | Optional. Defines a comma-separated allowlist of unsafe sysctls or sysctl patterns (ending in `*`). The unsafe namespaced sysctl groups are `kernel.shm*`, `kernel.msg*`, `kernel.sem`, `fs.mqueue.*`, and `net.*`. Leaving this allowlist empty means they cannot be set on Pods. To allow certain sysctls or sysctl patterns to be set on Pods, list them separated by commas. For example: `kernel.msg*,net.ipv4.route.min_pmtu`. See https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/ for more details. |
| `containerLogMaxFiles` | integer (int32) | Optional. Defines the maximum number of container log files that can be present for a container. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation The value must be an integer between 2 and 10, inclusive. The default value is 5 if unspecified. |
| `containerLogMaxSize` | string | Optional. Defines the maximum size of the container log file before it is rotated. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation Valid format is positive number + unit, e.g. 100Ki, 10Mi. Valid units are Ki, Mi, Gi. The value must be between 10Mi and 500Mi, inclusive. Note that the total container log size (container_log_max_size \* container_log_max_files) cannot exceed 1% of the total storage of the node, to avoid disk pressure caused by log files. The default value is 10Mi if unspecified. |
| `containerLogMaxWorkers` | integer (int32) | Optional. Defines the maximum number of concurrent workers to rotate container log files. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation The value must be an integer between 1 and 10, inclusive. The default value is 1 if unspecified. |
| `containerLogMonitorInterval` | string (google-duration) | Optional. Specifies the interval at which the container logs are monitored for performing the log rotate operation. The value must be a positive interval between 3s and 300s, inclusive. The default value is "10s" if unspecified. |
| `cpuCfsQuota` | boolean | Enable CPU CFS quota enforcement for containers that specify CPU limits. This option is enabled by default which makes kubelet use CFS quota (https://www.kernel.org/doc/Documentation/scheduler/sched-bwc.txt) to enforce container CPU limits. Otherwise, CPU limits will not be enforced at all. Disable this option to mitigate CPU throttling problems while still having your pods to be in Guaranteed QoS class by specifying the CPU limits. The default value is 'true' if unspecified. |
| `cpuCfsQuotaPeriod` | string | Set the CPU CFS quota period value 'cpu.cfs_period_us'. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration between 1ms and 1 second, inclusive. |
| `cpuManagerPolicy` | string | Control the CPU management policy on the node. See https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/ The following values are allowed. \* "none": the default, which represents the existing scheduling behavior. \* "static": allows pods with certain resource characteristics to be granted increased CPU affinity and exclusivity on the node. The default value is 'none' if unspecified. |
| `crashLoopBackOff` | CrashLoopBackOffConfig | Optional. Contains configuration options to modify node-level parameters for container restart behavior. |
| `evictionMaxPodGracePeriodSeconds` | integer (int32) | Optional. eviction_max_pod_grace_period_seconds is the maximum allowed grace period (in seconds) to use when terminating pods in response to a soft eviction threshold being met. This value effectively caps the Pod's terminationGracePeriodSeconds value during soft evictions. Default: 0. Range: \[0, 300\]. |
| `evictionMinimumReclaim` | EvictionMinimumReclaim | Optional. eviction_minimum_reclaim is a map of signal names to quantities that defines minimum reclaims, which describe the minimum amount of a given resource the kubelet will reclaim when performing a pod eviction while that resource is under pressure. |
| `evictionSoft` | EvictionSignals | Optional. eviction_soft is a map of signal names to quantities that defines soft eviction thresholds. Each signal is compared to its corresponding threshold to determine if a pod eviction should occur. |
| `evictionSoftGracePeriod` | EvictionGracePeriod | Optional. eviction_soft_grace_period is a map of signal names to quantities that defines grace periods for each soft eviction signal. The grace period is the amount of time that a pod must be under pressure before an eviction occurs. |
| `imageGcHighThresholdPercent` | integer (int32) | Optional. Defines the percent of disk usage after which image garbage collection is always run. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and greater than image_gc_low_threshold_percent. The default value is 85 if unspecified. |
| `imageGcLowThresholdPercent` | integer (int32) | Optional. Defines the percent of disk usage before which image garbage collection is never run. Lowest disk usage to garbage collect to. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and smaller than image_gc_high_threshold_percent. The default value is 80 if unspecified. |
| `imageMaximumGcAge` | string | Optional. Defines the maximum age an image can be unused before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration greater than image_minimum_gc_age or "0s". The default value is "0s" if unspecified, which disables this field, meaning images won't be garbage collected based on being unused for too long. |
| `imageMinimumGcAge` | string | Optional. Defines the minimum age for an unused image before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration less than or equal to 2 minutes. The default value is "2m0s" if unspecified. |
| `insecureKubeletReadonlyPortEnabled` | boolean | Enable or disable Kubelet read only port. |
| `maxParallelImagePulls` | integer (int32) | Optional. Defines the maximum number of image pulls in parallel. The range is 2 to 5, inclusive. The default value is 2 or 3 depending on the disk type. See https://kubernetes.io/docs/concepts/containers/images/#maximum-parallel-image-pulls for more details. |
| `memoryManager` | MemoryManager | Optional. Controls NUMA-aware Memory Manager configuration on the node. For more information, see: https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/ |
| `podPidsLimit` | string (int64) | Set the Pod PID limits. See https://kubernetes.io/docs/concepts/policy/pid-limiting/#pod-pid-limits Controls the maximum number of processes allowed to run in a pod. The value must be greater than or equal to 1024 and less than 4194304. |
| `reservedResourcesConfig` | ReservedResourcesConfig | Optional. Controls the reserved resources on the node. Only included if any fields are specified. |
| `reservedSystemCpus` | string | Optional. The reserved_system_cpus option specifies the CPU list reserved for the host system services. Format: a list of CPU IDs (e.g. "0-3", "0,1") that can be parsed as a cpuset. |
| `shutdownGracePeriodCriticalPodsSeconds` | integer (int32) | Optional. shutdown_grace_period_critical_pods_seconds is the maximum allowed grace period (in seconds) used to terminate critical pods during a node shutdown. This value should be <= shutdown_grace_period_seconds, and is only valid if shutdown_grace_period_seconds is set. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ Range: \[0, 120\]. |
| `shutdownGracePeriodSeconds` | integer (int32) | Optional. shutdown_grace_period_seconds is the maximum allowed grace period (in seconds) the total duration that the node should delay the shutdown during a graceful shutdown. This is the total grace period for pod termination for both regular and critical pods. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ If set to 0, node will not enable the graceful node shutdown functionality. This field is only valid for Spot VMs. Allowed values: 0, 30, 120. |
| `singleProcessOomKill` | boolean | Optional. Defines whether to enable single process OOM killer. If true, will prevent the memory.oom.group flag from being set for container cgroups in cgroups v2. This causes processes in the container to be OOM killed individually instead of as a group. |
| `topologyManager` | TopologyManager | Optional. Controls Topology Manager configuration on the node. For more information, see: https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/ |

### `NodeLabels`

- Collection of node-level Kubernetes labels (https://kubernetes.io/docs/concepts/overview/working-with-objects/labels).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labels` | object | Map of node label keys and node label values. |

### `NodeManagement`

- NodeManagement defines the set of node management services turned on for the node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoRepair` | boolean | A flag that specifies whether the node auto-repair is enabled for the node pool. If enabled, the nodes in this node pool will be monitored and, if they fail health checks too many times, an automatic repair action will be triggered. |
| `autoUpgrade` | boolean | A flag that specifies whether node auto-upgrade is enabled for the node pool. If enabled, node auto-upgrade helps keep the nodes in your node pool up to date with the latest release version of Kubernetes. |
| `upgradeOptions` | AutoUpgradeOptions | Specifies the Auto Upgrade knobs for the node pool. |

### `NodeNetworkConfig`

- Parameters for node pool-level network config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorNetworkProfile` | string | Immutable. The accelerator network profile for the node pool. For now the only valid value is "auto". If specified, the network configuration of the nodes in this node pool will be managed by this profile for the supported machine types, zone, etc. |
| `additionalNodeNetworkConfigs` | array<AdditionalNodeNetworkConfig> | We specify the additional node networks for this node pool using this list. Each node network corresponds to an additional interface |
| `additionalPodNetworkConfigs` | array<AdditionalPodNetworkConfig> | We specify the additional pod networks for this node pool using this list. Each pod network corresponds to an additional alias IP range for the node |
| `createPodRange` | boolean | Input only. Whether to create a new range for pod IPs in this node pool. Defaults are provided for `pod_range` and `pod_ipv4_cidr_block` if they are not specified. If neither `create_pod_range` or `pod_range` are specified, the cluster-level default (`ip_allocation_policy.cluster_ipv4_cidr_block`) is used. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created. |
| `datapathProvider` | string enum | The datapath provider for this node pool. Values: `DATAPATH_PROVIDER_UNSPECIFIED`, `LEGACY_DATAPATH`, `ADVANCED_DATAPATH`, `MIGRATE_TO_ADVANCED_DATAPATH`, `MIGRATE_TO_LEGACY_DATAPATH`. |
| `enablePrivateNodes` | boolean | Whether nodes have internal IP addresses only. If enable_private_nodes is not specified, then the value is derived from Cluster.NetworkConfig.default_enable_private_nodes |
| `network` | string | Optional. Immutable. The VPC network for the node pool. |
| `networkPerformanceConfig` | NetworkPerformanceConfig | Network bandwidth tier configuration. |
| `networkTierConfig` | NetworkTierConfig | Output only. The network tier configuration for the node pool inherits from the cluster-level configuration and remains immutable throughout the node pool's lifecycle, including during upgrades. |
| `podCidrOverprovisionConfig` | PodCIDROverprovisionConfig | \[PRIVATE FIELD\] Pod CIDR size overprovisioning config for the node pool. Pod CIDR size per node depends on max_pods_per_node. By default, the value of max_pods_per_node is rounded off to next power of 2 and we then double that to get the size of pod CIDR block per node. Example: max_pods_per_node of 30 would result in 64 IPs (/26). This config can disable the doubling of IPs (we still round off to next power of 2) Example: max_pods_per_node of 30 will result in 32 IPs (/27) when overprovisioning is disabled. |
| `podIpv4CidrBlock` | string | The IP address range for pod IPs in this node pool. Only applicable if `create_pod_range` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a CIDR (https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) to pick a specific range to use. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created. |
| `podIpv4RangeUtilization` | number (double) | Output only. The utilization of the IPv4 range for the pod. The ratio is Usage/\[Total number of IPs in the secondary range\], Usage=numNodes\*numZones\*podIPsPerNode. |
| `podRange` | string | The ID of the secondary range for pod IPs. If `create_pod_range` is true, this ID is used for the new range. If `create_pod_range` is false, uses an existing secondary range with this ID. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created. |
| `subnetwork` | string | Optional. The subnetwork name/path for the node pool. Format: projects/{project}/regions/{region}/subnetworks/{subnetwork} If the cluster is associated with multiple subnetworks, the subnetwork can be either: - A user supplied subnetwork name during node pool creation (e.g., `my-subnet`). The name must be between 1 and 63 characters long, start with a letter, contain only letters, numbers, and hyphens, and end with a letter or a number. - A full subnetwork path during node pool creation, such as `projects/gke-project/regions/us-central1/subnetworks/my-subnet` - A subnetwork path picked based on the IP utilization during node pool creation and is immutable. |

### `NodePool`

- NodePool contains the name and configuration for a cluster's node pool. Node pools are a set of nodes (i.e. VM's), with a common configuration and specification, under the control of the cluster master. They may have a set of Kubernetes labels applied to them, which may be used to reference them during pod scheduling. They may also be resized up or down, to accommodate the workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autopilotConfig` | AutopilotConfig | Specifies the autopilot configuration for this node pool. This field is exclusively reserved for Cluster Autoscaler. |
| `autoscaling` | NodePoolAutoscaling | Autoscaler configuration for this NodePool. Autoscaler is enabled only if a valid configuration is present. |
| `bestEffortProvisioning` | BestEffortProvisioning | Enable best effort provisioning for nodes |
| `conditions` | array<StatusCondition> | Output only. Which conditions caused the current node pool state. |
| `config` | NodeConfig | The node configuration of the pool. |
| `etag` | string | Output only. This checksum is computed by the server based on the value of node pool fields, and may be sent on update requests to ensure the client has an up-to-date value before proceeding. |
| `initialNodeCount` | integer (int32) | The initial node count for the pool. You must ensure that your Compute Engine resource quota (https://cloud.google.com/compute/quotas) is sufficient for this number of instances. You must also have available firewall and routes quota. |
| `instanceGroupUrls` | array<string> | Output only. The resource URLs of the managed instance groups (https://cloud.google.com/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with this node pool. During the node pool blue-green upgrade operation, the URLs contain both blue and green resources. |
| `kubeletCertInfo` | KubeletCertInfo | Output only. Contains expiry information about the kubelet certificate. |
| `locations` | array<string> | The list of Google Compute Engine zones (https://cloud.google.com/compute/docs/zones#available) in which the NodePool's nodes should be located. If this value is unspecified during node pool creation, the Cluster.Locations (https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters#Cluster.FIELDS.locations) value will be used, instead. Warning: changing node pool locations will result in nodes being added and/or removed. |
| `maintenancePolicy` | NodePoolMaintenancePolicy | Optional. Specifies the maintenance policy for the node pool. |
| `management` | NodeManagement | NodeManagement configuration for this NodePool. |
| `maxPodsConstraint` | MaxPodsConstraint | The constraint on the maximum number of pods that can be run simultaneously on a node in the node pool. |
| `name` | string | The name of the node pool. |
| `networkConfig` | NodeNetworkConfig | Networking configuration for this NodePool. If specified, it overrides the cluster-level defaults. |
| `nodeDrainConfig` | NodeDrainConfig | Specifies the node drain configuration for this node pool. |
| `placementPolicy` | PlacementPolicy | Specifies the node placement policy. |
| `podIpv4CidrSize` | integer (int32) | Output only. The pod CIDR block size per node in this node pool. |
| `queuedProvisioning` | QueuedProvisioning | Specifies the configuration of queued provisioning. |
| `selfLink` | string | Output only. Server-defined URL for the resource. |
| `status` | string enum | Output only. The status of the nodes in this pool instance. Values: `STATUS_UNSPECIFIED`, `PROVISIONING`, `RUNNING`, `RUNNING_WITH_ERROR`, `RECONCILING`, `STOPPING`, `ERROR`. |
| `statusMessage` | string | Output only. Deprecated. Use conditions instead. Additional information about the current status of this node pool instance, if available. |
| `updateInfo` | UpdateInfo | Output only. Update info contains relevant information during a node pool update. |
| `upgradeSettings` | UpgradeSettings | Upgrade settings control disruption and speed of the upgrade. |
| `version` | string | The version of Kubernetes running on this NodePool's nodes. If unspecified, it defaults as described here (https://cloud.google.com/kubernetes-engine/versioning#specifying_node_version). |

### `NodePoolAutoConfig`

- Node pool configs that apply to all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `linuxNodeConfig` | LinuxNodeConfig | Output only. Configuration options for Linux nodes. |
| `networkTags` | NetworkTags | The list of instance tags applied to all nodes. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during cluster creation. Each tag within the list must comply with RFC1035. |
| `nodeKubeletConfig` | NodeKubeletConfig | NodeKubeletConfig controls the defaults for autoprovisioned node-pools. Currently only `insecure_kubelet_readonly_port_enabled` can be set here. |
| `resourceManagerTags` | ResourceManagerTags | Resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies. |

### `NodePoolAutoscaling`

- NodePoolAutoscaling contains information required by cluster autoscaler to adjust the size of the node pool to the current cluster usage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoprovisioned` | boolean | Can this node pool be deleted automatically. |
| `enabled` | boolean | Is autoscaling enabled for this node pool. |
| `locationPolicy` | string enum | Location policy used when scaling up a node pool. Values: `LOCATION_POLICY_UNSPECIFIED`, `BALANCED`, `ANY`. |
| `maxNodeCount` | integer (int32) | Maximum number of nodes for one location in the node pool. Must be >= min_node_count. There has to be enough quota to scale up the cluster. |
| `minNodeCount` | integer (int32) | Minimum number of nodes for one location in the node pool. Must be greater than or equal to 0 and less than or equal to max_node_count. |
| `totalMaxNodeCount` | integer (int32) | Maximum number of nodes in the node pool. Must be greater than or equal to total_min_node_count. There has to be enough quota to scale up the cluster. The total\_\*\_node_count fields are mutually exclusive with the \*\_node_count fields. |
| `totalMinNodeCount` | integer (int32) | Minimum number of nodes in the node pool. Must be greater than or equal to 0 and less than or equal to total_max_node_count. The total\_\*\_node_count fields are mutually exclusive with the \*\_node_count fields. |

### `NodePoolDefaults`

- Subset of Nodepool message that has defaults.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodeConfigDefaults` | NodeConfigDefaults | Subset of NodeConfig message that has defaults. |

### `NodePoolLoggingConfig`

- NodePoolLoggingConfig specifies logging configuration for node pools.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `variantConfig` | LoggingVariantConfig | Logging variant configuration. |

### `NodePoolMaintenancePolicy`

- Defines the maintenance policy for the node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exclusionUntilEndOfSupport` | ExclusionUntilEndOfSupport | Optional. The exclusion until end of support for the node pool. |

### `NodePoolUpgradeConcurrencyConfig`

- NodePoolUpgradeConcurrencyConfig is the configuration for the node pool auto upgrade concurrency.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `maxCount` | string (int64) | If set, no more than max_count node pools can be upgraded concurrently. |

### `NodePoolUpgradeInfo`

- NodePoolUpgradeInfo contains the upgrade information of a node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoUpgradeStatus` | array<string> | The auto upgrade status. Values: `UNKNOWN`, `ACTIVE`, `MINOR_UPGRADE_PAUSED`, `UPGRADE_PAUSED`. |
| `customImageInfo` | CustomImageInfo | Output only. Upgrade info for the node pool specific to the usage of custom images. |
| `endOfExtendedSupportTimestamp` | string | The node pool's current minor version's end of extended support timestamp. |
| `endOfStandardSupportTimestamp` | string | The node pool's current minor version's end of standard support timestamp. |
| `minorTargetVersion` | string | minor_target_version indicates the target version for minor upgrade. |
| `patchTargetVersion` | string | patch_target_version indicates the target version for patch upgrade. |
| `pausedReason` | array<string> | The auto upgrade paused reason. Values: `AUTO_UPGRADE_PAUSED_REASON_UNSPECIFIED`, `MAINTENANCE_WINDOW`, `MAINTENANCE_EXCLUSION_NO_UPGRADES`, `MAINTENANCE_EXCLUSION_NO_MINOR_UPGRADES`, `SYSTEM_CONFIG`. |
| `upgradeDetails` | array<UpgradeDetails> | The list of past auto upgrades. |

### `NodeReadinessConfig`

- Configuration for the GKE Node Readiness Controller.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Whether the GKE Node Readiness Controller is enabled for this cluster. |

### `NodeTaint`

- Kubernetes taint is composed of three fields: key, value, and effect. Effect can only be one of three types: NoSchedule, PreferNoSchedule or NoExecute. See here (https://kubernetes.io/docs/concepts/configuration/taint-and-toleration) for more information, including usage and the valid values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `effect` | string enum | Effect for taint. Values: `EFFECT_UNSPECIFIED`, `NO_SCHEDULE`, `PREFER_NO_SCHEDULE`, `NO_EXECUTE`. |
| `key` | string | Key for taint. |
| `value` | string | Value for taint. |

### `NodeTaints`

- Collection of Kubernetes node taints (https://kubernetes.io/docs/concepts/configuration/taint-and-toleration).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `taints` | array<NodeTaint> | List of node taints. |

### `NodeVfioConfig`

- Configuration settings for VFIO (Virtual Function I/O) on a node. VFIO allows safe, unprivileged, userspace drivers to access I/O devices.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dmaEntryLimit` | integer (int32) | Optional. Specifies the maximum number of DMA entries (pages) that can be mapped by the VFIO IOMMU type 1 driver for a container. This limit affects the total amount of host memory that can be pinned for direct device access, which is often critical for high-performance devices like TPUs and GPUs. This setting corresponds to the kernel parameter at: `/sys/module/vfio_iommu_type1/parameters/dma_entry_limit`. The default value in the kernel is `65535`. Higher values may be needed for workloads mapping large memory regions. Supported values are integers between `65535` and `4194304`. |

### `NotificationConfig`

- NotificationConfig is the configuration of notifications.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pubsub` | PubSub | Notification config for Pub/Sub. |

### `Operation`

- This operation resource represents operations that may have happened or are happening on the cluster. All fields are output only.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterConditions` | array<StatusCondition> | Which conditions caused the current cluster state. Deprecated. Use field error instead. |
| `detail` | string | Output only. Detailed operation progress, if available. |
| `endTime` | string | Output only. The time the operation completed, in RFC3339 (https://www.ietf.org/rfc/rfc3339.txt) text format. |
| `error` | Status | The error result of the operation in case of failure. |
| `location` | string | Output only. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones#available) or region (https://cloud.google.com/compute/docs/regions-zones/regions-zones#available) in which the cluster resides. |
| `name` | string | Output only. The server-assigned ID for the operation. |
| `nodepoolConditions` | array<StatusCondition> | Which conditions caused the current node pool state. Deprecated. Use field error instead. |
| `operationType` | string enum | Output only. The operation type. Values: `TYPE_UNSPECIFIED`, `CREATE_CLUSTER`, `DELETE_CLUSTER`, `UPGRADE_MASTER`, `UPGRADE_NODES`, `REPAIR_CLUSTER`, `UPDATE_CLUSTER`, `CREATE_NODE_POOL`, `DELETE_NODE_POOL`, `SET_NODE_POOL_MANAGEMENT`, `AUTO_REPAIR_NODES`, `AUTO_UPGRADE_NODES`, `SET_LABELS`, `SET_MASTER_AUTH`, `SET_NODE_POOL_SIZE`, `SET_NETWORK_POLICY`, `SET_MAINTENANCE_POLICY`, `RESIZE_CLUSTER`, `FLEET_FEATURE_UPGRADE`. |
| `progress` | OperationProgress | Output only. Progress information for an operation. |
| `selfLink` | string | Output only. Server-defined URI for the operation. Example: `https://container.googleapis.com/v1alpha1/projects/123/locations/us-central1/operations/operation-123`. |
| `startTime` | string | Output only. The time the operation started, in RFC3339 (https://www.ietf.org/rfc/rfc3339.txt) text format. |
| `status` | string enum | Output only. The current status of the operation. Values: `STATUS_UNSPECIFIED`, `PENDING`, `RUNNING`, `DONE`, `ABORTING`. |
| `statusMessage` | string | Output only. If an error has occurred, a textual description of the error. Deprecated. Use the field error instead. |
| `targetLink` | string | Output only. Server-defined URI for the target of the operation. The format of this is a URI to the resource being modified (such as a cluster, node pool, or node). For node pool repairs, there may be multiple nodes being repaired, but only one will be the target. Examples: - ## `https://container.googleapis.com/v1/projects/123/locations/us-central1/clusters/my-cluster` ## `https://container.googleapis.com/v1/projects/123/zones/us-central1-c/clusters/my-cluster/nodePools/my-np` `https://container.googleapis.com/v1/projects/123/zones/us-central1-c/clusters/my-cluster/nodePools/my-np/node/my-node` |
| `zone` | string | Output only. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the operation is taking place. This field is deprecated, use location instead. |

### `OperationError`

- OperationError records errors seen from CloudKMS keys encountered during updates to DatabaseEncryption configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorMessage` | string | Description of the error seen during the operation. |
| `keyName` | string | CloudKMS key resource that had the error. |
| `timestamp` | string (google-datetime) | Time when the CloudKMS error was seen. |

### `OperationProgress`

- Information about operation (or operation stage) progress.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metrics` | array<Metric> | Progress metric bundle, for example: metrics: \[{name: "nodes done", int_value: 15}, {name: "nodes total", int_value: 32}\] or metrics: \[{name: "progress", double_value: 0.56}, {name: "progress scale", double_value: 1.0}\] |
| `name` | string | A non-parameterized string describing an operation stage. Unset for single-stage operations. |
| `stages` | array<OperationProgress> | Substages of an operation or a stage. |
| `status` | string enum | Status of an operation stage. Unset for single-stage operations. Values: `STATUS_UNSPECIFIED`, `PENDING`, `RUNNING`, `DONE`, `ABORTING`. |

### `OpportunisticMaintenanceStrategy`

- Strategy that will trigger maintenance on behalf of the customer.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `maintenanceAvailabilityWindow` | string (google-duration) | The window of time that opportunistic maintenance can run. Example: A setting of 14 days implies that opportunistic maintenance can only be ran in the 2 weeks leading up to the scheduled maintenance date. Setting 28 days allows opportunistic maintenance to run at any time in the scheduled maintenance window (all `PERIODIC` maintenance is set 28 days in advance). |
| `minNodesPerPool` | string (int64) | The minimum nodes required to be available in a pool. Blocks maintenance if it would cause the number of running nodes to dip below this value. |
| `nodeIdleTimeWindow` | string (google-duration) | The amount of time that a node can remain idle (no customer owned workloads running), before triggering maintenance. |

### `ParallelstoreCsiDriverConfig`

- Deprecated: The Parallelstore CSI driver is no longer supported. Configuration for the Cloud Storage Parallelstore CSI driver.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the Cloud Storage Parallelstore CSI driver is enabled for this cluster. |

### `ParentProductConfig`

- ParentProductConfig is the configuration of the parent product of the cluster. This field is used by Google internal products that are built on top of a GKE cluster and take the ownership of the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labels` | object | Labels contain the configuration of the parent product. |
| `productName` | string | Name of the parent product associated with the cluster. |

### `PdbBlockedPod`

- The namespace/name of the pod whose eviction is blocked by PDB.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the pod. |
| `namespace` | string | The namespace of the pod. |

### `PlacementPolicy`

- PlacementPolicy defines the placement policy used by the node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policyName` | string | If set, refers to the name of a custom resource policy supplied by the user. The resource policy must be in the same project and region as the node pool. If not found, InvalidArgument error is returned. |
| `tpuTopology` | string | Optional. TPU placement topology for pod slice node pool. https://cloud.google.com/tpu/docs/types-topologies#tpu_topologies |
| `type` | string enum | The type of placement. Values: `TYPE_UNSPECIFIED`, `COMPACT`. |

### `PodAutoscaling`

- PodAutoscaling is used for configuration of parameters for workload autoscaling.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hpaProfile` | string enum | Selected Horizontal Pod Autoscaling profile. Values: `HPA_PROFILE_UNSPECIFIED`, `NONE`, `PERFORMANCE`. |

### `PodCIDROverprovisionConfig`

- \[PRIVATE FIELD\] Config for pod CIDR size overprovisioning.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disable` | boolean | Whether Pod CIDR overprovisioning is disabled. Note: Pod CIDR overprovisioning is enabled by default. |

### `PodSecurityPolicyConfig`

- Configuration for the PodSecurityPolicy feature.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Enable the PodSecurityPolicy controller for this cluster. If enabled, pods must be valid under a PodSecurityPolicy to be created. |

### `PodSnapshotConfig`

- PodSnapshotConfig is the configuration for GKE Pod Snapshots feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether or not the Pod Snapshots feature is enabled. |

### `PolicyBinding`

- Binauthz policy that applies to this cluster.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `name` | string | The relative resource name of the binauthz platform policy to evaluate. GKE platform policies have the following format: `projects/{project_number}/platforms/gke/policies/{policy_id}`. |

### `PrivateClusterConfig`

- Configuration options for private clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enablePrivateEndpoint` | boolean | Whether the master's internal IP address is used as the cluster endpoint. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.enable_public_endpoint instead. Note that the value of enable_public_endpoint is reversed: if enable_private_endpoint is false, then enable_public_endpoint will be true. |
| `enablePrivateNodes` | boolean | Whether nodes have internal IP addresses only. If enabled, all nodes are given only RFC 1918 private addresses and communicate with the master via private networking. Deprecated: Use NetworkConfig.default_enable_private_nodes instead. |
| `masterGlobalAccessConfig` | PrivateClusterMasterGlobalAccessConfig | Controls master global access settings. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.enable_global_access instead. |
| `masterIpv4CidrBlock` | string | The IP range in CIDR notation to use for the hosted master network. This range will be used for assigning internal IP addresses to the master or set of masters, as well as the ILB VIP. This range must not overlap with any other ranges in use within the cluster's network. |
| `peeringName` | string | Output only. The peering name in the customer VPC used by this cluster. |
| `privateEndpoint` | string | Output only. The internal IP address of this cluster's master endpoint. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.private_endpoint instead. |
| `privateEndpointSubnetwork` | string | Subnet to provision the master's private endpoint during cluster creation. Specified in projects/\*/regions/\*/subnetworks/\* format. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.private_endpoint_subnetwork instead. |
| `publicEndpoint` | string | Output only. The external IP address of this cluster's master endpoint. Deprecated:Use ControlPlaneEndpointsConfig.IPEndpointsConfig.public_endpoint instead. |

### `PrivateClusterMasterGlobalAccessConfig`

- Configuration for controlling master global access settings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whenever master is accessible globally or not. |

### `PrivateRegistryAccessConfig`

- PrivateRegistryAccessConfig contains access configuration for private container registries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateAuthorityDomainConfig` | array<CertificateAuthorityDomainConfig> | Private registry access configuration. |
| `enabled` | boolean | Private registry access is enabled. |

### `PrivilegedAdmissionConfig`

- PrivilegedAdmissionConfig stores the list of authorized allowlist paths for the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowlistPaths` | array<string> | The customer allowlist Cloud Storage paths for the cluster. These paths are used with the `--autopilot-privileged-admission` flag to authorize privileged workloads in Autopilot clusters. Paths can be GKE-owned, in the format `gke:////`, or customer-owned, in the format `gs:///`. Wildcards (`*`) are supported to authorize all allowlists under specific paths or directories. Example: `gs://my-bucket/*` will authorize all allowlists under the `my-bucket` bucket. |

### `ProtectConfig`

- ProtectConfig defines the flags needed to enable/disable features for the Protect API.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `workloadConfig` | WorkloadConfig | WorkloadConfig defines which actions are enabled for a cluster's workload configurations. |
| `workloadVulnerabilityMode` | string enum | Deprecated: Vulnerability scanning is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. Sets which mode to use for Protect workload vulnerability scanning feature. Values: `WORKLOAD_VULNERABILITY_MODE_UNSPECIFIED`, `DISABLED`, `BASIC`. |

### `PubSub`

- Pub/Sub specific notification config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Enable notifications for Pub/Sub. |
| `filter` | Filter | Allows filtering to one or more specific event types. If no filter is specified, or if a filter is specified with no event types, all event types will be sent |
| `topic` | string | The desired Pub/Sub topic to which notifications will be sent by GKE. Format is `projects/{project}/topics/{topic}`. |

### `QueuedProvisioning`

- QueuedProvisioning defines the queued provisioning used by the node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Denotes that this node pool is QRM specific, meaning nodes can be only obtained through queuing via the Cluster Autoscaler ProvisioningRequest API. |

### `RBACBindingConfig`

- RBACBindingConfig allows user to restrict ClusterRoleBindings an RoleBindings that can be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableInsecureBindingSystemAuthenticated` | boolean | Setting this to true will allow any ClusterRoleBinding and RoleBinding with subjects system:authenticated. |
| `enableInsecureBindingSystemUnauthenticated` | boolean | Setting this to true will allow any ClusterRoleBinding and RoleBinding with subjets system:anonymous or system:unauthenticated. |

### `RangeInfo`

- RangeInfo contains the range name and the range utilization by this cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rangeName` | string | Output only. Name of a range. |
| `utilization` | number (double) | Output only. The utilization of the range. |

### `RayClusterLoggingConfig`

- RayClusterLoggingConfig specifies configuration of Ray logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Enable log collection for Ray clusters. |

### `RayClusterMonitoringConfig`

- RayClusterMonitoringConfig specifies monitoring configuration for Ray clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Enable metrics collection for Ray clusters. |

### `RayOperatorConfig`

- Configuration options for the Ray Operator add-on.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the Ray Operator addon is enabled for this cluster. |
| `rayClusterLoggingConfig` | RayClusterLoggingConfig | Optional. Logging configuration for Ray clusters. |
| `rayClusterMonitoringConfig` | RayClusterMonitoringConfig | Optional. Monitoring configuration for Ray clusters. |

### `RecurringMaintenanceWindow`

- Represents an arbitrary window of time that recurs. Will replace RecurringTimeWindow.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delayUntil` | Date | Optional. Specifies the date before which will not be scheduled. Depending on the recurrence, this may be the date the first window appears. Days are measured in the UTC timezone. This setting must be used when INTERVAL>1 or FREQ=WEEKLY/MONTHLY and no BYDAY specified. |
| `recurrence` | string | Required. An RRULE (https://tools.ietf.org/html/rfc5545#section-3.8.5.3) for how this window recurs. For example, to have something repeat every weekday, you'd use: `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR` To repeat some window daily (equivalent to the DailyMaintenanceWindow): `FREQ=DAILY` For the first weekend of every month: `FREQ=MONTHLY;BYSETPOS=1;BYDAY=SA,SU` The FREQ values of HOURLY, MINUTELY, and SECONDLY are not supported. |
| `windowDuration` | string (google-duration) | Required. Duration of the window. |
| `windowStartTime` | TimeOfDay | Required. Start time of the window on days that it is scheduled, assuming UTC timezone. |

### `RecurringTimeWindow`

- Represents an arbitrary window of time that recurs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `recurrence` | string | An RRULE (https://tools.ietf.org/html/rfc5545#section-3.8.5.3) for how this window recurs. They go on for the span of time between the start and end time. For example, to have something repeat every weekday, you'd use: `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR` To repeat some window daily (equivalent to the DailyMaintenanceWindow): `FREQ=DAILY` For the first weekend of every month: `FREQ=MONTHLY;BYSETPOS=1;BYDAY=SA,SU` This specifies how frequently the window starts. Eg, if you wanted to have a 9-5 UTC-4 window every weekday, you'd use something like: start time = 2019-01-01T09:00:00-0400 end time = 2019-01-01T17:00:00-0400 recurrence = FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR Windows can span multiple days. Eg, to make the window encompass every weekend from midnight Saturday till the last minute of Sunday UTC: start time = 2019-01-05T00:00:00Z end time = 2019-01-07T23:59:00Z recurrence = FREQ=WEEKLY;BYDAY=SA Note the start and end time's specific dates are largely arbitrary except to specify duration of the window and when it first starts. The FREQ values of HOURLY, MINUTELY, and SECONDLY are not supported. |
| `window` | TimeWindow | The window of the first recurrence. |

### `RegistryHeader`

- RegistryHeader configures headers for the registry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Key configures the header key. |
| `value` | array<string> | Value configures the header value. |

### `RegistryHostConfig`

- RegistryHostConfig configures the top-level structure for a single containerd registry server's configuration, which represents one hosts.toml file on the node. It will override the same fqdns in PrivateRegistryAccessConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hosts` | array<HostConfig> | HostConfig configures a list of host-specific configurations for the server. Each server can have at most 10 host configurations. |
| `server` | string | Defines the host name of the registry server, which will be used to create configuration file as /etc/containerd/hosts.d//hosts.toml. It supports fully qualified domain names (FQDN) and IP addresses: Specifying port is supported, while scheme and path are NOT supported. Wildcards are NOT supported. Examples: - `my.customdomain.com` - `10.0.1.2:5000` |

### `ReleaseChannel`

- ReleaseChannel indicates which release channel a cluster is subscribed to. Release channels are arranged in order of risk. When a cluster is subscribed to a release channel, Google maintains both the master version and the node version. Node auto-upgrade defaults to true and cannot be disabled.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `channel` | string enum | channel specifies which release channel the cluster is subscribed to. Values: `UNSPECIFIED`, `RAPID`, `REGULAR`, `STABLE`, `EXTENDED`. |

### `ReleaseChannelConfig`

- ReleaseChannelConfig exposes configuration for a release channel.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `channel` | string enum | The release channel this configuration applies to. Values: `UNSPECIFIED`, `RAPID`, `REGULAR`, `STABLE`, `EXTENDED`. |
| `customVersions` | array<string> | Output only. List of custom versions for the channel. |
| `defaultVersion` | string | The default version for newly created clusters on the channel. |
| `previewVersions` | array<string> | Output only. List of preview versions for the channel. |
| `upgradeTargetVersion` | string | The auto upgrade target version for clusters on the channel. |
| `validVersions` | array<string> | List of valid versions for the channel. |

### `ReleaseChannelConfig` (v1beta1)

- ReleaseChannelConfig exposes configuration for a release channel.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `availableVersions` | array<AvailableVersion> | Deprecated. This field has been deprecated and replaced with the valid_versions field. |
| `channel` | string enum | The release channel this configuration applies to. Values: `UNSPECIFIED`, `RAPID`, `REGULAR`, `STABLE`, `EXTENDED`. |
| `customVersions` | array<string> | Output only. List of custom versions for the channel. |
| `defaultVersion` | string | The default version for newly created clusters on the channel. |
| `previewVersions` | array<string> | Output only. List of preview versions for the channel. |
| `upgradeTargetVersion` | string | The auto upgrade target version for clusters on the channel. |
| `validVersions` | array<string> | List of valid versions for the channel. |

### `ReservationAffinity`

- ReservationAffinity (https://cloud.google.com/compute/docs/instances/reserving-zonal-resources) is the configuration of desired reservation which instances could take capacity from.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumeReservationType` | string enum | Corresponds to the type of reservation consumption. Values: `UNSPECIFIED`, `NO_RESERVATION`, `ANY_RESERVATION`, `SPECIFIC_RESERVATION`, `ANY_RESERVATION_THEN_FAIL`. |
| `key` | string | Corresponds to the label key of a reservation resource. To target a SPECIFIC_RESERVATION by name, specify "compute.googleapis.com/reservation-name" as the key and specify the name of your reservation as its value. |
| `values` | array<string> | Corresponds to the label value(s) of reservation resource(s). |

### `ReservedResourcesConfig`

- ReservedResourcesConfig contains the configuration for the reserved resources on the node.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpuReservedMillicore` | string (int64) | Optional. The amount of CPU to reserve for system daemons. This is a user-specified value. If unspecified, GKE decides the default based on node version using different formula. |
| `effectiveCpuReservedMillicore` | string (int64) | Output only. The effective amount of CPU reserved for system daemons. If `cpu_reserved_millicore` is specified, user-specified value is used. Otherwise the GKE default is applied. |
| `effectiveMemoryReservedMib` | string (int64) | Output only. The effective amount of memory reserved for system daemons. If `memory_reserved_mib` is specified, the user-specified value is used. Otherwise the GKE default is applied. |
| `memoryReservedMib` | string (int64) | Optional. The amount of memory to reserve for system daemons (in MiB). This is a user-specified value. If unspecified, GKE decides the default based on node version using different formula. |

### `ResolvedConfEntry`

- Additional entries to be added to resolved.conf.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | The key of resolved.conf |
| `value` | array<string> | Optional. The value of resolved.conf |

### `ResourceLabels`

- Collection of Resource Manager labels (https://cloud.google.com/resource-manager/docs/creating-managing-labels).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labels` | object | Map of node label keys and node label values. |

### `ResourceLimit`

- Contains information about amount of some resource in the cluster. For memory, value should be in GB.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maximum` | string (int64) | Maximum amount of the resource in the cluster. |
| `minimum` | string (int64) | Minimum amount of the resource in the cluster. |
| `resourceType` | string | Resource name "cpu", "memory" or gpu-specific string. |

### `ResourceManagerTags`

- A map of resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies. Tags must be according to specifications in https://cloud.google.com/vpc/docs/tags-firewalls-overview#specifications. A maximum of 5 tag key-value pairs can be specified. Existing tags will be replaced with new values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tags` | object | TagKeyValue must be in one of the following formats (\[KEY\]=\[VALUE\]) 1. `tagKeys/{tag_key_id}=tagValues/{tag_value_id}` 2. `{org_id}/{tag_key_name}={tag_value_name}` 3. `{project_id}/{tag_key_name}={tag_value_name}` |

### `ResourceUsageExportConfig`

- Configuration for exporting cluster resource usages.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigqueryDestination` | BigQueryDestination | Configuration to use BigQuery as usage export destination. |
| `consumptionMeteringConfig` | ConsumptionMeteringConfig | Configuration to enable resource consumption metering. |
| `enableNetworkEgressMetering` | boolean | Whether to enable network egress metering for this cluster. If enabled, a daemonset will be created in the cluster to meter network egress traffic. |

### `RollbackNodePoolUpgradeRequest`

- RollbackNodePoolUpgradeRequest rollbacks the previously Aborted or Failed NodePool upgrade. This will be an no-op if the last upgrade successfully completed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterId` | string | Deprecated. The name of the cluster to rollback. This field has been deprecated and replaced by the name field. |
| `name` | string | The name (project, location, cluster, node pool id) of the node poll to rollback upgrade. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*`. |
| `nodePoolId` | string | Deprecated. The name of the node pool to rollback. This field has been deprecated and replaced by the name field. |
| `projectId` | string | Deprecated. The Google Developers Console project ID or project number (https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. |
| `respectPdb` | boolean | Option for rollback to ignore the PodDisruptionBudget. Default value is false. |
| `zone` | string | Deprecated. The name of the Google Compute Engine zone (https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. |

### `RollbackSafeUpgrade`

- RollbackSafeUpgrade is the configuration for the rollback safe upgrade.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlPlaneSoakDuration` | string (google-duration) | Optional. A user-defined period for the cluster remains in the rollbackable state. ex: {seconds: 21600}. |

### `RollbackSafeUpgradeStatus`

- RollbackSafeUpgradeStatus contains the rollback-safe upgrade status of a cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlPlaneUpgradeRollbackEndTime` | string (google-datetime) | Output only. The rollback-safe mode expiration time. |
| `mode` | string enum | Output only. The mode of the rollback-safe upgrade. Values: `MODE_UNSPECIFIED`, `KCP_MINOR_UPGRADE_ROLLBACK_SAFE_MODE`. |
| `previousVersion` | string | Output only. The GKE version that the cluster previously used before step-one upgrade. |

### `RotationConfig`

- RotationConfig is config for secret manager auto rotation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the rotation is enabled. |
| `rotationInterval` | string (google-duration) | The interval between two consecutive rotations. Default rotation interval is 2 minutes. |

### `SandboxConfig`

- SandboxConfig contains configurations of the sandbox to use for the node.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Type of the sandbox to use for the node. Values: `UNSPECIFIED`, `GVISOR`, `MICROVM`. |

### `SandboxConfig` (v1beta1)

- SandboxConfig contains configurations of the sandbox to use for the node.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `sandboxType` | string | Type of the sandbox to use for the node (e.g. 'gvisor') |
| `type` | string enum | Type of the sandbox to use for the node. Values: `UNSPECIFIED`, `GVISOR`, `MICROVM`. |

### `ScheduleUpgradeConfig`

- Configuration for scheduled upgrades on the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Whether or not scheduled upgrades are enabled. |

### `SecondaryBootDisk`

- SecondaryBootDisk represents a persistent disk attached to a node with special configurations based on its mode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskImage` | string | Fully-qualified resource ID for an existing disk image. |
| `mode` | string enum | Disk mode (container image cache, etc.) Values: `MODE_UNSPECIFIED`, `CONTAINER_IMAGE_CACHE`. |

### `SecondaryBootDiskUpdateStrategy`

- SecondaryBootDiskUpdateStrategy is a placeholder which will be extended in the future to define different options for updating secondary boot disks.
- Version: v1

### `SecretManagerConfig`

- SecretManagerConfig is config for secret manager enablement.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Enable/Disable Secret Manager Config. |
| `rotationConfig` | RotationConfig | Rotation config for secret manager. |

### `SecretSyncConfig`

- Configuration for sync Secret Manager secrets as k8s secrets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Enable/Disable Secret Sync Config. |
| `rotationConfig` | SyncRotationConfig | Rotation config for secret manager. |

### `SecurityBulletinEvent`

- SecurityBulletinEvent is a notification sent to customers when a security bulletin has been posted that they are vulnerable to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `affectedSupportedMinors` | array<string> | The GKE minor versions affected by this vulnerability. |
| `briefDescription` | string | A brief description of the bulletin. See the bulletin pointed to by the bulletin_uri field for an expanded description. |
| `bulletinId` | string | The ID of the bulletin corresponding to the vulnerability. |
| `bulletinUri` | string | The URI link to the bulletin on the website for more information. |
| `cveIds` | array<string> | The CVEs associated with this bulletin. |
| `manualStepsRequired` | boolean | If this field is specified, it means there are manual steps that the user must take to make their clusters safe. |
| `mitigatedVersions` | array<string> | The GKE versions where this vulnerability is mitigated. |
| `patchedVersions` | array<string> | The GKE versions where this vulnerability is patched. |
| `resourceTypeAffected` | string | The resource type (node/control plane) that has the vulnerability. Multiple notifications (1 notification per resource type) will be sent for a vulnerability that affects > 1 resource type. |
| `severity` | string | The severity of this bulletin as it relates to GKE. |
| `suggestedUpgradeTarget` | string | This represents a version selected from the patched_versions field that the cluster receiving this notification should most likely want to upgrade to based on its current version. Note that if this notification is being received by a given cluster, it means that this version is currently available as an upgrade target in that cluster's location. |

### `SecurityPostureConfig`

- SecurityPostureConfig defines the flags needed to enable/disable features for the Security Posture API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | Sets which mode to use for Security Posture features. Values: `MODE_UNSPECIFIED`, `DISABLED`, `BASIC`, `ENTERPRISE`. |
| `vulnerabilityMode` | string enum | Deprecated: Vulnerability scanning is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. Sets which mode to use for vulnerability scanning. Values: `VULNERABILITY_MODE_UNSPECIFIED`, `VULNERABILITY_DISABLED`, `VULNERABILITY_BASIC`, `VULNERABILITY_ENTERPRISE`. |

### `ServerConfig`

- Kubernetes Engine service configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `channels` | array<ReleaseChannelConfig> | List of release channel configurations. |
| `defaultClusterVersion` | string | Version of Kubernetes the service deploys by default. |
| `defaultImageType` | string | Default image type. |
| `validImageTypes` | array<string> | List of valid image types. |
| `validMasterVersions` | array<string> | List of valid master versions, in descending order. |
| `validNodeVersions` | array<string> | List of valid node upgrade target versions, in descending order. |

### `ServerConfig` (v1beta1)

- Kubernetes Engine service configuration.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `channels` | array<ReleaseChannelConfig> | List of release channel configurations. |
| `defaultClusterVersion` | string | Version of Kubernetes the service deploys by default. |
| `defaultImageType` | string | Default image type. |
| `validImageTypes` | array<string> | List of valid image types. |
| `validMasterVersions` | array<string> | List of valid master versions, in descending order. |
| `validNodeVersions` | array<string> | List of valid node upgrade target versions, in descending order. |
| `windowsVersionMaps` | object | Maps of Kubernetes version and supported Windows server versions. |

### Shape of `HostMaintenancePolicy`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "maintenanceInterval": "string enum",
  "opportunisticMaintenanceStrategy": "OpportunisticMaintenanceStrategy"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `container` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://container.googleapis.com/$discovery/rest?version=v1, https://container.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

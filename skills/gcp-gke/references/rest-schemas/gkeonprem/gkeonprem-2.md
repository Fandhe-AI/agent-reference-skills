---
source: https://gkeonprem.googleapis.com/$discovery/rest?version=v1
---

# GKE On-Prem API message schemas (gkeonprem) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/gkeonprem/`.

### `VmwareNetworkConfig`

- Specifies network config for the VMware user cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlPlaneV2Config` | VmwareControlPlaneV2Config | Configuration for control plane V2 mode. |
| `dhcpIpConfig` | VmwareDhcpIpConfig | Configuration settings for a DHCP IP configuration. |
| `hostConfig` | VmwareHostConfig | Represents common network settings irrespective of the host's IP address. |
| `podAddressCidrBlocks` | array<string> | Required. All pods in the cluster are assigned an RFC1918 IPv4 address from these ranges. Only a single range is supported. This field cannot be changed after creation. |
| `serviceAddressCidrBlocks` | array<string> | Required. All services in the cluster are assigned an RFC1918 IPv4 address from these ranges. Only a single range is supported. This field cannot be changed after creation. |
| `staticIpConfig` | VmwareStaticIpConfig | Configuration settings for a static IP configuration. |
| `vcenterNetwork` | string | vcenter_network specifies vCenter network name. Inherited from the admin cluster. |

### `VmwareNodeConfig`

- Parameters that describe the configuration of all nodes within a given node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bootDiskSizeGb` | string (int64) | VMware disk size to be used during creation. |
| `cpus` | string (int64) | The number of CPUs for each node in the node pool. |
| `enableLoadBalancer` | boolean | Allow node pool traffic to be load balanced. Only works for clusters with MetalLB load balancers. |
| `image` | string | The OS image name in vCenter, only valid when using Windows. |
| `imageType` | string | Required. The OS image to be used for each node in a node pool. Currently `cos`, `cos_cgv2`, `ubuntu`, `ubuntu_cgv2`, `ubuntu_containerd` and `windows` are supported. |
| `labels` | object | The map of Kubernetes labels (key/value pairs) to be applied to each node. These will added in addition to any default label(s) that Kubernetes may apply to the node. In case of conflict in label keys, the applied set may differ depending on the Kubernetes version -- it's best to assume the behavior is undefined and conflicts should be avoided. For more information, including usage and the valid values, see: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/ |
| `memoryMb` | string (int64) | The megabytes of memory for each node in the node pool. |
| `replicas` | string (int64) | The number of nodes in the node pool. |
| `taints` | array<NodeTaint> | The initial taints assigned to nodes of this node pool. |
| `vsphereConfig` | VmwareVsphereConfig | Specifies the vSphere config for node pool. |

### `VmwareNodePool`

- Resource VmwareNodePool represents a VMware node pool. ##
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Annotations on the node pool. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (\_), dots (.), and alphanumerics between. |
| `config` | VmwareNodeConfig | Required. The node configuration of the node pool. |
| `createTime` | string (google-datetime) | Output only. The time at which this node pool was created. |
| `deleteTime` | string (google-datetime) | Output only. The time at which this node pool was deleted. If the resource is not deleted, this must be empty |
| `displayName` | string | The display name for the node pool. |
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. Allows clients to perform consistent read-modify-writes through optimistic concurrency control. |
| `name` | string | Immutable. The resource name of this node pool. |
| `nodePoolAutoscaling` | VmwareNodePoolAutoscalingConfig | Node pool autoscaling config for the node pool. |
| `onPremVersion` | string | Anthos version for the node pool. Defaults to the user cluster version. |
| `reconciling` | boolean | Output only. If set, there are currently changes in flight to the node pool. |
| `state` | string enum | Output only. The current state of the node pool. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `RUNNING`, `RECONCILING`, `STOPPING`, `ERROR`, `DEGRADED`. |
| `status` | ResourceStatus | Output only. ResourceStatus representing the detailed VMware node pool state. |
| `uid` | string | Output only. The unique identifier of the node pool. |
| `updateTime` | string (google-datetime) | Output only. The time at which this node pool was last updated. |
| `validationCheck` | ValidationCheck | The validation check for the node pool. |

### `VmwareNodePoolAutoscalingConfig`

- NodePoolAutoscaling config for the NodePool to allow for the kubernetes to scale NodePool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxReplicas` | integer (int32) | Maximum number of replicas in the NodePool. |
| `minReplicas` | integer (int32) | Minimum number of replicas in the NodePool. |

### `VmwarePlatformConfig`

- VmwarePlatformConfig represents configuration for the VMware platform.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bundles` | array<VmwareBundleConfig> | Output only. The list of bundles installed in the admin cluster. |
| `platformVersion` | string | Output only. The platform version e.g. 1.13.2. |
| `requiredPlatformVersion` | string | Input only. The required platform version e.g. 1.13.1. If the current platform version is lower than the target version, the platform version will be updated to the target version. If the target version is not installed in the platform (bundle versions), download the target version bundle. |
| `status` | ResourceStatus | Output only. Resource status for the platform. |

### `VmwareSeesawConfig`

- VmwareSeesawConfig represents configuration parameters for an already existing Seesaw load balancer. IMPORTANT: Please note that the Anthos On-Prem API will not generate or update Seesaw configurations it can only bind a pre-existing configuration to a new user cluster. IMPORTANT: When attempting to create a user cluster with a pre-existing Seesaw load balancer you will need to follow some preparation steps before calling the 'CreateVmwareCluster' API method. First you will need to create the user cluster's namespace via kubectl. The namespace will need to use the following naming convention : -gke-onprem-mgmt or -gke-onprem-mgmt depending on whether you used the 'VmwareCluster.local_name' to disambiguate collisions; for more context see the documentation of 'VmwareCluster.local_name'. Once the namespace is created you will need to create a secret resource via kubectl. This secret will contain copies of your Seesaw credentials. The Secret must be called 'user-cluster-creds' and contain Seesaw's SSH and Cert credentials. The credentials must be keyed with the following names: 'seesaw-ssh-private-key', 'seesaw-ssh-public-key', 'seesaw-ssh-ca-key', 'seesaw-ssh-ca-cert'.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableHa` | boolean | Enable two load balancer VMs to achieve a highly-available Seesaw load balancer. |
| `group` | string | Required. In general the following format should be used for the Seesaw group name: seesaw-for-\[cluster_name\]. |
| `ipBlocks` | array<VmwareIpBlock> | Required. The IP Blocks to be used by the Seesaw load balancer |
| `masterIp` | string | Required. MasterIP is the IP announced by the master of Seesaw group. |
| `stackdriverName` | string | Name to be used by Stackdriver. |
| `vms` | array<string> | Names of the VMs created for this Seesaw group. |

### `VmwareStaticIpConfig`

- Represents the network configuration required for the VMware user clusters with Static IP configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipBlocks` | array<VmwareIpBlock> | Represents the configuration values for static IP allocation to nodes. |

### `VmwareStorageConfig`

- Specifies vSphere CSI components deployment config in the VMware user cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `vsphereCsiDisabled` | boolean | Whether or not to deploy vSphere CSI components in the VMware user cluster. Enabled by default. |

### `VmwareVCenterConfig`

- Represents configuration for the VMware VCenter for the user cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | Output only. The vCenter IP address. |
| `caCertData` | string | Contains the vCenter CA certificate public key for SSL verification. |
| `cluster` | string | The name of the vCenter cluster for the user cluster. |
| `datacenter` | string | The name of the vCenter datacenter for the user cluster. |
| `datastore` | string | The name of the vCenter datastore for the user cluster. |
| `folder` | string | The name of the vCenter folder for the user cluster. |
| `resourcePool` | string | The name of the vCenter resource pool for the user cluster. |
| `storagePolicyName` | string | The name of the vCenter storage policy for the user cluster. |

### `VmwareVersionInfo`

- Contains information about a specific Anthos on VMware version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dependencies` | array<UpgradeDependency> | The list of upgrade dependencies for this version. |
| `hasDependencies` | boolean | If set, the cluster dependencies (e.g. the admin cluster, other user clusters managed by the same admin cluster) must be upgraded before this version can be installed or upgraded to. |
| `isInstalled` | boolean | If set, the version is installed in the admin cluster. Otherwise, the version bundle must be downloaded and installed before a user cluster can be created at or upgraded to this version. |
| `version` | string | Version number e.g. 1.13.1-gke.1000. |

### `VmwareVipConfig`

- Specifies the VIP config for the VMware user cluster load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlPlaneVip` | string | The VIP which you previously set aside for the Kubernetes API of this cluster. |
| `ingressVip` | string | The VIP which you previously set aside for ingress traffic into this cluster. |

### `VmwareVsphereConfig`

- VmwareVsphereConfig represents configuration for the VMware VCenter for node pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `datastore` | string | The name of the vCenter datastore. Inherited from the user cluster. |
| `hostGroups` | array<string> | Vsphere host groups to apply to all VMs in the node pool |
| `tags` | array<VmwareVsphereTag> | Tags to apply to VMs. |

### `VmwareVsphereTag`

- VmwareVsphereTag describes a vSphere tag to be placed on VMs in the node pool. For more information, see https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.vcenterhost.doc/GUID-E8E854DD-AA97-4E0C-8419-CE84F93C4058.html
- Version: v1

| Field | Type | Description |
|---|---|---|
| `category` | string | The Vsphere tag category. |
| `tag` | string | The Vsphere tag name. |

### Shape of `VmwareNetworkConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "controlPlaneV2Config": "VmwareControlPlaneV2Config",
  "dhcpIpConfig": "VmwareDhcpIpConfig",
  "hostConfig": "VmwareHostConfig",
  "podAddressCidrBlocks": "array<string>",
  "serviceAddressCidrBlocks": "array<string>",
  "staticIpConfig": "VmwareStaticIpConfig",
  "vcenterNetwork": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `gkeonprem` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://gkeonprem.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

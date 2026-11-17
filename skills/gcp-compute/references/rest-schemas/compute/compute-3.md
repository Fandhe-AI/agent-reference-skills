---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API message schemas (compute) (part 3/14)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/compute/`.

### `DhcpOptionsConfig`

- A standalone, regional API resource that encapsulates a set of user-defined DHCP configurations.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `associations` | object | Mapping of user-defined keys to DhcpOptionsConfig to Network associations. |
| `bootFileIpv4Name` | string | The file path and name of the boot image/file on the TFTP server that the client VM guest OS should download and execute during network boot. Used when the standard DHCP header 'file' field is overloaded. Corresponds to DHCPv4 Option 67. |
| `bootFileIpv6Parameters` | array<string> | A list of UTF-8 encoded parameter strings to be passed as arguments to the bootloader program or OS kernel after downloading the boot file. Corresponds to DHCPv6 Option 60. |
| `bootFileIpv6Url` | string | The Uniform Resource Locator (URL) specifying the protocol, server address, and file path of the boot file that the client VM guest OS should download and execute for network boot (e.g., 'tftp://\[2001:db8::1\]/bootx64.efi' or 'http://\[2001:db8::1\]/boot.img'). Corresponds to DHCPv6 Option 59. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `dnsSearchPaths` | array<string> | An ordered list of domain suffixes (search paths) that the client VM guest OS should append to resolve hostnames that are not fully qualified. Applies to both DHCPv4 Option 119 and DHCPv6 Option 24. |
| `domainName` | string | The domain name that the client VM guest OS should use when resolving hostnames via DNS (e.g., 'example.com'). It defines the default domain suffix for the client. Corresponds to DHCPv4 Option 15. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#dhcpOptionsConfig for dhcp options configs. |
| `leaseTimeSec` | string (int64) | The duration, in seconds, of the IPv4 address lease offered by the DHCP server to the client VM guest OS. Corresponds to DHCPv4 Option 51. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `ntpServerIpv4Addresses` | array<string> | An ordered list of IPv4 addresses of Network Time Protocol (NTP) servers available to the client VM guest OS for system clock synchronization, listed in order of preference. Corresponds to DHCPv4 Option 42. |
| `ntpServerIpv6Addresses` | array<string> | An ordered list of IPv6 addresses of Network Time Protocol (NTP) servers available to the client VM guest OS for system clock synchronization. Corresponds to DHCPv6 Option 56. |
| `region` | string | Output only. \[Output Only\] URL of the region where the resource resides. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `tftpServerIpv4Addresses` | array<string> | An ordered list of one or more IPv4 addresses of TFTP servers. Provides server redundancy and failover support, and is generally prioritized by clients over the single hostname specified in Option 66. Corresponds to DHCPv4 Option 150. |
| `tftpServerIpv4Name` | string | The hostname or IP address of the Trivial File Transfer Protocol (TFTP) server from which the client VM guest OS can download boot files. Typically used in network booting (PXE) when the standard DHCP header 'sname' field is overloaded. Corresponds to DHCPv4 Option 66. |

### `DhcpOptionsConfig` (alpha)

- A standalone, regional API resource that encapsulates a set of user-defined DHCP configurations.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `associations` | object | Mapping of user-defined keys to DhcpOptionsConfig to Network associations. |
| `bootFileIpv4Name` | string | The file path and name of the boot image/file on the TFTP server that the client VM guest OS should download and execute during network boot. Used when the standard DHCP header 'file' field is overloaded. Corresponds to DHCPv4 Option 67. |
| `bootFileIpv6Parameters` | array<string> | A list of UTF-8 encoded parameter strings to be passed as arguments to the bootloader program or OS kernel after downloading the boot file. Corresponds to DHCPv6 Option 60. |
| `bootFileIpv6Url` | string | The Uniform Resource Locator (URL) specifying the protocol, server address, and file path of the boot file that the client VM guest OS should download and execute for network boot (e.g., 'tftp://\[2001:db8::1\]/bootx64.efi' or 'http://\[2001:db8::1\]/boot.img'). Corresponds to DHCPv6 Option 59. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `dnsSearchPaths` | array<string> | An ordered list of domain suffixes (search paths) that the client VM guest OS should append to resolve hostnames that are not fully qualified. Applies to both DHCPv4 Option 119 and DHCPv6 Option 24. |
| `dnsServerIpv4Addresses` | array<string> | An ordered list of IPv4 addresses of DNS recursive name servers available to the client VM guest OS, specified in order of preference. Corresponds to DHCPv4 Option 6. |
| `dnsServerIpv6Addresses` | array<string> | An ordered list of IPv6 addresses of DNS recursive name servers available to the client VM guest OS, specified in order of preference. Corresponds to DHCPv6 Option 23. |
| `domainName` | string | The domain name that the client VM guest OS should use when resolving hostnames via DNS (e.g., 'example.com'). It defines the default domain suffix for the client. Corresponds to DHCPv4 Option 15. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#dhcpOptionsConfig for dhcp options configs. |
| `leaseTimeSec` | string (int64) | The duration, in seconds, of the IPv4 address lease offered by the DHCP server to the client VM guest OS. Corresponds to DHCPv4 Option 51. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `ntpServerIpv4Addresses` | array<string> | An ordered list of IPv4 addresses of Network Time Protocol (NTP) servers available to the client VM guest OS for system clock synchronization, listed in order of preference. Corresponds to DHCPv4 Option 42. |
| `ntpServerIpv6Addresses` | array<string> | An ordered list of IPv6 addresses of Network Time Protocol (NTP) servers available to the client VM guest OS for system clock synchronization. Corresponds to DHCPv6 Option 56. |
| `region` | string | Output only. \[Output Only\] URL of the region where the resource resides. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `tftpServerIpv4Addresses` | array<string> | An ordered list of one or more IPv4 addresses of TFTP servers. Provides server redundancy and failover support, and is generally prioritized by clients over the single hostname specified in Option 66. Corresponds to DHCPv4 Option 150. |
| `tftpServerIpv4Name` | string | The hostname or IP address of the Trivial File Transfer Protocol (TFTP) server from which the client VM guest OS can download boot files. Typically used in network booting (PXE) when the standard DHCP header 'sname' field is overloaded. Corresponds to DHCPv4 Option 66. |

### `DhcpOptionsConfigAssociation`

- Association represents the relationship between a DHCP options config and a network. Association represents the relationship between a DHCP options config and a network.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `network` | string | Required. The target network this DHCP option is attached to. You can specify this as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/global/networks/network - projects/project/global/networks/network |
| `networkId` | string (uint64) | Output only. \[Output Only\] The server-defined ID of the associated Network. |
| `state` | string enum | Output only. \[Output Only\] State of the association. Values: `ACTIVE`, `ORPHANED`, `STATE_UNSPECIFIED`. |

### `DhcpOptionsConfigList`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `etag` | string | Server-defined ETag for optimistic concurrency control. |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<DhcpOptionsConfig> | A list of DhcpOptionsConfig resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#dhcpOptionsConfigList for a list of dhcp options configs. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `Disk`

- Represents a Persistent Disk resource. Google Compute Engine has two Disk resources: \* Zonal \* Regional Persistent disks are required for running your VM instances. Create both boot and non-boot (data) persistent disks. For more information, read Persistent Disks. For more storage options, read Storage options. The disks resource represents a zonal persistent disk. For more information, readZonal persistent disks. The regionDisks resource represents a regional persistent disk. For more information, read Regional resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessMode` | string enum | The access mode of the disk. - READ_WRITE_SINGLE: The default AccessMode, means the disk can be attached to single instance in RW mode. - READ_WRITE_MANY: The AccessMode means the disk can be attached to multiple instances in RW mode. - READ_ONLY_MANY: The AccessMode means the disk can be attached to multiple instances in RO mode. The AccessMode is only valid for Hyperdisk disk types. Values: `READ_ONLY_MANY`, `READ_WRITE_MANY`, `READ_WRITE_SINGLE`. |
| `architecture` | string enum | The architecture of the disk. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `asyncPrimaryDisk` | DiskAsyncReplication | Disk asynchronously replicated into this disk. |
| `asyncSecondaryDisks` | object | Output only. \[Output Only\] A list of disks this disk is asynchronously replicated to. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `diskEncryptionKey` | CustomerEncryptionKey | Encrypts the disk using a customer-supplied encryption key or a customer-managed encryption key. Encryption keys do not protect access to metadata of the disk. After you encrypt a disk with a customer-supplied key, you must provide the same key if you use the disk later. For example, to create a disk snapshot, to create a disk image, to create a machine image, or to attach the disk to a virtual machine. After you encrypt a disk with a customer-managed key, thediskEncryptionKey.kmsKeyName is set to a key \*version\* name once the disk is created. The disk is encrypted with this version of the key. In the response, diskEncryptionKey.kmsKeyName appears in the following format: "diskEncryptionKey.kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeysVersions/version If you do not provide an encryption key when creating the disk, then the disk is encrypted using an automatically generated key and you don't need to provide a key to use the disk later. |
| `enableConfidentialCompute` | boolean | Whether this disk is using confidential compute mode. |
| `guestOsFeatures` | array<GuestOsFeature> | A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#disk for disks. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this disk, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a disk. |
| `labels` | object | Labels to apply to this disk. These can be later modified by the setLabels method. |
| `lastAttachTimestamp` | string | Output only. \[Output Only\] Last attach timestamp inRFC3339 text format. |
| `lastDetachTimestamp` | string | Output only. \[Output Only\] Last detach timestamp inRFC3339 text format. |
| `licenseCodes` | array<string> | Integer license codes indicating which licenses are attached to this disk. |
| `licenses` | array<string> | A list of publicly visible licenses. Reserved for Google's use. |
| `locationHint` | string | An opaque location hint used to place the disk close to other resources. This field is for use by internal tools that use the public API. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `options` | string | Internal use only. |
| `params` | DiskParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `physicalBlockSizeBytes` | string (int64) | Physical block size of the persistent disk, in bytes. If not present in a request, a default value is used. The currently supported size is 4096, other sizes may be added in the future. If an unsupported value is requested, the error message will list the supported values for the caller's project. |
| `provisionedIops` | string (int64) | Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 10,000 and 120,000. For more details, see theExtreme persistent disk documentation. |
| `provisionedThroughput` | string (int64) | Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must be greater than or equal to 1. |
| `region` | string | Output only. \[Output Only\] URL of the region where the disk resides. Only applicable for regional resources. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `replicaZones` | array<string> | URLs of the zones where the disk should be replicated to. Only applicable for regional resources. |
| `resourcePolicies` | array<string> | Resource policies applied to this disk for automatic snapshot creations. |
| `resourceStatus` | DiskResourceStatus | Output only. \[Output Only\] Status information for the disk resource. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `sizeGb` | string (int64) | Size, in GB, of the persistent disk. You can specify this field when creating a persistent disk using thesourceImage, sourceSnapshot, orsourceDisk parameter, or specify it alone to create an empty persistent disk. If you specify this field along with a source, the value ofsizeGb must not be less than the size of the source. Acceptable values are greater than 0. |
| `sourceConsistencyGroupPolicy` | string | Output only. \[Output Only\] URL of the DiskConsistencyGroupPolicy for a secondary disk that was created using a consistency group. |
| `sourceConsistencyGroupPolicyId` | string | Output only. \[Output Only\] ID of the DiskConsistencyGroupPolicy for a secondary disk that was created using a consistency group. |
| `sourceDisk` | string | The source disk used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - https://www.googleapis.com/compute/v1/projects/project/regions/region/disks/disk - projects/project/zones/zone/disks/disk - projects/project/regions/region/disks/disk - zones/zone/disks/disk - regions/region/disks/disk |
| `sourceDiskId` | string | Output only. \[Output Only\] The unique ID of the disk used to create this disk. This value identifies the exact disk that was used to create this persistent disk. For example, if you created the persistent disk from a disk that was later deleted and recreated under the same name, the source disk ID would identify the exact version of the disk that was used. |
| `sourceImage` | string | The source image used to create this disk. If the source image is deleted, this field will not be set. To create a disk with one of the public operating system images, specify the image by its family name. For example, specifyfamily/debian-9 to use the latest Debian 9 image: projects/debian-cloud/global/images/family/debian-9 Alternatively, use a specific version of a public operating system image: projects/debian-cloud/global/images/debian-9-stretch-vYYYYMMDD To create a disk with a custom image that you created, specify the image name in the following format: global/images/my-custom-image You can also specify a custom image by its image family, which returns the latest version of the image in that family. Replace the image name with family/family-name: global/images/family/my-image-family |
| `sourceImageEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source image. Required if the source image is protected by a customer-supplied encryption key. |
| `sourceImageId` | string | Output only. \[Output Only\] The ID value of the image used to create this disk. This value identifies the exact image that was used to create this persistent disk. For example, if you created the persistent disk from an image that was later deleted and recreated under the same name, the source image ID would identify the exact version of the image that was used. |
| `sourceInstantSnapshot` | string | The source instant snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instantSnapshots/instantSnapshot - projects/project/zones/zone/instantSnapshots/instantSnapshot - zones/zone/instantSnapshots/instantSnapshot |
| `sourceInstantSnapshotId` | string | Output only. \[Output Only\] The unique ID of the instant snapshot used to create this disk. This value identifies the exact instant snapshot that was used to create this persistent disk. For example, if you created the persistent disk from an instant snapshot that was later deleted and recreated under the same name, the source instant snapshot ID would identify the exact version of the instant snapshot that was used. |
| `sourceMachineImage` | string | The machine image to create the disk from. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/global/machineImages/machineImage - projects/project/global/machineImages/machineImage - global/machineImages/machineImage |
| `sourceMachineImageDiskDeviceName` | string | The device name of a disk within a given machine image. The source_machine_image must be specified. |
| `sourceMachineImageEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source machine image. Required if the source machine image is protected by a customer-supplied encryption key. |
| `sourceMachineImageId` | string | Output only. \[Output Only\] The unique ID of the machine image used to create this disk. This value identifies the exact machine image that was used to create this persistent disk. For example, if you created the persistent disk from a machine image that was later deleted and recreated under the same name, the source machine image ID would identify the exact version of the machine image that was used. |
| `sourceSnapshot` | string | The source snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/global/snapshots/snapshot - projects/project/global/snapshots/snapshot - global/snapshots/snapshot |
| `sourceSnapshotEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source snapshot. Required if the source snapshot is protected by a customer-supplied encryption key. |
| `sourceSnapshotId` | string | Output only. \[Output Only\] The unique ID of the snapshot used to create this disk. This value identifies the exact snapshot that was used to create this persistent disk. For example, if you created the persistent disk from a snapshot that was later deleted and recreated under the same name, the source snapshot ID would identify the exact version of the snapshot that was used. |
| `sourceStorageObject` | string | The full Google Cloud Storage URI where the disk image is stored. This file must be a gzip-compressed tarball whose name ends in .tar.gz or virtual machine disk whose name ends in vmdk. Valid URIs may start with gs:// or https://storage.googleapis.com/. This flag is not optimized for creating multiple disks from a source storage object. To create many disks from a source storage object, use gcloud compute images import instead. |
| `status` | string enum | Output only. \[Output Only\] The status of disk creation. - CREATING: Disk is provisioning. - RESTORING: Source data is being copied into the disk. - FAILED: Disk creation failed. - READY: Disk is ready for use. - DELETING: Disk is deleting. Values: `CREATING`, `DELETING`, `FAILED`, `READY`, `RESTORING`, `UNAVAILABLE`. |
| `storagePool` | string | The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/storagePools/storagePool - projects/project/zones/zone/storagePools/storagePool - zones/zone/storagePools/storagePool |
| `type` | string | URL of the disk type resource describing which disk type to use to create the disk. Provide this when creating the disk. For example:projects/project/zones/zone/diskTypes/pd-ssd. See Persistent disk types. |
| `users` | array<string> | Output only. \[Output Only\] Links to the users of the disk (attached instances) in form:projects/project/zones/zone/instances/instance |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the disk resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `Disk` (alpha)

- Represents a Persistent Disk resource. Google Compute Engine has two Disk resources: \* Zonal \* Regional Persistent disks are required for running your VM instances. Create both boot and non-boot (data) persistent disks. For more information, read Persistent Disks. For more storage options, read Storage options. The disks resource represents a zonal persistent disk. For more information, readZonal persistent disks. The regionDisks resource represents a regional persistent disk. For more information, read Regional resources.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `accessMode` | string enum | The access mode of the disk. - READ_WRITE_SINGLE: The default AccessMode, means the disk can be attached to single instance in RW mode. - READ_WRITE_MANY: The AccessMode means the disk can be attached to multiple instances in RW mode. - READ_ONLY_MANY: The AccessMode means the disk can be attached to multiple instances in RO mode. The AccessMode is only valid for Hyperdisk disk types. Values: `READ_ONLY_MANY`, `READ_WRITE_MANY`, `READ_WRITE_SINGLE`. |
| `architecture` | string enum | The architecture of the disk. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `asyncPrimaryDisk` | DiskAsyncReplication | Disk asynchronously replicated into this disk. |
| `asyncSecondaryDisks` | object | Output only. \[Output Only\] A list of disks this disk is asynchronously replicated to. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `diskEncryptionKey` | CustomerEncryptionKey | Encrypts the disk using a customer-supplied encryption key or a customer-managed encryption key. Encryption keys do not protect access to metadata of the disk. After you encrypt a disk with a customer-supplied key, you must provide the same key if you use the disk later. For example, to create a disk snapshot, to create a disk image, to create a machine image, or to attach the disk to a virtual machine. After you encrypt a disk with a customer-managed key, thediskEncryptionKey.kmsKeyName is set to a key \*version\* name once the disk is created. The disk is encrypted with this version of the key. In the response, diskEncryptionKey.kmsKeyName appears in the following format: "diskEncryptionKey.kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeysVersions/version If you do not provide an encryption key when creating the disk, then the disk is encrypted using an automatically generated key and you don't need to provide a key to use the disk later. |
| `enableConfidentialCompute` | boolean | Whether this disk is using confidential compute mode. |
| `eraseWindowsVssSignature` | boolean | Specifies whether the disk restored from a source snapshot should erase Windows specific VSS signature. |
| `guestOsFeatures` | array<GuestOsFeature> | A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `interface` | string enum | \[Deprecated\] Specifies the disk interface to use for attaching this disk, which is either SCSI or NVME. The default isSCSI. Values: `NVME`, `SCSI`, `UNSPECIFIED`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#disk for disks. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this disk, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a disk. |
| `labels` | object | Labels to apply to this disk. These can be later modified by the setLabels method. |
| `lastAttachTimestamp` | string | Output only. \[Output Only\] Last attach timestamp inRFC3339 text format. |
| `lastDetachTimestamp` | string | Output only. \[Output Only\] Last detach timestamp inRFC3339 text format. |
| `licenseCodes` | array<string> | Integer license codes indicating which licenses are attached to this disk. |
| `licenses` | array<string> | A list of publicly visible licenses. Reserved for Google's use. |
| `locationHint` | string | An opaque location hint used to place the disk close to other resources. This field is for use by internal tools that use the public API. |
| `locked` | boolean | Output only. \[Output Only\] The field indicates if the disk is created from a locked source image. Attachment of a disk created from a locked source image will cause the following operations to become irreversibly prohibited: - R/W or R/O disk attachment to any other instance - Disk detachment. And the disk can only be deleted when the instance is deleted - Creation of images or snapshots - Disk cloning Furthermore, the instance with at least one disk with locked flag set to true will be prohibited from performing the operations below: - Further attachment of secondary disks. - Detachment of any disks - Create machine images - Create instance template - Delete the instance with --keep-disk parameter set to true for locked disks - Attach a locked disk with --auto-delete parameter set to false |
| `multiWriter` | boolean | Indicates whether or not the disk can be read/write attached to more than one instance. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `options` | string | Internal use only. |
| `params` | DiskParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `physicalBlockSizeBytes` | string (int64) | Physical block size of the persistent disk, in bytes. If not present in a request, a default value is used. The currently supported size is 4096, other sizes may be added in the future. If an unsupported value is requested, the error message will list the supported values for the caller's project. |
| `provisionedIops` | string (int64) | Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 10,000 and 120,000. For more details, see theExtreme persistent disk documentation. |
| `provisionedThroughput` | string (int64) | Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must be greater than or equal to 1. |
| `region` | string | Output only. \[Output Only\] URL of the region where the disk resides. Only applicable for regional resources. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `replicaZones` | array<string> | URLs of the zones where the disk should be replicated to. Only applicable for regional resources. |
| `resourcePolicies` | array<string> | Resource policies applied to this disk for automatic snapshot creations. |
| `resourceStatus` | DiskResourceStatus | Output only. \[Output Only\] Status information for the disk resource. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `sizeGb` | string (int64) | Size, in GB, of the persistent disk. You can specify this field when creating a persistent disk using thesourceImage, sourceSnapshot, orsourceDisk parameter, or specify it alone to create an empty persistent disk. If you specify this field along with a source, the value ofsizeGb must not be less than the size of the source. Acceptable values are greater than 0. |
| `sourceConsistencyGroupPolicy` | string | Output only. \[Output Only\] URL of the DiskConsistencyGroupPolicy for a secondary disk that was created using a consistency group. |
| `sourceConsistencyGroupPolicyId` | string | Output only. \[Output Only\] ID of the DiskConsistencyGroupPolicy for a secondary disk that was created using a consistency group. |
| `sourceDisk` | string | The source disk used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - https://www.googleapis.com/compute/v1/projects/project/regions/region/disks/disk - projects/project/zones/zone/disks/disk - projects/project/regions/region/disks/disk - zones/zone/disks/disk - regions/region/disks/disk |
| `sourceDiskId` | string | Output only. \[Output Only\] The unique ID of the disk used to create this disk. This value identifies the exact disk that was used to create this persistent disk. For example, if you created the persistent disk from a disk that was later deleted and recreated under the same name, the source disk ID would identify the exact version of the disk that was used. |
| `sourceImage` | string | The source image used to create this disk. If the source image is deleted, this field will not be set. To create a disk with one of the public operating system images, specify the image by its family name. For example, specifyfamily/debian-9 to use the latest Debian 9 image: projects/debian-cloud/global/images/family/debian-9 Alternatively, use a specific version of a public operating system image: projects/debian-cloud/global/images/debian-9-stretch-vYYYYMMDD To create a disk with a custom image that you created, specify the image name in the following format: global/images/my-custom-image You can also specify a custom image by its image family, which returns the latest version of the image in that family. Replace the image name with family/family-name: global/images/family/my-image-family |
| `sourceImageEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source image. Required if the source image is protected by a customer-supplied encryption key. |
| `sourceImageId` | string | Output only. \[Output Only\] The ID value of the image used to create this disk. This value identifies the exact image that was used to create this persistent disk. For example, if you created the persistent disk from an image that was later deleted and recreated under the same name, the source image ID would identify the exact version of the image that was used. |
| `sourceInstantSnapshot` | string | The source instant snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instantSnapshots/instantSnapshot - projects/project/zones/zone/instantSnapshots/instantSnapshot - zones/zone/instantSnapshots/instantSnapshot |
| `sourceInstantSnapshotId` | string | Output only. \[Output Only\] The unique ID of the instant snapshot used to create this disk. This value identifies the exact instant snapshot that was used to create this persistent disk. For example, if you created the persistent disk from an instant snapshot that was later deleted and recreated under the same name, the source instant snapshot ID would identify the exact version of the instant snapshot that was used. |
| `sourceMachineImage` | string | The machine image to create the disk from. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/global/machineImages/machineImage - projects/project/global/machineImages/machineImage - global/machineImages/machineImage |
| `sourceMachineImageDiskDeviceName` | string | The device name of a disk within a given machine image. The source_machine_image must be specified. |
| `sourceMachineImageEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source machine image. Required if the source machine image is protected by a customer-supplied encryption key. |
| `sourceMachineImageId` | string | Output only. \[Output Only\] The unique ID of the machine image used to create this disk. This value identifies the exact machine image that was used to create this persistent disk. For example, if you created the persistent disk from a machine image that was later deleted and recreated under the same name, the source machine image ID would identify the exact version of the machine image that was used. |
| `sourceSnapshot` | string | The source snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/global/snapshots/snapshot - projects/project/global/snapshots/snapshot - global/snapshots/snapshot |
| `sourceSnapshotEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source snapshot. Required if the source snapshot is protected by a customer-supplied encryption key. |
| `sourceSnapshotId` | string | Output only. \[Output Only\] The unique ID of the snapshot used to create this disk. This value identifies the exact snapshot that was used to create this persistent disk. For example, if you created the persistent disk from a snapshot that was later deleted and recreated under the same name, the source snapshot ID would identify the exact version of the snapshot that was used. |
| `sourceStorageObject` | string | The full Google Cloud Storage URI where the disk image is stored. This file must be a gzip-compressed tarball whose name ends in .tar.gz or virtual machine disk whose name ends in vmdk. Valid URIs may start with gs:// or https://storage.googleapis.com/. This flag is not optimized for creating multiple disks from a source storage object. To create many disks from a source storage object, use gcloud compute images import instead. |
| `status` | string enum | Output only. \[Output Only\] The status of disk creation. - CREATING: Disk is provisioning. - RESTORING: Source data is being copied into the disk. - FAILED: Disk creation failed. - READY: Disk is ready for use. - DELETING: Disk is deleting. Values: `CREATING`, `DELETING`, `FAILED`, `READY`, `RESTORING`, `UNAVAILABLE`. |
| `storagePool` | string | The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/storagePools/storagePool - projects/project/zones/zone/storagePools/storagePool - zones/zone/storagePools/storagePool |
| `storageType` | string enum | \[Deprecated\] Storage type of the persistent disk. Values: `HDD`, `SSD`. |
| `type` | string | URL of the disk type resource describing which disk type to use to create the disk. Provide this when creating the disk. For example:projects/project/zones/zone/diskTypes/pd-ssd. See Persistent disk types. |
| `users` | array<string> | Output only. \[Output Only\] Links to the users of the disk (attached instances) in form:projects/project/zones/zone/instances/instance |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the disk resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `Disk` (beta)

- Represents a Persistent Disk resource. Google Compute Engine has two Disk resources: \* Zonal \* Regional Persistent disks are required for running your VM instances. Create both boot and non-boot (data) persistent disks. For more information, read Persistent Disks. For more storage options, read Storage options. The disks resource represents a zonal persistent disk. For more information, readZonal persistent disks. The regionDisks resource represents a regional persistent disk. For more information, read Regional resources.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `accessMode` | string enum | The access mode of the disk. - READ_WRITE_SINGLE: The default AccessMode, means the disk can be attached to single instance in RW mode. - READ_WRITE_MANY: The AccessMode means the disk can be attached to multiple instances in RW mode. - READ_ONLY_MANY: The AccessMode means the disk can be attached to multiple instances in RO mode. The AccessMode is only valid for Hyperdisk disk types. Values: `READ_ONLY_MANY`, `READ_WRITE_MANY`, `READ_WRITE_SINGLE`. |
| `architecture` | string enum | The architecture of the disk. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `asyncPrimaryDisk` | DiskAsyncReplication | Disk asynchronously replicated into this disk. |
| `asyncSecondaryDisks` | object | Output only. \[Output Only\] A list of disks this disk is asynchronously replicated to. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `diskEncryptionKey` | CustomerEncryptionKey | Encrypts the disk using a customer-supplied encryption key or a customer-managed encryption key. Encryption keys do not protect access to metadata of the disk. After you encrypt a disk with a customer-supplied key, you must provide the same key if you use the disk later. For example, to create a disk snapshot, to create a disk image, to create a machine image, or to attach the disk to a virtual machine. After you encrypt a disk with a customer-managed key, thediskEncryptionKey.kmsKeyName is set to a key \*version\* name once the disk is created. The disk is encrypted with this version of the key. In the response, diskEncryptionKey.kmsKeyName appears in the following format: "diskEncryptionKey.kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeysVersions/version If you do not provide an encryption key when creating the disk, then the disk is encrypted using an automatically generated key and you don't need to provide a key to use the disk later. |
| `enableConfidentialCompute` | boolean | Whether this disk is using confidential compute mode. |
| `eraseWindowsVssSignature` | boolean | Specifies whether the disk restored from a source snapshot should erase Windows specific VSS signature. |
| `guestOsFeatures` | array<GuestOsFeature> | A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `interface` | string enum | \[Deprecated\] Specifies the disk interface to use for attaching this disk, which is either SCSI or NVME. The default isSCSI. Values: `NVME`, `SCSI`, `UNSPECIFIED`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#disk for disks. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this disk, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a disk. |
| `labels` | object | Labels to apply to this disk. These can be later modified by the setLabels method. |
| `lastAttachTimestamp` | string | Output only. \[Output Only\] Last attach timestamp inRFC3339 text format. |
| `lastDetachTimestamp` | string | Output only. \[Output Only\] Last detach timestamp inRFC3339 text format. |
| `licenseCodes` | array<string> | Integer license codes indicating which licenses are attached to this disk. |
| `licenses` | array<string> | A list of publicly visible licenses. Reserved for Google's use. |
| `locationHint` | string | An opaque location hint used to place the disk close to other resources. This field is for use by internal tools that use the public API. |
| `locked` | boolean | Output only. \[Output Only\] The field indicates if the disk is created from a locked source image. Attachment of a disk created from a locked source image will cause the following operations to become irreversibly prohibited: - R/W or R/O disk attachment to any other instance - Disk detachment. And the disk can only be deleted when the instance is deleted - Creation of images or snapshots - Disk cloning Furthermore, the instance with at least one disk with locked flag set to true will be prohibited from performing the operations below: - Further attachment of secondary disks. - Detachment of any disks - Create machine images - Create instance template - Delete the instance with --keep-disk parameter set to true for locked disks - Attach a locked disk with --auto-delete parameter set to false |
| `multiWriter` | boolean | Indicates whether or not the disk can be read/write attached to more than one instance. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `options` | string | Internal use only. |
| `params` | DiskParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `physicalBlockSizeBytes` | string (int64) | Physical block size of the persistent disk, in bytes. If not present in a request, a default value is used. The currently supported size is 4096, other sizes may be added in the future. If an unsupported value is requested, the error message will list the supported values for the caller's project. |
| `provisionedIops` | string (int64) | Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 10,000 and 120,000. For more details, see theExtreme persistent disk documentation. |
| `provisionedThroughput` | string (int64) | Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must be greater than or equal to 1. |
| `region` | string | Output only. \[Output Only\] URL of the region where the disk resides. Only applicable for regional resources. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `replicaZones` | array<string> | URLs of the zones where the disk should be replicated to. Only applicable for regional resources. |
| `resourcePolicies` | array<string> | Resource policies applied to this disk for automatic snapshot creations. |
| `resourceStatus` | DiskResourceStatus | Output only. \[Output Only\] Status information for the disk resource. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `sizeGb` | string (int64) | Size, in GB, of the persistent disk. You can specify this field when creating a persistent disk using thesourceImage, sourceSnapshot, orsourceDisk parameter, or specify it alone to create an empty persistent disk. If you specify this field along with a source, the value ofsizeGb must not be less than the size of the source. Acceptable values are greater than 0. |
| `sourceConsistencyGroupPolicy` | string | Output only. \[Output Only\] URL of the DiskConsistencyGroupPolicy for a secondary disk that was created using a consistency group. |
| `sourceConsistencyGroupPolicyId` | string | Output only. \[Output Only\] ID of the DiskConsistencyGroupPolicy for a secondary disk that was created using a consistency group. |
| `sourceDisk` | string | The source disk used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - https://www.googleapis.com/compute/v1/projects/project/regions/region/disks/disk - projects/project/zones/zone/disks/disk - projects/project/regions/region/disks/disk - zones/zone/disks/disk - regions/region/disks/disk |
| `sourceDiskId` | string | Output only. \[Output Only\] The unique ID of the disk used to create this disk. This value identifies the exact disk that was used to create this persistent disk. For example, if you created the persistent disk from a disk that was later deleted and recreated under the same name, the source disk ID would identify the exact version of the disk that was used. |
| `sourceImage` | string | The source image used to create this disk. If the source image is deleted, this field will not be set. To create a disk with one of the public operating system images, specify the image by its family name. For example, specifyfamily/debian-9 to use the latest Debian 9 image: projects/debian-cloud/global/images/family/debian-9 Alternatively, use a specific version of a public operating system image: projects/debian-cloud/global/images/debian-9-stretch-vYYYYMMDD To create a disk with a custom image that you created, specify the image name in the following format: global/images/my-custom-image You can also specify a custom image by its image family, which returns the latest version of the image in that family. Replace the image name with family/family-name: global/images/family/my-image-family |
| `sourceImageEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source image. Required if the source image is protected by a customer-supplied encryption key. |
| `sourceImageId` | string | Output only. \[Output Only\] The ID value of the image used to create this disk. This value identifies the exact image that was used to create this persistent disk. For example, if you created the persistent disk from an image that was later deleted and recreated under the same name, the source image ID would identify the exact version of the image that was used. |
| `sourceInstantSnapshot` | string | The source instant snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instantSnapshots/instantSnapshot - projects/project/zones/zone/instantSnapshots/instantSnapshot - zones/zone/instantSnapshots/instantSnapshot |
| `sourceInstantSnapshotId` | string | Output only. \[Output Only\] The unique ID of the instant snapshot used to create this disk. This value identifies the exact instant snapshot that was used to create this persistent disk. For example, if you created the persistent disk from an instant snapshot that was later deleted and recreated under the same name, the source instant snapshot ID would identify the exact version of the instant snapshot that was used. |
| `sourceMachineImage` | string | The machine image to create the disk from. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/global/machineImages/machineImage - projects/project/global/machineImages/machineImage - global/machineImages/machineImage |
| `sourceMachineImageDiskDeviceName` | string | The device name of a disk within a given machine image. The source_machine_image must be specified. |
| `sourceMachineImageEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source machine image. Required if the source machine image is protected by a customer-supplied encryption key. |
| `sourceMachineImageId` | string | Output only. \[Output Only\] The unique ID of the machine image used to create this disk. This value identifies the exact machine image that was used to create this persistent disk. For example, if you created the persistent disk from a machine image that was later deleted and recreated under the same name, the source machine image ID would identify the exact version of the machine image that was used. |
| `sourceSnapshot` | string | The source snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/global/snapshots/snapshot - projects/project/global/snapshots/snapshot - global/snapshots/snapshot |
| `sourceSnapshotEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source snapshot. Required if the source snapshot is protected by a customer-supplied encryption key. |
| `sourceSnapshotId` | string | Output only. \[Output Only\] The unique ID of the snapshot used to create this disk. This value identifies the exact snapshot that was used to create this persistent disk. For example, if you created the persistent disk from a snapshot that was later deleted and recreated under the same name, the source snapshot ID would identify the exact version of the snapshot that was used. |
| `sourceStorageObject` | string | The full Google Cloud Storage URI where the disk image is stored. This file must be a gzip-compressed tarball whose name ends in .tar.gz or virtual machine disk whose name ends in vmdk. Valid URIs may start with gs:// or https://storage.googleapis.com/. This flag is not optimized for creating multiple disks from a source storage object. To create many disks from a source storage object, use gcloud compute images import instead. |
| `status` | string enum | Output only. \[Output Only\] The status of disk creation. - CREATING: Disk is provisioning. - RESTORING: Source data is being copied into the disk. - FAILED: Disk creation failed. - READY: Disk is ready for use. - DELETING: Disk is deleting. Values: `CREATING`, `DELETING`, `FAILED`, `READY`, `RESTORING`, `UNAVAILABLE`. |
| `storagePool` | string | The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/storagePools/storagePool - projects/project/zones/zone/storagePools/storagePool - zones/zone/storagePools/storagePool |
| `storageType` | string enum | \[Deprecated\] Storage type of the persistent disk. Values: `HDD`, `SSD`. |
| `type` | string | URL of the disk type resource describing which disk type to use to create the disk. Provide this when creating the disk. For example:projects/project/zones/zone/diskTypes/pd-ssd. See Persistent disk types. |
| `users` | array<string> | Output only. \[Output Only\] Links to the users of the disk (attached instances) in form:projects/project/zones/zone/instances/instance |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the disk resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `Disk` (preview)

- Represents a Persistent Disk resource. Google Compute Engine has two Disk resources: \* Zonal \* Regional Persistent disks are required for running your VM instances. Create both boot and non-boot (data) persistent disks. For more information, read Persistent Disks. For more storage options, read Storage options. The disks resource represents a zonal persistent disk. For more information, readZonal persistent disks. The regionDisks resource represents a regional persistent disk. For more information, read Regional resources.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `accessMode` | string enum | The access mode of the disk. - READ_WRITE_SINGLE: The default AccessMode, means the disk can be attached to single instance in RW mode. - READ_WRITE_MANY: The AccessMode means the disk can be attached to multiple instances in RW mode. - READ_ONLY_MANY: The AccessMode means the disk can be attached to multiple instances in RO mode. The AccessMode is only valid for Hyperdisk disk types. Values: `READ_ONLY_MANY`, `READ_WRITE_MANY`, `READ_WRITE_SINGLE`. |
| `architecture` | string enum | The architecture of the disk. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `asyncPrimaryDisk` | DiskAsyncReplication | Disk asynchronously replicated into this disk. |
| `asyncSecondaryDisks` | object | Output only. \[Output Only\] A list of disks this disk is asynchronously replicated to. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `diskEncryptionKey` | CustomerEncryptionKey | Encrypts the disk using a customer-supplied encryption key or a customer-managed encryption key. Encryption keys do not protect access to metadata of the disk. After you encrypt a disk with a customer-supplied key, you must provide the same key if you use the disk later. For example, to create a disk snapshot, to create a disk image, to create a machine image, or to attach the disk to a virtual machine. After you encrypt a disk with a customer-managed key, thediskEncryptionKey.kmsKeyName is set to a key \*version\* name once the disk is created. The disk is encrypted with this version of the key. In the response, diskEncryptionKey.kmsKeyName appears in the following format: "diskEncryptionKey.kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeysVersions/version If you do not provide an encryption key when creating the disk, then the disk is encrypted using an automatically generated key and you don't need to provide a key to use the disk later. |
| `enableConfidentialCompute` | boolean | Whether this disk is using confidential compute mode. |
| `guestOsFeatures` | array<GuestOsFeature> | A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#disk for disks. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this disk, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a disk. |
| `labels` | object | Labels to apply to this disk. These can be later modified by the setLabels method. |
| `lastAttachTimestamp` | string | Output only. \[Output Only\] Last attach timestamp inRFC3339 text format. |
| `lastDetachTimestamp` | string | Output only. \[Output Only\] Last detach timestamp inRFC3339 text format. |
| `licenseCodes` | array<string> | Integer license codes indicating which licenses are attached to this disk. |
| `licenses` | array<string> | A list of publicly visible licenses. Reserved for Google's use. |
| `locationHint` | string | An opaque location hint used to place the disk close to other resources. This field is for use by internal tools that use the public API. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `options` | string | Internal use only. |
| `params` | DiskParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `physicalBlockSizeBytes` | string (int64) | Physical block size of the persistent disk, in bytes. If not present in a request, a default value is used. The currently supported size is 4096, other sizes may be added in the future. If an unsupported value is requested, the error message will list the supported values for the caller's project. |
| `provisionedIops` | string (int64) | Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 10,000 and 120,000. For more details, see theExtreme persistent disk documentation. |
| `provisionedThroughput` | string (int64) | Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must be greater than or equal to 1. |
| `region` | string | Output only. \[Output Only\] URL of the region where the disk resides. Only applicable for regional resources. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `replicaZones` | array<string> | URLs of the zones where the disk should be replicated to. Only applicable for regional resources. |
| `resourcePolicies` | array<string> | Resource policies applied to this disk for automatic snapshot creations. |
| `resourceStatus` | DiskResourceStatus | Output only. \[Output Only\] Status information for the disk resource. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `sizeGb` | string (int64) | Size, in GB, of the persistent disk. You can specify this field when creating a persistent disk using thesourceImage, sourceSnapshot, orsourceDisk parameter, or specify it alone to create an empty persistent disk. If you specify this field along with a source, the value ofsizeGb must not be less than the size of the source. Acceptable values are greater than 0. |
| `sourceConsistencyGroupPolicy` | string | Output only. \[Output Only\] URL of the DiskConsistencyGroupPolicy for a secondary disk that was created using a consistency group. |
| `sourceConsistencyGroupPolicyId` | string | Output only. \[Output Only\] ID of the DiskConsistencyGroupPolicy for a secondary disk that was created using a consistency group. |
| `sourceDisk` | string | The source disk used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - https://www.googleapis.com/compute/v1/projects/project/regions/region/disks/disk - projects/project/zones/zone/disks/disk - projects/project/regions/region/disks/disk - zones/zone/disks/disk - regions/region/disks/disk |
| `sourceDiskId` | string | Output only. \[Output Only\] The unique ID of the disk used to create this disk. This value identifies the exact disk that was used to create this persistent disk. For example, if you created the persistent disk from a disk that was later deleted and recreated under the same name, the source disk ID would identify the exact version of the disk that was used. |
| `sourceImage` | string | The source image used to create this disk. If the source image is deleted, this field will not be set. To create a disk with one of the public operating system images, specify the image by its family name. For example, specifyfamily/debian-9 to use the latest Debian 9 image: projects/debian-cloud/global/images/family/debian-9 Alternatively, use a specific version of a public operating system image: projects/debian-cloud/global/images/debian-9-stretch-vYYYYMMDD To create a disk with a custom image that you created, specify the image name in the following format: global/images/my-custom-image You can also specify a custom image by its image family, which returns the latest version of the image in that family. Replace the image name with family/family-name: global/images/family/my-image-family |
| `sourceImageEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source image. Required if the source image is protected by a customer-supplied encryption key. |
| `sourceImageId` | string | Output only. \[Output Only\] The ID value of the image used to create this disk. This value identifies the exact image that was used to create this persistent disk. For example, if you created the persistent disk from an image that was later deleted and recreated under the same name, the source image ID would identify the exact version of the image that was used. |
| `sourceInstantSnapshot` | string | The source instant snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instantSnapshots/instantSnapshot - projects/project/zones/zone/instantSnapshots/instantSnapshot - zones/zone/instantSnapshots/instantSnapshot |
| `sourceInstantSnapshotId` | string | Output only. \[Output Only\] The unique ID of the instant snapshot used to create this disk. This value identifies the exact instant snapshot that was used to create this persistent disk. For example, if you created the persistent disk from an instant snapshot that was later deleted and recreated under the same name, the source instant snapshot ID would identify the exact version of the instant snapshot that was used. |
| `sourceSnapshot` | string | The source snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/global/snapshots/snapshot - projects/project/global/snapshots/snapshot - global/snapshots/snapshot |
| `sourceSnapshotEncryptionKey` | CustomerEncryptionKey | Thecustomer-supplied encryption key of the source snapshot. Required if the source snapshot is protected by a customer-supplied encryption key. |
| `sourceSnapshotId` | string | Output only. \[Output Only\] The unique ID of the snapshot used to create this disk. This value identifies the exact snapshot that was used to create this persistent disk. For example, if you created the persistent disk from a snapshot that was later deleted and recreated under the same name, the source snapshot ID would identify the exact version of the snapshot that was used. |
| `sourceStorageObject` | string | The full Google Cloud Storage URI where the disk image is stored. This file must be a gzip-compressed tarball whose name ends in .tar.gz or virtual machine disk whose name ends in vmdk. Valid URIs may start with gs:// or https://storage.googleapis.com/. This flag is not optimized for creating multiple disks from a source storage object. To create many disks from a source storage object, use gcloud compute images import instead. |
| `status` | string enum | Output only. \[Output Only\] The status of disk creation. - CREATING: Disk is provisioning. - RESTORING: Source data is being copied into the disk. - FAILED: Disk creation failed. - READY: Disk is ready for use. - DELETING: Disk is deleting. Values: `CREATING`, `DELETING`, `FAILED`, `READY`, `RESTORING`, `UNAVAILABLE`. |
| `storagePool` | string | The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/storagePools/storagePool - projects/project/zones/zone/storagePools/storagePool - zones/zone/storagePools/storagePool |
| `type` | string | URL of the disk type resource describing which disk type to use to create the disk. Provide this when creating the disk. For example:projects/project/zones/zone/diskTypes/pd-ssd. See Persistent disk types. |
| `users` | array<string> | Output only. \[Output Only\] Links to the users of the disk (attached instances) in form:projects/project/zones/zone/instances/instance |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the disk resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `DiskAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of DisksScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#diskAggregatedList for aggregated lists of persistent disks. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `DiskAsyncReplication`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consistencyGroupPolicy` | string | Output only. \[Output Only\] URL of the DiskConsistencyGroupPolicy if replication was started on the disk as a member of a group. |
| `consistencyGroupPolicyId` | string | Output only. \[Output Only\] ID of the DiskConsistencyGroupPolicy if replication was started on the disk as a member of a group. |
| `disk` | string | The other disk asynchronously replicated to or from the current disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - projects/project/zones/zone/disks/disk - zones/zone/disks/disk |
| `diskId` | string | Output only. \[Output Only\] The unique ID of the other disk asynchronously replicated to or from the current disk. This value identifies the exact disk that was used to create this replication. For example, if you started replicating the persistent disk from a disk that was later deleted and recreated under the same name, the disk ID would identify the exact version of the disk that was used. |

### `DiskAsyncReplicationList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asyncReplicationDisk` | DiskAsyncReplication | — |

### `DiskConvertParams`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `forceStopInProgressSnapshot` | boolean | — |
| `provisionedIops` | string (int64) | — |
| `provisionedThroughput` | string (int64) | — |
| `quickConversionOnly` | boolean | — |
| `resetSupportedVmFamilies` | boolean | — |
| `targetDiskType` | string | — |

### `DiskInstantiationConfig`

- A specification of the desired way to instantiate a disk in the instance template when its created from a source instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoDelete` | boolean | Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance). |
| `customImage` | string | The custom source image to be used to restore this disk when instantiating this instance template. |
| `deviceName` | string | Specifies the device name of the disk to which the configurations apply to. |
| `instantiateFrom` | string enum | Specifies whether to include the disk and what image to use. Possible values are: - source-image: to use the same image that was used to create the source instance's corresponding disk. Applicable to the boot disk and additional read-write disks. - source-image-family: to use the same image family that was used to create the source instance's corresponding disk. Applicable to the boot disk and additional read-write disks. - custom-image: to use a user-provided image url for disk creation. Applicable to the boot disk and additional read-write disks. - attach-read-only: to attach a read-only disk. Applicable to read-only disks. - do-not-include: to exclude a disk from the template. Applicable to additional read-write disks, local SSDs, and read-only disks. Values: `ATTACH_READ_ONLY`, `BLANK`, `CUSTOM_IMAGE`, `DEFAULT`, `DO_NOT_INCLUDE`, `SOURCE_IMAGE`, `SOURCE_IMAGE_FAMILY`. |

### `DiskList`

- A list of Disk resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Disk> | A list of Disk resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#diskList for lists of disks. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `DiskMoveRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationZone` | string | The URL of the destination zone to move the disk. This can be a full or partial URL. For example, the following are all valid URLs to a zone: - https://www.googleapis.com/compute/v1/projects/project/zones/zone - projects/project/zones/zone - zones/zone |
| `targetDisk` | string | The URL of the target disk to move. This can be a full or partial URL. For example, the following are all valid URLs to a disk: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - projects/project/zones/zone/disks/disk - zones/zone/disks/disk |

### `DiskPairReplicationState`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `dataReplicationState` | string enum | Output only. \[Output Only\] The status of disk creation. - ASYNC_REPLICATION_STATE_INITIALIZING: The device is doing the initial replication after starting the replication. - ASYNC_REPLICATION_STATE_REPLICATING_HEALTHY: The primary disk is healthily replicating to the secondary device i.e. last_replication_time is within RPO. - ASYNC_REPLICATION_STATE_REPLICATING_BEHIND_HIGH_CHURN: The replication is lagging above the SLO limit due to the disk's change rate being above the supported limit. - ASYNC_REPLICATION_STATE_REPLICATING_BEHIND_SYSTEM_LAGGING: The replication is lagging, and the RPO is not being met due to some internal issue. - ASYNC_REPLICATION_STATE_REPLICATION_STUCK: The replication is completely stuck due to some internal error. - ASYNC_REPLICATION_STATE_STOPPING: The replication is under the process of being stopped. This is a transient state. - ASYNC_REPLICATION_STATE_STOPPED: The replication between the disk-pairs have stopped. - ASYNC_REPLICATION_STATE_REPLICATING_BEHIND_CG_HIGH_CHURN: The replication is lagging above the SLO limit for the disk in the consistency group due to disk's change rate being above the supported limit. Values: `ASYNC_REPLICATION_STATE_INITIALIZING`, `ASYNC_REPLICATION_STATE_REPLICATING_BEHIND_CG_HIGH_CHURN`, `ASYNC_REPLICATION_STATE_REPLICATING_BEHIND_HIGH_CHURN`, `ASYNC_REPLICATION_STATE_REPLICATING_BEHIND_SYSTEM_LAGGING`, `ASYNC_REPLICATION_STATE_REPLICATING_HEALTHY`, `ASYNC_REPLICATION_STATE_REPLICATION_STUCK`, `ASYNC_REPLICATION_STATE_STOPPED`, `ASYNC_REPLICATION_STATE_STOPPING`, `ASYNC_REPLICATION_STATE_UNSPECIFIED`. |
| `replicationDiskPair` | ReplicationDiskPair | — |

### `DiskParams`

- Additional disk params.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Input only. Resource manager tags to be bound to the disk. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id\|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty. |

### `DiskResourceStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asyncPrimaryDisk` | DiskResourceStatusAsyncReplicationStatus | — |
| `asyncSecondaryDisks` | object | Key: disk, value: AsyncReplicationStatus message |

### `DiskResourceStatus` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `asyncPrimaryDisk` | DiskResourceStatusAsyncReplicationStatus | — |
| `asyncSecondaryDisks` | object | Key: disk, value: AsyncReplicationStatus message |
| `usedBytes` | string (int64) | \[Output Only\] Space used by data stored in the disk (in bytes). Note that this field is set only when the disk is in a storage pool. |

### `DiskResourceStatusAsyncReplicationStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | — Values: `ACTIVE`, `CREATED`, `STARTING`, `STATE_UNSPECIFIED`, `STOPPED`, `STOPPING`. |

### `DiskSettings`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `accessLocation` | DiskSettingsAccessLocation | Policy of which locations are allowed to create regional snapshots. |

### `DiskSettings` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `accessLocation` | DiskSettingsAccessLocation | Policy of which locations are allowed to create regional snapshots. |
| `defaultResourcePolicies` | object | An optional parameter for storing the default resource policies that will be used for the Disks created in the given scope. The Key is a string type, provided by customers to uniquely identify the default Resource Policy entry. The Value is a Default ResourcePolicyDetails Object used to represent the detailed information of the Resource Policy entry. |

### `DiskSettingsAccessLocation`

- AccessLocation is only used for regional snapshot. It contains which regions are allowed to create a regional snapshot from disks located in the given region/zone. It includes key-value pairs designed to store the following structure. The keys should match their corresponding values, which must be provided: access_location: { locations { us-central1 { region: "us-central1" }, asia-west2 { region: "asia-west2" } } }
- Version: beta

| Field | Type | Description |
|---|---|---|
| `locations` | object | List of regions that can create a regional snapshot from the current region |
| `policy` | string enum | Policy of which location is allowed to access snapshot. Values: `ALL_REGIONS`, `POLICY_UNSPECIFIED`, `SPECIFIC_REGIONS`. |

### `DiskSettingsAccessLocationAccessLocationPreference`

- A structure for specifying an allowed target region to create snapshot.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `region` | string | Accessible region name |

### `DiskSettingsResourcePolicyDetails`

- This is the object for storing the detail information about the Resource Policy that will be set as default ones for the Disks that is using the DiskSettings. It contains: - one target Resource Policy referenced by its Fully-Qualified URL, - \[output only\] Disk Types that will be excluded from using this Resource Policy, - Other filtering support (e.g. Label filtering) for Default Resource Policy can be added here as well
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `excludedDiskTypes` | array<string> | Output only. \[Output Only\] A list of Disk Types that will be excluded from applying the Resource Policy referenced here. If absent, Disks created in any DiskType can use the referenced default Resource Policy. |
| `resourcePolicy` | string | The target Resource Policies identified by their Fully-Qualified URL. |

### `DiskType`

- Represents a Disk Type resource. Google Compute Engine has two Disk Type resources: \* Regional \* Zonal You can choose from a variety of disk types based on your needs. For more information, readStorage options. The diskTypes resource represents disk types for a zonal persistent disk. For more information, readZonal persistent disks. The regionDiskTypes resource represents disk types for a regional persistent disk. For more information, read Regional persistent disks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `defaultDiskSizeGb` | string (int64) | \[Output Only\] Server-defined default disk size in GB. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this disk type. |
| `description` | string | \[Output Only\] An optional description of this resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#diskType for disk types. |
| `name` | string | \[Output Only\] Name of the resource. |
| `region` | string | \[Output Only\] URL of the region where the disk type resides. Only applicable for regional resources. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `validDiskSize` | string | \[Output Only\] An optional textual description of the valid disk size, such as "10GB-10TB". |
| `zone` | string | \[Output Only\] URL of the zone where the disk type resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `DiskType` (alpha)

- Represents a Disk Type resource. Google Compute Engine has two Disk Type resources: \* Regional \* Zonal You can choose from a variety of disk types based on your needs. For more information, readStorage options. The diskTypes resource represents disk types for a zonal persistent disk. For more information, readZonal persistent disks. The regionDiskTypes resource represents disk types for a regional persistent disk. For more information, read Regional persistent disks.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `defaultDiskSizeGb` | string (int64) | \[Output Only\] Server-defined default disk size in GB. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this disk type. |
| `description` | string | \[Output Only\] An optional description of this resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#diskType for disk types. |
| `name` | string | \[Output Only\] Name of the resource. |
| `region` | string | \[Output Only\] URL of the region where the disk type resides. Only applicable for regional resources. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `validDiskSize` | string | \[Output Only\] An optional textual description of the valid disk size, such as "10GB-10TB". |
| `zone` | string | \[Output Only\] URL of the zone where the disk type resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `DiskTypeAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of DiskTypesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#diskTypeAggregatedList. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `DiskTypeList`

- Contains a list of disk types.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<DiskType> | A list of DiskType resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#diskTypeList for disk types. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `DiskTypesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskTypes` | array<DiskType> | \[Output Only\] A list of disk types contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of disk types when the list is empty. |

### `DiskUpdateKmsKeyRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Optional. The new KMS key to replace the current one on the disk. If empty, the disk will be re-encrypted using the primary version of the disk's current KMS key. The KMS key can be provided in the following formats: - projects/project_id/locations/location/keyRings/key_ring/cryptoKeys/key Where project is the project ID or project number. |

### `DisksAddResourcePoliciesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourcePolicies` | array<string> | Full or relative path to the resource policy to be added to this disk. You can only specify one resource policy. |

### `DisksConvertRequest`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `params` | DiskConvertParams | — |

### `DisksRemoveResourcePoliciesRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourcePolicies` | array<string> | Resource policies to be removed from this disk. |

### `DisksResizeRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sizeGb` | string (int64) | The new size of the persistent disk, which is specified in GB. |

### `DisksScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disks` | array<Disk> | \[Output Only\] A list of disks contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of disks when the list is empty. |

### `DisksStartAsyncReplicationRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asyncSecondaryDisk` | string | The secondary disk to start asynchronous replication to. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - https://www.googleapis.com/compute/v1/projects/project/regions/region/disks/disk - projects/project/zones/zone/disks/disk - projects/project/regions/region/disks/disk - zones/zone/disks/disk - regions/region/disks/disk |

### `DisksStopGroupAsyncReplicationResource`

- A transient resource used in compute.disks.stopGroupAsyncReplication and compute.regionDisks.stopGroupAsyncReplication. It is only used to process requests and is not persisted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourcePolicy` | string | The URL of the DiskConsistencyGroupPolicy for the group of disks to stop. This may be a full or partial URL, such as: - https://www.googleapis.com/compute/v1/projects/project/regions/region/resourcePolicies/resourcePolicy - projects/project/regions/region/resourcePolicies/resourcePolicy - regions/region/resourcePolicies/resourcePolicy |

### `DisplayDevice`

- A set of Display Device options
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableDisplay` | boolean | Defines whether the instance has Display enabled. |

### `DistributionPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetShape` | string enum | The distribution shape to which the group converges either proactively or on resize events (depending on the value set inupdatePolicy.instanceRedistributionType). Values: `ANY`, `ANY_SINGLE_ZONE`, `BALANCED`, `EVEN`. |
| `zones` | array<DistributionPolicyZoneConfiguration> | Zones where the regional managed instance group will create and manage its instances. By default, a regional MIG doesn't automatically select an AI zone to create instances, even if an AI zone is available in the specified region. To create instances in an AI zone in the selected region, you must explicitly specify it in the distribution policy together with the other preferred zones. |

### `DistributionPolicyZoneConfiguration`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `zone` | string | The URL of thezone. The zone must exist in the region where the managed instance group is located. |

### `DistributionPolicyZoneConfiguration` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `maxSize` | FixedOrPercent | Optional. The maximum size of the group in this zone. This value can be either a fixed number or, a percentage. If you set a percentage, the number of instances is rounded up if necessary. If unset, it is interpreted as unbounded. |
| `zone` | string | The URL of thezone. The zone must exist in the region where the managed instance group is located. |

### `Duration`

- A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nanos` | integer (int32) | Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive. |
| `seconds` | string (int64) | Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min \* 60 min/hr \* 24 hr/day \* 365.25 days/year \* 10000 years |

### `DynamicCompressionPolicy`

- Dynamic compression policy for this URL Map's route.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compressionMode` | string enum | Compress text responses using Brotli or gzip compression, based on the client's Accept-Encoding header. Values: `AUTOMATIC`, `DISABLED`. |

### `ErrorInfo`

- Describes the cause of the error with structured details. Example of an error when contacting the "pubsub.googleapis.com" API when it is not enabled: { "reason": "API_DISABLED" "domain": "googleapis.com" "metadata": { "resource": "projects/123", "service": "pubsub.googleapis.com" } } This response indicates that the pubsub.googleapis.com API is not enabled. Example of an error that is returned when attempting to create a Spanner instance in a region that is out of stock: { "reason": "STOCKOUT" "domain": "spanner.googleapis.com", "metadata": { "availableRegions": "us-central1,us-east2" } }
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domain` | string | The logical grouping to which the "reason" belongs. The error domain is typically the registered service name of the tool or product that generates the error. Example: "pubsub.googleapis.com". If the error is generated by some common infrastructure, the error domain must be a globally unique value that identifies the infrastructure. For Google API infrastructure, the error domain is "googleapis.com". |
| `metadatas` | object | Additional structured details about this error. Keys must match a regular expression of `a-z+` but should ideally be lowerCamelCase. Also, they must be limited to 64 characters in length. When identifying the current value of an exceeded limit, the units should be contained in the key, not the value. For example, rather than `{"instanceLimit": "100/request"}`, should be returned as, `{"instanceLimitPerRequest": "100"}`, if the client exceeds the number of instances that can be created in a single (batch) request. |
| `reason` | string | The reason of the error. This is a constant value that identifies the proximate cause of the error. Error reasons are unique within a particular domain of errors. This should be at most 63 characters and match a regular expression of `A-Z+[A-Z0-9]`, which represents UPPER_SNAKE_CASE. |

### `ExchangedPeeringRoute`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destRange` | string | The destination range of the route. |
| `imported` | boolean | True if the peering route has been imported from a peer. The actual import happens if the field networkPeering.importCustomRoutes is true for this network, and networkPeering.exportCustomRoutes is true for the peer network, and the import does not result in a route conflict. |
| `nextHopRegion` | string | The region of peering route next hop, only applies to dynamic routes. |
| `priority` | integer (uint32) | The priority of the peering route. |
| `type` | string enum | The type of the peering route. Values: `DYNAMIC_PEERING_ROUTE`, `STATIC_PEERING_ROUTE`, `SUBNET_PEERING_ROUTE`. |

### `ExchangedPeeringRoutesList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<ExchangedPeeringRoute> | A list of ExchangedPeeringRoute resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#exchangedPeeringRoutesList for exchanged peering routes lists. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `ExternalVpnGateway`

- Represents an external VPN gateway. External VPN gateway is the on-premises VPN gateway(s) or another cloud provider's VPN gateway that connects to your Google Cloud VPN gateway. To create a highly available VPN from Google Cloud Platform to your VPN gateway or another cloud provider's VPN gateway, you must create a external VPN gateway resource with information about the other gateway. For more information about using external VPN gateways, see Creating an HA VPN gateway and tunnel pair to a peer VPN.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `interfaces` | array<ExternalVpnGatewayInterface> | A list of interfaces for this external VPN gateway. If your peer-side gateway is an on-premises gateway and non-AWS cloud providers' gateway, at most two interfaces can be provided for an external VPN gateway. If your peer side is an AWS virtual private gateway, four interfaces should be provided for an external VPN gateway. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#externalVpnGateway for externalVpnGateways. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this ExternalVpnGateway, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an ExternalVpnGateway. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | ExternalVpnGatewayParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `redundancyType` | string enum | Indicates the user-supplied redundancy type of this external VPN gateway. Values: `FOUR_IPS_REDUNDANCY`, `SINGLE_IP_INTERNALLY_REDUNDANT`, `TWO_IPS_REDUNDANCY`. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |

### `ExternalVpnGatewayInterface`

- The interface for the external VPN gateway.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | integer (uint32) | The numeric ID of this interface. The allowed input values for this id for different redundancy types of external VPN gateway: - SINGLE_IP_INTERNALLY_REDUNDANT - 0 - TWO_IPS_REDUNDANCY - 0, 1 - FOUR_IPS_REDUNDANCY - 0, 1, 2, 3 |
| `ipAddress` | string | IP address of the interface in the external VPN gateway. Only IPv4 is supported. This IP address can be either from your on-premise gateway or another Cloud provider's VPN gateway, it cannot be an IP address from Google Compute Engine. |
| `ipv6Address` | string | IPv6 address of the interface in the external VPN gateway. This IPv6 address can be either from your on-premise gateway or another Cloud provider's VPN gateway, it cannot be an IP address from Google Compute Engine. Must specify an IPv6 address (not IPV4-mapped) using any format described in RFC 4291 (e.g. 2001:db8:0:0:2d9:51:0:0). The output format is RFC 5952 format (e.g. 2001:db8::2d9:51:0:0). |

### `ExternalVpnGatewayList`

- Response to the list request, and contains a list of externalVpnGateways.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<ExternalVpnGateway> | A list of ExternalVpnGateway resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#externalVpnGatewayList for lists of externalVpnGateways. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ExternalVpnGatewayParams`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. \* Inconsistent format is not supported. For instance: {"tagKeys/333" : "tagValues/444", "123/env" : "prod"} is invalid. |

### `FileContentBuffer`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string (byte) | The raw content in the secure keys file. |
| `fileType` | string enum | The file type of source file. Values: `BIN`, `UNDEFINED`, `X509`. |

### `Firewall`

- Represents a Firewall Rule resource. Firewall rules allow or deny ingress traffic to, and egress traffic from your instances. For more information, readFirewall rules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowed` | array<object> | The list of ALLOW rules specified by this firewall. Each rule specifies a protocol and port-range tuple that describes a permitted connection. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `denied` | array<object> | The list of DENY rules specified by this firewall. Each rule specifies a protocol and port-range tuple that describes a denied connection. |
| `description` | string | An optional description of this resource. Provide this field when you create the resource. |
| `destinationRanges` | array<string> | If destination ranges are specified, the firewall rule applies only to traffic that has destination IP address in these ranges. These ranges must be expressed inCIDR format. Both IPv4 and IPv6 are supported. |
| `direction` | string enum | Direction of traffic to which this firewall applies, either `INGRESS` or `EGRESS`. The default is `INGRESS`. For `EGRESS` traffic, you cannot specify the sourceTags fields. Values: `EGRESS`, `INGRESS`. |
| `disabled` | boolean | Denotes whether the firewall rule is disabled. When set to true, the firewall rule is not enforced and the network behaves as if it did not exist. If this is unspecified, the firewall rule will be enabled. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#firewall for firewall rules. |
| `logConfig` | FirewallLogConfig | This field denotes the logging options for a particular firewall rule. If logging is enabled, logs will be exported to Cloud Logging. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit. |
| `network` | string | URL of the network resource for this firewall rule. If not specified when creating a firewall rule, the default network is used: global/networks/default If you choose to specify this field, you can specify the network as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/myproject/global/networks/my-network - projects/myproject/global/networks/my-network - global/networks/default |
| `params` | FirewallParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `priority` | integer (int32) | Priority for this rule. This is an integer between `0` and `65535`, both inclusive. The default value is `1000`. Relative priorities determine which rule takes effect if multiple rules apply. Lower values indicate higher priority. For example, a rule with priority `0` has higher precedence than a rule with priority `1`. DENY rules take precedence over ALLOW rules if they have equal priority. Note that VPC networks have implied rules with a priority of `65535`. To avoid conflicts with the implied rules, use a priority number less than `65535`. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `sourceRanges` | array<string> | If source ranges are specified, the firewall rule applies only to traffic that has a source IP address in these ranges. These ranges must be expressed inCIDR format. One or both of sourceRanges and sourceTags may be set. If both fields are set, the rule applies to traffic that has a source IP address within sourceRanges OR a source IP from a resource with a matching tag listed in thesourceTags field. The connection does not need to match both fields for the rule to apply. Both IPv4 and IPv6 are supported. |
| `sourceServiceAccounts` | array<string> | If source service accounts are specified, the firewall rules apply only to traffic originating from an instance with a service account in this list. Source service accounts cannot be used to control traffic to an instance's external IP address because service accounts are associated with an instance, not an IP address.sourceRanges can be set at the same time assourceServiceAccounts. If both are set, the firewall applies to traffic that has a source IP address within the sourceRanges OR a source IP that belongs to an instance with service account listed insourceServiceAccount. The connection does not need to match both fields for the firewall to apply.sourceServiceAccounts cannot be used at the same time assourceTags or targetTags. |
| `sourceTags` | array<string> | If source tags are specified, the firewall rule applies only to traffic with source IPs that match the primary network interfaces of VM instances that have the tag and are in the same VPC network. Source tags cannot be used to control traffic to an instance's external IP address, it only applies to traffic between instances in the same virtual network. Because tags are associated with instances, not IP addresses. One or both of sourceRanges and sourceTags may be set. If both fields are set, the firewall applies to traffic that has a source IP address within sourceRanges OR a source IP from a resource with a matching tag listed in the sourceTags field. The connection does not need to match both fields for the firewall to apply. |
| `targetServiceAccounts` | array<string> | A list of service accounts indicating sets of instances located in the network that may make network connections as specified inallowed\[\].targetServiceAccounts cannot be used at the same time astargetTags or sourceTags. If neither targetServiceAccounts nor targetTags are specified, the firewall rule applies to all instances on the specified network. |
| `targetTags` | array<string> | A list of tags that controls which instances the firewall rule applies to. If targetTags are specified, then the firewall rule applies only to instances in the VPC network that have one of those tags. If no targetTags are specified, the firewall rule applies to all instances on the specified network. |

### `Firewall` (alpha)

- Represents a Firewall Rule resource. Firewall rules allow or deny ingress traffic to, and egress traffic from your instances. For more information, readFirewall rules.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `allowed` | array<object> | The list of ALLOW rules specified by this firewall. Each rule specifies a protocol and port-range tuple that describes a permitted connection. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `denied` | array<object> | The list of DENY rules specified by this firewall. Each rule specifies a protocol and port-range tuple that describes a denied connection. |
| `description` | string | An optional description of this resource. Provide this field when you create the resource. |
| `destinationRanges` | array<string> | If destination ranges are specified, the firewall rule applies only to traffic that has destination IP address in these ranges. These ranges must be expressed inCIDR format. Both IPv4 and IPv6 are supported. |
| `direction` | string enum | Direction of traffic to which this firewall applies, either `INGRESS` or `EGRESS`. The default is `INGRESS`. For `EGRESS` traffic, you cannot specify the sourceTags fields. Values: `EGRESS`, `INGRESS`. |
| `disabled` | boolean | Denotes whether the firewall rule is disabled. When set to true, the firewall rule is not enforced and the network behaves as if it did not exist. If this is unspecified, the firewall rule will be enabled. |
| `enableLogging` | boolean | Deprecated in favor of enable in LogConfig. This field denotes whether to enable logging for a particular firewall rule. If logging is enabled, logs will be exported t Cloud Logging. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#firewall for firewall rules. |
| `logConfig` | FirewallLogConfig | This field denotes the logging options for a particular firewall rule. If logging is enabled, logs will be exported to Cloud Logging. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit. |
| `network` | string | URL of the network resource for this firewall rule. If not specified when creating a firewall rule, the default network is used: global/networks/default If you choose to specify this field, you can specify the network as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/myproject/global/networks/my-network - projects/myproject/global/networks/my-network - global/networks/default |
| `params` | FirewallParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `priority` | integer (int32) | Priority for this rule. This is an integer between `0` and `65535`, both inclusive. The default value is `1000`. Relative priorities determine which rule takes effect if multiple rules apply. Lower values indicate higher priority. For example, a rule with priority `0` has higher precedence than a rule with priority `1`. DENY rules take precedence over ALLOW rules if they have equal priority. Note that VPC networks have implied rules with a priority of `65535`. To avoid conflicts with the implied rules, use a priority number less than `65535`. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `sourceRanges` | array<string> | If source ranges are specified, the firewall rule applies only to traffic that has a source IP address in these ranges. These ranges must be expressed inCIDR format. One or both of sourceRanges and sourceTags may be set. If both fields are set, the rule applies to traffic that has a source IP address within sourceRanges OR a source IP from a resource with a matching tag listed in thesourceTags field. The connection does not need to match both fields for the rule to apply. Both IPv4 and IPv6 are supported. |
| `sourceServiceAccounts` | array<string> | If source service accounts are specified, the firewall rules apply only to traffic originating from an instance with a service account in this list. Source service accounts cannot be used to control traffic to an instance's external IP address because service accounts are associated with an instance, not an IP address.sourceRanges can be set at the same time assourceServiceAccounts. If both are set, the firewall applies to traffic that has a source IP address within the sourceRanges OR a source IP that belongs to an instance with service account listed insourceServiceAccount. The connection does not need to match both fields for the firewall to apply.sourceServiceAccounts cannot be used at the same time assourceTags or targetTags. |
| `sourceTags` | array<string> | If source tags are specified, the firewall rule applies only to traffic with source IPs that match the primary network interfaces of VM instances that have the tag and are in the same VPC network. Source tags cannot be used to control traffic to an instance's external IP address, it only applies to traffic between instances in the same virtual network. Because tags are associated with instances, not IP addresses. One or both of sourceRanges and sourceTags may be set. If both fields are set, the firewall applies to traffic that has a source IP address within sourceRanges OR a source IP from a resource with a matching tag listed in the sourceTags field. The connection does not need to match both fields for the firewall to apply. |
| `targetServiceAccounts` | array<string> | A list of service accounts indicating sets of instances located in the network that may make network connections as specified inallowed\[\].targetServiceAccounts cannot be used at the same time astargetTags or sourceTags. If neither targetServiceAccounts nor targetTags are specified, the firewall rule applies to all instances on the specified network. |
| `targetTags` | array<string> | A list of tags that controls which instances the firewall rule applies to. If targetTags are specified, then the firewall rule applies only to instances in the VPC network that have one of those tags. If no targetTags are specified, the firewall rule applies to all instances on the specified network. |

### `Firewall` (beta)

- Represents a Firewall Rule resource. Firewall rules allow or deny ingress traffic to, and egress traffic from your instances. For more information, readFirewall rules.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `allowed` | array<object> | The list of ALLOW rules specified by this firewall. Each rule specifies a protocol and port-range tuple that describes a permitted connection. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `denied` | array<object> | The list of DENY rules specified by this firewall. Each rule specifies a protocol and port-range tuple that describes a denied connection. |
| `description` | string | An optional description of this resource. Provide this field when you create the resource. |
| `destinationRanges` | array<string> | If destination ranges are specified, the firewall rule applies only to traffic that has destination IP address in these ranges. These ranges must be expressed inCIDR format. Both IPv4 and IPv6 are supported. |
| `direction` | string enum | Direction of traffic to which this firewall applies, either `INGRESS` or `EGRESS`. The default is `INGRESS`. For `EGRESS` traffic, you cannot specify the sourceTags fields. Values: `EGRESS`, `INGRESS`. |
| `disabled` | boolean | Denotes whether the firewall rule is disabled. When set to true, the firewall rule is not enforced and the network behaves as if it did not exist. If this is unspecified, the firewall rule will be enabled. |
| `enableLogging` | boolean | Deprecated in favor of enable in LogConfig. This field denotes whether to enable logging for a particular firewall rule. If logging is enabled, logs will be exported t Cloud Logging. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#firewall for firewall rules. |
| `logConfig` | FirewallLogConfig | This field denotes the logging options for a particular firewall rule. If logging is enabled, logs will be exported to Cloud Logging. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit. |
| `network` | string | URL of the network resource for this firewall rule. If not specified when creating a firewall rule, the default network is used: global/networks/default If you choose to specify this field, you can specify the network as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/myproject/global/networks/my-network - projects/myproject/global/networks/my-network - global/networks/default |
| `params` | FirewallParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `priority` | integer (int32) | Priority for this rule. This is an integer between `0` and `65535`, both inclusive. The default value is `1000`. Relative priorities determine which rule takes effect if multiple rules apply. Lower values indicate higher priority. For example, a rule with priority `0` has higher precedence than a rule with priority `1`. DENY rules take precedence over ALLOW rules if they have equal priority. Note that VPC networks have implied rules with a priority of `65535`. To avoid conflicts with the implied rules, use a priority number less than `65535`. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `sourceRanges` | array<string> | If source ranges are specified, the firewall rule applies only to traffic that has a source IP address in these ranges. These ranges must be expressed inCIDR format. One or both of sourceRanges and sourceTags may be set. If both fields are set, the rule applies to traffic that has a source IP address within sourceRanges OR a source IP from a resource with a matching tag listed in thesourceTags field. The connection does not need to match both fields for the rule to apply. Both IPv4 and IPv6 are supported. |
| `sourceServiceAccounts` | array<string> | If source service accounts are specified, the firewall rules apply only to traffic originating from an instance with a service account in this list. Source service accounts cannot be used to control traffic to an instance's external IP address because service accounts are associated with an instance, not an IP address.sourceRanges can be set at the same time assourceServiceAccounts. If both are set, the firewall applies to traffic that has a source IP address within the sourceRanges OR a source IP that belongs to an instance with service account listed insourceServiceAccount. The connection does not need to match both fields for the firewall to apply.sourceServiceAccounts cannot be used at the same time assourceTags or targetTags. |
| `sourceTags` | array<string> | If source tags are specified, the firewall rule applies only to traffic with source IPs that match the primary network interfaces of VM instances that have the tag and are in the same VPC network. Source tags cannot be used to control traffic to an instance's external IP address, it only applies to traffic between instances in the same virtual network. Because tags are associated with instances, not IP addresses. One or both of sourceRanges and sourceTags may be set. If both fields are set, the firewall applies to traffic that has a source IP address within sourceRanges OR a source IP from a resource with a matching tag listed in the sourceTags field. The connection does not need to match both fields for the firewall to apply. |
| `targetServiceAccounts` | array<string> | A list of service accounts indicating sets of instances located in the network that may make network connections as specified inallowed\[\].targetServiceAccounts cannot be used at the same time astargetTags or sourceTags. If neither targetServiceAccounts nor targetTags are specified, the firewall rule applies to all instances on the specified network. |
| `targetTags` | array<string> | A list of tags that controls which instances the firewall rule applies to. If targetTags are specified, then the firewall rule applies only to instances in the VPC network that have one of those tags. If no targetTags are specified, the firewall rule applies to all instances on the specified network. |

### `FirewallList`

- Contains a list of firewalls.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Firewall> | A list of Firewall resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#firewallList for lists of firewalls. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `FirewallLogConfig`

- The available logging options for a firewall rule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enable` | boolean | This field denotes whether to enable logging for a particular firewall rule. |
| `metadata` | string enum | This field can only be specified for a particular firewall rule if logging is enabled for that rule. This field denotes whether to include or exclude metadata for firewall logs. Values: `EXCLUDE_ALL_METADATA`, `INCLUDE_ALL_METADATA`. |

### `FirewallParams`

- Additional firewall parameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. |

### `FirewallPoliciesListAssociationsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `associations` | array<FirewallPolicyAssociation> | A list of associations. |
| `kind` | string | Output only. \[Output Only\] Type of firewallPolicy associations. Alwayscompute#FirewallPoliciesListAssociations for lists of firewallPolicy associations. |

### `FirewallPoliciesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `firewallPolicies` | array<FirewallPolicy> | A list of firewall policies contained in this scope. |
| `warning` | object | Informational warning which replaces the list of firewall policies when the list is empty. |

### `FirewallPolicy`

- Represents a Firewall Policy resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `associations` | array<FirewallPolicyAssociation> | A list of associations that belong to this firewall policy. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `displayName` | string | Deprecated, please use short name instead. User-provided name of the Organization firewall policy. The name should be unique in the organization in which the firewall policy is created. This field is not applicable to network firewall policies. This name must be set on creation and cannot be changed. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `fingerprint` | string (byte) | Specifies a fingerprint for this resource, which is essentially a hash of the metadata's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update metadata. You must always provide an up-to-date fingerprint hash in order to update or change metadata, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make get() request to the firewall policy. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#firewallPolicyfor firewall policies |
| `name` | string | Name of the resource. For Organization Firewall Policies it's a \[Output Only\] numeric ID allocated by Google Cloud which uniquely identifies the Organization Firewall Policy. |
| `packetMirroringRules` | array<FirewallPolicyRule> | A list of packet mirroring rules that belong to this policy. |
| `parent` | string | Output only. \[Output Only\] The parent of the firewall policy. This field is not applicable to network firewall policies. |
| `policySource` | string enum | Indicates the source of this Firewall Policy. This field is optional on creation and defaults to USER_DEFINED. The USER_DEFINED value indicates a regular firewall policy. The SYSTEM value indicates a system-level policy managed by an internal service like GKE. This SYSTEM value is reserved for internal services and cannot be set by users during policy creation. Policies with a SYSTEM source cannot be modified or deleted by users. Values: `SYSTEM`, `USER_DEFINED`. |
| `policyType` | string enum | The type of the firewall policy. This field can be one of VPC_POLICY, RDMA_ROCE_POLICY or ULL_POLICY. Note: if not specified then VPC_POLICY will be used. Values: `RDMA_ROCE_POLICY`, `ULL_POLICY`, `VPC_POLICY`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional firewall policy resides. This field is not applicable to global firewall policies. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `ruleTupleCount` | integer (int32) | Output only. \[Output Only\] Total count of all firewall policy rule tuples. A firewall policy can not exceed a set number of tuples. |
| `rules` | array<FirewallPolicyRule> | A list of rules that belong to this policy. There must always be a default rule (rule with priority 2147483647 and match "\*"). If no rules are provided when creating a firewall policy, a default rule with action "allow" will be added. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `shortName` | string | User-provided name of the Organization firewall policy. The name should be unique in the organization in which the firewall policy is created. This field is not applicable to network firewall policies. This name must be set on creation and cannot be changed. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |

### `FirewallPolicy` (alpha)

- Represents a Firewall Policy resource.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `applySecurityProfileFallbackAction` | string | Optional. If specified, it defines what should happen in case of backend issues for rules with apply_security_profile_group action. Allowed values: ALLOW, DENY. If not specified, the default behavior is ALLOW. |
| `associations` | array<FirewallPolicyAssociation> | A list of associations that belong to this firewall policy. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `displayName` | string | Deprecated, please use short name instead. User-provided name of the Organization firewall policy. The name should be unique in the organization in which the firewall policy is created. This field is not applicable to network firewall policies. This name must be set on creation and cannot be changed. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `fingerprint` | string (byte) | Specifies a fingerprint for this resource, which is essentially a hash of the metadata's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update metadata. You must always provide an up-to-date fingerprint hash in order to update or change metadata, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make get() request to the firewall policy. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#firewallPolicyfor firewall policies |
| `name` | string | Name of the resource. For Organization Firewall Policies it's a \[Output Only\] numeric ID allocated by Google Cloud which uniquely identifies the Organization Firewall Policy. |
| `packetMirroringRules` | array<FirewallPolicyRule> | A list of packet mirroring rules that belong to this policy. |
| `parent` | string | Output only. \[Output Only\] The parent of the firewall policy. This field is not applicable to network firewall policies. |
| `policySource` | string enum | Indicates the source of this Firewall Policy. This field is optional on creation and defaults to USER_DEFINED. The USER_DEFINED value indicates a regular firewall policy. The SYSTEM value indicates a system-level policy managed by an internal service like GKE. This SYSTEM value is reserved for internal services and cannot be set by users during policy creation. Policies with a SYSTEM source cannot be modified or deleted by users. Values: `SYSTEM`, `USER_DEFINED`. |
| `policyType` | string enum | The type of the firewall policy. This field can be one of VPC_POLICY, RDMA_ROCE_POLICY or ULL_POLICY. Note: if not specified then VPC_POLICY will be used. Values: `RDMA_FALCON_POLICY`, `RDMA_ROCE_POLICY`, `ULL_POLICY`, `VPC_POLICY`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional firewall policy resides. This field is not applicable to global firewall policies. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `rolloutOperation` | FirewallPolicyRolloutOperation | Configuration and status of the progressive rollout of this resource. |
| `ruleTupleCount` | integer (int32) | Output only. \[Output Only\] Total count of all firewall policy rule tuples. A firewall policy can not exceed a set number of tuples. |
| `rules` | array<FirewallPolicyRule> | A list of rules that belong to this policy. There must always be a default rule (rule with priority 2147483647 and match "\*"). If no rules are provided when creating a firewall policy, a default rule with action "allow" will be added. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `shortName` | string | User-provided name of the Organization firewall policy. The name should be unique in the organization in which the firewall policy is created. This field is not applicable to network firewall policies. This name must be set on creation and cannot be changed. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `vpcNetworkScope` | string enum | The scope of networks allowed to be associated with the firewall policy. This field can be either GLOBAL_VPC_NETWORK orREGIONAL_VPC_NETWORK. A firewall policy with the VPC scope set to GLOBAL_VPC_NETWORK is allowed to be attached only to global networks. When the VPC scope is set to REGIONAL_VPC_NETWORK the firewall policy is allowed to be attached only to regional networks in the same scope as the firewall policy. Note: if not specified then GLOBAL_VPC_NETWORK will be used. Values: `GLOBAL_VPC_NETWORK`, `REGIONAL_VPC_NETWORK`. |

### `FirewallPolicy` (preview)

- Represents a Firewall Policy resource.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `associations` | array<FirewallPolicyAssociation> | A list of associations that belong to this firewall policy. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `displayName` | string | Deprecated, please use short name instead. User-provided name of the Organization firewall policy. The name should be unique in the organization in which the firewall policy is created. This field is not applicable to network firewall policies. This name must be set on creation and cannot be changed. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `fingerprint` | string (byte) | Specifies a fingerprint for this resource, which is essentially a hash of the metadata's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update metadata. You must always provide an up-to-date fingerprint hash in order to update or change metadata, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make get() request to the firewall policy. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#firewallPolicyfor firewall policies |
| `name` | string | Name of the resource. For Organization Firewall Policies it's a \[Output Only\] numeric ID allocated by Google Cloud which uniquely identifies the Organization Firewall Policy. |
| `packetMirroringRules` | array<FirewallPolicyRule> | A list of packet mirroring rules that belong to this policy. |
| `parent` | string | Output only. \[Output Only\] The parent of the firewall policy. This field is not applicable to network firewall policies. |
| `policyType` | string enum | The type of the firewall policy. This field can be one of VPC_POLICY, RDMA_ROCE_POLICY or ULL_POLICY. Note: if not specified then VPC_POLICY will be used. Values: `NCC_GATEWAY_POLICY`, `RDMA_ROCE_POLICY`, `ULL_POLICY`, `VPC_POLICY`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional firewall policy resides. This field is not applicable to global firewall policies. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `ruleTupleCount` | integer (int32) | Output only. \[Output Only\] Total count of all firewall policy rule tuples. A firewall policy can not exceed a set number of tuples. |
| `rules` | array<FirewallPolicyRule> | A list of rules that belong to this policy. There must always be a default rule (rule with priority 2147483647 and match "\*"). If no rules are provided when creating a firewall policy, a default rule with action "allow" will be added. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `shortName` | string | User-provided name of the Organization firewall policy. The name should be unique in the organization in which the firewall policy is created. This field is not applicable to network firewall policies. This name must be set on creation and cannot be changed. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |

### `FirewallPolicyAssociation`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachmentTarget` | string | The target that the firewall policy is attached to. |
| `displayName` | string | \[Output Only\] Deprecated, please use short name instead. The display name of the firewall policy of the association. |
| `firewallPolicyId` | string | Output only. \[Output Only\] The firewall policy ID of the association. |
| `name` | string | The name for an association. |
| `priority` | integer (int32) | An integer indicating the priority of an association. The priority must be a positive value between 1 and 2147483647. Firewall Policies are evaluated from highest to lowest priority where 1 is the highest priority and 2147483647 is the lowest priority. The default value is `1000`. If two associations have the same priority then lexicographical order on association names is applied. |
| `shortName` | string | Output only. \[Output Only\] The short name of the firewall policy of the association. |

### `FirewallPolicyList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<FirewallPolicy> | A list of FirewallPolicy resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#firewallPolicyList for listsof FirewallPolicies |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `FirewallPolicyRolloutOperation`

- Represents progressive rollout input parameters and current status.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `rolloutInput` | FirewallPolicyRolloutOperationRolloutInput | Input parameters to be used by the next not yet scheduled rollout. |
| `rolloutStatus` | FirewallPolicyRolloutOperationRolloutStatus | \[Output only\] Current status of the rollout. |

### `FirewallPolicyRolloutOperationRolloutInput`

- Represents progressive rollout input parameters.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the rollout plan. Ex. organizations//locations/global/rolloutPlans/. |
| `predefinedRolloutPlan` | string enum | Predefined rollout plan. Values: `DEFAULT_ROLLOUT_PLAN`. |
| `retryUuid` | string | The UUID of the retry action. Only needed if this is a retry for an existing rollout. This can be used after the user canceled a rollout and want to retry it with no changes. |

### `FirewallPolicyRolloutOperationRolloutStatus`

- Represents progressive rollout current status.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `nextRollout` | FirewallPolicyRolloutOperationRolloutStatusNextRollout | \[Output only\] The next rollout. |
| `ongoingRollouts` | array<FirewallPolicyRolloutOperationRolloutStatusRolloutMetadata> | \[Output only\] The ongoing rollout. |
| `previousRollout` | FirewallPolicyRolloutOperationRolloutStatusRolloutMetadata | \[Output only\] The last previously executed rollout. |

### `FirewallPolicyRolloutOperationRolloutStatusNextRollout`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `rolloutId` | string | Output only. \[Output only\] The id of the next rollout. |
| `rolloutPlan` | string | The name of the rollout plan to be used by the next not yet started rollout. This field is auto populated based on RolloutInput when a new rollout is scheduled. This can be manually changed before the scheduled rollout starts. Ex. organizations//locations/global/rolloutPlans/ |

### `FirewallPolicyRolloutOperationRolloutStatusRolloutMetadata`

- Represents the status of the progressive rollout instance, either completed or ongoing.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `rollout` | string | Output only. \[Output only\] The name of the rollout organizations//locations/global/rollouts/ |
| `rolloutPlan` | string | Output only. \[Output only\] The name of the rollout plan used by this rollout organizations//locations/global/rolloutPlans/ |
| `state` | string enum | Output only. \[Output only\] The state of the rollout. Values: `CANCELLED`, `COMPLETED`, `FAILED`, `PAUSED`, `PROCESSING`, `UNKNOWN`. |

### `FirewallPolicyRule`

- Represents a rule that describes one or more match conditions along with the action to be taken when traffic matches this condition (allow or deny).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string | The Action to perform when the client connection triggers the rule. Valid actions for firewall rules are: "allow", "deny", "apply_security_profile_group" and "goto_next" ( "apply_security_profile_group" can be specified only for global network firewall policies or hierarchical firewall policies). Valid actions for packet mirroring rules are: "mirror", "do_not_mirror" and "goto_next". |
| `description` | string | An optional description for this resource. |
| `direction` | string enum | The direction in which this rule applies. Values: `EGRESS`, `INGRESS`. |
| `disabled` | boolean | Denotes whether the firewall policy rule is disabled. When set to true, the firewall policy rule is not enforced and traffic behaves as if it did not exist. If this is unspecified, the firewall policy rule will be enabled. |
| `enableLogging` | boolean | Denotes whether to enable logging for a particular rule. If logging is enabled, logs will be exported to the configured export destination in Stackdriver. Logs may be exported to BigQuery or Pub/Sub. Note: you cannot enable logging on "goto_next" rules. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Returnscompute#firewallPolicyRule for firewall rules andcompute#packetMirroringRule for packet mirroring rules. |
| `match` | FirewallPolicyRuleMatcher | A match condition that incoming traffic is evaluated against. If it evaluates to true, the corresponding 'action' is enforced. |
| `priority` | integer (int32) | An integer indicating the priority of a rule in the list. The priority must be a positive value between 0 and 2147483647. Rules are evaluated from highest to lowest priority where 0 is the highest priority and 2147483647 is the lowest priority. |
| `ruleName` | string | An optional name for the rule. This field is not a unique identifier and can be updated. |
| `ruleTupleCount` | integer (int32) | Output only. \[Output Only\] Calculation of the complexity of a single firewall policy rule. |
| `securityProfileGroup` | string | A fully-qualified URL of a SecurityProfileGroup resource instance. Example: https://networksecurity.googleapis.com/v1/projects/{project}/locations/{location}/securityProfileGroups/my-security-profile-group Must be specified if action is one of 'apply_security_profile_group' or 'mirror'. Cannot be specified for other actions. Can be specified only for global network firewall policies or hierarchical firewall policies. |
| `targetForwardingRules` | array<string> | A list of forwarding rules to which this rule applies. This field allows you to control which load balancers get this rule. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/global/forwardingRules/forwardingRule - https://www.googleapis.com/compute/v1/projects/project/regions/region/forwardingRules/forwardingRule - projects/project/global/ forwardingRules/forwardingRule - projects/project/regions/region/forwardingRules/ forwardingRule |
| `targetResources` | array<string> | A list of network resource URLs to which this rule applies. This field allows you to control which network's VMs get this rule. If this field is left blank, all VMs within the organization will receive the rule. |
| `targetSecureTags` | array<FirewallPolicyRuleSecureTag> | A list of secure tags that controls which instances the firewall rule applies to. If targetSecureTag are specified, then the firewall rule applies only to instances in the VPC network that have one of those EFFECTIVE secure tags, if all the target_secure_tag are in INEFFECTIVE state, then this rule will be ignored.targetSecureTag may not be set at the same time astargetServiceAccounts. If neither targetServiceAccounts nortargetSecureTag are specified, the firewall rule applies to all instances on the specified network. Maximum number of target label tags allowed is 256. |
| `targetServiceAccounts` | array<string> | A list of service accounts indicating the sets of instances that are applied with this rule. |
| `targetType` | string enum | Target types of the firewall policy rule. Default value is INSTANCES. Values: `INSTANCES`, `INTERNAL_MANAGED_LB`. |
| `tlsInspect` | boolean | Boolean flag indicating if the traffic should be TLS decrypted. Can be set only if action = 'apply_security_profile_group' and cannot be set for other actions. |

### `FirewallPolicyRuleMatcher`

- Represents a match condition that incoming traffic is evaluated against. Exactly one field must be specified.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destAddressGroups` | array<string> | Address groups which should be matched against the traffic destination. Maximum number of destination address groups is 10. |
| `destFqdns` | array<string> | Fully Qualified Domain Name (FQDN) which should be matched against traffic destination. Maximum number of destination fqdn allowed is 100. |
| `destIpRanges` | array<string> | CIDR IP address range. Maximum number of destination CIDR IP ranges allowed is 5000. |
| `destNetworkContext` | string enum | Network context of the traffic destination. Allowed values are: - UNSPECIFIED - INTERNET - NON_INTERNET Values: `INTERNET`, `INTRA_VPC`, `NON_INTERNET`, `UNSPECIFIED`, `VPC_NETWORKS`. |
| `destNetworkType` | string enum | Network type of the traffic destination. Allowed values are: - UNSPECIFIED - INTERNET - NON_INTERNET Values: `INTERNET`, `INTRA_VPC`, `NON_INTERNET`, `UNSPECIFIED`, `VPC_NETWORKS`. |
| `destRegionCodes` | array<string> | Region codes whose IP addresses will be used to match for destination of traffic. Should be specified as 2 letter country code defined as per ISO 3166 alpha-2 country codes. ex."US" Maximum number of dest region codes allowed is 5000. |
| `destThreatIntelligences` | array<string> | Names of Network Threat Intelligence lists. The IPs in these lists will be matched against traffic destination. |
| `layer4Configs` | array<FirewallPolicyRuleMatcherLayer4Config> | Pairs of IP protocols and ports that the rule should match. |
| `srcAddressGroups` | array<string> | Address groups which should be matched against the traffic source. Maximum number of source address groups is 10. |
| `srcFqdns` | array<string> | Fully Qualified Domain Name (FQDN) which should be matched against traffic source. Maximum number of source fqdn allowed is 100. |
| `srcIpRanges` | array<string> | CIDR IP address range. Maximum number of source CIDR IP ranges allowed is 5000. |
| `srcNetworkContext` | string enum | Network context of the traffic source. Allowed values are: - UNSPECIFIED - INTERNET - INTRA_VPC - NON_INTERNET - VPC_NETWORKS Values: `INTERNET`, `INTRA_VPC`, `NON_INTERNET`, `UNSPECIFIED`, `VPC_NETWORKS`. |
| `srcNetworkType` | string enum | Network type of the traffic source. Allowed values are: - UNSPECIFIED - INTERNET - INTRA_VPC - NON_INTERNET - VPC_NETWORKS Values: `INTERNET`, `INTRA_VPC`, `NON_INTERNET`, `UNSPECIFIED`, `VPC_NETWORKS`. |
| `srcNetworks` | array<string> | Networks of the traffic source. It can be either a full or partial url. |
| `srcRegionCodes` | array<string> | Region codes whose IP addresses will be used to match for source of traffic. Should be specified as 2 letter country code defined as per ISO 3166 alpha-2 country codes. ex."US" Maximum number of source region codes allowed is 5000. |
| `srcSecureTags` | array<FirewallPolicyRuleSecureTag> | List of secure tag values, which should be matched at the source of the traffic. For INGRESS rule, if all the srcSecureTag are INEFFECTIVE, and there is no srcIpRange, this rule will be ignored. Maximum number of source tag values allowed is 256. |
| `srcThreatIntelligences` | array<string> | Names of Network Threat Intelligence lists. The IPs in these lists will be matched against traffic source. |

### `FirewallPolicyRuleMatcher` (beta)

- Represents a match condition that incoming traffic is evaluated against. Exactly one field must be specified.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `destAddressGroups` | array<string> | Address groups which should be matched against the traffic destination. Maximum number of destination address groups is 10. |
| `destFqdns` | array<string> | Fully Qualified Domain Name (FQDN) which should be matched against traffic destination. Maximum number of destination fqdn allowed is 100. |
| `destIpRanges` | array<string> | CIDR IP address range. Maximum number of destination CIDR IP ranges allowed is 5000. |
| `destNetworkContext` | string enum | Network context of the traffic destination. Allowed values are: - UNSPECIFIED - INTERNET - NON_INTERNET Values: `INTERNET`, `INTRA_VPC`, `NON_INTERNET`, `UNSPECIFIED`, `VPC_NETWORKS`. |
| `destNetworkScope` | string enum | Network scope of the traffic destination. Values: `INTERNET`, `INTRA_VPC`, `NON_INTERNET`, `UNSPECIFIED`, `VPC_NETWORKS`. |
| `destNetworkType` | string enum | Network type of the traffic destination. Allowed values are: - UNSPECIFIED - INTERNET - NON_INTERNET Values: `INTERNET`, `INTRA_VPC`, `NON_INTERNET`, `UNSPECIFIED`, `VPC_NETWORKS`. |
| `destRegionCodes` | array<string> | Region codes whose IP addresses will be used to match for destination of traffic. Should be specified as 2 letter country code defined as per ISO 3166 alpha-2 country codes. ex."US" Maximum number of dest region codes allowed is 5000. |
| `destThreatIntelligences` | array<string> | Names of Network Threat Intelligence lists. The IPs in these lists will be matched against traffic destination. |
| `layer4Configs` | array<FirewallPolicyRuleMatcherLayer4Config> | Pairs of IP protocols and ports that the rule should match. |
| `srcAddressGroups` | array<string> | Address groups which should be matched against the traffic source. Maximum number of source address groups is 10. |
| `srcFqdns` | array<string> | Fully Qualified Domain Name (FQDN) which should be matched against traffic source. Maximum number of source fqdn allowed is 100. |
| `srcIpRanges` | array<string> | CIDR IP address range. Maximum number of source CIDR IP ranges allowed is 5000. |
| `srcNetworkContext` | string enum | Network context of the traffic source. Allowed values are: - UNSPECIFIED - INTERNET - INTRA_VPC - NON_INTERNET - VPC_NETWORKS Values: `INTERNET`, `INTRA_VPC`, `NON_INTERNET`, `UNSPECIFIED`, `VPC_NETWORKS`. |
| `srcNetworkScope` | string enum | Network scope of the traffic source. Values: `INTERNET`, `INTRA_VPC`, `NON_INTERNET`, `UNSPECIFIED`, `VPC_NETWORKS`. |
| `srcNetworkType` | string enum | Network type of the traffic source. Allowed values are: - UNSPECIFIED - INTERNET - INTRA_VPC - NON_INTERNET - VPC_NETWORKS Values: `INTERNET`, `INTRA_VPC`, `NON_INTERNET`, `UNSPECIFIED`, `VPC_NETWORKS`. |
| `srcNetworks` | array<string> | Networks of the traffic source. It can be either a full or partial url. |
| `srcRegionCodes` | array<string> | Region codes whose IP addresses will be used to match for source of traffic. Should be specified as 2 letter country code defined as per ISO 3166 alpha-2 country codes. ex."US" Maximum number of source region codes allowed is 5000. |
| `srcSecureTags` | array<FirewallPolicyRuleSecureTag> | List of secure tag values, which should be matched at the source of the traffic. For INGRESS rule, if all the srcSecureTag are INEFFECTIVE, and there is no srcIpRange, this rule will be ignored. Maximum number of source tag values allowed is 256. |
| `srcThreatIntelligences` | array<string> | Names of Network Threat Intelligence lists. The IPs in these lists will be matched against traffic source. |

### `FirewallPolicyRuleMatcherLayer4Config`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipProtocol` | string | The IP protocol to which this rule applies. The protocol type is required when creating a firewall rule. This value can either be one of the following well known protocol strings (tcp,udp, icmp, esp,ah, ipip, sctp), or the IP protocol number. |
| `ports` | array<string> | An optional list of ports to which this rule applies. This field is only applicable for UDP or TCP protocol. Each entry must be either an integer or a range. If not specified, this rule applies to connections through any port. Example inputs include: \["22"\],\["80","443"\], and \["12345-12349"\]. |

### `FirewallPolicyRuleOperationMetadata`

- Metadata for FirewallPolicyRule operations.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `allocatedPriority` | integer (int32) | Output only. \[Output Only\] The priority allocated for the firewall policy rule if query parameters specified minPriority/maxPriority. |

### `FirewallPolicyRuleSecureTag`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the secure tag, created with TagManager's TagValue API. |
| `state` | string enum | Output only. \[Output Only\] State of the secure tag, either `EFFECTIVE` or `INEFFECTIVE`. A secure tag is `INEFFECTIVE` when it is deleted or its network is deleted. Values: `EFFECTIVE`, `INEFFECTIVE`. |

### `FixedOrPercent`

- Encapsulates numeric value that can be either absolute or relative.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `calculated` | integer (int32) | Output only. Absolute value of VM instances calculated based on the specific mode. - If the value is fixed, then the calculated value is equal to the fixed value. - If the value is a percent, then the calculated value is percent/100 \* targetSize. For example, the calculated value of a 80% of a managed instance group with 150 instances would be (80/100 \* 150) = 120 VM instances. If there is a remainder, the number is rounded. |
| `fixed` | integer (int32) | Specifies a fixed number of VM instances. This must be a positive integer. |
| `percent` | integer (int32) | Specifies a percentage of instances between 0 to 100%, inclusive. For example, specify 80 for 80%. |

### `FlexibleTimeRange`

- Specifies a flexible time range with flexible start time and duration. It is possible to specify a contradictory time range that cannot be matched by any Interval. This causes a validation error.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxDuration` | string (google-duration) | — |
| `minDuration` | string (google-duration) | — |
| `startTimeNotEarlierThan` | string (google-datetime) | — |
| `startTimeNotLaterThan` | string (google-datetime) | — |

### `FlexibleTimeRange` (beta)

- Specifies a flexible time range with flexible start time and duration. It is possible to specify a contradictory time range that cannot be matched by any Interval. This causes a validation error.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `endTimeNotEarlierThan` | string (google-datetime) | — |
| `endTimeNotLaterThan` | string (google-datetime) | — |
| `maxDuration` | string (google-duration) | — |
| `minDuration` | string (google-duration) | — |
| `startTimeNotEarlierThan` | string (google-datetime) | — |
| `startTimeNotLaterThan` | string (google-datetime) | — |

### `FolderRolloutsListResponse`

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Rollout> | A list of Rollout resources. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `FolderVmExtensionPolicyAggregatedListResponse`

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of VmExtensionPoliciesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#FolderVmExtensionPolicyAggregatedList for lists of VmExtensionPolicies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ForwardingRule`

- Represents a Forwarding Rule resource. Forwarding rule resources in Google Cloud can be either regional or global in scope: \* Global (https://cloud.google.com/compute/docs/reference/rest/v1/globalForwardingRules) \* Regional (https://cloud.google.com/compute/docs/reference/rest/v1/forwardingRules) A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules can also reference target instances and Cloud VPN Classic gateways (targetVpnGateway). For more information, read Forwarding rule concepts and Using protocol forwarding.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `IPAddress` | string | IP address for which this forwarding rule accepts traffic. When a client sends traffic to this IP address, the forwarding rule directs the traffic to the referenced target or backendService. While creating a forwarding rule, specifying an IPAddress is required under the following circumstances: - When the target is set to targetGrpcProxy andvalidateForProxyless is set to true, theIPAddress should be set to 0.0.0.0. - When the target is a Private Service Connect Google APIs bundle, you must specify an IPAddress. Otherwise, you can optionally specify an IP address that references an existing static (reserved) IP address resource. When omitted, Google Cloud assigns an ephemeral IP address. Use one of the following formats to specify an IP address while creating a forwarding rule: \* IP address number, as in `100.1.2.3` \* IPv6 address range, as in `2600:1234::/96` \* Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/project_id/regions/region/addresses/address-name \* Partial URL or by name, as in: - projects/project_id/regions/region/addresses/address-name - regions/region/addresses/address-name - global/addresses/address-name - address-name The IP address can only be set at creation. Once set, it cannot be updated. The forwarding rule's target or backendService, and in most cases, also the loadBalancingScheme, determine the type of IP address that you can use. For detailed information, see IP address specifications (https://cloud.google.com/load-balancing/docs/forwarding-rule-concepts#ip_address_specifications). When reading an IPAddress, the API always returns the IP address number. When creating a global external Passthrough Network Load Balancer forwarding rule (a parent forwarding rule), you must use theIPAddresses field, but the Google Cloud generated child forwarding rules set the IPAddress field instead. Refer to theavailabilityGroup field for further details. |
| `IPAddresses` | array<string> | IP addresses for which this forwarding rule accepts traffic. All IP addresses must have the same IP version, IPv4 or IPv6. When a client sends traffic that matches one of the specified IP addresses, protocol and ports, the forwarding rule directs the traffic to the referencedbackendService. All IP addresses are served by the same set of backends, and they share the target capacities specified in the backend service fairly. Global external Passthrough Network Load Balancer requires two IP addresses for each forwarding rule to provide high availability when both IP addresses are used to serve client requests. The two IP addresses must come from global IP pools that belong to two distinct Availability Groups, represented by the purposePASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0 andPASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1. TheIPAddresses field specifies zero, one, or two IP addresses: - If omitted, Google Cloud assigns two ephemeral IP addresses, one from each Availability Group. - If you specify one IP address that references an existing static IP address resource from one Availability Group, Google Cloud assigns an ephemeral IP address from the other Availability Group. - If you specify two IP addresses that reference existing static IP address resources, they are required to be from different Availability Groups. For global external Passthrough Network Load Balancer, each IP address can be one of the following: - A static or ephemeral IPv4 address from a Google-owned IP pool. - A static IPv4 address from a global public delegated prefix. - A static or ephemeral IPv6 /96 prefix from a Google-owned IP pool. For global external Passthrough Network Load Balancer, the two IP addresses can be of different types. One IP address can be from a BYOIP prefix while the other is from a Google-owned IP pool. One IP address can be static while the other is ephemeral. However, both IP addresses must have the same IP version, IPv4 or IPv6. The IP addresses can only be set at creation and cannot be updated. When creating a global external Passthrough Network Load Balancer forwarding rule (a parent forwarding rule), you must use theIPAddresses field, but the Google Cloud-generated child forwarding rules set the IPAddress field instead. Refer to theavailabilityGroup field for further details. Refer to the IPAddress field for the formats that can be used to specify IP addresses while creating a forwarding rule. Because Passthrough Network Load Balancers do not terminate or translate traffic, the backend stack types must be compatible with the forwarding rule IP version: - If the forwarding rule IP version is IPv4, backends should be configured as dual-stack or IPv4-only. - If the forwarding rule IP version is IPv6, backends should be configured as dual-stack or IPv6-only. |
| `IPProtocol` | string enum | The IP protocol to which this rule applies. For protocol forwarding, valid options are TCP, UDP, ESP,AH, SCTP, ICMP andL3_DEFAULT. The valid IP protocols are different for different load balancing products as described in Load balancing features (https://cloud.google.com/load-balancing/docs/features#protocols_from_the_load_balancer_to_the_backends). Values: `AH`, `ESP`, `ICMP`, `L3_DEFAULT`, `SCTP`, `TCP`, `UDP`. |
| `allPorts` | boolean | The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The allPorts field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, SCTP, or L3_DEFAULT. - It's applicable only to the following products: internal passthrough Network Load Balancers, backend service-based external passthrough Network Load Balancers, and internal and external protocol forwarding. - Set this field to true to allow packets addressed to any port or packets lacking destination port information (for example, UDP fragments after the first fragment) to be forwarded to the backends configured with this forwarding rule. The L3_DEFAULT protocol requiresallPorts be set to true. |
| `allowGlobalAccess` | boolean | If set to true, clients can access the internal passthrough Network Load Balancers, the regional internal Application Load Balancer, and the regional internal proxy Network Load Balancer from all regions. If false, only allows access from the local region the load balancer is located at. Note that for INTERNAL_MANAGED forwarding rules, this field cannot be changed after the forwarding rule is created. |
| `allowPscGlobalAccess` | boolean | This is used in PSC consumer ForwardingRule to control whether the PSC endpoint can be accessed from another region. |
| `attachedExtensions` | array<ForwardingRuleAttachedExtension> | Output only. \[Output Only\]. The extensions that are attached to this ForwardingRule. |
| `availabilityGroup` | string enum | Output only. \[Output Only\] Specifies the load balancing availability group, one of the two that collectively provide high availability. Specifies the availability group of the forwarding rule. This field is for use by global external passthrough load balancers (load balancing scheme EXTERNAL_PASSTHROUGH) and is set for the child forwarding rules only. The possible values are: - AVAILABILITY_GROUP0: Set for the child forwarding rule that is programmed on the AVAILABILITY_GROUP0 load balancing stack. The child forwarding rule has the same IP protocol, port, and backend service settings as the parent forwarding rule, but has only one of the two IP addresses of the parent forwarding rule, the one with the purpose PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0. - AVAILABILITY_GROUP1: Set for the child forwarding rule that is programmed on the AVAILABILITY_GROUP1 load balancing stack. The child forwarding rule has the same IP protocol, port and backend service settings as the parent forwarding rule, but has only one of the two IP addresses of the parent forwarding rule, the one with the purposePASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1. For each global external Passthrough Network Load Balancer forwarding rule (a parent forwarding rule) that you create, Google Cloud generates two output-only child forwarding rules, one forAVAILABILITY_GROUP0 and one forAVAILABILITY_GROUP1. Values: `AVAILABILITY_GROUP0`, `AVAILABILITY_GROUP1`, `AVAILABILITY_GROUP_UNSPECIFIED`. |
| `backendService` | string | Identifies the backend service to which the forwarding rule sends traffic. It is a required field for the following load balancers: - Internal passthrough Network Load Balancers - Backend service-based regional external passthrough Network Load Balancers - Global external passthrough Network Load Balancers It cannot be set by other load balancer types and protocol forwarding rules. |
| `baseForwardingRule` | string | Output only. \[Output Only\] The URL for the corresponding base forwarding rule. By base forwarding rule, we mean the forwarding rule that has the same IP address, protocol, and port settings with the current forwarding rule, but without sourceIPRanges specified. Always empty if the current forwarding rule does not have sourceIPRanges specified. |
| `childForwardingRules` | array<string> | Output only. \[Output Only\] The resource URLs for the child forwarding rules. Applicable only to the parent forwarding rule of global external passthrough load balancers. This field contains the list of child forwarding rule URLs associated with the parent forwarding rule: one for each availability group. AVAILABILITY_GROUP0 will be the first element, and AVAILABILITY_GROUP1 will be the second element. Refer to theavailabilityGroup field for further details. It cannot be set by any other forwarding rules. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `externalManagedBackendBucketMigrationState` | string enum | Specifies the canary migration state for the backend buckets attached to this forwarding rule. Possible values are PREPARE, TEST_BY_PERCENTAGE, and TEST_ALL_TRAFFIC. To begin the migration from EXTERNAL to EXTERNAL_MANAGED, the state must be changed to PREPARE. The state must be changed to TEST_ALL_TRAFFIC before the loadBalancingScheme can be changed to EXTERNAL_MANAGED. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate traffic to backend buckets attached to this forwarding rule by percentage using externalManagedBackendBucketMigrationTestingPercentage. Rolling back a migration requires the states to be set in reverse order. So changing the scheme from EXTERNAL_MANAGED to EXTERNAL requires the state to be set to TEST_ALL_TRAFFIC at the same time. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate some traffic back to EXTERNAL or PREPARE can be used to migrate all traffic back to EXTERNAL. Values: `PREPARE`, `TEST_ALL_TRAFFIC`, `TEST_BY_PERCENTAGE`. |
| `externalManagedBackendBucketMigrationTestingPercentage` | number (float) | Determines the fraction of requests to backend buckets that should be processed by the global external Application Load Balancer. The value of this field must be in the range \[0, 100\]. This value can only be set if the loadBalancingScheme in the BackendService is set to EXTERNAL (when using the classic Application Load Balancer) and the migration state is TEST_BY_PERCENTAGE. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a ForwardingRule. Include the fingerprint in patch request to ensure that you do not overwrite changes that were applied from another concurrent request. To see the latest fingerprint, make a get() request to retrieve a ForwardingRule. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `ipCollection` | string | Resource reference of a PublicDelegatedPrefix. The PDP must be a sub-PDP in EXTERNAL_IPV6_FORWARDING_RULE_CREATION mode. Use one of the following formats to specify a sub-PDP when creating an IPv6 NetLB forwarding rule using BYOIP: Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/project_id/regions/region/publicDelegatedPrefixes/sub-pdp-name Partial URL, as in: - projects/project_id/regions/region/publicDelegatedPrefixes/sub-pdp-name - regions/region/publicDelegatedPrefixes/sub-pdp-name |
| `ipVersion` | string enum | The IP Version that will be used by this forwarding rule. Valid options are IPV4 or IPV6. Values: `IPV4`, `IPV6`, `UNSPECIFIED_VERSION`. |
| `isMirroringCollector` | boolean | Indicates whether or not this load balancer can be used as a collector for packet mirroring. To prevent mirroring loops, instances behind this load balancer will not have their traffic mirrored even if aPacketMirroring rule applies to them. This can only be set to true for load balancers that have theirloadBalancingScheme set to INTERNAL. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#forwardingRule for forwarding rule resources. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this resource, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a ForwardingRule. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `loadBalancingScheme` | string enum | Specifies the forwarding rule type. For more information, refer to Forwarding rule product and scheme table. Values: `EXTERNAL`, `EXTERNAL_MANAGED`, `EXTERNAL_PASSTHROUGH`, `INTERNAL`, `INTERNAL_MANAGED`, `INTERNAL_SELF_MANAGED`, `INVALID`. |
| `metadataFilters` | array<MetadataFilter> | Opaque filter criteria used by load balancer to restrict routing configuration to a limited set of xDS compliant clients. In their xDS requests to load balancer, xDS clients present node metadata. When there is a match, the relevant configuration is made available to those proxies. Otherwise, all the resources (e.g.TargetHttpProxy, UrlMap) referenced by the ForwardingRule are not visible to those proxies. For each metadataFilter in this list, if itsfilterMatchCriteria is set to MATCH_ANY, at least one of thefilterLabels must match the corresponding label provided in the metadata. If its filterMatchCriteria is set to MATCH_ALL, then all of its filterLabels must match with corresponding labels provided in the metadata. If multiplemetadataFilters are specified, all of them need to be satisfied in order to be considered a match. metadataFilters specified here will be applifed before those specified in the UrlMap that thisForwardingRule references. metadataFilters only applies to Loadbalancers that have their loadBalancingScheme set toINTERNAL_SELF_MANAGED. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. For Private Service Connect forwarding rules that forward traffic to Google APIs, the forwarding rule name must be a 1-20 characters string with lowercase letters and numbers and must start with a letter. For global external Passthrough Network Load Balancer forwarding rules, the forwarding rule name must be 1-43 characters long. For each global external Passthrough Network Load Balancer forwarding rule (a parent forwarding rule) that you create, Google Cloud generates two output-only child forwarding rules that are named by concatenating the parent forwarding rule name with the `-ag0` and `-ag1` suffixes, respectively. Refer to theavailabilityGroup field for further details. |
| `network` | string | This field is not used for global external load balancing. For internal passthrough Network Load Balancers, this field identifies the network that the load balanced IP should belong to for this forwarding rule. If the subnetwork is specified, the network of the subnetwork will be used. If neither subnetwork nor this field is specified, the default network will be used. For Private Service Connect forwarding rules that forward traffic to Google APIs, a network must be provided. |
| `networkTier` | string enum | This signifies the networking tier used for configuring this load balancer and can only take the following values:PREMIUM, STANDARD. For regional ForwardingRule, the valid values are PREMIUM andSTANDARD. For GlobalForwardingRule, the valid value isPREMIUM. If this field is not specified, it is assumed to be PREMIUM. If IPAddress is specified, this value must be equal to the networkTier of the Address. Values: `FIXED_STANDARD`, `PREMIUM`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `noAutomateDnsZone` | boolean | This is used in PSC consumer ForwardingRule to control whether it should try to auto-generate a DNS zone or not. Non-PSC forwarding rules do not use this field. Once set, this field is not mutable. |
| `parentForwardingRule` | string | Output only. \[Output Only\] The resource URL for the parent forwarding rule. Applicable only to the child forwarding rules of global external passthrough load balancers. This field contains the URL of the parent forwarding rule. |
| `portRange` | string | The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The portRange field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, or SCTP, and - It's applicable only to the following products: external passthrough Network Load Balancers, internal and external proxy Network Load Balancers, internal and external Application Load Balancers, external protocol forwarding, and Classic VPN. - Some products have restrictions on what ports can be used. See port specifications for details. For external forwarding rules, two or more forwarding rules cannot use the same \[IPAddress, IPProtocol\] pair (specified inIPAddress, IPAddresses, IPProtocol fields) if they have overlapping portRanges. For internal forwarding rules within the same VPC network, two or more forwarding rules cannot use the same \[IPAddress, IPProtocol\] pair, and cannot have overlapping portRanges. @pattern: \\d+(?:-\\d+)? |
| `ports` | array<string> | The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The ports field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, or SCTP, and - It's applicable only to the following products: internal passthrough Network Load Balancers, backend service-based external passthrough Network Load Balancers, and internal protocol forwarding. - You can specify a list of up to five ports by number, separated by commas. The ports can be contiguous or discontiguous. For external forwarding rules, two or more forwarding rules cannot use the same \[IPAddress, IPProtocol\] pair (specified inIPAddress, IPAddresses, IPProtocol fields) if they share at least one port number. For internal forwarding rules within the same VPC network, two or more forwarding rules cannot use the same \[IPAddress, IPProtocol\] pair if they share at least one port number. @pattern: \\d+(?:-\\d+)? |
| `pscConnectionId` | string (uint64) | \[Output Only\] The PSC connection id of the PSC forwarding rule. |
| `pscConnectionStatus` | string enum | — Values: `ACCEPTED`, `CLOSED`, `NEEDS_ATTENTION`, `PENDING`, `REJECTED`, `STATUS_UNSPECIFIED`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional forwarding rule resides. This field is not applicable to global forwarding rules. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `serviceDirectoryRegistrations` | array<ForwardingRuleServiceDirectoryRegistration> | Service Directory resources to register this forwarding rule with. Currently, only supports a single Service Directory resource. |
| `serviceLabel` | string | An optional prefix to the service name for this forwarding rule. If specified, the prefix is the first label of the fully qualified service name. The label must be 1-63 characters long, and comply withRFC1035. Specifically, the label must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. This field is only used for internal load balancing. |
| `serviceName` | string | \[Output Only\] The internal fully qualified service name for this forwarding rule. This field is only used for internal load balancing. |
| `sourceIpRanges` | array<string> | If not empty, this forwarding rule will only forward the traffic when the source IP address matches one of the IP addresses or CIDR ranges set here. Note that a forwarding rule can only have up to 64 source IP ranges, and this field can only be used with a regional forwarding rule whose scheme isEXTERNAL. Each source_ip_range entry should be either an IP address (for example, 1.2.3.4) or a CIDR range (for example, 1.2.3.0/24). |
| `subnetwork` | string | This field identifies the subnetwork that the load balanced IP should belong to for this forwarding rule, used with internal load balancers and external passthrough Network Load Balancers with IPv6. If the network specified is in auto subnet mode, this field is optional. However, a subnetwork must be specified if the network is in custom subnet mode or when creating external forwarding rule with IPv6. |
| `target` | string | The URL of the target resource to receive the matched traffic. For regional forwarding rules, this target must be in the same region as the forwarding rule. For global forwarding rules, this target must be a global load balancing resource. The forwarded traffic must be of a type appropriate to the target object. - For load balancers, see the "Target" column in Port specifications (https://cloud.google.com/load-balancing/docs/forwarding-rule-concepts#ip_address_specifications). - For Private Service Connect forwarding rules that forward traffic to Google APIs, provide the name of a supported Google API bundle: - vpc-sc - APIs that support VPC Service Controls. - all-apis - All supported Google APIs. - For Private Service Connect forwarding rules that forward traffic to managed services, the target must be a service attachment. The target is not mutable once set as a service attachment. The following load balancers cannot set the target field (they should set the backendService field instead): - Internal passthrough Network Load Balancers - Backend service-based regional external passthrough Network Load Balancers - Global external passthrough Network Load Balancers |

### `ForwardingRule` (alpha)

- Represents a Forwarding Rule resource. Forwarding rule resources in Google Cloud can be either regional or global in scope: \* Global (https://cloud.google.com/compute/docs/reference/rest/alpha/globalForwardingRules) \* Regional (https://cloud.google.com/compute/docs/reference/rest/alpha/forwardingRules) A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules can also reference target instances and Cloud VPN Classic gateways (targetVpnGateway). For more information, read Forwarding rule concepts and Using protocol forwarding.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `IPAddress` | string | IP address for which this forwarding rule accepts traffic. When a client sends traffic to this IP address, the forwarding rule directs the traffic to the referenced target or backendService. While creating a forwarding rule, specifying an IPAddress is required under the following circumstances: - When the target is set to targetGrpcProxy andvalidateForProxyless is set to true, theIPAddress should be set to 0.0.0.0. - When the target is a Private Service Connect Google APIs bundle, you must specify an IPAddress. Otherwise, you can optionally specify an IP address that references an existing static (reserved) IP address resource. When omitted, Google Cloud assigns an ephemeral IP address. Use one of the following formats to specify an IP address while creating a forwarding rule: \* IP address number, as in `100.1.2.3` \* IPv6 address range, as in `2600:1234::/96` \* Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/project_id/regions/region/addresses/address-name \* Partial URL or by name, as in: - projects/project_id/regions/region/addresses/address-name - regions/region/addresses/address-name - global/addresses/address-name - address-name The IP address can only be set at creation. Once set, it cannot be updated. The forwarding rule's target or backendService, and in most cases, also the loadBalancingScheme, determine the type of IP address that you can use. For detailed information, see IP address specifications (https://cloud.google.com/load-balancing/docs/forwarding-rule-concepts#ip_address_specifications). When reading an IPAddress, the API always returns the IP address number. When creating a global external Passthrough Network Load Balancer forwarding rule (a parent forwarding rule), you must use theIPAddresses field, but the Google Cloud generated child forwarding rules set the IPAddress field instead. Refer to theavailabilityGroup field for further details. |
| `IPAddresses` | array<string> | IP addresses for which this forwarding rule accepts traffic. All IP addresses must have the same IP version, IPv4 or IPv6. When a client sends traffic that matches one of the specified IP addresses, protocol and ports, the forwarding rule directs the traffic to the referencedbackendService. All IP addresses are served by the same set of backends, and they share the target capacities specified in the backend service fairly. Global external Passthrough Network Load Balancer requires two IP addresses for each forwarding rule to provide high availability when both IP addresses are used to serve client requests. The two IP addresses must come from global IP pools that belong to two distinct Availability Groups, represented by the purposePASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0 andPASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1. TheIPAddresses field specifies zero, one, or two IP addresses: - If omitted, Google Cloud assigns two ephemeral IP addresses, one from each Availability Group. - If you specify one IP address that references an existing static IP address resource from one Availability Group, Google Cloud assigns an ephemeral IP address from the other Availability Group. - If you specify two IP addresses that reference existing static IP address resources, they are required to be from different Availability Groups. For global external Passthrough Network Load Balancer, each IP address can be one of the following: - A static or ephemeral IPv4 address from a Google-owned IP pool. - A static IPv4 address from a global public delegated prefix. - A static or ephemeral IPv6 /96 prefix from a Google-owned IP pool. For global external Passthrough Network Load Balancer, the two IP addresses can be of different types. One IP address can be from a BYOIP prefix while the other is from a Google-owned IP pool. One IP address can be static while the other is ephemeral. However, both IP addresses must have the same IP version, IPv4 or IPv6. The IP addresses can only be set at creation and cannot be updated. When creating a global external Passthrough Network Load Balancer forwarding rule (a parent forwarding rule), you must use theIPAddresses field, but the Google Cloud-generated child forwarding rules set the IPAddress field instead. Refer to theavailabilityGroup field for further details. Refer to the IPAddress field for the formats that can be used to specify IP addresses while creating a forwarding rule. Because Passthrough Network Load Balancers do not terminate or translate traffic, the backend stack types must be compatible with the forwarding rule IP version: - If the forwarding rule IP version is IPv4, backends should be configured as dual-stack or IPv4-only. - If the forwarding rule IP version is IPv6, backends should be configured as dual-stack or IPv6-only. |
| `IPProtocol` | string enum | The IP protocol to which this rule applies. For protocol forwarding, valid options are TCP, UDP, ESP,AH, SCTP, ICMP andL3_DEFAULT. The valid IP protocols are different for different load balancing products as described in Load balancing features (https://cloud.google.com/load-balancing/docs/features#protocols_from_the_load_balancer_to_the_backends). Values: `AH`, `ALL`, `ESP`, `ICMP`, `L3_DEFAULT`, `SCTP`, `TCP`, `UDP`. |
| `allPorts` | boolean | The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The allPorts field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, SCTP, or L3_DEFAULT. - It's applicable only to the following products: internal passthrough Network Load Balancers, backend service-based external passthrough Network Load Balancers, and internal and external protocol forwarding. - Set this field to true to allow packets addressed to any port or packets lacking destination port information (for example, UDP fragments after the first fragment) to be forwarded to the backends configured with this forwarding rule. The L3_DEFAULT protocol requiresallPorts be set to true. |
| `allowGlobalAccess` | boolean | If set to true, clients can access the internal passthrough Network Load Balancers, the regional internal Application Load Balancer, and the regional internal proxy Network Load Balancer from all regions. If false, only allows access from the local region the load balancer is located at. Note that for INTERNAL_MANAGED forwarding rules, this field cannot be changed after the forwarding rule is created. |
| `allowPscGlobalAccess` | boolean | This is used in PSC consumer ForwardingRule to control whether the PSC endpoint can be accessed from another region. |
| `attachedExtensions` | array<ForwardingRuleAttachedExtension> | Output only. \[Output Only\]. The extensions that are attached to this ForwardingRule. |
| `availabilityGroup` | string enum | Output only. \[Output Only\] Specifies the load balancing availability group, one of the two that collectively provide high availability. Specifies the availability group of the forwarding rule. This field is for use by global external passthrough load balancers (load balancing scheme EXTERNAL_PASSTHROUGH) and is set for the child forwarding rules only. The possible values are: - AVAILABILITY_GROUP0: Set for the child forwarding rule that is programmed on the AVAILABILITY_GROUP0 load balancing stack. The child forwarding rule has the same IP protocol, port, and backend service settings as the parent forwarding rule, but has only one of the two IP addresses of the parent forwarding rule, the one with the purpose PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0. - AVAILABILITY_GROUP1: Set for the child forwarding rule that is programmed on the AVAILABILITY_GROUP1 load balancing stack. The child forwarding rule has the same IP protocol, port and backend service settings as the parent forwarding rule, but has only one of the two IP addresses of the parent forwarding rule, the one with the purposePASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1. For each global external Passthrough Network Load Balancer forwarding rule (a parent forwarding rule) that you create, Google Cloud generates two output-only child forwarding rules, one forAVAILABILITY_GROUP0 and one forAVAILABILITY_GROUP1. Values: `AVAILABILITY_GROUP0`, `AVAILABILITY_GROUP1`, `AVAILABILITY_GROUP_UNSPECIFIED`. |
| `backendService` | string | Identifies the backend service to which the forwarding rule sends traffic. It is a required field for the following load balancers: - Internal passthrough Network Load Balancers - Backend service-based regional external passthrough Network Load Balancers - Global external passthrough Network Load Balancers It cannot be set by other load balancer types and protocol forwarding rules. |
| `baseForwardingRule` | string | Output only. \[Output Only\] The URL for the corresponding base forwarding rule. By base forwarding rule, we mean the forwarding rule that has the same IP address, protocol, and port settings with the current forwarding rule, but without sourceIPRanges specified. Always empty if the current forwarding rule does not have sourceIPRanges specified. |
| `childForwardingRules` | array<string> | Output only. \[Output Only\] The resource URLs for the child forwarding rules. Applicable only to the parent forwarding rule of global external passthrough load balancers. This field contains the list of child forwarding rule URLs associated with the parent forwarding rule: one for each availability group. AVAILABILITY_GROUP0 will be the first element, and AVAILABILITY_GROUP1 will be the second element. Refer to theavailabilityGroup field for further details. It cannot be set by any other forwarding rules. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `externalManagedBackendBucketMigrationState` | string enum | Specifies the canary migration state for the backend buckets attached to this forwarding rule. Possible values are PREPARE, TEST_BY_PERCENTAGE, and TEST_ALL_TRAFFIC. To begin the migration from EXTERNAL to EXTERNAL_MANAGED, the state must be changed to PREPARE. The state must be changed to TEST_ALL_TRAFFIC before the loadBalancingScheme can be changed to EXTERNAL_MANAGED. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate traffic to backend buckets attached to this forwarding rule by percentage using externalManagedBackendBucketMigrationTestingPercentage. Rolling back a migration requires the states to be set in reverse order. So changing the scheme from EXTERNAL_MANAGED to EXTERNAL requires the state to be set to TEST_ALL_TRAFFIC at the same time. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate some traffic back to EXTERNAL or PREPARE can be used to migrate all traffic back to EXTERNAL. Values: `PREPARE`, `TEST_ALL_TRAFFIC`, `TEST_BY_PERCENTAGE`. |
| `externalManagedBackendBucketMigrationTestingPercentage` | number (float) | Determines the fraction of requests to backend buckets that should be processed by the global external Application Load Balancer. The value of this field must be in the range \[0, 100\]. This value can only be set if the loadBalancingScheme in the BackendService is set to EXTERNAL (when using the classic Application Load Balancer) and the migration state is TEST_BY_PERCENTAGE. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a ForwardingRule. Include the fingerprint in patch request to ensure that you do not overwrite changes that were applied from another concurrent request. To see the latest fingerprint, make a get() request to retrieve a ForwardingRule. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `ipCollection` | string | Resource reference of a PublicDelegatedPrefix. The PDP must be a sub-PDP in EXTERNAL_IPV6_FORWARDING_RULE_CREATION mode. Use one of the following formats to specify a sub-PDP when creating an IPv6 NetLB forwarding rule using BYOIP: Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/project_id/regions/region/publicDelegatedPrefixes/sub-pdp-name Partial URL, as in: - projects/project_id/regions/region/publicDelegatedPrefixes/sub-pdp-name - regions/region/publicDelegatedPrefixes/sub-pdp-name |
| `ipVersion` | string enum | The IP Version that will be used by this forwarding rule. Valid options are IPV4 or IPV6. Values: `IPV4`, `IPV6`, `UNSPECIFIED_VERSION`. |
| `isMirroringCollector` | boolean | Indicates whether or not this load balancer can be used as a collector for packet mirroring. To prevent mirroring loops, instances behind this load balancer will not have their traffic mirrored even if aPacketMirroring rule applies to them. This can only be set to true for load balancers that have theirloadBalancingScheme set to INTERNAL. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#forwardingRule for forwarding rule resources. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this resource, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a ForwardingRule. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `loadBalancingScheme` | string enum | Specifies the forwarding rule type. For more information, refer to Forwarding rule product and scheme table. Values: `EXTERNAL`, `EXTERNAL_MANAGED`, `EXTERNAL_PASSTHROUGH`, `INTERNAL`, `INTERNAL_MANAGED`, `INTERNAL_SELF_MANAGED`, `INVALID`. |
| `metadataFilters` | array<MetadataFilter> | Opaque filter criteria used by load balancer to restrict routing configuration to a limited set of xDS compliant clients. In their xDS requests to load balancer, xDS clients present node metadata. When there is a match, the relevant configuration is made available to those proxies. Otherwise, all the resources (e.g.TargetHttpProxy, UrlMap) referenced by the ForwardingRule are not visible to those proxies. For each metadataFilter in this list, if itsfilterMatchCriteria is set to MATCH_ANY, at least one of thefilterLabels must match the corresponding label provided in the metadata. If its filterMatchCriteria is set to MATCH_ALL, then all of its filterLabels must match with corresponding labels provided in the metadata. If multiplemetadataFilters are specified, all of them need to be satisfied in order to be considered a match. metadataFilters specified here will be applifed before those specified in the UrlMap that thisForwardingRule references. metadataFilters only applies to Loadbalancers that have their loadBalancingScheme set toINTERNAL_SELF_MANAGED. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. For Private Service Connect forwarding rules that forward traffic to Google APIs, the forwarding rule name must be a 1-20 characters string with lowercase letters and numbers and must start with a letter. For global external Passthrough Network Load Balancer forwarding rules, the forwarding rule name must be 1-43 characters long. For each global external Passthrough Network Load Balancer forwarding rule (a parent forwarding rule) that you create, Google Cloud generates two output-only child forwarding rules that are named by concatenating the parent forwarding rule name with the `-ag0` and `-ag1` suffixes, respectively. Refer to theavailabilityGroup field for further details. |
| `network` | string | This field is not used for global external load balancing. For internal passthrough Network Load Balancers, this field identifies the network that the load balanced IP should belong to for this forwarding rule. If the subnetwork is specified, the network of the subnetwork will be used. If neither subnetwork nor this field is specified, the default network will be used. For Private Service Connect forwarding rules that forward traffic to Google APIs, a network must be provided. |
| `networkAttachment` | string | Optional. The URL of the network attachment that this resource belongs to.projects/{project}/regions/{region_name}/networkAttachments/{network_attachment_name}. |
| `networkTier` | string enum | This signifies the networking tier used for configuring this load balancer and can only take the following values:PREMIUM, STANDARD. For regional ForwardingRule, the valid values are PREMIUM andSTANDARD. For GlobalForwardingRule, the valid value isPREMIUM. If this field is not specified, it is assumed to be PREMIUM. If IPAddress is specified, this value must be equal to the networkTier of the Address. Values: `FIXED_STANDARD`, `PREMIUM`, `SELECT`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `noAutomateDnsZone` | boolean | This is used in PSC consumer ForwardingRule to control whether it should try to auto-generate a DNS zone or not. Non-PSC forwarding rules do not use this field. Once set, this field is not mutable. |
| `parentForwardingRule` | string | Output only. \[Output Only\] The resource URL for the parent forwarding rule. Applicable only to the child forwarding rules of global external passthrough load balancers. This field contains the URL of the parent forwarding rule. |
| `portRange` | string | The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The portRange field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, or SCTP, and - It's applicable only to the following products: external passthrough Network Load Balancers, internal and external proxy Network Load Balancers, internal and external Application Load Balancers, external protocol forwarding, and Classic VPN. - Some products have restrictions on what ports can be used. See port specifications for details. For external forwarding rules, two or more forwarding rules cannot use the same \[IPAddress, IPProtocol\] pair (specified inIPAddress, IPAddresses, IPProtocol fields) if they have overlapping portRanges. For internal forwarding rules within the same VPC network, two or more forwarding rules cannot use the same \[IPAddress, IPProtocol\] pair, and cannot have overlapping portRanges. @pattern: \\d+(?:-\\d+)? |
| `ports` | array<string> | The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The ports field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, or SCTP, and - It's applicable only to the following products: internal passthrough Network Load Balancers, backend service-based external passthrough Network Load Balancers, and internal protocol forwarding. - You can specify a list of up to five ports by number, separated by commas. The ports can be contiguous or discontiguous. For external forwarding rules, two or more forwarding rules cannot use the same \[IPAddress, IPProtocol\] pair (specified inIPAddress, IPAddresses, IPProtocol fields) if they share at least one port number. For internal forwarding rules within the same VPC network, two or more forwarding rules cannot use the same \[IPAddress, IPProtocol\] pair if they share at least one port number. @pattern: \\d+(?:-\\d+)? |
| `pscConnectionId` | string (uint64) | \[Output Only\] The PSC connection id of the PSC forwarding rule. |
| `pscConnectionStatus` | string enum | — Values: `ACCEPTED`, `ACCEPTED_LIMITED_CAPACITY`, `CLOSED`, `NEEDS_ATTENTION`, `PENDING`, `REJECTED`, `STATUS_UNSPECIFIED`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional forwarding rule resides. This field is not applicable to global forwarding rules. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `serviceClassId` | string | Optional. Producer Service's Service class ID for the region of this forwarding rule. Can only be used with network_attachment. It is not possible to use on its own; however, network_attachment can be used without service_class_id. |
| `serviceDirectoryRegistrations` | array<ForwardingRuleServiceDirectoryRegistration> | Service Directory resources to register this forwarding rule with. Currently, only supports a single Service Directory resource. |
| `serviceLabel` | string | An optional prefix to the service name for this forwarding rule. If specified, the prefix is the first label of the fully qualified service name. The label must be 1-63 characters long, and comply withRFC1035. Specifically, the label must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. This field is only used for internal load balancing. |
| `serviceName` | string | \[Output Only\] The internal fully qualified service name for this forwarding rule. This field is only used for internal load balancing. |
| `sourceIpRanges` | array<string> | If not empty, this forwarding rule will only forward the traffic when the source IP address matches one of the IP addresses or CIDR ranges set here. Note that a forwarding rule can only have up to 64 source IP ranges, and this field can only be used with a regional forwarding rule whose scheme isEXTERNAL. Each source_ip_range entry should be either an IP address (for example, 1.2.3.4) or a CIDR range (for example, 1.2.3.0/24). |
| `subnetwork` | string | This field identifies the subnetwork that the load balanced IP should belong to for this forwarding rule, used with internal load balancers and external passthrough Network Load Balancers with IPv6. If the network specified is in auto subnet mode, this field is optional. However, a subnetwork must be specified if the network is in custom subnet mode or when creating external forwarding rule with IPv6. |
| `target` | string | The URL of the target resource to receive the matched traffic. For regional forwarding rules, this target must be in the same region as the forwarding rule. For global forwarding rules, this target must be a global load balancing resource. The forwarded traffic must be of a type appropriate to the target object. - For load balancers, see the "Target" column in Port specifications (https://cloud.google.com/load-balancing/docs/forwarding-rule-concepts#ip_address_specifications). - For Private Service Connect forwarding rules that forward traffic to Google APIs, provide the name of a supported Google API bundle: - vpc-sc - APIs that support VPC Service Controls. - all-apis - All supported Google APIs. - For Private Service Connect forwarding rules that forward traffic to managed services, the target must be a service attachment. The target is not mutable once set as a service attachment. The following load balancers cannot set the target field (they should set the backendService field instead): - Internal passthrough Network Load Balancers - Backend service-based regional external passthrough Network Load Balancers - Global external passthrough Network Load Balancers |

### `ForwardingRule` (preview)

- Represents a Forwarding Rule resource. Forwarding rule resources in Google Cloud can be either regional or global in scope: \* Global (https://cloud.google.com/compute/docs/reference/rest/v1/globalForwardingRules) \* Regional (https://cloud.google.com/compute/docs/reference/rest/v1/forwardingRules) A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules can also reference target instances and Cloud VPN Classic gateways (targetVpnGateway). For more information, read Forwarding rule concepts and Using protocol forwarding.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `IPAddress` | string | IP address for which this forwarding rule accepts traffic. When a client sends traffic to this IP address, the forwarding rule directs the traffic to the referenced target or backendService. While creating a forwarding rule, specifying an IPAddress is required under the following circumstances: - When the target is set to targetGrpcProxy andvalidateForProxyless is set to true, theIPAddress should be set to 0.0.0.0. - When the target is a Private Service Connect Google APIs bundle, you must specify an IPAddress. Otherwise, you can optionally specify an IP address that references an existing static (reserved) IP address resource. When omitted, Google Cloud assigns an ephemeral IP address. Use one of the following formats to specify an IP address while creating a forwarding rule: \* IP address number, as in `100.1.2.3` \* IPv6 address range, as in `2600:1234::/96` \* Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/project_id/regions/region/addresses/address-name \* Partial URL or by name, as in: - projects/project_id/regions/region/addresses/address-name - regions/region/addresses/address-name - global/addresses/address-name - address-name The IP address can only be set at creation. Once set, it cannot be updated. The forwarding rule's target or backendService, and in most cases, also the loadBalancingScheme, determine the type of IP address that you can use. For detailed information, see IP address specifications (https://cloud.google.com/load-balancing/docs/forwarding-rule-concepts#ip_address_specifications). When reading an IPAddress, the API always returns the IP address number. When creating a global external Passthrough Network Load Balancer forwarding rule (a parent forwarding rule), you must use theIPAddresses field, but the Google Cloud generated child forwarding rules set the IPAddress field instead. Refer to theavailabilityGroup field for further details. |
| `IPProtocol` | string enum | The IP protocol to which this rule applies. For protocol forwarding, valid options are TCP, UDP, ESP,AH, SCTP, ICMP andL3_DEFAULT. The valid IP protocols are different for different load balancing products as described in Load balancing features (https://cloud.google.com/load-balancing/docs/features#protocols_from_the_load_balancer_to_the_backends). Values: `AH`, `ESP`, `ICMP`, `L3_DEFAULT`, `SCTP`, `TCP`, `UDP`. |
| `allPorts` | boolean | The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The allPorts field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, SCTP, or L3_DEFAULT. - It's applicable only to the following products: internal passthrough Network Load Balancers, backend service-based external passthrough Network Load Balancers, and internal and external protocol forwarding. - Set this field to true to allow packets addressed to any port or packets lacking destination port information (for example, UDP fragments after the first fragment) to be forwarded to the backends configured with this forwarding rule. The L3_DEFAULT protocol requiresallPorts be set to true. |
| `allowGlobalAccess` | boolean | If set to true, clients can access the internal passthrough Network Load Balancers, the regional internal Application Load Balancer, and the regional internal proxy Network Load Balancer from all regions. If false, only allows access from the local region the load balancer is located at. Note that for INTERNAL_MANAGED forwarding rules, this field cannot be changed after the forwarding rule is created. |
| `allowPscGlobalAccess` | boolean | This is used in PSC consumer ForwardingRule to control whether the PSC endpoint can be accessed from another region. |
| `attachedExtensions` | array<ForwardingRuleAttachedExtension> | Output only. \[Output Only\]. The extensions that are attached to this ForwardingRule. |
| `backendService` | string | Identifies the backend service to which the forwarding rule sends traffic. It is a required field for the following load balancers: - Internal passthrough Network Load Balancers - Backend service-based regional external passthrough Network Load Balancers - Global external passthrough Network Load Balancers It cannot be set by other load balancer types and protocol forwarding rules. |
| `baseForwardingRule` | string | Output only. \[Output Only\] The URL for the corresponding base forwarding rule. By base forwarding rule, we mean the forwarding rule that has the same IP address, protocol, and port settings with the current forwarding rule, but without sourceIPRanges specified. Always empty if the current forwarding rule does not have sourceIPRanges specified. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `externalManagedBackendBucketMigrationState` | string enum | Specifies the canary migration state for the backend buckets attached to this forwarding rule. Possible values are PREPARE, TEST_BY_PERCENTAGE, and TEST_ALL_TRAFFIC. To begin the migration from EXTERNAL to EXTERNAL_MANAGED, the state must be changed to PREPARE. The state must be changed to TEST_ALL_TRAFFIC before the loadBalancingScheme can be changed to EXTERNAL_MANAGED. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate traffic to backend buckets attached to this forwarding rule by percentage using externalManagedBackendBucketMigrationTestingPercentage. Rolling back a migration requires the states to be set in reverse order. So changing the scheme from EXTERNAL_MANAGED to EXTERNAL requires the state to be set to TEST_ALL_TRAFFIC at the same time. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate some traffic back to EXTERNAL or PREPARE can be used to migrate all traffic back to EXTERNAL. Values: `PREPARE`, `TEST_ALL_TRAFFIC`, `TEST_BY_PERCENTAGE`. |
| `externalManagedBackendBucketMigrationTestingPercentage` | number (float) | Determines the fraction of requests to backend buckets that should be processed by the global external Application Load Balancer. The value of this field must be in the range \[0, 100\]. This value can only be set if the loadBalancingScheme in the BackendService is set to EXTERNAL (when using the classic Application Load Balancer) and the migration state is TEST_BY_PERCENTAGE. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a ForwardingRule. Include the fingerprint in patch request to ensure that you do not overwrite changes that were applied from another concurrent request. To see the latest fingerprint, make a get() request to retrieve a ForwardingRule. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `ipCollection` | string | Resource reference of a PublicDelegatedPrefix. The PDP must be a sub-PDP in EXTERNAL_IPV6_FORWARDING_RULE_CREATION mode. Use one of the following formats to specify a sub-PDP when creating an IPv6 NetLB forwarding rule using BYOIP: Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/project_id/regions/region/publicDelegatedPrefixes/sub-pdp-name Partial URL, as in: - projects/project_id/regions/region/publicDelegatedPrefixes/sub-pdp-name - regions/region/publicDelegatedPrefixes/sub-pdp-name |
| `ipVersion` | string enum | The IP Version that will be used by this forwarding rule. Valid options are IPV4 or IPV6. Values: `IPV4`, `IPV6`, `UNSPECIFIED_VERSION`. |
| `isMirroringCollector` | boolean | Indicates whether or not this load balancer can be used as a collector for packet mirroring. To prevent mirroring loops, instances behind this load balancer will not have their traffic mirrored even if aPacketMirroring rule applies to them. This can only be set to true for load balancers that have theirloadBalancingScheme set to INTERNAL. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#forwardingRule for forwarding rule resources. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this resource, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a ForwardingRule. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `loadBalancingScheme` | string enum | Specifies the forwarding rule type. For more information, refer to Forwarding rule product and scheme table. Values: `EXTERNAL`, `EXTERNAL_MANAGED`, `INTERNAL`, `INTERNAL_MANAGED`, `INTERNAL_SELF_MANAGED`, `INVALID`. |
| `metadataFilters` | array<MetadataFilter> | Opaque filter criteria used by load balancer to restrict routing configuration to a limited set of xDS compliant clients. In their xDS requests to load balancer, xDS clients present node metadata. When there is a match, the relevant configuration is made available to those proxies. Otherwise, all the resources (e.g.TargetHttpProxy, UrlMap) referenced by the ForwardingRule are not visible to those proxies. For each metadataFilter in this list, if itsfilterMatchCriteria is set to MATCH_ANY, at least one of thefilterLabels must match the corresponding label provided in the metadata. If its filterMatchCriteria is set to MATCH_ALL, then all of its filterLabels must match with corresponding labels provided in the metadata. If multiplemetadataFilters are specified, all of them need to be satisfied in order to be considered a match. metadataFilters specified here will be applifed before those specified in the UrlMap that thisForwardingRule references. metadataFilters only applies to Loadbalancers that have their loadBalancingScheme set toINTERNAL_SELF_MANAGED. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. For Private Service Connect forwarding rules that forward traffic to Google APIs, the forwarding rule name must be a 1-20 characters string with lowercase letters and numbers and must start with a letter. For global external Passthrough Network Load Balancer forwarding rules, the forwarding rule name must be 1-43 characters long. For each global external Passthrough Network Load Balancer forwarding rule (a parent forwarding rule) that you create, Google Cloud generates two output-only child forwarding rules that are named by concatenating the parent forwarding rule name with the `-ag0` and `-ag1` suffixes, respectively. Refer to theavailabilityGroup field for further details. |
| `network` | string | This field is not used for global external load balancing. For internal passthrough Network Load Balancers, this field identifies the network that the load balanced IP should belong to for this forwarding rule. If the subnetwork is specified, the network of the subnetwork will be used. If neither subnetwork nor this field is specified, the default network will be used. For Private Service Connect forwarding rules that forward traffic to Google APIs, a network must be provided. |
| `networkAttachment` | string | Optional. The URL of the network attachment that this resource belongs to.projects/{project}/regions/{region_name}/networkAttachments/{network_attachment_name}. |
| `networkTier` | string enum | This signifies the networking tier used for configuring this load balancer and can only take the following values:PREMIUM, STANDARD. For regional ForwardingRule, the valid values are PREMIUM andSTANDARD. For GlobalForwardingRule, the valid value isPREMIUM. If this field is not specified, it is assumed to be PREMIUM. If IPAddress is specified, this value must be equal to the networkTier of the Address. Values: `FIXED_STANDARD`, `PREMIUM`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `noAutomateDnsZone` | boolean | This is used in PSC consumer ForwardingRule to control whether it should try to auto-generate a DNS zone or not. Non-PSC forwarding rules do not use this field. Once set, this field is not mutable. |
| `portRange` | string | The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The portRange field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, or SCTP, and - It's applicable only to the following products: external passthrough Network Load Balancers, internal and external proxy Network Load Balancers, internal and external Application Load Balancers, external protocol forwarding, and Classic VPN. - Some products have restrictions on what ports can be used. See port specifications for details. For external forwarding rules, two or more forwarding rules cannot use the same \[IPAddress, IPProtocol\] pair (specified inIPAddress, IPAddresses, IPProtocol fields) if they have overlapping portRanges. For internal forwarding rules within the same VPC network, two or more forwarding rules cannot use the same \[IPAddress, IPProtocol\] pair, and cannot have overlapping portRanges. @pattern: \\d+(?:-\\d+)? |
| `ports` | array<string> | The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The ports field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, or SCTP, and - It's applicable only to the following products: internal passthrough Network Load Balancers, backend service-based external passthrough Network Load Balancers, and internal protocol forwarding. - You can specify a list of up to five ports by number, separated by commas. The ports can be contiguous or discontiguous. For external forwarding rules, two or more forwarding rules cannot use the same \[IPAddress, IPProtocol\] pair (specified inIPAddress, IPAddresses, IPProtocol fields) if they share at least one port number. For internal forwarding rules within the same VPC network, two or more forwarding rules cannot use the same \[IPAddress, IPProtocol\] pair if they share at least one port number. @pattern: \\d+(?:-\\d+)? |
| `pscConnectionId` | string (uint64) | \[Output Only\] The PSC connection id of the PSC forwarding rule. |
| `pscConnectionStatus` | string enum | — Values: `ACCEPTED`, `CLOSED`, `NEEDS_ATTENTION`, `PENDING`, `REJECTED`, `STATUS_UNSPECIFIED`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional forwarding rule resides. This field is not applicable to global forwarding rules. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `serviceClassId` | string | Optional. Producer Service's Service class ID for the region of this forwarding rule. Can only be used with network_attachment. It is not possible to use on its own; however, network_attachment can be used without service_class_id. |
| `serviceDirectoryRegistrations` | array<ForwardingRuleServiceDirectoryRegistration> | Service Directory resources to register this forwarding rule with. Currently, only supports a single Service Directory resource. |
| `serviceLabel` | string | An optional prefix to the service name for this forwarding rule. If specified, the prefix is the first label of the fully qualified service name. The label must be 1-63 characters long, and comply withRFC1035. Specifically, the label must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. This field is only used for internal load balancing. |
| `serviceName` | string | \[Output Only\] The internal fully qualified service name for this forwarding rule. This field is only used for internal load balancing. |
| `sourceIpRanges` | array<string> | If not empty, this forwarding rule will only forward the traffic when the source IP address matches one of the IP addresses or CIDR ranges set here. Note that a forwarding rule can only have up to 64 source IP ranges, and this field can only be used with a regional forwarding rule whose scheme isEXTERNAL. Each source_ip_range entry should be either an IP address (for example, 1.2.3.4) or a CIDR range (for example, 1.2.3.0/24). |
| `subnetwork` | string | This field identifies the subnetwork that the load balanced IP should belong to for this forwarding rule, used with internal load balancers and external passthrough Network Load Balancers with IPv6. If the network specified is in auto subnet mode, this field is optional. However, a subnetwork must be specified if the network is in custom subnet mode or when creating external forwarding rule with IPv6. |
| `target` | string | The URL of the target resource to receive the matched traffic. For regional forwarding rules, this target must be in the same region as the forwarding rule. For global forwarding rules, this target must be a global load balancing resource. The forwarded traffic must be of a type appropriate to the target object. - For load balancers, see the "Target" column in Port specifications (https://cloud.google.com/load-balancing/docs/forwarding-rule-concepts#ip_address_specifications). - For Private Service Connect forwarding rules that forward traffic to Google APIs, provide the name of a supported Google API bundle: - vpc-sc - APIs that support VPC Service Controls. - all-apis - All supported Google APIs. - For Private Service Connect forwarding rules that forward traffic to managed services, the target must be a service attachment. The target is not mutable once set as a service attachment. The following load balancers cannot set the target field (they should set the backendService field instead): - Internal passthrough Network Load Balancers - Backend service-based regional external passthrough Network Load Balancers - Global external passthrough Network Load Balancers |

### `ForwardingRuleAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of ForwardingRulesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#forwardingRuleAggregatedList for lists of forwarding rules. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ForwardingRuleAttachedExtension`

- Reference to an extension resource that is attached to this ForwardingRule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reference` | string | Output only. The resource name. |

### `ForwardingRuleList`

- Contains a list of ForwardingRule resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<ForwardingRule> | A list of ForwardingRule resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `ForwardingRuleReference`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `forwardingRule` | string | — |

### `ForwardingRuleServiceDirectoryRegistration`

- Describes the auto-registration of the forwarding rule to Service Directory. The region and project of the Service Directory resource generated from this registration will be the same as this forwarding rule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `namespace` | string | Service Directory namespace to register the forwarding rule under. |
| `service` | string | Service Directory service to register the forwarding rule under. |
| `serviceDirectoryRegion` | string | \[Optional\] Service Directory region to register this global forwarding rule under. Default to "us-central1". Only used for PSC for Google APIs. All PSC for Google APIs forwarding rules on the same network should use the same Service Directory region. |

### `ForwardingRulesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `forwardingRules` | array<ForwardingRule> | A list of forwarding rules contained in this scope. |
| `warning` | object | Informational warning which replaces the list of forwarding rules when the list is empty. |

### `FutureReservation`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregateReservation` | AllocationAggregateReservation | Aggregate reservation details for the future reservation. |
| `autoCreatedReservationsDeleteTime` | string | Future timestamp when the FR auto-created reservations will be deleted by Compute Engine. Format of this field must be a valid href="https://www.ietf.org/rfc/rfc3339.txt">RFC3339 value. |
| `autoCreatedReservationsDuration` | Duration | Specifies the duration of auto-created reservations. It represents relative time to future reservation start_time when auto-created reservations will be automatically deleted by Compute Engine. Duration time unit is represented as a count of seconds and fractions of seconds at nanosecond resolution. |
| `autoDeleteAutoCreatedReservations` | boolean | Setting for enabling or disabling automatic deletion for auto-created reservation. If set to true, auto-created reservations will be deleted at Future Reservation's end time (default) or at user's defined timestamp if any of the \[auto_created_reservations_delete_time, auto_created_reservations_duration\] values is specified. For keeping auto-created reservation indefinitely, this value should be set to false. |
| `colocationResource` | string | Full or partial URL of an existing future reservation to indicate intent for reserving capacity in the same cluster as the colocation resource. |
| `commitmentInfo` | FutureReservationCommitmentInfo | If not present, then FR will not deliver a new commitment or update an existing commitment. |
| `confidentialComputeType` | string enum | — Values: `CONFIDENTIAL_COMPUTE_TYPE_BMSAI`, `CONFIDENTIAL_COMPUTE_TYPE_TDX`, `CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED`. |
| `creationTimestamp` | string | Output only. \[Output Only\] The creation timestamp for this future reservation inRFC3339 text format. |
| `deploymentType` | string enum | Type of the deployment requested as part of future reservation. Values: `DENSE`, `DEPLOYMENT_TYPE_UNSPECIFIED`. |
| `description` | string | An optional description of this resource. Provide this property when you create the future reservation. |
| `enableEmergentMaintenance` | boolean | Indicates if this group of VMs have emergent maintenance enabled. |
| `id` | string (uint64) | Output only. \[Output Only\] A unique identifier for this future reservation. The server defines this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#futureReservation for future reservations. |
| `name` | string | The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `namePrefix` | string | Name prefix for the reservations to be created at the time of delivery. The name prefix must comply with RFC1035. Maximum allowed length for name prefix is 20. Automatically created reservations name format will be -date-####. |
| `params` | FutureReservationParams | Input only. Additional params passed with the request, but not persisted as part of resource payload. |
| `planningStatus` | string enum | Planning state before being submitted for evaluation Values: `DRAFT`, `PLANNING_STATUS_UNSPECIFIED`, `SUBMITTED`. |
| `reservationMode` | string enum | The reservation mode which determines reservation-termination behavior and expected pricing. Values: `CALENDAR`, `DEFAULT`, `RESERVATION_MODE_UNSPECIFIED`. |
| `reservationName` | string | Name of reservations where the capacity is provisioned at the time of delivery of future reservations. If the reservation with the given name does not exist already, it is created automatically at the time of Approval with INACTIVE state till specified start-time. Either provide the reservation_name or a name_prefix. |
| `resourceMetadata` | ResourceMetadata | Output only. Contains standard resource metadata for an FutureReservation resource. It is populated for each instance of the FutureReservation resource, and includes the api_version the instance was retrieved through, and its canonical resource_type name. |
| `resourceName` | string | Name of the resource intended to be delivered. Name should conform to RFC1035. This will be the name of storage pool or Exapool for persistent disk FRs. |
| `schedulingType` | string enum | Maintenance information for this reservation Values: `GROUPED`, `GROUP_MAINTENANCE_TYPE_UNSPECIFIED`, `INDEPENDENT`. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `shareSettings` | ShareSettings | List of Projects/Folders to share with. |
| `specificReservationRequired` | boolean | Indicates whether the auto-created reservation can be consumed by VMs with affinity for "any" reservation. If the field is set, then only VMs that target the reservation by name can consume from the delivered reservation. |
| `specificSkuProperties` | FutureReservationSpecificSKUProperties | Future Reservation configuration to indicate instance properties and total count. |
| `status` | FutureReservationStatus | Output only. \[Output only\] Status of the Future Reservation |
| `storagePoolProperties` | FutureReservationStoragePoolProperties | Storage pool details for the future reservation. |
| `timeWindow` | FutureReservationTimeWindow | Time window for this Future Reservation. |
| `zone` | string | Output only. \[Output Only\] URL of the Zone where this future reservation resides. |

### Shape of `DhcpOptionsConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "associations": "object",
  "bootFileIpv4Name": "string",
  "bootFileIpv6Parameters": "array<string>",
  "bootFileIpv6Url": "string",
  "creationTimestamp": "string",
  "description": "string",
  "dnsSearchPaths": "array<string>",
  "domainName": "string",
  "id": "string (uint64)",
  "kind": "string",
  "leaseTimeSec": "string (int64)",
  "name": "string",
  "ntpServerIpv4Addresses": "array<string>",
  "ntpServerIpv6Addresses": "array<string>",
  "region": "string",
  "selfLink": "string",
  "tftpServerIpv4Addresses": "array<string>",
  "tftpServerIpv4Name": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the `ErrorInfo` `metadata` key regular expression; in google/rpc/error_details.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/rpc/error_details.proto) it is `[a-z][a-zA-Z0-9-_]+` (shown above as `a-z+`).
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the `ErrorInfo` / `FieldViolation` `reason` regular expression; in google/rpc/error_details.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/rpc/error_details.proto) it is `[A-Z][A-Z0-9_]+[A-Z0-9]` (UPPER_SNAKE_CASE; shown above as `A-Z+[A-Z0-9]`).
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)

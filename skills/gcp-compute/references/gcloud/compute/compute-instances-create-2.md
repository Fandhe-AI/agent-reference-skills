---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/create
---

# gcloud compute instances create (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta compute instances create

```text
NAME
    gcloud beta compute instances create - create Compute Engine virtual
        machine instances

SYNOPSIS
    gcloud beta compute instances create INSTANCE_NAMES [INSTANCE_NAMES ...]
        [--accelerator=[count=COUNT],[type=TYPE]] [--async]
        [--availability-domain=AVAILABILITY_DOMAIN]
        [--no-boot-disk-auto-delete]
        [--boot-disk-device-name=BOOT_DISK_DEVICE_NAME]
        [--boot-disk-interface=BOOT_DISK_INTERFACE]
        [--boot-disk-kms-key-service-account=BOOT_DISK_KMS_KEY_SERVICE_ACCOUNT]
        [--boot-disk-provisioned-iops=BOOT_DISK_PROVISIONED_IOPS]
        [--boot-disk-provisioned-throughput=BOOT_DISK_PROVISIONED_THROUGHPUT]
        [--boot-disk-size=BOOT_DISK_SIZE] [--boot-disk-type=BOOT_DISK_TYPE]
        [--can-ip-forward] [--create-disk=[PROPERTY=VALUE,...]]
        [--csek-key-file=FILE] [--deletion-protection]
        [--description=DESCRIPTION]
        [--discard-local-ssds-at-termination-timestamp=DISCARD_LOCAL_SSDS_AT_TERMINATION_TIMESTAMP]
        [--disk=[auto-delete=AUTO-DELETE],[boot=BOOT],[device-name=DEVICE-NAME],
          [force-attach=FORCE-ATTACH],
          [interface=INTERFACE],[mode=MODE],[name=NAME],[scope=SCOPE]]
        [--enable-display-device] [--[no-]enable-nested-virtualization]
        [--[no-]enable-uefi-networking] [--erase-windows-vss-signature]
        [--[no-]expose-host-topology]
        [--external-ipv6-address=EXTERNAL_IPV6_ADDRESS]
        [--external-ipv6-prefix-length=EXTERNAL_IPV6_PREFIX_LENGTH]
        [--graceful-shutdown]
        [--graceful-shutdown-max-duration=GRACEFUL_SHUTDOWN_MAX_DURATION]
        [--host-error-timeout-seconds=HOST_ERROR_TIMEOUT_SECONDS]
        [--hostname=HOSTNAME] [--identity=IDENTITY]
        [--[no-]identity-certificate] [--identity-type=IDENTITY_TYPE]
        [--instance-kms-key-service-account=INSTANCE_KMS_KEY_SERVICE_ACCOUNT]
        [--instance-termination-action=INSTANCE_TERMINATION_ACTION]
        [--internal-ipv6-address=INTERNAL_IPV6_ADDRESS]
        [--internal-ipv6-prefix-length=INTERNAL_IPV6_PREFIX_LENGTH]
        [--ipv6-network-tier=IPV6_NETWORK_TIER]
        [--ipv6-public-ptr-domain=IPV6_PUBLIC_PTR_DOMAIN]
        [--key-revocation-action-type=POLICY] [--labels=[KEY=VALUE,...]]
        [--local-ssd=[device-name=DEVICE-NAME],
          [interface=INTERFACE],[size=SIZE]]
        [--local-ssd-encryption-mode=LOCAL_SSD_ENCRYPTION_MODE]
        [--local-ssd-recovery-timeout=LOCAL_SSD_RECOVERY_TIMEOUT]
        [--machine-type=MACHINE_TYPE]
        [--maintenance-freeze-duration=MAINTENANCE_FREEZE_DURATION]
        [--maintenance-policy=MAINTENANCE_POLICY]
        [--max-run-duration=MAX_RUN_DURATION]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata-from-file=KEY=LOCAL_FILE_PATH,[...]]
        [--min-cpu-platform=PLATFORM] [--min-node-cpu=MIN_NODE_CPU]
        [--network=NETWORK] [--network-interface=[PROPERTY=VALUE,...]]
        [--network-performance-configs=[PROPERTY=VALUE,...]]
        [--network-tier=NETWORK_TIER] [--node-project=NODE_PROJECT]
        [--partner-metadata=[NAMESPACE/KEY=VALUE,...]]
        [--partner-metadata-from-file=LOCAL_FILE_PATH]
        [--performance-monitoring-unit=PERFORMANCE_MONITORING_UNIT]
        [--post-key-revocation-action-type=POLICY] [--preemptible]
        [--preemption-notice-duration=PREEMPTION_NOTICE_DURATION]
        [--private-ipv6-google-access-type=PRIVATE_IPV6_GOOGLE_ACCESS_TYPE]
        [--private-network-ip=PRIVATE_NETWORK_IP]
        [--provisioning-model=PROVISIONING_MODEL]
        [--request-valid-for-duration=REQUEST_VALID_FOR_DURATION]
        [--no-require-csek-key-create]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--resource-policies=[RESOURCE_POLICY,...]] [--no-restart-on-failure]
        [--shielded-integrity-monitoring] [--shielded-secure-boot]
        [--shielded-vtpm] [--[no-]skip-guest-os-shutdown]
        [--source-instance-template=SOURCE_INSTANCE_TEMPLATE]
        [--source-machine-image=SOURCE_MACHINE_IMAGE]
        [--source-machine-image-csek-key-file=FILE] [--stack-type=STACK_TYPE]
        [--subnet=SUBNET] [--svsm-config=[PROPERTY=VALUE,...]]
        [--tags=TAG,[TAG,...]] [--termination-time=TERMINATION_TIME]
        [--threads-per-core=THREADS_PER_CORE] [--turbo-mode=TURBO_MODE]
        [--visible-core-count=VISIBLE_CORE_COUNT] [--zone=ZONE]
        [--address=ADDRESS | --no-address]
        [--boot-disk-kms-key=BOOT_DISK_KMS_KEY
          : --boot-disk-kms-keyring=BOOT_DISK_KMS_KEYRING
          --boot-disk-kms-location=BOOT_DISK_KMS_LOCATION
          --boot-disk-kms-project=BOOT_DISK_KMS_PROJECT]
        [--confidential-compute
          | --confidential-compute-type=CONFIDENTIAL_COMPUTE_TYPE]
        [--custom-cpu=CUSTOM_CPU --custom-memory=CUSTOM_MEMORY
          : --custom-extensions --custom-vm-type=CUSTOM_VM_TYPE]
        [--image-family-scope=IMAGE_FAMILY_SCOPE --image-project=IMAGE_PROJECT
          --source-snapshot-region=SOURCE_SNAPSHOT_REGION --image=IMAGE
          | --image-family=IMAGE_FAMILY | --source-snapshot=SOURCE_SNAPSHOT]
        [--instance-kms-key=INSTANCE_KMS_KEY
          : --instance-kms-keyring=INSTANCE_KMS_KEYRING
          --instance-kms-location=INSTANCE_KMS_LOCATION
          --instance-kms-project=INSTANCE_KMS_PROJECT]
        [--node=NODE | --node-affinity-file=PATH_TO_FILE
          | --node-group=NODE_GROUP] [--public-ptr | --no-public-ptr]
        [--public-ptr-domain=PUBLIC_PTR_DOMAIN | --no-public-ptr-domain]
        [--reservation=RESERVATION
          --reservation-affinity=RESERVATION_AFFINITY; default="any"]
        [--scopes=[SCOPE,...] | --no-scopes]
        [--service-account=SERVICE_ACCOUNT | --no-service-account]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances create

```text
NAME
    gcloud alpha compute instances create - create Compute Engine virtual
        machine instances

SYNOPSIS
    gcloud alpha compute instances create INSTANCE_NAMES [INSTANCE_NAMES ...]
        [--accelerator=[count=COUNT],[type=TYPE]] [--async]
        [--availability-domain=AVAILABILITY_DOMAIN]
        [--no-boot-disk-auto-delete]
        [--boot-disk-device-name=BOOT_DISK_DEVICE_NAME]
        [--boot-disk-interface=BOOT_DISK_INTERFACE]
        [--boot-disk-kms-key-service-account=BOOT_DISK_KMS_KEY_SERVICE_ACCOUNT]
        [--boot-disk-provisioned-iops=BOOT_DISK_PROVISIONED_IOPS]
        [--boot-disk-provisioned-throughput=BOOT_DISK_PROVISIONED_THROUGHPUT]
        [--boot-disk-size=BOOT_DISK_SIZE] [--boot-disk-type=BOOT_DISK_TYPE]
        [--can-ip-forward] [--create-disk=[PROPERTY=VALUE,...]]
        [--csek-key-file=FILE] [--current-cpus=CURRENT_CPUS]
        [--current-memory=CURRENT_MEMORY] [--deletion-protection]
        [--description=DESCRIPTION]
        [--discard-local-ssds-at-termination-timestamp=DISCARD_LOCAL_SSDS_AT_TERMINATION_TIMESTAMP]
        [--disk=[auto-delete=AUTO-DELETE],[boot=BOOT],[device-name=DEVICE-NAME],
          [force-attach=FORCE-ATTACH],
          [interface=INTERFACE],[mode=MODE],[name=NAME],[scope=SCOPE]]
        [--enable-display-device] [--[no-]enable-nested-virtualization]
        [--[no-]enable-uefi-networking] [--enable-watchdog-timer]
        [--erase-windows-vss-signature] [--[no-]expose-host-topology]
        [--external-ipv6-address=EXTERNAL_IPV6_ADDRESS]
        [--external-ipv6-prefix-length=EXTERNAL_IPV6_PREFIX_LENGTH]
        [--graceful-shutdown]
        [--graceful-shutdown-max-duration=GRACEFUL_SHUTDOWN_MAX_DURATION]
        [--host-error-timeout-seconds=HOST_ERROR_TIMEOUT_SECONDS]
        [--hostname=HOSTNAME] [--identity=IDENTITY]
        [--[no-]identity-certificate] [--identity-type=IDENTITY_TYPE]
        [--instance-kms-key-service-account=INSTANCE_KMS_KEY_SERVICE_ACCOUNT]
        [--instance-termination-action=INSTANCE_TERMINATION_ACTION]
        [--internal-ipv6-address=INTERNAL_IPV6_ADDRESS]
        [--internal-ipv6-prefix-length=INTERNAL_IPV6_PREFIX_LENGTH]
        [--ipv6-address=IPV6_ADDRESS] [--ipv6-network-tier=IPV6_NETWORK_TIER]
        [--ipv6-prefix-length=IPV6_PREFIX_LENGTH]
        [--ipv6-public-ptr-domain=IPV6_PUBLIC_PTR_DOMAIN]
        [--key-revocation-action-type=POLICY] [--labels=[KEY=VALUE,...]]
        [--[no-]latency-tolerant] [--local-nvdimm=[size=SIZE]]
        [--local-ssd=[device-name=DEVICE-NAME],
          [interface=INTERFACE],[size=SIZE]]
        [--local-ssd-encryption-mode=LOCAL_SSD_ENCRYPTION_MODE]
        [--local-ssd-recovery-timeout=LOCAL_SSD_RECOVERY_TIMEOUT]
        [--machine-type=MACHINE_TYPE]
        [--maintenance-freeze-duration=MAINTENANCE_FREEZE_DURATION]
        [--maintenance-interval=MAINTENANCE_INTERVAL]
        [--max-run-duration=MAX_RUN_DURATION]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata-from-file=KEY=LOCAL_FILE_PATH,[...]]
        [--min-cpu-platform=PLATFORM] [--min-node-cpu=MIN_NODE_CPU]
        [--network=NETWORK]
        [--network-performance-configs=[PROPERTY=VALUE,...]]
        [--network-tier=NETWORK_TIER] [--node-project=NODE_PROJECT]
        [--numa-node-count=NUMA_NODE_COUNT]
        [--partner-metadata=[NAMESPACE/KEY=VALUE,...]]
        [--partner-metadata-from-file=LOCAL_FILE_PATH]
        [--performance-monitoring-unit=PERFORMANCE_MONITORING_UNIT]
        [--post-key-revocation-action-type=POLICY] [--preemptible]
        [--preemption-notice-duration=PREEMPTION_NOTICE_DURATION]
        [--private-ipv6-google-access-type=PRIVATE_IPV6_GOOGLE_ACCESS_TYPE]
        [--private-network-ip=PRIVATE_NETWORK_IP]
        [--provisioning-model=PROVISIONING_MODEL]
        [--request-valid-for-duration=REQUEST_VALID_FOR_DURATION]
        [--no-require-csek-key-create]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--resource-policies=[RESOURCE_POLICY,...]] [--no-restart-on-failure]
        [--secure-tags=SECURE_TAG,[SECURE_TAG,...]]
        [--shielded-integrity-monitoring] [--shielded-secure-boot]
        [--shielded-vtpm] [--[no-]skip-guest-os-shutdown]
        [--source-instance-template=SOURCE_INSTANCE_TEMPLATE]
        [--source-machine-image=SOURCE_MACHINE_IMAGE]
        [--source-machine-image-csek-key-file=FILE] [--stack-type=STACK_TYPE]
        [--subnet=SUBNET] [--svsm-config=[PROPERTY=VALUE,...]]
        [--tags=TAG,[TAG,...]] [--termination-time=TERMINATION_TIME]
        [--threads-per-core=THREADS_PER_CORE] [--turbo-mode=TURBO_MODE]
        [--visible-core-count=VISIBLE_CORE_COUNT] [--vsock-mode=VSOCK_MODE]
        [--windows-license-optimization-mode=WINDOWS_LICENSE_OPTIMIZATION_MODE]
        [--zone=ZONE] [--address=ADDRESS | --no-address]
        [--boot-disk-kms-key=BOOT_DISK_KMS_KEY
          : --boot-disk-kms-keyring=BOOT_DISK_KMS_KEYRING
          --boot-disk-kms-location=BOOT_DISK_KMS_LOCATION
          --boot-disk-kms-project=BOOT_DISK_KMS_PROJECT]
        [--confidential-compute
          | --confidential-compute-type=CONFIDENTIAL_COMPUTE_TYPE]
        [--custom-cpu=CUSTOM_CPU --custom-memory=CUSTOM_MEMORY
          : --custom-extensions --custom-vm-type=CUSTOM_VM_TYPE]
        [--image-family-scope=IMAGE_FAMILY_SCOPE --image-project=IMAGE_PROJECT
          --source-snapshot-region=SOURCE_SNAPSHOT_REGION --image=IMAGE
          | --image-family=IMAGE_FAMILY
          | --source-instant-snapshot=SOURCE_INSTANT_SNAPSHOT
          | --source-snapshot=SOURCE_SNAPSHOT]
        [--instance-kms-key=INSTANCE_KMS_KEY
          : --instance-kms-keyring=INSTANCE_KMS_KEYRING
          --instance-kms-location=INSTANCE_KMS_LOCATION
          --instance-kms-project=INSTANCE_KMS_PROJECT]
        [--maintenance-policy=MAINTENANCE_POLICY
          | --on-host-maintenance=MAINTENANCE_POLICY]
        [--network-interface=[PROPERTY=VALUE,...]
          | --network-interface-from-file=KEY=LOCAL_FILE_PATH
          | --network-interface-from-json-string=NETWORK_INTERFACE_JSON_STRING]
        [--node=NODE | --node-affinity-file=PATH_TO_FILE
          | --node-group=NODE_GROUP] [--public-dns | --no-public-dns]
        [--public-ptr | --no-public-ptr]
        [--public-ptr-domain=PUBLIC_PTR_DOMAIN | --no-public-ptr-domain]
        [--reservation=RESERVATION
          --reservation-affinity=RESERVATION_AFFINITY; default="any"]
        [--scopes=[SCOPE,...] | --no-scopes]
        [--service-account=SERVICE_ACCOUNT | --no-service-account]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

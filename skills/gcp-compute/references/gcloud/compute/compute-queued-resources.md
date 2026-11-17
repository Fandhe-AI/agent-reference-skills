---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/compute/queued-resources
---

# gcloud compute queued-resources

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha compute queued-resources cancel

```text
NAME
    gcloud alpha compute queued-resources cancel - cancel Compute Engine queued
        resources

SYNOPSIS
    gcloud alpha compute queued-resources cancel NAME [NAME ...] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute queued-resources create

```text
NAME
    gcloud alpha compute queued-resources create - create a Compute Engine
        queued resource

SYNOPSIS
    gcloud alpha compute queued-resources create NAME
        (--name-pattern=NAME_PATTERN | --predefined-names=[INSTANCE_NAME,...])
        (--valid-until-duration=VALID_UNTIL_DURATION
          | --valid-until-time=VALID_UNTIL_TIME)
        [--accelerator=[count=COUNT],[type=TYPE]] [--no-address] [--async]
        [--no-boot-disk-auto-delete]
        [--boot-disk-device-name=BOOT_DISK_DEVICE_NAME]
        [--boot-disk-interface=BOOT_DISK_INTERFACE]
        [--boot-disk-kms-key-service-account=BOOT_DISK_KMS_KEY_SERVICE_ACCOUNT]
        [--boot-disk-provisioned-iops=BOOT_DISK_PROVISIONED_IOPS]
        [--boot-disk-provisioned-throughput=BOOT_DISK_PROVISIONED_THROUGHPUT]
        [--boot-disk-size=BOOT_DISK_SIZE] [--boot-disk-type=BOOT_DISK_TYPE]
        [--can-ip-forward] [--count=COUNT] [--create-disk=[PROPERTY=VALUE,...]]
        [--description=DESCRIPTION]
        [--discard-local-ssds-at-termination-timestamp=DISCARD_LOCAL_SSDS_AT_TERMINATION_TIMESTAMP]
        [--disk=[boot=BOOT],
          [device-name=DEVICE-NAME],[name=NAME],[scope=SCOPE]]
        [--enable-display-device] [--[no-]enable-nested-virtualization]
        [--[no-]enable-uefi-networking] [--enable-watchdog-timer]
        [--erase-windows-vss-signature] [--graceful-shutdown]
        [--graceful-shutdown-max-duration=GRACEFUL_SHUTDOWN_MAX_DURATION]
        [--host-error-timeout-seconds=HOST_ERROR_TIMEOUT_SECONDS]
        [--identity=IDENTITY] [--[no-]identity-certificate]
        [--identity-type=IDENTITY_TYPE]
        [--instance-termination-action=INSTANCE_TERMINATION_ACTION]
        [--labels=[KEY=VALUE,...]]
        [--local-ssd=[device-name=DEVICE-NAME],
          [interface=INTERFACE],[size=SIZE]]
        [--local-ssd-recovery-timeout=LOCAL_SSD_RECOVERY_TIMEOUT]
        [--location-policy=[ZONE=POLICY,...]] [--machine-type=MACHINE_TYPE]
        [--maintenance-interval=MAINTENANCE_INTERVAL]
        [--max-run-duration=MAX_RUN_DURATION]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata-from-file=KEY=LOCAL_FILE_PATH,[...]]
        [--min-count=MIN_COUNT] [--min-cpu-platform=PLATFORM]
        [--min-node-cpu=MIN_NODE_CPU] [--network=NETWORK]
        [--network-interface=[PROPERTY=VALUE,...]]
        [--network-performance-configs=[PROPERTY=VALUE,...]]
        [--network-tier=NETWORK_TIER] [--numa-node-count=NUMA_NODE_COUNT]
        [--per-instance-hostnames=[INSTANCE_NAME=INSTANCE_HOSTNAME,...]]
        [--performance-monitoring-unit=PERFORMANCE_MONITORING_UNIT]
        [--post-key-revocation-action-type=POLICY] [--preemptible]
        [--preemption-notice-duration=PREEMPTION_NOTICE_DURATION]
        [--provisioning-model=PROVISIONING_MODEL]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--resource-policies=[RESOURCE_POLICY,...]] [--no-restart-on-failure]
        [--secure-tags=SECURE_TAG,[SECURE_TAG,...]]
        [--shielded-integrity-monitoring] [--shielded-secure-boot]
        [--shielded-vtpm] [--[no-]skip-guest-os-shutdown]
        [--source-instance-template=SOURCE_INSTANCE_TEMPLATE]
        [--stack-type=STACK_TYPE] [--subnet=SUBNET]
        [--svsm-config=[PROPERTY=VALUE,...]] [--tags=TAG,[TAG,...]]
        [--target-distribution-shape=SHAPE]
        [--termination-time=TERMINATION_TIME]
        [--threads-per-core=THREADS_PER_CORE] [--turbo-mode=TURBO_MODE]
        [--visible-core-count=VISIBLE_CORE_COUNT] [--vsock-mode=VSOCK_MODE]
        [--zone=ZONE]
        [--boot-disk-kms-key=BOOT_DISK_KMS_KEY
          : --boot-disk-kms-keyring=BOOT_DISK_KMS_KEYRING
          --boot-disk-kms-location=BOOT_DISK_KMS_LOCATION
          --boot-disk-kms-project=BOOT_DISK_KMS_PROJECT]
        [--confidential-compute
          | --confidential-compute-type=CONFIDENTIAL_COMPUTE_TYPE]
        [--custom-cpu=CUSTOM_CPU --custom-memory=CUSTOM_MEMORY
          : --custom-extensions --custom-vm-type=CUSTOM_VM_TYPE]
        [--image-project=IMAGE_PROJECT
          --source-snapshot-region=SOURCE_SNAPSHOT_REGION --image=IMAGE
          | --image-family=IMAGE_FAMILY | --source-snapshot=SOURCE_SNAPSHOT]
        [--maintenance-policy=MAINTENANCE_POLICY
          | --on-host-maintenance=MAINTENANCE_POLICY]
        [--public-dns | --no-public-dns]
        [--reservation=RESERVATION
          --reservation-affinity=RESERVATION_AFFINITY; default="any"]
        [--scopes=[SCOPE,...] | --no-scopes]
        [--service-account=SERVICE_ACCOUNT | --no-service-account]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute queued-resources delete

```text
NAME
    gcloud alpha compute queued-resources delete - delete Compute Engine queued
        resources

SYNOPSIS
    gcloud alpha compute queued-resources delete NAME [NAME ...] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute queued-resources describe

```text
NAME
    gcloud alpha compute queued-resources describe - describe a Compute Engine
        queued resource

SYNOPSIS
    gcloud alpha compute queued-resources describe NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute queued-resources list

```text
NAME
    gcloud alpha compute queued-resources list - list Google Compute Engine
        queued resources

SYNOPSIS
    gcloud alpha compute queued-resources list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--zones=ZONE,[ZONE,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/compute/queued-resources (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

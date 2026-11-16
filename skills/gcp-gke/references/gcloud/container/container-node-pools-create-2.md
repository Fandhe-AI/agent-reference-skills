---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/node-pools/create
---

# gcloud container node-pools create (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta container node-pools create

```text
NAME
    gcloud beta container node-pools create - create a node pool in a running
        cluster

SYNOPSIS
    gcloud beta container node-pools create NAME
        [--accelerator=[type=TYPE,[count=COUNT,
          gpu-driver-version=GPU_DRIVER_VERSION,
          gpu-partition-size=GPU_PARTITION_SIZE,
          gpu-sharing-strategy=GPU_SHARING_STRATEGY,
          max-shared-clients-per-gpu=MAX_SHARED_CLIENTS_PER_GPU],...]]
        [--accelerator-network-profile=ACCELERATOR_NETWORK_PROFILE]
        [--add-maintenance-exclusion-until-end-of-support]
        [--additional-node-network=[network=NETWORK_NAME,
          subnetwork=SUBNETWORK_NAME[,stack-type=STACK_TYPE],...]]
        [--additional-pod-network=[subnetwork=SUBNETWORK_NAME,
          pod-ipv4-range=SECONDARY_RANGE_NAME,
          [max-pods-per-node=NUM_PODS],...]] [--async]
        [--autoscaled-rollout-policy=[wait-for-drain-duration=WAIT-FOR-DRAIN-DURATION]]
        [--boot-disk-kms-key=BOOT_DISK_KMS_KEY]
        [--boot-disk-provisioned-iops=BOOT_DISK_PROVISIONED_IOPS]
        [--boot-disk-provisioned-throughput=BOOT_DISK_PROVISIONED_THROUGHPUT]
        [--cluster=CLUSTER] [--confidential-node-type=CONFIDENTIAL_NODE_TYPE]
        [--consolidation-delay=CONSOLIDATION_DELAY]
        [--containerd-config-from-file=PATH_TO_FILE]
        [--data-cache-count=DATA_CACHE_COUNT]
        [--disable-pod-cidr-overprovision] [--disk-size=DISK_SIZE]
        [--disk-type=DISK_TYPE] [--enable-autoprovisioning]
        [--enable-autorepair] [--no-enable-autoupgrade]
        [--enable-blue-green-upgrade] [--enable-confidential-nodes]
        [--enable-confidential-storage] [--enable-gvnic]
        [--enable-image-streaming] [--enable-insecure-kubelet-readonly-port]
        [--enable-kernel-module-signature-enforcement]
        [--enable-nested-virtualization] [--enable-private-nodes]
        [--enable-queued-provisioning] [--enable-surge-upgrade] [--flex-start]
        [--image=IMAGE] [--image-project=IMAGE_PROJECT]
        [--image-type=IMAGE_TYPE] [--labels=[KEY=VALUE,...]]
        [--local-ssd-encryption-mode=LOCAL_SSD_ENCRYPTION_MODE]
        [--logging-variant=LOGGING_VARIANT]
        [--machine-type=MACHINE_TYPE, -m MACHINE_TYPE]
        [--max-pods-per-node=MAX_PODS_PER_NODE]
        [--max-run-duration=MAX_RUN_DURATION]
        [--max-surge-upgrade=MAX_SURGE_UPGRADE; default=1]
        [--max-unavailable-upgrade=MAX_UNAVAILABLE_UPGRADE]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata-from-file=KEY=LOCAL_FILE_PATH,[...]]
        [--min-cpu-platform=PLATFORM]
        [--network-performance-configs=[PROPERTY=VALUE,...]]
        [--node-architecture-taint-behavior=NODE_ARCHITECTURE_TAINT_BEHAVIOR]
        [--node-group=NODE_GROUP] [--node-labels=[NODE_LABEL,...]]
        [--node-locations=ZONE,[ZONE,...]]
        [--node-pool-soak-duration=NODE_POOL_SOAK_DURATION]
        [--node-taints=[NODE_TAINT,...]] [--node-version=NODE_VERSION]
        [--num-nodes=NUM_NODES]
        [--opportunistic-maintenance=[node-idle-time=NODE_IDLE_TIME,
          window=WINDOW,min-nodes=MIN_NODES,...]]
        [--performance-monitoring-unit=PERFORMANCE_MONITORING_UNIT]
        [--placement-policy=PLACEMENT_POLICY] [--placement-type=PLACEMENT_TYPE]
        [--preemptible] [--resource-manager-tags=[KEY=VALUE,...]]
        [--sandbox=[type=TYPE]]
        [--secondary-boot-disk=[disk-image=DISK_IMAGE,[mode=MODE],...]]
        [--shielded-integrity-monitoring] [--shielded-secure-boot]
        [--sole-tenant-min-node-cpus=SOLE_TENANT_MIN_NODE_CPUS]
        [--sole-tenant-node-affinity-file=SOLE_TENANT_NODE_AFFINITY_FILE]
        [--spot]
        [--standard-rollout-policy=[batch-node-count=BATCH_NODE_COUNT,
          batch-percent=BATCH_NODE_PERCENTAGE,
          batch-soak-duration=BATCH_SOAK_DURATION,...]]
        [--storage-pools=STORAGE_POOL,[...]] [--subnetwork=SUBNETWORK]
        [--system-config-from-file=PATH_TO_FILE] [--tags=TAG,[TAG,...]]
        [--threads-per-core=THREADS_PER_CORE] [--tpu-topology=TPU_TOPOLOGY]
        [--windows-os-version=WINDOWS_OS_VERSION]
        [--workload-metadata=WORKLOAD_METADATA]
        [--create-pod-ipv4-range=[KEY=VALUE,...] | --pod-ipv4-range=NAME]
        [--enable-autoscaling --location-policy=LOCATION_POLICY
          --max-nodes=MAX_NODES --min-nodes=MIN_NODES
          --total-max-nodes=TOTAL_MAX_NODES --total-min-nodes=TOTAL_MIN_NODES]
        [--enable-best-effort-provision
          --min-provision-nodes=MIN_PROVISION_NODES]
        [--ephemeral-storage[=[local-ssd-count=LOCAL-SSD-COUNT]]
          | --ephemeral-storage-local-ssd[=[capacity=CAPACITY],[count=COUNT]]
          | --local-nvme-ssd-block[=[count=COUNT]]
          | --local-ssd-count=LOCAL_SSD_COUNT]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [--node-drain-grace-period-seconds=NODE_DRAIN_GRACE_PERIOD_SECONDS
          --node-drain-pdb-timeout-seconds=NODE_DRAIN_PDB_TIMEOUT_SECONDS
          --respect-pdb-during-node-pool-deletion]
        [--reservation=RESERVATION --reservation-affinity=RESERVATION_AFFINITY]
        [--scopes=[SCOPE,...];
          default="gke-default" --service-account=SERVICE_ACCOUNT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container node-pools create

```text
NAME
    gcloud alpha container node-pools create - create a node pool in a running
        cluster

SYNOPSIS
    gcloud alpha container node-pools create NAME
        [--accelerator=[type=TYPE,[count=COUNT,
          gpu-driver-version=GPU_DRIVER_VERSION,
          gpu-partition-size=GPU_PARTITION_SIZE,
          gpu-sharing-strategy=GPU_SHARING_STRATEGY,
          max-shared-clients-per-gpu=MAX_SHARED_CLIENTS_PER_GPU],...]]
        [--accelerator-network-profile=ACCELERATOR_NETWORK_PROFILE]
        [--add-maintenance-exclusion-until-end-of-support]
        [--additional-node-network=[network=NETWORK_NAME,
          subnetwork=SUBNETWORK_NAME[,stack-type=STACK_TYPE],...]]
        [--additional-pod-network=[subnetwork=SUBNETWORK_NAME,
          pod-ipv4-range=SECONDARY_RANGE_NAME,
          [max-pods-per-node=NUM_PODS],...]] [--async]
        [--autoscaled-rollout-policy=[wait-for-drain-duration=WAIT-FOR-DRAIN-DURATION]]
        [--boot-disk-kms-key=BOOT_DISK_KMS_KEY]
        [--boot-disk-provisioned-iops=BOOT_DISK_PROVISIONED_IOPS]
        [--boot-disk-provisioned-throughput=BOOT_DISK_PROVISIONED_THROUGHPUT]
        [--cluster=CLUSTER] [--confidential-node-type=CONFIDENTIAL_NODE_TYPE]
        [--consolidation-delay=CONSOLIDATION_DELAY]
        [--containerd-config-from-file=PATH_TO_FILE]
        [--data-cache-count=DATA_CACHE_COUNT]
        [--disable-pod-cidr-overprovision] [--disk-size=DISK_SIZE]
        [--disk-type=DISK_TYPE] [--enable-autoprovisioning]
        [--enable-autorepair] [--no-enable-autoupgrade]
        [--enable-blue-green-upgrade] [--enable-confidential-nodes]
        [--enable-confidential-storage] [--enable-gvnic]
        [--enable-image-streaming] [--enable-insecure-kubelet-readonly-port]
        [--enable-kernel-module-signature-enforcement]
        [--enable-nested-virtualization] [--enable-private-nodes]
        [--enable-queued-provisioning] [--enable-surge-upgrade] [--flex-start]
        [--image=IMAGE] [--image-project=IMAGE_PROJECT]
        [--image-type=IMAGE_TYPE] [--labels=[KEY=VALUE,...]]
        [--linux-sysctls=KEY=VALUE,[KEY=VALUE,...]]
        [--local-ssd-encryption-mode=LOCAL_SSD_ENCRYPTION_MODE]
        [--logging-variant=LOGGING_VARIANT]
        [--machine-type=MACHINE_TYPE, -m MACHINE_TYPE]
        [--max-pods-per-node=MAX_PODS_PER_NODE]
        [--max-run-duration=MAX_RUN_DURATION]
        [--max-surge-upgrade=MAX_SURGE_UPGRADE; default=1]
        [--max-unavailable-upgrade=MAX_UNAVAILABLE_UPGRADE]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata-from-file=KEY=LOCAL_FILE_PATH,[...]]
        [--min-cpu-platform=PLATFORM]
        [--network-performance-configs=[PROPERTY=VALUE,...]]
        [--node-architecture-taint-behavior=NODE_ARCHITECTURE_TAINT_BEHAVIOR]
        [--node-group=NODE_GROUP] [--node-labels=[NODE_LABEL,...]]
        [--node-locations=ZONE,[ZONE,...]]
        [--node-pool-soak-duration=NODE_POOL_SOAK_DURATION]
        [--node-taints=[NODE_TAINT,...]] [--node-version=NODE_VERSION]
        [--num-nodes=NUM_NODES]
        [--opportunistic-maintenance=[node-idle-time=NODE_IDLE_TIME,
          window=WINDOW,min-nodes=MIN_NODES,...]]
        [--performance-monitoring-unit=PERFORMANCE_MONITORING_UNIT]
        [--placement-policy=PLACEMENT_POLICY] [--placement-type=PLACEMENT_TYPE]
        [--preemptible] [--resource-manager-tags=[KEY=VALUE,...]]
        [--sandbox=[type=TYPE]]
        [--secondary-boot-disk=[disk-image=DISK_IMAGE,[mode=MODE],...]]
        [--shielded-integrity-monitoring] [--shielded-secure-boot]
        [--sole-tenant-min-node-cpus=SOLE_TENANT_MIN_NODE_CPUS]
        [--sole-tenant-node-affinity-file=SOLE_TENANT_NODE_AFFINITY_FILE]
        [--spot]
        [--standard-rollout-policy=[batch-node-count=BATCH_NODE_COUNT,
          batch-percent=BATCH_NODE_PERCENTAGE,
          batch-soak-duration=BATCH_SOAK_DURATION,...]]
        [--storage-pools=STORAGE_POOL,[...]] [--subnetwork=SUBNETWORK]
        [--system-config-from-file=PATH_TO_FILE] [--tags=TAG,[TAG,...]]
        [--threads-per-core=THREADS_PER_CORE] [--tpu-topology=TPU_TOPOLOGY]
        [--windows-os-version=WINDOWS_OS_VERSION]
        [--workload-metadata=WORKLOAD_METADATA]
        [--create-pod-ipv4-range=[KEY=VALUE,...] | --pod-ipv4-range=NAME]
        [--enable-autoscaling --location-policy=LOCATION_POLICY
          --max-nodes=MAX_NODES --min-nodes=MIN_NODES
          --total-max-nodes=TOTAL_MAX_NODES --total-min-nodes=TOTAL_MIN_NODES]
        [--enable-best-effort-provision
          --min-provision-nodes=MIN_PROVISION_NODES]
        [--ephemeral-storage[=[local-ssd-count=LOCAL-SSD-COUNT]]
          | --ephemeral-storage-local-ssd[=[capacity=CAPACITY],[count=COUNT]]
          | --local-nvme-ssd-block[=[count=COUNT]]
          | --local-ssd-count=LOCAL_SSD_COUNT
          | --local-ssd-volumes=[[count=COUNT],
          [type=TYPE],[format=FORMAT],...]]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [--node-drain-grace-period-seconds=NODE_DRAIN_GRACE_PERIOD_SECONDS
          --node-drain-pdb-timeout-seconds=NODE_DRAIN_PDB_TIMEOUT_SECONDS
          --respect-pdb-during-node-pool-deletion]
        [--reservation=RESERVATION --reservation-affinity=RESERVATION_AFFINITY]
        [--scopes=[SCOPE,...];
          default="gke-default" --service-account=SERVICE_ACCOUNT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/node-pools/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

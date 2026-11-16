---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/create
---

# gcloud container clusters create (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta container clusters create

```text
NAME
    gcloud beta container clusters create - create a cluster for running
        containers

SYNOPSIS
    gcloud beta container clusters create NAME
        [--accelerator=[type=TYPE,[count=COUNT,
          gpu-driver-version=GPU_DRIVER_VERSION,
          gpu-partition-size=GPU_PARTITION_SIZE,
          gpu-sharing-strategy=GPU_SHARING_STRATEGY,
          max-shared-clients-per-gpu=MAX_SHARED_CLIENTS_PER_GPU],...]]
        [--addons=[ADDON[=ENABLED|DISABLED],...]] [--allow-route-overlap]
        [--alpha-cluster-feature-gates=[FEATURE=true|false,...]]
        [--anonymous-authentication-config=ANONYMOUS_AUTHENTICATION_CONFIG]
        [--async] [--auto-monitoring-scope=AUTO_MONITORING_SCOPE]
        [--autopilot-general-profile=AUTOPILOT_GENERAL_PROFILE]
        [--autopilot-privileged-admission=[ALLOWLIST_PATHS,...]]
        [--autopilot-workload-policies=WORKLOAD_POLICIES]
        [--autoprovisioning-enable-insecure-kubelet-readonly-port]
        [--autoprovisioning-network-tags=TAGS,[TAGS,...]]
        [--autoprovisioning-resource-manager-tags=[KEY=VALUE,...]]
        [--autoscaling-profile=AUTOSCALING_PROFILE]
        [--boot-disk-kms-key=BOOT_DISK_KMS_KEY]
        [--cloud-run-config=[load-balancer-type=EXTERNAL,...]]
        [--cluster-ipv4-cidr=CLUSTER_IPV4_CIDR]
        [--cluster-secondary-range-name=NAME]
        [--cluster-version=CLUSTER_VERSION]
        [--confidential-node-type=CONFIDENTIAL_NODE_TYPE]
        [--containerd-config-from-file=PATH_TO_FILE]
        [--control-plane-egress=CONTROL_PLANE_EGRESS]
        [--create-subnetwork=[KEY=VALUE,...]]
        [--data-cache-count=DATA_CACHE_COUNT]
        [--database-encryption-key=DATABASE_ENCRYPTION_KEY]
        [--dataplane-optimization-mode=DATAPLANE_OPTIMIZATION_MODE]
        [--default-compute-class=DEFAULT_COMPUTE_CLASS]
        [--default-max-pods-per-node=DEFAULT_MAX_PODS_PER_NODE]
        [--disable-default-snat] [--disable-l4-lb-firewall-reconciliation]
        [--disable-multi-nic-lustre] [--disable-pod-cidr-overprovision]
        [--disk-size=DISK_SIZE] [--disk-type=DISK_TYPE]
        [--enable-agent-sandbox] [--enable-ambient-networking]
        [--enable-authorized-networks-on-private-endpoint] [--enable-auto-ipam]
        [--enable-autorepair] [--no-enable-autoupgrade]
        [--enable-cilium-clusterwide-network-policy] [--enable-cloud-logging]
        [--enable-cloud-monitoring] [--enable-cloud-run-alpha]
        [--enable-confidential-nodes] [--enable-confidential-storage]
        [--enable-cost-allocation] [--enable-dataplane-v2]
        [--enable-default-compute-class] [--enable-dns-access] [--enable-fleet]
        [--enable-fqdn-network-policy] [--enable-gke-oidc]
        [--enable-google-cloud-access] [--enable-gvnic]
        [--enable-identity-service] [--enable-image-streaming]
        [--enable-insecure-kubelet-readonly-port]
        [--enable-intra-node-visibility] [--enable-ip-access]
        [--enable-ip-alias] [--enable-k8s-certs-via-dns]
        [--enable-k8s-tokens-via-dns]
        [--enable-kernel-module-signature-enforcement]
        [--enable-kubernetes-alpha]
        [--enable-kubernetes-unstable-apis=API,[API,...]]
        [--enable-l4-ilb-subsetting] [--enable-legacy-authorization]
        [--enable-legacy-lustre-port] [--enable-logging-monitoring-system-only]
        [--enable-managed-mldiagnostics] [--enable-managed-prometheus]
        [--enable-master-global-access] [--enable-multi-networking]
        [--enable-nested-virtualization] [--enable-network-policy]
        [--enable-pod-security-policy] [--enable-ray-cluster-logging]
        [--enable-ray-cluster-monitoring] [--enable-scheduled-upgrades]
        [--enable-service-externalips] [--enable-shielded-nodes]
        [--enable-slice-controller] [--enable-stackdriver-kubernetes]
        [--enable-vertical-pod-autoscaling]
        [--fleet-project=PROJECT_ID_OR_NUMBER] [--gateway-api=GATEWAY_API]
        [--hpa-profile=HPA_PROFILE] [--identity-provider=IDENTITY_PROVIDER]
        [--image=IMAGE] [--image-project=IMAGE_PROJECT]
        [--image-type=IMAGE_TYPE]
        [--in-transit-encryption=IN_TRANSIT_ENCRYPTION]
        [--ipv6-access-type=IPV6_ACCESS_TYPE] [--issue-client-certificate]
        [--istio-config=[auth=MTLS_PERMISSIVE,...]] [--labels=[KEY=VALUE,...]]
        [--local-ssd-encryption-mode=LOCAL_SSD_ENCRYPTION_MODE]
        [--logging=[COMPONENT,...]] [--logging-variant=LOGGING_VARIANT]
        [--machine-type=MACHINE_TYPE, -m MACHINE_TYPE]
        [--managed-otel-scope=MANAGED_OTEL_SCOPE]
        [--max-nodes-per-pool=MAX_NODES_PER_POOL]
        [--max-pods-per-node=MAX_PODS_PER_NODE]
        [--max-surge-upgrade=MAX_SURGE_UPGRADE; default=1]
        [--max-unavailable-upgrade=MAX_UNAVAILABLE_UPGRADE]
        [--membership-type=MEMBERSHIP_TYPE]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata-from-file=KEY=LOCAL_FILE_PATH,[...]]
        [--min-cpu-platform=PLATFORM] [--monitoring=[COMPONENT,...]]
        [--network=NETWORK]
        [--network-performance-configs=[PROPERTY1=VALUE1,...]]
        [--node-architecture-taint-behavior=NODE_ARCHITECTURE_TAINT_BEHAVIOR]
        [--node-creation-mode=NODE_CREATION_MODE]
        [--node-labels=[NODE_LABEL,...]]
        [--node-pool-upgrade-concurrency-config=[max-count=MAX-COUNT]]
        [--node-taints=[NODE_TAINT,...]] [--node-version=NODE_VERSION]
        [--notification-config=[pubsub=ENABLED|DISABLED,
          pubsub-topic=TOPIC,...]] [--num-nodes=NUM_NODES; default=3]
        [--patch-update=[PATCH_UPDATE]]
        [--performance-monitoring-unit=PERFORMANCE_MONITORING_UNIT]
        [--placement-policy=PLACEMENT_POLICY] [--placement-type=PLACEMENT_TYPE]
        [--preemptible] [--private-endpoint-subnetwork=NAME]
        [--private-ipv6-google-access-type=PRIVATE_IPV6_GOOGLE_ACCESS_TYPE]
        [--release-channel=CHANNEL] [--resource-manager-tags=[KEY=VALUE,...]]
        [--security-group=SECURITY_GROUP] [--security-posture=SECURITY_POSTURE]
        [--services-ipv4-cidr=CIDR] [--services-secondary-range-name=NAME]
        [--shielded-integrity-monitoring] [--shielded-secure-boot] [--spot]
        [--stack-type=STACK_TYPE] [--storage-pools=STORAGE_POOL,[...]]
        [--subnetwork=SUBNETWORK] [--system-config-from-file=PATH_TO_FILE]
        [--tags=TAG,[TAG,...]] [--threads-per-core=THREADS_PER_CORE]
        [--tier=TIER] [--workload-metadata=WORKLOAD_METADATA]
        [--workload-pool=WORKLOAD_POOL]
        [--workload-vulnerability-scanning=WORKLOAD_VULNERABILITY_SCANNING]
        [--additional-zones=ZONE,[ZONE,...] | --node-locations=ZONE,[ZONE,...]]
        [--aggregation-ca=CA_POOL_PATH --cluster-ca=CA_POOL_PATH
          --control-plane-disk-encryption-key=KEY --etcd-api-ca=CA_POOL_PATH
          --etcd-peer-ca=CA_POOL_PATH --gkeops-etcd-backup-encryption-key=KEY
          --service-account-signing-keys=KEY_VERSION,[KEY_VERSION,...]
          --service-account-verification-keys=KEY_VERSION,[KEY_VERSION,...]]
        [--binauthz-policy-bindings=[name=BINAUTHZ_POLICY]
          --binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE
          | --enable-binauthz]
        [--boot-disk-provisioned-iops=BOOT_DISK_PROVISIONED_IOPS
          --boot-disk-provisioned-throughput=BOOT_DISK_PROVISIONED_THROUGHPUT]
        [--cluster-dns=CLUSTER_DNS --cluster-dns-domain=CLUSTER_DNS_DOMAIN
          --cluster-dns-scope=CLUSTER_DNS_SCOPE
          --additive-vpc-scope-dns-domain=ADDITIVE_VPC_SCOPE_DNS_DOMAIN
          | --disable-additive-vpc-scope]
        [--dataplane-v2-observability-mode=DATAPLANE_V2_OBSERVABILITY_MODE
          | --disable-dataplane-v2-flow-observability
          | --enable-dataplane-v2-flow-observability]
        [--disable-dataplane-v2-metrics | --enable-dataplane-v2-metrics]
        [--disable-pod-snapshots | --enable-pod-snapshots]
        [--enable-autoprovisioning --autoprovisioning-config-file=PATH_TO_FILE
          | --autoprovisioning-image-type=AUTOPROVISIONING_IMAGE_TYPE
          --autoprovisioning-locations=ZONE,[ZONE,...]
          --autoprovisioning-min-cpu-platform=PLATFORM --max-cpu=MAX_CPU
          --max-memory=MAX_MEMORY --min-cpu=MIN_CPU --min-memory=MIN_MEMORY
          --autoprovisioning-max-surge-upgrade=AUTOPROVISIONING_MAX_SURGE_UPGRADE --autoprovisioning-max-unavailable-upgrade=AUTOPROVISIONING_MAX_UNAVAILABLE_UPGRADE --autoprovisioning-node-pool-soak-duration=AUTOPROVISIONING_NODE_POOL_SOAK_DURATION --autoprovisioning-standard-rollout-policy=[batch-node-count=BATCH_NODE_COUNT,
          batch-percent=BATCH_NODE_PERCENTAGE,
          batch-soak-duration=BATCH_SOAK_DURATION,...]
          --enable-autoprovisioning-blue-green-upgrade
          | --enable-autoprovisioning-surge-upgrade
          --autoprovisioning-scopes=[SCOPE,...]
          --autoprovisioning-service-account=AUTOPROVISIONING_SERVICE_ACCOUNT
          --enable-autoprovisioning-autorepair
          --enable-autoprovisioning-autoupgrade
          [--max-accelerator=[type=TYPE,count=COUNT,...]
          : --min-accelerator=[type=TYPE,count=COUNT,...]]]
        [--enable-autoscaling --location-policy=LOCATION_POLICY
          --max-nodes=MAX_NODES --min-nodes=MIN_NODES
          --total-max-nodes=TOTAL_MAX_NODES --total-min-nodes=TOTAL_MIN_NODES]
        [--enable-insecure-binding-system-authenticated
          --enable-insecure-binding-system-unauthenticated]
        [--enable-master-authorized-networks
          --master-authorized-networks=NETWORK,[NETWORK,...]]
        [--enable-network-egress-metering
          --enable-resource-consumption-metering
          --resource-usage-bigquery-dataset=RESOURCE_USAGE_BIGQUERY_DATASET]
        [--enable-private-endpoint --enable-private-nodes
          --master-ipv4-cidr=MASTER_IPV4_CIDR --private-cluster]
        [--enable-secret-manager --enable-secret-manager-rotation
          --secret-manager-rotation-interval=SECRET_MANAGER_ROTATION_INTERVAL]
        [--enable-secret-sync --enable-secret-sync-rotation
          --secret-sync-rotation-interval=SECRET_SYNC_ROTATION_INTERVAL]
        [--ephemeral-storage[=[local-ssd-count=LOCAL-SSD-COUNT]]
          | --ephemeral-storage-local-ssd[=[capacity=CAPACITY],[count=COUNT]]
          | --local-nvme-ssd-block[=[count=COUNT]]
          | --local-ssd-count=LOCAL_SSD_COUNT]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [--maintenance-minor-version-disruption-interval=MAINTENANCE_MINOR_VERSION_DISRUPTION_INTERVAL --maintenance-patch-version-disruption-interval=MAINTENANCE_PATCH_VERSION_DISRUPTION_INTERVAL]
        [--maintenance-window=START_TIME
          | --maintenance-window-recurrence=RRULE
          --maintenance-window-start=TIME_STAMP
          (--maintenance-window-duration=PT1H23M45S
          | --maintenance-window-end=TIME_STAMP)]
        [--password=PASSWORD --enable-basic-auth
          | --username=USERNAME, -u USERNAME]
        [--reservation=RESERVATION --reservation-affinity=RESERVATION_AFFINITY]
        [--scopes=[SCOPE,...];
          default="gke-default" --service-account=SERVICE_ACCOUNT]
        [--wiz-sensor-api-key-secret-uri=WIZ_SENSOR_API_KEY_SECRET_URI
          --wiz-sensor-proxy-secret-uri=WIZ_SENSOR_PROXY_SECRET_URI
          --wiz-sensor-registry-secret-uri=WIZ_SENSOR_REGISTRY_SECRET_URI]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container clusters create

```text
NAME
    gcloud alpha container clusters create - create a cluster for running
        containers

SYNOPSIS
    gcloud alpha container clusters create NAME
        [--accelerator=[type=TYPE,[count=COUNT,
          gpu-driver-version=GPU_DRIVER_VERSION,
          gpu-partition-size=GPU_PARTITION_SIZE,
          gpu-sharing-strategy=GPU_SHARING_STRATEGY,
          max-shared-clients-per-gpu=MAX_SHARED_CLIENTS_PER_GPU],...]]
        [--addons=[ADDON[=ENABLED|DISABLED],...]] [--allow-route-overlap]
        [--alpha-cluster-feature-gates=[FEATURE=true|false,...]]
        [--anonymous-authentication-config=ANONYMOUS_AUTHENTICATION_CONFIG]
        [--async] [--auto-monitoring-scope=AUTO_MONITORING_SCOPE]
        [--autopilot-general-profile=AUTOPILOT_GENERAL_PROFILE]
        [--autopilot-privileged-admission=[ALLOWLIST_PATHS,...]]
        [--autopilot-workload-policies=WORKLOAD_POLICIES]
        [--autoprovisioning-enable-insecure-kubelet-readonly-port]
        [--autoprovisioning-network-tags=TAGS,[TAGS,...]]
        [--autoprovisioning-resource-manager-tags=[KEY=VALUE,...]]
        [--autoscaling-profile=AUTOSCALING_PROFILE]
        [--boot-disk-kms-key=BOOT_DISK_KMS_KEY]
        [--cloud-run-config=[load-balancer-type=EXTERNAL,...]]
        [--cluster-ipv4-cidr=CLUSTER_IPV4_CIDR]
        [--cluster-secondary-range-name=NAME]
        [--cluster-version=CLUSTER_VERSION]
        [--confidential-node-type=CONFIDENTIAL_NODE_TYPE]
        [--containerd-config-from-file=PATH_TO_FILE]
        [--control-plane-egress=CONTROL_PLANE_EGRESS]
        [--create-subnetwork=[KEY=VALUE,...]]
        [--data-cache-count=DATA_CACHE_COUNT]
        [--database-encryption-key=DATABASE_ENCRYPTION_KEY]
        [--dataplane-optimization-mode=DATAPLANE_OPTIMIZATION_MODE]
        [--default-compute-class=DEFAULT_COMPUTE_CLASS]
        [--default-max-pods-per-node=DEFAULT_MAX_PODS_PER_NODE]
        [--disable-default-snat] [--disable-l4-lb-firewall-reconciliation]
        [--disable-multi-nic-lustre] [--disable-pod-cidr-overprovision]
        [--disk-size=DISK_SIZE] [--disk-type=DISK_TYPE]
        [--enable-agent-sandbox] [--enable-ambient-networking]
        [--enable-authorized-networks-on-private-endpoint] [--enable-auto-ipam]
        [--enable-autorepair] [--no-enable-autoupgrade]
        [--enable-cilium-clusterwide-network-policy] [--enable-cloud-logging]
        [--enable-cloud-monitoring] [--enable-cloud-run-alpha]
        [--enable-confidential-nodes] [--enable-confidential-storage]
        [--enable-cost-allocation] [--enable-dataplane-v2]
        [--enable-default-compute-class] [--enable-dns-access] [--enable-fleet]
        [--enable-fqdn-network-policy] [--enable-gke-oidc]
        [--enable-google-cloud-access] [--enable-gvnic]
        [--enable-identity-service] [--enable-image-streaming]
        [--enable-insecure-kubelet-readonly-port]
        [--enable-intra-node-visibility] [--enable-ip-access]
        [--enable-ip-alias] [--enable-k8s-certs-via-dns]
        [--enable-k8s-tokens-via-dns]
        [--enable-kernel-module-signature-enforcement]
        [--enable-kubernetes-alpha]
        [--enable-kubernetes-unstable-apis=API,[API,...]]
        [--enable-l4-ilb-subsetting] [--enable-legacy-authorization]
        [--enable-legacy-lustre-port] [--enable-logging-monitoring-system-only]
        [--enable-managed-mldiagnostics] [--enable-managed-prometheus]
        [--enable-master-global-access] [--enable-multi-networking]
        [--enable-nested-virtualization] [--enable-network-policy]
        [--enable-pod-security-policy] [--enable-ray-cluster-logging]
        [--enable-ray-cluster-monitoring] [--enable-scheduled-upgrades]
        [--enable-service-externalips] [--enable-shielded-nodes]
        [--enable-slice-controller] [--enable-stackdriver-kubernetes]
        [--enable-vertical-pod-autoscaling]
        [--fleet-project=PROJECT_ID_OR_NUMBER] [--gateway-api=GATEWAY_API]
        [--hpa-profile=HPA_PROFILE] [--identity-provider=IDENTITY_PROVIDER]
        [--image=IMAGE] [--image-project=IMAGE_PROJECT]
        [--image-type=IMAGE_TYPE]
        [--in-transit-encryption=IN_TRANSIT_ENCRYPTION]
        [--ipv6-access-type=IPV6_ACCESS_TYPE] [--issue-client-certificate]
        [--istio-config=[auth=MTLS_PERMISSIVE,...]] [--labels=[KEY=VALUE,...]]
        [--linux-sysctls=KEY=VALUE,[KEY=VALUE,...]]
        [--local-ssd-encryption-mode=LOCAL_SSD_ENCRYPTION_MODE]
        [--logging=[COMPONENT,...]] [--logging-variant=LOGGING_VARIANT]
        [--machine-type=MACHINE_TYPE, -m MACHINE_TYPE]
        [--managed-otel-scope=MANAGED_OTEL_SCOPE]
        [--max-nodes-per-pool=MAX_NODES_PER_POOL]
        [--max-pods-per-node=MAX_PODS_PER_NODE]
        [--max-surge-upgrade=MAX_SURGE_UPGRADE; default=1]
        [--max-unavailable-upgrade=MAX_UNAVAILABLE_UPGRADE]
        [--membership-type=MEMBERSHIP_TYPE]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata-from-file=KEY=LOCAL_FILE_PATH,[...]]
        [--min-cpu-platform=PLATFORM] [--monitoring=[COMPONENT,...]]
        [--network=NETWORK]
        [--network-performance-configs=[PROPERTY1=VALUE1,...]]
        [--node-architecture-taint-behavior=NODE_ARCHITECTURE_TAINT_BEHAVIOR]
        [--node-creation-mode=NODE_CREATION_MODE]
        [--node-labels=[NODE_LABEL,...]] [--node-pool-name=NODE_POOL_NAME]
        [--node-pool-upgrade-concurrency-config=[max-count=MAX-COUNT]]
        [--node-taints=[NODE_TAINT,...]] [--node-version=NODE_VERSION]
        [--notification-config=[pubsub=ENABLED|DISABLED,
          pubsub-topic=TOPIC,...]] [--num-nodes=NUM_NODES; default=3]
        [--patch-update=[PATCH_UPDATE]]
        [--performance-monitoring-unit=PERFORMANCE_MONITORING_UNIT]
        [--placement-policy=PLACEMENT_POLICY] [--placement-type=PLACEMENT_TYPE]
        [--preemptible] [--private-endpoint-subnetwork=NAME]
        [--private-ipv6-google-access-type=PRIVATE_IPV6_GOOGLE_ACCESS_TYPE]
        [--release-channel=CHANNEL] [--resource-manager-tags=[KEY=VALUE,...]]
        [--security-group=SECURITY_GROUP] [--security-posture=SECURITY_POSTURE]
        [--services-ipv4-cidr=CIDR] [--services-secondary-range-name=NAME]
        [--shielded-integrity-monitoring] [--shielded-secure-boot] [--spot]
        [--stack-type=STACK_TYPE] [--storage-pools=STORAGE_POOL,[...]]
        [--subnetwork=SUBNETWORK] [--system-config-from-file=PATH_TO_FILE]
        [--tags=TAG,[TAG,...]] [--threads-per-core=THREADS_PER_CORE]
        [--tier=TIER] [--workload-metadata=WORKLOAD_METADATA]
        [--workload-pool=WORKLOAD_POOL]
        [--workload-vulnerability-scanning=WORKLOAD_VULNERABILITY_SCANNING]
        [--additional-zones=ZONE,[ZONE,...] | --node-locations=ZONE,[ZONE,...]]
        [--aggregation-ca=CA_POOL_PATH --cluster-ca=CA_POOL_PATH
          --control-plane-disk-encryption-key=KEY --etcd-api-ca=CA_POOL_PATH
          --etcd-peer-ca=CA_POOL_PATH --gkeops-etcd-backup-encryption-key=KEY
          --service-account-signing-keys=KEY_VERSION,[KEY_VERSION,...]
          --service-account-verification-keys=KEY_VERSION,[KEY_VERSION,...]]
        [--binauthz-policy-bindings=[name=BINAUTHZ_POLICY,
          enforcement-mode=ENFORCEMENT_MODE,...]
          --binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE
          | --enable-binauthz]
        [--boot-disk-provisioned-iops=BOOT_DISK_PROVISIONED_IOPS
          --boot-disk-provisioned-throughput=BOOT_DISK_PROVISIONED_THROUGHPUT]
        [--cluster-dns=CLUSTER_DNS --cluster-dns-domain=CLUSTER_DNS_DOMAIN
          --cluster-dns-scope=CLUSTER_DNS_SCOPE
          --additive-vpc-scope-dns-domain=ADDITIVE_VPC_SCOPE_DNS_DOMAIN
          | --disable-additive-vpc-scope]
        [--dataplane-v2-observability-mode=DATAPLANE_V2_OBSERVABILITY_MODE
          | --disable-dataplane-v2-flow-observability
          | --enable-dataplane-v2-flow-observability]
        [--disable-dataplane-v2-metrics | --enable-dataplane-v2-metrics]
        [--disable-pod-snapshots | --enable-pod-snapshots]
        [--enable-autoprovisioning --autoprovisioning-config-file=PATH_TO_FILE
          | --autoprovisioning-image-type=AUTOPROVISIONING_IMAGE_TYPE
          --autoprovisioning-locations=ZONE,[ZONE,...]
          --autoprovisioning-min-cpu-platform=PLATFORM --max-cpu=MAX_CPU
          --max-memory=MAX_MEMORY --min-cpu=MIN_CPU --min-memory=MIN_MEMORY
          --autoprovisioning-max-surge-upgrade=AUTOPROVISIONING_MAX_SURGE_UPGRADE --autoprovisioning-max-unavailable-upgrade=AUTOPROVISIONING_MAX_UNAVAILABLE_UPGRADE --autoprovisioning-node-pool-soak-duration=AUTOPROVISIONING_NODE_POOL_SOAK_DURATION --autoprovisioning-standard-rollout-policy=[batch-node-count=BATCH_NODE_COUNT,
          batch-percent=BATCH_NODE_PERCENTAGE,
          batch-soak-duration=BATCH_SOAK_DURATION,...]
          --enable-autoprovisioning-blue-green-upgrade
          | --enable-autoprovisioning-surge-upgrade
          --autoprovisioning-scopes=[SCOPE,...]
          --autoprovisioning-service-account=AUTOPROVISIONING_SERVICE_ACCOUNT
          --enable-autoprovisioning-autorepair
          --enable-autoprovisioning-autoupgrade
          [--max-accelerator=[type=TYPE,count=COUNT,...]
          : --min-accelerator=[type=TYPE,count=COUNT,...]]]
        [--enable-autoscaling --location-policy=LOCATION_POLICY
          --max-nodes=MAX_NODES --min-nodes=MIN_NODES
          --total-max-nodes=TOTAL_MAX_NODES --total-min-nodes=TOTAL_MIN_NODES]
        [--enable-insecure-binding-system-authenticated
          --enable-insecure-binding-system-unauthenticated]
        [--enable-master-authorized-networks
          --master-authorized-networks=NETWORK,[NETWORK,...]]
        [--enable-network-egress-metering
          --enable-resource-consumption-metering
          --resource-usage-bigquery-dataset=RESOURCE_USAGE_BIGQUERY_DATASET]
        [--enable-private-endpoint --enable-private-nodes
          --master-ipv4-cidr=MASTER_IPV4_CIDR --private-cluster]
        [--enable-secret-manager --enable-secret-manager-rotation
          --secret-manager-rotation-interval=SECRET_MANAGER_ROTATION_INTERVAL]
        [--enable-secret-sync --enable-secret-sync-rotation
          --secret-sync-rotation-interval=SECRET_SYNC_ROTATION_INTERVAL]
        [--ephemeral-storage[=[local-ssd-count=LOCAL-SSD-COUNT]]
          | --ephemeral-storage-local-ssd[=[capacity=CAPACITY],[count=COUNT]]
          | --local-nvme-ssd-block[=[count=COUNT]]
          | --local-ssd-count=LOCAL_SSD_COUNT
          | --local-ssd-volumes=[[count=COUNT],
          [type=TYPE],[format=FORMAT],...]]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [--maintenance-minor-version-disruption-interval=MAINTENANCE_MINOR_VERSION_DISRUPTION_INTERVAL --maintenance-patch-version-disruption-interval=MAINTENANCE_PATCH_VERSION_DISRUPTION_INTERVAL]
        [--maintenance-window=START_TIME
          | --maintenance-window-recurrence=RRULE
          --maintenance-window-start=TIME_STAMP
          (--maintenance-window-duration=PT1H23M45S
          | --maintenance-window-end=TIME_STAMP)]
        [--password=PASSWORD --enable-basic-auth
          | --username=USERNAME, -u USERNAME]
        [--reservation=RESERVATION --reservation-affinity=RESERVATION_AFFINITY]
        [--scopes=[SCOPE,...];
          default="gke-default" --service-account=SERVICE_ACCOUNT]
        [--security-profile=SECURITY_PROFILE
          --no-security-profile-runtime-rules]
        [--wiz-sensor-api-key-secret-uri=WIZ_SENSOR_API_KEY_SECRET_URI
          --wiz-sensor-proxy-secret-uri=WIZ_SENSOR_PROXY_SECRET_URI
          --wiz-sensor-registry-secret-uri=WIZ_SENSOR_REGISTRY_SECRET_URI]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

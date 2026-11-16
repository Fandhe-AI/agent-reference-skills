---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/update
---

# gcloud container clusters update (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta container clusters update

```text
NAME
    gcloud beta container clusters update - update cluster settings for an
        existing container cluster

SYNOPSIS
    gcloud beta container clusters update NAME
        (--anonymous-authentication-config=ANONYMOUS_AUTHENTICATION_CONFIG
          | --autopilot-general-profile=AUTOPILOT_GENERAL_PROFILE
          | --autopilot-privileged-admission=[ALLOWLIST_PATHS,...]
          | --autopilot-workload-policies=WORKLOAD_POLICIES
          | --autoprovisioning-cgroup-mode=AUTOPROVISIONING_CGROUP_MODE
          | --autoprovisioning-enable-insecure-kubelet-readonly-port
          | --autoprovisioning-network-tags=[TAGS,...]
          | --autoprovisioning-resource-manager-tags=[KEY=VALUE,...]
          | --autoscaling-profile=AUTOSCALING_PROFILE
          | --complete-credential-rotation | --complete-ip-rotation
          | --containerd-config-from-file=PATH_TO_FILE
          | --control-plane-egress=CONTROL_PLANE_EGRESS
          | --database-encryption-key=DATABASE_ENCRYPTION_KEY
          | --disable-database-encryption | --disable-default-snat
          | --disable-multi-nic-lustre | --disable-workload-identity
          | --enable-agent-sandbox | --[no-]enable-ambient-networking
          | --[no-]enable-autopilot-compatibility-auditing
          | --enable-autoscaling
          | --[no-]enable-cilium-clusterwide-network-policy
          | --enable-cost-allocation | --[no-]enable-dataplane-v2
          | --enable-fqdn-network-policy | --enable-gke-oidc
          | --enable-identity-service | --enable-image-streaming
          | --enable-insecure-kubelet-readonly-port
          | --enable-intra-node-visibility
          | --enable-kernel-module-signature-enforcement
          | --enable-kubernetes-unstable-apis=API,[API,...]
          | --enable-l4-ilb-subsetting | --enable-legacy-authorization
          | --enable-legacy-lustre-port
          | --enable-logging-monitoring-system-only | --enable-multi-networking
          | --enable-network-policy | --enable-pod-security-policy
          | --enable-private-nodes | --enable-service-externalips
          | --enable-shielded-nodes | --enable-slice-controller
          | --enable-stackdriver-kubernetes | --enable-vertical-pod-autoscaling
          | --gateway-api=GATEWAY_API | --generate-password
          | --hpa-profile=HPA_PROFILE | --identity-provider=IDENTITY_PROVIDER
          | --in-transit-encryption=IN_TRANSIT_ENCRYPTION
          | --logging-variant=LOGGING_VARIANT | --maintenance-window=START_TIME
          | --network-performance-configs=[PROPERTY1=VALUE1,...]
          | --node-creation-mode=NODE_CREATION_MODE
          | --node-pool-upgrade-concurrency-config=[max-count=MAX-COUNT]
          | --notification-config=[pubsub=ENABLED|DISABLED,
          pubsub-topic=TOPIC,...] | --patch-update=[PATCH_UPDATE]
          | --private-ipv6-google-access-type=PRIVATE_IPV6_GOOGLE_ACCESS_TYPE
          | --release-channel=CHANNEL
          | --remove-autopilot-workload-policies=REMOVE_WORKLOAD_POLICIES
          | --remove-labels=[KEY,...]
          | --remove-workload-policies=REMOVE_WORKLOAD_POLICIES
          | --security-group=SECURITY_GROUP
          | --security-posture=SECURITY_POSTURE | --set-password
          | --stack-type=STACK_TYPE | --start-credential-rotation
          | --start-ip-rotation | --tier=TIER
          | --update-addons=[ADDON=ENABLED|DISABLED,...]
          | --update-labels=[KEY=VALUE,...]
          | --workload-policies=WORKLOAD_POLICIES
          | --workload-pool=WORKLOAD_POOL
          | --workload-vulnerability-scanning=WORKLOAD_VULNERABILITY_SCANNING
          | --additional-ip-ranges=[subnetwork=NAME,pod-ipv4-range=NAME,...]
          --remove-additional-ip-ranges=[subnetwork=NAME,
          pod-ipv4-range=NAME,...]
          | --additional-pod-ipv4-ranges=NAME,[NAME,...]
          --remove-additional-pod-ipv4-ranges=NAME,[NAME,...]
          | --additional-zones=[ZONE,...] | --node-locations=ZONE,[ZONE,...]
          | --auto-monitoring-scope=AUTO_MONITORING_SCOPE
          --enable-managed-mldiagnostics --logging=[COMPONENT,...]
          --managed-otel-scope=MANAGED_OTEL_SCOPE
          --monitoring=[COMPONENT,...] --disable-managed-prometheus
          | --enable-managed-prometheus
          | --binauthz-policy-bindings=[name=BINAUTHZ_POLICY]
          --binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE
          | --enable-binauthz | --clear-fleet-project --enable-fleet
          --fleet-project=PROJECT_ID_OR_NUMBER
          --membership-type=MEMBERSHIP_TYPE --unset-membership-type
          | --clear-maintenance-minor-version-disruption-interval
          | --maintenance-minor-version-disruption-interval=MAINTENANCE_MINOR_VERSION_DISRUPTION_INTERVAL --clear-maintenance-patch-version-disruption-interval | --maintenance-patch-version-disruption-interval=MAINTENANCE_PATCH_VERSION_DISRUPTION_INTERVAL | --clear-maintenance-window | --remove-maintenance-exclusion=NAME | [(--add-maintenance-exclusion-end=TIME_STAMP | --add-maintenance-exclusion-until-end-of-support) : --add-maintenance-exclusion-name=NAME --add-maintenance-exclusion-scope=SCOPE --add-maintenance-exclusion-start=TIME_STAMP] | --maintenance-window-recurrence=RRULE --maintenance-window-start=TIME_STAMP (--maintenance-window-duration=PT1H23M45S | --maintenance-window-end=TIME_STAMP) | --clear-resource-usage-bigquery-dataset | --enable-network-egress-metering --enable-resource-consumption-metering --resource-usage-bigquery-dataset=RESOURCE_USAGE_BIGQUERY_DATASET | --cluster-dns=CLUSTER_DNS --cluster-dns-domain=CLUSTER_DNS_DOMAIN --cluster-dns-scope=CLUSTER_DNS_SCOPE --additive-vpc-scope-dns-domain=ADDITIVE_VPC_SCOPE_DNS_DOMAIN | --disable-additive-vpc-scope | --dataplane-v2-observability-mode=DATAPLANE_V2_OBSERVABILITY_MODE | --disable-dataplane-v2-flow-observability | --enable-dataplane-v2-flow-observability --disable-dataplane-v2-metrics | --enable-dataplane-v2-metrics | --default-compute-class=DEFAULT_COMPUTE_CLASS --enable-default-compute-class | --disable-auto-ipam | --enable-auto-ipam | --disable-l4-lb-firewall-reconciliation | --enable-l4-lb-firewall-reconciliation | --disable-pod-snapshots | --enable-pod-snapshots | --disable-scheduled-upgrades | --enable-scheduled-upgrades | --enable-authorized-networks-on-private-endpoint --enable-dns-access --enable-google-cloud-access --enable-ip-access --enable-k8s-certs-via-dns --enable-k8s-tokens-via-dns --enable-master-global-access --enable-private-endpoint --enable-master-authorized-networks --master-authorized-networks=NETWORK,
          [NETWORK,...] | --enable-autoprovisioning
          --autoprovisioning-config-file=PATH_TO_FILE
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
          : --min-accelerator=[type=TYPE,count=COUNT,...]]
          | --enable-insecure-binding-system-authenticated
          --enable-insecure-binding-system-unauthenticated
          | --logging-service=LOGGING_SERVICE
          --monitoring-service=MONITORING_SERVICE
          | --[no-]enable-ray-cluster-logging
          --[no-]enable-ray-cluster-monitoring | --[no-]enable-secret-manager
          --[no-]enable-secret-manager-rotation
          --secret-manager-rotation-interval=SECRET_MANAGER_ROTATION_INTERVAL
          | --[no-]enable-secret-sync --[no-]enable-secret-sync-rotation
          --secret-sync-rotation-interval=SECRET_SYNC_ROTATION_INTERVAL
          | --password=PASSWORD --enable-basic-auth
          | --username=USERNAME, -u USERNAME) [--async]
        [--cloud-run-config=[load-balancer-type=EXTERNAL,...]]
        [--istio-config=[auth=MTLS_PERMISSIVE,...]] [--node-pool=NODE_POOL]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [--location-policy=LOCATION_POLICY --max-nodes=MAX_NODES
          --min-nodes=MIN_NODES
          --total-max-nodes=TOTAL_MAX_NODES --total-min-nodes=TOTAL_MIN_NODES]
        [--wiz-sensor-api-key-secret-uri=WIZ_SENSOR_API_KEY_SECRET_URI
          --wiz-sensor-proxy-secret-uri=WIZ_SENSOR_PROXY_SECRET_URI
          --wiz-sensor-registry-secret-uri=WIZ_SENSOR_REGISTRY_SECRET_URI]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container clusters update

```text
NAME
    gcloud alpha container clusters update - update cluster settings for an
        existing container cluster

SYNOPSIS
    gcloud alpha container clusters update NAME
        (--anonymous-authentication-config=ANONYMOUS_AUTHENTICATION_CONFIG
          | --autopilot-general-profile=AUTOPILOT_GENERAL_PROFILE
          | --autopilot-privileged-admission=[ALLOWLIST_PATHS,...]
          | --autopilot-workload-policies=WORKLOAD_POLICIES
          | --autoprovisioning-cgroup-mode=AUTOPROVISIONING_CGROUP_MODE
          | --autoprovisioning-enable-insecure-kubelet-readonly-port
          | --autoprovisioning-network-tags=[TAGS,...]
          | --autoprovisioning-resource-manager-tags=[KEY=VALUE,...]
          | --autoscaling-profile=AUTOSCALING_PROFILE
          | --complete-credential-rotation | --complete-ip-rotation
          | --containerd-config-from-file=PATH_TO_FILE
          | --control-plane-egress=CONTROL_PLANE_EGRESS
          | --database-encryption-key=DATABASE_ENCRYPTION_KEY
          | --disable-database-encryption | --disable-default-snat
          | --disable-multi-nic-lustre | --disable-workload-identity
          | --enable-agent-sandbox | --[no-]enable-ambient-networking
          | --[no-]enable-autopilot-compatibility-auditing
          | --enable-autoscaling
          | --[no-]enable-cilium-clusterwide-network-policy
          | --enable-cost-allocation | --[no-]enable-dataplane-v2
          | --enable-fqdn-network-policy | --enable-gke-oidc
          | --enable-identity-service | --enable-image-streaming
          | --enable-insecure-kubelet-readonly-port
          | --enable-intra-node-visibility
          | --enable-kernel-module-signature-enforcement
          | --enable-kubernetes-unstable-apis=API,[API,...]
          | --enable-l4-ilb-subsetting | --enable-legacy-authorization
          | --enable-legacy-lustre-port
          | --enable-logging-monitoring-system-only | --enable-multi-networking
          | --enable-network-policy | --enable-pod-security-policy
          | --enable-private-nodes | --enable-service-externalips
          | --enable-shielded-nodes | --enable-slice-controller
          | --enable-stackdriver-kubernetes | --enable-vertical-pod-autoscaling
          | --gateway-api=GATEWAY_API | --generate-password
          | --hpa-profile=HPA_PROFILE | --identity-provider=IDENTITY_PROVIDER
          | --in-transit-encryption=IN_TRANSIT_ENCRYPTION
          | --logging-variant=LOGGING_VARIANT | --maintenance-window=START_TIME
          | --network-performance-configs=[PROPERTY1=VALUE1,...]
          | --node-creation-mode=NODE_CREATION_MODE
          | --node-pool-upgrade-concurrency-config=[max-count=MAX-COUNT]
          | --notification-config=[pubsub=ENABLED|DISABLED,
          pubsub-topic=TOPIC,...] | --patch-update=[PATCH_UPDATE]
          | --private-ipv6-google-access-type=PRIVATE_IPV6_GOOGLE_ACCESS_TYPE
          | --release-channel=CHANNEL
          | --remove-autopilot-workload-policies=REMOVE_WORKLOAD_POLICIES
          | --remove-labels=[KEY,...]
          | --remove-workload-policies=REMOVE_WORKLOAD_POLICIES
          | --security-group=SECURITY_GROUP
          | --security-posture=SECURITY_POSTURE
          | --security-profile=SECURITY_PROFILE | --set-password
          | --stack-type=STACK_TYPE | --start-credential-rotation
          | --start-ip-rotation | --tier=TIER
          | --update-addons=[ADDON=ENABLED|DISABLED,...]
          | --update-labels=[KEY=VALUE,...]
          | --workload-policies=WORKLOAD_POLICIES
          | --workload-pool=WORKLOAD_POOL
          | --workload-vulnerability-scanning=WORKLOAD_VULNERABILITY_SCANNING
          | --additional-ip-ranges=[subnetwork=NAME,pod-ipv4-range=NAME,...]
          --remove-additional-ip-ranges=[subnetwork=NAME,
          pod-ipv4-range=NAME,...]
          | --additional-pod-ipv4-ranges=NAME,[NAME,...]
          --remove-additional-pod-ipv4-ranges=NAME,[NAME,...]
          | --additional-zones=[ZONE,...] | --node-locations=ZONE,[ZONE,...]
          | --auto-monitoring-scope=AUTO_MONITORING_SCOPE
          --enable-managed-mldiagnostics --logging=[COMPONENT,...]
          --managed-otel-scope=MANAGED_OTEL_SCOPE
          --monitoring=[COMPONENT,...] --disable-managed-prometheus
          | --enable-managed-prometheus
          | --binauthz-policy-bindings=[name=BINAUTHZ_POLICY,
          enforcement-mode=ENFORCEMENT_MODE,...]
          --binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE
          | --enable-binauthz | --clear-fleet-project --enable-fleet
          --fleet-project=PROJECT_ID_OR_NUMBER
          --membership-type=MEMBERSHIP_TYPE --unset-membership-type
          | --clear-maintenance-minor-version-disruption-interval
          | --maintenance-minor-version-disruption-interval=MAINTENANCE_MINOR_VERSION_DISRUPTION_INTERVAL --clear-maintenance-patch-version-disruption-interval | --maintenance-patch-version-disruption-interval=MAINTENANCE_PATCH_VERSION_DISRUPTION_INTERVAL | --clear-maintenance-window | --remove-maintenance-exclusion=NAME | [(--add-maintenance-exclusion-end=TIME_STAMP | --add-maintenance-exclusion-until-end-of-support) : --add-maintenance-exclusion-name=NAME --add-maintenance-exclusion-scope=SCOPE --add-maintenance-exclusion-start=TIME_STAMP] | --maintenance-window-recurrence=RRULE --maintenance-window-start=TIME_STAMP (--maintenance-window-duration=PT1H23M45S | --maintenance-window-end=TIME_STAMP) | --clear-resource-usage-bigquery-dataset | --enable-network-egress-metering --enable-resource-consumption-metering --resource-usage-bigquery-dataset=RESOURCE_USAGE_BIGQUERY_DATASET | --cluster-dns=CLUSTER_DNS --cluster-dns-domain=CLUSTER_DNS_DOMAIN --cluster-dns-scope=CLUSTER_DNS_SCOPE --additive-vpc-scope-dns-domain=ADDITIVE_VPC_SCOPE_DNS_DOMAIN | --disable-additive-vpc-scope | --dataplane-v2-observability-mode=DATAPLANE_V2_OBSERVABILITY_MODE | --disable-dataplane-v2-flow-observability | --enable-dataplane-v2-flow-observability --disable-dataplane-v2-metrics | --enable-dataplane-v2-metrics | --default-compute-class=DEFAULT_COMPUTE_CLASS --enable-default-compute-class | --disable-auto-ipam | --enable-auto-ipam | --disable-l4-lb-firewall-reconciliation | --enable-l4-lb-firewall-reconciliation | --disable-pod-snapshots | --enable-pod-snapshots | --disable-scheduled-upgrades | --enable-scheduled-upgrades | --enable-authorized-networks-on-private-endpoint --enable-dns-access --enable-google-cloud-access --enable-ip-access --enable-k8s-certs-via-dns --enable-k8s-tokens-via-dns --enable-master-global-access --enable-private-endpoint --enable-master-authorized-networks --master-authorized-networks=NETWORK,
          [NETWORK,...] | --enable-autoprovisioning
          --autoprovisioning-config-file=PATH_TO_FILE
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
          : --min-accelerator=[type=TYPE,count=COUNT,...]]
          | --enable-insecure-binding-system-authenticated
          --enable-insecure-binding-system-unauthenticated
          | --logging-service=LOGGING_SERVICE
          --monitoring-service=MONITORING_SERVICE
          | --[no-]enable-ray-cluster-logging
          --[no-]enable-ray-cluster-monitoring | --[no-]enable-secret-manager
          --[no-]enable-secret-manager-rotation
          --secret-manager-rotation-interval=SECRET_MANAGER_ROTATION_INTERVAL
          | --[no-]enable-secret-sync --[no-]enable-secret-sync-rotation
          --secret-sync-rotation-interval=SECRET_SYNC_ROTATION_INTERVAL
          | --password=PASSWORD --enable-basic-auth
          | --username=USERNAME, -u USERNAME) [--async]
        [--cloud-run-config=[load-balancer-type=EXTERNAL,...]]
        [--istio-config=[auth=MTLS_PERMISSIVE,...]] [--node-pool=NODE_POOL]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [--location-policy=LOCATION_POLICY --max-nodes=MAX_NODES
          --min-nodes=MIN_NODES
          --total-max-nodes=TOTAL_MAX_NODES --total-min-nodes=TOTAL_MIN_NODES]
        [--wiz-sensor-api-key-secret-uri=WIZ_SENSOR_API_KEY_SECRET_URI
          --wiz-sensor-proxy-secret-uri=WIZ_SENSOR_PROXY_SECRET_URI
          --wiz-sensor-registry-secret-uri=WIZ_SENSOR_REGISTRY_SECRET_URI]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

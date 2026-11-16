---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/instances
---

# gcloud alloydb instances (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta alloydb instances create-secondary

```text
NAME
    gcloud beta alloydb instances create-secondary - creates a new AlloyDB
        SECONDARY instance within a given cluster

SYNOPSIS
    gcloud beta alloydb instances create-secondary INSTANCE --cluster=CLUSTER
        --region=REGION
        [--allocated-ip-range-override=ALLOCATED_IP_RANGE_OVERRIDE]
        [--allowed-psc-projects=[ALLOWED_PSC_PROJECTS,...]]
        [--assign-inbound-public-ip=ASSIGN_INBOUND_PUBLIC_IP] [--async]
        [--authorized-external-networks=[AUTHORIZED_NETWORK,...]]
        [--availability-type=AVAILABILITY_TYPE]
        [--connection-pooling-authproxy-pooler-scaling-type=CONNECTION_POOLING_AUTHPROXY_POOLER_SCALING_TYPE]
        [--connection-pooling-client-connection-idle-timeout=CONNECTION_POOLING_CLIENT_CONNECTION_IDLE_TIMEOUT]
        [--connection-pooling-ignore-startup-parameters=[STARTUP_PARAMETERS,
          ...]]
        [--connection-pooling-max-client-connections=CONNECTION_POOLING_MAX_CLIENT_CONNECTIONS]
        [--connection-pooling-max-pool-size=CONNECTION_POOLING_MAX_POOL_SIZE]
        [--connection-pooling-max-prepared-statements=CONNECTION_POOLING_MAX_PREPARED_STATEMENTS]
        [--connection-pooling-min-pool-size=CONNECTION_POOLING_MIN_POOL_SIZE]
        [--connection-pooling-pool-mode=CONNECTION_POOLING_POOL_MODE]
        [--connection-pooling-query-wait-timeout=CONNECTION_POOLING_QUERY_WAIT_TIMEOUT]
        [--connection-pooling-server-idle-timeout=CONNECTION_POOLING_SERVER_IDLE_TIMEOUT]
        [--connection-pooling-server-lifetime=CONNECTION_POOLING_SERVER_LIFETIME]
        [--connection-pooling-stats-users=[STATS_USERS,...]]
        [--database-flags=FLAG=VALUE,[FLAG=VALUE,...]]
        [--[no-]enable-connection-pooling]
        [--[no-]enable-psc-auto-connection-policy] [--[no-]enable-psc-auto-dns]
        [--labels=[KEY=VALUE,...]] [--[no-]outbound-public-ip]
        [--psc-auto-connections=[network=NETWORK],[project=PROJECT]]
        [--psc-network-attachment-uri=PSC_NETWORK_ATTACHMENT_URI]
        [--[no-]require-connectors] [--ssl-mode=SSL_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb instances delete

```text
NAME
    gcloud beta alloydb instances delete - deletes an AlloyDB instance within a
        given cluster

SYNOPSIS
    gcloud beta alloydb instances delete INSTANCE --cluster=CLUSTER
        --region=REGION [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb instances describe

```text
NAME
    gcloud beta alloydb instances describe - describes an AlloyDB instance
        within a given cluster

SYNOPSIS
    gcloud beta alloydb instances describe INSTANCE --cluster=CLUSTER
        --region=REGION [--view=VIEW] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb instances failover

```text
NAME
    gcloud beta alloydb instances failover - failover an AlloyDB instance
        within a given cluster

SYNOPSIS
    gcloud beta alloydb instances failover INSTANCE --cluster=CLUSTER
        --region=REGION [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb instances inject-fault

```text
NAME
    gcloud beta alloydb instances inject-fault - inject fault on an AlloyDB
        instance within a given cluster

SYNOPSIS
    gcloud beta alloydb instances inject-fault INSTANCE --cluster=CLUSTER
        --fault-type=FAULT_TYPE --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb instances list

```text
NAME
    gcloud beta alloydb instances list - lists AlloyDB instances in a given
        cluster

SYNOPSIS
    gcloud beta alloydb instances list [--cluster=CLUSTER --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb instances restart

```text
NAME
    gcloud beta alloydb instances restart - restarts an AlloyDB instance within
        a given cluster

SYNOPSIS
    gcloud beta alloydb instances restart INSTANCE --cluster=CLUSTER
        --region=REGION [--async] [--node-ids=[NODE_IDS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb instances update

```text
NAME
    gcloud beta alloydb instances update - updates an AlloyDB instance within a
        given cluster

SYNOPSIS
    gcloud beta alloydb instances update INSTANCE --cluster=CLUSTER
        --region=REGION [--activation-policy=ACTIVATION_POLICY]
        [--allowed-psc-projects=[ALLOWED_PSC_PROJECTS,...]]
        [--assign-inbound-public-ip=ASSIGN_INBOUND_PUBLIC_IP] [--async]
        [--authorized-external-networks=[AUTHORIZED_NETWORK,...]]
        [--availability-type=AVAILABILITY_TYPE]
        [--clear-psc-network-attachment-uri]
        [--connection-pooling-authproxy-pooler-scaling-type=CONNECTION_POOLING_AUTHPROXY_POOLER_SCALING_TYPE]
        [--connection-pooling-client-connection-idle-timeout=CONNECTION_POOLING_CLIENT_CONNECTION_IDLE_TIMEOUT]
        [--connection-pooling-ignore-startup-parameters=[STARTUP_PARAMETERS,
          ...]]
        [--connection-pooling-max-client-connections=CONNECTION_POOLING_MAX_CLIENT_CONNECTIONS]
        [--connection-pooling-max-pool-size=CONNECTION_POOLING_MAX_POOL_SIZE]
        [--connection-pooling-max-prepared-statements=CONNECTION_POOLING_MAX_PREPARED_STATEMENTS]
        [--connection-pooling-min-pool-size=CONNECTION_POOLING_MIN_POOL_SIZE]
        [--connection-pooling-pool-mode=CONNECTION_POOLING_POOL_MODE]
        [--connection-pooling-query-wait-timeout=CONNECTION_POOLING_QUERY_WAIT_TIMEOUT]
        [--connection-pooling-server-idle-timeout=CONNECTION_POOLING_SERVER_IDLE_TIMEOUT]
        [--connection-pooling-server-lifetime=CONNECTION_POOLING_SERVER_LIFETIME]
        [--connection-pooling-stats-users=[STATS_USERS,...]]
        [--cpu-count=CPU_COUNT] [--database-flags=FLAG=VALUE,[FLAG=VALUE,...]]
        [--[no-]enable-connection-pooling]
        [--[no-]enable-psc-auto-connection-policy] [--[no-]enable-psc-auto-dns]
        [--[no-]enable-public-dns]
        [--insights-config-query-plans-per-minute=INSIGHTS_CONFIG_QUERY_PLANS_PER_MINUTE]
        [--insights-config-query-string-length=INSIGHTS_CONFIG_QUERY_STRING_LENGTH]
        [--[no-]insights-config-record-application-tags]
        [--[no-]insights-config-record-client-address]
        [--machine-type=MACHINE_TYPE]
        [--[no-]observability-config-assistive-experiences-enabled]
        [--[no-]observability-config-enabled]
        [--observability-config-max-query-string-length=OBSERVABILITY_CONFIG_MAX_QUERY_STRING_LENGTH]
        [--[no-]observability-config-preserve-comments]
        [--observability-config-query-plans-per-minute=OBSERVABILITY_CONFIG_QUERY_PLANS_PER_MINUTE]
        [--[no-]observability-config-record-application-tags]
        [--[no-]observability-config-track-active-queries]
        [--[no-]observability-config-track-active-query-plan]
        [--[no-]observability-config-track-client-address]
        [--observability-config-track-wait-events] [--[no-]outbound-public-ip]
        [--psc-network-attachment-uri=PSC_NETWORK_ATTACHMENT_URI]
        [--read-pool-node-count=READ_POOL_NODE_COUNT]
        [--[no-]require-connectors] [--ssl-mode=SSL_MODE]
        [--update-labels=[KEY=VALUE,...]] [--update-mode=UPDATE_MODE]
        [--autoscaler-cool-down-period-seconds=AUTOSCALER_COOL_DOWN_PERIOD_SECONDS --autoscaler-max-node-count=AUTOSCALER_MAX_NODE_COUNT --autoscaler-schedule-cron-exp=AUTOSCALER_SCHEDULE_CRON_EXP --autoscaler-schedule-description=AUTOSCALER_SCHEDULE_DESCRIPTION --autoscaler-schedule-duration-seconds=AUTOSCALER_SCHEDULE_DURATION_SECONDS --autoscaler-schedule-min-node-count=AUTOSCALER_SCHEDULE_MIN_NODE_COUNT --autoscaler-schedule-time-zone=AUTOSCALER_SCHEDULE_TIME_ZONE --autoscaler-target-connections-count=AUTOSCALER_TARGET_CONNECTIONS_COUNT --autoscaler-target-cpu-usage=AUTOSCALER_TARGET_CPU_USAGE --[no-]enable-autoscaler --autoscaler-delete-schedule=AUTOSCALER_DELETE_SCHEDULE | --autoscaler-disable-schedule=AUTOSCALER_DISABLE_SCHEDULE | --autoscaler-enable-schedule=AUTOSCALER_ENABLE_SCHEDULE | --autoscaler-set-schedule=AUTOSCALER_SET_SCHEDULE]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-psc-auto-connections
          | --psc-auto-connections=[network=NETWORK],[project=PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb instances create

```text
NAME
    gcloud alpha alloydb instances create - creates a new AlloyDB instance
        within a given cluster

SYNOPSIS
    gcloud alpha alloydb instances create INSTANCE --cluster=CLUSTER
        --instance-type=INSTANCE_TYPE --region=REGION
        [--allocated-ip-range-override=ALLOCATED_IP_RANGE_OVERRIDE]
        [--allowed-psc-projects=[ALLOWED_PSC_PROJECTS,...]]
        [--assign-inbound-public-ip=ASSIGN_INBOUND_PUBLIC_IP] [--async]
        [--authorized-external-networks=[AUTHORIZED_NETWORK,...]]
        [--availability-type=AVAILABILITY_TYPE]
        [--connection-pooling-authproxy-pooler-scaling-type=CONNECTION_POOLING_AUTHPROXY_POOLER_SCALING_TYPE]
        [--connection-pooling-client-connection-idle-timeout=CONNECTION_POOLING_CLIENT_CONNECTION_IDLE_TIMEOUT]
        [--connection-pooling-ignore-startup-parameters=[STARTUP_PARAMETERS,
          ...]]
        [--connection-pooling-max-client-connections=CONNECTION_POOLING_MAX_CLIENT_CONNECTIONS]
        [--connection-pooling-max-pool-size=CONNECTION_POOLING_MAX_POOL_SIZE]
        [--connection-pooling-max-prepared-statements=CONNECTION_POOLING_MAX_PREPARED_STATEMENTS]
        [--connection-pooling-min-pool-size=CONNECTION_POOLING_MIN_POOL_SIZE]
        [--connection-pooling-pool-mode=CONNECTION_POOLING_POOL_MODE]
        [--connection-pooling-query-wait-timeout=CONNECTION_POOLING_QUERY_WAIT_TIMEOUT]
        [--connection-pooling-server-idle-timeout=CONNECTION_POOLING_SERVER_IDLE_TIMEOUT]
        [--connection-pooling-server-lifetime=CONNECTION_POOLING_SERVER_LIFETIME]
        [--connection-pooling-stats-users=[STATS_USERS,...]]
        [--cpu-count=CPU_COUNT] [--database-flags=FLAG=VALUE,[FLAG=VALUE,...]]
        [--[no-]enable-connection-pooling]
        [--[no-]enable-psc-auto-connection-policy] [--[no-]enable-psc-auto-dns]
        [--[no-]enable-public-dns]
        [--insights-config-query-plans-per-minute=INSIGHTS_CONFIG_QUERY_PLANS_PER_MINUTE]
        [--insights-config-query-string-length=INSIGHTS_CONFIG_QUERY_STRING_LENGTH]
        [--[no-]insights-config-record-application-tags]
        [--[no-]insights-config-record-client-address]
        [--labels=[KEY=VALUE,...]] [--machine-type=MACHINE_TYPE]
        [--[no-]observability-config-assistive-experiences-enabled]
        [--[no-]observability-config-enabled]
        [--observability-config-max-query-string-length=OBSERVABILITY_CONFIG_MAX_QUERY_STRING_LENGTH]
        [--[no-]observability-config-preserve-comments]
        [--observability-config-query-plans-per-minute=OBSERVABILITY_CONFIG_QUERY_PLANS_PER_MINUTE]
        [--[no-]observability-config-record-application-tags]
        [--[no-]observability-config-track-active-queries]
        [--[no-]observability-config-track-active-query-plan]
        [--[no-]observability-config-track-client-address]
        [--observability-config-track-wait-events] [--[no-]outbound-public-ip]
        [--psc-auto-connections=[network=NETWORK],[project=PROJECT]]
        [--psc-network-attachment-uri=PSC_NETWORK_ATTACHMENT_URI]
        [--read-pool-node-count=READ_POOL_NODE_COUNT]
        [--[no-]require-connectors]
        [--ssl-mode=SSL_MODE; default="ENCRYPTED_ONLY"]
        [--autoscaler-cool-down-period-seconds=AUTOSCALER_COOL_DOWN_PERIOD_SECONDS --autoscaler-max-node-count=AUTOSCALER_MAX_NODE_COUNT --autoscaler-schedule-cron-exp=AUTOSCALER_SCHEDULE_CRON_EXP --autoscaler-schedule-description=AUTOSCALER_SCHEDULE_DESCRIPTION --autoscaler-schedule-duration-seconds=AUTOSCALER_SCHEDULE_DURATION_SECONDS --autoscaler-schedule-min-node-count=AUTOSCALER_SCHEDULE_MIN_NODE_COUNT --autoscaler-schedule-time-zone=AUTOSCALER_SCHEDULE_TIME_ZONE --autoscaler-set-schedule=AUTOSCALER_SET_SCHEDULE --autoscaler-target-connections-count=AUTOSCALER_TARGET_CONNECTIONS_COUNT --autoscaler-target-cpu-usage=AUTOSCALER_TARGET_CPU_USAGE --[no-]enable-autoscaler]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb instances create-secondary

```text
NAME
    gcloud alpha alloydb instances create-secondary - creates a new AlloyDB
        SECONDARY instance within a given cluster

SYNOPSIS
    gcloud alpha alloydb instances create-secondary INSTANCE --cluster=CLUSTER
        --region=REGION
        [--allocated-ip-range-override=ALLOCATED_IP_RANGE_OVERRIDE]
        [--allowed-psc-projects=[ALLOWED_PSC_PROJECTS,...]]
        [--assign-inbound-public-ip=ASSIGN_INBOUND_PUBLIC_IP] [--async]
        [--authorized-external-networks=[AUTHORIZED_NETWORK,...]]
        [--availability-type=AVAILABILITY_TYPE]
        [--connection-pooling-authproxy-pooler-scaling-type=CONNECTION_POOLING_AUTHPROXY_POOLER_SCALING_TYPE]
        [--connection-pooling-client-connection-idle-timeout=CONNECTION_POOLING_CLIENT_CONNECTION_IDLE_TIMEOUT]
        [--connection-pooling-ignore-startup-parameters=[STARTUP_PARAMETERS,
          ...]]
        [--connection-pooling-max-client-connections=CONNECTION_POOLING_MAX_CLIENT_CONNECTIONS]
        [--connection-pooling-max-pool-size=CONNECTION_POOLING_MAX_POOL_SIZE]
        [--connection-pooling-max-prepared-statements=CONNECTION_POOLING_MAX_PREPARED_STATEMENTS]
        [--connection-pooling-min-pool-size=CONNECTION_POOLING_MIN_POOL_SIZE]
        [--connection-pooling-pool-mode=CONNECTION_POOLING_POOL_MODE]
        [--connection-pooling-query-wait-timeout=CONNECTION_POOLING_QUERY_WAIT_TIMEOUT]
        [--connection-pooling-server-idle-timeout=CONNECTION_POOLING_SERVER_IDLE_TIMEOUT]
        [--connection-pooling-server-lifetime=CONNECTION_POOLING_SERVER_LIFETIME]
        [--connection-pooling-stats-users=[STATS_USERS,...]]
        [--database-flags=FLAG=VALUE,[FLAG=VALUE,...]]
        [--[no-]enable-connection-pooling]
        [--[no-]enable-psc-auto-connection-policy] [--[no-]enable-psc-auto-dns]
        [--labels=[KEY=VALUE,...]] [--[no-]outbound-public-ip]
        [--psc-auto-connections=[network=NETWORK],[project=PROJECT]]
        [--psc-network-attachment-uri=PSC_NETWORK_ATTACHMENT_URI]
        [--[no-]require-connectors] [--ssl-mode=SSL_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb instances delete

```text
NAME
    gcloud alpha alloydb instances delete - deletes an AlloyDB instance within
        a given cluster

SYNOPSIS
    gcloud alpha alloydb instances delete INSTANCE --cluster=CLUSTER
        --region=REGION [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb instances describe

```text
NAME
    gcloud alpha alloydb instances describe - describes an AlloyDB instance
        within a given cluster

SYNOPSIS
    gcloud alpha alloydb instances describe INSTANCE --cluster=CLUSTER
        --region=REGION [--view=VIEW] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb instances failover

```text
NAME
    gcloud alpha alloydb instances failover - failover an AlloyDB instance
        within a given cluster

SYNOPSIS
    gcloud alpha alloydb instances failover INSTANCE --cluster=CLUSTER
        --region=REGION [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb instances inject-fault

```text
NAME
    gcloud alpha alloydb instances inject-fault - inject fault on an AlloyDB
        instance within a given cluster

SYNOPSIS
    gcloud alpha alloydb instances inject-fault INSTANCE --cluster=CLUSTER
        --fault-type=FAULT_TYPE --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb instances list

```text
NAME
    gcloud alpha alloydb instances list - lists AlloyDB instances in a given
        cluster

SYNOPSIS
    gcloud alpha alloydb instances list [--cluster=CLUSTER --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb instances restart

```text
NAME
    gcloud alpha alloydb instances restart - restarts an AlloyDB instance
        within a given cluster

SYNOPSIS
    gcloud alpha alloydb instances restart INSTANCE --cluster=CLUSTER
        --region=REGION [--async] [--node-ids=[NODE_IDS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb instances update

```text
NAME
    gcloud alpha alloydb instances update - updates an AlloyDB instance within
        a given cluster

SYNOPSIS
    gcloud alpha alloydb instances update INSTANCE --cluster=CLUSTER
        --region=REGION [--activation-policy=ACTIVATION_POLICY]
        [--allowed-psc-projects=[ALLOWED_PSC_PROJECTS,...]]
        [--assign-inbound-public-ip=ASSIGN_INBOUND_PUBLIC_IP] [--async]
        [--authorized-external-networks=[AUTHORIZED_NETWORK,...]]
        [--availability-type=AVAILABILITY_TYPE]
        [--clear-psc-network-attachment-uri]
        [--connection-pooling-authproxy-pooler-scaling-type=CONNECTION_POOLING_AUTHPROXY_POOLER_SCALING_TYPE]
        [--connection-pooling-client-connection-idle-timeout=CONNECTION_POOLING_CLIENT_CONNECTION_IDLE_TIMEOUT]
        [--connection-pooling-ignore-startup-parameters=[STARTUP_PARAMETERS,
          ...]]
        [--connection-pooling-max-client-connections=CONNECTION_POOLING_MAX_CLIENT_CONNECTIONS]
        [--connection-pooling-max-pool-size=CONNECTION_POOLING_MAX_POOL_SIZE]
        [--connection-pooling-max-prepared-statements=CONNECTION_POOLING_MAX_PREPARED_STATEMENTS]
        [--connection-pooling-min-pool-size=CONNECTION_POOLING_MIN_POOL_SIZE]
        [--connection-pooling-pool-mode=CONNECTION_POOLING_POOL_MODE]
        [--connection-pooling-query-wait-timeout=CONNECTION_POOLING_QUERY_WAIT_TIMEOUT]
        [--connection-pooling-server-idle-timeout=CONNECTION_POOLING_SERVER_IDLE_TIMEOUT]
        [--connection-pooling-server-lifetime=CONNECTION_POOLING_SERVER_LIFETIME]
        [--connection-pooling-stats-users=[STATS_USERS,...]]
        [--cpu-count=CPU_COUNT] [--database-flags=FLAG=VALUE,[FLAG=VALUE,...]]
        [--[no-]enable-connection-pooling]
        [--[no-]enable-psc-auto-connection-policy] [--[no-]enable-psc-auto-dns]
        [--[no-]enable-public-dns]
        [--insights-config-query-plans-per-minute=INSIGHTS_CONFIG_QUERY_PLANS_PER_MINUTE]
        [--insights-config-query-string-length=INSIGHTS_CONFIG_QUERY_STRING_LENGTH]
        [--[no-]insights-config-record-application-tags]
        [--[no-]insights-config-record-client-address]
        [--machine-type=MACHINE_TYPE]
        [--[no-]observability-config-assistive-experiences-enabled]
        [--[no-]observability-config-enabled]
        [--observability-config-max-query-string-length=OBSERVABILITY_CONFIG_MAX_QUERY_STRING_LENGTH]
        [--[no-]observability-config-preserve-comments]
        [--observability-config-query-plans-per-minute=OBSERVABILITY_CONFIG_QUERY_PLANS_PER_MINUTE]
        [--[no-]observability-config-record-application-tags]
        [--[no-]observability-config-track-active-queries]
        [--[no-]observability-config-track-active-query-plan]
        [--[no-]observability-config-track-client-address]
        [--observability-config-track-wait-events] [--[no-]outbound-public-ip]
        [--psc-network-attachment-uri=PSC_NETWORK_ATTACHMENT_URI]
        [--read-pool-node-count=READ_POOL_NODE_COUNT]
        [--[no-]require-connectors] [--ssl-mode=SSL_MODE]
        [--update-labels=[KEY=VALUE,...]] [--update-mode=UPDATE_MODE]
        [--autoscaler-cool-down-period-seconds=AUTOSCALER_COOL_DOWN_PERIOD_SECONDS --autoscaler-max-node-count=AUTOSCALER_MAX_NODE_COUNT --autoscaler-schedule-cron-exp=AUTOSCALER_SCHEDULE_CRON_EXP --autoscaler-schedule-description=AUTOSCALER_SCHEDULE_DESCRIPTION --autoscaler-schedule-duration-seconds=AUTOSCALER_SCHEDULE_DURATION_SECONDS --autoscaler-schedule-min-node-count=AUTOSCALER_SCHEDULE_MIN_NODE_COUNT --autoscaler-schedule-time-zone=AUTOSCALER_SCHEDULE_TIME_ZONE --autoscaler-target-connections-count=AUTOSCALER_TARGET_CONNECTIONS_COUNT --autoscaler-target-cpu-usage=AUTOSCALER_TARGET_CPU_USAGE --[no-]enable-autoscaler --autoscaler-delete-schedule=AUTOSCALER_DELETE_SCHEDULE | --autoscaler-disable-schedule=AUTOSCALER_DISABLE_SCHEDULE | --autoscaler-enable-schedule=AUTOSCALER_ENABLE_SCHEDULE | --autoscaler-set-schedule=AUTOSCALER_SET_SCHEDULE]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-psc-auto-connections
          | --psc-auto-connections=[network=NETWORK],[project=PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/instances (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

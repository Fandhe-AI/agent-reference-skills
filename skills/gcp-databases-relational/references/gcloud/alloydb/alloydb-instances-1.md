---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/instances
---

# gcloud alloydb instances (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alloydb instances create

```text
NAME
    gcloud alloydb instances create - creates a new AlloyDB instance within a
        given cluster

SYNOPSIS
    gcloud alloydb instances create INSTANCE --cluster=CLUSTER
        --instance-type=INSTANCE_TYPE --region=REGION
        [--allocated-ip-range-override=ALLOCATED_IP_RANGE_OVERRIDE]
        [--allowed-psc-projects=[ALLOWED_PSC_PROJECTS,...]]
        [--assign-inbound-public-ip=ASSIGN_INBOUND_PUBLIC_IP] [--async]
        [--authorized-external-networks=[AUTHORIZED_NETWORK,...]]
        [--availability-type=AVAILABILITY_TYPE]
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
        [--insights-config-query-plans-per-minute=INSIGHTS_CONFIG_QUERY_PLANS_PER_MINUTE]
        [--insights-config-query-string-length=INSIGHTS_CONFIG_QUERY_STRING_LENGTH]
        [--[no-]insights-config-record-application-tags]
        [--[no-]insights-config-record-client-address]
        [--labels=[KEY=VALUE,...]] [--machine-type=MACHINE_TYPE]
        [--[no-]observability-config-enabled]
        [--observability-config-max-query-string-length=OBSERVABILITY_CONFIG_MAX_QUERY_STRING_LENGTH]
        [--[no-]observability-config-preserve-comments]
        [--observability-config-query-plans-per-minute=OBSERVABILITY_CONFIG_QUERY_PLANS_PER_MINUTE]
        [--[no-]observability-config-record-application-tags]
        [--[no-]observability-config-track-active-queries]
        [--observability-config-track-wait-events] [--[no-]outbound-public-ip]
        [--psc-auto-connections=[network=NETWORK],[project=PROJECT]]
        [--psc-network-attachment-uri=PSC_NETWORK_ATTACHMENT_URI]
        [--read-pool-node-count=READ_POOL_NODE_COUNT]
        [--[no-]require-connectors]
        [--ssl-mode=SSL_MODE; default="ENCRYPTED_ONLY"]
        [--autoscaler-cool-down-period-seconds=AUTOSCALER_COOL_DOWN_PERIOD_SECONDS --autoscaler-max-node-count=AUTOSCALER_MAX_NODE_COUNT --autoscaler-schedule-cron-exp=AUTOSCALER_SCHEDULE_CRON_EXP --autoscaler-schedule-description=AUTOSCALER_SCHEDULE_DESCRIPTION --autoscaler-schedule-duration-seconds=AUTOSCALER_SCHEDULE_DURATION_SECONDS --autoscaler-schedule-min-node-count=AUTOSCALER_SCHEDULE_MIN_NODE_COUNT --autoscaler-schedule-time-zone=AUTOSCALER_SCHEDULE_TIME_ZONE --autoscaler-set-schedule=AUTOSCALER_SET_SCHEDULE --autoscaler-target-connections-count=AUTOSCALER_TARGET_CONNECTIONS_COUNT --autoscaler-target-cpu-usage=AUTOSCALER_TARGET_CPU_USAGE --[no-]enable-autoscaler]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new AlloyDB instance within a given cluster.

EXAMPLES
    To create a new primary instance, run:

        $ gcloud alloydb instances create my-instance --cluster=my-cluster \
            --region=us-central1 --instance-type=PRIMARY --cpu-count=4

    To create a new read pool instance, run:

        $ gcloud alloydb instances create my-instance --cluster=my-cluster \
            --region=us-central1 --instance-type=READ_POOL \
            --read-pool-node-count=1 --cpu-count=4

POSITIONAL ARGUMENTS
     INSTANCE
        AlloyDB instance ID

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --instance-type=INSTANCE_TYPE
        Specifies instance type. INSTANCE_TYPE must be one of:

         PRIMARY
            PRIMARY instances support read and write operations.
         READ_POOL
            READ_POOL instances support read operations only. Each read pool
            instance consists of one or more homogeneous nodes. * Read pool of
            size 1 can only have zonal availability. * Read pools with node
            count of 2 or more can have regional availability (nodes are
            present in 2 or more zones in a region).

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

OPTIONAL FLAGS
     --allocated-ip-range-override=ALLOCATED_IP_RANGE_OVERRIDE
        Name of the allocated IP range for the private IP AlloyDB instance, for
        example: "google-managed-services-default". If set, the instance IPs
        will be created from this allocated range and will override the IP
        range used by the parent cluster. The range name must comply with RFC
        1035. Specifically, the name must be 1-63 characters long and match the
        regular expression [a-z]([-a-z0-9]*[a-z0-9])?.

     --allowed-psc-projects=[ALLOWED_PSC_PROJECTS,...]
        Comma-separated list of allowed consumer projects to create endpoints
        for Private Service Connect (PSC) connectivity for the instance. Only
        instances in PSC-enabled clusters are allowed to set this field.(e.g.,
        --allowed-psc-projects=project1,12345678,project2)

     --assign-inbound-public-ip=ASSIGN_INBOUND_PUBLIC_IP
        Specify to enable or disable public IP on an instance.
        ASSIGN_INBOUND_PUBLIC_IP must be one of:
        * NO_PUBLIC_IP
          + This disables public IP on the instance. Updating an instance to
            disable public IP will clear the list of authorized networks.
        * ASSIGN_IPV4
          + Assign an inbound public IPv4 address for the instance. Public IP
            is enabled.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --authorized-external-networks=[AUTHORIZED_NETWORK,...]
        Comma-separated list of authorized external networks to set on the
        instance. Authorized networks should use CIDR notation (e.g.
        1.2.3.4/30). This flag is only allowed to be set for instances with
        public IP enabled.

     --availability-type=AVAILABILITY_TYPE
        Specifies level of availability. AVAILABILITY_TYPE must be one of:

         REGIONAL
            Provide high availability instances. Recommended for production
            instances; instances automatically fail over to another zone within
            your selected region.
         ZONAL
            Provide zonal availability instances. Not recommended for
            production instances; instance does not automatically fail over to
            another zone.

     --connection-pooling-client-connection-idle-timeout=CONNECTION_POOLING_CLIENT_CONNECTION_IDLE_TIMEOUT
        The maximum number of seconds a client is allowed to be idle before it
        is disconnected.

     --connection-pooling-ignore-startup-parameters=[STARTUP_PARAMETERS,...]
        Comma-separated list of startup parameters that should be ignored by
        the connection pool.

     --connection-pooling-max-client-connections=CONNECTION_POOLING_MAX_CLIENT_CONNECTIONS
        The max client connections for managed connection pooling.

     --connection-pooling-max-pool-size=CONNECTION_POOLING_MAX_POOL_SIZE
        The max pool size for managed connection pooling.

     --connection-pooling-max-prepared-statements=CONNECTION_POOLING_MAX_PREPARED_STATEMENTS
        The maximum number of prepared statements allowed.

     --connection-pooling-min-pool-size=CONNECTION_POOLING_MIN_POOL_SIZE
        The min pool size for managed connection pooling.

     --connection-pooling-pool-mode=CONNECTION_POOLING_POOL_MODE
        The pool mode for managed connection pooling.
        CONNECTION_POOLING_POOL_MODE must be one of:

         SESSION
            Session mode for managed connection pooling.
         TRANSACTION
            Transaction mode for managed connection pooling.

     --connection-pooling-query-wait-timeout=CONNECTION_POOLING_QUERY_WAIT_TIMEOUT
        The query wait timeout for managed connection pooling.

     --connection-pooling-server-idle-timeout=CONNECTION_POOLING_SERVER_IDLE_TIMEOUT
        The server idle timeout for managed connection pooling.

     --connection-pooling-server-lifetime=CONNECTION_POOLING_SERVER_LIFETIME
        The lifetime of a server connection in seconds. The pooler will close
        an unused (not currently linked to any client connection) server
        connection that has been connected longer than this. Setting it to 0
        means the connection is to be used only once, then closed.

     --connection-pooling-stats-users=[STATS_USERS,...]
        Comma-separated list of database users to access connection pooling
        stats.

     --cpu-count=CPU_COUNT
        Whole number value indicating how many vCPUs the machine should
        contain. If the instance does not have a machine-type, the vCPU count
        will be used to determine the machine type where each vCPU corresponds
        to an N2 high-mem machine:
        (https://cloud.google.com/compute/docs/general-purpose-machines#n2_machine_types).
        where CPU_COUNT can be one of: 2, 4, 8, 16, 32, 64, 96, 128. If the
        instance has a machine-type, cpu-count must have the same value as the
        vCPU count in the machine-type. Eg: if machine-type is
        c4a-highmem-4-lssd, cpu-count must be 4. CPU_COUNT must be one of: 1,
        2, 4, 8, 14, 16, 22, 32, 44, 48, 64, 72, 88, 96, 128, 144, 192, 288.

     --database-flags=FLAG=VALUE,[FLAG=VALUE,...]
        Comma-separated list of database flags to set on the instance. Use an
        equals sign to separate flag name and value. Flags without values, like
        skip_grant_tables, can be written out without a value after, e.g.,
        skip_grant_tables=. Use on/off for booleans. View the Instance Resource
        API for allowed flags. (e.g., --database-flags
        max_allowed_packet=55555,skip_grant_tables=,log_output=1)

     --[no-]enable-connection-pooling
        Enable connection pooling for the instance. Use
        --enable-connection-pooling to enable and
        --no-enable-connection-pooling to disable.

     --[no-]enable-psc-auto-connection-policy
        Enable automatic creation of service connection policies (PSC auto
        connection policy) for the Private Service Connect (PSC) auto
        connections of the instance, which are configured with
        --psc-auto-connections. Use --enable-psc-auto-connection-policy to
        enable and --no-enable-psc-auto-connection-policy to disable.

     --[no-]enable-psc-auto-dns
        Enable automatic creation of DNS records (PSC auto DNS) for the Private
        Service Connect (PSC) auto connections of the instance, which are
        configured with --psc-auto-connections. Use --enable-psc-auto-dns to
        enable and --no-enable-psc-auto-dns to disable.

     --insights-config-query-plans-per-minute=INSIGHTS_CONFIG_QUERY_PLANS_PER_MINUTE
        Number of query plans to sample every minute. Default value is 5.
        Allowed range: 0 to 20.

     --insights-config-query-string-length=INSIGHTS_CONFIG_QUERY_STRING_LENGTH
        Query string length in bytes to be stored by the query insights
        feature. Default length is 1024 bytes. Allowed range: 256 to 4500
        bytes.

     --[no-]insights-config-record-application-tags
        Allow application tags to be recorded by the query insights feature.

        Use --insights-config-record-application-tags to enable and
        --no-insights-config-record-application-tags to disable.

     --[no-]insights-config-record-client-address
        Allow the client address to be recorded by the query insights feature.

        Use --insights-config-record-client-address to enable and
        --no-insights-config-record-client-address to disable.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --machine-type=MACHINE_TYPE
        Specifies machine type for the instance. MACHINE_TYPE must be one of:
        n2-highmem-2, n2-highmem-4, n2-highmem-8, n2-highmem-16, n2-highmem-32,
        n2-highmem-64, n2-highmem-96, n2-highmem-128, c4a-highmem-1,
        c4a-highmem-2-lssd, c4a-highmem-4-lssd, c4a-highmem-8-lssd,
        c4a-highmem-16-lssd, c4a-highmem-32-lssd, c4a-highmem-48-lssd,
        c4a-highmem-64-lssd, c4a-highmem-72-lssd, c4-highmem-4-lssd,
        c4-highmem-8-lssd, c4-highmem-16-lssd, c4-highmem-24-lssd,
        c4-highmem-32-lssd, c4-highmem-48-lssd, c4-highmem-96-lssd,
        c4-highmem-144-lssd, c4-highmem-192-lssd, c4-highmem-288-lssd,
        z3-highmem-14-standardlssd, z3-highmem-22-standardlssd,
        z3-highmem-44-standardlssd, z3-highmem-88-standardlssd,
        z3-highmem-8-highlssd, z3-highmem-16-highlssd, z3-highmem-22-highlssd,
        z3-highmem-32-highlssd, z3-highmem-44-highlssd.

     --[no-]observability-config-enabled
        Enable enhanced query insights feature. Use
        --observability-config-enabled to enable and
        --no-observability-config-enabled to disable.

     --observability-config-max-query-string-length=OBSERVABILITY_CONFIG_MAX_QUERY_STRING_LENGTH
        Query string length in bytes to be stored by the enhanced query
        insights feature. Default length is 10k bytes.

     --[no-]observability-config-preserve-comments
        Allow preservation of comments in query string recorded by the enhanced
        query insights feature.

        Use --observability-config-preserve-comments to enable and
        --no-observability-config-preserve-comments to disable.

     --observability-config-query-plans-per-minute=OBSERVABILITY_CONFIG_QUERY_PLANS_PER_MINUTE
        Number of query plans to sample every minute. Default value is 20.
        Allowed range: 0 to 200.

     --[no-]observability-config-record-application-tags
        Allow application tags to be recorded by the enhanced query insights
        feature.

        Use --observability-config-record-application-tags to enable and
        --no-observability-config-record-application-tags to disable.

     --[no-]observability-config-track-active-queries
        Track actively running queries. Use
        --observability-config-track-active-queries to enable and
        --no-observability-config-track-active-queries to disable.

     --observability-config-track-wait-events
        Track wait events during query execution.

     --[no-]outbound-public-ip
        Add outbound Public IP connectivity to an AlloyDB instance. Use
        --outbound-public-ip to enable and --no-outbound-public-ip to disable.

     --psc-auto-connections=[network=NETWORK],[project=PROJECT]
        Comma-separated list of consumer project and consumer network pairs to
        create endpoints for Private Service Connect (PSC) connectivity for the
        instance. Only instances in PSC-enabled clusters are allowed to set
        this field. Both project and network must be specified. (e.g.,
        --psc-auto-connections=project=project1,network=projects/vpc-host-project1/global/networks/network1
        --psc-auto-connections=project=project2,network=projects/vpc-host-project2/global/networks/network2).
        Sets psc_auto_connections value.

         network
            Required, sets network value.

         project
            Required, sets project value.

        Shorthand Example:

            --psc-auto-connections=network=string,project=string

        JSON Example:

            --psc-auto-connections='{"network": "string", "project": "string"}'

        File Example:

            --psc-auto-connections=path_to_file.(yaml|json)

     --psc-network-attachment-uri=PSC_NETWORK_ATTACHMENT_URI
        Full URI of the network attachment that is configured to support
        outbound connectivity from an AlloyDB instance which uses Private
        Service Connect (PSC). For example, this would be of the
        form:psc-network-attachment-uri=projects/test-project/regions/us-central1/networkAttachments/my-na

     --read-pool-node-count=READ_POOL_NODE_COUNT
        Read capacity, i.e. number of nodes in a read pool instance.

     --[no-]require-connectors
        Enable or disable enforcing connectors only (ex: AuthProxy) connections
        to the database. Use --require-connectors to enable and
        --no-require-connectors to disable.

     --ssl-mode=SSL_MODE; default="ENCRYPTED_ONLY"
        Specify the SSL mode to use when the instance connects to the database.
        Default SSL mode is ENCRYPTED_ONLY. SSL_MODE must be one of:

         ALLOW_UNENCRYPTED_AND_ENCRYPTED
            SSL connections are optional. CA verification is not enforced.
         ENCRYPTED_ONLY
            SSL connections are required. CA verification is not enforced.

     Autoscaler flags.

     --autoscaler-cool-down-period-seconds=AUTOSCALER_COOL_DOWN_PERIOD_SECONDS
        Cool down period in seconds for the autoscaler.

     --autoscaler-max-node-count=AUTOSCALER_MAX_NODE_COUNT
        Maximum node count for the autoscaler.

     --autoscaler-schedule-cron-exp=AUTOSCALER_SCHEDULE_CRON_EXP
        Cron expression for the autoscaler schedule.

     --autoscaler-schedule-description=AUTOSCALER_SCHEDULE_DESCRIPTION
        Description for the autoscaler schedule.

     --autoscaler-schedule-duration-seconds=AUTOSCALER_SCHEDULE_DURATION_SECONDS
        Duration for which the autoscaler schedule is active in seconds.

     --autoscaler-schedule-min-node-count=AUTOSCALER_SCHEDULE_MIN_NODE_COUNT
        Minimum node count for the autoscaler schedule.

     --autoscaler-schedule-time-zone=AUTOSCALER_SCHEDULE_TIME_ZONE
        Time zone for the autoscaler schedule.

     --autoscaler-set-schedule=AUTOSCALER_SET_SCHEDULE
        The name of the schedule to create for the autoscaler.

     --autoscaler-target-connections-count=AUTOSCALER_TARGET_CONNECTIONS_COUNT
        Target connections count for the autoscaler.

     --autoscaler-target-cpu-usage=AUTOSCALER_TARGET_CPU_USAGE
        Target CPU usage for the autoscaler.

     --[no-]enable-autoscaler
        Enable autoscaler for the instance. Use --enable-autoscaler to enable
        and --no-enable-autoscaler to disable.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb instances create

        $ gcloud beta alloydb instances create
```

### gcloud alloydb instances create-secondary

```text
NAME
    gcloud alloydb instances create-secondary - creates a new AlloyDB SECONDARY
        instance within a given cluster

SYNOPSIS
    gcloud alloydb instances create-secondary INSTANCE --cluster=CLUSTER
        --region=REGION
        [--allocated-ip-range-override=ALLOCATED_IP_RANGE_OVERRIDE]
        [--allowed-psc-projects=[ALLOWED_PSC_PROJECTS,...]]
        [--assign-inbound-public-ip=ASSIGN_INBOUND_PUBLIC_IP] [--async]
        [--authorized-external-networks=[AUTHORIZED_NETWORK,...]]
        [--availability-type=AVAILABILITY_TYPE]
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

DESCRIPTION
    Creates a new AlloyDB SECONDARY instance within a given cluster.

EXAMPLES
    To create a new secondary instance, run:

        $ gcloud alloydb instances create-secondary my-instance \
            --cluster=my-cluster --region=us-central1

POSITIONAL ARGUMENTS
     INSTANCE
        AlloyDB instance ID

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

OPTIONAL FLAGS
     --allocated-ip-range-override=ALLOCATED_IP_RANGE_OVERRIDE
        Name of the allocated IP range for the private IP AlloyDB instance, for
        example: "google-managed-services-default". If set, the instance IPs
        will be created from this allocated range and will override the IP
        range used by the parent cluster. The range name must comply with RFC
        1035. Specifically, the name must be 1-63 characters long and match the
        regular expression [a-z]([-a-z0-9]*[a-z0-9])?.

     --allowed-psc-projects=[ALLOWED_PSC_PROJECTS,...]
        Comma-separated list of allowed consumer projects to create endpoints
        for Private Service Connect (PSC) connectivity for the instance. Only
        instances in PSC-enabled clusters are allowed to set this field.(e.g.,
        --allowed-psc-projects=project1,12345678,project2)

     --assign-inbound-public-ip=ASSIGN_INBOUND_PUBLIC_IP
        Specify to enable or disable public IP on an instance.
        ASSIGN_INBOUND_PUBLIC_IP must be one of:
        * NO_PUBLIC_IP
          + This disables public IP on the instance. Updating an instance to
            disable public IP will clear the list of authorized networks.
        * ASSIGN_IPV4
          + Assign an inbound public IPv4 address for the instance. Public IP
            is enabled.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --authorized-external-networks=[AUTHORIZED_NETWORK,...]
        Comma-separated list of authorized external networks to set on the
        instance. Authorized networks should use CIDR notation (e.g.
        1.2.3.4/30). This flag is only allowed to be set for instances with
        public IP enabled.

     --availability-type=AVAILABILITY_TYPE
        Specifies level of availability. AVAILABILITY_TYPE must be one of:

         REGIONAL
            Provide high availability instances. Recommended for production
            instances; instances automatically fail over to another zone within
            your selected region.
         ZONAL
            Provide zonal availability instances. Not recommended for
            production instances; instance does not automatically fail over to
            another zone.

     --connection-pooling-client-connection-idle-timeout=CONNECTION_POOLING_CLIENT_CONNECTION_IDLE_TIMEOUT
        The maximum number of seconds a client is allowed to be idle before it
        is disconnected.

     --connection-pooling-ignore-startup-parameters=[STARTUP_PARAMETERS,...]
        Comma-separated list of startup parameters that should be ignored by
        the connection pool.

     --connection-pooling-max-client-connections=CONNECTION_POOLING_MAX_CLIENT_CONNECTIONS
        The max client connections for managed connection pooling.

     --connection-pooling-max-pool-size=CONNECTION_POOLING_MAX_POOL_SIZE
        The max pool size for managed connection pooling.

     --connection-pooling-max-prepared-statements=CONNECTION_POOLING_MAX_PREPARED_STATEMENTS
        The maximum number of prepared statements allowed.

     --connection-pooling-min-pool-size=CONNECTION_POOLING_MIN_POOL_SIZE
        The min pool size for managed connection pooling.

     --connection-pooling-pool-mode=CONNECTION_POOLING_POOL_MODE
        The pool mode for managed connection pooling.
        CONNECTION_POOLING_POOL_MODE must be one of:

         SESSION
            Session mode for managed connection pooling.
         TRANSACTION
            Transaction mode for managed connection pooling.

     --connection-pooling-query-wait-timeout=CONNECTION_POOLING_QUERY_WAIT_TIMEOUT
        The query wait timeout for managed connection pooling.

     --connection-pooling-server-idle-timeout=CONNECTION_POOLING_SERVER_IDLE_TIMEOUT
        The server idle timeout for managed connection pooling.

     --connection-pooling-server-lifetime=CONNECTION_POOLING_SERVER_LIFETIME
        The lifetime of a server connection in seconds. The pooler will close
        an unused (not currently linked to any client connection) server
        connection that has been connected longer than this. Setting it to 0
        means the connection is to be used only once, then closed.

     --connection-pooling-stats-users=[STATS_USERS,...]
        Comma-separated list of database users to access connection pooling
        stats.

     --database-flags=FLAG=VALUE,[FLAG=VALUE,...]
        Comma-separated list of database flags to set on the instance. Use an
        equals sign to separate flag name and value. Flags without values, like
        skip_grant_tables, can be written out without a value after, e.g.,
        skip_grant_tables=. Use on/off for booleans. View the Instance Resource
        API for allowed flags. (e.g., --database-flags
        max_allowed_packet=55555,skip_grant_tables=,log_output=1)

     --[no-]enable-connection-pooling
        Enable connection pooling for the instance. Use
        --enable-connection-pooling to enable and
        --no-enable-connection-pooling to disable.

     --[no-]enable-psc-auto-connection-policy
        Enable automatic creation of service connection policies (PSC auto
        connection policy) for the Private Service Connect (PSC) auto
        connections of the instance, which are configured with
        --psc-auto-connections. Use --enable-psc-auto-connection-policy to
        enable and --no-enable-psc-auto-connection-policy to disable.

     --[no-]enable-psc-auto-dns
        Enable automatic creation of DNS records (PSC auto DNS) for the Private
        Service Connect (PSC) auto connections of the instance, which are
        configured with --psc-auto-connections. Use --enable-psc-auto-dns to
        enable and --no-enable-psc-auto-dns to disable.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --[no-]outbound-public-ip
        Add outbound Public IP connectivity to an AlloyDB instance. Use
        --outbound-public-ip to enable and --no-outbound-public-ip to disable.

     --psc-auto-connections=[network=NETWORK],[project=PROJECT]
        Comma-separated list of consumer project and consumer network pairs to
        create endpoints for Private Service Connect (PSC) connectivity for the
        instance. Only instances in PSC-enabled clusters are allowed to set
        this field. Both project and network must be specified. (e.g.,
        --psc-auto-connections=project=project1,network=projects/vpc-host-project1/global/networks/network1
        --psc-auto-connections=project=project2,network=projects/vpc-host-project2/global/networks/network2).
        Sets psc_auto_connections value.

         network
            Required, sets network value.

         project
            Required, sets project value.

        Shorthand Example:

            --psc-auto-connections=network=string,project=string

        JSON Example:

            --psc-auto-connections='{"network": "string", "project": "string"}'

        File Example:

            --psc-auto-connections=path_to_file.(yaml|json)

     --psc-network-attachment-uri=PSC_NETWORK_ATTACHMENT_URI
        Full URI of the network attachment that is configured to support
        outbound connectivity from an AlloyDB instance which uses Private
        Service Connect (PSC). For example, this would be of the
        form:psc-network-attachment-uri=projects/test-project/regions/us-central1/networkAttachments/my-na

     --[no-]require-connectors
        Enable or disable enforcing connectors only (ex: AuthProxy) connections
        to the database. Use --require-connectors to enable and
        --no-require-connectors to disable.

     --ssl-mode=SSL_MODE
        Specify the SSL mode to use when the instance connects to the database.
        Default SSL mode will match what is set on the primary instance.
        SSL_MODE must be one of:

         ALLOW_UNENCRYPTED_AND_ENCRYPTED
            SSL connections are optional. CA verification is not enforced.
         ENCRYPTED_ONLY
            SSL connections are required. CA verification is not enforced.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb instances create-secondary

        $ gcloud beta alloydb instances create-secondary
```

### gcloud alloydb instances delete

```text
NAME
    gcloud alloydb instances delete - deletes an AlloyDB instance within a
        given cluster

SYNOPSIS
    gcloud alloydb instances delete INSTANCE --cluster=CLUSTER --region=REGION
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes an AlloyDB instance within a given cluster.

EXAMPLES
    To delete an instance, run:

        $ gcloud alloydb instances delete my-instance --cluster=my-cluster \
            --region=us-central1

POSITIONAL ARGUMENTS
     INSTANCE
        AlloyDB instance ID

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb instances delete

        $ gcloud beta alloydb instances delete
```

### gcloud alloydb instances describe

```text
NAME
    gcloud alloydb instances describe - describes an AlloyDB instance within a
        given cluster

SYNOPSIS
    gcloud alloydb instances describe INSTANCE --cluster=CLUSTER
        --region=REGION [--view=VIEW] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes an AlloyDB instance within a given cluster.

EXAMPLES
    To describe an instance, run:

        $ gcloud alloydb instances describe my-instance \
            --cluster=my-cluster --region=us-central1 --view=BASIC/FULL

POSITIONAL ARGUMENTS
     INSTANCE
        AlloyDB instance ID

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

OPTIONAL FLAGS
     --view=VIEW
        View of the instance to return. VIEW must be one of: basic, full.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb instances describe

        $ gcloud beta alloydb instances describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud alloydb instances describe my-instance \
    --cluster=my-cluster \
    --region=us-central1 \
    --view=basic
```

### gcloud alloydb instances failover

```text
NAME
    gcloud alloydb instances failover - failover an AlloyDB instance within a
        given cluster

SYNOPSIS
    gcloud alloydb instances failover INSTANCE --cluster=CLUSTER
        --region=REGION [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Failover an AlloyDB instance within a given cluster.

EXAMPLES
    To failover an instance, run:

        $ gcloud alloydb instances failover my-instance \
            --cluster=my-cluster --region=us-central1

POSITIONAL ARGUMENTS
     INSTANCE
        AlloyDB instance ID

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb instances failover

        $ gcloud beta alloydb instances failover
```

### gcloud alloydb instances inject-fault

```text
NAME
    gcloud alloydb instances inject-fault - inject fault on an AlloyDB instance
        within a given cluster

SYNOPSIS
    gcloud alloydb instances inject-fault INSTANCE --cluster=CLUSTER
        --fault-type=FAULT_TYPE --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Inject fault on an AlloyDB instance within a given cluster.

EXAMPLES
    To Inject fault on an instance, run:

        $ gcloud alloydb instances inject-fault my-instance \
            --cluster=my-cluster --region=us-central1 --fault-type=stop-vm

POSITIONAL ARGUMENTS
     INSTANCE
        AlloyDB instance ID

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --fault-type=FAULT_TYPE
        Specifies fault type. FAULT_TYPE must be (only one value is supported):

         stop-vm
            stop-vm fault type supports stopping the VM.

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb instances inject-fault

        $ gcloud beta alloydb instances inject-fault
```

### gcloud alloydb instances list

```text
NAME
    gcloud alloydb instances list - lists AlloyDB instances in a given cluster

SYNOPSIS
    gcloud alloydb instances list [--cluster=CLUSTER --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists AlloyDB instances in a given cluster.

EXAMPLES
    To list instances, run:

        $ gcloud alloydb instances list --cluster=my-cluster \
            --region=us-central1

FLAGS
     Cluster

     --cluster=CLUSTER
        AlloyDB cluster ID

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --region=REGION
        Regional location (e.g. asia-east1, us-east1) of CLUSTER. See the full
        list of regions at
        https://cloud.google.com/sql/docs/instance-locations. Default: list
        clusters in all regions.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb instances list

        $ gcloud beta alloydb instances list
```

### gcloud alloydb instances restart

```text
NAME
    gcloud alloydb instances restart - restarts an AlloyDB instance within a
        given cluster

SYNOPSIS
    gcloud alloydb instances restart INSTANCE --cluster=CLUSTER --region=REGION
        [--async] [--node-ids=[NODE_IDS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Restarts an AlloyDB instance within a given cluster.

EXAMPLES
    To restart an instance, run:

        $ gcloud alloydb instances restart my-instance \
            --cluster=my-cluster --region=us-central1

POSITIONAL ARGUMENTS
     INSTANCE
        AlloyDB instance ID

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --node-ids=[NODE_IDS,...]
        Comma-separated list of node IDs. Only supported for read pool
        instances. (e.g., --node-ids=node-1,node-2,node-3)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb instances restart

        $ gcloud beta alloydb instances restart
```

### gcloud alloydb instances update

```text
NAME
    gcloud alloydb instances update - updates an AlloyDB instance within a
        given cluster

SYNOPSIS
    gcloud alloydb instances update INSTANCE --cluster=CLUSTER --region=REGION
        [--activation-policy=ACTIVATION_POLICY]
        [--allowed-psc-projects=[ALLOWED_PSC_PROJECTS,...]]
        [--assign-inbound-public-ip=ASSIGN_INBOUND_PUBLIC_IP] [--async]
        [--authorized-external-networks=[AUTHORIZED_NETWORK,...]]
        [--availability-type=AVAILABILITY_TYPE]
        [--clear-psc-network-attachment-uri]
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
        [--insights-config-query-plans-per-minute=INSIGHTS_CONFIG_QUERY_PLANS_PER_MINUTE]
        [--insights-config-query-string-length=INSIGHTS_CONFIG_QUERY_STRING_LENGTH]
        [--[no-]insights-config-record-application-tags]
        [--[no-]insights-config-record-client-address]
        [--machine-type=MACHINE_TYPE] [--[no-]observability-config-enabled]
        [--observability-config-max-query-string-length=OBSERVABILITY_CONFIG_MAX_QUERY_STRING_LENGTH]
        [--[no-]observability-config-preserve-comments]
        [--observability-config-query-plans-per-minute=OBSERVABILITY_CONFIG_QUERY_PLANS_PER_MINUTE]
        [--[no-]observability-config-record-application-tags]
        [--[no-]observability-config-track-active-queries]
        [--observability-config-track-wait-events] [--[no-]outbound-public-ip]
        [--psc-network-attachment-uri=PSC_NETWORK_ATTACHMENT_URI]
        [--read-pool-node-count=READ_POOL_NODE_COUNT]
        [--[no-]require-connectors] [--ssl-mode=SSL_MODE]
        [--update-labels=[KEY=VALUE,...]]
        [--autoscaler-cool-down-period-seconds=AUTOSCALER_COOL_DOWN_PERIOD_SECONDS --autoscaler-max-node-count=AUTOSCALER_MAX_NODE_COUNT --autoscaler-schedule-cron-exp=AUTOSCALER_SCHEDULE_CRON_EXP --autoscaler-schedule-description=AUTOSCALER_SCHEDULE_DESCRIPTION --autoscaler-schedule-duration-seconds=AUTOSCALER_SCHEDULE_DURATION_SECONDS --autoscaler-schedule-min-node-count=AUTOSCALER_SCHEDULE_MIN_NODE_COUNT --autoscaler-schedule-time-zone=AUTOSCALER_SCHEDULE_TIME_ZONE --autoscaler-target-connections-count=AUTOSCALER_TARGET_CONNECTIONS_COUNT --autoscaler-target-cpu-usage=AUTOSCALER_TARGET_CPU_USAGE --[no-]enable-autoscaler --autoscaler-delete-schedule=AUTOSCALER_DELETE_SCHEDULE | --autoscaler-disable-schedule=AUTOSCALER_DISABLE_SCHEDULE | --autoscaler-enable-schedule=AUTOSCALER_ENABLE_SCHEDULE | --autoscaler-set-schedule=AUTOSCALER_SET_SCHEDULE]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-psc-auto-connections
          | --psc-auto-connections=[network=NETWORK],[project=PROJECT]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates an AlloyDB instance within a given cluster.

EXAMPLES
    To update the number of nodes in the read pool, run:

        $ gcloud alloydb instances update my-read-instance \
            --cluster=my-cluster --region=us-central1 \
            --read-pool-node-count=3

POSITIONAL ARGUMENTS
     INSTANCE
        AlloyDB instance ID

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

OPTIONAL FLAGS
     --activation-policy=ACTIVATION_POLICY
        Activation Policy for the instance. Required to START or STOP an
        instance. ALWAYS - The instance is up and running. NEVER - The instance
        is stopped. ACTIVATION_POLICY must be one of: ALWAYS, NEVER.

     --allowed-psc-projects=[ALLOWED_PSC_PROJECTS,...]
        Comma-separated list of allowed consumer projects to create endpoints
        for Private Service Connect (PSC) connectivity for the instance. Only
        instances in PSC-enabled clusters are allowed to set this field.(e.g.,
        --allowed-psc-projects=project1,12345678,project2)

     --assign-inbound-public-ip=ASSIGN_INBOUND_PUBLIC_IP
        Specify to enable or disable public IP on an instance.
        ASSIGN_INBOUND_PUBLIC_IP must be one of:
        * NO_PUBLIC_IP
          + This disables public IP on the instance. Updating an instance to
            disable public IP will clear the list of authorized networks.
        * ASSIGN_IPV4
          + Assign an inbound public IPv4 address for the instance. Public IP
            is enabled.

     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --authorized-external-networks=[AUTHORIZED_NETWORK,...]
        Comma-separated list of authorized external networks to set on the
        instance. Authorized networks should use CIDR notation (e.g.
        1.2.3.4/30). This flag is only allowed to be set for instances with
        public IP enabled.

     --availability-type=AVAILABILITY_TYPE
        Specifies level of availability. AVAILABILITY_TYPE must be one of:

         REGIONAL
            Provide high availability instances. Recommended for production
            instances; instances automatically fail over to another zone within
            your selected region.
         ZONAL
            Provide zonal availability instances. Not recommended for
            production instances; instance does not automatically fail over to
            another zone.

     --clear-psc-network-attachment-uri
        Disable outbound connectivity from an AlloyDB instance which uses
        Private Service Connect (PSC).

     --connection-pooling-client-connection-idle-timeout=CONNECTION_POOLING_CLIENT_CONNECTION_IDLE_TIMEOUT
        The maximum number of seconds a client is allowed to be idle before it
        is disconnected.

     --connection-pooling-ignore-startup-parameters=[STARTUP_PARAMETERS,...]
        Comma-separated list of startup parameters that should be ignored by
        the connection pool.

     --connection-pooling-max-client-connections=CONNECTION_POOLING_MAX_CLIENT_CONNECTIONS
        The max client connections for managed connection pooling.

     --connection-pooling-max-pool-size=CONNECTION_POOLING_MAX_POOL_SIZE
        The max pool size for managed connection pooling.

     --connection-pooling-max-prepared-statements=CONNECTION_POOLING_MAX_PREPARED_STATEMENTS
        The maximum number of prepared statements allowed.

     --connection-pooling-min-pool-size=CONNECTION_POOLING_MIN_POOL_SIZE
        The min pool size for managed connection pooling.

     --connection-pooling-pool-mode=CONNECTION_POOLING_POOL_MODE
        The pool mode for managed connection pooling.
        CONNECTION_POOLING_POOL_MODE must be one of:

         SESSION
            Session mode for managed connection pooling.
         TRANSACTION
            Transaction mode for managed connection pooling.

     --connection-pooling-query-wait-timeout=CONNECTION_POOLING_QUERY_WAIT_TIMEOUT
        The query wait timeout for managed connection pooling.

     --connection-pooling-server-idle-timeout=CONNECTION_POOLING_SERVER_IDLE_TIMEOUT
        The server idle timeout for managed connection pooling.

     --connection-pooling-server-lifetime=CONNECTION_POOLING_SERVER_LIFETIME
        The lifetime of a server connection in seconds. The pooler will close
        an unused (not currently linked to any client connection) server
        connection that has been connected longer than this. Setting it to 0
        means the connection is to be used only once, then closed.

     --connection-pooling-stats-users=[STATS_USERS,...]
        Comma-separated list of database users to access connection pooling
        stats.

     --cpu-count=CPU_COUNT
        Whole number value indicating how many vCPUs the machine should
        contain. If the instance does not have a machine-type, the vCPU count
        will be used to determine the machine type where each vCPU corresponds
        to an N2 high-mem machine:
        (https://cloud.google.com/compute/docs/general-purpose-machines#n2_machine_types).
        where CPU_COUNT can be one of: 2, 4, 8, 16, 32, 64, 96, 128. If the
        instance has a machine-type, cpu-count must have the same value as the
        vCPU count in the machine-type. Eg: if machine-type is
        c4a-highmem-4-lssd, cpu-count must be 4. CPU_COUNT must be one of: 1,
        2, 4, 8, 14, 16, 22, 32, 44, 48, 64, 72, 88, 96, 128, 144, 192, 288.

     --database-flags=FLAG=VALUE,[FLAG=VALUE,...]
        Comma-separated list of database flags to set on the instance. Use an
        equals sign to separate flag name and value. Flags without values, like
        skip_grant_tables, can be written out without a value after, e.g.,
        skip_grant_tables=. Use on/off for booleans. View the Instance Resource
        API for allowed flags. (e.g., --database-flags
        max_allowed_packet=55555,skip_grant_tables=,log_output=1)

     --[no-]enable-connection-pooling
        Enable connection pooling for the instance. Use
        --enable-connection-pooling to enable and
        --no-enable-connection-pooling to disable.

     --[no-]enable-psc-auto-connection-policy
        Enable automatic creation of service connection policies (PSC auto
        connection policy) for the Private Service Connect (PSC) auto
        connections of the instance, which are configured with
        --psc-auto-connections. Use --enable-psc-auto-connection-policy to
        enable and --no-enable-psc-auto-connection-policy to disable.

     --[no-]enable-psc-auto-dns
        Enable automatic creation of DNS records (PSC auto DNS) for the Private
        Service Connect (PSC) auto connections of the instance, which are
        configured with --psc-auto-connections. Use --enable-psc-auto-dns to
        enable and --no-enable-psc-auto-dns to disable.

     --insights-config-query-plans-per-minute=INSIGHTS_CONFIG_QUERY_PLANS_PER_MINUTE
        Number of query plans to sample every minute. Default value is 5.
        Allowed range: 0 to 20.

     --insights-config-query-string-length=INSIGHTS_CONFIG_QUERY_STRING_LENGTH
        Query string length in bytes to be stored by the query insights
        feature. Default length is 1024 bytes. Allowed range: 256 to 4500
        bytes.

     --[no-]insights-config-record-application-tags
        Allow application tags to be recorded by the query insights feature.

        Use --insights-config-record-application-tags to enable and
        --no-insights-config-record-application-tags to disable.

     --[no-]insights-config-record-client-address
        Allow the client address to be recorded by the query insights feature.

        Use --insights-config-record-client-address to enable and
        --no-insights-config-record-client-address to disable.

     --machine-type=MACHINE_TYPE
        Specifies machine type for the instance. MACHINE_TYPE must be one of:
        n2-highmem-2, n2-highmem-4, n2-highmem-8, n2-highmem-16, n2-highmem-32,
        n2-highmem-64, n2-highmem-96, n2-highmem-128, c4a-highmem-1,
        c4a-highmem-2-lssd, c4a-highmem-4-lssd, c4a-highmem-8-lssd,
        c4a-highmem-16-lssd, c4a-highmem-32-lssd, c4a-highmem-48-lssd,
        c4a-highmem-64-lssd, c4a-highmem-72-lssd, c4-highmem-4-lssd,
        c4-highmem-8-lssd, c4-highmem-16-lssd, c4-highmem-24-lssd,
        c4-highmem-32-lssd, c4-highmem-48-lssd, c4-highmem-96-lssd,
        c4-highmem-144-lssd, c4-highmem-192-lssd, c4-highmem-288-lssd,
        z3-highmem-14-standardlssd, z3-highmem-22-standardlssd,
        z3-highmem-44-standardlssd, z3-highmem-88-standardlssd,
        z3-highmem-8-highlssd, z3-highmem-16-highlssd, z3-highmem-22-highlssd,
        z3-highmem-32-highlssd, z3-highmem-44-highlssd.

     --[no-]observability-config-enabled
        Enable enhanced query insights feature. Use
        --observability-config-enabled to enable and
        --no-observability-config-enabled to disable.

     --observability-config-max-query-string-length=OBSERVABILITY_CONFIG_MAX_QUERY_STRING_LENGTH
        Query string length in bytes to be stored by the enhanced query
        insights feature. Default length is 10k bytes.

     --[no-]observability-config-preserve-comments
        Allow preservation of comments in query string recorded by the enhanced
        query insights feature.

        Use --observability-config-preserve-comments to enable and
        --no-observability-config-preserve-comments to disable.

     --observability-config-query-plans-per-minute=OBSERVABILITY_CONFIG_QUERY_PLANS_PER_MINUTE
        Number of query plans to sample every minute. Default value is 20.
        Allowed range: 0 to 200.

     --[no-]observability-config-record-application-tags
        Allow application tags to be recorded by the enhanced query insights
        feature.

        Use --observability-config-record-application-tags to enable and
        --no-observability-config-record-application-tags to disable.

     --[no-]observability-config-track-active-queries
        Track actively running queries. Use
        --observability-config-track-active-queries to enable and
        --no-observability-config-track-active-queries to disable.

     --observability-config-track-wait-events
        Track wait events during query execution.

     --[no-]outbound-public-ip
        Add outbound Public IP connectivity to an AlloyDB instance. Use
        --outbound-public-ip to enable and --no-outbound-public-ip to disable.

     --psc-network-attachment-uri=PSC_NETWORK_ATTACHMENT_URI
        Full URI of the network attachment that is configured to support
        outbound connectivity from an AlloyDB instance which uses Private
        Service Connect (PSC). For example, this would be of the
        form:psc-network-attachment-uri=projects/test-project/regions/us-central1/networkAttachments/my-na

     --read-pool-node-count=READ_POOL_NODE_COUNT
        Read capacity, i.e. number of nodes in a read pool instance.

     --[no-]require-connectors
        Enable or disable enforcing connectors only (ex: AuthProxy) connections
        to the database. Use --require-connectors to enable and
        --no-require-connectors to disable.

     --ssl-mode=SSL_MODE
        Specify the SSL mode to use when the instance connects to the database.
        SSL_MODE must be one of:

         ALLOW_UNENCRYPTED_AND_ENCRYPTED
            SSL connections are optional. CA verification is not enforced.
         ENCRYPTED_ONLY
            SSL connections are required. CA verification is not enforced.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     Autoscaler flags.

     --autoscaler-cool-down-period-seconds=AUTOSCALER_COOL_DOWN_PERIOD_SECONDS
        Cool down period in seconds for the autoscaler.

     --autoscaler-max-node-count=AUTOSCALER_MAX_NODE_COUNT
        Maximum node count for the autoscaler.

     --autoscaler-schedule-cron-exp=AUTOSCALER_SCHEDULE_CRON_EXP
        Cron expression for the autoscaler schedule.

     --autoscaler-schedule-description=AUTOSCALER_SCHEDULE_DESCRIPTION
        Description for the autoscaler schedule.

     --autoscaler-schedule-duration-seconds=AUTOSCALER_SCHEDULE_DURATION_SECONDS
        Duration for which the autoscaler schedule is active in seconds.

     --autoscaler-schedule-min-node-count=AUTOSCALER_SCHEDULE_MIN_NODE_COUNT
        Minimum node count for the autoscaler schedule.

     --autoscaler-schedule-time-zone=AUTOSCALER_SCHEDULE_TIME_ZONE
        Time zone for the autoscaler schedule.

     --autoscaler-target-connections-count=AUTOSCALER_TARGET_CONNECTIONS_COUNT
        Target connections count for the autoscaler.

     --autoscaler-target-cpu-usage=AUTOSCALER_TARGET_CPU_USAGE
        Target CPU usage for the autoscaler.

     --[no-]enable-autoscaler
        Enable autoscaler for the instance. Use --enable-autoscaler to enable
        and --no-enable-autoscaler to disable.

     Autoscaler schedule flags.

     At most one of these can be specified:

       --autoscaler-delete-schedule=AUTOSCALER_DELETE_SCHEDULE
          The name of the schedule to delete for the autoscaler.

       --autoscaler-disable-schedule=AUTOSCALER_DISABLE_SCHEDULE
          The name of the schedule to disable for the autoscaler.

       --autoscaler-enable-schedule=AUTOSCALER_ENABLE_SCHEDULE
          The name of the schedule to enable for the autoscaler.

       --autoscaler-set-schedule=AUTOSCALER_SET_SCHEDULE
          The name of the schedule to create or update for the autoscaler.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud alloydb instances update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud alloydb instances update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     PSC auto connection options for an AlloyDB instance.

     At most one of these can be specified:

       --clear-psc-auto-connections
          Remove all PSC auto connections for an AlloyDB instance.

       --psc-auto-connections=[network=NETWORK],[project=PROJECT]
          Comma-separated list of consumer project and consumer network pairs
          to create endpoints for Private Service Connect (PSC) connectivity
          for the instance. Only instances in PSC-enabled clusters are allowed
          to set this field. Both project and network must be specified. (e.g.,
          --psc-auto-connections=project=project1,network=projects/vpc-host-project1/global/networks/network1
          --psc-auto-connections=project=project2,network=projects/vpc-host-project2/global/networks/network2).
          Sets psc_auto_connections value.

           network
              Required, sets network value.

           project
              Required, sets project value.

          Shorthand Example:

              --psc-auto-connections=network=string,project=string

          JSON Example:

              --psc-auto-connections='{"network": "string", "project": "string"}'

          File Example:

              --psc-auto-connections=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb instances update

        $ gcloud beta alloydb instances update
```

### gcloud beta alloydb instances create

```text
NAME
    gcloud beta alloydb instances create - creates a new AlloyDB instance
        within a given cluster

SYNOPSIS
    gcloud beta alloydb instances create INSTANCE --cluster=CLUSTER
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

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example passes `--view=BASIC/FULL`, the two alternatives written as one value; `VIEW must be one of: basic, full` and gcloud 593.0.0 rejects the combined value ("Invalid choice"), so the runnable form passes `--view=basic` (use `--view=full` for the full view).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/instances (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

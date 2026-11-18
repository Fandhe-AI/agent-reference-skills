---
source: https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/clusters
---

# gcloud managed-kafka clusters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud managed-kafka clusters create

```text
NAME
    gcloud managed-kafka clusters create - create a Managed Service for Apache
        Kafka cluster

SYNOPSIS
    gcloud managed-kafka clusters create (CLUSTER : --location=LOCATION)
        --cpu=CPU --memory=MEMORY --subnets=[SUBNETS,...]
        [--allowed-source-ip-ranges=[ALLOWED_SOURCE_IP_RANGES,...]] [--async]
        [--no-auto-rebalance] [--broker-disk=BROKER_DISK]
        [--encryption-key=ENCRYPTION_KEY] [--labels=[KEY=VALUE,...]]
        [--mtls-ca-pools=[MTLS_CA_POOLS,...]] [--[no-]public-cluster]
        [--ssl-principal-mapping-rules=SSL_PRINCIPAL_MAPPING_RULES]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Managed Service for Apache Kafka cluster.

EXAMPLES
    To create a cluster, run the following:

        $ gcloud managed-kafka clusters create mycluster \
            --location=us-central1 --cpu=3 --memory=3GiB \
            --subnets=projects/PROJECT_ID/regions/us-central1/subnetworks/\
        default

POSITIONAL ARGUMENTS
     Cluster resource - Identifies the cluster for which the command runs. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --cpu=CPU
        The number of vCPUs to provision for the cluster. The minimum is 3.

     --memory=MEMORY
        The memory to provision for the cluster in bytes. The value must be
        between 1 GiB and 8 GiB per vCPU. Ex. 1024Mi, 4Gi.

     --subnets=[SUBNETS,...]
        A comma-separated list of VPC subnets from which the cluster is
        accessible. Both broker and bootstrap server IP addresses and DNS
        entries are automatically created in each subnet. Only one subnet per
        network is allowed, and the subnet must be located in the same region
        as the cluster. The project may differ. A minimum of 1 subnet is
        required. A maximum of 10 subnets can be specified. Use commas to
        separate multiple subnets. The name of the subnet must be in the format
        projects/PROJECT_ID/regions/REGION/subnetworks/SUBNET.

OPTIONAL FLAGS
     --allowed-source-ip-ranges=[ALLOWED_SOURCE_IP_RANGES,...]
        A comma-separated list of IPv4 ranges in CIDR notation that are allowed
        to connect to the public cluster. Use this flag only if
        --public-cluster is enabled. Example:
        --allowed-source-ip-ranges=203.0.113.0/24,198.51.100.0/24. To protect
        your cluster, allow access from only trusted external IP ranges. Don't
        expose your cluster to untrusted ranges.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --auto-rebalance
        Whether the automatic rebalancing is enabled. If automatic rebalancing
        is enabled, topic partitions are rebalanced among brokers when the
        number of CPUs in the cluster changes. Automatic rebalancing is enabled
        by default. Use --no-auto-rebalance to disable this flag. Enabled by
        default, use --no-auto-rebalance to disable.

     --broker-disk=BROKER_DISK
        The amount of local disk to provision for each broker. Can be specified
        as a plain integer (defaults to GiB) or with units (e.g., 500Gi,
        500GiB, 1Ti, 1TiB). Minimum: 100 Gibibytes.

     --encryption-key=ENCRYPTION_KEY
        The relative resource path of the Cloud KMS key to use for encryption
        in the form:
        projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY.
        The key must be located in the same region as the cluster. The key
        cannot be changed once set.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add. Keys must start with a lowercase
        character and contain only hyphens (-), underscores (_), lowercase
        characters, and numbers. Values must contain only hyphens (-),
        underscores (_), lowercase characters, and numbers.

     --mtls-ca-pools=[MTLS_CA_POOLS,...]
        A comma-separated list of CA pools from the Google Cloud Certificate
        Authority Service. The root certificates of these CA pools will be
        installed in the truststore of each broker in the cluster for use with
        mTLS. A maximum of 10 CA pools can be specified. CA pools can be in a
        different project and region than the cluster. This command overwrites
        the entire set of pools currently configured on the cluster. If you
        want to add a new pool to an existing configuration, you must provide
        the full list of both the old and new CA pools in the command. Each CA
        pool must be in the format
        projects/PROJECT_ID/locations/LOCATION/caPools/CA_POOL. Clear the CA
        pools using the --clear-mtls-ca-pools flag.

     --[no-]public-cluster
        Enable a public cluster. If disabled, public cluster config is cleared.
        Use --public-cluster to enable and --no-public-cluster to disable.

     --ssl-principal-mapping-rules=SSL_PRINCIPAL_MAPPING_RULES
        The rules for mapping mTLS certificate Distinguished Names (DNs) to
        shortened principal names for Kafka ACLs. This flag corresponds exactly
        to the ssl.principal.mapping.rules broker config and matches the format
        and syntax defined in the Apache Kafka documentation. Setting or
        modifying this field will trigger a rolling restart of the Kafka
        brokers to apply the change. An empty string means that the default
        Kafka behavior is used. Example:
        "RULE:^CN=(.?),OU=ServiceUsers.$/$1@example.com/,DEFAULT"

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedkafka/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/managed-service-for-apache-kafka/docs

NOTES
    These variants are also available:

        $ gcloud alpha managed-kafka clusters create

        $ gcloud beta managed-kafka clusters create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud managed-kafka clusters create mycluster \
    --location=us-central1 \
    --cpu=3 \
    --memory=3GiB \
    --subnets=projects/PROJECT_ID/regions/us-central1/subnetworks/default
```

### gcloud managed-kafka clusters delete

```text
NAME
    gcloud managed-kafka clusters delete - delete a Managed Service for Apache
        Kafka cluster

SYNOPSIS
    gcloud managed-kafka clusters delete (CLUSTER : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Managed Service for Apache Kafka cluster.

EXAMPLES
    To delete a cluster named mycluster located in us-central1, run the
    following:

        $ gcloud managed-kafka clusters delete mycluster \
            --location=us-central1

POSITIONAL ARGUMENTS
     Cluster resource - Identifies the cluster for deletion. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedkafka/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/managed-service-for-apache-kafka/docs

NOTES
    These variants are also available:

        $ gcloud alpha managed-kafka clusters delete

        $ gcloud beta managed-kafka clusters delete
```

### gcloud managed-kafka clusters describe

```text
NAME
    gcloud managed-kafka clusters describe - describe a Managed Service for
        Apache Kafka cluster

SYNOPSIS
    gcloud managed-kafka clusters describe (CLUSTER : --location=LOCATION)
        [--full] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Managed Service for Apache Kafka cluster.

EXAMPLES
    To describe a cluster named mycluster located in us-central1, run the
    following:

        $ gcloud managed-kafka clusters describe mycluster \
            --location=us-central1

POSITIONAL ARGUMENTS
     Cluster resource - Identifies the cluster for details to be displayed. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --full
        Show detailed information about individual brokers, such as broker id
        and zone, as well as the Kafka version running on the cluster.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedkafka/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/managed-service-for-apache-kafka/docs

NOTES
    These variants are also available:

        $ gcloud alpha managed-kafka clusters describe

        $ gcloud beta managed-kafka clusters describe
```

### gcloud managed-kafka clusters list

```text
NAME
    gcloud managed-kafka clusters list - list all Managed Service for Apache
        Kafka clusters in a given location

SYNOPSIS
    gcloud managed-kafka clusters list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Apache Kafka for BigQuery clusters in a given location. To specify
    the maximum number of clusters to list, use the --limit flag.

EXAMPLES
    To list all clusters in a given location, such as us-central1, run the
    following:

        $ gcloud managed-kafka clusters list --location=us-central1

REQUIRED FLAGS
     Location resource - Identifies the region which contains all the clusters
     to be listed. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedkafka/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/managed-service-for-apache-kafka/docs

NOTES
    These variants are also available:

        $ gcloud alpha managed-kafka clusters list

        $ gcloud beta managed-kafka clusters list
```

### gcloud managed-kafka clusters update

```text
NAME
    gcloud managed-kafka clusters update - update a Managed Service for Apache
        Kafka cluster

SYNOPSIS
    gcloud managed-kafka clusters update (CLUSTER : --location=LOCATION)
        (--allowed-source-ip-ranges=[ALLOWED_SOURCE_IP_RANGES,...]
          --auto-rebalance --broker-disk=BROKER_DISK --cpu=CPU
          --labels=[KEY=VALUE,...] --memory=MEMORY --[no-]public-cluster
          --ssl-principal-mapping-rules=SSL_PRINCIPAL_MAPPING_RULES
          --subnets=[SUBNETS,...] --clear-mtls-ca-pools
          | --mtls-ca-pools=[MTLS_CA_POOLS,...])
        [--allow-broker-downscale-on-cluster-upscale] [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Managed Service for Apache Kafka cluster.

EXAMPLES
    To update an attribute in a cluster named mycluster located in us-central1,
    such as the CPU, run the following:

        $ gcloud managed-kafka clusters update mycluster \
            --location=us-central1 --cpu=3

POSITIONAL ARGUMENTS
     Cluster resource - Identifies the cluster to be updated. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     At least one of these must be specified:

       --allowed-source-ip-ranges=[ALLOWED_SOURCE_IP_RANGES,...]
          A comma-separated list of IPv4 ranges in CIDR notation that are
          allowed to connect to the public cluster. Use this flag only if
          --public-cluster is enabled. Example:
          --allowed-source-ip-ranges=203.0.113.0/24,198.51.100.0/24. To protect
          your cluster, allow access from only trusted external IP ranges.
          Don't expose your cluster to untrusted ranges.

       --auto-rebalance
          Whether the automatic rebalancing is enabled. If automatic
          rebalancing is enabled, topic partitions are rebalanced among brokers
          when the number of CPUs in the cluster changes. Automatic rebalancing
          is enabled by default. Use --no-auto-rebalance to disable this flag.

       --broker-disk=BROKER_DISK
          The amount of local disk to provision for each broker. Can be
          specified as a plain integer (defaults to GiB) or with units (e.g.,
          500Gi, 500GiB, 1Ti, 1TiB). Minimum: 100 Gibibytes.

       --cpu=CPU
          The number of vCPUs to provision for the cluster. The minimum is 3.

       --labels=[KEY=VALUE,...]
          List of label KEY=VALUE pairs to add. Keys must start with a
          lowercase character and contain only hyphens (-), underscores (_),
          lowercase characters, and numbers. Values must contain only hyphens
          (-), underscores (_), lowercase characters, and numbers.

       --memory=MEMORY
          The memory to provision for the cluster in bytes. The value must be
          between 1 GiB and 8 GiB per vCPU. Ex. 1024Mi, 4Gi.

       --[no-]public-cluster
          Enable a public cluster. If disabled, public cluster config is
          cleared. Use --public-cluster to enable and --no-public-cluster to
          disable.

       --ssl-principal-mapping-rules=SSL_PRINCIPAL_MAPPING_RULES
          The rules for mapping mTLS certificate Distinguished Names (DNs) to
          shortened principal names for Kafka ACLs. This flag corresponds
          exactly to the ssl.principal.mapping.rules broker config and matches
          the format and syntax defined in the Apache Kafka documentation.
          Setting or modifying this field will trigger a rolling restart of the
          Kafka brokers to apply the change. An empty string means that the
          default Kafka behavior is used. Example:
          "RULE:^CN=(.?),OU=ServiceUsers.$/$1@example.com/,DEFAULT"

       --subnets=[SUBNETS,...]
          A comma-separated list of VPC subnets from which the cluster is
          accessible. Both broker and bootstrap server IP addresses and DNS
          entries are automatically created in each subnet. Only one subnet per
          network is allowed, and the subnet must be located in the same region
          as the cluster. The project may differ. A minimum of 1 subnet is
          required. A maximum of 10 subnets can be specified. Use commas to
          separate multiple subnets. The name of the subnet must be in the
          format projects/PROJECT_ID/regions/REGION/subnetworks/SUBNET.

       At most one of these can be specified:

         --clear-mtls-ca-pools
            Remove all the CA pools from the cluster. This will remove all root
            certificates from the truststore of each broker in the cluster.

         --mtls-ca-pools=[MTLS_CA_POOLS,...]
            A comma-separated list of CA pools from the Google Cloud
            Certificate Authority Service. The root certificates of these CA
            pools will be installed in the truststore of each broker in the
            cluster for use with mTLS. A maximum of 10 CA pools can be
            specified. CA pools can be in a different project and region than
            the cluster. This command overwrites the entire set of pools
            currently configured on the cluster. If you want to add a new pool
            to an existing configuration, you must provide the full list of
            both the old and new CA pools in the command. Each CA pool must be
            in the format
            projects/PROJECT_ID/locations/LOCATION/caPools/CA_POOL. Clear the
            CA pools using the --clear-mtls-ca-pools flag.

OPTIONAL FLAGS
     --allow-broker-downscale-on-cluster-upscale
        If enabled, this setting allows an update operation that could
        significantly decrease the per-broker vCPU and/or memory allocation,
        which can lead to reduced performance and availability. By default, an
        update operation will fail if it results in a reduction of 10% or more
        to the brokers' vCPU or memory allocation.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedkafka/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/managed-service-for-apache-kafka/docs

NOTES
    These variants are also available:

        $ gcloud alpha managed-kafka clusters update

        $ gcloud beta managed-kafka clusters update
```

### gcloud beta managed-kafka clusters create

```text
NAME
    gcloud beta managed-kafka clusters create - create a Managed Service for
        Apache Kafka cluster

SYNOPSIS
    gcloud beta managed-kafka clusters create (CLUSTER : --location=LOCATION)
        --cpu=CPU --memory=MEMORY --subnets=[SUBNETS,...]
        [--allowed-source-ip-ranges=[ALLOWED_SOURCE_IP_RANGES,...]] [--async]
        [--no-auto-rebalance] [--broker-disk=BROKER_DISK]
        [--encryption-key=ENCRYPTION_KEY] [--labels=[KEY=VALUE,...]]
        [--mtls-ca-pools=[MTLS_CA_POOLS,...]] [--[no-]public-cluster]
        [--ssl-principal-mapping-rules=SSL_PRINCIPAL_MAPPING_RULES]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka clusters delete

```text
NAME
    gcloud beta managed-kafka clusters delete - delete a Managed Service for
        Apache Kafka cluster

SYNOPSIS
    gcloud beta managed-kafka clusters delete (CLUSTER : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka clusters describe

```text
NAME
    gcloud beta managed-kafka clusters describe - describe a Managed Service
        for Apache Kafka cluster

SYNOPSIS
    gcloud beta managed-kafka clusters describe (CLUSTER : --location=LOCATION)
        [--full] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka clusters list

```text
NAME
    gcloud beta managed-kafka clusters list - list all Managed Service for
        Apache Kafka clusters in a given location

SYNOPSIS
    gcloud beta managed-kafka clusters list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka clusters update

```text
NAME
    gcloud beta managed-kafka clusters update - update a Managed Service for
        Apache Kafka cluster

SYNOPSIS
    gcloud beta managed-kafka clusters update (CLUSTER : --location=LOCATION)
        (--allowed-source-ip-ranges=[ALLOWED_SOURCE_IP_RANGES,...]
          --auto-rebalance --broker-disk=BROKER_DISK --cpu=CPU
          --labels=[KEY=VALUE,...] --memory=MEMORY --[no-]public-cluster
          --ssl-principal-mapping-rules=SSL_PRINCIPAL_MAPPING_RULES
          --subnets=[SUBNETS,...] --clear-mtls-ca-pools
          | --mtls-ca-pools=[MTLS_CA_POOLS,...])
        [--allow-broker-downscale-on-cluster-upscale] [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka clusters create

```text
NAME
    gcloud alpha managed-kafka clusters create - create a Managed Service for
        Apache Kafka cluster

SYNOPSIS
    gcloud alpha managed-kafka clusters create (CLUSTER : --location=LOCATION)
        --cpu=CPU --memory=MEMORY --subnets=[SUBNETS,...]
        [--allowed-source-ip-ranges=[ALLOWED_SOURCE_IP_RANGES,...]] [--async]
        [--no-auto-rebalance] [--broker-disk=BROKER_DISK]
        [--dns-zone-target=DNS_ZONE_TARGET] [--encryption-key=ENCRYPTION_KEY]
        [--labels=[KEY=VALUE,...]] [--mtls-ca-pools=[MTLS_CA_POOLS,...]]
        [--psc-resource-target=PSC_RESOURCE_TARGET] [--[no-]public-cluster]
        [--ssl-principal-mapping-rules=SSL_PRINCIPAL_MAPPING_RULES]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka clusters delete

```text
NAME
    gcloud alpha managed-kafka clusters delete - delete a Managed Service for
        Apache Kafka cluster

SYNOPSIS
    gcloud alpha managed-kafka clusters delete (CLUSTER : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka clusters describe

```text
NAME
    gcloud alpha managed-kafka clusters describe - describe a Managed Service
        for Apache Kafka cluster

SYNOPSIS
    gcloud alpha managed-kafka clusters describe
        (CLUSTER : --location=LOCATION) [--full] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka clusters list

```text
NAME
    gcloud alpha managed-kafka clusters list - list all Managed Service for
        Apache Kafka clusters in a given location

SYNOPSIS
    gcloud alpha managed-kafka clusters list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka clusters update

```text
NAME
    gcloud alpha managed-kafka clusters update - update a Managed Service for
        Apache Kafka cluster

SYNOPSIS
    gcloud alpha managed-kafka clusters update (CLUSTER : --location=LOCATION)
        (--allowed-source-ip-ranges=[ALLOWED_SOURCE_IP_RANGES,...]
          --auto-rebalance --broker-disk=BROKER_DISK --cpu=CPU
          --dns-zone-target=DNS_ZONE_TARGET --labels=[KEY=VALUE,...]
          --memory=MEMORY --psc-resource-target=PSC_RESOURCE_TARGET
          --[no-]public-cluster
          --ssl-principal-mapping-rules=SSL_PRINCIPAL_MAPPING_RULES
          --subnets=[SUBNETS,...] --clear-mtls-ca-pools
          | --mtls-ca-pools=[MTLS_CA_POOLS,...])
        [--allow-broker-downscale-on-cluster-upscale] [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

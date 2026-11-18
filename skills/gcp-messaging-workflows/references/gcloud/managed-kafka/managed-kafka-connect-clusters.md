---
source: https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/connect-clusters
---

# gcloud managed-kafka connect-clusters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud managed-kafka connect-clusters create

```text
NAME
    gcloud managed-kafka connect-clusters create - create a Managed Service for
        Apache Kafka connect cluster

SYNOPSIS
    gcloud managed-kafka connect-clusters create
        (CONNECT_CLUSTER : --location=LOCATION) --cpu=CPU
        --kafka-cluster=KAFKA_CLUSTER --memory=MEMORY
        --primary-subnet=PRIMARY_SUBNET [--additional-subnet=ADDITIONAL_SUBNET]
        [--async] [--dns-name=DNS_NAME] [--labels=[KEY=VALUE,...]]
        [--secret=SECRET]
        [--config-file=JSON|YAML|FILE | --configs=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Managed Service for Apache Kafka connect cluster.

EXAMPLES
    To create a connector cluster, run the following:

        $ gcloud managed-kafka connect-clusters create myconnectorCluster \
            --location=us-central1 --cpu=3 --memory=3GiB \
            --primary-subnet=projects/PROJECT_ID/regions/us-central1/\
        subnetworks/default --kafka-cluster=my-kafka-cluster OR \
            --kafka-cluster=projects/PROJECT_ID/locations/us-central1/\
        clusters/my-kafka-cluster

POSITIONAL ARGUMENTS
     Connect cluster resource - Identifies the connect cluster that is created.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument connect_cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECT_CLUSTER
          ID of the connect_cluster or fully qualified identifier for the
          connect_cluster.

          To set the connect_cluster attribute:
          + provide the argument connect_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument connect_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --cpu=CPU
        The number of vCPUs to provision for the cluster. The minimum is 3.

     --kafka-cluster=KAFKA_CLUSTER
        The resource path of the Kafka cluster to connect to, or the name of
        the Kafka cluster to connect to if the cluster is in the same project
        as the Connect cluster.

     --memory=MEMORY
        The memory to provision for the cluster in bytes. The value must be
        between 1 GiB and 8 GiB per vCPU. Ex. 1024Mi, 4Gi.

     --primary-subnet=PRIMARY_SUBNET
        VPC subnet to make available to the Kafka Connect cluster. Structured
        like: projects/{project}/regions/{region}/subnetworks/{subnet_id}. The
        primary subnet is used to create a Private Service Connect (PSC)
        interface for the Kafka Connect workers. It must be located in the same
        region as the Connect cluster.

OPTIONAL FLAGS
     --additional-subnet=ADDITIONAL_SUBNET
        (DEPRECATED) Additional subnet to make available to the Kafka Connect
        cluster. Structured like:
        projects/{project}/regions/{region}/subnetworks/{subnet_id}.

        The --additional-subnet flag is deprecated and will be removed in a
        future version. Managed Kafka Connect clusters can now reach any
        endpoint accessible from the primary subnet without the need to define
        additional subnets. Please see
        https://cloud.google.com/managed-service-for-apache-kafka/docs/connect-cluster/create-connect-cluster#worker-subnet
        for more information.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --dns-name=DNS_NAME
        DNS domain name from the subnet's network to be made visible to the
        Connect Cluster.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add. Keys must start with a lowercase
        character and contain only hyphens (-), underscores (_), lowercase
        characters, and numbers. Values must contain only hyphens (-),
        underscores (_), lowercase characters, and numbers.

     --secret=SECRET
        Secrets to load into workers. Exact SecretVersions from Secret Manager
        must be provided -- aliases are not supported. Up to 32 secrets may be
        loaded into one cluster. Format:
        projects/<project-id>/secrets/<secret-name>/versions/<version-id>

     At most one of these can be specified:

       --config-file=JSON|YAML|FILE
          The path to the JSON or YAML file containing the configuration that
          are overridden from the cluster or connector defaults. This also
          supports inline JSON or YAML. Sets config_file value.

          Input Example:

              --config-file=string

          File Example:

              --config-file=path_to_file.(yaml|json)

       --configs=[KEY=VALUE,...]
          Configuration for the connect cluster that are overridden from the
          cluster defaults. The key of the map is a Kafka topic property name,
          for example: cleanup.policy=compact,compression.type=producer.

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

        $ gcloud alpha managed-kafka connect-clusters create

        $ gcloud beta managed-kafka connect-clusters create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud managed-kafka connect-clusters create myconnectorCluster \
    --location=us-central1 \
    --cpu=3 \
    --memory=3GiB \
    --primary-subnet=projects/PROJECT_ID/regions/us-central1/subnetworks/default \
    --kafka-cluster=projects/PROJECT_ID/locations/us-central1/clusters/my-kafka-cluster
```

### gcloud managed-kafka connect-clusters delete

```text
NAME
    gcloud managed-kafka connect-clusters delete - delete a Managed Service for
        Apache Kafka connect cluster

SYNOPSIS
    gcloud managed-kafka connect-clusters delete
        (CONNECT_CLUSTER : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Managed Service for Apache Kafka connect cluster.

EXAMPLES
    To delete a connect cluster named myconnectcluster located in us-central1,
    run the following:

        $ gcloud managed-kafka connect-clusters delete myconnectcluster \
            --location=us-central1

POSITIONAL ARGUMENTS
     Connect cluster resource - Identifies the connect cluster for deletion.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument connect_cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECT_CLUSTER
          ID of the connect_cluster or fully qualified identifier for the
          connect_cluster.

          To set the connect_cluster attribute:
          + provide the argument connect_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument connect_cluster on the command line with a
            fully specified name;
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

        $ gcloud alpha managed-kafka connect-clusters delete

        $ gcloud beta managed-kafka connect-clusters delete
```

### gcloud managed-kafka connect-clusters describe

```text
NAME
    gcloud managed-kafka connect-clusters describe - describe a Managed Service
        for Apache Kafka connect cluster

SYNOPSIS
    gcloud managed-kafka connect-clusters describe
        (CONNECT_CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Managed Service for Apache Kafka for BigQuery connect cluster.

EXAMPLES
    To describe a connect cluster named myconnectcluster located in
    us-central1, run the following:

        $ gcloud managed-kafka connect-clusters describe myconnectcluster \
            --location=us-central1

POSITIONAL ARGUMENTS
     Connect cluster resource - Identifies the connect cluster. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument connect_cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECT_CLUSTER
          ID of the connect_cluster or fully qualified identifier for the
          connect_cluster.

          To set the connect_cluster attribute:
          + provide the argument connect_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument connect_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha managed-kafka connect-clusters describe

        $ gcloud beta managed-kafka connect-clusters describe
```

### gcloud managed-kafka connect-clusters list

```text
NAME
    gcloud managed-kafka connect-clusters list - list all Managed Service for
        Apache Kafka connect clusters in a given location

SYNOPSIS
    gcloud managed-kafka connect-clusters list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Managed Service for Apache Kafka connect clusters in a given
    location. To specify the maximum number of clusters to list, use the
    --limit flag.

EXAMPLES
    To list all connect clusters in a given location, such as us-central1, run
    the following:

        $ gcloud managed-kafka connect-clusters list --location=us-central1

REQUIRED FLAGS
     Location resource - Identifies the region which contains all the connector
     clusters to be listed. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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

        $ gcloud alpha managed-kafka connect-clusters list

        $ gcloud beta managed-kafka connect-clusters list
```

### gcloud managed-kafka connect-clusters update

```text
NAME
    gcloud managed-kafka connect-clusters update - update a Managed Service for
        Apache Kafka for BigQuery connect cluster

SYNOPSIS
    gcloud managed-kafka connect-clusters update
        (CONNECT_CLUSTER : --location=LOCATION)
        (--cpu=CPU --memory=MEMORY --clear-configs
          | --config-file=JSON|YAML|FILE
          | --configs=[KEY=VALUE,...] --clear-dns-names
          | --dns-name=DNS_NAME --clear-labels
          | --labels=[KEY=VALUE,...] --clear-secrets
          | --secret=SECRET [--primary-subnet=PRIMARY_SUBNET
          : --additional-subnet=ADDITIONAL_SUBNET]) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Managed Service for Apache Kafka for BigQuery connect cluster.

EXAMPLES
    To update a connect cluster, run the following:

        $ gcloud managed-kafka connect-clusters update myconnectorCluster \
            --location=us-central1 --configs=KEY1=VALUE1,KEY2=VALUE2... OR \
            --config-file=my-config-file.yaml --cpu=3 --memory=3GiB \
            --primary-subnet=projects/my-project/regions/us-central1/\
        subnetworks/default/1 \
            --dns-name=bootstrap.myconnectorCluster.us-central1.managedkafka\
        .my-project.cloud.goog:9092 \
            --secret=projects/my-project/secrets/my-secret/versions/1 \
            --labels=KEY1=VALUE1,KEY2=VALUE2...

POSITIONAL ARGUMENTS
     Connect cluster resource - Identifies the connect cluster for which the
     command runs. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument connect_cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECT_CLUSTER
          ID of the connect_cluster or fully qualified identifier for the
          connect_cluster.

          To set the connect_cluster attribute:
          + provide the argument connect_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument connect_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     At least one of these must be specified:

       --cpu=CPU
          The number of vCPUs to provision for the cluster. The minimum is 3.

       --memory=MEMORY
          The memory to provision for the cluster in bytes. The value must be
          between 1 GiB and 8 GiB per vCPU. Ex. 1024Mi, 4Gi.

       At most one of these can be specified:

         --clear-configs
            Remove all the configurations for the topic.

         --config-file=JSON|YAML|FILE
            The path to the JSON or YAML file containing the configuration that
            are overridden from the cluster or connector defaults. This also
            supports inline JSON or YAML. Sets config_file value.

            Input Example:

                --config-file=string

            File Example:

                --config-file=path_to_file.(yaml|json)

         --configs=[KEY=VALUE,...]
            Configuration for the connect cluster that are overridden from the
            cluster defaults. The key of the map is a Kafka topic property
            name, for example:
            cleanup.policy=compact,compression.type=producer.

       At most one of these can be specified:

         --clear-dns-names
            Remove all the DNS domain names for the connect cluster.

         --dns-name=DNS_NAME
            DNS domain name from the subnet's network to be made visible to the
            Connect Cluster.

       At most one of these can be specified:

         --clear-labels
            Remove all the labels from the connect cluster.

         --labels=[KEY=VALUE,...]
            List of label KEY=VALUE pairs to add. Keys must start with a
            lowercase character and contain only hyphens (-), underscores (_),
            lowercase characters, and numbers. Values must contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

       At most one of these can be specified:

         --clear-secrets
            Remove all the secrets from the connect cluster.

         --secret=SECRET
            Secrets to load into workers. Exact SecretVersions from Secret
            Manager must be provided -- aliases are not supported. Up to 32
            secrets may be loaded into one cluster. Format:
            projects/<project-id>/secrets/<secret-name>/versions/<version-id>

       --primary-subnet=PRIMARY_SUBNET
          VPC subnet to make available to the Kafka Connect cluster. Structured
          like: projects/{project}/regions/{region}/subnetworks/{subnet_id}.
          The primary subnet is used to create a Private Service Connect (PSC)
          interface for the Kafka Connect workers. It must be located in the
          same region as the Connect cluster.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --additional-subnet=ADDITIONAL_SUBNET
          (DEPRECATED) Additional subnet to make available to the Kafka Connect
          cluster. Structured like:
          projects/{project}/regions/{region}/subnetworks/{subnet_id}.

          The --additional-subnet flag is deprecated and will be removed in a
          future version. Managed Kafka Connect clusters can now reach any
          endpoint accessible from the primary subnet without the need to
          define additional subnets. Please see
          https://cloud.google.com/managed-service-for-apache-kafka/docs/connect-cluster/create-connect-cluster#worker-subnet
          for more information.

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

API REFERENCE
    This command uses the managedkafka/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/managed-service-for-apache-kafka/docs

NOTES
    These variants are also available:

        $ gcloud alpha managed-kafka connect-clusters update

        $ gcloud beta managed-kafka connect-clusters update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud managed-kafka connect-clusters update myconnectorCluster \
    --location=us-central1 \
    --configs=KEY1=VALUE1,KEY2=VALUE2 \
    --cpu=3 \
    --memory=3GiB \
    --primary-subnet=projects/my-project/regions/us-central1/subnetworks/default \
    --dns-name=bootstrap.myconnectorCluster.us-central1.managedkafka.my-project.cloud.goog:9092 \
    --secret=projects/my-project/secrets/my-secret/versions/1 \
    --labels=key1=value1,key2=value2
```

### gcloud beta managed-kafka connect-clusters create

```text
NAME
    gcloud beta managed-kafka connect-clusters create - create a Managed
        Service for Apache Kafka connect cluster

SYNOPSIS
    gcloud beta managed-kafka connect-clusters create
        (CONNECT_CLUSTER : --location=LOCATION) --cpu=CPU
        --kafka-cluster=KAFKA_CLUSTER --memory=MEMORY
        --primary-subnet=PRIMARY_SUBNET [--additional-subnet=ADDITIONAL_SUBNET]
        [--async] [--dns-name=DNS_NAME] [--labels=[KEY=VALUE,...]]
        [--secret=SECRET]
        [--config-file=JSON|YAML|FILE | --configs=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka connect-clusters delete

```text
NAME
    gcloud beta managed-kafka connect-clusters delete - delete a Managed
        Service for Apache Kafka connect cluster

SYNOPSIS
    gcloud beta managed-kafka connect-clusters delete
        (CONNECT_CLUSTER : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka connect-clusters describe

```text
NAME
    gcloud beta managed-kafka connect-clusters describe - describe a Managed
        Service for Apache Kafka connect cluster

SYNOPSIS
    gcloud beta managed-kafka connect-clusters describe
        (CONNECT_CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka connect-clusters list

```text
NAME
    gcloud beta managed-kafka connect-clusters list - list all Managed Service
        for Apache Kafka connect clusters in a given location

SYNOPSIS
    gcloud beta managed-kafka connect-clusters list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka connect-clusters update

```text
NAME
    gcloud beta managed-kafka connect-clusters update - update a Managed
        Service for Apache Kafka for BigQuery connect cluster

SYNOPSIS
    gcloud beta managed-kafka connect-clusters update
        (CONNECT_CLUSTER : --location=LOCATION)
        (--cpu=CPU --memory=MEMORY --clear-configs
          | --config-file=JSON|YAML|FILE
          | --configs=[KEY=VALUE,...] --clear-dns-names
          | --dns-name=DNS_NAME --clear-labels
          | --labels=[KEY=VALUE,...] --clear-secrets
          | --secret=SECRET [--primary-subnet=PRIMARY_SUBNET
          : --additional-subnet=ADDITIONAL_SUBNET]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka connect-clusters create

```text
NAME
    gcloud alpha managed-kafka connect-clusters create - create a Managed
        Service for Apache Kafka connect cluster

SYNOPSIS
    gcloud alpha managed-kafka connect-clusters create
        (CONNECT_CLUSTER : --location=LOCATION) --cpu=CPU
        --kafka-cluster=KAFKA_CLUSTER --memory=MEMORY
        --primary-subnet=PRIMARY_SUBNET [--additional-subnet=ADDITIONAL_SUBNET]
        [--async] [--dns-name=DNS_NAME] [--labels=[KEY=VALUE,...]]
        [--secret=SECRET]
        [--config-file=JSON|YAML|FILE | --configs=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka connect-clusters delete

```text
NAME
    gcloud alpha managed-kafka connect-clusters delete - delete a Managed
        Service for Apache Kafka connect cluster

SYNOPSIS
    gcloud alpha managed-kafka connect-clusters delete
        (CONNECT_CLUSTER : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka connect-clusters describe

```text
NAME
    gcloud alpha managed-kafka connect-clusters describe - describe a Managed
        Service for Apache Kafka connect cluster

SYNOPSIS
    gcloud alpha managed-kafka connect-clusters describe
        (CONNECT_CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka connect-clusters list

```text
NAME
    gcloud alpha managed-kafka connect-clusters list - list all Managed Service
        for Apache Kafka connect clusters in a given location

SYNOPSIS
    gcloud alpha managed-kafka connect-clusters list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka connect-clusters update

```text
NAME
    gcloud alpha managed-kafka connect-clusters update - update a Managed
        Service for Apache Kafka for BigQuery connect cluster

SYNOPSIS
    gcloud alpha managed-kafka connect-clusters update
        (CONNECT_CLUSTER : --location=LOCATION)
        (--cpu=CPU --memory=MEMORY --clear-configs
          | --config-file=JSON|YAML|FILE
          | --configs=[KEY=VALUE,...] --clear-dns-names
          | --dns-name=DNS_NAME --clear-labels
          | --labels=[KEY=VALUE,...] --clear-secrets
          | --secret=SECRET [--primary-subnet=PRIMARY_SUBNET
          : --additional-subnet=ADDITIONAL_SUBNET]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud managed-kafka connect-clusters create --additional-subnet`: "The --additional-subnet flag is deprecated and will be removed in a future version. Managed Kafka Connect clusters can now reach any endpoint accessible from the primary subnet without the need to define additional subnets. Please see https://cloud.google.com/managed-service-for-apache-kafka/docs/connect-cluster/create-connect-cluster#worker-subnet for more information."; `gcloud managed-kafka connect-clusters update --additional-subnet`: "The --additional-subnet flag is deprecated and will be removed in a future version. Managed Kafka Connect clusters can now reach any endpoint accessible from the primary subnet without the need to define additional subnets. Please see https://cloud.google.com/managed-service-for-apache-kafka/docs/connect-cluster/create-connect-cluster#worker-subnet for more information.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` example lists two alternatives for `--kafka-cluster` joined by `OR` (`--kafka-cluster=my-kafka-cluster OR --kafka-cluster=projects/PROJECT_ID/locations/us-central1/clusters/my-kafka-cluster`), which cannot be run as one command; the runnable form keeps the fully qualified cluster name (the cluster ID alone is also accepted).
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `update` example lists `--configs=KEY1=VALUE1,KEY2=VALUE2... OR --config-file=my-config-file.yaml`, but the SYNOPSIS allows only one of `--configs` and `--config-file`, and `...` is not part of the value; the runnable form keeps `--configs=KEY1=VALUE1,KEY2=VALUE2` (use `--config-file=FILE` instead to read the configs from a JSON or YAML file).
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `update` example passes `--labels=KEY1=VALUE1,KEY2=VALUE2...`, but the `--labels` description says keys and values may contain only hyphens, underscores, lowercase characters and numbers; the runnable form uses `--labels=key1=value1,key2=value2`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `update` example passes `--primary-subnet=projects/my-project/regions/us-central1/subnetworks/default/1`, but the `--primary-subnet` description says the value is "Structured like: projects/{project}/regions/{region}/subnetworks/{subnet_id}"; the runnable form drops the trailing `/1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/connect-clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/connectors
---

# gcloud managed-kafka connectors

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud managed-kafka connectors create

```text
NAME
    gcloud managed-kafka connectors create - create a Managed Service for
        Apache Kafka connector

SYNOPSIS
    gcloud managed-kafka connectors create
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        (--config-file=JSON|YAML|FILE | --configs=[KEY=VALUE,...])
        [--task-retry-disabled]
        [--task-restart-max-backoff=TASK_RESTART_MAX_BACKOFF
          --task-restart-min-backoff=TASK_RESTART_MIN_BACKOFF]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Managed Service for Apache Kafka connector.

EXAMPLES
    To create a connector, run the following:

        $ gcloud managed-kafka connectors create myconnector \
            --location=us-central1 --connect-cluster=mycluster \
            --configs=connector.class="com.google.pubsub.kafka.source.CloudP\
        ubSubSourceConnector",cps.subscription="my-subscription",... \
            [--task-restart-min-backoff=60s] \
            [--task-restart-max-backoff=30m] [--task-retry-disabled=true] OR
        $ gcloud managed-kafka connectors create myconnector \
            --location=us-central1 --connect-cluster=mycluster \
            --config-file=my-config-file.yaml \
            [--task-restart-min-backoff=60s] \
            [--task-restart-max-backoff=30m] [--task-retry-disabled=true]

POSITIONAL ARGUMENTS
     Connector resource - Identifies the connector for which the command runs.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument connector on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTOR
          ID of the connector or fully qualified identifier for the connector.

          To set the connector attribute:
          + provide the argument connector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connect-cluster=CONNECT_CLUSTER
          The connect cluster name.

          To set the connect-cluster attribute:
          + provide the argument connector on the command line with a fully
            specified name;
          + provide the argument --connect-cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument connector on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --config-file=JSON|YAML|FILE
          The path to the JSON or YAML file containing the configuration that
          are overridden from the connector defaults. This also supports inline
          JSON or YAML. Sets config_file value.

          Input Example:

              --config-file=string

          File Example:

              --config-file=path_to_file.(yaml|json)

       --configs=[KEY=VALUE,...]
          Configuration for the connector that are overridden from the
          connector defaults. The key of the map is a Kafka topic property
          name, for example: cleanup.policy=compact,compression.type=producer.

OPTIONAL FLAGS
     --task-retry-disabled
        Disable default task retry policy.

     --task-restart-max-backoff=TASK_RESTART_MAX_BACKOFF
        The maximum amount of time to wait before retrying a failed task in
        seconds. This sets an upper bound for the backoff delay. The default
        value is 1800s (30 minutes). See $ gcloud topic datetimes for
        information on duration formats.

     --task-restart-min-backoff=TASK_RESTART_MIN_BACKOFF
        The minimum amount of time to wait before retrying a failed task in
        seconds. This sets a lower bound for the backoff delay. The default
        value is 60s. See $ gcloud topic datetimes for information on duration
        formats.

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

        $ gcloud alpha managed-kafka connectors create

        $ gcloud beta managed-kafka connectors create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud managed-kafka connectors create myconnector \
    --location=us-central1 \
    --connect-cluster=mycluster \
    --configs=connector.class="com.google.pubsub.kafka.source.CloudPubSubSourceConnector",cps.subscription="my-subscription" \
    --task-restart-min-backoff=60s \
    --task-restart-max-backoff=30m \
    --task-retry-disabled

gcloud managed-kafka connectors create myconnector \
    --location=us-central1 \
    --connect-cluster=mycluster \
    --config-file=my-config-file.yaml \
    --task-restart-min-backoff=60s \
    --task-restart-max-backoff=30m \
    --task-retry-disabled
```

### gcloud managed-kafka connectors delete

```text
NAME
    gcloud managed-kafka connectors delete - delete a Managed Service for
        Apache Kafka connector

SYNOPSIS
    gcloud managed-kafka connectors delete
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Managed Service for Apache Kafka connector.

EXAMPLES
    To delete a connector named myconnector located in us-central1, run the
    following:

        $ gcloud managed-kafka connectors delete myconnector \
            --location=us-central1 --connect-cluster=mycluster

POSITIONAL ARGUMENTS
     Connector resource - Identifies the cluster for deletion. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument connector on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTOR
          ID of the connector or fully qualified identifier for the connector.

          To set the connector attribute:
          + provide the argument connector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connect-cluster=CONNECT_CLUSTER
          The connect cluster name.

          To set the connect-cluster attribute:
          + provide the argument connector on the command line with a fully
            specified name;
          + provide the argument --connect-cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument connector on the command line with a fully
            specified name;
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

        $ gcloud alpha managed-kafka connectors delete

        $ gcloud beta managed-kafka connectors delete
```

### gcloud managed-kafka connectors describe

```text
NAME
    gcloud managed-kafka connectors describe - describe a Managed Service for
        Apache Kafka connector

SYNOPSIS
    gcloud managed-kafka connectors describe
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Managed Service for Apache Kafka connector.

EXAMPLES
    To describe a connector named myconnector located in us-central1, run the
    following:

        $ gcloud managed-kafka connectors describe myconnector \
            --location=us-central1 --connect-cluster=mycluster

POSITIONAL ARGUMENTS
     Connector resource - Identifies the connector for details to be displayed.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument connector on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTOR
          ID of the connector or fully qualified identifier for the connector.

          To set the connector attribute:
          + provide the argument connector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connect-cluster=CONNECT_CLUSTER
          The connect cluster name.

          To set the connect-cluster attribute:
          + provide the argument connector on the command line with a fully
            specified name;
          + provide the argument --connect-cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument connector on the command line with a fully
            specified name;
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

        $ gcloud alpha managed-kafka connectors describe

        $ gcloud beta managed-kafka connectors describe
```

### gcloud managed-kafka connectors list

```text
NAME
    gcloud managed-kafka connectors list - list all Managed Service for Apache
        Kafka connectors for a given connect cluster

SYNOPSIS
    gcloud managed-kafka connectors list
        (CONNECT_CLUSTER : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Managed Service for Apache Kafka connectors for a given connect
    cluster. To specify the maximum number of connectors to list, use the
    --limit flag.

EXAMPLES
    To list all Managed Service for Apache Kafka connectors belonging to the
    "mycluster" connect cluster in us-central1, run the following:

        $ gcloud managed-kafka connectors list mycluster \
            --location=us-central1

POSITIONAL ARGUMENTS
     Connect cluster resource - Identifies the cluster which contains all the
     connectors to be listed. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

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

        $ gcloud alpha managed-kafka connectors list

        $ gcloud beta managed-kafka connectors list
```

### gcloud managed-kafka connectors pause

```text
NAME
    gcloud managed-kafka connectors pause - pauses operation of a Managed
        Service for Apache Kafka connector

SYNOPSIS
    gcloud managed-kafka connectors pause
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Pauses operation of a Managed Service for Apache Kafka connector.

EXAMPLES
    To pause a connector named myconnector located in us-central1, run the
    following:

        $ gcloud managed-kafka connectors pause myconnector \
            --location=us-central1 --connect-cluster=mycluster

POSITIONAL ARGUMENTS
     Connector resource - Identifies the connector to pause. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument connector on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTOR
          ID of the connector or fully qualified identifier for the connector.

          To set the connector attribute:
          + provide the argument connector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connect-cluster=CONNECT_CLUSTER
          The connect cluster name.

          To set the connect-cluster attribute:
          + provide the argument connector on the command line with a fully
            specified name;
          + provide the argument --connect-cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument connector on the command line with a fully
            specified name;
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

        $ gcloud alpha managed-kafka connectors pause

        $ gcloud beta managed-kafka connectors pause
```

### gcloud managed-kafka connectors restart

```text
NAME
    gcloud managed-kafka connectors restart - restarts a Managed Service for
        Apache Kafka connector

SYNOPSIS
    gcloud managed-kafka connectors restart
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Restarts a Managed Service for Apache Kafka connector.

EXAMPLES
    To restart a connector named myconnector located in us-central1, run the
    following:

        $ gcloud managed-kafka connectors restart myconnector \
            --location=us-central1 --connect-cluster=mycluster

POSITIONAL ARGUMENTS
     Connector resource - Identifies the connector to restart. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument connector on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTOR
          ID of the connector or fully qualified identifier for the connector.

          To set the connector attribute:
          + provide the argument connector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connect-cluster=CONNECT_CLUSTER
          The connect cluster name.

          To set the connect-cluster attribute:
          + provide the argument connector on the command line with a fully
            specified name;
          + provide the argument --connect-cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument connector on the command line with a fully
            specified name;
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

        $ gcloud alpha managed-kafka connectors restart

        $ gcloud beta managed-kafka connectors restart
```

### gcloud managed-kafka connectors resume

```text
NAME
    gcloud managed-kafka connectors resume - resumes operation of a stopped
        Managed Service for Apache Kafka connector

SYNOPSIS
    gcloud managed-kafka connectors resume
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Resumes operation of a stopped Managed Service for Apache Kafka connector.

EXAMPLES
    To resume a connector named myconnector located in us-central1, run the
    following:

        $ gcloud managed-kafka connectors resume myconnector \
            --location=us-central1 --connect-cluster=mycluster

POSITIONAL ARGUMENTS
     Connector resource - Identifies the connector to resume. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument connector on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTOR
          ID of the connector or fully qualified identifier for the connector.

          To set the connector attribute:
          + provide the argument connector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connect-cluster=CONNECT_CLUSTER
          The connect cluster name.

          To set the connect-cluster attribute:
          + provide the argument connector on the command line with a fully
            specified name;
          + provide the argument --connect-cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument connector on the command line with a fully
            specified name;
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

        $ gcloud alpha managed-kafka connectors resume

        $ gcloud beta managed-kafka connectors resume
```

### gcloud managed-kafka connectors stop

```text
NAME
    gcloud managed-kafka connectors stop - stops operation of a Managed Service
        for Apache Kafka connector

SYNOPSIS
    gcloud managed-kafka connectors stop
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Stops operation of a Managed Service for Apache Kafka connector.

EXAMPLES
    To stop a connector named myconnector located in us-central1, run the
    following:

        $ gcloud managed-kafka connectors stop myconnector \
            --location=us-central1 --connect-cluster=mycluster

POSITIONAL ARGUMENTS
     Connector resource - Identifies the connector to resume. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument connector on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTOR
          ID of the connector or fully qualified identifier for the connector.

          To set the connector attribute:
          + provide the argument connector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connect-cluster=CONNECT_CLUSTER
          The connect cluster name.

          To set the connect-cluster attribute:
          + provide the argument connector on the command line with a fully
            specified name;
          + provide the argument --connect-cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument connector on the command line with a fully
            specified name;
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

        $ gcloud alpha managed-kafka connectors stop

        $ gcloud beta managed-kafka connectors stop
```

### gcloud managed-kafka connectors update

```text
NAME
    gcloud managed-kafka connectors update - update a Managed Service for
        Apache Kafka connector

SYNOPSIS
    gcloud managed-kafka connectors update
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [--task-retry-disabled]
        [--config-file=JSON|YAML|FILE | --configs=[KEY=VALUE,...]]
        [--task-restart-max-backoff=TASK_RESTART_MAX_BACKOFF
          --task-restart-min-backoff=TASK_RESTART_MIN_BACKOFF]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Managed Service for Apache Kafka connector.

EXAMPLES
    To update a connector name myconnector, run the following:

        $ gcloud managed-kafka connectors update myconnector \
            --location=us-central1 --configs=KEY1=VALUE1,KEY2=VALUE2... \
            --connect-cluster=mycluster [--task-restart-min-backoff=60s] \
            [--task-restart-max-backoff=30m] [--task-retry-disabled=true] OR
        $ gcloud managed-kafka connectors update myconnector \
            --location=us-central1 --config-file=my-config-file.yaml \
            --connect-cluster=mycluster [--task-restart-min-backoff=60s] \
            [--task-restart-max-backoff=30m] [--task-retry-disabled=true]

POSITIONAL ARGUMENTS
     Connector resource - Identifies the connector for which the command runs.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument connector on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTOR
          ID of the connector or fully qualified identifier for the connector.

          To set the connector attribute:
          + provide the argument connector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --connect-cluster=CONNECT_CLUSTER
          The connect cluster name.

          To set the connect-cluster attribute:
          + provide the argument connector on the command line with a fully
            specified name;
          + provide the argument --connect-cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument connector on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --task-retry-disabled
        Disable default task retry policy.

     At most one of these can be specified:

       --config-file=JSON|YAML|FILE
          The path to the JSON or YAML file containing the configuration that
          are overridden from the connector defaults. This also supports inline
          JSON or YAML. Sets config_file value.

          Input Example:

              --config-file=string

          File Example:

              --config-file=path_to_file.(yaml|json)

       --configs=[KEY=VALUE,...]
          Configuration for the connector that are overridden from the
          connector defaults. The key of the map is a Kafka topic property
          name, for example: cleanup.policy=compact,compression.type=producer.

     --task-restart-max-backoff=TASK_RESTART_MAX_BACKOFF
        The maximum amount of time to wait before retrying a failed task in
        seconds. This sets an upper bound for the backoff delay. The default
        value is 1800s (30 minutes). See $ gcloud topic datetimes for
        information on duration formats.

     --task-restart-min-backoff=TASK_RESTART_MIN_BACKOFF
        The minimum amount of time to wait before retrying a failed task in
        seconds. This sets a lower bound for the backoff delay. The default
        value is 60s. See $ gcloud topic datetimes for information on duration
        formats.

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

        $ gcloud alpha managed-kafka connectors update

        $ gcloud beta managed-kafka connectors update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud managed-kafka connectors update myconnector \
    --location=us-central1 \
    --configs=KEY1=VALUE1,KEY2=VALUE2 \
    --connect-cluster=mycluster \
    --task-restart-min-backoff=60s \
    --task-restart-max-backoff=30m \
    --task-retry-disabled

gcloud managed-kafka connectors update myconnector \
    --location=us-central1 \
    --config-file=my-config-file.yaml \
    --connect-cluster=mycluster \
    --task-restart-min-backoff=60s \
    --task-restart-max-backoff=30m \
    --task-retry-disabled
```

### gcloud beta managed-kafka connectors create

```text
NAME
    gcloud beta managed-kafka connectors create - create a Managed Service for
        Apache Kafka connector

SYNOPSIS
    gcloud beta managed-kafka connectors create
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        (--config-file=JSON|YAML|FILE | --configs=[KEY=VALUE,...])
        [--task-retry-disabled]
        [--task-restart-max-backoff=TASK_RESTART_MAX_BACKOFF
          --task-restart-min-backoff=TASK_RESTART_MIN_BACKOFF]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka connectors delete

```text
NAME
    gcloud beta managed-kafka connectors delete - delete a Managed Service for
        Apache Kafka connector

SYNOPSIS
    gcloud beta managed-kafka connectors delete
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka connectors describe

```text
NAME
    gcloud beta managed-kafka connectors describe - describe a Managed Service
        for Apache Kafka connector

SYNOPSIS
    gcloud beta managed-kafka connectors describe
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka connectors list

```text
NAME
    gcloud beta managed-kafka connectors list - list all Managed Service for
        Apache Kafka connectors for a given connect cluster

SYNOPSIS
    gcloud beta managed-kafka connectors list
        (CONNECT_CLUSTER : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka connectors pause

```text
NAME
    gcloud beta managed-kafka connectors pause - pauses operation of a Managed
        Service for Apache Kafka connector

SYNOPSIS
    gcloud beta managed-kafka connectors pause
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka connectors restart

```text
NAME
    gcloud beta managed-kafka connectors restart - restarts a Managed Service
        for Apache Kafka connector

SYNOPSIS
    gcloud beta managed-kafka connectors restart
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka connectors resume

```text
NAME
    gcloud beta managed-kafka connectors resume - resumes operation of a
        stopped Managed Service for Apache Kafka connector

SYNOPSIS
    gcloud beta managed-kafka connectors resume
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka connectors stop

```text
NAME
    gcloud beta managed-kafka connectors stop - stops operation of a Managed
        Service for Apache Kafka connector

SYNOPSIS
    gcloud beta managed-kafka connectors stop
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka connectors update

```text
NAME
    gcloud beta managed-kafka connectors update - update a Managed Service for
        Apache Kafka connector

SYNOPSIS
    gcloud beta managed-kafka connectors update
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [--task-retry-disabled]
        [--config-file=JSON|YAML|FILE | --configs=[KEY=VALUE,...]]
        [--task-restart-max-backoff=TASK_RESTART_MAX_BACKOFF
          --task-restart-min-backoff=TASK_RESTART_MIN_BACKOFF]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka connectors create

```text
NAME
    gcloud alpha managed-kafka connectors create - create a Managed Service for
        Apache Kafka connector

SYNOPSIS
    gcloud alpha managed-kafka connectors create
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        (--config-file=JSON|YAML|FILE | --configs=[KEY=VALUE,...])
        [--task-retry-disabled]
        [--task-restart-max-backoff=TASK_RESTART_MAX_BACKOFF
          --task-restart-min-backoff=TASK_RESTART_MIN_BACKOFF]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka connectors delete

```text
NAME
    gcloud alpha managed-kafka connectors delete - delete a Managed Service for
        Apache Kafka connector

SYNOPSIS
    gcloud alpha managed-kafka connectors delete
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka connectors describe

```text
NAME
    gcloud alpha managed-kafka connectors describe - describe a Managed Service
        for Apache Kafka connector

SYNOPSIS
    gcloud alpha managed-kafka connectors describe
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka connectors list

```text
NAME
    gcloud alpha managed-kafka connectors list - list all Managed Service for
        Apache Kafka connectors for a given connect cluster

SYNOPSIS
    gcloud alpha managed-kafka connectors list
        (CONNECT_CLUSTER : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka connectors pause

```text
NAME
    gcloud alpha managed-kafka connectors pause - pauses operation of a Managed
        Service for Apache Kafka connector

SYNOPSIS
    gcloud alpha managed-kafka connectors pause
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka connectors restart

```text
NAME
    gcloud alpha managed-kafka connectors restart - restarts a Managed Service
        for Apache Kafka connector

SYNOPSIS
    gcloud alpha managed-kafka connectors restart
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka connectors resume

```text
NAME
    gcloud alpha managed-kafka connectors resume - resumes operation of a
        stopped Managed Service for Apache Kafka connector

SYNOPSIS
    gcloud alpha managed-kafka connectors resume
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka connectors stop

```text
NAME
    gcloud alpha managed-kafka connectors stop - stops operation of a Managed
        Service for Apache Kafka connector

SYNOPSIS
    gcloud alpha managed-kafka connectors stop
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka connectors update

```text
NAME
    gcloud alpha managed-kafka connectors update - update a Managed Service for
        Apache Kafka connector

SYNOPSIS
    gcloud alpha managed-kafka connectors update
        (CONNECTOR : --connect-cluster=CONNECT_CLUSTER --location=LOCATION)
        [--task-retry-disabled]
        [--config-file=JSON|YAML|FILE | --configs=[KEY=VALUE,...]]
        [--task-restart-max-backoff=TASK_RESTART_MAX_BACKOFF
          --task-restart-min-backoff=TASK_RESTART_MIN_BACKOFF]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): optional flags shown in square brackets in the example are written without the brackets.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `--configs` values end with `...` (`cps.subscription="my-subscription",...` and `KEY1=VALUE1,KEY2=VALUE2...`) to mean "more keys"; gcloud 593.0.0 rejects `...` ("Bad syntax for dict arg"), so the runnable forms drop it.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` and `update` examples end the `--configs` form with `OR` before the `--config-file` form; the runnable forms show the two alternatives as separate commands without `OR`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples pass `--task-retry-disabled=true`, but `--task-retry-disabled` is a boolean flag that takes no value (gcloud 593.0.0: "argument --task-retry-disabled: ignored explicit argument 'true'"); the runnable forms pass `--task-retry-disabled`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/connectors (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

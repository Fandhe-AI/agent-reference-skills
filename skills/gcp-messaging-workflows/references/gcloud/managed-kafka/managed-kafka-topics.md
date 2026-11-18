---
source: https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/topics
---

# gcloud managed-kafka topics

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud managed-kafka topics create

```text
NAME
    gcloud managed-kafka topics create - create a Managed Service for Apache
        Kafka topic

SYNOPSIS
    gcloud managed-kafka topics create
        (TOPIC : --cluster=CLUSTER --location=LOCATION) --partitions=PARTITIONS
        --replication-factor=REPLICATION_FACTOR [--configs=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Managed Service for Apache Kafka topic.

EXAMPLES
    To create a topic in a cluster named mycluster located in us-central1, run
    the following:

        $ gcloud managed-kafka topics create mytopic --cluster=mycluster \
            --location=us-central1 --partitions=1 --replication-factor=3

POSITIONAL ARGUMENTS
     Topic resource - Identifies the name of the topic that this command
     creates. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument topic on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TOPIC
          ID of the topic or fully qualified identifier for the topic.

          To set the topic attribute:
          + provide the argument topic on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster name.

          To set the cluster attribute:
          + provide the argument topic on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument topic on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --partitions=PARTITIONS
        The number of partitions in a topic. You can increase the partition
        count for a topic, but you cannot decrease it. Increasing partitions
        for a topic that uses a key might change how messages are distributed.

     --replication-factor=REPLICATION_FACTOR
        The number of replicas of each partition. A replication factor of 3 is
        recommended for high availability.

OPTIONAL FLAGS
     --configs=[KEY=VALUE,...]
        Configuration for the topic that are overridden from the cluster
        defaults. The key of the map is a Kafka topic property name, for
        example: cleanup.policy=compact,compression.type=producer. If you
        provide a map with a key that already exists, only that configuration
        is updated. If the map contains a key that does not exist, the entry is
        appended to the topic configuration.

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

        $ gcloud alpha managed-kafka topics create

        $ gcloud beta managed-kafka topics create
```

### gcloud managed-kafka topics delete

```text
NAME
    gcloud managed-kafka topics delete - delete a Managed Service for Apache
        Kafka topic

SYNOPSIS
    gcloud managed-kafka topics delete
        (TOPIC : --cluster=CLUSTER --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Managed Service for Apache Kafka topic.

EXAMPLES
    To delete a topic in a cluster named mycluster located in us-central1, run
    the following:

        $ gcloud managed-kafka topics delete mytopic --cluster=mycluster \
            --location=us-central1

POSITIONAL ARGUMENTS
     Topic resource - Identifies the topic for deletion. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument topic on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TOPIC
          ID of the topic or fully qualified identifier for the topic.

          To set the topic attribute:
          + provide the argument topic on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster name.

          To set the cluster attribute:
          + provide the argument topic on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument topic on the command line with a fully
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

        $ gcloud alpha managed-kafka topics delete

        $ gcloud beta managed-kafka topics delete
```

### gcloud managed-kafka topics describe

```text
NAME
    gcloud managed-kafka topics describe - describe a Managed Service for
        Apache Kafka topic

SYNOPSIS
    gcloud managed-kafka topics describe
        (TOPIC : --cluster=CLUSTER --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Managed Service for Apache Kafka topic.

EXAMPLES
    To describe a topic in a cluster named mycluster located in us-central1,
    run the following:

        $ gcloud managed-kafka topics describe mytopic --cluster=mycluster \
            --location=us-central1

POSITIONAL ARGUMENTS
     Topic resource - The describe command displays properties of the topic
     specified by this parameter. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument topic on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TOPIC
          ID of the topic or fully qualified identifier for the topic.

          To set the topic attribute:
          + provide the argument topic on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster name.

          To set the cluster attribute:
          + provide the argument topic on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument topic on the command line with a fully
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

        $ gcloud alpha managed-kafka topics describe

        $ gcloud beta managed-kafka topics describe
```

### gcloud managed-kafka topics list

```text
NAME
    gcloud managed-kafka topics list - list all Managed Service for Apache
        Kafka topics in a given cluster

SYNOPSIS
    gcloud managed-kafka topics list (CLUSTER : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Managed Service for Apache Kafka topics in a given cluster. To
    specify the maximum number of topics to list, use the --limit flag.

EXAMPLES
    To list all topics in a cluster named mycluster located in us-central1, run
    the following:

        $ gcloud managed-kafka topics list mycluster --location=us-central1

POSITIONAL ARGUMENTS
     Cluster resource - Identifies the cluster which contains all the topics to
     be listed. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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

        $ gcloud alpha managed-kafka topics list

        $ gcloud beta managed-kafka topics list
```

### gcloud managed-kafka topics update

```text
NAME
    gcloud managed-kafka topics update - update a Managed Service for Apache
        Kafka topic

SYNOPSIS
    gcloud managed-kafka topics update
        (TOPIC : --cluster=CLUSTER --location=LOCATION)
        (--partitions=PARTITIONS --clear-configs | --configs=[KEY=VALUE,...])
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Managed Service for Apache Kafka topic.

EXAMPLES
    To update an attribute in a topic, such as the partitions, for a cluster
    named mycluster located in us-central1, run the following:

        $ gcloud managed-kafka topics update mytopic --cluster=mycluster \
            --location=us-central1 --partitions=3

POSITIONAL ARGUMENTS
     Topic resource - Identifies the topic to be updated. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument topic on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TOPIC
          ID of the topic or fully qualified identifier for the topic.

          To set the topic attribute:
          + provide the argument topic on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster name.

          To set the cluster attribute:
          + provide the argument topic on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument topic on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     At least one of these must be specified:

       --partitions=PARTITIONS
          The number of partitions in a topic. You can increase the partition
          count for a topic, but you cannot decrease it. Increasing partitions
          for a topic that uses a key might change how messages are
          distributed.

       At most one of these can be specified:

         --clear-configs
            Remove all the configurations for the topic.

         --configs=[KEY=VALUE,...]
            Configuration for the topic that are overridden from the cluster
            defaults. The key of the map is a Kafka topic property name, for
            example: cleanup.policy=compact,compression.type=producer. If you
            provide a map with a key that already exists, only that
            configuration is updated. If the map contains a key that does not
            exist, the entry is appended to the topic configuration.

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

        $ gcloud alpha managed-kafka topics update

        $ gcloud beta managed-kafka topics update
```

### gcloud beta managed-kafka topics create

```text
NAME
    gcloud beta managed-kafka topics create - create a Managed Service for
        Apache Kafka topic

SYNOPSIS
    gcloud beta managed-kafka topics create
        (TOPIC : --cluster=CLUSTER --location=LOCATION) --partitions=PARTITIONS
        --replication-factor=REPLICATION_FACTOR [--configs=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka topics delete

```text
NAME
    gcloud beta managed-kafka topics delete - delete a Managed Service for
        Apache Kafka topic

SYNOPSIS
    gcloud beta managed-kafka topics delete
        (TOPIC : --cluster=CLUSTER --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka topics describe

```text
NAME
    gcloud beta managed-kafka topics describe - describe a Managed Service for
        Apache Kafka topic

SYNOPSIS
    gcloud beta managed-kafka topics describe
        (TOPIC : --cluster=CLUSTER --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka topics list

```text
NAME
    gcloud beta managed-kafka topics list - list all Managed Service for Apache
        Kafka topics in a given cluster

SYNOPSIS
    gcloud beta managed-kafka topics list (CLUSTER : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka topics update

```text
NAME
    gcloud beta managed-kafka topics update - update a Managed Service for
        Apache Kafka topic

SYNOPSIS
    gcloud beta managed-kafka topics update
        (TOPIC : --cluster=CLUSTER --location=LOCATION)
        (--partitions=PARTITIONS --clear-configs | --configs=[KEY=VALUE,...])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka topics create

```text
NAME
    gcloud alpha managed-kafka topics create - create a Managed Service for
        Apache Kafka topic

SYNOPSIS
    gcloud alpha managed-kafka topics create
        (TOPIC : --cluster=CLUSTER --location=LOCATION) --partitions=PARTITIONS
        --replication-factor=REPLICATION_FACTOR [--configs=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka topics delete

```text
NAME
    gcloud alpha managed-kafka topics delete - delete a Managed Service for
        Apache Kafka topic

SYNOPSIS
    gcloud alpha managed-kafka topics delete
        (TOPIC : --cluster=CLUSTER --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka topics describe

```text
NAME
    gcloud alpha managed-kafka topics describe - describe a Managed Service for
        Apache Kafka topic

SYNOPSIS
    gcloud alpha managed-kafka topics describe
        (TOPIC : --cluster=CLUSTER --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka topics list

```text
NAME
    gcloud alpha managed-kafka topics list - list all Managed Service for
        Apache Kafka topics in a given cluster

SYNOPSIS
    gcloud alpha managed-kafka topics list (CLUSTER : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka topics update

```text
NAME
    gcloud alpha managed-kafka topics update - update a Managed Service for
        Apache Kafka topic

SYNOPSIS
    gcloud alpha managed-kafka topics update
        (TOPIC : --cluster=CLUSTER --location=LOCATION)
        (--partitions=PARTITIONS --clear-configs | --configs=[KEY=VALUE,...])
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/topics (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

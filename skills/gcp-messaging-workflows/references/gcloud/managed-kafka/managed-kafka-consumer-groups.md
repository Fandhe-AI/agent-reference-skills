---
source: https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/consumer-groups
---

# gcloud managed-kafka consumer-groups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud managed-kafka consumer-groups delete

```text
NAME
    gcloud managed-kafka consumer-groups delete - delete a Managed Service for
        Apache Kafka consumer group

SYNOPSIS
    gcloud managed-kafka consumer-groups delete
        (CONSUMER_GROUP : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Managed Service for Apache Kafka consumer group.

EXAMPLES
    To delete a consumer group in a cluster named mycluster located in
    us-central1, run the following:

        $ gcloud managed-kafka consumer-groups delete myconsumergroup \
            --cluster=mycluster --location=us-central1

POSITIONAL ARGUMENTS
     Consumer group resource - Identifies the consumer group for deletion. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument consumer_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONSUMER_GROUP
          ID of the consumer_group or fully qualified identifier for the
          consumer_group.

          To set the consumer_group attribute:
          + provide the argument consumer_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster name.

          To set the cluster attribute:
          + provide the argument consumer_group on the command line with a
            fully specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument consumer_group on the command line with a
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

        $ gcloud alpha managed-kafka consumer-groups delete

        $ gcloud beta managed-kafka consumer-groups delete
```

### gcloud managed-kafka consumer-groups describe

```text
NAME
    gcloud managed-kafka consumer-groups describe - describe a Managed Service
        for Apache Kafka consumer group

SYNOPSIS
    gcloud managed-kafka consumer-groups describe
        (CONSUMER_GROUP : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Managed Service for Apache Kafka consumer group.

EXAMPLES
    To describe a consumer group in a cluster named mycluster located in
    us-central1, run the following:

        $ gcloud managed-kafka consumer-groups describe myconsumergroup \
            --cluster=mycluster --location=us-central1

POSITIONAL ARGUMENTS
     Consumer group resource - Identifies the consumer group for details to be
     displayed. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument consumer_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONSUMER_GROUP
          ID of the consumer_group or fully qualified identifier for the
          consumer_group.

          To set the consumer_group attribute:
          + provide the argument consumer_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster name.

          To set the cluster attribute:
          + provide the argument consumer_group on the command line with a
            fully specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument consumer_group on the command line with a
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

        $ gcloud alpha managed-kafka consumer-groups describe

        $ gcloud beta managed-kafka consumer-groups describe
```

### gcloud managed-kafka consumer-groups list

```text
NAME
    gcloud managed-kafka consumer-groups list - list all Managed Service for
        Apache Kafka consumer groups in a given cluster and location

SYNOPSIS
    gcloud managed-kafka consumer-groups list (CLUSTER : --location=LOCATION)
        [--view=VIEW] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Managed Service for Apache Kafka consumer groups in a given
    cluster and location. To specify the maximum number of consumer groups to
    list, use the --limit flag.

EXAMPLES
    To list all consumer groups in a cluster named mycluster located in
    us-central1, run the following:

        $ gcloud managed-kafka consumer-groups list mycluster \
            --location=us-central1

POSITIONAL ARGUMENTS
     Cluster resource - Identifies the cluster which contains all the consumer
     groups to be listed. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
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

FLAGS
     --view=VIEW
        The level of detail to return for consumer groups. VIEW must be one of:

         basic
            Include only the names of consumer groups.
         full
            Include all available fields (topics, partitions).

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

        $ gcloud alpha managed-kafka consumer-groups list

        $ gcloud beta managed-kafka consumer-groups list
```

### gcloud managed-kafka consumer-groups update

```text
NAME
    gcloud managed-kafka consumer-groups update - update a Managed Service for
        Apache Kafka consumer group

SYNOPSIS
    gcloud managed-kafka consumer-groups update
        (CONSUMER_GROUP : --cluster=CLUSTER --location=LOCATION)
        --topics-file=JSON|YAML|FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Managed Service for Apache Kafka consumer group.

EXAMPLES
    To specify a file for updating the topics of a consumer group, run the
    following:

        $gcloud managed-kafka consumer-groups update myconsumergroup |
            --cluster=mycluster \
            --location=us-central1 \
            --topics-file=topics.json

    To update the topics of a consumer group with inline JSON, run the
    following:

        $gcloud managed-kafka consumer-groups update myconsumergroup |
            --cluster=mycluster \
            --location=us-central1 \
            --topics-file='{"topic":{"partitions":{"0":{"offset":1,"metadata":"metadata"}}}}'

POSITIONAL ARGUMENTS
     Consumer group resource - Identifies the consumer group to be updated. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument consumer_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONSUMER_GROUP
          ID of the consumer_group or fully qualified identifier for the
          consumer_group.

          To set the consumer_group attribute:
          + provide the argument consumer_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster name.

          To set the cluster attribute:
          + provide the argument consumer_group on the command line with a
            fully specified name;
          + provide the argument --cluster on the command line.

       --location=LOCATION
          ID of the location of the Managed Service for Apache Kafka resource.
          See
          https://cloud.google.com/managed-service-for-apache-kafka/docs/locations
          for a list of supported locations.

          To set the location attribute:
          + provide the argument consumer_group on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --topics-file=JSON|YAML|FILE
        The path to the JSON or YAML file containing the configuration of the
        topics to be updated for the consumer group. This also supports inline
        JSON or YAML. Required, sets topics_file value.

        Input Example:

            --topics-file=string

        File Example:

            --topics-file=path_to_file.(yaml|json)

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

        $ gcloud alpha managed-kafka consumer-groups update

        $ gcloud beta managed-kafka consumer-groups update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud managed-kafka consumer-groups update myconsumergroup \
    --cluster=mycluster \
    --location=us-central1 \
    --topics-file=topics.json

gcloud managed-kafka consumer-groups update myconsumergroup \
    --cluster=mycluster \
    --location=us-central1 \
    --topics-file='{"topic":{"partitions":{"0":{"offset":1,"metadata":"metadata"}}}}'
```

### gcloud beta managed-kafka consumer-groups delete

```text
NAME
    gcloud beta managed-kafka consumer-groups delete - delete a Managed Service
        for Apache Kafka consumer group

SYNOPSIS
    gcloud beta managed-kafka consumer-groups delete
        (CONSUMER_GROUP : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka consumer-groups describe

```text
NAME
    gcloud beta managed-kafka consumer-groups describe - describe a Managed
        Service for Apache Kafka consumer group

SYNOPSIS
    gcloud beta managed-kafka consumer-groups describe
        (CONSUMER_GROUP : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka consumer-groups list

```text
NAME
    gcloud beta managed-kafka consumer-groups list - list all Managed Service
        for Apache Kafka consumer groups in a given cluster and location

SYNOPSIS
    gcloud beta managed-kafka consumer-groups list
        (CLUSTER : --location=LOCATION) [--view=VIEW] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka consumer-groups update

```text
NAME
    gcloud beta managed-kafka consumer-groups update - update a Managed Service
        for Apache Kafka consumer group

SYNOPSIS
    gcloud beta managed-kafka consumer-groups update
        (CONSUMER_GROUP : --cluster=CLUSTER --location=LOCATION)
        --topics-file=JSON|YAML|FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka consumer-groups delete

```text
NAME
    gcloud alpha managed-kafka consumer-groups delete - delete a Managed
        Service for Apache Kafka consumer group

SYNOPSIS
    gcloud alpha managed-kafka consumer-groups delete
        (CONSUMER_GROUP : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka consumer-groups describe

```text
NAME
    gcloud alpha managed-kafka consumer-groups describe - describe a Managed
        Service for Apache Kafka consumer group

SYNOPSIS
    gcloud alpha managed-kafka consumer-groups describe
        (CONSUMER_GROUP : --cluster=CLUSTER --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka consumer-groups list

```text
NAME
    gcloud alpha managed-kafka consumer-groups list - list all Managed Service
        for Apache Kafka consumer groups in a given cluster and location

SYNOPSIS
    gcloud alpha managed-kafka consumer-groups list
        (CLUSTER : --location=LOCATION) [--view=VIEW] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka consumer-groups update

```text
NAME
    gcloud alpha managed-kafka consumer-groups update - update a Managed
        Service for Apache Kafka consumer group

SYNOPSIS
    gcloud alpha managed-kafka consumer-groups update
        (CONSUMER_GROUP : --cluster=CLUSTER --location=LOCATION)
        --topics-file=JSON|YAML|FILE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the two `update` examples start with `$gcloud` (no space after the prompt) and end their first line with `|` instead of the continuation `\`, so a shell pipes `gcloud managed-kafka consumer-groups update myconsumergroup` into a separate `--cluster=mycluster ...` command and the update gets none of the required flags; the runnable form drops the prompt and joins the lines.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/consumer-groups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

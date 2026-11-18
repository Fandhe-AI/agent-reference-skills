---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/lite-topics
---

# gcloud pubsub lite-topics

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub lite-topics create

```text
NAME
    gcloud pubsub lite-topics create - create a Pub/Sub Lite topic

SYNOPSIS
    gcloud pubsub lite-topics create TOPIC --partitions=PARTITIONS
        --per-partition-bytes=PER_PARTITION_BYTES [--location=LOCATION]
        [--message-retention-period=MESSAGE_RETENTION_PERIOD]
        [--per-partition-publish-mib=PER_PARTITION_PUBLISH_MIB]
        [--per-partition-subscribe-mib=PER_PARTITION_SUBSCRIBE_MIB]
        [--throughput-reservation=THROUGHPUT_RESERVATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Pub/Sub Lite topic.

EXAMPLES
    To create a Pub/Sub lite-topic, run:

        $ gcloud pubsub lite-topics create mytopic \
          --location=us-central1-a --partitions=1 \
          --per-partition-bytes=30GiB --message-retention-period=2w

POSITIONAL ARGUMENTS
     TOPIC
        Topic ID.

REQUIRED FLAGS
     --partitions=PARTITIONS
        Number of partitions in the topic.

     --per-partition-bytes=PER_PARTITION_BYTES
        Provisioned storage, in bytes, per partition. If the number of bytes
        stored in any of the topic's partitions exceeds this value, older
        messages will be dropped to make room for newer ones, regardless of the
        value of message-retention-period. A valid example value of this flag
        would be per-partition-bytes=30GiB.

OPTIONAL FLAGS
     Location resource - Identifies the Cloud zone this command will be
     executed on. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --zone on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * provide the argument --zone on the command line.

     --message-retention-period=MESSAGE_RETENTION_PERIOD
        How long a published message is retained. If unset, messages will only
        be dropped to make space for new ones once the per-partition-bytes
        limit is reached. A valid example value of this flag would be
        message-retention-period="2w".

     --per-partition-publish-mib=PER_PARTITION_PUBLISH_MIB
        Topic partition publish throughput capacity in MiB/s. Must be between 4
        and 16.

     --per-partition-subscribe-mib=PER_PARTITION_SUBSCRIBE_MIB
        Topic partition subscribe throughput capacity in MiB/s. Must be between
        4 and 32.

     --throughput-reservation=THROUGHPUT_RESERVATION
        Reservation ID to use for topic throughput.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the pubsublite/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/pubsub/lite/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-topics create

        $ gcloud beta pubsub lite-topics create
```

### gcloud pubsub lite-topics delete

```text
NAME
    gcloud pubsub lite-topics delete - delete a Pub/Sub Lite topic

SYNOPSIS
    gcloud pubsub lite-topics delete (TOPIC : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Pub/Sub Lite topic.

EXAMPLES
    To delete a Pub/Sub Lite topic, run:

        $ gcloud pubsub lite-topics delete mytopic --location=us-central1-a

POSITIONAL ARGUMENTS
     Topic resource - Topic to delete. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
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

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument topic on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + provide the argument --zone on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the pubsublite/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/pubsub/lite/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-topics delete

        $ gcloud beta pubsub lite-topics delete
```

### gcloud pubsub lite-topics describe

```text
NAME
    gcloud pubsub lite-topics describe - describe a Pub/Sub Lite topic

SYNOPSIS
    gcloud pubsub lite-topics describe (TOPIC : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Pub/Sub Lite topic.

EXAMPLES
    To describe a Pub/Sub Lite topic, run:

        $ gcloud pubsub lite-topics describe mytopic --location=us-central1-a

POSITIONAL ARGUMENTS
     Topic resource - Topic to describe. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

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

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument topic on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + provide the argument --zone on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the pubsublite/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/pubsub/lite/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-topics describe

        $ gcloud beta pubsub lite-topics describe
```

### gcloud pubsub lite-topics list

```text
NAME
    gcloud pubsub lite-topics list - list Pub/Sub Lite topics

SYNOPSIS
    gcloud pubsub lite-topics list [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Pub/Sub Lite topics.

EXAMPLES
    To list Pub/Sub Lite topics, run:

        $ gcloud pubsub lite-topics list --location=us-central1-a --limit=5

FLAGS
     Location resource - Zone to list topics for. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --zone on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * provide the argument --zone on the command line.

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
    This command uses the pubsublite/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/pubsub/lite/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-topics list

        $ gcloud beta pubsub lite-topics list
```

### gcloud pubsub lite-topics list-subscriptions

```text
NAME
    gcloud pubsub lite-topics list-subscriptions - list Pub/Sub Lite
        subscriptions for a given Lite topic

SYNOPSIS
    gcloud pubsub lite-topics list-subscriptions (TOPIC : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Pub/Sub Lite subscriptions for a given Lite topic.

EXAMPLES
    To list Pub/Sub Lite subscriptions for a given Lite topic, run:

        $ gcloud pubsub lite-topics list-subscriptions mytopic \
          --location=us-central1-a

POSITIONAL ARGUMENTS
     Topic resource - Topic to list subscriptions for. The arguments in this
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

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument topic on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + provide the argument --zone on the command line.

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
    This command uses the pubsublite/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/pubsub/lite/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-topics list-subscriptions

        $ gcloud beta pubsub lite-topics list-subscriptions
```

### gcloud pubsub lite-topics publish

```text
NAME
    gcloud pubsub lite-topics publish - publish Pub/Sub Lite messages

SYNOPSIS
    gcloud pubsub lite-topics publish (TOPIC : --location=LOCATION)
        [--attributes=[KEY=VALUE,...]] [--event-time=DATETIME]
        [--message=MESSAGE] [--ordering-key=ORDERING_KEY]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Publishes a message to the specified Pub/Sub Lite topic. This command
    requires Python 3.6 or greater, and requires the grpcio Python package to
    be installed.

    For MacOS, Linux, and Cloud Shell users, to install the gRPC client
    libraries, run:

        $ sudo pip3 install grpcio
        $ export CLOUDSDK_PYTHON_SITEPACKAGES=1

EXAMPLES
    To publish a message to a Pub/Sub Lite topic, run:

        $ gcloud pubsub lite-topics publish mytopic \
            --location=us-central1-a --message="Hello World!"

    To publish a message to a Pub/Sub Lite topic with an ordering key and
    attributes, run:

        $ gcloud pubsub lite-topics publish mytopic \
            --location=us-central1-a --message="Hello World!" \
            --ordering-key="key" --attributes=KEY1=VAL1,KEY2=VAL2

    To publish a message to a Pub/Sub Lite topic with an event time, run:

        $ gcloud pubsub lite-topics publish mytopic \
            --location=us-central1-a --message="Hello World!" \
            --event-time="2021-01-01T12:00:00Z"

POSITIONAL ARGUMENTS
     Topic resource - The pubsub lite topic to publish to. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument topic on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --attributes=[KEY=VALUE,...]
        Comma-separated list of attributes. Each ATTRIBUTE has the form
        name="value". You can specify up to 100 attributes.

     --event-time=DATETIME
        A user-specified event time. Run gcloud topic datetimes for information
        on time formats.

     --message=MESSAGE
        The body of the message to publish to the given topic name.

     --ordering-key=ORDERING_KEY
        A string key, used for ordering delivery to subscribers. All messages
        with the same ordering key will be assigned to the same partition for
        ordered delivery.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-topics publish

        $ gcloud beta pubsub lite-topics publish
```

Adapted (not in the official docs): runnable form of the example(s) above: the commands are rewritten so that they run as described (see Notes).

```bash
GCLOUD_PY="$(gcloud info --format='value(basic.python_location)')"
"$GCLOUD_PY" -m venv "$HOME/.venvs/gcloud-grpc"
"$HOME/.venvs/gcloud-grpc/bin/python" -m pip install grpcio 'setuptools<81'
export CLOUDSDK_PYTHON="$HOME/.venvs/gcloud-grpc/bin/python"
export CLOUDSDK_PYTHON_SITEPACKAGES=1
```

### gcloud pubsub lite-topics update

```text
NAME
    gcloud pubsub lite-topics update - update a Pub/Sub Lite topic

SYNOPSIS
    gcloud pubsub lite-topics update (TOPIC : --location=LOCATION)
        (--message-retention-period=MESSAGE_RETENTION_PERIOD
          --partitions=PARTITIONS --per-partition-bytes=PER_PARTITION_BYTES
          --per-partition-publish-mib=PER_PARTITION_PUBLISH_MIB
          --per-partition-subscribe-mib=PER_PARTITION_SUBSCRIBE_MIB
          --throughput-reservation=THROUGHPUT_RESERVATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Pub/Sub Lite topic.

EXAMPLES
    To update a Pub/Sub Lite topic, run:

        $ gcloud pubsub lite-topics update mytopic \
          --location=us-central1-a --per-partition-publish-mib=10

POSITIONAL ARGUMENTS
     Topic resource - Topic to update. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
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

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument topic on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + provide the argument --zone on the command line.

REQUIRED FLAGS
     At least one of these must be specified:

       --message-retention-period=MESSAGE_RETENTION_PERIOD
          How long a published message is retained. If unset, messages will
          only be dropped to make space for new ones once the
          per-partition-bytes limit is reached. A valid example value of this
          flag would be message-retention-period="2w".

       --partitions=PARTITIONS
          Number of partitions in the topic.

       --per-partition-bytes=PER_PARTITION_BYTES
          Provisioned storage, in bytes, per partition. If the number of bytes
          stored in any of the topic's partitions exceeds this value, older
          messages will be dropped to make room for newer ones, regardless of
          the value of message-retention-period. A valid example value of this
          flag would be per-partition-bytes=30GiB.

       --per-partition-publish-mib=PER_PARTITION_PUBLISH_MIB
          Topic partition publish throughput capacity in MiB/s. Must be between
          4 and 16.

       --per-partition-subscribe-mib=PER_PARTITION_SUBSCRIBE_MIB
          Topic partition subscribe throughput capacity in MiB/s. Must be
          between 4 and 32.

       --throughput-reservation=THROUGHPUT_RESERVATION
          Reservation ID to use for topic throughput.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the pubsublite/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/pubsub/lite/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-topics update

        $ gcloud beta pubsub lite-topics update
```

### gcloud beta pubsub lite-topics create

```text
NAME
    gcloud beta pubsub lite-topics create - create a Pub/Sub Lite topic

SYNOPSIS
    gcloud beta pubsub lite-topics create TOPIC --partitions=PARTITIONS
        --per-partition-bytes=PER_PARTITION_BYTES [--location=LOCATION]
        [--message-retention-period=MESSAGE_RETENTION_PERIOD]
        [--per-partition-publish-mib=PER_PARTITION_PUBLISH_MIB]
        [--per-partition-subscribe-mib=PER_PARTITION_SUBSCRIBE_MIB]
        [--throughput-reservation=THROUGHPUT_RESERVATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-topics delete

```text
NAME
    gcloud beta pubsub lite-topics delete - delete a Pub/Sub Lite topic

SYNOPSIS
    gcloud beta pubsub lite-topics delete (TOPIC : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-topics describe

```text
NAME
    gcloud beta pubsub lite-topics describe - describe a Pub/Sub Lite topic

SYNOPSIS
    gcloud beta pubsub lite-topics describe (TOPIC : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-topics list

```text
NAME
    gcloud beta pubsub lite-topics list - list Pub/Sub Lite topics

SYNOPSIS
    gcloud beta pubsub lite-topics list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-topics list-subscriptions

```text
NAME
    gcloud beta pubsub lite-topics list-subscriptions - list Pub/Sub Lite
        subscriptions for a given Lite topic

SYNOPSIS
    gcloud beta pubsub lite-topics list-subscriptions
        (TOPIC : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-topics publish

```text
NAME
    gcloud beta pubsub lite-topics publish - publish Pub/Sub Lite messages

SYNOPSIS
    gcloud beta pubsub lite-topics publish (TOPIC : --location=LOCATION)
        [--attributes=[KEY=VALUE,...]] [--event-time=DATETIME]
        [--message=MESSAGE] [--ordering-key=ORDERING_KEY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-topics update

```text
NAME
    gcloud beta pubsub lite-topics update - update a Pub/Sub Lite topic

SYNOPSIS
    gcloud beta pubsub lite-topics update (TOPIC : --location=LOCATION)
        (--message-retention-period=MESSAGE_RETENTION_PERIOD
          --partitions=PARTITIONS --per-partition-bytes=PER_PARTITION_BYTES
          --per-partition-publish-mib=PER_PARTITION_PUBLISH_MIB
          --per-partition-subscribe-mib=PER_PARTITION_SUBSCRIBE_MIB
          --throughput-reservation=THROUGHPUT_RESERVATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-topics create

```text
NAME
    gcloud alpha pubsub lite-topics create - create a Pub/Sub Lite topic

SYNOPSIS
    gcloud alpha pubsub lite-topics create TOPIC --partitions=PARTITIONS
        --per-partition-bytes=PER_PARTITION_BYTES [--location=LOCATION]
        [--message-retention-period=MESSAGE_RETENTION_PERIOD]
        [--per-partition-publish-mib=PER_PARTITION_PUBLISH_MIB]
        [--per-partition-subscribe-mib=PER_PARTITION_SUBSCRIBE_MIB]
        [--throughput-reservation=THROUGHPUT_RESERVATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-topics delete

```text
NAME
    gcloud alpha pubsub lite-topics delete - delete a Pub/Sub Lite topic

SYNOPSIS
    gcloud alpha pubsub lite-topics delete (TOPIC : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-topics describe

```text
NAME
    gcloud alpha pubsub lite-topics describe - describe a Pub/Sub Lite topic

SYNOPSIS
    gcloud alpha pubsub lite-topics describe (TOPIC : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-topics list

```text
NAME
    gcloud alpha pubsub lite-topics list - list Pub/Sub Lite topics

SYNOPSIS
    gcloud alpha pubsub lite-topics list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-topics list-subscriptions

```text
NAME
    gcloud alpha pubsub lite-topics list-subscriptions - list Pub/Sub Lite
        subscriptions for a given Lite topic

SYNOPSIS
    gcloud alpha pubsub lite-topics list-subscriptions
        (TOPIC : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-topics publish

```text
NAME
    gcloud alpha pubsub lite-topics publish - publish Pub/Sub Lite messages

SYNOPSIS
    gcloud alpha pubsub lite-topics publish (TOPIC : --location=LOCATION)
        [--attributes=[KEY=VALUE,...]] [--event-time=DATETIME]
        [--message=MESSAGE] [--ordering-key=ORDERING_KEY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-topics update

```text
NAME
    gcloud alpha pubsub lite-topics update - update a Pub/Sub Lite topic

SYNOPSIS
    gcloud alpha pubsub lite-topics update (TOPIC : --location=LOCATION)
        (--message-retention-period=MESSAGE_RETENTION_PERIOD
          --partitions=PARTITIONS --per-partition-bytes=PER_PARTITION_BYTES
          --per-partition-publish-mib=PER_PARTITION_PUBLISH_MIB
          --per-partition-subscribe-mib=PER_PARTITION_SUBSCRIBE_MIB
          --throughput-reservation=THROUGHPUT_RESERVATION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Deprecated: the Pub/Sub Lite documentation says "Pub/Sub Lite is deprecated. Effective January 31, 2027, Pub/Sub Lite will be turned down.", "Pub/Sub Lite is no longer available for new customers after September 24, 2024." and that projects that did not use Pub/Sub Lite between April 15, 2025 and July 15, 2025 cannot access it starting on July 15, 2025; it recommends migrating to Google Cloud Managed Service for Apache Kafka (https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-managed-service-for-apache-kafka) or Pub/Sub (https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-pubsub) (https://docs.cloud.google.com/pubsub/lite/docs, retrieved 2026-11-18). The `gcloud pubsub lite-*` commands are still in the gcloud 593.0.0 help.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the DESCRIPTION of `gcloud pubsub lite-topics publish` installs the gRPC client library with `sudo pip3 install grpcio`, which installs a third-party package into the system Python as root; the runnable form installs it into a virtual environment created from the interpreter that gcloud already uses (`gcloud info --format='value(basic.python_location)'`, so the Python version matches, as `gcloud topic startup` requires for `CLOUDSDK_PYTHON` on macOS archived installs) and points gcloud at it with `CLOUDSDK_PYTHON`. Tested with gcloud 593.0.0 on macOS (Python 3.14): `grpcio` alone was not enough, because the bundled Pub/Sub Lite library imports `pkg_resources`, which setuptools 81 and later no longer provide (its warning says "Refrain from using this package or pin to Setuptools<81"), so the runnable form also installs `setuptools<81`. `gcloud topic startup` says that configuring the interpreter is only supported in specific scenarios; on installs where gcloud manages its own Python, follow that topic.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/lite-topics (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

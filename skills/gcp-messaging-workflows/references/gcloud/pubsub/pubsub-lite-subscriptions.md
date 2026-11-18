---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/lite-subscriptions
---

# gcloud pubsub lite-subscriptions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub lite-subscriptions ack-up-to

```text
NAME
    gcloud pubsub lite-subscriptions ack-up-to - acknowledge messages on a
        Pub/Sub Lite subscription

SYNOPSIS
    gcloud pubsub lite-subscriptions ack-up-to
        (SUBSCRIPTION : --location=LOCATION) --offset=OFFSET
        --partition=PARTITION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Acknowledge all messages on a Pub/Sub Lite subscription up to the provided
    offset. The message corresponding to the provided offset will be included
    in the list of messages that are acknowledged.

EXAMPLES
    To acknowledge messages on a Pub/Sub Lite subscription, run:

        $ gcloud pubsub lite-subscriptions ack-up-to mysubscription \
          --location=us-central1-a --partition=0 --offset=10

POSITIONAL ARGUMENTS
     Subscription resource - Subscription on which to acknowledge messages. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument subscription on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SUBSCRIPTION
          ID of the subscription or fully qualified identifier for the
          subscription.

          To set the subscription attribute:
          + provide the argument subscription on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument subscription on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + provide the argument --zone on the command line.

REQUIRED FLAGS
     --offset=OFFSET
        The offset of a message within a topic partition. Must be greater than
        or equal to 0.

     --partition=PARTITION
        The topic partition. Partitions are zero indexed, so the partition must
        be in the range [0, topic.num_partitions). If you do not know your
        topic.num_partitions, run gcloud pubsub lite-topic describe TOPIC
        --location=ZONE.

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

        $ gcloud alpha pubsub lite-subscriptions ack-up-to

        $ gcloud beta pubsub lite-subscriptions ack-up-to
```

### gcloud pubsub lite-subscriptions create

```text
NAME
    gcloud pubsub lite-subscriptions create - create a Pub/Sub Lite
        subscription

SYNOPSIS
    gcloud pubsub lite-subscriptions create SUBSCRIPTION --topic=TOPIC
        [--delivery-requirement=DELIVERY_REQUIREMENT;
          default="deliver-immediately"] [--location=LOCATION]
        [--event-time=EVENT_TIME | --publish-time=PUBLISH_TIME
          | --starting-offset=STARTING_OFFSET; default="end"]
        [--export-pubsub-topic=EXPORT_PUBSUB_TOPIC
          : --export-dead-letter-topic=EXPORT_DEAD_LETTER_TOPIC
          --export-desired-state=EXPORT_DESIRED_STATE; default="active"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Pub/Sub Lite subscription.

EXAMPLES
    To create a Pub/Sub Lite subscription, run:

        $ gcloud pubsub lite-subscriptions create mysubscription \
          --location=us-central1-a --topic=mytopic

    To create a Pub/Sub Lite subscription at the offset of the oldest retained
    message, run:

        $ gcloud pubsub lite-subscriptions create mysubscription \
          --location=us-central1-a --topic=mytopic \
          --starting-offset=beginning

    To create a Pub/Sub Lite subscription that exports messages from a Pub/Sub
    Lite topic to a Pub/Sub topic, run:

        $ gcloud pubsub lite-subscriptions create mysubscription \
          --location=us-central1-a --topic=mytopic \
          --export-pubsub-topic=pubsubtopic

POSITIONAL ARGUMENTS
     SUBSCRIPTION
        Subscription ID.

REQUIRED FLAGS
     --topic=TOPIC
        Topic ID associated with the subscription.

OPTIONAL FLAGS
     --delivery-requirement=DELIVERY_REQUIREMENT; default="deliver-immediately"
        When this subscription should send messages to subscribers relative to
        messages persistence in storage. See
        https://cloud.google.com/pubsub/lite/docs/subscriptions#creating_lite_subscriptions
        for more info. DELIVERY_REQUIREMENT must be one of:
        deliver-after-stored, deliver-immediately.

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

     At most one of these can be specified:

       --event-time=EVENT_TIME
          The event time to which you seek a subscription. The subscription
          seeks to the first message with event time greater than or equal to
          the specified event time. Messages missing an event time use publish
          time as a fallback. As event times are user supplied, subsequent
          messages may have event times less than the specified event time and
          must be filtered by the client, if necessary. Run $ gcloud topic
          datetimes for information on time formats.

       --publish-time=PUBLISH_TIME
          The publish time to which you seek a subscription. Messages with
          publish time greater than or equal to the specified time are
          delivered after the seek operation. Run $ gcloud topic datetimes for
          information on time formats.

       --starting-offset=STARTING_OFFSET; default="end"
          The offset at which a newly created or seeked subscription starts
          receiving messages. A subscription can be initialized at the offset
          of the oldest retained message (beginning), or at the current HEAD
          offset (end). STARTING_OFFSET must be one of: beginning, end.

     --export-pubsub-topic=EXPORT_PUBSUB_TOPIC
        The name of the destination Pub/Sub topic to which messages are
        exported. Must be the topic's fully specified path if it is not in the
        same project as the subscription to be created.

     --export-dead-letter-topic=EXPORT_DEAD_LETTER_TOPIC
        The name of the Pub/Sub Lite topic to write messages that cannot be
        exported. Must be in the same project and location as the subscription
        to be created. Note that this is a Lite topic.

     --export-desired-state=EXPORT_DESIRED_STATE; default="active"
        The desired state of the export. Process messages by setting the value
        to ACTIVE or pause message processing by setting the value to PAUSED.
        EXPORT_DESIRED_STATE must be one of: active, paused.

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

        $ gcloud alpha pubsub lite-subscriptions create

        $ gcloud beta pubsub lite-subscriptions create
```

### gcloud pubsub lite-subscriptions delete

```text
NAME
    gcloud pubsub lite-subscriptions delete - delete a Pub/Sub Lite
        subscription

SYNOPSIS
    gcloud pubsub lite-subscriptions delete
        (SUBSCRIPTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Pub/Sub Lite subscription.

EXAMPLES
    To delete a Pub/Sub Lite subscription, run:

        $ gcloud pubsub lite-subscriptions delete mysubscription \
          --location=us-central1-a

POSITIONAL ARGUMENTS
     Subscription resource - Subscription to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument subscription on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SUBSCRIPTION
          ID of the subscription or fully qualified identifier for the
          subscription.

          To set the subscription attribute:
          + provide the argument subscription on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument subscription on the command line with a
            fully specified name;
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

        $ gcloud alpha pubsub lite-subscriptions delete

        $ gcloud beta pubsub lite-subscriptions delete
```

### gcloud pubsub lite-subscriptions describe

```text
NAME
    gcloud pubsub lite-subscriptions describe - describe a Pub/Sub Lite
        subscription

SYNOPSIS
    gcloud pubsub lite-subscriptions describe
        (SUBSCRIPTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Pub/Sub Lite subscription.

EXAMPLES
    To describe a Pub/Sub Lite subscription, run:

        $ gcloud pubsub lite-subscriptions describe mysubscription \
          --location=us-central1-a

POSITIONAL ARGUMENTS
     Subscription resource - Subscription to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument subscription on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SUBSCRIPTION
          ID of the subscription or fully qualified identifier for the
          subscription.

          To set the subscription attribute:
          + provide the argument subscription on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument subscription on the command line with a
            fully specified name;
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

        $ gcloud alpha pubsub lite-subscriptions describe

        $ gcloud beta pubsub lite-subscriptions describe
```

### gcloud pubsub lite-subscriptions list

```text
NAME
    gcloud pubsub lite-subscriptions list - list Pub/Sub Lite subscriptions

SYNOPSIS
    gcloud pubsub lite-subscriptions list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Pub/Sub Lite subscriptions.

EXAMPLES
    To list Pub/Sub Lite subscriptions, run:

        $ gcloud pubsub lite-subscriptions list --location=us-central1-a \
          --limit=5

FLAGS
     Location resource - ID of the location or fully qualified identifier for
     the location. This represents a Cloud resource. (NOTE) Some attributes are
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

        $ gcloud alpha pubsub lite-subscriptions list

        $ gcloud beta pubsub lite-subscriptions list
```

### gcloud pubsub lite-subscriptions seek

```text
NAME
    gcloud pubsub lite-subscriptions seek - seek a Pub/Sub Lite subscription

SYNOPSIS
    gcloud pubsub lite-subscriptions seek (SUBSCRIPTION : --location=LOCATION)
        (--event-time=EVENT_TIME | --publish-time=PUBLISH_TIME
          | --starting-offset=STARTING_OFFSET) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Initiate an out-of-band seek operation for a Pub/Sub Lite subscription to a
    specified target, which may be timestamps or named locations within the
    message backlog.

    The seek operation will complete once subscriber clients react to the seek
    for all partitions of the topic. Note that the seek operation will not
    complete until subscribers are online. It may take some time (usually
    within 30 seconds) for the seek to propagate if subscribers are online. Use
    the --async flag if it's not necessary to wait for completion.

EXAMPLES
    To seek a Pub/Sub Lite subscription to the beginning of the message
    backlog, run:

        $ gcloud pubsub lite-subscriptions seek mysubscription \
          --location=us-central1-a --starting-offset=beginning

    To seek a Pub/Sub Lite subscription to a publish time without waiting for
    the operation to complete, run:

        $ gcloud pubsub lite-subscriptions seek mysubscription \
          --location=us-central1-a --publish-time="2021-01-01T12:00:00Z" \
          --async

POSITIONAL ARGUMENTS
     Subscription resource - Subscription to seek. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument subscription on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SUBSCRIPTION
          ID of the subscription or fully qualified identifier for the
          subscription.

          To set the subscription attribute:
          + provide the argument subscription on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument subscription on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --event-time=EVENT_TIME
          The event time to which you seek a subscription. The subscription
          seeks to the first message with event time greater than or equal to
          the specified event time. Messages missing an event time use publish
          time as a fallback. As event times are user supplied, subsequent
          messages may have event times less than the specified event time and
          must be filtered by the client, if necessary. Run $ gcloud topic
          datetimes for information on time formats.

       --publish-time=PUBLISH_TIME
          The publish time to which you seek a subscription. Messages with
          publish time greater than or equal to the specified time are
          delivered after the seek operation. Run $ gcloud topic datetimes for
          information on time formats.

       --starting-offset=STARTING_OFFSET
          The offset at which a newly created or seeked subscription starts
          receiving messages. A subscription can be initialized at the offset
          of the oldest retained message (beginning), or at the current HEAD
          offset (end). STARTING_OFFSET must be one of: beginning, end.

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
    This command uses the pubsublite/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/pubsub/lite/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-subscriptions seek

        $ gcloud beta pubsub lite-subscriptions seek
```

### gcloud pubsub lite-subscriptions subscribe

```text
NAME
    gcloud pubsub lite-subscriptions subscribe - stream messages from a Pub/Sub
        Lite subscription

SYNOPSIS
    gcloud pubsub lite-subscriptions subscribe
        (SUBSCRIPTION : --location=LOCATION) [--auto-ack]
        [--num-messages=NUM_MESSAGES; default=1] [--partitions=[INT,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Streams messages from a Pub/Sub Lite subscription. This command requires
    Python 3.6 or greater, and requires the grpcio Python package to be
    installed.

    For MacOS, Linux, and Cloud Shell users, to install the gRPC client
    libraries, run:

        $ sudo pip3 install grpcio
        $ export CLOUDSDK_PYTHON_SITEPACKAGES=1

EXAMPLES
    To subscribe to a Pub/Sub Lite subscription and automatically acknowledge
    messages, run:

        $ gcloud pubsub lite-subscriptions subscribe mysubscription \
            --location=us-central1-a --auto-ack

    To subscribe to specific partitions in a subscription, run:

        $ gcloud pubsub lite-subscriptions subscribe mysubscription \
            --location=us-central1-a --partitions=0,1,2

POSITIONAL ARGUMENTS
     Subscription resource - The Pub/Sub Lite subscription to receive messages
     from. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument subscription on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SUBSCRIPTION
          ID of the subscription or fully qualified identifier for the
          subscription.

          To set the subscription attribute:
          + provide the argument subscription on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument subscription on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --auto-ack
        Automatically ACK every message received on this subscription.

     --num-messages=NUM_MESSAGES; default=1
        The number of messages to stream before exiting. This value must be
        less than or equal to 1000.

     --partitions=[INT,...]
        The partitions this subscriber should connect to to receive messages.
        If empty, partitions will be automatically assigned.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-subscriptions subscribe

        $ gcloud beta pubsub lite-subscriptions subscribe
```

### gcloud pubsub lite-subscriptions update

```text
NAME
    gcloud pubsub lite-subscriptions update - update a Pub/Sub Lite
        subscription

SYNOPSIS
    gcloud pubsub lite-subscriptions update
        (SUBSCRIPTION : --location=LOCATION)
        (--delivery-requirement=DELIVERY_REQUIREMENT
          --export-dead-letter-topic=EXPORT_DEAD_LETTER_TOPIC
          --export-desired-state=EXPORT_DESIRED_STATE
          --export-pubsub-topic=EXPORT_PUBSUB_TOPIC) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Pub/Sub Lite subscription.

EXAMPLES
    To update a Pub/Sub Lite subscription, run:

        $ gcloud pubsub lite-subscriptions update mysubscription \
          --location=us-central1-a \
          --delivery-requirement=DELIVER_IMMEDIATELY

POSITIONAL ARGUMENTS
     Subscription resource - Subscription to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument subscription on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SUBSCRIPTION
          ID of the subscription or fully qualified identifier for the
          subscription.

          To set the subscription attribute:
          + provide the argument subscription on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument subscription on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + provide the argument --zone on the command line.

REQUIRED FLAGS
     At least one of these must be specified:

       --delivery-requirement=DELIVERY_REQUIREMENT
          When this subscription should send messages to subscribers relative
          to messages persistence in storage. See
          https://cloud.google.com/pubsub/lite/docs/subscriptions#creating_lite_subscriptions
          for more info. DELIVERY_REQUIREMENT must be one of:
          deliver-after-stored, deliver-immediately.

       --export-dead-letter-topic=EXPORT_DEAD_LETTER_TOPIC
          The name of the Pub/Sub Lite topic to write messages that cannot be
          exported. Must be in the same project and location as the
          subscription to be created. Note that this is a Lite topic.

       --export-desired-state=EXPORT_DESIRED_STATE
          The desired state of the export. Process messages by setting the
          value to ACTIVE or pause message processing by setting the value to
          PAUSED. EXPORT_DESIRED_STATE must be one of: active, paused.

       --export-pubsub-topic=EXPORT_PUBSUB_TOPIC
          The name of the destination Pub/Sub topic to which messages are
          exported. Must be the topic's fully specified path if it is not in
          the same project as the subscription to be created.

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

        $ gcloud alpha pubsub lite-subscriptions update

        $ gcloud beta pubsub lite-subscriptions update
```

### gcloud beta pubsub lite-subscriptions ack-up-to

```text
NAME
    gcloud beta pubsub lite-subscriptions ack-up-to - acknowledge messages on a
        Pub/Sub Lite subscription

SYNOPSIS
    gcloud beta pubsub lite-subscriptions ack-up-to
        (SUBSCRIPTION : --location=LOCATION) --offset=OFFSET
        --partition=PARTITION [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-subscriptions create

```text
NAME
    gcloud beta pubsub lite-subscriptions create - create a Pub/Sub Lite
        subscription

SYNOPSIS
    gcloud beta pubsub lite-subscriptions create SUBSCRIPTION --topic=TOPIC
        [--delivery-requirement=DELIVERY_REQUIREMENT;
          default="deliver-immediately"] [--location=LOCATION]
        [--event-time=EVENT_TIME | --publish-time=PUBLISH_TIME
          | --starting-offset=STARTING_OFFSET; default="end"]
        [--export-pubsub-topic=EXPORT_PUBSUB_TOPIC
          : --export-dead-letter-topic=EXPORT_DEAD_LETTER_TOPIC
          --export-desired-state=EXPORT_DESIRED_STATE; default="active"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-subscriptions delete

```text
NAME
    gcloud beta pubsub lite-subscriptions delete - delete a Pub/Sub Lite
        subscription

SYNOPSIS
    gcloud beta pubsub lite-subscriptions delete
        (SUBSCRIPTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-subscriptions describe

```text
NAME
    gcloud beta pubsub lite-subscriptions describe - describe a Pub/Sub Lite
        subscription

SYNOPSIS
    gcloud beta pubsub lite-subscriptions describe
        (SUBSCRIPTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-subscriptions list

```text
NAME
    gcloud beta pubsub lite-subscriptions list - list Pub/Sub Lite
        subscriptions

SYNOPSIS
    gcloud beta pubsub lite-subscriptions list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-subscriptions seek

```text
NAME
    gcloud beta pubsub lite-subscriptions seek - seek a Pub/Sub Lite
        subscription

SYNOPSIS
    gcloud beta pubsub lite-subscriptions seek
        (SUBSCRIPTION : --location=LOCATION)
        (--event-time=EVENT_TIME | --publish-time=PUBLISH_TIME
          | --starting-offset=STARTING_OFFSET) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-subscriptions subscribe

```text
NAME
    gcloud beta pubsub lite-subscriptions subscribe - stream messages from a
        Pub/Sub Lite subscription

SYNOPSIS
    gcloud beta pubsub lite-subscriptions subscribe
        (SUBSCRIPTION : --location=LOCATION) [--auto-ack]
        [--num-messages=NUM_MESSAGES; default=1] [--partitions=[INT,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-subscriptions update

```text
NAME
    gcloud beta pubsub lite-subscriptions update - update a Pub/Sub Lite
        subscription

SYNOPSIS
    gcloud beta pubsub lite-subscriptions update
        (SUBSCRIPTION : --location=LOCATION)
        (--delivery-requirement=DELIVERY_REQUIREMENT
          --export-dead-letter-topic=EXPORT_DEAD_LETTER_TOPIC
          --export-desired-state=EXPORT_DESIRED_STATE
          --export-pubsub-topic=EXPORT_PUBSUB_TOPIC) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-subscriptions ack-up-to

```text
NAME
    gcloud alpha pubsub lite-subscriptions ack-up-to - acknowledge messages on
        a Pub/Sub Lite subscription

SYNOPSIS
    gcloud alpha pubsub lite-subscriptions ack-up-to
        (SUBSCRIPTION : --location=LOCATION) --offset=OFFSET
        --partition=PARTITION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-subscriptions create

```text
NAME
    gcloud alpha pubsub lite-subscriptions create - create a Pub/Sub Lite
        subscription

SYNOPSIS
    gcloud alpha pubsub lite-subscriptions create SUBSCRIPTION --topic=TOPIC
        [--delivery-requirement=DELIVERY_REQUIREMENT;
          default="deliver-immediately"] [--location=LOCATION]
        [--event-time=EVENT_TIME | --publish-time=PUBLISH_TIME
          | --starting-offset=STARTING_OFFSET; default="end"]
        [--export-pubsub-topic=EXPORT_PUBSUB_TOPIC
          : --export-dead-letter-topic=EXPORT_DEAD_LETTER_TOPIC
          --export-desired-state=EXPORT_DESIRED_STATE; default="active"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-subscriptions delete

```text
NAME
    gcloud alpha pubsub lite-subscriptions delete - delete a Pub/Sub Lite
        subscription

SYNOPSIS
    gcloud alpha pubsub lite-subscriptions delete
        (SUBSCRIPTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-subscriptions describe

```text
NAME
    gcloud alpha pubsub lite-subscriptions describe - describe a Pub/Sub Lite
        subscription

SYNOPSIS
    gcloud alpha pubsub lite-subscriptions describe
        (SUBSCRIPTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-subscriptions list

```text
NAME
    gcloud alpha pubsub lite-subscriptions list - list Pub/Sub Lite
        subscriptions

SYNOPSIS
    gcloud alpha pubsub lite-subscriptions list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-subscriptions seek

```text
NAME
    gcloud alpha pubsub lite-subscriptions seek - seek a Pub/Sub Lite
        subscription

SYNOPSIS
    gcloud alpha pubsub lite-subscriptions seek
        (SUBSCRIPTION : --location=LOCATION)
        (--event-time=EVENT_TIME | --publish-time=PUBLISH_TIME
          | --starting-offset=STARTING_OFFSET) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-subscriptions subscribe

```text
NAME
    gcloud alpha pubsub lite-subscriptions subscribe - stream messages from a
        Pub/Sub Lite subscription

SYNOPSIS
    gcloud alpha pubsub lite-subscriptions subscribe
        (SUBSCRIPTION : --location=LOCATION) [--auto-ack]
        [--num-messages=NUM_MESSAGES; default=1] [--partitions=[INT,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-subscriptions update

```text
NAME
    gcloud alpha pubsub lite-subscriptions update - update a Pub/Sub Lite
        subscription

SYNOPSIS
    gcloud alpha pubsub lite-subscriptions update
        (SUBSCRIPTION : --location=LOCATION)
        (--delivery-requirement=DELIVERY_REQUIREMENT
          --export-dead-letter-topic=EXPORT_DEAD_LETTER_TOPIC
          --export-desired-state=EXPORT_DESIRED_STATE
          --export-pubsub-topic=EXPORT_PUBSUB_TOPIC) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated: the Pub/Sub Lite documentation says "Pub/Sub Lite is deprecated. Effective January 31, 2027, Pub/Sub Lite will be turned down.", "Pub/Sub Lite is no longer available for new customers after September 24, 2024." and that projects that did not use Pub/Sub Lite between April 15, 2025 and July 15, 2025 cannot access it starting on July 15, 2025; it recommends migrating to Google Cloud Managed Service for Apache Kafka (https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-managed-service-for-apache-kafka) or Pub/Sub (https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-pubsub) (https://docs.cloud.google.com/pubsub/lite/docs, retrieved 2026-11-18). The `gcloud pubsub lite-*` commands are still in the gcloud 593.0.0 help.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/lite-subscriptions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

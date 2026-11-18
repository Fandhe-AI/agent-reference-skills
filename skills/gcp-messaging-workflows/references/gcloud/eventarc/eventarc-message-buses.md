---
source: https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/message-buses
---

# gcloud eventarc message-buses

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud eventarc message-buses create

```text
NAME
    gcloud eventarc message-buses create - create an Eventarc message bus

SYNOPSIS
    gcloud eventarc message-buses create (MESSAGE_BUS : --location=LOCATION)
        [--async] [--crypto-key=CRYPTO_KEY] [--labels=[KEY=VALUE,...]]
        [--logging-config=LOGGING_CONFIG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Eventarc message bus.

EXAMPLES
    To create a new message bus my-message-bus in location us-central1, run:

        $ gcloud eventarc message-buses create my-message-bus \
             --location=us-central1

POSITIONAL ARGUMENTS
     Message bus resource - The message bus to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument message_bus on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MESSAGE_BUS
          ID of the message bus or fully qualified identifier for the message
          bus.

          To set the message-bus attribute:
          + provide the argument message_bus on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc message bus, which should be one of the
          supported regions. Alternatively, set the [eventarc/location]
          property.

          To set the location attribute:
          + provide the argument message_bus on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --crypto-key=CRYPTO_KEY
        Fully qualified name of the crypto key to use for customer-managed
        encryption. If this is unspecified, Google-managed keys will be used
        for encryption.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --logging-config=LOGGING_CONFIG
        The logging config of the message bus. LOGGING_CONFIG must be one of:
        NONE, DEBUG, INFO, NOTICE, WARNING, ERROR, CRITICAL, ALERT, EMERGENCY.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta eventarc message-buses create
```

### gcloud eventarc message-buses delete

```text
NAME
    gcloud eventarc message-buses delete - delete an Eventarc message bus

SYNOPSIS
    gcloud eventarc message-buses delete (MESSAGE_BUS : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Eventarc message bus.

EXAMPLES
    To delete the message bus my-message-bus in location us-central1, run:

        $ gcloud eventarc message-buses delete my-message-bus \
             --location=us-central1

POSITIONAL ARGUMENTS
     Message bus resource - Message bus to delete. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument message_bus on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MESSAGE_BUS
          ID of the message bus or fully qualified identifier for the message
          bus.

          To set the message-bus attribute:
          + provide the argument message_bus on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc message bus, which should be one of the
          supported regions. Alternatively, set the [eventarc/location]
          property.

          To set the location attribute:
          + provide the argument message_bus on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

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

NOTES
    This variant is also available:

        $ gcloud beta eventarc message-buses delete
```

### gcloud eventarc message-buses describe

```text
NAME
    gcloud eventarc message-buses describe - describe an Eventarc message bus

SYNOPSIS
    gcloud eventarc message-buses describe (MESSAGE_BUS : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Eventarc message bus.

EXAMPLES
    To describe the message bus my-message-bus in location us-central1, run:

        $ gcloud eventarc message-buses describe my-message-bus \
             --location=us-central1

POSITIONAL ARGUMENTS
     Message bus resource - Message bus to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument message_bus on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MESSAGE_BUS
          ID of the message bus or fully qualified identifier for the message
          bus.

          To set the message-bus attribute:
          + provide the argument message_bus on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc message bus, which should be one of the
          supported regions. Alternatively, set the [eventarc/location]
          property.

          To set the location attribute:
          + provide the argument message_bus on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta eventarc message-buses describe
```

### gcloud eventarc message-buses list

```text
NAME
    gcloud eventarc message-buses list - list Eventarc message buses

SYNOPSIS
    gcloud eventarc message-buses list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Eventarc message buses.

EXAMPLES
    To list all message buses in location us-central1, run:

        $ gcloud eventarc message-buses list --location=us-central1

    To list all message buses in all locations, run:

        $ gcloud eventarc message-buses list --location=-

    or

        $ gcloud eventarc message-buses list

FLAGS
     Location resource - The location for which to list message buses. This
     should be one of the supported regions. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property eventarc/location with a fully specified name;
      * use '-' location to aggregate results for all Eventarc locations with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property eventarc/location;
        * use '-' location to aggregate results for all Eventarc locations.

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
    This variant is also available:

        $ gcloud beta eventarc message-buses list
```

### gcloud eventarc message-buses list-enrollments

```text
NAME
    gcloud eventarc message-buses list-enrollments - list Eventarc enrollments
        attached to an Eventarc message bus

SYNOPSIS
    gcloud eventarc message-buses list-enrollments
        (MESSAGE_BUS : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Eventarc enrollments attached to an Eventarc message bus.

EXAMPLES
    To list all enrollments in message-bus my-message-bus in us-central1, run:

        $ gcloud eventarc message-buses list-enrollments my-message-bus \
            --location=us-central1

POSITIONAL ARGUMENTS
     Message bus resource - The message bus on which to list enrollments. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument message_bus on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MESSAGE_BUS
          ID of the message bus or fully qualified identifier for the message
          bus.

          To set the message-bus attribute:
          + provide the argument message_bus on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc message bus, which should be one of the
          supported regions. Alternatively, set the [eventarc/location]
          property.

          To set the location attribute:
          + provide the argument message_bus on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

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
    This variant is also available:

        $ gcloud beta eventarc message-buses list-enrollments
```

### gcloud eventarc message-buses publish

```text
NAME
    gcloud eventarc message-buses publish - publish to an Eventarc message bus

SYNOPSIS
    gcloud eventarc message-buses publish (MESSAGE_BUS : --location=LOCATION)
        (--avro-message=AVRO_MESSAGE | --json-message=JSON_MESSAGE
          | [--event-data=EVENT_DATA --event-id=EVENT_ID
          --event-source=EVENT_SOURCE --event-type=EVENT_TYPE
          : --event-attributes=[ATTRIBUTE=VALUE,...]]) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Publish to an Eventarc message bus.

EXAMPLES
    To publish an event to the message bus my-message-bus with event id 1234,
    event type event-provider.event.v1.eventType, event source
    //event-provider/event/source, event data { "key": "value" } and event
    attributes of attribute1=value, run:

        $ gcloud eventarc message-buses publish my-message-bus \
            --location=us-central1 --event-id=1234 \
            --event-type=event-provider.event.v1.eventType \
            --event-source="//event-provider/event/source" \
            --event-data='{"key": "value"}' \
            --event-attributes=attribute1=value

    To publish an event to the message bus my-message-bus with a json message,
    run:

        $ gcloud eventarc message-buses publish my-message-bus \
            --location=us-central1 \
            --json-message='{"id": 1234, "type":
         "event-provider.event.v1.eventType", "source":
         "//event-provider/event/source", "specversion": "1.0", "data":
         {"key": "value"}}'

POSITIONAL ARGUMENTS
     Message bus resource - Message bus to publish to. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument message_bus on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MESSAGE_BUS
          ID of the message bus or fully qualified identifier for the message
          bus.

          To set the message-bus attribute:
          + provide the argument message_bus on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc message bus, which should be one of the
          supported regions. Alternatively, set the [eventarc/location]
          property.

          To set the location attribute:
          + provide the argument message_bus on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --avro-message=AVRO_MESSAGE
          An Avro message to publish to the message bus.

       --json-message=JSON_MESSAGE
          A JSON message to publish to the message bus.

       Or at least one of these can be specified:

         --event-data=EVENT_DATA
            An event data. The event data of a published event.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --event-id=EVENT_ID
            An event id. The id of a published event.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --event-source=EVENT_SOURCE
            An event source. The event source of a published event.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --event-type=EVENT_TYPE
            An event type. The event type of a published event.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --event-attributes=[ATTRIBUTE=VALUE,...]
            Event attributes. The event attributes of a published event.This
            flag can be repeated to add more attributes.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta eventarc message-buses publish
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud eventarc message-buses publish my-message-bus \
    --location=us-central1 \
    --json-message='{"id": 1234, "type": "event-provider.event.v1.eventType", "source": "//event-provider/event/source", "specversion": "1.0", "data": {"key": "value"}}'
```

### gcloud eventarc message-buses update

```text
NAME
    gcloud eventarc message-buses update - update an Eventarc message bus

SYNOPSIS
    gcloud eventarc message-buses update (MESSAGE_BUS : --location=LOCATION)
        [--async] [--logging-config=LOGGING_CONFIG]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-crypto-key | --crypto-key=CRYPTO_KEY]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Eventarc message bus.

EXAMPLES
    To update the message bus my-message-bus in location us-central1, run:

        $ gcloud eventarc message-buses update my-message-bus \
            --location=us-central1

    To configure the message bus my-message-bus in location us-central1 with a
    Cloud KMS CryptoKey, run:

        $ gcloud eventarc message-buses update my-message-bus \
            --location=us-central1 \
            --crypto-key=projects/PROJECT_ID/locations/KMS_LOCATION/\
        keyRings/KEYRING/cryptoKeys/KEY

POSITIONAL ARGUMENTS
     Message bus resource - Message bus to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument message_bus on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MESSAGE_BUS
          ID of the message bus or fully qualified identifier for the message
          bus.

          To set the message-bus attribute:
          + provide the argument message_bus on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc message bus, which should be one of the
          supported regions. Alternatively, set the [eventarc/location]
          property.

          To set the location attribute:
          + provide the argument message_bus on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --logging-config=LOGGING_CONFIG
        The logging config of the message bus. LOGGING_CONFIG must be one of:
        NONE, DEBUG, INFO, NOTICE, WARNING, ERROR, CRITICAL, ALERT, EMERGENCY.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-crypto-key
          Remove the previously configured crypto key. The channel will
          continue to be encrypted using Google-managed keys.

       --crypto-key=CRYPTO_KEY
          Fully qualified name of the crypto key to use for customer-managed
          encryption. If this is unspecified, Google-managed keys will be used
          for encryption.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud eventarc message-buses update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud eventarc message-buses update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta eventarc message-buses update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud eventarc message-buses update my-message-bus \
    --location=us-central1 \
    --crypto-key=projects/PROJECT_ID/locations/KMS_LOCATION/keyRings/KEYRING/cryptoKeys/KEY
```

### gcloud beta eventarc message-buses create

```text
NAME
    gcloud beta eventarc message-buses create - create an Eventarc message bus

SYNOPSIS
    gcloud beta eventarc message-buses create
        (MESSAGE_BUS : --location=LOCATION) [--async] [--crypto-key=CRYPTO_KEY]
        [--labels=[KEY=VALUE,...]] [--logging-config=LOGGING_CONFIG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta eventarc message-buses delete

```text
NAME
    gcloud beta eventarc message-buses delete - delete an Eventarc message bus

SYNOPSIS
    gcloud beta eventarc message-buses delete
        (MESSAGE_BUS : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta eventarc message-buses describe

```text
NAME
    gcloud beta eventarc message-buses describe - describe an Eventarc message
        bus

SYNOPSIS
    gcloud beta eventarc message-buses describe
        (MESSAGE_BUS : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta eventarc message-buses list

```text
NAME
    gcloud beta eventarc message-buses list - list Eventarc message buses

SYNOPSIS
    gcloud beta eventarc message-buses list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta eventarc message-buses list-enrollments

```text
NAME
    gcloud beta eventarc message-buses list-enrollments - list Eventarc
        enrollments attached to an Eventarc message bus

SYNOPSIS
    gcloud beta eventarc message-buses list-enrollments
        (MESSAGE_BUS : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta eventarc message-buses publish

```text
NAME
    gcloud beta eventarc message-buses publish - publish to an Eventarc message
        bus

SYNOPSIS
    gcloud beta eventarc message-buses publish
        (MESSAGE_BUS : --location=LOCATION)
        (--avro-message=AVRO_MESSAGE | --json-message=JSON_MESSAGE
          | [--event-data=EVENT_DATA --event-id=EVENT_ID
          --event-source=EVENT_SOURCE --event-type=EVENT_TYPE
          : --event-attributes=[ATTRIBUTE=VALUE,...]]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta eventarc message-buses update

```text
NAME
    gcloud beta eventarc message-buses update - update an Eventarc message bus

SYNOPSIS
    gcloud beta eventarc message-buses update
        (MESSAGE_BUS : --location=LOCATION) [--async]
        [--logging-config=LOGGING_CONFIG] [--update-labels=[KEY=VALUE,...]]
        [--clear-crypto-key | --crypto-key=CRYPTO_KEY]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/message-buses (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

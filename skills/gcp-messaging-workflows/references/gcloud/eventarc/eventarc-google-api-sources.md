---
source: https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/google-api-sources
---

# gcloud eventarc google-api-sources

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud eventarc google-api-sources create

```text
NAME
    gcloud eventarc google-api-sources create - create an Eventarc Google API
        source

SYNOPSIS
    gcloud eventarc google-api-sources create
        (GOOGLE_API_SOURCE : --location=LOCATION)
        (--destination-message-bus=DESTINATION_MESSAGE_BUS
          : --destination-message-bus-project=DESTINATION_MESSAGE_BUS_PROJECT)
        [--async] [--crypto-key=CRYPTO_KEY] [--labels=[KEY=VALUE,...]]
        [--logging-config=LOGGING_CONFIG]
        [--[no-]organization-subscription
          | --project-subscriptions=GAS_PROJECT_SUBSCRIPTION,[...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Eventarc Google API source.

EXAMPLES
    To create a new Google API source my-google-api-source in location
    us-central1 with a destination message bus my-message-bus, run:

        $ gcloud eventarc google-api-sources create my-google-api-source \
             --location=us-central1 --destination-message-bus=my-message-bus

POSITIONAL ARGUMENTS
     Google API source resource - The Google API source to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument google_api_source on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GOOGLE_API_SOURCE
          ID of the Google API source or fully qualified identifier for the
          Google API source.

          To set the google-api-source attribute:
          + provide the argument google_api_source on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc Google API source, which should be one
          of the supported regions. Alternatively, set the [eventarc/location]
          property.

          To set the location attribute:
          + provide the argument google_api_source on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

REQUIRED FLAGS
     Message bus resource - The destination message bus of the Google API
     source. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the location attribute:
      * provide the argument --destination-message-bus on the command line
        with a fully specified name;
      * provide the argument --location on the command line;
      * set the property eventarc/location.

     This must be specified.

       --destination-message-bus=DESTINATION_MESSAGE_BUS
          ID of the message bus or fully qualified identifier for the message
          bus.

          To set the message-bus attribute:
          + provide the argument --destination-message-bus on the command
            line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --destination-message-bus-project=DESTINATION_MESSAGE_BUS_PROJECT
          Project ID of the Google Cloud project for the message bus.

          To set the project attribute:
          + provide the argument --destination-message-bus on the command
            line with a fully specified name;
          + provide the argument --destination-message-bus-project on the
            command line;
          + provide the argument --project on the command line;
          + set the property core/project.

OPTIONAL FLAGS
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
        The logging config for the Google API source. LOGGING_CONFIG must be
        one of: NONE, DEBUG, INFO, NOTICE, WARNING, ERROR, CRITICAL, ALERT,
        EMERGENCY.

     At most one of these can be specified:

       --[no-]organization-subscription
          The organization subscription for the resource. Use
          --organization-subscription to enable and
          --no-organization-subscription to disable.

       --project-subscriptions=GAS_PROJECT_SUBSCRIPTION,[...]
          The project subscriptions for the resource.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta eventarc google-api-sources create
```

### gcloud eventarc google-api-sources delete

```text
NAME
    gcloud eventarc google-api-sources delete - delete an Eventarc Google API
        source

SYNOPSIS
    gcloud eventarc google-api-sources delete
        (GOOGLE_API_SOURCE : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Eventarc Google API source.

EXAMPLES
    To delete the Google API source my-google-api-source in location
    us-central1, run:

        $ gcloud eventarc google-api-sources delete my-google-api-source \
             --location=us-central1

POSITIONAL ARGUMENTS
     Google API source resource - Google API source to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument google_api_source on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GOOGLE_API_SOURCE
          ID of the Google API source or fully qualified identifier for the
          Google API source.

          To set the google-api-source attribute:
          + provide the argument google_api_source on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc Google API source, which should be one
          of the supported regions. Alternatively, set the [eventarc/location]
          property.

          To set the location attribute:
          + provide the argument google_api_source on the command line with a
            fully specified name;
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

        $ gcloud beta eventarc google-api-sources delete
```

### gcloud eventarc google-api-sources describe

```text
NAME
    gcloud eventarc google-api-sources describe - describe an Eventarc Google
        API source

SYNOPSIS
    gcloud eventarc google-api-sources describe
        (GOOGLE_API_SOURCE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Eventarc Google API source.

EXAMPLES
    To describe the google API source my-google-api-source in location
    us-central1, run:

        $ gcloud eventarc google-api-sources describe my-google-api-source \
             --location=us-central1

POSITIONAL ARGUMENTS
     Google API source resource - Google API source to describe. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument google_api_source on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GOOGLE_API_SOURCE
          ID of the Google API source or fully qualified identifier for the
          Google API source.

          To set the google-api-source attribute:
          + provide the argument google_api_source on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc Google API source, which should be one
          of the supported regions. Alternatively, set the [eventarc/location]
          property.

          To set the location attribute:
          + provide the argument google_api_source on the command line with a
            fully specified name;
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

        $ gcloud beta eventarc google-api-sources describe
```

### gcloud eventarc google-api-sources list

```text
NAME
    gcloud eventarc google-api-sources list - list Eventarc Google API sources

SYNOPSIS
    gcloud eventarc google-api-sources list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Eventarc Google API sources.

EXAMPLES
    To list all Google API sources in location us-central1, run:

        $ gcloud eventarc google-api-sources list --location=us-central1

    To list all Google API sources in all locations, run:

        $ gcloud eventarc google-api-sources list --location=-

    or

        $ gcloud eventarc google-api-sources list

FLAGS
     Location resource - The location for which to list Google API sources.
     This should be one of the supported regions. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

        $ gcloud beta eventarc google-api-sources list
```

### gcloud eventarc google-api-sources update

```text
NAME
    gcloud eventarc google-api-sources update - update an Eventarc Google API
        source

SYNOPSIS
    gcloud eventarc google-api-sources update
        (GOOGLE_API_SOURCE : --location=LOCATION) [--async]
        [--logging-config=LOGGING_CONFIG] [--update-labels=[KEY=VALUE,...]]
        [--clear-crypto-key | --crypto-key=CRYPTO_KEY]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-project-subscriptions | --[no-]organization-subscription
          | --project-subscriptions=GAS_PROJECT_SUBSCRIPTION,[...]]
        [--destination-message-bus=DESTINATION_MESSAGE_BUS
          : --destination-message-bus-project=DESTINATION_MESSAGE_BUS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Eventarc Google API source.

EXAMPLES
    To update the Google API source my-google-api-source in location
    us-central1 with destination message bus my-message-bus, run:

        $ gcloud eventarc google-api-sources update my-google-api-source \
            --location=us-central1 --destination-message-bus=my-message-bus

    To update the Google API source my-google-api-source in location
    us-central1 with INFO level logging, run:

        $ gcloud eventarc google-api-sources update my-google-api-source \
            --location=us-central1 --logging-config=INFO

    To update the Google API source my-google-api-source in location
    us-central1 with a Cloud KMS CryptoKey, run:

        $ gcloud eventarc google-api-sources update my-google-api-source \
            --location=us-central1 \
            --crypto-key=projects/PROJECT_ID/locations/KMS_LOCATION/\
        keyRings/KEYRING/cryptoKeys/KEY

POSITIONAL ARGUMENTS
     Google API source resource - The Google API source to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument google_api_source on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GOOGLE_API_SOURCE
          ID of the Google API source or fully qualified identifier for the
          Google API source.

          To set the google-api-source attribute:
          + provide the argument google_api_source on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc Google API source, which should be one
          of the supported regions. Alternatively, set the [eventarc/location]
          property.

          To set the location attribute:
          + provide the argument google_api_source on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --logging-config=LOGGING_CONFIG
        The logging config of the Google API source. LOGGING_CONFIG must be one
        of: NONE, DEBUG, INFO, NOTICE, WARNING, ERROR, CRITICAL, ALERT,
        EMERGENCY.

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

              $ gcloud eventarc google-api-sources update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud eventarc google-api-sources update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     At most one of these can be specified:

       --clear-project-subscriptions
          Clear the project subscriptions for the resource.

       --[no-]organization-subscription
          The organization subscription for the resource. Use
          --organization-subscription to enable and
          --no-organization-subscription to disable.

       --project-subscriptions=GAS_PROJECT_SUBSCRIPTION,[...]
          The project subscriptions for the resource.

     Message bus resource - The destination message bus of the Google API
     source. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the location attribute:
      * provide the argument --destination-message-bus on the command line
        with a fully specified name;
      * provide the argument --location on the command line;
      * set the property eventarc/location.

     --destination-message-bus=DESTINATION_MESSAGE_BUS
        ID of the message bus or fully qualified identifier for the message
        bus.

        To set the message-bus attribute:
        * provide the argument --destination-message-bus on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --destination-message-bus-project=DESTINATION_MESSAGE_BUS_PROJECT
        Project ID of the Google Cloud project for the message bus.

        To set the project attribute:
        * provide the argument --destination-message-bus on the command line
          with a fully specified name;
        * provide the argument --destination-message-bus-project on the
          command line;
        * provide the argument --project on the command line;
        * set the property core/project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta eventarc google-api-sources update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud eventarc google-api-sources update my-google-api-source \
    --location=us-central1 \
    --crypto-key=projects/PROJECT_ID/locations/KMS_LOCATION/keyRings/KEYRING/cryptoKeys/KEY
```

### gcloud beta eventarc google-api-sources create

```text
NAME
    gcloud beta eventarc google-api-sources create - create an Eventarc Google
        API source

SYNOPSIS
    gcloud beta eventarc google-api-sources create
        (GOOGLE_API_SOURCE : --location=LOCATION)
        (--destination-message-bus=DESTINATION_MESSAGE_BUS
          : --destination-message-bus-project=DESTINATION_MESSAGE_BUS_PROJECT)
        [--async] [--crypto-key=CRYPTO_KEY] [--labels=[KEY=VALUE,...]]
        [--logging-config=LOGGING_CONFIG]
        [--[no-]organization-subscription
          | --project-subscriptions=GAS_PROJECT_SUBSCRIPTION,[...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta eventarc google-api-sources delete

```text
NAME
    gcloud beta eventarc google-api-sources delete - delete an Eventarc Google
        API source

SYNOPSIS
    gcloud beta eventarc google-api-sources delete
        (GOOGLE_API_SOURCE : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta eventarc google-api-sources describe

```text
NAME
    gcloud beta eventarc google-api-sources describe - describe an Eventarc
        Google API source

SYNOPSIS
    gcloud beta eventarc google-api-sources describe
        (GOOGLE_API_SOURCE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta eventarc google-api-sources list

```text
NAME
    gcloud beta eventarc google-api-sources list - list Eventarc Google API
        sources

SYNOPSIS
    gcloud beta eventarc google-api-sources list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta eventarc google-api-sources update

```text
NAME
    gcloud beta eventarc google-api-sources update - update an Eventarc Google
        API source

SYNOPSIS
    gcloud beta eventarc google-api-sources update
        (GOOGLE_API_SOURCE : --location=LOCATION) [--async]
        [--logging-config=LOGGING_CONFIG] [--update-labels=[KEY=VALUE,...]]
        [--clear-crypto-key | --crypto-key=CRYPTO_KEY]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-project-subscriptions | --[no-]organization-subscription
          | --project-subscriptions=GAS_PROJECT_SUBSCRIPTION,[...]]
        [--destination-message-bus=DESTINATION_MESSAGE_BUS
          : --destination-message-bus-project=DESTINATION_MESSAGE_BUS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/google-api-sources (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

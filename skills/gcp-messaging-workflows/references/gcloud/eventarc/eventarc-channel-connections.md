---
source: https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/channel-connections
---

# gcloud eventarc channel-connections

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud eventarc channel-connections create

```text
NAME
    gcloud eventarc channel-connections create - create an Eventarc channel
        connection

SYNOPSIS
    gcloud eventarc channel-connections create
        (CHANNEL_CONNECTION : --location=LOCATION)
        --activation-token=ACTIVATION_TOKEN --channel=CHANNEL [--async]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Eventarc channel connection.

EXAMPLES
    To create a new channel connection my-channel-connection for channel
    my-channel with activation token channel-activation-token, run:

        $ gcloud eventarc channel-connections create my-channel-connection \
            --channel=my-channel --activation-token=channel-activation-token

POSITIONAL ARGUMENTS
     Channel connection resource - Channel connection to create. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument channel_connection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CHANNEL_CONNECTION
          ID of the channel connection or fully qualified identifier for the
          channel connection.

          To set the channel-connection attribute:
          + provide the argument channel_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc channel connection, which should be
          either global or one of the supported regions. Alternatively, set the
          [eventarc/location] property.

          To set the location attribute:
          + provide the argument channel_connection on the command line with
            a fully specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

REQUIRED FLAGS
     --activation-token=ACTIVATION_TOKEN
        Activation token for the specified channel.

     --channel=CHANNEL
        Subscriber channel for which to create the channel connection. This
        argument should be the full channel name, including project, location
        and the channel id.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --labels=[KEY=VALUE,...]
        Labels to apply to the channel connection.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud eventarc channel-connections delete

```text
NAME
    gcloud eventarc channel-connections delete - delete an Eventarc channel
        connection

SYNOPSIS
    gcloud eventarc channel-connections delete
        (CHANNEL_CONNECTION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Eventarc channel connection.

EXAMPLES
    To delete the channel connection my-channel-connection in location
    us-central1, run:

        $ gcloud eventarc channel-connections delete my-channel-connection \
            --location=us-central1

POSITIONAL ARGUMENTS
     Channel connection resource - Channel connection to delete. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument channel_connection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CHANNEL_CONNECTION
          ID of the channel connection or fully qualified identifier for the
          channel connection.

          To set the channel-connection attribute:
          + provide the argument channel_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc channel connection, which should be
          either global or one of the supported regions. Alternatively, set the
          [eventarc/location] property.

          To set the location attribute:
          + provide the argument channel_connection on the command line with
            a fully specified name;
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
```

### gcloud eventarc channel-connections describe

```text
NAME
    gcloud eventarc channel-connections describe - describe an Eventarc channel
        connection

SYNOPSIS
    gcloud eventarc channel-connections describe
        (CHANNEL_CONNECTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Eventarc channel connection.

EXAMPLES
    To describe the channel connection my-channel-connection in location
    us-central1, run:

        $ gcloud eventarc channel-connections describe \
            my-channel-connection --location=us-central1

POSITIONAL ARGUMENTS
     Channel connection resource - Channel connection to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument channel_connection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CHANNEL_CONNECTION
          ID of the channel connection or fully qualified identifier for the
          channel connection.

          To set the channel-connection attribute:
          + provide the argument channel_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc channel connection, which should be
          either global or one of the supported regions. Alternatively, set the
          [eventarc/location] property.

          To set the location attribute:
          + provide the argument channel_connection on the command line with
            a fully specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud eventarc channel-connections list

```text
NAME
    gcloud eventarc channel-connections list - list Eventarc channel
        connections

SYNOPSIS
    gcloud eventarc channel-connections list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Eventarc channel connections.

EXAMPLES
    To list all channel connections in location us-central1, run:

        $ gcloud eventarc channel-connections list --location=us-central1

    To list all channel connections in all locations, run:

        $ gcloud eventarc channel-connections list --location=-

    or

        $ gcloud eventarc channel-connections list

FLAGS
     Location resource - Location for which to list channel connections. This
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
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/channel-connections (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

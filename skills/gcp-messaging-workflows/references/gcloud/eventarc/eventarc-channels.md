---
source: https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/channels
---

# gcloud eventarc channels

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud eventarc channels create

```text
NAME
    gcloud eventarc channels create - create an Eventarc channel

SYNOPSIS
    gcloud eventarc channels create (CHANNEL : --location=LOCATION) [--async]
        [--crypto-key=CRYPTO_KEY] [--labels=[KEY=VALUE,...]]
        [--provider=PROVIDER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Eventarc channel.

EXAMPLES
    To create a new channel my-channel in location us-central1, run:

        $ gcloud eventarc channels create my-channel --location=us-central1

    To create a new channel my-channel in location us-central1 with a Cloud KMS
    CryptoKey, run:

        $ gcloud eventarc channels create my-channel \
            --location=us-central1 \
            --crypto-key=projects/PROJECT_ID/locations/KMS_LOCATION/\
        keyRings/KEYRING/cryptoKeys/KEY

POSITIONAL ARGUMENTS
     Channel resource - Channel to create. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument channel on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CHANNEL
          ID of the channel or fully qualified identifier for the channel.

          To set the channel attribute:
          + provide the argument channel on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc channel, which should be either global
          or one of the supported regions. Alternatively, set the
          [eventarc/location] property.

          To set the location attribute:
          + provide the argument channel on the command line with a fully
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

     Provider resource - Provider to use for the channel. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --provider on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --provider on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property eventarc/location.

     --provider=PROVIDER
        ID of the provider or fully qualified identifier for the provider.

        To set the provider attribute:
        * provide the argument --provider on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud eventarc channels create my-channel \
    --location=us-central1 \
    --crypto-key=projects/PROJECT_ID/locations/KMS_LOCATION/keyRings/KEYRING/cryptoKeys/KEY
```

### gcloud eventarc channels delete

```text
NAME
    gcloud eventarc channels delete - delete an Eventarc channel

SYNOPSIS
    gcloud eventarc channels delete (CHANNEL : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Eventarc channel.

EXAMPLES
    To delete the channel my-channel in location us-central1, run:

        $ gcloud eventarc channels delete my-channel --location=us-central1

POSITIONAL ARGUMENTS
     Channel resource - Channel to delete. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument channel on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CHANNEL
          ID of the channel or fully qualified identifier for the channel.

          To set the channel attribute:
          + provide the argument channel on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc channel, which should be either global
          or one of the supported regions. Alternatively, set the
          [eventarc/location] property.

          To set the location attribute:
          + provide the argument channel on the command line with a fully
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
```

### gcloud eventarc channels describe

```text
NAME
    gcloud eventarc channels describe - describe an Eventarc channel

SYNOPSIS
    gcloud eventarc channels describe (CHANNEL : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Eventarc channel.

EXAMPLES
    To describe the channel my-channel in location us-central1, run:

        $ gcloud eventarc channels describe my-channel --location=us-central1

POSITIONAL ARGUMENTS
     Channel resource - Channel to describe. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument channel on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CHANNEL
          ID of the channel or fully qualified identifier for the channel.

          To set the channel attribute:
          + provide the argument channel on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc channel, which should be either global
          or one of the supported regions. Alternatively, set the
          [eventarc/location] property.

          To set the location attribute:
          + provide the argument channel on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud eventarc channels list

```text
NAME
    gcloud eventarc channels list - list Eventarc channels

SYNOPSIS
    gcloud eventarc channels list [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Eventarc channels.

EXAMPLES
    To list all channels in location us-central1, run:

        $ gcloud eventarc channels list --location=us-central1

    To list all channels in all locations, run:

        $ gcloud eventarc channels list --location=-

    or

        $ gcloud eventarc channels list

FLAGS
     Location resource - Location for which to list channels. This should be
     one of the supported regions. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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

### gcloud eventarc channels update

```text
NAME
    gcloud eventarc channels update - update an Eventarc channel

SYNOPSIS
    gcloud eventarc channels update (CHANNEL : --location=LOCATION) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-crypto-key | --crypto-key=CRYPTO_KEY]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Eventarc channel.

EXAMPLES
    To update the channel my-channel in location us-central1, run:

        $ gcloud eventarc channels update my-channel --location=us-central1

    To configure the channel my-channel in location us-central1 with a Cloud
    KMS CryptoKey, run:

        $ gcloud eventarc channels update my-channel \
            --location=us-central1 \
            --crypto-key=projects/PROJECT_ID/locations/KMS_LOCATION/\
        keyRings/KEYRING/cryptoKeys/KEY

POSITIONAL ARGUMENTS
     Channel resource - Channel to update. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument channel on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CHANNEL
          ID of the channel or fully qualified identifier for the channel.

          To set the channel attribute:
          + provide the argument channel on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the Eventarc channel, which should be either global
          or one of the supported regions. Alternatively, set the
          [eventarc/location] property.

          To set the location attribute:
          + provide the argument channel on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property eventarc/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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

              $ gcloud eventarc channels update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud eventarc channels update --clear-labels \
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
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud eventarc channels update my-channel \
    --location=us-central1 \
    --crypto-key=projects/PROJECT_ID/locations/KMS_LOCATION/keyRings/KEYRING/cryptoKeys/KEY
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/eventarc/channels (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

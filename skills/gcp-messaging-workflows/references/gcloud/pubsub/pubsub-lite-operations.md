---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/lite-operations
---

# gcloud pubsub lite-operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub lite-operations describe

```text
NAME
    gcloud pubsub lite-operations describe - describe a Pub/Sub Lite operation

SYNOPSIS
    gcloud pubsub lite-operations describe (OPERATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Pub/Sub Lite operation.

EXAMPLES
    To describe a Pub/Sub Lite operation, run:

        $ gcloud pubsub lite-operations describe operation-id \
          --location=us-central1-a

    Alternatively, specify the full operation name:

        $ gcloud pubsub lite-operations describe \
          projects/my-project/locations/us-central1-a/operations/\
        operation-id

POSITIONAL ARGUMENTS
     Operation resource - The Pub/Sub Lite operation to describe. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha pubsub lite-operations describe

        $ gcloud beta pubsub lite-operations describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud pubsub lite-operations describe projects/my-project/locations/us-central1-a/operations/operation-id
```

### gcloud pubsub lite-operations list

```text
NAME
    gcloud pubsub lite-operations list - list Pub/Sub Lite operations

SYNOPSIS
    gcloud pubsub lite-operations list --location=LOCATION [--done=DONE]
        [--subscription=SUBSCRIPTION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Pub/Sub Lite operations.

    The optional --subscription flag can be used to filter operations for a
    Pub/Sub Lite subscription. The optional --done flag can be used to filter
    by operation completion status. These flags are ignored if --filter is set.

    To describe a listed operation, run:

        $ gcloud pubsub lite-operations list operation-id \
          --location=us-central1-a

EXAMPLES
    To list Pub/Sub Lite operations, run:

        $ gcloud pubsub lite-operations list --location=us-central1-a \
          --limit=50

    To list incomplete Pub/Sub Lite operations, run:

        $ gcloud pubsub lite-operations list --location=us-central1-a \
          --done=false

    To list Pub/Sub Lite operations for a subscription, run:

        $ gcloud pubsub lite-operations list --location=us-central1-a \
          --subscription=my-subscription --limit=50

    To list incomplete Pub/Sub Lite operations for a subscription, run:

        $ gcloud pubsub lite-operations list --location=us-central1-a \
          --subscription=my-subscription --done=false

REQUIRED FLAGS
     Location resource - Location to list operations for. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

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

FLAGS
     --done=DONE
        Filter operations by completion status. This flag is ignored if
        --filter is set. DONE must be one of: false, true.

     --subscription=SUBSCRIPTION
        Filter operations by target subscription. This flag is ignored if
        --filter is set.

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

        $ gcloud alpha pubsub lite-operations list

        $ gcloud beta pubsub lite-operations list
```

Adapted (not in the official docs): runnable form of the example(s) above: the commands are rewritten so that they run as described (see Notes).

```bash
gcloud pubsub lite-operations describe operation-id --location=us-central1-a
```

### gcloud beta pubsub lite-operations describe

```text
NAME
    gcloud beta pubsub lite-operations describe - describe a Pub/Sub Lite
        operation

SYNOPSIS
    gcloud beta pubsub lite-operations describe
        (OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-operations list

```text
NAME
    gcloud beta pubsub lite-operations list - list Pub/Sub Lite operations

SYNOPSIS
    gcloud beta pubsub lite-operations list --location=LOCATION [--done=DONE]
        [--subscription=SUBSCRIPTION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-operations describe

```text
NAME
    gcloud alpha pubsub lite-operations describe - describe a Pub/Sub Lite
        operation

SYNOPSIS
    gcloud alpha pubsub lite-operations describe
        (OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-operations list

```text
NAME
    gcloud alpha pubsub lite-operations list - list Pub/Sub Lite operations

SYNOPSIS
    gcloud alpha pubsub lite-operations list --location=LOCATION [--done=DONE]
        [--subscription=SUBSCRIPTION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Deprecated: the Pub/Sub Lite documentation says "Pub/Sub Lite is deprecated. Effective January 31, 2027, Pub/Sub Lite will be turned down.", "Pub/Sub Lite is no longer available for new customers after September 24, 2024." and that projects that did not use Pub/Sub Lite between April 15, 2025 and July 15, 2025 cannot access it starting on July 15, 2025; it recommends migrating to Google Cloud Managed Service for Apache Kafka (https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-managed-service-for-apache-kafka) or Pub/Sub (https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-pubsub) (https://docs.cloud.google.com/pubsub/lite/docs, retrieved 2026-11-18). The `gcloud pubsub lite-*` commands are still in the gcloud 593.0.0 help.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` DESCRIPTION says "To describe a listed operation, run:" and gives `gcloud pubsub lite-operations list operation-id --location=us-central1-a`, but `list` takes no positional argument (SYNOPSIS: `gcloud pubsub lite-operations list --location=LOCATION ...`); the runnable form uses `describe` (SYNOPSIS: `gcloud pubsub lite-operations describe (OPERATION : --location=LOCATION)`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/lite-operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/list-subscriptions
---

# gcloud pubsub topics list-subscriptions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub topics list-subscriptions

```text
NAME
    gcloud pubsub topics list-subscriptions - lists Cloud Pub/Sub subscriptions
        from a given topic

SYNOPSIS
    gcloud pubsub topics list-subscriptions TOPIC [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all of the Cloud Pub/Sub subscriptions attached to the given topic
    and that match the given filter.

EXAMPLES
    To filter results by subscription name (ie. only show subscription
    'mysubs'), run:

        $ gcloud pubsub topics list-subscriptions mytopic --filter=mysubs

    To combine multiple filters (with AND or OR), run:

        $ gcloud pubsub topics list-subscriptions mytopic \
            --filter="mysubs1 OR mysubs2"

POSITIONAL ARGUMENTS
     Topic resource - Name of the topic to list subscriptions for. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
    These variants are also available:

        $ gcloud alpha pubsub topics list-subscriptions

        $ gcloud beta pubsub topics list-subscriptions
```

### gcloud beta pubsub topics list-subscriptions

```text
NAME
    gcloud beta pubsub topics list-subscriptions - lists Cloud Pub/Sub
        subscriptions from a given topic

SYNOPSIS
    gcloud beta pubsub topics list-subscriptions TOPIC [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub topics list-subscriptions

```text
NAME
    gcloud alpha pubsub topics list-subscriptions - lists Cloud Pub/Sub
        subscriptions from a given topic

SYNOPSIS
    gcloud alpha pubsub topics list-subscriptions TOPIC [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/list-subscriptions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

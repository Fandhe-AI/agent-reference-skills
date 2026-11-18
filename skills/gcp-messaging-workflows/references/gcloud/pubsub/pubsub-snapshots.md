---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/snapshots
---

# gcloud pubsub snapshots

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub snapshots create

```text
NAME
    gcloud pubsub snapshots create - creates one or more Cloud Pub/Sub
        snapshots

SYNOPSIS
    gcloud pubsub snapshots create SNAPSHOT [SNAPSHOT ...]
        --subscription=SUBSCRIPTION [--labels=[KEY=VALUE,...]]
        [--subscription-project=SUBSCRIPTION_PROJECT] [--tags=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates one or more Cloud Pub/Sub snapshots.

POSITIONAL ARGUMENTS
     SNAPSHOT [SNAPSHOT ...]
        One or more snapshot names to create.

REQUIRED FLAGS
     --subscription=SUBSCRIPTION
        The subscription whose backlog the snapshot retains. Specifically, the
        created snapshot is guaranteed to retain a) The existing backlog on the
        subscription, i.e., the set of messages in the subscription that are
        unacknowledged upon the successful completion of the create snapshot
        request, b) Any messages published to the subscription's topic
        following the successful creation of the snapshot.

OPTIONAL FLAGS
     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --subscription-project=SUBSCRIPTION_PROJECT
        The name of the project the provided subscription belongs to. If not
        set, it defaults to the currently selected cloud project.

     --tags=[KEY=VALUE,...]
        List of tags KEY=VALUE pairs to bind. Each item must be expressed as
        <tag-key-namespaced-name>=<tag-value-short-name>. Example:
        123/environment=production,123/costCenter=marketing

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub snapshots create

        $ gcloud beta pubsub snapshots create
```

### gcloud pubsub snapshots delete

```text
NAME
    gcloud pubsub snapshots delete - deletes one or more Cloud Pub/Sub
        snapshots

SYNOPSIS
    gcloud pubsub snapshots delete SNAPSHOT [SNAPSHOT ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes one or more Cloud Pub/Sub snapshots.

POSITIONAL ARGUMENTS
     SNAPSHOT [SNAPSHOT ...]
        One or more snapshot names to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub snapshots delete

        $ gcloud beta pubsub snapshots delete
```

### gcloud pubsub snapshots describe

```text
NAME
    gcloud pubsub snapshots describe - describes a Cloud Pub/Sub snapshot

SYNOPSIS
    gcloud pubsub snapshots describe SNAPSHOT [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a Cloud Pub/Sub snapshot.

POSITIONAL ARGUMENTS
     SNAPSHOT
        snapshot to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub snapshots describe

        $ gcloud beta pubsub snapshots describe
```

### gcloud pubsub snapshots list

```text
NAME
    gcloud pubsub snapshots list - lists all the snapshots in a given project

SYNOPSIS
    gcloud pubsub snapshots list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all the snapshots in a given project.

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

        $ gcloud alpha pubsub snapshots list

        $ gcloud beta pubsub snapshots list
```

### gcloud beta pubsub snapshots create

```text
NAME
    gcloud beta pubsub snapshots create - creates one or more Cloud Pub/Sub
        snapshots

SYNOPSIS
    gcloud beta pubsub snapshots create SNAPSHOT [SNAPSHOT ...]
        --subscription=SUBSCRIPTION [--labels=[KEY=VALUE,...]]
        [--subscription-project=SUBSCRIPTION_PROJECT] [--tags=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub snapshots delete

```text
NAME
    gcloud beta pubsub snapshots delete - deletes one or more Cloud Pub/Sub
        snapshots

SYNOPSIS
    gcloud beta pubsub snapshots delete SNAPSHOT [SNAPSHOT ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub snapshots describe

```text
NAME
    gcloud beta pubsub snapshots describe - describes a Cloud Pub/Sub snapshot

SYNOPSIS
    gcloud beta pubsub snapshots describe SNAPSHOT [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub snapshots list

```text
NAME
    gcloud beta pubsub snapshots list - lists all the snapshots in a given
        project

SYNOPSIS
    gcloud beta pubsub snapshots list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub snapshots create

```text
NAME
    gcloud alpha pubsub snapshots create - creates one or more Cloud Pub/Sub
        snapshots

SYNOPSIS
    gcloud alpha pubsub snapshots create SNAPSHOT [SNAPSHOT ...]
        --subscription=SUBSCRIPTION [--labels=[KEY=VALUE,...]]
        [--subscription-project=SUBSCRIPTION_PROJECT] [--tags=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub snapshots delete

```text
NAME
    gcloud alpha pubsub snapshots delete - deletes one or more Cloud Pub/Sub
        snapshots

SYNOPSIS
    gcloud alpha pubsub snapshots delete SNAPSHOT [SNAPSHOT ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub snapshots describe

```text
NAME
    gcloud alpha pubsub snapshots describe - describes a Cloud Pub/Sub snapshot

SYNOPSIS
    gcloud alpha pubsub snapshots describe SNAPSHOT [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub snapshots list

```text
NAME
    gcloud alpha pubsub snapshots list - lists all the snapshots in a given
        project

SYNOPSIS
    gcloud alpha pubsub snapshots list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/snapshots (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

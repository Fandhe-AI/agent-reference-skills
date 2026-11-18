---
source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/logs
---

# gcloud logging logs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud logging logs delete

```text
NAME
    gcloud logging logs delete - delete all entries from a log in the global
        _Default log bucket

SYNOPSIS
    gcloud logging logs delete LOG_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete all entries from a log in the global _Default log bucket. With no
    entries, the log will not appear in the list of your project's logs.
    However, you can write new entries to the log.

EXAMPLES
    To delete all entries from log 'my-log' in the global _Default log bucket:

        $ gcloud logging logs delete my-log

POSITIONAL ARGUMENTS
     LOG_NAME
        Log name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging logs delete

        $ gcloud beta logging logs delete
```

### gcloud logging logs list

```text
NAME
    gcloud logging logs list - list your project's logs

SYNOPSIS
    gcloud logging logs list [--bucket=BUCKET --location=LOCATION --view=VIEW]
        [--filter=EXPRESSION] [--limit=LIMIT] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Only logs that contain log entries are listed.

EXAMPLES
    To list all logs in current project:

        $ gcloud logging logs list

    To list all logs for a view:

        $ gcloud logging logs list --bucket=[BUCKET_ID] \
            --location=[LOCATION] --view=[VIEW_ID]

FLAGS
     These arguments are used in conjunction with the parent to construct a
     view resource.

     --bucket=BUCKET
        Id of the log bucket.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --location=LOCATION
        Location of the log bucket.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --view=VIEW
        Id of the view.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

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

NOTES
    These variants are also available:

        $ gcloud alpha logging logs list

        $ gcloud beta logging logs list
```

### gcloud beta logging logs delete

```text
NAME
    gcloud beta logging logs delete - delete all entries from a log in the
        global _Default log bucket

SYNOPSIS
    gcloud beta logging logs delete LOG_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging logs list

```text
NAME
    gcloud beta logging logs list - list your project's logs

SYNOPSIS
    gcloud beta logging logs list
        [--bucket=BUCKET --location=LOCATION --view=VIEW] [--filter=EXPRESSION]
        [--limit=LIMIT] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging logs delete

```text
NAME
    gcloud alpha logging logs delete - delete all entries from a log in the
        global _Default log bucket

SYNOPSIS
    gcloud alpha logging logs delete LOG_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging logs list

```text
NAME
    gcloud alpha logging logs list - list your project's logs

SYNOPSIS
    gcloud alpha logging logs list
        [--bucket=BUCKET --location=LOCATION --view=VIEW] [--filter=EXPRESSION]
        [--limit=LIMIT] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/logs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

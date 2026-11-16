---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/databases/get-iam-policy
---

# gcloud spanner databases get-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner databases get-iam-policy

```text
NAME
    gcloud spanner databases get-iam-policy - get the IAM policy for a Cloud
        Spanner database

SYNOPSIS
    gcloud spanner databases get-iam-policy (DATABASE : --instance=INSTANCE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the IAM policy for a Cloud Spanner database.

EXAMPLES
    To print the IAM policy for a given Cloud Spanner database, run:

        $ gcloud spanner databases get-iam-policy my-database-id

POSITIONAL ARGUMENTS
     Database resource - The Cloud Spanner database to get IAM policy binding
     for. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE
          ID of the database or fully qualified identifier for the database.

          To set the database attribute:
          + provide the argument database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The Cloud Spanner instance for the database.

          To set the instance attribute:
          + provide the argument database on the command line with a fully
            specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

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

NOTES
    These variants are also available:

        $ gcloud alpha spanner databases get-iam-policy

        $ gcloud beta spanner databases get-iam-policy
```

### gcloud beta spanner databases get-iam-policy

```text
NAME
    gcloud beta spanner databases get-iam-policy - get the IAM policy for a
        Cloud Spanner database

SYNOPSIS
    gcloud beta spanner databases get-iam-policy
        (DATABASE : --instance=INSTANCE) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner databases get-iam-policy

```text
NAME
    gcloud alpha spanner databases get-iam-policy - get the IAM policy for a
        Cloud Spanner database

SYNOPSIS
    gcloud alpha spanner databases get-iam-policy
        (DATABASE : --instance=INSTANCE) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/databases/get-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

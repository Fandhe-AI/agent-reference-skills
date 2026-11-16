---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/ssl/server-ca-certs
---

# gcloud sql ssl server-ca-certs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql ssl server-ca-certs create

```text
NAME
    gcloud sql ssl server-ca-certs create - create a server CA cert for a Cloud
        SQL instance

SYNOPSIS
    gcloud sql ssl server-ca-certs create --instance=INSTANCE, -i INSTANCE
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a server CA cert for a Cloud SQL instance.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

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

NOTES
    These variants are also available:

        $ gcloud alpha sql ssl server-ca-certs create

        $ gcloud beta sql ssl server-ca-certs create
```

### gcloud sql ssl server-ca-certs list

```text
NAME
    gcloud sql ssl server-ca-certs list - list all server CA certs for a Cloud
        SQL instance

SYNOPSIS
    gcloud sql ssl server-ca-certs list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all server CA certs for a Cloud SQL instance.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

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

        $ gcloud alpha sql ssl server-ca-certs list

        $ gcloud beta sql ssl server-ca-certs list
```

### gcloud sql ssl server-ca-certs rollback

```text
NAME
    gcloud sql ssl server-ca-certs rollback - roll back to the previous server
        CA cert for a Cloud SQL instance

SYNOPSIS
    gcloud sql ssl server-ca-certs rollback --instance=INSTANCE, -i INSTANCE
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Roll back to the previous server CA cert for a Cloud SQL instance.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

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

NOTES
    These variants are also available:

        $ gcloud alpha sql ssl server-ca-certs rollback

        $ gcloud beta sql ssl server-ca-certs rollback
```

### gcloud sql ssl server-ca-certs rotate

```text
NAME
    gcloud sql ssl server-ca-certs rotate - rotate in the upcoming server CA
        cert for a Cloud SQL instance

SYNOPSIS
    gcloud sql ssl server-ca-certs rotate --instance=INSTANCE, -i INSTANCE
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Rotate in the upcoming server CA cert for a Cloud SQL instance.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

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

NOTES
    These variants are also available:

        $ gcloud alpha sql ssl server-ca-certs rotate

        $ gcloud beta sql ssl server-ca-certs rotate
```

### gcloud beta sql ssl server-ca-certs create

```text
NAME
    gcloud beta sql ssl server-ca-certs create - create a server CA cert for a
        Cloud SQL instance

SYNOPSIS
    gcloud beta sql ssl server-ca-certs create --instance=INSTANCE, -i INSTANCE
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql ssl server-ca-certs list

```text
NAME
    gcloud beta sql ssl server-ca-certs list - list all server CA certs for a
        Cloud SQL instance

SYNOPSIS
    gcloud beta sql ssl server-ca-certs list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql ssl server-ca-certs rollback

```text
NAME
    gcloud beta sql ssl server-ca-certs rollback - roll back to the previous
        server CA cert for a Cloud SQL instance

SYNOPSIS
    gcloud beta sql ssl server-ca-certs rollback --instance=INSTANCE, -i
        INSTANCE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql ssl server-ca-certs rotate

```text
NAME
    gcloud beta sql ssl server-ca-certs rotate - rotate in the upcoming server
        CA cert for a Cloud SQL instance

SYNOPSIS
    gcloud beta sql ssl server-ca-certs rotate --instance=INSTANCE, -i INSTANCE
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql ssl server-ca-certs create

```text
NAME
    gcloud alpha sql ssl server-ca-certs create - create a server CA cert for a
        Cloud SQL instance

SYNOPSIS
    gcloud alpha sql ssl server-ca-certs create --instance=INSTANCE, -i
        INSTANCE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql ssl server-ca-certs list

```text
NAME
    gcloud alpha sql ssl server-ca-certs list - list all server CA certs for a
        Cloud SQL instance

SYNOPSIS
    gcloud alpha sql ssl server-ca-certs list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql ssl server-ca-certs rollback

```text
NAME
    gcloud alpha sql ssl server-ca-certs rollback - roll back to the previous
        server CA cert for a Cloud SQL instance

SYNOPSIS
    gcloud alpha sql ssl server-ca-certs rollback --instance=INSTANCE, -i
        INSTANCE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql ssl server-ca-certs rotate

```text
NAME
    gcloud alpha sql ssl server-ca-certs rotate - rotate in the upcoming server
        CA cert for a Cloud SQL instance

SYNOPSIS
    gcloud alpha sql ssl server-ca-certs rotate --instance=INSTANCE, -i
        INSTANCE [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/ssl/server-ca-certs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

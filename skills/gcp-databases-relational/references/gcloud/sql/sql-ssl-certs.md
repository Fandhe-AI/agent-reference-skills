---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/ssl-certs
---

# gcloud sql ssl-certs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql ssl-certs create

```text
NAME
    gcloud sql ssl-certs create - creates an SSL certificate for a Cloud SQL
        instance

SYNOPSIS
    gcloud sql ssl-certs create COMMON_NAME CERT_FILE --instance=INSTANCE, -i
        INSTANCE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Creates an SSL certificate for a Cloud SQL instance.

    gcloud sql ssl-certs is deprecated. Use gcloud sql ssl client-certs
    instead.

POSITIONAL ARGUMENTS
     COMMON_NAME
        User supplied name. Constrained to [a-zA-Z.-_ ]+.

     CERT_FILE
        Location of file which the private key of the created ssl-cert will be
        written to.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql ssl-certs create

        $ gcloud beta sql ssl-certs create
```

### gcloud sql ssl-certs delete

```text
NAME
    gcloud sql ssl-certs delete - deletes an SSL certificate for a Cloud SQL
        instance

SYNOPSIS
    gcloud sql ssl-certs delete COMMON_NAME --instance=INSTANCE, -i INSTANCE
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Deletes an SSL certificate for a Cloud SQL instance.

    gcloud sql ssl-certs is deprecated. Use gcloud sql ssl client-certs
    instead.

POSITIONAL ARGUMENTS
     COMMON_NAME
        User supplied name. Constrained to [a-zA-Z.-_ ]+.

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

        $ gcloud alpha sql ssl-certs delete

        $ gcloud beta sql ssl-certs delete
```

### gcloud sql ssl-certs describe

```text
NAME
    gcloud sql ssl-certs describe - retrieves information about an SSL cert for
        a Cloud SQL instance

SYNOPSIS
    gcloud sql ssl-certs describe COMMON_NAME --instance=INSTANCE, -i INSTANCE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Retrieves information about an SSL cert for a Cloud SQL
    instance.

    gcloud sql ssl-certs is deprecated. Use gcloud sql ssl client-certs
    instead.

POSITIONAL ARGUMENTS
     COMMON_NAME
        User supplied name. Constrained to [a-zA-Z.-_ ]+.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql ssl-certs describe

        $ gcloud beta sql ssl-certs describe
```

### gcloud sql ssl-certs list

```text
NAME
    gcloud sql ssl-certs list - lists all SSL certs for a Cloud SQL instance

SYNOPSIS
    gcloud sql ssl-certs list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Lists all SSL certs for a Cloud SQL instance.

    gcloud sql ssl-certs is deprecated. Use gcloud sql ssl client-certs
    instead.

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

        $ gcloud alpha sql ssl-certs list

        $ gcloud beta sql ssl-certs list
```

### gcloud beta sql ssl-certs create

```text
NAME
    gcloud beta sql ssl-certs create - creates an SSL certificate for a Cloud
        SQL instance

SYNOPSIS
    gcloud beta sql ssl-certs create COMMON_NAME CERT_FILE --instance=INSTANCE,
        -i INSTANCE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql ssl-certs delete

```text
NAME
    gcloud beta sql ssl-certs delete - deletes an SSL certificate for a Cloud
        SQL instance

SYNOPSIS
    gcloud beta sql ssl-certs delete COMMON_NAME --instance=INSTANCE, -i
        INSTANCE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql ssl-certs describe

```text
NAME
    gcloud beta sql ssl-certs describe - retrieves information about an SSL
        cert for a Cloud SQL instance

SYNOPSIS
    gcloud beta sql ssl-certs describe COMMON_NAME --instance=INSTANCE, -i
        INSTANCE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql ssl-certs list

```text
NAME
    gcloud beta sql ssl-certs list - lists all SSL certs for a Cloud SQL
        instance

SYNOPSIS
    gcloud beta sql ssl-certs list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql ssl-certs create

```text
NAME
    gcloud alpha sql ssl-certs create - creates an SSL certificate for a Cloud
        SQL instance

SYNOPSIS
    gcloud alpha sql ssl-certs create COMMON_NAME CERT_FILE
        --instance=INSTANCE, -i INSTANCE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql ssl-certs delete

```text
NAME
    gcloud alpha sql ssl-certs delete - deletes an SSL certificate for a Cloud
        SQL instance

SYNOPSIS
    gcloud alpha sql ssl-certs delete COMMON_NAME --instance=INSTANCE, -i
        INSTANCE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql ssl-certs describe

```text
NAME
    gcloud alpha sql ssl-certs describe - retrieves information about an SSL
        cert for a Cloud SQL instance

SYNOPSIS
    gcloud alpha sql ssl-certs describe COMMON_NAME --instance=INSTANCE, -i
        INSTANCE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql ssl-certs list

```text
NAME
    gcloud alpha sql ssl-certs list - lists all SSL certs for a Cloud SQL
        instance

SYNOPSIS
    gcloud alpha sql ssl-certs list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated: the 593.0.0 help marks these commands as deprecated (quoted from DESCRIPTION) — `gcloud sql ssl-certs create`: Creates an SSL certificate for a Cloud SQL instance.; `gcloud sql ssl-certs delete`: Deletes an SSL certificate for a Cloud SQL instance.; `gcloud sql ssl-certs describe`: Retrieves information about an SSL cert for a Cloud SQL instance.; `gcloud sql ssl-certs list`: Lists all SSL certs for a Cloud SQL instance.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/ssl-certs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

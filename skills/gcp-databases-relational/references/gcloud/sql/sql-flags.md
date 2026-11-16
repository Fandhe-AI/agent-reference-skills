---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/flags
---

# gcloud sql flags

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql flags list

```text
NAME
    gcloud sql flags list - list customizable flags for Google Cloud SQL
        instances

SYNOPSIS
    gcloud sql flags list
        [--database-version=DATABASE_VERSION; default="MYSQL_8_0"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List customizable flags for Google Cloud SQL instances.

FLAGS
     --database-version=DATABASE_VERSION; default="MYSQL_8_0"
        The database engine type and versions. If left unspecified, MYSQL_8_0
        is used. See the list of database versions at
        https://cloud.google.com/sql/docs/mysql/admin-api/rest/v1beta4/SqlDatabaseVersion.
        Apart from listed major versions, DATABASE_VERSION also accepts
        supported minor versions. DATABASE_VERSION must be one of: MYSQL_5_6,
        MYSQL_5_7, MYSQL_8_0, MYSQL_8_4, MYSQL_9_7, POSTGRES_9_6, POSTGRES_10,
        POSTGRES_11, POSTGRES_12, POSTGRES_13, POSTGRES_14, POSTGRES_15,
        POSTGRES_16, POSTGRES_17, POSTGRES_18, POSTGRES_19,
        SQLSERVER_2017_EXPRESS, SQLSERVER_2017_WEB, SQLSERVER_2017_STANDARD,
        SQLSERVER_2017_ENTERPRISE, SQLSERVER_2019_EXPRESS, SQLSERVER_2019_WEB,
        SQLSERVER_2019_STANDARD, SQLSERVER_2019_ENTERPRISE,
        SQLSERVER_2022_EXPRESS, SQLSERVER_2022_WEB, SQLSERVER_2022_STANDARD,
        SQLSERVER_2022_ENTERPRISE, SQLSERVER_2025_EXPRESS,
        SQLSERVER_2025_STANDARD, SQLSERVER_2025_ENTERPRISE.

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

        $ gcloud alpha sql flags list

        $ gcloud beta sql flags list
```

### gcloud beta sql flags list

```text
NAME
    gcloud beta sql flags list - list customizable flags for Google Cloud SQL
        instances

SYNOPSIS
    gcloud beta sql flags list
        [--database-version=DATABASE_VERSION; default="MYSQL_8_0"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql flags list

```text
NAME
    gcloud alpha sql flags list - list customizable flags for Google Cloud SQL
        instances

SYNOPSIS
    gcloud alpha sql flags list
        [--database-version=DATABASE_VERSION; default="MYSQL_8_0"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/flags (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

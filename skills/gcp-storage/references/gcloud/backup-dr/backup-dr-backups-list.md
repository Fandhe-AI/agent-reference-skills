---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backups/list
---

# gcloud backup-dr backups list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr backups list

```text
NAME
    gcloud backup-dr backups list - list Backups

SYNOPSIS
    gcloud backup-dr backups list
        [--backup-vault=BACKUP_VAULT
          --data-source=DATA_SOURCE --location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays all backups in a project.

EXAMPLES
    To list backups for all data sources, backup vaults and locations, run:

        $ gcloud backup-dr backups list

    To list all backups for a data source my-data-source and a backup vault
    my-vault in a location my-location, run:

        $ gcloud backup-dr backups list --data-source=my-data-source \
            --backup-vault=my-vault --location=my-location

FLAGS
     DataSource resource - Data source to list backups from. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument --data-source on the command line with a fully
        specified name;
      * default is all data sources with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --backup-vault=BACKUP_VAULT
        The ID of the Backup Vault.

        To set the backup-vault attribute:
        * provide the argument --data-source on the command line with a fully
          specified name;
        * default is all data sources with a fully specified name;
        * provide the argument --backup-vault on the command line;
        * default is all backup vaults .

     --data-source=DATA_SOURCE
        ID of the dataSource or fully qualified identifier for the dataSource.

        To set the data-source attribute:
        * provide the argument --data-source on the command line;
        * default is all data sources .

     --location=LOCATION
        Location ID of the resource.

        To set the location attribute:
        * provide the argument --data-source on the command line with a fully
          specified name;
        * default is all data sources with a fully specified name;
        * provide the argument --location on the command line;
        * default is all locations .

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

API REFERENCE
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backups list

        $ gcloud beta backup-dr backups list
```

### gcloud beta backup-dr backups list

```text
NAME
    gcloud beta backup-dr backups list - list Backups

SYNOPSIS
    gcloud beta backup-dr backups list
        [--backup-vault=BACKUP_VAULT
          --data-source=DATA_SOURCE --location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backups list

```text
NAME
    gcloud alpha backup-dr backups list - list Backups

SYNOPSIS
    gcloud alpha backup-dr backups list
        [--backup-vault=BACKUP_VAULT
          --data-source=DATA_SOURCE --location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backups/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

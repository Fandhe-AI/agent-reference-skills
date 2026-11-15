---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/resource-backup-config
---

# gcloud backup-dr resource-backup-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr resource-backup-config list

```text
NAME
    gcloud backup-dr resource-backup-config list - show backup configuration
        metadata associated with specified resources in a particular location
        for the project

SYNOPSIS
    gcloud backup-dr resource-backup-config list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show backup configuration metadata associated with specified resources in a
    particular location for the project.

EXAMPLES
      o To list protection summary for a resource named resource-1:

        $ gcloud backup-dr resource-backup-config list \
        --project=sample-project --location=us-central1 \
        --filter="target_resource_display_name=resource-1"

      o To list protection summary for a resource named resource-1 that has
        backup configured:

        $ gcloud backup-dr resource-backup-config list \
        --project=sample-project --location=us-central1 \
        --filter="target_resource_display_name=resource-1 AND \
        backup_configured=true"

    You can sort the results using the --sort-by flag. The only supported field
    for sorting is target_resource_display_name.

    Example of sorting:

        $ gcloud backup-dr resource-backup-config list \
            --project=sample-project --location=us-central1 \
            --sort-by="target_resource_display_name"

REQUIRED FLAGS
     Location resource - Location for which the resource backup config should
     be listed. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

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

BRIEF
    list backup configurations for a specified project and location.

FLAGS/ARGUMENTS
    --project: Project for which backup configurations should be listed.

    --location: Location for which backup configurations should be listed.

    --filter: The filter expression to filter results.

    --sort-by: The field to sort results by.

SUBARGUMENTS
    target_resource_display_name: Name of the resource for which protection
    summary is to be listed.

    target_resource_type: Type of resource for which protection summary is to
    be displayed.

    Allowed values:
      o CLOUD_SQL_INSTANCE
      o COMPUTE_ENGINE_VM

    backup_configured: Displays if the specified resource has backups
    configured.

    vaulted: Displays if configured backups are protected using a backup vault.

    backup_configs_details.backup_config_source_display_name: Name of the
    backup schedule applied to the resource.

    backup_configs_details.type: Backup schedule type applied to the resource.

    Allowed values:
      o CLOUD_SQL_INSTANCE_BACKUP_CONFIG
      o COMPUTE_ENGINE_RESOURCE_POLICY
      o BACKUPDR_BACKUP_PLAN
      o BACKUPDR_TEMPLATE

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr resource-backup-config list

        $ gcloud beta backup-dr resource-backup-config list
```

### gcloud beta backup-dr resource-backup-config list

```text
NAME
    gcloud beta backup-dr resource-backup-config list - show backup
        configuration metadata associated with specified resources in a
        particular location for the project

SYNOPSIS
    gcloud beta backup-dr resource-backup-config list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr resource-backup-config list

```text
NAME
    gcloud alpha backup-dr resource-backup-config list - show backup
        configuration metadata associated with specified resources in a
        particular location for the project

SYNOPSIS
    gcloud alpha backup-dr resource-backup-config list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/resource-backup-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

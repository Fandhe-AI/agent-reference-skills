---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/restore-template-executions
---

# gcloud backup-dr restore-template-executions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr restore-template-executions describe

```text
NAME
    gcloud backup-dr restore-template-executions describe - show details of the
        restore template execution

SYNOPSIS
    gcloud backup-dr restore-template-executions describe
        (RESTORE_TEMPLATE_EXECUTION
          : --location=LOCATION --restore-template=RESTORE_TEMPLATE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show all configuration data associated with the specified restore template
    execution.

EXAMPLES
    To view details for restore template execution my-exec under restore
    template my-template in location us-central1, run:

        $ gcloud backup-dr restore-template-executions describe my-exec \
            --restore-template=my-template --location=us-central1

POSITIONAL ARGUMENTS
     Restore template execution resource - Name of the restore template
     execution to describe. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument restore_template_execution on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESTORE_TEMPLATE_EXECUTION
          ID of the restore_template_execution or fully qualified identifier
          for the restore_template_execution.

          To set the restore_template_execution attribute:
          + provide the argument restore_template_execution on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID of the resource.

          To set the location attribute:
          + provide the argument restore_template_execution on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

       --restore-template=RESTORE_TEMPLATE
          The ID of the Restore Template.

          To set the restore-template attribute:
          + provide the argument restore_template_execution on the command
            line with a fully specified name;
          + provide the argument --restore-template on the command line.

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

        $ gcloud alpha backup-dr restore-template-executions describe

        $ gcloud beta backup-dr restore-template-executions describe
```

### gcloud backup-dr restore-template-executions list

```text
NAME
    gcloud backup-dr restore-template-executions list - list Cloud Backup and
        DR restore template executions

SYNOPSIS
    gcloud backup-dr restore-template-executions list
        [--location=LOCATION --restore-template=RESTORE_TEMPLATE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List restore template executions under a specified restore template.

EXAMPLES
    To list restore template executions for restore template my-template in
    location us-central1, run:

        $ gcloud backup-dr restore-template-executions list \
            --restore-template=my-template --location=us-central1

FLAGS
     Restore template resource - Restore template to list executions from. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --restore-template on the command line with a
        fully specified name;
      * default is all restore templates with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        Location ID of the resource.

        To set the location attribute:
        * provide the argument --restore-template on the command line with a
          fully specified name;
        * default is all restore templates with a fully specified name;
        * provide the argument --location on the command line;
        * default is all locations .

     --restore-template=RESTORE_TEMPLATE
        ID of the restore_template or fully qualified identifier for the
        restore_template.

        To set the restore-template attribute:
        * provide the argument --restore-template on the command line;
        * default is all restore templates .

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

        $ gcloud alpha backup-dr restore-template-executions list

        $ gcloud beta backup-dr restore-template-executions list
```

### gcloud backup-dr restore-template-executions trigger-restore-cleanup

```text
NAME
    gcloud backup-dr restore-template-executions trigger-restore-cleanup -
        trigger restore cleanup for a restore template execution

SYNOPSIS
    gcloud backup-dr restore-template-executions trigger-restore-cleanup
        (RESTORE_TEMPLATE_EXECUTION
          : --location=LOCATION --restore-template=RESTORE_TEMPLATE) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Trigger restore cleanup for a restore template execution.

EXAMPLES
    To trigger restore cleanup for execution my-exec under template my-template
    in location us-central1, run:

        $ gcloud backup-dr restore-template-executions \
            trigger-restore-cleanup my-exec --restore-template=my-template \
            --location=us-central1

POSITIONAL ARGUMENTS
     Restore Template Execution resource - to trigger restore cleanup for The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument restore_template_execution on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESTORE_TEMPLATE_EXECUTION
          ID of the Restore Template Execution or fully qualified identifier
          for the Restore Template Execution.

          To set the name attribute:
          + provide the argument restore_template_execution on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Restore Template Execution.

          To set the location attribute:
          + provide the argument restore_template_execution on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

       --restore-template=RESTORE_TEMPLATE
          The ID of the Restore Template.

          To set the restore-template attribute:
          + provide the argument restore_template_execution on the command
            line with a fully specified name;
          + provide the argument --restore-template on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Trigger restore cleanup for a restore template execution.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr restore-template-executions \
            trigger-restore-cleanup

        $ gcloud beta backup-dr restore-template-executions \
            trigger-restore-cleanup
```

### gcloud beta backup-dr restore-template-executions describe

```text
NAME
    gcloud beta backup-dr restore-template-executions describe - show details
        of the restore template execution

SYNOPSIS
    gcloud beta backup-dr restore-template-executions describe
        (RESTORE_TEMPLATE_EXECUTION
          : --location=LOCATION --restore-template=RESTORE_TEMPLATE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr restore-template-executions list

```text
NAME
    gcloud beta backup-dr restore-template-executions list - list Cloud Backup
        and DR restore template executions

SYNOPSIS
    gcloud beta backup-dr restore-template-executions list
        [--location=LOCATION --restore-template=RESTORE_TEMPLATE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr restore-template-executions trigger-restore-cleanup

```text
NAME
    gcloud beta backup-dr restore-template-executions trigger-restore-cleanup -
        trigger restore cleanup for a restore template execution

SYNOPSIS
    gcloud beta backup-dr restore-template-executions trigger-restore-cleanup
        (RESTORE_TEMPLATE_EXECUTION
          : --location=LOCATION --restore-template=RESTORE_TEMPLATE) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-template-executions describe

```text
NAME
    gcloud alpha backup-dr restore-template-executions describe - show details
        of the restore template execution

SYNOPSIS
    gcloud alpha backup-dr restore-template-executions describe
        (RESTORE_TEMPLATE_EXECUTION
          : --location=LOCATION --restore-template=RESTORE_TEMPLATE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-template-executions list

```text
NAME
    gcloud alpha backup-dr restore-template-executions list - list Cloud Backup
        and DR restore template executions

SYNOPSIS
    gcloud alpha backup-dr restore-template-executions list
        [--location=LOCATION --restore-template=RESTORE_TEMPLATE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-template-executions trigger-restore-cleanup

```text
NAME
    gcloud alpha backup-dr restore-template-executions trigger-restore-cleanup
        - trigger restore cleanup for a restore template execution

SYNOPSIS
    gcloud alpha backup-dr restore-template-executions trigger-restore-cleanup
        (RESTORE_TEMPLATE_EXECUTION
          : --location=LOCATION --restore-template=RESTORE_TEMPLATE) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/restore-template-executions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

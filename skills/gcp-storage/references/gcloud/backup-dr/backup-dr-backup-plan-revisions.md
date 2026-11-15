---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backup-plan-revisions
---

# gcloud backup-dr backup-plan-revisions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr backup-plan-revisions describe

```text
NAME
    gcloud backup-dr backup-plan-revisions describe - show details of the
        backup plan revision

SYNOPSIS
    gcloud backup-dr backup-plan-revisions describe
        (BACKUP_PLAN_REVISION : --backup_plan=BACKUP_PLAN --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show all data associated with the specified backup plan revision.

EXAMPLES
    To view details for backup plan revision 'BACKUP_PLAN_REVISION', run:

        $ gcloud backup-dr backup-plan-revisions describe \
            BACKUP_PLAN_REVISION

POSITIONAL ARGUMENTS
     Backup plan revision resource - Name of the backup plan revision to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup_plan_revision on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_PLAN_REVISION
          ID of the backup_plan_revision or fully qualified identifier for the
          backup_plan_revision.

          To set the backup_plan_revision attribute:
          + provide the argument backup_plan_revision on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --backup_plan=BACKUP_PLAN
          The ID of the Backup Plan

          To set the backup_plan attribute:
          + provide the argument backup_plan_revision on the command line
            with a fully specified name;
          + provide the argument --backup_plan on the command line.

       --location=LOCATION
          Location ID of the resource.

          To set the location attribute:
          + provide the argument backup_plan_revision on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha backup-dr backup-plan-revisions describe

        $ gcloud beta backup-dr backup-plan-revisions describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud backup-dr backup-plan-revisions describe BACKUP_PLAN_REVISION \
    --backup_plan=my-backup-plan \
    --location=us-central1
```

### gcloud backup-dr backup-plan-revisions list

```text
NAME
    gcloud backup-dr backup-plan-revisions list - list backup plan revisions

SYNOPSIS
    gcloud backup-dr backup-plan-revisions list
        [--backup-plan=BACKUP_PLAN --location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List backup plan revisions in the project.

EXAMPLES
    To list backup plan revisions for all backup plans and locations, run:

        $ gcloud backup-dr backup-plan-revisions list

    To list all backup plan revisions for a backup plan my-backup-plan, run:

        $ gcloud backup-dr backup-plan-revisions list \
            --backup-plan=my-backup-plan

    To list all backup plan revisions for a backup plan my-backup-plan in
    location my-location, run:

        $ gcloud backup-dr backup-plan-revisions list \
            --backup-plan=my-backup-plan --location=my-location

FLAGS
     Backup plan resource - Backup plan to list backup plan revisions from. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --backup-plan on the command line with a fully
        specified name;
      * default is all backup plans with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --backup-plan=BACKUP_PLAN
        ID of the backup_plan or fully qualified identifier for the
        backup_plan.

        To set the backup-plan attribute:
        * provide the argument --backup-plan on the command line;
        * default is all backup plans .

     --location=LOCATION
        Location ID of the resource.

        To set the location attribute:
        * provide the argument --backup-plan on the command line with a fully
          specified name;
        * default is all backup plans with a fully specified name;
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

        $ gcloud alpha backup-dr backup-plan-revisions list

        $ gcloud beta backup-dr backup-plan-revisions list
```

### gcloud beta backup-dr backup-plan-revisions describe

```text
NAME
    gcloud beta backup-dr backup-plan-revisions describe - show details of the
        backup plan revision

SYNOPSIS
    gcloud beta backup-dr backup-plan-revisions describe
        (BACKUP_PLAN_REVISION : --backup_plan=BACKUP_PLAN --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr backup-plan-revisions list

```text
NAME
    gcloud beta backup-dr backup-plan-revisions list - list backup plan
        revisions

SYNOPSIS
    gcloud beta backup-dr backup-plan-revisions list
        [--backup-plan=BACKUP_PLAN --location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-plan-revisions describe

```text
NAME
    gcloud alpha backup-dr backup-plan-revisions describe - show details of the
        backup plan revision

SYNOPSIS
    gcloud alpha backup-dr backup-plan-revisions describe
        (BACKUP_PLAN_REVISION : --backup_plan=BACKUP_PLAN --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backup-plan-revisions list

```text
NAME
    gcloud alpha backup-dr backup-plan-revisions list - list backup plan
        revisions

SYNOPSIS
    gcloud alpha backup-dr backup-plan-revisions list
        [--backup-plan=BACKUP_PLAN --location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example passes only `BACKUP_PLAN_REVISION`; the SYNOPSIS also requires `--backup_plan` and `--location` for the resource (no property sets them), and gcloud 593.0.0 fails with "Error parsing [backup_plan_revision]" without them, so the runnable form adds `--backup_plan=my-backup-plan --location=us-central1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backup-plan-revisions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

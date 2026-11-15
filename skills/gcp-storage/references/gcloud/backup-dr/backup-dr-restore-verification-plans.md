---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/restore-verification-plans
---

# gcloud backup-dr restore-verification-plans

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr restore-verification-plans create

```text
NAME
    gcloud backup-dr restore-verification-plans create - create a Restore
        Verification Plan

SYNOPSIS
    gcloud backup-dr restore-verification-plans create
        (RESTORE_VERIFICATION_PLAN : --location=LOCATION) --schedule=SCHEDULE
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--time-zone=TIME_ZONE; default="UTC"]
        [--failure-cleanup-delay=FAILURE_CLEANUP_DELAY
          | --skip-failure-cleanup]
        [--skip-success-cleanup
          | --success-cleanup-delay=SUCCESS_CLEANUP_DELAY]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Restore Verification Plan.

EXAMPLES
    To create a restore verification plan with id sample-plan in location
    us-central1, run:

        $ gcloud backup-dr restore-verification-plans create sample-plan \
            --location=us-central1 --schedule="0 1 * * *" \
            --time-zone="America/New_York"

POSITIONAL ARGUMENTS
     Restore Verification Plan resource - to create The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument restore_verification_plan on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESTORE_VERIFICATION_PLAN
          ID of the Restore Verification Plan or fully qualified identifier for
          the Restore Verification Plan.

          To set the name attribute:
          + provide the argument restore_verification_plan on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Restore Verification Plan.

          To set the location attribute:
          + provide the argument restore_verification_plan on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --schedule=SCHEDULE
        Cron schedule for the restore verification plan.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --description=DESCRIPTION
        Description of the restore verification plan.

     --labels=[KEY=VALUE,...]
        Optional resource labels to represent metadata provided by the user.

     --time-zone=TIME_ZONE; default="UTC"
        Time zone for the schedule (e.g., America/New_York).

     At most one of these can be specified:

       --failure-cleanup-delay=FAILURE_CLEANUP_DELAY
          Delay before cleaning up restored resources upon failed verification
          (e.g., 24h, 0s).

       --skip-failure-cleanup
          If set, restored resources will not be cleaned up upon failed
          verification.

     At most one of these can be specified:

       --skip-success-cleanup
          If set, restored resources will not be cleaned up upon successful
          verification.

       --success-cleanup-delay=SUCCESS_CLEANUP_DELAY
          Delay before cleaning up restored resources upon successful
          verification (e.g., 1h, 0s).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Create a restore verification plan.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr restore-verification-plans create

        $ gcloud beta backup-dr restore-verification-plans create
```

### gcloud backup-dr restore-verification-plans delete

```text
NAME
    gcloud backup-dr restore-verification-plans delete - delete a Restore
        Verification Plan

SYNOPSIS
    gcloud backup-dr restore-verification-plans delete
        (RESTORE_VERIFICATION_PLAN : --location=LOCATION) [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Restore Verification Plan.

EXAMPLES
    To delete a restore verification plan with id sample-plan in location
    us-central1, run:

        $ gcloud backup-dr restore-verification-plans delete sample-plan \
            --location=us-central1

POSITIONAL ARGUMENTS
     Restore Verification Plan resource - to delete The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument restore_verification_plan on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESTORE_VERIFICATION_PLAN
          ID of the Restore Verification Plan or fully qualified identifier for
          the Restore Verification Plan.

          To set the name attribute:
          + provide the argument restore_verification_plan on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Restore Verification Plan.

          To set the location attribute:
          + provide the argument restore_verification_plan on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --force
        If set, all associations under this plan will also be deleted.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Delete a restore verification plan.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr restore-verification-plans delete

        $ gcloud beta backup-dr restore-verification-plans delete
```

### gcloud backup-dr restore-verification-plans describe

```text
NAME
    gcloud backup-dr restore-verification-plans describe - describe a restore
        verification plan

SYNOPSIS
    gcloud backup-dr restore-verification-plans describe
        (RESTORE_VERIFICATION_PLAN : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a restore verification plan.

EXAMPLES
    To describe a restore verification plan with id sample-plan in location
    us-central1, run:

        $ gcloud backup-dr restore-verification-plans describe sample-plan \
            --location=us-central1

POSITIONAL ARGUMENTS
     Restore verification plan resource - The restore verification plan to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument restore_verification_plan on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESTORE_VERIFICATION_PLAN
          ID of the restore_verification_plan or fully qualified identifier for
          the restore_verification_plan.

          To set the restore_verification_plan attribute:
          + provide the argument restore_verification_plan on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID of the resource.

          To set the location attribute:
          + provide the argument restore_verification_plan on the command
            line with a fully specified name;
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

        $ gcloud alpha backup-dr restore-verification-plans describe

        $ gcloud beta backup-dr restore-verification-plans describe
```

### gcloud backup-dr restore-verification-plans list

```text
NAME
    gcloud backup-dr restore-verification-plans list - list restore
        verification plans in a project

SYNOPSIS
    gcloud backup-dr restore-verification-plans list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List restore verification plans in a project.

EXAMPLES
    To list restore verification plans for all locations, run:

        $ gcloud backup-dr restore-verification-plans list

    To list restore verification plans in location us-central1, run:

        $ gcloud backup-dr restore-verification-plans list \
            --location=us-central1

FLAGS
     Location resource - The location to list restore verification plans for.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * default is all locations with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
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

        $ gcloud alpha backup-dr restore-verification-plans list

        $ gcloud beta backup-dr restore-verification-plans list
```

### gcloud beta backup-dr restore-verification-plans create

```text
NAME
    gcloud beta backup-dr restore-verification-plans create - create a Restore
        Verification Plan

SYNOPSIS
    gcloud beta backup-dr restore-verification-plans create
        (RESTORE_VERIFICATION_PLAN : --location=LOCATION) --schedule=SCHEDULE
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--time-zone=TIME_ZONE; default="UTC"]
        [--failure-cleanup-delay=FAILURE_CLEANUP_DELAY
          | --skip-failure-cleanup]
        [--skip-success-cleanup
          | --success-cleanup-delay=SUCCESS_CLEANUP_DELAY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr restore-verification-plans delete

```text
NAME
    gcloud beta backup-dr restore-verification-plans delete - delete a Restore
        Verification Plan

SYNOPSIS
    gcloud beta backup-dr restore-verification-plans delete
        (RESTORE_VERIFICATION_PLAN : --location=LOCATION) [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr restore-verification-plans describe

```text
NAME
    gcloud beta backup-dr restore-verification-plans describe - describe a
        restore verification plan

SYNOPSIS
    gcloud beta backup-dr restore-verification-plans describe
        (RESTORE_VERIFICATION_PLAN : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr restore-verification-plans list

```text
NAME
    gcloud beta backup-dr restore-verification-plans list - list restore
        verification plans in a project

SYNOPSIS
    gcloud beta backup-dr restore-verification-plans list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-verification-plans create

```text
NAME
    gcloud alpha backup-dr restore-verification-plans create - create a Restore
        Verification Plan

SYNOPSIS
    gcloud alpha backup-dr restore-verification-plans create
        (RESTORE_VERIFICATION_PLAN : --location=LOCATION) --schedule=SCHEDULE
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--time-zone=TIME_ZONE; default="UTC"]
        [--failure-cleanup-delay=FAILURE_CLEANUP_DELAY
          | --skip-failure-cleanup]
        [--skip-success-cleanup
          | --success-cleanup-delay=SUCCESS_CLEANUP_DELAY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-verification-plans delete

```text
NAME
    gcloud alpha backup-dr restore-verification-plans delete - delete a Restore
        Verification Plan

SYNOPSIS
    gcloud alpha backup-dr restore-verification-plans delete
        (RESTORE_VERIFICATION_PLAN : --location=LOCATION) [--async] [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-verification-plans describe

```text
NAME
    gcloud alpha backup-dr restore-verification-plans describe - describe a
        restore verification plan

SYNOPSIS
    gcloud alpha backup-dr restore-verification-plans describe
        (RESTORE_VERIFICATION_PLAN : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-verification-plans list

```text
NAME
    gcloud alpha backup-dr restore-verification-plans list - list restore
        verification plans in a project

SYNOPSIS
    gcloud alpha backup-dr restore-verification-plans list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/restore-verification-plans (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

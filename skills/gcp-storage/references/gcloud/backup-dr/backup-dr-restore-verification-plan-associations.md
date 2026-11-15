---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/restore-verification-plan-associations
---

# gcloud backup-dr restore-verification-plan-associations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr restore-verification-plan-associations create

```text
NAME
    gcloud backup-dr restore-verification-plan-associations create - create a
        new restore verification plan association

SYNOPSIS
    gcloud backup-dr restore-verification-plan-associations create
        (RESTORE_VERIFICATION_PLAN_ASSOCIATION : --location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN)
        --resource-type=RESOURCE_TYPE --restore-template=RESTORE_TEMPLATE
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new restore verification plan association in the project.

EXAMPLES
    To create a new restore verification plan association sample-association
    under restore verification plan sample-plan in project sample-project and
    location us-central1 for resource type compute.googleapis.com/Instance with
    restore template
    projects/sample-project/locations/us-central1/restoreTemplates/sample-template,
    run:

        $ gcloud backup-dr restore-verification-plan-associations create \
            sample-association --restore-verification-plan=sample-plan \
            --project=sample-project --location=us-central1 \
            --resource-type=compute.googleapis.com/Instance \
            --restore-template=projects/sample-project/locations/\
        us-central1/restoreTemplates/sample-template

POSITIONAL ARGUMENTS
     Restore Verification Plan Association resource - Name of the restore
     verification plan association to be created. Once created, this name can't
     be changed. The name must be unique for a restore verification plan. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument RESTORE_VERIFICATION_PLAN_ASSOCIATION on the
        command line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESTORE_VERIFICATION_PLAN_ASSOCIATION
          ID of the Restore Verification Plan Association or fully qualified
          identifier for the Restore Verification Plan Association.

          To set the name attribute:
          + provide the argument RESTORE_VERIFICATION_PLAN_ASSOCIATION on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Restore Verification Plan Association.

          To set the location attribute:
          + provide the argument RESTORE_VERIFICATION_PLAN_ASSOCIATION on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

       --restore-verification-plan=RESTORE_VERIFICATION_PLAN
          The ID of the Restore Verification Plan.

          To set the restore-verification-plan attribute:
          + provide the argument RESTORE_VERIFICATION_PLAN_ASSOCIATION on the
            command line with a fully specified name;
          + provide the argument --restore-verification-plan on the command
            line.

REQUIRED FLAGS
     --resource-type=RESOURCE_TYPE
        Type of the Google Cloud resource to associate.

        For example:
        * compute.<UNIVERSE_DOMAIN>/Instance for Compute Engine instances.

     Restore Template resource - The Restore Template to associate with the
     workload. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --restore-template on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --restore-template on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       --restore-template=RESTORE_TEMPLATE
          ID of the Restore Template or fully qualified identifier for the
          Restore Template.

          To set the name attribute:
          + provide the argument --restore-template on the command line.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --description=DESCRIPTION
        The description of the restore verification plan association.

     --labels=[KEY=VALUE,...]
        Optional resource labels to represent metadata provided by the user.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Creates a new restore verification plan association.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr restore-verification-plan-associations \
            create

        $ gcloud beta backup-dr restore-verification-plan-associations create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud backup-dr restore-verification-plan-associations create sample-association \
    --restore-verification-plan=sample-plan \
    --project=sample-project \
    --location=us-central1 \
    --resource-type=compute.googleapis.com/Instance \
    --restore-template=projects/sample-project/locations/us-central1/restoreTemplates/sample-template
```

### gcloud backup-dr restore-verification-plan-associations delete

```text
NAME
    gcloud backup-dr restore-verification-plan-associations delete - delete the
        specified restore verification plan association

SYNOPSIS
    gcloud backup-dr restore-verification-plan-associations delete
        (RESTORE_VERIFICATION_PLAN_ASSOCIATION : --location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified restore verification plan association.

EXAMPLES
    To delete a restore verification plan association sample-association under
    restore verification plan sample-plan in project sample-project and
    location us-central1, run:

        $ gcloud backup-dr restore-verification-plan-associations delete \
            sample-association --restore-verification-plan=sample-plan \
            --project=sample-project --location=us-central1

POSITIONAL ARGUMENTS
     Restore Verification Plan Association resource - Name of the restore
     verification plan association to delete. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument restore_verification_plan_association on the
        command line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESTORE_VERIFICATION_PLAN_ASSOCIATION
          ID of the Restore Verification Plan Association or fully qualified
          identifier for the Restore Verification Plan Association.

          To set the name attribute:
          + provide the argument restore_verification_plan_association on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Restore Verification Plan Association.

          To set the location attribute:
          + provide the argument restore_verification_plan_association on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

       --restore-verification-plan=RESTORE_VERIFICATION_PLAN
          The ID of the Restore Verification Plan.

          To set the restore-verification-plan attribute:
          + provide the argument restore_verification_plan_association on the
            command line with a fully specified name;
          + provide the argument --restore-verification-plan on the command
            line.

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
    Delete a specific restore verification plan association.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr restore-verification-plan-associations \
            delete

        $ gcloud beta backup-dr restore-verification-plan-associations delete
```

### gcloud backup-dr restore-verification-plan-associations describe

```text
NAME
    gcloud backup-dr restore-verification-plan-associations describe - show
        details of the restore verification plan association

SYNOPSIS
    gcloud backup-dr restore-verification-plan-associations describe
        (RESTORE_VERIFICATION_PLAN_ASSOCIATION : --location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show all configuration data associated with the specified restore
    verification plan association.

EXAMPLES
    To view details for restore verification plan association my-association
    under restore verification plan my-plan in location us-central1, run:

        $ gcloud backup-dr restore-verification-plan-associations describe \
            my-association --restore-verification-plan=my-plan \
            --location=us-central1

POSITIONAL ARGUMENTS
     Restore verification plan association resource - Name of the restore
     verification plan association to describe. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument restore_verification_plan_association on the
        command line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESTORE_VERIFICATION_PLAN_ASSOCIATION
          ID of the restore_verification_plan_association or fully qualified
          identifier for the restore_verification_plan_association.

          To set the restore_verification_plan_association attribute:
          + provide the argument restore_verification_plan_association on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID of the resource.

          To set the location attribute:
          + provide the argument restore_verification_plan_association on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

       --restore-verification-plan=RESTORE_VERIFICATION_PLAN
          The ID of the Restore Verification Plan.

          To set the restore-verification-plan attribute:
          + provide the argument restore_verification_plan_association on the
            command line with a fully specified name;
          + provide the argument --restore-verification-plan on the command
            line.

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

        $ gcloud alpha backup-dr restore-verification-plan-associations \
            describe

        $ gcloud beta backup-dr restore-verification-plan-associations \
            describe
```

### gcloud backup-dr restore-verification-plan-associations list

```text
NAME
    gcloud backup-dr restore-verification-plan-associations list - list Backup
        and DR restore verification plan associations

SYNOPSIS
    gcloud backup-dr restore-verification-plan-associations list
        [--location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List restore verification plan associations in the project for a specified
    restore verification plan.

EXAMPLES
    To list restore verification plan associations for restore verification
    plan my-plan in location us-central1, run:

        $ gcloud backup-dr restore-verification-plan-associations list \
            --restore-verification-plan=my-plan --location=us-central1

FLAGS
     Restore verification plan resource - Restore verification plan to list
     associations from. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --restore-verification-plan on the command line
        with a fully specified name;
      * default is all restore verification plans with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        Location ID of the resource.

        To set the location attribute:
        * provide the argument --restore-verification-plan on the command
          line with a fully specified name;
        * default is all restore verification plans with a fully specified
          name;
        * provide the argument --location on the command line;
        * default is all locations .

     --restore-verification-plan=RESTORE_VERIFICATION_PLAN
        ID of the restore_verification_plan or fully qualified identifier for
        the restore_verification_plan.

        To set the restore-verification-plan attribute:
        * provide the argument --restore-verification-plan on the command
          line;
        * default is all restore verification plans .

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

        $ gcloud alpha backup-dr restore-verification-plan-associations list

        $ gcloud beta backup-dr restore-verification-plan-associations list
```

### gcloud backup-dr restore-verification-plan-associations trigger-restore-verification

```text
NAME
    gcloud backup-dr restore-verification-plan-associations
        trigger-restore-verification - trigger a restore verification for an
        association

SYNOPSIS
    gcloud backup-dr restore-verification-plan-associations
        trigger-restore-verification
        (RESTORE_VERIFICATION_PLAN_ASSOCIATION : --location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Trigger an on-demand restore verification for the specified restore
    verification plan association.

EXAMPLES
    To trigger a restore verification for association sample-association under
    restore verification plan sample-plan in project sample-project and
    location us-central1, run:

        $ gcloud backup-dr restore-verification-plan-associations \
            trigger-restore-verification sample-association \
            --restore-verification-plan=sample-plan \
            --project=sample-project --location=us-central1

POSITIONAL ARGUMENTS
     Restore Verification Plan Association resource - Name of the restore
     verification plan association to trigger. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument RESTORE_VERIFICATION_PLAN_ASSOCIATION on the
        command line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESTORE_VERIFICATION_PLAN_ASSOCIATION
          ID of the Restore Verification Plan Association or fully qualified
          identifier for the Restore Verification Plan Association.

          To set the name attribute:
          + provide the argument RESTORE_VERIFICATION_PLAN_ASSOCIATION on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Restore Verification Plan Association.

          To set the location attribute:
          + provide the argument RESTORE_VERIFICATION_PLAN_ASSOCIATION on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

       --restore-verification-plan=RESTORE_VERIFICATION_PLAN
          The ID of the Restore Verification Plan.

          To set the restore-verification-plan attribute:
          + provide the argument RESTORE_VERIFICATION_PLAN_ASSOCIATION on the
            command line with a fully specified name;
          + provide the argument --restore-verification-plan on the command
            line.

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
    Trigger a restore verification for an association.

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr restore-verification-plan-associations \
            trigger-restore-verification

        $ gcloud beta backup-dr restore-verification-plan-associations \
            trigger-restore-verification
```

### gcloud beta backup-dr restore-verification-plan-associations create

```text
NAME
    gcloud beta backup-dr restore-verification-plan-associations create -
        create a new restore verification plan association

SYNOPSIS
    gcloud beta backup-dr restore-verification-plan-associations create
        (RESTORE_VERIFICATION_PLAN_ASSOCIATION : --location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN)
        --resource-type=RESOURCE_TYPE --restore-template=RESTORE_TEMPLATE
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr restore-verification-plan-associations delete

```text
NAME
    gcloud beta backup-dr restore-verification-plan-associations delete -
        delete the specified restore verification plan association

SYNOPSIS
    gcloud beta backup-dr restore-verification-plan-associations delete
        (RESTORE_VERIFICATION_PLAN_ASSOCIATION : --location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr restore-verification-plan-associations describe

```text
NAME
    gcloud beta backup-dr restore-verification-plan-associations describe -
        show details of the restore verification plan association

SYNOPSIS
    gcloud beta backup-dr restore-verification-plan-associations describe
        (RESTORE_VERIFICATION_PLAN_ASSOCIATION : --location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr restore-verification-plan-associations list

```text
NAME
    gcloud beta backup-dr restore-verification-plan-associations list - list
        Backup and DR restore verification plan associations

SYNOPSIS
    gcloud beta backup-dr restore-verification-plan-associations list
        [--location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr restore-verification-plan-associations trigger-restore-verification

```text
NAME
    gcloud beta backup-dr restore-verification-plan-associations
        trigger-restore-verification - trigger a restore verification for an
        association

SYNOPSIS
    gcloud beta backup-dr restore-verification-plan-associations
        trigger-restore-verification
        (RESTORE_VERIFICATION_PLAN_ASSOCIATION : --location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-verification-plan-associations create

```text
NAME
    gcloud alpha backup-dr restore-verification-plan-associations create -
        create a new restore verification plan association

SYNOPSIS
    gcloud alpha backup-dr restore-verification-plan-associations create
        (RESTORE_VERIFICATION_PLAN_ASSOCIATION : --location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN)
        --resource-type=RESOURCE_TYPE --restore-template=RESTORE_TEMPLATE
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-verification-plan-associations delete

```text
NAME
    gcloud alpha backup-dr restore-verification-plan-associations delete -
        delete the specified restore verification plan association

SYNOPSIS
    gcloud alpha backup-dr restore-verification-plan-associations delete
        (RESTORE_VERIFICATION_PLAN_ASSOCIATION : --location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-verification-plan-associations describe

```text
NAME
    gcloud alpha backup-dr restore-verification-plan-associations describe -
        show details of the restore verification plan association

SYNOPSIS
    gcloud alpha backup-dr restore-verification-plan-associations describe
        (RESTORE_VERIFICATION_PLAN_ASSOCIATION : --location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-verification-plan-associations list

```text
NAME
    gcloud alpha backup-dr restore-verification-plan-associations list - list
        Backup and DR restore verification plan associations

SYNOPSIS
    gcloud alpha backup-dr restore-verification-plan-associations list
        [--location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr restore-verification-plan-associations trigger-restore-verification

```text
NAME
    gcloud alpha backup-dr restore-verification-plan-associations
        trigger-restore-verification - trigger a restore verification for an
        association

SYNOPSIS
    gcloud alpha backup-dr restore-verification-plan-associations
        trigger-restore-verification
        (RESTORE_VERIFICATION_PLAN_ASSOCIATION : --location=LOCATION
          --restore-verification-plan=RESTORE_VERIFICATION_PLAN) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/restore-verification-plan-associations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

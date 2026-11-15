---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/backup-policies
---

# gcloud netapp backup-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud netapp backup-policies create

```text
NAME
    gcloud netapp backup-policies create - create a Cloud NetApp Backup Policy

SYNOPSIS
    gcloud netapp backup-policies create (BACKUP_POLICY : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--enabled=ENABLED]
        [--labels=[KEY=VALUE,...]]
        [--daily-backup-limit=DAILY_BACKUP_LIMIT
          --monthly-backup-limit=MONTHLY_BACKUP_LIMIT
          --weekly-backup-limit=WEEKLY_BACKUP_LIMIT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a Backup Policy for Cloud NetApp Volumes.

EXAMPLES
    The following command creates a Backup Policy named BACKUP_POLICY with all
    possible arguments:

        $ gcloud netapp backup-policies create BACKUP_POLICY \
          --location=us-central1 --enabled=true --daily-backup-limit=3 \
          --weekly-backup-limit=5 --monthly-backup-limit=2 \
          --description="first backup policy" --labels=key1=val1

POSITIONAL ARGUMENTS
     Backup policy resource - The Backup Policy to create The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument backup_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_POLICY
          ID of the backup_policy or fully qualified identifier for the
          backup_policy.

          To set the backup_policy attribute:
          + provide the argument backup_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the backup_policy.

          To set the location attribute:
          + provide the argument backup_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A description of the Cloud NetApp Backup Policy

     --enabled=ENABLED
        The Boolean value indiciating whether backups are made automatically
        according to the schedules. If enabled, this will be applied to all
        volumes that have this backup policy attached and enforced on the
        volume level. If not specified, the default is true.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     Add backup limit arguments.

     --daily-backup-limit=DAILY_BACKUP_LIMIT
        Maximum number of daily backups to keep. Note that the minimum daily
        backup limit is 2.

     --monthly-backup-limit=MONTHLY_BACKUP_LIMIT
        Number of monthly backups to keep. Note that the sum of daily, weekly
        and monthly backups should be greater than 1

     --weekly-backup-limit=WEEKLY_BACKUP_LIMIT
        Number of weekly backups to keep. Note that the sum of daily, weekly
        and monthly backups should be greater than 1

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp backup-policies create
```

### gcloud netapp backup-policies delete

```text
NAME
    gcloud netapp backup-policies delete - delete a Cloud NetApp Volumes Backup
        Policy

SYNOPSIS
    gcloud netapp backup-policies delete (BACKUP_POLICY : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Backup Policy

EXAMPLES
    The following command deletes a Backup Policy instance named BACKUP_POLICY
    in the default netapp/location

        $ gcloud netapp backup-policies delete BACKUP_POLICY

    To delete a Backup Policy named BACKUP_POLICY asynchronously, run the
    following command:

        $ gcloud netapp backup-policies delete BACKUP_POLICY --async

POSITIONAL ARGUMENTS
     Backup policy resource - The Backup Policy to delete The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument backup_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_POLICY
          ID of the backup_policy or fully qualified identifier for the
          backup_policy.

          To set the backup_policy attribute:
          + provide the argument backup_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the backup_policy.

          To set the location attribute:
          + provide the argument backup_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
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
    This variant is also available:

        $ gcloud beta netapp backup-policies delete
```

### gcloud netapp backup-policies describe

```text
NAME
    gcloud netapp backup-policies describe - show metadata for a Cloud NetApp
        Volumes Backup Policy

SYNOPSIS
    gcloud netapp backup-policies describe
        (BACKUP_POLICY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Backup Policy

EXAMPLES
    The following command gets metadata using describe for a Backup Policy
    named BACKUP_POLICY in the default netapp/location:

        $ gcloud netapp backup-policies describe BACKUP_POLICY

    To get metadata on a Backup Policy named BACKUP_POLICY in a specified
    location, run:

        $ gcloud netapp backup-policies describe BACKUP_POLICY \
          --location=us-central1

POSITIONAL ARGUMENTS
     Backup policy resource - The Backup Policy to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument backup_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_POLICY
          ID of the backup_policy or fully qualified identifier for the
          backup_policy.

          To set the backup_policy attribute:
          + provide the argument backup_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the backup_policy.

          To set the location attribute:
          + provide the argument backup_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp backup-policies describe
```

### gcloud netapp backup-policies list

```text
NAME
    gcloud netapp backup-policies list - list Cloud NetApp Volumes Backup
        Policies

SYNOPSIS
    gcloud netapp backup-policies list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists Backup Policies for Cloud NetApp Volumes

EXAMPLES
    The following command lists all Backup Policies in the default
    netapp/location

        $ gcloud netapp backup-policies list

    To list all Backup Policies in a specified location, run:

        $ gcloud netapp backup-policies list --location=us-central1

FLAGS
     Location resource - The location in which to list Backup Policies. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * uses all locations by default. with a fully specified name;
      * set the property netapp/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * uses all locations by default.;
        * set the property netapp/location.

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
    This variant is also available:

        $ gcloud beta netapp backup-policies list
```

### gcloud netapp backup-policies update

```text
NAME
    gcloud netapp backup-policies update - update a Cloud NetApp Volumes Backup
        Policies

SYNOPSIS
    gcloud netapp backup-policies update (BACKUP_POLICY : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--enabled=ENABLED]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--daily-backup-limit=DAILY_BACKUP_LIMIT
          --monthly-backup-limit=MONTHLY_BACKUP_LIMIT
          --weekly-backup-limit=WEEKLY_BACKUP_LIMIT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a Backup Policy

EXAMPLES
    The following command updates a Backup Policy named BACKUP_POLICY with all
    possible arguments

        $ gcloud netapp backup-policies update BACKUP_POLICY \
          --location=us-central1 --enabled=True --daily-backup-limit=5 \
          --weekly-backup-limit=3 --monthly-backup-limit=2

    To update a Backup Policy named BACKUP_POLICY asynchronously, run the
    following command:

        $ gcloud netapp backup-policies update BACKUP_POLICY --async \
          --location=us-central1 --enabled=True --daily-backup-limit=5 \
          --weekly-backup-limit=3 --monthly-backup-limit=2

POSITIONAL ARGUMENTS
     Backup policy resource - The Backup Policy to update The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument backup_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_POLICY
          ID of the backup_policy or fully qualified identifier for the
          backup_policy.

          To set the backup_policy attribute:
          + provide the argument backup_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the backup_policy.

          To set the location attribute:
          + provide the argument backup_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A description of the Cloud NetApp Backup Policy

     --enabled=ENABLED
        The Boolean value indiciating whether backups are made automatically
        according to the schedules. If enabled, this will be applied to all
        volumes that have this backup policy attached and enforced on the
        volume level. If not specified, the default is true.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud netapp backup-policies update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud netapp backup-policies update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     Add backup limit arguments.

     --daily-backup-limit=DAILY_BACKUP_LIMIT
        Maximum number of daily backups to keep. Note that the minimum daily
        backup limit is 2.

     --monthly-backup-limit=MONTHLY_BACKUP_LIMIT
        Number of monthly backups to keep. Note that the sum of daily, weekly
        and monthly backups should be greater than 1

     --weekly-backup-limit=WEEKLY_BACKUP_LIMIT
        Number of weekly backups to keep. Note that the sum of daily, weekly
        and monthly backups should be greater than 1

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta netapp backup-policies update
```

### gcloud beta netapp backup-policies create

```text
NAME
    gcloud beta netapp backup-policies create - create a Cloud NetApp Backup
        Policy

SYNOPSIS
    gcloud beta netapp backup-policies create
        (BACKUP_POLICY : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--enabled=ENABLED]
        [--labels=[KEY=VALUE,...]]
        [--daily-backup-limit=DAILY_BACKUP_LIMIT
          --monthly-backup-limit=MONTHLY_BACKUP_LIMIT
          --weekly-backup-limit=WEEKLY_BACKUP_LIMIT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp backup-policies delete

```text
NAME
    gcloud beta netapp backup-policies delete - delete a Cloud NetApp Volumes
        Backup Policy

SYNOPSIS
    gcloud beta netapp backup-policies delete
        (BACKUP_POLICY : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp backup-policies describe

```text
NAME
    gcloud beta netapp backup-policies describe - show metadata for a Cloud
        NetApp Volumes Backup Policy

SYNOPSIS
    gcloud beta netapp backup-policies describe
        (BACKUP_POLICY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp backup-policies list

```text
NAME
    gcloud beta netapp backup-policies list - list Cloud NetApp Volumes Backup
        Policies

SYNOPSIS
    gcloud beta netapp backup-policies list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta netapp backup-policies update

```text
NAME
    gcloud beta netapp backup-policies update - update a Cloud NetApp Volumes
        Backup Policies

SYNOPSIS
    gcloud beta netapp backup-policies update
        (BACKUP_POLICY : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--enabled=ENABLED]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--daily-backup-limit=DAILY_BACKUP_LIMIT
          --monthly-backup-limit=MONTHLY_BACKUP_LIMIT
          --weekly-backup-limit=WEEKLY_BACKUP_LIMIT] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/backup-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

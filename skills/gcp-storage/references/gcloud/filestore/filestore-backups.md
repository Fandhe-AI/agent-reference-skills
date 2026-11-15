---
source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/backups
---

# gcloud filestore backups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud filestore backups create

```text
NAME
    gcloud filestore backups create - create a Filestore backup

SYNOPSIS
    gcloud filestore backups create BACKUP --file-share=FILE_SHARE
        --instance=INSTANCE --region=REGION
        (--instance-location=INSTANCE_LOCATION | --instance-zone=INSTANCE_ZONE)
        [--async] [--description=DESCRIPTION] [--kms-key=KMS_KEY]
        [--labels=[KEY=VALUE,...]] [--tags=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Filestore backup of an instance file share.

    This command can fail for the following reasons:
      o A backup with the same name already exists.
      o The active account does not have permission to create backups.

EXAMPLES
    To create a backup with the name 'my-backup' and description 'My backup
    description' in a particular region like 'us-central1' from an instance
    called 'my-instance' in 'us-central1-c' and the source file share called
    'my-fs', run:

        $ gcloud filestore backups create my-backup --instance=my-instance \
            --file-share=my-fs --instance-zone=us-central1-c \
            --region=us-central1 --description="My backup description"

POSITIONAL ARGUMENTS
     BACKUP
        Arguments and flags that specify the Filestore backup you want to
        create.

REQUIRED FLAGS
     --file-share=FILE_SHARE
        File share name on the Filestore instance to backup.

     --instance=INSTANCE
        Share name of the Filestore instance you want to backup.

     --region=REGION
        Region (e.g. us-central1) for the backup.

     Exactly one of these must be specified:

       --instance-location=INSTANCE_LOCATION
          Region of the Filestore instance.

       --instance-zone=INSTANCE_ZONE
          Zone of the Filestore instance.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description for the backup. Limit: 2048 characters.

     --kms-key=KMS_KEY
        CMEK for backup in the form of
        projects/{project}/locations/{location}/keyRings/{key-ring}/cryptoKeys/{crypto-key}

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

     --tags=[KEY=VALUE,...]
        List of tag KEY=VALUE pairs to add.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the file/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/filestore/

NOTES
    These variants are also available:

        $ gcloud alpha filestore backups create

        $ gcloud beta filestore backups create
```

### gcloud filestore backups delete

```text
NAME
    gcloud filestore backups delete - delete a Filestore backup

SYNOPSIS
    gcloud filestore backups delete BACKUP --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Filestore backup.

    This command can fail for the following reasons:
      o The backup specified does not exist.
      o The active account does not have permission to delete the given
        backup.

EXAMPLES
    The following command deletes a backup with the name 'my-backup' in the
    region us-central1:

        $ gcloud filestore backups delete my-backup --region=us-central1

POSITIONAL ARGUMENTS
     BACKUP
        Arguments and flags that specify the Filestore backup you want to
        delete.

REQUIRED FLAGS
     --region=REGION
        Compute region (e.g. us-central1) for the backup.

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

API REFERENCE
    This command uses the file/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/filestore/

NOTES
    These variants are also available:

        $ gcloud alpha filestore backups delete

        $ gcloud beta filestore backups delete
```

### gcloud filestore backups describe

```text
NAME
    gcloud filestore backups describe - describe a Filestore backup

SYNOPSIS
    gcloud filestore backups describe BACKUP --region=REGION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays all data associated with a Filestore backup given a valid backup
    name.

    This command can fail for the following reasons:
      o The backup specified does not exist.
      o The active account does not have permission to access the given
        backup.

EXAMPLES
    To display all data associated with a backup of the name 'my-backup' in the
    region us-central1:

        $ gcloud filestore backups describe my-backup --region=us-central1

POSITIONAL ARGUMENTS
     BACKUP
        Arguments and flags that specify the Filestore backup you want to
        create.

REQUIRED FLAGS
     --region=REGION
        Region (e.g. us-central1) for the backup.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the file/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/filestore/

NOTES
    These variants are also available:

        $ gcloud alpha filestore backups describe

        $ gcloud beta filestore backups describe
```

### gcloud filestore backups list

```text
NAME
    gcloud filestore backups list - list Filestore backups

SYNOPSIS
    gcloud filestore backups list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Filestore backups in a project for either a specified region or
    for all region.

    To specify the maximum number of backups to list, use the --limit flag.

EXAMPLES
    To list up to five backups, run:

        $ gcloud filestore backups list --limit=5

FLAGS
     --region=REGION
        The region of the Backups to display. If unspecified, all backups will
        be listed.

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
    This command uses the file/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/filestore/

NOTES
    These variants are also available:

        $ gcloud alpha filestore backups list

        $ gcloud beta filestore backups list
```

### gcloud filestore backups update

```text
NAME
    gcloud filestore backups update - update a Filestore backup

SYNOPSIS
    gcloud filestore backups update BACKUP --region=REGION [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the metadata of a Filestore backup.

    This command can fail for the following reasons:
      o The backup specified does not exist.
      o The active account does not have permission to update the given
        backup.

EXAMPLES
    The following command updates the Filestore Backup named 'my-backup' in
    region us-central1 to change the description to 'A new description.'

        $ gcloud filestore backups update my-backup --region=us-central1 \
            --description="A new description."

POSITIONAL ARGUMENTS
     BACKUP
        Arguments and flags that specify the Filestore backup you want to
        update.

REQUIRED FLAGS
     --region=REGION
        Compute region (e.g. us-central1) for the backup.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the backup.

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

              $ gcloud filestore backups update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud filestore backups update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the file/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/filestore/

NOTES
    These variants are also available:

        $ gcloud alpha filestore backups update

        $ gcloud beta filestore backups update
```

### gcloud beta filestore backups create

```text
NAME
    gcloud beta filestore backups create - create a Filestore backup

SYNOPSIS
    gcloud beta filestore backups create BACKUP --file-share=FILE_SHARE
        --instance=INSTANCE --region=REGION
        (--instance-location=INSTANCE_LOCATION | --instance-zone=INSTANCE_ZONE)
        [--async] [--description=DESCRIPTION] [--kms-key=KMS_KEY]
        [--labels=[KEY=VALUE,...]] [--tags=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta filestore backups delete

```text
NAME
    gcloud beta filestore backups delete - delete a Filestore backup

SYNOPSIS
    gcloud beta filestore backups delete BACKUP --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta filestore backups describe

```text
NAME
    gcloud beta filestore backups describe - describe a Filestore backup

SYNOPSIS
    gcloud beta filestore backups describe BACKUP --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta filestore backups list

```text
NAME
    gcloud beta filestore backups list - list Filestore backups

SYNOPSIS
    gcloud beta filestore backups list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta filestore backups update

```text
NAME
    gcloud beta filestore backups update - update a Filestore backup

SYNOPSIS
    gcloud beta filestore backups update BACKUP --region=REGION [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha filestore backups create

```text
NAME
    gcloud alpha filestore backups create - create a Filestore backup

SYNOPSIS
    gcloud alpha filestore backups create BACKUP --file-share=FILE_SHARE
        --instance=INSTANCE --instance-zone=INSTANCE_ZONE --region=REGION
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha filestore backups delete

```text
NAME
    gcloud alpha filestore backups delete - delete a Filestore backup

SYNOPSIS
    gcloud alpha filestore backups delete BACKUP --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha filestore backups describe

```text
NAME
    gcloud alpha filestore backups describe - describe a Filestore backup

SYNOPSIS
    gcloud alpha filestore backups describe BACKUP --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha filestore backups list

```text
NAME
    gcloud alpha filestore backups list - list Filestore backups

SYNOPSIS
    gcloud alpha filestore backups list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha filestore backups update

```text
NAME
    gcloud alpha filestore backups update - update a Filestore backup

SYNOPSIS
    gcloud alpha filestore backups update BACKUP --region=REGION [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/backups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

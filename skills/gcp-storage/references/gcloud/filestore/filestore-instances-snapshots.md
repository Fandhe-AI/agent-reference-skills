---
source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/snapshots
---

# gcloud filestore instances snapshots

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud filestore instances snapshots create

```text
NAME
    gcloud filestore instances snapshots create - create a Filestore snapshot

SYNOPSIS
    gcloud filestore instances snapshots create SNAPSHOT --instance=INSTANCE
        (--instance-location=INSTANCE_LOCATION
          | --instance-region=INSTANCE_REGION) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Filestore snapshot of an instance.

    This command can fail for the following reasons:
      o A snapshot with the same name already exists.
      o The active account does not have permission to create snapshots.
      o Maximum number of snapshots for the instance has been reached.
      o The service tier of the instance does not support snapshots.

EXAMPLES
    To create a snapshot with the name my-snapshot for an instance named
    my-instance that's located in us-central1, run:

        $ gcloud filestore instances snapshots create my-snapshot \
            --instance=my-instance --instance-region=us-central1

POSITIONAL ARGUMENTS
     SNAPSHOT
        Name of the Filestore snapshot to be created.

REQUIRED FLAGS
     --instance=INSTANCE
        Name of the Filestore instance that you want to create a snapshot of.

     Exactly one of these must be specified:

       --instance-location=INSTANCE_LOCATION
          Location of the Filestore instance.

       --instance-region=INSTANCE_REGION
          Region of the Filestore instance.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the snapshot. Limit: 2048 characters.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

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
    This variant is also available:

        $ gcloud beta filestore instances snapshots create
```

### gcloud filestore instances snapshots delete

```text
NAME
    gcloud filestore instances snapshots delete - delete a Filestore snapshot

SYNOPSIS
    gcloud filestore instances snapshots delete SNAPSHOT --instance=INSTANCE
        (--instance-location=INSTANCE_LOCATION
          | --instance-region=INSTANCE_REGION) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Filestore snapshot.

    This command can fail for the following reasons:
      o The snapshot or instance specified does not exist.
      o The active account does not have permission to delete the given
        snapshot.

EXAMPLES
    To delete a snapshot named my-snapshot for the instance my-instance from
    us-central1, run:

        $ gcloud filestore instances snapshots delete my-snapshot \
            --instance=my-instance --instance-region=us-central1

POSITIONAL ARGUMENTS
     SNAPSHOT
        Name of the Filestore snapshot to be deleted.

REQUIRED FLAGS
     --instance=INSTANCE
        Name of the Filestore instance the snapshot belongs to.

     Exactly one of these must be specified:

       --instance-location=INSTANCE_LOCATION
          Location of the Filestore instance.

       --instance-region=INSTANCE_REGION
          Region of the Filestore instance.

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
    This variant is also available:

        $ gcloud beta filestore instances snapshots delete
```

### gcloud filestore instances snapshots describe

```text
NAME
    gcloud filestore instances snapshots describe - display information about a
        Filestore snapshot

SYNOPSIS
    gcloud filestore instances snapshots describe SNAPSHOT --instance=INSTANCE
        (--instance-location=INSTANCE_LOCATION
          | --instance-region=INSTANCE_REGION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays information about a Filestore snapshot given a valid snapshot
    name, as well as instance name and instance region.

    This command can fail for the following reasons:
      o The snapshot or instance specified does not exist.
      o The active account does not have permission to access the given
        snapshot.

EXAMPLES
    To display all information associated with a snapshot of the name
    my-snapshot for the instance my-instance from us-central1, run:

        $ gcloud filestore instances snapshots describe my-snapshot \
            --instance=my-instance --instance-region=us-central1

POSITIONAL ARGUMENTS
     SNAPSHOT
        Name of the Filestore snapshot to display information about.

REQUIRED FLAGS
     --instance=INSTANCE
        Name of the Filestore instance the snapshot belongs to.

     Exactly one of these must be specified:

       --instance-location=INSTANCE_LOCATION
          Location of the Filestore instance.

       --instance-region=INSTANCE_REGION
          Region of the Filestore instance.

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
    This variant is also available:

        $ gcloud beta filestore instances snapshots describe
```

### gcloud filestore instances snapshots list

```text
NAME
    gcloud filestore instances snapshots list - list Filestore snapshots

SYNOPSIS
    gcloud filestore instances snapshots list --instance=INSTANCE
        (--instance-location=INSTANCE_LOCATION
          | --instance-region=INSTANCE_REGION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Filestore snapshots for the specified instance.

    To limit the number of snapshots to list, use the --limit flag.

    This command can fail for the following reasons:
      o Specified instance does not exist.
      o The active account does not have permission to list snapshots for the
        given instance.
      o The service tier of the instance does not support snapshots.

EXAMPLES
    To list up to five snapshots for the instance my-instance from us-central1,
    run:

        $ gcloud filestore instances snapshots list --instance=my-instance \
          --instance-region=us-central1 --limit=5

REQUIRED FLAGS
     --instance=INSTANCE
        Name of the Filestore instance the snapshot belongs to.

     Exactly one of these must be specified:

       --instance-location=INSTANCE_LOCATION
          Location of the Filestore instance.

       --instance-region=INSTANCE_REGION
          Region of the Filestore instance.

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
    This variant is also available:

        $ gcloud beta filestore instances snapshots list
```

### gcloud filestore instances snapshots update

```text
NAME
    gcloud filestore instances snapshots update - update the description or
        labels of a Filestore snapshot

SYNOPSIS
    gcloud filestore instances snapshots update SNAPSHOT --instance=INSTANCE
        (--instance-location=INSTANCE_LOCATION
          | --instance-region=INSTANCE_REGION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the metadata of a Filestore snapshot.

    This command can fail for the following reasons:
      o The snapshot or instance specified does not exist.
      o The active account does not have permission to update the given
        snapshot.

EXAMPLES
    To update the description of a snapshot named my-snapshot for the instance
    my-instance from us-central1, run:

        $ gcloud filestore instances snapshots update my-snapshot \
            --instance=my-instance --instance-region=us-central1 \
            --description="A new description."

POSITIONAL ARGUMENTS
     SNAPSHOT
        Name of the Filestore snapshot to be updated.

REQUIRED FLAGS
     --instance=INSTANCE
        Name of the Filestore instance the snapshot belongs to.

     Exactly one of these must be specified:

       --instance-location=INSTANCE_LOCATION
          Location of the Filestore instance.

       --instance-region=INSTANCE_REGION
          Region of the Filestore instance.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the snapshot.

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

              $ gcloud filestore instances snapshots update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud filestore instances snapshots update --clear-labels \
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
    This variant is also available:

        $ gcloud beta filestore instances snapshots update
```

### gcloud beta filestore instances snapshots create

```text
NAME
    gcloud beta filestore instances snapshots create - create a Filestore
        snapshot

SYNOPSIS
    gcloud beta filestore instances snapshots create SNAPSHOT
        --instance=INSTANCE
        (--instance-location=INSTANCE_LOCATION
          | --instance-region=INSTANCE_REGION) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta filestore instances snapshots delete

```text
NAME
    gcloud beta filestore instances snapshots delete - delete a Filestore
        snapshot

SYNOPSIS
    gcloud beta filestore instances snapshots delete SNAPSHOT
        --instance=INSTANCE
        (--instance-location=INSTANCE_LOCATION
          | --instance-region=INSTANCE_REGION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta filestore instances snapshots describe

```text
NAME
    gcloud beta filestore instances snapshots describe - display information
        about a Filestore snapshot

SYNOPSIS
    gcloud beta filestore instances snapshots describe SNAPSHOT
        --instance=INSTANCE
        (--instance-location=INSTANCE_LOCATION
          | --instance-region=INSTANCE_REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta filestore instances snapshots list

```text
NAME
    gcloud beta filestore instances snapshots list - list Filestore snapshots

SYNOPSIS
    gcloud beta filestore instances snapshots list --instance=INSTANCE
        (--instance-location=INSTANCE_LOCATION
          | --instance-region=INSTANCE_REGION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta filestore instances snapshots update

```text
NAME
    gcloud beta filestore instances snapshots update - update the description
        or labels of a Filestore snapshot

SYNOPSIS
    gcloud beta filestore instances snapshots update SNAPSHOT
        --instance=INSTANCE
        (--instance-location=INSTANCE_LOCATION
          | --instance-region=INSTANCE_REGION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/snapshots (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

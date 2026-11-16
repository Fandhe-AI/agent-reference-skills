---
source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/backups
---

# gcloud redis clusters backups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud redis clusters backups delete

```text
NAME
    gcloud redis clusters backups delete - delete a Memorystore for Redis
        Cluster backup

SYNOPSIS
    gcloud redis clusters backups delete
        (BACKUP : --backup-collection=BACKUP_COLLECTION --region=REGION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Memorystore for Redis Cluster backup.

    This command can fail for the following reasons:
      o The backup specified does not exist.
      o The active account does not have permission to access the given
        backup.

EXAMPLES
    To delete a backup with the name my-backup under backup collection
    my-backup-collection in us-central1 region, run:

        $ gcloud redis clusters backups delete my-backup \
            --backup-collection=my-backup-collection --region=us-central1

POSITIONAL ARGUMENTS
     Backup resource - Arguments and flags that specify the Redis backup you
     want to delete. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --backup-collection=BACKUP_COLLECTION
          The name of the Redis cluster backup collection.

          To set the backup-collection attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --backup-collection on the command line.

       --region=REGION
          The name of the Redis region of the backup. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

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

API REFERENCE
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters backups delete

        $ gcloud beta redis clusters backups delete
```

### gcloud redis clusters backups describe

```text
NAME
    gcloud redis clusters backups describe - show metadata for a Memorystore
        for Redis Cluster backup

SYNOPSIS
    gcloud redis clusters backups describe
        (BACKUP : --backup-collection=BACKUP_COLLECTION --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show metadata for a Memorystore for Redis Cluster backup.

    Displays all metadata associated with a backup given a valid backup name.

    This command can fail for the following reasons:
      o The backup specified does not exist.
      o The active account does not have permission to access the given
        backup.

EXAMPLES
    To display the metadata for a backup named my-backup, under my-collection
    backup collection, in us-central1 region, run:

        $ gcloud redis clusters backups describe my-backup \
            --backup_collection=my-collection --region=us-central1

POSITIONAL ARGUMENTS
     Backup resource - Arguments and flags that specify the backup you want to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --backup-collection=BACKUP_COLLECTION
          The name of the Redis cluster backup collection.

          To set the backup-collection attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --backup-collection on the command line.

       --region=REGION
          The name of the Redis region of the backup. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters backups describe

        $ gcloud beta redis clusters backups describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud redis clusters backups describe my-backup \
    --backup-collection=my-collection \
    --region=us-central1
```

### gcloud redis clusters backups export

```text
NAME
    gcloud redis clusters backups export - export a Redis cluster backup to a
        Google Cloud Storage bucket

SYNOPSIS
    gcloud redis clusters backups export
        (BACKUP : --backup-collection=BACKUP_COLLECTION --region=REGION)
        --gcs-bucket=GCS_BUCKET [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command exports a Redis cluster backup to a Google Cloud Storage
    bucket. A new folder will be created in the bucket with the backup name.
    And the backup files will be stored in the folder.

EXAMPLES
    To export a backup with name my-backup under backup collection
    my-collection in us-central region to my-bucket Google Cloud Storage
    bucket, run:

        $ gcloud redis clusters backups export my-backup \
            --backup-collection=my-collection --region=us-central1 \
            --bucket-name=my-bucket

POSITIONAL ARGUMENTS
     Backup resource - Arguments and flags that specify the Redis backup you
     want to export. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the backup or fully qualified identifier for the backup.

          To set the backup attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --backup-collection=BACKUP_COLLECTION
          The name of the Redis cluster backup collection.

          To set the backup-collection attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --backup-collection on the command line.

       --region=REGION
          The name of the Redis region of the backup. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

REQUIRED FLAGS
     --gcs-bucket=GCS_BUCKET
        The name of the Google Cloud Storage bucket to export the backup to.

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
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters backups export

        $ gcloud beta redis clusters backups export
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud redis clusters backups export my-backup \
    --backup-collection=my-collection \
    --region=us-central1 \
    --gcs-bucket=my-bucket
```

### gcloud redis clusters backups list

```text
NAME
    gcloud redis clusters backups list - list backups under a backup collection
        in a region

SYNOPSIS
    gcloud redis clusters backups list
        (--backup-collection=BACKUP_COLLECTION : --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List backups under a backup collection in a region.

    To specify the maximum number of results, use the --limit flag.

EXAMPLES
    To list up to 5 backups in the us-central1 region, run:

        $ gcloud redis clusters backups list \
            --backup-collection=my-collection --region=us-central1 --limit=5

REQUIRED FLAGS
     Backup collection resource - The backup collection of the backups to
     display. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --backup-collection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --backup-collection=BACKUP_COLLECTION
          ID of the backup collection or fully qualified identifier for the
          backup collection.

          To set the backup-collection attribute:
          + provide the argument --backup-collection on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --region=REGION
          The name of the Redis region of the backup collection. Overrides the
          default redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument --backup-collection on the command line with
            a fully specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

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
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters backups list

        $ gcloud beta redis clusters backups list
```

### gcloud beta redis clusters backups delete

```text
NAME
    gcloud beta redis clusters backups delete - delete a Memorystore for Redis
        Cluster backup

SYNOPSIS
    gcloud beta redis clusters backups delete
        (BACKUP : --backup-collection=BACKUP_COLLECTION --region=REGION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis clusters backups describe

```text
NAME
    gcloud beta redis clusters backups describe - show metadata for a
        Memorystore for Redis Cluster backup

SYNOPSIS
    gcloud beta redis clusters backups describe
        (BACKUP : --backup-collection=BACKUP_COLLECTION --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis clusters backups export

```text
NAME
    gcloud beta redis clusters backups export - export a Redis cluster backup
        to a Google Cloud Storage bucket

SYNOPSIS
    gcloud beta redis clusters backups export
        (BACKUP : --backup-collection=BACKUP_COLLECTION --region=REGION)
        --gcs-bucket=GCS_BUCKET [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta redis clusters backups list

```text
NAME
    gcloud beta redis clusters backups list - list backups under a backup
        collection in a region

SYNOPSIS
    gcloud beta redis clusters backups list
        (--backup-collection=BACKUP_COLLECTION : --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters backups delete

```text
NAME
    gcloud alpha redis clusters backups delete - delete a Memorystore for Redis
        Cluster backup

SYNOPSIS
    gcloud alpha redis clusters backups delete
        (BACKUP : --backup-collection=BACKUP_COLLECTION --region=REGION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters backups describe

```text
NAME
    gcloud alpha redis clusters backups describe - show metadata for a
        Memorystore for Redis Cluster backup

SYNOPSIS
    gcloud alpha redis clusters backups describe
        (BACKUP : --backup-collection=BACKUP_COLLECTION --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters backups export

```text
NAME
    gcloud alpha redis clusters backups export - export a Redis cluster backup
        to a Google Cloud Storage bucket

SYNOPSIS
    gcloud alpha redis clusters backups export
        (BACKUP : --backup-collection=BACKUP_COLLECTION --region=REGION)
        --gcs-bucket=GCS_BUCKET [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters backups list

```text
NAME
    gcloud alpha redis clusters backups list - list backups under a backup
        collection in a region

SYNOPSIS
    gcloud alpha redis clusters backups list
        (--backup-collection=BACKUP_COLLECTION : --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): `--backup_collection` in the example is corrected to `--backup-collection`, the flag defined in the SYNOPSIS (gcloud 593.0.0 rejects the underscore spelling as an unrecognized argument).
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `export` example passes `--bucket-name=my-bucket`, which is not a flag of this command (gcloud 593.0.0 rejects it as an unrecognized argument); the SYNOPSIS flag is `--gcs-bucket`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/backups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/backup-collections
---

# gcloud memorystore backup-collections

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memorystore backup-collections backups delete

```text
NAME
    gcloud memorystore backup-collections backups delete - delete backups

SYNOPSIS
    gcloud memorystore backup-collections backups delete
        (BACKUP : --backup-collection=BACKUP_COLLECTION --location=LOCATION)
        [--async] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a backup

EXAMPLES
    To delete the backup, run:

        $ gcloud memorystore backup-collections backups delete

POSITIONAL ARGUMENTS
     Backup resource - Instance backup resource name using the form:
     projects/{project_id}/locations/{location_id}/backupCollections/{backup_collection_id}/backups/{backup_id}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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
          The backupCollection id of the backup resource.

          To set the backup-collection attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --backup-collection on the command line.

       --location=LOCATION
          The location id of the backup resource.

          To set the location attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        Idempotent request UUID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore backup-collections backups delete

        $ gcloud beta memorystore backup-collections backups delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore backup-collections backups delete my-backup \
    --backup-collection=my-backup-collection \
    --location=us-central1
```

### gcloud memorystore backup-collections backups describe

```text
NAME
    gcloud memorystore backup-collections backups describe - describe backups

SYNOPSIS
    gcloud memorystore backup-collections backups describe
        (BACKUP : --backup-collection=BACKUP_COLLECTION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a backup

EXAMPLES
    To describe the backup, run:

        $ gcloud memorystore backup-collections backups describe

POSITIONAL ARGUMENTS
     Backup resource - Instance backup resource name using the form:
     projects/{project_id}/locations/{location_id}/backupCollections/{backup_collection_id}/backups/{backup_id}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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
          The backupCollection id of the backup resource.

          To set the backup-collection attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --backup-collection on the command line.

       --location=LOCATION
          The location id of the backup resource.

          To set the location attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore backup-collections backups describe

        $ gcloud beta memorystore backup-collections backups describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore backup-collections backups describe my-backup \
    --backup-collection=my-backup-collection \
    --location=us-central1
```

### gcloud memorystore backup-collections backups export

```text
NAME
    gcloud memorystore backup-collections backups export - export backups

SYNOPSIS
    gcloud memorystore backup-collections backups export
        (BACKUP : --backup-collection=BACKUP_COLLECTION --location=LOCATION)
        [--async] [--gcs-bucket=GCS_BUCKET] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    export backups

EXAMPLES
    To export all backups, run:

        $ gcloud memorystore backup-collections backups export

POSITIONAL ARGUMENTS
     Backup resource - Instance backup resource name using the form:
     projects/{project_id}/locations/{location_id}/backupCollections/{backup_collection_id}/backups/{backup_id}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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
          The backupCollection id of the backup resource.

          To set the backup-collection attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --backup-collection on the command line.

       --location=LOCATION
          The location id of the backup resource.

          To set the location attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --gcs-bucket=GCS_BUCKET
        Google Cloud Storage bucket, like "my-bucket".

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore backup-collections backups export

        $ gcloud beta memorystore backup-collections backups export
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore backup-collections backups export my-backup \
    --backup-collection=my-backup-collection \
    --location=us-central1 \
    --gcs-bucket=my-bucket
```

### gcloud memorystore backup-collections backups list

```text
NAME
    gcloud memorystore backup-collections backups list - list backups

SYNOPSIS
    gcloud memorystore backup-collections backups list
        (--backup-collection=BACKUP_COLLECTION : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List backups

EXAMPLES
    To list all backups, run:

        $ gcloud memorystore backup-collections backups list

REQUIRED FLAGS
     BackupCollection resource - The resource name of the backupCollection
     using the form:
     projects/{project_id}/locations/{location_id}/backupCollections/{backup_collection_id}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --backup-collection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --backup-collection=BACKUP_COLLECTION
          ID of the backupCollection or fully qualified identifier for the
          backupCollection.

          To set the backup-collection attribute:
          + provide the argument --backup-collection on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location id of the backupCollection resource.

          To set the location attribute:
          + provide the argument --backup-collection on the command line with
            a fully specified name;
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

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore backup-collections backups list

        $ gcloud beta memorystore backup-collections backups list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore backup-collections backups list \
    --backup-collection=my-backup-collection \
    --location=us-central1
```

### gcloud memorystore backup-collections describe

```text
NAME
    gcloud memorystore backup-collections describe - describe backupCollections

SYNOPSIS
    gcloud memorystore backup-collections describe
        (BACKUP_COLLECTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a backupCollection

EXAMPLES
    To describe the backupCollection, run:

        $ gcloud memorystore backup-collections describe

POSITIONAL ARGUMENTS
     BackupCollection resource - Instance backupCollection resource name using
     the form:
     projects/{project_id}/locations/{location_id}/backupCollections/{backup_collection_id}
     where location_id refers to a Google Cloud region. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument backup_collection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP_COLLECTION
          ID of the backupCollection or fully qualified identifier for the
          backupCollection.

          To set the backup_collection attribute:
          + provide the argument backup_collection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the backupCollection resource.

          To set the location attribute:
          + provide the argument backup_collection on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore backup-collections describe

        $ gcloud beta memorystore backup-collections describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore backup-collections describe my-backup-collection \
    --location=us-central1
```

### gcloud memorystore backup-collections list

```text
NAME
    gcloud memorystore backup-collections list - list backupCollections

SYNOPSIS
    gcloud memorystore backup-collections list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List backupCollections

EXAMPLES
    To list all backupCollections, run:

        $ gcloud memorystore backup-collections list

REQUIRED FLAGS
     Location resource - The resource name of the backupCollection location
     using the form: projects/{project_id}/locations/{location_id} where
     location_id refers to a Google Cloud region. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore backup-collections list

        $ gcloud beta memorystore backup-collections list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore backup-collections list \
    --location=us-central1
```

### gcloud beta memorystore backup-collections backups delete

```text
NAME
    gcloud beta memorystore backup-collections backups delete - delete backups

SYNOPSIS
    gcloud beta memorystore backup-collections backups delete
        (BACKUP : --backup-collection=BACKUP_COLLECTION --location=LOCATION)
        [--async] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore backup-collections backups describe

```text
NAME
    gcloud beta memorystore backup-collections backups describe - describe
        backups

SYNOPSIS
    gcloud beta memorystore backup-collections backups describe
        (BACKUP : --backup-collection=BACKUP_COLLECTION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore backup-collections backups export

```text
NAME
    gcloud beta memorystore backup-collections backups export - export backups

SYNOPSIS
    gcloud beta memorystore backup-collections backups export
        (BACKUP : --backup-collection=BACKUP_COLLECTION --location=LOCATION)
        [--async] [--gcs-bucket=GCS_BUCKET] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore backup-collections backups list

```text
NAME
    gcloud beta memorystore backup-collections backups list - list backups

SYNOPSIS
    gcloud beta memorystore backup-collections backups list
        (--backup-collection=BACKUP_COLLECTION : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore backup-collections describe

```text
NAME
    gcloud beta memorystore backup-collections describe - describe
        backupCollections

SYNOPSIS
    gcloud beta memorystore backup-collections describe
        (BACKUP_COLLECTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta memorystore backup-collections list

```text
NAME
    gcloud beta memorystore backup-collections list - list backupCollections

SYNOPSIS
    gcloud beta memorystore backup-collections list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore backup-collections backups delete

```text
NAME
    gcloud alpha memorystore backup-collections backups delete - delete backups

SYNOPSIS
    gcloud alpha memorystore backup-collections backups delete
        (BACKUP : --backup-collection=BACKUP_COLLECTION --location=LOCATION)
        [--async] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore backup-collections backups describe

```text
NAME
    gcloud alpha memorystore backup-collections backups describe - describe
        backups

SYNOPSIS
    gcloud alpha memorystore backup-collections backups describe
        (BACKUP : --backup-collection=BACKUP_COLLECTION --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore backup-collections backups export

```text
NAME
    gcloud alpha memorystore backup-collections backups export - export backups

SYNOPSIS
    gcloud alpha memorystore backup-collections backups export
        (BACKUP : --backup-collection=BACKUP_COLLECTION --location=LOCATION)
        [--async] [--gcs-bucket=GCS_BUCKET] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore backup-collections backups list

```text
NAME
    gcloud alpha memorystore backup-collections backups list - list backups

SYNOPSIS
    gcloud alpha memorystore backup-collections backups list
        (--backup-collection=BACKUP_COLLECTION : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore backup-collections describe

```text
NAME
    gcloud alpha memorystore backup-collections describe - describe
        backupCollections

SYNOPSIS
    gcloud alpha memorystore backup-collections describe
        (BACKUP_COLLECTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore backup-collections list

```text
NAME
    gcloud alpha memorystore backup-collections list - list backupCollections

SYNOPSIS
    gcloud alpha memorystore backup-collections list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples give only the command, without the backup collection, backup and `--location` that the SYNOPSIS requires (gcloud 593.0.0: "Must be specified"); the runnable form adds sample values; `backups export` adds `--gcs-bucket` (the Cloud Storage bucket to export to).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/backup-collections (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

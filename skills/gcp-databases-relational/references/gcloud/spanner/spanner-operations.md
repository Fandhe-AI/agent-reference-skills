---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/operations
---

# gcloud spanner operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner operations cancel

```text
NAME
    gcloud spanner operations cancel - cancel a Cloud Spanner operation

SYNOPSIS
    gcloud spanner operations cancel OPERATION-ID
        (--instance=INSTANCE | --instance-config=INSTANCE_CONFIG)
        [--backup=BACKUP] [--database=DATABASE]
        [--instance-partition=INSTANCE_PARTITION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel a Cloud Spanner operation.

EXAMPLES
    To cancel an instance operation with ID auto_12345, run:

        $ gcloud spanner operations cancel _auto_12345 \
            --instance=my-instance-id

    To cancel a database operation with ID auto_12345, run:

        $ gcloud spanner operations cancel _auto_12345 \
            --instance=my-instance-id --database=my-database-id

    To cancel a backup operation with ID auto_12345, run:

        $ gcloud spanner operations cancel _auto_12345 \
            --instance=my-instance-id --backup=my-backup-id

    To cancel an instance partition operation with ID auto_12345, run:

        $ gcloud spanner operations cancel auto_12345 \
            --instance=my-instance-id --instance-partition=my-partition-id

POSITIONAL ARGUMENTS
     OPERATION-ID
        ID of the operation

REQUIRED FLAGS
     Exactly one of these must be specified:

       --instance=INSTANCE
          The ID of the instance the operation is executing on.

       --instance-config=INSTANCE_CONFIG
          The ID of the instance configuration the operation is executing on.

OPTIONAL FLAGS
     --backup=BACKUP
        For a backup operation, the name of the backup the operation is
        executing on.

     --database=DATABASE
        For a database operation, the name of the database the operation is
        executing on.

     --instance-partition=INSTANCE_PARTITION
        For an instance partition operation, the name of the instance partition
        the operation is executing on.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner operations cancel

        $ gcloud beta spanner operations cancel
```

### gcloud spanner operations describe

```text
NAME
    gcloud spanner operations describe - describe a Cloud Spanner operation

SYNOPSIS
    gcloud spanner operations describe OPERATION-ID
        (--instance=INSTANCE | --instance-config=INSTANCE_CONFIG)
        [--backup=BACKUP] [--database=DATABASE]
        [--instance-partition=INSTANCE_PARTITION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Spanner operation.

EXAMPLES
    To describe a Cloud Spanner instance operation, run:

        $ gcloud spanner operations describe _auto_12345 \
            --instance=my-instance-id

    To describe a Cloud Spanner database operation, run:

        $ gcloud spanner operations describe _auto_12345 \
            --instance=my-instance-id --database=my-database-id

    To describe a Cloud Spanner backup operation, run:

        $ gcloud spanner operations describe _auto_12345 \
            --instance=my-instance-id --backup=my-backup-id

    To describe an instance partition operation, run:

        $ gcloud spanner operations describe _auto_12345 \
            --instance=my-instance-id --instance-partition=my-partition-id

POSITIONAL ARGUMENTS
     OPERATION-ID
        ID of the operation

REQUIRED FLAGS
     Exactly one of these must be specified:

       --instance=INSTANCE
          The ID of the instance the operation is executing on.

       --instance-config=INSTANCE_CONFIG
          The ID of the instance configuration the operation is executing on.

OPTIONAL FLAGS
     --backup=BACKUP
        For a backup operation, the name of the backup the operation is
        executing on.

     --database=DATABASE
        For a database operation, the name of the database the operation is
        executing on.

     --instance-partition=INSTANCE_PARTITION
        For an instance partition operation, the name of the instance partition
        the operation is executing on.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner operations describe

        $ gcloud beta spanner operations describe
```

### gcloud spanner operations list

```text
NAME
    gcloud spanner operations list - list the Cloud Spanner operations

SYNOPSIS
    gcloud spanner operations list
        (--instance=INSTANCE | --instance-config=INSTANCE_CONFIG)
        [--backup=BACKUP] [--database=DATABASE]
        [--instance-partition=INSTANCE_PARTITION] [--type=TYPE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the Cloud Spanner operations.

EXAMPLES
    To list Cloud Spanner instance operations for an instance, run:

        $ gcloud spanner operations list --instance=my-instance-id \
            --type=INSTANCE

    To list Cloud Spanner backup operations for an instance, run:

        $ gcloud spanner operations list --instance=my-instance-id \
            --type=BACKUP

    To list Cloud Spanner database operations for an instance, run:

        $ gcloud spanner operations list --instance=my-instance-id \
            --type=DATABASE

    To list Cloud Spanner database operations for a database, run:

        $ gcloud spanner operations list --instance=my-instance-id \
            --database=my-database-id --type=DATABASE

    To list Cloud Spanner backup operations for a database, run:

        $ gcloud spanner operations list --instance=my-instance-id \
            --database=my-database-id --type=BACKUP

    To list Cloud Spanner backup operations for a backup, run:

        $ gcloud spanner operations list --instance=my-instance-id \
            --backup=my-backup-id --type=BACKUP

    To list instance partition operations for an instance partition, run:

        $ gcloud spanner operations list --instance=my-instance-id \
            --instance-partition=my-partition-id --type=INSTANCE_PARTITION

    To list instance partition operations for all instance partitions belonging
    to this instance, run:

        $ gcloud spanner operations list --instance=my-instance-id \
            --type=INSTANCE_PARTITION

REQUIRED FLAGS
     Exactly one of these must be specified:

       --instance=INSTANCE
          The ID of the instance the operation is executing on.

       --instance-config=INSTANCE_CONFIG
          The ID of the instance configuration the operation is executing on.

FLAGS
     --backup=BACKUP
        For backup operations, the name of the backup the operations are
        executing on.

     --database=DATABASE
        For database operations, the name of the database the operations are
        executing on.

     --instance-partition=INSTANCE_PARTITION
        For instance partition operations, the name of the instance partition
        the operation is executing on.

     --type=TYPE
        (optional) List only the operations of the given type. TYPE must be one
        of:

         BACKUP
            If only the instance is specified (--instance), returns all backup
            operations associated with backups in the instance. When a backup
            is specified (--backup), only the backup operations for the given
            backup are returned.
         DATABASE
            If only the instance is specified (--instance), returns all
            database operations associated with the databases in the instance.
            When a database is specified (--database), the command would return
            database operations for the given database.
         DATABASE_CHANGE_QUORUM
            Database change quorum operations are returned for all databases in
            the given instance (--instance only) or only those associated with
            the given database (--database).
         DATABASE_CREATE
            Database create operations are returned for all databases in the
            given instance (--instance only) or only those associated with the
            given database (--database)
         DATABASE_RESTORE
            Database restore operations are returned for all databases in the
            given instance (--instance only) or only those associated with the
            given database (--database)
         DATABASE_UPDATE_DDL
            Database update DDL operations are returned for all databases in
            the given instance (--instance only) or only those associated with
            the given database (--database)
         INSTANCE
            Returns instance operations for the given instance. Note,
            type=INSTANCE does not work with --database or --backup.
         INSTANCE_CONFIG_CREATE
            Instance configuration create operations are returned for the given
            instance configuration (--instance-config).
         INSTANCE_CONFIG_UPDATE
            Instance configuration update operations are returned for the given
            instance configuration (--instance-config).
         INSTANCE_PARTITION
            If only the instance is specified (--instance), returns all
            instance partition operations associated with instance partitions
            in the instance. When an instance partition is specified
            (--instance-partition), only the instance partition operations for
            the given instance partition are returned.

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
    These variants are also available:

        $ gcloud alpha spanner operations list

        $ gcloud beta spanner operations list
```

### gcloud beta spanner operations cancel

```text
NAME
    gcloud beta spanner operations cancel - cancel a Cloud Spanner operation

SYNOPSIS
    gcloud beta spanner operations cancel OPERATION-ID
        (--instance=INSTANCE | --instance-config=INSTANCE_CONFIG)
        [--backup=BACKUP] [--database=DATABASE]
        [--instance-partition=INSTANCE_PARTITION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner operations describe

```text
NAME
    gcloud beta spanner operations describe - describe a Cloud Spanner
        operation

SYNOPSIS
    gcloud beta spanner operations describe OPERATION-ID
        (--instance=INSTANCE | --instance-config=INSTANCE_CONFIG)
        [--backup=BACKUP] [--database=DATABASE]
        [--instance-partition=INSTANCE_PARTITION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner operations list

```text
NAME
    gcloud beta spanner operations list - list the Cloud Spanner operations

SYNOPSIS
    gcloud beta spanner operations list
        (--instance=INSTANCE | --instance-config=INSTANCE_CONFIG)
        [--backup=BACKUP] [--database=DATABASE]
        [--instance-partition=INSTANCE_PARTITION] [--type=TYPE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner operations cancel

```text
NAME
    gcloud alpha spanner operations cancel - cancel a Cloud Spanner operation

SYNOPSIS
    gcloud alpha spanner operations cancel OPERATION-ID
        (--instance=INSTANCE | --instance-config=INSTANCE_CONFIG)
        [--backup=BACKUP] [--database=DATABASE]
        [--instance-partition=INSTANCE_PARTITION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner operations describe

```text
NAME
    gcloud alpha spanner operations describe - describe a Cloud Spanner
        operation

SYNOPSIS
    gcloud alpha spanner operations describe OPERATION-ID
        (--instance=INSTANCE | --instance-config=INSTANCE_CONFIG)
        [--backup=BACKUP] [--database=DATABASE]
        [--instance-partition=INSTANCE_PARTITION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner operations list

```text
NAME
    gcloud alpha spanner operations list - list the Cloud Spanner operations

SYNOPSIS
    gcloud alpha spanner operations list
        (--instance=INSTANCE | --instance-config=INSTANCE_CONFIG)
        [--backup=BACKUP] [--database=DATABASE]
        [--instance-partition=INSTANCE_PARTITION] [--type=TYPE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

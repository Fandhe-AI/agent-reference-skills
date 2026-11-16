---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/tables/create
---

# gcloud bigtable instances tables create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable instances tables create

```text
NAME
    gcloud bigtable instances tables create - create a new Cloud Bigtable table

SYNOPSIS
    gcloud bigtable instances tables create (TABLE : --instance=INSTANCE)
        --column-families=[COLUMN_FAMILIES,...]
        [--change-stream-retention-period=CHANGE_STREAM_RETENTION_PERIOD]
        [--deletion-protection]
        [--row-key-schema-definition-file=ROW_KEY_SCHEMA_DEFINITION_FILE]
        [--row-key-schema-pre-encoded-bytes] [--splits=[SPLITS,...]]
        [--timestamp-granularity=TIMESTAMP_GRANULARITY]
        [--enable-automated-backup
          | --automated-backup-keep-hot-duration=AUTOMATED_BACKUP_KEEP_HOT_DURATION --automated-backup-locations=[LOCATION,
          ...]
          --automated-backup-retention-period=AUTOMATED_BACKUP_RETENTION_PERIOD]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Cloud Bigtable table.

EXAMPLES
    To create a table my-table in instance my-instance with a column family
    my-family, run:

        $ gcloud bigtable instances tables create my-table \
            --instance=my-instance --column-families="my-family"

    To create a table that has a column family named my-instance, a garbage
    collection policy that lets data expire after 864,000 seconds, and initial
    table splits on row keys car and key, run:

        $ gcloud bigtable instances tables create my-table \
            --instance=my-instance \
            --column-families="my-family:maxage=864000s" --splits=car,key

    To create a table my-table in instance my-instance that lets data in column
    family my-family1 expire after 10 days and keeps a maximum of 5 cells per
    column in column family my-family-2 if the data is less than 5 days old,
    run:

        $ gcloud bigtable instances tables create my-table \
            --instance=my-instance \
            --column-families="my-family-1:maxage=10d,my-family-2:maxversion\
        s=5||maxage=5d"

    To create a table my-table that has one column family my-family that lets
    data expire after 10 days, and to enable a change stream for the table to
    be kept for 7 days, run:

        $ gcloud bigtable instances tables create my-table \
            --instance=my-instance \
            --column-families="my-family:maxage=10d" \
            --change-stream-retention-period=7d

    To create a deletion-protected table my-table in instance my-instance with
    a column family my-family, run:

        $ gcloud bigtable instances tables create my-table \
            --instance=my-instance --column-families="my-family" \
            --deletion-protection

    To create a table my-table without deletion protection in instance
    my-instance with a column family my-family, run:

        $ gcloud bigtable instances tables create my-table \
            --instance=my-instance --column-families="my-family" \
            --no-deletion-protection

    To create a table my-table with the default automated backup policy
    (retention_period=7d, frequency=1d) enabled in instance my-instance with a
    column family my-family, run:

        $ gcloud bigtable instances tables create my-table \
            --instance=my-instance --column-families="my-family" \
            --enable-automated-backup

    To create a table my-table with a custom automated backup policy configured
    to retain backups for 30 days in instance my-instance with a column family
    my-family, run:

        $ gcloud bigtable instances tables create my-table \
            --instance=my-instance --column-families="my-family" \
            --automated-backup-retention_period=30d

    To create a table my-table with a custom automated backup policy configured
    to take backups in only us-central1-b and us-east1-c, run:

        $ gcloud bigtable instances tables create my-table \
            --instance=my-instance \
            --automated-backup-locations=us-central1-b,us-east1-c

POSITIONAL ARGUMENTS
     Table resource - Cloud Bigtable table to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument table on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TABLE
          ID of the table or fully qualified identifier for the table.

          To set the table attribute:
          + provide the argument table on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

REQUIRED FLAGS
     --column-families=[COLUMN_FAMILIES,...]
        A double-quote (") wrapped list of family name and corresponding
        garbage collection rules concatenated by :, where the rules are
        optional. For example:
        "family_1,family_2:maxage=5d&&maxversions=2,family_3:maxage=10d||maxversions=5"

OPTIONAL FLAGS
     --change-stream-retention-period=CHANGE_STREAM_RETENTION_PERIOD
        The length of time to retain change stream data for the table, in the
        range of [1 day, 7 days]. Acceptable units are days (d), hours (h),
        minutes (m), and seconds (s). Passing in a value for this option
        enables a change stream for the table. Examples: 5d or 48h.

     --deletion-protection
        Once specified, the table is deletion protected.

     --row-key-schema-definition-file=ROW_KEY_SCHEMA_DEFINITION_FILE
        The row key schema for the table. The schema is defined in a YAML or
        JSON file, equivalent to the StructType protobuf message.

        Example YAML:

            encoding:
              delimitedBytes:
                delimiter: '#'
            fields:
            - fieldName: field1
              type:
                bytesType:
                  encoding:
                    raw: {}
            - fieldName: field2
              type:
                bytesType:
                  encoding:
                    raw: {}

     --row-key-schema-pre-encoded-bytes
        By default, Base64 encoding is applied to all binary fields in the
        YAML/JSON file (for example, encoding.delimitedBytes.delimiter).

        Use this to indicate that all binary fields are already encoded in the
        YAML/JSON file and should not be encoded again.

     --splits=[SPLITS,...]
        Row keys where the table should initially be split. For example:
        car,key

     --timestamp-granularity=TIMESTAMP_GRANULARITY
        The granularity at which timestamps are stored in this table. The
        granularity is immutable (fixed at table creation) and defaults to
        millis. Timestamps not matching the granularity will be rejected.
        Microsecond granularity is supported only for Enterprise Plus
        instances. TIMESTAMP_GRANULARITY must be one of:

         micros
            The table keeps data versioned at a granularity of 1 microsecond.

         millis
            The table keeps data versioned at a granularity of 1 millisecond.

     At most one of these can be specified:

       --enable-automated-backup
          Once set, enables the default automated backup policy
          (retention_period=7d, frequency=1d) for the table. Defaults to no
          automated backup policy if omitted.

       Or at least one of these can be specified:

         Group for automated backup policy parameters.

         --automated-backup-keep-hot-duration=AUTOMATED_BACKUP_KEEP_HOT_DURATION
            The amount of time that automated backups remain hot, in the format
            of 24h for 24 hours. If specified, the backups created by this
            policy are HOT backups. If not specified, the backups are STANDARD
            backups. The value must be at least 24h and at most 10d, and can't
            exceed the policy's retention period. Only SSD instances support
            HOT automated backups. Setting this flag enables automated backup
            for the table.

         --automated-backup-locations=[LOCATION,...]
            List of Cloud Bigtable zones where you can create automated
            backups. If empty, automated backups will be created in all zones
            of the instance. Locations are in the format
            projects/{project}/locations/{zone}. Setting this flag enables
            automated backup for the table. If automated backup retention
            period is not specified, it defaults to 7 days.

         --automated-backup-retention-period=AUTOMATED_BACKUP_RETENTION_PERIOD
            The retention period of automated backup in the format of 30d for
            30 days. Min retention period is 3d and max is 90d. Setting this
            flag enables automated backup for the table. If automated backup
            retention period is not specified, it defaults to 7 days.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable instances tables create

        $ gcloud beta bigtable instances tables create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud bigtable instances tables create my-table \
    --instance=my-instance \
    --column-families="my-family-1:maxage=10d,my-family-2:maxversions=5||maxage=5d"

gcloud bigtable instances tables create my-table \
    --instance=my-instance \
    --column-families="my-family" \
    --automated-backup-retention-period=30d

gcloud bigtable instances tables create my-table \
    --instance=my-instance \
    --column-families="my-family" \
    --automated-backup-locations=projects/my-project/locations/us-central1-b,projects/my-project/locations/us-east1-c
```

### gcloud beta bigtable instances tables create

```text
NAME
    gcloud beta bigtable instances tables create - create a new Cloud Bigtable
        table

SYNOPSIS
    gcloud beta bigtable instances tables create (TABLE : --instance=INSTANCE)
        --column-families=[COLUMN_FAMILIES,...]
        [--change-stream-retention-period=CHANGE_STREAM_RETENTION_PERIOD]
        [--deletion-protection]
        [--row-key-schema-definition-file=ROW_KEY_SCHEMA_DEFINITION_FILE]
        [--row-key-schema-pre-encoded-bytes] [--splits=[SPLITS,...]]
        [--tiered-storage-infrequent-access-older-than=TIERED_STORAGE_INFREQUENT_ACCESS_OLDER_THAN]
        [--timestamp-granularity=TIMESTAMP_GRANULARITY]
        [--enable-automated-backup
          | --automated-backup-keep-hot-duration=AUTOMATED_BACKUP_KEEP_HOT_DURATION --automated-backup-locations=[LOCATION,
          ...]
          --automated-backup-retention-period=AUTOMATED_BACKUP_RETENTION_PERIOD]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable instances tables create

```text
NAME
    gcloud alpha bigtable instances tables create - create a new Cloud Bigtable
        table

SYNOPSIS
    gcloud alpha bigtable instances tables create (TABLE : --instance=INSTANCE)
        --column-families=[COLUMN_FAMILIES,...]
        [--change-stream-retention-period=CHANGE_STREAM_RETENTION_PERIOD]
        [--deletion-protection]
        [--row-key-schema-definition-file=ROW_KEY_SCHEMA_DEFINITION_FILE]
        [--row-key-schema-pre-encoded-bytes] [--splits=[SPLITS,...]]
        [--tiered-storage-infrequent-access-older-than=TIERED_STORAGE_INFREQUENT_ACCESS_OLDER_THAN]
        [--timestamp-granularity=TIMESTAMP_GRANULARITY]
        [--enable-automated-backup
          | --automated-backup-keep-hot-duration=AUTOMATED_BACKUP_KEEP_HOT_DURATION --automated-backup-locations=[LOCATION,
          ...]
          --automated-backup-retention-period=AUTOMATED_BACKUP_RETENTION_PERIOD]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): `--automated-backup-retention_period` in the example is corrected to `--automated-backup-retention-period`, the flag defined in the SYNOPSIS (gcloud 593.0.0 rejects the underscore spelling as an unrecognized argument).
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `--automated-backup-locations` example has no `--column-families`, which the SYNOPSIS requires (gcloud 593.0.0: "argument --column-families: Must be specified"); the runnable form adds `--column-families="my-family"`, as in the retention-period example before it. Also, the flag description says "Locations are in the format projects/{project}/locations/{zone}" and gcloud 593.0.0 passes the values to the API unchanged (`api_lib/bigtable/tables.py`), but the example passes bare zone IDs (`us-central1-b,us-east1-c`); the runnable form uses full location names with the placeholder project `my-project`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/tables/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

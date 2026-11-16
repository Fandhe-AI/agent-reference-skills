---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/tables/update
---

# gcloud bigtable instances tables update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable instances tables update

```text
NAME
    gcloud bigtable instances tables update - update an existing Cloud Bigtable
        table

SYNOPSIS
    gcloud bigtable instances tables update (TABLE : --instance=INSTANCE)
        [--async] [--deletion-protection] [--ignore-warnings]
        [--row-key-schema-pre-encoded-bytes]
        [--automated-backup-retention-period=AUTOMATED_BACKUP_RETENTION_PERIOD
          --automated-backup-keep-hot-duration=AUTOMATED_BACKUP_KEEP_HOT_DURATION | --clear-automated-backup-keep-hot-duration --automated-backup-locations=[LOCATION,
          ...] | --clear-automated-backup-locations
          | --disable-automated-backup | --enable-automated-backup]
        [--change-stream-retention-period=CHANGE_STREAM_RETENTION_PERIOD
          | --clear-change-stream-retention-period]
        [--clear-row-key-schema
          | --row-key-schema-definition-file=ROW_KEY_SCHEMA_DEFINITION_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing new Cloud Bigtable table with the specified
    configuration.

EXAMPLES
    To enable deletion protection, run:

        $ gcloud bigtable instances tables update my-table \
            --instance=my-instance --deletion-protection

    To disable deletion protection, run:

        $ gcloud bigtable instances tables update my-table \
            --instance=my-instance --no-deletion-protection

    To enable a change stream with a retention period of 1 day, or to update
    your table's change stream retention period to 1 day, run:

        $ gcloud bigtable instances tables update my-table \
            --instance=my-instance --change-stream-retention-period=1d

    To disable a change stream, run:

        $ gcloud bigtable instances tables update my-table \
            --instance=my-instance --clear-change-stream-retention-period

    To enable the default automated backup policy on a table, or update a table
    to use the default policy (retention_period=7d, frequency=1d), run:

        $ gcloud bigtable instances tables update my-table \
            --instance=my-instance --enable-automated-backup

    To disable automated backup: run:

        $ gcloud bigtable instances tables update my-table \
            --instance=my-instance --disable-automated-backup

    To enable or update a custom automated backup policy and configure it to
    retain backups for 30 days, run:

        $ gcloud bigtable instances tables update my-table \
            --instance=my-instance --automated-backup-retention-period=30d

    To enable or update a custom automated backup policy and configure it to
    take backups in only us-central1-b and us-east1-c, run:

        $ gcloud bigtable instances tables update my-table \
            --instance=my-instance \
            --automated-backup-locations=us-central1-b,us-east1-c

    To empty the automated backup locations list, run:

        $ gcloud bigtable instances tables update my-table \
            --instance=my-instance --clear-automated-backup-locations

POSITIONAL ARGUMENTS
     Table resource - Cloud Bigtable table to update. The arguments in this
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

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --deletion-protection
        Once specified, the table is deletion protected.

     --ignore-warnings
        If true, warnings about potentially risky changes (such as enabling
        tiered storage or clearing row key schemas) will be ignored and the
        update will proceed.

     --row-key-schema-pre-encoded-bytes
        By default, Base64 encoding is applied to all binary fields in the
        YAML/JSON file (for example, encoding.delimitedBytes.delimiter).

        Use this to indicate that all binary fields are already encoded in the
        YAML/JSON file and should not be encoded again.

        This field is only used when row-key-schema-definition-file is set. It
        is ignored if clear-row-key-schema is set.

     At most one of these can be specified:

       Group for automated backup policy parameters.

       --automated-backup-retention-period=AUTOMATED_BACKUP_RETENTION_PERIOD
          The retention period of automated backup in the format of 30d for 30
          days. Min retention period is 3d and max is 90d. Setting this flag
          enables automated backup for the table.

       At most one of these can be specified:

         --automated-backup-keep-hot-duration=AUTOMATED_BACKUP_KEEP_HOT_DURATION
            The amount of time that automated backups remain hot, in the format
            of 24h for 24 hours. If specified, the backups created by this
            policy are HOT backups. If not specified, the backups are STANDARD
            backups. The value must be at least 24h and at most 10d, and can't
            exceed the policy's retention period. Only SSD instances support
            HOT automated backups. Setting this flag enables automated backup
            for the table.

         --clear-automated-backup-keep-hot-duration
            Stops keeping automated backups hot. Subsequent backups created by
            the policy are STANDARD backups.

       At most one of these can be specified:

         --automated-backup-locations=[LOCATION,...]
            List of Cloud Bigtable zones where automated backups are allowed to
            be created. If empty, automated backups will be created in all
            zones of the instance. Locations are in the format
            projects/{project}/locations/{zone}. Setting this flag enables
            automated backup for the table.

         --clear-automated-backup-locations
            Empty the automated backup locations list if populated.

       At most one of these can be specified:

         --disable-automated-backup
            Once set, disables automated backup policy for the table.

         --enable-automated-backup
            Once set, enables the default automated backup policy
            (retention_period=7d, frequency=1d) for the table. Note: If a table
            has automated backup enabled, this flag resets it to the default
            policy.

     At most one of these can be specified:

       --change-stream-retention-period=CHANGE_STREAM_RETENTION_PERIOD
          The length of time to retain change stream data for the table, in the
          range of [1 day, 7 days]. Acceptable units are days (d), hours (h),
          minutes (m), and seconds (s). If not already specified, enables a
          change stream for the table. Examples: 5d or 48h.

       --clear-change-stream-retention-period
          This disables the change stream and eventually removes the change
          stream data.

     Whether to update or clear the row key schema in the updated table. Only
     one of these flags can be set.

     At most one of these can be specified:

       --clear-row-key-schema
          Whether to clear the row key schema in the updated table.

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

        $ gcloud alpha bigtable instances tables update

        $ gcloud beta bigtable instances tables update
```

### gcloud beta bigtable instances tables update

```text
NAME
    gcloud beta bigtable instances tables update - update an existing Cloud
        Bigtable table

SYNOPSIS
    gcloud beta bigtable instances tables update (TABLE : --instance=INSTANCE)
        [--async] [--deletion-protection] [--ignore-warnings]
        [--row-key-schema-pre-encoded-bytes]
        [--automated-backup-retention-period=AUTOMATED_BACKUP_RETENTION_PERIOD
          --automated-backup-keep-hot-duration=AUTOMATED_BACKUP_KEEP_HOT_DURATION | --clear-automated-backup-keep-hot-duration --automated-backup-locations=[LOCATION,
          ...] | --clear-automated-backup-locations
          | --disable-automated-backup | --enable-automated-backup]
        [--change-stream-retention-period=CHANGE_STREAM_RETENTION_PERIOD
          | --clear-change-stream-retention-period]
        [--clear-row-key-schema
          | --row-key-schema-definition-file=ROW_KEY_SCHEMA_DEFINITION_FILE]
        [--clear-tiered-storage-config
          | --tiered-storage-infrequent-access-older-than=TIERED_STORAGE_INFREQUENT_ACCESS_OLDER_THAN]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable instances tables update

```text
NAME
    gcloud alpha bigtable instances tables update - update an existing Cloud
        Bigtable table

SYNOPSIS
    gcloud alpha bigtable instances tables update (TABLE : --instance=INSTANCE)
        [--async] [--deletion-protection] [--ignore-warnings]
        [--row-key-schema-pre-encoded-bytes]
        [--automated-backup-retention-period=AUTOMATED_BACKUP_RETENTION_PERIOD
          --automated-backup-keep-hot-duration=AUTOMATED_BACKUP_KEEP_HOT_DURATION | --clear-automated-backup-keep-hot-duration --automated-backup-locations=[LOCATION,
          ...] | --clear-automated-backup-locations
          | --disable-automated-backup | --enable-automated-backup]
        [--change-stream-retention-period=CHANGE_STREAM_RETENTION_PERIOD
          | --clear-change-stream-retention-period]
        [--clear-row-key-schema
          | --row-key-schema-definition-file=ROW_KEY_SCHEMA_DEFINITION_FILE]
        [--clear-tiered-storage-config
          | --tiered-storage-infrequent-access-older-than=TIERED_STORAGE_INFREQUENT_ACCESS_OLDER_THAN]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/tables/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

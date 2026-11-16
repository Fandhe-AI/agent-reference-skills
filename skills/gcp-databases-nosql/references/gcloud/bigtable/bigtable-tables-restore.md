---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/tables/restore
---

# gcloud bigtable tables restore

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable tables restore

```text
NAME
    gcloud bigtable tables restore - restore a Cloud Bigtable backup to a new
        table

SYNOPSIS
    gcloud bigtable tables restore
        (--destination=DESTINATION
          : --destination-instance=DESTINATION_INSTANCE)
        (--source=SOURCE
          : --source-cluster=SOURCE_CLUSTER --source-instance=SOURCE_INSTANCE)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command restores a Cloud Bigtable backup to a new table.

EXAMPLES
    To restore table 'table2' from backup 'backup1', run:

        $ gcloud bigtable tables restore --source-instance=instance1 \
            --source-cluster=cluster1 --source=backup1 \
            --destination-instance=instance1 --destination=table2

    To restore table 'table2' from backup 'backup1' in a different project,
    run:

        $ gcloud bigtable tables restore \
            --source=projects/project1/instances/instance1/clusters/\
        cluster1/backups/backup1 \
            --destination=projects/project2/instances/instance2/tables/\
        table2

REQUIRED FLAGS
     Table resource - The destination to restore to. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --destination on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --destination=DESTINATION
          ID of the table or fully qualified identifier for the table.

          To set the destination attribute:
          + provide the argument --destination on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --destination-instance=DESTINATION_INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument --destination on the command line with a
            fully specified name;
          + provide the argument --destination-instance on the command line;
          + provide the argument --source-instance on the command line.

     Backup resource - The source to restore from. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --source on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --source=SOURCE
          ID of the backup or fully qualified identifier for the backup.

          To set the source attribute:
          + provide the argument --source on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --source-cluster=SOURCE_CLUSTER
          Name of the Bigtable cluster.

          To set the cluster attribute:
          + provide the argument --source on the command line with a fully
            specified name;
          + provide the argument --source-cluster on the command line.

       --source-instance=SOURCE_INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument --source on the command line with a fully
            specified name;
          + provide the argument --source-instance on the command line;
          + provide the argument --destination-instance on the command line.

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

NOTES
    These variants are also available:

        $ gcloud alpha bigtable tables restore

        $ gcloud beta bigtable tables restore
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud bigtable tables restore \
    --source=projects/project1/instances/instance1/clusters/cluster1/backups/backup1 \
    --destination=projects/project2/instances/instance2/tables/table2
```

### gcloud beta bigtable tables restore

```text
NAME
    gcloud beta bigtable tables restore - restore a Cloud Bigtable backup to a
        new table

SYNOPSIS
    gcloud beta bigtable tables restore
        (--destination=DESTINATION
          : --destination-instance=DESTINATION_INSTANCE)
        (--source=SOURCE
          : --source-cluster=SOURCE_CLUSTER --source-instance=SOURCE_INSTANCE)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable tables restore

```text
NAME
    gcloud alpha bigtable tables restore - restore a Cloud Bigtable backup to a
        new table

SYNOPSIS
    gcloud alpha bigtable tables restore
        (--destination=DESTINATION
          : --destination-instance=DESTINATION_INSTANCE)
        (--source=SOURCE
          : --source-cluster=SOURCE_CLUSTER --source-instance=SOURCE_INSTANCE)
        [--async] [--[no-]deletion-protection]
        [--enable-automated-backup
          | --automated-backup-keep-hot-duration=AUTOMATED_BACKUP_KEEP_HOT_DURATION --automated-backup-locations=[LOCATION,
          ...]
          --automated-backup-retention-period=AUTOMATED_BACKUP_RETENTION_PERIOD]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/tables/restore (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

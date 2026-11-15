---
source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/restore
---

# gcloud filestore instances restore

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud filestore instances restore

```text
NAME
    gcloud filestore instances restore - restore a Filestore instance from a
        backup

SYNOPSIS
    gcloud filestore instances restore (INSTANCE : --zone=ZONE)
        --file-share=FILE_SHARE --source-backup=SOURCE_BACKUP
        --source-backup-region=SOURCE_BACKUP_REGION [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Restore an existing Filestore instance from an existing backup.

EXAMPLES
    The following command restores an instance named 'my-instance' with a
    fileshare named 'vol1' in the zone europe-west3-a from a backup named
    'my-backup' in the region europe-west3.

        $ gcloud filestore instances restore my-instance \
            --zone=europe-west3-a --file-share=vol1 \
            --source-backup=my-backup --source-backup-region=europe-west3

POSITIONAL ARGUMENTS
     Instance resource - Arguments and flags that specify the Filestore
     instance to restore. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The zone of the Filestore instance.

          To set the zone attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + set the property filestore/zone.

REQUIRED FLAGS
     --file-share=FILE_SHARE
        File share to restore from the backup.

     --source-backup=SOURCE_BACKUP
        Name of the Filestore backup to restore from.

     --source-backup-region=SOURCE_BACKUP_REGION
        Region of the Filestore backup to restore from.

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

        $ gcloud alpha filestore instances restore

        $ gcloud beta filestore instances restore
```

### gcloud beta filestore instances restore

```text
NAME
    gcloud beta filestore instances restore - restore a Filestore instance from
        a backup

SYNOPSIS
    gcloud beta filestore instances restore (INSTANCE : --zone=ZONE)
        --file-share=FILE_SHARE --source-backup=SOURCE_BACKUP
        --source-backup-region=SOURCE_BACKUP_REGION [--async]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha filestore instances restore

```text
NAME
    gcloud alpha filestore instances restore - restore a Filestore instance
        from a snapshot or backup

SYNOPSIS
    gcloud alpha filestore instances restore (INSTANCE : --zone=ZONE)
        --file-share=FILE_SHARE
        (--source-backup=SOURCE_BACKUP
          --source-backup-region=SOURCE_BACKUP_REGION
          | [--source-snapshot=SOURCE_SNAPSHOT
          : --source-snapshot-region=SOURCE_SNAPSHOT_REGION]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/restore (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

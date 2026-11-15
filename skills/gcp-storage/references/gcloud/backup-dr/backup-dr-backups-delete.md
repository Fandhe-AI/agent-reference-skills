---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backups/delete
---

# gcloud backup-dr backups delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr backups delete

```text
NAME
    gcloud backup-dr backups delete - delete the specified Backup

SYNOPSIS
    gcloud backup-dr backups delete
        (BACKUP : --backup-vault=BACKUP_VAULT
          --data-source=DATA_SOURCE --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified Backup.

EXAMPLES
    To delete a backup sample-backup in backup vault sample-vault, data source
    sample-ds, project sample-project and location us-central1 , run:

        $ gcloud backup-dr backups delete sample-backup \
            --backup-vault=sample-vault --data-source=sample-ds \
            --project=sample-project --location=us-central1

POSITIONAL ARGUMENTS
     Backup resource - Name of the backup to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument backup on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BACKUP
          ID of the Backup or fully qualified identifier for the Backup.

          To set the name attribute:
          + provide the argument backup on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --backup-vault=BACKUP_VAULT
          The ID of the Backup Vault.

          To set the backup-vault attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --backup-vault on the command line.

       --data-source=DATA_SOURCE
          The ID of the Data Source.

          To set the data-source attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --data-source on the command line.

       --location=LOCATION
          The location of the Backup.

          To set the location attribute:
          + provide the argument backup on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Deletes a specific backup

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr backups delete

        $ gcloud beta backup-dr backups delete
```

### gcloud beta backup-dr backups delete

```text
NAME
    gcloud beta backup-dr backups delete - delete the specified Backup

SYNOPSIS
    gcloud beta backup-dr backups delete
        (BACKUP : --backup-vault=BACKUP_VAULT
          --data-source=DATA_SOURCE --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr backups delete

```text
NAME
    gcloud alpha backup-dr backups delete - delete the specified Backup

SYNOPSIS
    gcloud alpha backup-dr backups delete
        (BACKUP : --backup-vault=BACKUP_VAULT
          --data-source=DATA_SOURCE --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backups/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

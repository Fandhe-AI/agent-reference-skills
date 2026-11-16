---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/delete
---

# gcloud sql instances delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql instances delete

```text
NAME
    gcloud sql instances delete - deletes a Cloud SQL instance

SYNOPSIS
    gcloud sql instances delete INSTANCE [--async] [--enable-final-backup]
        [--final-backup-description=FINAL_BACKUP_DESCRIPTION]
        [--final-backup-expiry-time=FINAL_BACKUP_EXPIRY_TIME
          | --final-backup-retention-days=FINAL_BACKUP_RETENTION_DAYS]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a Cloud SQL instance.

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --enable-final-backup
        Enables the final backup to be taken at the time of instance deletion.

     --final-backup-description=FINAL_BACKUP_DESCRIPTION
        Provides description for the final backup going to be taken.

     At most one of these can be specified:

       --final-backup-expiry-time=FINAL_BACKUP_EXPIRY_TIME
          Specifies the time at which the final backup will expire. Maximum
          time allowed is 365 days. For instances managed by BackupDR, the
          maximum time allowed is 10 years (3653 days). Format:
          YYYY-MM-DDTHH:MM:SS.

       --final-backup-retention-days=FINAL_BACKUP_RETENTION_DAYS
          Specifies number of days to retain final backup. The valid range is
          between 1 and 365. For instances managed by BackupDR, the valid range
          is between 1 day and 10 years (3653 days). Default value is 30 days.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql instances delete

        $ gcloud beta sql instances delete
```

### gcloud beta sql instances delete

```text
NAME
    gcloud beta sql instances delete - deletes a Cloud SQL instance

SYNOPSIS
    gcloud beta sql instances delete INSTANCE [--async] [--enable-final-backup]
        [--final-backup-description=FINAL_BACKUP_DESCRIPTION]
        [--final-backup-expiry-time=FINAL_BACKUP_EXPIRY_TIME
          | --final-backup-retention-days=FINAL_BACKUP_RETENTION_DAYS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql instances delete

```text
NAME
    gcloud alpha sql instances delete - deletes a Cloud SQL instance

SYNOPSIS
    gcloud alpha sql instances delete INSTANCE [--async]
        [--enable-final-backup]
        [--final-backup-description=FINAL_BACKUP_DESCRIPTION]
        [--final-backup-expiry-time=FINAL_BACKUP_EXPIRY_TIME
          | --final-backup-retention-days=FINAL_BACKUP_RETENTION_DAYS]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

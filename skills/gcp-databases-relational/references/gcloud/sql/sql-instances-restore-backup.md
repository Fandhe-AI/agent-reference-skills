---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/restore-backup
---

# gcloud sql instances restore-backup

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql instances restore-backup

```text
NAME
    gcloud sql instances restore-backup - restores a backup of a Cloud SQL
        instance

SYNOPSIS
    gcloud sql instances restore-backup INSTANCE [--async]
        [--backup-id=BACKUP_ID] [--backup-instance=BACKUP_INSTANCE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    DEPRECATED: This command is deprecated and will be removed. Use 'gcloud
    beta sql backups restore' instead.

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID that will be restored.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --backup-id=BACKUP_ID
        The ID of the backup run to restore from.

     --backup-instance=BACKUP_INSTANCE
        The ID of the instance that the backup was taken from.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql instances restore-backup

        $ gcloud beta sql instances restore-backup
```

### gcloud beta sql instances restore-backup

```text
NAME
    gcloud beta sql instances restore-backup - restores a backup of a Cloud SQL
        instance

SYNOPSIS
    gcloud beta sql instances restore-backup INSTANCE [--async]
        [--backup-id=BACKUP_ID] [--backup-instance=BACKUP_INSTANCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql instances restore-backup

```text
NAME
    gcloud alpha sql instances restore-backup - restores a backup of a Cloud
        SQL instance

SYNOPSIS
    gcloud alpha sql instances restore-backup INSTANCE [--async]
        [--backup-id=BACKUP_ID] [--backup-instance=BACKUP_INSTANCE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/restore-backup (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

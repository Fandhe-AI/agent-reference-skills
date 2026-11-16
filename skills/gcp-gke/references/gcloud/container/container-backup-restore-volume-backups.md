---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/backup-restore/volume-backups
---

# gcloud container backup-restore volume-backups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta container backup-restore volume-backups describe

```text
NAME
    gcloud beta container backup-restore volume-backups describe - describe a
        volume backup

SYNOPSIS
    gcloud beta container backup-restore volume-backups describe
        (VOLUME_BACKUP
          : --backup=BACKUP --backup-plan=BACKUP_PLAN --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore volume-backups list

```text
NAME
    gcloud beta container backup-restore volume-backups list - list volume
        backups

SYNOPSIS
    gcloud beta container backup-restore volume-backups list
        [--backup=BACKUP --backup-plan=BACKUP_PLAN --location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore volume-backups describe

```text
NAME
    gcloud alpha container backup-restore volume-backups describe - describe a
        volume backup

SYNOPSIS
    gcloud alpha container backup-restore volume-backups describe
        (VOLUME_BACKUP
          : --backup=BACKUP --backup-plan=BACKUP_PLAN --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore volume-backups list

```text
NAME
    gcloud alpha container backup-restore volume-backups list - list volume
        backups

SYNOPSIS
    gcloud alpha container backup-restore volume-backups list
        [--backup=BACKUP --backup-plan=BACKUP_PLAN --location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/backup-restore/volume-backups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

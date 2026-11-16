---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/backup-restore/backups
---

# gcloud container backup-restore backups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta container backup-restore backups create

```text
NAME
    gcloud beta container backup-restore backups create - creates a backup

SYNOPSIS
    gcloud beta container backup-restore backups create
        (BACKUP : --backup-plan=BACKUP_PLAN --location=LOCATION)
        [--delete-lock-days=DELETE_LOCK_DAYS] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--retain-days=RETAIN_DAYS]
        [--async | --wait-for-completion] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore backups delete

```text
NAME
    gcloud beta container backup-restore backups delete - delete a backup

SYNOPSIS
    gcloud beta container backup-restore backups delete
        (BACKUP : --backup-plan=BACKUP_PLAN --location=LOCATION) [--async]
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore backups describe

```text
NAME
    gcloud beta container backup-restore backups describe - describe a backup

SYNOPSIS
    gcloud beta container backup-restore backups describe
        (BACKUP : --backup-plan=BACKUP_PLAN --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore backups get-backup-index-download-url

```text
NAME
    gcloud beta container backup-restore backups get-backup-index-download-url
        - get a backup index download URL

SYNOPSIS
    gcloud beta container backup-restore backups get-backup-index-download-url
        (BACKUP : --backup-plan=BACKUP_PLAN --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore backups get-iam-policy

```text
NAME
    gcloud beta container backup-restore backups get-iam-policy - get the IAM
        policy for a backup

SYNOPSIS
    gcloud beta container backup-restore backups get-iam-policy
        (BACKUP : --backup-plan=BACKUP_PLAN --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore backups list

```text
NAME
    gcloud beta container backup-restore backups list - list backups

SYNOPSIS
    gcloud beta container backup-restore backups list
        [--backup-plan=BACKUP_PLAN --location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore backups set-iam-policy

```text
NAME
    gcloud beta container backup-restore backups set-iam-policy - set the IAM
        policy for a backup

SYNOPSIS
    gcloud beta container backup-restore backups set-iam-policy
        (BACKUP : --backup-plan=BACKUP_PLAN --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore backups update

```text
NAME
    gcloud beta container backup-restore backups update - update a backup

SYNOPSIS
    gcloud beta container backup-restore backups update
        (BACKUP : --backup-plan=BACKUP_PLAN --location=LOCATION) [--async]
        [--delete-lock-days=DELETE_LOCK_DAYS] [--description=DESCRIPTION]
        [--etag=ETAG] [--retain-days=RETAIN_DAYS]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backups create

```text
NAME
    gcloud alpha container backup-restore backups create - creates a backup

SYNOPSIS
    gcloud alpha container backup-restore backups create
        (BACKUP : --backup-plan=BACKUP_PLAN --location=LOCATION)
        [--delete-lock-days=DELETE_LOCK_DAYS] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--retain-days=RETAIN_DAYS]
        [--async | --wait-for-completion] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backups delete

```text
NAME
    gcloud alpha container backup-restore backups delete - delete a backup

SYNOPSIS
    gcloud alpha container backup-restore backups delete
        (BACKUP : --backup-plan=BACKUP_PLAN --location=LOCATION) [--async]
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backups describe

```text
NAME
    gcloud alpha container backup-restore backups describe - describe a backup

SYNOPSIS
    gcloud alpha container backup-restore backups describe
        (BACKUP : --backup-plan=BACKUP_PLAN --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backups get-backup-index-download-url

```text
NAME
    gcloud alpha container backup-restore backups get-backup-index-download-url
        - get a backup index download URL

SYNOPSIS
    gcloud alpha container backup-restore backups get-backup-index-download-url
        (BACKUP : --backup-plan=BACKUP_PLAN --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backups get-iam-policy

```text
NAME
    gcloud alpha container backup-restore backups get-iam-policy - get the IAM
        policy for a backup

SYNOPSIS
    gcloud alpha container backup-restore backups get-iam-policy
        (BACKUP : --backup-plan=BACKUP_PLAN --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backups list

```text
NAME
    gcloud alpha container backup-restore backups list - list backups

SYNOPSIS
    gcloud alpha container backup-restore backups list
        [--backup-plan=BACKUP_PLAN --location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backups set-iam-policy

```text
NAME
    gcloud alpha container backup-restore backups set-iam-policy - set the IAM
        policy for a backup

SYNOPSIS
    gcloud alpha container backup-restore backups set-iam-policy
        (BACKUP : --backup-plan=BACKUP_PLAN --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backups update

```text
NAME
    gcloud alpha container backup-restore backups update - update a backup

SYNOPSIS
    gcloud alpha container backup-restore backups update
        (BACKUP : --backup-plan=BACKUP_PLAN --location=LOCATION) [--async]
        [--delete-lock-days=DELETE_LOCK_DAYS] [--description=DESCRIPTION]
        [--etag=ETAG] [--retain-days=RETAIN_DAYS]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/backup-restore/backups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

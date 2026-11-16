---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/backup-restore/backup-plans
---

# gcloud container backup-restore backup-plans

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta container backup-restore backup-plans create

```text
NAME
    gcloud beta container backup-restore backup-plans create - create a backup
        plan

SYNOPSIS
    gcloud beta container backup-restore backup-plans create
        (BACKUP_PLAN : --location=LOCATION) --cluster=CLUSTER
        (--all-namespaces | --selected-applications=SELECTED_APPLICATIONS
          | --selected-namespace-labels=SELECTED_NAMESPACE_LABELS
          | --selected-namespaces=[SELECTED_NAMESPACES,...]) [--async]
        [--deactivated] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--backup-delete-lock-days=BACKUP_DELETE_LOCK_DAYS
          --backup-retain-days=BACKUP_RETAIN_DAYS --locked]
        [--encryption-key=ENCRYPTION_KEY
          --include-secrets --include-volume-data --permissive-mode]
        [--paused --cron-schedule=CRON_SCHEDULE
          [--target-rpo-minutes=TARGET_RPO_MINUTES
          : --exclusion-windows-file=EXCLUSION_WINDOWS_FILE]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore backup-plans delete

```text
NAME
    gcloud beta container backup-restore backup-plans delete - delete a backup
        plan

SYNOPSIS
    gcloud beta container backup-restore backup-plans delete
        (BACKUP_PLAN : --location=LOCATION) [--async] [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore backup-plans describe

```text
NAME
    gcloud beta container backup-restore backup-plans describe - describe a
        backup plan

SYNOPSIS
    gcloud beta container backup-restore backup-plans describe
        (BACKUP_PLAN : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore backup-plans get-iam-policy

```text
NAME
    gcloud beta container backup-restore backup-plans get-iam-policy - get the
        IAM policy for a backup plan

SYNOPSIS
    gcloud beta container backup-restore backup-plans get-iam-policy
        (BACKUP_PLAN : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore backup-plans list

```text
NAME
    gcloud beta container backup-restore backup-plans list - list backup plans

SYNOPSIS
    gcloud beta container backup-restore backup-plans list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore backup-plans set-iam-policy

```text
NAME
    gcloud beta container backup-restore backup-plans set-iam-policy - set the
        IAM policy for a backup plan

SYNOPSIS
    gcloud beta container backup-restore backup-plans set-iam-policy
        (BACKUP_PLAN : --location=LOCATION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore backup-plans update

```text
NAME
    gcloud beta container backup-restore backup-plans update - update a backup
        plan

SYNOPSIS
    gcloud beta container backup-restore backup-plans update
        (BACKUP_PLAN : --location=LOCATION) [--async] [--deactivated]
        [--description=DESCRIPTION] [--etag=ETAG]
        [--update-labels=[KEY=VALUE,...]]
        [--all-namespaces | --selected-applications=SELECTED_APPLICATIONS
          | --selected-namespace-labels=SELECTED_NAMESPACE_LABELS
          | --selected-namespaces=[SELECTED_NAMESPACES,...]]
        [--backup-delete-lock-days=BACKUP_DELETE_LOCK_DAYS
          --backup-retain-days=BACKUP_RETAIN_DAYS --locked]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--encryption-key=ENCRYPTION_KEY
          --include-secrets --include-volume-data --permissive-mode]
        [--paused --cron-schedule=CRON_SCHEDULE
          --exclusion-windows-file=EXCLUSION_WINDOWS_FILE
          --target-rpo-minutes=TARGET_RPO_MINUTES] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backup-plans create

```text
NAME
    gcloud alpha container backup-restore backup-plans create - create a backup
        plan

SYNOPSIS
    gcloud alpha container backup-restore backup-plans create
        (BACKUP_PLAN : --location=LOCATION) --cluster=CLUSTER
        (--all-namespaces | --selected-applications=SELECTED_APPLICATIONS
          | --selected-namespace-labels=SELECTED_NAMESPACE_LABELS
          | --selected-namespaces=[SELECTED_NAMESPACES,...]) [--async]
        [--deactivated] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--backup-delete-lock-days=BACKUP_DELETE_LOCK_DAYS
          --backup-retain-days=BACKUP_RETAIN_DAYS --locked]
        [--encryption-key=ENCRYPTION_KEY
          --include-secrets --include-volume-data --permissive-mode]
        [--paused --cron-schedule=CRON_SCHEDULE
          [--target-rpo-minutes=TARGET_RPO_MINUTES
          : --exclusion-windows-file=EXCLUSION_WINDOWS_FILE]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backup-plans delete

```text
NAME
    gcloud alpha container backup-restore backup-plans delete - delete a backup
        plan

SYNOPSIS
    gcloud alpha container backup-restore backup-plans delete
        (BACKUP_PLAN : --location=LOCATION) [--async] [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backup-plans describe

```text
NAME
    gcloud alpha container backup-restore backup-plans describe - describe a
        backup plan

SYNOPSIS
    gcloud alpha container backup-restore backup-plans describe
        (BACKUP_PLAN : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backup-plans get-iam-policy

```text
NAME
    gcloud alpha container backup-restore backup-plans get-iam-policy - get the
        IAM policy for a backup plan

SYNOPSIS
    gcloud alpha container backup-restore backup-plans get-iam-policy
        (BACKUP_PLAN : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backup-plans list

```text
NAME
    gcloud alpha container backup-restore backup-plans list - list backup plans

SYNOPSIS
    gcloud alpha container backup-restore backup-plans list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backup-plans set-iam-policy

```text
NAME
    gcloud alpha container backup-restore backup-plans set-iam-policy - set the
        IAM policy for a backup plan

SYNOPSIS
    gcloud alpha container backup-restore backup-plans set-iam-policy
        (BACKUP_PLAN : --location=LOCATION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore backup-plans update

```text
NAME
    gcloud alpha container backup-restore backup-plans update - update a backup
        plan

SYNOPSIS
    gcloud alpha container backup-restore backup-plans update
        (BACKUP_PLAN : --location=LOCATION) [--async] [--deactivated]
        [--description=DESCRIPTION] [--etag=ETAG]
        [--update-labels=[KEY=VALUE,...]]
        [--all-namespaces | --selected-applications=SELECTED_APPLICATIONS
          | --selected-namespace-labels=SELECTED_NAMESPACE_LABELS
          | --selected-namespaces=[SELECTED_NAMESPACES,...]]
        [--backup-delete-lock-days=BACKUP_DELETE_LOCK_DAYS
          --backup-retain-days=BACKUP_RETAIN_DAYS --locked]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--encryption-key=ENCRYPTION_KEY
          --include-secrets --include-volume-data --permissive-mode]
        [--paused --cron-schedule=CRON_SCHEDULE
          --exclusion-windows-file=EXCLUSION_WINDOWS_FILE
          --target-rpo-minutes=TARGET_RPO_MINUTES] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/backup-restore/backup-plans (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

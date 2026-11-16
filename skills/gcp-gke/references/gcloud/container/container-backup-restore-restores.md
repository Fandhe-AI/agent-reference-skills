---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/backup-restore/restores
---

# gcloud container backup-restore restores

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta container backup-restore restores create

```text
NAME
    gcloud beta container backup-restore restores create - creates a restore

SYNOPSIS
    gcloud beta container backup-restore restores create
        (RESTORE : --location=LOCATION --restore-plan=RESTORE_PLAN)
        --backup=BACKUP [--description=DESCRIPTION] [--filter-file=FILTER_FILE]
        [--labels=[KEY=VALUE,...]]
        [--volume-data-restore-policy-overrides-file=VOLUME_DATA_RESTORE_POLICY_OVERRIDES_FILE]
        [--async | --wait-for-completion] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restores delete

```text
NAME
    gcloud beta container backup-restore restores delete - delete a restore

SYNOPSIS
    gcloud beta container backup-restore restores delete
        (RESTORE : --location=LOCATION --restore-plan=RESTORE_PLAN) [--async]
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restores describe

```text
NAME
    gcloud beta container backup-restore restores describe - describe a restore

SYNOPSIS
    gcloud beta container backup-restore restores describe
        (RESTORE : --location=LOCATION --restore-plan=RESTORE_PLAN)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restores get-iam-policy

```text
NAME
    gcloud beta container backup-restore restores get-iam-policy - get the IAM
        policy for a restore

SYNOPSIS
    gcloud beta container backup-restore restores get-iam-policy
        (RESTORE : --location=LOCATION --restore-plan=RESTORE_PLAN)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restores list

```text
NAME
    gcloud beta container backup-restore restores list - list restores

SYNOPSIS
    gcloud beta container backup-restore restores list
        [--location=LOCATION --restore-plan=RESTORE_PLAN] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restores set-iam-policy

```text
NAME
    gcloud beta container backup-restore restores set-iam-policy - set the IAM
        policy for a restore

SYNOPSIS
    gcloud beta container backup-restore restores set-iam-policy
        (RESTORE : --location=LOCATION --restore-plan=RESTORE_PLAN) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restores update

```text
NAME
    gcloud beta container backup-restore restores update - update a restore

SYNOPSIS
    gcloud beta container backup-restore restores update
        (RESTORE : --location=LOCATION --restore-plan=RESTORE_PLAN) [--async]
        [--description=DESCRIPTION] [--etag=ETAG]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restores create

```text
NAME
    gcloud alpha container backup-restore restores create - creates a restore

SYNOPSIS
    gcloud alpha container backup-restore restores create
        (RESTORE : --location=LOCATION --restore-plan=RESTORE_PLAN)
        --backup=BACKUP [--description=DESCRIPTION] [--filter-file=FILTER_FILE]
        [--labels=[KEY=VALUE,...]]
        [--volume-data-restore-policy-overrides-file=VOLUME_DATA_RESTORE_POLICY_OVERRIDES_FILE]
        [--async | --wait-for-completion] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restores delete

```text
NAME
    gcloud alpha container backup-restore restores delete - delete a restore

SYNOPSIS
    gcloud alpha container backup-restore restores delete
        (RESTORE : --location=LOCATION --restore-plan=RESTORE_PLAN) [--async]
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restores describe

```text
NAME
    gcloud alpha container backup-restore restores describe - describe a
        restore

SYNOPSIS
    gcloud alpha container backup-restore restores describe
        (RESTORE : --location=LOCATION --restore-plan=RESTORE_PLAN)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restores get-iam-policy

```text
NAME
    gcloud alpha container backup-restore restores get-iam-policy - get the IAM
        policy for a restore

SYNOPSIS
    gcloud alpha container backup-restore restores get-iam-policy
        (RESTORE : --location=LOCATION --restore-plan=RESTORE_PLAN)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restores list

```text
NAME
    gcloud alpha container backup-restore restores list - list restores

SYNOPSIS
    gcloud alpha container backup-restore restores list
        [--location=LOCATION --restore-plan=RESTORE_PLAN] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restores set-iam-policy

```text
NAME
    gcloud alpha container backup-restore restores set-iam-policy - set the IAM
        policy for a restore

SYNOPSIS
    gcloud alpha container backup-restore restores set-iam-policy
        (RESTORE : --location=LOCATION --restore-plan=RESTORE_PLAN) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restores update

```text
NAME
    gcloud alpha container backup-restore restores update - update a restore

SYNOPSIS
    gcloud alpha container backup-restore restores update
        (RESTORE : --location=LOCATION --restore-plan=RESTORE_PLAN) [--async]
        [--description=DESCRIPTION] [--etag=ETAG]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/backup-restore/restores (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

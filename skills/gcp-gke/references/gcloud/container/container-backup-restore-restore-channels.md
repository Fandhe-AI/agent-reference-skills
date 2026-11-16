---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/backup-restore/restore-channels
---

# gcloud container backup-restore restore-channels

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta container backup-restore restore-channels create

```text
NAME
    gcloud beta container backup-restore restore-channels create - create a
        restore channel

SYNOPSIS
    gcloud beta container backup-restore restore-channels create
        (RESTORE_CHANNEL : --location=LOCATION)
        --destination-project=DESTINATION_PROJECT [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restore-channels delete

```text
NAME
    gcloud beta container backup-restore restore-channels delete - delete a
        restore channel

SYNOPSIS
    gcloud beta container backup-restore restore-channels delete
        (RESTORE_CHANNEL : --location=LOCATION) [--async] [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restore-channels describe

```text
NAME
    gcloud beta container backup-restore restore-channels describe - describe a
        restore channel

SYNOPSIS
    gcloud beta container backup-restore restore-channels describe
        (RESTORE_CHANNEL : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restore-channels list

```text
NAME
    gcloud beta container backup-restore restore-channels list - list restore
        channels

SYNOPSIS
    gcloud beta container backup-restore restore-channels list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restore-channels update

```text
NAME
    gcloud beta container backup-restore restore-channels update - update a
        restore channel

SYNOPSIS
    gcloud beta container backup-restore restore-channels update
        (RESTORE_CHANNEL : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--etag=ETAG]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restore-channels create

```text
NAME
    gcloud alpha container backup-restore restore-channels create - create a
        restore channel

SYNOPSIS
    gcloud alpha container backup-restore restore-channels create
        (RESTORE_CHANNEL : --location=LOCATION)
        --destination-project=DESTINATION_PROJECT [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restore-channels delete

```text
NAME
    gcloud alpha container backup-restore restore-channels delete - delete a
        restore channel

SYNOPSIS
    gcloud alpha container backup-restore restore-channels delete
        (RESTORE_CHANNEL : --location=LOCATION) [--async] [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restore-channels describe

```text
NAME
    gcloud alpha container backup-restore restore-channels describe - describe
        a restore channel

SYNOPSIS
    gcloud alpha container backup-restore restore-channels describe
        (RESTORE_CHANNEL : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restore-channels list

```text
NAME
    gcloud alpha container backup-restore restore-channels list - list restore
        channels

SYNOPSIS
    gcloud alpha container backup-restore restore-channels list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restore-channels update

```text
NAME
    gcloud alpha container backup-restore restore-channels update - update a
        restore channel

SYNOPSIS
    gcloud alpha container backup-restore restore-channels update
        (RESTORE_CHANNEL : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--etag=ETAG]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/backup-restore/restore-channels (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

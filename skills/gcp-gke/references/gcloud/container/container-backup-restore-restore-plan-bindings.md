---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/backup-restore/restore-plan-bindings
---

# gcloud container backup-restore restore-plan-bindings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta container backup-restore restore-plan-bindings describe

```text
NAME
    gcloud beta container backup-restore restore-plan-bindings describe -
        describe a restore plan binding

SYNOPSIS
    gcloud beta container backup-restore restore-plan-bindings describe
        (RESTORE_PLAN_BINDING
          : --location=LOCATION --restore-channel=RESTORE_CHANNEL)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restore-plan-bindings list

```text
NAME
    gcloud beta container backup-restore restore-plan-bindings list - list
        restore plan bindings

SYNOPSIS
    gcloud beta container backup-restore restore-plan-bindings list
        (--restore-channel=RESTORE_CHANNEL : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restore-plan-bindings describe

```text
NAME
    gcloud alpha container backup-restore restore-plan-bindings describe -
        describe a restore plan binding

SYNOPSIS
    gcloud alpha container backup-restore restore-plan-bindings describe
        (RESTORE_PLAN_BINDING
          : --location=LOCATION --restore-channel=RESTORE_CHANNEL)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restore-plan-bindings list

```text
NAME
    gcloud alpha container backup-restore restore-plan-bindings list - list
        restore plan bindings

SYNOPSIS
    gcloud alpha container backup-restore restore-plan-bindings list
        (--restore-channel=RESTORE_CHANNEL : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/backup-restore/restore-plan-bindings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

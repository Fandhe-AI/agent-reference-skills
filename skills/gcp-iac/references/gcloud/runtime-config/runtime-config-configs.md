---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/runtime-config/configs
---

# gcloud runtime-config configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta runtime-config configs create

```text
NAME
    gcloud beta runtime-config configs create - create runtime-config resources

SYNOPSIS
    gcloud beta runtime-config configs create NAME [--description=DESCRIPTION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs delete

```text
NAME
    gcloud beta runtime-config configs delete - delete runtime-config resources

SYNOPSIS
    gcloud beta runtime-config configs delete NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs describe

```text
NAME
    gcloud beta runtime-config configs describe - describe runtime-config
        resources

SYNOPSIS
    gcloud beta runtime-config configs describe NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs list

```text
NAME
    gcloud beta runtime-config configs list - list runtime-config resources
        within the current project

SYNOPSIS
    gcloud beta runtime-config configs list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs update

```text
NAME
    gcloud beta runtime-config configs update - update runtime-config resources

SYNOPSIS
    gcloud beta runtime-config configs update NAME --description=DESCRIPTION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs variables describe

```text
NAME
    gcloud beta runtime-config configs variables describe - describe variable
        resources

SYNOPSIS
    gcloud beta runtime-config configs variables describe NAME
        --config-name=CONFIG_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs variables get-value

```text
NAME
    gcloud beta runtime-config configs variables get-value - output values of
        variable resources

SYNOPSIS
    gcloud beta runtime-config configs variables get-value NAME
        --config-name=CONFIG_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs variables list

```text
NAME
    gcloud beta runtime-config configs variables list - list variable resources
        within a configuration

SYNOPSIS
    gcloud beta runtime-config configs variables list --config-name=CONFIG_NAME
        [--values] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs variables set

```text
NAME
    gcloud beta runtime-config configs variables set - create or update
        variable resources

SYNOPSIS
    gcloud beta runtime-config configs variables set NAME [VALUE]
        --config-name=CONFIG_NAME [--is-text]
        [--fail-if-absent | --fail-if-present] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs variables unset

```text
NAME
    gcloud beta runtime-config configs variables unset - delete variable
        resources

SYNOPSIS
    gcloud beta runtime-config configs variables unset NAME
        --config-name=CONFIG_NAME [--fail-if-absent] [--recursive]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs variables watch

```text
NAME
    gcloud beta runtime-config configs variables watch - wait for a variable
        resources to change

SYNOPSIS
    gcloud beta runtime-config configs variables watch NAME
        --config-name=CONFIG_NAME [--max-wait=MAX_WAIT]
        [--newer-than=NEWER_THAN] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs waiters create

```text
NAME
    gcloud beta runtime-config configs waiters create - create waiter resources

SYNOPSIS
    gcloud beta runtime-config configs waiters create NAME
        --config-name=CONFIG_NAME
        --success-cardinality-path=SUCCESS_CARDINALITY_PATH --timeout=TIMEOUT
        [--async]
        [--failure-cardinality-number=FAILURE_CARDINALITY_NUMBER; default=1]
        [--failure-cardinality-path=FAILURE_CARDINALITY_PATH]
        [--success-cardinality-number=SUCCESS_CARDINALITY_NUMBER; default=1]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs waiters delete

```text
NAME
    gcloud beta runtime-config configs waiters delete - delete waiter resources

SYNOPSIS
    gcloud beta runtime-config configs waiters delete NAME
        --config-name=CONFIG_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs waiters describe

```text
NAME
    gcloud beta runtime-config configs waiters describe - describe waiter
        resources

SYNOPSIS
    gcloud beta runtime-config configs waiters describe NAME
        --config-name=CONFIG_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs waiters list

```text
NAME
    gcloud beta runtime-config configs waiters list - list waiter resources
        within a configuration

SYNOPSIS
    gcloud beta runtime-config configs waiters list --config-name=CONFIG_NAME
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta runtime-config configs waiters wait

```text
NAME
    gcloud beta runtime-config configs waiters wait - wait for a waiter to end
        in success or failure

SYNOPSIS
    gcloud beta runtime-config configs waiters wait NAME
        --config-name=CONFIG_NAME [--max-wait=MAX_WAIT] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/runtime-config/configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

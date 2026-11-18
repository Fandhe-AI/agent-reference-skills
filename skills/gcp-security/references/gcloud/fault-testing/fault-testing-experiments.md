---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/fault-testing/experiments
---

# gcloud fault-testing experiments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha fault-testing experiments affected-resources describe

```text
NAME
    gcloud alpha fault-testing experiments affected-resources describe -
        describe an affected resource

SYNOPSIS
    gcloud alpha fault-testing experiments affected-resources describe
        (AFFECTED_RESOURCE : --experiment=EXPERIMENT --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing experiments affected-resources list

```text
NAME
    gcloud alpha fault-testing experiments affected-resources list - list
        affected resources

SYNOPSIS
    gcloud alpha fault-testing experiments affected-resources list
        (--experiment=EXPERIMENT : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing experiments create

```text
NAME
    gcloud alpha fault-testing experiments create - create an experiment

SYNOPSIS
    gcloud alpha fault-testing experiments create EXPERIMENT
        --experiment-template=EXPERIMENT_TEMPLATE [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--location=LOCATION]
        [--start-on-create-enabled] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing experiments delete

```text
NAME
    gcloud alpha fault-testing experiments delete - delete an experiment

SYNOPSIS
    gcloud alpha fault-testing experiments delete
        (EXPERIMENT : --location=LOCATION) [--force] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing experiments describe

```text
NAME
    gcloud alpha fault-testing experiments describe - describe a current or
        past experiment

SYNOPSIS
    gcloud alpha fault-testing experiments describe
        (EXPERIMENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing experiments list

```text
NAME
    gcloud alpha fault-testing experiments list - list current or past
        experiments

SYNOPSIS
    gcloud alpha fault-testing experiments list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing experiments start

```text
NAME
    gcloud alpha fault-testing experiments start - start a new experiment run

SYNOPSIS
    gcloud alpha fault-testing experiments start
        (EXPERIMENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing experiments stop

```text
NAME
    gcloud alpha fault-testing experiments stop - cancel a running experiment

SYNOPSIS
    gcloud alpha fault-testing experiments stop
        (EXPERIMENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing experiments stop-all

```text
NAME
    gcloud alpha fault-testing experiments stop-all - cancel all experiments in
        a given location

SYNOPSIS
    gcloud alpha fault-testing experiments stop-all --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/fault-testing/experiments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/fault-testing/exclusion-windows
---

# gcloud fault-testing exclusion-windows

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha fault-testing exclusion-windows create

```text
NAME
    gcloud alpha fault-testing exclusion-windows create - create
        exclusionWindows

SYNOPSIS
    gcloud alpha fault-testing exclusion-windows create
        (EXCLUSION_WINDOW : --location=LOCATION) --duration=DURATION
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing exclusion-windows delete

```text
NAME
    gcloud alpha fault-testing exclusion-windows delete - delete
        exclusionWindows

SYNOPSIS
    gcloud alpha fault-testing exclusion-windows delete
        (EXCLUSION_WINDOW : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing exclusion-windows describe

```text
NAME
    gcloud alpha fault-testing exclusion-windows describe - describe
        exclusionWindows

SYNOPSIS
    gcloud alpha fault-testing exclusion-windows describe
        (EXCLUSION_WINDOW : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing exclusion-windows list

```text
NAME
    gcloud alpha fault-testing exclusion-windows list - list exclusionWindows

SYNOPSIS
    gcloud alpha fault-testing exclusion-windows list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing exclusion-windows start

```text
NAME
    gcloud alpha fault-testing exclusion-windows start - start exclusionWindows

SYNOPSIS
    gcloud alpha fault-testing exclusion-windows start
        (EXCLUSION_WINDOW : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing exclusion-windows stop

```text
NAME
    gcloud alpha fault-testing exclusion-windows stop - stop exclusionWindows

SYNOPSIS
    gcloud alpha fault-testing exclusion-windows stop
        (EXCLUSION_WINDOW : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing exclusion-windows update

```text
NAME
    gcloud alpha fault-testing exclusion-windows update - update
        exclusionWindows

SYNOPSIS
    gcloud alpha fault-testing exclusion-windows update
        (EXCLUSION_WINDOW : --location=LOCATION) [--description=DESCRIPTION]
        [--duration=DURATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/fault-testing/exclusion-windows (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

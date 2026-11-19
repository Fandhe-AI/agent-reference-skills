---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/app-optimize/reports
---

# gcloud app-optimize reports

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta app-optimize reports create

```text
NAME
    gcloud beta app-optimize reports create - creates an AppOptimize Report

SYNOPSIS
    gcloud beta app-optimize reports create (REPORT : --location=LOCATION)
        --dimensions=[DIMENSIONS,...] --metrics=[METRICS,...] [--async]
        [--report-filter=REPORT_FILTER]
        [--scopes=[application=APPLICATION],[project=PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-optimize reports delete

```text
NAME
    gcloud beta app-optimize reports delete - deletes an existing AppOptimize
        Report

SYNOPSIS
    gcloud beta app-optimize reports delete (REPORT : --location=LOCATION)
        [--allow-missing] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-optimize reports describe

```text
NAME
    gcloud beta app-optimize reports describe - gets an existing AppOptimize
        Report

SYNOPSIS
    gcloud beta app-optimize reports describe (REPORT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-optimize reports list

```text
NAME
    gcloud beta app-optimize reports list - lists existing AppOptimize Reports

SYNOPSIS
    gcloud beta app-optimize reports list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-optimize reports read

```text
NAME
    gcloud beta app-optimize reports read - reads an existing AppOptimize
        Report

SYNOPSIS
    gcloud beta app-optimize reports read (REPORT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/app-optimize/reports (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

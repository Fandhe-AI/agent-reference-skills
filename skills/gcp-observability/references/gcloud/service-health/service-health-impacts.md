---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/service-health/impacts
---

# gcloud service-health impacts

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta service-health impacts describe

```text
NAME
    gcloud beta service-health impacts describe - get details of an impact
        affecting a project

SYNOPSIS
    gcloud beta service-health impacts describe (IMPACT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-health impacts list

```text
NAME
    gcloud beta service-health impacts list - list impacts under a given
        project and location

SYNOPSIS
    gcloud beta service-health impacts list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-health impacts describe

```text
NAME
    gcloud alpha service-health impacts describe - get details of an impact
        affecting a project

SYNOPSIS
    gcloud alpha service-health impacts describe (IMPACT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-health impacts list

```text
NAME
    gcloud alpha service-health impacts list - list impacts under a given
        project and location

SYNOPSIS
    gcloud alpha service-health impacts list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/service-health/impacts (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

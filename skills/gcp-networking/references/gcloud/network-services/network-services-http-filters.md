---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/network-services/http-filters
---

# gcloud network-services http-filters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha network-services http-filters delete

```text
NAME
    gcloud alpha network-services http-filters delete - delete http filter

SYNOPSIS
    gcloud alpha network-services http-filters delete
        (HTTP_FILTER : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services http-filters describe

```text
NAME
    gcloud alpha network-services http-filters describe - describe a HTTP
        filter

SYNOPSIS
    gcloud alpha network-services http-filters describe
        (HTTP_FILTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services http-filters export

```text
NAME
    gcloud alpha network-services http-filters export - export http filter

SYNOPSIS
    gcloud alpha network-services http-filters export
        (HTTP_FILTER : --location=LOCATION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services http-filters import

```text
NAME
    gcloud alpha network-services http-filters import - import http filter

SYNOPSIS
    gcloud alpha network-services http-filters import
        (HTTP_FILTER : --location=LOCATION) [--async] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services http-filters list

```text
NAME
    gcloud alpha network-services http-filters list - list http filters

SYNOPSIS
    gcloud alpha network-services http-filters list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/network-services/http-filters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

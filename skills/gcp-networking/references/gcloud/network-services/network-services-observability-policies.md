---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/network-services/observability-policies
---

# gcloud network-services observability-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha network-services observability-policies delete

```text
NAME
    gcloud alpha network-services observability-policies delete - delete
        observability policy

SYNOPSIS
    gcloud alpha network-services observability-policies delete
        (OBSERVABILITY_POLICY : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services observability-policies describe

```text
NAME
    gcloud alpha network-services observability-policies describe - describe an
        observability policy

SYNOPSIS
    gcloud alpha network-services observability-policies describe
        (OBSERVABILITY_POLICY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services observability-policies export

```text
NAME
    gcloud alpha network-services observability-policies export - export
        observability policy

SYNOPSIS
    gcloud alpha network-services observability-policies export
        (OBSERVABILITY_POLICY : --location=LOCATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services observability-policies import

```text
NAME
    gcloud alpha network-services observability-policies import - import
        observability policy

SYNOPSIS
    gcloud alpha network-services observability-policies import
        (OBSERVABILITY_POLICY : --location=LOCATION) [--async]
        [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services observability-policies list

```text
NAME
    gcloud alpha network-services observability-policies list - list
        observability policies

SYNOPSIS
    gcloud alpha network-services observability-policies list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/network-services/observability-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

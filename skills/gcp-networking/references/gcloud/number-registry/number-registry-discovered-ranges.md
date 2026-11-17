---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/number-registry/discovered-ranges
---

# gcloud number-registry discovered-ranges

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha number-registry discovered-ranges describe

```text
NAME
    gcloud alpha number-registry discovered-ranges describe - gets details of a
        single discovered range resource

SYNOPSIS
    gcloud alpha number-registry discovered-ranges describe
        (DISCOVERED_RANGE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry discovered-ranges find-free-ip-ranges

```text
NAME
    gcloud alpha number-registry discovered-ranges find-free-ip-ranges - find
        free IP ranges in a discovered range

SYNOPSIS
    gcloud alpha number-registry discovered-ranges find-free-ip-ranges
        (DISCOVERED_RANGE : --location=LOCATION)
        --cidr-prefix-length=CIDR_PREFIX_LENGTH [--range-count=RANGE_COUNT]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry discovered-ranges list

```text
NAME
    gcloud alpha number-registry discovered-ranges list - list discovered range
        resources

SYNOPSIS
    gcloud alpha number-registry discovered-ranges list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry discovered-ranges show-utilization

```text
NAME
    gcloud alpha number-registry discovered-ranges show-utilization - show
        utilization of a discovered range

SYNOPSIS
    gcloud alpha number-registry discovered-ranges show-utilization
        (DISCOVERED_RANGE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/number-registry/discovered-ranges (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

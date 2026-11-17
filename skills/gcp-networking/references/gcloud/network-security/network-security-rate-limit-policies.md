---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/network-security/rate-limit-policies
---

# gcloud network-security rate-limit-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta network-security rate-limit-policies delete

```text
NAME
    gcloud beta network-security rate-limit-policies delete - delete a
        RateLimitPolicy resource

SYNOPSIS
    gcloud beta network-security rate-limit-policies delete
        (RATE_LIMIT_POLICY : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security rate-limit-policies describe

```text
NAME
    gcloud beta network-security rate-limit-policies describe - describe a
        RateLimitPolicy resource

SYNOPSIS
    gcloud beta network-security rate-limit-policies describe
        (RATE_LIMIT_POLICY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security rate-limit-policies export

```text
NAME
    gcloud beta network-security rate-limit-policies export - export a
        RateLimitPolicy resource

SYNOPSIS
    gcloud beta network-security rate-limit-policies export
        (RATE_LIMIT_POLICY : --location=LOCATION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security rate-limit-policies import

```text
NAME
    gcloud beta network-security rate-limit-policies import - import a
        RateLimitPolicy resource

SYNOPSIS
    gcloud beta network-security rate-limit-policies import
        (RATE_LIMIT_POLICY : --location=LOCATION) [--async] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security rate-limit-policies list

```text
NAME
    gcloud beta network-security rate-limit-policies list - list
        RateLimitPolicy resources

SYNOPSIS
    gcloud beta network-security rate-limit-policies list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/network-security/rate-limit-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

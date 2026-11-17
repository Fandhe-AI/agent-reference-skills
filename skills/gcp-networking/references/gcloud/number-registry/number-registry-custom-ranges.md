---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/number-registry/custom-ranges
---

# gcloud number-registry custom-ranges

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha number-registry custom-ranges create

```text
NAME
    gcloud alpha number-registry custom-ranges create - create a custom range
        resource

SYNOPSIS
    gcloud alpha number-registry custom-ranges create CUSTOM_RANGE [--async]
        [--attributes=[key=KEY],[value=VALUE]] [--description=DESCRIPTION]
        [--labels=[LABELS,...]] [--location=LOCATION]
        [--parent-range=PARENT_RANGE] [--realm=REALM] [--request-id=REQUEST_ID]
        [--ipv4-cidr-range=IPV4_CIDR_RANGE | --ipv6-cidr-range=IPV6_CIDR_RANGE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry custom-ranges delete

```text
NAME
    gcloud alpha number-registry custom-ranges delete - delete a single custom
        range resource

SYNOPSIS
    gcloud alpha number-registry custom-ranges delete
        (CUSTOM_RANGE : --location=LOCATION) [--async] [--force]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry custom-ranges describe

```text
NAME
    gcloud alpha number-registry custom-ranges describe - gets details of a
        single custom range resource

SYNOPSIS
    gcloud alpha number-registry custom-ranges describe
        (CUSTOM_RANGE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry custom-ranges find-free-ip-ranges

```text
NAME
    gcloud alpha number-registry custom-ranges find-free-ip-ranges - find free
        IP ranges in a custom range

SYNOPSIS
    gcloud alpha number-registry custom-ranges find-free-ip-ranges
        (CUSTOM_RANGE : --location=LOCATION)
        --cidr-prefix-length=CIDR_PREFIX_LENGTH [--range-count=RANGE_COUNT]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry custom-ranges list

```text
NAME
    gcloud alpha number-registry custom-ranges list - list custom range
        resources

SYNOPSIS
    gcloud alpha number-registry custom-ranges list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry custom-ranges show-utilization

```text
NAME
    gcloud alpha number-registry custom-ranges show-utilization - show
        utilization of a custom range

SYNOPSIS
    gcloud alpha number-registry custom-ranges show-utilization
        (CUSTOM_RANGE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry custom-ranges update

```text
NAME
    gcloud alpha number-registry custom-ranges update - update the parameters
        of a single custom range resource

SYNOPSIS
    gcloud alpha number-registry custom-ranges update CUSTOM_RANGE [--async]
        [--description=DESCRIPTION] [--location=LOCATION]
        [--request-id=REQUEST_ID]
        [--attributes=[key=KEY],[value=VALUE]
          | --add-attributes=[key=KEY],[value=VALUE] --clear-attributes
          | --remove-attributes=[key=KEY],[value=VALUE]]
        [--clear-parent-range | --parent-range=PARENT_RANGE]
        [--clear-realm | --realm=REALM]
        [--ipv4-cidr-range=IPV4_CIDR_RANGE | --ipv6-cidr-range=IPV6_CIDR_RANGE]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/number-registry/custom-ranges (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/number-registry/ipam-admin-scopes
---

# gcloud number-registry ipam-admin-scopes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha number-registry ipam-admin-scopes check-availability

```text
NAME
    gcloud alpha number-registry ipam-admin-scopes check-availability - check
        the availability of IPAM admin scopes

SYNOPSIS
    gcloud alpha number-registry ipam-admin-scopes check-availability
        --location=LOCATION --scopes=[SCOPES,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry ipam-admin-scopes cleanup

```text
NAME
    gcloud alpha number-registry ipam-admin-scopes cleanup - clean up a single
        IPAM admin scope resource

SYNOPSIS
    gcloud alpha number-registry ipam-admin-scopes cleanup
        (IPAM_ADMIN_SCOPE : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry ipam-admin-scopes create

```text
NAME
    gcloud alpha number-registry ipam-admin-scopes create - create an IPAM
        admin scope resource

SYNOPSIS
    gcloud alpha number-registry ipam-admin-scopes create
        (IPAM_ADMIN_SCOPE : --location=LOCATION)
        --enabled-addon-platforms=[ENABLED_ADDON_PLATFORMS,...]
        --scopes=[SCOPES,...] [--async] [--labels=[LABELS,...]]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry ipam-admin-scopes delete

```text
NAME
    gcloud alpha number-registry ipam-admin-scopes delete - delete a single
        IPAM admin scope resource

SYNOPSIS
    gcloud alpha number-registry ipam-admin-scopes delete
        (IPAM_ADMIN_SCOPE : --location=LOCATION) [--async] [--force]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry ipam-admin-scopes describe

```text
NAME
    gcloud alpha number-registry ipam-admin-scopes describe - gets details of a
        single IPAM admin scope resource

SYNOPSIS
    gcloud alpha number-registry ipam-admin-scopes describe
        (IPAM_ADMIN_SCOPE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry ipam-admin-scopes disable

```text
NAME
    gcloud alpha number-registry ipam-admin-scopes disable - disable a single
        IPAM admin scope resource

SYNOPSIS
    gcloud alpha number-registry ipam-admin-scopes disable
        (IPAM_ADMIN_SCOPE : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry ipam-admin-scopes list

```text
NAME
    gcloud alpha number-registry ipam-admin-scopes list - list IPAM admin scope
        resources

SYNOPSIS
    gcloud alpha number-registry ipam-admin-scopes list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry ipam-admin-scopes update

```text
NAME
    gcloud alpha number-registry ipam-admin-scopes update - update the
        parameters of a single IPAM admin scope resource

SYNOPSIS
    gcloud alpha number-registry ipam-admin-scopes update
        (IPAM_ADMIN_SCOPE : --location=LOCATION) [--async]
        [--enabled-addon-platforms=[ENABLED_ADDON_PLATFORMS,...]]
        [--request-id=REQUEST_ID] [--scopes=[SCOPES,...]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/number-registry/ipam-admin-scopes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

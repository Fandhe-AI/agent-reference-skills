---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/number-registry/realms
---

# gcloud number-registry realms

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha number-registry realms create

```text
NAME
    gcloud alpha number-registry realms create - create a realm resource

SYNOPSIS
    gcloud alpha number-registry realms create REALM
        --registry-book=REGISTRY_BOOK --traffic-type=TRAFFIC_TYPE [--async]
        [--ip-version=IP_VERSION] [--labels=[LABELS,...]] [--location=LOCATION]
        [--management-type=MANAGEMENT_TYPE] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry realms delete

```text
NAME
    gcloud alpha number-registry realms delete - delete a single realm resource

SYNOPSIS
    gcloud alpha number-registry realms delete (REALM : --location=LOCATION)
        [--async] [--force] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry realms describe

```text
NAME
    gcloud alpha number-registry realms describe - gets details of a single
        realm resource

SYNOPSIS
    gcloud alpha number-registry realms describe (REALM : --location=LOCATION)
        [--view=VIEW] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry realms list

```text
NAME
    gcloud alpha number-registry realms list - list realm resources

SYNOPSIS
    gcloud alpha number-registry realms list --location=LOCATION [--view=VIEW]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry realms update

```text
NAME
    gcloud alpha number-registry realms update - update the parameters of a
        single realm resource

SYNOPSIS
    gcloud alpha number-registry realms update REALM [--async]
        [--ip-version=IP_VERSION] [--location=LOCATION]
        [--management-type=MANAGEMENT_TYPE] [--registry-book=REGISTRY_BOOK]
        [--request-id=REQUEST_ID] [--traffic-type=TRAFFIC_TYPE]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/number-registry/realms (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

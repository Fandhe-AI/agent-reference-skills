---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/number-registry/registry-books
---

# gcloud number-registry registry-books

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha number-registry registry-books create

```text
NAME
    gcloud alpha number-registry registry-books create - create a registry book
        resource

SYNOPSIS
    gcloud alpha number-registry registry-books create
        (REGISTRY_BOOK : --location=LOCATION) [--async]
        [--claimed-scopes=[CLAIMED_SCOPES,...]] [--labels=[LABELS,...]]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry registry-books delete

```text
NAME
    gcloud alpha number-registry registry-books delete - delete a single
        registry book resource

SYNOPSIS
    gcloud alpha number-registry registry-books delete
        (REGISTRY_BOOK : --location=LOCATION) [--async] [--force]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry registry-books describe

```text
NAME
    gcloud alpha number-registry registry-books describe - gets details of a
        single registry book resource

SYNOPSIS
    gcloud alpha number-registry registry-books describe
        (REGISTRY_BOOK : --location=LOCATION) [--view=VIEW]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry registry-books list

```text
NAME
    gcloud alpha number-registry registry-books list - list registry book
        resources

SYNOPSIS
    gcloud alpha number-registry registry-books list --location=LOCATION
        [--view=VIEW] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry registry-books search-ip-resources

```text
NAME
    gcloud alpha number-registry registry-books search-ip-resources - search IP
        resources in a registry book

SYNOPSIS
    gcloud alpha number-registry registry-books search-ip-resources
        (REGISTRY_BOOK : --location=LOCATION) [--query=QUERY]
        [--search-resource-types=[SEARCH_RESOURCE_TYPES,...]]
        [--show-utilization] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha number-registry registry-books update

```text
NAME
    gcloud alpha number-registry registry-books update - update the parameters
        of a single registry book resource

SYNOPSIS
    gcloud alpha number-registry registry-books update
        (REGISTRY_BOOK : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID]
        [--claimed-scopes=[CLAIMED_SCOPES,...]
          | --add-claimed-scopes=[ADD_CLAIMED_SCOPES,...]
          --clear-claimed-scopes
          | --remove-claimed-scopes=[REMOVE_CLAIMED_SCOPES,...]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/number-registry/registry-books (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

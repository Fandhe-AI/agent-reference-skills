---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/network-services/egress-routings
---

# gcloud network-services egress-routings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha network-services egress-routings create

```text
NAME
    gcloud alpha network-services egress-routings create - create an Egress
        Routing

SYNOPSIS
    gcloud alpha network-services egress-routings create
        (EGRESS_ROUTING : --location=LOCATION) --gateway=GATEWAY
        --sources=[workloadUri=WORKLOADURI] [--async]
        [--description=DESCRIPTION] [--etag=ETAG] [--labels=[LABELS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services egress-routings delete

```text
NAME
    gcloud alpha network-services egress-routings delete - delete an Egress
        Routing

SYNOPSIS
    gcloud alpha network-services egress-routings delete
        (EGRESS_ROUTING : --location=LOCATION) [--async] [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services egress-routings describe

```text
NAME
    gcloud alpha network-services egress-routings describe - get details of an
        Egress Routing

SYNOPSIS
    gcloud alpha network-services egress-routings describe
        (EGRESS_ROUTING : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services egress-routings list

```text
NAME
    gcloud alpha network-services egress-routings list - list Egress Routings

SYNOPSIS
    gcloud alpha network-services egress-routings list --location=LOCATION
        [--return-partial-success] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services egress-routings update

```text
NAME
    gcloud alpha network-services egress-routings update - update an Egress
        Routing

SYNOPSIS
    gcloud alpha network-services egress-routings update
        (EGRESS_ROUTING : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--etag=ETAG] [--gateway=GATEWAY]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--sources=[workloadUri=WORKLOADURI]
          | --add-sources=[workloadUri=WORKLOADURI] --clear-sources
          | --remove-sources=[workloadUri=WORKLOADURI]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/network-services/egress-routings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

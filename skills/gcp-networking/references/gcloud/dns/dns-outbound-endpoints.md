---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/dns/outbound-endpoints
---

# gcloud dns outbound-endpoints

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta dns outbound-endpoints create

```text
NAME
    gcloud beta dns outbound-endpoints create - creates a new Cloud DNS
        outbound endpoint

SYNOPSIS
    gcloud beta dns outbound-endpoints create
        (OUTBOUND_ENDPOINT : --location=LOCATION) --network=NETWORK
        --subnetwork=SUBNETWORK [--async] [--description=DESCRIPTION]
        [--endpoint-ip=ENDPOINT_IP] [--endpoint-mode=ENDPOINT_MODE]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns outbound-endpoints delete

```text
NAME
    gcloud beta dns outbound-endpoints delete - deletes a Cloud DNS outbound
        endpoint

SYNOPSIS
    gcloud beta dns outbound-endpoints delete
        (OUTBOUND_ENDPOINT : --location=LOCATION) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns outbound-endpoints describe

```text
NAME
    gcloud beta dns outbound-endpoints describe - describes a Cloud DNS
        outbound endpoint

SYNOPSIS
    gcloud beta dns outbound-endpoints describe
        (OUTBOUND_ENDPOINT : --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns outbound-endpoints list

```text
NAME
    gcloud beta dns outbound-endpoints list - lists Cloud DNS outbound
        endpoints in a region

SYNOPSIS
    gcloud beta dns outbound-endpoints list --location=LOCATION
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns outbound-endpoints update

```text
NAME
    gcloud beta dns outbound-endpoints update - updates an existing Cloud DNS
        outbound endpoint

SYNOPSIS
    gcloud beta dns outbound-endpoints update
        (OUTBOUND_ENDPOINT : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--endpoint-mode=ENDPOINT_MODE]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns outbound-endpoints create

```text
NAME
    gcloud alpha dns outbound-endpoints create - creates a new Cloud DNS
        outbound endpoint

SYNOPSIS
    gcloud alpha dns outbound-endpoints create
        (OUTBOUND_ENDPOINT : --location=LOCATION) --network=NETWORK
        --subnetwork=SUBNETWORK [--async] [--description=DESCRIPTION]
        [--endpoint-ip=ENDPOINT_IP] [--endpoint-mode=ENDPOINT_MODE]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns outbound-endpoints delete

```text
NAME
    gcloud alpha dns outbound-endpoints delete - deletes a Cloud DNS outbound
        endpoint

SYNOPSIS
    gcloud alpha dns outbound-endpoints delete
        (OUTBOUND_ENDPOINT : --location=LOCATION) [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns outbound-endpoints describe

```text
NAME
    gcloud alpha dns outbound-endpoints describe - describes a Cloud DNS
        outbound endpoint

SYNOPSIS
    gcloud alpha dns outbound-endpoints describe
        (OUTBOUND_ENDPOINT : --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns outbound-endpoints list

```text
NAME
    gcloud alpha dns outbound-endpoints list - lists Cloud DNS outbound
        endpoints in a region

SYNOPSIS
    gcloud alpha dns outbound-endpoints list --location=LOCATION
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns outbound-endpoints update

```text
NAME
    gcloud alpha dns outbound-endpoints update - updates an existing Cloud DNS
        outbound endpoint

SYNOPSIS
    gcloud alpha dns outbound-endpoints update
        (OUTBOUND_ENDPOINT : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--endpoint-mode=ENDPOINT_MODE]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/dns/outbound-endpoints (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

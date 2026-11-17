---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/network-services/regional-multicast-domain-activations
---

# gcloud network-services regional-multicast-domain-activations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha network-services regional-multicast-domain-activations create

```text
NAME
    gcloud alpha network-services regional-multicast-domain-activations create
        - create a regional multicast domain activation

SYNOPSIS
    gcloud alpha network-services regional-multicast-domain-activations create
        (REGIONAL_MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION)
        --multicast-domain=MULTICAST_DOMAIN [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--multicast-source-location=MULTICAST_SOURCE_LOCATION]
        [--pim-mode=PIM_MODE] [--rp-ip-address=RP_IP_ADDRESS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services regional-multicast-domain-activations delete

```text
NAME
    gcloud alpha network-services regional-multicast-domain-activations delete
        - delete a regional multicast domain activation

SYNOPSIS
    gcloud alpha network-services regional-multicast-domain-activations delete
        (REGIONAL_MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services regional-multicast-domain-activations describe

```text
NAME
    gcloud alpha network-services regional-multicast-domain-activations
        describe - describe a regional multicast domain activation

SYNOPSIS
    gcloud alpha network-services regional-multicast-domain-activations
        describe (REGIONAL_MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services regional-multicast-domain-activations list

```text
NAME
    gcloud alpha network-services regional-multicast-domain-activations list -
        list regional multicast domain activations

SYNOPSIS
    gcloud alpha network-services regional-multicast-domain-activations list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services regional-multicast-domain-activations update

```text
NAME
    gcloud alpha network-services regional-multicast-domain-activations update
        - update a regional multicast domain activation

SYNOPSIS
    gcloud alpha network-services regional-multicast-domain-activations update
        (REGIONAL_MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/network-services/regional-multicast-domain-activations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

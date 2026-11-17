---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/network-services/regional-multicast-producer-associations
---

# gcloud network-services regional-multicast-producer-associations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha network-services regional-multicast-producer-associations create

```text
NAME
    gcloud alpha network-services regional-multicast-producer-associations
        create - create a regional multicast producer association

SYNOPSIS
    gcloud alpha network-services regional-multicast-producer-associations
        create (REGIONAL_MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION)
        --network=NETWORK
        --regional-multicast-domain-activation=REGIONAL_MULTICAST_DOMAIN_ACTIVATION
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services regional-multicast-producer-associations delete

```text
NAME
    gcloud alpha network-services regional-multicast-producer-associations
        delete - delete a regional multicast producer association

SYNOPSIS
    gcloud alpha network-services regional-multicast-producer-associations
        delete (REGIONAL_MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services regional-multicast-producer-associations describe

```text
NAME
    gcloud alpha network-services regional-multicast-producer-associations
        describe - describe a regional multicast producer association

SYNOPSIS
    gcloud alpha network-services regional-multicast-producer-associations
        describe
        (REGIONAL_MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services regional-multicast-producer-associations list

```text
NAME
    gcloud alpha network-services regional-multicast-producer-associations list
        - list regional multicast producer associations

SYNOPSIS
    gcloud alpha network-services regional-multicast-producer-associations list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services regional-multicast-producer-associations update

```text
NAME
    gcloud alpha network-services regional-multicast-producer-associations
        update - update a regional multicast producer association

SYNOPSIS
    gcloud alpha network-services regional-multicast-producer-associations
        update (REGIONAL_MULTICAST_PRODUCER_ASSOCIATION : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/network-services/regional-multicast-producer-associations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

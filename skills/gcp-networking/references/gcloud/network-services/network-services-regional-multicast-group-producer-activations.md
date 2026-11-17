---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/network-services/regional-multicast-group-producer-activations
---

# gcloud network-services regional-multicast-group-producer-activations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha network-services regional-multicast-group-producer-activations create

```text
NAME
    gcloud alpha network-services regional-multicast-group-producer-activations
        create - create a regional multicast group producer activation

SYNOPSIS
    gcloud alpha network-services regional-multicast-group-producer-activations
        create
        (REGIONAL_MULTICAST_GROUP_PRODUCER_ACTIVATION : --location=LOCATION)
        --regional-multicast-group-range-activation=REGIONAL_MULTICAST_GROUP_RANGE_ACTIVATION
        --regional-multicast-producer-association=REGIONAL_MULTICAST_PRODUCER_ASSOCIATION
        [--async] [--description=DESCRIPTION]
        [--interconnect-attachments=[INTERCONNECT_ATTACHMENTS,...]]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services regional-multicast-group-producer-activations delete

```text
NAME
    gcloud alpha network-services regional-multicast-group-producer-activations
        delete - delete a regional multicast group producer activation

SYNOPSIS
    gcloud alpha network-services regional-multicast-group-producer-activations
        delete
        (REGIONAL_MULTICAST_GROUP_PRODUCER_ACTIVATION : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services regional-multicast-group-producer-activations describe

```text
NAME
    gcloud alpha network-services regional-multicast-group-producer-activations
        describe - describe a regional multicast group producer activation

SYNOPSIS
    gcloud alpha network-services regional-multicast-group-producer-activations
        describe
        (REGIONAL_MULTICAST_GROUP_PRODUCER_ACTIVATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services regional-multicast-group-producer-activations list

```text
NAME
    gcloud alpha network-services regional-multicast-group-producer-activations
        list - list regional multicast group producer activations

SYNOPSIS
    gcloud alpha network-services regional-multicast-group-producer-activations
        list --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services regional-multicast-group-producer-activations update

```text
NAME
    gcloud alpha network-services regional-multicast-group-producer-activations
        update - update a regional multicast group producer activation

SYNOPSIS
    gcloud alpha network-services regional-multicast-group-producer-activations
        update
        (REGIONAL_MULTICAST_GROUP_PRODUCER_ACTIVATION : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--interconnect-attachments=[INTERCONNECT_ATTACHMENTS,...]
          | --add-interconnect-attachments=[ADD_INTERCONNECT_ATTACHMENTS,...]
          --clear-interconnect-attachments
          | --remove-interconnect-attachments=[REMOVE_INTERCONNECT_ATTACHMENTS,
          ...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/network-services/regional-multicast-group-producer-activations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

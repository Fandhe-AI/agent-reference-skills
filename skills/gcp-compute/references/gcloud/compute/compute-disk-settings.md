---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/disk-settings
---

# gcloud compute disk-settings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta compute disk-settings describe

```text
NAME
    gcloud beta compute disk-settings describe - describe a Google Compute
        Engine disk setting

SYNOPSIS
    gcloud beta compute disk-settings describe (--region=REGION | --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute disk-settings update

```text
NAME
    gcloud beta compute disk-settings update - update disk settings

SYNOPSIS
    gcloud beta compute disk-settings update (--region=REGION | --zone=ZONE)
        [--access-location-policy=ACCESS_LOCATION_POLICY]
        [--add-access-locations=[ADD_ACCESS_LOCATIONS,...]]
        [--remove-access-locations=[REMOVE_ACCESS_LOCATIONS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute disk-settings describe

```text
NAME
    gcloud alpha compute disk-settings describe - describe a Google Compute
        Engine disk setting

SYNOPSIS
    gcloud alpha compute disk-settings describe (--region=REGION | --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute disk-settings update

```text
NAME
    gcloud alpha compute disk-settings update - update disk settings

SYNOPSIS
    gcloud alpha compute disk-settings update (--region=REGION | --zone=ZONE)
        [--access-location-policy=ACCESS_LOCATION_POLICY]
        [--add-access-locations=[ADD_ACCESS_LOCATIONS,...]]
        [--remove-access-locations=[REMOVE_ACCESS_LOCATIONS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/disk-settings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

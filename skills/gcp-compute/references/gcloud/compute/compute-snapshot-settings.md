---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/snapshot-settings
---

# gcloud compute snapshot-settings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute snapshot-settings describe

```text
NAME
    gcloud compute snapshot-settings describe - describe snapshot settings

SYNOPSIS
    gcloud compute snapshot-settings describe [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe the snapshot settings of a project.

EXAMPLES
    To display the snapshot settings of a project called my-project, run:

        $ gcloud compute snapshot-settings describe --project=my-project

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/alpha or compute/beta or comptue/v1 API. The
    full documentation for this API can be found at:
    https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute snapshot-settings describe

        $ gcloud beta compute snapshot-settings describe
```

### gcloud compute snapshot-settings update

```text
NAME
    gcloud compute snapshot-settings update - update snapshot settings

SYNOPSIS
    gcloud compute snapshot-settings update [--async]
        [--storage-location-names=[STORAGE_LOCATION_NAMES,...]]
        [--storage-location-policy=STORAGE_LOCATION_POLICY]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the snapshot settings of a project.

EXAMPLES
    To update the snapshot settings and set the storage location policy to the
    nearest multi-region as the source disk, run:

        $ gcloud compute snapshot-settings update \
        --storage-location-policy=nearest-multi-region

    To update the snapshot settings and set the storage location policy to the
    same region as the source disk, run:

        $ gcloud compute snapshot-settings update \
        --storage-location-policy=local-region

    To update the snapshot settings and set the storage location policy to
    store snapshots in a specific location like us-west1, run:

        $ gcloud compute snapshot-settings update \
        --storage-location-policy=specific-locations \
        --storage-location-names=us-west1

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --storage-location-names=[STORAGE_LOCATION_NAMES,...]
        The custom storage location that you specify for the project's
        snapshots. You can specify only a single location. Use this flag only
        when you use the specific-locations value for the
        --storage-location-policy flag. For more information, refer to the
        snapshot settings documentation at
        https://cloud.google.com/compute/docs/disks/snapshot-settings.

     --storage-location-policy=STORAGE_LOCATION_POLICY
        The storage location policy. For more information, refer to the
        snapshot settings documentation at
        https://cloud.google.com/compute/docs/disks/snapshot-settings.
        STORAGE_LOCATION_POLICY must be one of: local-region,
        nearest-multi-region, specific-locations.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/alpha or compute/beta or compute/v1 API. The
    full documentation for this API can be found at:
    https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute snapshot-settings update

        $ gcloud beta compute snapshot-settings update
```

### gcloud beta compute snapshot-settings describe

```text
NAME
    gcloud beta compute snapshot-settings describe - describe snapshot settings

SYNOPSIS
    gcloud beta compute snapshot-settings describe [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute snapshot-settings update

```text
NAME
    gcloud beta compute snapshot-settings update - update snapshot settings

SYNOPSIS
    gcloud beta compute snapshot-settings update
        [--access-location-policy=ACCESS_LOCATION_POLICY]
        [--add-access-locations=[ADD_ACCESS_LOCATIONS,...]] [--async]
        [--region=REGION]
        [--remove-access-locations=[REMOVE_ACCESS_LOCATIONS,...]]
        [--storage-location-names=[STORAGE_LOCATION_NAMES,...]]
        [--storage-location-policy=STORAGE_LOCATION_POLICY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshot-settings describe

```text
NAME
    gcloud alpha compute snapshot-settings describe - describe snapshot
        settings

SYNOPSIS
    gcloud alpha compute snapshot-settings describe [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshot-settings update

```text
NAME
    gcloud alpha compute snapshot-settings update - update snapshot settings

SYNOPSIS
    gcloud alpha compute snapshot-settings update
        [--access-location-policy=ACCESS_LOCATION_POLICY]
        [--add-access-locations=[ADD_ACCESS_LOCATIONS,...]] [--async]
        [--region=REGION]
        [--remove-access-locations=[REMOVE_ACCESS_LOCATIONS,...]]
        [--storage-location-names=[STORAGE_LOCATION_NAMES,...]]
        [--storage-location-policy=STORAGE_LOCATION_POLICY]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/snapshot-settings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

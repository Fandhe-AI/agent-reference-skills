---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/project-zonal-metadata
---

# gcloud compute project-zonal-metadata

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute project-zonal-metadata add

```text
NAME
    gcloud compute project-zonal-metadata add - add or update project zonal
        metadata

SYNOPSIS
    gcloud compute project-zonal-metadata add
        --metadata=KEY=VALUE,[KEY=VALUE,...] --zone=ZONE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute project-zonal-metadata add is used to add or update project
    zonal metadata for your VM instances. Project zonal metadata values
    propagate to all VMs within the specified zone. Every VM has access to a
    metadata server that you can use to query the configured project zonal
    metadata values. To set metadata for individual instances, use gcloud
    compute instances add-metadata. For information about metadata, see
    https://cloud.google.com/compute/docs/metadata.

    Only the metadata keys that you provide in the command get mutated. All
    other existing metadata entries remain the same.

EXAMPLES
    To set the project zonal metadata with key=value in the zone us-central1-a
    for the project my-gcp-project, run:

        $ gcloud compute project-zonal-metadata add --metadata=key=value \
            --zone=us-central1-a --project=my-gcp-project

    For more information and examples for setting project zonal metadata, see
    https://cloud.google.com/compute/docs/metadata/setting-custom-metadata#set-custom-project-zonal-metadata

REQUIRED FLAGS
     --metadata=KEY=VALUE,[KEY=VALUE,...]
        The project zonal metadata key-value pairs that you want to add or
        update

     --zone=ZONE
        The zone in which you want to add or update project zonal metadata

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute project-zonal-metadata add

        $ gcloud beta compute project-zonal-metadata add
```

### gcloud compute project-zonal-metadata describe

```text
NAME
    gcloud compute project-zonal-metadata describe - describe project zonal
        metadata

SYNOPSIS
    gcloud compute project-zonal-metadata describe --zone=ZONE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe project zonal metadata.

EXAMPLES
    To describe the project zonal metadata in the zone us-central1-a for the
    project my-gcp-project, run:

        $ gcloud compute project-zonal-metadata describe \
            --zone=us-central1-a --project=my-gcp-project

REQUIRED FLAGS
     --zone=ZONE
        Zone for project zonal metadata

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute project-zonal-metadata describe

        $ gcloud beta compute project-zonal-metadata describe
```

### gcloud compute project-zonal-metadata remove

```text
NAME
    gcloud compute project-zonal-metadata remove - remove project zonal
        metadata

SYNOPSIS
    gcloud compute project-zonal-metadata remove --zone=ZONE
        [--all | --keys=KEY,[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute project-zonal-metadata remove is used to remove project
    zonal metadata from all VMs within the specified zone. For information
    about metadata, see https://cloud.google.com/compute/docs/metadata.

    Only the metadata keys that you provide in the command get removed. All
    other existing metadata entries remain the same.

    After you remove a specific project zonal metadata entry, if that metadata
    key has any project-wide value configured, then the VMs in the zone
    automatically inherit that project-wide value.

EXAMPLES
    To remove the project zonal metadata with key=value in the zone
    us-central1-a for the project my-gcp-project, run:

        $ gcloud compute project-zonal-metadata remove --keys=key \
            --zone=us-central1-a --project=my-gcp-project

    For more information and examples about how to remove project zonal
    metadata, see
    https://cloud.google.com/compute/docs/metadata/setting-custom-metadata#remove-custom-project-zonal-metadata

REQUIRED FLAGS
     --zone=ZONE
        The zone in which you want to remove project zonal metadata

OPTIONAL FLAGS
     At most one of these can be specified:

       --all
          If provided, all project zonal metadata entries are removed from VM
          instances in the zone.

       --keys=KEY,[KEY,...]
          The keys for which you want to remove project zonal metadata

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute project-zonal-metadata remove

        $ gcloud beta compute project-zonal-metadata remove
```

### gcloud beta compute project-zonal-metadata add

```text
NAME
    gcloud beta compute project-zonal-metadata add - add or update project
        zonal metadata

SYNOPSIS
    gcloud beta compute project-zonal-metadata add
        --metadata=KEY=VALUE,[KEY=VALUE,...] --zone=ZONE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute project-zonal-metadata describe

```text
NAME
    gcloud beta compute project-zonal-metadata describe - describe project
        zonal metadata

SYNOPSIS
    gcloud beta compute project-zonal-metadata describe --zone=ZONE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute project-zonal-metadata remove

```text
NAME
    gcloud beta compute project-zonal-metadata remove - remove project zonal
        metadata

SYNOPSIS
    gcloud beta compute project-zonal-metadata remove --zone=ZONE
        [--all | --keys=KEY,[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute project-zonal-metadata add

```text
NAME
    gcloud alpha compute project-zonal-metadata add - add or update project
        zonal metadata

SYNOPSIS
    gcloud alpha compute project-zonal-metadata add
        --metadata=KEY=VALUE,[KEY=VALUE,...] --zone=ZONE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute project-zonal-metadata describe

```text
NAME
    gcloud alpha compute project-zonal-metadata describe - describe project
        zonal metadata

SYNOPSIS
    gcloud alpha compute project-zonal-metadata describe --zone=ZONE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute project-zonal-metadata remove

```text
NAME
    gcloud alpha compute project-zonal-metadata remove - remove project zonal
        metadata

SYNOPSIS
    gcloud alpha compute project-zonal-metadata remove --zone=ZONE
        [--all | --keys=KEY,[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/project-zonal-metadata (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

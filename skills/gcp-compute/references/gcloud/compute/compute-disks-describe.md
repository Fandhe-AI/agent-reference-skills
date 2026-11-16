---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/describe
---

# gcloud compute disks describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute disks describe

```text
NAME
    gcloud compute disks describe - describe a Compute Engine disk

SYNOPSIS
    gcloud compute disks describe DISK_NAME [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute disks describe displays all data associated with a Compute
    Engine disk in a project.

EXAMPLES
    To describe the disk 'my-disk' in zone 'us-east1-a', run:

        $ gcloud compute disks describe my-disk --zone=us-east1-a

POSITIONAL ARGUMENTS
     DISK_NAME
        Name of the disk to describe.

FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the disk to describe. If not specified, you might be
          prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

       --zone=ZONE
          Zone of the disk to describe. If not specified and the compute/zone
          property isn't set, you might be prompted to select a zone
          (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/zone property:

              $ gcloud config set compute/zone ZONE

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          To unset the property, run:

              $ gcloud config unset compute/zone

          Alternatively, the zone can be stored in the environment variable
          CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute disks describe

        $ gcloud beta compute disks describe
```

### gcloud beta compute disks describe

```text
NAME
    gcloud beta compute disks describe - describe a Compute Engine disk

SYNOPSIS
    gcloud beta compute disks describe DISK_NAME
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute disks describe

```text
NAME
    gcloud alpha compute disks describe - describe a Compute Engine disk

SYNOPSIS
    gcloud alpha compute disks describe DISK_NAME
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/move
---

# gcloud compute disks move

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute disks move

```text
NAME
    gcloud compute disks move - move a disk between zones

SYNOPSIS
    gcloud compute disks move DISK_NAME --destination-zone=DESTINATION_ZONE
        [--async] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute disks move facilitates moving a Compute Engine disk volume
    from one zone to another. You cannot move a disk if it is attached to a
    running or stopped instance; use the gcloud compute instances move command
    instead.

    The gcloud compute disks move command does not support regional persistent
    disks. See
    https://cloud.google.com/compute/docs/disks/regional-persistent-disk for
    more details.

EXAMPLES
    To move the disk called example-disk-1 from us-central1-b to us-central1-f,
    run:

        $ gcloud compute disks move example-disk-1 --zone=us-central1-b \
            --destination-zone=us-central1-f

POSITIONAL ARGUMENTS
     DISK_NAME
        Name of the disk to operate on.

REQUIRED FLAGS
     --destination-zone=DESTINATION_ZONE
        The zone to move the disk to.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --zone=ZONE
        Zone of the disk to operate on. If not specified and the compute/zone
        property isn't set, you might be prompted to select a zone (interactive
        mode only).

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

        $ gcloud alpha compute disks move

        $ gcloud beta compute disks move
```

### gcloud beta compute disks move

```text
NAME
    gcloud beta compute disks move - move a disk between zones

SYNOPSIS
    gcloud beta compute disks move DISK_NAME
        --destination-zone=DESTINATION_ZONE [--async] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute disks move

```text
NAME
    gcloud alpha compute disks move - move a disk between zones

SYNOPSIS
    gcloud alpha compute disks move DISK_NAME
        --destination-zone=DESTINATION_ZONE [--async] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/move (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

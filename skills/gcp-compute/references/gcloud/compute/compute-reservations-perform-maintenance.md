---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/perform-maintenance
---

# gcloud compute reservations perform-maintenance

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute reservations perform-maintenance

```text
NAME
    gcloud compute reservations perform-maintenance - perform maintenance on a
        reservation, only applicable to reservations with reservation blocks

SYNOPSIS
    gcloud compute reservations perform-maintenance RESERVATION [--scope=SCOPE]
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Perform maintenance on a reservation, only applicable to reservations with
    reservation blocks.

EXAMPLES
    To perform maintenance on reservation my-reservation in my-zone with scope
    all, run:

        $ gcloud compute reservations perform-maintenance my-reservation \
            --zone=my-zone --scope=all

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to perform-maintenance.

FLAGS
     --scope=SCOPE
        The maintenance scope to set for the reservation. SCOPE must be one of:

         all
            Perform maintenance on all hosts in the reservation.
         running
            Perform maintenance only on the hosts in the reservation that have
            running VMs.
         unused
            Perform maintenance only on the hosts in the reservation that don't
            have running VMs.

     --zone=ZONE
        Zone of the reservation to perform-maintenance. If not specified and
        the compute/zone property isn't set, you might be prompted to select a
        zone (interactive mode only).

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

        $ gcloud alpha compute reservations perform-maintenance

        $ gcloud beta compute reservations perform-maintenance
```

### gcloud beta compute reservations perform-maintenance

```text
NAME
    gcloud beta compute reservations perform-maintenance - perform maintenance
        on a reservation, only applicable to reservations with reservation
        blocks

SYNOPSIS
    gcloud beta compute reservations perform-maintenance RESERVATION
        [--scope=SCOPE] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations perform-maintenance

```text
NAME
    gcloud alpha compute reservations perform-maintenance - perform maintenance
        on a reservation, only applicable to reservations with reservation
        blocks

SYNOPSIS
    gcloud alpha compute reservations perform-maintenance RESERVATION
        [--scope=SCOPE] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/perform-maintenance (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

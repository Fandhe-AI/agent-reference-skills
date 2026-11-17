---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/slots
---

# gcloud compute reservations slots

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute reservations slots describe

```text
NAME
    gcloud compute reservations slots describe - describe a Compute Engine
        reservation slot

SYNOPSIS
    gcloud compute reservations slots describe RESERVATION
        --block-name=BLOCK_NAME --slot-name=SLOT_NAME
        --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Compute Engine reservation slot.

EXAMPLES
    To describe a reservation slot in reservation exr1 in my-zone with block
    name my-block, sub-block name my-sub-block, and slot name my-slot, run:

        $ gcloud compute reservations slots describe exr1 --zone=my-zone \
            --block-name=my-block --sub-block-name=my-sub-block \
            --slot-name=my-slot

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to describe.

REQUIRED FLAGS
     --block-name=BLOCK_NAME
        The name of the reservation block.

     --slot-name=SLOT_NAME
        The name of the reservation slot.

     --sub-block-name=SUB_BLOCK_NAME
        The name of the reservation sub block.

OPTIONAL FLAGS
     --zone=ZONE
        Zone of the reservation to describe. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
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

        $ gcloud alpha compute reservations slots describe

        $ gcloud beta compute reservations slots describe
```

### gcloud compute reservations slots get-health

```text
NAME
    gcloud compute reservations slots get-health - get the health of a
        reservation slot

SYNOPSIS
    gcloud compute reservations slots get-health RESERVATION
        --block-name=BLOCK_NAME --slot-name=SLOT_NAME
        --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the health of a reservation slot.

EXAMPLES
    To get the health of a reservation slot in reservation exr-1 in ZONE with
    block name block-1, sub-block name sub-block-1 and slot name slot-1, run:

        $ gcloud compute reservations slots get-health exr-1 --zone=ZONE \
            --block-name=block-1 --sub-block-name=sub-block-1 \
            --slot-name=slot-1

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to get-health.

REQUIRED FLAGS
     --block-name=BLOCK_NAME
        Name of the reservation block.

     --slot-name=SLOT_NAME
        Name of the reservation slot.

     --sub-block-name=SUB_BLOCK_NAME
        Name of the reservation sub block.

OPTIONAL FLAGS
     --zone=ZONE
        Zone of the reservation to get-health. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
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

        $ gcloud alpha compute reservations slots get-health

        $ gcloud beta compute reservations slots get-health
```

### gcloud compute reservations slots get-version

```text
NAME
    gcloud compute reservations slots get-version - get the version of a
        reservation slot

SYNOPSIS
    gcloud compute reservations slots get-version RESERVATION
        --block-name=BLOCK_NAME --slot-name=SLOT_NAME
        --sub-block-name=SUB_BLOCK_NAME [--current] [--target] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the version of a reservation slot.

EXAMPLES
    To get the current version of a reservation slot in reservation exr-1 in
    ZONE with block name block-1, sub-block name sub-block-1 and slot name
    slot-1, run:

        $ gcloud compute reservations slots get-version exr-1 --zone=ZONE \
            --block-name=block-1 --sub-block-name=sub-block-1 \
            --slot-name=slot-1 --current

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to get-version.

REQUIRED FLAGS
     --block-name=BLOCK_NAME
        The name of the reservation block.

     --slot-name=SLOT_NAME
        The name of the reservation slot.

     --sub-block-name=SUB_BLOCK_NAME
        The name of the reservation sub block.

OPTIONAL FLAGS
     --current
        Whether to get the current version.

     --target
        Whether to get the target version.

     --zone=ZONE
        Zone of the reservation to get-version. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
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

        $ gcloud alpha compute reservations slots get-version

        $ gcloud beta compute reservations slots get-version
```

### gcloud compute reservations slots list

```text
NAME
    gcloud compute reservations slots list - list Compute Engine reservation
        slots

SYNOPSIS
    gcloud compute reservations slots list RESERVATION --block-name=BLOCK_NAME
        --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute reservations slots list displays all Compute Engine
    reservation slots in an extended reservation's sub-block.

EXAMPLES
    To list all reservation slots in an extended reservation's block my-block
    and sub-block my-sub-block in table form, run:

        $ gcloud compute reservations slots list extended-reservation \
            --block-name=my-block --sub-block-name=my-sub-block \
            --zone=us-central1-a --project=my-project

    To list the URIs of all reservation slots in an extended reservation, run:

        $ gcloud compute reservations slots list extended-reservation \
            --block-name=my-block --sub-block-name=my-sub-block \
            --zone=us-central1-a --project=my-project --uri

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to list.

REQUIRED FLAGS
     --block-name=BLOCK_NAME
        The name of the reservation block.

     --sub-block-name=SUB_BLOCK_NAME
        The name of the reservation sub block.

FLAGS
     --zone=ZONE
        Zone of the reservation to list. If not specified and the compute/zone
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

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute reservations slots list

        $ gcloud beta compute reservations slots list
```

### gcloud beta compute reservations slots describe

```text
NAME
    gcloud beta compute reservations slots describe - describe a Compute Engine
        reservation slot

SYNOPSIS
    gcloud beta compute reservations slots describe RESERVATION
        --block-name=BLOCK_NAME --slot-name=SLOT_NAME
        --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations slots get-health

```text
NAME
    gcloud beta compute reservations slots get-health - get the health of a
        reservation slot

SYNOPSIS
    gcloud beta compute reservations slots get-health RESERVATION
        --block-name=BLOCK_NAME --slot-name=SLOT_NAME
        --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations slots get-version

```text
NAME
    gcloud beta compute reservations slots get-version - get the version of a
        reservation slot

SYNOPSIS
    gcloud beta compute reservations slots get-version RESERVATION
        --block-name=BLOCK_NAME --slot-name=SLOT_NAME
        --sub-block-name=SUB_BLOCK_NAME [--current] [--target] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations slots list

```text
NAME
    gcloud beta compute reservations slots list - list Compute Engine
        reservation slots

SYNOPSIS
    gcloud beta compute reservations slots list RESERVATION
        --block-name=BLOCK_NAME --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations slots describe

```text
NAME
    gcloud alpha compute reservations slots describe - describe a Compute
        Engine reservation slot

SYNOPSIS
    gcloud alpha compute reservations slots describe RESERVATION
        --block-name=BLOCK_NAME --slot-name=SLOT_NAME
        --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations slots get-health

```text
NAME
    gcloud alpha compute reservations slots get-health - get the health of a
        reservation slot

SYNOPSIS
    gcloud alpha compute reservations slots get-health RESERVATION
        --block-name=BLOCK_NAME --slot-name=SLOT_NAME
        --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations slots get-version

```text
NAME
    gcloud alpha compute reservations slots get-version - get the version of a
        reservation slot

SYNOPSIS
    gcloud alpha compute reservations slots get-version RESERVATION
        --block-name=BLOCK_NAME --slot-name=SLOT_NAME
        --sub-block-name=SUB_BLOCK_NAME [--current] [--target] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations slots list

```text
NAME
    gcloud alpha compute reservations slots list - list Compute Engine
        reservation slots

SYNOPSIS
    gcloud alpha compute reservations slots list RESERVATION
        --block-name=BLOCK_NAME --sub-block-name=SUB_BLOCK_NAME [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/slots (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

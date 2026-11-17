---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/blocks
---

# gcloud compute reservations blocks

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute reservations blocks describe

```text
NAME
    gcloud compute reservations blocks describe - describe a Compute Engine
        reservation block

SYNOPSIS
    gcloud compute reservations blocks describe RESERVATION
        --block-name=BLOCK_NAME
        [--full-view=FULL_VIEW; default="BLOCK_VIEW_UNSPECIFIED"] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Compute Engine reservation block.

EXAMPLES
    To describe a reservation block in reservation my-reservation in my-zone
    with block name my-reservation-block-0001, run:

        $ gcloud compute reservations blocks describe my-reservation \
            --zone=my-zone --block-name=my-reservation-block-0001

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to describe.

REQUIRED FLAGS
     --block-name=BLOCK_NAME
        The name of the reservation block.

OPTIONAL FLAGS
     --full-view=FULL_VIEW; default="BLOCK_VIEW_UNSPECIFIED"
        The view type for the reservation block. FULL_VIEW must be one of:

         BLOCK_VIEW_BASIC
            Basic default view of the reservation block.
         BLOCK_VIEW_FULL
            Full detailed view of the reservation block.

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

        $ gcloud alpha compute reservations blocks describe

        $ gcloud beta compute reservations blocks describe
```

### gcloud compute reservations blocks list

```text
NAME
    gcloud compute reservations blocks list - list Compute Engine reservation
        blocks

SYNOPSIS
    gcloud compute reservations blocks list RESERVATION [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute reservations blocks list displays all Compute Engine
    reservation blocks in a densely deployed reservation.

EXAMPLES
    To list all reservation blocks in a densely deployed reservation in table
    form, run:

        $ gcloud compute reservations blocks list my-reservation \
            --zone=us-central1-a --project=my-project

    To list the URIs of all reservation blocks in a densely deployed
    reservation, run:

        $ gcloud compute reservations blocks list my-reservation \
            --zone=us-central1-a --project=my-project --uri

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to operate on.

FLAGS
     --zone=ZONE
        Zone of the reservation to operate on. If not specified and the
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

        $ gcloud alpha compute reservations blocks list

        $ gcloud beta compute reservations blocks list
```

### gcloud compute reservations blocks perform-maintenance

```text
NAME
    gcloud compute reservations blocks perform-maintenance - perform
        maintenance on a reservation block within a reservation

SYNOPSIS
    gcloud compute reservations blocks perform-maintenance RESERVATION
        --block-name=BLOCK_NAME [--scope=SCOPE] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Perform maintenance on a reservation block within a reservation.

EXAMPLES
    To perform maintenance on a reservation block in reservation my-reservation
    in my-zone with block name my-reservation-block-0001 with scope all, run:

        $ gcloud compute reservations blocks perform-maintenance \
            my-reservation --zone=my-zone \
            --block-name=my-reservation-block-0001 --scope=all

POSITIONAL ARGUMENTS
     RESERVATION
        Name of the reservation to perform-maintenance.

REQUIRED FLAGS
     --block-name=BLOCK_NAME
        The name of the reservation block.

OPTIONAL FLAGS
     --scope=SCOPE
        The maintenance scope to set for the reservation block. SCOPE must be
        one of:

         all
            Perform maintenance on all hosts in the reservation block.
         running
            Perform maintenance only on the hosts in the reservation block that
            have running VMs.
         unused
            Perform maintenance only on the hosts in the reservation block that
            don't have running VMs.

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

        $ gcloud alpha compute reservations blocks perform-maintenance

        $ gcloud beta compute reservations blocks perform-maintenance
```

### gcloud compute reservations blocks set-iam-policy

```text
NAME
    gcloud compute reservations blocks set-iam-policy - set the IAM policy for
        a Compute Engine reservation block

SYNOPSIS
    gcloud compute reservations blocks set-iam-policy
        (RESERVATION_BLOCK : --reservation=RESERVATION --zone=ZONE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given reservation block as defined in a JSON or
    YAML file.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for the reservation block my-reservation-block:

        $ gcloud compute reservations blocks set-iam-policy \
            my-reservation-block --reservation=my-reservation --zone=ZONE \
            policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Reservation block resource - The reservation block to set the IAM policy
     for. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument reservation_block on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESERVATION_BLOCK
          ID of the reservation block or fully qualified identifier for the
          reservation block.

          To set the reservation_block attribute:
          + provide the argument reservation_block on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --reservation=RESERVATION
          The name of the Google Compute Engine reservation.

          To set the reservation attribute:
          + provide the argument reservation_block on the command line with a
            fully specified name;
          + provide the argument --reservation on the command line.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument reservation_block on the command line with a
            fully specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    This variant is also available:

        $ gcloud beta compute reservations blocks set-iam-policy
```

### gcloud beta compute reservations blocks describe

```text
NAME
    gcloud beta compute reservations blocks describe - describe a Compute
        Engine reservation block

SYNOPSIS
    gcloud beta compute reservations blocks describe RESERVATION
        --block-name=BLOCK_NAME
        [--full-view=FULL_VIEW; default="BLOCK_VIEW_UNSPECIFIED"] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations blocks list

```text
NAME
    gcloud beta compute reservations blocks list - list Compute Engine
        reservation blocks

SYNOPSIS
    gcloud beta compute reservations blocks list RESERVATION [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations blocks perform-maintenance

```text
NAME
    gcloud beta compute reservations blocks perform-maintenance - perform
        maintenance on a reservation block within a reservation

SYNOPSIS
    gcloud beta compute reservations blocks perform-maintenance RESERVATION
        --block-name=BLOCK_NAME [--scope=SCOPE] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations blocks set-iam-policy

```text
NAME
    gcloud beta compute reservations blocks set-iam-policy - set the IAM policy
        for a Compute Engine reservation block

SYNOPSIS
    gcloud beta compute reservations blocks set-iam-policy
        (RESERVATION_BLOCK : --reservation=RESERVATION --zone=ZONE) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations blocks test-iam-permissions

```text
NAME
    gcloud beta compute reservations blocks test-iam-permissions - test IAM
        permissions for a Compute Engine reservation block

SYNOPSIS
    gcloud beta compute reservations blocks test-iam-permissions
        (RESERVATION_BLOCK : --reservation=RESERVATION --zone=ZONE)
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations blocks describe

```text
NAME
    gcloud alpha compute reservations blocks describe - describe a Compute
        Engine reservation block

SYNOPSIS
    gcloud alpha compute reservations blocks describe RESERVATION
        --block-name=BLOCK_NAME
        [--full-view=FULL_VIEW; default="BLOCK_VIEW_UNSPECIFIED"] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations blocks list

```text
NAME
    gcloud alpha compute reservations blocks list - list Compute Engine
        reservation blocks

SYNOPSIS
    gcloud alpha compute reservations blocks list RESERVATION [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations blocks perform-maintenance

```text
NAME
    gcloud alpha compute reservations blocks perform-maintenance - perform
        maintenance on a reservation block within a reservation

SYNOPSIS
    gcloud alpha compute reservations blocks perform-maintenance RESERVATION
        --block-name=BLOCK_NAME [--scope=SCOPE] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/blocks (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

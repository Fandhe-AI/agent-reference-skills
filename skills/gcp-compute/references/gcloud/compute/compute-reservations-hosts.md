---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/hosts
---

# gcloud compute reservations hosts

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute reservations hosts describe

```text
NAME
    gcloud compute reservations hosts describe - describe a Google Compute
        Engine host in a reservation

SYNOPSIS
    gcloud compute reservations hosts describe
        (HOST_NAME : --association=ASSOCIATION --zone=ZONE)
        [--reservation=RESERVATION] [--reservation-block=RESERVATION_BLOCK]
        [--reservation-subblock=RESERVATION_SUBBLOCK] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Google Compute Engine host in a reservation.

EXAMPLES
    To describe a host named my-host in reservation my-reservation and zone
    us-central1-a:

        $ gcloud compute reservations hosts describe my-host \
            --reservation=my-reservation --zone=us-central1-a

POSITIONAL ARGUMENTS
     Host resource - The name of the host to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument host_name on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HOST_NAME
          ID of the host or fully qualified identifier for the host.

          To set the host_name attribute:
          + provide the argument host_name on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --association=ASSOCIATION
          The association of the host.

          To set the association attribute:
          + provide the argument host_name on the command line with a fully
            specified name;
          + provide the argument --association on the command line;
          + Fallback for association.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument host_name on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

FLAGS
     --reservation=RESERVATION
        Name of the reservation the host is associated with.

     --reservation-block=RESERVATION_BLOCK
        Name of the reservation block the host is associated with. This
        argument requires --reservation to be specified.

     --reservation-subblock=RESERVATION_SUBBLOCK
        Name of the reservation subblock the host is associated with. This
        argument requires --reservation and --reservation-block to be
        specified.

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
    These variants are also available:

        $ gcloud alpha compute reservations hosts describe

        $ gcloud beta compute reservations hosts describe
```

### gcloud compute reservations hosts get-version

```text
NAME
    gcloud compute reservations hosts get-version - get software versions for a
        Compute Engine host in a reservation

SYNOPSIS
    gcloud compute reservations hosts get-version HOST_NAME [--async]
        [--current] [--reservation=RESERVATION]
        [--reservation-block=RESERVATION_BLOCK] [--target] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get software versions for a Compute Engine host in a reservation.

EXAMPLES
    To get software versions for a host named my-host in reservation
    my-reservation and zone us-central1-a, run:

        $ gcloud compute reservations hosts get-version my-host \
            --reservation=my-reservation --zone=us-central1-a

POSITIONAL ARGUMENTS
     HOST_NAME
        Name of the host to get version setting for.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --current
        Include current SBOM selection in the result.

     --reservation=RESERVATION
        Name of the reservation the host is associated with.

     --reservation-block=RESERVATION_BLOCK
        Name of the reservation block the host is associated with.

     --target
        Include target SBOM selection in the result.

     --zone=ZONE
        Zone of the host to get version setting for. If not specified and the
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

        $ gcloud alpha compute reservations hosts get-version

        $ gcloud beta compute reservations hosts get-version
```

### gcloud compute reservations hosts list

```text
NAME
    gcloud compute reservations hosts list - list Google Compute Engine hosts
        for a reservation

SYNOPSIS
    gcloud compute reservations hosts list [--reservation=RESERVATION]
        [--reservation-block=RESERVATION_BLOCK]
        [--reservation-subblock=RESERVATION_SUBBLOCK] [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Google Compute Engine hosts in a given project and zone, filtered by
    reservation.

EXAMPLES
    To list hosts in reservation my-reservation and zone us-central1-a:

        $ gcloud compute reservations hosts list \
            --reservation=my-reservation --zone=us-central1-a

FLAGS
     --reservation=RESERVATION
        Name of the reservation the hosts are associated with.

     --reservation-block=RESERVATION_BLOCK
        Name of the reservation block the hosts are associated with. This
        argument requires --reservation to be specified.

     --reservation-subblock=RESERVATION_SUBBLOCK
        Name of the reservation subblock the hosts are associated with. This
        argument requires --reservation and --reservation-block to be
        specified.

     Zone resource - The zone to list hosts for. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --zone on the command line with a fully
        specified name;
      * set the property compute/zone with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --zone=ZONE
        ID of the zone or fully qualified identifier for the zone.

        To set the zone attribute:
        * provide the argument --zone on the command line;
        * set the property compute/zone.

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

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute reservations hosts list

        $ gcloud beta compute reservations hosts list
```

### gcloud beta compute reservations hosts describe

```text
NAME
    gcloud beta compute reservations hosts describe - describe a Google Compute
        Engine host in a reservation

SYNOPSIS
    gcloud beta compute reservations hosts describe
        (HOST_NAME : --association=ASSOCIATION --zone=ZONE)
        [--reservation=RESERVATION] [--reservation-block=RESERVATION_BLOCK]
        [--reservation-subblock=RESERVATION_SUBBLOCK] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations hosts get-version

```text
NAME
    gcloud beta compute reservations hosts get-version - get software versions
        for a Compute Engine host in a reservation

SYNOPSIS
    gcloud beta compute reservations hosts get-version HOST_NAME [--async]
        [--current] [--reservation=RESERVATION]
        [--reservation-block=RESERVATION_BLOCK] [--target] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute reservations hosts list

```text
NAME
    gcloud beta compute reservations hosts list - list Google Compute Engine
        hosts for a reservation

SYNOPSIS
    gcloud beta compute reservations hosts list [--reservation=RESERVATION]
        [--reservation-block=RESERVATION_BLOCK]
        [--reservation-subblock=RESERVATION_SUBBLOCK] [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations hosts describe

```text
NAME
    gcloud alpha compute reservations hosts describe - describe a Google
        Compute Engine host in a reservation

SYNOPSIS
    gcloud alpha compute reservations hosts describe
        (HOST_NAME : --association=ASSOCIATION --zone=ZONE)
        [--reservation=RESERVATION] [--reservation-block=RESERVATION_BLOCK]
        [--reservation-subblock=RESERVATION_SUBBLOCK] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations hosts get-version

```text
NAME
    gcloud alpha compute reservations hosts get-version - get software versions
        for a Compute Engine host in a reservation

SYNOPSIS
    gcloud alpha compute reservations hosts get-version HOST_NAME [--async]
        [--current] [--reservation=RESERVATION]
        [--reservation-block=RESERVATION_BLOCK] [--target] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reservations hosts list

```text
NAME
    gcloud alpha compute reservations hosts list - list Google Compute Engine
        hosts for a reservation

SYNOPSIS
    gcloud alpha compute reservations hosts list [--reservation=RESERVATION]
        [--reservation-block=RESERVATION_BLOCK]
        [--reservation-subblock=RESERVATION_SUBBLOCK] [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/hosts (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

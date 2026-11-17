---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/peerings/list-routes
---

# gcloud compute networks peerings list-routes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute networks peerings list-routes

```text
NAME
    gcloud compute networks peerings list-routes - list received or advertised
        routes for a VPC network peering

SYNOPSIS
    gcloud compute networks peerings list-routes NAME --direction=DIRECTION
        --network=NETWORK --region=REGION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute networks peerings list-routes is used to list received or
    advertised routes for a VPC network peering. This includes subnetwork
    routes, static custom routes, and dynamic custom routes.

EXAMPLES
    List received routes for VPC network peering in us-central1:

        $ gcloud compute networks peerings list-routes peering-name \
            --network=network-name --region=us-central1 --direction=INCOMING

POSITIONAL ARGUMENTS
     NAME
        Name of the peering to list routes for.

REQUIRED FLAGS
     --direction=DIRECTION
        Direction of the routes to list. To list received routes, use INCOMING.
        To list advertised routes, use OUTGOING. DIRECTION must be one of:

         INCOMING
            To list received routes.
         OUTGOING
            To list advertised routes.

     --network=NETWORK
        Network of the peering.

     --region=REGION
        Region to list the routes for.

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

        $ gcloud alpha compute networks peerings list-routes

        $ gcloud beta compute networks peerings list-routes
```

### gcloud beta compute networks peerings list-routes

```text
NAME
    gcloud beta compute networks peerings list-routes - list received or
        advertised routes for a VPC network peering

SYNOPSIS
    gcloud beta compute networks peerings list-routes NAME
        --direction=DIRECTION --network=NETWORK --region=REGION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute networks peerings list-routes

```text
NAME
    gcloud alpha compute networks peerings list-routes - list received or
        advertised routes for a VPC network peering

SYNOPSIS
    gcloud alpha compute networks peerings list-routes NAME
        --direction=DIRECTION --network=NETWORK --region=REGION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/peerings/list-routes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

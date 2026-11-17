---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/list-bgp-routes
---

# gcloud compute routers list-bgp-routes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute routers list-bgp-routes

```text
NAME
    gcloud compute routers list-bgp-routes - list routes advertised and learned
        on individual BGP sessions, both pre- and post-policy evaluation

SYNOPSIS
    gcloud compute routers list-bgp-routes NAME --address-family=ADDRESS_FAMILY
        --peer=PEER --route-direction=ROUTE_DIRECTION
        [--destination-range=CIDR_RANGE] [--no-policy-applied]
        [--region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers list-bgp-routes lists routes advertised and learned
    on individual BGP sessions, both pre- and post-policy evaluation.

EXAMPLES
    To list inbound BGP routes limited to IPv4 addess family from a router
    my-router BGP peer my-bgp-peer in region us-central1, run:

        $ gcloud compute routers list-bgp-routes my-router \
          --region=us-central1 --address-family=IPV4 --peer=my-bgp-peer \
          --route-direction=INBOUND"

POSITIONAL ARGUMENTS
     NAME
        Name of the router to list.

REQUIRED FLAGS
     --address-family=ADDRESS_FAMILY
        Limit results to routes learned for this Address Family Identifier.
        ADDRESS_FAMILY must be one of:

         IPV4
            Interface with IPv4-based BGP.
         IPV6
            Interface with IPv6-based BGP.

     --peer=PEER
        Limit results to routes learned from this peer (name).

     --route-direction=ROUTE_DIRECTION
        Limit results to routes in this direction. ROUTE_DIRECTION must be one
        of:

         INBOUND
            Learned routes.
         OUTBOUND
            Advertised routes.

FLAGS
     --destination-range=CIDR_RANGE
        Limit results to prefixes.

     --policy-applied
        Routes returned are post-policy evaluation. Enabled by default, use
        --no-policy-applied to disable.

     --region=REGION
        Region of the router to list. If not specified, you might be prompted
        to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

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

        $ gcloud alpha compute routers list-bgp-routes

        $ gcloud beta compute routers list-bgp-routes
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute routers list-bgp-routes my-router \
    --region=us-central1 \
    --address-family=IPV4 \
    --peer=my-bgp-peer \
    --route-direction=INBOUND
```

### gcloud beta compute routers list-bgp-routes

```text
NAME
    gcloud beta compute routers list-bgp-routes - list routes advertised and
        learned on individual BGP sessions, both pre- and post-policy
        evaluation

SYNOPSIS
    gcloud beta compute routers list-bgp-routes NAME
        --address-family=ADDRESS_FAMILY --peer=PEER
        --route-direction=ROUTE_DIRECTION [--destination-range=CIDR_RANGE]
        [--no-policy-applied] [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers list-bgp-routes

```text
NAME
    gcloud alpha compute routers list-bgp-routes - list routes advertised and
        learned on individual BGP sessions, both pre- and post-policy
        evaluation

SYNOPSIS
    gcloud alpha compute routers list-bgp-routes NAME
        --address-family=ADDRESS_FAMILY --peer=PEER
        --route-direction=ROUTE_DIRECTION [--destination-range=CIDR_RANGE]
        [--no-policy-applied] [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example ends with a stray unmatched `"` after `--route-direction=INBOUND`; the runnable form drops it.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/list-bgp-routes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

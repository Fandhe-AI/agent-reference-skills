---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-vpn-gateways
---

# gcloud compute target-vpn-gateways

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute target-vpn-gateways create

```text
NAME
    gcloud compute target-vpn-gateways create - create a Cloud VPN Classic
        Target VPN Gateway

SYNOPSIS
    gcloud compute target-vpn-gateways create NAME --network=NETWORK
        [--description=DESCRIPTION] [--region=REGION]
        [--resource-manager-tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-vpn-gateways create is used to create a Cloud VPN
    Classic Target VPN Gateway. A Target VPN Gateway can reference one or more
    VPN tunnels that connect it to the remote tunnel endpoint. A Target VPN
    Gateway may also be referenced by one or more forwarding rules that define
    which packets the gateway is responsible for routing.

POSITIONAL ARGUMENTS
     NAME
        Name of the Target VPN Gateway to create.

REQUIRED FLAGS
     --network=NETWORK
        A reference to a network in this project to contain the VPN Gateway.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional, textual description for the target VPN Gateway.

     --region=REGION
        Region of the Target VPN Gateway to create. If not specified, you might
        be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

     --resource-manager-tags=[KEY=VALUE,...]
        A comma-separated list of Resource Manager tags to apply to the target
        VPN gateway.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-vpn-gateways create

        $ gcloud beta compute target-vpn-gateways create
```

### gcloud compute target-vpn-gateways delete

```text
NAME
    gcloud compute target-vpn-gateways delete - delete Cloud VPN Classic Target
        VPN Gateways

SYNOPSIS
    gcloud compute target-vpn-gateways delete NAME [NAME ...] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-vpn-gateways delete deletes one or more Compute
    Engine Cloud VPN Classic Target VPN Gateways.

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the Target VPN Gateways to delete.

FLAGS
     --region=REGION
        Region of the Target VPN Gateways to delete. If not specified, you
        might be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-vpn-gateways delete

        $ gcloud beta compute target-vpn-gateways delete
```

### gcloud compute target-vpn-gateways describe

```text
NAME
    gcloud compute target-vpn-gateways describe - describe a Compute Engine
        Cloud VPN Classic Target VPN Gateway

SYNOPSIS
    gcloud compute target-vpn-gateways describe NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-vpn-gateways describe displays all data associated
    with a Compute Engine Cloud VPN Target VPN Gateway in a project.

POSITIONAL ARGUMENTS
     NAME
        Name of the Target VPN Gateway to describe.

FLAGS
     --region=REGION
        Region of the Target VPN Gateway to describe. If not specified, you
        might be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-vpn-gateways describe

        $ gcloud beta compute target-vpn-gateways describe
```

### gcloud compute target-vpn-gateways list

```text
NAME
    gcloud compute target-vpn-gateways list - list Google Compute Engine Cloud
        VPN Classic Target VPN Gateways

SYNOPSIS
    gcloud compute target-vpn-gateways list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-vpn-gateways list displays all Google Compute Engine
    Cloud VPN Classic Target VPN Gateways in a project.

    By default, Cloud VPN Classic Target VPN Gateways from all regions are
    listed. The results can be narrowed down using a filter: --filter="region:(
    REGION ... )".

EXAMPLES
    To list all Cloud VPN Classic Target VPN Gateways in a project in table
    form, run:

        $ gcloud compute target-vpn-gateways list

    To list the URIs of all Cloud VPN Classic Target VPN Gateways in a project,
    run:

        $ gcloud compute target-vpn-gateways list --uri

    To list all Cloud VPN Classic Target VPN Gateways in the us-central1 and
    europe-west1 regions, run:

        $ gcloud compute target-vpn-gateways list \
            --filter="region:( us-central1 europe-west1 )"

POSITIONAL ARGUMENTS
     [NAME ...]
        (DEPRECATED) If provided, show details for the specified names and/or
        URIs of resources.

        Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )"
        instead.

FLAGS
     --regexp=REGEXP, -r REGEXP
        (DEPRECATED) Regular expression to filter the names of the results on.
        Any names that do not match the entire regular expression will be
        filtered out.

        Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.

     --regions=REGION,[REGION,...]
        If provided, only resources from the given regions are queried.

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

        $ gcloud alpha compute target-vpn-gateways list

        $ gcloud beta compute target-vpn-gateways list
```

### gcloud beta compute target-vpn-gateways create

```text
NAME
    gcloud beta compute target-vpn-gateways create - create a Cloud VPN Classic
        Target VPN Gateway

SYNOPSIS
    gcloud beta compute target-vpn-gateways create NAME --network=NETWORK
        [--description=DESCRIPTION] [--region=REGION]
        [--resource-manager-tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-vpn-gateways delete

```text
NAME
    gcloud beta compute target-vpn-gateways delete - delete Cloud VPN Classic
        Target VPN Gateways

SYNOPSIS
    gcloud beta compute target-vpn-gateways delete NAME [NAME ...]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-vpn-gateways describe

```text
NAME
    gcloud beta compute target-vpn-gateways describe - describe a Compute
        Engine Cloud VPN Classic Target VPN Gateway

SYNOPSIS
    gcloud beta compute target-vpn-gateways describe NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-vpn-gateways list

```text
NAME
    gcloud beta compute target-vpn-gateways list - list Google Compute Engine
        Cloud VPN Classic Target VPN Gateways

SYNOPSIS
    gcloud beta compute target-vpn-gateways list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-vpn-gateways update

```text
NAME
    gcloud beta compute target-vpn-gateways update - update a Compute Engine
        Cloud VPN Classic Target VPN Gateway

SYNOPSIS
    gcloud beta compute target-vpn-gateways update NAME [--region=REGION]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-vpn-gateways config export

```text
NAME
    gcloud alpha compute target-vpn-gateways config export - export the
        configuration for a Compute Engine target vpn gateway

SYNOPSIS
    gcloud alpha compute target-vpn-gateways config export
        ([TARGET_VPN_GATEWAY : --region=REGION] --all)
        [--path=PATH; default="-"] [--resource-format=RESOURCE_FORMAT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-vpn-gateways create

```text
NAME
    gcloud alpha compute target-vpn-gateways create - create a Cloud VPN
        Classic Target VPN Gateway

SYNOPSIS
    gcloud alpha compute target-vpn-gateways create NAME --network=NETWORK
        [--description=DESCRIPTION] [--region=REGION]
        [--resource-manager-tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-vpn-gateways delete

```text
NAME
    gcloud alpha compute target-vpn-gateways delete - delete Cloud VPN Classic
        Target VPN Gateways

SYNOPSIS
    gcloud alpha compute target-vpn-gateways delete NAME [NAME ...]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-vpn-gateways describe

```text
NAME
    gcloud alpha compute target-vpn-gateways describe - describe a Compute
        Engine Cloud VPN Classic Target VPN Gateway

SYNOPSIS
    gcloud alpha compute target-vpn-gateways describe NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-vpn-gateways list

```text
NAME
    gcloud alpha compute target-vpn-gateways list - list Google Compute Engine
        Cloud VPN Classic Target VPN Gateways

SYNOPSIS
    gcloud alpha compute target-vpn-gateways list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-vpn-gateways test-iam-permissions

```text
NAME
    gcloud alpha compute target-vpn-gateways test-iam-permissions - test IAM
        permissions for a Compute Engine target VPN gateway

SYNOPSIS
    gcloud alpha compute target-vpn-gateways test-iam-permissions
        (TARGET_VPN_GATEWAY : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-vpn-gateways update

```text
NAME
    gcloud alpha compute target-vpn-gateways update - update a Compute Engine
        Cloud VPN Classic Target VPN Gateway

SYNOPSIS
    gcloud alpha compute target-vpn-gateways update NAME [--region=REGION]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute target-vpn-gateways list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute target-vpn-gateways list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-vpn-gateways (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/vpn-gateways
---

# gcloud compute vpn-gateways

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute vpn-gateways create

```text
NAME
    gcloud compute vpn-gateways create - create a new Compute Engine Highly
        Available VPN gateway

SYNOPSIS
    gcloud compute vpn-gateways create NAME --network=NETWORK
        [--description=DESCRIPTION] [--gateway-ip-version=GATEWAY_IP_VERSION]
        [--interconnect-attachments=[INTERCONNECT_ATTACHMENTS,...]]
        [--region=REGION] [--resource-manager-tags=[KEY=VALUE,...]]
        [--stack-type=STACK_TYPE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute vpn-gateways create creates a new Highly Available VPN
    gateway.

    Highly Available VPN Gateway provides a means to create a VPN solution with
    a higher availability SLA compared to Classic Target VPN Gateway. Highly
    Available VPN gateways are simply referred to as VPN gateways in the API
    documentation and gcloud commands. A VPN Gateway can reference one or more
    VPN tunnels that connect it to external VPN gateways or Cloud VPN Gateways.

EXAMPLES
    To create a VPN gateway, run:

        $ gcloud compute vpn-gateways create my-vpn-gateway \
          --region=us-central1 --network=default

POSITIONAL ARGUMENTS
     NAME
        Name of the VPN Gateway to create.

REQUIRED FLAGS
     --network=NETWORK
        A reference to a network to which the VPN gateway is attached.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional, textual description for the VPN gateway.

     --gateway-ip-version=GATEWAY_IP_VERSION
        IP version of the HA VPN gateway. You must specify either IPv4 or IPv6.
        If you do not specify this field, every HA VPN gateway interface will
        be configured with an IPv4 address. GATEWAY_IP_VERSION must be one of:

         IPV4
            Every HA-VPN gateway interface is configured with an IPv4 address.
         IPV6
            Every HA-VPN gateway interface is configured with an IPv6 address.

     --interconnect-attachments=[INTERCONNECT_ATTACHMENTS,...]
        Names of interconnect attachments (VLAN attachments) associated with
        the VPN gateway interfaces. You must specify this field when using a
        VPN gateway for HA VPN over Cloud Interconnect. Otherwise, this field
        is optional.

        For example, --interconnect-attachments
        attachment-a-zone1,attachment-a-zone2 associates VPN gateway with
        attachment from zone1 on interface 0 and with attachment from zone2 on
        interface 1.

     --region=REGION
        Region of the VPN Gateway to create. If not specified, you might be
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

     --resource-manager-tags=[KEY=VALUE,...]
        A comma-separated list of Resource Manager tags to apply to the VPN
        gateway.

     --stack-type=STACK_TYPE
        The stack type of the protocol(s) enabled on this VPN gateway. If not
        provided, IPV4_ONLY will be used. STACK_TYPE must be one of:

         IPV4_IPV6
            Both IPv4 and IPv6 protocols are enabled on this VPN gateway.
         IPV4_ONLY
            Only IPv4 protocol is enabled on this VPN gateway.
         IPV6_ONLY
            Only IPv6 protocol is enabled on this VPN gateway.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute vpn-gateways create

        $ gcloud beta compute vpn-gateways create
```

### gcloud compute vpn-gateways delete

```text
NAME
    gcloud compute vpn-gateways delete - delete Compute Engine Highly Available
        VPN Gateways

SYNOPSIS
    gcloud compute vpn-gateways delete NAME [NAME ...] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute vpn-gateways delete is used to delete one or more Compute
    Engine Highly Available VPN Gateways. VPN Gateways can only be deleted when
    no VPN tunnels refer to them.

    Highly Available VPN Gateway provides a means to create a VPN solution with
    a higher availability SLA compared to Classic Target VPN Gateway. Highly
    Available VPN gateways are simply referred to as VPN gateways in the API
    documentation and gcloud commands. A VPN Gateway can reference one or more
    VPN tunnels that connect it to external VPN gateways or Cloud VPN Gateways.

EXAMPLES
    To delete a VPN gateway, run:

        $ gcloud compute vpn-gateways delete my-gateway --region=us-central1

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the VPN Gateways to delete.

FLAGS
     --region=REGION
        Region of the VPN Gateways to delete. If not specified, you might be
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute vpn-gateways delete

        $ gcloud beta compute vpn-gateways delete
```

### gcloud compute vpn-gateways describe

```text
NAME
    gcloud compute vpn-gateways describe - describe a Compute Engine Highly
        Available VPN Gateway

SYNOPSIS
    gcloud compute vpn-gateways describe NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute vpn-gateways describe is used to display all data associated
    with a Compute Engine Highly Available VPN Gateway in a project.

    Highly Available VPN Gateway provides a means to create a VPN solution with
    a higher availability SLA compared to Classic Target VPN Gateway. Highly
    Available VPN gateways are simply referred to as VPN gateways in the API
    documentation and gcloud commands. A VPN Gateway can reference one or more
    VPN tunnels that connect it to external VPN gateways or Cloud VPN Gateways.

EXAMPLES
    To describe a VPN gateway, run:

        $ gcloud compute vpn-gateways describe my-gateway \
          --region=us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the VPN Gateway to describe.

FLAGS
     --region=REGION
        Region of the VPN Gateway to describe. If not specified, you might be
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute vpn-gateways describe

        $ gcloud beta compute vpn-gateways describe
```

### gcloud compute vpn-gateways get-status

```text
NAME
    gcloud compute vpn-gateways get-status - get status of a Compute Engine
        Highly Available VPN Gateway

SYNOPSIS
    gcloud compute vpn-gateways get-status NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute vpn-gateways get-status is used to display high availability
    configuration status for the Cloud VPN gateway, the command will show you
    the high availability configuration status for VPN tunnels associated with
    each peer gateway to which the Cloud VPN gateway is connected; the peer
    gateway could be either a Cloud VPN gateway or an external VPN gateway.

EXAMPLES
    To get status of a VPN gateway, run:

        $ gcloud compute vpn-gateways get-status my-gateway \
          --region=us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the VPN Gateway to describe.

FLAGS
     --region=REGION
        Region of the VPN Gateway to describe. If not specified, you might be
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute vpn-gateways get-status

        $ gcloud beta compute vpn-gateways get-status
```

### gcloud compute vpn-gateways list

```text
NAME
    gcloud compute vpn-gateways list - list Google Compute Engine Highly
        Available VPN Gateways

SYNOPSIS
    gcloud compute vpn-gateways list [NAME ...] [--regexp=REGEXP, -r REGEXP]
        [--regions=REGION,[REGION,...]] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute vpn-gateways list displays all Google Compute Engine Highly
    Available VPN Gateways in a project.

    By default, Highly Available VPN Gateways from all regions are listed. The
    results can be narrowed down using a filter: --filter="region:( REGION ...
    )".

EXAMPLES
    To list all Highly Available VPN Gateways in a project in table form, run:

        $ gcloud compute vpn-gateways list

    To list the URIs of all Highly Available VPN Gateways in a project, run:

        $ gcloud compute vpn-gateways list --uri

    To list all Highly Available VPN Gateways in the us-central1 and
    europe-west1 regions, run:

        $ gcloud compute vpn-gateways list \
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

        $ gcloud alpha compute vpn-gateways list

        $ gcloud beta compute vpn-gateways list
```

### gcloud compute vpn-gateways test-iam-permissions

```text
NAME
    gcloud compute vpn-gateways test-iam-permissions - test IAM permissions for
        a Compute Engine VPN gateway

SYNOPSIS
    gcloud compute vpn-gateways test-iam-permissions
        (VPN_GATEWAY : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns permissions that a caller has on the specified Compute Engine VPN
    gateway.

EXAMPLES
    To test if the caller has 'compute.vpnGateways.get' permission on a VPN
    gateway, run:

        $ gcloud compute vpn-gateways test-iam-permissions my-vpn-gateway \
            --region=us-central1 --permissions=compute.vpnGateways.get

POSITIONAL ARGUMENTS
     VPN gateway resource - VPN gateway you want to test the IAM permissions
     of. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument vpn_gateway on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VPN_GATEWAY
          ID of the VPN gateway or fully qualified identifier for the VPN
          gateway.

          To set the vpn_gateway attribute:
          + provide the argument vpn_gateway on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument vpn_gateway on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

REQUIRED FLAGS
     --permissions=[PERMISSIONS,...]
        Permissions to be tested.

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

        $ gcloud alpha compute vpn-gateways test-iam-permissions

        $ gcloud beta compute vpn-gateways test-iam-permissions
```

### gcloud compute vpn-gateways update

```text
NAME
    gcloud compute vpn-gateways update - update a Compute Engine Highly
        Available VPN gateway

SYNOPSIS
    gcloud compute vpn-gateways update NAME [--region=REGION]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute vpn-gateways update updates labels for a Compute Engine
    Highly Available VPN gateway.

    For example:

        $ gcloud compute vpn-gateways update example-gateway \
            --region us-central1 \
          --update-labels=k0=value1,k1=value2 --remove-labels=k3

    will add/update labels k0 and k1 and remove labels with key k3.

    Labels can be used to identify the VPN gateway and to filter them as in

        $ gcloud compute vpn-gateways list --filter='labels.k1:value2'

    To list existing labels

        $ gcloud compute vpn-gateways describe example-gateway \
            --format="default(labels)"

EXAMPLES
    To update labels for a VPN gateway, run:

        $ gcloud compute vpn-gateways update my-gateway \
          --region=us-central1 --update-labels=k0=value1,k1=value2

POSITIONAL ARGUMENTS
     NAME
        Name of the VPN Gateway to update.

FLAGS
     --region=REGION
        Region of the VPN Gateway to update. If not specified, you might be
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

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud compute vpn-gateways update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud compute vpn-gateways update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute vpn-gateways update

        $ gcloud beta compute vpn-gateways update
```

### gcloud beta compute vpn-gateways create

```text
NAME
    gcloud beta compute vpn-gateways create - create a new Compute Engine
        Highly Available VPN gateway

SYNOPSIS
    gcloud beta compute vpn-gateways create NAME --network=NETWORK
        [--description=DESCRIPTION] [--gateway-ip-version=GATEWAY_IP_VERSION]
        [--interconnect-attachments=[INTERCONNECT_ATTACHMENTS,...]]
        [--region=REGION] [--resource-manager-tags=[KEY=VALUE,...]]
        [--stack-type=STACK_TYPE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute vpn-gateways delete

```text
NAME
    gcloud beta compute vpn-gateways delete - delete Compute Engine Highly
        Available VPN Gateways

SYNOPSIS
    gcloud beta compute vpn-gateways delete NAME [NAME ...] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute vpn-gateways describe

```text
NAME
    gcloud beta compute vpn-gateways describe - describe a Compute Engine
        Highly Available VPN Gateway

SYNOPSIS
    gcloud beta compute vpn-gateways describe NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute vpn-gateways get-status

```text
NAME
    gcloud beta compute vpn-gateways get-status - get status of a Compute
        Engine Highly Available VPN Gateway

SYNOPSIS
    gcloud beta compute vpn-gateways get-status NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute vpn-gateways list

```text
NAME
    gcloud beta compute vpn-gateways list - list Google Compute Engine Highly
        Available VPN Gateways

SYNOPSIS
    gcloud beta compute vpn-gateways list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute vpn-gateways test-iam-permissions

```text
NAME
    gcloud beta compute vpn-gateways test-iam-permissions - test IAM
        permissions for a Compute Engine VPN gateway

SYNOPSIS
    gcloud beta compute vpn-gateways test-iam-permissions
        (VPN_GATEWAY : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute vpn-gateways update

```text
NAME
    gcloud beta compute vpn-gateways update - update a Compute Engine Highly
        Available VPN gateway

SYNOPSIS
    gcloud beta compute vpn-gateways update NAME [--region=REGION]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute vpn-gateways config export

```text
NAME
    gcloud alpha compute vpn-gateways config export - export the configuration
        for a Compute Engine vpn gateway

SYNOPSIS
    gcloud alpha compute vpn-gateways config export
        ([VPN_GATEWAY : --region=REGION] --all) [--path=PATH; default="-"]
        [--resource-format=RESOURCE_FORMAT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute vpn-gateways create

```text
NAME
    gcloud alpha compute vpn-gateways create - create a new Compute Engine
        Highly Available VPN gateway

SYNOPSIS
    gcloud alpha compute vpn-gateways create NAME --network=NETWORK
        [--description=DESCRIPTION] [--gateway-ip-version=GATEWAY_IP_VERSION]
        [--interconnect-attachments=[INTERCONNECT_ATTACHMENTS,...]]
        [--region=REGION] [--resource-manager-tags=[KEY=VALUE,...]]
        [--stack-type=STACK_TYPE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute vpn-gateways delete

```text
NAME
    gcloud alpha compute vpn-gateways delete - delete Compute Engine Highly
        Available VPN Gateways

SYNOPSIS
    gcloud alpha compute vpn-gateways delete NAME [NAME ...] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute vpn-gateways describe

```text
NAME
    gcloud alpha compute vpn-gateways describe - describe a Compute Engine
        Highly Available VPN Gateway

SYNOPSIS
    gcloud alpha compute vpn-gateways describe NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute vpn-gateways get-status

```text
NAME
    gcloud alpha compute vpn-gateways get-status - get status of a Compute
        Engine Highly Available VPN Gateway

SYNOPSIS
    gcloud alpha compute vpn-gateways get-status NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute vpn-gateways list

```text
NAME
    gcloud alpha compute vpn-gateways list - list Google Compute Engine Highly
        Available VPN Gateways

SYNOPSIS
    gcloud alpha compute vpn-gateways list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute vpn-gateways test-iam-permissions

```text
NAME
    gcloud alpha compute vpn-gateways test-iam-permissions - test IAM
        permissions for a Compute Engine VPN gateway

SYNOPSIS
    gcloud alpha compute vpn-gateways test-iam-permissions
        (VPN_GATEWAY : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute vpn-gateways update

```text
NAME
    gcloud alpha compute vpn-gateways update - update a Compute Engine Highly
        Available VPN gateway

SYNOPSIS
    gcloud alpha compute vpn-gateways update NAME [--region=REGION]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute vpn-gateways list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute vpn-gateways list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/vpn-gateways (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

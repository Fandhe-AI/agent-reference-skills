---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/external-vpn-gateways
---

# gcloud compute external-vpn-gateways

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute external-vpn-gateways create

```text
NAME
    gcloud compute external-vpn-gateways create - create a new Compute Engine
        external VPN gateway

SYNOPSIS
    gcloud compute external-vpn-gateways create NAME
        --interfaces=[ID=IP_ADDRESS,...] [--description=DESCRIPTION]
        [--resource-manager-tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute external-vpn-gateways create creates a new external VPN
    gateway.

    External VPN gateway is the on-premises VPN gateway or another cloud
    provider's VPN gateway that connects to your Google Cloud VPN gateway. To
    create a highly available VPN from Google Cloud to your on-premises side or
    another Cloud provider's VPN gateway, you must create an external VPN
    gateway resource in Google Cloud, which provides the information to Google
    Cloud about your external VPN gateway.

EXAMPLES
    To create an external VPN gateway, run:

        $ gcloud compute external-vpn-gateways create my-external-gateway \
          --interfaces=0=8.9.9.9

POSITIONAL ARGUMENTS
     NAME
        Name of the external VPN gateway to create.

REQUIRED FLAGS
     --interfaces=[ID=IP_ADDRESS,...]
        Map of interfaces from interface ID to interface IP address for the
        External VPN Gateway.

        There can be one, two, or four interfaces in the map.

        For example, to create an external VPN gateway with one interface:

            $ gcloud compute external-vpn-gateways create MY-EXTERNAL-GATEWAY \
                --interfaces 0=192.0.2.0

        To create an external VPN gateway with two interfaces: $ gcloud compute
        external-vpn-gateways create MY-EXTERNAL-GATEWAY \ --interfaces
        0=192.0.2.0,1=192.0.2.1

        To create an external VPN gateway with four interfaces: $ gcloud
        compute external-vpn-gateways create MY-EXTERNAL-GATEWAY \ --interfaces
        0=192.0.2.0,1=192.0.2.1,2=192.0.2.3,3=192.0.2.4

        To create an external VPN gateway with IPv6 addresses on four
        interfaces: $ gcloud compute external-vpn-gateways create
        MY-EXTERNAL-GATEWAY \ --interfaces \
        0=2001:db8::1,1=2001:db8::2,2=2001:db8::3,3=2001:db8::4

        Note that the redundancy type of the gateway will be automatically
        inferred based on the number of interfaces provided:

            1 interface: `SINGLE_IP_INTERNALLY_REDUNDANT`

            2 interfaces: `TWO_IPS_REDUNDANCY`

            4 interfaces: `FOUR_IPS_REDUNDANCY`

OPTIONAL FLAGS
     --description=DESCRIPTION
        Textual description of the External VPN Gateway.

     --resource-manager-tags=[KEY=VALUE,...]
        A comma-separated list of Resource Manager tags to apply to the
        external VPN gateway.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute external-vpn-gateways create

        $ gcloud beta compute external-vpn-gateways create
```

### gcloud compute external-vpn-gateways delete

```text
NAME
    gcloud compute external-vpn-gateways delete - delete a Compute Engine
        external VPN gateway

SYNOPSIS
    gcloud compute external-vpn-gateways delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute external-vpn-gateways delete is used to delete all data
    associated with a Compute Engine external VPN gateway in a project.

    An external VPN gateway provides the information to Google Cloud about your
    on-premises side or another Cloud provider's VPN gateway.

EXAMPLES
    To delete an external VPN gateway, run:

        $ gcloud compute external-vpn-gateways delete my-external-gateway

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the external VPN gateways to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute external-vpn-gateways delete

        $ gcloud beta compute external-vpn-gateways delete
```

### gcloud compute external-vpn-gateways describe

```text
NAME
    gcloud compute external-vpn-gateways describe - describe a Compute Engine
        external VPN gateway

SYNOPSIS
    gcloud compute external-vpn-gateways describe NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute external-vpn-gateways describe is used to display all data
    associated with a Compute Engine external VPN gateway in a project.

    An external VPN gateway provides the information to Google Cloud about your
    on-premises side or another Cloud provider's VPN gateway.

EXAMPLES
    To describe an external VPN gateway, run:

        $ gcloud compute external-vpn-gateways describe my-external-gateway

POSITIONAL ARGUMENTS
     NAME
        Name of the external VPN gateway to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute external-vpn-gateways describe

        $ gcloud beta compute external-vpn-gateways describe
```

### gcloud compute external-vpn-gateways list

```text
NAME
    gcloud compute external-vpn-gateways list - list Google Compute Engine
        external VPN gateways

SYNOPSIS
    gcloud compute external-vpn-gateways list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute external-vpn-gateways list displays all Google Compute
    Engine external VPN gateways in a project.

EXAMPLES
    To list all external VPN gateways in a project in table form, run:

        $ gcloud compute external-vpn-gateways list

    To list the URIs of all external VPN gateways in a project, run:

        $ gcloud compute external-vpn-gateways list --uri

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

        $ gcloud alpha compute external-vpn-gateways list

        $ gcloud beta compute external-vpn-gateways list
```

### gcloud compute external-vpn-gateways test-iam-permissions

```text
NAME
    gcloud compute external-vpn-gateways test-iam-permissions - test IAM
        permissions for a Compute Engine external VPN gateway

SYNOPSIS
    gcloud compute external-vpn-gateways test-iam-permissions NAME
        --permissions=[PERMISSION,...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute external-vpn-gateways test-iam-permissions tests the IAM
    permissions that a caller has on a Compute Engine external VPN gateway.

    An external VPN gateway provides the information to Google Cloud about your
    on-premises side or another Cloud provider's VPN gateway.

EXAMPLES
    To test whether the caller has the 'compute.externalVpnGateways.setLabels'
    permission on an external VPN gateway, run:

        $ gcloud compute external-vpn-gateways test-iam-permissions \
          my-external-gateway \
          --permissions=compute.externalVpnGateways.setLabels

POSITIONAL ARGUMENTS
     NAME
        Name of the external VPN gateway to test IAM permissions for.

REQUIRED FLAGS
     --permissions=[PERMISSION,...]
        Set of permissions to check for the resource.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute external-vpn-gateways test-iam-permissions

        $ gcloud beta compute external-vpn-gateways test-iam-permissions
```

### gcloud compute external-vpn-gateways update

```text
NAME
    gcloud compute external-vpn-gateways update - update a Compute Engine
        external VPN gateway

SYNOPSIS
    gcloud compute external-vpn-gateways update NAME
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute external-vpn-gateways update updates labels for a Compute
    Engine external VPN gateway. For example:

        $ gcloud compute external-vpn-gateways update example-gateway \
          --update-labels=k0=value1,k1=value2 --remove-labels=k3

    will add/update labels k0 and k1 and remove labels with key k3.

    Labels can be used to identify the External VPN gateway and to filter them
    as in

        $ gcloud compute external-vpn-gateways list \
            --filter='labels.k1:value2'

    To list existing labels

        $ gcloud compute external-vpn-gateways describe example-gateway \
            --format="default(labels)"

EXAMPLES
    To update labels for an external VPN gateway, run:

        $ gcloud compute external-vpn-gateways update my-external-gateway \
          --update-labels=k0=value1,k1=value2

POSITIONAL ARGUMENTS
     NAME
        Name of the external VPN gateway to update.

FLAGS
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

              $ gcloud compute external-vpn-gateways update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud compute external-vpn-gateways update --clear-labels \
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

        $ gcloud alpha compute external-vpn-gateways update

        $ gcloud beta compute external-vpn-gateways update
```

### gcloud beta compute external-vpn-gateways create

```text
NAME
    gcloud beta compute external-vpn-gateways create - create a new Compute
        Engine external VPN gateway

SYNOPSIS
    gcloud beta compute external-vpn-gateways create NAME
        --interfaces=[ID=IP_ADDRESS,...] [--description=DESCRIPTION]
        [--resource-manager-tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute external-vpn-gateways delete

```text
NAME
    gcloud beta compute external-vpn-gateways delete - delete a Compute Engine
        external VPN gateway

SYNOPSIS
    gcloud beta compute external-vpn-gateways delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute external-vpn-gateways describe

```text
NAME
    gcloud beta compute external-vpn-gateways describe - describe a Compute
        Engine external VPN gateway

SYNOPSIS
    gcloud beta compute external-vpn-gateways describe NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute external-vpn-gateways list

```text
NAME
    gcloud beta compute external-vpn-gateways list - list Google Compute Engine
        external VPN gateways

SYNOPSIS
    gcloud beta compute external-vpn-gateways list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute external-vpn-gateways test-iam-permissions

```text
NAME
    gcloud beta compute external-vpn-gateways test-iam-permissions - test IAM
        permissions for a Compute Engine external VPN gateway

SYNOPSIS
    gcloud beta compute external-vpn-gateways test-iam-permissions NAME
        --permissions=[PERMISSION,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute external-vpn-gateways update

```text
NAME
    gcloud beta compute external-vpn-gateways update - update a Compute Engine
        external VPN gateway

SYNOPSIS
    gcloud beta compute external-vpn-gateways update NAME
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute external-vpn-gateways create

```text
NAME
    gcloud alpha compute external-vpn-gateways create - create a new Compute
        Engine external VPN gateway

SYNOPSIS
    gcloud alpha compute external-vpn-gateways create NAME
        --interfaces=[ID=IP_ADDRESS,...] [--description=DESCRIPTION]
        [--resource-manager-tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute external-vpn-gateways delete

```text
NAME
    gcloud alpha compute external-vpn-gateways delete - delete a Compute Engine
        external VPN gateway

SYNOPSIS
    gcloud alpha compute external-vpn-gateways delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute external-vpn-gateways describe

```text
NAME
    gcloud alpha compute external-vpn-gateways describe - describe a Compute
        Engine external VPN gateway

SYNOPSIS
    gcloud alpha compute external-vpn-gateways describe NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute external-vpn-gateways list

```text
NAME
    gcloud alpha compute external-vpn-gateways list - list Google Compute
        Engine external VPN gateways

SYNOPSIS
    gcloud alpha compute external-vpn-gateways list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute external-vpn-gateways test-iam-permissions

```text
NAME
    gcloud alpha compute external-vpn-gateways test-iam-permissions - test IAM
        permissions for a Compute Engine external VPN gateway

SYNOPSIS
    gcloud alpha compute external-vpn-gateways test-iam-permissions NAME
        --permissions=[PERMISSION,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute external-vpn-gateways update

```text
NAME
    gcloud alpha compute external-vpn-gateways update - update a Compute Engine
        external VPN gateway

SYNOPSIS
    gcloud alpha compute external-vpn-gateways update NAME
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/external-vpn-gateways (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

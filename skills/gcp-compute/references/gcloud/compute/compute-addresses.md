---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/addresses
---

# gcloud compute addresses

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute addresses create

```text
NAME
    gcloud compute addresses create - reserve IP addresses

SYNOPSIS
    gcloud compute addresses create [NAME ...] [--description=DESCRIPTION]
        [--endpoint-type=ENDPOINT_TYPE] [--network=NETWORK]
        [--network-tier=NETWORK_TIER] [--prefix-length=PREFIX_LENGTH]
        [--purpose=PURPOSE] [--subnet=SUBNET]
        [--addresses=ADDRESS,[ADDRESS,...] | --ip-version=IP_VERSION]
        [--global | --region=REGION]
        [--internal-range=INTERNAL_RANGE | --ip-collection=IP_COLLECTION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute addresses create is used to reserve one or more IP
    addresses. Once an IP address is reserved, it will be associated with the
    project until it is released using 'gcloud compute addresses delete'.
    Ephemeral IP addresses that are in use by resources in the project can be
    reserved using the '--addresses' flag.

EXAMPLES
    To reserve three IP addresses in the 'us-central1' region, run:

        $ gcloud compute addresses create address-1 address-2 address-3 \
            --region=us-central1

    To reserve ephemeral IP addresses '162.222.181.198' and '23.251.146.189'
    which are being used by virtual machine instances in the 'us-central1'
    region, run:

        $ gcloud compute addresses create \
            --addresses=162.222.181.198,23.251.146.189 --region=us-central1

    In the above invocation, the two addresses will be assigned random names.

    To reserve an IP address named subnet-address-1 from the subnet 'default'
    in the 'us-central1' region, run:

        $ gcloud compute addresses create subnet-address-1 \
            --region=us-central1 --subnet=default

    To reserve an IP range '10.110.0.0/16' from the network 'default' for
    'VPC_PEERING', run:

        $ gcloud compute addresses create ip-range-1 --global \
            --addresses=10.110.0.0 --prefix-length=16 \
            --purpose=VPC_PEERING --network=default

    To reserve any IP range with prefix length '16' from the network 'default'
    for 'VPC_PEERING', run:

        $ gcloud compute addresses create ip-range-1 --global \
            --prefix-length=16 --purpose=VPC_PEERING --network=default

    To reserve an address from network 'default' for PRIVATE_SERVICE_CONNECT,
    run:

        $ gcloud compute addresses create psc-address-1 --global \
            --addresses=10.110.0.10 --purpose=PRIVATE_SERVICE_CONNECT \
            --network=default

POSITIONAL ARGUMENTS
     [NAME ...]
        Names of the addresses to create.

FLAGS
     --description=DESCRIPTION
        An optional textual description for the addresses.

     --endpoint-type=ENDPOINT_TYPE
        The endpoint type of the external IPv6 address to be reserved.
        ENDPOINT_TYPE must be one of: VM, NETLB.

     --network=NETWORK
        If specified, the network resource in which the address(es) should be
        reserved.

        This is only available for global internal address, which represents an
        internal IP range reservation from within the network.

     --network-tier=NETWORK_TIER
        The network tier to assign to the reserved IP addresses. NETWORK_TIER
        must be one of: PREMIUM, STANDARD. The default value is PREMIUM.

        While regional external addresses (--region specified, --subnet
        omitted) can use either PREMIUM or STANDARD, global external addresses
        (--global specified, --subnet omitted) can only use PREMIUM. Internal
        addresses can only use PREMIUM.

     --prefix-length=PREFIX_LENGTH
        The prefix length of the IP range. If the address is an IPv4 address,
        it must be a value between 8 and 30 inclusive. If the address is an
        IPv6 address, the only allowed value is 96. If not present, it means
        the address field is a single IP address.

        This field is not applicable to external IPv4 addresses or global IPv6
        addresses.

     --purpose=PURPOSE
        The purpose of the address resource. This field is not applicable to
        external addresses. PURPOSE must be one of: VPC_PEERING,
        SHARED_LOADBALANCER_VIP, GCE_ENDPOINT, IPSEC_INTERCONNECT,
        PRIVATE_SERVICE_CONNECT.

     --subnet=SUBNET
        If specified, the subnet name in which the address(es) should be
        reserved. The subnet must be in the same region as the address.

        The address will represent an internal IP reservation from within the
        subnet. If --address is specified, it must be within the subnet's IP
        range.

        May not be specified with --global.

     At most one of these can be specified:

       --addresses=ADDRESS,[ADDRESS,...]
          Ephemeral IP addresses to promote to reserved status. Only addresses
          that are being used by resources in the project can be promoted. When
          providing this flag, a parallel list of names for the addresses can
          be provided. For example,

              $ gcloud compute addresses create ADDRESS-1 ADDRESS-2             \
                --addresses 162.222.181.197,162.222.181.198             \
                --region us-central1

          will result in 162.222.181.197 being reserved as 'ADDRESS-1' and
          162.222.181.198 as 'ADDRESS-2'. If no names are given,
          server-generated names will be assigned to the IP addresses.

       --ip-version=IP_VERSION
          Version of the IP address to be allocated and reserved. The default
          is IPV4.

          IP version can only be specified for global addresses that are
          generated automatically (i.e., along with the --global flag, given
          --addresses is not specified) and if the --network-tier is PREMIUM.

          IP_VERSION must be one of: IPV4, IPV6.

     At most one of these can be specified:

       --global
          If set, the addresses are global.

       --region=REGION
          Region of the addresses to create. Overrides the default
          compute/region property value for this command invocation.

     At most one of these can be specified:

       --internal-range=INTERNAL_RANGE
          If specified, the internal range from which to allocate the global
          internal IP address.

       --ip-collection=IP_COLLECTION
          If specified, the public delegated prefix (PDP) from which to
          allocate the BYOIP IP address. If an IPv4 PDP is used, the PDP must
          support enhanced IPv4 allocations. If an IPv6 PDP is used, the PDP
          must be in EXTERNAL_IPV6_FORWARDING_RULE_CREATION mode. If not
          specified, the address will be allocated from the Google-owned IP
          pool.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute addresses create

        $ gcloud beta compute addresses create
```

### gcloud compute addresses delete

```text
NAME
    gcloud compute addresses delete - release reserved IP addresses

SYNOPSIS
    gcloud compute addresses delete NAME [NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute addresses delete releases one or more Compute Engine IP
    addresses.

EXAMPLES
    To release an address with the name 'address-name', run:

        $ gcloud compute addresses delete address-name

    To release two addresses with the names 'address-name1' and
    'address-name2', run:

        $ gcloud compute addresses delete address-name1 address-name2

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the addresses to delete.

FLAGS
     At most one of these can be specified:

       --global
          If set, the addresses are global.

       --region=REGION
          Region of the addresses to delete. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute addresses delete

        $ gcloud beta compute addresses delete
```

### gcloud compute addresses describe

```text
NAME
    gcloud compute addresses describe - display detailed information about a
        reserved static address

SYNOPSIS
    gcloud compute addresses describe NAME [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute addresses describe displays all data associated with a
    reserved static address in a project.

EXAMPLES
    To get details about a global address, run:

        $ gcloud compute addresses describe my-address-name --global

    To get details about a regional address, run:

        $ gcloud compute addresses describe my-address-name \
            --region=us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the address to describe.

FLAGS
     At most one of these can be specified:

       --global
          If set, the address is global.

       --region=REGION
          Region of the address to describe. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute addresses describe

        $ gcloud beta compute addresses describe
```

### gcloud compute addresses list

```text
NAME
    gcloud compute addresses list - list addresses

SYNOPSIS
    gcloud compute addresses list [NAME ...] [--regexp=REGEXP, -r REGEXP]
        [--global | --regions=[REGION,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute addresses list lists summary information of addresses in a
    project. The --uri option can be used to display URIs instead. Users who
    want to see more data should use gcloud compute addresses describe.

    By default, global addresses and addresses from all regions are listed. The
    results can be narrowed down by providing the --regions or --global flag.

EXAMPLES
    To list all addresses in a project in table form, run:

        $ gcloud compute addresses list

    To list the URIs of all addresses in a project, run:

        $ gcloud compute addresses list --uri

    To list all of the global addresses in a project, run:

        $ gcloud compute addresses list --global

    To list all of the addresses from the us-central1 region, run:

        $ gcloud compute addresses list --filter=region:us-central1

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

     At most one of these can be specified:

       --global
          If provided, only global resources are shown.

       --regions=[REGION,...]
          If provided, only regional resources are shown. If arguments are
          provided, only resources from the given regions are shown.

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

        $ gcloud alpha compute addresses list

        $ gcloud beta compute addresses list
```

### gcloud compute addresses move

```text
NAME
    gcloud compute addresses move - move an address to another project

SYNOPSIS
    gcloud compute addresses move NAME --target-project=TARGET_PROJECT
        [--description=DESCRIPTION] [--new-name=NEW_NAME]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    The following command moves address external-ip1 in region us-central1 to
    project test-playground with new address name test-ip1:

        $ gcloud compute addresses move external-ip1 --new-name=test-ip1 \
           --target-project=test-playground --region=us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the address to operate on.

REQUIRED FLAGS
     --target-project=TARGET_PROJECT
        The target project to move address to. It can be either a project name
        or a project numerical ID. It must not be the same as the current
        project.

OPTIONAL FLAGS
     --description=DESCRIPTION
        Description of moved new address.

     --new-name=NEW_NAME
        Name of moved new address. If not specified, current address's name is
        used.

     At most one of these can be specified:

       --global
          If set, the address is global.

       --region=REGION
          Region of the address to operate on. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute addresses move

        $ gcloud beta compute addresses move
```

### gcloud compute addresses update

```text
NAME
    gcloud compute addresses update - update an address's labels

SYNOPSIS
    gcloud compute addresses update NAME [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute addresses update updates labels for a Compute Engine
    address.

EXAMPLES
    To add/update labels 'k0' and 'k1' and remove labels with key 'k3' for
    address 'example-address', run:

        $ gcloud compute addresses update example-address \
            --region=us-central1 --update-labels=k0=value1,k1=value2 \
            --remove-labels=k3

    Labels can be used to identify the address and to filter them as in:

        $ gcloud compute addresses list --filter='labels.k1:value2'

    To list existing labels for address 'example-address', run:

        $ gcloud compute addresses describe example-address \
            --format="default(labels)"

POSITIONAL ARGUMENTS
     NAME
        Name of the address to operate on.

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

              $ gcloud compute addresses update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud compute addresses update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     At most one of these can be specified:

       --global
          If set, the address is global.

       --region=REGION
          Region of the address to operate on. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute addresses update

        $ gcloud beta compute addresses update
```

### gcloud beta compute addresses create

```text
NAME
    gcloud beta compute addresses create - reserve IP addresses

SYNOPSIS
    gcloud beta compute addresses create [NAME ...] [--description=DESCRIPTION]
        [--endpoint-type=ENDPOINT_TYPE] [--network=NETWORK]
        [--network-tier=NETWORK_TIER] [--prefix-length=PREFIX_LENGTH]
        [--purpose=PURPOSE] [--subnet=SUBNET]
        [--addresses=ADDRESS,[ADDRESS,...] | --ip-version=IP_VERSION]
        [--global | --region=REGION]
        [--internal-range=INTERNAL_RANGE | --ip-collection=IP_COLLECTION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute addresses delete

```text
NAME
    gcloud beta compute addresses delete - release reserved IP addresses

SYNOPSIS
    gcloud beta compute addresses delete NAME [NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute addresses describe

```text
NAME
    gcloud beta compute addresses describe - display detailed information about
        a reserved static address

SYNOPSIS
    gcloud beta compute addresses describe NAME [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute addresses list

```text
NAME
    gcloud beta compute addresses list - list addresses

SYNOPSIS
    gcloud beta compute addresses list [NAME ...] [--regexp=REGEXP, -r REGEXP]
        [--global | --regions=[REGION,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute addresses move

```text
NAME
    gcloud beta compute addresses move - move an address to another project

SYNOPSIS
    gcloud beta compute addresses move NAME --target-project=TARGET_PROJECT
        [--description=DESCRIPTION] [--new-name=NEW_NAME]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute addresses update

```text
NAME
    gcloud beta compute addresses update - update an address's labels

SYNOPSIS
    gcloud beta compute addresses update NAME [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute addresses config export

```text
NAME
    gcloud alpha compute addresses config export - export the configuration for
        a Compute Engine address

SYNOPSIS
    gcloud alpha compute addresses config export
        ([ADDRESS : --region=REGION] --all) [--path=PATH; default="-"]
        [--resource-format=RESOURCE_FORMAT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute addresses create

```text
NAME
    gcloud alpha compute addresses create - reserve IP addresses

SYNOPSIS
    gcloud alpha compute addresses create [NAME ...]
        [--description=DESCRIPTION] [--endpoint-type=ENDPOINT_TYPE]
        [--network=NETWORK] [--network-tier=NETWORK_TIER]
        [--prefix-length=PREFIX_LENGTH] [--purpose=PURPOSE] [--subnet=SUBNET]
        [--addresses=ADDRESS,[ADDRESS,...] | --ip-version=IP_VERSION]
        [--global | --region=REGION]
        [--internal-range=INTERNAL_RANGE | --ip-collection=IP_COLLECTION]
        [--network-attachment=NETWORK_ATTACHMENT
          : --service-class-id=SERVICE_CLASS_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute addresses delete

```text
NAME
    gcloud alpha compute addresses delete - release reserved IP addresses

SYNOPSIS
    gcloud alpha compute addresses delete NAME [NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute addresses describe

```text
NAME
    gcloud alpha compute addresses describe - display detailed information
        about a reserved static address

SYNOPSIS
    gcloud alpha compute addresses describe NAME [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute addresses get-owner-instance

```text
NAME
    gcloud alpha compute addresses get-owner-instance - get the owner instance
        of a Google Compute Engine global address

SYNOPSIS
    gcloud alpha compute addresses get-owner-instance IP_ADDRESS
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute addresses list

```text
NAME
    gcloud alpha compute addresses list - list addresses

SYNOPSIS
    gcloud alpha compute addresses list [NAME ...] [--regexp=REGEXP, -r REGEXP]
        [--global | --regions=[REGION,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute addresses move

```text
NAME
    gcloud alpha compute addresses move - move an address to another project

SYNOPSIS
    gcloud alpha compute addresses move NAME --target-project=TARGET_PROJECT
        [--description=DESCRIPTION] [--new-name=NEW_NAME]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute addresses test-iam-permissions

```text
NAME
    gcloud alpha compute addresses test-iam-permissions - test IAM permissions
        for a Compute Engine address

SYNOPSIS
    gcloud alpha compute addresses test-iam-permissions NAME
        --permissions=[PERMISSION,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute addresses update

```text
NAME
    gcloud alpha compute addresses update - update an address's labels

SYNOPSIS
    gcloud alpha compute addresses update NAME
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute addresses list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/addresses (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

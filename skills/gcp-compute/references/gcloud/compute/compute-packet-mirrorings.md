---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/packet-mirrorings
---

# gcloud compute packet-mirrorings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute packet-mirrorings create

```text
NAME
    gcloud compute packet-mirrorings create - create a Compute Engine packet
        mirroring policy

SYNOPSIS
    gcloud compute packet-mirrorings create NAME --collector-ilb=COLLECTOR_ILB
        --network=NETWORK [--async] [--description=DESCRIPTION] [--no-enable]
        [--filter-cidr-ranges=[CIDR_RANGE,...]] [--filter-direction=DIRECTION]
        [--filter-protocols=[PROTOCOL,...]]
        [--mirrored-instances=[INSTANCE,...]] [--mirrored-subnets=[SUBNET,...]]
        [--mirrored-tags=[TAG,...]] [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Compute Engine packet mirroring policy.

EXAMPLES
    Mirror all tcp traffic to/from all instances in subnet my-subnet in
    us-central1, and send the mirrored traffic to the collector-fr Forwarding
    Rule.

        $ gcloud compute packet-mirrorings create my-pm \
            --network my-network --region us-central1 \
            --mirrored-subnets my-subnet --collector-ilb collector-fr \
            --filter-protocols tcp

    Mirror all traffic between instances with tag t1 and external server with
    IP 11.22.33.44 in us-central1, and send the mirrored traffic to the
    collector-fr Forwarding Rule.

        $ gcloud compute packet-mirrorings create my-pm \
            --network my-network --region us-central1 --mirrored-tags t1 \
            --collector-ilb collector-fr --filter-cidr-ranges 11.22.33.44/32

POSITIONAL ARGUMENTS
     NAME
        Name of the packet mirroring to create.

REQUIRED FLAGS
     --collector-ilb=COLLECTOR_ILB
        Forwarding rule configured as collector. This must be a regional
        forwarding rule (in the same region) with load balancing scheme
        INTERNAL and isMirroringCollector set to true.

        You can provide this as the full URL to the forwarding rule, partial
        URL, or name. For example, the following are valid values:
        * https://compute.googleapis.com/compute/v1/projects/myproject/
          regions/us-central1/forwardingRules/fr-1
        * projects/myproject/regions/us-central1/forwardingRules/fr-1
        * fr-1

     --network=NETWORK
        Network for this packet mirroring. Only the packets in this network
        will be mirrored. It is mandatory that all mirrored VMs have a network
        interface controller (NIC) in the given network. All mirrored
        subnetworks should belong to the given network.

        You can provide this as the full URL to the network, partial URL, or
        name. For example, the following are valid values:
        * https://compute.googleapis.com/compute/v1/projects/myproject/
          global/networks/network-1
        * projects/myproject/global/networks/network-1
        * network-1

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Optional, textual description for the packet mirroring.

     --enable
        Enable or disable the packet-mirroring. Enabled by default, use
        --no-enable to disable.

     --filter-cidr-ranges=[CIDR_RANGE,...]
        One or more IPv4 or IPv6 CIDR ranges that apply as filters on the
        source (ingress) or destination (egress) IP in the IP header. If no
        ranges are specified, all IPv4 traffic that matches the specified
        IPProtocols is mirrored. If neither cidrRanges nor IPProtocols is
        specified, all IPv4 traffic is mirrored. To mirror all IPv4 and IPv6
        traffic, use 0.0.0.0/0,::/0

     --filter-direction=DIRECTION
        * For ingress, only ingress traffic is mirrored.
        * For egress, only egress traffic is mirrored.
        * For both (default), both directions are mirrored. DIRECTION must be
          one of: both, egress, ingress.

     --filter-protocols=[PROTOCOL,...]
        List of IP protocols that apply as filters for packet mirroring
        traffic. If unspecified, the packet mirroring applies to all traffic.
        PROTOCOL can be one of tcp, udp, icmp, esp, ah, ipip, sctp, or an IANA
        protocol number.

     --mirrored-instances=[INSTANCE,...]
        List of instances to be mirrored. You can provide this as the full or
        valid partial URL to the instance. For example, the following are valid
        values:
        * https://compute.googleapis.com/compute/v1/projects/myproject/
          zones/us-central1-a/instances/instance-
        * projects/myproject/zones/us-central1-a/instances/instance-1

     --mirrored-subnets=[SUBNET,...]
        List of subnets to be mirrored. You can provide this as the full URL to
        the subnet, partial URL, or name. For example, the following are valid
        values:
        * https://compute.googleapis.com/compute/v1/projects/myproject/
          regions/us-central1/subnetworks/subnet-1
        * projects/myproject/regions/us-central1/subnetworks/subnet-1
        * subnet-1

     --mirrored-tags=[TAG,...]
        List of virtual machine instance tags to be mirrored.

        To read more about configuring network tags, read this guide:
        https://cloud.google.com/vpc/docs/add-remove-network-tags

        The virtual machines with the provided tags must live in zones
        contained in the same region as this packet mirroring.

     --region=REGION
        Region of the packet mirroring to create. Overrides the default
        compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute packet-mirrorings create

        $ gcloud beta compute packet-mirrorings create
```

### gcloud compute packet-mirrorings delete

```text
NAME
    gcloud compute packet-mirrorings delete - delete a Compute Engine packet
        mirroring policy

SYNOPSIS
    gcloud compute packet-mirrorings delete NAME [NAME ...] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Compute Engine Packet Mirroring policy.

EXAMPLES
    Delete the Packet Mirroring policy pm-1 in region us-central1.

        $ gcloud compute packet-mirrorings delete pm-1 --region us-central1

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the packet mirrorings to delete.

FLAGS
     --region=REGION
        Region of the packet mirrorings to delete. Overrides the default
        compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute packet-mirrorings delete

        $ gcloud beta compute packet-mirrorings delete
```

### gcloud compute packet-mirrorings describe

```text
NAME
    gcloud compute packet-mirrorings describe - describe a Compute Engine
        packet mirroring policy

SYNOPSIS
    gcloud compute packet-mirrorings describe NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Compute Engine Packet Mirroring policy.

EXAMPLES
    Describe the Packet Mirroring policy pm-1 in region us-central1.

        $ gcloud compute packet-mirrorings describe pm-1 --region us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the packet mirroring to describe.

FLAGS
     --region=REGION
        Region of the packet mirroring to describe. Overrides the default
        compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute packet-mirrorings describe

        $ gcloud beta compute packet-mirrorings describe
```

### gcloud compute packet-mirrorings list

```text
NAME
    gcloud compute packet-mirrorings list - list Google Compute Engine packet
        mirroring policies

SYNOPSIS
    gcloud compute packet-mirrorings list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute packet-mirrorings list displays all Google Compute Engine
    packet mirroring policies in a project.

    By default, packet mirroring policies from all regions are listed. The
    results can be narrowed down using a filter: --filter="region:( REGION ...
    )".

EXAMPLES
    To list all packet mirroring policies in a project in table form, run:

        $ gcloud compute packet-mirrorings list

    To list the URIs of all packet mirroring policies in a project, run:

        $ gcloud compute packet-mirrorings list --uri

    To list all packet mirroring policies in the us-central1 and europe-west1
    regions, run:

        $ gcloud compute packet-mirrorings list \
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

        $ gcloud alpha compute packet-mirrorings list

        $ gcloud beta compute packet-mirrorings list
```

### gcloud compute packet-mirrorings test-iam-permissions

```text
NAME
    gcloud compute packet-mirrorings test-iam-permissions - test IAM
        permissions for a Compute Engine packet mirroring policy

SYNOPSIS
    gcloud compute packet-mirrorings test-iam-permissions NAME
        --permissions=[PERMISSION,...] [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute packet-mirrorings test-iam-permissions tests the IAM
    permissions that a caller has on a Compute Engine packet mirroring policy.

    Note: This operation is designed to be used for building permission-aware
    UIs and command-line tools, not for authorization checking. This operation
    may "fail open" without warning.

EXAMPLES
    To test if the caller has compute.packetMirrorings.get permission on a
    packet mirroring policy my-pm in region us-central1, run:

        $ gcloud compute packet-mirrorings test-iam-permissions my-pm \
            --region=us-central1 --permissions=compute.packetMirrorings.get

POSITIONAL ARGUMENTS
     NAME
        Name of the packet mirroring to test IAM permissions for.

REQUIRED FLAGS
     --permissions=[PERMISSION,...]
        The set of permissions to check for the resource.

OPTIONAL FLAGS
     --region=REGION
        Region of the packet mirroring to test IAM permissions for. Overrides
        the default compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute packet-mirrorings test-iam-permissions

        $ gcloud beta compute packet-mirrorings test-iam-permissions
```

### gcloud compute packet-mirrorings update

```text
NAME
    gcloud compute packet-mirrorings update - update a Compute Engine packet
        mirroring policy

SYNOPSIS
    gcloud compute packet-mirrorings update NAME [--async]
        [--collector-ilb=COLLECTOR_ILB] [--description=DESCRIPTION] [--enable]
        [--filter-direction=DIRECTION] [--region=REGION]
        [--add-filter-cidr-ranges=[CIDR_RANGE,...] | --clear-filter-cidr-ranges
          | --remove-filter-cidr-ranges=[CIDR_RANGE,...]
          | --set-filter-cidr-ranges=[CIDR_RANGE,...]]
        [--add-filter-protocols=[PROTOCOL,...] | --clear-filter-protocols
          | --remove-filter-protocols=[PROTOCOL,...]
          | --set-filter-protocols=[PROTOCOL,...]]
        [--add-mirrored-instances=[INSTANCE,...] | --clear-mirrored-instances
          | --remove-mirrored-instances=[INSTANCE,...]
          | --set-mirrored-instances=[INSTANCE,...]]
        [--add-mirrored-subnets=[SUBNET,...] | --clear-mirrored-subnets
          | --remove-mirrored-subnets=[SUBNET,...]
          | --set-mirrored-subnets=[SUBNET,...]]
        [--add-mirrored-tags=[TAG,...] | --clear-mirrored-tags
          | --remove-mirrored-tags=[TAG,...] | --set-mirrored-tags=[TAG,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Compute Engine packet mirroring policy.

EXAMPLES
    Stop mirroring by tags, add subnet-1 as a mirrored subnet.

        $ gcloud compute packet-mirrorings update my-pm \
            --region us-central1 --clear-mirrored-tags \
            --add-mirrored-subnets subnet-1

    Change the load-balancer to send mirrored traffic to.

        $ gcloud compute packet-mirrorings update my-pm \
            --region us-central1 --collector-ilb new-forwarding-rule

    Disable a Packet Mirroring policy.

        $ gcloud compute packet-mirrorings update my-pm \
            --region us-central1 --no-enable

    Re-enable a disabled Packet Mirroring policy.

        $ gcloud compute packet-mirrorings update my-pm \
            --region us-central1 --enable

POSITIONAL ARGUMENTS
     NAME
        Name of the packet mirroring to update.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --collector-ilb=COLLECTOR_ILB
        Forwarding rule configured as collector. This must be a regional
        forwarding rule (in the same region) with load balancing scheme
        INTERNAL and isMirroringCollector set to true.

        You can provide this as the full URL to the forwarding rule, partial
        URL, or name. For example, the following are valid values:
        * https://compute.googleapis.com/compute/v1/projects/myproject/
          regions/us-central1/forwardingRules/fr-1
        * projects/myproject/regions/us-central1/forwardingRules/fr-1
        * fr-1

     --description=DESCRIPTION
        Optional, textual description for the packet mirroring.

     --enable
        Enable or disable the packet-mirroring.

     --filter-direction=DIRECTION
        * For ingress, only ingress traffic is mirrored.
        * For egress, only egress traffic is mirrored.
        * For both (default), both directions are mirrored. DIRECTION must be
          one of: both, egress, ingress.

     --region=REGION
        Region of the packet mirroring to update. Overrides the default
        compute/region property value for this command invocation.

     Update the filter CIDR ranges of this packet mirroring.

     At most one of these can be specified:

       --add-filter-cidr-ranges=[CIDR_RANGE,...]
          List of filter CIDR ranges to add to the packet mirroring.

       --clear-filter-cidr-ranges
          If specified, clear the existing filter CIDR ranges from the packet
          mirroring.

       --remove-filter-cidr-ranges=[CIDR_RANGE,...]
          List of filter CIDR ranges to remove from the packet mirroring.

       --set-filter-cidr-ranges=[CIDR_RANGE,...]
          List of filter CIDR ranges to be mirrored on the packet mirroring.

     Update the filter protocols of this packet mirroring.

     At most one of these can be specified:

       --add-filter-protocols=[PROTOCOL,...]
          List of filter IP protocols to add to the packet mirroring. PROTOCOL
          can be one of tcp, udp, icmp, esp, ah, ipip, sctp, or an IANA
          protocol number.

       --clear-filter-protocols
          If specified, clear the existing filter IP protocols from the packet
          mirroring.

       --remove-filter-protocols=[PROTOCOL,...]
          List of filter IP protocols to remove from the packet mirroring.
          PROTOCOL can be one of tcp, udp, icmp, esp, ah, ipip, sctp, or an
          IANA protocol number.

       --set-filter-protocols=[PROTOCOL,...]
          List of filter IP protocols to be mirrored on the packet mirroring.
          PROTOCOL can be one of tcp, udp, icmp, esp, ah, ipip, sctp, or an
          IANA protocol number.

     Update the mirrored instances of this packet mirroring.

     At most one of these can be specified:

       --add-mirrored-instances=[INSTANCE,...]
          List of instances to add to the packet mirroring.

       --clear-mirrored-instances
          If specified, clear the existing instances from the packet mirroring.

       --remove-mirrored-instances=[INSTANCE,...]
          List of instances to remove from the packet mirroring.

       --set-mirrored-instances=[INSTANCE,...]
          List of instances to be mirrored on the packet mirroring.

     Update the mirrored subnets of this packet mirroring.

     At most one of these can be specified:

       --add-mirrored-subnets=[SUBNET,...]
          List of subnets to add to the packet mirroring.

       --clear-mirrored-subnets
          If specified, clear the existing subnets from the packet mirroring.

       --remove-mirrored-subnets=[SUBNET,...]
          List of subnets to remove from the packet mirroring.

       --set-mirrored-subnets=[SUBNET,...]
          List of subnets to be mirrored on the packet mirroring.

     Update the mirrored tags of this packet mirroring.

         To read more about configuring network tags, read this guide:
         https://cloud.google.com/vpc/docs/add-remove-network-tags

         The virtual machines with the provided tags must live
         in zones contained in the same region as this packet mirroring.

     At most one of these can be specified:

       --add-mirrored-tags=[TAG,...]
          List of tags to add to the packet mirroring.

       --clear-mirrored-tags
          If specified, clear the existing tags from the packet mirroring.

       --remove-mirrored-tags=[TAG,...]
          List of tags to remove from the packet mirroring.

       --set-mirrored-tags=[TAG,...]
          List of tags to be mirrored on the packet mirroring.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute packet-mirrorings update

        $ gcloud beta compute packet-mirrorings update
```

### gcloud beta compute packet-mirrorings create

```text
NAME
    gcloud beta compute packet-mirrorings create - create a Compute Engine
        packet mirroring policy

SYNOPSIS
    gcloud beta compute packet-mirrorings create NAME
        --collector-ilb=COLLECTOR_ILB --network=NETWORK [--async]
        [--description=DESCRIPTION] [--no-enable]
        [--filter-cidr-ranges=[CIDR_RANGE,...]] [--filter-direction=DIRECTION]
        [--filter-protocols=[PROTOCOL,...]]
        [--mirrored-instances=[INSTANCE,...]] [--mirrored-subnets=[SUBNET,...]]
        [--mirrored-tags=[TAG,...]] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute packet-mirrorings delete

```text
NAME
    gcloud beta compute packet-mirrorings delete - delete a Compute Engine
        packet mirroring policy

SYNOPSIS
    gcloud beta compute packet-mirrorings delete NAME [NAME ...]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute packet-mirrorings describe

```text
NAME
    gcloud beta compute packet-mirrorings describe - describe a Compute Engine
        packet mirroring policy

SYNOPSIS
    gcloud beta compute packet-mirrorings describe NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute packet-mirrorings list

```text
NAME
    gcloud beta compute packet-mirrorings list - list Google Compute Engine
        packet mirroring policies

SYNOPSIS
    gcloud beta compute packet-mirrorings list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute packet-mirrorings test-iam-permissions

```text
NAME
    gcloud beta compute packet-mirrorings test-iam-permissions - test IAM
        permissions for a Compute Engine packet mirroring policy

SYNOPSIS
    gcloud beta compute packet-mirrorings test-iam-permissions NAME
        --permissions=[PERMISSION,...] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute packet-mirrorings update

```text
NAME
    gcloud beta compute packet-mirrorings update - update a Compute Engine
        packet mirroring policy

SYNOPSIS
    gcloud beta compute packet-mirrorings update NAME [--async]
        [--collector-ilb=COLLECTOR_ILB] [--description=DESCRIPTION] [--enable]
        [--filter-direction=DIRECTION] [--region=REGION]
        [--add-filter-cidr-ranges=[CIDR_RANGE,...] | --clear-filter-cidr-ranges
          | --remove-filter-cidr-ranges=[CIDR_RANGE,...]
          | --set-filter-cidr-ranges=[CIDR_RANGE,...]]
        [--add-filter-protocols=[PROTOCOL,...] | --clear-filter-protocols
          | --remove-filter-protocols=[PROTOCOL,...]
          | --set-filter-protocols=[PROTOCOL,...]]
        [--add-mirrored-instances=[INSTANCE,...] | --clear-mirrored-instances
          | --remove-mirrored-instances=[INSTANCE,...]
          | --set-mirrored-instances=[INSTANCE,...]]
        [--add-mirrored-subnets=[SUBNET,...] | --clear-mirrored-subnets
          | --remove-mirrored-subnets=[SUBNET,...]
          | --set-mirrored-subnets=[SUBNET,...]]
        [--add-mirrored-tags=[TAG,...] | --clear-mirrored-tags
          | --remove-mirrored-tags=[TAG,...] | --set-mirrored-tags=[TAG,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute packet-mirrorings create

```text
NAME
    gcloud alpha compute packet-mirrorings create - create a Compute Engine
        packet mirroring policy

SYNOPSIS
    gcloud alpha compute packet-mirrorings create NAME
        --collector-ilb=COLLECTOR_ILB --network=NETWORK [--async]
        [--description=DESCRIPTION] [--no-enable]
        [--filter-cidr-ranges=[CIDR_RANGE,...]] [--filter-direction=DIRECTION]
        [--filter-protocols=[PROTOCOL,...]]
        [--mirrored-instances=[INSTANCE,...]] [--mirrored-subnets=[SUBNET,...]]
        [--mirrored-tags=[TAG,...]] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute packet-mirrorings delete

```text
NAME
    gcloud alpha compute packet-mirrorings delete - delete a Compute Engine
        packet mirroring policy

SYNOPSIS
    gcloud alpha compute packet-mirrorings delete NAME [NAME ...]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute packet-mirrorings describe

```text
NAME
    gcloud alpha compute packet-mirrorings describe - describe a Compute Engine
        packet mirroring policy

SYNOPSIS
    gcloud alpha compute packet-mirrorings describe NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute packet-mirrorings list

```text
NAME
    gcloud alpha compute packet-mirrorings list - list Google Compute Engine
        packet mirroring policies

SYNOPSIS
    gcloud alpha compute packet-mirrorings list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute packet-mirrorings test-iam-permissions

```text
NAME
    gcloud alpha compute packet-mirrorings test-iam-permissions - test IAM
        permissions for a Compute Engine packet mirroring policy

SYNOPSIS
    gcloud alpha compute packet-mirrorings test-iam-permissions NAME
        --permissions=[PERMISSION,...] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute packet-mirrorings update

```text
NAME
    gcloud alpha compute packet-mirrorings update - update a Compute Engine
        packet mirroring policy

SYNOPSIS
    gcloud alpha compute packet-mirrorings update NAME [--async]
        [--collector-ilb=COLLECTOR_ILB] [--description=DESCRIPTION] [--enable]
        [--filter-direction=DIRECTION] [--region=REGION]
        [--add-filter-cidr-ranges=[CIDR_RANGE,...] | --clear-filter-cidr-ranges
          | --remove-filter-cidr-ranges=[CIDR_RANGE,...]
          | --set-filter-cidr-ranges=[CIDR_RANGE,...]]
        [--add-filter-protocols=[PROTOCOL,...] | --clear-filter-protocols
          | --remove-filter-protocols=[PROTOCOL,...]
          | --set-filter-protocols=[PROTOCOL,...]]
        [--add-mirrored-instances=[INSTANCE,...] | --clear-mirrored-instances
          | --remove-mirrored-instances=[INSTANCE,...]
          | --set-mirrored-instances=[INSTANCE,...]]
        [--add-mirrored-subnets=[SUBNET,...] | --clear-mirrored-subnets
          | --remove-mirrored-subnets=[SUBNET,...]
          | --set-mirrored-subnets=[SUBNET,...]]
        [--add-mirrored-tags=[TAG,...] | --clear-mirrored-tags
          | --remove-mirrored-tags=[TAG,...] | --set-mirrored-tags=[TAG,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute packet-mirrorings list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute packet-mirrorings list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/packet-mirrorings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

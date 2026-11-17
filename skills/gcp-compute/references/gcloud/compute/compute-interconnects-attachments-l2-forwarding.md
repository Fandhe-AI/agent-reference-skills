---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/attachments/l2-forwarding
---

# gcloud compute interconnects attachments l2-forwarding

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects attachments l2-forwarding add-mapping

```text
NAME
    gcloud compute interconnects attachments l2-forwarding add-mapping - add
        new vlan to ip mapping rule to an L2-forwarding attachment

SYNOPSIS
    gcloud compute interconnects attachments l2-forwarding add-mapping NAME
        --vlan-key=VLAN_KEY [--appliance-ip-address=ADDRESSES]
        [--appliance-name=APPLIANCE_NAME]
        [--inner-vlan-to-appliance-mappings=[innerApplianceIpAddress=INNERAPPLIANCEIPADDRESS],
          [innerVlanTags=INNERVLANTAGS]] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments l2-forwarding add-mapping add new
    vlan to ip mapping rule to an L2-forwarding attachment.

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect attachment to patch.

REQUIRED FLAGS
     --vlan-key=VLAN_KEY
        Desired VLAN key for L2 forwarding mapping for the attachment. If not
        supplied, all mappings will be displayed.

OPTIONAL FLAGS
     --appliance-ip-address=ADDRESSES
        A single IPv4 or IPv6 address used as the destination IP address for
        ingress packets that match on a VLAN tag, but do not match a more
        specific inner VLAN tag.

     --appliance-name=APPLIANCE_NAME
        The name of the L2 appliance mapping rule.

     --inner-vlan-to-appliance-mappings=[innerApplianceIpAddress=INNERAPPLIANCEIPADDRESS],[innerVlanTags=INNERVLANTAGS]
        A list of mapping rules from inner VLAN tags to IP addresses. If the
        inner VLAN is not explicitly mapped to an IP address range, the
        applianceIpAddress is used.

     --region=REGION
        Region of the interconnect attachment to patch. If not specified, you
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

        $ gcloud alpha compute interconnects attachments l2-forwarding \
            add-mapping

        $ gcloud beta compute interconnects attachments l2-forwarding \
            add-mapping
```

### gcloud compute interconnects attachments l2-forwarding create

```text
NAME
    gcloud compute interconnects attachments l2-forwarding create - create a
        Compute Engine L2 forwarding interconnect attachment

SYNOPSIS
    gcloud compute interconnects attachments l2-forwarding create NAME
        --geneve-vni=GENEVE_HEADER --interconnect=INTERCONNECT
        --network=NETWORK
        --tunnel-endpoint-ip-address=TUNNEL_ENDPOINT_IP_ADDRESS
        [--bandwidth=BANDWIDTH]
        [--default-appliance-ip-address=DEFAULT_APPLIANCE_IP_ADDRESS]
        [--description=DESCRIPTION] [--enable-admin] [--mtu=MTU]
        [--region=REGION] [--resource-manager-tags=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments l2-forwarding create is used to
    create a L2 forwarding interconnect attachments. An interconnect attachment
    is what binds the underlying connectivity of an interconnect to a path into
    and out of the customer's cloud network.

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect attachment to create.

REQUIRED FLAGS
     --geneve-vni=GENEVE_HEADER
        A VNI identier for Geneve header, as defined in
        https://datatracker.ietf.org/doc/html/rfc8926, used for L2 forwarding.

     --interconnect=INTERCONNECT
        The interconnect for the interconnect attachment

     --network=NETWORK
        The Google Network to use for L2 forwarding.

     --tunnel-endpoint-ip-address=TUNNEL_ENDPOINT_IP_ADDRESS
        A single IPv4 or IPv6 address. This address will be used as the source
        IP address for L2 forwarding packets sent to the appliances, and must
        be used as the destination IP address for packets that should be sent
        out through this attachment.

OPTIONAL FLAGS
     --bandwidth=BANDWIDTH
        Provisioned capacity of the attachment. BANDWIDTH must be one of:

         50m
            50 Mbit/s
         100m
            100 Mbit/s
         200m
            200 Mbit/s
         300m
            300 Mbit/s
         400m
            400 Mbit/s
         500m
            500 Mbit/s
         1g
            1 Gbit/s
         2g
            2 Gbit/s
         5g
            5 Gbit/s
         10g
            10 Gbit/s
         20g
            20 Gbit/s
         50g
            50 Gbit/s
         100g
            100 Gbit/s

     --default-appliance-ip-address=DEFAULT_APPLIANCE_IP_ADDRESS
        A single IPv4 or IPv6 address used as the default destination IP when
        there is no VLAN mapping result found for L2 forwarding. Unset field
        indicates the unmatched packet should be dropped.

     --description=DESCRIPTION
        Human-readable plain-text description of attachment.

     --enable-admin
        Administrative status of the interconnect attachment. If not provided
        on creation, defaults to enabled. When this is enabled, the attachment
        is operational and will carry traffic. Use --no-enable-admin to disable
        it.

     --mtu=MTU
        Maximum transmission unit (MTU) is the size of the largest IP packet
        passing through this interconnect attachment. Must be one of 1440,
        1460, 1500, or 8896. If not specified, the value will default to 1440.

     --region=REGION
        Region of the interconnect attachment to create. If not specified, you
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

     --resource-manager-tags=[KEY=VALUE,...]
        A comma-separated list of Resource Manager tags to apply to the
        interconnect.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects attachments l2-forwarding create

        $ gcloud beta compute interconnects attachments l2-forwarding create
```

### gcloud compute interconnects attachments l2-forwarding describe-mapping

```text
NAME
    gcloud compute interconnects attachments l2-forwarding describe-mapping -
        describe a Compute Engine L2 forwarding interconnect attachment

SYNOPSIS
    gcloud compute interconnects attachments l2-forwarding describe-mapping
        NAME --vlan-key=VLAN_KEY [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments l2-forwarding describe-mapping
    displays all data associated with Compute Engine interconnect attachment in
    a project.

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect attachment to describe.

REQUIRED FLAGS
     --vlan-key=VLAN_KEY
        Desired VLAN key for L2 forwarding mapping for the attachment. If not
        supplied, all mappings will be displayed.

OPTIONAL FLAGS
     --region=REGION
        Region of the interconnect attachment to describe. If not specified,
        you might be prompted to select a region (interactive mode only).

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

        $ gcloud alpha compute interconnects attachments l2-forwarding \
            describe-mapping

        $ gcloud beta compute interconnects attachments l2-forwarding \
            describe-mapping
```

### gcloud compute interconnects attachments l2-forwarding list-mapping

```text
NAME
    gcloud compute interconnects attachments l2-forwarding list-mapping - list
        Google Compute Engine interconnect attachments

SYNOPSIS
    gcloud compute interconnects attachments l2-forwarding list-mapping NAME
        [--region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments l2-forwarding list-mapping
    displays all Google Compute Engine interconnect attachments in a project.

    By default, interconnect attachments from all regions are listed. The
    results can be narrowed down using a filter: --filter="region:( REGION ...
    )".

EXAMPLES
    To list all interconnect attachments in a project in table form, run:

        $ gcloud compute interconnects attachments l2-forwarding list-mapping

    To list the URIs of all interconnect attachments in a project, run:

        $ gcloud compute interconnects attachments l2-forwarding \
            list-mapping --uri

    To list all interconnect attachments in the us-central1 and europe-west1
    regions, run:

        $ gcloud compute interconnects attachments l2-forwarding \
            list-mapping --filter="region:( us-central1 europe-west1 )"

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect attachment to describe.

FLAGS
     --region=REGION
        Region of the interconnect attachment to describe. If not specified,
        you might be prompted to select a region (interactive mode only).

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

        $ gcloud alpha compute interconnects attachments l2-forwarding \
            list-mapping

        $ gcloud beta compute interconnects attachments l2-forwarding \
            list-mapping
```

### gcloud compute interconnects attachments l2-forwarding remove-mapping

```text
NAME
    gcloud compute interconnects attachments l2-forwarding remove-mapping -
        remove vlan to ip mapping rule to an L2-forwarding attachment

SYNOPSIS
    gcloud compute interconnects attachments l2-forwarding remove-mapping NAME
        --vlan-key=VLAN_KEY [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments l2-forwarding remove-mapping
    remove vlan to ip mapping rule to an L2-forwarding attachment.

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect attachment to create.

REQUIRED FLAGS
     --vlan-key=VLAN_KEY
        Desired VLAN key for L2 forwarding mapping for the attachment. If not
        supplied, all mappings will be displayed.

OPTIONAL FLAGS
     --region=REGION
        Region of the interconnect attachment to create. If not specified, you
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

        $ gcloud alpha compute interconnects attachments l2-forwarding \
            remove-mapping

        $ gcloud beta compute interconnects attachments l2-forwarding \
            remove-mapping
```

### gcloud compute interconnects attachments l2-forwarding update

```text
NAME
    gcloud compute interconnects attachments l2-forwarding update - update a
        Compute Engine L2 forwarding interconnect attachment

SYNOPSIS
    gcloud compute interconnects attachments l2-forwarding update NAME
        [--bandwidth=BANDWIDTH]
        [--default-appliance-ip-address=DEFAULT_APPLIANCE_IP_ADDRESS]
        [--description=DESCRIPTION] [--enable-admin]
        [--geneve-vni=GENEVE_HEADER] [--mtu=MTU] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments l2-forwarding update is used to
    update interconnect attachments. An interconnect attachment is what binds
    the underlying connectivity of an interconnect to a path into and out of
    the customer's cloud network.

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect attachment to patch.

FLAGS
     --bandwidth=BANDWIDTH
        Provisioned capacity of the attachment. BANDWIDTH must be one of:

         50m
            50 Mbit/s
         100m
            100 Mbit/s
         200m
            200 Mbit/s
         300m
            300 Mbit/s
         400m
            400 Mbit/s
         500m
            500 Mbit/s
         1g
            1 Gbit/s
         2g
            2 Gbit/s
         5g
            5 Gbit/s
         10g
            10 Gbit/s
         20g
            20 Gbit/s
         50g
            50 Gbit/s
         100g
            100 Gbit/s

     --default-appliance-ip-address=DEFAULT_APPLIANCE_IP_ADDRESS
        A single IPv4 or IPv6 address used as the default destination IP when
        there is no VLAN mapping result found for L2 forwarding. Unset field
        indicates the unmatched packet should be dropped.

     --description=DESCRIPTION
        Human-readable plain-text description of attachment.

     --enable-admin
        Administrative status of the interconnect attachment. If not provided
        on creation, defaults to enabled. When this is enabled, the attachment
        is operational and will carry traffic. Use --no-enable-admin to disable
        it.

     --geneve-vni=GENEVE_HEADER
        A VNI identier for Geneve header, as defined in
        https://datatracker.ietf.org/doc/html/rfc8926, used for L2 forwarding.

     --mtu=MTU
        Maximum transmission unit (MTU) is the size of the largest IP packet
        passing through this interconnect attachment. Must be one of 1440,
        1460, 1500, or 8896. If not specified, the value will default to 1440.

     --region=REGION
        Region of the interconnect attachment to patch. If not specified, you
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

        $ gcloud alpha compute interconnects attachments l2-forwarding update

        $ gcloud beta compute interconnects attachments l2-forwarding update
```

### gcloud compute interconnects attachments l2-forwarding update-mapping

```text
NAME
    gcloud compute interconnects attachments l2-forwarding update-mapping -
        update vlan to ip mapping rule to an L2-forwarding attachment

SYNOPSIS
    gcloud compute interconnects attachments l2-forwarding update-mapping NAME
        --vlan-key=VLAN_KEY [--appliance-ip-address=ADDRESSES]
        [--appliance-name=APPLIANCE_NAME]
        [--inner-vlan-to-appliance-mappings=[innerApplianceIpAddress=INNERAPPLIANCEIPADDRESS],
          [innerVlanTags=INNERVLANTAGS]] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments l2-forwarding update-mapping
    update vlan to ip mapping rule to an L2-forwarding attachment.

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect attachment to create.

REQUIRED FLAGS
     --vlan-key=VLAN_KEY
        Desired VLAN key for L2 forwarding mapping for the attachment. If not
        supplied, all mappings will be displayed.

OPTIONAL FLAGS
     --appliance-ip-address=ADDRESSES
        A single IPv4 or IPv6 address used as the destination IP address for
        ingress packets that match on a VLAN tag, but do not match a more
        specific inner VLAN tag.

     --appliance-name=APPLIANCE_NAME
        The name of the L2 appliance mapping rule.

     --inner-vlan-to-appliance-mappings=[innerApplianceIpAddress=INNERAPPLIANCEIPADDRESS],[innerVlanTags=INNERVLANTAGS]
        A list of mapping rules from inner VLAN tags to IP addresses. If the
        inner VLAN is not explicitly mapped to an IP address range, the
        applianceIpAddress is used.

     --region=REGION
        Region of the interconnect attachment to create. If not specified, you
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

        $ gcloud alpha compute interconnects attachments l2-forwarding \
            update-mapping

        $ gcloud beta compute interconnects attachments l2-forwarding \
            update-mapping
```

### gcloud beta compute interconnects attachments l2-forwarding add-mapping

```text
NAME
    gcloud beta compute interconnects attachments l2-forwarding add-mapping -
        add new vlan to ip mapping rule to an L2-forwarding attachment

SYNOPSIS
    gcloud beta compute interconnects attachments l2-forwarding add-mapping
        NAME --vlan-key=VLAN_KEY [--appliance-ip-address=ADDRESSES]
        [--appliance-name=APPLIANCE_NAME]
        [--inner-vlan-to-appliance-mappings=[innerApplianceIpAddress=INNERAPPLIANCEIPADDRESS],
          [innerVlanTags=INNERVLANTAGS]] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments l2-forwarding create

```text
NAME
    gcloud beta compute interconnects attachments l2-forwarding create - create
        a Compute Engine L2 forwarding interconnect attachment

SYNOPSIS
    gcloud beta compute interconnects attachments l2-forwarding create NAME
        --geneve-vni=GENEVE_HEADER --interconnect=INTERCONNECT
        --network=NETWORK
        --tunnel-endpoint-ip-address=TUNNEL_ENDPOINT_IP_ADDRESS
        [--bandwidth=BANDWIDTH]
        [--default-appliance-ip-address=DEFAULT_APPLIANCE_IP_ADDRESS]
        [--description=DESCRIPTION] [--enable-admin] [--mtu=MTU]
        [--region=REGION] [--resource-manager-tags=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments l2-forwarding describe-mapping

```text
NAME
    gcloud beta compute interconnects attachments l2-forwarding
        describe-mapping - describe a Compute Engine L2 forwarding interconnect
        attachment

SYNOPSIS
    gcloud beta compute interconnects attachments l2-forwarding
        describe-mapping NAME --vlan-key=VLAN_KEY [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments l2-forwarding list-mapping

```text
NAME
    gcloud beta compute interconnects attachments l2-forwarding list-mapping -
        list Google Compute Engine interconnect attachments

SYNOPSIS
    gcloud beta compute interconnects attachments l2-forwarding list-mapping
        NAME [--region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments l2-forwarding remove-mapping

```text
NAME
    gcloud beta compute interconnects attachments l2-forwarding remove-mapping
        - remove vlan to ip mapping rule to an L2-forwarding attachment

SYNOPSIS
    gcloud beta compute interconnects attachments l2-forwarding remove-mapping
        NAME --vlan-key=VLAN_KEY [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments l2-forwarding update

```text
NAME
    gcloud beta compute interconnects attachments l2-forwarding update - update
        a Compute Engine L2 forwarding interconnect attachment

SYNOPSIS
    gcloud beta compute interconnects attachments l2-forwarding update NAME
        [--bandwidth=BANDWIDTH]
        [--default-appliance-ip-address=DEFAULT_APPLIANCE_IP_ADDRESS]
        [--description=DESCRIPTION] [--enable-admin]
        [--geneve-vni=GENEVE_HEADER] [--mtu=MTU] [--region=REGION]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute interconnects attachments l2-forwarding update-mapping

```text
NAME
    gcloud beta compute interconnects attachments l2-forwarding update-mapping
        - update vlan to ip mapping rule to an L2-forwarding attachment

SYNOPSIS
    gcloud beta compute interconnects attachments l2-forwarding update-mapping
        NAME --vlan-key=VLAN_KEY [--appliance-ip-address=ADDRESSES]
        [--appliance-name=APPLIANCE_NAME]
        [--inner-vlan-to-appliance-mappings=[innerApplianceIpAddress=INNERAPPLIANCEIPADDRESS],
          [innerVlanTags=INNERVLANTAGS]] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments l2-forwarding add-mapping

```text
NAME
    gcloud alpha compute interconnects attachments l2-forwarding add-mapping -
        add new vlan to ip mapping rule to an L2-forwarding attachment

SYNOPSIS
    gcloud alpha compute interconnects attachments l2-forwarding add-mapping
        NAME --vlan-key=VLAN_KEY [--appliance-ip-address=ADDRESSES]
        [--appliance-name=APPLIANCE_NAME]
        [--inner-vlan-to-appliance-mappings=[innerApplianceIpAddress=INNERAPPLIANCEIPADDRESS],
          [innerVlanTags=INNERVLANTAGS]] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments l2-forwarding create

```text
NAME
    gcloud alpha compute interconnects attachments l2-forwarding create -
        create a Compute Engine L2 forwarding interconnect attachment

SYNOPSIS
    gcloud alpha compute interconnects attachments l2-forwarding create NAME
        --geneve-vni=GENEVE_HEADER --interconnect=INTERCONNECT
        --network=NETWORK
        --tunnel-endpoint-ip-address=TUNNEL_ENDPOINT_IP_ADDRESS
        [--bandwidth=BANDWIDTH]
        [--default-appliance-ip-address=DEFAULT_APPLIANCE_IP_ADDRESS]
        [--description=DESCRIPTION] [--dry-run] [--enable-admin] [--mtu=MTU]
        [--region=REGION] [--resource-manager-tags=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments l2-forwarding describe-mapping

```text
NAME
    gcloud alpha compute interconnects attachments l2-forwarding
        describe-mapping - describe a Compute Engine L2 forwarding interconnect
        attachment

SYNOPSIS
    gcloud alpha compute interconnects attachments l2-forwarding
        describe-mapping NAME --vlan-key=VLAN_KEY [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments l2-forwarding list-mapping

```text
NAME
    gcloud alpha compute interconnects attachments l2-forwarding list-mapping -
        list Google Compute Engine interconnect attachments

SYNOPSIS
    gcloud alpha compute interconnects attachments l2-forwarding list-mapping
        NAME [--region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments l2-forwarding remove-mapping

```text
NAME
    gcloud alpha compute interconnects attachments l2-forwarding remove-mapping
        - remove vlan to ip mapping rule to an L2-forwarding attachment

SYNOPSIS
    gcloud alpha compute interconnects attachments l2-forwarding remove-mapping
        NAME --vlan-key=VLAN_KEY [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments l2-forwarding update

```text
NAME
    gcloud alpha compute interconnects attachments l2-forwarding update -
        update a Compute Engine L2 forwarding interconnect attachment

SYNOPSIS
    gcloud alpha compute interconnects attachments l2-forwarding update NAME
        [--bandwidth=BANDWIDTH]
        [--default-appliance-ip-address=DEFAULT_APPLIANCE_IP_ADDRESS]
        [--description=DESCRIPTION] [--enable-admin]
        [--geneve-vni=GENEVE_HEADER] [--mtu=MTU] [--region=REGION]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments l2-forwarding update-mapping

```text
NAME
    gcloud alpha compute interconnects attachments l2-forwarding update-mapping
        - update vlan to ip mapping rule to an L2-forwarding attachment

SYNOPSIS
    gcloud alpha compute interconnects attachments l2-forwarding update-mapping
        NAME --vlan-key=VLAN_KEY [--appliance-ip-address=ADDRESSES]
        [--appliance-name=APPLIANCE_NAME]
        [--inner-vlan-to-appliance-mappings=[innerApplianceIpAddress=INNERAPPLIANCEIPADDRESS],
          [innerVlanTags=INNERVLANTAGS]] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/attachments/l2-forwarding (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

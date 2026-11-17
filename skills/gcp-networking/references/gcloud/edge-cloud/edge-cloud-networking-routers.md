---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/networking/routers
---

# gcloud edge-cloud networking routers

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud networking routers add-bgp-peer

```text
NAME
    gcloud edge-cloud networking routers add-bgp-peer - add a BGP peer to a
        Distributed Cloud Edge Network router

SYNOPSIS
    gcloud edge-cloud networking routers add-bgp-peer
        (ROUTER : --location=LOCATION --zone=ZONE) --interface=INTERFACE
        --peer-asn=PEER_ASN --peer-ipv4-range=PEER_IPV4_RANGE
        --peer-name=PEER_NAME [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a BGP peer to a Distributed Cloud Edge Network router

EXAMPLES
    To create and add a BGP peer for the Distributed Cloud Edge Network router
    'my-router' in edge zone 'us-central1-edge-den1' , run:

        $ gcloud edge-cloud networking routers add-bgp-peer my-router \
          --interface=my-int-r1 --peer-asn=33333 --peer-name=peer1 \
          --peer-ipv4-range=208.117.254.232/31 --location=us-central1 \
          --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Router resource - The router to which we add a bgp peer. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument router on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROUTER
          ID of the router or fully qualified identifier for the router.

          To set the router attribute:
          + provide the argument router on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the router.

          To set the location attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The zone of the router.

          To set the zone attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

REQUIRED FLAGS
     --interface=INTERFACE
        The name of the interface for this BGP peer.

     --peer-asn=PEER_ASN
        The BGP autonomous system number (ASN) for this BGP peer. Must be a
        16-bit or 32-bit private ASN as defined in
        https://tools.ietf.org/html/rfc6996, for example --asn=64512.

     --peer-ipv4-range=PEER_IPV4_RANGE
        The IPv4 link-local address range of the peer router.

     --peer-name=PEER_NAME
        The name of the new BGP peer being added.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud networking routers add-bgp-peer
```

### gcloud edge-cloud networking routers add-interface

```text
NAME
    gcloud edge-cloud networking routers add-interface - add an interface to a
        Distributed Cloud Edge Network router

SYNOPSIS
    gcloud edge-cloud networking routers add-interface
        (ROUTER : --location=LOCATION --zone=ZONE)
        --interface-name=INTERFACE_NAME
        (--loopback-ip-addresses=[LOOPBACK_IP_ADDRESSES,...]
          | --subnetwork=SUBNETWORK
          | --interconnect-attachment=INTERCONNECT_ATTACHMENT
          --ip-address=IP_ADDRESS --ip-mask-length=IP_MASK_LENGTH) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an interface to a Distributed Cloud Edge Network router.

EXAMPLES
    To create and add a northbound interface for Distributed Cloud Edge Network
    router 'my-router' in edge zone 'us-central1-edge-den1' , run:

        $ gcloud edge-cloud networking routers add-interface my-router \
          --interface-name=my-int-r1 \
          --interconnect-attachment=my-link-attachment \
          --ip-address=208.117.254.233 --ip-mask-length=31 \
          --location=us-central1 --zone=us-central1-edge-den1

    To create and add a southbound interface for Distributed Cloud Edge Network
    router 'my-router' in edge zone 'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking routers add-interface my-router \
         --interface-name=my-int-r2 --subnetwork=my-subnet \
         --location=us-central1 --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Router resource - The router to which we add an interface. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument router on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROUTER
          ID of the router or fully qualified identifier for the router.

          To set the router attribute:
          + provide the argument router on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the router.

          To set the location attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The zone of the router.

          To set the zone attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

REQUIRED FLAGS
     --interface-name=INTERFACE_NAME
        The name of the interface being added.

     The argument group for configuring the interface for the router.

     Exactly one of these must be specified:

       The argument group for adding loopback interfaces to edge router.

       --loopback-ip-addresses=[LOOPBACK_IP_ADDRESSES,...]
          The list of ip ranges for the loopback interface.

       The argument group for adding southbound interfaces to edge router.

       --subnetwork=SUBNETWORK
          Subnetwork of the interface being added.

       The argument group for adding northbound interfaces to edge router.

       --interconnect-attachment=INTERCONNECT_ATTACHMENT
          Interconnect attachment of the interface being added.

       --ip-address=IP_ADDRESS
          Link-local address of the router for this interface.

       --ip-mask-length=IP_MASK_LENGTH
          Subnet mask for the link-local IP range of the interface. The
          interface IP address and BGP peer IP address must be selected from
          the subnet defined by this link-local range.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud networking routers add-interface
```

### gcloud edge-cloud networking routers create

```text
NAME
    gcloud edge-cloud networking routers create - create a Distributed Cloud
        Edge Network router

SYNOPSIS
    gcloud edge-cloud networking routers create
        (ROUTER : --location=LOCATION --zone=ZONE) --asn=ASN --network=NETWORK
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Distributed Cloud Edge Network router.

EXAMPLES
    To create a router called 'my-router' with asn 65555 in edge zone
    'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking routers create my-router \
            --network=my-network --location=us-central1 \
            --zone=us-central1-edge-den1 --asn=65555

POSITIONAL ARGUMENTS
     Router resource - Distributed Cloud Edge Network router to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument router on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROUTER
          ID of the router or fully qualified identifier for the router.

          To set the router attribute:
          + provide the argument router on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The name of the Google Distributed Cloud Edge zone.

          To set the zone attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

REQUIRED FLAGS
     --asn=ASN
        The locally assigned BGP ASN.

     --network=NETWORK
        The network that this subnetwork belongs to.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        An optional, textual description for the router.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgenetwork/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/distributed-cloud-edge/docs

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud networking routers create
```

### gcloud edge-cloud networking routers delete

```text
NAME
    gcloud edge-cloud networking routers delete - delete a Distributed Cloud
        Edge Network router

SYNOPSIS
    gcloud edge-cloud networking routers delete
        (ROUTER : --location=LOCATION --zone=ZONE) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Distributed Cloud Edge Network router.

EXAMPLES
    To delete a router called 'my-router' in edge zone 'us-central1-edge-den1',
    run:

        $ gcloud edge-cloud networking routers delete my-router \
            --location=us-central1 --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Router resource - Distributed Cloud Edge Network router to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument router on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROUTER
          ID of the router or fully qualified identifier for the router.

          To set the router attribute:
          + provide the argument router on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The name of the Google Distributed Cloud Edge zone.

          To set the zone attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgenetwork/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/distributed-cloud-edge/docs

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud networking routers delete
```

### gcloud edge-cloud networking routers describe

```text
NAME
    gcloud edge-cloud networking routers describe - show details about the
        Distributed Cloud Edge Network router

SYNOPSIS
    gcloud edge-cloud networking routers describe
        (ROUTER : --location=LOCATION --zone=ZONE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about the Distributed Cloud Edge Network router.

EXAMPLES
    To show details about a router named 'my-router' in edge zone
    'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking routers describe my-router \
            --location=us-central1 --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Router resource - The router you want to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument router on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROUTER
          ID of the router or fully qualified identifier for the router.

          To set the router attribute:
          + provide the argument router on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The name of the Google Distributed Cloud Edge zone.

          To set the zone attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgenetwork/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/distributed-cloud-edge/docs

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud networking routers describe
```

### gcloud edge-cloud networking routers get-status

```text
NAME
    gcloud edge-cloud networking routers get-status - get the status of a
        specified Distributed Cloud Edge Network router

SYNOPSIS
    gcloud edge-cloud networking routers get-status
        (ROUTER : --location=LOCATION --zone=ZONE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the status of a specified Distributed Cloud Edge Network router.

EXAMPLES
    To get the status of the Distributed Cloud Edge Network router 'my-router'
    in edge zone 'us-central1-edge-den1' , run:

        $ gcloud edge-cloud networking routers get-status my-router \
          --location=us-central1 --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Router resource - The router to get status. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument router on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROUTER
          ID of the router or fully qualified identifier for the router.

          To set the router attribute:
          + provide the argument router on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the router.

          To set the location attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The zone of the router.

          To set the zone attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud networking routers get-status
```

### gcloud edge-cloud networking routers list

```text
NAME
    gcloud edge-cloud networking routers list - list Distributed Cloud Edge
        Network routers

SYNOPSIS
    gcloud edge-cloud networking routers list
        (--zone=ZONE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Distributed Cloud Edge Network routers.

EXAMPLES
    To list the routers in edge zone 'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking routers list --location=us-central1 \
            --zone=us-central1-edge-den1

REQUIRED FLAGS
     Zone resource - Parent Distributed Cloud Edge Network zone to list all
     contained Distributed Cloud Edge Network routers. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --zone on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --zone=ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument --zone on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument --zone on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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
    This command uses the edgenetwork/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/distributed-cloud-edge/docs

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud networking routers list
```

### gcloud edge-cloud networking routers remove-bgp-peer

```text
NAME
    gcloud edge-cloud networking routers remove-bgp-peer - remove a BGP peer
        from a Distributed Cloud Edge Network router

SYNOPSIS
    gcloud edge-cloud networking routers remove-bgp-peer
        (ROUTER : --location=LOCATION --zone=ZONE)
        (--peer-name=PEER_NAME | --peer-names=[PEER_NAME,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a list of BGP peer from a Distributed Cloud Edge Network router

EXAMPLES
    To delete a BGP peer 'peer1' from the Distributed Cloud Edge Network router
    'my-router' in edge zone 'us-central1-edge-den1' , run:

        $ gcloud edge-cloud networking routers remove-bgp-peer my-router \
          --peer-name=peer1 --location=us-central1 \
          --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Router resource - The router from which we delete a BGP peer. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument router on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROUTER
          ID of the router or fully qualified identifier for the router.

          To set the router attribute:
          + provide the argument router on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the router.

          To set the location attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The zone of the router.

          To set the zone attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --peer-name=PEER_NAME
          The name of the BGP peer being removed.

       --peer-names=[PEER_NAME,...]
          The list of names for peers being removed. Only single value allowed
          currently.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud networking routers remove-bgp-peer
```

### gcloud edge-cloud networking routers remove-interface

```text
NAME
    gcloud edge-cloud networking routers remove-interface - remove an interface
        on a Distributed Cloud Edge Network router

SYNOPSIS
    gcloud edge-cloud networking routers remove-interface
        (ROUTER : --location=LOCATION --zone=ZONE)
        (--interface-name=INTERFACE_NAME
          | --interface-names=[INTERFACE_NAME,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an interface on a Distributed Cloud Edge Network router.

EXAMPLES
    To remove the interface 'my-int-r1' on Distributed Cloud Edge Network
    router 'my-router' in edge zone 'us-central1-edge-den1' , run:

        $ gcloud edge-cloud networking routers remove-interface my-router \
          --interface-name=my-int-r1 --location=us-central1 \
          --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Router resource - The router from which we remove an interface. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument router on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROUTER
          ID of the router or fully qualified identifier for the router.

          To set the router attribute:
          + provide the argument router on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the router.

          To set the location attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The zone of the router.

          To set the zone attribute:
          + provide the argument router on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --interface-name=INTERFACE_NAME
          The name of the interface being removed.

       --interface-names=[INTERFACE_NAME,...]
          The list of names for interfaces being removed.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud networking routers remove-interface
```

### gcloud alpha edge-cloud networking routers add-bgp-peer

```text
NAME
    gcloud alpha edge-cloud networking routers add-bgp-peer - add a BGP peer to
        a Distributed Cloud Edge Network router

SYNOPSIS
    gcloud alpha edge-cloud networking routers add-bgp-peer
        (ROUTER : --location=LOCATION --zone=ZONE) --interface=INTERFACE
        --peer-asn=PEER_ASN --peer-name=PEER_NAME
        (--peer-ipv4-range=PEER_IPV4_RANGE | --peer-ipv6-range=PEER_IPV6_RANGE)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking routers add-interface

```text
NAME
    gcloud alpha edge-cloud networking routers add-interface - add an interface
        to a Distributed Cloud Edge Network router

SYNOPSIS
    gcloud alpha edge-cloud networking routers add-interface
        (ROUTER : --location=LOCATION --zone=ZONE)
        --interface-name=INTERFACE_NAME
        (--loopback-ip-addresses=[LOOPBACK_IP_ADDRESSES,...]
          | --subnetwork=SUBNETWORK
          | --interconnect-attachment=INTERCONNECT_ATTACHMENT
          --ip-address=IP_ADDRESS --ip-mask-length=IP_MASK_LENGTH) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking routers create

```text
NAME
    gcloud alpha edge-cloud networking routers create - create a Distributed
        Cloud Edge Network router

SYNOPSIS
    gcloud alpha edge-cloud networking routers create
        (ROUTER : --location=LOCATION --zone=ZONE) --asn=ASN --network=NETWORK
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking routers delete

```text
NAME
    gcloud alpha edge-cloud networking routers delete - delete a Distributed
        Cloud Edge Network router

SYNOPSIS
    gcloud alpha edge-cloud networking routers delete
        (ROUTER : --location=LOCATION --zone=ZONE) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking routers describe

```text
NAME
    gcloud alpha edge-cloud networking routers describe - show details about
        the Distributed Cloud Edge Network router

SYNOPSIS
    gcloud alpha edge-cloud networking routers describe
        (ROUTER : --location=LOCATION --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking routers get-status

```text
NAME
    gcloud alpha edge-cloud networking routers get-status - get the status of a
        specified Distributed Cloud Edge Network router

SYNOPSIS
    gcloud alpha edge-cloud networking routers get-status
        (ROUTER : --location=LOCATION --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking routers list

```text
NAME
    gcloud alpha edge-cloud networking routers list - list Distributed Cloud
        Edge Network routers

SYNOPSIS
    gcloud alpha edge-cloud networking routers list
        (--zone=ZONE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking routers remove-bgp-peer

```text
NAME
    gcloud alpha edge-cloud networking routers remove-bgp-peer - remove a BGP
        peer from a Distributed Cloud Edge Network router

SYNOPSIS
    gcloud alpha edge-cloud networking routers remove-bgp-peer
        (ROUTER : --location=LOCATION --zone=ZONE)
        (--peer-name=PEER_NAME | --peer-names=[PEER_NAME,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking routers remove-interface

```text
NAME
    gcloud alpha edge-cloud networking routers remove-interface - remove an
        interface on a Distributed Cloud Edge Network router

SYNOPSIS
    gcloud alpha edge-cloud networking routers remove-interface
        (ROUTER : --location=LOCATION --zone=ZONE)
        (--interface-name=INTERFACE_NAME
          | --interface-names=[INTERFACE_NAME,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking routers update

```text
NAME
    gcloud alpha edge-cloud networking routers update - update a Distributed
        Cloud Edge Network router

SYNOPSIS
    gcloud alpha edge-cloud networking routers update
        (ROUTER : --location=LOCATION --zone=ZONE) [--async]
        [--add-advertisement-ranges=ADD_ADVERTISEMENT_RANGES
          | --remove-advertisement-ranges=REMOVE_ADVERTISEMENT_RANGES
          | --set-advertisement-ranges=SET_ADVERTISEMENT_RANGES]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the `--peer-asn` description of `add-bgp-peer` ends with "for example --asn=64512", but `add-bgp-peer` has no `--asn` flag (gcloud 593.0.0: "unrecognized arguments: --asn=64512 (did you mean '--async'?)"); use `--peer-asn=64512`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/networking/routers (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

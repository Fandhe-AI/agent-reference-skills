---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/spokes/gateways
---

# gcloud network-connectivity spokes gateways

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity spokes gateways advertised-routes create

```text
NAME
    gcloud network-connectivity spokes gateways advertised-routes create -
        create a new gateway advertised route

SYNOPSIS
    gcloud network-connectivity spokes gateways advertised-routes create
        (GATEWAY_ADVERTISED_ROUTE : --region=REGION --spoke=SPOKE)
        --advertise-to-hub --ip-range=IP_RANGE [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--priority=PRIORITY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new gateway advertised route with the given name.

EXAMPLES
    Create an advertised route with name my-route for gateway spoke my-gateway
    in region us-central1:

        $ gcloud network-connectivity spokes gateways advertised-routes \
            create my-route --spoke=my-gateway --region=us-central1 \
            --ip-range=10.0.1.0/24

POSITIONAL ARGUMENTS
     GatewayAdvertisedRoute resource - Name of the gateway advertised route to
     be created. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument gateway_advertised_route on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GATEWAY_ADVERTISED_ROUTE
          ID of the gatewayAdvertisedRoute or fully qualified identifier for
          the gatewayAdvertisedRoute.

          To set the gateway_advertised_route attribute:
          + provide the argument gateway_advertised_route on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument gateway_advertised_route on the command line
            with a fully specified name;
          + provide the argument --region on the command line.

       --spoke=SPOKE
          Id of the spoke.

          To set the spoke attribute:
          + provide the argument gateway_advertised_route on the command line
            with a fully specified name;
          + provide the argument --spoke on the command line.

REQUIRED FLAGS
     --advertise-to-hub
        The gateway should advertise this route toward the hub.

     --ip-range=IP_RANGE
        Advertise this IP range.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the advertised route to be created.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

     --priority=PRIORITY
        This route's priority. Must be between 0 and 65335.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity spokes gateways \
            advertised-routes create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-connectivity spokes gateways advertised-routes create my-route \
    --spoke=my-gateway \
    --region=us-central1 \
    --ip-range=10.0.1.0/24 \
    --advertise-to-hub
```

### gcloud network-connectivity spokes gateways advertised-routes delete

```text
NAME
    gcloud network-connectivity spokes gateways advertised-routes delete -
        delete a gateway advertised route

SYNOPSIS
    gcloud network-connectivity spokes gateways advertised-routes delete
        (GATEWAY_ADVERTISED_ROUTE : --region=REGION --spoke=SPOKE) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified advertised route for a gateway spoke.

EXAMPLES
    To delete an advertised route with name my-route for spoke my-spoke in
    region us-central1, run:

        $ gcloud network-connectivity spokes gateways advertised-routes \
            delete my-route --region=us-central1 --spoke=my-spoke

POSITIONAL ARGUMENTS
     GatewayAdvertisedRoute resource - Name of the advertised route to be
     deleted. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument gateway_advertised_route on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GATEWAY_ADVERTISED_ROUTE
          ID of the gatewayAdvertisedRoute or fully qualified identifier for
          the gatewayAdvertisedRoute.

          To set the gateway_advertised_route attribute:
          + provide the argument gateway_advertised_route on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument gateway_advertised_route on the command line
            with a fully specified name;
          + provide the argument --region on the command line.

       --spoke=SPOKE
          Id of the spoke.

          To set the spoke attribute:
          + provide the argument gateway_advertised_route on the command line
            with a fully specified name;
          + provide the argument --spoke on the command line.

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
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity spokes gateways \
            advertised-routes delete
```

### gcloud network-connectivity spokes gateways advertised-routes describe

```text
NAME
    gcloud network-connectivity spokes gateways advertised-routes describe -
        describe a gateway advertised route

SYNOPSIS
    gcloud network-connectivity spokes gateways advertised-routes describe
        (GATEWAY_ADVERTISED_ROUTE : --region=REGION --spoke=SPOKE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display details about a gateway advertised route.

EXAMPLES
    To display details about a gateway advertised route named my-route, run:

        $ gcloud network-connectivity spokes gateways advertised-routes \
            describe my-route --region=us-central1 --spoke=my-gateway

POSITIONAL ARGUMENTS
     GatewayAdvertisedRoute resource - Name of the gateway advertised route to
     be described. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument gateway_advertised_route on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GATEWAY_ADVERTISED_ROUTE
          ID of the gatewayAdvertisedRoute or fully qualified identifier for
          the gatewayAdvertisedRoute.

          To set the gateway_advertised_route attribute:
          + provide the argument gateway_advertised_route on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument gateway_advertised_route on the command line
            with a fully specified name;
          + provide the argument --region on the command line.

       --spoke=SPOKE
          Id of the spoke.

          To set the spoke attribute:
          + provide the argument gateway_advertised_route on the command line
            with a fully specified name;
          + provide the argument --spoke on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity spokes gateways \
            advertised-routes describe
```

### gcloud network-connectivity spokes gateways advertised-routes list

```text
NAME
    gcloud network-connectivity spokes gateways advertised-routes list - list
        gateway advertised routes

SYNOPSIS
    gcloud network-connectivity spokes gateways advertised-routes list
        [--region=REGION --spoke=SPOKE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display a list of advertised routes for the specified gateway
    spoke.

EXAMPLES
    To list all advertised routes across all gateway spokes, run:

        $ gcloud network-connectivity spokes gateways advertised-routes \
            list --region=- --spoke=-

    To list advertised routes for all gateway spokes in region us-central1,
    run:

        $ gcloud network-connectivity spokes gateways advertised-routes \
            list --region=us-central1

    To list all advertised routes for spoke my-gateway, run:

        $ gcloud network-connectivity spokes gateways advertised-routes \
            list --region=us-central1 --spoke=my-gateway

FLAGS
     Spoke resource - A gateway spoke. Use this flag to filter the list of
     advertised routes to a specific spoke. Use ``-`` to specify all spokes.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --spoke on the command line with a fully
        specified name;
      * if spoke is empty, will use the wildcard '-' to list all spokes with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --region=REGION
        The location ID.

        To set the region attribute:
        * provide the argument --spoke on the command line with a fully
          specified name;
        * if spoke is empty, will use the wildcard '-' to list all spokes
          with a fully specified name;
        * provide the argument --region on the command line;
        * use default wildcard location .

     --spoke=SPOKE
        ID of the spoke or fully qualified identifier for the spoke.

        To set the spoke attribute:
        * provide the argument --spoke on the command line;
        * if spoke is empty, will use the wildcard '-' to list all spokes.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity spokes gateways \
            advertised-routes list
```

### gcloud network-connectivity spokes gateways create

```text
NAME
    gcloud network-connectivity spokes gateways create - create a new Gateway
        spoke

SYNOPSIS
    gcloud network-connectivity spokes gateways create SPOKE
        --capacity=CAPACITY --group=GROUP --hub=HUB
        --ip-range-reservations=[CIDR_RANGE,...] --region=REGION [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Gateway spoke.

EXAMPLES
    To create a Gateway spoke named myspoke in us-central1, with a capacity of
    10 Gbps and IP range reservations of 10.1.0.0/23, run:

        $ gcloud network-connectivity spokes gateways create myspoke \
             --hub=my-hub --region us-central1 --group gateways \
             --capacity 10g --ip-range-reservations 10.1.0.0/23

POSITIONAL ARGUMENTS
     Spoke resource - Name of the spoke to create. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument spoke on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument spoke on the command line with a fully specified
        name;
      * provide the argument --region on the command line.

     This must be specified.

       SPOKE
          ID of the spoke or fully qualified identifier for the spoke.

          To set the spoke attribute:
          + provide the argument spoke on the command line.

REQUIRED FLAGS
     --capacity=CAPACITY
        Set the capacity of the gateway in Gbps. CAPACITY must be one of:

         10g
            Gateway will have capacity of 10 Gbps
         1g
            Gateway will have capacity of 1 Gbps

     --group=GROUP
        Group that the spoke will be part of. The group must already exist.

     --hub=HUB
        Hub that the spoke will attach to. The hub must already exist.

     --ip-range-reservations=[CIDR_RANGE,...]
        The IP range reservation for the spoke.

     --region=REGION
        A Google Cloud region. To see the names of regions, see Viewing a list
        of available regions
        (https://cloud.google.com/compute/docs/regions-zones/viewing-regions-zones#viewing_a_list_of_available_regions).

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the spoke to create.

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
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity spokes gateways create
```

### gcloud network-connectivity spokes gateways update

```text
NAME
    gcloud network-connectivity spokes gateways update - update a Gateway spoke

SYNOPSIS
    gcloud network-connectivity spokes gateways update
        (SPOKE : --region=REGION) [--async] [--capacity=CAPACITY]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the details of a Gateway spoke.

EXAMPLES
    To update the description of a Gateway spoke named my-spoke, run:

        $ gcloud network-connectivity spokes gateways update my-spoke \
            --region=us-central1 --description="new spoke description"

POSITIONAL ARGUMENTS
     Spoke resource - Name of the spoke to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument spoke on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SPOKE
          ID of the spoke or fully qualified identifier for the spoke.

          To set the spoke attribute:
          + provide the argument spoke on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument spoke on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --capacity=CAPACITY
        New gateway capacity of the spoke. CAPACITY must be one of: 10g, 1g.

     --description=DESCRIPTION
        New description of the spoke.

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

              $ gcloud network-connectivity spokes gateways update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-connectivity spokes gateways update \
                --clear-labels --update-labels foo=bar,baz=qux

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

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity spokes gateways update
```

### gcloud beta network-connectivity spokes gateways advertised-routes create

```text
NAME
    gcloud beta network-connectivity spokes gateways advertised-routes create -
        create a new gateway advertised route

SYNOPSIS
    gcloud beta network-connectivity spokes gateways advertised-routes create
        (GATEWAY_ADVERTISED_ROUTE : --region=REGION --spoke=SPOKE)
        --advertise-to-hub --ip-range=IP_RANGE [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--priority=PRIORITY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity spokes gateways advertised-routes delete

```text
NAME
    gcloud beta network-connectivity spokes gateways advertised-routes delete -
        delete a gateway advertised route

SYNOPSIS
    gcloud beta network-connectivity spokes gateways advertised-routes delete
        (GATEWAY_ADVERTISED_ROUTE : --region=REGION --spoke=SPOKE) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity spokes gateways advertised-routes describe

```text
NAME
    gcloud beta network-connectivity spokes gateways advertised-routes describe
        - describe a gateway advertised route

SYNOPSIS
    gcloud beta network-connectivity spokes gateways advertised-routes describe
        (GATEWAY_ADVERTISED_ROUTE : --region=REGION --spoke=SPOKE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity spokes gateways advertised-routes list

```text
NAME
    gcloud beta network-connectivity spokes gateways advertised-routes list -
        list gateway advertised routes

SYNOPSIS
    gcloud beta network-connectivity spokes gateways advertised-routes list
        [--region=REGION --spoke=SPOKE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity spokes gateways create

```text
NAME
    gcloud beta network-connectivity spokes gateways create - create a new
        Gateway spoke

SYNOPSIS
    gcloud beta network-connectivity spokes gateways create SPOKE
        --capacity=CAPACITY --group=GROUP --hub=HUB
        --ip-range-reservations=[CIDR_RANGE,...] --region=REGION [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--landing-network=LANDING_NETWORK] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity spokes gateways update

```text
NAME
    gcloud beta network-connectivity spokes gateways update - update a Gateway
        spoke

SYNOPSIS
    gcloud beta network-connectivity spokes gateways update
        (SPOKE : --region=REGION) [--async] [--capacity=CAPACITY]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `advertised-routes create` example omits `--advertise-to-hub`, which the SYNOPSIS and REQUIRED FLAGS list as required (gcloud 593.0.0: "Exactly one of --advertise-to-hub must be specified."); the flag takes no value ("The gateway should advertise this route toward the hub"), so the runnable form adds `--advertise-to-hub`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/spokes/gateways (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

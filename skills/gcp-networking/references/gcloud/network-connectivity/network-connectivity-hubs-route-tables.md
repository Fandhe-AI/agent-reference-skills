---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/route-tables
---

# gcloud network-connectivity hubs route-tables

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity hubs route-tables describe

```text
NAME
    gcloud network-connectivity hubs route-tables describe - describe a route
        table

SYNOPSIS
    gcloud network-connectivity hubs route-tables describe
        (ROUTE_TABLE : --hub=HUB) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display details about a route table.

EXAMPLES
    To display details about a route table named my-route-table, run:

        $ gcloud network-connectivity hubs route-tables describe \
            my-route-table

POSITIONAL ARGUMENTS
     Route table resource - Name of the route table to describe. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument route_table on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROUTE_TABLE
          ID of the route table or fully qualified identifier for the route
          table.

          To set the route_table attribute:
          + provide the argument route_table on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --hub=HUB
          Id of the hub.

          To set the hub attribute:
          + provide the argument route_table on the command line with a fully
            specified name;
          + provide the argument --hub on the command line.

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

        $ gcloud beta network-connectivity hubs route-tables describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-connectivity hubs route-tables describe my-route-table \
    --hub=my-hub
```

### gcloud network-connectivity hubs route-tables list

```text
NAME
    gcloud network-connectivity hubs route-tables list - list route tables

SYNOPSIS
    gcloud network-connectivity hubs route-tables list [--hub=HUB]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display a list of all route tables in the specified hub.

EXAMPLES
    To list all route tables across all hubs, run:

        $ gcloud network-connectivity hubs route-tables list --hub=-

    To list all route tables in hub my-hub, run:

        $ gcloud network-connectivity hubs route-tables list --hub=my-hub

FLAGS
     Hub resource - Parent hub of the route tables to display. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --hub on the command line with a fully specified
        name;
      * if hub is empty, will use the wildcard '-' to indicate all hubs with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --hub=HUB
        ID of the hub or fully qualified identifier for the hub.

        To set the hub attribute:
        * provide the argument --hub on the command line;
        * if hub is empty, will use the wildcard '-' to indicate all hubs.

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

        $ gcloud beta network-connectivity hubs route-tables list
```

### gcloud network-connectivity hubs route-tables routes describe

```text
NAME
    gcloud network-connectivity hubs route-tables routes describe - describe a
        route

SYNOPSIS
    gcloud network-connectivity hubs route-tables routes describe
        (ROUTE : --hub=HUB --route_table=ROUTE_TABLE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display details about a route.

EXAMPLES
    To display details about a route named my-route, run:

        $ gcloud network-connectivity hubs route-tables routes describe \
            my-route

POSITIONAL ARGUMENTS
     Route resource - Name of the route to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument route on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROUTE
          ID of the route or fully qualified identifier for the route.

          To set the route attribute:
          + provide the argument route on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --hub=HUB
          Id of the hub.

          To set the hub attribute:
          + provide the argument route on the command line with a fully
            specified name;
          + provide the argument --hub on the command line.

       --route_table=ROUTE_TABLE
          Id of the route table.

          To set the route_table attribute:
          + provide the argument route on the command line with a fully
            specified name;
          + provide the argument --route_table on the command line.

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

        $ gcloud beta network-connectivity hubs route-tables routes describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-connectivity hubs route-tables routes describe my-route \
    --hub=my-hub \
    --route_table=my-route-table
```

### gcloud network-connectivity hubs route-tables routes list

```text
NAME
    gcloud network-connectivity hubs route-tables routes list - list routes

SYNOPSIS
    gcloud network-connectivity hubs route-tables routes list
        [--effective-location=EFFECTIVE_LOCATION]
        [--hub=HUB --route_table=ROUTE_TABLE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display a list of all routes in the specified route table.

EXAMPLES
    To list all routes across all route tables, run:

        $ gcloud network-connectivity hubs route-tables routes list \
            --hub=- --route_table=-

    To list all routes in route table my-route-table, run:

        $ gcloud network-connectivity hubs route-tables routes list \
            --hub=my-hub --route_table=my-route-table

    To list all routes in route table my-route-table, effective at a
    location/region run:

        $ gcloud network-connectivity hubs route-tables routes list \
            --hub=my-hub --route_table=my-route-table \
            --effective-location=location

FLAGS
     --effective-location=EFFECTIVE_LOCATION
        The effective location/region to limit the list of routes. The
        effective location must be a valid region name. To list valid region
        names, use 'gcloud compute regions list'.

     Route table resource - Parent route table of the routes to display. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --route_table on the command line with a fully
        specified name;
      * if route table is empty, will use wildcard '-' to list all route
        tables with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --hub=HUB
        Id of the hub.

        To set the hub attribute:
        * provide the argument --route_table on the command line with a fully
          specified name;
        * if route table is empty, will use wildcard '-' to list all route
          tables with a fully specified name;
        * provide the argument --hub on the command line;
        * if hub is empty, will use the wildcard '-' to indicate all hubs.

     --route_table=ROUTE_TABLE
        ID of the route table or fully qualified identifier for the route
        table.

        To set the route_table attribute:
        * provide the argument --route_table on the command line;
        * if route table is empty, will use wildcard '-' to list all route
          tables .

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

        $ gcloud beta network-connectivity hubs route-tables routes list
```

### gcloud beta network-connectivity hubs route-tables describe

```text
NAME
    gcloud beta network-connectivity hubs route-tables describe - describe a
        route table

SYNOPSIS
    gcloud beta network-connectivity hubs route-tables describe
        (ROUTE_TABLE : --hub=HUB) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity hubs route-tables list

```text
NAME
    gcloud beta network-connectivity hubs route-tables list - list route tables

SYNOPSIS
    gcloud beta network-connectivity hubs route-tables list [--hub=HUB]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity hubs route-tables routes describe

```text
NAME
    gcloud beta network-connectivity hubs route-tables routes describe -
        describe a route

SYNOPSIS
    gcloud beta network-connectivity hubs route-tables routes describe
        (ROUTE : --hub=HUB --route_table=ROUTE_TABLE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity hubs route-tables routes list

```text
NAME
    gcloud beta network-connectivity hubs route-tables routes list - list
        routes

SYNOPSIS
    gcloud beta network-connectivity hubs route-tables routes list
        [--effective-location=EFFECTIVE_LOCATION]
        [--hub=HUB --route_table=ROUTE_TABLE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the route `describe` example omits `--hub` and `--route_table`, which the SYNOPSIS requires for the resource (no property sets them); gcloud 593.0.0 fails with "Failed to find attribute [hub]" without them, so the runnable form adds `--hub=my-hub --route_table=my-route-table`, the values of the `routes list` examples on this page (the SYNOPSIS spells the flag `--route_table`).
- Corrected from the official docs (runnable form only; the help text above is verbatim): the route table `describe` example omits `--hub`, which the SYNOPSIS requires for the resource (no property sets it); gcloud 593.0.0 fails with "Failed to find attribute [hub]" without it, so the runnable form adds `--hub=my-hub`, the hub of the `list` examples on this page.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/route-tables (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

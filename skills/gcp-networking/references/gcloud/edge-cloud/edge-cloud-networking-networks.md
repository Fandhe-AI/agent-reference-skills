---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/networking/networks
---

# gcloud edge-cloud networking networks

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud networking networks create

```text
NAME
    gcloud edge-cloud networking networks create - create a Distributed Cloud
        Edge Network network

SYNOPSIS
    gcloud edge-cloud networking networks create
        (NETWORK : --location=LOCATION --zone=ZONE) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]] [--mtu=MTU]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Distributed Cloud Edge Network network resource.

EXAMPLES
    To create a network called 'my-network' with MTU value of 9000 bytes in
    edge zone 'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking networks create my-network \
            --location=us-central1 --zone=us-central1-edge-den1 --mtu=9000

POSITIONAL ARGUMENTS
     Network resource - Distributed Cloud Edge Network network to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NETWORK
          ID of the network or fully qualified identifier for the network.

          To set the network attribute:
          + provide the argument network on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument network on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The name of the Google Distributed Cloud Edge zone.

          To set the zone attribute:
          + provide the argument network on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        An optional, textual description for the network.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --mtu=MTU
        Maximum transmission unit (MTU) is the size of the largest IP packet
        that can be transmitted on this network. Default value is 1500 bytes,
        and the valid values are 1500 and 9000.

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

        $ gcloud alpha edge-cloud networking networks create
```

### gcloud edge-cloud networking networks delete

```text
NAME
    gcloud edge-cloud networking networks delete - delete a Distributed Cloud
        Edge Network network

SYNOPSIS
    gcloud edge-cloud networking networks delete
        (NETWORK : --location=LOCATION --zone=ZONE) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Distributed Cloud Edge Network network.

EXAMPLES
    To delete a Distributed Cloud Edge Network network called 'my-network' in
    edge zone 'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking networks delete my-network \
            --location=us-central1 --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Network resource - Distributed Cloud Edge Network network to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NETWORK
          ID of the network or fully qualified identifier for the network.

          To set the network attribute:
          + provide the argument network on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument network on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The name of the Google Distributed Cloud Edge zone.

          To set the zone attribute:
          + provide the argument network on the command line with a fully
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

        $ gcloud alpha edge-cloud networking networks delete
```

### gcloud edge-cloud networking networks describe

```text
NAME
    gcloud edge-cloud networking networks describe - show details about the
        Distributed Cloud Edge Network network

SYNOPSIS
    gcloud edge-cloud networking networks describe
        (NETWORK : --location=LOCATION --zone=ZONE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about the Distributed Cloud Edge Network network.

EXAMPLES
    To show details about a network called 'my-network' in edge zone
    'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking networks describe my-network \
            --location=us-central1 --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Network resource - The Distributed Cloud Edge Network network you want to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NETWORK
          ID of the network or fully qualified identifier for the network.

          To set the network attribute:
          + provide the argument network on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument network on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The name of the Google Distributed Cloud Edge zone.

          To set the zone attribute:
          + provide the argument network on the command line with a fully
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

        $ gcloud alpha edge-cloud networking networks describe
```

### gcloud edge-cloud networking networks get-status

```text
NAME
    gcloud edge-cloud networking networks get-status - get the status of a
        specified Distributed Cloud Edge Network network

SYNOPSIS
    gcloud edge-cloud networking networks get-status
        (NETWORK : --location=LOCATION --zone=ZONE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the status of a specified Distributed Cloud Edge Network network.

EXAMPLES
    To get the status of the Distributed Cloud Edge Network network
    'my-network' in edge zone 'us-central1-edge-den1' , run:

        $ gcloud edge-cloud networking networks get-status my-network \
          --location=us-central1 --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Network resource - The network to get status. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NETWORK
          ID of the network or fully qualified identifier for the network.

          To set the network attribute:
          + provide the argument network on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the network.

          To set the location attribute:
          + provide the argument network on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The zone of the network.

          To set the zone attribute:
          + provide the argument network on the command line with a fully
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

        $ gcloud alpha edge-cloud networking networks get-status
```

### gcloud edge-cloud networking networks list

```text
NAME
    gcloud edge-cloud networking networks list - list Distributed Cloud Edge
        Network networks

SYNOPSIS
    gcloud edge-cloud networking networks list
        (--zone=ZONE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Distributed Cloud Edge Network networks.

EXAMPLES
    To list the Distributed Cloud Edge Network networks in edge zone
    'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking networks list \
            --location=us-central1 --zone=us-central1-edge-den1

REQUIRED FLAGS
     Zone resource - Parent Distributed Cloud Edge Network zone to list all
     contained Distributed Cloud Edge Network networks. The arguments in this
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

        $ gcloud alpha edge-cloud networking networks list
```

### gcloud alpha edge-cloud networking networks create

```text
NAME
    gcloud alpha edge-cloud networking networks create - create a Distributed
        Cloud Edge Network network

SYNOPSIS
    gcloud alpha edge-cloud networking networks create
        (NETWORK : --location=LOCATION --zone=ZONE) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]] [--mtu=MTU]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking networks delete

```text
NAME
    gcloud alpha edge-cloud networking networks delete - delete a Distributed
        Cloud Edge Network network

SYNOPSIS
    gcloud alpha edge-cloud networking networks delete
        (NETWORK : --location=LOCATION --zone=ZONE) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking networks describe

```text
NAME
    gcloud alpha edge-cloud networking networks describe - show details about
        the Distributed Cloud Edge Network network

SYNOPSIS
    gcloud alpha edge-cloud networking networks describe
        (NETWORK : --location=LOCATION --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking networks get-status

```text
NAME
    gcloud alpha edge-cloud networking networks get-status - get the status of
        a specified Distributed Cloud Edge Network network

SYNOPSIS
    gcloud alpha edge-cloud networking networks get-status
        (NETWORK : --location=LOCATION --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking networks list

```text
NAME
    gcloud alpha edge-cloud networking networks list - list Distributed Cloud
        Edge Network networks

SYNOPSIS
    gcloud alpha edge-cloud networking networks list
        (--zone=ZONE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/networking/networks (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

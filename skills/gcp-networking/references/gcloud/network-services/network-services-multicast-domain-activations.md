---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-services/multicast-domain-activations
---

# gcloud network-services multicast-domain-activations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-services multicast-domain-activations create

```text
NAME
    gcloud network-services multicast-domain-activations create - create a
        multicast domain activation

SYNOPSIS
    gcloud network-services multicast-domain-activations create
        (MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION)
        --multicast-domain=MULTICAST_DOMAIN [--async]
        [--description=DESCRIPTION] [--disable-placement-policy]
        [--labels=[KEY=VALUE,...]]
        [--aggr-egress-pps=AGGR_EGRESS_PPS
          : --aggr-ingress-pps=AGGR_INGRESS_PPS
          --avg-packet-size=AVG_PACKET_SIZE
          --max-per-group-ingress-pps=MAX_PER_GROUP_INGRESS_PPS
          --max-per-group-subscribers=MAX_PER_GROUP_SUBSCRIBERS]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a multicast domain activation in the specified location of the
    current project.

EXAMPLES
    Create a multicast domain activation with the name
    'my-multicast-domain-activation', multicast-domain 'path-to-md', and
    location 'zone'.

        $ gcloud network-services multicast-domain-activations create \
            my-multicast-domain-activation --multicast-domain=path-to-md \
            --location=zone

POSITIONAL ARGUMENTS
     Multicast domain activation resource - Name of the multicast domain
     activation to be created. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument multicast_domain_activation on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_DOMAIN_ACTIVATION
          ID of the multicast domain activation or fully qualified identifier
          for the multicast domain activation.

          To set the multicast_domain_activation attribute:
          + provide the argument multicast_domain_activation on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_domain_activation on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --multicast-domain=MULTICAST_DOMAIN
        The multicast domain to be used.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        The description for the multicast domain activation.

     --disable-placement-policy
        True to disable the use of the placement policy for this multicast
        domain activation.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --aggr-egress-pps=AGGR_EGRESS_PPS
        Aggregated egress Packet-Per-Second for all multicast groups in the
        domain in this zone.

     --aggr-ingress-pps=AGGR_INGRESS_PPS
        Aggregated ingress Packet-Per-Second for all multicast groups in the
        domain in this zone.

     --avg-packet-size=AVG_PACKET_SIZE
        Average packet size (defaults to 512 bytes).

     --max-per-group-ingress-pps=MAX_PER_GROUP_INGRESS_PPS
        Maximum ingress Packet-Per-Second for a single multicast group in this
        zone.

     --max-per-group-subscribers=MAX_PER_GROUP_SUBSCRIBERS
        Maximum number of subscribers for a single multicast group in this
        zone.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-domain-activations create

        $ gcloud beta network-services multicast-domain-activations create
```

### gcloud network-services multicast-domain-activations delete

```text
NAME
    gcloud network-services multicast-domain-activations delete - delete a
        multicast domain activation

SYNOPSIS
    gcloud network-services multicast-domain-activations delete
        (MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a multicast domain activation in the specified location of the
    current project.

EXAMPLES
    To delete a multicast domain activation in the current project, run:

        $ gcloud network-services multicast-domain-activations delete \
            my-multicast-domain-activation --location=zone

POSITIONAL ARGUMENTS
     Multicast domain activation resource - The multicast domain activation to
     delete. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument multicast_domain_activation on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_DOMAIN_ACTIVATION
          ID of the multicast domain activation or fully qualified identifier
          for the multicast domain activation.

          To set the multicast_domain_activation attribute:
          + provide the argument multicast_domain_activation on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_domain_activation on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-domain-activations delete

        $ gcloud beta network-services multicast-domain-activations delete
```

### gcloud network-services multicast-domain-activations describe

```text
NAME
    gcloud network-services multicast-domain-activations describe - describe a
        multicast domain activation

SYNOPSIS
    gcloud network-services multicast-domain-activations describe
        (MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of a multicast domain activation in the specified location of
    the current project.

EXAMPLES
    To describe details of a multicast domain activation in the current project
    and location, run:

        $ gcloud network-services multicast-domain-activations describe \
            my-multicast-domain-activation --location=zone

POSITIONAL ARGUMENTS
     Multicast domain activation resource - The multicast domain activation to
     display. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument multicast_domain_activation on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_DOMAIN_ACTIVATION
          ID of the multicast domain activation or fully qualified identifier
          for the multicast domain activation.

          To set the multicast_domain_activation attribute:
          + provide the argument multicast_domain_activation on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_domain_activation on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-domain-activations describe

        $ gcloud beta network-services multicast-domain-activations describe
```

### gcloud network-services multicast-domain-activations list

```text
NAME
    gcloud network-services multicast-domain-activations list - list multicast
        domain activations

SYNOPSIS
    gcloud network-services multicast-domain-activations list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all multicast domain activations in the specified location of the
    current project.

EXAMPLES
    To list multicast domain activations in the current project and location,
    run:

        $ gcloud network-services multicast-domain-activations list \
            --location=zone

REQUIRED FLAGS
     Location resource - The location of the multicast domains to display. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-domain-activations list

        $ gcloud beta network-services multicast-domain-activations list
```

### gcloud network-services multicast-domain-activations update

```text
NAME
    gcloud network-services multicast-domain-activations update - update a
        multicast domain activation

SYNOPSIS
    gcloud network-services multicast-domain-activations update
        (MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--aggr-egress-pps=AGGR_EGRESS_PPS --aggr-ingress-pps=AGGR_INGRESS_PPS
          --avg-packet-size=AVG_PACKET_SIZE
          --max-per-group-ingress-pps=MAX_PER_GROUP_INGRESS_PPS
          --max-per-group-subscribers=MAX_PER_GROUP_SUBSCRIBERS]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a multicast domain activation in the specified location of the
    current project.

EXAMPLES
    Update a multicast domain activation with the name
    my-multicast-domain-activation and location zone.

        $ gcloud network-services multicast-domain-activations update \
            my-multicast-domain-activation --aggr-egress-pps=10000 \
            --max-per-group-subscribers=10 --location=zone

POSITIONAL ARGUMENTS
     Multicast domain activation resource - Name of the multicast domain
     activation to be updated. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument multicast_domain_activation on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_DOMAIN_ACTIVATION
          ID of the multicast domain activation or fully qualified identifier
          for the multicast domain activation.

          To set the multicast_domain_activation attribute:
          + provide the argument multicast_domain_activation on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_domain_activation on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        The description for the multicast domain activation.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --aggr-egress-pps=AGGR_EGRESS_PPS
        Aggregated egress packets per second for all multicast groups in the
        domain in this zone.

     --aggr-ingress-pps=AGGR_INGRESS_PPS
        Aggregated ingress Packet-Per-Second for all multicast groups in the
        domain in this zone.

     --avg-packet-size=AVG_PACKET_SIZE
        Average packet size (defaults to 512 bytes).

     --max-per-group-ingress-pps=MAX_PER_GROUP_INGRESS_PPS
        Maximum ingress Packet-Per-Second for a single multicast group in this
        zone.

     --max-per-group-subscribers=MAX_PER_GROUP_SUBSCRIBERS
        Maximum number of subscribers for a single multicast group in this
        zone.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud network-services multicast-domain-activations update \
                --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-services multicast-domain-activations update \
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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-domain-activations update

        $ gcloud beta network-services multicast-domain-activations update
```

### gcloud beta network-services multicast-domain-activations create

```text
NAME
    gcloud beta network-services multicast-domain-activations create - create a
        multicast domain activation

SYNOPSIS
    gcloud beta network-services multicast-domain-activations create
        (MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION)
        --multicast-domain=MULTICAST_DOMAIN [--async]
        [--description=DESCRIPTION] [--disable-placement-policy]
        [--labels=[KEY=VALUE,...]]
        [--aggr-egress-pps=AGGR_EGRESS_PPS
          : --aggr-ingress-pps=AGGR_INGRESS_PPS
          --avg-packet-size=AVG_PACKET_SIZE
          --max-per-group-ingress-pps=MAX_PER_GROUP_INGRESS_PPS
          --max-per-group-subscribers=MAX_PER_GROUP_SUBSCRIBERS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-domain-activations delete

```text
NAME
    gcloud beta network-services multicast-domain-activations delete - delete a
        multicast domain activation

SYNOPSIS
    gcloud beta network-services multicast-domain-activations delete
        (MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-domain-activations describe

```text
NAME
    gcloud beta network-services multicast-domain-activations describe -
        describe a multicast domain activation

SYNOPSIS
    gcloud beta network-services multicast-domain-activations describe
        (MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-domain-activations list

```text
NAME
    gcloud beta network-services multicast-domain-activations list - list
        multicast domain activations

SYNOPSIS
    gcloud beta network-services multicast-domain-activations list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-domain-activations update

```text
NAME
    gcloud beta network-services multicast-domain-activations update - update a
        multicast domain activation

SYNOPSIS
    gcloud beta network-services multicast-domain-activations update
        (MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--aggr-egress-pps=AGGR_EGRESS_PPS --aggr-ingress-pps=AGGR_INGRESS_PPS
          --avg-packet-size=AVG_PACKET_SIZE
          --max-per-group-ingress-pps=MAX_PER_GROUP_INGRESS_PPS
          --max-per-group-subscribers=MAX_PER_GROUP_SUBSCRIBERS]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-domain-activations create

```text
NAME
    gcloud alpha network-services multicast-domain-activations create - create
        a multicast domain activation

SYNOPSIS
    gcloud alpha network-services multicast-domain-activations create
        (MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION)
        --multicast-domain=MULTICAST_DOMAIN [--async]
        [--description=DESCRIPTION] [--disable-placement-policy]
        [--labels=[KEY=VALUE,...]]
        [--aggr-egress-pps=AGGR_EGRESS_PPS
          : --aggr-ingress-pps=AGGR_INGRESS_PPS
          --avg-packet-size=AVG_PACKET_SIZE
          --max-per-group-ingress-pps=MAX_PER_GROUP_INGRESS_PPS
          --max-per-group-subscribers=MAX_PER_GROUP_SUBSCRIBERS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-domain-activations delete

```text
NAME
    gcloud alpha network-services multicast-domain-activations delete - delete
        a multicast domain activation

SYNOPSIS
    gcloud alpha network-services multicast-domain-activations delete
        (MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-domain-activations describe

```text
NAME
    gcloud alpha network-services multicast-domain-activations describe -
        describe a multicast domain activation

SYNOPSIS
    gcloud alpha network-services multicast-domain-activations describe
        (MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-domain-activations list

```text
NAME
    gcloud alpha network-services multicast-domain-activations list - list
        multicast domain activations

SYNOPSIS
    gcloud alpha network-services multicast-domain-activations list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-domain-activations update

```text
NAME
    gcloud alpha network-services multicast-domain-activations update - update
        a multicast domain activation

SYNOPSIS
    gcloud alpha network-services multicast-domain-activations update
        (MULTICAST_DOMAIN_ACTIVATION : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--aggr-egress-pps=AGGR_EGRESS_PPS --aggr-ingress-pps=AGGR_INGRESS_PPS
          --avg-packet-size=AVG_PACKET_SIZE
          --max-per-group-ingress-pps=MAX_PER_GROUP_INGRESS_PPS
          --max-per-group-subscribers=MAX_PER_GROUP_SUBSCRIBERS]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-services/multicast-domain-activations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

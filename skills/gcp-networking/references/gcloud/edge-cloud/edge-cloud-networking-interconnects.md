---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/networking/interconnects
---

# gcloud edge-cloud networking interconnects

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud networking interconnects attachments dedicated create

```text
NAME
    gcloud edge-cloud networking interconnects attachments dedicated create -
        create a Distributed Cloud Edge Network interconnect attachment

SYNOPSIS
    gcloud edge-cloud networking interconnects attachments dedicated create
        (INTERCONNECT_ATTACHMENT : --location=LOCATION --zone=ZONE)
        --interconnect=INTERCONNECT [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--mtu=MTU; default=1500]
        [--network=NETWORK] [--vlan-id=VLAN_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new dedicated Distributed Cloud Edge Network interconnect
    attachment.

EXAMPLES
    To create a dedicated interconnect attachment called 'my-attachment' in
    edge zone 'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking interconnects attachments dedicated \
            create my-attachment --location=us-central1 \
            --zone=us-central1-edge-den1 --interconnect=INTERCONNECT-LINK1 \
            --network=my-edge-network --vlan-id=200 --mtu=1500

POSITIONAL ARGUMENTS
     Interconnect attachment resource - Distributed Cloud Edge Network
     interconnectAttachment to create. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument interconnect_attachment on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERCONNECT_ATTACHMENT
          ID of the interconnect attachment or fully qualified identifier for
          the interconnect attachment.

          To set the interconnect_attachment attribute:
          + provide the argument interconnect_attachment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument interconnect_attachment on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The name of the Google Distributed Cloud Edge zone.

          To set the zone attribute:
          + provide the argument interconnect_attachment on the command line
            with a fully specified name;
          + provide the argument --zone on the command line.

REQUIRED FLAGS
     --interconnect=INTERCONNECT
        The underlying interconnect object that this attachment's traffic will
        traverse through.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        An optional, textual description for the interconnect attachment.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --mtu=MTU; default=1500
        Maximum transmission unit (MTU) is the size of the largest IP packet
        that can be transmitted on this attachment. Default value is 1500
        bytes, and the valid values are 1500 and 9000.

     --network=NETWORK
        The network to use for dynamic routing.

     --vlan-id=VLAN_ID
        The ID of the vlan to tag the subnetwork. Default value is 0.

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

        $ gcloud alpha edge-cloud networking interconnects attachments \
            dedicated create
```

### gcloud edge-cloud networking interconnects attachments delete

```text
NAME
    gcloud edge-cloud networking interconnects attachments delete - delete a
        Distributed Cloud Edge Network interconnect attachment

SYNOPSIS
    gcloud edge-cloud networking interconnects attachments delete
        (INTERCONNECT_ATTACHMENT : --location=LOCATION --zone=ZONE) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Distributed Cloud Edge Network interconnect attachment.

EXAMPLES
    To delete an interconnect attachment called 'my-attachment' in edge zone
    'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking interconnects attachments delete \
            my-attachment --location=us-central1 \
            --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Interconnect attachment resource - Distributed Cloud Edge Network
     interconnectAttachment to delete. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument interconnect_attachment on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERCONNECT_ATTACHMENT
          ID of the interconnect attachment or fully qualified identifier for
          the interconnect attachment.

          To set the interconnect_attachment attribute:
          + provide the argument interconnect_attachment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument interconnect_attachment on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The name of the Google Distributed Cloud Edge zone.

          To set the zone attribute:
          + provide the argument interconnect_attachment on the command line
            with a fully specified name;
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

        $ gcloud alpha edge-cloud networking interconnects attachments delete
```

### gcloud edge-cloud networking interconnects attachments describe

```text
NAME
    gcloud edge-cloud networking interconnects attachments describe - show
        details about a Distributed Cloud Edge Network interconnect attachment

SYNOPSIS
    gcloud edge-cloud networking interconnects attachments describe
        (INTERCONNECT_ATTACHMENT : --location=LOCATION --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about a Distributed Cloud Edge Network interconnect
    attachment.

EXAMPLES
    To show details about an interconnect attachment called 'my-attachment' in
    edge zone 'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking interconnects attachments describe \
            my-attachment --location=us-central1 \
            --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Interconnect attachment resource - The interconnect attachment you want to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument interconnect_attachment on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERCONNECT_ATTACHMENT
          ID of the interconnect attachment or fully qualified identifier for
          the interconnect attachment.

          To set the interconnect_attachment attribute:
          + provide the argument interconnect_attachment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument interconnect_attachment on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The name of the Google Distributed Cloud Edge zone.

          To set the zone attribute:
          + provide the argument interconnect_attachment on the command line
            with a fully specified name;
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

        $ gcloud alpha edge-cloud networking interconnects attachments \
            describe
```

### gcloud edge-cloud networking interconnects attachments list

```text
NAME
    gcloud edge-cloud networking interconnects attachments list - list
        Distributed Cloud Edge Network interconnect attachments

SYNOPSIS
    gcloud edge-cloud networking interconnects attachments list
        (--zone=ZONE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Distributed Cloud Edge Network interconnect attachments.

EXAMPLES
    To list the interconnect attachments in edge zone 'us-central1-edge-den1',
    run:

        $ gcloud edge-cloud networking interconnects attachments list \
            --location=us-central1 --zone=us-central1-edge-den1

REQUIRED FLAGS
     Zone resource - Parent Distributed Cloud Edge Network zone to list all
     contained Distributed Cloud Edge Network interconnect attachments. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

        $ gcloud alpha edge-cloud networking interconnects attachments list
```

### gcloud edge-cloud networking interconnects describe

```text
NAME
    gcloud edge-cloud networking interconnects describe - show details about
        the Distributed Cloud Edge Network interconnect

SYNOPSIS
    gcloud edge-cloud networking interconnects describe
        (INTERCONNECT : --location=LOCATION --zone=ZONE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about the Distributed Cloud Edge Network interconnect.

EXAMPLES
    To show details about an interconnect called 'my-interconnect1' in edge
    zone 'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking interconnects describe \
            my-interconnect1 --location=us-central1 \
            --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Interconnect resource - The interconnect you want to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument interconnect on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERCONNECT
          ID of the interconnect or fully qualified identifier for the
          interconnect.

          To set the interconnect attribute:
          + provide the argument interconnect on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument interconnect on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The name of the Google Distributed Cloud Edge zone.

          To set the zone attribute:
          + provide the argument interconnect on the command line with a
            fully specified name;
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

        $ gcloud alpha edge-cloud networking interconnects describe
```

### gcloud edge-cloud networking interconnects get-diagnostics

```text
NAME
    gcloud edge-cloud networking interconnects get-diagnostics - get the
        diagnostics of a specified Distributed Cloud Edge Network interconnect

SYNOPSIS
    gcloud edge-cloud networking interconnects get-diagnostics
        (INTERCONNECT : --location=LOCATION --zone=ZONE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the diagnostics of a specified Distributed Cloud Edge Network
    interconnect.

EXAMPLES
    To get the diagnostics of the Distributed Cloud Edge Network interconnect
    'my-interconnect' in edge zone 'us-central1-edge-den1' , run:

        $ gcloud edge-cloud networking interconnects get-diagnostics \
          my-interconnect --location=us-central1 \
          --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Interconnect resource - The interconnect to get diagnostics. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument interconnect on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERCONNECT
          ID of the interconnect or fully qualified identifier for the
          interconnect.

          To set the interconnect attribute:
          + provide the argument interconnect on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the interconnect.

          To set the location attribute:
          + provide the argument interconnect on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The zone of the interconnect.

          To set the zone attribute:
          + provide the argument interconnect on the command line with a
            fully specified name;
          + provide the argument --zone on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud networking interconnects get-diagnostics
```

### gcloud edge-cloud networking interconnects list

```text
NAME
    gcloud edge-cloud networking interconnects list - list Distributed Cloud
        Edge Network interconnects

SYNOPSIS
    gcloud edge-cloud networking interconnects list
        (--zone=ZONE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Distributed Cloud Edge Network interconnects.

EXAMPLES
    To list the Distributed Cloud Edge Network interconnects in edge zone
    'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking interconnects list \
            --location=us-central1 --zone=us-central1-edge-den1

REQUIRED FLAGS
     Zone resource - Parent Distributed Cloud Edge Network zone to list all
     contained Distributed Cloud Edge Network interconnects. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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

        $ gcloud alpha edge-cloud networking interconnects list
```

### gcloud alpha edge-cloud networking interconnects attachments dedicated create

```text
NAME
    gcloud alpha edge-cloud networking interconnects attachments dedicated
        create - create a Distributed Cloud Edge Network interconnect
        attachment

SYNOPSIS
    gcloud alpha edge-cloud networking interconnects attachments dedicated
        create (INTERCONNECT_ATTACHMENT : --location=LOCATION --zone=ZONE)
        --interconnect=INTERCONNECT [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [--mtu=MTU; default=1500]
        [--network=NETWORK] [--vlan-id=VLAN_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking interconnects attachments delete

```text
NAME
    gcloud alpha edge-cloud networking interconnects attachments delete -
        delete a Distributed Cloud Edge Network interconnect attachment

SYNOPSIS
    gcloud alpha edge-cloud networking interconnects attachments delete
        (INTERCONNECT_ATTACHMENT : --location=LOCATION --zone=ZONE) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking interconnects attachments describe

```text
NAME
    gcloud alpha edge-cloud networking interconnects attachments describe -
        show details about a Distributed Cloud Edge Network interconnect
        attachment

SYNOPSIS
    gcloud alpha edge-cloud networking interconnects attachments describe
        (INTERCONNECT_ATTACHMENT : --location=LOCATION --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking interconnects attachments list

```text
NAME
    gcloud alpha edge-cloud networking interconnects attachments list - list
        Distributed Cloud Edge Network interconnect attachments

SYNOPSIS
    gcloud alpha edge-cloud networking interconnects attachments list
        (--zone=ZONE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking interconnects describe

```text
NAME
    gcloud alpha edge-cloud networking interconnects describe - show details
        about the Distributed Cloud Edge Network interconnect

SYNOPSIS
    gcloud alpha edge-cloud networking interconnects describe
        (INTERCONNECT : --location=LOCATION --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking interconnects get-diagnostics

```text
NAME
    gcloud alpha edge-cloud networking interconnects get-diagnostics - get the
        diagnostics of a specified Distributed Cloud Edge Network interconnect

SYNOPSIS
    gcloud alpha edge-cloud networking interconnects get-diagnostics
        (INTERCONNECT : --location=LOCATION --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking interconnects list

```text
NAME
    gcloud alpha edge-cloud networking interconnects list - list Distributed
        Cloud Edge Network interconnects

SYNOPSIS
    gcloud alpha edge-cloud networking interconnects list
        (--zone=ZONE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/networking/interconnects (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

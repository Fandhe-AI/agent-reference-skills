---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/networking/subnets
---

# gcloud edge-cloud networking subnets

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud networking subnets create

```text
NAME
    gcloud edge-cloud networking subnets create - create a Distributed Cloud
        Edge Network subnet

SYNOPSIS
    gcloud edge-cloud networking subnets create
        (SUBNET : --location=LOCATION --zone=ZONE) --network=NETWORK [--async]
        [--description=DESCRIPTION] [--ipv4-range=[IPV4_RANGE,...]]
        [--ipv6-range=[IPV6_RANGE,...]] [--labels=[KEY=VALUE,...]]
        [--vlan-id=VLAN_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Distributed Cloud Edge Network subnet.

EXAMPLES
    To create a Distributed Cloud Edge Network subnet called my-subnet with
    VLAN ID and owned ip ranges specified in the edge zone
    'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking subnets create my-subnet \
            --network=my-network --location=us-central1 \
            --zone=us-central1-edge-den1 \
            --ipv4-range=192.168.1.1/24,172.10.10.1/24 \
            --ipv6-range=2001:db8::1/64,4001:230::1/64 --vlan-id=100 \
            --bonding-type=bonded

POSITIONAL ARGUMENTS
     Subnet resource - Distributed Cloud Edge Network subnet to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument subnet on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SUBNET
          ID of the subnet or fully qualified identifier for the subnet.

          To set the subnet attribute:
          + provide the argument subnet on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument subnet on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The name of the Google Distributed Cloud Edge zone.

          To set the zone attribute:
          + provide the argument subnet on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

REQUIRED FLAGS
     --network=NETWORK
        The network that this subnetwork belongs to.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        An optional, textual description for the subnet.

     --ipv4-range=[IPV4_RANGE,...]
        The ranges of ipv4 addresses that are owned by this subnetwork in CIDR
        format.

     --ipv6-range=[IPV6_RANGE,...]
        The ranges of ipv6 addresses that are owned by this subnetwork in CIDR
        format.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --vlan-id=VLAN_ID
        The ID of the VLAN to tag the subnetwork. If not specified we assign
        one automatically.

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

        $ gcloud alpha edge-cloud networking subnets create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud alpha edge-cloud networking subnets create my-subnet \
    --network=my-network \
    --location=us-central1 \
    --zone=us-central1-edge-den1 \
    --ipv4-range=192.168.1.1/24,172.10.10.1/24 \
    --ipv6-range=2001:db8::1/64,4001:230::1/64 \
    --vlan-id=100 \
    --bonding-type=bonded
```

### gcloud edge-cloud networking subnets delete

```text
NAME
    gcloud edge-cloud networking subnets delete - delete a Distributed Cloud
        Edge Network subnet

SYNOPSIS
    gcloud edge-cloud networking subnets delete
        (SUBNET : --location=LOCATION --zone=ZONE) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Distributed Cloud Edge Network subnet.

EXAMPLES
    To delete a subnet called 'my-subnet' in the edge zone
    'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking subnets delete my-subnet \
            --location=us-central1 --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Subnet resource - Distributed Cloud Edge Network subnet to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument subnet on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SUBNET
          ID of the subnet or fully qualified identifier for the subnet.

          To set the subnet attribute:
          + provide the argument subnet on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument subnet on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The name of the Google Distributed Cloud Edge zone.

          To set the zone attribute:
          + provide the argument subnet on the command line with a fully
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

        $ gcloud alpha edge-cloud networking subnets delete
```

### gcloud edge-cloud networking subnets describe

```text
NAME
    gcloud edge-cloud networking subnets describe - show details about the
        Distributed Cloud Edge Network subnet

SYNOPSIS
    gcloud edge-cloud networking subnets describe
        (SUBNET : --location=LOCATION --zone=ZONE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about the Distributed Cloud Edge Network subnet.

EXAMPLES
    To show details about a subnet named 'my-subnet' in the edge zone
    'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking subnets describe my-subnet \
            --location=us-central1 --zone=us-central1-edge-den1

POSITIONAL ARGUMENTS
     Subnet resource - The subnet you want to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument subnet on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SUBNET
          ID of the subnet or fully qualified identifier for the subnet.

          To set the subnet attribute:
          + provide the argument subnet on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument subnet on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --zone=ZONE
          The name of the Google Distributed Cloud Edge zone.

          To set the zone attribute:
          + provide the argument subnet on the command line with a fully
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

        $ gcloud alpha edge-cloud networking subnets describe
```

### gcloud edge-cloud networking subnets list

```text
NAME
    gcloud edge-cloud networking subnets list - list Distributed Cloud Edge
        Network subnets

SYNOPSIS
    gcloud edge-cloud networking subnets list
        (--zone=ZONE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Distributed Cloud Edge Network subnets.

EXAMPLES
    To list the subnets in the edge zone 'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking subnets list --location=us-central1 \
            --zone=us-central1-edge-den1

REQUIRED FLAGS
     Zone resource - Parent Distributed Cloud Edge Network zone to list all
     contained Distributed Cloud Edge Network subnets. The arguments in this
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

        $ gcloud alpha edge-cloud networking subnets list
```

### gcloud alpha edge-cloud networking subnets create

```text
NAME
    gcloud alpha edge-cloud networking subnets create - create a Distributed
        Cloud Edge Network subnet

SYNOPSIS
    gcloud alpha edge-cloud networking subnets create
        (SUBNET : --location=LOCATION --zone=ZONE) --network=NETWORK [--async]
        [--bonding-type=BONDING_TYPE] [--description=DESCRIPTION]
        [--ipv4-range=[IPV4_RANGE,...]] [--ipv6-range=[IPV6_RANGE,...]]
        [--labels=[KEY=VALUE,...]] [--vlan-id=VLAN_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking subnets delete

```text
NAME
    gcloud alpha edge-cloud networking subnets delete - delete a Distributed
        Cloud Edge Network subnet

SYNOPSIS
    gcloud alpha edge-cloud networking subnets delete
        (SUBNET : --location=LOCATION --zone=ZONE) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking subnets describe

```text
NAME
    gcloud alpha edge-cloud networking subnets describe - show details about
        the Distributed Cloud Edge Network subnet

SYNOPSIS
    gcloud alpha edge-cloud networking subnets describe
        (SUBNET : --location=LOCATION --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud networking subnets list

```text
NAME
    gcloud alpha edge-cloud networking subnets list - list Distributed Cloud
        Edge Network subnets

SYNOPSIS
    gcloud alpha edge-cloud networking subnets list
        (--zone=ZONE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` example passes `--bonding-type=bonded`, which the GA SYNOPSIS does not list (gcloud 593.0.0: "--bonding-type flag is available in one or more alternate release tracks. Try: gcloud alpha edge-cloud networking subnets create --bonding-type"); the `gcloud alpha edge-cloud networking subnets create` SYNOPSIS on this page lists `[--bonding-type=BONDING_TYPE]`, so the runnable form runs the alpha command.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/networking/subnets (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/dns-threat-detectors
---

# gcloud network-security dns-threat-detectors

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security dns-threat-detectors create

```text
NAME
    gcloud network-security dns-threat-detectors create - create a
        DnsThreatDetector resource

SYNOPSIS
    gcloud network-security dns-threat-detectors create
        (DNS_THREAT_DETECTOR : --location=LOCATION) --provider=PROVIDER
        [--excluded-networks=[EXCLUDED_NETWORKS,...]] [--labels=[LABELS,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a DnsThreatDetector resource.

EXAMPLES
    To create DnsThreatDetector resource my-dns-threat-detector, and using the
    Infoblox threat detection engine, run:

        $ gcloud network-security dns-threat-detectors create \
            --location=global --provider=infoblox my-dns-threat-detector

POSITIONAL ARGUMENTS
     DnsThreatDetector resource - Identifier. Name of the DnsThreatDetector
     resource. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument dns_threat_detector on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DNS_THREAT_DETECTOR
          ID of the dnsThreatDetector or fully qualified identifier for the
          dnsThreatDetector.

          To set the dns_threat_detector attribute:
          + provide the argument dns_threat_detector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the dnsThreatDetector resource.

          To set the location attribute:
          + provide the argument dns_threat_detector on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --provider=PROVIDER
        The provider used for DNS threat analysis. PROVIDER must be (only one
        value is supported):

         infoblox
            The Infoblox DNS threat detector provider.

OPTIONAL FLAGS
     Network resource - A list of network resource names which aren't monitored
     by this DnsThreatDetector.

     Example: projects/PROJECT_ID/global/networks/NETWORK_NAME. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --excluded-networks on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --excluded-networks=[EXCLUDED_NETWORKS,...]
        IDs of the networks or fully qualified identifiers for the networks.

        To set the network attribute:
        * provide the argument --excluded-networks on the command line.

     --labels=[LABELS,...]
        Any labels associated with the DnsThreatDetector, listed as key value
        pairs.

         KEY
            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

         VALUE
            Values must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

        Shorthand Example:

            --labels=string=string

        JSON Example:

            --labels='{"string": "string"}'

        File Example:

            --labels=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security dns-threat-detectors create

        $ gcloud beta network-security dns-threat-detectors create
```

### gcloud network-security dns-threat-detectors delete

```text
NAME
    gcloud network-security dns-threat-detectors delete - delete a
        DnsThreatDetector resource

SYNOPSIS
    gcloud network-security dns-threat-detectors delete
        (DNS_THREAT_DETECTOR : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a DnsThreatDetector resource.

EXAMPLES
    To delete DnsThreatDetector resource my-dns-threat-detector, run:

        $ gcloud network-security dns-threat-detectors delete \
            --location=global my-dns-threat-detector

POSITIONAL ARGUMENTS
     DnsThreatDetector resource - Name of the DnsThreatDetector resource. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument dns_threat_detector on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DNS_THREAT_DETECTOR
          ID of the dnsThreatDetector or fully qualified identifier for the
          dnsThreatDetector.

          To set the dns_threat_detector attribute:
          + provide the argument dns_threat_detector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the dnsThreatDetector resource.

          To set the location attribute:
          + provide the argument dns_threat_detector on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security dns-threat-detectors delete

        $ gcloud beta network-security dns-threat-detectors delete
```

### gcloud network-security dns-threat-detectors describe

```text
NAME
    gcloud network-security dns-threat-detectors describe - describe a
        DnsThreatDetector resource

SYNOPSIS
    gcloud network-security dns-threat-detectors describe
        (DNS_THREAT_DETECTOR : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets details of a DnsThreatDetector resource.

EXAMPLES
    To get details of DnsThreatDetector resource my-dns-threat-detector, run:

        $ gcloud network-security dns-threat-detectors describe \
            --location=global my-dns-threat-detector

POSITIONAL ARGUMENTS
     DnsThreatDetector resource - Name of the DnsThreatDetector resource. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument dns_threat_detector on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DNS_THREAT_DETECTOR
          ID of the dnsThreatDetector or fully qualified identifier for the
          dnsThreatDetector.

          To set the dns_threat_detector attribute:
          + provide the argument dns_threat_detector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the dnsThreatDetector resource.

          To set the location attribute:
          + provide the argument dns_threat_detector on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security dns-threat-detectors describe

        $ gcloud beta network-security dns-threat-detectors describe
```

### gcloud network-security dns-threat-detectors list

```text
NAME
    gcloud network-security dns-threat-detectors list - list DnsThreatDetector
        resources

SYNOPSIS
    gcloud network-security dns-threat-detectors list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all DnsThreatDetector resources.

EXAMPLES
    To list all DnsThreatDetector resources, run:

        $ gcloud network-security dns-threat-detectors list --location=global

REQUIRED FLAGS
     Location resource - The parent value for ListDnsThreatDetectorsRequest.
     This represents a Cloud resource. (NOTE) Some attributes are not given
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
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security dns-threat-detectors list

        $ gcloud beta network-security dns-threat-detectors list
```

### gcloud network-security dns-threat-detectors update

```text
NAME
    gcloud network-security dns-threat-detectors update - update a
        DnsThreatDetector resource

SYNOPSIS
    gcloud network-security dns-threat-detectors update
        (DNS_THREAT_DETECTOR : --location=LOCATION) [--provider=PROVIDER]
        [--excluded-networks=[EXCLUDED_NETWORKS,...]
          | --add-excluded-networks=[ADD_EXCLUDED_NETWORKS,...]
          --clear-excluded-networks
          | --remove-excluded-networks=[REMOVE_EXCLUDED_NETWORKS,...]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a DnsThreatDetector resource.

EXAMPLES
    To update DnsThreatDetector resource my-dns-threat-detector with an
    additional excluded network, run:

        $ gcloud network-security dns-threat-detectors update \
            --location=global \
            --add-excluded-networks=projects/.../global/networks/\
        my-excluded-network my-dns-threat-detector

POSITIONAL ARGUMENTS
     DnsThreatDetector resource - Identifier. Name of the DnsThreatDetector
     resource. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument dns_threat_detector on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DNS_THREAT_DETECTOR
          ID of the dnsThreatDetector or fully qualified identifier for the
          dnsThreatDetector.

          To set the dns_threat_detector attribute:
          + provide the argument dns_threat_detector on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the dnsThreatDetector resource.

          To set the location attribute:
          + provide the argument dns_threat_detector on the command line with
            a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --provider=PROVIDER
        The provider used for DNS threat analysis. PROVIDER must be (only one
        value is supported):

         infoblox
            The Infoblox DNS threat detector provider.

     Update excluded_networks.

     At most one of these can be specified:

       Network resource - Set excluded_networks to new value.

       A list of network resource names which aren't monitored by this
       DnsThreatDetector.

       Example: projects/PROJECT_ID/global/networks/NETWORK_NAME. This
       represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --excluded-networks on the command line with a
          fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       --excluded-networks=[EXCLUDED_NETWORKS,...]
          IDs of the networks or fully qualified identifiers for the networks.

          To set the network attribute:
          + provide the argument --excluded-networks on the command line.

       Network resource - Add new value to excluded_networks list.

       A list of network resource names which aren't monitored by this
       DnsThreatDetector.

       Example: projects/PROJECT_ID/global/networks/NETWORK_NAME. This
       represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --add-excluded-networks on the command line
          with a fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       --add-excluded-networks=[ADD_EXCLUDED_NETWORKS,...]
          IDs of the networks or fully qualified identifiers for the networks.

          To set the network attribute:
          + provide the argument --add-excluded-networks on the command line.

       At most one of these can be specified:

         --clear-excluded-networks
            Clear excluded_networks value and set to empty list.

         Or at least one of these can be specified:

           Network resource - Remove value from excluded_networks list.

           A list of network resource names which aren't monitored by this
           DnsThreatDetector.

           Example: projects/PROJECT_ID/global/networks/NETWORK_NAME. This
           represents a Cloud resource. (NOTE) Some attributes are not given
           arguments in this group but can be set in other ways.

           To set the project attribute:
            o provide the argument --remove-excluded-networks on the command
              line with a fully specified name;
            o provide the argument --project on the command line;
            o set the property core/project.

           --remove-excluded-networks=[REMOVE_EXCLUDED_NETWORKS,...]
              IDs of the networks or fully qualified identifiers for the
              networks.

              To set the network attribute:
              o provide the argument --remove-excluded-networks on the
                command line.

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. Any labels associated with the
          DnsThreatDetector, listed as key value pairs.

           KEY
              Keys must start with a lowercase character and contain only
              hyphens (-), underscores (_), lowercase characters, and numbers.

           VALUE
              Values must contain only hyphens (-), underscores (_), lowercase
              characters, and numbers.

          Shorthand Example:

              --labels=string=string

          JSON Example:

              --labels='{"string": "string"}'

          File Example:

              --labels=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --update-labels=[UPDATE_LABELS,...]
            Update labels value or add key value pair. Any labels associated
            with the DnsThreatDetector, listed as key value pairs.

             KEY
                Keys must start with a lowercase character and contain only
                hyphens (-), underscores (_), lowercase characters, and
                numbers.

             VALUE
                Values must contain only hyphens (-), underscores (_),
                lowercase characters, and numbers.

            Shorthand Example:

                --update-labels=string=string

            JSON Example:

                --update-labels='{"string": "string"}'

            File Example:

                --update-labels=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-labels
              Clear labels value and set to empty map.

           --remove-labels=REMOVE_LABELS
              Remove existing value from map labels. Sets remove_labels value.

              Shorthand Example:

                  --remove-labels=string,string

              JSON Example:

                  --remove-labels=["string"]

              File Example:

                  --remove-labels=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security dns-threat-detectors update

        $ gcloud beta network-security dns-threat-detectors update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security dns-threat-detectors update \
    --location=global \
    --add-excluded-networks=projects/.../global/networks/my-excluded-network my-dns-threat-detector
```

### gcloud beta network-security dns-threat-detectors create

```text
NAME
    gcloud beta network-security dns-threat-detectors create - create a
        DnsThreatDetector resource

SYNOPSIS
    gcloud beta network-security dns-threat-detectors create
        (DNS_THREAT_DETECTOR : --location=LOCATION) --provider=PROVIDER
        [--excluded-networks=[EXCLUDED_NETWORKS,...]] [--labels=[LABELS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security dns-threat-detectors delete

```text
NAME
    gcloud beta network-security dns-threat-detectors delete - delete a
        DnsThreatDetector resource

SYNOPSIS
    gcloud beta network-security dns-threat-detectors delete
        (DNS_THREAT_DETECTOR : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security dns-threat-detectors describe

```text
NAME
    gcloud beta network-security dns-threat-detectors describe - describe a
        DnsThreatDetector resource

SYNOPSIS
    gcloud beta network-security dns-threat-detectors describe
        (DNS_THREAT_DETECTOR : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security dns-threat-detectors list

```text
NAME
    gcloud beta network-security dns-threat-detectors list - list
        DnsThreatDetector resources

SYNOPSIS
    gcloud beta network-security dns-threat-detectors list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security dns-threat-detectors update

```text
NAME
    gcloud beta network-security dns-threat-detectors update - update a
        DnsThreatDetector resource

SYNOPSIS
    gcloud beta network-security dns-threat-detectors update
        (DNS_THREAT_DETECTOR : --location=LOCATION) [--provider=PROVIDER]
        [--excluded-networks=[EXCLUDED_NETWORKS,...]
          | --add-excluded-networks=[ADD_EXCLUDED_NETWORKS,...]
          --clear-excluded-networks
          | --remove-excluded-networks=[REMOVE_EXCLUDED_NETWORKS,...]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security dns-threat-detectors create

```text
NAME
    gcloud alpha network-security dns-threat-detectors create - create a
        DnsThreatDetector resource

SYNOPSIS
    gcloud alpha network-security dns-threat-detectors create
        (DNS_THREAT_DETECTOR : --location=LOCATION) --provider=PROVIDER
        [--excluded-networks=[EXCLUDED_NETWORKS,...]] [--labels=[LABELS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security dns-threat-detectors delete

```text
NAME
    gcloud alpha network-security dns-threat-detectors delete - delete a
        DnsThreatDetector resource

SYNOPSIS
    gcloud alpha network-security dns-threat-detectors delete
        (DNS_THREAT_DETECTOR : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security dns-threat-detectors describe

```text
NAME
    gcloud alpha network-security dns-threat-detectors describe - describe a
        DnsThreatDetector resource

SYNOPSIS
    gcloud alpha network-security dns-threat-detectors describe
        (DNS_THREAT_DETECTOR : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security dns-threat-detectors list

```text
NAME
    gcloud alpha network-security dns-threat-detectors list - list
        DnsThreatDetector resources

SYNOPSIS
    gcloud alpha network-security dns-threat-detectors list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security dns-threat-detectors update

```text
NAME
    gcloud alpha network-security dns-threat-detectors update - update a
        DnsThreatDetector resource

SYNOPSIS
    gcloud alpha network-security dns-threat-detectors update
        (DNS_THREAT_DETECTOR : --location=LOCATION) [--provider=PROVIDER]
        [--excluded-networks=[EXCLUDED_NETWORKS,...]
          | --add-excluded-networks=[ADD_EXCLUDED_NETWORKS,...]
          --clear-excluded-networks
          | --remove-excluded-networks=[REMOVE_EXCLUDED_NETWORKS,...]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/dns-threat-detectors (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

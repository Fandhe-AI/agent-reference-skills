---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/multicloud-data-transfer-configs/destinations
---

# gcloud network-connectivity multicloud-data-transfer-configs destinations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity multicloud-data-transfer-configs destinations create

```text
NAME
    gcloud network-connectivity multicloud-data-transfer-configs destinations
        create - create a destination

SYNOPSIS
    gcloud network-connectivity multicloud-data-transfer-configs destinations
        create
        (DESTINATION : --location=LOCATION
          --multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG)
        --endpoints=[asn=ASN],[csp=CSP] --ip-prefix=IP_PREFIX [--async]
        [--description=DESCRIPTION] [--etag=ETAG] [--labels=[LABELS,...]]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a destination

EXAMPLES
    To create the destination, run:

    $ gcloud network-connectivity multicloud-data-transfer-configs \        destinations create destination-1 \
        --multicloud-data-transfer-config=config-1 \
        --location=europe-west1 \
        --description="Multicloud Data Transfer destination \
        description" --ip-prefix="10.1.1.0/24" \
        --endpoints=asn=8075,csp=microsoft

POSITIONAL ARGUMENTS
     Destination resource - Identifier. The name of the Destination resource.
     Format:
     projects/{project}/locations/{location}/multicloudDataTransferConfigs/{multicloud_data_transfer_config}/destinations/{destination}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument destination on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DESTINATION
          ID of the destination or fully qualified identifier for the
          destination.

          To set the destination attribute:
          + provide the argument destination on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the destination resource.

          To set the location attribute:
          + provide the argument destination on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG
          The multicloudDataTransferConfig id of the destination resource.

          To set the multicloud-data-transfer-config attribute:
          + provide the argument destination on the command line with a fully
            specified name;
          + provide the argument --multicloud-data-transfer-config on the
            command line.

REQUIRED FLAGS
     --endpoints=[asn=ASN],[csp=CSP]
        Required, The list of DestinationEndpoint resources configured for the
        IP prefix.

         asn
            The ASN of the remote IP prefix.

         csp
            The CSP of the remote IP prefix.

        Shorthand Example:

            --endpoints=asn=int,csp=string --endpoints=asn=int,csp=string

        JSON Example:

            --endpoints='[{"asn": int, "csp": "string"}]'

        File Example:

            --endpoints=path_to_file.(yaml|json)

     --ip-prefix=IP_PREFIX
        The IP prefix that represents your workload on another CSP.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A description of this resource.

     --etag=ETAG
        The etag is computed by the server, and might be sent with update and
        delete requests so that the client has an up-to-date value before
        proceeding.

     --labels=[LABELS,...]
        User-defined labels.

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

     --request-id=REQUEST_ID
        A request ID to identify requests. Specify a unique request ID so that
        if you must retry your request, the server can ignore the request if it
        has already been completed. The server waits for at least 60 minutes
        since the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, can ignore the second request. This
        prevents clients from accidentally creating duplicate Destination
        resources.

        The request ID must be a valid UUID with the exception that zero UUID
        (00000000-0000-0000-0000-000000000000) isn't supported.

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

        $ gcloud beta network-connectivity \
            multicloud-data-transfer-configs destinations create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity multicloud-data-transfer-configs destinations create destination-1 \
    --multicloud-data-transfer-config=config-1 \
    --location=europe-west1 \
    --description="Multicloud Data Transfer destination description" \
    --ip-prefix="10.1.1.0/24" \
    --endpoints=asn=8075,csp=microsoft
```

### gcloud network-connectivity multicloud-data-transfer-configs destinations delete

```text
NAME
    gcloud network-connectivity multicloud-data-transfer-configs destinations
        delete - delete a destination

SYNOPSIS
    gcloud network-connectivity multicloud-data-transfer-configs destinations
        delete
        (DESTINATION : --location=LOCATION
          --multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG)
        [--async] [--etag=ETAG] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a destination

EXAMPLES
    To delete the destination, run:

    $ gcloud network-connectivity multicloud-data-transfer-configs \        destinations delete destination-1 \
        --multicloud-data-transfer-config=config-1 \
        --location=europe-west1

POSITIONAL ARGUMENTS
     Destination resource - The name of the Destination resource to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument destination on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DESTINATION
          ID of the destination or fully qualified identifier for the
          destination.

          To set the destination attribute:
          + provide the argument destination on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the destination resource.

          To set the location attribute:
          + provide the argument destination on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG
          The multicloudDataTransferConfig id of the destination resource.

          To set the multicloud-data-transfer-config attribute:
          + provide the argument destination on the command line with a fully
            specified name;
          + provide the argument --multicloud-data-transfer-config on the
            command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        The etag is computed by the server, and might be sent with update and
        delete requests so that the client has an up-to-date value before
        proceeding.

     --request-id=REQUEST_ID
        A request ID to identify requests. Specify a unique request ID so that
        if you must retry your request, the server can ignore the request if it
        has already been completed. The server waits for at least 60 minutes
        since the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, can ignore the second request.

        The request ID must be a valid UUID with the exception that zero UUID
        (00000000-0000-0000-0000-000000000000) isn't supported.

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

        $ gcloud beta network-connectivity \
            multicloud-data-transfer-configs destinations delete
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity multicloud-data-transfer-configs destinations delete destination-1 \
    --multicloud-data-transfer-config=config-1 \
    --location=europe-west1
```

### gcloud network-connectivity multicloud-data-transfer-configs destinations describe

```text
NAME
    gcloud network-connectivity multicloud-data-transfer-configs destinations
        describe - describe a destination

SYNOPSIS
    gcloud network-connectivity multicloud-data-transfer-configs destinations
        describe
        (DESTINATION : --location=LOCATION
          --multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a destination

EXAMPLES
    To describe the destination, run:

    $ gcloud network-connectivity multicloud-data-transfer-configs \        destinations describe destination-1 \
        --multicloud-data-transfer-config=config-1 \
        --location=europe-west1

POSITIONAL ARGUMENTS
     Destination resource - The name of the Destination resource to get. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument destination on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DESTINATION
          ID of the destination or fully qualified identifier for the
          destination.

          To set the destination attribute:
          + provide the argument destination on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the destination resource.

          To set the location attribute:
          + provide the argument destination on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG
          The multicloudDataTransferConfig id of the destination resource.

          To set the multicloud-data-transfer-config attribute:
          + provide the argument destination on the command line with a fully
            specified name;
          + provide the argument --multicloud-data-transfer-config on the
            command line.

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

        $ gcloud beta network-connectivity \
            multicloud-data-transfer-configs destinations describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity multicloud-data-transfer-configs destinations describe destination-1 \
    --multicloud-data-transfer-config=config-1 \
    --location=europe-west1
```

### gcloud network-connectivity multicloud-data-transfer-configs destinations list

```text
NAME
    gcloud network-connectivity multicloud-data-transfer-configs destinations
        list - list destinations

SYNOPSIS
    gcloud network-connectivity multicloud-data-transfer-configs destinations
        list
        (--multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG
          : --location=LOCATION) [--return-partial-success]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List destinations

EXAMPLES
    To list all destinations, run:

    $ gcloud network-connectivity multicloud-data-transfer-configs \        destinations list --multicloud-data-transfer-config=config-1 \
        --location=europe-west1

REQUIRED FLAGS
     MulticloudDataTransferConfig resource - The name of the parent resource.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --multicloud-data-transfer-config on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG
          ID of the multicloudDataTransferConfig or fully qualified identifier
          for the multicloudDataTransferConfig.

          To set the multicloud-data-transfer-config attribute:
          + provide the argument --multicloud-data-transfer-config on the
            command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location id of the multicloudDataTransferConfig resource.

          To set the location attribute:
          + provide the argument --multicloud-data-transfer-config on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --return-partial-success
        If true, allow partial responses for multi-regional aggregated list
        requests.

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
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity \
            multicloud-data-transfer-configs destinations list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity multicloud-data-transfer-configs destinations list \
    --multicloud-data-transfer-config=config-1 \
    --location=europe-west1
```

### gcloud network-connectivity multicloud-data-transfer-configs destinations update

```text
NAME
    gcloud network-connectivity multicloud-data-transfer-configs destinations
        update - update a destination

SYNOPSIS
    gcloud network-connectivity multicloud-data-transfer-configs destinations
        update
        (DESTINATION : --location=LOCATION
          --multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG)
        [--async] [--description=DESCRIPTION] [--etag=ETAG]
        [--request-id=REQUEST_ID]
        [--endpoints=[asn=ASN],[csp=CSP]
          | --add-endpoints=[asn=ASN],[csp=CSP] --clear-endpoints
          | --remove-endpoints=[asn=ASN],[csp=CSP]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a destination

EXAMPLES
    To update the destination, run:

    $ gcloud network-connectivity multicloud-data-transfer-configs \        destinations update destination-1 \
        --multicloud-data-transfer-config=config-1 \
        --location=europe-west1 \
        --description="Multicloud Data Transfer destination description \
        updated" --endpoints=asn=16509,csp=aws

POSITIONAL ARGUMENTS
     Destination resource - Identifier. The name of the Destination resource.
     Format:
     projects/{project}/locations/{location}/multicloudDataTransferConfigs/{multicloud_data_transfer_config}/destinations/{destination}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument destination on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DESTINATION
          ID of the destination or fully qualified identifier for the
          destination.

          To set the destination attribute:
          + provide the argument destination on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the destination resource.

          To set the location attribute:
          + provide the argument destination on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG
          The multicloudDataTransferConfig id of the destination resource.

          To set the multicloud-data-transfer-config attribute:
          + provide the argument destination on the command line with a fully
            specified name;
          + provide the argument --multicloud-data-transfer-config on the
            command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A description of this resource.

     --etag=ETAG
        The etag is computed by the server, and might be sent with update and
        delete requests so that the client has an up-to-date value before
        proceeding.

     --request-id=REQUEST_ID
        A request ID to identify requests. Specify a unique request ID so that
        if you must retry your request, the server can ignore the request if it
        has already been completed. The server waits for at least 60 minutes
        since the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, can ignore the second request.

        The request ID must be a valid UUID with the exception that zero UUID
        (00000000-0000-0000-0000-000000000000) isn't supported.

     Update endpoints.

     At most one of these can be specified:

       --endpoints=[asn=ASN],[csp=CSP]
          Set endpoints to new value. The list of DestinationEndpoint resources
          configured for the IP prefix.

           asn
              The ASN of the remote IP prefix.

           csp
              The CSP of the remote IP prefix.

          Shorthand Example:

              --endpoints=asn=int,csp=string --endpoints=asn=int,csp=string

          JSON Example:

              --endpoints='[{"asn": int, "csp": "string"}]'

          File Example:

              --endpoints=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-endpoints=[asn=ASN],[csp=CSP]
            Add new value to endpoints list. The list of DestinationEndpoint
            resources configured for the IP prefix.

             asn
                The ASN of the remote IP prefix.

             csp
                The CSP of the remote IP prefix.

            Shorthand Example:

                --add-endpoints=asn=int,csp=string --add-endpoints=asn=int,csp=string

            JSON Example:

                --add-endpoints='[{"asn": int, "csp": "string"}]'

            File Example:

                --add-endpoints=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-endpoints
              Clear endpoints value and set to empty list.

           --remove-endpoints=[asn=ASN],[csp=CSP]
              Remove existing value from endpoints list. The list of
              DestinationEndpoint resources configured for the IP prefix.

               asn
                  The ASN of the remote IP prefix.

               csp
                  The CSP of the remote IP prefix.

              Shorthand Example:

                  --remove-endpoints=asn=int,csp=string --remove-endpoints=asn=int,csp=string

              JSON Example:

                  --remove-endpoints='[{"asn": int, "csp": "string"}]'

              File Example:

                  --remove-endpoints=path_to_file.(yaml|json)

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. User-defined labels.

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
            Update labels value or add key value pair. User-defined labels.

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
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity \
            multicloud-data-transfer-configs destinations update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity multicloud-data-transfer-configs destinations update destination-1 \
    --multicloud-data-transfer-config=config-1 \
    --location=europe-west1 \
    --description="Multicloud Data Transfer destination description updated" \
    --endpoints=asn=16509,csp=aws
```

### gcloud beta network-connectivity multicloud-data-transfer-configs destinations create

```text
NAME
    gcloud beta network-connectivity multicloud-data-transfer-configs
        destinations create - create destinations

SYNOPSIS
    gcloud beta network-connectivity multicloud-data-transfer-configs
        destinations create
        (DESTINATION : --location=LOCATION
          --multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG)
        --endpoints=[asn=ASN],[csp=CSP] --ip-prefix=IP_PREFIX [--async]
        [--description=DESCRIPTION] [--etag=ETAG] [--labels=[LABELS,...]]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity multicloud-data-transfer-configs destinations delete

```text
NAME
    gcloud beta network-connectivity multicloud-data-transfer-configs
        destinations delete - delete destinations

SYNOPSIS
    gcloud beta network-connectivity multicloud-data-transfer-configs
        destinations delete
        (DESTINATION : --location=LOCATION
          --multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG)
        [--async] [--etag=ETAG] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity multicloud-data-transfer-configs destinations describe

```text
NAME
    gcloud beta network-connectivity multicloud-data-transfer-configs
        destinations describe - describe destinations

SYNOPSIS
    gcloud beta network-connectivity multicloud-data-transfer-configs
        destinations describe
        (DESTINATION : --location=LOCATION
          --multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity multicloud-data-transfer-configs destinations list

```text
NAME
    gcloud beta network-connectivity multicloud-data-transfer-configs
        destinations list - list destinations

SYNOPSIS
    gcloud beta network-connectivity multicloud-data-transfer-configs
        destinations list
        (--multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG
          : --location=LOCATION) [--return-partial-success]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity multicloud-data-transfer-configs destinations update

```text
NAME
    gcloud beta network-connectivity multicloud-data-transfer-configs
        destinations update - update destinations

SYNOPSIS
    gcloud beta network-connectivity multicloud-data-transfer-configs
        destinations update
        (DESTINATION : --location=LOCATION
          --multicloud-data-transfer-config=MULTICLOUD_DATA_TRANSFER_CONFIG)
        [--async] [--description=DESCRIPTION] [--etag=ETAG]
        [--request-id=REQUEST_ID]
        [--endpoints=[asn=ASN],[csp=CSP]
          | --add-endpoints=[asn=ASN],[csp=CSP] --clear-endpoints
          | --remove-endpoints=[asn=ASN],[csp=CSP]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/multicloud-data-transfer-configs/destinations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

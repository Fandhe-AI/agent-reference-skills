---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/regional-endpoints
---

# gcloud network-connectivity regional-endpoints

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity regional-endpoints create

```text
NAME
    gcloud network-connectivity regional-endpoints create - create a new
        regional endpoint

SYNOPSIS
    gcloud network-connectivity regional-endpoints create
        (REGIONAL_ENDPOINT : --region=REGION)
        --target-google-api=TARGET_GOOGLE_API [--address=ADDRESS] [--async]
        [--description=DESCRIPTION] [--enable-global-access]
        [--labels=[KEY=VALUE,...]] [--network=NETWORK]
        [--subnetwork=SUBNETWORK] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new regional endpoint with the given name.

EXAMPLES
    To create a regional endpoint with the name 'my-regional-endpoint' in
    us-central1 targeting my-target-endpoint, run:

        $ gcloud network-connectivity regional-endpoints create \
            my-regional-endpoint --region=us-central1 \
            [--address=my-address] [--network=my-network] \
            [--subnetwork=my-subnet] \
            --target-google-api=my-target-endpoint [--enable-global-access]

POSITIONAL ARGUMENTS
     RegionalEndpoint resource - Name of the regional endpoint to be created.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument regional_endpoint on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REGIONAL_ENDPOINT
          ID of the regionalEndpoint or fully qualified identifier for the
          regionalEndpoint.

          To set the regional_endpoint attribute:
          + provide the argument regional_endpoint on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument regional_endpoint on the command line with a
            fully specified name;
          + provide the argument --region on the command line.

REQUIRED FLAGS
     --target-google-api=TARGET_GOOGLE_API
        The service endpoint the regional endpoint will connect to.

OPTIONAL FLAGS
     --address=ADDRESS
        The IP Address of the Regional Endpoint. When no address is provided,
        an IP from the subnetwork is allocated. Use one of the following
        formats:
        * IPv4 address as in 10.0.0.1
        * Address resource URI as in
          projects/{project}/regions/{region}/addresses/{address_name} for an
          IPv4 or IPv6 address.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the regional endpoint.

     --enable-global-access
        Whether the REGIONAL or GLOBAL access is enabled.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --network=NETWORK
        Consumer's VPC network that this regional endpoint belongs to.

     --subnetwork=SUBNETWORK
        The name of the subnetwork from which the IP address will be allocated.

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

        $ gcloud beta network-connectivity regional-endpoints create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-connectivity regional-endpoints create my-regional-endpoint \
    --region=us-central1 \
    --address=my-address \
    --network=my-network \
    --subnetwork=my-subnet \
    --target-google-api=my-target-endpoint \
    --enable-global-access
```

### gcloud network-connectivity regional-endpoints delete

```text
NAME
    gcloud network-connectivity regional-endpoints delete - delete a regional
        endpoint

SYNOPSIS
    gcloud network-connectivity regional-endpoints delete
        (REGIONAL_ENDPOINT : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified regional endpoint.

EXAMPLES
    To delete a regional endpoint named 'my-regional-endpoint' in us-central1:

        $ gcloud network-connectivity regional-endpoints delete \
            my-regional-endpoint --region=us-central1

POSITIONAL ARGUMENTS
     RegionalEndpoint resource - Name of the regional endpoint to be deleted.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument regional_endpoint on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REGIONAL_ENDPOINT
          ID of the regionalEndpoint or fully qualified identifier for the
          regionalEndpoint.

          To set the regional_endpoint attribute:
          + provide the argument regional_endpoint on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument regional_endpoint on the command line with a
            fully specified name;
          + provide the argument --region on the command line.

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

        $ gcloud beta network-connectivity regional-endpoints delete
```

### gcloud network-connectivity regional-endpoints describe

```text
NAME
    gcloud network-connectivity regional-endpoints describe - describe a
        regional endpoint

SYNOPSIS
    gcloud network-connectivity regional-endpoints describe
        (REGIONAL_ENDPOINT : --region=REGION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display details about a regional endpoint.

EXAMPLES
    Display details about a regional endpoint named 'my-regional-endpoint' in
    us-central1:

        $ gcloud network-connectivity regional-endpoints describe \
            my-regional-endpoint --region=us-central1 [--project=my-project]

POSITIONAL ARGUMENTS
     RegionalEndpoint resource - Name of the regional endpoint to be described.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument regional_endpoint on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REGIONAL_ENDPOINT
          ID of the regionalEndpoint or fully qualified identifier for the
          regionalEndpoint.

          To set the regional_endpoint attribute:
          + provide the argument regional_endpoint on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument regional_endpoint on the command line with a
            fully specified name;
          + provide the argument --region on the command line.

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

        $ gcloud beta network-connectivity regional-endpoints describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-connectivity regional-endpoints describe my-regional-endpoint \
    --region=us-central1 \
    --project=my-project
```

### gcloud network-connectivity regional-endpoints list

```text
NAME
    gcloud network-connectivity regional-endpoints list - list regional
        endpoints

SYNOPSIS
    gcloud network-connectivity regional-endpoints list --region=REGION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display a list of all regional endpoints in the specified
    project.

EXAMPLES
    To list all regional endpoints in us-central1, run:

        $ gcloud network-connectivity regional-endpoints list \
            --region=us-central1 [--project=my-project]

REQUIRED FLAGS
     Region resource - Region of the regional endpoints to display. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --region=REGION
          ID of the region or fully qualified identifier for the region.

          To set the region attribute:
          + provide the argument --region on the command line.

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

        $ gcloud beta network-connectivity regional-endpoints list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-connectivity regional-endpoints list \
    --region=us-central1 \
    --project=my-project
```

### gcloud beta network-connectivity regional-endpoints create

```text
NAME
    gcloud beta network-connectivity regional-endpoints create - create a new
        regional endpoint

SYNOPSIS
    gcloud beta network-connectivity regional-endpoints create
        (REGIONAL_ENDPOINT : --region=REGION)
        --target-google-api=TARGET_GOOGLE_API [--address=ADDRESS] [--async]
        [--description=DESCRIPTION] [--enable-global-access]
        [--labels=[KEY=VALUE,...]] [--network=NETWORK]
        [--subnetwork=SUBNETWORK] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity regional-endpoints delete

```text
NAME
    gcloud beta network-connectivity regional-endpoints delete - delete a
        regional endpoint

SYNOPSIS
    gcloud beta network-connectivity regional-endpoints delete
        (REGIONAL_ENDPOINT : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity regional-endpoints describe

```text
NAME
    gcloud beta network-connectivity regional-endpoints describe - describe a
        regional endpoint

SYNOPSIS
    gcloud beta network-connectivity regional-endpoints describe
        (REGIONAL_ENDPOINT : --region=REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity regional-endpoints list

```text
NAME
    gcloud beta network-connectivity regional-endpoints list - list regional
        endpoints

SYNOPSIS
    gcloud beta network-connectivity regional-endpoints list --region=REGION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): optional flags shown in square brackets in the example are written without the brackets.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/regional-endpoints (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

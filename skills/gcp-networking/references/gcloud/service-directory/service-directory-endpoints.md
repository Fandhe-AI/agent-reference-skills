---
source: https://docs.cloud.google.com/sdk/gcloud/reference/service-directory/endpoints
---

# gcloud service-directory endpoints

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud service-directory endpoints create

```text
NAME
    gcloud service-directory endpoints create - creates an endpoint

SYNOPSIS
    gcloud service-directory endpoints create
        (ENDPOINT
          : --location=LOCATION --namespace=NAMESPACE --service=SERVICE)
        [--address=ADDRESS] [--annotations=[KEY=VALUE,...]] [--network=NETWORK]
        [--port=PORT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates an endpoint.

EXAMPLES
    To create a Service Directory endpoint, run:

        $ gcloud service-directory endpoints create my-endpoint \
            --service=my-service --namespace=my-namespace \
            --location=us-east1 --address=1.2.3.4 --port=5 \
            --annotations=a=b,c=d \
            --network=projects/123456789/locations/global/networks/default

POSITIONAL ARGUMENTS
     Endpoint resource - The Service Directory endpoint to create. The endpoint
     id must be 1-63 characters long and match the regular expression
     [a-z](?:[-a-z0-9]{0,61}[a-z0-9])? which means the first character must be
     a lowercase letter, and all following characters must be a dash, lowercase
     letter, or digit, except the last character, which cannot be a dash. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument endpoint on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       ENDPOINT
          ID of the endpoint or fully qualified identifier for the endpoint.

          To set the endpoint attribute:
          + provide the argument endpoint on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the endpoint.

          To set the location attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The name of the namespace for the endpoint.

          To set the namespace attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

       --service=SERVICE
          The name of the service for the endpoint.

          To set the service attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --service on the command line.

FLAGS
     --address=ADDRESS
        IPv4 or IPv6 address of the endpoint. The default is empty string.

     --annotations=[KEY=VALUE,...]
        Annotations for the endpoint.

        Annotations take the form of key/value string pairs. Keys are composed
        of an optional prefix and a name segment, separated by a slash(/).
        Prefixes and names must be composed of alphanumeric characters, dashes,
        and dots. Names may also use underscores. There are no character
        restrictions on what may go into the value of an annotation. The entire
        dictionary is limited to 512 characters, spread across all key-value
        pairs.

     --network=NETWORK
        Specifies the Google Compute Engine Network (VPC) of the Endpoint.
        Network and Project existence is not checked. Example:
        projects/<PROJECT_NUM>/locations/global/networks/<NETWORK_NAME> The
        default is empty string.

     --port=PORT
        Port that the endpoint is running on, must be in the range of [0,
        65535]. The default is 0.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory endpoints create

        $ gcloud beta service-directory endpoints create
```

### gcloud service-directory endpoints delete

```text
NAME
    gcloud service-directory endpoints delete - deletes an endpoint

SYNOPSIS
    gcloud service-directory endpoints delete
        (ENDPOINT
          : --location=LOCATION --namespace=NAMESPACE --service=SERVICE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes an endpoint.

EXAMPLES
    To delete a Service Directory endpoint, run:

        $ gcloud service-directory endpoints delete my-endpoint \
            --service=my-service --namespace=my-namespace \
            --location=us-east1

POSITIONAL ARGUMENTS
     Endpoint resource - The Service Directory endpoint to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument endpoint on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       ENDPOINT
          ID of the endpoint or fully qualified identifier for the endpoint.

          To set the endpoint attribute:
          + provide the argument endpoint on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the endpoint.

          To set the location attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The name of the namespace for the endpoint.

          To set the namespace attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

       --service=SERVICE
          The name of the service for the endpoint.

          To set the service attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --service on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory endpoints delete

        $ gcloud beta service-directory endpoints delete
```

### gcloud service-directory endpoints describe

```text
NAME
    gcloud service-directory endpoints describe - describes an endpoint

SYNOPSIS
    gcloud service-directory endpoints describe
        (ENDPOINT
          : --location=LOCATION --namespace=NAMESPACE --service=SERVICE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes an endpoint.

EXAMPLES
    To describe a Service Directory endpoint, run:

        $ gcloud service-directory endpoints describe my-endpoint \
            --service=my-service --namespace=my-namespace \
            --location=us-east1

POSITIONAL ARGUMENTS
     Endpoint resource - The Service Directory endpoint to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument endpoint on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       ENDPOINT
          ID of the endpoint or fully qualified identifier for the endpoint.

          To set the endpoint attribute:
          + provide the argument endpoint on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the endpoint.

          To set the location attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The name of the namespace for the endpoint.

          To set the namespace attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

       --service=SERVICE
          The name of the service for the endpoint.

          To set the service attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --service on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory endpoints describe

        $ gcloud beta service-directory endpoints describe
```

### gcloud service-directory endpoints list

```text
NAME
    gcloud service-directory endpoints list - lists endpoints

SYNOPSIS
    gcloud service-directory endpoints list
        (--service=SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--filter=EXPRESSION] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists endpoints.

EXAMPLES
    To list Service Directory endpoints, run:

        $ gcloud service-directory endpoints list --service=my-service \
            --namespace=my-namespace --location=us-east1

REQUIRED FLAGS
     Service resource - The Service Directory service to list The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument --service on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       --service=SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument --service on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The name of the region for the service.

          To set the location attribute:
          + provide the argument --service on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The name of the namespace for the service.

          To set the namespace attribute:
          + provide the argument --service on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
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

NOTES
    These variants are also available:

        $ gcloud alpha service-directory endpoints list

        $ gcloud beta service-directory endpoints list
```

### gcloud service-directory endpoints update

```text
NAME
    gcloud service-directory endpoints update - updates an endpoint

SYNOPSIS
    gcloud service-directory endpoints update
        (ENDPOINT
          : --location=LOCATION --namespace=NAMESPACE --service=SERVICE)
        [--address=ADDRESS] [--annotations=[KEY=VALUE,...]] [--port=PORT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates an endpoint.

EXAMPLES
    To update a Service Directory endpoint, run:

        $ gcloud service-directory endpoints update my-endpoint \
            --service=my-service --namespace=my-namespace \
            --location=us-east1 --address=1.2.3.4 --port=5 \
            --annotations=a=b,c=d

POSITIONAL ARGUMENTS
     Endpoint resource - The Service Directory endpoint to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument endpoint on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       ENDPOINT
          ID of the endpoint or fully qualified identifier for the endpoint.

          To set the endpoint attribute:
          + provide the argument endpoint on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The name of the region for the endpoint.

          To set the location attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The name of the namespace for the endpoint.

          To set the namespace attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

       --service=SERVICE
          The name of the service for the endpoint.

          To set the service attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --service on the command line.

FLAGS
     --address=ADDRESS
        IPv4 or IPv6 address of the endpoint. The default is empty string.

     --annotations=[KEY=VALUE,...]
        Annotations for the endpoint.

        Annotations take the form of key/value string pairs. Keys are composed
        of an optional prefix and a name segment, separated by a slash(/).
        Prefixes and names must be composed of alphanumeric characters, dashes,
        and dots. Names may also use underscores. There are no character
        restrictions on what may go into the value of an annotation. The entire
        dictionary is limited to 512 characters, spread across all key-value
        pairs.

     --port=PORT
        Port that the endpoint is running on, must be in the range of [0,
        65535]. The default is 0.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha service-directory endpoints update

        $ gcloud beta service-directory endpoints update
```

### gcloud beta service-directory endpoints create

```text
NAME
    gcloud beta service-directory endpoints create - creates an endpoint

SYNOPSIS
    gcloud beta service-directory endpoints create
        (ENDPOINT
          : --location=LOCATION --namespace=NAMESPACE --service=SERVICE)
        [--address=ADDRESS] [--metadata=[KEY=VALUE,...]] [--network=NETWORK]
        [--port=PORT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory endpoints delete

```text
NAME
    gcloud beta service-directory endpoints delete - deletes an endpoint

SYNOPSIS
    gcloud beta service-directory endpoints delete
        (ENDPOINT
          : --location=LOCATION --namespace=NAMESPACE --service=SERVICE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory endpoints describe

```text
NAME
    gcloud beta service-directory endpoints describe - describes an endpoint

SYNOPSIS
    gcloud beta service-directory endpoints describe
        (ENDPOINT
          : --location=LOCATION --namespace=NAMESPACE --service=SERVICE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory endpoints list

```text
NAME
    gcloud beta service-directory endpoints list - lists endpoints

SYNOPSIS
    gcloud beta service-directory endpoints list
        (--service=SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--filter=EXPRESSION] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-directory endpoints update

```text
NAME
    gcloud beta service-directory endpoints update - updates an endpoint

SYNOPSIS
    gcloud beta service-directory endpoints update
        (ENDPOINT
          : --location=LOCATION --namespace=NAMESPACE --service=SERVICE)
        [--address=ADDRESS] [--metadata=[KEY=VALUE,...]] [--port=PORT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory endpoints create

```text
NAME
    gcloud alpha service-directory endpoints create - creates an endpoint

SYNOPSIS
    gcloud alpha service-directory endpoints create
        (ENDPOINT
          : --location=LOCATION --namespace=NAMESPACE --service=SERVICE)
        [--address=ADDRESS] [--metadata=[KEY=VALUE,...]] [--network=NETWORK]
        [--port=PORT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory endpoints delete

```text
NAME
    gcloud alpha service-directory endpoints delete - deletes an endpoint

SYNOPSIS
    gcloud alpha service-directory endpoints delete
        (ENDPOINT
          : --location=LOCATION --namespace=NAMESPACE --service=SERVICE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory endpoints describe

```text
NAME
    gcloud alpha service-directory endpoints describe - describes an endpoint

SYNOPSIS
    gcloud alpha service-directory endpoints describe
        (ENDPOINT
          : --location=LOCATION --namespace=NAMESPACE --service=SERVICE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory endpoints list

```text
NAME
    gcloud alpha service-directory endpoints list - lists endpoints

SYNOPSIS
    gcloud alpha service-directory endpoints list
        (--service=SERVICE : --location=LOCATION --namespace=NAMESPACE)
        [--filter=EXPRESSION] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-directory endpoints update

```text
NAME
    gcloud alpha service-directory endpoints update - updates an endpoint

SYNOPSIS
    gcloud alpha service-directory endpoints update
        (ENDPOINT
          : --location=LOCATION --namespace=NAMESPACE --service=SERVICE)
        [--address=ADDRESS] [--metadata=[KEY=VALUE,...]] [--port=PORT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/service-directory/endpoints (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

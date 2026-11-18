---
source: https://docs.cloud.google.com/sdk/gcloud/reference/parametermanager/parameters/versions
---

# gcloud parametermanager parameters versions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud parametermanager parameters versions create

```text
NAME
    gcloud parametermanager parameters versions create - creates an Parameter
        Manager parameter version

SYNOPSIS
    gcloud parametermanager parameters versions create
        (PARAMETER_VERSION : --location=LOCATION --parameter=PARAMETER)
        ((--payload-data=PAYLOAD_DATA | --payload-data-from-file=PATH_TO_FILE))
        [--disabled] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new parameter version using the provided parameter data.

EXAMPLES
    To create a parameter version my-parameter-version of parameter
    my-parameter in location global run:

        $ gcloud parametermanager parameters versions create \
            my-parameter-version --parameter=my-parameter --location=global

POSITIONAL ARGUMENTS
     ParameterVersion resource - Identifier. [Output only] The resource name of
     the ParameterVersion in the format
     projects/*/locations/*/parameters/*/versions/*. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument parameter_version on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PARAMETER_VERSION
          ID of the parameterVersion or fully qualified identifier for the
          parameterVersion.

          To set the parameter_version attribute:
          + provide the argument parameter_version on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the parameterVersion resource.

          To set the location attribute:
          + provide the argument parameter_version on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --parameter=PARAMETER
          The parameter id of the parameterVersion resource.

          To set the parameter attribute:
          + provide the argument parameter_version on the command line with a
            fully specified name;
          + provide the argument --parameter on the command line.

REQUIRED FLAGS
     Message for storing a ParameterVersion resource's payload data

     This must be specified.

       Exactly one of these must be specified:

         --payload-data=PAYLOAD_DATA
            bytes data for storing payload.

         --payload-data-from-file=PATH_TO_FILE
            bytes data for storing payload. Use a full or relative path to a
            local file containing the value of payload_data.

OPTIONAL FLAGS
     --disabled
        Disabled boolean to determine if a ParameterVersion acts as a metadata
        only resource (payload is never returned if disabled is true). If true
        any calls will always default to BASIC view even if the user explicitly
        passes FULL view as part of the request. A render call on a disabled
        resource fails with an error. Default value is False.

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server will
        guarantee that for at least 60 minutes since the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the parametermanager/v1 API. The full documentation for
    this API can be found at:
    https://cloud.google.com/secret-manager/parameter-manager/docs/overview

NOTES
    This variant is also available:

        $ gcloud beta parametermanager parameters versions create
```

### gcloud parametermanager parameters versions delete

```text
NAME
    gcloud parametermanager parameters versions delete - deletes a single
        Parameter Manager parameter version

SYNOPSIS
    gcloud parametermanager parameters versions delete
        (PARAMETER_VERSION : --location=LOCATION --parameter=PARAMETER)
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a single parameter version along with its metadata. This action is
    irreversible.

EXAMPLES
    To delete a parameter version my-parameter-version of parameter
    my-parameter in location global run:

        $ gcloud parametermanager parameters versions delete \
            my-parameter-version --parameter=my-parameter --location=global

POSITIONAL ARGUMENTS
     ParameterVersion resource - Name of the resource in the format
     projects/*/locations/*/parameters/*/versions/*. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument parameter_version on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PARAMETER_VERSION
          ID of the parameterVersion or fully qualified identifier for the
          parameterVersion.

          To set the parameter_version attribute:
          + provide the argument parameter_version on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the parameterVersion resource.

          To set the location attribute:
          + provide the argument parameter_version on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --parameter=PARAMETER
          The parameter id of the parameterVersion resource.

          To set the parameter attribute:
          + provide the argument parameter_version on the command line with a
            fully specified name;
          + provide the argument --parameter on the command line.

FLAGS
     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server will
        guarantee that for at least 60 minutes after the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the parametermanager/v1 API. The full documentation for
    this API can be found at:
    https://cloud.google.com/secret-manager/parameter-manager/docs/overview

NOTES
    This variant is also available:

        $ gcloud beta parametermanager parameters versions delete
```

### gcloud parametermanager parameters versions describe

```text
NAME
    gcloud parametermanager parameters versions describe - gets a single
        Parameter Manager parameter version

SYNOPSIS
    gcloud parametermanager parameters versions describe
        (PARAMETER_VERSION : --location=LOCATION --parameter=PARAMETER)
        [--view=VIEW] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets a single parameter version, along with payload supplied by the user at
    the time of creation. If the payload contains any references to secrets,
    these will not be rendered in the output.

EXAMPLES
    To get a single parameter version my-parameter-version of parameter
    my-parameter in location global run:

        $ gcloud parametermanager parameters versions describe \
            my-parameter-version --parameter=my-parameter --location=global

POSITIONAL ARGUMENTS
     ParameterVersion resource - Name of the resource in the format
     projects/*/locations/*/parameters/*/versions/*. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument parameter_version on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PARAMETER_VERSION
          ID of the parameterVersion or fully qualified identifier for the
          parameterVersion.

          To set the parameter_version attribute:
          + provide the argument parameter_version on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the parameterVersion resource.

          To set the location attribute:
          + provide the argument parameter_version on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --parameter=PARAMETER
          The parameter id of the parameterVersion resource.

          To set the parameter attribute:
          + provide the argument parameter_version on the command line with a
            fully specified name;
          + provide the argument --parameter on the command line.

FLAGS
     --view=VIEW
        View of the ParameterVersion. In the default FULL view, all metadata &
        payload associated with the ParameterVersion will be returned. VIEW
        must be one of:

         basic
            Include only the metadata for the resource.
         full
            Include metadata & other relevant payload data as well. This is the
            default view.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the parametermanager/v1 API. The full documentation for
    this API can be found at:
    https://cloud.google.com/secret-manager/parameter-manager/docs/overview

NOTES
    This variant is also available:

        $ gcloud beta parametermanager parameters versions describe
```

### gcloud parametermanager parameters versions list

```text
NAME
    gcloud parametermanager parameters versions list - list Parameter Manager
        parameter versions

SYNOPSIS
    gcloud parametermanager parameters versions list
        (--parameter=PARAMETER : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all parameter versions belonging to a parameter and their status.

EXAMPLES
    To list all parameter versions of a parameter my-parameter in location
    global run:

        $ gcloud parametermanager parameters versions list \
            --parameter=my-parameter --location=global

REQUIRED FLAGS
     Parameter resource - Parent value for ListParameterVersionsRequest in the
     format projects/*/locations/*/parameters/*. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --parameter on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --parameter=PARAMETER
          ID of the parameter or fully qualified identifier for the parameter.

          To set the parameter attribute:
          + provide the argument --parameter on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location id of the parameter resource.

          To set the location attribute:
          + provide the argument --parameter on the command line with a fully
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
    This command uses the parametermanager/v1 API. The full documentation for
    this API can be found at:
    https://cloud.google.com/secret-manager/parameter-manager/docs/overview

NOTES
    This variant is also available:

        $ gcloud beta parametermanager parameters versions list
```

### gcloud parametermanager parameters versions render

```text
NAME
    gcloud parametermanager parameters versions render - gets a single
        Parameter Manager parameter version render

SYNOPSIS
    gcloud parametermanager parameters versions render
        (PARAMETER_VERSION : --location=LOCATION --parameter=PARAMETER)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets a single parameter version render resource.

EXAMPLES
    To get a single parameter version render my-parameter-version of a
    parameter my-parameter in location global run:

        $ gcloud parametermanager parameters versions render \
            my-parameter-version --parameter=my-parameter --location=global

POSITIONAL ARGUMENTS
     ParameterVersion resource - Name of the resource The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument parameter_version on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PARAMETER_VERSION
          ID of the parameterVersion or fully qualified identifier for the
          parameterVersion.

          To set the parameter_version attribute:
          + provide the argument parameter_version on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the parameterVersion resource.

          To set the location attribute:
          + provide the argument parameter_version on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --parameter=PARAMETER
          The parameter id of the parameterVersion resource.

          To set the parameter attribute:
          + provide the argument parameter_version on the command line with a
            fully specified name;
          + provide the argument --parameter on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the parametermanager/v1 API. The full documentation for
    this API can be found at:
    https://cloud.google.com/secret-manager/parameter-manager/docs/overview

NOTES
    This variant is also available:

        $ gcloud beta parametermanager parameters versions render
```

### gcloud parametermanager parameters versions update

```text
NAME
    gcloud parametermanager parameters versions update - updates the properties
        of a single Parameter Manager parameter version

SYNOPSIS
    gcloud parametermanager parameters versions update
        (PARAMETER_VERSION : --location=LOCATION --parameter=PARAMETER)
        [--[no-]disabled] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates the properties of a single parameter version, including status of
    the parameter version (enabled/disabled).

EXAMPLES
    To update a parameter version my-parameter-version of parameter
    my-parameter in location global run:

        $ gcloud parametermanager parameters versions update \
            my-parameter-version --parameter=my-parameter --location=global

POSITIONAL ARGUMENTS
     ParameterVersion resource - Identifier. [Output only] The resource name of
     the ParameterVersion in the format
     projects/*/locations/*/parameters/*/versions/*. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument parameter_version on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PARAMETER_VERSION
          ID of the parameterVersion or fully qualified identifier for the
          parameterVersion.

          To set the parameter_version attribute:
          + provide the argument parameter_version on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the parameterVersion resource.

          To set the location attribute:
          + provide the argument parameter_version on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --parameter=PARAMETER
          The parameter id of the parameterVersion resource.

          To set the parameter attribute:
          + provide the argument parameter_version on the command line with a
            fully specified name;
          + provide the argument --parameter on the command line.

FLAGS
     --[no-]disabled
        Disabled boolean to determine if a ParameterVersion acts as a metadata
        only resource (payload is never returned if disabled is true). If true
        any calls will always default to BASIC view even if the user explicitly
        passes FULL view as part of the request. A render call on a disabled
        resource fails with an error. Default value is False. Use --disabled to
        enable and --no-disabled to disable.

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server will
        guarantee that for at least 60 minutes since the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the parametermanager/v1 API. The full documentation for
    this API can be found at:
    https://cloud.google.com/secret-manager/parameter-manager/docs/overview

NOTES
    This variant is also available:

        $ gcloud beta parametermanager parameters versions update
```

### gcloud beta parametermanager parameters versions create

```text
NAME
    gcloud beta parametermanager parameters versions create - creates an
        Parameter Manager parameter version

SYNOPSIS
    gcloud beta parametermanager parameters versions create
        (PARAMETER_VERSION : --location=LOCATION --parameter=PARAMETER)
        ((--payload-data=PAYLOAD_DATA | --payload-data-from-file=PATH_TO_FILE))
        [--disabled] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager parameters versions delete

```text
NAME
    gcloud beta parametermanager parameters versions delete - deletes a single
        Parameter Manager parameter version

SYNOPSIS
    gcloud beta parametermanager parameters versions delete
        (PARAMETER_VERSION : --location=LOCATION --parameter=PARAMETER)
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager parameters versions describe

```text
NAME
    gcloud beta parametermanager parameters versions describe - gets a single
        Parameter Manager parameter version

SYNOPSIS
    gcloud beta parametermanager parameters versions describe
        (PARAMETER_VERSION : --location=LOCATION --parameter=PARAMETER)
        [--view=VIEW] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager parameters versions list

```text
NAME
    gcloud beta parametermanager parameters versions list - list Parameter
        Manager parameter versions

SYNOPSIS
    gcloud beta parametermanager parameters versions list
        (--parameter=PARAMETER : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager parameters versions render

```text
NAME
    gcloud beta parametermanager parameters versions render - gets a single
        Parameter Manager parameter version render

SYNOPSIS
    gcloud beta parametermanager parameters versions render
        (PARAMETER_VERSION : --location=LOCATION --parameter=PARAMETER)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta parametermanager parameters versions update

```text
NAME
    gcloud beta parametermanager parameters versions update - updates the
        properties of a single Parameter Manager parameter version

SYNOPSIS
    gcloud beta parametermanager parameters versions update
        (PARAMETER_VERSION : --location=LOCATION --parameter=PARAMETER)
        [--[no-]disabled] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Incomplete example: the `gcloud parametermanager parameters versions create` example omits `--payload-data` and `--payload-data-from-file`, one of which the SYNOPSIS requires (gcloud 593.0.0: "Exactly one of (--payload-data | --payload-data-from-file) must be specified."). Add one of them (see FLAGS on this page).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/parametermanager/parameters/versions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

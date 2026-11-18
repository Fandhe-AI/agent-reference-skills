---
source: https://docs.cloud.google.com/sdk/gcloud/reference/parametermanager/parameters/delete
---

# gcloud parametermanager parameters delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud parametermanager parameters delete

```text
NAME
    gcloud parametermanager parameters delete - deletes a single Parameter
        Manager parameter resource

SYNOPSIS
    gcloud parametermanager parameters delete (PARAMETER : --location=LOCATION)
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a parameter. This action is irreversible.

EXAMPLES
    To delete a parameter my-parameter in location global run:

        $ gcloud parametermanager parameters delete my-parameter \
            --location=global

POSITIONAL ARGUMENTS
     Parameter resource - Name of the resource in the format
     projects/*/locations/*/parameters/*. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument parameter on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PARAMETER
          ID of the parameter or fully qualified identifier for the parameter.

          To set the parameter attribute:
          + provide the argument parameter on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the parameter resource.

          To set the location attribute:
          + provide the argument parameter on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

        $ gcloud beta parametermanager parameters delete
```

### gcloud beta parametermanager parameters delete

```text
NAME
    gcloud beta parametermanager parameters delete - deletes a single Parameter
        Manager parameter resource

SYNOPSIS
    gcloud beta parametermanager parameters delete
        (PARAMETER : --location=LOCATION) [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/parametermanager/parameters/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

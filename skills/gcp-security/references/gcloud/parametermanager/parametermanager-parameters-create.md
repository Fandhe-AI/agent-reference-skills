---
source: https://docs.cloud.google.com/sdk/gcloud/reference/parametermanager/parameters/create
---

# gcloud parametermanager parameters create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud parametermanager parameters create

```text
NAME
    gcloud parametermanager parameters create - creates a Parameter Manager
        parameter

SYNOPSIS
    gcloud parametermanager parameters create PARAMETER [--labels=[LABELS,...]]
        [--location=LOCATION] [--parameter-format=PARAMETER_FORMAT]
        [--request-id=REQUEST_ID] [--kms-key=KMS_KEY : --key-ring=KEY_RING]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a parameter resource with the specified name and properties. If a
    parameter of the given name already exists, this command will return an
    error.

EXAMPLES
    To create a parameter my-parameter in location global run:

        $ gcloud parametermanager parameters create my-parameter \
            --location=global

POSITIONAL ARGUMENTS
     Parameter resource - Identifier. [Output only] The resource name of the
     Parameter in the format projects/*/locations/*/parameters/*. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument parameter on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument parameter on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       PARAMETER
          ID of the parameter or fully qualified identifier for the parameter.

          To set the parameter attribute:
          + provide the argument parameter on the command line.

FLAGS
     --labels=[LABELS,...]
        Labels as key value pairs.

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

     --location=LOCATION
        For resources [parameter, kms-key], provides fallback value for
        resource location attribute. When the resource's full URI path is not
        provided, location will fallback to this flag value.

     --parameter-format=PARAMETER_FORMAT
        Specifies the format of a Parameter. PARAMETER_FORMAT must be one of:

         json
            JSON format.
         unformatted
            Unformatted.
         yaml
            YAML format.

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

     Arguments for the kms key.

     CryptoKey resource - Customer managed encryption key (CMEK) to use for
     encrypting the Parameter Versions. If not set, the default Google-managed
     encryption key will be used. Cloud KMS CryptoKeys must reside in the same
     location as the Parameter. The expected format is
     projects/*/locations/*/keyRings/*/cryptoKeys/*. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --kms-key on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --kms-key on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     --kms-key=KMS_KEY
        ID of the cryptoKey or fully qualified identifier for the cryptoKey.

        To set the crypto-key attribute:
        * provide the argument --kms-key on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --key-ring=KEY_RING
        The keyRing id of the cryptoKey resource.

        To set the key-ring attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --key-ring on the command line.

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

        $ gcloud beta parametermanager parameters create
```

### gcloud beta parametermanager parameters create

```text
NAME
    gcloud beta parametermanager parameters create - creates a Parameter
        Manager parameter

SYNOPSIS
    gcloud beta parametermanager parameters create PARAMETER
        [--labels=[LABELS,...]] [--location=LOCATION]
        [--parameter-format=PARAMETER_FORMAT] [--request-id=REQUEST_ID]
        [--tags=[TAGS,...]] [--kms-key=KMS_KEY : --key-ring=KEY_RING]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/parametermanager/parameters/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

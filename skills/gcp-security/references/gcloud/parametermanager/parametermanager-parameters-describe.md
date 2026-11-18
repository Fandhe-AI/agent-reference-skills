---
source: https://docs.cloud.google.com/sdk/gcloud/reference/parametermanager/parameters/describe
---

# gcloud parametermanager parameters describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud parametermanager parameters describe

```text
NAME
    gcloud parametermanager parameters describe - gets a single Parameter
        Manager parameter

SYNOPSIS
    gcloud parametermanager parameters describe
        (PARAMETER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets a single parameter resource.

EXAMPLES
    To get a single parameter my-parameter in location global run:

        $ gcloud parametermanager parameters describe my-parameter \
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

        $ gcloud beta parametermanager parameters describe
```

### gcloud beta parametermanager parameters describe

```text
NAME
    gcloud beta parametermanager parameters describe - gets a single Parameter
        Manager parameter

SYNOPSIS
    gcloud beta parametermanager parameters describe
        (PARAMETER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/parametermanager/parameters/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

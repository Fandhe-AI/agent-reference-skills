---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/operations
---

# gcloud artifacts operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts operations describe

```text
NAME
    gcloud artifacts operations describe - describe an Artifact Registry
        operation

SYNOPSIS
    gcloud artifacts operations describe (OPERATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Artifact Registry operation given the operation id.

    This command can fail for the following reasons:
      o The operation specified does not exist.
      o The active account does not have permission to access the given
        operation.

EXAMPLES
    The following command describes an operation with id
    06d2817d-6566-47c3-88a0-295ef51eb434:

        $ gcloud artifacts operations describe \
            06d2817d-6566-47c3-88a0-295ef51eb434

POSITIONAL ARGUMENTS
     Operation resource - The Artifact Registry operation to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the operation. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/

NOTES
    These variants are also available:

        $ gcloud alpha artifacts operations describe

        $ gcloud beta artifacts operations describe
```

### gcloud beta artifacts operations describe

```text
NAME
    gcloud beta artifacts operations describe - describe an Artifact Registry
        operation

SYNOPSIS
    gcloud beta artifacts operations describe (OPERATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts operations describe

```text
NAME
    gcloud alpha artifacts operations describe - describe an Artifact Registry
        operation

SYNOPSIS
    gcloud alpha artifacts operations describe
        (OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

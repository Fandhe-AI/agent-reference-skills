---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bms/operations
---

# gcloud bms operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bms operations describe

```text
NAME
    gcloud bms operations describe - show metadata for a Bare Metal Solution
        operation

SYNOPSIS
    gcloud bms operations describe (OPERATION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all metadata associated with a Bare Metal Solution operation given
    a valid operation name.

EXAMPLES
    To display the metadata for an operation named my-operation, run:

        $ gcloud bms operations describe my-operation

POSITIONAL ARGUMENTS
     Operation resource - Arguments and flags that specify the Bare Metal
     Solution operation you want to describe. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

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

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + global is the only supported location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the baremetalsolution/v2 API. The full documentation for
    this API can be found at: https://cloud.google.com/bare-metal
```

### gcloud bms operations wait

```text
NAME
    gcloud bms operations wait - poll a long-running Bare Metal Solution
        operation until it completes

SYNOPSIS
    gcloud bms operations wait (OPERATION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Poll a long-running Bare Metal Solution operation until it completes. When
    the operation is complete, this command will display the results of the
    operation.

EXAMPLES
    To poll a long-running Bare Metal Solution operation named 'my-operation'
    until it completes, run the following:

        $ gcloud bms operations wait my-operation

POSITIONAL ARGUMENTS
     Operation resource - Arguments and flags that specify the Bare Metal
     Solution operation you want to wait for. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

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

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + global is the only supported location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the baremetalsolution/v2 API. The full documentation for
    this API can be found at: https://cloud.google.com/bare-metal
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bms/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

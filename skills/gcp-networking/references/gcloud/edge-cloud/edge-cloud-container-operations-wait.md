---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/operations/wait
---

# gcloud edge-cloud container operations wait

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud container operations wait

```text
NAME
    gcloud edge-cloud container operations wait - poll long-running edge
        container operation until it completes

SYNOPSIS
    gcloud edge-cloud container operations wait
        (OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Poll a long-running edge container operation until it completes. When the
    operation is complete, this command will display the results of the
    analysis.

EXAMPLES
    To poll a long-running edge container operation named
    'projects/my-project/locations/us-east1/operations/123' until it completes,
    run the following:

        $ gcloud edge-cloud container operations wait \
            projects/my-project/locations/us-east1/operations/123

POSITIONAL ARGUMENTS
     Operation resource - ID for the operation to poll until complete. The
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
          The global location name.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property edge_container/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud container operations wait
```

### gcloud alpha edge-cloud container operations wait

```text
NAME
    gcloud alpha edge-cloud container operations wait - poll long-running edge
        container operation until it completes

SYNOPSIS
    gcloud alpha edge-cloud container operations wait
        (OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/operations/wait (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

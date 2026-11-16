---
source: https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/operations
---

# gcloud cluster-director operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud cluster-director operations describe

```text
NAME
    gcloud cluster-director operations describe - describe operations

SYNOPSIS
    gcloud cluster-director operations describe
        (OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an operation

EXAMPLES
    To describe the operation my-operation in location us-central1-a, run:

        $ gcloud cluster-director operations describe my-operation \
            --location=us-central1-a

POSITIONAL ARGUMENTS
     Operation resource - The name of the operation resource. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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
          The location id of the operation resource.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the hypercomputecluster/v1 API. The full documentation
    for this API can be found at:
    https://docs.cloud.google.com/cluster-director/docs

NOTES
    These variants are also available:

        $ gcloud alpha cluster-director operations describe

        $ gcloud beta cluster-director operations describe
```

### gcloud beta cluster-director operations describe

```text
NAME
    gcloud beta cluster-director operations describe - describe operations

SYNOPSIS
    gcloud beta cluster-director operations describe
        (OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha cluster-director operations describe

```text
NAME
    gcloud alpha cluster-director operations describe - describe operations

SYNOPSIS
    gcloud alpha cluster-director operations describe
        (OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

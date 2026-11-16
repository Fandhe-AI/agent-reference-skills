---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/operations/describe
---

# gcloud container hub operations describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub operations describe

```text
NAME
    gcloud container hub operations describe - describe a long-running
        operation

SYNOPSIS
    gcloud container hub operations describe
        (OPERATION : --location=LOCATION; default="global")
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a long-running operation.

EXAMPLES
    To describe a long-running operation in location us-west1, run:

        $ gcloud container hub operations describe OPERATION \
            --location=us-west1

POSITIONAL ARGUMENTS
     Operation resource - operation to describe. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the name attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION; default="global"
          Google Cloud location for the operation.

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

NOTES
    These variants are also available:

        $ gcloud alpha container hub operations describe

        $ gcloud beta container hub operations describe
```

### gcloud beta container hub operations describe

```text
NAME
    gcloud beta container hub operations describe - describe a long-running
        operation

SYNOPSIS
    gcloud beta container hub operations describe
        (OPERATION : --location=LOCATION; default="global")
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub operations describe

```text
NAME
    gcloud alpha container hub operations describe - describe a long-running
        operation

SYNOPSIS
    gcloud alpha container hub operations describe
        (OPERATION : --location=LOCATION; default="global")
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/operations/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/namespaces/operations
---

# gcloud iam workload-identity-pools namespaces operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam workload-identity-pools namespaces operations describe

```text
NAME
    gcloud iam workload-identity-pools namespaces operations describe -
        describe a workload identity pool namespace operation

SYNOPSIS
    gcloud iam workload-identity-pools namespaces operations describe
        (OPERATION : --location=LOCATION --namespace=NAMESPACE
          --workload-identity-pool=WORKLOAD_IDENTITY_POOL)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a workload identity pool namespace operation.

EXAMPLES
    The following command describes the long-running workload identity pool
    namespace operation with the ID my-operation:

        $ gcloud iam workload-identity-pools namespaces operations \
            describe my-operation \
            --workload-identity-pool="my-workload-identity-pool" \
            --namespace="my-namespace" --location="global"

POSITIONAL ARGUMENTS
     Workload identity pool namespace operation resource - The workload
     identity pool namespace long-running operation to describe. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OPERATION
          ID of the workload identity pool namespace operation or fully
          qualified identifier for the workload identity pool namespace
          operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --namespace=NAMESPACE
          The ID to use for the namespace. This value must be 2-63 characters,
          and may contain the characters [a-z0-9-]. The prefix gcp- is reserved
          for use by Google, and may not be specified.

          To set the namespace attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line.

       --workload-identity-pool=WORKLOAD_IDENTITY_POOL
          The ID to use for the pool, which becomes the final component of the
          resource name. This value should be 4-32 characters, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the workload-identity-pool attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --workload-identity-pool on the command
            line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/namespaces/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/namespaces/undelete
---

# gcloud iam workload-identity-pools namespaces undelete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam workload-identity-pools namespaces undelete

```text
NAME
    gcloud iam workload-identity-pools namespaces undelete - undelete a
        workload identity pool namespace

SYNOPSIS
    gcloud iam workload-identity-pools namespaces undelete
        (NAMESPACE : --location=LOCATION
          --workload-identity-pool=WORKLOAD_IDENTITY_POOL) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Undelete a workload identity pool namespace.

EXAMPLES
    The following command undeletes a workload identity pool namespace in the
    default project with the ID my-namespace.

        $ gcloud iam workload-identity-pools namespaces undelete \
            my-namespace --location="global" \
            --workload-identity-pool="my-workload-identity-pool"

POSITIONAL ARGUMENTS
     Workload identity pool namespace resource - The workload identity pool
     namespace to undelete. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument namespace on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAMESPACE
          ID of the workload identity pool namespace or fully qualified
          identifier for the workload identity pool namespace.

          To set the namespace attribute:
          + provide the argument namespace on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --workload-identity-pool=WORKLOAD_IDENTITY_POOL
          The ID to use for the pool, which becomes the final component of the
          resource name. This value should be 4-32 characters, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the workload-identity-pool attribute:
          + provide the argument namespace on the command line with a fully
            specified name;
          + provide the argument --workload-identity-pool on the command
            line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/namespaces/undelete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/set-iam-policy
---

# gcloud iam workload-identity-pools set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam workload-identity-pools set-iam-policy

```text
NAME
    gcloud iam workload-identity-pools set-iam-policy - set the IAM policy for
        a workload identity pool

SYNOPSIS
    gcloud iam workload-identity-pools set-iam-policy
        (WORKLOAD_IDENTITY_POOL : --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Replaces the existing IAM policy for a workload identity pool given a
    workload identity pool ID and a file encoded in JSON or YAML that contains
    the IAM policy.

EXAMPLES
    The following command reads an IAM policy defined in a JSON file
    policy.json and sets it for the workload identity pool with ID
    my-workload-identity-pool:

        $ gcloud iam workload-identity-pools set-iam-policy \
            my-workload-identity-pool policy.json --location="global"

POSITIONAL ARGUMENTS
     Workload identity pool resource - The workload identity pool for which you
     want to set IAM policy for. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument workload_identity_pool on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKLOAD_IDENTITY_POOL
          ID of the workload identity pool or fully qualified identifier for
          the workload identity pool.

          To set the workload_identity_pool attribute:
          + provide the argument workload_identity_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument workload_identity_pool on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

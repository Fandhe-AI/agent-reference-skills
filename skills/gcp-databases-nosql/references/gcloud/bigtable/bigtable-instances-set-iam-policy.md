---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/set-iam-policy
---

# gcloud bigtable instances set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable instances set-iam-policy

```text
NAME
    gcloud bigtable instances set-iam-policy - set IAM policy for an instance

SYNOPSIS
    gcloud bigtable instances set-iam-policy INSTANCE POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set the IAM policy for a Cloud Bigtable instance.

EXAMPLES
    The following command will read an IAM policy from 'policy.json' and set it
    for an instance with 'my-instance-id' as the identifier:

        $ gcloud bigtable instances set-iam-policy my-instance-id policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Instance resource - The instance to set the IAM policy for. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

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

NOTES
    These variants are also available:

        $ gcloud alpha bigtable instances set-iam-policy

        $ gcloud beta bigtable instances set-iam-policy
```

### gcloud beta bigtable instances set-iam-policy

```text
NAME
    gcloud beta bigtable instances set-iam-policy - set IAM policy for an
        instance

SYNOPSIS
    gcloud beta bigtable instances set-iam-policy INSTANCE POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable instances set-iam-policy

```text
NAME
    gcloud alpha bigtable instances set-iam-policy - set IAM policy for an
        instance

SYNOPSIS
    gcloud alpha bigtable instances set-iam-policy INSTANCE POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

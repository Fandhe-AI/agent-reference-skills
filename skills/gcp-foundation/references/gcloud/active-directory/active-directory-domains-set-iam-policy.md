---
source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/set-iam-policy
---

# gcloud active-directory domains set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud active-directory domains set-iam-policy

```text
NAME
    gcloud active-directory domains set-iam-policy - set the IAM policy for a
        Managed Microsoft AD domain

SYNOPSIS
    gcloud active-directory domains set-iam-policy DOMAIN POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set the IAM policy associated with a Managed Microsoft AD domain.

    This command can fail for the following reasons:
      o The domain specified does not exist.
      o The active account does not have permission to access the given
        domain's IAM policies.

EXAMPLES
    To set the IAM policy for my-domain.com, run:

        $ gcloud active-directory domains set-iam-policy my-domain.com \
            policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Domain resource - Name of the Managed Microsoft AD domain you want to set
     the IAM policy for. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument domain on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DOMAIN
          ID of the domain or fully qualified identifier for the domain.

          To set the domain attribute:
          + provide the argument domain on the command line.

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
    This command uses the managedidentities/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/managed-microsoft-ad/

NOTES
    These variants are also available:

        $ gcloud alpha active-directory domains set-iam-policy

        $ gcloud beta active-directory domains set-iam-policy
```

### gcloud beta active-directory domains set-iam-policy

```text
NAME
    gcloud beta active-directory domains set-iam-policy - set the IAM policy
        for a Managed Microsoft AD domain

SYNOPSIS
    gcloud beta active-directory domains set-iam-policy DOMAIN POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains set-iam-policy

```text
NAME
    gcloud alpha active-directory domains set-iam-policy - set the IAM policy
        for a Managed Microsoft AD domain

SYNOPSIS
    gcloud alpha active-directory domains set-iam-policy DOMAIN POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

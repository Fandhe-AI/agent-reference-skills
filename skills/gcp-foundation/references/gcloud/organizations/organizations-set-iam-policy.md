---
source: https://docs.cloud.google.com/sdk/gcloud/reference/organizations/set-iam-policy
---

# gcloud organizations set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud organizations set-iam-policy

```text
NAME
    gcloud organizations set-iam-policy - set IAM policy for an organization

SYNOPSIS
    gcloud organizations set-iam-policy ORGANIZATION_ID POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Given an organization ID and a file encoded in JSON or YAML that contains
    the IAM policy, this command will set the IAM policy for that organization.

EXAMPLES
    The following command reads an IAM policy defined in a JSON file
    policy.json and sets it for an organization with the ID 123456789:

        $ gcloud organizations set-iam-policy 123456789 policy.json

    The following command reads an IAM policy defined in a JSON file
    policy.json and sets it for the organization associated with the domain
    example.com:

        $ gcloud organizations set-iam-policy example.com policy.json

POSITIONAL ARGUMENTS
     ORGANIZATION_ID
        ID or domain for the organization whose IAM policy you want to set.

     POLICY_FILE
        JSON or YAML file containing the IAM policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha organizations set-iam-policy

        $ gcloud beta organizations set-iam-policy
```

### gcloud beta organizations set-iam-policy

```text
NAME
    gcloud beta organizations set-iam-policy - set IAM policy for an
        organization

SYNOPSIS
    gcloud beta organizations set-iam-policy ORGANIZATION_ID POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha organizations set-iam-policy

```text
NAME
    gcloud alpha organizations set-iam-policy - set IAM policy for an
        organization

SYNOPSIS
    gcloud alpha organizations set-iam-policy ORGANIZATION_ID POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/organizations/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

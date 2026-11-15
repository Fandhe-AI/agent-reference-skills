---
source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/set-iam-policy
---

# gcloud projects set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud projects set-iam-policy

```text
NAME
    gcloud projects set-iam-policy - set IAM policy for a project

SYNOPSIS
    gcloud projects set-iam-policy PROJECT_ID_OR_NUMBER POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for a project, given a project ID and a file encoded in
    JSON or YAML that contains the IAM policy.

EXAMPLES
    The following command reads an IAM policy defined in a JSON file
    policy.json and sets it for a project with the ID example-project-id-1:

        $ gcloud projects set-iam-policy example-project-id-1 policy.json

POSITIONAL ARGUMENTS
     PROJECT_ID_OR_NUMBER
        ID or number for the project you want to set IAM policy for.

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

        $ gcloud alpha projects set-iam-policy

        $ gcloud beta projects set-iam-policy
```

### gcloud beta projects set-iam-policy

```text
NAME
    gcloud beta projects set-iam-policy - set IAM policy for a project

SYNOPSIS
    gcloud beta projects set-iam-policy PROJECT_ID_OR_NUMBER POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha projects set-iam-policy

```text
NAME
    gcloud alpha projects set-iam-policy - set IAM policy for a project

SYNOPSIS
    gcloud alpha projects set-iam-policy PROJECT_ID POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/binauthz/policy/set-iam-policy
---

# gcloud container binauthz policy set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container binauthz policy set-iam-policy

```text
NAME
    gcloud container binauthz policy set-iam-policy - set the IAM policy for a
        Binary Authorization policy

SYNOPSIS
    gcloud container binauthz policy set-iam-policy POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'iam_policy.json' and set it for the current project's Binary Authorization
    policy:

        $ gcloud container binauthz policy set-iam-policy iam_policy.json

POSITIONAL ARGUMENTS
     POLICY_FILE
        The JSON or YAML file containing the IAM policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container binauthz policy set-iam-policy

        $ gcloud beta container binauthz policy set-iam-policy
```

### gcloud beta container binauthz policy set-iam-policy

```text
NAME
    gcloud beta container binauthz policy set-iam-policy - set the IAM policy
        for a Binary Authorization policy

SYNOPSIS
    gcloud beta container binauthz policy set-iam-policy POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container binauthz policy set-iam-policy

```text
NAME
    gcloud alpha container binauthz policy set-iam-policy - set the IAM policy
        for a Binary Authorization policy

SYNOPSIS
    gcloud alpha container binauthz policy set-iam-policy POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/binauthz/policy/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

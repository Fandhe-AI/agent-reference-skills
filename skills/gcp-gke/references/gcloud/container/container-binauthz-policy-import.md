---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/binauthz/policy/import
---

# gcloud container binauthz policy import

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container binauthz policy import

```text
NAME
    gcloud container binauthz policy import - import a Binary Authorization
        policy to the current project

SYNOPSIS
    gcloud container binauthz policy import POLICY_FILE [--strict-validation]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command accepts a description of the desired policy in the form of a
    YAML-formatted file. A representation of the current policy can be
    retrieved using the $ gcloud container binauthz policy export command. One
    method of modifying the policy is to run $ gcloud container binauthz policy
    export, dump the contents to a file, modify the policy file to reflect the
    desired new policy, and provide this modified file to $ gcloud container
    binauthz policy import.

EXAMPLES
    To update the current project's policy:

        $ gcloud container binauthz policy export > my_policy.yaml

        $ edit my_policy.yaml

        $ gcloud container binauthz policy import my_policy.yaml

POSITIONAL ARGUMENTS
     POLICY_FILE
        The file containing the YAML-formatted policy description.

FLAGS
     --strict-validation
        Whether to perform additional checks on the validity of policy
        contents.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container binauthz policy import

        $ gcloud beta container binauthz policy import
```

### gcloud beta container binauthz policy import

```text
NAME
    gcloud beta container binauthz policy import - import a Binary
        Authorization policy to the current project

SYNOPSIS
    gcloud beta container binauthz policy import POLICY_FILE
        [--strict-validation] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container binauthz policy import

```text
NAME
    gcloud alpha container binauthz policy import - import a Binary
        Authorization policy to the current project

SYNOPSIS
    gcloud alpha container binauthz policy import POLICY_FILE
        [--strict-validation] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/binauthz/policy/import (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

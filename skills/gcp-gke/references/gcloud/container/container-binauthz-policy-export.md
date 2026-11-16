---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/binauthz/policy/export
---

# gcloud container binauthz policy export

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container binauthz policy export

```text
NAME
    gcloud container binauthz policy export - export the Binary Authorization
        policy for the current project

SYNOPSIS
    gcloud container binauthz policy export [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This function's default output is a valid policy YAML file. If dumped to a
    file and edited, the new policy can be provided to the $ gcloud container
    binauthz policy import command to cause these edits to be reflected in the
    project policy.

EXAMPLES
    To export the current project's policy:

        $ gcloud container binauthz policy export > my_policy.yaml

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container binauthz policy export

        $ gcloud beta container binauthz policy export
```

### gcloud beta container binauthz policy export

```text
NAME
    gcloud beta container binauthz policy export - export the Binary
        Authorization policy for the current project

SYNOPSIS
    gcloud beta container binauthz policy export [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container binauthz policy export

```text
NAME
    gcloud alpha container binauthz policy export - export the Binary
        Authorization policy for the current project

SYNOPSIS
    gcloud alpha container binauthz policy export [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/binauthz/policy/export (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

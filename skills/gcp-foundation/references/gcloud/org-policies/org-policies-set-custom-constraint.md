---
source: https://docs.cloud.google.com/sdk/gcloud/reference/org-policies/set-custom-constraint
---

# gcloud org-policies set-custom-constraint

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud org-policies set-custom-constraint

```text
NAME
    gcloud org-policies set-custom-constraint - set a custom constraint from a
        JSON or YAML file

SYNOPSIS
    gcloud org-policies set-custom-constraint CUSTOM_CONSTRAINT_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets a Custom Constraint from a JSON or YAML file. The custom constraint
    will be created if it does not exist, or updated if it already exists.

EXAMPLES
    To set the custom constraint from the file on the path './sample_path',
    run:

        $ gcloud org-policies set-custom-constraint ./sample_path

POSITIONAL ARGUMENTS
     CUSTOM_CONSTRAINT_FILE
        Path to JSON or YAML file that contains the organization policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/org-policies/set-custom-constraint (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

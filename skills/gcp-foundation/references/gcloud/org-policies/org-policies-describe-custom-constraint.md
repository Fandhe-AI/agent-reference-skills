---
source: https://docs.cloud.google.com/sdk/gcloud/reference/org-policies/describe-custom-constraint
---

# gcloud org-policies describe-custom-constraint

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud org-policies describe-custom-constraint

```text
NAME
    gcloud org-policies describe-custom-constraint - describe a custom
        constraint

SYNOPSIS
    gcloud org-policies describe-custom-constraint CUSTOM_CONSTRAINT
        --organization=ORGANIZATION_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a custom constraint.

EXAMPLES
    To describe the custom constraint 'custom.myCustomConstraint' associated
    with the Organization '1234', run:

        $ gcloud org-policies describe-custom-constraint \
            custom.myCustomConstraint --organization=1234

POSITIONAL ARGUMENTS
     CUSTOM_CONSTRAINT
        Name of the custom constraint.

REQUIRED FLAGS
     --organization=ORGANIZATION_ID
        Organization ID.

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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/org-policies/describe-custom-constraint (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

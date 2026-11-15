---
source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/list-user-verified
---

# gcloud domains list-user-verified

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud domains list-user-verified

```text
NAME
    gcloud domains list-user-verified - lists the user's verified domains

SYNOPSIS
    gcloud domains list-user-verified [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists the user's verified domains.

EXAMPLES
    To list domains that have been verified by the current user, run:

        $ gcloud domains list-user-verified

    Use the gcloud domains verify command to verify additional domains.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta domains list-user-verified
```

### gcloud beta domains list-user-verified

```text
NAME
    gcloud beta domains list-user-verified - lists the user's verified domains

SYNOPSIS
    gcloud beta domains list-user-verified [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/list-user-verified (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

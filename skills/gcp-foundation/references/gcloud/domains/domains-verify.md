---
source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/verify
---

# gcloud domains verify

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud domains verify

```text
NAME
    gcloud domains verify - verifies a domain via an in-browser workflow

SYNOPSIS
    gcloud domains verify DOMAIN [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Verifies a domain via an in-browser workflow.

EXAMPLES
    To verify a domain for the current user, run:

        $ gcloud domains verify example.com

    This will allow the domain to be used with App Engine through gcloud
    domains app domain-mappings and across Google Cloud products.

POSITIONAL ARGUMENTS
     DOMAIN
        The domain to be verified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta domains verify
```

### gcloud beta domains verify

```text
NAME
    gcloud beta domains verify - verifies a domain via an in-browser workflow

SYNOPSIS
    gcloud beta domains verify DOMAIN [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/verify (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

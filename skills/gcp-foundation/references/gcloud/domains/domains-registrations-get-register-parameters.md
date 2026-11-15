---
source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/get-register-parameters
---

# gcloud domains registrations get-register-parameters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud domains registrations get-register-parameters

```text
NAME
    gcloud domains registrations get-register-parameters - get register
        parameters (including availability) of a specific domain

SYNOPSIS
    gcloud domains registrations get-register-parameters DOMAIN
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get parameters needed to register a new domain, including price,
    availability, supported privacy modes and notices.

    In contrast to the search-domains command, this command returns up-to-date
    domain name availability information.

EXAMPLES
    To check if example.com is available for registration, run:

        $ gcloud domains registrations get-register-parameters example.com

POSITIONAL ARGUMENTS
     DOMAIN
        Domain to get register parameters for.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha domains registrations get-register-parameters

        $ gcloud beta domains registrations get-register-parameters
```

### gcloud beta domains registrations get-register-parameters

```text
NAME
    gcloud beta domains registrations get-register-parameters - get register
        parameters (including availability) of a specific domain

SYNOPSIS
    gcloud beta domains registrations get-register-parameters DOMAIN
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha domains registrations get-register-parameters

```text
NAME
    gcloud alpha domains registrations get-register-parameters - get register
        parameters (including availability) of a specific domain

SYNOPSIS
    gcloud alpha domains registrations get-register-parameters DOMAIN
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/get-register-parameters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

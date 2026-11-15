---
source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/search-domains
---

# gcloud domains registrations search-domains

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud domains registrations search-domains

```text
NAME
    gcloud domains registrations search-domains - search for available domains

SYNOPSIS
    gcloud domains registrations search-domains DOMAIN_QUERY
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Search for available domains relevant to a specified query.

    This command uses cached domain name availability information. Use the
    get-register-params command to get up-to-date availability information.

EXAMPLES
    To search for domains for my-new-project, run:

        $ gcloud domains registrations search-domains my-new-project

    To search for a specific domain, like example.com, and get suggestions for
    other domain endings, run:

        $ gcloud domains registrations search-domains example.com

POSITIONAL ARGUMENTS
     DOMAIN_QUERY
        Domain search query. May be a domain name or arbitrary search terms.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha domains registrations search-domains

        $ gcloud beta domains registrations search-domains
```

### gcloud beta domains registrations search-domains

```text
NAME
    gcloud beta domains registrations search-domains - search for available
        domains

SYNOPSIS
    gcloud beta domains registrations search-domains DOMAIN_QUERY
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha domains registrations search-domains

```text
NAME
    gcloud alpha domains registrations search-domains - search for available
        domains

SYNOPSIS
    gcloud alpha domains registrations search-domains DOMAIN_QUERY
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the description refers to a `get-register-params` command; the command is `gcloud domains registrations get-register-parameters`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/search-domains (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

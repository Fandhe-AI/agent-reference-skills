---
source: https://docs.cloud.google.com/sdk/gcloud/reference/organizations/describe
---

# gcloud organizations describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud organizations describe

```text
NAME
    gcloud organizations describe - show metadata for an organization

SYNOPSIS
    gcloud organizations describe ORGANIZATION_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Shows metadata for an organization, given a valid organization ID. If an
    organization domain is supplied instead, this command will attempt to find
    the organization by domain name.

    This command can fail for the following reasons:
      o The organization specified does not exist.
      o The active account does not have permission to access the given
        organization.
      o The domain name supplied does not correspond to a unique organization
        ID.

EXAMPLES
    The following command prints metadata for an organization with the ID
    3589215982:

        $ gcloud organizations describe 3589215982

    The following command prints metadata for an organization associated with
    the domain example.com:

        $ gcloud organizations describe example.com

POSITIONAL ARGUMENTS
     ORGANIZATION_ID
        ID or domain for the organization you want to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha organizations describe

        $ gcloud beta organizations describe
```

### gcloud beta organizations describe

```text
NAME
    gcloud beta organizations describe - show metadata for an organization

SYNOPSIS
    gcloud beta organizations describe ORGANIZATION_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha organizations describe

```text
NAME
    gcloud alpha organizations describe - show metadata for an organization

SYNOPSIS
    gcloud alpha organizations describe ORGANIZATION_ID [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/organizations/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

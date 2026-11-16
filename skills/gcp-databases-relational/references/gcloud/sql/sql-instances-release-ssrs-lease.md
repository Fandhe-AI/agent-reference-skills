---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/release-ssrs-lease
---

# gcloud sql instances release-ssrs-lease

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql instances release-ssrs-lease

```text
NAME
    gcloud sql instances release-ssrs-lease - releases a SQL Server Reporting
        Services lease on a Cloud SQL instance

SYNOPSIS
    gcloud sql instances release-ssrs-lease INSTANCE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Release a SQL Server Reporting Services lease on a Cloud SQL instance.

EXAMPLES
    To release a SQL Server Reporting Services lease on an instance:

        $ gcloud sql instances release-ssrs-lease instance-foo

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/release-ssrs-lease (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

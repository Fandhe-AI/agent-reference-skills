---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/acquire-ssrs-lease
---

# gcloud sql instances acquire-ssrs-lease

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql instances acquire-ssrs-lease

```text
NAME
    gcloud sql instances acquire-ssrs-lease - acquires a SQL Server Reporting
        Services lease on a Cloud SQL instance

SYNOPSIS
    gcloud sql instances acquire-ssrs-lease INSTANCE
        --report-database=REPORT_DATABASE --service-login=SERVICE_LOGIN
        --setup-login=SETUP_LOGIN [--duration=DURATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Acquire a SQL Server Reporting Services lease on a Cloud SQL instance.

EXAMPLES
    To acquire a SQL Server Reporting Services lease on an instance:

        $ gcloud sql instances acquire-ssrs-lease instance-foo \
            --setup-login=setuplogin --service-login=reportuser \
            --report-database=ReportServer --duration=4h

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

REQUIRED FLAGS
     --report-database=REPORT_DATABASE
        Existing or new report database name in the Cloud SQL for SQL Server
        instance that is used for SSRS setup.

     --service-login=SERVICE_LOGIN
        Existing login in the Cloud SQL for SQL Server instance that is used as
        the service login for SSRS setup.

     --setup-login=SETUP_LOGIN
        Existing login in the Cloud SQL for SQL Server instance that is used as
        the setup login for SSRS setup.

OPTIONAL FLAGS
     --duration=DURATION
        Time duration, in hours, that the lease will be active to allow SSRS
        setup. Default lease duration is 5 hours if this flag is not specified.

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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/acquire-ssrs-lease (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

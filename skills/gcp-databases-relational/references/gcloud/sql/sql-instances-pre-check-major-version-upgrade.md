---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/pre-check-major-version-upgrade
---

# gcloud sql instances pre-check-major-version-upgrade

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql instances pre-check-major-version-upgrade

```text
NAME
    gcloud sql instances pre-check-major-version-upgrade - performs pre-checks
        for a major version upgrade of a Cloud SQL instance

SYNOPSIS
    gcloud sql instances pre-check-major-version-upgrade INSTANCE
        --target-database-version=TARGET_DATABASE_VERSION [--async]
        [--max-runtime=MAX_RUNTIME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud sql instances pre-check-major-version-upgrade performs pre-checks
    for a major version upgrade of a Cloud SQL instance.

EXAMPLES
    To perform pre-checks before upgrading a PostgreSQL instance to a target
    version (supported in both GA and Beta):

        $ gcloud sql instances pre-check-major-version-upgrade \
            test-instance --target-database-version=POSTGRES_15

    To perform pre-checks before upgrading a MySQL instance to a target version
    (supported in Beta only):

        $ gcloud sql instances pre-check-major-version-upgrade \
            test-instance --target-database-version=MYSQL_8_0

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

REQUIRED FLAGS
     --target-database-version=TARGET_DATABASE_VERSION
        Target database version for the upgrade.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --max-runtime=MAX_RUNTIME
        Maximum runtime for the pre-check, for example, 10m or 2h. Only
        applicable to Cloud SQL for MySQL instances. See $ gcloud topic
        datetimes for information on duration formats.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta sql instances pre-check-major-version-upgrade
```

### gcloud beta sql instances pre-check-major-version-upgrade

```text
NAME
    gcloud beta sql instances pre-check-major-version-upgrade - performs
        pre-checks for a major version upgrade of a Cloud SQL instance

SYNOPSIS
    gcloud beta sql instances pre-check-major-version-upgrade INSTANCE
        --target-database-version=TARGET_DATABASE_VERSION [--async]
        [--max-runtime=MAX_RUNTIME] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/pre-check-major-version-upgrade (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

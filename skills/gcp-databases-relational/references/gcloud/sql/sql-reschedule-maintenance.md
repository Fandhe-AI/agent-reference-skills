---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/reschedule-maintenance
---

# gcloud sql reschedule-maintenance

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql reschedule-maintenance

```text
NAME
    gcloud sql reschedule-maintenance - reschedule a Cloud SQL instance's
        maintenance

SYNOPSIS
    gcloud sql reschedule-maintenance INSTANCE
        --reschedule-type=RESCHEDULE_TYPE [--schedule-time=SCHEDULE_TIME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud sql reschedule-maintenance reschedules a Cloud SQL instance's
    maintenance.

EXAMPLES
    To run maintenance on instance my-instance immediately, run:

        $ gcloud sql reschedule-maintenance my-instance \
            --reschedule-type=IMMEDIATE

    To reschedule maintenance on instance my-instance to the next available
    window, run:

        $ gcloud sql reschedule-maintenance my-instance \
            --reschedule-type=NEXT_AVAILABLE_WINDOW

    To reschedule maintenance on instance my-instance to 2019-11-07 at 4:00 am
    UTC, run:

        $ gcloud sql reschedule-maintenance my-instance \
            --reschedule-type=SPECIFIC_TIME \
            --schedule-time=2019-11-07T04:00Z

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

REQUIRED FLAGS
     --reschedule-type=RESCHEDULE_TYPE
        The type of reschedule operation to perform. RESCHEDULE_TYPE must be
        one of: IMMEDIATE, NEXT_AVAILABLE_WINDOW, SPECIFIC_TIME.

OPTIONAL FLAGS
     --schedule-time=SCHEDULE_TIME
        When specifying SPECIFIC_TIME, the date and time at which to schedule
        the maintenance in ISO 8601 format.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql reschedule-maintenance

        $ gcloud beta sql reschedule-maintenance
```

### gcloud beta sql reschedule-maintenance

```text
NAME
    gcloud beta sql reschedule-maintenance - reschedule a Cloud SQL instance's
        maintenance

SYNOPSIS
    gcloud beta sql reschedule-maintenance INSTANCE
        --reschedule-type=RESCHEDULE_TYPE [--schedule-time=SCHEDULE_TIME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql reschedule-maintenance

```text
NAME
    gcloud alpha sql reschedule-maintenance - reschedule a Cloud SQL instance's
        maintenance

SYNOPSIS
    gcloud alpha sql reschedule-maintenance INSTANCE
        --reschedule-type=RESCHEDULE_TYPE [--schedule-time=SCHEDULE_TIME]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/reschedule-maintenance (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

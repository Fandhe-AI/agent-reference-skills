---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/instances/reschedule-maintenance
---

# gcloud memorystore instances reschedule-maintenance

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memorystore instances reschedule-maintenance

```text
NAME
    gcloud memorystore instances reschedule-maintenance - reschedule
        maintenance window for an instance

SYNOPSIS
    gcloud memorystore instances reschedule-maintenance
        (INSTANCE : --location=LOCATION) --reschedule-type=RESCHEDULE_TYPE
        [--async] [--schedule-time=SCHEDULE_TIME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Reschedule maintenance window for an instance.

EXAMPLES
    To reschedule maintenance window for an instance with the name my-instance
    in region us-central-1 with immediate, run:

POSITIONAL ARGUMENTS
     Instance resource - Name of the instance to reschedule maintenance for:
     projects/{project}/locations/{location_id}/instances/{instance} The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the instance resource.

          To set the location attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --reschedule-type=RESCHEDULE_TYPE
        If reschedule type is SPECIFIC_TIME, schedule_time must be set.
        RESCHEDULE_TYPE must be one of:

         immediate
            If the user wants to schedule the maintenance to happen now.
         specific-time
            If the user wants to reschedule the maintenance to a specific time.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --schedule-time=SCHEDULE_TIME
        Timestamp when the maintenance shall be rescheduled to if
        reschedule_type=SPECIFIC_TIME, in RFC 3339 format. Example:
        2012-11-15T16:19:00.094Z.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore instances reschedule-maintenance

        $ gcloud beta memorystore instances reschedule-maintenance
```

### gcloud beta memorystore instances reschedule-maintenance

```text
NAME
    gcloud beta memorystore instances reschedule-maintenance - reschedule
        maintenance window for an instance

SYNOPSIS
    gcloud beta memorystore instances reschedule-maintenance
        (INSTANCE : --location=LOCATION) --reschedule-type=RESCHEDULE_TYPE
        [--async] [--schedule-time=SCHEDULE_TIME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore instances reschedule-maintenance

```text
NAME
    gcloud alpha memorystore instances reschedule-maintenance - reschedule
        maintenance window for an instance

SYNOPSIS
    gcloud alpha memorystore instances reschedule-maintenance
        (INSTANCE : --location=LOCATION) --reschedule-type=RESCHEDULE_TYPE
        [--async] [--schedule-time=SCHEDULE_TIME] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/instances/reschedule-maintenance (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

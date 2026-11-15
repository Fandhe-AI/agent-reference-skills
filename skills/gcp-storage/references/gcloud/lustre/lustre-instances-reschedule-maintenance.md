---
source: https://docs.cloud.google.com/sdk/gcloud/reference/lustre/instances/reschedule-maintenance
---

# gcloud lustre instances reschedule-maintenance

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud lustre instances reschedule-maintenance

```text
NAME
    gcloud lustre instances reschedule-maintenance - reschedules a planned
        maintenance window for a Managed Lustre instance

SYNOPSIS
    gcloud lustre instances reschedule-maintenance
        (INSTANCE : --location=LOCATION) --reschedule-type=RESCHEDULE_TYPE
        [--async] [--request-id=REQUEST_ID]
        [--reschedule-schedule-time=RESCHEDULE_SCHEDULE_TIME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Reschedules a planned maintenance window for a Managed Lustre instance.

EXAMPLES
    To reschedule maintenance immediately for an instance my-instance in
    location us-central1-a, run:

        $ gcloud lustre instances reschedule-maintenance my-instance \
            --location=us-central1-a --reschedule-type=immediate

    To reschedule maintenance to the next available window for an instance
    my-instance in location us-central1-a, run:

        $ gcloud lustre instances reschedule-maintenance my-instance \
            --location=us-central1-a --reschedule-type=next-available-window

    To reschedule maintenance to a specific time for an instance my-instance in
    location us-central1-a, run:

        $ gcloud lustre instances reschedule-maintenance my-instance \
            --location=us-central1-a --reschedule-type=by-time \
            --reschedule-schedule-time="2026-09-01T10:00:00Z"

POSITIONAL ARGUMENTS
     Instance resource - Format:
     projects/{project}/locations/{location}/instances/{instance} The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

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
        The type of rescheduling. RESCHEDULE_TYPE must be one of:

         by-time
            Reschedule to a specific time.
         immediate
            Apply update immediately.
         next-available-window
            Reschedule to the next available window.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        A unique identifier for this request. A random UUID is recommended.
        This request is only idempotent if a request_id is provided.

     --reschedule-schedule-time=RESCHEDULE_SCHEDULE_TIME
        Required if reschedule_type is BY_TIME. Timestamp when the maintenance
        shall be rescheduled to. This time must be within 28 days of the
        original scheduled maintenance start time.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the lustre/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/managed-lustre/docs

NOTES
    This variant is also available:

        $ gcloud alpha lustre instances reschedule-maintenance
```

### gcloud alpha lustre instances reschedule-maintenance

```text
NAME
    gcloud alpha lustre instances reschedule-maintenance - reschedules a
        planned maintenance window for a Managed Lustre instance

SYNOPSIS
    gcloud alpha lustre instances reschedule-maintenance
        (INSTANCE : --location=LOCATION) --reschedule-type=RESCHEDULE_TYPE
        [--async] [--request-id=REQUEST_ID]
        [--reschedule-schedule-time=RESCHEDULE_SCHEDULE_TIME]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/lustre/instances/reschedule-maintenance (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

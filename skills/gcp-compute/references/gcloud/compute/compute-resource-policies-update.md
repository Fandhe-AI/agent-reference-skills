---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/resource-policies/update
---

# gcloud compute resource-policies update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute resource-policies update instance-schedule

```text
NAME
    gcloud compute resource-policies update instance-schedule - update a
        Compute Engine Instance Schedule Resource Policy

SYNOPSIS
    gcloud compute resource-policies update instance-schedule NAME
        [--description=DESCRIPTION] [--end-date=END_DATE]
        [--initiation-date=INITIATION_DATE] [--region=REGION]
        [--timezone=TIMEZONE] [--vm-start-schedule=VM_START_SCHEDULE]
        [--vm-stop-schedule=VM_STOP_SCHEDULE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Compute Engine Instance Schedule Resource Policy.

EXAMPLES
    To update an instance schedule resource policy with specified parameters:

        $ gcloud compute resource-policies update instance-schedule NAME \
            --region=REGION --timezone=UTC --vm-start-schedule="0 7 * * *" \
            --vm-stop-schedule="0 17 * * *"

POSITIONAL ARGUMENTS
     NAME
        Name of the resource policy to operate on.

FLAGS
     --description=DESCRIPTION
        An optional, textual description for the backend.

     --end-date=END_DATE
        The expiration time of the schedule policy. The timestamp must be an
        RFC3339 valid string.

     --initiation-date=INITIATION_DATE
        The start time of the schedule policy. The timestamp must be an RFC3339
        valid string.

     --region=REGION
        Region of the resource policy to operate on. If not specified, you
        might be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

     --timezone=TIMEZONE
        Timezone used in interpreting schedule. The value of this field must be
        a time zone name from the tz database
        http://en.wikipedia.org/wiki/Tz_database

     --vm-start-schedule=VM_START_SCHEDULE
        Schedule for starting the instance, specified using standard CRON
        format.

     --vm-stop-schedule=VM_STOP_SCHEDULE
        Schedule for stopping the instance, specified using standard CRON
        format.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute resource-policies update instance-schedule

        $ gcloud beta compute resource-policies update instance-schedule
```

### gcloud compute resource-policies update snapshot-schedule

```text
NAME
    gcloud compute resource-policies update snapshot-schedule - update a
        Compute Engine Snapshot Schedule Resource Policy

SYNOPSIS
    gcloud compute resource-policies update snapshot-schedule NAME
        [--description=DESCRIPTION] [--max-retention-days=MAX_RETENTION_DAYS]
        [--on-source-disk-delete=ON_SOURCE_DISK_DELETE] [--region=REGION]
        [--snapshot-labels=[KEY=VALUE,...]]
        [--weekly-schedule-from-file=PATH_TO_FILE
          | --start-time=START_TIME (--daily-schedule | --hourly-schedule=HOURS
          | --weekly-schedule=WEEKLY_CYCLE)] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Compute Engine Snapshot Schedule Resource Policy.

EXAMPLES
    The following command updates a Compute Engine Snapshot Schedule Resource
    Policy to take a daily snapshot at 13:00 UTC

        $ gcloud compute resource-policies update snapshot-schedule \
            my-resource-policy --region=REGION --start-time=13:00 \
            --daily-schedule

POSITIONAL ARGUMENTS
     NAME
        Name of the resource policy to operate on.

FLAGS
     --description=DESCRIPTION
        An optional, textual description for the backend.

     --max-retention-days=MAX_RETENTION_DAYS
        Maximum number of days snapshot can be retained.

     --on-source-disk-delete=ON_SOURCE_DISK_DELETE
        Retention behavior of automatic snapshots in the event of source disk
        deletion. ON_SOURCE_DISK_DELETE must be one of:

         apply-retention-policy
            Continue to apply the retention window to automatically-created
            snapshots when the source disk is deleted.
         keep-auto-snapshots
            Keep automatically-created snapshots when the source disk is
            deleted. This is the default behavior.

     --region=REGION
        Region of the resource policy to operate on. If not specified, you
        might be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

     --snapshot-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

        The label is added to each snapshot created by the schedule.

     Cycle Frequency Group.

     At most one of these can be specified:

       Using a file:

       --weekly-schedule-from-file=PATH_TO_FILE
          A JSON/YAML file which specifies a weekly schedule. The file should
          contain the following fields:

          day: Day of the week with the same choices as --weekly-schedule.
          startTime: Start time of the snapshot schedule with the same format
          as --start-time.

          For more information about using a file, see
          https://cloud.google.com/compute/docs/disks/scheduled-snapshots#create_snapshot_schedule.

          Use a full or relative path to a local file containing the value of
          weekly_schedule.

       Using command flags:

       --start-time=START_TIME
          Start time for the disk snapshot schedule in UTC. For example,
          --start-time="15:00".

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       Exactly one of these must be specified:

         --daily-schedule
            Snapshot schedule starts daily at START_TIME.

         --hourly-schedule=HOURS
            Snapshot schedule occurs every n hours starting at START_TIME.

         --weekly-schedule=WEEKLY_CYCLE
            Snapshot schedule occurs weekly on WEEKLY_SCHEDULE at START_TIME.
            WEEKLY_CYCLE must be one of: monday, tuesday, wednesday, thursday,
            friday, saturday, sunday.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute resource-policies update snapshot-schedule

        $ gcloud beta compute resource-policies update snapshot-schedule
```

### gcloud beta compute resource-policies update instance-schedule

```text
NAME
    gcloud beta compute resource-policies update instance-schedule - update a
        Compute Engine Instance Schedule Resource Policy

SYNOPSIS
    gcloud beta compute resource-policies update instance-schedule NAME
        [--description=DESCRIPTION] [--end-date=END_DATE]
        [--initiation-date=INITIATION_DATE] [--region=REGION]
        [--timezone=TIMEZONE] [--vm-start-schedule=VM_START_SCHEDULE]
        [--vm-stop-schedule=VM_STOP_SCHEDULE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute resource-policies update snapshot-schedule

```text
NAME
    gcloud beta compute resource-policies update snapshot-schedule - update a
        Compute Engine Snapshot Schedule Resource Policy

SYNOPSIS
    gcloud beta compute resource-policies update snapshot-schedule NAME
        [--description=DESCRIPTION] [--max-retention-days=MAX_RETENTION_DAYS]
        [--on-source-disk-delete=ON_SOURCE_DISK_DELETE] [--region=REGION]
        [--snapshot-labels=[KEY=VALUE,...]]
        [--weekly-schedule-from-file=PATH_TO_FILE
          | --start-time=START_TIME (--daily-schedule | --hourly-schedule=HOURS
          | --weekly-schedule=WEEKLY_CYCLE)] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute resource-policies update instance-schedule

```text
NAME
    gcloud alpha compute resource-policies update instance-schedule - update a
        Compute Engine Instance Schedule Resource Policy

SYNOPSIS
    gcloud alpha compute resource-policies update instance-schedule NAME
        [--description=DESCRIPTION] [--end-date=END_DATE]
        [--initiation-date=INITIATION_DATE] [--region=REGION]
        [--timezone=TIMEZONE] [--vm-start-schedule=VM_START_SCHEDULE]
        [--vm-stop-schedule=VM_STOP_SCHEDULE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute resource-policies update snapshot-schedule

```text
NAME
    gcloud alpha compute resource-policies update snapshot-schedule - update a
        Compute Engine Snapshot Schedule Resource Policy

SYNOPSIS
    gcloud alpha compute resource-policies update snapshot-schedule NAME
        [--description=DESCRIPTION] [--max-retention-days=MAX_RETENTION_DAYS]
        [--on-source-disk-delete=ON_SOURCE_DISK_DELETE] [--region=REGION]
        [--snapshot-labels=[KEY=VALUE,...]]
        [--weekly-schedule-from-file=PATH_TO_FILE
          | --start-time=START_TIME (--daily-schedule | --hourly-schedule=HOURS
          | --weekly-schedule=WEEKLY_CYCLE)] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/resource-policies/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

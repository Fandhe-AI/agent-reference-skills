---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memcache/instances/reschedule-maintenance
---

# gcloud memcache instances reschedule-maintenance

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memcache instances reschedule-maintenance

```text
NAME
    gcloud memcache instances reschedule-maintenance - reschedule maintenance
        window for a Memcache instance

SYNOPSIS
    gcloud memcache instances reschedule-maintenance
        (INSTANCE : --region=REGION) --reschedule-type=RESCHEDULE_TYPE
        [--async] [--schedule-time=SCHEDULE_TIME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Reschedule maintenance window for a Memcache instance.

EXAMPLES
    To reschedule maintenance window for an instance with the name
    'my-memcache-instance' in region 'us-central-1' with next available window,
    run:

        $ gcloud memcache instances reschedule-maintenance \
            my-memcache-instance --region=us-central1 \
            --reschedule-type=next-available-window

POSITIONAL ARGUMENTS
     Instance resource - Arguments and flags that specify the Cloud Memorystore
     for Memcache instance you want to reschedule maintenance window. The
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

       --region=REGION
          The name of the Memcached region of the instance. Overrides the
          default memcache/region property value for this command invocation.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property memcache/region.

REQUIRED FLAGS
     --reschedule-type=RESCHEDULE_TYPE
        Reschedule type to use for the reschedule maintenance window.
        RESCHEDULE_TYPE must be one of:

         immediate
            Reschedule the maintenance to perform now.
         next-available-window
            Reschedule the maintenance to the next available window.
         specific-time
            Reschedule the maintenance to a specific time.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --schedule-time=SCHEDULE_TIME
        Time in RFC3339 format, for example: 2012-11-15T16:19:00.094Z

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the memcache/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memcache instances reschedule-maintenance

        $ gcloud beta memcache instances reschedule-maintenance
```

### gcloud beta memcache instances reschedule-maintenance

```text
NAME
    gcloud beta memcache instances reschedule-maintenance - reschedule
        maintenance window for a Memcache instance

SYNOPSIS
    gcloud beta memcache instances reschedule-maintenance
        (INSTANCE : --region=REGION) --reschedule-type=RESCHEDULE_TYPE
        [--async] [--schedule-time=SCHEDULE_TIME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memcache instances reschedule-maintenance

```text
NAME
    gcloud alpha memcache instances reschedule-maintenance - reschedule
        maintenance window for a Memcache instance

SYNOPSIS
    gcloud alpha memcache instances reschedule-maintenance
        (INSTANCE : --region=REGION) --reschedule-type=RESCHEDULE_TYPE
        [--async] [--schedule-time=SCHEDULE_TIME] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memcache/instances/reschedule-maintenance (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

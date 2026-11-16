---
source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/reschedule-maintenance
---

# gcloud redis clusters reschedule-maintenance

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud redis clusters reschedule-maintenance

```text
NAME
    gcloud redis clusters reschedule-maintenance - reschedule maintenance
        window for a Memorystore for Redis Cluster instance

SYNOPSIS
    gcloud redis clusters reschedule-maintenance (CLUSTER : --region=REGION)
        --reschedule-type=RESCHEDULE_TYPE [--async]
        [--schedule-time=SCHEDULE_TIME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Reschedule maintenance window for a Memorystore for Redis Cluster instance.

EXAMPLES
    To reschedule maintenance window for an instance with the name
    'my-redis-cluster' in region 'us-central-1' with immediate, run:

        $ gcloud redis clusters reschedule-maintenance my-redis-cluster \
            --region=us-central1 --reschedule-type=IMMEDIATE

POSITIONAL ARGUMENTS
     Cluster resource - Arguments and flags that specify the Cloud Memorystore
     for Redis cluster instance you want to reschedule maintenance window. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Redis region of the cluster. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

REQUIRED FLAGS
     --reschedule-type=RESCHEDULE_TYPE
        Reschedule type to use for the reschedule maintenance window.
        RESCHEDULE_TYPE must be one of:

         immediate
            Reschedule the maintenance to perform now.
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
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters reschedule-maintenance

        $ gcloud beta redis clusters reschedule-maintenance
```

### gcloud beta redis clusters reschedule-maintenance

```text
NAME
    gcloud beta redis clusters reschedule-maintenance - reschedule maintenance
        window for a Memorystore for Redis Cluster instance

SYNOPSIS
    gcloud beta redis clusters reschedule-maintenance
        (CLUSTER : --region=REGION) --reschedule-type=RESCHEDULE_TYPE [--async]
        [--schedule-time=SCHEDULE_TIME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters reschedule-maintenance

```text
NAME
    gcloud alpha redis clusters reschedule-maintenance - reschedule maintenance
        window for a Memorystore for Redis Cluster instance

SYNOPSIS
    gcloud alpha redis clusters reschedule-maintenance
        (CLUSTER : --region=REGION) --reschedule-type=RESCHEDULE_TYPE [--async]
        [--schedule-time=SCHEDULE_TIME] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/reschedule-maintenance (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

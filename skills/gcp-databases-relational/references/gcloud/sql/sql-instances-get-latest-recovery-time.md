---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/get-latest-recovery-time
---

# gcloud sql instances get-latest-recovery-time

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql instances get-latest-recovery-time

```text
NAME
    gcloud sql instances get-latest-recovery-time - displays the latest
        recovery time to which a Cloud SQL instance can be restored to

SYNOPSIS
    gcloud sql instances get-latest-recovery-time INSTANCE
        [--source-instance-deletion-time=SOURCE_INSTANCE_DELETION_TIME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud sql instances get-latest-recovery-time retrieves the latest recovery
    time for a Cloud SQL instance. This is the latest time that can be used to
    perform point in time recovery for the Cloud SQL instance.

EXAMPLES
    To retrieve the latest recovery time for an instance:

        $ gcloud sql instances get-latest-recovery-time instance-foo

    To retrieve the latest recovery time for an instance that has been deleted:

        $ gcloud sql instances get-latest-recovery-time instance-foo \
            --source-instance-deletion-time '2012-11-15T16:19:00.094Z'

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

FLAGS
     --source-instance-deletion-time=SOURCE_INSTANCE_DELETION_TIME
        The deletion time of the source instance. This is used to identify the
        instance if it has been deleted.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql instances get-latest-recovery-time

        $ gcloud beta sql instances get-latest-recovery-time
```

### gcloud beta sql instances get-latest-recovery-time

```text
NAME
    gcloud beta sql instances get-latest-recovery-time - displays the latest
        recovery time to which a Cloud SQL instance can be restored to

SYNOPSIS
    gcloud beta sql instances get-latest-recovery-time INSTANCE
        [--source-instance-deletion-time=SOURCE_INSTANCE_DELETION_TIME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql instances get-latest-recovery-time

```text
NAME
    gcloud alpha sql instances get-latest-recovery-time - displays the latest
        recovery time to which a Cloud SQL instance can be restored to

SYNOPSIS
    gcloud alpha sql instances get-latest-recovery-time INSTANCE
        [--source-instance-deletion-time=SOURCE_INSTANCE_DELETION_TIME]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/get-latest-recovery-time (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

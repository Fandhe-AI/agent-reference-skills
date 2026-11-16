---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/rollouts/resume
---

# gcloud container hub rollouts resume

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub rollouts resume

```text
NAME
    gcloud container hub rollouts resume - resume a rollout resource

SYNOPSIS
    gcloud container hub rollouts resume ROLLOUT [--async]
        [--schedule-offset=SCHEDULE_OFFSET] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Resume a rollout resource.

EXAMPLES
    To resume a rollout, run:

        $ gcloud container hub rollouts resume ROLLOUT

POSITIONAL ARGUMENTS
     Rollout resource - The group of arguments defining a Fleet Rollout. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * global is the only supported location.

     This must be specified.

       ROLLOUT
          ID of the rollout or fully qualified identifier for the rollout.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --schedule-offset=SCHEDULE_OFFSET
        Offset to shift the schedule by when resuming a paused rollout, e.g.
        8h, 7d12h.

        See $ gcloud topic datetimes for information on duration formats.

     --validate-only
        Generate a new schedule without actually resuming the rollout.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub rollouts resume

        $ gcloud beta container hub rollouts resume
```

### gcloud beta container hub rollouts resume

```text
NAME
    gcloud beta container hub rollouts resume - resume a rollout resource

SYNOPSIS
    gcloud beta container hub rollouts resume ROLLOUT [--async]
        [--schedule-offset=SCHEDULE_OFFSET] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub rollouts resume

```text
NAME
    gcloud alpha container hub rollouts resume - resume a rollout resource

SYNOPSIS
    gcloud alpha container hub rollouts resume ROLLOUT [--async]
        [--schedule-offset=SCHEDULE_OFFSET] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/rollouts/resume (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

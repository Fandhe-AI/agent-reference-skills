---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/rollouts/delete
---

# gcloud container fleet rollouts delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container fleet rollouts delete

```text
NAME
    gcloud container fleet rollouts delete - delete a rollout resource

SYNOPSIS
    gcloud container fleet rollouts delete ROLLOUT [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a rollout resource.

EXAMPLES
    To delete a rollout, run:

        $ gcloud container fleet rollouts delete ROLLOUT

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet rollouts delete

        $ gcloud beta container fleet rollouts delete
```

### gcloud beta container fleet rollouts delete

```text
NAME
    gcloud beta container fleet rollouts delete - delete a rollout resource

SYNOPSIS
    gcloud beta container fleet rollouts delete ROLLOUT [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet rollouts delete

```text
NAME
    gcloud alpha container fleet rollouts delete - delete a rollout resource

SYNOPSIS
    gcloud alpha container fleet rollouts delete ROLLOUT [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/rollouts/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

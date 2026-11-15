---
source: https://docs.cloud.google.com/sdk/gcloud/reference/tasks/run
---

# gcloud tasks run

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud tasks run

```text
NAME
    gcloud tasks run - force a task to run now

SYNOPSIS
    gcloud tasks run TASK [--location=LOCATION] [--queue=QUEUE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Force a task to run now.

EXAMPLES
    To run a task:

        $ gcloud tasks run --queue=my-queue my-task

POSITIONAL ARGUMENTS
     TASK
        The task to run.

FLAGS
     --location=LOCATION
        The location where we want to manage the queue or task. If not
        specified, uses the location of the current project's App Engine app if
        there is an associated app.

     --queue=QUEUE
        The queue the task belongs to.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha tasks run

        $ gcloud beta tasks run
```

### gcloud beta tasks run

```text
NAME
    gcloud beta tasks run - force a task to run now

SYNOPSIS
    gcloud beta tasks run TASK [--location=LOCATION] [--queue=QUEUE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks run

```text
NAME
    gcloud alpha tasks run - force a task to run now

SYNOPSIS
    gcloud alpha tasks run TASK [--location=LOCATION] [--queue=QUEUE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/tasks/run (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

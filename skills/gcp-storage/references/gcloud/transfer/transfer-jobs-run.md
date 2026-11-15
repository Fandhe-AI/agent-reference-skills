---
source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs/run
---

# gcloud transfer jobs run

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud transfer jobs run

```text
NAME
    gcloud transfer jobs run - run a Transfer Service transfer job

SYNOPSIS
    gcloud transfer jobs run NAME [--no-async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Run a Transfer Service transfer job.

EXAMPLES
    To run job 'foo', run:

        $ gcloud transfer jobs run foo

POSITIONAL ARGUMENTS
     NAME
        The name of the job you want to run.

FLAGS
     --no-async
        Blocks other tasks in your terminal until the transfer operation has
        completed. If not included, tasks will run asynchronously.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer jobs run
```

### gcloud alpha transfer jobs run

```text
NAME
    gcloud alpha transfer jobs run - run a Transfer Service transfer job

SYNOPSIS
    gcloud alpha transfer jobs run NAME [--no-async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs/run (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

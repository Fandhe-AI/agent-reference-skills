---
source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs/monitor
---

# gcloud transfer jobs monitor

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud transfer jobs monitor

```text
NAME
    gcloud transfer jobs monitor - track progress in real time for a transfer
        job's latest operation

SYNOPSIS
    gcloud transfer jobs monitor NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Track progress in real time for a transfer job's latest operation.

EXAMPLES
    To monitor a job, run:

        $ gcloud transfer jobs monitor JOB-NAME

    If you're looking for recent error details, use the "Operation name"
    returned by this command as input to the "operations describe" command:

        $ gcloud transfer jobs monitor JOB-NAME

        $ gcloud transfer operations describe OPERATION-NAME

POSITIONAL ARGUMENTS
     NAME
        The name of the job you want to monitor (you'll see details for the
        job's latest operation).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer jobs monitor
```

### gcloud alpha transfer jobs monitor

```text
NAME
    gcloud alpha transfer jobs monitor - track progress in real time for a
        transfer job's latest operation

SYNOPSIS
    gcloud alpha transfer jobs monitor NAME [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs/monitor (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

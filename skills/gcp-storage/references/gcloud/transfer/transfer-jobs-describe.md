---
source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs/describe
---

# gcloud transfer jobs describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud transfer jobs describe

```text
NAME
    gcloud transfer jobs describe - get configuration and latest operation
        details about transfer job

SYNOPSIS
    gcloud transfer jobs describe NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get configuration and latest operation details about a specific transfer
    job.

EXAMPLES
    To describe a job, run:

        $ gcloud transfer jobs describe JOB-NAME

    If you're looking for recent error details, use the "latestOperationName"
    returned by this command as input to the "operations describe" command:

        $ gcloud transfer jobs describe JOB-NAME \
            --format="json(latestOperationName)"

        $ gcloud transfer operations describe OPERATION-NAME

POSITIONAL ARGUMENTS
     NAME
        The name of the job you want to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer jobs describe
```

### gcloud alpha transfer jobs describe

```text
NAME
    gcloud alpha transfer jobs describe - get configuration and latest
        operation details about transfer job

SYNOPSIS
    gcloud alpha transfer jobs describe NAME [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

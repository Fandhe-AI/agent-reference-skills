---
source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs/delete
---

# gcloud transfer jobs delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud transfer jobs delete

```text
NAME
    gcloud transfer jobs delete - delete a Transfer Service transfer job

SYNOPSIS
    gcloud transfer jobs delete NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Transfer Service transfer job.

EXAMPLES
    To delete job 'foo', run:

        $ gcloud transfer jobs delete foo

POSITIONAL ARGUMENTS
     NAME
        The name of the job you want to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer jobs delete
```

### gcloud alpha transfer jobs delete

```text
NAME
    gcloud alpha transfer jobs delete - delete a Transfer Service transfer job

SYNOPSIS
    gcloud alpha transfer jobs delete NAME [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

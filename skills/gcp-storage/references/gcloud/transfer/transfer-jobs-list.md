---
source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs/list
---

# gcloud transfer jobs list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud transfer jobs list

```text
NAME
    gcloud transfer jobs list - list Transfer Service transfer jobs

SYNOPSIS
    gcloud transfer jobs list [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=256] [--job-names=[JOB_NAMES,...]]
        [--job-statuses=[JOB_STATUSES,...]] [--expand-table]
        [--job-type=JOB_TYPE; default="transfer"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Transfer Service transfer jobs in a given project to show their
    configurations and latest operations.

EXAMPLES
    To list all jobs in your current project, run:

        $ gcloud transfer jobs list

    To list all disabled jobs in your project, run:

        $ gcloud transfer jobs list --job-statuses=disabled

    To list jobs 'foo' and 'bar', run:

        $ gcloud transfer jobs list --job-names=foo,bar

    To list all information about all jobs formatted as JSON, run:

        $ gcloud transfer jobs list --format=json

    To list all information about jobs 'foo' and 'bar' formatted as YAML, run:

        $ gcloud transfer jobs list --job-names=foo,bar --format=YAML

FLAGS
     --limit=LIMIT
        Return the first items from the API up to this limit.

     --page-size=PAGE_SIZE; default=256
        Retrieve batches of this many items from the API.

     --job-names=[JOB_NAMES,...]
        The names of the jobs you want to list. Separate multiple job names
        with commas (e.g., --job-names=foo,bar). If not specified, all jobs
        will be listed.

     --job-statuses=[JOB_STATUSES,...]
        List only jobs with the statuses you specify. Options include
        'enabled', 'disabled', 'deleted' (case insensitive). Separate multiple
        statuses with commas (e.g., --job-statuses=enabled,deleted). If not
        specified, all jobs will be listed.

     --expand-table
        Include additional table columns (job name, source, destination,
        frequency, lastest operation name, job status) in command output. Tip:
        increase the size of your terminal before running the command.

     --job-type=JOB_TYPE; default="transfer"
        The type of the job you want to list. JOB_TYPE must be one of:
        transfer, replication.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer jobs list
```

### gcloud alpha transfer jobs list

```text
NAME
    gcloud alpha transfer jobs list - list Transfer Service transfer jobs

SYNOPSIS
    gcloud alpha transfer jobs list [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=256] [--job-names=[JOB_NAMES,...]]
        [--job-statuses=[JOB_STATUSES,...]] [--expand-table]
        [--job-type=JOB_TYPE; default="transfer"] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

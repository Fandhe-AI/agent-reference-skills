---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/tasks/batch-create
---

# gcloud tasks batch-create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta tasks batch-create

```text
NAME
    gcloud beta tasks batch-create - create multiple tasks from a file in a
        single batch operation

SYNOPSIS
    gcloud beta tasks batch-create --queue=QUEUE
        --tasks-from-file=TASKS_FROM_FILE [--dry-run]
        [--failed-tasks-file=FAILED_TASKS_FILE] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks batch-create

```text
NAME
    gcloud alpha tasks batch-create - create multiple tasks from a file in a
        single batch operation

SYNOPSIS
    gcloud alpha tasks batch-create --queue=QUEUE
        --tasks-from-file=TASKS_FROM_FILE [--dry-run]
        [--failed-tasks-file=FAILED_TASKS_FILE] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/tasks/batch-create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

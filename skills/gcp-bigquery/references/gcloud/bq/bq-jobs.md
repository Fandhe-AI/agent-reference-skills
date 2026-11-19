---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/bq/jobs
---

# gcloud bq jobs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha bq jobs cancel

```text
NAME
    gcloud alpha bq jobs cancel - cancel a BigQuery job

SYNOPSIS
    gcloud alpha bq jobs cancel JOB [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq jobs config export

```text
NAME
    gcloud alpha bq jobs config export - export the configuration for a Google
        BigQuery job

SYNOPSIS
    gcloud alpha bq jobs config export ([JOB]] --all)
        [--path=PATH; default="-"] [--resource-format=RESOURCE_FORMAT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq jobs describe

```text
NAME
    gcloud alpha bq jobs describe - describe a BigQuery job

SYNOPSIS
    gcloud alpha bq jobs describe JOB [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bq jobs list

```text
NAME
    gcloud alpha bq jobs list - list all BigQuery jobs in a project

SYNOPSIS
    gcloud alpha bq jobs list [--show-all-users] [--show-config]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/bq/jobs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

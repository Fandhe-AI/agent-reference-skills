---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/workload-manager/evaluations
---

# gcloud workload-manager evaluations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha workload-manager evaluations describe

```text
NAME
    gcloud alpha workload-manager evaluations describe - describe a Workload
        Manager evaluation

SYNOPSIS
    gcloud alpha workload-manager evaluations describe
        (EVALUATION : --location=LOCATION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha workload-manager evaluations executions describe

```text
NAME
    gcloud alpha workload-manager evaluations executions describe - describe a
        Workload Manager evaluation execution

SYNOPSIS
    gcloud alpha workload-manager evaluations executions describe
        (EXECUTION : --evaluation=EVALUATION --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha workload-manager evaluations executions list

```text
NAME
    gcloud alpha workload-manager evaluations executions list - list Workload
        Manager evaluation executions

SYNOPSIS
    gcloud alpha workload-manager evaluations executions list
        (--evaluation=EVALUATION : --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha workload-manager evaluations executions list-results

```text
NAME
    gcloud alpha workload-manager evaluations executions list-results - list
        results of a Workload Manager evaluation execution

SYNOPSIS
    gcloud alpha workload-manager evaluations executions list-results
        (--execution=EXECUTION : --evaluation=EVALUATION --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha workload-manager evaluations executions list-scanned-resources

```text
NAME
    gcloud alpha workload-manager evaluations executions list-scanned-resources
        - list scanned resources of a Workload Manager evaluation execution

SYNOPSIS
    gcloud alpha workload-manager evaluations executions list-scanned-resources
        (--execution=EXECUTION : --evaluation=EVALUATION --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [--rule=RULE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha workload-manager evaluations list

```text
NAME
    gcloud alpha workload-manager evaluations list - list Workload Manager
        evaluations

SYNOPSIS
    gcloud alpha workload-manager evaluations list --location=LOCATION
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/workload-manager/evaluations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

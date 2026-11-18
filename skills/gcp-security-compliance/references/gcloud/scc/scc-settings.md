---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/scc/settings
---

# gcloud scc settings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha scc settings describe-explicit

```text
NAME
    gcloud alpha scc settings describe-explicit - display settings of Security
        Command Center(SCC)

SYNOPSIS
    gcloud alpha scc settings describe-explicit
        [--organization=ORGANIZATION_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc settings services describe

```text
NAME
    gcloud alpha scc settings services describe - display effective service
        settings of Security Command Center(SCC)

SYNOPSIS
    gcloud alpha scc settings services describe --service=SERVICE_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc settings services describe-explicit

```text
NAME
    gcloud alpha scc settings services describe-explicit - display component
        settings of Security Command Center(SCC)

SYNOPSIS
    gcloud alpha scc settings services describe-explicit --service=SERVICE_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc settings services disable

```text
NAME
    gcloud alpha scc settings services disable - disable a service in Security
        Command Center(SCC)

SYNOPSIS
    gcloud alpha scc settings services disable --service=SERVICE_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc settings services enable

```text
NAME
    gcloud alpha scc settings services enable - enable a service in Security
        Command Center(SCC)

SYNOPSIS
    gcloud alpha scc settings services enable --service=SERVICE_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc settings services inherit

```text
NAME
    gcloud alpha scc settings services inherit - set service enablement state
        to "inherited" in Security Command Center(SCC)

SYNOPSIS
    gcloud alpha scc settings services inherit --service=SERVICE_NAME
        [--folder=FOLDER_ID | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc settings services modules describe

```text
NAME
    gcloud alpha scc settings services modules describe - display effective
        module settings of Security Command Center(SCC)

SYNOPSIS
    gcloud alpha scc settings services modules describe --module=MODULE_NAME
        --service=SERVICE_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc settings services modules describe-explicit

```text
NAME
    gcloud alpha scc settings services modules describe-explicit - display
        module settings of Security Command Center(SCC)

SYNOPSIS
    gcloud alpha scc settings services modules describe-explicit
        --module=MODULE_NAME --service=SERVICE_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc settings services modules disable

```text
NAME
    gcloud alpha scc settings services modules disable - disable a module in
        Security Command Center(SCC)

SYNOPSIS
    gcloud alpha scc settings services modules disable --module=MODULE_NAME
        --service=SERVICE_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc settings services modules enable

```text
NAME
    gcloud alpha scc settings services modules enable - enable a module in
        Security Command Center(SCC)

SYNOPSIS
    gcloud alpha scc settings services modules enable --module=MODULE_NAME
        --service=SERVICE_NAME
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc settings services modules update

```text
NAME
    gcloud alpha scc settings services modules update - update a module config
        in Security Command Center(SCC)

SYNOPSIS
    gcloud alpha scc settings services modules update
        --enablement-state=ENABLEMENT_STATE --module=MODULE_NAME
        --service=SERVICE_NAME [--clear-config | --config=CONFIG_VALUE]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/scc/settings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

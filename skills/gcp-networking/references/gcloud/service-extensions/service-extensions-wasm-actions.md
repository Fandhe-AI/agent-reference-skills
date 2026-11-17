---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/service-extensions/wasm-actions
---

# gcloud service-extensions wasm-actions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha service-extensions wasm-actions create

```text
NAME
    gcloud alpha service-extensions wasm-actions create - create a WasmAction
        resource

SYNOPSIS
    gcloud alpha service-extensions wasm-actions create
        (WASM_ACTION : --location=LOCATION) --wasm-plugin=WASM_PLUGIN [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--supported-events=[EVENT,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions wasm-actions delete

```text
NAME
    gcloud alpha service-extensions wasm-actions delete - delete a WasmAction
        resource

SYNOPSIS
    gcloud alpha service-extensions wasm-actions delete
        (WASM_ACTION : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions wasm-actions describe

```text
NAME
    gcloud alpha service-extensions wasm-actions describe - show details about
        a WasmAction resource

SYNOPSIS
    gcloud alpha service-extensions wasm-actions describe
        (WASM_ACTION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions wasm-actions list

```text
NAME
    gcloud alpha service-extensions wasm-actions list - list all WasmAction
        resources

SYNOPSIS
    gcloud alpha service-extensions wasm-actions list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/service-extensions/wasm-actions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

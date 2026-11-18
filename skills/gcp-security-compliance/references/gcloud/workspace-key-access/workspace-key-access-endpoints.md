---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/workspace-key-access/endpoints
---

# gcloud workspace-key-access endpoints

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta workspace-key-access endpoints create

```text
NAME
    gcloud beta workspace-key-access endpoints create - create a Workspace Key
        Access endpoint

SYNOPSIS
    gcloud beta workspace-key-access endpoints create ENDPOINT --config=CONFIG
        --kms-key=KMS_KEY [--annotations=[ANNOTATIONS,...]] [--async]
        [--labels=[LABELS,...]] [--location=LOCATION] [--request-id=REQUEST_ID]
        [--tags=[TAGS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workspace-key-access endpoints describe

```text
NAME
    gcloud beta workspace-key-access endpoints describe - describe a Workspace
        Key Access endpoint

SYNOPSIS
    gcloud beta workspace-key-access endpoints describe
        (ENDPOINT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workspace-key-access endpoints disable

```text
NAME
    gcloud beta workspace-key-access endpoints disable - disable a Workspace
        Key Access endpoint

SYNOPSIS
    gcloud beta workspace-key-access endpoints disable
        (ENDPOINT : --location=LOCATION) [--async] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workspace-key-access endpoints enable

```text
NAME
    gcloud beta workspace-key-access endpoints enable - enable a Workspace Key
        Access endpoint

SYNOPSIS
    gcloud beta workspace-key-access endpoints enable
        (ENDPOINT : --location=LOCATION) [--async] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workspace-key-access endpoints list

```text
NAME
    gcloud beta workspace-key-access endpoints list - list Workspace Key Access
        endpoints

SYNOPSIS
    gcloud beta workspace-key-access endpoints list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workspace-key-access endpoints update

```text
NAME
    gcloud beta workspace-key-access endpoints update - update a Workspace Key
        Access endpoint

SYNOPSIS
    gcloud beta workspace-key-access endpoints update ENDPOINT [--async]
        [--config=CONFIG] [--location=LOCATION] [--request-id=REQUEST_ID]
        [--annotations=[ANNOTATIONS,...]
          | --update-annotations=[UPDATE_ANNOTATIONS,...] --clear-annotations
          | --remove-annotations=REMOVE_ANNOTATIONS]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--tags=[TAGS,...] | --update-tags=[UPDATE_TAGS,...] --clear-tags
          | --remove-tags=REMOVE_TAGS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/workspace-key-access/endpoints (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

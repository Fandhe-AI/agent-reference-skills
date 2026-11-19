---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/app-lifecycle-manager/flags/revisions
---

# gcloud app-lifecycle-manager flags revisions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta app-lifecycle-manager flags revisions create

```text
NAME
    gcloud beta app-lifecycle-manager flags revisions create - create Flag
        Revision

SYNOPSIS
    gcloud beta app-lifecycle-manager flags revisions create FLAG_REVISION
        --flag=FLAG [--annotations=[ANNOTATIONS,...]] [--labels=[LABELS,...]]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager flags revisions delete

```text
NAME
    gcloud beta app-lifecycle-manager flags revisions delete - delete Flag
        Revision

SYNOPSIS
    gcloud beta app-lifecycle-manager flags revisions delete
        (FLAG_REVISION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager flags revisions describe

```text
NAME
    gcloud beta app-lifecycle-manager flags revisions describe - describe Flag
        Revision

SYNOPSIS
    gcloud beta app-lifecycle-manager flags revisions describe
        (FLAG_REVISION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager flags revisions list

```text
NAME
    gcloud beta app-lifecycle-manager flags revisions list - list Flag
        Revisions

SYNOPSIS
    gcloud beta app-lifecycle-manager flags revisions list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager flags revisions update

```text
NAME
    gcloud beta app-lifecycle-manager flags revisions update - update Flag
        Revision

SYNOPSIS
    gcloud beta app-lifecycle-manager flags revisions update
        (FLAG_REVISION : --location=LOCATION)
        [--annotations=[ANNOTATIONS,...]
          | --update-annotations=[UPDATE_ANNOTATIONS,...] --clear-annotations
          | --remove-annotations=REMOVE_ANNOTATIONS]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/app-lifecycle-manager/flags/revisions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

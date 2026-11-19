---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/app-lifecycle-manager/flags/releases
---

# gcloud app-lifecycle-manager flags releases

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta app-lifecycle-manager flags releases create

```text
NAME
    gcloud beta app-lifecycle-manager flags releases create - create Flag
        Release

SYNOPSIS
    gcloud beta app-lifecycle-manager flags releases create FLAG_RELEASE
        --unit-kind=UNIT_KIND [--annotations=[ANNOTATIONS,...]]
        [--labels=[LABELS,...]] [--location=LOCATION]
        [--obsolete-flags=[OBSOLETE_FLAGS,...]]
        [--all-flags | --flag-sets=[FLAG_SETS,...] | --flags=[FLAGS,...]
          | --revisions=[REVISIONS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager flags releases delete

```text
NAME
    gcloud beta app-lifecycle-manager flags releases delete - delete Flag
        Release

SYNOPSIS
    gcloud beta app-lifecycle-manager flags releases delete
        (FLAG_RELEASE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager flags releases describe

```text
NAME
    gcloud beta app-lifecycle-manager flags releases describe - describe Flag
        Release

SYNOPSIS
    gcloud beta app-lifecycle-manager flags releases describe
        (FLAG_RELEASE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager flags releases list

```text
NAME
    gcloud beta app-lifecycle-manager flags releases list - list Flag Releases

SYNOPSIS
    gcloud beta app-lifecycle-manager flags releases list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager flags releases update

```text
NAME
    gcloud beta app-lifecycle-manager flags releases update - update a Flag
        Release

SYNOPSIS
    gcloud beta app-lifecycle-manager flags releases update
        (FLAG_RELEASE : --location=LOCATION)
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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/app-lifecycle-manager/flags/releases (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

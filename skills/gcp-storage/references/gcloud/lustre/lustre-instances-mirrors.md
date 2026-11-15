---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/lustre/instances/mirrors
---

# gcloud lustre instances mirrors

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha lustre instances mirrors create

```text
NAME
    gcloud alpha lustre instances mirrors create - creates a Managed Lustre
        mirror

SYNOPSIS
    gcloud alpha lustre instances mirrors create
        (MIRROR : --instance=INSTANCE --location=LOCATION)
        --direction=DIRECTION --gcs-path-uri=GCS_PATH_URI
        --lustre-path=LUSTRE_PATH [--async] [--deleted-files-retained]
        [--description=DESCRIPTION] [--labels=[LABELS,...]]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha lustre instances mirrors delete

```text
NAME
    gcloud alpha lustre instances mirrors delete - deletes a Managed Lustre
        mirror

SYNOPSIS
    gcloud alpha lustre instances mirrors delete
        (MIRROR : --instance=INSTANCE --location=LOCATION) [--async]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha lustre instances mirrors describe

```text
NAME
    gcloud alpha lustre instances mirrors describe - gets details of a single
        Managed Lustre mirror

SYNOPSIS
    gcloud alpha lustre instances mirrors describe
        (MIRROR : --instance=INSTANCE --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha lustre instances mirrors list

```text
NAME
    gcloud alpha lustre instances mirrors list - list Lustre mirrors

SYNOPSIS
    gcloud alpha lustre instances mirrors list
        (--instance=INSTANCE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha lustre instances mirrors update

```text
NAME
    gcloud alpha lustre instances mirrors update - updates the parameters of a
        single Managed Lustre mirror

SYNOPSIS
    gcloud alpha lustre instances mirrors update
        (MIRROR : --instance=INSTANCE --location=LOCATION) [--async]
        [--[no-]deleted-files-retained] [--description=DESCRIPTION]
        [--request-id=REQUEST_ID]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/lustre/instances/mirrors (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

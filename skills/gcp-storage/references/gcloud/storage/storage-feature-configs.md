---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/storage/feature-configs
---

# gcloud storage feature-configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha storage feature-configs create

```text
NAME
    gcloud alpha storage feature-configs create - create a new Feature Config

SYNOPSIS
    gcloud alpha storage feature-configs create CONFIG_ID
        (--auto-annotate-models=[AUTO_ANNOTATE_MODELS,...]
          --auto-annotate-processing-location=AUTO_ANNOTATE_PROCESSING_LOCATION)
        [--async] [--description=DESCRIPTION]
        [--exclude-bucket-id-regexes=[EXCLUDE_BUCKET_ID_REGEXES,...]
          | --include-bucket-id-regexes=[INCLUDE_BUCKET_ID_REGEXES,...]]
        [--exclude-locations=[EXCLUDE_LOCATIONS,...]
          | --include-locations=[INCLUDE_LOCATIONS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage feature-configs delete

```text
NAME
    gcloud alpha storage feature-configs delete - delete a Feature Config

SYNOPSIS
    gcloud alpha storage feature-configs delete CONFIG_ID [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage feature-configs describe

```text
NAME
    gcloud alpha storage feature-configs describe - describe a Feature Config

SYNOPSIS
    gcloud alpha storage feature-configs describe CONFIG_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage feature-configs list

```text
NAME
    gcloud alpha storage feature-configs list - list Cloud Storage Smart
        Storage Feature Configurations

SYNOPSIS
    gcloud alpha storage feature-configs list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage feature-configs update

```text
NAME
    gcloud alpha storage feature-configs update - update a Feature Config

SYNOPSIS
    gcloud alpha storage feature-configs update CONFIG_ID [--async]
        [--auto-annotate-models=[AUTO_ANNOTATE_MODELS,...]]
        [--auto-annotate-processing-location=AUTO_ANNOTATE_PROCESSING_LOCATION]
        [--description=DESCRIPTION]
        [--exclude-bucket-id-regexes=[EXCLUDE_BUCKET_ID_REGEXES,...]
          | --include-bucket-id-regexes=[INCLUDE_BUCKET_ID_REGEXES,...]]
        [--exclude-locations=[EXCLUDE_LOCATIONS,...]
          | --include-locations=[INCLUDE_LOCATIONS,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/storage/feature-configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

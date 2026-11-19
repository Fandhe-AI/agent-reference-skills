---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/data-catalog/crawlers
---

# gcloud data-catalog crawlers

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha data-catalog crawlers create

```text
NAME
    gcloud alpha data-catalog crawlers create - create a new Data Catalog
        crawler

SYNOPSIS
    gcloud alpha data-catalog crawlers create CRAWLER
        (--crawl-scope=CRAWL_SCOPE : --buckets=[BUCKET,...])
        (--run-option=RUN_OPTION : --run-schedule=RUN_SCHEDULE)
        [--bundle-specs=[PATTERN,...]] [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog crawlers delete

```text
NAME
    gcloud alpha data-catalog crawlers delete - delete a Data Catalog crawler

SYNOPSIS
    gcloud alpha data-catalog crawlers delete CRAWLER [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog crawlers describe

```text
NAME
    gcloud alpha data-catalog crawlers describe - describe a Data Catalog
        crawler

SYNOPSIS
    gcloud alpha data-catalog crawlers describe CRAWLER [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog crawlers list

```text
NAME
    gcloud alpha data-catalog crawlers list - list Data Catalog crawlers

SYNOPSIS
    gcloud alpha data-catalog crawlers list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog crawlers update

```text
NAME
    gcloud alpha data-catalog crawlers update - update a Data Catalog crawler

SYNOPSIS
    gcloud alpha data-catalog crawlers update CRAWLER
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--add-bundle-specs=[PATTERN,...] --clear-bundle-specs
          | --remove-bundle-specs=[PATTERN,...]]
        [--crawl-scope=CRAWL_SCOPE --add-buckets=[BUCKET,...] --clear-buckets
          | --remove-buckets=[BUCKET,...]]
        [--run-option=RUN_OPTION --run-schedule=RUN_SCHEDULE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated: the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19). The commands on this page belong to the deprecated metadata search and cataloging features; they are still in the gcloud 593.0.0 help.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/data-catalog/crawlers (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

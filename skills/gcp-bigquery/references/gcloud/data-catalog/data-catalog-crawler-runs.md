---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/data-catalog/crawler-runs
---

# gcloud data-catalog crawler-runs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha data-catalog crawler-runs describe

```text
NAME
    gcloud alpha data-catalog crawler-runs describe - describe a Data Catalog
        crawler run

SYNOPSIS
    gcloud alpha data-catalog crawler-runs describe
        (CRAWLER_RUN : --crawler=CRAWLER) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog crawler-runs list

```text
NAME
    gcloud alpha data-catalog crawler-runs list - list Data Catalog crawler
        runs

SYNOPSIS
    gcloud alpha data-catalog crawler-runs list CRAWLER [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog crawler-runs start

```text
NAME
    gcloud alpha data-catalog crawler-runs start - start a Data Catalog crawler
        run

SYNOPSIS
    gcloud alpha data-catalog crawler-runs start CRAWLER [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated: the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19). The commands on this page belong to the deprecated metadata search and cataloging features; they are still in the gcloud 593.0.0 help.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/data-catalog/crawler-runs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/search
---

# gcloud data-catalog search

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud data-catalog search

```text
NAME
    gcloud data-catalog search - search Data Catalog for resources that match a
        query

SYNOPSIS
    gcloud data-catalog search QUERY
        (--include-gcp-public-datasets
          --include-organization-ids=[ORGANIZATION,...]
          --include-project-ids=[PROJECT,...]
          --restricted-locations=[LOCATION,...]) [--limit=LIMIT]
        [--order-by=ORDER_BY] [--page-size=PAGE_SIZE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex entries
    search instead.

    Search Data Catalog for resources that match a query.

EXAMPLES
    To search project 'my-project' for Data Catalog resources that match the
    simple predicate 'foo':

        $ gcloud data-catalog search 'foo' --include-project-ids=my-project

    To search organization '1234' for Data Catalog resources that match
    entities whose names match the predicate 'foo':

        $ gcloud data-catalog search 'name:foo' \
            --include-organization-ids=1234

POSITIONAL ARGUMENTS
     QUERY
        Query string in search query syntax in Data Catalog. For more
        information, see:
        https://cloud.google.com/data-catalog/docs/how-to/search-reference

REQUIRED FLAGS
     Scope. Control the scope of the search.

     At least one of these must be specified:

       --include-gcp-public-datasets
          If True, include Google Cloud Platform public datasets in the search
          results.

       --include-organization-ids=[ORGANIZATION,...]
          List of Cloud Organization IDs to include in the search.

       --include-project-ids=[PROJECT,...]
          List of Cloud Project IDs to include in the search.

       --restricted-locations=[LOCATION,...]
          List of locations to search within.

LIST COMMAND FLAGS
     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited.

     --order-by=ORDER_BY
        Specifies the ordering of results. Defaults to 'relevance'.

        Currently supported case-sensitive choices are:

        * relevance
        * last_access_timestamp [asc|desc]: defaults to descending.
        * last_modified_timestamp [asc|desc]: defaults to descending.

        To order by last modified timestamp ascending, specify:
        --order-by="last_modified_timestamp desc".

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog search

        $ gcloud beta data-catalog search
```

### gcloud beta data-catalog search

```text
NAME
    gcloud beta data-catalog search - search Data Catalog for resources that
        match a query

SYNOPSIS
    gcloud beta data-catalog search QUERY
        (--include-gcp-public-datasets
          --include-organization-ids=[ORGANIZATION,...]
          --include-project-ids=[PROJECT,...]
          --restricted-locations=[LOCATION,...]) [--limit=LIMIT]
        [--order-by=ORDER_BY] [--page-size=PAGE_SIZE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog search

```text
NAME
    gcloud alpha data-catalog search - search Data Catalog for resources that
        match a query

SYNOPSIS
    gcloud alpha data-catalog search QUERY
        (--include-gcp-public-datasets
          --include-organization-ids=[ORGANIZATION,...]
          --include-project-ids=[PROJECT,...]
          --restricted-locations=[LOCATION,...]) [--limit=LIMIT]
        [--order-by=ORDER_BY] [--page-size=PAGE_SIZE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud data-catalog search`: "This command is deprecated. Please use gcloud dataplex entries search instead.".
- Deprecated: the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19). The commands on this page belong to the deprecated metadata search and cataloging features; they are still in the gcloud 593.0.0 help.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/search (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/taxonomies/get-iam-policy
---

# gcloud data-catalog taxonomies get-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud data-catalog taxonomies get-iam-policy

```text
NAME
    gcloud data-catalog taxonomies get-iam-policy - get the IAM policy for a
        Policy Tag Taxonomy

SYNOPSIS
    gcloud data-catalog taxonomies get-iam-policy
        (TAXONOMY : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud data-catalog taxonomies get-iam-policy displays the IAM policy
    associated with a Policy Tag Taxonomy. If formatted as JSON, the output can
    be edited and used as a policy file for set-iam-policy. The output includes
    an "etag" field identifying the version emitted and allowing detection of
    concurrent policy updates; see $ gcloud data-catalog taxonomies
    set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for 'TAXONOMY' in 'LOCATION', run:

        $ gcloud data-catalog taxonomies get-iam-policy TAXONOMY \
            --location='LOCATION'

POSITIONAL ARGUMENTS
     Taxonomy resource - Policy tag taxonomy for which to display the IAM
     policy. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument taxonomy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TAXONOMY
          ID of the taxonomy or fully qualified identifier for the taxonomy.

          To set the taxonomy attribute:
          + provide the argument taxonomy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the taxonomy.

          To set the location attribute:
          + provide the argument taxonomy on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog taxonomies get-iam-policy

        $ gcloud beta data-catalog taxonomies get-iam-policy
```

### gcloud beta data-catalog taxonomies get-iam-policy

```text
NAME
    gcloud beta data-catalog taxonomies get-iam-policy - get the IAM policy for
        a Policy Tag Taxonomy

SYNOPSIS
    gcloud beta data-catalog taxonomies get-iam-policy
        (TAXONOMY : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog taxonomies get-iam-policy

```text
NAME
    gcloud alpha data-catalog taxonomies get-iam-policy - get the IAM policy
        for a Policy Tag Taxonomy

SYNOPSIS
    gcloud alpha data-catalog taxonomies get-iam-policy
        (TAXONOMY : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Not deprecated: the commands on this page manage Policy Tag Manager taxonomies and policy tags; the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/taxonomies/get-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

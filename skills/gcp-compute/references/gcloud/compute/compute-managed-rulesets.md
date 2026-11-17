---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/managed-rulesets
---

# gcloud compute managed-rulesets

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute managed-rulesets describe

```text
NAME
    gcloud compute managed-rulesets describe - describe a Cloud Armor managed
        ruleset

SYNOPSIS
    gcloud compute managed-rulesets describe MANAGED_RULESET
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Armor managed ruleset by its canonical name.

EXAMPLES
    To describe a managed ruleset named google-sqli-canary:

        $ gcloud compute managed-rulesets describe google-sqli-canary

POSITIONAL ARGUMENTS
     Managed Ruleset resource - The canonical name of the managed ruleset to
     describe. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument managed_ruleset on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MANAGED_RULESET
          ID of the Managed Ruleset or fully qualified identifier for the
          Managed Ruleset.

          To set the managed_ruleset attribute:
          + provide the argument managed_ruleset on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute managed-rulesets describe

        $ gcloud beta compute managed-rulesets describe
```

### gcloud compute managed-rulesets list

```text
NAME
    gcloud compute managed-rulesets list - list pre-configured Cloud Armor
        managed rulesets

SYNOPSIS
    gcloud compute managed-rulesets list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all available pre-configured Cloud Armor managed rulesets.

EXAMPLES
    To list all available managed rulesets:

        $ gcloud compute managed-rulesets list

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

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute managed-rulesets list

        $ gcloud beta compute managed-rulesets list
```

### gcloud beta compute managed-rulesets describe

```text
NAME
    gcloud beta compute managed-rulesets describe - describe a Cloud Armor
        managed ruleset

SYNOPSIS
    gcloud beta compute managed-rulesets describe MANAGED_RULESET
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute managed-rulesets list

```text
NAME
    gcloud beta compute managed-rulesets list - list pre-configured Cloud Armor
        managed rulesets

SYNOPSIS
    gcloud beta compute managed-rulesets list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute managed-rulesets describe

```text
NAME
    gcloud alpha compute managed-rulesets describe - describe a Cloud Armor
        managed ruleset

SYNOPSIS
    gcloud alpha compute managed-rulesets describe MANAGED_RULESET
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute managed-rulesets list

```text
NAME
    gcloud alpha compute managed-rulesets list - list pre-configured Cloud
        Armor managed rulesets

SYNOPSIS
    gcloud alpha compute managed-rulesets list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/managed-rulesets (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

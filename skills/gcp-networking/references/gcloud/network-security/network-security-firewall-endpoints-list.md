---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/firewall-endpoints/list
---

# gcloud network-security firewall-endpoints list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security firewall-endpoints list

```text
NAME
    gcloud network-security firewall-endpoints list - list Firewall Plus
        endpoints

SYNOPSIS
    gcloud network-security firewall-endpoints list
        [--location=LOCATION | --zone=ZONE]
        [--organization=ORGANIZATION --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List firewall endpoints.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To list firewall endpoints in organization ID 1234, run:

        $ gcloud network-security firewall-endpoints list --organization=1234

FLAGS
     At most one of these can be specified:

       --location=LOCATION
          The location for a list operation

       --zone=ZONE
          The zone for a list operation

     --organization=ORGANIZATION
        The organization for a list operation

     --project=PROJECT_ID
        The project for a list operation

        The Google Cloud project ID to use for this invocation. If omitted,
        then the current project is assumed; the current project can be listed
        using gcloud config list --format='text(core.project)' and can be set
        using gcloud config set project PROJECTID.

        --project and its fallback core/project property play two roles in the
        invocation: they specify both the project of the resource to operate
        on, and the project for API enablement checks, quota, and billing. To
        specify a different project for quota and billing, use the
        --billing-project flag or the billing/quota_project property.

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

NOTES
    These variants are also available:

        $ gcloud alpha network-security firewall-endpoints list

        $ gcloud beta network-security firewall-endpoints list
```

### gcloud beta network-security firewall-endpoints list

```text
NAME
    gcloud beta network-security firewall-endpoints list - list Firewall Plus
        endpoints

SYNOPSIS
    gcloud beta network-security firewall-endpoints list
        [--location=LOCATION | --zone=ZONE]
        [--organization=ORGANIZATION --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security firewall-endpoints list

```text
NAME
    gcloud alpha network-security firewall-endpoints list - list Firewall Plus
        endpoints

SYNOPSIS
    gcloud alpha network-security firewall-endpoints list
        [--location=LOCATION | --zone=ZONE]
        [--organization=ORGANIZATION --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/firewall-endpoints/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

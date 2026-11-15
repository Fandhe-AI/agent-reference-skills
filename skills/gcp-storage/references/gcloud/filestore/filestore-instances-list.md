---
source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/list
---

# gcloud filestore instances list

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud filestore instances list

```text
NAME
    gcloud filestore instances list - list Filestore instances

SYNOPSIS
    gcloud filestore instances list [--location=LOCATION] [--region=REGION]
        [--zone=ZONE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    The following command lists a maximum of five Filestore instances sorted
    alphabetically by name in descending order:

        $ gcloud filestore instances list --limit=5 --sort-by=~name

FLAGS
     --location=LOCATION
        Location of the Cloud Filestore instance/operation.

     --region=REGION
        Region of the Cloud Filestore instance.

     Zone resource - The location in which to list instances. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --zone on the command line with a fully
        specified name;
      * uses all locations by default. with a fully specified name;
      * provide the argument region on the command line with a fully
        specified name;
      * provide the argument location on the command line with a fully
        specified name;
      * set the property filestore/zone with a fully specified name;
      * set the property filestore/region with a fully specified name;
      * set the property filestore/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --zone=ZONE
        ID of the zone or fully qualified identifier for the zone.

        To set the zone attribute:
        * provide the argument --zone on the command line;
        * uses all locations by default.;
        * provide the argument region on the command line;
        * provide the argument location on the command line;
        * set the property filestore/zone;
        * set the property filestore/region;
        * set the property filestore/location.

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

        $ gcloud alpha filestore instances list

        $ gcloud beta filestore instances list
```

### gcloud beta filestore instances list

```text
NAME
    gcloud beta filestore instances list - list Filestore instances

SYNOPSIS
    gcloud beta filestore instances list [--location=LOCATION]
        [--region=REGION] [--zone=ZONE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha filestore instances list

```text
NAME
    gcloud alpha filestore instances list - list Filestore instances

SYNOPSIS
    gcloud alpha filestore instances list [--location=LOCATION]
        [--region=REGION] [--zone=ZONE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/list (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

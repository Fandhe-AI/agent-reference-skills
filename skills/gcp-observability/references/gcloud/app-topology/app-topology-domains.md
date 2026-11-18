---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app-topology/domains
---

# gcloud app-topology domains

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app-topology domains describe

```text
NAME
    gcloud app-topology domains describe - describe an App Topology domain

SYNOPSIS
    gcloud app-topology domains describe (DOMAIN : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieves and displays the configuration details and status of an App
    Topology domain.

EXAMPLES
    To describe a domain named SRE in default global location:

        $ gcloud app-topology domains describe SRE

    To describe a domain in an explicit location:

        $ gcloud app-topology domains describe SRE --location=global

POSITIONAL ARGUMENTS
     Domain resource - The domain to describe. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument DOMAIN on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DOMAIN
          ID of the domain or fully qualified identifier for the domain.

          To set the domain attribute:
          + provide the argument DOMAIN on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location for the domain. Defaults to "global".

          To set the location attribute:
          + provide the argument DOMAIN on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + App Topology currently supports global location by default.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha app-topology domains describe

        $ gcloud beta app-topology domains describe
```

### gcloud app-topology domains list

```text
NAME
    gcloud app-topology domains list - list App Topology domains

SYNOPSIS
    gcloud app-topology domains list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all topology domains registered in the specified location (defaults
    to 'global').

EXAMPLES
    To list all App Topology domains in the default global location:

        $ gcloud app-topology domains list

    To list all App Topology domains in a specific location:

        $ gcloud app-topology domains list --location=global

    To list all App Topology domains with their full resource URIs:

        $ gcloud app-topology domains list --uri

FLAGS
     Location resource - The location to list domains for. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * App Topology currently supports global location by default with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * App Topology currently supports global location by default.

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

        $ gcloud alpha app-topology domains list

        $ gcloud beta app-topology domains list
```

### gcloud app-topology domains schema describe

```text
NAME
    gcloud app-topology domains schema describe - describe the schema for an
        App Topology domain

SYNOPSIS
    gcloud app-topology domains schema describe (DOMAIN : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays the node types, edge types, and supported property schemas
    available within the specified topology domain.

EXAMPLES
    To describe the schema for the SRE domain in the default global location:

        $ gcloud app-topology domains schema describe SRE

    To describe the schema for a domain in an explicit location:

        $ gcloud app-topology domains schema describe SRE --location=global

POSITIONAL ARGUMENTS
     Domain resource - The domain whose schema to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument DOMAIN on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DOMAIN
          ID of the domain or fully qualified identifier for the domain.

          To set the domain attribute:
          + provide the argument DOMAIN on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location for the domain. Defaults to "global".

          To set the location attribute:
          + provide the argument DOMAIN on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + App Topology currently supports global location by default.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha app-topology domains schema describe

        $ gcloud beta app-topology domains schema describe
```

### gcloud beta app-topology domains describe

```text
NAME
    gcloud beta app-topology domains describe - describe an App Topology domain

SYNOPSIS
    gcloud beta app-topology domains describe (DOMAIN : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-topology domains list

```text
NAME
    gcloud beta app-topology domains list - list App Topology domains

SYNOPSIS
    gcloud beta app-topology domains list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-topology domains schema describe

```text
NAME
    gcloud beta app-topology domains schema describe - describe the schema for
        an App Topology domain

SYNOPSIS
    gcloud beta app-topology domains schema describe
        (DOMAIN : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha app-topology domains describe

```text
NAME
    gcloud alpha app-topology domains describe - describe an App Topology
        domain

SYNOPSIS
    gcloud alpha app-topology domains describe (DOMAIN : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha app-topology domains list

```text
NAME
    gcloud alpha app-topology domains list - list App Topology domains

SYNOPSIS
    gcloud alpha app-topology domains list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha app-topology domains schema describe

```text
NAME
    gcloud alpha app-topology domains schema describe - describe the schema for
        an App Topology domain

SYNOPSIS
    gcloud alpha app-topology domains schema describe
        (DOMAIN : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app-topology/domains (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

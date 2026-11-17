---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-config/inventories
---

# gcloud compute os-config inventories

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute os-config inventories describe

```text
NAME
    gcloud compute os-config inventories describe - describe the inventory data
        for a Compute Engine VM instance

SYNOPSIS
    gcloud compute os-config inventories describe
        (INSTANCE : --location=LOCATION) [--endpoint-mode=ENDPOINT_MODE]
        [--view=VIEW] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe the inventory data for a Compute Engine VM instance.

EXAMPLES
    To describe the inventory of an instance my-instance that has the instance
    ID 5678 in the current project and location 'us-central1-a', run:

        $ gcloud compute os-config inventories describe my-instance \
            --location=us-central1-a

POSITIONAL ARGUMENTS
     Compute Engine VM instance resource - Compute Engine VM instance whose
     inventory data to describe. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the Compute Engine VM instance or fully qualified identifier
          for the Compute Engine VM instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Compute Engine VM instance.

          To set the location attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property compute/zone.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --view=VIEW
        Specifies what information should be included in the output. If
        unspecified, the default view is basic. VIEW must be one of:

         basic
            Output is limited to operating system details.
         full
            Output includes operating system details and package information.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the osconfig/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha compute os-config inventories describe
```

### gcloud compute os-config inventories list

```text
NAME
    gcloud compute os-config inventories list - list inventory data for all
        Compute Engine VM instances in a specified location

SYNOPSIS
    gcloud compute os-config inventories list [--endpoint-mode=ENDPOINT_MODE]
        [--location=LOCATION] [--view=VIEW] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List inventory data for all Compute Engine VM instances in a specified
    location.

    The default page size is 25. To modify this, use the --page-size flag.

EXAMPLES
    To list the inventory of VMs in my-project and location us-central1-a, run:

        $ gcloud compute os-config inventories list --project=my-project \
            --location=us-central1-a

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     Location resource - Location in which to list inventories. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property compute/zone with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property compute/zone.

     --view=VIEW
        Specifies what information should be included in the output. If
        unspecified, the default view is basic. VIEW must be one of:

         basic
            Output is limited to operating system details.
         full
            Output includes operating system details and package information.

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
    This command uses the osconfig/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha compute os-config inventories list
```

### gcloud alpha compute os-config inventories describe

```text
NAME
    gcloud alpha compute os-config inventories describe - describe the
        inventory data for a Compute Engine VM instance

SYNOPSIS
    gcloud alpha compute os-config inventories describe
        (INSTANCE : --location=LOCATION) [--endpoint-mode=ENDPOINT_MODE]
        [--view=VIEW] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-config inventories list

```text
NAME
    gcloud alpha compute os-config inventories list - list inventory data for
        all Compute Engine VM instances in a specified location

SYNOPSIS
    gcloud alpha compute os-config inventories list
        [--endpoint-mode=ENDPOINT_MODE] [--location=LOCATION] [--view=VIEW]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-config/inventories (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

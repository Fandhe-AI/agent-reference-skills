---
source: https://docs.cloud.google.com/sdk/gcloud/reference/service-extensions/lb-traffic-extensions
---

# gcloud service-extensions lb-traffic-extensions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud service-extensions lb-traffic-extensions delete

```text
NAME
    gcloud service-extensions lb-traffic-extensions delete - delete an
        LbTrafficExtension resource

SYNOPSIS
    gcloud service-extensions lb-traffic-extensions delete
        (LB_TRAFFIC_EXTENSION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified LbTrafficExtension resource.

EXAMPLES
    To delete an LbTrafficExtension resource named my-traffic-extension in
    us-central1, run:

        $ gcloud service-extensions lb-traffic-extensions delete \
            my-traffic-extension --location=us-central1

POSITIONAL ARGUMENTS
     LbTrafficExtension resource - The ID of the deleted LbTrafficExtension
     resource. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument lb_traffic_extension on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LB_TRAFFIC_EXTENSION
          ID of the LbTrafficExtension or fully qualified identifier for the
          LbTrafficExtension.

          To set the lb_traffic_extension attribute:
          + provide the argument lb_traffic_extension on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Cloud region in which the resource is located.

          To set the location attribute:
          + provide the argument lb_traffic_extension on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha service-extensions lb-traffic-extensions delete

        $ gcloud beta service-extensions lb-traffic-extensions delete
```

### gcloud service-extensions lb-traffic-extensions describe

```text
NAME
    gcloud service-extensions lb-traffic-extensions describe - describe an
        LbTrafficExtension resource

SYNOPSIS
    gcloud service-extensions lb-traffic-extensions describe
        (LB_TRAFFIC_EXTENSION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of an LbTrafficExtension resource.

EXAMPLES
    To show details about the LbTrafficExtension resource named
    my-traffic-extension located in us-central1.

        $ gcloud service-extensions lb-traffic-extensions describe \
            my-traffic-extension --location=us-central1

POSITIONAL ARGUMENTS
     LbTrafficExtension resource - The ID of the LbTrafficExtension resource.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument lb_traffic_extension on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LB_TRAFFIC_EXTENSION
          ID of the LbTrafficExtension or fully qualified identifier for the
          LbTrafficExtension.

          To set the lb_traffic_extension attribute:
          + provide the argument lb_traffic_extension on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Cloud region in which the resource is located.

          To set the location attribute:
          + provide the argument lb_traffic_extension on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha service-extensions lb-traffic-extensions describe

        $ gcloud beta service-extensions lb-traffic-extensions describe
```

### gcloud service-extensions lb-traffic-extensions import

```text
NAME
    gcloud service-extensions lb-traffic-extensions import - import an
        LbTrafficExtension resource

SYNOPSIS
    gcloud service-extensions lb-traffic-extensions import
        (LB_TRAFFIC_EXTENSION : --location=LOCATION) [--async]
        [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Import an LbTrafficExtension resource defined in a YAML file.

EXAMPLES
    To import an LbTrafficExtension resource named my-traffic-extension from a
    YAML file in us-central1, run:

        $ gcloud service-extensions lb-traffic-extensions import \
          my-traffic-extension --source=my-traffic-extension.yaml \
          --location=us-central1

POSITIONAL ARGUMENTS
     LbTrafficExtension resource - The ID of the new or updated
     LbTrafficExtension resource. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument lb_traffic_extension on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LB_TRAFFIC_EXTENSION
          ID of the LbTrafficExtension or fully qualified identifier for the
          LbTrafficExtension.

          To set the lb_traffic_extension attribute:
          + provide the argument lb_traffic_extension on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Cloud region in which the resource is located.

          To set the location attribute:
          + provide the argument lb_traffic_extension on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --source=SOURCE
        Path to a YAML file containing the configuration export data. The YAML
        file must not contain any output-only fields. Alternatively, you may
        omit this flag to read from standard input. For a schema describing the
        export/import format, see: $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

        $CLOUDSDKROOT is can be obtained with the following command:

            $ gcloud info --format='value(installation.sdk_root)'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha service-extensions lb-traffic-extensions import

        $ gcloud beta service-extensions lb-traffic-extensions import
```

### gcloud service-extensions lb-traffic-extensions list

```text
NAME
    gcloud service-extensions lb-traffic-extensions list - list
        LbTrafficExtension resources

SYNOPSIS
    gcloud service-extensions lb-traffic-extensions list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all LbTrafficExtension resources in the specified location of the
    current project.

EXAMPLES
    To list all LbTrafficExtension resources in the current project located in
    us-central1 region, run:

        $ gcloud service-extensions lb-traffic-extensions list \
            --location=us-central1

REQUIRED FLAGS
     Location resource - The parent location. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha service-extensions lb-traffic-extensions list

        $ gcloud beta service-extensions lb-traffic-extensions list
```

### gcloud beta service-extensions lb-traffic-extensions delete

```text
NAME
    gcloud beta service-extensions lb-traffic-extensions delete - delete an
        LbTrafficExtension resource

SYNOPSIS
    gcloud beta service-extensions lb-traffic-extensions delete
        (LB_TRAFFIC_EXTENSION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions lb-traffic-extensions describe

```text
NAME
    gcloud beta service-extensions lb-traffic-extensions describe - describe an
        LbTrafficExtension resource

SYNOPSIS
    gcloud beta service-extensions lb-traffic-extensions describe
        (LB_TRAFFIC_EXTENSION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions lb-traffic-extensions import

```text
NAME
    gcloud beta service-extensions lb-traffic-extensions import - import an
        LbTrafficExtension resource

SYNOPSIS
    gcloud beta service-extensions lb-traffic-extensions import
        (LB_TRAFFIC_EXTENSION : --location=LOCATION) [--async]
        [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta service-extensions lb-traffic-extensions list

```text
NAME
    gcloud beta service-extensions lb-traffic-extensions list - list
        LbTrafficExtension resources

SYNOPSIS
    gcloud beta service-extensions lb-traffic-extensions list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions lb-traffic-extensions delete

```text
NAME
    gcloud alpha service-extensions lb-traffic-extensions delete - delete an
        LbTrafficExtension resource

SYNOPSIS
    gcloud alpha service-extensions lb-traffic-extensions delete
        (LB_TRAFFIC_EXTENSION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions lb-traffic-extensions describe

```text
NAME
    gcloud alpha service-extensions lb-traffic-extensions describe - describe
        an LbTrafficExtension resource

SYNOPSIS
    gcloud alpha service-extensions lb-traffic-extensions describe
        (LB_TRAFFIC_EXTENSION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions lb-traffic-extensions import

```text
NAME
    gcloud alpha service-extensions lb-traffic-extensions import - import an
        LbTrafficExtension resource

SYNOPSIS
    gcloud alpha service-extensions lb-traffic-extensions import
        (LB_TRAFFIC_EXTENSION : --location=LOCATION) [--async]
        [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha service-extensions lb-traffic-extensions list

```text
NAME
    gcloud alpha service-extensions lb-traffic-extensions list - list
        LbTrafficExtension resources

SYNOPSIS
    gcloud alpha service-extensions lb-traffic-extensions list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/service-extensions/lb-traffic-extensions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

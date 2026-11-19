---
source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/automations
---

# gcloud deploy automations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud deploy automations delete

```text
NAME
    gcloud deploy automations delete - deletes a Cloud Deploy Automation

SYNOPSIS
    gcloud deploy automations delete
        (AUTOMATION : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a Cloud Deploy Automation.

EXAMPLES
    To delete an automation test-automation for delivery pipeline
    test-pipeline, in region us-central1, run:

        $ gcloud deploy automations delete test-automation \
            --delivery-pipeline=test-pipeline --region=us-central1

POSITIONAL ARGUMENTS
     Automation resource - The name of the Automation. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument automation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTOMATION
          ID of the automation or fully qualified identifier for the
          automation.

          To set the name attribute:
          + provide the argument automation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The delivery pipeline associated with the automation. Alternatively,
          set the property [deploy/delivery-pipeline].

          To set the delivery-pipeline attribute:
          + provide the argument automation on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          The Cloud region for the automation. Alternatively, set the property
          [deploy/region].

          To set the region attribute:
          + provide the argument automation on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha deploy automations delete

        $ gcloud beta deploy automations delete
```

### gcloud deploy automations describe

```text
NAME
    gcloud deploy automations describe - show details for an Automation

SYNOPSIS
    gcloud deploy automations describe
        (AUTOMATION : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details for a specified automation.

EXAMPLES
    To show details about an automation 'test-automation', for delivery
    pipeline 'test-pipeline', in region 'us-central1', run:

        $ gcloud deploy automations describe test-automation \
            --delivery-pipeline=test-pipeline --region=us-central1

POSITIONAL ARGUMENTS
     Automation resource - The name of the automation you want to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument automation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTOMATION
          ID of the automation or fully qualified identifier for the
          automation.

          To set the automation attribute:
          + provide the argument automation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The name of the Cloud Deploy delivery pipeline.

          To set the delivery-pipeline attribute:
          + provide the argument automation on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          Location of the automation.

          To set the region attribute:
          + provide the argument automation on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the clouddeploy/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/deploy/

NOTES
    These variants are also available:

        $ gcloud alpha deploy automations describe

        $ gcloud beta deploy automations describe
```

### gcloud deploy automations export

```text
NAME
    gcloud deploy automations export - returns the YAML definition of the
        specified Automation

SYNOPSIS
    gcloud deploy automations export
        (AUTOMATION : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The exported yaml definition can be applied by using the deploy apply
    command.

EXAMPLES
    To return the YAML definition of the automation test-automation of delivery
    pipeline test-pipeline, in region us-central1, run:

        $ gcloud deploy automations export test-automation \
            --delivery-pipeline=test-pipeline --region=us-central1

POSITIONAL ARGUMENTS
     Automation resource - The name of the Automation. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument automation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTOMATION
          ID of the automation or fully qualified identifier for the
          automation.

          To set the name attribute:
          + provide the argument automation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The delivery pipeline associated with the automation. Alternatively,
          set the property [deploy/delivery-pipeline].

          To set the delivery-pipeline attribute:
          + provide the argument automation on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          The Cloud region for the automation. Alternatively, set the property
          [deploy/region].

          To set the region attribute:
          + provide the argument automation on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

FLAGS
     --destination=DESTINATION
        Path to a YAML file where the configuration will be exported.
        Alternatively, you may omit this flag to write to standard output.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha deploy automations export

        $ gcloud beta deploy automations export
```

### gcloud deploy automations list

```text
NAME
    gcloud deploy automations list - list the Automations

SYNOPSIS
    gcloud deploy automations list
        [--delivery-pipeline=DELIVERY_PIPELINE --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the automations for a specified delivery pipeline.

EXAMPLES
    To list the automations for delivery pipeline 'test-pipeline' in region
    'us-central1', run:

        $ gcloud deploy automations list --delivery-pipeline=test-pipeline \
            --region=us-central1

FLAGS
     Delivery pipeline resource - The delivery pipeline for which you want to
     list the automations. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --delivery-pipeline on the command line with a
        fully specified name;
      * set the property deploy/delivery_pipeline with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --delivery-pipeline=DELIVERY_PIPELINE
        ID of the delivery_pipeline or fully qualified identifier for the
        delivery_pipeline.

        To set the delivery-pipeline attribute:
        * provide the argument --delivery-pipeline on the command line;
        * set the property deploy/delivery_pipeline.

     --region=REGION
        Location of the delivery_pipeline.

        To set the region attribute:
        * provide the argument --delivery-pipeline on the command line with a
          fully specified name;
        * set the property deploy/delivery_pipeline with a fully specified
          name;
        * provide the argument --region on the command line;
        * set the property deploy/region.

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
    This command uses the clouddeploy/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/deploy/

NOTES
    These variants are also available:

        $ gcloud alpha deploy automations list

        $ gcloud beta deploy automations list
```

### gcloud beta deploy automations delete

```text
NAME
    gcloud beta deploy automations delete - deletes a Cloud Deploy Automation

SYNOPSIS
    gcloud beta deploy automations delete
        (AUTOMATION : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy automations describe

```text
NAME
    gcloud beta deploy automations describe - show details for an Automation

SYNOPSIS
    gcloud beta deploy automations describe
        (AUTOMATION : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy automations export

```text
NAME
    gcloud beta deploy automations export - returns the YAML definition of the
        specified Automation

SYNOPSIS
    gcloud beta deploy automations export
        (AUTOMATION : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy automations list

```text
NAME
    gcloud beta deploy automations list - list the Automations

SYNOPSIS
    gcloud beta deploy automations list
        [--delivery-pipeline=DELIVERY_PIPELINE --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy automations delete

```text
NAME
    gcloud alpha deploy automations delete - deletes a Cloud Deploy Automation

SYNOPSIS
    gcloud alpha deploy automations delete
        (AUTOMATION : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy automations describe

```text
NAME
    gcloud alpha deploy automations describe - show details for an Automation

SYNOPSIS
    gcloud alpha deploy automations describe
        (AUTOMATION : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy automations export

```text
NAME
    gcloud alpha deploy automations export - returns the YAML definition of the
        specified Automation

SYNOPSIS
    gcloud alpha deploy automations export
        (AUTOMATION : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy automations list

```text
NAME
    gcloud alpha deploy automations list - list the Automations

SYNOPSIS
    gcloud alpha deploy automations list
        [--delivery-pipeline=DELIVERY_PIPELINE --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/automations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

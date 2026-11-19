---
source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/automation-runs
---

# gcloud deploy automation-runs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud deploy automation-runs cancel

```text
NAME
    gcloud deploy automation-runs cancel - cancels a Cloud Deploy Automation
        Run

SYNOPSIS
    gcloud deploy automation-runs cancel
        (AUTOMATION_RUN
          : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancels a Cloud Deploy Automation Run.

EXAMPLES
    To cancel an AutomationRun test-run for delivery pipeline test-pipeline in
    region us-central1, run:

        $ gcloud deploy automation-runs cancel test-run \
             --delivery-pipeline=test-pipeline --region=us-central1

POSITIONAL ARGUMENTS
     Automation run resource - The name of the AutomationRun. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument automation_run on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTOMATION_RUN
          ID of the automation_run or fully qualified identifier for the
          automation_run.

          To set the name attribute:
          + provide the argument automation_run on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The delivery pipeline associated with the automation_run.
          Alternatively, set the property [deploy/delivery-pipeline].

          To set the delivery-pipeline attribute:
          + provide the argument automation_run on the command line with a
            fully specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          The Cloud region for the automation_run. Alternatively, set the
          property [deploy/region].

          To set the region attribute:
          + provide the argument automation_run on the command line with a
            fully specified name;
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

        $ gcloud alpha deploy automation-runs cancel

        $ gcloud beta deploy automation-runs cancel
```

### gcloud deploy automation-runs describe

```text
NAME
    gcloud deploy automation-runs describe - show details for an Automation Run

SYNOPSIS
    gcloud deploy automation-runs describe
        (AUTOMATION_RUN
          : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details for a specified automation run.

EXAMPLES
    To show details about a automation run 'test-automationrun', for delivery
    pipeline 'test-pipeline', in region 'us-central1', run:

        $ gcloud deploy automation-runs describe test-automationrun \
            --delivery-pipeline=test-pipeline --region=us-central1

POSITIONAL ARGUMENTS
     Automation run resource - The name of the automation run you want to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument automation_run on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       AUTOMATION_RUN
          ID of the automation run or fully qualified identifier for the
          automation run.

          To set the automation_run attribute:
          + provide the argument automation_run on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The name of the Cloud Deploy delivery pipeline.

          To set the delivery-pipeline attribute:
          + provide the argument automation_run on the command line with a
            fully specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          Location of the automation run.

          To set the region attribute:
          + provide the argument automation_run on the command line with a
            fully specified name;
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

        $ gcloud alpha deploy automation-runs describe

        $ gcloud beta deploy automation-runs describe
```

### gcloud deploy automation-runs list

```text
NAME
    gcloud deploy automation-runs list - list the Automation Runs

SYNOPSIS
    gcloud deploy automation-runs list
        [--delivery-pipeline=DELIVERY_PIPELINE --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the automation runs for a specified delivery pipeline.

EXAMPLES
    To list the automation runs for delivery pipeline 'test-pipeline' in region
    'us-central1', run:

        $ gcloud deploy automation-runs list \
            --delivery-pipeline=test-pipeline --region=us-central1

FLAGS
     Delivery pipeline resource - The delivery pipeline for which you want to
     list the automation runs. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

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

        $ gcloud alpha deploy automation-runs list

        $ gcloud beta deploy automation-runs list
```

### gcloud beta deploy automation-runs cancel

```text
NAME
    gcloud beta deploy automation-runs cancel - cancels a Cloud Deploy
        Automation Run

SYNOPSIS
    gcloud beta deploy automation-runs cancel
        (AUTOMATION_RUN
          : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy automation-runs describe

```text
NAME
    gcloud beta deploy automation-runs describe - show details for an
        Automation Run

SYNOPSIS
    gcloud beta deploy automation-runs describe
        (AUTOMATION_RUN
          : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy automation-runs list

```text
NAME
    gcloud beta deploy automation-runs list - list the Automation Runs

SYNOPSIS
    gcloud beta deploy automation-runs list
        [--delivery-pipeline=DELIVERY_PIPELINE --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy automation-runs cancel

```text
NAME
    gcloud alpha deploy automation-runs cancel - cancels a Cloud Deploy
        Automation Run

SYNOPSIS
    gcloud alpha deploy automation-runs cancel
        (AUTOMATION_RUN
          : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy automation-runs describe

```text
NAME
    gcloud alpha deploy automation-runs describe - show details for an
        Automation Run

SYNOPSIS
    gcloud alpha deploy automation-runs describe
        (AUTOMATION_RUN
          : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy automation-runs list

```text
NAME
    gcloud alpha deploy automation-runs list - list the Automation Runs

SYNOPSIS
    gcloud alpha deploy automation-runs list
        [--delivery-pipeline=DELIVERY_PIPELINE --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/automation-runs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

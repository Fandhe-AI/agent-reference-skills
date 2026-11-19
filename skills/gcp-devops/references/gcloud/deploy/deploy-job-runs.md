---
source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/job-runs
---

# gcloud deploy job-runs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud deploy job-runs describe

```text
NAME
    gcloud deploy job-runs describe - show details for a job run

SYNOPSIS
    gcloud deploy job-runs describe
        (JOB_RUN : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE --rollout=ROLLOUT)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details for a specified job run.

EXAMPLES
    To show details about a job run 'test-jobrun', for delivery pipeline
    'test-pipeline', release 'test-release', rollout 'test-rollout', in region
    'us-central1', run:

        $ gcloud deploy job-runs describe test-jobrun \
            --delivery-pipeline=test-pipeline --release=test-release \
            --rollout=test-rollout --region=us-central1

POSITIONAL ARGUMENTS
     Job run resource - The name of the job run you want to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument job_run on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       JOB_RUN
          ID of the job run or fully qualified identifier for the job run.

          To set the job_run attribute:
          + provide the argument job_run on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The name of the Cloud Deploy delivery pipeline.

          To set the delivery-pipeline attribute:
          + provide the argument job_run on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          Location of the job run.

          To set the region attribute:
          + provide the argument job_run on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

       --release=RELEASE
          The name of the Cloud Deploy release.

          To set the release attribute:
          + provide the argument job_run on the command line with a fully
            specified name;
          + provide the argument --release on the command line.

       --rollout=ROLLOUT
          The name of the Cloud Deploy rollout.

          To set the rollout attribute:
          + provide the argument job_run on the command line with a fully
            specified name;
          + provide the argument --rollout on the command line.

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

        $ gcloud alpha deploy job-runs describe

        $ gcloud beta deploy job-runs describe
```

### gcloud deploy job-runs list

```text
NAME
    gcloud deploy job-runs list - list the job runs

SYNOPSIS
    gcloud deploy job-runs list
        (--rollout=ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the job runs for a specified delivery pipeline.

EXAMPLES
    To list the job runs for delivery pipeline 'test-pipeline', release
    'test-release', and rollout 'test-rollout' in region 'us-central1', run:

        $ gcloud deploy job-runs list --delivery-pipeline=test-pipeline \
            --release=test-release --rollout=test-rollout \
            --region=us-central1

REQUIRED FLAGS
     Rollout resource - The rollouts for which you want to list the job runs.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --rollout=ROLLOUT
          ID of the rollout or fully qualified identifier for the rollout.

          To set the rollout attribute:
          + provide the argument --rollout on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The name of the Cloud Deploy delivery pipeline.

          To set the delivery-pipeline attribute:
          + provide the argument --rollout on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          Location of the rollout.

          To set the region attribute:
          + provide the argument --rollout on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

       --release=RELEASE
          The name of the Cloud Deploy release.

          To set the release attribute:
          + provide the argument --rollout on the command line with a fully
            specified name;
          + provide the argument --release on the command line.

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

        $ gcloud alpha deploy job-runs list

        $ gcloud beta deploy job-runs list
```

### gcloud deploy job-runs terminate

```text
NAME
    gcloud deploy job-runs terminate - terminates a Cloud Deploy job run

SYNOPSIS
    gcloud deploy job-runs terminate
        (JOB_RUN : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE --rollout=ROLLOUT)
        [--override-deploy-policies=[POLICY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Terminates a Cloud Deploy job run.

EXAMPLES
    To terminate a job run test-jobrun, for delivery pipeline 'test-pipeline',
    release 'test-release', rollout 'test-rollout', in region 'us-central1',
    run:

        $ gcloud deploy job-runs terminate test-jobrun \
             --delivery-pipeline=test-pipeline --release=test-release \
             --rollout=test-rollout --region=us-central1

POSITIONAL ARGUMENTS
     Job run resource - The name of the Job Run. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument job_run on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       JOB_RUN
          ID of the job_run or fully qualified identifier for the job_run.

          To set the name attribute:
          + provide the argument job_run on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The delivery pipeline associated with the job_run. Alternatively, set
          the property [deploy/delivery-pipeline].

          To set the delivery-pipeline attribute:
          + provide the argument job_run on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          The Cloud region for the job_run. Alternatively, set the property
          [deploy/region].

          To set the region attribute:
          + provide the argument job_run on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

       --release=RELEASE
          The release associated with the job_run.

          To set the release attribute:
          + provide the argument job_run on the command line with a fully
            specified name;
          + provide the argument --release on the command line.

       --rollout=ROLLOUT
          The rollout associated with the job_run.

          To set the rollout attribute:
          + provide the argument job_run on the command line with a fully
            specified name;
          + provide the argument --rollout on the command line.

FLAGS
     --override-deploy-policies=[POLICY,...]
        Deploy policies to override

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha deploy job-runs terminate

        $ gcloud beta deploy job-runs terminate
```

### gcloud beta deploy job-runs describe

```text
NAME
    gcloud beta deploy job-runs describe - show details for a job run

SYNOPSIS
    gcloud beta deploy job-runs describe
        (JOB_RUN : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE --rollout=ROLLOUT)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy job-runs list

```text
NAME
    gcloud beta deploy job-runs list - list the job runs

SYNOPSIS
    gcloud beta deploy job-runs list
        (--rollout=ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy job-runs terminate

```text
NAME
    gcloud beta deploy job-runs terminate - terminates a Cloud Deploy job run

SYNOPSIS
    gcloud beta deploy job-runs terminate
        (JOB_RUN : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE --rollout=ROLLOUT)
        [--override-deploy-policies=[POLICY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy job-runs describe

```text
NAME
    gcloud alpha deploy job-runs describe - show details for a job run

SYNOPSIS
    gcloud alpha deploy job-runs describe
        (JOB_RUN : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE --rollout=ROLLOUT)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy job-runs list

```text
NAME
    gcloud alpha deploy job-runs list - list the job runs

SYNOPSIS
    gcloud alpha deploy job-runs list
        (--rollout=ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy job-runs terminate

```text
NAME
    gcloud alpha deploy job-runs terminate - terminates a Cloud Deploy job run

SYNOPSIS
    gcloud alpha deploy job-runs terminate
        (JOB_RUN : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE --rollout=ROLLOUT)
        [--override-deploy-policies=[POLICY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/job-runs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

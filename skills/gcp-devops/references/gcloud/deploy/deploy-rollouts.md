---
source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/rollouts
---

# gcloud deploy rollouts

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud deploy rollouts advance

```text
NAME
    gcloud deploy rollouts advance - advances a rollout

SYNOPSIS
    gcloud deploy rollouts advance
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE)
        [--override-deploy-policies=[POLICY,...]] [--phase-id=PHASE_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Advances a rollout.

EXAMPLES
    To advance a rollout test-rollout to phase test-phase for delivery pipeline
    test-pipeline, release test-release in region us-central1, run:

        $ gcloud deploy rollouts advance test-rollout \
             --phase-id=test-phase --delivery-pipeline=test-pipeline \
             --release=test-release --region=us-central1

POSITIONAL ARGUMENTS
     Rollout resource - The name of the Rollout. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT
          ID of the rollout or fully qualified identifier for the rollout.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The delivery pipeline associated with the rollout. Alternatively, set
          the property [deploy/delivery-pipeline].

          To set the delivery-pipeline attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          The Cloud region for the rollout. Alternatively, set the property
          [deploy/region].

          To set the region attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

       --release=RELEASE
          The release associated with the rollout.

          To set the release attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --release on the command line.

FLAGS
     --override-deploy-policies=[POLICY,...]
        Deploy policies to override

     --phase-id=PHASE_ID
        Phase ID on a rollout resource

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha deploy rollouts advance

        $ gcloud beta deploy rollouts advance
```

### gcloud deploy rollouts approve

```text
NAME
    gcloud deploy rollouts approve - approves a rollout having an Approval
        state of "Required"

SYNOPSIS
    gcloud deploy rollouts approve
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE)
        [--override-deploy-policies=[POLICY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Approves a rollout having an Approval state of "Required".

EXAMPLES
    To approve a rollout 'test-rollout' for delivery pipeline 'test-pipeline',
    release 'test-release' in region 'us-central1', run:

        $ gcloud deploy rollouts approve test-rollout \
            --delivery-pipeline=test-pipeline --release=test-release \
            --region=us-central1

POSITIONAL ARGUMENTS
     Rollout resource - The name of the Rollout. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT
          ID of the rollout or fully qualified identifier for the rollout.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The delivery pipeline associated with the rollout. Alternatively, set
          the property [deploy/delivery-pipeline].

          To set the delivery-pipeline attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          The Cloud region for the rollout. Alternatively, set the property
          [deploy/region].

          To set the region attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

       --release=RELEASE
          The release associated with the rollout.

          To set the release attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --release on the command line.

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

        $ gcloud alpha deploy rollouts approve

        $ gcloud beta deploy rollouts approve
```

### gcloud deploy rollouts cancel

```text
NAME
    gcloud deploy rollouts cancel - cancel a Rollout

SYNOPSIS
    gcloud deploy rollouts cancel
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE)
        [--override-deploy-policies=[POLICY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel a Rollout.

EXAMPLES
    To cancel a rollout test-rollout for delivery pipeline test-pipeline,
    release test-release in region us-central1, run:

        $ gcloud deploy rollouts cancel test-rollout \
             --delivery-pipeline=test-pipeline --release=test-release \
             --region=us-central1

POSITIONAL ARGUMENTS
     Rollout resource - The name of the Rollout. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT
          ID of the rollout or fully qualified identifier for the rollout.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The delivery pipeline associated with the rollout. Alternatively, set
          the property [deploy/delivery-pipeline].

          To set the delivery-pipeline attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          The Cloud region for the rollout. Alternatively, set the property
          [deploy/region].

          To set the region attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

       --release=RELEASE
          The release associated with the rollout.

          To set the release attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --release on the command line.

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

        $ gcloud alpha deploy rollouts cancel

        $ gcloud beta deploy rollouts cancel
```

### gcloud deploy rollouts describe

```text
NAME
    gcloud deploy rollouts describe - show details for a rollout

SYNOPSIS
    gcloud deploy rollouts describe
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details for a specified rollout.

EXAMPLES
    To show details about a rollout 'test-rollout', for delivery pipeline
    'test-pipeline', and release 'test-release' in region 'us-central1', run:

        $ gcloud deploy rollouts describe test-rollout \
            --delivery-pipeline=test-pipeline --release=test-release \
            --region=us-central1

POSITIONAL ARGUMENTS
     Rollout resource - The name of the rollout you want to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT
          ID of the rollout or fully qualified identifier for the rollout.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The name of the Cloud Deploy delivery pipeline.

          To set the delivery-pipeline attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          Location of the rollout.

          To set the region attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

       --release=RELEASE
          The name of the Cloud Deploy release.

          To set the release attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --release on the command line.

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

        $ gcloud alpha deploy rollouts describe

        $ gcloud beta deploy rollouts describe
```

### gcloud deploy rollouts ignore-job

```text
NAME
    gcloud deploy rollouts ignore-job - ignores a specified job and phase
        combination on a rollout

SYNOPSIS
    gcloud deploy rollouts ignore-job
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE) --job-id=JOB_ID
        --phase-id=PHASE_ID [--override-deploy-policies=[POLICY,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Ignores a specified job and phase combination on a rollout.

EXAMPLES
    To ignore a job test-job in phase test-phase on a rollout test-rollout for
    delivery pipeline test-pipeline, release test-release in region
    us-central1, run:

        $ gcloud deploy rollouts ignore-job test-rollout --job-id=test-job \
             --phase-id=test-phase --delivery-pipeline=test-pipeline \
             --release=test-release --region=us-central1

POSITIONAL ARGUMENTS
     Rollout resource - The name of the Rollout. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT
          ID of the rollout or fully qualified identifier for the rollout.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The delivery pipeline associated with the rollout. Alternatively, set
          the property [deploy/delivery-pipeline].

          To set the delivery-pipeline attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          The Cloud region for the rollout. Alternatively, set the property
          [deploy/region].

          To set the region attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

       --release=RELEASE
          The release associated with the rollout.

          To set the release attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --release on the command line.

REQUIRED FLAGS
     --job-id=JOB_ID
        Job ID on a rollout resource

     --phase-id=PHASE_ID
        Phase ID on a rollout resource

OPTIONAL FLAGS
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

        $ gcloud alpha deploy rollouts ignore-job

        $ gcloud beta deploy rollouts ignore-job
```

### gcloud deploy rollouts list

```text
NAME
    gcloud deploy rollouts list - list the rollouts

SYNOPSIS
    gcloud deploy rollouts list
        (--release=RELEASE
          : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the rollouts for a specified delivery pipeline.

EXAMPLES
    To list the rollouts for delivery pipeline 'test-pipeline' and release
    'test-release' in region 'us-central1', run:

        $ gcloud deploy rollouts list --delivery-pipeline=test-pipeline \
            --release=test-release --region=us-central1

REQUIRED FLAGS
     Release resource - The release for which you want to list the rollouts.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --release on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --release=RELEASE
          ID of the release or fully qualified identifier for the release.

          To set the release attribute:
          + provide the argument --release on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The name of the Cloud Deploy delivery pipeline.

          To set the delivery-pipeline attribute:
          + provide the argument --release on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          Location of the release.

          To set the region attribute:
          + provide the argument --release on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

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

        $ gcloud alpha deploy rollouts list

        $ gcloud beta deploy rollouts list
```

### gcloud deploy rollouts reject

```text
NAME
    gcloud deploy rollouts reject - rejects a rollout having an Approval state
        of "Required"

SYNOPSIS
    gcloud deploy rollouts reject
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE)
        [--override-deploy-policies=[POLICY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Rejects a rollout having an Approval state of "Required".

EXAMPLES
    To reject a rollout 'test-rollout' for delivery pipeline 'test-pipeline',
    release 'test-release' in region 'us-central1', run:

        $ gcloud deploy rollouts reject test-rollout \
             --delivery-pipeline=test-pipeline --release=test-release \
             --region=us-central1

POSITIONAL ARGUMENTS
     Rollout resource - The name of the Rollout. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT
          ID of the rollout or fully qualified identifier for the rollout.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The delivery pipeline associated with the rollout. Alternatively, set
          the property [deploy/delivery-pipeline].

          To set the delivery-pipeline attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          The Cloud region for the rollout. Alternatively, set the property
          [deploy/region].

          To set the region attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

       --release=RELEASE
          The release associated with the rollout.

          To set the release attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --release on the command line.

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

        $ gcloud alpha deploy rollouts reject

        $ gcloud beta deploy rollouts reject
```

### gcloud deploy rollouts retry-job

```text
NAME
    gcloud deploy rollouts retry-job - retries a specified job, phase
        combination on a rollout

SYNOPSIS
    gcloud deploy rollouts retry-job
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE) --job-id=JOB_ID
        --phase-id=PHASE_ID [--override-deploy-policies=[POLICY,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retries a specified job, phase combination on a rollout.

EXAMPLES
    To retry a job 'test-job' in phase 'test-phase' on a rollout 'test-rollout'
    for delivery pipeline 'test-pipeline', release 'test-release' in region
    'us-central1', run:

        $ gcloud deploy rollouts retry-job test-rollout --job-id=test-job \
             --phase-id=test-phase --delivery-pipeline=test-pipeline \
             --release=test-release --region=us-central1

POSITIONAL ARGUMENTS
     Rollout resource - The name of the Rollout. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT
          ID of the rollout or fully qualified identifier for the rollout.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The delivery pipeline associated with the rollout. Alternatively, set
          the property [deploy/delivery-pipeline].

          To set the delivery-pipeline attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          The Cloud region for the rollout. Alternatively, set the property
          [deploy/region].

          To set the region attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

       --release=RELEASE
          The release associated with the rollout.

          To set the release attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --release on the command line.

REQUIRED FLAGS
     --job-id=JOB_ID
        Job ID on a rollout resource

     --phase-id=PHASE_ID
        Phase ID on a rollout resource

OPTIONAL FLAGS
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

        $ gcloud alpha deploy rollouts retry-job

        $ gcloud beta deploy rollouts retry-job
```

### gcloud beta deploy rollouts advance

```text
NAME
    gcloud beta deploy rollouts advance - advances a rollout

SYNOPSIS
    gcloud beta deploy rollouts advance
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE)
        [--override-deploy-policies=[POLICY,...]] [--phase-id=PHASE_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy rollouts approve

```text
NAME
    gcloud beta deploy rollouts approve - approves a rollout having an Approval
        state of "Required"

SYNOPSIS
    gcloud beta deploy rollouts approve
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE)
        [--override-deploy-policies=[POLICY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy rollouts cancel

```text
NAME
    gcloud beta deploy rollouts cancel - cancel a Rollout

SYNOPSIS
    gcloud beta deploy rollouts cancel
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE)
        [--override-deploy-policies=[POLICY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy rollouts describe

```text
NAME
    gcloud beta deploy rollouts describe - show details for a rollout

SYNOPSIS
    gcloud beta deploy rollouts describe
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy rollouts ignore-job

```text
NAME
    gcloud beta deploy rollouts ignore-job - ignores a specified job and phase
        combination on a rollout

SYNOPSIS
    gcloud beta deploy rollouts ignore-job
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE) --job-id=JOB_ID
        --phase-id=PHASE_ID [--override-deploy-policies=[POLICY,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy rollouts list

```text
NAME
    gcloud beta deploy rollouts list - list the rollouts

SYNOPSIS
    gcloud beta deploy rollouts list
        (--release=RELEASE
          : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy rollouts reject

```text
NAME
    gcloud beta deploy rollouts reject - rejects a rollout having an Approval
        state of "Required"

SYNOPSIS
    gcloud beta deploy rollouts reject
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE)
        [--override-deploy-policies=[POLICY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy rollouts retry-job

```text
NAME
    gcloud beta deploy rollouts retry-job - retries a specified job, phase
        combination on a rollout

SYNOPSIS
    gcloud beta deploy rollouts retry-job
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE) --job-id=JOB_ID
        --phase-id=PHASE_ID [--override-deploy-policies=[POLICY,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy rollouts advance

```text
NAME
    gcloud alpha deploy rollouts advance - advances a rollout

SYNOPSIS
    gcloud alpha deploy rollouts advance
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE)
        [--override-deploy-policies=[POLICY,...]] [--phase-id=PHASE_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy rollouts approve

```text
NAME
    gcloud alpha deploy rollouts approve - approves a rollout having an
        Approval state of "Required"

SYNOPSIS
    gcloud alpha deploy rollouts approve
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE)
        [--override-deploy-policies=[POLICY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy rollouts cancel

```text
NAME
    gcloud alpha deploy rollouts cancel - cancel a Rollout

SYNOPSIS
    gcloud alpha deploy rollouts cancel
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE)
        [--override-deploy-policies=[POLICY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy rollouts describe

```text
NAME
    gcloud alpha deploy rollouts describe - show details for a rollout

SYNOPSIS
    gcloud alpha deploy rollouts describe
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy rollouts ignore-job

```text
NAME
    gcloud alpha deploy rollouts ignore-job - ignores a specified job and phase
        combination on a rollout

SYNOPSIS
    gcloud alpha deploy rollouts ignore-job
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE) --job-id=JOB_ID
        --phase-id=PHASE_ID [--override-deploy-policies=[POLICY,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy rollouts list

```text
NAME
    gcloud alpha deploy rollouts list - list the rollouts

SYNOPSIS
    gcloud alpha deploy rollouts list
        (--release=RELEASE
          : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy rollouts reject

```text
NAME
    gcloud alpha deploy rollouts reject - rejects a rollout having an Approval
        state of "Required"

SYNOPSIS
    gcloud alpha deploy rollouts reject
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE)
        [--override-deploy-policies=[POLICY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy rollouts retry-job

```text
NAME
    gcloud alpha deploy rollouts retry-job - retries a specified job, phase
        combination on a rollout

SYNOPSIS
    gcloud alpha deploy rollouts retry-job
        (ROLLOUT : --delivery-pipeline=DELIVERY_PIPELINE
          --region=REGION --release=RELEASE) --job-id=JOB_ID
        --phase-id=PHASE_ID [--override-deploy-policies=[POLICY,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/rollouts (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

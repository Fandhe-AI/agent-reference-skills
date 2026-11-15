---
source: https://docs.cloud.google.com/sdk/gcloud/reference/recommender/recommendations
---

# gcloud recommender recommendations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud recommender recommendations describe

```text
NAME
    gcloud recommender recommendations describe - describe a recommendation for
        a Cloud project

SYNOPSIS
    gcloud recommender recommendations describe RECOMMENDATION
        --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a recommendation. This currently supports the following parent
    entities: project, billing account, folder, and organization.

EXAMPLES
    To describe a recommendation:

        $ gcloud recommender recommendations describe RECOMMENDATION_ID \
             --project=${PROJECT} --location=${LOCATION} \
             --recommender=${RECOMMENDER}

POSITIONAL ARGUMENTS
     RECOMMENDATION
        Recommendation to describe

REQUIRED FLAGS
     --location=LOCATION
        Location

     --recommender=RECOMMENDER
        Recommender of the recommendations

     Resource that is associated with cloud entity type. Currently four
     mutually exclusive flags are supported, --project, --billing-account,
     --folder, --organization.

     Exactly one of these must be specified:

       --billing-account=BILLING_ACCOUNT
          The Google Cloud Platform billing account ID to use for this
          invocation.

       --folder=FOLDER_ID
          The Google Cloud Platform folder ID to use for this invocation.

       --organization=ORGANIZATION_ID
          The Google Cloud Platform organization ID to use for this invocation.

       --project=PROJECT_ID
          The Google Cloud Platform project ID. Overrides the default
          core/project property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha recommender recommendations describe

        $ gcloud beta recommender recommendations describe
```

### gcloud recommender recommendations list

```text
NAME
    gcloud recommender recommendations list - list operations for a
        recommendation

SYNOPSIS
    gcloud recommender recommendations list --location=LOCATION
        --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command lists all recommendations for a given Google Cloud entity ID,
    location, and recommender. Supported recommenders can be found here:
    https://cloud.google.com/recommender/docs/recommenders. The following
    Google Cloud entity types are supported: project, billing_account, folder
    and organization.

EXAMPLES
    Lists recommendations for a Cloud project.        $ gcloud recommender recommendations list --project=project-id \
            --location=global \
            --recommender=google.compute.instance.MachineTypeRecommender

REQUIRED FLAGS
     --location=LOCATION
        Location to list recommendations for.

     --recommender=RECOMMENDER
        Recommender to list recommendations for. Supported recommenders can be
        found here: https://cloud.google.com/recommender/docs/recommenders.

     Resource that is associated with cloud entity type. Currently four
     mutually exclusive flags are supported, --project, --billing-account,
     --folder, --organization.

     Exactly one of these must be specified:

       --billing-account=BILLING_ACCOUNT
          The Google Cloud Platform billing account ID to use for this
          invocation.

       --folder=FOLDER_ID
          The Google Cloud Platform folder ID to use for this invocation.

       --organization=ORGANIZATION_ID
          The Google Cloud Platform organization ID to use for this invocation.

       --project=PROJECT_ID
          The Google Cloud Platform project ID. Overrides the default
          core/project property value for this command invocation.

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

        $ gcloud alpha recommender recommendations list

        $ gcloud beta recommender recommendations list
```

### gcloud recommender recommendations mark-claimed

```text
NAME
    gcloud recommender recommendations mark-claimed - mark a recommendation's
        state as CLAIMED

SYNOPSIS
    gcloud recommender recommendations mark-claimed RECOMMENDATION --etag=ETAG
        --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--state-metadata=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Mark a recommendation's state as CLAIMED. Can be applied to recommendations
    in CLAIMED, SUCCEEDED, FAILED, or ACTIVE state. Users can use this method
    to indicate to the Recommender API that they are starting to apply the
    recommendation themselves. This stops the recommendation content from being
    updated.

EXAMPLES
    To mark a recommendation as CLAIMED:

        $ gcloud recommender recommendations mark-claimed abcd-1234 \
            --project=project-id --location=global \
            --recommender=google.compute.instance.MachineTypeRecommender \
            --etag=abc123 --state-metadata=key1=value1,key2=value2

POSITIONAL ARGUMENTS
     RECOMMENDATION
        Recommendation id which will be marked as claimed

REQUIRED FLAGS
     --etag=ETAG
        Etag of a recommendation

     --location=LOCATION
        Location

     --recommender=RECOMMENDER
        Recommender of recommendation

     Resource that is associated with cloud entity type. Currently four
     mutually exclusive flags are supported, --project, --billing-account,
     --folder, --organization.

     Exactly one of these must be specified:

       --billing-account=BILLING_ACCOUNT
          The Google Cloud Platform billing account ID to use for this
          invocation.

       --folder=FOLDER_ID
          The Google Cloud Platform folder ID to use for this invocation.

       --organization=ORGANIZATION_ID
          The Google Cloud Platform organization ID to use for this invocation.

       --project=PROJECT_ID
          The Google Cloud Platform project ID. Overrides the default
          core/project property value for this command invocation.

OPTIONAL FLAGS
     --state-metadata=KEY=VALUE,[KEY=VALUE,...]
        State metadata for recommendation, in format of
        --state-metadata=key1=value1,key2=value2

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha recommender recommendations mark-claimed

        $ gcloud beta recommender recommendations mark-claimed
```

### gcloud recommender recommendations mark-dismissed

```text
NAME
    gcloud recommender recommendations mark-dismissed - mark recommendation's
        state as DISMISSED

SYNOPSIS
    gcloud recommender recommendations mark-dismissed RECOMMENDATION
        --etag=ETAG --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Mark recommendation's state as DISMISSED. Can be applied to recommendations
    in ACTIVE state. The following parent resources are supported: project,
    billing account, folder, and organization as parent resources for
    recommendations.

EXAMPLES
    To mark a recommendation as DISMISSED:

        $ gcloud recommender recommendations mark-dismissed abcd-1234 \
            --project=project-id --location=global \
            --recommender=google.compute.instance.MachineTypeRecommender \
            --etag=abc123

POSITIONAL ARGUMENTS
     RECOMMENDATION
        Recommendation ID which will be marked as dismissed

REQUIRED FLAGS
     --etag=ETAG
        Etag of a recommendation

     --location=LOCATION
        Location

     --recommender=RECOMMENDER
        Recommender of the recommendations

     Resource that is associated with cloud entity type. Currently four
     mutually exclusive flags are supported, --project, --billing-account,
     --folder, --organization.

     Exactly one of these must be specified:

       --billing-account=BILLING_ACCOUNT
          The Google Cloud Platform billing account ID to use for this
          invocation.

       --folder=FOLDER_ID
          The Google Cloud Platform folder ID to use for this invocation.

       --organization=ORGANIZATION_ID
          The Google Cloud Platform organization ID to use for this invocation.

       --project=PROJECT_ID
          The Google Cloud Platform project ID. Overrides the default
          core/project property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha recommender recommendations mark-dismissed

        $ gcloud beta recommender recommendations mark-dismissed
```

### gcloud recommender recommendations mark-failed

```text
NAME
    gcloud recommender recommendations mark-failed - mark a recommendation's
        state as FAILED

SYNOPSIS
    gcloud recommender recommendations mark-failed RECOMMENDATION --etag=ETAG
        --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--state-metadata=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Mark a recommendation's state as FAILED. Can be applied to recommendations
    in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state.

EXAMPLES
    To mark a recommendation as FAILED:

        $ gcloud recommender recommendations mark-failed abcd-1234 \
            --project=project-id --location=global \
            --recommender=google.compute.instance.MachineTypeRecommender \
            --etag=abc123 --state-metadata=key1=value1,key2=value2

POSITIONAL ARGUMENTS
     RECOMMENDATION
        Recommendation id which will be marked as FAILED.

REQUIRED FLAGS
     --etag=ETAG
        Etag of a recommendation.

     --location=LOCATION
        Location.

     --recommender=RECOMMENDER
        Recommender of recommendation.

     Resource that is associated with cloud entity type. Currently four
     mutually exclusive flags are supported, --project, --billing-account,
     --folder, --organization.

     Exactly one of these must be specified:

       --billing-account=BILLING_ACCOUNT
          The Google Cloud Platform billing account ID to use for this
          invocation.

       --folder=FOLDER_ID
          The Google Cloud Platform folder ID to use for this invocation.

       --organization=ORGANIZATION_ID
          The Google Cloud Platform organization ID to use for this invocation.

       --project=PROJECT_ID
          The Google Cloud Platform project ID. Overrides the default
          core/project property value for this command invocation.

OPTIONAL FLAGS
     --state-metadata=KEY=VALUE,[KEY=VALUE,...]
        State metadata for recommendation, in format of
        --state-metadata=key1=value1,key2=value2

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha recommender recommendations mark-failed

        $ gcloud beta recommender recommendations mark-failed
```

### gcloud recommender recommendations mark-succeeded

```text
NAME
    gcloud recommender recommendations mark-succeeded - mark a recommendation's
        state as SUCCEEDED

SYNOPSIS
    gcloud recommender recommendations mark-succeeded RECOMMENDATION
        --etag=ETAG --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--state-metadata=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Mark a recommendation's state as SUCCEEDED. Can be applied to
    recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state.

EXAMPLES
    To mark a recommendation as SUCCEEDED:

        $ gcloud recommender recommendations mark-succeeded abcd-1234 \
            --project=project-id --location=global \
            --recommender=google.compute.instance.MachineTypeRecommender \
            --etag=abc123 --state-metadata=key1=value1,key2=value2

POSITIONAL ARGUMENTS
     RECOMMENDATION
        Recommendation id which will be marked as succeeded

REQUIRED FLAGS
     --etag=ETAG
        Etag of a recommendation

     --location=LOCATION
        Location

     --recommender=RECOMMENDER
        Recommender of recommendation

     Resource that is associated with cloud entity type. Currently four
     mutually exclusive flags are supported, --project, --billing-account,
     --folder, --organization.

     Exactly one of these must be specified:

       --billing-account=BILLING_ACCOUNT
          The Google Cloud Platform billing account ID to use for this
          invocation.

       --folder=FOLDER_ID
          The Google Cloud Platform folder ID to use for this invocation.

       --organization=ORGANIZATION_ID
          The Google Cloud Platform organization ID to use for this invocation.

       --project=PROJECT_ID
          The Google Cloud Platform project ID. Overrides the default
          core/project property value for this command invocation.

OPTIONAL FLAGS
     --state-metadata=KEY=VALUE,[KEY=VALUE,...]
        State metadata for recommendation, in format of
        --state-metadata=key1=value1,key2=value2

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha recommender recommendations mark-succeeded

        $ gcloud beta recommender recommendations mark-succeeded
```

### gcloud beta recommender recommendations describe

```text
NAME
    gcloud beta recommender recommendations describe - describe a
        recommendation for a Cloud project

SYNOPSIS
    gcloud beta recommender recommendations describe RECOMMENDATION
        --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta recommender recommendations list

```text
NAME
    gcloud beta recommender recommendations list - list recommendations for
        Google Cloud resources

SYNOPSIS
    gcloud beta recommender recommendations list
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--location=LOCATION] [--recommender=RECOMMENDER] [--[no-]recursive]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta recommender recommendations mark-claimed

```text
NAME
    gcloud beta recommender recommendations mark-claimed - mark a
        recommendation's state as CLAIMED

SYNOPSIS
    gcloud beta recommender recommendations mark-claimed RECOMMENDATION
        --etag=ETAG --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--state-metadata=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta recommender recommendations mark-dismissed

```text
NAME
    gcloud beta recommender recommendations mark-dismissed - mark
        recommendation's state as DISMISSED

SYNOPSIS
    gcloud beta recommender recommendations mark-dismissed RECOMMENDATION
        --etag=ETAG --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta recommender recommendations mark-failed

```text
NAME
    gcloud beta recommender recommendations mark-failed - mark a
        recommendation's state as FAILED

SYNOPSIS
    gcloud beta recommender recommendations mark-failed RECOMMENDATION
        --etag=ETAG --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--state-metadata=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta recommender recommendations mark-succeeded

```text
NAME
    gcloud beta recommender recommendations mark-succeeded - mark a
        recommendation's state as SUCCEEDED

SYNOPSIS
    gcloud beta recommender recommendations mark-succeeded RECOMMENDATION
        --etag=ETAG --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--state-metadata=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha recommender recommendations describe

```text
NAME
    gcloud alpha recommender recommendations describe - describe a
        recommendation for a Cloud project

SYNOPSIS
    gcloud alpha recommender recommendations describe RECOMMENDATION
        --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha recommender recommendations list

```text
NAME
    gcloud alpha recommender recommendations list - list recommendations for
        Google Cloud resources

SYNOPSIS
    gcloud alpha recommender recommendations list
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--location=LOCATION] [--recommender=RECOMMENDER] [--[no-]recursive]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha recommender recommendations mark-active

```text
NAME
    gcloud alpha recommender recommendations mark-active - mark Active
        operations for a recommendation

SYNOPSIS
    gcloud alpha recommender recommendations mark-active RECOMMENDATION
        --etag=ETAG --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha recommender recommendations mark-claimed

```text
NAME
    gcloud alpha recommender recommendations mark-claimed - mark a
        recommendation's state as CLAIMED

SYNOPSIS
    gcloud alpha recommender recommendations mark-claimed RECOMMENDATION
        --etag=ETAG --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--state-metadata=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha recommender recommendations mark-dismissed

```text
NAME
    gcloud alpha recommender recommendations mark-dismissed - mark
        recommendation's state as DISMISSED

SYNOPSIS
    gcloud alpha recommender recommendations mark-dismissed RECOMMENDATION
        --etag=ETAG --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha recommender recommendations mark-failed

```text
NAME
    gcloud alpha recommender recommendations mark-failed - mark a
        recommendation's state as FAILED

SYNOPSIS
    gcloud alpha recommender recommendations mark-failed RECOMMENDATION
        --etag=ETAG --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--state-metadata=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha recommender recommendations mark-succeeded

```text
NAME
    gcloud alpha recommender recommendations mark-succeeded - mark a
        recommendation's state as SUCCEEDED

SYNOPSIS
    gcloud alpha recommender recommendations mark-succeeded RECOMMENDATION
        --etag=ETAG --location=LOCATION --recommender=RECOMMENDER
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--state-metadata=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/recommender/recommendations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

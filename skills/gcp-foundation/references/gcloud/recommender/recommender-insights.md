---
source: https://docs.cloud.google.com/sdk/gcloud/reference/recommender/insights
---

# gcloud recommender insights

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud recommender insights describe

```text
NAME
    gcloud recommender insights describe - describe an insight

SYNOPSIS
    gcloud recommender insights describe INSIGHT --insight-type=INSIGHT_TYPE
        --location=LOCATION
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an insight. This currently supports the following parent entities:
    project, billing account, folder, and organization.

EXAMPLES
    To describe an insight:

        $ gcloud recommender insights describe \
            --insight-type=${INSIGHT_TYPE} --project=${PROJECT} \
            --location=${LOCATION}

POSITIONAL ARGUMENTS
     INSIGHT
        insight to describe

REQUIRED FLAGS
     --insight-type=INSIGHT_TYPE
        Insight type to describe insights

     --location=LOCATION
        Location

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

        $ gcloud alpha recommender insights describe

        $ gcloud beta recommender insights describe
```

### gcloud recommender insights list

```text
NAME
    gcloud recommender insights list - list insights for a Google Cloud entity

SYNOPSIS
    gcloud recommender insights list --insight-type=INSIGHT_TYPE
        --location=LOCATION
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command lists all insights for a given Google Cloud entity, location,
    and insight type. Supported insight-types can be found here:
    https://cloud.google.com/recommender/docs/insights/insight-types. Currently
    the following Google Cloud entity types are supported: project,
    billing_account, folder, and organization.

EXAMPLES
    To list all insights for a billing account:

        $ gcloud recommender insights list --project=project-id \
            --location=global --insight-type=google.compute.firewall.Insight

REQUIRED FLAGS
     --insight-type=INSIGHT_TYPE
        Insight type to list insights for. Supported insight-types can be found
        here: https://cloud.google.com/recommender/docs/insights/insight-types

     --location=LOCATION
        Location to list insights for.

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

        $ gcloud alpha recommender insights list

        $ gcloud beta recommender insights list
```

### gcloud recommender insights mark-accepted

```text
NAME
    gcloud recommender insights mark-accepted - mark an insight's state as
        ACCEPTED

SYNOPSIS
    gcloud recommender insights mark-accepted INSIGHT --etag=etag
        --insight-type=INSIGHT_TYPE --location=LOCATION
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--state-metadata=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Mark an insight's state as ACCEPTED. Can be applied to insights in ACTIVE
    or ACCEPTED state. The following are currently supported: project,
    billing_account, folder, and organization.

EXAMPLES
    To mark an insight as ACCEPTED:

        $ gcloud recommender insights mark-accepted abcd-1234 \
            --project=project-id --location=global \
            --insight-type=google.compute.firewall.Insight --etag=abc123

POSITIONAL ARGUMENTS
     INSIGHT
        Insight id which will be marked as accepted

REQUIRED FLAGS
     --etag=etag
        Etag of a insight

     --insight-type=INSIGHT_TYPE
        Insight Type of the insights

     --location=LOCATION
        Location

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

        $ gcloud alpha recommender insights mark-accepted

        $ gcloud beta recommender insights mark-accepted
```

### gcloud beta recommender insights describe

```text
NAME
    gcloud beta recommender insights describe - describe an insight

SYNOPSIS
    gcloud beta recommender insights describe INSIGHT
        --insight-type=INSIGHT_TYPE --location=LOCATION
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta recommender insights list

```text
NAME
    gcloud beta recommender insights list - list insights for Google Cloud
        resources

SYNOPSIS
    gcloud beta recommender insights list
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--insight-type=INSIGHT_TYPE] [--location=LOCATION] [--[no-]recursive]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta recommender insights mark-accepted

```text
NAME
    gcloud beta recommender insights mark-accepted - mark an insight's state as
        ACCEPTED

SYNOPSIS
    gcloud beta recommender insights mark-accepted INSIGHT --etag=etag
        --insight-type=INSIGHT_TYPE --location=LOCATION
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--state-metadata=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha recommender insights describe

```text
NAME
    gcloud alpha recommender insights describe - describe an insight

SYNOPSIS
    gcloud alpha recommender insights describe INSIGHT
        --insight-type=INSIGHT_TYPE --location=LOCATION
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha recommender insights list

```text
NAME
    gcloud alpha recommender insights list - list insights for Google Cloud
        resources

SYNOPSIS
    gcloud alpha recommender insights list
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--insight-type=INSIGHT_TYPE] [--location=LOCATION] [--[no-]recursive]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha recommender insights mark-accepted

```text
NAME
    gcloud alpha recommender insights mark-accepted - mark an insight's state
        as ACCEPTED

SYNOPSIS
    gcloud alpha recommender insights mark-accepted INSIGHT --etag=etag
        --insight-type=INSIGHT_TYPE --location=LOCATION
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--state-metadata=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha recommender insights mark-active

```text
NAME
    gcloud alpha recommender insights mark-active - mark an insight's state as
        ACTIVE

SYNOPSIS
    gcloud alpha recommender insights mark-active INSIGHT --etag=etag
        --insight-type=INSIGHT_TYPE --location=LOCATION
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha recommender insights mark-dismissed

```text
NAME
    gcloud alpha recommender insights mark-dismissed - mark an insight's state
        as DISMISSED

SYNOPSIS
    gcloud alpha recommender insights mark-dismissed INSIGHT --etag=etag
        --insight-type=INSIGHT_TYPE --location=LOCATION
        (--billing-account=BILLING_ACCOUNT | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID)
        [--recommendation-change-type=Recommendation change type]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/recommender/insights (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

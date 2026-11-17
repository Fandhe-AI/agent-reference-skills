---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/zones
---

# gcloud edge-cloud zones

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud zones describe

```text
NAME
    gcloud edge-cloud zones describe - describe a Google Distributed Cloud zone

SYNOPSIS
    gcloud edge-cloud zones describe ZONE --location=LOCATION
        (--organization=ORGANIZATION | --project=PROJECT)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays details about a specific Google Distributed Cloud zone.

EXAMPLES
    To describe a zone named my-zone in organization 1234567890 and location
    us-central1, run:

        $ gcloud edge-cloud zones describe my-zone --location=us-central1 \
            --organization=1234567890

    To describe a zone named another-zone in project my-sample-project and
    location us-central1, run:

        $ gcloud edge-cloud zones describe another-zone \
            --location=us-central1 --project=my-sample-project

POSITIONAL ARGUMENTS
     ZONE
        Google Distributed Cloud zone name to describe.

REQUIRED FLAGS
     --location=LOCATION
        Google Cloud Platform location.

     Exactly one of these must be specified:

       --organization=ORGANIZATION
          Google Distributed Cloud organization number for the zone.

       --project=PROJECT
          Google Cloud Platform project ID for the zone.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud zones describe
```

### gcloud edge-cloud zones get-iam-policy

```text
NAME
    gcloud edge-cloud zones get-iam-policy - get IAM policy for a project on
        the Google Distributed Cloud zone

SYNOPSIS
    gcloud edge-cloud zones get-iam-policy (ZONE : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets the IAM policy for a project on the Google Distributed Cloud zone.

EXAMPLES
    To get the IAM policy for a project called sample-project on the Google
    Distributed Cloud zone sample-zone in location us-central1, run:

        $ gcloud edge-cloud zones get-iam-policy sample-zone \
            --project=sample-project --location=us-central1

POSITIONAL ARGUMENTS
     Zone resource - Google Distributed Cloud zone. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument zone on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument zone on the command line with a fully
            specified name;
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud zones get-iam-policy
```

### gcloud edge-cloud zones list

```text
NAME
    gcloud edge-cloud zones list - list Google Distributed Cloud zones

SYNOPSIS
    gcloud edge-cloud zones list --location=LOCATION
        (--organization=ORGANIZATION | --project=PROJECT) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists Google Distributed Cloud zones enabled in a given location for either
    an organization or a project.

EXAMPLES
    To list GDC zones in organization 1234567890 and location us-central1, run:

        $ gcloud edge-cloud zones list --location=us-central1 \
            --organization=1234567890

    To list GDC zones in project my-sample-project and location us-central1,
    run:

        $ gcloud edge-cloud zones list --location=us-central1 \
            --project=my-sample-project

REQUIRED FLAGS
     --location=LOCATION
        Google Cloud Platform location.

     Exactly one of these must be specified:

       --organization=ORGANIZATION
          Google Distributed Cloud organization number to list zones for.

       --project=PROJECT
          Google Cloud Platform project ID to list zones for.

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
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud zones list
```

### gcloud edge-cloud zones roles list

```text
NAME
    gcloud edge-cloud zones roles list - lists the roles for a project on the
        Google Distributed Cloud zone

SYNOPSIS
    gcloud edge-cloud zones roles list (--zone=ZONE : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists the roles for a project on the Google Distributed Cloud zone.

EXAMPLES
    To list the roles for a project called sample-project on the Google
    Distributed Cloud zone sample-zone in location us-central1, run:

        $ gcloud edge-cloud zones roles list --zone=sample-zone \
            --project=sample-project --location=us-central1

REQUIRED FLAGS
     Zone resource - Google Distributed Cloud zone. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --zone on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --zone=ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument --zone on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument --zone on the command line with a fully
            specified name;
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
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud zones roles list
```

### gcloud edge-cloud zones set-iam-policy

```text
NAME
    gcloud edge-cloud zones set-iam-policy - set IAM policy for a project on
        the Google Distributed Cloud zone

SYNOPSIS
    gcloud edge-cloud zones set-iam-policy POLICY_FILE
        (--zone=ZONE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for a project on the Google Distributed Cloud zone.

EXAMPLES
    To set the IAM policy for a project called sample-project in Google
    Distributed Cloud zone sample-zone in location us-central1 from a local
    file sample-policy.json, run:

        $ gcloud edge-cloud zones set-iam-policy --project=sample-project \
            --location=us-central1 --zone=sample-zone sample-policy.json

POSITIONAL ARGUMENTS
     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

REQUIRED FLAGS
     Zone resource - Google Distributed Cloud zone The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --zone on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --zone=ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument --zone on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument --zone on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud zones set-iam-policy
```

### gcloud alpha edge-cloud zones describe

```text
NAME
    gcloud alpha edge-cloud zones describe - describe a Google Distributed
        Cloud zone

SYNOPSIS
    gcloud alpha edge-cloud zones describe ZONE --location=LOCATION
        (--organization=ORGANIZATION | --project=PROJECT)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud zones get-iam-policy

```text
NAME
    gcloud alpha edge-cloud zones get-iam-policy - get IAM policy for a project
        on the Google Distributed Cloud zone

SYNOPSIS
    gcloud alpha edge-cloud zones get-iam-policy (ZONE : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud zones list

```text
NAME
    gcloud alpha edge-cloud zones list - list Google Distributed Cloud zones

SYNOPSIS
    gcloud alpha edge-cloud zones list --location=LOCATION
        (--organization=ORGANIZATION | --project=PROJECT) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud zones roles list

```text
NAME
    gcloud alpha edge-cloud zones roles list - lists the roles for a project on
        the Google Distributed Cloud zone

SYNOPSIS
    gcloud alpha edge-cloud zones roles list
        (--zone=ZONE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud zones set-iam-policy

```text
NAME
    gcloud alpha edge-cloud zones set-iam-policy - set IAM policy for a project
        on the Google Distributed Cloud zone

SYNOPSIS
    gcloud alpha edge-cloud zones set-iam-policy POLICY_FILE
        (--zone=ZONE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/zones (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

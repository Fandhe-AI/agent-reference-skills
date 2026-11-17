---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/api-keys
---

# gcloud edge-cloud api-keys

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud api-keys create

```text
NAME
    gcloud edge-cloud api-keys create - create a Google Distributed Cloud API
        key

SYNOPSIS
    gcloud edge-cloud api-keys create (API_KEY : --location=LOCATION)
        --service-account=SERVICE_ACCOUNT --zone=ZONE
        [--api-target=[KEY=VALUE,...]] [--async] [--validity=VALIDITY]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a Google Distributed Cloud API key.

EXAMPLES
    To create a service-account-bound API key in a specific Google Distributed
    Cloud zone that is valid for two hours and restricted to specific API
    methods, run:

        $ gcloud edge-cloud api-keys create my-api-key \
            --location=us-central1 --project=my-project \
            --zone=us-central1-edge-zone1 --service-account=my-sa \
            --validity=7200s \
            --api-target service="compute.test-api.com",methods="*" \
            --api-target service="storage.test-api.com",methods="GET|LIST"

POSITIONAL ARGUMENTS
     ApiKey resource - The API key to be created. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument api_key on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       API_KEY
          ID of the apiKey or fully qualified identifier for the apiKey.

          To set the api_key attribute:
          + provide the argument api_key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument api_key on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --service-account=SERVICE_ACCOUNT
        The ID of the service account to bind the API key to.

     --zone=ZONE
        The Google Distributed Cloud zone ID where the API key will be created.

OPTIONAL FLAGS
     --api-target=[KEY=VALUE,...]
        API target restriction. Can be specified multiple times. Each instance
        is a comma-separated list of key=value pairs.
        * Required keys: 'service'.
        * Optional keys: 'methods'. 'methods' should be a pipe-separated
          string. Omit the 'methods' key to allow all methods.

        Examples:
        * --api-target service="compute.test-api.com",methods="*"
        * --api-target service="storage.test-api.com",methods="GET|LIST"
        * --api-target service="pubsub.test-api.com"

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --validity=VALIDITY
        The validity duration for the key (e.g., 3600s, 1h, 1d). Default and
        maximum allowed is 366d.

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

        $ gcloud alpha edge-cloud api-keys create
```

### gcloud edge-cloud api-keys delete

```text
NAME
    gcloud edge-cloud api-keys delete - delete a Google Distributed Cloud API
        key

SYNOPSIS
    gcloud edge-cloud api-keys delete (API_KEY : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes the specified Google Distributed Cloud API key.

EXAMPLES
    To delete an API key called test-api-key in project test-project and
    location us-central1, run:

        $ gcloud edge-cloud api-keys delete test-api-key \
            --location=us-central1 --project=test-project

POSITIONAL ARGUMENTS
     ApiKey resource - The Google Distributed Cloud API key to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument api_key on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       API_KEY
          ID of the apiKey or fully qualified identifier for the apiKey.

          To set the api_key attribute:
          + provide the argument api_key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument api_key on the command line with a fully
            specified name;
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
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud api-keys delete
```

### gcloud edge-cloud api-keys describe

```text
NAME
    gcloud edge-cloud api-keys describe - describe a Google Distributed Cloud
        API key

SYNOPSIS
    gcloud edge-cloud api-keys describe (API_KEY : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of a specific Google Distributed Cloud API key.

EXAMPLES
    To describe an API key called test-api-key in project test-project and
    location us-central1, run:

        $ gcloud edge-cloud api-keys describe test-api-key \
            --location=us-central1 --project=test-project

POSITIONAL ARGUMENTS
     ApiKey resource - The Google Distributed Cloud API key to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument api_key on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       API_KEY
          ID of the apiKey or fully qualified identifier for the apiKey.

          To set the api_key attribute:
          + provide the argument api_key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument api_key on the command line with a fully
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

        $ gcloud alpha edge-cloud api-keys describe
```

### gcloud edge-cloud api-keys list

```text
NAME
    gcloud edge-cloud api-keys list - list Google Distributed Cloud API keys

SYNOPSIS
    gcloud edge-cloud api-keys list --location=LOCATION [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists Google Distributed Cloud API keys.

EXAMPLES
    To list Google Distributed Cloud API keys in project test-project and
    location us-central1, run:

        $ gcloud edge-cloud api-keys list --location=us-central1 \
            --project=test-project

REQUIRED FLAGS
     Location resource - Parent Google Cloud location to list all API keys.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud api-keys list
```

### gcloud alpha edge-cloud api-keys create

```text
NAME
    gcloud alpha edge-cloud api-keys create - create a Google Distributed Cloud
        API key

SYNOPSIS
    gcloud alpha edge-cloud api-keys create (API_KEY : --location=LOCATION)
        --service-account=SERVICE_ACCOUNT --zone=ZONE
        [--api-target=[KEY=VALUE,...]] [--async] [--validity=VALIDITY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud api-keys delete

```text
NAME
    gcloud alpha edge-cloud api-keys delete - delete a Google Distributed Cloud
        API key

SYNOPSIS
    gcloud alpha edge-cloud api-keys delete (API_KEY : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud api-keys describe

```text
NAME
    gcloud alpha edge-cloud api-keys describe - describe a Google Distributed
        Cloud API key

SYNOPSIS
    gcloud alpha edge-cloud api-keys describe (API_KEY : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha edge-cloud api-keys list

```text
NAME
    gcloud alpha edge-cloud api-keys list - list Google Distributed Cloud API
        keys

SYNOPSIS
    gcloud alpha edge-cloud api-keys list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/api-keys (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

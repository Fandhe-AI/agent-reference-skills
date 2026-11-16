---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/azure/clients
---

# gcloud container azure clients

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container azure clients create

```text
NAME
    gcloud container azure clients create - create an Azure client

SYNOPSIS
    gcloud container azure clients create (CLIENT : --location=LOCATION)
        --application-id=APP_ID --tenant-id=TENANT_ID [--async]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Create an Azure client.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To create an Azure client named my-client in location us-west1, run:

        $ gcloud container azure clients create my-client \
            --location=us-west1 --application-id=APP_ID \
            --tenant-id=TENANT_ID

POSITIONAL ARGUMENTS
     Client resource - Azure client to create. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument client on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLIENT
          ID of the client or fully qualified identifier for the client.

          To set the client attribute:
          + provide the argument client on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the client.

          To set the location attribute:
          + provide the argument client on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

REQUIRED FLAGS
     --application-id=APP_ID
        Azure Active Directory (AAD) Application/Client ID (GUID).

     --tenant-id=TENANT_ID
        Azure Active Directory (AAD) tenant ID (GUID) to associate with the
        client.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --validate-only
        Validate the creation of the client, but don't actually perform it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure clients create
```

### gcloud container azure clients delete

```text
NAME
    gcloud container azure clients delete - delete an Azure client

SYNOPSIS
    gcloud container azure clients delete (CLIENT : --location=LOCATION)
        [--allow-missing] [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Delete an Azure client.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To delete an Azure client named my-client in location us-west1, run:

        $ gcloud container azure clients delete my-client --location=us-west1

POSITIONAL ARGUMENTS
     Client resource - Azure client to delete. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument client on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLIENT
          ID of the client or fully qualified identifier for the client.

          To set the client attribute:
          + provide the argument client on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the client.

          To set the location attribute:
          + provide the argument client on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

FLAGS
     --allow-missing
        Allow idempotent deletion of client. The request will still succeed in
        case the client does not exist.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure clients delete
```

### gcloud container azure clients describe

```text
NAME
    gcloud container azure clients describe - describe an Azure client

SYNOPSIS
    gcloud container azure clients describe (CLIENT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Describe an Azure client.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To describe an Azure client named my-client in location us-west1, run:

        $ gcloud container azure clients describe my-client \
            --location=us-west1

POSITIONAL ARGUMENTS
     Client resource - Azure client to describe. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument client on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLIENT
          ID of the client or fully qualified identifier for the client.

          To set the client attribute:
          + provide the argument client on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the client.

          To set the location attribute:
          + provide the argument client on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure clients describe
```

### gcloud container azure clients get-public-cert

```text
NAME
    gcloud container azure clients get-public-cert - get the public certificate
        of an Azure client

SYNOPSIS
    gcloud container azure clients get-public-cert
        (CLIENT : --location=LOCATION) [--output-file=OUTPUT_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Get the public certificate of an Azure client.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To get the public certificate of an Azure client named my-client in
    location us-west1, run:

        $ gcloud container azure clients get-public-cert my-client \
            --location=us-west1

    To store the certificate in a file named client.crt, run:

        $ gcloud container azure clients get-public-cert my-client \
            --location=us-west1 --output-file=client.crt

POSITIONAL ARGUMENTS
     Client resource - Azure client to get the public certificate. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument client on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLIENT
          ID of the client or fully qualified identifier for the client.

          To set the client attribute:
          + provide the argument client on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the client.

          To set the location attribute:
          + provide the argument client on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property container_azure/location.

FLAGS
     --output-file=OUTPUT_FILE
        Path to the output file to store PEM.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container azure clients get-public-cert
```

### gcloud container azure clients list

```text
NAME
    gcloud container azure clients list - list Azure clients

SYNOPSIS
    gcloud container azure clients list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) List Azure clients.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To lists all clients in location us-west1, run:

        $ gcloud container azure clients list --location=us-west1

FLAGS
     Location resource - Google Cloud location to list Azure clients. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property container_azure/location with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property container_azure/location.

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
    This variant is also available:

        $ gcloud alpha container azure clients list
```

### gcloud alpha container azure clients create

```text
NAME
    gcloud alpha container azure clients create - create an Azure client

SYNOPSIS
    gcloud alpha container azure clients create (CLIENT : --location=LOCATION)
        --application-id=APP_ID --tenant-id=TENANT_ID [--async]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure clients delete

```text
NAME
    gcloud alpha container azure clients delete - delete an Azure client

SYNOPSIS
    gcloud alpha container azure clients delete (CLIENT : --location=LOCATION)
        [--allow-missing] [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure clients describe

```text
NAME
    gcloud alpha container azure clients describe - describe an Azure client

SYNOPSIS
    gcloud alpha container azure clients describe
        (CLIENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure clients get-public-cert

```text
NAME
    gcloud alpha container azure clients get-public-cert - get the public
        certificate of an Azure client

SYNOPSIS
    gcloud alpha container azure clients get-public-cert
        (CLIENT : --location=LOCATION) [--output-file=OUTPUT_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container azure clients list

```text
NAME
    gcloud alpha container azure clients list - list Azure clients

SYNOPSIS
    gcloud alpha container azure clients list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud container azure clients create`: "Create an Azure client. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure clients delete`: "Delete an Azure client. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure clients describe`: "Describe an Azure client. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure clients get-public-cert`: "Get the public certificate of an Azure client. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details."; `gcloud container azure clients list`: "List Azure clients. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement for more details.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/azure/clients (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

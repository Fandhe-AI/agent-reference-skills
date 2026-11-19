---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/tenants
---

# gcloud app-lifecycle-manager tenants

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app-lifecycle-manager tenants create

```text
NAME
    gcloud app-lifecycle-manager tenants create - create a tenant

SYNOPSIS
    gcloud app-lifecycle-manager tenants create TENANT --saas=SAAS
        [--consumer-resource=CONSUMER_RESOURCE] [--labels=[LABELS,...]]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an App Lifecycle Manager tenant.

    A tenant represents the service producer side of an instance of the service
    that is created based on a request from a consumer. A tenant usually maps
    one-to-one to a resource given out to a service consumer.

EXAMPLES
    To create a tenant named my-tenant for the SaaS offering my-saas in
    location us-central1, run:

        $ gcloud app-lifecycle-manager tenants create my-tenant \
            --location=us-central1 --saas=my-saas

    To create a tenant named my-tenant that has the label env=prod, run:

        $ gcloud app-lifecycle-manager tenants create my-tenant \
            --location=us-central1 --saas=my-saas --labels=env=prod

POSITIONAL ARGUMENTS
     Tenant resource - Tenant to create. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument tenant on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument tenant on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       TENANT
          ID of the tenant or fully qualified identifier for the tenant.

          To set the tenant attribute:
          + provide the argument tenant on the command line.

REQUIRED FLAGS
     Saas resource - SaaS offering that defines the product (managed service)
     that the service producer manages with App Lifecycle Manager. The SaaS
     offering cannot be changed after the tenant is created. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --saas on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --saas on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       --saas=SAAS
          ID of the saas or fully qualified identifier for the saas.

          To set the saas attribute:
          + provide the argument --saas on the command line.

OPTIONAL FLAGS
     --consumer-resource=CONSUMER_RESOURCE
        Consumer resource that this tenant represents. The consumer resource
        cannot be changed after it is set.

     --labels=[LABELS,...]
        Labels on the resource, which can be used for categorization, similar
        to Kubernetes resource labels.

         KEY
            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

         VALUE
            Values must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

        Shorthand Example:

            --labels=string=string

        JSON Example:

            --labels='{"string": "string"}'

        File Example:

            --labels=path_to_file.(yaml|json)

     --location=LOCATION
        For resources [tenant, saas], provides fallback value for resource
        location attribute. When the resource's full URI path is not provided,
        location will fallback to this flag value.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager tenants create
```

### gcloud app-lifecycle-manager tenants delete

```text
NAME
    gcloud app-lifecycle-manager tenants delete - delete a tenant

SYNOPSIS
    gcloud app-lifecycle-manager tenants delete (TENANT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an App Lifecycle Manager tenant.

    The command prompts for confirmation before the tenant is deleted.

EXAMPLES
    To delete the tenant named my-tenant in location us-central1, run:

        $ gcloud app-lifecycle-manager tenants delete my-tenant \
            --location=us-central1

    To delete the tenant named my-tenant in location us-central1 without a
    confirmation prompt, run:

        $ gcloud app-lifecycle-manager tenants delete my-tenant \
            --location=us-central1 --quiet

POSITIONAL ARGUMENTS
     Tenant resource - Tenant to delete. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument tenant on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TENANT
          ID of the tenant or fully qualified identifier for the tenant.

          To set the tenant attribute:
          + provide the argument tenant on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument tenant on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager tenants delete
```

### gcloud app-lifecycle-manager tenants describe

```text
NAME
    gcloud app-lifecycle-manager tenants describe - describe a tenant

SYNOPSIS
    gcloud app-lifecycle-manager tenants describe
        (TENANT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display the details of an App Lifecycle Manager tenant.

EXAMPLES
    To describe the tenant named my-tenant in location us-central1, run:

        $ gcloud app-lifecycle-manager tenants describe my-tenant \
            --location=us-central1

    To display only the SaaS offering and consumer resource of the tenant named
    my-tenant in location us-central1, run:

        $ gcloud app-lifecycle-manager tenants describe my-tenant \
            --location=us-central1 --format="yaml(saas,consumerResource)"

POSITIONAL ARGUMENTS
     Tenant resource - Tenant to describe. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument tenant on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TENANT
          ID of the tenant or fully qualified identifier for the tenant.

          To set the tenant attribute:
          + provide the argument tenant on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument tenant on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager tenants describe
```

### gcloud app-lifecycle-manager tenants list

```text
NAME
    gcloud app-lifecycle-manager tenants list - list tenants

SYNOPSIS
    gcloud app-lifecycle-manager tenants list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List App Lifecycle Manager tenants.

    If --location is not specified, tenants in all locations are listed.

EXAMPLES
    To list all tenants in location us-central1, run:

        $ gcloud app-lifecycle-manager tenants list --location=us-central1

    To list only the names of tenants with the label env=prod in all locations,
    run:

        $ gcloud app-lifecycle-manager tenants list \
            --filter="labels.env=prod" --format="value(name)"

FLAGS
     Location resource - Location of the tenants to list. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * if left empty, will use the wildcard '-' to list all locations with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * if left empty, will use the wildcard '-' to list all locations.

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
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager tenants list
```

### gcloud app-lifecycle-manager tenants update

```text
NAME
    gcloud app-lifecycle-manager tenants update - update a tenant

SYNOPSIS
    gcloud app-lifecycle-manager tenants update (TENANT : --location=LOCATION)
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an App Lifecycle Manager tenant.

EXAMPLES
    To add or update the label env=prod on the tenant named my-tenant in
    location us-central1, run:

        $ gcloud app-lifecycle-manager tenants update my-tenant \
            --location=us-central1 --update-labels=env=prod

    To remove all labels from the tenant named my-tenant in location
    us-central1, run:

        $ gcloud app-lifecycle-manager tenants update my-tenant \
            --location=us-central1 --clear-labels

POSITIONAL ARGUMENTS
     Tenant resource - Tenant to update. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument tenant on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TENANT
          ID of the tenant or fully qualified identifier for the tenant.

          To set the tenant attribute:
          + provide the argument tenant on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument tenant on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. Labels on the resource, which can be used
          for categorization, similar to Kubernetes resource labels.

           KEY
              Keys must start with a lowercase character and contain only
              hyphens (-), underscores (_), lowercase characters, and numbers.

           VALUE
              Values must contain only hyphens (-), underscores (_), lowercase
              characters, and numbers.

          Shorthand Example:

              --labels=string=string

          JSON Example:

              --labels='{"string": "string"}'

          File Example:

              --labels=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --update-labels=[UPDATE_LABELS,...]
            Update labels value or add key value pair. Labels on the resource,
            which can be used for categorization, similar to Kubernetes
            resource labels.

             KEY
                Keys must start with a lowercase character and contain only
                hyphens (-), underscores (_), lowercase characters, and
                numbers.

             VALUE
                Values must contain only hyphens (-), underscores (_),
                lowercase characters, and numbers.

            Shorthand Example:

                --update-labels=string=string

            JSON Example:

                --update-labels='{"string": "string"}'

            File Example:

                --update-labels=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-labels
              Clear labels value and set to empty map.

           --remove-labels=REMOVE_LABELS
              Remove existing value from map labels. Sets remove_labels value.

              Shorthand Example:

                  --remove-labels=string,string

              JSON Example:

                  --remove-labels=["string"]

              File Example:

                  --remove-labels=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager tenants update
```

### gcloud beta app-lifecycle-manager tenants create

```text
NAME
    gcloud beta app-lifecycle-manager tenants create - create a tenant

SYNOPSIS
    gcloud beta app-lifecycle-manager tenants create TENANT --saas=SAAS
        [--consumer-resource=CONSUMER_RESOURCE] [--labels=[LABELS,...]]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager tenants delete

```text
NAME
    gcloud beta app-lifecycle-manager tenants delete - delete a tenant

SYNOPSIS
    gcloud beta app-lifecycle-manager tenants delete
        (TENANT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager tenants describe

```text
NAME
    gcloud beta app-lifecycle-manager tenants describe - describe a tenant

SYNOPSIS
    gcloud beta app-lifecycle-manager tenants describe
        (TENANT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager tenants list

```text
NAME
    gcloud beta app-lifecycle-manager tenants list - list tenants

SYNOPSIS
    gcloud beta app-lifecycle-manager tenants list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager tenants update

```text
NAME
    gcloud beta app-lifecycle-manager tenants update - update a tenant

SYNOPSIS
    gcloud beta app-lifecycle-manager tenants update
        (TENANT : --location=LOCATION)
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/tenants (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-services/multicast-domains
---

# gcloud network-services multicast-domains

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-services multicast-domains create

```text
NAME
    gcloud network-services multicast-domains create - create a multicast
        domain

SYNOPSIS
    gcloud network-services multicast-domains create
        (MULTICAST_DOMAIN : --location=LOCATION) --admin-network=ADMIN_NETWORK
        (--connection-type=CONNECTION_TYPE;
          default="CONNECTION_TYPE_UNSPECIFIED" --ncc-hub=NCC_HUB) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--multicast-domain-group=MULTICAST_DOMAIN_GROUP]
        [--ull-multicast-domain=ULL_MULTICAST_DOMAIN] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a multicast domain in the specified location of the current project.

EXAMPLES
    Create a multicast domain with the name 'my-multicast-domain',
    admin-network 'path_to_admin_network', connection-type 'SAME_VPC', and
    location 'global'.

        $ gcloud network-services multicast-domains create \
            my-multicast-domain --admin-network=path_to_admin_network \
            --connection-type=SAME_VPC --location=global

    Create a multicast domain with the name 'my-multicast-domain',
    admin-network 'path_to_admin_network', connection-type 'NCC', ncc-hub
    'path_to_ncc_hub', and location 'global'.

        $ gcloud network-services multicast-domains create \
            my-multicast-domain --admin-network=path_to_admin_network \
            --connection-type=NCC --ncc-hub=path_to_ncc_hub \
            --location=global

POSITIONAL ARGUMENTS
     Multicast domain resource - Name of the multicast domain to be created.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument multicast_domain on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_DOMAIN
          ID of the multicast domain or fully qualified identifier for the
          multicast domain.

          To set the multicast_domain attribute:
          + provide the argument multicast_domain on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_domain on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --admin-network=ADMIN_NETWORK
        The URI of the admin network to be used.

     At least one of these must be specified:

       --connection-type=CONNECTION_TYPE; default="CONNECTION_TYPE_UNSPECIFIED"
          The connection type for authorizing multicast traffic.
          CONNECTION_TYPE must be one of: connection-type-unspecified, ncc,
          same-vpc.

       --ncc-hub=NCC_HUB
          The URI of the NCC hub to be used.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        The description for the multicast domain.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --multicast-domain-group=MULTICAST_DOMAIN_GROUP
        The URI of the multicast domain group to be used.

     --ull-multicast-domain=ULL_MULTICAST_DOMAIN
        The name of the ULL multicast feed to be used. This is for ULL
        multicast service only.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-domains create

        $ gcloud beta network-services multicast-domains create
```

### gcloud network-services multicast-domains delete

```text
NAME
    gcloud network-services multicast-domains delete - delete a multicast
        domain

SYNOPSIS
    gcloud network-services multicast-domains delete
        (MULTICAST_DOMAIN : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a multicast domain in the specified location of the current project.

EXAMPLES
    To delete a multicast domain in the current project, run:

        $ gcloud network-services multicast-domains delete \
            my-multicast-domain --location=global

POSITIONAL ARGUMENTS
     Multicast domain resource - The multicast domain to delete. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument multicast_domain on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_DOMAIN
          ID of the multicast domain or fully qualified identifier for the
          multicast domain.

          To set the multicast_domain attribute:
          + provide the argument multicast_domain on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_domain on the command line with a
            fully specified name;
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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-domains delete

        $ gcloud beta network-services multicast-domains delete
```

### gcloud network-services multicast-domains describe

```text
NAME
    gcloud network-services multicast-domains describe - describe a multicast
        domain

SYNOPSIS
    gcloud network-services multicast-domains describe
        (MULTICAST_DOMAIN : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of a multicast domain in the specified location of the current
    project.

EXAMPLES
    To describe details of a multicast domain in the current project, run:

        $ gcloud network-services multicast-domains describe \
            my-multicast-domain --location=global

POSITIONAL ARGUMENTS
     Multicast domain resource - The multicast domain to display. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument multicast_domain on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_DOMAIN
          ID of the multicast domain or fully qualified identifier for the
          multicast domain.

          To set the multicast_domain attribute:
          + provide the argument multicast_domain on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_domain on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-domains describe

        $ gcloud beta network-services multicast-domains describe
```

### gcloud network-services multicast-domains list

```text
NAME
    gcloud network-services multicast-domains list - list multicast domains

SYNOPSIS
    gcloud network-services multicast-domains list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all multicast domains in the specified location of the current
    project.

EXAMPLES
    To list multicast domains in the current project, run:

        $ gcloud network-services multicast-domains list --location=global

REQUIRED FLAGS
     Location resource - The location of the multicast domains to display. This
     represents a Cloud resource. (NOTE) Some attributes are not given
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
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-domains list

        $ gcloud beta network-services multicast-domains list
```

### gcloud network-services multicast-domains update

```text
NAME
    gcloud network-services multicast-domains update - update a multicast
        domain

SYNOPSIS
    gcloud network-services multicast-domains update
        (MULTICAST_DOMAIN : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a multicast domain in the specified location of the current project.

EXAMPLES
    Update a multicast domain with the name my-multicast-domain and location
    zone.

        $ gcloud network-services multicast-domains update \
            my-multicast-domain --description="new description" \
            --location=zone

POSITIONAL ARGUMENTS
     Multicast domain resource - Name of the multicast domain to be updated.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument multicast_domain on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICAST_DOMAIN
          ID of the multicast domain or fully qualified identifier for the
          multicast domain.

          To set the multicast_domain attribute:
          + provide the argument multicast_domain on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument multicast_domain on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        The description for the multicast domain.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud network-services multicast-domains update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-services multicast-domains update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkservices/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-services multicast-domains update

        $ gcloud beta network-services multicast-domains update
```

### gcloud beta network-services multicast-domains create

```text
NAME
    gcloud beta network-services multicast-domains create - create a multicast
        domain

SYNOPSIS
    gcloud beta network-services multicast-domains create
        (MULTICAST_DOMAIN : --location=LOCATION) --admin-network=ADMIN_NETWORK
        (--connection-type=CONNECTION_TYPE;
          default="CONNECTION_TYPE_UNSPECIFIED" --ncc-hub=NCC_HUB) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--multicast-domain-group=MULTICAST_DOMAIN_GROUP]
        [--ull-multicast-domain=ULL_MULTICAST_DOMAIN] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-domains delete

```text
NAME
    gcloud beta network-services multicast-domains delete - delete a multicast
        domain

SYNOPSIS
    gcloud beta network-services multicast-domains delete
        (MULTICAST_DOMAIN : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-domains describe

```text
NAME
    gcloud beta network-services multicast-domains describe - describe a
        multicast domain

SYNOPSIS
    gcloud beta network-services multicast-domains describe
        (MULTICAST_DOMAIN : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-domains list

```text
NAME
    gcloud beta network-services multicast-domains list - list multicast
        domains

SYNOPSIS
    gcloud beta network-services multicast-domains list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-services multicast-domains update

```text
NAME
    gcloud beta network-services multicast-domains update - update a multicast
        domain

SYNOPSIS
    gcloud beta network-services multicast-domains update
        (MULTICAST_DOMAIN : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-domains create

```text
NAME
    gcloud alpha network-services multicast-domains create - create a multicast
        domain

SYNOPSIS
    gcloud alpha network-services multicast-domains create
        (MULTICAST_DOMAIN : --location=LOCATION) --admin-network=ADMIN_NETWORK
        (--connection-type=CONNECTION_TYPE;
          default="CONNECTION_TYPE_UNSPECIFIED" --ncc-hub=NCC_HUB) [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--multicast-domain-group=MULTICAST_DOMAIN_GROUP]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-domains delete

```text
NAME
    gcloud alpha network-services multicast-domains delete - delete a multicast
        domain

SYNOPSIS
    gcloud alpha network-services multicast-domains delete
        (MULTICAST_DOMAIN : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-domains describe

```text
NAME
    gcloud alpha network-services multicast-domains describe - describe a
        multicast domain

SYNOPSIS
    gcloud alpha network-services multicast-domains describe
        (MULTICAST_DOMAIN : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-domains list

```text
NAME
    gcloud alpha network-services multicast-domains list - list multicast
        domains

SYNOPSIS
    gcloud alpha network-services multicast-domains list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services multicast-domains update

```text
NAME
    gcloud alpha network-services multicast-domains update - update a multicast
        domain

SYNOPSIS
    gcloud alpha network-services multicast-domains update
        (MULTICAST_DOMAIN : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-services/multicast-domains (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

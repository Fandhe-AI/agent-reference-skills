---
source: https://docs.cloud.google.com/sdk/gcloud/reference/certificate-manager/dns-authorizations
---

# gcloud certificate-manager dns-authorizations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud certificate-manager dns-authorizations create

```text
NAME
    gcloud certificate-manager dns-authorizations create - create a DNS
        Authorization

SYNOPSIS
    gcloud certificate-manager dns-authorizations create
        (DNS_AUTHORIZATION : --location=LOCATION) --domain=DOMAIN [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--tags=[KEY=VALUE,...]] [--type=TYPE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new DNS Authorization.

EXAMPLES
    To create a DNS authorization called my-authorization, run:

        $ gcloud certificate-manager dns-authorizations create \
            my-authorization --domain=host.example.com

POSITIONAL ARGUMENTS
     DnsAuthorization resource - The name of the DNS Authorization to create.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument dns_authorization on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DNS_AUTHORIZATION
          ID of the dnsAuthorization or fully qualified identifier for the
          dnsAuthorization.

          To set the dns_authorization attribute:
          + provide the argument dns_authorization on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Certificate Manager location.

          To set the location attribute:
          + provide the argument dns_authorization on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

REQUIRED FLAGS
     --domain=DOMAIN
        Public domain name to create an authorization for.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Human-readable description of the resource.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --tags=[KEY=VALUE,...]
        List of tags KEY=VALUE pairs to bind. Each item must be expressed as
        <tag-key-namespaced-name>=<tag-value-short-name>.

        Example: 123/environment=production,123/costCenter=marketing

     --type=TYPE
        Type of the DNS authorization. TYPE must be one of: fixed-record,
        per-project-record, type-unspecified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the certificatemanager/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/certificate-manager/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager dns-authorizations create

        $ gcloud beta certificate-manager dns-authorizations create
```

### gcloud certificate-manager dns-authorizations delete

```text
NAME
    gcloud certificate-manager dns-authorizations delete - delete a DNS
        Authorization

SYNOPSIS
    gcloud certificate-manager dns-authorizations delete
        (DNS_AUTHORIZATION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a DNS Authorization.

EXAMPLES
    To delete a DNS Authorization called my-authorization, run:

        $ gcloud certificate-manager dns-authorizations delete \
            my-authorization

POSITIONAL ARGUMENTS
     DnsAuthorization resource - The name of the DNS Authorization to delete.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument dns_authorization on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DNS_AUTHORIZATION
          ID of the dnsAuthorization or fully qualified identifier for the
          dnsAuthorization.

          To set the dns_authorization attribute:
          + provide the argument dns_authorization on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Certificate Manager location.

          To set the location attribute:
          + provide the argument dns_authorization on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

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
    This command uses the certificatemanager/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/certificate-manager/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager dns-authorizations delete

        $ gcloud beta certificate-manager dns-authorizations delete
```

### gcloud certificate-manager dns-authorizations describe

```text
NAME
    gcloud certificate-manager dns-authorizations describe - show details about
        a DNS Authorization

SYNOPSIS
    gcloud certificate-manager dns-authorizations describe
        (DNS_AUTHORIZATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about a DNS Authorization.

EXAMPLES
    To show details about an existing authorization, run:

        $ gcloud certificate-manager dns-authorizations describe \
            my-authorization

POSITIONAL ARGUMENTS
     DnsAuthorization resource - The DNS Authorization you want to describe.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument dns_authorization on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DNS_AUTHORIZATION
          ID of the dnsAuthorization or fully qualified identifier for the
          dnsAuthorization.

          To set the dns_authorization attribute:
          + provide the argument dns_authorization on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Certificate Manager location.

          To set the location attribute:
          + provide the argument dns_authorization on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the certificatemanager/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/certificate-manager/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager dns-authorizations describe

        $ gcloud beta certificate-manager dns-authorizations describe
```

### gcloud certificate-manager dns-authorizations list

```text
NAME
    gcloud certificate-manager dns-authorizations list - list all DNS
        Authorizations in a project

SYNOPSIS
    gcloud certificate-manager dns-authorizations list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List existing DNS Authorizations.

EXAMPLES
    To list existing DNS authorizations, run:

        $ gcloud certificate-manager dns-authorizations list

FLAGS
     Location resource - The location (defaults to '-') of the resources. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
    This command uses the certificatemanager/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/certificate-manager/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager dns-authorizations list

        $ gcloud beta certificate-manager dns-authorizations list
```

### gcloud certificate-manager dns-authorizations update

```text
NAME
    gcloud certificate-manager dns-authorizations update - update a DNS
        Authorization

SYNOPSIS
    gcloud certificate-manager dns-authorizations update
        (DNS_AUTHORIZATION : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a DNS Authorization.

EXAMPLES
    To Update a DNS Authorization called my-authorization, run:

        $ gcloud certificate-manager dns-authorizations update \
            my-authorization

POSITIONAL ARGUMENTS
     DnsAuthorization resource - The name of the DNS Authorization to delete.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument dns_authorization on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DNS_AUTHORIZATION
          ID of the dnsAuthorization or fully qualified identifier for the
          dnsAuthorization.

          To set the dns_authorization attribute:
          + provide the argument dns_authorization on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Certificate Manager location.

          To set the location attribute:
          + provide the argument dns_authorization on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Human-readable description of the resource.

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

              $ gcloud certificate-manager dns-authorizations update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud certificate-manager dns-authorizations update \
                --clear-labels --update-labels foo=bar,baz=qux

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
    This command uses the certificatemanager/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/certificate-manager/docs/overview

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager dns-authorizations update

        $ gcloud beta certificate-manager dns-authorizations update
```

### gcloud beta certificate-manager dns-authorizations create

```text
NAME
    gcloud beta certificate-manager dns-authorizations create - create a DNS
        Authorization

SYNOPSIS
    gcloud beta certificate-manager dns-authorizations create
        (DNS_AUTHORIZATION : --location=LOCATION) --domain=DOMAIN [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--tags=[KEY=VALUE,...]] [--type=TYPE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager dns-authorizations delete

```text
NAME
    gcloud beta certificate-manager dns-authorizations delete - delete a DNS
        Authorization

SYNOPSIS
    gcloud beta certificate-manager dns-authorizations delete
        (DNS_AUTHORIZATION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager dns-authorizations describe

```text
NAME
    gcloud beta certificate-manager dns-authorizations describe - show details
        about a DNS Authorization

SYNOPSIS
    gcloud beta certificate-manager dns-authorizations describe
        (DNS_AUTHORIZATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager dns-authorizations list

```text
NAME
    gcloud beta certificate-manager dns-authorizations list - list all DNS
        Authorizations in a project

SYNOPSIS
    gcloud beta certificate-manager dns-authorizations list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager dns-authorizations update

```text
NAME
    gcloud beta certificate-manager dns-authorizations update - update a DNS
        Authorization

SYNOPSIS
    gcloud beta certificate-manager dns-authorizations update
        (DNS_AUTHORIZATION : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager dns-authorizations create

```text
NAME
    gcloud alpha certificate-manager dns-authorizations create - create a DNS
        Authorization

SYNOPSIS
    gcloud alpha certificate-manager dns-authorizations create
        (DNS_AUTHORIZATION : --location=LOCATION) --domain=DOMAIN [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--tags=[KEY=VALUE,...]] [--type=TYPE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager dns-authorizations delete

```text
NAME
    gcloud alpha certificate-manager dns-authorizations delete - delete a DNS
        Authorization

SYNOPSIS
    gcloud alpha certificate-manager dns-authorizations delete
        (DNS_AUTHORIZATION : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager dns-authorizations describe

```text
NAME
    gcloud alpha certificate-manager dns-authorizations describe - show details
        about a DNS Authorization

SYNOPSIS
    gcloud alpha certificate-manager dns-authorizations describe
        (DNS_AUTHORIZATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager dns-authorizations list

```text
NAME
    gcloud alpha certificate-manager dns-authorizations list - list all DNS
        Authorizations in a project

SYNOPSIS
    gcloud alpha certificate-manager dns-authorizations list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager dns-authorizations update

```text
NAME
    gcloud alpha certificate-manager dns-authorizations update - update a DNS
        Authorization

SYNOPSIS
    gcloud alpha certificate-manager dns-authorizations update
        (DNS_AUTHORIZATION : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/certificate-manager/dns-authorizations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

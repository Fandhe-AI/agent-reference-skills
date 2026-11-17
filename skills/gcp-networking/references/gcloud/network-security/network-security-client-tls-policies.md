---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/client-tls-policies
---

# gcloud network-security client-tls-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security client-tls-policies delete

```text
NAME
    gcloud network-security client-tls-policies delete - delete ClientTlsPolicy

SYNOPSIS
    gcloud network-security client-tls-policies delete
        (CLIENT_TLS_POLICY : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified ClientTlsPolicy.

EXAMPLES
    To delete a ClientTlsPolicy called 'my-client-tls-policy', run:

        $ gcloud network-security client-tls-policies delete \
            my-client-tls-policy --location=global

POSITIONAL ARGUMENTS
     Client TLS policy resource - Name of the ClientTlsPolicy you want to
     delete. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument client_tls_policy on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLIENT_TLS_POLICY
          ID of the client TLS policy or fully qualified identifier for the
          client TLS policy.

          To set the client_tls_policy attribute:
          + provide the argument client_tls_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument client_tls_policy on the command line with a
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
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security client-tls-policies delete

        $ gcloud beta network-security client-tls-policies delete
```

### gcloud network-security client-tls-policies export

```text
NAME
    gcloud network-security client-tls-policies export - export ClientTlsPolicy

SYNOPSIS
    gcloud network-security client-tls-policies export
        (CLIENT_TLS_POLICY : --location=LOCATION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export a ClientTlsPolicy.

EXAMPLES
    To export a ClientTlsPolicy, run:

        $ gcloud network-security client-tls-policies export \
            my-client-tls-policy --destination=my-client-tls-policy.yaml \
            --location=global

POSITIONAL ARGUMENTS
     Client TLS policy resource - Name of the ClientTlsPolicy to export. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument client_tls_policy on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLIENT_TLS_POLICY
          ID of the client TLS policy or fully qualified identifier for the
          client TLS policy.

          To set the client_tls_policy attribute:
          + provide the argument client_tls_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument client_tls_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --destination=DESTINATION
        Path to a YAML file where the configuration will be exported. The
        exported data will not contain any output-only fields. Alternatively,
        you may omit this flag to write to standard output. For a schema
        describing the export/import format, see
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security client-tls-policies export

        $ gcloud beta network-security client-tls-policies export
```

### gcloud network-security client-tls-policies import

```text
NAME
    gcloud network-security client-tls-policies import - import ClientTlsPolicy

SYNOPSIS
    gcloud network-security client-tls-policies import
        (CLIENT_TLS_POLICY : --location=LOCATION) [--async] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Import a ClientTlsPolicy.

EXAMPLES
    To import a ClientTlsPolicy from a YAML file, run:

        $ gcloud network-security client-tls-policies import \
            my-client-tls-policy --source=my-client-tls-policy.yaml \
            --location=global

POSITIONAL ARGUMENTS
     Client TLS policy resource - Name of the ClientTlsPolicy to import. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument client_tls_policy on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLIENT_TLS_POLICY
          ID of the client TLS policy or fully qualified identifier for the
          client TLS policy.

          To set the client_tls_policy attribute:
          + provide the argument client_tls_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument client_tls_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --source=SOURCE
        Path to a YAML file containing the configuration export data. The YAML
        file must not contain any output-only fields. Alternatively, you may
        omit this flag to read from standard input. For a schema describing the
        export/import format, see: $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

        $CLOUDSDKROOT is can be obtained with the following command:

            $ gcloud info --format='value(installation.sdk_root)'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security client-tls-policies import

        $ gcloud beta network-security client-tls-policies import
```

### gcloud network-security client-tls-policies list

```text
NAME
    gcloud network-security client-tls-policies list - list ClientTlsPolicies

SYNOPSIS
    gcloud network-security client-tls-policies list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all ClientTlsPolicies in the specified location of the current
    project.

EXAMPLES
    To list ClientTlsPolicies in the current project, run:

        $ gcloud network-security client-tls-policies list --location=global

REQUIRED FLAGS
     Location resource - The project of the ClientTlsPolicies to display. This
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
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security client-tls-policies list

        $ gcloud beta network-security client-tls-policies list
```

### gcloud beta network-security client-tls-policies delete

```text
NAME
    gcloud beta network-security client-tls-policies delete - delete
        ClientTlsPolicy

SYNOPSIS
    gcloud beta network-security client-tls-policies delete
        (CLIENT_TLS_POLICY : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security client-tls-policies export

```text
NAME
    gcloud beta network-security client-tls-policies export - export
        ClientTlsPolicy

SYNOPSIS
    gcloud beta network-security client-tls-policies export
        (CLIENT_TLS_POLICY : --location=LOCATION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security client-tls-policies import

```text
NAME
    gcloud beta network-security client-tls-policies import - import
        ClientTlsPolicy

SYNOPSIS
    gcloud beta network-security client-tls-policies import
        (CLIENT_TLS_POLICY : --location=LOCATION) [--async] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security client-tls-policies list

```text
NAME
    gcloud beta network-security client-tls-policies list - list
        ClientTlsPolicies

SYNOPSIS
    gcloud beta network-security client-tls-policies list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security client-tls-policies delete

```text
NAME
    gcloud alpha network-security client-tls-policies delete - delete
        ClientTlsPolicy

SYNOPSIS
    gcloud alpha network-security client-tls-policies delete
        (CLIENT_TLS_POLICY : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security client-tls-policies export

```text
NAME
    gcloud alpha network-security client-tls-policies export - export
        ClientTlsPolicy

SYNOPSIS
    gcloud alpha network-security client-tls-policies export
        (CLIENT_TLS_POLICY : --location=LOCATION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security client-tls-policies import

```text
NAME
    gcloud alpha network-security client-tls-policies import - import
        ClientTlsPolicy

SYNOPSIS
    gcloud alpha network-security client-tls-policies import
        (CLIENT_TLS_POLICY : --location=LOCATION) [--async] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security client-tls-policies list

```text
NAME
    gcloud alpha network-security client-tls-policies list - list
        ClientTlsPolicies

SYNOPSIS
    gcloud alpha network-security client-tls-policies list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/client-tls-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

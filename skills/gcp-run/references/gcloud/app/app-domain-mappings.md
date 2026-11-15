---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app/domain-mappings
---

# gcloud app domain-mappings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app domain-mappings create

```text
NAME
    gcloud app domain-mappings create - creates a domain mapping

SYNOPSIS
    gcloud app domain-mappings create DOMAIN [--certificate-id=CERTIFICATE_ID]
        [--certificate-management=CERTIFICATE_MANAGEMENT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a domain mapping.

EXAMPLES
    To create a new App Engine domain mapping with an automatically managed
    certificate, run:

        $ gcloud app domain-mappings create 'example.com'

    Note: managed certificates do not support wildcard domain mappings.

    To create a domain with a manual certificate, run:

        $ gcloud app domain-mappings create '*.example.com' \
          --certificate-management=manual --certificate-id=1234

    To create a domain with no associated certificate, run:

        $ gcloud app domain-mappings create '*.example.com' \
          --certificate-management=manual

POSITIONAL ARGUMENTS
     DOMAIN
        A valid domain which may begin with a wildcard, such as: example.com or
        *.example.com

FLAGS
     --certificate-id=CERTIFICATE_ID
        A certificate id to use for this domain. May not be used on a domain
        mapping with automatically managed certificates. Use the gcloud app
        ssl-certificates list to see available certificates for this app.

     --certificate-management=CERTIFICATE_MANAGEMENT
        Type of certificate management. 'automatic' will provision an SSL
        certificate automatically while 'manual' requires the user to provide a
        certificate id to provision. CERTIFICATE_MANAGEMENT must be one of:
        automatic, manual.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha app domain-mappings create

        $ gcloud beta app domain-mappings create
```

### gcloud app domain-mappings delete

```text
NAME
    gcloud app domain-mappings delete - deletes a specified domain mapping

SYNOPSIS
    gcloud app domain-mappings delete DOMAIN [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a specified domain mapping.

EXAMPLES
    To delete an App Engine domain mapping, run:

        $ gcloud app domain-mappings delete '*.example.com'

POSITIONAL ARGUMENTS
     DOMAIN
        A valid domain which may begin with a wildcard, such as: example.com or
        *.example.com

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha app domain-mappings delete

        $ gcloud beta app domain-mappings delete
```

### gcloud app domain-mappings describe

```text
NAME
    gcloud app domain-mappings describe - describes a specified domain mapping

SYNOPSIS
    gcloud app domain-mappings describe DOMAIN [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a specified domain mapping.

EXAMPLES
    To describe an App Engine domain mapping, run:

        $ gcloud app domain-mappings describe '*.example.com'

POSITIONAL ARGUMENTS
     DOMAIN
        A valid domain which may begin with a wildcard, such as: example.com or
        *.example.com

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha app domain-mappings describe

        $ gcloud beta app domain-mappings describe
```

### gcloud app domain-mappings list

```text
NAME
    gcloud app domain-mappings list - lists domain mappings

SYNOPSIS
    gcloud app domain-mappings list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists domain mappings.

EXAMPLES
    To list all App Engine domain mappings, run:

        $ gcloud app domain-mappings list

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

        $ gcloud alpha app domain-mappings list

        $ gcloud beta app domain-mappings list
```

### gcloud app domain-mappings update

```text
NAME
    gcloud app domain-mappings update - updates a domain mapping

SYNOPSIS
    gcloud app domain-mappings update DOMAIN
        [--certificate-management=CERTIFICATE_MANAGEMENT]
        [--certificate-id=CERTIFICATE_ID | --no-certificate-id]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a domain mapping.

EXAMPLES
    To update an App Engine domain mapping, run:

        $ gcloud app domain-mappings update '*.example.com' \
          --certificate-id=1234

    To remove a certificate from a domain:

        $ gcloud app domain-mappings update '*.example.com' \
          --no-certificate-id

POSITIONAL ARGUMENTS
     DOMAIN
        A valid domain which may begin with a wildcard, such as: example.com or
        *.example.com

FLAGS
     --certificate-management=CERTIFICATE_MANAGEMENT
        Type of certificate management. 'automatic' will provision an SSL
        certificate automatically while 'manual' requires the user to provide a
        certificate id to provision. CERTIFICATE_MANAGEMENT must be one of:
        automatic, manual.

     At most one of these can be specified:

       --certificate-id=CERTIFICATE_ID
          A certificate id to use for this domain. May not be used on a domain
          mapping with automatically managed certificates. Use the gcloud app
          ssl-certificates list to see available certificates for this app.

       --no-certificate-id
          Do not associate any certificate with this domain.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha app domain-mappings update

        $ gcloud beta app domain-mappings update
```

### gcloud beta app domain-mappings create

```text
NAME
    gcloud beta app domain-mappings create - creates a domain mapping

SYNOPSIS
    gcloud beta app domain-mappings create DOMAIN
        [--certificate-id=CERTIFICATE_ID]
        [--certificate-management=CERTIFICATE_MANAGEMENT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app domain-mappings delete

```text
NAME
    gcloud beta app domain-mappings delete - deletes a specified domain mapping

SYNOPSIS
    gcloud beta app domain-mappings delete DOMAIN [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app domain-mappings describe

```text
NAME
    gcloud beta app domain-mappings describe - describes a specified domain
        mapping

SYNOPSIS
    gcloud beta app domain-mappings describe DOMAIN [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app domain-mappings list

```text
NAME
    gcloud beta app domain-mappings list - lists domain mappings

SYNOPSIS
    gcloud beta app domain-mappings list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app domain-mappings update

```text
NAME
    gcloud beta app domain-mappings update - updates a domain mapping

SYNOPSIS
    gcloud beta app domain-mappings update DOMAIN
        [--certificate-management=CERTIFICATE_MANAGEMENT]
        [--certificate-id=CERTIFICATE_ID | --no-certificate-id]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha app domain-mappings create

```text
NAME
    gcloud alpha app domain-mappings create - creates a domain mapping

SYNOPSIS
    gcloud alpha app domain-mappings create DOMAIN
        [--certificate-id=CERTIFICATE_ID]
        [--certificate-management=CERTIFICATE_MANAGEMENT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha app domain-mappings delete

```text
NAME
    gcloud alpha app domain-mappings delete - deletes a specified domain
        mapping

SYNOPSIS
    gcloud alpha app domain-mappings delete DOMAIN [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha app domain-mappings describe

```text
NAME
    gcloud alpha app domain-mappings describe - describes a specified domain
        mapping

SYNOPSIS
    gcloud alpha app domain-mappings describe DOMAIN [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha app domain-mappings list

```text
NAME
    gcloud alpha app domain-mappings list - lists domain mappings

SYNOPSIS
    gcloud alpha app domain-mappings list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha app domain-mappings update

```text
NAME
    gcloud alpha app domain-mappings update - updates a domain mapping

SYNOPSIS
    gcloud alpha app domain-mappings update DOMAIN
        [--certificate-management=CERTIFICATE_MANAGEMENT]
        [--certificate-id=CERTIFICATE_ID | --no-certificate-id]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/domain-mappings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

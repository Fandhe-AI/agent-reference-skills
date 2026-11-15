---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app/ssl-certificates
---

# gcloud app ssl-certificates

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app ssl-certificates create

```text
NAME
    gcloud app ssl-certificates create - uploads a new SSL certificate

SYNOPSIS
    gcloud app ssl-certificates create --certificate=LOCAL_FILE_PATH
        --display-name=DISPLAY_NAME --private-key=LOCAL_FILE_PATH
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The user must be the verified owner of the certificate domain(s). Use the
    gcloud domains command group to manage domain ownership and verification.

EXAMPLES
    To add a new SSL certificate to App Engine, run:

        $ gcloud app ssl-certificates create --display-name='example cert' \
          --certificate='/home/user/me/my_cert.cer' \
          --private-key='/home/user/me/my_key.pfx'

REQUIRED FLAGS
     --certificate=LOCAL_FILE_PATH
        The file path for the new certificate to upload. Must be in PEM x.509
        format including the header and footer.

     --display-name=DISPLAY_NAME
        A display name for this certificate.

     --private-key=LOCAL_FILE_PATH
        The file path to a local RSA private key file. The private key must be
        PEM encoded with header and footer and must be 2048 bits or fewer.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha app ssl-certificates create

        $ gcloud beta app ssl-certificates create
```

### gcloud app ssl-certificates delete

```text
NAME
    gcloud app ssl-certificates delete - deletes an SSL certificate

SYNOPSIS
    gcloud app ssl-certificates delete ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes an SSL certificate.

EXAMPLES
    To delete an App Engine SSL certificate, run:

        $ gcloud app ssl-certificates delete 1234

POSITIONAL ARGUMENTS
     ID
        The id of the certificate. This identifier is printed upon creation of
        a new certificate. Run gcloud app ssl-certificates list to view
        existing certificates.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha app ssl-certificates delete

        $ gcloud beta app ssl-certificates delete
```

### gcloud app ssl-certificates describe

```text
NAME
    gcloud app ssl-certificates describe - describes a specified SSL
        certificate

SYNOPSIS
    gcloud app ssl-certificates describe ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a specified SSL certificate.

EXAMPLES
    To describe an App Engine SSL certificate, run:

        $ gcloud app ssl-certificates describe 1234

POSITIONAL ARGUMENTS
     ID
        The id of the certificate. This identifier is printed upon creation of
        a new certificate. Run gcloud app ssl-certificates list to view
        existing certificates.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha app ssl-certificates describe

        $ gcloud beta app ssl-certificates describe
```

### gcloud app ssl-certificates list

```text
NAME
    gcloud app ssl-certificates list - lists the SSL certificates

SYNOPSIS
    gcloud app ssl-certificates list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists the SSL certificates.

EXAMPLES
    To list all App Engine SSL certificates, run:

        $ gcloud app ssl-certificates list

    This will return certificates mapped to domain-mappings for the current app
    as well as all certificates that apply to domains which the current user
    owns.

    To view your owned domains, run gcloud domains list-user-verified.

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

        $ gcloud alpha app ssl-certificates list

        $ gcloud beta app ssl-certificates list
```

### gcloud app ssl-certificates update

```text
NAME
    gcloud app ssl-certificates update - updates an SSL certificate

SYNOPSIS
    gcloud app ssl-certificates update ID [--certificate=LOCAL_FILE_PATH]
        [--display-name=DISPLAY_NAME] [--private-key=LOCAL_FILE_PATH]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates an SSL certificate.

EXAMPLES
    To update an App Engine SSL certificate, run:

        $ gcloud app ssl-certificates update 1234 \
          --display-name='updated name' \
          --certificate='/home/user/me/new_cert.cer' \
          --private-key='/home/user/me/new_key.pfx'

POSITIONAL ARGUMENTS
     ID
        The id of the certificate. This identifier is printed upon creation of
        a new certificate. Run gcloud app ssl-certificates list to view
        existing certificates.

FLAGS
     --certificate=LOCAL_FILE_PATH
        The file path for the new certificate to upload. Must be in PEM x.509
        format including the header and footer.

     --display-name=DISPLAY_NAME
        A display name for this certificate.

     --private-key=LOCAL_FILE_PATH
        The file path to a local RSA private key file. The private key must be
        PEM encoded with header and footer and must be 2048 bits or fewer.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha app ssl-certificates update

        $ gcloud beta app ssl-certificates update
```

### gcloud beta app ssl-certificates create

```text
NAME
    gcloud beta app ssl-certificates create - uploads a new SSL certificate

SYNOPSIS
    gcloud beta app ssl-certificates create --certificate=LOCAL_FILE_PATH
        --display-name=DISPLAY_NAME --private-key=LOCAL_FILE_PATH
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app ssl-certificates delete

```text
NAME
    gcloud beta app ssl-certificates delete - deletes an SSL certificate

SYNOPSIS
    gcloud beta app ssl-certificates delete ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app ssl-certificates describe

```text
NAME
    gcloud beta app ssl-certificates describe - describes a specified SSL
        certificate

SYNOPSIS
    gcloud beta app ssl-certificates describe ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app ssl-certificates list

```text
NAME
    gcloud beta app ssl-certificates list -

SYNOPSIS
    gcloud beta app ssl-certificates list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app ssl-certificates update

```text
NAME
    gcloud beta app ssl-certificates update - updates an SSL certificate

SYNOPSIS
    gcloud beta app ssl-certificates update ID [--certificate=LOCAL_FILE_PATH]
        [--display-name=DISPLAY_NAME] [--private-key=LOCAL_FILE_PATH]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha app ssl-certificates create

```text
NAME
    gcloud alpha app ssl-certificates create - uploads a new SSL certificate

SYNOPSIS
    gcloud alpha app ssl-certificates create --certificate=LOCAL_FILE_PATH
        --display-name=DISPLAY_NAME --private-key=LOCAL_FILE_PATH
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha app ssl-certificates delete

```text
NAME
    gcloud alpha app ssl-certificates delete - deletes an SSL certificate

SYNOPSIS
    gcloud alpha app ssl-certificates delete ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha app ssl-certificates describe

```text
NAME
    gcloud alpha app ssl-certificates describe - describes a specified SSL
        certificate

SYNOPSIS
    gcloud alpha app ssl-certificates describe ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha app ssl-certificates list

```text
NAME
    gcloud alpha app ssl-certificates list -

SYNOPSIS
    gcloud alpha app ssl-certificates list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha app ssl-certificates update

```text
NAME
    gcloud alpha app ssl-certificates update - updates an SSL certificate

SYNOPSIS
    gcloud alpha app ssl-certificates update ID [--certificate=LOCAL_FILE_PATH]
        [--display-name=DISPLAY_NAME] [--private-key=LOCAL_FILE_PATH]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/ssl-certificates (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

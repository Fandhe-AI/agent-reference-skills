---
source: https://docs.cloud.google.com/sdk/gcloud/reference/certificate-manager/certificates
---

# gcloud certificate-manager certificates

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud certificate-manager certificates create

```text
NAME
    gcloud certificate-manager certificates create - create a certificate

SYNOPSIS
    gcloud certificate-manager certificates create
        (CERTIFICATE : --location=LOCATION)
        (--certificate-file=PATH_TO_FILE --private-key-file=PATH_TO_FILE
          | [--domains=[DOMAINS,...]
          : --dns-authorizations=[DNS_AUTHORIZATIONS,...]
          | --issuance-config=ISSUANCE_CONFIG]) [--description=DESCRIPTION]
        [--async] [--labels=[KEY=VALUE,...]] [--scope=SCOPE; default="DEFAULT"]
        [--tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new certificate.

      o Managed certificates can be created by supplying one or more domain
        names and an (optional) list of DNS authorizations for those domain
        names.
      o Self-managed certificates can be created by uploading a certificate
        and its corresponding private key (both in PEM format).

EXAMPLES
    To create (upload) a self-managed certificate called www-example-com, run:

        $ gcloud certificate-manager certificates create www-example-com \
            --private-key-file=key.pem --certificate-file=cert.pem

    To create a certificate managed by Certificate Manager called
    api-example-com, run:

        $ gcloud certificate-manager certificates create api-example-com \
            --domains="api.example.com"

    To create a certificate managed by Certificate Manager called
    api-example-com, using an existing DNS authorization, run:

        $ gcloud certificate-manager certificates create api-example-com \
            --dns-authorizations=api-example-com --domains="api.example.com"

POSITIONAL ARGUMENTS
     Certificate resource - The certificate to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument certificate on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CERTIFICATE
          ID of the certificate or fully qualified identifier for the
          certificate.

          To set the certificate attribute:
          + provide the argument certificate on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the certificate.

          To set the location attribute:
          + provide the argument certificate on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

REQUIRED FLAGS
     Configuration for creating and uploading certificates to Cloud Certificate
     Manager.

     Exactly one of these must be specified:

       Configuration for uploading self-managed certificates and keys.

       --certificate-file=PATH_TO_FILE
          Certificate data in PEM-encoded form. Use a full or relative path to
          a local file containing the value of certificate_file.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --private-key-file=PATH_TO_FILE
          Private key data in PEM-encoded form. Use a full or relative path to
          a local file containing the value of private_key_file.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       Configuration for creating new managed certificates.

       --domains=[DOMAINS,...]
          Public domain name(s) to create a certificate for.

          + If a DNS authorization is provided for the domain, the
            certificate will be validated against the DNS record you added as
            part of the authorization flow.
          + If no DNS authorization is provided, Certificate Manager will
            attempt to validate the domain against the serving endpoint
            directly.

          You may list multiple, comma-separated domain names to include
          multiple names as Subject Alternative Names on the issued
          certificate.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       At most one of these can be specified:

         --dns-authorizations=[DNS_AUTHORIZATIONS,...]
            Name(s) of the DNS authorizations for each listed domain.

            Note that each domain requires a matching authorization, and any
            domain that fails authorization will prevent issuance and/or
            renewal of the certificate.

            To reference multiple DNS authorizations, provide a list of comma
            separated DNS authorization resource names or URLs. For example:

                $ gcloud certificate-manager certificates create \
                     --dns-authorizations=api-example-com,www-example-com

         --issuance-config=ISSUANCE_CONFIG
            Name of the Certificate Issuance Config to use for issuance.

COMMONLY USED FLAGS
     --description=DESCRIPTION
        Text description of a certificate.

OTHER FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --scope=SCOPE; default="DEFAULT"
        Scope of the managed certificate. This determines which services the
        certificate can be attached to/associated with. Defaults to DEFAULT.
        SCOPE must be one of:

         all-regions
            Certificates with scope ALL_REGIONS are currently used for
            Cross-region Internal Application Load Balancer only.

         client-auth
            Certificates with scope CLIENT_AUTH are used for client
            authentication.

         default
            Certificates with DEFAULT scope are used for Load Balancing and
            Cloud CDN.

            If unsure, choose this option.

         edge-cache
            Certificates with scope EDGE_CACHE are special-purposed
            certificates, scoped for use with Media Edge services only.

     --tags=[KEY=VALUE,...]
        List of tags KEY=VALUE pairs to bind. Each item must be expressed as
        <tag-key-namespaced-name>=<tag-value-short-name>.

        Example: 123/environment=production,123/costCenter=marketing

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

        $ gcloud alpha certificate-manager certificates create

        $ gcloud beta certificate-manager certificates create
```

### gcloud certificate-manager certificates delete

```text
NAME
    gcloud certificate-manager certificates delete - delete a certificate

SYNOPSIS
    gcloud certificate-manager certificates delete
        (CERTIFICATE : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a certificate resource.

EXAMPLES
    To delete the certificate with name simple-cert, run:

        $ gcloud certificate-manager certificates delete simple-cert

POSITIONAL ARGUMENTS
     Certificate resource - The certificate to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument certificate on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CERTIFICATE
          ID of the certificate or fully qualified identifier for the
          certificate.

          To set the certificate attribute:
          + provide the argument certificate on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the certificate.

          To set the location attribute:
          + provide the argument certificate on the command line with a fully
            specified name;
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

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager certificates delete

        $ gcloud beta certificate-manager certificates delete
```

### gcloud certificate-manager certificates describe

```text
NAME
    gcloud certificate-manager certificates describe - describe an existing
        certificate

SYNOPSIS
    gcloud certificate-manager certificates describe
        (CERTIFICATE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command fetches and prints information about an existing certificate.

EXAMPLES
    To describe a certificate with name my-cert, run:

        $ gcloud certificate-manager certificates describe my-cert

POSITIONAL ARGUMENTS
     Certificate resource - The certificate you want to describe. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument certificate on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CERTIFICATE
          ID of the certificate or fully qualified identifier for the
          certificate.

          To set the certificate attribute:
          + provide the argument certificate on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Certificate Manager location.

          To set the location attribute:
          + provide the argument certificate on the command line with a fully
            specified name;
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

        $ gcloud alpha certificate-manager certificates describe

        $ gcloud beta certificate-manager certificates describe
```

### gcloud certificate-manager certificates list

```text
NAME
    gcloud certificate-manager certificates list - list certificates

SYNOPSIS
    gcloud certificate-manager certificates list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Certificate Manager certificates in the project.

EXAMPLES
    To list all certificates in the project, run:

        $ gcloud certificate-manager certificates list

FLAGS
     Location resource - The Cloud location to list certificates for. This
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

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager certificates list

        $ gcloud beta certificate-manager certificates list
```

### gcloud certificate-manager certificates update

```text
NAME
    gcloud certificate-manager certificates update - update a certificate

SYNOPSIS
    gcloud certificate-manager certificates update
        (CERTIFICATE : --location=LOCATION) [--description=DESCRIPTION]
        [--certificate-file=PATH_TO_FILE --private-key-file=PATH_TO_FILE]
        [--async] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates existing certificate.

EXAMPLES
    To update a certificate with name simple-cert, run:

        $ gcloud certificate-manager certificates update simple-cert \
            --description="desc" --update-labels="key=value" \
            --certificate-file=cert.pem --private-key-file=key.pem

POSITIONAL ARGUMENTS
     Certificate resource - The certificate to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument certificate on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CERTIFICATE
          ID of the certificate or fully qualified identifier for the
          certificate.

          To set the certificate attribute:
          + provide the argument certificate on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the certificate.

          To set the location attribute:
          + provide the argument certificate on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

COMMONLY USED FLAGS
     --description=DESCRIPTION
        Text description of a certificate.

     Arguments to configure self-managed certificate data.

     --certificate-file=PATH_TO_FILE
        The certificate data in PEM-encoded form. Use a full or relative path
        to a local file containing the value of certificate_file.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --private-key-file=PATH_TO_FILE
        The private key data in PEM-encoded form. Use a full or relative path
        to a local file containing the value of private_key_file.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

OTHER FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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

              $ gcloud certificate-manager certificates update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud certificate-manager certificates update --clear-labels \
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

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager certificates update

        $ gcloud beta certificate-manager certificates update
```

### gcloud beta certificate-manager certificates create

```text
NAME
    gcloud beta certificate-manager certificates create - create a certificate

SYNOPSIS
    gcloud beta certificate-manager certificates create
        (CERTIFICATE : --location=LOCATION)
        (--certificate-file=PATH_TO_FILE --private-key-file=PATH_TO_FILE
          | [--domains=[DOMAINS,...]
          : --dns-authorizations=[DNS_AUTHORIZATIONS,...]
          | --issuance-config=ISSUANCE_CONFIG]) [--description=DESCRIPTION]
        [--async] [--labels=[KEY=VALUE,...]] [--scope=SCOPE; default="DEFAULT"]
        [--tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager certificates delete

```text
NAME
    gcloud beta certificate-manager certificates delete - delete a certificate

SYNOPSIS
    gcloud beta certificate-manager certificates delete
        (CERTIFICATE : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager certificates describe

```text
NAME
    gcloud beta certificate-manager certificates describe - describe an
        existing certificate

SYNOPSIS
    gcloud beta certificate-manager certificates describe
        (CERTIFICATE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager certificates list

```text
NAME
    gcloud beta certificate-manager certificates list - list certificates

SYNOPSIS
    gcloud beta certificate-manager certificates list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta certificate-manager certificates update

```text
NAME
    gcloud beta certificate-manager certificates update - update a certificate

SYNOPSIS
    gcloud beta certificate-manager certificates update
        (CERTIFICATE : --location=LOCATION) [--description=DESCRIPTION]
        [--certificate-file=PATH_TO_FILE --private-key-file=PATH_TO_FILE]
        [--async] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager certificates create

```text
NAME
    gcloud alpha certificate-manager certificates create - create a certificate

SYNOPSIS
    gcloud alpha certificate-manager certificates create
        (CERTIFICATE : --location=LOCATION)
        (--certificate-file=PATH_TO_FILE --private-key-file=PATH_TO_FILE
          | [--domains=[DOMAINS,...]
          : --dns-authorizations=[DNS_AUTHORIZATIONS,...]
          | --issuance-config=ISSUANCE_CONFIG]) [--description=DESCRIPTION]
        [--async] [--labels=[KEY=VALUE,...]] [--scope=SCOPE; default="DEFAULT"]
        [--tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager certificates delete

```text
NAME
    gcloud alpha certificate-manager certificates delete - delete a certificate

SYNOPSIS
    gcloud alpha certificate-manager certificates delete
        (CERTIFICATE : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager certificates describe

```text
NAME
    gcloud alpha certificate-manager certificates describe - describe an
        existing certificate

SYNOPSIS
    gcloud alpha certificate-manager certificates describe
        (CERTIFICATE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager certificates list

```text
NAME
    gcloud alpha certificate-manager certificates list - list certificates

SYNOPSIS
    gcloud alpha certificate-manager certificates list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager certificates update

```text
NAME
    gcloud alpha certificate-manager certificates update - update a certificate

SYNOPSIS
    gcloud alpha certificate-manager certificates update
        (CERTIFICATE : --location=LOCATION) [--description=DESCRIPTION]
        [--certificate-file=PATH_TO_FILE --private-key-file=PATH_TO_FILE]
        [--async] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/certificate-manager/certificates (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

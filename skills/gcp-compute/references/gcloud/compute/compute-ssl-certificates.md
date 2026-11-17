---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/ssl-certificates
---

# gcloud compute ssl-certificates

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute ssl-certificates create

```text
NAME
    gcloud compute ssl-certificates create - create a Compute Engine SSL
        certificate

SYNOPSIS
    gcloud compute ssl-certificates create NAME
        (--domains=DOMAIN,[DOMAIN,...]
          | --certificate=LOCAL_FILE_PATH --private-key=LOCAL_FILE_PATH)
        [--description=DESCRIPTION] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute ssl-certificates create creates SSL certificate resources,
    which you can use in a target HTTPS or target SSL proxy. An SSL certificate
    resource consists of a certificate and private key. The private key is
    encrypted before it is stored.

    You can create either a managed or a self-managed SslCertificate resource.
    A managed SslCertificate is provisioned and renewed for you. A self-managed
    certificate is created by passing the certificate obtained from Certificate
    Authority through --certificate and --private-key flags.

EXAMPLES
    To create a self-managed certificate resource 'my-cert' from a certificate
    placed under path 'foo/cert' and a private key placed under path 'foo/pk',
    run:

        $ gcloud compute ssl-certificates create my-cert \
          --certificate=foo/cert --private-key=foo/pk

POSITIONAL ARGUMENTS
     NAME
        Name of the SSL certificate to create.

REQUIRED FLAGS
     Flags for managed or self-managed certificate.

     Exactly one of these must be specified:

       --domains=DOMAIN,[DOMAIN,...]
          List of domains to create a managed certificate for.

       Or at least one of these can be specified:

         Flags for self-managed certificate

         --certificate=LOCAL_FILE_PATH
            Path to a local certificate file to create a self-managed
            certificate. The certificate must be in PEM format. The certificate
            chain must be no greater than 5 certs long. The chain must include
            at least one intermediate cert.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --private-key=LOCAL_FILE_PATH
            Path to a local private key file. The private key must be in PEM
            format and must use RSA or ECDSA encryption.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional, textual description for the SSL certificate.

     At most one of these can be specified:

       --global
          If set, the SSL certificate is global.

       --region=REGION
          Region of the SSL certificate to create. If not specified, you might
          be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute ssl-certificates create

        $ gcloud beta compute ssl-certificates create
```

### gcloud compute ssl-certificates delete

```text
NAME
    gcloud compute ssl-certificates delete - delete Compute Engine SSL
        certificates

SYNOPSIS
    gcloud compute ssl-certificates delete NAME [NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute ssl-certificates delete deletes one or more Compute Engine
    SSL certificate resources. SSL certificates can only be deleted when no
    other resources (for example, target HTTPS proxies) refer to them.

EXAMPLES
    To delete a certificate resource 'my-cert', run:

        $ gcloud compute ssl-certificates delete my-cert

    To delete certificate resources 'my-cert1', 'my-cert2' and 'my-cert3', run:

        $ gcloud compute ssl-certificates delete my-cert1 my-cert2 my-cert3

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the SSL certificates to delete.

FLAGS
     At most one of these can be specified:

       --global
          If set, the SSL certificates are global.

       --region=REGION
          Region of the SSL certificates to delete. If not specified, you might
          be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute ssl-certificates delete

        $ gcloud beta compute ssl-certificates delete
```

### gcloud compute ssl-certificates describe

```text
NAME
    gcloud compute ssl-certificates describe - describe a Compute Engine SSL
        certificate

SYNOPSIS
    gcloud compute ssl-certificates describe NAME [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute ssl-certificates describe displays all data (except private
    keys) associated with Compute Engine SSL certificate resources in a
    project.

EXAMPLES
    To display a description of a certificate 'my-cert', run:

        $ gcloud compute ssl-certificates describe my-cert

POSITIONAL ARGUMENTS
     NAME
        Name of the SSL certificate to describe.

FLAGS
     At most one of these can be specified:

       --global
          (Default) If set, the SSL certificate is global.

       --region=REGION
          Region of the SSL certificate to describe. If not specified, you
          might be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute ssl-certificates describe

        $ gcloud beta compute ssl-certificates describe
```

### gcloud compute ssl-certificates list

```text
NAME
    gcloud compute ssl-certificates list - list Google Compute Engine SSL
        certificates

SYNOPSIS
    gcloud compute ssl-certificates list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--global | --regions=[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute ssl-certificates list displays all Google Compute Engine SSL
    certificates in a project.

    By default, global SSL certificates and SSL certificates from all regions
    are listed. The results can be narrowed down by providing the --global or
    --regions flag.

EXAMPLES
    To list all SSL certificates in a project in table form, run:

        $ gcloud compute ssl-certificates list

    To list the URIs of all SSL certificates in a project, run:

        $ gcloud compute ssl-certificates list --uri

    To list all global SSL certificates in a project, run:

        $ gcloud compute ssl-certificates list --global

    To list all SSL certificates in the us-central1 and europe-west1 regions,
    given they are regional resources, run:

        $ gcloud compute ssl-certificates list \
            --filter="region:( europe-west1 us-central1 )"

POSITIONAL ARGUMENTS
     [NAME ...]
        (DEPRECATED) If provided, show details for the specified names and/or
        URIs of resources.

        Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )"
        instead.

FLAGS
     --regexp=REGEXP, -r REGEXP
        (DEPRECATED) Regular expression to filter the names of the results on.
        Any names that do not match the entire regular expression will be
        filtered out.

        Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.

     At most one of these can be specified:

       --global
          If provided, only global resources are shown.

       --regions=[REGION,...]
          If provided, only regional resources are shown. If arguments are
          provided, only resources from the given regions are shown.

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

        $ gcloud alpha compute ssl-certificates list

        $ gcloud beta compute ssl-certificates list
```

### gcloud beta compute ssl-certificates create

```text
NAME
    gcloud beta compute ssl-certificates create - create a Compute Engine SSL
        certificate

SYNOPSIS
    gcloud beta compute ssl-certificates create NAME
        (--domains=DOMAIN,[DOMAIN,...]
          | --certificate=LOCAL_FILE_PATH --private-key=LOCAL_FILE_PATH)
        [--description=DESCRIPTION] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute ssl-certificates delete

```text
NAME
    gcloud beta compute ssl-certificates delete - delete Compute Engine SSL
        certificates

SYNOPSIS
    gcloud beta compute ssl-certificates delete NAME [NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute ssl-certificates describe

```text
NAME
    gcloud beta compute ssl-certificates describe - describe a Compute Engine
        SSL certificate

SYNOPSIS
    gcloud beta compute ssl-certificates describe NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute ssl-certificates list

```text
NAME
    gcloud beta compute ssl-certificates list - list Google Compute Engine SSL
        certificates

SYNOPSIS
    gcloud beta compute ssl-certificates list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--global | --regions=[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute ssl-certificates create

```text
NAME
    gcloud alpha compute ssl-certificates create - create a Compute Engine SSL
        certificate

SYNOPSIS
    gcloud alpha compute ssl-certificates create NAME
        (--domains=DOMAIN,[DOMAIN,...]
          | --certificate=LOCAL_FILE_PATH --private-key=LOCAL_FILE_PATH)
        [--description=DESCRIPTION] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute ssl-certificates delete

```text
NAME
    gcloud alpha compute ssl-certificates delete - delete Compute Engine SSL
        certificates

SYNOPSIS
    gcloud alpha compute ssl-certificates delete NAME [NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute ssl-certificates describe

```text
NAME
    gcloud alpha compute ssl-certificates describe - describe a Compute Engine
        SSL certificate

SYNOPSIS
    gcloud alpha compute ssl-certificates describe NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute ssl-certificates list

```text
NAME
    gcloud alpha compute ssl-certificates list - list Google Compute Engine SSL
        certificates

SYNOPSIS
    gcloud alpha compute ssl-certificates list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--global | --regions=[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute ssl-certificates test-iam-permissions

```text
NAME
    gcloud alpha compute ssl-certificates test-iam-permissions - test IAM
        permissions for a Compute Engine SSL certificate

SYNOPSIS
    gcloud alpha compute ssl-certificates test-iam-permissions NAME
        --permissions=[PERMISSION,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute ssl-certificates list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute ssl-certificates list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/ssl-certificates (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

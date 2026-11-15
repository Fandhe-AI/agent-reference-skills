---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/domain-mappings
---

# gcloud run domain-mappings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run domain-mappings create

```text
NAME
    gcloud run domain-mappings create - create domain mappings for Cloud Run
        for Anthos

SYNOPSIS
    gcloud run domain-mappings create --service=SERVICE
        (--domain=DOMAIN : --namespace=NAMESPACE) [--force-override]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create domain mappings for Cloud Run for Anthos.

    For domain mapping support with fully managed Cloud Run, use gcloud beta
    run domain-mappings create.

EXAMPLES
    To create a Cloud Run domain mapping, run:

        $ gcloud run domain-mappings create --service=myapp \
          --domain=www.example.com

REQUIRED FLAGS
     --service=SERVICE
        Create domain mapping for the given service.

     DomainMapping resource - Domain name is the ID of DomainMapping resource.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       --domain=DOMAIN
          ID of the DomainMapping or fully qualified identifier for the
          DomainMapping.

          To set the domain attribute:
          + provide the argument --domain on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --namespace=NAMESPACE
          Specific to Cloud Run for Anthos: Kubernetes namespace for the
          DomainMapping.

          To set the namespace attribute:
          + provide the argument --domain on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line;
          + set the property run/namespace;
          + For Cloud Run on Kubernetes Engine, defaults to "default".
            Otherwise, defaults to project ID.;
          + provide the argument project on the command line;
          + set the property core/project.

OPTIONAL FLAGS
     --force-override
        Map this domain even if it is already mapped to another service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run domain-mappings create

        $ gcloud beta run domain-mappings create
```

### gcloud run domain-mappings delete

```text
NAME
    gcloud run domain-mappings delete - delete domain mappings for Cloud Run
        for Anthos

SYNOPSIS
    gcloud run domain-mappings delete (--domain=DOMAIN : --namespace=NAMESPACE)
        [--[no-]async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete domain mappings for Cloud Run for Anthos.

    For domain mapping support with fully managed Cloud Run, use gcloud beta
    run domain-mappings delete.

EXAMPLES
    To delete a Cloud Run domain mapping, run:

        $ gcloud run domain-mappings delete --domain=www.example.com

REQUIRED FLAGS
     DomainMapping resource - Domain name is the ID of DomainMapping resource.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       --domain=DOMAIN
          ID of the DomainMapping or fully qualified identifier for the
          DomainMapping.

          To set the domain attribute:
          + provide the argument --domain on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --namespace=NAMESPACE
          Specific to Cloud Run for Anthos: Kubernetes namespace for the
          DomainMapping.

          To set the namespace attribute:
          + provide the argument --domain on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line;
          + set the property run/namespace;
          + For Cloud Run on Kubernetes Engine, defaults to "default".
            Otherwise, defaults to project ID.;
          + provide the argument project on the command line;
          + set the property core/project.

OPTIONAL FLAGS
     --[no-]async
        Return immediately, without waiting for the operation in progress to
        complete. Defaults to --no-async. Use --async to enable and --no-async
        to disable.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run domain-mappings delete

        $ gcloud beta run domain-mappings delete
```

### gcloud run domain-mappings describe

```text
NAME
    gcloud run domain-mappings describe - describe domain mappings for Cloud
        Run for Anthos

SYNOPSIS
    gcloud run domain-mappings describe
        (--domain=DOMAIN : --namespace=NAMESPACE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe domain mappings for Cloud Run for Anthos.

    For domain mapping support with fully managed Cloud Run, use gcloud beta
    run domain-mappings describe.

EXAMPLES
    To describe a Cloud Run domain mapping, run:

        $ gcloud run domain-mappings describe --domain=www.example.com

REQUIRED FLAGS
     DomainMapping resource - Domain name is the ID of DomainMapping resource.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       --domain=DOMAIN
          ID of the DomainMapping or fully qualified identifier for the
          DomainMapping.

          To set the domain attribute:
          + provide the argument --domain on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --namespace=NAMESPACE
          Specific to Cloud Run for Anthos: Kubernetes namespace for the
          DomainMapping.

          To set the namespace attribute:
          + provide the argument --domain on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line;
          + set the property run/namespace;
          + For Cloud Run on Kubernetes Engine, defaults to "default".
            Otherwise, defaults to project ID.;
          + provide the argument project on the command line;
          + set the property core/project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run domain-mappings describe

        $ gcloud beta run domain-mappings describe
```

### gcloud run domain-mappings list

```text
NAME
    gcloud run domain-mappings list - lists domain mappings for Cloud Run for
        Anthos

SYNOPSIS
    gcloud run domain-mappings list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists domain mappings for Cloud Run for Anthos.

    For domain mapping support with fully managed Cloud Run, use gcloud beta
    run domain-mappings list.

EXAMPLES
    To list all Cloud Run domain mappings, run:

        $ gcloud run domain-mappings list

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

        $ gcloud alpha run domain-mappings list

        $ gcloud beta run domain-mappings list
```

### gcloud beta run domain-mappings create

```text
NAME
    gcloud beta run domain-mappings create - create domain mappings

SYNOPSIS
    gcloud beta run domain-mappings create --service=SERVICE
        (--domain=DOMAIN : --namespace=NAMESPACE) [--dry-run]
        [--force-override] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run domain-mappings delete

```text
NAME
    gcloud beta run domain-mappings delete - delete domain mappings

SYNOPSIS
    gcloud beta run domain-mappings delete
        (--domain=DOMAIN : --namespace=NAMESPACE) [--[no-]async]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run domain-mappings describe

```text
NAME
    gcloud beta run domain-mappings describe - describe domain mappings

SYNOPSIS
    gcloud beta run domain-mappings describe
        (--domain=DOMAIN : --namespace=NAMESPACE) [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta run domain-mappings list

```text
NAME
    gcloud beta run domain-mappings list - lists domain mappings

SYNOPSIS
    gcloud beta run domain-mappings list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run domain-mappings create

```text
NAME
    gcloud alpha run domain-mappings create - create domain mappings

SYNOPSIS
    gcloud alpha run domain-mappings create --service=SERVICE
        (--domain=DOMAIN : --namespace=NAMESPACE) [--dry-run]
        [--force-override] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run domain-mappings delete

```text
NAME
    gcloud alpha run domain-mappings delete - delete domain mappings

SYNOPSIS
    gcloud alpha run domain-mappings delete
        (--domain=DOMAIN : --namespace=NAMESPACE) [--[no-]async]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run domain-mappings describe

```text
NAME
    gcloud alpha run domain-mappings describe - describe domain mappings

SYNOPSIS
    gcloud alpha run domain-mappings describe
        (--domain=DOMAIN : --namespace=NAMESPACE) [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run domain-mappings list

```text
NAME
    gcloud alpha run domain-mappings list - lists domain mappings

SYNOPSIS
    gcloud alpha run domain-mappings list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/domain-mappings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

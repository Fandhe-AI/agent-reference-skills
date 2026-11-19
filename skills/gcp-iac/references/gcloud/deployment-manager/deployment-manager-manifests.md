---
source: https://docs.cloud.google.com/sdk/gcloud/reference/deployment-manager/manifests
---

# gcloud deployment-manager manifests

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud deployment-manager manifests describe

```text
NAME
    gcloud deployment-manager manifests describe - provide information about a
        manifest

SYNOPSIS
    gcloud deployment-manager manifests describe [MANIFEST]
        --deployment=DEPLOYMENT [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command prints out all available details about a manifest.

EXAMPLES
    To display information about a manifest, run:

        $ gcloud deployment-manager manifests describe \
            --deployment=my-deployment manifest-name

    To display information about the latest manifest, run:

        $ gcloud deployment-manager manifests describe \
            --deployment=my-deployment

POSITIONAL ARGUMENTS
     [MANIFEST]
        Manifest name.

REQUIRED FLAGS
     --deployment=DEPLOYMENT
        Deployment name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha deployment-manager manifests describe

        $ gcloud beta deployment-manager manifests describe
```

### gcloud deployment-manager manifests list

```text
NAME
    gcloud deployment-manager manifests list - list manifests in a deployment

SYNOPSIS
    gcloud deployment-manager manifests list --deployment=DEPLOYMENT
        [--simple-list] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Prints a table with summary information on all manifests in the deployment.

EXAMPLES
    To print out a list of manifests in a deployment, run:

        $ gcloud deployment-manager manifests list --deployment=my-deployment

    To print only the name of each manifest, run:

        $ gcloud deployment-manager manifests list \
            --deployment=my-deployment --simple-list

REQUIRED FLAGS
     --deployment=DEPLOYMENT
        Deployment name.

FLAGS
     --simple-list
        Changes the --format flag to print the resource IDs. Otherwise either
        the --format value or the default format is used.

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

        $ gcloud alpha deployment-manager manifests list

        $ gcloud beta deployment-manager manifests list
```

### gcloud beta deployment-manager manifests describe

```text
NAME
    gcloud beta deployment-manager manifests describe - provide information
        about a manifest

SYNOPSIS
    gcloud beta deployment-manager manifests describe [MANIFEST]
        --deployment=DEPLOYMENT [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deployment-manager manifests list

```text
NAME
    gcloud beta deployment-manager manifests list - list manifests in a
        deployment

SYNOPSIS
    gcloud beta deployment-manager manifests list --deployment=DEPLOYMENT
        [--simple-list] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager manifests describe

```text
NAME
    gcloud alpha deployment-manager manifests describe - provide information
        about a manifest

SYNOPSIS
    gcloud alpha deployment-manager manifests describe [MANIFEST]
        --deployment=DEPLOYMENT [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager manifests list

```text
NAME
    gcloud alpha deployment-manager manifests list - list manifests in a
        deployment

SYNOPSIS
    gcloud alpha deployment-manager manifests list --deployment=DEPLOYMENT
        [--simple-list] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026.", "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down. All related APIs and functions will no longer be supported." and "As of June 30, 2026, new users are blocked from enabling Google Cloud Deployment Manager V2 API or creating their first deployment."; it recommends Infrastructure Manager (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/deployment-manager/manifests (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

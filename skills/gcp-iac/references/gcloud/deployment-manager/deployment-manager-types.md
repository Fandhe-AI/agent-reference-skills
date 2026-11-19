---
source: https://docs.cloud.google.com/sdk/gcloud/reference/deployment-manager/types
---

# gcloud deployment-manager types

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud deployment-manager types list

```text
NAME
    gcloud deployment-manager types list - list types in a project

SYNOPSIS
    gcloud deployment-manager types list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Prints a list of the available resource types.

EXAMPLES
    To print out a list of all available type names, run:

        $ gcloud deployment-manager types list

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha deployment-manager types list

        $ gcloud beta deployment-manager types list
```

### gcloud beta deployment-manager types create

```text
NAME
    gcloud beta deployment-manager types create - create a type

SYNOPSIS
    gcloud beta deployment-manager types create NAME --template=TEMPLATE
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--status=STATUS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deployment-manager types delete

```text
NAME
    gcloud beta deployment-manager types delete - delete a composite type

SYNOPSIS
    gcloud beta deployment-manager types delete NAME [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deployment-manager types describe

```text
NAME
    gcloud beta deployment-manager types describe - describe a type

SYNOPSIS
    gcloud beta deployment-manager types describe NAME --provider=PROVIDER
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deployment-manager types list

```text
NAME
    gcloud beta deployment-manager types list - describe a type provider type

SYNOPSIS
    gcloud beta deployment-manager types list [--provider=PROVIDER]
        [--provider-project=PROVIDER_PROJECT] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deployment-manager types update

```text
NAME
    gcloud beta deployment-manager types update - update a composite type

SYNOPSIS
    gcloud beta deployment-manager types update NAME [--async]
        [--description=DESCRIPTION] [--remove-labels=[KEY,...]]
        [--status=STATUS] [--update-labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager types create

```text
NAME
    gcloud alpha deployment-manager types create - create a type

SYNOPSIS
    gcloud alpha deployment-manager types create NAME --template=TEMPLATE
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--status=STATUS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager types delete

```text
NAME
    gcloud alpha deployment-manager types delete - delete a composite type

SYNOPSIS
    gcloud alpha deployment-manager types delete NAME [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager types describe

```text
NAME
    gcloud alpha deployment-manager types describe - describe a type

SYNOPSIS
    gcloud alpha deployment-manager types describe NAME --provider=PROVIDER
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager types list

```text
NAME
    gcloud alpha deployment-manager types list - describe a type provider type

SYNOPSIS
    gcloud alpha deployment-manager types list [--provider=PROVIDER]
        [--provider-project=PROVIDER_PROJECT] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager types update

```text
NAME
    gcloud alpha deployment-manager types update - update a composite type

SYNOPSIS
    gcloud alpha deployment-manager types update NAME [--async]
        [--description=DESCRIPTION] [--remove-labels=[KEY,...]]
        [--status=STATUS] [--update-labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026.", "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down. All related APIs and functions will no longer be supported." and "As of June 30, 2026, new users are blocked from enabling Google Cloud Deployment Manager V2 API or creating their first deployment."; it recommends Infrastructure Manager (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/deployment-manager/types (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

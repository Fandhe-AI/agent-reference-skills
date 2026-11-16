---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/packages/resource-bundles
---

# gcloud container hub packages resource-bundles

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub packages resource-bundles create

```text
NAME
    gcloud container hub packages resource-bundles create - create Package
        Rollouts Resource Bundle

SYNOPSIS
    gcloud container hub packages resource-bundles create NAME
        [--description=DESCRIPTION] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create Package Rollouts Resource Bundle.

EXAMPLES
    To create Resource Bundle cert-manager in us-central1, run:

        $ gcloud container hub packages resource-bundles create \
             cert-manager --location=us-central1

POSITIONAL ARGUMENTS
     NAME
        Resource name.

FLAGS
     --description=DESCRIPTION
        Resource description.

     --location=LOCATION
        Google Cloud zone or region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub packages resource-bundles create

        $ gcloud beta container hub packages resource-bundles create
```

### gcloud container hub packages resource-bundles delete

```text
NAME
    gcloud container hub packages resource-bundles delete - delete Package
        Rollouts Resource Bundle

SYNOPSIS
    gcloud container hub packages resource-bundles delete NAME [--force]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete Package Rollouts Resource Bundle.

EXAMPLES
    To delete Resource Bundle cert-manager in us-central1, run:

        $ gcloud container hub packages resource-bundles delete \
             cert-manager --location=us-central1

POSITIONAL ARGUMENTS
     NAME
        Resource name.

FLAGS
     --force
        If true, force deletion of any child resources. Otherwise, attempting
        to delete a Resource Bundle with children will fail.

     --location=LOCATION
        Google Cloud zone or region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub packages resource-bundles delete

        $ gcloud beta container hub packages resource-bundles delete
```

### gcloud container hub packages resource-bundles describe

```text
NAME
    gcloud container hub packages resource-bundles describe - describe Package
        Rollouts Resource Bundle

SYNOPSIS
    gcloud container hub packages resource-bundles describe NAME
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe Package Rollouts Resource Bundle.

EXAMPLES
    To describe Resource Bundle cert-manager in us-central1, run:

        $ gcloud container hub packages resource-bundles describe \
             cert-manager --location=us-central1

POSITIONAL ARGUMENTS
     NAME
        Resource name.

FLAGS
     --location=LOCATION
        Google Cloud zone or region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub packages resource-bundles describe

        $ gcloud beta container hub packages resource-bundles describe
```

### gcloud container hub packages resource-bundles list

```text
NAME
    gcloud container hub packages resource-bundles list - list Package Rollouts
        Resource Bundles

SYNOPSIS
    gcloud container hub packages resource-bundles list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Package Rollouts Resource Bundles.

EXAMPLES
    To list Resource Bundles in us-central1, run:

        $ gcloud container hub packages resource-bundles list \
             --location=us-central1

FLAGS
     --location=LOCATION
        Google Cloud zone or region.

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

        $ gcloud alpha container hub packages resource-bundles list

        $ gcloud beta container hub packages resource-bundles list
```

### gcloud container hub packages resource-bundles releases create

```text
NAME
    gcloud container hub packages resource-bundles releases create - create
        Package Rollouts Release

SYNOPSIS
    gcloud container hub packages resource-bundles releases create
        --resource-bundle=RESOURCE_BUNDLE --source=SOURCE --version=VERSION
        [--lifecycle=LIFECYCLE] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create Package Rollouts Release.

EXAMPLES
    To create Release v1.0.0 for Resource Bundle my-bundle, run:

        $ gcloud container hub packages resource-bundles releases create \
            --version=v1.0.0 --resource-bundle=my-bundle \
            --source=<SOURCE_PATH>

    SOURCE_PATH could be a one of the following:
      o A glob pattern for manifest files, e.g. /manifests-dir/*.yaml. This
        will create a Variant for each matching file, inferring the Variant
        name from the file name, e.g. manifest-1.yaml will be used to create
        manifest-1 Variant.
      o A glob pattern for directories of manifest files, e.g.
        /manifests-dirs/*. This will create a Variant for each matching
        directory, inferring the Variant name from the directory name, e.g.
        /manifests-dirs/manifest-1 will be used to create manifest-1 Variant.
        All YAML files under /manifests-dirs/manifest-1/ folder and its
        subfolders will be used to create the Variant.

REQUIRED FLAGS
     --resource-bundle=RESOURCE_BUNDLE
        Resource Bundle name.

     --source=SOURCE
        Source file or directory to create the Release from. e.g.
        --source=manifest.yaml, --source=/manifests-dir/,
        --source=/manifests-dir/*.yaml

     --version=VERSION
        Version of the Release to create.

OPTIONAL FLAGS
     --lifecycle=LIFECYCLE
        Lifecycle of the Release.

     --location=LOCATION
        Google Cloud zone or region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub packages resource-bundles releases \
            create

        $ gcloud beta container hub packages resource-bundles releases create
```

### gcloud container hub packages resource-bundles releases delete

```text
NAME
    gcloud container hub packages resource-bundles releases delete - delete
        Package Rollouts Release

SYNOPSIS
    gcloud container hub packages resource-bundles releases delete RELEASE
        --resource-bundle=RESOURCE_BUNDLE [--force] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete Package Rollouts Release.

EXAMPLES
    To delete Release v1.0.0 of cert-manager in us-central1, run:

        $ gcloud container hub packages resource-bundles releases delete \
             v1.0.0 --location=us-central1 --resource-bundle=cert-manager

POSITIONAL ARGUMENTS
     RELEASE
        Release identifier, either a version or tag.

REQUIRED FLAGS
     --resource-bundle=RESOURCE_BUNDLE
        Resource Bundle name.

OPTIONAL FLAGS
     --force
        If true, force deletion of any child resources. Otherwise, attempting
        to delete a Release with children will fail.

     --location=LOCATION
        Google Cloud zone or region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub packages resource-bundles releases \
            delete

        $ gcloud beta container hub packages resource-bundles releases delete
```

### gcloud container hub packages resource-bundles releases describe

```text
NAME
    gcloud container hub packages resource-bundles releases describe - describe
        Package Rollouts Release

SYNOPSIS
    gcloud container hub packages resource-bundles releases describe RELEASE
        --resource-bundle=RESOURCE_BUNDLE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe Package Rollouts Release.

EXAMPLES
    To view release v1.0.0 of cert-manager in us-central1, run:

        $ gcloud container hub packages resource-bundles releases describe \
             v1.0.0 --location=us-central1 --resource-bundle=cert-manager

POSITIONAL ARGUMENTS
     RELEASE
        Release identifier, either a version or tag.

REQUIRED FLAGS
     --resource-bundle=RESOURCE_BUNDLE
        Resource Bundle name.

OPTIONAL FLAGS
     --location=LOCATION
        Google Cloud zone or region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub packages resource-bundles releases \
            describe

        $ gcloud beta container hub packages resource-bundles releases \
            describe
```

### gcloud container hub packages resource-bundles releases list

```text
NAME
    gcloud container hub packages resource-bundles releases list - list
        Releases of a Resource Bundle

SYNOPSIS
    gcloud container hub packages resource-bundles releases list
        --resource-bundle=RESOURCE_BUNDLE [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Releases of a Resource Bundle.

EXAMPLES
    To list all Releases for bundle cert-manager in us-central1, run:

        $ gcloud container hub packages resource-bundles releases list \
             --resource-bundle=cert-manager --location=us-central1

REQUIRED FLAGS
     --resource-bundle=RESOURCE_BUNDLE
        Resource Bundle name.

FLAGS
     --location=LOCATION
        Google Cloud zone or region.

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

        $ gcloud alpha container hub packages resource-bundles releases list

        $ gcloud beta container hub packages resource-bundles releases list
```

### gcloud container hub packages resource-bundles releases update

```text
NAME
    gcloud container hub packages resource-bundles releases update - update
        Package Rollouts Release

SYNOPSIS
    gcloud container hub packages resource-bundles releases update RELEASE
        --resource-bundle=RESOURCE_BUNDLE [--lifecycle=LIFECYCLE]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update Package Rollouts Release.

EXAMPLES
    To update Release v1.0.0 for Resource Bundle my-bundle in us-central1, run:

        $ gcloud container hub packages resource-bundles releases update \
             --version=v1.0.0 --resource-bundle=my-bundle \
             --lifecycle=PUBLISHED

POSITIONAL ARGUMENTS
     RELEASE
        Release identifier, either a version or tag.

REQUIRED FLAGS
     --resource-bundle=RESOURCE_BUNDLE
        Resource Bundle name.

OPTIONAL FLAGS
     --lifecycle=LIFECYCLE
        Lifecycle of the Release.

     --location=LOCATION
        Google Cloud zone or region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub packages resource-bundles releases \
            update

        $ gcloud beta container hub packages resource-bundles releases update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud container hub packages resource-bundles releases update v1.0.0 \
    --resource-bundle=my-bundle \
    --lifecycle=PUBLISHED
```

### gcloud container hub packages resource-bundles update

```text
NAME
    gcloud container hub packages resource-bundles update - update Package
        Rollouts Resource Bundle

SYNOPSIS
    gcloud container hub packages resource-bundles update NAME
        [--description=DESCRIPTION] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update Package Rollouts Resource Bundle.

EXAMPLES
    To update Resource Bundle cert-manager in us-central1, run:

        $ gcloud container hub packages resource-bundles update \
             cert-manager --location=us-central1 ...

POSITIONAL ARGUMENTS
     NAME
        Resource name.

FLAGS
     --description=DESCRIPTION
        Resource description.

     --location=LOCATION
        Google Cloud zone or region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub packages resource-bundles update

        $ gcloud beta container hub packages resource-bundles update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud container hub packages resource-bundles update cert-manager \
    --location=us-central1 \
    --description=DESCRIPTION
```

### gcloud beta container hub packages resource-bundles create

```text
NAME
    gcloud beta container hub packages resource-bundles create - create Package
        Rollouts Resource Bundle

SYNOPSIS
    gcloud beta container hub packages resource-bundles create NAME
        [--description=DESCRIPTION] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub packages resource-bundles delete

```text
NAME
    gcloud beta container hub packages resource-bundles delete - delete Package
        Rollouts Resource Bundle

SYNOPSIS
    gcloud beta container hub packages resource-bundles delete NAME [--force]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub packages resource-bundles describe

```text
NAME
    gcloud beta container hub packages resource-bundles describe - describe
        Package Rollouts Resource Bundle

SYNOPSIS
    gcloud beta container hub packages resource-bundles describe NAME
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub packages resource-bundles list

```text
NAME
    gcloud beta container hub packages resource-bundles list - list Package
        Rollouts Resource Bundles

SYNOPSIS
    gcloud beta container hub packages resource-bundles list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub packages resource-bundles releases create

```text
NAME
    gcloud beta container hub packages resource-bundles releases create -
        create Package Rollouts Release

SYNOPSIS
    gcloud beta container hub packages resource-bundles releases create
        --resource-bundle=RESOURCE_BUNDLE --source=SOURCE --version=VERSION
        [--lifecycle=LIFECYCLE] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub packages resource-bundles releases delete

```text
NAME
    gcloud beta container hub packages resource-bundles releases delete -
        delete Package Rollouts Release

SYNOPSIS
    gcloud beta container hub packages resource-bundles releases delete RELEASE
        --resource-bundle=RESOURCE_BUNDLE [--force] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub packages resource-bundles releases describe

```text
NAME
    gcloud beta container hub packages resource-bundles releases describe -
        describe Package Rollouts Release

SYNOPSIS
    gcloud beta container hub packages resource-bundles releases describe
        RELEASE --resource-bundle=RESOURCE_BUNDLE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub packages resource-bundles releases list

```text
NAME
    gcloud beta container hub packages resource-bundles releases list - list
        Releases of a Resource Bundle

SYNOPSIS
    gcloud beta container hub packages resource-bundles releases list
        --resource-bundle=RESOURCE_BUNDLE [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub packages resource-bundles releases update

```text
NAME
    gcloud beta container hub packages resource-bundles releases update -
        update Package Rollouts Release

SYNOPSIS
    gcloud beta container hub packages resource-bundles releases update RELEASE
        --resource-bundle=RESOURCE_BUNDLE [--lifecycle=LIFECYCLE]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub packages resource-bundles update

```text
NAME
    gcloud beta container hub packages resource-bundles update - update Package
        Rollouts Resource Bundle

SYNOPSIS
    gcloud beta container hub packages resource-bundles update NAME
        [--description=DESCRIPTION] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub packages resource-bundles create

```text
NAME
    gcloud alpha container hub packages resource-bundles create - create
        Package Rollouts Resource Bundle

SYNOPSIS
    gcloud alpha container hub packages resource-bundles create NAME
        [--description=DESCRIPTION] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub packages resource-bundles delete

```text
NAME
    gcloud alpha container hub packages resource-bundles delete - delete
        Package Rollouts Resource Bundle

SYNOPSIS
    gcloud alpha container hub packages resource-bundles delete NAME [--force]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub packages resource-bundles describe

```text
NAME
    gcloud alpha container hub packages resource-bundles describe - describe
        Package Rollouts Resource Bundle

SYNOPSIS
    gcloud alpha container hub packages resource-bundles describe NAME
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub packages resource-bundles list

```text
NAME
    gcloud alpha container hub packages resource-bundles list - list Package
        Rollouts Resource Bundles

SYNOPSIS
    gcloud alpha container hub packages resource-bundles list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub packages resource-bundles releases create

```text
NAME
    gcloud alpha container hub packages resource-bundles releases create -
        create Package Rollouts Release

SYNOPSIS
    gcloud alpha container hub packages resource-bundles releases create
        --resource-bundle=RESOURCE_BUNDLE --source=SOURCE --version=VERSION
        [--lifecycle=LIFECYCLE] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub packages resource-bundles releases delete

```text
NAME
    gcloud alpha container hub packages resource-bundles releases delete -
        delete Package Rollouts Release

SYNOPSIS
    gcloud alpha container hub packages resource-bundles releases delete
        RELEASE --resource-bundle=RESOURCE_BUNDLE [--force]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub packages resource-bundles releases describe

```text
NAME
    gcloud alpha container hub packages resource-bundles releases describe -
        describe Package Rollouts Release

SYNOPSIS
    gcloud alpha container hub packages resource-bundles releases describe
        RELEASE --resource-bundle=RESOURCE_BUNDLE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub packages resource-bundles releases list

```text
NAME
    gcloud alpha container hub packages resource-bundles releases list - list
        Releases of a Resource Bundle

SYNOPSIS
    gcloud alpha container hub packages resource-bundles releases list
        --resource-bundle=RESOURCE_BUNDLE [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub packages resource-bundles releases update

```text
NAME
    gcloud alpha container hub packages resource-bundles releases update -
        update Package Rollouts Release

SYNOPSIS
    gcloud alpha container hub packages resource-bundles releases update
        RELEASE --resource-bundle=RESOURCE_BUNDLE [--lifecycle=LIFECYCLE]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub packages resource-bundles update

```text
NAME
    gcloud alpha container hub packages resource-bundles update - update
        Package Rollouts Resource Bundle

SYNOPSIS
    gcloud alpha container hub packages resource-bundles update NAME
        [--description=DESCRIPTION] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the release `update` example passes the release as `--version=v1.0.0`, but the SYNOPSIS takes it as the positional `RELEASE` and has no `--version` flag (gcloud 593.0.0: "unrecognized arguments: --version=v1.0.0"); the runnable form passes `v1.0.0` as the positional argument.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the resource bundle `update` example ends with a literal `...` in place of the flags to change, which gcloud 593.0.0 rejects as an unrecognized argument; the runnable form passes `--description=DESCRIPTION`, the only field the SYNOPSIS lets `update` change.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/packages/resource-bundles (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

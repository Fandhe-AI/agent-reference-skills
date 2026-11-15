---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/folders
---

# gcloud storage folders

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage folders create

```text
NAME
    gcloud storage folders create - create folders for hierarchical namespace
        bucket

SYNOPSIS
    gcloud storage folders create URL [URL ...]
        [--additional-headers=HEADER=VALUE] [--recursive]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create folders.

EXAMPLES
    The following command creates a folder called folder/ in a bucket named
    my-bucket:

        $ gcloud storage folders create gs://my-bucket/folder/

    The following command creates all folders in the path A/B/C/D in a bucket
    named my-bucket:

        $ gcloud storage folders create \
            --recursive gs://my-bucket/folder/A/B/C/D

POSITIONAL ARGUMENTS
     URL [URL ...]
        The URLs of the folders to create.

FLAGS
     --additional-headers=HEADER=VALUE
        Includes arbitrary headers in storage API calls. Accepts a comma
        separated list of key=value pairs, e.g. header1=value1,header2=value2.
        Overrides the default storage/additional_headers property value for
        this command invocation.

     --recursive
        Recursively create all folders in a given path if they do not alraedy
        exist.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage folders create
```

### gcloud storage folders delete

```text
NAME
    gcloud storage folders delete - delete folders

SYNOPSIS
    gcloud storage folders delete URLS [URLS ...]
        [--additional-headers=HEADER=VALUE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete folders.

EXAMPLES
    The following command deletes a folder named folder in a hierarchical
    namesapce bucket called my-bucket:

        $ gcloud storage folders delete gs://my-bucket/folder/

POSITIONAL ARGUMENTS
     URLS [URLS ...]
        The URLs of the folders to delete.

FLAGS
     --additional-headers=HEADER=VALUE
        Includes arbitrary headers in storage API calls. Accepts a comma
        separated list of key=value pairs, e.g. header1=value1,header2=value2.
        Overrides the default storage/additional_headers property value for
        this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage folders delete
```

### gcloud storage folders describe

```text
NAME
    gcloud storage folders describe - describe hierarchical namesapace bucket
        folders

SYNOPSIS
    gcloud storage folders describe URL [--additional-headers=HEADER=VALUE]
        [--raw] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe hierarchical namespace bucket folders.

EXAMPLES
    The following command shows information about a folder named folder in an
    hierarchical namespace bucket called my-bucket:

        $ gcloud storage folders describe gs://my-bucket/folder/

POSITIONAL ARGUMENTS
     URL
        The URL of the folder to describe.

FLAGS
     --additional-headers=HEADER=VALUE
        Includes arbitrary headers in storage API calls. Accepts a comma
        separated list of key=value pairs, e.g. header1=value1,header2=value2.
        Overrides the default storage/additional_headers property value for
        this command invocation.

     --raw
        Shows metadata in the format returned by the API instead of
        standardizing it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage folders describe
```

### gcloud storage folders list

```text
NAME
    gcloud storage folders list - list folders

SYNOPSIS
    gcloud storage folders list URL [URL ...]
        [--additional-headers=HEADER=VALUE] [--raw] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List folders.

EXAMPLES
    The following command lists all folders in a hierarchical namespace bucket:

        $ gcloud storage folders list gs://my-bucket/

    The following command lists all folders under a parent folder:

        $ gcloud storage folders list gs://my-bucket/parent-folder/

    You can use wildcards (https://cloud.google.com/storage/docs/wildcards) to
    match multiple paths (including multiple buckets). Bucket wildcards are
    expanded to match only buckets contained in your current project. The
    following command matches folders that are stored in buckets in your
    project that begin with my-b:

        $ gcloud storage folders list gs://my-b*/

    Following is another example where we are listing all folders that begin
    with ``B'' under a given bucket:

        $ gcloud storage folders list gs://my-bucket/B*

POSITIONAL ARGUMENTS
     URL [URL ...]
        The URLs of the resources to list.

FLAGS
     --additional-headers=HEADER=VALUE
        Includes arbitrary headers in storage API calls. Accepts a comma
        separated list of key=value pairs, e.g. header1=value1,header2=value2.
        Overrides the default storage/additional_headers property value for
        this command invocation.

     --raw
        Shows metadata in the format returned by the API instead of
        standardizing it.

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
    This variant is also available:

        $ gcloud alpha storage folders list
```

### gcloud alpha storage folders create

```text
NAME
    gcloud alpha storage folders create - create folders for hierarchical
        namespace bucket

SYNOPSIS
    gcloud alpha storage folders create URL [URL ...]
        [--additional-headers=HEADER=VALUE] [--recursive]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage folders delete

```text
NAME
    gcloud alpha storage folders delete - delete folders

SYNOPSIS
    gcloud alpha storage folders delete URLS [URLS ...]
        [--additional-headers=HEADER=VALUE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage folders describe

```text
NAME
    gcloud alpha storage folders describe - describe hierarchical namesapace
        bucket folders

SYNOPSIS
    gcloud alpha storage folders describe URL
        [--additional-headers=HEADER=VALUE] [--raw] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage folders list

```text
NAME
    gcloud alpha storage folders list - list folders

SYNOPSIS
    gcloud alpha storage folders list URL [URL ...]
        [--additional-headers=HEADER=VALUE] [--raw] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/folders (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

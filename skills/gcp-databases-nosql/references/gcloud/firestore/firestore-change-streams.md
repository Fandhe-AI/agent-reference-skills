---
source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/change-streams
---

# gcloud firestore change-streams

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud firestore change-streams create

```text
NAME
    gcloud firestore change-streams create - create a Cloud Firestore change
        stream

SYNOPSIS
    gcloud firestore change-streams create CHANGE_STREAM
        (--collection-group-scope=COLLECTION_GROUP_ID | --database-scope)
        [--database=DATABASE; default="(default)"]
        [--retention=RETENTION; default="7d"] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To create a database-scoped change stream named my-stream in database
    my-db:

        $ gcloud firestore change-streams create my-stream \
          --database=my-db --database-scope

    To create a collection-group-scoped change stream named my-cg-stream for
    collection group my-cg in database my-db with a retention period of 1 day:

        $ gcloud firestore change-streams create my-cg-stream \
          --database=my-db --collection-group-scope=my-cg --retention=1d

POSITIONAL ARGUMENTS
     CHANGE_STREAM
        The ID of the change stream.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --collection-group-scope=COLLECTION_GROUP_ID
          Create a collection-group-scoped change stream for the specified
          collection group (e.g.,
          --collection-group-scope=my-collection-group).

       --database-scope
          Create a database-scoped change stream.

OPTIONAL FLAGS
     --database=DATABASE; default="(default)"
        The database to operate on. The default value is (default).

        For example, to operate on database foo:

            $ gcloud firestore change-streams create --database='foo'

     --retention=RETENTION; default="7d"
        The retention period of the change stream (e.g. 1d, 7d). Must be
        between 1 and 7 days, in day granularity. Default is 7d.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore change-streams create

        $ gcloud beta firestore change-streams create
```

### gcloud firestore change-streams delete

```text
NAME
    gcloud firestore change-streams delete - delete a Cloud Firestore change
        stream

SYNOPSIS
    gcloud firestore change-streams delete CHANGE_STREAM --database=DATABASE
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To delete a change stream named my-stream in database my-db:

        $ gcloud firestore change-streams delete my-stream --database=my-db

POSITIONAL ARGUMENTS
     CHANGE_STREAM
        The ID of the change stream.

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore change-streams delete --database='foo'

OPTIONAL FLAGS
     --etag=ETAG
        The current etag of the change stream. If an etag is provided and does
        not match the current etag of the change stream, deletion will be
        blocked and a FAILED_PRECONDITION error will be returned.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore change-streams delete

        $ gcloud beta firestore change-streams delete
```

### gcloud firestore change-streams describe

```text
NAME
    gcloud firestore change-streams describe - describe a Cloud Firestore
        change stream

SYNOPSIS
    gcloud firestore change-streams describe CHANGE_STREAM --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To describe a change stream named my-stream in database my-db:

        $ gcloud firestore change-streams describe my-stream --database=my-db

POSITIONAL ARGUMENTS
     CHANGE_STREAM
        The ID of the change stream.

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore change-streams describe --database='foo'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore change-streams describe

        $ gcloud beta firestore change-streams describe
```

### gcloud firestore change-streams list

```text
NAME
    gcloud firestore change-streams list - list change streams under a
        Firestore database

SYNOPSIS
    gcloud firestore change-streams list --database=DATABASE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To list all change streams in database my-db:

        $ gcloud firestore change-streams list --database=my-db

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore change-streams list --database='foo'

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

        $ gcloud alpha firestore change-streams list

        $ gcloud beta firestore change-streams list
```

### gcloud beta firestore change-streams create

```text
NAME
    gcloud beta firestore change-streams create - create a Cloud Firestore
        change stream

SYNOPSIS
    gcloud beta firestore change-streams create CHANGE_STREAM
        (--collection-group-scope=COLLECTION_GROUP_ID | --database-scope)
        [--database=DATABASE; default="(default)"]
        [--retention=RETENTION; default="7d"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore change-streams delete

```text
NAME
    gcloud beta firestore change-streams delete - delete a Cloud Firestore
        change stream

SYNOPSIS
    gcloud beta firestore change-streams delete CHANGE_STREAM
        --database=DATABASE [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore change-streams describe

```text
NAME
    gcloud beta firestore change-streams describe - describe a Cloud Firestore
        change stream

SYNOPSIS
    gcloud beta firestore change-streams describe CHANGE_STREAM
        --database=DATABASE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore change-streams list

```text
NAME
    gcloud beta firestore change-streams list - list change streams under a
        Firestore database

SYNOPSIS
    gcloud beta firestore change-streams list --database=DATABASE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore change-streams create

```text
NAME
    gcloud alpha firestore change-streams create - create a Cloud Firestore
        change stream

SYNOPSIS
    gcloud alpha firestore change-streams create CHANGE_STREAM
        (--collection-group-scope=COLLECTION_GROUP_ID | --database-scope)
        [--database=DATABASE; default="(default)"]
        [--retention=RETENTION; default="7d"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore change-streams delete

```text
NAME
    gcloud alpha firestore change-streams delete - delete a Cloud Firestore
        change stream

SYNOPSIS
    gcloud alpha firestore change-streams delete CHANGE_STREAM
        --database=DATABASE [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore change-streams describe

```text
NAME
    gcloud alpha firestore change-streams describe - describe a Cloud Firestore
        change stream

SYNOPSIS
    gcloud alpha firestore change-streams describe CHANGE_STREAM
        --database=DATABASE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore change-streams list

```text
NAME
    gcloud alpha firestore change-streams list - list change streams under a
        Firestore database

SYNOPSIS
    gcloud alpha firestore change-streams list --database=DATABASE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/change-streams (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

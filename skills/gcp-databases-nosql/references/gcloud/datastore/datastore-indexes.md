---
source: https://docs.cloud.google.com/sdk/gcloud/reference/datastore/indexes
---

# gcloud datastore indexes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud datastore indexes cleanup

```text
NAME
    gcloud datastore indexes cleanup - remove unused datastore indexes based on
        your local index configuration

SYNOPSIS
    gcloud datastore indexes cleanup INDEX_FILE [--database=DATABASE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command removes unused datastore indexes based on your local index
    configuration. Any indexes that exist that are not in the index file will
    be removed.

EXAMPLES
    To remove unused indexes based on your local configuration, run:

        $ gcloud datastore indexes cleanup ~/myapp/index.yaml

POSITIONAL ARGUMENTS
     INDEX_FILE
        The path to your index.yaml file. For a detailed look into defining
        your index.yaml file, refer to this configuration guide:
        https://cloud.google.com/datastore/docs/tools/indexconfig#Datastore_About_index_yaml

FLAGS
     --database=DATABASE
        The database to operate on. If not specified, the CLI refers the
        (default) database by default.

        For example, to operate on database testdb:

            $ gcloud datastore indexes cleanup --database='testdb'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha datastore indexes cleanup

        $ gcloud beta datastore indexes cleanup
```

### gcloud datastore indexes create

```text
NAME
    gcloud datastore indexes create - create new datastore indexes based on
        your local index configuration

SYNOPSIS
    gcloud datastore indexes create INDEX_FILE [--database=DATABASE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create new datastore indexes based on your local index configuration. Any
    indexes in your index file that do not exist will be created.

EXAMPLES
    To create new indexes based on your local configuration, run:

        $ gcloud datastore indexes create ~/myapp/index.yaml

    Detailed information about index configuration can be found at the
    index.yaml reference
    (https://cloud.google.com/datastore/docs/tools/indexconfig).

POSITIONAL ARGUMENTS
     INDEX_FILE
        The path to your index.yaml file. For a detailed look into defining
        your index.yaml file, refer to this configuration guide:
        https://cloud.google.com/datastore/docs/tools/indexconfig#Datastore_About_index_yaml

FLAGS
     --database=DATABASE
        The database to operate on. If not specified, the CLI refers the
        (default) database by default.

        For example, to operate on database testdb:

            $ gcloud datastore indexes create --database='testdb'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha datastore indexes create

        $ gcloud beta datastore indexes create
```

### gcloud datastore indexes describe

```text
NAME
    gcloud datastore indexes describe - show details about an Cloud Datastore
        index

SYNOPSIS
    gcloud datastore indexes describe INDEX [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about an Cloud Datastore index.

EXAMPLES
    To describe the index with id exampleIndexId, run:

        $ gcloud datastore indexes describe exampleIndexId

POSITIONAL ARGUMENTS
     Index resource - The index you want to get the details of. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument index on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INDEX
          ID of the index or fully qualified identifier for the index.

          To set the index attribute:
          + provide the argument index on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datastore/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/datastore/

NOTES
    These variants are also available:

        $ gcloud alpha datastore indexes describe

        $ gcloud beta datastore indexes describe
```

### gcloud datastore indexes list

```text
NAME
    gcloud datastore indexes list - list Cloud Datastore indexes

SYNOPSIS
    gcloud datastore indexes list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Cloud Datastore indexes.

EXAMPLES
    To list all composite indexes in the database, run:

        $ gcloud datastore indexes list

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

API REFERENCE
    This command uses the datastore/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/datastore/

NOTES
    These variants are also available:

        $ gcloud alpha datastore indexes list

        $ gcloud beta datastore indexes list
```

### gcloud beta datastore indexes cleanup

```text
NAME
    gcloud beta datastore indexes cleanup - remove unused datastore indexes
        based on your local index configuration

SYNOPSIS
    gcloud beta datastore indexes cleanup INDEX_FILE [--database=DATABASE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datastore indexes create

```text
NAME
    gcloud beta datastore indexes create - create new datastore indexes based
        on your local index configuration

SYNOPSIS
    gcloud beta datastore indexes create INDEX_FILE [--database=DATABASE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datastore indexes describe

```text
NAME
    gcloud beta datastore indexes describe - show details about an Cloud
        Datastore index

SYNOPSIS
    gcloud beta datastore indexes describe INDEX [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta datastore indexes list

```text
NAME
    gcloud beta datastore indexes list - list Cloud Datastore indexes

SYNOPSIS
    gcloud beta datastore indexes list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datastore indexes cleanup

```text
NAME
    gcloud alpha datastore indexes cleanup - remove unused datastore indexes
        based on your local index configuration

SYNOPSIS
    gcloud alpha datastore indexes cleanup INDEX_FILE [--database=DATABASE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datastore indexes create

```text
NAME
    gcloud alpha datastore indexes create - create new datastore indexes based
        on your local index configuration

SYNOPSIS
    gcloud alpha datastore indexes create INDEX_FILE [--database=DATABASE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datastore indexes describe

```text
NAME
    gcloud alpha datastore indexes describe - show details about an Cloud
        Datastore index

SYNOPSIS
    gcloud alpha datastore indexes describe INDEX [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datastore indexes list

```text
NAME
    gcloud alpha datastore indexes list - list Cloud Datastore indexes

SYNOPSIS
    gcloud alpha datastore indexes list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/datastore/indexes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

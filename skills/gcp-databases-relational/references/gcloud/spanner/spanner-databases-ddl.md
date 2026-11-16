---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/databases/ddl
---

# gcloud spanner databases ddl

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner databases ddl describe

```text
NAME
    gcloud spanner databases ddl describe - describe the DDL for a Cloud
        Spanner database

SYNOPSIS
    gcloud spanner databases ddl describe (DATABASE : --instance=INSTANCE)
        [--include-proto-descriptors] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe the DDL for a Cloud Spanner database.

EXAMPLES
    To describe the DDL for a given Cloud Spanner database, run:

        $ gcloud spanner databases ddl describe my-database-id \
            --instance=my-instance-id

POSITIONAL ARGUMENTS
     Database resource - The Cloud Spanner database of which the ddl to
     describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE
          ID of the database or fully qualified identifier for the database.

          To set the database attribute:
          + provide the argument database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The Cloud Spanner instance for the database.

          To set the instance attribute:
          + provide the argument database on the command line with a fully
            specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

FLAGS
     --include-proto-descriptors
        Include debug string of proto bundle descriptors in the output. The
        output is information only and not meant to be parsed.

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

        $ gcloud alpha spanner databases ddl describe

        $ gcloud beta spanner databases ddl describe
```

### gcloud spanner databases ddl update

```text
NAME
    gcloud spanner databases ddl update - update the DDL for a Cloud Spanner
        database

SYNOPSIS
    gcloud spanner databases ddl update (DATABASE : --instance=INSTANCE)
        [--async] [--ddl=DDL] [--ddl-file=DDL_FILE]
        [--proto-descriptors-file=PROTO_DESCRIPTORS_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the DDL for a Cloud Spanner database.

EXAMPLES
    To add a column to a table in the given Cloud Spanner database, run:

        $ gcloud spanner databases ddl update my-database-id \
            --instance=my-instance-id \
            --ddl='ALTER TABLE test_table ADD COLUMN a INT64'

POSITIONAL ARGUMENTS
     Database resource - The Cloud Spanner database of which the ddl to update.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE
          ID of the database or fully qualified identifier for the database.

          To set the database attribute:
          + provide the argument database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The Cloud Spanner instance for the database.

          To set the instance attribute:
          + provide the argument database on the command line with a fully
            specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --ddl=DDL
        Semi-colon separated DDL (data definition language) statements to run
        inside the database. If a statement fails, all subsequent statements in
        the batch are automatically cancelled.

     --ddl-file=DDL_FILE
        Path of a file containing semi-colon separated DDL (data definition
        language) statements to run inside the database. If a statement fails,
        all subsequent statements in the batch are automatically cancelled. If
        --ddl_file is set, --ddl is ignored. One line comments starting with --
        are ignored.

     --proto-descriptors-file=PROTO_DESCRIPTORS_FILE
        Path of a file that contains a protobuf-serialized
        google.protobuf.FileDescriptorSet message. To generate it, install and
        run protoc with --include_imports and --descriptor_set_out.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner databases ddl update

        $ gcloud beta spanner databases ddl update
```

### gcloud beta spanner databases ddl describe

```text
NAME
    gcloud beta spanner databases ddl describe - describe the DDL for a Cloud
        Spanner database

SYNOPSIS
    gcloud beta spanner databases ddl describe (DATABASE : --instance=INSTANCE)
        [--include-proto-descriptors] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner databases ddl update

```text
NAME
    gcloud beta spanner databases ddl update - update the DDL for a Cloud
        Spanner database

SYNOPSIS
    gcloud beta spanner databases ddl update (DATABASE : --instance=INSTANCE)
        [--async] [--ddl=DDL] [--ddl-file=DDL_FILE]
        [--proto-descriptors-file=PROTO_DESCRIPTORS_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner databases ddl describe

```text
NAME
    gcloud alpha spanner databases ddl describe - describe the DDL for a Cloud
        Spanner database

SYNOPSIS
    gcloud alpha spanner databases ddl describe
        (DATABASE : --instance=INSTANCE) [--include-proto-descriptors]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner databases ddl update

```text
NAME
    gcloud alpha spanner databases ddl update - update the DDL for a Cloud
        Spanner database

SYNOPSIS
    gcloud alpha spanner databases ddl update (DATABASE : --instance=INSTANCE)
        [--async] [--ddl=DDL] [--ddl-file=DDL_FILE]
        [--proto-descriptors-file=PROTO_DESCRIPTORS_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/databases/ddl (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

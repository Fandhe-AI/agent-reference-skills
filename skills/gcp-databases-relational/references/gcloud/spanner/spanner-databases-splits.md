---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/databases/splits
---

# gcloud spanner databases splits

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner databases splits add

```text
NAME
    gcloud spanner databases splits add - add split points to a Spanner
        database

SYNOPSIS
    gcloud spanner databases splits add (DATABASE : --instance=INSTANCE)
        --splits-file=SPLITS_FILE [--initiator=INITIATOR]
        [--split-expiration-date=SPLIT_EXPIRATION_DATE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add split points to a Spanner database.

EXAMPLES
    To add split points to the given Spanner database, run:

        $ gcloud spanner databases splits add my-database-id \
            --instance=my-instance-id --splits-file=path/to/splits.txt \
            --initiator=my-initiator-string \
            --split-expiration-date=2024-08-15T15:55:10Z

POSITIONAL ARGUMENTS
     Database resource - The Cloud Spanner database on which to add split
     points. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

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

REQUIRED FLAGS
     --splits-file=SPLITS_FILE
        The path of a file containing split points to add to the database.
        Separate split points in the file with a new line. The file format is
        <ObjectType>[space]<ObjectName>[space]<Split Value>, where the
        ObjectType is one of TABLE or INDEX and the Split Value is the split
        point key. For index, the split point key is the index key with or
        without a full table key prefix.

OPTIONAL FLAGS
     --initiator=INITIATOR
        The tag to identify the initiator of the split points.

     --split-expiration-date=SPLIT_EXPIRATION_DATE
        The date when the split points become system managed and becomes
        eligible for merging. The default is 10 days from the date of creation.
        The maximum is 30 days from the date of creation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner databases splits add

        $ gcloud beta spanner databases splits add
```

### gcloud spanner databases splits list

```text
NAME
    gcloud spanner databases splits list - list split points that are added by
        a user to a Spanner database

SYNOPSIS
    gcloud spanner databases splits list (DATABASE : --instance=INSTANCE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List split points that are added by a user to a Spanner database.

EXAMPLES
    To list the user added split points of the given Spanner database, run:

        $ gcloud spanner databases splits list my-database-id \
            --instance=my-instance-id

POSITIONAL ARGUMENTS
     Database resource - The Cloud Spanner database on which to list split
     points. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner databases splits list

        $ gcloud beta spanner databases splits list
```

### gcloud beta spanner databases splits add

```text
NAME
    gcloud beta spanner databases splits add - add split points to a Spanner
        database

SYNOPSIS
    gcloud beta spanner databases splits add (DATABASE : --instance=INSTANCE)
        --splits-file=SPLITS_FILE [--initiator=INITIATOR]
        [--split-expiration-date=SPLIT_EXPIRATION_DATE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner databases splits list

```text
NAME
    gcloud beta spanner databases splits list - list split points that are
        added by a user to a Spanner database

SYNOPSIS
    gcloud beta spanner databases splits list (DATABASE : --instance=INSTANCE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner databases splits add

```text
NAME
    gcloud alpha spanner databases splits add - add split points to a Spanner
        database

SYNOPSIS
    gcloud alpha spanner databases splits add (DATABASE : --instance=INSTANCE)
        --splits-file=SPLITS_FILE [--initiator=INITIATOR]
        [--split-expiration-date=SPLIT_EXPIRATION_DATE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner databases splits list

```text
NAME
    gcloud alpha spanner databases splits list - list split points that are
        added by a user to a Spanner database

SYNOPSIS
    gcloud alpha spanner databases splits list (DATABASE : --instance=INSTANCE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/databases/splits (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

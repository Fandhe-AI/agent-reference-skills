---
source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/indexes/fields
---

# gcloud firestore indexes fields

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud firestore indexes fields describe

```text
NAME
    gcloud firestore indexes fields describe - describe the index configuration
        of the given field

SYNOPSIS
    gcloud firestore indexes fields describe
        [[FIELD] --collection-group=COLLECTION_GROUP --database=DATABASE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe the index configuration of the given field.

EXAMPLES
    The following command describes the database-wide default index settings:

        $ gcloud firestore indexes fields describe

        $ gcloud firestore indexes fields describe --database=(default)

    The following command describes the index configuration of the timestamp
    field in the Events collection group.

        $ gcloud firestore indexes fields describe timestamp \
            --collection-group=Events

POSITIONAL ARGUMENTS
     Field resource - Field to describe.

     This can be omitted to describe the database-wide default index settings.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument field on the command line with a fully specified
        name;
      * with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [FIELD]
        ID of the field or fully qualified identifier for the field.

        To set the field attribute:
        * provide the argument field on the command line;
        * .

     --collection-group=COLLECTION_GROUP
        Collection group of the field.

        To set the collection-group attribute:
        * provide the argument field on the command line with a fully
          specified name;
        * with a fully specified name;
        * provide the argument --collection-group on the command line;
        * .

     --database=DATABASE
        Database of the field.

        To set the database attribute:
        * provide the argument field on the command line with a fully
          specified name;
        * with a fully specified name;
        * provide the argument --database on the command line;
        * the default value of argument [--database] is (default).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the firestore/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/firestore

NOTES
    These variants are also available:

        $ gcloud alpha firestore indexes fields describe

        $ gcloud beta firestore indexes fields describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud firestore indexes fields describe \
    --database='(default)'
```

### gcloud firestore indexes fields list

```text
NAME
    gcloud firestore indexes fields list - list fields with non-default index
        settings

SYNOPSIS
    gcloud firestore indexes fields list
        [--collection-group=COLLECTION_GROUP --database=DATABASE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List fields that have had their index configurations exempted from the
    automatic settings. This includes the field describing the database-wide
    default index settings, unless otherwise filtered out.

EXAMPLES
    The following command lists all fields with custom index settings:

        $ gcloud firestore indexes fields list

        $ gcloud firestore indexes fields list --database=(default)

    The following command lists fields with custom index settings in the Events
    collection group:

        $ gcloud firestore indexes fields list --collection-group=Events

    The following command lists the indexes of all fields with custom index
    settings:

        $ gcloud firestore indexes fields list \
            --format="table[box](name,indexConfig.indexes:format='table[titl\
        e=INDEXES,box](fields.order.flatten(),fields.arrayConfig.flatten(),q\
        ueryScope,state)')"

FLAGS
     Collection group resource - Collection group of the index.

     This can be omitted to include fields across all collection groups. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --collection-group on the command line with a
        fully specified name;
      * provide the argument [--collection-group] on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --collection-group=COLLECTION_GROUP
        ID of the collection group or fully qualified identifier for the
        collection group.

        To set the collection-group attribute:
        * provide the argument --collection-group on the command line;
        * provide the argument [--collection-group] on the command line.

     --database=DATABASE
        Database of the collection group.

        To set the database attribute:
        * provide the argument --collection-group on the command line with a
          fully specified name;
        * provide the argument [--collection-group] on the command line with
          a fully specified name;
        * provide the argument --database on the command line;
        * the default value of argument [--database] is (default).

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
    This command uses the firestore/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/firestore

NOTES
    These variants are also available:

        $ gcloud alpha firestore indexes fields list

        $ gcloud beta firestore indexes fields list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud firestore indexes fields list \
    --database='(default)'

gcloud firestore indexes fields list \
    --format="table[box](name,indexConfig.indexes:format='table[title=INDEXES,box](fields.order.flatten(),fields.arrayConfig.flatten(),queryScope,state)')"
```

### gcloud firestore indexes fields update

```text
NAME
    gcloud firestore indexes fields update - update the index configuration of
        the given field

SYNOPSIS
    gcloud firestore indexes fields update
        (FIELD : --collection-group=COLLECTION_GROUP --database=DATABASE)
        (--clear-exemption | --disable-indexes | --index=[KEY=VALUE,...])
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the index configuration of the given field.

    This creates an exemption for the field in question, allowing one to modify
    the field's index settings and override the defaults.

EXAMPLES
    The following command creates an exemption for the timestamp field in the
    Events collection group, in which all indexes are disabled:

        $ gcloud firestore indexes fields update timestamp \
            --collection-group=Events --disable-indexes

        $ gcloud firestore indexes fields update timestamp \
            --database=(default) --collection-group=Events --disable-indexes

    The following command creates an exemption for the timestamp field in the
    Events collection group, in which the list of indexes is explicitly set to
    [ASCENDING, DESCENDING]:

        $ gcloud firestore indexes fields update timestamp \
            --collection-group=Events --index=order=ASCENDING \
            --index=order=DESCENDING

    The following command clears the exemption on the timestamp field in the
    Events collection group, so that the field will return to inheriting its
    index settings from its ancestors:

        $ gcloud firestore indexes fields update timestamp \
            --collection-group=Events --clear-exemption

POSITIONAL ARGUMENTS
     Field resource - Field to update. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument field on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FIELD
          ID of the field or fully qualified identifier for the field.

          To set the field attribute:
          + provide the argument field on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --collection-group=COLLECTION_GROUP
          Collection group of the field.

          To set the collection-group attribute:
          + provide the argument field on the command line with a fully
            specified name;
          + provide the argument --collection-group on the command line.

       --database=DATABASE
          Database of the field.

          To set the database attribute:
          + provide the argument field on the command line with a fully
            specified name;
          + provide the argument --database on the command line;
          + the default value of argument [--database] is (default).

REQUIRED FLAGS
     Exactly one of these must be specified:

       --clear-exemption
          If provided, the field's current index configuration will be reverted
          to inherit from its ancestor index configurations.

       --disable-indexes
          If provided, the field will no longer be indexed at all.

       --index=[KEY=VALUE,...]
          An index for the field.

          This flag can be repeated to provide multiple indexes. Any existing
          indexes will be overwritten with the ones provided. Any omitted
          indexes will be deleted if they currently exist.

          The following keys are allowed:

           order
              Specifies the order. Valid options are: 'ascending',
              'descending'. Exactly one of 'order' or 'array-config' must be
              specified.

           array-config
              Specifies the configuration for an array field. The only valid
              option is 'contains'. Exactly one of 'order' or 'array-config'
              must be specified.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the firestore/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/firestore

NOTES
    These variants are also available:

        $ gcloud alpha firestore indexes fields update

        $ gcloud beta firestore indexes fields update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud firestore indexes fields update timestamp \
    --database='(default)' \
    --collection-group=Events \
    --disable-indexes
```

### gcloud beta firestore indexes fields describe

```text
NAME
    gcloud beta firestore indexes fields describe - describe the index
        configuration of the given field

SYNOPSIS
    gcloud beta firestore indexes fields describe
        [[FIELD] --collection-group=COLLECTION_GROUP --database=DATABASE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore indexes fields list

```text
NAME
    gcloud beta firestore indexes fields list - list fields with non-default
        index settings

SYNOPSIS
    gcloud beta firestore indexes fields list
        [--collection-group=COLLECTION_GROUP --database=DATABASE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore indexes fields update

```text
NAME
    gcloud beta firestore indexes fields update - update the index
        configuration of the given field

SYNOPSIS
    gcloud beta firestore indexes fields update
        (FIELD : --collection-group=COLLECTION_GROUP --database=DATABASE)
        (--clear-exemption | --disable-indexes | --index=[KEY=VALUE,...])
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore indexes fields describe

```text
NAME
    gcloud alpha firestore indexes fields describe - describe the index
        configuration of the given field

SYNOPSIS
    gcloud alpha firestore indexes fields describe
        [[FIELD] --collection-group=COLLECTION_GROUP --database=DATABASE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore indexes fields list

```text
NAME
    gcloud alpha firestore indexes fields list - list fields with non-default
        index settings

SYNOPSIS
    gcloud alpha firestore indexes fields list
        [--collection-group=COLLECTION_GROUP --database=DATABASE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore indexes fields update

```text
NAME
    gcloud alpha firestore indexes fields update - update the index
        configuration of the given field

SYNOPSIS
    gcloud alpha firestore indexes fields update
        (FIELD : --collection-group=COLLECTION_GROUP --database=DATABASE)
        (--clear-exemption | --disable-indexes | --index=[KEY=VALUE,...])
        [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples pass `--database=(default)` unquoted; in bash and sh the parentheses are shell syntax, so the command fails with a syntax error before gcloud runs. The runnable form quotes the value: `--database='(default)'`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/indexes/fields (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

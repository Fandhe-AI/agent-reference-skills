---
source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/indexes/composite
---

# gcloud firestore indexes composite

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud firestore indexes composite create

```text
NAME
    gcloud firestore indexes composite create - create a new composite index

SYNOPSIS
    gcloud firestore indexes composite create
        --field-config=[array-config=ARRAY-CONFIG],[field-path=FIELD-PATH],
          [order=ORDER],
          [search-config=SEARCH-CONFIG],[vector-config=VECTOR-CONFIG]
        (--collection-group=COLLECTION_GROUP : --database=DATABASE)
        [--api-scope=API_SCOPE; default="any-api"] [--async]
        [--density=DENSITY] [--multikey]
        [--query-scope=QUERY_SCOPE; default="collection"]
        [--search-index-options=[text-language=TEXT-LANGUAGE],
          [text-language-override-field-path=TEXT-LANGUAGE-OVERRIDE-FIELD-PATH]]
        [--unique] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new composite index.

EXAMPLES
    The following command creates a composite index with fields user_id (in
    descending order) followed by timestamp (in descending order) in the Events
    collection group.

        $ gcloud firestore indexes composite create \
            --collection-group=Events \
            --field-config=field-path=user-id,order=descending \
            --field-config=field-path=timestamp,order=descending

        $ gcloud firestore indexes composite create --database=(default) \
            --collection-group=Events \
            --field-config=field-path=user-id,order=descending \
            --field-config=field-path=timestamp,order=descending

REQUIRED FLAGS
     --field-config=[array-config=ARRAY-CONFIG],[field-path=FIELD-PATH],[order=ORDER],[search-config=SEARCH-CONFIG],[vector-config=VECTOR-CONFIG]
        Required, Configuration for an index field.

         array-config
            Specifies the configuration for an array field. The only valid
            option is 'contains'. Exactly one of 'order', 'array-config', or
            'vector-config' must be specified.

         field-path
            Required, specifies the field path (e.g. address.city).

         order
            Specifies the order. Valid options are 'ascending', 'descending'.
            Exactly one of 'order', 'array-config', or 'vector-config' must be
            specified.

         search-config
            Specifies the configuration for a search field. An index definition
            must contain either only 'search-config' fields or only non
            'search-config' fields.

            The following shorthand aliases are supported instead of a full
            'search-config':
            + TEXT_TOKENIZED_MATCH_GLOBALLY: Tokenized text search with
              global matching.
            + GEO_POINT: Geo search.

            Examples:

            With alias:

                --field-config=field-path=title,search-config=TEXT_TOKENIZED_MATCH_GLOBALLY

            Text search:

                --field-config=field-path=title,search-config='{"text-spec": {"index-specs": [{"index-type": "tokenized", "match-type": "match-globally"}]}}'

            Geo search:

                --field-config=field-path=location,search-config='{"geo-spec": {"geo-json-indexing-disabled": true}}'

            With file:

                --field-config=field-path=text,search-config='/path/to/configs/search-config.json'

            For complex configurations, it is recommended to use a file.

             geo-spec
                Optional. The specification for building a geo search index for
                a field.

                 geo-json-indexing-disabled
                    Optional. Disables geoJSON indexing for the field. By
                    default, geoJSON points are indexed.

             text-spec
                Optional. The specification for building a text search index
                for a field.

                 index-specs
                    Optional. Array of specifications for how the field should
                    be indexed.

                     index-type
                        Required. How to index the text field value.

                     match-type
                        Required. How to match the text field value.

         vector-config
            Specifies the configuration for a vector field. Exactly one of
            'order', 'array-config', or 'vector-config' must be specified.

             dimension
                Required, sets dimension value.

             flat
                Sets flat value.

        Shorthand Example:

            --field-config=array-config=string,field-path=string,order=string,search-config=geo-spec={geo-json-indexing-disabled=boolean},text-spec={index-specs=[{index-type=string,match-type=string}]},vector-config={dimension=int,flat} --field-config=array-config=string,field-path=string,order=string,search-config=geo-spec={geo-json-indexing-disabled=boolean},text-spec={index-specs=[{index-type=string,match-type=string}]},vector-config={dimension=int,flat}

        JSON Example:

            --field-config='[{"array-config": "string", "field-path": "string", "order": "string", "search-config": {"geo-spec": {"geo-json-indexing-disabled": boolean}, "text-spec": {"index-specs": [{"index-type": "string", "match-type": "string"}]}}, "vector-config": {"dimension": int, "flat": {}}}]'

        File Example:

            --field-config=path_to_file.(yaml|json)

     Collection group resource - Collection group of the index. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --collection-group on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --collection-group=COLLECTION_GROUP
          ID of the collection group or fully qualified identifier for the
          collection group.

          To set the collection-group attribute:
          + provide the argument --collection-group on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --database=DATABASE
          Database of the collection group.

          To set the database attribute:
          + provide the argument --collection-group on the command line with
            a fully specified name;
          + provide the argument --database on the command line;
          + the default value of argument [--database] is (default).

OPTIONAL FLAGS
     --api-scope=API_SCOPE; default="any-api"
        Api scope the index applies to. API_SCOPE must be one of: any-api,
        datastore-mode-api, mongodb-compatible-api.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --density=DENSITY
        Density of the index. DENSITY must be one of: dense,
        density-unspecified, sparse-all, sparse-any.

     --multikey
        Optional. Whether the index is multikey. By default, the index is not
        multikey. For non-multikey indexes, none of the paths in the index
        definition reach or traverse an array, except via an explicit array
        index. For multikey indexes, at most one of the paths in the index
        definition reach or traverse an array, except via an explicit array
        index. Violations will result in errors. Note this field only applies
        to index with 'mongodb-compatible-api' ApiScope.

     --query-scope=QUERY_SCOPE; default="collection"
        Query scope the index applies to. QUERY_SCOPE must be one of:
        collection, collection-group, collection-recursive,
        query-scope-unspecified.

     --search-index-options=[text-language=TEXT-LANGUAGE],[text-language-override-field-path=TEXT-LANGUAGE-OVERRIDE-FIELD-PATH]
        Optional. Configuration options for search indexes.

         text-language
            Optional. The language to use for text search indexes. Used as the
            default language if not overridden at the document level by
            specifying the 'text-language-override-field-path'. The language is
            specified as a BCP 47 language code. For indexes with
            'mongodb-compatible-api' ApiScope: If unspecified, the default
            language is English. For indexes with 'any-api' ApiScope: If
            unspecified, the default behavior is autodetect.

         text-language-override-field-path
            Optional. The field in the document that specifies which language
            to use for that specific document. If unspecified, the language is
            taken from the 'language' document field if it exists or from
            'text-language' if it does not.

        Shorthand Example:

            --search-index-options=text-language=string,text-language-override-field-path=string

        JSON Example:

            --search-index-options='{"text-language": "string", "text-language-override-field-path": "string"}'

        File Example:

            --search-index-options=path_to_file.(yaml|json)

     --unique
        Optional. Whether it is an unique index. Unique index ensures all
        values for the indexed field(s) are unique across documents.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the firestore/v1 API.

    The index specification can be found at:
    https://firebase.google.com/docs/firestore/reference/rpc/google.firestore.admin.v1#index_1

    The full API documentation can be found at:
    https://cloud.google.com/firestore

NOTES
    These variants are also available:

        $ gcloud alpha firestore indexes composite create

        $ gcloud beta firestore indexes composite create
```

### gcloud firestore indexes composite delete

```text
NAME
    gcloud firestore indexes composite delete - delete the given composite
        index

SYNOPSIS
    gcloud firestore indexes composite delete (INDEX : --database=DATABASE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the given composite index.

EXAMPLES
    The following command deletes the composite index with ID 3421ef:

        $ gcloud firestore indexes composite delete 3421ef

        $ gcloud firestore indexes composite delete 3421ef \
            --database=(default)

POSITIONAL ARGUMENTS
     Composite index resource - Index to delete. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument index on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the collection-group attribute:
      * provide the argument index on the command line with a fully specified
        name;
      * provide the argument [--collection-group] on the command line.

     This must be specified.

       INDEX
          ID of the composite index or fully qualified identifier for the
          composite index.

          To set the index attribute:
          + provide the argument index on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --database=DATABASE
          Database of the composite index.

          To set the database attribute:
          + provide the argument index on the command line with a fully
            specified name;
          + provide the argument --database on the command line;
          + the default value of argument [--database] is (default).

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

        $ gcloud alpha firestore indexes composite delete

        $ gcloud beta firestore indexes composite delete
```

### gcloud firestore indexes composite describe

```text
NAME
    gcloud firestore indexes composite describe - describe the given composite
        index

SYNOPSIS
    gcloud firestore indexes composite describe (INDEX : --database=DATABASE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe the given composite index.

    By default, this command pretty prints a summary of the index
    specification. For the full index specification, please specify a format
    using the --format=json|yaml|text|etc. flag. For more information about
    format, run $ gcloud topic formats.

EXAMPLES
    The following command describes the composite index with ID 3421ef:

        $ gcloud firestore indexes composite describe 3421ef

        $ gcloud firestore indexes composite describe 3421ef \
            --database=(default)

POSITIONAL ARGUMENTS
     Composite index resource - Index to describe. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument index on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the collection-group attribute:
      * provide the argument index on the command line with a fully specified
        name;
      * provide the argument [--collection-group] on the command line.

     This must be specified.

       INDEX
          ID of the composite index or fully qualified identifier for the
          composite index.

          To set the index attribute:
          + provide the argument index on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --database=DATABASE
          Database of the composite index.

          To set the database attribute:
          + provide the argument index on the command line with a fully
            specified name;
          + provide the argument --database on the command line;
          + the default value of argument [--database] is (default).

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

        $ gcloud alpha firestore indexes composite describe

        $ gcloud beta firestore indexes composite describe
```

### gcloud firestore indexes composite list

```text
NAME
    gcloud firestore indexes composite list - list composite indexes

SYNOPSIS
    gcloud firestore indexes composite list [--database=DATABASE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List composite indexes.

    By default, this command pretty prints a summary of the index
    specification. For the full index specification, please specify a format
    using the --format=json|yaml|text|etc. flag. For more information about
    format, run $ gcloud topic formats.

EXAMPLES
    The following command lists all composite indexes in the database:

        $ gcloud firestore indexes composite list

        $ gcloud firestore indexes composite list --database=(default)

    The following command lists composite indexes in the Events collection
    group:

        $ gcloud firestore indexes composite list \
            --filter=COLLECTION_GROUP:Events

FLAGS
     Collection group resource - Collection group of the index. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument [--collection-group] on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the collection-group attribute:
      * provide the argument [--collection-group] on the command line.

     --database=DATABASE
        Database of the collection group.

        To set the database attribute:
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

        $ gcloud alpha firestore indexes composite list

        $ gcloud beta firestore indexes composite list
```

### gcloud beta firestore indexes composite create

```text
NAME
    gcloud beta firestore indexes composite create - create a new composite
        index

SYNOPSIS
    gcloud beta firestore indexes composite create
        --field-config=[array-config=ARRAY-CONFIG],[field-path=FIELD-PATH],
          [order=ORDER],
          [search-config=SEARCH-CONFIG],[vector-config=VECTOR-CONFIG]
        (--collection-group=COLLECTION_GROUP : --database=DATABASE)
        [--api-scope=API_SCOPE; default="any-api"] [--async]
        [--density=DENSITY] [--multikey]
        [--query-scope=QUERY_SCOPE; default="collection"]
        [--search-index-options=[text-language=TEXT-LANGUAGE],
          [text-language-override-field-path=TEXT-LANGUAGE-OVERRIDE-FIELD-PATH]]
        [--unique] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore indexes composite delete

```text
NAME
    gcloud beta firestore indexes composite delete - delete the given composite
        index

SYNOPSIS
    gcloud beta firestore indexes composite delete
        (INDEX : --database=DATABASE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore indexes composite describe

```text
NAME
    gcloud beta firestore indexes composite describe - describe the given
        composite index

SYNOPSIS
    gcloud beta firestore indexes composite describe
        (INDEX : --database=DATABASE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore indexes composite list

```text
NAME
    gcloud beta firestore indexes composite list - list composite indexes

SYNOPSIS
    gcloud beta firestore indexes composite list [--database=DATABASE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore indexes composite create

```text
NAME
    gcloud alpha firestore indexes composite create - create a new composite
        index

SYNOPSIS
    gcloud alpha firestore indexes composite create
        --field-config=[array-config=ARRAY-CONFIG],[field-path=FIELD-PATH],
          [order=ORDER],
          [search-config=SEARCH-CONFIG],[vector-config=VECTOR-CONFIG]
        (--collection-group=COLLECTION_GROUP : --database=DATABASE)
        [--api-scope=API_SCOPE; default="any-api"] [--async]
        [--density=DENSITY] [--multikey]
        [--query-scope=QUERY_SCOPE; default="collection"]
        [--search-index-options=[text-language=TEXT-LANGUAGE],
          [text-language-override-field-path=TEXT-LANGUAGE-OVERRIDE-FIELD-PATH]]
        [--unique] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore indexes composite delete

```text
NAME
    gcloud alpha firestore indexes composite delete - delete the given
        composite index

SYNOPSIS
    gcloud alpha firestore indexes composite delete
        (INDEX : --database=DATABASE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore indexes composite describe

```text
NAME
    gcloud alpha firestore indexes composite describe - describe the given
        composite index

SYNOPSIS
    gcloud alpha firestore indexes composite describe
        (INDEX : --database=DATABASE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore indexes composite list

```text
NAME
    gcloud alpha firestore indexes composite list - list composite indexes

SYNOPSIS
    gcloud alpha firestore indexes composite list [--database=DATABASE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/indexes/composite (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

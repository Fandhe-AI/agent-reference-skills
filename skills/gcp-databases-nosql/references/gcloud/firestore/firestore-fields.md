---
source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/fields
---

# gcloud firestore fields

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud firestore fields ttls list

```text
NAME
    gcloud firestore fields ttls list - list all fields used as a Time To Live
        expiration setting

SYNOPSIS
    gcloud firestore fields ttls list
        [--collection-group=COLLECTION_GROUP --database=DATABASE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List fields that give an expiration timestamp for documents in a collection
    group or kind.

EXAMPLES
    The following command lists all TTL fields for the whole database:

        $ gcloud firestore fields ttls list

FLAGS
     Collection group resource - Collection group of the ttl.

     This can be omitted to include fields across all collection groups
     (kinds). The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

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

        $ gcloud alpha firestore fields ttls list

        $ gcloud beta firestore fields ttls list
```

### gcloud firestore fields ttls update

```text
NAME
    gcloud firestore fields ttls update - update the TTL configuration of the
        given field

SYNOPSIS
    gcloud firestore fields ttls update
        (FIELD : --collection-group=COLLECTION_GROUP --database=DATABASE)
        (--disable-ttl
          | [--enable-ttl : --expiration-offset=EXPIRATION_OFFSET]) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the TTL configuration of the given field.

    This enables or disables using a field as the TTL field for its collection
    group or kind. Note that only one field can be the TTL field for a
    collection group.

EXAMPLES
    The following command sets the expiry field of the Events collection group
    (kind) to be the TTL field:

        $ gcloud firestore fields ttls update expiry \
            --collection-group=Events --enable-ttl

    The following command disables the expiry field so it is no longer the TTL
    for the Events collection group (kind):

        $ gcloud firestore fields ttls update expiry \
            --collection-group=Events --disable-ttl

    The following command sets the expiry field of the Events collection group
    (kind) to be the TTL field, with an expiration offset of one week:

        $ gcloud firestore fields ttls update expiry \
            --collection-group=Events --enable-ttl --expiration-offset=7d

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

       --disable-ttl
          Set to make this field no longer the TTL for its collection group.

       Or at least one of these can be specified:

         --enable-ttl
            Set to enable this field as the TTL for its collection group.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --expiration-offset=EXPIRATION_OFFSET
            The offset, relative to the timestamp value from the TTL-enabled
            field, used to determine the document's expiration time. If unset,
            defaults to 0.

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

        $ gcloud alpha firestore fields ttls update

        $ gcloud beta firestore fields ttls update
```

### gcloud beta firestore fields ttls list

```text
NAME
    gcloud beta firestore fields ttls list - list all fields used as a Time To
        Live expiration setting

SYNOPSIS
    gcloud beta firestore fields ttls list
        [--collection-group=COLLECTION_GROUP --database=DATABASE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore fields ttls update

```text
NAME
    gcloud beta firestore fields ttls update - update the TTL configuration of
        the given field

SYNOPSIS
    gcloud beta firestore fields ttls update
        (FIELD : --collection-group=COLLECTION_GROUP --database=DATABASE)
        (--disable-ttl
          | [--enable-ttl : --expiration-offset=EXPIRATION_OFFSET]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore fields ttls list

```text
NAME
    gcloud alpha firestore fields ttls list - list all fields used as a Time To
        Live expiration setting

SYNOPSIS
    gcloud alpha firestore fields ttls list
        [--collection-group=COLLECTION_GROUP --database=DATABASE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore fields ttls update

```text
NAME
    gcloud alpha firestore fields ttls update - update the TTL configuration of
        the given field

SYNOPSIS
    gcloud alpha firestore fields ttls update
        (FIELD : --collection-group=COLLECTION_GROUP --database=DATABASE)
        (--disable-ttl
          | [--enable-ttl : --expiration-offset=EXPIRATION_OFFSET]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/fields (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

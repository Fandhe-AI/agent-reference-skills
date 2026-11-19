---
source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/tags
---

# gcloud data-catalog tags

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud data-catalog tags create

```text
NAME
    gcloud data-catalog tags create - create a Data Catalog entry tag

SYNOPSIS
    gcloud data-catalog tags create --tag-file=TAG_FILE
        (--entry=ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        (--tag-template=TAG_TEMPLATE
          : --tag-template-location=TAG_TEMPLATE_LOCATION
          --tag-template-project=TAG_TEMPLATE_PROJECT) [--scope=SCOPE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex entries
    instead. Note that aspects - successors of tags - are part of the entry
    resource and are managed by gcloud dataplex entries command.

    Create a Data Catalog entry tag.

EXAMPLES
    Create a Data Catalog entry tag:

        $ gcloud data-catalog tags create --entry=ENTRY \
            --tag-template=TAG_TEMPLATE --tag-file=TAG_FILE

REQUIRED FLAGS
     --tag-file=TAG_FILE
        Path to a JSON or YAML file containing the tag.

        The file should contain a JSON/YAML object with a key and value for
        each field that should be set. See $ gcloud topic datetimes for
        information on how to specify timestamp fields.

        For example:

            {
              "dbl_field": 123,
              "str_field": "String",
              "bool_field": true,
              "ts_field": "1970-01-01T00:00:00.000Z",
              "enum_field": "ENUM_A",
            }

     Entry resource - Entry to attach the tag to. The arguments in this group
     can be used to specify the attributes of this resource. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument --entry on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --entry=ENTRY
          ID of the entry or fully qualified identifier for the entry.

          To set the entry attribute:
          + provide the argument --entry on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --entry-group=ENTRY_GROUP
          Entry group of the entry.

          To set the entry-group attribute:
          + provide the argument --entry on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the entry.

          To set the location attribute:
          + provide the argument --entry on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

     Tag template resource - Tag template. --tag-template-location defaults to
     the tag's location. --tag-template-project defaults to the tag's project.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       --tag-template=TAG_TEMPLATE
          ID of the tag template or fully qualified identifier for the tag
          template.

          To set the tag_template attribute:
          + provide the argument --tag-template on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --tag-template-location=TAG_TEMPLATE_LOCATION
          Location of the tag template.

          To set the location attribute:
          + provide the argument --tag-template on the command line with a
            fully specified name;
          + provide the argument --tag-template-location on the command line;
          + provide the argument --location on the command line.

       --tag-template-project=TAG_TEMPLATE_PROJECT
          Project of the tag template.

          To set the project attribute:
          + provide the argument --tag-template on the command line with a
            fully specified name;
          + provide the argument --tag-template-project on the command line;
          + provide the argument --project on the command line;
          + set the property core/project.

OPTIONAL FLAGS
     --scope=SCOPE
        Scope within the parent resource that the tag is attached to. Scopes
        allow users to attach tags to individual columns based on the parent
        resource's schema. To attach a tag to a nested column, use '.' to
        separate the column names: 'outer_column.inner_column'.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog tags create

        $ gcloud beta data-catalog tags create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud data-catalog tags create \
    --entry=ENTRY \
    --entry-group=ENTRY_GROUP \
    --location=us-central1 \
    --tag-template=TAG_TEMPLATE \
    --tag-file=TAG_FILE
```

### gcloud data-catalog tags delete

```text
NAME
    gcloud data-catalog tags delete - delete a Data Catalog entry tag

SYNOPSIS
    gcloud data-catalog tags delete
        (TAG : --entry=ENTRY --entry-group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex entries
    instead. Note that aspects - successors of tags - are part of the entry
    resource and are managed by gcloud dataplex entries command.

    Delete a Data Catalog entry tag.

EXAMPLES
    Delete a Data Catalog entry tag:

        $ gcloud data-catalog tags delete TAG

POSITIONAL ARGUMENTS
     Tag resource - Entry tag to delete. The arguments in this group can be
     used to specify the attributes of this resource. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument tag on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TAG
          ID of the tag or fully qualified identifier for the tag.

          To set the tag attribute:
          + provide the argument tag on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --entry=ENTRY
          Entry of the tag.

          To set the entry attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --entry on the command line.

       --entry-group=ENTRY_GROUP
          Entry group of the tag.

          To set the entry-group attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the tag.

          To set the location attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog tags delete

        $ gcloud beta data-catalog tags delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud data-catalog tags delete TAG \
    --entry=ENTRY \
    --entry-group=ENTRY_GROUP \
    --location=us-central1
```

### gcloud data-catalog tags list

```text
NAME
    gcloud data-catalog tags list - list Data Catalog entry tags

SYNOPSIS
    gcloud data-catalog tags list
        (--entry=ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex entries
    instead. Note that aspects - successors of tags - are part of the entry
    resource and are managed by gcloud dataplex entries command.

    List Data Catalog entry tags.

EXAMPLES
    List the tags for a Data Catalog entry:

        $ gcloud data-catalog tags list --entry=ENTRY

REQUIRED FLAGS
     Entry resource - Data Catalog entry in which to list tags. The arguments
     in this group can be used to specify the attributes of this resource. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --entry on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --entry=ENTRY
          ID of the entry or fully qualified identifier for the entry.

          To set the entry attribute:
          + provide the argument --entry on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --entry-group=ENTRY_GROUP
          Entry group of the entry.

          To set the entry-group attribute:
          + provide the argument --entry on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the entry.

          To set the location attribute:
          + provide the argument --entry on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog tags list

        $ gcloud beta data-catalog tags list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud data-catalog tags list \
    --entry=ENTRY \
    --entry-group=ENTRY_GROUP \
    --location=us-central1
```

### gcloud data-catalog tags update

```text
NAME
    gcloud data-catalog tags update - update a Data Catalog entry tag

SYNOPSIS
    gcloud data-catalog tags update
        (TAG : --entry=ENTRY --entry-group=ENTRY_GROUP --location=LOCATION)
        --tag-file=TAG_FILE
        (--tag-template=TAG_TEMPLATE
          : --tag-template-location=TAG_TEMPLATE_LOCATION
          --tag-template-project=TAG_TEMPLATE_PROJECT) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex entries
    instead. Note that aspects - successors of tags - are part of the entry
    resource and are managed by gcloud dataplex entries command.

    Update a Data Catalog entry tag. This will overwrite the current values of
    the tag.

EXAMPLES
    Update a Data Catalog entry tag:

        $ gcloud data-catalog tags update TAG --tag-template=TAG_TEMPLATE \
            --tag-file=TAG_FILE

POSITIONAL ARGUMENTS
     Tag resource - Entry tag to update. The arguments in this group can be
     used to specify the attributes of this resource. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument tag on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TAG
          ID of the tag or fully qualified identifier for the tag.

          To set the tag attribute:
          + provide the argument tag on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --entry=ENTRY
          Entry of the tag.

          To set the entry attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --entry on the command line.

       --entry-group=ENTRY_GROUP
          Entry group of the tag.

          To set the entry-group attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the tag.

          To set the location attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --tag-file=TAG_FILE
        Path to a JSON or YAML file containing the tag.

        The file should contain a JSON/YAML object with a key and value for
        each field that should be set. See $ gcloud topic datetimes for
        information on how to specify timestamp fields

        For example:

            {
              "dbl_field": 123,
              "str_field": "String",
              "bool_field": true,
              "ts_field": "1970-01-01T00:00:00.000Z",
              "enum_field": "ENUM_A",
            }

     Tag template resource - Tag template. --tag-template-location defaults to
     the tag's location. --tag-template-project defaults to the tag's project.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       --tag-template=TAG_TEMPLATE
          ID of the tag template or fully qualified identifier for the tag
          template.

          To set the tag_template attribute:
          + provide the argument --tag-template on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --tag-template-location=TAG_TEMPLATE_LOCATION
          Location of the tag template.

          To set the location attribute:
          + provide the argument --tag-template on the command line with a
            fully specified name;
          + provide the argument --tag-template-location on the command line;
          + provide the argument --location on the command line.

       --tag-template-project=TAG_TEMPLATE_PROJECT
          Project of the tag template.

          To set the project attribute:
          + provide the argument --tag-template on the command line with a
            fully specified name;
          + provide the argument --tag-template-project on the command line;
          + provide the argument --project on the command line;
          + set the property core/project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog tags update

        $ gcloud beta data-catalog tags update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud data-catalog tags update TAG \
    --entry=ENTRY \
    --entry-group=ENTRY_GROUP \
    --location=us-central1 \
    --tag-template=TAG_TEMPLATE \
    --tag-file=TAG_FILE
```

### gcloud beta data-catalog tags create

```text
NAME
    gcloud beta data-catalog tags create - create a Data Catalog entry tag

SYNOPSIS
    gcloud beta data-catalog tags create --tag-file=TAG_FILE
        (--entry=ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        (--tag-template=TAG_TEMPLATE
          : --tag-template-location=TAG_TEMPLATE_LOCATION
          --tag-template-project=TAG_TEMPLATE_PROJECT) [--scope=SCOPE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog tags delete

```text
NAME
    gcloud beta data-catalog tags delete - delete a Data Catalog entry tag

SYNOPSIS
    gcloud beta data-catalog tags delete
        (TAG : --entry=ENTRY --entry-group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog tags list

```text
NAME
    gcloud beta data-catalog tags list - list Data Catalog entry tags

SYNOPSIS
    gcloud beta data-catalog tags list
        (--entry=ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog tags update

```text
NAME
    gcloud beta data-catalog tags update - update a Data Catalog entry tag

SYNOPSIS
    gcloud beta data-catalog tags update
        (TAG : --entry=ENTRY --entry-group=ENTRY_GROUP --location=LOCATION)
        --tag-file=TAG_FILE
        (--tag-template=TAG_TEMPLATE
          : --tag-template-location=TAG_TEMPLATE_LOCATION
          --tag-template-project=TAG_TEMPLATE_PROJECT) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog tags create

```text
NAME
    gcloud alpha data-catalog tags create - create a Data Catalog entry tag

SYNOPSIS
    gcloud alpha data-catalog tags create --tag-file=TAG_FILE
        (--entry=ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        (--tag-template=TAG_TEMPLATE
          : --tag-template-location=TAG_TEMPLATE_LOCATION
          --tag-template-project=TAG_TEMPLATE_PROJECT) [--scope=SCOPE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog tags delete

```text
NAME
    gcloud alpha data-catalog tags delete - delete a Data Catalog entry tag

SYNOPSIS
    gcloud alpha data-catalog tags delete
        (TAG : --entry=ENTRY --entry-group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog tags list

```text
NAME
    gcloud alpha data-catalog tags list - list Data Catalog entry tags

SYNOPSIS
    gcloud alpha data-catalog tags list
        (--entry=ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog tags update

```text
NAME
    gcloud alpha data-catalog tags update - update a Data Catalog entry tag

SYNOPSIS
    gcloud alpha data-catalog tags update
        (TAG : --entry=ENTRY --entry-group=ENTRY_GROUP --location=LOCATION)
        --tag-file=TAG_FILE
        (--tag-template=TAG_TEMPLATE
          : --tag-template-location=TAG_TEMPLATE_LOCATION
          --tag-template-project=TAG_TEMPLATE_PROJECT) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud data-catalog tags create`: "This command is deprecated. Please use gcloud dataplex entries instead. Note that aspects - successors of tags - are part of the entry resource and are managed by gcloud dataplex entries command."; `gcloud data-catalog tags delete`: "This command is deprecated. Please use gcloud dataplex entries instead. Note that aspects - successors of tags - are part of the entry resource and are managed by gcloud dataplex entries command."; `gcloud data-catalog tags list`: "This command is deprecated. Please use gcloud dataplex entries instead. Note that aspects - successors of tags - are part of the entry resource and are managed by gcloud dataplex entries command."; `gcloud data-catalog tags update`: "This command is deprecated. Please use gcloud dataplex entries instead. Note that aspects - successors of tags - are part of the entry resource and are managed by gcloud dataplex entries command.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Deprecated: the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19). The commands on this page belong to the deprecated metadata search and cataloging features; they are still in the gcloud 593.0.0 help.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples give only the `--entry=ENTRY` placeholder; the SYNOPSIS requires `(--entry=ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)` and gcloud 593.0.0 rejects the example with "Error parsing [entry]", so the runnable form adds `--entry-group=ENTRY_GROUP --location=us-central1`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples give only the `TAG` placeholder; the SYNOPSIS requires `(TAG : --entry=ENTRY --entry-group=ENTRY_GROUP --location=LOCATION)` and gcloud 593.0.0 rejects the example with "Error parsing [tag]", so the runnable form adds `--entry=ENTRY --entry-group=ENTRY_GROUP --location=us-central1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/tags (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/entries
---

# gcloud data-catalog entries

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud data-catalog entries create

```text
NAME
    gcloud data-catalog entries create - create a Data Catalog entry

SYNOPSIS
    gcloud data-catalog entries create
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        ([--type=TYPE : --gcs-file-patterns=[GCS_FILE_PATTERNS,...]]
          | --user-specified-system=USER_SPECIFIED_SYSTEM
          ([--user-specified-type=USER_SPECIFIED_TYPE
          : --linked-resource=LINKED_RESOURCE
          --source-system-create-time=SOURCE_SYSTEM_CREATE_TIME
          --source-system-update-time=SOURCE_SYSTEM_UPDATE_TIME]))
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--fully-qualified-name=FULLY_QUALIFIED_NAME]
        [--schema=[COLUMN_NAME=COLUMN_TYPE,...]
          | --schema-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex entries
    instead.

    Create a Data Catalog entry.

EXAMPLES
    To create an entry for a Google Cloud Storage fileset, run:

        $ gcloud data-catalog entries create entry1 --location=us-central1 \
            --entry-group=group1 \
            --gcs-file-patterns="gs://bucket1/abc/*,gs://bucket1/file1" \
            --display-name="analytics data" --type=FILESET

    To create an entry for a Google Cloud Storage fileset with an inline
    schema, run:

        $ gcloud data-catalog entries create entry1 --location=us-central1 \
            --entry-group=group1 --gcs-file-patterns="gs://bucket1/*" \
            --display-name="sales data" \
            --schema="qtr=STRING,sales=FLOAT,year=STRING"

    To create an entry for a resource of a custom type, run:

        $ gcloud data-catalog entries create entry1 --location=us-central1 \
            --entry-group=group1 --display-name="sales data" \
            --linked-resource="www.resource.com" \
            --user-specified-type="type_name" \
            --user-specified-system="system_name"

    To create an entry for a Google Cloud Storage fileset with a schema from a
    file, run:

        $ gcloud data-catalog entries create entry1 --location=us-central1 \
            --entry-group=group1 --gcs-file-patterns="gs://bucket1/*" \
            --display-name="sales data" \
            --schema-from-file=/tmp/schema.json --type=FILESET

POSITIONAL ARGUMENTS
     Entry resource - Entry to create. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument entry on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY
          ID of the entry or fully qualified identifier for the entry.

          To set the entry attribute:
          + provide the argument entry on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --entry-group=ENTRY_GROUP
          Entry group of the entry.

          To set the entry-group attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the entry.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     Types can either be specified as a built-in type or described as a custom
     type.

     Exactly one of these must be specified:

       Built-in type can be specified for an entry. For types FILESET, a file
       pattern must be specified.

       --type=TYPE
          Type of the entry. TYPE must be one of: cluster, dashboard, database,
          database-schema, data-source-connection, data-stream, edge,
          entry-type-unspecified, explore, feature-group, feature-online-store,
          feature-view, fileset, graph, lake, look, model, node, routine,
          service, table, zone.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --gcs-file-patterns=[GCS_FILE_PATTERNS,...]
          Patterns to identify a set of files in Google Cloud Storage. A star
          (*) may be used at the end of a pattern to match arbitrary files
          beginning with that pattern.

          Examples of valid file patterns:
          + gs://bucket_name/* - Matches all files in 'bucket_name'.
          + gs://bucket_name/file* - Matches files prefixed by 'file' in
            'bucket_name'.
          + gs://another_bucket/a.txt - Matches 'gs://another_bucket/a.txt'.

       --user-specified-system=USER_SPECIFIED_SYSTEM
          External system from which the entry is fed. If --type is not used,
          then --user-specified-system must be provided.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       Exactly one of these must be specified:

         For externally ingested resources, --user-specified-type and
         --user-specified-system are required. Linked resource and source
         system time stamps are optional.

         --user-specified-type=USER_SPECIFIED_TYPE
            Type of the entry coming from external system. If --type is not
            used, then --user-specified-type must be provided.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --linked-resource=LINKED_RESOURCE
            Link to the resource in external system. If --type is not used,
            then --linked-resource may be provided.

         --source-system-create-time=SOURCE_SYSTEM_CREATE_TIME
            Creation timestamp of the resource in the external system. If
            --type is not used, then --source-system-create-time may be
            provided.

         --source-system-update-time=SOURCE_SYSTEM_UPDATE_TIME
            Update timestamp of the resource in the external system. If --type
            is not used, then --source-system-update-time may be provided.

OPTIONAL FLAGS
     --description=DESCRIPTION
        Textual description of the entry.

     --display-name=DISPLAY_NAME
        Human-readable name for the entry.

     --fully-qualified-name=FULLY_QUALIFIED_NAME
        Fully qualified name of the resource.

     Column schema for the entry. A schema consists of a list of column names
     along with their types, descriptions, modes, and nested subcolumns. For
     example:

         - column: first_name
           description: First name
           mode: REQUIRED
           type: STRING
         - column: last_name
           description: Last name
           mode: REQUIRED
           type: STRING
         - column: addresses
           description: Addresses
           mode: REPEATED
           type: RECORD
           subcolumns:
           - column: city
             description: City
             mode: NULLABLE
             type: STRING
           - column: state
             description: State
             mode: NULLABLE
             type: STRING

     At most one of these can be specified:

       --schema=[COLUMN_NAME=COLUMN_TYPE,...]
          Inline schema for the entry. When specifying a schema via this
          argument, only column names and types should be provided. Column
          modes will default to NULLABLE, and column descriptions and nested
          subcolumns are not supported.

       --schema-from-file=PATH_TO_FILE
          Path to a JSON or YAML file containing the schema for the entry. This
          can be used to specify schemas with column descriptions, column modes
          other than NULLABLE, and nested subcolumns. Use a full or relative
          path to a local file containing the value of schema.

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

        $ gcloud alpha data-catalog entries create

        $ gcloud beta data-catalog entries create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud data-catalog entries create entry1 \
    --location=us-central1 \
    --entry-group=group1 \
    --gcs-file-patterns="gs://bucket1/*" \
    --display-name="sales data" \
    --schema="qtr=STRING,sales=FLOAT,year=STRING" \
    --type=FILESET
```

### gcloud data-catalog entries delete

```text
NAME
    gcloud data-catalog entries delete - delete a Data Catalog entry

SYNOPSIS
    gcloud data-catalog entries delete
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex entries
    instead.

    Delete a Data Catalog entry.

EXAMPLES
    To delete the entry 'entry1' in the group 'group1', run:

        $ gcloud data-catalog entries delete entry1 --entry-group=group1 \
            --location=us-central1

POSITIONAL ARGUMENTS
     Entry resource - Entry to delete. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument entry on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY
          ID of the entry or fully qualified identifier for the entry.

          To set the entry attribute:
          + provide the argument entry on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --entry-group=ENTRY_GROUP
          Entry group of the entry.

          To set the entry-group attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the entry.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
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

        $ gcloud alpha data-catalog entries delete

        $ gcloud beta data-catalog entries delete
```

### gcloud data-catalog entries describe

```text
NAME
    gcloud data-catalog entries describe - describe a Data Catalog entry

SYNOPSIS
    gcloud data-catalog entries describe
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex entries
    instead.

    Describe a Data Catalog entry.

EXAMPLES
    To describe the entry 'entry1' in the group 'group1', run:

        $ gcloud data-catalog entries describe entry1 --entry-group=group1 \
            --location=us-central1

POSITIONAL ARGUMENTS
     Entry resource - Entry to describe. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument entry on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY
          ID of the entry or fully qualified identifier for the entry.

          To set the entry attribute:
          + provide the argument entry on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --entry-group=ENTRY_GROUP
          Entry group of the entry.

          To set the entry-group attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the entry.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
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

        $ gcloud alpha data-catalog entries describe

        $ gcloud beta data-catalog entries describe
```

### gcloud data-catalog entries list

```text
NAME
    gcloud data-catalog entries list - list all entries in a Data Catalog entry
        group

SYNOPSIS
    gcloud data-catalog entries list
        (--entry-group=ENTRY_GROUP : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex entries
    instead.

    List all entries in a Data Catalog entry group.

EXAMPLES
    To list all entry in the group 'group1', run:

        $ gcloud data-catalog entries list --entry-group=group1 \
            --location=us-central1

REQUIRED FLAGS
     Entry group resource - The entry group to list. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --entry-group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --entry-group=ENTRY_GROUP
          ID of the entry group or fully qualified identifier for the entry
          group.

          To set the entry-group attribute:
          + provide the argument --entry-group on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          Location of the entry group.

          To set the location attribute:
          + provide the argument --entry-group on the command line with a
            fully specified name;
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

        $ gcloud alpha data-catalog entries list

        $ gcloud beta data-catalog entries list
```

### gcloud data-catalog entries lookup

```text
NAME
    gcloud data-catalog entries lookup - lookup a Data Catalog entry by its
        target name

SYNOPSIS
    gcloud data-catalog entries lookup RESOURCE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex entries
    instead.

    Lookup a Data Catalog entry by its target name.

EXAMPLES
    To lookup the entry for a Cloud Pub/Sub topic by its Google Cloud Platform
    resource name, run:

        $ gcloud data-catalog entries lookup \
            //pubsub.googleapis.com/projects/project1/topics/topic1

    To lookup the entry for a Cloud Pub/Sub topic by its SQL name, run:

        $ gcloud data-catalog entries lookup \
            'pubsub.topic.`my-project1`.topic1'

    To lookup the entry for a BigQuery table by its SQL name, run:

        $ gcloud data-catalog entries lookup \
            'bigquery.table.`my-project1`.my_dataset.my_table'

POSITIONAL ARGUMENTS
     RESOURCE
        The name of the target resource to lookup. This can be either the
        Google Cloud Platform resource name or the SQL name of a Google Cloud
        Platform resource. SQL names follow Standard SQL lexical structure:
        https://cloud.google.com/bigquery/docs/reference/standard-sql/lexical

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

        $ gcloud alpha data-catalog entries lookup

        $ gcloud beta data-catalog entries lookup
```

### gcloud data-catalog entries star

```text
NAME
    gcloud data-catalog entries star - star a Data Catalog entry

SYNOPSIS
    gcloud data-catalog entries star
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated.

    Star a Data Catalog entry.

EXAMPLES
    To star the entry 'entry1' in the group 'group1', run:

        $ gcloud data-catalog entries star entry1 --entry-group=group1 \
            --location=us-central1

POSITIONAL ARGUMENTS
     Entry resource - Entry to star. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument entry on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY
          ID of the entry or fully qualified identifier for the entry.

          To set the entry attribute:
          + provide the argument entry on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --entry-group=ENTRY_GROUP
          Entry group of the entry.

          To set the entry-group attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the entry.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
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
```

### gcloud data-catalog entries unstar

```text
NAME
    gcloud data-catalog entries unstar - unstar a Data Catalog entry

SYNOPSIS
    gcloud data-catalog entries unstar
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated.

    Unstar a Data Catalog entry.

EXAMPLES
    To unstar the entry 'entry1' in the group 'group1', run:

        $ gcloud data-catalog entries unstar entry1 --entry-group=group1 \
            --location=us-central1

POSITIONAL ARGUMENTS
     Entry resource - Entry to unstar. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument entry on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY
          ID of the entry or fully qualified identifier for the entry.

          To set the entry attribute:
          + provide the argument entry on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --entry-group=ENTRY_GROUP
          Entry group of the entry.

          To set the entry-group attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the entry.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
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
```

### gcloud data-catalog entries update

```text
NAME
    gcloud data-catalog entries update - update a Data Catalog entry

SYNOPSIS
    gcloud data-catalog entries update
        [ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION]
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--lookup-entry=RESOURCE]
        [--add-file-patterns=[PATTERN,...] --clear-file-patterns
          | --remove-file-patterns=[PATTERN,...]
          | --linked-resource=LINKED_RESOURCE
          --user-specified-system=USER_SPECIFIED_SYSTEM
          --user-specified-type=USER_SPECIFIED_TYPE]
        [--schema=[COLUMN_NAME=COLUMN_TYPE,...]
          | --schema-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex entries
    instead.

    Update a Data Catalog entry. The entry to update can either be specified
    directly, or the --lookup-entry flag may be used to update the entry
    corresponding to the lookup of the given resource.

EXAMPLES
    To update the schema of a Cloud Pub/Sub entry inline, run:

        $ gcloud data-catalog entries update entry1 --location=global \
            --entry-group=@pubsub --schema="column1=type1,column2=type2"

    To update the schema of a Cloud Pub/Sub entry from a file, run:

        $ gcloud data-catalog entries update entry1 --location=global \
            --entry-group=@pubsub --schema-from-file="/tmp/schema.json"

    To lookup the entry of a Cloud Pub/Sub topic by its SQL name and update its
    schema in one command, run:

        $ gcloud data-catalog entries update \
            --lookup-entry='pubsub.topic.`my-project1`.topic1' \
            --schema="column1=type1,column2=type2"

POSITIONAL ARGUMENTS
     Entry resource - Entry to update. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument entry on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     ENTRY
        ID of the entry or fully qualified identifier for the entry.

        To set the entry attribute:
        * provide the argument entry on the command line.

        This positional argument must be specified if any of the other
        arguments in this group are specified.

     --entry-group=ENTRY_GROUP
        Entry group of the entry.

        To set the entry-group attribute:
        * provide the argument entry on the command line with a fully
          specified name;
        * provide the argument --entry-group on the command line.

     --location=LOCATION
        Location of the entry.

        To set the location attribute:
        * provide the argument entry on the command line with a fully
          specified name;
        * provide the argument --location on the command line.

FLAGS
     --description=DESCRIPTION
        Textual description of the entry.

     --display-name=DISPLAY_NAME
        Human-readable name for the entry.

     --lookup-entry=RESOURCE
        The name of the target resource whose entry to update. This can be
        either the Google Cloud Platform resource name or the SQL name of a
        Google Cloud Platform resource. This flag allows one to update the
        entry corresponding to the lookup of the given resource, without
        needing to specify the entry directly.

     At most one of these can be specified:

       --add-file-patterns=[PATTERN,...]
          A list of file patterns to add to the current list.

       At most one of these can be specified:

         --clear-file-patterns
            If specified, clear the current list of file patterns.

         --remove-file-patterns=[PATTERN,...]
            A list of file patterns to remove from the current list.

       --linked-resource=LINKED_RESOURCE
          Link to the resource in external system. If --type is not used, then
          --linked-resource may be provided.

       --user-specified-system=USER_SPECIFIED_SYSTEM
          External system from which the entry is fed. This can be updated for
          on prem entries.

       --user-specified-type=USER_SPECIFIED_TYPE
          Type of the entry coming from external system. This can be updated
          for on prem entries.

     New column schema for the entry. A schema consists of a list of column
     names along with their types, descriptions, modes, and nested subcolumns.
     For example:

         - column: first_name
           description: First name
           mode: REQUIRED
           type: STRING
         - column: last_name
           description: Last name
           mode: REQUIRED
           type: STRING
         - column: addresses
           description: Addresses
           mode: REPEATED
           type: RECORD
           subcolumns:
           - column: city
             description: City
             mode: NULLABLE
             type: STRING
           - column: state
             description: State
             mode: NULLABLE
             type: STRING

     At most one of these can be specified:

       --schema=[COLUMN_NAME=COLUMN_TYPE,...]
          Inline schema for the entry. When specifying a schema via this
          argument, only column names and types should be provided. Column
          modes will default to NULLABLE, and column descriptions and nested
          subcolumns are not supported.

       --schema-from-file=PATH_TO_FILE
          Path to a JSON or YAML file containing the schema for the entry. This
          can be used to specify schemas with column descriptions, column modes
          other than NULLABLE, and nested subcolumns. Use a full or relative
          path to a local file containing the value of schema.

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

        $ gcloud alpha data-catalog entries update

        $ gcloud beta data-catalog entries update
```

### gcloud beta data-catalog entries create

```text
NAME
    gcloud beta data-catalog entries create - create a Data Catalog entry

SYNOPSIS
    gcloud beta data-catalog entries create
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        --gcs-file-patterns=[GCS_FILE_PATTERNS,...] [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME]
        [--schema=[COLUMN_NAME=COLUMN_TYPE,...]
          | --schema-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog entries delete

```text
NAME
    gcloud beta data-catalog entries delete - delete a Data Catalog entry

SYNOPSIS
    gcloud beta data-catalog entries delete
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog entries describe

```text
NAME
    gcloud beta data-catalog entries describe - describe a Data Catalog entry

SYNOPSIS
    gcloud beta data-catalog entries describe
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog entries list

```text
NAME
    gcloud beta data-catalog entries list - list all entries in a Data Catalog
        entry group

SYNOPSIS
    gcloud beta data-catalog entries list
        (--entry-group=ENTRY_GROUP : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog entries lookup

```text
NAME
    gcloud beta data-catalog entries lookup - lookup a Data Catalog entry by
        its target name

SYNOPSIS
    gcloud beta data-catalog entries lookup RESOURCE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog entries update

```text
NAME
    gcloud beta data-catalog entries update - update a Data Catalog entry

SYNOPSIS
    gcloud beta data-catalog entries update
        [ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION]
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--lookup-entry=RESOURCE]
        [--add-file-patterns=[PATTERN,...] --clear-file-patterns
          | --remove-file-patterns=[PATTERN,...]]
        [--schema=[COLUMN_NAME=COLUMN_TYPE,...]
          | --schema-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entries create

```text
NAME
    gcloud alpha data-catalog entries create - create a Data Catalog entry

SYNOPSIS
    gcloud alpha data-catalog entries create
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        --gcs-file-patterns=[GCS_FILE_PATTERNS,...] [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME]
        [--schema=[COLUMN_NAME=COLUMN_TYPE,...]
          | --schema-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entries delete

```text
NAME
    gcloud alpha data-catalog entries delete - delete a Data Catalog entry

SYNOPSIS
    gcloud alpha data-catalog entries delete
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entries describe

```text
NAME
    gcloud alpha data-catalog entries describe - describe a Data Catalog entry

SYNOPSIS
    gcloud alpha data-catalog entries describe
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entries list

```text
NAME
    gcloud alpha data-catalog entries list - list all entries in a Data Catalog
        entry group

SYNOPSIS
    gcloud alpha data-catalog entries list
        (--entry-group=ENTRY_GROUP : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entries lookup

```text
NAME
    gcloud alpha data-catalog entries lookup - lookup a Data Catalog entry by
        its target name

SYNOPSIS
    gcloud alpha data-catalog entries lookup RESOURCE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entries update

```text
NAME
    gcloud alpha data-catalog entries update - update a Data Catalog entry

SYNOPSIS
    gcloud alpha data-catalog entries update
        [ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION]
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--lookup-entry=RESOURCE]
        [--add-file-patterns=[PATTERN,...] --clear-file-patterns
          | --remove-file-patterns=[PATTERN,...]]
        [--schema=[COLUMN_NAME=COLUMN_TYPE,...]
          | --schema-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud data-catalog entries create`: "This command is deprecated. Please use gcloud dataplex entries instead."; `gcloud data-catalog entries delete`: "This command is deprecated. Please use gcloud dataplex entries instead."; `gcloud data-catalog entries describe`: "This command is deprecated. Please use gcloud dataplex entries instead."; `gcloud data-catalog entries list`: "This command is deprecated. Please use gcloud dataplex entries instead."; `gcloud data-catalog entries lookup`: "This command is deprecated. Please use gcloud dataplex entries instead."; `gcloud data-catalog entries star`: "This command is deprecated."; `gcloud data-catalog entries unstar`: "This command is deprecated."; `gcloud data-catalog entries update`: "This command is deprecated. Please use gcloud dataplex entries instead.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Deprecated: the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19). The commands on this page belong to the deprecated metadata search and cataloging features; they are still in the gcloud 593.0.0 help.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the first `create` example passes `--gcs-file-patterns` without `--type`; the SYNOPSIS groups them (`[--type=TYPE : --gcs-file-patterns=[GCS_FILE_PATTERNS,...]]`) and gcloud 593.0.0 rejects it with "argument --gcs-file-patterns: --type must be specified.", so the runnable form adds `--type=FILESET` as the second example does.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/entries (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

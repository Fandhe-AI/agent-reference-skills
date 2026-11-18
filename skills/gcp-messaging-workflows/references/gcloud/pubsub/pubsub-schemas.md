---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/schemas
---

# gcloud pubsub schemas

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub schemas commit

```text
NAME
    gcloud pubsub schemas commit - commit a Pub/Sub schema revision

SYNOPSIS
    gcloud pubsub schemas commit SCHEMA --type=TYPE
        (--definition=DEFINITION | --definition-file=PATH_TO_FILE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Commit a Pub/Sub schema revision.

EXAMPLES
    To commit a PROTOCOL_BUFFER schema revision called "key-schema" that
    requires exactly one-string field named "key", run:

        $ gcloud pubsub schemas commit key-schema \
            --definition="syntax = 'proto3'; message Message { optional \
        string key = 1; }" --type=protocol-buffer To commit an equivalent \
            AVRO schema revision, run:

        $ gcloud pubsub schemas commit key-schema \
            --definition="{ 'type': 'record', 'namespace': 'my.ns', 'name': \
        'KeyMsg', 'fields': [ { 'name': 'key', 'type': 'string' } ] }" \
            --type=avro

POSITIONAL ARGUMENTS
     Schema resource - Name of the schema to revise. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument schema on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SCHEMA
          ID of the schema or fully qualified identifier for the schema.

          To set the schema attribute:
          + provide the argument schema on the command line.

REQUIRED FLAGS
     --type=TYPE
        The type of the schema.

     Schema definition

     Exactly one of these must be specified:

       --definition=DEFINITION
          The new definition of the schema.

       --definition-file=PATH_TO_FILE
          File containing the new schema definition. Use a full or relative
          path to a local file containing the value of definition_file.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub schemas commit

        $ gcloud beta pubsub schemas commit
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud pubsub schemas commit key-schema \
    --definition="syntax = 'proto3'; message Message { optional string key = 1; }" \
    --type=protocol-buffer

gcloud pubsub schemas commit key-schema \
    --definition='{ "type": "record", "namespace": "my.ns", "name": "KeyMsg", "fields": [ { "name": "key", "type": "string" } ] }' \
    --type=avro
```

### gcloud pubsub schemas create

```text
NAME
    gcloud pubsub schemas create - create a Pub/Sub schema

SYNOPSIS
    gcloud pubsub schemas create SCHEMA --type=TYPE
        (--definition=DEFINITION | --definition-file=PATH_TO_FILE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Pub/Sub schema.

EXAMPLES
    To create a PROTOCOL_BUFFER schema called "key-schema" that requires
    exactly one string field named "key", run:        $ gcloud pubsub schemas create key-schema \
            --definition="syntax = 'proto3'; message Message { optional \
        string key = 1; }" --type=PROTOCOL_BUFFER

    To create an equivalent AVRO schema, run:        $ gcloud pubsub schemas create key-schema \
            --definition='{ "type": "record", "namespace": "my.ns", "name":
         "KeyMsg", "fields": [ { "name": "key", "type": "string" } ] }' \
            --type=AVRO

POSITIONAL ARGUMENTS
     Schema resource - Pub/Sub schema to create. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument schema on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SCHEMA
          ID of the schema or fully qualified identifier for the schema.

          To set the schema attribute:
          + provide the argument schema on the command line.

REQUIRED FLAGS
     --type=TYPE
        Type of the schema. TYPE must be one of: avro, protocol-buffer.

     Schema definition.

     Exactly one of these must be specified:

       --definition=DEFINITION
          Inline schema definition.

       --definition-file=PATH_TO_FILE
          File containing schema definition. Use a full or relative path to a
          local file containing the value of definition_file.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the pubsub/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/pubsub/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub schemas create

        $ gcloud beta pubsub schemas create
```

### gcloud pubsub schemas delete

```text
NAME
    gcloud pubsub schemas delete - delete a Pub/Sub schema

SYNOPSIS
    gcloud pubsub schemas delete SCHEMA [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Pub/Sub schema.

EXAMPLES
    To delete a schema called my-schema, run:

        $ gcloud pubsub schemas delete my-schema

POSITIONAL ARGUMENTS
     Schema resource - Pub/Sub schema to delete. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument schema on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SCHEMA
          ID of the schema or fully qualified identifier for the schema.

          To set the schema attribute:
          + provide the argument schema on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the pubsub/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/pubsub/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub schemas delete

        $ gcloud beta pubsub schemas delete
```

### gcloud pubsub schemas delete-revision

```text
NAME
    gcloud pubsub schemas delete-revision - delete a Pub/Sub schema revision

SYNOPSIS
    gcloud pubsub schemas delete-revision SCHEMA [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Pub/Sub schema revision.

EXAMPLES
    To roll back to an existing schema revision called "key-schema" with
    revision_id: "0a0b0c0d", run:

        $ gcloud pubsub schemas delete-revision key-schema@0a0b0c0d

POSITIONAL ARGUMENTS
     Schema resource - Name of the schema revision to delete. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument schema on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SCHEMA
          ID of the schema or fully qualified identifier for the schema.

          To set the schema attribute:
          + provide the argument schema on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub schemas delete-revision

        $ gcloud beta pubsub schemas delete-revision
```

### gcloud pubsub schemas describe

```text
NAME
    gcloud pubsub schemas describe - show details of a Pub/Sub schema

SYNOPSIS
    gcloud pubsub schemas describe SCHEMA [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of a Pub/Sub schema.

EXAMPLES
    To show details about a schema named my-schema, run:

        $ gcloud pubsub schemas describe my-schema

POSITIONAL ARGUMENTS
     Schema resource - The schema you want to describe. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument schema on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SCHEMA
          ID of the schema or fully qualified identifier for the schema.

          To set the schema attribute:
          + provide the argument schema on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the pubsub/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/pubsub/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub schemas describe

        $ gcloud beta pubsub schemas describe
```

### gcloud pubsub schemas list

```text
NAME
    gcloud pubsub schemas list - list Pub/Sub schemas

SYNOPSIS
    gcloud pubsub schemas list [--view=VIEW; default="basic"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Pub/Sub schemas.

EXAMPLES
    To list the schemas, run:

        $ gcloud pubsub schemas list

FLAGS
     --view=VIEW; default="basic"
        There are two possible views, 'basic' and 'full', default is 'basic'.
        VIEW must be one of:

         basic
            Include the name and type of the schema, but not the definition.

         full
            Include all Schema object fields.

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
    This command uses the pubsub/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/pubsub/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub schemas list

        $ gcloud beta pubsub schemas list
```

### gcloud pubsub schemas list-revisions

```text
NAME
    gcloud pubsub schemas list-revisions - list revisions of a Pub/Sub schema

SYNOPSIS
    gcloud pubsub schemas list-revisions SCHEMA [--view=VIEW; default="basic"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List revisions of a Pub/Sub schema.

EXAMPLES
    To list the revisions for a schema, run:

        $ gcloud pubsub schemas list-revisions my-schema

POSITIONAL ARGUMENTS
     Schema resource - Parent Pub/Sub schema to list all contained revisions.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument schema on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SCHEMA
          ID of the schema or fully qualified identifier for the schema.

          To set the schema attribute:
          + provide the argument schema on the command line.

FLAGS
     --view=VIEW; default="basic"
        There are two possible views, 'basic' and 'full', default is 'basic'.
        VIEW must be one of:

         basic
            Include the name and type of the schema, but not the definition.

         full
            Include all Schema object fields.

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
    This command uses the pubsub/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/pubsub/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub schemas list-revisions

        $ gcloud beta pubsub schemas list-revisions
```

### gcloud pubsub schemas rollback

```text
NAME
    gcloud pubsub schemas rollback - roll back a Pub/Sub schema to a specified
        revision

SYNOPSIS
    gcloud pubsub schemas rollback SCHEMA --revision-id=REVISION_ID
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Roll back a Pub/Sub schema to a specified revision.

EXAMPLES
    To roll back to an existing schema revision called "key-schema" with
    revision_id: "0a0b0c0d", run:

        $ gcloud pubsub schemas rollback key-schema --revision-id=0a0b0c0d

POSITIONAL ARGUMENTS
     Schema resource - Name of the schema to rollback. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument schema on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SCHEMA
          ID of the schema or fully qualified identifier for the schema.

          To set the schema attribute:
          + provide the argument schema on the command line.

REQUIRED FLAGS
     --revision-id=REVISION_ID
        The revision to roll back to.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha pubsub schemas rollback

        $ gcloud beta pubsub schemas rollback
```

### gcloud pubsub schemas validate-message

```text
NAME
    gcloud pubsub schemas validate-message - validate a message against a
        Pub/Sub schema

SYNOPSIS
    gcloud pubsub schemas validate-message --message=MESSAGE
        --message-encoding=MESSAGE_ENCODING
        (--schema-name=SCHEMA_NAME | --type=TYPE (--definition=DEFINITION
          | --definition-file=PATH_TO_FILE)) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Validate a message against a Pub/Sub schema.

EXAMPLES
    To validate message against provided PROTOCOL_BUFFER schema, run:

        $ gcloud pubsub schemas validate-message --message="{\"key\": \
            \"my-key\"}" --message-encoding=JSON --definition="syntax = \
            'proto3'; message Message { optional string key = 1; \
            }" --type=PROTOCOL_BUFFER

    To validate an equivalent AVRO schema, run:

        $ gcloud pubsub schemas validate-message \
            --definition='{ "type": "record", "namespace": "my.ns", "name":
         "KeyMsg", "fields": [ { "name": "key", "type": "string" } ] }' \
            --type=AVRO

REQUIRED FLAGS
     --message=MESSAGE
        The message to validate against the schema.

     --message-encoding=MESSAGE_ENCODING
        The encoding of the message. MESSAGE_ENCODING must be one of: binary,
        json.

     Schema definition.

     Exactly one of these must be specified:

       --schema-name=SCHEMA_NAME
          Name or full path of an existing schema.

       Or at least one of these can be specified:

         --type=TYPE
            Type of the schema. TYPE must be one of: avro, protocol-buffer.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         Schema specification.

         Exactly one of these must be specified:

           --definition=DEFINITION
              Inline schema definition.

           --definition-file=PATH_TO_FILE
              File containing schema definition. Use a full or relative path to
              a local file containing the value of definition_file.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the pubsub/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/pubsub/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub schemas validate-message

        $ gcloud beta pubsub schemas validate-message
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud pubsub schemas validate-message \
    --message='{"key": "my-key"}' \
    --message-encoding=JSON \
    --definition='{ "type": "record", "namespace": "my.ns", "name": "KeyMsg", "fields": [ { "name": "key", "type": "string" } ] }' \
    --type=AVRO
```

### gcloud pubsub schemas validate-schema

```text
NAME
    gcloud pubsub schemas validate-schema - validate a Pub/Sub schema

SYNOPSIS
    gcloud pubsub schemas validate-schema --type=TYPE
        (--definition=DEFINITION | --definition-file=PATH_TO_FILE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Validate a new Pub/Sub schema.

EXAMPLES
    To validate a PROTOCOL_BUFFER schema, run:

        $ gcloud pubsub schemas validate-schema \
            --definition="syntax = 'proto3'; message Message { optional \
        string key = 1; }" --type=PROTOCOL_BUFFER

    To validate an equivalent AVRO schema, run:

        $ gcloud pubsub schemas validate-schema \
            --definition='{ "type": "record", "namespace": "my.ns", "name":
         "KeyMsg", "fields": [ { "name": "key", "type": "string" } ] }' \
            --type=AVRO

REQUIRED FLAGS
     --type=TYPE
        Type of the schema. TYPE must be one of: avro, protocol-buffer.

     Schema definition.

     Exactly one of these must be specified:

       --definition=DEFINITION
          Inline schema definition.

       --definition-file=PATH_TO_FILE
          File containing schema definition. Use a full or relative path to a
          local file containing the value of definition_file.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the pubsub/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/pubsub/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub schemas validate-schema

        $ gcloud beta pubsub schemas validate-schema
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud pubsub schemas validate-schema \
    --definition='{ "type": "record", "namespace": "my.ns", "name": "KeyMsg", "fields": [ { "name": "key", "type": "string" } ] }' \
    --type=AVRO
```

### gcloud beta pubsub schemas commit

```text
NAME
    gcloud beta pubsub schemas commit - commit a Pub/Sub schema revision

SYNOPSIS
    gcloud beta pubsub schemas commit SCHEMA --type=TYPE
        (--definition=DEFINITION | --definition-file=PATH_TO_FILE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub schemas create

```text
NAME
    gcloud beta pubsub schemas create - create a Pub/Sub schema

SYNOPSIS
    gcloud beta pubsub schemas create SCHEMA --type=TYPE
        (--definition=DEFINITION | --definition-file=PATH_TO_FILE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub schemas delete

```text
NAME
    gcloud beta pubsub schemas delete - delete a Pub/Sub schema

SYNOPSIS
    gcloud beta pubsub schemas delete SCHEMA [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub schemas delete-revision

```text
NAME
    gcloud beta pubsub schemas delete-revision - delete a Pub/Sub schema
        revision

SYNOPSIS
    gcloud beta pubsub schemas delete-revision SCHEMA [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub schemas describe

```text
NAME
    gcloud beta pubsub schemas describe - show details of a Pub/Sub schema

SYNOPSIS
    gcloud beta pubsub schemas describe SCHEMA [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub schemas list

```text
NAME
    gcloud beta pubsub schemas list - list Pub/Sub schemas

SYNOPSIS
    gcloud beta pubsub schemas list [--view=VIEW; default="basic"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub schemas list-revisions

```text
NAME
    gcloud beta pubsub schemas list-revisions - list revisions of a Pub/Sub
        schema

SYNOPSIS
    gcloud beta pubsub schemas list-revisions SCHEMA
        [--view=VIEW; default="basic"] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub schemas rollback

```text
NAME
    gcloud beta pubsub schemas rollback - roll back a Pub/Sub schema to a
        specified revision

SYNOPSIS
    gcloud beta pubsub schemas rollback SCHEMA --revision-id=REVISION_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub schemas validate-message

```text
NAME
    gcloud beta pubsub schemas validate-message - validate a message against a
        Pub/Sub schema

SYNOPSIS
    gcloud beta pubsub schemas validate-message --message=MESSAGE
        --message-encoding=MESSAGE_ENCODING
        (--schema-name=SCHEMA_NAME | --type=TYPE (--definition=DEFINITION
          | --definition-file=PATH_TO_FILE)) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub schemas validate-schema

```text
NAME
    gcloud beta pubsub schemas validate-schema - validate a Pub/Sub schema

SYNOPSIS
    gcloud beta pubsub schemas validate-schema --type=TYPE
        (--definition=DEFINITION | --definition-file=PATH_TO_FILE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub schemas commit

```text
NAME
    gcloud alpha pubsub schemas commit - commit a Pub/Sub schema revision

SYNOPSIS
    gcloud alpha pubsub schemas commit SCHEMA --type=TYPE
        (--definition=DEFINITION | --definition-file=PATH_TO_FILE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub schemas create

```text
NAME
    gcloud alpha pubsub schemas create - create a Pub/Sub schema

SYNOPSIS
    gcloud alpha pubsub schemas create SCHEMA --type=TYPE
        (--definition=DEFINITION | --definition-file=PATH_TO_FILE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub schemas delete

```text
NAME
    gcloud alpha pubsub schemas delete - delete a Pub/Sub schema

SYNOPSIS
    gcloud alpha pubsub schemas delete SCHEMA [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub schemas delete-revision

```text
NAME
    gcloud alpha pubsub schemas delete-revision - delete a Pub/Sub schema
        revision

SYNOPSIS
    gcloud alpha pubsub schemas delete-revision SCHEMA [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub schemas describe

```text
NAME
    gcloud alpha pubsub schemas describe - show details of a Pub/Sub schema

SYNOPSIS
    gcloud alpha pubsub schemas describe SCHEMA [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub schemas list

```text
NAME
    gcloud alpha pubsub schemas list - list Pub/Sub schemas

SYNOPSIS
    gcloud alpha pubsub schemas list [--view=VIEW; default="basic"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub schemas list-revisions

```text
NAME
    gcloud alpha pubsub schemas list-revisions - list revisions of a Pub/Sub
        schema

SYNOPSIS
    gcloud alpha pubsub schemas list-revisions SCHEMA
        [--view=VIEW; default="basic"] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub schemas rollback

```text
NAME
    gcloud alpha pubsub schemas rollback - roll back a Pub/Sub schema to a
        specified revision

SYNOPSIS
    gcloud alpha pubsub schemas rollback SCHEMA --revision-id=REVISION_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub schemas validate-message

```text
NAME
    gcloud alpha pubsub schemas validate-message - validate a message against a
        Pub/Sub schema

SYNOPSIS
    gcloud alpha pubsub schemas validate-message --message=MESSAGE
        --message-encoding=MESSAGE_ENCODING
        (--schema-name=SCHEMA_NAME | --type=TYPE (--definition=DEFINITION
          | --definition-file=PATH_TO_FILE)) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub schemas validate-schema

```text
NAME
    gcloud alpha pubsub schemas validate-schema - validate a Pub/Sub schema

SYNOPSIS
    gcloud alpha pubsub schemas validate-schema --type=TYPE
        (--definition=DEFINITION | --definition-file=PATH_TO_FILE)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (the help text above is verbatim): the `delete-revision` example says `To roll back to an existing schema revision called "key-schema" with revision_id: "0a0b0c0d", run:`, but `gcloud pubsub schemas delete-revision key-schema@0a0b0c0d` deletes that revision ("delete a Pub/Sub schema revision"); to roll back to the revision, run `gcloud pubsub schemas rollback key-schema --revision-id=0a0b0c0d` (the `rollback` example on this page).
- Corrected from the official docs (runnable form only; the help text above is verbatim): in the `commit` examples `gcloud help` runs the sentence "To commit an equivalent AVRO schema revision, run:" into the first command, so it would be passed as arguments; the runnable form ends the command at `--type=protocol-buffer`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the AVRO `commit` example quotes the keys and strings of `--definition` with single quotes (`{ 'type': 'record', ... }`), which is not valid JSON; the runnable form uses the double-quoted JSON of the AVRO `validate-schema` example on this page, inside single shell quotes.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the AVRO `validate-message` example omits `--message` and `--message-encoding`, which the SYNOPSIS requires (`--message=MESSAGE --message-encoding=MESSAGE_ENCODING`; gcloud 593.0.0: "Must be specified"); the runnable form adds the same message and encoding as the PROTOCOL_BUFFER example above it (`--message="{\"key\": \"my-key\"}" --message-encoding=JSON`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/schemas (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

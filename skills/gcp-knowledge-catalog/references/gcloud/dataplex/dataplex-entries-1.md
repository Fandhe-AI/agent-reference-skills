---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/entries
---

# gcloud dataplex entries (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex entries create

```text
NAME
    gcloud dataplex entries create - create a Dataplex Entry resource

SYNOPSIS
    gcloud dataplex entries create
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        (--entry-type=ENTRY_TYPE : --entry-type-location=ENTRY_TYPE_LOCATION
          --entry-type-project=ENTRY_TYPE_PROJECT)
        [--aspects=YAML_OR_JSON_FILE]
        [--fully-qualified-name=FULLY_QUALIFIED_NAME]
        [--parent-entry=PARENT_ENTRY]
        [--entry-source-ancestors=[ANCESTORS,...]
          --entry-source-create-time=DATE_TIME
          --entry-source-description=DESCRIPTION
          --entry-source-display-name=DISPLAY_NAME
          --entry-source-labels=[KEY=VALUE,...]
          --entry-source-platform=PLATFORM_NAME
          --entry-source-resource=RESOURCE --entry-source-system=SYSTEM_NAME
          --entry-source-update-time=DATE_TIME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Dataplex Entry resource.

EXAMPLES
    To create a Dataplex entry with name my-dataplex-entry in location
    us-central1 in entry group my-entry-group and with entry type
    projects/my-project/locations/us-central1/entryTypes/my-type, run:

        $ gcloud dataplex entries create my-dataplex-entry \
            --location=us-central1 --entry_group=my-entry-group \
            --entry-type \
            projects/my-project/locations/us-central1/entryTypes/my-type

    To create a Dataplex Entry with name my-child-entry and set its parent to
    an existing entry my-parent-entry, run:

        $ gcloud dataplex entries create my-child-entry \
            --location=us-central1 --entry_group=my-entry-group \
            --entry-type \
            projects/my-project/locations/us-central1/entryTypes/my-type \
            --parent-entry \
            projects/my-project/locations/us-central1/entryGroups/\
        my-entry-group/entries/my-parent-entry

    To create a Dataplex Entry with its description, display name, ancestors,
    labels and timestamps populated in its EntrySource, run:

        $ gcloud dataplex entries create my-entry --location=us-central1 \
            --entry_group=my-entry-group \
            --entry-type \
            projects/my-project/locations/us-central1/entryTypes/my-type \
            --entry-source-description \
            'This is a description of the Entry.' \
            --entry-source-display-name 'display name' \
            --entry-source-ancestors \
            '{"type":"projects/my-project/locations/us-central1/entryTypes/s\
        ome-type",
         "name":"projects/my-project/locations/us-central1/entryGroups/my-en\
        try-group/entries/ancestor-entry"},
         {"type":"projects/my-project/locations/us-central1/entryTypes/anoth\
        er-type",
         "name":"projects/my-project/locations/us-central1/entryGroups/my-en\
        try-group/entries/another-ancestor-entry"}' \
            --entry-source-labels key1=value1,key2=value2 \
            --entry-source-create-time 2024-01-01T09:39:25.160173Z \
            --entry-source-update-time 2024-01-01T09:39:25.160173Z

    To create a Dataplex Entry reading its aspects from a YAML file, run:

        $ gcloud dataplex entries create my-entry --location=us-central1 \
            --entry_group=my-entry-group \
            --entry-type \
            projects/my-project/locations/us-central1/entryTypes/my-type \
            --aspects aspects.yaml

    The file containing the aspects has the following format:

        my-project.us-central1.my-aspect-type:
          aspectType: my-project.us-central1.my-aspect-type
          createTime: "2024-01-01T09:39:25.160173Z"
          updateTime: "2024-01-01T09:39:25.160173Z"
          data:
            {}

POSITIONAL ARGUMENTS
     Entry resource - Arguments and flags that define the Dataplex Entry you
     want to reference. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
          Entry group containing Dataplex Entries.

          To set the entry-group attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

REQUIRED FLAGS
     Entry type resource - Arguments and flags that define the Dataplex
     EntryType you want to reference. The arguments in this group can be used
     to specify the attributes of this resource.

     This must be specified.

       --entry-type=ENTRY_TYPE
          ID of the entry type or fully qualified identifier for the entry
          type.

          To set the entry_type attribute:
          + provide the argument --entry-type on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --entry-type-location=ENTRY_TYPE_LOCATION
          The location of the EntryType resource.

          To set the entry-type-location attribute:
          + provide the argument --entry-type on the command line with a
            fully specified name;
          + provide the argument --entry-type-location on the command line.

       --entry-type-project=ENTRY_TYPE_PROJECT
          The project of the EntryType resource.

          To set the entry-type-project attribute:
          + provide the argument --entry-type on the command line with a
            fully specified name;
          + provide the argument --entry-type-project on the command line.

OPTIONAL FLAGS
     --aspects=YAML_OR_JSON_FILE
        Path to a YAML or JSON file containing Aspects to add or update.

        When this flag is specified, only Aspects referenced in the file are
        going to be added or updated. Specifying this flag does not remove any
        Aspects from the entry. In other words, specifying this flag will not
        lead to a full replacement of Aspects with a contents of the provided
        file.

        Content of the file contains a map, where keys are in the format
        ASPECT_TYPE@PATH, or just ASPECT_TYPE, if the Aspect is attached to an
        entry itself rather than to a specific column defined in the schema.

        Values in the map represent Aspect's content, which must conform to a
        template defined for a given ASPECT_TYPE. Each Aspect will be replaced
        fully by the provided content. That means data in the Aspect will be
        replaced and not merged with existing contents of that Aspect in the
        Entry.

        ASPECT_TYPE is expected to be in a format
        PROJECT_ID.LOCATION.ASPECT_TYPE_ID.

        PATH can be either empty (which means a 'root' path, such that Aspect
        is attached to the entry itself) or point to a specific column defined
        in the schema. For example: Schema.some_column.

        Example YAML format:

              project-id1.us-central1.my-aspect-type1:
                data:
                  aspectField1: someValue
                  aspectField2: someOtherValue
              project-id2.us-central1.my-aspect-type2@Schema.column1:
                data:
                  aspectField3: someValue3

        Example JSON format:

              {
                "project-id1.us-central1.my-aspect-type1": {
                  "data": {
                    "aspectField1": "someValue",
                    "aspectField2": "someOtherValue"
                  }
                },
                "project-id2.us-central1.my-aspect-type2@Schema.column1": {
                  "data": {
                    "aspectField3": "someValue3"
                  }
                }
              }

     --fully-qualified-name=FULLY_QUALIFIED_NAME
        A name for the entry that can reference it in an external system. The
        maximum size of the field is 4000 characters.

     Entry resource - Arguments and flags that define the parent Entry you want
     to reference. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --parent-entry on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --parent-entry on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property dataplex/location.

     To set the entry_group attribute:
      * provide the argument --parent-entry on the command line with a fully
        specified name;
      * provide the argument --entry_group on the command line.

     --parent-entry=PARENT_ENTRY
        ID of the entry or fully qualified identifier for the entry.

        To set the entry attribute:
        * provide the argument --parent-entry on the command line.

     Source system related information for an entry. If any of the entry source
     fields are specified, then ``--entry-source-update-time must be specified
     as well.

     --entry-source-ancestors=[ANCESTORS,...]
        Information about individual items in the hierarchy of an Entry.

     --entry-source-create-time=DATE_TIME
        The creation date and time of the resource in the source system.

     --entry-source-description=DESCRIPTION
        Description of the Entry.

     --entry-source-display-name=DISPLAY_NAME
        User friendly display name.

     --entry-source-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --entry-source-platform=PLATFORM_NAME
        The platform containing the source system.

     --entry-source-resource=RESOURCE
        The name of the resource in the source system.

     --entry-source-system=SYSTEM_NAME
        The name of the source system.

     --entry-source-update-time=DATE_TIME
        The update date and time of the resource in the source system.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entries create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud dataplex entries create my-dataplex-entry \
    --location=us-central1 \
    --entry-group=my-entry-group \
    --entry-type projects/my-project/locations/us-central1/entryTypes/my-type

gcloud dataplex entries create my-child-entry \
    --location=us-central1 \
    --entry-group=my-entry-group \
    --entry-type projects/my-project/locations/us-central1/entryTypes/my-type \
    --parent-entry projects/my-project/locations/us-central1/entryGroups/my-entry-group/entries/my-parent-entry

gcloud dataplex entries create my-entry \
    --location=us-central1 \
    --entry-group=my-entry-group \
    --entry-type projects/my-project/locations/us-central1/entryTypes/my-type \
    --entry-source-description 'This is a description of the Entry.' \
    --entry-source-display-name 'display name' \
    --entry-source-ancestors '{"type":"projects/my-project/locations/us-central1/entryTypes/some-type", "name":"projects/my-project/locations/us-central1/entryGroups/my-entry-group/entries/ancestor-entry"}, {"type":"projects/my-project/locations/us-central1/entryTypes/another-type", "name":"projects/my-project/locations/us-central1/entryGroups/my-entry-group/entries/another-ancestor-entry"}' \
    --entry-source-labels key1=value1,key2=value2 \
    --entry-source-create-time 2024-01-01T09:39:25.160173Z \
    --entry-source-update-time 2024-01-01T09:39:25.160173Z

gcloud dataplex entries create my-entry \
    --location=us-central1 \
    --entry-group=my-entry-group \
    --entry-type projects/my-project/locations/us-central1/entryTypes/my-type \
    --aspects aspects.yaml
```

### gcloud dataplex entries delete

```text
NAME
    gcloud dataplex entries delete - delete a Dataplex entry

SYNOPSIS
    gcloud dataplex entries delete
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Dataplex entry.

EXAMPLES
    To delete the entry 'entry1', run:

        $ gcloud dataplex entries delete entry1 --entry-group=entry-group1 \
            --location=us-central1 --project=test-project

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
          Entry group containing Dataplex Entries.

          To set the entry-group attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entries delete
```

### gcloud dataplex entries describe

```text
NAME
    gcloud dataplex entries describe - describe a Dataplex entry

SYNOPSIS
    gcloud dataplex entries describe
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [--aspect-types=[ASPECT_TYPES,...]] [--paths=[PATHS,...]] [--view=VIEW]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Dataplex entry.

    Displays the details of a Dataplex entry resource given a valid entry ID.

EXAMPLES
    To describe a Dataplex entry entry1 within entry group entry-group1 in
    location us-central1, run:

        $ gcloud dataplex entries describe entry1 \
            --entry-group=entry-group1 --location=us-central1 \
            --project=test-project

POSITIONAL ARGUMENTS
     Entry resource - Arguments and flags that define the Dataplex Entry you
     want to describe. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
          Entry group containing Dataplex Entries.

          To set the entry-group attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --aspect-types=[ASPECT_TYPES,...]
        Limits the aspects returned to the provided aspect types. Only works if
        the --view=custom is selected.

        For example, if two aspect types are specified:
        "projects/projectA/locations/us-central1/my-aspect-type,projects/projectB/locations/us/my-aspect-type2"
        then only aspects matching these aspect types will be returned.

        Can be further constrained by the --paths argument.

     --paths=[PATHS,...]
        Limits the aspects returned to those associated with the provided paths
        within the Entry. Only works if the --view=custom is selected.

        For example, if two paths are specified: "--paths=property1,property2"
        then only aspects on these paths will be returned.

        To return aspects without any path, the empty (root) path can be
        specified. For this "." can be used. For example, when
        "--paths=.,property1" are specified, then only aspects on the path
        "property1" and on the entry itself will be returned.

        Can be further constrained by --aspect-types argument.

     --view=VIEW
        Controls which parts of an entry are to be returned. VIEW must be one
        of:

         all
            Returns all aspects. If the number of aspects would exceed 100, the
            first 100 will be returned.

         basic
            Returns entry only, without aspects.
         custom
            Returns aspects filtered based on --aspect-types AND --paths
            arguments specified. When used, at least one of --aspect-types and
            --paths arguments must be specified. If the number of aspects would
            exceed 100, the first 100 will be returned.

         full
            Default value. Returns all required aspects, as well as the keys of
            all non-required aspects.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entries describe
```

### gcloud dataplex entries list

```text
NAME
    gcloud dataplex entries list - list Dataplex entries

SYNOPSIS
    gcloud dataplex entries list
        (--entry-group=ENTRY_GROUP : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Dataplex entries in an entry group.

EXAMPLES
    To List the entries in entry group 'entry-group1', run:

        $ gcloud dataplex entries list --entry-group=entry-group1 \
            --location=us-central1 --project=test-project

REQUIRED FLAGS
     Entry group resource - Example Entry Group to list all contained Entries.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument --entry-group on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entries list
```

### gcloud dataplex entries lookup

```text
NAME
    gcloud dataplex entries lookup - lookup a Dataplex entry

SYNOPSIS
    gcloud dataplex entries lookup
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [--aspect-types=[ASPECT_TYPES,...]] [--paths=[PATHS,...]] [--view=VIEW]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lookup a Dataplex entry.

    Displays the details of a Dataplex entry resource given a valid entry ID.
    Unlike describe, where the Dataplex permission is required for access, for
    lookup the permission from the original source system is required on the
    entry instead. For example, if the source is a BigQuery table, you need the
    bigquery.tables.get permission to lookup an entry.

EXAMPLES
    To lookup a Dataplex entry entry1 within entry group entry-group1 in
    location us-central1, run:

        $ gcloud dataplex entries lookup entry1 --entry-group=entry-group1 \
            --location=us-central1 --project=test-project

POSITIONAL ARGUMENTS
     Entry resource - Arguments and flags that define the Dataplex Entry you
     want to lookup. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
          Entry group containing Dataplex Entries.

          To set the entry-group attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --aspect-types=[ASPECT_TYPES,...]
        Limits the aspects returned to the provided aspect types. Only works if
        the --view=custom is selected.

        For example, if two aspect types are specified:
        "projects/projectA/locations/us-central1/my-aspect-type,projects/projectB/locations/us/my-aspect-type2"
        then only aspects matching these aspect types will be returned.

        Can be further constrained by the --paths argument.

     --paths=[PATHS,...]
        Limits the aspects returned to those associated with the provided paths
        within the Entry. Only works if the --view=custom is selected.

        For example, if two paths are specified: "--paths=property1,property2"
        then only aspects on these paths will be returned.

        To return aspects without any path, the empty (root) path can be
        specified. For this "." can be used. For example, when
        "--paths=.,property1" are specified, then only aspects on the path
        "property1" and on the entry itself will be returned.

        Can be further constrained by --aspect-types argument.

     --view=VIEW
        Controls which parts of an entry are to be returned. VIEW must be one
        of:

         all
            Returns all aspects. If the number of aspects would exceed 100, the
            first 100 will be returned.

         basic
            Returns entry only, without aspects.
         custom
            Returns aspects filtered based on --aspect-types AND --paths
            arguments specified. When used, at least one of --aspect-types and
            --paths arguments must be specified. If the number of aspects would
            exceed 100, the first 100 will be returned.

         full
            Default value. Returns all required aspects, as well as the keys of
            all non-required aspects.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entries lookup
```

### gcloud dataplex entries modify

```text
NAME
    gcloud dataplex entries modify - modify a Dataplex Entry

SYNOPSIS
    gcloud dataplex entries modify
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [--remove-aspects=[ASPECT_TYPE@PATH,...]]
        [--update-aspects=YAML_OR_JSON_FILE]
        [--clear-fully-qualified-name
          | --fully-qualified-name=FULLY_QUALIFIED_NAME]
        [--entry-source-update-time=DATE_TIME
          : --clear-entry-source-create-time
          | --entry-source-create-time=DATE_TIME
          --clear-entry-source-description
          | --entry-source-description=DESCRIPTION
          --clear-entry-source-display-name
          | --entry-source-display-name=DISPLAY_NAME
          --clear-entry-source-labels
          | --entry-source-labels=[KEY=VALUE,...] --clear-entry-source-platform
          | --entry-source-platform=PLATFORM_NAME --clear-entry-source-resource
          | --entry-source-resource=RESOURCE --clear-entry-source-system
          | --entry-source-system=SYSTEM_NAME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Modify specified fields in a given Dataplex Entry.

EXAMPLES
    To modify fully qualified name (FQN) of an entry, run:

        $ gcloud dataplex entries modify entry1 --project=test-project \
            --location=us-central1 --entry-group entry-group1 \
            --fully-qualified-name='custom:a.b.c'

    To modify description of an entry, run:

        $ gcloud dataplex entries modify entry1 --project=test-project \
            --location=us-central1 --entry-group entry-group1 \
            --entry-source-description='Updated description' \
            --entry-source-update-time='1998-09-04T12:00:00-0700'

    To clear the description of an entry, run:

        $ gcloud dataplex entries modify entry1 --project=test-project \
            --location=us-central1 --entry-group entry-group1 \
            --clear-entry-source-description \
            --entry-source-update-time='1998-09-04T12:00:00-0700'

    To add or update aspects from the YAML/JSON file, run:

        $ gcloud dataplex entries modify entry1 --project=test-project \
            --location=us-central1 --entry-group entry-group1 \
            --update-aspects=path-to-a-file-with-aspects.json

    To remove all aspects of type test-project.us-central1.some-aspect-type
    from the entry, run:

        $ gcloud dataplex entries modify entry1 --project=test-project \
            --location=us-central1 --entry-group entry-group1 \
            --remove-aspects='test-project.us-central1.some-aspect-type@*'

    To remove all aspects on path Schema.column1 from the entry, run:

        $ gcloud dataplex entries modify entry1 --project=test-project \
            --location=us-central1 --entry-group entry-group1 \
            --remove-aspects='*@Schema.column1'

    To remove exact aspects
    test-project.us-central1.some-aspect-type@Schema.column1 and
    test-project.us-central1.some-aspect-type2@Schema.column2 from the entry,
    run:

        $ gcloud dataplex entries modify entry1 --project=test-project \
            --location=us-central1 --entry-group entry-group1 \
            --remove-aspects=test-project.us-central1.some-aspect-type@Schem\
        a.column1,test-project.us-central2.some-aspect-type@Schema.column2

POSITIONAL ARGUMENTS
     Entry resource - Arguments and flags that define the Dataplex Entry you
     want to reference. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
          Entry group containing Dataplex Entries.

          To set the entry-group attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --remove-aspects=[ASPECT_TYPE@PATH,...]
        List of Aspect keys, identifying Aspects to remove from the entry.

        Keys are in the format ASPECT_TYPE@PATH, or just ASPECT_TYPE, if the
        Aspect is attached to an entry itself rather than to a specific column
        defined in the schema.

        ASPECT_TYPE is expected to be in a format
        PROJECT_ID.LOCATION.ASPECT_TYPE_ID or a wildcard *, which targets all
        aspect types.

        PATH can be either empty (which means a 'root' path, such that Aspect
        is attached to the entry itself), point to a specific column defined in
        the schema (for example: Schema.some_column) or a wildcard * (target
        all paths).

        ASPECT_TYPE and PATH cannot be both specified as wildcards *.

        If both --update-aspects and --remove-aspects flags are specified, and
        the same aspect key is used in both flags, then --update-aspects takes
        precedence, and such an aspect will be updated and not removed.

     --update-aspects=YAML_OR_JSON_FILE
        Path to a YAML or JSON file containing Aspects to add or update.

        When this flag is specified, only Aspects referenced in the file are
        going to be added or updated. Specifying this flag does not remove any
        Aspects from the entry. In other words, specifying this flag will not
        lead to a full replacement of Aspects with a contents of the provided
        file.

        Content of the file contains a map, where keys are in the format
        ASPECT_TYPE@PATH, or just ASPECT_TYPE, if the Aspect is attached to an
        entry itself rather than to a specific column defined in the schema.

        Values in the map represent Aspect's content, which must conform to a
        template defined for a given ASPECT_TYPE. Each Aspect will be replaced
        fully by the provided content. That means data in the Aspect will be
        replaced and not merged with existing contents of that Aspect in the
        Entry.

        ASPECT_TYPE is expected to be in a format
        PROJECT_ID.LOCATION.ASPECT_TYPE_ID.

        PATH can be either empty (which means a 'root' path, such that Aspect
        is attached to the entry itself) or point to a specific column defined
        in the schema. For example: Schema.some_column.

        Example YAML format:

              project-id1.us-central1.my-aspect-type1:
                data:
                  aspectField1: someValue
                  aspectField2: someOtherValue
              project-id2.us-central1.my-aspect-type2@Schema.column1:
                data:
                  aspectField3: someValue3

        Example JSON format:

              {
                "project-id1.us-central1.my-aspect-type1": {
                  "data": {
                    "aspectField1": "someValue",
                    "aspectField2": "someOtherValue"
                  }
                },
                "project-id2.us-central1.my-aspect-type2@Schema.column1": {
                  "data": {
                    "aspectField3": "someValue3"
                  }
                }
              }

        If both --update-aspects and --remove-aspects flags are specified, and
        the same aspect key is used in both flags, then --update-aspects takes
        precedence, and such an aspect will be updated and not removed.

     At most one of these can be specified:

       --clear-fully-qualified-name
          Clear the FQN for the Entry.

       --fully-qualified-name=FULLY_QUALIFIED_NAME
          FQN, a name for the entry that can reference it in an external
          system.

     Source system related information for an entry. If any of the entry source
     fields are specified, then ``--entry-source-update-time must be specified
     as well.

     --entry-source-update-time=DATE_TIME
        The update date and time of the resource in the source system.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     At most one of these can be specified:

       --clear-entry-source-create-time
          Clear the value for the create_time field in the Entry Source.

       --entry-source-create-time=DATE_TIME
          The creation date and time of the resource in the source system.

     At most one of these can be specified:

       --clear-entry-source-description
          Clear the value for the description field in the Entry Source.

       --entry-source-description=DESCRIPTION
          Description of the Entry.

     At most one of these can be specified:

       --clear-entry-source-display-name
          Clear the value for the display_name field in the Entry Source.

       --entry-source-display-name=DISPLAY_NAME
          User friendly display name.

     At most one of these can be specified:

       --clear-entry-source-labels
          Clear the labels for the Entry Source.

       --entry-source-labels=[KEY=VALUE,...]
          List of label KEY=VALUE pairs to add.

          Keys must start with a lowercase character and contain only hyphens
          (-), underscores (_), lowercase characters, and numbers. Values must
          contain only hyphens (-), underscores (_), lowercase characters, and
          numbers.

     At most one of these can be specified:

       --clear-entry-source-platform
          Clear the value for the platform field in the Entry Source.

       --entry-source-platform=PLATFORM_NAME
          The platform containing the source system.

     At most one of these can be specified:

       --clear-entry-source-resource
          Clear the value for the resource field in the Entry Source.

       --entry-source-resource=RESOURCE
          The name of the resource in the source system.

     At most one of these can be specified:

       --clear-entry-source-system
          Clear the value for the system field in the Entry Source.

       --entry-source-system=SYSTEM_NAME
          The name of the source system.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entries modify
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud dataplex entries modify entry1 \
    --project=test-project \
    --location=us-central1 \
    --entry-group entry-group1 \
    --remove-aspects=test-project.us-central1.some-aspect-type@Schema.column1,test-project.us-central2.some-aspect-type@Schema.column2
```

### gcloud dataplex entries remove-aspects

```text
NAME
    gcloud dataplex entries remove-aspects - remove aspects from a Dataplex
        Entry

SYNOPSIS
    gcloud dataplex entries remove-aspects
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        --keys=[ASPECT_TYPE@PATH,...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove aspects from a Dataplex Entry.

EXAMPLES
    To remove all aspects of type test-project.us-central1.some-aspect-type
    from the entry, run:

        $ gcloud dataplex entries remove-aspects entry1 \
            --project=test-project --location=us-central1 \
            --entry-group entry-group1 \
            --keys='test-project.us-central1.some-aspect-type@*'

    To remove all aspects on path Schema.column1 from the entry, run:

        $ gcloud dataplex entries remove-aspects entry1 \
            --project=test-project --location=us-central1 \
            --entry-group entry-group1 --keys='*@Schema.column1'

    To remove exact aspects
    test-project.us-central1.some-aspect-type@Schema.column1 and
    test-project.us-central1.some-aspect-type2@Schema.column2 from the entry,
    run:

        $ gcloud dataplex entries remove-aspects entry1 \
            --project=test-project --location=us-central1 \
            --entry-group entry-group1 \
            --keys=test-project.us-central1.some-aspect-type@Schema.column1,\
        test-project.us-central2.some-aspect-type@Schema.column2

POSITIONAL ARGUMENTS
     Entry resource - Arguments and flags that define the Dataplex Entry you
     want to reference. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
          Entry group containing Dataplex Entries.

          To set the entry-group attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

REQUIRED FLAGS
     --keys=[ASPECT_TYPE@PATH,...]
        List of Aspect keys, identifying Aspects to remove from the entry.

        Keys are in the format ASPECT_TYPE@PATH, or just ASPECT_TYPE, if the
        Aspect is attached to an entry itself rather than to a specific column
        defined in the schema.

        ASPECT_TYPE is expected to be in a format
        PROJECT_ID.LOCATION.ASPECT_TYPE_ID or a wildcard *, which targets all
        aspect types.

        PATH can be either empty (which means a 'root' path, such that Aspect
        is attached to the entry itself), point to a specific column defined in
        the schema (for example: Schema.some_column) or a wildcard * (target
        all paths).

        ASPECT_TYPE and PATH cannot be both specified as wildcards *.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entries remove-aspects
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud dataplex entries remove-aspects entry1 \
    --project=test-project \
    --location=us-central1 \
    --entry-group entry-group1 \
    --keys=test-project.us-central1.some-aspect-type@Schema.column1,test-project.us-central2.some-aspect-type@Schema.column2
```

### gcloud dataplex entries search

```text
NAME
    gcloud dataplex entries search - searches for Dataplex entries

SYNOPSIS
    gcloud dataplex entries search QUERY --project=PROJECT [--limit=LIMIT]
        [--order-by=ORDER_BY] [--page-size=PAGE_SIZE] [--scope=SCOPE]
        [--semantic-search] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Searches for entries matching given query and scope.

EXAMPLES
    To search project 'my-project' for Dataplex resources that match the simple
    predicate 'foo':

        $ gcloud dataplex entries search 'foo' --project=my-project

POSITIONAL ARGUMENTS
     QUERY
        The query against which entries in scope should be matched.

REQUIRED FLAGS
     --project=PROJECT
        The project to which the request should be attributed.

OPTIONAL FLAGS
     --limit=LIMIT
        Maximum number of resources.

     --order-by=ORDER_BY
        Specifies the ordering of results, currently supported case-sensitive
        choices are:

        * title [asc|desc], defaults to ascending if not specified.

     --page-size=PAGE_SIZE
        Maximum number of resources per page. No more than 500.

     --scope=SCOPE
        The scope under which the search should be operating. Should either be
        organizations/<org_id> or projects/<project_ref>. If left unspecified,
        it will default to the organization where the project is located.

     --semantic-search
        Specifies whether the search should understand the meaning and intent
        behind the query, rather than just matching keywords.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entries search
```

### gcloud dataplex entries update

```text
NAME
    gcloud dataplex entries update - update a Dataplex Entry

SYNOPSIS
    gcloud dataplex entries update
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [--remove-aspects=[ASPECT_TYPE@PATH,...]]
        [--update-aspects=YAML_OR_JSON_FILE]
        [--clear-fully-qualified-name
          | --fully-qualified-name=FULLY_QUALIFIED_NAME]
        [--entry-source-update-time=DATE_TIME
          : --clear-entry-source-create-time
          | --entry-source-create-time=DATE_TIME
          --clear-entry-source-description
          | --entry-source-description=DESCRIPTION
          --clear-entry-source-display-name
          | --entry-source-display-name=DISPLAY_NAME
          --clear-entry-source-labels
          | --entry-source-labels=[KEY=VALUE,...] --clear-entry-source-platform
          | --entry-source-platform=PLATFORM_NAME --clear-entry-source-resource
          | --entry-source-resource=RESOURCE --clear-entry-source-system
          | --entry-source-system=SYSTEM_NAME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update specified fields in a given Dataplex Entry.

EXAMPLES
    To update fully qualified name (FQN) of an entry, run:

        $ gcloud dataplex entries update entry1 --project=test-project \
            --location=us-central1 --entry-group entry-group1 \
            --fully-qualified-name='custom:a.b.c'

    To update description of an entry, run:

        $ gcloud dataplex entries update entry1 --project=test-project \
            --location=us-central1 --entry-group entry-group1 \
            --entry-source-description='Updated description' \
            --entry-source-update-time='1998-09-04T12:00:00-0700'

    To clear the description of an entry, run:

        $ gcloud dataplex entries update entry1 --project=test-project \
            --location=us-central1 --entry-group entry-group1 \
            --clear-entry-source-description \
            --entry-source-update-time='1998-09-04T12:00:00-0700'

    To add or update aspects from the YAML/JSON file, run:

        $ gcloud dataplex entries update entry1 --project=test-project \
            --location=us-central1 --entry-group entry-group1 \
            --update-aspects=path-to-a-file-with-aspects.json

    To remove all aspects of type test-project.us-central1.some-aspect-type
    from the entry, run:

        $ gcloud dataplex entries update entry1 --project=test-project \
            --location=us-central1 --entry-group entry-group1 \
            --remove-aspects='test-project.us-central1.some-aspect-type@*'

    To remove all aspects on path Schema.column1 from the entry, run:

        $ gcloud dataplex entries update entry1 --project=test-project \
            --location=us-central1 --entry-group entry-group1 \
            --remove-aspects='*@Schema.column1'

    To remove exact aspects
    test-project.us-central1.some-aspect-type@Schema.column1 and
    test-project.us-central1.some-aspect-type2@Schema.column2 from the entry,
    run:

        $ gcloud dataplex entries update entry1 --project=test-project \
            --location=us-central1 --entry-group entry-group1 \
            --remove-aspects=test-project.us-central1.some-aspect-type@Schem\
        a.column1,test-project.us-central2.some-aspect-type@Schema.column2

POSITIONAL ARGUMENTS
     Entry resource - Arguments and flags that define the Dataplex Entry you
     want to reference. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
          Entry group containing Dataplex Entries.

          To set the entry-group attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --entry-group on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --remove-aspects=[ASPECT_TYPE@PATH,...]
        List of Aspect keys, identifying Aspects to remove from the entry.

        Keys are in the format ASPECT_TYPE@PATH, or just ASPECT_TYPE, if the
        Aspect is attached to an entry itself rather than to a specific column
        defined in the schema.

        ASPECT_TYPE is expected to be in a format
        PROJECT_ID.LOCATION.ASPECT_TYPE_ID or a wildcard *, which targets all
        aspect types.

        PATH can be either empty (which means a 'root' path, such that Aspect
        is attached to the entry itself), point to a specific column defined in
        the schema (for example: Schema.some_column) or a wildcard * (target
        all paths).

        ASPECT_TYPE and PATH cannot be both specified as wildcards *.

        If both --update-aspects and --remove-aspects flags are specified, and
        the same aspect key is used in both flags, then --update-aspects takes
        precedence, and such an aspect will be updated and not removed.

     --update-aspects=YAML_OR_JSON_FILE
        Path to a YAML or JSON file containing Aspects to add or update.

        When this flag is specified, only Aspects referenced in the file are
        going to be added or updated. Specifying this flag does not remove any
        Aspects from the entry. In other words, specifying this flag will not
        lead to a full replacement of Aspects with a contents of the provided
        file.

        Content of the file contains a map, where keys are in the format
        ASPECT_TYPE@PATH, or just ASPECT_TYPE, if the Aspect is attached to an
        entry itself rather than to a specific column defined in the schema.

        Values in the map represent Aspect's content, which must conform to a
        template defined for a given ASPECT_TYPE. Each Aspect will be replaced
        fully by the provided content. That means data in the Aspect will be
        replaced and not merged with existing contents of that Aspect in the
        Entry.

        ASPECT_TYPE is expected to be in a format
        PROJECT_ID.LOCATION.ASPECT_TYPE_ID.

        PATH can be either empty (which means a 'root' path, such that Aspect
        is attached to the entry itself) or point to a specific column defined
        in the schema. For example: Schema.some_column.

        Example YAML format:

              project-id1.us-central1.my-aspect-type1:
                data:
                  aspectField1: someValue
                  aspectField2: someOtherValue
              project-id2.us-central1.my-aspect-type2@Schema.column1:
                data:
                  aspectField3: someValue3

        Example JSON format:

              {
                "project-id1.us-central1.my-aspect-type1": {
                  "data": {
                    "aspectField1": "someValue",
                    "aspectField2": "someOtherValue"
                  }
                },
                "project-id2.us-central1.my-aspect-type2@Schema.column1": {
                  "data": {
                    "aspectField3": "someValue3"
                  }
                }
              }

        If both --update-aspects and --remove-aspects flags are specified, and
        the same aspect key is used in both flags, then --update-aspects takes
        precedence, and such an aspect will be updated and not removed.

     At most one of these can be specified:

       --clear-fully-qualified-name
          Clear the FQN for the Entry.

       --fully-qualified-name=FULLY_QUALIFIED_NAME
          FQN, a name for the entry that can reference it in an external
          system.

     Source system related information for an entry. If any of the entry source
     fields are specified, then ``--entry-source-update-time must be specified
     as well.

     --entry-source-update-time=DATE_TIME
        The update date and time of the resource in the source system.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     At most one of these can be specified:

       --clear-entry-source-create-time
          Clear the value for the create_time field in the Entry Source.

       --entry-source-create-time=DATE_TIME
          The creation date and time of the resource in the source system.

     At most one of these can be specified:

       --clear-entry-source-description
          Clear the value for the description field in the Entry Source.

       --entry-source-description=DESCRIPTION
          Description of the Entry.

     At most one of these can be specified:

       --clear-entry-source-display-name
          Clear the value for the display_name field in the Entry Source.

       --entry-source-display-name=DISPLAY_NAME
          User friendly display name.

     At most one of these can be specified:

       --clear-entry-source-labels
          Clear the labels for the Entry Source.

       --entry-source-labels=[KEY=VALUE,...]
          List of label KEY=VALUE pairs to add.

          Keys must start with a lowercase character and contain only hyphens
          (-), underscores (_), lowercase characters, and numbers. Values must
          contain only hyphens (-), underscores (_), lowercase characters, and
          numbers.

     At most one of these can be specified:

       --clear-entry-source-platform
          Clear the value for the platform field in the Entry Source.

       --entry-source-platform=PLATFORM_NAME
          The platform containing the source system.

     At most one of these can be specified:

       --clear-entry-source-resource
          Clear the value for the resource field in the Entry Source.

       --entry-source-resource=RESOURCE
          The name of the resource in the source system.

     At most one of these can be specified:

       --clear-entry-source-system
          Clear the value for the system field in the Entry Source.

       --entry-source-system=SYSTEM_NAME
          The name of the source system.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entries update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud dataplex entries update entry1 \
    --project=test-project \
    --location=us-central1 \
    --entry-group entry-group1 \
    --remove-aspects=test-project.us-central1.some-aspect-type@Schema.column1,test-project.us-central2.some-aspect-type@Schema.column2
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` examples use `--entry_group=my-entry-group`; the flag is `--entry-group` (SYNOPSIS: `(ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)`) and gcloud 593.0.0 rejects the underscore form with "unrecognized arguments: --entry_group=my-entry-group (did you mean '--entry-group'?)".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/entries (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

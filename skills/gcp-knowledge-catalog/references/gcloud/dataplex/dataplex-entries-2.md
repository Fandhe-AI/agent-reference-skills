---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/entries
---

# gcloud dataplex entries (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex entries update-aspects

```text
NAME
    gcloud dataplex entries update-aspects - add or update aspects for a
        Dataplex Entry

SYNOPSIS
    gcloud dataplex entries update-aspects
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        --aspects=YAML_OR_JSON_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add or update aspects for a Dataplex Entry.

EXAMPLES
    To add or update aspects for the Dataplex entry entry1 within the entry
    group entry-group1 in location us-central1 from the YAML/JSON file, run:

        $ gcloud dataplex entries update-aspects entry1 \
            --project=test-project --location=us-central1 \
            --entry-group entry-group1 \
            --aspects=path-to-a-file-with-aspects.json

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entries update-aspects
```

### gcloud alpha dataplex entries create

```text
NAME
    gcloud alpha dataplex entries create - create a Dataplex Entry resource

SYNOPSIS
    gcloud alpha dataplex entries create
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
```

### gcloud alpha dataplex entries delete

```text
NAME
    gcloud alpha dataplex entries delete - delete a Dataplex entry

SYNOPSIS
    gcloud alpha dataplex entries delete
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entries describe

```text
NAME
    gcloud alpha dataplex entries describe - describe a Dataplex entry

SYNOPSIS
    gcloud alpha dataplex entries describe
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [--aspect-types=[ASPECT_TYPES,...]] [--paths=[PATHS,...]] [--view=VIEW]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entries list

```text
NAME
    gcloud alpha dataplex entries list - list Dataplex entries

SYNOPSIS
    gcloud alpha dataplex entries list
        (--entry-group=ENTRY_GROUP : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entries lookup

```text
NAME
    gcloud alpha dataplex entries lookup - lookup a Dataplex entry

SYNOPSIS
    gcloud alpha dataplex entries lookup
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        [--aspect-types=[ASPECT_TYPES,...]] [--paths=[PATHS,...]] [--view=VIEW]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entries modify

```text
NAME
    gcloud alpha dataplex entries modify - modify a Dataplex Entry

SYNOPSIS
    gcloud alpha dataplex entries modify
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
```

### gcloud alpha dataplex entries remove-aspects

```text
NAME
    gcloud alpha dataplex entries remove-aspects - remove aspects from a
        Dataplex Entry

SYNOPSIS
    gcloud alpha dataplex entries remove-aspects
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        --keys=[ASPECT_TYPE@PATH,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entries search

```text
NAME
    gcloud alpha dataplex entries search - searches for Dataplex entries

SYNOPSIS
    gcloud alpha dataplex entries search QUERY --project=PROJECT
        [--limit=LIMIT] [--order-by=ORDER_BY] [--page-size=PAGE_SIZE]
        [--scope=SCOPE] [--semantic-search] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entries update

```text
NAME
    gcloud alpha dataplex entries update - update a Dataplex Entry

SYNOPSIS
    gcloud alpha dataplex entries update
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
```

### gcloud alpha dataplex entries update-aspects

```text
NAME
    gcloud alpha dataplex entries update-aspects - add or update aspects for a
        Dataplex Entry

SYNOPSIS
    gcloud alpha dataplex entries update-aspects
        (ENTRY : --entry-group=ENTRY_GROUP --location=LOCATION)
        --aspects=YAML_OR_JSON_FILE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/entries (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

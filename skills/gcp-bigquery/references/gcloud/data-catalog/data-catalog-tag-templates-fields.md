---
source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/tag-templates/fields
---

# gcloud data-catalog tag-templates fields

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud data-catalog tag-templates fields create

```text
NAME
    gcloud data-catalog tag-templates fields create - create a Data Catalog tag
        template field

SYNOPSIS
    gcloud data-catalog tag-templates fields create
        (FIELD : --location=LOCATION --tag-template=TAG_TEMPLATE) --type=TYPE
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    aspect-types instead.

    Create a Data Catalog tag template field.

EXAMPLES
    Create a string tag template field:

        $ gcloud data-catalog tag-templates fields create create FIELD \
            --display-name=DISPLAY --type=string

    Create an enum tag template field with values 'A' and 'B':

        $ gcloud data-catalog tag-templates fields create FIELD \
            --display-name=DISPLAY --type="enum(A|B)"

POSITIONAL ARGUMENTS
     Tag template field resource - Tag template field to create. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument field on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FIELD
          ID of the tag template field or fully qualified identifier for the
          tag template field.

          To set the field attribute:
          + provide the argument field on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the tag template field.

          To set the location attribute:
          + provide the argument field on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --tag-template=TAG_TEMPLATE
          Tag template of the tag template field.

          To set the tag-template attribute:
          + provide the argument field on the command line with a fully
            specified name;
          + provide the argument --tag-template on the command line.

REQUIRED FLAGS
     --type=TYPE
        Type of the tag template field. Choices are double, string, bool,
        timestamp, and enum.

            To specify a string field:
              `type=string`

            To specify an enum field with values 'A' and 'B':
              `type="enum(A|B)"`

OPTIONAL FLAGS
     --display-name=DISPLAY_NAME
        Display name of the tag template field.

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

        $ gcloud alpha data-catalog tag-templates fields create

        $ gcloud beta data-catalog tag-templates fields create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud data-catalog tag-templates fields create FIELD \
    --tag-template=TEMPLATE \
    --location=us-central1 \
    --display-name=DISPLAY \
    --type=string

gcloud data-catalog tag-templates fields create FIELD \
    --tag-template=TEMPLATE \
    --location=us-central1 \
    --display-name=DISPLAY \
    --type="enum(A|B)"
```

### gcloud data-catalog tag-templates fields delete

```text
NAME
    gcloud data-catalog tag-templates fields delete - delete a Data Catalog tag
        template field

SYNOPSIS
    gcloud data-catalog tag-templates fields delete
        (FIELD : --location=LOCATION --tag-template=TAG_TEMPLATE) [--force]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    aspect-types instead.

    Delete a Data Catalog tag template field.

EXAMPLES
    Delete a tag template field:

        $ gcloud data-catalog tag-templates fields delete FIELD

POSITIONAL ARGUMENTS
     Tag template field resource - Tag template field to delete. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument field on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FIELD
          ID of the tag template field or fully qualified identifier for the
          tag template field.

          To set the field attribute:
          + provide the argument field on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the tag template field.

          To set the location attribute:
          + provide the argument field on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --tag-template=TAG_TEMPLATE
          Tag template of the tag template field.

          To set the tag-template attribute:
          + provide the argument field on the command line with a fully
            specified name;
          + provide the argument --tag-template on the command line.

FLAGS
     --force
        If True, this tag template field will be deleted from any existing
        tags.

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

        $ gcloud alpha data-catalog tag-templates fields delete

        $ gcloud beta data-catalog tag-templates fields delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud data-catalog tag-templates fields delete FIELD \
    --tag-template=TEMPLATE \
    --location=us-central1
```

### gcloud data-catalog tag-templates fields enum-values rename

```text
NAME
    gcloud data-catalog tag-templates fields enum-values rename - rename an
        enum value in Data Catalog tag template enum field

SYNOPSIS
    gcloud data-catalog tag-templates fields enum-values rename
        (ENUM_VALUE
          : --field=FIELD --location=LOCATION --tag-template=TAG_TEMPLATE)
        --new-id=NEW_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    aspect-types instead.

    Rename an enum value in Data Catalog tag template enum field.

EXAMPLES
    Rename an enum value in tag template enum field:

        $ gcloud data-catalog tag-templates fields enum-values rename \
            ENUM_VALUE --new-id="new-id"

POSITIONAL ARGUMENTS
     Enum value resource - Enum value to rename. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument enum_value on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENUM_VALUE
          ID of the enum value or fully qualified identifier for the enum
          value.

          To set the enum_value attribute:
          + provide the argument enum_value on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --field=FIELD
          Tag template field that contains enum value.

          To set the field attribute:
          + provide the argument enum_value on the command line with a fully
            specified name;
          + provide the argument --field on the command line.

       --location=LOCATION
          Location of the enum value.

          To set the location attribute:
          + provide the argument enum_value on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --tag-template=TAG_TEMPLATE
          Tag template that contains enum value.

          To set the tag-template attribute:
          + provide the argument enum_value on the command line with a fully
            specified name;
          + provide the argument --tag-template on the command line.

REQUIRED FLAGS
     --new-id=NEW_ID
        New display name of the enum value.

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

        $ gcloud alpha data-catalog tag-templates fields enum-values rename

        $ gcloud beta data-catalog tag-templates fields enum-values rename
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud data-catalog tag-templates fields enum-values rename ENUM_VALUE \
    --field=FIELD \
    --tag-template=TEMPLATE \
    --location=us-central1 \
    --new-id="new-id"
```

### gcloud data-catalog tag-templates fields rename

```text
NAME
    gcloud data-catalog tag-templates fields rename - rename a Data Catalog tag
        template field

SYNOPSIS
    gcloud data-catalog tag-templates fields rename
        (FIELD : --location=LOCATION --tag-template=TAG_TEMPLATE)
        --new-id=NEW_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    aspect-types instead.

    Rename a Data Catalog tag template field.

EXAMPLES
    Update the ID of a tag template field:

        $ gcloud data-catalog tag-templates fields rename FIELD \
            --new-id="new-id"

POSITIONAL ARGUMENTS
     Tag template field resource - Tag template field to rename. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument field on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FIELD
          ID of the tag template field or fully qualified identifier for the
          tag template field.

          To set the field attribute:
          + provide the argument field on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the tag template field.

          To set the location attribute:
          + provide the argument field on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --tag-template=TAG_TEMPLATE
          Tag template of the tag template field.

          To set the tag-template attribute:
          + provide the argument field on the command line with a fully
            specified name;
          + provide the argument --tag-template on the command line.

REQUIRED FLAGS
     --new-id=NEW_ID
        New ID of the tag template field.

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

        $ gcloud alpha data-catalog tag-templates fields rename

        $ gcloud beta data-catalog tag-templates fields rename
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud data-catalog tag-templates fields rename FIELD \
    --tag-template=TEMPLATE \
    --location=us-central1 \
    --new-id="new-id"
```

### gcloud data-catalog tag-templates fields update

```text
NAME
    gcloud data-catalog tag-templates fields update - update a Data Catalog tag
        template field

SYNOPSIS
    gcloud data-catalog tag-templates fields update
        (FIELD : --location=LOCATION --tag-template=TAG_TEMPLATE)
        [--display-name=DISPLAY_NAME] [--enum-values=[ENUM_VALUES,...]]
        [--required] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    aspect-types instead.

    Update a Data Catalog tag template field.

EXAMPLES
    Update the display name of a tag template field:

        $ gcloud data-catalog tag-templates fields update FIELD \
            --display-name=NAME

    Set tag template enum field values to be 'A' and 'B':

        $ gcloud data-catalog tag-templates fields update FIELD \
            --enum-values=A,B

    Set a tag template field to be optional:

        $ gcloud data-catalog tag-templates fields update FIELD --no-required

POSITIONAL ARGUMENTS
     Tag template field resource - Tag template field to update. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument field on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FIELD
          ID of the tag template field or fully qualified identifier for the
          tag template field.

          To set the field attribute:
          + provide the argument field on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the tag template field.

          To set the location attribute:
          + provide the argument field on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --tag-template=TAG_TEMPLATE
          Tag template of the tag template field.

          To set the tag-template attribute:
          + provide the argument field on the command line with a fully
            specified name;
          + provide the argument --tag-template on the command line.

FLAGS
     --display-name=DISPLAY_NAME
        Display name of the tag template field.

     --enum-values=[ENUM_VALUES,...]
        Comma-separated list of enum values. The list of enum values passed
        with this flag replaces the existing one in tag template enum field.
        That means:
        * the enum values passed to the flag and not present in tag template
          enum field get created
        * the enum values present in tag template enum field and missing in
          the list get removed
        * the order of the items on the list is preserved

        Enum values can only be removed from optional enum fields for now.

     --required
        Indicates if the tag template field is required. Updating from FALSE
        (optional) to TRUE (required) is NOT allowed.

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

        $ gcloud alpha data-catalog tag-templates fields update

        $ gcloud beta data-catalog tag-templates fields update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud data-catalog tag-templates fields update FIELD \
    --tag-template=TEMPLATE \
    --location=us-central1 \
    --display-name=NAME

gcloud data-catalog tag-templates fields update FIELD \
    --tag-template=TEMPLATE \
    --location=us-central1 \
    --enum-values=A,B

gcloud data-catalog tag-templates fields update FIELD \
    --tag-template=TEMPLATE \
    --location=us-central1 \
    --no-required
```

### gcloud beta data-catalog tag-templates fields create

```text
NAME
    gcloud beta data-catalog tag-templates fields create - create a Data
        Catalog tag template field

SYNOPSIS
    gcloud beta data-catalog tag-templates fields create
        (FIELD : --location=LOCATION --tag-template=TAG_TEMPLATE) --type=TYPE
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog tag-templates fields delete

```text
NAME
    gcloud beta data-catalog tag-templates fields delete - delete a Data
        Catalog tag template field

SYNOPSIS
    gcloud beta data-catalog tag-templates fields delete
        (FIELD : --location=LOCATION --tag-template=TAG_TEMPLATE) [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog tag-templates fields enum-values rename

```text
NAME
    gcloud beta data-catalog tag-templates fields enum-values rename - rename
        an enum value in Data Catalog tag template enum field

SYNOPSIS
    gcloud beta data-catalog tag-templates fields enum-values rename
        (ENUM_VALUE
          : --field=FIELD --location=LOCATION --tag-template=TAG_TEMPLATE)
        --new-id=NEW_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog tag-templates fields rename

```text
NAME
    gcloud beta data-catalog tag-templates fields rename - rename a Data
        Catalog tag template field

SYNOPSIS
    gcloud beta data-catalog tag-templates fields rename
        (FIELD : --location=LOCATION --tag-template=TAG_TEMPLATE)
        --new-id=NEW_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog tag-templates fields update

```text
NAME
    gcloud beta data-catalog tag-templates fields update - update a Data
        Catalog tag template field

SYNOPSIS
    gcloud beta data-catalog tag-templates fields update
        (FIELD : --location=LOCATION --tag-template=TAG_TEMPLATE)
        [--display-name=DISPLAY_NAME] [--enum-values=[ENUM_VALUES,...]]
        [--required] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog tag-templates fields create

```text
NAME
    gcloud alpha data-catalog tag-templates fields create - create a Data
        Catalog tag template field

SYNOPSIS
    gcloud alpha data-catalog tag-templates fields create
        (FIELD : --location=LOCATION --tag-template=TAG_TEMPLATE) --type=TYPE
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog tag-templates fields delete

```text
NAME
    gcloud alpha data-catalog tag-templates fields delete - delete a Data
        Catalog tag template field

SYNOPSIS
    gcloud alpha data-catalog tag-templates fields delete
        (FIELD : --location=LOCATION --tag-template=TAG_TEMPLATE) [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog tag-templates fields enum-values rename

```text
NAME
    gcloud alpha data-catalog tag-templates fields enum-values rename - rename
        an enum value in Data Catalog tag template enum field

SYNOPSIS
    gcloud alpha data-catalog tag-templates fields enum-values rename
        (ENUM_VALUE
          : --field=FIELD --location=LOCATION --tag-template=TAG_TEMPLATE)
        --new-id=NEW_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog tag-templates fields rename

```text
NAME
    gcloud alpha data-catalog tag-templates fields rename - rename a Data
        Catalog tag template field

SYNOPSIS
    gcloud alpha data-catalog tag-templates fields rename
        (FIELD : --location=LOCATION --tag-template=TAG_TEMPLATE)
        --new-id=NEW_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog tag-templates fields update

```text
NAME
    gcloud alpha data-catalog tag-templates fields update - update a Data
        Catalog tag template field

SYNOPSIS
    gcloud alpha data-catalog tag-templates fields update
        (FIELD : --location=LOCATION --tag-template=TAG_TEMPLATE)
        [--display-name=DISPLAY_NAME] [--enum-values=[ENUM_VALUES,...]]
        [--required] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud data-catalog tag-templates fields create`: "This command is deprecated. Please use gcloud dataplex aspect-types instead."; `gcloud data-catalog tag-templates fields delete`: "This command is deprecated. Please use gcloud dataplex aspect-types instead."; `gcloud data-catalog tag-templates fields enum-values rename`: "This command is deprecated. Please use gcloud dataplex aspect-types instead."; `gcloud data-catalog tag-templates fields rename`: "This command is deprecated. Please use gcloud dataplex aspect-types instead."; `gcloud data-catalog tag-templates fields update`: "This command is deprecated. Please use gcloud dataplex aspect-types instead.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Deprecated: the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19). The commands on this page belong to the deprecated metadata search and cataloging features; they are still in the gcloud 593.0.0 help.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples give only the `ENUM_VALUE` placeholder; the SYNOPSIS requires `(ENUM_VALUE : --field=FIELD --location=LOCATION --tag-template=TAG_TEMPLATE)` and gcloud 593.0.0 rejects the example with "Error parsing [enum_value]", so the runnable form adds `--field=FIELD --tag-template=TEMPLATE --location=us-central1`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples give only the `FIELD` placeholder; the SYNOPSIS requires `(FIELD : --location=LOCATION --tag-template=TAG_TEMPLATE)` and gcloud 593.0.0 rejects the example with "Error parsing [field]", so the runnable form adds `--tag-template=TEMPLATE --location=us-central1`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the first `create` example repeats the word `create` (`fields create create FIELD`); gcloud 593.0.0 rejects it with "unrecognized arguments: FIELD", so the runnable form drops the second `create`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/tag-templates/fields (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

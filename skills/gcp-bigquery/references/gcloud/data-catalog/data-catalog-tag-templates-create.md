---
source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/tag-templates/create
---

# gcloud data-catalog tag-templates create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud data-catalog tag-templates create

```text
NAME
    gcloud data-catalog tag-templates create - create a Data Catalog tag
        template

SYNOPSIS
    gcloud data-catalog tag-templates create
        (TAG_TEMPLATE : --location=LOCATION)
        --field=[id=ID,
          type=TYPE,display-name=DISPLAY_NAME,required=REQUIRED,...]
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    aspect-types instead.

    Create a Data Catalog tag template.

EXAMPLES
    Create a string tag template with a required string field:

        $ gcloud data-catalog tag-templates create TEMPLATE \
            --field=id=ID,display-name=DISPLAY,type=string,required=TRUE

    Create an enum tag template with an optional enum field with values 'A' and
    'B':

        $ gcloud data-catalog tag-templates create TEMPLATE \
            --field=id=ID,display-name=DISPLAY,type='enum(A|B)'

    Create a tag template with a optional string field and a required enum
    field with values 'A' and 'B':

        $ gcloud data-catalog tag-templates create TEMPLATE \
            --field=id=ID1,display-name=DISPLAY1,type=string \
            --field=id=ID2,display-name=DISPLAY2,type='enum(A|B)',\
        required=TRUE

POSITIONAL ARGUMENTS
     Tag template resource - Tag template to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument tag_template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TAG_TEMPLATE
          ID of the tag template or fully qualified identifier for the tag
          template.

          To set the tag_template attribute:
          + provide the argument tag_template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the tag template.

          To set the location attribute:
          + provide the argument tag_template on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --field=[id=ID,type=TYPE,display-name=DISPLAY_NAME,required=REQUIRED,...]
        Specification for a tag template field. This flag can be repeated to
        specify multiple fields. The following keys are allowed:

            *id*::: (Required) ID of the tag template field.

            *type*::: (Required) Type of the tag template field. Choices are
                double, string, bool, timestamp, and enum.

            To specify a string field:
              `type=string`

            To specify an enum field with values 'A' and 'B':
              `type=enum(A|B)`

            *display-name*::: Display name of the tag template field.

            *required*::: Indicates if the tag template field is required.
                Defaults to FALSE.

OPTIONAL FLAGS
     --display-name=DISPLAY_NAME
        Human-readable name for the tag template.

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

        $ gcloud alpha data-catalog tag-templates create

        $ gcloud beta data-catalog tag-templates create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud data-catalog tag-templates create TEMPLATE \
    --location=us-central1 \
    --field=id=ID,display-name=DISPLAY,type=string,required=TRUE

gcloud data-catalog tag-templates create TEMPLATE \
    --location=us-central1 \
    --field=id=ID,display-name=DISPLAY,type='enum(A|B)'

gcloud data-catalog tag-templates create TEMPLATE \
    --location=us-central1 \
    --field=id=ID1,display-name=DISPLAY1,type=string \
    --field=id=ID2,display-name=DISPLAY2,type='enum(A|B)',required=TRUE
```

### gcloud beta data-catalog tag-templates create

```text
NAME
    gcloud beta data-catalog tag-templates create - create a Data Catalog tag
        template

SYNOPSIS
    gcloud beta data-catalog tag-templates create
        (TAG_TEMPLATE : --location=LOCATION)
        --field=[id=ID,
          type=TYPE,display-name=DISPLAY_NAME,required=REQUIRED,...]
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog tag-templates create

```text
NAME
    gcloud alpha data-catalog tag-templates create - create a Data Catalog tag
        template

SYNOPSIS
    gcloud alpha data-catalog tag-templates create
        (TAG_TEMPLATE : --location=LOCATION)
        --field=[id=ID,
          type=TYPE,display-name=DISPLAY_NAME,required=REQUIRED,...]
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud data-catalog tag-templates create`: "This command is deprecated. Please use gcloud dataplex aspect-types instead.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Deprecated: the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19). The commands on this page belong to the deprecated metadata search and cataloging features; they are still in the gcloud 593.0.0 help.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples omit the location that the SYNOPSIS requires (`(TAG_TEMPLATE : --location=LOCATION)`); gcloud 593.0.0 rejects them with "Failed to find attribute [location]", so the runnable form adds `--location=us-central1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/tag-templates/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

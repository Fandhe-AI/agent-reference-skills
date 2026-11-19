---
source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/tag-templates/update
---

# gcloud data-catalog tag-templates update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud data-catalog tag-templates update

```text
NAME
    gcloud data-catalog tag-templates update - update a Data Catalog tag
        template

SYNOPSIS
    gcloud data-catalog tag-templates update
        (TAG_TEMPLATE : --location=LOCATION) [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    aspect-types instead.

    Update a Data Catalog tag template.

EXAMPLES
    Update the display name of a tag template:

        $ gcloud data-catalog tag-templates update TEMPLATE \
            --display-name=DISPLAY

POSITIONAL ARGUMENTS
     Tag template resource - Tag template to update. The arguments in this
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

FLAGS
     --display-name=DISPLAY_NAME
        New human-readable name for the tag template.

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

        $ gcloud alpha data-catalog tag-templates update

        $ gcloud beta data-catalog tag-templates update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud data-catalog tag-templates update TEMPLATE \
    --location=us-central1 \
    --display-name=DISPLAY
```

### gcloud beta data-catalog tag-templates update

```text
NAME
    gcloud beta data-catalog tag-templates update - update a Data Catalog tag
        template

SYNOPSIS
    gcloud beta data-catalog tag-templates update
        (TAG_TEMPLATE : --location=LOCATION) [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog tag-templates update

```text
NAME
    gcloud alpha data-catalog tag-templates update - update a Data Catalog tag
        template

SYNOPSIS
    gcloud alpha data-catalog tag-templates update
        (TAG_TEMPLATE : --location=LOCATION) [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud data-catalog tag-templates update`: "This command is deprecated. Please use gcloud dataplex aspect-types instead.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Deprecated: the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19). The commands on this page belong to the deprecated metadata search and cataloging features; they are still in the gcloud 593.0.0 help.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples give only the `TEMPLATE` placeholder; the SYNOPSIS requires `(TAG_TEMPLATE : --location=LOCATION)` and gcloud 593.0.0 rejects the example with "Error parsing [tag_template]", so the runnable form adds `--location=us-central1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/tag-templates/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

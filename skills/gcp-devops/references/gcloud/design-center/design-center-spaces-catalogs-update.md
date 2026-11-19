---
source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/catalogs/update
---

# gcloud design-center spaces catalogs update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud design-center spaces catalogs update

```text
NAME
    gcloud design-center spaces catalogs update - update a catalog

SYNOPSIS
    gcloud design-center spaces catalogs update
        (CATALOG : --location=LOCATION --space=SPACE)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a catalog in a space.

EXAMPLES
    To update the display name to My New Catalog Name for the catalog
    my-catalog in space my-space, project my-project and location us-central1,
    run:

        $ gcloud design-center spaces catalogs update my-catalog \
            --space=my-space --project=my-project --location=us-central1 \
            --display-name="My New Catalog Name"

    Or run:

        $ gcloud design-center spaces catalogs update \
            projects/my-project/locations/us-central1/spaces/my-space/\
        catalogs/my-catalog --display-name="My New Catalog Name"

    To update the description to My new description for the catalog my-catalog
    in space my-space, project my-project and location us-central1, run:

        $ gcloud design-center spaces catalogs update my-catalog \
            --space=my-space --project=my-project --location=us-central1 \
            --description="My new description"

POSITIONAL ARGUMENTS
     Catalog resource - Identifier. The catalog name in the following format:
     projects/$project/locations/$location/spaces/$space/catalogs/$catalog The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CATALOG
          ID of the catalog or fully qualified identifier for the catalog.

          To set the catalog attribute:
          + provide the argument catalog on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the catalog resource.

          To set the location attribute:
          + provide the argument catalog on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --space=SPACE
          The space id of the catalog resource.

          To set the space attribute:
          + provide the argument catalog on the command line with a fully
            specified name;
          + provide the argument --space on the command line.

FLAGS
     --description=DESCRIPTION
        The catalog description.

     --display-name=DISPLAY_NAME
        The catalog display name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the designcenter/v1 API. The full documentation for this
    API can be found at: http://cloud.google.com/application-design-center/docs

NOTES
    This variant is also available:

        $ gcloud alpha design-center spaces catalogs update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud design-center spaces catalogs update projects/my-project/locations/us-central1/spaces/my-space/catalogs/my-catalog \
    --display-name="My New Catalog Name"
```

### gcloud alpha design-center spaces catalogs update

```text
NAME
    gcloud alpha design-center spaces catalogs update - update a catalog

SYNOPSIS
    gcloud alpha design-center spaces catalogs update
        (CATALOG : --location=LOCATION --space=SPACE)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/catalogs/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

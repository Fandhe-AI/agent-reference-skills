---
source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/catalogs/templates/delete
---

# gcloud design-center spaces catalogs templates delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud design-center spaces catalogs templates delete

```text
NAME
    gcloud design-center spaces catalogs templates delete - delete a catalog
        template

SYNOPSIS
    gcloud design-center spaces catalogs templates delete
        (TEMPLATE : --catalog=CATALOG --location=LOCATION --space=SPACE)
        [--async] [--force] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a catalog template.

EXAMPLES
    To delete the catalog template my-template in catalog my-catalog, space
    my-space, project my-project and location us-central1, run:

        $ gcloud design-center spaces catalogs templates delete \
            my-template --catalog=my-catalog --space=my-space \
            --project=my-project --location=us-central1

    Or run:

        $ gcloud design-center spaces catalogs templates delete \
            projects/my-project/locations/us-central1/spaces/my-space/\
        catalogs/my-catalog/templates/my-template

    If your catalog template contains child resources such as catalog template
    revisions, force delete the catalog template. To force delete the catalog
    template my-template in catalog my-catalog, space my-space, project
    my-project and location us-central1, run:

        $ gcloud design-center spaces catalogs templates delete \
            my-template --catalog=my-catalog --space=my-space \
            --project=my-project --location=us-central1 --force

    To delete the catalog template my-template in catalog my-catalog, space
    my-space, project my-project and location us-central1 asynchronously, run:

        $ gcloud design-center spaces catalogs templates delete \
            my-template --catalog=my-catalog --space=my-space \
            --location=us-central1 --async

POSITIONAL ARGUMENTS
     Template resource - The catalog template name. Format:
     projects/$project/locations/$location/spaces/$space/catalogs/$catalog/templates/$template
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TEMPLATE
          ID of the template or fully qualified identifier for the template.

          To set the template attribute:
          + provide the argument template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The catalog id of the template resource.

          To set the catalog attribute:
          + provide the argument template on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --location=LOCATION
          The location id of the template resource.

          To set the location attribute:
          + provide the argument template on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --space=SPACE
          The space id of the template resource.

          To set the space attribute:
          + provide the argument template on the command line with a fully
            specified name;
          + provide the argument --space on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        If set to true, the catalog template's children are also deleted. If
        false, the catalog template is only deleted if it has no children.

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

        $ gcloud alpha design-center spaces catalogs templates delete
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud design-center spaces catalogs templates delete projects/my-project/locations/us-central1/spaces/my-space/catalogs/my-catalog/templates/my-template
```

### gcloud alpha design-center spaces catalogs templates delete

```text
NAME
    gcloud alpha design-center spaces catalogs templates delete - delete a
        catalog template

SYNOPSIS
    gcloud alpha design-center spaces catalogs templates delete
        (TEMPLATE : --catalog=CATALOG --location=LOCATION --space=SPACE)
        [--async] [--force] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/catalogs/templates/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

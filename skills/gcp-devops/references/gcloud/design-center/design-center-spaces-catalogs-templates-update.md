---
source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/catalogs/templates/update
---

# gcloud design-center spaces catalogs templates update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud design-center spaces catalogs templates update

```text
NAME
    gcloud design-center spaces catalogs templates update - update a catalog
        template

SYNOPSIS
    gcloud design-center spaces catalogs templates update
        (TEMPLATE : --catalog=CATALOG --location=LOCATION --space=SPACE)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--template-category=TEMPLATE_CATEGORY] [--type=TYPE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a catalog template.

EXAMPLES
    To update the display name to My New Template Name for the catalog template
    my-template in catalog my-catalog, space my-space, project my-project and
    location us-central1, run:

        $ gcloud design-center spaces catalogs templates update \
            my-template --catalog=my-catalog --space=my-space \
            --project=my-project --location=us-central1 \
            --display-name="My New Template Name"

POSITIONAL ARGUMENTS
     Template resource - Identifier. The catalog template name in following
     format:
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
     --description=DESCRIPTION
        The catalog template description.

     --display-name=DISPLAY_NAME
        The display name of a catalog template.

     --template-category=TEMPLATE_CATEGORY
        The category of the Application Design Center application template.
        TEMPLATE_CATEGORY must be one of:

         application-template
            Application template.
         component-template
            Component template.
         composite-solution-template
            Imported as a single, complex unit without disassembling into
            components.
         instance-template
            Instance template.

     --type=TYPE
        The Application Design Center application template type. TYPE must be
        one of:

         application
            An application template is a composition of workload/service/asset
            templates.
         asset
            An asset template can be used to provision resources that are not
            services or workloads.
         composite-application-template
            A composite application template.
         helm-application
            A helm chart based template.
         helm-chart
            A helm chart based template.
         jss-solution
            A Jumpstart Solution template.
         service
            A service template is an App Hub service.
         service-data-source
            A service data source template.
         standard-application-template
            A standard application template.
         workload
            A workload template is an App Hub workload.

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

        $ gcloud alpha design-center spaces catalogs templates update
```

### gcloud alpha design-center spaces catalogs templates update

```text
NAME
    gcloud alpha design-center spaces catalogs templates update - update a
        catalog template

SYNOPSIS
    gcloud alpha design-center spaces catalogs templates update
        (TEMPLATE : --catalog=CATALOG --location=LOCATION --space=SPACE)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--template-category=TEMPLATE_CATEGORY] [--type=TYPE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/catalogs/templates/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

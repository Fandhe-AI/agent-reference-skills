---
source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/application-templates/import
---

# gcloud design-center spaces application-templates import

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud design-center spaces application-templates import

```text
NAME
    gcloud design-center spaces application-templates import - import to an
        application template

SYNOPSIS
    gcloud design-center spaces application-templates import
        [--application-template=APPLICATION_TEMPLATE]
        [--application-template-revision-uri=APPLICATION_TEMPLATE_REVISION_URI]
        [--location=LOCATION] [--space=SPACE]
        [--shared-template-revision-uri=SHARED_TEMPLATE_REVISION_URI
          : --shared-template=SHARED_TEMPLATE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Imports to an existing application template from a given shared template or
    application template revision.

EXAMPLES
    To import from a shared template revision to the application template
    my-app-template in space my-space, project my-project and location
    us-central1, run:

        $ gcloud design-center spaces application-templates import \
            --application-template=my-app-template --space=my-space \
            --project=my-project --location=us-central1 \
            --shared-template-revision-uri=projects/my-project/locations/\
        us-central1/spaces/my-space/sharedTemplates/my-shared-template/\
        revisions/rev1

    To import from an application template revision to the application template
    my-app-template in space my-space, project my-project and location
    us-central1, run:

        $ gcloud design-center spaces application-templates import \
            --application-template=my-app-template --space=my-space \
            --project=my-project --location=us-central1 \
            --application-template-revision-uri=projects/my-project/\
        locations/us-central1/spaces/my-space/applicationTemplates/\
        another-app-template/revisions/rev2

FLAGS
     --application-template=APPLICATION_TEMPLATE
        For resources [application-template-revision-uri,
        application_template], provides fallback value for resource
        application-template attribute. When the resource's full URI path is
        not provided, application-template will fallback to this flag value.

     Revision resource - The source URI for application template revision. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --application-template-revision-uri on the
        command line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --application-template-revision-uri on the
        command line with a fully specified name;
      * provide the argument --location on the command line.

     To set the space attribute:
      * provide the argument --application-template-revision-uri on the
        command line with a fully specified name;
      * provide the argument --space on the command line.

     To set the application-template attribute:
      * provide the argument --application-template-revision-uri on the
        command line with a fully specified name;
      * provide the argument --application-template on the command line.

     --application-template-revision-uri=APPLICATION_TEMPLATE_REVISION_URI
        ID of the revision or fully qualified identifier for the revision.

        To set the revision attribute:
        * provide the argument --application-template-revision-uri on the
          command line.

     --location=LOCATION
        For resources [application-template-revision-uri, application_template,
        shared-template-revision-uri], provides fallback value for resource
        location attribute. When the resource's full URI path is not provided,
        location will fallback to this flag value.

     --space=SPACE
        For resources [application-template-revision-uri, application_template,
        shared-template-revision-uri], provides fallback value for resource
        space attribute. When the resource's full URI path is not provided,
        space will fallback to this flag value.

     Revision resource - The source URI for catalog template. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument --shared-template-revision-uri on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --shared-template-revision-uri on the command
        line with a fully specified name;
      * provide the argument --location on the command line.

     To set the space attribute:
      * provide the argument --shared-template-revision-uri on the command
        line with a fully specified name;
      * provide the argument --space on the command line.

     --shared-template-revision-uri=SHARED_TEMPLATE_REVISION_URI
        ID of the revision or fully qualified identifier for the revision.

        To set the revision attribute:
        * provide the argument --shared-template-revision-uri on the command
          line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --shared-template=SHARED_TEMPLATE
        The sharedTemplate id of the revision resource.

        To set the shared-template attribute:
        * provide the argument --shared-template-revision-uri on the command
          line with a fully specified name;
        * provide the argument --shared-template on the command line.

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

        $ gcloud alpha design-center spaces application-templates import
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud design-center spaces application-templates import \
    --application-template=my-app-template \
    --space=my-space \
    --project=my-project \
    --location=us-central1 \
    --shared-template-revision-uri=projects/my-project/locations/us-central1/spaces/my-space/sharedTemplates/my-shared-template/revisions/rev1

gcloud design-center spaces application-templates import \
    --application-template=my-app-template \
    --space=my-space \
    --project=my-project \
    --location=us-central1 \
    --application-template-revision-uri=projects/my-project/locations/us-central1/spaces/my-space/applicationTemplates/another-app-template/revisions/rev2
```

### gcloud alpha design-center spaces application-templates import

```text
NAME
    gcloud alpha design-center spaces application-templates import - import to
        an application template

SYNOPSIS
    gcloud alpha design-center spaces application-templates import
        [--application-template=APPLICATION_TEMPLATE]
        [--application-template-revision-uri=APPLICATION_TEMPLATE_REVISION_URI]
        [--location=LOCATION] [--space=SPACE]
        [--shared-template-revision-uri=SHARED_TEMPLATE_REVISION_URI
          : --shared-template=SHARED_TEMPLATE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/application-templates/import (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

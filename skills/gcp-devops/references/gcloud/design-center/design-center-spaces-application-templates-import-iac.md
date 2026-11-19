---
source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/application-templates/import-iac
---

# gcloud design-center spaces application-templates import-iac

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud design-center spaces application-templates import-iac

```text
NAME
    gcloud design-center spaces application-templates import-iac - import
        Infrastructure as Code (IaC) for an Application Template

SYNOPSIS
    gcloud design-center spaces application-templates import-iac
        (APPLICATION_TEMPLATE : --location=LOCATION --space=SPACE)
        (--gcs-uri=GCS_URI | --iac-module-from-file=PATH_TO_FILE)
        [--allow-partial-import] [--validate-iac] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Import Infrastructure as Code (IaC) for a Design Center Application
    Template.

EXAMPLES
    To import IaC from a Google Cloud Storage URI into the application template
    my-template in space dev-space and location us-central1, run:

        $ gcloud design-center spaces application-templates import-iac \
            my-template --location=us-central1 --space=dev-space \
            --gcs-uri=gs://my-bucket/iac

    To import IaC from a local YAML file named iac_module.yaml into the
    application template my-template in space dev-space and location
    us-central1, run:

        $ gcloud design-center spaces application-templates import-iac \
            my-template --location=us-central1 --space=dev-space \
            --iac-module-from-file=iac_module.yaml

    To import IaC from a Google Cloud Storage URI and allow partial import of
    valid edits into the application template my-template, run:

        $ gcloud design-center spaces application-templates import-iac \
            my-template --location=us-central1 --space=dev-space \
            --gcs-uri=gs://my-bucket/iac --allow-partial-import

    To import IaC from a local YAML file and allow partial import of valid
    edits into the application template my-template, run:

        $ gcloud design-center spaces application-templates import-iac \
            my-template --location=us-central1 --space=dev-space \
            --iac-module-from-file=iac_module.yaml --allow-partial-import

    To validate IaC from a Google Cloud Storage URI without importing into the
    application template my-template, run:

        $ gcloud design-center spaces application-templates import-iac \
            my-template --location=us-central1 --space=dev-space \
            --gcs-uri=gs://my-bucket/iac --validate-iac

    To validate IaC from a local YAML file without importing into the
    application template my-template, run:

        $ gcloud design-center spaces application-templates import-iac \
            my-template --location=us-central1 --space=dev-space \
            --iac-module-from-file=iac_module.yaml --validate-iac

POSITIONAL ARGUMENTS
     Application template resource - The application template to import IaC
     into IaC. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument APPLICATION_TEMPLATE on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       APPLICATION_TEMPLATE
          ID of the application_template or fully qualified identifier for the
          application_template.

          To set the application_template_id attribute:
          + provide the argument APPLICATION_TEMPLATE on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the application_template.

          To set the location attribute:
          + provide the argument APPLICATION_TEMPLATE on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --space=SPACE
          The ID of the space.

          To set the space attribute:
          + provide the argument APPLICATION_TEMPLATE on the command line
            with a fully specified name;
          + provide the argument --space on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --gcs-uri=GCS_URI
          The Cloud Storage URI of the Terraform code (e.g.,
          gs://my-bucket/iac).

       --iac-module-from-file=PATH_TO_FILE
          Path to a local YAML or JSON file containing the IaC module
          definition. Use a full or relative path to a local file containing
          the value of iac_module.

OPTIONAL FLAGS
     --allow-partial-import
        If set, partially import valid IaC changes and ignore invalid ones.

     --validate-iac
        Validate the IaC without performing the import.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the designcenter/v1alpha API. The full documentation for
    this API can be found at:
    http://cloud.google.com/application-design-center/docs

NOTES
    This variant is also available:

        $ gcloud alpha design-center spaces application-templates import-iac
```

### gcloud alpha design-center spaces application-templates import-iac

```text
NAME
    gcloud alpha design-center spaces application-templates import-iac - import
        Infrastructure as Code (IaC) for an Application Template

SYNOPSIS
    gcloud alpha design-center spaces application-templates import-iac
        (APPLICATION_TEMPLATE : --location=LOCATION --space=SPACE)
        (--gcs-uri=GCS_URI | --iac-module-from-file=PATH_TO_FILE)
        [--allow-partial-import] [--validate-iac] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/application-templates/import-iac (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/shared-templates/revisions/describe
---

# gcloud design-center spaces shared-templates revisions describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud design-center spaces shared-templates revisions describe

```text
NAME
    gcloud design-center spaces shared-templates revisions describe - describe
        a shared template revision

SYNOPSIS
    gcloud design-center spaces shared-templates revisions describe REVISION
        [--location=LOCATION] [--shared-template=SHARED_TEMPLATE]
        [--google-catalog | --project=PROJECT --space=SPACE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a shared template revision.

EXAMPLES
    To describe the shared template revision my-revision in shared template
    my-shared-template, space my-space, project my-project and location
    us-central1, run:

        $ gcloud design-center spaces shared-templates revisions describe \
            my-revision --shared-template=my-shared-template \
            --space=my-space --project=my-project --location=us-central1

    Or run:

        $ gcloud design-center spaces shared-templates revisions describe \
            projects/my-project/locations/us-central1/spaces/my-space/\
        sharedTemplates/my-shared-template/revisions/my-revision

    To describe a shared template revision my-revision in shared template
    google-template from the Google Catalog and location us-central1, run:

        $ gcloud design-center spaces shared-templates revisions describe \
            my-revision --shared-template=google-template --google-catalog \
            --location=us-central1

POSITIONAL ARGUMENTS
     REVISION
        ID of the revision or fully qualified identifier for the
        sharedTemplateRevision. Format:
        projects/$project/locations/$location/spaces/$space/sharedTemplates/$sharedTemplate/revisions/$revision
        To set the revision attribute:
        * provide the fully qualified identifier revision on the command
          line;
        * provide the argument revision which represents the revision id and
          the other arguments --shared-template, --location, --project, --space
          or --google-catalog on the command line.

FLAGS
     --location=LOCATION
        The location id of the revision resource.

        To set the location attribute:
        * provide the argument revision on the command line with a fully
          specified name;
        * provide the argument --location on the command line.

     --shared-template=SHARED_TEMPLATE
        The sharedTemplate id of the revision resource.

        To set the shared-template attribute:
        * provide the argument revision on the command line with a fully
          specified name;
        * provide the argument --shared-template on the command line.

     At most one of these can be specified:

       --google-catalog
          If provided, describes a shared template revision from the Google
          Catalog. This sets the project to "gcpdesigncenter" and space to
          "googlespace".

       Or at least one of these can be specified:

         Specify --project and --space for custom shared templates.

         --project=PROJECT
            The project id of the revision resource.

            To set the project attribute:
            - provide the argument revision on the command line with a fully
              specified name;
            - provide the argument --project on the command line;
            - set the property core/project.

         --space=SPACE
            The space id of the revision resource.

            To set the space attribute:
            - provide the argument revision on the command line with a fully
              specified name;
            - provide the argument --space on the command line.

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

        $ gcloud alpha design-center spaces shared-templates revisions \
            describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud design-center spaces shared-templates revisions describe projects/my-project/locations/us-central1/spaces/my-space/sharedTemplates/my-shared-template/revisions/my-revision
```

### gcloud alpha design-center spaces shared-templates revisions describe

```text
NAME
    gcloud alpha design-center spaces shared-templates revisions describe -
        describe a shared template revision

SYNOPSIS
    gcloud alpha design-center spaces shared-templates revisions describe
        REVISION [--location=LOCATION] [--shared-template=SHARED_TEMPLATE]
        [--google-catalog | --project=PROJECT --space=SPACE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/shared-templates/revisions/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

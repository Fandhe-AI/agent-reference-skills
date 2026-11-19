---
source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/create
---

# gcloud design-center spaces create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud design-center spaces create

```text
NAME
    gcloud design-center spaces create - create a space

SYNOPSIS
    gcloud design-center spaces create (SPACE : --location=LOCATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--enable-gcp-shared-templates] [--gcs-bucket=GCS_BUCKET]
        [--tags=[TAGS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a space.

EXAMPLES
    To create the space my-space in project my-project and location
    us-central1, run:

        $ gcloud design-center spaces create my-space --project=my-project \
            --location=us-central1

    Or run:

        $ gcloud design-center spaces create \
            projects/my-project/locations/us-central1/spaces/my-space

    To create the space my-space in project my-project and location us-central1
    with display name, description, and enable google templates, run:

        $ gcloud design-center spaces create my-space --project=my-project \
            --location=us-central1 --display-name=my-display-name \
            --description=my-description --enable-gcp-shared-templates

POSITIONAL ARGUMENTS
     Space resource - Identifier. The space name. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument space on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SPACE
          ID of the space or fully qualified identifier for the space.

          To set the space attribute:
          + provide the argument space on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the space resource.

          To set the location attribute:
          + provide the argument space on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --description=DESCRIPTION
        Description for the space.

     --display-name=DISPLAY_NAME
        Display name for the space.

     Arguments for the enable gcp shared templates.

     --enable-gcp-shared-templates
        Flag to enable Google opinionated shared templates.

     --gcs-bucket=GCS_BUCKET
        An existing Google Cloud Storage bucket that you want to use instead of
        creating a new bucket during Application Design Center setup. If not
        provided, a default bucket is created during setup. The bucket must
        exist in the same project as the space. If the bucket name does not
        exist in the same project as the space, the request fails with an
        INVALID_ARGUMENT error. If you do not have access to the bucket, the
        request fails with a PERMISSION_DENIED error. Format: {$bucket_name}
        For example, if the Cloud Storage bucket URI is gs:\/\/{$bucket_name},
        the format is {$bucket_name}.

     --tags=[TAGS,...]
        Tags are key/values bound to space resource. Example:
        "123/environment": "production" "123/costCenter": "marketing". For more
        information on tag creation and management, see
        https://cloud.google.com/resource-manager/docs/tags/tags-overview.

         KEY
            Sets KEY value.

         VALUE
            Sets VALUE value.

        Shorthand Example:

            --tags=string=string

        JSON Example:

            --tags='{"string": "string"}'

        File Example:

            --tags=path_to_file.(yaml|json)

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

        $ gcloud alpha design-center spaces create
```

### gcloud alpha design-center spaces create

```text
NAME
    gcloud alpha design-center spaces create - create a space

SYNOPSIS
    gcloud alpha design-center spaces create (SPACE : --location=LOCATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--enable-gcp-shared-templates] [--gcs-bucket=GCS_BUCKET]
        [--tags=[TAGS,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

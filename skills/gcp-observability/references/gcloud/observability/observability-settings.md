---
source: https://docs.cloud.google.com/sdk/gcloud/reference/observability/settings
---

# gcloud observability settings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud observability settings describe

```text
NAME
    gcloud observability settings describe - show details of Observability
        settings on a resource

SYNOPSIS
    gcloud observability settings describe
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of Observability settings on a resource.

EXAMPLES
    The following command describes settings on a project named sample-project,
    and in location global:

        $ gcloud observability settings describe --project=sample-project \
            --location=global

    The following command describes settings on a folder with ID FOLDER_ID, and
    in location global:

        $ gcloud observability settings describe --folder=FOLDER_ID \
            --location=global

    The following command describes settings on an organization with ID
    ORGANIZATION_ID, and in location global:

        $ gcloud observability settings describe \
            --organization=ORGANIZATION_ID --location=global

REQUIRED FLAGS
     Location resource - The project/organization/folder location for which the
     settings are to be described. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [observability.projects.locations,
        observability.folders.locations,
        observability.organizations.locations].

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --folder=FOLDER
          The id of the folder

          To set the folder attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type [observability.folders.locations].

       --organization=ORGANIZATION
          The id of the organization

          To set the organization attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [observability.organizations.locations].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability settings describe
```

### gcloud observability settings update

```text
NAME
    gcloud observability settings update - update Observability settings
        configured on a project, folder, or organization

SYNOPSIS
    gcloud observability settings update
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--async] [--default-storage-location=DEFAULT_STORAGE_LOCATION]
        [--kms-key-name=KMS_KEY_NAME] [--update-mask=UPDATE_MASK]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the Observability settings configured for a specified project,
    folder, or organization.

EXAMPLES
    The following command updates Observability settings for the project named
    sample-project in location global:

        $ gcloud observability settings update --project=sample-project \
            --location=global --update-mask=default_storage_location \
            --default-storage-location="us"

REQUIRED FLAGS
     Location resource - The project/organization/folder location for which the
     settings are to be updated. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [observability.projects.locations,
        observability.folders.locations,
        observability.organizations.locations].

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --folder=FOLDER
          The id of the folder

          To set the folder attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type [observability.folders.locations].

       --organization=ORGANIZATION
          The id of the organization

          To set the organization attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [observability.organizations.locations].

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --default-storage-location=DEFAULT_STORAGE_LOCATION
        Updated default storage location.

     --kms-key-name=KMS_KEY_NAME
        Updated kms key name.

     --update-mask=UPDATE_MASK
        Comma-separated string containing list of fields to be updated.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability settings update
```

### gcloud beta observability settings describe

```text
NAME
    gcloud beta observability settings describe - show details of Observability
        settings on a resource

SYNOPSIS
    gcloud beta observability settings describe
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability settings update

```text
NAME
    gcloud beta observability settings update - update Observability settings
        configured on a project, folder, or organization

SYNOPSIS
    gcloud beta observability settings update
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--async] [--default-storage-location=DEFAULT_STORAGE_LOCATION]
        [--kms-key-name=KMS_KEY_NAME] [--update-mask=UPDATE_MASK]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/observability/settings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

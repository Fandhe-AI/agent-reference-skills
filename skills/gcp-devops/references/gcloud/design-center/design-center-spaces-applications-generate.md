---
source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/applications/generate
---

# gcloud design-center spaces applications generate

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud design-center spaces applications generate

```text
NAME
    gcloud design-center spaces applications generate - generate IaC for an
        application

SYNOPSIS
    gcloud design-center spaces applications generate
        (APPLICATION : --space=SPACE) [--gcs-uri=GCS_URI]
        [--iac-format=IAC_FORMAT] [--location=LOCATION]
        [--artifact-location-gcs-uri=ARTIFACT_LOCATION_GCS_URI
          | [--developer-connect-export-config-dir=DEVELOPER_CONNECT_EXPORT_CONFIG_DIR (--developer-connect-export-config-repo-uri=DEVELOPER_CONNECT_EXPORT_CONFIG_REPO_URI : --connection=CONNECTION) : --developer-connect-export-config-branch=DEVELOPER_CONNECT_EXPORT_CONFIG_BRANCH]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Generates Terraform files for an application in a space.

EXAMPLES
    To generate IaC for the application my-application in space my-space,
    project my-project and location us-central1, run:

        $ gcloud design-center spaces applications generate my-application \
            --space=my-space --project=my-project --location=us-central1

    Or run:

        $ gcloud design-center spaces applications generate \
            projects/my-project/locations/us-central1/spaces/my-space/\
        applications/my-application

    To generate IaC for the application my-application in space my-space,
    project my-project and location us-central1 and save to Cloud Storage
    bucket my-bucket, run:

        $ gcloud design-center spaces applications generate my-application \
            --space=my-space --project=my-project --location=us-central1 \
            --gcs-uri=gs://my-bucket

    To generate IaC for the application my-application in Terraform format in
    space my-space, project my-project and location us-central1, run:

        $ gcloud design-center spaces applications generate my-application \
            --space=my-space --project=my-project --location=us-central1 \
            --iac-format=terraform

POSITIONAL ARGUMENTS
     Application resource - The name of the application. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument application on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument application on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       APPLICATION
          ID of the application or fully qualified identifier for the
          application.

          To set the application attribute:
          + provide the argument application on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --space=SPACE
          The space id of the application resource.

          To set the space attribute:
          + provide the argument application on the command line with a fully
            specified name;
          + provide the argument --space on the command line.

FLAGS
     --gcs-uri=GCS_URI
        The Cloud Storage URI to write the generated IaC to.

        DEPRECATED: Use the 'artifact_location' field instead.

     --iac-format=IAC_FORMAT
        The IaC format to generate. IAC_FORMAT must be one of:

         helm
            IaC format is HELM.
         terraform
            IaC format is Terraform.

     --location=LOCATION
        For resources [application, developer-connect-export-config-repo-uri],
        provides fallback value for resource location attribute. When the
        resource's full URI path is not provided, location will fallback to
        this flag value.

     Arguments for the location.

     At most one of these can be specified:

       --artifact-location-gcs-uri=ARTIFACT_LOCATION_GCS_URI
          The Cloud Storage URI for storing the generated IaC.

       Or at least one of these can be specified:

         Through Developer Connect, defines a location where content such as
         Infrastructure as Code (IaC) is stored.

         --developer-connect-export-config-dir=DEVELOPER_CONNECT_EXPORT_CONFIG_DIR
            Directory, relative to the source repo, where content such as
            Infrastructure as Code (IaC) will be stored. This must be a
            relative path.To specify the root directory, use '/'. If the path
            or any subdirectories do not exist, they will be created.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --developer-connect-export-config-branch=DEVELOPER_CONNECT_EXPORT_CONFIG_BRANCH
            The branch in repo to which the content such as Infrastructure as
            Code (IaC) should be written to. If empty, Application Design
            Center will create a branch and push the changes.

         GitRepositoryLink resource - The Developer Connect Git repository
         link, formatted as
         projects/*/locations/*/connections/*/gitRepositoryLinks/*. The
         arguments in this group can be used to specify the attributes of this
         resource. (NOTE) Some attributes are not given arguments in this group
         but can be set in other ways.

         To set the project attribute:
          - provide the argument --developer-connect-export-config-repo-uri
            on the command line with a fully specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         To set the location attribute:
          - provide the argument --developer-connect-export-config-repo-uri
            on the command line with a fully specified name;
          - provide the argument --location on the command line.

         This must be specified.

           --developer-connect-export-config-repo-uri=DEVELOPER_CONNECT_EXPORT_CONFIG_REPO_URI
              ID of the gitRepositoryLink or fully qualified identifier for the
              gitRepositoryLink.

              To set the git-repository-link attribute:
              o provide the argument
                --developer-connect-export-config-repo-uri on the command line.

              This flag argument must be specified if any of the other
              arguments in this group are specified.

           --connection=CONNECTION
              The connection id of the gitRepositoryLink resource.

              To set the connection attribute:
              o provide the argument
                --developer-connect-export-config-repo-uri on the command line
                with a fully specified name;
              o provide the argument --connection on the command line.

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

        $ gcloud alpha design-center spaces applications generate
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud design-center spaces applications generate projects/my-project/locations/us-central1/spaces/my-space/applications/my-application
```

### gcloud alpha design-center spaces applications generate

```text
NAME
    gcloud alpha design-center spaces applications generate - generate IaC for
        an application

SYNOPSIS
    gcloud alpha design-center spaces applications generate
        (APPLICATION : --space=SPACE) [--gcs-uri=GCS_URI]
        [--iac-format=IAC_FORMAT] [--location=LOCATION]
        [--artifact-location-gcs-uri=ARTIFACT_LOCATION_GCS_URI
          | [--developer-connect-export-config-dir=DEVELOPER_CONNECT_EXPORT_CONFIG_DIR (--developer-connect-export-config-repo-uri=DEVELOPER_CONNECT_EXPORT_CONFIG_REPO_URI : --connection=CONNECTION) : --developer-connect-export-config-branch=DEVELOPER_CONNECT_EXPORT_CONFIG_BRANCH]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/applications/generate (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

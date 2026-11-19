---
source: https://docs.cloud.google.com/sdk/gcloud/reference/infra-manager/previews
---

# gcloud infra-manager previews

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud infra-manager previews create

```text
NAME
    gcloud infra-manager previews create - create a preview

SYNOPSIS
    gcloud infra-manager previews create [PREVIEW]
        [--annotations=[KEY=VALUE,...]]
        [--artifacts-gcs-bucket=ARTIFACTS_GCS_BUCKET] [--async]
        [--deployment=DEPLOYMENT] [--labels=[KEY=VALUE,...]]
        [--location=LOCATION] [--preview-mode=PREVIEW_MODE]
        [--service-account=SERVICE_ACCOUNT]
        [--tf-version-constraint=TF_VERSION_CONSTRAINT]
        [--worker-pool=WORKER_POOL]
        [--gcs-source=GCS_SOURCE | --git-source-directory=GIT_SOURCE_DIRECTORY
          --git-source-ref=GIT_SOURCE_REF --git-source-repo=GIT_SOURCE_REPO
          | --ignore-file=IGNORE_FILE
          --local-source=LOCAL_SOURCE --input-values=[KEY=VALUE,...]
          | --inputs-file=INPUTS_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a preview.

EXAMPLES
    Create a preview named my-preview from a storage my-bucket:

        $ gcloud infra-manager previews create \
            projects/p1/locations/us-central1/previews/my-preview \
            --gcs-source="gs://my-bucket" \
            --input-values="project=p1,region=us-central1"

    Create a preview named my-preview from git repo
    "https://github.com/examples/repository.git", "staging/compute" folder,
    "mainline" branch:

        $ gcloud infra-manager previews create \
            projects/p1/locations/us-central1/previews/my-preview \
            --git-source-repo="https://github.com/examples/repository.git" \
            --git-source-directory="staging/compute" \
            --git-source-ref="mainline"

POSITIONAL ARGUMENTS
     Preview resource - the preview to be used as parent. It is optional and
     will be generated if not specified with a fully specified name. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument PREVIEW on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument PREVIEW on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property infra-manager/location.

     PREVIEW
        ID of the preview or fully qualified identifier for the preview.

        To set the preview attribute:
        * provide the argument PREVIEW on the command line.

FLAGS
     --annotations=[KEY=VALUE,...]
        Preview annotations cannot be updated after creation.

     --artifacts-gcs-bucket=ARTIFACTS_GCS_BUCKET
        user-defined location of Cloud Build logs, artifacts, and Terraform
        state files in Google Cloud Storage. Format: gs://{bucket}/{folder} A
        default bucket will be bootstrapped if the field is not set or empty

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --deployment=DEPLOYMENT
        Deployment reference for preview.

     --labels=[KEY=VALUE,...]
        Preview labels cannot be updated after creation.

     Location resource - the location to be used as parent. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property infra-manager/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property infra-manager/location.

     --preview-mode=PREVIEW_MODE
        Preview mode to set it to either default or delete.

     --service-account=SERVICE_ACCOUNT
        User-specified Service Account (SA) to be used as credential to manage
        resources. Format:
        projects/{projectID}/serviceAccounts/{serviceAccount}

     --tf-version-constraint=TF_VERSION_CONSTRAINT
        User-specified Terraform version constraint, for example "=1.3.10".

     --worker-pool=WORKER_POOL
        User-specified Worker Pool resource in which the Cloud Build job will
        execute. Format:
        projects/{project}/locations/{location}/workerPools/{workerPoolId}

     At most one of these can be specified:

       --gcs-source=GCS_SOURCE
          URI of an object in Google Cloud Storage. e.g. gs://{bucket}/{object}

          Examples:

          Create a deployment from a storage my-bucket:

              $ gcloud infra-manager previews create \
                  projects/p1/location/us-central1/deployments/my-deployment \
                  --gcs-source="gs://my-bucket"

       Or at least one of these can be specified:

         --git-source-directory=GIT_SOURCE_DIRECTORY
            Subdirectory inside the repository. Example: 'staging/my-package'

            Use in conjunction with --git-source-repo and --git-source-ref

            Examples:

            Create a deployment from the
            "https://github.com/examples/repository.git" repo,
            "staging/compute" folder, "mainline" branch:

                $ gcloud infra-manager previews create \
                    projects/p1/location/us-central1/deployments/my-deployment \
                    --git-source-repo="https://github.com/examples/repository.git"
                  --git-source-directory="staging/compute" --git-source-ref="mainline"

         --git-source-ref=GIT_SOURCE_REF
            Subdirectory inside the repository. Example: 'staging/my-package'

            Use in conjunction with --git-source-repo and
            --git-source-directory

            Examples:

            Create a deployment from the
            "https://github.com/examples/repository.git" repo,
            "staging/compute" folder, "mainline" branch:

                $ gcloud infra-manager previews create \
                    projects/p1/location/us-central1/deployments/my-deployment \
                    --git-source-repo="https://github.com/examples/repository.git"
                  --git-source-directory="staging/compute" --git-source-ref="mainline"

         --git-source-repo=GIT_SOURCE_REPO
            Repository URL. Example:
            'https://github.com/examples/repository.git'

            Use in conjunction with --git-source-directory and --git-source_ref

            Examples:

            Create a deployment from the
            "https://github.com/examples/repository.git" repo,
            "staging/compute" folder, "mainline" branch:

                $ gcloud infra-manager previews create \
                    projects/p1/location/us-central1/deployments/my-deployment \
                    --git-source-repo="https://github.com/examples/repository.git"
                  --git-source-directory="staging/compute" --git-source-ref="mainline"

       Or at least one of these can be specified:

         --ignore-file=IGNORE_FILE
            Override the .gcloudignore file and use the specified file instead.
            See gcloud topic gcloudignore for more information.

         --local-source=LOCAL_SOURCE
            Local storage path where config files are stored. When using this
            option, Terraform config file references outside this storage path
            is not supported. e.g. ./path/to/blueprint

            Examples:

            Create a deployment from a local storage path ./path/to/blueprint:

                $ gcloud infra-manager previews create \
                    projects/p1/location/us-central1/deployments/my-deployment \
                    --local-source="./path/to/blueprint"

     At most one of these can be specified:

       --input-values=[KEY=VALUE,...]
          Input variable values for the Terraform blueprint. It only accepts
          (key, value) pairs where value is a scalar value.

          Examples:

          Pass input values on command line:

              $ gcloud infra-manager previews create \
                  projects/p1/location/us-central1/deployments/my-deployment \
                  --gcs-source="gs://my-bucket" \
                  --input-values=projects=p1,region=r

       --inputs-file=INPUTS_FILE
          A .tfvars file containing terraform variable values. --inputs-file
          flag is supported for python version 3.6 and above.

          Examples:

          Pass input values on the command line:

              $ gcloud infra-manager previews create \
                  projects/p1/location/us-central1/deployments/my-deployment \
                  --gcs-source="gs://my-bucket" \
                  --inputs-file=path-to-tfvar-file.tfvar

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud infra-manager previews delete

```text
NAME
    gcloud infra-manager previews delete - delete previews

SYNOPSIS
    gcloud infra-manager previews delete (PREVIEW : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a preview

EXAMPLES
    To delete the preview example-preview at location us-central1, run:

        $ gcloud infra-manager previews delete \
            projects/example-project/locations/us-central1/previews/\
        example-preview

POSITIONAL ARGUMENTS
     Preview resource - previews TBD The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument preview on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PREVIEW
          ID of the preview or fully qualified identifier for the preview.

          To set the preview attribute:
          + provide the argument preview on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          locations TBD

          To set the location attribute:
          + provide the argument preview on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property infra-manager/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the config/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/infrastructure-manager/docs
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud infra-manager previews delete projects/example-project/locations/us-central1/previews/example-preview
```

### gcloud infra-manager previews describe

```text
NAME
    gcloud infra-manager previews describe - describe previews

SYNOPSIS
    gcloud infra-manager previews describe (PREVIEW : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a preview

EXAMPLES
    To describe a preview example-preview in project p1 at location
    us-central1, run:

        $ gcloud infra-manager previews describe \
            projects/p1/locations/us-central1/previews/example-preview

POSITIONAL ARGUMENTS
     Preview resource - The preview to describe The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument preview on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PREVIEW
          ID of the preview or fully qualified identifier for the preview.

          To set the preview attribute:
          + provide the argument preview on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          locations TBD

          To set the location attribute:
          + provide the argument preview on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property infra-manager/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the config/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/infrastructure-manager/docs
```

### gcloud infra-manager previews export

```text
NAME
    gcloud infra-manager previews export - export preview results

SYNOPSIS
    gcloud infra-manager previews export (PREVIEW : --location=LOCATION)
        [--file=FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command generates a signed url to download a preview results.

EXAMPLES
    Export preview results for my-preview:

        $ gcloud infra-manager previews export \
            projects/p1/locations/us-central1/previews/my-preview

POSITIONAL ARGUMENTS
     Preview resource - the preview to be used as parent. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument PREVIEW on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PREVIEW
          ID of the preview or fully qualified identifier for the preview.

          To set the preview attribute:
          + provide the argument PREVIEW on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the preview.

          To set the location attribute:
          + provide the argument PREVIEW on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property infra-manager/location.

FLAGS
     --file=FILE
        File name for preview export artifacts. It is optional and it specifies
        the filename or complete path for the downloaded preview export
        artifacts. If only a file path is provided, the artifacts will be
        downloaded as "preview" within that directory. If a filename is
        included, the artifacts will be downloaded with that name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud infra-manager previews list

```text
NAME
    gcloud infra-manager previews list - list previews

SYNOPSIS
    gcloud infra-manager previews list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List previews

EXAMPLES
    To list all previews at location us-central1, run:

        $ gcloud infra-manager previews list --location=us-central1

FLAGS
     Location resource - Location to list previews This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property infra-manager/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property infra-manager/location.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the config/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/infrastructure-manager/docs
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/infra-manager/previews (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

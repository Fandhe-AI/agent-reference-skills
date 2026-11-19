---
source: https://docs.cloud.google.com/sdk/gcloud/reference/infra-manager/deployments
---

# gcloud infra-manager deployments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud infra-manager deployments apply

```text
NAME
    gcloud infra-manager deployments apply - create or update a deployment

SYNOPSIS
    gcloud infra-manager deployments apply (DEPLOYMENT : --location=LOCATION)
        [--annotations=[KEY=VALUE,...]]
        [--artifacts-gcs-bucket=ARTIFACTS_GCS_BUCKET] [--async]
        [--import-existing-resources] [--labels=[KEY=VALUE,...]]
        [--quota-validation=QUOTA_VALIDATION]
        [--service-account=SERVICE_ACCOUNT]
        [--tf-version-constraint=TF_VERSION_CONSTRAINT]
        [--worker-pool=WORKER_POOL]
        [--gcs-source=GCS_SOURCE | --git-source-directory=GIT_SOURCE_DIRECTORY
          --git-source-ref=GIT_SOURCE_REF --git-source-repo=GIT_SOURCE_REPO
          | --ignore-file=IGNORE_FILE
          --local-source=LOCAL_SOURCE --input-values=[KEY=VALUE,...]
          | --inputs-file=INPUTS_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates a deployment when it already exists, otherwise the
    deployment will be created.

EXAMPLES
    Create a deployment named my-deployment from a storage my-bucket:

        $ gcloud infra-manager deployments apply \
            projects/p1/locations/us-central1/deployments/my-deployment \
            --gcs-source="gs://my-bucket" \
            --input-values="project=p1,region=us-central1"

    Create a deployment named my-deployment from git repo
    "https://github.com/examples/repository.git", "staging/compute" folder,
    "mainline" branch:

        $ gcloud infra-manager deployments apply \
            projects/p1/locations/us-central1/deployments/my-deployment \
            --git-source-repo="https://github.com/examples/repository.git" \
            --git-source-directory="staging/compute" \
            --git-source-ref="mainline"

    Update a deployment's labels:

        $ gcloud infra-manager deployments apply \
            projects/p1/locations/us-central1/deployments/my-deployment \
            --git-source-repo="https://github.com/examples/repository.git" \
            --git-source-directory="staging/compute" \
            --git-source-ref="mainline" --labels="env=prod,team=finance"

POSITIONAL ARGUMENTS
     Deployment resource - the deployment to create or update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument DEPLOYMENT on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DEPLOYMENT
          ID of the deployment or fully qualified identifier for the
          deployment.

          To set the deployment attribute:
          + provide the argument DEPLOYMENT on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the deployment.

          To set the location attribute:
          + provide the argument DEPLOYMENT on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property infra-manager/location.

FLAGS
     --annotations=[KEY=VALUE,...]
        Annotations to apply to the deployment. Existing values are
        overwritten. To retain the existing annotations on a deployment, do not
        specify this flag.

        Examples:

        Update annotations for an existing deployment:

            $ gcloud infra-manager deployments apply \
                projects/p1/locations/us-central1/deployments/my-deployment \
                --gcs-source="gs://my-bucket" \
                --annotations="env=prod,team=finance"

        Clear annotations for an existing deployment:

            $ gcloud infra-manager deployments apply \
                projects/p1/locations/us-central1/deployments/my-deployment \
                --gcs-source="gs://my-bucket" --annotations=""

        Add an annotation to an existing deployment:

            First, fetch the current annotations using the `describe` command, then follow the
            preceding example for updating annotations.

     --artifacts-gcs-bucket=ARTIFACTS_GCS_BUCKET
        user-defined location of Cloud Build logs, artifacts, and Terraform
        state files in Google Cloud Storage. Format: gs://{bucket}/{folder} A
        default bucket will be bootstrapped if the field is not set or empty

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --import-existing-resources
        By default, Infrastructure Manager will return a failure when Terraform
        encounters a 409 code (resource conflict error) during actuation. If
        this flag is set to true, Infrastructure Manager will instead attempt
        to automatically import the resource into the Terraform state (for
        supported resource types) and continue actuation.

     --labels=[KEY=VALUE,...]
        Labels to apply to the deployment. Existing values are overwritten. To
        retain the existing labels on a deployment, do not specify this flag.

        Examples:

        Update labels for an existing deployment:

            $ gcloud infra-manager deployments apply \
                projects/p1/locations/us-central1/deployments/my-deployment \
                --gcs-source="gs://my-bucket" --labels="env=prod,team=finance"

        Clear labels for an existing deployment:

            $ gcloud infra-manager deployments apply \
                projects/p1/locations/us-central1/deployments/my-deployment \
                --gcs-source="gs://my-bucket" --labels=""

        Add a label to an existing deployment:

            First, fetch the current labels using the `describe` command, then follow the
            preceding example for updating labels.

     --quota-validation=QUOTA_VALIDATION
        Input to control quota checks for resources in terraform configuration
        files. There are limited resources on which quota validation applies.
        Supported values are QUOTA_VALIDATION_UNSPECIFIED, ENABLED, ENFORCED

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

              $ gcloud infra-manager deployments apply \
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

                $ gcloud infra-manager deployments apply \
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

                $ gcloud infra-manager deployments apply \
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

                $ gcloud infra-manager deployments apply \
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

                $ gcloud infra-manager deployments apply \
                    projects/p1/location/us-central1/deployments/my-deployment \
                    --local-source="./path/to/blueprint"

     At most one of these can be specified:

       --input-values=[KEY=VALUE,...]
          Input variable values for the Terraform blueprint. It only accepts
          (key, value) pairs where value is a scalar value.

          Examples:

          Pass input values on command line:

              $ gcloud infra-manager deployments apply \
                  projects/p1/location/us-central1/deployments/my-deployment \
                  --gcs-source="gs://my-bucket" \
                  --input-values=projects=p1,region=r

       --inputs-file=INPUTS_FILE
          A .tfvars file containing terraform variable values. --inputs-file
          flag is supported for python version 3.6 and above.

          Examples:

          Pass input values on the command line:

              $ gcloud infra-manager deployments apply \
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

### gcloud infra-manager deployments delete

```text
NAME
    gcloud infra-manager deployments delete - delete deployments

SYNOPSIS
    gcloud infra-manager deployments delete (DEPLOYMENT : --location=LOCATION)
        [--async] [--delete-policy=DELETE_POLICY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a deployment

EXAMPLES
    To delete the deployment example-deployment at location us-central1, run:

        $ gcloud infra-manager deployments delete \
            projects/example-project/locations/us-central1/deployments/\
        example-deployment

POSITIONAL ARGUMENTS
     Deployment resource - deployments TBD The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument deployment on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DEPLOYMENT
          ID of the deployment or fully qualified identifier for the
          deployment.

          To set the deployment attribute:
          + provide the argument deployment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          locations TBD

          To set the location attribute:
          + provide the argument deployment on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property infra-manager/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --delete-policy=DELETE_POLICY
        Policy on how resources actuated by the deployment should be deleted.
        The accepted values are DELETE, ABANDON. DELETE = Delete resources
        actuated by the deployment. ABANDON = Abandon resources and only delete
        deployment metadata. DELETE_POLICY must be one of: abandon, delete,
        delete-policy-unspecified.

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
gcloud infra-manager deployments delete projects/example-project/locations/us-central1/deployments/example-deployment
```

### gcloud infra-manager deployments describe

```text
NAME
    gcloud infra-manager deployments describe - describe deployments

SYNOPSIS
    gcloud infra-manager deployments describe
        (DEPLOYMENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a deployment

EXAMPLES
    To describe a deployment example-deployment in project p1 at location
    us-central1, run:

        $ gcloud infra-manager deployments describe \
            projects/p1/locations/us-central1/deployments/example-deployment

POSITIONAL ARGUMENTS
     Deployment resource - The deployment to describe The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument deployment on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DEPLOYMENT
          ID of the deployment or fully qualified identifier for the
          deployment.

          To set the deployment attribute:
          + provide the argument deployment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          locations TBD

          To set the location attribute:
          + provide the argument deployment on the command line with a fully
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

### gcloud infra-manager deployments export-lock

```text
NAME
    gcloud infra-manager deployments export-lock - exports lock info of a
        deployment

SYNOPSIS
    gcloud infra-manager deployments export-lock
        (DEPLOYMENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command exports lock info of a deployment.

EXAMPLES
    Export lock info for deployment
    projects/p1/locations/us-central1/deployments/my-deployment:

        $ gcloud infra-manager deployments export-lock \
            projects/p1/locations/us-central1/deployments/my-deployment

POSITIONAL ARGUMENTS
     Deployment resource - the deployment to be used as parent. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument DEPLOYMENT on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DEPLOYMENT
          ID of the deployment or fully qualified identifier for the
          deployment.

          To set the deployment attribute:
          + provide the argument DEPLOYMENT on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the deployment.

          To set the location attribute:
          + provide the argument DEPLOYMENT on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property infra-manager/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud infra-manager deployments export-statefile

```text
NAME
    gcloud infra-manager deployments export-statefile - export a terraform
        state file

SYNOPSIS
    gcloud infra-manager deployments export-statefile
        (DEPLOYMENT : --location=LOCATION) [--draft] [--file=FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command generates a signed url to download a terraform state file.

EXAMPLES
    Export state file for my-deployment:

        $ gcloud infra-manager deployments export-statefile \
            projects/p1/locations/us-central1/deployments/my-deployment

POSITIONAL ARGUMENTS
     Deployment resource - the deployment to be used as parent. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument DEPLOYMENT on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DEPLOYMENT
          ID of the deployment or fully qualified identifier for the
          deployment.

          To set the deployment attribute:
          + provide the argument DEPLOYMENT on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the deployment.

          To set the location attribute:
          + provide the argument DEPLOYMENT on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property infra-manager/location.

FLAGS
     --draft
        If this flag is set to true, the exported deployment state file will be
        the draft state

     --file=FILE
        File name for statefile. It is optional and it specifies the filename
        or complete path for the downloaded statefile. If only a file path is
        provided, the statefile will be downloaded as "statefile" within that
        directory. If a filename is included, the statefile will be downloaded
        with that name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud infra-manager deployments import-statefile

```text
NAME
    gcloud infra-manager deployments import-statefile - import a terraform
        state file

SYNOPSIS
    gcloud infra-manager deployments import-statefile
        (DEPLOYMENT : --location=LOCATION) --lock-id=LOCK_ID [--file=FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command generates a signed url to upload a terraform state file.

EXAMPLES
    Import state file for my-deployment with lock-id 1658343229583347:

        $ gcloud infra-manager deployments import-statefile \
            projects/p1/locations/us-central1/deployments/my-deployment \
            --lock-id=1658343229583347

POSITIONAL ARGUMENTS
     Deployment resource - the deployment to be used as parent. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument DEPLOYMENT on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DEPLOYMENT
          ID of the deployment or fully qualified identifier for the
          deployment.

          To set the deployment attribute:
          + provide the argument DEPLOYMENT on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the deployment.

          To set the location attribute:
          + provide the argument DEPLOYMENT on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property infra-manager/location.

REQUIRED FLAGS
     --lock-id=LOCK_ID
        Lock ID of the lock file to verify person importing owns lock.

OPTIONAL FLAGS
     --file=FILE
        File path for importing statefile into a deployment. It specifies the
        local file path of an existing Terraform statefile to directly upload
        for a deployment.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud infra-manager deployments list

```text
NAME
    gcloud infra-manager deployments list - list deployments

SYNOPSIS
    gcloud infra-manager deployments list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List deployments

EXAMPLES
    To list all deployments at location us-central1, run:

        $ gcloud infra-manager deployments list --location=us-central1

FLAGS
     Location resource - Location to list deployments This represents a Cloud
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

### gcloud infra-manager deployments lock

```text
NAME
    gcloud infra-manager deployments lock - locks the deployment

SYNOPSIS
    gcloud infra-manager deployments lock (DEPLOYMENT : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command locks the deployment and generates a lockId.

EXAMPLES
    Lock deployment my-deployment under project p1 and location us-central1:

        $ gcloud infra-manager deployments lock \
            projects/p1/locations/us-central1/deployments/my-deployment

POSITIONAL ARGUMENTS
     Deployment resource - the deployment to be used as parent. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument DEPLOYMENT on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DEPLOYMENT
          ID of the deployment or fully qualified identifier for the
          deployment.

          To set the deployment attribute:
          + provide the argument DEPLOYMENT on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the deployment.

          To set the location attribute:
          + provide the argument DEPLOYMENT on the command line with a fully
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
```

### gcloud infra-manager deployments unlock

```text
NAME
    gcloud infra-manager deployments unlock - unlocks the deployment

SYNOPSIS
    gcloud infra-manager deployments unlock (DEPLOYMENT : --location=LOCATION)
        --lock-id=LOCK_ID [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command releases the lock on deployment.

EXAMPLES
    Unlock deployment my-deployment under project p1 and location us-central1
    with lock-id 1234:

        $ gcloud infra-manager deployments unlock \
            projects/p1/locations/us-central1/deployments/my-deployment \
            --lock-id=1234

POSITIONAL ARGUMENTS
     Deployment resource - the deployment to be used as parent. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument DEPLOYMENT on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DEPLOYMENT
          ID of the deployment or fully qualified identifier for the
          deployment.

          To set the deployment attribute:
          + provide the argument DEPLOYMENT on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the deployment.

          To set the location attribute:
          + provide the argument DEPLOYMENT on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property infra-manager/location.

REQUIRED FLAGS
     --lock-id=LOCK_ID
        Lock ID of the lock file to verify person importing owns lock.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/infra-manager/deployments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

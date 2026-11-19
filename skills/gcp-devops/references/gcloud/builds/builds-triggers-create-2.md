---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/triggers/create
---

# gcloud builds triggers create (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds triggers create manual

```text
NAME
    gcloud builds triggers create manual - create a build trigger with a manual
        trigger event

SYNOPSIS
    gcloud builds triggers create manual
        (--trigger-config=PATH | [(--build-config=PATH | --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR;
          default="/" --dockerfile-image=DOCKERFILE_IMAGE])
          : --description=DESCRIPTION --name=NAME --region=REGION
          --[no-]require-approval --service-account=SERVICE_ACCOUNT
          --substitutions=[KEY=VALUE,...] --branch=BRANCH
          | --tag=TAG --repository=REPOSITORY
          | [--repo=REPO --repo-type=REPO_TYPE
          : --github-enterprise-config=GITHUB_ENTERPRISE_CONFIG]])
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a build trigger with a manual trigger event.

EXAMPLES
    To create a manual trigger that builds off branch my-branch in a GitHub
    repository named my-repo:

        $ gcloud builds triggers create manual --name=my-manual-trigger \
            --build-config=cloudbuild.yaml \
            --repo=https://www.github.com/owner/repo --repo-type=GITHUB \
            --branch=my-branch

    To create a manual trigger that builds off branch my-branch in a 2nd-gen
    GitHub repository resource:

        $ gcloud builds triggers create manual --name=my-manual-trigger \
            --build-config=cloudbuild.yaml \
            --repository=projects/my-proj/locations/us-west1/connections/\
        my-conn/repositories/my-repo --branch=my-branch

REQUIRED FLAGS
     Exactly one of these must be specified:

       --trigger-config=PATH
          Path to Build Trigger config file (JSON or YAML format). For more
          details, see
          https://cloud.google.com/cloud-build/docs/api/reference/rest/v1/projects.triggers#BuildTrigger

       Or at least one of these can be specified:

         Flag based trigger configuration

         --description=DESCRIPTION
            Build trigger description.

         --name=NAME
            Build trigger name.

         --region=REGION
            The region of the Cloud Build Service to use. Must be set to a
            supported region name (e.g. us-central1). If unset, builds/region,
            which is the default region to use when working with Cloud Build
            resources, is used. If builds/region is unset, region is set to
            global. Note: Region must be specified in 2nd gen repo; global is
            not supported.

         --[no-]require-approval
            Require manual approval for triggered builds. Use
            --require-approval to enable and --no-require-approval to disable.

         --service-account=SERVICE_ACCOUNT
            The service account used for all user-controlled operations
            including UpdateBuildTrigger, RunBuildTrigger, CreateBuild, and
            CancelBuild. If no service account is set, then the standard Cloud
            Build service account ([PROJECT_NUM]@system.gserviceaccount.com) is
            used instead. Format:
            projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT_ID_OR_EMAIL}.

         --substitutions=[KEY=VALUE,...]
            Parameters to be substituted in the build specification. For
            example:

                $ gcloud builds triggers create manual ... \
                    --substitutions _FAVORITE_COLOR=blue,_NUM_CANDIES=10

            This will result in a build where every occurrence of
            ${_FAVORITE_COLOR} in certain fields is replaced by "blue", and
            similarly for ${_NUM_CANDIES} and "10".

            Substitutions can be applied to user-defined variables (starting
            with an underscore) and to the following built-in variables:
            REPO_NAME, BRANCH_NAME, TAG_NAME, REVISION_ID, COMMIT_SHA,
            SHORT_SHA.

            For more details, see:
            https://cloud.google.com/build/docs/configuring-builds/substitute-variable-values

         Exactly one of these must be specified:

           --build-config=PATH
              Path to a YAML or JSON file containing the build configuration in
              the repository.

              For more details, see:
              https://cloud.google.com/cloud-build/docs/build-config

           --inline-config=PATH
              Local path to a YAML or JSON file containing a build
              configuration.

           Or at least one of these can be specified:

             Dockerfile build configuration flags

             --dockerfile=DOCKERFILE
                Path of Dockerfile to use for builds in the repository.

                If specified, a build config will be generated to run docker
                build using the specified file.

                The filename is relative to the Dockerfile directory.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --dockerfile-dir=DOCKERFILE_DIR; default="/"
                Location of the directory containing the Dockerfile in the
                repository.

                The directory will also be used as the Docker build context.

             --dockerfile-image=DOCKERFILE_IMAGE
                Docker image name to build.

                If not specified,
                gcr.io/PROJECT/github.com/REPO_OWNER/REPO_NAME:$COMMIT_SHA will
                be used.

                Use a build configuration (cloudbuild.yaml) file for building
                multiple images in a single trigger.

         Flags for repository and branch information

         At most one of these can be specified:

           --branch=BRANCH
              Branch to build.

           --tag=TAG
              Tag to build.

         Flags for repository information

         At most one of these can be specified:

           --repository=REPOSITORY
              Repository resource (2nd gen) to use, in the format
              "projects/*/locations/*/connections/*/repositories/".

           Or at least one of these can be specified:

             1st-gen repository settings.

             --repo=REPO
                URI of the repository (1st gen). Currently only HTTP URIs for
                GitHub and Cloud Source Repositories are supported.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --repo-type=REPO_TYPE
                Type of the repository (1st gen). Currently only GitHub and
                Cloud Source Repository types are supported.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --github-enterprise-config=GITHUB_ENTERPRISE_CONFIG
                The resource name of the GitHub Enterprise config that should
                be applied to this source (1st gen). Format:
                projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}
                or projects/{project}/githubEnterpriseConfigs/{id}

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers create manual

        $ gcloud beta builds triggers create manual
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud builds triggers create manual \
    --name=my-manual-trigger \
    --build-config=cloudbuild.yaml \
    --repository=projects/my-proj/locations/us-west1/connections/my-conn/repositories/my-repo \
    --branch=my-branch \
    --region=us-west1
```

### gcloud builds triggers create pubsub

```text
NAME
    gcloud builds triggers create pubsub - create a build trigger with a
        Pub/Sub trigger event

SYNOPSIS
    gcloud builds triggers create pubsub
        (--trigger-config=PATH | [--topic=TOPIC (--build-config=PATH
          | --inline-config=PATH | [--dockerfile=DOCKERFILE
          : --dockerfile-dir=DOCKERFILE_DIR;
          default="/" --dockerfile-image=DOCKERFILE_IMAGE])
          : --description=DESCRIPTION --name=NAME --region=REGION
          --[no-]require-approval --service-account=SERVICE_ACCOUNT
          --subscription-filter=SUBSCRIPTION_FILTER
          --substitutions=[KEY=VALUE,...] --branch=BRANCH
          | --tag=TAG --repository=REPOSITORY
          | [--repo=REPO --repo-type=REPO_TYPE
          : --github-enterprise-config=GITHUB_ENTERPRISE_CONFIG]])
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a build trigger with a Pub/Sub trigger event.

EXAMPLES
    To create a Pub/Sub trigger that listens to topic my-topic and builds off
    branch my-branch in a GitHub repository named my-repo:

        $ gcloud builds triggers create pubsub --name=my-pubsub-trigger \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" \
            --topic=projects/my-project/topics/my-topic \
            --repo=https://www.github.com/owner/repo --repo-type=GITHUB \
            --branch=my-branch

    To create a Pub/Sub trigger that listens to topic my-topic and builds off
    branch my-branch in a 2nd-gen GitHub repository resource:

        $ gcloud builds triggers create pubsub --name=my-pubsub-trigger \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" \
            --repository=projects/my-proj/locations/us-west1/connections/\
        my-conn/repositories/my-repo --branch=my-branch

REQUIRED FLAGS
     Exactly one of these must be specified:

       --trigger-config=PATH
          Path to Build Trigger config file (JSON or YAML format). For more
          details, see
          https://cloud.google.com/cloud-build/docs/api/reference/rest/v1/projects.triggers#BuildTrigger

       Or at least one of these can be specified:

         Flag based trigger configuration

         --topic=TOPIC
            The topic to which this trigger should subscribe.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --description=DESCRIPTION
            Build trigger description.

         --name=NAME
            Build trigger name.

         --region=REGION
            The region of the Cloud Build Service to use. Must be set to a
            supported region name (e.g. us-central1). If unset, builds/region,
            which is the default region to use when working with Cloud Build
            resources, is used. If builds/region is unset, region is set to
            global. Note: Region must be specified in 2nd gen repo; global is
            not supported.

         --[no-]require-approval
            Require manual approval for triggered builds. Use
            --require-approval to enable and --no-require-approval to disable.

         --service-account=SERVICE_ACCOUNT
            The service account used for all user-controlled operations
            including UpdateBuildTrigger, RunBuildTrigger, CreateBuild, and
            CancelBuild. If no service account is set, then the standard Cloud
            Build service account ([PROJECT_NUM]@system.gserviceaccount.com) is
            used instead. Format:
            projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT_ID_OR_EMAIL}.

         --subscription-filter=SUBSCRIPTION_FILTER
            CEL filter expression for the trigger. See
            https://cloud.google.com/build/docs/filter-build-events-using-cel
            for more details.

         --substitutions=[KEY=VALUE,...]
            Parameters to be substituted in the build specification. For
            example:

                $ gcloud builds triggers create pubsub ... \
                    --substitutions _FAVORITE_COLOR=blue,_NUM_CANDIES=10

            This will result in a build where every occurrence of
            ${_FAVORITE_COLOR} in certain fields is replaced by "blue", and
            similarly for ${_NUM_CANDIES} and "10".

            Substitutions can be applied to user-defined variables (starting
            with an underscore) and to the following built-in variables:
            REPO_NAME, BRANCH_NAME, TAG_NAME, REVISION_ID, COMMIT_SHA,
            SHORT_SHA.

            For more details, see:
            https://cloud.google.com/build/docs/configuring-builds/substitute-variable-values

         Exactly one of these must be specified:

           --build-config=PATH
              Path to a YAML or JSON file containing the build configuration in
              the repository.

              For more details, see:
              https://cloud.google.com/cloud-build/docs/build-config

           --inline-config=PATH
              Local path to a YAML or JSON file containing a build
              configuration.

           Or at least one of these can be specified:

             Dockerfile build configuration flags

             --dockerfile=DOCKERFILE
                Path of Dockerfile to use for builds in the repository.

                If specified, a build config will be generated to run docker
                build using the specified file.

                The filename is relative to the Dockerfile directory.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --dockerfile-dir=DOCKERFILE_DIR; default="/"
                Location of the directory containing the Dockerfile in the
                repository.

                The directory will also be used as the Docker build context.

             --dockerfile-image=DOCKERFILE_IMAGE
                Docker image name to build.

                If not specified,
                gcr.io/PROJECT/github.com/REPO_OWNER/REPO_NAME:$COMMIT_SHA will
                be used.

                Use a build configuration (cloudbuild.yaml) file for building
                multiple images in a single trigger.

         Flags for repository and branch information

         At most one of these can be specified:

           --branch=BRANCH
              Branch to build.

           --tag=TAG
              Tag to build.

         Flags for repository information

         At most one of these can be specified:

           --repository=REPOSITORY
              Repository resource (2nd gen) to use, in the format
              "projects/*/locations/*/connections/*/repositories/".

           Or at least one of these can be specified:

             1st-gen repository settings.

             --repo=REPO
                URI of the repository (1st gen). Currently only HTTP URIs for
                GitHub and Cloud Source Repositories are supported.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --repo-type=REPO_TYPE
                Type of the repository (1st gen). Currently only GitHub and
                Cloud Source Repository types are supported.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --github-enterprise-config=GITHUB_ENTERPRISE_CONFIG
                The resource name of the GitHub Enterprise config that should
                be applied to this source (1st gen). Format:
                projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}
                or projects/{project}/githubEnterpriseConfigs/{id}

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers create pubsub

        $ gcloud beta builds triggers create pubsub
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud builds triggers create pubsub \
    --build-config=cloudbuild.yaml \
    --name=my-pubsub-trigger \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --topic=projects/my-project/topics/my-topic \
    --repo=https://www.github.com/owner/repo \
    --repo-type=GITHUB \
    --branch=my-branch

gcloud builds triggers create pubsub \
    --topic=projects/my-project/topics/my-topic \
    --build-config=cloudbuild.yaml \
    --name=my-pubsub-trigger \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --repository=projects/my-proj/locations/us-west1/connections/my-conn/repositories/my-repo \
    --branch=my-branch \
    --region=us-west1
```

### gcloud builds triggers create webhook

```text
NAME
    gcloud builds triggers create webhook - create a build trigger with a
        Webhook trigger event

SYNOPSIS
    gcloud builds triggers create webhook
        (--trigger-config=PATH | [--secret=SECRET (--build-config=PATH
          | --inline-config=PATH | [--dockerfile=DOCKERFILE
          : --dockerfile-dir=DOCKERFILE_DIR;
          default="/" --dockerfile-image=DOCKERFILE_IMAGE])
          : --description=DESCRIPTION --name=NAME --region=REGION
          --[no-]require-approval --service-account=SERVICE_ACCOUNT
          --subscription-filter=SUBSCRIPTION_FILTER
          --substitutions=[KEY=VALUE,...] --branch=BRANCH
          | --tag=TAG --repository=REPOSITORY
          | [--repo=REPO --repo-type=REPO_TYPE
          : --github-enterprise-config=GITHUB_ENTERPRISE_CONFIG]])
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a build trigger with a Webhook trigger event.

EXAMPLES
    To create a Webhook trigger that requires secret
    projects/my-project/secrets/my-secret/versions/2 and builds off branch
    my-branch in a GitHub repository named my-repo:

        $ gcloud builds triggers create webhook --name=my-webhook-trigger \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" \
            --secret=projects/my-project/secrets/my-secret/versions/2 \
            --repo=https://www.github.com/owner/repo --repo-type=GITHUB \
            --branch=my-branch

    To create a Webhook trigger that requires secret
    projects/my-project/secrets/my-secret/versions/2 and builds off branch
    my-branch in a 2nd-gen GitHub repository:

        $ gcloud builds triggers create webhook --name=my-webhook-trigger \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" \
            --secret=projects/my-project/secrets/my-secret/versions/2 \
            --branch=my-branch \
            --repository=projects/my-proj/locations/us-west1/connections/\
        my-conn/repositories/my-repo

REQUIRED FLAGS
     Exactly one of these must be specified:

       --trigger-config=PATH
          Path to Build Trigger config file (JSON or YAML format). For more
          details, see
          https://cloud.google.com/cloud-build/docs/api/reference/rest/v1/projects.triggers#BuildTrigger

       Or at least one of these can be specified:

         Flag based trigger configuration

         --secret=SECRET
            The full path of the secret version required to validate webhook
            requests against this trigger. For example,
            projects/my-project/secrets/my-secret/versions/1.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --description=DESCRIPTION
            Build trigger description.

         --name=NAME
            Build trigger name.

         --region=REGION
            The region of the Cloud Build Service to use. Must be set to a
            supported region name (e.g. us-central1). If unset, builds/region,
            which is the default region to use when working with Cloud Build
            resources, is used. If builds/region is unset, region is set to
            global. Note: Region must be specified in 2nd gen repo; global is
            not supported.

         --[no-]require-approval
            Require manual approval for triggered builds. Use
            --require-approval to enable and --no-require-approval to disable.

         --service-account=SERVICE_ACCOUNT
            The service account used for all user-controlled operations
            including UpdateBuildTrigger, RunBuildTrigger, CreateBuild, and
            CancelBuild. If no service account is set, then the standard Cloud
            Build service account ([PROJECT_NUM]@system.gserviceaccount.com) is
            used instead. Format:
            projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT_ID_OR_EMAIL}.

         --subscription-filter=SUBSCRIPTION_FILTER
            CEL filter expression for the trigger. See
            https://cloud.google.com/build/docs/filter-build-events-using-cel
            for more details.

         --substitutions=[KEY=VALUE,...]
            Parameters to be substituted in the build specification. For
            example:

                $ gcloud builds triggers create webhook ... \
                    --substitutions _FAVORITE_COLOR=blue,_NUM_CANDIES=10

            This will result in a build where every occurrence of
            ${_FAVORITE_COLOR} in certain fields is replaced by "blue", and
            similarly for ${_NUM_CANDIES} and "10".

            Substitutions can be applied to user-defined variables (starting
            with an underscore) and to the following built-in variables:
            REPO_NAME, BRANCH_NAME, TAG_NAME, REVISION_ID, COMMIT_SHA,
            SHORT_SHA.

            For more details, see:
            https://cloud.google.com/build/docs/configuring-builds/substitute-variable-values

         Exactly one of these must be specified:

           --build-config=PATH
              Path to a YAML or JSON file containing the build configuration in
              the repository.

              For more details, see:
              https://cloud.google.com/cloud-build/docs/build-config

           --inline-config=PATH
              Local path to a YAML or JSON file containing a build
              configuration.

           Or at least one of these can be specified:

             Dockerfile build configuration flags

             --dockerfile=DOCKERFILE
                Path of Dockerfile to use for builds in the repository.

                If specified, a build config will be generated to run docker
                build using the specified file.

                The filename is relative to the Dockerfile directory.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --dockerfile-dir=DOCKERFILE_DIR; default="/"
                Location of the directory containing the Dockerfile in the
                repository.

                The directory will also be used as the Docker build context.

             --dockerfile-image=DOCKERFILE_IMAGE
                Docker image name to build.

                If not specified,
                gcr.io/PROJECT/github.com/REPO_OWNER/REPO_NAME:$COMMIT_SHA will
                be used.

                Use a build configuration (cloudbuild.yaml) file for building
                multiple images in a single trigger.

         Flags for repository and branch information

         At most one of these can be specified:

           --branch=BRANCH
              Branch to build.

           --tag=TAG
              Tag to build.

         Flags for repository information

         At most one of these can be specified:

           --repository=REPOSITORY
              Repository resource (2nd gen) to use, in the format
              "projects/*/locations/*/connections/*/repositories/".

           Or at least one of these can be specified:

             1st-gen repository settings.

             --repo=REPO
                URI of the repository (1st gen). Currently only HTTP URIs for
                GitHub and Cloud Source Repositories are supported.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --repo-type=REPO_TYPE
                Type of the repository (1st gen). Currently only GitHub and
                Cloud Source Repository types are supported.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --github-enterprise-config=GITHUB_ENTERPRISE_CONFIG
                The resource name of the GitHub Enterprise config that should
                be applied to this source (1st gen). Format:
                projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}
                or projects/{project}/githubEnterpriseConfigs/{id}

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers create webhook

        $ gcloud beta builds triggers create webhook
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud builds triggers create webhook \
    --build-config=cloudbuild.yaml \
    --name=my-webhook-trigger \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --secret=projects/my-project/secrets/my-secret/versions/2 \
    --repo=https://www.github.com/owner/repo \
    --repo-type=GITHUB \
    --branch=my-branch

gcloud builds triggers create webhook \
    --build-config=cloudbuild.yaml \
    --name=my-webhook-trigger \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --secret=projects/my-project/secrets/my-secret/versions/2 \
    --branch=my-branch \
    --repository=projects/my-proj/locations/us-west1/connections/my-conn/repositories/my-repo \
    --region=us-west1
```

### gcloud beta builds triggers create bitbucket-cloud

```text
NAME
    gcloud beta builds triggers create bitbucket-cloud - create a build trigger
        for a 2nd-gen Bitbucket Cloud repository

SYNOPSIS
    gcloud beta builds triggers create bitbucket-cloud
        (--trigger-config=PATH | [(--branch-pattern=REGEX | --tag-pattern=REGEX
          | [--pull-request-pattern=REGEX : --comment-control=COMMENT_CONTROL;
          default="COMMENTS_ENABLED"]) (--build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR; default="/"])
          : --description=DESCRIPTION --ignored-files=[GLOB,...]
          --included-files=[GLOB,...] --name=NAME --region=REGION
          --repository=REPOSITORY --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers create bitbucket-data-center

```text
NAME
    gcloud beta builds triggers create bitbucket-data-center - create a build
        trigger for a 2nd-gen Bitbucket Data Center repository

SYNOPSIS
    gcloud beta builds triggers create bitbucket-data-center
        (--trigger-config=PATH | [(--branch-pattern=REGEX | --tag-pattern=REGEX
          | [--pull-request-pattern=REGEX : --comment-control=COMMENT_CONTROL;
          default="COMMENTS_ENABLED"]) (--build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR; default="/"])
          : --description=DESCRIPTION --ignored-files=[GLOB,...]
          --included-files=[GLOB,...] --name=NAME --region=REGION
          --repository=REPOSITORY --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers create bitbucketserver

```text
NAME
    gcloud beta builds triggers create bitbucketserver - create a build trigger
        for a Bitbucket Server repository

SYNOPSIS
    gcloud beta builds triggers create bitbucketserver
        (--trigger-config=PATH
          | [--bitbucket-server-config-resource=BITBUCKET_SERVER_CONFIG_RESOURCE --project-key=PROJECT_KEY --repo-slug=REPO_SLUG (--branch-pattern=REGEX | --tag-pattern=REGEX | [--pull-request-pattern=REGEX : --comment-control=COMMENT_CONTROL; default="COMMENTS_ENABLED"]) (--build-config=PATH | --inline-config=PATH | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR; default="/" --dockerfile-image=DOCKERFILE_IMAGE]) : --description=DESCRIPTION --ignored-files=[GLOB,
          ...] --included-files=[GLOB,...] --name=NAME --region=REGION
          --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers create cloud-source-repositories

```text
NAME
    gcloud beta builds triggers create cloud-source-repositories - create a
        build trigger from a Cloud Source Repository

SYNOPSIS
    gcloud beta builds triggers create cloud-source-repositories
        (--trigger-config=PATH | [--repo=REPO (--branch-pattern=REGEX
          | --tag-pattern=REGEX) (--build-config=PATH | --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR;
          default="/" --dockerfile-image=DOCKERFILE_IMAGE])
          : --description=DESCRIPTION --ignored-files=[GLOB,...]
          --included-files=[GLOB,...] --name=NAME --region=REGION
          --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers create developer-connect

```text
NAME
    gcloud beta builds triggers create developer-connect - create a build
        trigger for a Developer Connect repository

SYNOPSIS
    gcloud beta builds triggers create developer-connect
        (--trigger-config=PATH | [(--branch-pattern=REGEX | --tag-pattern=REGEX
          | [--pull-request-pattern=REGEX : --comment-control=COMMENT_CONTROL;
          default="COMMENTS_ENABLED"]) (--build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR; default="/"])
          : --description=DESCRIPTION --git-repository-link=GIT_REPOSITORY_LINK
          --ignored-files=[GLOB,...] --included-files=[GLOB,...] --name=NAME
          --region=REGION --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers create github

```text
NAME
    gcloud beta builds triggers create github - create a build trigger for a
        GitHub repository

SYNOPSIS
    gcloud beta builds triggers create github
        (--trigger-config=PATH | [(--branch-pattern=REGEX | --tag-pattern=REGEX
          | [--pull-request-pattern=REGEX : --comment-control=COMMENT_CONTROL;
          default="COMMENTS_ENABLED"]) (--build-config=PATH
          | --inline-config=PATH | [--dockerfile=DOCKERFILE
          : --dockerfile-dir=DOCKERFILE_DIR; default="/"
          --dockerfile-image=DOCKERFILE_IMAGE]) (--repository=REPOSITORY
          | [--repo-name=REPO_NAME --repo-owner=REPO_OWNER
          : --enterprise-config=ENTERPRISE_CONFIG]) : --description=DESCRIPTION
          --ignored-files=[GLOB,...] --include-logs-with-status
          --included-files=[GLOB,...] --name=NAME --region=REGION
          --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers create gitlab

```text
NAME
    gcloud beta builds triggers create gitlab - create a build trigger for a
        2nd-gen GitLab repository

SYNOPSIS
    gcloud beta builds triggers create gitlab
        (--trigger-config=PATH | [(--branch-pattern=REGEX | --tag-pattern=REGEX
          | [--pull-request-pattern=REGEX : --comment-control=COMMENT_CONTROL;
          default="COMMENTS_ENABLED"]) (--build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR; default="/"])
          : --description=DESCRIPTION --ignored-files=[GLOB,...]
          --included-files=[GLOB,...] --name=NAME --region=REGION
          --repository=REPOSITORY --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers create manual

```text
NAME
    gcloud beta builds triggers create manual - create a build trigger with a
        manual trigger event

SYNOPSIS
    gcloud beta builds triggers create manual
        (--trigger-config=PATH | [(--build-config=PATH | --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR;
          default="/" --dockerfile-image=DOCKERFILE_IMAGE])
          : --description=DESCRIPTION --name=NAME --region=REGION
          --[no-]require-approval --service-account=SERVICE_ACCOUNT
          --substitutions=[KEY=VALUE,...] --branch=BRANCH
          | --tag=TAG --repository=REPOSITORY
          | [--repo=REPO --repo-type=REPO_TYPE
          : --github-enterprise-config=GITHUB_ENTERPRISE_CONFIG]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers create pubsub

```text
NAME
    gcloud beta builds triggers create pubsub - create a build trigger with a
        Pub/Sub trigger event

SYNOPSIS
    gcloud beta builds triggers create pubsub
        (--trigger-config=PATH | [--topic=TOPIC (--build-config=PATH
          | --inline-config=PATH | [--dockerfile=DOCKERFILE
          : --dockerfile-dir=DOCKERFILE_DIR;
          default="/" --dockerfile-image=DOCKERFILE_IMAGE])
          : --description=DESCRIPTION --name=NAME --region=REGION
          --[no-]require-approval --service-account=SERVICE_ACCOUNT
          --subscription-filter=SUBSCRIPTION_FILTER
          --substitutions=[KEY=VALUE,...] --branch=BRANCH
          | --tag=TAG --repository=REPOSITORY
          | [--repo=REPO --repo-type=REPO_TYPE
          : --github-enterprise-config=GITHUB_ENTERPRISE_CONFIG]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers create webhook

```text
NAME
    gcloud beta builds triggers create webhook - create a build trigger with a
        Webhook trigger event

SYNOPSIS
    gcloud beta builds triggers create webhook
        (--trigger-config=PATH | [--secret=SECRET (--build-config=PATH
          | --inline-config=PATH | [--dockerfile=DOCKERFILE
          : --dockerfile-dir=DOCKERFILE_DIR;
          default="/" --dockerfile-image=DOCKERFILE_IMAGE])
          : --description=DESCRIPTION --name=NAME --region=REGION
          --[no-]require-approval --service-account=SERVICE_ACCOUNT
          --subscription-filter=SUBSCRIPTION_FILTER
          --substitutions=[KEY=VALUE,...] --branch=BRANCH
          | --tag=TAG --repository=REPOSITORY
          | [--repo=REPO --repo-type=REPO_TYPE
          : --github-enterprise-config=GITHUB_ENTERPRISE_CONFIG]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers create bitbucket-cloud

```text
NAME
    gcloud alpha builds triggers create bitbucket-cloud - create a build
        trigger for a 2nd-gen Bitbucket Cloud repository

SYNOPSIS
    gcloud alpha builds triggers create bitbucket-cloud
        (--trigger-config=PATH | [(--branch-pattern=REGEX | --tag-pattern=REGEX
          | [--pull-request-pattern=REGEX : --comment-control=COMMENT_CONTROL;
          default="COMMENTS_ENABLED"]) (--build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR; default="/"])
          : --description=DESCRIPTION --ignored-files=[GLOB,...]
          --included-files=[GLOB,...] --name=NAME --region=REGION
          --repository=REPOSITORY --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers create bitbucket-data-center

```text
NAME
    gcloud alpha builds triggers create bitbucket-data-center - create a build
        trigger for a 2nd-gen Bitbucket Data Center repository

SYNOPSIS
    gcloud alpha builds triggers create bitbucket-data-center
        (--trigger-config=PATH | [(--branch-pattern=REGEX | --tag-pattern=REGEX
          | [--pull-request-pattern=REGEX : --comment-control=COMMENT_CONTROL;
          default="COMMENTS_ENABLED"]) (--build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR; default="/"])
          : --description=DESCRIPTION --ignored-files=[GLOB,...]
          --included-files=[GLOB,...] --name=NAME --region=REGION
          --repository=REPOSITORY --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers create bitbucketserver

```text
NAME
    gcloud alpha builds triggers create bitbucketserver - create a build
        trigger for a Bitbucket Server repository

SYNOPSIS
    gcloud alpha builds triggers create bitbucketserver
        (--trigger-config=PATH
          | [--bitbucket-server-config-resource=BITBUCKET_SERVER_CONFIG_RESOURCE --project-key=PROJECT_KEY --repo-slug=REPO_SLUG (--branch-pattern=REGEX | --tag-pattern=REGEX | [--pull-request-pattern=REGEX : --comment-control=COMMENT_CONTROL; default="COMMENTS_ENABLED"]) (--build-config=PATH | --inline-config=PATH | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR; default="/" --dockerfile-image=DOCKERFILE_IMAGE]) : --description=DESCRIPTION --ignored-files=[GLOB,
          ...] --included-files=[GLOB,...] --name=NAME --region=REGION
          --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers create cloud-source-repositories

```text
NAME
    gcloud alpha builds triggers create cloud-source-repositories - create a
        build trigger from a Cloud Source Repository

SYNOPSIS
    gcloud alpha builds triggers create cloud-source-repositories
        (--trigger-config=PATH | [--repo=REPO (--branch-pattern=REGEX
          | --tag-pattern=REGEX) (--build-config=PATH | --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR;
          default="/" --dockerfile-image=DOCKERFILE_IMAGE])
          : --description=DESCRIPTION --ignored-files=[GLOB,...]
          --included-files=[GLOB,...] --name=NAME --region=REGION
          --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers create developer-connect

```text
NAME
    gcloud alpha builds triggers create developer-connect - create a build
        trigger for a Developer Connect repository

SYNOPSIS
    gcloud alpha builds triggers create developer-connect
        (--trigger-config=PATH | [(--branch-pattern=REGEX | --tag-pattern=REGEX
          | [--pull-request-pattern=REGEX : --comment-control=COMMENT_CONTROL;
          default="COMMENTS_ENABLED"]) (--build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR; default="/"])
          : --description=DESCRIPTION --git-repository-link=GIT_REPOSITORY_LINK
          --ignored-files=[GLOB,...] --included-files=[GLOB,...] --name=NAME
          --region=REGION --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers create github

```text
NAME
    gcloud alpha builds triggers create github - create a build trigger for a
        GitHub repository

SYNOPSIS
    gcloud alpha builds triggers create github
        (--trigger-config=PATH | [(--branch-pattern=REGEX | --tag-pattern=REGEX
          | [--pull-request-pattern=REGEX : --comment-control=COMMENT_CONTROL;
          default="COMMENTS_ENABLED"]) (--build-config=PATH
          | --inline-config=PATH | [--dockerfile=DOCKERFILE
          : --dockerfile-dir=DOCKERFILE_DIR; default="/"
          --dockerfile-image=DOCKERFILE_IMAGE]) (--repository=REPOSITORY
          | [--repo-name=REPO_NAME --repo-owner=REPO_OWNER
          : --enterprise-config=ENTERPRISE_CONFIG]) : --description=DESCRIPTION
          --ignored-files=[GLOB,...] --include-logs-with-status
          --included-files=[GLOB,...] --name=NAME --region=REGION
          --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers create gitlab

```text
NAME
    gcloud alpha builds triggers create gitlab - create a build trigger for a
        2nd-gen GitLab repository

SYNOPSIS
    gcloud alpha builds triggers create gitlab
        (--trigger-config=PATH | [(--branch-pattern=REGEX | --tag-pattern=REGEX
          | [--pull-request-pattern=REGEX : --comment-control=COMMENT_CONTROL;
          default="COMMENTS_ENABLED"]) (--build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR; default="/"])
          : --description=DESCRIPTION --ignored-files=[GLOB,...]
          --included-files=[GLOB,...] --name=NAME --region=REGION
          --repository=REPOSITORY --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers create manual

```text
NAME
    gcloud alpha builds triggers create manual - create a build trigger with a
        manual trigger event

SYNOPSIS
    gcloud alpha builds triggers create manual
        (--trigger-config=PATH | [(--build-config=PATH | --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR;
          default="/" --dockerfile-image=DOCKERFILE_IMAGE])
          : --description=DESCRIPTION --name=NAME --region=REGION
          --[no-]require-approval --service-account=SERVICE_ACCOUNT
          --substitutions=[KEY=VALUE,...] --branch=BRANCH
          | --tag=TAG --repository=REPOSITORY
          | [--repo=REPO --repo-type=REPO_TYPE
          : --github-enterprise-config=GITHUB_ENTERPRISE_CONFIG]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers create pubsub

```text
NAME
    gcloud alpha builds triggers create pubsub - create a build trigger with a
        Pub/Sub trigger event

SYNOPSIS
    gcloud alpha builds triggers create pubsub
        (--trigger-config=PATH | [--topic=TOPIC (--build-config=PATH
          | --inline-config=PATH | [--dockerfile=DOCKERFILE
          : --dockerfile-dir=DOCKERFILE_DIR;
          default="/" --dockerfile-image=DOCKERFILE_IMAGE])
          : --description=DESCRIPTION --name=NAME --region=REGION
          --[no-]require-approval --service-account=SERVICE_ACCOUNT
          --subscription-filter=SUBSCRIPTION_FILTER
          --substitutions=[KEY=VALUE,...] --branch=BRANCH
          | --tag=TAG --repository=REPOSITORY
          | [--repo=REPO --repo-type=REPO_TYPE
          : --github-enterprise-config=GITHUB_ENTERPRISE_CONFIG]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers create webhook

```text
NAME
    gcloud alpha builds triggers create webhook - create a build trigger with a
        Webhook trigger event

SYNOPSIS
    gcloud alpha builds triggers create webhook
        (--trigger-config=PATH | [--secret=SECRET (--build-config=PATH
          | --inline-config=PATH | [--dockerfile=DOCKERFILE
          : --dockerfile-dir=DOCKERFILE_DIR;
          default="/" --dockerfile-image=DOCKERFILE_IMAGE])
          : --description=DESCRIPTION --name=NAME --region=REGION
          --[no-]require-approval --service-account=SERVICE_ACCOUNT
          --subscription-filter=SUBSCRIPTION_FILTER
          --substitutions=[KEY=VALUE,...] --branch=BRANCH
          | --tag=TAG --repository=REPOSITORY
          | [--repo=REPO --repo-type=REPO_TYPE
          : --github-enterprise-config=GITHUB_ENTERPRISE_CONFIG]])
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the 2nd gen repository examples name a repository in `us-west1` but omit `--region`; without it (and without the `builds/region` property) the trigger is created in, or looked up in, `global`, and the `--region` description of `triggers create` says that a region must be specified for 2nd gen repositories ("global is not supported"); the runnable form adds `--region=us-west1`, the location in the repository name.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples omit the build configuration, which the SYNOPSIS requires (one of `--build-config`, `--inline-config` or `--dockerfile`; gcloud 593.0.0: "(--build-config | --inline-config | [--dockerfile ...]) must be specified"); the runnable form adds `--build-config=cloudbuild.yaml`, the value used by the other `builds triggers create` examples.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the second Pub/Sub example ("listens to topic my-topic") omits `--topic`, which the SYNOPSIS requires (gcloud 593.0.0: "--topic must be specified"); the runnable form adds `--topic=projects/my-project/topics/my-topic`, the topic of the first example on this page.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/triggers/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

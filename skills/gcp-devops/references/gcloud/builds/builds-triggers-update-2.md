---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/triggers/update
---

# gcloud builds triggers update (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds triggers update gitlab

```text
NAME
    gcloud builds triggers update gitlab - updates GitLab trigger used by Cloud
        Build

SYNOPSIS
    gcloud builds triggers update gitlab (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --ignored-files=[GLOB,...] --included-files=[GLOB,...]
          --repository=REPOSITORY --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX | --comment-control=COMMENT_CONTROL
          --pull-request-pattern=REGEX --build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...]) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates GitLab trigger used by Cloud Build.

EXAMPLES
    To update the branch pattern of the trigger:

        $ gcloud builds triggers update gitlab my-trigger \
            --branch-pattern=".*"

    To update the build config of the trigger:

        $ gcloud builds triggers update gitlab my-trigger \
            --build-config="cloudbuild.yaml"

    To update the substitutions of the trigger:

        $ gcloud builds triggers update gitlab my-trigger \
            --update-substitutions=_REPO_NAME=my-repo,_BRANCH_NAME=master

    To update the 2nd-gen repository resource of the trigger:

        $ gcloud builds triggers update gitlab my-trigger \
            --repository=projects/my-project/locations/us-west1/\
        connections/my-conn/repositories/my-repo

POSITIONAL ARGUMENTS
     Trigger resource - Build Trigger. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument TRIGGER on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRIGGER
          ID of the trigger or fully qualified identifier for the trigger.

          To set the trigger attribute:
          + provide the argument TRIGGER on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud location for the trigger.

          To set the region attribute:
          + provide the argument TRIGGER on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

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

         --ignored-files=[GLOB,...]
            Glob filter. Changes only affecting ignored files won't trigger
            builds.

         --included-files=[GLOB,...]
            Glob filter. Changes affecting at least one included file will
            trigger builds.

         --repository=REPOSITORY
            Repository resource (2nd gen) to use, in the format
            "projects/*/locations/*/connections/*/repositories/".

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

         At most one of these can be specified:

           --branch-pattern=REGEX
              A regular expression specifying which git branches to match.

              This pattern is used as a regular expression search for any
              incoming pushes. For example, --branch-pattern=foo will match
              "foo", "foobar", and "barfoo". Events on a branch that does not
              match will be ignored.

              The syntax of the regular expressions accepted is the syntax
              accepted by RE2 and described at
              https://github.com/google/re2/wiki/Syntax.

           --tag-pattern=REGEX
              A regular expression specifying which git tags to match.

              This pattern is used as a regular expression search for any
              incoming pushes. For example, --tag-pattern=foo will match "foo",
              "foobar", and "barfoo". Events on a tag that does not match will
              be ignored.

              The syntax of the regular expressions accepted is the syntax
              accepted by RE2 and described at
              https://github.com/google/re2/wiki/Syntax.

           Or at least one of these can be specified:

             Pull Request settings

             --comment-control=COMMENT_CONTROL
                Require a repository collaborator or owner to comment '/gcbrun'
                on a pull request before running the build. COMMENT_CONTROL
                must be one of:

                 COMMENTS_DISABLED
                    Do not require comments on Pull Requests before builds are
                    triggered.
                 COMMENTS_ENABLED
                    Enforce that repository owners or collaborators must
                    comment on Pull Requests before builds are triggered.
                 COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY
                    Enforce that repository owners or collaborators must
                    comment on external contributors' Pull Requests before
                    builds are triggered.

             --pull-request-pattern=REGEX
                A regular expression specifying which base git branch to match
                for pull request events.

                This pattern is used as a regular expression search for the
                base branch (the branch you are trying to merge into) for pull
                request updates. For example, --pull-request-pattern=foo will
                match "foo", "foobar", and "barfoo".

                The syntax of the regular expressions accepted is the syntax
                accepted by RE2 and described at
                https://github.com/google/re2/wiki/Syntax.

         At most one of these can be specified:

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

             --dockerfile-image=DOCKERFILE_IMAGE
                Docker image name to build.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --dockerfile-dir=DOCKERFILE_DIR
                Location of the directory containing the Dockerfile in the
                repository.

                The directory will also be used as the Docker build context.

         At most one of these can be specified:

           --clear-substitutions
              Clear existing substitutions.

           --remove-substitutions=[KEY,...]
              Remove existing substitutions if present.

           --update-substitutions=[KEY=VALUE,...]
              Update or add to existing substitutions. Substitutions are
              parameters to be substituted or add in the build specification.

              For example (using some nonsensical substitution keys; all keys
              must begin with an underscore):

                  $ gcloud builds triggers update ...
                      --update-substitutions _FAVORITE_COLOR=blue,_NUM_CANDIES=10

              This will add the provided substitutions to the existing
              substitutions and results in a build where every occurrence of
              ${_FAVORITE_COLOR} in certain fields is replaced by "blue", and
              similarly for ${_NUM_CANDIES} and "10".

              Only the following built-in variables can be specified with the
              --substitutions flag: REPO_NAME, BRANCH_NAME, TAG_NAME,
              REVISION_ID, COMMIT_SHA, SHORT_SHA.

              For more details, see:
              https://cloud.google.com/build/docs/build-config-file-schema#substitutions

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers update gitlab

        $ gcloud beta builds triggers update gitlab
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud builds triggers update gitlab my-trigger \
    --repository=projects/my-project/locations/us-west1/connections/my-conn/repositories/my-repo \
    --region=us-west1
```

### gcloud builds triggers update manual

```text
NAME
    gcloud builds triggers update manual - updates a manual trigger used by
        Cloud Build

SYNOPSIS
    gcloud builds triggers update manual (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...] --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR
          --dockerfile-image=DOCKERFILE_IMAGE]
          | --git-file-source-branch=GIT_FILE_SOURCE_BRANCH
          | --git-file-source-tag=GIT_FILE_SOURCE_TAG
          --git-file-source-github-enterprise-config=GIT_FILE_SOURCE_GITHUB_ENTERPRISE_CONFIG --git-file-source-path=PATH --git-file-source-repo-type=GIT_FILE_SOURCE_REPO_TYPE --git-file-source-uri=URL --source-to-build-branch=SOURCE_TO_BUILD_BRANCH | --source-to-build-tag=SOURCE_TO_BUILD_TAG --source-to-build-github-enterprise-config=SOURCE_TO_BUILD_GITHUB_ENTERPRISE_CONFIG --source-to-build-repo-type=SOURCE_TO_BUILD_REPO_TYPE --source-to-build-uri=SOURCE_TO_BUILD_URI)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a manual trigger used by Cloud Build.

EXAMPLES
    To update the branch from which the trigger clones:

        $ gcloud builds triggers update manual my-trigger \
            --source-to-build-branch=my-branch

POSITIONAL ARGUMENTS
     Trigger resource - Build Trigger. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument TRIGGER on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRIGGER
          ID of the trigger or fully qualified identifier for the trigger.

          To set the trigger attribute:
          + provide the argument TRIGGER on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud location for the trigger.

          To set the region attribute:
          + provide the argument TRIGGER on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

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

         At most one of these can be specified:

           --clear-substitutions
              Clear existing substitutions.

           --remove-substitutions=[KEY,...]
              Remove existing substitutions if present.

           --update-substitutions=[KEY=VALUE,...]
              Update or add to existing substitutions. Substitutions are
              parameters to be substituted or add in the build specification.

              For example (using some nonsensical substitution keys; all keys
              must begin with an underscore):

                  $ gcloud builds triggers update ...
                      --update-substitutions _FAVORITE_COLOR=blue,_NUM_CANDIES=10

              This will add the provided substitutions to the existing
              substitutions and results in a build where every occurrence of
              ${_FAVORITE_COLOR} in certain fields is replaced by "blue", and
              similarly for ${_NUM_CANDIES} and "10".

              Only the following built-in variables can be specified with the
              --substitutions flag: REPO_NAME, BRANCH_NAME, TAG_NAME,
              REVISION_ID, COMMIT_SHA, SHORT_SHA.

              For more details, see:
              https://cloud.google.com/build/docs/build-config-file-schema#substitutions

         At most one of these can be specified:

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

             --dockerfile-dir=DOCKERFILE_DIR
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

           Or at least one of these can be specified:

             Build file source flags

             At most one of these can be specified:

               --git-file-source-branch=GIT_FILE_SOURCE_BRANCH
                  The branch of the repository to clone when trigger is
                  invoked.

               --git-file-source-tag=GIT_FILE_SOURCE_TAG
                  The tag of the repository to clone when trigger is invoked.

             At most one of these can be specified:

               --git-file-source-github-enterprise-config=GIT_FILE_SOURCE_GITHUB_ENTERPRISE_CONFIG
                  The resource name of the GitHub Enterprise config that should
                  be applied to this source.

               --git-file-source-path=PATH
                  The file in the repository to clone when trigger is invoked.

               --git-file-source-repo-type=GIT_FILE_SOURCE_REPO_TYPE
                  The type of the repository to clone when trigger is invoked.

                  This flag argument must be specified if any of the other
                  arguments in this group are specified.

               --git-file-source-uri=URL
                  The URI of the repository to clone when trigger is invoked.

                  This flag argument must be specified if any of the other
                  arguments in this group are specified.

         At most one of these can be specified:

           --source-to-build-branch=SOURCE_TO_BUILD_BRANCH
              Branch to build.

           --source-to-build-tag=SOURCE_TO_BUILD_TAG
              Tag to build.

         At most one of these can be specified:

           --source-to-build-github-enterprise-config=SOURCE_TO_BUILD_GITHUB_ENTERPRISE_CONFIG
              The resource name of the GitHub Enterprise config that should be
              applied to this source (1st gen). Format:
              projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}
              or projects/{project}/githubEnterpriseConfigs/{id}

           --source-to-build-repo-type=SOURCE_TO_BUILD_REPO_TYPE
              Type of the repository (1st gen). Currently only GitHub and Cloud
              Source Repository types are supported.

              This flag argument must be specified if any of the other
              arguments in this group are specified.

           --source-to-build-uri=SOURCE_TO_BUILD_URI
              The URI of the repository that should be applied to this source
              (1st gen).

              This flag argument must be specified if any of the other
              arguments in this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers update manual

        $ gcloud beta builds triggers update manual
```

### gcloud builds triggers update pubsub

```text
NAME
    gcloud builds triggers update pubsub - update a Pub/Sub trigger used by
        Cloud Build

SYNOPSIS
    gcloud builds triggers update pubsub (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --[no-]require-approval --service-account=SERVICE_ACCOUNT
          --topic=TOPIC --clear-subscription-filter
          | --subscription-filter=SUBSCRIPTION_FILTER --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...] --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR
          --dockerfile-image=DOCKERFILE_IMAGE]
          | --git-file-source-branch=GIT_FILE_SOURCE_BRANCH
          | --git-file-source-tag=GIT_FILE_SOURCE_TAG
          --git-file-source-github-enterprise-config=GIT_FILE_SOURCE_GITHUB_ENTERPRISE_CONFIG --git-file-source-path=PATH --git-file-source-repo-type=GIT_FILE_SOURCE_REPO_TYPE --git-file-source-uri=URL --source-to-build-branch=SOURCE_TO_BUILD_BRANCH | --source-to-build-tag=SOURCE_TO_BUILD_TAG --source-to-build-github-enterprise-config=SOURCE_TO_BUILD_GITHUB_ENTERPRISE_CONFIG --source-to-build-repo-type=SOURCE_TO_BUILD_REPO_TYPE --source-to-build-uri=SOURCE_TO_BUILD_URI)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Pub/Sub trigger used by Cloud Build.

EXAMPLES
    To update the branch from which the trigger clones:

        $ gcloud builds triggers update pubsub my-trigger \
            --source-to-build-branch=my-branch

    To update the topic:

        $ gcloud builds triggers update pubsub my-trigger \
            --topic=projects/my-project/topics/my-topic

    To update the substitutions of the trigger:        $ gcloud builds triggers update pubsub my-trigger \
            --update-substitutions=_REPO_NAME=my-repo,_BRANCH_NAME=master

POSITIONAL ARGUMENTS
     Trigger resource - Build Trigger. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument TRIGGER on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRIGGER
          ID of the trigger or fully qualified identifier for the trigger.

          To set the trigger attribute:
          + provide the argument TRIGGER on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud location for the trigger.

          To set the region attribute:
          + provide the argument TRIGGER on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

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

         --topic=TOPIC
            The topic to which this trigger should subscribe.

         At most one of these can be specified:

           --clear-subscription-filter
              Clear existing subscription filter.

           --subscription-filter=SUBSCRIPTION_FILTER
              CEL filter expression for the trigger. See
              https://cloud.google.com/build/docs/filter-build-events-using-cel
              for more details.

         At most one of these can be specified:

           --clear-substitutions
              Clear existing substitutions.

           --remove-substitutions=[KEY,...]
              Remove existing substitutions if present.

           --update-substitutions=[KEY=VALUE,...]
              Update or add to existing substitutions. Substitutions are
              parameters to be substituted or add in the build specification.

              For example (using some nonsensical substitution keys; all keys
              must begin with an underscore):

                  $ gcloud builds triggers update ...
                      --update-substitutions _FAVORITE_COLOR=blue,_NUM_CANDIES=10

              This will add the provided substitutions to the existing
              substitutions and results in a build where every occurrence of
              ${_FAVORITE_COLOR} in certain fields is replaced by "blue", and
              similarly for ${_NUM_CANDIES} and "10".

              Only the following built-in variables can be specified with the
              --substitutions flag: REPO_NAME, BRANCH_NAME, TAG_NAME,
              REVISION_ID, COMMIT_SHA, SHORT_SHA.

              For more details, see:
              https://cloud.google.com/build/docs/build-config-file-schema#substitutions

         At most one of these can be specified:

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

             --dockerfile-dir=DOCKERFILE_DIR
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

           Or at least one of these can be specified:

             Build file source flags

             At most one of these can be specified:

               --git-file-source-branch=GIT_FILE_SOURCE_BRANCH
                  The branch of the repository to clone when trigger is
                  invoked.

               --git-file-source-tag=GIT_FILE_SOURCE_TAG
                  The tag of the repository to clone when trigger is invoked.

             At most one of these can be specified:

               --git-file-source-github-enterprise-config=GIT_FILE_SOURCE_GITHUB_ENTERPRISE_CONFIG
                  The resource name of the GitHub Enterprise config that should
                  be applied to this source.

               --git-file-source-path=PATH
                  The file in the repository to clone when trigger is invoked.

               --git-file-source-repo-type=GIT_FILE_SOURCE_REPO_TYPE
                  The type of the repository to clone when trigger is invoked.

                  This flag argument must be specified if any of the other
                  arguments in this group are specified.

               --git-file-source-uri=URL
                  The URI of the repository to clone when trigger is invoked.

                  This flag argument must be specified if any of the other
                  arguments in this group are specified.

         At most one of these can be specified:

           --source-to-build-branch=SOURCE_TO_BUILD_BRANCH
              Branch to build.

           --source-to-build-tag=SOURCE_TO_BUILD_TAG
              Tag to build.

         At most one of these can be specified:

           --source-to-build-github-enterprise-config=SOURCE_TO_BUILD_GITHUB_ENTERPRISE_CONFIG
              The resource name of the GitHub Enterprise config that should be
              applied to this source (1st gen). Format:
              projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}
              or projects/{project}/githubEnterpriseConfigs/{id}

           --source-to-build-repo-type=SOURCE_TO_BUILD_REPO_TYPE
              Type of the repository (1st gen). Currently only GitHub and Cloud
              Source Repository types are supported.

              This flag argument must be specified if any of the other
              arguments in this group are specified.

           --source-to-build-uri=SOURCE_TO_BUILD_URI
              The URI of the repository that should be applied to this source
              (1st gen).

              This flag argument must be specified if any of the other
              arguments in this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers update pubsub

        $ gcloud beta builds triggers update pubsub
```

### gcloud builds triggers update webhook

```text
NAME
    gcloud builds triggers update webhook - update a Webhook trigger used by
        Cloud Build

SYNOPSIS
    gcloud builds triggers update webhook (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --[no-]require-approval --secret=SECRET
          --service-account=SERVICE_ACCOUNT
          --subscription-filter=SUBSCRIPTION_FILTER --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...] --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR
          --dockerfile-image=DOCKERFILE_IMAGE]
          | --git-file-source-branch=GIT_FILE_SOURCE_BRANCH
          | --git-file-source-tag=GIT_FILE_SOURCE_TAG
          --git-file-source-github-enterprise-config=GIT_FILE_SOURCE_GITHUB_ENTERPRISE_CONFIG --git-file-source-path=PATH --git-file-source-repo-type=GIT_FILE_SOURCE_REPO_TYPE --git-file-source-uri=URL --source-to-build-branch=SOURCE_TO_BUILD_BRANCH | --source-to-build-tag=SOURCE_TO_BUILD_TAG --source-to-build-github-enterprise-config=SOURCE_TO_BUILD_GITHUB_ENTERPRISE_CONFIG --source-to-build-repo-type=SOURCE_TO_BUILD_REPO_TYPE --source-to-build-uri=SOURCE_TO_BUILD_URI)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Webhook trigger used by Cloud Build.

EXAMPLES
    To update the branch from which the trigger clones:

        $ gcloud builds triggers update webhook my-webhook-trigger \
            --source-to-build-branch=my-branch

    To update the webhook secret:

        $ gcloud builds triggers update webhook my-webhook-trigger \
            --secret=projects/my-project/secrets/my-secret/versions/2

    To update the substitutions of the trigger:        $ gcloud builds triggers update webhook my-trigger \
            --update-substitutions=_REPO_NAME=my-repo,_BRANCH_NAME=master

POSITIONAL ARGUMENTS
     Trigger resource - Build Trigger. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument TRIGGER on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRIGGER
          ID of the trigger or fully qualified identifier for the trigger.

          To set the trigger attribute:
          + provide the argument TRIGGER on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud location for the trigger.

          To set the region attribute:
          + provide the argument TRIGGER on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

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

         --[no-]require-approval
            Require manual approval for triggered builds. Use
            --require-approval to enable and --no-require-approval to disable.

         --secret=SECRET
            The full path of the secret version required to validate webhook
            requests against this trigger. For example,
            projects/my-project/secrets/my-secret/versions/1.

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

         At most one of these can be specified:

           --clear-substitutions
              Clear existing substitutions.

           --remove-substitutions=[KEY,...]
              Remove existing substitutions if present.

           --update-substitutions=[KEY=VALUE,...]
              Update or add to existing substitutions. Substitutions are
              parameters to be substituted or add in the build specification.

              For example (using some nonsensical substitution keys; all keys
              must begin with an underscore):

                  $ gcloud builds triggers update ...
                      --update-substitutions _FAVORITE_COLOR=blue,_NUM_CANDIES=10

              This will add the provided substitutions to the existing
              substitutions and results in a build where every occurrence of
              ${_FAVORITE_COLOR} in certain fields is replaced by "blue", and
              similarly for ${_NUM_CANDIES} and "10".

              Only the following built-in variables can be specified with the
              --substitutions flag: REPO_NAME, BRANCH_NAME, TAG_NAME,
              REVISION_ID, COMMIT_SHA, SHORT_SHA.

              For more details, see:
              https://cloud.google.com/build/docs/build-config-file-schema#substitutions

         At most one of these can be specified:

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

             --dockerfile-dir=DOCKERFILE_DIR
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

           Or at least one of these can be specified:

             Build file source flags

             At most one of these can be specified:

               --git-file-source-branch=GIT_FILE_SOURCE_BRANCH
                  The branch of the repository to clone when trigger is
                  invoked.

               --git-file-source-tag=GIT_FILE_SOURCE_TAG
                  The tag of the repository to clone when trigger is invoked.

             At most one of these can be specified:

               --git-file-source-github-enterprise-config=GIT_FILE_SOURCE_GITHUB_ENTERPRISE_CONFIG
                  The resource name of the GitHub Enterprise config that should
                  be applied to this source.

               --git-file-source-path=PATH
                  The file in the repository to clone when trigger is invoked.

               --git-file-source-repo-type=GIT_FILE_SOURCE_REPO_TYPE
                  The type of the repository to clone when trigger is invoked.

                  This flag argument must be specified if any of the other
                  arguments in this group are specified.

               --git-file-source-uri=URL
                  The URI of the repository to clone when trigger is invoked.

                  This flag argument must be specified if any of the other
                  arguments in this group are specified.

         At most one of these can be specified:

           --source-to-build-branch=SOURCE_TO_BUILD_BRANCH
              Branch to build.

           --source-to-build-tag=SOURCE_TO_BUILD_TAG
              Tag to build.

         At most one of these can be specified:

           --source-to-build-github-enterprise-config=SOURCE_TO_BUILD_GITHUB_ENTERPRISE_CONFIG
              The resource name of the GitHub Enterprise config that should be
              applied to this source (1st gen). Format:
              projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}
              or projects/{project}/githubEnterpriseConfigs/{id}

           --source-to-build-repo-type=SOURCE_TO_BUILD_REPO_TYPE
              Type of the repository (1st gen). Currently only GitHub and Cloud
              Source Repository types are supported.

              This flag argument must be specified if any of the other
              arguments in this group are specified.

           --source-to-build-uri=SOURCE_TO_BUILD_URI
              The URI of the repository that should be applied to this source
              (1st gen).

              This flag argument must be specified if any of the other
              arguments in this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers update webhook

        $ gcloud beta builds triggers update webhook
```

### gcloud beta builds triggers update bitbucket-cloud

```text
NAME
    gcloud beta builds triggers update bitbucket-cloud - updates Bitbucket
        Cloud trigger used by Cloud Build

SYNOPSIS
    gcloud beta builds triggers update bitbucket-cloud
        (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --ignored-files=[GLOB,...] --included-files=[GLOB,...]
          --repository=REPOSITORY --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX | --comment-control=COMMENT_CONTROL
          --pull-request-pattern=REGEX --build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers update bitbucket-data-center

```text
NAME
    gcloud beta builds triggers update bitbucket-data-center - updates
        Bitbucket Data Center trigger used by Cloud Build

SYNOPSIS
    gcloud beta builds triggers update bitbucket-data-center
        (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --ignored-files=[GLOB,...] --included-files=[GLOB,...]
          --repository=REPOSITORY --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX | --comment-control=COMMENT_CONTROL
          --pull-request-pattern=REGEX --build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers update bitbucketserver

```text
NAME
    gcloud beta builds triggers update bitbucketserver - updates Bitbucket
        Server trigger used by Cloud Build

SYNOPSIS
    gcloud beta builds triggers update bitbucketserver
        (TRIGGER : --region=REGION)
        (--trigger-config=PATH
          | --bitbucket-server-config-resource=BITBUCKET_SERVER_CONFIG_RESOURCE
          --description=DESCRIPTION --ignored-files=[GLOB,...]
          --included-files=[GLOB,...] --project-key=PROJECT_KEY
          --repo-slug=REPO_SLUG --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX | --comment-control=COMMENT_CONTROL;
          default="COMMENTS_ENABLED"
          --pull-request-pattern=REGEX --build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers update cloud-source-repositories

```text
NAME
    gcloud beta builds triggers update cloud-source-repositories - updates
        Cloud Source Repositories trigger used by Cloud Build

SYNOPSIS
    gcloud beta builds triggers update cloud-source-repositories
        (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --ignored-files=[GLOB,...] --included-files=[GLOB,...] --repo=REPO
          --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX --build-config=PATH | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers update developer-connect

```text
NAME
    gcloud beta builds triggers update developer-connect - updates Developer
        Connect trigger used by Cloud Build

SYNOPSIS
    gcloud beta builds triggers update developer-connect
        (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --git-repository-link=GIT_REPOSITORY_LINK --ignored-files=[GLOB,...]
          --included-files=[GLOB,...] --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX | --comment-control=COMMENT_CONTROL
          --pull-request-pattern=REGEX --build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers update github

```text
NAME
    gcloud beta builds triggers update github - update GitHub trigger used by
        Cloud Build

SYNOPSIS
    gcloud beta builds triggers update github (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --ignored-files=[GLOB,...] --include-logs-with-status
          --included-files=[GLOB,...] --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX | --comment-control=COMMENT_CONTROL;
          default="COMMENTS_ENABLED"
          --pull-request-pattern=REGEX --build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...] --repository=REPOSITORY
          | --enterprise-config=ENTERPRISE_CONFIG
          --repo-name=REPO_NAME --repo-owner=REPO_OWNER) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers update gitlab

```text
NAME
    gcloud beta builds triggers update gitlab - updates GitLab trigger used by
        Cloud Build

SYNOPSIS
    gcloud beta builds triggers update gitlab (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --ignored-files=[GLOB,...] --included-files=[GLOB,...]
          --repository=REPOSITORY --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX | --comment-control=COMMENT_CONTROL
          --pull-request-pattern=REGEX --build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers update manual

```text
NAME
    gcloud beta builds triggers update manual - updates a manual trigger used
        by Cloud Build

SYNOPSIS
    gcloud beta builds triggers update manual (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...] --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR
          --dockerfile-image=DOCKERFILE_IMAGE]
          | --git-file-source-branch=GIT_FILE_SOURCE_BRANCH
          | --git-file-source-tag=GIT_FILE_SOURCE_TAG
          --git-file-source-github-enterprise-config=GIT_FILE_SOURCE_GITHUB_ENTERPRISE_CONFIG --git-file-source-path=PATH --git-file-source-repo-type=GIT_FILE_SOURCE_REPO_TYPE --git-file-source-uri=URL --source-to-build-branch=SOURCE_TO_BUILD_BRANCH | --source-to-build-tag=SOURCE_TO_BUILD_TAG --source-to-build-github-enterprise-config=SOURCE_TO_BUILD_GITHUB_ENTERPRISE_CONFIG --source-to-build-repo-type=SOURCE_TO_BUILD_REPO_TYPE --source-to-build-uri=SOURCE_TO_BUILD_URI)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers update pubsub

```text
NAME
    gcloud beta builds triggers update pubsub - update a Pub/Sub trigger used
        by Cloud Build

SYNOPSIS
    gcloud beta builds triggers update pubsub (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --[no-]require-approval --service-account=SERVICE_ACCOUNT
          --topic=TOPIC --clear-subscription-filter
          | --subscription-filter=SUBSCRIPTION_FILTER --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...] --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR
          --dockerfile-image=DOCKERFILE_IMAGE]
          | --git-file-source-branch=GIT_FILE_SOURCE_BRANCH
          | --git-file-source-tag=GIT_FILE_SOURCE_TAG
          --git-file-source-github-enterprise-config=GIT_FILE_SOURCE_GITHUB_ENTERPRISE_CONFIG --git-file-source-path=PATH --git-file-source-repo-type=GIT_FILE_SOURCE_REPO_TYPE --git-file-source-uri=URL --source-to-build-branch=SOURCE_TO_BUILD_BRANCH | --source-to-build-tag=SOURCE_TO_BUILD_TAG --source-to-build-github-enterprise-config=SOURCE_TO_BUILD_GITHUB_ENTERPRISE_CONFIG --source-to-build-repo-type=SOURCE_TO_BUILD_REPO_TYPE --source-to-build-uri=SOURCE_TO_BUILD_URI)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds triggers update webhook

```text
NAME
    gcloud beta builds triggers update webhook - update a Webhook trigger used
        by Cloud Build

SYNOPSIS
    gcloud beta builds triggers update webhook (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --[no-]require-approval --secret=SECRET
          --service-account=SERVICE_ACCOUNT
          --subscription-filter=SUBSCRIPTION_FILTER --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...] --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR
          --dockerfile-image=DOCKERFILE_IMAGE]
          | --git-file-source-branch=GIT_FILE_SOURCE_BRANCH
          | --git-file-source-tag=GIT_FILE_SOURCE_TAG
          --git-file-source-github-enterprise-config=GIT_FILE_SOURCE_GITHUB_ENTERPRISE_CONFIG --git-file-source-path=PATH --git-file-source-repo-type=GIT_FILE_SOURCE_REPO_TYPE --git-file-source-uri=URL --source-to-build-branch=SOURCE_TO_BUILD_BRANCH | --source-to-build-tag=SOURCE_TO_BUILD_TAG --source-to-build-github-enterprise-config=SOURCE_TO_BUILD_GITHUB_ENTERPRISE_CONFIG --source-to-build-repo-type=SOURCE_TO_BUILD_REPO_TYPE --source-to-build-uri=SOURCE_TO_BUILD_URI)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers update bitbucket-cloud

```text
NAME
    gcloud alpha builds triggers update bitbucket-cloud - updates Bitbucket
        Cloud trigger used by Cloud Build

SYNOPSIS
    gcloud alpha builds triggers update bitbucket-cloud
        (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --ignored-files=[GLOB,...] --included-files=[GLOB,...]
          --repository=REPOSITORY --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX | --comment-control=COMMENT_CONTROL
          --pull-request-pattern=REGEX --build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers update bitbucket-data-center

```text
NAME
    gcloud alpha builds triggers update bitbucket-data-center - updates
        Bitbucket Data Center trigger used by Cloud Build

SYNOPSIS
    gcloud alpha builds triggers update bitbucket-data-center
        (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --ignored-files=[GLOB,...] --included-files=[GLOB,...]
          --repository=REPOSITORY --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX | --comment-control=COMMENT_CONTROL
          --pull-request-pattern=REGEX --build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers update bitbucketserver

```text
NAME
    gcloud alpha builds triggers update bitbucketserver - updates Bitbucket
        Server trigger used by Cloud Build

SYNOPSIS
    gcloud alpha builds triggers update bitbucketserver
        (TRIGGER : --region=REGION)
        (--trigger-config=PATH
          | --bitbucket-server-config-resource=BITBUCKET_SERVER_CONFIG_RESOURCE
          --description=DESCRIPTION --ignored-files=[GLOB,...]
          --included-files=[GLOB,...] --project-key=PROJECT_KEY
          --repo-slug=REPO_SLUG --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX | --comment-control=COMMENT_CONTROL;
          default="COMMENTS_ENABLED"
          --pull-request-pattern=REGEX --build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers update cloud-source-repositories

```text
NAME
    gcloud alpha builds triggers update cloud-source-repositories - updates
        Cloud Source Repositories trigger used by Cloud Build

SYNOPSIS
    gcloud alpha builds triggers update cloud-source-repositories
        (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --ignored-files=[GLOB,...] --included-files=[GLOB,...] --repo=REPO
          --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX --build-config=PATH | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers update developer-connect

```text
NAME
    gcloud alpha builds triggers update developer-connect - updates Developer
        Connect trigger used by Cloud Build

SYNOPSIS
    gcloud alpha builds triggers update developer-connect
        (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --git-repository-link=GIT_REPOSITORY_LINK --ignored-files=[GLOB,...]
          --included-files=[GLOB,...] --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX | --comment-control=COMMENT_CONTROL
          --pull-request-pattern=REGEX --build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers update github

```text
NAME
    gcloud alpha builds triggers update github - update GitHub trigger used by
        Cloud Build

SYNOPSIS
    gcloud alpha builds triggers update github (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --ignored-files=[GLOB,...] --include-logs-with-status
          --included-files=[GLOB,...] --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX | --comment-control=COMMENT_CONTROL;
          default="COMMENTS_ENABLED"
          --pull-request-pattern=REGEX --build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...] --repository=REPOSITORY
          | --enterprise-config=ENTERPRISE_CONFIG
          --repo-name=REPO_NAME --repo-owner=REPO_OWNER) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers update gitlab

```text
NAME
    gcloud alpha builds triggers update gitlab - updates GitLab trigger used by
        Cloud Build

SYNOPSIS
    gcloud alpha builds triggers update gitlab (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --ignored-files=[GLOB,...] --included-files=[GLOB,...]
          --repository=REPOSITORY --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --branch-pattern=REGEX
          | --tag-pattern=REGEX | --comment-control=COMMENT_CONTROL
          --pull-request-pattern=REGEX --build-config=PATH
          | --inline-config=PATH
          | [--dockerfile=DOCKERFILE --dockerfile-image=DOCKERFILE_IMAGE
          : --dockerfile-dir=DOCKERFILE_DIR] --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...]) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers update manual

```text
NAME
    gcloud alpha builds triggers update manual - updates a manual trigger used
        by Cloud Build

SYNOPSIS
    gcloud alpha builds triggers update manual (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...] --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR
          --dockerfile-image=DOCKERFILE_IMAGE]
          | --git-file-source-branch=GIT_FILE_SOURCE_BRANCH
          | --git-file-source-tag=GIT_FILE_SOURCE_TAG
          --git-file-source-github-enterprise-config=GIT_FILE_SOURCE_GITHUB_ENTERPRISE_CONFIG --git-file-source-path=PATH --git-file-source-repo-type=GIT_FILE_SOURCE_REPO_TYPE --git-file-source-uri=URL --source-to-build-branch=SOURCE_TO_BUILD_BRANCH | --source-to-build-tag=SOURCE_TO_BUILD_TAG --source-to-build-github-enterprise-config=SOURCE_TO_BUILD_GITHUB_ENTERPRISE_CONFIG --source-to-build-repo-type=SOURCE_TO_BUILD_REPO_TYPE --source-to-build-uri=SOURCE_TO_BUILD_URI)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers update pubsub

```text
NAME
    gcloud alpha builds triggers update pubsub - update a Pub/Sub trigger used
        by Cloud Build

SYNOPSIS
    gcloud alpha builds triggers update pubsub (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --[no-]require-approval --service-account=SERVICE_ACCOUNT
          --topic=TOPIC --clear-subscription-filter
          | --subscription-filter=SUBSCRIPTION_FILTER --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...] --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR
          --dockerfile-image=DOCKERFILE_IMAGE]
          | --git-file-source-branch=GIT_FILE_SOURCE_BRANCH
          | --git-file-source-tag=GIT_FILE_SOURCE_TAG
          --git-file-source-github-enterprise-config=GIT_FILE_SOURCE_GITHUB_ENTERPRISE_CONFIG --git-file-source-path=PATH --git-file-source-repo-type=GIT_FILE_SOURCE_REPO_TYPE --git-file-source-uri=URL --source-to-build-branch=SOURCE_TO_BUILD_BRANCH | --source-to-build-tag=SOURCE_TO_BUILD_TAG --source-to-build-github-enterprise-config=SOURCE_TO_BUILD_GITHUB_ENTERPRISE_CONFIG --source-to-build-repo-type=SOURCE_TO_BUILD_REPO_TYPE --source-to-build-uri=SOURCE_TO_BUILD_URI)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers update webhook

```text
NAME
    gcloud alpha builds triggers update webhook - update a Webhook trigger used
        by Cloud Build

SYNOPSIS
    gcloud alpha builds triggers update webhook (TRIGGER : --region=REGION)
        (--trigger-config=PATH | --description=DESCRIPTION
          --[no-]require-approval --secret=SECRET
          --service-account=SERVICE_ACCOUNT
          --subscription-filter=SUBSCRIPTION_FILTER --clear-substitutions
          | --remove-substitutions=[KEY,...]
          | --update-substitutions=[KEY=VALUE,...] --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR
          --dockerfile-image=DOCKERFILE_IMAGE]
          | --git-file-source-branch=GIT_FILE_SOURCE_BRANCH
          | --git-file-source-tag=GIT_FILE_SOURCE_TAG
          --git-file-source-github-enterprise-config=GIT_FILE_SOURCE_GITHUB_ENTERPRISE_CONFIG --git-file-source-path=PATH --git-file-source-repo-type=GIT_FILE_SOURCE_REPO_TYPE --git-file-source-uri=URL --source-to-build-branch=SOURCE_TO_BUILD_BRANCH | --source-to-build-tag=SOURCE_TO_BUILD_TAG --source-to-build-github-enterprise-config=SOURCE_TO_BUILD_GITHUB_ENTERPRISE_CONFIG --source-to-build-repo-type=SOURCE_TO_BUILD_REPO_TYPE --source-to-build-uri=SOURCE_TO_BUILD_URI)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the 2nd gen repository examples name a repository in `us-west1` but omit `--region`; without it (and without the `builds/region` property) the trigger is created in, or looked up in, `global`, and the `--region` description of `triggers create` says that a region must be specified for 2nd gen repositories ("global is not supported"); the runnable form adds `--region=us-west1`, the location in the repository name.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/triggers/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

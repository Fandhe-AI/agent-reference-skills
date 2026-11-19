---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/triggers/create
---

# gcloud builds triggers create (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds triggers create bitbucket-cloud

```text
NAME
    gcloud builds triggers create bitbucket-cloud - create a build trigger for
        a 2nd-gen Bitbucket Cloud repository

SYNOPSIS
    gcloud builds triggers create bitbucket-cloud
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

DESCRIPTION
    Create a build trigger for a 2nd-gen Bitbucket Cloud repository.

EXAMPLES
    To create a push trigger with a 2nd-gen repository for all branches:

        $ gcloud builds triggers create bitbucket-cloud \
            --name="my-trigger" \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" \
            --repository="projects/1234/locations/us-central1/connections/my\
        conn/repositories/myrepo" --branch-pattern=".*" \
            --build-config="cloudbuild.yaml" --region=us-central1

    To create a pull request trigger with a 2nd-gen repository for main:

        $ gcloud builds triggers create bitbucket-cloud \
            --name="my-trigger" \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" \
            --repository="projects/1234/locations/us-central1/connections/my\
        conn/repositories/myrepo" --build-config="cloudbuild.yaml" \
            --pull-request-pattern="^main$" --region=us-central1

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

         --name=NAME
            Build trigger name.

         --region=REGION
            The region of the Cloud Build Service to use. Must be set to a
            supported region name (e.g. us-central1). If unset, builds/region,
            which is the default region to use when working with Cloud Build
            resources, is used. If builds/region is unset, region is set to
            global. Note: Region must be specified in 2nd gen repo; global is
            not supported.

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

         --substitutions=[KEY=VALUE,...]
            Parameters to be substituted in the build specification. For
            example:

                $ gcloud builds triggers create bitbucket-cloud ... \
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

             --pull-request-pattern=REGEX
                Regular expression specifying which base git branch to match
                for pull request events.

                This pattern is used as a regex search for the base branch (the
                branch you are trying to merge into) for pull request updates.
                For example, --pull-request-pattern=foo will match "foo",
                "foobar", and "barfoo".

                The syntax of the regular expressions accepted is the syntax
                accepted by RE2 and described at
                https://github.com/google/re2/wiki/Syntax.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --comment-control=COMMENT_CONTROL; default="COMMENTS_ENABLED"
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

             --dockerfile-image=DOCKERFILE_IMAGE
                Docker image name to build.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --dockerfile-dir=DOCKERFILE_DIR; default="/"
                Location of the directory containing the Dockerfile in the
                repository.

                The directory will also be used as the Docker build context.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers create bitbucket-cloud

        $ gcloud beta builds triggers create bitbucket-cloud
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud builds triggers create bitbucket-cloud \
    --name="my-trigger" \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --repository="projects/1234/locations/us-central1/connections/myconn/repositories/myrepo" \
    --branch-pattern=".*" \
    --build-config="cloudbuild.yaml" \
    --region=us-central1

gcloud builds triggers create bitbucket-cloud \
    --name="my-trigger" \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --repository="projects/1234/locations/us-central1/connections/myconn/repositories/myrepo" \
    --build-config="cloudbuild.yaml" \
    --pull-request-pattern="^main$" \
    --region=us-central1
```

### gcloud builds triggers create bitbucket-data-center

```text
NAME
    gcloud builds triggers create bitbucket-data-center - create a build
        trigger for a 2nd-gen Bitbucket Data Center repository

SYNOPSIS
    gcloud builds triggers create bitbucket-data-center
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

DESCRIPTION
    Create a build trigger for a 2nd-gen Bitbucket Data Center repository.

EXAMPLES
    To create a push trigger with a 2nd-gen repository for all branches:

        $ gcloud builds triggers create bitbucket-data-center \
            --name="my-trigger" \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" \
            --repository="projects/1234/locations/us-central1/connections/my\
        conn/repositories/myrepo" --branch-pattern=".*" \
            --build-config="cloudbuild.yaml" --region=us-central1

    To create a pull request trigger with a 2nd-gen repository for main:

        $ gcloud builds triggers create bitbucket-data-center \
            --name="my-trigger" \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" \
            --repository="projects/1234/locations/us-central1/connections/my\
        conn/repositories/myrepo" --build-config="cloudbuild.yaml" \
            --pull-request-pattern="^main$" --region=us-central1

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

         --name=NAME
            Build trigger name.

         --region=REGION
            The region of the Cloud Build Service to use. Must be set to a
            supported region name (e.g. us-central1). If unset, builds/region,
            which is the default region to use when working with Cloud Build
            resources, is used. If builds/region is unset, region is set to
            global. Note: Region must be specified in 2nd gen repo; global is
            not supported.

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

         --substitutions=[KEY=VALUE,...]
            Parameters to be substituted in the build specification. For
            example:

                $ gcloud builds triggers create bitbucket-data-center ... \
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

             --pull-request-pattern=REGEX
                Regular expression specifying which base git branch to match
                for pull request events.

                This pattern is used as a regex search for the base branch (the
                branch you are trying to merge into) for pull request updates.
                For example, --pull-request-pattern=foo will match "foo",
                "foobar", and "barfoo".

                The syntax of the regular expressions accepted is the syntax
                accepted by RE2 and described at
                https://github.com/google/re2/wiki/Syntax.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --comment-control=COMMENT_CONTROL; default="COMMENTS_ENABLED"
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

             --dockerfile-image=DOCKERFILE_IMAGE
                Docker image name to build.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --dockerfile-dir=DOCKERFILE_DIR; default="/"
                Location of the directory containing the Dockerfile in the
                repository.

                The directory will also be used as the Docker build context.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers create bitbucket-data-center

        $ gcloud beta builds triggers create bitbucket-data-center
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud builds triggers create bitbucket-data-center \
    --name="my-trigger" \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --repository="projects/1234/locations/us-central1/connections/myconn/repositories/myrepo" \
    --branch-pattern=".*" \
    --build-config="cloudbuild.yaml" \
    --region=us-central1

gcloud builds triggers create bitbucket-data-center \
    --name="my-trigger" \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --repository="projects/1234/locations/us-central1/connections/myconn/repositories/myrepo" \
    --build-config="cloudbuild.yaml" \
    --pull-request-pattern="^main$" \
    --region=us-central1
```

### gcloud builds triggers create bitbucketserver

```text
NAME
    gcloud builds triggers create bitbucketserver - create a build trigger for
        a Bitbucket Server repository

SYNOPSIS
    gcloud builds triggers create bitbucketserver
        (--trigger-config=PATH
          | [--bitbucket-server-config-resource=BITBUCKET_SERVER_CONFIG_RESOURCE --project-key=PROJECT_KEY --repo-slug=REPO_SLUG (--branch-pattern=REGEX | --tag-pattern=REGEX | [--pull-request-pattern=REGEX : --comment-control=COMMENT_CONTROL; default="COMMENTS_ENABLED"]) (--build-config=PATH | --inline-config=PATH | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR; default="/" --dockerfile-image=DOCKERFILE_IMAGE]) : --description=DESCRIPTION --ignored-files=[GLOB,
          ...] --included-files=[GLOB,...] --name=NAME --region=REGION
          --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a build trigger for a Bitbucket Server repository.

EXAMPLES
    To create a push trigger for all branches:

        $ gcloud builds triggers create bitbucketserver \
            --name="my-trigger" \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" \
            --project-key="GoogleCloudPlatform" \
            --repo-slug="cloud-builders" \
            --bitbucket-server-config-resource="projects/1234/locations/glob\
        al/bitbucketServerConfigs/5678" --branch-pattern=".*" \
            --build-config="cloudbuild.yaml"

    To create a pull request trigger for main:

        $ gcloud builds triggers create bitbucketserver \
            --name="my-trigger" \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" \
            --project-key="GoogleCloudPlatform" \
            --repo-slug="cloud-builders" \
            --bitbucket-server-config-resource="projects/1234/locations/glob\
        al/bitbucketServerConfigs/5678" --pull-request-pattern="^main$" \
            --build-config="cloudbuild.yaml"

REQUIRED FLAGS
     Exactly one of these must be specified:

       --trigger-config=PATH
          Path to Build Trigger config file (JSON or YAML format). For more
          details, see
          https://cloud.google.com/cloud-build/docs/api/reference/rest/v1/projects.triggers#BuildTrigger

       Or at least one of these can be specified:

         Flag based trigger configuration

         --bitbucket-server-config-resource=BITBUCKET_SERVER_CONFIG_RESOURCE
            Bitbucket Server config resource name.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --project-key=PROJECT_KEY
            Bitbucket Server project key.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --repo-slug=REPO_SLUG
            Bitbucket Server repository slug.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --description=DESCRIPTION
            Build trigger description.

         --ignored-files=[GLOB,...]
            Glob filter. Changes only affecting ignored files won't trigger
            builds.

         --included-files=[GLOB,...]
            Glob filter. Changes affecting at least one included file will
            trigger builds.

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

                $ gcloud builds triggers create bitbucketserver ... \
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

             --pull-request-pattern=REGEX
                Regular expression specifying which base git branch to match
                for pull request events.

                This pattern is used as a regex search for the base branch (the
                branch you are trying to merge into) for pull request updates.
                For example, --pull-request-pattern=foo will match "foo",
                "foobar", and "barfoo".

                The syntax of the regular expressions accepted is the syntax
                accepted by RE2 and described at
                https://github.com/google/re2/wiki/Syntax.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --comment-control=COMMENT_CONTROL; default="COMMENTS_ENABLED"
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers create bitbucketserver

        $ gcloud beta builds triggers create bitbucketserver
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud builds triggers create bitbucketserver \
    --name="my-trigger" \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --project-key="GoogleCloudPlatform" \
    --repo-slug="cloud-builders" \
    --bitbucket-server-config-resource="projects/1234/locations/global/bitbucketServerConfigs/5678" \
    --branch-pattern=".*" \
    --build-config="cloudbuild.yaml"

gcloud builds triggers create bitbucketserver \
    --name="my-trigger" \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --project-key="GoogleCloudPlatform" \
    --repo-slug="cloud-builders" \
    --bitbucket-server-config-resource="projects/1234/locations/global/bitbucketServerConfigs/5678" \
    --pull-request-pattern="^main$" \
    --build-config="cloudbuild.yaml"
```

### gcloud builds triggers create cloud-source-repositories

```text
NAME
    gcloud builds triggers create cloud-source-repositories - create a build
        trigger from a Cloud Source Repository

SYNOPSIS
    gcloud builds triggers create cloud-source-repositories
        (--trigger-config=PATH | [--repo=REPO (--branch-pattern=REGEX
          | --tag-pattern=REGEX) (--build-config=PATH | --inline-config=PATH
          | [--dockerfile=DOCKERFILE : --dockerfile-dir=DOCKERFILE_DIR;
          default="/" --dockerfile-image=DOCKERFILE_IMAGE])
          : --description=DESCRIPTION --ignored-files=[GLOB,...]
          --included-files=[GLOB,...] --name=NAME --region=REGION
          --[no-]require-approval
          --service-account=SERVICE_ACCOUNT --substitutions=[KEY=VALUE,...]])
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a build trigger from a Cloud Source Repository.

EXAMPLES
    To create a push trigger for all branches:

        $ gcloud builds triggers create cloud-source-repositories \
            --name="my-trigger" \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" --repo="my-repo" \
            --branch-pattern=".*" --build-config="cloudbuild.yaml"

REQUIRED FLAGS
     Exactly one of these must be specified:

       --trigger-config=PATH
          Path to Build Trigger config file (JSON or YAML format). For more
          details, see
          https://cloud.google.com/cloud-build/docs/api/reference/rest/v1/projects.triggers#BuildTrigger

       Or at least one of these can be specified:

         Flag based trigger configuration

         Repo resource - Cloud Source Repository. This represents a Cloud
         resource. (NOTE) Some attributes are not given arguments in this group
         but can be set in other ways.

         To set the project attribute:
          - provide the argument --repo on the command line with a fully
            specified name;
          - set the property core/project.

         This must be specified.

           --repo=REPO
              ID of the repo or fully qualified identifier for the repo.

              To set the repo attribute:
              o provide the argument --repo on the command line.

         --description=DESCRIPTION
            Build trigger description.

         --ignored-files=[GLOB,...]
            Glob filter. Changes only affecting ignored files won't trigger
            builds.

         --included-files=[GLOB,...]
            Glob filter. Changes affecting at least one included file will
            trigger builds.

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

                $ gcloud builds triggers create cloud-source-repositories ... \
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers create cloud-source-repositories

        $ gcloud beta builds triggers create cloud-source-repositories
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud builds triggers create cloud-source-repositories \
    --name="my-trigger" \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --repo="my-repo" \
    --branch-pattern=".*" \
    --build-config="cloudbuild.yaml"
```

### gcloud builds triggers create github

```text
NAME
    gcloud builds triggers create github - create a build trigger for a GitHub
        repository

SYNOPSIS
    gcloud builds triggers create github
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

DESCRIPTION
    Create a build trigger for a GitHub repository.

EXAMPLES
    To create a push trigger with a 1st-gen repository for all branches:

        $ gcloud builds triggers create github --name="my-trigger" \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" \
            --repo-owner="GoogleCloudPlatform" \
            --repo-name="cloud-builders" --branch-pattern=".*" \
            --build-config="cloudbuild.yaml"

    To create a pull request trigger with a 1st-gen repository for master:

        $ gcloud builds triggers create github --name="my-trigger" \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" \
            --repo-owner="GoogleCloudPlatform" \
            --repo-name="cloud-builders" --pull-request-pattern="^master$" \
            --build-config="cloudbuild.yaml"

    To create a pull request trigger with a 2nd gen repository for master:

        $ gcloud builds triggers create github --name="my-trigger" \
            --repository=projects/my-project/locations/us-central1/\
        connections/my-conn/repositories/my-repo \
            --pull-request-pattern="^master$" \
            --build-config="cloudbuild.yaml" --region=us-central1

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

         --include-logs-with-status
            Build logs will be sent back to GitHub as part of the checkrun
            result.

         --included-files=[GLOB,...]
            Glob filter. Changes affecting at least one included file will
            trigger builds.

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

                $ gcloud builds triggers create github ... \
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

             --pull-request-pattern=REGEX
                A regular expression specifying which base git branch to match
                for pull request events.

                This pattern is used as a regex search for the base branch (the
                branch you are trying to merge into) for pull request updates.
                For example, --pull-request-pattern=foo will match "foo",
                "foobar", and "barfoo".

                The syntax of the regular expressions accepted is the syntax
                accepted by RE2 and described at
                https://github.com/google/re2/wiki/Syntax.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --comment-control=COMMENT_CONTROL; default="COMMENTS_ENABLED"
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

         Exactly one of these must be specified:

           --repository=REPOSITORY
              Repository resource (2nd gen) to use, in the format
              "projects/*/locations/*/connections/*/repositories/".

           Or at least one of these can be specified:

             1st-gen repository settings.

             --repo-name=REPO_NAME
                Name of the GitHub Repository (1st gen).

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --repo-owner=REPO_OWNER
                Owner of the GitHub Repository (1st gen).

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --enterprise-config=ENTERPRISE_CONFIG
                Resource name of the GitHub Enterprise config that should be
                applied to this installation.

                For example:
                "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers create github

        $ gcloud beta builds triggers create github
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud builds triggers create github \
    --name="my-trigger" \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --repo-owner="GoogleCloudPlatform" \
    --repo-name="cloud-builders" \
    --branch-pattern=".*" \
    --build-config="cloudbuild.yaml"

gcloud builds triggers create github \
    --name="my-trigger" \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --repo-owner="GoogleCloudPlatform" \
    --repo-name="cloud-builders" \
    --pull-request-pattern="^master$" \
    --build-config="cloudbuild.yaml"

gcloud builds triggers create github \
    --name="my-trigger" \
    --repository=projects/my-project/locations/us-central1/connections/my-conn/repositories/my-repo \
    --pull-request-pattern="^master$" \
    --build-config="cloudbuild.yaml" \
    --region=us-central1
```

### gcloud builds triggers create gitlab

```text
NAME
    gcloud builds triggers create gitlab - create a build trigger for a 2nd-gen
        GitLab repository

SYNOPSIS
    gcloud builds triggers create gitlab
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

DESCRIPTION
    Create a build trigger for a 2nd-gen GitLab repository.

EXAMPLES
    To create a push trigger with a 2nd-gen repository for all branches:

        $ gcloud builds triggers create gitlab --name="my-trigger" \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" \
            --repository="projects/1234/locations/us-central1/connections/my\
        conn/repositories/myrepo" --branch-pattern=".*" \
            --build-config="cloudbuild.yaml" --region=us-central1

    To create a pull request trigger with a 2nd-gen repository for main:

        $ gcloud builds triggers create gitlab --name="my-trigger" \
            --service-account="projects/my-project/serviceAccounts/my-byosa@\
        my-project.iam.gserviceaccount.com" \
            --repository="projects/1234/locations/us-central1/connections/my\
        conn/repositories/myrepo" --build-config="cloudbuild.yaml" \
            --pull-request-pattern="^main$" --region=us-central1

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

         --name=NAME
            Build trigger name.

         --region=REGION
            The region of the Cloud Build Service to use. Must be set to a
            supported region name (e.g. us-central1). If unset, builds/region,
            which is the default region to use when working with Cloud Build
            resources, is used. If builds/region is unset, region is set to
            global. Note: Region must be specified in 2nd gen repo; global is
            not supported.

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

         --substitutions=[KEY=VALUE,...]
            Parameters to be substituted in the build specification. For
            example:

                $ gcloud builds triggers create gitlab ... \
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

             --pull-request-pattern=REGEX
                Regular expression specifying which base git branch to match
                for pull request events.

                This pattern is used as a regex search for the base branch (the
                branch you are trying to merge into) for pull request updates.
                For example, --pull-request-pattern=foo will match "foo",
                "foobar", and "barfoo".

                The syntax of the regular expressions accepted is the syntax
                accepted by RE2 and described at
                https://github.com/google/re2/wiki/Syntax.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --comment-control=COMMENT_CONTROL; default="COMMENTS_ENABLED"
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

             --dockerfile-image=DOCKERFILE_IMAGE
                Docker image name to build.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --dockerfile-dir=DOCKERFILE_DIR; default="/"
                Location of the directory containing the Dockerfile in the
                repository.

                The directory will also be used as the Docker build context.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers create gitlab

        $ gcloud beta builds triggers create gitlab
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud builds triggers create gitlab \
    --name="my-trigger" \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --repository="projects/1234/locations/us-central1/connections/myconn/repositories/myrepo" \
    --branch-pattern=".*" \
    --build-config="cloudbuild.yaml" \
    --region=us-central1

gcloud builds triggers create gitlab \
    --name="my-trigger" \
    --service-account="projects/my-project/serviceAccounts/my-byosa@my-project.iam.gserviceaccount.com" \
    --repository="projects/1234/locations/us-central1/connections/myconn/repositories/myrepo" \
    --build-config="cloudbuild.yaml" \
    --pull-request-pattern="^main$" \
    --region=us-central1
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/triggers/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

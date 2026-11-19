---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/triggers/update
---

# gcloud builds triggers update (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds triggers update bitbucket-cloud

```text
NAME
    gcloud builds triggers update bitbucket-cloud - updates Bitbucket Cloud
        trigger used by Cloud Build

SYNOPSIS
    gcloud builds triggers update bitbucket-cloud (TRIGGER : --region=REGION)
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
    Updates Bitbucket Cloud trigger used by Cloud Build.

EXAMPLES
    To update the branch pattern of the trigger:

        $ gcloud builds triggers update bitbucket-cloud my-trigger \
            --branch-pattern=".*"

    To update the build config of the trigger:

        $ gcloud builds triggers update bitbucket-cloud my-trigger \
            --build-config="cloudbuild.yaml"

    To update the substitutions of the trigger:

        $ gcloud builds triggers update bitbucket-cloud my-trigger \
            --update-substitutions=_REPO_NAME=my-repo,_BRANCH_NAME=master

    To update the 2nd-gen repository resource of the trigger:

        $ gcloud builds triggers update bitbucket-cloud my-trigger \
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

        $ gcloud alpha builds triggers update bitbucket-cloud

        $ gcloud beta builds triggers update bitbucket-cloud
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud builds triggers update bitbucket-cloud my-trigger \
    --repository=projects/my-project/locations/us-west1/connections/my-conn/repositories/my-repo \
    --region=us-west1
```

### gcloud builds triggers update bitbucket-data-center

```text
NAME
    gcloud builds triggers update bitbucket-data-center - updates Bitbucket
        Data Center trigger used by Cloud Build

SYNOPSIS
    gcloud builds triggers update bitbucket-data-center
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

DESCRIPTION
    Updates Bitbucket Data Center trigger used by Cloud Build.

EXAMPLES
    To update the branch pattern of the trigger:

        $ gcloud builds triggers update bitbucket-data-center my-trigger \
            --branch-pattern=".*"

    To update the build config of the trigger:

        $ gcloud builds triggers update bitbucket-data-center my-trigger \
            --build-config="cloudbuild.yaml"

    To update the substitutions of the trigger:

        $ gcloud builds triggers update bitbucket-data-center my-trigger \
            --update-substitutions=_REPO_NAME=my-repo,_BRANCH_NAME=master

    To update the 2nd-gen repository resource of the trigger:

        $ gcloud builds triggers update bitbucket-data-center my-trigger \
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

        $ gcloud alpha builds triggers update bitbucket-data-center

        $ gcloud beta builds triggers update bitbucket-data-center
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud builds triggers update bitbucket-data-center my-trigger \
    --repository=projects/my-project/locations/us-west1/connections/my-conn/repositories/my-repo \
    --region=us-west1
```

### gcloud builds triggers update bitbucketserver

```text
NAME
    gcloud builds triggers update bitbucketserver - updates Bitbucket Server
        trigger used by Cloud Build

SYNOPSIS
    gcloud builds triggers update bitbucketserver (TRIGGER : --region=REGION)
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

DESCRIPTION
    Updates Bitbucket Server trigger used by Cloud Build.

EXAMPLES
    To update the branch pattern of the trigger:

        $ gcloud builds triggers update bitbucketserver my-trigger \
            --branch-pattern=".*"

    To update the build config of the trigger:

        $ gcloud builds triggers update bitbucketserver my-trigger \
            --build-config="cloudbuild.yaml"

    To update the substitutions of the trigger:        $ gcloud builds triggers update bitbucketserver my-trigger \
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

         --bitbucket-server-config-resource=BITBUCKET_SERVER_CONFIG_RESOURCE
            Bitbucket Server config resource name.

         --description=DESCRIPTION
            Build trigger description.

         --ignored-files=[GLOB,...]
            Glob filter. Changes only affecting ignored files won't trigger
            builds.

         --included-files=[GLOB,...]
            Glob filter. Changes affecting at least one included file will
            trigger builds.

         --project-key=PROJECT_KEY
            Bitbucket Server project key.

         --repo-slug=REPO_SLUG
            Bitbucket Server repository slug.

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

        $ gcloud alpha builds triggers update bitbucketserver

        $ gcloud beta builds triggers update bitbucketserver
```

### gcloud builds triggers update cloud-source-repositories

```text
NAME
    gcloud builds triggers update cloud-source-repositories - updates Cloud
        Source Repositories trigger used by Cloud Build

SYNOPSIS
    gcloud builds triggers update cloud-source-repositories
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

DESCRIPTION
    Updates Cloud Source Repositories trigger used by Cloud Build.

EXAMPLES
    To update the branch pattern of the trigger:

        $ gcloud builds triggers update cloud-source-repositories \
            my-trigger --branch-pattern=".*"

    To update the build config of the trigger:

        $ gcloud builds triggers update cloud-source-repositories \
            my-trigger --build-config="cloudbuild.yaml"

    To update the substitutions of the trigger:

        $ gcloud builds triggers update cloud-source-repositories \
            my-trigger \
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

         --ignored-files=[GLOB,...]
            Glob filter. Changes only affecting ignored files won't trigger
            builds.

         --included-files=[GLOB,...]
            Glob filter. Changes affecting at least one included file will
            trigger builds.

         Repo resource - Cloud Source Repository. This represents a Cloud
         resource. (NOTE) Some attributes are not given arguments in this group
         but can be set in other ways.

         To set the project attribute:
          - provide the argument --repo on the command line with a fully
            specified name;
          - set the property core/project.

         --repo=REPO
            ID of the repo or fully qualified identifier for the repo.

            To set the repo attribute:
            - provide the argument --repo on the command line.

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

        $ gcloud alpha builds triggers update cloud-source-repositories

        $ gcloud beta builds triggers update cloud-source-repositories
```

### gcloud builds triggers update github

```text
NAME
    gcloud builds triggers update github - update GitHub trigger used by Cloud
        Build

SYNOPSIS
    gcloud builds triggers update github (TRIGGER : --region=REGION)
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

DESCRIPTION
    Update GitHub trigger used by Cloud Build.

EXAMPLES
    To update the branch pattern of the trigger:

        $ gcloud builds triggers update github my-trigger \
            --branch-pattern=".*"

    To update the build config of the trigger:

        $ gcloud builds triggers update github my-trigger \
            --build-config="cloudbuild.yaml"

    To update the substitutions of the trigger:

        $ gcloud builds triggers update github my-trigger \
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

         --ignored-files=[GLOB,...]
            Glob filter. Changes only affecting ignored files won't trigger
            builds.

         --include-logs-with-status
            Build logs will be sent back to GitHub as part of the checkrun
            result.

         --included-files=[GLOB,...]
            Glob filter. Changes affecting at least one included file will
            trigger builds.

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

         At most one of these can be specified:

           --repository=REPOSITORY
              Repository resource (2nd gen) to use, in the format
              "projects/*/locations/*/connections/*/repositories/".

           Or at least one of these can be specified:

             --enterprise-config=ENTERPRISE_CONFIG
                Resource name of the GitHub Enterprise config that should be
                applied to this installation.

                For example:
                "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}

             --repo-name=REPO_NAME
                Name of the GitHub Repository.

             --repo-owner=REPO_OWNER
                Owner of the GitHub Repository.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers update github

        $ gcloud beta builds triggers update github
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

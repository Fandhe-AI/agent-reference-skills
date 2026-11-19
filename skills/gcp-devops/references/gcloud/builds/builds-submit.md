---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/submit
---

# gcloud builds submit

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds submit

```text
NAME
    gcloud builds submit - submit a build using Cloud Build

SYNOPSIS
    gcloud builds submit [[SOURCE] --no-source] [--async] [--no-cache]
        [--default-buckets-behavior=DEFAULT_BUCKETS_BEHAVIOR] [--dir=DIR]
        [--disk-size=DISK_SIZE] [--gcs-log-dir=GCS_LOG_DIR]
        [--gcs-source-staging-dir=GCS_SOURCE_STAGING_DIR]
        [--git-source-dir=GIT_SOURCE_DIR]
        [--git-source-revision=GIT_SOURCE_REVISION] [--ignore-file=IGNORE_FILE]
        [--machine-type=MACHINE_TYPE]
        [--polling-interval=POLLING_INTERVAL; default=1] [--region=REGION]
        [--revision=REVISION] [--service-account=SERVICE_ACCOUNT]
        [--substitutions=[KEY=VALUE,...]] [--suppress-logs] [--timeout=TIMEOUT]
        [--worker-pool=WORKER_POOL] [--worker-release=WORKER_RELEASE]
        [--config=CONFIG; default="cloudbuild.yaml"
          | --pack=[builder=BUILDER],[env=ENV],[image=IMAGE]
          | --tag=TAG, -t TAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Submit a build using Cloud Build.

    When the builds/use_kaniko property is True, builds submitted with --tag
    will use Kaniko (https://github.com/GoogleContainerTools/kaniko) to execute
    builds. Kaniko executes directives in a Dockerfile, with remote layer
    caching for faster builds. By default, Kaniko will cache layers for 6
    hours. To override this, set the builds/kaniko_cache_ttl property.

EXAMPLES
    To submit a build with source located at storage URL
    gs://bucket/object.zip:

        $ gcloud builds submit "gs://bucket/object.zip" \
           --tag=gcr.io/my-project/image

    To submit a build with source located at storage URL gs://bucket/object.zip
    using config file config.yaml:

        $ gcloud builds submit "gs://bucket/object.zip" --config=config.yaml

    To submit a build with source from a source manifest:

        $ gcloud builds submit "gs://bucket/manifest.json" \
            --config=config.yaml

    To submit a build with local source source.tgz asynchronously:

        $ gcloud builds submit "source.tgz" --tag=gcr.io/my-project/image \
            --async

    To submit a build with source from a Git repository
    https://github.com/owner/repo:

        $ gcloud builds submit "https://github.com/owner/repo" \
            --git-source-revision=main --config=config.yaml

    To submit a build with source from a 2nd-gen Cloud Build repository
    resource
    projects/my-project/locations/us-west1/connections/my-conn/repositories/my-repo:

        $ gcloud builds submit \
            "projects/my-project/locations/us-west1/connections/my-conn/repo\
        sitories/my-repo" --revision=main

    To submit a build with source from a Developer Connect GitRepositoryLink
    resource
    projects/my-project/locations/us-west1/connections/my-conn/gitRepositoryLinks/my-repo-link:

        $ gcloud builds submit \
            "projects/my-project/locations/us-west1/connections/my-conn/gitR\
        epositoryLinks/my-repo-link" --revision=main

POSITIONAL ARGUMENTS
     At most one of these can be specified:

       [SOURCE]
          The location of the source to build. The location can be a directory
          on a local disk, an archive file (e.g., .zip, .tar.gz) or a manifest
          file (.json) in Google Cloud Storage, a Git repo url starting with
          http:// or https://, a 2nd-gen Cloud Build repository resource, or a
          Developer Connect GitRepositoryLink resource. If the source is a
          local directory, this command skips the files specified in the
          --ignore-file. If --ignore-file is not specified, use.gcloudignore
          file. If a .gcloudignore file is absent and a .gitignore file is
          present in the local source directory, gcloud will use a generated
          Git-compatible .gcloudignore file that respects your .gitignored
          files. The global .gitignore is not respected. For more information
          on .gcloudignore, see gcloud topic gcloudignore.

       --no-source
          Specify that no source should be uploaded with this build.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --no-cache
        If set, disable layer caching when building with Kaniko.

        This has the same effect as setting the builds/kaniko_cache_ttl
        property to 0 for this build. This can be useful in cases where
        Dockerfile builds are non-deterministic and a non-deterministic result
        should not be cached.

     --default-buckets-behavior=DEFAULT_BUCKETS_BEHAVIOR
        How default buckets are setup. DEFAULT_BUCKETS_BEHAVIOR must be one of:
        default-logs-bucket-behavior-unspecified, legacy-bucket,
        regional-user-owned-bucket.

     --dir=DIR
        Directory, relative to the source root, in which to run the build. This
        is used when the build source is a 2nd-gen Cloud Build repository
        resource, or a Developer Connect GitRepositoryLink resource. This must
        be a relative path. If a step's dir is specified and is an absolute
        path, this value is ignored for that step's execution.

     --disk-size=DISK_SIZE
        Machine disk size (GB) to run the build.

     --gcs-log-dir=GCS_LOG_DIR
        A directory in Google Cloud Storage to hold build logs. If this field
        is not set,
        gs://[PROJECT_NUMBER].cloudbuild-logs.googleusercontent.com/ will be
        created and used or
        gs://[PROJECT_NUMBER]-[builds/region]-cloudbuild-logs is used when you
        set --default-buckets-behavior to REGIONAL_USER_OWNED_BUCKET.

     --gcs-source-staging-dir=GCS_SOURCE_STAGING_DIR
        A directory in Google Cloud Storage to copy the source used for staging
        the build. If the specified bucket does not exist, Cloud Build will
        create one. If you don't set this field,
        gs://[PROJECT_ID]_cloudbuild/source is used or
        gs://[PROJECT_ID]_[builds/region]_cloudbuild/source is used when you
        set --default-buckets-behavior to REGIONAL_USER_OWNED_BUCKET and
        builds/region is not global.

     --git-source-dir=GIT_SOURCE_DIR
        Directory, relative to the source root, in which to run the build. This
        must be a relative path. If a step's dir is specified and is an
        absolute path, this value is ignored for that step's execution.

     --git-source-revision=GIT_SOURCE_REVISION
        Revision to fetch from the Git repository such as a branch, a tag, a
        commit SHA, or any Git ref to run the build.

        Cloud Build uses git fetch to fetch the revision from the Git
        repository; therefore make sure that the string you provide for
        revision is parsable by the command. For information on string values
        accepted by git fetch, see
        https://git-scm.com/docs/gitrevisions#_specifying_revisions. For
        information on git fetch, see https://git-scm.com/docs/git-fetch.

     --ignore-file=IGNORE_FILE
        Override the .gcloudignore file and use the specified file instead.

     --machine-type=MACHINE_TYPE
        Machine type used to run the build. MACHINE_TYPE must be one of:
        e2-highcpu-32, e2-highcpu-8, e2-medium, e2-standard-2, n1-highcpu-32,
        n1-highcpu-8.

     --polling-interval=POLLING_INTERVAL; default=1
        Amount of time in seconds to wait between polling build status.

     --region=REGION
        The region of the Cloud Build Service to use. Must be set to a
        supported region name (e.g. us-central1). If unset, builds/region,
        which is the default region to use when working with Cloud Build
        resources, is used. If builds/region is unset, region is set to global.
        Note: Region must be specified in 2nd gen repo; global is not
        supported.

     --revision=REVISION
        Revision to fetch from the Git repository such as a branch, a tag, a
        commit SHA, or any Git ref to run the build. This is used when the
        build source is a 2nd-gen Cloud Build repository resource, or a
        Developer Connect GitRepositoryLink resource.

        Cloud Build uses git fetch to fetch the revision from the Git
        repository; therefore make sure that the string you provide for
        revision is parsable by the command. For information on string values
        accepted by git fetch, see
        https://git-scm.com/docs/gitrevisions#_specifying_revisions. For
        information on git fetch, see https://git-scm.com/docs/git-fetch.

     --service-account=SERVICE_ACCOUNT
        The service account to use with this build. If unset, the default
        service account will be used.

     --substitutions=[KEY=VALUE,...]
        Parameters to be substituted in the build specification.

        For example (using some nonsensical substitution keys; all keys must
        begin with an underscore):

            $ gcloud builds submit . --config config.yaml \
                --substitutions _FAVORITE_COLOR=blue,_NUM_CANDIES=10

        This will result in a build where every occurrence of
        ${_FAVORITE_COLOR} in certain fields is replaced by "blue", and
        similarly for ${_NUM_CANDIES} and "10".

        Only the following built-in variables can be specified with the
        --substitutions flag: REPO_NAME, BRANCH_NAME, TAG_NAME, REVISION_ID,
        COMMIT_SHA, SHORT_SHA.

        For more details, see:
        https://cloud.google.com/cloud-build/docs/api/build-requests#substitutions

     --suppress-logs
        If set, build logs not streamed to stdout.

     --timeout=TIMEOUT
        Maximum time a build is run before it is failed as TIMEOUT. It is
        specified as a duration; for example, "2h15m5s" is two hours, fifteen
        minutes, and five seconds. If you don't specify a unit, seconds is
        assumed. For example, "10" is 10 seconds. Overrides the default
        builds/timeout property value for this command invocation.

     Worker pool only flags.

     --worker-pool=WORKER_POOL
        Specify a worker pool for the build to run in. Format:
        projects/{project}/locations/{region}/workerPools/{workerPool}.

     --worker-release=WORKER_RELEASE
        Specifies the release channel or version to use for the build worker
        image. Accepts release channel names (rapid, regular, stable) or
        specific release versions (for example, 2026.09, legacy). See
        https://docs.cloud.google.com/build/docs/release-channels.

     At most one of these can be specified:

       --config=CONFIG; default="cloudbuild.yaml"
          The YAML or JSON file to use as the build configuration file.

       --pack=[builder=BUILDER],[env=ENV],[image=IMAGE]
          Uses CNCF buildpack (https://buildpacks.io/) to create the app image.
          The app "image" key/value must be provided. The app image name must
          be in the gcr.io or pkg.dev namespace. To specify your own builder
          image use the optional "builder" key/value argument. By default
          gcr.io/buildpacks/builder is used. To pass environment variables to
          the builder use the optional "env" key/value argument where value is
          a list of key values using escaping
          (https://cloud.google.com/sdk/gcloud/reference/topic/escaping) if
          necessary.

       --tag=TAG, -t TAG
          The tag to use with a "docker build" image creation. Cloud Build will
          run a remote "docker build -t $TAG .", where $TAG is the tag provided
          by this flag. The tag must be in the gcr.io or pkg.dev namespace.
          Specify a tag if you want Cloud Build to build using a Dockerfile
          instead of a build config file. If you specify a tag in this command,
          your source must include a Dockerfile. For instructions on building
          using a Dockerfile see
          https://cloud.google.com/cloud-build/docs/quickstart-build.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds submit

        $ gcloud beta builds submit
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud builds submit "projects/my-project/locations/us-west1/connections/my-conn/repositories/my-repo" \
    --revision=main \
    --region=us-west1

gcloud builds submit "projects/my-project/locations/us-west1/connections/my-conn/gitRepositoryLinks/my-repo-link" \
    --revision=main \
    --region=us-west1
```

### gcloud beta builds submit

```text
NAME
    gcloud beta builds submit - submit a build using Cloud Build

SYNOPSIS
    gcloud beta builds submit [[SOURCE] --no-source] [--async] [--no-cache]
        [--default-buckets-behavior=DEFAULT_BUCKETS_BEHAVIOR] [--dir=DIR]
        [--disk-size=DISK_SIZE] [--gcs-log-dir=GCS_LOG_DIR]
        [--gcs-source-staging-dir=GCS_SOURCE_STAGING_DIR]
        [--git-source-dir=GIT_SOURCE_DIR]
        [--git-source-revision=GIT_SOURCE_REVISION] [--ignore-file=IGNORE_FILE]
        [--machine-type=MACHINE_TYPE]
        [--polling-interval=POLLING_INTERVAL; default=1] [--region=REGION]
        [--revision=REVISION] [--service-account=SERVICE_ACCOUNT]
        [--substitutions=[KEY=VALUE,...]] [--suppress-logs] [--timeout=TIMEOUT]
        [--worker-pool=WORKER_POOL] [--worker-release=WORKER_RELEASE]
        [--config=CONFIG; default="cloudbuild.yaml"
          | --pack=[builder=BUILDER],[env=ENV],[image=IMAGE]
          | --tag=TAG, -t TAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds submit

```text
NAME
    gcloud alpha builds submit - submit a build using Cloud Build

SYNOPSIS
    gcloud alpha builds submit [[SOURCE] --no-source] [--async] [--no-cache]
        [--default-buckets-behavior=DEFAULT_BUCKETS_BEHAVIOR] [--dir=DIR]
        [--disk-size=DISK_SIZE] [--gcs-log-dir=GCS_LOG_DIR]
        [--gcs-source-staging-dir=GCS_SOURCE_STAGING_DIR]
        [--git-source-dir=GIT_SOURCE_DIR]
        [--git-source-revision=GIT_SOURCE_REVISION] [--ignore-file=IGNORE_FILE]
        [--machine-type=MACHINE_TYPE]
        [--polling-interval=POLLING_INTERVAL; default=1] [--region=REGION]
        [--revision=REVISION] [--service-account=SERVICE_ACCOUNT]
        [--substitutions=[KEY=VALUE,...]] [--suppress-logs] [--timeout=TIMEOUT]
        [--worker-pool=WORKER_POOL] [--worker-release=WORKER_RELEASE]
        [--config=CONFIG; default="cloudbuild.yaml"
          | --pack=[builder=BUILDER],[env=ENV],[image=IMAGE]
          | --tag=TAG, -t TAG] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the repository examples omit `--region`; the `--region` description on this page says that without it (and without the `builds/region` property) the region is `global`, and that a region must be specified for 2nd gen repositories ("global is not supported"); the runnable form adds `--region=us-west1`, the location in the resource name.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/submit (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/releases
---

# gcloud deploy releases

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud deploy releases abandon

```text
NAME
    gcloud deploy releases abandon - abandons a release

SYNOPSIS
    gcloud deploy releases abandon
        (RELEASE : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    After a release is abandoned, no new rollouts can be created from it.

    Rollouts of abandoned releases can't be rolled back to.

    Existing rollouts of abandoned releases will be unaffected.

EXAMPLES
    To abandon a release called test-release for delivery pipeline
    test-pipeline in region us-central1, run:

        $ gcloud deploy releases abandon test-release \
            --delivery-pipeline=test-pipeline --region=us-central1

POSITIONAL ARGUMENTS
     Release resource - The name of the Release. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument release on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RELEASE
          ID of the release or fully qualified identifier for the release.

          To set the release attribute:
          + provide the argument release on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The delivery pipeline associated with the release. Alternatively, set
          the property [deploy/delivery-pipeline].

          To set the delivery-pipeline attribute:
          + provide the argument release on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          The Cloud region for the release. Alternatively, set the property
          [deploy/region].

          To set the region attribute:
          + provide the argument release on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha deploy releases abandon

        $ gcloud beta deploy releases abandon
```

### gcloud deploy releases create

```text
NAME
    gcloud deploy releases create - creates a new release, delivery pipeline
        qualified

SYNOPSIS
    gcloud deploy releases create
        (RELEASE : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [--annotations=[KEY=VALUE,...]] [--deploy-parameters=[KEY=VALUE,...]]
        [--description=DESCRIPTION] [--docker-version=DOCKER_VERSION]
        [--gcs-source-staging-dir=GCS_SOURCE_STAGING_DIR]
        [--helm-version=HELM_VERSION] [--ignore-file=IGNORE_FILE]
        [--kpt-version=KPT_VERSION] [--kubectl-version=KUBECTL_VERSION]
        [--kustomize-version=KUSTOMIZE_VERSION] [--labels=[KEY=VALUE,...]]
        [--override-deploy-policies=[POLICY,...]]
        [--skaffold-version=SKAFFOLD_VERSION] [--to-target=TO_TARGET]
        [--build-artifacts=BUILD_ARTIFACTS | --images=[NAME=TAG,...]]
        [--disable-initial-rollout | --enable-initial-rollout
          --initial-rollout-annotations=[KEY=VALUE,...]
          --initial-rollout-labels=[KEY=VALUE,...]
          --initial-rollout-phase-id=INITIAL_ROLLOUT_PHASE_ID]
        [--from-k8s-manifest=FROM_K8S_MANIFEST
          | --from-run-manifest=FROM_RUN_MANIFEST
          | --skaffold-file=SKAFFOLD_FILE --source=SOURCE; default="."]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new release, delivery pipeline qualified.

EXAMPLES
    To create a release with source located at storage URL
    gs://bucket/object.zip and the first rollout in the first target of the
    promotion sequence:

        $ gcloud deploy releases create my-release \
           --source=`gs://bucket/object.zip` \
           --delivery-pipeline=my-pipeline --region=us-central1

    To create a release with source located at current directory and deploy a
    rollout to target prod :

        $ gcloud deploy releases create my-release \
            --delivery-pipeline=my-pipeline --region=us-central1 \
            --to-target=prod

    The following command creates a release without a skaffold.yaml as input,
    and generates one for you:

        $ gcloud deploy releases create my-release \
            --delivery-pipeline=my-pipeline --region=us-central1 \
            --from-k8s-manifest=path/to/kubernetes/k8.yaml

    The current UTC date and time on the machine running the gcloud command can
    also be included in the release name by adding $DATE and $TIME parameters:

        $ gcloud deploy releases create 'my-release-$DATE-$TIME' \
            --delivery-pipeline=my-pipeline --region=us-central1

    If the current UTC date and time is set to 2021-12-21 12:02, then the
    created release will have its name set as my-release-20211221-1202.

    When using these parameters, please be sure to wrap the release name in
    single quotes or else the template parameters will be overridden by
    environment variables.

POSITIONAL ARGUMENTS
     Release resource - The name of the Release. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument release on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RELEASE
          ID of the release or fully qualified identifier for the release.

          To set the release attribute:
          + provide the argument release on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The delivery pipeline associated with the release. Alternatively, set
          the property [deploy/delivery-pipeline].

          To set the delivery-pipeline attribute:
          + provide the argument release on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          The Cloud region for the release. Alternatively, set the property
          [deploy/region].

          To set the region attribute:
          + provide the argument release on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

FLAGS
     --annotations=[KEY=VALUE,...]
        Annotations to apply to the release. Annotations take the form of
        key/value string pairs.

        Examples:

        Add annotations:

            $ gcloud deploy releases create \
                --annotations="from_target=test,status=stable"

     --deploy-parameters=[KEY=VALUE,...]
        Deployment parameters to apply to the release. Deployment parameters
        take the form of key/value string pairs.

        Examples:

        Add deployment parameters:

            $ gcloud deploy releases create \
                --deploy-parameters="key1=value1,key2=value2"

     --description=DESCRIPTION
        Description of the release.

     --docker-version=DOCKER_VERSION
        Version of the Docker binary.

     --gcs-source-staging-dir=GCS_SOURCE_STAGING_DIR
        A directory in Google Cloud Storage to copy the source used for staging
        the build. If the specified bucket does not exist, Cloud Deploy will
        create one. If you don't set this field,
        gs://[DELIVERY_PIPELINE_ID]_clouddeploy/source is used.

     --helm-version=HELM_VERSION
        Version of the Helm binary.

     --ignore-file=IGNORE_FILE
        Override the .gcloudignore file and use the specified file instead.

     --kpt-version=KPT_VERSION
        Version of the Kpt binary.

     --kubectl-version=KUBECTL_VERSION
        Version of the Kubectl binary.

     --kustomize-version=KUSTOMIZE_VERSION
        Version of the Kustomize binary.

     --labels=[KEY=VALUE,...]
        Labels to apply to the release. Labels take the form of key/value
        string pairs.

        Examples:

        Add labels:

            $ gcloud deploy releases create --labels="commit=abc123,author=foo"

     --override-deploy-policies=[POLICY,...]
        Deploy policies to override

     --skaffold-version=SKAFFOLD_VERSION
        Version of the Skaffold binary.

     --to-target=TO_TARGET
        Specifies a target to deliver into upon release creation

     At most one of these can be specified:

       --build-artifacts=BUILD_ARTIFACTS
          Reference to a Skaffold build artifacts output file from skaffold
          build --file-output=BUILD_ARTIFACTS. If you aren't using Skaffold,
          use the --images flag below to specify the
          image-names-to-tagged-image references.

       --images=[NAME=TAG,...]
          Reference to a collection of individual image name to image full path
          replacements.

          For example:

              $ gcloud deploy releases create foo \
                  --images image1=path/to/image1:v1@sha256:45db24

     At most one of these can be specified:

       --disable-initial-rollout
          Skips creating a rollout in the first target defined in the delivery
          pipeline.

       Or at least one of these can be specified:

         --enable-initial-rollout
            Creates a rollout in the first target defined in the delivery
            pipeline. This is the default behavior.

         --initial-rollout-annotations=[KEY=VALUE,...]
            Annotations to apply to the initial rollout when creating the
            release. Annotations take the form of key/value string pairs.

            Examples:

            Add annotations:

                $ gcloud deploy releases create \
                    --initial-rollout-annotations="from_target=test,status=stable"

         --initial-rollout-labels=[KEY=VALUE,...]
            Labels to apply to the initial rollout when creating the release.
            Labels take the form of key/value string pairs.

            Examples:

            Add labels:

                $ gcloud deploy releases create \
                    initial-rollout-labels="commit=abc123,author=foo"

         --initial-rollout-phase-id=INITIAL_ROLLOUT_PHASE_ID
            The phase to start the initial rollout at when creating the
            release. The phase ID must be a valid phase on the rollout. If not
            specified, then the rollout will start at the first phase.

            Examples:

            Start rollout at stable phase:

                $ gcloud deploy releases create --initial-rollout-phase-id=stable

     At most one of these can be specified:

       --from-k8s-manifest=FROM_K8S_MANIFEST
          The path to a Kubernetes manifest, which Cloud Deploy will use to
          generate a skaffold.yaml file for you (for example, foo/bar/k8.yaml).
          The generated Skaffold file will be available in the Google Cloud
          Storage source staging directory (see --gcs-source-staging-dir flag)
          after the release is complete.

       --from-run-manifest=FROM_RUN_MANIFEST
          The path to a Cloud Run manifest, which Cloud Deploy will use to
          generate a skaffold.yaml file for you (for example,
          foo/bar/service.yaml). The generated Skaffold file will be available
          in the Google Cloud Storage source staging directory (see
          --gcs-source-staging-dir flag) after the release is complete.

       Or at least one of these can be specified:

         --skaffold-file=SKAFFOLD_FILE
            Path of the skaffold file absolute or relative to the source
            directory.

            Examples:

            Use Skaffold file with relative path: The current working directory
            is expected to be some part of the skaffold path (e.g. the current
            working directory could be /home/user)

                $ gcloud deploy releases create --source=/home/user/source \
                    --skaffold-file=config/skaffold.yaml

            The skaffold file absolute file path is expected to be:
            /home/user/source/config/skaffold.yaml

            Use Skaffold file with absolute path and with or without source
            argument:

                $ gcloud deploy releases create --source=/home/user/source \
                    --skaffold-file=/home/user/source/config/skaffold.yaml

                $ gcloud deploy releases create \
                    --skaffold-file=/home/user/source/config/skaffold.yaml

         --source=SOURCE; default="."
            The location of the source that contains skaffold.yaml. The
            location can be a directory on a local disk or a gzipped archive
            file (.tar.gz) in Google Cloud Storage. If the source is a local
            directory, this command skips the files specified in the
            --ignore-file. If --ignore-file is not specified, use.gcloudignore
            file. If a .gcloudignore file is absent and a .gitignore file is
            present in the local source directory, gcloud will use a generated
            Git-compatible .gcloudignore file that respects your .gitignored
            files. The global .gitignore is not respected. For more information
            on .gcloudignore, see gcloud topic gcloudignore.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha deploy releases create

        $ gcloud beta deploy releases create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud deploy releases create my-release \
    --source='gs://bucket/object.zip' \
    --delivery-pipeline=my-pipeline \
    --region=us-central1
```

### gcloud deploy releases describe

```text
NAME
    gcloud deploy releases describe - show details about a release

SYNOPSIS
    gcloud deploy releases describe
        (RELEASE : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details a specified release.

EXAMPLES
    To show details about the release 'test-release', for delivery pipeline
    'test-pipeline', in region 'us-central1', run:

        $ gcloud deploy releases describe test-release \
            --delivery-pipeline=test-pipeline --region=us-central1

POSITIONAL ARGUMENTS
     Release resource - The release you want to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument release on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RELEASE
          ID of the release or fully qualified identifier for the release.

          To set the release attribute:
          + provide the argument release on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The name of the Cloud Deploy delivery pipeline.

          To set the delivery-pipeline attribute:
          + provide the argument release on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          Location of the release.

          To set the region attribute:
          + provide the argument release on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the clouddeploy/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/deploy/

NOTES
    These variants are also available:

        $ gcloud alpha deploy releases describe

        $ gcloud beta deploy releases describe
```

### gcloud deploy releases list

```text
NAME
    gcloud deploy releases list - list releases

SYNOPSIS
    gcloud deploy releases list
        [--delivery-pipeline=DELIVERY_PIPELINE --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the releases for a specified delivery pipeline.

EXAMPLES
    To list the releases for delivery pipeline 'test-pipeline', in region
    'us-central1', run:

        $ gcloud deploy releases list --delivery-pipeline=test-pipeline \
            --region=us-central1

FLAGS
     Delivery pipeline resource - The delivery pipeline for which you want to
     list the releases. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --delivery-pipeline on the command line with a
        fully specified name;
      * set the property deploy/delivery_pipeline with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --delivery-pipeline=DELIVERY_PIPELINE
        ID of the delivery_pipeline or fully qualified identifier for the
        delivery_pipeline.

        To set the delivery-pipeline attribute:
        * provide the argument --delivery-pipeline on the command line;
        * set the property deploy/delivery_pipeline.

     --region=REGION
        Location of the delivery_pipeline.

        To set the region attribute:
        * provide the argument --delivery-pipeline on the command line with a
          fully specified name;
        * set the property deploy/delivery_pipeline with a fully specified
          name;
        * provide the argument --region on the command line;
        * set the property deploy/region.

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
    This command uses the clouddeploy/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/deploy/

NOTES
    These variants are also available:

        $ gcloud alpha deploy releases list

        $ gcloud beta deploy releases list
```

### gcloud deploy releases promote

```text
NAME
    gcloud deploy releases promote - promotes a release from one target
        (source), to another (destination)

SYNOPSIS
    gcloud deploy releases promote
        (--release=RELEASE
          : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [--annotations=[KEY=VALUE,...]] [--labels=[KEY=VALUE,...]]
        [--override-deploy-policies=[POLICY,...]] [--rollout-id=ROLLOUT_ID]
        [--starting-phase-id=STARTING_PHASE_ID] [--to-target=TO_TARGET]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    If to-target is not specified the command promotes the release from the
    target that is farthest along in the promotion sequence to its next stage
    in the promotion sequence.

EXAMPLES
    To promote a release called 'test-release' for delivery pipeline
    'test-pipeline' in region 'us-central1' to target 'prod', run:

        $ gcloud deploy releases promote --release=test-release \
            --delivery-pipeline=test-pipeline --region=us-central1 \
            --to-target=prod

REQUIRED FLAGS
     Release resource - The name of the Release. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --release on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --release=RELEASE
          ID of the release or fully qualified identifier for the release.

          To set the release attribute:
          + provide the argument --release on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --delivery-pipeline=DELIVERY_PIPELINE
          The delivery pipeline associated with the release. Alternatively, set
          the property [deploy/delivery-pipeline].

          To set the delivery-pipeline attribute:
          + provide the argument --release on the command line with a fully
            specified name;
          + provide the argument --delivery-pipeline on the command line;
          + set the property deploy/delivery_pipeline.

       --region=REGION
          The Cloud region for the release. Alternatively, set the property
          [deploy/region].

          To set the region attribute:
          + provide the argument --release on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property deploy/region.

OPTIONAL FLAGS
     --annotations=[KEY=VALUE,...]
        Annotations to apply to the rollout. Annotations take the form of
        key/value string pairs.

        Examples:

        Add annotations:

            $ gcloud deploy releases promote \
                --annotations="from_target=test,status=stable"

     --labels=[KEY=VALUE,...]
        Labels to apply to the rollout. Labels take the form of key/value
        string pairs.

        Examples:

        Add labels:

            $ gcloud deploy releases promote --labels="commit=abc123,author=foo"

     --override-deploy-policies=[POLICY,...]
        Deploy policies to override

     --rollout-id=ROLLOUT_ID
        ID to assign to the generated rollout for promotion.

     --starting-phase-id=STARTING_PHASE_ID
        If set, starts the created rollout at the specified phase.

        Start rollout at stable phase:

            $ gcloud deploy releases promote --starting-phase-id=stable

     --to-target=TO_TARGET
        Destination target to promote into.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha deploy releases promote

        $ gcloud beta deploy releases promote
```

### gcloud beta deploy releases abandon

```text
NAME
    gcloud beta deploy releases abandon - abandons a release

SYNOPSIS
    gcloud beta deploy releases abandon
        (RELEASE : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy releases create

```text
NAME
    gcloud beta deploy releases create - creates a new release, delivery
        pipeline qualified

SYNOPSIS
    gcloud beta deploy releases create
        (RELEASE : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [--annotations=[KEY=VALUE,...]] [--deploy-parameters=[KEY=VALUE,...]]
        [--description=DESCRIPTION] [--docker-version=DOCKER_VERSION]
        [--gcs-source-staging-dir=GCS_SOURCE_STAGING_DIR]
        [--helm-version=HELM_VERSION] [--ignore-file=IGNORE_FILE]
        [--kpt-version=KPT_VERSION] [--kubectl-version=KUBECTL_VERSION]
        [--kustomize-version=KUSTOMIZE_VERSION] [--labels=[KEY=VALUE,...]]
        [--override-deploy-policies=[POLICY,...]]
        [--skaffold-version=SKAFFOLD_VERSION] [--to-target=TO_TARGET]
        [--build-artifacts=BUILD_ARTIFACTS | --images=[NAME=TAG,...]]
        [--disable-initial-rollout | --enable-initial-rollout
          --initial-rollout-annotations=[KEY=VALUE,...]
          --initial-rollout-labels=[KEY=VALUE,...]
          --initial-rollout-phase-id=INITIAL_ROLLOUT_PHASE_ID]
        [--from-k8s-manifest=FROM_K8S_MANIFEST
          | --from-run-manifest=FROM_RUN_MANIFEST
          | --skaffold-file=SKAFFOLD_FILE --source=SOURCE; default="."]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy releases describe

```text
NAME
    gcloud beta deploy releases describe - show details about a release

SYNOPSIS
    gcloud beta deploy releases describe
        (RELEASE : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy releases list

```text
NAME
    gcloud beta deploy releases list - list releases

SYNOPSIS
    gcloud beta deploy releases list
        [--delivery-pipeline=DELIVERY_PIPELINE --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deploy releases promote

```text
NAME
    gcloud beta deploy releases promote - promotes a release from one target
        (source), to another (destination)

SYNOPSIS
    gcloud beta deploy releases promote
        (--release=RELEASE
          : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [--annotations=[KEY=VALUE,...]] [--labels=[KEY=VALUE,...]]
        [--override-deploy-policies=[POLICY,...]] [--rollout-id=ROLLOUT_ID]
        [--starting-phase-id=STARTING_PHASE_ID] [--to-target=TO_TARGET]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy releases abandon

```text
NAME
    gcloud alpha deploy releases abandon - abandons a release

SYNOPSIS
    gcloud alpha deploy releases abandon
        (RELEASE : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy releases create

```text
NAME
    gcloud alpha deploy releases create - creates a new release, delivery
        pipeline qualified

SYNOPSIS
    gcloud alpha deploy releases create
        (RELEASE : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [--annotations=[KEY=VALUE,...]] [--deploy-parameters=[KEY=VALUE,...]]
        [--description=DESCRIPTION] [--docker-version=DOCKER_VERSION]
        [--gcs-source-staging-dir=GCS_SOURCE_STAGING_DIR]
        [--helm-version=HELM_VERSION] [--ignore-file=IGNORE_FILE]
        [--kpt-version=KPT_VERSION] [--kubectl-version=KUBECTL_VERSION]
        [--kustomize-version=KUSTOMIZE_VERSION] [--labels=[KEY=VALUE,...]]
        [--override-deploy-policies=[POLICY,...]]
        [--skaffold-version=SKAFFOLD_VERSION] [--to-target=TO_TARGET]
        [--build-artifacts=BUILD_ARTIFACTS | --images=[NAME=TAG,...]]
        [--disable-initial-rollout | --enable-initial-rollout
          --initial-rollout-annotations=[KEY=VALUE,...]
          --initial-rollout-labels=[KEY=VALUE,...]
          --initial-rollout-phase-id=INITIAL_ROLLOUT_PHASE_ID]
        [--from-k8s-manifest=FROM_K8S_MANIFEST
          | --from-run-manifest=FROM_RUN_MANIFEST
          | --skaffold-file=SKAFFOLD_FILE --source=SOURCE; default="."]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy releases describe

```text
NAME
    gcloud alpha deploy releases describe - show details about a release

SYNOPSIS
    gcloud alpha deploy releases describe
        (RELEASE : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy releases list

```text
NAME
    gcloud alpha deploy releases list - list releases

SYNOPSIS
    gcloud alpha deploy releases list
        [--delivery-pipeline=DELIVERY_PIPELINE --region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy releases promote

```text
NAME
    gcloud alpha deploy releases promote - promotes a release from one target
        (source), to another (destination)

SYNOPSIS
    gcloud alpha deploy releases promote
        (--release=RELEASE
          : --delivery-pipeline=DELIVERY_PIPELINE --region=REGION)
        [--annotations=[KEY=VALUE,...]] [--labels=[KEY=VALUE,...]]
        [--override-deploy-policies=[POLICY,...]] [--rollout-id=ROLLOUT_ID]
        [--starting-phase-id=STARTING_PHASE_ID] [--to-target=TO_TARGET]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example wraps flag values in backticks (for example `` --instance=`my-instance` ``), which the shell runs as command substitutions; the runnable form passes the values in single quotes.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/releases (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

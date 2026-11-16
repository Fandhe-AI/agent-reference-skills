---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/images
---

# gcloud container images

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container images add-tag

```text
NAME
    gcloud container images add-tag - adds tags to existing image

SYNOPSIS
    gcloud container images add-tag SRC_IMAGE DEST_IMAGE [DEST_IMAGE ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The container images add-tag command adds the tag(s) specified in the
    second (and following) tag parameter(s) to the image referenced in the
    first tag parameter. Repositories must be hosted by the Google Container
    Registry.

EXAMPLES
    Add a tag to another tag:

        $ gcloud container images add-tag gcr.io/myproject/myimage:mytag1 \
            gcr.io/myproject/myimage:mytag2

    Add a tag to a digest

        $ gcloud container images add-tag \
            gcr.io/myproject/myimage@sha256:digest \
            gcr.io/myproject/myimage:mytag2

    Add a tag to latest

        $ gcloud container images add-tag gcr.io/myproject/myimage \
            gcr.io/myproject/myimage:mytag2

    Promote a tag to latest

        $ gcloud container images add-tag gcr.io/myproject/myimage:mytag1 \
            gcr.io/myproject/myimage:latest

POSITIONAL ARGUMENTS
     SRC_IMAGE
        The fully qualified name(s) of image(s) to add tags for. The name(s)
        should be formatted as *.gcr.io/PROJECT_ID/IMAGE_PATH@sha256:DIGEST or
        *.gcr.io/PROJECT_ID/IMAGE_PATH:TAG.

     DEST_IMAGE [DEST_IMAGE ...]
        The fully qualified name(s) of image(s) to be the new tags. The name(s)
        should be formatted as *.gcr.io/PROJECT_ID/IMAGE_PATH:TAG.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container images add-tag

        $ gcloud beta container images add-tag
```

### gcloud container images delete

```text
NAME
    gcloud container images delete - delete existing images

SYNOPSIS
    gcloud container images delete IMAGE_NAME [IMAGE_NAME ...]
        [--force-delete-tags] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The container images delete command deletes the specified image from the
    registry. All associated tags are also deleted.

EXAMPLES
    Deletes the image as long as there aren't additional, unspecified tags
    referencing it:

        $ gcloud container images delete <IMAGE_NAME>

    Deletes the image (and tags) from the input IMAGE_NAME:

        $ gcloud container images delete <IMAGE_NAME> --force-delete-tags

    Deletes the image (and tags) from the input IMAGE_NAME, without additional
    prompting:

        $ gcloud container images delete <IMAGE_NAME> --force-delete-tags \
            --quiet

    To easily identify and delete untagged images in a project, first filter
    digests that lack tags:

        $ gcloud container images list-tags \
            [HOSTNAME]/[PROJECT-ID]/[IMAGE] --filter='-tags:*' \
            --format="get(digest)" --limit=$BIG_NUMBER

    Then, delete these tagless images without prompting by running:

        $ gcloud container images delete \
            [HOSTNAME]/[PROJECT-ID]/[IMAGE]@DIGEST --quiet

POSITIONAL ARGUMENTS
     IMAGE_NAME [IMAGE_NAME ...]
        The fully qualified name(s) of image(s) to delete. The name(s) should
        be formatted as *.gcr.io/PROJECT_ID/IMAGE_PATH@sha256:DIGEST or
        *.gcr.io/PROJECT_ID/IMAGE_PATH:TAG.

FLAGS
     --force-delete-tags
        If there are tags pointing to an image to be deleted then they must all
        be specified explicitly, or this flag must be specified, for the
        command to succeed.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container images delete

        $ gcloud beta container images delete
```

Adapted (not in the official docs): runnable form of the example(s) above: `$VARIABLE` placeholders are quoted.

```bash
gcloud container images list-tags [HOSTNAME]/[PROJECT-ID]/[IMAGE] \
    --filter='-tags:*' \
    --format="get(digest)" \
    --limit="${BIG_NUMBER}"
```

### gcloud container images describe

```text
NAME
    gcloud container images describe - lists information about the specified
        image

SYNOPSIS
    gcloud container images describe IMAGE_NAME [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    Describe the specified image:

        $ gcloud container images describe gcr.io/myproject/myimage@digest

        Or:

        $ gcloud container images describe gcr.io/myproject/myimage:tag

    Find the digest for a tag:

        $ gcloud container images describe gcr.io/myproject/myimage:tag \
            --format="value(image_summary.digest)"

        Or:

        $ gcloud container images describe gcr.io/myproject/myimage:tag \
            --format="value(image_summary.fully_qualified_digest)"

POSITIONAL ARGUMENTS
     IMAGE_NAME
        The fully qualified name(s) of image(s) to describe. The name(s) should
        be formatted as *.gcr.io/PROJECT_ID/IMAGE_PATH@sha256:DIGEST or
        *.gcr.io/PROJECT_ID/IMAGE_PATH:TAG.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container images describe

        $ gcloud beta container images describe
```

### gcloud container images list

```text
NAME
    gcloud container images list - list existing images

SYNOPSIS
    gcloud container images list [--repository=REPOSITORY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The container images list command of gcloud lists metadata about existing
    container images in a specified repository. Repositories must be hosted by
    the Google Container Registry.

EXAMPLES
    List the images in a specified repository:

        $ gcloud container images list --repository=gcr.io/myproject

    List the images in the default repository:

        $ gcloud container images list

    List images with names prefixed with 'test-project':

        $ gcloud container images list --filter="name:test-project"

FLAGS
     --repository=REPOSITORY
        The name of the repository. Format: *.gcr.io/repository. Defaults to
        gcr.io/<project>, for the active project.

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

NOTES
    These variants are also available:

        $ gcloud alpha container images list

        $ gcloud beta container images list
```

### gcloud container images list-gcr-usage

```text
NAME
    gcloud container images list-gcr-usage - list Container Registry usage

SYNOPSIS
    gcloud container images list-gcr-usage
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Container Registry usage for all projects in the specified scope
    (project/organization/folder). Caller must have
    cloudasset.assets.searchAllResources permission on the requested scope and
    storage.objects.list permission on the Cloud Storage buckets used by
    Container Registry.

    The tool returns the following lists of usage states:

    ACTIVE: Container Registry usage has occurred in the last 30 days. The host
    location and project are not redirected.

    INACTIVE: No Container Registry usage has occurred in the last 30 days. The
    host location and project are not redirected.

    REDIRECTED: The project has been redirected to Artifact Registry but still
    has Container Registry Cloud Storage buckets. This project will continue to
    function after Container Registry is turned down and no further action is
    required. You can reduce costs by deleting the Container Registry Cloud
    Storage buckets.

    REDIRECTION_INCOMPLETE: Requests are redirected to Artifact Registry, but
    data is still being copied from Container Registry.

    LEGACY: Container Registry usage is unknown. This state is caused by legacy
    Container Registry projects that store container image metadata files in
    Cloud Storage buckets. For more information on legacy Container Registry
    projects, see
    https://cloud.google.com/container-registry/docs/deprecations/feature-deprecations#container_image_metadata_storage_change.

EXAMPLES
    To list Container Registry usage in a project:

        $ gcloud container images list-gcr-usage --project=my-proj

    To list Container Registry usage in an organization:

        $ gcloud container images list-gcr-usage --organization=my-org

    To list Container Registry usage in a folder:

        $ gcloud container images list-gcr-usage --folder=my-folder

    To list all active Container Registry usage in an organization:

        $ gcloud container images list-gcr-usage --organization=my-org \
            --filter="usage=ACTIVE"

    To list all projects that aren't redirected yet:

        $ gcloud container images list-gcr-usage --organization=my-org \
            --filter="usage!=REDIRECTED"

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID.

       --organization=ORGANIZATION_ID
          Organization ID.

       --project=PROJECT_ID
          Project ID.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud container images list-tags

```text
NAME
    gcloud container images list-tags - list tags and digests for the specified
        image

SYNOPSIS
    gcloud container images list-tags IMAGE_NAME [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]; default="~timestamp"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The container images list-tags command of gcloud lists metadata about tags
    and digests for the specified container image. Images must be hosted by the
    Google Container Registry.

EXAMPLES
    List the tags in a specified image:

        $ gcloud container images list-tags gcr.io/myproject/myimage

    To receive the full, JSON-formatted output (with untruncated digests):

        $ gcloud container images list-tags gcr.io/myproject/myimage \
            --format=json

    To list digests without corresponding tags:

        $ gcloud container images list-tags gcr.io/myproject/myimage \
            --filter="NOT tags:*"

    To list images that have a tag with the value '30e5504145':

        $ gcloud container images list-tags --filter="'tags:30e5504145'"

    The last example encloses the filter expression in single quotes because
    the value '30e5504145' could be interpreted as a number in scientific
    notation.

POSITIONAL ARGUMENTS
     IMAGE_NAME
        The name of the image to list tags for. The name format should be
        *.gcr.io/PROJECT_ID/IMAGE_PATH.

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

     --sort-by=[FIELD,...]; default="~timestamp"
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit. The
        default is ~timestamp.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container images list-tags

        $ gcloud beta container images list-tags
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud container images list-tags gcr.io/myproject/myimage \
    --filter="'tags:30e5504145'"
```

### gcloud container images untag

```text
NAME
    gcloud container images untag - remove existing image tags

SYNOPSIS
    gcloud container images untag IMAGE_NAME [IMAGE_NAME ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The container images untag command removes the specified tag from the
    image.

EXAMPLES
    Removes the tag from the input IMAGE_NAME:

        $ gcloud container images untag <IMAGE_NAME>

POSITIONAL ARGUMENTS
     IMAGE_NAME [IMAGE_NAME ...]
        The fully qualified name(s) of image(s) to untag. The name(s) should be
        formatted as *.gcr.io/PROJECT_ID/IMAGE_PATH:TAG.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container images untag

        $ gcloud beta container images untag
```

### gcloud beta container images add-tag

```text
NAME
    gcloud beta container images add-tag - adds tags to existing image

SYNOPSIS
    gcloud beta container images add-tag SRC_IMAGE DEST_IMAGE [DEST_IMAGE ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container images delete

```text
NAME
    gcloud beta container images delete - delete existing images

SYNOPSIS
    gcloud beta container images delete IMAGE_NAME [IMAGE_NAME ...]
        [--force-delete-tags] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container images describe

```text
NAME
    gcloud beta container images describe - lists container analysis data for a
        given image

SYNOPSIS
    gcloud beta container images describe IMAGE_NAME
        [--metadata-filter=METADATA_FILTER] [--show-all-metadata]
        [--show-build-details] [--show-deployment] [--show-image-basis]
        [--show-package-vulnerability] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container images list

```text
NAME
    gcloud beta container images list - list existing images

SYNOPSIS
    gcloud beta container images list [--repository=REPOSITORY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container images list-tags

```text
NAME
    gcloud beta container images list-tags - list tags and digests for the
        specified image

SYNOPSIS
    gcloud beta container images list-tags IMAGE_NAME
        [--occurrence-filter=OCCURRENCE_FILTER;
          default='kind = "BUILD" OR kind = "IMAGE" OR kind = "DISCOVERY"']
        [--no-show-occurrences]
        [--show-occurrences-from=SHOW_OCCURRENCES_FROM; default=10]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]; default="~timestamp"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container images untag

```text
NAME
    gcloud beta container images untag - remove existing image tags

SYNOPSIS
    gcloud beta container images untag IMAGE_NAME [IMAGE_NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container images add-tag

```text
NAME
    gcloud alpha container images add-tag - adds tags to existing image

SYNOPSIS
    gcloud alpha container images add-tag SRC_IMAGE DEST_IMAGE [DEST_IMAGE ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container images delete

```text
NAME
    gcloud alpha container images delete - delete existing images

SYNOPSIS
    gcloud alpha container images delete IMAGE_NAME [IMAGE_NAME ...]
        [--force-delete-tags] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container images describe

```text
NAME
    gcloud alpha container images describe - lists container analysis data for
        a given image

SYNOPSIS
    gcloud alpha container images describe IMAGE_NAME
        [--metadata-filter=METADATA_FILTER] [--show-all-metadata]
        [--show-build-details] [--show-deployment] [--show-image-basis]
        [--show-package-vulnerability] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container images list

```text
NAME
    gcloud alpha container images list - list existing images

SYNOPSIS
    gcloud alpha container images list [--repository=REPOSITORY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container images list-tags

```text
NAME
    gcloud alpha container images list-tags - list tags and digests for the
        specified image

SYNOPSIS
    gcloud alpha container images list-tags IMAGE_NAME
        [--occurrence-filter=OCCURRENCE_FILTER;
          default='kind = "BUILD" OR kind = "IMAGE" OR kind = "DISCOVERY"']
        [--no-show-occurrences]
        [--show-occurrences-from=SHOW_OCCURRENCES_FROM; default=10]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]; default="~timestamp"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container images untag

```text
NAME
    gcloud alpha container images untag - remove existing image tags

SYNOPSIS
    gcloud alpha container images untag IMAGE_NAME [IMAGE_NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the last `list-tags` example omits the positional `IMAGE_NAME` that the SYNOPSIS requires (gcloud 593.0.0: "argument IMAGE_NAME: Must be specified"); the runnable form adds `gcr.io/myproject/myimage`, as in the other examples.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/images (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

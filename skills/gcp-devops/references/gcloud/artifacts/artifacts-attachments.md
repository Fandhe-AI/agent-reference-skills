---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/attachments
---

# gcloud artifacts attachments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts attachments create

```text
NAME
    gcloud artifacts attachments create - creates an Artifact Registry
        attachment in a repository

SYNOPSIS
    gcloud artifacts attachments create
        (ATTACHMENT : --location=LOCATION --repository=REPOSITORY)
        --attachment-type=ATTACHMENT_TYPE --files=[FILES,...] --target=TARGET
        [--attachment-namespace=ATTACHMENT_NAMESPACE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates an Artifact Registry attachment in a repository.

EXAMPLES
    To create an attachment for target
    projects/myproject/locations/us-central1/packages/mypackage/versions/sha256:123
    using a file located in /path/to/file/sbom.json:

        $ gcloud artifacts attachments create \
          --target=projects/myproject/locations/us-central1/packages/\
        mypackage/versions/sha256:123 --files=/path/to/file/sbom.json

POSITIONAL ARGUMENTS
     Attachment resource - The Artifact Registry attachment name. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument attachment on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ATTACHMENT
          ID of the attachment or fully qualified identifier for the
          attachment.

          To set the name attribute:
          + provide the argument attachment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the attachment.

          To set the location attribute:
          + provide the argument attachment on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --repository=REPOSITORY
          Repository of the attachment.

          To set the repository attribute:
          + provide the argument attachment on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

REQUIRED FLAGS
     --attachment-type=ATTACHMENT_TYPE
        Type of the attachment

     --files=[FILES,...]
        Comma-seperated list of files that are part of this attachment

     --target=TARGET
        Target of the attachment, should be fully qualified version name

OPTIONAL FLAGS
     --attachment-namespace=ATTACHMENT_NAMESPACE
        Namespace of the attachment

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud artifacts attachments create my-attachment \
    --target=projects/myproject/locations/us-central1/repositories/my-repo/packages/mypackage/versions/sha256:123 \
    --files=/path/to/file/sbom.json \
    --attachment-type=ATTACHMENT_TYPE \
    --repository=my-repo \
    --location=us-central1
```

### gcloud artifacts attachments delete

```text
NAME
    gcloud artifacts attachments delete - delete an Artifact Registry
        attachment

SYNOPSIS
    gcloud artifacts attachments delete
        (ATTACHMENT : --location=LOCATION --repository=REPOSITORY)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Artifact Registry attachment.

EXAMPLES
    To delete an attachment my-attachment under the current project,
    repository, and location, run:

        $ gcloud artifacts attachments delete my-attachment

POSITIONAL ARGUMENTS
     Attachment resource - The Artifact Registry attachment to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument attachment on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ATTACHMENT
          ID of the attachment or fully qualified identifier for the
          attachment.

          To set the attachment attribute:
          + provide the argument attachment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the attachment. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument attachment on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --repository=REPOSITORY
          The repository associated with the attachment. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument attachment on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/
```

### gcloud artifacts attachments describe

```text
NAME
    gcloud artifacts attachments describe - describe an Artifact Registry
        attachment

SYNOPSIS
    gcloud artifacts attachments describe
        (ATTACHMENT : --location=LOCATION --repository=REPOSITORY)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Artifact Registry attachment.

    This command can fail for the following reasons:
      o The specified attachment does not exist.
      o The active account does not have permission to view attachments.

EXAMPLES
    To describe an attachment named my-attachment under the current project,
    repository, and location, run:

        $ gcloud artifacts attachments describe my-attachment

POSITIONAL ARGUMENTS
     Attachment resource - The Artifact Registry attachment to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument attachment on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ATTACHMENT
          ID of the attachment or fully qualified identifier for the
          attachment.

          To set the attachment attribute:
          + provide the argument attachment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the attachment. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument attachment on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --repository=REPOSITORY
          The repository associated with the attachment. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument attachment on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/
```

### gcloud artifacts attachments download

```text
NAME
    gcloud artifacts attachments download - download an Artifact Registry
        attachment from a repository

SYNOPSIS
    gcloud artifacts attachments download
        [ATTACHMENT : --location=LOCATION --repository=REPOSITORY]
        --destination=DESTINATION [--chunk-size=CHUNK_SIZE]
        [--oci-version-name=OCI_VERSION_NAME] [--parallelism=PARALLELISM]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Download an Artifact Registry attachment from a repository.

EXAMPLES
    To download the attachment my-attachment to /path/to/destination/:

        $ gcloud artifacts attachments download my-attachment \
          --destination=/path/to/destination/

    To download the attachment my-attachment in 8000 byte chunks to
    /path/to/destination/:

        $ gcloud artifacts attachments download my-attachment \
          --destination=/path/to/destination/ --chunk-size=8000

    To download the attachment my-attachment using parallel multipart download
    with 4 threads:

        $ gcloud artifacts attachments download my-attachment \
          --destination=/path/to/destination/ --parallelism=4

    For Docker-format repositories only: to download the attachment stored in
    the OCI version
    projects/my-project/locations/us/repositories/my-repo/packages/my-package/versions/sha256:123
    to /path/to/destination/:

        $ gcloud artifacts attachments download \
          --oci-version-name=projects/my-project/locations/us/\
        repositories/my-repo/packages/my-package/versions/sha256:123 \
            --destination=/path/to/destination/

    For Docker-format repositories only: to download the attachment stored in
    the OCI version with URI
    us-docker.pkg.dev/my-project/my-repo/my-package@sha256:123 to
    /path/to/destination/:

        $ gcloud artifacts attachments download \
          --oci-version-name=us-docker.pkg.dev/my-project/my-repo/\
        my-package@sha256:123 --destination=/path/to/destination/

POSITIONAL ARGUMENTS
     Attachment resource - The Artifact Registry attachment name. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument attachment on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     ATTACHMENT
        ID of the attachment or fully qualified identifier for the attachment.

        To set the name attribute:
        * provide the argument attachment on the command line.

        This positional argument must be specified if any of the other
        arguments in this group are specified.

     --location=LOCATION
        Location of the attachment.

        To set the location attribute:
        * provide the argument attachment on the command line with a fully
          specified name;
        * provide the argument --location on the command line;
        * set the property artifacts/location.

     --repository=REPOSITORY
        Repository of the attachment.

        To set the repository attribute:
        * provide the argument attachment on the command line with a fully
          specified name;
        * provide the argument --repository on the command line;
        * set the property artifacts/repository.

REQUIRED FLAGS
     --destination=DESTINATION
        Path where you want to save the downloaded attachment files.

OPTIONAL FLAGS
     --chunk-size=CHUNK_SIZE
        If specified, the chunk size (bytes) to use for downloading the
        package.

     --oci-version-name=OCI_VERSION_NAME
        For Docker-format repositories only. The version name of the OCI
        artifact to download.

     --parallelism=PARALLELISM
        Specifies the number of threads to use for downloading the attachment
        files in parallel.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud artifacts attachments download \
    --oci-version-name=projects/my-project/locations/us/repositories/my-repo/packages/my-package/versions/sha256:123 \
    --destination=/path/to/destination/

gcloud artifacts attachments download \
    --oci-version-name=us-docker.pkg.dev/my-project/my-repo/my-package@sha256:123 \
    --destination=/path/to/destination/
```

### gcloud artifacts attachments list

```text
NAME
    gcloud artifacts attachments list - list Artifact Registry attachments

SYNOPSIS
    gcloud artifacts attachments list [--target=TARGET]
        [--location=LOCATION --repository=REPOSITORY] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Artifact Registry attachments in the specified repository and
    project.

    To specify the maximum number of attachments to list, use the --limit flag.

EXAMPLES
    The following command lists a maximum of five attachments:

        $ gcloud artifacts attachments list --limit=5

    The following command lists attachments with target
    projects/my-project/locations/us/repositories/my-repo/packages/my-package/versions/sha256:123:

        $ gcloud artifacts attachments list \
          --target=projects/my-project/locations/us/repositories/my-repo/\
        packages/my-package/versions/sha256:123

FLAGS
     --target=TARGET
        Target for the list of attachments.

     Repository resource - Parent repository for the list of attachments. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --repository on the command line with a fully
        specified name;
      * set the property artifacts/repository with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        Location of the repository. Overrides the default artifacts/location
        property value for this command invocation. To configure the default
        location, use the command: gcloud config set artifacts/location.

        To set the location attribute:
        * provide the argument --repository on the command line with a fully
          specified name;
        * set the property artifacts/repository with a fully specified name;
        * provide the argument --location on the command line;
        * set the property artifacts/location.

     --repository=REPOSITORY
        ID of the repository or fully qualified identifier for the repository.

        To set the repository attribute:
        * provide the argument --repository on the command line;
        * set the property artifacts/repository.

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

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud artifacts attachments list \
    --repository=my-repo \
    --location=us \
    --limit=5

gcloud artifacts attachments list \
    --repository=my-repo \
    --location=us \
    --target=projects/my-project/locations/us/repositories/my-repo/packages/my-package/versions/sha256:123
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example omits `--attachment-type`, the attachment name and the repository, which the SYNOPSIS requires (gcloud 593.0.0: "argument ... --attachment-type: Must be specified"); the help gives no value for `--attachment-type` ("Type of the attachment"), so the runnable form uses the placeholder `ATTACHMENT_TYPE`, `my-attachment` (the name used by the `delete` example) and `my-repo` / `us-central1` (from the target and the other examples); the example's `--target` also lacks the `repositories/REPOSITORY/` segment of an Artifact Registry version name (`projects/PROJECT/locations/LOCATION/repositories/REPOSITORY/packages/PACKAGE/versions/VERSION`, as in the `download` and `list` examples on this page), so the runnable form inserts `repositories/my-repo/`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example relies on a repository (and location) that is set already ("under the current project, repository, and location"); without them gcloud 593.0.0 fails ("Error parsing [repository] ... Failed to find attribute [repository]"); the runnable form passes `--repository=my-repo --location=us`, the repository and location of the paths in the examples on this page.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/attachments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/versions
---

# gcloud artifacts versions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts versions delete

```text
NAME
    gcloud artifacts versions delete - delete an Artifact Registry package
        version

SYNOPSIS
    gcloud artifacts versions delete
        (VERSION
          : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        [--async] [--delete-tags] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Artifact Registry package version.

    This command can fail for the following reasons:
      o The specified package version does not exist.
      o The active account does not have permission to delete package
        versions.

EXAMPLES
    To delete version 1.0.0 of my-pkg under the current project, repository,
    and location, run:

        $ gcloud artifacts versions delete 1.0.0 --package=my-pkg

POSITIONAL ARGUMENTS
     Version resource - The Artifact Registry package version to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument version on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VERSION
          ID of the version or fully qualified identifier for the version.

          To set the version attribute:
          + provide the argument version on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the version. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument version on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --package=PACKAGE
          The package associated with the version.

          To set the package attribute:
          + provide the argument version on the command line with a fully
            specified name;
          + provide the argument --package on the command line.

       --repository=REPOSITORY
          The repository associated with the version. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument version on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --delete-tags
        If specified, all tags associated with the version are deleted.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/

NOTES
    These variants are also available:

        $ gcloud alpha artifacts versions delete

        $ gcloud beta artifacts versions delete
```

### gcloud artifacts versions describe

```text
NAME
    gcloud artifacts versions describe - describe an Artifact Registry package
        version

SYNOPSIS
    gcloud artifacts versions describe
        (VERSION
          : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        [--show-package-vulnerability] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Artifact Registry package version.

    This command can fail for the following reasons:
      o The specified package version does not exist.
      o The active account does not have permission to describe package
        versions.

EXAMPLES
    To describe version 1.0.0 of my-pkg under the current project, repository,
    and location, run:

        $ gcloud artifacts versions describe 1.0.0 --package=my-pkg

POSITIONAL ARGUMENTS
     Version resource - The Artifact Registry package version to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument version on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VERSION
          ID of the version or fully qualified identifier for the version.

          To set the version attribute:
          + provide the argument version on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the version. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument version on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --package=PACKAGE
          The package associated with the version.

          To set the package attribute:
          + provide the argument version on the command line with a fully
            specified name;
          + provide the argument --package on the command line.

       --repository=REPOSITORY
          The repository associated with the version. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument version on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

FLAGS
     --show-package-vulnerability
        Include vulnerability metadata in the output.

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

### gcloud artifacts versions export

```text
NAME
    gcloud artifacts versions export - export an Artifact Registry package
        version

SYNOPSIS
    gcloud artifacts versions export
        (VERSION
          : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        --gcs-destination=GCS_DESTINATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export files of an Artifact Registry package version to a Google Cloud
    Storage path.

EXAMPLES
    To export version 1.0.0 of package my-pkg to a Google Cloud Storage path
    gs://my-bucket/sub-folder under the current project, repository, and
    location, run:

        $ gcloud artifacts versions export 1.0.0 --package=my-pkg \
          --gcs-destination=gs://my-bucket/sub-folder

POSITIONAL ARGUMENTS
     Version resource - The Artifact Registry version name. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument version on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VERSION
          ID of the version or fully qualified identifier for the version.

          To set the version attribute:
          + provide the argument version on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the version.

          To set the location attribute:
          + provide the argument version on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --package=PACKAGE
          Package of the version.

          To set the package attribute:
          + provide the argument version on the command line with a fully
            specified name;
          + provide the argument --package on the command line.

       --repository=REPOSITORY
          Repository of the version.

          To set the repository attribute:
          + provide the argument version on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

REQUIRED FLAGS
     --gcs-destination=GCS_DESTINATION
        Google Cloud Storage path to export the artifact to.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud artifacts versions list

```text
NAME
    gcloud artifacts versions list - list Artifact Registry package versions

SYNOPSIS
    gcloud artifacts versions list --package=PACKAGE
        [--location=LOCATION --repository=REPOSITORY] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Artifact Registry versions in the specified package.

    To specify the maximum number of versions to list, use the --limit flag.

EXAMPLES
    The following command lists a maximum of five packages versions:

        $ gcloud artifacts versions list --limit=5

    To list versions of package my_pkg with name as 1.0-SNAPSHOT:

        $ gcloud artifacts versions list --package=my_pkg \
          --filter='name="projects/my-project/locations/us/repositories/my\
        -repo/packages/my_pkg/versions/1.0-SNAPSHOT"'

    To list versions of package my_pkg with a given partial name, use * to
    match any character in name:

        $ gcloud artifacts versions list --package=my_pkg \
          --filter='name="projects/my-project/locations/us/repositories/my\
        -repo/packages/my_pkg/versions/1.0*"'

        $ gcloud artifacts versions list --package=my_pkg \
          --filter='name="projects/my-project/locations/us/repositories/my\
        -repo/packages/my_pkg/versions/*SNAPSHOT"'

    To list versions of package my_pkg that have annotations:

        $ gcloud artifacts versions list --package=my_pkg \
          --filter=annotations:*

    To list versions of package my_pkg with annotations pair as
    [annotation_key: annotation_value]:

        $ gcloud artifacts versions list --package=my_pkg \
          --filter='annotations.annotation_key:annotation_value'

    To list versions of package my_pkg with annotations containing key as
    my_key:

        $ gcloud artifacts versions list --package=my_pkg \
          --filter=annotations.my_key

        If the key or value contains special characters, such as `my.key` and `my.value`, backtick("`") is required:

        $ gcloud artifacts versions list --filter='annotations.`my.key`'

        $ gcloud artifacts versions list \
          --filter='annotations.`my.key`:`my.value`'

    To list versions of package my_pkg with given partial annotation key or
    value, use * to match any character:

        $ gcloud artifacts versions list \
          --filter='annotations.*key:`*.value`'

    To list versions of package my_pkg ordered by create_time:

        $ gcloud artifacts versions list --package=my_pkg \
            --sort-by=create_time

    To list versions of package my_pkg ordered by update_time reversely:

        $ gcloud artifacts versions list --package=my_pkg \
            --sort-by=~update_time

REQUIRED FLAGS
     --package=PACKAGE
        List all versions in a specified artifact, such as a container image or
        a language package.

FLAGS
     Repository resource - The Artifact Registry repository. If not specified,
     the current artifacts/repository is used. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --repository on the command line with a fully
        specified name;
      * set the property artifacts/repository with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        Location of the repository.

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

NOTES
    These variants are also available:

        $ gcloud alpha artifacts versions list

        $ gcloud beta artifacts versions list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud artifacts versions list \
    --package=my_pkg \
    --limit=5

gcloud artifacts versions list \
    --package=my_pkg \
    --filter='name="projects/my-project/locations/us/repositories/my-repo/packages/my_pkg/versions/1.0-SNAPSHOT"'

gcloud artifacts versions list \
    --package=my_pkg \
    --filter='name="projects/my-project/locations/us/repositories/my-repo/packages/my_pkg/versions/1.0*"'

gcloud artifacts versions list \
    --package=my_pkg \
    --filter='name="projects/my-project/locations/us/repositories/my-repo/packages/my_pkg/versions/*SNAPSHOT"'

gcloud artifacts versions list \
    --package=my_pkg \
    --filter='annotations.`my.key`'

gcloud artifacts versions list \
    --package=my_pkg \
    --filter='annotations.`my.key`:`my.value`'

gcloud artifacts versions list \
    --package=my_pkg \
    --filter='annotations.*key:`*.value`'
```

### gcloud artifacts versions update

```text
NAME
    gcloud artifacts versions update - update annotations on an Artifact
        Registry package version

SYNOPSIS
    gcloud artifacts versions update
        (VERSION
          : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        [--annotations=[ANNOTATIONS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update annotations on an Artifact Registry package version.

EXAMPLES
    To update annotations on version 1.0.0 of my-pkg when the project ID,
    repository and location defaults are set, run the following command:

    CAUTION: This command will overwrite any existing annotations on the
    version.

        $ gcloud artifacts versions update 1.0.0 --package=my-pkg \
          --annotations=key1=value1,key2=value2

    To clear all annotations on the version run the following command:

        $ gcloud artifacts versions update 1.0.0 --package=my-pkg \
          --annotations={}

POSITIONAL ARGUMENTS
     Version resource - The Artifact Registry package version to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument version on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VERSION
          ID of the version or fully qualified identifier for the version.

          To set the version attribute:
          + provide the argument version on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the version. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument version on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --package=PACKAGE
          The package associated with the version.

          To set the package attribute:
          + provide the argument version on the command line with a fully
            specified name;
          + provide the argument --package on the command line.

       --repository=REPOSITORY
          The repository associated with the version. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument version on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

FLAGS
     --annotations=[ANNOTATIONS,...]
        List of annotations in the format of KEY=VALUE pairs to add, update, or
        remove. Duplicate keys will be overwritten. For more details on
        annotations, see https://google.aip.dev/148#annotations.

         KEY
            Sets KEY value.

         VALUE
            Sets VALUE value.

        Shorthand Example:

            --annotations=string=string

        JSON Example:

            --annotations='{"string": "string"}'

        File Example:

            --annotations=path_to_file.(yaml|json)

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

### gcloud beta artifacts versions delete

```text
NAME
    gcloud beta artifacts versions delete - delete an Artifact Registry package
        version

SYNOPSIS
    gcloud beta artifacts versions delete
        (VERSION
          : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        [--async] [--delete-tags] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts versions list

```text
NAME
    gcloud beta artifacts versions list - list Artifact Registry package
        versions

SYNOPSIS
    gcloud beta artifacts versions list --package=PACKAGE
        [--location=LOCATION --repository=REPOSITORY] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts versions delete

```text
NAME
    gcloud alpha artifacts versions delete - delete an Artifact Registry
        package version

SYNOPSIS
    gcloud alpha artifacts versions delete
        (VERSION
          : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        [--async] [--delete-tags] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts versions list

```text
NAME
    gcloud alpha artifacts versions list - list Artifact Registry package
        versions

SYNOPSIS
    gcloud alpha artifacts versions list --package=PACKAGE
        [--location=LOCATION --repository=REPOSITORY] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example omits `--package`, which the SYNOPSIS requires (gcloud 593.0.0: "argument --package: Must be specified"); the runnable form adds `--package=my_pkg`, the package named by the other examples on this page.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/versions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/tags
---

# gcloud artifacts tags

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts tags create

```text
NAME
    gcloud artifacts tags create - create an Artifact Registry tag

SYNOPSIS
    gcloud artifacts tags create
        (TAG : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        --version=VERSION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Artifact Registry tag.

    This command can fail for the following reasons:
      o A tag with the same name already exists.
      o The specified version or package does not exist.
      o The active account does not have permission to create tags.
      o The specified package format doesn't support tag operations (e.g.
        maven).

EXAMPLES
    To create a tag with the name my-tag for version 1.0.0 of package my-pkg
    under the current project, repository, and location, run:

        $ gcloud artifacts tags create my-tag --version=1.0.0 \
            --package=my-pkg

POSITIONAL ARGUMENTS
     Tag resource - The Artifact Registry tag to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument tag on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TAG
          ID of the tag or fully qualified identifier for the tag.

          To set the tag attribute:
          + provide the argument tag on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the tag. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --package=PACKAGE
          The package associated with the tag.

          To set the package attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --package on the command line.

       --repository=REPOSITORY
          The repository associated with the tag. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

REQUIRED FLAGS
     --version=VERSION
        The version associated with the tag.

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

        $ gcloud alpha artifacts tags create

        $ gcloud beta artifacts tags create
```

### gcloud artifacts tags delete

```text
NAME
    gcloud artifacts tags delete - delete an Artifact Registry tag

SYNOPSIS
    gcloud artifacts tags delete
        (TAG : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Artifact Registry tag.

    This command can fail for the following reasons:
      o The specified tag does not exist.
      o The specified version or package does not exist.
      o The active account does not have permission to delete tags.
      o The specified package format doesn't support tag operations (e.g.
        maven).

EXAMPLES
    To delete tag my-tag in package my-pkg under the current project,
    repository, and location, run:

        $ gcloud artifacts tags delete my-tag --package=my-pkg

POSITIONAL ARGUMENTS
     Tag resource - The Artifact Registry tag to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument tag on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TAG
          ID of the tag or fully qualified identifier for the tag.

          To set the tag attribute:
          + provide the argument tag on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the tag. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --package=PACKAGE
          The package associated with the tag.

          To set the package attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --package on the command line.

       --repository=REPOSITORY
          The repository associated with the tag. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument tag on the command line with a fully
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

NOTES
    These variants are also available:

        $ gcloud alpha artifacts tags delete

        $ gcloud beta artifacts tags delete
```

### gcloud artifacts tags export

```text
NAME
    gcloud artifacts tags export - export an Artifact Registry package version
        by tag

SYNOPSIS
    gcloud artifacts tags export
        (TAG : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        --gcs-destination=GCS_DESTINATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export files of an Artifact Registry package version by tag to a Google
    Cloud Storage path.

EXAMPLES
    To export by tag t1 of package my-pkg to a Google Cloud Storage path
    gs://my-bucket/sub-folder under the current project, repository, and
    location, run:

        $ gcloud artifacts tags export t1 --package=my-pkg \
          --gcs-destination=gs://my-bucket/sub-folder

POSITIONAL ARGUMENTS
     Tag resource - The Artifact Registry tag name. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument tag on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TAG
          ID of the tag or fully qualified identifier for the tag.

          To set the tag attribute:
          + provide the argument tag on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the tag.

          To set the location attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --package=PACKAGE
          Package of the tag.

          To set the package attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --package on the command line.

       --repository=REPOSITORY
          Repository of the tag.

          To set the repository attribute:
          + provide the argument tag on the command line with a fully
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

### gcloud artifacts tags list

```text
NAME
    gcloud artifacts tags list - list Artifact Registry tags

SYNOPSIS
    gcloud artifacts tags list --package=PACKAGE
        [--location=LOCATION --repository=REPOSITORY] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Artifact Registry tags in the specified package.

    This command can fail for the following reasons:
      o The specified version or package does not exist.
      o The active account does not have permission to list tags.
      o The specified package format doesn't support tag operations (e.g.
        maven).

    To specify the maximum number of tags to list, use the --limit flag.

EXAMPLES
    To list tags for package my-package:

        $ gcloud artifacts tags list --package=my-package

    The following command lists a maximum of five tags for package my-package:

        $ gcloud artifacts tags list --package=my-package --limit=5

    To list tags of package my-package with name as my-tag:

        $ gcloud artifacts tags list --package=my-package \
          --filter='name="projects/my-project/locations/us/repositories/my\
        -repo/packages/my-package/tags/my-tag"'

    To list tags of package my-package with a given partial name, use * to
    match any character in name:

        $ gcloud artifacts tags list --package=my-package \
          --filter='name="projects/my-project/locations/us/repositories/my\
        -repo/packages/my-package/tags/my*"'

        $ gcloud artifacts tags list --package=my-package \
          --filter='name="projects/my-project/locations/us/repositories/my\
        -repo/packages/my-package/tags/*tag"'

REQUIRED FLAGS
     --package=PACKAGE
        List all tags in a specified artifact, such as a container image or a
        language package.

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

        $ gcloud alpha artifacts tags list

        $ gcloud beta artifacts tags list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud artifacts tags list \
    --package=my-package \
    --filter='name="projects/my-project/locations/us/repositories/my-repo/packages/my-package/tags/my-tag"'

gcloud artifacts tags list \
    --package=my-package \
    --filter='name="projects/my-project/locations/us/repositories/my-repo/packages/my-package/tags/my*"'

gcloud artifacts tags list \
    --package=my-package \
    --filter='name="projects/my-project/locations/us/repositories/my-repo/packages/my-package/tags/*tag"'
```

### gcloud artifacts tags update

```text
NAME
    gcloud artifacts tags update - update an Artifact Registry tag

SYNOPSIS
    gcloud artifacts tags update
        (TAG : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        --version=VERSION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Artifact Registry tag.

    This command can fail for the following reasons:
      o The tag does not exist.
      o The specified version or package does not exist.
      o The active account does not have permission to update tags.
      o The specified package format doesn't support tag operations (e.g.
        maven).

EXAMPLES
    To update a tag with the name my-tag to version 1.0.0 of package my-pkg
    from another version, run:

        $ gcloud artifacts tags update my-tag --version=1.0.0 \
            --package=my-pkg

POSITIONAL ARGUMENTS
     Tag resource - The Artifact Registry tag to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument tag on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TAG
          ID of the tag or fully qualified identifier for the tag.

          To set the tag attribute:
          + provide the argument tag on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the tag. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --package=PACKAGE
          The package associated with the tag.

          To set the package attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --package on the command line.

       --repository=REPOSITORY
          The repository associated with the tag. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument tag on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

REQUIRED FLAGS
     --version=VERSION
        The version associated with the tag.

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

        $ gcloud alpha artifacts tags update

        $ gcloud beta artifacts tags update
```

### gcloud beta artifacts tags create

```text
NAME
    gcloud beta artifacts tags create - create an Artifact Registry tag

SYNOPSIS
    gcloud beta artifacts tags create
        (TAG : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        --version=VERSION [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts tags delete

```text
NAME
    gcloud beta artifacts tags delete - delete an Artifact Registry tag

SYNOPSIS
    gcloud beta artifacts tags delete
        (TAG : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts tags list

```text
NAME
    gcloud beta artifacts tags list - list Artifact Registry tags

SYNOPSIS
    gcloud beta artifacts tags list --package=PACKAGE
        [--location=LOCATION --repository=REPOSITORY] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts tags update

```text
NAME
    gcloud beta artifacts tags update - update an Artifact Registry tag

SYNOPSIS
    gcloud beta artifacts tags update
        (TAG : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        --version=VERSION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts tags create

```text
NAME
    gcloud alpha artifacts tags create - create an Artifact Registry tag

SYNOPSIS
    gcloud alpha artifacts tags create
        (TAG : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        --version=VERSION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts tags delete

```text
NAME
    gcloud alpha artifacts tags delete - delete an Artifact Registry tag

SYNOPSIS
    gcloud alpha artifacts tags delete
        (TAG : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts tags list

```text
NAME
    gcloud alpha artifacts tags list - list Artifact Registry tags

SYNOPSIS
    gcloud alpha artifacts tags list --package=PACKAGE
        [--location=LOCATION --repository=REPOSITORY] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts tags update

```text
NAME
    gcloud alpha artifacts tags update - update an Artifact Registry tag

SYNOPSIS
    gcloud alpha artifacts tags update
        (TAG : --location=LOCATION --package=PACKAGE --repository=REPOSITORY)
        --version=VERSION [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/tags (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

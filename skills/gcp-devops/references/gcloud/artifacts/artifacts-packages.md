---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/packages
---

# gcloud artifacts packages

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts packages delete

```text
NAME
    gcloud artifacts packages delete - delete an Artifact Registry package

SYNOPSIS
    gcloud artifacts packages delete
        (PACKAGE : --location=LOCATION --repository=REPOSITORY) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Artifact Registry package.

    This command can fail for the following reasons:
      o The specified package does not exist.
      o The active account does not have permission to delete packages.

EXAMPLES
    To delete a package named my-pkg under the current project, repository, and
    location, run:

        $ gcloud artifacts packages delete my-pkg

POSITIONAL ARGUMENTS
     Package resource - The Artifact Registry package to delete. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument package on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PACKAGE
          ID of the package or fully qualified identifier for the package.

          To set the package attribute:
          + provide the argument package on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the package. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument package on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --repository=REPOSITORY
          The repository associated with the package. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument package on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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

        $ gcloud alpha artifacts packages delete

        $ gcloud beta artifacts packages delete
```

### gcloud artifacts packages describe

```text
NAME
    gcloud artifacts packages describe - describe an Artifact Registry package

SYNOPSIS
    gcloud artifacts packages describe
        (PACKAGE : --location=LOCATION --repository=REPOSITORY)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Artifact Registry package.

    This command can fail for the following reasons:
      o The specified package does not exist.
      o The active account does not have permission to view packages.

EXAMPLES
    To describe a package named my-pkg under the current project, repository,
    and location, run:

        $ gcloud artifacts packages describe my-pkg

POSITIONAL ARGUMENTS
     Package resource - The Artifact Registry package to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument package on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PACKAGE
          ID of the package or fully qualified identifier for the package.

          To set the package attribute:
          + provide the argument package on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the package. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument package on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --repository=REPOSITORY
          The repository associated with the package. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument package on the command line with a fully
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

### gcloud artifacts packages list

```text
NAME
    gcloud artifacts packages list - list Artifact Registry packages

SYNOPSIS
    gcloud artifacts packages list
        [--location=LOCATION --repository=REPOSITORY] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Artifact Registry packages in the specified repository and
    project.

    To specify the maximum number of packages to list, use the --limit flag.

EXAMPLES
    The following command lists a maximum of five packages:

        $ gcloud artifacts packages list --limit=5

    To list packages with name as my-pkg:

        $ gcloud artifacts packages list \
          --filter='name="projects/my-project/locations/us/repositories/my\
        -repo/packages/my-pkg"

    To list packages with a given partial name, use * to match any character in
    name:

        $ gcloud artifacts packages list \
          --filter='name="projects/my-project/locations/us/repositories/my\
        -repo/packages/*pkg"'

        $ gcloud artifacts packages list \
          --filter='name="projects/my-project/locations/us/repositories/my\
        -repo/packages/my*"'

    To list files that have annotations:

        $ gcloud artifacts packages list --filter=annotations:*

    To list packages with annotations pair as [annotation_key:
    annotation_value]:

        $ gcloud artifacts packages list \
          --filter='annotations.annotation_key:annotation_value'

    To list packages with annotations containing key as my_key:

        $ gcloud artifacts packages list --filter='annotations.my_key'

        If the key or value contains special characters, such as `my.key` or `my.value`, backtick("`") is required:

        $ gcloud artifacts packages list --filter='annotations.`my.key`'

        $ gcloud artifacts packages list \
          --filter='annotations.`my.key`:`my.value`'

    To list packages with given partial annotation key or value, use * to match
    any character:

        $ gcloud artifacts packages list \
          --filter='annotations.my_*:`*.value`'

    To list packages ordered by create_time:

        $ gcloud artifacts packages list --sort-by=create_time

    To list packages ordered by update_time reversely:

        $ gcloud artifacts packages list --sort-by=~update_time

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

        $ gcloud alpha artifacts packages list

        $ gcloud beta artifacts packages list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud artifacts packages list \
    --filter='name="projects/my-project/locations/us/repositories/my-repo/packages/my-pkg"'

gcloud artifacts packages list \
    --filter='name="projects/my-project/locations/us/repositories/my-repo/packages/*pkg"'

gcloud artifacts packages list \
    --filter='name="projects/my-project/locations/us/repositories/my-repo/packages/my*"'

gcloud artifacts packages list \
    --filter=annotations:*

gcloud artifacts packages list \
    --filter='annotations.annotation_key:annotation_value'

gcloud artifacts packages list \
    --filter='annotations.my_key'

gcloud artifacts packages list \
    --filter='annotations.`my.key`'

gcloud artifacts packages list \
    --filter='annotations.`my.key`:`my.value`'

gcloud artifacts packages list \
    --filter='annotations.my_*:`*.value`'

gcloud artifacts packages list \
    --sort-by=create_time

gcloud artifacts packages list \
    --sort-by=~update_time
```

### gcloud artifacts packages update

```text
NAME
    gcloud artifacts packages update - update annotations on an Artifact
        Registry package

SYNOPSIS
    gcloud artifacts packages update
        (PACKAGE : --location=LOCATION --repository=REPOSITORY)
        [--annotations=[ANNOTATIONS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update annotations on an Artifact Registry package.

EXAMPLES
    To update annotations on a package named my-pkg when the project ID,
    repository and location defaults are set, run the following command:

    CAUTION: This command will overwrite any existing annotations on the
    package.

        $ gcloud artifacts packages update my-pkg \
          --annotations=key1=value1,key2=value2

    To clear all annotations on the package run the following command:

        $ gcloud artifacts packages update my-pkg --annotations={}

POSITIONAL ARGUMENTS
     Package resource - The Artifact Registry package to update. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument package on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PACKAGE
          ID of the package or fully qualified identifier for the package.

          To set the package attribute:
          + provide the argument package on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the package. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument package on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --repository=REPOSITORY
          The repository associated with the package. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument package on the command line with a fully
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

### gcloud beta artifacts packages delete

```text
NAME
    gcloud beta artifacts packages delete - delete an Artifact Registry package

SYNOPSIS
    gcloud beta artifacts packages delete
        (PACKAGE : --location=LOCATION --repository=REPOSITORY) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts packages list

```text
NAME
    gcloud beta artifacts packages list - list Artifact Registry packages

SYNOPSIS
    gcloud beta artifacts packages list
        [--location=LOCATION --repository=REPOSITORY] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts packages delete

```text
NAME
    gcloud alpha artifacts packages delete - delete an Artifact Registry
        package

SYNOPSIS
    gcloud alpha artifacts packages delete
        (PACKAGE : --location=LOCATION --repository=REPOSITORY) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts packages list

```text
NAME
    gcloud alpha artifacts packages list - list Artifact Registry packages

SYNOPSIS
    gcloud alpha artifacts packages list
        [--location=LOCATION --repository=REPOSITORY] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the first `--filter` example opens `'` before `name="` but never closes it after `my-pkg"`, so the shell keeps waiting for input and swallows the following text; the runnable form closes the quote.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/packages (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

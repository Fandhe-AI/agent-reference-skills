---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/files
---

# gcloud artifacts files

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts files delete

```text
NAME
    gcloud artifacts files delete - delete an Artifact Registry file

SYNOPSIS
    gcloud artifacts files delete
        (FILE : --location=LOCATION --repository=REPOSITORY) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Artifact Registry file.

    This command can fail for the following reasons:
      o The specified file does not exist.
      o The active account does not have permission to delete files.
      o The repository is not a Generic repository.

EXAMPLES
    To delete a file named pkg:1.0.0:file1.txt under the current project,
    repository, and location, run:

        $ gcloud artifacts files delete pkg:v0.0.1:file1.txt

POSITIONAL ARGUMENTS
     File resource - The Artifact Registry file to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument file on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FILE
          ID of the file or fully qualified identifier for the file.

          To set the file attribute:
          + provide the argument file on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the file. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument file on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --repository=REPOSITORY
          The repository associated with the file. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument file on the command line with a fully
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
```

### gcloud artifacts files describe

```text
NAME
    gcloud artifacts files describe - describe an Artifact Registry file

SYNOPSIS
    gcloud artifacts files describe
        (FILE : --location=LOCATION --repository=REPOSITORY)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Artifact Registry file.

    The file hashes are displayed as hex strings.

    This command can fail for the following reasons:
      o The specified file does not exist.
      o The active account does not have permission to view file.

EXAMPLES
    To describe a file named my-file.txt under the current project, repository,
    and location, run:

        $ gcloud artifacts files describe my-file.txt

POSITIONAL ARGUMENTS
     File resource - The Artifact Registry file to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument file on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FILE
          ID of the file or fully qualified identifier for the file.

          To set the file attribute:
          + provide the argument file on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the file. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument file on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --repository=REPOSITORY
          The repository associated with the file. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument file on the command line with a fully
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

### gcloud artifacts files download

```text
NAME
    gcloud artifacts files download - download an Artifact Registry file

SYNOPSIS
    gcloud artifacts files download
        (FILE : --location=LOCATION --repository=REPOSITORY)
        --destination=DESTINATION [--allow-overwrite]
        [--local-filename=LOCAL_FILENAME] [--parallelism=PARALLELISM]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Downloads an Artifact Registry file based on file name.

EXAMPLES
    To download a file named myfile in project my-project under repository
    my-repo in us-central1 to the local path ~/:

        $ gcloud artifacts files download --location=us-central1 \
          --project=my-project --repository=my-repo --destination=~/ \
          myfile

    To download a file named myfile in project my-project under repository
    my-repo in us-central1 to the local path ~/ using parallel multipart
    download with 4 threads:

        $ gcloud artifacts files download --location=us-central1 \
          --project=my-project --repository=my-repo --destination=~/ \
          --parallelism=4 myfile

    To download a file named myfile in project my-project under repository
    my-repo in us-central1 to the local path ~/ with file overwriting enabled:

        $ gcloud artifacts files download --location=us-central1 \
          --project=my-project --repository=my-repo --destination=~/ \
          myfile --allow-overwrite

POSITIONAL ARGUMENTS
     File resource - The Artifact Registry file name. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument file on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FILE
          ID of the file or fully qualified identifier for the file.

          To set the name attribute:
          + provide the argument file on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the file.

          To set the location attribute:
          + provide the argument file on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --repository=REPOSITORY
          Repository of the file.

          To set the repository attribute:
          + provide the argument file on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

REQUIRED FLAGS
     --destination=DESTINATION
        The path where you want to download the file.

OPTIONAL FLAGS
     --allow-overwrite
        If specified, the command overwrites an existing file

     --local-filename=LOCAL_FILENAME
        If specified, the name of the downloaded file on the local system is
        set to the value you use for LOCAL_FILENAME. Otherwise the name of the
        downloaded file is based on the file name in the registry.

     --parallelism=PARALLELISM
        Specifies the number of threads to use for downloading the file in
        parallel.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud artifacts files list

```text
NAME
    gcloud artifacts files list - list Artifact Registry files

SYNOPSIS
    gcloud artifacts files list [--package=PACKAGE] [--tag=TAG]
        [--version=VERSION] [--location=LOCATION --repository=REPOSITORY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Artifact Registry files in the specified repository and location.

    To specify the maximum number of files to list, use the --limit flag.

EXAMPLES
    To list files in the current project under repository my-repo in us:

        $ gcloud artifacts files list --repository=my-repo --location=us

    The following command lists a maximum of five files:

        $ gcloud artifacts files list --repository=my-repo --location=us \
          --limit=5

    To list files in the current project under repository my-repo in us owned
    by package my-package:

        $ gcloud artifacts files list --repository=my-repo --location=us \
          --package=my-package

    To list files in the current project under repository my-repo in us owned
    by package my-package and version 1.0.0:

        $ gcloud artifacts files list --repository=my-repo --location=us \
          --package=my-package --version=1.0.0

    To list files in the current project under repository my-repo in us owned
    by package my-package and tag name my-tag:

        $ gcloud artifacts files list --repository=my-repo --location=us \
          --package=my-package --tag=my-tag

    To list files with name as my-file:

        $ gcloud artifacts files list \
          --filter='name="projects/my-project/locations/us/repositories/my\
        -repo/files/my-file"'

    To list files with a given partial name, use * to match any character in
    name:

        $ gcloud artifacts files list \
          --filter='name="projects/my-project/locations/us/repositories/my\
        -repo/files/*file"'

        $ gcloud artifacts files list \
          --filter='name="projects/my-project/locations/us/repositories/my\
        -repo/files/my-*"'

    To list files that have annotations:

        $ gcloud artifacts files list --filter=annotations:*

    To list files with annotations pair as [annotation_key: annotation_value]

        $ gcloud artifacts files list \
          --filter='annotations.annotation_key:annotation_value'

    To list files with annotations containing key as my_key:

        $ gcloud artifacts files list --filter='annotations.my_key'

        If the key or value contains special characters, such as `my.key` and `my.value`, backtick("`") is required:

        $ gcloud artifacts files list --filter='annotations.`my.key`'

        $ gcloud artifacts files list \
          --filter='annotations.`my.key`:`my.value`'

    To list files with given partial annotation key or value, use * to match
    any character:

        $ gcloud artifacts files list --filter='annotations.*key:`*.value`'

    To list files in the current project under repository my-repo in us,
    ordering by create_time:

        $ gcloud artifacts files list --repository=my-repo --location=us \
          --sort-by=create_time

    To list files in the current project under repository my-repo in us,
    ordering by update_time reversely:

        $ gcloud artifacts files list --repository=my-repo --location=us \
          --sort-by=~update_time

FLAGS
     --package=PACKAGE
        List all files in a specified artifact, such as a container image or a
        language package. If you do not use --tag or --version in the command,
        the command lists files in all versions of the artifact.

     --tag=TAG
        List all files in the artifact version with the specified tag. This
        flag only works with formats that use tags, such as container images.
        Use the --package flag to specify the artifact.

     --version=VERSION
        List all files in the specified artifact version. Use the --package
        flag to specify the artifact.

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

        $ gcloud alpha artifacts files list

        $ gcloud beta artifacts files list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud artifacts files list \
    --filter='name="projects/my-project/locations/us/repositories/my-repo/files/my-file"'

gcloud artifacts files list \
    --filter='name="projects/my-project/locations/us/repositories/my-repo/files/*file"'

gcloud artifacts files list \
    --filter='name="projects/my-project/locations/us/repositories/my-repo/files/my-*"'
```

### gcloud artifacts files update

```text
NAME
    gcloud artifacts files update - update annotations on an Artifact Registry
        file

SYNOPSIS
    gcloud artifacts files update
        (FILE : --location=LOCATION --repository=REPOSITORY)
        [--annotations=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update annotations on an Artifact Registry file.

EXAMPLES
    To update annotations on a file named my-file.txt when the project ID,
    repository and location defaults are set, run the following command:

    CAUTION: This command will overwrite any existing annotations on the file.

        $ gcloud artifacts files update my-file.txt \
          --annotations=key1=value1,key2=value2

    To clear all annotations on the file run the following command:

        $ gcloud artifacts files update my-file.txt --annotations={}

POSITIONAL ARGUMENTS
     File resource - The Artifact Registry file to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument file on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FILE
          ID of the file or fully qualified identifier for the file.

          To set the file attribute:
          + provide the argument file on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the file. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument file on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --repository=REPOSITORY
          The repository associated with the file. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument file on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

FLAGS
     --annotations=[KEY=VALUE,...]
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

### gcloud artifacts files upload

```text
NAME
    gcloud artifacts files upload - uploads files to Artifact Registry

SYNOPSIS
    gcloud artifacts files upload
        (--source=SOURCE | --source-directory=SOURCE_DIRECTORY) [--async]
        [--file=FILE] [--file-type=FILE_TYPE; default="attachment"]
        [--skip-existing] [--location=LOCATION --repository=REPOSITORY]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Uploads files to Artifact Registry.

EXAMPLES
    To upload an attachment file located in /path/to/file/ to a repository in
    "us-central1":

        $ gcloud artifacts files upload --location=us-central1 \
          --project=myproject --repository=myrepo --file=myfile \
          --source=/path/to/file/

    To upload an artifact file located in /path/to/file/ to a repository in
    "us-central1":

        $ gcloud artifacts files upload --location=us-central1 \
          --project=myproject --repository=myrepo --file=myfile \
          --source=/path/to/file/ --file-type=artifact

    To upload all files located in directory /path/to/file/ to a repository in
    "us-central1" as attachment files:

        $ gcloud artifacts files upload --location=us-central1 \
          --project=myproject --repository=myrepo \
          --source-directory=/path/to/file/ --file-type=attachment

REQUIRED FLAGS
     Exactly one of these must be specified:

       --source=SOURCE
          The path to the file you are uploading.

       --source-directory=SOURCE_DIRECTORY
          The directory you are uploading.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --file=FILE
        The name under which the file will be uploaded. If not specified, the
        name of the local file is used.

     --file-type=FILE_TYPE; default="attachment"
        The type of the file to upload. FILE_TYPE must be one of:

            attachment
               The file represents an attachment file.
            artifact
               The file represents an artifact.

     --skip-existing
        If specified, skip uploading files that already exist in the
        repository, and continue to upload the remaining files.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud beta artifacts files list

```text
NAME
    gcloud beta artifacts files list - list Artifact Registry files

SYNOPSIS
    gcloud beta artifacts files list [--package=PACKAGE] [--tag=TAG]
        [--version=VERSION] [--location=LOCATION --repository=REPOSITORY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts files list

```text
NAME
    gcloud alpha artifacts files list - list Artifact Registry files

SYNOPSIS
    gcloud alpha artifacts files list [--package=PACKAGE] [--tag=TAG]
        [--version=VERSION] [--location=LOCATION --repository=REPOSITORY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/files (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

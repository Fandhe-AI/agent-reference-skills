---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/generic
---

# gcloud artifacts generic

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts generic download

```text
NAME
    gcloud artifacts generic download - download a generic artifact from a
        generic artifact repository

SYNOPSIS
    gcloud artifacts generic download --destination=DESTINATION
        --package=ARTIFACT --version=VERSION [--chunk-size=CHUNK_SIZE]
        [--name=NAME] [--parallelism=PARALLELISM]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Download a generic artifact from a generic artifact repository.

EXAMPLES
    To download version v0.1.0 of myfile.txt located in a repository in
    "us-central1" to /path/to/destination/:

        $ gcloud artifacts generic download --location=us-central1 \
          --project=myproject --repository=myrepo --package=mypackage \
          --version=v0.1.0 --destination=/path/to/destination/ \
          --name=myfile.txt

    To download version v0.1.0 of myfile.txt located in a repository in
    "us-central1" to /path/to/destination/ using parallel multipart download
    with 4 threads:

        $ gcloud artifacts generic download --location=us-central1 \
          --project=myproject --repository=myrepo --package=mypackage \
          --version=v0.1.0 --destination=/path/to/destination/ \
          --name=myfile.txt --parallelism=4

    To download version v0.1.0 of myfile.txt in 8000 byte chunks located in a
    repository in "us-central1" to /path/to/destination/:

        $ gcloud artifacts generic download --location=us-central1 \
          --project=myproject --repository=myrepo --package=mypackage \
          --version=v0.1.0 --destination=/path/to/destination/ \
          --name=myfile.txt --chunk-size=8000

    To download all files of version v0.1.0 and package mypackage located in a
    repository in "us-central1" to /path/to/destination/ while maintaining the
    folder hierarchy:

        $ gcloud artifacts generic download --location=us-central1 \
          --project=myproject --repository=myrepo --package=mypackage \
          --version=v0.1.0 --destination=/path/to/destination/

REQUIRED FLAGS
     --destination=DESTINATION
        The path where you want to save the downloaded file.

     --package=ARTIFACT
        The artifact to download.

     --version=VERSION
        The version of the artifact to download.

OPTIONAL FLAGS
     --chunk-size=CHUNK_SIZE
        If specified, the chunk size (bytes) to use for downloading the
        package.

     --name=NAME
        If specified, the file name within the artifact to download.

     --parallelism=PARALLELISM
        Specifies the number of threads to use for downloading the file in
        parallel.

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

NOTES
    These variants are also available:

        $ gcloud alpha artifacts generic download

        $ gcloud beta artifacts generic download
```

### gcloud artifacts generic upload

```text
NAME
    gcloud artifacts generic upload - uploads an artifact to a generic
        repository

SYNOPSIS
    gcloud artifacts generic upload --package=PACKAGE --version=VERSION
        (--source=SOURCE | --source-directory=SOURCE_DIRECTORY) [--async]
        [--destination-path=DESTINATION_PATH] [--skip-existing]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Uploads an artifact to a generic repository.

EXAMPLES
    To upload version v0.1.0 of a generic artifact located in /path/to/file/ to
    a repository in "us-central1":

        $ gcloud artifacts generic upload --location=us-central1 \
          --project=myproject --repository=myrepo --package=mypackage \
          --version=v0.1.0 --source=/path/to/file/

    To upload version v0.1.0 of a generic artifact located in /path/to/file/ to
    a repository in "us-central1" within a folder structure:

        $ gcloud artifacts generic upload --location=us-central1 \
          --project=myproject --repository=myrepo --package=mypackage \
          --version=v0.1.0 --source=/path/to/file/ \
          --destination-path=folder/file

REQUIRED FLAGS
     --package=PACKAGE
        The package to upload.

     --version=VERSION
        The version of the package. You cannot overwrite an existing version in
        the repository.

     Exactly one of these must be specified:

       --source=SOURCE
          The path to the file you are uploading.

       --source-directory=SOURCE_DIRECTORY
          The directory you are uploading.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --destination-path=DESTINATION_PATH
        Use to specify the path to upload a generic artifact to within a folder
        structure.

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

NOTES
    These variants are also available:

        $ gcloud alpha artifacts generic upload

        $ gcloud beta artifacts generic upload
```

### gcloud beta artifacts generic download

```text
NAME
    gcloud beta artifacts generic download - download a generic artifact from a
        generic artifact repository

SYNOPSIS
    gcloud beta artifacts generic download --destination=DESTINATION
        --package=ARTIFACT --version=VERSION [--chunk-size=CHUNK_SIZE]
        [--name=NAME] [--parallelism=PARALLELISM]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts generic upload

```text
NAME
    gcloud beta artifacts generic upload - uploads an artifact to a generic
        repository

SYNOPSIS
    gcloud beta artifacts generic upload --package=PACKAGE --version=VERSION
        (--source=SOURCE | --source-directory=SOURCE_DIRECTORY) [--async]
        [--destination-path=DESTINATION_PATH] [--skip-existing]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts generic download

```text
NAME
    gcloud alpha artifacts generic download - download a generic artifact from
        a generic artifact repository

SYNOPSIS
    gcloud alpha artifacts generic download --destination=DESTINATION
        --package=ARTIFACT --version=VERSION [--chunk-size=CHUNK_SIZE]
        [--name=NAME] [--parallelism=PARALLELISM]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts generic upload

```text
NAME
    gcloud alpha artifacts generic upload - uploads an artifact to a generic
        repository

SYNOPSIS
    gcloud alpha artifacts generic upload --package=PACKAGE --version=VERSION
        (--source=SOURCE | --source-directory=SOURCE_DIRECTORY) [--async]
        [--destination-path=DESTINATION_PATH] [--skip-existing]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/generic (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/yum
---

# gcloud artifacts yum

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts yum import

```text
NAME
    gcloud artifacts yum import - import one or more RPM packages into an
        artifact repository

SYNOPSIS
    gcloud artifacts yum import [[REPOSITORY] --location=LOCATION]
        --gcs-source=[GCS_SOURCE,...] [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud artifacts yum import imports RPM packages from Google Cloud Storage
    into the specified artifact repository.

EXAMPLES
    To import the package my-package.rpm from Google Cloud Storage into
    my-repo, run:

        $ gcloud artifacts yum import my-repo --location=us-central1 \
            --gcs-source=gs://my-bucket/path/to/my-package.rpm

    To import the packages my-package.rpm and other-package.rpm into my-repo,
    run:

        $ gcloud artifacts yum import my-repo --location=us-central1 \
            --gcs-source=gs://my-bucket/path/to/my-package.rpm,gs://\
        my-bucket/path/to/other-package.rpm

    To import all packages from my-directory into my-repo, run:

        $ gcloud artifacts yum import my-repo --location=us-central1 \
            --gcs-source=gs://my-bucket/my-directory/*

    To import all packages in all subdirectories from a Google Cloud Storage
    bucket into my-repo, run:

        $ gcloud artifacts yum import my-repo --location=us-central1 \
            --gcs-source=gs://my-bucket/**

POSITIONAL ARGUMENTS
     Repository resource - The Artifact Registry repository. If not specified,
     the current artifacts/repository is used. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument repository on the command line with a fully
        specified name;
      * set the property artifacts/repository with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [REPOSITORY]
        ID of the repository or fully qualified identifier for the repository.

        To set the repository attribute:
        * provide the argument repository on the command line;
        * set the property artifacts/repository.

     --location=LOCATION
        Location of the repository.

        To set the location attribute:
        * provide the argument repository on the command line with a fully
          specified name;
        * set the property artifacts/repository with a fully specified name;
        * provide the argument --location on the command line;
        * set the property artifacts/location.

REQUIRED FLAGS
     --gcs-source=[GCS_SOURCE,...]
        The Google Cloud Storage location of a package to import. To import
        multiple packages, use wildcards at the end of the path.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha artifacts yum import

        $ gcloud beta artifacts yum import
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud artifacts yum import my-repo \
    --location=us-central1 \
    --gcs-source=gs://my-bucket/path/to/my-package.rpm,gs://my-bucket/path/to/other-package.rpm
```

### gcloud artifacts yum upload

```text
NAME
    gcloud artifacts yum upload - upload an RPM package to an artifact
        repository

SYNOPSIS
    gcloud artifacts yum upload [[REPOSITORY] --location=LOCATION]
        --source=SOURCE [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud artifacts yum upload uploads an RPM package to the specified
    artifact repository.

EXAMPLES
    To upload the package my-package.rpm to my-repo, run:

        $ gcloud artifacts yum upload my-repo --location=us-central1 \
            --source=my-package.rpm

POSITIONAL ARGUMENTS
     Repository resource - The Artifact Registry repository. If not specified,
     the current artifacts/repository is used. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument repository on the command line with a fully
        specified name;
      * set the property artifacts/repository with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [REPOSITORY]
        ID of the repository or fully qualified identifier for the repository.

        To set the repository attribute:
        * provide the argument repository on the command line;
        * set the property artifacts/repository.

     --location=LOCATION
        Location of the repository.

        To set the location attribute:
        * provide the argument repository on the command line with a fully
          specified name;
        * set the property artifacts/repository with a fully specified name;
        * provide the argument --location on the command line;
        * set the property artifacts/location.

REQUIRED FLAGS
     --source=SOURCE
        The path of a package to upload.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha artifacts yum upload

        $ gcloud beta artifacts yum upload
```

### gcloud beta artifacts yum import

```text
NAME
    gcloud beta artifacts yum import - import one or more RPM packages into an
        artifact repository

SYNOPSIS
    gcloud beta artifacts yum import [[REPOSITORY] --location=LOCATION]
        --gcs-source=[GCS_SOURCE,...] [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts yum upload

```text
NAME
    gcloud beta artifacts yum upload - upload an RPM package to an artifact
        repository

SYNOPSIS
    gcloud beta artifacts yum upload [[REPOSITORY] --location=LOCATION]
        --source=SOURCE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts yum import

```text
NAME
    gcloud alpha artifacts yum import - import one or more RPM packages into an
        artifact repository

SYNOPSIS
    gcloud alpha artifacts yum import [[REPOSITORY] --location=LOCATION]
        --gcs-source=[GCS_SOURCE,...] [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts yum upload

```text
NAME
    gcloud alpha artifacts yum upload - upload an RPM package to an artifact
        repository

SYNOPSIS
    gcloud alpha artifacts yum upload [[REPOSITORY] --location=LOCATION]
        --source=SOURCE [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/yum (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

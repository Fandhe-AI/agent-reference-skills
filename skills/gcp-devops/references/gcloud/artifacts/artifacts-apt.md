---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/apt
---

# gcloud artifacts apt

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts apt import

```text
NAME
    gcloud artifacts apt import - import one or more Debian packages into an
        artifact repository

SYNOPSIS
    gcloud artifacts apt import [[REPOSITORY] --location=LOCATION]
        --gcs-source=[GCS_SOURCE,...] [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud artifacts apt import imports Debian packages from Google Cloud
    Storage into the specified artifact repository.

EXAMPLES
    To import the package my-package.deb from Google Cloud Storage into
    my-repo, run:

        $ gcloud artifacts apt import my-repo --location=us-central1 \
            --gcs-source=gs://my-bucket/path/to/my-package.deb

    To import the packages my-package.deb and other-package.deb into my-repo,
    run:

        $ gcloud artifacts apt import my-repo --location=us-central1 \
            --gcs-source=gs://my-bucket/path/to/my-package.deb,gs://\
        my-bucket/path/to/other-package.deb

    To import all packages from my-directory into my-repo, run:

        $ gcloud artifacts apt import my-repo --location=us-central1 \
            --gcs-source=gs://my-bucket/my-directory/*

    To import all packages in all subdirectories from a Google Cloud Storage
    bucket into my-repo, run:

        $ gcloud artifacts apt import my-repo --location=us-central1 \
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

        $ gcloud alpha artifacts apt import

        $ gcloud beta artifacts apt import
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud artifacts apt import my-repo \
    --location=us-central1 \
    --gcs-source=gs://my-bucket/path/to/my-package.deb,gs://my-bucket/path/to/other-package.deb
```

### gcloud artifacts apt upload

```text
NAME
    gcloud artifacts apt upload - upload a Debian package to an artifact
        repository

SYNOPSIS
    gcloud artifacts apt upload [[REPOSITORY] --location=LOCATION]
        --source=SOURCE [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud artifacts apt upload uploads a Debian package to the specified
    artifact repository.

EXAMPLES
    To upload the package my-package.deb to my-repo, run:

        $ gcloud artifacts apt upload my-repo --location=us-central1 \
            --source=my-package.deb

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

        $ gcloud alpha artifacts apt upload

        $ gcloud beta artifacts apt upload
```

### gcloud beta artifacts apt import

```text
NAME
    gcloud beta artifacts apt import - import one or more Debian packages into
        an artifact repository

SYNOPSIS
    gcloud beta artifacts apt import [[REPOSITORY] --location=LOCATION]
        --gcs-source=[GCS_SOURCE,...] [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts apt upload

```text
NAME
    gcloud beta artifacts apt upload - upload a Debian package to an artifact
        repository

SYNOPSIS
    gcloud beta artifacts apt upload [[REPOSITORY] --location=LOCATION]
        --source=SOURCE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts apt import

```text
NAME
    gcloud alpha artifacts apt import - import one or more Debian packages into
        an artifact repository

SYNOPSIS
    gcloud alpha artifacts apt import [[REPOSITORY] --location=LOCATION]
        --gcs-source=[GCS_SOURCE,...] [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts apt upload

```text
NAME
    gcloud alpha artifacts apt upload - upload a Debian package to an artifact
        repository

SYNOPSIS
    gcloud alpha artifacts apt upload [[REPOSITORY] --location=LOCATION]
        --source=SOURCE [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/apt (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/image-streaming-cache
---

# gcloud artifacts image-streaming-cache

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts image-streaming-cache create

```text
NAME
    gcloud artifacts image-streaming-cache create - initiates the prewarming of
        a specified artifact version or tag

SYNOPSIS
    gcloud artifacts image-streaming-cache create
        ([ARTIFACT] [(--tag=TAG | --version=VERSION)
          : [--package=PACKAGE : --location=LOCATION --repository=REPOSITORY]])
        --stream-location=STREAM_LOCATION [--force]
        [--retention-days=RETENTION_DAYS; default=3] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Initiates the prewarming of a specified artifact version or tag.

EXAMPLES
Prewarm a version by full resource name in a specific stream location

        $ gcloud artifacts image-streaming-cache create \
            projects/my-proj/locations/us-central1/repositories/my-repo/\
        packages/my-pkg/versions/sha256:abc123 --stream-location=us-east1

Prewarm a tagged artifact in the repository's region, asynchronously

        $ gcloud artifacts image-streaming-cache create --package=my-pkg \
            --tag=latest --location=us-central1 --repository=my-repo \
            --stream-location=us-east1

Prewarm with custom retention and force

        $ gcloud artifacts image-streaming-cache create --package=my-pkg \
            --version=sha256:abc123 --repository=my-repo \
            --location=us-west1 --stream-location=us-west1 \
            --retention-days=7 --force

POSITIONAL ARGUMENTS
     Exactly one of these must be specified:

       [ARTIFACT]
          The full resource name of the version or tag to prewarm.

       Or at least one of these can be specified:

         Exactly one of these must be specified:

           --tag=TAG
              The tag name to prewarm (e.g., 'latest').

           --version=VERSION
              The version ID to prewarm (e.g., 'sha256:abc123').

         Package resource - The package to prewarm. The arguments in this group
         can be used to specify the attributes of this resource. (NOTE) Some
         attributes are not given arguments in this group but can be set in
         other ways.

         To set the project attribute:
          - provide the argument --package on the command line with a fully
            specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         --package=PACKAGE
            ID of the package or fully qualified identifier for the package.

            To set the name attribute:
            - provide the argument --package on the command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --location=LOCATION
            Location of the package.

            To set the location attribute:
            - provide the argument --package on the command line with a fully
              specified name;
            - provide the argument --location on the command line;
            - set the property artifacts/location.

         --repository=REPOSITORY
            Repository of the package.

            To set the repository attribute:
            - provide the argument --package on the command line with a fully
              specified name;
            - provide the argument --repository on the command line;
            - set the property artifacts/repository.

REQUIRED FLAGS
     --stream-location=STREAM_LOCATION
        The target Cloud Region where the artifact should be prewarmed.

OPTIONAL FLAGS
     --force
        If set, evicts older items from the cache if the quota is reached.

     --retention-days=RETENTION_DAYS; default=3
        Number of days to retain the artifact in the cache (e.g., 1-7).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud artifacts image-streaming-cache create projects/my-proj/locations/us-central1/repositories/my-repo/packages/my-pkg/versions/sha256:abc123 \
    --stream-location=us-east1
```

### gcloud artifacts image-streaming-cache delete

```text
NAME
    gcloud artifacts image-streaming-cache delete - removes the prewarmed state
        of a specific artifact from a specific stream location

SYNOPSIS
    gcloud artifacts image-streaming-cache delete
        ([ARTIFACT] [(--tag=TAG | --version=VERSION)
          : [--package=PACKAGE : --location=LOCATION --repository=REPOSITORY]])
        --stream-location=STREAM_LOCATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes the prewarmed state of a specific artifact from a specific stream
    location.

EXAMPLES
Removes the prewarmed state of a specific artifact using flags

        $ gcloud artifacts image-streaming-cache delete --package=my-pkg \
            --tag=latest --repository=my-repo --location=us-central1 \
            --stream-location=us-east1

Using full resource name

        $ gcloud artifacts image-streaming-cache delete \
            projects/my-proj/locations/us-central1/repositories/my-repo/\
        packages/my-pkg/versions/sha256:abc123 --stream-location=us-east1

POSITIONAL ARGUMENTS
     Exactly one of these must be specified:

       [ARTIFACT]
          The full resource name of the version or tag to remove.

       Or at least one of these can be specified:

         Exactly one of these must be specified:

           --tag=TAG
              The tag to remove (e.g., 'latest').

           --version=VERSION
              The version to remove (e.g., 'sha256:abc123').

         Package resource - The package to remove. The arguments in this group
         can be used to specify the attributes of this resource. (NOTE) Some
         attributes are not given arguments in this group but can be set in
         other ways.

         To set the project attribute:
          - provide the argument --package on the command line with a fully
            specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         --package=PACKAGE
            ID of the package or fully qualified identifier for the package.

            To set the name attribute:
            - provide the argument --package on the command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --location=LOCATION
            Location of the package.

            To set the location attribute:
            - provide the argument --package on the command line with a fully
              specified name;
            - provide the argument --location on the command line;
            - set the property artifacts/location.

         --repository=REPOSITORY
            Repository of the package.

            To set the repository attribute:
            - provide the argument --package on the command line with a fully
              specified name;
            - provide the argument --repository on the command line;
            - set the property artifacts/repository.

REQUIRED FLAGS
     --stream-location=STREAM_LOCATION
        The target Cloud Region where the artifact should be prewarmed.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud artifacts image-streaming-cache delete projects/my-proj/locations/us-central1/repositories/my-repo/packages/my-pkg/versions/sha256:abc123 \
    --stream-location=us-east1
```

### gcloud artifacts image-streaming-cache describe

```text
NAME
    gcloud artifacts image-streaming-cache describe - checks and describes the
        prewarmed status of an artifact

SYNOPSIS
    gcloud artifacts image-streaming-cache describe
        ([ARTIFACT] [(--tag=TAG | --version=VERSION)
          : [--package=PACKAGE : --location=LOCATION --repository=REPOSITORY]])
        --stream-location=STREAM_LOCATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Checks and describes the prewarmed status of an artifact.

EXAMPLES
Check if the artifact is prewarmed using flags

        $ gcloud artifacts image-streaming-cache describe --package=my-pkg \
            --tag=latest --repository=my-repo --location=us-central1 \
            --stream-location=us-east1

Using full resource name

        $ gcloud artifacts image-streaming-cache describe \
            projects/my-proj/locations/us-central1/repositories/my-repo/\
        packages/my-pkg/versions/sha256:abc123 --stream-location=us-east1

POSITIONAL ARGUMENTS
     Exactly one of these must be specified:

       [ARTIFACT]
          The full resource name of the version or tag to check.

       Or at least one of these can be specified:

         Exactly one of these must be specified:

           --tag=TAG
              The tag to check (e.g., 'latest').

           --version=VERSION
              The version to check (e.g., 'sha256:abc123').

         Package resource - The package to check. The arguments in this group
         can be used to specify the attributes of this resource. (NOTE) Some
         attributes are not given arguments in this group but can be set in
         other ways.

         To set the project attribute:
          - provide the argument --package on the command line with a fully
            specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         --package=PACKAGE
            ID of the package or fully qualified identifier for the package.

            To set the name attribute:
            - provide the argument --package on the command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --location=LOCATION
            Location of the package.

            To set the location attribute:
            - provide the argument --package on the command line with a fully
              specified name;
            - provide the argument --location on the command line;
            - set the property artifacts/location.

         --repository=REPOSITORY
            Repository of the package.

            To set the repository attribute:
            - provide the argument --package on the command line with a fully
              specified name;
            - provide the argument --repository on the command line;
            - set the property artifacts/repository.

REQUIRED FLAGS
     --stream-location=STREAM_LOCATION
        The target Cloud Region where the artifact should be prewarmed.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud artifacts image-streaming-cache describe projects/my-proj/locations/us-central1/repositories/my-repo/packages/my-pkg/versions/sha256:abc123 \
    --stream-location=us-east1
```

### gcloud artifacts image-streaming-cache list

```text
NAME
    gcloud artifacts image-streaming-cache list - lists artifacts that are
        prewarmed within a given repository

SYNOPSIS
    gcloud artifacts image-streaming-cache list
        [--location=LOCATION --repository=REPOSITORY] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists artifacts that are prewarmed within a given repository.

EXAMPLES
List prewarmed artifacts for a specific stream location

        $ gcloud artifacts image-streaming-cache list --repository=my-repo \
            --location=us-central1 --filter="stream_location=us-east1"

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/image-streaming-cache (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

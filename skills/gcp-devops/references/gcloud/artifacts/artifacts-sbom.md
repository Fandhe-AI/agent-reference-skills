---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/sbom
---

# gcloud artifacts sbom

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts sbom export

```text
NAME
    gcloud artifacts sbom export - export SBOM files to Google Cloud Storage

SYNOPSIS
    gcloud artifacts sbom export --uri=URI [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export SBOM files to Google Cloud Storage.

EXAMPLES
    To export an SBOM file for the Artifact Registry image with URI
    "us-west1-docker.pkg.dev/my-project/my-repository/busy-box@sha256:abcxyz":

        $ gcloud artifacts sbom export \
            --uri=us-west1-docker.pkg.dev/my-project/my-repository/\
        busy-box@sha256:abcxyz

REQUIRED FLAGS
     --uri=URI
        The URI of the Artifact Registry image the SBOM is exported for. A
        'gcr.io' image can also be used if redirection is enabled in Artifact
        Registry. Make sure 'artifactregistry.projectsettings.get' permission
        is granted to the current gcloud user to verify the redirection status.

OPTIONAL FLAGS
     --location=LOCATION
        If specified, all requests to Artifact Analysis for occurrences will go
        to location specified

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud artifacts sbom export \
    --uri=us-west1-docker.pkg.dev/my-project/my-repository/busy-box@sha256:abcxyz
```

### gcloud artifacts sbom list

```text
NAME
    gcloud artifacts sbom list - list SBOM file references

SYNOPSIS
    gcloud artifacts sbom list [--location=LOCATION]
        [--dependency=DEPENDENCY | --resource=RESOURCE
          | --resource-prefix=RESOURCE_PREFIX] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]; default="occ.create_time"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List SBOM file references.

EXAMPLES
    To list SBOM file references:

        $ gcloud artifacts sbom list

    To list SBOM file references related to the image with the tag
    "us-east1-docker.pkg.dev/project/repo/my-image:1.0":

        $ gcloud artifacts sbom list \
            --resource="us-east1-docker.pkg.dev/project/repo/my-image:1.0"

    To list SBOM file references related to the image with the digest
    "us-east1-docker.pkg.dev/project/repo/my-image@sha256:88b205d7995332e10e836514fbfd59ecaf8976fc15060cd66e85cdcebe7fb356":

        $ gcloud artifacts sbom list \
            --resource="us-east1-docker.pkg.dev/project/repo/my-image@sha256\
        :88b205d7995332e10e836514fbfd59ecaf8976fc15060cd66e85cdcebe7fb356"

    To list SBOM file references related to the images with the resource path
    prefix "us-east1-docker.pkg.dev/project/repo":

        $ gcloud artifacts sbom list \
            --resource-prefix="us-east1-docker.pkg.dev/project/repo"

    To list SBOM file references generated when the images were pushed to
    Artifact Registry and related to the installed package dependency "perl":

        $ gcloud artifacts sbom list --dependency="perl"

FLAGS
     --location=LOCATION
        If specified, all requests to Artifact Analysis for occurrences will go
        to location specified

     At most one of these can be specified:

       --dependency=DEPENDENCY
          List SBOM file references generated when the images were pushed to
          Artifact Registry and related to the installed package dependency.
          See https://cloud.google.com/container-analysis/docs/scanning-types
          for supported packages.

       --resource=RESOURCE
          List SBOM file references related to the image resource uri.

       --resource-prefix=RESOURCE_PREFIX
          List SBOM file references related to the resource uri with the
          resource path prefix.

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

     --sort-by=[FIELD,...]; default="occ.create_time"
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit. The
        default is occ.create_time.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud artifacts sbom list \
    --resource="us-east1-docker.pkg.dev/project/repo/my-image@sha256:88b205d7995332e10e836514fbfd59ecaf8976fc15060cd66e85cdcebe7fb356"
```

### gcloud artifacts sbom load

```text
NAME
    gcloud artifacts sbom load - upload an SBOM file and create a reference
        occurrence

SYNOPSIS
    gcloud artifacts sbom load --source=SOURCE --uri=ARTIFACT_URI
        [--destination=DESTINATION] [--kms-key-version=KMS_KEY_VERSION]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Upload an SBOM file and create a reference occurrence.

EXAMPLES
    To upload an SBOM file at /path/to/sbom.json for a Docker image in Artifact
    Registry:

        $ gcloud artifacts sbom load --source=/path/to/sbom.json \
            --uri=us-west1-docker.pkg.dev/my-project/my-repository/\
        busy-box@sha256:abcxyz

    To upload an SBOM file at /path/to/sbom.json for a Docker image with a KMS
    key version to sign the created SBOM reference:

        $ gcloud artifacts sbom load --source=/path/to/sbom.json \
            --uri=us-west1-docker.pkg.dev/my-project/my-repository/\
        busy-box@sha256:abcxyz \
            --kms-key-version=projects/my-project/locations/us-west1/\
        keyRings/my-key-ring/cryptoKeys/my-key/cryptoKeyVersions/1

    To upload an SBOM file at /path/to/sbom.json for a Docker image from a
    Docker registry:

        $ gcloud artifacts sbom load --source=/path/to/sbom.json \
            --uri=my-docker-registry/my-image@sha256:abcxyz \
            --destination=gs://my-cloud-storage-bucket

REQUIRED FLAGS
     --source=SOURCE
        The SBOM file for uploading.

     --uri=ARTIFACT_URI
        The URI of the artifact the SBOM is generated from. The URI can be a
        Docker image from any Docker registries. A URI provided with a tag
        (e.g. [IMAGE]:[TAG]) will be resolved into a URI with a digest
        ([IMAGE]@sha256:[DIGEST]). When passing an image which is not from
        Artifact Registry or Container Registry with a tag, only public images
        can be resolved. Also, when passing an image which is not from Artifact
        Registry or Container Registry, the --destination flag is required.

OPTIONAL FLAGS
     --destination=DESTINATION
        The storage path will be used to store the SBOM file. Currently only
        supports Cloud Storage paths start with 'gs://'.

     --kms-key-version=KMS_KEY_VERSION
        Cloud KMS key version to sign the SBOM reference. The key version
        provided should be the resource ID in the format of
        projects/[KEY_PROJECT_ID]/locations/[LOCATION]/keyRings/[RING_NAME]/cryptoKeys/[KEY_NAME]/cryptoKeyVersions/[KEY_VERSION].

     --location=LOCATION
        If specified, all requests to Artifact Analysis for occurrences will go
        to location specified

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud artifacts sbom load \
    --source=/path/to/sbom.json \
    --uri=us-west1-docker.pkg.dev/my-project/my-repository/busy-box@sha256:abcxyz

gcloud artifacts sbom load \
    --source=/path/to/sbom.json \
    --uri=us-west1-docker.pkg.dev/my-project/my-repository/busy-box@sha256:abcxyz \
    --kms-key-version=projects/my-project/locations/us-west1/keyRings/my-key-ring/cryptoKeys/my-key/cryptoKeyVersions/1
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/sbom (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

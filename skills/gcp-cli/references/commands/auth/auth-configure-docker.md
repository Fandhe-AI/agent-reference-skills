---
source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/configure-docker
---

# gcloud auth configure-docker

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud auth configure-docker

```text
NAME
    gcloud auth configure-docker - register gcloud as a Docker credential
        helper

SYNOPSIS
    gcloud auth configure-docker [REGISTRIES] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud auth configure-docker adds the Docker credHelper entry to Docker's
    configuration file, or creates the file if it doesn't exist. This will
    register gcloud as the credential helper for all Google-supported Docker
    registries. If the Docker configuration already contains a credHelper
    entry, it will be overwritten.

    Note: docker and gcloud need to be on the same system PATH to work
    correctly.

    Note: This command will not work for docker installed via Snap, as the
    docker snap package does not currently provide an interface for credential
    helpers.

    For more details on Docker registries, see
    https://docs.docker.com/registry/.

    For more details on how to authenticate to Google Container Registry using
    this command, see
    https://cloud.google.com/container-registry/docs/advanced-authentication#gcloud-helper.

    For more details on Google Container Registry's standalone credential
    helpers, see https://github.com/GoogleCloudPlatform/docker-credential-gcr.

    For more details on Docker credential helpers, see
    https://docs.docker.com/engine/reference/commandline/login/#credential-helpers.

EXAMPLES
    To configure docker authentication after logging into gcloud, run:

        $ gcloud auth configure-docker

    To configure docker authentication with Container Registry, e.g., gcr.io,
    run:

        $ gcloud auth configure-docker gcr.io

POSITIONAL ARGUMENTS
     [REGISTRIES]
        The comma-separated list of registries to configure the credential
        helper for. Container Registry is a service for storing private
        container images. For available registries, see
        https://cloud.google.com/container-registry/docs/pushing-and-pulling#add-registry.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha auth configure-docker

        $ gcloud beta auth configure-docker
```

### gcloud beta auth configure-docker

```text
NAME
    gcloud beta auth configure-docker - register gcloud as a Docker credential
        helper

SYNOPSIS
    gcloud beta auth configure-docker [REGISTRIES] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha auth configure-docker

```text
NAME
    gcloud alpha auth configure-docker - register gcloud as a Docker credential
        helper

SYNOPSIS
    gcloud alpha auth configure-docker [REGISTRIES] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/configure-docker (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

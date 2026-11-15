---
source: https://docs.cloud.google.com/sdk/gcloud/reference/docker
---

# gcloud docker

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud docker

```text
NAME
    gcloud docker - enable Docker CLI access to Google Container Registry

SYNOPSIS
    gcloud docker [--authorize-only, -a] [--docker-host=DOCKER_HOST]
        [--server=SERVER,[SERVER,...], -s SERVER,[SERVER,...];
          default="gcr.io,us.gcr.io,
          eu.gcr.io,asia.gcr.io,staging-k8s.gcr.io,marketplace.gcr.io"]
        [GCLOUD_WIDE_FLAG ...] [-- DOCKER_ARGS ...]

DESCRIPTION
    (DEPRECATED) Enable Docker CLI access to Google Container Registry.

    gcloud docker will not be supported for Docker client versions above 18.03.

    As an alternative, use gcloud auth configure-docker to configure docker to
    use gcloud as a credential helper, then use docker as you would for non-GCR
    registries, e.g. docker pull gcr.io/project-id/my-image. Add
    --verbosity=error to silence this warning: gcloud docker --verbosity=error
    -- pull gcr.io/project-id/my-image.

    See:
    https://cloud.google.com/container-registry/docs/support/deprecation-notices#gcloud-docker

    gcloud docker wraps Docker commands so that gcloud can inject the
    appropriate fresh authentication token into requests that interact with the
    Docker registry.

    All Docker-specific flags are passed through to the underlying docker
    command. A full reference of Docker's command line options available after
    -- can be found here:
    https://docs.docker.com/engine/reference/commandline/cli/. You may also run
    gcloud docker -- --help to view the Docker CLI's help directly.

    Detailed documentation on Container Registry can be found here:
    https://cloud.google.com/container-registry/docs/

EXAMPLES
    To pull the image 'gcr.io/google-containers/pause:1.0' from the docker
    registry, run:

        gcloud docker -- pull gcr.io/google-containers/pause:1.0

    Push the image 'gcr.io/example-org/example-image:latest' to our private
    docker registry.

        gcloud docker -- push gcr.io/example-org/example-image:latest

    Configure authentication, then simply use docker:

        gcloud docker --authorize-only
        docker push gcr.io/example-org/example-image:latest

POSITIONAL ARGUMENTS
     [-- DOCKER_ARGS ...]
        Arguments to pass to Docker.

        The '--' argument must be specified between gcloud specific args on the
        left and DOCKER_ARGS on the right.

FLAGS
     --authorize-only, -a
        Configure Docker authorization only; do not launch the Docker
        command-line.

     --docker-host=DOCKER_HOST
        URL to connect to Docker Daemon. Format: tcp://host:port or
        unix:///path/to/socket.

     --server=SERVER,[SERVER,...], -s SERVER,[SERVER,...]; default="gcr.io,us.gcr.io,eu.gcr.io,asia.gcr.io,staging-k8s.gcr.io,marketplace.gcr.io"
        Address of the Google Cloud Registry.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/docker (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)

# samples

| Name | Description | Path |
| --- | --- | --- |
| Base images | Create a minimal image with `FROM scratch` or import a rootfs tarball. | [base-images.md](./base-images.md) |
| Build, tag, and publish an image | Build an image, add a name with `-t`, and push it to a registry. | [build-tag-and-publish-an-image.md](./build-tag-and-publish-an-image.md) |
| Build dependent images | Share base layers across Compose services with a multi-stage Dockerfile or `additional_contexts`. | [compose-dependent-images.md](./compose-dependent-images.md) |
| Environment variables precedence in Docker Compose | Show which value wins when a variable is defined in several places. | [compose-environment-variables-precedence.md](./compose-environment-variables-precedence.md) |
| Extend your Compose file | Share common service configuration with `extends`. | [compose-extends.md](./compose-extends.md) |
| Use Compose Watch | Sync source changes into a running service with `develop.watch`. | [compose-file-watch.md](./compose-file-watch.md) |
| Run Docker Compose services with GPU access | Reserve GPU devices for a Compose service via `deploy.resources.reservations.devices`. | [compose-gpu-support.md](./compose-gpu-support.md) |
| Include | Incorporate another Compose file (local, OCI artifact, or Git) with `include`. | [compose-include.md](./compose-include.md) |
| Use init containers in Compose | Run setup steps to completion before a service starts, using `pre_start`. | [compose-init-containers.md](./compose-init-containers.md) |
| Using lifecycle hooks with Compose | Run commands right after a container starts (`post_start`) or before it stops (`pre_stop`). | [compose-lifecycle-hooks.md](./compose-lifecycle-hooks.md) |
| Merge Compose files | Layer a base `compose.yaml` with override files. | [compose-merge.md](./compose-merge.md) |
| Networking in Compose | Isolate services with custom networks and join an external network. | [compose-networking.md](./compose-networking.md) |
| Package and deploy Docker Compose applications as OCI artifacts | Publish a Compose application to a registry with `docker compose publish`. | [compose-oci-artifact.md](./compose-oci-artifact.md) |
| Use Compose in production | Apply a production override file and redeploy a single service. | [compose-production.md](./compose-production.md) |
| Using profiles with Compose | Activate optional services only when a profile is enabled. | [compose-profiles.md](./compose-profiles.md) |
| Specify a project name | Override the Compose project name to isolate copies of a stack. | [compose-project-name.md](./compose-project-name.md) |
| Use provider services | Declare a service whose lifecycle is managed by a provider plugin. | [compose-provider-services.md](./compose-provider-services.md) |
| Docker Compose Quickstart | Flask hit counter with Redis: health checks, Compose Watch, and `include`. | [compose-quickstart.md](./compose-quickstart.md) |
| Set environment variables within your container's environment | Set container environment variables with `environment`, `env_file`, or `run -e`. | [compose-set-environment-variables.md](./compose-set-environment-variables.md) |
| Control startup and shutdown order in Compose | Wait for a dependency to be healthy before starting a service. | [compose-startup-order.md](./compose-startup-order.md) |
| Manage secrets securely in Docker Compose | Grant services file-based secrets mounted at `/run/secrets/<name>`. | [compose-use-secrets.md](./compose-use-secrets.md) |
| Set, use, and manage variables in a Compose file with interpolation | Substitute `${VAR}` values into a Compose file from `.env` or the shell. | [compose-variable-interpolation.md](./compose-variable-interpolation.md) |
| Dockerfile best practices | Recurring Dockerfile patterns: pinned base, apt cache busting, pipefail, ENTRYPOINT with CMD. | [dockerfile-best-practices.md](./dockerfile-best-practices.md) |
| Dockerfile overview | Package a small Flask app with a Dockerfile, build it, and run it. | [dockerfile-overview.md](./dockerfile-overview.md) |
| Add SBOM and provenance attestations with GitHub Actions | Push an image with provenance and an SBOM attestation. | [gha-attestations.md](./gha-attestations.md) |
| Cache management with GitHub Actions | Reuse build cache across workflow runs with the `gha` backend. | [gha-cache.md](./gha-cache.md) |
| Export to Docker with GitHub Actions | Load the build result into the runner's Docker image store. | [gha-export-docker.md](./gha-export-docker.md) |
| Local registry with GitHub Actions | Push to a throwaway `registry:3` service container for testing. | [gha-local-registry.md](./gha-local-registry.md) |
| Manage tags and labels with GitHub Actions | Generate image tags and OCI labels with `docker/metadata-action`. | [gha-manage-tags-labels.md](./gha-manage-tags-labels.md) |
| Multi-platform image with GitHub Actions | Build and push `linux/amd64` and `linux/arm64` images with QEMU and Buildx. | [gha-multi-platform.md](./gha-multi-platform.md) |
| Push to multiple registries with GitHub Actions | Log in to Docker Hub and GitHub Container Registry and push one build to both. | [gha-push-multi-registries.md](./gha-push-multi-registries.md) |
| Using secrets with GitHub Actions | Pass build secrets to `docker/build-push-action` and consume them with `RUN --mount=type=secret`. | [gha-secrets.md](./gha-secrets.md) |
| Test before push with GitHub Actions | Build and load the image, test it, then build for multiple platforms and push. | [gha-test-before-push.md](./gha-test-before-push.md) |
| Multi-container applications | Connect Nginx, two Node.js web containers, and Redis on a user-defined network. | [multi-container-applications.md](./multi-container-applications.md) |
| Multi-stage builds | Split a Spring Boot (Maven) build into a JDK build stage and a JRE runtime stage. | [multi-stage-builds.md](./multi-stage-builds.md) |
| Overriding container defaults | Override ports, environment variables, network, resource limits, and CMD / ENTRYPOINT with `docker run` flags. | [overriding-container-defaults.md](./overriding-container-defaults.md) |
| Persisting container data | Keep Postgres data across container deletion by mounting a named volume. | [persisting-container-data.md](./persisting-container-data.md) |
| Publishing and exposing ports | Publish a container port to the host with `docker run -p` or Compose `ports`. | [publishing-ports.md](./publishing-ports.md) |
| Build and share a containerized application | Run a published image, start a Compose stack, and push your own image to Docker Hub. | [run-an-app.md](./run-an-app.md) |
| Sharing local files with containers | Bind-mount a host directory into a container with `-v` or `--mount`. | [sharing-local-files.md](./sharing-local-files.md) |
| Understanding the image layers | Create image layers manually with `docker container commit` and inspect them with `docker image history`. | [understanding-image-layers.md](./understanding-image-layers.md) |
| Using the build cache | Reorder Dockerfile instructions so dependency installation stays cached. | [using-the-build-cache.md](./using-the-build-cache.md) |
| Writing a Dockerfile | Write a minimal Dockerfile for a Node.js app using FROM / WORKDIR / COPY / RUN / CMD. | [writing-a-dockerfile.md](./writing-a-dockerfile.md) |

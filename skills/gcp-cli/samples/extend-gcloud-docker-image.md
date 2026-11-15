---
source: https://docs.cloud.google.com/sdk/docs/dockerfile_example
---

# Build Your Own gcloud Docker Image

Extend the official gcloud CLI image with extra tools such as `make` or Java 21 in a Dockerfile.

## Signature / Usage

### Add `make` (Debian-based image)

```docker
FROM gcr.io/google.com/cloudsdktool/google-cloud-cli:latest
RUN apt-get update -qqy && apt-get -qqy upgrade && apt-get install -qqy make
```

### Add Java 21

```docker
FROM gcr.io/google.com/cloudsdktool/google-cloud-cli:latest
RUN curl -O https://download.oracle.com/java/21/latest/jdk-21_linux-x64_bin.deb && \
apt install ./jdk-21_linux-x64_bin.deb
```

### Keep gcloud configuration writable inside a container

Set `CLOUDSDK_CONFIG` when `$HOME` is read-only or when you run commands inside Docker; the directory must be writable.

Adapted (not in the official docs): the `CLOUDSDK_CONFIG` variable from the configurations topic is written as a Dockerfile `ENV` line; `/tmp/gcloud-config` is an example path.

```docker
ENV CLOUDSDK_CONFIG=/tmp/gcloud-config
```

## Options / Props

| Tag | Used in |
| --- | --- |
| `:latest` | `make`, Java 21 |
| `:debian_component_based` | `make`, Java 21 |
| `:emulators` | Java 21 |
| `:alpine`, `:slim` | `docker` / `docker-buildx` example on the source page |
| `:stable` | Debian-based migration target |

## Notes

- Only the tag in the final `FROM` line differs between the official per-tag Dockerfiles; the `make` example uses `apt-get`, so it applies to Debian-based tags.
- The input documents only Dockerfile extension. How to run the image (`docker run`), authenticate inside it, and the `:stable` migration steps are in the GoogleCloudPlatform/cloud-sdk-docker repository, which is not part of this skill's sources.
- The Java example downloads and installs a package from the network at build time; build it in a throwaway environment and verify the download.
- Source: https://docs.cloud.google.com/sdk/docs/dockerfile_example (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/downloads-docker (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/migrate-docker-images (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/configurations (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)

## Related

- [dockerfile-example.md](../references/install-setup/dockerfile-example.md)
- [downloads-docker.md](../references/install-setup/downloads-docker.md)
- [migrate-docker-images.md](../references/install-setup/migrate-docker-images.md)

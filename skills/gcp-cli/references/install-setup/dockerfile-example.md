---
source: https://docs.cloud.google.com/sdk/docs/dockerfile_example
---

# Build your own gcloud Docker image

Example Dockerfiles that extend the official gcloud CLI images with `docker` / `docker-buildx`, `make`, or Java 21.

## Signature / Usage

### With `docker` and `docker-buildx`

For the `:alpine` image (the same pattern applies to `:debian_component_based`, `:latest`, and `:slim` by changing the final `FROM` tag):

```docker
FROM docker:28.2.2 as static-docker-source # get latest docker
FROM gcr.io/google.com/cloudsdktool/google-cloud-cli:alpine
# Comment the line below if you don't want `docker`
COPY --from=static-docker-source /usr/local/bin/docker /usr/local/bin/docker
# Comment the line below if you don't want `docker-buildx`
COPY --from=static-docker-source /usr/local/libexec/docker/cli-plugins/docker-buildx /usr/local/libexec/docker/cli-plugins/docker-buildx
```

### With `make`

For the `:latest` image (same lines work for `:debian_component_based`):

```docker
FROM gcr.io/google.com/cloudsdktool/google-cloud-cli:latest
RUN apt-get update -qqy && apt-get -qqy upgrade && apt-get install -qqy make
```

### With Java 21

For the `:latest` image (same lines work for `:emulators` and `:debian_component_based`):

```docker
FROM gcr.io/google.com/cloudsdktool/google-cloud-cli:latest
RUN curl -O https://download.oracle.com/java/21/latest/jdk-21_linux-x64_bin.deb && \
apt install ./jdk-21_linux-x64_bin.deb
```

## Notes

- The source lists a separate Dockerfile per image tag; the tags are `:alpine`, `:debian_component_based`, `:latest`, `:slim` (docker / docker-buildx), `:latest` and `:debian_component_based` (make), and `:latest`, `:emulators`, `:debian_component_based` (Java 21). Only the tag in the final `FROM` line differs.
- The `make` examples use `apt-get`, so they apply to Debian-based images, matching the tags the source lists.
- The `:stable` image is the recommended migration target for the other tags; see migrate-docker-images.
- Source: https://docs.cloud.google.com/sdk/docs/dockerfile_example (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [downloads-docker.md](./downloads-docker.md)
- [migrate-docker-images.md](./migrate-docker-images.md)

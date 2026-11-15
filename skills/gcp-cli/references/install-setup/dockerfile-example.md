---
source: https://docs.cloud.google.com/sdk/docs/dockerfile_example
---

# Build your own gcloud Docker image

Example Dockerfiles that extend the official gcloud CLI images with `docker` / `docker-buildx`, `make`, or Java 21.

## Signature / Usage

### With `docker` and `docker-buildx`

For the `:alpine` image (the same pattern applies to `:debian_component_based`, `:latest`, and `:slim` by changing the final `FROM` tag):

Adapted (not in the official docs): Dockerfile comments must start the line, so the official trailing `# get latest docker` on the first `FROM` line (which makes the build fail with extra `FROM` arguments) is moved to its own line.

```docker
# get latest docker
FROM docker:28.2.2 as static-docker-source
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

Adapted (not in the official docs): `apt install` without `-y` stops at the confirmation prompt during `docker build`, so the package index is refreshed and `apt-get install -y` is used; `curl -fLO` makes the build fail on an HTTP error instead of saving an error page as the `.deb`; and `FROM --platform=linux/amd64` pins the base image to x64 because the package is `jdk-21_linux-x64_bin.deb`.

```docker
FROM --platform=linux/amd64 gcr.io/google.com/cloudsdktool/google-cloud-cli:latest
RUN curl -fLO https://download.oracle.com/java/21/latest/jdk-21_linux-x64_bin.deb && \
apt-get update -qqy && apt-get install -y ./jdk-21_linux-x64_bin.deb
```

## Notes

- Corrected from the official docs: the first `FROM` line ended with `# get latest docker`; Dockerfile treats `#` as a comment only at the start of a line, so the comment is moved to the line above.
- Corrected from the official docs: the Java 21 `RUN` line used `apt install ./jdk-21_linux-x64_bin.deb` without `-y`, which waits for confirmation and fails in a non-interactive `docker build`; it is shown as `apt-get update -qqy && apt-get install -y ./jdk-21_linux-x64_bin.deb`.
- Adapted from the official docs: the Java 21 example's `FROM gcr.io/google.com/cloudsdktool/google-cloud-cli:latest` and `RUN curl -O https://download.oracle.com/java/21/latest/jdk-21_linux-x64_bin.deb` become `FROM --platform=linux/amd64 ...` (the `.deb` is x64-only, so a build on an arm64 host would otherwise pull an arm64 base) and `curl -fLO` (fail on HTTP errors, follow redirects).
- The source lists a separate Dockerfile per image tag; the tags are `:alpine`, `:debian_component_based`, `:latest`, `:slim` (docker / docker-buildx), `:latest` and `:debian_component_based` (make), and `:latest`, `:emulators`, `:debian_component_based` (Java 21). Only the tag in the final `FROM` line differs.
- The `make` examples use `apt-get`, so they apply to Debian-based images, matching the tags the source lists.
- The `:latest`, `:alpine`, `:emulators`, `:slim`, and `:debian_component_based` tags used or listed on this page are the tags that migrate-docker-images.md asks you to migrate away from to the Debian-based `:stable` image; the source page still shows them, and the examples keep them as written.
- Source: https://docs.cloud.google.com/sdk/docs/dockerfile_example (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [downloads-docker.md](./downloads-docker.md)
- [migrate-docker-images.md](./migrate-docker-images.md)

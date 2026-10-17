---
source: https://docs.docker.com/build/building/best-practices/
---

# Dockerfile best practices

Recurring Dockerfile patterns from the official building best practices: pinned base, apt-get cache busting, pipefail, bind-mount instead of COPY, ENTRYPOINT with CMD.

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine:3.21@sha256:a8560b36e8b8210634f77d9f7f9efd7ffa463e380b75e2e74aff4511df3ef88c
```

Combine `apt-get update` and `install` in one `RUN` (sorted, version-pinned, cache cleaned):

```dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends \
    aufs-tools \
    automake \
    build-essential \
    curl \
    dpkg-sig \
    libcap-dev \
    libsqlite3-dev \
    mercurial \
    reprepro \
    ruby1.9.1 \
    ruby1.9.1-dev \
    s3cmd=1.1.* \
    && rm -rf /var/lib/apt/lists/*
```

Fail the build if any command in a pipe fails:

```dockerfile
RUN set -o pipefail && wget -O - https://some.site | wc -l > /number
```

Use a bind mount for build-only files instead of `COPY`:

```dockerfile
RUN --mount=type=bind,source=requirements.txt,target=/tmp/requirements.txt \
    pip install --requirement /tmp/requirements.txt
```

Main command in `ENTRYPOINT`, default flags in `CMD`:

```dockerfile
ENTRYPOINT ["s3cmd"]
CMD ["--help"]
```

Rebuild with a fresh base image and no cache:

```console
$ docker build --pull --no-cache -t my-image:my-tag .
```

## Notes

- `--pull` refreshes the base image; `--no-cache` re-runs all steps but does not pull a fresh base. They can be combined.
- On shells without `-o pipefail` (such as `dash` on Debian-based images), use the exec form: `RUN ["/bin/bash", "-c", "set -o pipefail && ..."]`.
- `ENV` values persist in their layer even if unset later; set, use and unset a secret-like variable inside a single `RUN`.
- Digest pinning opts out of automated security fixes; the page suggests Dependabot with `package-ecosystem: "docker"` to keep tags and digests current.

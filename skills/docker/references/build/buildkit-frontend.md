---
source: https://docs.docker.com/build/buildkit/frontend/
---

# Custom Dockerfile syntax

BuildKit loads Dockerfile frontends dynamically from container images. Set the `syntax` parser directive on the first line of the Dockerfile.

## Signature / Usage

```dockerfile
# syntax=[remote image reference]
```

```dockerfile
# syntax=docker/dockerfile:1
# syntax=docker.io/docker/dockerfile:1
# syntax=example.com/user/repo:tag@sha256:abcdef...
```

Or set the pre-defined `BUILDKIT_SYNTAX` build argument:

```console
$ docker build --build-arg BUILDKIT_SYNTAX=docker/dockerfile:1 .
```

Benefits: automatic bug fixes without updating the Docker daemon, consistent implementation across users, latest or third-party features, alternative build definitions, custom frontends.

## Notes

### Official releases

Images are published under `docker/dockerfile` on Docker Hub in two channels.

Stable channel (semantic versioning):

- `docker/dockerfile:1` - kept updated with the latest `1.x.x` minor and patch release.
- `docker/dockerfile:1.2` - kept updated with the latest `1.2.x` patch release; stops at `1.3.0`.
- `docker/dockerfile:1.2.1` - immutable.

Labs channel (early access features; `-labs` suffix):

- `docker/dockerfile:labs` - latest release on the labs channel.
- `docker/dockerfile:1-labs`, `docker/dockerfile:1.2-labs` - same as the stable tag, with experimental features enabled.
- `docker/dockerfile:1.2.1-labs` - immutable.

### Other notes

- BuildKit ships a built-in Dockerfile frontend, but an external image is recommended so all users share the same version and get fixes automatically.
- `docker/dockerfile:1` is recommended; BuildKit checks for syntax updates on each build. With a pinned version (`1.2` / `1.2.1`) the Dockerfile must be updated manually; old Dockerfiles stay compatible with new builders.
- Labs stable features follow semantic versioning, but early access features do not and newer releases may not be backwards compatible; pin the version.
- Development builds are in the `docker/dockerfile-upstream` Docker Hub repository.

## Related

- [BuildKit](./buildkit.md)
- [Build variables](./build-variables.md)

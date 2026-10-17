---
source: https://docs.docker.com/reference/cli/docker/compose/build/
---

# docker compose build

Build or rebuild services.

## Signature / Usage

```console
$ docker compose build [OPTIONS] [SERVICE...]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--build-arg` |  | Set build-time variables for services |
| `--builder` |  | Set builder to use |
| `--check` |  | Check build configuration |
| `-m`, `--memory` |  | Set memory limit for the build container. Not supported by BuildKit. |
| `--no-cache` |  | Do not use cache when building the image |
| `--print` |  | Print equivalent bake file |
| `--provenance` |  | Add a provenance attestation |
| `--pull` |  | Always attempt to pull a newer version of the image |
| `--push` |  | Push service images |
| `-q`, `--quiet` |  | Suppress the build output |
| `--sbom` |  | Add a SBOM attestation |
| `--ssh` |  | Set SSH authentications used when building service images. (use 'default' for using your default SSH Agent) |
| `--with-dependencies` |  | Also build dependencies (transitively) |

## Notes

- Services are built once and then tagged, by default as `project-service`.
- If the Compose file specifies an `image` name, the image is tagged with that name, substituting any variables beforehand.
- After changing a service's `Dockerfile` or the contents of its build directory, run `docker compose build` to rebuild it.
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose up](./compose-up.md)
- [docker compose push](./compose-push.md)
- [docker compose config](./compose-config.md)

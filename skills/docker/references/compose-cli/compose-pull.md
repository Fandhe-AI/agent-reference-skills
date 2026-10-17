---
source: https://docs.docker.com/reference/cli/docker/compose/pull/
---

# docker compose pull

Pull service images. Pulls an image associated with a service defined in a `compose.yaml` file, but does not start containers.

## Signature / Usage

```console
$ docker compose pull [OPTIONS] [SERVICE...]
$ docker compose pull db
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--ignore-buildable` |  | Ignore images that can be built |
| `--ignore-pull-failures` |  | Pull what it can and ignores images with pull failures |
| `--include-deps` |  | Also pull services declared as dependencies |
| `--policy` |  | Apply pull policy ("missing"\|"always") |
| `-q`, `--quiet` |  | Pull without printing progress information |

## Notes

- Given a `compose.yaml` with `db: image: postgres`, `docker compose pull db` pulls the postgres image.
- `pull` also tries to pull images for services with a `build` section; if the pull fails, it reports that the image must be built. Skip with `--ignore-buildable`.
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose push](./compose-push.md)
- [docker compose build](./compose-build.md)

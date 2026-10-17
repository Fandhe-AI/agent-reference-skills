---
source: https://docs.docker.com/reference/cli/docker/compose/push/
---

# docker compose push

Push service images. Pushes images for services to their respective registry/repository.

## Signature / Usage

```console
$ docker compose push [OPTIONS] [SERVICE...]
```

```yaml
services:
  service1:
    build: .
    image: localhost:5000/yourimage  ## goes to local registry

  service2:
    build: .
    image: your-dockerid/yourimage  ## goes to your repository on Docker Hub
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--ignore-push-failures` |  | Push what it can and ignores images with push failures |
| `--include-deps` |  | Also push images of services declared as dependencies |
| `-q`, `--quiet` |  | Push without printing progress information |

## Notes

- Assumes you are pushing an image you have built locally and that you have access to the build key.
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose build](./compose-build.md)
- [docker compose pull](./compose-pull.md)
- [docker compose publish](./compose-publish.md)

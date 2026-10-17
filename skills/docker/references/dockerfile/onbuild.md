---
source: https://docs.docker.com/reference/dockerfile/#onbuild
---

# ONBUILD

Adds to the image a trigger instruction to be executed when the image is used as the base for another build.

## Signature / Usage

```dockerfile
ONBUILD <INSTRUCTION>
```

```dockerfile
ONBUILD ADD . /app/src
ONBUILD RUN /usr/local/bin/python-build --dir /app/src
```

## Notes

- The trigger runs in the context of the downstream build, as if inserted immediately after the `FROM` instruction in the downstream Dockerfile. Useful for base images such as an application build environment or a daemon customized with user-specific configuration.
- How it works: (1) on encountering `ONBUILD`, the builder adds a trigger to the image metadata; it doesn't otherwise affect the current build. (2) At the end of the build, the list of triggers is stored in the image manifest under the key `OnBuild` (inspect with `docker inspect`). (3) When the image is used in a downstream `FROM`, the builder executes the triggers in the order they were registered; if any trigger fails, `FROM` aborts and the build fails. (4) Triggers are cleared from the final image after being executed (not inherited by "grand-children" builds).
- As of Dockerfile syntax 1.11, `ONBUILD` can be used with instructions that copy or mount files from other stages, images, or build contexts:

  ```dockerfile
  # syntax=docker/dockerfile:1.11
  FROM alpine AS baseimage
  ONBUILD COPY --from=build /usr/bin/app /app
  ONBUILD RUN --mount=from=config,target=/opt/appconfig ...
  ```

  If the `from` source is a build stage, the stage must be defined in the Dockerfile where `ONBUILD` gets triggered. If it's a named context, it must be passed to the downstream build.
- Limitations: chaining `ONBUILD ONBUILD` isn't allowed; `ONBUILD` may not trigger `FROM` or `MAINTAINER`.

## Related

- [from.md](./from.md)
- [copy.md](./copy.md)
- [run-mount.md](./run-mount.md)

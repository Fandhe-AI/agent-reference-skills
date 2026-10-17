---
source: https://docs.docker.com/reference/compose-file/version-and-name/
---

# Version and name top-level elements

The top-level `version` property is obsolete; the top-level `name` property sets the project name.

## Signature / Usage

```yml
name: myapp

services:
  foo:
    image: busybox
    command: echo "I'm running ${COMPOSE_PROJECT_NAME}"
```

## Notes

- `version` (obsolete): defined by the Compose Specification for backward compatibility. It is only informative and you receive a warning message that it is obsolete if used.
- Compose always uses the most recent schema to validate the Compose file, regardless of the `version` field. If some fields are unknown (typically because the file was written with fields defined by a newer version of the Specification), you receive a warning message.
- `name`: the project name to be used if you don't set one explicitly. Compose sets a default project name if the top-level `name` element is not set.
- Whenever a project name is defined by top-level `name` or by some custom mechanism, it is exposed for interpolation and environment variable resolution as `COMPOSE_PROJECT_NAME`.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [Interpolation](./interpolation.md)
- [Legacy versions](./legacy-versions.md)
- [Compose file reference](./overview.md)

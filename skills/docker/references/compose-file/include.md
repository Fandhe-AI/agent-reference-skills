---
source: https://docs.docker.com/reference/compose-file/include/
---

# Use include to modularize Compose files

The `include` top-level section defines a dependency on another Compose application, or sub-domain, so Compose configurations can be reused and modularized.

## Signature / Usage

Short syntax (paths only):

```yaml
include:
  - ../commons/compose.yaml
  - ../another_domain/compose.yaml

services:
  webapp:
    depends_on:
      - included-service # defined by another_domain
```

Long syntax:

```yaml
include:
   - path: ../commons/compose.yaml
     project_directory: ..
     env_file: ../another/.env
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `path` | string or list | Required. Location of the Compose file(s) to include. A list means multiple files are merged together to define the model for the included application. |
| `project_directory` | string | Base path to resolve relative paths in the Compose file. Defaults to the directory of the included Compose file. |
| `env_file` | string or list | Environment file(s) defining default values when interpolating variables in the Compose file being parsed. Defaults to the `.env` file in `project_directory`. A list is merged to define a project environment. |

```yaml
include:
   - path:
       - ../commons/compose.yaml
       - ./commons-override.yaml
```

```yaml
include:
   - path: ../another/compose.yaml
     env_file:
       - ../another/.env
       - ../another/dev.env
```

## Notes

- Each path is loaded as an individual Compose application model with its own project directory. Resource definitions are then copied into the current model. Compose warns if resource names conflict and doesn't try to merge them. `include` is evaluated after the selected Compose file(s) have been parsed and merged, so conflicts between files are detected.
- `include` applies recursively: an included file that declares its own `include` triggers those files to be included too.
- Resources from included files (volumes, networks, services) can be used for cross-service references in the current model.
- Interpolated variables are supported with `include`; specify mandatory variables (e.g. `${INCLUDE_PATH:?FOO}`).
- Short syntax: the file is loaded with the parent folder as the project directory, and an optional `.env` file defines default variable values. The local project's environment can override those values. Relative paths in an included file are resolved relative to that file, not the local project's directory.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [Merge Compose files](./merge.md)
- [Interpolation](./interpolation.md)

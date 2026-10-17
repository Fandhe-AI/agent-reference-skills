---
source: https://docs.docker.com/reference/compose-file/develop/
---

# Compose Develop Specification

Develop lets Compose focus on the local-machine development use-case, with development hooks to improve the "inner loop". It is an optional part of the Compose Specification, available with Docker Compose 2.22.0 and later.

## Signature / Usage

```yaml
services:
  frontend:
    image: example/webapp
    build: ./webapp
    develop:
      watch: 
        # sync static content
        - path: ./webapp/html
          action: sync
          target: /var/www
          ignore:
            - node_modules/

  backend:
    image: example/backend
    build: ./backend
    develop:
      watch: 
        # rebuild image and recreate service
        - path: ./backend/src
          action: rebuild
```

## Options / Props

`develop.watch` is a sequence; each item is a rule controlling automatic service updates based on local file changes.

| Name | Description |
| --- | --- |
| `path` | Path to source code (relative to the project directory) to monitor. Updates to any file inside the path that doesn't match an `ignore` rule trigger the configured action. |
| `action` | Action on change: `rebuild`, `restart` (Compose 2.32.0+), `sync`, `sync+restart` (Compose 2.23.0+), `sync+exec` (Compose 2.32.0+). |
| `target` | Applies when `action` is `sync`: changed files within `path` are synchronized with the container's filesystem. |
| `exec` | Only relevant when `action` is `sync+exec`; see below. |
| `ignore` | Patterns for paths to ignore. Same syntax as `.dockerignore`. |
| `include` | Pattern or list of patterns for paths considered for watching; same syntax as `ignore`. |
| `initial_sync` | With `sync+x` actions, if containers already exist, checks that files from `path` are in sync within the containers at the start of a watch session. |

`action` values:

- `rebuild`: rebuilds the service image based on the `build` section and recreates the service.
- `restart`: restarts the service container.
- `sync`: keeps the container(s) running but synchronizes source files according to `target`.
- `sync+restart`: synchronizes files according to `target`, then restarts the container.
- `sync+exec`: synchronizes files according to `target`, then executes a command inside the container.

`exec` fields: `command` (required; shell or exec form), `user`, `privileged`, `working_dir`, `environment` (as for service lifecycle hooks).

```yaml
services:
  frontend:
    image: ...
    develop:
      watch: 
        # sync content then run command to reload service without interruption
        - path: ./etc/config
          action: sync+exec
          target: /etc/config/
          exec:
            command: app reload
```

`include` example:

```yaml
services:
  backend:
    image: example/backend
    develop:
      watch: 
        # rebuild image and recreate service
        - path: ./src
          include: "*.go"  
          action: rebuild
```

## Notes

- `ignore` syntax: `*` matches 0 or more characters in a filename, `?` a single character, `*/*` two nested folders with arbitrary names, `**` an arbitrary number of nested folders. If the build context includes a `.dockerignore`, its patterns are loaded as implicit content for the ignore list, and values set in the Compose model are appended.
- `include` patterns that start with `*` must be wrapped in quotes, since `*` has special meaning in YAML (alias node).
- Only a subset of services may require a `develop` subsection.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [services: depends_on / healthcheck / restart / lifecycle hooks](./services-lifecycle.md)
- [Compose Build Specification](./build.md)

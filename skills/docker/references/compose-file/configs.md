---
source: https://docs.docker.com/reference/compose-file/configs/
---

# Configs top-level element

Configs let services adapt their behaviour without rebuilding a Docker image. Like volumes, they are mounted as files into a container's filesystem.

## Signature / Usage

```yml
configs:
  http_config:
    file: ./httpd.conf
```

`<project_name>_http_config` is created when the application is deployed, by registering the content of `httpd.conf` as the configuration data.

## Options / Props

The source of the config is either `file`, `environment`, `content`, or `external`.

| Name | Description |
| --- | --- |
| `file` | The config is created with the contents of the file at the specified path. |
| `environment` | The config content is created with the value of an environment variable. Introduced in Docker Compose 2.23.1. |
| `content` | The content is created with the inlined value. Introduced in Docker Compose 2.23.1. |
| `external` | If `true`, the config has already been created. Compose does not attempt to create it and errors if it does not exist. |
| `name` | The name of the config object in the container engine to look up; used as is and **not** scoped with the project name. |

External config with a distinct lookup key (the actual key is set at deployment time by interpolation, but exposed to containers as hard-coded ID `http_config`):

```yml
configs:
  http_config:
    external: true
    name: "${HTTP_CONFIG_KEY}"
```

Inline `content` (Compose infers variables when creating the config):

```yml
configs:
  app_config:
    content: |
      debug=${DEBUG}
      spring.application.admin.enabled=${DEBUG}
      spring.application.name=${COMPOSE_PROJECT_NAME}
```

`environment` source (useful for simple values that don't require interpolation):

```yml
configs:
  simple_config:
    environment: "SIMPLE_CONFIG_VALUE"
```

## Notes

- Services can only access configs when explicitly granted by a `configs` attribute within the `services` element.
- By default a config is owned by the user running the container command (overridable by service configuration) and has world-readable permissions (mode 0444). The mount point defaults to `/<config-name>` in Linux containers and `C:\<config-name>` in Windows containers.
- If `external` is `true`, all other attributes apart from `name` are irrelevant; Compose rejects the file if it detects any other attribute.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [services: volumes / tmpfs / configs / secrets](./services-storage.md)
- [Secrets top-level element](./secrets.md)
- [Interpolation](./interpolation.md)

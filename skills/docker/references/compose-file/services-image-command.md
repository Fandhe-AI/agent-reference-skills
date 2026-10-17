---
source: https://docs.docker.com/reference/compose-file/services/
---

# services: image / build / command / identity attributes

A service is an abstract definition of a computing resource within an application which can be scaled or replaced independently from other components. A Compose file must declare a `services` top-level element as a map whose keys are service names and whose values are service definitions.

## Signature / Usage

Simple example:

```yaml
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"

  db:
    image: postgres:18
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?required}
      POSTGRES_USER: example
      POSTGRES_DB: exampledb
```

Advanced example (the `backend` service builds from the `backend` directory at stage `builder`):

```yaml
services:
  proxy:
    image: nginx
    volumes:
      - type: bind
        source: ./proxy/nginx.conf
        target: /etc/nginx/conf.d/default.conf
        read_only: true
    ports:
      - 80:80
    depends_on:
      - backend

  backend:
    build:
      context: backend
      target: builder
```

## Notes

- The official example omits POSTGRES_PASSWORD; it is added here (from a required variable) because the postgres image refuses to initialize without it.

### `image`

Specifies the image to start the container from. Must follow the Open Container Specification addressable image format, `[<registry>/][<project>/]<image>[:<tag>|@<digest>]`.

```yml
    image: redis
    image: redis:5
    image: redis@sha256:0ed5d5928d4737458944eb604cc8509e245c3e19d02ad83935398bc4b991aac7
    image: library/redis
    image: docker.io/library/redis
    image: my_private.registry:5000/redis
```

If the image does not exist on the platform, Compose attempts to pull it based on `pull_policy`. `image` may be omitted as long as a `build` section is declared. Without the Compose Build Specification, Compose won't work if `image` is missing.

### `build`

Specifies the build configuration for creating a container image from source, as defined in the Compose Build Specification (see [build.md](./build.md)).

### `platform`

Defines the target platform the containers for the service run on, using `os[/arch[/variant]]` syntax. Values must conform to the OCI Image Spec convention. Compose uses it to determine which image version is pulled and/or on which platform the build is performed.

```yml
platform: darwin
platform: windows/amd64
platform: linux/arm64/v8
```

### `pull_policy`

Defines the decisions Compose makes when it starts to pull images. Possible values:

| Value | Behavior |
| --- | --- |
| `always` | Always pulls the image from the registry. |
| `never` | Doesn't pull; relies on the platform cached image. If there is no cached image, a failure is reported. |
| `missing` | Pulls only if not available in the platform cache. Default if you are not also using the Compose Build Specification. `if_not_present` is an alias for backward compatibility. The `latest` tag is always pulled even when `missing` is used. |
| `build` | Builds the image; rebuilds it if already present. |
| `daily` | Checks the registry for updates if the last pull took place more than 24 hours ago. |
| `weekly` | Checks the registry for updates if the last pull took place more than 7 days ago. |
| `every_<duration>` | Checks the registry if the last pull took place before `<duration>`. Duration in weeks (`w`), days (`d`), hours (`h`), minutes (`m`), seconds (`s`) or a combination. |

```yaml
services:
  test:
    image: nginx
    pull_policy: every_12h
```

### `command`

Overrides the default command declared by the container image, for example by Dockerfile's `CMD`.

```yaml
command: bundle exec thin -p 3000
```

- If the value is `null`, the default command from the image is used.
- If the value is `[]` (empty list) or `''` (empty string), the default command declared by the image is ignored (overridden to be empty).
- The value can also be a list, similar to the exec-form syntax of the Dockerfile.
- Unlike the `CMD` instruction in a Dockerfile, `command` doesn't automatically run within the context of the `SHELL` instruction defined in the image. If your command relies on shell-specific features such as environment variable expansion, run it explicitly within a shell:

```yaml
command: /bin/sh -c 'echo "hello $$HOSTNAME"'
```

### `entrypoint`

Declares the default entrypoint for the service container. Overrides the `ENTRYPOINT` instruction from the service's Dockerfile. If `entrypoint` is non-null, Compose ignores any default command from the image (for example `CMD`). See also `command`.

```yml
entrypoint: /code/entrypoint.sh
```

```yml
entrypoint:
  - php
  - -d
  - zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20100525/xdebug.so
  - -d
  - memory_limit=-1
  - vendor/bin/phpunit
```

If the value is `null`, the default entrypoint from the image is used. If the value is `[]` or `''`, the default entrypoint declared by the image is ignored (overridden to be empty).

### `working_dir`

Overrides the container's working directory which is specified by the image, for example Dockerfile's `WORKDIR`.

### `user`

Overrides the user used to run the container process. The default is set by the image, for example Dockerfile `USER`. If it's not set, then `root`.

### `container_name`

A string that specifies a custom container name, rather than a name generated by default.

```yml
container_name: my-web-container
```

Compose does not scale a service beyond one container if the Compose file specifies a `container_name`; attempting to do so results in an error. `container_name` follows the regex format `[a-zA-Z0-9][a-zA-Z0-9_.-]+`.

### `hostname`

Declares a custom host name to use for the service container. Must be a valid RFC 1123 hostname.

### `domainname`

Declares a custom domain name to use for the service container. Must be a valid RFC 1123 hostname.

### `labels`

Adds metadata to containers, as an array or a map. Reverse-DNS notation is recommended.

```yml
labels:
  com.example.description: "Accounting webapp"
  com.example.department: "Finance"
  com.example.label-with-empty-value: ""
```

```yml
labels:
  - "com.example.description=Accounting webapp"
  - "com.example.department=Finance"
  - "com.example.label-with-empty-value"
```

Compose creates containers with canonical labels: `com.docker.compose.project` (set on all resources created by Compose to the user project name) and `com.docker.compose.service` (set on service containers with the service name). The `com.docker.compose` label prefix is reserved; specifying labels with this prefix results in a runtime error.

### `label_file`

Loads labels for a service from an external file or a list of files. The file uses a key-value format similar to `env_file`. With multiple files, the value from the last file in the list overrides earlier ones. If a label is defined in both `label_file` and `labels`, the value in `labels` takes precedence.

```yaml
services:
  one:
    label_file: ./app.labels

  two:
    label_file:
      - ./app.labels
      - ./additional.labels
```

### `annotations`

Defines annotations for the container, as an array or a map.

```yml
annotations:
  com.example.foo: bar
```

```yml
annotations:
  - com.example.foo=bar
```

### `profiles`

Defines a list of named profiles for the service to be enabled under. If unassigned, the service is always started; if assigned, it is only started if the profile is activated. Follows the regex format `[a-zA-Z0-9][a-zA-Z0-9_.-]+`.

```yaml
services:
  frontend:
    image: frontend
    profiles: ["frontend"]

  phpmyadmin:
    image: phpmyadmin
    depends_on:
      - db
    profiles:
      - debug
```

### `scale`

Specifies the default number of containers to deploy for this service. When both are set, `scale` must be consistent with the `replicas` attribute in the Deploy Specification (see [deploy.md](./deploy.md)).

### `provider`

Defines a service that Compose won't manage directly; Compose delegates the service lifecycle to a dedicated or third-party component.

```yaml
  database:
    provider:
      type: awesomecloud
      options:
        type: mysql
        foo: bar
  app:
    image: myapp
    depends_on:
       - database
```

- `type` (required): the external component used by Compose to manage setup and tear down lifecycle events.
- `options`: specific to the selected provider and not validated by the Compose specification.
- The dependent service `app` receives additional environment variables prefixed by the service name (for illustration, if `awesomecloud` produced `URL` and `API_KEY`, `app` runs with `DATABASE_URL` and `DATABASE_API_KEY`).

### `models`

Defines which AI models the service should use at runtime. Each referenced model must be defined under the `models` top-level element (see [models.md](./models.md)).

```yaml
services:
  short_syntax:
    image: app
    models:
      - my_model
  long_syntax:
    image: app
    models:
      my_model:
        endpoint_var: MODEL_URL
        model_var: MODEL
```

When a service is linked to a model, Compose injects environment variables to pass connection details and model identifiers to the container. Long syntax: `endpoint_var` sets the name of the environment variable that holds the model runner's URL; `model_var` sets the one that holds the model identifier. If either is omitted, Compose generates names from the model key: convert to uppercase, replace `-` with `_`, append `_URL` for the endpoint variable.

### `extends`

Shares common configurations among different files or projects. The value must be a mapping with a required `service` and an optional `file` key.

```yaml
extends:
  file: common.yml
  service: webapp
```

- `service`: the name of the service being referenced as a base.
- `file`: the location of a Compose configuration file defining that service. If not present, another service in the same Compose file is referenced. A relative path is relative to the main Compose file.
- Compose returns an error if the service or the file is not found, or on circular references. `extends` is not supported when deploying with `docker stack deploy`.
- Referenced resources (`volumes`, `networks`, `configs`, `secrets`, `links`, `volumes_from`, `depends_on`, or `service:{name}` in `ipc` / `pid` / `network_mode`) are not automatically imported; declare them explicitly in the model that relies on `extends`.

Merge rules between the main and referenced definitions:

- Mappings: keys in the main definition override the referenced one; other keys are included as is. Treated as mappings: `annotations`, `build.args`, `build.labels`, `build.extra_hosts`, `deploy.labels`, `deploy.update_config`, `deploy.rollback_config`, `deploy.restart_policy`, `deploy.resources.limits`, `environment`, `healthcheck`, `labels`, `logging.options`, `sysctls`, `storage_opt`, `extra_hosts`, `ulimits`. Items under `blkio_config.device_read_bps`, `blkio_config.device_read_iops`, `blkio_config.device_write_bps`, `blkio_config.device_write_iops`, `devices` and `volumes` are also treated as mappings keyed by the target path inside the container. The main `healthcheck` mapping cannot specify `disable: true` unless the referenced one also does.
- Sequences: items are combined, referenced items first, main items after; duplicates are removed. Sequences: `cap_add`, `cap_drop`, `configs`, `deploy.placement.constraints`, `deploy.placement.preferences`, `deploy.reservations.generic_resources`, `device_cgroup_rules`, `expose`, `external_links`, `ports`, `secrets`, `security_opt`. With list syntax, `dns`, `dns_search`, `env_file`, `tmpfs` are also sequences, but duplicates are not removed.
- Scalars: keys in the main definition take precedence. Any other allowed key is a scalar.

```yaml
services:
  common:
    image: busybox
    environment:
      TZ: utc
      PORT: 80
  cli:
    extends:
      service: common
    environment:
      PORT: 8080
```

Produces for `cli`:

```yaml
environment:
  PORT: 8080
  TZ: utc
image: busybox
```

### `deploy`

Specifies the configuration for the deployment and lifecycle of services (see [deploy.md](./deploy.md)).

### `develop`

Specifies the development configuration for maintaining a container in sync with source (see [develop.md](./develop.md)).

### Other notes

- Each service may include a `build` section; if not used, it is ignored and the Compose file is still valid. Build support is an optional aspect of the Compose Specification.
- The `deploy` section is also optional; if not implemented it is ignored and the Compose file is still valid.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [Compose Build Specification](./build.md)
- [Compose Deploy Specification](./deploy.md)
- [Compose Develop Specification](./develop.md)
- [Models](./models.md)
- [Profiles](./profiles.md)
- [services: depends_on / healthcheck / restart / lifecycle hooks](./services-lifecycle.md)

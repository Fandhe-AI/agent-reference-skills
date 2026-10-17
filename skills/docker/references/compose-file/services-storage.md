---
source: https://docs.docker.com/reference/compose-file/services/#volumes
---

# services: volumes / tmpfs / configs / secrets

Mounts, configs, secrets, and storage options for service containers.

## Signature / Usage

```yml
services:
  backend:
    image: example/backend
    volumes:
      - type: volume
        source: db-data
        target: /data
        volume:
          nocopy: true
          subpath: sub
      - type: bind
        source: /var/run/postgres/postgres.sock
        target: /var/run/postgres/postgres.sock

volumes:
  db-data:
```

## Notes

### `volumes`

Defines host paths or named volumes accessible by service containers. Mount types: `volume`, `bind`, `tmpfs`, or `npipe`. A host path used by a single service can be declared in the service definition; to reuse a volume across services, declare a named volume in the `volumes` top-level element.

Short syntax: `VOLUME:CONTAINER_PATH` or `VOLUME:CONTAINER_PATH:ACCESS_MODE`.

- `VOLUME`: a host path on the platform hosting containers (bind mount) or a volume name.
- `CONTAINER_PATH`: the path in the container where the volume is mounted.
- `ACCESS_MODE`: comma-separated options: `rw` (default), `ro`, `z` (SELinux: bind mount content shared among containers), `Z` (SELinux: private and unshared).
- The SELinux re-labeling bind mount option is ignored on platforms without SELinux.
- Relative host paths are only supported by Compose deployments to a local container runtime; they are resolved from the Compose file's parent directory. Relative paths should always begin with `.` or `..` to avoid ambiguity with named volumes.
- For bind mounts, short syntax creates a directory at the source path on the host if it doesn't exist (backward compatibility with `docker-compose` legacy). Prevent it with long syntax and `create_host_path: false`.

Long syntax fields:

| Field | Description |
| --- | --- |
| `type` | Mount type: `volume`, `bind`, `tmpfs`, `image`, `npipe`, or `cluster`. |
| `source` | Host path for a bind mount, a Docker image reference for an image mount, or the name of a volume defined in the top-level `volumes` key. Not applicable for tmpfs. |
| `target` | Path in the container where the volume is mounted. |
| `read_only` | Flag to set the volume as read-only. |
| `bind` | `propagation` (propagation mode), `create_host_path` (creates a directory at the source path on host if nothing is present; default `true`), `selinux` (`z` shared or `Z` private). |
| `volume` | `nocopy` (disable copying data from a container when a volume is created), `subpath` (path inside a volume to mount instead of the volume root; the subdirectory must already exist in the volume). |
| `tmpfs` | `size` (bytes, numeric or bytes unit), `mode` (Unix permission bits as octal; introduced in Docker Compose 2.14.0). |
| `image` | `subpath` (path inside the source image to mount instead of the image root; available in Docker Compose 2.35.0). |
| `consistency` | Consistency requirements of the mount; values are platform specific. |

`volume.subpath` requires the subdirectory to already exist in the volume before it is mounted (see https://docs.docker.com/engine/storage/volumes/ , `volume-subpath`). With a freshly created empty volume such as `db-data` in the example above, mounting `sub` fails unless it is created first, and `nocopy: true` additionally disables copying image content into the new volume.

### `volumes_from`

Mounts all volumes from another service or container. Optionally `ro` or `rw` (default read-write). Use the `container:` prefix for containers not managed by Compose.

```yaml
volumes_from:
  - service_name
  - service_name:ro
  - container:container_name
  - container:container_name:rw
```

### `tmpfs`

Mounts a temporary file system inside the container. A single value or a list.

```yml
tmpfs:
 - <path>
 - <path>:<options>
```

- `path`: the path inside the container where the tmpfs is mounted.
- `options`: comma-separated list; available options `mode` (file system permissions), `uid`, `gid`.

```yml
services:
  app:
    tmpfs:
      - /data:mode=755,uid=1009,gid=1009
      - /run
```

### `configs`

Lets services adapt their behaviour without rebuilding a Docker image. Services only access configs when explicitly granted by the `configs` attribute. Compose reports an error if the config doesn't exist on the platform or isn't defined in the `configs` top-level element. Short and long syntax can be mixed.

Short syntax specifies only the config name and mounts it as a file at `/<config_name>` in Linux containers (`C:\<config-name>` in Windows containers).

```yml
services:
  redis:
    image: redis:latest
    configs:
      - my_config
      - my_other_config
configs:
  my_config:
    file: ./my_config.txt
  my_other_config:
    external: true
```

Long syntax fields: `source` (name of the config on the platform), `target` (path and name of the mounted file; defaults to `/<source>`), `uid` and `gid` (numeric owner), `mode` (octal permissions; default world-readable `0444`; writable bit ignored; executable bit may be set).

When a config's source is a `file`, Docker Compose mounts it with a bind mount (as with file-sourced secrets above), so `uid`, `gid`, and `mode` are not applied and the file keeps the host file's ownership and permissions; the official configs section does not state this explicitly.

```yml
services:
  redis:
    image: redis:latest
    configs:
      - source: my_config
        target: /redis_config
        uid: "103"
        gid: "103"
        mode: 0440
configs:
  my_config:
    external: true
  my_other_config:
    external: true
```

### `secrets`

Grants access to sensitive data defined by the `secrets` top-level element, per service. Compose reports an error if the secret doesn't exist on the platform or isn't defined at top level. Defining a secret at top level does not grant any service access; the grant must be explicit in the service.

Short syntax specifies only the secret name and mounts it read-only at `/run/secrets/<secret_name>`.

```yml
services:
  frontend:
    image: example/webapp
    secrets:
      - server-certificate
secrets:
  server-certificate:
    file: ./server.cert
```

Long syntax fields: `source` (name of the secret on the platform), `target` (file name in `/run/secrets/`, or an absolute path; defaults to `source`), `uid` and `gid`, `mode` (octal; default `0444`; writable bit ignored; executable bit may be set).

`uid`, `gid`, and `mode` are only implemented in Docker Compose when the secret source is `environment`. When the source is a `file`, Compose uses a bind mount which doesn't allow `uid` remapping, and these attributes are silently ignored.

```yml
services:
  frontend:
    image: example/webapp
    secrets:
      - source: my-token
        uid: "103"
        gid: "103"
        mode: 0o440
secrets:
  my-token:
    environment: "MY_TOKEN"
```

### `storage_opt`

Defines storage driver options for a service.

```yml
storage_opt:
  size: '1G'
```

### `driver_opts`

A list of options as key-value pairs to pass to the driver. Options are driver-dependent (the official page shows it under a network entry of a service).

```yml
services:
  app:
    networks:
      app_net:
        driver_opts:
          com.docker.network.bridge.host_binding_ipv4: "127.0.0.1"
```

### `shm_size`

Size of the shared memory (`/dev/shm` on Linux) allowed by the service container, specified as a byte value.

### `read_only`

Creates the service container with a read-only filesystem.

### Other notes

- Compose can create file shares for bind mounts using Synchronized file shares in Docker Desktop (paid subscription; requires enabling **Access experimental features** and **Manage Synchronized file shares with Compose**).
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [Volumes top-level element](./volumes.md)
- [Configs top-level element](./configs.md)
- [Secrets top-level element](./secrets.md)

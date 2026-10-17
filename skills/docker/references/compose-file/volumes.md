---
source: https://docs.docker.com/reference/compose-file/volumes/
---

# Define and manage volumes in Docker Compose

Volumes are persistent data stores implemented by the container engine. The top-level `volumes` declaration configures named volumes that can be reused across multiple services.

## Signature / Usage

```yml
services:
  backend:
    image: example/database
    volumes:
      - db-data:/etc/data

  backup:
    image: backup-service
    volumes:
      - db-data:/var/lib/backup/data

volumes:
  db-data:
```

`db-data` is mounted at `/etc/data` (backend) and `/var/lib/backup/data` (backup). Running `docker compose up` creates the volume if it doesn't exist; otherwise the existing volume is used and is recreated if manually deleted outside Compose.

## Options / Props

An entry under top-level `volumes` can be empty, in which case it uses the container engine's default configuration for creating a volume.

| Name | Type | Description |
| --- | --- | --- |
| `driver` | string | Volume driver. If not available, Compose returns an error and doesn't deploy the application. |
| `driver_opts` | map | Driver-dependent key-value options passed to the driver. |
| `external` | boolean | If `true`, the volume already exists and its lifecycle is managed outside the application. Compose doesn't create it and errors if missing. All other attributes apart from `name` are irrelevant; any other attribute makes the file invalid. |
| `labels` | array or map | Metadata; reverse-DNS notation recommended. Compose sets `com.docker.compose.project` and `com.docker.compose.volume` labels. |
| `name` | string | Custom name; used as is and not scoped with the stack name. |

NFS-style `driver_opts`:

```yml
volumes:
  example:
    driver_opts:
      type: "nfs"
      o: "addr=10.40.0.199,nolock,soft,rw"
      device: ":/docker/example"
```

Named bind mount (use the `local` driver with `driver_opts`; the `type`, `o`, and `device` keys are passed to the local driver):

```yaml
volumes:
  app-data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /srv/app-data # must be the absolute host path and already exist
```

`external` with an actual name:

```yml
volumes:
  db-data:
    external: true
    name: actual-name-of-volume
```

Without `name`, `external: true` makes Compose look for an existing volume called `db-data` instead of creating `{project_name}_db-data`.

`name` as a parameter (with `DATABASE_VOLUME=my_volume_001` in `.env`, `docker compose up` uses the volume `my_volume_001`):

```yml
volumes:
  db-data:
    name: ${DATABASE_VOLUME}
```

## Notes

- Labels defined here apply to named volumes only. They are stored on the volume resource and visible via `docker volume inspect`; they do not apply to bind mounts and do not change mount semantics.
- To use a volume across multiple services, each service must be granted access with the `volumes` attribute in the `services` element.
- Compose can use Synchronized file shares in Docker Desktop for bind mounts (paid subscription; requires the **Access experimental features** and **Manage Synchronized file shares with Compose** settings).
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [services: volumes / tmpfs / configs / secrets](./services-storage.md)
- [Networks top-level element](./networks.md)

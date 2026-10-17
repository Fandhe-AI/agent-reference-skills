---
source: https://docs.docker.com/compose/how-tos/oci-artifact/
---

# Package and deploy Docker Compose applications as OCI artifacts

Publish a Compose application to a registry with `docker compose publish` and run it from the `oci://` reference.

```console
$ docker login
$ docker compose publish username/my-compose-app:latest
$ docker compose -f compose-base.yml -f compose-production.yml publish username/my-compose-app:latest
$ docker compose publish -y username/my-compose-app:latest
$ docker compose -f oci://docker.io/username/my-compose-app:latest up
```

Consume it from another Compose file:

```yaml
include:
  - oci://docker.io/username/my-compose-app:latest # use a Compose file stored as an OCI artifact
services:
  serviceA:
    build: .
    depends_on:
      - serviceB 
```

## Notes

- Publish options: `--oci-version`, `--resolve-image-digests` (pin tags to digests), `--with-env` (include environment variables). Compose scans for sensitive data and asks for confirmation unless `-y` / `--yes` is given.
- Cannot publish a configuration with bind mounts, with services that have only a `build` section, or with `include` of local files (publish those files too and include them remotely).
- Running an artifact prompts you to confirm interpolation variables, environment variables, and remote includes before starting.

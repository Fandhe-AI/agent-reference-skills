---
source: https://docs.docker.com/reference/cli/docker/logout/
---

# docker logout

Log out from a registry. If no server is specified, credentials for Docker Hub are removed.

## Signature / Usage

```console
$ docker logout [SERVER]
```

```console
$ docker logout localhost:8080
```

## Notes

- The official docs say "If no server is specified, the default is defined by the daemon." In the current CLI, omitting `SERVER` always targets Docker Hub (the same default as `docker login`).
- To log out from a private registry, pass `SERVER` explicitly (e.g. `localhost:8080`).

## Related

- [docker login](./login.md)

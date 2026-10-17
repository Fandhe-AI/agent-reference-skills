---
source: https://docs.docker.com/engine/network/links/
---

# Legacy container links

The `--link` feature lets containers on the default `bridge` network discover each other and share connection information via environment variables and `/etc/hosts`. It is legacy and deprecated.

## Signature / Usage

```console
$ docker run -d --name db training/postgres
$ docker run -d -P --name web --link db:db training/webapp python app.py
```

Flag forms: `--link <name or id>:alias` or `--link <name or id>` (alias defaults to the name).

## Options / Props

Environment variables created in the recipient container (alias `<ALIAS>` upper-cased, e.g. `db` gives `DB_`):

| Variable | Description |
| --- | --- |
| `<alias>_NAME` | Name of the link, e.g. `WEBDB_NAME=/web/webdb`. |
| `<alias>_PORT` | URL of the source container's first (lowest-numbered) exposed port; tcp preferred if both. |
| `<name>_PORT_<port>_<protocol>` | URL per exposed port. |
| `<prefix>_ADDR` | IP address, e.g. `WEBDB_PORT_5432_TCP_ADDR=172.17.0.82`. |
| `<prefix>_PORT` | Port number, e.g. `WEBDB_PORT_5432_TCP_PORT=5432`. |
| `<prefix>_PROTO` | Protocol, e.g. `WEBDB_PORT_5432_TCP_PROTO=tcp`. |
| `<alias>_ENV_<name>` | Each Docker-originated environment variable of the source (`ENV` in Dockerfile, `-e`, `--env`, `--env-file`). |

## Notes

- Deprecation: links on the default `bridge` network are deprecated and scheduled for removal in Docker Engine 30.0. Since Engine 29.6 Docker emits a deprecation warning when creating a container with these links. Links on non-default networks remain supported. Use user-defined networks instead of `--link` whenever possible.
- Legacy-link environment variables were deprecated in Engine 28.4, are disabled by default in Engine 29.0, and are scheduled for removal in 30.0. In 29.x set `DOCKER_KEEP_DEPRECATED_LEGACY_LINKS_ENV_VARS=1` in the `dockerd` process environment and restart the daemon to re-enable them temporarily.
- Publishing a port with `-p` / `-P` is not container linking; it exposes a container port on the host (e.g. `-p 8000-9000:5000`, `-p 127.0.0.1:80:5000`, `-p 127.0.0.1::5000`, `/udp` or `/sctp` suffix; `docker port <container> 5000` shows bindings).
- Linking relies on container names (`--name`); names must be unique (use `docker container rm` or `--rm` to reuse a name).
- A link creates a conduit without exposing the source container's ports externally. Inspect with `docker inspect -f "{{ .HostConfig.Links }}" web` (e.g. `[/db:/web/db]`).
- Environment variables from all Docker-originated variables are available to any linking container; this has security implications if sensitive data is stored in them. Env var IP addresses are not updated when the source restarts and are only set for the first process (some daemons such as `sshd` scrub them).
- `/etc/hosts` in the recipient gets entries for the alias, the linked container's name and its hostname, and is updated automatically when the source container restarts.

## Related

- [Bridge network driver](./driver-bridge.md)
- [Port publishing and mapping](./port-publishing.md)
- [Networking overview](./networking-overview.md)

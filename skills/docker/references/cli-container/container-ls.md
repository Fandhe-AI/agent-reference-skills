---
source: https://docs.docker.com/reference/cli/docker/container/ls/
---

# docker container ls

List containers. Aliases: `docker container list`, `docker container ps`, `docker ps`.

## Signature / Usage

```console
$ docker container ls [OPTIONS]
$ docker ps -a
$ docker ps --filter status=running
$ docker ps --format "table {{.ID}}\t{{.Labels}}"
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-a`, `--all` |  | Show all containers (default shows just running) |
| `-f`, `--filter` |  | Filter output based on conditions provided |
| `--format` |  | Format output using a custom template: `table` (default, with column headers); `table TEMPLATE`; `json`; `TEMPLATE` (Go template). See https://docs.docker.com/go/formatting/ |
| `-n`, `--last` | `-1` | Show n last created containers (includes all states) |
| `-l`, `--latest` |  | Show the latest created container (includes all states) |
| `--no-trunc` |  | Don't truncate output |
| `-q`, `--quiet` |  | Only display container IDs |
| `-s`, `--size` |  | Display total file sizes |

## Notes

- Only running containers are shown by default. `docker ps` groups exposed ports into a single range if possible (TCP ports 100, 101, 102 display as `100-102/tcp`).
- `--size` shows two sizes: "size" is data on disk used for the container's writable layer; "virtual size" is the total disk space used for the read-only image data plus the writable layer.
- `--filter` is a `key=value` pair; pass multiple flags for multiple filters (`--filter "foo=bar" --filter "bif=baz"`).

Supported filters:

| Filter | Description |
| --- | --- |
| `id` | Container's ID |
| `name` | Container's name (matches all or part of the name) |
| `label` | `<key>` or `<key>=<value>` |
| `exited` | Integer exit code. Only useful with `--all` |
| `status` | One of `created`, `restarting`, `running`, `removing`, `paused`, `exited`, or `dead` |
| `ancestor` | Containers sharing a given image as ancestor: `<image-name>[:<tag>]`, `<image id>`, or `<image@digest>` (no tag means `latest`) |
| `before` or `since` | Containers created before or after a given container ID or name |
| `volume` | Running containers which mounted a given volume or bind mount |
| `network` | Running containers connected to a given network (name or ID) |
| `publish` or `expose` | Containers which publish or expose a given port: `<port>[/<proto>]` or `<startport-endport>/[<proto>]` (default protocol `tcp`) |
| `health` | `starting`, `healthy`, `unhealthy` or `none` |
| `isolation` | Windows daemon only. `default`, `process`, or `hyperv` |
| `is-task` | Containers that are a "task" for a service. Boolean |

- Exit status `137` (`docker ps -a --filter 'exited=137'`) results from: the container's `init` process killed manually, `docker kill`, or a Docker daemon restart which kills all running containers.
- `dead` containers cannot be (re)started, only removed.

Valid `--format` placeholders:

| Placeholder | Description |
| --- | --- |
| `.ID` | Container ID |
| `.Image` | Image ID |
| `.Command` | Quoted command |
| `.CreatedAt` | Time when the container was created |
| `.RunningFor` | Elapsed time since the container was started |
| `.Ports` | Exposed ports |
| `.State` | Container status (for example "created", "running", "exited") |
| `.Status` | Container status with details about duration and health-status |
| `.HealthStatus` | Health status ("starting", "healthy", "unhealthy"; empty when unavailable) |
| `.Size` | Container disk size |
| `.Names` | Container names |
| `.Labels` | All labels assigned to the container |
| `.Label` | Value of a specific label, e.g. `'{{.Label "com.docker.swarm.cpu"}}'` |
| `.Mounts` | Names of the volumes mounted in this container |
| `.Networks` | Names of the networks attached to this container |

- With `--format` the output is exactly as the template declares, or includes column headers when using the `table` directive.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container inspect](./container-inspect.md)
- [docker container prune](./container-prune.md)

---
source: https://docs.docker.com/engine/manage-resources/labels/
---

# Docker object labels

Labels apply key-value metadata (strings) to Docker objects: images, containers, local daemons, volumes, networks, Swarm nodes and Swarm services.

## Signature / Usage

```dockerfile
LABEL com.example.version="1.0"
LABEL com.example.description="Web application"
```

```console
$ docker build --label "com.example.version=1.0" -t myapp .
$ docker run --label "com.example.env=prod" myapp
$ docker volume create --label "com.example.purpose=database" myvolume
$ docker network create --label "com.example.purpose=frontend" mynetwork
```

Inspect and filter:

```console
$ docker inspect --format='{{json .Config.Labels}}' myapp
$ docker image ls --filter "label=com.example.version"
$ docker container ls --filter "label=com.example.env=prod"
$ docker volume ls --filter "label=com.example.purpose"
$ docker network ls --filter "label=com.example.purpose"
```

Daemon labels (`daemon.json`, or `dockerd --label`; view with `docker system info`):

```json
{
  "labels": ["com.example.environment=production"]
}
```

## Options / Props

Key format recommendations:

| Guideline | Detail |
| --- | --- |
| Reverse DNS prefix | Third-party tool authors should prefix keys with a domain they own, e.g. `com.example.some-label`; don't use a domain without owner permission. |
| Reserved namespaces | `com.docker.*`, `io.docker.*`, `org.dockerproject.*` are reserved by Docker. |
| Characters | Begin and end with a lower-case letter; only lower-case alphanumerics, `.` and `-`; no consecutive periods or hyphens. |
| Un-namespaced keys | Reserved for CLI use (shorter typing-friendly strings). |

## Notes

- Keys must be unique within an object; the most recently written value overwrites earlier ones. The guidelines aren't currently enforced.
- Values can be any data serializable to a string (JSON, XML, CSV, YAML). Docker doesn't deserialize values, so you can't query nested structures by label value without third-party tooling.
- Labels on images, containers, local daemons, volumes and networks are static for the object's lifetime (recreate to change). Labels on Swarm nodes and services can be updated dynamically.

## Related

- [Filter commands](./cli-filter.md)
- [LABEL](../dockerfile/label.md)

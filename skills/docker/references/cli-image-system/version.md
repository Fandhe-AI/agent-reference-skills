---
source: https://docs.docker.com/reference/cli/docker/version/
---

# docker version

Show the Docker version information for all independently versioned Docker components (Client and Server sections).

## Signature / Usage

```console
$ docker version [OPTIONS]
```

```console
$ docker version --format '{{.Server.Version}}'
$ docker version --format '{{.Client.APIVersion}}'
$ docker version --format '{{json .}}'
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--format` |  | Format output using a custom template: `json` prints JSON; `TEMPLATE` prints using the given Go template. See https://docs.docker.com/go/formatting/ |

## Notes

- `docker version` prints the versions of all components; the `--version` flag (`docker --version`) prints only the Docker CLI version.
- The `Client` section covers the Docker CLI and client components; the `Server` section covers the Docker Engine and components such as containerd and runc (output differs by install, e.g. Docker Desktop).
- API version negotiation: the CLI and Engine select the highest API version supported by both (e.g. connecting to Engine 27.5 downgrades to API 1.47).
- `DOCKER_API_VERSION` overrides the API version and disables negotiation (useful for debugging); unsetting it re-enables negotiation.
- Output example from the source:

```console
$ docker version

Client: Docker Engine - Community
 Version:           28.5.1
 API version:       1.51
 Go version:        go1.24.8
 Git commit:        e180ab8
 Built:             Wed Oct  8 12:16:17 2025
 OS/Arch:           darwin/arm64
 Context:           remote-test-server
```

## Related

- [docker system info](./system-info.md)
- [docker](./docker.md)

---
source: https://docs.docker.com/reference/cli/docker/
---

# docker

The base command for the Docker CLI: global options, environment variables, `config.json` properties, and the daemon host (`-H`) schemes.

## Signature / Usage

```console
$ docker run --help

Usage: docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

Create and run a new container from an image
```

Depending on the system configuration each `docker` command may need `sudo`; an administrator can create a Unix group called `docker` and add users to it.

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--config` | `~/.docker` | Location of client config files |
| `-c`, `--context` |  | Name of the context to use to connect to the daemon (overrides DOCKER_HOST env var and default context set with `docker context use`) |
| `-D`, `--debug` |  | Enable debug mode |
| `-H`, `--host` |  | Daemon socket to connect to |
| `-l`, `--log-level` | `info` | Set the logging level (`debug`, `info`, `warn`, `error`, `fatal`) |
| `--tls` |  | Use TLS; implied by --tlsverify |
| `--tlscacert` | `~/.docker/ca.pem` | Trust certs signed only by this CA |
| `--tlscert` | `~/.docker/cert.pem` | Path to TLS certificate file |
| `--tlskey` | `~/.docker/key.pem` | Path to TLS key file |
| `--tlsverify` |  | Use TLS and verify the remote |

## Notes

The official generated options table shows `/root/.docker` because it was rendered as root; the actual default is the `.docker` directory in the invoking user's `$HOME`, overridable with `DOCKER_CONFIG` or `--config` (the flag wins).

### Environment variables

| Variable | Description |
| --- | --- |
| `DOCKER_API_VERSION` | Override the negotiated API version to use for debugging (e.g. `1.19`) |
| `DOCKER_CERT_PATH` | Location of your authentication keys. Used both by the `docker` CLI and the `dockerd` daemon |
| `DOCKER_CONFIG` | The location of your client configuration files. |
| `DOCKER_CONTEXT` | Name of the `docker context` to use (overrides `DOCKER_HOST` env var and default context set with `docker context use`) |
| `DOCKER_CUSTOM_HEADERS` | (Experimental) Configure custom HTTP headers sent by the client, as a comma-separated list of `name=value` pairs. Equivalent to the `HttpHeaders` field in the configuration file. |
| `DOCKER_DEFAULT_PLATFORM` | Default platform for commands that take the `--platform` flag. |
| `DOCKER_HIDE_LEGACY_COMMANDS` | When set, hides "legacy" top-level commands (such as `docker rm`, and `docker pull`) in `docker help` output, and only `Management commands` per object-type are printed. May become the default in a future release. |
| `DOCKER_HOST` | Daemon socket to connect to. |
| `DOCKER_TLS` | Enable TLS for connections made by the `docker` CLI (equivalent of `--tls`). Set to a non-empty value to enable TLS. TLS is enabled automatically if any of the other TLS options are set. |
| `DOCKER_TLS_VERIFY` | When set Docker uses TLS and verifies the remote. Used both by the `docker` CLI and the `dockerd` daemon |
| `BUILDKIT_PROGRESS` | Set type of progress output (`auto`, `plain`, `tty`, `rawjson`) when building with the BuildKit backend. Use plain to show container output (default `auto`). |
| `NO_COLOR` | Disable any ANSI escape codes in the output in accordance with https://no-color.org/ |

Go runtime variables also apply: `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY`.

### Daemon host (-H, --host)

| Scheme | Description | Example |
| --- | --- | --- |
| `unix://[<path>]` | Unix socket | `unix:///var/run/docker.sock` |
| `tcp://[<IP or host>[:port]]` | TCP connection | `tcp://174.17.0.1:2376` |
| `ssh://[username@]<IP or host>[:port]` | SSH connection | `ssh://user@192.168.64.5` |
| `npipe://[<name>]` | Named pipe (Windows only) | `npipe:////./pipe/docker_engine` |

```console
$ docker -H tcp://174.17.0.1:2376 ps
$ docker -H ssh://user@192.168.64.5 ps
$ docker -H ssh://user@192.168.64.5/var/run/docker.sock ps
```

Default sockets without `-H` or a custom context: `unix:///var/run/docker.sock` on macOS and Linux, `npipe:////./pipe/docker_engine` on Windows. By convention the daemon uses port `2376` for TLS and `2375` for non-TLS connections.

### Configuration file (config.json)

Stored in `~/.docker/config.json` by default; change the directory with `DOCKER_CONFIG` or `--config` (the flag wins). Command line options override environment variables, which override `config.json` properties.

```console
$ docker --config ~/testconfigs/ ps
```

```json
{
  "HttpHeaders": {
    "MyHeader": "MyValue"
  },
  "psFormat": "table {{.ID}}\\t{{.Image}}\\t{{.Command}}\\t{{.Labels}}",
  "imagesFormat": "table {{.ID}}\\t{{.Repository}}\\t{{.Tag}}\\t{{.CreatedAt}}",
  "statsFormat": "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}",
  "detachKeys": "ctrl-e,e",
  "credsStore": "secretservice",
  "credHelpers": {
    "awesomereg.example.org": "hip-star",
    "unicorn.example.com": "vcbait"
  },
  "plugins": {
    "plugin1": {
      "option": "value"
    }
  },
  "proxies": {
    "default": {
      "httpProxy":  "http://user:pass@example.com:3128",
      "httpsProxy": "https://my-proxy.example.com:3129",
      "noProxy":    "intra.mycorp.example.com",
      "ftpProxy":   "http://user:pass@example.com:3128",
      "allProxy":   "socks://example.com:1234"
    }
  }
}
```

Default output format properties (used when no `--format` is given): `configFormat`, `imagesFormat`, `networksFormat`, `nodesFormat`, `pluginsFormat`, `psFormat`, `secretFormat`, `serviceInspectFormat`, `servicesFormat`, `statsFormat`, `tasksFormat`, `volumesFormat`.

| Property | Description |
| --- | --- |
| `HttpHeaders` | Headers included in all messages from the client to the daemon. Docker does not interpret them and does not allow them to change headers it sets itself. |
| `credsStore` | External binary `docker-credential-<value>` used as the default credential store; otherwise credentials go in `auths`. |
| `credHelpers` | Per-registry credential helpers, preferred over `credsStore` and `auths`. |
| `proxies` | Proxy env vars set automatically on containers and as `--build-arg` for `docker build`. `"default"` or per daemon host; keys `httpProxy`, `httpsProxy`, `ftpProxy`, `noProxy`, `allProxy`. |
| `detachKeys` | Default key sequence to detach from containers (default `CTRL-p CTRL-q`); comma-separated letters `[a-Z]` or `ctrl-` plus `a-z`, `@`, `[`, `\\`, `_`, `^`. Override per command with `--detach-keys`. |
| `plugins` | Per-CLI-plugin settings; key is the plugin name. |

### Other notes

- Option types: boolean flags take the form `-d=false`; a bare boolean flag sets `true`. Options defaulting to `true` (e.g. `docker build --rm=true`) can only be changed with an explicit `=false`. Single-character options can be combined (`docker run -it`). Multi-value options such as `-a` and `-v` can be repeated. Do not combine `-t` and `-a stderr`: in `pty` mode all `stderr` goes to `stdout`.
- `proxies` settings apply to containers only, not to the `docker` CLI or `dockerd`. Proxy values are stored as plain text in the container configuration and can be inspected through the remote API or committed with `docker commit`.
- The `~/.docker` directory and `config.json` may contain sensitive information (proxy authentication, registry credentials depending on the credential store); do not commit them to version control.
- Experimental CLI features are enabled by default since Docker 20.10. `DOCKER_CUSTOM_HEADERS` is available in v27.1 and higher and is experimental.
- Subcommands such as `docker swarm`, `docker service`, `docker stack`, `docker node`, `docker mcp`, `docker model`, `docker scout`, `docker desktop` are listed on the official page but are outside this skill's scope.

## Related

- [docker login](./login.md)
- [docker version](./version.md)
- [docker system info](./system-info.md)

---
source: https://docs.docker.com/reference/cli/docker/buildx/history/trace/
---

# docker buildx history trace

View the OpenTelemetry trace for a completed build. Loads the trace into a Jaeger UI viewer and opens it in your browser, to analyze build performance, step timing, and internal execution flows.

## Signature / Usage

```console
$ docker buildx history trace [OPTIONS] [REF]
$ docker buildx history trace ^1
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--addr` | `127.0.0.1:0` | Address to bind the UI server |
| `--compare` | | Compare with another build record |

## Notes

- Starts a temporary Jaeger UI server and opens the default browser. `REF` is a build ID or relative offset; default is the most recent build.
- `--compare` with a single reference compares that build against the most recent one.

### Examples

```console
docker buildx history trace qu2gsuo8ejqrwdfii23xkkckt --addr 127.0.0.1:16686
docker buildx history trace --compare=qu2gsuo8ejqrwdfii23xkkckt qsiifiuf1ad9pa9qvppc0z1l3
docker buildx history trace --compare=^1
```

## Related

- [docker buildx history inspect](./buildx-history-inspect.md)
- [docker buildx history logs](./buildx-history-logs.md)

---
source: https://docs.docker.com/build/builders/drivers/remote/
---

# Remote driver

Connects Buildx to an externally managed BuildKit daemon, for workloads that need manual BuildKit management or where a BuildKit daemon is exposed from another source.

## Signature / Usage

```console
$ docker buildx create \
  --name remote \
  --driver remote \
  tcp://localhost:1234
```

## Options / Props

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | String | | Sets the TLS client key. |
| `cert` | String | | Absolute path to the TLS client certificate to present to `buildkitd`. |
| `cacert` | String | | Absolute path to the TLS certificate authority used for validation. |
| `servername` | String | Endpoint hostname. | TLS server name used in requests. |
| `default-load` | Boolean | `false` | Automatically load images to the Docker Engine image store. |

## Notes

### Examples

Unix socket:

```console
$ sudo ./buildkitd --group $(id -gn) --addr unix://$HOME/buildkitd.sock
$ docker buildx create \
  --name remote-unix \
  --driver remote \
  unix://$HOME/buildkitd.sock
$ docker buildx build --builder=remote-unix -t test --load .
```

BuildKit in a Docker container (with TLS; certificates in `.certs/` generated via the BuildKit `create-certs` bake definition):

```console
$ docker run -d --rm \
  --name=remote-buildkitd \
  --privileged \
  -p 1234:1234 \
  -v $PWD/.certs:/etc/buildkit/certs \
  moby/buildkit:latest \
  --addr tcp://0.0.0.0:1234 \
  --tlscacert /etc/buildkit/certs/daemon/ca.pem \
  --tlscert /etc/buildkit/certs/daemon/cert.pem \
  --tlskey /etc/buildkit/certs/daemon/key.pem

$ docker buildx create \
  --name remote-container \
  --driver remote \
  --driver-opt cacert=${PWD}/.certs/client/ca.pem,cert=${PWD}/.certs/client/cert.pem,key=${PWD}/.certs/client/key.pem,servername=<TLS_SERVER_NAME> \
  tcp://localhost:1234
```

Or use the `docker-container://` URL scheme (no port needed):

```console
$ docker buildx create \
  --name remote-container \
  --driver remote \
  docker-container://remote-buildkitd
```

BuildKit in Kubernetes (service `buildkitd`):

```console
$ docker buildx create \
  --name remote-kubernetes \
  --driver remote \
  --driver-opt cacert=${PWD}/.certs/client/ca.pem,cert=${PWD}/.certs/client/cert.pem,key=${PWD}/.certs/client/key.pem \
  tcp://buildkitd.default.svc:1234
```

Debug a remote builder with the `kube-pod://` URL scheme (connects to a single pod) or `kubectl port-forward`:

```console
$ docker buildx create \
  --name remote-container \
  --driver remote \
  kube-pod://buildkitd-XXXXXXXXXX-xxxxx
$ kubectl port-forward svc/buildkitd 1234:1234
```

### Other notes

- Exposing BuildKit over TCP without TLS is possible but not recommended: it allows arbitrary access to BuildKit without credentials.
- Use `--load` to load the build result into the Docker daemon.
- The Kubernetes example only works inside the cluster (`ClusterIP` service). Remote access needs an ingress (out of scope of the guide).
- The official page's `docker-container://` example writes `docker-container://remote-container`, but the URL must contain the container name (`remote-buildkitd`, set with `--name` in the `docker run` above), not the builder name; this reference uses the container name.
- Switch the default with `docker buildx use remote-unix`, or per build with `--builder`.

## Related

- [Build drivers](./drivers.md)
- [Kubernetes driver](./driver-kubernetes.md)
- [BuildKit configuration](./buildkit-configure.md)

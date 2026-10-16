---
source: https://docs.docker.com/build/buildkit/configure/
---

# Configure BuildKit

For `docker-container` or `kubernetes` builders, apply a custom BuildKit configuration by passing `--buildkitd-config` to `docker buildx create`.

## Signature / Usage

```console
$ docker buildx create --use --bootstrap \
  --name mybuilder \
  --driver docker-container \
  --buildkitd-config /etc/buildkitd.toml
```

## Notes

### Registry mirror

```toml
debug = true
[registry."docker.io"]
  mirrors = ["mirror.gcr.io"]
```

`debug = true` turns on debug requests in the daemon, which logs a message showing when a mirror is used. Check with `docker logs buildx_buildkit_mybuilder0`.

### Registry certificates

The daemon copies certificate files into the container under `/etc/buildkit/certs`.

```toml
# /etc/buildkitd.toml
debug = true
[registry."myregistry.com"]
  ca=["/etc/certs/myregistry.pem"]
  [[registry."myregistry.com".keypair]]
    key="/etc/certs/myregistry_key.pem"
    cert="/etc/certs/myregistry_cert.pem"
```

Inside the builder the paths become `/etc/buildkit/certs/myregistry.com/...` (inspect with `docker exec -it buildx_buildkit_mybuilder0 cat /etc/buildkit/buildkitd.toml`).

### CNI networking

Useful for network port contention during concurrent builds.

Built-in bridge provider (`buildkit0` bridge, default subnet `10.10.0.0/16`, cleaned up on daemon shutdown):

```console
$ docker buildx create --use --bootstrap \
  --name mybuilder \
  --driver docker-container \
  --buildkitd-flags "--oci-worker-net=bridge"
```

Custom CNI configuration: build a custom BuildKit image with your own CNI config and plugins, then:

```console
$ docker buildx create --use --bootstrap \
  --name mybuilder \
  --driver docker-container \
  --driver-opt "image=buildkit-cni:local" \
  --buildkitd-flags "--oci-worker-net=cni"
```

```dockerfile
# syntax=docker/dockerfile:1

ARG BUILDKIT_VERSION=v0.32.0
ARG CNI_VERSION=v1.0.1

FROM --platform=$BUILDPLATFORM alpine AS cni-plugins
RUN apk add --no-cache curl
ARG CNI_VERSION
ARG TARGETOS
ARG TARGETARCH
WORKDIR /opt/cni/bin
RUN curl -Ls https://github.com/containernetworking/plugins/releases/download/$CNI_VERSION/cni-plugins-$TARGETOS-$TARGETARCH-$CNI_VERSION.tgz | tar xzv

FROM moby/buildkit:${BUILDKIT_VERSION}
ARG BUILDKIT_VERSION
RUN apk add --no-cache iptables
COPY --from=cni-plugins /opt/cni/bin /opt/cni/bin
ADD https://raw.githubusercontent.com/moby/buildkit/${BUILDKIT_VERSION}/hack/fixtures/cni.json /etc/buildkit/cni.json
```

### Resource limiting

Max parallelism (useful for low-powered machines):

```toml
# /etc/buildkitd.toml
[worker.oci]
  max-parallelism = 4
```

TCP connection limit: 4 simultaneous connections per registry for pulling and pushing images, plus one additional connection dedicated to metadata requests. This prevents builds getting stuck while pulling images.

## Related

- [buildkitd.toml](./buildkit-toml-configuration.md)
- [Docker container driver](./driver-docker-container.md)
- [BuildKit](./buildkit.md)

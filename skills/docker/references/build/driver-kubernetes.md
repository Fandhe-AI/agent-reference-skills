---
source: https://docs.docker.com/build/builders/drivers/kubernetes/
---

# Kubernetes driver

Connects local development or CI environments to BuildKit builders running as pods in a Kubernetes cluster, optionally on multiple native architectures.

## Signature / Usage

```console
$ docker buildx create \
  --bootstrap \
  --name=kube \
  --driver=kubernetes \
  --driver-opt=[key=value,...]
```

## Options / Props

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `image` | String | | Sets the image to use for running BuildKit. |
| `namespace` | String | Namespace in current Kubernetes context | Sets the Kubernetes namespace. |
| `default-load` | Boolean | `false` | Automatically load images to the Docker Engine image store. |
| `replicas` | Integer | 1 | Sets the number of Pod replicas to create. |
| `requests.cpu` | CPU units | | Request CPU value in Kubernetes CPU units, e.g. `requests.cpu=100m` or `requests.cpu=2`. |
| `requests.memory` | Memory size | | Request memory, e.g. `requests.memory=500Mi` or `requests.memory=4G`. |
| `requests.ephemeral-storage` | Storage size | | Request ephemeral-storage, e.g. `requests.ephemeral-storage=2Gi`. |
| `persistent-volume-claim.requests.storage` | Storage size | | Requested size for a persistent volume claim. When set, Buildx creates a `StatefulSet` and stores the BuildKit build cache in the claim, e.g. `20Gi`. |
| `limits.cpu` | CPU units | | Limit CPU value. |
| `limits.memory` | Memory size | | Limit memory value. |
| `limits.ephemeral-storage` | Storage size | | Limit ephemeral-storage value. |
| `buildkit-root-volume-memory` | Memory size | Using regular file system | Mounts `/var/lib/buildkit` on an `emptyDir` memory-backed volume, with `SizeLimit` as the value. |
| `nodeselector` | CSV string | | Sets the pod's `nodeSelector` label(s). |
| `annotations` | CSV string | | Sets additional annotations on the `Deployment` or `StatefulSet` and pods. |
| `labels` | CSV string | | Sets additional labels on the `Deployment` or `StatefulSet` and pods. |
| `tolerations` | CSV string | | Configures the pod's taint toleration. |
| `serviceaccount` | String | | Sets the pod's `serviceAccountName`. |
| `schedulername` | String | | Sets the scheduler responsible for scheduling the pod. |
| `timeout` | Time | `120s` | How long Buildx waits for pods to be provisioned before a build. |
| `rootless` | Boolean | `false` | Run the container as a non-root user. |
| `loadbalance` | String | `sticky` | Load-balancing strategy (`sticky` or `random`). `sticky` picks the pod using the hash of the context path. |
| `qemu.install` | Boolean | `false` | Install QEMU emulation for multi-platform support. |
| `qemu.image` | String | `tonistiigi/binfmt:latest` | Sets the QEMU emulation image. |

## Notes

### Scaling and storage

```console
$ docker buildx create \
  --bootstrap \
  --name=kube \
  --driver=kubernetes \
  --driver-opt=namespace=buildkit,replicas=4
```

With `persistent-volume-claim.requests.storage` and `replicas`, each replica gets its own persistent volume claim:

```console
$ docker buildx create \
  --bootstrap \
  --name=kube \
  --driver=kubernetes \
  --driver-opt=namespace=buildkit,replicas=4,persistent-volume-claim.requests.storage=20Gi
```

### Node assignment

- `nodeselector` is a comma-separated string of key-value pairs, e.g. `"nodeselector=kubernetes.io/arch=arm64"`.
- `tolerations` is a semicolon-separated list of taints, e.g. `"tolerations=key=foo,value=bar;key=foo2,operator=exists;key=foo3,effect=NoSchedule"`.
- CSV-delimited values must be wrapped in single quotes due to shell quoting; you can wrap all of `--driver-opt`:

```console
$ docker buildx create \
  --bootstrap \
  --name=kube \
  --driver=kubernetes \
  '--driver-opt="nodeselector=label1=value1,label2=value2","tolerations=key=key1,value=value1"'
```

### Multi-platform builds

QEMU (like `docker-container`; much slower, full-CPU emulation; use `qemu.install=true` for a custom BuildKit image or non-native binaries in builds):

```console
$ docker buildx build \
  --builder=kube \
  --platform=linux/amd64,linux/arm64 \
  -t <user>/<image> \
  --push .
```

Native: create the builder for one architecture, then add others with `--append`. A Buildx node is not the same concept as a Kubernetes node (it can connect multiple Kubernetes nodes of the same architecture).

```console
$ docker buildx create \
  --bootstrap \
  --name=kube \
  --driver=kubernetes \
  --platform=linux/amd64 \
  --node=builder-amd64 \
  --driver-opt=namespace=buildkit,nodeselector="kubernetes.io/arch=amd64"

$ docker buildx create \
  --append \
  --bootstrap \
  --name=kube \
  --driver=kubernetes \
  --platform=linux/arm64 \
  --node=builder-arm64 \
  --driver-opt=namespace=buildkit,nodeselector="kubernetes.io/arch=arm64"
```

### Rootless mode

```console
$ docker buildx create \
  --name=kube \
  --driver=kubernetes \
  --driver-opt=namespace=buildkit,rootless=true
```

Creates pods without `securityContext.privileged`. Requires Kubernetes 1.19 or later; Ubuntu as the host kernel is recommended.

### Other notes

- Always specify the namespace in driver options (e.g. `namespace=buildkit`). The driver creates resources in that namespace while keeping the driver configuration locally.
- `sticky` load balancing connects repeated builds to the same node for better local cache use; `random` spreads load evenly.

## Related

- [Build drivers](./drivers.md)
- [Remote driver](./driver-remote.md)
- [Multi-platform builds](./multi-platform.md)

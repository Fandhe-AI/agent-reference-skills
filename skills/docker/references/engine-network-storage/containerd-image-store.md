---
source: https://docs.docker.com/engine/storage/containerd/
---

# containerd image store with Docker Engine

The containerd image store is the default storage backend for Docker Engine 29.0 and later on fresh installations. It uses containerd snapshotters instead of classic storage drivers (graph drivers such as overlay2).

## Signature / Usage

`/etc/docker/daemon.json`, then restart the Docker daemon:

```json
{
  "features": {
    "containerd-snapshotter": true
  }
}
```

Verify:

```console
$ docker info -f '{{ .DriverStatus }}'
[[driver-type io.containerd.snapshotter.v1]]
```

## Options / Props

| Setting | Description |
| --- | --- |
| `features.containerd-snapshotter` | Enable the containerd image store (needed after upgrade from an earlier version). |
| `features.lazy-pull` | `false` disables lazy pulling; `true` enables it for a snapshotter outside the default list. |
| `features.containerd-migration` | Experimental automatic switch to the containerd image store. |
| `DOCKER_MIGRATE_SNAPSHOTTER_THRESHOLD` | Env var (e.g. `200M`, `1G`): daemon switches on restart if there are no containers and total image layer size is at or below it. |

```ini
[Service]
Environment="DOCKER_MIGRATE_SNAPSHOTTER_THRESHOLD=200M"
```

## Notes

- If you upgraded from an earlier version, the daemon keeps using legacy graph drivers (overlay2) until you enable the containerd image store.
- Not available with user namespace remapping (`userns-remap`; moby#47377).
- Enables: local multi-platform images, images with attestations (provenance, SBOM) that use image indices, Wasm containers, and pluggable snapshotters (lazy pulling with stargz; peer-to-peer distribution with nydus, dragonfly). Image mounts require it.
- Disk usage is higher than the legacy drivers: containerd stores layers both compressed and uncompressed. It uses a separate storage path from the Docker data directory; a custom Docker data directory isn't applied to containerd, so configure containerd's data directory separately to avoid filling the root partition. Prune with `docker image prune`, monitor with `docker system df`.
- Switching storage backends temporarily hides images and containers created with the other backend (the data stays on disk and reappears on switching back). To reuse images push them to a registry or use `docker save`. The default snapshotter is `overlayfs`.
- Lazy pulling is enabled by default for the `nydus`, `overlaybd`, `soci`, and `stargz` snapshotters; with others (including `overlayfs`) all layers are downloaded before start unless enabled. Lazily pulled images can run with missing layer content, but `docker save` can fail or produce an incomplete archive without reporting an error, and `docker push` can't upload missing layers (it can reuse them if the target registry supports mounting from the source repository). See moby#53878. Reload the daemon configuration to apply `lazy-pull` to subsequent pulls; re-pull to fetch missing content.
- Automatic migration is experimental; starting fresh is the recommended approach. Create backups before using it. The overlay2 data remains on disk but hidden.

- Adapted: sudo commands rephrased as prerequisites (restarting the daemon requires root).

## Related

- [Storage drivers](./storage-drivers.md)
- [Select a storage driver](./select-storage-driver.md)
- [Image mounts](./image-mounts.md)

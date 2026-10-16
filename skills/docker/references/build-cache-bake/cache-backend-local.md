---
source: https://docs.docker.com/build/cache/backends/local/
---

# Local cache

The `local` cache store keeps the cache as files in a directory on the filesystem, using an OCI image layout. Good for testing, or for self-managed shared storage.

## Signature / Usage

```console
$ docker buildx build --push -t <registry>/<image> \
  --cache-to type=local,dest=path/to/local/dir[,parameters...] \
  --cache-from type=local,src=path/to/local/dir .
```

## Options / Props

| Name | Option | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `src` | `cache-from` | String | | Path of the local directory where cache gets imported from. |
| `digest` | `cache-from` | String | | Digest of manifest to import, see cache versioning. |
| `tag` | `cache-to`, `cache-from` | String | `latest` | Tag of the cache manifest, see cache versioning. |
| `dest` | `cache-to` | String | | Path of the local directory where cache gets exported to. |
| `mode` | `cache-to` | `min`, `max` | `min` | Cache layers to export, see cache mode. |
| `oci-mediatypes` | `cache-to` | `true`, `false` | `true` | Use OCI media types in exported manifests. |
| `image-manifest` | `cache-to` | `true`, `false` | `true` | When using OCI media types, generate an image manifest instead of an image index for the cache image. |
| `compression` | `cache-to` | `gzip`, `estargz`, `zstd` | `gzip` | Compression type. |
| `compression-level` | `cache-to` | `0..22` | | Compression level. |
| `force-compression` | `cache-to` | `true`, `false` | `false` | Forcibly apply compression. |
| `ignore-error` | `cache-to` | Boolean | `false` | Ignore errors caused by failed cache exports. |
| `reset` | `cache-to` | `true`, `false` | `false` | Delete blobs that no tag references, see cache versioning. |

## Notes

- Works with the default `docker` driver only when the containerd image store is enabled; otherwise use a different driver.
- If the `src` cache doesn't exist, the cache import step fails but the build continues.
- Cache versioning: the directory uses an OCI image layout; `index.json` associates tags with cache manifests and `blobs` stores manifest and cache data. By default BuildKit exports/imports the tag `latest`. Use different tags to keep multiple caches in one directory; exporting with the same tag updates that tag to the new manifest.

```console
$ docker buildx build --cache-to type=local,dest=path/to/local/dir,tag=v1 .
$ docker buildx build --cache-from type=local,src=path/to/local/dir,tag=v1 .
```

- A digest identifies an exact cache manifest (reported in the build output). If both `digest` and `tag` are given, `digest` is used.

```console
$ docker buildx build \
  --cache-from type=local,src=path/to/local/dir,digest=sha256:<DIGEST> .
```

- Updating a tag doesn't delete blobs of the previous manifest (still available by digest), so the directory grows over time. Buildx 0.35.0 and later supports `reset=true` on export, which deletes blobs that no tag references (manifests no tag references are deleted and can no longer be imported by digest).

```console
$ docker buildx build --cache-to type=local,dest=path/to/local/dir,reset=true .
```

## Related

- [Cache storage backends](./cache-backends.md)

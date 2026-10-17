---
source: https://docs.docker.com/build/metadata/annotations/
---

# Annotations

Annotations attach descriptive metadata to OCI image components (manifests, indexes, descriptors), following the OCI image specification and its pre-defined annotation keys.

## Signature / Usage

```console
$ docker build --push --annotation "foo=bar" .
```

Bake:

```hcl
target "default" {
  output = ["type=registry"]
  annotations = ["foo=bar"]
}
```

Annotations can also be added when creating an image manifest or index with `docker buildx imagetools create` (only to an index or manifest descriptors).

## Notes

### Annotation level

By default annotations go on the image manifest. Prefix with a type to choose the level:

```console
$ docker build --annotation "<TYPE>:<KEY>=<VALUE>" .
```

- `manifest`: annotates manifests.
- `index`: annotates the root index.
- `manifest-descriptor`: annotates manifest descriptors in the index.
- `index-descriptor`: annotates the index descriptor in the image layout.

```console
$ docker build --tag <IMAGE> --push --annotation "index:foo=bar" .
$ docker build --tag <IMAGE> --push --annotation "index,manifest:foo=bar" .
$ docker build --tag <IMAGE> --push --annotation "manifest[linux/amd64]:foo=bar" .
```

Types are comma-separated for multiple levels; a platform qualifier in square brackets limits the annotation to matching OS/architecture components.

### Inspect annotations

```console
$ docker buildx imagetools inspect <IMAGE> --raw
$ docker buildx imagetools inspect <IMAGE>@sha256:<manifest digest> --raw
```

The first shows annotations on the image index and its descriptors; the second (with `<IMAGE>@<DIGEST>`) shows annotations on a manifest.

### Other notes

- Annotations describe OCI image components; labels describe Docker resources (images, containers, networks, volumes). Annotations are not attestations: attestations describe how an image was built and what it contains and are attached as a separate manifest on the image index; annotations attach to the image config as labels, or to the index or manifest as properties.
- The Docker Engine image store does not support loading images with annotations. Push directly to a registry with `--push` or the registry exporter.
- The build must produce the component you target, or it fails. `--output type=docker --annotation "index:foo=bar"` fails because the `docker` exporter produces no index; likewise `--provenance=false --annotation "index:foo=bar"` fails because Buildx creates a `docker` output by default in some circumstances such as when provenance attestations are disabled.

## Related

- [Image and registry exporters](./exporter-image-registry.md)
- [Build attestations](./attestations.md)

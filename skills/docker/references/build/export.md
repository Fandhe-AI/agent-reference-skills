---
source: https://docs.docker.com/build/building/export/
---

# Export binaries

Use `--output` (`-o`) to export build results as files instead of an image. A file path uses the `local` exporter; the default is the `docker` exporter (image loaded into the local image store).

## Signature / Usage

```dockerfile
# syntax=docker/dockerfile:1
FROM rust:alpine AS build
WORKDIR /src
COPY <<EOT hello.rs
fn main() {
    println!("Hello World!");
}
EOT
RUN rustc -o /bin/hello hello.rs

FROM scratch
COPY --from=build /bin/hello /
ENTRYPOINT ["/hello"]
```

```console
$ docker build --output=. .
```

Exports the contents of the final stage (the `scratch` image holding only the binary) to the host directory.

## Notes

### Multi-platform export

With `--platform`, the `local` exporter writes one subdirectory per platform:

```console
$ docker build --platform=linux/amd64,linux/arm64 --output=out .
$ tree out/
out/
├── linux_amd64
│   └── hello
└── linux_arm64
    └── hello
```

### Other notes

- Works well for Go, Rust, and other languages that compile to a single binary.
- The `COPY <<EOT` syntax is a here-document.
- Other exporters are covered in the exporters documentation.

## Related

- [Local and tar exporters](./exporter-local-tar.md)
- [Exporters overview](./exporters.md)
- [Multi-platform builds](./multi-platform.md)

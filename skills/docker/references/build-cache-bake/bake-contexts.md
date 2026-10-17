---
source: https://docs.docker.com/build/bake/contexts/
---

# Using Bake with additional contexts

Besides the main `context`, each target can define additional named contexts with a `contexts` map. These map to the `--build-context` flag of the build command and can be used in the Dockerfile with `FROM` or the `--from` flag.

## Signature / Usage

Pin an image:

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
RUN echo "Hello world"
```

```hcl
target "app" {
  contexts = {
    alpine = "docker-image://alpine:3.13"
  }
}
```

Secondary source directory:

```hcl
target "app" {
  contexts = {
    src = "../path/to/source"
  }
}
```

```dockerfile
FROM golang
COPY --from=src . .
```

Another target as a build context (`target:` prefix):

```hcl
target "base" {
  dockerfile = "baseapp.Dockerfile"
}

target "app" {
  contexts = {
    baseapp = "target:base"
  }
}
```

## Options / Props

Supported context values:

| Type | Example |
| --- | --- |
| Local filesystem directory | `../path/to/source` |
| Container image | `docker-image://alpine:3.13` |
| Git URL | `https://github.com/user/proj.git` |
| HTTP URL | `https://example.com/files` |
| Another Bake target | `target:base` |

## Notes

- With a local directory named context, `src` points to the client filesystem, not to a previous build stage.
- In most cases use a single multi-stage Dockerfile with multiple targets instead. Using another target as context is recommended only when multiple Dockerfiles can't be easily merged into one.

## Related

- [Bake file reference](./bake-file-reference.md)
- [Bake targets](./bake-targets.md)

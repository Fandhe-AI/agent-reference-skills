---
source: https://docs.docker.com/build/bake/introduction/
---

# Introduction to Bake

Bake is an abstraction for the `docker build` command that manages build configuration (CLI flags, environment variables, etc.) consistently for a team. It is built into the Buildx CLI, available as `docker buildx bake`.

## Signature / Usage

`docker build -f Dockerfile -t myapp:latest .` expressed in Bake:

```hcl
target "myapp" {
  context = "."
  dockerfile = "Dockerfile"
  tags = ["myapp:latest"]
}
```

```console
$ docker buildx bake myapp
```

A larger equivalence:

```console
$ docker build \
  -f Dockerfile \
  -t myapp:latest \
  --build-arg foo=bar \
  --no-cache \
  --platform linux/amd64,linux/arm64 \
  .
```

```hcl
target "myapp" {
  context = "."
  dockerfile = "Dockerfile"
  tags = ["myapp:latest"]
  args = {
    foo = "bar"
  }
  no-cache = true
  platforms = ["linux/amd64", "linux/arm64"]
}
```

## Notes

- Bake files can be written in HCL or JSON; Bake can also read Docker Compose files and translate each service to a build target. HCL is the most expressive and flexible format.
- Target properties closely resemble the `docker build` CLI flags.
- Tip from the page: the Docker DX extension for VS Code provides linting, code navigation and vulnerability scanning for Bake files.

## Related

- [Bake targets](./bake-targets.md)
- [Bake file reference](./bake-file-reference.md)

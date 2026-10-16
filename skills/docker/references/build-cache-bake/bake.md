---
source: https://docs.docker.com/build/bake/
---

# Bake

Bake is a feature of Docker Buildx that lets you define build configuration in a declarative file instead of a complex CLI expression, and run multiple builds concurrently with one invocation.

## Signature / Usage

A Bake file can be written in HCL or JSON; Bake can also build directly from a Docker Compose file.

```hcl
group "default" {
  targets = ["frontend", "backend"]
}

target "frontend" {
  context = "./frontend"
  dockerfile = "frontend.Dockerfile"
  args = {
    NODE_VERSION = "22"
  }
  tags = ["myapp/frontend:latest"]
}

target "backend" {
  context = "./backend"
  dockerfile = "backend.Dockerfile"
  args = {
    GO_VERSION = "1.26"
  }
  tags = ["myapp/backend:latest"]
}
```

```console
$ docker buildx bake
```

## Notes

- The `group` block defines a group of targets built concurrently; each `target` block defines a build with its own context, Dockerfile and tags. Running `docker buildx bake` executes the `default` group.

## Related

- [Introduction to Bake](./bake-introduction.md)
- [Bake file reference](./bake-file-reference.md)
- [Building with Bake from a Compose file](./bake-compose-file.md)

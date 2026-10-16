---
source: https://docs.docker.com/build/bake/targets/
---

# Bake targets

A target in a Bake file represents a build invocation and holds all the information you would normally pass to `docker build` using flags.

## Signature / Usage

```hcl
target "webapp" {
  dockerfile = "webapp.Dockerfile"
  tags = ["docker.io/username/webapp:latest"]
  context = "https://github.com/username/webapp"
}
```

```console
$ docker buildx bake webapp
$ docker buildx bake webapp api tests
```

Grouping targets:

```hcl
group "all" {
  targets = ["webapp", "api", "tests"]
}

target "tests" {
  dockerfile = "tests.Dockerfile"
  contexts = {
    webapp = "target:webapp"
    api = "target:api"
  }
  output = ["type=local,dest=build/tests"]
  context = "."
}
```

```console
$ docker buildx bake all
```

## Options / Props

Shell-style wildcard patterns for target or group names:

| Pattern | Matches |
| --- | --- |
| `*` | any sequence of characters |
| `?` | any single character |
| `[abc]` | any character in brackets |

```console
$ docker buildx bake "foo-*"
$ docker buildx bake "foo-?az"
$ docker buildx bake "[fb]oo-bar"
$ docker buildx bake "foo*" "tests"
```

## Notes

- With no target specified, Bake builds the target named `default`.
- The `dockerfile` path resolves relative to `context` when both are set (`context = "app"` with `dockerfile = "src/www/Dockerfile"` resolves to `app/src/www/Dockerfile`).
- Always wrap wildcard patterns in quotes; otherwise the shell expands them against files in the current directory, causing errors.
- For all target properties see the Bake file reference.

## Related

- [Bake file reference](./bake-file-reference.md)
- [Variables in Bake](./bake-variables.md)
- [Matrix targets](./bake-matrices.md)

---
source: https://docs.docker.com/build/bake/inheritance/
---

# Inheritance in Bake

Targets can inherit attributes from other targets using the `inherits` attribute.

## Signature / Usage

```hcl
target "app-dev" {
  args = {
    GO_VERSION = "1.26"
  }
  tags = ["docker.io/username/myapp:dev"]
  labels = {
    "org.opencontainers.image.source" = "https://github.com/username/myapp"
    "org.opencontainers.image.author" = "moby.whale@example.com"
  }
}

target "app-release" {
  inherits = ["app-dev"]
  tags = ["docker.io/username/myapp:latest"]
  platforms = ["linux/amd64", "linux/arm64"]
}
```

## Notes

- Common reusable targets: define a shared target (for example `_common` with `args = { GO_VERSION = "1.26", BUILDKIT_CONTEXT_KEEP_GIT_DIR = 1 }`) and inherit it from `lint`, `docs`, `test`, `binaries` targets via `inherits = ["_common"]`.
- A target can override any inherited attribute (for example its own `args`).
- `inherits` is a list; when several inherited targets conflict, the target that appears last in the list takes precedence. With `inherits = ["app-dev", "_common"]`, `BUILDKIT_CONTEXT_KEEP_GIT_DIR` resolves to `1` (from `_common`) rather than `0` (from `app-dev`).
- Reuse a single attribute from another target with dot notation:

```hcl
target "foo" {
  dockerfile = "foo.Dockerfile"
  tags       = ["myapp:latest"]
}
target "bar" {
  dockerfile = "bar.Dockerfile"
  tags       = target.foo.tags
}
```

## Related

- [Overriding configurations](./bake-overrides.md)
- [Bake file reference](./bake-file-reference.md)

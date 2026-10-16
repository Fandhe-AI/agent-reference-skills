---
source: https://docs.docker.com/build/bake/matrices/
---

# Matrix targets

A matrix strategy forks a single target into multiple variants based on parameters you specify, similar to GitHub Actions matrix strategies. It reduces duplication in a Bake definition.

## Signature / Usage

```hcl
target "app" {
  name = "app-${tgt}"
  matrix = {
    tgt = ["foo", "bar"]
  }
  target = tgt
}
```

This resolves `app` to `app-foo` and `app-bar`.

## Options / Props

| Attribute | Description |
| --- | --- |
| `matrix` | Map of parameter names to lists of values. Bake builds each combination as a separate target. |
| `name` | Name resolution for generated targets; each generated target must have a unique name. |

## Notes

- Multiple axes: several keys fork on multiple axes, building every combination.

```hcl
target "app" {
  name = "app-${tgt}-${replace(version, ".", "-")}"
  matrix = {
    tgt = ["foo", "bar"]
    version = ["1.0", "2.0"]
  }
  target = tgt
  args = {
    VERSION = version
  }
}
```

Builds `app-foo-1-0`, `app-foo-2-0`, `app-bar-1-0`, `app-bar-2-0`.

- Multiple values per matrix target: use maps as matrix values and access nested values with dot notation.

```hcl
target "app" {
  name = "app-${item.tgt}-${replace(item.version, ".", "-")}"
  matrix = {
    item = [
      { tgt = "foo", version = "1.0" },
      { tgt = "bar", version = "2.0" }
    ]
  }
  target = item.tgt
  args = {
    VERSION = item.version
  }
}
```

Builds `app-foo-1-0` and `app-bar-2-0`.

## Related

- [Bake targets](./bake-targets.md)
- [Bake file reference](./bake-file-reference.md)

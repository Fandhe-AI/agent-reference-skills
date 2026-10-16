---
source: https://docs.docker.com/build/bake/expressions/
---

# Expression evaluation in Bake

Bake files in HCL format support expression evaluation: arithmetic, conditional values, and more.

## Signature / Usage

Arithmetic:

```hcl
sum = 7*6

target "default" {
  args = {
    answer = sum
  }
}
```

Ternary operator with the built-in `notequal` function:

```hcl
variable "TAG" {}

target "default" {
  context="."
  dockerfile="Dockerfile"
  tags = [
    "my-image:latest",
    notequal("",TAG) ? "my-image:${TAG}": ""
  ]
}
```

Expressions with variables:

```hcl
variable "FOO" {
  default = 3
}

variable "IS_FOO" {
  default = true
}

target "app" {
  args = {
    v1 = FOO > 5 ? "higher" : "lower"
    v2 = IS_FOO ? "yes" : "no"
  }
}
```

## Notes

- `docker buildx bake --print` shows evaluated values (for the arithmetic example the `answer` build argument is `"42"`; with an empty `TAG` only `my-image:latest` remains; for `app`, `v1` is `"lower"` and `v2` is `"yes"`).

## Related

- [Variables in Bake](./bake-variables.md)
- [Functions](./bake-funcs.md)

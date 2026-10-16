---
source: https://docs.docker.com/build/bake/variables/
---

# Variables in Bake

Variables set attribute values, are interpolated into other values, take part in arithmetic, and can be overridden with environment variables.

## Signature / Usage

```hcl
variable "TAG" {
  default = "latest"
}

group "default" {
  targets = [ "webapp" ]
}

target "webapp" {
  context = "."
  dockerfile = "Dockerfile"
  tags = ["docker.io/username/webapp:${TAG}"]
}
```

```console
$ docker buildx bake --print
```

## Options / Props

Validation block (inside `variable`):

| Name | Description |
| --- | --- |
| `condition` | Expression that must evaluate to `true`; otherwise the build fails. |
| `error_message` | Message emitted when the condition is `false`. |

```hcl
variable "PORT" {
  default = 3000

  validation {
    condition = PORT >= 1024
    error_message = "The variable 'PORT' must be 1024 or greater."
  }
}
```

## Notes

- Use the `${}` syntax to interpolate a variable into a value; `--print` shows the resolved configuration.
- Values are coerced into the expected type before validation, so environment variable overrides work as expected.
- Multiple conditions: define multiple `validation` blocks; all must be `true`. Conditions may reference other variables (for example `condition = FOO != ""` inside variable `BAR`).
- Escape interpolation with double dollar signs, `$${VARIABLE}`:

```hcl
target "webapp" {
  dockerfile-inline = <<EOF
  FROM alpine
  ARG TARGETARCH
  RUN echo "Building for $${TARGETARCH/amd64/x64}"
  EOF
  platforms = ["linux/amd64", "linux/arm64"]
}
```

- With multiple files, one file can use variables defined in another (e.g. `vars.hcl` defines `BASE_IMAGE`, `docker-bake.hcl` defines `BASE_LATEST = "${BASE_IMAGE}:latest"`), run with `docker buildx bake -f vars.hcl -f docker-bake.hcl --print app`.
- Override `variable` values with environment variables; variables can be used in functions and expressions.

## Related

- [Expression evaluation in Bake](./bake-expressions.md)
- [Functions](./bake-funcs.md)
- [Overriding configurations](./bake-overrides.md)

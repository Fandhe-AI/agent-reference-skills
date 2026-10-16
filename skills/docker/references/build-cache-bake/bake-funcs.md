---
source: https://docs.docker.com/build/bake/funcs/
---

# Functions

HCL functions manipulate values in a build configuration in more complex ways than concatenation or interpolation.

## Signature / Usage

Standard library function (`add`):

```hcl
variable "TAG" {
  default = "latest"
}

group "default" {
  targets = ["webapp"]
}

target "webapp" {
  args = {
    buildno = "${add(123, 1)}"
  }
}
```

User-defined function:

```hcl
function "increment" {
  params = [number]
  result = number + 1
}

target "webapp" {
  args = {
    buildno = "${increment(123)}"
  }
}
```

Using a global variable inside a function:

```hcl
variable "REPO" {
  default = "user/repo"
}

function "tag" {
  params = [tag]
  result = ["${REPO}:${tag}"]
}

target "webapp" {
  tags = tag("v1")
}
```

## Notes

- Bake ships with built-in support for the standard library functions (see the standard library page).
- User-defined functions use the HCL `userfunc` extension, for when built-in functions don't meet your needs.
- Functions can reference global variables and standard library functions. `docker buildx bake --print webapp` shows `buildno` as `"124"` and tags as `["user/repo:v1"]` for the examples above.

## Related

- [Bake standard library functions](./bake-stdlib.md)
- [Variables in Bake](./bake-variables.md)

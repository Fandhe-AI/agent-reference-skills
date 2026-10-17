---
source: https://docs.docker.com/build/bake/overrides/
---

# Overriding configurations

Override Bake definitions per environment or target using file overrides, CLI overrides (`--set`), or environment variables.

## Signature / Usage

```console
$ docker buildx bake --set app.args.mybuildarg=bar --set app.platform=linux/arm64 app --print
$ docker buildx bake -f docker-bake.hcl -f overrides.hcl --print
$ export TAG=$(git rev-parse --short HEAD)
$ docker buildx bake --print webapp
```

## Options / Props

Attributes that can be overridden (also the complete list for `--set`):

| Attributes |
| --- |
| `args`, `attest`, `cache-from`, `cache-to`, `context`, `contexts`, `dockerfile`, `entitlements`, `labels`, `network`, `no-cache`, `output`, `platform`, `pull`, `secrets`, `ssh`, `tags`, `target` |

Default file lookup order when no `--file` / `-f` is given:

| # | File |
| --- | --- |
| 1 | `compose.yaml` |
| 2 | `compose.yml` |
| 3 | `docker-compose.yml` |
| 4 | `docker-compose.yaml` |
| 5 | `docker-bake.json` |
| 6 | `docker-bake.hcl` |
| 7 | `docker-bake.override.json` |
| 8 | `docker-bake.override.hcl` |

## Notes

- If more than one Bake file is found, all are loaded and merged in lookup order; duplicate attributes are merged or overridden by the last occurrence depending on the attribute. `docker-bake.override.hcl` is loaded last, so its `variable "TAG" { default = "bar" }` overrides `foo`.
- `--set` is repeatable. For array fields such as `tags`, repeat `--set` or use the `+=` operator to append without replacing. Array literal syntax like `--set target.tags=[a,b]` is not supported.
- `--set` supports Go `path.Match` patterns. Quote wildcard patterns so the shell does not expand them.

```console
$ docker buildx bake --set 'foo*.args.mybuildarg=value'
$ docker buildx bake --set '*.platform=linux/arm64'
$ docker buildx bake --set 'foo*.no-cache'
```

- Environment variables only override `variable` blocks: define the variable in the Bake file, then set an environment variable with the same name. Values are coerced into the variable's type first (e.g. `PORT=7070` with `add(PORT, 1)` yields `"7071"`).

## Related

- [Variables in Bake](./bake-variables.md)
- [Inheritance in Bake](./bake-inheritance.md)
- [Bake file reference](./bake-file-reference.md)

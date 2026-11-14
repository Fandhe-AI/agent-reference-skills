---
source: https://docs.docker.com/build/bake/overrides/
---

# Overriding configurations

Override Bake definitions per environment or target using file overrides, CLI overrides (`--set`), variable overrides (`--var`), or environment variables.

## Signature / Usage

```console
$ docker buildx bake --set app.arg.mybuildarg=bar \
    --set app.platform=linux/arm64 app --print
$ docker buildx bake --var TAG=dev webapp
$ docker buildx bake -f docker-bake.hcl -f overrides.hcl --print
$ export TAG=$(git rev-parse --short HEAD)
$ docker buildx bake --print webapp
```

## Options / Props

`--set` override keys use singular names such as `arg`, `secret`, and `tag`. These names apply to `--set` selectors; Bake file attributes keep their existing names, such as `args` and `tags`. Older plural override spellings remain supported as aliases.

`context` and `contexts` aren't aliases: `context` sets the main build context, while `contexts.<name>` sets one named context. The alias `secrets` applies to the secret list override only; `secrets.<id>` is invalid.

For the full list of override keys, aliases, pattern syntax, and fields supporting `+=`, see the `--set` reference of `docker buildx bake` (the `buildx-bake` CLI reference page).

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
- `--set` is repeatable. For array fields such as `tag`, repeat `--set` to provide multiple values or use `+=` to append without replacing. An empty assignment, such as `--set app.tag=`, clears the array. Subsequent assignments add values to the cleared array. Array literal syntax such as `--set app.tag=[a,b]` is not supported.
- You can match multiple targets with a pattern. Quote the override so your shell doesn't expand the pattern before Bake reads it:

```console
$ docker buildx bake --set 'foo*.arg.mybuildarg=value'
$ docker buildx bake --set '*.platform=linux/arm64'
$ docker buildx bake --set 'foo*.no-cache'
```

The first and third commands affect targets whose names start with `foo`. The second sets the platform for all targets.

- Environment variables only override `variable` blocks: define the variable in the Bake file, then set an environment variable with the same name. Values are coerced into the variable's type first (e.g. `PORT=7070` with `add(PORT, 1)` yields `"7071"`).

### Override list attributes

Attributes such as `secret`, `ssh`, and `output` can use lists of objects in a Bake file. In a `--set` value, use the inline syntax of the corresponding build flag, rather than an HCL object or array. For example, `secret` uses the same `id=...,src=...` syntax as `build --secret` (see the `buildx-build` CLI reference).

Use `=` to replace the secret list, `+=` to add a secret, or an empty value to clear the list:

```console
$ docker buildx bake --set app.secret=id=aws,src=./credentials app
$ docker buildx bake --set app.secret+=id=gcp,env=GCP_CREDENTIALS app
$ docker buildx bake --set app.secret= app
```

These operations affect the list as a whole. To change only the source of one declared secret while preserving the others, use `secret.<id>`.

### Override a secret source

Use `--set <target>.secret.<id>=<source>` to change the source of an existing secret without replacing the target's secret list. The secret ID must already be declared by the target.

For example, declare an `aws` secret in the Bake file:

```hcl {title=docker-bake.hcl}
target "app" {
  secret = [{
    id  = "aws"
    src = "./credentials"
  }]
}
```

Supply its value from an environment variable or a different file:

```console
$ docker buildx bake --set app.secret.aws=env=AWS_CREDENTIALS app
$ docker buildx bake --set app.secret.aws=src=/path/to/credentials app
```

The build still receives the secret as `aws`. Other declared secrets keep their sources. The override fails if the target doesn't declare `aws`, or if an `id=` in the override value names a different secret. This form doesn't support `+=`.

Named source overrides are applied after secret list overrides, so the ID must exist in the resulting list. The value describes the complete source using `env=...` or `src=...`; it doesn't address an object field such as `secret.aws.env`.

### Override resource limits

Use `--set <target>.resource.<name>=<value>` to change a resource limit for the containers that run build steps. For example, override memory and CPU limits for an `app` target:

```console
$ docker buildx bake --set app.resource.memory=2g \
    --set app.resource.cpu-quota=50000 app
```

Supported names are `memory`, `memory-swap`, `cpu-shares`, `cpu-period`, `cpu-quota`, `cpuset-cpus`, and `cpuset-mems`. Each override changes only the named limit, preserving other limits from the Bake definition. Resource overrides don't support `+=`.

These limits require a BuildKit daemon with per-step resource limit support and take effect on Linux. They control resources within a build step, rather than how many Bake targets run concurrently. See the `--resource` reference of `docker buildx build` for units and supported values, and the `resources` attribute in the Bake file reference for file configuration.

### Variable overrides

Use `--var NAME=value` to override a declared Bake variable for a single invocation. For example, set `TAG` without exporting it in your shell:

```console
$ docker buildx bake --var TAG=dev webapp
```

The value takes precedence over an environment variable with the same name. Unlike `--set webapp.tags=...`, this changes the variable wherever the Bake definition uses it. See Variables in Bake ("Override variable values") for precedence, types, and repeated flags.

### Disabling environment lookups

To disable environment variable lookups, set `BUILDX_BAKE_DISABLE_VARS_ENV_LOOKUP=1`; see `BUILDX_BAKE_DISABLE_VARS_ENV_LOOKUP` in Build variables. You can still provide variable values explicitly with `--var NAME=value`.

- Source: https://docs.docker.com/build/bake/overrides/ (docker/docs @ 553482c, retrieved 2026-11-14 JST)

## Related

- [Variables in Bake](./bake-variables.md)
- [Inheritance in Bake](./bake-inheritance.md)
- [Bake file reference](./bake-file-reference.md)

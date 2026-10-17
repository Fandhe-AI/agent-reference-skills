---
source: https://docs.docker.com/reference/cli/docker/buildx/bake/
---

# docker buildx bake

Bake is a high-level build command. Each specified target runs in parallel as part of the build. Alias: `docker buildx f`.

## Signature / Usage

```console
$ docker buildx bake [OPTIONS] [TARGET...]
$ docker buildx bake -f docker-bake.dev.hcl db webapp-release
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--allow` | | Allow build to access specified resources |
| `--call` | `build` | Set method for evaluating build (`check`, `outline`, `targets`) |
| `--check` | | Shorthand for `--call=check` |
| `-f`, `--file` | | Build definition file |
| `-j`, `--jobs` | `fail-fast` | Set target execution behavior (format: `N` or `mode[,parallel=N]`) |
| `--list` | | List targets or variables |
| `--load` | | Shorthand for `--set=*.output=type=docker`. Conditional. |
| `--metadata-file` | | Write build result metadata to a file |
| `--no-cache` | | Do not use cache when building the image |
| `--policy` | | Global policy evaluation options (format: `[disabled=true\|false][,strict=true\|false][,log-level=level]`) |
| `--print` | | Print the options without building |
| `--progress` | `auto` | Set type of progress output (`auto`, `none`, `plain`, `quiet`, `rawjson`, `tty`). Use plain to show container output |
| `--provenance` | | Shorthand for `--set=*.attest=type=provenance` |
| `--pull` | | Always attempt to pull all referenced images |
| `--push` | | Shorthand for `--set=*.output=type=registry`. Conditional. |
| `--sbom` | | Shorthand for `--set=*.attest=type=sbom` |
| `--set` | | Override target value (e.g., `targetpattern.key=value`) |
| `--var` | | Set a variable value (e.g., `name=value`) |

## Notes

- `--allow=ENTITLEMENT[=VALUE]`: in addition to BuildKit's `network.host` and `security.insecure` (see `buildx build --allow`), Bake supports filesystem entitlements `fs=<path|*>` (read and write outside the working directory), `fs.read=<path|*>`, `fs.write=<path|*>`, and `buildx.local.delete` (lets local outputs with `mode=delete` delete stale files). A `*` wildcard allows the entire filesystem.
- `--jobs` / `-j`: forms `--jobs=N`, `--jobs=[mode,]parallel=N`, `--jobs=mode`. Modes: `fail-fast` (default; stops the build when a target fails and cancels running targets; outputs already written are not removed), `defer-output` (waits until all participating targets have evaluated their build results before any exports; exports are not transactional), `defer-error` (independent targets keep running after another fails; Bake still returns an error). `parallel` takes a non-negative integer; omitted or `0` means no limit. It controls target scheduling, not BuildKit's step parallelism. Repeating `--jobs` replaces the previous value. With `defer-output`, a nonzero jobs limit smaller than the number of participating targets is rejected (including implicit targets referenced through `target:` contexts).
- `-f` / `--file`: HCL, JSON or Compose file; multiple files are combined. Environment variable `BUILDX_BAKE_FILE` is mutually exclusive with `-f` (if both are set the variable is ignored); multiple definitions are separated by the system path separator (`;` on Windows, `:` elsewhere), changeable with `BUILDX_BAKE_PATH_SEPARATOR`. Local directory build contexts resolve from the current working directory by default; set `BUILDX_BAKE_FILE_RELATIVE_PATHS=1` to resolve them from the Bake file that defines each path (Compose files use the first Compose file directory). Use the `cwd://` prefix to stay relative to the working directory.
- `--list`: `--list=targets` or `--list=variables` (shows description and type set in the Bake file). Long form `--list=type=targets,format=json` outputs JSON.
- `--load` is conditional: with no output defined it adds `type=docker`; if outputs are `docker`, `image`, `registry` or `oci` it adds `type=docker` when not present; if outputs include `local` or `tar` it does nothing.
- `--push` follows the same logic: no outputs adds `type=image,push=true`; existing `image` outputs get `push=true`; `local` / `tar` outputs are not overridden.
- `--metadata-file` writes a map of results per target. `BUILDX_METADATA_PROVENANCE` (`min` default, `max`, `disabled`/`false`/`0`) and `BUILDX_METADATA_WARNINGS` (`1`/`true`) behave as in `buildx build`.
- `--print` prints the resulting target options as JSON without building.
- `--set targetpattern.key[.subkey]=value`: pattern matching is Go `path.Match`. `--set` is repeatable; use `+=` to append; array literal syntax (`--set target.tag=[a,b]`) is not supported; a non-append assignment with an empty value clears array values.
- Overridable fields: `annotation`, `attest`, `arg.<name>`, `cache-from`, `cache-to`, `call`, `context`, `contexts.<name>`, `dockerfile`, `entitlement`, `extra-host.<hostname>`, `label.<name>`, `load`, `no-cache`, `no-cache-filter`, `network`, `output`, `platform`, `policy`, `pull`, `push`, `resource.<field>`, `secret`, `secret.<id>`, `shm-size`, `ssh`, `tag`, `target`, `ulimit`.
- Appendable with `+=`: `annotation`, `attest`, `cache-from`, `cache-to`, `entitlement`, `no-cache-filter`, `output`, `platform`, `policy`, `secret`, `ssh`, `tag`, `ulimit` (`annotation`, `attest`, `entitlement` already append by default).
- Plural Bake field names are accepted as aliases of the singular override keys (`annotations`, `args`, `entitlements`, `extra-hosts`, `labels`, `platforms`, `resources`, `secrets`, `tags`, `ulimits`). `context` and `contexts` are not aliases (`context` sets the build context, `contexts.<name>` a named context); `secret.<id>` changes the source of a secret already declared by the target and `secrets.<id>` is invalid.
- Composable fields (`ssh`, `secret`, `output`, `cache-to`, `cache-from`, `attest`, `annotation`) take the inline string syntax of the corresponding build flag with `--set`, not the HCL object form. Only `arg`, `contexts`, `extra-host`, `label`, `resource` and `secret` support entry-addressed subkeys.

### Examples

```console
$ docker buildx bake --set target.arg.mybuildarg=value
$ docker buildx bake --set *.platform=linux/arm64
$ docker buildx bake --set target.platform+=linux/arm64
$ docker buildx bake --set "*.ssh=default=$HOME/.ssh/id_ed25519"
```

```hcl
# docker-bake.dev.hcl
group "default" {
  targets = ["db", "webapp-dev"]
}

target "webapp-dev" {
  dockerfile = "Dockerfile.webapp"
  tags = ["docker.io/username/webapp"]
}
```

## Related

- [docker buildx build](./buildx-build.md)
- [Bake file reference](../build-cache-bake/bake-file-reference.md)
- [Bake](../build-cache-bake/bake.md)

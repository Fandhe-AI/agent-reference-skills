---
source: https://docs.docker.com/reference/cli/docker/buildx/bake/
---

# Buildx Bake

Commands for running `docker buildx bake`. Source: the Examples in the `docker buildx bake` CLI reference (retrieved 2026-10-16 JST, equivalent to Buildx v0.38.0). For the bake file syntax, see `references/build-cache-bake/`.

> **Warning**: `--push` publishes the result to a registry, and `--allow fs.write` / `fs=*` permit writing to the host filesystem or broad reads. Try these in a disposable verification environment and a test registry first.

## Build targets from a specified bake file

```sh
docker buildx bake -f docker-bake.dev.hcl db webapp-release
```

`-f` / `--file` accepts HCL / JSON / Compose files, and multiple files are merged. Passing target names builds only those targets. The file can also be set with the environment variable `BUILDX_BAKE_FILE` (the environment variable is ignored when `-f` is also given).

## List targets and variables

```sh
docker buildx bake --list=targets
```

```sh
docker buildx bake --list=variables
```

```sh
docker buildx bake --list=type=targets,format=json
```

Descriptions come from the `description` property in the bake file. The default output is a table; the long-form CSV syntax `format` switches it to JSON.

## Print resolved options without building

```sh
docker buildx bake -f docker-bake.hcl --print db
```

Only prints the resolved target as JSON; no build is started.

## Load the build result into the local Docker

```sh
docker buildx bake --load --metadata-file metadata.json .
```

`--load` is shorthand for `--set=*.output=type=docker` and does not override the output when it is `local` / `tar` (conditional). `--metadata-file` writes the per-target result metadata.

## Push to a registry

> **Warning**: Publishes the image to a registry. Do not run it by mistake against a logged-in production registry.

```sh
docker buildx bake --push
```

`--push` adds `type=image,push=true` when no output is defined. It does not override the output when it is `local` / `tar`.

## Target execution parallelism and failure behavior

```sh
docker buildx bake --jobs=defer-output # wait for all build results before exporting
docker buildx bake --jobs=defer-error  # let independent targets finish before returning an error
```

```sh
docker buildx bake -j=2                          # run at most two targets at the same time
docker buildx bake --jobs=parallel=1             # run targets sequentially
docker buildx bake --jobs=defer-error,parallel=2 # limit concurrency and let independent targets finish after a failure
```

The default mode is `fail-fast`. Repeating `--jobs` replaces the earlier value, so specify the mode and the limit in the same flag value.

## Override target settings from the command line

```sh
docker buildx bake --set target.arg.mybuildarg=value
docker buildx bake --set target.platform=linux/arm64
docker buildx bake --set foo*.arg.mybuildarg=value    # overrides build arg for all targets starting with 'foo'
docker buildx bake --set *.platform=linux/arm64       # overrides platforms for all targets
docker buildx bake --set foo*.no-cache                # bypass caching only for targets starting with 'foo'
docker buildx bake --set target.platform+=linux/arm64 # appends 'linux/arm64' to the platform list
docker buildx bake --set target.contexts.bar=../bar   # overrides 'bar' named context
docker buildx bake --set target.resource.memory=2g    # overrides memory resource limit
docker buildx bake --set target.secret.aws=env=AWS    # overrides source for an existing secret
docker buildx bake --set target.tag=                  # clears all tag values
```

`--set` can be repeated. For array fields (such as `tag`), pass multiple values by repeating the flag or using `+=`; the array literal `--set target.tag=[a,b]` is not supported. Patterns use Go `path.Match` syntax.

## Specify an SSH agent socket or key

```sh
docker buildx bake --set "*.ssh=default=$HOME/.ssh/id_ed25519"
```

```sh
docker buildx bake --set "*.ssh=default=$HOME/.ssh/id_ed25519,$HOME/.ssh/id_rsa"
```

Separate multiple paths for the same `id` with commas. `$HOME` is expanded by the shell before it reaches buildx.

## Allow access to the filesystem outside the bake file

> **Warning**: `--allow` relaxes buildx / BuildKit restrictions. Allow only the minimum paths required, and use the wildcard (`*`) only in disposable verification environments.

When the bake file reads outside the working directory, as with `context = "../src"`:

```sh
docker buildx bake --allow fs.read=* app
docker buildx bake --allow fs.read=../src app
docker buildx bake --allow fs=* app
```

When it writes outside the working directory, as with `output = "/tmp"`:

```sh
docker buildx bake --allow fs=/tmp app
docker buildx bake --allow fs.write=/tmp app
docker buildx bake --allow fs.write=* app
```

`fs` allows read and write, `fs.read` allows read, and `fs.write` allows write. `--allow=buildx.local.delete` grants the permission for local output to delete stale files when `mode=delete` is set (from the original).

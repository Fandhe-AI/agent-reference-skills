---
source: https://docs.docker.com/build/bake/reference/
---

# Bake file reference

The Bake file defines workflows that you run with `docker buildx bake`. Formats: HashiCorp Configuration Language (HCL, preferred), JSON, and YAML (Compose file).

## Signature / Usage

```hcl
variable "TAG" {
  default = "latest"
}

group "default" {
  targets = ["webapp"]
}

target "webapp" {
  dockerfile = "Dockerfile"
  tags = ["docker.io/username/webapp:${TAG}"]
}
```

```console
$ docker buildx bake --file ../docker/bake.hcl --print
```

Property types: `target` (build targets), `group` (collections of targets), `variable` (build arguments and variables), `function` (custom Bake functions).

## Options / Props

Target attributes:

| Name | Type | Description |
| --- | --- | --- |
| `args` | Map | Build arguments |
| `annotations` | List | Exporter annotations |
| `attest` | List | Build attestations |
| `cache-from` | List | External cache sources |
| `cache-to` | List | External cache destinations |
| `call` | String | Specify the frontend method to call for the target. |
| `context` | String | Set of files located in the specified path or URL |
| `contexts` | Map | Additional build contexts |
| `description` | String | Description of a target |
| `dockerfile-inline` | String | Inline Dockerfile string |
| `dockerfile` | String | Dockerfile location |
| `entitlements` | List | Permissions that the build process requires to run |
| `extra-hosts` | Map | Custom host-to-IP mapping |
| `inherits` | List | Inherit attributes from other targets |
| `labels` | Map | Metadata for images |
| `matrix` | Map | Define a set of variables that forks a target into multiple targets. |
| `name` | String | Override the target name when using a matrix. |
| `no-cache-filter` | List | Disable build cache for specific stages |
| `no-cache` | Boolean | Disable build cache completely |
| `output` | List | Output destinations |
| `policy` | List | Policies to validate build sources and metadata |
| `platforms` | List | Target platforms |
| `pull` | Boolean | Always pull images |
| `resources` | Map | Resource limits for build containers |
| `secret` | List | Secrets to expose to the build |
| `shm-size` | String | Size of `/dev/shm` |
| `ssh` | List | SSH agent sockets or keys to expose to the build |
| `tags` | List | Image names and tags |
| `target` | String | Target build stage |
| `ulimits` | List | Ulimit options |

Built-in variables:

| Variable | Description |
| --- | --- |
| `BAKE_CMD_CONTEXT` | Holds the main context when building using a remote Bake file. |
| `BAKE_LOCAL_PLATFORM` | Returns the current platform's default platform specification (e.g. `linux/amd64`). |

Context value types (`target.contexts`):

| Context type | Example |
| --- | --- |
| Container image | `docker-image://alpine@sha256:0123456789` |
| Git URL | `https://github.com/user/proj.git` |
| HTTP URL | `https://example.com/files` |
| Local directory | `../path/to/src` |
| Bake target | `target:base` |

## Notes

The official attribute table lists `extra-hosts` and `shm-size` as List, but the official usage examples use a Map (`extra-hosts = { ... }`) and a String (`shm-size = "128m"`); the table above follows the examples.

File lookup and merging:

- Default lookup order: `compose.yaml`, `compose.yml`, `docker-compose.yml`, `docker-compose.yaml`, `docker-bake.json`, `docker-bake.hcl`, `docker-bake.override.json`, `docker-bake.override.hcl`. Specify explicitly with `--file`.
- If more than one file is found they are merged in lookup order. These attributes are overridden by the last occurrence: `target.cache-to`, `target.dockerfile-inline`, `target.dockerfile`, `target.output`, `target.platforms`, `target.pull`, `target.tags`, `target.target`. All other attributes are merged (e.g. `labels` entries are combined; duplicate labels are overridden).

Target attribute details:

- `args`: same as `--build-arg`. A `null` value forces the target to use the `ARG` value from the Dockerfile.

```hcl
target "db" {
  args = {
    GO_VERSION = null
  }
  dockerfile = "db.Dockerfile"
  tags = ["docker.io/username/db"]
}
```

- `annotations`: list of `KEY=VALUE`; added to image manifests by default. Prefix with comma-separated levels, e.g. `annotations = ["index,manifest:org.opencontainers.image.authors=dvdksn"]`.
- `attest`: long-form CSV attestation parameters, e.g. `{ type = "provenance", mode = "max" }`, `{ type = "sbom" }`.
- `cache-from` / `cache-to`: use Buildx cache storage backends, same as `--cache-from` / `--cache-to`; lists allow several sources/destinations.

```hcl
target "app" {
  cache-from = [
    {
      type = "s3"
      region = "eu-west-1"
      bucket = "mybucket"
    },
    {
      type = "registry"
      ref = "user/repo:cache"
    }
  ]
}
```

- `call`: frontend method, same as `--call`. Values: `build` (default), `check` (evaluate build checks), `outline` (show build arguments and defaults), `targets` (list Bake targets with descriptions).
- `context`: build context path or URL; defaults to `"."`. Set `BUILDX_BAKE_FILE_RELATIVE_PATHS=1` to resolve local paths in `target.context` / `target.contexts` relative to the Bake file defining them (Compose files use the first Compose file directory as base); use `cwd://` for paths that should stay relative to the current working directory.
- `contexts`: same as `--build-context`; Bake determines the type from the pattern of the value. Prefer regular multi-stage builds over `target:` contexts.
- `description`: human-readable description; shown by `docker buildx bake --list=targets`.
- `dockerfile-inline`: inline Dockerfile string; takes precedence over `dockerfile`.
- `dockerfile`: same as `--file`; resolves to `"Dockerfile"` by default.
- `entitlements`: `network.host` (use with `RUN --network=host`) and `security.insecure` (use with `RUN --security=insecure`, privileged containers). Two-step enablement: the target declares the entitlement, then the user grants it with `--allow` or by confirming a prompt.

```hcl
target "integration-tests" {
  entitlements = ["security.insecure"]
}
```

- `extra-hosts`: same as `--add-host`, e.g. `extra-hosts = { my_hostname = "8.8.8.8" }`.
- `inherits`: list; on conflict the last target in the list takes precedence.
- `labels`: same as `--label`; a `null` value uses the label value from the Dockerfile.
- `matrix` / `name`: fork a target into multiple variants; each generated target must have a unique name (see Matrix targets).
- `network`: network mode for the whole build (`default`, `host`, `none`), overriding all `RUN` instructions. Prefer `RUN --network=<value>` in the Dockerfile. `host` requires the `network.host` entitlement (`--allow=network.host`).
- `no-cache-filter` / `no-cache`: same as the `docker build` flags.
- `output`: same as `--output`, e.g. `output = [{ type = "cacheonly" }]`. Local outputs with `mode=delete` require granting `--allow=buildx.local.delete`.
- `policy`: entries use the same keys as `docker buildx build --policy` (`filename`, `reset`, `disabled`, `strict`, `log-level`); Bake also loads `Dockerfile.rego` next to the target Dockerfile when present.
- `platforms`: same as `--platform`, e.g. `["linux/amd64", "linux/arm64", "linux/arm/v7"]`.
- `pull`: always attempt to pull images.
- `resources`: cgroup limits for `RUN` containers; keys `memory`, `memory-swap`, `cpu-shares`, `cpu-period`, `cpu-quota`, `cpuset-cpus`, `cpuset-mems`. Requires a BuildKit daemon supporting per-step resource limits, only effective on Linux, and doesn't affect the build cache key.

```hcl
target "default" {
  resources = {
    memory      = "2g"
    memory-swap = "4g"
    cpu-quota   = 50000
  }
}
```

- `secret`: same as `--secret`; override an existing secret's source with `--set default.secret.aws=env=AWS_CREDENTIALS`.

```hcl
variable "HOME" {
  default = null
}

target "default" {
  secret = [
    { type = "env", id = "KUBECONFIG" },
    { type = "file", id = "aws", src = "${HOME}/.aws/credentials" }
  ]
}
```

- `shm-size`: format `<number><unit>` (`b`, `k`, `m`, `g`; bytes if omitted), number greater than 0. Let the builder determine configuration unless tuning is required.
- `ssh`: same as `--ssh`, e.g. `ssh = [{ id = "default" }]`. When overriding from the CLI with `--set`, use the inline `id=path` string form, e.g. `--set "*.ssh=default=$HOME/.ssh/id_ed25519"`.
- `tags`, `target`: same as `--tag` and `--target`.
- `ulimits`: `<type>=<soft limit>[:<hard limit>]`, e.g. `ulimits = ["nofile=1024:1024"]`; without a hard limit the soft limit is used for both; unset ulimits are inherited from the daemon defaults.

Groups:

- `group` invokes multiple targets at once. Groups take precedence over targets with the same name (a `default` group is built, the `default` target is ignored).

```hcl
group "default" {
  targets = ["db", "webapp-dev"]
}
```

Variables:

- A `variable` block can declare `type`, `default` (may be `null`, which uses the Dockerfile default) and `description` (shown by `docker buildx bake --list=variables`). If an environment variable with the same name exists, its value is used instead of the declared default; set `BUILDX_BAKE_DISABLE_VARS_ENV_LOOKUP=1` to disable the lookup.
- Primitive types: `string`, `number`, `bool`; written as a keyword literal (`type = string`, not `type = "string"` and not an expression). Complex type constructors: `tuple([<type>,...])`, `list(<type>)`, `set(<type>)`, `map(<type>)`, `object({<attr>=<type>},...})`.

```hcl
variable "TAGS" {
  default = ["latest"]
  type = list(string)
}

target "webapp-dev" {
  dockerfile = "Dockerfile.webapp"
  tags = [for tag in TAGS: "docker.io/username/webapp:${tag}"]
}
```

```console
$ TAGS=dev,latest,2 docker buildx bake webapp-dev
```

- Overriding with environment variables: primitives work without typing (a variable with neither typing nor default is `string`); complex types require explicit typing. CSV is the canonical method (full support for `list`, `set`, `tuple`; limited for `map` / `object`; none for composite types). JSON overrides append `_JSON` to the variable name, e.g. `VALS_JSON=$(< data.json) docker buildx bake`. If `FOO_JSON` is itself a declared variable, `FOO_JSON=...` is a CSV override of that variable and `FOO_JSON_JSON` is its JSON override.
- Interpolate variables with curly brackets (`"default=${HOME}/.ssh/id_rsa"`, not `$HOME`); a variable must be declared in the Bake file before it can be interpolated, otherwise `Unknown variable` errors.

Functions:

- General-purpose functions from go-cty are available (see the standard library page), and user-defined functions are supported:

```hcl
function "increment" {
  params = [number]
  result = number + 1
}
```

## Related

- [Bake targets](./bake-targets.md)
- [Variables in Bake](./bake-variables.md)
- [Bake standard library functions](./bake-stdlib.md)
- [Overriding configurations](./bake-overrides.md)
- [Cache storage backends](./cache-backends.md)

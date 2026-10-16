# Go (experimental support)

Discovers modules in a repository-root `go.work` as Turborepo packages, adds their module dependencies to the Package Graph, and maps common tasks to standard Go commands.

## Usage

Enable the Future Flag in the root `turbo.json`:

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "futureFlags": {
    "experimentalGoWorkspaces": true
  },
  "tasks": {}
}
```

Prerequisites (repository root):

- Go 1.22 or newer available as `go` on `PATH`
- A `go.work` whose `use` directives identify at least one module inside the repository
- A `go.mod` with a module path in every member
- Current `go.sum` and `go.work.sum` files when the resolved graph requires them

```text
go 1.22

use (
  ./apps/api
  ./packages/lib
)
```

### Package names

The package name is the last component of the `go.mod` module path, preserving a trailing major-version suffix.

| Go module path | Turborepo package name |
| --- | --- |
| `example.com/api` | `api` |
| `example.com/acme/api` | `api` |
| `example.com/api/v2` | `api/v2` |

```bash
turbo ls --filter=api
turbo run test --filter=api
turbo run api#test
```

- `gopkg.in/yaml.v3` becomes `yaml.v3`. `api` and `api/v2` are distinct packages.
- `--filter=./apps/api` selects by directory; `--filter=api` selects by name. A slash in a name such as `api/v2` does not make it a directory filter.
- Keep full module paths in `go.mod`, `require` / `replace` directives, and imports. Package-name overrides are not supported.
- Package identities must be unique across the whole Package Graph, including other languages (`example.com/api` and `example.org/api` collide; so does a JS package named `api`).
- `go-workspace` is a reserved synthetic scope that depends on every member.

### Built-in tasks

| Scope | Turborepo task | Go command |
| --- | --- | --- |
| Module with zero or multiple `main` packages | `turbo run build` | `go build ./...` |
| Module with exactly one `main` package | `turbo run build` | `go build <target>` |
| Module with exactly one `main` package | `turbo run dev` | `go run <target>` |
| Any module | `turbo run test` | `go test ./...` |
| Any module | `turbo run lint` | `go vet ./...` |
| Any module | `turbo run format` | `go fmt ./...` |

- No built-in `go-workspace#test`, `go-workspace#lint`, or `go-workspace#format` tasks exist; omit `--filter=go-workspace` to run across all modules.
- With exactly one `main` package, the binary is written into the module directory (not `dist/` or `bin/`), named after the last non-major-version component of the import path (`.exe` on Windows). `go build ./cmd/server` produces `./server`.
- Modules with zero or multiple `main` packages get no `dev`; `build` is only a compilation check.
- Arguments after `--` are placed before package patterns for `build`, `test`, `lint`, `format`. Arguments to `dev` follow the main import path and become program arguments.

```bash
turbo run test --filter=api -- -run TestHTTP
turbo run dev --filter=api -- --port 8080
```

### Override or remove defaults

Remove a default via Package Configuration:

```json
{
  "extends": ["//"],
  "tasks": {
    "format": {
      "extends": false
    }
  }
}
```

Replace a command without a shell with `experimentalTaskCommand`:

```json
{
  "futureFlags": {
    "experimentalGoWorkspaces": true,
    "experimentalTaskCommand": true
  },
  "tasks": {
    "test": {
      "command": {
        "go": ["go", "test", "-race", "./..."]
      }
    }
  }
}
```

Custom binary path (module Package Configuration, e.g. `./apps/api/turbo.json`):

```json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "command": ["go", "build", "-o", "bin/my-api", "."],
      "inputs": ["$TURBO_DEFAULT$", "!bin/my-api"],
      "outputs": ["bin/my-api"]
    }
  }
}
```

### Prune

```bash
turbo prune api
cd out/apps/api
go test ./...
```

## Notes

- Experimental; can change at any time. Initial supported range is Go 1.22+. Feedback goes to the Go RFC (github.com/vercel/turborepo/discussions/14033).
- Task hashes include module sources and transitive internal sources, `go.mod` / `go.sum` / `go.work` / `go.work.sum`, external module identities / versions / replacements / checksums, `go version`, `go env -json` target fields, and variables such as `GOOS`, `GOARCH`, `GOFLAGS`, `GOTOOLCHAIN`, `CGO_ENABLED`. Checkout paths, `GOCACHE`, `GOMODCACHE`, credentials, proxy auth, and telemetry settings are excluded.
- Caching: a one-main-package build caches the single binary; automatic build caching is disabled when the inferred output may overlap source inputs. Library and multi-main builds, `dev`, and `format` are uncached. Build arguments disable automatic output caching.
- `outputs` declares files to cache but does not change Go's output path; `command` replaces the entire build command.
- Go reports normal output-name conflicts (a main package in `./server` cannot produce `./server`); use an explicit `-o` command override.
- Affectedness: source changes affect the owning module and internal dependents; `go.mod` / `go.work` changes trigger rediscovery; `go.sum` / `go.work.sum` changes invalidate resolution. `--affected`, dependency filters, `^task`, `turbo query`, and `turbo watch` use the same relationships.
- Prune rewrites `go.work` with deterministic explicit members, preserves `go`, `toolchain`, and applicable replacement directives, and copies `go.work.sum` plus retained module directories.
- Source: turborepo v2.11.8 docs, https://turborepo.dev/docs/guides/tools/go

## Related

- [Rust (experimental support)](./rust-experimental.md)
- [Python (experimental support)](./python-experimental.md)

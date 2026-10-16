# Multi-Language Support

## Signature / Usage

Turborepo can combine package-manager workspaces with enabled native workspaces. Each workspace contributes its own package identities, dependency relationships, and tasks to the same Package Graph and Task Graph. The official example combines a JavaScript application with two Go modules:

```text
.
├── apps/api/        (go.mod, main.go)
├── packages/
│   ├── lib/         (go.mod, lib.go)
│   └── web/         (package.json)
├── go.work
├── package.json
└── turbo.json
```

Add the JavaScript workspace (package-manager workspace definition, e.g. pnpm):

```yaml
# pnpm-workspace.yaml
packages:
  - "packages/*"
```

Add the Go workspace: a root `go.work` listing each Go module, with full module paths in `go.mod` (Turborepo derives the package names `lib` and `api` from these paths):

```text
// go.work
go 1.22

use (
  ./apps/api
  ./packages/lib
)

// packages/lib/go.mod
module example.com/acme/lib

// apps/api/go.mod
module example.com/acme/api
require example.com/acme/lib v0.0.0
```

Enable native Go tasks in the root `turbo.json`:

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "futureFlags": {
    "experimentalGoWorkspaces": true
  },
  "tasks": {
    "build": { "dependsOn": ["^build"] },
    "test": {},
    "lint": {}
  }
}
```

```bash
turbo run build
turbo run test --filter=api
turbo run api#test
turbo run lint
```

## Notes

- Turborepo discovers `web` from the package-manager workspace and `api` / `lib` from `go.work`. Go modules do not need `package.json` files; a repository with only enabled native workspaces can omit the root `package.json`.
- Go package names use the last module-path component and keep a trailing major-version suffix (`example.com/api` becomes `api`, `example.com/api/v2` becomes `api/v2`). Names must be unique across the whole Package Graph (another Go module ending in `/api`, or a JavaScript package named `api`, would collide). Full paths are not aliases and package-name overrides are not supported.
- The `require example.com/acme/lib` declaration resolves the dependency on the package named `lib`, so `dependsOn: ["^build"]` orders the Go builds. Keep full module paths in `go.mod` and Go imports. The synthetic `go-workspace` package depends on every Go member but provides no built-in `test`, `lint`, or `format` tasks; run those without a filter to execute them in each member module.
- Native Go workspace support is gated by `futureFlags.experimentalGoWorkspaces` (experimental).
- For a language without native workspace support, add a `package.json` beside each independently cacheable project and invoke its toolchain from package scripts; Turborepo then uses the package-manager relationships rather than interpreting that language's dependency graph.
- Non-JS toolchains must be installed separately; Turborepo does not manage them.

## Related

- [Rust (experimental)](../guides-tools/rust-experimental.md)
- [Python (experimental)](../guides-tools/python-experimental.md)
- [Go (experimental support)](../guides-tools/go-experimental.md)
- [Migrating from Nx](./migrating-from-nx.md)

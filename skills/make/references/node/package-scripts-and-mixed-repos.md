---
source:
  - https://pnpm.io/workspaces
  - https://pnpm.io/cli/run
  - https://turborepo.dev/docs/crafting-your-repository/running-tasks
  - https://turborepo.dev/docs/core-concepts/package-and-task-graph
---

# Package Scripts and Mixed Repos

Node.js projects already have a build/task orchestration layer: the package manager (lockfile +
`package.json` `scripts`), and, in a monorepo, optionally Turborepo on top of workspaces. A Make
target that wraps a Node.js repo should call into that layer, not re-implement dependency
ordering, parallel execution, or caching that the package manager / Turborepo already provide.

## Signature / Usage

```makefile
.PHONY: build
build:
	pnpm run build          # or: turbo run build, if a turbo.json exists at the repo root
```

### Package Manager and Lockfile (Source-backed behavior)

- pnpm workspaces are declared in a `pnpm-workspace.yaml` file at the repo root, listing which
  packages belong to the workspace.
- If a repository has a `package.json` `workspaces` field (npm/Yarn/Bun convention) but **no**
  `pnpm-workspace.yaml`, running `pnpm install` **creates** `pnpm-workspace.yaml` with the same
  patterns taken from `workspaces`. This is a file-creating side effect of a plain install, not
  an opt-in migration step.
- By default (`sharedWorkspaceLockfile: true`), pnpm keeps a single `pnpm-lock.yaml` at the
  workspace root covering every package in the workspace.
- Workspace-internal dependencies use the `workspace:` protocol (e.g. `"foo": "workspace:*"`,
  `"foo": "workspace:2.0.0"`); pnpm resolves these to local packages only, converting them to
  ordinary semver ranges at publish time.

Source: https://pnpm.io/workspaces (pnpm documentation, "Workspace", confirmed 2026-09-26).

**Design guidance**: because a bare `pnpm install` on a `workspaces`-only repo writes a new file
(`pnpm-workspace.yaml`), do not run `pnpm install` against a repository that currently uses npm
or Yarn without the team's agreement — it is not a read-only operation. This skill does not
choose pnpm over another package manager on a project's behalf; whichever package manager the
repository already commits to (existing lockfile + CI configuration) is the one a Makefile
target should call. Replacing it is a separate, explicitly-approved decision.

### `package.json` Scripts (Source-backed behavior)

- `pnpm run <script>` executes the named entry under `package.json`'s `scripts` field; `pnpm
  <script>` is shorthand as long as the name does not collide with a built-in pnpm command.
- `node_modules/.bin` (and, in a workspace, the root workspace's `node_modules/.bin`) is added to
  `PATH` for the duration of the script, so locally-installed CLI binaries run without a global
  install.
- Arguments placed after the script name are forwarded to the script verbatim (e.g. `pnpm run
  watch --no-color` runs `webpack --watch --no-color` if `watch` is `webpack --watch`); flags for
  `pnpm run` itself must come before the script name.
- `pnpm run -r` (`--recursive`) runs the named script across workspace packages; `--if-present`
  skips packages that lack the script instead of erroring; `--parallel` disables the normal
  concurrency/ordering behavior.

Source: https://pnpm.io/cli/run (pnpm documentation, "run", confirmed 2026-09-26).

### Turborepo Delegation (Source-backed behavior)

When a Turborepo `turbo.json` already exists at the repo root, dependency ordering and caching
for Node.js tasks are Turborepo's responsibility, not Make's:

- Turborepo builds a **Package Graph** from the package manager's workspace structure (which
  internal packages depend on which), and a separate **Task Graph** from `turbo.json`, modeled as
  a directed acyclic graph where an edge from task A to task B means A depends on B.
- `"dependsOn": ["^build"]` in a task's `turbo.json` entry expresses "wait for the same task in
  each workspace dependency to finish first"; Turborepo determines execution order from this
  graph, not from the order tasks are listed on the command line (`turbo run build test` and
  `turbo run test build` are equivalent).
- Turborepo parallelizes tasks automatically wherever the Task Graph allows it, and integrates
  with caching (including Remote Caching) so unchanged tasks are skipped.
- The conventional integration point is the root `package.json`, e.g. `"scripts": { "build":
  "turbo run build" }`, so `npm run build` / `pnpm build` / `yarn build` all reach the same
  `turbo run build` invocation.

Source: https://turborepo.dev/docs/crafting-your-repository/running-tasks and
https://turborepo.dev/docs/core-concepts/package-and-task-graph (Turborepo documentation,
confirmed 2026-09-26; `turborepo.com/docs/...` redirects (301) to the same pages under
`turborepo.dev`).

**Design guidance**: a Makefile in a Turborepo-managed repo should have exactly one `.PHONY`
target per public command, each calling `turbo run <task>` (or the `package.json` script that
wraps it) once. Do not have Make also express `dependsOn`-style ordering for the same tasks, and
do not fan a single `make -jN` invocation out into multiple separate `turbo run` calls for
sub-pieces of one task — Turborepo already owns parallelism and dependency ordering for its own
Task Graph. Pick one graph owner (Turborepo) for build/test/lint ordering and caching in Node.js
code, and let Make's own dependency graph govern only the files/targets Make itself manages (see
[Responsibility Boundaries](../architecture/responsibility-boundaries.md)). This is a distinct
concern from the `package.json` script naming a `turbo`-task-name collision that Turborepo itself
detects and errors on (see the `turborepo` skill's `messages-error-docs/recursive-turbo-invocations.md`
for that specific, narrower diagnostic — this page does not restate it).

### Rust + Node.js Mixed Repositories (Design guidance)

In a repository that mixes a Cargo workspace and a Node.js workspace (e.g. a Rust engine plus a
Node.js frontend/tooling package), keep each ecosystem's real work inside that ecosystem:

- Rust build/test/lint stays behind `cargo`/`cargo xtask` (see `references/rust/`); Node.js
  build/test/lint stays behind `pnpm run <script>` / `turbo run <task>`. The root Makefile is an
  integration entry point that calls into both, not a re-implementation of either.
- Most cross-ecosystem targets should remain independent `.PHONY` targets with no prerequisite
  edge between them (`make build-rust` and `make build-node` do not need to run in a fixed order
  if neither consumes the other's output).
- Add an explicit Make ordering edge **only** when one ecosystem's build artifact is consumed as
  input by the other — for example, a Rust crate compiled to a target the Node.js package
  consumes. The default, safe form is a `.PHONY`-to-`.PHONY` ordering edge and lets Cargo decide
  whether its own step actually does anything (a no-op `cargo build` when nothing changed is
  cheap):

```makefile
# Example contract (this skill's illustration, not a Cargo/pnpm/Make rule): ordering only.
# Cargo — not Make — decides whether build-wasm's `cargo build` recompiles anything.
.PHONY: build-wasm build-node
build-wasm:
	cargo build -p engine --target wasm32-unknown-unknown --release

build-node: build-wasm      # ordering edge only: artifact must exist before pnpm runs
	pnpm run build
```

  A true file target (e.g. `target/wasm32-unknown-unknown/release/engine.wasm:
  $(wildcard crates/engine/src/*.rs) crates/engine/Cargo.toml Cargo.lock`) would let Make itself
  skip `build-node` when the artifact is unchanged — but only if that prerequisite list stays
  complete as the crate grows, which means deliberately duplicating Cargo's own input tracking at
  the file level. Use the file-target form only when skipping the Node.js step (not just the
  Cargo step) matters enough to accept that duplication; otherwise prefer the `.PHONY` ordering
  edge above and let Cargo's own change detection do the real work. (`$(wildcard ...)` is
  supported by GNU Make 3.81, the version this skill's samples were verified against — see
  [GNU/POSIX/BSD Compatibility](../execution/gnu-posix-bsd-compatibility.md).)

- Every delegating `.PHONY` target must have a documented, working direct entry point that does
  not require Make at all (e.g. `pnpm run build`, `turbo run build`) — per this skill's
  responsibility-boundaries design (`references/architecture/responsibility-boundaries.md`),
  Make is an optional thin entry point here, not the source of truth for Node.js build/test
  ordering or caching.
- Do not parallelize the same logical task across more than one layer at once (e.g. `make -j8`
  simultaneously invoking `turbo run build --concurrency=8` and a separate `cargo build -j8` for
  artifacts that feed each other) — pick one layer to own concurrency for a given dependency
  chain; the other layer's job is to run its single delegating command to completion.

## Notes

- Git hooks (e.g. lefthook) that run Node.js lint/test commands are covered by this skill's
  `quality` category and by the separate `lefthook` skill; this page does not restate lefthook's
  configuration format.
- This page does not cover Turborepo's Remote Cache setup, `turbo.json` schema, or CLI flag
  reference in full — see the `turborepo` skill for the complete Turborepo API surface. This
  skill only documents the boundary: Make calls into Turborepo/pnpm, it does not duplicate their
  dependency graph or cache.

## Related

- [Responsibility Boundaries](../architecture/responsibility-boundaries.md)
- [Command Contracts](../architecture/command-contracts.md)
- [CI Hooks and Cache](../quality/ci-hooks-and-cache.md)

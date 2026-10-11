# Mixed Rust + Node Repository (Delegation and a Real Artifact Dependency)

A root Makefile that delegates into Cargo and pnpm/Node separately, and expresses their one real hand-off as an actual Make prerequisite.

A Cargo workspace (`crates/codegen`) and a pnpm package (`packages/web`) sit side by side. The root Makefile does not reimplement either ecosystem's dependency graph; it delegates one call each into `cargo`/`pnpm`, and expresses the cross-ecosystem hand-off — `codegen` writing a file `packages/web` reads — as an actual Make prerequisite edge, not a sibling in a prerequisite list.

```makefile
.PHONY: help setup check generate test build clean

generate:
	cargo run --locked -p codegen -- packages/web/generated/version.json

test: generate
	cargo test --workspace --locked
	pnpm -r run test

build: generate
	cargo build --workspace --locked
	pnpm -r run build
```

Source: [`./projects/mixed/Makefile`](./projects/mixed/Makefile).

## Adoption condition

Use this shape only when a Rust and a Node.js side genuinely share the same repository **and** one side's build artifact is consumed as input by the other — here, `codegen`'s JSON output is read by `packages/web`'s tests. If the two ecosystems are independent (no artifact hand-off), keep `build-rust`/`build-node`-style targets as unordered, unrelated `.PHONY` targets instead of forcing a dependency edge — see [`package-scripts-and-mixed-repos.md`](../references/node/package-scripts-and-mixed-repos.md). Do not use this sample as a template for the general case of "a repo happens to have both Rust and Node code" when nothing actually flows between them.

## Prerequisites

- `cargo`, `rustc` for the `codegen` crate (workspace `Cargo.toml`; no extra dependencies — `codegen` hand-writes its small, fixed-shape JSON output rather than pulling in `serde_json`).
- `pnpm` and Node.js for `packages/web` (`pnpm-workspace.yaml`, `package.json`).

## OS / shell / GNU Make version

- Verified locally: macOS, GNU Make 3.81, cargo/rustc 1.98.1, pnpm 10.32.1, Node v24.13.0.
- Linux: expected to work (all four tools are cross-platform) but not verified in this session.
- Git Bash / native Windows: not verified. The root Makefile's `clean` target runs `node scripts/clean.mjs` and `cargo clean`, neither of which needs a POSIX shell, but the other recipes are not verified there either.

## Usage

Via Make:

```bash
cd projects/mixed
make help       # lists targets; touches nothing (default goal)
make setup       # pnpm install --frozen-lockfile (cargo fetches its own deps lazily)
make check         # cargo check --workspace --locked + pnpm run lint (no generate, no tests)
make generate         # cargo run -p codegen -> packages/web/generated/version.json (always re-runs)
make test               # generate, then cargo test --workspace --locked + pnpm -r run test
make build                 # generate, then cargo build --workspace --locked + pnpm -r run build
make clean                    # node scripts/clean.mjs (node_modules/, dist/, generated/), then cargo clean --target-dir target
```

Without Make (each ecosystem's own direct commands; `generate` has no non-Make Node.js equivalent since it is a Rust-only step whose output is a plain file):

```bash
cd projects/mixed
pnpm install --frozen-lockfile                                   # same as: make setup
cargo check --workspace --locked && pnpm run lint                 # same as: make check
cargo run --locked -p codegen -- packages/web/generated/version.json  # same as: make generate
cargo test --workspace --locked && pnpm -r run test                     # same as: make test (after generate)
cargo build --workspace --locked && pnpm -r run build                     # same as: make build (after generate)
node scripts/clean.mjs && cargo clean --target-dir target                  # same as: make clean
```

## Change target / side effects

- `setup`: `pnpm install --frozen-lockfile` only; Cargo dependency fetch happens lazily on first `cargo` invocation, not during `setup`.
- `check`: read-only beyond Cargo's own `target/` build cache; does not run `generate` and does not run tests. `scripts/lint.mjs packages/web` explicitly skips any `generated/` subdirectory when scanning for `*.mjs` files, so `make check` behaves the same whether or not `packages/web/generated/version.json` currently exists.
- `generate`: overwrites `packages/web/generated/version.json` every invocation — it is intentionally **not** tracked as a Make file target (no rule keyed on that path), so `make test`/`make build` always regenerate it rather than relying on Make's own staleness check for this cross-ecosystem file. See [`package-scripts-and-mixed-repos.md`](../references/node/package-scripts-and-mixed-repos.md) for why a `.PHONY`-to-`.PHONY` ordering edge, not a file-target edge, is this sample's deliberate choice.
- `clean`: `node scripts/clean.mjs` removes `node_modules`, `packages/*/node_modules`, `packages/*/dist` and `packages/web/generated`, then `cargo clean --target-dir target` removes this workspace's own `./target` only (never a shared `CARGO_TARGET_DIR` / `build.target-dir`) — destructive but scoped to these regeneratable paths; nothing under `crates/*/src` or `packages/web/src` is touched. Before deleting anything, `scripts/clean.mjs` checks every candidate (and `./target`): if any path component below the sample root is a symlink or resolves outside it — e.g. `packages/<name>` linked to another checkout, where `rm -rf packages/*/dist` would delete the link target's `dist/` — it deletes nothing and exits 1, so `cargo clean` never runs either.
- `build` (`scripts/build.mjs`): removes and regenerates each package's `dist/`, so a deleted or renamed source file leaves no stale copy. It refuses (exit 2) a package whose real path is outside the sample root (e.g. `packages/<name>` symlinked to another checkout) and a symlinked `dist/`, so the removal never reaches outside the sample.
- `Cargo.lock` is committed with this sample, and the sample's own `.gitignore` re-includes it (`!Cargo.lock`), so a repository that vendors this skill and ignores `Cargo.lock` at its root still commits the sample's lockfile.

## Expected results

- `make setup` then `make test`: `generate` runs first (its `cargo run` output line appears before any `cargo test`/`pnpm` output), then `cargo test --workspace --locked`, then `pnpm -r run test` — in that fixed order, because `test: generate` is a real prerequisite, not a same-line sibling. `packages/web`'s test explicitly asserts on the codegen-produced version string (`web build against codegen vX.Y.Z`), so it fails if `generate` did not run first.
- Deleting `packages/web/generated/version.json` and running `make check` (which does **not** depend on `generate`): `check` still passes or fails purely on `cargo check`/`pnpm run lint`, independent of whether the generated file exists, per `scripts/lint.mjs`'s directory skip list above.
- `make clean` then `make build`: `generate` recreates `packages/web/generated/version.json` before any build step runs.

## Files

- [`./projects/mixed/Makefile`](./projects/mixed/Makefile)
- [`./projects/mixed/Cargo.toml`](./projects/mixed/Cargo.toml)
- [`./projects/mixed/crates/codegen/Cargo.toml`](./projects/mixed/crates/codegen/Cargo.toml)
- [`./projects/mixed/crates/codegen/src/main.rs`](./projects/mixed/crates/codegen/src/main.rs)
- [`./projects/mixed/package.json`](./projects/mixed/package.json)
- [`./projects/mixed/pnpm-workspace.yaml`](./projects/mixed/pnpm-workspace.yaml)
- [`./projects/mixed/packages/web/package.json`](./projects/mixed/packages/web/package.json)
- [`./projects/mixed/packages/web/src/index.mjs`](./projects/mixed/packages/web/src/index.mjs)
- [`./projects/mixed/packages/web/test/index.test.mjs`](./projects/mixed/packages/web/test/index.test.mjs)
- [`./projects/mixed/scripts/lint.mjs`](./projects/mixed/scripts/lint.mjs)
- [`./projects/mixed/scripts/build.mjs`](./projects/mixed/scripts/build.mjs)
- [`./projects/mixed/scripts/clean.mjs`](./projects/mixed/scripts/clean.mjs)

## Related

- [package-scripts-and-mixed-repos](../references/node/package-scripts-and-mixed-repos.md) — Rust+Node mixed-repo responsibility boundaries, `.PHONY`-ordering-edge vs. file-target trade-off
- [responsibility-boundaries](../references/architecture/responsibility-boundaries.md) — each ecosystem keeps its own real processing
- [crate-and-workspace-profiles](../references/rust/crate-and-workspace-profiles.md) — `--locked` usage in `cargo check`/`test`/`build`

## Provenance and local edits

`./projects/mixed/Makefile`'s header comment records this is a `skills/make` sample, the verified toolchain versions, and the design rationale for the `generate` hand-off. If a project adopts this sample, keep an equivalent comment naming the source (`skills/make` sample `mixed`) so a future skill update does not overwrite a project's own additional cross-ecosystem edges without the maintainer noticing.

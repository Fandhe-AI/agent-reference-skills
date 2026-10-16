# Rust (experimental support)

Turborepo can discover the crates in a Cargo workspace as packages, add their dependency relationships to the Package Graph, and map common Turborepo tasks to Cargo commands.

## Usage

Enable in the root `turbo.json`:

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "futureFlags": {
    "experimentalCargoWorkspaces": true
  },
  "tasks": {}
}
```

Prerequisites (repository root):

- `cargo` and `rustc` available on `PATH`
- A root `Cargo.toml` containing a virtual Cargo workspace
- A valid `[workspace.metadata].name` for identity in Turborepo's graph
- A root `Cargo.lock`

Repository structure:

```toml
[workspace]
members = ["crates/*"]
resolver = "2"

[workspace.metadata]
name = "acme-rust"
```

Every `crates/*/Cargo.toml` becomes a package. Three package types:

- Entrypoint crates (`bin`, `cdylib`, or `staticlib` target): expose build, run, and verification tasks.
- Library crates: remain Package Graph nodes so filtering and affectedness follow Rust dependency relationships; expose filtered build and verification tasks. Unfiltered builds prefer entrypoints because Cargo builds their library dependency closures implicitly.
- The root workspace package: uses `[workspace.metadata] name`, depends on every member crate, and runs verification tasks across the whole Cargo workspace.

All three can be targets for `--filter` and `--affected`:

```bash
turbo run build --filter=my-cargo-binary
turbo run test --affected
```

## Options / Props

Built-in tasks:

| Package | Turbo task | Cargo command |
| --- | --- | --- |
| Any crate | `turbo build` | `cargo build --package=<crate> --locked` |
| Entrypoint crate with exactly one binary | `turbo run`, `turbo dev` | `cargo run --package=<crate> --locked` |
| Any crate | `turbo test` | `cargo test --package=<crate> --locked` |
| Any crate | `turbo check` | `cargo check --package=<crate> --locked` |
| Any crate | `turbo lint` | `cargo clippy --package=<crate> --locked` |
| Any crate | `turbo format` | `cargo fmt --package=<crate>` |
| Workspace package | `turbo test` | `cargo test --workspace --locked` |
| Workspace package | `turbo check` | `cargo check --workspace --locked` |
| Workspace package | `turbo lint` | `cargo clippy --workspace --locked` |
| Workspace package | `turbo format` | `cargo fmt --all` |

Passing Cargo flags: arguments after Turborepo's `--` go to the mapped command. Build flags selecting a supported output layout participate in hashing and automatic output detection (`--release`, `--profile=<name>`, `--target=<triple>`, `--target-dir=<dir>`):

```bash
turbo run build -- --release
turbo run build -- --target=aarch64-unknown-linux-gnu
turbo run build -- --target-dir=target-ci
```

`check` accepts Cargo flags directly after `--`. For `run`, `test`, `lint`, and `format`, Turborepo inserts Cargo's second `--`, so the arguments reach the binary, test harness, Clippy, or rustfmt:

```bash
turbo run run --filter=rust-api -- --port 8080
turbo run test --filter=rust-library -- --nocapture
turbo run format -- --check
```

Your own tasks: enable `experimentalTaskCommand` and set the task's `command` (an argument array that runs directly without a shell) to define a task that is not built in or replace a built-in mapping:

```json
{
  "futureFlags": {
    "experimentalCargoWorkspaces": true,
    "experimentalTaskCommand": true
  },
  "tasks": {
    "acme-rust#docs": { "command": ["cargo", "doc", "--workspace", "--locked"] },
    "acme-rust#lint": { "command": ["cargo", "clippy", "--workspace", "--locked", "--", "-D", "warnings"] }
  }
}
```

## Notes

- Rust support is experimental and can change at any time; try it in side projects and proof-of-concepts. Feedback goes to the Rust RFC (vercel/turborepo discussion 13415).
- Zero-configuration hashing uses: the selected crate and a conservative transitive closure of declared local dependency source files (including cycle-closing dev-dependencies); every member crate when verification runs through the workspace package; root Cargo files; relevant Cargo and compiler environment; the resolved external dependency closure from `Cargo.lock`; and the complete `rustc -vV` identity (if it cannot be resolved, tasks stay runnable but implicit caching is disabled with a warning). The built-in `format` also includes `rustfmt.toml`, `.rustfmt.toml`, and `RUSTFMT`; it defaults to uncached because formatting mutates sources.
- Project-specific inputs must be declared manually: environment variables read by build scripts go in `env`; extra file inputs go in `inputs` (use `$TURBO_DEFAULT$` to keep the defaults).
- Files read from outside the crate and its local dependency crates are not default inputs, e.g. `include_str!` / `include_bytes!` / `include!` with a path leaving the crate (such as `include_str!("../../shared/schema.json")` or a path built from `env!("CARGO_MANIFEST_DIR")`), `#[path = "..."]` modules outside the crate, and build scripts reading files elsewhere (these also need `cargo:rerun-if-changed` for Cargo itself). Without a declaration, editing them does not change the hash and the previous result is restored from cache. Declare them on every task that compiles the crate (its dependents' tasks and workspace-wide `test` / `check` / `lint` included), e.g. `"inputs": ["$TURBO_DEFAULT$", "$TURBO_ROOT$/shared/schema/**"]` on `build`, `test`, `check`, `lint`. In a repository with JavaScript packages, task-wide keys apply to those too (safe but extra cache misses); use `<package>#<task>` entries to avoid that.
- Explicit input globs hash files from the filesystem, including gitignored ones, so keep them narrow (a whole-package glob also picks up `.turbo` logs, `node_modules`, and build output). To find the files, read the `.d` dep-info file Cargo writes next to each build artifact (e.g. `target/debug/my-crate.d`); it exists only after Cargo actually compiled the crate, not after a cache restore.
- Output caching: automatic caching stores only the exact final `bin` / `cdylib` / `staticlib` deliverables, not Cargo's incremental `target/` state, and uses no profile or target wildcards. Library builds default to `cache: false`; enabling requires an explicit `cache: true` (configure `outputs` as needed; `outputs` alone does not override the uncached default). Resolved layouts: the default `debug` profile, `--release`, built-in profile aliases, ordinary custom `--profile=<name>` directories; the host target, a supported `--target=<triple>`, or a supported `CARGO_BUILD_TARGET`; an in-repository target directory selected in order by `--target-dir`, `CARGO_TARGET_DIR`, or Cargo metadata (including repository `.cargo/config` `target-dir`).
- Keep the `turbo` version consistent across environments (experimental feature).

## Related

- [Python (experimental support)](./python-experimental.md)
- [Go (experimental support)](./go-experimental.md)
- [Multi-language support](../guides/multi-language.md)

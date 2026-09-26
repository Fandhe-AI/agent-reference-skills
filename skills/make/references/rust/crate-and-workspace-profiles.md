---
source:
  - https://doc.rust-lang.org/cargo/reference/workspaces.html
  - https://doc.rust-lang.org/cargo/commands/cargo-build.html
  - https://doc.rust-lang.org/cargo/commands/cargo-doc.html
  - https://doc.rust-lang.org/cargo/commands/cargo-test.html
  - https://doc.rust-lang.org/cargo/reference/features.html
  - https://doc.rust-lang.org/cargo/faq.html
  - https://doc.rust-lang.org/cargo/commands/cargo-metadata.html
---

# Crate and Workspace Profiles

Cargo project shapes (single library, single binary, root-package workspace, virtual workspace)
determine which command flags are needed and what "build everything" means. Do not translate
Make targets into Cargo commands without first identifying the shape.

## Signature / Usage

```bash
# Identify the shape first (read-only, does not modify Cargo.lock or fetch anything new
# beyond what a normal build already requires)
cargo metadata --format-version=1 --no-deps

# Single package manifest ([package], no [workspace] members) — builds only that package
cargo build

# Workspace root manifest with [package] (root package workspace) — builds only the root
# package unless told otherwise
cargo build
cargo build --workspace          # all members
cargo build -p some-member       # one explicit member

# Virtual workspace ([workspace] only, no [package]) — builds default-members
# (all members unless workspace.default-members narrows it)
cargo build
```

### Crate / Workspace Shapes (Source-backed behavior)

| Shape | Manifest structure | `cargo build` with no flags targets |
| --- | --- | --- |
| Single library crate | `[package]`, no `[workspace]` | that package |
| Single binary crate | `[package]`, no `[workspace]` | that package |
| Root-package workspace | `[workspace]` + `[package]` in the same `Cargo.toml` | the root package only; other members need `-p` / `--workspace` |
| Virtual workspace | `[workspace]` only, no `[package]` | `workspace.default-members` (all members if unset) |

- `[workspace] members = [...]` lists member paths/globs; all path dependencies inside the
  workspace automatically become members too.
- `[workspace] default-members = [...]` narrows what "no explicit package flag" operates on.
  In a virtual workspace this defaults to all members; in a root-package workspace the
  default is the root package only.
- A virtual workspace's `[workspace]` table must set `resolver` explicitly (there is no
  `package.edition` to infer it from).

Source: https://doc.rust-lang.org/cargo/reference/workspaces.html (Cargo Book, "Workspaces",
confirmed 2026-09-26; version-independent workspace mechanics, not tied to a specific Cargo release).

### fmt / clippy / build / test / doc — what each actually covers

| Command | Scope | Notes |
| --- | --- | --- |
| `cargo fmt` | Source formatting only | Provided by `rustfmt`, a separate first-party component invoked as a Cargo subcommand. Does not compile or lint. Not part of the Cargo Book; not sourced here in detail — treat as a capability to detect (is `rustfmt` installed / is there a `rustfmt.toml`), not to re-document. |
| `cargo clippy` | Extended lints on top of `rustc` | Provided by `clippy`, a separate first-party component. Not part of the Cargo Book either. Treat as a capability to detect (is the `clippy` component installed via rustup). |
| `cargo build` | Compiles binary/library targets (`--lib --bins` by default) | Does **not** compile `--tests` / `--benches` / `--examples` unless requested; does not run fmt or clippy. |
| `cargo test` (no flags) | Compiles+runs unit tests (in `--lib`/`--bins`), integration tests (`tests/`), doctests, and compiles examples | See breakdown below — this is the "everything" default, and it is *not* the same set as `--all-targets`. |
| `cargo doc` | Builds rustdoc HTML into `target/doc` for the local package (+ deps unless `--no-deps`) | Does **not** run doctests. Doc *building* and doc *testing* are two separate commands even though both read the same `///` comments. |

Source: https://doc.rust-lang.org/cargo/commands/cargo-build.html and
https://doc.rust-lang.org/cargo/commands/cargo-doc.html (Cargo Book, confirmed 2026-09-26).
`fmt`/`clippy` scope statements above are general knowledge of the toolchain's component split,
not transcribed from the Cargo Book — no Cargo Book URL is claimed for those two rows.

### `cargo test --all-targets` does not include doctests

This is the most common false assumption when wiring Make/CI around `cargo test`.

- `--all-targets` is documented as exactly equivalent to
  `--lib --bins --tests --benches --examples`. Doctests are not in that list.
- Doctests are handled separately by `rustdoc`, which extracts code blocks from library doc
  comments and compiles+runs each as its own executable.
- Plain `cargo test` (no target-selection flags) *does* include doctests by default, alongside
  unit tests, integration tests, and compile-checking examples.
- To run **only** doctests: `cargo test --doc` (cannot be combined with other target flags).

**Design guidance**: a verification pipeline that runs `cargo test --all-targets` believing it
covers "everything" silently skips doctests. If doctests matter for the crate (public API with
documented examples), run both, or run plain `cargo test` and treat `--all-targets` only as a
narrower "skip doctests, e.g. for a faster loop" option — do not treat the two as redundant.

```bash
# Covers unit + integration + doctests + example compile-check, in one call
cargo test

# Explicit two-call form if you want --all-targets' faster non-doctest loop
# plus a guaranteed separate doctest pass
cargo test --all-targets
cargo test --doc
```

Source: https://doc.rust-lang.org/cargo/commands/cargo-test.html (Cargo Book, confirmed 2026-09-26).

### Feature combinations: default features, `--no-default-features`, `--all-features`

- Cargo activates the `default` feature set unless `--no-default-features` is passed.
- `--all-features` activates every feature of every package selected on the command line.
- Feature unification: when multiple workspace members depend on the same crate with different
  feature sets, Cargo builds that dependency once with the **union** of all requested features.
  Features are expected to be additive (enabling one must not disable functionality), so
  unification does not, by itself, invalidate feature testing — but it does mean a workspace-wide
  `--all-features` build activates features that no single member requests alone.
- The Cargo Book explicitly notes that feature combinations grow exponentially and that, by
  default, tests/docs/tooling only run against the default feature set — full combinatorial
  coverage is called out as generally impractical.

**Design guidance (why not to default to `--all-features`)**: `--all-features` proves that *all
features compile and pass tests together*; it does not prove that any single realistic
consumer configuration (default features, or one deliberately chosen combination) works,
and workspace feature unification can mask a feature that is broken when built alone. A
verification profile should state, explicitly, which of the following it checks — this skill
does not mandate one over another, only that the choice is made and recorded in the profile:

1. Default features (`cargo build` / `cargo test` with no feature flags) — the common consumer path.
2. `--no-default-features` (+ `--features <minimal-set>` if the crate cannot compile with zero
   features) — validates the floor.
3. `--all-features` — validates the ceiling (everything compiles/tests together); does not
   validate any single mid-size combination.
4. Named feature combinations that are known to matter (e.g. mutually exclusive backends) —
   these must be enumerated manually; Cargo does not discover them.

Source: https://doc.rust-lang.org/cargo/reference/features.html (Cargo Book, "Features",
confirmed 2026-09-26).

### capability gating: no_std, WASM, OS-specific backends

Treat `no_std`, WASM targets, and OS/CPU-specific backends (e.g. a crate with a Linux-only
module gated by `cfg(target_os = "linux")`) as **capabilities to detect**, not defaults to
assume:

- A crate/workspace may only compile for a subset of targets; `cargo build --target <triple>`
  makes the target explicit rather than relying on the host triple.
- A capability not available in the current environment (no cross toolchain installed, no OS
  runner for a given `cfg(target_os = ...)` path) must be reported as SKIPPED / NOT_APPLICABLE,
  never silently treated as PASS. See `references/architecture/command-contracts.md` for how
  this skill's own scripts express that distinction (Design guidance — not a Cargo Book rule).

### `Cargo.lock` policy — do not assume "library ⇒ no lockfile"

- `cargo new` defaults to tracking `Cargo.lock` in version control regardless of package kind.
- The Cargo Book states plainly that whether to commit `Cargo.lock` "is dependent on the needs
  of your package" — it does not issue a blanket library-vs-binary rule.
- For a library specifically, the Book notes a limitation worth keeping in mind: `Cargo.lock`
  only pins the versions used *when building this repository itself*; it has no effect on
  downstream consumers, who resolve against `Cargo.toml` version constraints. `cargo install`
  ignores the lockfile unless `--locked` is passed, and newly added dependencies are locked to
  latest-at-add-time regardless of package kind.

**Design guidance**: this skill does not tell a library maintainer to delete an existing,
intentionally-committed `Cargo.lock`. Respect whatever the repository already does; if asked to
set up lockfile policy from scratch, present the trade-off above rather than asserting a rule
the Cargo Book does not state.

Source: https://doc.rust-lang.org/cargo/faq.html
(section "Why have `Cargo.lock` in version control?", confirmed 2026-09-26).

## Options / Props

### `--locked` / `--offline` / `--frozen`

| Flag | Effect |
| --- | --- |
| `--locked` | Asserts `Cargo.lock` is present and matches; errors out instead of silently re-resolving if it would need to change. Used for deterministic CI builds. |
| `--offline` | Cargo will not touch the network at all; uses only locally cached crates, potentially resolving differently than an online run would. |
| `--frozen` | Equivalent to `--locked` + `--offline` together. |

These flags check for change/network access; none of them modify `Cargo.lock` or fetch new
data, and none of them substitute for actually running `cargo fetch` ahead of an offline step.

Source: https://doc.rust-lang.org/cargo/commands/cargo-metadata.html
(flags documented for `cargo metadata`; the same three flags carry the same meaning across
other Cargo subcommands per the Cargo Book's shared option reference; confirmed 2026-09-26).

## Notes

- `cargo metadata` itself is read-only JSON output — it does not write to `Cargo.lock` or any
  other file — but it can still touch the network to resolve dependencies unless run with
  `--offline`/`--frozen`. Static repository inspection (as done by this skill's audit scripts)
  and an actual `cargo metadata` invocation are two different steps; do not conflate "we looked
  at Cargo.toml" with "we ran cargo metadata" in a report.
- Do not assume every environment's `cargo` supports every flag shown here at the same version;
  cross-check against the project's declared `rust-version` / `rust-toolchain.toml` before
  relying on newer flags in a generated command.

## Related

- [xtask and Validation](./xtask-and-validation.md)
- [Command Contracts](../architecture/command-contracts.md) (this skill's own `check`/`verify` contract design)

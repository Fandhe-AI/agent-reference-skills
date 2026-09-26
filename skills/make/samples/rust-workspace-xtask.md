# Rust Virtual Workspace + xtask (No Make Layer)

A virtual Cargo workspace whose automation entry point is `cargo xtask`, a plain Cargo alias — deliberately with no Makefile at all.

Two product crates (`wsx-core`, `wsx-cli`) plus a `std`-only `xtask` binary crate provide `build`/`test`/`check` tasks. `.cargo/config.toml` defines `[alias] xtask = "run --package xtask --"`, so `cargo xtask <task>` expands to `cargo run --package xtask -- <task>` — no shell wrapper, no separately installed tool.

```rust
// xtask/src/main.rs — dispatch on the task name, forward the rest as an argv
match task.as_str() {
    "build" => delegate("build", &forwarded_args),
    "test" => delegate("test", &forwarded_args),
    "check" => delegate("check", &forwarded_args),
    ...
}
```

Source: [`./projects/rust-workspace-xtask/xtask/src/main.rs`](./projects/rust-workspace-xtask/xtask/src/main.rs) (alias definition: [`./projects/rust-workspace-xtask/.cargo/config.toml`](./projects/rust-workspace-xtask/.cargo/config.toml)).

## Adoption condition

Use `cargo xtask` (instead of a Makefile) when the workspace needs OS-portable automation — in particular native-Windows support — without depending on a POSIX shell, per the decision table in [`xtask-and-validation.md`](../references/rust/xtask-and-validation.md). Do not adopt it for a single simple crate where plain `cargo` commands already suffice (see [`rust-crate.md`](./rust-crate.md)), and do not add a Makefile on top of a working `cargo xtask` setup unless a real cross-ecosystem hand-off (e.g. to Node, see [`mixed.md`](./mixed.md)) needs a single root entry point spanning both.

## Prerequisites

- `cargo`, `rustc` on `PATH`. No additional dependency: `xtask/Cargo.toml` has an empty `[dependencies]` table — the crate only uses `std::process::Command` and `std::env`.
- No Make, no shell script, no separately-installed tool.

## OS / shell / GNU Make version

- Verified locally: macOS, cargo/rustc 1.98.1.
- Linux: expected to work unchanged (plain `cargo`, no shell dependency) but not verified in this session.
- Native Windows: **designed for, not verified.** `xtask/src/main.rs`'s own module doc states this explicitly — it uses only `std::process::Command` with an explicit argument vector (no `sh`/`bash` spawned, no forward-slash-only path assumption), which is why native Windows support is *expected*, but it has not actually been run there.
- GNU Make is not a dependency of this sample at all — there is no Makefile here by design.

## Verification

Run 2026-09-26 on macOS, cargo/rustc 1.98.1, GNU Make 3.81, from a copy of `skills/make/samples/projects/rust-workspace-xtask/` in a scratchpad directory with `target/` removed beforehand (clean-build run).

| Command | Exit code | Note |
| --- | --- | --- |
| `cargo xtask build` | 0 | |
| `cargo xtask test` | 0 | |
| `cargo xtask check` | 0 | |
| `cargo xtask bogus` (unknown task) | 2 | usage error; `cargo` subcommand not started |
| `cargo xtask test` after appending a failing `#[test] fn injected_failure() { assert_eq!(1, 2); }` to `crates/core/src/lib.rs` | 101 | failure propagated, not converted to success |

This confirms the exit-code contract described in [Change target / side effects](#change-target--side-effects): a clean workspace passes through `build`/`test`/`check`, an unrecognized task exits `2` without invoking `cargo`, and a genuine test failure inside a delegated `cargo test` propagates as a non-zero exit (`101`, the standard Rust test-harness failure code) rather than being swallowed. Linux and native Windows remain unverified — see the [OS / shell / GNU Make version](#os--shell--gnu-make-version) section above.

## Usage

There is no `make` entry point in this sample. The two equivalent direct forms:

```bash
cd projects/rust-workspace-xtask
cargo xtask build     # == cargo run --package xtask -- build
cargo xtask test       # == cargo run --package xtask -- test
cargo xtask check       # == cargo run --package xtask -- check
cargo xtask help         # prints usage; does not invoke cargo
cargo run -p xtask -- test -- --nocapture   # extra args forwarded verbatim after `--`
```

Each task delegates to exactly one `cargo <subcommand> --workspace --exclude xtask` invocation against the product crates (`crates/core` as `wsx-core`, `crates/cli` as `wsx-cli`); `xtask` itself is excluded so automation never recompiles/tests itself as a side effect of testing the product.

## Change target / side effects

- `cargo xtask build` / `test` / `check`: writes only to the workspace's own `target/` (shared by all members, since `xtask` is a workspace member sharing one `Cargo.lock`). No source files are rewritten.
- `xtask` is a workspace member (so `cargo build -p xtask` / `cargo test -p xtask` work directly) but is **excluded from `default-members`** — a bare `cargo build`/`cargo test`/`cargo check` run from the workspace root (no `-p`/`--workspace` flag) only touches `crates/core` and `crates/cli`, never the xtask crate itself. See the trade-off recorded in `./projects/rust-workspace-xtask/Cargo.toml`'s `[workspace]` comment: this means a plain root `cargo test` will not catch a broken `xtask`; its own correctness is exercised via `cargo xtask build/test/check` and, if needed, `cargo test -p xtask` directly.
- Exit code propagation: the `xtask` process exits with the delegated `cargo` subprocess's own exit code — never silently maps a failure to success. An unrecognized/missing task exits `2` without invoking `cargo`; failure to launch `cargo` itself exits `127`; a signal-killed child (Unix-only) maps to `1`.

## Expected results

- `cargo xtask build`/`test`/`check` on a clean workspace: same pass/fail and exit code as running the equivalent `cargo <subcommand> --workspace --exclude xtask` directly (they are the same invocation).
- `cargo xtask <unknown>`: prints `xtask: unknown task '<unknown>'` plus usage to stderr, exit code 2.
- `cargo xtask` (no task name): prints `xtask: missing <task> argument` plus usage, exit code 2.
- `cargo test -p xtask`: runs `xtask`'s own unit tests (`to_exit_code` range/never-success-on-failure checks) — these are compile-time/logic checks only, not subprocess integration tests.

## Files

- [`./projects/rust-workspace-xtask/Cargo.toml`](./projects/rust-workspace-xtask/Cargo.toml)
- [`./projects/rust-workspace-xtask/.cargo/config.toml`](./projects/rust-workspace-xtask/.cargo/config.toml)
- [`./projects/rust-workspace-xtask/xtask/Cargo.toml`](./projects/rust-workspace-xtask/xtask/Cargo.toml)
- [`./projects/rust-workspace-xtask/xtask/src/main.rs`](./projects/rust-workspace-xtask/xtask/src/main.rs)
- [`./projects/rust-workspace-xtask/crates/core/Cargo.toml`](./projects/rust-workspace-xtask/crates/core/Cargo.toml)
- [`./projects/rust-workspace-xtask/crates/cli/Cargo.toml`](./projects/rust-workspace-xtask/crates/cli/Cargo.toml)

## Related

- [xtask-and-validation](../references/rust/xtask-and-validation.md) — cargo-xtask pattern, official non-endorsement, Windows considerations
- [crate-and-workspace-profiles](../references/rust/crate-and-workspace-profiles.md) — virtual workspace, `default-members`
- [selection-and-migration](../references/architecture/selection-and-migration.md) — Make vs. xtask vs. just/Task selection

## Provenance and local edits

`xtask/src/main.rs`'s module doc records this is a `skills/make` sample (see its own verification-environment note) and explains the exit-code design rationale in place, so a reader does not need to guess why `to_exit_code` exists. If this sample is copied into a real workspace, keep an equivalent note naming the source (`skills/make` sample `rust-workspace-xtask`) so local extensions to the task dispatch are distinguishable from the sample's own baseline logic on a future diff.

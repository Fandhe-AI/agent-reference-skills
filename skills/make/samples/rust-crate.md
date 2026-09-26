# Rust Crate (Thin Makefile over Bash Scripts and Cargo)

A small, Node-free library crate where the Makefile is a thin, optional entry point over `scripts/*.sh` and plain `cargo` commands.

Every target is a one-line delegation to a `scripts/*.sh` file or a plain `cargo` invocation, never a second definition of what those already do.

```makefile
.DEFAULT_GOAL := help

.PHONY: help doctor check verify build test clean

check: ## cargo fmt --check + cargo clippy, no auto-fix. Direct: scripts/check.sh
	@scripts/check.sh

verify: ## Required verification suite (test --all-targets + test --doc). Direct: scripts/verify.sh
	@scripts/verify.sh
```

Source: [`./projects/rust-crate/Makefile`](./projects/rust-crate/Makefile).

## Adoption condition

Use when a single library crate wants one memorable, OS-portable command set (`make check`, `make verify`, ...) shared by a developer shell, a Git hook, and CI, while keeping Cargo as the actual build/test graph owner. Do **not** adopt this if the crate already only needs the four or five direct `cargo` commands documented in a README and no drift between callers has been observed — see the trade-off table in [`selection-and-migration.md`](../references/architecture/selection-and-migration.md). For a multi-crate workspace or a need for native-Windows-safe orchestration, see [`rust-workspace-xtask.md`](./rust-workspace-xtask.md) instead.

## Prerequisites

- `cargo`, `rustc` on `PATH`.
- `rustfmt` and `clippy` cargo components (checked by `scripts/doctor.sh`, never installed by it).
- Bash (`scripts/*.sh` shebang is `#!/usr/bin/env bash`); each script's `set -euo pipefail` requires real Bash, not POSIX `sh`.

## OS / shell / GNU Make version

- Verified locally: macOS, GNU Make 3.81, cargo/rustc 1.98.1.
- Linux: expected to work (Bash and `cargo` are both present in typical setups) but not verified in this session.
- Git Bash: the `.sh` scripts should run under Git Bash's Bash, but this has not been verified.
- Native Windows without a Bash-compatible shell: **not supported** — `make check` etc. invoke `scripts/*.sh` directly, which requires a shell that understands the `#!/usr/bin/env bash` shebang. Use `cargo fmt`/`cargo clippy`/`cargo test` directly on native Windows without Bash (see "Usage" below for the exact commands each script wraps).

## Usage

Via Make:

```bash
cd projects/rust-crate
make help      # lists targets and their direct (non-Make) equivalents
make doctor    # environment diagnosis only; never installs/repairs
make check     # cargo fmt --check + cargo clippy; never rewrites source
make verify    # cargo test --all-targets + cargo test --doc
make build     # cargo build
make test      # cargo test
make clean     # cargo clean
```

Without Make (every target has a direct entry point; `scripts/help.sh` is a hand-maintained, Make-independent listing of the same operations):

```bash
cd projects/rust-crate
./scripts/doctor.sh   # same as: make doctor
./scripts/check.sh    # same as: make check
./scripts/verify.sh   # same as: make verify
cargo build            # same as: make build
cargo test              # same as: make test
cargo clean              # same as: make clean
```

## Change target / side effects

- `doctor.sh`: read-only; reports found/missing tools, exits non-zero if `cargo`/`rustc`/`rustfmt`/`clippy` is missing. Never installs anything.
- `check.sh`: `cargo fmt --all -- --check` and `cargo clippy --all-targets -- -D warnings`; neither rewrites source. A formatting or lint failure is reported via non-zero exit, not auto-fixed.
- `verify.sh`: runs `cargo test --all-targets` (unit + integration, **excludes doctests** — a documented `cargo` behavior) and `cargo test --doc` separately, so doctests are never silently skipped. Writes to `target/` only.
- `clean`: `cargo clean` — removes `target/` only, nothing under `src/` or `tests/`.
- All scripts reject any positional argument (`scripts/lib.sh`'s `reject_args`), exiting 2 (usage error) rather than silently ignoring unknown input.

## Expected results

- `make doctor` on a machine with a complete toolchain: one `ok   <tool>: <version>` line per tool, exit code 0.
- `make doctor` with a missing component (e.g. no `clippy`): one `miss cargo-clippy: ...` line, exit code 1 — `make check`/`make verify` would then fail at the same step.
- `make check` / `make verify` on clean source: exit code 0, no files under `src/`/`tests/` modified.
- `make clean` then `make build`: `target/` is regenerated from scratch.

## Files

- [`./projects/rust-crate/Makefile`](./projects/rust-crate/Makefile)
- [`./projects/rust-crate/scripts/help.sh`](./projects/rust-crate/scripts/help.sh)
- [`./projects/rust-crate/scripts/doctor.sh`](./projects/rust-crate/scripts/doctor.sh)
- [`./projects/rust-crate/scripts/check.sh`](./projects/rust-crate/scripts/check.sh)
- [`./projects/rust-crate/scripts/verify.sh`](./projects/rust-crate/scripts/verify.sh)
- [`./projects/rust-crate/scripts/lib.sh`](./projects/rust-crate/scripts/lib.sh)
- [`./projects/rust-crate/Cargo.toml`](./projects/rust-crate/Cargo.toml)
- [`./projects/rust-crate/src/lib.rs`](./projects/rust-crate/src/lib.rs)
- [`./projects/rust-crate/tests/integration.rs`](./projects/rust-crate/tests/integration.rs)

## Related

- [command-contracts](../references/architecture/command-contracts.md) — help/doctor/check/verify contract shape
- [crate-and-workspace-profiles](../references/rust/crate-and-workspace-profiles.md) — `--all-targets` vs. doctests, single-crate profile
- [selection-and-migration](../references/architecture/selection-and-migration.md) — when a thin Makefile is (not) worth adopting

## Provenance and local edits

`./projects/rust-crate/Makefile`'s header comment and each `scripts/*.sh`'s own header record that these are `skills/make` sample files and what each one wraps. If a project copies this sample, keep an equivalent comment naming the source (`skills/make` sample `rust-crate`) at the top of the copied `Makefile`/scripts, and treat any local edits as the project's own from that point — this skill never re-applies or overwrites files outside `skills/make/`, so nothing here will silently revert a local customization.

# rust-crate sample: Make as a thin, optional entry point over the
# real source of truth (scripts/*.sh and plain `cargo` commands, listed
# in scripts/help.sh). No target here redefines what its script does;
# each recipe is a one-line call.
#
# Verified with GNU Make 3.81. No 3.82+ features are used.
#
# `make help` generates its listing from the "## " recipe comments
# below via awk, so it always reflects this file's actual target
# names (a target without a "## " comment simply does not appear in
# the listing). scripts/help.sh is a separate, hand-maintained
# Make-independent listing of the same operations; nothing
# automatically keeps the two in sync, so update both when a target
# changes.

.DEFAULT_GOAL := help

.PHONY: help doctor check verify build test clean

help: ## Show this help (see scripts/help.sh for the Make-independent equivalent)
	@awk 'BEGIN {FS = ":.*## "} /^[a-zA-Z0-9_-]+:.*## /{printf "  make %-8s %s\n", $$1, $$2}' $(firstword $(MAKEFILE_LIST))

doctor: ## Diagnose the environment only, no install/repair. Direct: scripts/doctor.sh
	@scripts/doctor.sh

check: ## cargo fmt --check + cargo clippy, no auto-fix. Direct: scripts/check.sh
	@scripts/check.sh

verify: ## Required verification suite (test --all-targets + test --doc). Direct: scripts/verify.sh
	@scripts/verify.sh

build: ## cargo build. Direct: cargo build
	cargo build

test: ## cargo test (unit + integration only; see verify for doctests too). Direct: cargo test
	cargo test

# `cargo clean` alone would wipe CARGO_TARGET_DIR / build.target-dir when that points at a directory
# shared with other worktrees. `--target-dir target` limits it to this crate's own ./target, and a
# symlinked target/ is refused rather than followed.
clean: ## Remove this crate's own target/ only (never a shared CARGO_TARGET_DIR). Direct: cargo clean --target-dir target
	@if [ -L target ]; then echo "error: target/ is a symlink (possibly a shared build directory); refusing to clean" >&2; exit 1; fi
	cargo clean --target-dir target

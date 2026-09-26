# mixed sample: Rust (cargo) + Node (pnpm) in one repo
#
# Each ecosystem keeps its own real processing in its own ecosystem: Cargo
# owns the Rust dependency graph and incremental compilation, pnpm/Node
# scripts own the Node side. This root Makefile is only an integration
# entry point -- it does not reimplement Cargo's or pnpm's dependency
# graphs, and every target below is one call into `cargo` or `pnpm`.
#
# The one real cross-ecosystem hand-off is `generate`: the `codegen` Rust
# binary writes packages/web/generated/version.json, which
# @make-sample/web reads. `build` and `test` depend on `generate` as a
# single explicit prerequisite (a real dependency edge), not as a sibling
# in a prerequisite list -- see skill references: node/package-scripts-and-
# mixed-repos.md on why sibling prerequisites do not guarantee order.
#
# Verified with GNU Make 3.81, cargo/rustc 1.98.1, pnpm 10.32.1, Node
# v24.13.0.
#
# Prerequisite: run `make setup` once (or after pulling changes to
# pnpm-lock.yaml / Cargo.lock) before check/test/build.
#
# Targets:
#   make / make help  - list targets (default goal; does not touch anything)
#   make setup         - pnpm install --frozen-lockfile (cargo fetches its
#                          own deps lazily on first build/check/test)
#   make check          - cargo check --workspace --locked + pnpm run lint
#                          (does not run tests or the Node->Rust hand-off)
#   make generate        - cargo run -p codegen -> packages/web/generated/version.json
#                          (always re-runs; this sample does not track it
#                          as a Make file target, see mixed.md for why)
#   make test            - generate, then cargo test --workspace --locked
#                          + pnpm -r run test
#   make build           - generate, then cargo build --workspace --locked
#                          + pnpm -r run build
#   make clean           - remove ./target + node_modules/, dist/,
#                          generated/ (destructive: only these
#                          regeneratable paths)

.DEFAULT_GOAL := help

.PHONY: help setup check generate test build clean

help:
	@echo "mixed sample targets:"
	@echo "  setup     pnpm install --frozen-lockfile"
	@echo "  check     cargo check --workspace --locked + pnpm run lint"
	@echo "  generate  cargo run -p codegen -> packages/web/generated/version.json"
	@echo "  test      generate, then cargo test + pnpm -r run test"
	@echo "  build     generate, then cargo build + pnpm -r run build"
	@echo "  clean     remove ./target (never a shared CARGO_TARGET_DIR) + node_modules/, dist/, generated/"

setup:
	pnpm install --frozen-lockfile

check:
	cargo check --workspace --locked
	pnpm run lint

generate:
	cargo run --locked -p codegen -- packages/web/generated/version.json

test: generate
	cargo test --workspace --locked
	pnpm -r run test

build: generate
	cargo build --workspace --locked
	pnpm -r run build

# `--target-dir target` keeps `cargo clean` away from a shared CARGO_TARGET_DIR / build.target-dir;
# a symlinked target/ is refused rather than followed.
clean:
	@if [ -L target ]; then echo "error: target/ is a symlink (possibly a shared build directory); refusing to clean" >&2; exit 1; fi
	cargo clean --target-dir target
	rm -rf node_modules packages/*/node_modules packages/*/dist packages/web/generated

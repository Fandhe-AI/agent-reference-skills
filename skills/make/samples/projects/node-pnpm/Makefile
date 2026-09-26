# node-pnpm sample
#
# package.json / pnpm scripts are the source of truth for this sample's
# dev commands (see skill references: node/package-scripts-and-mixed-repos.md
# and architecture/responsibility-boundaries.md). This Makefile is a thin,
# non-destructive entry point: every target below delegates to a `pnpm run
# <script>` defined once in package.json (root or per-package), so a
# contributor without `make` reaches the exact same command directly
# (see each target's comment for the pnpm-only equivalent). Make does not
# reimplement pnpm's workspace dependency graph or Turborepo's task graph.
#
# Verified with GNU Make 3.81, pnpm 10.32.1, Node v24.13.0.
#
# Prerequisite: run `make setup` once (or after pulling changes to
# pnpm-lock.yaml) before lint/test/build/check.
#
# Targets:
#   make / make help  - list targets (default goal; does not touch anything)
#   make setup         - pnpm install --frozen-lockfile
#   make lint           - pnpm run lint            (node scripts/lint.mjs)
#   make test           - pnpm run test            (pnpm -r run test)
#   make build          - pnpm run build           (pnpm -r run build)
#   make check          - pnpm run check           (lint + test)
#   make turbo-build     - pnpm run turbo:build     (turbo run build)
#   make turbo-check     - pnpm run turbo:check     (turbo run lint test)
#   make clean          - remove node_modules/ and packages/*/dist/
#                          (destructive: only these regeneratable dirs)

.DEFAULT_GOAL := help

.PHONY: help setup lint test build check turbo-build turbo-check clean

help:
	@echo "node-pnpm sample targets:"
	@echo "  setup        pnpm install --frozen-lockfile"
	@echo "  lint         pnpm run lint"
	@echo "  test         pnpm run test"
	@echo "  build        pnpm run build"
	@echo "  check        pnpm run check (lint + test)"
	@echo "  turbo-build  pnpm run turbo:build (requires setup)"
	@echo "  turbo-check  pnpm run turbo:check (requires setup)"
	@echo "  clean        remove node_modules/ and packages/*/dist/"

setup:
	pnpm install --frozen-lockfile

lint:
	pnpm run lint

test:
	pnpm run test

build:
	pnpm run build

check:
	pnpm run check

turbo-build:
	pnpm run turbo:build

turbo-check:
	pnpm run turbo:check

clean:
	rm -rf node_modules packages/*/node_modules packages/*/dist .turbo

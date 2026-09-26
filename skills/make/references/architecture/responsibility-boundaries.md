---
source: https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html
---

# Responsibility Boundaries

How to decide what a `Makefile` in a given repository is *for*, and how to avoid duplicating work that another tool already owns.

## Source-backed behavior

GNU Make manual, Edition 0.77 (documents GNU `make` version 4.4.1), confirmed 2026-09-26.

- A target is either a **file target** (the recipe's job is to produce a file with that exact name) or a **phony target**: "A phony target is one that is not really the name of a file; rather it is just a name for a recipe to be executed when you make an explicit request." (`Phony-Targets.html`)
- If a recipe does not actually create the file named by the target, "the recipe will be executed every time the target comes up for remaking" — and conversely, if an unrelated file with the same name as a phony target's name ever appears, "the `clean` target will not work properly... clean would always be considered up to date and its recipe would not be executed" unless declared `.PHONY`. (`Phony-Targets.html`; Make's timestamp-based up-to-date check for real file targets is covered in `../fundamentals/rules-and-prerequisites.md`, not this page.)
- Cargo, independently, already centralizes dependency and build-graph management for a workspace: "All packages share a common `Cargo.lock` file... All packages share a common output directory, which defaults to a directory named `target` in the workspace root" (Cargo Book, `reference/workspaces.html`, confirmed 2026-09-26). Cargo's `target/` directory also carries per-artifact dep-info files that "indicate all of the file dependencies required to rebuild the artifact" (Cargo Book, `reference/build-cache.html`, confirmed 2026-09-26) — a second, independent staleness tracker from Make's mtime-based one, and a different bookkeeping mechanism even though both ultimately key off file mtimes.

These two facts together are the basis for the design guidance below: Make's file-target mechanism and Cargo's/Turborepo's own graph mechanisms solve the same class of problem (what is stale, what needs rebuilding) using different bookkeeping, and running both over the same artifacts produces two sources of truth that can disagree.

## Design guidance

**Core principle: entry points can be plural, but the definition of the real work is singular.** A developer may reach a task via `make test`, `cargo test` directly, an IDE run button, a Git hook, or CI — but exactly one of these should own the actual command, flags, and environment setup; everything else calls into it.

### Two roles a Makefile can play

| Role | When it fits | What it must not do |
| --- | --- | --- |
| **Dependency source-of-truth** (file targets, real prerequisites, incremental build) | The project's real build graph is *not* already owned by another tool — e.g. a collection of loosely-related generated files (docs, data pipelines, asset compilation) with no existing build system. | Re-implement a dependency graph that Cargo, Turborepo, or another package-level build tool already computes for the same artifacts. |
| **Thin entry point** (phony targets only, `.PHONY: help test build ...`) | The project already has a real build/test tool (Cargo, pnpm/Turborepo, a language-native test runner) and the Makefile exists only to give humans and CI one memorable, discoverable set of names. | Encode its own notion of "is this stale" — it should always re-invoke the underlying tool, which will do its own staleness check. |

Adoption condition: pick the "thin entry point" role by default for any project that already has Cargo or a JS package manager with scripts; reserve "dependency source-of-truth" for build steps genuinely outside those ecosystems (e.g. a `data/report.pdf: data/report.md pandoc.yaml` pipeline that neither Cargo nor Turborepo knows about). Trade-off: a thin Makefile adds one indirection layer (a `make test` that just shells out) — that overhead is worth it only if it demonstrably reduces the number of commands a contributor has to memorize; if nobody types `make test` and everybody types `cargo test` directly, the Makefile is dead weight and should be deleted rather than maintained in parallel.

### Call direction

Design guidance, not a Make or Cargo requirement:

- Calls flow **Make → Cargo / xtask / package scripts**, never the reverse. A phony target's recipe invokes `cargo test`, `pnpm turbo run test`, or a project script; the underlying tool must never invoke `$(MAKE)` to "call back" into the Makefile for the same task, since that creates a call cycle (Make → tool → Make → tool) and makes failure attribution ambiguous.
- If a Makefile line does need to invoke Make recursively (e.g. `$(MAKE) -C subdir`), that is a *separate*, GNU-Make-native mechanism ("Recursive Use of make", to be covered in `execution/parallel-and-recursive-make.md`) — it is not the same relationship as "Makefile calls Cargo which calls Makefile back."

```makefile
.PHONY: test build help

## test: run the workspace test suite (delegates to Cargo; Make performs no staleness check of its own)
test:
	cargo test --workspace

## build: build all workspace members (delegates to Cargo)
build:
	cargo build --workspace

## help: list available targets
help:
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/^## //'
```

This snippet targets GNU Make 3.81+ (tab-indented recipes, no `.ONESHELL`, no `.RECIPEPREFIX` — both are 4.x-only and not assumed here; see `execution/gnu-posix-bsd-compatibility.md`).

### Do not re-implement what another tool already owns

- Rust: Cargo already resolves the dependency graph and tracks build staleness per crate/target (see Source-backed behavior above). A Makefile wrapping `cargo build`/`cargo test` should not try to declare per-source-file prerequisites that duplicate what `Cargo.lock` and `target/` fingerprints already track.
- Node.js/monorepo: if Turborepo is already in use, it owns cross-package dependency ordering and remote/local caching; a wrapping Makefile target should call `turbo run <task>` and not attempt to encode package ordering itself.

### Git hooks, CI, and Claude use the same source-of-truth

- **Git hooks** exist to give a developer early feedback before a commit/push reaches CI; they should invoke the same public command (`make check`, `cargo test`, etc.) that CI uses — not a hand-rolled subset that can drift out of sync.
- **CI** is the same source-of-truth run as a required gate. Keep the *pipeline definition* (what commands run, on what triggers) distinct from *server-side merge protection* (which status checks a hosting platform is configured to require before allowing a merge) — this Skill's samples can propose a pipeline definition, but enabling/adjusting branch protection is a separate, higher-privilege operation this Skill does not perform automatically.
- **Claude**, when asked to validate or verify a change, should call the same public command a human or CI would use rather than reconstructing an ad hoc equivalent — see `command-contracts.md` for what those public commands are expected to guarantee.

## Notes

- This page describes design guidance for this Skill's samples; it does not claim GNU Make, Cargo, or Anthropic require any particular command layering.
- The GNU Make manual's local wording is current for `make` 4.4.1; a project's actual installed `make` version may be older (this Skill's own reference environment observed GNU Make 3.81 — see `execution/gnu-posix-bsd-compatibility.md`) and should be confirmed with `make --version` before relying on 4.x-only features.

## Related

- [command-contracts](./command-contracts.md)
- [selection-and-migration](./selection-and-migration.md)
- [parallel-and-recursive-make](../execution/parallel-and-recursive-make.md)
- [gnu-posix-bsd-compatibility](../execution/gnu-posix-bsd-compatibility.md)
- [crate-and-workspace-profiles](../rust/crate-and-workspace-profiles.md)
- [package-scripts-and-mixed-repos](../node/package-scripts-and-mixed-repos.md)

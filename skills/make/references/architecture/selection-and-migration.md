---
source: https://doc.rust-lang.org/cargo/reference/workspaces.html
---

# Selection and Migration

Whether to adopt, keep, shrink, or migrate away from a `Makefile`-based entry point, and how to do so without creating duplicate or circular command definitions.

## Signature / Usage

### Source-backed behavior

Cargo Book, `reference/workspaces.html`, confirmed 2026-09-26: "A workspace is a collection of one or more packages, called workspace members, that are managed together." Cargo already provides cross-member commands ("Common commands can run across all workspace members, like `cargo check --workspace`"), a single shared `Cargo.lock`, and a shared output directory. This is the factual basis for treating Cargo — not a hand-written Makefile — as the dependency/build-graph source of truth for any project that is a Cargo workspace.

`cargo-xtask` README (`github.com/matklad/cargo-xtask`, `main` branch, confirmed 2026-09-26): "cargo-xtask is way to add free-form automation to a Rust project, a-la `make`, `npm run` or bespoke bash scripts... It is a way to extend stock, stable cargo with custom commands (xtasks), written in Rust." The README states directly that "cargo-xtask is not an officially recommended workflow, but it is a somewhat common pattern across the ecosystem" and that "this polyfill doesn't need any code, just a particular configuration of a cargo project" (an `xtask` member crate plus a `.cargo/config.toml` alias) — i.e. it is **not** a Cargo built-in subcommand, and treating it as one misrepresents the source.

### Design guidance: decision table

| Existing situation | Recommendation | Why |
| --- | --- | --- |
| Single Cargo crate or workspace, no cross-language steps, contributors already comfortable typing `cargo test` / `cargo build` | **Keep as-is.** Do not add a Makefile. | A Makefile here only adds an indirection layer over commands Cargo already exposes directly; nothing is gained. |
| Cargo workspace with a genuinely multi-step or OS-sensitive procedure (e.g. code generation before build, a native-Windows-specific packaging step) that a one-line `cargo` invocation cannot express | **Migrate the multi-step logic into `xtask`**, keep `cargo xtask <task>` as the entry point. | `xtask` is plain Rust, runs on every platform Cargo runs on (including native Windows, where a POSIX-flavored Makefile often breaks), and stays inside `cargo`'s own dependency graph and `Cargo.lock`. |
| Node.js/JS workspace with `package.json` scripts already covering the common tasks (`lint`, `test`, `build`) | **Keep `package.json` scripts as-is**; if a Turborepo is already present, let it own cross-package ordering and caching. | Same reasoning as the Cargo case: package manager scripts are already the native, singular entry point; a Makefile wrapping them adds nothing unless there's a cross-ecosystem reason (see mixed-repo row below). |
| Project already has `just` or `Task` (`Taskfile.yml`) providing the same "collection of named entry points" role a Makefile would provide | **Keep the existing runner.** Do not introduce a second, competing entry-point tool. | Two coexisting task runners for the same commands is the exact duplication this page exists to prevent — the "circular / duplicate command" failure mode below applies just as much to Make-vs-just as to Make-vs-Cargo. |
| Mixed Rust + Node.js repository (or any multi-ecosystem repo) where each ecosystem's native tool exists but there is no single command that spans both (e.g. "build the Rust binary the Node.js frontend embeds, then build the frontend") | **Introduce a thin Makefile (or keep an existing one) as the cross-ecosystem entry point only** — it calls `cargo build ...` then `pnpm turbo run build ...` (or the reverse dependency order), and does not re-implement either ecosystem's own graph. | Neither Cargo nor Turborepo has visibility into the other ecosystem's build; a project-level thin entry point is the one place that legitimately needs to sequence across them. |
| No existing task runner, no Cargo/package-manager entry-point convention, and a real *file*-dependency pipeline outside any language ecosystem (e.g. Markdown → PDF report generation, data transformation pipeline) | **Adopt a Makefile as the dependency source-of-truth** for that pipeline specifically (see `responsibility-boundaries.md`'s two-role table). | This is the one case where Make's own timestamp-based incremental build is solving a problem nothing else in the repository already solves. |

Adoption condition behind every row: introduce Make only where it is the *first* tool to own a given piece of dependency/command-surfacing responsibility in the repository. Trade-off: adding Make anywhere always adds one more file contributors must learn to read (Makefile syntax, tabs-vs-spaces, `.PHONY`) — that cost must be weighed against the specific gap it closes, not treated as free.

### Design guidance: call direction and source-of-truth placement

- The direction of calls established in `responsibility-boundaries.md` — Make → Cargo/xtask/package scripts, never the reverse — is what prevents a migration from creating a cycle. When migrating *toward* Make as a thin entry point, the underlying tool's own commands (`cargo test`, `pnpm test`) must remain independently runnable without going through Make; the Makefile is additive, not a replacement API.
- When migrating *away* from Make (e.g. a single crate whose Makefile has drifted to just wrap one `cargo` invocation per target), the source-of-truth move is: delete the Makefile target, confirm the equivalent `cargo`/`pnpm` command still exists and is documented (in `SKILL.md`-equivalent onboarding docs, a `README`, or `scripts/`), then remove any Git hook / CI step that referenced the deleted Makefile target directly rather than the underlying command.
- Never end a migration with two live definitions of the same command (e.g. `make test` computing something subtly different from a CI step's inlined `cargo test --workspace`) — pick one, and have every other entry point call it.

### Design guidance: avoiding circular or duplicate commands

- **Duplicate**: the same logical check defined twice (once in a Makefile recipe, once inlined in a CI YAML step) is a duplicate even if today they happen to agree — they will silently diverge the next time either one is edited alone. Fix: the CI step should invoke the same command the Makefile target invokes (or vice versa; whichever is closer to being the single source), not maintain a parallel inline definition.
- **Circular**: a Makefile target that shells out to a script which itself invokes `make <target>` again (directly or via `$(MAKE)`) is a call cycle, not a legitimate recursive-Make use case (that mechanism, `execution/parallel-and-recursive-make.md`, is for a Makefile in one directory invoking Make in a *subdirectory's* Makefile — a different Makefile, not calling back into itself).
- **Ordering-by-listing is not ordering**: listing prerequisites side by side (e.g. `setup: bootstrap-env install hooks hooks-check`) declares that all four must be up to date before `setup`'s own recipe runs — it does not, by itself, guarantee `bootstrap-env` finishes before `install` starts under parallel execution. GNU Make manual, `html_node/Parallel.html`, confirmed 2026-09-26: "`make` knows how to execute several recipes at once" and "the `-j`... option tells `make` to execute many recipes simultaneously," with the number after `-j` setting "the number of recipes to execute at once" (job slots) — under `-j`, sibling prerequisites with no dependency edge between them are candidates to run concurrently rather than in listed order. If true ordering is required, express it as a real prerequisite chain so Make's own dependency edges enforce it (see the snippet below), or delegate the ordered steps to a single script Make merely invokes. `.NOTPARALLEL` / `.WAIT` (GNU-Make-specific serialization controls) are covered in `../execution/parallel-and-recursive-make.md`.

```makefile
.PHONY: setup bootstrap-env install hooks hooks-check

setup: hooks-check

hooks-check: hooks
	./scripts/hooks-check.sh

hooks: install
	./scripts/install-hooks.sh

install: bootstrap-env
	./scripts/install-deps.sh

bootstrap-env:
	./scripts/bootstrap-env.sh
```

Each step now depends on the previous one by name, not by co-listing — Make's own dependency graph (not listing order) is what guarantees `bootstrap-env` completes before `install` starts, including under `-j`.

## Notes

- This page's decision table and migration steps are Design guidance specific to this Skill; no cited source (GNU Make manual, Cargo Book, `cargo-xtask` README) prescribes any of these adoption thresholds.
- `just` and `Task` are referenced here as "an existing task runner to not duplicate," not documented as APIs by this Skill — see the `lefthook`/`turborepo` skills by name (not by relative link) for their own documented scope, since cross-skill relative links break under independent installation.

## Related

- [responsibility-boundaries](./responsibility-boundaries.md)
- [command-contracts](./command-contracts.md)
- [parallel-and-recursive-make](../execution/parallel-and-recursive-make.md)
- [xtask-and-validation](../rust/xtask-and-validation.md)
- [package-scripts-and-mixed-repos](../node/package-scripts-and-mixed-repos.md)

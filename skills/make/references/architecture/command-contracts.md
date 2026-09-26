---
source: https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html
---

# Command Contracts

> **Every contract on this page is an Example contract defined within this Skill.** GNU Make, Cargo, and Anthropic do not require any project to expose `help` / `doctor` / `setup` / `check` / `fix` / `test` / `build` / `verify` / `clean`, nor these exact names, scopes, or exit-code conventions. Treat this page as a template to adapt, not a spec to conform to.

## Signature / Usage

### Source-backed behavior

GNU Make manual, Edition 0.77 (documents GNU `make` version 4.4.1), confirmed 2026-09-26 (`Phony-Targets.html`): a target declared `.PHONY` always runs its recipe on invocation, "regardless of whether there is a file named [target]" — this is why every contract below that names a command (`help`, `check`, ...) must be backed by a `.PHONY` declaration if it is exposed through a Makefile: an accidental file named `check` or `clean` in the working directory would otherwise silently make that target a no-op.

Everything else in this page — field lists, scope axis, per-command semantics — is Design guidance / Example contract, not sourced from any GNU Make, Cargo, or vendor document.

### Design guidance: scope axis

A recurring failure mode is a command whose *name* stays the same across entry points but whose *effective scope* silently changes — e.g. `make check` in one script checks the whole workspace, while a Git hook's `make check` (invoked with different `cwd` or arguments) only checks staged files, and CI's `make check` checks yet a third thing. Adoption condition: whenever a command can run at more than one scope, make the scope an explicit argument or environment variable rather than an implicit property of which entry point called it, so `check` means the same thing everywhere it's invoked with the same scope value.

Four scopes recur across the contracts below:

| Scope | Meaning |
| --- | --- |
| whole | Entire repository / workspace, every member. |
| changed-impact | Only files changed relative to a base ref, plus their reverse-dependencies (a package that depends on a changed package is in scope; unrelated packages are not). |
| specific package | One named crate / npm workspace package. |
| specific feature/target/toolchain | One named Cargo feature combination, compile target, or toolchain version within a package. |

Trade-off: `changed-impact` scope is the fastest for local iteration but requires either a working dependency-impact calculation (from Cargo/Turborepo metadata) or it silently under-checks; if that calculation isn't implemented yet, default to `whole` rather than pretending a partial check is complete.

Scope as an explicit, overridable variable (GNU Make 3.81-safe — no `.ONESHELL`, no `.RECIPEPREFIX`):

```makefile
SCOPE ?= whole

.PHONY: check
check:
	./scripts/check.sh --scope "$(SCOPE)"
```

`make check` defaults to `SCOPE=whole`; `make check SCOPE=changed-impact` or `SCOPE=pkg:foo` overrides it explicitly — the scope is always visible in the invocation, never implicit in which entry point called `check`.

### Design guidance: side effects are not binary

`check` and `verify` must not modify source files or configuration — that is the one hard rule this Skill's contracts enforce. It does **not** follow that they have zero side effects: writing build artifacts (`target/`, `dist/`), populating a compiler/test cache, or emitting a report file (coverage output, lint SARIF) are expected and acceptable outputs of "not source-modifying" commands. Never describe a `check`/`verify` contract as "fully side-effect-free" — describe it as "does not modify source or configuration; may write build artifacts, caches, and reports."

### Design guidance: no empty success targets

A target whose recipe is `@true` or `@echo "done"` with no real check behind it must not be published under one of these names — an empty `check` that always exits 0 is worse than no `check` target, because callers (CI, hooks, Claude) will trust the exit code.

## Options / Props

### Example contract: command table

| Command | Purpose | Scope | Preconditions | Modifies | Side effects | Interactive? | Exit condition | Recovery on failure |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `help` | List available commands and how to invoke each directly (without going through Make). | whole (the command list itself is not scoped) | None. | Nothing. | None (reads Makefile comments / a static list only). | No. | 0 always, unless the help source itself (e.g. `## `-comment parsing) fails to parse. | Re-run; if parsing fails, fix the malformed comment it reports. |
| `doctor` | Diagnose the local environment (toolchain versions, required binaries present, `.cargo/config.toml` / `rust-toolchain.toml` consistency) without changing anything. | whole | None. | Nothing. | None. | No. | 0 = environment usable; non-zero = one or more findings block normal use. | Follow the specific finding printed (e.g. install missing toolchain component manually); `doctor` never installs anything itself. |
| `setup` | Bring the local environment to a working baseline (install Git hooks, populate `.env.example` → local overrides that don't yet exist, fetch pinned toolchain). Must be safe to re-run. | whole | Network access allowed for this command only (declared explicitly, see `references/operations/safety-and-portability.md`). | Local dotfiles/hooks it manages; a file the user already customized is left untouched — `setup` skips it and reports the skip rather than prompting or overwriting. | Writes hook scripts, may download a toolchain. | No (fails closed and reports what's missing rather than prompting). | 0 = environment ready; non-zero = a step needs manual action (e.g. missing system package it cannot install itself). | Read the reported missing step; re-run `setup` after resolving it — re-running must not duplicate or break state from the first run. |
| `check` | Run the project's agreed-on *normal* verification (fmt check, lint, unit tests) for the given scope. | whole / changed-impact / specific package / specific feature-target-toolchain (must be explicit — see scope axis above) | Dependencies already installed (does not run `setup` implicitly). | Nothing in source or configuration. | May write build artifacts/caches/reports. | No. | 0 = all checks in scope passed; non-zero = at least one failed (report which). | Read which check failed and its scope; fix source, re-run `check` at the same scope to confirm before widening. |
| `fix` | Apply the automatic fixes the project has explicitly agreed to allow (e.g. `cargo fmt`, a lint `--fix` mode) within a declared scope. | Same axis as `check`; must not silently default to `whole` if the caller only asked about one package. | Same as `check`. | Only the specific classes of change the project has enumerated (formatting, an explicit lint autofix); never a superset "fix everything" behavior. | Writes to source files within scope — this is the one contract in this table allowed to do so, and only this one. | No. | 0 = fixes applied cleanly (or nothing needed fixing); non-zero = a fix could not be applied automatically. | Re-run `check` to confirm the fix resolved the original finding; if `fix` partially failed, the unresolved findings must still be visible in `check` output, not silently dropped. |
| `test` / `build` | Run the project's test suite / produce build artifacts for the given scope, delegating to the language-native tool (`cargo test`/`cargo build`, `pnpm turbo run test`/`build`, ...). | whole / specific package / specific feature-target-toolchain | Dependencies installed. | Nothing in source. | Writes build artifacts, test caches, coverage reports. | No. | 0 = build/tests succeeded for the declared scope; non-zero = failure (report scope + failing item). | Inspect the failing test/build output; re-run the same scope after a fix, don't silently widen or narrow scope between attempts. |
| `verify` | Run the full set of checks this Skill's samples define as *required* for a given profile/scope — a superset of `check` that may include `test`, `build`, and profile-specific gates (e.g. a release profile also runs doctests and a stricter feature matrix). | Explicit profile + scope (e.g. `profile=release scope=whole`). | Same as `check`/`test`. | Nothing in source or configuration. | Same as `check` — build artifacts/caches/reports allowed. | No. | 0 = every required check for the declared profile/scope passed; anything BLOCKED/SKIPPED due to missing environment (e.g. no GPU) must not be reported as 0 — see `scripts/verify.md`. | Read which required check for which profile/scope failed or was BLOCKED; resolve the environment gap or the failure, then re-run the same profile/scope — do not treat a narrower re-run as equivalent evidence for the original profile. |
| `clean` | Remove regenerable artifacts of *this* working environment (this crate's/package's `target`/`dist`/build cache) — never a shared directory. | whole / specific package | None. | Deletes files it created (build outputs) only; explicitly never touches other Git worktrees, a shared Cargo `target/` used by other worktrees, shared build/test caches, database data, `.env` files, or credentials. | Frees disk space; nothing else. | No. | 0 = cleaned; non-zero = a path it expected to own was outside its declared scope (fails closed rather than deleting it). | If `clean` reports a path outside its declared scope, investigate why before broadening it — do not add a broad `rm -rf` to make the warning go away. |

`dev` / DB-backed / authentication / E2E / GPU commands are deliberately absent from this table: this Skill does not add them for libraries that have no dev server, database, or GPU dependency. If a target project genuinely needs one, add it as a capability-gated extension of this table (same eight fields), not as a new independent contract shape.

## Notes

- Every row above is an Example contract defined by this Skill's samples, not a GNU Make, Cargo, or Anthropic requirement — adapt names, scopes, and fields to the target project rather than copying this table verbatim.
- `.PHONY` (Source-backed behavior above) is the mechanism that keeps a Makefile-exposed version of any of these commands from silently becoming a no-op; it does not, by itself, guarantee any of the semantics (scope, side effects, exit codes) described here — those are this Skill's convention on top of it.

## Related

- [responsibility-boundaries](./responsibility-boundaries.md)
- [selection-and-migration](./selection-and-migration.md)
- [safety-and-portability](../operations/safety-and-portability.md)
- [parallelism-and-recovery](../operations/parallelism-and-recovery.md)

---
source:
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets
  - https://lefthook.dev/configuration/stage_fixed/
---

# CI, Git Hooks, and the Shared Command Contract

> **Design guidance.** This page is this Skill's own design proposal for how Git hooks, CI, and
> Make-based (or Cargo/pnpm-based) command entry points should relate to each other. It is not a
> GNU Make, Git, or GitHub feature specification. Where a specific external claim is made (e.g.
> about GitHub rulesets or a specific tool's option), the source and date are noted inline; treat
> everything else as this Skill's recommended practice, not official behavior.

Git hooks and CI both exist to run the *same* verification, at different points in the workflow,
for different reasons. Hooks give a developer fast, local, pre-commit/pre-push feedback. CI gives
the team a mandatory, reproducible check that does not depend on any one machine's state. If the
two run different logic, they drift, and "passed locally" stops predicting "passes in CI."

## One command contract, two callers

Design guidance: define `check` / `verify` (and any narrower `fmt` / `lint` / `test` targets) once,
as public entry points (see `architecture/command-contracts.md` for the full contract shape), and
call the *same* entry points from both the hook runner and the CI job:

```yaml
# .lefthook.yml (illustrative; see the lefthook Skill for full config surface)
pre-commit:
  commands:
    verify:
      run: make check
```

```yaml
# .github/workflows/ci.yml (illustrative)
jobs:
  verify:
    steps:
      - run: make check
```

Neither file re-implements what `check` means. If `check` changes (a new lint rule, a narrower
scope), both callers pick it up without editing the hook config or the workflow file.

- A hook and a CI job **may** legitimately run different *subsets* (e.g. hook runs `fmt` + a fast
  lint pass for speed, CI runs the full `verify` including slower integration tests) — but each
  subset should still resolve to a named, documented entry point, not an inline shell one-liner
  duplicated in both places.
- If a check is too slow for a hook, do not silently skip it in CI too. Move it to a narrower CI-only
  entry point (e.g. `verify --profile=full`) and say so in the command's own documentation.

## Pipeline definition vs. server-side merge protection

These are two different artifacts with two different owners, and this Skill's guidance and
scripts only ever touch the first one:

| | Pipeline definition | Merge protection |
| --- | --- | --- |
| What it is | A workflow file in the repo (e.g. `.github/workflows/*.yml`) that defines *what runs* | A server-side repository/organization setting that defines *whether a run is required to merge* |
| Where it lives | Version-controlled, in the repository | GitHub (or other host) settings, outside the repository's file tree |
| Who can change it | Anyone with write access via a normal PR | Repository admins via the host's settings UI/API |
| What this Skill does | May help draft/inspect the workflow file | Never reads, proposes, or applies changes to these settings |

Source-backed distinction: GitHub's own documentation describes branch rulesets as
repository-level governance configured in settings, separate from workflow files, where "required
status checks" reference workflow job names but the *requirement itself* is a ruleset setting, not
part of the workflow YAML (docs.github.com, "About rulesets", fetched 2026-09-26). The equivalent
split exists on other hosts (e.g. Azure DevOps branch policies vs. pipeline YAML). This Skill's
`plan` output may recommend "add a required status check for job X," but applying that requires the
user's own repository-admin action outside this Skill — it is never something `apply` or `verify`
does automatically.

## Cache inputs vs. external state

Design guidance: keep Make's own dependency tracking (mtimes of files it manages) distinct from
opaque caches owned by other tools (Cargo's `target/`, pnpm/Turborepo's cache, CI's cache action).

- Treat a package manager or build tool's cache directory as **external state that Make does not
  model** — do not add `target/` or `node_modules/.cache/` as a Make prerequisite/target pair
  unless you are prepared to also model every input that invalidates it (toolchain version,
  lockfile, feature flags). In most cases this is redundant work Cargo/Turborepo already do; see
  `architecture/responsibility-boundaries.md`.
- A `.PHONY` `check`/`verify` target may *read* those caches (that is what makes incremental
  `cargo build`/`turbo run` fast) but should not itself decide cache validity — that decision stays
  inside the tool that owns the cache.
- CI cache keys (e.g. a GitHub Actions `cache` step keyed on a lockfile hash) are a CI-level
  concern. Do not encode them inside the Makefile; a Makefile portable to a developer's machine
  should not assume a CI cache action ran.
- If a hook or CI step writes to a shared cache directory, treat that path as any other write to
  external state (see `operations/parallelism-and-recovery.md`): document it, and do not point two
  independent worktrees or CI runners at the same physical cache path without understanding the
  underlying tool's own locking (or lack of it).

## Parallel execution and exclusivity

Design guidance:

- Hooks and CI jobs both frequently run multiple commands per invocation (lefthook's `parallel:
  true`, a CI matrix). Parallelizing the *commands in a hook* and parallelizing *Make's own recipe
  execution* (`make -j`) are independent decisions — do not assume enabling one implies the other
  is safe. A recipe invoked twice concurrently under `-j` still needs its own exclusivity if it
  writes to a shared, non-namespaced path.
- If two hook commands (or two CI jobs) write to the same file (a coverage report, a generated
  lockfile diff), either serialize them explicitly or give each its own output path, then merge.
  Do not rely on execution order that "usually" happens to avoid a collision.
- `.NOTPARALLEL` and job-level `needs:`/`depends_on` solve the same class of problem (declare a
  real ordering constraint) at two different layers (Make vs. CI orchestrator) — use whichever
  layer actually owns the resource being protected, not both redundantly.

## Worktree isolation

Design guidance: a hook commonly runs inside a developer's working tree; CI commonly runs in a
fresh checkout; but neither is guaranteed to be the *only* tree using shared paths.

- Never let a `check`/`verify`/`clean` entry point assume it owns `$(git rev-parse --git-common-dir)`-adjacent
  shared state (a shared Cargo `target/`, a shared pnpm store) when multiple worktrees of the same
  repository may exist side by side. See `operations/parallelism-and-recovery.md` for the general
  worktree-namespacing guidance this page assumes.
- A hook is, by construction, scoped to the worktree it runs in (Git invokes it with that
  worktree's `HEAD`/index). Do not assume the reverse — that "the hook only ever sees one worktree
  at a time" — implies it is safe to write to a path shared across worktrees without a lock or a
  per-worktree namespace.

## Secrets

Design guidance:

- Neither a Git hook nor this Skill's own scripts should read `.env` files, keychain entries, or
  process real credentials to decide pass/fail. A `check`/`verify` entry point that needs a
  credential to run (e.g. a live API smoke test) belongs in a narrower, explicitly-opt-in profile,
  not the default hook or default CI job.
- CI secrets (repository/organization secrets) are injected by the CI platform at the job level,
  outside the pipeline file's own text — the workflow file should reference them by name only. A
  hook, running on a developer machine, has no equivalent secret store and must not be given one by
  the Makefile (e.g. do not hardcode a CI-only token as a Makefile default so that "it also works
  locally").
- This Skill's own audit/inspect scripts (see `scripts/`) must not copy the full contents of a
  discovered `.env` or credential file into their JSON output, even if the file's existence is a
  relevant finding.

## OS differences

Design guidance: a hook runs on whatever OS the developer uses; CI often runs on a different one
(or a matrix of several). A command contract that only works on the CI runner's OS is not actually
shared — see `fundamentals/recipes-and-shell.md` and `execution/gnu-posix-bsd-compatibility.md` for
the underlying Make/shell portability constraints this depends on.

- If a check genuinely cannot run on a given OS (e.g. a native-Windows-only packaging step, or a
  Linux-only sandboxing check), the command contract should report `SKIPPED`/`NOT_APPLICABLE` for
  that platform rather than silently omitting the step from that platform's hook/CI config with no
  record of why.
- Do not assume the CI runner's `make`/shell version matches every developer's local one; see
  `maintenance/troubleshooting.md` for how to detect a version mismatch instead of assuming parity.

## Keeping documentation and implementation from drifting

Design guidance, illustrating one concrete technique this Skill recommends:

- If a `help` target (or equivalent) is generated from `##` comments in a Makefile (see
  `node/package-scripts-and-mixed-repos.md` for the pattern), scope the generator to the specific
  file(s) it is meant to parse, and add a test that the generated help text's command names match
  the actual `.PHONY` targets that exist. A generator that silently tries to parse arbitrary
  included Makefiles, or that never gets tested against drift, becomes stale documentation with a
  false appearance of being live.
- More generally: any place where a docstring/comment claims a command exists or behaves a certain
  way should have a corresponding automated check (even a minimal one) that fails when the claim
  and the implementation diverge, rather than relying on manual doc review to catch it.

## Pre-commit auto-fix vs. partial staging

Design guidance, with one source-backed data point:

- A `fix`/auto-format entry point invoked from a pre-commit hook operates on a working tree that
  may be **partially staged** — the developer may have staged only some of their changes
  (`git add -p`) while leaving other edits unstaged. Running an unconditional `git add .` (or
  `git add -A`) after auto-fixing silently stages *everything*, including changes the developer
  deliberately left out of the commit. This Skill's `fix` guidance treats that as a design defect,
  not an acceptable shortcut.
- Source-backed data point: Lefthook's `stage_fixed` option, when enabled, does not run a blanket
  `git add .` — for commands with a `files` option it re-stages only the files that command
  targeted, and for scripts/commands without one it re-stages via the `{staged_files}` template
  (i.e. the same file set that was staged and passed to the command), respecting configured glob
  filters. Lefthook also fails the whole hook if that scoped `git add` call itself fails, rather
  than letting the commit go through with unfixed content (lefthook.dev, "stage_fixed", fetched
  2026-09-26). This Skill's own auto-fix guidance follows the same shape: **re-stage exactly the
  paths that were fixed and were already staged, nothing more**, and treat a failed re-stage as a
  hard failure rather than a silent pass-through.
- A `fix` entry point that is not run from a hook (a developer invoking `make fix` directly, or a
  CI job in an explicitly-approved auto-fix profile) does not have this constraint in the same way
  — but should still document whether it stages its own changes at all, so callers are not
  surprised either way.

## Notes

- This entire page is this Skill's design guidance, not a specification of GNU Make, Git, Lefthook,
  or GitHub Actions. Only the two inline "source-backed" claims above (GitHub rulesets vs. workflow
  files; Lefthook's `stage_fixed` scoping) are backed by an external source and fetch date; treat
  the rest as recommended practice with stated trade-offs, not required behavior.
- See the `lefthook` Skill for the full Git hooks configuration reference (this page does not
  duplicate it) and `architecture/command-contracts.md` for the general shape of `help` / `doctor`
  / `setup` / `check` / `fix` / `test` / `build` / `verify` / `clean` this page assumes.

## Related

- [command-contracts](../architecture/command-contracts.md)
- [responsibility-boundaries](../architecture/responsibility-boundaries.md)
- [parallelism-and-recovery](../operations/parallelism-and-recovery.md)
- [safety-and-portability](../operations/safety-and-portability.md)

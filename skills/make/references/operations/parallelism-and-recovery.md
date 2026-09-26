---
source: https://www.gnu.org/software/make/manual/html_node/Prerequisite-Types.html
---

# Parallelism and Recovery

Design guidance for making `setup` safely re-runnable, ordering setup around
databases/external services, isolating parallel worktrees, and scoping `clean` so it
never touches state it does not own.

## Signature / Usage

```bash
# Re-running setup must be idempotent, not merely "usually harmless"
make setup   # or: ./scripts/setup.sh — same underlying source of truth either way
```

### Source-backed behavior

GNU Make Manual, "Types of Prerequisites"
(`https://www.gnu.org/software/make/manual/html_node/Prerequisite-Types.html`,
confirmed via direct fetch 2026-09-26) and "Parallel Output" / "The `.WAIT` Special
Prerequisite" (`https://www.gnu.org/software/make/manual/html_node/Parallel-Disable.html`,
content confirmed verbatim via mirror `docs.w3cub.com/gnu_make/parallel-disable.html`
on 2026-09-26 — direct WebFetch to this specific gnu.org page returned HTTP 429 on
every retry this session):

- For normal prerequisites, the manual guarantees only that "the recipes for all
  prerequisites of a target will be completed before the recipe for the target is
  started" — it does **not** document a guaranteed execution order *among* sibling
  prerequisites themselves, with or without `-j`.
- Under parallel execution (`-j`), make may run sibling prerequisites concurrently
  and out of listed order; the `.WAIT` pseudo-prerequisite exists specifically to force
  left-to-right sequencing when that matters ("make will not build any of the
  prerequisites to the right of `.WAIT` until all prerequisites to the left of `.WAIT`
  have completed"), but the manual itself cautions that neither `.NOTPARALLEL` nor
  `.WAIT` are "as reliable for controlling parallel execution as defining a
  prerequisite relationship" (i.e. an explicit `a: b` dependency chain).

**Design guidance derived from this fact:** do not rely on sibling-prerequisite
listing order (`setup: bootstrap-env install hooks hooks-check`) as a documented
ordering contract under any invocation mode. Where order matters, encode it as an
explicit dependency chain (`install: bootstrap-env`, `hooks: install`, ...) or push the
ordering into a single script this skill's `setup` target calls — see below.

Everything else on this page is Design guidance from this Skill; GNU Make does not
define or require a `setup`/`clean` contract.

### Design guidance: `setup` re-entrancy and recovery

- As established above, sibling-prerequisite listing is not a documented ordering
  contract; either chain prerequisites explicitly (`bootstrap-env: ; ...` then
  `install: bootstrap-env ; ...` etc.) or push the ordering into a single script that
  this skill's `setup` target simply calls — the entry point (Make target vs. direct
  script vs. `cargo xtask setup`) stays interchangeable, but the ordering logic itself
  is defined exactly once.
- Design `setup` so a second, third, or Nth invocation on an already-configured
  workspace is a no-op or a safe refresh, not a source of duplicate config blocks,
  duplicate DB migrations, or overwritten local overrides. Concretely:
  - Config files the setup step generates should be written idempotently (e.g.
    generate to a temp file and compare/replace, or use a marker block that is
    replaced rather than appended each run).
  - Git hook installation should detect an already-installed hook of the same origin
    and skip re-installing rather than appending a second hook body.
  - Anything that provisions external state (a local DB schema, a message queue,
    a seeded test dataset) needs its own idempotency check — "does this already
    exist for this namespace" — before creating it again.
- Recovery from a partially-failed `setup` should be describable as "run `setup`
  again" once the above idempotency holds. If a particular step cannot be made safely
  re-runnable (e.g. a one-shot migration), that step must say so explicitly and provide
  its own recovery instructions rather than being silently wrapped in the general
  `setup` target.

### Design guidance: setup ordering with a DB or external service

When a project's `setup` needs a database or other external service (not merely local
files), order the steps so that:

1. The service itself is confirmed reachable/started first (or explicitly started by
   this step, scoped to a name/port this invocation owns — see worktree isolation
   below) — do not attempt schema or seed operations against a service that is not
   confirmed up.
2. Schema/migration application happens next, and must itself be idempotent (apply only
   pending migrations, not re-apply everything).
3. Seed data (if any) is applied last, and only after schema is confirmed current —
   seeding against a stale schema is a common source of "works sometimes" setup
   failures.
4. Any step in 1–3 that would need network access to fetch a container image, package,
   or remote schema dump follows the same authorization rule as `verify` in
   [Safety and Portability](./safety-and-portability.md): explicit user authorization,
   or `BLOCKED`.

This is design guidance for **projects that have such a dependency**; do not add DB/
external-service setup steps to a project (e.g. a pure library) that has none.

### Design guidance: parallel worktree isolation

When multiple worktrees (or multiple clones) of the same repository run `setup`/`dev`/
`test` concurrently — a common pattern when Claude or a human runs several isolated
task branches at once — each worktree's setup must not collide with another's:

- **Namespace/port:** derive any listened port, container name, or service namespace
  from something unique to the worktree (its absolute path hash, an explicit
  environment variable the caller sets, or a worktree-local config file) rather than a
  fixed port number baked into the Makefile/script. Two worktrees using the same fixed
  port will have one of them fail to bind or silently talk to the other's service.
- **Schema/tenant:** if setup provisions a DB schema or logical tenant, the schema/
  tenant name must include the same per-worktree discriminator, so two worktrees never
  read or write each other's tables/rows during `test`/`dev`.
- **Logs and temp files:** write logs and scratch/temp files under a per-worktree
  directory (e.g. inside that worktree's own tree, or a temp directory namespaced by
  worktree path) rather than a shared fixed path like `/tmp/myproject-logs` that a
  second worktree would overwrite or interleave with.
- Do not implement a distinct dependency-graph engine to enforce this — namespacing
  inputs (port, schema name, log path) by worktree identity is sufficient design intent;
  actual cross-worktree file locking or a bespoke coordination service is out of scope
  for this skill's guidance.

### Design guidance: `clean` scope and shared directories

- `clean` removes only regenerable build outputs that this project's own build/setup
  produced (compiled artifacts, generated config copies, this project's own log/temp
  directories created above) — never source files, never configuration the user
  authored by hand.
- Before deleting anything under a path that could be shared, confirm it is scoped to
  the current worktree/workspace, not a directory shared across worktrees:
  - **Other worktrees:** a `clean` recipe must not walk up past its own worktree root
    (e.g. via a careless `../` glob or a symlink) into a sibling worktree's build
    output.
  - **Shared Cargo `target/`:** when multiple crates/workspaces share a single Cargo
    target directory (via `CARGO_TARGET_DIR` or a workspace-wide `target/`), `clean`
    for one crate must not indiscriminately `rm -rf` the shared `target/` — either
    scope to `cargo clean -p <crate>` or document that this project intentionally does
    not share a target directory.
  - **Shared package-manager/build cache:** the same caution applies to a shared pnpm
    store, Turborepo cache, or similar — `clean` for one package should not evict a
    cache that other packages/worktrees still rely on unless that is the explicit,
    documented intent of the `clean` target.
  - **DB data:** `clean` must not drop or truncate database data by default; if a
    project genuinely wants a "reset the local DB" operation, that is a distinct,
    clearly-named, and clearly-scoped target (e.g. `clean-db`), never bundled silently
    into the general `clean`.
  - **`.env` and credentials:** `clean` never deletes `.env`/`.env.local`/credential
    files, even if they are gitignored build-adjacent files — they are configuration,
    not build output.
- Document, per project, exactly which paths `clean` is permitted to remove; do not
  reuse a wildcard pattern from one project's `clean` in another without re-verifying
  the pattern's scope against that project's actual layout.

## Notes

- Beyond the prerequisite-ordering fact cited above, the rest of this page is design
  guidance from this skill; GNU Make itself does not define or require a `setup`/
  `clean` contract — see [Command Contracts](../architecture/command-contracts.md) for
  the general "multiple entry points, one source of truth" pattern this builds on.
- None of the isolation techniques above (namespace/port/schema/tenant/log separation)
  are enforced by Make's own dependency engine; they are conventions this skill's
  samples/scripts must implement explicitly.

## Related

- [Safety and Portability](./safety-and-portability.md)
- [Command Contracts](../architecture/command-contracts.md)
- [Parallel and Recursive Make](../execution/parallel-and-recursive-make.md)

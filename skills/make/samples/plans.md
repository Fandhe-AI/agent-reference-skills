# Adoption Plans (Pre-Approval, Not Approval)

Example JSON plans describing a proposed Make adoption/integration for a target project, checked before any `apply` step.

These are the `plan` phase output this skill's SKILL.md describes: what would change, why, and what would be verified — reviewed by a human before anything is written to a real repository.

Source: [`./plans/rust-crate-thin-makefile.json`](./plans/rust-crate-thin-makefile.json), [`./plans/mixed-repo-verify-delegation.json`](./plans/mixed-repo-verify-delegation.json).

## The existence of a plan file is not approval

Both example files carry an explicit `notice` field stating this in full. Do not treat a sample plan JSON in this directory, or `scripts/bin/validate-plan.mjs` successfully validating its shape, as authorization to change anything in a real repository. Applying any change described in a plan requires the target repository's owner to explicitly approve that exact plan content, re-checked against the current state of the target files, in a separate `apply` step — see [`command-contracts.md`](../references/architecture/command-contracts.md).

For this skill's own helper CLIs, that approval is given outside the plan file: `validate-plan.mjs` prints the plan's `planDigest` (the sha256 of the file's exact bytes), and the user who reviewed that exact file passes it as `run-checks.mjs --execute --approve <planDigest>` or `preview-sample.mjs --apply --approve <planDigest>`. A field inside the plan such as `checks[].approved: true` only marks which checks of an approved plan may run; it is not approval on its own, because an edit made after approval could keep it. Any edit to the file changes the digest, so a changed plan is reported `BLOCKED` until it is reviewed and approved again.

## Field roles (schema in progress — do not treat this as frozen)

These example plans are being revised by a separate change in this skill to converge on a shared, machine-readable shape. At a minimum, that shape includes:

| Field | Role |
| --- | --- |
| `schemaVersion` | Identifies which version of the plan JSON shape a file follows, so a validator can reject/adapt to older or newer plans rather than guessing. |
| `root` | The target repository's absolute path. In an illustrative sample, this is a placeholder (`<TARGET_ROOT>`) rather than a real path — a validator is expected to `FAIL` on a placeholder value; that is intentional, not a defect, since a plan pointed at no real root cannot be safely applied. |
| `changes[]` | The list of files the plan proposes to create/modify, each with enough detail (path, action, expected prior state, description) for a human or a validator to check the plan against the current repository state before anything is written. |
| `sample` (only for `preview-sample.mjs --apply`) | The name of the `samples/projects/<name>/` sample the plan approves writing. `preview-sample.mjs --apply` refuses a plan whose `sample` differs from `--sample`, so an approval for one sample cannot be replayed with another that shares file paths. |
| `changes[].newContentHash` (only for `preview-sample.mjs --apply`) | `sha256:<hex>` of the exact content that will be written to that path. Binds the approval to content, not just to a path and an action; a preview run returns these in `proposedPlan`. |
| `checks[]` | The verification commands the plan would run after `apply`, each carrying its own approval state. An unapproved check (`approved: false`) must not be executed automatically — approval is a separate, explicit step from the plan's mere existence. |

Because this shape is actively being aligned across the sample plans, do not rely on the exact key names or nesting inside `./plans/*.json` as a stable reference — read those files directly for their current, literal content, and treat this page as describing the intended *role* of each field rather than a transcription of today's JSON.

## Adoption condition

Use a plan file as the artifact a human reviews before approving a Make-adoption change (new Makefile, CI step consolidation, Git hook update) — not as a script to execute directly. Do not write code that reads a plan file and applies its `changes[]` without a separate, explicit approval step in between.

## Prerequisites

- None to read a plan (it is plain JSON, reviewable with any text viewer). Applying anything the plan describes requires whatever tools the plan's own `changes[]`/verification commands require (e.g. `make`, `cargo`, `pnpm` — see the plan's own content).

## OS / shell / GNU Make version

- Not applicable — plan files are static JSON, not executed code, and are not OS- or shell-dependent.

## Usage

```bash
# Read-only review; a plan is never executed directly
cat skills/make/samples/plans/rust-crate-thin-makefile.json
cat skills/make/samples/plans/mixed-repo-verify-delegation.json
```

There is no Make-based entry point for this sample category — plans are consumed by a human reviewer (and, in this skill's design, by a future `scripts/bin/validate-plan.mjs` for static shape/consistency checking only, never for applying changes).

## Change target / side effects

- Reading either file has no side effects.
- Neither file, by itself, changes any file outside `skills/make/samples/plans/`. Only an explicitly approved `apply` step (outside the scope of this samples directory) would modify a target repository.

## Expected results

- A validator run against either file with a placeholder `root`/target path is expected to report `FAIL` (or the equivalent "not applicable to a real target yet" status) — this is the correct, intended outcome for an illustrative sample, not a bug to fix by inventing a real path.

## Files

- [`./plans/rust-crate-thin-makefile.json`](./plans/rust-crate-thin-makefile.json) — single-crate scenario: existing separate `cargo fmt`/`clippy`/`test`/`doc` invocations consolidated behind a thin Makefile.
- [`./plans/mixed-repo-verify-delegation.json`](./plans/mixed-repo-verify-delegation.json) — mixed Rust+Turborepo/pnpm monorepo scenario: a root `verify` ordering edge between a Rust side and a JS/TS side.

## Related

- [command-contracts](../references/architecture/command-contracts.md) — the `plan`/`apply`/`verify` phase distinctions these samples illustrate
- [safety-and-portability](../references/operations/safety-and-portability.md) — why a plan's existence, or a passing static validation, is not itself a safety guarantee

## Provenance and local edits

Both example files carry their own `notice` field stating they are illustrative samples, not approved changes. If a project starts from one of these as a template for its own real plan, keep an equivalent note identifying the source (`skills/make` sample `plans`, file name) inside the copied JSON (e.g. as a `notice`-style field) so a later reviewer does not mistake a customized, in-progress plan for this skill's own unmodified sample — and so a future update to this skill's samples does not get confused with a target project's own plan history.

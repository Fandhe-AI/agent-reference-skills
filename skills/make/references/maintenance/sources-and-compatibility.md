# Sources and Compatibility Ledger

Authoritative record of every upstream source consulted for the `make` skill, the version/commit
confirmed at fetch time, and which pages rely on it. Update this table whenever a page's
Source-backed behavior is added or re-verified — do not backdate or invent a confirmation date for
a source that was not actually fetched in this pass.

## Verified sources

| Source (formal name) | URL | Confirmed on | Version / commit | Related pages | Design decision |
| --- | --- | --- | --- | --- | --- |
| The GNU Make Manual | https://www.gnu.org/software/make/manual/html_node/index.html | 2026-09-26 | "This is Edition 0.77, last updated 26 February 2023, of The GNU Make Manual, for GNU `make` version 4.4.1" (verbatim from the manual's title page) | `fundamentals/*`, `execution/*`, this page's Error-Messages/Phony-Targets citations | 4.4.1 is the newest documented behavior. `local-plans/make-skill.md` records the sample-execution environment as GNU Make 3.81 (no `.ONESHELL`, no `.RECIPEPREFIX`, no `.WAIT`). Any 4.x-only feature referenced in `fundamentals/` or `execution/` must state its minimum version explicitly and must not be assumed to run on 3.81 without separate verification |
| GNU Make Manual — Error Messages | https://www.gnu.org/software/make/manual/html_node/Error-Messages.html | 2026-09-26 (direct fetch 429; confirmed via WebSearch snippet quoting the same page verbatim, see Notes) | Same edition as above (4.4.1) | `troubleshooting.md` | Canonical error-string catalog used to organize the failure patterns in `troubleshooting.md`; not duplicated verbatim beyond short quoted fragments |
| GNU Make Manual — Phony Targets | https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html | 2026-09-26 | Same edition as above (4.4.1) | `troubleshooting.md`, `../execution/special-targets-and-defaults.md` | Confirms the exact rule for when a real file with the same name as a phony target breaks `.PHONY`, and that implicit-rule search is skipped for `.PHONY` targets |
| GNU Make Manual — Prerequisite Types / rebuild decision | https://www.gnu.org/software/make/manual/html_node/Prerequisite-Types.html | 2026-09-26 (direct fetch confirmed in a later research pass; see `operations/parallelism-and-recovery.md`) | Same edition as above (4.4.1) | `troubleshooting.md`, `operations/parallelism-and-recovery.md` | Used for the general, well-established mtime-comparison rule and for the "recipes for all prerequisites complete before the target's recipe starts" guarantee; no version-specific claim is made from this source |
| The GNU Bash Reference Manual | https://www.gnu.org/software/bash/manual/bash.html | not directly verified — see Notes | Reported by a WebSearch snippet quoting the manual: "Edition 5.3, last updated 18 May 2025, of The GNU Bash Reference Manual, for Bash, Version 5.3"; direct WebFetch returned HTTP 429 on 2026-09-26 on both `bash.html` and `html_node/index.html` | (reserved for `fundamentals/recipes-and-shell.md`, `operations/*` — owned by other scope researchers) | Not directly fetched in this pass. Treat the 5.3 attribution as unconfirmed until a researcher for the owning category performs a direct WebFetch and updates this row |
| The Cargo Book | https://doc.rust-lang.org/cargo/ | 2026-09-26 | Unversioned rolling documentation tied to the current Rust toolchain; no version string is printed on the page itself | (reserved for `rust/*` — owned by `rust` scope researcher) | Do not attach the local toolchain version (`cargo 1.98.1`, per `local-plans/make-skill.md`) to this source — that is a separate, locally-observed fact, not a documented manual version |
| cargo-xtask (matklad/cargo-xtask) | https://github.com/matklad/cargo-xtask | 2026-09-26 | Unversioned GitHub README; no release tag or license file surfaced by the fetch; `master` branch at fetch date | (reserved for `rust/xtask-and-validation.md` — owned by `rust` scope researcher) | Per prompt instruction: this is the xtask *pattern's* primary source, not a Cargo standard subcommand — pages referencing it must not describe xtask as an official Cargo feature |
| pnpm — Installation | https://pnpm.io/installation | 2026-09-26 | Page states pnpm 12 is "the current release line — the `latest` tag on npm points at it" | (reserved for `node/*` — owned by `node` scope researcher) | — |
| Turborepo Docs | https://turborepo.com/docs (301 redirects to the canonical https://turborepo.dev/docs) | 2026-09-26 | No version number shown on the page | (reserved for `node/*` — owned by `node` scope researcher) | Record the canonical URL (`turborepo.dev`) alongside the prompt-given `turborepo.com`, since the latter always redirects |
| Lefthook | https://lefthook.dev/ | 2026-09-26 | No version number shown on the page | (reserved for `quality/*` — owned by `quality` scope researcher) | — |
| GitHub Actions documentation | https://docs.github.com/en/actions | 2026-09-26 | No version/date shown; rolling documentation | (reserved for `samples/ci.md`, `quality/*` — owned by other scope researchers) | — |

## Not yet fetched in this pass

The prompt's §11 list of primary sources includes items outside the `maintenance` scope of this
pass. They are listed here as unfilled ledger rows so the table remains a true all-category
ledger rather than silently omitting them. Fill in `Confirmed on` / `Version` / `Related pages`
when the owning category researcher fetches them.

| Source | URL | Owning category (planned) |
| --- | --- | --- |
| rustup | https://rust-lang.github.io/rustup/ | `rust/` |
| Cargo — `cargo test` command reference | https://doc.rust-lang.org/cargo/commands/cargo-test.html | `rust/` |
| Cargo — Features reference | https://doc.rust-lang.org/cargo/reference/features.html | `rust/` |
| Cargo — `cargo metadata` command reference | https://doc.rust-lang.org/cargo/commands/cargo-metadata.html | `rust/` |
| Cargo — Workspaces reference | https://doc.rust-lang.org/cargo/reference/workspaces.html | `rust/` |
| Node.js — Child Process API | https://nodejs.org/api/child_process.html | `node/` (and `scripts/bin/` implementation) |
| just | https://just.systems/man/en/ | `architecture/selection-and-migration.md` |
| Task (taskfile.dev) | https://taskfile.dev/docs/guide | `architecture/selection-and-migration.md` |
| Azure Pipelines | https://learn.microsoft.com/en-us/azure/devops/pipelines/ | `samples/ci.md` (if an Azure Pipelines sample is added) |
| Claude Code — Agent Skills | https://code.claude.com/docs/en/skills | `SKILL.md` (skill-author) |

## Notes

- The GNU Make Manual is distributed under the GNU Free Documentation License (per its
  appendix, listed in the manual's table of contents as "GNU Free Documentation License").
  Reference pages in this skill quote short fragments only and must not transcribe long
  passages verbatim.
- Several direct `WebFetch` calls to `www.gnu.org` returned `HTTP 429 Too Many Requests` during
  this research pass (`Error-Messages.html` on first two attempts, `How-Make-Works.html`,
  `Parallel-Disable.html`, and `bash.html` / `bash/manual/html_node/index.html`). Where a page
  could not be fetched directly, this ledger records the fallback method used (WebSearch
  snippet quoting the manual) and marks the row as **not directly verified** rather than
  claiming a direct confirmation. Any future update pass should re-attempt a direct `WebFetch`
  of these URLs and upgrade the row once confirmed.
- Do not assume `www.gnu.org/software/make/manual/` and `www.gnu.org/software/bash/manual/`
  document the same edition dates as each other; they are independently versioned GNU projects.

## Verify your local toolchain against this ledger

```bash
make --version
bash --version
cargo --version
pnpm --version
```

Compare the reported versions against the "Version / commit" column above before relying on any
version-gated feature described elsewhere in this skill (e.g. GNU Make 4.x-only special targets).

## Related

- [troubleshooting](./troubleshooting.md)

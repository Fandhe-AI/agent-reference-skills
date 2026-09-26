# Node.js + pnpm (package.json Scripts as Source of Truth, Turborepo Extension)

A pnpm workspace where `package.json`'s `scripts` field is the source of truth and the Makefile is a thin, non-destructive entry point.

`packages/core` and `packages/cli` each define their own `test`/`build` scripts; the root `package.json` aggregates them (`pnpm -r run test`, `pnpm -r run build`) plus an optional Turborepo delegation (`turbo:build`, `turbo:check`). The Makefile calls `pnpm run <script>` once per target and never re-lists the underlying commands.

```makefile
.DEFAULT_GOAL := help

.PHONY: help setup lint test build check turbo-build turbo-check clean

lint:
	pnpm run lint

turbo-build:
	pnpm run turbo:build
```

Source: [`./projects/node-pnpm/Makefile`](./projects/node-pnpm/Makefile) (script bodies: [`./projects/node-pnpm/package.json`](./projects/node-pnpm/package.json)).

## Adoption condition

Use when a Node.js/pnpm workspace wants a memorable `make <target>` alias over commands that are already fully expressed in `package.json` `scripts` — and, once a `turbo.json` exists, over Turborepo's own task graph. Do not use this to re-implement pnpm's workspace resolution or Turborepo's dependency ordering/caching in Make itself; Make here never expresses a `dependsOn`-style edge between `lint`/`test`/`build` — see [`package-scripts-and-mixed-repos.md`](../references/node/package-scripts-and-mixed-repos.md). If the repository has no `package.json` at all, this sample does not apply.

## Prerequisites

- `pnpm` (`packageManager: "pnpm@10.32.1"` pinned in `package.json`) and Node.js `>=20` (per `engines`).
- `turbo` is a `devDependency` (`turbo@2.11.4`); only needed for the `turbo-build`/`turbo-check` targets, which invoke the `turbo` CLI installed under `node_modules/.bin`.

## OS / shell / GNU Make version

- Verified locally: macOS, GNU Make 3.81, pnpm 10.32.1, Node v24.13.0.
- Linux: expected to work (pnpm/Node/Turborepo are all cross-platform CLIs) but not verified in this session.
- Git Bash / native Windows: pnpm and Node both support Windows natively; the Makefile itself uses no Unix-only shell built-ins besides `rm -rf` in `clean` (GNU `rm` is not available in `cmd.exe`/PowerShell without a POSIX layer). Not verified in this session.

## Usage

Via Make:

```bash
cd projects/node-pnpm
make help          # lists targets; touches nothing (default goal)
make setup          # pnpm install --frozen-lockfile
make lint             # pnpm run lint
make test              # pnpm run test  (pnpm -r run test)
make build               # pnpm run build (pnpm -r run build)
make check                 # pnpm run check (lint + test)
make turbo-build             # pnpm run turbo:build (requires setup)
make turbo-check               # pnpm run turbo:check
make clean                       # remove node_modules/ and packages/*/dist/
```

Without Make (identical commands `make` delegates to):

```bash
cd projects/node-pnpm
pnpm install --frozen-lockfile   # same as: make setup
pnpm run lint                       # same as: make lint
pnpm run test                         # same as: make test
pnpm run build                          # same as: make build
pnpm run check                            # same as: make check
pnpm run turbo:build                        # same as: make turbo-build
pnpm run turbo:check                          # same as: make turbo-check
```

## Change target / side effects

- `setup`: `pnpm install --frozen-lockfile` — fails rather than silently updating `pnpm-lock.yaml` if the lockfile is out of sync with `package.json`.
- `lint`/`test`/`build`/`check`: no filesystem changes beyond each package's own build output (e.g. `packages/*/dist`, written by `scripts/build.mjs`) and Turborepo's own cache directory for the `turbo-*` targets.
- `clean`: `rm -rf node_modules packages/*/node_modules packages/*/dist .turbo` — destructive, but scoped to these four regeneratable paths only; nothing under `packages/*/src` is touched.

## Expected results

- `make setup` then `make check`: exit 0 if `scripts/lint.mjs` finds no issues and every package's `test` script passes.
- `make clean` then `make test` without `make setup` first: `packages/cli`'s test imports the bare specifier `@make-sample/core` (see `packages/cli/src/index.mjs`), which Node's ESM resolver can only satisfy via the `node_modules/@make-sample/core` symlink pnpm creates during install; with `node_modules` removed by `clean`, `pnpm -r run test` fails for `packages/cli` with a module-resolution error. `packages/core`'s own test has no such workspace import and would still pass. This demonstrates that `setup` is a real, unenforced prerequisite for `packages/cli` specifically (`make` sibling target names do not imply an execution order — see the `.PHONY` ordering caveat in `../references/node/package-scripts-and-mixed-repos.md`), not that every target in this sample requires `node_modules`.
- `make turbo-build` on a second run with no source changes: Turborepo reports the `build` task as cached (its own cache marker in stdout), not Make — Make itself has no cache concept for this target since it is `.PHONY`.

## Files

- [`./projects/node-pnpm/Makefile`](./projects/node-pnpm/Makefile)
- [`./projects/node-pnpm/package.json`](./projects/node-pnpm/package.json)
- [`./projects/node-pnpm/pnpm-workspace.yaml`](./projects/node-pnpm/pnpm-workspace.yaml)
- [`./projects/node-pnpm/turbo.json`](./projects/node-pnpm/turbo.json)
- [`./projects/node-pnpm/packages/core/package.json`](./projects/node-pnpm/packages/core/package.json)
- [`./projects/node-pnpm/packages/cli/package.json`](./projects/node-pnpm/packages/cli/package.json)
- [`./projects/node-pnpm/scripts/lint.mjs`](./projects/node-pnpm/scripts/lint.mjs)
- [`./projects/node-pnpm/scripts/build.mjs`](./projects/node-pnpm/scripts/build.mjs)

## Related

- [package-scripts-and-mixed-repos](../references/node/package-scripts-and-mixed-repos.md) — pnpm workspace/lockfile behavior, Turborepo Package Graph/Task Graph delegation, `.PHONY` ordering caveat
- [responsibility-boundaries](../references/architecture/responsibility-boundaries.md) — one `.PHONY` target per public command, no duplicated ordering

## Provenance and local edits

`./projects/node-pnpm/Makefile`'s header comment records this is a `skills/make` sample and the exact toolchain versions it was verified against. If a project adopts this sample, keep an equivalent comment identifying the source (`skills/make` sample `node-pnpm`) at the top of the copied `Makefile`, so a later skill update does not overwrite project-specific target additions without the maintainer noticing the diff.

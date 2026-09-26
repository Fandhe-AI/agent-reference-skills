# Incremental Build (Make as the Dependency Source of Truth)

Make owns the file dependency graph and incremental rebuild decisions directly, instead of aggregating another tool's commands.

Plain-text fragments in `src/` are transformed and assembled into `build/manual.md`, with per-fragment incremental rebuild driven entirely by Make's own timestamp checking — distinct from the command-aggregation samples (`rust-crate.md`, `node-pnpm.md`, `mixed.md`), where Make delegates to `cargo`/`pnpm` instead of owning the graph itself.

```makefile
ifneq ($(RECORDED_SRCS),$(strip $(SRCS)))
$(SOURCES_LIST): FORCE
endif

$(SOURCES_LIST): | $(BUILD_DIR)
	echo '$(SRCS)' > $@

$(BUILD_DIR)/manual.md: $(PROCESSED) $(SOURCES_LIST) | $(BUILD_DIR)
	@if [ -z "$(strip $(PROCESSED))" ]; then echo "error: no $(SRC_DIR)/*.txt fragments found" >&2; exit 1; fi
	@echo "assembling $@ from $(words $(PROCESSED)) fragment(s)"
	cat $(PROCESSED) > $@

$(BUILD_DIR)/%.processed: $(SRC_DIR)/%.txt | $(BUILD_DIR)
	@echo "processing $< -> $@"
	sed 's/^/    /' $< > $@
```

Source: [`./projects/incremental-build/Makefile`](./projects/incremental-build/Makefile).

## Adoption condition

Use this pattern when Make's own timestamp-based dependency checking should decide what gets rebuilt from a set of file inputs — i.e. Make is the real build graph, not a wrapper around another tool's graph. Do **not** use this pattern to aggregate `cargo`/`pnpm`/`turbo` commands; see [`rust-crate.md`](./rust-crate.md), [`node-pnpm.md`](./node-pnpm.md), and [`mixed.md`](./mixed.md) for that (different, `.PHONY`-centric) shape, and the distinction in [`responsibility-boundaries.md`](../references/architecture/responsibility-boundaries.md).

## Prerequisites

- GNU Make, `sed`, `cat`, `mkdir` (POSIX-standard tools).
- No compiler, no Rust/Node toolchain.

## OS / shell / GNU Make version

- Verified locally: macOS, GNU Make 3.81. The Makefile intentionally avoids `.RECIPEPREFIX`/`.ONESHELL` (3.82+ features) so it also runs on the same 3.81 baseline macOS ships.
- Linux, Git Bash, and native Windows are **not verified** in this session. `sed`/`cat`/`mkdir` availability differs (native Windows `cmd.exe`/PowerShell do not provide POSIX `sed`; Git Bash and Linux do).

## Usage

Make is required for this sample — there is no Make-independent entry point, because Make's own incremental-build behavior is exactly what the sample demonstrates.

```bash
cd projects/incremental-build

make            # first run: creates build/, processes all 3 fragments, assembles build/manual.md
make            # re-run with no changes: nothing rebuilds (all files already up to date)
touch src/02-setup.txt
make            # only build/02-setup.processed is reprocessed, then manual.md is reassembled
make clean      # removes build/ entirely
```

## Change target / side effects

- Creates `build/` (via an order-only prerequisite, so its own mtime never forces reprocessing of already-current fragments) containing `build/*.processed`, `build/sources.list` (the fragment list of the last build), and `build/manual.md`.
- `make clean` deletes `build/` only — nothing under `src/` or elsewhere is touched. `BUILD_DIR` is set with `override` and the recipe names `build` literally, so `make clean BUILD_DIR=<other path>` cannot redirect the deletion.
- `.DELETE_ON_ERROR:` is declared so a recipe that fails partway (e.g. `sed` succeeding but the shell command after it failing) does not leave a stale-but-freshly-timestamped target that a later `make` would treat as up to date.

## Expected results

- First `make`: prints one `processing ...` line per fragment, the `echo ... > build/sources.list` line, and one `assembling ...` line; exit code 0.
- Second `make` (no changes): prints a "Nothing to be done" message for the default goal (exact quoting differs by GNU Make version — GNU Make 3.81 uses `` `all' ``-style quoting); nothing is reprocessed.
- After editing one `src/*.txt`: only that file's `processing ...` line reappears, followed by the `assembling ...` line — proves the dependency graph is scoped per-fragment, not whole-directory.
- After deleting one `src/*.txt`: `build/sources.list` is rewritten and `manual.md` is reassembled from the remaining fragments only (without `sources.list`, the remaining older fragments would leave `manual.md` looking up to date and the deleted content would stay in it).
- `make clean`: no output beyond the `rm -rf build` recipe line; `build/` no longer exists afterward.
- A `src/*.txt` name containing whitespace or a shell metacharacter (quotes, `;`, `$`, backtick, parentheses, etc.): `make` stops at parse time with `src/ has file names with whitespace or shell metacharacters` before any recipe runs, because Make expands file names into recipes unquoted. `make clean` still works.
- With no `src/*.txt` at all: the assemble recipe prints `error: no src/*.txt fragments found` and exits non-zero instead of blocking on `cat` reading stdin.

## Files

- [`./projects/incremental-build/Makefile`](./projects/incremental-build/Makefile)
- [`./projects/incremental-build/src/01-intro.txt`](./projects/incremental-build/src/01-intro.txt)
- [`./projects/incremental-build/src/02-setup.txt`](./projects/incremental-build/src/02-setup.txt)
- [`./projects/incremental-build/src/03-usage.txt`](./projects/incremental-build/src/03-usage.txt)

## Related

- [rules-and-prerequisites](../references/fundamentals/rules-and-prerequisites.md) — normal vs. order-only prerequisites, out-of-date determination
- [special-targets-and-defaults](../references/execution/special-targets-and-defaults.md) — `.DELETE_ON_ERROR`, `.PHONY`
- [responsibility-boundaries](../references/architecture/responsibility-boundaries.md) — Make-as-source-of-truth vs. Make-as-entry-point

## Provenance and local edits

This sample was authored directly for the `make` skill (not copied from an external repository); `./projects/incremental-build/Makefile`'s header comment records what it demonstrates and the GNU Make version it was verified against. If a project adopts and modifies this sample, keep a similar header comment naming the source (`skills/make` sample `incremental-build`) so a later skill update does not silently overwrite local edits — this skill has no auto-update mechanism that touches files outside itself, but recording provenance makes manual reconciliation possible.

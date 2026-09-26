---
source: https://www.gnu.org/software/make/manual/html_node/
---

# make-commands

Copy-pasteable GNU Make invocations for running a Makefile, scoping the run, and inspecting a
`make` binary before relying on version-gated syntax. This page only documents `make` itself
(the executable); it does not define this skill's own `help`/`check`/`verify` command contract —
see `references/architecture/command-contracts.md` for that design guidance.

## Run a Makefile from another directory

```sh
make -C <dir> <target>
```

`-C`/`--directory` changes to `<dir>` before reading `GNUmakefile`/`makefile`/`Makefile` and
running. Useful for invoking a sub-project's Makefile without `cd`-ing first.

## Use a specific makefile

```sh
make -f <path> <target>
```

`-f`/`--file` reads `<path>` instead of the default `GNUmakefile`/`makefile`/`Makefile` search
order. Can be given more than once to read multiple makefiles in sequence.

## Run recipes in parallel

```sh
make -j<N> <target>
make -j <target>
```

`-j`/`--jobs` allows up to `<N>` recipes to run simultaneously; `-j` with no number allows
unlimited simultaneous jobs. See `references/execution/parallel-and-recursive-make.md` for the
jobserver/`$(MAKE)`-propagation behavior and the `.NOTPARALLEL` opt-out.

## Preview without executing (dry-run)

```sh
make -n <target>
```

> **Warning**: `-n` (`--just-print`/`--dry-run`/`--recon`) is **not** a safe static analyzer for
> an untrusted or unreviewed Makefile. Makefile parsing (`$(shell ...)`, `!=`, `include`d
> generated makefiles) still executes at read time regardless of `-n`, and any recipe line
> containing `$(MAKE)` is exempt from `-n` suppression and runs for real. Do not use `-n` as a
> substitute for reading the Makefile's text. See
> `references/operations/safety-and-portability.md` and
> `references/execution/diagnostics-and-exit-codes.md` in this skill for the full source-backed
> explanation before running `-n` against any repository you have not already read.

## Check up-to-date-ness without executing

```sh
make -q <target>
echo $?   # 0 = up to date, 1 = updating needed, 2 = error
```

> **Warning**: the same parse-time-execution and `$(MAKE)`-exemption caveats as `-n` apply to
> `-q`. Do not treat `-q` as a safe substitute for a code review of the Makefile either.

## Show why targets are/aren't rebuilt (debugging aid)

```sh
make --trace <target>
```

Shorthand for `--debug=print,why`. Requires GNU Make **4.0** or later (introduced 2013-10-09,
per GNU Make NEWS). It is a debugging aid, not a security or safety feature, and does not change
exit-status semantics.

> **Local: not verified (GNU Make 3.81)**. This skill's research/authoring environment has GNU
> Make 3.81 on `PATH` (confirmed via `make --version`, 2026-09-26) and no separate `gmake`
> binary. On that version, `make --trace <target>` actually exits **2** with
> `` unrecognized option `--trace' `` and prints usage to stderr — it does not run the target at all.
> The 4.0+ behavior described above was not exercised locally; confirm `make --version` reports
> 4.0+ before relying on `--trace` against a real target.

## Group output when building in parallel

```sh
make -j4 --output-sync=target <target>
make -O <target>
```

`--output-sync`/`-O` groups each job's or each recursive `make`'s output instead of interleaving
it with other parallel jobs. Requires GNU Make **4.0** or later (introduced alongside `--trace`
in the same release, per GNU Make NEWS). Accepted sync scopes (`target`, `line`, `recurse`,
`none`) are a version-gated feature — confirm the local `make --version` before relying on a
scope other than the default.

> **Local: not verified (GNU Make 3.81)**. Same environment as above: `make -j4
> --output-sync=target <target>` exits **2** with
> `` unrecognized option `--output-sync=target' `` and prints usage to stderr, without running
> the target. Not exercised against a real 4.0+
> `make` locally — confirm `make --version` first.

## Confirm the make binary and version on PATH

```sh
make --version
```

Prints the version string and, on GNU Make, the string `GNU Make`. Run this before relying on
any version-gated flag or syntax documented elsewhere in this skill — `make` on `PATH` is not
guaranteed to be GNU Make (macOS and many BSD systems ship BSD `make` as the default `make`). See
`references/execution/gnu-posix-bsd-compatibility.md` for the GNU-vs-BSD-vs-POSIX distinction
this skill draws.

## Check whether a GNU-flavored `gmake` binary exists separately

```sh
command -v gmake
gmake --version
```

On systems where `make` is BSD make, GNU Make is sometimes installed separately as `gmake`
(e.g. via Homebrew on macOS). `command -v gmake` reports its path if present; this is a
POSIX-portable existence check (does not depend on GNU-only `which` behavior).

Confirmed locally (2026-09-26): this environment's `make` on `PATH` is already GNU Make 3.81
(`make --version` prints `GNU Make 3.81`), and no separate `gmake` is installed — `command -v
gmake` exits `1` (nothing printed, no path found). That combination (GNU `make` present, no
`gmake`) is expected on a system where the default `make` is already GNU Make.

## Notes

- `-n`/`-q`/`-t` (`--touch`) are mutually exclusive per the manual — do not combine them in one
  invocation.
- Do not run `-n`/`-q` as a stand-in for static analysis on a repository you have not already
  reviewed by reading its text; see the warnings above and
  `references/operations/safety-and-portability.md`.
- `--trace` and `--output-sync`/`-O` both require GNU Make 4.0+; do not assume they exist on an
  older GNU Make (e.g. 3.81, which is what this skill's own research environment reported via
  `make --version` while writing `references/execution/gnu-posix-bsd-compatibility.md`) without
  confirming via `make --version` first.
- Full flag reference: `references/execution/diagnostics-and-exit-codes.md` (dry-run/diagnostic
  flags and the exit-status contract), `references/execution/parallel-and-recursive-make.md`
  (`-j`, jobserver, `$(MAKE)`), `references/execution/gnu-posix-bsd-compatibility.md`
  (GNU/POSIX/BSD detection).

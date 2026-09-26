---
source:
  - https://www.gnu.org/software/make/manual/html_node/Features.html
  - https://www.gnu.org/software/make/manual/html_node/Special-Targets.html
  - https://www.gnu.org/software/make/manual/html_node/Missing.html
  - https://www.gnu.org/software/make/manual/html_node/Options-Summary.html
  - https://www.gnu.org/software/make/manual/html_node/index.html
---

# GNU, POSIX, and BSD Make Compatibility

This skill documents **GNU Make** specifically. Plain `make`, BSD `make` (`bmake`), and POSIX-conforming `make` are related but distinct implementations; features described elsewhere in this skill are GNU extensions unless noted otherwise.

## Signature / Usage

```makefile
.POSIX:          # opt this makefile into POSIX-conforming parsing/behavior
```

```console
$ make --version   # confirm which make and which version is actually on PATH
```

## Options / Props

| Topic | GNU Make behavior | Source |
| --- | --- | --- |
| Baseline for comparison | The manual's own "Features" chapter states: "Here is a summary of the features of GNU make, for comparison with and credit to other versions of make. We consider the features of make in 4.2 BSD systems as a baseline." | Features.html |
| GNU-only extensions (partial list) | `-v`/`--version`, `-h`/`--help`; simply-expanded (`:=`) variables; automatic pass-through of command-line variable assignments to recursive invocations; `-C`/`--directory`; multi-line `define`; `.PHONY`; text-manipulation functions; `-o`/`--old-file`; conditional directives (`ifeq`/`ifdef`/...); search paths for included makefiles; extra makefiles via environment variables; stripping of `./` prefixes; `-lname` library-prerequisite search; suffix-rule characters beyond `.`; `MAKELEVEL`; `MAKECMDGOALS`; static pattern rules; selective `vpath`; computed variable references; automatic makefile remaking; dynamic object loading. | Features.html |
| Extensions borrowed from other `make`s | `+=` append syntax and `archive(mem1 mem2…)` multi-member archive syntax and `-include` (no error on missing file) come from SunOS 4 `make`. The `!=` shell-assignment operator "exists in many BSD[s] of make and is purposefully implemented here to behave identically to those implementations." | Features.html |
| `.POSIX` special target | Declaring `.POSIX:` as a target makes "the makefile ... parsed and run in POSIX-conforming mode," i.e. GNU-specific behavior is disabled where it conflicts with POSIX. | Special-Targets.html |
| Things GNU Make deliberately does **not** implement | Archive-member-by-symbol targets `file((entry))` (would require Make to understand archive symbol-table internals) and SCCS `~`-suffix rules from System V `make` are both explicitly *not* implemented, even though "the POSIX.2 standard ... which specifies make does not require any of these features." | Missing.html |
| Version-detection | No single flag guarantees identical Makefile behavior across OSes/shells; check the actual binary before relying on version-gated syntax. | Options-Summary.html (`--version`) |

## Notes

- On macOS and many BSD systems the `make` on `PATH` may be BSD `make`, not GNU Make — do not assume `make` == GNU Make without checking `make --version`.
- `.WAIT` (see `special-targets-and-defaults.md`) and `.NOTPARALLEL`'s prerequisite-list form are GNU-specific/version-gated; do not assume POSIX or BSD `make` support them identically even though `.WAIT` itself originates from the POSIX/BSD side.
- A Makefile written and tested only against GNU Make (e.g. relying on `ifeq`, `$(shell ...)`, `:=`, pattern-rule `%`, `define`) will generally **not** run unmodified under strict POSIX `make` or BSD `make` without the `.POSIX:` opt-in or without rewriting the GNU-only constructs.
- Declaring `.POSIX:` changes parsing/behavior but does not retroactively validate that the rest of the Makefile avoids all GNU extensions; it is a mode switch, not a linter.
- This skill's primary reference target is GNU Make; where a page in this skill does not explicitly call out POSIX/BSD differences, assume the described behavior is GNU-specific and unverified on other `make` implementations.
- Version: confirmed against the manual for GNU Make 4.4.1 (edition 0.77, 2023-02-26, https://www.gnu.org/software/make/manual/html_node/index.html, verified 2026-09-26). The "4.2 BSD as baseline" framing and the extension lists above come from the same manual edition; they describe the historical origin of features, not a live compatibility matrix against current BSD `make` releases, which were not separately verified. Local environment is GNU Make 3.81; not cross-checked against any BSD `make` build.

## Related

- [special-targets-and-defaults.md](./special-targets-and-defaults.md)
- [parallel-and-recursive-make.md](./parallel-and-recursive-make.md)

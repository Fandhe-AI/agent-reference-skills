---
source:
  - https://www.gnu.org/software/make/manual/html_node/Special-Targets.html
  - https://www.gnu.org/software/make/manual/html_node/index.html
  - https://lists.gnu.org/archive/html/bug-make/2022-10/msg00248.html
---

# Special Targets and Defaults

Special targets are names reserved by GNU Make; when they appear as a target (or as `.DEFAULT_GOAL`, a special *variable*) they change Make's behavior instead of describing a file to build.

## Signature / Usage

```makefile
.PHONY: all clean test

all: build

.DEFAULT_GOAL := all

.DELETE_ON_ERROR:

.NOTPARALLEL:
```

## Options / Props

| Special target / variable | Effect | Notes |
| --- | --- | --- |
| `.PHONY` | Prerequisites of `.PHONY` are always considered phony: "make will run its recipe unconditionally, regardless of whether a file with that name exists or what its last-modification time is." | Use for targets that do not correspond to a real output file (`all`, `clean`, `test`, ...) |
| `.DEFAULT_GOAL` (special variable, not a target) | Sets which target Make builds when invoked with no goal argument. "The `.DEFAULT_GOAL` variable allows you to discover the current default goal, restart the default goal selection algorithm by clearing its value, or to explicitly set the default goal." | Without it, the default goal is the first target in the first makefile whose name does not begin with `.` (and, if that first rule has several targets, only the first of them). Assigning more than one target name to `.DEFAULT_GOAL` is an error |
| `.DELETE_ON_ERROR` | "make will delete the target of a rule if it has changed and its recipe exits with a nonzero exit status, just as it does when it receives a signal." | Prevents leaving a partially-written, stale-looking output file after a failed recipe |
| `.NOTPARALLEL` | "If `.NOTPARALLEL` is mentioned as a target with no prerequisites, all targets in this invocation of make will be run serially, even if the `-j` option is given. Any recursively invoked make command will still run recipes in parallel (unless its makefile also contains this target). If `.NOTPARALLEL` has targets as prerequisites, then all the prerequisites of those targets will be run serially." | Whole-makefile serialization switch; the prerequisite-list form scopes it to specific targets |
| `.WAIT` (pseudo-prerequisite, used inside a prerequisite list) | "When `.WAIT` appears in a prerequisite list and parallel execution is enabled, make will not build any prerequisites to the right of `.WAIT` until all prerequisites to the left of `.WAIT` have completed." Scope is per prerequisite list: "`.WAIT` takes effect only when building the target in whose prerequisite list it appears." It never appears in the automatic variables (`$^`, `$<`, ...) | Introduced in **GNU Make 4.4**; not present in GNU Make 3.81. You may also declare an actual `.WAIT:` target with no prerequisites/recipe for portability, but this is not required |

## Notes

- Manual version confirmed: "This is Edition 0.77, last updated 26 February 2023, of The GNU Make Manual, for GNU `make` version 4.4.1." — source: https://www.gnu.org/software/make/manual/html_node/index.html (verified 2026-09-26).
- Local reference environment for this skill is **GNU Make 3.81**. `.PHONY`, `.DEFAULT_GOAL`, `.DELETE_ON_ERROR`, and the bare (no-prerequisites) form of `.NOTPARALLEL` are long-standing GNU Make features and can be assumed available on 3.81, but this was not re-verified against the 3.81 manual text directly — treat as "commonly available, not locally re-confirmed."
- `.WAIT` is confirmed to require **GNU Make 4.4+** (added alongside the 4.4 release; discussed on the `bug-make` mailing list at release time — https://lists.gnu.org/archive/html/bug-make/2022-10/msg00248.html). Do not use it in Makefiles that must run on GNU Make 3.81 or on non-GNU `make`.
- `.DEFAULT_GOAL` does not affect target selection when goals are given explicitly on the command line (`make sometarget`); command-line goals always take precedence.
- `.PHONY` targets are not a substitute for `.DELETE_ON_ERROR`: a phony recipe has no "target file" to delete, so `.DELETE_ON_ERROR` only matters for file targets.
- Check which `make` implementation and version is actually installed before relying on version-gated features; see `gnu-posix-bsd-compatibility.md` in this same category.

## Related

- [parallel-and-recursive-make.md](./parallel-and-recursive-make.md)
- [gnu-posix-bsd-compatibility.md](./gnu-posix-bsd-compatibility.md)

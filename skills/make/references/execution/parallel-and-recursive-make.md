---
source:
  - https://www.gnu.org/software/make/manual/html_node/Options-Summary.html
  - https://www.gnu.org/software/make/manual/html_node/Recursion.html
  - https://www.gnu.org/software/make/manual/html_node/Parallel.html
  - https://www.gnu.org/software/make/manual/html_node/MAKE-Variable.html
  - https://www.gnu.org/software/make/manual/html_node/Variables_002fRecursion.html
  - https://www.gnu.org/software/make/manual/html_node/Job-Slots.html
  - https://www.gnu.org/software/make/manual/html_node/Parallel-Output.html
---

# Parallel and Recursive Make

GNU Make can run recipes in parallel (`-j`) and can invoke itself as a sub-process (recursive Make, `$(MAKE)`). Both mechanisms have their own option/variable propagation rules that are easy to get wrong.

## Signature / Usage

```makefile
# top-level Makefile
SUBDIRS = libfoo cmd/bar

.PHONY: build
build:
	for d in $(SUBDIRS); do \
		$(MAKE) -C $$d build || exit $$?; \
	done
```

```console
$ make -j4          # run up to 4 recipes at once
$ make -C sub build # cd into sub/ before reading its Makefile
$ make -f custom.mk # read custom.mk instead of ./Makefile
```

## Options / Props

| Option / mechanism | Description | Source note |
| --- | --- | --- |
| `-C dir`, `--directory=dir` | Change to directory `dir` before reading the makefiles. `CURDIR` is set to the working directory pathname "after it has processed any -C options." | Options-Summary.html / Recursion.html |
| `-f file`, `--file=file`, `--makefile=file` | "Read the file named file as a makefile." | Options-Summary.html |
| `-j [N]`, `--jobs[=N]` | "If the `-j` option is followed by an integer, this is the number of recipes to execute at once; this is called the number of job slots. If there is nothing looking like an integer after the `-j` option, there is no limit on the number of job slots." "On MS-DOS, the `-j` option has no effect, since that system doesn't support multi-processing." | Parallel.html |
| `$(MAKE)` variable | "Recursive make commands should always use the variable MAKE, not the explicit command name `make`, and the value of this variable is the file name with which make was invoked." Recipe lines that reference `$(MAKE)` are always executed even under `-t`/`-n`/`-q`, because "whenever a recipe line of a rule contains the variable MAKE, the flags `-t`, `-n` and `-q` do not apply to that line." | MAKE-Variable.html |
| `MAKEFLAGS` | Automatically carries flags (e.g. `-s`, `-k`) and command-line variable assignments down to sub-`make` invocations: "every sub-make gets a value for MAKEFLAGS in its environment. In response, it takes the flags from that value and processes them as if they had been given as arguments." Also carries `--jobserver-auth=...` for the jobserver protocol; if multiple instances appear, "only the last instance is relevant." | Variables/Recursion.html, Job-Slots.html |
| `MAKELEVEL` | Recursion-depth counter: "'0' for the top-level make; '1' for a sub-make, '2' for a sub-sub-make, and so on." | Variables/Recursion.html |
| jobserver protocol | GNU Make's mechanism to share a limited pool of job slots between a parent `make -jN` and all of its recursive sub-`make` invocations, so the total number of concurrently running recipes across the whole tree stays at N. "Every command make starts has one implicit job slot reserved for it before it starts." Only command lines Make recognizes as recursive `make` invocations (normally via `$(MAKE)`, or a line explicitly marked recursive with a leading `+`) participate in the jobserver. | Job-Slots.html |
| `--output-sync[=type]`, `-O[type]` | Prevents interleaved output from parallel jobs. `target` (default): "output from the entire recipe of each target is grouped together." `line`: "output from each line in the recipe is grouped together." `recurse`: recipes containing recursive `make` invocations are treated like any other target — the recursive sub-make's full output is buffered and printed together with the rest of the parent recipe's output. | Parallel-Output.html |

## Notes

- `-j` without a numeric argument means "no limit," not "one job per CPU core" — GNU Make does not auto-detect core count for `-j` itself (do not assume otherwise without re-checking the manual for a specific newer version).
- A recipe line that calls a sub-`make` but does **not** use the `$(MAKE)` variable (e.g. a hardcoded `make -C sub`) will not automatically get jobserver access or transparent `-n`/`-t`/`-q` passthrough the way a `$(MAKE)`-based line does; mark it recursive explicitly (leading `+`) if it must cooperate with the jobserver.
- Mixed `stdout`/`stderr` from parallel recipes is a real, documented problem addressed by `--output-sync`, not a bug to work around with ad hoc `flock`/log-redirection unless you have a specific reason to avoid the built-in mechanism.
- This page documents Make's own recursive-invocation and parallelism mechanics only. Whether a given project *should* use recursive Make vs. delegate the dependency graph to Cargo/Turborepo/etc. is a design decision — see this skill's `architecture/` category, not this page.
- Version: confirmed against the manual for GNU Make 4.4.1 (edition 0.77, 2023-02-26, https://www.gnu.org/software/make/manual/html_node/index.html, verified 2026-09-26). Not re-verified against the local GNU Make 3.81 environment; `-C`, `-f`, `-j`, `$(MAKE)`, `MAKEFLAGS`, `MAKELEVEL` are long-standing and expected to work on 3.81, but the jobserver `--jobserver-auth=` wire format and `--output-sync` are later additions and may differ or be absent on 3.81 — treat as unverified on 3.81.

## Related

- [special-targets-and-defaults.md](./special-targets-and-defaults.md)
- [diagnostics-and-exit-codes.md](./diagnostics-and-exit-codes.md)

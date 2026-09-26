---
source:
  - https://www.gnu.org/software/make/manual/html_node/Instead-of-Execution.html
  - https://www.gnu.org/software/make/manual/html_node/Running.html
  - https://www.gnu.org/software/make/manual/html_node/index.html
---

# Diagnostics and Exit Codes

GNU Make provides several flags for inspecting what it *would* do without fully building targets, plus a small, fixed set of process exit codes. None of these flags make Make a fully side-effect-free static analyzer.

## Signature / Usage

```console
$ make -n            # --just-print / --dry-run / --recon: print recipes, do not run them
$ make -q            # --question: run nothing, only report up-to-date-ness via exit status
$ make -t            # --touch: mark targets up to date without running recipes
$ make --trace       # print target/prerequisite decisions (shorthand for --debug=print,why)
```

## Options / Props

| Flag | Effect | Exit status meaning |
| --- | --- | --- |
| `-n`, `--just-print`, `--dry-run`, `--recon` | "make only echoes most recipes, without executing them." | Same general exit-status rules as a normal run (0 success, 2 error) since no recipes actually execute |
| `-t`, `--touch` | "make ignores the recipes in the rules and uses (in effect) the command touch for each target that needs to be remade. ... For speed, make does not actually invoke the program touch." | 0 on success, 2 on error |
| `-q`, `--question` | "make prints nothing and executes no recipes, but the exit status code it returns is zero if and only if the targets to be considered are already up to date. If the exit status is one, then some updating needs to be done." | `0` = up to date, `1` = updating needed, `2` = error encountered |
| `--trace` | "Show tracing information for make execution. Using `--trace` is shorthand for `--debug=print,why`." | Does not change exit status semantics |
| (general) exit status | "The exit status is zero if make is successful. The exit status is two if make encounters any errors. The exit status is one if you use the `-q` flag and make determines that some target is not already up to date." | `0` / `1` (only with `-q`) / `2` |

## Notes

- **`-n`, `-q`, and `-t` are mutually exclusive**: "It is an error to use more than one of these three flags in the same invocation of make."
- **`-n`/`-q`/`-t` do not make Makefile *loading* side-effect-free.** Included makefiles are still remade/regenerated as needed before the requested flag's behavior kicks in: "`-q` (or `--question`) and `-n` (or `--just-print`) do not prevent updating of makefiles, because an out-of-date makefile would result in the wrong output for other targets." Concretely, `make -f mfile -n foo` will regenerate `mfile` (running whatever recipe produces it) if it is out of date, *then* print (without running) the recipe for `foo`. The same applies to `-t`: "The `-t` option has no effect on updating makefiles; they are really updated even if `-t` is specified."
- Makefile parsing itself can execute arbitrary code regardless of `-n`/`-q`/`-t`: `$(shell ...)` calls, `!=` assignments, and `include`d generated makefiles all run at read time, before any dry-run flag has a chance to suppress anything. Treat `make -n`/`make -q` as "do not execute the requested targets' recipes," **not** as "do not execute any code" — this is not a safe static analyzer for an untrusted Makefile.
- A recipe line containing the `$(MAKE)` variable is **exempt** from `-n`/`-t`/`-q` suppression (see `parallel-and-recursive-make.md`): "whenever a recipe line of a rule contains the variable MAKE, the flags `-t`, `-n` and `-q` do not apply to that line." A `make -n` on a Makefile with recursive `$(MAKE)` calls can therefore still execute a sub-`make`'s recipes.
- `--trace` is a debugging aid (why a target is/isn't rebuilt), not a security or safety feature.
- Do not run `make -n`/`make -q`/`--trace` against an untrusted or unreviewed repository's Makefile expecting it to be a safe read-only inspection — see `operations/safety-and-portability.md` in this skill for the audit-safety boundary this skill enforces around Makefile execution.
- Version: confirmed against the manual for GNU Make 4.4.1 (edition 0.77, 2023-02-26, https://www.gnu.org/software/make/manual/html_node/index.html, verified 2026-09-26). `-n`, `-q`, `-t`, and the exit-status contract are long-standing GNU Make behavior and expected to hold on GNU Make 3.81 as well, but this was not re-verified locally against the 3.81 manual text. `--trace` is a comparatively newer flag; its exact availability on 3.81 was not verified.

## Related

- [parallel-and-recursive-make.md](./parallel-and-recursive-make.md)
- [special-targets-and-defaults.md](./special-targets-and-defaults.md)

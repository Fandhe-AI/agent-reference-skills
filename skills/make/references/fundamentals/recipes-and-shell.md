---
source:
  - https://www.gnu.org/software/make/manual/html_node/Recipe-Syntax.html
  - https://www.gnu.org/software/make/manual/html_node/Special-Variables.html
  - https://www.gnu.org/software/make/manual/html_node/Choosing-the-Shell.html
  - https://www.gnu.org/software/make/manual/html_node/Execution.html
  - https://www.gnu.org/software/make/manual/html_node/One-Shell.html
  - https://www.gnu.org/software/make/manual/html_node/Errors.html
  - https://www.gnu.org/software/make/manual/html_node/Variables-in-Recipes.html
  - https://cgit.git.savannah.gnu.org/cgit/make.git/plain/NEWS?h=4.4.1
---

# Recipes and Shell

How GNU Make turns each recipe line into a shell invocation, how `SHELL` / `.SHELLFLAGS` / `.ONESHELL` change that, and how errors propagate. Verified against "This is Edition 0.77, last updated 26 February 2023, of The GNU Make Manual, for GNU make version 4.4.1." (checked 2026-09-26). Local verification environment for this skill is GNU Make 3.81 — `.RECIPEPREFIX`, `.SHELLFLAGS`, and `.ONESHELL` were all introduced in GNU Make 3.82 and are unavailable in that local environment (see the maintenance category's sources-and-compatibility page).

## Signature / Usage

```makefile
target:
	first-command
	second-command    # runs in a brand-new shell, unaware of the first command's state
```

```makefile
.RECIPEPREFIX = >
target:
>first-command
>second-command
```

## Options / Props

| Item | Default | Source-backed behavior |
| --- | --- | --- |
| Recipe line prefix | tab | "Each line in the recipe must start with a tab (or the first character in the value of the `.RECIPEPREFIX` variable)." |
| `.RECIPEPREFIX` | empty (tab) | "If the variable is empty (as it is by default) that character is the standard tab character." Can be reassigned at any point in the makefile: "The value of `.RECIPEPREFIX` can be changed multiple times; once set it stays in effect for all rules parsed until it is modified." **Introduced in GNU Make 3.82** (28 Jul 2010) per the official NEWS file: "New special variable: .RECIPEPREFIX allows you to reset the recipe introduction character from the default (TAB) to something else." |
| `SHELL` | `/bin/sh` | "If this variable is not set in your makefile, the program /bin/sh is used as the shell." Never taken from the environment: "Unlike most variables, the variable `SHELL` is never set from the environment." Setting `SHELL` in the makefile is also not exported to recipe subprocesses: "that value is not exported in the environment to recipe lines that `make` invokes." |
| `.SHELLFLAGS` | `-c` (`-ec` in POSIX mode) | "The default value of `.SHELLFLAGS` is `-c` normally, or `-ec` in POSIX-conforming mode." "The argument(s) passed to the shell are taken from the variable `.SHELLFLAGS`." **Introduced in GNU Make 3.82** (28 Jul 2010) per the official NEWS file: "New special variable: .SHELLFLAGS allows you to change the options passed to the shell when it invokes recipes." |
| `.ONESHELL` | off | See Notes. |

## Notes

- Execution boundary per line: "When it is time to execute recipes to update a target, they are executed by invoking a new sub-shell for each line of the recipe, unless the `.ONESHELL` special target is in effect." State set by one line (shell variables, `cd`) does **not** carry over to the next line: "setting shell variables and invoking shell commands such as `cd` that set a context local to each process will not affect the following lines in the recipe." `Execution.html` recommends combining such statements with `&&` on one recipe line (its own example uses a `cd` followed by a command, paraphrased here as `cd dir && command`) so that a failure of the first statement stops the second from running in the wrong directory.
- `.ONESHELL` (feeds the whole recipe to one shell invocation, **introduced in GNU Make 3.82**, 28 Jul 2010, per the official NEWS file: "New special target: .ONESHELL instructs make to invoke a single instance of the shell and provide it with the entire recipe, regardless of how many lines it contains."): "If the `.ONESHELL` special target appears anywhere in the makefile then all recipe lines for each target will be provided to a single invocation of the shell." Prefix-character handling changes: "only the first line of the recipe will be checked for the special prefix characters (`@`, `-`, and `+`). Subsequent lines will include the special characters in the recipe line when the `SHELL` is invoked" — except for POSIX shells, where "the special prefix characters in 'internal' recipe lines will be removed before the recipe is processed." Failure detection also changes: "a failure of any but the final recipe line will not be noticed by `make`" unless you add `-e` via `.SHELLFLAGS`.
- Make's `$` vs shell's `$` inside a recipe: "if you want a dollar sign to appear in your recipe, you must double it (`$$`)." `$(LIST)` is expanded by make before the shell ever sees the line; `$$i` becomes `$i`, which the shell then expands as its own variable.
- Default error propagation: "If there is an error (the exit status is nonzero), `make` gives up on the current rule, and perhaps on all rules." Per-line opt-out: "To ignore errors in a recipe line, write a `-` at the beginning of the line's text (after the initial tab)." Global opt-out: `-i` / `--ignore-errors` ("errors are ignored in all recipes of all rules"). Continue unrelated targets after a failure: `-k` / `--keep-going` ("`make` continues to consider the other prerequisites of the pending targets, remaking them if necessary, before it gives up and returns nonzero status").
- Design guidance (this skill, not the manual): the manual does not document `pipefail` or a portable equivalent of `set -e` across all shells — that is a Design-guidance topic, not Source-backed behavior. Do not assume `.ONESHELL` plus `set -e` gives the same failure semantics as GNU Make's default per-line error propagation without verifying against the actual `SHELL` in use; see the operations category's safety-and-portability page for this skill's recommended pattern.
- GNU Make 3.81 caveat (local verification environment for this skill): `.RECIPEPREFIX`, `.SHELLFLAGS`, and `.ONESHELL` are unavailable; use the default tab prefix and per-line subshell semantics documented above.

## Related

- [rules-and-prerequisites.md](./rules-and-prerequisites.md) — the rule a recipe belongs to
- [variables-and-expansion.md](./variables-and-expansion.md) — `$$` escaping vs make variable references
- [patterns-includes-and-functions.md](./patterns-includes-and-functions.md) — the `$(shell ...)` function, distinct from the recipe's own shell invocation

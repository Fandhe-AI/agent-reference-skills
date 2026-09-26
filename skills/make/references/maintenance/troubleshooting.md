---
source:
  - https://www.gnu.org/software/make/manual/html_node/Error-Messages.html
  - https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html
  - https://www.gnu.org/software/make/manual/html_node/Prerequisite-Types.html
---

# Troubleshooting

Common GNU Make failure patterns, how to diagnose them, and where the fuller specification
lives. This page is a triage index, not a duplicate of the option/exit-code reference — for
`-n` / `-q` / `--trace` / `--debug` semantics and exit-code meanings, see
[Diagnostics and Exit Codes](../execution/diagnostics-and-exit-codes.md).

## Diagnose before you act

```sh
make --version                 # confirm which make/version you actually have (see sources-and-compatibility.md)
make -n <target>                # dry-run: print the recipe that would run, without running it
make -p -n /dev/null 2>&1 | less   # dump the full database of rules/variables (no target run)
```

`make -n` prints recipes without executing them, but it does **not** guarantee the Makefile has
no side effects during parsing (variable assignments can call shell functions, `include` can
run arbitrary generation). Treat `-n` as a read of *intended recipes*, not a fully safe static
analyzer of an untrusted Makefile — see `.claude/rules/security.md` in the parent repository for
the general principle and [Safety and Portability](../operations/safety-and-portability.md) for
this skill's own guidance.

## "This target never rebuilds" / "This target rebuilds every time"

GNU Make decides whether to remake a target by comparing prerequisite timestamps (mtime) against
the target's timestamp; if any (non order-only) prerequisite is newer, or the target file does
not exist, the target is considered out of date and its recipe runs (GNU Make Manual,
Prerequisite Types node, `https://www.gnu.org/software/make/manual/html_node/Prerequisite-Types.html`).
Common causes when this doesn't behave as expected:

- **A prerequisite is listed as order-only** (after `|` in the rule) — order-only prerequisites
  are never used to decide whether the target is out of date, only to enforce build order. If a
  target should rebuild when that prerequisite changes, it must be a normal prerequisite instead.
- **The recipe never actually creates/touches the named target file.** If the target name does
  not correspond to a file the recipe writes, the target looks perpetually "out of date" (or, if
  a stale file with that name happens to exist, perpetually "up to date"). This is the exact
  situation `.PHONY` exists to declare explicitly — see the `.PHONY` section below.
- **Clock skew or coarse filesystem timestamp resolution** can make Make judge freshly generated
  files as unchanged or vice versa; this is a known limitation of mtime-based comparison and is
  independent of your rule's correctness.
- **The variable used in the recipe was not the one you thought was substituted** (immediate vs.
  deferred expansion, or a shell `$VAR` vs. a Make `$(VAR)` mix-up). Confirm with
  `make -p | grep '^<varname> ='` which value Make actually resolved, then see
  [Variables and Expansion](../fundamentals/variables-and-expansion.md).

## ".PHONY is being ignored"

GNU Make Manual, Phony Targets node
(`https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html`):

> Once this is done, `make clean` will run the recipe regardless of whether there is a file
> named `clean`.

The most common reason `.PHONY` appears to be "ignored" is that the target was never actually
declared phony (typo in the target name in the `.PHONY:` line, or the `.PHONY:` line missing
entirely) and a real file with the same name as the target exists in the working directory —
without the declaration, Make treats the existing file as satisfying the target and skips the
recipe.

The manual also documents a related, easy-to-miss failure mode:

> A phony target should not be a prerequisite of a real target file; if it is, its recipe will
> be run every time `make` considers that file.

So the inverse problem — "my file target rebuilds on every invocation even though its inputs
didn't change" — is frequently caused by a `.PHONY` target accidentally listed as one of that
file target's prerequisites, not by a timestamp bug. Check the prerequisite list of the
complaining file target for any name that also appears after `.PHONY:`.

The manual additionally notes implicit-rule search is skipped for `.PHONY` targets, so a phony
target will never be matched by a pattern/implicit rule — if you expected implicit-rule
resolution to apply to a target, verify it is not declared phony.

For the full list of GNU Make's other special targets (`.DEFAULT_GOAL`, `.DELETE_ON_ERROR`,
`.NOTPARALLEL`, `.WAIT`, etc.) and their minimum supported version, see
[Special Targets and Defaults](../execution/special-targets-and-defaults.md) —
this page only covers `.PHONY` failure diagnosis.

## "missing separator" / recipe parse errors

GNU Make Manual, Error Messages node
(`https://www.gnu.org/software/make/manual/html_node/Error-Messages.html`). This message means
Make could not find a valid separator (`:`, `=`, the recipe prefix character — a literal tab
by default, or whatever `.RECIPEPREFIX` is set to) on the line it just read. The single most
common cause is a recipe line indented with spaces instead of a tab character (or, if
`.RECIPEPREFIX` was redefined, the wrong prefix character) — eight spaces are never equivalent
to a tab for this purpose. See [Recipes and Shell](../fundamentals/recipes-and-shell.md) for
the tab/`.RECIPEPREFIX` rules in full.

Diagnostic step: run `cat -A Makefile | sed -n '<line>p'` (GNU `cat`) on the offending line
number reported in the error to see whether the leading whitespace is `^I` (tab) or spaces.

## "No rule to make target ..." / circular dependency warnings

These are two distinct, separately reported conditions in the GNU Make Manual's Error Messages
node:

- **No rule to make target** — Make could not find any explicit rule, pattern rule, or implicit
  rule whose target matches the requested name, and no file with that name exists either. Check
  for a typo in the target/prerequisite name, a missing `include` of the file defining the rule,
  or a pattern rule whose stem does not actually match.
- **Circular ... dependency dropped** — a dependency cycle was detected among prerequisites (for
  example `a` depends on `b`, and `b` (transitively) depends on `a`); Make breaks the cycle at
  the point it re-encounters the target and continues, which usually means one of the two rules
  is unintentional and should be removed.

## Parallel and recursive builds behaving unexpectedly

Not independently re-verified against the manual in this research pass (the `Parallel-Disable`
and `Parallel-Output` manual pages returned `HTTP 429` on every fetch attempt during this pass —
see [Sources and Compatibility](./sources-and-compatibility.md)). Do not rely on this page for
`.NOTPARALLEL` / `-j` / jobserver semantics; consult
[Parallel and Recursive Make](../execution/parallel-and-recursive-make.md) directly, or the GNU
Make Manual sections "Parallel Execution" and "Communicating Options to a Sub-`make`" first-hand,
before diagnosing a parallel-build issue.

## Recipe or child command failed but the build reported success

This is a shell/recipe-composition issue, not a Make-parsing issue, and is covered in
[Diagnostics and Exit Codes](../execution/diagnostics-and-exit-codes.md) and
[Recipes and Shell](../fundamentals/recipes-and-shell.md). At minimum, confirm which shell Make
invokes for recipes (`SHELL` / `.SHELLFLAGS`) and whether a pipeline's failure is actually
visible to Make
(a failing command earlier in a shell pipeline does not fail the recipe line unless the shell
and options in use propagate that failure) before assuming Make itself swallowed the error.

## Related

- [sources-and-compatibility](./sources-and-compatibility.md)

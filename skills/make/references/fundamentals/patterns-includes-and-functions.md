---
source:
  - https://www.gnu.org/software/make/manual/html_node/Pattern-Intro.html
  - https://www.gnu.org/software/make/manual/html_node/Static-Usage.html
  - https://www.gnu.org/software/make/manual/html_node/Using-Implicit.html
  - https://www.gnu.org/software/make/manual/html_node/Include.html
  - https://www.gnu.org/software/make/manual/html_node/Conditional-Syntax.html
  - https://www.gnu.org/software/make/manual/html_node/Text-Functions.html
  - https://www.gnu.org/software/make/manual/html_node/File-Name-Functions.html
  - https://www.gnu.org/software/make/manual/html_node/Shell-Function.html
  - https://www.gnu.org/software/make/manual/html_node/Foreach-Function.html
---

# Patterns, Includes, and Functions

Pattern rules and implicit rules let one rule cover many targets; `include` composes makefiles; conditionals and functions add light text-processing logic. Verified against "This is Edition 0.77, last updated 26 February 2023, of The GNU Make Manual, for GNU make version 4.4.1." (checked 2026-09-26).

## Signature / Usage

```makefile
%.o : %.c ; recipe…

objects = foo.o bar.o
$(objects): %.o: %.c
	$(CC) -c $(CFLAGS) $< -o $@

include config.mk
-include optional.mk

ifeq ($(CC),gcc)
CFLAGS += -Wall
endif
```

## Options / Props

| Feature | Syntax | Source-backed behavior |
| --- | --- | --- |
| Pattern rule | `%.o : %.c` | "A pattern rule contains the character '%' (exactly one of them) in the target; otherwise, it looks exactly like an ordinary rule." `%` "matches any nonempty substring, while other characters match only themselves"; the matched part is the stem. "`%` in a prerequisite of a pattern rule stands for the same stem that was matched by the `%` in the target." |
| Static pattern rule | `targets…: target-pattern: prereq-patterns…` | Explicitly restricts a pattern rule to a fixed `targets` list; the `target-pattern` extracts a stem per target that is substituted into `prereq-patterns`. Example: `$(objects): %.o: %.c` with recipe `$(CC) -c $(CFLAGS) $< -o $@`. |
| Implicit rule | (none written) | "To allow `make` to find a customary method for updating a target file, all you have to do is refrain from specifying recipes yourself. Either write a rule with no recipe, or don't write a rule at all." An explicit recipe you do write for a target is used instead of any matching implicit rule. |
| `include filenames…` | `include a.mk b.mk` | Missing file: "it is not an immediately fatal error; processing of the makefile containing the `include` continues" — but after parsing, make tries to rebuild the missing file, and only reports a fatal error if it cannot. |
| `-include` / `sinclude` | `-include a.mk` | "This acts like `include` in every way except that there is no error (not even a warning) if any of the filenames (or any prerequisites of any of the filenames) do not exist or cannot be remade." |
| `ifeq (a,b)` / `ifneq (a,b)` | see example | "Expand all variable references in arg1 and arg2 and compare them. If they are identical [ifeq] / different [ifneq], the text-if-true is effective." |
| `ifdef var` / `ifndef var` | see example | `ifdef`: "If the value of that variable has a non-empty value, the text-if-true is effective; otherwise, the text-if-false, if any, is effective." `ifndef`: the inverse test on an empty value. |

## Notes

- Static pattern rules vs plain pattern rules (this skill's summary of the Source-backed contrast above): a static pattern rule only ever applies to the `targets` explicitly listed, whereas an ordinary pattern rule is a general fallback make may apply to any matching target — prefer static pattern rules when you want the rule scoped to a known file list.
- `ifeq`/`ifneq`/`ifdef`/`ifndef` all require a matching `endif`; `else` is optional ("The syntax of a simple conditional with no `else` is as follows: conditional-directive / text-if-true / endif"). Evaluation timing: "make evaluates conditionals when it reads a makefile. Consequently, you cannot use automatic variables in the tests of conditionals because they are not defined until recipes are run."
- Frequently used functions (name, syntax, one-line meaning, all quoted verbatim from the manual):
  - `$(subst from,to,text)` — "Performs a textual replacement on the text text: each occurrence of from is replaced by to."
  - `$(patsubst pattern,replacement,text)` — "Finds whitespace-separated words in text that match pattern and replaces them with replacement."
  - `$(filter pattern…,text)` — "Returns all whitespace-separated words in text that do match any of the pattern words, removing any words that do not match."
  - `$(filter-out pattern…,text)` — "Returns all whitespace-separated words in text that do not match any of the pattern words, removing the words that do match one or more."
  - `$(strip string)` — "Removes leading and trailing whitespace from string and replaces each internal sequence of one or more whitespace characters with a single space."
  - `$(wildcard pattern)` — "The result of `wildcard` is a space-separated list of the names of existing files that match the pattern."
  - `$(dir names…)` — "The directory-part of the file name is everything up through (and including) the last slash in it."
  - `$(notdir names…)` — "Extracts all but the directory-part of each file name in names. If the file name contains no slash, it is left unchanged."
  - `$(abspath names…)` — "For each file name in names return an absolute name that does not contain any `.` or `..` components, nor any repeated path separators (`/`)."
  - `$(shell command)` — expands to the command's output; "The only processing `make` does on the result is to convert each newline (or carriage-return / newline pair) to a single space. If there is a trailing (carriage-return and) newline it will simply be removed." Design guidance (this skill's note, not fetched from the manual page cited above): treat `$(shell …)` as running whenever make expands the containing text, not once per `make` invocation, and verify the exact timing against the manual before relying on it for anything order-sensitive.
  - `$(foreach var,list,text)` — "For each word of the expanded value of list, the variable named by the expanded value of var is set to that word, and text is expanded" and the results are concatenated with spaces. "The `foreach` function has no permanent effect on the variable var; its value and flavor after the `foreach` function call are the same as they were beforehand."
- Advanced macros (`call`, `eval`, `value`, `origin`) are not covered on this page; consult the official GNU Make manual's Functions chapter directly for those.

## Related

- [rules-and-prerequisites.md](./rules-and-prerequisites.md) — ordinary (non-pattern) rules that pattern rules generalize
- [variables-and-expansion.md](./variables-and-expansion.md) — `$*` automatic variable reports the stem matched by `%`
- [recipes-and-shell.md](./recipes-and-shell.md) — `$(shell …)` function output vs. a recipe's own shell invocation

---
source:
  - https://www.gnu.org/software/make/manual/html_node/Recursive-Assignment.html
  - https://www.gnu.org/software/make/manual/html_node/Simple-Assignment.html
  - https://www.gnu.org/software/make/manual/html_node/Appending.html
  - https://www.gnu.org/software/make/manual/html_node/Conditional-Assignment.html
  - https://www.gnu.org/software/make/manual/html_node/Overriding.html
  - https://www.gnu.org/software/make/manual/html_node/Environment.html
  - https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html
  - https://www.gnu.org/software/make/manual/html_node/Variables-in-Recipes.html
  - https://cgit.git.savannah.gnu.org/cgit/make.git/plain/NEWS?h=4.4.1
---

# Variables and Expansion

GNU Make has four assignment operators with different expansion timing, a fixed precedence order between makefile / command line / environment, and a set of automatic variables computed per-rule. Verified against "This is Edition 0.77, last updated 26 February 2023, of The GNU Make Manual, for GNU make version 4.4.1." (checked 2026-09-26).

## Signature / Usage

```makefile
CFLAGS = -Wall          # recursively expanded (=)
SRCS := $(wildcard *.c) # simply expanded (:=)
CC ?= gcc                # conditional assignment (?=)
CFLAGS += -O2             # append (+=)
```

## Options / Props

| Operator | Flavor | Expansion timing |
| --- | --- | --- |
| `=` | recursively expanded | "The value you specify is installed verbatim; if it contains references to other variables, these references are expanded whenever this variable is substituted (in the course of expanding some other string)." |
| `:=` (or `::=`) | simply expanded | "The value of a simply expanded variable is scanned once, expanding any references to other variables and functions, when the variable is defined... when the variable is used the value is copied verbatim." `::=` is POSIX-standard spelling; both are equivalent in GNU make. `::=` was **introduced in GNU Make 4.0** (09 Oct 2013) per the official NEWS file: "New feature: '::=' simple assignment operator as defined by POSIX in 2012. This operator has identical functionality to ':=' in GNU Make..." — unavailable in this skill's local verification environment (GNU Make 3.81); prefer plain `:=` there. |
| `?=` | conditional | "This is called a conditional variable assignment operator, because it only has an effect if the variable is not yet defined." A variable set to an empty value still counts as defined, so `?=` will not overwrite it. |
| `+=` | append | Behavior depends on how the variable was first defined (see Notes). |

## Notes

- Recursive-variable self-reference danger: `CFLAGS = $(CFLAGS) -O` causes infinite expansion. "Actually `make` detects the infinite loop and reports an error."
- `+=` semantics by prior flavor:
  - Undefined variable: "'+=' acts just like normal '=': it defines a recursively-expanded variable."
  - Previously `:=`/`::=` (simply expanded): "'+=' adds to that simply-expanded definition, and expands the new text before appending it."
  - Previously `=` (recursively expanded): "`make` appends the un-expanded text to the existing value, whatever it is."
- Precedence — command line vs makefile: "If you specify a value in this way [command line], all ordinary assignments of the same variable in the makefile are ignored; we say they have been overridden by the command line argument." A makefile can reclaim control with `override variable = value`.
- Precedence — environment vs makefile: "Every environment variable that `make` sees when it starts up is transformed into a `make` variable with the same name and value." By default, "an explicit assignment in the makefile, or with a command argument, overrides the environment"; passing `-e` flips this so "values from the environment override assignments in the makefile."
- Overall default precedence (highest to lowest, this skill's summary of the above Source-backed rules): command line > makefile (`override` can force makefile to win over command line) > environment; with `-e`, environment beats plain makefile assignments. Whether `-e` also overrides an `override`-protected makefile assignment was not verified against the manual's `Overriding.html` / `Environment.html` pages fetched for this skill and is left unstated here.
- Make's `$` vs shell's `$`: "Variable and function references in recipes have identical syntax and semantics to references elsewhere in the makefile... if you want a dollar sign to appear in your recipe, you must double it (`$$`)." Example: `for i in $(LIST); do echo $$i; done` — `$(LIST)` is expanded by make, `$$i` becomes `$i` for the shell to expand.

### Automatic variables (computed per rule, valid only inside the recipe)

| Variable | Meaning |
| --- | --- |
| `$@` | "The file name of the target of the rule. If the target is an archive member, then `$@` is the name of the archive file." |
| `$<` | "The name of the first prerequisite. If the target got its recipe from an implicit rule, this will be the first prerequisite added by the implicit rule." |
| `$^` | "The names of all the prerequisites, with spaces between them... A target has only one prerequisite on each other file it depends on" (duplicates removed). |
| `$?` | "The names of all the prerequisites that are newer than the target, with spaces between them. If the target does not exist, all prerequisites will be included." |
| `$*` | "The stem with which an implicit rule matches... If the target is `dir/a.foo.b` and the target pattern is `a.%.b` then the stem is `dir/foo`." |
| `$(@D)` | "The directory part of the file name of the target, with the trailing slash removed. If the value of `$@` is `dir/foo.o` then `$(@D)` is `dir`." |
| `$(@F)` | "The file-within-directory part of the file name of the target. If the value of `$@` is `dir/foo.o` then `$(@F)` is `foo.o`." |

## Related

- [rules-and-prerequisites.md](./rules-and-prerequisites.md) — targets/prerequisites that automatic variables refer to
- [patterns-includes-and-functions.md](./patterns-includes-and-functions.md) — `%` stem matching that `$*` reports
- [recipes-and-shell.md](./recipes-and-shell.md) — how `$$` interacts with shell quoting inside a recipe line

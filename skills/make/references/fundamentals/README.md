# fundamentals

| Name | Description | Path |
| --- | --- | --- |
| Rules and Prerequisites | target / prerequisite / recipe, normal vs order-only prerequisites, out-of-date determination, file targets vs `.PHONY` targets | [rules-and-prerequisites.md](./rules-and-prerequisites.md) |
| Variables and Expansion | `=` / `:=` / `?=` / `+=` assignment operators, recursive vs simple expansion, command-line / makefile / environment precedence, automatic variables (`$@` `$<` `$^` `$?` `$*`), make `$` vs shell `$` | [variables-and-expansion.md](./variables-and-expansion.md) |
| Patterns, Includes, and Functions | pattern rules, static pattern rules, implicit rules, `include` / `-include`, `ifeq`/`ifneq`/`ifdef`/`ifndef` conditionals, common text/file/shell/foreach functions | [patterns-includes-and-functions.md](./patterns-includes-and-functions.md) |
| Recipes and Shell | tab / `.RECIPEPREFIX` recipe prefix, per-line subshell execution, `SHELL` / `.SHELLFLAGS`, `.ONESHELL`, `$$` shell escaping, exit-code and error-flag handling | [recipes-and-shell.md](./recipes-and-shell.md) |

---
source:
  - https://www.gnu.org/software/make/manual/html_node/Instead-of-Execution.html
  - https://www.gnu.org/software/make/manual/html_node/Remaking-Makefiles.html
  - https://www.gnu.org/software/make/manual/html_node/Reading-Makefiles.html
---

# Safety and Portability

Design guidance for treating Make invocations as safe-by-default operations, and the
source-backed facts about `make`'s own dry-run/diagnostic flags that make "just run `-n`
first" an unsafe assumption.

## Signature / Usage

```bash
# Read-only inspection only — never run this against an unreviewed Makefile
# expecting it to be side-effect-free (see Notes).
make -n <target>   # --just-print / --dry-run
make -q <target>   # --question
```

## Source-backed behavior: `-n` / `-q` are not safe static analysis

- Source: GNU Make Manual, "9.3 Instead of Executing Recipes"
  (`https://www.gnu.org/software/make/manual/html_node/Instead-of-Execution.html`),
  content confirmed verbatim via mirror `https://docs.w3cub.com/gnu_make/instead-of-execution.html`
  on 2026-09-26 (direct WebFetch to this specific gnu.org page returned HTTP 429 "Too
  Many Requests" on every retry this session — other gnu.org manual pages did
  eventually succeed later in the same session, see the "Reading Makefiles" source
  below; the mirror text below is a verbatim reproduction of the same manual, not a
  paraphrase). This skill's `references/architecture/command-contracts.md`
  independently confirmed via direct fetch that the current manual is "Edition 0.77"
  documenting GNU `make` version 4.4.1 (confirmed 2026-09-26); the facts below are
  treated as applying to that same edition.
  - "print the recipes that are needed to make the targets up to date, but not
    actually execute them" — the documented purpose of `-n`.
  - "some recipes are still executed, even with this flag" and "any recipes needed to
    update included makefiles are still executed."
  - "only the line containing the `+` character or the strings `$(MAKE)` or `${MAKE}`
    is run regardless of these options" — recursive `make` invocations run for real
    even in dry-run mode, and this applies to both `-n` and `-q` (and `-t`) per the
    manual.
  - `-q`: "silently check whether the targets are up to date, but do not execute
    recipes; the exit code shows whether any updates are needed" (0 = up to date,
    1 = updates needed, 2 = error).
- Source: GNU Make Manual, "Remaking Makefiles"
  (`https://www.gnu.org/software/make/manual/html_node/Remaking-Makefiles.html`),
  content confirmed verbatim via mirror `https://docs.w3cub.com/gnu_make/remaking-makefiles.html`
  on 2026-09-26 (this specific gnu.org page also returned HTTP 429 on every retry this
  session):
  - "`-q` (or `--question`) and `-n` (or `--just-print`) do not prevent updating of
    makefiles, because an out-of-date makefile would result in the wrong output for
    other targets." — i.e. recipes that rebuild an **included makefile** still run even
    under `-n`/`-q`.
- Source: GNU Make Manual, "Reading Makefiles"
  (`https://www.gnu.org/software/make/manual/html_node/Reading-Makefiles.html`),
  confirmed via direct fetch 2026-09-26:
  - Make processes a makefile in two phases: "During the first phase it reads all the
    makefiles, included makefiles, etc. and internalizes all the variables and their
    values and implicit and explicit rules, and builds a dependency graph of all the
    targets and their prerequisites."
  - `:=`/`::=` assignments are `immediate := immediate` — both the variable name and
    its value are expanded during this first (read/parse) phase, i.e. before target
    selection and before `-n`/`-q` have any chance to suppress anything.
  - "For the shell assignment operator `!=`, the right-hand side is evaluated
    immediately and handed to the shell," also during this first phase.
  - `include` directives are processed during this same first phase, together with
    the rest of the makefile text (this node does not itself detail the line-by-line
    parsing steps — see Notes for the separate "How Makefiles Are Parsed" node, not
    fetched directly this session).

**Design guidance derived from these facts:** `make -n` only suppresses the *recipe
execution* phase. It does not suppress (a) rebuilding included makefiles, (b) recursive
`$(MAKE)` recipe lines, or (c) any shell command embedded in `:=`/`!=`/`$(shell ...)`
at parse time. Any of these can run arbitrary code before `-n` or `-q` is even
evaluated. Do not treat `make -n`/`make -q` against an unreviewed or untrusted Makefile
as equivalent to a text-only static analyzer. The only genuinely side-effect-free
inspection of a Makefile is reading its text (grep/cat/an editor), not invoking `make`
against it at all.

## Operation safety boundaries (design guidance)

This skill's own auxiliary scripts (`scripts/bin/*.mjs`) and any Make/Cargo/pnpm
commands they may reference follow these boundaries. They are this skill's design
choice, not a guarantee GNU Make, Cargo, or Anthropic enforce mechanically.

| Operation | May read | May execute externally | May write | Notes |
| --- | --- | --- | --- | --- |
| `consult` | references/samples/scripts text only | never | never | Default mode. No Makefile, shell script, or package script is invoked, including `-n`/`-q`. |
| `audit` | target repo files (Makefile, package.json, Cargo.toml, CI config, lockfiles) via static text/AST reads | never (no `make`, no `cargo`/`npm`/`pnpm` invocation, no existing helper scripts) | only an explicitly-requested report file | Does not run `make -n`, `cargo metadata`/`cargo build` (which can execute `build.rs`/proc-macros), `npm install`/`pnpm install` (which can run lifecycle scripts), or any discovered script — see caveat above for why `-n` is excluded and why "just read the config" is not the same as "just run the tool". |
| `plan` | same as audit, plus prior audit output | never | never (target files unchanged) | Produces an entry point choice, source-of-truth assignment, command contracts, files to change, added dependencies, risks, alternatives, migration steps, and a verification plan. Judgment stays with Claude; helper scripts only check format/observation/consistency. |
| `apply` | plan output + current file state (re-checked for drift) | never on its own | only the files explicitly listed in an approved plan | Re-reads target files immediately before editing in case they changed since planning; re-plans instead of forcing a stale diff. Never full-replaces Makefile/Cargo.toml/package.json/hooks/CI config. |
| `verify` | approved plan's verification section | **only** the specific commands named in the approved plan, with explicit user authorization for anything requiring dependency/toolchain download or network access | build/test caches and reports only (not source) | Static consistency checks and real command execution are two separate steps. `build`/`test`/`check` targets are arbitrary project code execution — `build.rs`, proc-macros, and package-manager lifecycle scripts (`npm`/`pnpm` `preinstall`/`postinstall`, Cargo build scripts) all count as code execution requiring the same authorization as network access, not merely a local no-op. Missing environment/tooling is reported as `BLOCKED`/`SKIPPED`, never silently upgraded to `PASS`. |

## Notes

- **Parsing-Makefiles.html not directly confirmed:** GNU Make Manual, "How Makefiles Are
  Parsed" (`https://www.gnu.org/software/make/manual/html_node/Parsing-Makefiles.html`)
  was never successfully fetched this session (HTTP 429 on every retry); its existence
  and node title were confirmed only via WebSearch snippets, not verbatim page content.
  Treat any claim about its line-by-line parsing steps as unconfirmed until a future
  pass fetches it directly.
- **Bash vs. POSIX `sh`:** Recipes and helper scripts in this skill's samples assume
  Bash-specific syntax (`[[ ]]`, arrays, `set -o pipefail`) only where the shebang is
  `#!/usr/bin/env bash` and the recipe's `SHELL`/`.SHELLFLAGS` (or `.ONESHELL`) target
  Bash explicitly. Never suggest running a Bash-syntax script under a plain `sh`
  invocation — POSIX `sh` (dash, and many `/bin/sh` symlinks on Debian/Ubuntu) does not
  support Bash-only constructs and will fail or silently misbehave. State the assumed
  Bash minimum version next to any Bash-only construct.
- **Verified vs. unverified OS/shell combinations:** treat only combinations this
  skill's samples/tests were actually run against as "supported"; everything else is
  "design intent, unverified" until an eval or test records a real run. macOS and Linux
  with a real Bash on `PATH` are the baseline. Git Bash on Windows behaves like a
  POSIX-ish Bash but with Windows path translation quirks (`/c/Users/...` vs
  `C:\Users\...`) that recipes must account for explicitly, not assume away. Native
  Windows without Git Bash/WSL (`cmd.exe`, PowerShell as `SHELL`) is a materially
  different execution model — do not claim a Bash-authored recipe or sample "works on
  Windows" unless it was exercised under that exact shell.
- **Paths with spaces, non-ASCII (e.g. Japanese), or shell-special characters:**
  quote all path expansions in recipes and helper scripts (`"$@"`, `"$<"` is already
  single-token safe, but `$(wildcard ...)`/`$(shell find ...)` results must be quoted
  when reused). Do not assume a repository root or target path is ASCII-only or
  space-free; this skill's audit/inspect scripts must not `eval` or unquote such paths.
- **CRLF line endings:** a Makefile recipe line containing a stray `\r` (common when a
  file is edited on Windows without CRLF normalization) can cause the shell invoked for
  that recipe to see a mangled command line or a spurious trailing character. Treat
  CRLF detection as part of static audit, not something to silently "fix" without an
  approved plan.
- **Executable permission and symlinks:** helper scripts under `scripts/bin/` must be
  invoked via an explicit interpreter (`node scripts/bin/foo.mjs`) rather than assuming
  the executable bit and shebang survived a checkout/download; do not chase a symlink
  outside the intended target root during audit — resolve and check the real path stays
  within the declared root before reading further.
- **GNU vs. BSD command differences:** samples and helper scripts must not assume GNU
  coreutils/`sed`/`find`/`xargs` flags (e.g. GNU `sed -i` without a suffix argument)
  work unchanged on macOS's BSD-derived toolset, and vice versa. Where a recipe needs a
  GNU-only flag, say so explicitly and give the BSD-safe alternative or a version check
  instead of assuming one OS.
- **Prohibited in every mode above:** printing or logging secret values (`.env`
  contents, tokens, credentials found during audit), sourcing environment files to
  "test" them, performing authentication the user did not explicitly request, invoking
  `sudo` or any privilege escalation, silently installing missing tools/toolchains,
  loosening branch-protection/CI/hook configuration, or bypassing Git hooks/CI checks
  (e.g. `--no-verify`). A sandbox or permission error encountered during any of the
  above is reported as `BLOCKED`, not worked around.
- **Network requirements and write-scope ledger for this skill** (this skill's own
  ledger — no assumption that another repository's `docs/skill-network-requirements.md`
  exists here):

  | Mode | Network required | Write scope |
  | --- | --- | --- |
  | `consult` | none | none |
  | `audit` (static) | none | none (unless the user explicitly asks for a saved report file, scoped to a path they name) |
  | `plan` | none | none |
  | `apply` (user-approved) | none by itself | only the files explicitly listed in the approved plan |
  | `verify` — static consistency checks | none | build/test cache and report directories only |
  | `verify` — real command execution | only if the approved verification command itself needs it (e.g. `cargo build` fetching crates, `pnpm install`), and only with explicit user authorization; otherwise report `BLOCKED` | whatever the executed command legitimately writes (build artifacts, caches); never source files outside the approved plan |

  Do not infer "offline-capable" or "fully workspace-contained" from an operation name
  alone; the actual target root, output destination, tool caches, and real command
  behavior determine this per invocation.

## Related

- [Parallelism and Recovery](./parallelism-and-recovery.md)
- [Diagnostics and Exit Codes](../execution/diagnostics-and-exit-codes.md)
- [GNU/POSIX/BSD Compatibility](../execution/gnu-posix-bsd-compatibility.md)

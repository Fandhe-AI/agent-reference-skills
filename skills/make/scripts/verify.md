# verify

`verify-layout.mjs` (static consistency only) and `run-checks.mjs` (real command execution,
gated behind `--execute` and per-check approval) — the `verify` step of this skill's
consult/audit/plan/apply/verify pattern. These two scripts are deliberately separate: **static
consistency checking and actual command execution are two different steps**, and only
`run-checks.mjs` ever launches an external process. Reading this page never launches either
script.

Paths are written as `node <skill-dir>/scripts/bin/<name>.mjs ...`; see `inspect.md` for why
`<skill-dir>` varies by install form. Both scripts need only Node.js (standard library, no npm
dependencies) to run themselves; whether a given `checks[].command` (e.g. `cargo`, `pnpm`,
`make`) needs anything beyond Node is a property of that command, not of these scripts.

## verify-layout

### When to use it

After a plan has been (or would be) applied, to statically check: does the target `Makefile`
exist and parse; do `## `-commented help entries point at targets that actually exist; are any
help-advertised targets outside `.PHONY` (reported as an advisory, not a failure, since some
targets are legitimately file targets); and does the Makefile reference this skill's own
installation path (`skills/make/`, `.claude/skills/make/`, `.agents/skills/make/`) in a way that
would make the target project depend on where this skill happens to be installed.

### When not to run it

- Before any `Makefile` exists at the target — the script reports `NOT_APPLICABLE` in that case
  rather than failing, so there is no harm running it, but it will not tell you anything useful
  yet.
- As a substitute for actually running the Makefile's recipes — it does not parse or execute
  recipe (tab-indented) lines at all; real shell content inside a recipe is out of scope and is
  explicitly listed in the result's `unresolved` array, not silently assumed safe.

### Input

```
--root <path>       target directory to check (required)
--makefile <name>   Makefile filename to check (default: Makefile)
--json              emit JSON to stdout (diagnostics go to stderr instead)
--help              show usage
```

### Required permissions / dependencies

Node.js only. Read access to `--root`/`<makefile>`. **Never executes `make` or any other
command** — it only reads the Makefile's text and applies a regex-based parse for `##`-commented
help lines, target lines, and `.PHONY` lines.

### Example invocation

```sh
node <skill-dir>/scripts/bin/verify-layout.mjs --root /path/to/target-repo --json
```

### Example against a disposable fixture

```sh
tmp="$(mktemp -d)"
printf '.PHONY: help\nhelp: ## Show this help\n\t@echo hi\n' > "${tmp}/Makefile"
node <skill-dir>/scripts/bin/verify-layout.mjs --root "${tmp}"
```

Actual run (2026-09-26):

```
verify-layout: PASS (root=<tmp>)
  - [PASS] Makefile を確認 (Makefile)
  - [PASS] help エントリと target が一致: help (L2)
  - [PASS] Skill 固有パスへの依存は検出されませんでした
```

Exit code: `0`. Matches the expectation exactly: overall `status: "PASS"`, a `makefile-presence` PASS finding, a
`help:help` PASS finding (the `help` target both exists and is declared `.PHONY`), and a
`skill-path-dependency` PASS finding (no `skills/make`-style path referenced). Findings point at
the Makefile by line number only (`evidence: "L2"`); the line's own text (help comment, recipe) is
never copied into the result, so a token written into a Makefile cannot leak into JSON or CI logs.
Confirmed via
`--json`, which also reports `"helpEntryCount": 1`, `"targetCount": 2`, and an `unresolved` array
with two entries: recipe (tab-indented) shell content is not parsed, and `include`d file contents
are not expanded.

### `--help` output

Transcribed verbatim from `scripts/bin/verify-layout.mjs`'s `HELP` string:

```
verify-layout — 適用後構成の help/公開コマンド整合性・Skill 固有パス依存を静的確認する

使い方:
  node verify-layout.mjs --root <path> [オプション]

オプション:
  --root <path>       確認対象ディレクトリ（必須）
  --makefile <name>   確認する Makefile 名（既定: Makefile）
  --json              結果を JSON で stdout に出力（診断は stderr）
  --help              このヘルプを表示

終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL, 2=引数エラー, 3=BLOCKED

実行しない条件: 常に実行しない（make や任意コマンドを起動しない。ファイルを読むだけ）。
未確認の扱い: recipe 内部の実際の shell 解析は行わず、該当箇所は status: NOT_APPLICABLE で明示する。
```

### Exit codes

| Code | Meaning |
| --- | --- |
| 0 | `PASS`, or `NOT_APPLICABLE` (no Makefile found at `--root`/`--makefile`) |
| 1 | `FAIL` (a help entry points at a nonexistent target, or a skill-install-path dependency was found) |
| 2 | Argument error (missing `--root`, unknown flag, or a `--makefile` value that is empty, is not a regular file, or resolves outside `--root` via `..`, an absolute path, or a symlink) |
| 3 | not used by this script |

### What to do next on failure

- **Exit 1, `help:<target>` FAIL**: a `## `-commented help line advertises a target that does
  not exist in the Makefile — either the help comment or the target name has drifted; fix the
  Makefile (via an approved plan/apply step, not by editing here) rather than the help text
  alone.
- **Exit 1, `skill-path-dependency` FAIL**: the target Makefile references this skill's own
  installation path. A target project's Makefile must not depend on where this skill happens to
  be checked out/symlinked — rewrite the referenced recipe to use the target project's own paths
  instead.
- Items in `unresolved` (recipe shell content, `include`d file contents) are not failures — they
  are explicitly out of this script's static-analysis scope. Do not report them as "confirmed
  safe"; if they matter, read the Makefile directly or ask the user.

## run-checks

### When to use it

Only after a plan has passed `validate-plan.mjs` **and** the user has explicitly approved
running its `checks[]` — i.e. actual `verify` with real command execution, as opposed to the
static-only steps above. `run-checks.mjs` re-validates the entire plan with the same
`validate-plan.mjs` logic every time it runs (it does not trust a plan or an earlier approval it
did not just re-check), and defaults to dry-run.

### When not to run it

- Without `--execute`: this is the default and safe to run any time a plan exists — it reports
  what *would* run, without running anything.
- With `--execute` but without each intended `check.approved === true` already set in the plan
  JSON itself: those specific checks are reported `BLOCKED` and skipped, not force-run.
- Against a plan whose target files might have changed since it was drafted — `run-checks.mjs`
  re-runs `validate-plan.mjs`'s shape/escape/`matches-hash` checks first, and refuses to run any
  check (reporting the whole result as `BLOCKED`) if that re-validation fails. Re-plan instead of
  editing the plan JSON by hand to force it through.
- When a `checks[].command` itself needs dependency/toolchain download or network access (e.g.
  `cargo build` fetching crates, `pnpm install`) — that needs its own explicit user
  authorization beyond "the plan was approved"; see
  `references/operations/safety-and-portability.md`'s network/write-scope ledger.

### Input

```
--plan <path.json>   plan JSON file (required; same schema as validate-plan.mjs)
--execute            actually run commands (default: dry-run, nothing executes)
--json               emit JSON to stdout (diagnostics go to stderr instead)
--help               show usage
```

### Required permissions / dependencies

Node.js only, to run `run-checks.mjs` itself. **With `--execute`**, whatever each individual
`checks[].command` requires (e.g. `cargo`, `make`, `pnpm` on `PATH`; possibly network access if
that command needs it) — `run-checks.mjs` does not install or provision any of this itself, and
reports a check as `FAIL`/non-zero rather than silently working around a missing tool.

> **Warning**: `--execute` runs real, user-approved project commands (`checks[].command` +
> `checks[].args`) inside `checks[].cwd`, which can build code, run tests, or otherwise execute
> arbitrary project-controlled logic (`build.rs`, proc-macros, package-manager lifecycle
> scripts, etc. all count as code execution). Never pass `--execute` against a plan whose
> `checks[]` were not reviewed and explicitly approved (`approved: true` per check) by the
> repository owner. Commands are launched via `execFileSync` with an explicit executable and
> argument array (`shell: false`) rather than a shell string — **using an argument array reduces
> risk, it does not make running arbitrary target-controlled code safe by itself.** On Windows,
> `.cmd`/`.bat` targets are routed through a dedicated `cmd.exe /d /s /c` wrapper
> (`lib/exec-safe.mjs`) because Node's `execFileSync` cannot launch them directly with
> `shell: false`; `cmd.exe` re-interprets its own argument string internally, so this wrapper is
> a best-effort risk reduction, not a guarantee against `cmd.exe`-level metacharacter
> reinterpretation. To keep an approved check from turning into a different command, any
> `.cmd`/`.bat` check whose command or `args` contain a `cmd.exe` metacharacter
> (`& | < > ^ % ! " ( )`), whitespace (`cmd.exe /c` re-joins and re-splits the command line, so
> `foo bar` would become two arguments), or an empty argument is reported `BLOCKED` with
> `executed: false` and is never launched.

### Example invocation (dry-run, default — safe to run any time a plan exists)

```sh
node <skill-dir>/scripts/bin/run-checks.mjs --plan /path/to/plan.json --json
```

### Example invocation (real execution, only with explicit per-check approval)

```sh
node <skill-dir>/scripts/bin/run-checks.mjs --plan /path/to/approved-plan.json --execute --json
```

Actual run (2026-09-26), against a plan with two `checks[]` (`echo hello`, unapproved;
`echo world`, `approved: true`):

Dry-run (default, no `--execute`) — `--json`:

```json
{
  "status": "SKIPPED",
  "profile": "dry-run",
  "unresolved": [
    "dry-run のため checks は実行していません。実行するには --execute と各 check の approved:true が必要です"
  ],
  "checks": [
    { "name": "unapproved-echo", "status": "SKIPPED", "executed": false, "reason": "dry-run（--execute 未指定）" },
    { "name": "approved-echo",   "status": "SKIPPED", "executed": false, "reason": "dry-run（--execute 未指定）" }
  ]
}
```

Exit code: `0`. This confirms: without `--execute`, every `checks[]` entry is reported
`status: "SKIPPED"`, `executed: false`, `reason: "dry-run（--execute 未指定）"`, and the overall
result `status` aggregates to `"SKIPPED"`.

With `--execute` (same plan, `unapproved-echo` still lacks `approved: true`) — `--json`:

```json
{
  "status": "BLOCKED",
  "profile": "execute",
  "unresolved": ["承認不足で未実行: unapproved-echo"],
  "checks": [
    { "name": "unapproved-echo", "status": "BLOCKED", "executed": false,
      "reason": "この check には approved:true がありません（承認不足のため実行しません）" },
    { "name": "approved-echo", "status": "PASS", "executed": true, "exitCode": 0,
      "signal": null, "timedOut": false, "errorCode": null, "viaShellWrapper": false }
  ]
}
```

Exit code: `3`. This confirms: with `--execute` against a check lacking `approved: true`, that
check is reported `status: "BLOCKED"`, `executed: false` instead of being force-run — while the
approved check actually runs (`executed: true`, `exitCode: 0`) and the overall result
`status` is `"BLOCKED"` because at least one check was blocked. The command's own stdout/stderr
(`world` here) is neither captured nor printed: `run-checks.mjs` launches checks with
`stdio: "ignore"` so that a verification command that prints a token or credential cannot leak
it into the JSON result, CI logs, or a report. Only `exitCode`, `signal`, `timedOut`, and an OS
`errorCode` (e.g. `ENOENT`) are recorded. The plan's own `command`, `args`, and `cwd` are not
echoed either (an argument may carry a token): each result is identified by `checks[].name`, which
`validate-plan.mjs` requires to be unique, and the command line itself is reviewed in the plan
file. A `.cmd`/`.bat` check blocked for `cmd.exe` metacharacters names only the position
(`command` or `args[i]`) in `reason`, never the offending value.

### `--help` output

Transcribed verbatim from `scripts/bin/run-checks.mjs`'s `HELP` string:

```
run-checks — 承認済み計画の検証コマンドのみを実行する（既定は dry-run）

使い方:
  node run-checks.mjs --plan <path.json> [オプション]

オプション:
  --plan <path>   計画 JSON ファイルへのパス（必須。validate-plan と同じスキーマを再検証する）
  --execute       実際にコマンドを起動する（既定は dry-run。個々の check は approved:true も必要）
  --json          結果を JSON で stdout に出力（診断は stderr）
  --help          このヘルプを表示

終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL, 2=引数エラー, 3=BLOCKED

実行しない条件:
  - --execute を指定しない限り、常に dry-run（コマンドを起動しない）
  - --execute 指定時も、個々の check に approved:true がない場合はその check を BLOCKED のまま実行しない
  - 計画の形式検証（validate-plan と同じロジック）に失敗した場合は全体を BLOCKED にし何も実行しない

計画内の root が相対パスの場合、起動時の cwd ではなく計画ファイル自身のディレクトリを基準に解決する
（validate-plan.mjs と同じ解決基準）。checks[].cwd はその解決後の root を基準に解決する。
```

### Exit codes

| Code | Meaning |
| --- | --- |
| 0 | `PASS`, `SKIPPED` (dry-run, or no checks defined maps to `NOT_APPLICABLE`) |
| 1 | `FAIL` (a check command executed and failed, timed out, or exited non-zero) |
| 2 | Argument error (missing `--plan`, unknown flag) |
| 3 | `BLOCKED` (plan re-validation failed, or one or more checks lacked `approved: true`) |

### What to do next on failure/blocked

- **Exit 3, whole result `BLOCKED` (plan re-validation failed)**: the plan's target files, or
  the plan JSON itself, changed or were never valid in the first place. Re-run
  `validate-plan.mjs` directly to see the specific finding, fix or re-draft the plan, and get it
  re-approved — do not retry `run-checks.mjs --execute` against the same unmodified plan file
  expecting a different result.
- **Exit 3, individual checks `BLOCKED` (missing `approved: true`)**: those specific checks were
  not approved in the plan JSON. Do not hand-edit the plan JSON to set `approved: true` without
  the repository owner's actual sign-off — that field exists to represent real approval, not to
  be flipped to unblock the script.
- **Exit 1, a check `FAIL`**: read `exitCode`/`signal`/`timedOut`/`errorCode` in the result for
  that check. Command output is deliberately not recorded; to see why it failed, ask the user to
  run that one command directly (or run it yourself once they approve), rather than adding
  output capture back. A `timedOut: true` result (default `timeoutMs`: 60000ms per check, configurable
  per `checks[].timeoutMs` in the plan) is reported as `FAIL`, not silently retried with a longer
  timeout — raise the timeout in the plan (and re-approve) only if the user agrees the check
  legitimately needs longer.
- **Missing tool** (e.g. `cargo`/`make`/`pnpm` not on `PATH`): reported as a `FAIL` with a
  `null` exit code and `errorCode: "ENOENT"`, not silently converted to
  `SKIPPED`/`PASS`. Report this to the user as an environment gap rather than installing the
  missing tool yourself.
- A `BLOCKED`/`SKIPPED` status is never rounded up to `PASS` in the JSON `status` field, whether
  the process exit code was 0 (dry-run) or 3 (blocked) — check `status`, not just the exit code,
  before reporting a result as passing.

## Running the regression test suite

The scripts above are covered by `node:test`-based regression tests under `skills/make/tests/`.
Run from the repository root:

```sh
bash -c 'set -euo pipefail; shopt -s globstar failglob; node --test skills/make/tests/**/*.test.mjs'
```

`failglob` makes the command fail loudly (rather than silently matching zero files) if the test
glob ever resolves to nothing, so a broken path does not get reported as "0 tests, success." See
`skills/make/tests/README.md` for the full list of test files and what each one covers (exit-code
contract, `--help`/unknown-flag behavior, root-escape/symlink-escape detection, secret-filename
non-leakage, dry-run-by-default, Windows `.cmd`/`.bat` handling logic, etc.).

Actual run (2026-09-26, repository root, Node v24.13.0):

```
ℹ tests 101
ℹ suites 0
ℹ pass 101
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

Exit code: `0`. All 101 tests passed, 0 failed, on this run. The exact test count grows as tests
are added — re-run this command rather than relying on the count above if it matters to the task
at hand.

## Notes shared by both scripts

- Neither script's output should be treated as a security sandbox or an OS-level isolation
  boundary. `verify-layout.mjs`'s static parse and `run-checks.mjs`'s plan re-validation
  (including the `matches-hash` sha256 comparison inherited from `validate-plan.mjs`) are change-
  detection and consistency aids only.
- `run-checks.mjs --execute` is the only point in this skill's entire `scripts/bin/` where an
  external command is actually launched. Every other script (`inspect-repo.mjs`,
  `validate-plan.mjs`, `preview-sample.mjs` without `--apply`, `verify-layout.mjs`) only reads
  (and, for `preview-sample.mjs --apply`, writes) files.

## Related

- [plan-and-preview](./plan-and-preview.md) — `validate-plan.mjs`'s shape/escape/`matches-hash`
  logic, shared with `run-checks.mjs`'s pre-execution re-validation.
- [inspect](./inspect.md) — the audit step that typically precedes drafting a plan to verify.
- [safety-and-portability](../references/operations/safety-and-portability.md) — the full
  consult/audit/plan/apply/verify read/execute/write boundary table and the network-requirements
  ledger for `verify`'s real command execution.

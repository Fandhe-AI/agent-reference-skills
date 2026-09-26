# plan-and-preview

`validate-plan.mjs` and `preview-sample.mjs` — the `plan` step of this skill's
consult/audit/plan/apply/verify pattern. Both scripts only check format, observation, and
consistency; **the design judgment (which entry point to adopt, which command contract to use,
whether to apply a sample at all) stays with Claude**, not with either script. Reading this page
never launches either script.

Paths are written as `node <skill-dir>/scripts/bin/<name>.mjs ...`; see `inspect.md` for why
`<skill-dir>` varies by install form and is resolved at runtime from `import.meta.url`, not from
`cwd`. Both scripts require only Node.js (standard library, no npm dependencies) to run; the
*samples* `preview-sample.mjs` previews (e.g. `rust-crate`) require no Node.js themselves to be
built/used once adopted by a target project.

## validate-plan

### When to use it

After drafting a plan (entry point choice, source-of-truth assignment, command contract, files
to change, added dependencies, risks, alternatives, migration steps, verification plan — see
`references/architecture/command-contracts.md`), validate its **shape** before presenting it or
before it is handed to `run-checks.mjs`: JSON well-formedness, `root` existence, each
`changes[]` entry's action/expectedState validity and path-escape safety, `..`/absolute-path/
symlink-based escapes out of `root`, `create`-vs-existing-file conflicts, `modify`-vs-missing-
file (or non-regular-file) mismatches, `expectedState` compared against the actual state
(`absent`/`present` against existence, `matches-hash` against the file's sha256), and each
`checks[]` entry's shape (including rejecting shell metacharacters in `command` and non-string
`args` elements). Non-object `changes[]`/`checks[]` elements and a non-array `checks` are
reported as `FAIL` findings rather than crashing the script.

### When not to run it

- The plan file doesn't exist yet — draft it first (a JSON object with `schemaVersion` — only
  `"1.0.0"` is accepted; any other value is a `FAIL` so `run-checks.mjs` never executes a plan
  written for a schema it does not understand — `root`,
  `changes[]`, `checks[]`; see `samples/plans/rust-crate-thin-makefile.json` for a fully-worked
  example, including why its committed copy is expected to `FAIL` until `root` is replaced with a
  real path — that's intentional, not a bug).
- To decide *whether* a plan is a good idea — that judgment is Claude's; this script only checks
  the plan's internal consistency and whether the paths it names actually exist in the stated
  shape.

### Input

```
--plan <path.json>   plan JSON file (required)
--json                emit JSON to stdout (diagnostics go to stderr instead)
--help                show usage
```

The plan JSON's `checks[].command` must be a bare executable name with no whitespace or shell
metacharacters (`| & ; $ > < ` backtick); this is enforced by `validate-plan.mjs` itself (and
re-enforced independently by `run-checks.mjs`, which never trusts a plan it did not itself
re-validate — see `verify.md`). Each `checks[]` entry also requires a non-empty, unique `name` string
(`checks[i]: name が必要です` — "name is required" — or `name が重複しています` — "duplicate name" —
is a `FAIL` finding otherwise; `run-checks.mjs` identifies results by `name` alone). Likewise, two
`changes[]` entries that resolve to the same file are a `FAIL` (`同じ対象が changes に重複しています`),
since it would be ambiguous which precondition applies. The `name` requirement is easy
to miss since `name` is not listed among the top-level CLI flags above — it is a required field
*inside* the plan JSON's `checks[]` array, confirmed against `scripts/bin/lib/plan.mjs`.

The plan JSON's own `root` field, when given as a relative path, is resolved against **the plan
file's own directory** (`dirname` of `--plan`), never the process's current working directory —
so the same plan file, moved unchanged, resolves the same way regardless of where
`validate-plan.mjs`/`run-checks.mjs` are launched from. An absolute `root` is used as-is either
way. `run-checks.mjs` re-derives this same base directory independently when it re-validates a
plan (see `verify.md`), so the two scripts never disagree on what a relative `root` means.

### Required permissions / dependencies

Node.js only. Read access to `--plan` and to `root`'s existing files/directories for
existence/stat checks. **No file is written, no command is executed** — only `stat`-level
filesystem reads.

### Example invocation

```sh
node <skill-dir>/scripts/bin/validate-plan.mjs --plan /path/to/plan.json --json
```

### Example against the shipped sample plan

```sh
node <skill-dir>/scripts/bin/validate-plan.mjs --plan <skill-dir>/samples/plans/rust-crate-thin-makefile.json
```

Actual run (2026-09-26, from the repository root):

```
validate-plan: FAIL (plan=skills/make/samples/plans/rust-crate-thin-makefile.json)
  - [FAIL] root: root が存在しません: <repo-root>/skills/make/samples/plans/<TARGET_ROOT>
```

Exit code: `1`. This confirms the plan file's own `notice` field and `tests/sample-plans.test.mjs`:
the committed sample still has `root` set to the literal placeholder `<TARGET_ROOT>` (here resolved
relative to the plan file's own directory — `skills/make/samples/plans/` — not the current working
directory: relative `root` values in a plan JSON are always resolved against the directory that
contains the plan file itself, so the same plan file gives the same result regardless of where
`validate-plan.mjs`/`run-checks.mjs` are launched from), so it fails on purpose — this is
intentional, tested behavior, not a bug.

Confirmed 2026-09-26: naively substituting a real, empty temp directory for `root` still fails
— it moves past the `root` finding but then fails on the plan's `changes[]` entries with
`action: "modify"` (`.github/workflows/ci.yml`, `.lefthook.yml`, `README.md`), each reported as
`modify 指定だが元ファイルが存在しません` (modify specified but the original file does not exist),
because a `modify` change expects the target file to already exist at `root`. `PASS` requires
also creating dummy versions of those `modify` targets under the substituted `root` first — which
is exactly what `tests/sample-plans.test.mjs` does (it `writeFileSync`s placeholder content at
each `modify` path before pointing `root` at the temp directory) before asserting `PASS`.

### `--help` output

Transcribed verbatim from `scripts/bin/validate-plan.mjs`'s `HELP` string:

```
validate-plan — 計画 JSON の形式・root・パス逸脱・衝突・検証定義を検証する（実行しない）

使い方:
  node validate-plan.mjs --plan <path.json> [オプション]

オプション:
  --plan <path>   計画 JSON ファイルへのパス（必須）
  --json          結果を JSON で stdout に出力（診断は stderr）
  --help          このヘルプを表示

終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL, 2=引数エラー, 3=BLOCKED

実行しない条件: 常に実行しない（このスクリプトはコマンドを一切起動しない）。
入力: --plan の計画 JSON（schemaVersion, root, changes[], checks[]）。
root が相対パスの場合、起動時の cwd ではなく計画ファイル自身のディレクトリを基準に解決する。
```

### Exit codes

| Code | Meaning |
| --- | --- |
| 0 | `PASS` / `SKIPPED` / `NOT_APPLICABLE` |
| 1 | `FAIL` (malformed plan JSON, or shape/escape/conflict problems found) |
| 2 | Argument error (missing `--plan`, unknown flag) |
| 3 | not used by this script |

### What to do next on failure

- **Exit 1, JSON parse error**: the plan file is not valid JSON — fix it before re-validating;
  do not hand-patch it into "probably fine."
- **Exit 1, `root` finding FAIL**: `root` is missing, non-existent, or (in a sample) still a
  placeholder — substitute the real absolute target path.
- **Exit 1, a `changes[i]` finding with a `root 外への逸脱` (root-escape) detail**: the plan
  tries to write outside `root` via `..`, an absolute path, or a symlink whose real target
  escapes `root`. Do not "fix" this by loosening the check — rewrite the plan's `path` to stay
  inside `root`, or confirm with the user that a different `root` is actually intended.
  Symlink-escape detection specifically is covered by `tests/validate-plan.test.mjs`.
  Note that changes to `..`, absolute paths, and even non-`root`-escaping edits are never
  applied by `validate-plan.mjs` itself — see `apply` in
  `references/operations/safety-and-portability.md` for which step actually edits files.
- **Exit 1, a `changes[i]` `matches-hash` FAIL**: the target file's current sha256 no longer
  matches the plan's recorded `contentHash`. Do not reuse the stale plan/approval — re-plan
  against the file's current content (the hash check exists precisely to catch drift between
  planning time and apply time; see the sha256/change-detection caveat in `verify.md`).

## preview-sample

### When to use it

Once a specific sample under `samples/projects/<name>/` (e.g. `incremental-build`, `rust-crate`,
`rust-workspace-xtask`, `node-pnpm`, `mixed`) has been chosen as a starting point for a target
project, use `preview-sample` to see exactly which files it would introduce and which would
conflict with files already present at `--root`, **before** writing anything.

### When not to run it

- Before a sample has actually been selected as the right fit for the target project — that
  selection is a design judgment (see `references/architecture/selection-and-migration.md`),
  not something this script makes for you.
- With `--apply`/`--force` unless the user has explicitly approved writing to `--root` — the
  default (no `--apply`) never touches the target directory. `--apply` additionally requires
  `--plan <plan.json>`: an approved plan (checked with `validate-plan` first) whose `root` is the
  same directory as `--root` and whose `changes[]` lists **every** file that will be written —
  `action: "create"` for a new file, and `action: "modify"` with `expectedState: "matches-hash"`
  plus the approved `contentHash` for an existing file overwritten with `--force`. The plan is
  re-validated at apply time (so a file that appeared, or changed, after approval fails its
  `create`/`matches-hash` check), and if any file is missing from the plan, has the wrong action,
  or the re-validation fails, **nothing is written** and each reason is reported as a `plan`
  finding. `--apply` is all-or-nothing on the target side too: if any destination cannot be written
  (outside `--root`, a symlink, a same-named directory, or a path whose parent component is an
  existing file or a broken symlink) or any conflict exists without `--force`
  — even for a file the plan leaves out — nothing is written and the reason is reported as an
  `apply` finding. If a write fails midway (e.g. `EACCES`), the remaining files are not written,
  files and directories created by this run are deleted (directories are created one level at a
  time so that none is missed), files overwritten with `--force` are restored to their
  original content and mode, and the `write:<file>` finding says whether the rollback succeeded.
  File permissions follow the sample: a newly created file gets the sample file's mode (after
  `umask`), so executable scripts such as `rust-crate/scripts/*.sh` stay executable, and an
  overwrite with `--force` adds the sample's execute bits to the existing mode. A destination whose
  content already matches but lacks the sample's execute bits is reported as a conflict (fixed with
  `--force`). Execute bits are not compared on Windows.

### Input

```
--sample <name>   name of a directory directly under samples/projects/ (required)
--root <path>     target directory to preview against (required)
--apply           actually write (default: preview only, no writes); requires --plan
--plan <path>     approved plan JSON listing every file --apply will write (required with --apply)
--force           with --apply, overwrite conflicting files too (default: abort the whole apply on any conflict)
--json            emit JSON to stdout (diagnostics go to stderr instead)
--help            show usage
```

### Required permissions / dependencies

Node.js only. Read access to the sample directory (resolved via the skill's own root, not
`--root`) and to `--root`. **Write access to `--root` is required only when `--apply` is
given** — the default invocation never writes.

> **Warning**: `--apply` (and especially `--apply --force`) writes files into `--root`,
> potentially overwriting existing files when combined with `--force`. Never pass `--apply`
> without the user having explicitly approved applying this specific sample to this specific
> target directory. Content-identical existing files are left alone either way (detected via
> sha256 comparison — see the note on hashing below).

### Example invocation (preview only, default)

```sh
node <skill-dir>/scripts/bin/preview-sample.mjs --sample rust-crate --root /path/to/target-repo --json
```

### Example against a disposable fixture

```sh
tmp="$(mktemp -d)"
node <skill-dir>/scripts/bin/preview-sample.mjs --sample rust-crate --root "${tmp}"
```

Actual run (2026-09-26, against an empty `${tmp}`):

```
preview-sample: PASS (sample=rust-crate, root=<tmp>)
  - [PASS] 新規導入予定（既存ファイルなし） (.gitignore)
  - [PASS] 新規導入予定（既存ファイルなし） (Cargo.lock)
  - [PASS] 新規導入予定（既存ファイルなし） (Cargo.toml)
  - [PASS] 新規導入予定（既存ファイルなし） (Makefile)
  - [PASS] 新規導入予定（既存ファイルなし） (scripts/check.sh)
  - [PASS] 新規導入予定（既存ファイルなし） (scripts/doctor.sh)
  - [PASS] 新規導入予定（既存ファイルなし） (scripts/help.sh)
  - [PASS] 新規導入予定（既存ファイルなし） (scripts/lib.sh)
  - [PASS] 新規導入予定（既存ファイルなし） (scripts/verify.sh)
  - [PASS] 新規導入予定（既存ファイルなし） (src/lib.rs)
  - [PASS] 新規導入予定（既存ファイルなし） (tests/integration.rs)
```

Exit code: `0` — matches the expectation exactly (every file under `samples/projects/rust-crate/`
reported PASS/new-file). With `--json` added, the overall `status` is `"PASS"` and `unresolved`
contains exactly one entry: `"--apply を指定していないため、実際の書き込みは行っていません（プレビューのみ）"`
("since `--apply` was not given, nothing was actually written — preview only"), confirming
nothing was written.

### `--help` output

Transcribed verbatim from `scripts/bin/preview-sample.mjs`'s `HELP` string:

```
preview-sample — samples/projects/<name>/ と対象 root の差分をプレビューする

使い方:
  node preview-sample.mjs --sample <name> --root <path> [オプション]

オプション:
  --sample <name>   skills/make/samples/projects/<name> のサンプル名（必須）
  --root <path>     導入予定の対象ディレクトリ（必須）
  --apply           プレビューではなく実際に書き込む（既定はプレビューのみ・書き込まない）
  --plan <path>     --apply 時に必須。書き込む全ファイルを changes に明記した承認済み計画 JSON
  --force           --apply 時、内容の異なる既存ファイルも上書きする（既定は競合があれば適用を中止）
  --json            結果を JSON で stdout に出力（診断は stderr）
  --help            このヘルプを表示

終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL(競合あり), 2=引数エラー, 3=BLOCKED

実行しない条件: --apply を指定しない限り、対象 root への書き込みは一切行わない。
--apply は全件か無しか。計画の再検証が失敗した・root が一致しない・書き込むファイルが計画に
明記されていない・書き込めない対象（root 外・symlink・同名ディレクトリ・親パスがファイル）がある・--force なしで
競合がある場合は 1 件も書き込まない。書き込み途中で失敗した場合は、この実行で書いたファイルを元に戻す。
```

### Exit codes

| Code | Meaning |
| --- | --- |
| 0 | `PASS` (no conflicts; all conflicting files are byte-identical to the sample; or, with `--apply --force`, every conflicting file was overwritten successfully) |
| 1 | `FAIL` (an `--apply` whose plan does not cover every written file, points at a different root, or fails re-validation — nothing is written in that case; the sample directory could not be fully enumerated — an unreadable entry, the entry limit, a directory such as `build/`, `dist/`, or `node_modules/` that the scanner skips, or a symlink / special file that is never followed or copied; nothing is previewed or written in that case; a destination file exists with different content and was not overwritten; a destination resolves outside `--root` through `..` or a symlink, is a same-named directory, or has an existing file or broken symlink as a parent path component; or a write failed and was rolled back). `--apply` never leaves the sample partially applied: with any conflict and no `--force`, or any unwritable destination, nothing is written (`applied: []`, and `skippedConflicts` lists the conflicting files) |
| 2 | Argument error (missing `--sample`/`--root`, `--apply` without `--plan`, a `--sample` value that is not a single directory name such as `../plans`, unknown flag) |
| 3 | not used by this script |

### What to do next on failure/conflict

- **Exit 1, `FAIL` findings**: a destination file already exists with different content than the
  sample's. Do not pass `--force` reflexively — read the existing file, decide with the user
  whether to keep it, merge manually, or overwrite; `--force` overwrites unconditionally for
  every conflicting file in the sample, not just the one you reviewed.
- **`FAIL` finding saying the destination escapes `--root` or is a symlink**: a parent directory
  or the destination itself inside `--root` is a symlink. Nothing is written, even with
  `--apply --force`; resolve the symlink layout with the user first.
- **`skippedConflicts` in the result after `--apply` without `--force`**: the whole apply was
  aborted because of those files, and nothing was written; report them back to the user rather
  than silently re-running with `--force`.
- **`write:<file>` FAIL after `--apply`**: a write failed midway and this run's writes were rolled
  back. If the finding says some files could not be restored, check those paths with the user
  before retrying.
- Content-comparison uses sha256, and re-validates against the file's current content each time
  the script runs. **This hashing is a change-detection aid only — it is not a sandbox and not a
  security boundary.** It tells you whether bytes match; it says nothing about whether a
  matching or non-matching file is *safe*.

## Notes shared by both scripts

- Neither script executes `make`, `cargo`, `npm`/`pnpm`, or any discovered script under `--root`
  — they only read/stat files (and, for `preview-sample --apply`, write files that are part of
  the chosen sample itself). Actual command execution is `run-checks.mjs`'s job, and only under
  the conditions described in `verify.md`.
- `validate-plan.mjs`'s shape/escape/conflict checks, and `preview-sample.mjs`'s sha256
  comparisons, are static-consistency and change-detection aids — not an OS sandbox, and not a
  guarantee that an approved plan or a previewed sample is safe to apply to an untrusted target.

## Related

- [inspect](./inspect.md) — the audit step that usually precedes drafting a plan.
- [verify](./verify.md) — `run-checks.mjs` re-validates any plan passed to it with the same
  `validate-plan.mjs` logic before executing anything, and never trusts a plan's approval as
  applying beyond exactly what `validate-plan.mjs` would currently accept.
- [command-contracts](../references/architecture/command-contracts.md) — the design guidance for
  what belongs in a plan's `commandContract`.

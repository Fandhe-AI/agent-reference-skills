# inspect

`inspect-repo.mjs` — static audit of a target repository's build/config surface. Reading this
page, or any other reference/sample page in this skill, never launches `inspect-repo.mjs` or any
other script on its own; it only runs when explicitly invoked with `node`.

## Where the skill itself lives (`<skill-dir>`)

All commands below are written as `node <skill-dir>/scripts/bin/inspect-repo.mjs ...`.
`<skill-dir>` is **not** a fixed path — it depends on how this skill was installed:

| Install form | Typical `<skill-dir>` |
| --- | --- |
| Upstream source checkout | `skills/make/` |
| Vendored copy | `.agents/skills/make/` |
| Project-local symlink/copy | `.claude/skills/make/` |
| Global install | wherever the global skills directory resolves to on this machine |

`inspect-repo.mjs` and the other `scripts/bin/*.mjs` scripts resolve their own skill root from
`import.meta.url` at runtime (`lib/paths.mjs`'s `getSkillRoot`), not from `cwd` or a hardcoded
relative path, so they work correctly regardless of which of the above forms is in effect —
substitute the actual path for `<skill-dir>` when running a command. `${CLAUDE_SKILL_DIR}` is a
Claude Code SKILL.md substitution token, not a shell environment variable that exists outside
that context; do not assume it is set when running these commands from an external shell.

## Dependency note

`inspect-repo.mjs` requires only Node.js (standard library, no npm dependencies). This is
separate from what the *target* project needs: a Rust crate under audit needs no Node.js to be
built or tested — Node is only required to run this skill's own auxiliary script against it.

## When to use it

Use `inspect-repo` when a user has explicitly asked for a static diagnosis of an existing
repository's build/config surface — the `audit` step of this skill's consult/audit/plan/apply/
verify pattern (see `references/architecture/command-contracts.md`). It reports entry-point
candidates (`Makefile`, `package.json`, `Cargo.toml`, `justfile`, etc.), directory-tree
observations, and unresolved/unconfirmed items. It never writes, executes, or modifies anything.

## When not to run it

- Pure Q&A about Make/Cargo/Node syntax or design tradeoffs (`consult`) — read
  `references/`/`samples/` instead; no script call is needed.
- Against a path the user has not identified as the audit target — `--root` is required and the
  script does nothing without it.
- As a substitute for reading file *contents* — this script only records file **existence** for
  entry-point candidates and secret-like filenames; it never reads or reports file contents
  (`.env` values, credentials, etc. are never read).

## Input

```
--root <path>          target directory to audit (required)
--max-depth <n>        maximum scan depth (default: 6)
--max-entries <n>      maximum scanned entries before truncating (default: 5000)
--json                 emit JSON to stdout (diagnostics go to stderr instead)
--help                 show usage
```

`node_modules`, `target`, `.git`, `dist`, `build`, `.turbo`, `.cache`, `coverage`, `.next`,
`.venv`, and `vendor` directories are skipped by name during the scan (not descended into).
Symlinks are recorded as findings but never followed.

## Required permissions / dependencies

- Node.js on `PATH` (no npm install step; standard library only).
- Read access to `--root`. No write access, no network access, and no other process is invoked.

## Example invocation

```sh
node <skill-dir>/scripts/bin/inspect-repo.mjs --root /path/to/target-repo --json
```

## Example invocation (against a disposable fixture, human-readable output)

```sh
tmp="$(mktemp -d)"
printf 'help:\n\t@echo hi\n' > "${tmp}/Makefile"
node <skill-dir>/scripts/bin/inspect-repo.mjs --root "${tmp}"
```

Actual run (2026-09-26, macOS/APFS, Node v24.13.0), human-readable mode:

```
inspect-repo: PASS (root=<tmp>)
findings: 1 件, entriesScanned: 1
  - [PASS] 入口候補を検出: Makefile（capability 候補: make） (Makefile)
未確認:
  - 設定ファイルの中身は読んでいません（存在確認のみ）。capability の実際の有効性は audit/plan で個別確認してください。
```

Exit code: `0`.

> **Platform note (case-insensitive filesystems)**: `ENTRY_CANDIDATES` lists `Makefile`,
> `makefile`, and `GNUmakefile` as separate candidates. Only one `Makefile` was created above, and
> the result correctly reports **one** finding (`entry:Makefile`), even on a case-insensitive
> filesystem (the macOS/APFS default). `inspect-repo.mjs` reads each directory once with
> `readdirSync` and matches candidate names against the actual on-disk entry names by exact string
> comparison, rather than probing each candidate with `existsSync` (which the OS resolves
> case-insensitively on such filesystems and would otherwise report the same physical file under
> both `entry:Makefile` and `entry:makefile`). This behavior is covered by
> `tests/inspect-repo.test.mjs`. A repository that genuinely has two distinct physical files (e.g.
> both `GNUmakefile` and `Makefile` present) still reports both as separate findings, since those
> are two real files, not a case-folding artifact.

The `--json` shape (`schemaVersion`, `command: "inspect-repo"`, `mode: "audit"`, `status`,
`profile: "static"`, `scope`, `findings[]`, `unresolved[]`, `entriesScanned`, `truncated`) was
confirmed 2026-09-26 with `--json` added to the command above; field names match exactly.

## `--help` output

Transcribed from the `HELP` string in `scripts/bin/inspect-repo.mjs` and verified against a live
`node inspect-repo.mjs --help` run (2026-09-26); the two matched exactly. Re-compare against the
actual file if this page and the source ever drift:

```
inspect-repo — 対象 root の静的構成調査（何も実行・変更しない）

使い方:
  node inspect-repo.mjs --root <path> [オプション]

オプション:
  --root <path>        対象ディレクトリ（必須）
  --max-depth <n>       走査する最大深さ（既定: 6）
  --max-entries <n>      走査するエントリ数上限（既定: 5000）
  --json                結果を JSON で stdout に出力（診断は stderr）
  --help                このヘルプを表示

終了コード: 0=PASS/SKIPPED/NOT_APPLICABLE, 1=FAIL, 2=引数エラー, 3=BLOCKED

実行しない条件: 資料を読んだだけでは自動起動しない。--root を明示しない限り何も調べない。
入力: --root のみ。設定ファイルの中身は読まない（.env 等は存在のみ記録）。
```

`--help` and unknown-flag handling are covered by `tests/help-contract.test.mjs`, which asserts
this text matches the shipped script and that an unrecognized flag exits 2.

## Exit codes

| Code | Meaning |
| --- | --- |
| 0 | `PASS` (scan completed), or `SKIPPED` (scan stopped at `--max-entries`, so part of the tree is unchecked) |
| 1 | `FAIL`, or `--root` does not exist / is not a directory |
| 2 | Argument error (missing `--root`, non-numeric `--max-depth`/`--max-entries`, unknown flag) |
| 3 | `BLOCKED` (a directory or entry under `--root` could not be read, e.g. permission denied; reported as `scan-error` findings) |

## What happens on failure, and what to do next

- **Exit 2 (argument error)**: fix the invocation; the script printed usage to stderr and did
  nothing else.
- **Exit 1, root error**: the given `--root` does not exist or is not a directory — confirm the
  path with the user before retrying; do not create the directory yourself.
- **Exit 3, `scan-error` findings**: part of the tree could not be read (the finding's `detail`
  carries the error code, e.g. `EACCES`). The scan is not complete; report the unreadable paths
  instead of treating the result as a full inspection, and do not change permissions yourself.
- **`truncated: true` in the result / a `max-entries` note in `unresolved`** (overall status
  `SKIPPED`): the scan hit `--max-entries` before finishing. Re-run with a larger `--max-entries` only if the user wants a
  deeper scan of a large repository; do not silently assume the truncated scan was complete.
- **`secret-like-file` findings**: these record only a filename match (`.env`, `*.pem`,
  `id_rsa`, `*credentials*`, etc.) and the file's path — never its contents. Do not open or
  quote these files' contents in a report; treat their presence as "needs the repository owner's
  attention," not as something this script or Claude should read further.
- A result is never upgraded from `PASS` to imply the target is ready to build/test — `verify`
  (see `verify.md`) is a separate, explicit step.

## Related

- [plan-and-preview](./plan-and-preview.md) — the next step after an `inspect-repo` audit is
  usually a `plan` (`validate-plan.mjs`) built from what `inspect-repo` observed, not an
  immediate `apply`.
- [verify](./verify.md) — real command execution is a distinct, later, explicitly-authorized step.
- [safety-and-portability](../references/operations/safety-and-portability.md) — the audit-mode
  read/execute/write boundary table this script implements.

// step6-root-body.test.mjs — Issue #544 の回帰テスト。
//
// SKILL.md Step 6 の新規作成用ブロックは、`#<phase1_number>` や `N` を含む固定本文を
// そのまま `gh issue edit --body` へ渡していた。例をそのまま実行するとルート issue の
// 本文が雛形で上書きされ、実際の Phase 構成が失われる（後続の update-issue-tree /
// implement-issue-tree が読むトラッキング本文を破壊する）。
// 修正は (1) 実ツリー（sub_issues API）から表を生成、(2) プレースホルダー残りの
// 検査ガード（fail-closed）の 2 点。
//
// Issue #555 は新規作成経路（旧フェンス）を scripts/create-root-body.sh + tree-lib.sh へ
// 切り出した。(a)〜(j)・(f) は期待値を変えずスクリプト直接実行へ移行し、引数検証・
// 環境変数フォールバック・ライブラリ契約・SKILL.md の静的検査・探索フェンス単体実行を追加した。
//
// Issue #551 は Step 3 の雛形（プレースホルダー行だけの表）を持つルートへ --root で
// 再実行しても Step 6 が完走することの回帰（テスト (n)〜(r)）。
//
// Issue #556 は --root 経路（既存本文への Phase 行・セクションのマージ）も
// scripts/merge-root-body.sh へ切り出した。(k)〜(r) は期待値を変えずスクリプト直接実行へ移行し、
// 引数検証・環境変数フォールバック・取得失敗・edit 失敗の伝播・前提不備を追加した。
//
// いずれの経路も PATH 先頭に gh スタブを差し込んで実プロセスとして実行し、
// gh 呼び出しと本文を観測する（node:test 標準ライブラリのみ）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync, readdirSync, existsSync, chmodSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SKILL_MD = join(dirname(fileURLToPath(import.meta.url)), '..', 'SKILL.md')

// 新規作成経路は scripts/create-root-body.sh へ切り出した（Issue #555）。SKILL.md からの
// ブロック抽出ではなく、スクリプトを直接実行して検証する。
const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'create-root-body.sh')
const MERGE_SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'merge-root-body.sh')
const LIB = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'tree-lib.sh')

// gh スタブ。api .../issues/<n>/sub_issues?...page=<p> には fixture/sub_<n>_<p>.json を返し、
// 無ければ exit 1（API 失敗）。issue edit は引数と --body-file の中身を記録する。
const GH_STUB = `#!/usr/bin/env bash
if [ "$1" = "api" ]; then
  path="$2"
  n=$(printf '%s' "$path" | sed -E 's#.*issues/([0-9]+)/sub_issues.*#\\1#')
  p=$(printf '%s' "$path" | sed -E 's#.*page=([0-9]+).*#\\1#')
  f="$FIXTURE_DIR/sub_\${n}_\${p}.json"
  if [ -f "$f" ]; then cat "$f"; exit 0; fi
  echo "stub: no fixture for $path" >&2
  exit 1
fi
if [ "$1" = "issue" ] && [ "$2" = "edit" ]; then
  echo "EDIT $*" >> "$GH_CALL_LOG"
  while [ $# -gt 0 ]; do
    if [ "$1" = "--body-file" ]; then cat "$2" > "$GH_BODY_OUT"; fi
    shift
  done
  exit 0
fi
echo "stub: unexpected $*" >&2
exit 1
`

function setup(fixtures) {
  const dir = mkdtempSync(join(tmpdir(), 'step6-'))
  const bin = join(dir, 'bin')
  const fx = join(dir, 'fx')
  const tmp = join(dir, 'tmp')
  for (const d of [bin, fx, tmp]) mkdirSync(d)
  writeFileSync(join(bin, 'gh'), GH_STUB)
  chmodSync(join(bin, 'gh'), 0o755)
  for (const [name, data] of Object.entries(fixtures)) {
    writeFileSync(join(fx, name), JSON.stringify(data))
  }
  return { dir, bin, fx, tmp }
}

function run(ctx, { args = ['--root', '100', '--granularity', '2h'], env = {} } = {}) {
  const callLog = join(ctx.dir, 'calls.log')
  const bodyOut = join(ctx.dir, 'body.md')
  const r = spawnSync('bash', [SCRIPT, ...args], {
    cwd: ctx.dir,
    encoding: 'utf8',
    env: {
      PATH: `${ctx.bin}:${process.env.PATH}`,
      HOME: process.env.HOME,
      TMPDIR: ctx.tmp,
      FIXTURE_DIR: ctx.fx,
      GH_CALL_LOG: callLog,
      GH_BODY_OUT: bodyOut,
      ...env,
    },
  })
  const calls = existsSync(callLog) ? readFileSync(callLog, 'utf8').split('\n').filter(Boolean) : []
  const body = existsSync(bodyOut) ? readFileSync(bodyOut, 'utf8') : null
  return { r, calls, body, leftovers: readdirSync(ctx.tmp) }
}

const issue = (number, title, state = 'open', labels = []) => ({
  number,
  title,
  state,
  labels: labels.map((name) => ({ name })),
})

const BASE = () => ({
  'sub_100_1.json': [issue(101, 'feat: 基盤整備', 'open', ['phase:1']), issue(102, 'feat: 機能追加', 'open', ['phase:2'])],
  'sub_101_1.json': [issue(111, 'feat: DB 設計'), issue(112, 'feat: API 雛形')],
  'sub_102_1.json': [issue(121, 'feat: 画面')],
  'sub_111_1.json': [issue(1111, 'feat: テーブル定義')],
  'sub_1111_1.json': [],
  'sub_112_1.json': [],
  'sub_121_1.json': [],
})

test('(a) 実ツリーから表を生成し、プレースホルダーなしで 1 回だけ edit する', () => {
  const ctx = setup(BASE())
  try {
    const { r, calls, body } = run(ctx)
    assert.equal(r.status, 0, r.stderr)
    assert.equal(calls.length, 1)
    assert.match(calls[0], /issue edit 100 --body-file/)
    assert.ok(body.startsWith('<!-- granularity: 2h -->\n'))
    assert.match(body, /\| Phase 1 \| #101 feat: 基盤整備 \| 2 \| 3 \|/)
    assert.match(body, /\| Phase 2 \| #102 feat: 機能追加 \| 1 \| 1 \|/)
    assert.match(body, /\| #111 \| feat: DB 設計 \| sub-issue あり \|/)
    assert.match(body, /\| #112 \| feat: API 雛形 \| - \|/)
    assert.ok(!/<phase|#N\b|\(作成後に更新\)/.test(body), 'プレースホルダー残り')
  } finally {
    rmSync(ctx.dir, { recursive: true, force: true })
  }
})

test('(b) タイトルの | と改行で表の列数が崩れない', () => {
  const fx = BASE()
  fx['sub_101_1.json'] = [issue(111, 'feat: a | b\nc'), issue(112, 'x')]
  const ctx = setup(fx)
  try {
    const { r, body } = run(ctx)
    assert.equal(r.status, 0, r.stderr)
    const row = body.split('\n').find((l) => l.startsWith('| #111 '))
    assert.ok(row, '#111 行がある')
    assert.equal(row, '| #111 | feat: a \\| b c | sub-issue あり |')
  } finally {
    rmSync(ctx.dir, { recursive: true, force: true })
  }
})

test('(c) Phase 親が 0 件なら edit せず非ゼロ終了する', () => {
  const ctx = setup({ 'sub_100_1.json': [] })
  try {
    const { r, calls } = run(ctx)
    assert.notEqual(r.status, 0)
    assert.equal(calls.length, 0)
  } finally {
    rmSync(ctx.dir, { recursive: true, force: true })
  }
})

test('(d) sub_issues 取得失敗なら edit せず非ゼロ終了する', () => {
  const fx = BASE()
  delete fx['sub_102_1.json']
  const ctx = setup(fx)
  try {
    const { r, calls } = run(ctx)
    assert.notEqual(r.status, 0)
    assert.equal(calls.length, 0)
  } finally {
    rmSync(ctx.dir, { recursive: true, force: true })
  }
})

test('(e) 100 件ちょうどの 1 ページ目に続く 2 ページ目も取得する', () => {
  const fx = BASE()
  const page1 = Array.from({ length: 100 }, (_, i) => issue(2000 + i, `feat: c${i}`))
  fx['sub_102_1.json'] = page1
  fx['sub_102_2.json'] = [issue(3000, 'feat: 最終')]
  for (const i of page1) fx[`sub_${i.number}_1.json`] = []
  fx['sub_3000_1.json'] = []
  const ctx = setup(fx)
  try {
    const { r, calls, body } = run(ctx)
    assert.equal(r.status, 0, r.stderr)
    assert.equal(calls.length, 1)
    assert.match(body, /\| Phase 2 \| #102 feat: 機能追加 \| 101 \| 101 \|/)
    assert.match(body, /\| #3000 \| feat: 最終 \| - \|/)
  } finally {
    rmSync(ctx.dir, { recursive: true, force: true })
  }
})

test('(g) タイトルが #N 等のプレースホルダーに見える場合も edit せず中止する', () => {
  const fx = BASE()
  fx['sub_101_1.json'] = [issue(111, '#N'), issue(112, 'x')]
  const ctx = setup(fx)
  try {
    const { r, calls } = run(ctx)
    assert.notEqual(r.status, 0)
    assert.equal(calls.length, 0)
  } finally {
    rmSync(ctx.dir, { recursive: true, force: true })
  }
})

test('(h) 本文を含む大きな sub_issues 応答（引数長上限超え）でも edit まで到達する', () => {
  const fx = BASE()
  const bigBody = 'x'.repeat(4000)
  const page1 = Array.from({ length: 100 }, (_, i) => ({ ...issue(2000 + i, `feat: c${i}`), body: bigBody }))
  fx['sub_102_1.json'] = page1
  fx['sub_102_2.json'] = [{ ...issue(3000, 'feat: 最終'), body: bigBody }]
  for (const i of page1) fx[`sub_${i.number}_1.json`] = []
  fx['sub_3000_1.json'] = []
  const ctx = setup(fx)
  try {
    const { r, calls, body } = run(ctx)
    assert.equal(r.status, 0, r.stderr)
    assert.equal(calls.length, 1)
    assert.match(body, /\| #3000 \| feat: 最終 \| - \|/)
  } finally {
    rmSync(ctx.dir, { recursive: true, force: true })
  }
})

test('(i) 部分起票（Phase 2・3 のみ）でも実 Phase 番号で表と見出しを生成する', () => {
  const fx = BASE()
  fx['sub_100_1.json'] = [issue(101, 'feat: 基盤整備', 'open', ['phase:2']), issue(102, 'feat(phase-3): 機能追加')]
  const ctx = setup(fx)
  try {
    const { r, body } = run(ctx)
    assert.equal(r.status, 0, r.stderr)
    assert.match(body, /\| Phase 2 \| #101 /)
    assert.match(body, /\| Phase 3 \| #102 /)
    assert.match(body, /### Phase 2: feat: 基盤整備/)
    assert.ok(!/Phase 1/.test(body), 'Phase 1 を誤記録しない')
  } finally {
    rmSync(ctx.dir, { recursive: true, force: true })
  }
})

test('(j) Phase 番号を決定できない親があれば edit せず中止する', () => {
  const fx = BASE()
  fx['sub_100_1.json'] = [issue(101, 'feat: 基盤整備'), issue(102, 'feat: 機能追加', 'open', ['phase:2'])]
  const ctx = setup(fx)
  try {
    const { r, calls } = run(ctx)
    assert.notEqual(r.status, 0)
    assert.equal(calls.length, 0)
  } finally {
    rmSync(ctx.dir, { recursive: true, force: true })
  }
})

test('(f) 一時ファイルは成功時も失敗時も残らない', () => {
  const ok = setup(BASE())
  const fx = BASE()
  delete fx['sub_102_1.json']
  const ng = setup(fx)
  try {
    assert.deepEqual(run(ok).leftovers, [])
    assert.deepEqual(run(ng).leftovers, [])
  } finally {
    rmSync(ok.dir, { recursive: true, force: true })
    rmSync(ng.dir, { recursive: true, force: true })
  }
})

// ---- --root 用フェンス（既存本文へ Phase 行・セクションをマージするブロック）----
// Issue #544 PR #548 のレビュー指摘（P1: セクションを環境変数で awk へ渡して長さ上限超過、
// P2: 読み飛ばしが任意の見出しで終了し小見出し以降の旧内容が残る）の回帰テスト。

// issue view <n> --json body は fixture/root_body.md（FAIL_VIEW_BODY=1 なら失敗）、--json title は jq 経由で
// title を返す。issue edit は --body-file - の stdin を GH_BODY_OUT へ記録し、EDIT_EXIT で終了コードを変えられる。
// 全 gh 呼び出しは GH_ALL_LOG へ記録する（引数検証で gh が 1 回も呼ばれないことの確認用）。
const ROOT_GH_STUB = `#!/usr/bin/env bash
echo "CALL $*" >> "$GH_ALL_LOG"
if [ "$1" = "api" ]; then
  path="$2"
  n=$(printf '%s' "$path" | sed -E 's#.*issues/([0-9]+)/sub_issues.*#\\1#')
  p=$(printf '%s' "$path" | sed -E 's#.*page=([0-9]+).*#\\1#')
  f="$FIXTURE_DIR/sub_\${n}_\${p}.json"
  if [ -f "$f" ]; then cat "$f"; exit 0; fi
  exit 1
fi
if [ "$1" = "issue" ] && [ "$2" = "view" ]; then
  if [ "$5" = "body" ]; then
    [ -z "\${FAIL_VIEW_BODY:-}" ] || exit 1
    jq -n --rawfile b "$FIXTURE_DIR/root_body.md" '{body:$b}' | jq -r '.body'; exit 0
  fi
  jq -n --arg t "$PHASE_TITLE" '{title:$t}' | jq -r ".title | $(printf '%s' "$7" | sed 's/^\\.title | //')"
  exit 0
fi
if [ "$1" = "issue" ] && [ "$2" = "edit" ]; then
  echo "EDIT $*" >> "$GH_CALL_LOG"
  cat > "$GH_BODY_OUT"
  exit "\${EDIT_EXIT:-0}"
fi
exit 1
`

const ROOT_ARGS = ['--root', '100', '--granularity', '2h', '--phase', '1', '--phase-number', '101']

function runRootFull(rootBody, children, { args = ROOT_ARGS, env = {} } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'step6root-'))
  const bin = join(dir, 'bin')
  const fx = join(dir, 'fx')
  const tmp = join(dir, 'tmp')
  for (const d of [bin, fx, tmp]) mkdirSync(d)
  writeFileSync(join(bin, 'gh'), ROOT_GH_STUB)
  chmodSync(join(bin, 'gh'), 0o755)
  writeFileSync(join(fx, 'root_body.md'), rootBody)
  writeFileSync(join(fx, 'sub_101_1.json'), JSON.stringify(children))
  for (const c of children) writeFileSync(join(fx, `sub_${c.number}_1.json`), '[]')
  const callLog = join(dir, 'calls.log')
  const allLog = join(dir, 'all.log')
  const bodyOut = join(dir, 'body.md')
  try {
    const r = spawnSync('bash', [MERGE_SCRIPT, ...args], {
      cwd: dir,
      encoding: 'utf8',
      env: {
        PATH: `${bin}:${process.env.PATH}`,
        HOME: process.env.HOME,
        TMPDIR: tmp,
        FIXTURE_DIR: fx,
        GH_CALL_LOG: callLog,
        GH_ALL_LOG: allLog,
        GH_BODY_OUT: bodyOut,
        PHASE_TITLE: 'feat: 基盤整備',
        ...env,
      },
    })
    const lines = (f) => (existsSync(f) ? readFileSync(f, 'utf8').split('\n').filter(Boolean) : [])
    const body = existsSync(bodyOut) ? readFileSync(bodyOut, 'utf8') : null
    return { r, body, edits: lines(callLog), allCalls: lines(allLog), leftovers: readdirSync(tmp) }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

function runRoot(rootBody, children) {
  const { r, body, leftovers } = runRootFull(rootBody, children)
  return { r, body, leftovers }
}

const ROOT_BODY = `<!-- granularity: 2h -->
## Phase 別表

| Phase | 親 | 直下 | 総数 |
|-------|----|------|------|
| Phase 1 | #101 古い | 9 | 9 |
| Phase 2 | #102 後続 | 1 | 1 |

### Phase 1: 古い

| Issue | タイトル | 分解 |
|-------|---------|------|
| #901 | 古い子 | - |

#### 補足

OLD-DETAIL-MARKER

##### さらに深い

OLD-DEEP-MARKER

### Phase 2: 後続

PHASE2-KEEP-MARKER

## 運用

OPS-KEEP-MARKER
`

test('(k) 既存 Phase セクション内の #### 以深の小見出しと旧内容も置換で残らない', () => {
  const { r, body } = runRoot(ROOT_BODY, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(!body.includes('OLD-DETAIL-MARKER'), '#### 以降の旧内容が残っている')
  assert.ok(!body.includes('OLD-DEEP-MARKER'), '##### 以降の旧内容が残っている')
  assert.ok(!body.includes('#### 補足'))
  assert.match(body, /\| #111 \| feat: 新しい子 \| - \|/)
  assert.ok(!body.includes('古い子'))
  assert.match(body, /### Phase 2: 後続\n\nPHASE2-KEEP-MARKER/)
  assert.match(body, /## 運用\n\nOPS-KEEP-MARKER/)
  assert.match(body, /\| Phase 1 \| #101 feat: 基盤整備 \| 1 \| 1 \|/)
})

test('(l) Phase セクションが巨大でも環境変数に載せず置換でき、一時ファイルが残らない', () => {
  const children = Array.from({ length: 90 }, (_, i) => issue(5000 + i, `feat: ${'長'.repeat(1500)} ${i}`))
  const { r, body, leftovers } = runRoot(ROOT_BODY, children)
  assert.equal(r.status, 0, r.stderr)
  // 1 ページ（100 件）以内で、セクション全体が Linux の単一環境変数上限（128KiB）を超える規模
  assert.ok(Buffer.byteLength(body) > 128 * 1024)
  assert.match(body, /\| #5089 \| feat: /)
  assert.ok(!body.includes('OLD-DETAIL-MARKER'))
  assert.match(body, /## 運用\n\nOPS-KEEP-MARKER/)
  assert.deepEqual(leftovers, [])
})

test('(m) merge-root-body.sh は PHASE_SECTION を SEC 環境変数として awk へ渡さない', () => {
  // コメント行（不変条件の説明文に SEC= の語が出る）は除いてコードだけを検査する
  const src = readFileSync(MERGE_SCRIPT, 'utf8').split('\n').filter((l) => !/^\s*#/.test(l)).join('\n')
  assert.ok(!/\bSEC=/.test(src), 'SEC= による環境変数渡しが残っている')
  assert.ok(!/ENVIRON\["SEC"\]/.test(src))
})

// ---- Issue #551: Step 3 の雛形だけのルートへ --root で再実行するケース ----
// 雛形は手で写さず SKILL.md の Step 3 フェンスから抽出する。Step 3 の文言と Step 6 の
// 追記位置判定が食い違うと、この入力のテストが落ちて気づける。
function extractStep3Template() {
  const text = readFileSync(SKILL_MD, 'utf8')
  const start = text.indexOf('### Step 3')
  const end = text.indexOf('### Step 4')
  assert.ok(start >= 0 && end > start, 'Step 3 / Step 4 見出しが見つからない')
  const m = /cat <<'EOF'\n([\s\S]*?)\nEOF\n/.exec(text.slice(start, end))
  assert.ok(m, 'Step 3 の heredoc が見つからない')
  assert.match(m[1], /^\| \(作成後に更新\) \|/m, 'Step 3 雛形にプレースホルダー行がある')
  return `<!-- granularity: 2h -->\n${m[1]}\n`
}

test('(n) Step 3 の雛形本文へ --root マージするとプレースホルダー行が Phase 行に置き換わる', () => {
  const { r, body } = runRoot(extractStep3Template(), [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stdout + r.stderr)
  assert.ok(!body.includes('(作成後に更新)'))
  assert.match(body, /\|\n\| Phase 1 \| #101 feat: 基盤整備 \| 1 \| 1 \|\n\n### Phase 1: feat: 基盤整備\n/)
  assert.match(body, /\| #111 \| feat: 新しい子 \| - \|\n\n## 運用\n/)
  assert.match(body, /^<!-- granularity: 2h -->\n## 概要\n/)
  assert.equal(body.split('\n').filter((l) => /^\| Phase \d+ \|/.test(l)).length, 1)
})

test('(o) Phase 行もプレースホルダー行も無い本文は edit せず中止する', () => {
  const { r, body } = runRoot('## 概要\n\n自由記述のみ\n\n## 運用\n\nx\n', [issue(111, 'c')])
  assert.notEqual(r.status, 0)
  assert.equal(body, null)
})

test('(p) 実在の Phase 行とプレースホルダー行が併存する本文ではプレースホルダー行だけ落とす', () => {
  const tpl = extractStep3Template()
  const b = tpl.replace('| (作成後に更新) | | | |', '| Phase 2 | #102 後続 | 1 | 1 |\n| (作成後に更新) | | | |')
  assert.notEqual(b, tpl, 'Step 3 の文言が変わり置換が空振りしている')
  const { r, body } = runRoot(b, [issue(111, 'c')])
  assert.equal(r.status, 0, r.stdout + r.stderr)
  assert.ok(!body.includes('(作成後に更新)'))
  assert.match(body, /\| Phase 2 \| #102 後続 \| 1 \| 1 \|\n\| Phase 1 \| #101 feat: 基盤整備 \| 1 \| 1 \|\n\n/)
})

test('(q) 表の行以外にある (作成後に更新) は追記位置にせず、残っていれば中止する', () => {
  const b = '## 概要\n\n(作成後に更新) という語を含む自由記述\n\n| x | (作成後に更新) |\n\n## 運用\n'
  const { r, body } = runRoot(b, [issue(111, 'c')])
  assert.notEqual(r.status, 0)
  assert.equal(body, null)
})

test('(r) 雛形へのマージ結果へ同じ Phase を再マージしても行・セクションが重複しない', () => {
  const first = runRoot(extractStep3Template(), [issue(111, 'c')])
  assert.equal(first.r.status, 0, first.r.stderr)
  const second = runRoot(first.body, [issue(111, 'c'), issue(112, 'd')])
  assert.equal(second.r.status, 0, second.r.stderr)
  assert.equal(second.body.split('\n').filter((l) => /^\| Phase 1 \|/.test(l)).length, 1)
  assert.equal(second.body.split('\n').filter((l) => /^### Phase 1:/.test(l)).length, 1)
  assert.match(second.body, /\| Phase 1 \| #101 feat: 基盤整備 \| 2 \| 2 \|/)
})

// ---- Issue #555: スクリプト切り出しの追加検証 ----

test('(s) 不正な引数・欠落は gh を 1 回も呼ばず exit 1 で止まる', () => {
  const cases = [
    { args: ['--root', 'abc', '--granularity', '2h'] },
    { args: ['--root', '0', '--granularity', '2h'] },
    { args: ['--root', '100', '--granularity', '2'] },
    { args: ['--root', '100', '--granularity', '2 h'] },
    { args: ['--root', '100', '--bogus', 'x'] },
    { args: ['--root'] },
    { args: [] },
  ]
  for (const c of cases) {
    const ctx = setup(BASE())
    try {
      const { r, calls } = run(ctx, c)
      assert.equal(r.status, 1, `${JSON.stringify(c.args)}: ${r.stderr}`)
      assert.equal(calls.length, 0)
      assert.equal(r.stdout.includes('result='), false)
    } finally {
      rmSync(ctx.dir, { recursive: true, force: true })
    }
  }
})

test('(t) 引数が無ければ環境変数 ROOT_NUMBER / GRANULARITY を使う', () => {
  const ctx = setup(BASE())
  try {
    const { r, calls, body } = run(ctx, { args: [], env: { ROOT_NUMBER: '100', GRANULARITY: '4h' } })
    assert.equal(r.status, 0, r.stderr)
    assert.equal(calls.length, 1)
    assert.ok(body.startsWith('<!-- granularity: 4h -->\n'))
    assert.match(r.stdout.trim().split('\n').pop(), /^result=updated root=100 phases=2$/)
  } finally {
    rmSync(ctx.dir, { recursive: true, force: true })
  }
})

test('(u) tree-lib.sh は source してもシェルオプションを変えず、ヘルパーを定義する', () => {
  const script = [
    'before=$(set +o)',
    `source "${LIB}"`,
    'after=$(set +o)',
    '[ "$before" = "$after" ] || exit 3',
    `source "${LIB}" || exit 4`,
    'declare -F list_subs count_open_desc >/dev/null || exit 5',
    '[ -n "$CELL" ] && [ -n "$TREE_PLACEHOLDER_RE" ] || exit 6',
  ].join('\n')
  const r = spawnSync('bash', ['-c', script], { encoding: 'utf8' })
  assert.equal(r.status, 0, `exit=${r.status} ${r.stderr}`)
})

test('(v) gh が見つからなければ前提不備として exit 2 で止まる', () => {
  const ctx = setup(BASE())
  try {
    // gh を含まない PATH（jq・bash・coreutils の symlink だけ）で実行する
    const bare = join(ctx.dir, 'nogh')
    mkdirSync(bare)
    for (const cmd of ['jq', 'bash', 'dirname', 'mktemp', 'rm']) {
      const w = spawnSync('bash', ['-c', `command -v ${cmd}`], { encoding: 'utf8' }).stdout.trim()
      if (w) symlinkSync(w, join(bare, cmd))
    }
    const r = spawnSync(join(bare, 'bash'), [SCRIPT, '--root', '100', '--granularity', '2h'], {
      cwd: ctx.dir,
      encoding: 'utf8',
      env: { PATH: bare, HOME: process.env.HOME, TMPDIR: ctx.tmp },
    })
    assert.equal(r.status, 2, r.stderr)
    assert.deepEqual(readdirSync(ctx.tmp), [])
  } finally {
    rmSync(ctx.dir, { recursive: true, force: true })
  }
})

// ---- SKILL.md の静的検査（update-issue-tree の Step 8 テストと同型）----

function step6Section() {
  const text = readFileSync(SKILL_MD, 'utf8')
  const start = text.indexOf('### Step 6')
  const end = text.indexOf('### Step 7')
  assert.ok(start >= 0 && end > start, 'Step 6 / Step 7 見出しが見つからない')
  return text.slice(start, end)
}

function step6Fences() {
  const blocks = []
  const re = /```bash\n([\s\S]*?)```/g
  const section = step6Section()
  let m
  while ((m = re.exec(section)) !== null) blocks.push(m[1])
  return blocks
}

// 呼び出しフェンス（指定スクリプトを参照するもの）
function invokeFence(script) {
  const fences = step6Fences().filter((b) => b.includes(script))
  assert.equal(fences.length, 1, `${script} の呼び出しフェンスは 1 つであること（実際: ${fences.length}）`)
  return fences[0]
}

const SCRIPTS = ['create-root-body.sh', 'merge-root-body.sh']

test('(w) Step 6 の bash フェンスは 2 つの呼び出し用だけで、本文生成ロジックが残っていない', () => {
  const fences = step6Fences()
  assert.equal(fences.length, 2, `実際: ${fences.length}`)
  for (const script of SCRIPTS) {
    const inv = invokeFence(script)
    assert.ok(!/list_subs\(\)|count_open_desc\(\)|CELL=|\bawk\b|CURRENT_BODY/.test(inv), `${script}: ロジックが無い`)
    assert.ok(!inv.includes('gh issue edit'), `${script}: gh issue edit を直接呼ばない`)
  }
  const defs = step6Section().match(/list_subs\(\) \{/g) ?? []
  assert.equal(defs.length, 0, `Step 6 に list_subs 定義が残っている（実際: ${defs.length}）`)
})

// ---- 探索フェンスの単体実行（スタブスクリプトで引数と終了コードの伝播を確認）----

function runInvoke(script, layout, { env = {}, stubExit = '0' } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'step6inv-'))
  try {
    if (layout) {
      const sd = join(dir, layout, 'create-issue-tree', 'scripts')
      mkdirSync(sd, { recursive: true })
      writeFileSync(join(sd, script), '#!/usr/bin/env bash\necho "ARGS $*"\nexit "${STUB_EXIT:-0}"\n')
    }
    return spawnSync('bash', ['-c', invokeFence(script)], {
      cwd: dir,
      encoding: 'utf8',
      env: { PATH: process.env.PATH, HOME: process.env.HOME, STUB_EXIT: stubExit, ...env },
    })
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

const INV_ENV = { ROOT_NUMBER: '100', GRANULARITY: '2h', PHASE: '3', PHASE_NUMBER: '103' }
const INV_ARGS = {
  'create-root-body.sh': /ARGS --root 100 --granularity 2h$/m,
  'merge-root-body.sh': /ARGS --root 100 --granularity 2h --phase 3 --phase-number 103$/m,
}

test('(x) 探索フェンスは 3 レイアウトを解決し、引数を渡す', () => {
  for (const script of SCRIPTS) {
    for (const layout of ['skills', '.agents/skills', '.claude/skills']) {
      const r = runInvoke(script, layout, { env: INV_ENV })
      assert.equal(r.status, 0, `${script} ${layout}: ${r.stderr}`)
      assert.match(r.stdout, INV_ARGS[script])
    }
  }
})

test('(y) 探索フェンスはスクリプトの非ゼロ終了を伝播し、未設定・不在では起動前に止まる', () => {
  for (const script of SCRIPTS) {
    const ng = runInvoke(script, 'skills', { env: INV_ENV, stubExit: '7' })
    assert.equal(ng.status, 7, `${script}: ${ng.stderr}`)
    for (const missing of Object.keys(INV_ENV)) {
      const { [missing]: _drop, ...env } = INV_ENV
      const unset = runInvoke(script, 'skills', { env })
      // 呼び出しフェンスが要求しない変数（create 側の PHASE 等）は未設定でも起動してよい
      const required = script === 'merge-root-body.sh' || ['ROOT_NUMBER', 'GRANULARITY'].includes(missing)
      if (required) {
        assert.notEqual(unset.status, 0, `${script}: ${missing} 未設定で止まる`)
        assert.ok(!unset.stdout.includes('ARGS'), `${script}: ${missing} 未設定ならスクリプトを起動しない`)
      }
    }
    const none = runInvoke(script, null, { env: INV_ENV })
    assert.equal(none.status, 1)
  }
})

// ---- Issue #556: merge-root-body.sh の追加検証 ----

const KIDS = () => [issue(111, 'feat: 新しい子')]

test('(z1) 不正な引数・欠落は gh を 1 回も呼ばず exit 1 で止まる', () => {
  const cases = [
    ['--root', 'abc', '--granularity', '2h', '--phase', '1', '--phase-number', '101'],
    ['--root', '100', '--granularity', '2', '--phase', '1', '--phase-number', '101'],
    ['--root', '100', '--granularity', '2h', '--phase', 'abc', '--phase-number', '101'],
    ['--root', '100', '--granularity', '2h', '--phase', '1;x', '--phase-number', '101'],
    ['--root', '100', '--granularity', '2h', '--phase', '1', '--phase-number', '0'],
    ['--root', '100', '--granularity', '2h', '--phase', '1'],
    ['--root', '100', '--bogus', 'x'],
    ['--phase-number'],
    [],
  ]
  for (const args of cases) {
    const { r, allCalls } = runRootFull(ROOT_BODY, KIDS(), { args })
    assert.equal(r.status, 1, `${JSON.stringify(args)}: ${r.stderr}`)
    assert.equal(allCalls.length, 0, `${JSON.stringify(args)}: gh が呼ばれた`)
    assert.ok(!r.stdout.includes('result='))
  }
})

test('(z2) 引数が無ければ環境変数を使い、成功時の最終行は result=merged になる', () => {
  const { r, edits, body } = runRootFull(ROOT_BODY, KIDS(), {
    args: [],
    env: { ROOT_NUMBER: '100', GRANULARITY: '4h', PHASE: '1', PHASE_NUMBER: '101' },
  })
  assert.equal(r.status, 0, r.stderr)
  assert.equal(edits.length, 1)
  assert.ok(body.startsWith('<!-- granularity: 4h -->\n'))
  assert.match(r.stdout.trim().split('\n').pop(), /^result=merged root=100 phase=1$/)
})

test('(z3) 既存本文の取得に失敗したら edit せず exit 1 で止まる', () => {
  const { r, edits } = runRootFull(ROOT_BODY, KIDS(), { env: { FAIL_VIEW_BODY: '1' } })
  assert.equal(r.status, 1, r.stderr)
  assert.equal(edits.length, 0)
})

test('(z4) gh issue edit の失敗は同じ終了コードで伝播し、成功メッセージを出さない', () => {
  const { r, edits } = runRootFull(ROOT_BODY, KIDS(), { env: { EDIT_EXIT: '9' } })
  assert.equal(r.status, 9, r.stderr)
  assert.equal(edits.length, 1)
  assert.ok(!r.stdout.includes('result='))
})

test('(z5) gh が見つからなければ前提不備として exit 2 で止まり、一時ファイルが残らない', () => {
  const dir = mkdtempSync(join(tmpdir(), 'step6nogh-'))
  try {
    const bare = join(dir, 'bin')
    const tmp = join(dir, 'tmp')
    mkdirSync(bare)
    mkdirSync(tmp)
    for (const cmd of ['jq', 'bash', 'dirname', 'mktemp', 'rm']) {
      const w = spawnSync('bash', ['-c', `command -v ${cmd}`], { encoding: 'utf8' }).stdout.trim()
      if (w) symlinkSync(w, join(bare, cmd))
    }
    const r = spawnSync(join(bare, 'bash'), [MERGE_SCRIPT, ...ROOT_ARGS], {
      cwd: dir,
      encoding: 'utf8',
      env: { PATH: bare, HOME: process.env.HOME, TMPDIR: tmp },
    })
    assert.equal(r.status, 2, r.stderr)
    assert.deepEqual(readdirSync(tmp), [])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('(z6) 本文がマーカー 1 行だけ・空本文でも grep -v の exit 1 を失敗扱いにせず、追記位置が無ければ安全に中止する', () => {
  for (const b of ['<!-- granularity: 2h -->\n', '']) {
    const { r, edits } = runRootFull(b, KIDS())
    // 追記位置（Phase 行・プレースホルダー行）が無いので exit 1 だが、理由は追記位置であってマーカー除去ではない
    assert.equal(r.status, 1, r.stderr)
    assert.match(r.stderr, /追記位置/)
    assert.ok(!/マーカー除去/.test(r.stderr))
    assert.equal(edits.length, 0)
  }
})

test('(z7) 先行 Phase のマーカー重複行は 1 行へ正規化される', () => {
  const { r, body } = runRootFull('<!-- granularity: 8h -->\n' + ROOT_BODY, KIDS())
  assert.equal(r.status, 0, r.stderr)
  assert.equal(body.split('\n').filter((l) => l.startsWith('<!-- granularity:')).length, 1)
  assert.ok(body.startsWith('<!-- granularity: 2h -->\n'))
})

test('(s) sub_issues 応答の形が想定外で jq 変換が失敗したら edit せず非ゼロ終了する', () => {
  // 配列要素が文字列だと `.state` の参照で jq が失敗する。空値から Phase 行を作って本文を上書きしてはならない
  const { r, body, edits } = runRootFull(ROOT_BODY, ['unexpected'])
  assert.notEqual(r.status, 0)
  assert.equal(edits.length, 0, 'gh issue edit が呼ばれた')
  assert.equal(body, null)
  assert.match(r.stderr, /絞り込みに失敗/)
})

// ---- コードフェンス内の行を見出し・表行・運用見出しと誤認しない（Issue #557） ----
const FENCE = '```'
const fenceCount = (b) => b.split('\n').filter((l) => /^ {0,3}(`{3,}|~{3,})/.test(l)).length

const FENCED_ROOT = `<!-- granularity: 2h -->
## Phase 別表

| Phase | 親 | 直下 | 総数 |
|-------|----|------|------|
| Phase 1 | #101 古い | 9 | 9 |

### Phase 1: 古い

旧メモ A

${FENCE}bash
# コメント行
### Phase 2: ニセ
## 運用
| Phase 9 | ニセ | 0 | 0 |
echo old
${FENCE}

旧メモ B

### Phase 2: 後続

PHASE2-KEEP-MARKER

## 運用

OPS-KEEP-MARKER
`

test('(A1) セクション内のフェンス中の # 行で読み飛ばしが止まらず、旧内容が全て置換される', () => {
  const { r, body } = runRootFull(FENCED_ROOT, KIDS())
  assert.equal(r.status, 0, r.stderr)
  for (const m of ['旧メモ A', '旧メモ B', '# コメント行', 'echo old', 'ニセ']) {
    assert.ok(!body.includes(m), `${m} が残っている`)
  }
  assert.match(body, /### Phase 2: 後続\n\nPHASE2-KEEP-MARKER/)
  assert.match(body, /## 運用\n\nOPS-KEEP-MARKER/)
  assert.equal(fenceCount(body), 0, 'フェンス行が孤立して残っている')
  assert.equal(body.split('\n').filter((l) => l.startsWith('### Phase 1:')).length, 1)
})

test('(A2) フェンス内の見出し形の行は終端扱いされず、セクション全体が置換される（チルダ・長いフェンス）', () => {
  const F4 = FENCE + '`'
  const body0 = FENCED_ROOT.replace(`${FENCE}bash`, `${F4}bash`).replace(`echo old\n${FENCE}`, `${FENCE}\necho old\n${F4}`)
  const { r, body } = runRootFull(body0, KIDS())
  assert.equal(r.status, 0, r.stderr)
  assert.ok(!body.includes('echo old'))
  assert.ok(!body.includes('旧メモ B'))
  assert.equal(fenceCount(body), 0)
  const tilde = FENCED_ROOT.replace(`${FENCE}bash`, '~~~bash').replace(`echo old\n${FENCE}`, 'echo old\n~~~')
  const t = runRootFull(tilde, KIDS())
  assert.equal(t.r.status, 0, t.r.stderr)
  assert.ok(!t.body.includes('echo old'))
  assert.ok(!t.body.includes('旧メモ B'))
  assert.equal(fenceCount(t.body), 0)
})

test('(A3) フェンス内の ## 運用 形の行を新セクションの挿入位置にしない', () => {
  const root = `<!-- granularity: 2h -->
## Phase 別表

| Phase | 親 | 直下 | 総数 |
|-------|----|------|------|
| Phase 2 | #102 後続 | 1 | 1 |

### Phase 2: 後続

${FENCE}md
## 運用
${FENCE}

## 運用

OPS-KEEP-MARKER
`
  const { r, body } = runRootFull(root, KIDS())
  assert.equal(r.status, 0, r.stderr)
  const lines = body.split('\n')
  const newSec = lines.findIndex((l) => l.startsWith('### Phase 1:'))
  const realOps = lines.findIndex((l, i) => l === '## 運用' && lines[i - 1] === '' && lines[i - 2] !== '```md')
  const fakeOps = lines.findIndex((l) => l === '## 運用')
  assert.ok(newSec > fakeOps, '新セクションがフェンス内の疑似見出しの前へ入った')
  assert.ok(newSec < realOps)
  assert.match(body, /OPS-KEEP-MARKER/)
})

test('(A4) フェンス内の | Phase N | 形の行を表の追記位置にしない', () => {
  const root = `<!-- granularity: 2h -->
## Phase 別表

| Phase | 親 | 直下 | 総数 |
|-------|----|------|------|
| Phase 2 | #102 後続 | 1 | 1 |

例:

${FENCE}
| Phase 9 | ニセ | 0 | 0 |
${FENCE}

## 運用
`
  const { r, body } = runRootFull(root, KIDS())
  assert.equal(r.status, 0, r.stderr)
  assert.match(body, /\| Phase 2 \| #102 後続 \| 1 \| 1 \|\n\| Phase 1 \| #101 feat: 基盤整備 \| 1 \| 1 \|/)
  assert.match(body, /\| Phase 9 \| ニセ \| 0 \| 0 \|\n```/)
})

test('(A5) 4 個のフェンスは 3 個の行や別記号の行では閉じない', () => {
  const root = `<!-- granularity: 2h -->
## Phase 別表

| Phase | 親 | 直下 | 総数 |
|-------|----|------|------|
| Phase 1 | #101 古い | 9 | 9 |

### Phase 1: 古い

\`\`\`\`md
${FENCE}
~~~
# 内側のコメント
\`\`\`\`

### Phase 2: 後続

KEEP

## 運用
`
  const { r, body } = runRootFull(root, KIDS())
  assert.equal(r.status, 0, r.stderr)
  assert.ok(!body.includes('内側のコメント'))
  assert.match(body, /### Phase 2: 後続\n\nKEEP/)
})

test('(A6) CRLF の閉じフェンスも閉じとして扱う', () => {
  const root = FENCED_ROOT.replace(/\n/g, '\r\n')
  const { r, body } = runRootFull(root, KIDS())
  assert.equal(r.status, 0, r.stderr)
  assert.ok(!body.includes('echo old'))
  assert.ok(!body.includes('旧メモ B'))
  assert.match(body, /PHASE2-KEEP-MARKER/)
})

test('(A7) 閉じ忘れフェンスを含む本文は edit せず中止し、一時ファイルが残らない', () => {
  const root = FENCED_ROOT.replace(`echo old\n${FENCE}`, 'echo old')
  const { r, body, edits, leftovers } = runRootFull(root, KIDS())
  assert.notEqual(r.status, 0)
  assert.equal(edits.length, 0)
  assert.equal(body, null)
  assert.match(r.stderr, /閉じていない/)
  assert.deepEqual(leftovers, [])
})

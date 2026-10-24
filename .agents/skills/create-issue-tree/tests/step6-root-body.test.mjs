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
    assert.equal(row, '| #111 | feat: a &#124; b c | sub-issue あり |')
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
  const pnIdx = args.indexOf('--phase-number')
  const pn = pnIdx >= 0 ? args[pnIdx + 1] : '101'
  writeFileSync(join(fx, `sub_${pn}_1.json`), JSON.stringify(children))
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

// Issue #656: update-issue-tree が管理するルート本文（管理マーカー区間 + 退避 <details>）に
// --root マージしても、区間外・退避節・end マーカー・</details> を壊さない。
const BEGIN_M = '<!-- update-issue-tree:phase-plan:begin -->'
const END_M = '<!-- update-issue-tree:phase-plan:end -->'

const MANAGED_ROOT = () => `<!-- granularity: 2h -->
## Phase 別表

${BEGIN_M}
| Phase | 親 | 直下 | 合計 |
|-------|----|------|------|
| Phase 1 | #10 A | 1 | 1 |

### Phase 1: A

| Issue | タイトル | 分解 |
|-------|---------|------|
| #11 | old | - |

### Phase 2: B

| Issue | タイトル | 分解 |
|-------|---------|------|
| #21 | b | - |
${END_M}

<details><summary>移行前の Phase 別表（update-issue-tree が退避）</summary>

### Phase 1: A

| Issue | タイトル | 分解 |
|-------|---------|------|
| #12 | legacy | - |

</details>

## 運用

OPS-KEEP-MARKER
`

const phase1Headings = (body) => body.split('\n').filter((l) => l.startsWith('### Phase 1:')).length

test('(B1) 管理マーカー区間の節だけを置換し、end マーカー・退避節・</details> を残す', () => {
  const { r, body } = runRoot(MANAGED_ROOT(), [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(!body.includes('| #11 | old |'), '区間内の旧節が残っている')
  assert.match(body, /\| #111 \| feat: 新しい子 \| - \|/)
  assert.match(body, /### Phase 2: B\n[\s\S]*\| #21 \| b \| - \|/)
  assert.ok(body.includes(END_M), 'end マーカーが消えた')
  assert.ok(body.includes('</details>'), '</details> が消えた')
  assert.ok(body.includes('| #12 | legacy | - |'), '退避節の表が消えた')
  assert.match(body, /<details><summary>移行前の Phase 別表/)
  assert.equal(phase1Headings(body), 2)
  assert.match(body, /## 運用\n\nOPS-KEEP-MARKER/)
  assert.ok(body.indexOf(BEGIN_M) < body.indexOf('#111') && body.indexOf('#111') < body.indexOf(END_M))
})

test('(B2) 新節 → end → details → 旧節の並び（Phase 9 型）でも end・details・旧節が残る', () => {
  const root = MANAGED_ROOT().replace(/### Phase 2: B[\s\S]*?(?=<!-- update-issue-tree:phase-plan:end)/, '')
  const { r, body } = runRoot(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(body.indexOf(BEGIN_M) < body.indexOf('#111') && body.indexOf('#111') < body.indexOf(END_M))
  assert.ok(body.indexOf(END_M) < body.indexOf('<details>') && body.indexOf('<details>') < body.indexOf('legacy'))
  assert.ok(body.includes('| #12 | legacy | - |'))
  assert.ok(body.includes('</details>'))
})

test('(B3) 区間内に該当節が無ければ end マーカーの直前へ新節を入れ、退避節は触らない', () => {
  const root = MANAGED_ROOT().replace('### Phase 1: A\n\n| Issue | タイトル | 分解 |\n|-------|---------|------|\n| #11 | old | - |\n\n', '')
  const { r, body } = runRoot(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(body.indexOf('#111') < body.indexOf(END_M))
  assert.ok(body.includes('| #12 | legacy | - |'))
  assert.equal(phase1Headings(body), 2)
})

test('(B4) マーカーが無くても <details> 内の同名見出しは置換せず素通しする', () => {
  const root = MANAGED_ROOT().replace(`${BEGIN_M}\n`, '').replace(`${END_M}\n`, '')
  const { r, body } = runRoot(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(!body.includes('| #11 | old |'))
  assert.ok(body.includes('| #12 | legacy | - |'))
  assert.ok(body.includes('</details>'))
  assert.match(body, /<details><summary>/)
})

test('(B5) 除外後も置換対象の同名見出しが複数あれば edit せず exit 1 で中止する', () => {
  const dup = MANAGED_ROOT().replace('### Phase 2: B', '### Phase 1: 重複\n\n### Phase 2: B')
  const { r, body, edits } = runRootFull(dup, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 1)
  assert.equal(edits.length, 0)
  assert.equal(body, null)
  assert.match(r.stderr, /複数/)
})

test('(B6) 管理マーカーが 1 組でない本文は edit せず exit 1 で中止する', () => {
  const noEnd = MANAGED_ROOT().replace(`${END_M}\n`, '')
  const { r, edits } = runRootFull(noEnd, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 1)
  assert.equal(edits.length, 0)
  assert.match(r.stderr, /管理マーカー/)
})

test('(B7) 退避された Step 3 表のプレースホルダー行（details 内・マーカー区間外）が残っていても更新できる', () => {
  const root = MANAGED_ROOT()
    .replace('| #12 | legacy | - |', '| #12 | legacy | - |\n| (作成後に更新) | | |')
    .replace('OPS-KEEP-MARKER', 'OPS-KEEP-MARKER\n\n| (作成後に更新) |')
  const { r, body } = runRoot(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.equal(body.split('(作成後に更新)').length - 1, 2, '退避部分のプレースホルダーが保持されていない')
  assert.ok(body.includes('</details>'))
  assert.match(body, /\| #111 \| feat: 新しい子 \| - \|/)
})

test('(B8) 区間内に生成物以外のプレースホルダーが残れば従来どおり中止する', () => {
  const root = MANAGED_ROOT().replace('| #21 | b | - |', '| #21 | b | - |\n\n残り: <phase1_number>')
  const { r, edits } = runRootFull(root, [issue(111, 'feat: 新しい子')])
  assert.notEqual(r.status, 0)
  assert.equal(edits.length, 0)
})

test('(B9) 置換対象の節と旧表の間に通常の行・details があっても旧表は次の見出しまで除去され、details は保持される', () => {
  const root = MANAGED_ROOT().replace(
    '### Phase 1: A\n\n| Issue',
    '### Phase 1: A\n\nNOTE-LINE\n\n<details><summary>メモ</summary>\n\nKEEP-DETAILS\n\n</details>\n\n| Issue',
  )
  const { r, body } = runRoot(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(!body.includes('| #11 | old |'), '旧表が新節の後に残っている')
  assert.ok(!body.includes('NOTE-LINE'))
  assert.ok(body.includes('KEEP-DETAILS'), '保護対象の details が消えた')
  assert.ok(body.includes(END_M))
  assert.ok(body.includes('| #12 | legacy | - |'))
  assert.match(body, /### Phase 2: B/)
})

test('(B10) マーカー無しでも節と旧表の間の通常の行で除去が止まらない', () => {
  const root = ROOT_BODY.replace('### Phase 1: 古い\n', '### Phase 1: 古い\n\nNOTE-LINE\n')
  const { r, body } = runRoot(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(!body.includes('古い子'))
  assert.ok(!body.includes('OLD-DETAIL-MARKER'))
  assert.match(body, /### Phase 2: 後続\n\nPHASE2-KEEP-MARKER/)
})

// <details> の閉じ忘れ・タグ名の前方一致: depth が閉じないまま本文末に達すると以降の行が全て除外され、
// 後ろの '### Phase N:' 見出しが置換対象から外れて節が重複したままマージが成功していた。
test('(C1) 閉じ忘れの <details> の後ろに置換対象の節がある本文は edit せず exit 1 で中止する', () => {
  const root = ROOT_BODY.replace('### Phase 1: 古い', '<details><summary>閉じ忘れ</summary>\n\n### Phase 1: 古い')
  const { r, body, edits, leftovers } = runRootFull(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 1, r.stderr)
  assert.equal(edits.length, 0)
  assert.equal(body, null)
  assert.match(r.stderr, /<details> が閉じていない/)
  assert.deepEqual(leftovers, [])
})

test('(C2) `>` を伴わず行末で終わる <details は複数行にまたがるタグとして判定できず、edit せず中止する', () => {
  abortsAmbiguous(ROOT_BODY.replace('### Phase 1: 古い', '<details\n\n### Phase 1: 古い'), 'C2')
})

test('(C2b) CRLF 本文で行末が CR の <details 単独行も判定できず中止する', () => {
  abortsAmbiguous(ROOT_BODY.replace('### Phase 1: 古い', '<details\n\n### Phase 1: 古い').replace(/\n/g, '\r\n'), 'C2b')
})

test('(C2c) 属性付き <details open> を含む本文は中止する', () => {
  abortsAmbiguous(ROOT_BODY.replace('### Phase 1: 古い', '<details open>\n\n### Phase 1: 退避済み\n\nKEEP\n\n</details>\n\n### Phase 1: 古い'), 'C2c')
})

test('(C2d) 属性値に </details> を含む開きタグ（codex P1）は同じ行で depth が戻らず、退避内容を消さずに中止する', () => {
  abortsAmbiguous(ROOT_BODY.replace('### Phase 1: 古い', '<details title="</details>">\n\n### Phase 1: 退避済み\n\nKEEP-ATTR\n\n</details>\n\n### Phase 1: 古い'), 'C2d')
})

test('(C3) <detailsfoo> のような許可リスト外のタグは別名でも中止する（旧: 通常行として素通し）', () => {
  abortsAmbiguous(ROOT_BODY.replace('### Phase 1: 古い', '<detailsfoo>\n\n### Phase 1: 古い'), 'C3')
})

test('(C4) 属性の無い複数行 <details> と 1 行で開閉する <details>…</details> は除外され、閉じていれば中止しない', () => {
  const root = ROOT_BODY.replace(
    '### Phase 1: 古い',
    '<details>\n\n### Phase 1: 退避済み\n\nKEEP-OPEN-ATTR\n\n</details>\n\n<details><summary>x</summary>y</details>\n\n### Phase 1: 古い',
  )
  const { r, body } = runRoot(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(body.includes('KEEP-OPEN-ATTR'), 'details 内が消えた')
  assert.ok(body.includes('<details><summary>x</summary>y</details>'))
  assert.ok(!body.includes('古い子'))
  assert.equal(phase1Headings(body), 2)
})

const abortsAmbiguous = (root, label) => {
  const { r, edits, leftovers } = runRootFull(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 1, `${label}: ${r.stderr}`)
  assert.equal(edits.length, 0, `${label}: gh issue edit が呼ばれた`)
  assert.match(r.stderr, /判定できません/, label)
  assert.match(r.stderr, /バッククォート・<!--・-->・バックスラッシュ/, label)
  assert.match(r.stderr, /許可していない HTML タグ/, label)
  assert.deepEqual(leftovers, [], label)
}

test('(C4b) HTML コメントを含む行が判定範囲にあれば、コメント内の </details> を数えず推測もせず中止する', () => {
  abortsAmbiguous(ROOT_BODY.replace('### Phase 1: 古い', '<details>\n\n<!-- </details> -->\n\n### Phase 1: 退避済み\n\nKEEP-COMMENT\n\n</details>\n\n### Phase 1: 古い'), 'C4b')
})

test('(C4c) 複数行 HTML コメントを含む本文も、本文を書き換えず中止する', () => {
  abortsAmbiguous(ROOT_BODY.replace('### Phase 1: 古い', '<details>\n\n<!--\n</details>\n<details>\n-->\n\n### Phase 1: 退避済み\n\nKEEP-MULTI\n\n</details>\n\n### Phase 1: 古い'), 'C4c')
})

test('(C5) 閉じタグが `>` を欠く </details は閉じと判定できず、edit せず中止する', () => {
  abortsAmbiguous(ROOT_BODY.replace('### Phase 1: 古い', '<details><summary>x</summary>\n\n</details\n\n### Phase 1: 古い'), 'C5')
})

test('(C6) update-issue-tree が退避する <details><summary>…</summary>…</details> は引き続き除外され、閉じていれば中止しない', () => {
  const { r, body } = runRoot(MANAGED_ROOT(), [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(body.includes('| #12 | legacy | - |'))
  assert.ok(body.includes('</details>'))
})

// 許可リスト（Issue #678・codex P1）: < は <details> </details> <summary> </summary> の素の形の一部のときだけ許す。
const ESCAPED_ATTR = '<details>\n<span title="</details>">説明</span>\n\n### Phase 1: 退避済み\n\nKEEP\n\n</details>'

test('(H1) 属性値に </details> を持つ別タグ（codex P1）は depth が 0 に戻って見えても、edit せず中止する', () => {
  abortsAmbiguous(withOld(ESCAPED_ATTR), 'H1')
})

test('(H2) <span>・<br>・<a href> を含む判定範囲は中止する', () => {
  for (const tag of ['<span>x</span>', 'a<br>b', '<a href="x">link</a>']) abortsAmbiguous(withOld(tag), `H2 ${tag}`)
})

test('(H3) update-issue-tree 形式の退避節（summary 付き details・旧表・</details>）は中止せず更新でき、退避節が保持される', () => {
  const esc = '<details><summary>移行前の Phase 別表（update-issue-tree が退避）</summary>\n\n| Issue | タイトル | 分解 |\n|---|---|---|\n| #9 | KEEP-OLD | - |\n\n</details>'
  const { r, body, edits } = runRootFull(withOld(esc), [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.equal(edits.length, 1)
  assert.ok(body.includes(esc), '退避節が保持されていない')
  assert.ok(!body.includes('古い子'))
})

test('(H4) 管理マーカーの外にある HTML タグは中止の対象にならない', () => {
  const root = MANAGED_ROOT().replace('OPS-KEEP-MARKER', '<span title="</details>">KEEP</span><br>')
  const { r, body, edits } = runRootFull(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.equal(edits.length, 1)
  assert.ok(body.includes('<span title="</details>">KEEP</span><br>'))
})

test('(H5) 管理マーカーの内側の HTML タグは中止する', () => {
  abortsAmbiguous(MANAGED_ROOT().replace('| #11 | old | - |', '| #11 | <b>old</b> | - |'), 'H5')
})

test('(H6) > 単独の行（a > b）は中止しない', () => {
  const { r, body, edits } = runRootFull(withOld('a > b\n\n> 引用'), [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.equal(edits.length, 1)
  assert.ok(body.includes('a > b'))
})

// 行内・行末の </details>: 閉じている本文でも行頭以外の閉じタグを数えず exit 8 になっていた（Issue #678）。
// 数えるのは行内・行末の閉じタグまで。除外（素通し）にする行の条件は Issue #689 の (I*) 系で固定している。
const withOld = (head) => ROOT_BODY.replace('### Phase 1: 古い', `${head}\n\n### Phase 1: 古い`)

test('(D1) 単独行 </details> で閉じる退避節でも中止せず、退避節の外だけが置換される', () => {
  const root = withOld('<details><summary>退避</summary>\n\n| Issue | タイトル |\n|---|---|\n| #9 | old |\n\n</details>')
  const { r, body, edits } = runRootFull(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.equal(edits.length, 1)
  assert.ok(body.includes('| #9 | old |'))
  assert.ok(!body.includes('古い子'), '旧節が残っている')
  assert.equal(phase1Headings(body), 1)
})

test('(D1b) 退避節内に同名見出しがあっても素通しされ、外側の旧節だけが置換される', () => {
  const root = withOld('<details><summary>退避</summary>\n\n### Phase 1: 退避済み\n\n| #9 | old |\n\n</details>')
  const { r, body } = runRoot(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(body.includes('### Phase 1: 退避済み'))
  assert.ok(!body.includes('古い子'))
  assert.equal(phase1Headings(body), 2)
})

test('(D1c) 見出し行の </details> も他の行と同じく閉じと数える（表・見出し行を特別扱いしない）', () => {
  const root = withOld('<details><summary>退避</summary>\n\n| #9 | old |\n\n### Phase 2: fix </details>')
  const { r, body } = runRoot(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(body.includes('### Phase 2: fix </details>'))
  assert.ok(body.includes('| #9 | old |'))
  assert.ok(!body.includes('古い子'))
  assert.equal(phase1Headings(body), 1)
})

test('(D1d) 退避節が表行末の </details> で閉じていても、閉じと数えて更新できる', () => {
  const root = withOld('<details><summary>退避</summary>\n\n| #9 | old |</details>')
  const { r, body } = runRoot(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(body.includes('| #9 | old |</details>'))
  assert.ok(!body.includes('古い子'))
})

test('(D2) 1 行で開閉したあとに文字が続く行でも中止せず、素通しされる', () => {
  const line = '<details><summary>x</summary>y</details> 補足'
  const { r, body } = runRoot(withOld(line), [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(body.includes(line))
  assert.ok(!body.includes('古い子'))
  assert.equal(phase1Headings(body), 1)
})

test('(D3) 本当に閉じていない本文は従来どおり edit せず中止し、一時ファイルを残さない', () => {
  for (const head of ['<details><summary>退避</summary>\n\n| #9 | old |', '<details><summary>x</summary>y 補足']) {
    const { r, edits, leftovers } = runRootFull(withOld(head), [issue(111, 'feat: 新しい子')])
    assert.equal(r.status, 1, r.stderr)
    assert.equal(edits.length, 0)
    assert.match(r.stderr, /<details> が閉じていない/)
    assert.deepEqual(leftovers, [])
  }
})

test('(D4) 地の文の中ほどにある </details> で退避節が閉じ、後ろの節は置換対象に戻る', () => {
  const root = withOld('<details><summary>退避</summary>\n\nfoo </details> bar')
  const { r, body } = runRoot(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(body.includes('foo </details> bar'))
  assert.ok(!body.includes('古い子'))
  assert.equal(phase1Headings(body), 1)
})

test('(D5) 1 行内の入れ子は閉じが 2 つなら通り、1 つなら中止する', () => {
  const ok = runRoot(withOld('<details><details>a</details></details>'), [issue(111, 'feat: 新しい子')])
  assert.equal(ok.r.status, 0, ok.r.stderr)
  const ng = runRootFull(withOld('<details><details>a</details>'), [issue(111, 'feat: 新しい子')])
  assert.equal(ng.r.status, 1, ng.r.stderr)
  assert.equal(ng.edits.length, 0)
})

test('(D6) バッククォートを含む行が判定範囲にあれば、<details> の言及でも中止する', () => {
  abortsAmbiguous(withOld('`<details>` を使う説明'), 'D6 open')
  abortsAmbiguous(withOld('<details><summary>x</summary>\n\n`</details>` の説明'), 'D6 close')
})

test('(D6b) 複数バッククォートのコードスパンを含む本文も中止する', () => {
  abortsAmbiguous(withOld('<details><summary>退避</summary>\n\n`` </details> ``\n\n### Phase 1: 退避済み\n\n</details>'), 'D6b')
})

test('(D7) タイトルに <details> を含む子 issue は文字参照で書かれ、再マージしても未閉じ扱いで中止しない', () => {
  const kids = [issue(111, 'fix: <details> の閉じ忘れ')]
  const first = runRoot(ROOT_BODY, kids)
  assert.equal(first.r.status, 0, first.r.stderr)
  assert.ok(first.body.includes('fix: &lt;details&gt; の閉じ忘れ'))
  const second = runRootFull(first.body, kids)
  assert.equal(second.r.status, 0, second.r.stderr)
  assert.equal(second.edits.length, 1)
  assert.equal(phase1Headings(second.body), 1)
})

test('(D8) 表行の行中の </details> も閉じと数える', () => {
  const root = withOld('<details><summary>退避</summary>\n\n| #5 | fix: </details> を数えず | - |')
  const { r, body } = runRoot(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(body.includes('| #5 | fix: </details> を数えず | - |'))
  assert.ok(!body.includes('古い子'))
})

test('(D9) 表行のタイトルに <!-- を含む本文は、状態を追わず中止する', () => {
  abortsAmbiguous(withOld('<details><summary>退避</summary>\n\n### Phase 1: 退避済み\n\n| #9 | fix: <!-- の説明 |\n\n</details>'), 'D9')
})

// バックスラッシュでエスケープした details タグは文字として表示されるだけで、深さを変えない（PR #679 レビュー）。
test('(D11) 説明文中のバックスラッシュ（\<details>）を含む行は、エスケープを解釈せず中止する', () => {
  abortsAmbiguous(withOld('タグは \\<details> と書く'), 'D11')
})

test('(D12) 退避節内のバックスラッシュを含む行（\</details>）も中止する', () => {
  abortsAmbiguous(withOld('<details><summary>退避</summary>\n\n説明: \\</details> は文字\n\n### Phase 1: 退避済み\n\n</details>'), 'D12')
})

test('(D13) 二重バックスラッシュ直後の <details> も中止する', () => {
  abortsAmbiguous(withOld('\\\\<details>'), 'D13')
})

test('(D10) 見出し行に <!-- を含む本文は中止する', () => {
  abortsAmbiguous(withOld('### メモ <!-- 注\n\n<details><summary>退避</summary>\n\n### Phase 1: 退避済み\n\n</details>'), 'D10')
})

// 方針（Issue #678）: コードスパン・HTML コメント・エスケープの状態は追わない。判定範囲に曖昧な記号があれば中止する。
test('(E1) 状態追跡のコード（strip_code・pend・incomment・エスケープ除去）を持たず、未閉じ <details> は edit せず中止する', () => {
  const src = readFileSync(new URL('../scripts/merge-root-body.sh', import.meta.url), 'utf8')
  for (const dead of ['strip_code', 'pend_hit', 'incomment', 'gsub(/[\\\\]<']) assert.ok(!src.includes(dead), `${dead} が残っている`)
  const ng = runRootFull(withOld('<details><summary>x</summary>'), [issue(111, 'feat: 新しい子')])
  assert.equal(ng.r.status, 1, ng.r.stderr)
  assert.equal(ng.edits.length, 0)
  assert.match(ng.r.stderr, /<details> が閉じていない/)
})

test('(E2) 複数行のコードスパンを含む本文は、スパン内の </details> を数えず推測もせず中止する', () => {
  abortsAmbiguous(withOld('<details><summary>退避</summary>\n\n### Phase 1: 退避済み\n\n説明 `例:\nfoo </details>\n終わり`\n\n</details>'), 'E2')
})

test('(E3) 閉じないバッククォートを含む本文は中止する', () => {
  for (const head of ['<details><summary>退避</summary>\n\n説明 `例:\nfoo </details>\n\n続き', '説明 `例:\n<details>x']) abortsAmbiguous(withOld(head), 'E3')
})

const KEEP = '### Phase 1: 退避済み'
const ESC = `<details><summary>退避</summary>\n\n${KEEP}\n\nKEEP-BODY\n\n</details>`

// レビュー指摘 1（Bugbot High）: 閉じないバッククォートで行の残りを読み飛ばすと、その中の --> も読み飛ばして後続の <details> を見落とした。
test('(E4) 閉じないバッククォートと --> を持つ本文は中止し、退避済みの節を消さない', () => {
  abortsAmbiguous(withOld(`説明 \`未閉じ -->\n${ESC}`), 'E4 backtick+-->')
  abortsAmbiguous(withOld(`<!-- 注 \`\n-->\n${ESC}`), 'E4 comment')
})

// レビュー指摘 2（codex P1）: 見出し・表行の中で閉じるコメントを検出できなかった。
test('(E5) 見出し行・表行の中で閉じる --> を含む本文は中止する', () => {
  abortsAmbiguous(withOld(`<!-- 開始\n# 注記 -->\n${ESC}`), 'E5 heading')
  abortsAmbiguous(withOld(`<!-- 開始\n| 注記 -->\n${ESC}`), 'E5 table')
})

// レビュー指摘 3（codex P1）: エスケープされたバッククォート・<!-- をコードスパン・コメントの開始として扱った。
test('(E6) エスケープされたバッククォート・<!-- を含む本文は中止する', () => {
  abortsAmbiguous(withOld(`文字の \\\` です\n${ESC}`), 'E6 backtick')
  abortsAmbiguous(withOld(`文字の \\<!-- です\n${ESC}`), 'E6 comment')
})

test('(F1) 判定範囲に記号が無ければ、行内に複数の <details> / </details> があっても数えて更新できる', () => {
  const head = `<details>a</details> 補足 <details><details>b</details></details>\n\n${ESC}\n\n行頭 </details> を余分に閉じても深さは負にならない`
  const { r, body, edits } = runRootFull(withOld(head), [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.equal(edits.length, 1)
  assert.ok(body.includes('KEEP-BODY'))
  assert.ok(body.includes(KEEP))
  assert.ok(!body.includes('古い子'))
  assert.equal(phase1Headings(body), 2)
})

test('(F2) 管理マーカーの外にあるバッククォート・コメント・バックスラッシュでは止まらず、内側だけを判定する', () => {
  const root = MANAGED_ROOT()
    .replace('OPS-KEEP-MARKER', 'OPS `code` <!-- c --> \\ KEEP')
    .replace('## Phase 別表\n', '## Phase 別表\n\n説明 `x` と <!-- メモ --> と \\\n')
  const { r, body, edits } = runRootFull(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.equal(edits.length, 1)
  assert.ok(body.includes('OPS `code` <!-- c --> \\ KEEP'))
  assert.ok(body.includes('| #12 | legacy | - |'))
})

test('(F3) 管理マーカーの内側にバッククォートがあれば中止する', () => {
  abortsAmbiguous(MANAGED_ROOT().replace('| #11 | old | - |', '| #11 | `old` | - |'), 'F3')
})

test('(F4) コードフェンス内の記号は走査せず、フェンス外に記号が無ければ更新できる', () => {
  const root = withOld('```\n`x` <!-- y --> \\\n```')
  const { r, edits } = runRootFull(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.equal(edits.length, 1)
})

// ---- CELL を HTML 文字参照へ変更（Issue #678 追加指摘）----
// タイトル由来の | \ ` < > & が生成行に残ると、次回以降の --root 再マージが判定範囲の記号で中止したり、
// タグに触れた行が置換対象から外れて Phase が二重化した。生成時に文字参照へ変換して無害化する。
const countLines = (body, re) => body.split('\n').filter((l) => re.test(l)).length

test('(G1) | と \\ を含むタイトルで create-root-body.sh → --root 再マージを 2 回続けても中止せず、Phase 行は重複しない', () => {
  const ptitle = 'feat(phase-1): a | b \\ c'
  const ctitle = 'feat: x | y \\ z'
  const ctx = setup({
    'sub_100_1.json': [issue(101, ptitle, 'open', ['phase:1'])],
    'sub_101_1.json': [issue(111, ctitle)],
    'sub_111_1.json': [],
  })
  let created
  try {
    created = run(ctx)
  } finally {
    rmSync(ctx.dir, { recursive: true, force: true })
  }
  assert.equal(created.r.status, 0, created.r.stderr)
  assert.ok(created.body.includes('&#124;') && created.body.includes('&#92;'), '文字参照が出ていない')
  assert.ok(!created.body.includes('\\'), 'バックスラッシュが残っている')
  const kids = [issue(111, ctitle)]
  const env = { PHASE_TITLE: ptitle }
  const m1 = runRootFull(created.body, kids, { env })
  assert.equal(m1.r.status, 0, m1.r.stderr)
  const m2 = runRootFull(m1.body, kids, { env })
  assert.equal(m2.r.status, 0, m2.r.stderr)
  assert.equal(m2.edits.length, 1)
  assert.equal(countLines(m2.body, /^\| Phase 1 \|/), 1)
  assert.equal(phase1Headings(m2.body), 1)
  assert.equal(countLines(m2.body, /^\| #111 \|/), 1)
})

test('(G2) Phase 親タイトルが </details> / <details>x</details> でも表行・節が置換され、1 つずつしか無い', () => {
  const t1 = 'fix: </details>'
  const t2 = 'fix: <details>x</details>'
  const a1 = ['--root', '100', '--granularity', '2h', '--phase', '1', '--phase-number', '101']
  const a2 = ['--root', '100', '--granularity', '2h', '--phase', '2', '--phase-number', '102']
  const kids = [issue(111, 'feat: 新しい子')]
  let body = ROOT_BODY
  for (let round = 0; round < 2; round++) {
    const r1 = runRootFull(body, kids, { args: a1, env: { PHASE_TITLE: t1 } })
    assert.equal(r1.r.status, 0, `round ${round} phase1: ${r1.r.stderr}`)
    const r2 = runRootFull(r1.body, kids, { args: a2, env: { PHASE_TITLE: t2 } })
    assert.equal(r2.r.status, 0, `round ${round} phase2: ${r2.r.stderr}`)
    body = r2.body
  }
  assert.equal(countLines(body, /^\| Phase 1 \|/), 1)
  assert.equal(countLines(body, /^\| Phase 2 \|/), 1)
  assert.equal(phase1Headings(body), 1)
  assert.equal(countLines(body, /^### Phase 2:/), 1)
  assert.ok(body.includes('fix: &lt;/details&gt;'))
  assert.ok(body.includes('fix: &lt;details&gt;x&lt;/details&gt;'))
  assert.ok(!body.includes('古い子') && !body.includes('PHASE2-KEEP-MARKER'), '旧節が残っている')
  assert.ok(body.includes('OPS-KEEP-MARKER'))
})

test('(G3) バッククォート・<!--・--> を含むタイトルでも 2 回の再マージが通り、生成行に記号が残らない', () => {
  const t = 'feat: `x` <!-- y --> z'
  const kids = [issue(111, t)]
  const env = { PHASE_TITLE: t }
  const m1 = runRootFull(ROOT_BODY, kids, { env })
  assert.equal(m1.r.status, 0, m1.r.stderr)
  const m2 = runRootFull(m1.body, kids, { env })
  assert.equal(m2.r.status, 0, m2.r.stderr)
  const gen = m2.body.split('\n').filter((l) => /^(\| Phase 1 \||### Phase 1:|\| #111 \|)/.test(l))
  assert.equal(gen.length, 3)
  for (const l of gen) assert.ok(!/[`\\]|<!--|-->/.test(l), `生成行に記号が残る: ${l}`)
  assert.ok(m2.body.includes('&#96;x&#96; &lt;!-- y --&gt; z'))
  assert.equal(phase1Headings(m2.body), 1)
})

test('(G4) & は最初に変換され、文字参照が二重変換されない', () => {
  const kids = [issue(111, 'a&b <c> `d` e\\f g|h')]
  const { r, body } = runRootFull(ROOT_BODY, kids)
  assert.equal(r.status, 0, r.stderr)
  assert.ok(body.includes('| #111 | a&amp;b &lt;c&gt; &#96;d&#96; e&#92;f g&#124;h | - |'))
})

test('(G5) 旧形式のエスケープ（\\|）が残る本文は中止し、文字参照で手直しする案内を出す', () => {
  const root = ROOT_BODY.replace('| #901 | 古い子 | - |', '| #901 | a \\| b | - |')
  const { r, edits } = runRootFull(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 1, r.stderr)
  assert.equal(edits.length, 0)
  assert.match(r.stderr, /旧形式のエスケープ/)
  assert.match(r.stderr, /文字参照/)
  assert.match(r.stderr, /&#124;/)
  assert.match(r.stderr, /管理マーカー区間内の行も対象/)
  assert.match(r.stderr, /update-issue-tree を再実行/)
  assert.doesNotMatch(r.stderr, /update-issue-tree で本文を更新してください/)
  assert.doesNotMatch(r.stderr, /回避策になりません/)
})

// Issue #683: update-issue-tree の管理区間の出力を create-issue-tree の --root 再マージへ通す往復。
// update-issue-tree が無い配布形態（スキル単体の配布）では skip する。スキルをまたぐ import はしない。
const UPDATE_SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'update-issue-tree', 'scripts', 'update-root-body.sh')
const UPDATE_GH_STUB = `#!/usr/bin/env bash
D="\${STUB_DIR}"
case "$1" in
  auth) exit 0 ;;
  issue) cp "$5" "\${D}/edited.body"; exit 0 ;;
  api)
    path="$2"
    case "\${path}" in
      */sub_issues\\?*)
        rest="\${path#*/issues/}"; n="\${rest%%/*}"; page="\${path##*page=}"
        f="\${D}/sub_\${n}_\${page}.json"
        if [[ -f "\${f}" ]]; then cat "\${f}"; exit 0; fi
        exit 1 ;;
      */issues/*)
        if [[ -f "\${D}/edited.body" ]]; then
          jq -n --rawfile b "\${D}/edited.body" '{body: $b, repository_url: "https://api.github.com/repos/o/r"}'
        else
          cat "\${D}/root.json"
        fi
        exit 0 ;;
    esac ;;
esac
exit 1
`

// update-root-body.sh を gh スタブで実行し、生成した本文を返す。ルート 254 の直下に phase:1 の親 10・その子 11。
function runUpdate(rootBody, parentTitle, childTitle) {
  const dir = mkdtempSync(join(tmpdir(), 'step6upd-'))
  const stub = join(dir, 'stub')
  const bin = join(dir, 'bin')
  const tmp = join(dir, 'tmp')
  for (const d of [stub, bin, tmp]) mkdirSync(d)
  writeFileSync(join(bin, 'gh'), UPDATE_GH_STUB)
  chmodSync(join(bin, 'gh'), 0o755)
  const url = 'https://api.github.com/repos/o/r'
  const mk = (number, title, labels, total) => ({
    number, title, state: 'open', repository_url: url,
    labels: labels.map((name) => ({ name })), sub_issues_summary: { total, completed: 0 },
  })
  writeFileSync(join(stub, 'root.json'), JSON.stringify({ number: 254, repository_url: url, body: rootBody }))
  writeFileSync(join(stub, 'sub_254_1.json'), JSON.stringify([mk(10, parentTitle, ['phase:1'], 1)]))
  writeFileSync(join(stub, 'sub_10_1.json'), JSON.stringify([mk(11, childTitle, [], 0)]))
  try {
    const r = spawnSync('bash', [UPDATE_SCRIPT, '--root', '254', '--granularity', '2h', '--reassigned', '0', '--orphans', '0', '--labels', '0', '--new-phases', '0', '--split', '0', '--date', '2026-10-06'], {
      cwd: dir,
      encoding: 'utf8',
      env: { PATH: `${bin}:${process.env.PATH}`, STUB_DIR: stub, TMPDIR: tmp, HOME: dir },
    })
    const f = join(stub, 'edited.body')
    return { r, body: existsSync(f) ? readFileSync(f, 'utf8') : null }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

const HOSTILE_TITLE = 'fix: a | b \\ c `d` <details>x</details> <!-- y --> </details>'

test('(G6) update-issue-tree が書いた管理区間は create-issue-tree の --root 再マージで中止しない', { skip: !existsSync(UPDATE_SCRIPT) }, () => {
  const upd = runUpdate('', HOSTILE_TITLE, HOSTILE_TITLE)
  assert.equal(upd.r.status, 0, upd.r.stderr)
  const kids = [issue(111, HOSTILE_TITLE)]
  const m = runRootFull(upd.body, kids, { env: { PHASE_TITLE: HOSTILE_TITLE } })
  assert.equal(m.r.status, 0, m.r.stderr)
  assert.equal(m.edits.length, 1)
  assert.doesNotMatch(m.r.stderr, /バッククォート/)
  for (const mk of ['phase-plan:begin', 'phase-plan:end', 'inventory:begin', 'inventory:end']) {
    assert.equal(m.body.split(`<!-- update-issue-tree:${mk} -->`).length - 1, 1, mk)
  }
  assert.equal(countLines(m.body, /^### Phase 1:/), 1)
  assert.equal(countLines(m.body, /^\| Phase 1 \|/), 1)
  assert.equal(countLines(m.body, /^\| #111 \|/), 1)
  // 往復: マージ後の本文を update-issue-tree へもう一度通しても通る
  const upd2 = runUpdate(m.body, HOSTILE_TITLE, HOSTILE_TITLE)
  assert.equal(upd2.r.status, 0, upd2.r.stderr)
})

test('(G7) update-issue-tree の表セル・見出しは create-issue-tree の CELL と同じ出力になる', { skip: !existsSync(UPDATE_SCRIPT) }, () => {
  const inputs = [
    'a&b <c> `d` e\\f g|h',
    '&amp;',
    'x\r\ny\n\nz',
    '<!-- update-issue-tree:phase-plan:end -->',
    '</details>',
    'feat: 日本語のタイトル',
  ]
  for (const t of inputs) {
    const cell = spawnSync('bash', ['-c', 'source "$1"; jq -rn --arg t "$2" "\\$t | ${CELL}"', 'bash', LIB, t], { encoding: 'utf8' })
    assert.equal(cell.status, 0, cell.stderr)
    const expected = cell.stdout.replace(/\n$/, '')
    const upd = runUpdate('', t, t)
    assert.equal(upd.r.status, 0, upd.r.stderr)
    assert.ok(upd.body.includes(`### Phase 1: ${expected}\n`), JSON.stringify([t, expected]))
    assert.ok(upd.body.includes(`| #11 | ${expected} | - |`), JSON.stringify([t, expected]))
  }
})

// Issue #689: 文字参照化（#679・#684）より前の版が書いた表行・見出しに素のタグ文字列が残っていても、
// 行頭が <details> / </details> でなければ除外せず置換対象に戻す。開いたまま終わる表行・見出しは中止する。
test('(I1) マーカー無し: 表行・見出し・子行のタグ文字列は除外されず置換される', () => {
  const root = ROOT_BODY
    .replace('| Phase 1 | #101 古い | 9 | 9 |', '| Phase 1 | #101 fix: <details>x</details> | 9 | 9 |')
    .replace('### Phase 1: 古い', '### Phase 1: fix: </details>')
    .replace('| #901 | 古い子 | - |', '| #901 | <details>a</details> 古い子 | - |')
  const { r, body, edits } = runRootFull(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.equal(edits.length, 1)
  assert.equal(countLines(body, /^\| Phase 1 \|/), 1)
  assert.equal(phase1Headings(body), 1)
  assert.ok(!body.includes('古い子') && !body.includes('fix: </details>'), '旧行が残っている')
  assert.ok(body.includes('PHASE2-KEEP-MARKER') && body.includes('OPS-KEEP-MARKER'))
})

test('(I2) 管理マーカー区間: 表行・見出しのタグ文字列は置換され、退避節は保持される', () => {
  const root = MANAGED_ROOT()
    .replace('| Phase 1 | #10 A | 1 | 1 |', '| Phase 1 | #10 A </details> | 1 | 1 |')
    .replace('### Phase 1: A\n\n| Issue | タイトル | 分解 |\n|-------|---------|------|\n| #11', '### Phase 1: A <details>q</details>\n\n| Issue | タイトル | 分解 |\n|-------|---------|------|\n| #11')
  const { r, body } = runRootFull(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.equal(countLines(body, /^\| Phase 1 \|/), 1)
  assert.ok(!body.includes('| #11 | old |'), '旧子行が残っている')
  assert.ok(body.includes('| #12 | legacy | - |') && body.includes('<details><summary>移行前'))
  assert.equal(phase1Headings(body), 2)
})

test('(I3) 開いたまま終わる表行・見出しは構造かタイトルか決められず中止する', () => {
  for (const [from, to] of [
    ['### Phase 1: 古い', '### Phase 1: fix: <details>'],
    ['| Phase 1 | #101 古い | 9 | 9 |', '| Phase 1 | #101 a <details> | 9 | 9 |'],
  ]) {
    const { r, edits, leftovers } = runRootFull(ROOT_BODY.replace(from, to), [issue(111, 'feat: 新しい子')])
    assert.equal(r.status, 1, r.stderr)
    assert.equal(edits.length, 0)
    assert.match(r.stderr, /閉じていない素の <details>/)
    assert.deepEqual(leftovers, [])
  }
})

test('(I4) 深さ 0 の段落の行内タグは除外されない: 旧節の中なら落ち、外なら保持される', () => {
  const inside = withOld('').replace('OLD-DETAIL-MARKER', '説明 <details>a</details> の話')
  const a = runRootFull(inside, [issue(111, 'feat: 新しい子')])
  assert.equal(a.r.status, 0, a.r.stderr)
  assert.ok(!a.body.includes('説明 <details>a</details> の話'))
  const outside = ROOT_BODY.replace('PHASE2-KEEP-MARKER', '説明 <details>a</details> の話')
  const b = runRootFull(outside, [issue(111, 'feat: 新しい子')])
  assert.equal(b.r.status, 0, b.r.stderr)
  assert.ok(b.body.includes('説明 <details>a</details> の話'))
})

test('(I5) 深さ 0 の表行で余った </details> は深さを負にせず、後ろの退避節は保持される', () => {
  const root = withOld('| x | </details> |\n\n<details><summary>退避</summary>\n\n| #9 | keep |\n\n</details>')
  const { r, body } = runRootFull(root, [issue(111, 'feat: 新しい子')])
  assert.equal(r.status, 0, r.stderr)
  assert.ok(body.includes('| #9 | keep |') && body.includes('<details><summary>退避</summary>'))
})

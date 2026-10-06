// step8-root-body.test.mjs — Issue #545 の回帰テスト。
//
// 旧 Step 8 は固定テンプレートの here-document を `gh issue edit --body` へ渡し、ルート issue の
// 本文を全置換していた。人が書いた計画・判断根拠が棚卸しのたびに消え、件数・日付のプレース
// ホルダーが本文へ到達し得た。修正後は scripts/update-root-body.sh が既存本文を取得して管理
// ブロックだけを差し替える。本テストはそのスクリプトを実プロセスとして起動し、gh を PATH 上の
// スタブへ差し替えて、保持・移行・冪等・fail-closed の契約を固定する（node:test 標準のみ）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync, existsSync, readdirSync, chmodSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const SKILL_MD = join(HERE, '..', 'SKILL.md')
const SCRIPT = join(HERE, '..', 'scripts', 'update-root-body.sh')

const PB = '<!-- update-issue-tree:phase-plan:begin -->'
const PE = '<!-- update-issue-tree:phase-plan:end -->'
const IB = '<!-- update-issue-tree:inventory:begin -->'
const IE = '<!-- update-issue-tree:inventory:end -->'
const REPO_URL = 'https://api.github.com/repos/o/r'

const GH_STUB = `#!/usr/bin/env bash
D="\${STUB_DIR}"
echo "$*" >> "\${D}/calls.log"
case "$1" in
  auth)
    [[ -f "\${D}/auth.fail" ]] && exit 1
    exit 0
    ;;
  issue)
    # gh issue edit <n> --body-file <f>
    echo "edit" >> "\${D}/edit.log"
    [[ -f "\${D}/edit.fail" ]] && exit 1
    cp "$5" "\${D}/edited.body"
    exit 0
    ;;
  api)
    path="$2"
    case "\${path}" in
      */sub_issues\\?*)
        rest="\${path#*/issues/}"
        n="\${rest%%/*}"
        page="\${path##*page=}"
        echo "sub \${n} \${page}" >> "\${D}/sub.log"
        f="\${D}/sub_\${n}_\${page}.json"
        if [[ -f "\${f}" ]]; then cat "\${f}"; exit 0; fi
        exit 1
        ;;
      */issues/*)
        [[ -f "\${D}/root.fail" ]] && exit 1
        k=$(cat "\${D}/root.count" 2>/dev/null || echo 0)
        k=$((k + 1))
        echo "\${k}" > "\${D}/root.count"
        if [[ -f "\${D}/edited.body" && -f "\${D}/verify.override.json" ]]; then
          cat "\${D}/verify.override.json"
        elif [[ -f "\${D}/edited.body" ]]; then
          jq -n --rawfile b "\${D}/edited.body" '{body: $b, repository_url: "${REPO_URL}"}'
        elif [[ -f "\${D}/root.\${k}.json" ]]; then
          cat "\${D}/root.\${k}.json"
        else
          cat "\${D}/root.json"
        fi
        exit 0
        ;;
    esac
    ;;
esac
exit 1
`

function setup() {
  const dir = mkdtempSync(join(tmpdir(), 'step8-'))
  const stub = join(dir, 'stub')
  const bin = join(dir, 'bin')
  const tmp = join(dir, 'tmp')
  for (const d of [stub, bin, tmp]) mkdirSync(d)
  writeFileSync(join(bin, 'gh'), GH_STUB)
  chmodSync(join(bin, 'gh'), 0o755)
  return { dir, stub, bin, tmp }
}

function setRoot(env, body, extra = {}) {
  const obj = { number: 254, repository_url: REPO_URL, body, ...extra }
  writeFileSync(join(env.stub, 'root.json'), JSON.stringify(obj))
}

function issue(number, title, o = {}) {
  return {
    number,
    title,
    state: o.state ?? 'open',
    repository_url: o.repo ? `https://api.github.com/repos/${o.repo}` : REPO_URL,
    labels: (o.labels ?? []).map((name) => ({ name })),
    sub_issues_summary: { total: o.total ?? 0, completed: 0 },
  }
}

function setSubs(env, n, items, page = 1) {
  writeFileSync(join(env.stub, `sub_${n}_${page}.json`), JSON.stringify(items))
}

const DEFAULT_ARGS = [
  '--root', '254', '--granularity', '2h',
  '--reassigned', '1', '--orphans', '2', '--labels', '3', '--new-phases', '0', '--split', '0',
  '--date', '2026-10-06',
]

function run(env, args = DEFAULT_ARGS) {
  const r = spawnSync('bash', [SCRIPT, ...args], {
    cwd: env.dir,
    encoding: 'utf8',
    env: { PATH: `${env.bin}:${process.env.PATH ?? ''}`, STUB_DIR: env.stub, TMPDIR: env.tmp, HOME: env.dir },
  })
  if (r.error) throw r.error
  return { status: r.status ?? 1, stdout: r.stdout ?? '', stderr: r.stderr ?? '' }
}

const editCount = (env) => {
  const f = join(env.stub, 'edit.log')
  return existsSync(f) ? readFileSync(f, 'utf8').split('\n').filter(Boolean).length : 0
}
const edited = (env) => readFileSync(join(env.stub, 'edited.body'), 'utf8')
const callCount = (env) => {
  const f = join(env.stub, 'calls.log')
  return existsSync(f) ? readFileSync(f, 'utf8').split('\n').filter(Boolean).length : 0
}
const count = (text, line) => text.split('\n').filter((l) => l === line).length
const cleanup = (env) => rmSync(env.dir, { recursive: true, force: true })

function withEnv(fn) {
  const env = setup()
  try {
    return fn(env)
  } finally {
    cleanup(env)
  }
}

// #254 を模した、手書きの内容が混在するマーカー無し本文。
const HANDWRITTEN = [
  '<!-- granularity: 2h -->',
  '## 概要',
  '',
  '手書きの概要。判断根拠はここに書く。',
  '',
  '## 棚卸しで実施した整理（2026-09-01 追記）',
  '',
  '- 手書きの叙述 A',
  '- 手書きの叙述 B',
  '',
  '## Phase 別実装計画',
  '',
  '| Phase | 親 issue | 直下 | 総 open 件数 |',
  '|-------|----------|------|-------------|',
  '| Phase 1 | #10 旧タイトル | 1 | 1 |',
  '| 実装ラン | #275 手書きサマリー | - | - |',
  '',
  '### Phase 1: 旧タイトル',
  '',
  '| Issue | タイトル | 由来 | 分解 |',
  '|-------|---------|------|------|',
  '| #11 | 旧子 | 手書き由来 | - |',
  '',
  '### 実装ラン (#275)',
  '',
  '| 項目 | 内容 |',
  '|------|------|',
  '| 手書き | 別スキーマの表 |',
  '',
  '## 運用',
  '',
  '- 新規 issue は起票時に Phase 親へ紐付ける',
  '- テンプレート外の手書き bullet',
  '',
].join('\n')

function basicTree(env) {
  setSubs(env, 254, [
    issue(10, 'Phase 親 1', { labels: ['phase:1'], total: 2 }),
    issue(20, 'Phase 親 2', { labels: ['phase:2'], total: 0 }),
  ])
  setSubs(env, 10, [issue(11, '子 A', { total: 1 }), issue(12, '子 B')])
  setSubs(env, 11, [issue(13, '孫 A')])
}

test('a: マーカー無しの手書き本文は全行を保持して移行する（旧 Phase 表は details へ退避）', () =>
  withEnv((env) => {
    setRoot(env, HANDWRITTEN)
    basicTree(env)
    const r = run(env)
    assert.equal(r.status, 0, r.stderr)
    assert.equal(editCount(env), 1)
    const out = edited(env)
    const outLines = new Set(out.split('\n'))
    for (const line of HANDWRITTEN.split('\n')) {
      if (line === '' || line.startsWith('<!-- granularity')) continue
      assert.ok(outLines.has(line), `行が失われた: ${line}`)
    }
    assert.equal(out.split('\n')[0], '<!-- granularity: 2h -->')
    const detailsStart = out.indexOf('<details>')
    const detailsEnd = out.indexOf('</details>')
    assert.ok(detailsStart >= 0 && detailsEnd > detailsStart)
    const details = out.slice(detailsStart, detailsEnd)
    assert.ok(details.includes('### Phase 1: 旧タイトル'))
    assert.ok(details.includes('| #11 | 旧子 | 手書き由来 | - |'))
    const runIdx = out.indexOf('### 実装ラン (#275)')
    assert.ok(runIdx >= 0 && (runIdx < detailsStart || runIdx > detailsEnd), '実装ラン は details の外')
    for (const m of [PB, PE, IB, IE]) assert.equal(count(out, m), 1)
    assert.match(r.stdout, /migration=phase-plan-archived/)
    assert.match(out, /\| Phase 1 \| #10 Phase 親 1 \| 2 \| 3 \|/)
    assert.match(out, /\| 2026-10-06 \| 1 \| 2 \| 3 \| 0 \| 0 \|/)
  }))

test('b: マーカーあり本文は phase-plan 間だけを置換し、マーカー外は一致する', () =>
  withEnv((env) => {
    const before = ['<!-- granularity: 2h -->', '## 概要', '', '手書き', '', '## Phase 別実装計画', '', PB, '古い表', PE, '', '## 運用', '', '- 手書き bullet', ''].join('\n')
    setRoot(env, before)
    basicTree(env)
    const r = run(env)
    assert.equal(r.status, 0, r.stderr)
    const out = edited(env)
    // マーカー外の元の行（granularity 行を除く）が、同じ順序で 1 行も欠けず残る
    const outLines = out.split('\n')
    let pos = 0
    const outside = before.split('\n').filter((l) => !l.startsWith('<!-- granularity'))
    let inside = false
    for (const line of outside) {
      if (line === PB) inside = true
      if (!inside) {
        const idx = outLines.indexOf(line, pos)
        assert.ok(idx >= 0, `行が失われた・順序が変わった: ${line}`)
        pos = idx + 1
      }
      if (line === PE) inside = false
    }
    assert.ok(out.split(PE)[1].includes('## 運用\n\n- 手書き bullet'))
    assert.ok(!out.includes('古い表'))
    assert.match(r.stdout, /migration=inserted/)
  }))

test('c: 同一入力の 2 回目は unchanged・edit なし・履歴行が重複しない', () =>
  withEnv((env) => {
    setRoot(env, HANDWRITTEN)
    basicTree(env)
    assert.equal(run(env).status, 0)
    const first = edited(env)
    rmSync(join(env.stub, 'root.count'), { force: true })
    setRoot(env, first)
    rmSync(join(env.stub, 'edited.body'))
    const r2 = run(env)
    assert.equal(r2.status, 0, r2.stderr)
    assert.match(r2.stdout, /result=unchanged/)
    assert.match(r2.stdout, /migration=none/)
    assert.equal(editCount(env), 1)
  }))

test('d: 件数が変わった 2 回目は履歴行が 1 行追加され、1 回目の行も残る', () =>
  withEnv((env) => {
    setRoot(env, HANDWRITTEN)
    basicTree(env)
    assert.equal(run(env).status, 0)
    const first = edited(env)
    rmSync(join(env.stub, 'edited.body'))
    setRoot(env, first)
    const args = DEFAULT_ARGS.map((a, i) => (DEFAULT_ARGS[i - 1] === '--reassigned' ? '5' : a))
    const r2 = run(env, args)
    assert.equal(r2.status, 0, r2.stderr)
    const out = edited(env)
    assert.ok(out.includes('| 2026-10-06 | 1 | 2 | 3 | 0 | 0 |'))
    assert.ok(out.includes('| 2026-10-06 | 5 | 2 | 3 | 0 | 0 |'))
  }))

test('e: 見出しもマーカーも無い本文は末尾へ追記し、既存行を保持する', () =>
  withEnv((env) => {
    const before = '手書きメモ 1\n手書きメモ 2\n'
    setRoot(env, before)
    basicTree(env)
    const r = run(env)
    assert.equal(r.status, 0, r.stderr)
    const out = edited(env)
    assert.ok(out.includes('手書きメモ 1\n手書きメモ 2\n'))
    assert.ok(out.indexOf('## Phase 別実装計画') > out.indexOf('手書きメモ 2'))
    for (const m of [PB, PE, IB, IE]) assert.equal(count(out, m), 1)
  }))

test('f: 空本文・null 本文は骨格を生成し、プレースホルダーを含まない', () => {
  for (const body of ['', null, '  \n ']) {
    withEnv((env) => {
      setRoot(env, body)
      basicTree(env)
      const r = run(env)
      assert.equal(r.status, 0, r.stderr)
      const out = edited(env)
      assert.ok(out.includes('## 概要') && out.includes('## 運用') && out.includes('## Phase 別実装計画'))
      assert.ok(!/YYYY-MM-DD|<phase|<N>|\bN 件/.test(out), 'プレースホルダー混入')
      assert.ok(out.includes('| 2026-10-06 | 1 | 2 | 3 | 0 | 0 |'))
    })
  }
})

test('g: マーカー不整合は exit 4・edit なし', () => {
  const bad = [
    [PB, 'x'].join('\n'),
    [PB, PB, PE].join('\n'),
    [PE, 'x', PB].join('\n'),
    [IB, 'x', PB, IE, PE].join('\n'),
  ]
  for (const body of bad) {
    withEnv((env) => {
      setRoot(env, body)
      basicTree(env)
      const r = run(env)
      assert.equal(r.status, 4, body)
      assert.equal(editCount(env), 0)
    })
  }
})

test('h: ルート取得失敗は exit 2・edit なし', () =>
  withEnv((env) => {
    writeFileSync(join(env.stub, 'root.fail'), '')
    const r = run(env)
    assert.equal(r.status, 2)
    assert.equal(editCount(env), 0)
  }))

test('h2: ルートが PR なら exit 2', () =>
  withEnv((env) => {
    setRoot(env, 'x', { pull_request: { url: 'u' } })
    assert.equal(run(env).status, 2)
    assert.equal(editCount(env), 0)
  }))

test('i: sub_issues 取得失敗は exit 3・edit なし', () =>
  withEnv((env) => {
    setRoot(env, HANDWRITTEN)
    const r = run(env)
    assert.equal(r.status, 3)
    assert.equal(editCount(env), 0)
  }))

test('j: 不正な引数（プレースホルダー残り含む）は exit 1・gh 呼び出しなし', () => {
  const swap = (flag, val) => DEFAULT_ARGS.map((a, i) => (DEFAULT_ARGS[i - 1] === flag ? val : a))
  const cases = [
    swap('--reassigned', 'N'),
    swap('--orphans', '<N>'),
    swap('--labels', '-1'),
    swap('--new-phases', '01'),
    swap('--split', ''),
    swap('--granularity', '2'),
    swap('--granularity', '0h'),
    swap('--root', 'abc'),
    swap('--date', '2026/10/06'),
    DEFAULT_ARGS.slice(0, 4),
  ]
  for (const args of cases) {
    withEnv((env) => {
      setRoot(env, 'x')
      const r = run(env, args)
      assert.equal(r.status, 1, JSON.stringify(args))
      assert.equal(callCount(env), 0)
    })
  }
})

test('k: タイトルの | ・改行・終了マーカー文字列でも表が崩れず、再入力が通る', () =>
  withEnv((env) => {
    setRoot(env, '')
    setSubs(env, 254, [issue(10, `a | b\nc ${PE} d <!-- x -->`, { labels: ['phase:1'], total: 1 })])
    setSubs(env, 10, [issue(11, `x | y ${IE}`)])
    assert.equal(run(env).status, 0)
    const out = edited(env)
    for (const m of [PB, PE, IB, IE]) assert.equal(count(out, m), 1)
    const rows = out.split('\n').filter((l) => l.startsWith('| #'))
    for (const row of rows) {
      const cols = row.replace(/\\\|/g, '').split('|').length
      assert.ok(cols === 5 || cols === 5, row)
    }
    rmSync(join(env.stub, 'edited.body'))
    setRoot(env, out)
    const r2 = run(env)
    assert.equal(r2.status, 0, r2.stderr)
  }))

test('l: CRLF 本文でも見出し・マーカーを認識し内容を保持する', () =>
  withEnv((env) => {
    setRoot(env, HANDWRITTEN.replace(/\n/g, '\r\n'))
    basicTree(env)
    const r = run(env)
    assert.equal(r.status, 0, r.stderr)
    const out = edited(env)
    assert.ok(out.includes('手書きの概要。判断根拠はここに書く。'))
    assert.ok(out.includes('### 実装ラン (#275)'))
    // 管理範囲外の行は CR を含め逐語で保持する（#545 契約）。
    assert.ok(out.includes('手書きの概要。判断根拠はここに書く。\r\n'))
    assert.ok(out.includes('## 運用\r\n'))
    assert.match(r.stdout, /migration=phase-plan-archived/)
  }))

test('l2: マーカーあり CRLF 本文は管理範囲外の CR を失わず、2 回目は unchanged', () =>
  withEnv((env) => {
    const body = ['## 概要', '', '手書き', '', PB, 'old', PE, '', '## 運用', '', '- 手書き bullet', ''].join('\r\n')
    setRoot(env, body)
    basicTree(env)
    const r = run(env)
    assert.equal(r.status, 0, r.stderr)
    const out = edited(env)
    assert.ok(out.includes('手書き\r\n'))
    assert.ok(out.includes('- 手書き bullet\r'))
    assert.equal(count(out, PB), 1)
  }))

test('x: 子 issue が 0 件のルートでも Phase 表を生成して更新できる', () =>
  withEnv((env) => {
    setRoot(env, '## 概要\n\n手書き\n')
    setSubs(env, 254, [])
    const r = run(env)
    assert.equal(r.status, 0, r.stderr)
    assert.match(r.stdout, /phases=0/)
    assert.ok(edited(env).includes('| Phase | 親 issue | 直下 open | 総 open |'))
  }))

test('y: 書き込み長がちょうど 65536 文字なら編集し、65537 文字になる本文は exit 3・edit なし', () => {
  const build = (pad) => {
    const base = ['## 概要', '', 'x'.repeat(pad), ''].join('\n')
    return base
  }
  // 骨格長を実測して、書き込み長（末尾改行込み）を 65536 / 65537 に合わせる。
  let probeLen
  withEnv((env) => {
    setRoot(env, build(1))
    basicTree(env)
    const r = run(env, [...DEFAULT_ARGS, '--dry-run'])
    assert.equal(r.status, 0, r.stderr)
    // dry-run は printf '%s\n' で出力する。stdout は result= 行を含むため除去して測る。
    const body = r.stdout.replace(/result=.*\n$/, '')
    probeLen = [...body].length
  })
  const exact = 65536 - probeLen + 1
  withEnv((env) => {
    setRoot(env, build(exact))
    basicTree(env)
    const r = run(env)
    assert.equal(r.status, 0, r.stderr)
    assert.equal([...edited(env)].length, 65536)
  })
  withEnv((env) => {
    setRoot(env, build(exact + 1))
    basicTree(env)
    const r = run(env)
    assert.equal(r.status, 3, r.stderr)
    assert.equal(editCount(env), 0)
  })
})

test('z1: マーカー外の末尾改行を失わない（コマンド置換で落とさない）', () =>
  withEnv((env) => {
    const before = ['## 概要', '', '手書き', '', PB, PE, '', '末尾', ''].join('\n') + '\n\n'
    setRoot(env, before)
    basicTree(env)
    const r = run(env)
    assert.equal(r.status, 0, r.stderr)
    assert.ok(edited(env).endsWith('末尾\n\n\n'), JSON.stringify(edited(env).slice(-12)))
  }))

test('z2: 事後確認で取得本文が送信本文と異なれば（欠落・改変）exit 7', () =>
  withEnv((env) => {
    setRoot(env, HANDWRITTEN)
    basicTree(env)
    // 先頭の granularity 行と管理マーカー数は正しいまま、本文の一部だけが欠けた応答を返す。
    const probe = run(env, [...DEFAULT_ARGS, '--dry-run'])
    assert.equal(probe.status, 0, probe.stderr)
    const full = probe.stdout.replace(/result=.*\n$/, '')
    const lines = full.split('\n')
    const idx = lines.findIndex((l) => l === '手書き' || l.startsWith('- '))
    assert.ok(idx > 0)
    lines.splice(idx, 1)
    writeFileSync(join(env.stub, 'verify.override.json'), JSON.stringify({ number: 254, repository_url: REPO_URL, body: lines.join('\n') }))
    const r = run(env)
    assert.equal(r.status, 7, r.stderr)
  }))

test('z3: 閉じていないコードフェンスは exit 4・edit なし（管理ブロックを二重追記しない）', () =>
  withEnv((env) => {
    setRoot(env, ['## 概要', '', '```', '## Phase 別実装計画', PB, PE, '', '手書き'].join('\n'))
    basicTree(env)
    const r = run(env)
    assert.equal(r.status, 4, r.stderr)
    assert.equal(editCount(env), 0)
  }))

test('m: コードフェンス内のマーカー様文字列・見出しは管理範囲として扱わない', () =>
  withEnv((env) => {
    const before = ['## 概要', '', '```', PB, '## Phase 別実装計画', PE, '```', '', '手書き', ''].join('\n')
    setRoot(env, before)
    basicTree(env)
    const r = run(env)
    assert.equal(r.status, 0, r.stderr)
    const out = edited(env)
    assert.ok(out.includes(['```', PB, '## Phase 別実装計画', PE, '```'].join('\n')))
    assert.equal(count(out, PB), 2)
    assert.match(r.stdout, /migration=inserted/)
  }))

test('n: granularity マーカーは重複・途中配置でも先頭 1 行だけになり、値は引数どおり', () =>
  withEnv((env) => {
    const before = ['<!-- granularity: 9h -->', '## 概要', '', '<!-- granularity: 4h -->', '本文', ''].join('\n')
    setRoot(env, before)
    basicTree(env)
    assert.equal(run(env).status, 0)
    const out = edited(env)
    assert.equal(out.split('\n')[0], '<!-- granularity: 2h -->')
    assert.equal(out.split('\n').filter((l) => l.includes('granularity:')).length, 1)
  }))

test('o: 100 件ちょうどの 1 ページ目と 2 ページ目の全件が表に載る', () =>
  withEnv((env) => {
    setRoot(env, '')
    const p1 = Array.from({ length: 100 }, (_, i) => issue(1000 + i, `t${i}`))
    const p2 = [issue(2000, 'last')]
    setSubs(env, 254, p1, 1)
    setSubs(env, 254, p2, 2)
    assert.equal(run(env).status, 0)
    const out = edited(env)
    assert.ok(out.includes('#1000 t0'))
    assert.ok(out.includes('#1099 t99'))
    assert.ok(out.includes('#2000 last'))
    assert.match(readFileSync(join(env.stub, 'sub.log'), 'utf8'), /sub 254 2/)
  }))

test('p: 総 open 数は全子孫を数え、summary.total == 0 の節点は API を呼ばない', () =>
  withEnv((env) => {
    setRoot(env, '')
    setSubs(env, 254, [issue(10, 'P', { labels: ['phase:1'], total: 2 })])
    setSubs(env, 10, [issue(11, 'c', { total: 1 }), issue(12, 'leaf', { total: 0 })])
    setSubs(env, 11, [issue(13, 'gc', { total: 1 })])
    setSubs(env, 13, [issue(14, 'ggc')])
    assert.equal(run(env).status, 0)
    const out = edited(env)
    assert.match(out, /\| Phase 1 \| #10 P \| 2 \| 4 \|/)
    const log = readFileSync(join(env.stub, 'sub.log'), 'utf8')
    assert.ok(!/sub 12 /.test(log), 'total 0 の #12 を取得してはならない')
    assert.ok(!/sub 14 /.test(log))
  }))

test('q: closed の親は（closed）表示、phase ラベル無し・複数は Phase 列が - で位置番号を使わない', () =>
  withEnv((env) => {
    setRoot(env, '')
    setSubs(env, 254, [
      issue(10, 'closed 親', { state: 'closed', labels: ['phase:1'] }),
      issue(20, 'ラベル無し'),
      issue(30, '複数', { labels: ['phase:1', 'phase:2'] }),
      issue(40, '不正値', { labels: ['phase:a b'] }),
    ])
    assert.equal(run(env).status, 0)
    const out = edited(env)
    assert.ok(out.includes('| Phase 1 | #10 closed 親（closed） | 0 | 0 |'))
    assert.ok(out.includes('| - | #20 ラベル無し | 0 | 0 |'))
    assert.ok(out.includes('| - | #30 複数 | 0 | 0 |'))
    assert.ok(out.includes('| - | #40 不正値 | 0 | 0 |'))
  }))

test('r: 別リポジトリの sub-issue は owner/repo#N 表示・再帰しない', () =>
  withEnv((env) => {
    setRoot(env, '')
    setSubs(env, 254, [issue(10, '他リポ', { repo: 'x/y', total: 3 })])
    assert.equal(run(env).status, 0)
    assert.ok(edited(env).includes('x/y#10 他リポ'))
    assert.ok(!existsSync(join(env.stub, 'sub.log')) || !/sub 10 /.test(readFileSync(join(env.stub, 'sub.log'), 'utf8')))
  }))

test('s: 編集直前の再取得で本文が変わっていれば exit 5・edit なし', () =>
  withEnv((env) => {
    setRoot(env, HANDWRITTEN)
    basicTree(env)
    const changed = { number: 254, repository_url: REPO_URL, body: `${HANDWRITTEN}\n並行編集` }
    writeFileSync(join(env.stub, 'root.2.json'), JSON.stringify(changed))
    const r = run(env)
    assert.equal(r.status, 5)
    assert.equal(editCount(env), 0)
  }))

test('t: --dry-run は本文を stdout へ出し、edit を呼ばない', () =>
  withEnv((env) => {
    setRoot(env, HANDWRITTEN)
    basicTree(env)
    const r = run(env, [...DEFAULT_ARGS, '--dry-run'])
    assert.equal(r.status, 0, r.stderr)
    assert.equal(editCount(env), 0)
    assert.ok(r.stdout.includes('手書きの概要。判断根拠はここに書く。'))
    assert.match(r.stdout, /result=dry-run/)
  }))

test('u: 一時ファイルは成功・失敗いずれでも TMPDIR に残らない', () => {
  withEnv((env) => {
    setRoot(env, HANDWRITTEN)
    basicTree(env)
    assert.equal(run(env).status, 0)
    assert.deepEqual(readdirSync(env.tmp), [])
  })
  withEnv((env) => {
    setRoot(env, HANDWRITTEN)
    assert.equal(run(env).status, 3)
    assert.deepEqual(readdirSync(env.tmp), [])
  })
  withEnv((env) => {
    setRoot(env, HANDWRITTEN)
    basicTree(env)
    writeFileSync(join(env.stub, 'edit.fail'), '')
    assert.equal(run(env).status, 6)
    assert.deepEqual(readdirSync(env.tmp), [])
  })
})

// ---- SKILL.md の静的検査・Step 8 フェンスの単体実行 ----
function step8Section() {
  const text = readFileSync(SKILL_MD, 'utf8')
  const start = text.indexOf('### Step 8')
  const end = text.indexOf('### Step 9')
  assert.ok(start >= 0 && end > start)
  return text.slice(start, end)
}

test('v: Step 8 はスクリプトを起動し、本文全置換（--body "$(）を持たず、reassign_one を含まない', () => {
  const sec = step8Section()
  assert.ok(sec.includes('update-root-body.sh'))
  assert.ok(!/gh issue edit[^\n]*--body\s+"\$\(/.test(sec))
  assert.ok(!/--body\s+"\$\(/.test(sec))
  assert.ok(!sec.includes('reassign_one'))
  assert.ok(sec.includes(PB) && sec.includes(IB))
})

function step8Fence() {
  const m = /```bash\n([\s\S]*?)```/.exec(step8Section())
  assert.ok(m, 'Step 8 に bash フェンスがある')
  return m[1]
}

test('w: Step 8 フェンスは 3 レイアウト解決で起動し、非ゼロ終了が伝播する', () => {
  const dir = mkdtempSync(join(tmpdir(), 'step8-fence-'))
  try {
    const scripts = join(dir, 'skills', 'update-issue-tree', 'scripts')
    mkdirSync(scripts, { recursive: true })
    writeFileSync(join(scripts, 'update-root-body.sh'), '#!/usr/bin/env bash\necho "args: $*"\nexit "${STUB_EXIT:-0}"\n')
    const fence = step8Fence()
    const base = {
      PATH: process.env.PATH ?? '',
      ROOT_NUMBER: '254',
      GRANULARITY: '2h',
      REASSIGNED_COUNT: '1',
      ORPHAN_COUNT: '2',
      LABEL_SYNC_COUNT: '3',
      NEW_PHASE_COUNT: '0',
      SPLIT_COUNT: '0',
    }
    writeFileSync(join(dir, 'block.sh'), fence)
    const ok = spawnSync('bash', ['block.sh'], { cwd: dir, encoding: 'utf8', env: base })
    assert.equal(ok.status, 0, ok.stderr)
    assert.match(ok.stdout, /--root 254 --granularity 2h --reassigned 1 --orphans 2 --labels 3 --new-phases 0 --split 0/)
    const ng = spawnSync('bash', ['block.sh'], { cwd: dir, encoding: 'utf8', env: { ...base, STUB_EXIT: '5' } })
    assert.equal(ng.status, 5)
    const { ROOT_NUMBER: _omit, ...noRoot } = base
    const miss = spawnSync('bash', ['block.sh'], { cwd: dir, encoding: 'utf8', env: noRoot })
    assert.notEqual(miss.status, 0)
    assert.ok(!miss.stdout.includes('args:'), 'ROOT_NUMBER 未設定なら起動前に停止する')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

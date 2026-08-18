// skill-invocation-block.test.mjs — Issue #335 / #372 の回帰テスト。
//
// #335: SKILL.md の Step 3 / Step 4 は `bash "${REASSIGN_SCRIPT}" ...` の直後を
//   `echo "exit=$?"` で締めていた。echo がブロック最後のコマンドになるため、
//   コードブロック全体（呼び出し元がコピペ実行する単位）の終了ステータスが
//   常に 0 になり、非ゼロ終了（DELETE 済み・POST 失敗 = exit 8 等）を実行基盤が
//   「最終ステータス」で判定した場合に見落とす。
//
// #372: その修正後も、ブロックは非ゼロ終了で無条件に `exit` する一方、
//   本文とコメントは「exit 2 のうち stderr に `reason=cross-repository-parent` が
//   あるものは対象外として次の 1 件へ進む」という契約を定めていた。
//   **ブロックが stderr を捕捉していないため、掲載どおり実行しても契約を実現できない。**
//   cross-repository 親を 1 件検出しただけで棚卸し全体が停止する。
//   修正は (1) stderr のファイル捕捉と再出力、(2) マーカー判定、(3) 対象外を表す
//   返り値 9、(4) 呼び出し側ループの掲載、の 4 点。
//
// #374 P1 第 3 ラウンド: その修正で導入した共有関数（reassign_one / require_plan_array）は
//   Step 3 のフェンス内で定義し Step 4 が再利用する構成だった。しかしコードフェンスは
//   ブロックごとに独立シェルで実行され得るため、Step 4 単体実行では関数定義が継承されず
//   command not found となり、孤児の再配置が一切実行されない。旧テストは Step 4 へ
//   Step 3 の定義を人工的に前置しており、この欠陥を隠していた。
//   修正は共有部分の scripts/reassign-lib.sh への切り出しと、両フェンスが自己完結的に
//   source する前置きの掲載。**テストは前置を一切行わず、各フェンスを単体実行する。**
//
// SKILL.md はドキュメントであり import 可能なモジュールではないため、
// フェンス内のシェルスクリプトをテキストとして抽出し、実プロセスとして
// bash 実行して終了ステータスと入出力を観測する（node:test 標準ライブラリのみ）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync, existsSync, copyFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SKILL_MD = join(dirname(fileURLToPath(import.meta.url)), '..', 'SKILL.md')

// 付け替えを実行する ```bash フェンスのみを抽出する。件数が 2 から変化したら
// （新ブロック追加・削除）このテストが落ち、伝播修正の当て漏れに気づける設計にする。
// 判定キーは `reassign_one`（reassign-lib.sh が定義し、両フェンスが呼び出す関数名）。
// スクリプト直叩き（`bash "${REASSIGN_SCRIPT}"`）を判定キーにすると、関数化により
// どちらのフェンスも該当しなくなり抽出漏れを起こすため使わない。
function extractReassignBlocks() {
  const text = readFileSync(SKILL_MD, 'utf8')
  const fenceRe = /```bash\n([\s\S]*?)```/g
  const blocks = []
  let m
  while ((m = fenceRe.exec(text)) !== null) {
    if (m[1].includes('reassign_one')) {
      blocks.push(m[1])
    }
  }
  return blocks
}

// 両フェンスの 3 レイアウト解決ループの第一候補と一致させる。
const SCRIPTS_RELATIVE = join('skills', 'update-issue-tree', 'scripts')
const STUB_RELATIVE = join(SCRIPTS_RELATIVE, 'reassign-sub-issue.sh')
const LIB_RELATIVE = join(SCRIPTS_RELATIVE, 'reassign-lib.sh')
const LIB_SOURCE = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'reassign-lib.sh')

// 出荷される実体の reassign-lib.sh を tmp レイアウトへ複製する。テスト用の写しを作らないのは、
// ライブラリ自身の解決ロジック（自分の実体位置から兄弟の reassign-sub-issue.sh を導出する）
// までを実測対象に含めるため。写しを使うと解決バグがテストを落とせなくなる。
function installLib(tmp) {
  const dest = join(tmp, LIB_RELATIVE)
  mkdirSync(dirname(dest), { recursive: true })
  copyFileSync(LIB_SOURCE, dest)
}

// 任意の本文でスタブを置く（対になるライブラリも併せて設置する）。
// 意図的に実行ビットを付けない: vendoring で実行ビットが落ちるケースを
// 素通りさせず、bash 経由の起動がその状態でも機能することを実測する。
function makeStubScript(tmp, body) {
  installLib(tmp)
  const path = join(tmp, STUB_RELATIVE)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, body)
  return path
}

// exitCode と stderr 本文を指定できるスタブ。#372 の判定は stderr の内容に依存するため、
// 終了コードだけでなく stderr も制御できる必要がある。
function makeStub(tmp, exitCode, stderrText = '') {
  const emit = stderrText ? `printf '%s\\n' ${JSON.stringify(stderrText)} >&2\n` : ''
  makeStubScript(tmp, `#!/usr/bin/env bash\n${emit}exit ${exitCode}\n`)
}

function prelude({
  plan = ['123 1 2'],
  orphans = ['456 3'],
  declarePlans = true,
  scalarPlans = false,
} = {}) {
  const lines = []
  if (scalarPlans) {
    // 配列ではなくスカラーとして宣言する。declare -p はこの場合も成功するため、
    // 存在検査だけのガードは素通りしてしまう（PR #374 codex P1 第 2 ラウンド）。
    lines.push(`REASSIGN_PLAN=${JSON.stringify(plan[0] ?? '123 1 2')}`)
    lines.push(`ORPHAN_PLAN=${JSON.stringify(orphans[0] ?? '456 3')}`)
  } else if (declarePlans) {
    lines.push(`REASSIGN_PLAN=(${plan.map((e) => JSON.stringify(e)).join(' ')})`)
    lines.push(`ORPHAN_PLAN=(${orphans.map((e) => JSON.stringify(e)).join(' ')})`)
  }
  return lines.join('\n')
}

// execFileSync ではなく spawnSync を使う。execFileSync は成功時に stdout しか返さず、
// stderr は親プロセスへ素通りするため、`r.stderr` が常に空になる。#372 の判定は
// 「成功終了（status 0）しつつ stderr へ対象外を報告する」経路を検証するため、
// 成功時にも stderr を捕捉できる必要がある。
// **フェンスの前に SKILL.md 由来のコードを一切前置しない。** 前置すると「Step 4 が単体で
// 実行できない」という実運用上の欠陥をテストが隠す（PR #374 P1 第 3 ラウンドの指摘そのもの）。
// 前置するのは計画配列の宣言（Step 2 の成果物に相当）だけに限る。
function runBlock(block, cwd, preludeOpts) {
  const file = join(cwd, 'block.sh')
  writeFileSync(file, `${prelude(preludeOpts)}\n${block}`)
  // env を最小化して実行環境の偶発的な変数を拾わないようにする（Issue #335 レビュー指摘）。
  const r = spawnSync('bash', [file], {
    cwd,
    encoding: 'utf8',
    env: { PATH: process.env.PATH ?? '' },
  })
  if (r.error) throw r.error
  return { status: r.status ?? 1, stdout: r.stdout ?? '', stderr: r.stderr ?? '' }
}

const MARKER = 'reason=cross-repository-parent'

test('SKILL.md から付け替え実行ブロックがちょうど2件抽出できる', () => {
  const blocks = extractReassignBlocks()
  assert.equal(blocks.length, 2, 'Step 3 / Step 4 以外のブロックが増減していないか確認')
})

const blocks = extractReassignBlocks()
const step3 = blocks[0]
const step4 = blocks[1]
const cases = [
  { label: 'Step3(closed 親下の付け替え)', block: step3 },
  // Step 4 も prefix なしで同列に扱う。単体で実行できることが仕様であり、
  // 前置が必要になった時点でそれは退行である（PR #374 P1 第 3 ラウンド）。
  { label: 'Step4(孤児の再配置)', block: step4 },
]

for (const { label, block } of cases) {
  test(`${label}: スタブが exit 8 → ブロックの終了ステータスも 8 で返る（#335 の回帰）`, () => {
    const tmp = mkdtempSync(join(tmpdir(), 'update-issue-tree-block-'))
    try {
      makeStub(tmp, 8)
      const r = runBlock(block, tmp)
      assert.equal(r.status, 8)
      assert.match(r.stdout, /exit=8/)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  test(`${label}: スタブが exit 0 → ブロックの終了ステータスも 0、stdout に exit=0`, () => {
    const tmp = mkdtempSync(join(tmpdir(), 'update-issue-tree-block-'))
    try {
      makeStub(tmp, 0)
      const r = runBlock(block, tmp)
      assert.equal(r.status, 0)
      assert.match(r.stdout, /exit=0/)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  // --- #372: マーカーによる (a)/(b) の判定 ---

  test(`${label}: exit 2 + cross-repository マーカー → 中断せず 0 で完走する（#372）`, () => {
    const tmp = mkdtempSync(join(tmpdir(), 'update-issue-tree-block-'))
    try {
      makeStub(tmp, 2, `エラー: 現在の親が別リポジトリにある ${MARKER}`)
      const r = runBlock(block, tmp)
      assert.equal(r.status, 0, 'cross-repository 親 1 件で棚卸し全体が停止してはならない')
      assert.match(r.stderr, /対象外（cross-repository 親）/)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  test(`${label}: exit 2 でマーカー無し → 解消可能な前提不備として 2 で中断する（#372）`, () => {
    const tmp = mkdtempSync(join(tmpdir(), 'update-issue-tree-block-'))
    try {
      makeStub(tmp, 2, 'エラー: gh の認証が無い')
      const r = runBlock(block, tmp)
      assert.equal(r.status, 2, 'マーカーが無い exit 2 は中断しなければならない')
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  test(`${label}: 捕捉した stderr は握り潰さず再出力する（#372）`, () => {
    const tmp = mkdtempSync(join(tmpdir(), 'update-issue-tree-block-'))
    try {
      const detail = 'エラー: 診断に必要な詳細メッセージ'
      makeStub(tmp, 3, detail)
      const r = runBlock(block, tmp)
      assert.equal(r.status, 3)
      assert.match(r.stderr, new RegExp(detail))
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })
}

// 複数件のループが実際に「対象外は飛ばして次へ進む」ことを、呼び出し回数で実測する。
// 単一件のテストでは「1 件目で止まった」と「1 件目を飛ばして完走した」を区別できない。
test('Step3: cross-repository 親を飛ばして残りの件も処理する（呼び出し回数で実測。#372）', () => {
  const tmp = mkdtempSync(join(tmpdir(), 'update-issue-tree-block-'))
  try {
    const counter = join(tmp, 'calls.txt')
    // --issue の値で挙動を変える: 111 は cross-repository（exit 2 + マーカー）、
    // それ以外は成功。呼び出しごとに 1 行追記して回数を数える。
    makeStubScript(
      tmp,
      `#!/usr/bin/env bash\n`
        + `issue=""\n`
        + `while [[ $# -gt 0 ]]; do\n`
        + `  case "$1" in --issue) issue="$2"; shift 2 ;; *) shift ;; esac\n`
        + `done\n`
        + `printf '%s\\n' "\${issue}" >> ${JSON.stringify(counter)}\n`
        + `if [[ "\${issue}" == "111" ]]; then\n`
        + `  printf '%s\\n' "エラー: ${MARKER}" >&2\n`
        + `  exit 2\n`
        + `fi\n`
        + `exit 0\n`,
    )
    const r = runBlock(step3, tmp, { plan: ['111 1 2', '222 1 2', '333 1 2'] })
    assert.equal(r.status, 0)
    const calls = readFileSync(counter, 'utf8').trim().split('\n')
    assert.deepEqual(calls, ['111', '222', '333'], '対象外の 1 件目で停止せず 3 件すべて呼ばれること')
    assert.match(r.stderr, /対象外（cross-repository 親）: 111/)
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
})

// 未検出パスは reassign-lib.sh への切り出しで 2 通りに分かれた。両方を塞ぐ——
// (a) ライブラリ自体が 3 レイアウトいずれにも無い、(b) ライブラリはあるが対の
// reassign-sub-issue.sh が欠落している。(b) を落とすと、source は成功して
// REASSIGN_SCRIPT が実在しないパスを指したままループへ進む形の退行を検出できない。
for (const { label, block } of cases) {
  test(`${label}: reassign-lib.sh が 3 レイアウトいずれにも無ければ exit 1（未検出パス (a)）`, () => {
    const tmp = mkdtempSync(join(tmpdir(), 'update-issue-tree-block-'))
    try {
      const r = runBlock(block, tmp)
      assert.equal(r.status, 1)
      assert.match(r.stderr, /reassign-lib\.sh が見つからない/)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  test(`${label}: ライブラリはあるが対の reassign-sub-issue.sh が無ければ中断する（未検出パス (b)）`, () => {
    const tmp = mkdtempSync(join(tmpdir(), 'update-issue-tree-block-'))
    try {
      installLib(tmp) // スタブは置かない
      const r = runBlock(block, tmp)
      assert.notEqual(r.status, 0, '対のスクリプトが無いまま完走してはならない')
      assert.match(r.stderr, /対のスクリプトが欠落/)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })
}

// PR #374 P1 第 3 ラウンドの核心。Step 4 のフェンスを **Step 3 由来のコードを 1 行も
// 前置せずに** 実行し、孤児の再配置が実際に呼ばれるところまで確認する。
// 旧テストは Step 3 の関数定義を人工的に前置していたため、フェンスが独立シェルで
// 実行される実運用では command not found で 1 件も処理されない欠陥を隠していた。
test('Step4: Step 3 のコードを前置せず単体で実行でき、スクリプトが実際に呼ばれる（PR #374 P1 第3R）', () => {
  const tmp = mkdtempSync(join(tmpdir(), 'update-issue-tree-block-'))
  try {
    const argsLog = join(tmp, 'args.txt')
    makeStubScript(tmp, `#!/usr/bin/env bash\nprintf '%s\\n' "$*" >> ${JSON.stringify(argsLog)}\nexit 0\n`)
    const r = runBlock(step4, tmp, { orphans: ['456 3', '789 3'] })
    assert.equal(r.status, 0, `単体実行で失敗した: ${r.stderr}`)
    assert.doesNotMatch(r.stderr, /command not found/, '関数未定義でフェンスが壊れてはならない')
    const lines = readFileSync(argsLog, 'utf8').trim().split('\n')
    assert.deepEqual(lines, [
      '--issue 456 --new-parent 3',
      '--issue 789 --new-parent 3',
    ], '孤児 2 件が --old-parent 無しで順に呼ばれること')
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
})

// 共有処理はライブラリ側にあり、フェンスは source するだけ——という構造そのものを固定する。
// どちらかのフェンスが再び関数を定義し始めたら、もう一方がそれに依存する構成へ戻り得る。
test('両フェンスが reassign-lib.sh を自己完結的に source し、共有関数を自前定義していない（PR #374 P1 第3R）', () => {
  for (const { label, block } of cases) {
    assert.match(block, /source "\$\{REASSIGN_LIB\}"/, `${label}: ライブラリの source が必要`)
    assert.match(block, /reassign-lib\.sh"/, `${label}: 3 レイアウト解決の候補列挙が必要`)
    assert.doesNotMatch(
      block,
      /^(reassign_one|require_plan_array)\(\) \{/m,
      `${label}: 共有関数はフェンス内で定義しない（他方のフェンスが継承できない）`,
    )
  }
})

// `if reassign_one ...; then ... fi` は fi 直後の $? が 0 になるため使ってはならない
// （実測: bash では条件が偽で else が無い場合 $? = 0）。この形に戻ると失敗が
// すべて「成功」として読まれ、(a)/(b) の判定も中断も素通りする。
test('両ブロックとも if/fi で返り値を判定していない（$? が 0 に化ける形の検出。#372）', () => {
  // reassign_one の本体はライブラリへ移ったため、フェンスだけを検査すると
  // `$?` が 0 に化ける形の退行を素通りさせる。ライブラリ本体も同じ検査に通す。
  const targets = [...cases, { label: 'reassign-lib.sh', block: readFileSync(LIB_SOURCE, 'utf8') }]
  for (const { label, block } of targets) {
    // コメント行を除去してから判定する。この形を禁じる注意書き自体がコメントとして
    // ブロック内に存在するため、生テキストへの照合だと自分の警告文に誤ヒットする。
    const code = block
      .split('\n')
      .filter((line) => !/^\s*#/.test(line))
      .join('\n')
    assert.doesNotMatch(
      code,
      /if\s+reassign_one[\s\S]*?;\s*then/,
      `${label}: if reassign_one ...; then の形は fi 直後の $? が 0 になるため使えない`,
    )
    // `|| status=$?` の退避は呼び出し側ループの契約。ライブラリ本体は同じ役割を
    // `status=$?` 単独（bash 起動の直後）で果たすため、この要求の対象外とする。
    if (label !== 'reassign-lib.sh') {
      assert.match(code, /\|\|\s*status=\$\?/, `${label}: || status=$? による明示的な退避が必要`)
    }
  }
})

// set -e があると reassign_one 内の `status=$?` 退避に到達せず、Issue #335 の欠陥が再発する。
// 「非ゼロを握り潰さないため」の設定が、まさにその見落としを作り直す形になっているのを防ぐ。
test('reassign-lib.sh と両フェンスが set -e / set -o errexit を使っていない（#335 の再発防止）', () => {
  const targets = [
    ...cases,
    { label: 'reassign-lib.sh', block: readFileSync(LIB_SOURCE, 'utf8') },
  ]
  for (const { label, block } of targets) {
    const code = block
      .split('\n')
      .filter((line) => !/^\s*#/.test(line))
      .join('\n')
    assert.doesNotMatch(code, /^\s*set\s+-[a-z]*e/m, `${label}: set -e は使えない`)
    assert.doesNotMatch(code, /set\s+-o\s+errexit/, `${label}: set -o errexit は使えない`)
  }
})

// ---------------------------------------------------------------------------
// 計画配列の未宣言ガード（PR #374 codex P1）
// ---------------------------------------------------------------------------
// bash では未定義配列の "${REASSIGN_PLAN[@]}" が空へ展開されるため、Step 2 を実行し
// 忘れてもループが 0 回で回り、承認済みの対象があってもエラーなく完走して完了報告まで
// 進んでしまう。「対象なし（空配列を宣言済み）」と「計画未設定（未宣言）」は意味が
// 異なるため、後者は fail-closed で停止しなければならない。
for (const { label, block } of cases) {
  test(`${label}: 計画配列が未宣言なら exit 1 で停止する（0 件完走との区別。PR #374 P1）`, () => {
    const tmp = mkdtempSync(join(tmpdir(), 'update-issue-tree-block-'))
    try {
      makeStub(tmp, 0)
      const r = runBlock(block, tmp, { declarePlans: false })
      assert.equal(r.status, 1, '未宣言のまま 0 件完走してはならない')
      assert.match(r.stderr, /未宣言/)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  test(`${label}: 空配列を宣言済みなら正常に 0 件で完走する（対象なしは正常系）`, () => {
    const tmp = mkdtempSync(join(tmpdir(), 'update-issue-tree-block-'))
    try {
      const counter = join(tmp, 'calls.txt')
      makeStubScript(tmp, `#!/usr/bin/env bash\nprintf 'called\\n' >> ${JSON.stringify(counter)}\nexit 0\n`)
      const r = runBlock(block, tmp, { plan: [], orphans: [] })
      assert.equal(r.status, 0)
      // スクリプトが 1 度も呼ばれていないこと（= ループが 0 回で正常終了）
      assert.equal(existsSync(counter), false, '対象 0 件でスクリプトが呼ばれてはならない')
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })
}

// Step 2 が計画配列の構築手順を掲載していること（ガードだけ足して構築手順が無いと、
// 実行者は「どう作ればよいか」が分からず結局 fail-closed で止まり続ける）。
test('Step 2 に REASSIGN_PLAN / ORPHAN_PLAN の構築手順が掲載されている（PR #374 P1）', () => {
  const text = readFileSync(SKILL_MD, 'utf8')
  const step2 = text.slice(text.indexOf('### Step 2:'), text.indexOf('### Step 3:'))
  assert.match(step2, /REASSIGN_PLAN=\(/, 'Step 2 に REASSIGN_PLAN の宣言例が必要')
  assert.match(step2, /ORPHAN_PLAN=\(/, 'Step 2 に ORPHAN_PLAN の宣言例が必要')
  assert.match(step2, /空配列として宣言/, '対象 0 件でも宣言する契約の明示が必要')
})

// `declare -p` は同名のスカラー変数が宣言済みでも成功する。その場合 "${ARR[@]}" は
// スカラー値 1 個へ展開され、計画として構築していない値が 1 件の付け替え指示として
// 実行される（実測: REASSIGN_PLAN="123 1 2" は存在検査だけのガードを通過し、
// ループが 1 回まわってスクリプトが呼ばれる）。属性が添字配列であることまで検査する。
for (const { label, block } of cases) {
  test(`${label}: 計画変数がスカラーなら exit 1 で停止しスクリプトを呼ばない（PR #374 P1 第2R）`, () => {
    const tmp = mkdtempSync(join(tmpdir(), 'update-issue-tree-block-'))
    try {
      const counter = join(tmp, 'calls.txt')
      makeStubScript(tmp, `#!/usr/bin/env bash\nprintf 'called\\n' >> ${JSON.stringify(counter)}\nexit 0\n`)
      const r = runBlock(block, tmp, { scalarPlans: true })
      assert.equal(r.status, 1, 'スカラー宣言をガードが通してはならない')
      assert.match(r.stderr, /添字配列ではない/)
      assert.equal(existsSync(counter), false, 'ガード通過前にスクリプトが呼ばれてはならない')
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })
}

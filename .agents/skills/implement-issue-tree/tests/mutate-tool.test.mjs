// tests/tools/mutate.mjs（変異テストの実行器）と同梱の変異定義の最小限の回帰テスト（Issue #603）。
//   - 置換の数え方・当て方・再ビルド要否・定義の形式検査（純関数）
//   - 同梱の定義は、置換前の文字列が対象ファイルにちょうど 1 か所だけ当たる（実装を変えて定義が腐ったら赤にする）
//   - 実際に作業コピー上で killed / survived / invalid を判定し、作業ツリーを書き換えない
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { trackTmp } from './lib/tmp-track.mjs'
import { applyMutation, countOccurrences, needsRebuild, parseSpecOutput, runMutation, validateDefinitions } from './tools/mutate.mjs'
import { hangSeconds } from './lib/run-async.mjs'
import { MUTATIONS } from './tools/mutations.mjs'

const SKILL = join(dirname(fileURLToPath(import.meta.url)), '..')
const TOOL = join(SKILL, 'tests', 'tools', 'mutate.mjs')

test('countOccurrences / applyMutation: 置換はちょうど 1 か所に当たるときだけ当てる（0 か所・2 か所以上は当てない）', () => {
  assert.equal(countOccurrences('abcabc', 'bc'), 2)
  assert.equal(countOccurrences('aaa', 'aa'), 1, '重ならない出現だけを数える')
  assert.equal(countOccurrences('abc', ''), 0)
  assert.deepEqual(applyMutation('x=1 y=2', 'y=2', 'y=3'), { ok: true, text: 'x=1 y=3' })
  assert.equal(applyMutation('x=1', 'z', 'w').ok, false)
  assert.equal(applyMutation('x x', 'x', 'y').ok, false)
  // 置換後の文字列は特殊パターン（$& など）として解釈しない
  assert.equal(applyMutation('a', 'a', '$&$&').text, '$&$&')
})

test('needsRebuild: スクリプト（.sh・.src.js・build-workflow.mjs）を変えたときだけ再ビルドする。明示指定が優先', () => {
  assert.equal(needsRebuild({ file: 'scripts/base-merge.sh' }), true)
  assert.equal(needsRebuild({ file: 'scripts/lib/push-verify.sh' }), true)
  assert.equal(needsRebuild({ file: 'scripts/implement-issue-tree.src.js' }), true)
  assert.equal(needsRebuild({ file: 'scripts/build-workflow.mjs' }), true)
  assert.equal(needsRebuild({ file: 'SKILL.md' }), false)
  assert.equal(needsRebuild({ file: 'scripts/base-merge.sh', rebuild: false }), false)
  assert.equal(needsRebuild({ file: 'SKILL.md', rebuild: true }), true)
})

test('validateDefinitions: 配列でない・必須項目の欠け・from と to が同じ・tests が空・パスの脱出・id の重複を報告する', () => {
  const ok = { id: 'a', file: 'x', from: '1', to: '2', tests: ['t.test.mjs'] }
  assert.deepEqual(validateDefinitions([ok]), [])
  assert.notDeepEqual(validateDefinitions({}), [])
  assert.ok(validateDefinitions([{ ...ok, to: '1' }]).some((p) => /同じ/.test(p)))
  assert.ok(validateDefinitions([{ ...ok, tests: [] }]).some((p) => /tests/.test(p)))
  assert.ok(validateDefinitions([{ ...ok, tests: ['../x.test.mjs'] }]).some((p) => /tests/.test(p)))
  assert.ok(validateDefinitions([{ ...ok, file: '../x' }]).some((p) => /file/.test(p)))
  assert.ok(validateDefinitions([ok, ok]).some((p) => /重複/.test(p)))
  assert.ok(validateDefinitions([{ id: 'b' }]).length > 0)
})

test('同梱の変異定義: 形式が正しく、置換前の文字列が対象ファイルにちょうど 1 か所だけ当たり、流すテストが実在する', () => {
  assert.deepEqual(validateDefinitions(MUTATIONS), [])
  assert.ok(MUTATIONS.length >= 10, `定義が減っている: ${MUTATIONS.length}`)
  const bad = []
  for (const m of MUTATIONS) {
    const n = countOccurrences(readFileSync(join(SKILL, m.file), 'utf8'), m.from)
    if (n !== 1) bad.push(`${m.id}: ${m.file} に ${n} か所`)
    for (const t of m.tests) {
      try {
        readFileSync(join(SKILL, 'tests', t), 'utf8')
      } catch {
        bad.push(`${m.id}: テストファイルが無い ${t}`)
      }
    }
  }
  assert.deepEqual(bad, [])
})

test('--list は同梱の定義の id を 1 行ずつ出す。未知の引数・未知の id は exit 2', () => {
  const list = spawnSync(process.execPath, [TOOL, '--list'], { encoding: 'utf8' })
  assert.equal(list.status, 0, list.stderr)
  assert.deepEqual(list.stdout.split('\n').filter(Boolean).map((l) => l.split('\t')[0]), MUTATIONS.map((m) => m.id))
  assert.equal(spawnSync(process.execPath, [TOOL, '--bogus'], { encoding: 'utf8' }).status, 2)
  assert.equal(spawnSync(process.execPath, [TOOL], { encoding: 'utf8' }).status, 2)
  assert.equal(spawnSync(process.execPath, [TOOL, '--run', 'no-such-id'], { encoding: 'utf8' }).status, 2)
})

test('--run: 作業コピー上で killed / survived / invalid を判定し、作業ツリーを書き換えない（exit 1: survived・invalid あり）', () => {
  const RUN_VERIFIED = join(SKILL, 'scripts', 'run-verified.sh')
  const before = readFileSync(RUN_VERIFIED, 'utf8')
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-mutate-test-')))
  const def = join(dir, 'defs.mjs')
  const tests = ['script-launcher.test.mjs']
  writeFileSync(def, `export const MUTATIONS = ${JSON.stringify([
    // ハッシュ不一致でも起動する → ランチャーのテストが赤になる
    { id: 'T-killed', file: 'scripts/run-verified.sh', from: 'if [ "${actual}" != "${expected}" ]; then', to: 'if [ "${actual}" = "${expected}" ]; then', tests, rebuild: false },
    // コメントだけの変更 → 緑のまま（検査が見逃すのではなく、挙動が変わらない変更）
    { id: 'T-survived', file: 'scripts/run-verified.sh', from: '# 終了コード:', to: '# 終了コード（注記）:', tests, rebuild: false },
    { id: 'T-invalid', file: 'scripts/run-verified.sh', from: 'この文字列はどこにも無い', to: 'x', tests, rebuild: false },
  ])}\n`)
  const r = spawnSync(process.execPath, [TOOL, '--def', def, '--run', 'all', '--jobs', '3'], { encoding: 'utf8' })
  assert.equal(r.status, 1, r.stdout + r.stderr)
  assert.match(r.stdout, /KILLED\s+T-killed \(by: tests\)/)
  assert.match(r.stdout, /SURVIVED T-survived/)
  assert.match(r.stdout, /INVALID\s+T-invalid .*0 か所/)
  assert.match(r.stdout, /killed 1 \/ survived 1 \/ invalid 1/)
  assert.equal(readFileSync(RUN_VERIFIED, 'utf8'), before, '作業ツリーのスクリプトは書き換えない')
  // 全部 killed なら exit 0
  const only = spawnSync(process.execPath, [TOOL, '--def', def, '--run', 'T-killed'], { encoding: 'utf8' })
  assert.equal(only.status, 0, only.stdout + only.stderr)
})

// ---- 判定の境界（実際に小さなスキルのコピー上で runMutation を走らせる。実時間は期限のテストの 1 秒前後だけ）----
// files = { 'tests/x.test.mjs': 本文 }。対象ファイル target.txt は 'a' を 'b' に置換できる
function fakeSkill(files) {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-mutate-fake-')))
  const skill = join(dir, 'skill')
  mkdirSync(join(skill, 'tests'), { recursive: true })
  writeFileSync(join(skill, 'target.txt'), 'a\n')
  for (const [name, body] of Object.entries(files)) writeFileSync(join(skill, name), body)
  return skill
}
const mut = (test) => ({ id: 'F', file: 'target.txt', from: 'a', to: 'b', tests: [test] })
const FAIL2 = "import { test } from 'node:test'\ntest('one', () => { throw new Error('x') })\ntest('two', () => { throw new Error('y') })\n"

test('parseSpecOutput: 失敗した名前は failing tests 節の前だけから取り、件数は要約の fail から読む（節の中の同じ行を 2 重に数えない）', () => {
  const out = ['✖ one (1.2ms)', '✖ two (0.5ms)', 'ℹ tests 2', 'ℹ pass 0', 'ℹ fail 2', '', '✖ failing tests:', '', 'test at a.test.mjs:2:1', '✖ one (1.2ms)', '  Error: x', 'test at a.test.mjs:3:1', '✖ two (0.5ms)'].join('\n')
  assert.deepEqual(parseSpecOutput(out), { names: ['one', 'two'], fail: 2, pass: 0 })
  assert.deepEqual(parseSpecOutput('なし'), { names: [], fail: null, pass: null })
})

test('runMutation: 赤は killed で「赤 N 件」を 1 回だけ数える。子が signal で終了したら invalid。実行テスト 0 件（全 skip・0 件登録）は invalid、1 件以上通れば survived', async () => {
  const skill = fakeSkill({
    'tests/red.test.mjs': FAIL2,
    // テストランナー（この子の親）を SIGKILL する = ランナーが signal で終了し status が null になる
    'tests/sig.test.mjs': "import { test } from 'node:test'\ntest('kill runner', () => { process.kill(process.ppid, 'SIGKILL') })\n",
    'tests/skip.test.mjs': "import { test } from 'node:test'\ntest('s', { skip: true }, () => {})\n",
    'tests/empty.test.mjs': '// 登録なし\n',
    'tests/green.test.mjs': "import { test } from 'node:test'\ntest('ok', () => {})\ntest('s', { skip: true }, () => {})\n",
  })
  const red = await runMutation(mut('red.test.mjs'), { skillDir: skill })
  assert.equal(red.status, 'killed')
  assert.match(red.detail, /^赤 2 件: one \/ two$/, '失敗 2 件を 4 件と数えない')
  const sig = await runMutation(mut('sig.test.mjs'), { skillDir: skill })
  assert.equal(sig.status, 'invalid')
  assert.match(sig.detail, /signal SIGKILL/)
  for (const f of ['skip.test.mjs', 'empty.test.mjs']) {
    const r = await runMutation(mut(f), { skillDir: skill })
    assert.equal(r.status, 'invalid', f)
    assert.match(r.detail, /0 件/, f)
  }
  assert.equal((await runMutation(mut('green.test.mjs'), { skillDir: skill })).status, 'survived')
})

test('runMutation: 期限（timeoutSec）を超えたら子プロセス群を止めて killed (by: timeout)。ハングする孫の sleep を残さない', async () => {
  const hang = hangSeconds(5, 0)
  const skill = fakeSkill({
    'tests/hang.test.mjs': `import { test } from 'node:test'\nimport { spawn } from 'node:child_process'\ntest('hang', async () => {\n  spawn('sleep', ['${hang}'], { stdio: 'inherit' })\n  await new Promise((r) => setTimeout(r, 600000))\n})\n`,
  })
  const t0 = Date.now()
  const r = await runMutation(mut('hang.test.mjs'), { skillDir: skill, timeoutSec: 1 })
  const elapsed = (Date.now() - t0) / 1000
  assert.equal(r.status, 'killed')
  assert.equal(r.by, 'timeout')
  assert.ok(elapsed < 30, `期限 1 秒のあとすぐ返る: ${elapsed}s`)
  const ps = spawnSync('ps', ['-axo', 'command'], { encoding: 'utf8' })
  if (ps.status === 0) assert.equal(ps.stdout.split('\n').filter((l) => new RegExp(`\\bsleep ${hang}\\b`).test(l)).length, 0, '孫の sleep が残っていない')
})

test('--timeout は 1 以上の整数（秒）だけ受け付ける', () => {
  for (const bad of ['0', 'abc', '-1', '1.5']) assert.equal(spawnSync(process.execPath, [TOOL, '--list', '--timeout', bad], { encoding: 'utf8' }).status, 2, bad)
  assert.equal(spawnSync(process.execPath, [TOOL, '--list', '--timeout', '5'], { encoding: 'utf8' }).status, 0)
})

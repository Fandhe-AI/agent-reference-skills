// 依存抽出の起動行の入力の束縛（監査 M-1）の結合テスト: ホスト（実装スクリプト全体を stub agent で実行）が起動行へ付ける
// --input-sha256 を、実際の scripts/declared-deps.sh が受け理由なく通すこと（ホストとスクリプトの正準文字列が同じ定義であること）と、
// 起動行の引数を 1 つ書き換えるとスクリプトが gh を呼ばずに INPUT_MISMATCH で拒否することを確かめる。
// gh は常に失敗する偽物（呼ばれた回数を記録）。通ったかどうかは終了コード 0（FAILED #N は出る）と INPUT_MISMATCH の有無で判別する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { trackTmp } from './lib/tmp-track.mjs'
import { availableBashes } from './lib/signed-output.mjs'
import { runScript, BASE_ARGS } from './lib/stub-run.mjs'

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'declared-deps.sh')

const node = (number, parent, title) => ({ number, title, state: 'open', parent, siblingIndex: number, dependsOn: [], subIssuesTotal: 0 })
const TREE = [
  { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: 1 },
  { number: 10, title: 'phase', state: 'open', parent: 1, siblingIndex: 0, dependsOn: [], subIssuesTotal: 2 },
  node(11, 10, 'TASK-1-1: 最初'),
  node(12, 10, 'TASK-1-2: 次'),
]

async function hostCommand(args) {
  const { calls } = await runScript({ args, leaves: [], override: (label) => (label === 'plan:issue-tree' ? { nodes: structuredClone(TREE) } : undefined) })
  const prompt = calls.find((c) => c.opts.label === 'plan:declared-deps-1')?.prompt
  assert.ok(prompt, '依存抽出のエージェントが起動する')
  const line = prompt.split('\n').find((l) => l.includes('declared-deps.sh --numbers'))
  const m = /declared-deps\.sh --numbers (\S+)(?: --repo (\S+))?(?: --table '([^']*)')? --input-sha256 (\S+)$/.exec(line)
  assert.ok(m, `起動行の形: ${line}`)
  return { numbers: m[1], repo: m[2] ?? null, table: m[3] ?? null, sha: m[4] }
}

function makeFailingGh() {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-dd-bind-')))
  const bin = join(dir, 'bin')
  mkdirSync(bin)
  writeFileSync(join(bin, 'gh'), '#!/bin/sh\necho x >> "$GH_STUB_DIR/calls.log"\nexit 1\n')
  chmodSync(join(bin, 'gh'), 0o755)
  return {
    env: { PATH: `${bin}:${process.env.PATH}`, GH_STUB_DIR: dir, HOME: dir },
    calls: () => (existsSync(join(dir, 'calls.log')) ? readFileSync(join(dir, 'calls.log'), 'utf8').split('\n').filter(Boolean).length : 0),
  }
}

const argvOf = (c, over = {}) => {
  const a = { ...c, ...over }
  return [SCRIPT, '--numbers', a.numbers, ...(a.repo === null ? [] : ['--repo', a.repo]), ...(a.table === null ? [] : ['--table', a.table]), ...(a.sha === null ? [] : ['--input-sha256', a.sha])]
}

for (const bash of availableBashes()) {
  const label = (n) => `[${bash}] ${n}`

  for (const [name, args] of [['--repo あり・表あり', { ...BASE_ARGS, repo: 'o/r' }], ['--repo なし・表あり', { ...BASE_ARGS }]]) {
    test(label(`ホストが付けた起動行はスクリプトに通り、1 つ書き換えると gh を呼ばずに拒否される（${name}）`), async () => {
      const c = await hostCommand(args)
      assert.ok(c.table !== null, '兄弟のタスク ID がある木は表を付ける')
      assert.equal(c.repo, args.repo ?? null)
      assert.match(c.sha, /^[0-9a-f]{64}$/)
      const gh = makeFailingGh()
      const ok = spawnSync(bash, argvOf(c), { env: gh.env, encoding: 'utf8' })
      assert.equal(ok.status, 0, ok.stderr)
      assert.doesNotMatch(ok.stderr, /INPUT_MISMATCH/)
      const first = gh.calls()
      assert.ok(first >= 1, '通れば gh を呼ぶ（偽 gh は FAILED を返す）')

      const tampered = {
        '表のエントリの欠落': { table: c.table.replace(/\["TASK-1-2",12\]/, '').replace(',]', ']').replace('[,', '[') },
        '表の省略': { table: null },
        '番号の欠落': { numbers: c.numbers.split(',').slice(1).join(',') },
        '1 文字違いのハッシュ': { sha: c.sha.slice(0, -1) + (c.sha.endsWith('0') ? '1' : '0') },
        'ハッシュの欠落': { sha: null },
        ...(c.repo === null ? { 'repo の追加': { repo: 'o/r' } } : { 'repo の欠落': { repo: null } }),
      }
      for (const [what, over] of Object.entries(tampered)) {
        const r = spawnSync(bash, argvOf(c, over), { env: gh.env, encoding: 'utf8' })
        assert.equal(r.status, 2, `${what}: ${r.stderr}`)
        assert.match(r.stderr, /INPUT_MISMATCH/, what)
        assert.equal(gh.calls(), first, `${what}: gh を呼ばない`)
      }
    })
  }
}

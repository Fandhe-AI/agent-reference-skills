// reassign-sub-issue.test.mjs — Issue #297 対応の決定的回帰テスト。
// 先行 PR #295（blocked）で codex に指摘された 4 弱点への直接的な回答:
//   1. 変数の初期化と参照が別コードフェンスに分かれる → 単一プロセスのスクリプトで検証可能に
//   2. DELETE 失敗検知なしに POST へ進む → ケース 6 で「POST が 1 件も呼ばれない」ことを実測
//   3. 冪等性判定が実行より 1 巡遅れる → ケース 3 で DELETE/POST 双方が呼ばれないことを実測
//   4. 事後確認のスナップショット汚染 → 事前 GET と事後 GET を呼び出しログで区別して検証
//
// 実 API には触れず、tests/lib/gh-stub.mjs が生成する差し替え gh をスクリプトへ渡す。
// スクリプトは exec ビット + shebang 経由でパス直接実行する（bash 経由のラップはしない）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createGhStub } from './lib/gh-stub.mjs'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'reassign-sub-issue.sh',
)

function run(args, fixture) {
  const stub = createGhStub(fixture)
  let status = 0
  let stdout = ''
  let stderr = ''
  try {
    stdout = execFileSync(SCRIPT_PATH, args, {
      env: { ...process.env, ...stub.env },
      encoding: 'utf8',
    })
  } catch (err) {
    status = err.status ?? 1
    stdout = err.stdout ?? ''
    stderr = err.stderr ?? ''
  }
  return { status, stdout, stderr, logPath: stub.logPath }
}

function calls(logPath) {
  if (!existsSync(logPath)) return []
  return readFileSync(logPath, 'utf8').trim().split('\n').filter(Boolean)
}

test('ケース1: 引数なし → exit 1、API 呼び出しゼロ', () => {
  const r = run([], {})
  assert.equal(r.status, 1)
  assert.deepEqual(calls(r.logPath), [])
})

test('ケース2: issue 番号に非数値（インジェクション試行）→ exit 1、API 呼び出しゼロ', () => {
  const r = run(['--issue', '12; rm -rf /', '--new-parent', '1'], {})
  assert.equal(r.status, 1)
  assert.deepEqual(calls(r.logPath), [])
})

test('ケース2b: --repo に不正な形式 → exit 1、API 呼び出しゼロ', () => {
  const r = run(['--issue', '1', '--new-parent', '2', '--repo', 'not a repo'], {})
  assert.equal(r.status, 1)
  assert.deepEqual(calls(r.logPath), [])
})

test('ケース3: 既に新親配下（already-attached）→ exit 0、DELETE も POST も呼ばれない', () => {
  const r = run(['--issue', '10', '--old-parent', '5', '--new-parent', '7'], {
    parentBefore: '7',
  })
  assert.equal(r.status, 0)
  assert.match(r.stdout.trim(), /^result=already-attached issue=10 new_parent=7 old_parent=7$/)
  const c = calls(r.logPath)
  assert.ok(!c.some((l) => l.includes('--method DELETE')), 'DELETE が呼ばれていないこと')
  assert.ok(!c.some((l) => l.includes('--method POST')), 'POST が呼ばれていないこと')
})

test('ケース4: 孤児（--old-parent 省略）→ exit 0 posted-only、POST のみ・DELETE なし', () => {
  const r = run(['--issue', '11', '--new-parent', '7'], {
    parentBefore: '',
    parentAfter: '7',
  })
  assert.equal(r.status, 0)
  assert.match(r.stdout.trim(), /^result=posted-only issue=11 new_parent=7 old_parent=-$/)
  const c = calls(r.logPath)
  assert.ok(!c.some((l) => l.includes('--method DELETE')), 'DELETE が呼ばれていないこと')
  assert.ok(c.some((l) => l.includes('--method POST')), 'POST が呼ばれていること')
})

test('ケース5: 正常な付け替え → exit 0 reassigned、呼び出し順が GET→GET(新親)→DELETE→POST→GET', () => {
  const r = run(['--issue', '12', '--old-parent', '5', '--new-parent', '7'], {
    parentBefore: '5',
    parentAfter: '7',
  })
  assert.equal(r.status, 0)
  assert.match(r.stdout.trim(), /^result=reassigned issue=12 new_parent=7 old_parent=5$/)
  const c = calls(r.logPath).filter((l) => l.startsWith('api'))
  const kinds = c.map((l) => {
    if (l.includes('--method DELETE')) return 'DELETE'
    if (l.includes('--method POST')) return 'POST'
    return 'GET'
  })
  // 2 件目の GET が Issue #333 で追加した新親の事前検証（DELETE の前に撃つ）
  assert.deepEqual(kinds, ['GET', 'GET', 'DELETE', 'POST', 'GET'])
})

test('ケース6: DELETE が非ゼロ（404） → exit 3、POST は 1 件も呼ばれない（受入条件の核）', () => {
  const r = run(['--issue', '13', '--old-parent', '5', '--new-parent', '7'], {
    parentBefore: '5',
    deleteExit: 1,
    deleteBody: '404 Not Found',
  })
  assert.equal(r.status, 3)
  const c = calls(r.logPath)
  assert.ok(c.some((l) => l.includes('--method DELETE')), 'DELETE は呼ばれていること')
  assert.ok(!c.some((l) => l.includes('--method POST')), 'POST は 1 件も呼ばれていないこと')
})

test('ケース7: POST が非ゼロ（一般エラー） → exit 4', () => {
  const r = run(['--issue', '14', '--old-parent', '5', '--new-parent', '7'], {
    parentBefore: '5',
    postExit: 1,
    postBody: '500 Internal Server Error',
  })
  assert.equal(r.status, 4)
})

test('ケース8: 事後確認 GET で対象が新親配下に見えない → exit 5', () => {
  const r = run(['--issue', '15', '--old-parent', '5', '--new-parent', '7'], {
    parentBefore: '5',
    parentAfter: '5', // POST は成功したことにするがスタブ上は親が変わっていない体
  })
  assert.equal(r.status, 5)
})

test('ケース9: 事前 GET 自体が失敗（前提不備）→ exit 2', () => {
  const r = run(['--issue', '16', '--new-parent', '7'], {
    getFail: true,
  })
  assert.equal(r.status, 2)
})

test('ケース10: DELETE 後の POST が "only have one parent" → exit 8（部分変更を無変更と誤認させない）', () => {
  // DELETE は成功しているため旧親からは外れている。無変更を意味する exit 6 / 7 と
  // 同じコードにすると、呼び出し側が「触っていない」と誤認して復旧を誤る（PR #314 Bugbot Medium）
  const r = run(['--issue', '17', '--old-parent', '5', '--new-parent', '7'], {
    parentBefore: '5',
    postExit: 1,
    postBody: 'Validation Failed: Sub issue may only have one parent',
  })
  assert.equal(r.status, 8)
  const c = calls(r.logPath)
  assert.ok(c.some((l) => l.includes('--method DELETE')), 'DELETE は実行済みであること')
})

test('ケース15: 孤児経路の POST が "only have one parent" → exit 7（DELETE 未実行で無変更）', () => {
  // 事前実測では孤児だったが POST 時点で別の親が付いていたレース。DELETE を 1 度も
  // 撃っていないためツリーは無変更であり、exit 8（部分変更）とは復旧手順が異なる
  const r = run(['--issue', '21', '--new-parent', '7'], {
    parentBefore: '',
    postExit: 1,
    postBody: 'Validation Failed: Sub issue may only have one parent',
  })
  assert.equal(r.status, 7)
  const c = calls(r.logPath)
  assert.ok(!c.some((l) => l.includes('--method DELETE')), 'DELETE が 1 件も呼ばれていないこと')
})

test('ケース16: 親が別リポジトリ → exit 2、DELETE も POST も呼ばれない', () => {
  // sub-issue はリポジトリを跨いで紐付けられる。番号だけを見ると本リポ宛の DELETE を
  // 撃って失敗する（PR #314 codex P1）
  const r = run(['--issue', '22', '--old-parent', '5', '--new-parent', '7'], {
    parentBefore: '5',
    parentRepo: 'other/repo',
  })
  assert.equal(r.status, 2)
  const c = calls(r.logPath)
  assert.ok(!c.some((l) => l.includes('--method DELETE')), 'DELETE が呼ばれていないこと')
  assert.ok(!c.some((l) => l.includes('--method POST')), 'POST が呼ばれていないこと')
})

test('ケース16c: 親が別リポジトリ → stderr に reason=cross-repository-parent マーカーが出る（Issue #335 codex-review 指摘の再発防止固定）', () => {
  // exit 2 は gh/jq 不在・未認証・issue 取得失敗（解消可能な前提不備）とも共有するため、
  // このケース（恒久的に対象外）だけを終了コード単独では区別できない。呼び出し側が
  // SKILL.md の記述どおり (a)/(b) を機械的に判定できるよう、安定したマーカー行を固定する
  const r = run(['--issue', '22', '--old-parent', '5', '--new-parent', '7'], {
    parentBefore: '5',
    parentRepo: 'other/repo',
  })
  assert.equal(r.status, 2)
  assert.ok(
    /^reason=cross-repository-parent$/m.test(r.stderr),
    'stderr に reason=cross-repository-parent マーカー行があること',
  )
})

test('ケース9/ケース11: 解消可能な前提不備（exit 2 (a)）では reason=cross-repository-parent マーカーが出ない', () => {
  // (b) 専用マーカーが (a) 側へ誤って漏れると、呼び出し側が恒久的な対象外と誤判定し
  // 棚卸し対象から不要に除外してしまう
  const r = run(['--issue', '22', '--new-parent', '7'], { getFail: true })
  assert.equal(r.status, 2)
  assert.ok(
    !/reason=cross-repository-parent/.test(r.stderr),
    '解消可能な前提不備で cross-repository 専用マーカーが出ていないこと',
  )
})

test('ケース16b: 親が別リポジトリで停止する際、stderr が --repo の付け替えを勧めていない（Issue #332 / PR #314 P0 の再発防止固定）', () => {
  // c4c27b9 で「--repo を親リポジトリへ変えて再実行する」という危険な案内を削除した。
  // 将来の善意の編集でこの案内が復活しないよう、stderr に --repo が出現しないことを固定する
  const r = run(['--issue', '22', '--old-parent', '5', '--new-parent', '7'], {
    parentBefore: '5',
    parentRepo: 'other/repo',
  })
  assert.equal(r.status, 2)
  assert.ok(!/--repo/.test(r.stderr), 'stderr が --repo の付け替えを勧めていないこと')
})

test('ケース17: 別リポの親の番号が --new-parent と一致しても already-attached と誤判定しない', () => {
  // 別リポの #7 配下にあるだけで、本リポの #7 には付いていない
  const r = run(['--issue', '23', '--new-parent', '7'], {
    parentBefore: '7',
    parentRepo: 'other/repo',
  })
  assert.equal(r.status, 2)
  assert.ok(!r.stdout.includes('already-attached'), 'already-attached を返していないこと')
})

test('ケース18: 事後確認で親が別リポジトリ → exit 5（成功として報告しない）', () => {
  // POST 後の競合で対象が other/repo の同番号 issue へ移された状況。番号だけを見ると
  // VERIFY_PARENT == NEW_PARENT となり誤ったツリー状態を成功報告する（PR #314 codex P1）
  const r = run(['--issue', '24', '--new-parent', '7'], {
    parentBefore: '',
    parentAfter: '7',
    parentRepoAfter: 'other/repo',
  })
  assert.equal(r.status, 5)
  assert.ok(!r.stdout.includes('result=posted-only'), '成功の result= 行を出していないこと')
})

test('ケース11: gh auth status が非ゼロ → exit 2、API 呼び出し無し', () => {
  const r = run(['--issue', '1', '--new-parent', '2'], {
    authFail: true,
  })
  assert.equal(r.status, 2)
  const c = calls(r.logPath)
  assert.ok(!c.some((l) => l.startsWith('api')), 'auth 失敗後は api 系呼び出しが無いこと')
})

test('ケース12: --old-parent が実測値と食い違う → exit 6 で fail-closed、DELETE も POST も呼ばれない', () => {
  // 実際の現在の親は #9（parentBefore）。呼び出し側は Step 2 で #5 からの付け替えを承認している。
  // #9 は承認されていない親であり、そこから外すと承認外の親子関係を壊すため停止する（PR #314 codex P1）
  const r = run(['--issue', '18', '--old-parent', '5', '--new-parent', '7'], {
    parentBefore: '9',
    parentAfter: '7',
  })
  assert.equal(r.status, 6)
  const c = calls(r.logPath)
  assert.ok(!c.some((l) => l.includes('--method DELETE')), 'DELETE が 1 件も呼ばれていないこと')
  assert.ok(!c.some((l) => l.includes('--method POST')), 'POST が 1 件も呼ばれていないこと')
  // 実測した親を呼び出し側へ提示できること（承認の取り直しに必要）
  assert.match(r.stderr, /#9/)
})

test('ケース13: 孤児として承認されたが実測では親が居る → exit 6 で fail-closed', () => {
  // --old-parent 省略 = 「この issue は孤児である」ことを承認した意味。実測で #9 配下に
  // あるなら、その親子関係は承認されていない
  const r = run(['--issue', '19', '--new-parent', '7'], {
    parentBefore: '9',
    parentAfter: '7',
  })
  assert.equal(r.status, 6)
  const c = calls(r.logPath)
  assert.ok(!c.some((l) => l.includes('--method DELETE')), 'DELETE が 1 件も呼ばれていないこと')
  assert.ok(!c.some((l) => l.includes('--method POST')), 'POST が 1 件も呼ばれていないこと')
  assert.match(r.stderr, /#9/)
})

test('ケース14: --old-parent 指定だが実測は孤児 → 破壊が起きないため続行し posted-only', () => {
  // 承認された操作（#5 から外して #7 へ付ける）の部分集合。DELETE 対象が存在しないだけで
  // 承認外の親子関係は壊れないため、警告のうえ POST のみ実行する
  const r = run(['--issue', '20', '--old-parent', '5', '--new-parent', '7'], {
    parentBefore: '',
    parentAfter: '7',
  })
  assert.equal(r.status, 0)
  assert.match(r.stdout.trim(), /^result=posted-only issue=20 new_parent=7 old_parent=-$/)
  const c = calls(r.logPath)
  assert.ok(!c.some((l) => l.includes('--method DELETE')), 'DELETE が呼ばれていないこと')
  assert.ok(c.some((l) => l.includes('--method POST')), 'POST が呼ばれていること')
})

// --- Issue #333: DELETE 前の --new-parent 事前検証 ---

test('ケース19: --new-parent が --issue と同一（自己参照）→ exit 1、API 呼び出しゼロ', () => {
  const r = run(['--issue', '30', '--new-parent', '30'], {})
  assert.equal(r.status, 1)
  assert.deepEqual(calls(r.logPath), [])
})

test('ケース20: 新親 GET が失敗（存在しない番号）→ exit 2、DELETE も POST も呼ばれない（AC4 の核）', () => {
  const r = run(['--issue', '31', '--old-parent', '5', '--new-parent', '999'], {
    parentBefore: '5',
    newParentGetFail: true,
  })
  assert.equal(r.status, 2)
  const c = calls(r.logPath)
  assert.ok(!c.some((l) => l.includes('--method DELETE')), 'DELETE が 1 件も呼ばれていないこと')
  assert.ok(!c.some((l) => l.includes('--method POST')), 'POST が 1 件も呼ばれていないこと')
})

test('ケース21: 新親が別リポジトリ → exit 2、DELETE も POST も呼ばれない', () => {
  const r = run(['--issue', '32', '--old-parent', '5', '--new-parent', '7'], {
    parentBefore: '5',
    newParentRepo: 'other/repo',
  })
  assert.equal(r.status, 2)
  const c = calls(r.logPath)
  assert.ok(!c.some((l) => l.includes('--method DELETE')), 'DELETE が 1 件も呼ばれていないこと')
  assert.ok(!c.some((l) => l.includes('--method POST')), 'POST が 1 件も呼ばれていないこと')
})

test('ケース22: 孤児経路（--old-parent 省略）で新親 GET が失敗 → exit 2、POST も呼ばれない（経路の非対称が無いこと）', () => {
  const r = run(['--issue', '33', '--new-parent', '999'], {
    parentBefore: '',
    newParentGetFail: true,
  })
  assert.equal(r.status, 2)
  const c = calls(r.logPath)
  assert.ok(!c.some((l) => l.includes('--method DELETE')), 'DELETE が 1 件も呼ばれていないこと')
  assert.ok(!c.some((l) => l.includes('--method POST')), 'POST が 1 件も呼ばれていないこと')
})

test('ケース25: 新親が Pull Request → exit 2、DELETE も POST も呼ばれない', () => {
  // issues API は PR も返す（issue と PR は番号空間を共有する）。存在確認・同一リポジトリ確認
  // だけでは PR を弾けず、DELETE 成功後に POST が失敗して孤児化する。判別は取得済み JSON の
  // `.pull_request` で行うため追加の API 呼び出しは発生しない。
  const r = run(['--issue', '35', '--old-parent', '5', '--new-parent', '77'], {
    parentBefore: '5',
    newParentIsPullRequest: true,
  })
  assert.equal(r.status, 2)
  assert.match(r.stderr, /Pull Request/)
  const c = calls(r.logPath)
  assert.ok(!c.some((l) => l.includes('--method DELETE')), 'DELETE が 1 件も呼ばれていないこと')
  assert.ok(!c.some((l) => l.includes('--method POST')), 'POST が 1 件も呼ばれていないこと')
})

test('ケース26: 孤児経路でも新親が Pull Request → exit 2、POST も呼ばれない（経路の非対称が無いこと）', () => {
  const r = run(['--issue', '36', '--new-parent', '77'], {
    parentBefore: '',
    newParentIsPullRequest: true,
  })
  assert.equal(r.status, 2)
  const c = calls(r.logPath)
  assert.ok(!c.some((l) => l.includes('--method DELETE')), 'DELETE が 1 件も呼ばれていないこと')
  assert.ok(!c.some((l) => l.includes('--method POST')), 'POST が 1 件も呼ばれていないこと')
})

test('ケース27: 新親が通常の issue（.pull_request 無し）なら従来どおり付け替えが成立する（過検知していないこと）', () => {
  const r = run(['--issue', '37', '--old-parent', '5', '--new-parent', '7'], {
    parentBefore: '5',
    parentAfter: '7',
  })
  assert.equal(r.status, 0)
  const c = calls(r.logPath)
  assert.ok(c.some((l) => l.includes('--method DELETE')), 'DELETE が呼ばれていること')
  assert.ok(c.some((l) => l.includes('--method POST')), 'POST が呼ばれていること')
})

test('ケース23: already-attached 経路では新親 GET を追加で撃たない（AC3 の追加コスト回避）', () => {
  const r = run(['--issue', '34', '--old-parent', '5', '--new-parent', '5'], {
    parentBefore: '5',
  })
  assert.equal(r.status, 0)
  assert.match(r.stdout.trim(), /^result=already-attached issue=34 new_parent=5 old_parent=5$/)
  const c = calls(r.logPath).filter((l) => l.startsWith('api'))
  assert.equal(c.length, 1, 'api 呼び出しが GET 1 件のみであること')
})

test('ケース24: 承認不一致（exit 6）経路でも新親 GET を撃たない', () => {
  const r = run(['--issue', '35', '--old-parent', '5', '--new-parent', '7'], {
    parentBefore: '9',
  })
  assert.equal(r.status, 6)
  const c = calls(r.logPath).filter((l) => l.startsWith('api'))
  assert.equal(c.length, 1, 'api 呼び出しが GET 1 件のみであること')
})

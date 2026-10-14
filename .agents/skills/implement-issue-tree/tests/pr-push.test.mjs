// scripts/pr-push.sh を実 git で走らせる回帰テスト（Issue #603 第 4 弾）。prCreatePrompt / fixPrompt に文章で書いていた手順
// （起点の確立・push 前の base 最新化・差分ゼロ確認・push と反映の確認・既存 PR の検出・PR 作成）が、スクリプトに移っても同じ意味を
// 保ち、危険側（stale な base の取り込み・第三者のコミットの採用・コンフリクトのまま push・別ブランチへの push）に倒れないことを固定する。
//
// テストの本体は tests/lib/pr-push-suite.mjs。利用できる bash の 1 つ目についてここで、2 つ目以降は tests/pr-push-alt-bash.test.mjs で
// 登録する（node --test はファイル単位で並列に走るので、bash ごとにファイルを分けると所要が 1 つ分で済む）。
// 判定ロジックの表は tests/pr-push-unit.test.mjs（lib を 1 回の bash 起動で検査）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { availableBashes } from './lib/signed-output.mjs'
import { SCRIPT, registerPrPushTests } from './lib/pr-push-suite.mjs'
import { bundleSha256 } from '../scripts/build-workflow.mjs'

registerPrPushTests(availableBashes()[0])

test('起動コマンドの SCRIPT_SHA256 に pr-push.sh が登録され、ビルダーが埋め込むハッシュは実スクリプト + lib の bundleSha256 と一致する', () => {
  const scripts = dirname(SCRIPT)
  const dist = readFileSync(join(scripts, 'implement-issue-tree.js'), 'utf8')
  assert.ok(dist.includes(`'pr-push.sh':'${bundleSha256(scripts, 'pr-push.sh')}'`), '生成物のハッシュが実スクリプトと一致しない（node build-workflow.mjs で再生成する）')
  assert.ok(existsSync(join(scripts, 'run-verified.sh')))
})

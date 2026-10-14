// scripts/base-merge.sh を実際に実行して確かめる回帰テスト（Issue #603 第 3 弾）。baseMergePrompt に文章で書いていた
// 手順（routing ガード・fetch・checkout・マージ・push 検証）が、スクリプトに移っても同じ意味を保ち、危険側
// （pushed: true の誤報・別リポジトリ / 別ブランチへの push・コンフリクトや hook 拒否のまま push）に倒れないことを固定する。
//
// テストの本体は tests/lib/base-merge-suite.mjs。利用できる bash の 1 つ目（macOS では /bin/bash の 3.2）についてここで、
// 2 つ目（Homebrew の bash 5 など）については tests/base-merge-alt-bash.test.mjs で登録する。node --test はファイル単位で
// 並列に走るので、bash ごとにファイルを分けて所要を半分にしている。bash が 1 つしか無い環境では 2 つ目のファイルは何も登録しない。
// URL・引数の形式の表は tests/base-merge-unit.test.mjs（lib の純関数を 1 回の bash 起動で検査）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { availableBashes } from './lib/signed-output.mjs'
import { RUN_VERIFIED, SCRIPT, registerBaseMergeTests } from './lib/base-merge-suite.mjs'
import { bundleSha256 } from '../scripts/build-workflow.mjs'

registerBaseMergeTests(availableBashes()[0])

test('起動コマンドの SCRIPT_SHA256 に base-merge.sh が登録され、ビルダーが埋め込むハッシュは実スクリプト + lib の bundleSha256 と一致する', () => {
  const scripts = dirname(SCRIPT)
  const dist = readFileSync(join(scripts, 'implement-issue-tree.js'), 'utf8')
  assert.ok(dist.includes(`'base-merge.sh':'${bundleSha256(scripts, 'base-merge.sh')}'`), '生成物のハッシュが実スクリプトと一致しない（node build-workflow.mjs で再生成する）')
  assert.ok(existsSync(RUN_VERIFIED))
})

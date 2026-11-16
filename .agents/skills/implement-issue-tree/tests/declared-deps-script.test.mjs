// scripts/declared-deps.sh を偽 gh で実行する回帰テスト（フィルタの同一性・エスケープの実行・正常系・gh の失敗・引数の誤り・rate_limit・launcher）。
// テストの本体は tests/lib/declared-deps-suite.mjs。利用できる bash の 1 つ目（macOS では /bin/bash の 3.2）についてここで、
// 2 つ目以降は declared-deps-alt-bash.test.mjs で登録する。
import { availableBashes } from './lib/signed-output.mjs'
import { registerDeclaredDepsTests } from './lib/declared-deps-suite.mjs'

registerDeclaredDepsTests(availableBashes()[0])

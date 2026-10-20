// scripts/fetch-tree.sh を偽 gh で実行する回帰テスト（Issue #668）。テストの本体は tests/lib/fetch-tree-suite.mjs。
// 利用できる bash の 1 つ目（macOS では /bin/bash の 3.2）についてここで、2 つ目以降は fetch-tree-alt-bash.test.mjs で登録する。
import { availableBashes } from './lib/signed-output.mjs'
import { registerFetchTreeTests } from './lib/fetch-tree-suite.mjs'

registerFetchTreeTests(availableBashes()[0])

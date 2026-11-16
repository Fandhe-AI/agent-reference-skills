// scripts/repo-scan.sh を偽 gh で実行する回帰テスト。テストの本体は tests/lib/repo-scan-suite.mjs。
// 利用できる bash の 1 つ目（macOS では /bin/bash の 3.2）についてここで、2 つ目以降は repo-scan-alt-bash.test.mjs で登録する。
import { availableBashes } from './lib/signed-output.mjs'
import { registerRepoScanTests } from './lib/repo-scan-suite.mjs'

registerRepoScanTests(availableBashes()[0])

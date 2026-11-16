// tests/repo-scan.test.mjs の 2 つ目以降の bash 版。bash が 1 つだけの環境では何も登録しない。
import { availableBashes } from './lib/signed-output.mjs'
import { registerRepoScanTests } from './lib/repo-scan-suite.mjs'

for (const bash of availableBashes().slice(1)) registerRepoScanTests(bash)

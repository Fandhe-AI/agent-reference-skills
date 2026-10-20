// tests/fetch-tree.test.mjs の 2 つ目以降の bash 版（Issue #668）。bash が 1 つだけの環境では何も登録しない。
import { availableBashes } from './lib/signed-output.mjs'
import { registerFetchTreeTests } from './lib/fetch-tree-suite.mjs'

for (const bash of availableBashes().slice(1)) registerFetchTreeTests(bash)

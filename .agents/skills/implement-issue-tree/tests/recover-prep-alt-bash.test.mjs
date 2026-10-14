// tests/recover-prep.test.mjs の 2 つ目以降の bash 版（Issue #603 第 9 弾）。bash が 1 つだけの環境では何も登録しない。
import { availableBashes } from './lib/signed-output.mjs'
import { registerRecoverPrepTests } from './lib/recover-prep-suite.mjs'

for (const bash of availableBashes().slice(1)) registerRecoverPrepTests(bash)

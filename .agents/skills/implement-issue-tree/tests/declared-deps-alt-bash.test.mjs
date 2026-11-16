// tests/declared-deps-script.test.mjs の 2 つ目以降の bash 版。bash が 1 つだけの環境では何も登録しない。
import { availableBashes } from './lib/signed-output.mjs'
import { registerDeclaredDepsTests } from './lib/declared-deps-suite.mjs'

for (const bash of availableBashes().slice(1)) registerDeclaredDepsTests(bash)

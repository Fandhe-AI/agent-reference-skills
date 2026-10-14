// tests/pr-push.test.mjs の 2 つ目以降の bash 版（Issue #603 第 4 弾）。利用できる bash が 2 つ以上あるとき（macOS の /bin/bash 3.2 と
// Homebrew の bash 5 など）、2 つ目以降の bash で同じテスト一式を走らせる。bash が 1 つだけの環境では何も登録しない。
// テスト本体は tests/lib/pr-push-suite.mjs。
import { availableBashes } from './lib/signed-output.mjs'
import { registerPrPushTests } from './lib/pr-push-suite.mjs'

for (const bash of availableBashes().slice(1)) registerPrPushTests(bash)

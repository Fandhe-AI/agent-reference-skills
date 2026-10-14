// tests/base-merge.test.mjs の 2 つ目の bash 版（Issue #603）。利用できる bash が 2 つ以上あるとき（macOS の /bin/bash 3.2 と
// Homebrew の bash 5 など）、2 つ目以降の bash で同じテスト一式を走らせる。node --test はファイル単位で並列に走るため、
// bash ごとにファイルを分けると全体の所要が bash の数ではなく 1 つ分で済む。bash が 1 つだけの環境では何も登録しない。
// テスト本体は tests/lib/base-merge-suite.mjs。
import { availableBashes } from './lib/signed-output.mjs'
import { registerBaseMergeTests } from './lib/base-merge-suite.mjs'

for (const bash of availableBashes().slice(1)) registerBaseMergeTests(bash)

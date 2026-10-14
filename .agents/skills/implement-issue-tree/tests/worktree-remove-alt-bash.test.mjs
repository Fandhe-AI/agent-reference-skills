// tests/worktree-remove.test.mjs の 2 つ目以降の bash 版（Issue #603 第 7 弾）。bash が 1 つだけの環境では何も登録しない。
import { availableBashes } from './lib/signed-output.mjs'
import { registerWorktreeRemoveTests } from './lib/worktree-remove-suite.mjs'

for (const bash of availableBashes().slice(1)) registerWorktreeRemoveTests(bash)

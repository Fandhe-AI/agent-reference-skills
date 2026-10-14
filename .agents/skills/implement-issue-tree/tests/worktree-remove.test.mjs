// scripts/worktree-remove.sh を実 git で走らせる回帰テスト（Issue #603 第 7 弾）。テストの本体は tests/lib/worktree-remove-suite.mjs。
// 利用できる bash の 1 つ目についてここで、2 つ目以降は tests/worktree-remove-alt-bash.test.mjs で登録する（ファイル単位で並列に走らせる）。
// 判断の表は tests/worktree-remove-unit.test.mjs（lib を 1 回の bash 起動で検査）。
import { availableBashes } from './lib/signed-output.mjs'
import { registerWorktreeRemoveTests } from './lib/worktree-remove-suite.mjs'

registerWorktreeRemoveTests(availableBashes()[0])

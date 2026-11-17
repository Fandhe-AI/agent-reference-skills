// merge-exec の段でマージしてよい対象（契約の req.merge = { prNumber, repo }。監査 e670648 の MEDIUM-8）を決める純関数。
//
// 位置づけ: 汎用の完全一致（guard.mjs の MERGE_EXEC_COMMAND）は PR 番号を問わないため、merge-exec の段のモデルが
// 別の PR 番号・別のリポジトリ（GH_REPO・-R）へ同じ形を向けても hook / plugin を通ってしまう。そこで
//   - PR 番号: agent-host がホストのプロンプト（生成物の mergeExecutePrompt の手順 3）から取る（mergePrNumberOf）。
//   - repo: run.mjs が start 前に gh repo view で 1 回だけ決める。
// アダプタはこの 2 つで許す形を guard.mergeExecCommandFor(prNumber) に絞り、merge 段の子の env に GH_REPO を固定する。
// どちらかを決められないときは allowMerge を false・merge を null にする（fail-closed。マージしないだけで誤った PR は通らない）。

/** GitHub の owner/repo の形（owner は英数字と - で先頭は英数字・repo は英数字と . _ -。. と .. は除く）。 */
export const REPO_SLUG = /^[A-Za-z0-9][A-Za-z0-9-]{0,38}\/(?!\.\.?$)[A-Za-z0-9._-]{1,100}$/

export const isRepoSlug = (s) => typeof s === 'string' && REPO_SLUG.test(s)

// 手順 3 の完全な形と、形を問わない `gh pr merge <N>` の全出現
const FULL_FORM = /gh pr merge ([1-9][0-9]*) --squash --delete-branch --match-head-commit "\$HEAD_SHA"/g
const ANY_FORM = /gh\s+pr\s+merge\s+#?([0-9]+)/g

/**
 * プロンプトに埋め込まれた merge-exec の PR 番号。手順 3 の完全な形がちょうど 1 種類の番号で現れ、形を問わない
 * `gh pr merge <N>` の番号もそれと同じ 1 種類だけのときに限り、その番号を返す。それ以外は null。
 * （プロンプトに混ざった別の番号は、出所が非信頼データでも生成物でも、取り違えの可能性として fail-closed にする）
 */
export function mergePrNumberOf(prompt) {
  if (typeof prompt !== 'string') return null
  const full = new Set([...prompt.matchAll(FULL_FORM)].map((m) => m[1]))
  const any = new Set([...prompt.matchAll(ANY_FORM)].map((m) => m[1]))
  if (full.size !== 1 || any.size !== 1) return null
  const [n] = full
  if (!any.has(n)) return null
  const v = Number(n)
  return Number.isSafeInteger(v) && v >= 1 ? v : null
}

/**
 * プロンプト中の形を問わない `gh pr merge <N>` の番号の種類数。0 なら、そのプロンプトはマージのコマンドを含まない
 * （生成物の回復専用の merge-exec。手順 3 が allowMerge=false の文面になり gh pr merge を出力しない）。
 * agent-host が「番号が決まらない」警告を、マージのコマンドを含むのに 1 種類に決まらない場合だけに絞るために使う。
 */
export function mergeNumberKinds(prompt) {
  if (typeof prompt !== 'string') return 0
  return new Set([...prompt.matchAll(ANY_FORM)].map((m) => m[1])).size
}

/** req.merge の形（正の安全な整数の prNumber と owner/repo の repo）か。 */
export const isMergeTarget = (m) =>
  m !== null && typeof m === 'object' && Number.isSafeInteger(m.prNumber) && m.prNumber >= 1 && isRepoSlug(m.repo)

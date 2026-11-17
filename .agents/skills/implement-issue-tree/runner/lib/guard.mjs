// ランナーが起動するエージェントに対して拒否するコマンド形の一覧と、そこから Codex の rules と
// OpenCode の permissions / policies を機械的に作る関数。
//
// 位置づけ: 強制はここではしない。コマンドを実際に止めるのは次の 2 つで、どちらも配布済みの共通ガードを使う。
//   - Codex: PreToolUse hook（init-codex の agent-guard.sh。ランナーが subagent=true で呼ぶ）。
//   - OpenCode: plugin（init-opencode の agent-guard。同じ agent-guard.sh を呼ぶ）。
// シェルの入れ子・env -S・演算子の解析はそちらが持つ。本モジュールにはコマンド文字列の判定器を持たない
// （弱い複製が配布物のガードと食い違うのを避けるため。方針の経緯は _/local-plans/iit-runners-codex-opencode.md）。
// 一覧の各形が agent-guard.sh で deny になることは dev/implement-issue-tree/tests/runner-units.test.mjs が
// 実際に agent-guard.sh を起動して確かめ、agent-guard.sh がまだ止めない形（guardGap）は同じテストが現状を固定する。
//
// 読み取りを巻き込む粗い形は rules / permissions に入れない。rules は先頭一致、permissions は glob で、
// メソッド（GET と POST）を区別できない。たとえば `gh api *reviews*` は monitor が実行する読み取り
// `gh api --paginate "repos/{owner}/{repo}/pulls/<PR>/reviews"`（外部レビューの本文を取って fix へ渡す）も拒否してしまう。
// そのためレビューの書き込み（`-f event=APPROVE`・`-X POST` 等）は、引数を実際に解析する agent-guard.sh
// （hook / plugin）の責務とし、ここには置かない。`gh pr review --approve` のような読み取りと衝突しない形だけを残す。
// 一覧が読み取りコマンドを拒否しないことは runner-units.test.mjs が src のプロンプトの読み取り形で確かめる。
//
// 利用者が決める文字列（owner / repo・ブランチ名・ファイルパス・PR や issue のタイトル・本文）と衝突する形も入れない。
// glob はコマンド全体への部分一致なので、`gh api *merge*` のような広い一致は `gh api repos/acme/merge-tool/issues/7`
// の通常の読み取りまで拒否する。REST のエンドポイントと HTTP メソッド（`-X PUT .../pulls/N/merge`・`.../merges`）、
// `*hosts.yml*` のようなファイル名だけの一致も agent-guard.sh（引数を解析する）に任せる。残すのは次の形だけである。
//   - サブコマンドの先頭一致（`gh pr merge`・`gh pr review --approve`・`git push --force` 等。Codex の prefix_rule は argv の語単位の一致）
//   - GraphQL の mutation 名（mergePullRequest 等。利用者の名前と衝突しない固有の語）と `--no-verify`・`--force` 系のフラグ
//   - 認証ファイルのパス（`.config/gh/` 配下・`.codex/auth.json`）
// gh / git の前置きグローバルオプション付きの形（`gh -R o/r pr merge`）は、gh / git の直後の語が `-` で始まる場合だけ
// 掛ける（`git * credential*` のように書くと `git commit -m "credential の扱い"` まで掛かるため）。
// それでも `gh -R o/r issue create --title "pr merge"` のようにオプション付きでタイトルに形そのものを書く場合は掛かり得る。
//
// 実効の防御はサーバー側の ruleset と G0 にある（Workflow 版の merge-guard-hook と同じ位置づけ）。
// rules と permissions は補助層で、先頭一致・文字列照合のため入れ子や変数を含む形は止められない。
//
// マージ系の権限分離: マージを許すのは「autoMerge: true のランの merge-exec ラベル」だけで、許すのは
// MERGE_EXEC_COMMAND の完全一致の 1 形だけ。この完全一致の 1 形の強制は plugin / hook 側の責務で、
// ここは mergeOnly の形（gh pr merge）を allowMerge の一覧から外すだけである。外した後も
// `gh pr merge --admin`・`--auto`、承認、REST / GraphQL のマージ、認証情報の読み出しは一覧に残る。

/** merge-exec の完全一致の形（src の merge プロンプトの手順 3 と同じ形）。照合は plugin / hook 側が行う。 */
export const MERGE_EXEC_COMMAND = /^HEAD_SHA="[0-9a-f]{40}"; gh pr merge [1-9][0-9]* --squash --delete-branch --match-head-commit "\$HEAD_SHA"$/

/** GraphQL の mutation 名の呼び出し（`name(` と `name (`）。名前だけの一致は repo 名・ブランチ名と衝突し、ThreadReply 等の別 mutation も巻き込む。 */
const mutationGlobs = (name) => [`gh api*${name}(*`, `gh api*${name} (*`]

/**
 * 拒否する形の一覧。
 *   prefixes: argv の先頭一致で書ける形（要素の配列は選択肢）。Codex の prefix_rule と OpenCode の glob の両方を作る。
 *   globs: 位置が不定で先頭一致では書けない形。OpenCode の glob だけを作る（Codex の rules は先頭一致のため書けない）。
 *   mergeOnly: allowMerge の一覧から外す形（gh pr merge だけ）。
 *   guardGap: agent-guard.sh が（subagent=true でも）止めない形を含む。rules / permissions だけが止める。
 */
export const DENY_FORMS = Object.freeze([
  { id: 'pr-merge', mergeOnly: true, note: 'gh pr merge', prefixes: [['gh', 'pr', 'merge']], globs: [] },
  { id: 'pr-merge-bypass', mergeOnly: false, note: 'gh pr merge の --admin（保護の迂回）と --auto（自動マージ予約）', prefixes: [], globs: ['gh pr merge*--admin*', 'gh pr merge*--auto*'] },
  { id: 'pr-approve', mergeOnly: false, note: 'gh pr review の --approve と -a（語単位。本文中の -abc は掛けない）', prefixes: [], globs: ['gh pr review*--approve*', 'gh pr review* -a', 'gh pr review* -a *'] },
  { id: 'api-merge', mergeOnly: false, note: 'GraphQL のマージ系 mutation の呼び出し形（mergePullRequest・mergeBranch・enqueuePullRequest・enablePullRequestAutoMerge）。REST の /merge・/merges は owner / repo 名と衝突するため agent-guard.sh に任せる', prefixes: [], globs: ['mergePullRequest', 'enablePullRequestAutoMerge', 'mergeBranch', 'enqueuePullRequest'].flatMap(mutationGlobs) },
  { id: 'api-review', mergeOnly: false, note: 'GraphQL のレビュー mutation（addPullRequestReview・submitPullRequestReview。スレッドへの返信 addPullRequestReviewThreadReply は掛けない）、中身を見られない GraphQL の入力（--input・@ファイル。エンドポイントが graphql のときだけ）。REST の reviews への書き込みは GET と区別できないため agent-guard.sh に任せる（読み取りの `gh api .../pulls/N/reviews` を巻き込まない）', prefixes: [], globs: [...['addPullRequestReview', 'submitPullRequestReview'].flatMap(mutationGlobs), 'gh api graphql *--input*', 'gh api graphql *=@*'] },
  { id: 'gh-alias-extension', mergeOnly: false, note: 'gh alias の定義・取り込みと gh extension の導入・実行（拒否した形の別名・外部コードの実行になる）', prefixes: [['gh', 'alias', ['set', 'import']], ['gh', ['extension', 'ext'], ['install', 'exec']]], globs: [] },
  { id: 'auth-token', mergeOnly: false, note: '認証トークンの表示（gh auth token・status --show-token・環境変数の一覧）', prefixes: [['gh', 'auth', 'token'], ['gh', 'auth', 'status', ['--show-token', '-t']], ['printenv']], globs: [] },
  { id: 'git-credential', mergeOnly: false, note: 'git の認証情報ヘルパーの呼び出し（credential fill 等）', prefixes: [['git', 'credential']], globs: [] },
  { id: 'auth-file', mergeOnly: false, note: 'gh / Codex の認証ファイルとその置き場の読み取り（`hosts.yml` だけの一致は利用者のファイル名と衝突するため置かない。`.config/gh` の直後は / ・空白・末尾に加え、空白なしで続く区切り記号 ; & | ) とバッククォート・引用符も拾う）', prefixes: [], globs: ['*.config/gh/*', '*.config/gh', '*.config/gh *', ...[';', '&', '|', ')', '`', '"', "'"].map((c) => `*.config/gh${c}*`), '*/gh/hosts.yml*', '*.codex/auth.json*'] },
  { id: 'git-force-push', mergeOnly: false, note: 'force 系の push', prefixes: [['git', 'push', ['--force', '-f', '--force-with-lease', '--force-if-includes', '--mirror']]], globs: ['git push*--force*', 'git push* -f*', 'git push*--mirror*', 'git push* +*'] },
  { id: 'git-no-verify', mergeOnly: false, note: 'フックの迂回（--no-verify・commit -n・core.hooksPath）', prefixes: [['git', 'commit', ['--no-verify', '-n']], ['git', 'push', '--no-verify']], globs: ['git commit*--no-verify*', 'git push*--no-verify*', 'git*core.hooksPath*'] },
])

const isWord = (x) => typeof x === 'string'

/** argv の選択肢（配列の要素）を展開し、語の列の全組み合わせを返す。 */
export function expandPrefix(pattern) {
  let acc = [[]]
  for (const tok of pattern) {
    const alts = isWord(tok) ? [tok] : tok
    acc = acc.flatMap((a) => alts.map((t) => [...a, t]))
  }
  return acc
}

/** gh / git の前置きグローバルオプション（`gh -R x pr merge`・`git -C d push`）を許す形を足す。直後の語は `-` 始まりに限る。 */
function withGlobalOptionVariant(glob) {
  const m = /^(gh|git) (\S.*)$/.exec(glob)
  return m && !m[2].startsWith('*') ? [glob, `${m[1]} -* ${m[2]}`] : [glob]
}

/** allowMerge に応じた有効な形。Codex と OpenCode は必ずここを通して同じ集合から作る。 */
export function activeForms({ allowMerge = false } = {}) {
  return DENY_FORMS.filter((f) => !(allowMerge && f.mergeOnly))
}

/** OpenCode へ渡す glob の一覧（prefixes 由来と globs 由来。重複なし）。 */
export function opencodePatterns(opts = {}) {
  const out = []
  for (const f of activeForms(opts)) {
    for (const p of f.prefixes) for (const argv of expandPrefix(p)) out.push(...withGlobalOptionVariant(`${argv.join(' ')}*`))
    for (const g of f.globs) out.push(...withGlobalOptionVariant(g))
  }
  return [...new Set(out)]
}

/**
 * OpenCode の permissions / policies（init-opencode の opencode.jsonc と同じ形式）。session.create で
 * allow-all は付けない（config の permissions が打ち消されるため。Phase 0-6）。policies は session の許可では外せない。
 * @param {{ allowMerge?: boolean }} [opts]
 */
export function opencodeRules(opts = {}) {
  const patterns = opencodePatterns(opts)
  return {
    permissions: patterns.map((resource) => ({ action: 'shell', resource, effect: 'deny' })),
    policies: patterns.map((resource) => ({ action: 'tool.use', resource: `shell:${resource}`, effect: 'deny' })),
  }
}

const quote = (s) => JSON.stringify(s)

/**
 * Codex の rules ファイル（execpolicy の prefix_rule）の本文。prefixes のある形だけが対象で、globs は含まない。
 * 各規則の match には展開した全組み合わせを入れる（Codex は読み込み時に match が pattern に一致することを検証する）。
 * @param {{ allowMerge?: boolean }} [opts]
 */
export function codexRules(opts = {}) {
  const blocks = []
  for (const f of activeForms(opts)) {
    for (const p of f.prefixes) {
      const pattern = p.map((t) => (isWord(t) ? quote(t) : `[${t.map(quote).join(', ')}]`)).join(', ')
      const match = expandPrefix(p).map((argv) => quote(argv.join(' ')))
      blocks.push([
        'prefix_rule(',
        `    pattern = [${pattern}],`,
        '    decision = "forbidden",',
        `    justification = ${quote(`拒否する形（${f.id}）: ${f.note}`)},`,
        `    match = [${match.join(', ')}],`,
        ')',
      ].join('\n'))
    }
  }
  return `${blocks.join('\n')}\n`
}

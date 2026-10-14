// スキル同梱のシェルスクリプト（scripts/*.sh と scripts/lib/*.sh）が、禁止された操作の綴りを含まないことを検査する静的ガード
// （Issue #603 第 3 弾）。
//
// なぜ必要か: scripts/merge-guard-hook.sh は subagent の Bash の『コマンド文字列』を見てマージ系・設定変更系を拒否するが、
// スクリプトの中で実行されるコマンドは hook から見えない。第 3 弾で push を含むスクリプト（base-merge.sh）が入り、
// 以降の弾でも増える。スクリプトの内容は run-verified.sh のハッシュで固定されるので、『レビューした内容から変わっていない』
// ことは保証できるが、『レビューした内容が安全か』は保証できない。そこで、hook が拒否する操作と、hook を通さない近道
// （--force 系の push・フック回避）の綴りが、スクリプトのコード行に無いことをテストで固定する。
//
// 対象はコメント行を除いたコード行。merge-guard-hook.sh は拒否すべき綴りの定義そのものを持つため対象外（唯一の除外）。
// 検査パターン自身が壊れていないことは、各パターンが『悪い例』に発火する自己検査で固定する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPTS = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts')
const EXCLUDED = new Set(['merge-guard-hook.sh'])

// 検査パターン。{ label, test(line) }。test は連結済みのコード 1 行を受ける。
const re = (label, regex) => ({ label, test: (line) => regex.test(line) })
// gh api / gh_api（スクリプト内のラッパー）の呼び出しか。gh と api の間にグローバルオプションが入る形（gh -R "${repo}" api …）も含む
const GH_API_HEAD = '(?:\\bgh_api\\b|\\bgh\\b[^\\n|;&]*\\bapi\\b)'
const GH_API = new RegExp(GH_API_HEAD)
// gh api の最初の位置引数が graphql（読み取りの query）か。オプションを挟んでもよい
const GH_API_GRAPHQL = new RegExp(`${GH_API_HEAD}\\s+(--?[A-Za-z][\\w-]*\\s+)*graphql\\b`)
// git の後ろのグローバルオプション（-C <dir>・-c k=v・--no-pager など）を読み飛ばして、サブコマンドの位置を見る。
// git とサブコマンドは引用符で囲んでもシェルでは同じコマンドになる（"git" push・git "push"）ので、引用符も許す
const GIT_SUB = (sub) => new RegExp(`["']?\\bgit\\b["']?\\s+(?:(?:-[Cc]\\s+\\S+|--?[\\w-]+(?:=\\S+)?)\\s+)*["']?${sub}\\b["']?`)
const GIT_PUSH_CALL = GIT_SUB('push')
// git push の許可形（lib/push-verify.sh の 1 行だけ。--no-follow-tags は利用者設定 push.followTags でタグが出ていくのを止める）。
// ほかの形は削除 refspec・--all・URL 直指定・remote 違い・--no-follow-tags の欠落を含めてすべて拒否する。引用符付きの git / push も許可形ではない
const GIT_PUSH_ALLOWED = /^\s*git push --no-follow-tags origin "HEAD:refs\/heads\/\$\{branch\}"(\s*>\/dev\/null)?(\s*\|\|\s*rc=\$\?)?\s*$/

// git worktree の remove / unlock / move と git branch の削除・上書き・改名（-d / -D / -f / -M / -m / -C と長い形の省略形）、git update-ref の許可形。worktree-remove.sh の決まった行だけが使う
// （確認と削除を同じプロセスで行うスクリプト。Issue #603 第 7 弾）。ほかの形（--force の二重指定 -f -f・変数以外の引数・別のスクリプト）は
// すべて拒否する。許可形が worktree-remove.sh にしか無いことは下の専用テストで固定する。引用符付きの git / サブコマンドは許可形ではない
const GIT_WORKTREE_RM_CALL = new RegExp(`${GIT_SUB('worktree').source}\\s+["']?(remove|unlock|move)\\b`)
const GIT_WORKTREE_RM_ALLOWED = /^\s*git worktree (remove( --force)?|unlock) -- "\$\{path\}"( >\/dev\/null 2>&1)? \|\| rc=\$\?\s*$/
// git は長いオプションの一意な省略形（--del・--dele・--forc・--mo）を受け付け、オプションは引用符で囲んでもシェルでは同じ（"-D"・'--delete'）。
// 削除（-d / -D / --delete）に加え、ref を上書きする -f / --force・-M / -m / --move（改名）・-C（強制コピー）も対象にする。
// --format・--list・--show-current など別のオプションは拾わない（省略形の直後は空白・= ・引用符・行末に限る）
const GIT_BRANCH_DELETE_OPT = /(^|\s)["']?(-[a-zA-Z]*[dDfMmC][a-zA-Z]*|--(d(e(l(e(t(e)?)?)?)?)?|forc(e)?|mo(v(e)?)?))["']?(?=\s|$|=)/
const GIT_BRANCH_DELETE_CALL = (line) => GIT_SUB('branch').test(line) && GIT_BRANCH_DELETE_OPT.test(line)
const GIT_BRANCH_DELETE_ALLOWED = /^\s*git branch -D -- "\$\{branch\}"( >\/dev\/null 2>&1)? \|\| rc=\$\?\s*$/
// git update-ref は ref を直接書き換え・削除する（git branch の検査をすり抜ける経路: update-ref -d "refs/heads/…"）。許可するのは、base-merge.sh と
// pr-push.sh が自分の作業用 ref（refs/worktree/…。変数への代入は下の専用テストが形を固定する）を片付ける -d の 1 形だけ
const GIT_UPDATE_REF_CALL = GIT_SUB('update-ref')
const GIT_UPDATE_REF_ALLOWED = /^\s*git update-ref -d "\$\{(base_ref|branch_ref)\}" >\/dev\/null 2>&1 \|\| true\s*$/
// base_ref / branch_ref への束縛（代入・local / readonly / declare / export・+=・read・printf -v・${x:=…}・前置代入・; の後ろ・for … in など形を問わない）は、
// 許可した決まった代入行と完全一致するものだけを通す。読み出し（"${base_ref}" と $base_ref）を取り除いたあとに名前が残る行は束縛か、読み出しとの区別がつかない形として扱う
const REF_NAME = /\b(base_ref|branch_ref)\b/
const REF_READ = /\$\{(base_ref|branch_ref)\}|\$(base_ref|branch_ref)\b/g
const REF_ASSIGN_ALLOWED = /^(base_ref|branch_ref)="refs\/worktree\/[a-z-]+\/(base|branch)"$/
const refBinding = (line) => REF_NAME.test(line.replace(REF_READ, ''))
const refBindingRejected = (line) => refBinding(line) && !REF_ASSIGN_ALLOWED.test(line.trim())

// git add / git commit は recover-prep.sh の決まった 1 行だけが使う（旧 worktree の未コミット変更を WIP コミットとして対象ブランチへ退避する。
// Issue #603 第 9 弾）。必ず `git -C "${path}"` で対象の worktree を明示し（メイン worktree を暗黙の対象にしない）、フックを通す（-n・--no-verify・
// --no-verify の省略形は別のパターンが拒否する）。コミットメッセージは固定。stdin を閉じ、出力は標準エラーへ送る。ほかの形はすべて拒否する。
// 許可形がこのファイルにしか無いことは下の専用テストで固定する。引用符付きの git / サブコマンドは許可形ではない
const GIT_ADD_COMMIT_CALL = new RegExp(`${GIT_SUB('(?:add|commit)').source}`)
const GIT_WIP_ALLOWED = /^\s*git -C "\$\{path\}" add -A >&2 && git -C "\$\{path\}" commit -q -m "wip\(recover\): 中断時の未コミット変更を退避" <\/dev\/null >&2 \|\| crc=\$\?\s*$/

const PATTERNS = [
  // マージ・クローズ
  re('gh pr merge', /\bgh\b[^\n|;&]*\bpr\b[^\n|;&]*\bmerge\b/),
  re('gh pr close / gh issue close', /\bgh\b[^\n|;&]*\b(pr|issue)\b[^\n|;&]*\bclose\b/),
  re('REST のマージ API', /pulls\/[^\s'"]*\/merge|\/merges\b|\/merge['"\s]*$/),
  re('GraphQL のマージ mutation', /mergePullRequest|enablePullRequestAutoMerge|mergeBranch|closePullRequest/),
  // 別名・拡張経由の迂回（merge-guard-hook.sh が拒否している類と揃える）
  re('gh alias / gh extension', /\bgh\b[^\n|;&]*\b(alias|extensions?)\b/),
  // 承認
  re('approve', /--approve\b|\bgh\b[^\n|;&]*\bpr\b[^\n|;&]*\breview\b|\bevent=APPROVE\b|\bAPPROVE\b|submitPullRequestReview|addPullRequestReview/),
  // リポジトリ設定・ruleset・branch protection の変更
  // /rulesets は設定変更の経路なので拒否するが、merge-gate.sh の G0 が適用 ruleset 1 件の bypass_actors と enforcement を読む GET
  // （gh_api "${repo_path}/rulesets/${id}" || …。-X・-f などの書き込みは別のパターンが拒否する）だけは、この 1 行の形に限って許す。
  // 許す行が merge-gate.sh 以外に無く、形が 1 つだけであることは下の専用テストで固定する
  re('ruleset / branch protection / リポジトリ設定', /\/rulesets\b(?!\/\$\{id\}"\s*\|\|)|branches\/[^\s'"]*\/protection|\bgh\b[^\n|;&]*\brepo\b[^\n|;&]*\b(edit|rename|archive|unarchive|delete)\b|updateRepository|deleteRepository|archiveRepository|ruleset\w*Mutation|createRuleset|updateRuleset/),
  // -X は大文字小文字を区別する別パターン（set -x や jq の -x を拾わない）。-XPUT のように値が直結する形も拾う
  {
    label: '書き込み系の HTTP メソッド',
    // -iX PUT のように他の短縮オプションと連結した形、-X の後ろがタブの形も拾う
    // 値が GET のリテラル（クォートつき・小文字の get を含む）以外はすべて拒否する。`-X "$m"` / `--method "${m}"` / `--request "$M"` のような
    // 変数値は実行時に PUT / DELETE へ化け得るので、値を読めない形は書き込みとして扱う
    test: (line) => /(--method|--request)[\s=]+(?!['"]?GET['"]?(\s|$))\S/i.test(line) || /(^|[\s'"])-[A-Za-z]*X[\s=]*(?!['"]?GET['"]?(\s|$))\S/.test(line),
  },
  // curl / wget による本文付きリクエスト（-d / --data* / -F / --form / -T / --upload-file / --json、wget の --post-data / --post-file / --body-*）。
  // -X / --method は上のパターンが拾う
  re('curl / wget による書き込み系リクエスト', /\bcurl\b[^\n|;&]*\s(-[A-Za-z]*[dFT]|--(data[\w-]*|form[\w-]*|upload-file|json))\b|\bwget\b[^\n|;&]*\s--(post-(data|file)|body-(data|file))\b/),
  re('GraphQL の mutation', /\bmutation\b/),
  // gh api は -f / -F / --field / --raw-field / --input を付けると、メソッド指定なしでも暗黙に POST になる。
  // graphql の query 送信（-f query=… -F owner=…）だけは読み取りとして許す（mutation は別パターンが拒否する）。--input は graphql でも拒否する
  {
    label: 'gh api の書き込み系（-f / -F / --field / --raw-field / --input による暗黙 POST）',
    test: (line) => {
      if (!GH_API.test(line)) return false
      if (/(^|\s)--input\b/.test(line)) return true
      return !GH_API_GRAPHQL.test(line) && /(^|\s)(-[fF]\S*|--field\b\S*|--raw-field\b\S*)/.test(line)
    },
  },
  // push の近道
  re('git push の --force 系', /\bgit\b[^\n|;&]*\bpush\b[^\n]*(--force\b|--force-with-lease|--mirror|--delete\b|--prune\b|--force-if-includes)/),
  re('git push の -f 系短縮オプション', /\bgit\b[^\n|;&]*\bpush\b[^\n]*\s-[a-zA-Z]*f[a-zA-Z]*(\s|$)/),
  re('git push の + refspec', /\bgit\b[^\n|;&]*\bpush\b[^\n]*\s['"]?\+/),
  // 削除は自分が作った一時ファイルへの rm -f だけ（再帰削除はスクリプトに置かない）。worktree とブランチの削除は、確認と削除を同じプロセスで
  // 行う worktree-remove.sh の決まった行だけ許す
  re('rm の再帰削除（-r / -R / -rf / --recursive）', /\brm\b[^\n|;&]*(\s-[A-Za-z]*[rR][A-Za-z]*(\s|$)|\s--recursive\b)/),
  {
    label: 'git worktree remove / unlock / move は許可形（git worktree remove [--force] -- "${path}" など）以外を拒否',
    test: (line) => GIT_WORKTREE_RM_CALL.test(line) && !GIT_WORKTREE_RM_ALLOWED.test(line),
  },
  {
    label: 'git branch の削除・上書き・改名（-d / -D / -f / -M / -m / -C / --delete と省略形・引用符つき）は許可形（git branch -D -- "${branch}"）以外を拒否',
    test: (line) => GIT_BRANCH_DELETE_CALL(line) && !GIT_BRANCH_DELETE_ALLOWED.test(line),
  },
  {
    label: 'git update-ref は許可形（git update-ref -d "${base_ref}" / "${branch_ref}"）以外を拒否',
    test: (line) => GIT_UPDATE_REF_CALL.test(line) && !GIT_UPDATE_REF_ALLOWED.test(line),
  },
  {
    label: 'git add / git commit は許可形（recover-prep.sh の WIP コミットの 1 行）以外を拒否',
    test: (line) => GIT_ADD_COMMIT_CALL.test(line) && !GIT_WIP_ALLOWED.test(line),
  },
  {
    label: 'git push は許可形（git push --no-follow-tags origin "HEAD:refs/heads/${branch}"）以外を拒否',
    test: (line) => GIT_PUSH_CALL.test(line) && !GIT_PUSH_ALLOWED.test(line),
  },
  // リポジトリ設定の書き換え（push 先や hook の差し替え）
  re('git remote（get-url 以外）', new RegExp(`${GIT_SUB('remote').source}(?!\\s+get-url\\b)`)),
  re('git config の書き込み（--get / --list 以外）', new RegExp(`${GIT_SUB('config').source}(?!\\s+(--get(-all|-regexp)?|--list|-l)\\b)`)),
  re('core.hooksPath / GIT_CONFIG 環境変数による設定の注入', /core\.hooksPath|\bGIT_CONFIG_(COUNT|KEY_\d+|VALUE_\d+|PARAMETERS)\b/i),
  // フック回避
  // git は長いオプションの一意な省略形を受け付ける（--no-verif・--no-ver・--no-v）。--no-verbose のような別のオプションは拾わない
  re('--no-verify', /--no-v(e(r(i(f(y)?)?)?)?)?\b/),
  re('git commit -n（--no-verify の短縮）', /\bgit\b[^\n|;&]*\bcommit\b[^\n|;&]*\s-[a-zA-Z]*n[a-zA-Z]*(\s|$)/),
  re('HUSKY / LEFTHOOK の無効化', /\b(HUSKY(_\w+)?|LEFTHOOK|SKIP_HOOKS)\s*=/),
]

function targets() {
  const out = []
  for (const dir of [SCRIPTS, join(SCRIPTS, 'lib')]) {
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.sh') || EXCLUDED.has(f)) continue
      out.push({ name: dir === SCRIPTS ? f : `lib/${f}`, path: join(dir, f) })
    }
  }
  return out
}
// コメント行を除き、バックスラッシュ行継続を 1 行に連結する（`gh api \` の次行に `-X PUT` を置くような分割で行単位の検査をすり抜けない）。
// n は連結した行の先頭の行番号
function codeLines(text) {
  const out = []
  let acc = null
  text.split('\n').forEach((raw, i) => {
    if (/^\s*#/.test(raw)) return
    const cur = acc === null ? { n: i + 1, l: raw } : { n: acc.n, l: `${acc.l} ${raw.trim()}` }
    if (/\\$/.test(cur.l)) {
      acc = { n: cur.n, l: cur.l.replace(/\\$/, '').trimEnd() }
      return
    }
    acc = null
    out.push(cur)
  })
  if (acc !== null) out.push(acc)
  return out
}

test('走査の対象にスクリプト一式（scripts/*.sh と scripts/lib/*.sh）が含まれ、除外は merge-guard-hook.sh だけ', () => {
  const names = targets().map((t) => t.name)
  for (const must of ['base-merge.sh', 'observe-pr.sh', 'measure-residual-bytes.sh', 'measure-free-disk.sh', 'run-verified.sh', 'preview-tree.sh', 'pr-push.sh', 'merge-gate.sh', 'worktree-remove.sh', 'recover-prep.sh', 'lib/worktree-remove-lib.sh', 'lib/recover-prep-lib.sh', 'lib/merge-gate-lib.sh', 'lib/signed-output.sh', 'lib/push-verify.sh', 'lib/base-merge-lib.sh', 'lib/pr-push-lib.sh']) {
    assert.ok(names.includes(must), `${must} が走査の対象にない（${names.join(', ')}）`)
  }
  assert.ok(!names.includes('merge-guard-hook.sh'))
  assert.deepEqual([...EXCLUDED], ['merge-guard-hook.sh'])
  assert.ok(readdirSync(SCRIPTS).includes('merge-guard-hook.sh'), '除外の根拠（hook が実在する）')
})

test('スクリプトのコード行に、マージ・承認・設定変更・force push・フック回避の綴りが無い', () => {
  const hits = []
  for (const { name, path } of targets()) {
    for (const { n, l } of codeLines(readFileSync(path, 'utf8'))) {
      for (const { label, test } of PATTERNS) if (test(l)) hits.push(`${name}:${n} [${label}] ${l.trim()}`)
    }
  }
  assert.deepEqual(hits, [], `禁止された綴りがスクリプトにある:\n${hits.join('\n')}`)
})

test('自己検査: 各パターンは悪い例に発火する（パターンが壊れて何も検出しなくなっていない）', () => {
  const bad = {
    'gh pr merge': ['gh pr merge 12 --squash', 'gh -R o/r pr merge 12', 'gh --repo o/r pr merge'],
    'gh alias / gh extension': ['gh alias set m "pr merge"', 'gh alias import x.yml', 'gh extension install o/r', 'gh extensions list', 'gh -R o/r alias set x y'],
    'gh pr close / gh issue close': ['gh pr close 3', 'gh issue close 4'],
    'REST のマージ API': ['gh api repos/o/r/pulls/3/merge -X PUT', 'gh api repos/o/r/merges'],
    'GraphQL のマージ mutation': ['mergePullRequest(input:{})', 'enablePullRequestAutoMerge'],
    approve: ['gh pr review 3 --approve', 'gh pr review 3', '-f event=APPROVE', '"event": "APPROVE"'],
    'ruleset / branch protection / リポジトリ設定': ['gh api repos/o/r/rulesets/1', 'gh_api "${repo_path}/rulesets/${id}"', 'gh_api "${repo_path}/rulesets/${id}/x" || true', 'gh_api "${repo_path}/rulesets" || true', 'gh api repos/o/r/branches/main/protection', 'gh repo edit --visibility public', 'gh repo delete o/r'],
    '書き込み系の HTTP メソッド': [
      'gh api -X PUT repos/o/r/x', 'gh api --method POST repos/o/r/x', 'gh api --method=DELETE x',
      'gh api -XPUT repos/o/r/x', 'gh api -XDELETE x', 'gh api --request PATCH x', 'gh api --request=POST x', "gh api -X 'POST' x",
      'gh api -iX PUT repos/o/r/x', 'gh api -iXPOST x', 'gh api -X\tPUT repos/o/r/x', 'gh api --method\tPOST x', 'gh api -siXDELETE x',
      // 変数値（実行時に書き込みメソッドへ化け得る）。クォートの有無・${} 形・大文字小文字・= 連結を問わない
      'gh api -X "$m" x', 'gh api --method "${m}" x', 'gh api --request "$M" x', 'gh api -X $m x', 'gh api --method=$m x', 'gh api -X "${GH_M:-GET}" x',
      'gh api -iX "$m" x', 'gh api -X"$m" x', 'gh_api -X "$m" "${repo_path}/rulesets/${id}"',
    ],
    'GraphQL の mutation': ['mutation($id:ID!){ resolveReviewThread(input:{threadId:$id}){ thread{id} } }'],
    'gh api の書き込み系（-f / -F / --field / --raw-field / --input による暗黙 POST）': [
      'gh api repos/o/r/issues -f title=x', 'gh api repos/o/r/issues -F title=x', 'gh_api repos/o/r/issues --field title=x',
      'gh api repos/o/r/issues --raw-field title=x', 'gh api repos/o/r/issues -ftitle=x', 'gh api repos/o/r/issues --input body.json',
      'gh api graphql --input query.json', 'gh api --paginate repos/o/r/issues/1/comments -f body=x',
      // gh と api の間にグローバルオプションが入る形
      'gh -R "${repo}" api repos/o/r/issues -f title=x', 'gh --repo o/r api repos/o/r/issues --field title=x', 'gh -R "${repo}" api repos/o/r/issues --input body.json',
      'gh -R "${repo}" api graphql --input query.json',
    ],
    'curl / wget による書き込み系リクエスト': [
      'curl -d x https://example.com', 'curl -sd @body.json https://example.com', 'curl --data-raw x https://example.com', 'curl --data-binary @f https://example.com',
      'curl --data-urlencode a=b https://example.com', 'curl -F a=b https://example.com', 'curl --form a=@f https://example.com', 'curl -T f https://example.com',
      'curl --upload-file f https://example.com', 'curl --json {} https://example.com', 'curl -sSL -d x https://example.com',
      'wget --post-data=a=b https://example.com', 'wget --post-file f https://example.com', 'wget --body-data=x https://example.com', 'wget --body-file f https://example.com',
    ],
    'git push の --force 系': ['git push --force origin HEAD', 'git push origin HEAD --force-with-lease', 'git push --mirror', 'git push origin --delete x'],
    'rm の再帰削除（-r / -R / -rf / --recursive）': ['rm -rf "${dir}"', 'rm -r -- "${d}"', 'rm -fR x', 'rm --recursive x', 'rm -f a && rm -rf b'],
    'git worktree remove / unlock / move は許可形（git worktree remove [--force] -- "${path}" など）以外を拒否': [
      'git worktree move "${path}" /tmp/x', 'git worktree move -- "${path}" "${dest}"', 'git worktree "move" "${path}" "${dest}"', 'git -C x worktree move a b',
      'git worktree remove --force -- "$p"', 'git worktree remove "$p"', 'git worktree remove -- "${path}" 2>/dev/null && continue', 'git worktree remove --force -- "${p}"',
      'git worktree remove -f -f -- "${path}"', 'git worktree remove --force --force -- "${path}"', 'git worktree remove --force "${path}"', 'git worktree remove -- /tmp/x',
      'git worktree unlock "$p"', 'git worktree unlock -- "$p"', 'git worktree unlock -- "${p}"', 'git worktree unlock -- /tmp/x', 'git -C "${dir}" worktree remove -- "${path}"',
      '"git" worktree remove -- "${path}"', 'git "worktree" remove -- "${path}"', 'git worktree "remove" -- "${path}"', 'git worktree remove -- "${path}" && git worktree remove -- "${other}"',
      'git worktree remove --force -- "${path}"; rm -rf x', 'git worktree remove --force -- "${path}" >/dev/null 2>&1 || true', 'git worktree remove --force -- "${path}" || rc=$? # x',
    ],
    'git branch の削除・上書き・改名（-d / -D / -f / -M / -m / -C / --delete と省略形・引用符つき）は許可形（git branch -D -- "${branch}"）以外を拒否': [
      // 長いオプションの省略形・引用符つきのオプション・ref の上書き / 改名
      'git branch --del -- "${branch}"', 'git branch --dele -- "${branch}"', 'git branch --delet -- "${branch}"', 'git branch --d "${branch}"', 'git branch "-D" x', "git branch '-D' x",
      'git branch "-d" x', "git branch '--delete' x", 'git branch -f main HEAD', 'git branch --force main HEAD', 'git branch --forc main HEAD', 'git branch -M main', 'git branch -m old new',
      'git branch --move old new', 'git branch --mov old new', 'git branch --mo old new', 'git branch -C a b', 'git branch -fm a b', 'git branch -a -f x y',
      'git branch -D -- "$b"', 'git branch -D "${branch}"', 'git branch -d -- "${branch}"', 'git branch --delete -- "${branch}"', 'git branch --delete --force "${branch}"',
      'git branch -D -- "${b}"', 'git branch -D -- main', 'git branch -Df "${branch}"', 'git branch -fD "${branch}"', 'git -C x branch -D -- "${branch}"', '"git" branch -D -- "${branch}"',
      'git branch -D -- "${branch}" "${other}"', 'git branch -D -- "${branch}" && git branch -D -- "${other}"', 'git branch -D -- "${branch}" >/dev/null 2>&1 || true',
      'git branch -D -- "${branch}" || rc=$? ; git branch -D x',
    ],
    'git update-ref は許可形（git update-ref -d "${base_ref}" / "${branch_ref}"）以外を拒否': [
      'git update-ref -d "refs/heads/main"', 'git update-ref -d refs/heads/${branch}', 'git update-ref -d "refs/remotes/origin/${base}"', 'git update-ref "refs/heads/main" HEAD',
      'git update-ref -d "${other_ref}"', 'git update-ref -d "${base_ref}"', 'git update-ref -d "${base_ref}" "${old}" >/dev/null 2>&1 || true', 'git update-ref --delete "${base_ref}" >/dev/null 2>&1 || true',
      '"git" update-ref -d "refs/heads/x"', 'git "update-ref" -d "refs/heads/x"', 'git -C x update-ref -d "refs/heads/x"', "git update-ref -d 'refs/heads/x'",
    ],
    'git add / git commit は許可形（recover-prep.sh の WIP コミットの 1 行）以外を拒否': [
      // 対象の worktree を明示しない（メイン worktree が暗黙の対象になる）・変数以外のパス・メッセージの変更・フラグの追加・引用符付き
      'git add -A', 'git add .', 'git add -- a.txt', 'git commit -m x', 'git commit --amend --no-edit', 'git commit -F "${msgfile}"', 'git commit --no-edit',
      'git -C "${other}" add -A', 'git -C "$path" add -A', 'git -C . add -A', 'git -C "${path}" add --force .', 'git -C "${path}" add -f x', 'git -C "${path}" add -N .',
      'git -C "${path}" commit -m x', 'git -C "${path}" commit -q -m "別のメッセージ" </dev/null >&2 || crc=$?', 'git -C "${path}" commit -a -m x', 'git -C "${path}" commit --amend',
      'git -C "${path}" add -A >&2 && git -C "${path}" commit -q -m "wip(recover): 中断時の未コミット変更を退避" >&2 || crc=$?',
      'git -C "${path}" add -A >&2 && git -C "${path}" commit -q -m "wip(recover): 中断時の未コミット変更を退避" </dev/null >&2 || true',
      'git -C "${path}" add -A >&2 && git -C "${path}" commit -q -m "wip(recover): 中断時の未コミット変更を退避" </dev/null >&2 || crc=$?; git -C "${path}" add -f x',
      '"git" -C "${path}" add -A', 'git "add" -A', 'git -C "${path}" "commit" -m x', "git -C x 'add' y", 'git -c user.name=x commit -m x', 'git -c core.hooksPath=/x commit -m x',
    ],
    'git push の -f 系短縮オプション': ['git push -f origin HEAD', 'git push origin HEAD -f', 'git push -uf origin HEAD'],
    'git push の + refspec': ['git push origin +HEAD:refs/heads/x', 'git push origin "+HEAD:refs/heads/x"'],
    'git push は許可形（git push --no-follow-tags origin "HEAD:refs/heads/${branch}"）以外を拒否': [
      // --no-follow-tags の欠落（push.followTags でタグが出ていく）・順序違い・引用符付きの git / push
      'git push origin "HEAD:refs/heads/${branch}"', 'git push origin "HEAD:refs/heads/${branch}" --no-follow-tags', 'git push --follow-tags origin "HEAD:refs/heads/${branch}"',
      '"git" push --no-follow-tags origin "HEAD:refs/heads/${branch}"', 'git "push" --no-follow-tags origin "HEAD:refs/heads/${branch}"', "'git' 'push' origin :refs/heads/main",
      'git "push" origin ":refs/heads/main"', '"git" push --all origin',
      'git push origin ":refs/heads/main"', 'git push origin :refs/heads/main', 'git push --all origin', 'git push --tags origin',
      'git push https://github.com/o/r.git "HEAD:refs/heads/${branch}"', 'git push evil "HEAD:refs/heads/${branch}"',
      'git push origin HEAD:refs/heads/main', 'git push origin "HEAD:refs/heads/${branch}" --tags', 'git push', 'git push origin',
      'git -c core.x=y push origin "HEAD:refs/heads/${branch}"', 'git push origin "HEAD:refs/heads/${branch}" "HEAD:refs/heads/main"',
    ],
    'git remote（get-url 以外）': ['git remote set-url --push origin x', 'git remote add evil x', 'git remote set-url --add origin x', 'git remote remove origin', 'git remote -v', 'git remote', 'git -C x remote rename a b', '"git" remote add evil x', 'git "remote" add evil x'],
    'git config の書き込み（--get / --list 以外）': [
      'git config url.x.pushInsteadOf y', 'git config --local remote.origin.pushurl x', 'git config --unset remote.origin.url', 'git config --global user.name x',
      'git config core.hooksPath x', 'git config --add remote.origin.url x', 'git config', 'git -c a=b config x y', '"git" config core.x y', 'git "config" core.x y',
    ],
    'core.hooksPath / GIT_CONFIG 環境変数による設定の注入': ['git -c core.hooksPath=/dev/null commit -m x', 'git config core.hooksPath x', 'GIT_CONFIG_COUNT=1 git commit', 'export GIT_CONFIG_KEY_0=core.hooksPath', 'GIT_CONFIG_PARAMETERS="x"'],
    '--no-verify': [
      'git commit --no-verify -m x', 'git push --no-verify',
      // 長いオプションの省略形（git は一意なら受け付ける）
      'git commit --no-verif -m x', 'git commit --no-veri -m x', 'git commit --no-ver -m x', 'git commit --no-ve -m x', 'git commit --no-v -m x', 'git push --no-verif origin HEAD',
    ],
    'git commit -n（--no-verify の短縮）': ['git commit -n -m x', 'git commit -m x -n', 'git commit -anm x', 'git -c a=b commit -n'],
    'HUSKY / LEFTHOOK の無効化': ['HUSKY=0 git commit -m x', 'export HUSKY=0', 'HUSKY_SKIP_HOOKS=1 git commit', 'LEFTHOOK=0 git commit', 'SKIP_HOOKS=1 git commit'],
  }
  for (const { label, test: fires } of PATTERNS) {
    assert.ok(bad[label], `${label}: 悪い例がない`)
    for (const line of bad[label]) assert.ok(fires(line), `${label} が発火しない: ${line}`)
  }
  assert.equal(Object.keys(bad).length, PATTERNS.length)
})

test('自己検査: 正当な行（読み取りの gh api・graphql の query・GET・許可形の push・get-url・APPROVED の状態語）には発火しない', () => {
  const good = [
    'gh api "${repo_path}/commits/${HEAD}/check-runs?per_page=1"',
    'gh api --paginate "${repo_path}/rules/branches/${enc}"',
    'gh api -X GET repos/o/r/x',
    'gh api -XGET repos/o/r/x',
    'gh api --method GET repos/o/r/x',
    'gh api --method=get repos/o/r/x',
    'gh_api graphql -f query="${THREADS_QUERY}" -F owner="${owner}" -F name="${name}" -F number="${pr}" || { fail "reviewThreads"; return 1; }',
    'gh api graphql -f query="${Q}" -F cursor="${cursor}"',
    'gh api --paginate "repos/{owner}/{repo}/issues/${n}/sub_issues?per_page=100" --jq \'.[].number\'',
    'run_timed "${gh_timeout}" gh api "$@"',
    'git push --no-follow-tags origin "HEAD:refs/heads/${branch}"',
    'git push --no-follow-tags origin "HEAD:refs/heads/${branch}" >/dev/null || rc=$?',
    'git push --no-follow-tags origin "HEAD:refs/heads/${branch}" >/dev/null',
    'out=$(git remote get-url "$@" origin 2>/dev/null) || return 2',
    'git remote get-url --push --all origin',
    'git config --get remote.origin.url',
    'git config --list',
    'git ls-remote origin "refs/heads/$1"',
    'git -C "${path}" add -A >&2 && git -C "${path}" commit -q -m "wip(recover): 中断時の未コミット変更を退避" </dev/null >&2 || crc=$?',
    'git -C "${path}" -c core.excludesFile= status --porcelain=v2 -uall --ignore-submodules=none',
    'gh -R "${repo}" api repos/o/r/commits/x/check-runs',
    'gh -R "${repo}" api graphql -f query="${Q}" -F owner="${o}"',
    'gh --repo o/r api -X GET repos/o/r/x',
    'gh api -iX GET repos/o/r/x',
    'gh api -X "GET" repos/o/r/x',
    "gh api -X 'GET' repos/o/r/x",
    'gh api --method "GET" repos/o/r/x',
    'gh api -i repos/o/r/x',
    'curl -sSL -H "Accept: x" https://example.com',
    'curl -fsSL -o out https://example.com',
    'wget -q -O out https://example.com',
    'echo "alias"',
    'git merge --no-ff --no-edit -F "${msgfile}" "${base_ref}"',
    'git merge --abort',
    'git fetch origin "refs/heads/${base}:refs/remotes/origin/${base}"',
    'git update-ref -d "${base_ref}" >/dev/null 2>&1 || true',
    'git update-ref -d "${branch_ref}" >/dev/null 2>&1 || true',
    'git rev-parse --verify -q "${base_ref}^{commit}"',
    'git branch --contains HEAD',
    'git branch -r',
    'git branch -a --list "x"',
    'git branch --format=%(refname:short) --sort=-committerdate',
    'git branch --merged main',
    'git branch --no-merged main',
    'git branch -vv',
    'git branch --show-current',
    'git worktree add -- "${path}" HEAD',
    'git worktree list --porcelain',
    'git worktree remove -- "${path}" >/dev/null 2>&1 || rc=$?',
    'git worktree remove --force -- "${path}" >/dev/null 2>&1 || rc=$?',
    'git worktree remove --force -- "${path}" || rc=$?',
    'git worktree unlock -- "${path}" >/dev/null 2>&1 || rc=$?',
    'git worktree list --porcelain',
    'git worktree prune >/dev/null 2>&1 || true',
    'git branch -D -- "${branch}" >/dev/null 2>&1 || rc=$?',
    'git branch --list -- "${b}"',
    'git branch --format=%(refname:short)',
    'git branch --show-current',
    'set -x',
    'bash -x script.sh',
    "map(select(. == \"APPROVED\"))",
    'gh pr view "${pr}" -R "${repo}" --json number,headRefName',
    'jq -cnS --arg m "${mode}" --argjson e "${err}" --argjson a "${attempt}" "${filter}"',
    'echo "PUSH_VERIFY=1"',
    'pv_push_verified "${branch}" || fail_commit "push を実行できなかった" "push の前提（ブランチ名）が不正"',
    'PV_OUTCOME=push-failed',
  ]
  for (const line of good) for (const { label, test: fires } of PATTERNS) assert.ok(!fires(line), `${label} が正当な行に発火: ${line}`)
})

test('自己検査: バックスラッシュ行継続を連結してから検査する（行をまたぐ分割で素通りしない）', () => {
  const cases = [
    ['gh api repos/o/r/issues \\\n  -X PUT', '書き込み系の HTTP メソッド'],
    ['gh api repos/o/r/issues \\\n  -f title=x', 'gh api の書き込み系（-f / -F / --field / --raw-field / --input による暗黙 POST）'],
    ['git push \\\n  --force origin HEAD', 'git push の --force 系'],
    ['git commit \\\n  -n -m x', 'git commit -n（--no-verify の短縮）'],
    ['git push origin \\\n  ":refs/heads/main"', 'git push は許可形（git push --no-follow-tags origin "HEAD:refs/heads/${branch}"）以外を拒否'],
    ['git \\\n  remote add evil x', 'git remote（get-url 以外）'],
  ]
  for (const [text, label] of cases) {
    const lines = codeLines(text)
    assert.equal(lines.length, 1, `連結されて 1 行になる: ${JSON.stringify(text)}`)
    const p = PATTERNS.find((x) => x.label === label)
    assert.ok(p, label)
    assert.ok(p.test(lines[0].l), `${label} が連結後に発火しない: ${lines[0].l}`)
  }
  // 連結しても正当な行は誤検出しない。コメント行と継続のない行はそのまま
  const ok = codeLines('# gh pr merge 1\nx=1\ngh_api graphql \\\n  -f query="${Q}" \\\n  -F owner="${o}"\ny=2')
  assert.deepEqual(ok.map((x) => x.n), [2, 3, 6])
  for (const { l } of ok) for (const { label, test: fires } of PATTERNS) assert.ok(!fires(l), `${label}: ${l}`)
})

test('/rulesets を含むコード行は merge-gate.sh の読み取り 1 行だけで、書き込み系の綴りを伴わない', () => {
  const found = []
  for (const { name, path } of targets()) {
    for (const { n, l } of codeLines(readFileSync(path, 'utf8'))) if (/\/rulesets\b/.test(l)) found.push({ name, n, l: l.trim() })
  }
  assert.deepEqual(found.map((f) => f.name), ['merge-gate.sh'], `許可は merge-gate.sh の 1 行だけ: ${JSON.stringify(found)}`)
  assert.match(found[0].l, /^gh_api "\$\{repo_path\}\/rulesets\/\$\{id\}" \|\| stop server-enforcement-missing g0 ruleset-fetch 1$/)
})

test('git worktree remove / unlock と git branch -D の許可形は worktree-remove.sh だけにあり、決まった行（remove 2 形・unlock 1 形・branch -D 1 形）だけが存在する', () => {
  const found = { worktree: [], branch: [] }
  for (const { name, path } of targets()) {
    for (const { n, l } of codeLines(readFileSync(path, 'utf8'))) {
      if (GIT_WORKTREE_RM_CALL.test(l)) found.worktree.push({ name, n, l: l.trim() })
      if (GIT_BRANCH_DELETE_CALL(l)) found.branch.push({ name, n, l: l.trim() })
    }
  }
  assert.deepEqual([...new Set([...found.worktree, ...found.branch].map((f) => f.name))], ['worktree-remove.sh'], JSON.stringify(found))
  assert.deepEqual(
    found.worktree.map((f) => f.l),
    [
      'git worktree unlock -- "${path}" >/dev/null 2>&1 || rc=$?',
      'git worktree remove --force -- "${path}" >/dev/null 2>&1 || rc=$?',
      'git worktree remove -- "${path}" >/dev/null 2>&1 || rc=$?',
    ],
  )
  assert.deepEqual(found.branch.map((f) => f.l), ['git branch -D -- "${branch}" >/dev/null 2>&1 || rc=$?'])
  for (const f of [...found.worktree, ...found.branch]) assert.ok(GIT_WORKTREE_RM_ALLOWED.test(f.l) || GIT_BRANCH_DELETE_ALLOWED.test(f.l), f.l)
})

test('git worktree prune は worktree-remove.sh の safe_prune の中の 1 行だけにある（ほかのスクリプト・ほかの位置・ほかの形は拒否する）', () => {
  const found = []
  for (const { name, path } of targets()) {
    for (const { n, l } of codeLines(readFileSync(path, 'utf8'))) if (GIT_SUB('worktree').test(l) && /\bprune\b/.test(l)) found.push({ name, n, l: l.trim() })
  }
  assert.deepEqual(found.map((f) => [f.name, f.l]), [['worktree-remove.sh', 'git worktree prune >/dev/null 2>&1 || true']], JSON.stringify(found))
  const lines = codeLines(readFileSync(targets().find((t) => t.name === 'worktree-remove.sh').path, 'utf8'))
  const start = lines.findIndex((x) => x.l === 'safe_prune() {')
  const end = lines.findIndex((x, i) => i > start && x.l === '}')
  assert.ok(start >= 0 && end > start, 'safe_prune の定義がある')
  assert.ok(found[0].n > lines[start].n && found[0].n < lines[end].n, `prune は safe_prune の中: ${found[0].n} / ${lines[start].n}-${lines[end].n}`)
})

test('worktree-remove.sh の check-absent ブロックは読み取り専用: git は worktree list --porcelain だけ、prune・remove・unlock・branch・rm を持たず、emit_remove で必ず exit する。許可形の 3 行列挙は増えない', () => {
  const src = readFileSync(targets().find((t) => t.name === 'worktree-remove.sh').path, 'utf8')
  const lines = codeLines(src).map((x) => x.l)
  const start = lines.findIndex((l) => l === 'if [ "${cmd}" = check-absent ]; then')
  const end = lines.findIndex((l, i) => i > start && l === 'if [ "${cmd}" = remove ]; then')
  assert.ok(start >= 0 && end > start, 'check-absent ブロックが remove ブロックの前にある')
  const block = lines.slice(start, end)
  assert.equal(block[block.length - 2], '  emit_remove ""', 'ブロックの最後で emit_remove（内部で exit 0）する')
  const gits = block.filter((l) => /\bgit\b/.test(l))
  assert.deepEqual(gits.map((l) => l.trim()), ['ca_list=$(git worktree list --porcelain 2>/dev/null) || { ca_ok=0; ca_list=""; }'])
  // 変数展開（${branch} 等）は語として数えない
  assert.doesNotMatch(block.join('\n').replace(/\$\{[^}]*\}/g, ''), /\b(prune|unlock|remove|branch|rm|clean|reset|checkout)\b/)
  // check-absent の純関数（lib）も git・rm・cd 以外の副作用を持たない
  const lib = readFileSync(targets().find((t) => t.name === 'lib/worktree-remove-lib.sh').path, 'utf8')
  const body = lib.slice(lib.indexOf('wr_loose_real() {'), lib.indexOf('# 破棄時のブランチの扱い。'))
  const bodyCode = codeLines(body).map((x) => x.l).join('\n').replace(/2>\/dev\/null/g, '')
  assert.doesNotMatch(bodyCode, /\bgit\b|\brm\b|>|\bmkdir\b|\btouch\b/)
})

test('git add / git commit の許可形は recover-prep.sh だけにあり、決まった 1 行（git -C "${path}" の WIP コミット）だけが存在する。フックを回避する綴りを伴わない', () => {
  const found = []
  for (const { name, path } of targets()) {
    for (const { n, l } of codeLines(readFileSync(path, 'utf8'))) if (GIT_ADD_COMMIT_CALL.test(l)) found.push({ name, n, l: l.trim() })
  }
  assert.deepEqual(found.map((f) => f.name), ['recover-prep.sh'], JSON.stringify(found))
  assert.equal(found.length, 1, '許可形は 1 行だけ')
  assert.ok(GIT_WIP_ALLOWED.test(found[0].l), found[0].l)
  assert.equal(found[0].l, 'git -C "${path}" add -A >&2 && git -C "${path}" commit -q -m "wip(recover): 中断時の未コミット変更を退避" </dev/null >&2 || crc=$?')
  // 同じ行がフック回避の綴りを持たない（--no-verify の省略形・-n）。--no-verbose のような別のオプションは --no-verify の検査に誤検出されない
  for (const p of PATTERNS.filter((x) => x.label === '--no-verify' || x.label.startsWith('git commit -n'))) assert.equal(p.test(found[0].l), false, p.label)
  assert.equal(PATTERNS.find((x) => x.label === '--no-verify').test('git commit --no-verbose'), false)
})

test('recover-prep.sh はブランチの削除・reset・checkout・clean・stash・push・マージを持たない（読み取りと WIP コミットと base の fetch だけ）。fetch は refs/remotes/origin/ へ保存する 1 形', () => {
  const path = targets().find((t) => t.name === 'recover-prep.sh').path
  const code = codeLines(readFileSync(path, 'utf8')).map((x) => x.l)
  const joined = code.join('\n')
  assert.doesNotMatch(joined, /\bgit\b[^\n|;&]*\b(clean|reset|checkout|switch|restore|stash|push|merge|rebase|cherry-pick|branch|update-ref|tag|gc|prune|rm|mv)\b/)
  assert.doesNotMatch(joined, /\brm\b/)
  // git worktree は一覧の読み取り（list）だけ
  const worktreeCalls = code.filter((l) => /\bgit\b[^\n|;&]*\bworktree\b/.test(l)).map((l) => l.trim())
  assert.ok(worktreeCalls.length >= 1 && worktreeCalls.every((l) => /\bgit worktree list --porcelain\b/.test(l)), JSON.stringify(worktreeCalls))
  const fetches = code.filter((l) => /\bgit\b[^\n|;&]*\bfetch\b/.test(l)).map((l) => l.trim())
  assert.deepEqual(fetches, ['if git fetch origin "refs/heads/${base}:refs/remotes/origin/${base}" >/dev/null 2>&1; then'])
})

test('git update-ref の許可形は base-merge.sh と pr-push.sh の -d だけで、対象の変数 base_ref / branch_ref は refs/worktree/ 配下の固定値だけを持つ', () => {
  const calls = []
  const assigns = []
  for (const { name, path } of targets()) {
    for (const { n, l } of codeLines(readFileSync(path, 'utf8'))) {
      if (GIT_UPDATE_REF_CALL.test(l)) calls.push({ name, n, l: l.trim() })
      if (refBinding(l)) assigns.push({ name, n, l: l.trim() })
    }
  }
  assert.deepEqual([...new Set(calls.map((c) => c.name))].sort(), ['base-merge.sh', 'pr-push.sh'], JSON.stringify(calls))
  for (const c of calls) assert.ok(GIT_UPDATE_REF_ALLOWED.test(c.l), c.l)
  assert.ok(assigns.length >= 4, `代入が見つかる: ${JSON.stringify(assigns)}`)
  for (const a of assigns) assert.ok(!refBindingRejected(a.l) && REF_ASSIGN_ALLOWED.test(a.l), `${a.name}:${a.n} ${a.l}`)
})

test('base_ref / branch_ref の束縛検査の自己検査: どんな束縛の形も許可した代入行以外は拒否し、読み出しだけの行は通す', () => {
  const bad = [
    'local base_ref="refs/heads/main"', 'readonly base_ref=refs/heads/main', 'declare base_ref=refs/heads/main', 'export base_ref=refs/heads/main', 'base_ref+=x',
    'read -r base_ref <<<"refs/heads/main"', 'printf -v base_ref %s refs/heads/main', ': "${base_ref:=refs/heads/main}"', 'x=1 base_ref=refs/heads/main',
    'true; base_ref=refs/heads/main', 'for base_ref in refs/heads/main; do :; done', 'base_ref="refs/worktree/a/base" branch_ref=refs/heads/main',
    'branch_ref=refs/heads/main', 'local branch_ref="refs/heads/x"', 'base_ref="refs/heads/main"', 'base_ref="refs/worktree/a/other"', 'base_ref="refs/worktree/a/base" # x',
    'base_ref="${other}"', 'base_ref=$(git rev-parse HEAD)', 'eval base_ref=refs/heads/main',
  ]
  for (const l of bad) assert.ok(refBindingRejected(l), `拒否されるべき: ${l}`)
  const good = ['base_ref="refs/worktree/base-merge/base"', '  branch_ref="refs/worktree/pr-push/branch"', 'git merge --no-ff --no-edit -F "${msgfile}" "${base_ref}"', 'git rev-parse --verify -q "${base_ref}^{commit}"', 'git checkout --detach "$branch_ref"']
  for (const l of good) assert.ok(!refBindingRejected(l), `通るべき: ${l}`)
})

test('worktree-remove.sh に rm の再帰削除・git clean・git checkout -- ・git reset --hard が無い（消せないものは保持して報告する）', () => {
  const path = targets().find((t) => t.name === 'worktree-remove.sh').path
  const code = codeLines(readFileSync(path, 'utf8')).map((x) => x.l).join('\n')
  assert.doesNotMatch(code, /\brm\b/, 'rm を使わない（一時ファイルも作らない）')
  assert.doesNotMatch(code, /\bgit\b[^\n|;&]*\b(clean|reset|checkout|restore|stash)\b/)
})

test('merge-gate.sh の gh_api() 本体は run_timed "${gh_timeout}" gh api "$@" の 1 形だけで、メソッド指定を含まない', () => {
  const path = targets().find((t) => t.name === 'merge-gate.sh').path
  const src = readFileSync(path, 'utf8')
  const defs = [...src.matchAll(/^gh_api\(\) \{\n([\s\S]*?)\n\}/gm)]
  assert.equal(defs.length, 1, 'gh_api() の定義は 1 つだけ')
  assert.equal(defs[0][1].trim(), 'run_timed "${gh_timeout}" gh api "$@"', 'ラッパー本体は固定の 1 形。-X / --method / --request などを足さない')
  // GET 以外になり得る環境変数・変数展開を gh api の直前に置く形も拒否する
  assert.ok(!/GH_M\b|\$\{?GH_METHOD/.test(src), 'メソッドを変数で切り替える足場がない')
})

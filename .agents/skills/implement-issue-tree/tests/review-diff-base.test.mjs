// implement-issue-tree の Review フェーズにおける diff 比較基準の決定的回帰テスト（Issue #315）。
//
// 背景: Review はローカルの <base-branch> ref を比較基準にしていたため、ローカル base が origin
// より遅れていると無関係な祖先コミットの差分までレビュー対象に混入していた（#297 で diff 417 行中
// 387 行がノイズとなり収束失敗）。修正は比較基準を `origin/<base-branch>...HEAD`（3 点ドット）へ
// 統一し、比較点をブランチの分岐点（merge-base）に固定する。
//
// 3 群構成:
//   群 A（プロンプト契約）: reviewPrompt() の出力が origin/<base> 基準であることを固定する。
//     ハードコード（`origin/main` 直書き）を検出できるよう base 名を 'main' 以外にする。
//   群 B（SKILL.md ↔ script の乖離防止）: 両者の文言が一致することを機械照合する。
//   群 C（git セマンティクス）: 使い捨てリポジトリで 3 点ドット diff の分岐点固定を実測する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { execFileSync } from 'node:child_process'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'implement-issue-tree.src.js',
)
const SKILL_MD_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'SKILL.md',
)
// マーカー文字列はソース中に 1 回しか現れてはならない（g0-gates.test.mjs が出現回数を固定して
// いる）ため、リテラルを直接書かず分割して組み立てる（他テストと同じ流儀）。
const DRIVER_MARKER = ['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_')

// ---------------------------------------------------------------------------
// 群 A: プロンプト契約（reviewPrompt の比較基準）
// ---------------------------------------------------------------------------
// globalThis.args を先に注入してから import することで、baseBranch が 'main'（既定値）以外の
// 'develop' に解決される。'origin/main' 直書きのハードコード回帰は、この base 名でのみ検出できる
// （base 名を 'main' のままにすると、正しい実装もハードコードも同じ文字列を出力し判別できない）。
// 別の一時ファイル・別の import URL へ切り出すため、args 未定義前提の g0-gates.test.mjs 等とは
// 別モジュール実体になり競合しない（node --test はテストファイルごとに別プロセスで実行される）。
// 注（PR #345 Cursor Bugbot 指摘への回答）: 未宣言のベア識別子 `args` は、静的 import・動的
// import・ファイルの先後を問わず、モジュールのレキシカルスコープに束縛が無ければ最終的に
// globalThis のプロパティ探索へフォールバックする（Node の ESM でも変わらない）。このファイルの
// 「群A」テスト自体が `origin/develop`（'main' ではない）に一致することをアサートしており、
// 実行結果（`node --test` 群A 全 pass）が baseBranch が正しく 'develop' に解決されている実測
// 証拠になっている。
globalThis.args = { parent: 1, branch: 'develop' }

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) {
  throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない（削除・改名は回帰テストを無効化する）`)
}
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-reviewbase-'))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
// 実装スクリプトは Workflow ランタイムの制約により `export const meta` 以外の top-level export を
// 持てない（他に export があると起動時に SyntaxError となりスクリプト全体が実行不能になる）ため、
// 定義部は非 export のまま置き、テスト側で切り出したスライスへ export 文を付与して読み込む。
const SLICE_EXPORTS = ['reviewPrompt']
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

const mod = await import(pathToFileURL(slicePath).href)
const { reviewPrompt } = mod

const item = { number: 315 }
const impl = { branch: 'fix/315-review-diff-base' }
const output = reviewPrompt(item, impl)

test('群A: reviewPrompt は origin/<base> 基準の 3 点ドット diff を指示する', () => {
  assert.equal(typeof reviewPrompt, 'function')
  assert.match(output, /git diff origin\/develop\.\.\.HEAD/)
})

test('群A: reviewPrompt はローカル base 基準（origin/ なし）を含まない（ハードコード検出）', () => {
  // 'git diff develop...' は 'git diff origin/develop...' の部分文字列に一致しないため、
  // 正しい実装ではこの負のアサーションが常に成立する。
  assert.doesNotMatch(output, /git diff develop\.\.\.HEAD/)
})

test('群A: 旧文言「origin/<base> ではなくローカルの base ブランチと比較」を含まない（revert 検出）', () => {
  assert.doesNotMatch(output, /ではなくローカルの.*ブランチと比較/)
})

// ---------------------------------------------------------------------------
// 群 B: SKILL.md ↔ script の乖離防止
// ---------------------------------------------------------------------------
const skillMd = readFileSync(SKILL_MD_PATH, 'utf8')

test('群B: SKILL.md の Review 条件は origin/<base-branch> 基準の 3 点ドット diff を記載する', () => {
  assert.match(skillMd, /git diff origin\/<base-branch>\.\.\.HEAD/)
})

test('群B: SKILL.md はローカル base 基準（origin/ なし）の diff コマンドを含まない', () => {
  assert.doesNotMatch(skillMd, /`git diff <base-branch>\.\.\.HEAD`/)
})

test('群B: SKILL.md は旧文言「origin/<base-branch> ではなくローカルの base ブランチと比較」を含まない', () => {
  assert.doesNotMatch(skillMd, /origin\/<base-branch>\s*ではなくローカルの base ブランチと比較/)
})

// fixPrompt() は Workflow ハーネス依存の駆動部の下にあり import できないため、他テストと同じ
// 流儀（merge-loop-rescan.test.mjs 等）でソース走査により固定する。reviewPrompt と同じ乖離
// （SKILL.md だけ直して script の push 前 fix 分岐が旧文言のまま残る revert）を検出する。
test('群B: fixPrompt の push 前分岐は origin/<base> へ merge する（ローカル base への revert 検出）', () => {
  assert.match(source, /git merge origin\/\$\{baseBranch\}/)
  // \b は使わない — `}` の直後が全角括弧等の非単語文字だと語境界が成立せずマッチしない
  // （実測: 旧文言 `git merge ${baseBranch}（ローカル）` で \b 付きは false になり検出できない）。
  assert.doesNotMatch(source, /git merge \$\{baseBranch\}/)
})

// ---------------------------------------------------------------------------
// 群 C: git セマンティクス（使い捨てリポジトリで A〜D シナリオを実測）
// ---------------------------------------------------------------------------
// ネットワークは使わず、bare リポジトリをローカルパスの remote として使う。
// コミット identity・署名・既定ブランチ名は実行環境のユーザー設定に依存させない。
// 作業ディレクトリは必ず temp 配下（対象リポジトリの working copy には一切触れない）。
function git(cwd, args) {
  return execFileSync('git', args, {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: 'test',
      GIT_AUTHOR_EMAIL: 'test@example.com',
      GIT_COMMITTER_NAME: 'test',
      GIT_COMMITTER_EMAIL: 'test@example.com',
    },
  }).trim()
}

// #297 の実際の発生順序を再現する: (1) base コミットを push、(2) feature ブランチを作成する
// *前に* 別の PR マージ相当で origin/main を進める（unrelated.yml）、(3) feature は進行後の
// origin/main（Implement フェーズと同じ切り方）から作成する、(4) work 側のローカル main ref は
// 一度も fetch/更新しない（＝「ローカル base が origin より遅れている」状態）。
// このためローカル main は unrelated.yml の祖先であり、merge-base(ローカル main, feature) が
// ローカル main 自身になり、3 点ドット diff でも unrelated.yml が混入する。
function buildFixture() {
  const root = mkdtempSync(join(tmpdir(), 'implement-issue-tree-diffbase-'))
  const bareDir = join(root, 'origin.git')
  const workDir = join(root, 'work')
  mkdirSync(bareDir)
  mkdirSync(workDir)
  git(bareDir, ['-c', 'init.defaultBranch=main', 'init', '--bare'])
  git(workDir, ['-c', 'init.defaultBranch=main', 'init'])
  git(workDir, ['remote', 'add', 'origin', bareDir])

  writeFileSync(join(workDir, 'base.txt'), 'base\n')
  git(workDir, ['add', 'base.txt'])
  git(workDir, ['-c', 'commit.gpgsign=false', 'commit', '-m', 'base'])
  git(workDir, ['push', 'origin', 'HEAD:refs/heads/main'])
  // work 側のローカル main はここで固定（以降このまま更新しない＝取り込み忘れの再現）。

  // 別プロセス（別の並列イシューの先行マージ相当）が origin/main を先に進める。
  const bareWorkDir = join(root, 'origin-updater')
  mkdirSync(bareWorkDir)
  git(bareWorkDir, ['clone', bareDir, '.'])
  writeFileSync(join(bareWorkDir, 'unrelated.yml'), 'unrelated\n')
  git(bareWorkDir, ['add', 'unrelated.yml'])
  git(bareWorkDir, ['-c', 'commit.gpgsign=false', 'commit', '-m', 'unrelated change on origin/main'])
  git(bareWorkDir, ['push', 'origin', 'HEAD:refs/heads/main'])

  // work 側は origin/main（進行後）を fetch してから、進行後の origin/main を起点に feature を
  // 作成する（Implement フェーズが `git fetch origin && git checkout -B <branch> origin/<base>`
  // で切るのと同じ手順）。ローカル main 自体は更新しないため、ローカル main は origin/main より
  // 遅れたままになる。
  git(workDir, ['fetch', 'origin', 'main'])
  git(workDir, ['checkout', '-b', 'feature', 'origin/main'])
  writeFileSync(join(workDir, 'feature.txt'), 'feature\n')
  git(workDir, ['add', 'feature.txt'])
  git(workDir, ['-c', 'commit.gpgsign=false', 'commit', '-m', 'feature'])

  return { workDir, bareDir }
}

test('群C: ローカル main 基準（現行の壊れた挙動）は無関係ファイルを含む（#297 再現）', () => {
  const { workDir } = buildFixture()
  git(workDir, ['checkout', 'feature'])
  const files = git(workDir, ['diff', 'main...HEAD', '--name-only']).split('\n').filter(Boolean)
  assert.ok(files.includes('feature.txt'))
  assert.ok(files.includes('unrelated.yml'), 'ローカル base 基準では origin 側の無関係な変更が混入する')
})

test('群C: origin/main 基準（修正後）は無関係ファイルを含まない（fetch 済みの remote-tracking ref を使用）', () => {
  const { workDir } = buildFixture()
  git(workDir, ['checkout', 'feature'])
  // feature は fetch 済みの origin/main（unrelated.yml 込み）を起点に作成されているため、
  // merge-base(origin/main, feature) は origin/main 自身になり、diff は feature 由来の変更のみ。
  const files = git(workDir, ['diff', 'origin/main...HEAD', '--name-only']).split('\n').filter(Boolean)
  assert.deepEqual(files, ['feature.txt'])
})

test('群C: 先行マージ（別イシューの PR マージ相当）で origin がさらに進行した後・fetch 前後いずれも比較点は不変（受入基準4）', () => {
  const { workDir, bareDir } = buildFixture()
  git(workDir, ['checkout', 'feature'])
  const beforeAnotherMerge = git(workDir, ['diff', 'origin/main...HEAD', '--name-only']).split('\n').filter(Boolean)
  assert.deepEqual(beforeAnotherMerge, ['feature.txt'])

  // parallel >= 2 の別イシューが先に PR をマージし、origin/main がさらに進む（このラン中の
  // 自 worktree は関与しない別プロセスによる更新）。
  const anotherRoot = mkdtempSync(join(tmpdir(), 'implement-issue-tree-diffbase-another-'))
  git(anotherRoot, ['clone', bareDir, '.'])
  writeFileSync(join(anotherRoot, 'another-feature.txt'), 'another\n')
  git(anotherRoot, ['add', 'another-feature.txt'])
  git(anotherRoot, ['-c', 'commit.gpgsign=false', 'commit', '-m', 'another merged PR'])
  git(anotherRoot, ['push', 'origin', 'HEAD:refs/heads/main'])

  // fetch 前: work 側の origin/main remote-tracking ref はまだ古い sha のまま。
  const beforeFetch = git(workDir, ['diff', 'origin/main...HEAD', '--name-only']).split('\n').filter(Boolean)
  assert.deepEqual(beforeFetch, ['feature.txt'], 'fetch 前: 別イシューの先行マージは work 側の origin/main にまだ反映されていない')

  git(workDir, ['fetch', 'origin', 'main'])
  const afterFetch = git(workDir, ['diff', 'origin/main...HEAD', '--name-only']).split('\n').filter(Boolean)
  assert.deepEqual(afterFetch, ['feature.txt'], 'fetch 後: origin/main の remote-tracking ref が別 sha（another-feature.txt 込み）へ更新されても、merge-base(origin/main, feature) は分岐点のまま変わらない')
})

// ---------------------------------------------------------------------------
// 群 D: base の最新化契約（Issue #361）
// ---------------------------------------------------------------------------
// 背景: #315 の修正（比較基準を origin/<base> へ統一）に対し、下流 5 リポの同期 PR で
// codex / Cursor Bugbot から 2 系統の指摘が出た。
//   系統 A: fetch する条件が「ref を解決できない場合だけ」なので、ref が存在していて古い
//           ケースでは更新されず、merge-base が実際の分岐点より手前に落ちて base 側の
//           無関係なコミットが差分へ混入する（#315 が解こうとした不具合が回復経路で残る）。
//   系統 B: `git fetch origin <base>` のように取得元だけを与えた refspec は FETCH_HEAD を
//           更新するだけで refs/remotes/origin/<base> の作成・更新を保証しないため、
//           fetch が成功しても続く解決に失敗し、実施可能なレビューを blocked で落とす。
// 両者は逆方向を向く（「必ず fetch して fail-closed」vs「fetch 成功でも blocked になる」）ため、
// 別々に直すと「必ず fetch → ref は作られない → 必ず blocked」という最悪の組み合わせになる。
// 解は 1 つ: **無条件 fetch + 保存先を明示した refspec + 失敗時 fail-closed**。
// この群はその 3 点が同時に成立し続けることを固定する。

test('群D: reviewPrompt は保存先を明示した refspec で base を取得する', () => {
  assert.match(output, /git fetch origin develop:refs\/remotes\/origin\/develop/)
})

test('群D: reviewPrompt の base 取得は条件付きでない（ref 不在時のみ fetch する旧形式の検出）', () => {
  // 旧実装: 「rev-parse ... が失敗した場合、git fetch origin <base> を 1 回だけ試みる」
  assert.doesNotMatch(output, /が失敗した場合、[\s\S]{0,40}git fetch origin develop を 1 回だけ試みる/)
})

test('群D: reviewPrompt は「fetch 不要」という旧説明を含まない（revert 検出）', () => {
  assert.doesNotMatch(output, /fetch 不要/)
})

test('群D: reviewPrompt は fetch 失敗と fetch 後の解決失敗の両方で blocked へ倒す', () => {
  assert.match(output, /fetch が失敗した場合/)
  assert.match(output, /fetch 後に[\s\S]{0,200}解決できない場合/)
  assert.match(output, /state: "blocked"/)
})

// implementPrompt / fixPrompt は駆動部の下にあり import できないため、他の群と同じ流儀で
// ソース走査により固定する。0b-b（残存リモートブランチの回復）は手順 2 の `git fetch origin` を
// スキップするため、この経路だけ base が古いまま取り残される固有の穴があった。
test('群D: 0b-b のリモートブランチ回復経路でも base を refspec 付きで取得する', () => {
  assert.match(
    source,
    /git fetch origin <branch> && git checkout -B <branch> origin\/<branch>[\s\S]{0,400}git fetch origin \$\{baseBranch\}:refs\/remotes\/origin\/\$\{baseBranch\}/,
  )
})

test('群D: base を対象とする fetch は全箇所で保存先明示 refspec を使う', () => {
  // `git fetch origin ${baseBranch}` の直後がコロンでない出現を許さない。
  // `git fetch origin &&`（全 ref を既定 refspec で取得する形）は対象外。
  const bare = source.match(/git fetch origin \$\{baseBranch\}(?!:)/g) ?? []
  assert.deepEqual(
    bare,
    [],
    `保存先を明示しない base fetch が ${bare.length} 件残っている（FETCH_HEAD しか更新されず ref 解決に失敗し得る）`,
  )
})

test('群D: SKILL.md も保存先明示 refspec と無条件取得を記載する', () => {
  assert.match(skillMd, /git fetch origin <base-branch>:refs\/remotes\/origin\/<base-branch>/)
  assert.match(skillMd, /必ず 1 回実行/)
  assert.doesNotMatch(skillMd, /fetch 不要/)
})

// --- git セマンティクスの実測（系統 B が実在することの証拠） ---
// remote.origin.fetch を持たない remote（custom refspec 設定・手動 remote 追加で実際に起きる）
// を作り、bare refspec と保存先明示 refspec の挙動差を実測する。
function buildNoRefspecFixture() {
  const root = mkdtempSync(join(tmpdir(), 'implement-issue-tree-refspec-'))
  const bareDir = join(root, 'origin.git')
  const seedDir = join(root, 'seed')
  const workDir = join(root, 'work')
  mkdirSync(bareDir)
  git(bareDir, ['init', '--bare', '--initial-branch=main', '.'])

  mkdirSync(seedDir)
  git(seedDir, ['init', '--initial-branch=main', '.'])
  writeFileSync(join(seedDir, 'base.txt'), 'base\n')
  git(seedDir, ['add', '.'])
  git(seedDir, ['commit', '-m', 'base'])
  git(seedDir, ['remote', 'add', 'origin', bareDir])
  git(seedDir, ['push', 'origin', 'main'])

  // remote.origin.fetch を設定せずに remote を登録する（`git remote add` は既定で
  // refspec を書き込むため、url だけを直接 config へ書く）。
  mkdirSync(workDir)
  git(workDir, ['init', '--initial-branch=main', '.'])
  git(workDir, ['config', 'remote.origin.url', bareDir])
  return { workDir }
}

test('群D: refspec を省いた fetch は remote-tracking ref を作らない（系統 B の実測）', () => {
  const { workDir } = buildNoRefspecFixture()
  git(workDir, ['fetch', 'origin', 'main'])
  // fetch 自体は成功する（FETCH_HEAD は書かれる）
  assert.doesNotThrow(() => git(workDir, ['rev-parse', '--verify', 'FETCH_HEAD']))
  // しかし比較基準として使う remote-tracking ref は作られない
  assert.throws(
    () => git(workDir, ['rev-parse', '--verify', 'refs/remotes/origin/main']),
    /.*/,
    'refspec を省いた fetch で remote-tracking ref が作られてしまった（前提が変わった可能性）',
  )
})

test('群D: 保存先を明示した refspec なら remote-tracking ref が作られる（修正の妥当性）', () => {
  const { workDir } = buildNoRefspecFixture()
  git(workDir, ['fetch', 'origin', 'main:refs/remotes/origin/main'])
  const sha = git(workDir, ['rev-parse', '--verify', 'refs/remotes/origin/main'])
  assert.match(sha, /^[0-9a-f]{40}$/)
})

test('群D: 古い remote-tracking ref は明示 refspec の再 fetch で前進する（系統 A の実測）', () => {
  const { workDir } = buildNoRefspecFixture()
  git(workDir, ['fetch', 'origin', 'main:refs/remotes/origin/main'])
  const before = git(workDir, ['rev-parse', 'refs/remotes/origin/main'])

  // 別の作業者が origin/main を進める（先行 PR のマージ相当）
  const bareUrl = git(workDir, ['config', '--get', 'remote.origin.url'])
  const other = mkdtempSync(join(tmpdir(), 'implement-issue-tree-refspec-other-'))
  git(other, ['clone', bareUrl, '.'])
  writeFileSync(join(other, 'advance.txt'), 'advance\n')
  git(other, ['add', '.'])
  git(other, ['commit', '-m', 'advance'])
  git(other, ['push', 'origin', 'main'])

  // 「ref は存在するので fetch しない」旧挙動では before のまま据え置かれる。
  // 無条件 + 明示 refspec の新挙動では前進する。
  git(workDir, ['fetch', 'origin', 'main:refs/remotes/origin/main'])
  const after = git(workDir, ['rev-parse', 'refs/remotes/origin/main'])
  assert.notEqual(after, before, '既存 ref があると再 fetch されず古いままになる（系統 A の再現）')
})

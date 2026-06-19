---
name: implement-issue-tree
description: >
  親イシュー配下のサブイシュー（孫含む）を依存順を保ちつつ worktree で並列に自動実装・push 前 review・PR 作成・CI 監視・squash merge まで一括自動化。
  「イシューツリーを並列実装」「配下のサブイシューをまとめて実装」「ツリー全体を並列で実装して」「イシュー階層を自動開発」で使用。
  per-issue 計画立案（Plan: opus）→実装（Implement: sonnet）の分業。push 前 review（Review 通過後にのみ push・PR 作成して CI を 1 回だけ起動）。
  外部チェック自動判定（Cursor Bugbot 非導入リポでも不要待機なし）。並列度（parallel）と依存（dependsOn）で実行順を制御。
  単一イシューの実装は implement-issue、PR レビューは implement-review-pr を参照。
model: opus
user-invocable: true
argument-hint: "<親イシュー番号> [マージ先ブランチ（省略時 main）] [並列度（省略時 3）]"
---

# implement-issue-tree

親イシュー番号を指定し、配下のサブイシュー（孫含む）を依存順を保ちつつ worktree で並列に自動実装・ローカル diff レビュー・push + PR 作成・CI 監視・squash merge まで自動化する Workflow を起動する。

CI リソース節約のため「push 前 review」設計を採用している。Implement フェーズではローカルブランチにコミットのみ積み、Review が全通過した後にはじめて push・PR 作成を行う。Review が収束失敗した場合は push も PR も作らないため、CI が一切起動しない。

末端の実装イシューは post-order DFS の順序を優先度として空きスロットへ貪欲投入し、最大 `parallel`（既定 3）件まで並列実行する。各 implement / fix は独立した git worktree で隔離実行されるため、並列でもブランチ・working copy が衝突しない。機能的依存（`dependsOn`）と親子関係（親は全子の完了を待つ verify-close）だけが待機条件となる。

## 前提条件

- `gh` CLI がインストールされ、認証済みであること（`gh auth status` で確認）
- git working tree が clean であること（`git status` で確認）
- マージ先ブランチが CI green の状態であること
- 対象リポジトリへの書き込み権限があること
- 親イシューと子イシューが GitHub の sub-issues API で紐付いていること（紐付けは `create-issue` / `create-issue-tree` を参照）

## 使い方

Workflow ツールで `scriptPath` にこのスキルディレクトリ内の `script/implement-issue-tree.js` を指定して起動する。パスは導入形態で異なる:

- `skills/` レイアウトの upstream リポジトリ（`Fandhe-AI/agent-cli-skills`）: `skills/implement-issue-tree/script/implement-issue-tree.js`
- `npx skills add Fandhe-AI/agent-cli-skills` で導入したリポジトリ、または `.claude/skills/` に配置したリポジトリ（本リポジトリ含む）: `.claude/skills/implement-issue-tree/script/implement-issue-tree.js`

```json
{
  "scriptPath": "<このスキルディレクトリ>/script/implement-issue-tree.js",
  "args": {
    "parent": "<親イシュー番号>",
    "branch": "<マージ先ブランチ（省略時 main）>",
    "parallel": "<並列度 1〜8（省略時 3）>"
  }
}
```

例: 親イシュー `#42` の配下を `main` へ、並列度 3 でマージする場合:

```json
{
  "scriptPath": ".claude/skills/implement-issue-tree/script/implement-issue-tree.js",
  "args": { "parent": 42, "branch": "main", "parallel": 3 }
}
```

### 引数

| 引数 | 必須 | 既定 | 説明 |
|------|------|------|------|
| `parent` | 必須 | — | 親（ルート）イシュー番号。`issue` でも可 |
| `branch` | 任意 | `main` | マージ先ブランチ。不正な文字を含む場合はエラー |
| `parallel` | 任意 | `3` | 並列実行数（1〜8）。`1` を指定すると実質的に直列実行になる |

## フロー

### Step 1: ツリーを取得して依存グラフ付き実行キューを構築する（Tree）

gh CLI の sub-issues API で親イシュー配下の全ツリーを再帰取得し、post-order DFS で実行キューを構築する。各 open イシューは本文を読んで機能的依存（`dependsOn`）を抽出する。

ツリー取得に続いて、直前 3 件の merged PR の check-runs から GitHub Actions 以外の外部チェック App（例: Cursor Bugbot）を自動検出する。検出結果は後続の Merge ステップで使用する（外部チェック待機の要否を制御する）。

```bash
# 親イシューのサブイシューを取得（--paginate で 100 件超も全ページ自動取得）
gh api --paginate "repos/{owner}/{repo}/issues/<parent>/sub_issues?per_page=100"

# 各 open イシューの本文を読み、機能的依存を抽出
gh issue view <N>

# 外部チェック自動判定（直前 3 件の merged PR の check-runs を確認）
REPO=$(gh repo view --json owner,name --jq '"\(.owner.login)/\(.name)"')
gh pr list --state merged --limit 3 --json headRefOid --jq '.[].headRefOid' \
  | xargs -I{} sh -c 'gh api "repos/${REPO}/commits/$1/check-runs" \
      --jq '"'"'[.check_runs[] | select(.app.slug != "github-actions") | .app.slug] | .[]'"'"' 2>/dev/null' _ {} \
  | sort -u
```

実行キューと依存グラフの構築ルール:
- 同一親内のサブイシューは sub_issues API 返却順（`siblingIndex`）で並べる
- 子イシューがすべて完了してから親イシューを処理する（親ノードは verify-close）
- closed 済みイシューは自動でスキップする
- `dependsOn` には「機能的に先行完了が必須」のイシュー番号のみを入れる（本文の明示的な依存記述・前提実装に限る。単なる関連やコンフリクトの可能性だけなら含めない）
- 祖先イシューへの `dependsOn` は無視する（親は子の完了を待つ側のため）
- 依存グラフに循環がある場合は DFS で検出し、循環を構成する非ツリー辺（`dependsOn`）を除去してデッドロックを防ぐ

### Step 2: 中断作業の回復可否を per-issue で判断する（Recover）

各末端イシューに着手する前に、残骸 worktree / ブランチが存在するかを確認する。**既存作業がなければ Recover をスキップして Plan へ進む**。既存作業がある場合は Recover phase（opus エージェント）が「途中作業を継続できるか」を判断し、その結果に応じて以下のどちらかへ分岐する。

- **continue（継続）**: 既存 branch をそのまま checkout し、回復ブリーフ（done / remaining / broken の要約）を Implement へ渡して続きから実装する。Plan はスキップされる。Recover が直接 Review へ進むことはなく、継続作業は必ず Implement → Review → Merge を経由する。
- **discard（破棄）**: 既存 worktree と branch を自動削除し、通常の Plan → Implement（新規 branch）で再実行する。

**Recover の判断軸は Review とは別**である。Review は「実装が正しいか・マージできるか」を判定するのに対し、Recover は「この途中作業から継続するのが妥当か」を判断する。動かない・未完成でも方向が妥当なら continue（残りは Implement が完成させる）。

**未 commit 変更は WIP commit として branch へ退避してから worktree を削除する**ため、continue / discard どちらの経路でもデータを失わない。discard の場合は WIP commit を残した状態で branch を削除するため、誤判定時に reflog から救出できる。

### Step 3: イシューごとに実装計画を立案する（Plan）

各 末端イシューを実装する前に、opus エージェントで実装計画を立案する（worktree なし・読み取りのみ）。計画は Implement エージェントへ引数で渡す（worktree 跨ぎのファイル参照を避けるため）。

**Recover phase で continue 判定が出た場合は Plan をスキップ**し、回復ブリーフを受け取った Implement エージェントが既存 branch から直接実装を続行する。

計画には以下を含める:
- 背景・目的（イシューが解決する課題）
- 対象ファイル・変更箇所（パスと変更内容の概要）
- 実装ステップ（順番に実行可能な具体的手順）
- 検証方法（ビルド・lint・テスト・動作確認の手順）
- OWASP Top 10 観点のセキュリティ考慮事項

計画エージェントが異常終了または計画本文が空の場合は、該当イシューを `failed` として記録して次へ進む。

### Step 4: 末端イシューを worktree 隔離で並列実装する（Implement）

末端の実装イシューを post-order DFS 順を優先度として空きスロットへ貪欲投入し、最大 `parallel`（既定 3）件まで並列実行する。各 implement / fix エージェントは**独立した git worktree** で隔離実行されるため、並列でもブランチ・working copy が衝突しない。

**ここでは push も PR 作成も行わない**。CI リソース節約のため、Review 通過後にまとめて 1 回だけ push・PR 作成する設計になっている。

各イシューの処理内容（Step 3 で立案した計画に従って実装する）:
0. **worktree routing ガード**（最初に実行）: `git remote get-url origin` とイシュータイトル照合でカレント worktree が正しいリポ・イシューに配置されているか確認する
0b. **既存 PR・リモートブランチを確認する**（中断再開・重複 PR 防止）:
   - 0b-a（open PR 検索）: `gh pr list --state open` でイシュー番号に対応する open PR が既に存在するか確認する。見つかれば新規 PR を作らずそのブランチを取得して続きから作業し、既存 PR 番号を返す
   - 0b-b（リモートブランチ再利用）: open PR が見つからない場合、`git ls-remote --heads origin` でイシュー番号を含むリモートブランチ（命名規約: `<type>/<N>-<short-name>`）が残っていないか確認する。「push 成功・PR 作成失敗」で残ったブランチを検出し、`git fetch origin <branch> && git checkout -B <branch> origin/<branch>` で取得して push 済みコミットを保持したまま続きを実装する（`origin/<base>` から新規作成し直さない）。branch 名として返し、prNumber は 0 のまま（PR は後続の PR Create フェーズが作成）
   - 0b-c: open PR もリモートブランチも存在しない場合のみ手順 1・2 で新規ブランチを作成する
1. 隔離 worktree で `git status` が clean か確認し、差分があれば作業せず失敗を返す
2. （0b-b でリモートブランチを再利用した場合はスキップ）指定ブランチ（デフォルト: `main`）から作業ブランチを作成する（並列時のブランチ名衝突を防ぐためブランチ名にイシュー番号を含める）
3. **渡された計画に従って実装する**（計画立案は Plan フェーズで完了済み）。実装は対象リポジトリの delegation ルール・専門サブエージェントがあればそれに従い役割単位で委譲する

   コメント方針（実装時）:
   - コードコメントは「何をするか」より「なぜ存在するか／パッケージ・サービスから見た対象の役割」を書く
   - 後続の読み手（Claude を含む）は渡された情報からしか判断できないため、他ファイル・他サービス・呼び出し元/呼び出し先からの観点を明示する（このシンボルがどこから呼ばれ、どの境界を担うか）
   - 詳細は対象リポジトリの `.claude/rules/code-comment-style.md`（`init-claude` が配備）に従う

4. 対象リポジトリの CLAUDE.md・rules・テスト実行規約に従いビルド・lint・テストを通す。テストが失敗した場合は根本原因を調査してから修正する（`.claude/rules/debugging.md` の4フェーズを順に踏む。同一箇所で3回失敗したらアーキテクチャ問題と判断し、該当イシューを `blocked` として記録してユーザーに状況を報告する）
5. 実装後に OWASP Top 10 観点でセキュリティチェックを実施する（API キーのハードコード・インジェクション等）。問題が見つかった場合は修正してから次へ進む
6. 実装が完了したら `create-commit` スキルに従い Conventional Commits で**実装コミットを 1 つ**作成する
7. **push・PR 作成はここでは行わない**。ローカルブランチにコミットを積んだ状態で終了し、後続の Review フェーズへ渡す

```bash
# 作業ブランチ作成例（並列時の衝突回避のためイシュー番号を含める）
git fetch origin && git checkout -B feat/<N>-<short-name> origin/<base-branch>

# 実装コミット（push しない）
git commit -m "feat(#<N>): 実装内容"
# → push・PR 作成は Review 全通過後に行う
```

### Step 5: push 前のローカル diff を独立レビューする（Review）

Implement 完了後・push 前に、worktree 隔離で独立 Review エージェントを起動してローカル diff をレビューする。**push・PR 作成は行わず**、ローカルコミットだけを対象にレビューする。Review エージェントは**修正を行わず判定のみ**を担う。

**CI リソース節約の目的**: Review が収束失敗した場合は push も PR 作成も行わないため、CI が一切起動しない。fix のたびに push → CI 実行を繰り返すコストを削減する。

レビューは以下の2段階で実施する。

**①仕様準拠レビュー**（先に実施）:
- イシューの要件・受け入れ条件を充足しているか確認する
- out-of-scope の実装が混入していないか確認する
- Plan フェーズの計画どおりに実装されているか確認する

**②コード品質レビュー**（①通過後に実施）:
- 可読性・重複・設計（アーキテクチャ準拠・命名規則）を確認する
- OWASP Top 10 セキュリティ（API キーのハードコード・インジェクション・認証認可等）を確認する

詳細は `implement-review` スキルを参照。

レビュー条件:
- `git checkout --detach <branch>` でローカルブランチを detached HEAD として取得する（`origin/<branch>` は push 前のため存在しない）
- `git diff <base-branch>...HEAD` でローカル diff を確認する（`origin/<base-branch>` ではなくローカルの base ブランチと比較）
- **Low（要改善）含む指摘が 1 件でも `needs-fix`**。指摘なしなら `ok`

`ok` の場合は push + PR 作成（Step 4.5）を経て Merge ステップへ進む。`needs-fix` の場合は fix エージェントで**ローカルに再コミット**し再レビューする（push しない）。**Review は最大 3 回**実施し、最終回（残り 0 回）の `needs-fix` では再レビューできないため fix を行わず収束失敗とする（修正後に必ず再レビューする原則を守るため。fix は実質最大 2 回）。3 回で収束しない場合は**push も PR 作成も行わず** `blocked` として記録して次のイシューへ進む。

Review / Merge の fix は `fixCount`（上限 6）を共有する。

### Step 5.5: Review 通過後に push + PR を作成する（PR Create）

Review が全通過（`ok`）した後にのみ実行する。この push が CI トリガーになる（push は 1 回のみ）。

```bash
# Review 通過後にはじめて push する（CI がここで起動する）
git push origin <branch>

# PR 作成（Closes でイシューと紐付け）
gh pr create \
  --base <branch> \
  --title "feat: イシュータイトル" \
  --body "$(cat <<'EOF'
## Summary
- 実装内容の要約

Closes #<N>
EOF
)"
```

PR 作成が失敗した場合は `failed` として記録し、`branch` を保存する。push が成功していた場合、次回再実行時に impl 手順 0b-b（リモートブランチ再利用）がそのブランチを検出して push 済みコミットを保持したまま回復する（open PR がない状態のため 0b-a の PR 検索では拾えない点に注意）。

### Step 6: CI / 外部チェック監視・レビューコメント解決確認・squash merge する（Merge）

`gh pr checks --watch` で CI を監視し、以下の全条件を満たした場合のみ squash merge する。

**マージ実行条件:**
1. **CI 全 green**: 全チェックが success / neutral / skipped で完了し、failure / cancelled / timed_out が 0 件かつ pending / queued / in_progress が 0 件であること。pending が残るなら監視を継続する。
2. **外部チェック指摘なし**（または外部チェックなし確定）: Step 1 の自動判定結果に基づき後述の待機手順を実施する。
3. **未解決レビューコメントなし**: GraphQL API で全スレッドが resolved 済みであること。

`gh pr checks --watch` が終了しても「watch が終わった」だけで合格にしない。`gh pr checks ${prNumber}` の出力で全チェックの結論を列挙して確認する。pending が残る場合は再 watch する。failure 等があれば修正エージェント（fix）へ渡す。

**外部チェック待機の 3 分岐（Step 1 の自動判定結果による）:**
- **外部チェックなし（`apps: []`）**: Step 1 の直前 PR 分析の結果 GitHub Actions 以外の外部チェックを使用していないため、外部レビュー待機はスキップする。CI 全 green と未解決スレッドなしのみで判定する。
- **cursor（Cursor Bugbot）検出**: cursor[bot] によるレビュー待機フローを実行する。HEAD push から 1 分以上経過しても Bugbot が開始しない場合のみ `@cursor review` を 1 回だけ催促する（再投稿はせずブロックしない）。HEAD sha に対する cursor[bot] レビューの到着を最大 5 分待ち、到着すれば指摘解決を待ってからマージ、到着しなければ「レビューなし確定」として先へ進む。
- **cursor 以外の外部チェック（例: sonarcloud）**: `gh pr checks --watch`（CI 監視）が既にステータスチェックを監視しているため追加の待機手順は不要。

```bash
# HEAD sha を取得（push のたびに取り直す）
HEAD_SHA=$(gh pr view <pr-number> --json headRefOid -q .headRefOid)

# CI 監視
gh pr checks <pr-number> --watch --interval 60

# watch 完了後、全チェックの結論を列挙して確認する
# failure / cancelled / timed_out が 0 件、pending / queued / in_progress が 0 件であること
gh pr checks <pr-number>

# Bugbot（cursor[bot]）レビューが HEAD sha に対して到着しているか確認する（cursor 検出時のみ）
# commit_id が HEAD_SHA と一致するレビューを探す
gh api "repos/{owner}/{repo}/pulls/<pr-number>/reviews" \
  --jq --arg sha "${HEAD_SHA}" '.[] | select(.user.login == "cursor[bot]" and .commit_id == $sha)'
# → 該当するレビューがまだない場合は最大 5 分待つ（HEAD push から 1 分以上経過後に @cursor review を 1 回だけ催促可）

# レビュースレッドの解決確認（GraphQL）— 100 件超はページネーションで全件取得する
# after: $cursor を使い pageInfo.hasNextPage が false になるまでループする
gh api graphql -f query='
  query($owner: String!, $name: String!, $number: Int!, $cursor: String) {
    repository(owner: $owner, name: $name) {
      pullRequest(number: $number) {
        reviewThreads(first: 100, after: $cursor) {
          nodes { isResolved comments(last: 1) { nodes { body author { login } } } }
          pageInfo { hasNextPage endCursor }
        }
      }
    }
  }' -F owner="{owner}" -F name="{repo}" -F number=<pr-number> -F cursor=""

# CI 全 green・外部チェック指摘なし・未解決レビューコメントなしの場合のみ squash merge
gh pr merge <pr-number> --squash --delete-branch
```

CI 失敗・外部チェック指摘・コンフリクト・未解決レビュースレッドがある場合は、修正エージェント（fix）が detached HEAD で対象ブランチを取得して指摘を反映し再 push する。修正エージェントも worktree 隔離で動作するため、他の並列イシューのブランチに干渉しない。監視（monitor）は最大 7 回まで実行し、push なしが 2 回連続したイシューは `blocked` として記録する。修正（fix）の上限は Review と共有（上限 6）。詳細は Review ステップ参照。

### Step 7: 親イシューを検証してクローズする

子を持つノード（親イシュー）は、配下のすべての子イシューが完了した時点で以下を確認してクローズする。

```bash
# 1. 全子イシューが closed か確認（--paginate で 100 件超も全ページ自動取得）
gh api --paginate "repos/{owner}/{repo}/issues/<parent>/sub_issues?per_page=100" --jq '.[].state'

# 2. 受入基準・チェックリストを読む
gh issue view <parent-number>

# 3. 受入基準を満たしていればクローズ
gh issue close <parent-number> --comment "配下のサブイシューがすべて実装・マージ完了。受入基準を確認してクローズ。"
```

open のサブイシューが残っている場合、または受入基準が未達の場合はクローズせず `failed` として記録する。親ノードは全子イシューが完了するまで投入されないため、子の並列実行完了後に検証される。

### Step 8: 最終レポートを生成する

全イシューの処理結果をまとめてレポートを出力する。1 イシューの失敗では即停止せず次へ進むが、**3 イシュー連続で完了できなかった場合は新規着手を停止（halt）**し、ユーザーの判断を待つ。halt 後に着手しなかったイシューは `not-started` として記録される。out-of-scope 項目は各 PR 本文の「対象外（out-of-scope）」節に記録されているため、レポート確認時にそれらを参照して Issue 化判断（承認後に「実装対象外（out-of-scope）の扱い」手順 3・4 を実行）を行う。

```
## implement-issue-tree 完了レポート

### 処理結果サマリー
- 並列度: N
- 完了（merged / closed）: N 件
- スキップ（closed 済み）: N 件
- 失敗（failed）: N 件
- 依存失敗で未着手（blocked）: N 件
- halt により未着手（not-started）: N 件

### 完了イシュー
- #N: タイトル — PR #M (squash merged)
...

### 失敗・未着手イシュー（要確認）
- #N: タイトル — 理由（CI 失敗 / レビュー未解決 / 依存先失敗 / halt 等）

### 対象外（out-of-scope）— 各 PR 本文の「対象外」節を参照
- #N（PR #M）: 対象外項目あり（詳細は PR 本文。Issue 化は承認のうえ人手で実施、切り出し先 Issue 番号: TBD）
```

返却値: `parent` / `baseBranch` / `parallel` / `total` / `done`（各イシューの status） / `failures` / `notStarted` / `halted`。

## 検証

各実装エージェントはテストコマンドを新規実行し、出力全体と終了コードを確認してから完了を宣言する（詳細は `.claude/rules/verification.md`）。「〜のはず」「たぶん通る」等の推測語での完了主張は禁止。テスト出力・終了コードを証拠として引用してから完了を宣言する。

最終レポートの「完了イシュー」に全対象イシューが列挙され、「停止イシュー」が空であることを確認する。

```bash
# 親イシューの直下サブイシューが全て closed か確認（--paginate で 100 件超も全ページ自動取得）
gh api --paginate "repos/{owner}/{repo}/issues/<parent>/sub_issues?per_page=100" \
  --jq '.[] | {number: .number, state: .state, title: .title}'

# 孫まで含む全サブイシューの状態確認（再帰が必要な場合は各 Phase 親でも実行）
gh api --paginate "repos/{owner}/{repo}/issues/<phase-parent>/sub_issues?per_page=100" \
  --jq '.[] | {number: .number, state: .state}'
```

Workflow の返却値（`done`・`failures`・`notStarted`）を確認し、`failures` と `notStarted` が空であることを確認する。

## よくある失敗

| 問題 | 回避策 |
|------|--------|
| テスト失敗の原因を調査せず当て推量で修正を繰り返す | `.claude/rules/debugging.md` の4フェーズ（調査→分析→仮説→修正）を踏む。3回失敗したら `blocked` にしてユーザーへ報告 |
| `gh pr checks --watch` 終了だけで CI 合格と判断する | watch 後に `gh pr checks <pr-number>` で全チェックの結論を列挙して確認する |
| 仕様準拠を確認せずにコード品質レビューへ移行する | Step 5 のレビューは①仕様準拠→②コード品質の順に実施する |
| Review 前に push・PR 作成を行う | push・PR 作成は Review 全通過後の Step 5.5 で行う。Review 失敗時に CI を起動させないための設計 |
| Review fix で push してしまう | Review ループの fix はローカルコミットのみ。push は Step 5.5 のみで行う |
| 状態ファイルが壊れたまま再実行して重複 PR を作成する | パースエラー時は即停止。`cat _/issue-trees/<N>.json` で確認してから再実行する |
| 中断後に手動で worktree を削除してから再実行する | 再実行時に Recover phase が自動処理するため手動削除は不要。手動削除してしまうと Recover が残骸なしと判定し、中断前の作業を引き継がずに Plan から新規実行する |

## モデル / effort 割り当て

| エージェント | model | effort | 根拠 |
|------------|-------|--------|------|
| `plan:issue-tree`（Tree 取得・依存抽出） | sonnet | medium | 本文読解・依存判断 |
| `detect:external-checks`（外部チェック判定） | haiku | low | 定型コマンド集計 |
| `state:load` / `state:update` / `state:init-all` | haiku | low | jq の機械処理 |
| `recover:#N`（中断作業の継続可否判断） | opus | medium | 計画判断相当（Plan と同じ軸で判断するため opus） |
| `plan:#N`（per-issue 計画立案） | opus | high | 最も複雑な計画立案 |
| `impl:#N`（実装） | sonnet | medium | 計画に沿った実装（コスト最適化） |
| `review:#N`（独立 Review） | sonnet | medium | 品質・セキュリティ判定 |
| `fix:#N`（修正） | sonnet | medium | 実装系・コスト最適化 |
| `merge:#N`（CI/レビュー監視・マージ） | sonnet | medium | CI/レビュー判定・マージ可否ゲート |
| `close:#N`（受入基準確認・クローズ） | sonnet | medium | 受入基準確認・クローズ |

## 中断・失敗からの再開

実行中の状態は `_/issue-trees/<親イシュー番号>.json` に自動保存される。セッションが中断・強制終了した場合でも、**同じ `args` で再実行するだけで再開できる**。

```bash
# 状態ファイルの確認
cat _/issue-trees/42.json
```

状態ファイルの `status` フィールドは以下の値を取る:

| status | 意味 | 再開時の挙動 |
|--------|------|------------|
| `pending` | 未着手 | 最初から実行 |
| `planning` | 計画立案中（中断） | **Recover phase が残骸 worktree / branch の有無を確認**。残骸あり → continue（Implement で継続）/ discard（掃除して Plan から新規）に分岐。残骸なし → Plan から通常実行。PR 未作成のため重複 PR は発生しない |
| `implementing` | 実装中（中断） | **Recover phase が残骸 worktree / branch の有無を確認**。残骸あり → continue（Implement で継続）/ discard（掃除して Plan から新規）に分岐。残骸なし → Plan から通常実行。PR 未作成のため重複 PR は発生しない |
| `reviewing` | レビュー中（中断） | **Recover phase が残骸 worktree / branch の有無を確認**。残骸あり → continue（Implement で継続）/ discard（掃除して Plan から新規）に分岐。残骸なし → Plan から通常実行。push 前 review フローのため PR 未作成。impl 手順 0b-a で open PR を検索し、0b-b でリモートブランチ（push 成功・PR 作成失敗ケース）を検出して回復する |
| `monitoring` | 監視中（中断） | **impl をスキップし monitor ループから再開**（PR 番号・ブランチ・fixCount を引き継ぐ） |
| `merged` | マージ済み | スキップ（完了扱い） |
| `closed` | クローズ済み | スキップ（完了扱い） |
| `failed` | 失敗 | Recover phase が残骸の有無を確認して再実行（continue / discard に分岐） |
| `blocked` | 依存失敗または halted | Recover phase が残骸の有無を確認して再実行（continue / discard に分岐） |
| `skipped` | GitHub 側で closed 済み | スキップ（変更なし） |

`monitoring` 中断からの再開では、保存された `pr`（PR 番号）・`branch`・`fixCount`（修正済み回数）を引き継いで monitor ループから再開する。`fixCount` の上限（6 回）は引き継いだ値に基づいて判定される。

`planning` / `implementing` / `reviewing` からの再開では、まず Recover phase が残骸 worktree / branch の有無を確認する。**残骸がある場合**は Recover（opus）が「途中作業を継続できるか」を判断し、continue なら既存 branch を checkout して Implement で継続、discard なら worktree と branch を掃除して Plan から新規実行する。**残骸がない場合**は通常の Plan → Implement から再実行する。いずれの経路でも push 前 review フローのため PR 未作成の状態で中断している。impl 手順 0b-a が既存 open PR を検索し、あれば再利用する。「push 成功・PR 作成失敗」のケース（状態 `failed`・`branch` 保存済み）では impl 手順 0b-b がリモートブランチを検出して push 済みコミットを保持したまま回復する。

**Recover の判断軸は Review とは別**である。Review は「正しいか・マージできるか」を判定するのに対し、Recover は「この途中作業から継続するのが妥当か」を判断する。動かない・未完成でも方向が妥当なら continue（残りは Implement が完成させる）。未 commit 変更は Recover が WIP commit として branch へ退避してから worktree を削除するため、continue / discard どちらの経路でもデータを失わない。

状態ファイルの `worktree` フィールドには実装エージェントが動作した worktree の絶対パスが記録される。Recover phase はこのフィールドと `git worktree list --porcelain` を使って残骸を特定する。

### worktree の自動削除

**merged 確定時**に、状態ファイルの更新と同じエージェント内で worktree を自動削除する。削除は `git worktree remove --force <path>` で実行し（squash merge 済みのため force でよい）、削除後に `git worktree prune` を実行する。削除完了後、状態ファイルの `worktree` フィールドは空文字に更新されるため、残骸の有無を状態ファイルから判別できる。

**fix のたびに古い worktree は削除され、常に最新の 1 つだけが追跡される**。fix エージェントも `isolation: 'worktree'` で動作するため、fix のたびに新しい worktree が作成される。fix 完了後に旧 worktree を自動削除し、状態ファイルの `worktree` フィールドを新しいパスに更新する。これにより fix を複数回繰り返しても残骸 worktree が蓄積しない。

**中断・失敗後の残骸 worktree は、再実行時に Recover phase が自動処理する**。continue 判定の残骸は Recover が worktree を削除してから Implement で既存 branch を checkout し、discard 判定（空 worktree・方向違い等）は Recover が worktree と branch を自動削除する。手動で worktree を削除したり、削除確認に答えたりする必要はない。

**failed / blocked の worktree のうち Recover が discard と判定しなかったものは削除しない**（デバッグ・手動再開用に残る）。不要になった場合は状態ファイルの `worktree` フィールドを参照して手動で削除する:

```bash
# 状態ファイルで worktree パスを確認
cat _/issue-trees/42.json | jq '.items | to_entries[] | select(.value.status == "failed") | {issue: .key, worktree: .value.worktree}'

# 手動削除
git worktree remove <worktree-path>
git worktree prune
```

### 実装エージェントによる既存 PR・リモートブランチの再利用

実装エージェントは着手時に以下の順で回復手順（手順 0b）を実行する。

**0b-a（open PR 検索）**: `gh pr list --state open` でイシュー番号に対応する open PR が既に存在しないかを確認する。既存 PR が見つかった場合は新規 PR を作らず、そのブランチを取得して続きから作業し、既存 PR 番号をそのまま返す。これにより中断再開時や monitoring フォールバック時に重複 PR が作成されない。

**0b-b（リモートブランチ再利用）**: open PR が見つからない場合、`git ls-remote --heads origin` でイシュー番号を含むリモートブランチ（命名規約 `<type>/<N>-<short-name>`）が残っていないか確認する。「push 成功・PR 作成失敗」で残ったブランチを検出し、`git fetch origin <branch> && git checkout -B <branch> origin/<branch>` でそのブランチを取得して push 済みコミットを保持したまま続きを実装する。`origin/<base>` から新規作成し直さないため、push 済みコミットが孤児化しない。このブランチ名を branch として返し、prNumber は 0 のまま（PR は後続の PR Create フェーズが作成する）。

### 状態ファイルが壊れている場合

状態ファイルが存在するが JSON パースに失敗している場合、**ワークフローはエラー停止する**（壊れたファイルを無視してフレッシュスタートすると重複 PR・重複実装が発生する危険があるため）。

エラーメッセージ例:
```
状態ファイル（_/issue-trees/42.json）の読み込みまたは JSON パースに失敗した。
ファイルを手動で確認・修復してから再実行すること。
削除してフレッシュスタートする場合は `rm _/issue-trees/42.json` を実行する。
```

対処方法:
```bash
# 状態ファイルの内容を確認する
cat _/issue-trees/42.json

# 修復できる場合: jq で検証・修正してから再実行
jq . _/issue-trees/42.json

# 完全にやり直す場合: 削除してから再実行（進捗は失われる）
rm _/issue-trees/42.json
```

### 最初からやり直す場合

状態ファイルを削除してから再実行する:

```bash
rm _/issue-trees/42.json
# 再実行
```

### 状態ファイルについて

- パス: `_/issue-trees/<親イシュー番号>.json`（メインリポルート相対）
- `_/` は git 管理外のローカルディレクトリ（`.gitignore` 対象）であり、状態ファイルは git にコミットされない
- 同一セッション内での再開は Workflow ツールの `resumeFromRunId` パラメータも利用できる（Workflow ツールが journal から自動再開する）
- サンプル: `skills/implement-issue-tree/sample/state-example.json` を参照

## 実装対象外（out-of-scope）の扱い

各サブイシューの実装およびセルフレビュー（処理内容の手順 7: implement-review）の過程で、対応すべきだが現スコープ外と判断した事項（未対応の改善・別機能・技術的負債・後続作業）が発生した場合は、放置せず必ず追跡する。

### 手順

1. **既存 Issue を確認する**
   Step 1 で取得済みのサブイシューツリーを参照しつつ、追加で open Issue を検索する:

```bash
gh issue list --state open --search "${KEYWORD}"
```

   キーワードは `"${KEYWORD}"` でクォートして渡す。

2. **記録は自動・Issue 書き込みは事後承認に分離する**
   各 implement エージェントはヘッドレス自動実行のため承認を待てない。実装・セルフレビュー（手順 7）中に検出した out-of-scope 項目は、その場では Issue 操作を行わず自分の PR 本文の「対象外（out-of-scope）」節に記録するだけにとどめる（Step 5 の最終レポートへは個別エージェントは書き込めず、レポート生成時に各 PR 本文から集約する。手順 5 を参照）。実際の Issue 書き込み（既存 Issue へのコメント追加 or 新規起票。手順 3・4）は、最終レポート確認時にユーザー（またはオーケストレータ）が out-of-scope 項目・既存 Issue の有無・対応案を確認し、**承認のうえで実行する**（確認なしに Issue 操作をしない）。

3. **既存 Issue がある場合: コメントを追加する**

```bash
gh issue comment "${ISSUE_NUMBER}" --body "$(cat <<'EOF'
## 実装サポート情報（別作業から検出）

### 検出背景
イシューツリー実装（親 Issue #N、対象 Issue #M）の過程で発見した事項。

### 関連ファイル・シンボル
- `src/path/to/file.ts` — 対象関数名・クラス名

### パッケージ・サービスから見た役割・影響範囲
（このシンボルの担う境界、呼び出し元/呼び出し先）

### 着手時の注意点・依存関係
（依存パッケージ、順序制約など）
EOF
)"
```

4. **既存 Issue がない場合: 新規起票する**
   `create-issue-tree`（既存ルートへの紐付けは `--root <ルートissue番号>`）または `create-issue` を使用して、適切な親 Issue 配下に起票する。タイトルは Conventional Commits 形式とする。

5. **PR 本文に記録する（個別エージェントは最終レポートに書き込まない）**
   各 implement エージェントが書けるのは自分の PR 本文のみ。Step 7 の最終レポートはツリー全体の実行後にオーケストレータが生成するため、個別エージェントは書き込めない。実装フェーズ（Step 3）および独立 Review フェーズ（Step 4）で検出した out-of-scope は対象 Issue の PR 本文の「対象外（out-of-scope）」節に「対象外とした項目」と対応案として記録する。最終レポート確認時に、ユーザー（またはオーケストレータ）が merged 各 PR 本文の当該節を集約し、Issue 化（手順 3・4）の承認・実行を行う。切り出し先 Issue 番号は承認後の起票で確定するため、記録時点では 'TBD' とする。

> **セキュリティ注記**: `gh` へ渡すキーワード・コメント本文は変数を `"${var}"` でクォートし、本文は HEREDOC（`<<'EOF'`）で渡してインジェクションを防ぐ。

## 注意事項

- **ユーザー承認なしで PR 作成・merge まで自動実行する**ため、事前に親イシュー番号・ブランチ・並列度を慎重に確認する
- `parallel` は 1〜8 の整数のみ有効。整数以外・範囲外は既定の 3 にフォールバックする。並列度を上げるほど API レート制限・CI キューの逼迫に注意する
- 各 implement / fix は独立した worktree で隔離実行されるが、メイン working copy のブランチ・共有設定などグローバル状態は変更しない
- 大規模ツリー（数百件）はサブ親単位で複数回に分けて実行する（1 ワークフローのエージェント上限は 1,000）
- `--no-verify` は絶対に使用しない（pre-commit フック回避禁止。詳細は `.claude/rules/conventional-commits.md`）
- シェルコマンドの変数は必ず `"${var}"` でクォートする（コマンドインジェクション対策）。GitHub API から取得した文字列はプロンプト埋め込み前にサニタイズされる
- 1 イシューの失敗では停止せず次へ進むが、3 イシュー連続失敗で新規着手を停止（halt）する
- マージ前に **CI は全チェックが success/neutral/skipped で完了（pending/failure 0 件）であること**を明示確認する（`gh pr checks --watch` が終わっただけでは合格にせず、全チェックの結論を列挙して確認する）
- 外部チェック（Cursor Bugbot 等）は Step 1（Tree フェーズ）で直前 3 件の merged PR を分析して自動判定する。外部チェックが検出されない場合は Bugbot 待機・`@cursor review` 催促は行わない（CI green と未解決スレッドなしのみで判定する）。Bugbot 待機は外部チェック検出時のみ実施する
- マージ前に **レビューコメントが全て解決済みであること**を確認する（未解決コメントがある場合はマージしない）
- コミット・PR 作成は Conventional Commits に従う（`.claude/rules/conventional-commits.md`）。セキュリティ問題を検出した場合は修正してから進む（`.claude/rules/security.md`）
- **中断・失敗後に手動で worktree を削除したり削除確認に答えたりする必要はない**。再実行時に Recover phase が per-issue で継続可否を判断し、作業のある worktree は continue（Implement で継続）または discard（自動削除 → Plan から新規）に振り分ける。空・破棄判定の worktree は自動削除されるため、残骸を手動で掃除してから再実行する必要がない

## sandbox 環境での実行

このスキルは sandbox 環境では実行できない。ネットワークアクセス・ファイルシステムへの書き込みが必要なため、通常の Claude Code セッションで実行すること。

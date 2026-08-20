---
name: project-sync-issues
description: Issue/PR の状態とプロジェクト Status の自動同期を設定する。モード A は `Fandhe-AI/actions/project-sync` Composite Action を使う `.github/workflows/project-sync.yml` を生成 (PAT または GitHub App トークン)。モード B は既存の不整合を一括補正。「自動同期セットアップ」「PR レビュー時に In Review 化」「ボードと Issue の状態を同期」などで使用。
model: sonnet
---

# project-sync-issues

GitHub Actions ワークフローファイルを生成し、Issue/PR の状態変更をプロジェクトの Status フィールドに自動同期します。手動での一括補正モードも提供します。

## 前提条件

- 対象の GitHub Project がリポジトリにリンクされていること
- `gh` CLI がインストールされ、認証済みであること（`project` スコープ付き）

## フロー

ユーザーに実行モードを確認する:
- **自動同期セットアップ** — GitHub Actions ワークフローを生成（初回推奨）
- **手動一括補正** — 現在の不整合を一括修正（スポット実行用）

### モード A: 自動同期セットアップ

#### Step A-1: プロジェクト情報を取得する

```bash
# オーナーを取得
gh repo view --json owner -q '.owner.login'

# プロジェクト番号を確認
gh project list --owner <owner> --format json
```

ユーザーに対象プロジェクトの番号を確認する。

#### Step A-2: 認証シークレットを案内する

GitHub Actions から Projects API にアクセスするには `GITHUB_TOKEN` では不足するため、以下のいずれかが必要:

**方法 1: Personal Access Token（個人/小規模向け）**

1. GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. 必要なスコープ: `project`（読み書き）+ `issues`（読み書き）+ `pull_requests`（読み書き）
3. リポジトリの Settings → Secrets and variables → Actions → `PROJECT_TOKEN` として登録

**方法 2: GitHub App トークン（Organization 向け・推奨）**

1. GitHub App を作成し、Organization に `Projects: Read and write` 権限を付与
2. ワークフロー内で `actions/create-github-app-token` を使用してトークンを生成

#### Step A-3: GitHub Actions ワークフローを生成する

`Fandhe-AI/actions/project-sync` Composite Action を使用する。`.github/workflows/project-sync.yml` を生成する。

**参照方式（内製 action は `@latest`、サードパーティ action は固定 SHA）:**

`Fandhe-AI/actions/*`（本スキルでは `project-sync`）は組織内で管理・レビューされる内製 action のため `@latest` タグ参照とする（SHA pin は廃止済み。オーナー決定）。一方、サードパーティ action（`actions/create-github-app-token` 等）は `@main` / `@vN` 等の可動参照ではなく、検証済みのコミット SHA で固定する。生成のたびに最新 SHA を動的取得して埋め込む方式は、取得時点で上流が侵害・意図せず改変されていた場合にそのコードをそのまま導入先へ伝播させてしまう。そのため**ワークフロー生成時は以下のレビュー済み固定 SHA を定数として使用し、動的な最新 SHA 取得は行わない**:

| Action | 固定 SHA | 対応バージョン |
|--------|---------|--------------|
| `actions/create-github-app-token` | `fee1f7d63c2ff003460e3d139729b119787bc349` | v2.2.2 |

上記 SHA は導入時点でコード内容（`action.yml`・参照スクリプト全文）を実際に取得・精査したうえで固定した値である。SHA を更新する必要がある場合のみ（生成のたびには実行しない）、以下の手順で**変更内容そのもの**を精査してから本ファイルの定数とワークフロー例を更新する（対象はサードパーティ action のみ。`Fandhe-AI/actions/project-sync` は `@latest` 参照のため SHA 更新手順の対象外）:

```bash
# 更新候補の最新 SHA を取得（更新作業時のみ実行。対象例: actions/create-github-app-token）
gh api repos/actions/create-github-app-token/commits/main --jq '.sha'
# 旧 SHA との差分パッチ（変更内容そのもの）を取得して精査する。ファイル名一覧だけでは不十分
gh api repos/actions/create-github-app-token/compare/<旧SHA>...<新SHA> --jq '.files[] | {filename, patch}'
# Action のエントリーポイント（action.yml）と参照される全スクリプトを新 SHA 時点の
# 内容で取得し、action が実行するコマンド・ダウンロードするバイナリ等に不審な変更が
# ないか実際に読んで確認する
gh api repos/actions/create-github-app-token/contents/action.yml?ref=<新SHA> --jq '.content' | base64 -d
```

差分パッチと `action.yml`（および参照スクリプト全文）を実際に読み、意図しない変更・不審なコマンド追加がないことを人手で確認する。可能であれば署名・リリース provenance（`gh attestation verify` 等）も確認する。確認が取れた場合のみ、上記の固定 SHA 表と後続のワークフロー例内 `uses:` 行のコメント（対応バージョン）を合わせて更新する。`Fandhe-AI/actions/project-sync` は `@latest` 参照のためこの精査手順は不要（組織内で管理・レビューされる前提でオーナーが受容済み）。

**PAT を使用する場合:**

```yaml
name: Project Sync

on:
  issues:
    types: [opened, closed, reopened]
  pull_request:
    types: [opened, closed, ready_for_review, review_requested]

permissions:
  contents: read

jobs:
  sync:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - name: Sync project status
        uses: Fandhe-AI/actions/project-sync@latest
        with:
          project-number: '<number>'
          project-owner: '<owner>'
          token: ${{ secrets.PROJECT_TOKEN }}
```

**GitHub App を使用する場合（推奨）:**

```yaml
name: Project Sync

on:
  issues:
    types: [opened, closed, reopened]
  pull_request:
    types: [opened, closed, ready_for_review, review_requested]

permissions:
  contents: read

jobs:
  sync:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - name: Generate token
        id: token
        uses: actions/create-github-app-token@fee1f7d63c2ff003460e3d139729b119787bc349 # v2.2.2
        with:
          app-id: ${{ vars.APP_ID }}
          private-key: ${{ secrets.APP_PRIVATE_KEY }}
          owner: '<owner>'

      - name: Sync project status
        uses: Fandhe-AI/actions/project-sync@latest
        with:
          project-number: '<number>'
          project-owner: '<owner>'
          token: ${{ steps.token.outputs.token }}
```

**カスタム Status オプション名を使用する場合:**

Status オプション名がデフォルト（Todo / In Progress / In Review / Done）と異なる場合は inputs で指定する:

```yaml
      - name: Sync project status
        uses: Fandhe-AI/actions/project-sync@latest
        with:
          project-number: '<number>'
          project-owner: '<owner>'
          token: ${{ secrets.PROJECT_TOKEN }}
          status-todo: 'バックログ'
          status-in-progress: '作業中'
          status-in-review: 'レビュー中'
          status-done: '完了'
```

#### Step A-4: ステータスマッピングを確認する

生成するワークフローのデフォルトマッピング:

| イベント | アクション | Status |
|---------|----------|--------|
| Issue | opened | Todo |
| Issue | closed | Done |
| Issue | reopened | Todo |
| PR | opened | In Progress |
| PR | ready_for_review | In Review |
| PR | review_requested | In Review |
| PR | closed (merged) | Done |
| PR | closed (not merged) | Todo |

ユーザーの要望に応じてマッピングをカスタマイズする。

#### Step A-5: ワークフローファイルを配置する

```bash
mkdir -p .github/workflows
# ワークフローファイルを .github/workflows/project-sync.yml に書き出す
```

ユーザーにコミット・プッシュを案内する。

### モード B: 手動一括補正

プロジェクトと Issue/PR の現在の状態を比較し、不整合を一括修正する。自動同期セットアップ後の初回補正や、手動変更の反映に使用する。

#### Step B-1: プロジェクトアイテムを取得する

```bash
gh project item-list <number> \
  --owner <owner> \
  --format json \
  --limit 999
```

#### Step B-2: Issue/PR の現在状態を確認する

Issue/PR タイプのアイテムに対して現在の状態を確認:

```bash
gh issue view <issue-url> --json state,labels,assignees
gh pr view <pr-url> --json state,isDraft,reviewRequests,merged
```

#### Step B-3: 状態の不一致を検出する

以下の不一致パターンを検出:
- **Issue が closed だがプロジェクトの Status が Done でない** → Done に更新
- **Issue が open だがプロジェクトの Status が Done** → Todo に更新
- **PR がマージ済みだが Status が Done でない** → Done に更新
- **PR にレビューリクエストがあるが Status が In Review でない** → In Review に更新

#### Step B-4: リポジトリの未追加 Issue/PR を検出する

```bash
gh issue list --state open --json number,url,title --limit 999
gh pr list --state open --json number,url,title --limit 999
```

プロジェクトのアイテム URL と比較して未追加分を特定する。

#### Step B-5: ユーザーに同期内容を確認する

検出結果を表示:

```
## 同期内容

### ステータス更新（N 件）
- #42: ソーシャルログイン — Status: In Progress → Done（Issue closed）
- #45: バグ修正 — Status: Done → Todo（Issue reopened）
- #50: リファクタリング PR — Status: In Progress → In Review（レビュー依頼済み）

### 新規追加（M 件）
- #55: 新機能リクエスト (Issue)
- #56: ドキュメント更新 PR

実行しますか？
```

#### Step B-6: 同期を実行する

```bash
# フィールドメタデータを取得
gh project field-list <number> --owner <owner> --format json

# ステータス更新
gh project item-edit \
  --id <item-id> \
  --field-id <status-field-id> \
  --project-id <project-id> \
  --single-select-option-id <option-id>

# 新規追加
gh project item-add <number> \
  --owner <owner> \
  --url <issue-or-pr-url> \
  --format json
```

#### Step B-7: 同期結果を報告する

| 操作 | 件数 |
|------|------|
| ステータス更新 | N 件 |
| 新規追加 | M 件 |
| 変更なし | K 件 |

## 注意事項

- **認証:** GitHub Actions から Projects API へのアクセスには `GITHUB_TOKEN` では不足。PAT または GitHub App トークンが必要
- **PAT 有効期限:** fine-grained PAT は最大1年。定期ローテーション推奨
- **ビルトインワークフローとの併用:** `project-init` でビルトインワークフロー（closed→Done, merged→Done）を有効化済みの場合、Actions ワークフローと二重に発火するが、同じ値への更新なので実害はない
- **PR ライフサイクル:** ビルトインワークフローは closed/merged のみ対応。opened→In Progress, review_requested→In Review は Actions でのみ自動化可能
- **プライベートリポジトリ:** org の Settings → Actions → General でプライベートリポジトリからの Action 共有を許可する必要あり
- 手動補正モードは同期前に必ずユーザーの確認を得る
- DraftIssue タイプのアイテムは同期対象外（実 Issue が存在しないため）
- ネットワークを要する（主に API 経由。後述の「sandbox 環境での実行」節を参照）
- **サードパーティ action は必ずコミット SHA で固定する**: `@main` / `@vN` 等の可動参照は生成しない。上流のタグ付け替え・ブランチ改変が未検証のまま流れ込むサプライチェーンリスクを避けるため（SHA 更新時は差分を確認してから更新する）。**`Fandhe-AI/actions/*`（内製 action）は `@latest` 参照とする**（組織内で管理・レビューされるため。SHA pin は廃止済み。オーナー決定）
- **permissions は最小権限で明示する**: workflow レベルで `contents: read` を明示する。同期処理自体は `PROJECT_TOKEN` / GitHub App トークン側の権限で動作するため、`GITHUB_TOKEN` への追加権限は不要

## 検証

**モード A 完了後:** `.github/workflows/project-sync.yml` が存在し、YAML が正しく記述されていること。加えて以下を確認する:
- `uses:` 行の参照方式が正しいこと（`Fandhe-AI/actions/*` は `@latest`、それ以外（サードパーティ）は40桁の16進数コミット SHA で固定。サードパーティ側は `@main`・`@v2.2.2`・`@master`・任意ブランチ名等の可動参照が残っていないことを積極的に検証する）:
  ```bash
  f=.github/workflows/project-sync.yml
  total=$(grep -c 'uses:' "$f")
  fandhe_total=$(grep -cE 'uses:\s*Fandhe-AI/actions/' "$f")
  fandhe_ok=$(grep -cE 'uses:\s*Fandhe-AI/actions/[^@[:space:]]+@latest([[:space:]]|#|$)' "$f")
  other_total=$((total - fandhe_total))
  other_pinned=$(grep -E 'uses:' "$f" | grep -vE 'Fandhe-AI/actions/' \
    | grep -cE 'uses:\s*[^@[:space:]]+@[0-9a-f]{40}([[:space:]]|#|$)' || true)
  if [ "$total" -eq 0 ]; then
    echo "NG: 検証対象の uses: 行が見つからない（workflow 生成に失敗している可能性）" >&2
    exit 1
  elif [ "$fandhe_total" -eq "$fandhe_ok" ] && [ "$other_total" -eq "$other_pinned" ]; then
    echo OK
  else
    echo "NG: 参照方式が不正な uses: 行がある（fandhe_total=${fandhe_total}, fandhe_ok=${fandhe_ok}, other_total=${other_total}, other_pinned=${other_pinned}）" >&2
    exit 1
  fi
  ```
  `OK` が出力されること（`uses:` 行が 1 件以上存在し、`Fandhe-AI/actions/*` 行はすべて `@latest`、それ以外の行はすべて 40 桁 SHA 固定）。`NG:` が出力された場合は workflow の生成内容を見直す
- `permissions` が明示されていること: `grep -c 'permissions:' .github/workflows/project-sync.yml` が 1 以上
- `sync` ジョブに `timeout-minutes` が設定されていること: `grep -n 'timeout-minutes' .github/workflows/project-sync.yml` で 1 行以上ヒットする（欠落は CI ワークフロー規約違反・P1）

コミット・プッシュ後に GitHub Actions の実行履歴で初回トリガーが確認できれば完了。

**モード B 完了後:** Step B-7 の結果表で「変更なし: 0 件以上」が表示されていること。以下で最終状態を確認する:

```bash
gh project item-list <number> --owner <owner> --format json --limit 999
```

## sandbox 環境での実行

このスキルはネットワーク越しの GitHub 操作（同期 workflow のコミット・プッシュ、`gh project item-edit` 等の一括補正）を必須とする。該当コマンドはコマンド単位で sandbox 無効にして実行する。ネットワーク遮断を解除できない環境では実行できない。

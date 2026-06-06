# CLI

GitHub CLI (gh) の主要コマンド。

## ヘルプ表示

```sh
# トップレベルコマンド一覧
gh

# サブコマンドのヘルプ
gh pr --help
gh pr create --help
```

## 自分に関するアクティビティの確認

```sh
gh status
```

## リポジトリ操作

```sh
# リポジトリを表示
gh repo view OWNER/REPO

# リポジトリをクローン
gh repo clone OWNER/REPO

# リポジトリを作成（インタラクティブ）
gh repo create

# パブリックリポジトリを作成
gh repo create my-repo --public

# プライベートリポジトリを作成（README 付き）
gh repo create my-repo --private --add-readme

# 組織にリポジトリを作成
gh repo create my-org/my-repo --public

# テンプレートから作成
gh repo create my-repo --template owner/template-repo

# 作成と同時にクローン
gh repo create my-repo --public --clone

# リポジトリ一覧を表示
gh repo list OWNER

# フォーク
gh repo fork OWNER/REPO

# フォークしてクローン
gh repo fork OWNER/REPO --clone

# リポジトリ設定を編集
gh repo edit OWNER/REPO

# デフォルトブランチの変更
gh repo edit --default-branch new-default

# フォークを上流と同期
gh repo sync

# デフォルトリポジトリの設定
gh repo set-default OWNER/REPO

# リポジトリのアーカイブ
gh repo archive OWNER/REPO

# リポジトリのアーカイブ解除
gh repo unarchive OWNER/REPO
```

## リポジトリの削除

```sh
gh repo delete OWNER/REPO --yes
```

> **警告**: 削除は取り消せません。削除前にアーカイブを検討してください。

## Issue 操作

```sh
# Issue 一覧を表示
gh issue list

# 特定リポジトリの Issue 一覧
gh issue list --repo OWNER/REPO

# フィルタリング
gh issue list --state closed --label bug
gh issue list --assignee @me --state open

# Issue の作成
gh issue create

# ラベル・アサイニー付きで作成
gh issue create --title "Bug report" --label bug,priority --assignee @me

# Issue の詳細を表示
gh issue view NUMBER

# Issue のクローズ
gh issue close NUMBER

# Issue の再オープン
gh issue reopen NUMBER

# Issue の編集
gh issue edit NUMBER

# Issue にコメント
gh issue comment NUMBER

# Issue を別リポジトリに転送
gh issue transfer NUMBER

# Issue をピン留め
gh issue pin NUMBER

# Issue のピン留め解除
gh issue unpin NUMBER

# Issue に対するブランチを作成
gh issue develop NUMBER
```

## Issue の削除

```sh
gh issue delete NUMBER
```

> **警告**: 削除は取り消せません。

## プルリクエスト操作

```sh
# PR 一覧を表示
gh pr list

# 特定リポジトリの PR 一覧
gh pr list --repo OWNER/REPO

# PR を作成
gh pr create

# ドラフト PR を作成
gh pr create --draft --title "WIP: Feature" --body "作業中"

# ラベル・レビュアー・アサイニー付きで作成
gh pr create --label bug --reviewer octocat --assignee @me

# ベースブランチを指定して作成
gh pr create --base develop

# Web ブラウザで作成
gh pr create --web

# PR の詳細を表示
gh pr view NUMBER

# PR をチェックアウト
gh pr checkout NUMBER

# PR をマージ（squash）
gh pr merge --squash

# PR をマージ（rebase）
gh pr merge --rebase

# マージ後にブランチを削除
gh pr merge --delete-branch

# PR のクローズ
gh pr close NUMBER

# PR の再オープン
gh pr reopen NUMBER

# PR のレビュー
gh pr review NUMBER

# PR の差分を表示
gh pr diff NUMBER

# PR のチェックステータスを表示
gh pr checks NUMBER

# PR をレビュー準備完了にする
gh pr ready NUMBER

# PR の編集
gh pr edit NUMBER

# PR にコメント
gh pr comment NUMBER
```

## ワークフローラン操作

```sh
# ワークフローラン一覧を表示
gh run list

# ワークフロー名でフィルタリング
gh run list --workflow ci.yml

# 失敗したランのみ表示
gh run list --status failure

# ワークフローランの詳細を表示
gh run view RUN_ID

# ランのログを表示
gh run view RUN_ID --log

# 失敗したジョブのログのみ表示
gh run view RUN_ID --log-failed

# ワークフローランをリアルタイム監視
gh run watch RUN_ID

# ワークフローランを再実行
gh run rerun RUN_ID

# ワークフローランをキャンセル
gh run cancel RUN_ID

# アーティファクトをダウンロード
gh run download RUN_ID
```

## ワークフローランの削除

```sh
gh run delete RUN_ID
```

> **警告**: 削除したワークフローランのログは復元できません。

## ワークフロー操作

```sh
# ワークフロー一覧を表示
gh workflow list

# ワークフロー情報を表示
gh workflow view WORKFLOW

# ワークフローを手動実行
gh workflow run WORKFLOW

# 入力パラメータ付きで手動実行
gh workflow run deploy.yml -f environment=production -f version=1.0.0

# 特定ブランチで実行
gh workflow run ci.yml --ref feature-branch

# ワークフローを有効化
gh workflow enable WORKFLOW

# ワークフローを無効化
gh workflow disable WORKFLOW
```

## リリース操作

```sh
# リリースを作成
gh release create v1.0.0 --title "Release v1.0.0" --notes "Release notes here"

# ファイルを添付してリリースを作成
gh release create v1.0.0 ./dist/*.zip --title "v1.0.0" --notes "Release notes"

# ドラフトリリースの作成
gh release create v1.0.0 --draft --title "v1.0.0" --notes "Draft release"

# プレリリースの作成
gh release create v1.0.0-beta.1 --prerelease --title "v1.0.0-beta.1"

# リリースノートを自動生成
gh release create v1.0.0 --generate-notes

# 特定ブランチをターゲットに指定
gh release create v1.0.0 --target release-branch --generate-notes

# リリース一覧を表示
gh release list

# 最新リリースを表示
gh release view --latest

# 特定リリースを表示
gh release view v1.0.0

# リリースを編集
gh release edit v1.0.0 --title "Updated Title" --notes "Updated notes"

# ドラフトを公開に変更
gh release edit v1.0.0 --draft=false
```

## リリースの削除

```sh
gh release delete v1.0.0

# 関連するタグも削除
gh release delete v1.0.0 --cleanup-tag
```

> **警告**: リリース削除は取り消せません。`--cleanup-tag` を付けるとタグも同時に削除されます。

## 検索

```sh
# リポジトリを検索
gh search repos "language:typescript stars:>1000" --sort stars

# Issue を検索
gh search issues "is:open label:bug" --repo OWNER/REPO

# PR を検索
gh search prs "is:open"

# コードを検索
gh search code "function main" --language go

# コミットを検索
gh search commits "fix bug"
```

## シークレット・変数操作

```sh
# リポジトリシークレットを設定
gh secret set SECRET_NAME

# 環境シークレットを設定
gh secret set --env ENV_NAME SECRET_NAME

# Organization シークレットを設定
gh secret set --org ORG_NAME SECRET_NAME
```

## API 直接呼び出し

```sh
# GET リクエスト
gh api repos/OWNER/REPO

# POST リクエスト
gh api repos/OWNER/REPO/issues -f title="Bug" -f body="Description"

# HTTP メソッドを指定
gh api repos/OWNER/REPO/issues/1 --method PATCH -f state=closed

# ページネーション
gh api repos/OWNER/REPO/issues --paginate

# GraphQL クエリ
gh api graphql -f query='query { viewer { login } }'

# jq でフィルタリング
gh api repos/OWNER/REPO/pulls --jq '.[].title'
```

## JSON 出力

```sh
# JSON 形式で出力
gh pr list --json number,title,author

# jq でフィルタリング
gh pr list --json number,title --jq '.[].title'
```

## エイリアス

```sh
# エイリアスの作成
gh alias set prd "pr create --draft"

# エイリアスの使用
gh prd

# エイリアス一覧
gh alias list
```

## Codespace 操作

```sh
# Codespace を作成
gh codespace create

# Codespace 一覧を表示
gh codespace list

# VS Code で開く
gh codespace code
```

## ブラウザで開く

```sh
gh browse
```

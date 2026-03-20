# GitHub CLI コマンドリファレンス

## グローバルフラグ

すべてのコマンドで使用可能なフラグ。

| フラグ | 説明 |
|-------|------|
| `--repo OWNER/REPO` | 対象リポジトリを指定（`-R` 短縮形） |
| `--help` | コマンドのヘルプを表示 |
| `--json FIELDS` | 指定フィールドを JSON 形式で出力 |
| `--jq EXPRESSION` | JSON 出力に jq フィルタを適用 |
| `--template TEMPLATE` | Go テンプレートで出力をフォーマット |

## コマンド一覧

### 認証・設定

| コマンド | 説明 |
|---------|------|
| `gh auth` | GitHub との認証を管理 |
| `gh config` | CLI の設定を管理 |
| `gh alias` | コマンドエイリアスを管理 |
| `gh status` | 自分に関連するアクティビティを表示 |

### リポジトリ

| コマンド | 説明 |
|---------|------|
| `gh repo` | リポジトリの作成・クローン・フォーク・表示 |
| `gh browse` | リポジトリをブラウザで開く |

### Issue・プルリクエスト

| コマンド | 説明 |
|---------|------|
| `gh issue` | Issue の作成・表示・編集・クローズ |
| `gh pr` | プルリクエストの作成・レビュー・マージ |
| `gh label` | ラベルの管理 |

### プロジェクト

| コマンド | 説明 |
|---------|------|
| `gh project` | GitHub Projects の管理 |

### CI/CD・Actions

| コマンド | 説明 |
|---------|------|
| `gh run` | ワークフローランの表示・管理 |
| `gh workflow` | ワークフローの表示・実行・管理 |
| `gh cache` | GitHub Actions キャッシュの管理 |

### リリース・パッケージ

| コマンド | 説明 |
|---------|------|
| `gh release` | リリースの作成・表示・編集 |
| `gh gist` | Gist の作成・表示・編集 |

### Organization

| コマンド | 説明 |
|---------|------|
| `gh org` | Organization の管理 |

### Codespace

| コマンド | 説明 |
|---------|------|
| `gh codespace` | Codespace の作成・管理 |

### セキュリティ・キー

| コマンド | 説明 |
|---------|------|
| `gh ssh-key` | SSH キーの管理 |
| `gh gpg-key` | GPG キーの管理 |
| `gh secret` | Actions / Codespaces / Dependabot シークレットの管理 |
| `gh variable` | Actions 変数の管理 |
| `gh attestation` | アーティファクト証明の管理 |

### 検索

| コマンド | 説明 |
|---------|------|
| `gh search` | リポジトリ・Issue・PR・コードなどの検索 |

### API・拡張

| コマンド | 説明 |
|---------|------|
| `gh api` | GitHub API を直接呼び出し |
| `gh extension` | CLI 拡張機能の管理 |

### その他

| コマンド | 説明 |
|---------|------|
| `gh ruleset` | リポジトリルールセットの表示 |

---

## 主要コマンドの詳細

### gh pr（プルリクエスト）

| サブコマンド | 説明 |
|------------|------|
| `gh pr create` | プルリクエストを作成 |
| `gh pr list` | プルリクエスト一覧を表示 |
| `gh pr view [NUMBER]` | プルリクエストの詳細を表示 |
| `gh pr checkout NUMBER` | PR のブランチをチェックアウト |
| `gh pr merge [NUMBER]` | プルリクエストをマージ |
| `gh pr close [NUMBER]` | プルリクエストをクローズ |
| `gh pr reopen [NUMBER]` | プルリクエストを再オープン |
| `gh pr review [NUMBER]` | プルリクエストをレビュー |
| `gh pr diff [NUMBER]` | プルリクエストの差分を表示 |
| `gh pr checks [NUMBER]` | PR のチェックステータスを表示 |
| `gh pr ready [NUMBER]` | PR をレビュー準備完了にする |
| `gh pr edit [NUMBER]` | PR のタイトル・本文・ラベル等を編集 |
| `gh pr comment [NUMBER]` | PR にコメントを追加 |

#### よく使うフラグ

```bash
# ドラフト PR を作成
gh pr create --draft --title "WIP: Feature" --body "作業中"

# ラベル・レビュアー・アサイニー付きで作成
gh pr create --label bug --reviewer octocat --assignee @me

# ベースブランチを指定
gh pr create --base develop

# Web ブラウザで作成
gh pr create --web

# squash マージ
gh pr merge --squash

# rebase マージ
gh pr merge --rebase

# マージ後にブランチを削除
gh pr merge --delete-branch
```

### gh issue（Issue）

| サブコマンド | 説明 |
|------------|------|
| `gh issue create` | Issue を作成 |
| `gh issue list` | Issue 一覧を表示 |
| `gh issue view [NUMBER]` | Issue の詳細を表示 |
| `gh issue close [NUMBER]` | Issue をクローズ |
| `gh issue reopen [NUMBER]` | Issue を再オープン |
| `gh issue edit [NUMBER]` | Issue を編集 |
| `gh issue comment [NUMBER]` | Issue にコメント |
| `gh issue transfer [NUMBER]` | Issue を別リポジトリに転送 |
| `gh issue pin [NUMBER]` | Issue をピン留め |
| `gh issue unpin [NUMBER]` | Issue のピン留め解除 |
| `gh issue delete [NUMBER]` | Issue を削除 |
| `gh issue develop [NUMBER]` | Issue に対するブランチを作成 |
| `gh issue lock [NUMBER]` | Issue をロック |
| `gh issue unlock [NUMBER]` | Issue のロック解除 |

#### よく使うフラグ

```bash
# ラベル付きで Issue 作成
gh issue create --title "Bug report" --label bug,priority

# アサイニー付きで作成
gh issue create --assignee @me

# フィルタリング
gh issue list --state closed --label bug
gh issue list --assignee @me --state open
```

### gh repo（リポジトリ）

| サブコマンド | 説明 |
|------------|------|
| `gh repo create` | リポジトリを作成 |
| `gh repo clone REPO` | リポジトリをクローン |
| `gh repo fork [REPO]` | リポジトリをフォーク |
| `gh repo view [REPO]` | リポジトリ情報を表示 |
| `gh repo list [OWNER]` | リポジトリ一覧を表示 |
| `gh repo edit [REPO]` | リポジトリ設定を編集 |
| `gh repo delete REPO` | リポジトリを削除 |
| `gh repo rename NEW_NAME` | リポジトリ名を変更 |
| `gh repo archive [REPO]` | リポジトリをアーカイブ |
| `gh repo unarchive [REPO]` | リポジトリのアーカイブ解除 |
| `gh repo sync` | フォークを上流と同期 |
| `gh repo set-default [REPO]` | デフォルトリポジトリを設定 |

### gh run（ワークフローラン）

| サブコマンド | 説明 |
|------------|------|
| `gh run list` | ワークフローラン一覧を表示 |
| `gh run view [RUN_ID]` | ワークフローランの詳細を表示 |
| `gh run watch [RUN_ID]` | ワークフローランをリアルタイム監視 |
| `gh run rerun [RUN_ID]` | ワークフローランを再実行 |
| `gh run cancel [RUN_ID]` | ワークフローランをキャンセル |
| `gh run download [RUN_ID]` | アーティファクトをダウンロード |
| `gh run delete [RUN_ID]` | ワークフローランを削除 |

#### よく使うフラグ

```bash
# ワークフロー名でフィルタリング
gh run list --workflow ci.yml

# 失敗したランのみ表示
gh run list --status failure

# ランのログを表示
gh run view RUN_ID --log

# 失敗したジョブのログのみ
gh run view RUN_ID --log-failed
```

### gh workflow（ワークフロー）

| サブコマンド | 説明 |
|------------|------|
| `gh workflow list` | ワークフロー一覧を表示 |
| `gh workflow view [WORKFLOW]` | ワークフロー情報を表示 |
| `gh workflow run [WORKFLOW]` | ワークフローを手動実行 |
| `gh workflow enable [WORKFLOW]` | ワークフローを有効化 |
| `gh workflow disable [WORKFLOW]` | ワークフローを無効化 |

#### よく使うフラグ

```bash
# 入力パラメータ付きで手動実行
gh workflow run deploy.yml -f environment=production -f version=1.0.0

# 特定ブランチで実行
gh workflow run ci.yml --ref feature-branch
```

### gh api（API 直接呼び出し）

```bash
# GET リクエスト
gh api repos/OWNER/REPO

# POST リクエスト
gh api repos/OWNER/REPO/issues -f title="Bug" -f body="Description"

# GraphQL クエリ
gh api graphql -f query='query { viewer { login } }'

# ページネーション
gh api repos/OWNER/REPO/issues --paginate

# HTTP メソッドを指定
gh api repos/OWNER/REPO/issues/1 --method PATCH -f state=closed

# jq でフィルタリング
gh api repos/OWNER/REPO/pulls --jq '.[].title'
```

### gh search（検索）

| サブコマンド | 説明 |
|------------|------|
| `gh search repos` | リポジトリを検索 |
| `gh search issues` | Issue を検索 |
| `gh search prs` | プルリクエストを検索 |
| `gh search code` | コードを検索 |
| `gh search commits` | コミットを検索 |

```bash
# リポジトリ検索
gh search repos "language:typescript stars:>1000" --sort stars

# Issue 検索
gh search issues "is:open label:bug" --repo OWNER/REPO

# コード検索
gh search code "function main" --language go
```

## 公式ドキュメント

- [GitHub CLI Reference](https://docs.github.com/en/github-cli/github-cli/github-cli-reference)
- [GitHub CLI Manual](https://cli.github.com/manual/)

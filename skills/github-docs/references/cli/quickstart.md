# GitHub CLI クイックスタート

## インストール

### macOS

```bash
brew install gh
```

### Windows

```bash
# winget
winget install --id GitHub.cli

# Chocolatey
choco install gh

# Scoop
scoop install gh
```

### Linux (Debian/Ubuntu)

```bash
(type -p wget >/dev/null || (sudo apt update && sudo apt-get install wget -y)) \
  && sudo mkdir -p -m 755 /etc/apt/keyrings \
  && wget -qO- https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
  && sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && sudo apt update \
  && sudo apt install gh -y
```

### Linux (Fedora/RHEL)

```bash
sudo dnf install gh
```

### その他

GitHub CLI リポジトリのリリースページからバイナリをダウンロード:
https://github.com/cli/cli/releases

## 認証

### ログイン

```bash
gh auth login
```

対話形式で以下を選択:
1. **アカウント種別**: GitHub.com またはカスタムドメイン（GitHub Enterprise Server）
2. **プロトコル**: HTTPS または SSH
3. **認証方式**: ブラウザ認証またはトークン貼り付け

### 認証状態の確認

```bash
gh auth status
```

### アカウントの切り替え

```bash
gh auth switch
```

### ログアウト

```bash
gh auth logout
```

## 基本コマンド

### ステータスの確認

```bash
# 自分に関連するアクティビティを表示
gh status
```

### リポジトリ操作

```bash
# リポジトリを表示
gh repo view OWNER/REPO

# リポジトリをクローン
gh repo clone OWNER/REPO

# 新しいリポジトリを作成
gh repo create
```

### Issue 操作

```bash
# Issue 一覧を表示
gh issue list

# 特定リポジトリの Issue 一覧
gh issue list --repo OWNER/REPO

# Issue を作成
gh issue create

# Issue の詳細を表示
gh issue view NUMBER
```

### プルリクエスト操作

```bash
# PR 一覧を表示
gh pr list

# 特定リポジトリの PR 一覧
gh pr list --repo OWNER/REPO

# PR を作成
gh pr create

# PR の詳細を表示
gh pr view NUMBER

# PR をチェックアウト
gh pr checkout NUMBER
```

### Codespace 操作

```bash
# Codespace を作成
gh codespace create

# Codespace 一覧を表示
gh codespace list

# VS Code で開く
gh codespace code
```

## 設定

### エディタの設定

```bash
gh config set editor "code --wait"
```

### ブラウザの設定

```bash
gh config set browser "firefox"
```

### デフォルトプロトコルの設定

```bash
gh config set git_protocol ssh
```

## エイリアス

よく使うコマンドのショートカットを作成できる。

```bash
# エイリアスの作成
gh alias set prd "pr create --draft"

# エイリアスの使用
gh prd

# エイリアス一覧
gh alias list
```

## ヘルプ

```bash
# トップレベルコマンド一覧
gh

# 特定コマンドのヘルプ
gh pr --help
gh pr create --help
```

## JSON 出力

```bash
# JSON 形式で出力
gh pr list --json number,title,author

# jq でフィルタリング
gh pr list --json number,title --jq '.[].title'
```

## マルチアカウント対応

複数の GitHub アカウントやプラットフォームを切り替えて使用可能。

```bash
# アカウントの追加
gh auth login

# アカウントの切り替え
gh auth switch
```

## 公式ドキュメント

- [GitHub CLI Quickstart](https://docs.github.com/en/github-cli/github-cli/quickstart)

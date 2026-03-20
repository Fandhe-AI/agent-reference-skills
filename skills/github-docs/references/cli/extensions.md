# GitHub CLI 拡張機能

## 拡張機能とは

GitHub CLI の機能を拡張するカスタムコマンド。誰でも作成・公開でき、`gh extension install` でインストールして使用する。

## 拡張機能の管理

### インストール

```bash
# GitHub リポジトリからインストール
gh extension install OWNER/gh-EXTENSION-NAME

# 例
gh extension install mislav/gh-branch
gh extension install dlvhdr/gh-dash
```

### 一覧表示

```bash
gh extension list
```

### アップグレード

```bash
# 全拡張機能をアップグレード
gh extension upgrade --all

# 特定の拡張機能をアップグレード
gh extension upgrade EXTENSION-NAME
```

### アンインストール

```bash
gh extension remove EXTENSION-NAME
```

## 拡張機能の種類

### インタプリタ型（Bash スクリプト）

- Bash で記述された拡張機能
- ユーザーに Bash が必要
- 最もシンプルに作成可能
- 移植性が高い

### プリコンパイル型（Go）

- Go 言語で記述された拡張機能
- コンパイル済みバイナリとして配布
- ユーザーにインタプリタやコンパイラが不要
- クロスプラットフォーム対応が容易

### プリコンパイル型（その他の言語）

- Go 以外の言語でコンパイルされた拡張機能
- `script/build.sh` による自動コンパイルが必要

## 拡張機能の作成

### リポジトリ命名規則

- リポジトリ名は `gh-` で始まる必要がある
- 残りの部分が拡張機能の名前になる
- 例: `gh-dashboard` → `gh dashboard` で実行

### インタプリタ型の作成

```bash
# スキャフォールドの生成
gh extension create EXTENSION-NAME

# 例
gh extension create my-tool
```

生成されるファイル構造:

```
gh-my-tool/
├── gh-my-tool    # 実行可能なBashスクリプト
└── README.md
```

### 手動作成手順

1. `gh-EXTENSION-NAME` ディレクトリを作成
2. 同名の実行可能ファイルを追加

```bash
mkdir gh-hello
cd gh-hello
cat > gh-hello << 'EOF'
#!/usr/bin/env bash
echo "Hello, $1!"
EOF
chmod +x gh-hello
```

3. ローカルでインストールしてテスト

```bash
gh extension install .
gh hello World
```

4. パブリックリポジトリを作成してプッシュ

### Go プリコンパイル型の作成

```bash
# Go プロジェクトとしてスキャフォールド
gh extension create --precompiled=go EXTENSION-NAME
```

生成されるファイル構造:

```
gh-my-tool/
├── main.go
├── go.mod
├── go.sum
└── .github/
    └── workflows/
        └── release.yml    # 自動リリースワークフロー
```

### その他の言語でのプリコンパイル型

```bash
gh extension create --precompiled=other EXTENSION-NAME
```

`script/build.sh` を実装して、自動コンパイルを設定する必要がある。

## バイナリの命名規則

プリコンパイル型拡張機能のバイナリ名:

```
gh-EXTENSION-NAME-OS-ARCHITECTURE[.exe]
```

| プラットフォーム | バイナリ名の例 |
|---------------|-------------|
| macOS (Intel) | `gh-my-tool-darwin-amd64` |
| macOS (Apple Silicon) | `gh-my-tool-darwin-arm64` |
| Linux (64-bit) | `gh-my-tool-linux-amd64` |
| Linux (32-bit) | `gh-my-tool-linux-386` |
| Windows (64-bit) | `gh-my-tool-windows-amd64.exe` |

- Windows バイナリには `.exe` 拡張子が必要
- その他のプラットフォームでは拡張子不要

## 公開

### 公開手順

1. コードをパブリック GitHub リポジトリにプッシュ
2. プリコンパイル型の場合: リリースを作成し、コンパイル済みバイナリをアセットとして添付
3. リポジトリに `gh-extension` トピックを追加して発見可能性を向上

### 自動リリース（Go）

`gh-extension-precompile` GitHub Action を使用して、クロスコンパイルとリリースを自動化できる。

```yaml
# .github/workflows/release.yml
name: release
on:
  push:
    tags:
      - 'v*'
permissions:
  contents: write
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cli/gh-extension-precompile@v2
```

## 開発のヒント

### 引数の取り扱い（Bash）

```bash
#!/usr/bin/env bash
# $1, $2, ... で引数にアクセス
echo "First argument: $1"
echo "Second argument: $2"
```

### GitHub API の利用

拡張機能内から `gh api` コマンドで GitHub API を直接呼び出せる。

```bash
#!/usr/bin/env bash
# リポジトリの Issue 数を取得
gh api repos/"$1"/issues --jq 'length'
```

### JSON 出力の活用

```bash
# --json フラグでプログラマティックにデータを取得
gh pr list --json number,title --jq '.[].title'
```

### Go 用ライブラリ

Go で拡張機能を開発する場合、[go-gh](https://github.com/cli/go-gh) ライブラリで GitHub CLI の機能にアクセスできる。

```go
package main

import (
    "fmt"
    "github.com/cli/go-gh/v2"
)

func main() {
    stdOut, _, err := gh.Exec("pr", "list", "--json", "number,title")
    if err != nil {
        panic(err)
    }
    fmt.Println(stdOut.String())
}
```

## 人気の拡張機能

発見方法:

```bash
# 拡張機能を検索
gh search repos --topic gh-extension --sort stars

# ブラウザで拡張機能一覧を表示
gh ext browse
```

## 公式ドキュメント

- [Creating GitHub CLI extensions](https://docs.github.com/en/github-cli/github-cli/creating-github-cli-extensions)
- [Using GitHub CLI extensions](https://docs.github.com/en/github-cli/github-cli/using-github-cli-extensions)

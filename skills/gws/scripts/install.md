# Install

gws (Google Workspace CLI) のインストールコマンド集。

## GitHub Releases バイナリのダウンロード（推奨）

```sh
# https://github.com/googleworkspace/cli/releases からプラットフォーム別バイナリをダウンロードし $PATH に配置する
```

公式が推奨する方法。最新リリースは GitHub Releases ページから取得する。

## npm でのインストール

```sh
npm install -g @googleworkspace/cli
```

Node.js 環境がある場合に利用できる。

## Homebrew でのインストール（macOS / Linux）

```sh
brew install googleworkspace-cli
```

## Cargo でのインストール

```sh
cargo install --git https://github.com/googleworkspace/cli --locked
```

Rust ツールチェーンが必要。

## Nix でのインストール

```sh
nix run github:googleworkspace/cli
```

インストールせずに直接実行する場合にも使用できる。

## インストール確認

```sh
gws --help
```

## エージェントスキルの追加

```sh
npx skills add https://github.com/googleworkspace/cli
```

サービス別にスキルを追加する場合:

```sh
npx skills add https://github.com/googleworkspace/cli/tree/main/skills/gws-drive
npx skills add https://github.com/googleworkspace/cli/tree/main/skills/gws-gmail
```

## Gemini CLI 拡張機能のインストール

```sh
gws auth setup
gemini extensions install https://github.com/googleworkspace/cli
```

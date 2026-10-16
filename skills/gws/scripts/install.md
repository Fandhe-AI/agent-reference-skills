# Install

gws (Google Workspace CLI) のインストールコマンド集。

## GitHub Releases バイナリのダウンロード（推奨）

公式が推奨する方法。`https://github.com/googleworkspace/cli/releases` からプラットフォーム別バイナリをダウンロードし、アーカイブを展開して `gws` バイナリを `$PATH` に配置する。

## npm でのインストール

```sh
npm install -g @googleworkspace/cli
```

GitHub Releases から適切なバイナリを自動ダウンロードする簡便手段。Node.js 18+ 必須。v0.22.5 から postinstall で SHA256 チェックサム検証、バイナリ欠落時は実行時に自動インストール。

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

サービス別にスキルを追加する場合（上流リポジトリ googleworkspace/cli の `skills/` 配下のパスを指す。本リポジトリのスキルではない）:

```sh
npx skills add https://github.com/googleworkspace/cli/tree/main/skills/gws-drive
npx skills add https://github.com/googleworkspace/cli/tree/main/skills/gws-gmail
```

## Gemini CLI 拡張機能のインストール

```sh
gws auth setup
gemini extensions install https://github.com/googleworkspace/cli
```

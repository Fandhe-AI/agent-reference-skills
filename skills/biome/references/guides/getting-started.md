# Getting Started

Source: https://biomejs.dev/guides/getting-started/

## インストール

Biome はプロジェクトのローカル依存としてインストールする。`-E` フラグでバージョンを固定することを推奨。

```bash
# npm
npm install -D -E @biomejs/biome

# pnpm
pnpm add -D -E @biomejs/biome

# yarn
yarn add -D -E @biomejs/biome

# bun
bun add -D -E @biomejs/biome
```

## 初期設定

`biome.json` 設定ファイルを生成する:

```bash
npx @biomejs/biome init
```

## 基本コマンド

| コマンド | 説明 |
|---|---|
| `biome format --write` | フォーマットを実行し、ファイルに書き込む |
| `biome lint --write` | リントを実行し、安全な修正を適用する |
| `biome check --write` | フォーマット + リント + インポート整理をまとめて実行 |

## CI 環境

CI では `biome ci` を使用する。読み取り専用モードで動作し、ファイルへの修正は行わない。フォーマットやリントの問題があればエラーとして報告される。

```bash
biome ci
```

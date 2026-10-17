---
source: https://vite.dev/guide/#using-unreleased-commits
---

# Unreleased Commits

未リリースの Vite コミットを試すためのコマンド集。

> **警告**: 未リリースのコミットは安定性が保証されない。使い捨てのブランチ・環境で検証する。pkg.pr.new 経由のリリースは直近 1 か月以内のコミットのみ有効で、古いものは purge される。

## pkg.pr.new から特定コミットをインストール

```sh
npm install -D https://pkg.pr.new/vite@SHA
```

```sh
yarn add -D https://pkg.pr.new/vite@SHA
```

```sh
pnpm add -D https://pkg.pr.new/vite@SHA
```

```sh
bun add -D https://pkg.pr.new/vite@SHA
```

`SHA` は Vite リポジトリの任意のコミット SHA に置き換える。

## ローカルに clone して link

```sh
git clone https://github.com/vitejs/vite.git
cd vite
pnpm install
cd packages/vite
pnpm run build
pnpm link # use your preferred package manager for this step
```

pnpm が必須。続いて Vite を使うプロジェクトで `pnpm link vite`（または global link に使ったパッケージマネージャーの同等コマンド）を実行し、開発サーバーを再起動する。

```sh
pnpm link vite
```

## 依存パッケージが使う Vite のバージョンを置き換える

公式は、依存経由の Vite を置き換えるには npm overrides または pnpm overrides を使うよう案内している（コマンドではなく `package.json` / pnpm 設定による。詳細は公式の overrides ドキュメントを参照）。

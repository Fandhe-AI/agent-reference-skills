# Installation

## 新規プロジェクト作成（クイックスタート）

| パッケージマネージャー | コマンド |
|---|---|
| pnpm | `pnpm dlx create-turbo@latest` |
| yarn | `yarn dlx create-turbo@latest` |
| npm | `npx create-turbo@latest` |
| bun | `bunx create-turbo@latest` |

スターターには2つのアプリケーションと3つの共有ライブラリが含まれる。

## グローバルインストール

```bash
pnpm add turbo --global
npm install turbo --global
```

用途:
- `turbo build` — 依存グラフに沿ってビルド
- `turbo build --filter=docs --dry` — ドライラン
- `turbo generate` — コード生成
- `cd apps/docs && turbo build` — 特定パッケージのビルド

## リポジトリへのインストール（devDependency）

```bash
npm install turbo --save-dev
```

チーム間でバージョンを統一するため、ルートの devDependency にも追加する。

## ローカルバージョンへの委譲

グローバルの `turbo` はリポジトリにローカルバージョンが存在する場合、自動的にそちらに委譲する。ワークフローの利便性を保ちつつチーム全体のバージョン一貫性を維持できる。

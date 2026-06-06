# Install

Turborepo のインストールと新規プロジェクト作成コマンド。

## 新規プロジェクト作成（create-turbo）

```sh
# npm
npx create-turbo@latest

# pnpm
pnpm dlx create-turbo@latest

# yarn
yarn dlx create-turbo@latest

# bun
bunx create-turbo@latest
```

スターターには2つのアプリケーションと3つの共有パッケージが含まれる。

## create-turbo のオプション

```sh
npx create-turbo@latest [options]
```

| フラグ | 説明 |
|---|---|
| `-m, --package-manager` | パッケージマネージャーを指定 |
| `-e, --example` | テンプレート名または GitHub URL |
| `--skip-install` | 依存関係のインストールをスキップ |
| `--turbo-version` | インストールする turbo バージョンを指定 |

## グローバルインストール

```sh
# npm
npm install turbo --global

# pnpm
pnpm add turbo --global

# yarn
yarn global add turbo

# bun
bun install turbo --global
```

グローバルの `turbo` はリポジトリにローカルバージョンが存在する場合、自動的にそちらに委譲する。

## devDependency としてのインストール

```sh
# npm
npm install turbo --save-dev

# pnpm
pnpm add turbo --save-dev --ignore-workspace-root-check

# yarn
yarn add turbo --dev --ignore-workspace-root-check

# bun
bun install turbo --dev
```

チーム全体でバージョンを統一するため、ワークスペースルートの devDependency に追加する。

## 既存リポジトリへの追加（pnpm の例）

```sh
pnpm add turbo --global
pnpm add turbo --save-dev --ignore-workspace-root-check
```

Step 2 以降は `turbo.json` 作成、`.gitignore` への `.turbo` 追加、`packageManager` フィールドの設定が必要。

## @turbo/gen のインストール（カスタムジェネレーター使用時）

```sh
# npm
npm install @turbo/gen --save-dev

# pnpm
pnpm add @turbo/gen --save-dev

# yarn
yarn add @turbo/gen --dev
```

TypeScript でカスタムジェネレーターを作成する場合に必要。

---
source: https://ui.shadcn.com/docs/installation
---

# Install

プロジェクト作成・shadcn/ui 初期化・コンポーネント追加のコマンド集。出典は公式ドキュメントの installation 各ページ（取得日 2026-10-16、`shadcn` CLI 4.22.0）。

## 既存プロジェクトの初期化

```sh
npx shadcn@latest init
```

前提: 既存プロジェクトのルートで実行。`components.json` と `cn` ユーティリティが作られ、CSS 変数が設定される。

## Next.js プロジェクトの新規作成（CLI）

```sh
npx shadcn@latest init -t next
```

前提: プロンプトで base / preset / monorepo などを選択する。

## Next.js モノレポの新規作成

```sh
npx shadcn@latest init -t next --monorepo
```

## shadcn/create で生成した preset を使う（Next.js）

```sh
npx shadcn@latest init --preset [CODE] --template next
```

`[CODE]` は shadcn/create で作成した preset コード。生成されたコマンドには `--base` / `--monorepo` / `--rtl` などが含まれる場合がある。

## テンプレート別の初期化（-t / --template）

```sh
npx shadcn@latest init -t vite
npx shadcn@latest init -t start
npx shadcn@latest init -t react-router
npx shadcn@latest init -t astro
```

`--template` の値は `next` / `vite` / `start` / `react-router` / `laravel` / `astro`（cli の Options 記載）。

## テンプレート別の preset 指定

```sh
npx shadcn@latest init --preset [CODE] --template vite
npx shadcn@latest init --preset [CODE] --template start
npx shadcn@latest init --preset [CODE] --template react-router
npx shadcn@latest init --preset [CODE] --template laravel
npx shadcn@latest init --preset [CODE] --template astro
```

## base（Radix / React Aria）の指定

```sh
npx shadcn init -b radix
npx shadcn@latest init --base aria
```

`-b, --base` の値は `base` / `radix` / `aria`。2026-07 以降の既定は Base UI で、非対話の CI などで Radix を維持したい場合は `-b radix` を付ける（changelog 記載）。

## コンポーネントの追加

```sh
npx shadcn@latest add button
npx shadcn@latest add card
```

## モノレポでワークスペースを指定して追加

```sh
npx shadcn@latest add card -c apps/web
```

前提: モノレポ構成で作成済み。`apps/web` 内で実行するか、ルートから `-c` でワークスペースを指定する。

## フレームワークごとの事前コマンド

```sh
npx create-next-app@latest
npx create-next-app@latest --src-dir
npm create vite@latest
npm install tailwindcss @tailwindcss/vite
npm install -D @types/node
npm create react-router@latest
npx @tanstack/cli@latest create
npx create-tsrouter-app@latest my-app --template file-router --tailwind --add-ons shadcn
npm create astro@latest astro-app -- --template with-tailwindcss --install --add react --git
laravel new my-app
npm init gatsby
npx create-remix@latest my-app
```

各行は別フレームワークの手順。該当するもののみ実行する。Vite は上 3 行に加え tsconfig / vite.config の編集が必要（`references/getting-started/vite.md` を参照）。

## 手動インストールの依存パッケージ

```sh
npm install shadcn class-variance-authority cn lucide-react tw-animate-css
```

`installation/manual` の手順。以降の CSS / `components.json` 設定は `references/getting-started/manual.md` を参照。

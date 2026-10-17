---
source: https://ui.shadcn.com/docs/registry/getting-started
---

# Registry

自前レジストリのビルド・配信・検証・利用のコマンド集。出典は公式 registry の getting-started / github / namespace / dynamic-search / health ページ（取得日 2026-10-16）。

## レジストリ JSON のビルド

```sh
npx shadcn@latest build
```

`registry.json` から静的 JSON を `public/r`（例: `public/r/button.json`）に出力する。出力先は `--output` で変更できる。

## 配信用の開発サーバー起動（Next.js の例）

```sh
npm run dev
```

`http://localhost:3000/r/[NAME].json` で配信される。コマンドはフレームワークにより異なる。

## 動的ルートハンドラー用の依存追加

```sh
npm install shadcn
```

`shadcn/registry` の `loadRegistry` などを使う場合に `shadcn` をランタイム依存として入れる。

## ローカル配信レジストリのテスト（URL 指定）

```sh
npx shadcn@latest list http://localhost:3000/r/registry.json
npx shadcn@latest search http://localhost:3000/r/registry.json --query button
npx shadcn@latest view http://localhost:3000/r/button.json
npx shadcn@latest add http://localhost:3000/r/button.json
```

`list` / `search` にはカタログ URL、`view` / `add` には項目 URL を渡す。`add` は導入先プロジェクトで実行する。

## 名前空間としてレジストリを追加

```sh
npx shadcn@latest registry add @acme=http://localhost:3000/r/{name}.json
npx shadcn@latest registry add @acme=https://acme.com/r/{name}.json
```

`components.json` を持つプロジェクトで実行する。`{name}` は項目 JSON に解決される必要がある。

## 名前空間レジストリの利用

```sh
npx shadcn@latest list @acme
npx shadcn@latest search @acme --query button
npx shadcn@latest view @acme/button
npx shadcn@latest add @acme/button
```

複数指定も可能。

```sh
npx shadcn@latest add @acme/header @lib/auth-utils @ai/chatbot-rules
npx shadcn@latest search @v0 @acme @lib
npx shadcn@latest search @v0 --limit 10 --offset 20
```

## URL・ローカルパスからの追加

```sh
npx shadcn@latest add https://registry.example.com/button.json
npx shadcn@latest add ./local-registry/button.json
```

## GitHub リポジトリをレジストリとして使う

```sh
npx shadcn@latest add <username>/<repo>/<item>
npx shadcn@latest add acme/toolkit/project-conventions
npx shadcn@latest list acme/toolkit
npx shadcn@latest search acme/toolkit --query conventions
npx shadcn@latest view acme/toolkit/project-conventions
```

リポジトリ直下に `registry.json` を置く。ブランチ・タグ・コミット SHA は `#` で指定する。

```sh
npx shadcn@latest add acme/toolkit/project-conventions#v1.0.0
npx shadcn@latest add acme/toolkit/project-conventions#main
```

## GitHub レジストリの検証

```sh
npx shadcn@latest registry validate acme/toolkit
npx shadcn@latest registry validate acme/toolkit#v1.0.0
```

ルートの `registry.json` を読み、include の解決・項目の検証・参照ファイルの存在確認を行う。

## レジストリ index への登録前検証

```sh
pnpm validate:registries
```

`shadcn-ui/ui` リポジトリの `apps/v4/registry/directory.json` に追加した後、そのリポジトリ内で実行する検証コマンド（registry-index ページ記載）。

## Registry Health が使う CLI チェック

```sh
npx shadcn@latest add --dry-run
```

Registry Health の週次 CLI チェックは項目が `shadcn add --dry-run` で動作するかを確認する（health ページ記載）。ディレクトリ登録済みレジストリのみが対象で、手元の検証には上記の `list` / `view` / `add` を使う。公式に health 専用のコマンドは記載されていない。

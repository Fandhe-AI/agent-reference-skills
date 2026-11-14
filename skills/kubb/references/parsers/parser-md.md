# @kubb/parser-md

Kubb の AST から `.md` / `.markdown` ファイルを生成するパーサー。ソースブロックを改行で連結し、ファイルの meta から YAML フロントマターを付与する。

## インストール

`kubb` に同梱され、`kubb/config` の `defineConfig` が既定で登録するため追加インストールは不要。単体では次のとおり（`@beta` は不要）。

```bash
npm install --save-dev @kubb/parser-md
pnpm add -D @kubb/parser-md
bun add -d @kubb/parser-md
yarn add -D @kubb/parser-md
```

## Signature / Usage

```typescript
import { defineConfig } from "kubb/config"
import { parserTs, parserTsx } from "@kubb/parser-ts"
import { parserMd } from "@kubb/parser-md"

export default defineConfig({
  // ...
  parsers: [parserTs(), parserTsx(), parserMd()],
})
```

Markdown のみを扱う場合は `parsers: [parserMd()]` のように単独でも登録できる。

## フロントマター設定

プラグイン内でファイルの `meta.frontmatter` を設定すると YAML フロントマターが自動的にシリアライズされる。

```typescript
ast.factory.createFile({
  baseName: 'README.md',
  path: `${config.output.path}/README.md`,
  meta: {
    frontmatter: { title: 'API Reference', layout: 'doc' },
  },
  sources: [/* ... */],
})
```

出力例:

```markdown
---
title: API Reference
layout: doc
---
```

## Notes

- `parserMd()` はオプションを取らない（設定不要のゼロコンフィグパーサー）
- プラグイン依存を持たないスタンドアロンパーサー。`defineConfig` でもバンドラー連携でも `parserTs` / `parserTsx` と並んで既定登録される。独自の `parsers` 配列は既定セットを置き換えるため、必要なパーサーをすべて列挙する
- ファイルのソースブロックを空行区切りのプレーン Markdown として連結する。`meta.frontmatter` は banner がある場合その後ろ、本文の前に YAML として出力され、空オブジェクトまたは `null` では何も書かれない。file banner を設定した場合は frontmatter の上に置かれる
- `parserMd().print(...parts)` は Markdown 文字列を空行で連結し、空のものは飛ばす。文字列のみを受け取るため、frontmatter は常に `meta.frontmatter` から出力される
- Source: https://kubb.dev/extensions/kubb-labs/parser-md (packages/parser-md/docs/{overview,options}.md of kubb@5.20.0, retrieved 2026-11-14)
- Migration (5.11 → 5.20): `parserMd().print` no longer accepts objects (the 5.11 docs showed `parserMd().print({ title: 'Pets', layout: 'doc' })` returning frontmatter); it takes Markdown strings only, and the parser is now registered by the bundler integrations too (docs diff 5.11 → 5.20)

## Related

- [@kubb/parser-ts](./parser-ts.md)

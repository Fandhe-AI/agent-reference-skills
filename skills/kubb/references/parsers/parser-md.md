# @kubb/parser-md

Kubb の AST から `.md` / `.markdown` ファイルを生成するパーサー。ソースブロックを改行で連結し、ファイルの meta から YAML フロントマターを付与する。

## インストール

```bash
npm install --save-dev @kubb/parser-md@beta
pnpm add -D @kubb/parser-md@beta
bun add -d @kubb/parser-md@beta
yarn add -D @kubb/parser-md@beta
```

## Signature / Usage

```typescript
import { defineConfig } from "@kubb/core"
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
- プラグイン依存を持たないスタンドアロンパーサー。デフォルト設定では TypeScript パーサーと並んで自動的に実行される
- `parserMd().print()` はオブジェクトと markdown 文字列から直接フロントマター付き文書を構築できる

## Related

- [@kubb/parser-ts](./parser-ts.md)

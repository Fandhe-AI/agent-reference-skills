# @kubb/parser-ts

Kubb の AST（`FileNode`）を公式 TypeScript コンパイラで TypeScript ソースコードに変換するパーサー。全プラグインが実際の `.ts` / `.tsx` / `.js` / `.jsx` ファイルを書き出すための出力層。

## インストール

```bash
npm install --save-dev @kubb/parser-ts@beta
pnpm add -D @kubb/parser-ts@beta
bun add -d @kubb/parser-ts@beta
yarn add -D @kubb/parser-ts@beta
```

## Signature / Usage

```typescript
import { defineConfig } from "@kubb/core"
import { parserTs, parserTsx } from "@kubb/parser-ts"

export default defineConfig({
  // ...
  parsers: [parserTs()], // React プロジェクトでは parserTsx() も併用
})
```

- `parserTs()` — `.ts` / `.js` ファイルを処理
- `parserTsx()` — `.tsx` / `.jsx` ファイルを処理（React プロジェクト向け推奨）

デフォルト設定では自動的に実行される。`parsers` 配列を独自定義すると既定セットが丸ごと置き換わるため、その場合は明示的に含める必要がある。

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `extension` | `Record<string, string>` | `{ '.ts': '' }` | `import` / `export` 文の拡張子を書き換える。key がソース拡張子、value が出力拡張子、`''` で拡張子を落とす |

### 使用例

```typescript
parserTs({ extension: { '.ts': '.js' } }) // './api' ではなく './api.js' を出力（ESM デュアルパッケージ向け）
parserTs({ extension: { '.ts': '.ts' } }) // './api' ではなく './api.ts' を出力（Node16/NodeNext resolution 向け）
```

## Notes

- import パスの解決、import/export 文の記述、JSDoc の出力、`extension` オプションに基づく拡張子の書き換えを行う
- プラグイン依存を持たないスタンドアロンパーサー。`defineConfig` の `parsers` 配列への登録のみが必要
- `extension` は import 文中のモジュール指定子の文字列だけを変更する。実際のディスク上のファイル名には影響しない

## Related

- [@kubb/parser-md](./parser-md.md)

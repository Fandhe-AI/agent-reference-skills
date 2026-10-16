# @kubb/parser-ts

Kubb の AST（`FileNode`）を公式 TypeScript コンパイラで TypeScript ソースコードに変換するパーサー。全プラグインが実際の `.ts` / `.tsx` / `.js` / `.jsx` ファイルを書き出すための出力層。

## インストール

`kubb` に同梱され、`kubb/config` の `defineConfig` が `parserTs` / `parserTsx` / `parserMd` を既定で登録するため追加インストールは不要。単体では次のとおり（安定版 5.11.0、`@beta` は不要）。

```bash
npm install --save-dev @kubb/parser-ts
pnpm add -D @kubb/parser-ts
bun add -d @kubb/parser-ts
yarn add -D @kubb/parser-ts
```

## Signature / Usage

```typescript
import { defineConfig } from "kubb/config"
import { parserTs, parserTsx } from "@kubb/parser-ts"

export default defineConfig({
  // ...
  parsers: [parserTs(), parserTsx()],
})
```

- `parserTs()` — `.ts` / `.js` ファイルを処理
- `parserTsx()` — `.tsx` / `.jsx` ファイルを処理（同じオプション。`extension` マップは各自で読むため `.tsx` キーも設定する）

`defineConfig` は既定で `parserTs` / `parserTsx` / `parserMd` を登録する（バンドラー連携は `parserTs` / `parserTsx` のみ）。`parsers` 配列を独自定義すると既定セットが丸ごと置き換わるため、プラグインが必要とするパーサーをすべて明示する。どのパーサーにも処理されないファイルは、import / export / banner / footer なしのソーステキストのみで書かれる。

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `extension` | `Record<string, string>` | `{ '.ts': '' }` | 相対 `import` / `export` 文の拡張子を書き換える。key が生成ファイルの拡張子、value がそのファイル内の相対指定子に付く拡張子。`''` で拡張子を落とす（key が無い拡張子も落ちる）。パッケージ指定子とディスク上のファイル名は変わらない |

### 使用例

```typescript
parserTs({ extension: { '.ts': '.js' } }) // './api' ではなく './api.js' を出力（ESM で JavaScript にコンパイルする場合）
parserTs({ extension: { '.ts': '.ts' } }) // './api.ts' を出力（Node.js で .ts を直接実行、または rewriteRelativeImportExtensions でコンパイルする場合）
parserTsx({ extension: { '.tsx': '.js' } }) // parserTsx は独自の extension マップを読む
```

## Notes

- import パスの解決、import/export 文の記述、JSDoc の出力、`extension` オプションに基づく拡張子の書き換えを行う
- プラグイン依存を持たないスタンドアロンパーサー。`defineConfig` が既定で登録する
- `extension` は import 文中の相対モジュール指定子の文字列だけを変更する。実際のディスク上のファイル名には影響しない
- 同じ `extension` マップがプラグインが出力にコピーするランタイムテンプレート（`@kubb/plugin-fetch` の `.kubb/` ファイルなど）にも適用され、出力全体が 1 つの規約に従う

## Related

- [@kubb/parser-md](./parser-md.md)

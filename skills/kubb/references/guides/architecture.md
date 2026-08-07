# アーキテクチャ

Kubb は API 仕様をコードへ変換する多層パイプラインを持つ。

## パイプライン概要

Kubb は次の順序でレイヤーを通過する:

1. **[Adapter](./architecture.md#adapter)** — 仕様（OpenAPI 等）をパースし、共通の [AST](./ast.md) に変換する
2. **Macros** — Generator が読み取る前に AST ノードを書き換える（[macros.md](./macros.md)）
3. **[Plugins](./concepts-plugins.md)** — AST を走査し `FileNode` を出力する
4. **Parsers** — 各 `FileNode` をソースコード文字列に変換する
5. **Storage** — 結果をディスクへ書き込む

## Config

`kubb/config` の `defineConfig` は Adapter・デフォルトの Parsers・barrel プラグインを事前に配線するため、最小構成では `input` と `output` のみで済む。

```typescript
import { defineConfig } from 'kubb/config'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [],
})
```

プログラマティックなビルドやカスタムツール連携が必要な場合のみ `createKubb` を使う。

## Adapter

仕様を読み取り `InputNode` を返す。null 許容性・`$ref` 解決・discriminator・バイナリ判定など、仕様固有の判断をすべて担う。`@kubb/adapter-oas` が OpenAPI 2.0/3.0/3.1 をカバーし、`defineConfig` が自動的に選択する。

## AST

Adapter と Plugin の間の契約。すべての Adapter が生成し、すべての Plugin が読み取るため、同一の Plugin がどの仕様でも動作する（[ast.md](./ast.md)）。

## Macros

Generator がコードを出力する前に schema・operation ノードを書き換える 2 回目の AST パス。プラグインの `macros` オプション経由で渡す（[macros.md](./macros.md)）。

## Plugins

AST を走査して `FileNode` を出力する。配列順に実行されるため、型プラグインを先に実行し、後続のクライアントプラグインがその型を import できる（[concepts-plugins.md](./concepts-plugins.md)）。

## Generators

Generator は Plugin がコードを生成する場所。schema 単位・単一 operation 単位・operation セット全体単位で読み取り、対応するファイルを返す（[generators.md](./generators.md)）。

## Renderer

Generator は `FileNode` を手動構築するか、コンポーネントとして記述できる。後者のオプション経路が `kubb/jsx`（[renderers.md](./renderers.md)）。

## Resolvers

生成される全ファイルの名前とパスを決定する。Generator は文字列を自前構築せず Resolver に問い合わせるため、命名が一貫する（[resolvers.md](./resolvers.md)）。

## Parsers

`FileNode` をソース文字列に変換する。各 Parser は担当する拡張子を持ち、`@kubb/parser-ts` と `@kubb/parser-md` が標準搭載される。

## Storage

生成ファイルの書き込み先を決定する。

- `fsStorage()` — ディスクへ書き込み、変更のないファイルはスキップ（デフォルト）
- `memoryStorage()` — `Map` に保持。テストに最適
- カスタム `Storage` — 任意のバックエンドを対象にできる

## Integrations and AI

- `unplugin-kubb` は Vite・Rollup・webpack・esbuild・Rspack・Nuxt・Astro などビルドツール内で Kubb を実行する
- `kubb mcp` コマンドは MCP 経由で LLM クライアントへ生成機能を公開する

## Notes

- 各レイヤーの詳細は個別ページを参照（Adapter は [adapter-oas.md](../adapters/adapter-oas.md)、Parser は [parser-ts.md](../parsers/parser-ts.md) 等）

## Related

- [concepts-plugins](./concepts-plugins.md)
- [generators](./generators.md)
- [resolvers](./resolvers.md)
- [renderers](./renderers.md)
- [ast](./ast.md)
- [macros](./macros.md)

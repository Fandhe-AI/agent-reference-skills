# アーキテクチャ

Kubb は入力仕様・生成内容・出力構文・出力先を分離した多層パイプラインで API 仕様をコードへ変換する（Kubb 5.11.0 / docs 5.x explanation/architecture に準拠。旧パスから `/docs/5.x/explanation/architecture` へ移動）。

## レイヤー

| Layer | Responsibility |
| --- | --- |
| Adapter | Read the specification and produce an `InputNode`. |
| AST | Describe schemas and operations in a shared tree. |
| Plugin | Run generators that emit `FileNode`s. |
| Parser | Convert emitted nodes into source code. |
| Storage | Persist the generated files. |

## 1 つの operation からファイル生成まで

`GET /pet/{petId}`（operation ID `getPetById`、レスポンスが再利用可能な `Pet` スキーマを参照）の場合:

1. adapter が仕様を読み、参照を schema と operation に解決する
2. 共有 AST が `Pet` のフィールド・path パラメーター・レスポンスを記述する（Axios / Fetch / Zod は選ばない）
3. TypeScript プラグインがモデル型とレスポンス型を生成し、Axios プラグインがそれを import する `getPetById` クライアントを生成する。Zod プラグインは同じ入力から検証スキーマを生成できる
4. parser が各プラグインの emit したノードをソーステキストにし、Storage が出力先へ書き込む

## Config

`kubb/config` の `defineConfig` は adapter・既定の parsers・barrel プラグインを事前に配線するため、最小構成では `input` と `output` のみで済む。

```typescript
import { defineConfig } from 'kubb/config'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [],
})
```

プログラマティックなビルドやカスタムツール連携が必要な場合のみ `createKubb` を使う。

## Adapters

adapter は入力固有の詳細（参照・null 許容性・discriminator・format）を解決する。既定の OpenAPI adapter（`@kubb/adapter-oas`）は OpenAPI 2.0 / 3.0 / 3.1 に対応する。カスタム adapter は別の入力形式を同じ AST に変換するため、下流のプラグインはその形式を直接読まない。

## AST

adapter とプラグイン間の共有モデル（[ast.md](./ast.md)）。入力を 1 度正規化するため、各プラグインは OpenAPI の参照解決を実装せずに schema と operation を扱える。`InputNode` は再利用可能な schema と operation を持ち、operation はパラメーター・リクエストボディ・レスポンスを schema ノードに結びつける。リクエストボディとレスポンスは content type ごとに 1 つの `ContentNode` を持つ。ノードは `kind` 判別子を持ち、schema は `type` 判別子も持つ。`transform` visitor がノードを書き換え、`collect` が一致ノードを集める。`ast` 名前空間は `kubb/kit` から import する。

## Plugins と Generators

各プラグインは型・クライアント・hooks・バリデーター・モック・カスタムファイルのいずれかの出力を所有する。generator は個々の schema・個々の operation・operation セット全体を扱う（[generators.md](./generators.md)、[concepts-plugins.md](./concepts-plugins.md)）。配列順に実行されるため、型プラグインを先に置くと後続のクライアントプラグインがその型を import できる。

Macros は generator が使う前に AST ノードを書き換える（[macros.md](./macros.md)）。プラグインごとに実行されるため、1 つのプラグインの変換が他のプラグインの入力を変えない。Resolvers は生成ファイル全体で名前とパスを一貫させる（[resolvers.md](./resolvers.md)）。クライアントは型プラグインの resolver を読むため、名前をカスタマイズしても import が壊れない。

Generator は `FileNode` を手動構築するか、コンポーネントとして記述できる。後者のオプション経路が `kubb/jsx`（[renderers.md](./renderers.md)）。

## Parsers

各 parser は担当する拡張子を持ち、Kubb は emit されたファイルに応じて選択し、生成中にノードを出力して `parse` で最終ソースを組み立てる。既定の parser は `.ts` / `.tsx` / `.md` を扱う。TypeScript parser は `FileNode` の banner・imports・各 source ノードをファイルテキストに出力する。

責務の違い: プラグインが emit するファイルと宣言を選び、printer が個々の schema の出力方法を選び、parser がファイルのソーステキストを組み立てる。

## Storage

生成を出力先から分離するため、同じビルドを CLI ではディスク、テストではメモリで実行できる。

- `fsStorage()` — ディスクへ書き込む（既定）
- `memoryStorage()` — `Map` に保持。テストに最適
- カスタム `Storage` — Storage interface を実装して任意のバックエンドを対象にできる

## Notes

- 各レイヤーの詳細は個別ページを参照（Adapter は [adapter-oas.md](../adapters/adapter-oas.md)、Parser は [parser-ts.md](../parsers/parser-ts.md) 等）
- 旧版にあった「Integrations and AI」節（`unplugin-kubb` / `kubb mcp`）は 5.x の architecture ページに無い。[unplugin.md](../helpers/unplugin.md) と [cli.md](../helpers/cli.md) を参照

## Related

- [concepts-plugins](./concepts-plugins.md)
- [generators](./generators.md)
- [resolvers](./resolvers.md)
- [renderers](./renderers.md)
- [ast](./ast.md)
- [macros](./macros.md)

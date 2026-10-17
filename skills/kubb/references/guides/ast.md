# AST（概念）

Kubb の共通 Abstract Syntax Tree はパイプラインの 2 つの半分をつなぐ契約。[Adapter](../adapters/adapter-oas.md) が仕様（既定の adapter は OpenAPI 2.0 / 3.0 / 3.1。カスタム adapter で他形式も可）から AST を生成し、[Plugin](./concepts-plugins.md) がそれを読み取ってファイルを出力する。すべての Plugin が同じツリーを読むため、1 つの Plugin がカスタム Adapter を含むどの仕様に対しても動作する。

## ツリーの形

頂点に単一の `InputNode` があり、再利用可能な schema と operation を保持する。Operation は parameters・任意の request body・responses を指し、それぞれが schema に接続する。

`SchemaNode` は `type` によって判別され、3 つのグループのいずれかに属する。

Request body と response はコンテンツタイプ（例: `application/json`）ごとに 1 つの `ContentNode` を持ち、各 content node は自身の body schema を保持する。

- すべての子スロットはノードであるため、1 回の走査で `transform` と `collect` の両方をツリー全体に対して駆動できる
- すべてのノードは判別用の `kind` フィールドも持つため、`switch (node.kind)` で型を絞り込める

## 仕様非依存な設計

Plugin は OpenAPI を直接見ることはない。Adapter が生成したツリーを読むだけなので、同じ Plugin が OpenAPI 2.0・3.0・3.1、そして任意のカスタム Adapter に対して動作する。

## AST がパイプラインをつなぐ仕組み

同じツリーが 4 つのステージを流れる:

- [Adapters](../adapters/adapter-oas.md) が仕様から AST を構築する
- [Plugins](./concepts-plugins.md) がそれを読み取ってファイルを出力する
- [Macros](./macros.md) が印字前にノードを書き換える
- Parsers が出力されたノードをソースコードへ変換する

## Notes

- The concept page was removed in the 5.x docs reorganization. AST content now lives in the Kit reference (`reference/kit/ast`; see [ast.md](../kit/ast.md)), which covers the schema node types (structural / scalar / special), `ast.factory` builders, the `transform` / `collect` (`collectSync`) visitors, guards (`narrowSchema`, `isHttpOperationNode`), ref and schema-graph helpers, macros (`defineMacro` / `composeMacros` / `applyMacros`), and `createPrinter`
- The architecture overview of the AST moved to the `#ast` section of explanation/architecture ([architecture.md](./architecture.md))
- `ast` namespace とその `factory` ノードビルダーは `kubb/kit` から import する。guard・macro・printer・visitor もすべて同じ namespace に属する。詳細は Kit API リファレンス（[kit-api.md](../reference/kit-api.md)）を参照

## Related

- [kit/ast](../kit/ast.md)
- [architecture](./architecture.md)
- [macros](./macros.md)
- [printers](./printers.md)
- [concepts-plugins](./concepts-plugins.md)

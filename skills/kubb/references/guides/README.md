# guides

| Name | Description | Path |
|------|-------------|------|
| アーキテクチャ | Kubb は API 仕様をコードへ変換する多層パイプラインを持つ。 | [architecture.md](./architecture.md) |
| AST（概念） | Kubb の共通 Abstract Syntax Tree はパイプラインの 2 つの半分をつなぐ契約。 | [ast.md](./ast.md) |
| Plugins（概念） | Plugin は Kubb に新しい生成対象を教える拡張ポイント。 | [concepts-plugins.md](./concepts-plugins.md) |
| カスタムプラグインの作成 | Plugin は Kubb に新しい生成対象を教える拡張機能。 | [creating-plugins.md](./creating-plugins.md) |
| Generators（概念） | Generator は Plugin がコードを生成する場所。 | [generators.md](./generators.md) |
| Macro の作成 | Macro は Kubb の AST に対する、名前付きで合成可能な変換。 | [macros.md](./macros.md) |
| マイグレーションガイド | Kubb v5 への移行。 | [migration-guide.md](./migration-guide.md) |
| Printer の上書き | Printer はパイプラインの終端ではなく、Plugin の Generator 内部で動作する。 | [printers.md](./printers.md) |
| Renderers（概念） | Renderer は、Generator が返すものとエンジンが書き込む FileNode との間のステップ。 | [renderers.md](./renderers.md) |
| Resolver のカスタマイズ | Resolver は生成コードの名前を決める。 | [resolver-customization.md](./resolver-customization.md) |
| Resolvers（概念） | Resolver は Plugin が出力する各ファイルについて「名前」と「パス」の 2 つの問いに答える。 | [resolvers.md](./resolvers.md) |
| 基本チュートリアル | OpenAPI 仕様から TypeScript 型を生成するステップバイステップガイド。 | [tutorial.md](./tutorial.md) |

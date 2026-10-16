# guides

| Name | Description | Path |
|------|-------------|------|
| アーキテクチャ | Kubb は入力仕様・生成内容・出力構文・出力先を分離した多層パイプラインで API 仕様を… | [architecture.md](./architecture.md) |
| AST（概念） | Kubb の共通 Abstract Syntax Tree はパイプラインの 2 つの半分をつなぐ契約。 | [ast.md](./ast.md) |
| Barrel files | Barrel file は、ディレクトリ内のすべてを re-export する `index.ts`。利用側は 1 か所から… | [barrel-files.md](./barrel-files.md) |
| Plugins（概念） | Plugin は Kubb に新しい生成対象を教える拡張ポイント。 | [concepts-plugins.md](./concepts-plugins.md) |
| カスタムプラグインの作成 | `listPets.ts` に 1 つの API operation の method と path を書き出すプラグインを作成し… | [creating-plugins.md](./creating-plugins.md) |
| Generators（概念） | Generator は Plugin がコードを生成する場所。Plugin がオプション・ライフサイクル・配線を… | [generators.md](./generators.md) |
| Macro の作成 | Macro は Kubb の AST に対する、名前付きで合成可能な変換。Adapter が生成する schema・… | [macros.md](./macros.md) |
| マイグレーションガイド | Kubb 5.11.0 / docs 5.x how-to/migration（"Upgrade from v4 to v5"）に準拠。 | [migration-guide.md](./migration-guide.md) |
| Printer の上書き | Printer はパイプラインの終端ではなく、Plugin の Generator 内部で動作する。 | [printers.md](./printers.md) |
| Publish a plugin | Plugin を npm へ publish し、Kubb registry に登録すると、ユーザーは `kubb add` で… | [publish-a-plugin.md](./publish-a-plugin.md) |
| Configure generation (recipes) | Kubb をインストール済みで OpenAPI 仕様があるプロジェクトで使う設定例。 | [recipes.md](./recipes.md) |
| Renderers（概念） | Renderer は、Generator が返すものとエンジンが書き込む `FileNode` との間のステップ。 | [renderers.md](./renderers.md) |
| Resolver のカスタマイズ | Resolver は生成コードの名前を決める。Adapter が仕様を AST へ変換し、Generator が… | [resolver-customization.md](./resolver-customization.md) |
| Resolvers（概念） | Resolver は Plugin が出力する各ファイルについて「名前」と「パス」の 2 つの問いに答える。 | [resolvers.md](./resolvers.md) |
| Submit to the registry | extension を Kubb registry に submit すると、kubb.dev/extensions と Kubb Studio に掲載され… | [submit-to-the-registry.md](./submit-to-the-registry.md) |
| 基本チュートリアル | OpenAPI 仕様から TypeScript 型と Axios クライアントを生成するステップバイステップガイド。 | [tutorial.md](./tutorial.md) |

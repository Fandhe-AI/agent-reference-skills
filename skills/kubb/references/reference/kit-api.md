# Kit API (`kubb/kit`)

カスタムプラグイン・独自ロジックを構築するためのツールキット（Kubb 5.11.0 / docs 5.x reference/kit）。`kubb` パッケージに含まれ、`kubb/kit` サブパスから追加インストール不要で利用可能。`@kubb/kit` を直接依存に入れず `kubb` をインストールして `kubb/kit` から import する。

## インポート

```typescript
import { ast, defineExtension, defineGenerator, createResolver, createRenderer, createStorage, fsStorage, memoryStorage, Diagnostics } from 'kubb/kit'
```

## コア概念

| コンポーネント | エントリポイント | 役割 | 詳細ページ |
|-----------|------------|------|-----------|
| Plugins | `defineExtension` (`kind: 'plugin'`) | 主要な拡張ポイント。ファイル命名、出力フォルダ、ライフサイクルフックを所有する | [plugins.md](../kit/plugins.md) |
| Generators | `defineGenerator` | AST を走査してファイルを出力する。プラグインは 1 つ以上を登録する | [generators.md](../kit/generators.md) |
| Resolvers | `createResolver` | ファイル名と出力パスを決定する。他のプラグインが名前で参照する | [resolvers.md](../kit/resolvers.md) |
| Renderers | `createRenderer`, `jsxRenderer` | Generator が返す要素を `FileNode` に変換する | `reference/jsx`（公式） |
| Adapters | `defineExtension` (`kind: 'adapter'`) | 入力仕様を、全プラグインが読み取る universal AST に変換する | [adapters.md](../kit/adapters.md) |
| Parsers | `defineExtension` (`kind: 'parser'`) | `FileNode` をディスクに書き込むソース文字列に変換する | [parsers.md](../kit/parsers.md) |
| Extensions | `defineExtension`, `meta`, `dependencies` | プラグイン・adapter・parser が共有するもの: `kind`、識別情報、互換性範囲、プラグイン依存 | [extensions.md](../kit/extensions.md) |
| Storage | `createStorage`, `fsStorage`, `memoryStorage` | 生成ファイルの格納先を決定する | [storage.md](../kit/storage.md) |

## その他の要素

| 要素 | エントリポイント | 役割 | 詳細ページ |
|------|------------|------|-----------|
| AST and node builders | `ast` | `factory` ビルダー・visitor・guard・macro・printer の名前空間 | [ast.md](../kit/ast.md) |
| Engine | `createKubb`, `Diagnostics` | プラグインを実行する `kubb` パッケージの表面と、収集されるエラー | [engine.md](../kit/engine.md) |
| Lifecycle hooks | `KubbHooks` | ビルドが発火する全 `kubb:*` フックとペイロード・発火タイミング | [hooks.md](../kit/hooks.md) |
| Testing | `kubb/kit/testing` | プラグイン・generator・adapter テスト用の Vitest ベースヘルパー | [testing.md](../kit/testing.md) |
| Extension manifest | `kubb-extension.json` | レジストリ・`kubb add`・Studio 向けに拡張パッケージが同梱するファイル | [manifest.md](../kit/manifest.md) |
| Extension docs | `docs/` | 拡張が kubb.dev 向けに同梱する Markdown ページ | [extension-docs.md](../kit/extension-docs.md) |

## Usage

```typescript
import { ast, defineExtension, defineGenerator } from 'kubb/kit'

export const pluginExample = defineExtension({
  kind: 'plugin',
  meta: { name: 'plugin-example' },
  setup(_options, kubb) {
    kubb.addGenerator(
      defineGenerator({
        name: 'example',
        schema(node) {
          return [
            ast.factory.createFile({
              path: `${node.name}.ts`,
              baseName: `${node.name}.ts`,
              sources: [ast.factory.createSource({ nodes: [ast.factory.createText(`// ${node.name}\n`)] })],
              imports: [],
              exports: [],
            }),
          ]
        },
      }),
    )
    return {}
  },
})
```

## Notes

- `defineExtension`（`kind` は `'plugin'` / `'adapter'` / `'parser'`）が推奨。`definePlugin` / `defineParser` / `createAdapter` は動作するが非推奨（`@kubb/kit` README）
- 組み込み macro プリセット: `macroDiscriminatorEnum` / `macroEnumName` / `macroRenameSchema` / `macroSimplifyUnion`（`ast.applyMacros` かプラグインの `setMacros` に渡す）。独自 macro は `ast.defineMacro`
- スキーマ名・スキーマグラフのヘルパー: `childName` / `enumPropName` / `extractRefName` / `isStringType` / `mergeAdjacentObjectsLazy` / `syncSchemaRef` / `containsCircularRef`
- `kubb/kit/testing`（`createMockedPlugin` / `createMockedAdapter` / `renderGeneratorOperation` / `matchFiles`）は別エントリのため、`kubb/kit` の import で Vitest は読み込まれない
- `@kubb/kit` は `@kubb/core` のビルドエンジン（plugin driver・file manager・CLI reporters）から作成用 API を分離したパッケージ
- Diagnostics API の詳細（`Diagnostics.Error` 等のメンバー一覧）は [engine.md](../kit/engine.md)、エラーコード一覧は [diagnostics.md](./diagnostics.md) を参照

## Related

- [diagnostics](./diagnostics.md)
- [@kubb/core](../plugins/core.md)

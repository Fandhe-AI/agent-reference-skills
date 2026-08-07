# Resolver のカスタマイズ

Resolver は生成コードの名前を決める。Adapter が仕様を [AST](./ast.md) へ変換し、Generator がノードを走査し、Resolver が Plugin が出力する各シンボルに名前を付け、それぞれの出力先ファイルを決める。`@kubb/plugin-ts` は型に、`@kubb/plugin-zod` は schema に、`@kubb/plugin-react-query` はフックと query key に、それぞれ自身の Resolver 経由で名前を付ける。

コード生成する各 Plugin は `resolver` オプションでその Resolver を公開する。これは Plugin 組み込みの Resolver に対する部分的なパッチ。トップレベルの `name` を設定すると識別子の casing を変更でき、`file` は生成ファイルのリネーム・移動、単一の namespace 化されたメソッドは 1 種類のシンボルだけをリネームする。指定しなかった項目は Plugin のデフォルトのまま保たれるため、Plugin をフォークせずに 1 つの命名ルールだけを変更できる。

## 形

パッチは Plugin の Resolver をミラーするため、置き換えたいメンバーだけを渡す。`name` は識別子を変換し、`file.baseName` はファイルのベース名を組み立て、`file.path` はフルパスを所有し、`query`・`schema`・`response` のような namespace は operation ごとの名前をグループ化する。

```typescript
type ResolverPatch = {
  name?: (name: string) => string
  file?: {
    baseName?: (params: { name: string; extname: string }) => string
    path?: (params: { baseName: string; output: Output }) => string
  }
  // plugin-specific namespaces, such as query.keyName or schema.typeName
}
```

メソッドはマージ済みの完全な Resolver にバインドされた `this` context で実行されるため、アロー関数ではなく通常の関数として書く。`this.default.name(name)` は常に Kubb コアの `camelCase` デフォルトを適用する。Plugin プリセットの `name` メソッドはこれとは別に存在する。

namespace 化されたメソッドからは、`this.name(name)` がアクティブなトップレベル `name` メソッドを呼び出し、利用者による上書きにも従う。トップレベルの `name` メソッド自体から `this.name` を呼ぶと再帰するため、casing をラップしたい場合は export されたプリセット Resolver を呼び出す。

## 識別子のリネーム

`name` は Plugin が生成する全シンボルの casing ルールを置き換える。この上書きは各 TypeScript の型に `Api` を前置し、`resolverTs.name` を呼んで Plugin プリセットの `PascalCase`（生の複数語・operation 由来の名前を含む）を保つ。

```typescript
import { pluginTs, resolverTs } from '@kubb/plugin-ts'

pluginTs({
  resolver: {
    name(name) {
      return `Api${resolverTs.name(name)}`
    },
  },
})
```

## ファイルのリネームと再配置

`file.baseName` は拡張子を含むファイル名を組み立てる。この例では全ての Faker ファイルを、Plugin デフォルトの代わりに `<name>.mock.ts` にリネームする。

```typescript
import { pluginFaker } from '@kubb/plugin-faker'

pluginFaker({
  resolver: {
    file: {
      baseName({ name, extname }) {
        return `${name}.mock${extname}`
      },
    },
  },
})
```

`file.path` はファイルのフルパスを返し、`output.path` と `group` によるレイアウトを迂回する。つまり Resolver がファイルの配置場所を所有する。この上書きは全ての Faker ファイルを `mocks/` フォルダへ移動する。返すパスはプロジェクトルートを外れてはならない。

```typescript
import { pluginFaker } from '@kubb/plugin-faker'

pluginFaker({
  resolver: {
    file: {
      path({ baseName, output }) {
        return `${output.path}/mocks/${baseName}`
      },
    },
  },
})
```

## Namespace 化された名前

operation ごとに複数のシンボルを出力する Plugin は、追加の名前を namespace の下にグループ化する。`@kubb/plugin-react-query` は query key を `query.keyName` 経由で命名する。この例ではデフォルトの `QueryKey` サフィックスを `Key` に短縮し、`this.name` が Plugin の他の部分と operation の casing を一致させる。

```typescript
import { pluginReactQuery } from '@kubb/plugin-react-query'

pluginReactQuery({
  resolver: {
    query: {
      keyName(node) {
        return `${this.name(node.operationId)}Key`
      },
    },
  },
})
```

`@kubb/plugin-ts` は各 response 型を `response.status` 経由で命名する。この上書きはテンプレートを書き換え、`200` response がデフォルトの `GetPetByIdStatus200` ではなく `GetPetById200Response` になるようにする。

```typescript
import { pluginTs } from '@kubb/plugin-ts'

pluginTs({
  resolver: {
    response: {
      status(node, statusCode) {
        return this.name(`${node.operationId} ${statusCode} response`)
      },
    },
  },
})
```

## Notes

- Resolver の概念的な役割は [resolvers.md](./resolvers.md) を参照
- Resolver 自体の実装（`createResolver`）は [creating-plugins.md](./creating-plugins.md) の「Resolvers」セクションを参照

## Related

- [resolvers](./resolvers.md)
- [creating-plugins](./creating-plugins.md)
- [concepts-plugins](./concepts-plugins.md)

# lint

knip による未使用コード・依存関係・ファイルの検出コマンド集。

## 標準実行

```sh
knip
```

exit code: `0` (issue なし) / `1` (issue あり) / `2` (例外)

## issue タイプ別フィルタリング

```sh
knip --include files
```

```sh
knip --include dependencies
```

```sh
knip --include files,dependencies
```

```sh
knip --include files --exclude enumMembers,duplicates
```

## issue タイプのショートカット

```sh
knip --files
```

```sh
knip --dependencies
```

```sh
knip --exports
```

## タグフィルタリング

```sh
knip --tags=-lintignore,-internal
```

`+` で含める、`-` で除外する。JSDoc/TSDoc タグによるフィルタリング。

## 本番モード（本番ソースのみを解析）

```sh
knip --production
```

## ストリクトモード（ワークスペース分離 + 本番モード）

```sh
knip --production --strict
```

## 本番モードで型 issue を除外

```sh
knip --production --exclude types
```

## ワークスペース指定

```sh
knip --workspace packages/my-lib
```

```sh
knip -W @myorg/my-lib
```

```sh
knip --workspace @myorg/* --workspace '!@myorg/legacy'
```

```sh
knip --workspace './apps/*' --workspace '@shared/utils'
```

## issue タイプ一覧

`files`, `dependencies`, `devDependencies`, `optionalPeerDependencies`, `unlisted`, `binaries`, `unresolved`, `exports`, `nsExports`, `types`, `nsTypes`, `enumMembers`, `namespaceMembers`, `duplicates`, `catalog`

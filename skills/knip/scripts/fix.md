# fix

knip の自動修正コマンド集。未使用コード・依存関係の自動除去。

## 自動修正の実行

> **警告**: `--fix` は `export` キーワードの除去・`package.json` の依存関係削除など不可逆な変更を加える。実行前に Git などの VCS でコミット済みであることを確認する。

```sh
knip --fix
```

修正対象:
- 未使用 exports から `export` キーワードを除去
- 未使用 default exports から `export default` を除去
- 未使用の enum / namespace メンバーを除去
- `package.json` の未使用 `dependencies` / `devDependencies` を除去
- 未使用の catalog エントリを除去

## ファイル削除を許可して修正

> **警告**: `--allow-remove-files` は未使用ファイルを削除する。VCS で管理済みであることを確認する。

```sh
knip --fix --allow-remove-files
```

## 修正後にフォーマッターを実行

```sh
knip --fix --format
```

Biome / deno fmt / dprint / Prettier を自動検出して実行する。

## 修正対象タイプを限定

```sh
knip --fix-type exports,types
```

```sh
knip --fix-type dependencies
```

```sh
knip --fix-type files
```

`--fix-type` に指定できる値: `dependencies`, `exports`, `types`, `files`, `catalog`

## ファイル削除 + フォーマット込み修正

> **警告**: ファイルの削除と上書きを同時に行う。

```sh
knip --fix --allow-remove-files --format
```

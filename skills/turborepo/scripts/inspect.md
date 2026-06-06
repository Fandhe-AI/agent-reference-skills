# Inspect

モノレポ構造・依存関係・境界違反の検査コマンド。

## パッケージ一覧の確認

```sh
turbo ls
turbo ls --output=json
```

## 特定パッケージの詳細確認

```sh
turbo ls web @repo/ui
```

パッケージ名、ディレクトリ、内部依存関係、タスク一覧を表示する。

## 変更パッケージの確認

```sh
turbo ls --affected
TURBO_SCM_BASE=development turbo ls --affected
```

## 変更パッケージのフィルター付き確認

```sh
turbo ls --affected --filter=web
```

## GraphQL によるクエリ分析

```sh
# GraphiQL インタラクティブモード
turbo query

# インラインクエリの実行
turbo query "query { packages { items { name } } }"

# ファイルからクエリを実行
turbo query query.gql

# GraphQL スキーマの出力
turbo query --schema

# クエリ変数の指定
turbo query query.gql --variables=vars.json
```

## 変更影響の分析（turbo query affected）

```sh
turbo query affected
turbo query affected --tasks build test
turbo query affected --packages @acme/ui
turbo query affected --base=main --head=HEAD
turbo query affected --exit-code
```

`--exit-code` フラグ: 変更あり=1、なし=0、エラー=2

## 依存関係違反の検査（turbo boundaries）

```sh
turbo boundaries
```

以下の違反を検出する（実験的機能）:
- パッケージディレクトリ外のファイルインポート
- `package.json` の `dependencies` に未宣言のパッケージのインポート

## タスクグラフの出力

```sh
turbo run build --graph
turbo run build --graph=graph.svg
turbo run build --graph=graph.html
turbo run build --graph=graph.mermaid
turbo run build --graph=graph.dot
```

## パッケージグラフの可視化（ブラウザ）

```sh
turbo devtools
turbo devtools --port=9876
turbo devtools --no-open
```

## デバッグ情報の表示

```sh
turbo info
```

バージョン、パス、デーモン状態、パッケージマネージャー、プラットフォーム情報を表示する。

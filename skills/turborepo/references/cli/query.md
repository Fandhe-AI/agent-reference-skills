# turbo query

モノレポに対して GraphQL クエリを実行し、パッケージ依存関係やタスク関係を分析する。

```bash
turbo query [query|file.gql]
```

## 使用方法

```bash
turbo query                              # インタラクティブモード
turbo query "query { packages { items { name } } }"  # 直接実行
turbo query query.gql                    # ファイルから
```

## オプション

| オプション | 説明 |
|---|---|
| `--schema` | GraphQL スキーマを出力 |
| `--variables` / `-V` | クエリ変数の JSON ファイルパス |

## turbo query affected

変更の影響を受けるパッケージ・タスクを特定する。

```bash
turbo query affected [flags]
```

| フラグ | 説明 |
|---|---|
| `--tasks [names]` | タスク名でフィルタ |
| `--packages [names]` | パッケージ名でフィルタ |
| `--base [ref]` | 比較ベースの Git ref |
| `--head [ref]` | 比較対象 HEAD（デフォルト: `HEAD`） |
| `--exit-code` | 変更あり: 1、なし: 0、エラー: 2 |

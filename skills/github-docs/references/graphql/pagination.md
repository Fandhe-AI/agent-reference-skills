# GraphQL ページネーション

## Connection モデル

GitHub GraphQL API はカーソルベースのページネーションを使用する。リスト型のデータは **Connection** パターンで返される。

## 構造

```
Connection
├── edges[]          - エッジの配列
│   ├── cursor       - このエッジのカーソル位置
│   └── node         - 実際のデータオブジェクト
├── nodes[]          - ノードの配列（edges のショートカット）
├── pageInfo         - ページネーション情報
│   ├── hasNextPage  - 次のページが存在するか
│   ├── hasPreviousPage - 前のページが存在するか
│   ├── startCursor  - 最初のエッジのカーソル
│   └── endCursor    - 最後のエッジのカーソル
└── totalCount       - 合計件数（利用可能な場合）
```

## ページネーション引数

| 引数 | 説明 |
|------|------|
| `first` | 最初から N 件取得（1-100） |
| `after` | 指定カーソルの後から取得（`first` と併用） |
| `last` | 最後から N 件取得（1-100） |
| `before` | 指定カーソルの前から取得（`last` と併用） |

### 注意事項

- `first` と `last` の値は 1 以上 100 以下でなければならない
- `first`/`after` による前方ページネーションが最も一般的

## 前方ページネーション（Forward Pagination）

### 最初のページ

```graphql
query {
  repository(owner: "octocat", name: "Hello-World") {
    issues(first: 10) {
      edges {
        cursor
        node {
          title
          number
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
```

### 次のページ

```graphql
query($cursor: String!) {
  repository(owner: "octocat", name: "Hello-World") {
    issues(first: 10, after: $cursor) {
      edges {
        cursor
        node {
          title
          number
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
```

変数:

```json
{
  "cursor": "前回の endCursor の値"
}
```

### ループ処理

```
1. first: N でクエリを実行
2. pageInfo.hasNextPage を確認
3. true なら pageInfo.endCursor を after に指定して再クエリ
4. hasNextPage が false になるまで繰り返す
```

## 後方ページネーション（Backward Pagination）

```graphql
query {
  repository(owner: "octocat", name: "Hello-World") {
    issues(last: 10) {
      edges {
        cursor
        node {
          title
        }
      }
      pageInfo {
        hasPreviousPage
        startCursor
      }
    }
  }
}
```

- `last` + `before` を使用して最後から遡る
- `hasPreviousPage` と `startCursor` で前のページを取得

## nodes ショートカット

`edges` > `node` の代わりに `nodes` を直接使用できる（カーソル情報が不要な場合）。

```graphql
query {
  repository(owner: "octocat", name: "Hello-World") {
    issues(first: 10) {
      nodes {
        title
        number
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
```

## ベストプラクティス

- 大量のデータを取得する場合は、小さい `first`/`last` 値でページネーションする
- レート制限のポイント消費を抑えるため、必要最小限のフィールドのみ要求する
- `totalCount` は必要な場合のみ要求する（計算コストがかかる場合がある）
- エラーハンドリングを適切に行い、レート制限に達した場合はリトライロジックを実装する

## 公式ドキュメント

- [Using pagination in the GraphQL API](https://docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api)

# GraphQL レート制限

## プライマリレート制限（ポイント制）

GitHub GraphQL API はポイントベースのレート制限を採用している。各クエリはその複雑さに応じたポイントを消費する。

### 認証方式別のポイント制限

| 認証方式 | ポイント/時間 |
|---------|-------------|
| **ユーザー（通常）** | 5,000 ポイント/時間/ユーザー |
| **ユーザー（Enterprise Cloud）** | 10,000 ポイント/時間/ユーザー |
| **GitHub App インストール（通常）** | 5,000 ポイント/時間/インストール + ボーナス |
| **GitHub App インストール（Enterprise Cloud）** | 10,000 ポイント/時間/インストール |
| **OAuth App** | 5,000 または 10,000 ポイント/時間（Enterprise 所有の有無による） |
| **GitHub Actions（GITHUB_TOKEN）** | 1,000 ポイント/時間/リポジトリ（Enterprise リソースは 15,000） |

## レート制限の確認方法

### レスポンスヘッダー

| ヘッダー | 説明 |
|---------|------|
| `x-ratelimit-limit` | 1 時間あたりの最大ポイント数 |
| `x-ratelimit-remaining` | 現在のウィンドウで残っているポイント数 |
| `x-ratelimit-used` | 現在のウィンドウで消費済みのポイント数 |
| `x-ratelimit-reset` | ウィンドウリセット時刻（UTC エポック秒） |

### GraphQL クエリによる確認

```graphql
query {
  rateLimit {
    limit
    remaining
    used
    resetAt
    cost
  }
}
```

## クエリコストの計算

### 計算式

1. 各 Connection に必要なリクエスト数を合計する（`first`/`last` 引数の値を使用）
2. 合計を 100 で割り、最も近い整数に丸める
3. 最小コストは常に **1 ポイント**

### 計算例

```graphql
query {
  viewer {
    repositories(first: 50) {       # 50 リクエスト
      edges {
        node {
          issues(first: 10) {       # 50 x 10 = 500 リクエスト
            edges {
              node {
                labels(first: 5) {  # 50 x 10 x 5 = 2,500 リクエスト
                  edges {
                    node { name }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

合計: 1 + 50 + 500 + 2,500 = 3,051 リクエスト
コスト: 3,051 / 100 = **31 ポイント**

### コストの事前確認

`rateLimit` オブジェクトの `cost` フィールドでクエリ実行前にコストを確認できる。

```graphql
query {
  rateLimit {
    cost
    remaining
  }
  viewer {
    repositories(first: 50) {
      edges {
        node {
          name
        }
      }
    }
  }
}
```

## ノード制限

### 上限

- 1 回のクエリで取得できるノード数は最大 **500,000 ノード**
- Connection の `first`/`last` は **1 以上 100 以下**

### ノード数の計算

ネストされた Connection の引数を掛け合わせて計算する。

```
50 リポジトリ x 10 Issue = 550 ノード
（50 + 50 x 10 = 550）
```

## セカンダリレート制限

### ポイント値

| 操作 | ポイント |
|------|---------|
| ミューテーションなしの GraphQL クエリ | 1 ポイント |
| ミューテーション付きの GraphQL クエリ | 5 ポイント |

### 制約

| 制限 | 値 |
|------|-----|
| 同時リクエスト数 | 最大 100 |
| GraphQL エンドポイント | 2,000 ポイント/分 以下 |
| コンテンツ作成 | 80 リクエスト/分、500 リクエスト/時間 |

## レート制限超過時の対応

- `x-ratelimit-remaining` が `0` になると、エラーメッセージが返される
- `x-ratelimit-reset` の時刻まで待ってからリトライする
- レスポンスの `errors` 配列に制限超過の情報が含まれる

## 最適化戦略

| 戦略 | 説明 |
|------|------|
| **小さい first/last 値** | ページネーションで必要な分だけ取得 |
| **ネストの深さを削減** | 不必要に深いネストを避ける |
| **フィルタリング引数の活用** | サーバー側でデータを絞り込む |
| **クエリの分割** | 複雑なクエリを複数の小さいクエリに分割 |
| **必要なフィールドのみ要求** | 使用しないフィールドは含めない |

## 公式ドキュメント

- [Rate limits and node limits for the GraphQL API](https://docs.github.com/en/graphql/overview/rate-limits-and-node-limits-for-the-graphql-api)

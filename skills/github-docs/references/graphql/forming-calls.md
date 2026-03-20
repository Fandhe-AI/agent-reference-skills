# GraphQL クエリの構築

## 認証

すべての GraphQL リクエストに認証が必要。`Authorization` ヘッダーにトークンを指定する。

```
Authorization: bearer YOUR_TOKEN
```

### サポートされる認証方式

- Personal Access Token（必要なスコープ/権限付き）
- GitHub App（インストールアクセストークンまたはユーザー認証）
- OAuth App（Web フローまたはデバイスフロー）

## エンドポイント

```
POST https://api.github.com/graphql
```

リクエストボディは JSON エンコードされ、`query` 文字列を含む。

## クエリの基本構造

```graphql
query {
  viewer {
    login
    name
  }
}
```

- `query` キーワードでデータ取得操作を開始
- ネストしたフィールドでスカラー値に到達するまで掘り下げる
- レスポンスの JSON 構造はクエリの構造と一致する

### レスポンス例

```json
{
  "data": {
    "viewer": {
      "login": "octocat",
      "name": "The Octocat"
    }
  }
}
```

## 変数（Variables）

動的な値をクエリに渡すために変数を使用する。

### 手順

1. `variables` オブジェクトに値を定義（有効な JSON であること）
2. 操作の引数として型宣言付きで渡す（必須の場合は `!` を付ける）
3. クエリ内で `$variableName` として参照

```graphql
query($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    name
    description
    stargazerCount
  }
}
```

```json
{
  "variables": {
    "owner": "octocat",
    "name": "Hello-World"
  }
}
```

## フラグメント（Fragments）

再利用可能なフィールドセットを定義する。

```graphql
fragment RepoInfo on Repository {
  name
  description
  stargazerCount
  updatedAt
}

query {
  repository(owner: "octocat", name: "Hello-World") {
    ...RepoInfo
  }
}
```

## ミューテーション（Mutations）

データを変更する操作。3 つの要素で構成される。

1. **ミューテーション名**: 実行する変更の種類
2. **Input オブジェクト**: サーバーに送信するデータ
3. **Payload オブジェクト**: サーバーから返されるデータ

```graphql
mutation($input: AddCommentInput!) {
  addComment(input: $input) {
    commentEdge {
      node {
        body
        createdAt
      }
    }
  }
}
```

```json
{
  "variables": {
    "input": {
      "subjectId": "MDU6SXNzdWUx",
      "body": "コメント本文"
    }
  }
}
```

### 注意事項

- Enum 値はミューテーション内で直接使用する場合、引用符を付けない
- 変数として渡す場合は通常の JSON 文字列として指定する

## Connection（コネクション）

リスト型のデータは Connection パターンでアクセスする。

```graphql
query {
  repository(owner: "octocat", name: "Hello-World") {
    issues(first: 10) {
      edges {
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

- `edges` > `node` の順で個別アイテムにアクセス
- `pageInfo` でページネーション情報を取得

## cURL での呼び出し例

```bash
curl -H "Authorization: bearer YOUR_TOKEN" \
  -X POST \
  -d '{"query": "query { viewer { login } }"}' \
  https://api.github.com/graphql
```

## GraphQL Explorer

GitHub は対話型の GraphQL Explorer を提供しており、ブラウザ上でクエリを構築・テストできる。

- URL: https://docs.github.com/en/graphql/overview/explorer
- 自動補完、ドキュメント参照、クエリ履歴機能あり

## 公式ドキュメント

- [Forming calls with GraphQL](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql)

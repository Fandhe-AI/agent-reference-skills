# GraphQL スキーマリファレンス概要

## スキーマの型

GitHub GraphQL API のスキーマは 8 つのカテゴリで構成される。

| カテゴリ | 説明 |
|---------|------|
| **Queries** | データ取得のためのルートクエリ操作 |
| **Mutations** | データ変更のための操作 |
| **Objects** | フィールドを持つ複合データ型 |
| **Interfaces** | 共有フィールド構造を定義する契約 |
| **Enums** | 列挙値型 |
| **Unions** | 複数のオブジェクト型を表現する型 |
| **Input Objects** | ミューテーションの入力パラメータ型 |
| **Scalars** | プリミティブデータ型（String, Int, Boolean, ID など） |

## 主要ルートクエリフィールド

### repository

リポジトリの情報を取得する。

```graphql
query {
  repository(owner: "octocat", name: "Hello-World") {
    name
    description
    stargazerCount
    primaryLanguage { name }
    defaultBranchRef { name }
  }
}
```

### user

ユーザーの情報を取得する。

```graphql
query {
  user(login: "octocat") {
    name
    bio
    repositories(first: 10) {
      nodes { name }
    }
  }
}
```

### organization

Organization の情報を取得する。

```graphql
query {
  organization(login: "github") {
    name
    description
    membersWithRole(first: 10) {
      nodes { login }
    }
  }
}
```

### viewer

認証済みユーザー自身の情報を取得する。

```graphql
query {
  viewer {
    login
    name
    email
    repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        name
        updatedAt
      }
    }
  }
}
```

### search

GitHub 上のリソースを検索する。

```graphql
query {
  search(query: "language:typescript stars:>1000", type: REPOSITORY, first: 10) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          owner { login }
          stargazerCount
        }
      }
    }
  }
}
```

### node

グローバル Node ID で任意のオブジェクトを取得する。

```graphql
query {
  node(id: "MDQ6VXNlcjE=") {
    ... on User {
      login
      name
    }
  }
}
```

## 主要オブジェクト型

| オブジェクト | 説明 |
|------------|------|
| `Repository` | リポジトリ |
| `Issue` | Issue |
| `PullRequest` | プルリクエスト |
| `User` | ユーザー |
| `Organization` | Organization |
| `Commit` | コミット |
| `Ref` | Git リファレンス（ブランチ・タグ） |
| `Release` | リリース |
| `Project` | プロジェクト |
| `ProjectV2` | プロジェクト（v2） |
| `Discussion` | ディスカッション |
| `Label` | ラベル |
| `Milestone` | マイルストーン |
| `Team` | チーム |
| `ReviewRequest` | レビューリクエスト |
| `PullRequestReview` | プルリクエストレビュー |
| `DeploymentStatus` | デプロイメントステータス |
| `CheckRun` | チェックラン |
| `CheckSuite` | チェックスイート |
| `Workflow` | ワークフロー |
| `WorkflowRun` | ワークフローラン |

## 主要ミューテーション

| ミューテーション | 説明 |
|---------------|------|
| `createIssue` | Issue の作成 |
| `updateIssue` | Issue の更新 |
| `closeIssue` | Issue のクローズ |
| `addComment` | コメントの追加 |
| `createPullRequest` | プルリクエストの作成 |
| `mergePullRequest` | プルリクエストのマージ |
| `addReaction` | リアクションの追加 |
| `addLabelsToLabelable` | ラベルの追加 |
| `removeLabelsFromLabelable` | ラベルの削除 |
| `addAssigneesToAssignable` | アサイニーの追加 |
| `createBranchProtectionRule` | ブランチ保護ルールの作成 |
| `requestReviews` | レビューのリクエスト |
| `createRepository` | リポジトリの作成 |

## 主要インターフェース

| インターフェース | 説明 |
|----------------|------|
| `Node` | グローバル ID を持つオブジェクト |
| `Actor` | アクション実行者（User, Organization, Bot） |
| `Assignable` | アサイニーを持つオブジェクト |
| `Closable` | クローズ可能なオブジェクト |
| `Comment` | コメント |
| `Labelable` | ラベル付け可能なオブジェクト |
| `Lockable` | ロック可能なオブジェクト |
| `Reactable` | リアクション可能なオブジェクト |
| `RepositoryOwner` | リポジトリの所有者 |
| `UniformResourceLocatable` | URL を持つオブジェクト |

## スカラー型

| 型 | 説明 |
|-----|------|
| `String` | UTF-8 文字列 |
| `Int` | 符号付き 32 ビット整数 |
| `Float` | 符号付き倍精度浮動小数点数 |
| `Boolean` | true / false |
| `ID` | 一意識別子 |
| `DateTime` | ISO 8601 形式の日時 |
| `URI` | RFC 3986 準拠の URI |
| `HTML` | HTML 文字列 |
| `GitObjectID` | Git オブジェクト ID（SHA1 ハッシュ） |
| `Base64String` | Base64 エンコードされた文字列 |

## 公式ドキュメント

- [GraphQL API Reference](https://docs.github.com/en/graphql/reference)

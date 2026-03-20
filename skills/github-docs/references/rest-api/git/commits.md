# Git Commits API

低レベルのGitコミットオブジェクトを作成・取得するAPI。通常のCommits APIとは異なり、Gitデータベースに直接コミットオブジェクトを作成する。

## エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| POST | `/repos/{owner}/{repo}/git/commits` | コミットを作成 |
| GET | `/repos/{owner}/{repo}/git/commits/{commit_sha}` | コミットを取得 |

## コミットの作成

```
POST /repos/{owner}/{repo}/git/commits
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| message | string | Yes | コミットメッセージ |
| tree | string | Yes | ツリーオブジェクトのSHA |
| parents | string[] | No | 親コミットのSHA配列。初回コミットは空配列、通常は1つ、マージは複数 |
| author | object | No | 著者情報 |
| author.name | string | Yes* | 著者名（*authorを指定する場合は必須） |
| author.email | string | Yes* | 著者メールアドレス |
| author.date | string | No | ISO 8601形式のタイムスタンプ（デフォルト: 現在時刻） |
| committer | object | No | コミッター情報（省略時はauthor情報を使用） |
| committer.name | string | No | コミッター名 |
| committer.email | string | No | コミッターメールアドレス |
| committer.date | string | No | ISO 8601形式のタイムスタンプ |
| signature | string | No | PGP署名 |

### レスポンス例

```json
{
  "sha": "7638417db6d59f3c431d3e1f261cc637155684cd",
  "node_id": "MDY6Q29tbWl0N2...",
  "url": "https://api.github.com/repos/octocat/example/git/commits/7638417db6d59f3c431d3e1f261cc637155684cd",
  "author": {
    "date": "2014-11-07T22:01:45Z",
    "name": "Monalisa Octocat",
    "email": "octocat@github.com"
  },
  "committer": {
    "date": "2014-11-07T22:01:45Z",
    "name": "Monalisa Octocat",
    "email": "octocat@github.com"
  },
  "message": "my commit message",
  "tree": {
    "url": "https://api.github.com/repos/octocat/example/git/trees/827efc6d56897b048c772eb4087f854f46256132",
    "sha": "827efc6d56897b048c772eb4087f854f46256132"
  },
  "parents": [
    {
      "url": "https://api.github.com/repos/octocat/example/git/commits/1acc419d4d6a9ce985db7be48c6349a0475975b5",
      "sha": "1acc419d4d6a9ce985db7be48c6349a0475975b5"
    }
  ],
  "verification": {
    "verified": false,
    "reason": "unsigned",
    "signature": null,
    "payload": null
  }
}
```

## コミットの取得

```
GET /repos/{owner}/{repo}/git/commits/{commit_sha}
```

レスポンスにはverificationオブジェクトが含まれ、コミットの署名検証状態を示す。

### verificationオブジェクト

| フィールド | 型 | 説明 |
|-----------|-----|------|
| verified | boolean | 署名が検証されたかどうか |
| reason | string | 検証結果の理由（`valid`, `unsigned`, `unknown_key` 等） |
| signature | string/null | PGP署名 |
| payload | string/null | 署名対象のペイロード |

## 注意事項

- このAPIで作成したコミットは、リファレンス（ブランチ）を更新しない限りリポジトリに反映されない
- 通常は `POST /repos/{owner}/{repo}/git/refs` と組み合わせて使用する
- author/committerを省略した場合、認証ユーザーの情報が使用される

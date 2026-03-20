# Git Tags API

注釈付きタグ（annotated tag）オブジェクトを作成・取得するAPI。軽量タグ（lightweight tag）はReferences APIで直接作成する。

## エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| POST | `/repos/{owner}/{repo}/git/tags` | タグオブジェクトを作成 |
| GET | `/repos/{owner}/{repo}/git/tags/{tag_sha}` | タグオブジェクトを取得 |

## タグオブジェクトの作成

```
POST /repos/{owner}/{repo}/git/tags
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| tag | string | Yes | タグ名（例: `v1.0.0`） |
| message | string | Yes | タグメッセージ |
| object | string | Yes | タグが指すオブジェクトのSHA（通常はコミットSHA） |
| type | string | Yes | オブジェクトの種類（`commit`, `tree`, `blob`） |
| tagger | object | No | タグ作成者情報 |
| tagger.name | string | Yes* | 作成者名（*taggerを指定する場合は必須） |
| tagger.email | string | Yes* | 作成者メールアドレス |
| tagger.date | string | No | ISO 8601形式のタイムスタンプ |

### レスポンス例

```json
{
  "node_id": "MDM6VGFn...",
  "tag": "v0.0.1",
  "sha": "940bd336248efae0f9ee5bc7b2d5c985887b16ac",
  "url": "https://api.github.com/repos/octocat/Hello-World/git/tags/940bd336248efae0f9ee5bc7b2d5c985887b16ac",
  "message": "initial version",
  "tagger": {
    "name": "Monalisa Octocat",
    "email": "octocat@github.com",
    "date": "2014-11-07T22:01:45Z"
  },
  "object": {
    "type": "commit",
    "sha": "c3d0be41ecbe669545ee3e94d31ed9a4bc91ee3c",
    "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/c3d0be41ecbe669545ee3e94d31ed9a4bc91ee3c"
  },
  "verification": {
    "verified": false,
    "reason": "unsigned",
    "signature": null,
    "payload": null
  }
}
```

## タグオブジェクトの取得

```
GET /repos/{owner}/{repo}/git/tags/{tag_sha}
```

## 重要な注意事項

- **このAPIはタグオブジェクトのみを作成する**。実際にリポジトリでタグとして認識させるには、別途 `POST /repos/{owner}/{repo}/git/refs` でリファレンスを作成する必要がある
- リファレンス作成例:
  ```json
  {
    "ref": "refs/tags/v1.0.0",
    "sha": "<タグオブジェクトのSHA>"
  }
  ```
- このAPIは注釈付きタグ専用。軽量タグはReferences APIで `refs/tags/<name>` を直接コミットSHAに向けて作成する

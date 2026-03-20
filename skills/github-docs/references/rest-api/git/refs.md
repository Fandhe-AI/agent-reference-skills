# Git References API

Gitリファレンス（ブランチやタグのポインタ）を管理するAPI。リファレンスはコミットSHAへのポインタ。

## エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/repos/{owner}/{repo}/git/ref/{ref}` | 単一リファレンスを取得 |
| GET | `/repos/{owner}/{repo}/git/matching-refs/{ref}` | パターンに一致するリファレンス一覧を取得 |
| POST | `/repos/{owner}/{repo}/git/refs` | リファレンスを作成 |
| PATCH | `/repos/{owner}/{repo}/git/refs/{ref}` | リファレンスを更新 |
| DELETE | `/repos/{owner}/{repo}/git/refs/{ref}` | リファレンスを削除 |

## リファレンスの形式

- ブランチ: `heads/<branch>` （例: `heads/main`）
- タグ: `tags/<tag>` （例: `tags/v1.0`）

GETの `{ref}` パラメータでは `refs/` プレフィックスなしで指定する。

## 単一リファレンスの取得

```
GET /repos/{owner}/{repo}/git/ref/{ref}
```

例: `GET /repos/octocat/Hello-World/git/ref/heads/main`

### レスポンス例

```json
{
  "ref": "refs/heads/main",
  "node_id": "MDM6UmVm...",
  "url": "https://api.github.com/repos/octocat/Hello-World/git/refs/heads/main",
  "object": {
    "type": "commit",
    "sha": "aa218f56b14c9653891f9e74264a383fa43fefbd",
    "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/aa218f56b14c9653891f9e74264a383fa43fefbd"
  }
}
```

## パターン一致するリファレンスの取得

```
GET /repos/{owner}/{repo}/git/matching-refs/{ref}
```

例: `GET /repos/octocat/Hello-World/git/matching-refs/heads/feature` は `heads/feature` で始まるすべてのリファレンスを返す。

## リファレンスの作成

```
POST /repos/{owner}/{repo}/git/refs
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| ref | string | Yes | リファレンス名。**`refs/` で始まる必要がある**（例: `refs/heads/new-branch`） |
| sha | string | Yes | リファレンスが指すコミットのSHA |

### 注意

- 作成時は `ref` に完全修飾名（`refs/heads/...` や `refs/tags/...`）を指定する必要がある
- GET/PATCH/DELETEでは `refs/` プレフィックスなしの短縮形を使用する

## リファレンスの更新

```
PATCH /repos/{owner}/{repo}/git/refs/{ref}
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| sha | string | Yes | 新しいコミットSHA |
| force | boolean | No | 非fast-forward更新を許可（デフォルト: `false`） |

## リファレンスの削除

```
DELETE /repos/{owner}/{repo}/git/refs/{ref}
```

204 No Contentを返す。

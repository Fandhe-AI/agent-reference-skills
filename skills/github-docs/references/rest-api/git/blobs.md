# Git Blobs API

Gitブロブ（バイナリラージオブジェクト）を作成・取得するAPI。ブロブはファイルコンテンツを格納するGitオブジェクト。

## エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| POST | `/repos/{owner}/{repo}/git/blobs` | ブロブを作成 |
| GET | `/repos/{owner}/{repo}/git/blobs/{file_sha}` | ブロブを取得 |

## ブロブの作成

```
POST /repos/{owner}/{repo}/git/blobs
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| content | string | Yes | ブロブの内容 |
| encoding | string | No | エンコーディング。`utf-8`（デフォルト）または `base64` |

### レスポンス例

```json
{
  "url": "https://api.github.com/repos/octocat/example/git/blobs/3a0f86fb8db8eea7ccbb9a95f325ddbedfb25e15",
  "sha": "3a0f86fb8db8eea7ccbb9a95f325ddbedfb25e15"
}
```

## ブロブの取得

```
GET /repos/{owner}/{repo}/git/blobs/{file_sha}
```

### レスポンス例

```json
{
  "content": "Q29udGVudCBvZiB0aGUgYmxvYg==\n",
  "encoding": "base64",
  "url": "https://api.github.com/repos/octocat/example/git/blobs/3a0f86fb8db8eea7ccbb9a95f325ddbedfb25e15",
  "sha": "3a0f86fb8db8eea7ccbb9a95f325ddbedfb25e15",
  "size": 19
}
```

## エンコーディングに関する注意事項

- 作成時のエンコーディングは `utf-8`（デフォルト）または `base64` を指定可能
- レスポンスのコンテンツは**常に `base64` エンコーディング**で返される
- バイナリファイルを扱う場合は作成時に `base64` を指定する

## 制限事項

- ブロブの最大サイズは **100MB**
- 100MBを超えるファイルはGit LFSの使用を推奨

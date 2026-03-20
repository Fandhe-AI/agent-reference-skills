# Git Trees API

Gitツリーオブジェクト（ディレクトリ構造）を作成・取得するAPI。ツリーはファイルとサブディレクトリの一覧を表す。

## エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| POST | `/repos/{owner}/{repo}/git/trees` | ツリーを作成 |
| GET | `/repos/{owner}/{repo}/git/trees/{tree_sha}` | ツリーを取得 |

## ツリーの作成

```
POST /repos/{owner}/{repo}/git/trees
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| tree | object[] | Yes | ツリーエントリの配列 |
| base_tree | string | No | ベースとなるツリーのSHA。指定すると差分のみの更新が可能 |

### ツリーエントリのフィールド

| フィールド | 型 | 説明 |
|-----------|-----|------|
| path | string | ファイルパス（例: `src/index.js`） |
| mode | string | ファイルモード（下記参照） |
| type | string | エントリの種類: `blob`, `tree`, `commit` |
| sha | string/null | オブジェクトのSHA。`null` を指定するとファイルを削除 |
| content | string | ファイルコンテンツ（shaの代わりに直接指定可能、ブロブが自動作成される） |

### ファイルモード

| モード | 説明 |
|--------|------|
| `100644` | 通常ファイル |
| `100755` | 実行可能ファイル |
| `040000` | サブディレクトリ（ツリー） |
| `160000` | サブモジュール（コミット） |
| `120000` | シンボリックリンク |

### レスポンス例

```json
{
  "sha": "cd8274d15fa3ae2ab983129fb037999f264ba9a7",
  "url": "https://api.github.com/repos/octocat/Hello-World/git/trees/cd8274d15fa3ae2ab983129fb037999f264ba9a7",
  "tree": [
    {
      "path": "file.rb",
      "mode": "100644",
      "type": "blob",
      "size": 132,
      "sha": "7c258a9869f33c1c1c1c1c1c1c1c1c1c1c1c1c1c",
      "url": "https://api.github.com/repos/octocat/Hello-World/git/blobs/7c258a9869f33c1c1c1c1c1c1c1c1c1c1c1c1c1c"
    }
  ],
  "truncated": false
}
```

## ツリーの取得

```
GET /repos/{owner}/{repo}/git/trees/{tree_sha}
```

### クエリパラメータ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| recursive | string | `1` を指定するとツリーを再帰的に展開 |

例: `GET /repos/octocat/Hello-World/git/trees/main?recursive=1`

## 制限事項

- ツリーエントリが **100,000件** を超える場合、レスポンスは切り詰められる（`truncated: true`）
- レスポンスサイズが **7MB** を超える場合も切り詰められる
- 切り詰められた場合は、サブツリーを個別に取得する必要がある

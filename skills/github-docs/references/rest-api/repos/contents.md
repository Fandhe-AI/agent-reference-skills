# ファイルコンテンツ

リポジトリ内のファイルコンテンツの取得・作成・更新・削除に関するエンドポイント。

## エンドポイント一覧

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `GET` | `/repos/{owner}/{repo}/contents/{path}` | ファイルまたはディレクトリの内容を取得 |
| `PUT` | `/repos/{owner}/{repo}/contents/{path}` | ファイルの作成または更新 |
| `DELETE` | `/repos/{owner}/{repo}/contents/{path}` | ファイルの削除 |
| `GET` | `/repos/{owner}/{repo}/readme` | リポジトリのREADMEを取得 |
| `GET` | `/repos/{owner}/{repo}/readme/{dir}` | 指定ディレクトリのREADMEを取得 |
| `GET` | `/repos/{owner}/{repo}/tarball/{ref}` | tarball形式でダウンロード |
| `GET` | `/repos/{owner}/{repo}/zipball/{ref}` | zipball形式でダウンロード |

## ファイルコンテンツの取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/contents/path/to/file.txt
```

### クエリパラメータ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `ref` | string | ブランチ名、タグ名、またはコミットSHA（デフォルト: デフォルトブランチ） |

### レスポンス例（ファイル）

```json
{
  "type": "file",
  "encoding": "base64",
  "size": 1234,
  "name": "file.txt",
  "path": "path/to/file.txt",
  "content": "SGVsbG8gV29ybGQ=...",
  "sha": "abc123def456...",
  "url": "https://api.github.com/repos/OWNER/REPO/contents/path/to/file.txt",
  "html_url": "https://github.com/OWNER/REPO/blob/main/path/to/file.txt",
  "download_url": "https://raw.githubusercontent.com/OWNER/REPO/main/path/to/file.txt"
}
```

### レスポンス例（ディレクトリ）

ディレクトリを指定すると、エントリの配列が返される。

```json
[
  {
    "type": "file",
    "name": "README.md",
    "path": "path/to/README.md",
    "sha": "...",
    "size": 512,
    "url": "...",
    "html_url": "...",
    "download_url": "..."
  },
  {
    "type": "dir",
    "name": "src",
    "path": "path/to/src",
    "sha": "...",
    "size": 0,
    "url": "...",
    "html_url": "...",
    "download_url": null
  }
]
```

### コンテンツの制限

| 制限 | 値 | 説明 |
|------|-----|------|
| `content` フィールド上限 | **1 MB** | Base64エンコードされたコンテンツの上限。超過時は `content` が空になる |
| API経由の総サイズ上限 | **100 MB** | これを超えるファイルはAPI経由で取得不可。`download_url` を使用 |
| ディレクトリエントリ上限 | **1,000件** | 1,000件超のディレクトリは Git Trees API を使用 |

### Base64デコード

```bash
# レスポンスの content フィールドをデコード
echo "SGVsbG8gV29ybGQ=" | base64 --decode
```

### Raw コンテンツの取得

```bash
# Accept ヘッダーで Raw 形式を指定
curl -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github.raw+json" \
  https://api.github.com/repos/OWNER/REPO/contents/path/to/file.txt

# または download_url を直接使用
curl -L -H "Authorization: Bearer TOKEN" \
  "https://raw.githubusercontent.com/OWNER/REPO/main/path/to/file.txt"
```

## ファイルの作成

```bash
curl -X PUT \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/contents/path/to/new-file.txt \
  -d '{
    "message": "Create new file",
    "content": "SGVsbG8gV29ybGQ=",
    "branch": "main"
  }'
```

### 作成パラメータ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `message` | string | **必須** | コミットメッセージ |
| `content` | string | **必須** | Base64エンコードされたファイルコンテンツ |
| `branch` | string | - | コミット先ブランチ（デフォルト: デフォルトブランチ） |
| `committer` | object | - | コミッター情報 `{ "name": "...", "email": "..." }` |
| `author` | object | - | 著者情報 `{ "name": "...", "email": "..." }` |

### コンテンツのBase64エンコード

```bash
# ファイルをBase64エンコード
echo -n "Hello World" | base64
# => SGVsbG8gV29ybGQ=
```

## ファイルの更新

既存ファイルを更新するには、現在のファイルの `sha` が必要。

```bash
# 1. 現在のファイル情報を取得して sha を確認
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/contents/path/to/file.txt
# レスポンスの "sha" フィールドを取得

# 2. ファイルを更新（sha が必須）
curl -X PUT \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/contents/path/to/file.txt \
  -d '{
    "message": "Update file",
    "content": "VXBkYXRlZCBjb250ZW50",
    "sha": "現在のファイルのSHA",
    "branch": "main"
  }'
```

## ファイルの削除

```bash
curl -X DELETE \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/contents/path/to/file.txt \
  -d '{
    "message": "Delete file",
    "sha": "削除するファイルのSHA",
    "branch": "main"
  }'
```

## READMEの取得

```bash
# リポジトリルートのREADME
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/readme

# 特定ディレクトリのREADME
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/readme/docs

# HTML形式で取得
curl -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github.html+json" \
  https://api.github.com/repos/OWNER/REPO/readme
```

## アーカイブのダウンロード

```bash
# tarball
curl -L -H "Authorization: Bearer TOKEN" \
  -o repo.tar.gz \
  https://api.github.com/repos/OWNER/REPO/tarball/main

# zipball
curl -L -H "Authorization: Bearer TOKEN" \
  -o repo.zip \
  https://api.github.com/repos/OWNER/REPO/zipball/v1.0.0
```

> **注意**: `-L` フラグでリダイレクトに対応すること。アーカイブURLは302でリダイレクトされる。

## 必要な権限

| 操作 | Fine-grained PAT 権限 |
|------|----------------------|
| コンテンツの読み取り | `contents: read` |
| コンテンツの作成・更新・削除 | `contents: write` |

# Gists API

GitHub Gist（コードスニペット）を作成・管理するAPI。

## エンドポイント

### Gist基本操作

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/gists` | 認証ユーザーのGist一覧を取得 |
| GET | `/gists/public` | パブリックGist一覧を取得 |
| GET | `/gists/starred` | スター付きGist一覧を取得 |
| POST | `/gists` | Gistを作成 |
| GET | `/gists/{gist_id}` | Gistを取得 |
| PATCH | `/gists/{gist_id}` | Gistを更新 |
| DELETE | `/gists/{gist_id}` | Gistを削除 |
| GET | `/users/{username}/gists` | 指定ユーザーのGist一覧を取得 |

### フォーク

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/gists/{gist_id}/forks` | フォーク一覧を取得 |
| POST | `/gists/{gist_id}/forks` | Gistをフォーク |

### スター

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/gists/{gist_id}/star` | スター状態を確認（204=あり、404=なし） |
| PUT | `/gists/{gist_id}/star` | スターを付ける |
| DELETE | `/gists/{gist_id}/star` | スターを外す |

### コメント

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/gists/{gist_id}/comments` | コメント一覧を取得 |
| POST | `/gists/{gist_id}/comments` | コメントを作成 |
| GET | `/gists/{gist_id}/comments/{comment_id}` | コメントを取得 |
| PATCH | `/gists/{gist_id}/comments/{comment_id}` | コメントを更新 |
| DELETE | `/gists/{gist_id}/comments/{comment_id}` | コメントを削除 |

### コミット履歴

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/gists/{gist_id}/commits` | コミット履歴を取得 |
| GET | `/gists/{gist_id}/{sha}` | 特定リビジョンのGistを取得 |

## Gistの作成

```
POST /gists
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| description | string | No | Gistの説明 |
| files | object | Yes | ファイルのマップ（キー: ファイル名、値: contentを含むオブジェクト） |
| public | boolean | No | パブリックにするかどうか（デフォルト: `false`） |

### リクエスト例

```json
{
  "description": "Hello World Examples",
  "public": true,
  "files": {
    "hello_world.rb": {
      "content": "class HelloWorld\n  def initialize(name)\n    @name = name.capitalize\n  end\nend"
    },
    "hello_world.py": {
      "content": "class HelloWorld:\n    def __init__(self, name):\n        self.name = name.capitalize()"
    }
  }
}
```

## Gistの更新

```
PATCH /gists/{gist_id}
```

- ファイルの内容を更新: `files` にファイル名とcontentを指定
- ファイルの削除: ファイル名の値を `null` に設定
- ファイルのリネーム: 旧ファイル名のキーに `filename` フィールドで新名を指定

### ファイル削除の例

```json
{
  "files": {
    "hello_world.rb": null
  }
}
```

### ファイルリネームの例

```json
{
  "files": {
    "hello_world.rb": {
      "filename": "hello.rb",
      "content": "updated content"
    }
  }
}
```

## トランケーション（切り詰め）

- **1MBを超えるファイル**: APIレスポンスでは `truncated: true` が設定される。完全な内容は `raw_url` から取得する
- **10MBを超えるファイル**: APIレスポンスには含まれない。`git_pull_url` を使用してGitクローンで取得する
- レスポンスに含まれるファイルは**最大300個**。それ以上のファイルがある場合はGitクローンで取得する

# Search API

GitHub全体を対象とした検索API。コード、コミット、Issue、リポジトリなど複数のリソースを検索できる。

## エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/search/code` | コードを検索 |
| GET | `/search/commits` | コミットを検索 |
| GET | `/search/issues` | IssueとPull Requestを検索 |
| GET | `/search/labels` | ラベルを検索 |
| GET | `/search/repositories` | リポジトリを検索 |
| GET | `/search/topics` | トピックを検索 |
| GET | `/search/users` | ユーザーを検索 |

## 共通パラメータ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| q | string | Yes | 検索クエリ |
| sort | string | No | ソートフィールド（エンドポイントにより異なる） |
| order | string | No | ソート順: `asc` または `desc`（デフォルト: `desc`） |
| per_page | integer | No | 1ページあたりの件数（デフォルト: 30、最大: 100） |
| page | integer | No | ページ番号 |

## レート制限

| 認証状態 | 制限 |
|---------|------|
| 認証済み | **30リクエスト/分** |
| 未認証 | **10リクエスト/分** |
| コード検索 | **9リクエスト/分**（認証必須） |

通常のREST APIレート制限とは別に管理される。

## クエリの制限事項

- クエリ文字列は**最大256文字**
- クエリ内のAND / OR / NOT演算子は**最大5個**
- 空のクエリはエラーを返す

## コード検索の特記事項

```
GET /search/code
```

- **認証必須**（未認証ではアクセス不可）
- **デフォルトブランチのみ**が検索対象
- **384KB未満**のファイルのみインデックスされる
- フォークは親リポジトリよりスターが多い場合のみ検索対象
- 検索結果は最大1,000件まで

### コード検索のクエリ修飾子（例）

| 修飾子 | 例 | 説明 |
|--------|-----|------|
| `in:file` | `octocat in:file` | ファイル内容から検索 |
| `in:path` | `octocat in:path` | ファイルパスから検索 |
| `language:` | `language:javascript` | 言語でフィルタ |
| `repo:` | `repo:octocat/Hello-World` | リポジトリを指定 |
| `org:` | `org:github` | Organizationを指定 |
| `path:` | `path:src/` | パスプレフィックスでフィルタ |
| `extension:` | `extension:js` | ファイル拡張子でフィルタ |
| `size:` | `size:>1000` | ファイルサイズでフィルタ（バイト） |

## テキストマッチメタデータ

`Accept` ヘッダーに `application/vnd.github.text-match+json` を指定すると、レスポンスに `text_matches` 配列が追加される。

### text_matchesオブジェクト

```json
{
  "text_matches": [
    {
      "object_url": "https://api.github.com/repositories/...",
      "object_type": "FileContent",
      "property": "content",
      "fragment": "...matched text...",
      "matches": [
        {
          "text": "match",
          "indices": [0, 5]
        }
      ]
    }
  ]
}
```

検索結果内のマッチ位置をハイライト表示する場合などに利用する。

## 検索結果の上限

すべての検索エンドポイントは最大1,000件の結果を返す。それ以上の結果がある場合は、クエリを絞り込む必要がある。

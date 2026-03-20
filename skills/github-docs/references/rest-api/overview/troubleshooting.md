# トラブルシューティング

GitHub REST API 利用時によくあるエラーと解決方法。

## よくあるHTTPエラー

### 403 Forbidden / 429 Too Many Requests — レート制限超過

**原因**: プライマリまたはセカンダリレート制限に達した。

**確認方法**:

```bash
# レスポンスヘッダーを確認
curl -s -I -H "Authorization: Bearer TOKEN" \
  https://api.github.com/rate_limit
```

**レスポンスヘッダー例**:

```
x-ratelimit-limit: 5000
x-ratelimit-remaining: 0
x-ratelimit-reset: 1698765432
```

**対処法**:

1. `x-ratelimit-remaining` が `0` であれば、`x-ratelimit-reset` の時刻まで待機
2. `429` の場合は `retry-after` ヘッダーの秒数だけ待機
3. 指数バックオフでリトライ
4. 条件付きリクエスト（ETag）を活用してレート制限消費を削減

### 404 Not Found — 認証不足またはリソース不在

**原因（複数の可能性）**:

| 可能性 | 説明 |
|--------|------|
| リソースが存在しない | URL のパスパラメータ（owner、repo等）が間違っている |
| 権限不足 | プライベートリソースへのアクセス権限がない場合、**存在自体を秘匿するために `404` が返される**（`403` ではない） |
| トークン未設定 | `Authorization` ヘッダーが未設定またはトークンが無効 |
| トークンの権限不足 | Fine-grained PAT の権限スコープが不足 |
| リポジトリ未選択 | Fine-grained PAT で対象リポジトリが選択されていない |

**デバッグ手順**:

```bash
# 1. トークンの有効性を確認
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/user
# 200 が返れば認証は有効

# 2. リポジトリアクセスを確認
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO
# 404 ならば権限不足の可能性

# 3. パブリックリポジトリで同じエンドポイントをテスト
curl https://api.github.com/repos/octocat/Hello-World
# 200 ならばエンドポイントは正しく、元のリポジトリへの権限問題
```

### 401 Unauthorized — 認証エラー

**原因**:

- トークンが無効（失効、取り消し済み）
- `Authorization` ヘッダーの形式が不正

**対処法**:

```bash
# ヘッダー形式を確認（Bearer が正しい）
# 正しい:
-H "Authorization: Bearer ghp_xxxx"

# 間違い:
-H "Authorization: ghp_xxxx"
-H "Authorization: token ghp_xxxx"  # 動作するが非推奨
```

### 422 Unprocessable Entity — バリデーションエラー

**原因**: リクエストボディのパラメータが不正。

**レスポンス例**:

```json
{
  "message": "Validation Failed",
  "errors": [
    {
      "resource": "Issue",
      "field": "title",
      "code": "missing_field"
    }
  ],
  "documentation_url": "https://docs.github.com/rest/issues/issues#create-an-issue"
}
```

**対処法**:

- `errors` 配列の内容を確認
- 必須パラメータの欠落を修正
- パラメータの型や形式を確認（例: 日付は ISO 8601）

### 409 Conflict — 競合

**原因**: リソースの状態が操作と矛盾している。

**よくあるケース**:

- マージ時にコンフリクトが存在する
- 空のリポジトリに対して特定の操作を行った
- リソースが既に存在する（重複作成）

### 403 Forbidden（レート制限以外）

**原因**:

- Organization のポリシーでアクセスが制限されている
- リポジトリのアクセス制限
- SAML SSO が有効な Organization で、トークンが SSO 認証されていない

**対処法**:

- Organization 管理者に確認
- SSO 認証されたトークンを使用: Settings > Personal access tokens > 対象トークンの「Configure SSO」

## 検索結果が不完全な場合

### ページネーション漏れ

**症状**: 検索結果やリスト取得で期待した件数が返ってこない。

**原因**: デフォルトでは1ページ30件しか返されない。

**対処法**:

```bash
# per_page を指定し、link ヘッダーで全ページを取得
curl -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/issues?per_page=100&page=1"

# link ヘッダーの rel="next" を辿る
```

### 検索APIの制限

- 検索結果は最大 **1,000件** まで
- 1,000件を超える場合はクエリを分割（例: 日付範囲で絞り込み）
- 検索APIのレート制限は通常と別枠（認証時: 30リクエスト/分）

## デバッグチェックリスト

問題発生時に順番に確認すること:

1. **認証確認**: `curl https://api.github.com/user` でトークンの有効性を確認
2. **エンドポイント確認**: URLのパスパラメータが正しいか、タイポがないか
3. **HTTPメソッド確認**: GET/POST/PATCH/PUT/DELETE が正しいか
4. **ヘッダー確認**: `Accept`、`Authorization`、`Content-Type` が正しいか
5. **ボディ確認**: JSONの構文が正しいか（`jq` でバリデーション）
6. **権限確認**: トークンに必要な権限スコープがあるか
7. **レート制限確認**: `/rate_limit` エンドポイントで残り回数を確認
8. **ページネーション確認**: 全ページを取得しているか
9. **APIバージョン確認**: `X-GitHub-Api-Version` が正しいか

### デバッグ用 curl オプション

```bash
# 詳細なリクエスト/レスポンス情報を表示
curl -v -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO

# レスポンスヘッダーのみ表示
curl -s -I -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO

# レスポンスを整形して表示
curl -s -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO | jq .
```

## プライベートリソースの 404 について

GitHub は、アクセス権限のないプライベートリソースに対して意図的に `404 Not Found` を返す。これは **リソースの存在自体を第三者に漏洩させないためのセキュリティ設計**。`403 Forbidden` は返さない。

したがって、`404` エラーが返された場合は以下の両方を疑う必要がある:

- リソースが本当に存在しない
- リソースは存在するが、アクセス権限がない
